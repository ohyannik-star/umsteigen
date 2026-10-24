// Rendert alle Ansichten mit den echten Daten in einer DOM-Attrappe und meldet Laufzeitfehler. Aufruf: node app/smoke.js
const fs = require('fs'), path = require('path'), vm = require('vm');
const handlers = {}, els = {};
function el() { return { innerHTML: '', dataset: {}, style: {}, value: '', textContent: '', clientWidth: 900, scrollLeft: 0, addEventListener(t, fn) { (this.on = this.on || {})[t] = fn; }, querySelector() { return null; }, querySelectorAll() { return []; }, scrollIntoView() {}, getAttribute() { return '0'; }, setAttribute() {}, remove() {}, appendChild() {}, focus() {}, select() {}, matches() { return false; } }; }
const document = { querySelector: s => els[s] || (els[s] = el()), querySelectorAll: () => [], addEventListener: (t, fn) => { handlers['doc:' + t] = fn; }, createElement: () => el(), body: el() };
const { webcrypto, createHash } = require('crypto');
const window = { APP_DATA: {}, UMSTEIGEN_HOSTED: true, UMSTEIGEN_API: 'https://api.test', crypto: webcrypto, TextEncoder, addEventListener: (t, fn) => { handlers['win:' + t] = fn; }, scrollTo() {} };
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
const ctx = { window, document, localStorage, location: { hash: '' }, navigator: {}, history: {}, console, crypto: webcrypto, TextEncoder, setTimeout: (fn, ms) => setTimeout(fn, Math.min(ms || 0, 5)), clearTimeout, fetch: fetchAttrappe, MouseEvent: function () {}, FormData: function (f) { const w = (f && f._werte) || {}; return { get: k => (w[k] == null ? '' : w[k]) }; } };
vm.createContext(ctx);
for (const f of ['linien', 'techniken', 'kompass', 'szenarien', 'kampagne', 'leitplanken', 'hilfe', 'messung', 'argumente']) vm.runInContext(fs.readFileSync(path.join(__dirname, 'data', f + '.js'), 'utf8'), ctx, { filename: f + '.js' });
window.APP_DATA.argumente.argumente[0].anfragen = ['beantwortet-1', 'alt-1'].map(id => createHash('sha256').update(id).digest('hex'));
vm.runInContext(fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8'), ctx, { filename: 'app.js' });
const main = els['#main'];
const fails = [];
const anfragen = () => JSON.parse(mem['umsteigen:anfragen'] || '[]');
function click(d) { try { handlers['doc:click']({ target: { closest: () => ({ dataset: d }) }, preventDefault() {} }); } catch (e) { fails.push(JSON.stringify(d) + ': ' + e.stack.split('\n').slice(0, 2).join(' ')); } }
function route(r) { ctx.location.hash = '#' + r; try { handlers['win:hashchange'](); } catch (e) { fails.push(r + ': ' + e.stack.split('\n').slice(0, 2).join(' ')); } return main.innerHTML.length; }
const sizes = {};
for (const r of ['start', 'netz', 'kompass', 'trainer', 'antworten', 'archiv', 'kampagne', 'wissen', 'leitplanken', 'tagebuch']) sizes[r] = route(r);
const D = window.APP_DATA;
// jede Station einmal anzeigen
D.linien.forEach(l => { click({ go: 'netz', linie: l.id, station: '' }); l.stationen.forEach(s => click({ go: 'netz', linie: l.id, station: s.id })); });
sizes.station = main.innerHTML.length;
// Kompass: alle Richtungen durchblättern, dann auswerten
route('kompass'); for (let i = 0; i < 20; i++) click({ act: 'k-next' }); click({ act: 'k-step', step: '0' }); click({ act: 'k-prev' }); sizes.kompassWizard = main.innerHTML.length; try { handlers['doc:submit']({ target: { dataset: { form: "kompass" }, querySelector: () => null, querySelectorAll: () => [] }, preventDefault() {} }); } catch (e) { fails.push('kompass-submit: ' + e.message); }
click({ act: 'kompass-reset' });
// Trainer: jedes Szenario, immer Option 0, bis zum Ende
route('trainer'); D.szenarien.forEach(s => { click({ act: 'trainer-start', id: s.id }); for (let i = 0; i < 12; i++) { click({ act: 'trainer-pick', idx: '0' }); click({ act: 'trainer-next' }); if (main.innerHTML.indexOf("Fazit") >= 0 || main.innerHTML.indexOf("Szenario verlassen") < 0) break; } sizes['trainer:' + s.id] = main.innerHTML.length; click({ act: 'trainer-exit' }); });
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
  console.log(Object.entries(sizes).map(([k, v]) => k + '=' + v).join(' '));
  fails.forEach(f => console.log('FEHLER ' + f));
  const empty = Object.entries(sizes).filter(([k, v]) => v < 800).map(([k]) => k);
  if (empty.length) console.log('WARNUNG sehr kurze Ansichten: ' + empty.join(', '));
  console.log(fails.length ? fails.length + ' Fehler' : 'OK, alle Ansichten rendern ohne Fehler');
  process.exit(fails.length ? 1 : 0);
})();
