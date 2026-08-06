# Handoff: 올티모(ALLTIMO) 랜딩페이지 — (주)벗앤벗

## Overview
에스테틱 샵 원장 대상, 다이오드 리프팅 장비 "올티모" 판매 랜딩페이지.
목적은 단 하나 — **도입 문의 폼 제출 → (주)벗앤벗 담당자 메일 수신**.
비주얼 스타일 3안(다크 / 라이트 / 미니멀)을 데스크탑(1200px) + 모바일(390px)로 제작했으며,
채택안 1개만 구현하면 된다.

## About the Design Files
이 번들의 HTML 파일은 **디자인 레퍼런스**다. 최종 룩앤필과 의도된 동작을 보여주는 프로토타입이며,
그대로 배포할 프로덕션 코드가 아니다. 대상 코드베이스(Next.js / React 등)의 기존 패턴·컴포넌트·
스타일 체계로 **재구현**할 것. 아직 코드베이스가 없다면 Next.js(App Router) + Tailwind 정도가 적합하다.

`올티모 랜딩페이지.dc.html`은 3안을 한 캔버스에 나란히 배치한 디자인 문서다.
각 옵션은 `id="1a" | "1b" | "1c"` 로 구분되어 있고, 옵션 안에 데스크탑 카드와 모바일 카드가 순서대로 들어있다.
카드를 감싸는 `.dv-*` 껍데기(회색 배경, 배지, 라벨)는 디자인 문서용 크롬이므로 구현 대상이 아니다.

## Fidelity
**High-fidelity.** 색상·타이포·간격·카피가 모두 확정 값이다. 픽셀 단위로 재현하되,
폼 요소는 프로토타입에서 시각적 플레이스홀더(div)로만 그려져 있으므로 실제 input/textarea/checkbox로 구현할 것.

## 스타일 3안
| id | 이름 | 성격 |
|----|------|------|
| 1a | 다크 | 배경 #0d0c0b, 브론즈 액센트 #b98a5e. 장비 누끼 + 글로우. 프리미엄/장비 중심 |
| 1b | 라이트 | 배경 #fbf8f4, 리플렛 톤 그대로. 형광펜 하이라이트 텍스트. 신뢰감 |
| 1c | 미니멀 | 배경 #fff, 괘선·모노스페이스 라벨·여백 중심. 정보 담백 |

## Screens / Views

### 1. Header (sticky 권장, 프로토타입은 static)
- 좌: 로고 텍스트 "(주)벗앤벗" — 17px / 700 / letter-spacing -0.02em
- 우: 텍스트 링크 "제품소개 · 기술 · 핸드피스" 14px, opacity ~0.6 + CTA 버튼 "문의하기"
- 다크(1a): CTA = 1px solid #b98a5e 테두리, radius 999px, 텍스트 #d8ac82
- 라이트(1b): CTA = 배경 #1c1917, 흰 글씨, radius 999px
- 미니멀(1c): 내비 없음. 우측에 "문의하기 →" 텍스트만
- 패딩 20~26px 세로 / 56~72px 가로. 하단 1px 경계선 rgba(0,0,0,.07) 또는 rgba(255,255,255,.09)

### 2. Hero
- 1a: 좌우 grid `1fr 480px`, 패딩 76px 56px 60px.
  - 아이브로우 "DIODE LIFTING SOLUTION" 13px / 600 / letter-spacing .22em / #b98a5e
  - 서브 "지금까지 없었던, 다이오드 올티모" 19px / rgba(239,236,230,.6)
  - H1 "ALLTIMO / 올티모" 76px / 800 / line-height 1.05 / letter-spacing -.04em, 2행 중 "올티모"는 #d8ac82
  - 본문 16px / line-height 1.85 / max-width 520px
  - 버튼 2개: **도입 문의하기**(bg #b98a5e, 텍스트 #14110e, radius 6px, 패딩 16/34, 700),
    **자료 받아보기**(1px solid rgba(255,255,255,.2), radius 6px)
  - 우측: 장비 누끼 이미지 330px 폭, `filter: drop-shadow(0 30px 50px rgba(0,0,0,.6))`,
    뒤에 400×400 radial-gradient 글로우 rgba(185,138,94,.28)→transparent 68%
  - 히어로 하단: 칩 4개 — 즉각적인 리프팅 효과 / 당일 회복 가능 / 흔적 제로 관리 / 눈에 보이는 확실한 변화
    (1px solid rgba(216,172,130,.35), radius 999px, 14px, #d8ac82)
- 1b: grid `1fr 520px`. H1 "올티모란?" 66px/800, 배경 `linear-gradient(transparent 62%, #e8d6bf 62%)` 형광펜 효과.
  우측은 말풍선 포함 원본 이미지(assets/hero-full.png).
- 1c: H1 88px / 300 weight, 2행 "지금까지 없었던, / **다이오드 올티모**"(둘째 행 700).
  본문 2단 grid(좌 설명문 / 우 01~04 괘선 리스트 + 도입 문의하기 버튼).
  장비 누끼는 그 아래 #f4f2ee 밴드 위 340px 폭으로 중앙 배치.

### 3. 3-Up 핵심 (3 effect / Dual Custom / Relaxtion)
- 3열 grid, gap 40~56px
- 각 항목: 넘버(01/02/03, 12px, 흐린 색) → 타이틀(26~30px / 700~800) → 컬러 서브라인 → 설명 2줄
- 카피(그대로 사용):
  - 3 effect · 리프팅, 컨투어링, 브라이트닝 · "트리플 파장으로 / 세 가지 효과를 동시에!"
  - Dual Custom · 두 가지 맞춤형 핸드피스 · "피부 타입에 따라 맞춤형 / 커스터마이징 관리 가능!"
  - Relaxtion · 통증은 낮추고, 효과는 바로 · "냉각 시스템을 통하여 / 피부 온도를 낮춰 안전하게!"

### 4. 핸드피스 섹션
- 배지 "에스테틱 미용 시장의 새로운 패러다임"(1px 테두리, radius 999px, 14px)
- H2 "편안하게 · **아프지 않게** · **티나지 않게!**" 44~46px, 기본 weight 400에 강조부 800
- 그 아래 PLADOT / TIGLE 핸드피스 이미지 풀폭

### 5. 파장 섹션 (S/E/T-Light)
- H2 "3가지 파장이 동시 다발적으로" + 리드문
  "세 가지 주요 파장대가 피부의 서로 다른 깊이에 도달하여 리프팅 외에도 톤 / 모공 / 색소 / 탄력 / 윤곽개선이 가능합니다."
- 1a: 3열 카드(1px 테두리, radius 10px, 패딩 28px), 각 카드 상단에 9px 컬러 도트
  - S-Light (755) #ff3b30 · 비교적 얕은 곳 · 색소톤 개선 / 모공수축 / 피부 질감 개선
  - E-Light (810) #2a4bff · 전반적인 피부층 · 탄력 개선 / 피부 활력 개선 / 피지분비량 안정화 / 잔주름 및 혈색 개선에 도움
  - T-Light (1064) #c73bff · 깊은 유지인대 층 · 탄력과 리프팅 효과
- 1b: 리플렛 원본 표 이미지 사용
- 1c: 세로 구분선만 있는 3열 표

### 6. RECOMMEND FOR
- H2 "다이오드를 / 추천드리는 이유입니다." + 리드문
  "올티모의 다이오드 리프팅은 **지방위축이 거의 발생하지 않는 기전입니다.**"
- 라벨 "RECOMMEND FOR" 12px / letter-spacing .16em / 700
- 4행 리스트(01~04), 카피:
  01 얼굴에 지방이 적은 고객님 / 02 볼꺼짐이 걱정되는 부위 /
  03 리프팅 장비가 효과가 없다고 느꼈던 분들 / 04 관리 이후 비대칭이 될까봐 걱정하시는 분들
- 1a: rgba(185,138,94,.13) 배경 행 / 1b: #e5cfb4 배경 행 / 1c: 괘선만
- 우측: TIGLE 핸드피스 이미지

### 7. 도입 문의 (핵심 섹션)
- 좌: H2 "도입 문의" + "남겨주신 내용은 (주)벗앤벗 담당자에게 바로 전달되며, 영업일 기준 1일 이내에 회신드립니다."
- 우: 2열 grid 폼
- **필드(전부 필수, 문의 내용만 선택)**
  | name | 라벨 | 타입 | 검증 |
  |------|------|------|------|
  | name | 이름 | text | 필수, 1~40자 |
  | phone | 연락처 | tel | 필수, 숫자/하이픈, 9~13자 |
  | email | 이메일 | email | 필수, 이메일 형식 |
  | company | 병원 / 샵 이름 | text | 필수 |
  | region | 지역 | text (또는 시/도 select) | 필수 |
  | message | 문의 내용 | textarea (높이 120px) | 선택, 최대 2000자 |
  | consent | 개인정보 수집 및 이용에 동의합니다. | checkbox | 필수 true |
- 제출 버튼 "문의 보내기" — 풀폭, 패딩 17px, 700, 16px
- 입력 필드: 높이 48px, radius 6px, 1px 테두리(1a rgba(255,255,255,.16) / 1b rgba(0,0,0,.14)),
  1c는 테두리 없이 하단 1px 밑줄만
- **이메일 주소는 화면에 노출하지 않는다.** (1a는 이미 제거됨. 1b/1c에 남아있는 email-*.png 이미지도
  구현 시 넣지 말 것.) 수신자는 서버 환경변수로만 보관.

### 8. Footer
3행, 12~13px, line-height 1.9, 흐린 색:
```
Locations. 서울특별시 구로구 디지털로 243 1312호
Biz License 739-88-01385
Hosting by (주)벗앤벗
```

## Interactions & Behavior
- **도입 문의하기 / 문의하기 (헤더·히어로 CTA)** → 문의 섹션으로 스크롤 이동(`#contact`), 첫 필드 focus.
- **자료 받아보기** → 소개서 PDF 다운로드. 프로토타입에서는 동작 없음. 두 갈래 중 택1:
  (a) 정적 PDF 직접 다운로드, (b) 이메일만 받고 메일로 자료 발송(문의 폼 재사용, `type: "brochure"`).
- **문의 보내기** → 클라이언트 검증 → POST `/api/contact` → 로딩(버튼 disabled + "전송 중...") →
  성공 시 폼 자리를 완료 메시지로 교체("문의가 접수되었습니다. 영업일 기준 1일 이내에 회신드립니다."),
  실패 시 버튼 위에 에러 문구 표시. 폼은 초기화하지 않고 유지.
- 스팸 방어: honeypot 히든 필드 + 동일 IP 분당 3회 rate limit 권장.
- 호버: 버튼 opacity .88 또는 밝기 소폭 변화, transition 150ms ease. 링크 opacity .7.
- 반응형: 1200px 기준 데스크탑 / 768px 미만은 모바일 카드 레이아웃(모든 grid 1열, 가로 패딩 20~22px,
  H1 40~44px, 폼 1열).

## State Management
```
form: { name, phone, email, company, region, message, consent }
status: 'idle' | 'validating' | 'submitting' | 'success' | 'error'
errors: Record<field, string>
```
데이터 페칭 없음. 유일한 네트워크 호출은 문의 제출 1건.

## 메일 전송 (Resend)
- 수신자는 **코드에 하드코딩하지 말고** 환경변수로: `CONTACT_TO_EMAIL`, `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`.
  `CONTACT_TO_EMAIL` 실제 값은 이 문서에 적지 않으며 별도로 전달받을 것.
- 발신 도메인은 Resend에 verify된 도메인 사용(예: no-reply@<verified-domain>).
- `reply_to`에 문의자 이메일을 넣어 회신이 바로 가도록 할 것.
- 서버 라우트 예시 (Next.js App Router):
```ts
// app/api/contact/route.ts
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();
  // 1) honeypot 확인  2) 필드 검증(zod 권장)  3) rate limit
  await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL!,
    to: process.env.CONTACT_TO_EMAIL!,
    replyTo: body.email,
    subject: \`[올티모 도입문의] \${body.company} / \${body.name}\`,
    html: '...필드를 표로 정리한 본문...',
  });
  return Response.json({ ok: true });
}
```
- 메일 본문에는 이름·연락처·이메일·샵 이름·지역·문의 내용·동의 여부·접수 시각을 표로 담을 것.

## Design Tokens

### 1a 다크
```
bg           #0d0c0b     surface #131211
text         #efece6     text-muted rgba(239,236,230,.6) / .45
accent       #b98a5e     accent-light #d8ac82
border       rgba(255,255,255,.09) ~ .16
btn-fg       #14110e
```
### 1b 라이트
```
bg           #fbf8f4     surface #fff
text         #1c1917     text-muted rgba(28,25,23,.6)
accent       #a9835c     highlight #e8d6bf   band #e5cfb4
border       rgba(0,0,0,.07) / .14
```
### 1c 미니멀
```
bg #fff   band #f4f2ee   text #111   muted rgba(17,17,17,.6) / .35
rule rgba(17,17,17,.14)   radius 2px   mono: ui-monospace, Menlo
```
### 공통
```
font        Pretendard (fallback -apple-system, sans-serif)
spacing     4 / 6 / 9 / 12 / 16 / 20 / 22 / 28 / 32 / 44 / 56 / 70 / 76 px
radius      2 (1c) / 6 / 8 / 10 / 12 / 999
type scale  11 12 13 14 15 16 17 19 22 26 28 30 34 36 38 40 44 46 66 76 88
```

## Assets
`assets/` 폴더:
- `machine-cut.png` — 장비 누끼(배경 투명). 사용자가 제공한 렌더 이미지에서 배경 제거. 1a 히어로, 1c 제품 컷.
- `hero-full.png` — 말풍선 포함 장비 컷(흰 배경). 1b 히어로.
- `email-dark.png`, `email-light.png` — 이메일 주소를 텍스트가 아닌 이미지로 노출하기 위한 파일.
  **최종 구현에서는 사용하지 않는다.** (문의 폼만 사용)

`uploads/` 폴더의 리플렛 캡처 이미지:
- `pasted-1785983506937-0.png` — PLADOT / TIGLE 핸드피스 2종
- `pasted-1785983521503-0.png` — 티글 TIGLE 핸드피스
- `pasted-1785983584182-0.png` — S/E/T-Light 침투층·역할 표
- 나머지는 리플렛 원본 페이지 캡처(참고용)

원본 소개서: `uploads/올티모 3단 리플렛.pdf`
이미지들은 리플렛 캡처이므로, 실제 배포 전에는 원본 해상도 소스로 교체 권장(특히 표/도해 이미지는 텍스트로 재구성하면 더 좋다).

## Files
- `올티모 랜딩페이지.dc.html` — 3안 전체 디자인 문서 (데스크탑 + 모바일)
- `assets/`, `uploads/` — 위 자산

## 남은 결정 사항
1. 3안 중 채택안
2. "자료 받아보기"의 동작 (직접 다운로드 vs 메일 발송)
3. 지역 필드를 자유 입력으로 둘지 시/도 select로 할지
4. 문의 접수 시 문의자에게 자동 확인 메일을 보낼지
