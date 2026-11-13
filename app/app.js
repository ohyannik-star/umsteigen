(function () {
'use strict';

var APP = 'umsteigen'; // interner Speichername von vor der Umbenennung; bleibt, damit Gespeichertes und alte Sicherungen weiter passen
var NAME = 'UMDENKEN';
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
var ST = D.selbsttest && D.selbsttest.staerken && D.selbsttest.parteien ? D.selbsttest : null;
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
var API = HOSTED && window.UMSTEIGEN_API ? String(window.UMSTEIGEN_API).replace(/\/+$/, '') : '';
// Öffentliche Adresse der App für „Weitersagen“ (QR-Code und Link). Die gebaute App bekommt sie aus app/config.json.
// Sie wird bewusst nirgends als Text angezeigt: Sie steckt nur im QR-Code und im geteilten Link.
var ADRESSE = String(window.UMSTEIGEN_URL || 'https://ohyannik-star.github.io/umsteigen/');
var SLOGAN = 'Nicht nur umdenken, sondern auch rumsprechen.';
var KURZTEXT = SLOGAN + ' Die App ' + NAME + ' hilft dir, mit Menschen im Gespräch zu bleiben, die extreme Ansichten vertreten. Kostenlos und ohne Anmeldung.';
function iosGeraet() { try { var ua = navigator.userAgent || ''; return /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1); } catch (e) { return false; } }
function isStandalone() { try { return window.navigator.standalone === true || (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches); } catch (e) { return false; } }
// Teilt über das Gerät; ohne Teilen-Funktion landet der Text (samt Adresse, falls angegeben) in der Zwischenablage.
function shareText(title, text, url) {
  var daten = { title: title, text: text }, kopie = url ? text + ' ' + url : text;
  if (url) daten.url = url;
  if (navigator.share) { try { navigator.share(daten).catch(function (err) { if (!err || err.name !== 'AbortError') copyText(kopie); }); return; } catch (e) {} }
  copyText(kopie);
}
function downloadText(name, text) {
  try { var b = new Blob([text], { type: 'application/json' }); var u = URL.createObjectURL(b); var a = document.createElement('a'); a.href = u; a.download = name; document.body.appendChild(a); a.click(); setTimeout(function () { a.remove(); URL.revokeObjectURL(u); }, 800); toast('Datei gespeichert'); } catch (e) { copyText(text); }
}
function backupAll() {
  var daten = {};
  try { for (var i = 0; i < localStorage.length; i++) { var k = localStorage.key(i); if (k && k.indexOf(APP + ':') === 0 && k !== APP + ':selbsttest') daten[k.slice(APP.length + 1)] = JSON.parse(localStorage.getItem(k)); } } catch (e) {}
  return JSON.stringify({ app: APP, version: 1, datum: today(), daten: daten });
}
function restoreAll(text) {
  var o = JSON.parse(text);
  if (Array.isArray(o)) { var cur = store.get('tagebuch', []), ids = {}; cur.forEach(function (x) { ids[x.id] = 1; }); o.forEach(function (x) { if (x && x.alias && x.notiz && !ids[x.id]) cur.push({ id: x.id || uid(), alias: x.alias, datum: x.datum || today(), linie: x.linie || '', station: x.station || '', stufe: x.stufe || '', notiz: x.notiz, naechster: x.naechster || '' }); }); store.set('tagebuch', cur); return; }
  if (!o || o.app !== APP || !o.daten) throw new Error('format');
  Object.keys(o.daten).forEach(function (k) {
    if (k === 'selbsttest') return; // Selbsttest-Antworten bleiben nur auf dem Gerät, auf dem sie entstanden sind
    // Anfragen zusammenführen statt überschreiben, damit Nummern und vorgemerkte Löschungen auf diesem Gerät erhalten bleiben.
    if (k === 'anfragen' && Array.isArray(o.daten[k])) { var hier = store.get('anfragen', []), ids = {}; hier.forEach(function (x) { ids[x.id] = 1; }); store.set('anfragen', hier.concat(o.daten[k].filter(function (x) { return x && x.id && !ids[x.id]; }))); return; }
    store.set(k, o.daten[k]);
  });
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
  mehr: '<circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/>',
  tagebuch: '<rect x="5" y="3" width="14" height="18" rx="2.5"/><path d="M9 8h6M9 12h6M9 16h3"/>',
  verstehen: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
  vorbereiten: '<rect x="5" y="4" width="14" height="17" rx="2.5"/><path d="M9.5 4V3h5v1"/><path d="m8.5 11 1.8 1.8 3.4-3.4M8.5 16.5h7"/>',
  aktiv: '<circle cx="9" cy="8" r="3"/><circle cx="17.5" cy="9.5" r="2.3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M16 14.3c2.8.3 5 2.6 5 5.7"/>',
  meins: '<path d="M4 7a2 2 0 0 1 2-2h3.5l2 2H18a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/>',
  suche: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>',
  selbsttest: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4"/>',
  teilen: '<circle cx="18" cy="5" r="2.6"/><circle cx="6" cy="12" r="2.6"/><circle cx="18" cy="19" r="2.6"/><path d="m8.3 10.7 7.4-4.4M8.3 13.3l7.4 4.4"/>'
};
ICONS.argumentieren = ICONS.antworten; ICONS.schutz = ICONS.leitplanken;
function icon(k) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[k] || '') + '</svg>'; }
function seg(key, opts) { return '<div class="seg" role="group">' + opts.map(function (o) { return '<button type="button" aria-pressed="' + (state[key] === o[0]) + '" data-act="filter" data-key="' + esc(key) + '" data-val="' + esc(o[0]) + '">' + esc(o[1]) + '</button>'; }).join('') + '</div>'; }
function optRow(type, name, id, value, text, checked) { return '<label class="opt"><input class="vh" type="' + type + '" name="' + esc(name) + '" value="' + esc(value) + '" id="' + esc(id) + '"' + (checked ? ' checked' : '') + '><i class="ck" aria-hidden="true"></i><span>' + esc(text) + '</span></label>'; }
function group(title, hint, rows, eyebrow) { return '<div class="group">' + (eyebrow ? '<div class="eyebrow">' + esc(eyebrow) + '</div>' : '') + '<div class="group-title">' + esc(title) + (hint ? ' <span class="small">' + esc(hint) + '</span>' : '') + '</div><div class="list">' + rows + '</div></div>'; }

/* ---------- Zustand und Routing ---------- */
var ROUTES = [
  ['start', 'Start'], ['verstehen', 'Verstehen & Einordnen'], ['argumentieren', 'Argumentieren & Reagieren'], ['vorbereiten', 'Gespräche vorbereiten'], ['aktiv', 'Aktiv werden & Vernetzen'], ['schutz', 'Mich schützen & Grenzen setzen'], ['meins', 'Meine Inhalte'], ['suche', 'Suche'],
  ['kompass', 'Person verstehen'], ['antworten', 'Antworten'], ['trainer', 'Trainer'], ['netz', 'Netzplan'], ['wissen', 'Techniken'], ['kampagne', 'Kampagne'], ['leitplanken', 'Leitplanken'], ['archiv', 'Archiv'], ['tagebuch', 'Tagebuch'], ['teilen', 'Weitersagen'], ['selbsttest', 'Wo stehe ich?']
];
function routeName(r) { for (var i = 0; i < ROUTES.length; i++) if (ROUTES[i][0] === r) return ROUTES[i][1]; return r; }
// Die fünf Bereiche der Startseite. Jeder führt auf eine einfache Seite mit höchstens drei Wegen.
var HUB_IDS = ['verstehen', 'argumentieren', 'vorbereiten', 'aktiv', 'schutz'];
var HUBS = {
  verstehen: { kurz: 'Verstehen', farbe: '#0a5fa7', teaser: 'Was treibt die Person an?', warum: 'Hinter jeder Haltung stehen Gründe. Wer sie kennt, findet leichter den richtigen Ton.' },
  argumentieren: { kurz: 'Argumentieren', farbe: '#15803d', teaser: 'Gute Antworten auf Sätze der Person.', warum: 'Antworten, die das Gespräch offen halten, statt es zu beenden.' },
  vorbereiten: { kurz: 'Vorbereiten', farbe: '#7c3aed', teaser: 'Üben und Schritte planen.', warum: 'Ein gutes Gespräch lässt sich üben und planen, bevor es ernst wird.' },
  aktiv: { kurz: 'Aktiv werden', farbe: '#c2410c', teaser: 'Mehr Menschen erreichen.', warum: 'Mehr tun als ein einzelnes Gespräch: Wege und Verbündete für Nachbarschaft, Verein und Schule.' },
  schutz: { kurz: 'Schützen', farbe: '#0e7490', teaser: 'Auf dich achten, Hilfe holen.', warum: 'Solche Gespräche kosten Kraft. Hier steht, wie du auf dich achtest und wer dir hilft.' }
};
// Wohin der Zurück-Link einer Werkzeugseite führt, wenn man sie nicht über einen Bereich geöffnet hat
var PARENT = { selbsttest: 'verstehen', kompass: 'verstehen', antworten: 'argumentieren', trainer: 'vorbereiten', netz: 'vorbereiten', wissen: 'vorbereiten', kampagne: 'aktiv', leitplanken: 'schutz', archiv: 'meins', tagebuch: 'meins' };
var TOOL_IDS = ['selbsttest', 'kompass', 'antworten', 'trainer', 'netz', 'wissen', 'kampagne', 'leitplanken', 'archiv', 'tagebuch'];
function istOben(r) { return r === 'start' || r === 'meins' || r === 'suche' || !!HUBS[r]; }
function crumbZiel(r) { if (HUBS[r]) return 'start'; if (istOben(r)) return null; return state.from && istOben(state.from) ? state.from : (PARENT[r] || 'start'); }
function navBereich(r) { if (istOben(r)) return r; return state.from && istOben(state.from) && state.from !== 'start' ? state.from : (PARENT[r] || 'start'); }
var state = {
  route: 'start', linie: null, station: null, technik: null, filterEbene: 'alle',
  wissenEbene: 'alle', wissenEv: 'alle', kampTab: 'planer', bausteinTyp: 'alle',
  trainer: null, kompassEdit: false, confirmDel: null, confirmClear: false, prefill: null
};
var lastRoute = null;

function go(route, patch) {
  if (patch) Object.keys(patch).forEach(function (k) { state[k] = patch[k]; });
  if (route !== state.route && istOben(state.route)) state.from = state.route;
  if (route === 'suche' && state.route !== 'suche') state.focusId = 'such-q';
  state.route = route; state.sheet = false; state.zeigen = false;
  var h = '#' + route;
  if (location.hash !== h) location.hash = h; else render();
}
function zeigenZu() {
  state.zeigen = false; state.focusId = 'zeigen-auf'; render();
  try { if (history.state && history.state.zeigen) history.back(); } catch (e) {}
}
window.addEventListener('popstate', function (e) {
  if (state.zeigen && !(e.state && e.state.zeigen)) { state.zeigen = false; state.focusId = 'zeigen-auf'; render(); }
});
window.addEventListener('hashchange', function () {
  var r = location.hash.replace('#', '');
  if (ROUTES.some(function (x) { return x[0] === r; })) state.route = r;
  state.zeigen = false;
  render();
});

function render() {
  var bereich = navBereich(state.route);
  $('#nav').innerHTML = HUB_IDS.map(function (h) { return [h, HUBS[h].kurz]; }).concat([['meins', 'Meine Inhalte'], ['suche', 'Suche']]).map(function (r) {
    return '<button data-go="' + r[0] + '"' + (bereich === r[0] ? ' aria-current="page"' : '') + '>' + esc(r[1]) + '</button>';
  }).join('');
  // Untere Leiste auf dem Handy: Start, Meine Inhalte, Suche, Mehr. Bereiche und Werkzeuge zählen zu Start.
  var tb = $('#tabbar'), tab = bereich === 'meins' || bereich === 'suche' ? bereich : 'start';
  if (tb) tb.innerHTML = [['start', 'Start'], ['meins', 'Meine Inhalte'], ['suche', 'Suche']].map(function (r) { return '<button data-go="' + r[0] + '"' + (tab === r[0] && !state.sheet ? ' aria-current="page"' : '') + '>' + icon(r[0]) + '<span>' + esc(r[1]) + '</span></button>'; }).join('') + '<button data-act="sheet"' + (state.sheet ? ' aria-current="page"' : '') + ' aria-expanded="' + !!state.sheet + '">' + icon('mehr') + '<span>Mehr</span></button>';
  var sh = $('#sheet');
  if (sh) {
    var knopf = function (r) { return '<button data-go="' + r + '">' + icon(r) + esc(routeName(r)) + '</button>'; };
    sh.hidden = !state.sheet;
    sh.innerHTML = state.sheet ? '<div class="sheet-in" role="dialog" aria-label="Mehr"><div class="sheet-h">Bereiche</div>' + HUB_IDS.map(knopf).join('') +
      '<div class="sheet-h">Alle Werkzeuge</div><div class="sheet-grid">' + TOOL_IDS.map(knopf).join('') + '</div>' +
      '<div class="sheet-h">App</div><button data-go="teilen">' + icon('teilen') + 'Weitersagen</button><button data-go="leitplanken" data-anker="datenschutz">' + icon('leitplanken') + 'Datenschutz</button>' + (HOSTED ? '<button data-act="check-update">' + icon('start') + 'Nach Updates suchen</button>' : '') + '</div>' : '';
  }
  var gs = $('#gshare');
  if (gs) { gs.hidden = false; if (state.route === 'teilen') gs.setAttribute('aria-current', 'page'); else gs.removeAttribute('aria-current'); }
  var view = VIEWS[state.route] || VIEWS.start, ziel = crumbZiel(state.route);
  // Bei den Thesen führt „‹ Zurück“ in der Seite selbst; ein zweiter Zurück-Link darüber würde verwirren
  if (state.route === 'selbsttest' && state.st && state.st.teil === 'thesen') ziel = null;
  $('#main').innerHTML = '<div class="wrap">' + (ziel ? '<div class="crumb"><button data-go="' + ziel + '">‹ ' + esc(routeName(ziel)) + '</button></div>' : '') + view() + '</div>';
  if (lastRoute !== state.route) { window.scrollTo(0, 0); lastRoute = state.route; }
  if (AFTER[state.route]) AFTER[state.route]();
  if (state.anker) { var an = $('#' + state.anker); state.anker = null; if (an) { if (an.tagName === 'DETAILS') an.open = true; an.scrollIntoView({ block: 'start' }); } }
}

/* ---------- Start ---------- */
function anz(n, eins, mehr) { return n + ' ' + (n === 1 ? eins : mehr); }
function goAttrs(o) { return o.go ? ' data-go="' + esc(o.go) + '"' + Object.keys(o.daten || {}).map(function (k) { return ' data-' + k + '="' + esc(o.daten[k]) + '"'; }).join('') : ''; }
// Kachel, die aufs Weitersagen hinweist: auf der Startseite nach den fünf Bereichen und im Bereich „Aktiv werden“
function weiterZeile(zusatz) {
  return '<button class="area weiter" data-go="teilen"><span class="area-ic">' + icon('teilen') + '</span><span class="area-t"><strong>Hilft dir die App? Zeig sie weiter.</strong><span>' + esc(zusatz) + '</span></span><span class="area-chev" aria-hidden="true">›</span></button>';
}
function vStart() {
  var res = store.get('kompass', null);
  var bereiche = HUB_IDS.map(function (h) {
    var b = HUBS[h];
    return '<button class="area" data-go="' + h + '" style="--ac:' + esc(b.farbe) + '"><span class="area-ic">' + icon(h) + '</span><span class="area-t"><strong>' + esc(routeName(h)) + '</strong><span>' + esc(b.teaser) + '</span></span><span class="area-chev" aria-hidden="true">›</span></button>';
  }).join('');
  return '<div class="stack-lg">' +
    '<section class="hero"><h1 class="display">Jemand aus deinem Umfeld vertritt extreme Ansichten?</h1>' +
      '<p class="lead">' + NAME + ' hilft dir, im Gespräch zu bleiben. Ohne Belehren, ohne Streit, egal aus welcher politischen Richtung.</p>' +
      // Zwei Tests nebeneinander, in den Farben des Logos: blau für die Person, rot für dich selbst
      '<div class="hero-tests">' +
        '<div class="hero-test"><button class="test-knopf blau" data-go="kompass">' + (res ? 'Dein Fahrplan' : 'Person verstehen') + '</button><span class="small muted">' + (res ? 'Test zur Person: dein Ergebnis' : 'Test zur Person') + '</span></div>' +
        (ST ? '<div class="hero-test"><button class="test-knopf rot" data-go="selbsttest">Selbsttest</button><span class="small muted">Test zu dir: Wo stehst du?</span></div>' : '') +
      '</div></section>' +
    anfBanner() + iosHinweis() +
    '<section><h2 class="sh sm">Wobei brauchst du Hilfe?</h2><div class="areas">' + bereiche +
      weiterZeile('Mit QR-Code, Link oder Aushang.') + '</div></section>' +
    (HOSTED && !isStandalone() ? '<details class="acc inst"><summary>Als App aufs Handy holen</summary><div class="body"><p class="small">iPhone: In Safari auf das Teilen-Symbol tippen (Quadrat mit Pfeil nach oben), dann „Zum Home-Bildschirm“ und „Hinzufügen“. Android: In Chrome auf die drei Punkte tippen, dann „Zum Startbildschirm hinzufügen“ oder „App installieren“. Danach läuft ' + NAME + ' wie eine App, auch offline.</p><p class="small">Wichtig beim iPhone: Die App auf dem Home-Bildschirm fängt leer an. Was du vorher in Safari eingetragen hast, holst du über „Meine Inhalte“ und „Sichern und übertragen“ herüber.</p></div></details>' : '') +
  '</div>';
}

/* ---------- Bereiche ---------- */
// Höchstens drei Wege je Bereich. Jeder Weg sagt in einem Satz, warum man ihn öffnet.
function hubWege(h) {
  var res = store.get('kompass', null);
  var nArg = ARG ? ARG.argumente.length : 0, nVerh = ARG ? (ARG.verhalten || []).length : 0, nStud = ARG ? (ARG.studien_lesen || []).length : 0;
  // Die ersten Themen beim Namen nennen, damit man vor dem Tippen sieht, wozu es Antworten gibt
  var themen = ARG ? ARG.kategorien.slice(0, 3).map(function (k) { return k.name.split(' ')[0]; }) : [];
  var zuThemen = themen.length > 1 ? ', etwa zu ' + themen.slice(0, -1).join(', ') + ' und ' + themen[themen.length - 1] : '';
  var einzel = LINIEN.filter(function (l) { return l.ebene === 'individuum'; })[0], viele = LINIEN.filter(function (l) { return l.ebene !== 'individuum'; });
  if (h === 'verstehen') return [
    { go: 'kompass', titel: 'Person verstehen', text: res ? 'Dein Fahrplan vom ' + res.datum + ': was die Person antreibt, was hilft und was schadet.' : 'Du kreuzt an, was du beobachtest, und bekommst deinen Fahrplan: was die Person antreibt, was hilft und was schadet.', cta: res ? 'Fahrplan öffnen' : 'Fragen starten' },
    nStud ? { go: 'antworten', daten: { anttab: 'studien' }, titel: 'Zahlen und Studien einordnen', text: 'So prüft ihr eine Statistik gemeinsam, statt über Zahlen zu streiten.', cta: 'Regeln ansehen' } : null,
    LEIT && LEIT.gefahr ? { go: 'leitplanken', daten: { anker: 'gefahr' }, titel: 'Wie ernst ist es?', text: 'Warnzeichen, bei denen Reden allein nicht mehr reicht, und wen du dann anrufst.', cta: 'Warnzeichen ansehen' } : null
  ];
  if (h === 'argumentieren') return [
    ARG ? { go: 'antworten', daten: { anttab: 'argumente' }, titel: 'Antwort auf einen Satz finden', text: nArg + ' typische Sätze der Person' + zuThemen + '. Zu jedem: der richtige Ton und wörtliche Antworten.' + (API ? ' Ist dein Satz nicht dabei, schickst du ihn uns.' : ''), cta: 'Satz suchen' } : null,
    nVerh ? { go: 'antworten', daten: { anttab: 'verhalten' }, titel: 'Wenn die Person laut wird oder abblockt', text: nVerh + ' typische Situationen, etwa Spott oder ständiger Themenwechsel, und wie du ruhig bleibst.', cta: 'Situationen ansehen' } : null,
    { go: 'archiv', titel: 'Rettungssätze für den Blackout', text: 'Drei Sätze, die immer gehen, wenn dir im Gespräch nichts mehr einfällt.', cta: 'Rettungssätze ansehen' }
  ];
  if (h === 'vorbereiten') return [
    SZENARIEN.length ? { go: 'trainer', titel: 'Gespräch üben', text: anz(SZENARIEN.length, 'Situation', 'Situationen') + ' zum Durchspielen: Du wählst eine Antwort und siehst sofort, wie sie wirkt.', cta: 'Üben' } : null,
    einzel ? { go: 'netz', daten: { linie: einzel.id, station: '' }, titel: 'Gespräch Schritt für Schritt planen', text: 'In ' + einzel.stationen.length + ' Stationen durch ein Gespräch, mit Sätzen und Warnsignalen für jeden Schritt.', cta: 'Plan ansehen' } : null,
    TECHNIKEN.length ? { go: 'wissen', titel: 'Gesprächstechniken nachlesen', text: TECHNIKEN.length + ' Techniken wie gezieltes Nachfragen, jede mit Anleitung, Beispiel und Studienlage.', cta: 'Techniken ansehen' } : null
  ];
  if (h === 'aktiv') return [
    KAMPAGNE ? { go: 'kampagne', titel: 'Viele Menschen erreichen', text: 'Der Planer für Initiativen, Vereine und Kommunen schlägt Schritte vor, die zu euren Möglichkeiten passen.', cta: 'Plan erstellen' } : null,
    viele.length ? { titel: 'In Nachbarschaft, Schule und Öffentlichkeit', text: 'Fertige Wege für Gruppen, Schritt für Schritt.', extra: '<div class="row">' + viele.map(function (l) { return '<button class="btn sm" data-go="netz" data-linie="' + esc(l.id) + '" data-station="">' + badge(l, true) + ' ' + esc(l.name) + '</button>'; }).join('') + '</div>' } : null,
    HILFE.length ? { go: 'leitplanken', daten: { anker: 'hilfe' }, titel: 'Verbündete und Anlaufstellen finden', text: 'Beratung für Angehörige, Kommunen und Schulen, damit du das nicht allein machen musst.', cta: 'Anlaufstellen ansehen' } : null
  ];
  if (h === 'schutz') return [
    LEIT && LEIT.selbstschutz ? { go: 'leitplanken', daten: { anker: 'selbstschutz' }, titel: 'Auf dich selbst achten', text: 'Woran du merkst, dass du eine Pause brauchst, und wie du dich schützt.', cta: 'Selbstschutz ansehen' } : null,
    LEIT && LEIT.rote_linien ? { go: 'leitplanken', daten: { anker: 'rote-linien' }, titel: 'Grenzen kennen', text: 'Was du besser lässt, damit das Gespräch fair bleibt, und was du stattdessen tust.', cta: 'Grenzen ansehen' } : null,
    LEIT && LEIT.gefahr ? { go: 'leitplanken', daten: { anker: 'gefahr' }, titel: 'Wenn es gefährlich wird', text: 'Drohungen, Gewalt, Waffen: was du dann tust und welche Stellen helfen.', cta: 'Hilfe ansehen' } : null
  ];
  return [];
}
function wegKarte(o) {
  if (o.extra) return '<div class="choice-card"><h3>' + esc(o.titel) + '</h3><p>' + esc(o.text) + '</p>' + o.extra + '</div>';
  return '<div class="choice-card" role="button" tabindex="0"' + goAttrs(o) + '><h3>' + esc(o.titel) + '</h3><p>' + esc(o.text) + '</p><span class="choice-cta">' + esc(o.cta) + ' ›</span></div>';
}
function vHub(h) {
  var b = HUBS[h];
  return '<div class="stack-lg"><div class="page-head"><span class="area-ic big" style="--ac:' + esc(b.farbe) + '">' + icon(h) + '</span><h1>' + esc(routeName(h)) + '</h1><p class="why">' + esc(b.warum) + '</p></div>' +
    (h === 'schutz' ? '<div class="note bad choices"><strong>Akute Gefahr?</strong>Ruf die 110. Bei Gedanken an Suizid hilft die Telefonseelsorge rund um die Uhr: 0800 111 0 111.</div>' : '') +
    '<div class="choices">' + hubWege(h).filter(Boolean).map(wegKarte).join('') + (h === 'aktiv' ? weiterZeile('QR-Code für Demo und Infostand.') : '') + '</div></div>';
}

/* ---------- Meine Inhalte ---------- */
function hatInhalte() { return !!(store.get('kompass', null) || archGet().eintraege.length || store.get('tagebuch', []).length || fallGet().argumente.length || anfSichtbar().length); }
function iosHinweis() {
  if (!HOSTED || isStandalone() || !iosGeraet() || !hatInhalte()) return '';
  return '<div class="note warn" data-hinweis="ios"><strong>Wichtig auf iPhone und iPad</strong>Im Browser löscht das Gerät deine Einträge, wenn du die Seite etwa eine Woche lang nicht öffnest. Auf dem Home-Bildschirm bleiben sie erhalten. So ziehst du um: unter „Meine Inhalte“ › „Sichern und übertragen“ sichern, die App zum Home-Bildschirm hinzufügen und dort wieder einspielen.</div>';
}
function vMeins() {
  var res = store.get('kompass', null), ar = archGet(), tb = store.get('tagebuch', []), anf = anfSichtbar(), f = fallGet();
  var wege = [
    { go: 'kompass', titel: 'Mein Fall', text: res ? 'Dein Fahrplan vom ' + res.datum + (f.argumente.length ? ', ' + anz(f.argumente.length, 'Satz', 'Sätze') + ' der Person markiert.' : '.') : 'Noch leer. Beantworte unter „Person verstehen“ ein paar Fragen, dann steht hier dein Fahrplan.', cta: res ? 'Öffnen' : 'Fragen starten' },
    { go: 'archiv', titel: 'Archiv', text: (ar.eintraege.length ? anz(ar.eintraege.length, 'gespeicherter Eintrag', 'gespeicherte Einträge') : 'Noch nichts gespeichert') + ' und deine Rettungssätze für den Blackout.', cta: 'Öffnen' },
    { go: 'tagebuch', titel: 'Tagebuch', text: tb.length ? anz(tb.length, 'Notiz', 'Notizen') + ' zu deinen Gesprächen.' : 'Noch keine Notizen. Nach einem Gespräch kurz festhalten, was gewirkt hat.', cta: 'Öffnen' },
    API || anf.length ? { go: 'antworten', daten: { anttab: 'anfragen' }, titel: 'Meine Anfragen', text: anf.length ? anz(anf.length, 'Anfrage', 'Anfragen') + ' zu fehlenden Argumenten.' : 'Fehlt dir ein Argument, kannst du es anfragen. Hier siehst du dann Entwurf und Antwort.', cta: 'Öffnen' } : null,
    { go: 'tagebuch', daten: { anker: 'sicherung' }, titel: 'Sichern und übertragen', text: 'Nimm alles, was du in der App gespeichert hast, auf ein anderes Gerät mit. Die Antworten aus dem Selbsttest bleiben hier.', cta: 'Sicherung öffnen' }
  ];
  return '<div class="stack-lg"><div class="page-head"><div class="eyebrow">Nur auf diesem Gerät</div><h1>Meine Inhalte</h1><p class="why">Alles, was du gespeichert hast, an einem Ort.</p></div>' + iosHinweis() + '<div class="choices">' + wege.filter(Boolean).map(wegKarte).join('') + '</div></div>';
}

/* ---------- Suche ---------- */
function vSuche() {
  var q = String(state.suchQ || '').trim(), worte = q.toLowerCase().split(/\s+/).filter(Boolean);
  var passt = function (teile) { var t = teile.filter(Boolean).join(' ').toLowerCase(); return worte.every(function (w) { return t.indexOf(w) >= 0; }); };
  var feld = '<div class="row center"><input type="text" id="such-q" class="such" enterkeyhint="search" autocomplete="off" placeholder="Wort oder Satz, zum Beispiel „Medien“" aria-label="Suchen" value="' + esc(q) + '"></div>';
  var kopf = '<div class="page-head"><div class="eyebrow">Suche</div><h1>Was suchst du?</h1><p class="why">Ein Thema, ein Satz der Person oder ein Stichwort. Die Suche geht durch die ganze App und durch deine eigenen Inhalte.</p></div>';
  if (worte.join('').length < 2) {
    var themen = ARG ? ARG.kategorien.map(function (k) { return '<button class="chip btn-chip big" data-act="such-set" data-q="' + esc(k.name.split(' ')[0]) + '">' + esc(k.name) + '</button>'; }).join('') : '';
    return '<div class="stack-lg">' + kopf + feld + (themen ? '<section class="stack center"><h3>Themen</h3><div class="row center">' + themen + '</div></section>' : '') + '</div>';
  }
  var gruppen = [], hit = function (attrs, tag, titel, unter) { return '<button class="hit"' + attrs + '><span class="tag">' + esc(tag) + '</span><strong>' + esc(titel) + '</strong>' + (unter ? '<span class="small muted">' + esc(unter) + '</span>' : '') + '</button>'; };
  var gruppe = function (name, items) { if (items.length) gruppen.push('<section class="stack"><h3>' + esc(name) + ' <span class="small muted">' + items.length + '</span></h3><div class="hits">' + items.slice(0, 12).join('') + '</div>' + (items.length > 12 ? '<p class="small muted">und ' + (items.length - 12) + ' weitere</p>' : '') + '</section>'); };
  if (ARG) {
    gruppe('Antworten auf Sätze', ARG.argumente.filter(function (a) { return passt([a.titel, katName(a.kategorie)].concat(a.varianten || [], a.stichworte || [])); }).map(function (a) { return hit(' data-go="antworten" data-arg="' + esc(a.id) + '"', katName(a.kategorie), '„' + a.titel + '“', (a.varianten || []).join(' · ')); }));
    gruppe('Wenn die Person so reagiert', (ARG.verhalten || []).filter(function (v) { return passt([v.verhalten, v.dahinter]); }).map(function (v) { return hit(' data-go="antworten" data-anttab="verhalten"', 'Verhalten', v.verhalten, ''); }));
  }
  gruppe('Gesprächstechniken', TECHNIKEN.filter(function (t) { return passt([t.name, t.kurz, t.beschreibung]); }).map(function (t) { return hit(' data-go="wissen" data-technik="' + esc(t.id) + '"', 'Technik', t.name, t.kurz); }));
  var stationen = [];
  LINIEN.forEach(function (l) { l.stationen.forEach(function (s) { if (passt([s.name, s.ziel, l.name])) stationen.push(hit(' data-go="netz" data-linie="' + esc(l.id) + '" data-station="' + esc(s.id) + '"', 'Linie ' + (lineIdx(l.id) + 1) + ' · ' + l.name, s.name, s.ziel)); }); });
  gruppe('Schritte im Netzplan', stationen);
  gruppe('Übungen', SZENARIEN.filter(function (s) { return passt([s.titel, s.kontext]); }).map(function (s) { return hit(' data-go="trainer" data-szenario="' + esc(s.id) + '"', 'Trainer', s.titel, s.kontext); }));
  var leit = [];
  if (LEIT) {
    (LEIT.grundsaetze || []).forEach(function (x) { if (passt([x.titel, x.text])) leit.push(hit(' data-go="leitplanken" data-anker="grundsaetze"', 'Grundsatz', x.titel, '')); });
    (LEIT.selbstschutz || []).forEach(function (x) { if (passt([x.titel, x.text])) leit.push(hit(' data-go="leitplanken" data-anker="selbstschutz"', 'Selbstschutz', x.titel, '')); });
    (LEIT.gefahr || []).forEach(function (x) { if (passt([x.signal, x.aktion, x.anlaufstelle])) leit.push(hit(' data-go="leitplanken" data-anker="gefahr"', 'Gefahr', x.signal, '')); });
  }
  gruppe('Schutz und Regeln', leit);
  gruppe('Anlaufstellen', HILFE.filter(function (h) { return passt([h.name, h.beschreibung, h.fuer, h.region]); }).map(function (h) { return hit(' data-go="leitplanken" data-anker="hilfe"', h.fuer, h.name, h.region); }));
  var eigene = archGet().eintraege.filter(function (e) { return passt([e.text, e.herkunft, e.quelle]); }).map(function (e) { return hit(' data-go="archiv" data-archq="' + esc(q) + '"', 'Dein Archiv', e.text, e.herkunft); });
  store.get('tagebuch', []).forEach(function (e) { if (passt([e.alias, e.notiz, e.naechster])) eigene.push(hit(' data-go="tagebuch"', 'Dein Tagebuch · ' + e.datum, e.notiz, e.alias)); });
  gruppe('Deine Inhalte', eigene);
  var leer = '<div class="empty">Nichts gefunden zu „' + esc(q) + '“. Versuch ein anderes oder kürzeres Wort.' + (API ? ' <button class="link" data-go="antworten" data-argq="' + esc(q) + '">Fehlt ein Satz der Person? Frag ihn an ›</button>' : '') + '</div>';
  return '<div class="stack-lg">' + kopf + feld + (gruppen.length ? gruppen.join('') : leer) + '</div>';
}

/* ---------- Weitersagen ---------- */
// QR-Code zur Adresse der App. Fehlt der Erzeuger (qr.js), bietet die Seite nur „Link teilen“ an.
var QR_BILD = '';
function qrCode() { if (!QR_BILD) QR_BILD = window.QR ? window.QR.svg(ADRESSE, 'QR-Code zur App ' + NAME) : ''; return QR_BILD; }
function vTeilen() {
  var qr = qrCode();
  // Aushang: nur im Druck sichtbar. Großer QR-Code: deckt die ganze Seite ab, damit beim Vorzeigen nichts anderes zu sehen ist.
  var aushang = '<div class="aushang"><div class="aus-n">' + NAME + '</div><div class="aus-h">Jemand aus deinem Umfeld vertritt extreme Ansichten?</div><p class="aus-p">Diese App hilft dir, im Gespräch zu bleiben. Ohne Belehren, ohne Streit, egal aus welcher politischen Richtung.</p>' + qr + '<p class="aus-s">Handy-Kamera auf den Code halten und den Link antippen.</p><p class="aus-slogan">' + esc(SLOGAN) + '</p><p class="aus-f">Kostenlos · Ohne Anmeldung · Ohne Werbung</p></div>';
  var gross = '<div class="zeigen" role="dialog" aria-modal="true" aria-label="QR-Code zum Vorzeigen" data-act="zeigen-zu"><div class="zeigen-n">' + NAME + '</div>' + qr + '<p class="zeigen-t">Kamera draufhalten, Link antippen</p><button class="btn" id="zeigen-zu" data-act="zeigen-zu">Schließen</button></div>';
  return '<div class="stack-lg">' + kopf('Weitersagen', SLOGAN, 'Gute Gespräche stecken an. Zeig ' + NAME + ' Menschen, denen es geht wie dir: auf der Demo, am Infostand, im Verein oder im Freundeskreis.', '') +
    '<section class="panel teilen">' + (qr ? qr + '<p class="small muted">Die andere Person hält ihre Handy-Kamera auf den Code und tippt den Link an, der erscheint.</p>' : '') +
      '<div class="row center">' + (qr ? '<button class="btn primary" id="zeigen-auf" data-act="zeigen">Groß zeigen</button>' : '') + '<button class="btn" data-act="teilen-link">Link teilen</button></div></section>' +
    '<div class="choices">' +
      '<div class="choice-card"><h3>Was du dazu sagen kannst</h3><div class="say"><span class="say-t">„' + esc(KURZTEXT) + '“</span></div></div>' +
      (qr ? '<div class="choice-card"><h3>Zum Aufhängen und Auslegen</h3><p>Ein Aushang mit QR-Code für Infostand, Vereinsheim oder Schwarzes Brett.</p><div class="row"><button class="btn" data-act="aushang">Aushang drucken</button></div><p class="small muted">Tipp: Am Computer klappt das Drucken immer, am Handy nicht in jedem Browser. Im Druckfenster „Kopf- und Fußzeilen“ ausschalten, sonst druckt der Browser Datum und Web-Adresse mit.</p></div>' : '') +
      '<div class="note"><strong>Gut zu wissen</strong>Beim Vorzeigen sieht niemand deine Notizen. Empfiehl die App, aber dräng sie niemandem auf. Und zeig sie nicht der Person, um die du dich sorgst: Das wirkt schnell wie ein Vorwurf.</div>' +
    '</div>' + (qr ? aushang : '') + (qr && state.zeigen ? gross : '') + '</div>';
}

/* ---------- Selbsttest „Wo stehe ich?“ ---------- */
// Teil 1 „Was liegt dir?“ ergibt eine Stärke und den passenden Bereich. Teil 2 vergleicht Antworten zu Thesen mit den Wahlprogrammen.
// Antworten bleiben nur im Arbeitsspeicher; gespeichert wird erst, wenn man es ausdrücklich will (politische Meinungen sind besonders schutzwürdig).
// Sie gehen nie in die Sicherung (backupAll) und nie über das Netz.
var ST_POS = { zu: 'stimmt zu', ab: 'lehnt ab', neutral: 'neutral', offen: 'keine klare Aussage' };
var ST_DU = { zu: 'Du: stimme zu', ab: 'Du: stimme nicht zu', neutral: 'Du: neutral', skip: 'Du: übersprungen' };
function stLeer() { return { teil: null, i: 0, a: {}, w: {}, s: {}, staerkeFertig: false, gespeichert: false }; }
function stState() {
  if (!state.st) {
    var g = store.get('selbsttest', null); state.st = stLeer();
    if (g) { state.st.a = g.a || {}; state.st.w = g.w || {}; state.st.s = g.s || {}; state.st.staerkeFertig = !!g.staerkeFertig; state.st.gespeichert = true; }
  }
  return state.st;
}
function stMerken() { var st = stState(); if (st.gespeichert) store.set('selbsttest', { a: st.a, w: st.w, s: st.s, staerkeFertig: st.staerkeFertig }); }
function stParteienAbc() { return ST.parteien.slice().sort(function (x, y) { return x.name < y.name ? -1 : x.name > y.name ? 1 : 0; }); }
function stQuelle(p, id) { var q = p.quellen || []; for (var i = 0; i < q.length; i++) if (!id || q[i].id === id) return q[i]; return q[0] || { titel: 'Wahlprogramm 2025', url: '' }; }
function stUnd(namen) { return namen.length < 2 ? namen.join('') : namen.slice(0, -1).join(', ') + ' und ' + namen[namen.length - 1]; }
function stTyp(s) {
  var punkte = {};
  ST.staerken.typen.forEach(function (t) { punkte[t.id] = 0; });
  ST.staerken.fragen.forEach(function (f) { var o = findIn(f.optionen, s[f.id]); if (o) Object.keys(o.typ).forEach(function (k) { punkte[k] = (punkte[k] || 0) + o.typ[k]; }); });
  // Reihenfolge der Typen entscheidet bei Gleichstand (Kraft zuerst)
  var reihe = ST.staerken.typen.slice().sort(function (x, y) { return punkte[y.id] - punkte[x.id]; });
  return { typ: reihe[0], zweit: reihe[1] && punkte[reihe[1].id] > 0 ? reihe[1] : null };
}
function stErgebnis(st) {
  var beantwortet = 0;
  ST.thesen.forEach(function (t) { var a = st.a[t.id]; if (a && a !== 'skip') beantwortet++; });
  var liste = ST.parteien.map(function (p) {
    var pkt = 0, max = 0, offen = 0, gleich = [];
    ST.thesen.forEach(function (t) {
      var a = st.a[t.id]; if (!a || a === 'skip') return;
      var pp = (t.positionen[p.id] || {}).pos || 'offen';
      var w = st.w[t.id] ? 2 : 1;
      max += 2 * w;
      // Ohne klare Aussage im Programm zählt die These halb: weder Übereinstimmung noch Widerspruch.
      // So bekommt eine Partei, die zu vielen Thesen schweigt, keinen Vorteil durch die kleinere Zahl verglichener Thesen.
      if (pp === 'offen') { offen++; pkt += w; return; }
      pkt += w * (a === pp ? 2 : (a === 'neutral' || pp === 'neutral') ? 1 : 0);
      if (a === pp) gleich.push(t);
    });
    return { p: p, pct: max ? Math.round(100 * pkt / max) : null, offen: offen, gleich: gleich };
  });
  liste.sort(function (x, y) { var a = x.pct == null ? -1 : x.pct, b = y.pct == null ? -1 : y.pct; return b - a || (x.p.name < y.p.name ? -1 : x.p.name > y.p.name ? 1 : 0); });
  return { liste: liste, beantwortet: beantwortet };
}
function vSelbsttest() {
  if (!ST) return missing('Selbsttest');
  var st = stState();
  if (st.teil === 'staerken') return stStaerkenView(st);
  if (st.teil === 'thesen' && ST.thesen.length) return stThesenView(st);
  if (st.teil === 'ergebnis' && ST.thesen.length) return stErgebnisView(st);
  var N = ST.thesen.length, angefangen = ST.thesen.some(function (t) { return st.a[t.id]; });
  var karte = function (teil, titel, text, cta) { return '<div class="choice-card" role="button" tabindex="0" data-act="st-teil" data-teil="' + teil + '"><h3>' + esc(titel) + '</h3><p>' + esc(text) + '</p><span class="choice-cta">' + esc(cta) + ' ›</span></div>'; };
  return '<div class="stack-lg">' + kopf('Selbsttest', 'Wo stehe ich?', 'Bevor du andere verstehst: Wo stehst du selbst? Zwei kurze Teile, zusammen etwa zehn Minuten.', '') +
    '<div class="choices">' +
      karte('staerken', 'Teil 1: Was liegt dir?', ST.staerken.fragen.length + ' Fragen. Du erfährst, was deine Stärke im Gespräch ist und wo du in der App am besten anfängst.', st.staerkeFertig ? 'Dein Ergebnis ansehen' : 'Starten') +
      (N ? karte('thesen', 'Teil 2: Wo stehst du politisch?', N + ' Thesen. Du siehst, wie weit sich deine Antworten mit den Wahlprogrammen der Parteien decken, die bei der Bundestagswahl 2025 mindestens 1 % der Zweitstimmen bekommen haben. CDU und CSU haben ein gemeinsames Programm und stehen deshalb zusammen.', angefangen ? 'Weitermachen' : 'Starten')
        : '<div class="choice-card"><h3>Teil 2: Wo stehst du politisch?</h3><p>Kommt bald.</p></div>') +
      '<div class="note"><strong>Gut zu wissen</strong>Keine Wahlempfehlung: Der Test zeigt nur, wo sich deine Antworten mit den Wahlprogrammen decken. Deine Antworten werden nur auf diesem Gerät ausgewertet und nur gespeichert, wenn du es willst.</div>' +
    '</div></div>';
}
function stStaerkenView(st) {
  var F = ST.staerken.fragen, fehlt = F.filter(function (f) { return !st.s[f.id]; }).length;
  if (st.staerkeFertig && !fehlt) {
    var r = stTyp(st.s), t = r.typ;
    // Starke Belastung (Frage s4) oder Kraft auf Platz zwei: Hinweis auf Selbstschutz, auch wenn eine andere Stärke vorne liegt
    var belastet = t.id !== 'kraft' && (st.s.s4 === 'c' || st.s.s4 === 'd' || (r.zweit && r.zweit.id === 'kraft'));
    return '<div class="stack-lg">' + kopf('Teil 1', 'Deine Stärke', 'Dein Ergebnis und wo du in der App am besten anfängst.', '') +
      '<section class="panel stack choices"><div class="eyebrow">Deine Stärke</div><h2>' + esc(t.name) + '</h2><p>' + esc(t.staerke) + '</p>' +
        '<div class="note"><strong>Darauf kannst du achten</strong>' + esc(t.tipp) + '</div>' +
        (belastet ? '<div class="note warn"><strong>Achte auch auf dich</strong>Einige deiner Antworten zeigen, dass dich diese Gespräche gerade viel Kraft kosten. Pausen sind erlaubt. Wie du dich schützt und wo du Hilfe bekommst, steht unter „Mich schützen &amp; Grenzen setzen“.</div>' : '') +
        (r.zweit && r.zweit.id !== 'kraft' ? '<p class="small muted">Auch stark: ' + esc(r.zweit.name) + '</p>' : '') +
        '<div class="row"><button class="btn primary" data-go="' + esc(t.hub) + '">' + esc(t.cta) + '</button>' + (belastet ? '<button class="btn" data-go="schutz">Zu „Mich schützen &amp; Grenzen setzen“</button>' : '') + (ST.thesen.length ? '<button class="btn" data-act="st-teil" data-teil="thesen">Weiter zu Teil 2</button>' : '') + '</div>' +
        '<div class="row"><button class="link" data-act="st-staerken-neu">Antworten ändern</button><button class="link" data-act="st-start">Zur Übersicht</button></div>' +
      '</section></div>';
  }
  var fragen = F.map(function (f, n) {
    return '<div class="group" role="group" aria-labelledby="st-f-' + esc(f.id) + '"><div class="eyebrow">Frage ' + (n + 1) + ' von ' + F.length + '</div><div class="group-title" id="st-f-' + esc(f.id) + '">' + esc(f.text) + '</div><div class="choice">' +
      f.optionen.map(function (o) { var an = st.s[f.id] === o.id; return '<button type="button" id="st-o-' + esc(f.id) + '-' + esc(o.id) + '" data-act="st-wahl" data-f="' + esc(f.id) + '" data-o="' + esc(o.id) + '" aria-pressed="' + an + '"' + (an ? ' class="pick"' : '') + '>' + esc(o.text) + '</button>'; }).join('') + '</div></div>';
  }).join('');
  return '<div class="stack-lg">' + kopf('Teil 1', 'Was liegt dir?', 'Wähle jeweils die Antwort, die am ehesten passt. Es gibt kein Richtig oder Falsch.', '') +
    '<div class="panel">' + fragen + '<div class="form-end"><button class="btn primary" data-act="st-auswerten">Auswerten</button>' +
      (state.stHinweis ? '<span class="small">' + esc(state.stHinweis) + '</span>' : (fehlt ? '<span class="small muted">Noch ' + anz(fehlt, 'Frage', 'Fragen') + ' offen</span>' : '')) +
      '<button class="link" data-act="st-start">Zur Übersicht</button></div></div></div>';
}
function stThesenView(st) {
  var N = ST.thesen.length, i = Math.min(Math.max(st.i, 0), N - 1), t = ST.thesen[i], a = st.a[t.id];
  var alleBeantwortet = ST.thesen.every(function (x) { return st.a[x.id]; });
  var knopf = function (w, text) { var an = a === w; return '<button type="button" class="btn' + (an ? ' primary' : '') + '" data-act="st-antwort" data-wert="' + w + '" aria-pressed="' + an + '">' + text + '</button>'; };
  // Schon beantwortet: weiter, ohne die Antwort zu überschreiben; sonst überspringen
  var weiter = a && a !== 'skip' ? '<button class="link" data-act="st-weiter">Weiter, Antwort behalten ›</button>' : '<button class="link" data-act="st-antwort" data-wert="skip">Überspringen</button>';
  return '<div class="stack-lg st">' +
    '<div class="st-kopf"><button class="link" data-act="st-zurueck">‹ Zurück</button><span class="small muted">These ' + (i + 1) + ' von ' + N + '</span><button class="link" data-act="st-start">Übersicht</button></div>' +
    '<div class="progress-bar"><span style="width:' + Math.round(100 * i / N) + '%"></span></div>' +
    '<section class="panel stack st-these"><div class="tag">' + esc(t.thema) + '</div><h2 id="st-these" tabindex="-1">' + esc(t.text) + '</h2>' +
      (t.erklaerung ? '<details class="why"><summary>Worum geht es?</summary><p>' + esc(t.erklaerung) + '</p></details>' : '') +
      '<div class="st-antw">' + knopf('zu', 'Stimme zu') + knopf('neutral', 'Neutral') + knopf('ab', 'Stimme nicht zu') + '</div>' +
      '<div class="row st-unten"><button type="button" class="btn sm" id="st-wichtig" data-act="st-wichtig" aria-pressed="' + !!st.w[t.id] + '">' + (st.w[t.id] ? '★ Zählt doppelt' : '☆ Ist mir besonders wichtig') + '</button>' + weiter + '</div>' +
    '</section>' + (alleBeantwortet ? '<div class="row center"><button class="link" data-act="st-teil" data-teil="thesen">Zum Ergebnis ›</button></div>' : '') + '</div>';
}
function stErgebnisView(st) {
  var r = stErgebnis(st);
  var kopfzeile = kopf('Teil 2', 'Dein Ergebnis', 'So weit decken sich deine Antworten mit den Wahlprogrammen der Parteien zur Bundestagswahl 2025.', '');
  if (!r.beantwortet) return '<div class="stack-lg">' + kopfzeile + '<div class="empty">Du hast alle Thesen übersprungen. Ohne Antworten gibt es keinen Vergleich. <button class="link" data-act="st-neu">Noch einmal von vorn</button> <button class="link" data-act="st-start">Zur Übersicht</button></div></div>';
  var balken = r.liste.map(function (x) { return '<div class="bar" data-partei="' + esc(x.p.id) + '"><span class="bar-l">' + esc(x.p.name) + '</span><span class="bar-t"><i style="width:' + (x.pct || 0) + '%"></i></span><span class="bar-v">' + (x.pct == null ? '–' : x.pct + ' %') + '</span></div>'; }).join('');
  var offen = r.liste.filter(function (x) { return x.offen; }).map(function (x) { return x.p.name + ' ' + x.offen; });
  var gewertet = r.liste.filter(function (x) { return x.pct != null; }), fern = gewertet[gewertet.length - 1];
  var gemein = '';
  if (fern) {
    // Alle Parteien mit dem niedrigsten Wert gleichberechtigt nennen; Parteinamen als Bezeichnung, damit keine Artikel nötig sind
    var tief = gewertet.filter(function (x) { return x.pct === fern.pct; }).sort(function (x, y) { return x.p.name < y.p.name ? -1 : 1; });
    var liste = function (x) { return x.gleich.length ? ul(x.gleich.map(function (t) { return t.text; })) : '<p class="small muted">Bei diesen Thesen keine gemeinsame Position.</p>'; };
    var kopfGemein = '';
    if (tief.length === gewertet.length) kopfGemein = '<p>Alle Parteien liegen gleichauf.</p>';
    else if (tief.length === 1) kopfGemein = fern.gleich.length ? '<p>Auch mit der Partei, mit der du am wenigsten übereinstimmst (' + esc(fern.p.name) + '), teilst du Positionen:</p>' + liste(fern) : '<p>Mit der Partei, mit der du am wenigsten übereinstimmst (' + esc(fern.p.name) + '), teilst du bei diesen Thesen keine Position. Bei anderen Fragen kann das ganz anders aussehen.</p>';
    else kopfGemein = '<p>Am wenigsten stimmst du mit diesen Parteien überein, alle mit ' + fern.pct + ' %: ' + esc(stUnd(tief.map(function (x) { return x.p.name; }))) + '. Auch mit ihnen teilst du Positionen:</p>' + tief.map(function (x) { return '<p><strong>' + esc(x.p.name) + '</strong></p>' + liste(x); }).join('');
    gemein = '<section class="stack" id="gemeinsam"><h2 class="sh sm">Gemeinsamkeiten</h2>' + kopfGemein +
      '<p class="small muted">Gleiche Antwort wie du: ' + esc(stParteienAbc().map(function (p) { var x = r.liste.filter(function (y) { return y.p.id === p.id; })[0]; return p.name + ' ' + x.gleich.length; }).join(' · ')) + '</p></section>';
  }
  var vergleich = ST.thesen.map(function (t) {
    var a = st.a[t.id] || 'skip';
    return '<details class="acc"><summary>' + esc(t.text) + ' ' + chip(ST_DU[a]) + (st.w[t.id] && a !== 'skip' ? chip('zählt doppelt') : '') + '</summary><div class="body stack">' +
      stParteienAbc().map(function (p) {
        var x = t.positionen[p.id] || { pos: 'offen' }, q = stQuelle(p, x.quelle);
        // Farbe nur für den Vergleich mit deiner Antwort (das misst die Rechnung), nie für die Richtung der Position selbst
        var vgl = (a === 'skip' || x.pos === 'offen') ? '' : x.pos === a ? chip('wie du', 'st-good') : (x.pos === 'neutral' || a === 'neutral') ? chip('teils wie du', 'st-warn') : chip('anders als du', 'st-bad');
        var beleg = q.titel + ', PDF-Seite ' + x.seite;
        return '<div class="st-pos"><div class="row"><strong>' + esc(p.name) + '</strong>' + chip(ST_POS[x.pos] || ST_POS.offen) + vgl + '</div>' + (x.text ? '<p class="small">' + esc(x.text) + '</p>' : '') +
          (x.zitat ? '<details class="why"><summary>Beleg aus dem Wahlprogramm</summary><div class="quote">„' + esc(x.zitat).replace(/„/g, '‚').replace(/“/g, '‘') + '“</div><p class="small">' + (q.url ? '<a href="' + esc(q.url) + '#page=' + esc(x.seite) + '" target="_blank" rel="noopener">' + esc(beleg) + '</a>' : esc(beleg)) + '</p></details>' : '') + '</div>';
      }).join('') + '</div></details>';
  }).join('');
  var quellen = stParteienAbc().map(function (p) { return '<li><strong>' + esc(p.name) + '</strong>' + (p.lang && p.lang.toLowerCase() !== p.name.toLowerCase() ? ' – ' + esc(p.lang) : '') + ' (' + esc(p.ergebnis) + '): ' + (p.quellen || []).map(function (q) { return '<a href="' + esc(q.url) + '" target="_blank" rel="noopener">' + esc(q.titel) + '</a>'; }).join(', ') + '</li>'; }).join('');
  var loeschen = state.stLoeschen ? '<span class="row"><span class="small">Wirklich alle Antworten aus beiden Teilen löschen? Das lässt sich nicht rückgängig machen.</span><button class="btn sm danger" data-act="st-loeschen-ja">Ja, alles löschen</button><button class="btn sm" data-act="st-loeschen-nein">Abbrechen</button></span>' : '<button class="btn danger" data-act="st-loeschen">Alle Antworten löschen</button>';
  return '<div class="stack-lg">' + kopfzeile +
    '<div class="note warn"><strong>Keine Wahlempfehlung</strong>Der Vergleich zeigt nur, wo sich deine Antworten zu ' + anz(r.beantwortet, 'These', 'Thesen') + ' mit den Wahlprogrammen decken. Er sagt nichts darüber aus, wie eine Partei als Ganzes zu bewerten ist.</div>' +
    '<div class="card"><div class="bars st-bars">' + balken + '</div>' + (offen.length ? '<p class="small muted" style="margin-top:10px">Zu manchen Thesen sagt ein Programm nichts Klares. Dann bekommt die Partei die Hälfte der Punkte, egal wie du geantwortet hast; das zählt weder als Übereinstimmung noch als Widerspruch und zieht ihren Wert in Richtung 50 %. Anzahl solcher Thesen bei deinen Antworten: ' + esc(offen.join(' · ')) + '.</p>' : '') + '</div>' +
    '<div class="row"><button class="btn" data-act="st-neu">Antworten ändern</button>' + (st.gespeichert ? '<span class="small muted">Auf diesem Gerät gespeichert</span>' : '<button class="btn" data-act="st-speichern">Auf diesem Gerät speichern</button>') + loeschen + '<button class="link" data-act="st-start">Zur Übersicht</button></div>' +
    (st.gespeichert ? '' : '<p class="small muted">Gespeichert wird nur im Browser dieses Geräts. Wer das Gerät benutzt, kann deine Antworten dann sehen. In deiner Sicherung unter „Meine Inhalte“ sind sie nicht enthalten.</p>') +
    gemein +
    '<section class="stack" id="vergleich"><h2 class="sh sm">Thesen im Vergleich</h2><p class="small muted">Tippe auf eine These: Du siehst, wie jede Partei sie in ihrem Wahlprogramm sieht, mit Zitat und Seite, wo das Programm etwas Klares sagt.</p><div class="faq">' + vergleich + '</div></section>' +
    '<details class="acc"><summary>So wird gerechnet</summary><div class="body stack"><p>Für jede These wird deine Antwort mit der Position der Partei verglichen: gleiche Antwort 2 Punkte, eine Seite neutral 1 Punkt, entgegengesetzt 0 Punkte. Thesen, die dir besonders wichtig sind, zählen doppelt. Übersprungene Thesen zählen nicht. Sagt ein Programm zu einer These nichts Klares, bekommt die Partei dafür die Hälfte der Punkte (1 von 2, bei doppelt gewichteten Thesen 2 von 4), egal wie du geantwortet hast. Das zählt weder als Übereinstimmung noch als Widerspruch. Je öfter das bei einer Partei vorkommt, desto näher liegt ihr Wert bei 50 %.</p><p>Die Einordnungen stammen aus den Wahlprogrammen zur Bundestagswahl 2025. Jede Zustimmung, Ablehnung und neutrale Position ist mit einem wörtlichen Zitat und der Seite in der PDF-Datei belegt; wo ein Programm nichts Klares sagt, steht „keine klare Aussage“. Jede Einordnung wurde ein zweites Mal mit dem Programmtext abgeglichen. Die Parteien selbst haben sie nicht geprüft. Fehler sind trotzdem möglich: Lies im Zweifel das Zitat im Programm nach. Stand: ' + esc(ST.stand) + '.</p></div></details>' +
    '<details class="acc"><summary>Parteien und Quellen</summary><div class="body stack"><p class="small">Dabei sind alle Parteien, die bei der Bundestagswahl 2025 mindestens 1 % der Zweitstimmen erhalten haben, in alphabetischer Reihenfolge. Ergebnisse: © Die Bundeswahlleiterin, Wiesbaden 2025, endgültiges Ergebnis der Bundestagswahl 2025 (<a href="https://www.bundeswahlleiterin.de/bundestagswahlen/2025/ergebnisse/bund-99.html" target="_blank" rel="noopener">bundeswahlleiterin.de</a>), Datenlizenz Deutschland – Namensnennung – Version 2.0 (<a href="https://www.govdata.de/dl-de/by-2-0" target="_blank" rel="noopener">govdata.de/dl-de/by-2-0</a>); Prozentwerte gerundet. Zitate aus den Wahlprogrammen der jeweiligen Parteien; das Urheberrecht liegt bei den Parteien.</p><ul class="small">' + quellen + '</ul></div></details>' +
  '</div>';
}

/* ---------- Seitenkopf ---------- */
function kopf(eyebrow, titel, warum, mehr) { return '<div class="page-head"><div class="eyebrow">' + esc(eyebrow) + '</div><h1>' + esc(titel) + '</h1><p class="why">' + esc(warum) + '</p>' + (mehr ? '<p class="small muted">' + esc(mehr) + '</p>' : '') + '</div>'; }

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
    (um ? '<div><h4>Linie wechseln</h4><p class="small muted">Sobald eines davon zutrifft:</p>' + um + '</div>' : '') +
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
    kopf('Schritt für Schritt', 'Netzplan', 'Ein Gespräch gelingt selten auf einen Schlag. Der Netzplan zeigt dir Schritt für Schritt, wie du vorgehst und wann du besser die Richtung wechselst.', 'Wähle eine Linie. Die Stationen folgen von oben nach unten aufeinander, Abzweige stehen eingerückt daneben. Tippe auf eine Station, um Vorgehen, Sätze und Warnsignale zu sehen.') +
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
  var ksel = '<select class="only-mobile ksel" id="ksel" data-act="k-select" aria-label="Richtung wählen">' + secs.map(function (s, i) { var q = kQuestions(s), a = kAnswered(answers, q); return '<option value="' + i + '"' + (i === step ? ' selected' : '') + '>' + (i + 1) + ' · ' + esc(s.name) + ' (' + a + '/' + q.length + ')</option>'; }).join('') + '</select>';
  var nav = ksel + '<div class="knav only-desktop" aria-label="Richtungen">' + secs.map(function (s, i) {
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
    kopf('Fragen für dich, nicht für die Person', 'Person verstehen', 'Du kreuzt an, was du bei der Person beobachtest. Daraus entsteht dein Fahrplan: was sie antreibt, was hilft und was schadet.', N + ' kurze Fragen in ' + secs.length + ' Richtungen. Du musst nicht alle beantworten und kannst jederzeit auswerten lassen. Deine Antworten bleiben auf diesem Gerät.') + '<details class="why kh"><summary>Was das ist und was nicht</summary><p>' + esc(KOMPASS.hinweis) + '</p></details>' +
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
    return '<div class="stack-lg">' + kopf('Üben', 'Gesprächstrainer', 'Üben, bevor es ernst wird: Du liest, was die Person sagt, wählst eine Antwort und siehst sofort, wie sie wirkt.', 'Die eine richtige Antwort gibt es selten. Manche Antworten schließen aber Türen.') + '<div class="grid">' +
      SZENARIEN.map(function (s) { return '<button class="card card-link stack" data-act="trainer-start" data-id="' + esc(s.id) + '"><div class="row">' + ebeneChip(s.ebene) + '</div><strong>' + esc(s.titel) + '</strong><p class="small muted">' + esc(s.kontext) + '</p></button>'; }).join('') + '</div></div>';
  }
  var sz = findIn(SZENARIEN, t.id), node = sz.knoten[t.node];
  if (!node) return '<div class="note bad">Szenario-Knoten fehlt. <button class="btn sm" data-act="trainer-exit">Zurück</button></div>';
  var head = '<div class="page-head"><div class="eyebrow">Szenario · Schritt ' + (t.history.length + 1) + ' · <span class="score">' + t.score + ' / ' + t.max + ' Punkte</span></div><h1>' + esc(sz.titel) + '</h1><p>' + esc(sz.kontext) + ' <em>' + esc(sz.person) + '</em></p></div>';
  if (!node.optionen || !node.optionen.length) {
    return '<div class="stack-lg">' + head + '<div class="bubble"><div class="who">Die Person</div>' + esc(node.aussage) + '</div><div class="panel stack"><h2>Fazit</h2><p>' + esc(node.abschluss || '') + '</p><p class="score">Ergebnis: ' + t.score + ' von ' + t.max + ' Punkten.</p><div class="row"><button class="btn primary" data-act="trainer-start" data-id="' + esc(sz.id) + '">Noch einmal</button><button class="btn" data-act="trainer-exit">Andere Szenarien</button></div><p class="small muted">Hat dir das Üben geholfen? <button class="link" style="font-size:inherit;padding:0" data-go="teilen">Zeig die App weiter ›</button></p></div></div>';
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
  return '<div class="stack-lg">' + kopf('Viele Menschen', 'Kampagnenplaner', 'Du willst nicht nur eine Person erreichen, sondern viele, etwa im Verein, in der Gemeinde oder an der Schule? Der Planer schlägt Schritte vor, die zu euch passen.', 'Jeder Baustein sagt, wie gut belegt er ist, damit ihr keine Energie in Dinge steckt, die nicht wirken.') + nav + body + '</div>';
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
  var rows = KAMPAGNE.kennzahlen.map(function (k) { return '<tr><td data-label="Kennzahl"><strong>' + esc(k.name) + '</strong></td><td data-label="Wie messen">' + esc(k.wie) + '</td><td data-label="Warum">' + esc(k.warum) + '</td><td data-label="Fallstrick">' + esc(k.fallstrick) + '</td></tr>'; }).join('');
  var zh = MESSUNG && MESSUNG.zeithorizont ? '<div class="note">' + paras(MESSUNG.zeithorizont) + '</div>' : '';
  return '<div class="stack">' + zh + '<div class="tbl-wrap"><table class="stack-m"><thead><tr><th>Kennzahl</th><th>So messt ihr</th><th>Warum</th><th>Fallstrick</th></tr></thead><tbody>' + rows + '</tbody></table></div></div>';
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
  return '<div class="stack-lg">' + kopf('Wissen', 'Gesprächstechniken', 'Warum wirkt Zuhören oft besser als Widerlegen? Hier steht jede Technik mit Anleitung, Beispiel, Grenzen und Quellen.', '') + '<div class="legend center"><span>' + ev('stark') + ' gut belegt</span><span>' + ev('mittel') + ' einzelne gute Studien</span><span>' + ev('schwach') + ' Praxiswissen</span><span>' + ev('umstritten') + ' widersprüchlich</span></div><div class="row">' + fe + fv + '</div><div class="faq">' + (list || '<div class="empty">Keine Technik passt zu diesem Filter.</div>') + '</div></div>';
}

/* ---------- Leitplanken und Hilfe ---------- */
function vLeitplanken() {
  if (!LEIT) return missing('Leitplanken');
  var g = (LEIT.grundsaetze || []).map(function (x) { return '<details class="acc"><summary>' + esc(x.titel) + '</summary><div class="body stack"><p>' + esc(x.text) + '</p><p class="muted small"><strong>Warum:</strong> ' + esc(x.warum) + '</p>' + quellen(x.quelle ? [x.quelle] : []) + '</div></details>'; }).join('');
  var r = (LEIT.rote_linien || []).map(function (x) { return '<tr><td data-label="Das nicht">' + esc(x.text) + '</td><td data-label="Stattdessen">' + esc(x.stattdessen) + '</td></tr>'; }).join('');
  var gef = (LEIT.gefahr || []).map(function (x) { return '<div class="note bad stack"><strong>' + esc(x.signal) + '</strong><p>' + esc(x.aktion) + '</p><p class="small"><strong>Anlaufstelle:</strong> ' + esc(x.anlaufstelle) + '</p></div>'; }).join('');
  var s = (LEIT.selbstschutz || []).map(function (x) { return '<div class="card"><strong>' + esc(x.titel) + '</strong><p class="small">' + esc(x.text) + '</p></div>'; }).join('');
  var ds = LEIT.datenschutz ? '<div class="note stack"><strong>' + esc(LEIT.datenschutz.kurz) + '</strong>' + ul(LEIT.datenschutz.regeln) + '</div>' : '';
  var groups = {};
  HILFE.forEach(function (h) { (groups[h.fuer] = groups[h.fuer] || []).push(h); });
  var hilfe = Object.keys(groups).map(function (k) {
    return '<section class="stack"><h3>' + esc(k) + '</h3><div class="grid">' + groups[k].map(function (h) { return '<div class="card stack"><div class="row"><strong>' + esc(h.name) + '</strong>' + chip(h.region) + '</div><p class="small">' + esc(h.beschreibung) + '</p>' + (h.url ? '<a class="small" href="' + esc(h.url) + '" target="_blank" rel="noopener">' + esc(h.url.replace(/^https?:\/\//, '')) + '</a>' : '') + (h.telefon ? '<div class="small"><strong>Telefon:</strong> <span style="user-select:all">' + esc(h.telefon) + '</span></div>' : '') + '</div>'; }).join('') + '</div></section>';
  }).join('');
  return '<div class="stack-lg">' + kopf('Schutz und Regeln', 'Leitplanken', 'Was du lieber lässt, wie du auf dich achtest, wann es gefährlich wird und wo du Hilfe bekommst.', 'Diese Regeln schützen die Person, dich und eure Beziehung. Sie bewahren dich davor, Menschen zu überwältigen, statt sie zu überzeugen.') +
    '<section class="stack" id="grundsaetze"><h2>Grundsätze</h2><div class="faq">' + g + '</div></section>' +
    (r ? '<section class="stack" id="rote-linien"><h2>Rote Linien</h2><div class="tbl-wrap"><table class="stack-m"><thead><tr><th>Nicht so</th><th>Stattdessen</th></tr></thead><tbody>' + r + '</tbody></table></div></section>' : '') +
    (gef ? '<section class="stack" id="gefahr"><h2>Wenn es gefährlich wird</h2>' + gef + '</section>' : '') +
    (s ? '<section class="stack" id="selbstschutz"><h2>Selbstschutz</h2><div class="grid">' + s + '</div></section>' : '') +
    (ds ? '<section class="stack" id="datenschutz"><h2>Datenschutz</h2>' + ds + '</section>' : '') +
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
  return '<div class="stack-lg">' + kopf('Meine Inhalte', 'Tagebuch', 'Nach einem Gespräch kurz notieren, was gewirkt hat. So erkennst du mit der Zeit, was bei dieser Person hilft.', 'Ein Werkzeug zur Selbstreflexion, keine Akte über eine Person.') +
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
      '<p class="small muted">Die Sicherung enthält Kompass-Ergebnis, Mein Fall, Archiv, Kampagnenplan, Tagebuch und deine Anfragen. Deine Antworten aus „Wo stehe ich?“ sind nicht dabei, sie bleiben nur auf diesem Gerät. Die Sicherung kann Notizen über andere Menschen enthalten. Schick sie dir selbst – per Signal, per Mail oder in deine Notizen – oder speichere sie als Datei. Auf dem anderen Gerät spielst du sie an dieser Stelle wieder ein.</p>' +
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
/* ---------- Argument fehlt: Anfragen an den Server, Entwürfe und geprüfte Antworten ---------- */
var ANF_STATUS = { 'in-arbeit': 'KI schreibt den Entwurf', entwurf: 'KI-Entwurf, noch nicht geprüft', ungeeignet: 'Kein Entwurf möglich', abgelehnt: 'Kein KI-Entwurf', fehler: 'Nicht geklappt', beantwortet: 'Geprüft beantwortet' };
function anfGet() { return store.get('anfragen', []); }
function anfSet(l) { store.set('anfragen', l); }
function anfPatch(id, patch) { var l = anfGet(); l.forEach(function (x) { if (x.id === id) Object.keys(patch).forEach(function (k) { x[k] = patch[k]; }); }); anfSet(l); }
function apiCall(method, pfad, body) {
  return fetch(API + pfad, { method: method, headers: body ? { 'Content-Type': 'application/json' } : {}, body: body ? JSON.stringify(body) : undefined }).then(function (r) {
    return r.json().catch(function () { return {}; }).then(function (d) { if (!r.ok) { var err = new Error(d.fehler || 'Der Server antwortet gerade nicht.'); err.status = r.status; throw err; } return d; });
  });
}
// Einträge mit weg warten nur noch darauf, dass der Server das Löschen bestätigt; sie sind unsichtbar.
function anfSichtbar() { return anfGet().filter(function (x) { return !x.weg; }); }
function anfVorhanden(id) { return anfSichtbar().some(function (x) { return x.id === id; }); }
// Löscht auf dem Server und erst danach die Nummer auf dem Gerät, damit ein gescheitertes Löschen später wiederholt werden kann.
// Satz, Kontext und Entwurf verschwinden sofort vom Gerät; nur die Nummer bleibt, bis der Server bestätigt (ohne Server-Adresse bis später).
var ANF_LOESCH = {};
function anfFinde(id) { return anfGet().filter(function (x) { return x.id === id; })[0] || null; }
function anfServerLoeschen(id, melden) {
  anfSet(anfGet().map(function (x) { return x.id === id ? { id: id, weg: true } : x; }));
  var raus = function () { anfSet(anfGet().filter(function (x) { return x.id !== id; })); };
  if (!API || ANF_LOESCH[id]) return;
  ANF_LOESCH[id] = true;
  apiCall('DELETE', '/api/anfragen/' + id).then(function () { delete ANF_LOESCH[id]; raus(); if (melden) toast('Anfrage gelöscht, auch auf dem Server'); }, function (err) {
    delete ANF_LOESCH[id];
    if (err && err.status === 404) { raus(); if (melden) toast('Anfrage gelöscht'); }
    else if (melden) toast('Von diesem Gerät entfernt. Auf dem Server wird sie gelöscht, sobald er wieder erreichbar ist.');
  });
}
// altId: beim erneuten Senden wird die alte, gescheiterte Anfrage erst nach Erfolg ersetzt und dann auch auf dem Server gelöscht.
function anfSenden(argument, kontext, altId) {
  if (state.anfBusy) return;
  state.anfBusy = true; render();
  apiCall('POST', '/api/anfragen', { argument: argument, kontext: kontext }).then(function (d) {
    var l = anfGet(); l.unshift({ id: d.id, argument: argument, kontext: kontext, datum: today(), seit: Date.now(), status: d.status }); anfSet(l);
    state.anfBusy = false; state.anfFehler = null; if (!altId) state.anfForm = null;
    if (altId) anfServerLoeschen(altId);
    state.antTab = 'anfragen'; state.anfOffen = d.id; render(); toast('Anfrage gesendet');
    anfPollen(d.id, 0);
  }).catch(function (err) {
    var text = err && err.name === 'TypeError' ? 'Keine Verbindung zum Server. Bitte später noch einmal.' : err.message;
    state.anfBusy = false; if (!altId) state.anfFehler = text; render(); toast(text);
  });
}
// Fragt alle drei Sekunden nach, bis der Entwurf fertig ist, je Anfrage nur ein Abfrager. Nach etwa drei Minuten geht es beim nächsten Öffnen von „Meine Anfragen“ weiter.
var ANF_POLL = {};
function anfPollen(id, n) {
  if (!n) { if (ANF_POLL[id]) return; ANF_POLL[id] = true; }
  if (n > 60 || !anfVorhanden(id)) { delete ANF_POLL[id]; return; }
  setTimeout(function () {
    if (!anfVorhanden(id)) { delete ANF_POLL[id]; return; }
    // Ergebnisse nur übernehmen, solange der Eintrag noch läuft; eine inzwischen erkannte geprüfte Antwort hat Vorrang.
    var laeuft = function () { var x = anfFinde(id); return x && !x.weg && !x.argId && x.status === 'in-arbeit'; };
    apiCall('GET', '/api/anfragen/' + id).then(function (d) {
      if (d.status === 'in-arbeit') { anfPollen(id, n + 1); return; }
      delete ANF_POLL[id];
      if (!laeuft()) return;
      anfPatch(id, { status: d.status, hinweis: d.hinweis || '', entwurf: d.entwurf || null });
      if (state.route === 'antworten' && state.antTab === 'anfragen') render();
      toast(d.status === 'entwurf' ? 'Dein KI-Entwurf ist da' : 'Antwort auf deine Anfrage ist da');
    }).catch(function (err) {
      if (err && err.status === 404) { delete ANF_POLL[id]; if (laeuft()) { anfPatch(id, { status: 'fehler', hinweis: 'Der Server kennt diese Anfrage nicht mehr. Du kannst sie noch einmal senden.' }); if (state.route === 'antworten' && state.antTab === 'anfragen') render(); } return; }
      anfPollen(id, n + 1);
    });
  }, n ? 3000 : 2000);
}
// Holt unfertige Entwürfe ab und wiederholt Löschungen, die der Server noch nicht bestätigt hat.
function anfWeiter() { if (API) anfGet().forEach(function (x) { if (x.weg) anfServerLoeschen(x.id); else if (x.status === 'in-arbeit' && !x.argId) anfPollen(x.id, 0); }); }
// In den geprüften Einträgen steht nur der SHA-256-Hash der Nummer (Feld anfragen), damit die Nummer selbst nie öffentlich wird.
function anfHash(id) {
  return crypto.subtle.digest('SHA-256', new TextEncoder().encode(id)).then(function (b) { return Array.prototype.map.call(new Uint8Array(b), function (x) { return ('0' + x.toString(16)).slice(-2); }).join(''); });
}
// Beim Start: Erst Anfragen, deren Hash in einem geprüften Eintrag steht, als beantwortet erkennen (und auf dem Server löschen),
// danach unfertige Entwürfe abholen, damit kein Abholen die erkannte Antwort überschreibt.
function anfAbgleich() {
  var erledigt = {};
  if (ARG) ARG.argumente.forEach(function (g) { (g.anfragen || []).forEach(function (h) { erledigt[h] = g.id; }); });
  var offen = anfSichtbar().filter(function (x) { return !x.argId; });
  if (!offen.length || !Object.keys(erledigt).length || !(window.crypto && window.crypto.subtle && window.TextEncoder)) { anfWeiter(); return; }
  Promise.all(offen.map(function (x) { return anfHash(x.id); })).then(function (hashes) {
    var neu = false;
    offen.forEach(function (x, i) {
      var arg = erledigt[hashes[i]]; if (!arg) return;
      anfPatch(x.id, { argId: arg, status: 'beantwortet', neu: true, entwurf: null }); neu = true;
      if (API) apiCall('DELETE', '/api/anfragen/' + x.id).catch(function () {});
    });
    if (neu) render();
  }).catch(function () {}).then(anfWeiter);
}
function anfBanner() {
  return anfSichtbar().filter(function (x) { return x.neu && x.argId; }).map(function (x) {
    var a = argById(x.argId);
    return '<div class="note good"><strong>Deine Anfrage ist jetzt geprüft beantwortet</strong><p>„' + esc(x.argument) + '“' + (a ? ' steht jetzt im Playbook unter „' + esc(a.titel) + '“.' : '') + '</p><div class="row"><button class="btn sm primary" data-act="anf-ansehen" data-id="' + esc(x.id) + '">Geprüfte Antwort öffnen</button></div></div>';
  }).join('');
}
function anfKasten(vorschlag) {
  var f = state.anfForm || { argument: vorschlag || '', kontext: '', ok: false };
  return '<section class="panel stack"><div><div class="eyebrow">Argument fehlt?</div><h2>Sag uns, was die Person sagt</h2><p class="muted" style="max-width:62ch">Du bekommst gleich einen KI-Entwurf im gewohnten Aufbau. Innerhalb von etwa vier Wochen arbeiten wir eine geprüfte Antwort mit belegten Fakten in die App ein. Dann meldet sich die App bei dir.</p></div>' +
    '<form class="form-grid" data-form="anfrage"><label class="fld wide">Was sagt die Person?<textarea name="argument" maxlength="300" placeholder="Zum Beispiel: Die Rente ist sowieso weg, für uns bleibt nichts.">' + esc(f.argument) + '</textarea></label>' +
    '<label class="fld wide">Kontext, freiwillig und ohne Namen<input type="text" name="kontext" maxlength="300" value="' + esc(f.kontext) + '" placeholder="Zum Beispiel: älterer Kollege, Thema Rente"></label>' +
    '<label class="opt wide"><input class="vh" type="checkbox" name="ok"' + (f.ok ? ' checked' : '') + '><i class="ck" aria-hidden="true"></i><span class="small">Ich willige ein, dass Satz und Kontext über Cloudflare an den ' + NAME + '-Server und zur Beantwortung an Anthropic (Claude, USA) gehen. Ich habe keine Namen und keine Angaben eingetragen, an denen man jemanden erkennen kann.</span></label>' +
    (state.anfFehler ? '<div class="note bad wide"><strong>Nicht gesendet</strong><p>' + esc(state.anfFehler) + '</p></div>' : '') +
    '<div class="row wide"><button class="btn primary" type="submit"' + (state.anfBusy ? ' disabled' : '') + '>' + (state.anfBusy ? 'Wird gesendet …' : 'Anfrage senden und KI-Entwurf holen') + '</button></div></form></section>';
}
function anfEntwurf(e) {
  var aehnlich = e.aehnlich ? argById(e.aehnlich) : null;
  return '<div class="note warn"><strong>KI-Entwurf, noch nicht geprüft</strong><p>Erlebnis-Sätze nur nutzen, wenn du so etwas wirklich erlebt hast. Belegte Fakten kommen mit der geprüften Fassung.</p>' + (e.hinweis ? '<p>' + esc(e.hinweis) + '</p>' : '') + '</div>' +
    (aehnlich ? '<div class="note"><strong>Schon im Playbook</strong><p>Ein ähnliches Argument gibt es bereits. <button class="link" data-go="antworten" data-arg="' + esc(aehnlich.id) + '">„' + esc(aehnlich.titel) + '“ öffnen ›</button></p></div>' : '') +
    playbook(e, false) +
    (e.recherche && e.recherche.length ? '<div class="note"><strong>Das prüfen wir noch</strong>' + ul(e.recherche) + '</div>' : '');
}
function anfNeuKnopf(x) { return API ? '<div class="row"><button class="btn sm" data-act="anf-neu" data-id="' + esc(x.id) + '"' + (state.anfBusy ? ' disabled' : '') + '>' + (state.anfBusy ? 'Wird gesendet …' : 'Noch einmal senden') + '</button></div>' : ''; }
function anfListe() {
  var l = anfSichtbar();
  if (!l.length) return '<div class="empty">Noch keine Anfragen. Fehlt dir ein Argument, kannst du es unter „Argumente“ anfragen.</div>';
  return '<p class="muted" style="max-width:62ch">Die Liste deiner Anfragen liegt nur auf diesem Gerät.' + (API ? ' Der Server speichert Satz, Kontext und Entwurf ohne Bezug zu dir, höchstens 180 Tage. „Entfernen“ löscht die Anfrage auch dort.' : '') + '</p>' + l.map(function (x) {
    var offen = state.anfOffen === x.id, mitEntwurf = x.status === 'entwurf' && x.entwurf, inhalt = '';
    var haengt = x.status === 'in-arbeit' && (x.seit ? Date.now() - x.seit > 6e5 : x.datum < today());
    if (x.status === 'beantwortet') inhalt = x.argId ? '<div class="row"><button class="btn sm primary" data-act="anf-ansehen" data-id="' + esc(x.id) + '">Geprüfte Antwort öffnen</button></div>' : '<p class="small muted">Geprüft beantwortet. Die Antwort erscheint mit dem nächsten Update der App.</p>';
    else if (haengt) inhalt = '<p class="small">Der Server hat noch nicht geantwortet. Du kannst die Anfrage noch einmal senden.</p>' + anfNeuKnopf(x);
    else if (x.status === 'in-arbeit') inhalt = '<p class="small muted">Das dauert meist unter einer Minute. Du kannst die App schließen, der Entwurf wird beim nächsten Öffnen abgeholt.</p>';
    else if (mitEntwurf) inhalt = offen ? anfEntwurf(x.entwurf) : '';
    else inhalt = '<p class="small">' + esc(x.hinweis || 'Bitte später noch einmal versuchen.') + '</p>' + (x.status === 'fehler' ? anfNeuKnopf(x) : '');
    return '<section class="panel stack"><div class="row"><span class="tag">' + esc(ANF_STATUS[x.status] || x.status) + '</span><span class="small muted">' + esc(x.datum) + '</span><span style="margin-left:auto"></span>' + (mitEntwurf ? '<button class="link" data-act="anf-toggle" data-id="' + esc(x.id) + '">' + (offen ? 'Entwurf schließen' : 'Entwurf ansehen') + '</button>' : '') + '<button class="link" data-act="anf-del" data-id="' + esc(x.id) + '">Entfernen</button></div><h3>„' + esc(x.argument) + '“</h3>' + inhalt + '</section>';
  }).join('');
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
    '<div class="row">' + (a.techniken && a.techniken.length ? '<span class="small muted">Techniken:</span>' + technikChips(a.techniken) : '') + '<span style="margin-left:auto"></span>' + (a.id ? '<button class="btn sm' + (inFall ? '' : ' primary') + '" data-act="fall-arg" data-id="' + esc(a.id) + '">' + (inFall ? 'Aus meinem Fall entfernen' : 'Die Person sagt das: zu meinem Fall') + '</button>' : '') + (kompakt ? '<button class="btn sm" data-go="antworten" data-arg="' + esc(a.id) + '">Ganzes Playbook</button>' : '') + '</div>' +
  '</div>';
}
function vAntworten() {
  if (!ARG) return missing('Antworten');
  var tabs = [['argumente', 'Argumente'], ['verhalten', 'Verhalten'], ['studien', 'Studien lesen']];
  if (API || anfSichtbar().length) tabs.push(['anfragen', 'Meine Anfragen']);
  var nav = '<div class="seg" role="tablist">' + tabs.map(function (t) { return '<button type="button" role="tab" aria-pressed="' + (state.antTab === t[0]) + '" data-act="ant-tab" data-tab="' + t[0] + '">' + t[1] + '</button>'; }).join('') + '</div>';
  var body = '';
  if (state.antTab === 'verhalten') {
    body = '<div class="faq">' + (ARG.verhalten || []).map(function (v) { return '<details class="acc"><summary>' + esc(v.verhalten) + '</summary><div class="body stack"><p class="muted">' + esc(v.dahinter) + '</p><div class="station-detail"><div><h4>So verhältst du dich</h4>' + ol(v.dann) + '</div><div class="note bad"><strong>Macht es schlimmer</strong>' + ul(v.nicht) + '</div></div><div><h4>Was du sagen kannst</h4>' + sagenRows(v.sagen, v.verhalten) + '</div></div></details>'; }).join('') + '</div>';
  } else if (state.antTab === 'anfragen') {
    body = anfListe();
  } else if (state.antTab === 'studien') {
    body = '<p class="muted" style="max-width:62ch">Zahlen sind in diesen Gesprächen selten das Problem, ihre Deutung schon. Diese Regeln helfen dir, eine Zahl gemeinsam mit der Person zu prüfen, statt sie ihr entgegenzuhalten.</p><div class="faq">' + (ARG.studien_lesen || []).map(function (s) { return '<details class="acc"><summary>' + esc(s.titel) + '</summary><div class="body stack">' + paras(s.text) + '<div class="quote">' + esc(s.beispiel) + '</div></div></details>'; }).join('') + '</div>';
  } else {
    var q = (state.argQ || '').toLowerCase();
    var kats = [['alle', 'Alle']].concat((ARG.kategorien || []).map(function (k) { return [k.id, k.name]; }));
    var list = (ARG.argumente || []).filter(function (a) { return (state.argKat === 'alle' || !state.argKat || a.kategorie === state.argKat) && (!q || [a.titel, katName(a.kategorie)].concat(a.varianten || [], a.stichworte || []).join(' ').toLowerCase().indexOf(q) >= 0); });
    var sel = state.arg ? argById(state.arg) : null;
    body = '<div class="row"><input type="text" id="arg-q" placeholder="Argument suchen, zum Beispiel „Medien“" value="' + esc(state.argQ || '') + '" style="max-width:360px"></div>' + seg('argKat', kats) +
      (sel ? '<section class="panel stack"><div class="row"><span class="tag">' + esc(katName(sel.kategorie)) + '</span><button class="link" style="margin-left:auto" data-act="arg-open" data-id="">Schließen</button></div><h2>„' + esc(sel.titel) + '“</h2><div class="row">' + (sel.varianten || []).map(function (v) { return chip(v); }).join('') + '</div>' + playbook(sel, false) + '</section>' : '') +
      '<div class="grid">' + list.map(function (a) { var on = fallGet().argumente.indexOf(a.id) >= 0; return '<div class="card card-link stack" role="button" tabindex="0" data-act="arg-open" data-id="' + esc(a.id) + '"><div class="row"><span class="tag">' + esc(katName(a.kategorie)) + '</span>' + (on ? chip('Mein Fall') : '') + '</div><strong>„' + esc(a.titel) + '“</strong><p class="small muted">' + esc((a.varianten || []).join(' · ')) + '</p></div>'; }).join('') + '</div>' + (list.length ? '' : '<div class="empty">Kein Argument passt zur Suche.</div>') +
      (API ? anfKasten(list.length ? '' : state.argQ) : '');
  }
  return '<div class="stack-lg">' + kopf('Argumentieren', 'Antworten', 'Die Person sagt einen bestimmten Satz, und dir fehlt die Antwort? Such den Satz. Du bekommst den richtigen Ton, Wörter, die du meiden solltest, und wörtliche Antworten.', 'Jeden Satz kannst du mit „+ Archiv“ für später speichern.') + anfBanner() + nav + body + '</div>';
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
  return '<div class="stack-lg">' + kopf('Meine Inhalte', 'Archiv', 'Deine gesammelten Sätze und Fakten für den Moment, in dem dir im Gespräch nichts mehr einfällt.', 'Speichere Sätze aus der App oder eigene Notizen. Alles bleibt auf deinem Gerät und ist in der Sicherung enthalten.') +
    '<section class="bubble"><div class="who">Blackout? Drei Sätze, die immer gehen</div>' + rettung.map(function (s, i) { return '<p class="rett">' + (i + 1) + '. „' + esc(plain(s)) + '“</p>'; }).join('') + '<p class="small" style="opacity:.7;margin-top:10px">Markiere eigene Einträge als Rettungssatz, dann stehen sie hier.</p></section>' +
    '<form class="panel form-grid" data-form="archiv"><label class="fld">Art<select name="typ" id="ar-typ"><option value="notiz">Notiz</option><option value="satz">Satz</option><option value="fakt">Fakt</option><option value="link">Link</option></select></label><label class="fld">Woher<input type="text" name="herkunft" id="ar-herkunft" placeholder="zum Beispiel: eigenes Gespräch, Artikel"></label><label class="fld wide">Text<textarea name="text" id="ar-text" required placeholder="Ein Satz, ein Fakt, ein Gedanke"></textarea></label><label class="fld">Link<input type="text" name="url" id="ar-url" placeholder="https://…"></label><label class="fld">Quelle<input type="text" name="quelle" id="ar-quelle" placeholder="Titel der Quelle"></label><div class="wide row"><button class="btn primary" type="submit">Speichern</button></div></form>' +
    '<section class="stack"><div class="row"><h2>Einträge</h2><input type="text" id="arch-q" placeholder="Suchen" value="' + esc(state.archQ || '') + '" style="max-width:260px;margin-left:auto"></div>' + (items || '<div class="empty">Noch nichts gespeichert. Im Playbook unter „Antworten“ steht an jedem Satz „+ Archiv“.</div>') + '</section></div>';
}
function fallHub(res) {
  var f = fallGet(), tab = state.fallTab || 'einstellung';
  var tabs = [['einstellung', 'Deine innere Einstellung'], ['person', 'Die Einstellung der Person'], ['argumente', 'Die Argumente der Person'], ['antworten', 'Deine Antworten bislang'], ['empfehlungen', 'Empfehlungen'], ['archiv', 'Archiv']];
  var nav = '<select class="only-mobile ksel" data-act="fall-select" aria-label="Abschnitt wählen">' + tabs.map(function (t, i) { return '<option value="' + t[0] + '"' + (tab === t[0] ? ' selected' : '') + '>' + (i + 1) + ' · ' + t[1] + '</option>'; }).join('') + '</select><div class="knav only-desktop">' + tabs.map(function (t, i) { return '<button type="button" class="' + (tab === t[0] ? 'cur' : '') + '" data-act="fall-tab" data-tab="' + t[0] + '"><span class="n">' + (i + 1) + '</span><span class="t">' + t[1] + '</span></button>'; }).join('') + '</div>';
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

var VIEWS = { start: vStart, meins: vMeins, suche: vSuche, antworten: vAntworten, archiv: vArchiv, netz: vNetz, kompass: vKompass, trainer: vTrainer, kampagne: vKampagne, wissen: vWissen, leitplanken: vLeitplanken, tagebuch: vTagebuch, teilen: vTeilen, selbsttest: vSelbsttest };
HUB_IDS.forEach(function (h) { VIEWS[h] = function () { return vHub(h); }; });
function trainerNeu(id) { var sz = findIn(SZENARIEN, id); return sz ? { id: sz.id, node: sz.start, chosen: null, history: [], score: 0, max: 0, order: {} } : null; }
var AFTER = {
  selbsttest: function () { if (state.stFokus) { var f = $('#' + state.stFokus); state.stFokus = null; if (f) { try { f.focus({ preventScroll: true }); } catch (e) { f.focus(); } } } },
  // Großer QR-Code: Tastatur-Fokus auf „Schließen“ setzen und nach dem Schließen zurück auf „Groß zeigen“
  teilen: function () {
    if (state.zeigen) { var zu = $('#zeigen-zu'); if (zu) zu.focus(); }
    else if (state.focusId === 'zeigen-auf') { var auf = $('#zeigen-auf'); if (auf) auf.focus(); state.focusId = null; }
  },
  suche: function () { bindSearch('such-q', 'suchQ'); },
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
    if (d.anttab) patch.antTab = d.anttab;
    if (d.argq != null) { patch.argQ = d.argq; patch.antTab = 'argumente'; patch.arg = null; }
    if (d.archq != null) patch.archQ = d.archq;
    if (d.anker) patch.anker = d.anker;
    if (d.szenario) patch.trainer = trainerNeu(d.szenario);
    go(d.go, patch);
    if (d.anttab === 'anfragen') anfWeiter();
    return;
  }
  var a = d.act;
  if (a === 'filter') { state[d.key] = d.val; render(); }
  else if (a === 'kompass-edit') { var kr = store.get('kompass', null); if (kr && kr.answers) kSaveDraft({ answers: kr.answers }); state.kompassEdit = true; state.kStep = 0; render(); }
  else if (a === 'kompass-cancel') { state.kompassEdit = false; render(); }
  else if (a === 'kompass-reset') { store.del('kompass'); store.del('kompass-draft'); state.kompassEdit = false; state.kStep = 0; render(); }
  else if (a === 'k-step') { var kf = $('form[data-form="kompass"]'); if (kf) kCollect(kf); kGoStep(+d.step); }
  else if (a === 'k-next' || a === 'k-prev') { var kf2 = $('form[data-form="kompass"]'); var cur = kf2 ? +(kf2.getAttribute('data-step') || 0) : 0; if (kf2) kCollect(kf2); kGoStep(cur + (a === 'k-next' ? 1 : -1)); }
  else if (a === 'copy-kompass') { var r = store.get('kompass', null); if (r) copyText(kompassMarkdown(r)); }
  else if (a === 'trainer-start') { state.trainer = trainerNeu(d.id); render(); }
  else if (a === 'such-set') { state.suchQ = d.q || ''; state.focusId = 'such-q'; render(); }
  else if (a === 'trainer-pick') { var t = state.trainer, node = findIn(SZENARIEN, t.id).knoten[t.node], o = node.optionen[+d.idx]; if (!o) return; t.chosen = +d.idx; t.max += 2; t.score += o.bewertung === 'gut' ? 2 : o.bewertung === 'ok' ? 1 : 0; render(); }
  else if (a === 'trainer-next') { var tr = state.trainer, sz = findIn(SZENARIEN, tr.id), nd = sz.knoten[tr.node], op = nd.optionen[tr.chosen]; if (!op) return; tr.history.push(tr.node); tr.node = op.weiter && sz.knoten[op.weiter] ? op.weiter : null; tr.chosen = null; if (!tr.node) { tr.node = '__ende'; sz.knoten.__ende = sz.knoten.__ende || { aussage: 'Das Gespräch endet hier.', optionen: [], abschluss: 'Dieses Szenario hat kein eigenes Fazit.' }; } render(); }
  else if (a === 'trainer-exit') { state.trainer = null; render(); }
  else if (a === 'kamp-tab') { state.kampTab = d.tab; render(); }
  else if (a === 'phase') { state.phase = d.id; state.phaseScroll = !!d.id; render(); }
  else if (a === 'ant-tab') { state.antTab = d.tab; render(); if (d.tab === 'anfragen') anfWeiter(); }
  else if (a === 'arg-open') { state.arg = d.id || null; render(); if (d.id) { var ao = $('.panel h2'); if (ao) ao.scrollIntoView({ block: 'start' }); } }
  else if (a === 'fall-arg') { var ff = fallGet(), ix = ff.argumente.indexOf(d.id); if (ix >= 0) ff.argumente.splice(ix, 1); else ff.argumente.push(d.id); fallSet(ff); render(); toast(ix >= 0 ? 'Aus deinem Fall entfernt' : 'Zu deinem Fall hinzugefügt'); }
  else if (a === 'fall-tab') { state.fallTab = d.tab; render(); window.scrollTo(0, 0); }
  else if (a === 'arch-add') { archAdd({ typ: d.typ || 'satz', text: d.text, herkunft: d.herkunft || '', url: d.url || '', quelle: d.quelle || '' }); }
  else if (a === 'arch-pin') { var ap = archGet(), pi = ap.pins.indexOf(d.id); if (pi >= 0) ap.pins.splice(pi, 1); else { if (ap.pins.length >= 3) { toast('Höchstens drei Rettungssätze. Entferne erst einen.'); return; } ap.pins.push(d.id); } archSet(ap); render(); }
  else if (a === 'arch-del') { state.confirmDel = d.id; render(); }
  else if (a === 'arch-del-no') { state.confirmDel = null; render(); }
  else if (a === 'arch-del-yes') { var ad = archGet(); ad.eintraege = ad.eintraege.filter(function (x) { return x.id !== d.id; }); ad.pins = ad.pins.filter(function (x) { return x !== d.id; }); archSet(ad); state.confirmDel = null; render(); toast('Eintrag gelöscht'); }
  else if (a === 'copy-text') { copyText(d.text || ''); }
  else if (a === 'sheet') { state.sheet = !state.sheet; render(); }
  else if (a === 'st-teil') { var st0 = stState(); state.stHinweis = null; if (d.teil === 'thesen') { var offenI = -1; ST.thesen.forEach(function (t, n) { if (offenI < 0 && !st0.a[t.id]) offenI = n; }); if (offenI < 0 && ST.thesen.length) st0.teil = 'ergebnis'; else { st0.teil = 'thesen'; st0.i = Math.max(offenI, 0); } } else st0.teil = d.teil; render(); window.scrollTo(0, 0); }
  else if (a === 'st-start') { stState().teil = null; state.stHinweis = null; render(); window.scrollTo(0, 0); }
  else if (a === 'st-wahl') { stState().s[d.f] = d.o; state.stHinweis = null; state.stFokus = 'st-o-' + d.f + '-' + d.o; stMerken(); render(); }
  else if (a === 'st-auswerten') { var st1 = stState(), fehlt1 = ST.staerken.fragen.filter(function (f) { return !st1.s[f.id]; }).length; if (fehlt1) { state.stHinweis = 'Es fehlen noch ' + anz(fehlt1, 'Antwort', 'Antworten') + '.'; render(); return; } st1.staerkeFertig = true; stMerken(); render(); window.scrollTo(0, 0); }
  else if (a === 'st-staerken-neu') { stState().staerkeFertig = false; render(); window.scrollTo(0, 0); }
  else if (a === 'st-antwort') { var st2 = stState(), t2 = ST.thesen[st2.i]; if (!t2) return; st2.a[t2.id] = d.wert; st2.i++; if (st2.i >= ST.thesen.length) st2.teil = 'ergebnis'; else state.stFokus = 'st-these'; stMerken(); render(); window.scrollTo(0, 0); }
  else if (a === 'st-weiter') { var st6 = stState(); st6.i++; if (st6.i >= ST.thesen.length) st6.teil = 'ergebnis'; else state.stFokus = 'st-these'; render(); window.scrollTo(0, 0); }
  else if (a === 'st-zurueck') { var st3 = stState(); if (st3.i > 0) { st3.i--; state.stFokus = 'st-these'; } else st3.teil = null; render(); window.scrollTo(0, 0); }
  else if (a === 'st-wichtig') { var st4 = stState(), t4 = ST.thesen[st4.i]; if (t4) { st4.w[t4.id] = !st4.w[t4.id]; state.stFokus = 'st-wichtig'; stMerken(); render(); } }
  else if (a === 'st-neu') { var st5 = stState(); st5.teil = 'thesen'; st5.i = 0; render(); window.scrollTo(0, 0); }
  else if (a === 'st-speichern') { stState().gespeichert = true; stMerken(); render(); toast('Gespeichert, nur auf diesem Gerät'); }
  else if (a === 'st-loeschen') { state.stLoeschen = true; render(); }
  else if (a === 'st-loeschen-nein') { state.stLoeschen = false; render(); }
  else if (a === 'st-loeschen-ja') { store.del('selbsttest'); state.st = stLeer(); state.stHinweis = null; state.stLoeschen = false; render(); toast('Alle Antworten gelöscht'); }
  else if (a === 'zeigen') { state.zeigen = true; state.zeigenSeit = Date.now(); try { if (!(history.state && history.state.zeigen)) history.pushState({ zeigen: 1 }, ''); } catch (err) {} render(); }
  // Ein zweiter Tipp direkt nach dem Öffnen landet auf der Fläche und soll nicht gleich wieder schließen; „Schließen“ wirkt immer
  else if (a === 'zeigen-zu') { if (el.id !== 'zeigen-zu' && Date.now() - (state.zeigenSeit || 0) < 600) return; zeigenZu(); }
  else if (a === 'teilen-link') { shareText(NAME, KURZTEXT, ADRESSE); }
  else if (a === 'aushang') { if (typeof window.print === 'function') window.print(); else toast('Drucken geht hier nicht. Öffne die App dafür am Computer.'); }
  else if (a === 'check-update') { if (state.sheet) { state.sheet = false; render(); } if (window.umsteigenUpdate) window.umsteigenUpdate(); else toast('Diese Version prüft nicht automatisch. Seite neu laden.'); }
  else if (a === 'kamp-edit') { state.kampEdit = true; render(); }
  else if (a === 'kamp-cancel') { state.kampEdit = false; render(); }
  else if (a === 'kamp-reset') { store.del('kampagne'); state.kampEdit = false; render(); }
  else if (a === 'copy-kampagne') { var pl = store.get('kampagne', null); if (pl) copyText(kampagneMarkdown(pl)); }
  else if (a === 'tb-del') { state.confirmDel = d.id; render(); }
  else if (a === 'tb-del-no') { state.confirmDel = null; render(); }
  else if (a === 'tb-del-yes') { store.set('tagebuch', store.get('tagebuch', []).filter(function (x) { return x.id !== d.id; })); state.confirmDel = null; render(); toast('Eintrag gelöscht'); }
  else if (a === 'share-kompass') { var rk = store.get('kompass', null); if (rk) shareText('Mein Fahrplan aus ' + NAME, kompassMarkdown(rk)); }
  else if (a === 'share-kampagne') { var pk = store.get('kampagne', null); if (pk) shareText('Kampagnenplan aus ' + NAME, kampagneMarkdown(pk)); }
  else if (a === 'bk-copy') { copyText(backupAll()); }
  else if (a === 'bk-share') { shareText(NAME + '-Sicherung vom ' + today(), backupAll()); }
  else if (a === 'bk-download') { downloadText('umdenken-sicherung-' + today() + '.json', backupAll()); }
  else if (a === 'bk-import') { try { restoreAll($('#bk-io').value); render(); toast('Sicherung eingespielt'); } catch (err) { toast('Das ist keine gültige Sicherung.'); } }
  else if (a === 'anf-toggle') { state.anfOffen = state.anfOffen === d.id ? null : d.id; render(); }
  else if (a === 'anf-del') { anfServerLoeschen(d.id, true); render(); if (!API) toast('Von diesem Gerät entfernt'); }
  else if (a === 'anf-neu') { if (state.anfBusy) return; var an = anfSichtbar().filter(function (x) { return x.id === d.id; })[0]; if (an) anfSenden(an.argument, an.kontext || '', an.id); }
  else if (a === 'anf-ansehen') { var aa = anfGet().filter(function (x) { return x.id === d.id; })[0]; anfPatch(d.id, { neu: false }); if (aa && aa.argId) go('antworten', { arg: aa.argId, argScroll: true, antTab: 'argumente' }); else render(); }
  else if (a === 'tb-clear') { state.confirmClear = true; render(); }
  else if (a === 'tb-clear-no') { state.confirmClear = false; render(); }
  else if (a === 'tb-clear-yes') { store.del('tagebuch'); state.confirmClear = false; render(); toast('Alle Einträge gelöscht'); }
});
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && state.zeigen) { zeigenZu(); return; }
  if (e.key === 'Tab' && state.zeigen) { e.preventDefault(); var zu = $('#zeigen-zu'); if (zu) zu.focus(); return; }
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
// Eingaben im Anfrage-Formular überstehen ein Neuzeichnen der Seite, etwa wenn gerade ein Entwurf eintrifft.
function anfFormMerken(e) { var f = e.target && e.target.form; if (f && f.dataset && f.dataset.form === 'anfrage') state.anfForm = { argument: f.argument.value, kontext: f.kontext.value, ok: f.ok.checked }; }
document.addEventListener('input', anfFormMerken);
document.addEventListener('change', anfFormMerken);
document.addEventListener('change', function (e) {
  var f = e.target.closest && e.target.closest('form[data-form="kompass"]'); if (f) { kCollect(f); updateProgress(); }
  if (e.target.dataset && e.target.dataset.act === 'k-select') { var kfs = $('form[data-form="kompass"]'); if (kfs) kCollect(kfs); kGoStep(+e.target.value); return; }
  if (e.target.dataset && e.target.dataset.act === 'fall-select') { state.fallTab = e.target.value; render(); window.scrollTo(0, 0); return; }
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
  else if (f.dataset.form === 'anfrage') {
    var fq = new FormData(f), ar = String(fq.get('argument') || '').trim(), ko = String(fq.get('kontext') || '').trim();
    state.anfForm = { argument: ar, kontext: ko, ok: !!fq.get('ok') };
    if (ar.length < 8) { state.anfFehler = 'Bitte gib den Satz der Person ein, mindestens 8 Zeichen.'; render(); return; }
    if (!fq.get('ok')) { state.anfFehler = 'Bitte bestätige, dass keine Namen und keine erkennbaren Angaben drinstehen.'; render(); return; }
    state.anfFehler = null; anfSenden(ar, ko);
  }
  else if (f.dataset.form === 'archiv') { var fa = new FormData(f); var tx = String(fa.get('text') || '').trim(); if (!tx) return; archAdd({ typ: fa.get('typ') || 'notiz', text: tx, herkunft: String(fa.get('herkunft') || '').trim(), url: String(fa.get('url') || '').trim(), quelle: String(fa.get('quelle') || '').trim() }); render(); }
  else if (f.dataset.form === 'fall-antwort') { var fb = new FormData(f), ff2 = fallGet(), aid = f.dataset.arg; var t2 = String(fb.get('text') || '').trim(); if (!t2) return; (ff2.antworten[aid] = ff2.antworten[aid] || []).unshift({ id: uid(), datum: today(), text: t2, lief: fb.get('lief') || 'ok' }); fallSet(ff2); render(); toast('Notiert'); }
  else if (f.dataset.form === 'tagebuch') {
    var fd = new FormData(f);
    var entries = store.get('tagebuch', []);
    entries.push({ id: uid(), alias: String(fd.get('alias') || '').trim(), datum: fd.get('datum') || today(), linie: fd.get('linie') || '', station: fd.get('station') || '', stufe: fd.get('stufe') || '', notiz: String(fd.get('notiz') || '').trim(), naechster: String(fd.get('naechster') || '').trim() });
    store.set('tagebuch', entries); render(); toast('Gespeichert');
  }
});

var verEl = $('#ver'); if (verEl && HOSTED && window.UMSTEIGEN_VERSION) verEl.innerHTML = ' Version ' + esc(window.UMSTEIGEN_VERSION) + ' · <button class="link" style="font-size:inherit;padding:0" data-act="check-update">Nach Updates suchen</button>';
var initial = location.hash.replace('#', '');
if (ROUTES.some(function (x) { return x[0] === initial; })) state.route = initial;
anfAbgleich();
render();
})();
