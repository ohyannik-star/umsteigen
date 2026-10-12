// Rendert alle Ansichten mit den echten Daten in einer DOM-Attrappe und meldet Laufzeitfehler. Aufruf: node app/smoke.js
const fs = require('fs'), path = require('path'), vm = require('vm');
const handlers = {}, els = {};
function el() { return { innerHTML: '', dataset: {}, style: {}, value: '', textContent: '', clientWidth: 900, scrollLeft: 0, addEventListener() {}, querySelector() { return null; }, querySelectorAll() { return []; }, scrollIntoView() {}, getAttribute() { return '0'; }, setAttribute() {}, remove() {}, appendChild() {}, focus() {}, select() {}, matches() { return false; } }; }
const document = { querySelector: s => els[s] || (els[s] = el()), querySelectorAll: () => [], addEventListener: (t, fn) => { handlers['doc:' + t] = fn; }, createElement: () => el(), body: el() };
const window = { APP_DATA: {}, addEventListener: (t, fn) => { handlers['win:' + t] = fn; }, scrollTo() {} };
const localStorage = { getItem() { return null; }, setItem() {}, removeItem() {} };
const ctx = { window, document, localStorage, location: { hash: '' }, navigator: {}, history: {}, console, setTimeout, MouseEvent: function () {}, FormData: function () { return { get: () => '' }; } };
vm.createContext(ctx);
for (const f of ['linien', 'techniken', 'kompass', 'szenarien', 'kampagne', 'leitplanken', 'hilfe', 'messung']) vm.runInContext(fs.readFileSync(path.join(__dirname, 'data', f + '.js'), 'utf8'), ctx, { filename: f + '.js' });
vm.runInContext(fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8'), ctx, { filename: 'app.js' });
const main = els['#main'];
const fails = [];
function click(d) { try { handlers['doc:click']({ target: { closest: () => ({ dataset: d }) }, preventDefault() {} }); } catch (e) { fails.push(JSON.stringify(d) + ': ' + e.stack.split('\n').slice(0, 2).join(' ')); } }
function route(r) { ctx.location.hash = '#' + r; try { handlers['win:hashchange'](); } catch (e) { fails.push(r + ': ' + e.stack.split('\n').slice(0, 2).join(' ')); } return main.innerHTML.length; }
const sizes = {};
for (const r of ['start', 'netz', 'kompass', 'trainer', 'kampagne', 'wissen', 'leitplanken', 'tagebuch']) sizes[r] = route(r);
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
// Wissen mit Technik
click({ go: 'wissen', technik: D.techniken[0].id });
// Tagebuch mit Vorbelegung
click({ go: 'tagebuch', prefill: 'gespraech|zuhoeren' });
console.log(Object.entries(sizes).map(([k, v]) => k + '=' + v).join(' '));
fails.forEach(f => console.log('FEHLER ' + f));
const empty = Object.entries(sizes).filter(([k, v]) => v < 800).map(([k]) => k);
if (empty.length) console.log('WARNUNG sehr kurze Ansichten: ' + empty.join(', '));
console.log(fails.length ? fails.length + ' Fehler' : 'OK, alle Ansichten rendern ohne Fehler');
process.exit(fails.length ? 1 : 0);
