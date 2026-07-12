# 휴머노이드 대시보드 탭 간소화 계획 v3

> 작성일: 2026-07-12 · 기준: `v1-11tabs` 태그 (= 커밋 `0827621`, 11탭, 롤백 기준점·push 완료)
> v3 변경: ① 개선 제안 편입(데이터 일원화·lazy loading·README·GIF 경량화) ② **GitHub Pages 자동배포 주의 신설(§0-B)** ③ 개편 후 작업 부록(§10) ④ **세션 핸드오프 가이드(§9) — Opus 4.8/Sonnet 5 세션이 이 문서만 읽고 단계 수행 가능하도록 재구성**
> 문서 원칙: Be direct and concrete. Show all intermediate states. Explain like I'm 12.

---

## §0-A. 한 줄 요약

**탭 11개 → 5개. 내용은 한 글자도 안 바꾸고 "집만 옮긴다"(§2). 첫 탭에 전체 목차. 기술은 [전체 그림 → SW → HW] 순서.**

```
지금 (11탭)                                     나중 (5탭 + 대문)
─────────────────────────────                  ─────────────────────────
프레임워크 / TAM 시뮬 / 기업별 TAM /            대문(index) ─ 5탭 안내
부품 기술 / 해부 / Physical AI /                ① 프레임워크 (왜 + 병목 지도 + 전체 목차)
기술 설명 / US / KR / 경쟁 / 밸류에이션          ② 시장·경쟁 [TAM 시뮬|기업별 TAM|경쟁 현황]
                                                ③ 기술 [전체 그림|소프트웨어|하드웨어]
읽는 순서 = 스토리:                              ④ 밸류체인 [KR|US]
왜① → 얼마나② → 어떻게③ → 누가④ → 얼마⑤        ⑤ 밸류에이션
```

## §0-B. ⚠️ 라이브 배포 주의 (모든 세션 필독)

`.github/workflows/deploy-pages.yml`이 **main push마다 레포 전체를 GitHub Pages로 자동 배포**한다. 즉 모든 커밋이 즉시 공개 사이트에 반영된다. 따라서:
- **매 커밋 = 완전 작동 상태** 규칙(§5)은 선택이 아니라 필수다. 부수고 다음 커밋에서 고치기 금지.
- 문제 발생 시 롤백 기준점: 태그 `v1-11tabs`.
- push 전 로컬 렌더 검증(콘솔 0)은 생략 불가.

---

## §1. 왜 바꾸나 — 중복 실태 (2026-07-12 전 탭 ~100카드 인벤토리)

| 주제 | 흩어진 곳 | 곳수 |
|---|---|---|
| 원가/BOM | index(BOM Editor)·company_tam(BOM 심층)·components(원가분해·하락트렌드·8카테고리)·physical_ai(원가 구조)·anatomy(02) | **5** |
| 감속기 | components(3종 원리·부위별×벤더)·anatomy(03)·competition(하모닉 M/S)·technology(용어) | **4** |
| OEM 비교 | company_tam(모델 비교)·components(스펙·관절맵)·competition(Tracker)·anatomy(열지도) | **4** |
| 로보티즈 | company_tam(실적·TAM)·competition(매트릭스)·valuation(밸류)·technology(팩트체크·Sim2Real) | **4** |
| WFM | competition(구도·풀스택 전쟁)·physical_ai·technology(Part4) | **3** |
| VLA / 손(Hand) | physical_ai·technology(Part2)·anatomy(09) / company_tam(M/S)·components(원가)·anatomy(05) | 각 **3** |
| 열관리 / 전력수요 / BD·Atlas / 밸류시뮬 | components↔anatomy / index↔framework / kr_valuechain↔technology(6.5) / valuation↔kr_valuechain | 각 **2** |

문제: 어디서 읽을지 모름 · 한쪽만 갱신되면 어긋남(실사례: Atlas 감속기 표기 불일치 → 26-07-12 정정 커밋 `e755078`) · 시작점 부재.
**해법: 한 주제 = 한 집. 타 페이지는 "요약 1줄 + 링크"만.**

---

## §2. 🔒 콘텐츠 보존 원칙 (최우선 규칙 — 모든 세션이 §0-B와 함께 필독)

이 작업은 **"이사"이지 "리모델링"이 아니다.**

### 허용 (이것만)
1. **코드째 이동**: 기존 카드(HTML·SVG·JS)를 복사-붙여넣기. 문구·수치·출처·[추정] 태그·색·이모지 그대로.
2. **신규 작성**: nav·서브탭·앵커 id·목차·연결문·병목 지도·대문 등 **새로 추가되는 것만**. (§7 스타일은 신규 텍스트에만)
3. **계획된 중복 대체**: §4 매핑표에 명시된 항목만 "요약 1줄+정본 링크"로 교체. 표에 없는 삭제·축소 금지.

### 금지
기존 문장 리라이팅 · 수치/출처 변경 · 카드 구조 개편 · "김에 고치기" 일체. (CLAUDE.md 데이터 보호 동일)

### 검증 (매 커밋 의무)
커밋 보고에 **[이동/신규/대체·삭제] 3표** 첨부 · 이동 블록 전후 diff 동일 확인 · 대체는 §4 목록과 1:1 대조.

---

## §3. 최종 모습 — 5탭 설계 (각 Step 세션은 자기 탭 절만 읽으면 됨)

### 탭 ① 프레임워크 (framework.html 유지·보강) — Step 6에서 완성
- **①-A 📑 전체 목차(신규)**: 최상단 접이식, 5탭×서브탭×주요 섹션 3단 트리, 클릭 → `페이지#앵커`. 앵커 id는 각 Step에서 부여, C6에서 전수 점검.
- **①-B 관통 메시지 3개 + 해결책 4종 패키지 요약** (정본: anatomy, 여기는 요약+링크)
- **①-C 🚧 병목 지도(신규)**: "고속도로 정체 지점 4곳" — 각 [비유 1줄 + 수치 배지 + 정본 링크]
  | 병목 | 한 줄 | 수치 | 정본 |
  |---|---|---|---|
  | 🌡️ 열 | 로봇은 일 조금 하는 난로 — 8시간을 못 버틴다 | 입력 ~90% 열·전완 9/10 [자체추정] | ③-3 해부07 |
  | 🧠 데이터 | 두뇌에 먹일 "몸 경험"이 없다 | 100 vs 10,000대·수집 비용 | ③-2 |
  | 💰 원가/양산 | 액추에이터 24개 = 자동차 한 대 값 | $1,000→$100 | ②·③-3 |
  | 🔩 공급 부품 | 정밀 감속기는 만들 회사가 적다 | 공급 병목 히트맵 | ②·④ |
  기존 "물리 레이어 병목 5대 수혜" 카드는 무수정 유지, 그 앞에 배치("뭐가 막혔나→누가 수혜인가").
- **①-D 기존 framework 전부 무수정** + **①-E competition에서 이사(무수정)**: 소버린 OS 포지션·NVIDIA vs Google 풀스택 전쟁

### 탭 ② 시장·경쟁 (market.html 신설) — Step 1
- 서브탭 `[TAM 시뮬레이터|기업별 TAM|경쟁 현황]`
- TAM 시뮬 ← index.html 전부 / 기업별 TAM ← company_tam 전부 + physical_ai에서 ROI 시뮬·RMAC·현대차 인력·수혜 시기·협동로봇 셀(Step 2에서 이사) / 경쟁 현황 ← competition 수치 파트(출하량·중국 시장·성숙도·하모닉 M/S·중국 생산 M/S·Tracker·VC·모터 제어 레이어)
- 중복 대체(승인됨): components "OEM 스펙 비교" → 요약+링크 (정본: 여기)

### 탭 ③ 기술 — nav 1개, sticky 서브탭 `[전체 그림|소프트웨어|하드웨어]`
- **③-1 전체 그림 (tech.html 신설)** — Step 4: 폐루프 요약(해부01 링크)·"로봇=난로" 요약·두뇌+몸 필요성(신규 연결문) + technology에서 이사(무수정): 2020→2026 로드맵·Physical AI 로드맵·"단편적인 내용만 보지 말자"·Q&A·**용어 사전(전 탭 공용 정본)**
- **③-2 소프트웨어 (physical_ai.html 개편)** — Step 2: 배치 순서 VLA→Dual System→WFM→데이터 전쟁→온디바이스→범용 OS→End Game. 유입(무수정): technology Part1~6·로보티즈 팩트체크·Sim2Real·competition WFM 구도. 유출(무수정): 원가·ROI·RMAC 등 → ②
- **③-3 하드웨어 (anatomy+components 쌍, 상호 서브탭)** — Step 3: 해부=이야기책(무수정)·부품=데이터북. 유입(무수정): technology Part6.5·7. 중복 대체(승인됨): components의 감속기·손·열관리 "설명 문단" → 요약+해부 링크 (**표·시뮬레이터·수치는 전부 유지**). **+ 데이터 일원화(v3): components 인라인 OEM_SPECS·RADAR_OEM 삭제하고 data.js 로드로 전환 — 값 무수정, 소스만 단일화(Atlas류 사고 원천 차단)**

### 탭 ④ 밸류체인 (kr_valuechain.html에 US 서브탭 통합) — Step 5
- `[🇰🇷 KR|🇺🇸 US]` — KR 무수정 + US(us_valuechain 전부 이동) + competition 로보티즈 매트릭스 유입. 유출: 밸류 시뮬 → ⑤

### 탭 ⑤ 밸류에이션 (valuation.html) — Step 5
- 기존 무수정 + kr_valuechain 밸류 시뮬 유입(중복 병합은 사용자 승인 후)

---

## §4. 이동 매핑표 — 삭제·대체는 이 표가 전부

| 현재 파일 | 운명 | 도착지 (무수정 이동) |
|---|---|---|
| framework.html | 유지·보강 | ① (+목차·병목 지도 신규) |
| index.html | **대문으로 재구성** | TAM 시뮬→②. index=5탭 안내 대문(신규) |
| company_tam.html | 이동 후 **삭제** | 전부 ② |
| competition.html | 이동 후 **삭제** | 수치→② / 소버린·풀스택→① / WFM→③-2 / 로보티즈 매트릭스→④KR |
| components.html | 유지·다이어트 | ③-3 (대체: 감속기·손·열관리 설명 문단, OEM 스펙 비교 / **인라인 데이터 → data.js 일원화**) |
| anatomy.html | 유지(무수정) | ③-3 |
| physical_ai.html | 유지·개편 | ③-2 (SW 유입 / 원가·ROI → ② 유출) |
| technology.html | 이동 후 **삭제** | 로드맵·Q&A·용어→③-1 / Part1~6→③-2 / 6.5·7→③-3 |
| us_valuechain.html | 이동 후 **삭제** | ④ US |
| kr_valuechain.html | 유지·개편 | ④ KR (밸류 시뮬→⑤ 유출) |
| valuation.html | 유지·흡수 | ⑤ |

스텁 없음(확정) — 구 파일 4개는 "이동 diff 확인 → 같은 커밋에서 삭제". git 히스토리·`v1-11tabs` 태그로 복구 가능. 내부 링크는 각 Step에서 전수 갱신.

---

## §5. 중간 상태 — 커밋 6개 (매 단계 = 라이브 배포되는 완성품, §0-B)

```
Step 0 (지금, 11탭) — 태그 v1-11tabs
[프레임워크|TAM 시뮬|기업별 TAM|부품 기술|해부|Physical AI|기술 설명|US|KR|경쟁|밸류에이션]

Step 1 — C1: market.html 신설 + index 대문화 + company_tam·competition 삭제 → 8탭
[대문|프레임워크|시장·경쟁|부품 기술|해부|Physical AI|기술 설명|US|KR|밸류에이션]
  ※competition 중 ①·③-2·④행 콘텐츠는 market.html "임시 보관" 서브탭에 무수정 격리 → C2·C4·C5에서 재이동
  검증: TAM 슬라이더·Tracker·ROI 자리(아직 ③-2에 있음) / 임시 보관 렌더 / nav 전수 / 무수정 diff

Step 2 — C2: 기술-SW (physical_ai ← technology Part1~6·WFM구도 / 원가·ROI·RMAC → ②) → 8탭
  검증: 유튜브 임베드 / ② ROI 동작 / 외부 mp4 핫링크(pi.website·nvidia) → 유튜브 임베드 교체(v3 편입) / diff

Step 3 — C3: 기술-HW (components↔anatomy 상호 서브탭 + technology 6.5·7 이식 + 대체 목록 적용 + 인라인 데이터 → data.js 일원화) → 7탭
  검증: 서브탭 전환 / FOC·ASP·관절맵 시뮬 동작(데이터 소스 전환 후!) / 대체 1:1 대조 / diff

Step 4 — C4: tech.html 신설(전체 그림) + technology.html 삭제 → 6탭
  검증: 기술 서브탭 3개 왕복 / 용어사전 앵커 전 탭 갱신 / 삭제 전 이동 diff 확정

Step 5 — C5: 밸류체인 KR/US 통합 + 밸류 시뮬 → ⑤ + us_valuechain 삭제 → 5탭+대문
  검증: KR/US 서브탭 / 밸류 시뮬 ⑤ 동작 / anatomy KR 링크 갱신

Step 6 — C6: 마감 — 프레임워크 완성(목차·병목 지도·관통 메시지) + README 최신화(탭 목록·배포 URL) + loading="lazy" 전 페이지 확대(현재 technology만 11개) + 앵커 전수 점검
  검증: 목차 전 링크 클릭 / 콘솔 0 / 모바일 / 삭제 4파일 참조 grep 0 / README·lazy 확인
```

---

## §6. 시각 자료 — 외부 소싱 우선, 자체 SVG는 최후(그때는 상세하게)

소싱 사다리: ①레포 보유(img/anatomy 15장·naver_arc.png·기존 SVG/canvas) → ②Wikimedia CC/CC0(출처 캡션 필수, 해부 탭 선례) → ③제조사 공식 프레스킷 → ④유튜브 임베드(영상은 다운로드 금지, 임베드만) → ⑤분해영상 정지 캡처(기존 관행 범위, 출처 표기) → ⑥**자체 SVG(최후·약식 금지: 비율·라벨·범례 갖춘 상세 제작)**

| 필요 자료 | 쓸 곳 | 1차 | 폴백 |
|---|---|---|---|
| 전신 해부 포스터 | ③-1 | Wikimedia/프레스킷 | 상세 SVG(라벨+열지도) |
| 5탭 안내도·병목 지도 | ①·대문 | (개념도) | 상세 SVG |
| SW 파이프라인 | ③-2 | (논문 도표는 저작권 위험) | 상세 SVG |
| VLA·데모 영상 | ③-1·2 | 유튜브 임베드 | — |
| 미확보 분해 컷 7장 | ③-3 | 사용자 캡처→Wikimedia→영상 캡처 | 기존 SVG 유지 |
| OEM 제품 사진 | ② | 프레스킷·Wikimedia | 텍스트 배지 |

**금지(불변):** 증권사 도표 ❌ IR 슬라이드 캡처 ❌ 언론사 사진 ❌ 외부 mp4 파일 커밋 ❌

## §7. "12살" 쓰기 규칙 — 신규 텍스트에만 (기존 콘텐츠 적용 금지, §2 우선)

비유 먼저·용어는 괄호 / 첫 줄=한 문장 요약 / 숫자는 num-box 배지 / 추정은 [추정] 태그 / 한 화면 개념 1개 / 섹션 끝 "더 보기→" 1개.

---

## §8. 확정된 결정사항

index=대문(1-a) · 스텁 없이 삭제(2-b) · ROI/RMAC→②(3-b) · updateLog 현행 유지(4-a) · 시각자료=소싱 사다리(§6) · OEM 사진=프레스킷 시도(6) · 2~3세션 분할(7-a) · 계획서 docs/ 커밋(8-a) · 콘텐츠 무수정 보존+3표 검증(9) · 전체 목차(10) · **태그 v1-11tabs 생성·push 완료(11, v3)** · **components 데이터 일원화 = Step 3 편입(12, v3)** · **README·lazy loading = Step 6 편입(13, v3)**

---

## §9. 세션 핸드오프 가이드 (Opus 4.8 / Sonnet 5 세션용 — 토큰 절약 규칙)

**이 문서가 유일한 명세다. 노션 검색 불필요.** 각 Step 세션은 아래만 읽으면 된다:

| Step | 필독 절 | 그 외 금지/주의 |
|---|---|---|
| 공통 | §0-B(라이브 배포) + §2(보존 원칙) + §5의 해당 Step 블록 | 시작 전 `git pull`(CLAUDE.md), 로컬 서버는 `클로드\.claude\serve.ps1`(이 PC는 py/node 없음. 다른 PC는 레포 내 launch.json의 py 서버) |
| C1 | §3-②, §4의 index·company_tam·competition 행 | competition의 ①·③-2·④행 콘텐츠 유실 금지(임시 보관) |
| C2 | §3-③-2, §4의 physical_ai·technology 행 | technology는 아직 삭제 금지(잔여 Part6.5·7·Q&A) |
| C3 | §3-③-3, §4의 components 행 | 대체는 명시 4건만·시뮬레이터 데이터 소스 전환 검증 필수 |
| C4 | §3-③-1, §4의 technology 행 | 삭제 전 이동 diff 확정 |
| C5 | §3-④·⑤, §4의 us/kr_valuechain·valuation 행 | anatomy의 KR 링크 갱신 |
| C6 | §3-① + §5 Step6 검증 목록 | 목차 앵커 전수 클릭 |

**세션 시작 프롬프트 템플릿:**
```
humanoid-live 레포에서 탭 간소화 Step N 진행해줘.
명세: docs/tab_consolidation_plan_kr.md — §0-B·§2·§5의 Step N·§9의 CN 행만 읽으면 됨.
절차: git pull → 구현 → 로컬 렌더 검증(콘솔 0·nav·모바일) → [이동/신규/대체] 3표+스크린샷 보고 → 승인 후 커밋·push.
```

**매 커밋 보고 양식(고정):** ① nav 전/후 ② [이동/신규/대체·삭제] 3표 ③ 렌더 스크린샷 ④ 콘솔 에러 수 ⑤ diff 무수정 확인 문장.

---

## §10. 부록 — 개편 완료 후 작업 (별도 세션, 우선순위순)

1. **CI 정합성 체크**: GitHub Actions에 `update_dashboard.py --validate`(레포 보유 스크립트: 1차 출처 화이트리스트·증권사 블랙리스트) + 내부 앵커 검증 잡 추가 → 실패 시 Pages 배포 차단. 로컬 PC엔 python 없어도 CI엔 있음.
2. **캐시버스팅 통일**: `data.js?v=`가 파일마다 상이(20260602b vs 20260712anatomy) → 규칙 통일 or CI가 커밋 해시 주입.
3. **대형 GIF 경량화**: assets/pi0_flow.gif 4.5MB·rtc_match.gif 1.7MB(assets 7.1MB의 87%) → mp4/webm 변환 or 유튜브 임베드 (모바일 페이지 무게).
4. **update_dashboard.py 부활**: 주간 노션 노트 → MD → 스크립트 반영 루틴화.
5. **시총·종가 하드코딩 일원화**: 산재 값 → data.js 한 곳.
6. **클라이언트 검색·updateLog 접기**: 5탭 완성 후 선택.
