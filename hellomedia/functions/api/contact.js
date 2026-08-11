// POST /api/contact — 헬로미디어 광고 문의 접수 → Brevo로 담당자 메일 발송
// 필요 환경변수(Cloudflare Pages 프로젝트 설정): BREVO_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL

const RATE_LIMIT = { windowMs: 60_000, max: 3 };
const hits = new Map(); // isolate 단위 best-effort rate limit

const INTERESTS = ['풀 패키지', '하프 패키지', 'CPV', '지역 · 진료과 타게팅', 'AI 영상 제작 지원'];

function tooMany(ip) {
  const now = Date.now();
  const rec = hits.get(ip) || [];
  const recent = rec.filter((t) => now - t < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT.max;
}

function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

function bad(status, error) {
  return Response.json({ ok: false, error }, { status });
}

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return bad(400, '잘못된 요청입니다.');
  }

  // honeypot: 봇이 채우는 히든 필드 — 채워져 있으면 조용히 성공 처리
  if (body.website) {
    return Response.json({ ok: true });
  }

  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  if (tooMany(ip)) {
    return bad(429, '요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.');
  }

  const name = String(body.name ?? '').trim();
  const company = String(body.company ?? '').trim();
  const contact = String(body.contact ?? '').trim();
  const interests = Array.isArray(body.interests) ? body.interests.filter((i) => INTERESTS.includes(i)) : [];
  const message = String(body.message ?? '').trim();

  if (!name || name.length > 40) return bad(400, '담당자 성함을 확인해 주세요.');
  if (!company || company.length > 60) return bad(400, '회사명을 확인해 주세요.');
  // @가 있으면 이메일 형식, 없으면 전화번호(숫자 9~11자리)로 검사
  const isEmail = contact.includes('@');
  const contactOk = isEmail
    ? /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(contact)
    : /^[0-9+\-() ]+$/.test(contact) && (() => { const d = contact.replace(/\D/g, ''); return d.length >= 9 && d.length <= 11; })();
  if (!contact || contact.length > 100 || !contactOk) {
    return bad(400, isEmail ? '이메일 형식을 확인해 주세요.' : '연락처를 확인해 주세요.');
  }
  if (message.length > 2000) return bad(400, '문의 내용은 최대 2000자입니다.');

  if (!env.BREVO_API_KEY || !env.CONTACT_TO_EMAIL || !env.CONTACT_FROM_EMAIL) {
    return bad(500, '메일 전송 설정이 아직 완료되지 않았습니다. 잠시 후 다시 시도해 주세요.');
  }

  const receivedAt = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
  const rows = [
    ['담당자명', name],
    ['회사명', company],
    ['이메일/연락처', contact],
    ['관심 상품', interests.length ? interests.join(', ') : '(선택 없음)'],
    ['문의 내용', message || '(없음)'],
    ['개인정보 동의', '제출로 동의 간주'],
    ['접수 시각', `${receivedAt} (KST)`],
  ];
  const html = `
    <h2 style="font-family:sans-serif">[헬로미디어 광고문의] ${esc(company)} / ${esc(name)}</h2>
    <table cellpadding="10" cellspacing="0" border="0" style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
      ${rows.map(([k, v]) => `
        <tr>
          <td style="background:#eaf1fb;border:1px solid #ddd;font-weight:bold;white-space:nowrap">${esc(k)}</td>
          <td style="border:1px solid #ddd;white-space:pre-wrap">${esc(v)}</td>
        </tr>`).join('')}
    </table>`;

  const payload = {
    sender: { name: '헬로미디어 랜딩페이지', email: env.CONTACT_FROM_EMAIL },
    to: [{ email: env.CONTACT_TO_EMAIL }],
    subject: `[헬로미디어 광고문의] ${company} / ${name}`,
    htmlContent: html,
  };
  // 문의자가 이메일을 남겼으면 바로 회신 가능하도록 reply-to 지정
  if (isEmail) {
    payload.replyTo = { email: contact, name: name };
  }

  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': env.BREVO_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    console.error('Brevo error', res.status, await res.text());
    return bad(502, '메일 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.');
  }

  return Response.json({ ok: true });
}
