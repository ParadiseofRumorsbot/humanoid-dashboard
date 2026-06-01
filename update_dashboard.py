#!/usr/bin/env python3
"""
update_dashboard.py — 휴머노이드 대시보드 자동 업데이트 스크립트

MD 보고서 파일(리서치 노트)을 파싱하여 data.js의 DASHBOARD_DATA를 업데이트합니다.

사용법:
    python update_dashboard.py report.md              # 단일 파일
    python update_dashboard.py reports/                # 폴더 내 모든 .md
    python update_dashboard.py --dry-run report.md     # 미리보기 (변경 없음)
    python update_dashboard.py --validate              # data.js 출처 검증

중요: 2차 가공 출처(증권사)는 절대 넣지 않으며, 원데이터(1차 출처)만 사용합니다.
"""

import re
import os
import sys
import io
import json
import shutil
import argparse
from datetime import datetime
from pathlib import Path

if sys.stdout.encoding and sys.stdout.encoding.lower().startswith("cp"):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", errors="replace")

SCRIPT_DIR = Path(__file__).parent
DATA_JS = SCRIPT_DIR / "data.js"

# ── 1차 출처 화이트리스트 (이 출처만 허용) ─────────────────────────────
PRIMARY_SOURCES = {
    "BD IR", "Boston Dynamics IR", "Boston Dynamics",
    "HMG IR", "현대차그룹 IR", "현대차 IR", "Hyundai Motor Group IR",
    "JPM Conference", "JPM Healthcare Conference", "JPM Conference 2026",
    "Omdia", "SNE Research", "Goldman Sachs", "OECD", "IFR",
    "McKinsey", "Tesla IR", "GGII", "Trendforce", "SBI Research",
    "NVIDIA", "Google DeepMind", "Physical Intelligence",
    "Toyota Research", "OpenAI", "Universal Robots", "Robotiq",
    "각 사 IR", "각사 IR",
}

# ── 2차 출처 블랙리스트 (증권사 — 절대 허용 불가) ─────────────────────
BLOCKED_SOURCES = {
    "대신증권", "LS증권", "미래에셋증권", "삼성증권", "NH투자증권",
    "한국투자증권", "KB증권", "키움증권", "신한투자증권", "하나증권",
    "메리츠증권", "유진투자증권", "IBK투자증권", "iM증권", "교보증권",
    "신영증권", "한화투자증권", "DB금융투자", "BNK투자증권",
    "SK증권", "현대차증권", "하이투자증권", "유안타증권",
    "다올투자증권", "Cape투자증권", "토스증권",
    "Morgan Stanley", "JP Morgan Research", "Barclays Research",
    "Citi Research", "UBS Research", "Deutsche Bank Research",
    "BofA Research", "Credit Suisse Research", "Jefferies",
    "Bernstein", "Nomura Research", "CLSA", "Macquarie Research",
}


def is_primary_source(source_text: str) -> bool:
    """출처 문자열이 1차 출처인지 확인합니다."""
    for blocked in BLOCKED_SOURCES:
        if blocked.lower() in source_text.lower():
            return False
    for primary in PRIMARY_SOURCES:
        if primary.lower() in source_text.lower():
            return True
    return False


def extract_sources_from_line(line: str) -> list[str]:
    """텍스트에서 출처 정보를 추출합니다."""
    sources = []
    patterns = [
        r'출처[:\s]+(.+?)(?:\n|$)',
        r'[Ss]ource[:\s]+(.+?)(?:\n|$)',
        r'\(([^)]*(?:IR|Research|Conference|Omdia|Goldman|McKinsey|IFR|OECD|NVIDIA|DeepMind)[^)]*)\)',
    ]
    for pat in patterns:
        for m in re.finditer(pat, line):
            raw = m.group(1).strip()
            for part in re.split(r'[,·/]', raw):
                part = part.strip()
                if part:
                    sources.append(part)
    return sources


# ── MD 파싱 ─────────────────────────────────────────────────────────────
class ReportParser:
    """마크다운 보고서에서 구조화된 데이터를 추출합니다."""

    def __init__(self, filepath: str):
        self.filepath = Path(filepath)
        self.content = self.filepath.read_text(encoding="utf-8")
        self.sections = self._split_sections()
        self.extracted = {}
        self.sources_found = []
        self.blocked_sources = []

    def _split_sections(self) -> dict[str, str]:
        """헤딩 기준으로 섹션을 분할합니다."""
        sections = {}
        current_heading = "intro"
        current_lines = []
        for line in self.content.split("\n"):
            m = re.match(r'^#{1,3}\s+(.+)', line)
            if m:
                if current_lines:
                    sections[current_heading] = "\n".join(current_lines)
                current_heading = m.group(1).strip()
                current_lines = []
            else:
                current_lines.append(line)
        if current_lines:
            sections[current_heading] = "\n".join(current_lines)
        return sections

    def parse(self) -> dict:
        """보고서를 파싱하여 추출된 데이터를 반환합니다."""
        self._extract_sources()
        self._extract_oem_targets()
        self._extract_shipments()
        self._extract_kr_valuechain()
        self._extract_atlas_specs()
        self._extract_hmg_strategy()
        self._extract_competition()
        return self.extracted

    def _extract_sources(self):
        """보고서 전체에서 출처를 스캔합니다."""
        for line in self.content.split("\n"):
            for src in extract_sources_from_line(line):
                if any(b.lower() in src.lower() for b in BLOCKED_SOURCES):
                    self.blocked_sources.append(src)
                elif is_primary_source(src):
                    self.sources_found.append(src)

    def _extract_oem_targets(self):
        """OEM 생산 목표 데이터를 추출합니다."""
        oem_keywords = {
            "Tesla": ["tesla", "optimus", "테슬라"],
            "Boston Dynamics": ["boston dynamics", "bd", "보스턴", "atlas", "아틀라스"],
            "AGIBOT": ["agibot", "아지봇"],
            "UBTECH": ["ubtech", "유비테크"],
            "Unitree": ["unitree", "유니트리"],
            "Figure AI": ["figure ai", "figure", "피규어"],
            "Agility": ["agility", "digit", "어질리티"],
        }
        updates = []
        for section_name, section_text in self.sections.items():
            for oem, keywords in oem_keywords.items():
                if any(kw in section_name.lower() or kw in section_text.lower() for kw in keywords):
                    entry = self._parse_oem_section(oem, section_text)
                    if entry:
                        updates.append(entry)
        if updates:
            self.extracted["oemTargets"] = updates

    def _parse_oem_section(self, oem: str, text: str) -> dict | None:
        """단일 OEM의 생산 목표를 파싱합니다."""
        entry = {"name": oem}
        patterns = {
            "target2026": [
                r'2026[년\s]*[목표:]*\s*([^,\n]+(?:CAPA|대|만|개소)[^,\n]*)',
                r'(RMAC[^,\n]*2026[^,\n]*)',
            ],
            "target2030": [
                r'2028[~\-]?30[년\s]*[목표:]*\s*([^,\n]+)',
                r'(\d+[만K]\s*(?:CAPA|대)[^,\n]*\(?(?:2028|2030)[^)]*\)?)',
            ],
            "price": [
                r'[단가가격ASP]+[:\s]*\$?([\d,.]+[~\-]?[\d,.]*K?)',
            ],
            "battery": [
                r'배터리[:\s]*([^,\n]+)',
                r'[Bb]attery[:\s]*([^,\n]+)',
            ],
        }
        found = False
        for field, pats in patterns.items():
            for pat in pats:
                m = re.search(pat, text, re.IGNORECASE)
                if m:
                    entry[field] = m.group(1).strip()
                    found = True
                    break
        return entry if found else None

    def _extract_shipments(self):
        """출하량 데이터를 추출합니다."""
        shipment_data = {}
        table_pattern = re.compile(
            r'\|?\s*(\d{4})\s*\|?\s*([\d,.]+)\s*\|?\s*([\d,.]+)\s*\|?\s*([\d,.]+)'
        )
        for line in self.content.split("\n"):
            m = table_pattern.match(line.strip())
            if m:
                year = int(m.group(1))
                if 2024 <= year <= 2045:
                    vals = [
                        float(m.group(2).replace(",", "")),
                        float(m.group(3).replace(",", "")),
                        float(m.group(4).replace(",", "")),
                    ]
                    shipment_data[year] = vals
        if shipment_data:
            self.extracted["shipments"] = shipment_data

    def _extract_kr_valuechain(self):
        """한국 밸류체인 업데이트를 추출합니다."""
        kr_keywords = ["밸류체인", "value chain", "공급망", "supply chain", "한국 기업"]
        relevant_sections = {
            name: text for name, text in self.sections.items()
            if any(kw in name.lower() for kw in kr_keywords)
        }
        if not relevant_sections:
            return

        updates = []
        company_pattern = re.compile(
            r'[-•*]\s*([\w가-힣]+)\s*(?:\((\d{6})\))?\s*[:\-—]\s*(.+)',
        )
        for text in relevant_sections.values():
            for m in company_pattern.finditer(text):
                company = m.group(1).strip()
                ticker = m.group(2) or "-"
                info = m.group(3).strip()
                parts_m = re.search(r'((?:[\w가-힣]+[·,]\s*)*[\w가-힣]+)', info)
                updates.append({
                    "company": company,
                    "ticker": ticker,
                    "info": info,
                    "parts": parts_m.group(1) if parts_m else info,
                })
        if updates:
            self.extracted["krValueChain"] = updates

    def _extract_atlas_specs(self):
        """Atlas 스펙 데이터를 추출합니다."""
        spec_patterns = {
            "weight": (r'(?:중량|무게|weight)[:\s]*(\d+)\s*kg', "kg"),
            "height": (r'(?:키|신장|height)[:\s]*([\d.]+)\s*m', "m"),
            "payload": (r'(?:적재|payload|하중)[:\s]*(\d+)\s*kg', "kg"),
            "dof": (r'(?:DoF|자유도)[:\s]*(\d+)', ""),
            "ip": (r'(IP\d+)', ""),
        }
        specs = {}
        full_text = self.content
        for key, (pat, unit) in spec_patterns.items():
            m = re.search(pat, full_text, re.IGNORECASE)
            if m:
                val = m.group(1)
                specs[key] = {"value": float(val) if "." in val else int(val), "unit": unit}
        if specs:
            self.extracted["atlasSpecs"] = specs

    def _extract_hmg_strategy(self):
        """HMG 로보틱스 전략 데이터를 추출합니다."""
        hmg_keywords = ["hmg", "현대차", "현대모비스", "오토에버", "글로비스", "역할", "rmca"]
        relevant = ""
        for name, text in self.sections.items():
            if any(kw in (name + text).lower() for kw in hmg_keywords):
                relevant += text + "\n"
        if not relevant:
            return

        strategy = {}
        captive_m = re.search(r'(\d[,.\d]*)\s*(?:만)?(?:대|units)', relevant)
        if captive_m:
            val = captive_m.group(1).replace(",", "")
            strategy["captiveDemand"] = int(float(val))

        rmca_m = re.search(r'RMAC[^.]*?(\d{4})\s*(?:년\s*)?(\w+)', relevant)
        if rmca_m:
            strategy["rmcaLaunch"] = f"{rmca_m.group(1)} {rmca_m.group(2)}"

        capa_m = re.search(r'(\d[,\d]*)\s*(?:units?/yr|대/년|CAPA)', relevant, re.IGNORECASE)
        if capa_m:
            strategy["factoryCapacity"] = int(capa_m.group(1).replace(",", ""))

        if strategy:
            self.extracted["hmgRobotics"] = strategy

    def _extract_competition(self):
        """경쟁 구도 출하량 데이터를 추출합니다."""
        comp_pattern = re.compile(
            r'[-•*]\s*([\w\s]+?)\s*[:\-—]\s*([\d,.]+)\s*(?:대|units)',
        )
        comp_data = {}
        for name, text in self.sections.items():
            year_m = re.search(r'(\d{4})', name)
            if not year_m:
                continue
            year = int(year_m.group(1))
            entries = []
            for m in comp_pattern.finditer(text):
                entries.append({
                    "name": m.group(1).strip(),
                    "units": int(m.group(2).replace(",", "")),
                })
            if entries:
                comp_data[year] = entries
        if comp_data:
            self.extracted["competitionShipments"] = comp_data


# ── data.js 업데이트 ──────────────────────────────────────────────────
class DataJSUpdater:
    """data.js 파일을 안전하게 업데이트합니다."""

    def __init__(self, data_js_path: Path = DATA_JS):
        self.path = data_js_path
        self.content = self.path.read_text(encoding="utf-8")

    def backup(self) -> Path:
        """업데이트 전 백업을 생성합니다."""
        ts = datetime.now().strftime("%Y%m%d_%H%M%S")
        backup_path = self.path.parent / f"data_backup_{ts}.js"
        shutil.copy2(self.path, backup_path)
        return backup_path

    def update_field(self, field_path: str, new_value: str) -> bool:
        """data.js 내 특정 필드 값을 업데이트합니다.

        field_path: 점 구분 경로 (예: 'atlasSpecs.payload.value')
        new_value: 새 값 (JS 리터럴 형태의 문자열)
        """
        parts = field_path.split(".")
        if len(parts) < 2:
            return False

        pattern = self._build_field_pattern(parts)
        if pattern and re.search(pattern, self.content):
            self.content = re.sub(pattern, rf'\g<1>{new_value}\g<2>', self.content, count=1)
            return True
        return False

    def _build_field_pattern(self, parts: list[str]) -> str | None:
        """필드 경로로부터 정규식 패턴을 구축합니다."""
        if len(parts) == 2:
            return rf'({parts[0]}\s*:\s*\{{[^}}]*{parts[1]}\s*:\s*)([^,\n}}]+)(\s*[,}}])'
        elif len(parts) == 3:
            return rf'({parts[1]}\s*:\s*\{{[^}}]*{parts[2]}\s*:\s*)([^,\n}}]+)(\s*[,}}])'
        return None

    def update_oem_target(self, oem_name: str, field: str, value: str):
        """OEM 목표 테이블의 특정 셀을 업데이트합니다."""
        pattern = rf"(name:\s*'{re.escape(oem_name)}'[^}}]*{field}\s*:\s*')([^']*)(')"
        self.content = re.sub(pattern, rf"\g<1>{value}\g<3>", self.content)

    def update_kr_company_note(self, company: str, new_note: str):
        """KR 밸류체인 기업의 비고(note)를 업데이트합니다."""
        pattern = rf"(company:\s*'{re.escape(company)}'[^}}]*note:\s*')([^']*)(')"
        self.content = re.sub(pattern, rf"\g<1>{new_note}\g<3>", self.content)

    def add_update_log_entry(self, date: str, title: str, source: str, changes: list[str]):
        """updateLog 배열에 새 항목을 추가합니다."""
        changes_js = ",\n        ".join(f"'{c}'" for c in changes)
        new_entry = f"""    {{
      date: '{date}',
      title: '{title}',
      source: '{source}',
      changes: [
        {changes_js},
      ],
    }},"""

        marker = "updateLog: ["
        idx = self.content.find(marker)
        if idx == -1:
            return False
        insert_pos = idx + len(marker)
        self.content = self.content[:insert_pos] + "\n" + new_entry + self.content[insert_pos:]
        return True

    def update_last_updated(self):
        """lastUpdated 필드를 오늘 날짜로 업데이트합니다."""
        today = datetime.now().strftime("%Y-%m-%d")
        self.content = re.sub(
            r"(lastUpdated:\s*')[^']*(')",
            rf"\g<1>{today}\g<2>",
            self.content,
        )

    def save(self):
        """변경된 data.js를 저장합니다."""
        self.path.write_text(self.content, encoding="utf-8")

    def validate_sources(self) -> dict:
        """data.js 내 모든 출처를 검증합니다."""
        results = {"primary": [], "blocked": [], "unknown": []}
        source_pattern = re.compile(r"source:\s*'([^']+)'")
        for m in source_pattern.finditer(self.content):
            raw = m.group(1)
            for part in re.split(r'[,·/]', raw):
                part = part.strip()
                if not part:
                    continue
                if any(b.lower() in part.lower() for b in BLOCKED_SOURCES):
                    results["blocked"].append(part)
                elif is_primary_source(part):
                    results["primary"].append(part)
                else:
                    results["unknown"].append(part)
        return results


# ── 변경사항 적용 ──────────────────────────────────────────────────────
def apply_updates(extracted: dict, updater: DataJSUpdater, source_str: str, dry_run: bool = False) -> list[str]:
    """파싱된 데이터를 data.js에 적용합니다."""
    changes = []

    if "oemTargets" in extracted:
        for oem in extracted["oemTargets"]:
            name = oem["name"]
            for field in ["target2026", "target2030", "price", "battery"]:
                if field in oem:
                    updater.update_oem_target(name, field, oem[field])
                    changes.append(f"OEM {name} {field} → {oem[field]}")

    if "atlasSpecs" in extracted:
        for key, spec in extracted["atlasSpecs"].items():
            val = spec["value"]
            if updater.update_field(f"atlasSpecs.{key}.value", str(val)):
                changes.append(f"Atlas {key} → {val}{spec.get('unit', '')}")

    if "krValueChain" in extracted:
        for entry in extracted["krValueChain"]:
            updater.update_kr_company_note(entry["company"], entry.get("info", ""))
            changes.append(f"KR 밸류체인: {entry['company']} 업데이트")

    if "hmgRobotics" in extracted:
        hmg = extracted["hmgRobotics"]
        if "captiveDemand" in hmg:
            updater.update_field("hmgRobotics.captiveDemand", str(hmg["captiveDemand"]))
            changes.append(f"HMG captiveDemand → {hmg['captiveDemand']}")
        if "factoryCapacity" in hmg:
            updater.update_field("hmgRobotics.factoryCapacity", str(hmg["factoryCapacity"]))
            changes.append(f"HMG factoryCapacity → {hmg['factoryCapacity']}")

    if changes and not dry_run:
        today = datetime.now().strftime("%Y-%m-%d")
        updater.add_update_log_entry(today, f"MD 보고서 자동 업데이트", source_str, changes)
        updater.update_last_updated()

    return changes


# ── CLI ─────────────────────────────────────────────────────────────────
def main():
    parser = argparse.ArgumentParser(
        description="휴머노이드 대시보드 자동 업데이트 (MD → data.js)",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
예시:
  python update_dashboard.py jpm_conference_2026.md
  python update_dashboard.py reports/ --dry-run
  python update_dashboard.py --validate
        """,
    )
    parser.add_argument("input", nargs="?", help="MD 파일 또는 폴더 경로")
    parser.add_argument("--dry-run", action="store_true", help="변경 미리보기 (파일 수정 안 함)")
    parser.add_argument("--validate", action="store_true", help="data.js 출처 검증")
    parser.add_argument("--no-backup", action="store_true", help="백업 생성 안 함")

    args = parser.parse_args()

    if args.validate:
        updater = DataJSUpdater()
        results = updater.validate_sources()
        print("=" * 60)
        print("  data.js 출처 검증 결과")
        print("=" * 60)
        print(f"\n✅ 1차 출처 ({len(results['primary'])}개):")
        for s in sorted(set(results["primary"])):
            print(f"   • {s}")
        if results["blocked"]:
            print(f"\n❌ 차단된 2차 출처 ({len(results['blocked'])}개):")
            for s in sorted(set(results["blocked"])):
                print(f"   ✗ {s}")
        if results["unknown"]:
            print(f"\n⚠️  미분류 출처 ({len(results['unknown'])}개):")
            for s in sorted(set(results["unknown"])):
                print(f"   ? {s}")
        print()
        return

    if not args.input:
        parser.print_help()
        sys.exit(1)

    input_path = Path(args.input)
    md_files = []
    if input_path.is_dir():
        md_files = sorted(input_path.glob("*.md"))
    elif input_path.is_file() and input_path.suffix == ".md":
        md_files = [input_path]
    else:
        print(f"❌ 유효한 MD 파일/폴더가 아닙니다: {input_path}")
        sys.exit(1)

    if not md_files:
        print(f"❌ MD 파일을 찾을 수 없습니다: {input_path}")
        sys.exit(1)

    updater = DataJSUpdater()

    if not args.dry_run and not args.no_backup:
        backup = updater.backup()
        print(f"📦 백업 생성: {backup.name}")

    all_changes = []
    all_blocked = []
    all_sources = []

    for md_file in md_files:
        print(f"\n📄 파싱 중: {md_file.name}")
        report = ReportParser(str(md_file))
        extracted = report.parse()

        if report.blocked_sources:
            all_blocked.extend(report.blocked_sources)
            print(f"   ⚠️  차단된 2차 출처: {', '.join(set(report.blocked_sources))}")

        if report.sources_found:
            all_sources.extend(report.sources_found)
            print(f"   ✅ 1차 출처: {', '.join(set(report.sources_found))}")

        source_str = ", ".join(sorted(set(report.sources_found))) if report.sources_found else md_file.stem
        changes = apply_updates(extracted, updater, source_str, dry_run=args.dry_run)
        all_changes.extend(changes)

        if changes:
            for c in changes:
                print(f"   → {c}")
        else:
            print("   ℹ️  추출된 업데이트 없음")

    print("\n" + "=" * 60)
    if args.dry_run:
        print("  🔍 DRY RUN — 변경사항 미리보기 (파일 수정 없음)")
    else:
        print("  📊 업데이트 결과")
    print("=" * 60)
    print(f"  파일: {len(md_files)}개 MD 처리")
    print(f"  변경: {len(all_changes)}건")
    print(f"  1차 출처: {len(set(all_sources))}개")
    if all_blocked:
        print(f"  ❌ 차단된 2차 출처: {len(set(all_blocked))}개")
        for b in sorted(set(all_blocked)):
            print(f"     ✗ {b}")

    if all_changes and not args.dry_run:
        updater.save()
        print(f"\n✅ data.js 업데이트 완료!")
    elif not all_changes:
        print(f"\nℹ️  업데이트할 내용이 없습니다.")

    if all_blocked:
        print("\n⚠️  경고: 2차 가공 출처(증권사)가 감지되었습니다.")
        print("   해당 데이터는 자동으로 제외되었습니다.")
        print("   원데이터(1차 출처)만 사용해주세요.")


if __name__ == "__main__":
    main()
