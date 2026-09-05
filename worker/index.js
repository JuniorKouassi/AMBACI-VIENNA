// AMBACI VIENNA — Consular appointment booking API
// Routes: GET /api/availability, POST /api/bookings
// Falls back to static asset serving for everything else.

const CONSULAR_DAYS = [2, 3, 4, 5]; // Tue=2 ... Fri=5 (Sunday=0)
const SLOT_TIMES = ['09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30'];

// Fixed public holidays (embassy closed) — extend yearly.
const HOLIDAYS = new Set([
  '2026-01-01', '2026-05-01', '2026-08-07', '2026-10-26', '2026-12-25', '2026-12-26',
  '2027-01-01', '2027-05-01', '2027-08-07', '2027-10-26', '2027-12-25', '2027-12-26',
]);

const SERVICE_LABELS = {
  passeport: 'Passeport',
  visa: 'Visa',
  carte_consulaire: 'Carte consulaire',
  etat_civil: 'État civil',
  legalisation: 'Légalisation',
  autre: 'Autre démarche',
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}

function isConsularDay(dateStr) {
  const d = new Date(dateStr + 'T00:00:00Z');
  return CONSULAR_DAYS.includes(d.getUTCDay()) && !HOLIDAYS.has(dateStr);
}

function daysInMonth(year, month) {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

async function handleAvailability(url, env) {
  const month = url.searchParams.get('month'); // YYYY-MM
  const date = url.searchParams.get('date'); // YYYY-MM-DD

  if (date) {
    if (!isConsularDay(date)) return json({ date, slots: [] });
    const { results } = await env.DB.prepare(
      'SELECT appt_time FROM bookings WHERE appt_date = ? AND status != ?'
    ).bind(date, 'cancelled').all();
    const booked = new Set(results.map((r) => r.appt_time));
    const slots = SLOT_TIMES.map((t) => ({ time: t, available: !booked.has(t) }));
    return json({ date, slots });
  }

  if (month) {
    const [y, m] = month.split('-').map(Number);
    const total = daysInMonth(y, m);
    const { results } = await env.DB.prepare(
      "SELECT appt_date, COUNT(*) as n FROM bookings WHERE appt_date LIKE ? AND status != 'cancelled' GROUP BY appt_date"
    ).bind(`${month}-%`).all();
    const bookedCount = {};
    for (const r of results) bookedCount[r.appt_date] = r.n;

    const days = [];
    for (let d = 1; d <= total; d++) {
      const dateStr = `${month}-${String(d).padStart(2, '0')}`;
      const open = isConsularDay(dateStr);
      const full = open && (bookedCount[dateStr] || 0) >= SLOT_TIMES.length;
      days.push({ date: dateStr, available: open && !full });
    }
    return json({ month, days });
  }

  return json({ error: 'missing_month_or_date' }, 400);
}

function genReference() {
  const year = new Date().getFullYear();
  const rand = Math.floor(10000 + Math.random() * 90000);
  return `AMB-CI-${year}-${rand}`;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

function formatDateFr(dateStr) {
  const d = new Date(dateStr + 'T00:00:00Z');
  return d.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}

async function sendEmail(env, { to, subject, html }) {
  if (!env.RESEND_API_KEY) return { skipped: true };
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from: env.EMAIL_FROM || 'Ambassade de Côte d\'Ivoire <onboarding@resend.dev>',
      to: [to],
      subject,
      html,
    }),
  });
  if (!res.ok) {
    console.error('Resend error', res.status, await res.text());
    return { ok: false };
  }
  return { ok: true };
}

// --- Google Calendar (service-account JWT, no external deps) ---

function base64url(bytes) {
  let bin = '';
  for (const b of new Uint8Array(bytes)) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function pemToArrayBuffer(pem) {
  const b64 = pem.replace(/-----BEGIN PRIVATE KEY-----/, '')
    .replace(/-----END PRIVATE KEY-----/, '')
    .replace(/\s+/g, '');
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes.buffer;
}

async function getGoogleAccessToken(env) {
  const email = env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = env.GOOGLE_PRIVATE_KEY;
  if (!email || !key) return null;

  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const claim = {
    iss: email,
    scope: 'https://www.googleapis.com/auth/calendar',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  };
  const enc = (obj) => base64url(new TextEncoder().encode(JSON.stringify(obj)));
  const unsigned = `${enc(header)}.${enc(claim)}`;

  const cryptoKey = await crypto.subtle.importKey(
    'pkcs8',
    pemToArrayBuffer(key.replace(/\\n/g, '\n')),
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', cryptoKey, new TextEncoder().encode(unsigned));
  const jwt = `${unsigned}.${base64url(sig)}`;

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: `grant_type=${encodeURIComponent('urn:ietf:params:oauth:grant-type:jwt-bearer')}&assertion=${jwt}`,
  });
  if (!res.ok) {
    console.error('Google token error', res.status, await res.text());
    return null;
  }
  const data = await res.json();
  return data.access_token;
}

async function createCalendarEvent(env, booking) {
  const calendarId = env.GOOGLE_CALENDAR_ID;
  if (!calendarId) return null;
  const token = await getGoogleAccessToken(env);
  if (!token) return null;

  const [h, m] = booking.appt_time.split(':').map(Number);
  const startDate = new Date(`${booking.appt_date}T${booking.appt_time}:00`);
  const endDate = new Date(startDate.getTime() + 30 * 60000);
  const toLocal = (d) => {
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:00`;
  };

  const event = {
    summary: `RDV Consulaire — ${SERVICE_LABELS[booking.service] || booking.service} — ${booking.first_name} ${booking.last_name}`,
    description: `Service: ${SERVICE_LABELS[booking.service] || booking.service}\nEmail: ${booking.email}\nTéléphone: ${booking.phone}\nPays de résidence: ${booking.country}\nRéférence: ${booking.reference}${booking.notes ? `\nNotes: ${booking.notes}` : ''}`,
    start: { dateTime: toLocal(startDate), timeZone: 'Europe/Vienna' },
    end: { dateTime: toLocal(endDate), timeZone: 'Europe/Vienna' },
  };

  const res = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'content-type': 'application/json' },
      body: JSON.stringify(event),
    }
  );
  if (!res.ok) {
    console.error('Calendar insert error', res.status, await res.text());
    return null;
  }
  const data = await res.json();
  return data.id || null;
}

async function handleCreateBooking(request, env) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'invalid_json' }, 400);
  }

  const required = ['service', 'date', 'time', 'firstName', 'lastName', 'email', 'phone', 'country'];
  for (const f of required) {
    if (!body[f] || typeof body[f] !== 'string' || !body[f].trim()) {
      return json({ error: 'missing_field', field: f }, 400);
    }
  }
  if (!SERVICE_LABELS[body.service]) return json({ error: 'invalid_service' }, 400);
  if (!isConsularDay(body.date)) return json({ error: 'closed_day' }, 400);
  if (!SLOT_TIMES.includes(body.time)) return json({ error: 'invalid_slot' }, 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) return json({ error: 'invalid_email' }, 400);

  const reference = genReference();

  try {
    await env.DB.prepare(
      `INSERT INTO bookings (reference, service, appt_date, appt_time, first_name, last_name, email, phone, country, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      reference, body.service, body.date, body.time,
      body.firstName.trim(), body.lastName.trim(), body.email.trim(),
      body.phone.trim(), body.country.trim(), (body.notes || '').trim() || null
    ).run();
  } catch (e) {
    if (String(e).includes('UNIQUE')) return json({ error: 'slot_taken' }, 409);
    console.error(e);
    return json({ error: 'db_error' }, 500);
  }

  const booking = {
    reference, service: body.service, appt_date: body.date, appt_time: body.time,
    first_name: body.firstName.trim(), last_name: body.lastName.trim(),
    email: body.email.trim(), phone: body.phone.trim(), country: body.country.trim(),
    notes: (body.notes || '').trim(),
  };

  const eventId = await createCalendarEvent(env, booking).catch((e) => { console.error(e); return null; });
  if (eventId) {
    await env.DB.prepare('UPDATE bookings SET google_event_id = ? WHERE reference = ?').bind(eventId, reference).run();
  }

  const serviceLabel = SERVICE_LABELS[body.service];
  const dateLabel = formatDateFr(body.date);

  await sendEmail(env, {
    to: booking.email,
    subject: `Confirmation de rendez-vous — ${serviceLabel} — ${reference}`,
    html: `<div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;">
      <h2 style="color:#0A1F10;">Rendez-vous confirmé</h2>
      <p>Bonjour ${escapeHtml(booking.first_name)},</p>
      <p>Votre rendez-vous au service consulaire de l'Ambassade de Côte d'Ivoire en Autriche a bien été enregistré.</p>
      <table style="width:100%;border-collapse:collapse;margin:16px 0;">
        <tr><td style="padding:6px 0;color:#8A8570;">Service</td><td style="padding:6px 0;font-weight:bold;">${escapeHtml(serviceLabel)}</td></tr>
        <tr><td style="padding:6px 0;color:#8A8570;">Date</td><td style="padding:6px 0;font-weight:bold;">${escapeHtml(dateLabel)}</td></tr>
        <tr><td style="padding:6px 0;color:#8A8570;">Heure</td><td style="padding:6px 0;font-weight:bold;">${escapeHtml(body.time)}</td></tr>
        <tr><td style="padding:6px 0;color:#8A8570;">Référence</td><td style="padding:6px 0;font-weight:bold;color:#D96C00;">${escapeHtml(reference)}</td></tr>
      </table>
      <p>Merci de vous présenter 10 minutes avant l'heure prévue, muni d'une pièce d'identité et des documents requis pour votre démarche.</p>
      <p style="color:#8A8570;font-size:13px;">Ambassade de la République de Côte d'Ivoire en Autriche — Michael-Neumann-Gasse 2, 1190 Wien</p>
    </div>`,
  }).catch((e) => console.error(e));

  if (env.NOTIFY_EMAIL) {
    await sendEmail(env, {
      to: env.NOTIFY_EMAIL,
      subject: `Nouveau rendez-vous — ${serviceLabel} — ${dateLabel} ${body.time}`,
      html: `<div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;">
        <h2 style="color:#0A1F10;">Nouveau rendez-vous consulaire</h2>
        <table style="width:100%;border-collapse:collapse;margin:16px 0;">
          <tr><td style="padding:6px 0;color:#8A8570;">Service</td><td style="padding:6px 0;font-weight:bold;">${escapeHtml(serviceLabel)}</td></tr>
          <tr><td style="padding:6px 0;color:#8A8570;">Date</td><td style="padding:6px 0;font-weight:bold;">${escapeHtml(dateLabel)}</td></tr>
          <tr><td style="padding:6px 0;color:#8A8570;">Heure</td><td style="padding:6px 0;font-weight:bold;">${escapeHtml(body.time)}</td></tr>
          <tr><td style="padding:6px 0;color:#8A8570;">Nom</td><td style="padding:6px 0;font-weight:bold;">${escapeHtml(booking.first_name)} ${escapeHtml(booking.last_name)}</td></tr>
          <tr><td style="padding:6px 0;color:#8A8570;">Email</td><td style="padding:6px 0;">${escapeHtml(booking.email)}</td></tr>
          <tr><td style="padding:6px 0;color:#8A8570;">Téléphone</td><td style="padding:6px 0;">${escapeHtml(booking.phone)}</td></tr>
          <tr><td style="padding:6px 0;color:#8A8570;">Pays de résidence</td><td style="padding:6px 0;">${escapeHtml(booking.country)}</td></tr>
          <tr><td style="padding:6px 0;color:#8A8570;">Référence</td><td style="padding:6px 0;font-weight:bold;color:#D96C00;">${escapeHtml(reference)}</td></tr>
        </table>
        ${booking.notes ? `<p><strong>Notes :</strong> ${escapeHtml(booking.notes)}</p>` : ''}
        ${eventId ? '<p style="color:#007A35;">✓ Ajouté au calendrier partagé.</p>' : '<p style="color:#D96C00;">⚠ Non ajouté au calendrier (vérifier la configuration Google Calendar).</p>'}
      </div>`,
    }).catch((e) => console.error(e));
  }

  return json({ reference, service: body.service, date: body.date, time: body.time });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/availability' && request.method === 'GET') {
      return handleAvailability(url, env);
    }
    if (url.pathname === '/api/bookings' && request.method === 'POST') {
      return handleCreateBooking(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};
