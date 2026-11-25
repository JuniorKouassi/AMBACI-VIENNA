/* ============================================================
   Rendez-vous — booking flow client logic
   ============================================================ */
(function () {
  const SERVICE_ICONS = {
    passeport: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="2"></rect><circle cx="12" cy="10" r="2.5"></circle></svg>',
    visa: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="12" height="16" rx="1.5"></rect><circle cx="17" cy="16" r="4"></circle></svg>',
    carte_consulaire: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="6" width="19" height="13" rx="2"></rect><circle cx="8" cy="12.2" r="2.1"></circle></svg>',
    etat_civil: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8.5" r="4.5"></circle><path d="M9 12.5l-1.5 7 4.5-2.5 4.5 2.5-1.5-7"></path></svg>',
    legalisation: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 14h6l1.5 5h-9z"></path><path d="M10 14V9a2 2 0 0 1 4 0v5"></path></svg>',
    autre: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a1.5 1.5 0 0 1 1.5-1.5h4l1.5 2h9A1.5 1.5 0 0 1 20.5 9v8A1.5 1.5 0 0 1 19 18.5H4.5A1.5 1.5 0 0 1 3 17z"></path></svg>',
  };
  const SERVICE_LABEL_KEYS = {
    passeport: 'srv.passport', visa: 'srv.visa', carte_consulaire: 'srv.badge.cc',
    etat_civil: 'srv.civil', legalisation: 'srv.legal', autre: 'rdv.svc.other',
  };
  const DOCS_KEYS = {
    passeport: ['psrv.pass.li.old', 'psrv.pass.li.photos.rec', 'psrv.pass.li.resid', 'psrv.li.form'],
    visa: ['psrv.visa.li.pass6m', 'psrv.visa.li.form', 'psrv.visa.li.lodging', 'psrv.visa.li.insur'],
    carte_consulaire: ['cc.docs.li1', 'cc.docs.li2', 'cc.docs.li3', 'cc.docs.li4'],
    etat_civil: ['psrv.civil.docs.li1', 'psrv.civil.docs.li2', 'psrv.civil.docs.li3'],
    legalisation: ['psrv.legal.li.id', 'psrv.legal.li.form', 'psrv.legal.ivo.li1'],
    autre: ['psrv.civil.docs.li1', 'psrv.civil.docs.li2', 'psrv.civil.docs.li3'],
  };
  const DAY_KEYS = ['day.mon', 'day.tue', 'day.wed', 'day.thu', 'day.fri', 'day.sat', 'day.sun'];
  const MONTH_KEYS = ['month.jan','month.feb','month.mar','month.apr','month.may','month.jun','month.jul','month.aug','month.sep','month.oct','month.nov','month.dec'];

  const API_BASE = (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform())
    ? 'https://ambacivienna.kouassij019.workers.dev' : '';

  function lang() { return document.documentElement.lang || 'fr'; }
  function t(key) {
    const dict = typeof translations !== 'undefined' && translations[lang()];
    return (dict && dict[key]) || key;
  }

  const state = {
    step: 1,
    service: null,
    dossierToken: null,
    date: null,
    time: null,
    monthCursor: (function () { const d = new Date(); return { y: d.getFullYear(), m: d.getMonth() + 1 }; })(),
  };

  const els = {};
  function cacheEls() {
    ['rdv-step-1','rdv-step-2','rdv-step-3','rdv-step-4','rdv-stepper',
     'rdv-cal-grid','rdv-cal-month-label','rdv-cal-prev','rdv-cal-next',
     'rdv-selected-ic','rdv-selected-label','rdv-back-to-1','rdv-back-to-2',
     'rdv-date-line','rdv-slots-container','rdv-step2-continue','rdv-step2-back','rdv-step3-back',
     'rdv-docs-service','rdv-docs-list','rdv-docs-confirm','rdv-form','rdv-form-error','rdv-submit-btn',
     'rdv-sum-service','rdv-sum-date','rdv-sum-time',
     'rdv-c-service','rdv-c-date','rdv-c-time','rdv-c-ref','rdv-add-cal'].forEach((id) => {
      els[id] = document.getElementById(id);
    });
  }

  function goToStep(n) {
    state.step = n;
    for (let i = 1; i <= 4; i++) {
      const sec = document.getElementById('rdv-step-' + i);
      if (sec) sec.hidden = i !== n;
    }
    document.querySelectorAll('#rdv-stepper .rdv-step-item').forEach((item) => {
      const s = Number(item.dataset.step);
      item.classList.toggle('is-active', s === n);
      item.classList.toggle('is-done', s < n);
    });
    window.scrollTo({ top: document.querySelector('.rdv-stepper-wrap').offsetTop - 90, behavior: 'smooth' });
  }

  function initStepperNav() {
    els['rdv-stepper'].addEventListener('click', (e) => {
      if (state.step === 4) return; // no editing after a booking is confirmed
      const item = e.target.closest('.rdv-step-item');
      if (!item || !item.classList.contains('is-done')) return;
      goToStep(Number(item.dataset.step));
    });
  }

  // --- Dossier gate ---
  // Every kind of appointment needs a dossier validated by the consular service
  // (only when the dossier feature is switched on on the server).
  let gateCfg = null;
  async function dossierGate(service) {
    const D = window.AmbaciDossier;
    if (!D) return { ok: true };
    const cfg = await D.config();
    gateCfg = cfg;
    if (!cfg.enabled || !cfg.bookingNeedsDossier || !cfg.bookingNeedsDossier[service]) return { ok: true };
    const stored = D.getStored();
    if (!stored || !stored.token) return { ok: false, reason: 'none' };
    let d;
    try { d = await D.me(stored.token); } catch (r) {
      if (r && r.status === 401) D.clearStored();
      return { ok: false, reason: 'none' };
    }
    if (cfg.bookingNeedsDossier[service].indexOf(d.service) === -1) return { ok: false, reason: 'other' };
    if (d.bookingReference) return { ok: false, reason: 'booked' };
    if (d.status === 'validated' && d.canBook) return { ok: true, token: stored.token, dossier: d };
    return { ok: false, reason: d.status }; // draft | submitted | needs_fix
  }

  function clearGate() {
    const box = document.getElementById('rdv-gate');
    if (box) box.remove();
  }

  function renderGate(gate, service) {
    const D = window.AmbaciDossier;
    D.loadCss();
    let box = document.getElementById('rdv-gate');
    if (!box) {
      box = document.createElement('div');
      box.id = 'rdv-gate';
      box.className = 'dos-gate';
      box.setAttribute('role', 'status');
      document.querySelector('#rdv-step-1 .rdv-svc-grid').insertAdjacentElement('afterend', box);
    }
    const messages = { none: 'gate.text', other: 'gate.other', booked: 'gate.booked', draft: 'gate.draft', submitted: 'gate.pending', needs_fix: 'gate.fix' };
    const start = gate.reason === 'none' || gate.reason === 'other';
    const need = (gateCfg && gateCfg.bookingNeedsDossier && gateCfg.bookingNeedsDossier[service]) || [];
    const svc = service === 'passeport' ? 'passeport_renouvellement' : need[0];
    const href = start ? 'dossier.html?service=' + encodeURIComponent(svc) : 'dossier.html';
    box.innerHTML = '<b>' + D.esc(D.tr('gate.title')) + '</b><p>' + D.esc(D.tr(messages[gate.reason] || 'gate.text')) + '</p>' +
      '<div><a class="btn btn-primary" href="' + href + '">' + D.esc(D.tr(start ? 'gate.cta' : 'gate.open')) + '</a></div>';
    box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function prefillFromDossier(d) {
    const form = els['rdv-form'];
    if (!form || !d) return;
    [['firstName', d.firstName], ['lastName', d.lastName], ['email', d.email]].forEach(([name, value]) => {
      const input = form.elements[name];
      if (input && !input.value && value) input.value = value;
    });
  }

  // --- Step 1 ---
  function initStep1() {
    document.querySelectorAll('#rdv-step-1 .rdv-svc-card').forEach((card) => {
      card.addEventListener('click', async () => {
        const service = card.dataset.service;
        const gate = await dossierGate(service);
        if (!gate.ok) { renderGate(gate, service); return; }
        clearGate();
        state.service = service;
        state.dossierToken = gate.token || null;
        prefillFromDossier(gate.dossier);
        renderSelectedServiceBadge();
        renderDocsBox();
        goToStep(2);
        loadMonth();
      });
    });
  }

  function renderSelectedServiceBadge() {
    els['rdv-selected-ic'].innerHTML = SERVICE_ICONS[state.service] || '';
    els['rdv-selected-label'].textContent = t(SERVICE_LABEL_KEYS[state.service]);
  }

  function renderDocsBox() {
    els['rdv-docs-service'].textContent = t(SERVICE_LABEL_KEYS[state.service]);
    const keys = DOCS_KEYS[state.service] || [];
    els['rdv-docs-list'].innerHTML = keys.map((k) => `<li>${t(k)}</li>`).join('');
  }

  // --- Step 2 : calendar + slots ---
  async function loadMonth() {
    const monthStr = `${state.monthCursor.y}-${String(state.monthCursor.m).padStart(2, '0')}`;
    els['rdv-cal-month-label'].textContent = `${t(MONTH_KEYS[state.monthCursor.m - 1])} ${state.monthCursor.y}`;
    els['rdv-cal-grid'].innerHTML = '<p class="rdv-hint">' + t('rdv.s2.loading') + '</p>';
    try {
      const res = await fetch(`${API_BASE}/api/availability?month=${monthStr}`);
      const data = await res.json();
      renderCalendar(data.days || []);
    } catch (e) {
      els['rdv-cal-grid'].innerHTML = '<p class="rdv-hint">' + t('rdv.err.generic') + '</p>';
    }
  }

  function renderCalendar(days) {
    const grid = els['rdv-cal-grid'];
    grid.innerHTML = '';
    DAY_KEYS.forEach((k) => {
      const el = document.createElement('div');
      el.className = 'rdv-cal-dow';
      el.textContent = t(k).slice(0, 2);
      grid.appendChild(el);
    });
    if (!days.length) return;
    const first = new Date(days[0].date + 'T00:00:00Z');
    let leading = first.getUTCDay() - 1; // Monday = 0
    if (leading < 0) leading = 6;
    for (let i = 0; i < leading; i++) {
      const el = document.createElement('div');
      el.className = 'rdv-cal-day is-muted';
      grid.appendChild(el);
    }
    days.forEach((d) => {
      const el = document.createElement('button');
      el.type = 'button';
      el.className = 'rdv-cal-day ' + (d.date === state.date ? 'is-selected' : (d.available ? 'is-avail' : 'is-closed'));
      el.textContent = String(Number(d.date.slice(-2)));
      if (d.available) {
        el.addEventListener('click', () => selectDate(d.date));
      } else {
        el.disabled = true;
      }
      grid.appendChild(el);
    });
  }

  function formatDateLabel(dateStr) {
    const d = new Date(dateStr + 'T00:00:00Z');
    const dow = t(DAY_KEYS[(d.getUTCDay() + 6) % 7]);
    const month = t(MONTH_KEYS[d.getUTCMonth()]);
    return `${dow} ${d.getUTCDate()} ${month} ${d.getUTCFullYear()}`;
  }

  async function selectDate(dateStr) {
    state.date = dateStr;
    state.time = null;
    document.querySelectorAll('.rdv-cal-day').forEach((el) => el.classList.remove('is-selected'));
    els['rdv-date-line'].textContent = formatDateLabel(dateStr);
    els['rdv-slots-container'].innerHTML = '<p class="rdv-hint">' + t('rdv.s2.loading') + '</p>';
    els['rdv-step2-continue'].disabled = true;
    renderCalendar((await (await fetch(`${API_BASE}/api/availability?month=${state.monthCursor.y}-${String(state.monthCursor.m).padStart(2,'0')}`)).json()).days || []);

    try {
      const res = await fetch(`${API_BASE}/api/availability?date=${dateStr}`);
      const data = await res.json();
      renderSlots(data.slots || []);
    } catch (e) {
      els['rdv-slots-container'].innerHTML = '<p class="rdv-hint">' + t('rdv.err.generic') + '</p>';
    }
  }

  function renderSlots(slots) {
    if (!slots.length) {
      els['rdv-slots-container'].innerHTML = '<p class="rdv-hint">' + t('rdv.s2.slots.none') + '</p>';
      return;
    }
    const grid = document.createElement('div');
    grid.className = 'rdv-slot-grid';
    slots.forEach((s) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'rdv-slot ' + (s.available ? 'is-avail' : 'is-booked');
      btn.textContent = s.time;
      if (s.available) {
        btn.addEventListener('click', () => {
          state.time = s.time;
          grid.querySelectorAll('.rdv-slot').forEach((b) => b.classList.remove('is-selected'));
          btn.classList.add('is-selected');
          els['rdv-step2-continue'].disabled = false;
        });
      } else {
        btn.disabled = true;
      }
      grid.appendChild(btn);
    });
    els['rdv-slots-container'].innerHTML = '';
    els['rdv-slots-container'].appendChild(grid);
  }

  function initStep2() {
    els['rdv-cal-prev'].addEventListener('click', () => {
      state.monthCursor.m--;
      if (state.monthCursor.m < 1) { state.monthCursor.m = 12; state.monthCursor.y--; }
      loadMonth();
    });
    els['rdv-cal-next'].addEventListener('click', () => {
      state.monthCursor.m++;
      if (state.monthCursor.m > 12) { state.monthCursor.m = 1; state.monthCursor.y++; }
      loadMonth();
    });
    els['rdv-back-to-1'].addEventListener('click', (e) => { e.preventDefault(); goToStep(1); });
    els['rdv-step2-back'].addEventListener('click', () => goToStep(1));
    els['rdv-step2-continue'].addEventListener('click', () => {
      if (!state.date || !state.time) return;
      renderSelectedServiceBadge();
      renderDocsBox();
      els['rdv-sum-service'].textContent = t(SERVICE_LABEL_KEYS[state.service]);
      els['rdv-sum-date'].textContent = formatDateLabel(state.date);
      els['rdv-sum-time'].textContent = state.time;
      goToStep(3);
    });
  }

  // --- Step 3 : form submission ---
  function initStep3() {
    els['rdv-back-to-2'].addEventListener('click', (e) => { e.preventDefault(); goToStep(2); });
    els['rdv-step3-back'].addEventListener('click', () => goToStep(2));

    els['rdv-form'].addEventListener('submit', async (e) => {
      e.preventDefault();
      els['rdv-form-error'].hidden = true;
      const form = els['rdv-form'];
      if (!form.checkValidity()) { form.reportValidity(); return; }
      if (!els['rdv-docs-confirm'].checked) {
        els['rdv-form-error'].textContent = t('rdv.s3.error.checkbox');
        els['rdv-form-error'].hidden = false;
        return;
      }

      const fd = new FormData(form);
      const payload = {
        service: state.service,
        date: state.date,
        time: state.time,
        firstName: fd.get('firstName'),
        lastName: fd.get('lastName'),
        email: fd.get('email'),
        phone: fd.get('phone'),
        country: fd.get('country'),
        dossierToken: state.dossierToken || undefined,
      };

      state.holder = `${String(fd.get('lastName') || '').trim().toUpperCase()} ${String(fd.get('firstName') || '').trim()}`.trim();

      els['rdv-submit-btn'].disabled = true;
      els['rdv-submit-btn'].textContent = t('rdv.submitting');

      try {
        const res = await fetch(`${API_BASE}/api/bookings`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) {
          const dossierError = typeof data.error === 'string' && data.error.indexOf('dossier_') === 0 && window.AmbaciDossier;
          els['rdv-form-error'].textContent = (data.error === 'slot_taken' || data.error === 'day_full') ? t('rdv.err.slot_taken')
            : dossierError ? window.AmbaciDossier.tr('gate.text') : t('rdv.err.generic');
          els['rdv-form-error'].hidden = false;
          els['rdv-submit-btn'].disabled = false;
          els['rdv-submit-btn'].textContent = t('rdv.s3.submit');
          return;
        }
        showConfirmation(data);
      } catch (err) {
        els['rdv-form-error'].textContent = t('rdv.err.generic');
        els['rdv-form-error'].hidden = false;
        els['rdv-submit-btn'].disabled = false;
        els['rdv-submit-btn'].textContent = t('rdv.s3.submit');
      }
    });
  }

  // --- Step 4 : confirmation ---
  function showConfirmation(data) {
    els['rdv-c-service'].textContent = t(SERVICE_LABEL_KEYS[state.service]);
    els['rdv-c-date'].textContent = formatDateLabel(state.date);
    els['rdv-c-time'].textContent = state.time;
    els['rdv-c-ref'].textContent = data.reference;
    state.lastBooking = data;
    buildTicket(data);
    armLeaveGuard();
    goToStep(4);
  }

  // --- Printable ticket + "print before leaving" guard ---
  const isNativeApp = () => !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform());
  const guard = { active: false, printed: false, href: null };

  function qrSvg(text) {
    try {
      const qr = window.AmbaciQR.create(text, { errorCorrectionLevel: 'M' });
      const n = qr.modules.size, d = qr.modules.data;
      let path = '';
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (d[y * n + x]) path += `M${x + 2} ${y + 2}h1v1h-1z`;
      return `<svg viewBox="0 0 ${n + 4} ${n + 4}" shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#fff"/><path d="${path}" fill="#1a1a1a"/></svg>`;
    } catch (e) {
      return '';
    }
  }

  function buildTicket(data) {
    const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    set('tk-date', formatDateLabel(state.date));
    set('tk-time', state.time);
    set('tk-ref', data.reference);
    set('tk-service', t(SERVICE_LABEL_KEYS[state.service]));
    set('tk-holder', state.holder || '');
    const qr = document.getElementById('tk-qr');
    if (qr) qr.innerHTML = qrSvg(data.reference);
    // Printing shows only this element: it must sit directly under <body>.
    const tk = document.getElementById('rdv-ticket');
    if (tk && tk.parentNode !== document.body) document.body.appendChild(tk);
  }

  function printTicket() {
    document.body.classList.add('is-ticket-print');
    window.addEventListener('afterprint', () => document.body.classList.remove('is-ticket-print'), { once: true });
    markPrinted();
    setTimeout(() => window.print(), 60);
  }

  function markPrinted() {
    guard.printed = true;
    const warn = document.getElementById('rdv-print-warn');
    if (warn) warn.classList.add('is-done');
    const home = document.getElementById('rdv-home');
    if (home) home.classList.remove('is-locked');
  }

  function showLeaveModal(show) {
    const m = document.getElementById('rdv-leave');
    if (m) m.hidden = !show;
  }

  function armLeaveGuard() {
    const printBtn = document.getElementById('rdv-print');
    const warn = document.getElementById('rdv-print-warn');
    // The phone app has no print dialog: the ticket is not offered there.
    if (isNativeApp()) {
      if (printBtn) printBtn.hidden = true;
      if (warn) warn.hidden = true;
      return;
    }
    guard.active = true;
    guard.printed = false;
    if (warn) warn.classList.remove('is-done');
    const home = document.getElementById('rdv-home');
    if (home) home.classList.add('is-locked');
  }

  function initTicket() {
    const printBtn = document.getElementById('rdv-print');
    if (printBtn) printBtn.addEventListener('click', printTicket);
    const leavePrint = document.getElementById('rdv-leave-print');
    if (leavePrint) leavePrint.addEventListener('click', () => { showLeaveModal(false); printTicket(); });
    const leaveGo = document.getElementById('rdv-leave-go');
    if (leaveGo) leaveGo.addEventListener('click', () => {
      guard.active = false;
      showLeaveModal(false);
      if (guard.href) window.location.href = guard.href;
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') showLeaveModal(false); });

    // Refresh / close tab / typed address: the browser asks for confirmation (its own wording).
    window.addEventListener('beforeunload', (e) => {
      if (guard.active && !guard.printed) { e.preventDefault(); e.returnValue = ''; }
    });
    // Clicks on links of the site: our own reminder, with a print button.
    document.addEventListener('click', (e) => {
      if (!guard.active || guard.printed) return;
      const a = e.target.closest && e.target.closest('a[href]');
      if (!a || a.target === '_blank') return;
      const href = a.getAttribute('href') || '';
      if (!href || href.charAt(0) === '#' || /^(javascript:|mailto:|tel:)/i.test(href)) return;
      e.preventDefault();
      guard.href = a.href;
      showLeaveModal(true);
    }, true);
  }

  function pad(n) { return String(n).padStart(2, '0'); }

  function initStep4() {
    els['rdv-add-cal'].addEventListener('click', () => {
      const b = state.lastBooking;
      if (!b) return;
      const start = new Date(`${b.date}T${b.time}:00`);
      const end = new Date(start.getTime() + 30 * 60000);
      const fmt = (d) => `${d.getUTCFullYear()}${pad(d.getUTCMonth()+1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;
      const ics = [
        'BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//AMBACI VIENNA//Rendez-vous//FR','BEGIN:VEVENT',
        `UID:${b.reference}@ambaci-vienne.ci`,
        `DTSTAMP:${fmt(new Date())}`,
        `DTSTART:${fmt(start)}`,
        `DTEND:${fmt(end)}`,
        `SUMMARY:${t(SERVICE_LABEL_KEYS[state.service])} — Ambassade de Côte d'Ivoire`,
        `DESCRIPTION:Référence ${b.reference}`,
        'LOCATION:Michael-Neumann-Gasse 2\\, 1190 Wien',
        'END:VEVENT','END:VCALENDAR',
      ].join('\r\n');
      const blob = new Blob([ics], { type: 'text/calendar' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `rdv-${b.reference}.ics`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    cacheEls();
    initStep1();
    initStep2();
    initStep3();
    initStep4();
    initTicket();
    initStepperNav();
  });

  document.addEventListener('langchange', () => {
    if (state.service) {
      renderSelectedServiceBadge();
      renderDocsBox();
    }
  });
})();
