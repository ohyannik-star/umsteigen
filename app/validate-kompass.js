// Prüft eine Fragen-Teildatei des Kompasses. Aufruf: node app/validate-kompass.js app/data/kompass-teilA.json
const fs = require('fs');
const file = process.argv[2];
const TREIBER = ['anerkennung', 'zugehoerigkeit', 'kontrolle-angst', 'misstrauen', 'gerechtigkeit-abgehaengt', 'identitaet-heimat', 'protest-wut'];
const SKALEN = ['offenheit', 'kapital', 'verschwoerung', 'belastung'];
const BEREICHE = ['themen', 'weltbild', 'beduerfnisse', 'gefuehle', 'quellen', 'widerspruch', 'verschwoerung', 'netzwerk', 'biografie', 'heimat', 'beziehung-zu-dir', 'gespraeche', 'aktivitaet', 'du-selbst', 'ausgangslage'];
const errors = [], warns = [];
let data;
try { data = JSON.parse(fs.readFileSync(file, 'utf8')); } catch (e) { console.log('FEHLER JSON: ' + e.message); process.exit(1); }
const fragen = Array.isArray(data.fragen) ? data.fragen : [];
const ids = new Set(), oids = new Set(), perBereich = {};
fragen.forEach((f, i) => {
  const p = `Frage ${i + 1} (${f.id})`;
  if (!f.id || !/^[a-z0-9-]+$/.test(f.id)) errors.push(p + ': id fehlt oder ungültig');
  if (ids.has(f.id)) errors.push(p + ': id doppelt'); ids.add(f.id);
  if (!BEREICHE.includes(f.bereich)) errors.push(p + ': bereich unbekannt: ' + f.bereich);
  perBereich[f.bereich] = (perBereich[f.bereich] || 0) + 1;
  if (!['single', 'multi'].includes(f.typ)) errors.push(p + ': typ muss single oder multi sein');
  if (!f.text || f.text.length > 120) errors.push(p + ': text fehlt oder länger als 120 Zeichen');
  if (!f.warum || f.warum.length < 30) errors.push(p + ': warum fehlt oder zu kurz');
  if (f.warum && f.warum.length > 260) warns.push(p + ': warum länger als 260 Zeichen');
  if (!Array.isArray(f.optionen) || f.optionen.length < 3 || f.optionen.length > 7) errors.push(p + ': 3 bis 7 Optionen nötig');
  (f.optionen || []).forEach((o, j) => {
    const q = p + ' Option ' + (j + 1);
    if (!o.id || !/^[a-z0-9-]+$/.test(o.id)) errors.push(q + ': id fehlt oder ungültig');
    if (oids.has(o.id)) errors.push(q + ': Options-id doppelt: ' + o.id); oids.add(o.id);
    if (!o.text || o.text.length > 100) errors.push(q + ': text fehlt oder länger als 100 Zeichen');
    if (o.gewichte == null || typeof o.gewichte !== 'object') errors.push(q + ': gewichte fehlt (leeres Objekt erlaubt)');
    Object.keys(o.gewichte || {}).forEach(k => { if (!TREIBER.includes(k)) errors.push(q + ': Treiber unbekannt: ' + k); const v = o.gewichte[k]; if (!(v >= 1 && v <= 3)) errors.push(q + ': Gewicht ' + k + ' muss 1 bis 3 sein'); });
    if (Object.keys(o.gewichte || {}).length > 2) warns.push(q + ': mehr als 2 Treiber');
    Object.keys(o.skalen || {}).forEach(k => { if (!SKALEN.includes(k)) errors.push(q + ': Skala unbekannt: ' + k); const v = o.skalen[k]; if (!(v >= 0 && v <= 3)) errors.push(q + ': Skalenwert ' + k + ' muss 0 bis 3 sein'); });
    if (o.hinweis && o.hinweis.length > 240) warns.push(q + ': hinweis länger als 240 Zeichen');
    if (/[<>]/.test(o.text)) errors.push(q + ': HTML in text');
  });
});
Object.keys(perBereich).forEach(b => { if (perBereich[b] < 6 || perBereich[b] > 9) warns.push(`Bereich ${b}: ${perBereich[b]} Fragen (Ziel 7)`); });
console.log(`${fragen.length} Fragen, Bereiche: ` + Object.keys(perBereich).map(b => b + '=' + perBereich[b]).join(' '));
warns.forEach(w => console.log('WARNUNG ' + w));
errors.forEach(e => console.log('FEHLER ' + e));
console.log(errors.length ? `${errors.length} Fehler` : 'OK, keine Fehler');
process.exit(errors.length ? 1 : 0);
