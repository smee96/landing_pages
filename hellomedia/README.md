# 헬로미디어 광고 상품 안내 랜딩페이지

- **클라이언트**: (주)디스코박스 — 병의원 DID 영상매체 "헬로미디어" 광고 상품 소개
- **납품일**: 2026-08-11
- **배포**: Cloudflare Pages — `hellomedia-landing` (https://hellomedia-landing.pages.dev)
- **원본 시안**: 클로드 디자인 `헬로미디어 광고소개 랜딩.dc.html` (2026-08-11 전달분)
- **자매 페이지**: [hello100](../hello100/) — 같은 클라이언트의 온라인 매체 LP, 상호 링크됨

## 구조

```
hellomedia/
├── public/index.html        # 정적 랜딩 (순수 HTML/CSS/JS)
└── functions/api/contact.js # 문의 폼 → Brevo 메일 발송
```

## 배포

```bash
npx wrangler pages deploy public --project-name hellomedia-landing
```

## 환경변수 (Cloudflare Pages 프로젝트 설정)

| 이름 | 설명 |
|---|---|
| `BREVO_API_KEY` | Brevo API 키 (hello100-landing과 동일 값) |
| `CONTACT_TO_EMAIL` | 문의 수신 주소 — `hello_ad@mobin-inc.com` |
| `CONTACT_FROM_EMAIL` | Brevo에 verify된 발신 주소 — `kyuhan.lee@mobin-inc.com` |

시크릿은 배포 시점 스냅샷이다 — 값을 바꾸면 재배포해야 반영된다.

## 미완 항목

- 소개서 PDF: "매체 소개서 다운로드" 버튼 2곳은 파일이 없어 주석 처리됨.
  PDF를 받으면 `public/uploads/hellomedia.pdf`로 넣고 index.html의 주석 두 곳을 해제.
- 단가 표시: 시안의 `showPricing` 기본값(true)대로 **단가 노출 상태**
  (풀 2,000만원 · 하프 1,000만원 · CPV 6원, 할증/할인표 포함).
- AI 샘플 영상: 시안에 있던 R2 공개 URL을 그대로 사용 중 — 디스코박스 측 버킷이므로
  링크가 깨지면 클라이언트에 확인.
