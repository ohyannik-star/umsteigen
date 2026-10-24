// Mechanische Textprüfung aller Inhalte: Anführungszeichen, Satzanfänge, „sie“ ohne „die Person“, Bedingungssätze, Leerzeichen.
// Aufruf: node app/check-text.js   (nur Hinweise, ändert nichts)
const fs = require('fs'), path = require('path'), vm = require('vm');
const dir = path.join(__dirname, 'data');
const ctx = { window: {} }; vm.createContext(ctx);
const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));
const quoteHits = [];
files.forEach(f => {
  const src = fs.readFileSync(path.join(dir, f), 'utf8');
  vm.runInContext(src, ctx, { filename: f });
  (src.match(/\\"/g) || []).length && quoteHits.push(f + ': ' + (src.match(/\\"/g) || []).length + 'x ASCII-Anführungszeichen (\\")');
});
const D = ctx.window.APP_DATA;
const findings = {};
const add = (k, p, s) => { (findings[k] = findings[k] || []).push(p + ' → ' + s.slice(0, 140)); };
function walk(v, p, key) {
  if (typeof v === "string") return check(v, p, key);
  if (Array.isArray(v) && /^(segmente|bausteine|kennzahlen|techniken|empfiehlt|meidet|top|risiko|anfragen)$/.test(key) && v.every(x => typeof x === "string" && /^[a-z0-9-]+$/.test(x))) return;
  if (Array.isArray(v)) return v.forEach((x, i) => walk(x, p + '[' + i + ']', key));
  if (v && typeof v === 'object') return Object.keys(v).forEach(k => walk(v[k], p + '.' + k, k));
}
function check(s, p, key) {
  if (/^(id|kategorie|farbe|url|telefon|typ|ebene|evidenz|aufwand|erreichbar|region|fuer|linie|station|zu|start|bewertung|technik|weiter|bis|skala)$/.test(key)) return;
  if (s.length < 4) return;
  if (/"/.test(s)) add('ASCII-Anführungszeichen', p, s);
  if (/  /.test(s)) add('Doppeltes Leerzeichen', p, s);
  if (/ [,.;:!?]/.test(s)) add('Leerzeichen vor Satzzeichen', p, s);
  if (/\bwenn (es|die|der|das|sie|er|man) (gibt|ist|hat|wird|kommt|sagt|bleibt|geht|macht|fehlt)\b/i.test(s)) add('Nebensatz mit falscher Wortstellung', p, s);
  if (key === 'wenn' && !/^[A-ZÄÖÜ„]/.test(s)) add('Bedingung beginnt klein', p, s);
  if (key === 'wenn' && !/[.!?“]$/.test(s)) add('Bedingung ohne Satzende', p, s);
  if (/(^|[.!?] )[a-zäöü]/.test(s) && !/^[a-zäöü]+$/.test(s) && key !== 'kurz') add('Kleiner Satzanfang', p, s);
  const m = s.match(/(^|[.!?] )[Ss]ie\b/);
  if (m && !/die Person|Person\b/.test(s.slice(0, m.index + 1)) && !/^Sie\b/.test(s.trim()) === false && !/Sie (haben|sind|können|wollen|müssen|sollten|würden)/.test(s)) add('„sie“ am Satzanfang ohne „die Person“ davor', p, s);
  else if (m && !/Person/.test(s)) add('„sie“ am Satzanfang ohne „die Person“ im Text', p, s);
  if (/\b(er\/sie|er oder sie|sie\/er)\b/i.test(s)) add('er/sie-Form', p, s);
  if (/\.\.\./.test(s)) add('Drei Punkte statt …', p, s);
}
Object.keys(D).forEach(k => walk(D[k], k, k));
quoteHits.forEach(h => console.log('HINWEIS ' + h));
let total = 0;
Object.keys(findings).forEach(k => {
  total += findings[k].length;
  console.log('\n== ' + k + ' (' + findings[k].length + ')');
  findings[k].slice(0, 12).forEach(x => console.log('  ' + x));
  if (findings[k].length > 12) console.log('  … ' + (findings[k].length - 12) + ' weitere');
});
console.log('\n' + total + ' Hinweise gesamt');
