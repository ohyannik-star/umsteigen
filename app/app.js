(function () {
'use strict';

var APP = 'umsteigen';
var D = window.APP_DATA || {};
var LINIEN = Array.isArray(D.linien) ? D.linien : [];
var TECHNIKEN = Array.isArray(D.techniken) ? D.techniken : [];
var KOMPASS = D.kompass || null;
var SZENARIEN = Array.isArray(D.szenarien) ? D.szenarien : [];
var KAMPAGNE = D.kampagne || null;
var LEIT = D.leitplanken || null;
var HILFE = Array.isArray(D.hilfe) ? D.hilfe : [];
var MESSUNG = D.messung || null;
var ARG = D.argumente && D.argumente.argumente ? D.argumente : null;
var LINE_COLORS = ['#0a5fa7', '#c2410c', '#15803d', '#7c3aed', '#be185d', '#0e7490', '#b45309'];
var EBENE = { individuum: 'Einzelperson', masse: 'Viele Menschen', beide: 'Beide Ebenen' };

/* ---------- Helfer ---------- */
function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
function $(sel, root) { return (root || document).querySelector(sel); }
function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
var store = {
  get: function (k, d) { try { var v = localStorage.getItem(APP + ':' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set: function (k, v) { try { localStorage.setItem(APP + ':' + k, JSON.stringify(v)); } catch (e) {} },
  del: function (k) { try { localStorage.removeItem(APP + ':' + k); } catch (e) {} }
};
function paras(t) { return String(t || '').split(/\n+/).filter(Boolean).map(function (p) { return '<p>' + esc(p) + '</p>'; }).join(''); }
function ul(items, cls) { return items && items.length ? '<ul class="' + (cls || '') + '">' + items.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul>' : ''; }
function ol(items) { return items && items.length ? '<ol>' + items.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ol>' : ''; }
function ev(e) { return e ? '<span class="chip ev ev-' + esc(e) + '" title="Evidenzstufe">' + esc(e) + '</span>' : ''; }
function chip(t, cls) { return t ? '<span class="chip ' + (cls || '') + '">' + esc(t) + '</span>' : ''; }
function ebeneChip(e) { return e ? chip(EBENE[e] || e) : ''; }
function lineIdx(id) { for (var i = 0; i < LINIEN.length; i++) if (LINIEN[i].id === id) return i; return -1; }
function lineById(id) { return LINIEN[lineIdx(id)] || null; }
function lineColor(l) { return l.farbe || LINE_COLORS[Math.max(0, lineIdx(l.id)) % LINE_COLORS.length]; }
function stationOf(l, sid) { if (!l) return null; for (var i = 0; i < l.stationen.length; i++) if (l.stationen[i].id === sid) return l.stationen[i]; return null; }
function technikById(id) { for (var i = 0; i < TECHNIKEN.length; i++) if (TECHNIKEN[i].id === id) return TECHNIKEN[i]; return null; }
function badge(l, sm) { return '<span class="badge' + (sm ? ' sm' : '') + '" style="background:' + esc(lineColor(l)) + '">' + (lineIdx(l.id) + 1) + '</span>'; }
function technikChips(ids) { return (ids || []).map(function (id) { var t = technikById(id); return t ? '<button class="chip btn-chip" data-go="wissen" data-technik="' + esc(id) + '">' + esc(t.name) + '</button>' : ''; }).join(' '); }
function quotes(items) { return (items || []).map(function (q) { return '<div class="quote">„' + esc(q) + '“</div>'; }).join(''); }
function stationBtn(l, s, extra) { return '<button class="btn" data-go="netz" data-linie="' + esc(l.id) + '" data-station="' + esc(s.id) + '">' + badge(l, true) + ' ' + esc(s.name) + (extra ? ' <span class="small muted">' + esc(extra) + '</span>' : '') + '</button>'; }
function missing(name) { return '<div class="empty">Die Inhalte für „' + esc(name) + '“ sind noch nicht geladen.</div>'; }
function today() { var d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
function toast(msg) { var t = document.createElement('div'); t.className = 'toast'; t.textContent = msg; document.body.appendChild(t); setTimeout(function () { t.remove(); }, 1800); }
function copyText(text) {
  var done = function () { toast('In die Zwischenablage kopiert'); };
  var fail = function () {
    var ta = document.createElement('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.top = '0'; document.body.appendChild(ta); ta.focus(); ta.select();
    toast('Text markiert. Bitte mit Strg+C kopieren.'); setTimeout(function () { ta.remove(); }, 4000);
  };
  try { navigator.clipboard.writeText(text).then(done, fail); } catch (e) { fail(); }
}

var HOSTED = !!window.UMSTEIGEN_HOSTED;
function isStandalone() { try { return window.navigator.standalone === true || (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches); } catch (e) { return false; } }
function shareText(title, text) {
  if (navigator.share) { try { navigator.share({ title: title, text: text }).catch(function (err) { if (!err || err.name !== 'AbortError') copyText(text); }); return; } catch (e) {} }
  copyText(text);
}
function downloadText(name, text) {
  try { var b = new Blob([text], { type: 'application/json' }); var u = URL.createObjectURL(b); var a = document.createElement('a'); a.href = u; a.download = name; document.body.appendChild(a); a.click(); setTimeout(function () { a.remove(); URL.revokeObjectURL(u); }, 800); toast('Datei gespeichert'); } catch (e) { copyText(text); }
}
function backupAll() {
  var daten = {};
  try { for (var i = 0; i < localStorage.length; i++) { var k = localStorage.key(i); if (k && k.indexOf(APP + ':') === 0) daten[k.slice(APP.length + 1)] = JSON.parse(localStorage.getItem(k)); } } catch (e) {}
  return JSON.stringify({ app: APP, version: 1, datum: today(), daten: daten });
}
function restoreAll(text) {
  var o = JSON.parse(text);
  if (Array.isArray(o)) { var cur = store.get('tagebuch', []), ids = {}; cur.forEach(function (x) { ids[x.id] = 1; }); o.forEach(function (x) { if (x && x.alias && x.notiz && !ids[x.id]) cur.push({ id: x.id || uid(), alias: x.alias, datum: x.datum || today(), linie: x.linie || '', station: x.station || '', stufe: x.stufe || '', notiz: x.notiz, naechster: x.naechster || '' }); }); store.set('tagebuch', cur); return; }
  if (!o || o.app !== APP || !o.daten) throw new Error('format');
  Object.keys(o.daten).forEach(function (k) { store.set(k, o.daten[k]); });
}
var ICONS = {
  start: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v9.5h13V10"/><path d="M10 19.5v-5h4v5"/>',
  netz: '<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.5 6H14a4 4 0 0 1 0 8h-4a4 4 0 0 0 0 8h5.5"/>',
  kompass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2.2 5.3-5.3 2.2 2.2-5.3z"/>',
  trainer: '<path d="M21 11.5a8 8 0 0 1-11.7 7.1L4 20.5l1.9-5A8 8 0 1 1 21 11.5z"/>',
  kampagne: '<path d="M3 10v4a1 1 0 0 0 1 1h3l6 4V5L7 9H4a1 1 0 0 0-1 1z"/><path d="M16.5 9a4.5 4.5 0 0 1 0 6"/>',
  wissen: '<path d="M4 4.5h5.5A2.5 2.5 0 0 1 12 7v13a2 2 0 0 0-2-2H4z"/><path d="M20 4.5h-5.5A2.5 2.5 0 0 0 12 7v13a2 2 0 0 1 2-2h6z"/>',
  leitplanken: '<path d="M12 3 20 6v6c0 4.8-3.4 8.3-8 9-4.6-.7-8-4.2-8-9V6z"/><path d="m9 12 2 2 4-4"/>',
  antworten: '<path d="M4 5h16v10H9l-5 4z"/><path d="M8 9h8M8 12h5"/>',
  archiv: '<path d="M3 5h18v4H3z"/><path d="M5 9v10h14V9"/><path d="M10 13h4"/>',
  tagebuch: '<rect x="5" y="3" width="14" height="18" rx="2.5"/><path d="M9 8h6M9 12h6M9 16h3"/>'
};
function icon(k) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[k] || '') + '</svg>'; }
function seg(key, opts) { return '<div class="seg" role="group">' + opts.map(function (o) { return '<button type="button" aria-pressed="' + (state[key] === o[0]) + '" data-act="filter" data-key="' + esc(key) + '" data-val="' + esc(o[0]) + '">' + esc(o[1]) + '</button>'; }).join('') + '</div>'; }
function optRow(type, name, id, value, text, checked) { return '<label class="opt"><input class="vh" type="' + type + '" name="' + esc(name) + '" value="' + esc(value) + '" id="' + esc(id) + '"' + (checked ? ' checked' : '') + '><i class="ck" aria-hidden="true"></i><span>' + esc(text) + '</span></label>'; }
function group(title, hint, rows, eyebrow) { return '<div class="group">' + (eyebrow ? '<div class="eyebrow">' + esc(eyebrow) + '</div>' : '') + '<div class="group-title">' + esc(title) + (hint ? ' <span class="small">' + esc(hint) + '</span>' : '') + '</div><div class="list">' + rows + '</div></div>'; }
function art(kind) {
  var soft = 'stroke="currentColor" stroke-opacity=".16"', acc = '#0a84ff';
  if (kind === 'kompass') return '<svg class="art" viewBox="0 0 340 200" aria-hidden="true"><circle cx="170" cy="128" r="96" fill="none" ' + soft + ' stroke-width="2"/><circle cx="170" cy="128" r="74" fill="none" ' + soft + ' stroke-width="1"/><path d="M170 24v12M170 220v-12M66 128h12M274 128h-12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M170 128 152 68l18-12 18 12z" fill="' + acc + '"/><path d="M170 128l18 60-18 12-18-12z" fill="currentColor" fill-opacity=".2"/><circle cx="170" cy="128" r="7" fill="currentColor"/></svg>';
  if (kind === 'trainer') return '<svg class="art" viewBox="0 0 340 200" aria-hidden="true"><rect x="18" y="26" width="200" height="46" rx="23" fill="currentColor" fill-opacity=".12"/><rect x="122" y="88" width="200" height="46" rx="23" fill="' + acc + '"/><rect x="18" y="150" width="150" height="46" rx="23" fill="currentColor" fill-opacity=".12"/><circle cx="48" cy="49" r="4" fill="currentColor" fill-opacity=".5"/><circle cx="64" cy="49" r="4" fill="currentColor" fill-opacity=".5"/><circle cx="80" cy="49" r="4" fill="currentColor" fill-opacity=".5"/></svg>';
  if (kind === 'kampagne') return '<svg class="art" viewBox="0 0 340 200" aria-hidden="true"><path d="M18 190h304" ' + soft + ' stroke-width="2"/><rect x="30" y="140" width="38" height="50" rx="8" fill="currentColor" fill-opacity=".14"/><rect x="84" y="118" width="38" height="72" rx="8" fill="currentColor" fill-opacity=".18"/><rect x="138" y="96" width="38" height="94" rx="8" fill="currentColor" fill-opacity=".22"/><rect x="192" y="70" width="38" height="120" rx="8" fill="currentColor" fill-opacity=".28"/><rect x="246" y="30" width="38" height="160" rx="8" fill="' + acc + '"/></svg>';
  return '<svg class="art" viewBox="0 0 340 200" aria-hidden="true"><path d="M0 56h340" stroke="#0a5fa7" stroke-width="8" stroke-linecap="round"/><path d="M0 116h340" stroke="#15803d" stroke-width="8"/><path d="M0 176h340" stroke="#c2410c" stroke-width="8"/><path d="M150 116c40 0 40-60 80-60" stroke="#15803d" stroke-width="8" fill="none"/>' + [60, 150, 240].map(function (x) { return '<circle cx="' + x + '" cy="56" r="8" fill="var(--tile)" stroke="#0a5fa7" stroke-width="4"/><circle cx="' + (x + 30) + '" cy="116" r="8" fill="var(--tile)" stroke="#15803d" stroke-width="4"/><circle cx="' + x + '" cy="176" r="8" fill="var(--tile)" stroke="#c2410c" stroke-width="4"/>'; }).join('') + '<circle cx="230" cy="56" r="8" fill="var(--tile)" stroke="#15803d" stroke-width="4"/></svg>';
}
function lineArt(l) {
  var c = lineColor(l);
  return '<svg class="art" viewBox="0 0 340 200" aria-hidden="true"><path d="M0 130h340" stroke="' + esc(c) + '" stroke-width="8"/><path d="M110 130c40 0 40-56 80-56h60" stroke="' + esc(c) + '" stroke-width="8" fill="none" stroke-linecap="round"/>' + [30, 110, 190, 270].map(function (x) { return '<circle cx="' + x + '" cy="130" r="9" fill="var(--tile)" stroke="' + esc(c) + '" stroke-width="4"/>'; }).join('') + '<circle cx="210" cy="74" r="9" fill="var(--tile)" stroke="' + esc(c) + '" stroke-width="4"/></svg>';
}
function heroArt() {
  var cols = LINIEN.length ? LINIEN.map(lineColor) : LINE_COLORS.slice(0, 5);
  var out = '<svg class="hero-art" viewBox="0 0 1024 240" aria-hidden="true">';
  cols.forEach(function (c, i) {
    var y = 30 + i * 46, bx = 160 + i * 140;
    out += '<path d="M0 ' + y + 'H1024" stroke="' + esc(c) + '" stroke-width="7" stroke-linecap="round"/>';
    out += '<path d="M' + bx + ' ' + y + 'c46 0 46-23 92-23h130" stroke="' + esc(c) + '" stroke-width="7" fill="none" stroke-linecap="round"/>';
    [bx - 70, bx + 160, bx + 310, bx + 470].forEach(function (x) { if (x > 20 && x < 1004) out += '<circle cx="' + x + '" cy="' + y + '" r="8" fill="var(--bg)" stroke="' + esc(c) + '" stroke-width="4"/>'; });
    out += '<circle cx="' + (bx + 170) + '" cy="' + (y - 23) + '" r="8" fill="var(--bg)" stroke="' + esc(c) + '" stroke-width="4"/>';
  });
  return out + '</svg>';
}

/* ---------- Zustand und Routing ---------- */
var ROUTES = [
  ['start', 'Start'], ['netz', 'Netzplan'], ['kompass', 'Kompass'], ['trainer', 'Trainer'],
  ['antworten', 'Antworten'], ['archiv', 'Archiv'], ['kampagne', 'Kampagne'], ['wissen', 'Wissen'], ['leitplanken', 'Leitplanken'], ['tagebuch', 'Tagebuch']
];
var state = {
  route: 'start', linie: null, station: null, technik: null, filterEbene: 'alle',
  wissenEbene: 'alle', wissenEv: 'alle', kampTab: 'planer', bausteinTyp: 'alle',
  trainer: null, kompassEdit: false, confirmDel: null, confirmClear: false, prefill: null
};
var lastRoute = null;

function go(route, patch) {
  if (patch) Object.keys(patch).forEach(function (k) { state[k] = patch[k]; });
  state.route = route;
  var h = '#' + route;
  if (location.hash !== h) location.hash = h; else render();
}
window.addEventListener('hashchange', function () {
  var r = location.hash.replace('#', '');
  if (ROUTES.some(function (x) { return x[0] === r; })) state.route = r;
  render();
});

function render() {
  var nav = $('#nav');
  nav.innerHTML = ROUTES.map(function (r, i) {
    return '<button data-go="' + r[0] + '"' + (state.route === r[0] ? ' aria-current="page"' : '') + '>' + esc(r[1]) + '</button>';
  }).join('');
  var view = VIEWS[state.route] || VIEWS.start;
  $('#main').innerHTML = '<div class="wrap">' + view() + '</div>';
  if (lastRoute !== state.route) { window.scrollTo(0, 0); lastRoute = state.route; }
  if (AFTER[state.route]) AFTER[state.route]();
}

/* ---------- Start ---------- */
function vStart() {
  var mods = ROUTES.filter(function (r) { return r[0] !== 'start'; }).map(function (r) { return '<button data-go="' + r[0] + '">' + icon(r[0]) + '<span>' + esc(r[1]) + '</span></button>'; }).join('');
  var wege = [
    ['kompass', 'dark', 'Einzelperson', 'Kompass', 'Fragen zu dem, was du an einer Person beobachtest. Am Ende siehst du, was die Person antreibt, was hilft, was schadet und an welcher Station du einsteigst.'],
    ['trainer', '', 'Üben', 'Trainer', 'Sieben Szenarien vom Familienessen bis zur Bürgerversammlung. Drei Antworten zur Wahl, sofort eine Rückmeldung.'],
    ['kampagne', 'dark', 'Viele Menschen', 'Kampagne', 'Planer, Zielgruppen und 16 Bausteine mit ehrlicher Evidenzstufe für Gruppen, Vereine und Kommunen.'],
    ['netz', '', 'Überblick', 'Netzplan', 'Fünf Linien, 40 Stationen, Abzweige und Umsteigepunkte. Jede Station mit Sätzen und Warnsignalen.']
  ].map(function (w) { return '<div class="tile ' + w[1] + '" role="button" tabindex="0" data-go="' + w[0] + '"><span class="tag">' + esc(w[2]) + '</span><h3>' + esc(w[3]) + '</h3><p>' + esc(w[4]) + '</p>' + art(w[0]) + '</div>'; }).join('');
  var linien = LINIEN.map(function (l) {
    return '<div class="tile" role="button" tabindex="0" data-go="netz" data-linie="' + esc(l.id) + '" data-station=""><span class="tag" style="color:' + esc(lineColor(l)) + '">Linie ' + (lineIdx(l.id) + 1) + ' · ' + esc(EBENE[l.ebene] || l.ebene) + '</span><h3>' + esc(l.name) + '</h3><p>' + esc(l.leitidee) + '</p><p class="small muted">' + l.stationen.length + ' Stationen · ' + esc(l.dauer) + '</p>' + lineArt(l) + '</div>';
  }).join('');
  var leit = LEIT && LEIT.grundsaetze ? LEIT.grundsaetze.slice(0, 4).map(function (g) { return '<div class="card"><h4>' + esc(g.titel) + '</h4><p class="small muted" style="margin-top:6px">' + esc(g.text) + '</p></div>'; }).join('') : '';
  return '<div class="stack-lg">' +
    '<section class="hero"><h1 class="display">Menschen zurück ins Gespräch holen.</h1><p class="lead">Für alle, die jemanden erreichen wollen, der eine verfassungsfeindliche Partei attraktiv findet. Nicht durch Überreden, sondern durch Zuhören, Beziehung und kluge nächste Schritte.</p><div class="row center"><button class="btn primary" data-go="kompass">Mit dem Kompass starten</button><button class="link" data-go="netz">Netzplan ansehen ›</button></div>' + heroArt() + '</section>' +
    '<div class="iconrow">' + mods + '</div>' +
    (HOSTED && !isStandalone() ? '<div class="note"><strong>Als App auf dem Handy</strong>iPhone: In Safari unten auf „Teilen“ tippen, dann „Zum Home-Bildschirm“ und „Hinzufügen“. Android: Im Browser-Menü „App installieren“ wählen. Danach läuft Umsteigen wie eine App, auch offline. Deine Daten bleiben auf dem Gerät.</div>' : '') +
    '<section><h2 class="sh">Drei Wege, ein Ziel. <span>Wähle, wo du gerade stehst.</span></h2><div class="rail">' + wege + '</div></section>' +
    (linien ? '<section><h2 class="sh">Die Linien. <span>Fünf Wege mit Stationen und Umsteigepunkten.</span></h2><div class="rail">' + linien + '</div></section>' : '') +
    (leit ? '<section><h2 class="sh">Leitplanken. <span>Gelten auf jeder Linie.</span></h2><div class="grid">' + leit + '</div><div class="row" style="margin-top:14px"><button class="link" data-go="leitplanken">Alle Leitplanken und Anlaufstellen ›</button></div></section>' : '') +
    '<section><h2 class="sh">Evidenz. <span>Jede Empfehlung sagt, wie belastbar sie ist.</span></h2><div class="legend"><span>' + ev('stark') + ' replizierte Studien</span><span>' + ev('mittel') + ' einzelne gute Studien</span><span>' + ev('schwach') + ' Praxiswissen</span><span>' + ev('umstritten') + ' widersprüchliche Befunde</span></div></section>' +
  '</div>';
}

/* ---------- Netzplan ---------- */
function routeOf(l) {
  var main = l.stationen.filter(function (s) { return !(s.spur || 0); }).sort(function (a, b) { return (a.pos || 0) - (b.pos || 0); });
  var branches = l.stationen.filter(function (s) { return (s.spur || 0) !== 0; });
  var items = [], placed = {};
  main.forEach(function (m, i) {
    items.push({ s: m, n: i + 1 });
    branches.forEach(function (b) {
      if (placed[b.id]) return;
      var edge = (m.weiter || []).filter(function (w) { return w.zu === b.id; })[0];
      if (edge) { items.push({ s: b, branch: true, wenn: edge.wenn }); placed[b.id] = true; }
    });
  });
  branches.forEach(function (b) {
    if (placed[b.id]) return;
    var idx = -1; items.forEach(function (it, i) { if (!it.branch && (it.s.pos || 0) <= (b.pos || 0)) idx = i; });
    var entry = { s: b, branch: true, wenn: '' };
    if (idx >= 0) items.splice(idx + 1, 0, entry); else items.push(entry);
  });
  return items;
}
function stopBody(l, s) {
  var weiter = (s.weiter || []).map(function (w) { var t = stationOf(l, w.zu); return t ? '<div class="next"><span class="small muted">' + esc(w.wenn) + '</span>' + stationBtn(l, t) + '</div>' : ''; }).join('');
  var um = (s.umsteigen || []).map(function (u) { var tl = lineById(u.linie), ts = stationOf(tl, u.station); return ts ? '<div class="next"><span class="small muted">' + esc(u.wenn) + '</span>' + stationBtn(tl, ts) + '</div>' : ''; }).join('');
  return '<div class="stop-body">' +
    ((s.spur || 0) !== 0 ? '<p><strong>Ziel:</strong> ' + esc(s.ziel) + '</p>' : '') +
    '<div class="note"><div class="row" style="margin-bottom:6px">' + ev(s.evidenz) + chip(s.dauer) + '</div>' + paras(s.warum) + '</div>' +
    '<div class="station-detail"><div class="stack">' +
      '<div><h4>So gehst du vor</h4>' + ol(s.schritte) + '</div>' +
      (s.formulierungen && s.formulierungen.length ? '<div><h4>Formulierungen</h4>' + quotes(s.formulierungen) + '</div>' : '') +
      (s.fehler && s.fehler.length ? '<div><h4>Typische Fehler</h4>' + ul(s.fehler) + '</div>' : '') +
    '</div><div class="stack">' +
      '<div class="note good"><strong>Weiterfahren, wenn …</strong>' + ul(s.signale_weiter) + '</div>' +
      '<div class="note bad"><strong>Anhalten oder umsteigen, wenn …</strong>' + ul(s.signale_stopp) + '</div>' +
      (s.techniken && s.techniken.length ? '<div><h4>Techniken dazu</h4><div class="row">' + technikChips(s.techniken) + '</div></div>' : '') +
    '</div></div>' +
    '<div class="stack"><div><h4>Wie es weitergeht</h4>' + (weiter ? '<p class="small muted">Je nachdem, was passiert, fährst du hier weiter:</p>' + weiter : '<p class="muted small">Endstation dieser Linie. Steig um oder fang noch einmal von vorn an.</p>') + '</div>' +
    (um ? '<div><h4>Umsteigen</h4><p class="small muted">Wechsle die Linie, sobald eines davon zutrifft:</p>' + um + '</div>' : '') +
    '<div class="row"><button class="btn sm" data-go="tagebuch" data-prefill="' + esc(l.id) + '|' + esc(s.id) + '">Im Tagebuch notieren</button></div></div>' +
  '</div>';
}
function stopCard(l, it, sel) {
  var s = it.s;
  var go = ' data-go="netz" data-linie="' + esc(l.id) + '" data-station="' + (sel ? '' : esc(s.id)) + '"';
  return '<div class="stop' + (it.branch ? ' branch' : '') + (sel ? ' sel' : '') + '" id="stop-' + esc(s.id) + '">' +
    (it.branch ? '' : '<div class="stop-dot" aria-hidden="true">' + it.n + '</div>') +
    '<div class="stop-card"' + (sel ? '' : go) + '>' +
      '<div class="stop-head" role="button" tabindex="0"' + go + ' aria-expanded="' + (sel ? 'true' : 'false') + '">' +
        '<div class="stop-title">' + (it.branch ? '<span class="tag">Abzweig</span>' : '') + '<h3>' + esc(s.name) + '</h3><p class="muted small">' + (it.branch && it.wenn ? 'Sinnvoll in diesem Fall: ' + esc(it.wenn) : esc(s.ziel)) + '</p></div>' +
        '<div class="row stop-meta">' + chip(s.dauer) + ev(s.evidenz) + '</div><span class="chev" aria-hidden="true"></span>' +
      '</div>' + (sel ? stopBody(l, s) : '') +
    '</div></div>';
}
function vNetz() {
  if (!LINIEN.length) return missing('Netzplan');
  var l = lineById(state.linie) || LINIEN[0];
  var pick = '<div class="linepick">' + LINIEN.map(function (x) { return '<button type="button" aria-pressed="' + (x.id === l.id) + '" data-go="netz" data-linie="' + esc(x.id) + '" data-station=""><i style="background:' + esc(lineColor(x)) + '"></i>' + (lineIdx(x.id) + 1) + ' ' + esc(x.name) + '</button>'; }).join('') + '</div>';
  var head = '<section class="panel line-head"><div class="station-head">' + badge(l) + '<h2>' + esc(l.name) + '</h2><span class="row" style="margin-left:auto">' + ebeneChip(l.ebene) + chip(l.dauer) + chip(l.stationen.length + ' Stationen') + '</span></div>' +
    '<p>' + esc(l.leitidee) + '</p><p class="muted small"><strong>Für wen:</strong> ' + esc(l.zielgruppe) + '</p>' +
    (l.voraussetzungen && l.voraussetzungen.length ? '<details class="acc"><summary>Vor der Abfahrt</summary><div class="body">' + ul(l.voraussetzungen) + '</div></details>' : '') + '</section>';
  var route = '<div class="route" style="--lc:' + esc(lineColor(l)) + '">' + routeOf(l).map(function (it) { return stopCard(l, it, state.station === it.s.id); }).join('') + '</div>';
  return '<div class="stack-lg">' +
    '<div class="page-head"><div class="eyebrow">Alle Linien</div><h1>Netzplan</h1><p>Wähle eine Linie. Die Stationen folgen von oben nach unten aufeinander. Abzweige stehen eingerückt daneben, jeweils mit der Bedingung, unter der sie sinnvoll sind. Tippe auf eine Station, um Vorgehen, Sätze und Warnsignale zu sehen.</p></div>' +
    pick + head + route + '</div>';
}

/* ---------- Kompass ---------- */
function findIn(arr, id) { for (var i = 0; i < (arr || []).length; i++) if (arr[i].id === id) return arr[i]; return null; }
function kDraft() { var d = store.get('kompass-draft', null); return d && d.answers ? d : { answers: {} }; }
function kSaveDraft(d) { store.set('kompass-draft', d); }
function kSections() { return KOMPASS.bereiche && KOMPASS.bereiche.length ? KOMPASS.bereiche : [{ id: '', name: 'Fragen', beschreibung: '' }]; }
function kQuestions(b) { return KOMPASS.fragen.filter(function (f) { return !b.id || f.bereich === b.id; }); }
function kAnswered(answers, fr) { return fr.filter(function (f) { return (answers[f.id] || []).length; }).length; }
function kCollect(form) {
  var d = kDraft(), names = {};
  $$('input', form).forEach(function (i) { names[i.name] = names[i.name] || []; if (i.checked) names[i.name].push(i.value); });
  Object.keys(names).forEach(function (k) { d.answers[k] = names[k]; });
  kSaveDraft(d); return d;
}
function kBand(skala, v) { if (v == null) return null; for (var i = 0; i < (skala.baender || []).length; i++) if (v <= skala.baender[i].bis) return skala.baender[i]; return skala.baender[skala.baender.length - 1] || null; }

function vKompass() {
  if (!KOMPASS) return missing('Kompass');
  var res = store.get('kompass', null);
  if (res && !state.kompassEdit) return kompassResult(res);
  var draft = kDraft(), answers = draft.answers || {};
  var secs = kSections(), N = KOMPASS.fragen.length;
  var step = Math.min(Math.max(state.kStep != null ? state.kStep : (draft.step || 0), 0), secs.length - 1);
  var b = secs[step], fr = kQuestions(b);
  var total = kAnswered(answers, KOMPASS.fragen);
  var nav = '<div class="knav" aria-label="Richtungen">' + secs.map(function (s, i) {
    var q = kQuestions(s), a = kAnswered(answers, q);
    return '<button type="button" class="' + (i === step ? 'cur' : '') + (q.length && a === q.length ? ' done' : '') + '" data-act="k-step" data-step="' + i + '" aria-current="' + (i === step ? 'step' : 'false') + '"><span class="n">' + (i + 1) + '</span><span class="t">' + esc(s.name) + '</span><span class="c">' + a + '/' + q.length + '</span></button>';
  }).join('') + '</div>';
  var offset = 0; for (var i = 0; i < step; i++) offset += kQuestions(secs[i]).length;
  var qs = fr.map(function (f, i) {
    var multi = f.typ === 'multi';
    var rows = f.optionen.map(function (o) { return optRow(multi ? 'checkbox' : 'radio', f.id, 'kf-' + f.id + '-' + o.id, o.id, o.text, (answers[f.id] || []).indexOf(o.id) >= 0); }).join('');
    return '<div class="group"><div class="eyebrow">Frage ' + (offset + i + 1) + ' von ' + N + '</div><div class="group-title">' + esc(f.text) + (multi ? ' <span class="small">Mehrere Antworten möglich</span>' : '') + '</div>' +
      (f.warum ? '<details class="why"><summary>Warum diese Frage?</summary><p>' + esc(f.warum) + '</p></details>' : '') + '<div class="list">' + rows + '</div></div>';
  }).join('');
  var last = step === secs.length - 1;
  return '<div class="stack-lg">' +
    '<div class="page-head"><div class="eyebrow">Einzelperson</div><h1>Personen-Kompass</h1><p>' + esc(KOMPASS.hinweis) + '</p><p class="small muted">' + N + ' Fragen in ' + secs.length + ' Richtungen. Du kannst Richtungen überspringen und jederzeit auswerten lassen. Deine Antworten werden im Browser zwischengespeichert.</p></div>' +
    nav +
    '<form id="kompass-form" class="panel" data-form="kompass" data-step="' + step + '">' +
      '<div class="progress" id="kprog"><div class="progress-bar"><span style="width:' + Math.round(100 * total / N) + '%"></span></div><span class="small muted" id="kprog-t">' + total + ' von ' + N + ' beantwortet</span></div>' +
      '<div class="kb"><div class="tag">Richtung ' + (step + 1) + ' von ' + secs.length + '</div><h2>' + esc(b.name) + '</h2><p class="muted">' + esc(b.beschreibung) + '</p></div>' + qs +
      '<div class="form-end">' + (step > 0 ? '<button class="btn" type="button" data-act="k-prev">Zurück</button>' : '') +
      (last ? '<button class="btn primary" type="submit">Auswerten</button>' : '<button class="btn primary" type="button" data-act="k-next">Weiter</button><button class="btn" type="submit">Jetzt auswerten</button>') +
      (res ? '<button class="link" type="button" data-act="kompass-cancel">Abbrechen</button>' : '') + '</div>' +
    '</form></div>';
}
function evalKompass(form) {
  var d = form ? kCollect(form) : kDraft(), answers = d.answers || {};
  var scores = {}; KOMPASS.treiber.forEach(function (t) { scores[t.id] = 0; });
  var sk = {}, skMax = {}; (KOMPASS.skalen || []).forEach(function (s) { sk[s.id] = 0; skMax[s.id] = 0; });
  var hinweise = [], beantwortet = 0;
  KOMPASS.fragen.forEach(function (f) {
    var a = answers[f.id] || []; if (!a.length) return; beantwortet++;
    var qmax = {};
    f.optionen.forEach(function (o) {
      Object.keys(o.skalen || {}).forEach(function (s) { if (skMax[s] != null) qmax[s] = Math.max(qmax[s] || 0, o.skalen[s]); });
      if (a.indexOf(o.id) < 0) return;
      Object.keys(o.gewichte || {}).forEach(function (k) { scores[k] = (scores[k] || 0) + o.gewichte[k]; });
      Object.keys(o.skalen || {}).forEach(function (s) { if (sk[s] != null) sk[s] += o.skalen[s]; });
      if (o.hinweis && hinweise.indexOf(o.hinweis) < 0) hinweise.push(o.hinweis);
    });
    Object.keys(qmax).forEach(function (s) { skMax[s] += qmax[s]; });
  });
  var skalen = {}; Object.keys(sk).forEach(function (s) { skalen[s] = skMax[s] ? Math.min(100, Math.round(100 * sk[s] / skMax[s])) : null; });
  var ranked = Object.keys(scores).filter(function (k) { return scores[k] > 0; }).sort(function (a, b) { return scores[b] - scores[a]; });
  var top = ranked.slice(0, 2);
  if (ranked[2] && scores[ranked[2]] === scores[ranked[1]]) top.push(ranked[2]);
  var risiko = (answers.risiko || []).filter(function (id) { return (KOMPASS.risiko || []).some(function (r) { return r.id === id; }); });
  var abdeckung = kSections().map(function (b) { var q = kQuestions(b); return { id: b.id, name: b.name, n: kAnswered(answers, q), von: q.length }; });
  store.set('kompass', { answers: answers, scores: scores, top: top, skalen: skalen, stufe: (answers.stufe || [])[0], beziehung: (answers.beziehung || [])[0], risiko: risiko, hinweise: hinweise, beantwortet: beantwortet, abdeckung: abdeckung, datum: today() });
  state.kompassEdit = false; state.kStep = null;
}
function kGoStep(n) { state.kStep = n; var dd = kDraft(); dd.step = n; kSaveDraft(dd); render(); window.scrollTo(0, 0); }
function kSchritte(res) {
  var out = [], t = findIn(KOMPASS.treiber, res.top[0]);
  if (res.skalen && res.skalen.belastung != null && res.skalen.belastung > 66) out.push({ t: 'Zuerst du', x: 'Deine Belastung ist hoch. Lies die Leitplanken zum Selbstschutz und sprich mit einer Angehörigenberatung, bevor du das nächste Gespräch planst.', go: 'leitplanken' });
  if (t && t.start) { var sl = lineById(t.start.linie), ss = sl && stationOf(sl, t.start.station); if (ss) out.push({ t: 'Einsteigen bei „' + ss.name + '“', x: 'Linie ' + (lineIdx(sl.id) + 1) + ', ' + sl.name + '. Dort findest du Vorgehen, Sätze und Warnsignale für den Anfang.', go: 'netz', linie: sl.id, station: ss.id }); }
  if (t && t.techniken && t.techniken.length) { var tk = technikById(t.techniken[0]); if (tk) out.push({ t: 'Eine Technik üben: ' + tk.name, x: tk.kurz, go: 'wissen', technik: tk.id }); }
  var sO = findIn(KOMPASS.skalen, 'offenheit'), bO = sO && kBand(sO, res.skalen && res.skalen.offenheit);
  if (bO) out.push({ t: 'Tempo: ' + bO.name, x: bO.text, go: 'trainer' });
  return out.slice(0, 4);
}
function kompassResult(res) { return fallHub(res); }
function kompassResultAlt(res) {
  var risks = (res.risiko || []).map(function (id) { var r = findIn(KOMPASS.risiko, id); return r ? '<div class="note bad"><strong>' + esc(r.text) + '</strong><p>' + esc(r.aktion) + '</p></div>' : ''; }).join('');
  var stufe = findIn(KOMPASS.stufen, res.stufe), bez = findIn(KOMPASS.beziehung, res.beziehung);
  var maxScore = Math.max.apply(null, (res.top || []).map(function (k) { return res.scores[k]; }).concat([1]));
  var treiber = (res.top || []).map(function (id) {
    var t = findIn(KOMPASS.treiber, id); if (!t) return '';
    var sl = t.start ? lineById(t.start.linie) : null, ss = sl ? stationOf(sl, t.start.station) : null;
    var pct = Math.round(100 * res.scores[id] / maxScore);
    return '<section class="panel stack"><div><div class="eyebrow">Antrieb · Übereinstimmung ' + pct + ' %</div><h2>' + esc(t.name) + '</h2><p class="muted"><em>Legitimes Bedürfnis dahinter: ' + esc(t.beduerfnis) + '</em></p></div>' +
      '<p>' + esc(t.beschreibung) + '</p>' +
      '<div class="station-detail"><div class="note good"><strong>Was hilft</strong>' + ul(t.zugang) + '</div><div class="note bad"><strong>Was schadet</strong>' + ul(t.vermeiden) + '</div></div>' +
      (ss ? '<div><strong>Einstiegsstation</strong><div class="row" style="margin-top:6px">' + stationBtn(sl, ss) + '</div></div>' : '') +
      (t.techniken && t.techniken.length ? '<div><strong>Techniken</strong><div class="row" style="margin-top:6px">' + technikChips(t.techniken) + '</div></div>' : '') +
    '</section>';
  }).join('');
  var allMax = Math.max.apply(null, KOMPASS.treiber.map(function (t) { return res.scores[t.id] || 0; }).concat([1]));
  var profil = '<div class="card"><div class="eyebrow">Profil über alle Antriebe</div><div class="bars">' + KOMPASS.treiber.slice().sort(function (a, b) { return (res.scores[b.id] || 0) - (res.scores[a.id] || 0); }).map(function (t) { var v = res.scores[t.id] || 0; return '<div class="bar' + ((res.top || []).indexOf(t.id) >= 0 ? ' top' : '') + '"><span class="bar-l">' + esc(t.name) + '</span><span class="bar-t"><i style="width:' + Math.round(100 * v / allMax) + '%"></i></span><span class="bar-v">' + v + '</span></div>'; }).join('') + '</div></div>';
  var skalen = (KOMPASS.skalen || []).map(function (s) { var v = res.skalen ? res.skalen[s.id] : null; var b = kBand(s, v); if (v == null || !b) return ''; return '<div class="card scale"><div class="eyebrow">' + esc(s.name) + '</div><div class="scale-head"><strong>' + esc(b.name) + '</strong><span class="muted small">' + v + ' %</span></div><div class="bar-t"><i style="width:' + v + '%"></i></div><p class="small" style="margin-top:8px">' + esc(b.text) + '</p></div>'; }).join('');
  var schritte = kSchritte(res);
  var erste = schritte.length ? '<section><h2 class="sh">Deine ersten Schritte. <span>In dieser Reihenfolge.</span></h2><div class="steps">' + schritte.map(function (s) { return '<div role="button" tabindex="0" data-go="' + esc(s.go) + '"' + (s.linie ? ' data-linie="' + esc(s.linie) + '" data-station="' + esc(s.station) + '"' : '') + (s.technik ? ' data-technik="' + esc(s.technik) + '"' : '') + ' style="cursor:pointer"><strong>' + esc(s.t) + '</strong><p class="small muted" style="margin-top:4px">' + esc(s.x) + '</p></div>'; }).join('') + '</div></section>' : '';
  var hinw = res.hinweise && res.hinweise.length ? '<section><h2 class="sh">Was deine Antworten noch zeigen. <span>Hinweise für dein Vorgehen.</span></h2><ul class="hints">' + res.hinweise.map(function (h) { return '<li>' + esc(h) + '</li>'; }).join('') + '</ul></section>' : '';
  var duenn = (res.abdeckung || []).filter(function (a) { return a.von && a.n < a.von / 2; });
  var cover = res.abdeckung ? '<div class="note"><strong>Abdeckung</strong>' + res.beantwortet + ' von ' + KOMPASS.fragen.length + ' Fragen beantwortet.' + (duenn.length ? ' In diesen Richtungen hast du erst wenig beantwortet: ' + esc(duenn.map(function (a) { return a.name; }).join(', ')) + '. Mit mehr Antworten wird das Bild schärfer.' : ' Alle Richtungen sind gut abgedeckt.') + ' <button class="link" data-act="kompass-edit">Antworten ergänzen ›</button></div>' : '';
  return '<div class="stack-lg">' +
    '<div class="page-head"><div class="eyebrow">Erstellt am ' + esc(res.datum) + '</div><h1>Dein Fahrplan</h1><p>' + esc(KOMPASS.hinweis) + '</p></div>' +
    risks + cover +
    (skalen ? '<section><h2 class="sh">Die Lage auf einen Blick.</h2><div class="grid">' + skalen + '</div></section>' : '') +
    '<div class="grid">' + (stufe ? '<div class="card"><div class="eyebrow">Einbindung</div><strong>' + esc(stufe.name) + '</strong><p class="small">' + esc(stufe.hinweis) + '</p></div>' : '') + (bez ? '<div class="card"><div class="eyebrow">Beziehung</div><strong>' + esc(bez.name) + '</strong><p class="small">' + esc(bez.hinweis) + '</p></div>' : '') + profil + '</div>' +
    erste +
    (treiber || '<div class="note warn">Aus deinen Antworten ließ sich kein klarer Antrieb erkennen. Fang auf Linie 1 mit dem Zuhören an.</div>') + hinw +
    '<div class="row"><button class="btn primary" data-act="share-kompass">Fahrplan teilen</button><button class="btn" data-act="copy-kompass">Als Text kopieren</button><button class="btn" data-act="kompass-edit">Antworten ändern</button><button class="btn" data-act="kompass-reset">Neu beginnen</button></div>' +
  '</div>';
}
function kompassMarkdown(res) {
  var out = ['# Mein Fahrplan (Kompass, ' + res.datum + ')', res.beantwortet + ' von ' + KOMPASS.fragen.length + ' Fragen beantwortet', ''];
  (res.risiko || []).forEach(function (id) { var r = findIn(KOMPASS.risiko, id); if (r) out.push('WARNUNG: ' + r.text + ' – ' + r.aktion, ''); });
  var stufe = findIn(KOMPASS.stufen, res.stufe), bez = findIn(KOMPASS.beziehung, res.beziehung);
  if (stufe) out.push('Einbindung: ' + stufe.name + '. ' + stufe.hinweis);
  if (bez) out.push('Beziehung: ' + bez.name + '. ' + bez.hinweis);
  (KOMPASS.skalen || []).forEach(function (s) { var v = res.skalen ? res.skalen[s.id] : null, b = kBand(s, v); if (b) out.push(s.name + ': ' + b.name + ' (' + v + ' %). ' + b.text); });
  var schritte = kSchritte(res);
  if (schritte.length) { out.push('', '## Erste Schritte'); schritte.forEach(function (s, i) { out.push((i + 1) + '. ' + s.t + ' – ' + s.x); }); }
  (res.top || []).forEach(function (id) {
    var t = findIn(KOMPASS.treiber, id); if (!t) return;
    out.push('', '## Antrieb: ' + t.name, 'Bedürfnis: ' + t.beduerfnis, t.beschreibung, '', 'Was hilft:'); t.zugang.forEach(function (z) { out.push('- ' + z); });
    out.push('', 'Was schadet:'); t.vermeiden.forEach(function (z) { out.push('- ' + z); });
    var sl = t.start ? lineById(t.start.linie) : null, ss = sl ? stationOf(sl, t.start.station) : null;
    if (ss) out.push('', 'Einstieg: Linie ' + (lineIdx(sl.id) + 1) + ' ' + sl.name + ', Station ' + ss.name);
  });
  if (res.hinweise && res.hinweise.length) { out.push('', '## Hinweise'); res.hinweise.forEach(function (h) { out.push('- ' + h); }); }
  return out.join('\n');
}

/* ---------- Trainer ---------- */
function shuffled(arr) { var a = arr.map(function (x, i) { return i; }); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
function vTrainer() {
  if (!SZENARIEN.length) return missing('Trainer');
  var t = state.trainer;
  if (!t) {
    return '<div class="stack-lg"><div class="page-head"><div class="eyebrow">Üben</div><h1>Gesprächstrainer</h1><p>Du liest, was die Person sagt, wählst eine Antwort und bekommst sofort eine Rückmeldung samt der Technik dahinter. Die eine richtige Antwort gibt es selten. Manche Antworten schließen aber Türen.</p></div><div class="grid">' +
      SZENARIEN.map(function (s) { return '<button class="card card-link stack" data-act="trainer-start" data-id="' + esc(s.id) + '"><div class="row">' + ebeneChip(s.ebene) + '</div><strong>' + esc(s.titel) + '</strong><p class="small muted">' + esc(s.kontext) + '</p></button>'; }).join('') + '</div></div>';
  }
  var sz = findIn(SZENARIEN, t.id), node = sz.knoten[t.node];
  if (!node) return '<div class="note bad">Szenario-Knoten fehlt. <button class="btn sm" data-act="trainer-exit">Zurück</button></div>';
  var head = '<div class="page-head"><div class="eyebrow">Szenario · Schritt ' + (t.history.length + 1) + ' · <span class="score">' + t.score + ' / ' + t.max + ' Punkte</span></div><h1>' + esc(sz.titel) + '</h1><p>' + esc(sz.kontext) + ' <em>' + esc(sz.person) + '</em></p></div>';
  if (!node.optionen || !node.optionen.length) {
    return '<div class="stack-lg">' + head + '<div class="bubble"><div class="who">Die Person</div>' + esc(node.aussage) + '</div><div class="panel stack"><h2>Fazit</h2><p>' + esc(node.abschluss || '') + '</p><p class="score">Ergebnis: ' + t.score + ' von ' + t.max + ' Punkten.</p><div class="row"><button class="btn primary" data-act="trainer-start" data-id="' + esc(sz.id) + '">Noch einmal</button><button class="btn" data-act="trainer-exit">Andere Szenarien</button></div></div></div>';
  }
  if (!t.order[t.node]) t.order[t.node] = shuffled(node.optionen);
  var picked = t.chosen != null ? node.optionen[t.chosen] : null;
  var opts = t.order[t.node].map(function (i) { var o = node.optionen[i]; return '<button data-act="trainer-pick" data-idx="' + i + '"' + (picked ? ' disabled' : '') + (picked === o ? ' class="pick"' : '') + '>' + esc(o.text) + '</button>'; }).join('');
  var fb = '';
  if (picked) {
    var cls = picked.bewertung === 'gut' ? 'good' : picked.bewertung === 'ok' ? 'warn' : 'bad';
    var label = picked.bewertung === 'gut' ? 'Gut gewählt' : picked.bewertung === 'ok' ? 'Geht, aber es gibt Besseres' : 'Das schließt eher Türen';
    var tech = picked.technik && technikById(picked.technik);
    fb = '<div class="note ' + cls + ' stack"><strong>' + label + '</strong><p>' + esc(picked.feedback) + '</p>' + (tech ? '<div class="row"><span class="small muted">Technik:</span>' + technikChips([picked.technik]) + '</div>' : '') + '<div><button class="btn primary" data-act="trainer-next">Weiter</button></div></div>';
  }
  return '<div class="stack-lg">' + head + '<div class="bubble"><div class="who">Die Person</div>' + esc(node.aussage) + '</div><div class="choice">' + opts + '</div>' + fb + '<div><button class="btn sm" data-act="trainer-exit">Szenario verlassen</button></div></div>';
}

/* ---------- Kampagne ---------- */
function vKampagne() {
  if (!KAMPAGNE) return missing('Kampagne');
  var tabs = [['planer', 'Planer'], ['segmente', 'Zielgruppen'], ['bausteine', 'Bausteine'], ['phasen', 'Phasen'], ['kennzahlen', 'Wirkung messen']];
  var nav = '<div class="seg" role="tablist">' + tabs.map(function (t) { return '<button type="button" role="tab" aria-pressed="' + (state.kampTab === t[0]) + '" aria-selected="' + (state.kampTab === t[0]) + '" data-act="kamp-tab" data-tab="' + t[0] + '">' + t[1] + '</button>'; }).join('') + '</div>';
  var body = { planer: kampPlaner, segmente: kampSegmente, bausteine: kampBausteine, phasen: kampPhasen, kennzahlen: kampKennzahlen }[state.kampTab]();
  return '<div class="stack-lg"><div class="page-head"><div class="eyebrow">Viele Menschen</div><h1>Kampagnenplaner</h1><p>Für Initiativen, Vereine, Kommunalpolitik und Teams. Der Planer schlägt Bausteine vor, die zu eurer Lage und euren Ressourcen passen. Jeder Baustein nennt seine Evidenzstufe, damit ihr keine Energie in Dinge steckt, die nicht wirken.</p></div>' + nav + body + '</div>';
}
function bausteinCard(b, open) {
  return '<details class="acc"' + (open ? ' open' : '') + '><summary>' + esc(b.name) + ' ' + chip(b.typ) + ev(b.evidenz) + chip('Aufwand ' + b.aufwand) + '</summary><div class="body stack">' +
    '<p>' + esc(b.beschreibung) + '</p><p><strong>Wirkung:</strong> ' + esc(b.wirkung) + '</p>' +
    (b.schritte && b.schritte.length ? '<div><strong>Schritte</strong>' + ol(b.schritte) + '</div>' : '') +
    (b.fallstricke && b.fallstricke.length ? '<div class="note warn"><strong>Fallstricke</strong>' + ul(b.fallstricke) + '</div>' : '') +
    (b.segmente && b.segmente.length ? '<div class="row"><span class="small muted">Zielgruppen:</span>' + b.segmente.map(function (id) { var s = findIn(KAMPAGNE.segmente, id); return s ? chip(s.name) : ''; }).join('') + '</div>' : '') +
    quellen(b.quellen) + '</div></details>';
}
function quellen(q) { return q && q.length ? '<div class="small muted"><strong>Quellen:</strong> ' + q.map(function (s) { return s.url ? '<a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.titel) + '</a>' + (s.jahr ? ' (' + esc(s.jahr) + ')' : '') : esc(s.titel) + (s.jahr ? ' (' + esc(s.jahr) + ')' : ''); }).join(' · ') + '</div>' : ''; }
function kampPlaner() {
  var plan = store.get('kampagne', null), P = KAMPAGNE.planer;
  if (plan && !state.kampEdit) {
    var byPhase = phaseRoute(KAMPAGNE.phasen, plan.bausteine);
    var rest = plan.bausteine.filter(function (id) { return !KAMPAGNE.phasen.some(function (ph) { return ph.bausteine.indexOf(id) >= 0; }); }).map(function (id) { var b = findIn(KAMPAGNE.bausteine, id); return b ? bausteinCard(b, false) : ''; }).join('');
    return '<div class="stack-lg"><div class="note">Dein Plan vom ' + esc(plan.datum) + ': ' + plan.bausteine.length + ' Bausteine, nach Phasen sortiert. Deine Angaben: ' + esc(plan.labels.join(' · ')) + '</div>' + byPhase + (rest ? '<section class="stack"><h2>Weitere Bausteine</h2><div class="faq">' + rest + '</div></section>' : '') +
      '<div class="row"><button class="btn primary" data-act="share-kampagne">Plan teilen</button><button class="btn" data-act="copy-kampagne">Als Text kopieren</button><button class="btn" data-act="kamp-edit">Angaben ändern</button><button class="btn" data-act="kamp-reset">Neu beginnen</button></div></div>';
  }
  var answers = plan && plan.answers ? plan.answers : {};
  return '<form class="panel" data-form="kampagne">' + P.fragen.map(function (f, i) {
    return group(f.text, '', f.optionen.map(function (o) { return optRow('radio', f.id, 'kp-' + f.id + '-' + o.id, o.id, o.text, answers[f.id] === o.id); }).join(''), 'Frage ' + (i + 1) + ' von ' + P.fragen.length);
  }).join('') + '<div class="form-end"><button class="btn primary" type="submit">Plan erstellen</button>' + (plan ? '<button class="btn" type="button" data-act="kamp-cancel">Abbrechen</button>' : '') + '</div></form>';
}
function evalKampagne(form) {
  var answers = {}, labels = [], score = {};
  KAMPAGNE.bausteine.forEach(function (b) { score[b.id] = 0; });
  KAMPAGNE.planer.fragen.forEach(function (f) {
    var i = $('input[name="' + f.id + '"]:checked', form); if (!i) return;
    answers[f.id] = i.value; var o = findIn(f.optionen, i.value); if (!o) return; labels.push(o.text);
    (o.empfiehlt || []).forEach(function (id) { score[id] = (score[id] || 0) + 2; });
    (o.meidet || []).forEach(function (id) { score[id] = (score[id] || 0) - 3; });
  });
  var ids = Object.keys(score).filter(function (id) { return score[id] > 0 && findIn(KAMPAGNE.bausteine, id); }).sort(function (a, b) { return score[b] - score[a]; });
  store.set('kampagne', { answers: answers, labels: labels, bausteine: ids, datum: today() });
  state.kampEdit = false;
}
function kampagneMarkdown(plan) {
  var out = ['# Kampagnenplan (' + plan.datum + ')', 'Angaben: ' + plan.labels.join(', '), ''];
  KAMPAGNE.phasen.forEach(function (ph) {
    var bs = plan.bausteine.filter(function (id) { return ph.bausteine.indexOf(id) >= 0; }).map(function (id) { return findIn(KAMPAGNE.bausteine, id); }).filter(Boolean);
    if (!bs.length) return;
    out.push('## ' + ph.name + ' (' + ph.dauer + ')'); (ph.ziele || []).forEach(function (z) { out.push('Ziel: ' + z); });
    bs.forEach(function (b) { out.push('', '### ' + b.name + ' [Evidenz: ' + b.evidenz + ', Aufwand: ' + b.aufwand + ']', b.beschreibung); (b.schritte || []).forEach(function (s, i) { out.push((i + 1) + '. ' + s); }); (b.fallstricke || []).forEach(function (s) { out.push('Fallstrick: ' + s); }); });
    out.push('');
  });
  return out.join('\n');
}
function kampSegmente() {
  return '<div class="grid">' + KAMPAGNE.segmente.map(function (s) {
    return '<div class="card stack"><div class="row"><strong>' + esc(s.name) + '</strong>' + chip('Erreichbarkeit ' + s.erreichbar) + '</div><p class="small">' + esc(s.beschreibung) + '</p>' +
      '<div><div class="eyebrow">Motive</div>' + ul(s.motive) + '</div><div class="note good small"><strong>Was wirkt</strong>' + ul(s.wirkt) + '</div><div class="note bad small"><strong>Was schadet</strong>' + ul(s.schadet) + '</div>' +
      '<div class="small"><strong>Kanäle:</strong> ' + esc((s.kanaele || []).join(', ')) + '</div><div class="small"><strong>Glaubwürdige Botschafter:</strong> ' + esc((s.botschafter || []).join(', ')) + '</div></div>';
  }).join('') + '</div>';
}
function kampBausteine() {
  var typen = ['alle', 'format', 'kanal', 'botschaft', 'messung'];
  var f = seg('bausteinTyp', typen.map(function (t) { return [t, t === 'alle' ? 'Alle' : t.charAt(0).toUpperCase() + t.slice(1)]; }));
  var list = KAMPAGNE.bausteine.filter(function (b) { return state.bausteinTyp === 'alle' || b.typ === state.bausteinTyp; }).map(function (b) { return bausteinCard(b, false); }).join('');
  return '<div class="stack">' + f + '<div class="faq">' + list + '</div></div>';
}
function phaseRoute(phasen, only) {
  var col = (lineById('oeffentlichkeit') || {}).farbe || '#c2410c';
  var selId = state.phase === '' ? null : (state.phase && findIn(phasen, state.phase) ? state.phase : (phasen[0] || {}).id);
  return '<div class="route" style="--lc:' + esc(col) + '">' + phasen.map(function (ph, i) {
    var ids = (ph.bausteine || []).filter(function (id) { return !only || only.indexOf(id) >= 0; });
    var bs = ids.map(function (id) { return findIn(KAMPAGNE.bausteine, id); }).filter(Boolean);
    var sel = ph.id === selId, next = phasen[i + 1];
    var kz = (ph.kennzahlen || []).map(function (id) { var k = findIn(KAMPAGNE.kennzahlen, id); return k ? chip(k.name) : ''; }).join('');
    var body = sel ? '<div class="stop-body">' +
      (ph.ziele && ph.ziele.length ? '<div><h4>Ziele dieser Phase</h4>' + ul(ph.ziele) + '</div>' : '') +
      '<div><h4>' + (only ? 'Empfohlene Bausteine' : 'Bausteine') + '</h4>' + (bs.length ? '<div class="faq">' + bs.map(function (b) { return bausteinCard(b, false); }).join('') + '</div>' : '<p class="muted small">Für diese Phase gibt es keine Empfehlung. Sieh im Reiter „Bausteine“ nach, was sonst passt.</p>') + '</div>' +
      (kz ? '<div><h4>Woran ihr merkt, ob es wirkt</h4><div class="row">' + kz + '</div></div>' : '') +
      (next ? '<div class="row"><button class="btn" data-act="phase" data-id="' + esc(next.id) + '">Weiter zu „' + esc(next.name) + '“</button></div>' : '<p class="muted small">Letzte Phase. Danach beginnt der Kreislauf von vorn, wieder mit dem Zuhören.</p>') +
      '</div>' : '';
    return '<div class="stop' + (sel ? ' sel' : '') + '" id="phase-' + esc(ph.id) + '"><div class="stop-dot" aria-hidden="true">' + (i + 1) + '</div><div class="stop-card"' + (sel ? '' : ' data-act="phase" data-id="' + esc(ph.id) + '"') + '>' +
      '<div class="stop-head" role="button" tabindex="0" data-act="phase" data-id="' + (sel ? '' : esc(ph.id)) + '" aria-expanded="' + (sel ? 'true' : 'false') + '"><div class="stop-title"><span class="tag">' + esc(ph.dauer) + '</span><h3>' + esc(ph.name) + '</h3><p class="muted small">' + esc((ph.ziele || [])[0] || '') + '</p></div><div class="row stop-meta">' + chip(bs.length + (bs.length === 1 ? ' Baustein' : ' Bausteine')) + '</div><span class="chev" aria-hidden="true"></span></div>' + body + '</div></div>';
  }).join('') + '</div>';
}
function kampPhasen() {
  return '<div class="stack"><p class="muted small">Eine Kampagne ist eine Strecke, und jede Phase baut auf der vorigen auf. Tippe auf eine Phase, um Ziele, Bausteine und Kennzahlen zu sehen.</p>' + phaseRoute(KAMPAGNE.phasen, null) + '</div>';
}
function kampKennzahlen() {
  var rows = KAMPAGNE.kennzahlen.map(function (k) { return '<tr><td><strong>' + esc(k.name) + '</strong></td><td>' + esc(k.wie) + '</td><td>' + esc(k.warum) + '</td><td>' + esc(k.fallstrick) + '</td></tr>'; }).join('');
  var zh = MESSUNG && MESSUNG.zeithorizont ? '<div class="note">' + paras(MESSUNG.zeithorizont) + '</div>' : '';
  return '<div class="stack">' + zh + '<div class="tbl-wrap"><table><thead><tr><th>Kennzahl</th><th>So messt ihr</th><th>Warum</th><th>Fallstrick</th></tr></thead><tbody>' + rows + '</tbody></table></div></div>';
}

/* ---------- Wissen ---------- */
function vWissen() {
  if (!TECHNIKEN.length) return missing('Wissen');
  var fe = seg('wissenEbene', [['alle', 'Alle'], ['individuum', 'Einzelperson'], ['masse', 'Viele Menschen']]);
  var fv = seg('wissenEv', ['alle', 'stark', 'mittel', 'schwach', 'umstritten'].map(function (e) { return [e, e === 'alle' ? 'Alle Evidenzstufen' : e.charAt(0).toUpperCase() + e.slice(1)]; }));
  var list = TECHNIKEN.filter(function (t) { return (state.wissenEbene === 'alle' || t.ebene === state.wissenEbene || t.ebene === 'beide') && (state.wissenEv === 'alle' || t.evidenz === state.wissenEv); }).map(function (t) {
    var open = state.technik === t.id;
    return '<details class="acc" id="t-' + esc(t.id) + '"' + (open ? ' open' : '') + '><summary>' + esc(t.name) + ' ' + ev(t.evidenz) + ebeneChip(t.ebene) + '</summary><div class="body stack">' +
      '<p><strong>' + esc(t.kurz) + '</strong></p>' + paras(t.beschreibung) +
      '<div class="station-detail"><div><h4>So geht’s</h4>' + ol(t.so_gehts) + '</div><div class="note bad"><strong>Was schiefgehen kann</strong>' + ul(t.nicht) + '</div></div>' +
      (t.beispiel ? '<div class="quote">' + esc(t.beispiel) + '</div>' : '') + quellen(t.quellen) + '</div></details>';
  }).join('');
  return '<div class="stack-lg"><div class="page-head"><div class="eyebrow">Wissensbasis</div><h1>Techniken und Evidenz</h1><p>Jede Technik mit Herkunft, Vorgehen, Beispiel, Grenzen und Quellen. Die Evidenzstufe zeigt, wie belastbar die Befunde sind.</p></div><div class="row">' + fe + fv + '</div><div class="faq">' + (list || '<div class="empty">Keine Technik passt zu diesem Filter.</div>') + '</div></div>';
}

/* ---------- Leitplanken und Hilfe ---------- */
function vLeitplanken() {
  if (!LEIT) return missing('Leitplanken');
  var g = (LEIT.grundsaetze || []).map(function (x) { return '<details class="acc"><summary>' + esc(x.titel) + '</summary><div class="body stack"><p>' + esc(x.text) + '</p><p class="muted small"><strong>Warum:</strong> ' + esc(x.warum) + '</p>' + quellen(x.quelle ? [x.quelle] : []) + '</div></details>'; }).join('');
  var r = (LEIT.rote_linien || []).map(function (x) { return '<tr><td>' + esc(x.text) + '</td><td>' + esc(x.stattdessen) + '</td></tr>'; }).join('');
  var gef = (LEIT.gefahr || []).map(function (x) { return '<div class="note bad stack"><strong>' + esc(x.signal) + '</strong><p>' + esc(x.aktion) + '</p><p class="small"><strong>Anlaufstelle:</strong> ' + esc(x.anlaufstelle) + '</p></div>'; }).join('');
  var s = (LEIT.selbstschutz || []).map(function (x) { return '<div class="card"><strong>' + esc(x.titel) + '</strong><p class="small">' + esc(x.text) + '</p></div>'; }).join('');
  var ds = LEIT.datenschutz ? '<div class="note stack"><strong>' + esc(LEIT.datenschutz.kurz) + '</strong>' + ul(LEIT.datenschutz.regeln) + '</div>' : '';
  var groups = {};
  HILFE.forEach(function (h) { (groups[h.fuer] = groups[h.fuer] || []).push(h); });
  var hilfe = Object.keys(groups).map(function (k) {
    return '<section class="stack"><h3>' + esc(k) + '</h3><div class="grid">' + groups[k].map(function (h) { return '<div class="card stack"><div class="row"><strong>' + esc(h.name) + '</strong>' + chip(h.region) + '</div><p class="small">' + esc(h.beschreibung) + '</p>' + (h.url ? '<a class="small" href="' + esc(h.url) + '" target="_blank" rel="noopener">' + esc(h.url.replace(/^https?:\/\//, '')) + '</a>' : '') + (h.telefon ? '<div class="small"><strong>Telefon:</strong> <span style="user-select:all">' + esc(h.telefon) + '</span></div>' : '') + '</div>'; }).join('') + '</div></section>';
  }).join('');
  return '<div class="stack-lg"><div class="page-head"><div class="eyebrow">Ethik, Recht, Sicherheit</div><h1>Leitplanken</h1><p>Diese Regeln gelten auf allen Linien. Sie schützen die Person, dich und eure Beziehung – und sie bewahren dich davor, Menschen zu überwältigen, statt sie zu überzeugen.</p></div>' +
    '<section class="stack"><h2>Grundsätze</h2><div class="faq">' + g + '</div></section>' +
    (r ? '<section class="stack"><h2>Rote Linien</h2><div class="tbl-wrap"><table><thead><tr><th>Nicht so</th><th>Stattdessen</th></tr></thead><tbody>' + r + '</tbody></table></div></section>' : '') +
    (gef ? '<section class="stack"><h2>Wenn es gefährlich wird</h2>' + gef + '</section>' : '') +
    (s ? '<section class="stack"><h2>Selbstschutz</h2><div class="grid">' + s + '</div></section>' : '') +
    (ds ? '<section class="stack"><h2>Datenschutz</h2>' + ds + '</section>' : '') +
    (hilfe ? '<section class="stack" id="hilfe"><h2>Anlaufstellen</h2>' + hilfe + '</section>' : '') + '</div>';
}

/* ---------- Tagebuch ---------- */
function vTagebuch() {
  var entries = store.get('tagebuch', []);
  var pre = state.prefill || {};
  var stufen = MESSUNG && MESSUNG.stufen ? MESSUNG.stufen : [];
  var lineOpts = '<option value="">– keine –</option>' + LINIEN.map(function (l) { return '<option value="' + esc(l.id) + '"' + (pre.linie === l.id ? ' selected' : '') + '>' + (lineIdx(l.id) + 1) + ' ' + esc(l.name) + '</option>'; }).join('');
  var stOpts = stationOptions(pre.linie, pre.station);
  var stufeOpts = '<option value="">– offen –</option>' + stufen.map(function (s) { return '<option value="' + esc(s.id) + '">' + esc(s.name) + '</option>'; }).join('');
  var hint = LEIT && LEIT.datenschutz ? LEIT.datenschutz.hinweis_tagebuch : 'Nutze Pseudonyme. Die Einträge bleiben nur in diesem Browser.';
  var byAlias = {};
  entries.forEach(function (e) { (byAlias[e.alias] = byAlias[e.alias] || []).push(e); });
  var list = Object.keys(byAlias).map(function (a) {
    var items = byAlias[a].sort(function (x, y) { return x.datum < y.datum ? 1 : -1; }).map(function (e) {
      var l = e.linie ? lineById(e.linie) : null, s = l ? stationOf(l, e.station) : null, st = findIn(stufen, e.stufe);
      var del = state.confirmDel === e.id ? '<span class="row"><span class="small">Wirklich löschen?</span><button class="btn sm danger" data-act="tb-del-yes" data-id="' + esc(e.id) + '">Ja</button><button class="btn sm" data-act="tb-del-no">Nein</button></span>' : '<button class="btn sm" data-act="tb-del" data-id="' + esc(e.id) + '">Löschen</button>';
      return '<div class="card stack"><div class="row"><span class="eyebrow">' + esc(e.datum) + '</span>' + (s ? stationBtn(l, s) : '') + (st ? chip(st.name) : '') + '<span style="margin-left:auto">' + del + '</span></div>' + paras(e.notiz) + (e.naechster ? '<p class="small"><strong>Nächster Schritt:</strong> ' + esc(e.naechster) + '</p>' : '') + '</div>';
    }).join('');
    return '<details class="acc" open><summary>' + esc(a) + ' <span class="small muted">' + byAlias[a].length + (byAlias[a].length === 1 ? ' Eintrag' : ' Einträge') + '</span></summary><div class="body stack">' + items + '</div></details>';
  }).join('');
  var stufenInfo = stufen.length ? '<details class="acc"><summary>Verlaufsstufen und ihre Signale</summary><div class="body"><div class="steps">' + stufen.map(function (s) { return '<div><strong>' + esc(s.name) + '</strong><p class="small muted">' + esc(s.beschreibung) + '</p>' + ul(s.signale, 'small') + '<p class="small"><strong>Nächster Schritt:</strong> ' + esc(s.naechster_schritt) + '</p></div>'; }).join('') + '</div></div></details>' : '';
  return '<div class="stack-lg"><div class="page-head"><div class="eyebrow">Verlauf</div><h1>Tagebuch</h1><p>Kurze Notizen nach einem Gespräch helfen dir, Muster zu erkennen und den nächsten Schritt zu planen. Das Tagebuch ist ein Werkzeug zur Selbstreflexion, keine Akte über eine Person.</p></div>' +
    '<div class="note warn">' + esc(hint) + '</div>' + stufenInfo +
    '<form class="panel form-grid" data-form="tagebuch">' +
      '<label class="fld">Pseudonym<input type="text" name="alias" id="tb-alias" required placeholder="z. B. Person A" value="' + esc(pre.alias || '') + '"></label>' +
      '<label class="fld">Datum<input type="date" name="datum" id="tb-datum" value="' + today() + '"></label>' +
      '<label class="fld">Linie<select name="linie" id="tb-linie">' + lineOpts + '</select></label>' +
      '<label class="fld">Station<select name="station" id="tb-station">' + stOpts + '</select></label>' +
      '<label class="fld">Verlaufsstufe<select name="stufe" id="tb-stufe">' + stufeOpts + '</select></label>' +
      '<label class="fld wide">Was ist passiert, was hat gewirkt, was nicht?<textarea name="notiz" id="tb-notiz" required></textarea></label>' +
      '<label class="fld wide">Nächster Schritt<input type="text" name="naechster" id="tb-naechster"></label>' +
      '<div class="wide row"><button class="btn primary" type="submit">Eintrag speichern</button></div></form>' +
    '<section class="stack"><h2>Einträge</h2>' + (list ? '<div class="faq">' + list + '</div>' : '<div class="empty">Noch keine Einträge.</div>') + '</section>' +
    '<details class="acc" id="sicherung"><summary>Sichern und auf ein anderes Gerät übertragen</summary><div class="body stack">' +
      '<p class="small muted">Die Sicherung enthält Kompass-Ergebnis, Kampagnenplan und Tagebuch. Schick sie dir selbst – per Signal, per Mail oder in deine Notizen – oder speichere sie als Datei. Auf dem anderen Gerät spielst du sie an dieser Stelle wieder ein.</p>' +
      '<div class="row"><button class="btn primary" data-act="bk-share">Sicherung teilen</button>' + (HOSTED ? '<button class="btn" data-act="bk-download">Als Datei speichern</button><label class="btn" for="bk-file">Datei einspielen<input type="file" id="bk-file" accept="application/json,.json" hidden></label>' : '') + '<button class="btn" data-act="bk-copy">Kopieren</button></div>' +
      '<label class="fld">Oder Sicherungstext einfügen<textarea id="bk-io" placeholder="Hier den kopierten Sicherungstext einfügen"></textarea></label>' +
      '<div class="row"><button class="btn sm" data-act="bk-import">Einspielen</button>' + (state.confirmClear ? '<span class="row"><span class="small">Alle Tagebuch-Einträge wirklich löschen?</span><button class="btn sm danger" data-act="tb-clear-yes">Ja</button><button class="btn sm" data-act="tb-clear-no">Nein</button></span>' : '<button class="btn sm danger" data-act="tb-clear">Tagebuch löschen</button>') + '</div></div></details></div>';
}
function stationOptions(lid, sid) {
  var l = lid ? lineById(lid) : null;
  return '<option value="">– keine –</option>' + (l ? l.stationen.map(function (s) { return '<option value="' + esc(s.id) + '"' + (sid === s.id ? ' selected' : '') + '>' + esc(s.name) + '</option>'; }).join('') : '');
}

/* ---------- Antworten-Playbook, Archiv, Mein Fall ---------- */
function fallGet() { var f = store.get('fall', null); return f && f.argumente ? f : { argumente: [], antworten: {} }; }
function fallSet(f) { store.set('fall', f); }
function archGet() { var a = store.get('archiv', null); return a && a.eintraege ? a : { eintraege: [], pins: [] }; }
function archSet(a) { store.set('archiv', a); }
function archAdd(e) {
  var a = archGet();
  if (a.eintraege.some(function (x) { return x.text === e.text; })) { toast('Steht schon im Archiv'); return; }
  e.id = uid(); e.datum = today(); a.eintraege.unshift(e); archSet(a); toast('Im Archiv gespeichert');
}
function archBtn(typ, text, herkunft, url, quelle) {
  return '<button type="button" class="chip btn-chip arch" data-act="arch-add" data-typ="' + esc(typ) + '" data-text="' + esc(text) + '" data-herkunft="' + esc(herkunft || '') + '"' + (url ? ' data-url="' + esc(url) + '"' : '') + (quelle ? ' data-quelle="' + esc(quelle) + '"' : '') + ' title="Ins Archiv speichern">+ Archiv</button>';
}
function argById(id) { return ARG ? findIn(ARG.argumente, id) : null; }
function katName(id) { var k = ARG ? findIn(ARG.kategorien, id) : null; return k ? k.name : id; }
function plain(s) { return String(s || '').trim().replace(/^[„"“]+/, '').replace(/[“"„]+$/, ''); }
function sagenRows(list, herkunft) { return (list || []).map(function (s) { var t = plain(s); return '<div class="say"><span class="say-t">„' + esc(t) + '“</span>' + archBtn('satz', t, herkunft) + '</div>'; }).join(''); }
function faktRows(list, herkunft) {
  return (list || []).map(function (f) {
    var q = f.quelle || {};
    return '<div class="fakt"><p><strong>' + esc(f.aussage) + '</strong></p><p class="small muted">' + esc(f.so_nutzen) + '</p><div class="row">' + (q.titel ? '<span class="small">' + (q.url ? '<a href="' + esc(q.url) + '" target="_blank" rel="noopener">' + esc(q.titel) + '</a>' : esc(q.titel)) + (q.jahr ? ' (' + esc(q.jahr) + ')' : '') + '</span>' : '') + archBtn('fakt', f.aussage, herkunft, q.url, q.titel) + '</div></div>';
  }).join('');
}
function playbook(a, kompakt) {
  var h = a.titel;
  var schritte = (a.schritte || []).map(function (s, i) { return '<div class="phase"><div class="phase-n">' + (i + 1) + '</div><div class="phase-b"><h4>' + esc(s.phase) + '</h4>' + sagenRows(kompakt ? s.sagen.slice(0, 1) : s.sagen, h) + '</div></div>'; }).join('');
  var wd = (a.wenn_dann || []).slice(0, kompakt ? 2 : 99).map(function (w) { return '<div class="wd"><div class="wd-w"><span class="tag">Wenn</span><p>' + esc(w.wenn) + '</p></div><div class="wd-d"><span class="tag">Dann</span><p>' + esc(w.dann) + '</p>' + archBtn('satz', w.dann, h) + '</div></div>'; }).join('');
  var inFall = fallGet().argumente.indexOf(a.id) >= 0;
  return '<div class="stack-lg pb">' +
    '<div class="station-detail"><div class="note"><strong>Was dahintersteckt</strong>' + paras(a.dahinter) + '</div><div class="note good"><strong>Tonalität</strong>' + paras(a.tonalitaet) + '</div></div>' +
    '<div class="note bad"><strong>No-go</strong><div class="row">' + (a.nogo || []).map(function (x) { return chip(x); }).join('') + '</div></div>' +
    '<section><h3>Was du sagen kannst, Schritt für Schritt</h3><div class="phases">' + schritte + '</div></section>' +
    (wd ? '<section><h3>Wenn die Person so reagiert</h3><div class="stack">' + wd + '</div></section>' : '') +
    (!kompakt && a.fakten && a.fakten.length ? '<section><h3>Fakten, die tragen</h3><p class="small muted">Erst das Erlebnis anerkennen, dann höchstens ein Fakt, dann zurück zur Beziehung.</p><div class="grid">' + faktRows(a.fakten, h) + '</div></section>' : '') +
    (!kompakt && a.fallstricke && a.fallstricke.length ? '<div class="note warn"><strong>Fallstricke</strong>' + ul(a.fallstricke) + '</div>' : '') +
    '<div class="row">' + (a.techniken && a.techniken.length ? '<span class="small muted">Techniken:</span>' + technikChips(a.techniken) : '') + '<span style="margin-left:auto"></span><button class="btn sm' + (inFall ? '' : ' primary') + '" data-act="fall-arg" data-id="' + esc(a.id) + '">' + (inFall ? 'Aus meinem Fall entfernen' : 'Die Person sagt das: zu meinem Fall') + '</button>' + (kompakt ? '<button class="btn sm" data-go="antworten" data-arg="' + esc(a.id) + '">Ganzes Playbook</button>' : '') + '</div>' +
  '</div>';
}
function vAntworten() {
  if (!ARG) return missing('Antworten');
  var tabs = [['argumente', 'Argumente'], ['verhalten', 'Verhalten'], ['studien', 'Studien lesen']];
  var nav = '<div class="seg" role="tablist">' + tabs.map(function (t) { return '<button type="button" role="tab" aria-pressed="' + (state.antTab === t[0]) + '" data-act="ant-tab" data-tab="' + t[0] + '">' + t[1] + '</button>'; }).join('') + '</div>';
  var body = '';
  if (state.antTab === 'verhalten') {
    body = '<div class="faq">' + (ARG.verhalten || []).map(function (v) { return '<details class="acc"><summary>' + esc(v.verhalten) + '</summary><div class="body stack"><p class="muted">' + esc(v.dahinter) + '</p><div class="station-detail"><div><h4>So verhältst du dich</h4>' + ol(v.dann) + '</div><div class="note bad"><strong>Macht es schlimmer</strong>' + ul(v.nicht) + '</div></div><div><h4>Was du sagen kannst</h4>' + sagenRows(v.sagen, v.verhalten) + '</div></div></details>'; }).join('') + '</div>';
  } else if (state.antTab === 'studien') {
    body = '<p class="muted" style="max-width:62ch">Zahlen sind in diesen Gesprächen selten das Problem, ihre Deutung schon. Diese Regeln helfen dir, eine Zahl gemeinsam mit der Person zu prüfen, statt sie ihr entgegenzuhalten.</p><div class="faq">' + (ARG.studien_lesen || []).map(function (s) { return '<details class="acc"><summary>' + esc(s.titel) + '</summary><div class="body stack">' + paras(s.text) + '<div class="quote">' + esc(s.beispiel) + '</div></div></details>'; }).join('') + '</div>';
  } else {
    var q = (state.argQ || '').toLowerCase();
    var kats = [['alle', 'Alle']].concat((ARG.kategorien || []).map(function (k) { return [k.id, k.name]; }));
    var list = (ARG.argumente || []).filter(function (a) { return (state.argKat === 'alle' || !state.argKat || a.kategorie === state.argKat) && (!q || (a.titel + ' ' + (a.varianten || []).join(' ')).toLowerCase().indexOf(q) >= 0); });
    var sel = state.arg ? argById(state.arg) : null;
    body = '<div class="row"><input type="text" id="arg-q" placeholder="Argument suchen, zum Beispiel „Medien“" value="' + esc(state.argQ || '') + '" style="max-width:360px"></div>' + seg('argKat', kats) +
      (sel ? '<section class="panel stack"><div class="row"><span class="tag">' + esc(katName(sel.kategorie)) + '</span><button class="link" style="margin-left:auto" data-act="arg-open" data-id="">Schließen</button></div><h2>„' + esc(sel.titel) + '“</h2><div class="row">' + (sel.varianten || []).map(function (v) { return chip(v); }).join('') + '</div>' + playbook(sel, false) + '</section>' : '') +
      '<div class="grid">' + list.map(function (a) { var on = fallGet().argumente.indexOf(a.id) >= 0; return '<div class="card card-link stack" role="button" tabindex="0" data-act="arg-open" data-id="' + esc(a.id) + '"><div class="row"><span class="tag">' + esc(katName(a.kategorie)) + '</span>' + (on ? chip('Mein Fall') : '') + '</div><strong>„' + esc(a.titel) + '“</strong><p class="small muted">' + esc((a.varianten || []).join(' · ')) + '</p></div>'; }).join('') + '</div>' + (list.length ? '' : '<div class="empty">Kein Argument passt zur Suche.</div>');
  }
  return '<div class="stack-lg"><div class="page-head"><div class="eyebrow">Playbook</div><h1>Antworten</h1><p>Wenn die Person das sagt, dann sag das. Für jedes Argument: was dahintersteckt, welcher Ton trägt, welche Wörter alles kaputt machen, wörtliche Sätze vom Anerkennen bis zum Zweifel, Wenn-dann-Regeln und belegte Fakten. Jeden Satz kannst du ins Archiv legen.</p></div>' + nav + body + '</div>';
}
var RETTUNG = ['Erzähl mir mehr. Wie bist du darauf gekommen?', 'Ich merke, das ist dir wichtig. Ich sehe es anders, aber ich will verstehen, warum du das so siehst.', 'Lass uns kurz Pause machen. Ich will das hier nicht kaputtreden, du bist mir wichtiger als das Thema.'];
function vArchiv() {
  var a = archGet(), q = (state.archQ || '').toLowerCase();
  var pins = a.pins.map(function (id) { return findIn(a.eintraege, id); }).filter(Boolean);
  var rettung = (pins.length ? pins.map(function (e) { return e.text; }) : []).concat(RETTUNG).slice(0, 3);
  var list = a.eintraege.filter(function (e) { return !q || (e.text + ' ' + (e.herkunft || '') + ' ' + (e.quelle || '')).toLowerCase().indexOf(q) >= 0; });
  var TYP = { satz: 'Satz', fakt: 'Fakt', link: 'Link', notiz: 'Notiz' };
  var items = list.map(function (e) {
    var pinned = a.pins.indexOf(e.id) >= 0;
    var del = state.confirmDel === e.id ? '<span class="row"><span class="small">Löschen?</span><button class="btn sm danger" data-act="arch-del-yes" data-id="' + esc(e.id) + '">Ja</button><button class="btn sm" data-act="arch-del-no">Nein</button></span>' : '<button class="btn sm" data-act="arch-del" data-id="' + esc(e.id) + '">Löschen</button>';
    return '<div class="card stack"><div class="row">' + chip(TYP[e.typ] || e.typ) + (e.herkunft ? '<span class="small muted">' + esc(e.herkunft) + '</span>' : '') + '<span class="small muted" style="margin-left:auto">' + esc(e.datum || '') + '</span></div><p>' + esc(e.text) + '</p>' + (e.quelle || e.url ? '<p class="small">' + (e.url ? '<a href="' + esc(e.url) + '" target="_blank" rel="noopener">' + esc(e.quelle || e.url) + '</a>' : esc(e.quelle)) + '</p>' : '') + '<div class="row"><button class="btn sm' + (pinned ? ' primary' : '') + '" data-act="arch-pin" data-id="' + esc(e.id) + '">' + (pinned ? 'Rettungssatz' : 'Als Rettungssatz') + '</button><button class="btn sm" data-act="copy-text" data-text="' + esc(e.text) + '">Kopieren</button><span style="margin-left:auto">' + del + '</span></div></div>';
  }).join('');
  return '<div class="stack-lg"><div class="page-head"><div class="eyebrow">Dein Archiv</div><h1>Archiv</h1><p>Sätze, Fakten und Links aus der App sowie eigene Notizen, zur Vorbereitung und als Gedankenstütze, wenn im Gespräch der Kopf leer wird. Bleibt nur auf deinem Gerät und ist in der Sicherung enthalten.</p></div>' +
    '<section class="bubble"><div class="who">Blackout? Drei Sätze, die immer gehen</div>' + rettung.map(function (s, i) { return '<p class="rett">' + (i + 1) + '. „' + esc(plain(s)) + '“</p>'; }).join('') + '<p class="small" style="opacity:.7;margin-top:10px">Markiere eigene Einträge als Rettungssatz, dann stehen sie hier.</p></section>' +
    '<form class="panel form-grid" data-form="archiv"><label class="fld">Art<select name="typ" id="ar-typ"><option value="notiz">Notiz</option><option value="satz">Satz</option><option value="fakt">Fakt</option><option value="link">Link</option></select></label><label class="fld">Woher<input type="text" name="herkunft" id="ar-herkunft" placeholder="zum Beispiel: eigenes Gespräch, Artikel"></label><label class="fld wide">Text<textarea name="text" id="ar-text" required placeholder="Ein Satz, ein Fakt, ein Gedanke"></textarea></label><label class="fld">Link<input type="text" name="url" id="ar-url" placeholder="https://…"></label><label class="fld">Quelle<input type="text" name="quelle" id="ar-quelle" placeholder="Titel der Quelle"></label><div class="wide row"><button class="btn primary" type="submit">Speichern</button></div></form>' +
    '<section class="stack"><div class="row"><h2>Einträge</h2><input type="text" id="arch-q" placeholder="Suchen" value="' + esc(state.archQ || '') + '" style="max-width:260px;margin-left:auto"></div>' + (items || '<div class="empty">Noch nichts gespeichert. Im Playbook unter „Antworten“ steht an jedem Satz „+ Archiv“.</div>') + '</section></div>';
}
function fallHub(res) {
  var f = fallGet(), tab = state.fallTab || 'einstellung';
  var tabs = [['einstellung', 'Deine innere Einstellung'], ['person', 'Die Einstellung der Person'], ['argumente', 'Die Argumente der Person'], ['antworten', 'Deine Antworten bislang'], ['empfehlungen', 'Empfehlungen'], ['archiv', 'Archiv']];
  var nav = '<div class="knav">' + tabs.map(function (t, i) { return '<button type="button" class="' + (tab === t[0] ? 'cur' : '') + '" data-act="fall-tab" data-tab="' + t[0] + '"><span class="n">' + (i + 1) + '</span><span class="t">' + t[1] + '</span></button>'; }).join('') + '</div>';
  var risks = (res.risiko || []).map(function (id) { var r = findIn(KOMPASS.risiko, id); return r ? '<div class="note bad"><strong>' + esc(r.text) + '</strong><p>' + esc(r.aktion) + '</p></div>' : ''; }).join('');
  var skala = function (id) { var s = findIn(KOMPASS.skalen, id), v = res.skalen ? res.skalen[id] : null, b = s && kBand(s, v); return (v == null || !b) ? '' : '<div class="card scale"><div class="eyebrow">' + esc(s.name) + '</div><div class="scale-head"><strong>' + esc(b.name) + '</strong><span class="muted small">' + v + ' %</span></div><div class="bar-t"><i style="width:' + v + '%"></i></div><p class="small" style="margin-top:8px">' + esc(b.text) + '</p></div>'; };
  var hinweiseAus = function (bereiche) { var out = []; KOMPASS.fragen.forEach(function (q) { if (bereiche.indexOf(q.bereich) < 0) return; var a = (res.answers || {})[q.id] || []; q.optionen.forEach(function (o) { if (a.indexOf(o.id) >= 0 && o.hinweis && out.indexOf(o.hinweis) < 0) out.push(o.hinweis); }); }); return out; };
  var body = '';
  if (tab === 'einstellung') {
    var hw = hinweiseAus(['du-selbst', 'beziehung-zu-dir', 'gespraeche']);
    body = '<p class="muted" style="max-width:62ch">Deine Haltung ist der Teil, den du steuern kannst. Hier steht, was deine Antworten über deine Lage sagen und worauf du achten solltest.</p><div class="grid">' + skala('belastung') + skala('kapital') + '</div>' + (hw.length ? '<section><h3>Aus deinen Antworten</h3><ul class="hints">' + hw.map(function (h) { return '<li>' + esc(h) + '</li>'; }).join('') + '</ul></section>' : '') + (LEIT && LEIT.selbstschutz ? '<section><h3>Selbstschutz</h3><div class="grid">' + LEIT.selbstschutz.slice(0, 3).map(function (x) { return '<div class="card"><strong>' + esc(x.titel) + '</strong><p class="small muted">' + esc(x.text) + '</p></div>'; }).join('') + '</div><div class="row" style="margin-top:10px"><button class="link" data-go="leitplanken">Alle Leitplanken ›</button></div></section>' : '');
  } else if (tab === 'person') {
    var stufe = findIn(KOMPASS.stufen, res.stufe), bez = findIn(KOMPASS.beziehung, res.beziehung);
    var allMax = Math.max.apply(null, KOMPASS.treiber.map(function (t) { return res.scores[t.id] || 0; }).concat([1]));
    var profil = '<div class="card"><div class="eyebrow">Profil über alle Antriebe</div><div class="bars">' + KOMPASS.treiber.slice().sort(function (a, b) { return (res.scores[b.id] || 0) - (res.scores[a.id] || 0); }).map(function (t) { var v = res.scores[t.id] || 0; return '<div class="bar' + ((res.top || []).indexOf(t.id) >= 0 ? ' top' : '') + '"><span class="bar-l">' + esc(t.name) + '</span><span class="bar-t"><i style="width:' + Math.round(100 * v / allMax) + '%"></i></span><span class="bar-v">' + v + '</span></div>'; }).join('') + '</div></div>';
    var treiber = (res.top || []).map(function (id) { var t = findIn(KOMPASS.treiber, id); if (!t) return ''; var sl = t.start ? lineById(t.start.linie) : null, ss = sl ? stationOf(sl, t.start.station) : null; return '<section class="panel stack"><div><div class="eyebrow">Antrieb</div><h2>' + esc(t.name) + '</h2><p class="muted"><em>Legitimes Bedürfnis dahinter: ' + esc(t.beduerfnis) + '</em></p></div><p>' + esc(t.beschreibung) + '</p><div class="station-detail"><div class="note good"><strong>Was hilft</strong>' + ul(t.zugang) + '</div><div class="note bad"><strong>Was schadet</strong>' + ul(t.vermeiden) + '</div></div><div class="row">' + (ss ? stationBtn(sl, ss, 'Einstiegsstation') : '') + technikChips(t.techniken) + '</div></section>'; }).join('');
    body = '<div class="grid">' + (stufe ? '<div class="card"><div class="eyebrow">Einbindung</div><strong>' + esc(stufe.name) + '</strong><p class="small">' + esc(stufe.hinweis) + '</p></div>' : '') + (bez ? '<div class="card"><div class="eyebrow">Beziehung</div><strong>' + esc(bez.name) + '</strong><p class="small">' + esc(bez.hinweis) + '</p></div>' : '') + skala('offenheit') + skala('verschwoerung') + profil + '</div>' + treiber;
  } else if (tab === 'argumente') {
    if (!ARG) body = missing('Antworten');
    else body = '<p class="muted" style="max-width:62ch">Welche Sätze sagt die Person tatsächlich? Markiere sie. Daraus entstehen deine Empfehlungen und die Liste, in der du deine bisherigen Antworten festhältst.</p>' + (ARG.kategorien || []).map(function (k) { var as = ARG.argumente.filter(function (a) { return a.kategorie === k.id; }); if (!as.length) return ''; return '<div class="group"><div class="group-title">' + esc(k.name) + '</div><div class="list">' + as.map(function (a) { return '<label class="opt"><input class="vh" type="checkbox" data-fall-arg="' + esc(a.id) + '" id="fa-' + esc(a.id) + '"' + (f.argumente.indexOf(a.id) >= 0 ? ' checked' : '') + '><i class="ck" aria-hidden="true"></i><span>„' + esc(a.titel) + '“</span></label>'; }).join('') + '</div></div>'; }).join('') + '<div class="row"><button class="link" data-go="antworten">Alle Argumente mit Playbook ansehen ›</button></div>';
  } else if (tab === 'antworten') {
    var sel = f.argumente.map(argById).filter(Boolean);
    body = sel.length ? sel.map(function (a) {
      var list = (f.antworten[a.id] || []).map(function (e) { var cls = e.lief === 'gut' ? 'good' : e.lief === 'schlecht' ? 'bad' : 'warn'; return '<div class="note ' + cls + '"><strong>' + esc(e.datum) + ' · lief ' + esc(e.lief) + '</strong><p>' + esc(e.text) + '</p></div>'; }).join('');
      return '<section class="panel stack"><h3>„' + esc(a.titel) + '“</h3>' + (list || '<p class="muted small">Noch keine Antwort notiert.</p>') + '<form class="form-grid" data-form="fall-antwort" data-arg="' + esc(a.id) + '"><label class="fld wide">Was hast du bisher darauf geantwortet?<textarea name="text" id="fa-text-' + esc(a.id) + '" required></textarea></label><label class="fld">Wie lief es?<select name="lief" id="fa-lief-' + esc(a.id) + '"><option value="gut">Gut, die Person blieb im Gespräch</option><option value="ok">Unentschieden</option><option value="schlecht">Schlecht, es eskalierte oder endete</option></select></label><div class="row" style="align-self:end"><button class="btn sm primary" type="submit">Notieren</button></div></form></section>';
    }).join('') : '<div class="empty">Markiere zuerst unter „Die Argumente der Person“, welche Sätze die Person sagt.</div>';
  } else if (tab === 'empfehlungen') {
    var sO = findIn(KOMPASS.skalen, 'offenheit'), bO = sO && kBand(sO, res.skalen && res.skalen.offenheit);
    var sel2 = f.argumente.map(argById).filter(Boolean);
    var schritte = kSchritte(res);
    body = (bO ? '<div class="note"><strong>Tempo: ' + esc(bO.name) + '</strong><p>' + esc(bO.text) + '</p></div>' : '') +
      (schritte.length ? '<section><h3>Deine ersten Schritte</h3><div class="steps">' + schritte.map(function (s) { return '<div role="button" tabindex="0" data-go="' + esc(s.go) + '"' + (s.linie ? ' data-linie="' + esc(s.linie) + '" data-station="' + esc(s.station) + '"' : '') + (s.technik ? ' data-technik="' + esc(s.technik) + '"' : '') + ' style="cursor:pointer"><strong>' + esc(s.t) + '</strong><p class="small muted" style="margin-top:4px">' + esc(s.x) + '</p></div>'; }).join('') + '</div></section>' : '') +
      (sel2.length ? sel2.map(function (a) { return '<section class="panel stack"><div class="row"><span class="tag">' + esc(katName(a.kategorie)) + '</span></div><h2>Wenn die Person sagt: „' + esc(a.titel) + '“</h2>' + playbook(a, true) + '</section>'; }).join('') : '<div class="note warn"><strong>Noch keine Argumente markiert</strong><p>Unter „Die Argumente der Person“ markierst du, welche Sätze die Person sagt. Dann stehen hier für jeden Satz Ton, No-go-Wörter, wörtliche Antworten und Wenn-dann-Regeln.</p></div>') +
      (res.hinweise && res.hinweise.length ? '<section><h3>Was deine Antworten noch zeigen</h3><ul class="hints">' + res.hinweise.map(function (h) { return '<li>' + esc(h) + '</li>'; }).join('') + '</ul></section>' : '');
  } else {
    var ar = archGet();
    body = '<div class="grid"><div class="card"><div class="eyebrow">Gespeichert</div><strong>' + ar.eintraege.length + ' Einträge</strong><p class="small muted">Sätze, Fakten, Links und Notizen</p></div><div class="card"><div class="eyebrow">Rettungssätze</div><strong>' + ar.pins.length + ' von 3</strong><p class="small muted">Für den Blackout im Gespräch</p></div></div><div class="row"><button class="btn primary" data-go="archiv">Zum Archiv</button></div>';
  }
  var duenn = (res.abdeckung || []).filter(function (x) { return x.von && x.n < x.von / 2; });
  return '<div class="stack-lg">' +
    '<div class="page-head"><div class="eyebrow">Mein Fall · Kompass vom ' + esc(res.datum) + ' · ' + res.beantwortet + ' von ' + KOMPASS.fragen.length + ' Fragen</div><h1>Mein Fall</h1><p>' + esc(KOMPASS.hinweis) + '</p>' + (duenn.length ? '<p class="small muted">Dünn beantwortet: ' + esc(duenn.map(function (x) { return x.name; }).join(', ')) + '. <button class="link" data-act="kompass-edit">Antworten ergänzen ›</button></p>' : '') + '</div>' +
    risks + nav + body +
    '<div class="row"><button class="btn" data-act="share-kompass">Fahrplan teilen</button><button class="btn" data-act="copy-kompass">Als Text kopieren</button><button class="btn" data-act="kompass-edit">Antworten ändern</button><button class="btn" data-act="kompass-reset">Neu beginnen</button></div></div>';
}

var VIEWS = { start: vStart, antworten: vAntworten, archiv: vArchiv, netz: vNetz, kompass: vKompass, trainer: vTrainer, kampagne: vKampagne, wissen: vWissen, leitplanken: vLeitplanken, tagebuch: vTagebuch };
var AFTER = {
  netz: function () { var el = $('.stop.sel'); if (el && state.station) el.scrollIntoView({ block: 'start' }); },
  kompass: function () { updateProgress(); },
  antworten: function () { bindSearch('arg-q', 'argQ'); if (state.arg && state.argScroll) { var h = $('.panel h2'); if (h) h.scrollIntoView({ block: 'start' }); state.argScroll = false; } },
  archiv: function () { bindSearch('arch-q', 'archQ'); },
  kampagne: function () { if (state.phaseScroll) { var el = $('.stop.sel'); if (el) el.scrollIntoView({ block: 'start' }); state.phaseScroll = false; } },
  wissen: function () { if (state.technik) { var el = $('#t-' + state.technik); if (el) el.scrollIntoView({ block: 'start' }); state.technik = null; } },
  tagebuch: function () { var ls = $('#tb-linie'); if (ls) ls.addEventListener('change', function () { $('#tb-station').innerHTML = stationOptions(ls.value, ''); }); state.prefill = null; }
};

/* ---------- Ereignisse ---------- */
document.addEventListener('click', function (e) {
  var el = e.target.closest('[data-go], [data-act]');
  if (!el) return;
  var d = el.dataset;
  if (d.go != null) {
    e.preventDefault();
    var patch = {};
    if (d.linie != null) { patch.linie = d.linie || null; patch.station = d.station || null; }
    if (d.technik) patch.technik = d.technik;
    if (d.arg) { patch.arg = d.arg; patch.argScroll = true; patch.antTab = 'argumente'; }
    if (d.prefill) { var p = d.prefill.split('|'); patch.prefill = { linie: p[0], station: p[1] }; }
    go(d.go, patch); return;
  }
  var a = d.act;
  if (a === 'filter') { state[d.key] = d.val; render(); }
  else if (a === 'kompass-edit') { var kr = store.get('kompass', null); if (kr && kr.answers) kSaveDraft({ answers: kr.answers }); state.kompassEdit = true; state.kStep = 0; render(); }
  else if (a === 'kompass-cancel') { state.kompassEdit = false; render(); }
  else if (a === 'kompass-reset') { store.del('kompass'); store.del('kompass-draft'); state.kompassEdit = false; state.kStep = 0; render(); }
  else if (a === 'k-step') { var kf = $('form[data-form="kompass"]'); if (kf) kCollect(kf); kGoStep(+d.step); }
  else if (a === 'k-next' || a === 'k-prev') { var kf2 = $('form[data-form="kompass"]'); var cur = kf2 ? +(kf2.getAttribute('data-step') || 0) : 0; if (kf2) kCollect(kf2); kGoStep(cur + (a === 'k-next' ? 1 : -1)); }
  else if (a === 'copy-kompass') { var r = store.get('kompass', null); if (r) copyText(kompassMarkdown(r)); }
  else if (a === 'trainer-start') { state.trainer = { id: d.id, node: findIn(SZENARIEN, d.id).start, chosen: null, history: [], score: 0, max: 0, order: {} }; render(); }
  else if (a === 'trainer-pick') { var t = state.trainer, node = findIn(SZENARIEN, t.id).knoten[t.node], o = node.optionen[+d.idx]; if (!o) return; t.chosen = +d.idx; t.max += 2; t.score += o.bewertung === 'gut' ? 2 : o.bewertung === 'ok' ? 1 : 0; render(); }
  else if (a === 'trainer-next') { var tr = state.trainer, sz = findIn(SZENARIEN, tr.id), nd = sz.knoten[tr.node], op = nd.optionen[tr.chosen]; if (!op) return; tr.history.push(tr.node); tr.node = op.weiter && sz.knoten[op.weiter] ? op.weiter : null; tr.chosen = null; if (!tr.node) { tr.node = '__ende'; sz.knoten.__ende = sz.knoten.__ende || { aussage: 'Das Gespräch endet hier.', optionen: [], abschluss: 'Dieses Szenario hat kein eigenes Fazit.' }; } render(); }
  else if (a === 'trainer-exit') { state.trainer = null; render(); }
  else if (a === 'kamp-tab') { state.kampTab = d.tab; render(); }
  else if (a === 'phase') { state.phase = d.id; state.phaseScroll = !!d.id; render(); }
  else if (a === 'ant-tab') { state.antTab = d.tab; render(); }
  else if (a === 'arg-open') { state.arg = d.id || null; render(); if (d.id) { var ao = $('.panel h2'); if (ao) ao.scrollIntoView({ block: 'start' }); } }
  else if (a === 'fall-arg') { var ff = fallGet(), ix = ff.argumente.indexOf(d.id); if (ix >= 0) ff.argumente.splice(ix, 1); else ff.argumente.push(d.id); fallSet(ff); render(); toast(ix >= 0 ? 'Aus deinem Fall entfernt' : 'Zu deinem Fall hinzugefügt'); }
  else if (a === 'fall-tab') { state.fallTab = d.tab; render(); window.scrollTo(0, 0); }
  else if (a === 'arch-add') { archAdd({ typ: d.typ || 'satz', text: d.text, herkunft: d.herkunft || '', url: d.url || '', quelle: d.quelle || '' }); }
  else if (a === 'arch-pin') { var ap = archGet(), pi = ap.pins.indexOf(d.id); if (pi >= 0) ap.pins.splice(pi, 1); else { if (ap.pins.length >= 3) { toast('Höchstens drei Rettungssätze. Entferne erst einen.'); return; } ap.pins.push(d.id); } archSet(ap); render(); }
  else if (a === 'arch-del') { state.confirmDel = d.id; render(); }
  else if (a === 'arch-del-no') { state.confirmDel = null; render(); }
  else if (a === 'arch-del-yes') { var ad = archGet(); ad.eintraege = ad.eintraege.filter(function (x) { return x.id !== d.id; }); ad.pins = ad.pins.filter(function (x) { return x !== d.id; }); archSet(ad); state.confirmDel = null; render(); toast('Eintrag gelöscht'); }
  else if (a === 'copy-text') { copyText(d.text || ''); }
  else if (a === 'kamp-edit') { state.kampEdit = true; render(); }
  else if (a === 'kamp-cancel') { state.kampEdit = false; render(); }
  else if (a === 'kamp-reset') { store.del('kampagne'); state.kampEdit = false; render(); }
  else if (a === 'copy-kampagne') { var pl = store.get('kampagne', null); if (pl) copyText(kampagneMarkdown(pl)); }
  else if (a === 'tb-del') { state.confirmDel = d.id; render(); }
  else if (a === 'tb-del-no') { state.confirmDel = null; render(); }
  else if (a === 'tb-del-yes') { store.set('tagebuch', store.get('tagebuch', []).filter(function (x) { return x.id !== d.id; })); state.confirmDel = null; render(); toast('Eintrag gelöscht'); }
  else if (a === 'share-kompass') { var rk = store.get('kompass', null); if (rk) shareText('Mein Fahrplan aus Umsteigen', kompassMarkdown(rk)); }
  else if (a === 'share-kampagne') { var pk = store.get('kampagne', null); if (pk) shareText('Kampagnenplan aus Umsteigen', kampagneMarkdown(pk)); }
  else if (a === 'bk-copy') { copyText(backupAll()); }
  else if (a === 'bk-share') { shareText('Umsteigen-Sicherung vom ' + today(), backupAll()); }
  else if (a === 'bk-download') { downloadText('umsteigen-sicherung-' + today() + '.json', backupAll()); }
  else if (a === 'bk-import') { try { restoreAll($('#bk-io').value); render(); toast('Sicherung eingespielt'); } catch (err) { toast('Das ist keine gültige Sicherung.'); } }
  else if (a === 'tb-clear') { state.confirmClear = true; render(); }
  else if (a === 'tb-clear-no') { state.confirmClear = false; render(); }
  else if (a === 'tb-clear-yes') { store.del('tagebuch'); state.confirmClear = false; render(); toast('Alle Einträge gelöscht'); }
});
document.addEventListener('keydown', function (e) {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches('[role="button"][data-go], [role="button"][data-act]')) { e.preventDefault(); e.target.dispatchEvent(new MouseEvent('click', { bubbles: true })); }
});
function bindSearch(id, key) {
  var el = $('#' + id); if (!el) return;
  if (state.focusId === id) { el.focus(); try { el.setSelectionRange(el.value.length, el.value.length); } catch (e) {} state.focusId = null; }
  el.addEventListener('input', function () { state[key] = el.value; state.focusId = id; clearTimeout(bindSearch.t); bindSearch.t = setTimeout(render, 180); });
}
function updateProgress() {
  var f = $('form[data-form="kompass"]'); if (!f || !KOMPASS) return;
  var answers = kDraft().answers, N = KOMPASS.fragen.length, done = kAnswered(answers, KOMPASS.fragen);
  var bar = $('#kprog span'), txt = $('#kprog-t');
  if (bar) bar.style.width = Math.round(100 * done / N) + '%';
  if (txt) txt.textContent = done + ' von ' + N + ' beantwortet';
}
document.addEventListener('change', function (e) {
  var f = e.target.closest && e.target.closest('form[data-form="kompass"]'); if (f) { kCollect(f); updateProgress(); }
  if (e.target.hasAttribute && e.target.hasAttribute('data-fall-arg')) { var ff = fallGet(), id = e.target.getAttribute('data-fall-arg'), ix = ff.argumente.indexOf(id); if (e.target.checked && ix < 0) ff.argumente.push(id); if (!e.target.checked && ix >= 0) ff.argumente.splice(ix, 1); fallSet(ff); }
  if (e.target.id === 'bk-file' && e.target.files && e.target.files[0]) {
    var rd = new FileReader();
    rd.onload = function () { try { restoreAll(String(rd.result)); render(); toast('Sicherung eingespielt'); } catch (err) { toast('Das ist keine gültige Sicherung.'); } };
    rd.readAsText(e.target.files[0]);
  }
});
document.addEventListener('submit', function (e) {
  var f = e.target; if (!f.dataset || !f.dataset.form) return;
  e.preventDefault();
  if (f.dataset.form === 'kompass') { evalKompass(f); render(); window.scrollTo(0, 0); }
  else if (f.dataset.form === 'kampagne') { evalKampagne(f); render(); }
  else if (f.dataset.form === 'archiv') { var fa = new FormData(f); var tx = String(fa.get('text') || '').trim(); if (!tx) return; archAdd({ typ: fa.get('typ') || 'notiz', text: tx, herkunft: String(fa.get('herkunft') || '').trim(), url: String(fa.get('url') || '').trim(), quelle: String(fa.get('quelle') || '').trim() }); render(); }
  else if (f.dataset.form === 'fall-antwort') { var fb = new FormData(f), ff2 = fallGet(), aid = f.dataset.arg; var t2 = String(fb.get('text') || '').trim(); if (!t2) return; (ff2.antworten[aid] = ff2.antworten[aid] || []).unshift({ id: uid(), datum: today(), text: t2, lief: fb.get('lief') || 'ok' }); fallSet(ff2); render(); toast('Notiert'); }
  else if (f.dataset.form === 'tagebuch') {
    var fd = new FormData(f);
    var entries = store.get('tagebuch', []);
    entries.push({ id: uid(), alias: String(fd.get('alias') || '').trim(), datum: fd.get('datum') || today(), linie: fd.get('linie') || '', station: fd.get('station') || '', stufe: fd.get('stufe') || '', notiz: String(fd.get('notiz') || '').trim(), naechster: String(fd.get('naechster') || '').trim() });
    store.set('tagebuch', entries); render(); toast('Gespeichert');
  }
});

var initial = location.hash.replace('#', '');
if (ROUTES.some(function (x) { return x[0] === initial; })) state.route = initial;
render();
})();
