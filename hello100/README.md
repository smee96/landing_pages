# 헬로100 광고 상품 안내 랜딩페이지

- **클라이언트**: (주)모빈 — 헬스케어 앱 "헬로100" 광고 상품 소개 (푸터·소개서 모두 모빈 명의)
- **납품일**: 2026-08-11
- **배포**: Cloudflare Pages — `hello100-landing` (https://hello100-landing.pages.dev)
- **원본 시안**: 클로드 디자인 `헬로100 광고소개 랜딩.dc.html` (2026-08-11 전달분)

## 구조

```
hello100/
├── public/index.html        # 정적 랜딩 (순수 HTML/CSS/JS)
└── functions/api/contact.js # 문의 폼 → Brevo 메일 발송
```

## 배포

```bash
npx wrangler pages deploy public --project-name hello100-landing
```

## 환경변수 (Cloudflare Pages 프로젝트 설정)

| 이름 | 설명 |
|---|---|
| `BREVO_API_KEY` | Brevo(구 Sendinblue) API 키 |
| `CONTACT_TO_EMAIL` | 문의 수신 주소 — `hello_ad@mobin-inc.com` |
| `CONTACT_FROM_EMAIL` | Brevo에 verify된 발신 주소 |

시크릿은 배포 시점 스냅샷이다 — 값을 바꾸면 재배포해야 반영된다.

## 참고

- 소개서 PDF: `public/uploads/hello100.pdf` (2026-08-12 반영, "MOBIN Inc. — 헬로100 광고 상품 소개서_v2")
- 단가 표시: 디자인의 `showPricing` 토글 기본값(false)대로 단가 비노출 상태.
  노출이 필요하면 원본 시안의 가격 블록을 참고해 카드에 추가.

## 자매 페이지

- [hellomedia](../hellomedia/) — 같은 클라이언트의 옥외(DID) 매체 LP. 상호 링크됨.
