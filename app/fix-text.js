// Mechanische Nacharbeit nach dem Lektorat. Aufruf: node app/fix-text.js
// 1) Kompass: Sätze, die mit „Sie <Verb in 3. Person Singular>“ beginnen, werden zu „Die Person <Verb>“ (formale Anrede hat Pluralverben und bleibt unberührt).
// 2) Linien: Bedingungen („wenn“) beginnen groß und enden mit Punkt.
// 3) Überall: „...“ → „…“, doppelte Leerzeichen, Leerzeichen vor Satzzeichen.
const fs = require('fs'), path = require('path'), vm = require('vm');
const dir = path.join(__dirname, 'data');
function load(name) { const ctx = { window: {} }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(dir, name + '.js'), 'utf8'), ctx); return ctx.window.APP_DATA[name]; }
function save(name, data) { fs.writeFileSync(path.join(dir, name + '.js'), 'window.APP_DATA = window.APP_DATA || {};\nwindow.APP_DATA.' + name + ' = ' + JSON.stringify(data, null, 2) + ';\n', 'utf8'); }
let n = { person: 0, wenn: 0, typo: 0 };
const SKIP = /^(id|farbe|url|telefon|typ|ebene|evidenz|aufwand|erreichbar|region|fuer|linie|station|zu|start|bewertung|technik|bis|skala)$/;
function typo(s) { let t = s.replace(/\.\.\./g, '…').replace(/  +/g, ' ').replace(/ ([,.;:!?])/g, '$1'); if (t !== s) n.typo++; return t; }
function personify(s) {
  // Satzanfang „Sie“ + Verb auf -t (3. Person Singular): „Sie trägt“ → „Die Person trägt“; „Sie hat“, „Sie ist“ eingeschlossen.
  return s.replace(/(^|[.!?:] |[„(]|; )Sie (?=(?:[a-zäöüß]+t|hat|ist)\b)/g, (m, pre) => { n.person++; return pre + 'Die Person '; });
}
function walk(v, key, fn) {
  if (typeof v === 'string') return SKIP.test(key) ? v : fn(v, key);
  if (Array.isArray(v)) return v.map(x => walk(x, key, fn));
  if (v && typeof v === 'object') { Object.keys(v).forEach(k => { v[k] = walk(v[k], k, fn); }); return v; }
  return v;
}
// Kompass
const kompass = load('kompass');
walk(kompass, 'kompass', (s, key) => typo(key === 'text' || key === 'hinweis' || key === 'warum' || key === 'beschreibung' ? personify(s) : s));
save('kompass', kompass);
// Linien
const linien = load('linien');
walk(linien, 'linien', (s, key) => {
  let t = typo(s);
  if (key === 'wenn') { let u = t.trim(); u = u.charAt(0).toUpperCase() + u.slice(1); if (!/[.!?“]$/.test(u)) u += '.'; if (u !== t) { n.wenn++; t = u; } }
  return t;
});
save('linien', linien);
// Übrige Dateien nur Typografie
['techniken', 'szenarien', 'kampagne', 'leitplanken', 'hilfe', 'messung'].forEach(name => { const d = load(name); walk(d, name, s => typo(s)); save(name, d); });
console.log('Die Person statt Sie: ' + n.person + ', Bedingungen: ' + n.wenn + ', Typografie: ' + n.typo);
