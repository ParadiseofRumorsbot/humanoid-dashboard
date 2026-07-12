# Humanoid Dashboard

휴머노이드 로봇 TAM 시뮬레이터 + Physical AI 투자 분석 + 부품 기술 시각화 플랫폼.
정적 사이트(순수 HTML/CSS/JS, 빌드 없음) — GitHub Pages 배포.

## 구조 — 대문 + 5탭 (셸/iframe 아키텍처)

상단 탭은 각각 **셸 페이지**이고, 서브탭은 오토핏 `iframe`으로 콘텐츠 페이지를 얹는다.
셸은 `#탭:앵커` 형태의 해시 딥링크를 지원한다(예: `tech.html#parts:gear`).

| 탭 | 셸 | 서브탭 → 콘텐츠 페이지 |
|---|---|---|
| 대문 | `index.html` | TAM 시뮬레이터 관문 + 5탭 요약 |
| 프레임워크 | `framework.html` | 투자 프레임워크(뉴턴의 법칙)·병목 지도 |
| 시장·경쟁 | `market.html` | TAM 시뮬레이터(`market_tam`) · 기업별 TAM(`market_company`) · 경쟁 현황(`market_competition`) |
| 기술 | `tech.html` | 설명(`tech_overview`·`physical_ai`) · SW · HW(`hardware.html` = `anatomy` + `components` 스택) |
| 밸류체인 | `valuechain.html` | KR(`kr_valuechain`) · US(`us_valuechain`) |
| 밸류에이션 | `valuation.html` | 밸류에이션 카드·시나리오 |

콘텐츠 페이지는 nav를 갖지 않고(셸이 보유), 페이지별 전역 충돌을 피하려 iframe으로 격리한다.

## 데이터

모든 수치·표·시뮬레이터 상수는 `data.js`의 `DASHBOARD_DATA` 한 곳에서 렌더한다.
페이지는 `data.js?v=<버전>`으로 로드하며, **버전 문자열은 전 페이지 동일하게 유지**한다(캐시버스팅 통일).

### 출처 정책 (중요)

**1차 출처(원데이터)만 사용하고, 2차 가공 출처(증권사)는 넣지 않는다.**
`update_dashboard.py --validate`가 `data.js`의 출처를 1차 화이트리스트/증권사 블랙리스트로 검증한다.
CI(`.github/workflows/validate.yml`)가 커밋마다 이 검증을 돌려 차단 출처 감지 시 배포를 막는다.

```bash
python update_dashboard.py --validate      # data.js 출처 검증
```

## 로컬 개발

이 저장소는 빌드가 없다 — 정적 파일을 그대로 서빙하면 된다.

```bash
python -m http.server 8765     # 또는 임의의 정적 서버
# http://localhost:8765/
```

## 배포

`main` 브랜치 push 시 GitHub Actions(`deploy-pages.yml`)가 GitHub Pages로 배포한다.

## 출처 목록

Omdia · SNE Research · OECD · McKinsey · IFR · GGII · IEA · NVIDIA · Tesla IR · Unitree · 각 사 IR/공시(DART) · Munro Live(G1 Teardown) · 언론 종합
