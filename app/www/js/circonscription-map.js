/* ============================================================
   Circonscription diplomatique — carte interactive (D3 + topojson)
   ============================================================ */
(function () {
  var SVG_NS = 'http://www.w3.org/2000/svg';

  var COUNTRIES = [
    { key: 'at', id: 40,  role: 'seat',  capital: [16.3738, 48.2082] },
    { key: 'hu', id: 348, role: 'juris', capital: [19.0402, 47.4979] },
    { key: 'si', id: 705, role: 'juris', capital: [14.5058, 46.0569] },
    { key: 'sk', id: 703, role: 'juris', capital: [17.1077, 48.1486] },
    { key: 'hr', id: 191, role: 'juris', capital: [15.9819, 45.8150], lab: [16.95, 45.5], capOffset: { dx: 8, anchor: 'start' } },
    { key: 'rs', id: 688, role: 'juris', capital: [20.4489, 44.7866] },
    { key: 'ro', id: 642, role: 'juris', capital: [26.1025, 44.4268] },
    { key: 'ba', id: 70,  role: 'juris', capital: [18.4131, 43.8563], capOffset: { dy: 16 } },
    { key: 'md', id: 498, role: 'juris', capital: [28.8638, 47.0105], capOffset: { dy: 16 } }
  ];

  var NEIGHBORS = [
    { id: 276, key: 'de', lab: [12.6, 48.7] },
    { id: 203, key: 'cz', lab: [15.3, 49.7] },
    { id: 616, key: 'pl', lab: [20.2, 49.9] },
    { id: 804, key: 'ua', lab: [24.6, 48.6] },
    { id: 380, key: 'it', lab: [12.2, 45.9] },
    { id: 756, key: 'ch', lab: [8.6, 46.85] },
    { id: 100, key: 'bg', lab: [25.2, 42.7] },
    { id: 807, key: 'mk', lab: [21.7, 41.6] },
    { id: 499, key: 'me', lab: [19.3, 42.85] }
  ];

  var geo = null;
  var selected = null;
  var hovered = null;

  function allTranslations() {
    return (typeof translations !== 'undefined') ? translations : {};
  }

  function currentLang() {
    var lang = (document.documentElement.lang || 'fr').toLowerCase();
    var dicts = allTranslations();
    return dicts[lang] ? lang : 'fr';
  }

  function tr(key) {
    var dict = allTranslations()[currentLang()] || {};
    return dict[key] || '';
  }

  function wrapName(name) {
    if (name.length <= 9) return [name];
    var hy = name.indexOf('-');
    if (hy > 0 && hy < name.length - 1) return [name.slice(0, hy + 1), name.slice(hy + 1)];
    var mid = name.length / 2;
    var best = -1, bestDist = Infinity;
    for (var i = 0; i < name.length; i++) {
      if (name[i] === ' ') {
        var d = Math.abs(i - mid);
        if (d < bestDist) { bestDist = d; best = i; }
      }
    }
    if (best > 0) return [name.slice(0, best), name.slice(best + 1)];
    return [name];
  }

  function buildGeo(d3, topojson, topo) {
    var fc = topojson.feature(topo, topo.objects.countries);
    var features = fc.features;
    var byId = new Map(features.map(function (f) { return [Number(f.id), f]; }));
    var idSet = new Set(COUNTRIES.map(function (c) { return c.id; }));

    var proj = d3.geoMercator();
    var pathGen = d3.geoPath(proj);
    var jurisFeatures = COUNTRIES.map(function (c) { return byId.get(c.id); }).filter(Boolean);
    proj.fitExtent([[92, 96], [908, 624]], { type: 'FeatureCollection', features: jurisFeatures });

    var ctxPaths = [];
    features.forEach(function (f) {
      if (idSet.has(Number(f.id))) return;
      var b;
      try { b = pathGen.bounds(f); } catch (e) { return; }
      if (!b || !isFinite(b[0][0])) return;
      if (b[1][0] < -30 || b[0][0] > 1030 || b[1][1] < -30 || b[0][1] > 750) return;
      var d = pathGen(f);
      if (d) ctxPaths.push({ id: Number(f.id), d: d });
    });

    var byKey = {};
    COUNTRIES.forEach(function (c) {
      var f = byId.get(c.id);
      if (!f) return;
      var d = pathGen(f);
      var cen = pathGen.centroid(f);
      var pin = proj(c.capital);
      var bb = null;
      try { bb = pathGen.bounds(f); } catch (e) { bb = null; }
      var bboxW = bb && isFinite(bb[0][0]) ? (bb[1][0] - bb[0][0]) : null;
      var bboxH = bb && isFinite(bb[0][1]) ? (bb[1][1] - bb[0][1]) : null;
      var lab = c.lab ? proj(c.lab) : cen;
      byKey[c.key] = {
        d: d,
        labX: lab && isFinite(lab[0]) ? lab[0] : (cen && isFinite(cen[0]) ? cen[0] : null),
        labY: lab && isFinite(lab[1]) ? lab[1] : (cen && isFinite(cen[1]) ? cen[1] : null),
        pinX: pin && isFinite(pin[0]) ? pin[0] : null,
        pinY: pin && isFinite(pin[1]) ? pin[1] : null,
        bboxW: bboxW, bboxH: bboxH
      };
    });

    var nbGeo = {};
    NEIGHBORS.forEach(function (n) {
      if (!n.lab) return;
      var p = proj(n.lab);
      if (!p || !isFinite(p[0])) return;
      if (p[0] < 30 || p[0] > 970 || p[1] < 20 || p[1] > 700) return;
      nbGeo[n.key] = { x: p[0], y: p[1] };
    });

    return { ctxPaths: ctxPaths, byKey: byKey, nbGeo: nbGeo };
  }

  function ensureLibs() {
    return new Promise(function (resolve, reject) {
      var n = 0;
      var iv = setInterval(function () {
        if (window.d3 && window.d3.geoMercator && window.topojson) { clearInterval(iv); resolve(); }
        else if (++n > 200) { clearInterval(iv); reject(new Error('libs-timeout')); }
      }, 50);
    });
  }

  function makeText(x, y, content, style) {
    var el = document.createElementNS(SVG_NS, 'text');
    el.setAttribute('x', x);
    el.setAttribute('y', y);
    el.setAttribute('text-anchor', 'middle');
    el.setAttribute('pointer-events', 'none');
    Object.keys(style).forEach(function (k) {
      var cssProp = k.replace(/[A-Z]/g, function (m) { return '-' + m.toLowerCase(); });
      el.style.setProperty(cssProp, style[k]);
    });
    el.textContent = content;
    return el;
  }

  function renderContext() {
    var g = document.querySelector('#cd-map-svg .cd-ctx');
    g.innerHTML = '';
    geo.ctxPaths.forEach(function (p) {
      var path = document.createElementNS(SVG_NS, 'path');
      path.setAttribute('d', p.d);
      path.setAttribute('fill', '#34343c');
      path.setAttribute('stroke', '#46464f');
      path.setAttribute('stroke-width', '0.6');
      g.appendChild(path);
    });
  }

  function renderCountries() {
    var g = document.querySelector('#cd-map-svg .cd-map');
    g.innerHTML = '';
    COUNTRIES.forEach(function (c) {
      var gd = geo.byKey[c.key];
      if (!gd || !gd.d) return;
      var path = document.createElementNS(SVG_NS, 'path');
      path.setAttribute('class', 'cc');
      path.setAttribute('d', gd.d);
      path.setAttribute('data-role', c.role);
      path.setAttribute('data-key', c.key);
      path.setAttribute('data-active', (selected === c.key || hovered === c.key) ? 'true' : 'false');
      path.setAttribute('tabindex', '0');
      path.setAttribute('role', 'button');
      path.setAttribute('aria-pressed', selected === c.key ? 'true' : 'false');
      path.setAttribute('aria-label', tr('pays.' + c.key));
      path.addEventListener('click', function () { selectCountry(c.key); });
      path.addEventListener('mouseenter', function () { hovered = c.key; updateActiveStates(); refreshDisplay(); });
      path.addEventListener('mouseleave', function () { if (hovered === c.key) { hovered = null; updateActiveStates(); refreshDisplay(); } });
      path.addEventListener('focus', function () { hovered = c.key; updateActiveStates(); refreshDisplay(); });
      path.addEventListener('blur', function () { if (hovered === c.key) { hovered = null; updateActiveStates(); refreshDisplay(); } });
      path.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
          e.preventDefault();
          selectCountry(c.key);
        }
      });
      g.appendChild(path);
    });
  }

  function updateActiveStates() {
    var paths = document.querySelectorAll('#cd-map-svg .cc');
    for (var i = 0; i < paths.length; i++) {
      var p = paths[i];
      var k = p.getAttribute('data-key');
      p.setAttribute('data-active', (selected === k || hovered === k) ? 'true' : 'false');
      p.setAttribute('aria-pressed', selected === k ? 'true' : 'false');
    }
  }

  function renderPins() {
    var g = document.querySelector('#cd-map-svg .cd-pins');
    g.innerHTML = '';
    COUNTRIES.forEach(function (c) {
      var gd = geo.byKey[c.key];
      if (!gd || gd.pinX == null) return;
      var circle = document.createElementNS(SVG_NS, 'circle');
      circle.setAttribute('cx', gd.pinX);
      circle.setAttribute('cy', gd.pinY);
      circle.setAttribute('r', '3.2');
      circle.setAttribute('fill', '#ffffff');
      circle.setAttribute('stroke', '#F77F00');
      circle.setAttribute('stroke-width', '2');
      circle.setAttribute('pointer-events', 'none');
      g.appendChild(circle);
    });
  }

  function renderLabels() {
    var g = document.querySelector('#cd-map-svg .cd-labels');
    g.innerHTML = '';

    var mob = window.innerWidth < 768;
    NEIGHBORS.forEach(function (n) {
      var ng = geo.nbGeo[n.key];
      if (!ng) return;
      var name = tr('pays.nb.' + n.key) || n.key;
      var lines = wrapName(name);
      var fs = mob ? 19 : 10.5, lh = fs * 1.02;
      lines.forEach(function (ln, i) {
        var y = ng.y + (i - (lines.length - 1) / 2) * lh + fs * 0.34;
        g.appendChild(makeText(ng.x, y, ln, {
          fontFamily: 'Inter, sans-serif', fontWeight: '500', fontSize: fs + 'px',
          fill: '#9aa1ac', paintOrder: 'stroke', stroke: '#16161a', strokeWidth: mob ? '4px' : '2.4px', letterSpacing: '.03em'
        }));
      });
    });

    COUNTRIES.forEach(function (c) {
      var gd = geo.byKey[c.key];
      if (!gd || gd.labX == null || gd.bboxW == null) return;
      var name = tr('pays.' + c.key) || c.key;
      var lines = wrapName(name);
      var maxLen = Math.max.apply(null, lines.map(function (l) { return l.length; }));
      var wFit = (gd.bboxW * 0.74) / (0.56 * Math.max(maxLen, 1));
      var hFit = (gd.bboxH * 0.6) / lines.length;
      var fs = Math.min(wFit, hFit);
      var fsMin = mob ? 22 : 6.5;
      var fsMax = mob ? 32 : 12.5;
      fs = Math.max(fsMin, Math.min(fs, fsMax));
      var lh = fs * 1.02;
      lines.forEach(function (ln, i) {
        var y = gd.labY + (i - (lines.length - 1) / 2) * lh + fs * 0.34;
        g.appendChild(makeText(gd.labX, y, ln, {
          fontFamily: 'Inter, sans-serif', fontWeight: '600', fontSize: fs.toFixed(2) + 'px',
          fill: '#ffffff', paintOrder: 'stroke', stroke: '#0e0e10',
          strokeWidth: (fs > 10 ? (mob ? 4.5 : 2.6) : (mob ? 3.5 : 2)) + 'px', letterSpacing: '.01em'
        }));
      });
    });

    var activeKey = hovered || selected;
    if (activeKey) {
      var sgd = geo.byKey[activeKey];
      if (sgd && sgd.pinX != null) {
        var capFull = tr('pays.cap.' + activeKey);
        var capLabel = capFull.split('(')[0].trim();
        var ac = COUNTRIES.filter(function (x) { return x.key === activeKey; })[0];
        var offset = (ac && ac.capOffset) || {};
        var dy = (offset.dy !== undefined) ? offset.dy : -11;
        var capText = makeText(sgd.pinX + (offset.dx || 0), sgd.pinY + dy, capLabel, {
          fontFamily: 'Inter, sans-serif', fontWeight: '700', fontSize: '12.5px',
          fill: '#F77F00', paintOrder: 'stroke', stroke: '#0e0e10', strokeWidth: '3.2px', letterSpacing: '.02em'
        });
        capText.setAttribute('text-anchor', offset.anchor || 'middle');
        g.appendChild(capText);
      }
    }
  }

  function updateAside() {
    var empty = document.getElementById('cd-empty');
    var sel = document.getElementById('cd-selected');
    var seatTag = document.getElementById('cd-seat-tag');
    var activeKey = hovered || selected;
    if (!activeKey) {
      empty.style.display = '';
      sel.style.display = 'none';
      return;
    }
    var c = COUNTRIES.filter(function (x) { return x.key === activeKey; })[0];
    var name = tr('pays.' + activeKey);
    empty.style.display = 'none';
    sel.style.display = '';
    document.getElementById('cd-flag').src = 'https://flagcdn.com/' + activeKey + '.svg';
    document.getElementById('cd-flag').alt = name;
    document.getElementById('cd-name').textContent = name;
    document.getElementById('cd-cap').textContent = tr('pays.cap.' + activeKey);
    document.getElementById('cd-blurb').textContent = tr('pays.blurb.' + activeKey);
    seatTag.style.display = (c && c.role === 'seat') ? 'inline-block' : 'none';
  }

  function refreshDisplay() {
    renderLabels();
    updateAside();
  }

  function selectCountry(key) {
    selected = key;
    updateActiveStates();
    refreshDisplay();
  }

  function render() {
    renderContext();
    renderCountries();
    renderPins();
    refreshDisplay();
  }

  function init() {
    var svg = document.getElementById('cd-map-svg');
    if (!svg) return;
    var status = document.getElementById('cd-map-status');
    var urls = [
      'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json',
      'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'
    ];

    ensureLibs().then(function () {
      var fetchNext = function (i) {
        if (i >= urls.length) throw new Error('topo-fetch');
        return fetch(urls[i]).then(function (r) {
          if (r.ok) return r.json();
          return fetchNext(i + 1);
        }).catch(function () { return fetchNext(i + 1); });
      };
      return fetchNext(0);
    }).then(function (topo) {
      if (!topo) throw new Error('topo-fetch');
      geo = buildGeo(window.d3, window.topojson, topo);
      if (status) status.style.display = 'none';
      render();
    }).catch(function () {
      if (status) {
        status.textContent = tr('pays.map.failed');
        status.setAttribute('data-i18n', 'pays.map.failed');
      }
    });

    document.addEventListener('langchange', function () {
      if (!geo) return;
      var paths = document.querySelectorAll('#cd-map-svg .cc');
      for (var i = 0; i < paths.length; i++) {
        var k = paths[i].getAttribute('data-key');
        paths[i].setAttribute('aria-label', tr('pays.' + k));
      }
      refreshDisplay();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
