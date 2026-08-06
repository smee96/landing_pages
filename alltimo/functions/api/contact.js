// POST /api/contact — 문의 폼 접수 → Resend로 담당자 메일 발송
// 필요 환경변수(Cloudflare Pages 프로젝트 설정): RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL

const RATE_LIMIT = { windowMs: 60_000, max: 3 };
const hits = new Map(); // isolate 단위 best-effort rate limit

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
  const phone = String(body.phone ?? '').trim();
  const email = String(body.email ?? '').trim();
  const company = String(body.company ?? '').trim();
  const region = String(body.region ?? '').trim();
  const message = String(body.message ?? '').trim();
  const consent = body.consent === true;

  if (!name || name.length > 40) return bad(400, '이름을 확인해 주세요.');
  if (!phone && !email) return bad(400, '연락처와 이메일 중 하나는 입력해 주세요.');
  if (phone && !/^0\d{1,2}-?\d{3,4}-?\d{4}$/.test(phone)) return bad(400, '연락처를 확인해 주세요.');
  if (email && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254)) return bad(400, '이메일을 확인해 주세요.');
  if (!company || company.length > 100) return bad(400, '병원/샵 이름을 확인해 주세요.');
  if (!region || region.length > 100) return bad(400, '지역을 확인해 주세요.');
  if (message.length > 2000) return bad(400, '문의 내용은 최대 2000자입니다.');
  if (!consent) return bad(400, '개인정보 수집 및 이용에 동의해 주세요.');

  if (!env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL || !env.CONTACT_FROM_EMAIL) {
    return bad(500, '메일 전송 설정이 아직 완료되지 않았습니다. 잠시 후 다시 시도해 주세요.');
  }

  const receivedAt = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
  const rows = [
    ['이름', name],
    ['연락처', phone || '(없음)'],
    ['이메일', email || '(없음)'],
    ['병원 / 샵 이름', company],
    ['지역', region],
    ['문의 내용', message || '(없음)'],
    ['개인정보 동의', '동의함'],
    ['접수 시각', `${receivedAt} (KST)`],
  ];
  const html = `
    <h2 style="font-family:sans-serif">[올티모 도입문의] ${esc(company)} / ${esc(name)}</h2>
    <table cellpadding="10" cellspacing="0" border="0" style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
      ${rows.map(([k, v]) => `
        <tr>
          <td style="background:#f4f2ee;border:1px solid #ddd;font-weight:bold;white-space:nowrap">${esc(k)}</td>
          <td style="border:1px solid #ddd;white-space:pre-wrap">${esc(v)}</td>
        </tr>`).join('')}
    </table>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM_EMAIL,
      to: env.CONTACT_TO_EMAIL,
      ...(email ? { reply_to: email } : {}),
      subject: `[올티모 도입문의] ${company} / ${name}`,
      html,
    }),
  });

  if (!res.ok) {
    console.error('Resend error', res.status, await res.text());
    return bad(502, '메일 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.');
  }

  return Response.json({ ok: true });
}
