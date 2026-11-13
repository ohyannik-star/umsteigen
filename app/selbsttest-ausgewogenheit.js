// Prüft, ob die Thesen eine Partei systematisch bevorzugen: beantwortet die Thesen 20.000-mal zufällig
// und zählt, wie oft jede Partei vorne liegt und welchen Wert sie im Mittel erreicht. Aufruf: node app/selbsttest-ausgewogenheit.js
const fs = require('fs'), path = require('path'), vm = require('vm');
const ctx = { window: {} }; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, 'data', 'selbsttest.js'), 'utf8'), ctx);
const ST = ctx.window.APP_DATA.selbsttest, P = ST.parteien.map(p => p.id), T = ST.thesen;
if (!T.length) { console.log('Keine Thesen'); process.exit(0); }
// Gleiche Rechenregel wie in der App (2/1/0 Punkte, „offen“ zählt halb), unabhängig hier nachgebaut
function wert(antw, pid) { let pkt = 0, max = 0; T.forEach((t, i) => { const a = antw[i], p = t.positionen[pid].pos; max += 2; pkt += p === 'offen' ? 1 : a === p ? 2 : (a === 'neutral' || p === 'neutral') ? 1 : 0; }); return max ? pkt / max : 0; }
let seed = 12345; const zufall = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
const N = 20000, vorne = {}, summe = {};
// Zufallsantworten wie bei echten Nutzern: „neutral“ seltener als Zustimmung oder Ablehnung (je 40 %, neutral 20 %)
P.forEach(p => { vorne[p] = 0; summe[p] = 0; });
for (let n = 0; n < N; n++) {
  const antw = T.map(() => { const z = zufall(); return z < 0.4 ? 'zu' : z < 0.8 ? 'ab' : 'neutral'; });
  const w = P.map(p => [p, wert(antw, p)]);
  w.forEach(([p, v]) => { summe[p] += v; });
  const best = Math.max(...w.map(x => x[1])); const sieger = w.filter(x => x[1] === best);
  sieger.forEach(([p]) => { vorne[p] += 1 / sieger.length; });
}
// Nur Zustimmen oder nur Ablehnen: Wer immer „ja“ sagt, darf nicht automatisch bei einer bestimmten Seite landen
const nurJa = P.map(p => [p, Math.round(100 * wert(T.map(() => 'zu'), p))]).sort((a, b) => b[1] - a[1]);
const nurNein = P.map(p => [p, Math.round(100 * wert(T.map(() => 'ab'), p))]).sort((a, b) => b[1] - a[1]);
console.log('Partei      vorne bei Zufallsantworten   mittlere Übereinstimmung   klare Positionen');
P.forEach(p => console.log(p.padEnd(10), (100 * vorne[p] / N).toFixed(1).padStart(8) + ' %', (100 * summe[p] / N).toFixed(1).padStart(22) + ' %', String(T.filter(t => t.positionen[p].pos !== 'offen').length).padStart(16)));
console.log('Immer „Stimme zu“:      ' + nurJa.map(x => x[0] + ' ' + x[1]).join(', '));
console.log('Immer „Stimme nicht zu“: ' + nurNein.map(x => x[0] + ' ' + x[1]).join(', '));
const zu = T.map(t => P.filter(p => t.positionen[p].pos === 'zu').length), ab = T.map(t => P.filter(p => t.positionen[p].pos === 'ab').length);
console.log('Thesen, die die Parteien kaum trennen (weniger als 2 dafür oder 2 dagegen): ' + (T.filter((t, i) => zu[i] < 2 || ab[i] < 2).map(t => t.id).join(', ') || 'keine'));
