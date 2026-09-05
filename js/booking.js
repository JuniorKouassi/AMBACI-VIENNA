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
    date: null,
    time: null,
    monthCursor: (function () { const d = new Date(); return { y: d.getFullYear(), m: d.getMonth() + 1 }; })(),
  };

  const els = {};
  function cacheEls() {
    ['rdv-step-1','rdv-step-2','rdv-step-3','rdv-step-4','rdv-stepper',
     'rdv-cal-grid','rdv-cal-month-label','rdv-cal-prev','rdv-cal-next',
     'rdv-selected-ic','rdv-selected-label','rdv-back-to-1','rdv-back-to-2',
     'rdv-date-line','rdv-slots-container','rdv-step2-continue',
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

  // --- Step 1 ---
  function initStep1() {
    document.querySelectorAll('#rdv-step-1 .service-card').forEach((card) => {
      card.addEventListener('click', () => {
        state.service = card.dataset.service;
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
      };

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
          els['rdv-form-error'].textContent = data.error === 'slot_taken' ? t('rdv.err.slot_taken') : t('rdv.err.generic');
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
    goToStep(4);
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
  });

  document.addEventListener('langchange', () => {
    if (state.service) {
      renderSelectedServiceBadge();
      renderDocsBox();
    }
  });
})();
