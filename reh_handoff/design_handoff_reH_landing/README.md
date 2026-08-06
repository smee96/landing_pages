# Handoff: re:H 랜딩페이지

## Overview
(주)벗앤벗의 마이크로니들 경피 약물전달 장비 **re:H** 의 국문 랜딩페이지. 1차 목표는 **데모·상담 신청** 전환이며, 주요 타겟은 피부과/의원 원장과 병원 실장·시술자다. 톤은 프리미엄 에스테틱, 임상 데이터와 시술 결과를 적극적으로 노출한다.

## About the Design Files
번들에 포함된 HTML 파일은 **디자인 레퍼런스**다. 의도한 외형과 동작을 보여주는 프로토타입이며, 그대로 배포할 프로덕션 코드가 아니다. 구현 담당자는 이 HTML 디자인을 대상 코드베이스의 기존 환경(React, Vue, Next.js, SwiftUI 등)에서 해당 코드베이스의 패턴과 라이브러리로 **재현**해야 한다. 아직 환경이 없다면 프로젝트에 가장 적합한 프레임워크를 선택해 구현한다.

파일은 Design Component 런타임(`support.js`) 위에서 동작하는 형식이라 프로덕션에 그대로 옮길 수 없다. 마크업/스타일 값과 로직만 참고할 것.

## Fidelity
**High-fidelity (hifi).** 색상, 타이포그래피, 간격, 인터랙션이 모두 확정값이다. 픽셀 단위로 재현하되, 대상 코드베이스에 디자인 시스템이 있다면 토큰으로 매핑한다.

## Preview Chrome (구현 대상 아님)
프로토타입 최상단의 "HERO 시안 A/B/C · 데스크탑/모바일" 툴바와, 페이지 전체를 감싸는 흰 프레임(`frameStyle`)은 **시안 검토용 장치**다. 실제 사이트에는 넣지 않는다.
- 채택된 히어로는 **C안 (에디토리얼)** 이다. A안·B안은 참고용으로 파일에 남아 있으며 구현 대상이 아니다.
- `device` 상태(desktop/mobile)는 프레임 폭을 420px/1400px로 바꾸는 프리뷰 장치다. 실제로는 CSS 미디어쿼리로 처리한다. 단, 아래 "반응형" 항목의 분기 두 가지는 실제로 필요하다.

## Screens / Views
단일 페이지, 6개 섹션 (앵커 순서대로).

### 0. Header (sticky)
- **Purpose**: 섹션 이동 + 상시 CTA
- **Layout**: `position:sticky; top:0; z-index:40`. `display:flex; justify-content:space-between; align-items:center; gap:16px; padding:18px 32px`
- **Background**: `rgba(244,241,236,.9)` + `backdrop-filter:blur(12px)`, 하단 `1px solid rgba(16,16,18,.08)`
- **Left**: "re:H" — Noto Sans KR 700 / 22px / letter-spacing -.02em / #101012. 옆에 "(주)벗앤벗" — 400 / 10px / letter-spacing .18em / rgba(16,16,18,.4). 푸터 워드마크와 동일 표기.
- **Nav**: 작동 원리 / 핵심 스펙 / 임상 데이터 / 시술 사례 — 400 / 13px / rgba(16,16,18,.62), `white-space:nowrap`, gap 26px
- **CTA**: "데모 신청" — `padding:10px 18px; border-radius:999px; background:#101012; color:#F4F1EC`, 500/13px. hover `background:#8A6A3E`
- **Mobile (< ~640px)**: 로고 20px, 우측에 소형 CTA(9px 16px, 12px) + 38×38 햄버거 버튼(1px 테두리 rgba(16,16,18,.16), radius 8px, 16×1.5px 바 3개 gap 5px). 열면 하단에 세로 링크 4개(padding 13px 0, 15px, 구분선 rgba(16,16,18,.06)); 링크 클릭 시 닫힘.

### 1. Hero — C안 (에디토리얼)
- **Purpose**: 제품 인지 + 핵심 가치 한 줄 + 1차 CTA
- **Background**: `radial-gradient(90% 70% at 76% 42%, #1F2733 0%, #141A22 45%, #0C1014 100%)` — 누끼 처리된 제품 사진의 회색 톤과 이어지도록 맞춘 값
- **Layout**: `padding: clamp(40px,5vw,72px) clamp(24px,4vw,56px)`. 내부 `display:flex; flex-wrap:wrap; gap:40px; align-items:flex-end`
  - 좌측 텍스트: `flex:2 1 460px; min-width:0`
  - 우측 이미지: `flex:1 1 320px; min-width:260px`, `align-items:flex-end; justify-content:center`
- **Eyebrow**: 34×1px 골드 바(#C9A671) + "re:H — 경피 약물 전달 시스템" (400/11px/letter-spacing .2em/rgba(244,241,236,.55)), gap 14px, margin-bottom 28px
- **H1**: "피부 아래 / 1mm의 / *정밀도*" (3줄, `<br>`). Noto Serif KR 300 / `clamp(40px,7vw,92px)` / line-height 1.05 / letter-spacing -.04em / #F4F1EC. "정밀도"만 `font-style:italic; color:#C9A671`
  - 모바일 프레임에서는 **46px / line-height 1.06 고정** (clamp의 vw가 뷰포트 기준이라 프레임 안에서 어긋남 — 실제 구현에서는 미디어쿼리로 처리)
- **Divider**: `height:1px; background:rgba(244,241,236,.16); margin:36px 0 22px`
- **Body 2컬럼**: `display:flex; flex-wrap:wrap; gap:26px`, 각 `flex:1 1 240px`. 300/15px/1.85 / rgba(244,241,236,.62)
  - 좌: "니들 깊이 0.25mm부터 4mm까지 0.01mm 단위. 표피 부스터부터 두피 모낭까지, 목표한 층에 정확히 도달합니다."
  - 우: "PLLA·PDLLA·HA·엑소좀·PN·스킨보톡스까지 제형 제한 없이 사용 가능하며, 약물 손실률을 낮춥니다."
- **CTA**: "데모·상담 신청 →" — `margin-top:34px; padding:16px 34px; border-radius:2px; background:#C9A671; color:#1A1613`, 500/14px. hover `background:#F4F1EC`
- **Image**: `assets/reH-device.png` (누끼, 투명 배경). `width:100%; max-width:440px; height:auto; filter:drop-shadow(0 34px 54px rgba(0,0,0,.6))`

### 2. 작동 원리 (#principle)
- **Background**: #F4F1EC. `padding: clamp(64px,7vw,110px) clamp(24px,4vw,64px)`, `scroll-margin-top:70px`
- **Eyebrow**: "작동 원리" — 500/11px/letter-spacing .2em/#8A6A3E
- **H2**: "밀어 넣는 힘과 잡아 당기는 힘을 동시에" — Noto Serif KR 400 / `clamp(26px,3.2vw,42px)` / 1.3 / letter-spacing -.02em / #101012 / max-width 640px / margin-top 18px
- **Lead**: "대부분의 주입 장비는 한쪽 방향의 압력만 씁니다. re:H는 양압과 음압을 함께 제어해 약물을 조직 안에 남기고, 니들이 빠져나올 때의 역류를 줄입니다." — 300/15px/1.8 / rgba(16,16,18,.6) / max-width 560px
- **Cards**: `display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:20px; margin-top:48px`
  - 카드 1·2: `padding:32px; background:#fff; border:1px solid rgba(16,16,18,.08); border-radius:4px`
  - 카드 3: `padding:32px; background:#101012; border-radius:4px` (강조)
  - 라벨: 500/13px/letter-spacing .06em — 밝은 카드 #8A6A3E, 어두운 카드 #C9A671
  - 제목: 500/20px/1.45, margin-top 16px — #101012 / #F4F1EC
  - 본문: 300/14px/1.75, margin-top 12px — rgba(16,16,18,.58) / rgba(244,241,236,.6)
  - 내용: `01 — 양압 PUSH` / "약물을 목표 깊이까지 밀어 넣습니다" / "압력 세기와 해제 시간을 개별 조절해 제형 점도에 맞춥니다." · `02 — 음압 HOLD` / "주입 채널을 열어 약물을 붙잡습니다" / "니들이 만든 공간이 닫히기 전 약물이 자리 잡아 손실률이 낮아집니다." · `03 — 스태킹 STACK` / "한 자리에 층을 나눠 쌓습니다" / "1·2·3차 스태킹 모드로 같은 포인트의 서로 다른 깊이에 순차 주입합니다."

### 3. 핵심 스펙 (#spec) — 니들 깊이 시뮬레이터 ★인터랙티브
- **Background**: #101012
- **Eyebrow** #C9A671, **H2** "니들 깊이 시뮬레이터" (Noto Serif KR 400, #F4F1EC), **Lead** "슬라이더를 움직여 목표 층과 도달 깊이를 확인하세요." (rgba(244,241,236,.55))
- **Layout**: `display:flex; flex-wrap:wrap; gap:44px; margin-top:52px; align-items:stretch` — 좌 `flex:1 1 340px; min-width:300px`, 우 `flex:1 1 320px; min-width:280px`
- **좌측 (수치 + 컨트롤)**
  - 숫자: `depth.toFixed(2)` — Noto Serif KR 300 / `clamp(44px,6vw,72px)` / #C9A671, 옆에 "mm" 400/18px rgba(244,241,236,.5)
  - 층 이름: 500/15px/1.6 / #F4F1EC (margin-top 10px)
  - 설명: 300/14px/1.7 / rgba(244,241,236,.55), `min-height:52px` (값 변경 시 레이아웃 점프 방지)
  - 슬라이더: `<input type="range" min="0.25" max="4" step="0.01">`, width 100%, margin-top 26px
    - track: height 2px, `rgba(244,241,236,.28)` (webkit + moz 모두 지정)
    - thumb: 22×22 원, `background:#C9A671`, `border:4px solid #101012`, `box-shadow:0 1px 8px rgba(0,0,0,.5)`, cursor grab
  - 눈금: 0.25 / 2.00 / 4.00 mm — `justify-content:space-between`, 11px 모노스페이스 rgba(244,241,236,.4)
  - 프리셋 버튼 3개 (0.25 부스터 / 1.25 진피 / 2.5 두피): `padding:9px 14px; border-radius:999px; border:1px solid rgba(244,241,236,.25); background:transparent; color:rgba(244,241,236,.75)`, 400/12px, `white-space:nowrap`
- **우측 (단면 도해)**: `height:380px; border:1px solid rgba(244,241,236,.14); border-radius:4px; overflow:hidden; position:relative`
  - 층 3개 (모두 `box-sizing:border-box`): 표피 9% #EADFD2 / 진피 66% #D8BFA6 / 피하 25% #B58F6B — 4mm 스케일에서 경계가 0.36mm, 3.0mm에 오도록 계산된 값
  - 층 라벨: 400/11px, 표피·진피 rgba(16,16,18,.55), 피하 rgba(16,16,18,.5), padding 10px 14px
  - 니들 축: `left:50%; top:0; width:2px; height:(depth/4*100)%; background:#101012`
  - 니들 팁: 12×12 원 `#C9A671`, `box-shadow:0 0 0 6px rgba(201,166,113,.28)`, `top:(depth/4*100)%; margin-left:-5px; margin-top:-6px`
  - 깊이 기준선: 좌우 full-width `1px rgba(16,16,18,.45)`, 같은 top
  - 세 요소 모두 `transition: (height|top) .12s ease-out`
  - 캡션: "단면 도해 · 실제 조직 비율과 다를 수 있음" 11px 모노 rgba(244,241,236,.35)
- **스펙 타일 4개**: `display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:1px; margin-top:64px; background:rgba(244,241,236,.14); border:1px solid rgba(244,241,236,.14)` — gap이 구분선으로 보이는 패턴. 타일 `padding:26px; background:#101012`
  - 라벨 400/11px letter-spacing .14em rgba(244,241,236,.4) / 값 500/17px/1.5 #F4F1EC
  - TIP: "Balloon 5,000샷 / Blow 10,000샷" · MODE: "수동 · 오토 / 1·2·3차 스태킹" · CONTROL: "압력 세기 조절 / 압력 해제 시간 조절" · DRUG: "메디컬 · 스킨부스터 / 제형 제한 없음"

### 4. 임상 데이터 (#clinical)
- **Background**: #F4F1EC. Eyebrow #8A6A3E, H2 "조직학적으로 확인된 전달과 반응"
- **Cards**: `display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:20px; margin-top:44px`. 카드 `background:#fff; border:1px solid rgba(16,16,18,.08); border-radius:4px; overflow:hidden`
  - 이미지: `width:100%; height:200px; object-fit:cover; background:#F7F4F0`
  - 본문 영역 `padding:24px` — 제목 500/17px/1.5 #101012, 설명 300/13px/1.75 rgba(16,16,18,.58) margin-top 10px
  - 카드 1: `assets/clinical-histology.jpg` / "콜라겐 밀도 · 표피 두께 증가" / "마이크로니들링 후 대조군 대비 콜라겐 밀도와 표피 두께 변화를 조직 절편으로 확인 (n=3)."
  - 카드 2: `assets/clinical-plla.jpg` / "정확한 니들링 지점에 물질 침착" / "0.25 / 0.5 / 0.75mm 설정별로 목표 깊이에 물질이 남는 것을 확인."
- **샷 속도 표**: `background:#fff; border:1px solid rgba(16,16,18,.08); border-radius:4px; overflow:hidden; margin-top:56px`
  - 헤더 바: `padding:24px 26px; border-bottom:1px solid rgba(16,16,18,.08)`, 좌 "샷 속도 (깊이 0.25mm 기준)" 500/16px, 우 "1,000샷 홀 수 — Blow 16,000 / Balloon 13,000" 400/12px rgba(16,16,18,.45)
  - 래퍼: `overflow-x:auto; overflow-y:hidden` + 내부 `min-width:620px` (모바일 가로 스크롤)
  - 행: `display:grid; grid-template-columns:1.3fr 1fr 1fr 1fr 1fr; gap:12px; padding:14px 26px`
  - 헤더 행: `background:#FBFAF8`, 500/12px, 하단 1px rgba(16,16,18,.08) — 샷 수 / MANUAL / 1 STACK / 2 STACK / 3 STACK
  - 데이터 행: 하단 1px rgba(16,16,18,.05) (마지막 행 none). 1열 500/13px #101012, 2~5열 400/13px 모노스페이스 rgba(16,16,18,.65)
  - 데이터: 1 SHOT 0.20 / 0.30 / 0.25 / 0.23초 · 100 SHOTS 20 / 30 / 25 / 23초 · 500 SHOTS 1분40초 / 2분30초 / 2분5초 / 1분55초 · 1,000 SHOTS 3분20초 / 5분 / 4분10초 / 3분50초

### 5. 시술 사례 (#cases) ★인터랙티브
- **Background**: #1A1613. Eyebrow #C9A671, H2 "전후 비교"
- **Lead**: "핸들을 드래그해 시술 전후를 비교하세요. 전체 26개 케이스는 의료인 확인 후 열람 가능합니다."
- **비교 슬라이더**: `margin-top:44px; position:relative; max-width:560px; user-select:none`
  - 뷰포트: `aspect-ratio:939/975` (원본 사진 비율 — 업스케일/과도한 크롭 방지), `border:1px solid rgba(244,241,236,.16); overflow:hidden; cursor:ew-resize`
  - AFTER 이미지: `position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:center 40%`
  - BEFORE 이미지: 동일 스타일, 래퍼 div에 `clip-path: inset(0 {100-split}% 0 0)`
  - 핸들: `position:absolute; top:0; bottom:0; left:{split}%; width:2px; background:#C9A671; box-shadow:0 0 12px rgba(201,166,113,.6); pointer-events:none`
  - 라벨: 좌상단 "BEFORE" `background:rgba(16,16,18,.7); color:#F4F1EC`, 우상단 "AFTER" `background:rgba(201,166,113,.9); color:#1A1613` — 둘 다 `padding:6px 12px; border-radius:2px`, 500/11px/letter-spacing .12em
  - 하단 메타: "약물 : Keto acid + re:al for skin / 팁 : Balloon / 2회 시술 / 간격 2주" — `display:flex; gap:20px`, 400/12px rgba(244,241,236,.5)
- **사례 카드 그리드**: `display:grid; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:16px; margin-top:56px`
  - 카드: `background:rgba(244,241,236,.04); border:1px solid rgba(244,241,236,.12); border-radius:3px; overflow:hidden`
  - 썸네일: `position:relative; height:190px; background:#0B0F14`. before/after를 각각 `width:50%` 절대배치 div의 background-image로 (`background-size:cover; background-position:center 40%`), 가운데 `1px rgba(201,166,113,.9)` 세로선
  - 라벨 가독성용 스크림: 하단 56px `linear-gradient(180deg,transparent,rgba(6,9,12,.78))`
  - 라벨: 좌하 "BEFORE" rgba(255,255,255,.9), 우하 "AFTER" #E0C08A — 500/10px letter-spacing .1em, 10px 여백
  - 본문 `padding:18px 20px` — 약물명 500/14px #F4F1EC, 상세 300/12px rgba(244,241,236,.5) margin-top 8px
  - 4개: Keto acid + re:al for skin (2회·2주) / Exosome (1회·3주) / PN (3회·2주) / re:al for hair + Skin BTX (5회·2주) — 모두 Balloon Tip
- **잠금 CTA**: `margin-top:36px; padding:32px; border:1px dashed rgba(244,241,236,.24); border-radius:4px; display:flex; flex-wrap:wrap; gap:20px; align-items:center; justify-content:space-between`
  - "나머지 21개 케이스" 500/17px #F4F1EC + "엑소좀 · PN · 스킨보톡스 · 두피 케이스 포함. 의료인 확인 후 전체 자료를 보내드립니다." 300/13px/1.7
  - 버튼 "전체 사례 요청" `padding:14px 26px; background:#C9A671; color:#1A1613; border-radius:2px`, 500/13px. hover #F4F1EC

### 6. 데모 신청 (#demo)
- **Background**: #F4F1EC. `display:flex; flex-wrap:wrap; gap:56px`
- **좌 (flex:1 1 320px)**: Eyebrow "DEMO" #8A6A3E / H2 "병원에서 직접<br>확인해 보세요" / 본문 "담당자가 방문해 장비 시연과 프로토콜 상담을 진행합니다. 신청 후 영업일 기준 1–2일 내 연락드립니다." (max-width 420px) / 연락처 "(주)벗앤벗 · 서울특별시 구로구 디지털로 243 1312호" 400/13px rgba(16,16,18,.62)
- **우 (flex:1 1 360px)**: `background:#fff; border:1px solid rgba(16,16,18,.08); border-radius:4px; padding:32px; display:flex; flex-direction:column; gap:18px`
  - 필드: 병원명 + 담당자명 (한 줄, 각 `flex:1 1 140px`), 연락처 (전체 폭)
  - 라벨 400/12px rgba(16,16,18,.55), 입력 `padding:12px; border:1px solid rgba(16,16,18,.16); border-radius:3px; background:#FBFAF8`, 400/14px
  - 관심 항목 칩 4개 (장비 시연 / 견적 / 전체 임상 자료 / 시술 사례): `padding:9px 14px; border:1px solid rgba(16,16,18,.16); border-radius:999px`, 400/12px — **현재 정적. 다중 선택 토글로 구현할 것**
  - 제출 버튼: `padding:16px; border-radius:3px; background:#101012; color:#F4F1EC`, 500/14px. hover #8A6A3E
  - 고지: "본 페이지는 의료인 대상 정보로 제공됩니다." 300/11px rgba(16,16,18,.45)

### 7. Footer
- **Background**: #101012. `padding:44px clamp(24px,4vw,64px); display:flex; flex-wrap:wrap; gap:28px; justify-content:space-between; align-items:flex-start`
- **좌**: "re:H" 700/18px #F4F1EC + "(주)벗앤벗" 400/10px letter-spacing .18em rgba(244,241,236,.4) / 아래 "본 내용은 의료인을 위한 제품 정보이며, 시술 결과는 개인에 따라 다를 수 있습니다." 300/12px/1.7 rgba(244,241,236,.42) max-width 420px
- **우 (우측 정렬)**: "Locations. 서울특별시 구로구 디지털로 243 1312호" / "Biz License 739-88-01385" — 300/12px/1.7 rgba(244,241,236,.5) / "© 2026 (주)벗앤벗. All rights reserved." rgba(244,241,236,.42)

## Interactions & Behavior

### 니들 깊이 슬라이더
`depth` (0.25–4.00, step 0.01, 기본 1.25). 값에 따라 층 이름·설명·도해가 갱신된다.

| 범위 | 층 이름 | 설명 |
|---|---|---|
| < 0.4 | 표피 — 부스터·미백 | 각질층 장벽만 통과합니다. 트라넥삼산·비타민 등 저분자 성분의 흡수 경로를 엽니다. |
| 0.4 – 2.0 | 진피 — 콜라겐·리프팅 | PLLA·PDLLA 등 콜라겐 자극 제형을 진피층에 균일하게 분포시킵니다. |
| 2.0 – 3.0 | 진피 심부 / 두피 모낭 | 모낭 주변부에 도달합니다. 두피 시술 및 심부 볼륨 제형에 사용됩니다. |
| ≥ 3.0 | 피하 — 볼륨·지방층 | 피하 지방층까지 도달합니다. 부위별 시술 프로토콜 확인이 필요합니다. |

니들 축 높이 / 팁 top / 기준선 top = `depth / 4 * 100` %. transition 0.12s ease-out.

### 전후 비교 슬라이더
Pointer 이벤트로 구현 (터치·마우스 통합):
- `pointerdown`: `dragging=true`, `setPointerCapture`, 즉시 위치 반영 (탭만 해도 이동)
- `pointermove`: dragging일 때만 갱신
- `pointerup`: `dragging=false`
- 위치 계산: `((e.clientX - rect.left) / rect.width) * 100`, **2–98%로 clamp** (양끝에서 핸들이 사라지지 않도록). 기본 50.
- 컨테이너에 `user-select:none`, 핸들에 `pointer-events:none`

### 기타
- 앵커 링크는 부드러운 스크롤. sticky 헤더 때문에 각 섹션에 `scroll-margin-top:70px`
- hover는 위 각 항목에 명시된 값만 사용. transition 없음(즉시)이거나 0.15s ease 수준으로 통일해도 무방
- **미구현**: 폼 제출/검증, 칩 다중 선택, 로딩·에러 상태, "전체 사례 요청" 게이팅 플로우 — 모두 구현 필요

## State Management
프로토타입 기준 상태 (실제 구현에서 필요한 것은 ★):
- `hero: 'A'|'B'|'C'` — 시안 전환용, **구현 대상 아님** (C 고정)
- `device: 'desktop'|'mobile'` — 프리뷰용, **구현 대상 아님** (미디어쿼리로 대체)
- ★ `menuOpen: boolean` — 모바일 네비
- ★ `depth: number` — 니들 깊이
- ★ `split: number` / `dragging: boolean` — 비교 슬라이더
- 추가 필요: 폼 필드 값, 칩 선택 배열, 제출 상태(idle/submitting/success/error)

데이터 페칭 없음. 폼 제출 엔드포인트는 별도 협의 필요.

## Design Tokens

**Colors**
| 용도 | 값 |
|---|---|
| 배경 — 라이트 | `#F4F1EC` |
| 배경 — 카드/입력 | `#FFFFFF` / `#FBFAF8` |
| 배경 — 다크 | `#101012` |
| 배경 — 다크(웜, 사례 섹션) | `#1A1613` |
| 히어로 그라디언트 | `#1F2733` → `#141A22` → `#0C1014` |
| 텍스트 — 다크 | `#101012` |
| 텍스트 — 라이트 | `#F4F1EC` |
| 액센트 골드 (다크 배경) | `#C9A671` |
| 액센트 브론즈 (라이트 배경, eyebrow·hover) | `#8A6A3E` |
| 골드 라이트 (소형 라벨) | `#E0C08A` |
| 피부 도해 — 표피 / 진피 / 피하 | `#EADFD2` / `#D8BFA6` / `#B58F6B` |
| 라이트 배경 위 테두리 | `rgba(16,16,18,.08)` (강조 `.16`) |
| 다크 배경 위 테두리 | `rgba(244,241,236,.14)` (강조 `.24~.28`) |

투명도 규칙: 라이트 배경 위 본문 `rgba(16,16,18,.58~.62)`, 보조 `.45~.55` / 다크 배경 위 본문 `rgba(244,241,236,.55~.62)`, 보조 `.35~.5`

**Typography**
- Noto Sans KR (300/400/500/700) — UI, 본문, 라벨
- Noto Serif KR (300/400/500) — H1, H2, 큰 수치
- 모노스페이스 (`ui-monospace, Menlo, monospace`) — 수치·눈금·표 데이터
- 스케일: H1 `clamp(40px,7vw,92px)`/1.05/-.04em · H2 `clamp(26px,3.2vw,42px)`/1.3/-.02em · 큰 수치 `clamp(44px,6vw,72px)` · 카드 제목 20px/1.45 · 소제목 17px/1.5 · 본문 15px/1.8 · 소본문 14px/1.75 · 캡션 13px/1.75 · 라벨 12px · 마이크로 11px/10px
- Eyebrow: 500/11px/letter-spacing .2em · 스펙 라벨: 400/11px/.14em · 버튼: 500/13–14px
- **전역**: `word-break: keep-all` (한글 단어 중간 줄바꿈 방지) + `overflow-wrap: break-word` + `text-wrap: pretty` — 한글 페이지에서 필수

**Spacing**
- 섹션 세로 패딩 `clamp(64px,7vw,110px)`, 가로 `clamp(24px,4vw,64px)`
- 카드 패딩 32px (스펙 타일 26px, 사례 카드 본문 18px 20px)
- 그리드 gap 16 / 20px, 컬럼 gap 40–56px
- 스케일: 6 · 8 · 10 · 12 · 14 · 16 · 18 · 20 · 22 · 24 · 26 · 32 · 36 · 44 · 48 · 52 · 56 · 64

**Radius**: 2px (에디토리얼 버튼·라벨) / 3px (사례 카드·입력·제출) / 4px (카드·도해) / 999px (칩·필)
**Shadow**: 제품 이미지 `drop-shadow(0 34px 54px rgba(0,0,0,.6))` · 핸들 `0 0 12px rgba(201,166,113,.6)` · 슬라이더 thumb `0 1px 8px rgba(0,0,0,.5)` · 니들 팁 링 `0 0 0 6px rgba(201,166,113,.28)`

## Responsive
프로토타입은 프레임 폭 기반이지만, 실제로는 다음 두 분기만 실질적이다:
1. **모바일 네비** — 데스크탑 인라인 링크 ↔ 햄버거 + 드로어 (≈640px)
2. **히어로 H1** — 좁은 폭에서 46px/1.06 고정
그 외 모든 섹션은 `repeat(auto-fit, minmax(...))` 그리드와 `flex-wrap`으로 자동 대응한다. 샷 속도 표만 `min-width:620px` + 가로 스크롤.

⚠️ 래핑되는 행에는 반드시 grid `auto-fit`을 쓸 것. `flex:1 1 <basis>`는 마지막 항목이 줄바꿈될 때 전체 폭으로 늘어나 깨져 보인다 (이 프로토타입에서 실제로 발생했던 문제).

## Assets
모두 `assets/` 폴더. 원본은 고객사 제공 제품 소개 PDF(`20251015_reH(국문).pdf`)에서 추출했다.

| 파일 | 내용 | 비고 |
|---|---|---|
| `reH-device.png` | re:H 본체 제품컷 | 배경 누끼 처리(투명). 900px 폭으로 리사이즈 |
| `clinical-histology.jpg` | H&E / Trichrome 조직 절편 | |
| `clinical-plla.jpg` | 깊이별 주입 조직 절편 | |
| `case-acne-before/after.jpg` | 큰 비교 슬라이더용 (939×975 / 783×838) | |
| `case-texture-before/after.jpg` | 사례 카드 — Keto acid + re:al for skin | |
| `case-exosome-before/after.jpg` | 사례 카드 — Exosome | |
| `case-pn-before/after.jpg` | 사례 카드 — PN | |
| `case-hair-before/after.jpg` | 사례 카드 — re:al for hair + Skin BTX | |

**⚠️ 자산 관련 확인 필요 사항**
- 로고 파일 없음. 현재 "re:H"는 텍스트로 조판되어 있다. 실제 워드마크/로고 수급 필요.
- 환자 전후 사진은 PDF에서 추출한 것으로, **웹 공개 시 동의 범위와 의료광고 심의를 반드시 확인**해야 한다. 26개 케이스 중 5개만 사용 중이다.
- 임상 이미지 캡션의 수치(n=3 등)는 PDF 기반 요약이므로 원문과 대조 검수 필요.
- 폰트는 Google Fonts CDN을 쓰고 있다. 프로덕션에서는 self-host 권장.

## Files
- `re-H 랜딩페이지.dc.html` — 디자인 원본. 상단에 마크업(템플릿), 하단 `<script data-dc-script>` 안에 로직 클래스가 들어 있다. 히어로 A/B/C 세 시안이 모두 포함되어 있으며 **C안만 구현 대상**.
- `support.js` — 프로토타입 런타임. 참고용이며 이식 대상이 아니다.
- `assets/` — 위 이미지 자산.
