/* ============================================================
   Dossiers — entry points on existing pages.
   Home: a discreet card under the hero.  Services: a call-to-action under the
   passport, visa and consular-card blocks.  Privacy policy: reveals the paragraph
   about documents.  Everything stays hidden while the server has the feature off.
   ============================================================ */
(function () {
  var D = window.AmbaciDossier;
  if (!D) return;
  var tr = D.tr, esc = D.esc;
  // The server may serve /services.html as /services, so compare names without ".html".
  var page = (location.pathname.split('/').pop() || 'index').toLowerCase().replace(/\.html$/, '');

  var ICON = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5"/><path d="M12 17v-5M9.5 14.5L12 12l2.5 2.5"/></svg>';

  function home() {
    var hero = document.querySelector('section.hero');
    if (!hero) return;
    var wrap = document.createElement('section');
    wrap.className = 'dos-promo-wrap';
    hero.parentNode.insertBefore(wrap, hero.nextSibling);
    var info = null;
    function draw() {
      var text = info ? tr('promo.status', { ref: info.reference, status: tr('status.' + info.status) }) : tr('promo.text');
      var actions = info
        ? '<a class="btn btn-primary" href="dossier.html">' + esc(tr('promo.open')) + '</a>'
        : '<a class="dos-link" href="dossier.html">' + esc(tr('promo.track')) + '</a><a class="btn btn-primary" href="dossier.html">' + esc(tr('promo.cta')) + '</a>';
      wrap.innerHTML = '<div class="container"><div class="dos-promo"><span class="dos-promo-ic">' + ICON + '</span>' +
        '<div class="dos-promo-tx"><b>' + esc(tr('promo.title')) + '</b><span>' + esc(text) + '</span></div>' +
        '<div class="dos-promo-actions">' + actions + '</div></div></div>';
    }
    draw();
    D.onLangChange(draw);
    var stored = D.getStored();
    if (stored && stored.token) {
      D.me(stored.token).then(function (d) { info = d; draw(); }).catch(function (r) { if (r && r.status === 401) D.clearStored(); });
    }
  }

  // buttons: [{ service, labelKey }]
  function cta(buttons) {
    var el = document.createElement('div');
    el.className = 'dos-cta';
    function draw() {
      el.innerHTML = '<div class="dos-cta-tx"><b>' + esc(tr('cta.title')) + '</b><span>' + esc(tr('cta.text')) + '</span></div><div class="dos-cta-btns">' +
        buttons.map(function (b, i) {
          return '<a class="btn ' + (i === 0 ? 'btn-primary' : 'btn-outline') + '" href="dossier.html?service=' + encodeURIComponent(b.service) + '">' + esc(tr(b.labelKey)) + '</a>';
        }).join('') + '</div>';
    }
    draw();
    D.onLangChange(draw);
    return el;
  }

  function services() {
    var pass = document.querySelector('#passeport .services-detail-grid');
    if (pass) pass.parentNode.insertBefore(cta([
      { service: 'passeport_premiere', labelKey: 'cta.first' },
      { service: 'passeport_renouvellement', labelKey: 'cta.renew' },
      { service: 'passeport_urgence', labelKey: 'cta.urgent' }
    ]), pass.nextSibling);
    var visa = document.querySelector('#visa .services-detail-grid');
    if (visa) visa.parentNode.insertBefore(cta([{ service: 'visa', labelKey: 'cta.btn' }]), visa.nextSibling);
    var card = document.getElementById('carte-consulaire');
    if (card) card.appendChild(cta([{ service: 'carte_consulaire', labelKey: 'cta.btn' }]));
  }

  function privacy() {
    var box = document.getElementById('dossiers-privacy');
    if (!box) return;
    function show() {
      box.hidden = false;
      var l = D.lang();
      box.querySelectorAll('[data-l]').forEach(function (b) { b.hidden = b.getAttribute('data-l') !== l; });
    }
    show();
    D.onLangChange(show);
  }

  D.config().then(function (cfg) {
    if (!cfg.enabled) return;
    D.loadCss();
    if (page === 'index' || page === '') home();
    else if (page === 'services') services();
    else if (page === 'politique-de-confidentialite') privacy();
  });
})();
