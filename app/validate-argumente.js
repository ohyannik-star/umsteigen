// Prüft eine Teildatei oder das ganze Antworten-Playbook. Aufruf: node app/validate-argumente.js app/data/argumente-ukraine.json oder app/data/argumente.js
const fs = require('fs'), path = require('path'), vm = require('vm');
const file = process.argv[2];
const ctx = { window: {} }; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, 'data', 'techniken.js'), 'utf8'), ctx);
const TECH = new Set(ctx.window.APP_DATA.techniken.map(t => t.id));
const PHASEN = ['Anerkennen', 'Nachfragen', 'Erlebnis', 'Zweifel', 'Überleitung'];
const errors = [], warns = [];
let d;
try { if (file.endsWith('.js')) { vm.runInContext(fs.readFileSync(file, 'utf8'), ctx); d = ctx.window.APP_DATA.argumente; } else d = JSON.parse(fs.readFileSync(file, 'utf8')); } catch (e) { console.log('FEHLER Laden: ' + e.message); process.exit(1); }
const txt = (s, p) => { if (typeof s !== 'string' || !s.trim()) errors.push(p + ': Text fehlt'); else { if (/"/.test(s)) errors.push(p + ': ASCII-Anführungszeichen'); if (/(^|[.!?] )Sie [a-zäöüß]+t\b/.test(s) && !/Sie (ist|hat)\b.*Person/.test(s)) warns.push(p + ': beginnt mit „Sie …“ statt „Die Person …“: ' + s.slice(0, 60)); } };
const ids = new Set();
(d.argumente || []).forEach((a, i) => {
  const p = 'Argument ' + (a.id || i);
  if (!a.id || !/^[a-z0-9-]+$/.test(a.id)) errors.push(p + ': id ungültig'); if (ids.has(a.id)) errors.push(p + ': id doppelt'); ids.add(a.id);
  if (!a.kategorie) errors.push(p + ': kategorie fehlt');
  txt(a.titel, p + '.titel'); txt(a.dahinter, p + '.dahinter'); txt(a.tonalitaet, p + '.tonalitaet');
  if (!Array.isArray(a.varianten) || a.varianten.length < 2) warns.push(p + ': weniger als 2 Varianten');
  if (a.stichworte !== undefined && (!Array.isArray(a.stichworte) || a.stichworte.some(s => typeof s !== 'string' || !s.trim()))) errors.push(p + ': stichworte muss eine Liste von Wörtern sein');
  if (a.anfragen !== undefined && (!Array.isArray(a.anfragen) || a.anfragen.some(s => !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(s)))) errors.push(p + ': anfragen muss eine Liste von Anfragenummern sein');
  if (!Array.isArray(a.nogo) || a.nogo.length < 3) errors.push(p + ': nogo braucht 3 bis 6 Einträge');
  const ph = (a.schritte || []).map(s => s.phase);
  if (ph.join('|') !== PHASEN.join('|')) errors.push(p + ': schritte müssen genau die 5 Phasen in Reihenfolge sein, gefunden: ' + ph.join(', '));
  (a.schritte || []).forEach(s => { if (!Array.isArray(s.sagen) || s.sagen.length < 2) errors.push(p + '.' + s.phase + ': mindestens 2 Sätze'); (s.sagen || []).forEach((x, j) => txt(x, p + '.' + s.phase + '[' + j + ']')); });
  if (!Array.isArray(a.wenn_dann) || a.wenn_dann.length < 3) errors.push(p + ': wenn_dann braucht 3 bis 5 Einträge');
  (a.wenn_dann || []).forEach((w, j) => { txt(w.wenn, p + '.wenn_dann[' + j + '].wenn'); txt(w.dann, p + '.wenn_dann[' + j + '].dann'); });
  if (!Array.isArray(a.fakten) || a.fakten.length < 2) errors.push(p + ': fakten braucht 2 bis 4 Einträge');
  (a.fakten || []).forEach((f, j) => { txt(f.aussage, p + '.fakten[' + j + '].aussage'); txt(f.so_nutzen, p + '.fakten[' + j + '].so_nutzen'); if (!f.quelle || !f.quelle.titel) errors.push(p + '.fakten[' + j + ']: quelle.titel fehlt'); if (!f.quelle || !f.quelle.url) warns.push(p + '.fakten[' + j + ']: ohne URL'); });
  if (!Array.isArray(a.fallstricke) || a.fallstricke.length < 2) errors.push(p + ': fallstricke braucht 2 bis 3 Einträge');
  (a.techniken || []).forEach(t => { if (!TECH.has(t)) errors.push(p + ': Technik unbekannt: ' + t); });
  if (!a.techniken || !a.techniken.length) errors.push(p + ': techniken fehlt');
});
(d.verhalten || []).forEach((v, i) => { const p = 'Verhalten ' + (v.id || i); txt(v.verhalten, p + '.verhalten'); txt(v.dahinter, p + '.dahinter'); ['dann', 'sagen', 'nicht'].forEach(k => { if (!Array.isArray(v[k]) || v[k].length < 2) errors.push(p + ': ' + k + ' braucht mindestens 2 Einträge'); (v[k] || []).forEach((x, j) => txt(x, p + '.' + k + '[' + j + ']')); }); });
(d.studien_lesen || []).forEach((s, i) => { const p = 'Studien ' + (s.id || i); txt(s.titel, p + '.titel'); txt(s.text, p + '.text'); txt(s.beispiel, p + '.beispiel'); });
console.log(`${(d.argumente || []).length} Argumente, ${(d.verhalten || []).length} Verhaltensweisen, ${(d.studien_lesen || []).length} Studien-Hinweise`);
warns.forEach(w => console.log('WARNUNG ' + w));
errors.forEach(e => console.log('FEHLER ' + e));
console.log(errors.length ? `${errors.length} Fehler` : 'OK, keine Fehler');
process.exit(errors.length ? 1 : 0);
