/* ============================================================
   dossier.html — start a dossier, add the documents, follow the review.
   ============================================================ */
(function () {
  var D = window.AmbaciDossier;
  if (!D) return;
  var tr = D.tr, esc = D.esc;
  var root = document.getElementById('dossier-app');
  var params = new URLSearchParams(location.search);
  var TOUCH = ('ontouchstart' in window) || (navigator.maxTouchPoints || 0) > 0;

  var S = {
    cfg: null, token: null, dossier: null, view: 'loading',
    form: { service: params.get('service') || '', firstName: '', lastName: '', email: '', phone: '', country: '', consent: false },
    recover: { reference: '', email: '' },
    error: '', info: '', recoverEmailOff: false,
    busyDoc: null, docError: {}, submitting: false, copied: false
  };

  function svcLabel(key) { var s = S.cfg && S.cfg.services[key]; return s ? D.pick(s.label) : key; }
  function errText(r) {
    var code = r && r.body && r.body.error;
    if (r && r.status === 413) code = 'file_too_large';
    var key = 'err.' + code;
    var txt = tr(key);
    return txt === key ? tr('err.generic') : txt;
  }
  function personalLink() { return (D.API_BASE || location.origin) + '/dossier.html#t=' + S.token; }

  // ---------- rendering ----------

  function render() {
    var h1 = document.getElementById('dos-h1'), lead = document.getElementById('dos-lead'), crumb = document.getElementById('dos-crumb');
    if (h1) h1.textContent = tr('page.title');
    if (crumb) crumb.textContent = tr('page.title');
    document.title = tr('page.title') + ' — Ambassade de Côte d’Ivoire';
    if (lead) lead.textContent = tr('page.lead');
    var y = window.scrollY;
    if (S.view === 'loading') root.innerHTML = '<div class="dos-card">' + esc(tr('loading')) + '</div>';
    else if (S.view === 'disabled') root.innerHTML = '<div class="dos-card"><p>' + esc(tr('disabled')) + '</p><p><a class="btn btn-primary" href="rendez-vous.html">' + esc(document.querySelector('[data-i18n="rdv.badge"]') ? document.querySelector('[data-i18n="rdv.badge"]').textContent : 'Rendez-vous') + '</a></p></div>';
    else if (S.view === 'start') root.innerHTML = startView();
    else if (S.view === 'recover') root.innerHTML = recoverView();
    else root.innerHTML = dossierView();
    window.scrollTo(0, y);
  }

  function startView() {
    var f = S.form, svcs = S.cfg.services;
    if (!svcs[f.service]) f.service = Object.keys(svcs)[0];
    // Services are grouped by kind of appointment (passport, consular card, visa, civil status, legalisation, other).
    var groups = ['passeport', 'carte_consulaire', 'visa', 'etat_civil', 'legalisation', 'autre'];
    var opts = groups.map(function (g) {
      var keys = Object.keys(svcs).filter(function (k) { return svcs[k].booking === g; });
      if (!keys.length) return '';
      return '<optgroup label="' + esc(tr('grp.' + g)) + '">' + keys.map(function (k) {
        return '<option value="' + esc(k) + '"' + (k === f.service ? ' selected' : '') + '>' + esc(D.pick(svcs[k].label)) + '</option>';
      }).join('') + '</optgroup>';
    }).join('');
    var current = S.dossier ? '<div class="dos-banner wait"><span>' + esc(tr('start.current', { ref: S.dossier.reference })) + '</span> <button type="button" class="dos-btn-link" data-act="open-current">' + esc(tr('start.open')) + '</button></div>' : '';
    return current +
      '<form class="dos-card dos-form" id="start-form" novalidate>' +
      '<h2>' + esc(tr('start.title')) + '</h2>' +
      field('service', tr('start.service'), '<select id="f-service" name="service" data-form="service">' + opts + '</select>') +
      '<div class="dos-grid2">' + input('firstName', 'start.firstName', 'text', 'given-name') + input('lastName', 'start.lastName', 'text', 'family-name') + '</div>' +
      '<div class="dos-grid2">' + input('email', 'start.email', 'email', 'email') + input('phone', 'start.phone', 'tel', 'tel') + '</div>' +
      input('country', 'start.country', 'text', 'country-name') +
      '<div class="dos-hp" aria-hidden="true"><label>Website <input type="text" id="f-website" tabindex="-1" autocomplete="off"></label></div>' +
      '<label class="dos-check"><input type="checkbox" id="f-consent" data-form="consent"' + (f.consent ? ' checked' : '') + '><span>' + esc(tr('start.consent')) + '</span></label>' +
      (S.error ? '<div class="dos-error" role="alert">' + esc(S.error) + '</div>' : '') +
      '<div class="dos-actions"><button type="submit" class="btn btn-primary"' + (S.submitting ? ' disabled' : '') + '>' + esc(tr('start.submit')) + '</button>' +
      '<button type="button" class="dos-btn-link" data-act="go-recover">' + esc(tr('start.have')) + '</button></div>' +
      '</form>' + privacyCard();
  }
  function field(id, label, control) { return '<div class="dos-field"><label for="f-' + id + '">' + esc(label) + '</label>' + control + '</div>'; }
  function input(name, labelKey, type, auto) {
    return field(name, tr(labelKey), '<input id="f-' + name + '" name="' + name + '" type="' + type + '" autocomplete="' + auto + '" data-form="' + name + '" value="' + esc(S.form[name]) + '">');
  }

  function recoverView() {
    return '<form class="dos-card dos-form" id="recover-form" novalidate>' +
      '<h2>' + esc(tr('recover.title')) + '</h2><p class="dos-muted">' + esc(tr('recover.text')) + '</p>' +
      field('rref', tr('recover.ref'), '<input id="f-rref" type="text" data-rec="reference" autocomplete="off" value="' + esc(S.recover.reference) + '" placeholder="DOS-2026-XXXXXX">') +
      field('remail', tr('recover.email'), '<input id="f-remail" type="email" data-rec="email" autocomplete="email" value="' + esc(S.recover.email) + '">') +
      (S.info ? '<div class="dos-ok" role="status">' + esc(S.info) + '</div>' : '') +
      (S.error ? '<div class="dos-error" role="alert">' + esc(S.error) + '</div>' : '') +
      '<div class="dos-actions"><button type="submit" class="btn btn-primary"' + (S.submitting ? ' disabled' : '') + '>' + esc(tr('recover.submit')) + '</button>' +
      '<button type="button" class="dos-btn-link" data-act="go-start">' + esc(tr('recover.back')) + '</button></div></form>';
  }

  function privacyCard() {
    return '<div class="dos-card"><h2>' + esc(tr('privacy.title')) + '</h2><p class="dos-muted">' + esc(tr('privacy.text')) + ' ' + esc(tr('note.original')) + '</p></div>';
  }

  function editable(d, doc) {
    if (d.status === 'draft') return doc.status !== 'validated';
    if (d.status === 'needs_fix') return doc.status === 'needs_fix' || doc.status === 'missing';
    return false;
  }

  function dossierView() {
    var d = S.dossier, svc = S.cfg.services[d.service];
    var defs = {}; (svc ? svc.docs : []).forEach(function (x) { defs[x.key] = x; });
    var html = '<div class="dos-card"><div class="dos-head"><div><h2>' + esc(svcLabel(d.service)) + '</h2><div class="dos-muted">' + esc(d.reference) + '</div></div>' +
      '<span class="dos-pill ' + esc(d.status) + '">' + esc(tr('status.' + d.status)) + '</span></div></div>';

    if (d.status === 'submitted') html += '<div class="dos-banner wait"><b>' + esc(tr('sent.title')) + '</b><span>' + esc(tr('sent.text', { ref: d.reference })) + '</span></div>';
    if (d.status === 'needs_fix') html += '<div class="dos-banner fix"><b>' + esc(tr('fix.title')) + '</b><span>' + esc(tr('fix.text')) + '</span></div>';
    if (d.status === 'validated' && d.canBook) html += '<div class="dos-banner good"><b>' + esc(tr('ok.title')) + '</b><span>' + esc(tr('ok.text')) + '</span><span><a class="btn btn-primary" href="rendez-vous.html">' + esc(tr('ok.cta')) + '</a></span></div>';
    if (d.status === 'validated' && d.bookingReference) html += '<div class="dos-banner good"><b>' + esc(tr('booked.title')) + '</b><span>' + esc(tr('booked.text', { ref: d.bookingReference })) + '</span></div>';

    var canEdit = d.status === 'draft' || d.status === 'needs_fix';
    html += '<div class="dos-docs">' + d.docs.map(function (doc) { return docView(d, doc, defs[doc.key] || {}); }).join('') + '</div>';

    if (canEdit) {
      var req = d.docs.filter(function (x) { return (defs[x.key] || {}).required; });
      var done = req.filter(function (x) { return x.status === 'received' || x.status === 'validated'; }).length;
      var ready = done === req.length;
      html += '<div class="dos-card dos-form"><div class="dos-progress"><i style="width:' + Math.round(done / Math.max(req.length, 1) * 100) + '%"></i></div>' +
        '<div class="dos-muted">' + esc(tr('progress', { n: done, m: req.length })) + '</div>' +
        (S.error ? '<div class="dos-error" role="alert">' + esc(S.error) + '</div>' : '') +
        '<div class="dos-actions"><button type="button" class="btn btn-primary" data-act="submit"' + (ready && !S.submitting ? '' : ' disabled') + '>' + esc(tr('submit')) + '</button>' +
        (ready ? '' : '<span class="dos-muted">' + esc(tr('submit.hint')) + '</span>') + '</div></div>';
    }

    html += '<div class="dos-card dos-linkbox"><h2>' + esc(tr('link.title')) + '</h2><p class="dos-muted">' + esc(tr('link.text')) + '</p>' +
      '<code id="dos-link">' + esc(personalLink()) + '</code>' +
      '<div class="dos-actions"><button type="button" class="btn btn-outline" data-act="copy">' + esc(S.copied ? tr('link.copied') : tr('link.copy')) + '</button>' +
      '<button type="button" class="dos-btn-link" data-act="forget">' + esc(tr('forget')) + '</button></div></div>' + privacyCard();
    return html;
  }

  function docView(d, doc, def) {
    var label = D.pick(def.label), hint = D.pick(def.hint);
    var can = editable(d, doc);
    var cls = 'dos-doc' + (doc.status === 'needs_fix' ? ' is-fix' : doc.status === 'validated' ? ' is-ok' : '');
    var files = doc.files.length ? '<ul class="dos-files">' + doc.files.map(function (f) {
      return '<li><span>' + esc(f.name || 'document') + '</span><span class="dos-muted">' + esc(sizeText(f.size)) + '</span>' +
        (can ? '<button type="button" class="dos-btn-link" data-act="remove" data-file="' + f.id + '">' + esc(tr('doc.remove')) + '</button>' : '') + '</li>';
    }).join('') + '</ul>' : '';
    var controls = '';
    if (can) {
      var k = esc(doc.key);
      controls = (S.busyDoc === doc.key ? '<div class="dos-muted">' + esc(tr('doc.uploading')) + '</div>' : '') +
        '<div class="dos-add">' +
        (TOUCH ? '<button type="button" class="btn btn-primary" data-act="pick" data-kind="camera" data-doc="' + k + '">' + esc(tr('doc.take')) + '</button>' : '') +
        '<button type="button" class="btn ' + (TOUCH ? 'btn-outline' : 'btn-primary') + '" data-act="pick" data-kind="photo" data-doc="' + k + '">' + esc(tr('doc.pick')) + '</button>' +
        '<button type="button" class="btn btn-outline" data-act="pick" data-kind="pdf" data-doc="' + k + '">' + esc(tr('doc.pdf')) + '</button></div>' +
        '<div class="dos-hintline">' + esc(tr('doc.formats')) + (TOUCH ? '' : ' · ' + esc(tr('doc.drop'))) + '</div>' +
        '<input type="file" hidden data-kind="camera" data-doc="' + k + '" accept="image/*" capture="environment">' +
        '<input type="file" hidden multiple data-kind="photo" data-doc="' + k + '" accept="image/jpeg,image/png,image/*">' +
        '<input type="file" hidden multiple data-kind="pdf" data-doc="' + k + '" accept="application/pdf">';
    }
    return '<div class="' + cls + (S.busyDoc === doc.key ? ' dos-busy' : '') + '" data-doc="' + esc(doc.key) + '"' + (can ? ' data-editable="1"' : '') + '>' +
      '<div class="dos-doc-top"><div><b>' + esc(label) + '</b> <span class="dos-pill ' + esc(doc.status) + '">' + esc(tr('doc.' + doc.status)) + '</span>' +
      '<div class="dos-doc-hint">' + (hint ? esc(hint) + ' · ' : '') + esc(def.required ? tr('doc.required') : tr('doc.optional')) + '</div></div></div>' +
      (doc.status === 'needs_fix' && doc.comment ? '<div class="dos-doc-why">' + esc(tr('doc.fixwhy', { why: doc.comment })) + '</div>' : '') +
      (S.docError[doc.key] ? '<div class="dos-error" role="alert">' + esc(S.docError[doc.key]) + '</div>' : '') +
      files + controls + '</div>';
  }

  function sizeText(n) { return n > 1048576 ? (n / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(n / 1024)) + ' KB'; }

  // ---------- data ----------

  async function reload() {
    try {
      S.dossier = await D.me(S.token);
      D.setStored({ token: S.token, reference: S.dossier.reference, service: S.dossier.service });
    } catch (r) {
      if (r && r.status === 401) { D.clearStored(); S.dossier = null; S.token = null; S.view = 'start'; S.error = tr('err.invalid_token'); }
    }
    render();
  }

  // Shrinks big photos before sending: a phone photo of a document is often 5–10 MB.
  function prepare(file) {
    return new Promise(function (resolve) {
      if (!/^image\//.test(file.type)) return resolve(file);
      var url = URL.createObjectURL(file), img = new Image();
      img.onload = function () {
        URL.revokeObjectURL(url);
        var max = 2400, w = img.naturalWidth, h = img.naturalHeight, scale = Math.min(1, max / Math.max(w, h));
        if (scale === 1 && file.size <= 2 * 1048576 && /^image\/(jpeg|png)$/.test(file.type)) return resolve(file);
        try {
          var c = document.createElement('canvas');
          c.width = Math.round(w * scale); c.height = Math.round(h * scale);
          var ctx = c.getContext('2d'); ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, c.width, c.height); ctx.drawImage(img, 0, 0, c.width, c.height);
          c.toBlob(function (b) {
            if (!b) return resolve(file);
            var name = (file.name || 'photo').replace(/\.[^.]+$/, '') + '.jpg';
            try { resolve(new File([b], name, { type: 'image/jpeg' })); } catch (e) { b.name = name; resolve(b); }
          }, 'image/jpeg', 0.85);
        } catch (e) { resolve(file); }
      };
      img.onerror = function () { URL.revokeObjectURL(url); resolve(file); };
      img.src = url;
    });
  }

  async function addFiles(docKey, list) {
    var files = Array.prototype.slice.call(list || []);
    if (!files.length) return;
    S.busyDoc = docKey; S.docError[docKey] = ''; S.error = ''; render();
    for (var i = 0; i < files.length; i++) {
      var f = await prepare(files[i]);
      var fd = new FormData();
      fd.append('doc_key', docKey);
      fd.append('file', f, f.name || 'document');
      var r;
      try { r = await D.api('/api/dossiers/files', { method: 'POST', body: fd }, S.token); }
      catch (e) { r = { ok: false, status: 0, body: {} }; }
      if (!r.ok) { S.docError[docKey] = errText(r); break; }
    }
    S.busyDoc = null;
    await reload();
  }

  async function removeFile(id) {
    var r = await D.api('/api/dossiers/files/' + id, { method: 'DELETE' }, S.token).catch(function () { return { ok: false, body: {} }; });
    if (!r.ok) S.error = errText(r);
    await reload();
  }

  async function submitDossier() {
    S.submitting = true; S.error = ''; render();
    var r = await D.api('/api/dossiers/submit', { method: 'POST' }, S.token).catch(function () { return { ok: false, body: {} }; });
    S.submitting = false;
    if (r.ok) { S.dossier = r.body; window.scrollTo(0, 0); render(); } else { S.error = errText(r); render(); }
  }

  async function startDossier() {
    var f = S.form;
    S.error = '';
    if (!f.firstName.trim() || !f.lastName.trim()) { S.error = tr('err.missing_name'); return render(); }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) { S.error = tr('err.invalid_email'); return render(); }
    if (f.phone.trim().length < 5) { S.error = tr('err.invalid_phone'); return render(); }
    if (!f.consent) { S.error = tr('err.consent_required'); return render(); }
    S.submitting = true; render();
    var w = document.getElementById('f-website');
    var r = await D.api('/api/dossiers', {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ service: f.service, firstName: f.firstName, lastName: f.lastName, email: f.email, phone: f.phone, country: f.country, lang: D.lang(), consent: true, website: w ? w.value : '' })
    }, 'none').catch(function () { return { ok: false, body: {} }; });
    S.submitting = false;
    if (!r.ok) { S.error = errText(r); return render(); }
    S.token = r.body.token;
    D.setStored({ token: r.body.token, reference: r.body.reference, service: r.body.service });
    S.view = 'dossier';
    history.replaceState(null, '', location.pathname);
    await reload();
  }

  async function recoverLink() {
    S.error = ''; S.info = '';
    if (!S.recover.reference.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(S.recover.email.trim())) { S.error = tr('err.invalid_email'); return render(); }
    S.submitting = true; render();
    var r = await D.api('/api/dossiers/recover', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(S.recover) }, 'none').catch(function () { return { ok: false, body: {} }; });
    S.submitting = false;
    if (!r.ok) S.error = errText(r); else S.info = r.body.emailEnabled === false ? tr('recover.noemail') : tr('recover.done');
    render();
  }

  // ---------- events ----------

  root.addEventListener('click', function (e) {
    var b = e.target.closest('[data-act]');
    if (!b) return;
    var act = b.dataset.act;
    if (act === 'pick') { var inp = root.querySelector('input[type=file][data-kind="' + b.dataset.kind + '"][data-doc="' + b.dataset.doc + '"]'); if (inp) inp.click(); }
    else if (act === 'remove') removeFile(Number(b.dataset.file));
    else if (act === 'submit') submitDossier();
    else if (act === 'go-recover') { S.view = 'recover'; S.error = ''; S.info = ''; render(); }
    else if (act === 'go-start') { S.view = 'start'; S.error = ''; S.info = ''; render(); }
    else if (act === 'open-current') { S.view = 'dossier'; S.error = ''; render(); }
    else if (act === 'forget') { D.clearStored(); S.dossier = null; S.token = null; S.view = 'start'; S.error = ''; render(); }
    else if (act === 'copy') {
      var text = personalLink();
      var done = function () { S.copied = true; render(); setTimeout(function () { S.copied = false; render(); }, 2000); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, function () { selectLink(); });
      else selectLink();
    }
  });
  function selectLink() { var c = document.getElementById('dos-link'); if (c && window.getSelection) { var r = document.createRange(); r.selectNodeContents(c); var s = window.getSelection(); s.removeAllRanges(); s.addRange(r); } }

  root.addEventListener('change', function (e) {
    var t = e.target;
    if (t.matches && t.matches('input[type=file][data-doc]')) { addFiles(t.dataset.doc, t.files); return; }
    if (t.dataset && t.dataset.form === 'consent') S.form.consent = t.checked;
    if (t.dataset && t.dataset.form === 'service') S.form.service = t.value;
  });
  root.addEventListener('input', function (e) {
    var t = e.target;
    if (t.dataset && t.dataset.form && t.dataset.form !== 'consent' && t.dataset.form !== 'service') S.form[t.dataset.form] = t.value;
    if (t.dataset && t.dataset.rec) S.recover[t.dataset.rec] = t.value;
  });
  root.addEventListener('submit', function (e) {
    e.preventDefault();
    if (e.target.id === 'start-form') startDossier();
    else if (e.target.id === 'recover-form') recoverLink();
  });

  // drag & drop a file onto a document (desktop)
  root.addEventListener('dragover', function (e) { var el = e.target.closest('.dos-doc[data-editable]'); if (el) { e.preventDefault(); el.classList.add('is-drag'); } });
  root.addEventListener('dragleave', function (e) { var el = e.target.closest('.dos-doc'); if (el) el.classList.remove('is-drag'); });
  root.addEventListener('drop', function (e) {
    var el = e.target.closest('.dos-doc[data-editable]');
    if (!el) return;
    e.preventDefault(); el.classList.remove('is-drag');
    addFiles(el.dataset.doc, e.dataTransfer.files);
  });

  // ---------- start ----------

  async function init() {
    render();
    S.cfg = await D.config();
    if (!S.cfg.enabled) { S.view = 'disabled'; return render(); }

    var m = location.hash.match(/[#&]t=([A-Za-z0-9_-]{30,80})/);
    if (m) { D.setStored({ token: m[1] }); history.replaceState(null, '', location.pathname + location.search); }

    var stored = D.getStored();
    if (stored && stored.token) {
      try {
        S.dossier = await D.me(stored.token);
        S.token = stored.token;
        D.setStored({ token: S.token, reference: S.dossier.reference, service: S.dossier.service });
      } catch (r) {
        if (r && r.status === 401) { D.clearStored(); S.error = m ? tr('err.invalid_token') : ''; }
      }
    }
    var wanted = params.get('service');
    var other = wanted && S.cfg.services[wanted] && S.dossier && S.dossier.service !== wanted;
    S.view = S.dossier && !other ? 'dossier' : 'start';
    render();
  }

  D.onLangChange(render);
  init();
})();
