// Rendert alle Ansichten mit den echten Daten in einer DOM-Attrappe und meldet Laufzeitfehler. Aufruf: node app/smoke.js
const fs = require('fs'), path = require('path'), vm = require('vm');
const handlers = {}, els = {};
function el() { return { innerHTML: '', dataset: {}, style: {}, value: '', textContent: '', clientWidth: 900, scrollLeft: 0, addEventListener(t, fn) { (this.on = this.on || {})[t] = fn; }, querySelector() { return null; }, querySelectorAll() { return []; }, scrollIntoView() {}, getAttribute() { return '0'; }, setAttribute() {}, removeAttribute() {}, remove() {}, appendChild() {}, focus() {}, select() {}, matches() { return false; } }; }
const document = { querySelector: s => els[s] || (els[s] = el()), querySelectorAll: () => [], addEventListener: (t, fn) => { handlers['doc:' + t] = fn; }, createElement: () => el(), body: el() };
const { webcrypto, createHash } = require('crypto');
// Feste App-Adresse für „Weitersagen“; Drucken, Teilen und Zwischenablage werden nur mitgezählt
const ADRESSE = 'https://beispiel.test/app/';
const geraet = { drucke: 0, geteilt: [], kopiert: [] };
const window = { APP_DATA: {}, UMSTEIGEN_HOSTED: true, UMSTEIGEN_API: 'https://api.test', UMSTEIGEN_URL: ADRESSE, print() { geraet.drucke++; }, crypto: webcrypto, TextEncoder, addEventListener: (t, fn) => { handlers['win:' + t] = fn; }, scrollTo() {} };
// Speicher im Arbeitsspeicher, vorbelegt mit einer Anfrage, die der geprüfte Eintrag unten beantwortet (dort steht nur ihr Hash)
const mem = { 'umsteigen:anfragen': JSON.stringify([{ id: 'beantwortet-1', argument: 'Testanfrage', datum: '2026-10-01', status: 'entwurf' }, { id: 'alt-1', argument: 'Lange offene Anfrage', datum: '2026-10-01', status: 'in-arbeit' }]) };
const localStorage = { getItem: k => (k in mem ? mem[k] : null), setItem: (k, v) => { mem[k] = String(v); }, removeItem: k => { delete mem[k]; }, key: i => Object.keys(mem)[i], get length() { return Object.keys(mem).length; } };
// Server-Attrappe für „Argument fehlt“
const api = { posts: [], deletes: [], postFehler: false, deleteFehler: false };
function fetchAttrappe(url, opt = {}) {
  const antwort = (ok, d, status) => Promise.resolve({ ok, status: status || (ok ? 200 : 400), json: () => Promise.resolve(d) });
  if (opt.method === 'POST' && url === 'https://api.test/api/anfragen') { if (api.postFehler) return antwort(false, { fehler: 'Zu viele Anfragen in dieser Stunde.' }, 429); api.posts.push(JSON.parse(opt.body)); return antwort(true, { id: 'neu-' + api.posts.length, status: 'in-arbeit' }); }
  if (opt.method === 'DELETE') { if (api.deleteFehler) return antwort(false, { fehler: 'nicht erreichbar' }, 502); api.deletes.push(url); return antwort(true, {}, 204); }
  if (url === 'https://api.test/api/anfragen/weg-1') return antwort(false, { fehler: 'Diese Anfrage gibt es nicht (mehr).' }, 404);
  if (url === 'https://api.test/api/anfragen/alt-1') return antwort(true, { id: 'alt-1', status: 'entwurf', hinweis: '', entwurf: { titel: 'alt' } });
  if (url === 'https://api.test/api/anfragen/neu-1') { const { id, fakten, ...rest } = window.APP_DATA.argumente.argumente[1]; return antwort(true, { id: 'neu-1', status: 'entwurf', hinweis: '', entwurf: { ...rest, aehnlich: 'medien-luegen', recherche: ['Testpunkt zum Belegen'] } }); }
  return antwort(false, { fehler: 'unbekannt' });
}
const verlauf = { liste: [{ state: null }], i: 0, get state() { return this.liste[this.i].state; }, pushState(st) { this.liste.splice(this.i + 1); this.liste.push({ state: st }); this.i++; }, back() { if (this.i > 0) { this.i--; if (handlers['win:popstate']) handlers['win:popstate']({ state: this.state }); } } };
const ctx = { window, document, localStorage, location: { hash: '' }, navigator: {}, history: verlauf, console, crypto: webcrypto, TextEncoder, setTimeout: (fn, ms) => setTimeout(fn, Math.min(ms || 0, 5)), clearTimeout, fetch: fetchAttrappe, MouseEvent: function () {}, FormData: function (f) { const w = (f && f._werte) || {}; return { get: k => (w[k] == null ? '' : w[k]) }; } };
vm.createContext(ctx);
for (const f of ['linien', 'techniken', 'kompass', 'szenarien', 'kampagne', 'leitplanken', 'hilfe', 'messung', 'argumente']) vm.runInContext(fs.readFileSync(path.join(__dirname, 'data', f + '.js'), 'utf8'), ctx, { filename: f + '.js' });
window.APP_DATA.argumente.argumente[0].anfragen = ['beantwortet-1', 'alt-1'].map(id => createHash('sha256').update(id).digest('hex'));
if (fs.existsSync(path.join(__dirname, 'qr.js'))) vm.runInContext(fs.readFileSync(path.join(__dirname, 'qr.js'), 'utf8'), ctx, { filename: 'qr.js' });
vm.runInContext(fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8'), ctx, { filename: 'app.js' });
const main = els['#main'];
const fails = [];
// Der alte App-Name darf in keiner gezeichneten Ansicht mehr stehen, auch nicht aus den Inhalten heraus
const alterName = new Map();
function merke(wo) { ['#main', '#sheet', '#tabbar', '#nav'].forEach(k => { const t = els[k] ? els[k].innerHTML.replace(/<[^>]+>/g, ' ') : ''; const fund = t.match(/.{0,40}Umsteigen.{0,30}/); if (fund && !alterName.has(fund[0])) alterName.set(fund[0], wo); }); }
const anfragen = () => JSON.parse(mem['umsteigen:anfragen'] || '[]');
function click(d, id) { try { handlers['doc:click']({ target: { closest: () => ({ dataset: d, id: id || '' }) }, preventDefault() {} }); } catch (e) { fails.push(JSON.stringify(d) + ': ' + e.stack.split('\n').slice(0, 2).join(' ')); } merke(JSON.stringify(d)); }
function route(r) { ctx.location.hash = '#' + r; try { handlers['win:hashchange'](); } catch (e) { fails.push(r + ': ' + e.stack.split('\n').slice(0, 2).join(' ')); } merke(r); return main.innerHTML.length; }
// Fehlt der QR-Erzeuger (kurz während eines Updates möglich: alte Seite, neues Skript), bleibt „Weitersagen“ benutzbar: Link teilen ja; QR-Code, Vorzeigen und Aushang nein
{
  const erzeuger = window.QR; delete window.QR; route('teilen');
  if (main.innerHTML.indexOf('data-act="teilen-link"') < 0 || /<svg class="qr"|data-act="zeigen"|data-act="aushang"|class="aushang"/.test(main.innerHTML)) fails.push('Weitersagen ohne QR-Erzeuger ist nicht auf den Link beschränkt');
  window.QR = erzeuger; route('teilen');
  if (main.innerHTML.indexOf('<svg class="qr"') < 0) fails.push('Weitersagen zeigt den QR-Code nicht, sobald der Erzeuger da ist');
  route('start');
}
const sizes = {};
const HUBS = ['verstehen', 'argumentieren', 'vorbereiten', 'aktiv', 'schutz'];
for (const r of ['start'].concat(HUBS, ['meins', 'suche', 'teilen', 'netz', 'kompass', 'trainer', 'antworten', 'archiv', 'kampagne', 'wissen', 'leitplanken', 'tagebuch'])) sizes[r] = route(r);
const D = window.APP_DATA;
// Startseite: Zweck, „Hier anfangen“, fünf Bereiche; untere Leiste mit Start, Meine Inhalte, Suche, Mehr
route('start');
if (main.innerHTML.indexOf('Jemand aus deinem Umfeld') < 0 || main.innerHTML.indexOf('Hier anfangen') < 0) fails.push('Startseite erklärt den Zweck nicht');
HUBS.forEach(h => { if (main.innerHTML.indexOf('class="area" data-go="' + h + '"') < 0) fails.push('Startseite ohne Bereich ' + h); });
const tabs = (els['#tabbar'].innerHTML.match(/<span>[^<]+<\/span>/g) || []).join(' ');
if (tabs !== '<span>Start</span> <span>Meine Inhalte</span> <span>Suche</span> <span>Mehr</span>') fails.push('Untere Leiste: ' + tabs);
// Jeder Bereich: Zurück zu Start, höchstens drei Wege, jeder Weg führt irgendwohin
HUBS.forEach(h => {
  click({ go: h }); route(h);
  const n = (main.innerHTML.match(/class="choice-card"/g) || []).length;
  if (n < 2 || n > 3) fails.push('Bereich ' + h + ' zeigt ' + n + ' Wege');
  if (main.innerHTML.indexOf('class="crumb"><button data-go="start"') < 0) fails.push('Bereich ' + h + ' ohne Zurück zu Start');
});
// Werkzeug aus einem Bereich geöffnet: Zurück führt in den Bereich, nicht zur Startseite
click({ go: 'verstehen' }); route('verstehen'); click({ go: 'kompass' }); route('kompass');
if (main.innerHTML.indexOf('class="crumb"><button data-go="verstehen"') < 0) fails.push('Kompass aus „Verstehen“ führt nicht dorthin zurück');
if (main.innerHTML.indexOf('Person verstehen') < 0) fails.push('Kompass heißt nicht „Person verstehen“');
// Menü „Mehr“ zeigt Bereiche und alle Werkzeuge
click({ act: 'sheet' });
if (els['#sheet'].innerHTML.indexOf('Alle Werkzeuge') < 0 || els['#sheet'].innerHTML.indexOf('data-go="tagebuch"') < 0) fails.push('Menü „Mehr“ unvollständig');
click({ act: 'sheet' });
// Sprung an eine Stelle der Leitplanken
click({ go: 'leitplanken', anker: 'gefahr' }); route('leitplanken');
if (main.innerHTML.indexOf('id="gefahr"') < 0) fails.push('Leitplanken ohne Abschnitt „gefahr“');
// Szenario direkt aus der Suche starten
click({ go: 'trainer', szenario: window.APP_DATA.szenarien[0].id }); route('trainer');
if (main.innerHTML.indexOf('Szenario verlassen') < 0) fails.push('Szenario aus der Suche startet nicht');
click({ act: 'trainer-exit' });
// QR-Code: Die Module müssen Punkt für Punkt denen eines unabhängigen Erzeugers entsprechen.
// Vergleichswerte: api.qrserver.com, Fehlerkorrektur Q, Maske 2, Text qtext(n); gespeichert ist der Anfang des SHA-256 über die Zeilen aus 0 und 1.
const QR = window.QR;
const qtext = n => 'umdenken beginnt im gespraech. '.repeat(10).slice(0, n);
const qzeilen = m => m.modules.map(r => r.join('')).join('\n');
const qhash = m => createHash('sha256').update(qzeilen(m)).digest('hex').slice(0, 16);
const QR_SOLL = [[1, '9d71470d00442ffb'], [8, '3b77da8a255b383b'], [11, '238a54a93457c543'], [12, 'ccf22ab10ec7c9d9'], [20, 'db60bc72c5168f19'], [21, '8b057cc935738e9d'], [32, '76afffed000e53b0'], [33, 'f8b8206924af5d6a'], [42, '334e108fac26791b'], [46, '82a87c29ed20e0f9'], [47, '4dafcf4a5f7ad74c'], [60, '62d9fa7539b491d0'], [61, 'c74ba550df4f1629'], [74, '3cd875d7eeff4336'], [75, '35115d5262f7cb99'], [86, 'b4dbc78bddc15810'], [87, '45f5effeec00ae6e'], [108, '73844d0b4e1cc062'], [109, '2389139df13a43bb'], [130, '704b72a1505fdf39'], [131, '59c3c22158879f2b'], [151, 'f5a6bf39174d42f4']];
// Liest die Module aus der Grafik zurück (samt hellem Rand); null, wenn im Pfad etwas Unerwartetes steht
function svgModule(svg) {
  const g = +(/viewBox="0 0 (\d+) /.exec(svg) || [])[1], pfad = (/<path d="([^"]*)"/.exec(svg) || [])[1];
  if (!g || pfad == null || pfad.replace(/M\d+ \d+h\d+v1h-\d+z/g, '') !== '') return null;
  const zellen = Array.from({ length: g }, () => Array(g).fill(0));
  for (const t of pfad.matchAll(/M(\d+) (\d+)h(\d+)v1h-(\d+)z/g)) for (let i = 0; i < +t[3]; i++) zellen[+t[2]][+t[1] + i] = 1;
  return zellen;
}
const innen = zellen => zellen.slice(4, -4).map(r => r.slice(4, -4).join('')).join('\n');
if (!QR || !QR.matrix || !QR.svg) fails.push('QR-Erzeuger fehlt (app/qr.js)');
else try {
  QR_SOLL.forEach(([n, soll]) => { const m = QR.matrix(qtext(n), 2); if (!m || qhash(m) !== soll) fails.push('QR-Code für ' + n + ' Zeichen weicht vom Vergleichswert ab'); });
  if (QR.matrix(qtext(152)) !== null) fails.push('QR-Code: zu langer Text wird nicht abgelehnt');
  const MASKEN = ['d951151ecb365e45', 'e60cb37984531eb1', '033d834a037ef6bf', '4d81bcdb2c81fc24', '9de5756274c70936', '5d9e3f691b6434c0', '63e4a619e5b83c59', '62635727f3dde517'];
  MASKEN.forEach((soll, k) => { const m = QR.matrix('https://ohyannik-star.github.io/umsteigen/', k); if (!m || qhash(m) !== soll) fails.push('QR-Code mit Maske ' + k + ' weicht vom Vergleichswert ab'); });
  const eingestellt = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8')).url;
  if (!QR.matrix(eingestellt)) fails.push('Die Adresse aus config.json passt in keinen QR-Code');
  if ((QR.matrix('äääää') || {}).version !== 1 || (QR.matrix('ääääää') || {}).version !== 2) fails.push('QR-Code zählt Umlaute nicht als zwei Bytes');
  const auto = QR.matrix(qtext(42));
  if (!auto || !(auto.mask >= 0 && auto.mask <= 7) || qhash(auto) !== qhash(QR.matrix(qtext(42), auto.mask))) fails.push('QR-Code: gewählte Maske passt nicht zum Muster');
  // Die Grafik gibt genau diese Module wieder, mit vier Modulen hellem Rand ringsum
  const bild = svgModule(QR.svg(qtext(42), 'Test'));
  if (!bild || bild.length !== auto.size + 8 || innen(bild) !== qzeilen(auto) || bild.some((r, y) => r.some((v, x) => v && (x < 4 || y < 4 || x >= bild.length - 4 || y >= bild.length - 4)))) fails.push('QR-Grafik weicht von den Modulen ab');
} catch (e) { fails.push('QR-Erzeuger: ' + e.message); }
// Weitersagen: aus „Aktiv werden“ erreichbar, mit QR-Code zur eingestellten Adresse
click({ go: 'aktiv' }); route('aktiv');
if (main.innerHTML.indexOf('data-go="teilen"') < 0) fails.push('Bereich „Aktiv werden“ ohne Hinweis aufs Weitersagen');
click({ go: 'teilen' }); route('teilen');
if (main.innerHTML.indexOf('class="crumb"><button data-go="aktiv"') < 0) fails.push('Weitersagen aus „Aktiv werden“ führt nicht dorthin zurück');
// Die Adresse steht nirgends als Text, auch nicht im Aushang und im großen QR-Code: Sie steckt nur im QR-Code selbst und im geteilten Link
const ohneAdresse = wo => { if (main.innerHTML.indexOf('beispiel.test') >= 0) fails.push('Weitersagen zeigt die Adresse als Text (' + wo + ')'); };
ohneAdresse('Seite und Aushang');
const seitenQr = (/<svg class="qr"[\s\S]*?<\/svg>/.exec(main.innerHTML) || [])[0];
if (!seitenQr) fails.push('Weitersagen ohne QR-Code');
// Vergleichswert: die Module für ADRESSE; ein unabhängiger Lesedienst (api.qrserver.com) hat genau dieses Muster als diese Adresse gelesen
else { const ist = svgModule(seitenQr); if (!ist || createHash('sha256').update(innen(ist)).digest('hex').slice(0, 16) !== 'bb49e8969f103b8e') fails.push('QR-Code der Seite führt nicht zur eingestellten Adresse'); }
// Link teilen: ohne Teilen-Funktion des Geräts in die Zwischenablage, sonst über das Gerät, jeweils mit der Adresse
ctx.navigator.clipboard = { writeText: t => { geraet.kopiert.push(t); return Promise.resolve(); } };
click({ act: 'teilen-link' });
if (geraet.kopiert.length !== 1 || geraet.kopiert[0].indexOf(ADRESSE) < 0) fails.push('Link teilen ohne Teilen-Funktion kopiert die Adresse nicht');
ctx.navigator.share = o => { geraet.geteilt.push(o); return Promise.resolve(); };
click({ act: 'teilen-link' });
if (geraet.geteilt.length !== 1 || geraet.geteilt[0].url !== ADRESSE || !geraet.geteilt[0].text || geraet.kopiert.length !== 1) fails.push('Link teilen übergibt die Adresse nicht an das Gerät');
delete ctx.navigator.share;
// Groß zeigen: öffnet, schließt mit Escape und mit „Schließen“, und bleibt nach einem Seitenwechsel nicht offen
const gross = () => main.innerHTML.indexOf('class="zeigen"') >= 0;
click({ act: 'zeigen' }); if (!gross()) fails.push('„Groß zeigen“ öffnet den QR-Code nicht');
ohneAdresse('großer QR-Code');
try { handlers['doc:keydown']({ key: 'Escape', target: {}, preventDefault() {} }); } catch (e) { fails.push('Escape: ' + e.message); }
if (gross()) fails.push('Escape schließt den großen QR-Code nicht');
click({ act: 'zeigen' }); click({ act: 'zeigen-zu' }, 'zeigen-zu'); if (gross()) fails.push('„Schließen“ schließt den großen QR-Code nicht');
// Zurück-Taste schließt nur den großen Code und bleibt auf „Weitersagen“ (zeigt nicht die vorher geöffnete Seite)
click({ act: 'zeigen' }); verlauf.back();
if (gross() || main.innerHTML.indexOf('Zeig die App weiter') < 0) fails.push('Zurück-Taste schließt den großen QR-Code nicht auf der Seite „Weitersagen“');
// Öffnen und Schließen hinterlässt keine zusätzlichen Einträge im Verlauf
for (let i = 0; i < 3; i++) { click({ act: 'zeigen' }); click({ act: 'zeigen-zu' }, 'zeigen-zu'); }
if (verlauf.i !== 0) fails.push('Öffnen und Schließen des großen QR-Codes hinterlässt Einträge im Verlauf');
// Ein Doppeltipp auf „Groß zeigen“ schließt den Code nicht gleich wieder (zweiter Tipp landet auf der Fläche)
click({ act: 'zeigen' }); click({ act: 'zeigen-zu' });
if (!gross()) fails.push('Doppeltipp schließt den großen QR-Code sofort wieder');
// Die Knöpfe tragen ihre Aktionen: Fläche und „Schließen“ schließen, der große Code enthält den QR-Code
if (!/<div class="zeigen"[^>]*data-act="zeigen-zu"[^>]*>[\s\S]*<svg class="qr"[\s\S]*<button[^>]*id="zeigen-zu"[^>]*data-act="zeigen-zu"/.test(main.innerHTML)) fails.push('Großer QR-Code: Schließen-Fläche, Code oder Knopf fehlt');
click({ act: 'zeigen-zu' }, 'zeigen-zu');
if (main.innerHTML.indexOf('id="zeigen-auf" data-act="zeigen"') < 0 || main.innerHTML.indexOf('data-act="aushang"') < 0) fails.push('Knöpfe „Groß zeigen“ oder „Aushang drucken“ ohne Aktion');
const aushangTeil = (/<div class="aushang">([\s\S]*?)<p class="aus-f">/.exec(main.innerHTML) || [])[1] || '';
if (aushangTeil.indexOf('<svg class="qr"') < 0) fails.push('Aushang ohne QR-Code');
// Solange der große QR-Code offen ist, bleibt der Tabulator bei „Schließen“ und wandert nicht auf die verdeckte Seite
const tab = () => { let gehalten = 0; handlers['doc:keydown']({ key: 'Tab', target: {}, preventDefault() { gehalten++; } }); return gehalten; };
if (tab() !== 0) fails.push('Tabulator wird auch ohne großen QR-Code festgehalten');
click({ act: 'zeigen' }); if (tab() !== 1) fails.push('Tabulator verlässt den großen QR-Code'); click({ act: 'zeigen-zu' }, 'zeigen-zu');
click({ act: 'zeigen' }); route('start'); route('teilen'); if (gross()) fails.push('Großer QR-Code steht nach „Zurück“ wieder offen');
click({ act: 'zeigen' }); click({ go: 'start' }); route('start'); click({ go: 'teilen' }); route('teilen'); if (gross()) fails.push('Großer QR-Code steht nach einem Seitenwechsel wieder offen');
click({ act: 'zeigen' }); click({ go: 'teilen' }); if (gross()) fails.push('Großer QR-Code bleibt beim erneuten Öffnen der Seite offen');
// Aushang: steht auf der Seite bereit, der Knopf öffnet den Druckdialog
if (main.innerHTML.indexOf('class="aushang"') < 0) fails.push('Weitersagen ohne Aushang');
click({ act: 'aushang' }); if (geraet.drucke !== 1) fails.push('„Aushang drucken“ öffnet den Druckdialog nicht');
// Startseite und Menü „Mehr“ weisen aufs Weitersagen hin
route('start'); if (main.innerHTML.indexOf('data-go="teilen"') < 0) fails.push('Startseite ohne Hinweis aufs Weitersagen');
click({ act: 'sheet' }); if (els['#sheet'].innerHTML.indexOf('data-go="teilen"') < 0) fails.push('Menü „Mehr“ ohne Weitersagen'); click({ act: 'sheet' });
// jede Station einmal anzeigen
D.linien.forEach(l => { click({ go: 'netz', linie: l.id, station: '' }); l.stationen.forEach(s => click({ go: 'netz', linie: l.id, station: s.id })); });
sizes.station = main.innerHTML.length;
// Kompass: alle Richtungen durchblättern, dann auswerten
route('kompass'); for (let i = 0; i < 20; i++) click({ act: 'k-next' }); click({ act: 'k-step', step: '0' }); click({ act: 'k-prev' }); sizes.kompassWizard = main.innerHTML.length; try { handlers['doc:submit']({ target: { dataset: { form: "kompass" }, querySelector: () => null, querySelectorAll: () => [] }, preventDefault() {} }); } catch (e) { fails.push('kompass-submit: ' + e.message); }
click({ act: 'kompass-reset' });
// Trainer: jedes Szenario, immer Option 0, bis zum Ende
route('trainer'); D.szenarien.forEach(s => { click({ act: 'trainer-start', id: s.id }); for (let i = 0; i < 12; i++) { click({ act: 'trainer-pick', idx: '0' }); click({ act: 'trainer-next' }); if (main.innerHTML.indexOf("Fazit") >= 0 || main.innerHTML.indexOf("Szenario verlassen") < 0) break; } if (main.innerHTML.indexOf('Fazit') >= 0 && main.innerHTML.indexOf('data-go="teilen"') < 0) fails.push('Fazit von ' + s.id + ' ohne Hinweis aufs Weitersagen'); sizes['trainer:' + s.id] = main.innerHTML.length; click({ act: 'trainer-exit' }); });
// Kampagne: alle Tabs, Planer auswerten
route('kampagne'); ['segmente', 'bausteine', 'phasen', 'kennzahlen', 'planer'].forEach(t => { click({ act: 'kamp-tab', tab: t }); sizes['kampagne:' + t] = main.innerHTML.length; });
try { handlers['doc:submit']({ target: { dataset: { form: "kampagne" }, querySelector: () => null, querySelectorAll: () => [] }, preventDefault() {} }); } catch (e) { fails.push('kampagne-submit: ' + e.message); }
// Antworten: jedes Argument öffnen, Tabs, Fall-Hub
route('antworten'); (D.argumente ? D.argumente.argumente : []).forEach(a => { click({ act: 'arg-open', id: a.id }); }); click({ act: 'fall-arg', id: (D.argumente && D.argumente.argumente[0] || {}).id }); click({ act: 'ant-tab', tab: 'verhalten' }); click({ act: 'ant-tab', tab: 'studien' }); sizes['antworten:studien'] = main.innerHTML.length;
route('archiv'); click({ act: 'arch-add', typ: 'satz', text: 'Testsatz', herkunft: 'Test' });
// Suche: „ukraine“ findet jedes Argument, das das Wort im Titel, in den Varianten oder in den Stichworten trägt
const ukr = (D.argumente ? D.argumente.argumente : []).filter(a => /ukraine/i.test([a.titel].concat(a.varianten || [], a.stichworte || []).join(' ')));
function suche(q) { route('antworten'); click({ act: 'ant-tab', tab: 'argumente' }); click({ act: 'arg-open', id: '' }); const f = els['#arg-q']; f.value = q; f.on.input(); route('antworten'); return (main.innerHTML.match(/data-act="arg-open" data-id="[^"]+"/g) || []).length; }
const treffer = suche('ukraine');
if (treffer !== ukr.length) fails.push('Suche „ukraine“ findet ' + treffer + ' von ' + ukr.length + ' Argumenten');
suche('');
// Globale Suche: findet dieselben Argumente, dazu Techniken; Unsinn ergibt den Hinweis „Nichts gefunden“
function globalSuche(q) { route('suche'); const f = els['#such-q']; f.value = q; f.on.input(); route('suche'); return main.innerHTML; }
const g = globalSuche('ukraine');
if ((g.match(/data-go="antworten" data-arg="/g) || []).length !== ukr.length) fails.push('Globale Suche „ukraine“ findet nicht alle ' + ukr.length + ' Argumente');
if (globalSuche(D.techniken[0].name).indexOf('data-technik="' + D.techniken[0].id + '"') < 0) fails.push('Globale Suche findet die Technik ' + D.techniken[0].name + ' nicht');
if (globalSuche('xqzv').indexOf('Nichts gefunden') < 0) fails.push('Globale Suche ohne Hinweis bei null Treffern');
sizes['suche:ukraine'] = g.length;
globalSuche('');
if (main.innerHTML.indexOf('data-act="such-set"') < 0) fails.push('Suche ohne Themenvorschläge');
route('meins'); if (main.innerHTML.indexOf('Mein Fall') < 0 || main.innerHTML.indexOf('Archiv') < 0 || main.innerHTML.indexOf('Tagebuch') < 0) fails.push('Meine Inhalte unvollständig');
// Wissen mit Technik
click({ go: 'wissen', technik: D.techniken[0].id });
// Tagebuch mit Vorbelegung
click({ go: 'tagebuch', prefill: 'gespraech|zuhoeren' });
// Argument fehlt: Kasten sichtbar, ohne Bestätigung kein Versand, mit Bestätigung Versand und Entwurf abholen
(async () => {
  // Beim Start meldet die App, dass die vorbelegte Anfrage geprüft beantwortet ist (Abgleich über den Hash, läuft asynchron)
  await new Promise(r => setTimeout(r, 50));
  route('start');
  if (main.innerHTML.indexOf('geprüft beantwortet') < 0) fails.push('Kein Hinweis auf die beantwortete Anfrage beim Start');
  const alt = anfragen().find(x => x.id === 'alt-1');
  if (!alt || alt.status !== 'beantwortet' || !alt.argId) fails.push('Abholen überschreibt die erkannte geprüfte Antwort, Status: ' + (alt && alt.status));
  if (api.deletes.indexOf('https://api.test/api/anfragen/alt-1') < 0) fails.push('Erkannte Antwort löscht die Anfrage nicht auf dem Server');
  route('antworten'); click({ act: 'ant-tab', tab: 'argumente' });
  if (main.innerHTML.indexOf('Argument fehlt?') < 0) fails.push('Kasten „Argument fehlt?“ fehlt');
  const senden = werte => { try { handlers['doc:submit']({ target: { dataset: { form: 'anfrage' }, _werte: werte }, preventDefault() {} }); } catch (e) { fails.push('anfrage-submit: ' + e.message); } };
  senden({ argument: 'Ohne Bestätigung gesendet.', kontext: '' });
  if (api.posts.length) fails.push('Anfrage ohne Bestätigung gesendet');
  senden({ argument: 'Die Rente ist sowieso weg.', kontext: 'Kollege', ok: 'on' });
  await new Promise(r => setTimeout(r, 300));
  if (api.posts.length !== 1 || api.posts[0].argument !== 'Die Rente ist sowieso weg.') fails.push('Anfrage nicht gesendet');
  const neu = JSON.parse(mem['umsteigen:anfragen'] || '[]').find(x => x.id === 'neu-1');
  if (!neu || neu.status !== 'entwurf') fails.push('Entwurf nicht abgeholt, Status: ' + (neu && neu.status));
  route('antworten'); click({ act: 'ant-tab', tab: 'anfragen' });
  sizes['antworten:anfragen'] = main.innerHTML.length;
  if (main.innerHTML.indexOf('KI-Entwurf') < 0 || main.innerHTML.indexOf('Testpunkt zum Belegen') < 0) fails.push('KI-Entwurf wird nach dem Senden nicht angezeigt');
  if (main.innerHTML.indexOf('data-act="fall-arg"') >= 0) fails.push('Entwurf zeigt den Mein-Fall-Knopf');
  click({ act: 'anf-toggle', id: 'neu-1' });
  if (main.innerHTML.indexOf('Testpunkt zum Belegen') >= 0) fails.push('Entwurf lässt sich nicht zuklappen');
  click({ act: 'anf-ansehen', id: 'beantwortet-1' });
  if (JSON.parse(mem['umsteigen:anfragen']).find(x => x.id === 'beantwortet-1').neu) fails.push('Hinweis bleibt nach dem Ansehen stehen');
  click({ act: 'anf-del', id: 'neu-1' });
  await new Promise(r => setTimeout(r, 50));
  if (anfragen().some(x => x.id === 'neu-1')) fails.push('Anfrage lässt sich nicht entfernen');
  if (api.deletes.indexOf('https://api.test/api/anfragen/neu-1') < 0) fails.push('Entfernen löscht nicht auf dem Server');
  // Unbekannte Nummer beim Abholen: Anfrage wird zu „Nicht geklappt“ statt endlos abzufragen
  const liste = JSON.parse(mem['umsteigen:anfragen']); liste.unshift({ id: 'weg-1', argument: 'Verlorene Anfrage hier.', kontext: '', datum: '2026-10-01', status: 'in-arbeit' }); mem['umsteigen:anfragen'] = JSON.stringify(liste);
  click({ act: 'ant-tab', tab: 'anfragen' });
  await new Promise(r => setTimeout(r, 100));
  if (JSON.parse(mem['umsteigen:anfragen']).find(x => x.id === 'weg-1').status !== 'fehler') fails.push('404 beim Abholen setzt die Anfrage nicht auf fehler');
  // Erneut senden: Bei einem Fehler bleibt die alte Anfrage erhalten; ein Doppeltipp sendet nur einmal
  api.postFehler = true; click({ act: 'anf-neu', id: 'weg-1' }); await new Promise(r => setTimeout(r, 50));
  if (!anfragen().some(x => x.id === 'weg-1')) fails.push('Erneut senden löscht die alte Anfrage trotz Fehler');
  api.postFehler = false; const vorher = api.posts.length;
  click({ act: 'anf-neu', id: 'weg-1' }); click({ act: 'anf-neu', id: 'weg-1' }); await new Promise(r => setTimeout(r, 50));
  if (api.posts.length !== vorher + 1) fails.push('Doppeltipp auf „Noch einmal senden“ sendet ' + (api.posts.length - vorher) + ' Mal');
  const nachher = anfragen();
  if (nachher.some(x => x.id === 'weg-1') || !nachher.some(x => x.id === 'neu-' + api.posts.length)) fails.push('Erneut senden ersetzt die alte Anfrage nicht');
  if (api.deletes.indexOf('https://api.test/api/anfragen/weg-1') < 0) fails.push('Erneut senden löscht die alte Anfrage nicht auf dem Server');
  // Löschen bei nicht erreichbarem Server: Eintrag verschwindet aus der Liste, die Nummer bleibt, bis der Server bestätigt
  const ziel = 'neu-' + api.posts.length;
  api.deleteFehler = true; click({ act: 'anf-del', id: ziel }); await new Promise(r => setTimeout(r, 50));
  const vorgemerkt = anfragen().find(x => x.id === ziel);
  if (!vorgemerkt || !vorgemerkt.weg) fails.push('Gescheitertes Löschen verliert die Nummer');
  if (main.innerHTML.indexOf('data-id="' + ziel + '"') >= 0) fails.push('Vorgemerkter Eintrag wird noch angezeigt');
  api.deleteFehler = false; click({ act: 'ant-tab', tab: 'anfragen' }); await new Promise(r => setTimeout(r, 50));
  if (anfragen().some(x => x.id === ziel)) fails.push('Löschen wird nicht wiederholt, sobald der Server erreichbar ist');
  alterName.forEach((wo, fund) => fails.push('Alter App-Name in ' + wo + ': …' + fund + '…'));
  const seite = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
  if (!/<script src="qr\.js"><\/script>\s*<script src="app\.js"><\/script>/.test(seite)) fails.push('index.html lädt qr.js nicht direkt vor app.js');
  if (!/<button[^>]*id="gshare"[^>]*data-go="teilen"[^>]*\shidden>/.test(seite)) fails.push('Weitersagen-Knopf in index.html fehlt oder ist nicht zunächst versteckt');
  if (els['#gshare'].hidden !== false) fails.push('app.js zeigt den Weitersagen-Knopf nicht an');
  // Alter Name: auch in allem, was ausgeliefert wird (Meldungen, Teilen-Titel, Beschriftungen), nicht nur in gezeichneten Ansichten
  ['index.html', 'app.js', 'qr.js'].concat(fs.readdirSync(path.join(__dirname, 'data')).map(f => 'data/' + f)).forEach(f => { if (/Umsteigen/.test(fs.readFileSync(path.join(__dirname, f), 'utf8'))) fails.push('Alter App-Name in ' + f); });
  // Die Seite lädt nichts von fremden Adressen nach (keine Schriften, Skripte oder Bilder von außen): Das gehört zum Versprechen, dass nichts das Gerät verlässt
  ['index.html', 'app.js'].forEach(f => {
    const text = fs.readFileSync(path.join(__dirname, f), 'utf8');
    const fremd = (text.match(/<(?:link|script|img|iframe|source|video|audio|embed|object)\b[^>]*\b(?:href|src)\s*=\s*["'](?:https?:)?\/\/[^"']+/gi) || []).concat(text.match(/@import|url\(\s*["']?(?:https?:)?\/\//gi) || []);
    if (fremd.length) fails.push(f + ' lädt von fremden Adressen: ' + fremd.join(', '));
  });
  // iPhone und iPad im Browser: Wer schon etwas gespeichert hat, erfährt, dass der Browser es nach rund einer Woche ohne Besuch löscht
  ctx.navigator.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)';
  route('start'); if (main.innerHTML.indexOf('data-hinweis="ios"') < 0) fails.push('Startseite ohne Hinweis auf die Löschung im iPhone-Browser');
  route('meins'); if (main.innerHTML.indexOf('data-hinweis="ios"') < 0) fails.push('Meine Inhalte ohne Hinweis auf die Löschung im iPhone-Browser');
  window.navigator = { standalone: true }; route('start'); if (main.innerHTML.indexOf('data-hinweis="ios"') >= 0) fails.push('Hinweis auf die Löschung erscheint auch in der installierten App'); delete window.navigator;
  ctx.navigator.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'; route('start'); if (main.innerHTML.indexOf('data-hinweis="ios"') >= 0) fails.push('Hinweis auf die Löschung erscheint auch außerhalb von iPhone und iPad');
  console.log(Object.entries(sizes).map(([k, v]) => k + '=' + v).join(' '));
  fails.forEach(f => console.log('FEHLER ' + f));
  const empty = Object.entries(sizes).filter(([k, v]) => v < 800).map(([k]) => k);
  if (empty.length) console.log('WARNUNG sehr kurze Ansichten: ' + empty.join(', '));
  console.log(fails.length ? fails.length + ' Fehler' : 'OK, alle Ansichten rendern ohne Fehler');
  process.exit(fails.length ? 1 : 0);
})();
