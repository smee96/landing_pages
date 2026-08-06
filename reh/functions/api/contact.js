// POST /api/contact — re:H 데모·상담 신청 접수 → Brevo로 담당자 메일 발송
// 필요 환경변수(Cloudflare Pages 프로젝트 설정): BREVO_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL

const RATE_LIMIT = { windowMs: 60_000, max: 3 };
const hits = new Map(); // isolate 단위 best-effort rate limit

const INTERESTS = ['장비 시연', '견적', '전체 임상 자료', '시술 사례'];

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

  const hospital = String(body.hospital ?? '').trim();
  const manager = String(body.manager ?? '').trim();
  const phone = String(body.phone ?? '').trim();
  const interests = Array.isArray(body.interests) ? body.interests.filter((i) => INTERESTS.includes(i)) : [];
  const consent = body.consent === true;

  if (!hospital || hospital.length > 60) return bad(400, '병원명을 확인해 주세요.');
  if (manager.length > 40) return bad(400, '담당자명을 확인해 주세요.');
  const phoneDigits = phone.replace(/\D/g, '');
  if (phoneDigits.length < 10 || !/^[0-9-]{10,13}$/.test(phone)) return bad(400, '연락처를 확인해 주세요.');
  if (!consent) return bad(400, '개인정보 수집 및 이용에 동의해 주세요.');

  if (!env.BREVO_API_KEY || !env.CONTACT_TO_EMAIL || !env.CONTACT_FROM_EMAIL) {
    return bad(500, '메일 전송 설정이 아직 완료되지 않았습니다. 잠시 후 다시 시도해 주세요.');
  }

  const receivedAt = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
  const rows = [
    ['병원명', hospital],
    ['담당자명', manager || '(없음)'],
    ['연락처', phone],
    ['관심 항목', interests.length ? interests.join(', ') : '(선택 없음)'],
    ['개인정보 동의', '동의함'],
    ['접수 시각', `${receivedAt} (KST)`],
  ];
  const html = `
    <h2 style="font-family:sans-serif">[re:H 데모신청] ${esc(hospital)} / ${esc(manager || phone)}</h2>
    <table cellpadding="10" cellspacing="0" border="0" style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
      ${rows.map(([k, v]) => `
        <tr>
          <td style="background:#F4F1EC;border:1px solid #ddd;font-weight:bold;white-space:nowrap">${esc(k)}</td>
          <td style="border:1px solid #ddd;white-space:pre-wrap">${esc(v)}</td>
        </tr>`).join('')}
    </table>`;

  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': env.BREVO_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sender: { name: 're:H 랜딩페이지', email: env.CONTACT_FROM_EMAIL },
      to: [{ email: env.CONTACT_TO_EMAIL }],
      subject: `[re:H 데모신청] ${hospital} / ${manager || phone}`,
      htmlContent: html,
    }),
  });

  if (!res.ok) {
    console.error('Brevo error', res.status, await res.text());
    return bad(502, '메일 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.');
  }

  return Response.json({ ok: true });
}
