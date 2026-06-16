'use strict';

/* ============================================================
   AMBACI VIENNA — Capacitor native bridge
   Gracefully degrades to a no-op in plain browsers.
   Loaded AFTER main.js on every page.
   ============================================================ */

(function () {
  var isNative = !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform());

  /* ── 1. Status bar ── */
  if (isNative) {
    window.Capacitor.Plugins.StatusBar && window.Capacitor.Plugins.StatusBar.setStyle({ style: 'DARK' }).catch(function () {});
  }

  /* ── 2. Android hardware back button ── */
  if (isNative && window.Capacitor.Plugins.App) {
    window.Capacitor.Plugins.App.addListener('backButton', function (ev) {
      var page = location.pathname.split('/').pop();
      if (page === 'index.html' || page === '') {
        window.Capacitor.Plugins.App.exitApp();
      } else {
        history.back();
      }
    });
  }

  /* ── 3. External links open in system browser ── */
  var EXTERNAL_PROTOCOLS = /^(https?|mailto|tel):\/\//i;
  var IN_APP_PAGES = /\b(index|ambassade|services|annonces|contact)\.html\b/i;
  var SOCIAL_SELECTORS = '.m-topbar-socials a[href], a[href^="https://wa.me"], a[href^="mailto:"], a[href^="tel:"], a[href*="maps.google"], a[href*="goo.gl/maps"], a[href*="google.com/maps"]';

  function openExternal(url) {
    if (isNative && window.Capacitor.Plugins.Browser) {
      window.Capacitor.Plugins.Browser.open({ url: url }).catch(function () { window.open(url, '_blank'); });
    } else {
      window.open(url, '_blank');
    }
  }

  function isInAppLink(href) {
    if (!href) return false;
    if (href.startsWith('#') || href.startsWith('javascript')) return true;
    if (IN_APP_PAGES.test(href) && !href.startsWith('http')) return true;
    return false;
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href');
    if (!href || isInAppLink(href)) return;
    if (EXTERNAL_PROTOCOLS.test(href)) {
      e.preventDefault();
      openExternal(href);
    }
  }, true);

  /* ── 4. Offline banner ── */
  var OFFLINE_KEYS = {
    fr: 'Hors-ligne — les liens externes (carte, réseaux) peuvent ne pas charger.',
    de: 'Offline — externe Links (Karte, Soziale Medien) sind möglicherweise nicht verfügbar.',
    en: 'Offline — external links (map, social media) may not load.'
  };

  function getLang() {
    try { return localStorage.getItem('ambaci-mobile-lang') || 'fr'; } catch (e) { return 'fr'; }
  }

  var offlineBanner = null;

  function showOfflineBanner() {
    if (offlineBanner) return;
    var lang = getLang();
    var text = OFFLINE_KEYS[lang] || OFFLINE_KEYS.fr;
    offlineBanner = document.createElement('div');
    offlineBanner.className = 'm-alert';
    offlineBanner.style.cssText = 'display:flex;align-items:center;gap:.5rem;z-index:1000;';
    offlineBanner.innerHTML =
      '<span>📶</span>' +
      '<p style="flex:1;margin:0;">' + text + '</p>' +
      '<button class="m-alert-close" style="font-size:1.2rem;line-height:1;background:none;border:none;cursor:pointer;">×</button>';
    offlineBanner.querySelector('.m-alert-close').addEventListener('click', function () {
      if (offlineBanner && offlineBanner.parentNode) offlineBanner.parentNode.removeChild(offlineBanner);
      offlineBanner = null;
    });
    document.body.insertBefore(offlineBanner, document.body.firstChild);
  }

  function hideOfflineBanner() {
    if (offlineBanner && offlineBanner.parentNode) offlineBanner.parentNode.removeChild(offlineBanner);
    offlineBanner = null;
  }

  if (isNative && window.Capacitor.Plugins.Network) {
    window.Capacitor.Plugins.Network.getStatus().then(function (status) {
      if (!status.connected) showOfflineBanner();
    }).catch(function () {});

    window.Capacitor.Plugins.Network.addListener('networkStatusChange', function (status) {
      if (!status.connected) { showOfflineBanner(); } else { hideOfflineBanner(); }
    });
  } else {
    window.addEventListener('offline', showOfflineBanner);
    window.addEventListener('online', hideOfflineBanner);
  }
})();
