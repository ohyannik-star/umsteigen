// Fügt Teildateien in das Antworten-Playbook app/data/argumente.js ein. Aufruf: node app/merge-argumente.js app/data/argumente-ukraine.json [weitere.json]
// Grundlage ist die bestehende argumente.js: Einträge mit gleicher id werden ersetzt, neue angehängt. Neue Kategorien kommen vor „Angriffe auf dich“, die am Ende bleibt.
const fs = require('fs'), path = require('path'), vm = require('vm');
const target = path.join(__dirname, 'data', 'argumente.js');
const parts = process.argv.slice(2);
if (!parts.length) { console.log('Aufruf: node app/merge-argumente.js <teildatei.json> [weitere.json]'); process.exit(1); }
const ctx = { window: {} }; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(target, 'utf8'), ctx);
const out = ctx.window.APP_DATA.argumente;
const upsert = (list, items, label) => items.forEach(x => { const i = list.findIndex(y => y.id === x.id); if (i >= 0) list[i] = x; else list.push(x); console.log((i >= 0 ? 'ersetzt: ' : 'neu: ') + label + ' ' + x.id); });
parts.forEach(p => {
  const d = JSON.parse(fs.readFileSync(p, 'utf8'));
  (d.kategorien || []).forEach(k => { if (out.kategorien.some(y => y.id === k.id)) return; const i = out.kategorien.findIndex(y => y.id === 'persoenlich'); out.kategorien.splice(i >= 0 ? i : out.kategorien.length, 0, k); console.log('neu: Kategorie ' + k.id); });
  upsert(out.argumente, d.argumente || [], 'Argument'); upsert(out.verhalten, d.verhalten || [], 'Verhalten'); upsert(out.studien_lesen, d.studien_lesen || [], 'Studien-Hinweis');
});
const kats = new Set(out.kategorien.map(k => k.id));
out.argumente.forEach(a => { if (!kats.has(a.kategorie)) throw new Error('Kategorie unbekannt: ' + a.kategorie + ' bei ' + a.id); });
// Im Feld anfragen nur Hashes, nie die Anfragenummer selbst (die wäre öffentlich und erlaubt Abrufen und Löschen).
out.argumente.forEach(a => { if ((a.anfragen || []).some(h => !/^[0-9a-f]{64}$/.test(h))) throw new Error('anfragen bei ' + a.id + ' muss SHA-256-Hashes enthalten (admin.js hash <id>)'); });
fs.writeFileSync(target, 'window.APP_DATA = window.APP_DATA || {};\nwindow.APP_DATA.argumente = ' + JSON.stringify(out, null, 2) + ';\n', 'utf8');
console.log('argumente.js: ' + out.argumente.length + ' Argumente in ' + out.kategorien.length + ' Kategorien, ' + out.verhalten.length + ' Verhaltensweisen, ' + out.studien_lesen.length + ' Studien-Hinweise');
