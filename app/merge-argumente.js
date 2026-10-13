// Fügt die Teildateien des Antworten-Playbooks zu app/data/argumente.js zusammen. Aufruf: node app/merge-argumente.js
const fs = require('fs'), path = require('path');
const dir = path.join(__dirname, 'data');
const out = { kategorien: [], argumente: [], verhalten: [], studien_lesen: [] };
['A', 'B', 'C', 'D'].forEach(x => {
  const p = path.join(dir, 'argumente-teil' + x + '.json'); if (!fs.existsSync(p)) { console.log('fehlt: ' + p); return; }
  const d = JSON.parse(fs.readFileSync(p, 'utf8'));
  (d.kategorien || []).forEach(k => { if (!out.kategorien.some(y => y.id === k.id)) out.kategorien.push(k); });
  out.argumente.push(...(d.argumente || [])); out.verhalten.push(...(d.verhalten || [])); out.studien_lesen.push(...(d.studien_lesen || []));
});
const ids = new Set(); out.argumente.forEach(a => { if (ids.has(a.id)) throw new Error('doppelt: ' + a.id); ids.add(a.id); });
fs.writeFileSync(path.join(dir, 'argumente.js'), 'window.APP_DATA = window.APP_DATA || {};\nwindow.APP_DATA.argumente = ' + JSON.stringify(out, null, 2) + ';\n', 'utf8');
console.log('argumente.js: ' + out.argumente.length + ' Argumente in ' + out.kategorien.length + ' Kategorien, ' + out.verhalten.length + ' Verhaltensweisen, ' + out.studien_lesen.length + ' Studien-Hinweise');
