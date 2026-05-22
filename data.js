/*  ════════════════════════════════════════════════════════════════
    DASHBOARD_DATA — Humanoid Dashboard 통합 데이터 레이어
    모든 페이지에서 <script src="data.js"> 로 참조
    출처: 1차 데이터만 사용 (BD IR, HMG IR, JPM Conference 2026,
          Omdia, SNE Research, Goldman Sachs, OECD, IFR, McKinsey,
          Tesla IR, GGII, Trendforce, SBI Research, NVIDIA, Google DeepMind)
    ════════════════════════════════════════════════════════════════ */
const DASHBOARD_DATA = {

  /* ══════════════════════════════════════
     공통 설정
     ══════════════════════════════════════ */
  fx: 1450,
  version: '2.0',
  lastUpdated: '2026-05-20',

  /* ══════════════════════════════════════
     연도별 출하량 시나리오 (단위: 천 대)
     ══════════════════════════════════════ */
  scenarios: {
    sne_base: {
      name: 'SNE Base',
      source: 'SNE Research (2025)',
      desc: 'SNE Research 기준 보수적 전망. 2030년 전후 초기 양산, 2035년 ROI 검증 후 본격 확장.',
      shipments: {
        2024: [2.3, 4500, 800], 2025: [13.4, 4700, 1200], 2026: [50, 5000, 1800],
        2027: [100, 5400, 2600], 2028: [200, 5900, 3500], 2029: [400, 6500, 4500],
        2030: [690, 7200, 5500], 2031: [1100, 7800, 6500], 2032: [1800, 8500, 7500],
        2033: [2800, 9200, 8500], 2034: [4200, 10000, 9500], 2035: [6790, 11000, 10500],
        2036: [10000, 12000, 11500], 2037: [15000, 13000, 12500], 2038: [22000, 14000, 13500],
        2039: [33000, 15000, 14500], 2040: [53300, 16500, 15500],
      }
    },
    gs_bull: {
      name: 'GS Bull',
      source: 'Goldman Sachs (2025)',
      desc: 'GS 낙관 전망. 2030년 25만대, 2035년 140만대, 2040년 2,300만대.',
      shipments: {
        2024: [2.3, 4500, 800], 2025: [13.4, 4700, 1200], 2026: [50, 5000, 1800],
        2027: [80, 5400, 2600], 2028: [130, 5900, 3500], 2029: [190, 6500, 4500],
        2030: [250, 7200, 5500], 2031: [380, 7800, 6500], 2032: [550, 8500, 7500],
        2033: [780, 9200, 8500], 2034: [1050, 10000, 9500], 2035: [1400, 11000, 10500],
        2036: [2000, 12000, 11500], 2037: [3200, 13000, 12500], 2038: [5500, 14000, 13500],
        2039: [10000, 15000, 14500], 2040: [23000, 16500, 15500],
      }
    },
    tesla_acc: {
      name: 'Tesla 가속',
      source: 'Tesla IR + Musk 발언 (2026)',
      desc: 'Tesla Optimus 100만대 목표 중심. 중국 업체 양산 가속 반영. 2030년 100만대 돌파 시나리오.',
      shipments: {
        2024: [2.3, 4500, 800], 2025: [13.4, 4700, 1200], 2026: [80, 5000, 1800],
        2027: [200, 5400, 2600], 2028: [500, 5900, 3500], 2029: [800, 6500, 4500],
        2030: [1200, 7200, 5500], 2031: [2000, 7800, 6500], 2032: [3500, 8500, 7500],
        2033: [5500, 9200, 8500], 2034: [8000, 10000, 9500], 2035: [12000, 11000, 10500],
        2036: [18000, 12000, 11500], 2037: [28000, 13000, 12500], 2038: [42000, 14000, 13500],
        2039: [65000, 15000, 14500], 2040: [100000, 16500, 15500],
      }
    },
    oecd_replace: {
      name: 'OECD 대체율',
      source: 'OECD 노동가능인구 전망 + 대체율 40% 가정',
      desc: 'OECD 노동가능인구 감소분 기반. 2035년 누적 2,161만대 필요, 내구연한 3년 가정 시 연 1,000만대 생산.',
      shipments: {
        2024: [2.3, 4500, 800], 2025: [15, 4700, 1200], 2026: [70, 5000, 1800],
        2027: [189, 5400, 2600], 2028: [361, 5900, 3500], 2029: [667, 6500, 4500],
        2030: [1167, 7200, 5500], 2031: [1926, 7800, 6500], 2032: [2986, 8500, 7500],
        2033: [4643, 9200, 8500], 2034: [6965, 10000, 9500], 2035: [10000, 11000, 10500],
        2036: [12000, 12000, 11500], 2037: [14000, 13000, 12500], 2038: [16000, 14000, 13500],
        2039: [18000, 15000, 14500], 2040: [21609, 16500, 15500],
      }
    },
  },

  /* ══════════════════════════════════════
     2025년 실적 업체별 출하량 (Omdia, 2025)
     ══════════════════════════════════════ */
  shipments2025: [
    { name: 'AGIBOT', units: 5168, country: '🇨🇳' },
    { name: 'Unitree', units: 4200, country: '🇨🇳' },
    { name: 'UBTECH', units: 1000, country: '🇨🇳' },
    { name: 'Leju Robotics', units: 500, country: '🇨🇳' },
    { name: 'Engine AI', units: 400, country: '🇨🇳' },
    { name: 'Fourier Intelligence', units: 300, country: '🇨🇳' },
    { name: 'Figure AI', units: 150, country: '🇺🇸' },
    { name: 'Agility Robotics', units: 150, country: '🇺🇸' },
    { name: 'Tesla', units: 150, country: '🇺🇸' },
    { name: '기타', units: 1350, country: '🌐' },
  ],

  /* ══════════════════════════════════════
     1대당 BOM 원단위
     ══════════════════════════════════════ */
  bom: [
    { id: 'battery', name: '배터리 팩', unit: 'kWh', qty: 2.3, price: 130, priceUnit: '$/kWh',
      note: 'Optimus 2.3kWh, 52V. NCMA/NCA 원통형. SNE: 25년 1.35→30년 1.98→35년 2.6kWh', color: '#4ecdc4' },
    { id: 'harmonic', name: '하모닉 감속기', unit: '개', qty: 20, price: 350, priceUnit: '$/개',
      note: 'HDS 독과점 60-70% M/S. 손가락 포함 시 최대 28개. R&D 난이도 5', color: '#FF6B6B' },
    { id: 'rv_gear', name: 'RV 감속기', unit: '개', qty: 4, price: 800, priceUnit: '$/개',
      note: 'Nabtesco 독점. 고토크 관절(엉덩이·무릎·어깨) 전용', color: '#C44569' },
    { id: 'servo', name: '서보모터 (BLDC/PMSM)', unit: '개', qty: 28, price: 120, priceUnit: '$/개',
      note: '관절당 1개. PMSM 효율 90-95% 물리한계 근접', color: '#F8B739' },
    { id: 'inverter', name: '인버터/모터드라이브', unit: '개', qty: 28, price: 15, priceUnit: '$/개',
      note: 'SiC/GaN 전력반도체. 효율 1%p 개선 = GW 스케일 절감', color: '#6C5CE7' },
    { id: 'ndfeb', name: 'NdFeB 자석', unit: 'kg', qty: 2.0, price: 95, priceUnit: '$/kg',
      note: '중국 처리 85% 통제. 무어의 법칙 없음 → 선형 증가', color: '#A29BFE' },
    { id: 'copper', name: '구리 (모터 권선)', unit: 'kg', qty: 5.0, price: 9.5, priceUnit: '$/kg',
      note: 'LME 기준. 10억대×5kg = 500만톤 (세계 채굴량 24%)', color: '#E17055' },
    { id: 'sensor', name: '센서 (LiDAR·토크·IMU)', unit: '세트', qty: 1, price: 1500, priceUnit: '$/세트',
      note: '제조원가 비중 약 15%. 촉각센서 원가 11%', color: '#00B894' },
    { id: 'compute', name: 'AI SoC / 엣지칩', unit: '개', qty: 1, price: 500, priceUnit: '$/개',
      note: 'DEEPX DX-M1 NPU 30FPS/5W. SW 비중 6%', color: '#0984E3' },
    { id: 'structure', name: '구조체 (프레임·케이블)', unit: '세트', qty: 1, price: 800, priceUnit: '$/세트',
      note: '탄소섬유 뼈대·전력케이블. 제조원가 비중 10%', color: '#636E72' },
  ],

  /* ══════════════════════════════════════
     부품사 M/S 매핑 (TAM 배분용)
     ══════════════════════════════════════ */
  companies: {
    harmonic: [
      { name: 'HDS (일본)', ms: 0.65, ticker: '6324.JP', flag: '🇯🇵' },
      { name: '중국 업체', ms: 0.25, ticker: '-', flag: '🇨🇳' },
      { name: '기타', ms: 0.10, ticker: '-', flag: '🌐' },
    ],
    rv_gear: [
      { name: 'Nabtesco', ms: 0.60, ticker: '6268.JP', flag: '🇯🇵' },
      { name: '기타', ms: 0.40, ticker: '-', flag: '🌐' },
    ],
    servo: [
      { name: 'Yaskawa', ms: 0.20, ticker: '6506.JP', flag: '🇯🇵' },
      { name: 'Nidec', ms: 0.15, ticker: '6594.JP', flag: '🇯🇵' },
      { name: '현대모비스', ms: 0.10, ticker: '012330', flag: '🇰🇷' },
      { name: 'HL만도', ms: 0.08, ticker: '204320', flag: '🇰🇷' },
      { name: '중국 업체', ms: 0.30, ticker: '-', flag: '🇨🇳' },
      { name: '기타', ms: 0.17, ticker: '-', flag: '🌐' },
    ],
    inverter: [
      { name: 'Infineon', ms: 0.25, ticker: 'IFNNY', flag: '🇩🇪' },
      { name: 'Onsemi', ms: 0.20, ticker: 'ON', flag: '🇺🇸' },
      { name: 'STMicro', ms: 0.18, ticker: 'STM', flag: '🇪🇺' },
      { name: 'ROHM', ms: 0.12, ticker: '6963.JP', flag: '🇯🇵' },
      { name: 'Wolfspeed', ms: 0.08, ticker: 'WOLF', flag: '🇺🇸' },
      { name: '기타', ms: 0.17, ticker: '-', flag: '🌐' },
    ],
    ndfeb: [
      { name: '중국 업체', ms: 0.85, ticker: '-', flag: '🇨🇳' },
      { name: 'MP Materials', ms: 0.05, ticker: 'MP', flag: '🇺🇸' },
      { name: 'Lynas', ms: 0.05, ticker: 'LYC', flag: '🇦🇺' },
      { name: '기타', ms: 0.05, ticker: '-', flag: '🌐' },
    ],
    battery: [
      { name: 'LG에너지솔루션', ms: 0.30, ticker: '373220', flag: '🇰🇷' },
      { name: '삼성SDI', ms: 0.15, ticker: '006400', flag: '🇰🇷' },
      { name: 'CATL', ms: 0.25, ticker: '300750.SZ', flag: '🇨🇳' },
      { name: 'Panasonic', ms: 0.10, ticker: '6752.JP', flag: '🇯🇵' },
      { name: '기타', ms: 0.20, ticker: '-', flag: '🌐' },
    ],
  },

  /* ══════════════════════════════════════
     배터리 케미스트리 믹스 (SNE Research)
     ══════════════════════════════════════ */
  chemMix: {
    2025: { ncm: 0.70, lfp: 0.20, semiSolid: 0.08, solidState: 0.02 },
    2030: { ncm: 0.50, lfp: 0.15, semiSolid: 0.20, solidState: 0.15 },
    2035: { ncm: 0.25, lfp: 0.05, semiSolid: 0.20, solidState: 0.50 },
    2040: { ncm: 0.10, lfp: 0.02, semiSolid: 0.15, solidState: 0.73 },
  },

  /* ══════════════════════════════════════
     전력 수요 기준
     ══════════════════════════════════════ */
  power: {
    perRobotKW: 2.0,
    perIndustrialKW: 5.0,
    perAmrKW: 0.5,
    usGridCapTW: 1.2,
    dcDemandGW: 120,
  },

  /* ══════════════════════════════════════
     OEM 생산 목표 — JPM Conference 2026 업데이트
     ══════════════════════════════════════ */
  oemTargets: [
    { name: 'Tesla', flag: '🇺🇸', target2026: '5~10만 CAPA', target2030: '100만대 목표', price: '$20~30K', battery: '2.3kWh / 2170 원통형' },
    { name: 'Boston Dynamics', flag: '🇺🇸', target2026: 'RMCA 개소 (2026 여름)', target2030: '3만 CAPA (2028E)', price: '-', battery: 'Self-swappable' },
    { name: 'AGIBOT', flag: '🇨🇳', target2026: '수만대', target2030: '-', price: '-', battery: '-' },
    { name: 'UBTECH', flag: '🇨🇳', target2026: '1만대', target2030: '-', price: '-', battery: '-' },
    { name: 'Unitree', flag: '🇨🇳', target2026: '-', target2030: '-', price: '$16K~', battery: '-' },
    { name: 'Figure AI', flag: '🇺🇸', target2026: '-', target2030: '-', price: '-', battery: '-' },
    { name: 'Agility', flag: '🇺🇸', target2026: '1만 CAPA', target2030: '3만대(28E)', price: '-', battery: '-' },
  ],

  /* ══════════════════════════════════════
     OEM Bottom-Up 초기값 (만 대)
     ══════════════════════════════════════ */
  oemBottomUp: [
    { n: 'Tesla', f: '🇺🇸', d: 20 },
    { n: 'AGIBOT', f: '🇨🇳', d: 15 },
    { n: 'Unitree', f: '🇨🇳', d: 8 },
    { n: 'UBTECH', f: '🇨🇳', d: 5 },
    { n: 'Figure', f: '🇺🇸', d: 5 },
    { n: 'BD/Agility', f: '🇺🇸', d: 5 },
    { n: '중국 기타', f: '🇨🇳', d: 8 },
    { n: '기타', f: '🌐', d: 3 },
  ],

  /* ══════════════════════════════════════
     한국 밸류체인 — JPM Conference 2026 업데이트
     ══════════════════════════════════════ */
  krValueChain: [
    { company: '현대모비스', ticker: '012330', parts: '액추에이터·헤드모듈·그리퍼·배터리팩', customer: 'BD Atlas', note: 'BD 모든 액추에이터 부품 100% 공급 공식 발표 (JPM 2026)', cat: 'act' },
    { company: 'HL만도', ticker: '204320', parts: '액추에이터·주차로봇', customer: 'BD Spot·EV', note: '2028 휴머노이드 공급 원년', cat: 'act' },
    { company: '에스엘', ticker: '005765', parts: '레그모듈·MobED 위탁생산', customer: 'BD·현대차', note: '배터리팩 포함 위탁생산', cat: 'act' },
    { company: '계양전기', ticker: '012200', parts: '액추에이터 (대당 12개)', customer: '현대차 MobED', note: '-', cat: 'act' },
    { company: '현대오토에버', ticker: '307950', parts: 'SI·관제·Robot OS', customer: 'BD·HMG', note: 'HMG 로보틱스 시스템 통합 담당 (JPM 2026)', cat: 'ctrl' },
    { company: '현대글로비스', ticker: '086280', parts: '생산·판매 물류', customer: 'BD·HMG', note: 'SCM 백본 · 물류 테스트베드 (JPM 2026)', cat: 'ctrl' },
    { company: '로보티즈', ticker: '108490', parts: '유성감속기 QDD 액추에이터·로봇손', customer: '글로벌 휴머노이드 OEM', note: '다이나믹셀. 우즈베키스탄 신공장', cat: 'gear' },
    { company: '에스비비테크', ticker: '389500', parts: '하모닉 감속기', customer: '대기업 휴머노이드', note: '26년 200대 생산, 매출 10% 기여', cat: 'gear' },
    { company: '에스피지', ticker: '058610', parts: '유성감속기 QDD 액추에이터', customer: '-', note: '26 상반기 SDD 양산, 연 5천대 목표', cat: 'gear' },
    { company: 'SHG', ticker: '024410', parts: '감속기', customer: '-', note: '-', cat: 'gear' },
    { company: '화신', ticker: '010690', parts: '바디/앞부분', customer: 'BD Atlas 후보', note: '기존 샤시 업체', cat: 'body' },
    { company: '서연이화', ticker: '200880', parts: '외장·골격', customer: '-', note: '-', cat: 'body' },
    { company: '한국피아이엠', ticker: '-', parts: '액추에이터 부품', customer: '-', note: '-', cat: 'body' },
    { company: '삼현', ticker: '-', parts: '액추에이터 부품', customer: '-', note: '-', cat: 'body' },
    { company: 'LG에너지솔루션', ticker: '373220', parts: '원통형 배터리 2170', customer: 'Optimus + 로봇 6곳', note: '미국 AZ 현지조달', cat: 'batt' },
    { company: '삼성SDI', ticker: '006400', parts: '원통형 배터리', customer: '현대차 MobED', note: '헝가리 2028 양산', cat: 'batt' },
    { company: '대주전자재료', ticker: '078600', parts: '실리콘 음극재', customer: '-', note: '고출력 배터리 핵심', cat: 'batt' },
    { company: '엘앤에프', ticker: '066970', parts: '하이니켈 양극재', customer: '-', note: 'NCMA 양극재', cat: 'batt' },
    { company: '알에스오토메이션', ticker: '140670', parts: '제어기', customer: '-', note: '-', cat: 'ctrl' },
    { company: '아진에스텍', ticker: '-', parts: '제어기', customer: '-', note: '-', cat: 'ctrl' },
    { company: '현대로템', ticker: '064350', parts: '군사용 로봇', customer: '한국 국방부', note: '고스트로보틱스 인수', cat: 'mil' },
    { company: 'LIG넥스원', ticker: '079550', parts: '군사용 로봇', customer: '한국 국방부', note: 'FCT 통과', cat: 'mil' },
  ],

  krCatNames: { act: '액추에이터', gear: '감속기', body: '구조·외장', batt: '배터리·소재', ctrl: '제어·SW·물류', mil: '군사·방산' },
  krCatColors: { act: '#FF6B6B', gear: '#6C5CE7', body: '#636E72', batt: '#4ecdc4', ctrl: '#0984E3', mil: '#e74c3c' },

  bdValueChainText: `<strong>E-Atlas:</strong> 현대모비스 (액추에이터 전량 100% 공급) — 액추에이터 8종 → 2종 통합 설계 (JPM 2026)<br>
<strong>Spot:</strong> HL만도 (액추에이터, 2027 2세대) · 에스엘 (레그모듈)<br>
<strong>Stretch:</strong> 에스엘 (방향지시등)<br>
<strong>SI/관제:</strong> 현대오토에버 (시스템 통합·Robot OS)<br>
<strong>물류:</strong> 현대글로비스 (생산·판매 SCM 백본, 물류 테스트베드)<br><br>
<strong>MobED:</strong> 계양전기 (액추에이터 대당 12개) · 삼성SDI (원통형 배터리) · 에스엘 (배터리팩 포함 위탁생산) · DEEPX (DX-M1 NPU) · 에스오에스랩 (LiDAR 대당 2개)<br><br>
<strong>HMG 로보틱스 역할 분담 (JPM Conference 2026):</strong><br>
• 현대모비스 → BD 모든 액추에이터 부품 100% 공급<br>
• 현대오토에버 → 시스템 통합 (SI) / Robot OS<br>
• 현대글로비스 → 생산·판매 물류`,

  /* ══════════════════════════════════════
     US Physical AI 밸류체인
     ══════════════════════════════════════ */
  usValueChain: [
    { company: 'NVIDIA', ticker: 'NVDA', layer: '두뇌', parts: 'GPU·시뮬레이션·Omniverse·Jetson Thor', note: '피지컬 AI 두뇌 인프라 대표. 훈련→시뮬레이션→현장추론 3계층 컴퓨팅', tp: '$269.82', cp: '$211.50' },
    { company: 'Amazon', ticker: 'AMZN', layer: '두뇌·통합', parts: 'AWS·물류 자동화·창고 로봇', note: '클라우드 M/S 28% + 대규모 물류 자동화 실사용자', tp: '$312.94', cp: '$271.17' },
    { company: 'Rockwell Automation', ticker: 'ROK', layer: '제어', parts: 'PLC·모션제어·산업용 네트워크', note: '기존 공장 제어 병목 대표. PLC 글로벌 M/S 2위', tp: '-', cp: '-' },
    { company: 'Novanta', ticker: 'NOVT', layer: '실행·인지', parts: '정밀 모션·힘토크 센서·로봇 말단부', note: 'ATI Industrial 인수. 로보틱스&자동화 매출 32.5%', tp: '$157.00', cp: '$136.28' },
    { company: 'Cognex', ticker: 'CGNX', layer: '인지', parts: '머신비전·검사 자동화·OneVision', note: '비정형 작업 확산의 인지 계층 대표. 물류·자동차 85%', tp: '$67.60', cp: '$65.92' },
    { company: 'Timken', ticker: 'TKR', layer: '실행', parts: '고정밀 베어링·리니어모션·동력전달', note: 'Cone Drive·Spinea·Rollon 보유. Industrial Motion +12% YoY', tp: '$122.42', cp: '$116.34' },
    { company: 'Regal Rexnord', ticker: 'RRX', layer: '실행', parts: '모터·드라이브·감속기·베어링·액추에이터', note: '2025 휴머노이드 OEM $40M 수주. 관절 시스템 통합 공급', tp: '$243.56', cp: '$206.26' },
    { company: 'Symbotic', ticker: 'SYM', layer: '통합', parts: 'AI 물류 자동화 시스템', note: '물류 자동화 순수 성장주. 고객 집중도 리스크', tp: '-', cp: '-' },
    { company: 'Parker-Hannifin', ticker: 'PH', layer: '실행', parts: '액추에이터·리니어모션', note: '산업용 구동부 대형주', tp: '-', cp: '-' },
  ],

  /* ══════════════════════════════════════
     피지컬 AI 5계층 비용 구조
     ══════════════════════════════════════ */
  physicalAILayers: {
    automationCell: {
      total: 90724,
      source: 'Universal Robots / NVIDIA / Robotiq 공개가 기반 추정',
      layers: [
        { name: '실행 (Execution)', pct: 43.8, cost: 39725, items: '로봇 본체 $35K, 그리퍼 $4.7K', color: '#FF6B6B' },
        { name: '통합/안전 (Integration)', pct: 34.2, cost: 31000, items: '안전장비 $8K, 지그 $5K, 설치·튜닝 $15K, 교육 $3K', color: '#636E72' },
        { name: '인지 (Perception)', pct: 9.9, cost: 9000, items: '비전 카메라 $4K, 힘·토크센서 $5K', color: '#00B894' },
        { name: '제어 (Control)', pct: 6.6, cost: 6000, items: 'PLC·네트워크 연계', color: '#F8B739' },
        { name: '두뇌 (Brain)', pct: 5.5, cost: 4999, items: 'Jetson AGX Orin $2K, SW $3K', color: '#6C5CE7' },
      ]
    },
    humanoid: {
      source: 'McKinsey',
      ranges: { low: 30000, base: 90000, high: 150000 },
      breakdown: [
        { name: '액추에이터', pctRange: '40~60%', color: '#FF6B6B' },
        { name: '센싱·인지', pctRange: '10~20%', color: '#00B894' },
        { name: '연산·제어', pctRange: '10~15%', color: '#6C5CE7' },
        { name: '구조 부품', pctRange: '5~10%', color: '#636E72' },
        { name: '배터리', pctRange: '5~10%', color: '#4ecdc4' },
        { name: '기타 (냉각·배선)', pctRange: '10~15%', color: '#A29BFE' },
      ]
    }
  },

  cellBom: [
    { item: '로봇 본체', cost: 35000, layer: '실행', note: '중소형~중형 협동로봇 (UR5e $30~45K)' },
    { item: '그리퍼·말단 작업장치', cost: 4725, layer: '실행', note: 'Robotiq 공개 판매가 기준' },
    { item: '비전 카메라·조명', cost: 4000, layer: '인지', note: '기본 비전 패키지' },
    { item: '힘·토크 센서', cost: 5000, layer: '인지', note: 'Robotiq FT-300-S 6축' },
    { item: 'Jetson AGX Orin', cost: 1999, layer: '두뇌', note: 'NVIDIA 공개 판매가' },
    { item: '현장 소프트웨어', cost: 3000, layer: '두뇌', note: '기본 운용 SW' },
    { item: 'PLC·네트워크 연계', cost: 6000, layer: '제어', note: '기존 설비 연동' },
    { item: '안전장비·위험성 평가', cost: 8000, layer: '통합', note: '안전펜스 $5K+, 안전 PLC $2K+' },
    { item: '작업셀 지그·주변장치', cost: 5000, layer: '통합', note: '공작물 고정·반복정밀도 확보' },
    { item: '설치·튜닝·시운전', cost: 15000, layer: '통합', note: '현장 통합 서비스' },
    { item: '교육·초기 지원', cost: 3000, layer: '통합', note: '작업자 교육' },
  ],

  timeline: [
    { phase: '도입 초기', focus: '실행 + 통합/안전', items: '로봇 본체·감속기·안전·설치튜닝', note: '초기 예산 78%가 실행+통합에 집중' },
    { phase: '확산 국면', focus: '인지 + 제어', items: '머신비전·힘센서·PLC·모션제어', note: '비정형 작업·복수 장비 연동 병목' },
    { phase: '고도화 국면', focus: '두뇌 + SW', items: 'AI 모델·디지털트윈·시뮬레이션', note: '고객 Lock-in·반복 매출 핵심' },
    { phase: '장기 옵션', focus: '휴머노이드', items: '액추에이터 40~60% + 전신 통합', note: '범용 이동·조작 플랫폼' },
  ],

  /* ══════════════════════════════════════
     IFR 산업용 로봇 데이터 (IFR, 2024)
     ══════════════════════════════════════ */
  ifrData: {
    annualInstall2024: 542100,
    top5share: 0.80,
    chinaShare: 0.54,
    cobotShare: 0.105,
    usMfgSMEpct: 0.983,
    usCapUtil: 0.756,
  },

  /* ══════════════════════════════════════
     경쟁 구도 — 연도별 출하량 (Omdia, 각 사 IR)
     ══════════════════════════════════════ */
  competitionShipments: {
    2025: [
      { n: 'AGIBOT', u: 5168, f: '🇨🇳' }, { n: 'Unitree', u: 4200, f: '🇨🇳' },
      { n: 'UBTECH', u: 1000, f: '🇨🇳' }, { n: 'Leju', u: 500, f: '🇨🇳' },
      { n: 'Engine AI', u: 400, f: '🇨🇳' }, { n: 'Fourier', u: 300, f: '🇨🇳' },
      { n: 'Figure AI', u: 150, f: '🇺🇸' }, { n: 'Agility', u: 150, f: '🇺🇸' },
      { n: 'Tesla', u: 150, f: '🇺🇸' }, { n: '기타', u: 1350, f: '🌐' },
    ],
    2026: [
      { n: 'AGIBOT', u: 30000, f: '🇨🇳' }, { n: 'Unitree', u: 10000, f: '🇨🇳' },
      { n: 'UBTECH', u: 10000, f: '🇨🇳' }, { n: 'Tesla', u: 5000, f: '🇺🇸' },
      { n: 'Figure AI', u: 1000, f: '🇺🇸' }, { n: 'Agility', u: 1000, f: '🇺🇸' },
      { n: '기타', u: 3000, f: '🌐' },
    ],
    2027: [
      { n: 'Tesla', u: 30000, f: '🇺🇸' }, { n: 'AGIBOT', u: 40000, f: '🇨🇳' },
      { n: 'Unitree', u: 15000, f: '🇨🇳' }, { n: 'UBTECH', u: 12000, f: '🇨🇳' },
      { n: 'Figure AI', u: 3000, f: '🇺🇸' }, { n: '기타', u: 5000, f: '🌐' },
    ],
  },

  chinaMarketSize: [
    { y: 2024, v: 27.6 }, { y: 2025, v: 55 }, { y: 2026, v: 103 },
    { y: 2027, v: 200 }, { y: 2028, v: 387 }, { y: 2029, v: 750 },
  ],

  techMaturity: [
    { d: '폼팩터·이동성', a: '★★★', b: '★★★', c: '★★★', e: '★★★', f: '★★★', g: '★★☆' },
    { d: '적재·리프팅', a: '★★☆', b: '★★★', c: '★★★', e: '★★★', f: '★★★', g: '★★★' },
    { d: '조작 능력', a: '★★★', b: '★★☆', c: '★★☆', e: '★★★', f: '★★★', g: '★★☆' },
    { d: 'AI 학습', a: '★★★', b: '★★☆', c: '★☆☆', e: '★★★', f: '★★★', g: '★★☆' },
    { d: '양산 확장성', a: '★★★', b: '★★★', c: '★★★', e: '★☆☆', f: '★☆☆', g: '★☆☆' },
    { d: '상업적 파급력', a: '★★★', b: '★★★', c: '★★★', e: '★★☆', f: '★☆☆', g: '★★☆' },
  ],

  harmonicMS: [
    { n: 'HDS', ms: 40.4, c: '#6C5CE7' }, { n: 'Nidec', ms: 14.7, c: '#636E72' },
    { n: 'Leader Drive', ms: 12.0, c: '#F8B739' }, { n: 'Laifual Drive', ms: 7.4, c: '#00B894' },
    { n: '기타', ms: 25.5, c: 'var(--line)' },
  ],

  chinaProduction2026: [
    { n: 'Unitree', ms: 49, c: '#6C5CE7' }, { n: 'AgiBot', ms: 30, c: '#FF6B6B' },
    { n: 'UBTech', ms: 8, c: '#F8B739' }, { n: 'Fourier', ms: 5, c: '#00B894' },
    { n: 'Galbot', ms: 3, c: '#E17055' }, { n: 'MagicLab', ms: 2, c: '#636E72' },
    { n: '기타', ms: 3, c: 'var(--line)' },
  ],

  /* ══════════════════════════════════════
     기업별 TAM (company_tam.html 전용)
     ══════════════════════════════════════ */
  companyTamCompanies: {
    harmonic: [
      { n: 'HDS', ms: .65, t: '6324.JP', f: '🇯🇵' }, { n: '중국 업체', ms: .25, f: '🇨🇳' }, { n: '기타', ms: .10, f: '🌐' },
    ],
    rv_gear: [
      { n: 'Nabtesco', ms: .60, t: '6268.JP', f: '🇯🇵' }, { n: '기타', ms: .40, f: '🌐' },
    ],
    servo: [
      { n: 'Yaskawa', ms: .20, t: '6506.JP', f: '🇯🇵' }, { n: 'Regal Rexnord', ms: .15, t: 'RRX', f: '🇺🇸' },
      { n: 'Nidec', ms: .12, t: '6594.JP', f: '🇯🇵' }, { n: '현대모비스', ms: .10, t: '012330', f: '🇰🇷' },
      { n: 'HL만도', ms: .08, t: '204320', f: '🇰🇷' }, { n: '중국', ms: .20, f: '🇨🇳' }, { n: '기타', ms: .15, f: '🌐' },
    ],
    inverter: [
      { n: 'Infineon', ms: .25, t: 'IFNNY', f: '🇩🇪' }, { n: 'Onsemi', ms: .20, t: 'ON', f: '🇺🇸' },
      { n: 'STMicro', ms: .18, t: 'STM', f: '🇪🇺' }, { n: 'ROHM', ms: .12, f: '🇯🇵' },
      { n: 'Wolfspeed', ms: .08, t: 'WOLF', f: '🇺🇸' }, { n: '기타', ms: .17, f: '🌐' },
    ],
    ndfeb: [
      { n: '중국', ms: .85, f: '🇨🇳' }, { n: 'MP Materials', ms: .05, t: 'MP', f: '🇺🇸' },
      { n: 'Lynas', ms: .05, t: 'LYC', f: '🇦🇺' }, { n: '기타', ms: .05, f: '🌐' },
    ],
    battery: [
      { n: 'LGES', ms: .30, t: '373220', f: '🇰🇷' }, { n: 'CATL', ms: .25, f: '🇨🇳' },
      { n: '삼성SDI', ms: .15, t: '006400', f: '🇰🇷' }, { n: 'Panasonic', ms: .10, f: '🇯🇵' },
      { n: '기타', ms: .20, f: '🌐' },
    ],
    copper: [
      { n: 'Freeport', ms: .08, t: 'FCX', f: '🇺🇸' }, { n: 'S.Copper', ms: .05, t: 'SCCO', f: '🇲🇽' },
      { n: '기타', ms: .87, f: '🌐' },
    ],
    sensor: [
      { n: 'Cognex', ms: .15, t: 'CGNX', f: '🇺🇸' }, { n: 'Novanta', ms: .10, t: 'NOVT', f: '🇺🇸' },
      { n: '기타', ms: .75, f: '🌐' },
    ],
  },

  bottleneckCapa: {
    harmonic: { n: '하모닉 감속기', u: '만개', c: 100 },
    ndfeb: { n: 'NdFeB 자석', u: '만톤', c: 20 },
    copper: { n: '구리', u: '만톤', c: 2100 },
  },

  /* ══════════════════════════════════════
     부품 기술 (components.html)
     ══════════════════════════════════════ */
  actuatorParts: [
    { name: '하우징', cost: 150, pct: '15%', color: '#636E72', supplier: '구조부품' },
    { name: '유성감속기', cost: 300, pct: '30%', color: '#FF6B6B', supplier: '메이후(Maihu)' },
    { name: 'BLDC 모터', cost: 200, pct: '20%', color: '#F8B739', supplier: '범용' },
    { name: '인코더', cost: 200, pct: '20%', color: '#6C5CE7', supplier: '범용' },
    { name: '드라이버보드', cost: 150, pct: '15%', color: '#00B894', supplier: 'Rockchip' },
  ],

  oemSpecs: {
    optimus: {
      name: 'Tesla Optimus', dof: 22, joints: [
        { x: 150, y: 50, name: '목', type: '유성', torque: '5Nm' },
        { x: 110, y: 90, name: '어깨R', type: '하모닉', torque: '40Nm' }, { x: 190, y: 90, name: '어깨L', type: '하모닉', torque: '40Nm' },
        { x: 90, y: 140, name: '팔꿈치R', type: '유성', torque: '20Nm' }, { x: 210, y: 140, name: '팔꿈치L', type: '유성', torque: '20Nm' },
        { x: 80, y: 185, name: '손목R', type: '하모닉', torque: '5Nm' }, { x: 220, y: 185, name: '손목L', type: '하모닉', torque: '5Nm' },
        { x: 130, y: 200, name: '허리', type: '하모닉', torque: '80Nm' },
        { x: 120, y: 250, name: '엉덩이R', type: '하모닉', torque: '100Nm' }, { x: 180, y: 250, name: '엉덩이L', type: '하모닉', torque: '100Nm' },
        { x: 115, y: 310, name: '무릎R', type: '유성', torque: '60Nm' }, { x: 185, y: 310, name: '무릎L', type: '유성', torque: '60Nm' },
        { x: 110, y: 370, name: '발목R', type: '하모닉', torque: '40Nm' }, { x: 190, y: 370, name: '발목L', type: '하모닉', torque: '40Nm' },
      ],
    },
    atlas: {
      name: 'BD Atlas', dof: 56, joints: [
        { x: 150, y: 50, name: '목(3DoF)', type: '사이클로이드', torque: '15Nm' },
        { x: 100, y: 90, name: '어깨R(3DoF)', type: '사이클로이드', torque: '80Nm' }, { x: 200, y: 90, name: '어깨L', type: '사이클로이드', torque: '80Nm' },
        { x: 80, y: 130, name: '팔R(2DoF)', type: '사이클로이드', torque: '40Nm' }, { x: 220, y: 130, name: '팔L', type: '사이클로이드', torque: '40Nm' },
        { x: 70, y: 170, name: '손목R(3DoF)', type: '하모닉', torque: '10Nm' }, { x: 230, y: 170, name: '손목L', type: '하모닉', torque: '10Nm' },
        { x: 60, y: 195, name: '손R(12DoF)', type: '하모닉', torque: '2Nm' }, { x: 240, y: 195, name: '손L', type: '하모닉', torque: '2Nm' },
        { x: 150, y: 200, name: '허리(3DoF)', type: '사이클로이드', torque: '120Nm' },
        { x: 120, y: 250, name: '엉덩이R(3DoF)', type: '사이클로이드', torque: '150Nm' }, { x: 180, y: 250, name: '엉덩이L', type: '사이클로이드', torque: '150Nm' },
        { x: 115, y: 310, name: '무릎R', type: '사이클로이드', torque: '100Nm' }, { x: 185, y: 310, name: '무릎L', type: '사이클로이드', torque: '100Nm' },
        { x: 110, y: 370, name: '발목R(2DoF)', type: '하모닉', torque: '60Nm' }, { x: 190, y: 370, name: '발목L', type: '하모닉', torque: '60Nm' },
      ],
    },
    g1: {
      name: 'Unitree G1', dof: 23, joints: [
        { x: 150, y: 55, name: '목', type: '유성', torque: '3Nm' },
        { x: 110, y: 90, name: '어깨R', type: '유성', torque: '25Nm' }, { x: 190, y: 90, name: '어깨L', type: '유성', torque: '25Nm' },
        { x: 90, y: 140, name: '팔꿈치R', type: '유성', torque: '15Nm' }, { x: 210, y: 140, name: '팔꿈치L', type: '유성', torque: '15Nm' },
        { x: 80, y: 180, name: '손목R', type: '유성', torque: '3Nm' }, { x: 220, y: 180, name: '손목L', type: '유성', torque: '3Nm' },
        { x: 130, y: 200, name: '허리', type: '유성', torque: '50Nm' },
        { x: 120, y: 250, name: '엉덩이R', type: '유성', torque: '60Nm' }, { x: 180, y: 250, name: '엉덩이L', type: '유성', torque: '60Nm' },
        { x: 115, y: 310, name: '무릎R', type: '유성', torque: '40Nm' }, { x: 185, y: 310, name: '무릎L', type: '유성', torque: '40Nm' },
        { x: 110, y: 370, name: '발목R', type: '유성', torque: '25Nm' }, { x: 190, y: 370, name: '발목L', type: '유성', torque: '25Nm' },
      ],
    },
  },

  radarOEM: {
    optimus: { name: 'Optimus Gen2', color: '#FF6B6B', h: 173, w: 56, dof: 22, payload: 9, battery: 2.3, asp: 25, gear: '하모닉', customer: '자사 공장', pos: '범용 양산형', note: 'V3 26H2 양산 예정' },
    figure: { name: 'Figure 03', color: '#6C5CE7', h: 168, w: 61, dof: 30, payload: 10, battery: 2, asp: 25, gear: '하모닉', customer: 'BMW', pos: '미국 공장용', note: 'OpenAI World Model' },
    atlas: { name: 'BD Atlas', color: '#F8B739', h: 190, w: 90, dof: 56, payload: 50, battery: 5, asp: 138, gear: '사이클로이드', customer: '현대차그룹', pos: '하이엔드 산업용', note: 'RMCA 2026 여름 개소, 30K CAPA (28E)' },
    digit: { name: 'Agility Digit', color: '#00B894', h: 175, w: 65, dof: 28, payload: 16, battery: 3, asp: 45, gear: '하모닉', customer: 'Amazon·GXO', pos: '물류 특화', note: '캐나다 토요타 7대 배치' },
    g1: { name: 'Unitree G1', color: '#E17055', h: 132, w: 35, dof: 23, payload: 2, battery: 1.5, asp: 13.5, gear: '유성', customer: '범용', pos: '중국 저가형', note: '26년 8월 IPO, BOM 790만원' },
    neo: { name: '1X Neo', color: '#0984E3', h: 168, w: 30, dof: 75, payload: 25, battery: 2, asp: 20, gear: '유성', customer: '일반 소비자', pos: '서비스·가정용', note: '26H2 소비자 배송 시작' },
  },

  /* ══════════════════════════════════════
     BD Atlas 기술 스펙 (JPM Conference 2026, BD IR)
     ══════════════════════════════════════ */
  atlasSpecs: {
    source: 'JPM Conference 2026 / Boston Dynamics IR',
    weight: { value: 90, unit: 'kg', label: '자체 중량' },
    height: { value: 1.9, unit: 'm', label: '키' },
    payload: { value: 50, unit: 'kg', label: '적재 하중' },
    reach: { value: 2.3, unit: 'm', label: '도달 거리' },
    ip: { value: 'IP67', label: '방진방수' },
    tempRange: { min: -20, max: 40, unit: '°C', label: '작동 온도' },
    battery: { type: 'Self-swappable', label: '배터리' },
    sensing: { value: '촉각 + 360° 카메라', label: '센싱' },
    joints: { value: 'Continuous Range of Motion', label: '관절 가동범위' },
    dof: 56,
    actuatorTypes: { before: 8, after: 2, label: '액추에이터 종류 통합' },
  },

  /* ══════════════════════════════════════
     HMG 로보틱스 생태계 (JPM Conference 2026, HMG IR)
     ══════════════════════════════════════ */
  hmgRobotics: {
    source: 'JPM Conference 2026 / HMG IR',
    captiveDemand: 25000,
    rmcaLaunch: '2026 여름',
    factoryCapacity: 30000,
    actuatorPlantCapacity: 350000,
    actuatorPlantLaunch: 2028,
    roboticsInAmericaLaunch: 2028,
    dualHub: {
      us: { role: 'Innovation & Validation Hub', items: ['BD technology', 'Field validation', 'Direct access to North American market'] },
      kr: { role: 'Flexible & Adaptive Hub', items: ['Application-specific design', 'Cost optimization', 'Rapid commercialization'] },
    },
    rolesSplit: {
      mobis: 'BD 모든 액추에이터 부품 100% 공급',
      autoever: '시스템 통합 (SI) / Robot OS',
      glovis: '생산·판매 물류 / SCM 백본',
    },
    partnerships: {
      google: 'Google DeepMind AI Partnership — Reasoning AI Layer (DeepMind) + Physical AI Layer (BD)',
      spot: '3,000 hours between human interventions, 30M+ inspections, 500+ customers, 40+ countries',
    },
    strategy: 'B2B Industrial First → Service → Consumer',
  },

  /* ══════════════════════════════════════
     기술 설명 탭 데이터
     ══════════════════════════════════════ */
  technology: {
    aiStack: {
      source: 'NVIDIA, Google DeepMind, Physical Intelligence',
      layers: [
        { name: 'VLA (Vision-Language-Action)', desc: '시각·언어 입력을 모터 커맨드로 직접 변환. End-to-end 학습.', examples: 'Google RT-2, Physical Intelligence π₀', color: '#6C5CE7' },
        { name: 'Diffusion Policy', desc: '이미지 관측으로부터 연속 행동 시퀀스를 생성. 비정형 조작에 강점.', examples: 'Toyota Research TRI, Columbia University', color: '#FF6B6B' },
        { name: 'LBM (Large Behavior Model)', desc: '다중 로봇·다중 환경 데이터를 대규모 학습. Foundation Model for Robotics.', examples: 'Physical Intelligence π₀, Google Barkour', color: '#F8B739' },
        { name: 'World Model', desc: '물리 세계 시뮬레이션 기반 예측·계획. Sim-to-Real 전이 핵심.', examples: 'NVIDIA Cosmos, OpenAI Sora, Google Genie', color: '#00B894' },
        { name: 'RL + Sim-to-Real', desc: '시뮬레이션 환경에서 강화학습 후 실세계 배포. BD Atlas의 핵심 기술.', examples: 'BD Atlas, Unitree G1 parkour', color: '#E17055' },
      ],
    },
    locomotionVsManipulation: {
      source: 'BD IR, Tesla IR, IFR',
      comparison: [
        { dim: 'DoF 요구', locomotion: '6~12 (하체)', manipulation: '20~40+ (상체·손)', winner: 'manipulation' },
        { dim: '제어 난이도', locomotion: '동적 밸런스', manipulation: '힘·위치 동시 제어', winner: 'manipulation' },
        { dim: '센서 요구', locomotion: 'IMU·발바닥 압력', manipulation: '촉각·시각·힘토크', winner: 'manipulation' },
        { dim: '현재 성숙도', locomotion: '★★★ (해결 단계)', manipulation: '★★☆ (진행 중)', winner: 'locomotion' },
        { dim: 'ROI 기여', locomotion: '이동·접근', manipulation: '직접 작업 수행', winner: 'manipulation' },
        { dim: '데이터 수집', locomotion: '시뮬레이션 효과적', manipulation: '실세계 데이터 필수', winner: 'locomotion' },
      ],
    },
    dataFlywheel: {
      source: 'BD IR (JPM Conference 2026), Google DeepMind',
      stages: [
        { step: 1, name: '현장 배포', desc: '500+ 고객사, 40+ 국가에 Spot 배포', metric: '30M+ inspections' },
        { step: 2, name: '데이터 수집', desc: '실세계 환경에서 Physical Data 자동 수집', metric: '수백 개 고객 사이트' },
        { step: 3, name: 'AI 학습', desc: 'Physical AI + Google DeepMind Reasoning AI 듀얼 브레인', metric: 'Sim-to-Real 전이' },
        { step: 4, name: '성능 향상', desc: '3,000시간 무인 운영 달성', metric: 'ROI 2년 내 회수' },
        { step: 5, name: '확장 배포', desc: 'RMCA → HMG 2.5만대 → 외부 고객 확장', metric: '30K units/yr CAPA' },
      ],
    },
    costRoadmap: {
      source: 'McKinsey, Goldman Sachs, Tesla IR',
      milestones: [
        { year: 2025, asp: 150000, volume: 13400, note: '초기 양산 단계' },
        { year: 2026, asp: 120000, volume: 50000, note: '중국 가격 경쟁 시작' },
        { year: 2028, asp: 80000, volume: 200000, note: 'RMCA 본격 가동' },
        { year: 2030, asp: 50000, volume: 690000, note: 'ROI 검증 완료 구간' },
        { year: 2035, asp: 25000, volume: 6790000, note: 'Tesla $20-30K 목표' },
        { year: 2040, asp: 15000, volume: 53300000, note: '가전 수준 가격대' },
      ],
    },

    /* ── 7. 로봇 행동 데이터 수집 파이프라인 ── */
    robotDataPipeline: {
      source: 'DexCap (Stanford, 2024), AirExo (THU, 2024), AirExo-2 (THU, 2025)',
      videoUrl: 'https://www.youtube.com/watch?v=DycoYh6imj8',
      methods: [
        { name: 'Teleoperation', desc: '사람이 VR/조이스틱/리더암으로 로봇을 원격조작하며 데이터 수집', pros: '로봇 관절·센서 데이터 직접 취득, 고품질', cons: '비싸고 느림, 실제 로봇 필요', color: '#FF6B6B' },
        { name: 'DexCap', desc: 'SLAM + 전자기장 장갑으로 사람 손 모션캡처 → 로봇 손 retargeting', pros: '사람 손 정교한 조작 데이터 수집, Portable', cons: '손끝 위주, 전신 대응 한계', color: '#6C5CE7' },
        { name: 'AirExo', desc: '저비용 양팔 외골격으로 Whole-arm manipulation 데이터 수집', pros: 'In-the-wild + Teleoperation 병용, 다중 로봇 호환', cons: '외골격-로봇 도메인 갭 존재', color: '#F8B739' },
        { name: 'AirExo-2', desc: '$600 외골격으로 수집 → Visual Adaptor로 Pseudo-robot Demonstration 변환', pros: '시각·깊이·행동 모두 로봇 도메인 변환, Zero-shot 배포', cons: '생성 이미지 품질에 의존', color: '#00B894' },
      ],
      pipeline: [
        { step: 1, name: 'In-the-Wild 수집', desc: '사람이 외골격/장갑 착용 후 실제 환경에서 작업', icon: '🧤' },
        { step: 2, name: 'Retargeting', desc: '사람 움직임을 로봇 Embodiment에 맞게 좌표 변환 (IK)', icon: '🔄' },
        { step: 3, name: 'Visual Adaptation', desc: 'Image/Depth Adaptor로 로봇 시점 이미지 생성', icon: '🖼️' },
        { step: 4, name: 'Pseudo-Robot Demo', desc: '변환된 RGB + Depth + Action으로 학습 데이터 구성', icon: '🤖' },
        { step: 5, name: 'Policy Learning', desc: 'Diffusion Policy / Action Chunking으로 정책 학습', icon: '🧠' },
      ],
      keyConcepts: [
        { term: 'Retargeting', def: '사람 움직임을 로봇 관절 구조에 맞게 재매핑 (역기구학 IK 사용)' },
        { term: 'Pseudo-Robot Demo', def: '실제 로봇 수집 아니지만 로봇 학습에 사용 가능하도록 변환한 데이터' },
        { term: 'Domain Gap', def: '사람 도메인과 로봇 도메인 사이의 시각적·기구학적 차이' },
        { term: 'Action Chunking', def: '단일 스텝이 아닌 미래 여러 스텝 행동을 묶어 출력' },
      ],
    },

    /* ── 8. 디지털 트윈 학습 환경 ── */
    digitalTwin: {
      source: 'GRS (2024), Gen2Sim (2024), RoboTwin (2024), SplatSim (2024), SyncTwin, TwinRL, Policy Eval',
      videoUrl: 'https://www.youtube.com/watch?v=g7y7y7xGpxU',
      approaches: [
        { name: 'Real→Sim', desc: '실제 환경 스캔 → 시뮬레이터 이전', examples: 'GRS, SplatSim', color: '#6C5CE7' },
        { name: 'Generative Sim', desc: '생성형 AI로 3D 에셋·태스크·리워드 자동 생성', examples: 'Gen2Sim, RoboTwin', color: '#FF6B6B' },
        { name: 'Real-Sim 협업', desc: '디지털 트윈을 RL 탐색·정책 평가에 실시간 활용', examples: 'SyncTwin, TwinRL', color: '#00B894' },
      ],
      papers: [
        { name: 'GRS', full: 'Generating Robotic Simulation Tasks from Real-World Images', method: 'RGBD 1장 → SAM2 세그먼트 → VLM 장면 설명 → 에셋 매칭 → 태스크 코드 자동생성', highlight: 'LLM Router가 시뮬레이션·테스트 코드 반복 수정' },
        { name: 'Gen2Sim', full: 'Scaling Up Robot Learning in Simulation with Generative Models', method: '2D 이미지 → Diffusion 3D 리프팅 → 물리 파라미터 LLM 추정 → URDF 생성 → PPO 학습', highlight: 'Score Distillation Sampling으로 3D 에셋 품질 향상' },
        { name: 'RoboTwin', full: 'Dual-Arm Robot Benchmark with Generative Digital Twins', method: 'RGB 1장 → 3D Foundation Model → Spatial Annotation → LLM 코드 생성', highlight: 'Function/Approach/Lateral Axis 공간 주석으로 로봇 파지 안내' },
        { name: 'SplatSim', full: '3D Gaussian Splatting 기반 초현실적 시뮬레이션', method: '다중 시점 촬영 → 3DGS 재구성 → 물리 시뮬레이터 실시간 연동', highlight: 'Sim-to-Real gap 최소화, 사실적 렌더링 + 빠른 속도' },
        { name: 'SyncTwin', full: '실시간 양방향 디지털 트윈 동기화', method: '실제 로봇 ↔ 시뮬레이션 실시간 연동, 상태 미러링', highlight: '실시간 모니터링 + 장애 예측' },
        { name: 'TwinRL', full: '디지털 트윈 환경에서 RL 탐색 후 Real 배포', method: '디지털 트윈에서 PPO/SAC 학습 → Domain Randomization → 실제 배포', highlight: '안전한 RL 탐색 + Sim-to-Real Transfer' },
      ],
      keyTech: [
        { term: '3D Gaussian Splatting', def: '점 기반 3D 표현으로 빠른 렌더링과 사실적 재구성 동시 달성' },
        { term: 'NeRF', def: 'Neural Radiance Field — 신경망으로 3D 공간의 색·밀도 표현' },
        { term: 'URDF', def: 'Unified Robot Description Format — 로봇/물체 구조 정의 파일' },
        { term: 'Domain Randomization', def: '시뮬레이션 물리·시각 파라미터를 무작위 변경해 일반화 향상' },
      ],
    },

    /* ── 9. WFM (World Foundation Model) 심화 ── */
    wfmDeep: {
      source: 'NVIDIA Cosmos (2025), VPP (2024), DreamVLA (2025), V-JEPA 2 (Meta, 2025), Generators=Policies (Columbia/TRI, 2024)',
      videoUrl: 'https://www.youtube.com/watch?v=2a6OYcYcOOw',
      comparison: [
        { model: 'Cosmos Policy', org: 'NVIDIA+Stanford', method: 'Cosmos Predict 2.5B 비디오 모델을 Post-training → Action+Future State+Value를 Latent Frame으로 동시 생성', result: 'LIBERO 98.5%, RoboCasa 67.1%', approach: 'WFM = Policy' },
        { model: 'VPP', org: 'THU+NVIDIA', method: 'SVD 1.5B 비디오 모델 내부 Predictive Visual Representation 추출 → VideoFormer → DiT Policy', result: 'Calvin ABCD +18.6%, Real Dexterous +31.6%', approach: 'WFM 내부 표현 활용' },
        { model: 'DreamVLA', org: '복합', method: 'VLA 내부에 World Knowledge Forecasting(Dynamic Region, Depth, Semantic) 삽입', result: 'Real Robot 76.7%, Calvin 4.44 avg length', approach: 'VLA + WFM 융합' },
        { model: 'V-JEPA 2', org: 'Meta', method: '100만시간 비디오 Action-free 사전학습 → 62시간 로봇 비디오로 Action-conditioned 모델', result: 'Pick-and-Place MPC Planning', approach: '표현 공간 예측' },
        { model: 'Generators=Policies', org: 'Columbia/TRI', method: '비디오 생성 모델로 성공 행동 비디오 상상 → Inverse Dynamics로 Action 디코딩', result: 'Unseen Object/Background 일반화', approach: '비디오 생성 = 정책' },
      ],
      keyInsight: '기존 VLA: 현재 관측 → 직접 Action 출력 / WFM 기반: 현재 관측 → 미래 예측 → 최적 행동 선택',
      challenges: [
        { issue: '추론 속도', desc: '대형 비디오 모델 실시간 실행 어려움 → VPP처럼 내부 표현만 활용하는 절충안' },
        { issue: '정밀도', desc: '그럴듯한 영상 ≠ mm 단위 정밀 제어. 공간·시간 정밀도 확보 과제' },
        { issue: 'Action Mapping', desc: '예측된 미래 → 실제 Motor Command 변환 필요 (Inverse Dynamics)' },
      ],
    },

    /* ── 10. VLA 아키텍처 진화 ── */
    vlaEvolution: {
      source: 'Physical Intelligence (π0.6), RD-VLA (2026), MeM (2025)',
      videoUrl: 'https://www.youtube.com/watch?v=sx2ytqe3hcI',
      models: [
        { name: 'π0.6 (RECAP)', org: 'Physical Intelligence', keyIdea: 'Advantage-conditioned RL로 VLA 후속 학습. 성공 Trajectory에 높은 Advantage 부여 → 자기 개선 루프', architecture: 'π0 VLM backbone + Flow Matching Action Head + RECAP RL fine-tuning', breakthrough: '로봇 자체 경험으로 자기 개선, 학습 효율성 극대화', color: '#6C5CE7' },
        { name: 'RD-VLA', org: '복합 연구팀', keyIdea: '텍스트 CoT 대신 Latent Space에서 반복 정제 (Recurrent Depth). 잠재 공간 반복 추론으로 80x 속도 향상', architecture: 'VLM + Latent Iterative Refinement + Continuous Action Output', breakthrough: '0.5B 모델로 7B 모델 성능 초과, 난이도 적응형 연산', color: '#FF6B6B' },
        { name: 'MeM', org: '복합 연구팀', keyIdea: 'Multi-Scale Embodied Memory — 단기(Video) + 장기(Language) 이중 메모리로 긴 작업 수행', architecture: 'Short-term Video Memory + Long-term Language Memory + Dual Retrieval', breakthrough: 'Long-horizon 태스크 성공률 대폭 향상', color: '#00B894' },
      ],
      evolutionPath: [
        { gen: '1세대', name: 'RT-2 / Octo', desc: 'VLM + 이산 액션 토큰', year: '2023' },
        { gen: '2세대', name: 'π0 / OpenVLA', desc: 'VLM + Diffusion/Flow Action Head', year: '2024' },
        { gen: '3세대', name: 'π0.5 / GR00T N1', desc: 'Dual System (System1 빠른 행동 + System2 느린 추론)', year: '2025' },
        { gen: '4세대', name: 'π0.6 / RD-VLA / MeM', desc: 'RL 자기개선 + Latent Reasoning + Embodied Memory', year: '2025-26' },
      ],
    },

    /* ── 11. VLA 3대장 비교 ── */
    vlaComparison: {
      source: 'NVIDIA GR00T (2025), Google DeepMind Gemini Robotics (2025), Physical Intelligence π0 (2024-2026)',
      models: [
        {
          family: 'GR00T', org: 'NVIDIA', color: '#76B900',
          versions: [
            { ver: 'N1', date: '2025.03', keyFeature: 'Dual System (S1 빠른 액션 + S2 느린 VLM 추론)', actionHead: 'Diffusion Transformer', training: 'Omniverse 시뮬레이션 + Real Data' },
            { ver: 'N1.5', date: '2025.05', keyFeature: 'Cross-Embodiment 강화, 더 많은 로봇 지원', actionHead: 'Diffusion Transformer', training: 'Expanded Sim+Real, 더 많은 로봇 폼팩터' },
          ],
          strength: 'NVIDIA 인프라(Omniverse/Cosmos/OSMO) 통합 에코시스템',
          weakness: '독자 하드웨어 없음, 파트너 의존',
        },
        {
          family: 'Gemini Robotics', org: 'Google DeepMind', color: '#4285F4',
          versions: [
            { ver: 'Gemini Robotics', date: '2025.03', keyFeature: 'Gemini 2.0 VLM + Action Output, 강력한 언어·시각 이해', actionHead: 'Autoregressive + Flow Matching', training: 'Web-scale Pretraining + Robot Fine-tuning' },
            { ver: 'Gemini Robotics-ER', date: '2025.03', keyFeature: 'Embodied Reasoning 특화. Safety, Human-Robot Interaction', actionHead: 'Autoregressive', training: 'Diverse Robot Fleet' },
          ],
          strength: '초대형 Foundation Model 기반, 최강 언어·시각 이해력',
          weakness: '공개 접근 제한, 특정 로봇 플랫폼 종속',
        },
        {
          family: 'π0', org: 'Physical Intelligence', color: '#E17055',
          versions: [
            { ver: 'π0', date: '2024.10', keyFeature: 'VLM + Flow Matching Action Expert. 범용 조작 Foundation Model', actionHead: 'Flow Matching', training: 'Cross-Embodiment 10K+ hours' },
            { ver: 'π0.5', date: '2025.02', keyFeature: 'Web 데이터 추가 학습, 언어 지시 이해 강화, High-level + Low-level 통합', actionHead: 'Flow Matching', training: 'Internet Data + Robot Data' },
            { ver: 'π0.6 (RECAP)', date: '2025.05', keyFeature: 'RL 자기개선 (Advantage-conditioned). Self-improvement Loop', actionHead: 'Flow Matching + RL', training: 'Self-generated Experience + Advantage Filtering' },
          ],
          strength: '실제 로봇 성능 최강, 다중 로봇 범용성, RL 자기개선',
          weakness: '비공개 모델, 독자 하드웨어 없음',
        },
      ],
      dimensions: [
        { dim: 'Foundation Model 규모', groot: '★★☆', gemini: '★★★', pi: '★★☆' },
        { dim: '실제 조작 성능', groot: '★★☆', gemini: '★★☆', pi: '★★★' },
        { dim: 'Cross-Embodiment', groot: '★★★', gemini: '★★☆', pi: '★★★' },
        { dim: '시뮬레이션 통합', groot: '★★★', gemini: '★☆☆', pi: '★☆☆' },
        { dim: '언어 이해력', groot: '★★☆', gemini: '★★★', pi: '★★☆' },
        { dim: '자기개선(RL)', groot: '★☆☆', gemini: '★☆☆', pi: '★★★' },
        { dim: '에코시스템', groot: '★★★', gemini: '★★★', pi: '★☆☆' },
      ],
    },

    /* ── 12. AI Factory 인프라 ── */
    aiFactory: {
      source: 'NVIDIA GTC 2025, Jensen Huang Keynote, NVIDIA IR',
      fiveLayerCake: [
        { layer: 1, name: 'Energy', desc: '전력 공급 인프라 (원전·데이터센터 전력)', color: '#636E72', icon: '⚡' },
        { layer: 2, name: 'Chips', desc: 'GPU/DPU/NIC (Blackwell, Vera Rubin, Dynamo)', color: '#6C5CE7', icon: '🔲' },
        { layer: 3, name: 'Infrastructure', desc: 'AI 데이터센터, 네트워킹, 쿨링 (DGX SuperPOD)', color: '#0984E3', icon: '🏗️' },
        { layer: 4, name: 'Foundation Models', desc: 'Cosmos (World Model), NeMo, Llama 학습 인프라', color: '#F8B739', icon: '🧠' },
        { layer: 5, name: 'Applications', desc: 'Omniverse, Isaac Sim, GR00T, OSMO 오케스트레이션', color: '#00B894', icon: '🤖' },
      ],
      nvidiaRoboticsStack: [
        { name: 'Omniverse', role: '디지털 트윈 / 시뮬레이션 플랫폼', desc: 'USD 기반 물리 정확 시뮬레이션. 공장·도시·로봇 학습 환경 구축' },
        { name: 'Cosmos', role: 'World Foundation Model', desc: '물리 세계 예측 모델. Sim 데이터 증강 + Synthetic Data 생성' },
        { name: 'GR00T', role: 'Humanoid Foundation Model', desc: '범용 휴머노이드 AI. Dual System (N1/N1.5). Cross-Embodiment' },
        { name: 'Isaac Lab', role: '로봇 학습 프레임워크', desc: 'GPU 병렬 RL/IL 학습. Sim-to-Real Transfer Pipeline' },
        { name: 'OSMO', role: '오케스트레이션 플랫폼', desc: 'Omniverse + Cosmos 통합. 시뮬-학습-배포 전체 워크플로우 관리' },
        { name: 'Jetson Thor', role: '로봇 엣지 컴퓨팅', desc: '차세대 로봇 SoC. GR00T 추론 실행. 275 TOPS AI 성능' },
      ],
      trainingLoop: [
        { step: 1, name: 'Omniverse 환경 구축', desc: '물리 정확 디지털 트윈에서 작업 시나리오 생성' },
        { step: 2, name: 'Cosmos 데이터 증강', desc: 'World Model로 다양한 시각·물리 조건 합성' },
        { step: 3, name: 'Isaac Lab 학습', desc: 'GPU 수천 병렬 환경에서 RL/IL 정책 학습' },
        { step: 4, name: 'OSMO 배포', desc: '학습된 정책을 실 로봇(Jetson Thor)에 배포' },
        { step: 5, name: 'Real→Sim 피드백', desc: '실세계 데이터 다시 수집 → 디지털 트윈 업데이트' },
      ],
    },

    /* ── 13. 핵심 기술 용어 사전 ── */
    glossary: [
      { term: 'VLA', full: 'Vision-Language-Action', def: '시각+언어 입력 → 로봇 제어 명령 출력하는 End-to-end 모델', category: 'model' },
      { term: 'VLM', full: 'Vision-Language Model', def: '이미지와 텍스트를 동시에 이해하는 멀티모달 모델 (VLA의 백본)', category: 'model' },
      { term: 'WFM', full: 'World Foundation Model', def: '물리 세계의 시간적 변화를 예측하는 대규모 모델 (Cosmos, Genie 등)', category: 'model' },
      { term: 'Flow Matching', full: 'Flow Matching', def: '확률 분포 사이의 최적 경로를 학습하여 행동 생성. Diffusion보다 효율적', category: 'method' },
      { term: 'Diffusion Policy', full: 'Diffusion Policy', def: '노이즈에서 점진적으로 행동을 정제하여 생성하는 방식', category: 'method' },
      { term: 'Action Chunking', full: 'Action Chunking', def: '한 번에 미래 여러 스텝의 행동을 묶어 예측 (시간적 일관성 향상)', category: 'method' },
      { term: 'Sim-to-Real', full: 'Simulation to Reality Transfer', def: '시뮬레이션에서 학습한 정책을 실제 로봇에 적용하는 기술', category: 'method' },
      { term: 'Cross-Embodiment', full: 'Cross-Embodiment Learning', def: '다양한 로봇 형태 간 지식 전이 학습', category: 'method' },
      { term: 'Knowledge Insulation', full: 'Knowledge Insulation', def: '액션 학습이 VLM 백본의 언어·시각 능력을 훼손하지 않도록 분리', category: 'method' },
      { term: 'Dual System', full: 'System 1 + System 2', def: 'System1=빠른 반사 행동, System2=느린 추론/계획. 인간 인지 구조 모방', category: 'architecture' },
      { term: 'RECAP', full: 'Reinforced Advantage-Conditioned Policy', def: 'π0.6의 RL 알고리즘. Advantage 기반 자기개선 학습', category: 'method' },
      { term: 'Latent Reasoning', full: 'Latent Space Reasoning', def: '텍스트 CoT 대신 잠재 벡터 공간에서 반복 추론 (RD-VLA)', category: 'architecture' },
      { term: 'Teleoperation', full: 'Teleoperation', def: '사람이 원격 장비(VR/조이스틱)로 로봇을 직접 조작하여 데이터 수집', category: 'data' },
      { term: 'Pseudo-Robot Demo', full: 'Pseudo-Robot Demonstration', def: '사람 데이터를 로봇이 수행한 것처럼 변환한 학습용 데이터', category: 'data' },
      { term: 'Retargeting', full: 'Motion Retargeting', def: '사람 움직임을 로봇 관절 구조에 맞게 재매핑 (IK 활용)', category: 'data' },
      { term: '3DGS', full: '3D Gaussian Splatting', def: '가우시안 점 기반 3D 표현. 빠른 렌더링 + 사실적 재구성', category: 'sim' },
      { term: 'Digital Twin', full: 'Digital Twin', def: '물리 환경의 정밀 가상 복제본. 로봇 학습·검증 인프라로 활용', category: 'sim' },
      { term: 'Domain Randomization', full: 'Domain Randomization', def: '시뮬레이션 파라미터를 무작위 변경하여 Sim-to-Real 일반화 향상', category: 'sim' },
      { term: 'Inverse Dynamics', full: 'Inverse Dynamics Model', def: '현재→목표 상태로 가기 위한 행동을 추정하는 모델', category: 'method' },
      { term: 'MPC', full: 'Model Predictive Control', def: '여러 행동 후보를 시뮬레이션하여 최적 행동을 선택하는 제어 방식', category: 'method' },
    ],
  },

  /* ══════════════════════════════════════
     Update Log — 모든 페이지에 표시
     ══════════════════════════════════════ */
  updateLog: [
    {
      date: '2026-05-22',
      title: 'Physical AI 기술 심화 7개 섹션 추가',
      source: 'DexCap, AirExo, AirExo-2, GRS, Gen2Sim, RoboTwin, SplatSim, Cosmos Policy, VPP, DreamVLA, V-JEPA 2, π0.6, RD-VLA, MeM, NVIDIA GTC 2025',
      changes: [
        '로봇 행동 데이터 수집 파이프라인 (DexCap/AirExo/AirExo-2) 섹션 추가',
        '디지털 트윈 학습 환경 7편 논문 분석 (GRS/Gen2Sim/RoboTwin/SplatSim/SyncTwin/TwinRL)',
        'WFM 심화 분석 (Cosmos Policy/VPP/DreamVLA/V-JEPA 2/Generators=Policies)',
        'VLA 아키텍처 진화 (π0.6 RECAP/RD-VLA/MeM) 섹션 추가',
        'VLA 3대장 비교 (GR00T vs Gemini Robotics vs π0) 매트릭스',
        'AI Factory 인프라 (NVIDIA 5-Layer Cake + Robotics Stack) 섹션 추가',
        '핵심 기술 용어 사전 20개 항목 추가',
        'YouTube 영상 임베드 (엥지유니버스 채널)',
      ],
    },
    {
      date: '2026-05-20',
      title: 'JPM Conference 2026 발표 내용 반영',
      source: 'JPM Healthcare Conference 2026 / Boston Dynamics IR / HMG IR',
      changes: [
        'Atlas 스펙 업데이트: payload 50kg, IP67, -20~40°C, self-swappable battery, 360° camera',
        '액추에이터 8종 → 2종 통합 설계 반영',
        '현대모비스 BD 모든 액추에이터 부품 100% 공급 공식 발표',
        'HMG 역할 분담: 모비스(부품) / 오토에버(SI) / 글로비스(물류)',
        'RMCA(Robot Metaplant Application Center) 2026 여름 개소',
        'HMG 내부 배포 2.5만대 captive demand',
        'Robotics in America (양산공장) 2028 개소, 초기 CAPA 30,000 units/yr',
        'Actuator Manufacturing Facility 2028 개소, CAPA 350,000+ units/yr',
        'Google DeepMind AI Partnership: Reasoning + Physical AI 듀얼 브레인',
        'Spot: 3,000시간 무인 운영, 30M+ inspections, 500+ 고객, 40+ 국가',
        'B2B Industrial First 전략 (가정용은 시기상조 — Interim CEO Amanda McMaster)',
      ],
    },
    {
      date: '2026-05-20',
      title: '기술 설명 탭 신설',
      source: 'NVIDIA, Google DeepMind, Physical Intelligence, BD IR, Tesla IR',
      changes: [
        'AI 기술 스택 (VLA/Diffusion/LBM/World Model/RL) 설명 추가',
        'Locomotion vs Manipulation 비교 매트릭스',
        'Data Flywheel 구조도',
        'Atlas 상세 스펙 카드',
        '원가 로드맵 시각화',
      ],
    },
    {
      date: '2026-05-20',
      title: 'KR 밸류체인 업데이트',
      source: 'HMG IR, JPM Conference 2026',
      changes: [
        '현대오토에버 (SI·Robot OS) 추가',
        '현대글로비스 (생산·판매 물류) 추가',
        '현대모비스 역할 BD 전량 100% 공급으로 업데이트',
      ],
    },
  ],

};
