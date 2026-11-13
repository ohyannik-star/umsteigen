// Prüft die Daten des Selbsttests. Aufruf: node app/validate-selbsttest.js [ordner-mit-programmtexten]
// Mit Ordner wird zusätzlich jedes Zitat gegen den Programmtext geprüft: <quelle-id>.txt mit Seitenmarken [[Seite N]]
// (N = Seite im PDF-Betrachter). Die Programmtexte gehören nicht ins Repository (Urheberrecht der Parteien).
const fs = require('fs'), path = require('path'), vm = require('vm');
const ctx = { window: {} }; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, 'data', 'selbsttest.js'), 'utf8'), ctx);
const ST = ctx.window.APP_DATA.selbsttest;
const fehler = [], warn = [];
const POS = ['zu', 'ab', 'neutral', 'offen'];
const parteien = ST.parteien.map(p => p.id);

// Teil 1
const typen = ST.staerken.typen.map(t => t.id);
ST.staerken.fragen.forEach(f => f.optionen.forEach(o => Object.keys(o.typ).forEach(k => { if (typen.indexOf(k) < 0) fehler.push('Frage ' + f.id + '/' + o.id + ': unbekannter Typ ' + k); })));
ST.staerken.typen.forEach(t => { if (['verstehen', 'argumentieren', 'vorbereiten', 'aktiv', 'schutz'].indexOf(t.hub) < 0) fehler.push('Typ ' + t.id + ': unbekannter Bereich ' + t.hub); });

// Teil 2
const ids = new Set(), themen = {};
ST.thesen.forEach(t => {
  if (!/^[a-z0-9-]+$/.test(t.id) || ids.has(t.id)) fehler.push('These ' + t.id + ': id fehlt, ist ungültig oder doppelt'); ids.add(t.id);
  if (!t.text || t.text.length > 140) fehler.push('These ' + t.id + ': Text fehlt oder ist länger als 140 Zeichen');
  if (!t.erklaerung) warn.push('These ' + t.id + ': ohne Erklärung');
  themen[t.thema] = (themen[t.thema] || 0) + 1;
  const zaehl = { zu: 0, ab: 0, neutral: 0, offen: 0 };
  parteien.forEach(pid => {
    const x = t.positionen[pid];
    if (!x) { fehler.push('These ' + t.id + ': Position von ' + pid + ' fehlt'); return; }
    if (POS.indexOf(x.pos) < 0) { fehler.push('These ' + t.id + '/' + pid + ': ungültige Position ' + x.pos); return; }
    zaehl[x.pos]++;
    if (x.pos === 'offen') return;
    if (!x.text) fehler.push('These ' + t.id + '/' + pid + ': Einordnung fehlt');
    if (!x.zitat || x.zitat.length > 320) fehler.push('These ' + t.id + '/' + pid + ': Zitat fehlt oder ist länger als 320 Zeichen');
    if (!(x.seite >= 1) || Math.floor(x.seite) !== x.seite) fehler.push('These ' + t.id + '/' + pid + ': Seite fehlt');
    const p = ST.parteien.find(q => q.id === pid);
    if (x.quelle && !(p.quellen || []).some(q => q.id === x.quelle)) fehler.push('These ' + t.id + '/' + pid + ': unbekannte Quelle ' + x.quelle);
  });
  Object.keys(t.positionen).forEach(pid => { if (parteien.indexOf(pid) < 0) fehler.push('These ' + t.id + ': unbekannte Partei ' + pid); });
  if (zaehl.zu < 2 || zaehl.ab < 2) warn.push('These ' + t.id + ': trennt die Parteien kaum (' + JSON.stringify(zaehl) + ')');
  if (zaehl.offen > 3) warn.push('These ' + t.id + ': bei ' + zaehl.offen + ' Parteien keine klare Aussage');
});
Object.keys(themen).forEach(k => { if (themen[k] > 3) fehler.push('Thema „' + k + '“ hat ' + themen[k] + ' Thesen (höchstens 3)'); });

// Zitate gegen die Programmtexte
const ordner = process.argv[2];
if (ordner && ST.thesen.length) {
  const norm = s => String(s).normalize('NFKC').replace(/­/g, '').replace(/[„“”"«»]/g, '"').replace(/[‚‘’']/g, "'").replace(/[–—]/g, '-').replace(/-\s*\n\s*/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
  const seiten = {};
  const lade = id => {
    if (seiten[id]) return seiten[id];
    const datei = path.join(ordner, id + '.txt'); if (!fs.existsSync(datei)) return null;
    const teile = fs.readFileSync(datei, 'utf8').split(/\[\[Seite (\d+)\]\]/); const s = {};
    for (let i = 1; i < teile.length; i += 2) s[+teile[i]] = norm(teile[i + 1]);
    return (seiten[id] = s);
  };
  ST.thesen.forEach(t => parteien.forEach(pid => {
    const x = t.positionen[pid]; if (!x || x.pos === 'offen' || !x.zitat) return;
    const s = lade(x.quelle || pid); if (!s) { fehler.push('Programmtext fehlt für ' + (x.quelle || pid)); return; }
    // Auslassungen […] teilen das Zitat; jedes Stück muss auf der Seite stehen (oder auf der Folgeseite, wenn es über den Seitenwechsel reicht)
    const stuecke = x.zitat.split(/\s*\[…\]\s*|\s*\[\.\.\.\]\s*/).map(norm).filter(Boolean);
    const text = (s[x.seite] || '') + ' ' + (s[x.seite + 1] || '');
    const fehlt = stuecke.filter(st => text.indexOf(st) < 0 && text.replace(/-/g, '').indexOf(st.replace(/-/g, '')) < 0);
    if (fehlt.length) fehler.push('These ' + t.id + '/' + pid + ': Zitat nicht wörtlich auf S. ' + x.seite + ' gefunden: „' + fehlt[0].slice(0, 80) + '…“');
  }));
}

warn.forEach(w => console.log('WARNUNG ' + w));
fehler.forEach(f => console.log('FEHLER ' + f));
console.log(fehler.length ? fehler.length + ' Fehler' : 'OK, ' + ST.thesen.length + ' Thesen, ' + parteien.length + ' Parteien' + (ordner ? ', alle Zitate wörtlich gefunden' : ''));
process.exit(fehler.length ? 1 : 0);
