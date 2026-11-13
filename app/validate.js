// Prüft die Datendateien: Syntax, Mengen, Querverweise. Aufruf: node app/validate.js
const fs = require('fs'), path = require('path'), vm = require('vm');
const dir = path.join(__dirname, 'data');
const ctx = { window: {} }; vm.createContext(ctx);
const files = ['linien', 'techniken', 'kompass', 'szenarien', 'kampagne', 'leitplanken', 'hilfe', 'messung'];
const errors = [], warns = [];
for (const f of files) {
  const p = path.join(dir, f + '.js');
  if (!fs.existsSync(p)) { if (f === 'argumente') { warns.push('argumente.js fehlt noch'); continue; } errors.push('fehlt: ' + f + '.js'); continue; }
  try { vm.runInContext(fs.readFileSync(p, 'utf8'), ctx, { filename: f + '.js' }); } catch (e) { errors.push(f + '.js: ' + e.message); }
}
const D = ctx.window.APP_DATA || {};
const L = D.linien || [], T = D.techniken || [], K = D.kompass, S = D.szenarien || [], C = D.kampagne, LP = D.leitplanken, H = D.hilfe || [], M = D.messung;
const tech = new Set(T.map(t => t.id));
const st = {}; L.forEach(l => { st[l.id] = new Set(l.stationen.map(s => s.id)); });
const ok = (cond, msg) => { if (!cond) errors.push(msg); };
const warn = (cond, msg) => { if (!cond) warns.push(msg); };

ok(L.length >= 5, 'weniger als 5 Linien');
L.forEach(l => {
  ok(l.stationen.length >= 6, `Linie ${l.id}: nur ${l.stationen.length} Stationen`);
  const branches = l.stationen.filter(s => (s.spur || 0) !== 0).length;
  warn(branches >= 2, `Linie ${l.id}: nur ${branches} Abzweige`);
  const xfers = l.stationen.reduce((n, s) => n + (s.umsteigen || []).length, 0);
  warn(xfers >= 2, `Linie ${l.id}: nur ${xfers} Umsteigepunkte`);
  l.stationen.forEach(s => {
    ['ziel', 'warum', 'evidenz', 'schritte', 'formulierungen', 'fehler', 'signale_weiter', 'signale_stopp', 'weiter'].forEach(k => ok(s[k] != null, `Linie ${l.id}/${s.id}: Feld ${k} fehlt`));
    (s.techniken || []).forEach(t => ok(tech.has(t), `Linie ${l.id}/${s.id}: Technik ${t} unbekannt`));
    (s.weiter || []).forEach(w => ok(st[l.id].has(w.zu), `Linie ${l.id}/${s.id}: weiter → ${w.zu} unbekannt`));
    (s.umsteigen || []).forEach(u => ok(st[u.linie] && st[u.linie].has(u.station), `Linie ${l.id}/${s.id}: umsteigen → ${u.linie}/${u.station} unbekannt`));
  });
});
ok(T.length >= 15, `nur ${T.length} Techniken`);
T.forEach(t => ['kurz', 'evidenz', 'ebene', 'beschreibung', 'so_gehts', 'nicht', 'quellen'].forEach(k => ok(t[k] != null, `Technik ${t.id}: Feld ${k} fehlt`)));
if (K) {
  ok(K.fragen && K.fragen.length >= 8, 'Kompass: zu wenige Fragen');
  const treiber = new Set((K.treiber || []).map(t => t.id));
  (K.fragen || []).forEach(f => f.optionen.forEach(o => Object.keys(o.gewichte || {}).forEach(g => ok(treiber.has(g), `Kompass ${f.id}/${o.id}: Treiber ${g} unbekannt`))));
  ['stufe', 'beziehung', 'risiko'].forEach(id => {
    const f = (K.fragen || []).find(x => x.id === id); ok(f, `Kompass: Sonderfrage ${id} fehlt`);
    if (!f) return;
    const list = id === 'stufe' ? K.stufen : id === 'beziehung' ? K.beziehung : K.risiko;
    const ids = new Set((list || []).map(x => x.id));
    f.optionen.forEach(o => warn(ids.has(o.id) || (id === 'risiko' && o.id === 'keine'), `Kompass ${id}: Option ${o.id} ohne Eintrag in Liste`));
  });
  (K.treiber || []).forEach(t => {
    ok(t.start && st[t.start.linie] && st[t.start.linie].has(t.start.station), `Treiber ${t.id}: start ${t.start && t.start.linie}/${t.start && t.start.station} unbekannt`);
    (t.techniken || []).forEach(x => ok(tech.has(x), `Treiber ${t.id}: Technik ${x} unbekannt`));
  });
} else errors.push('kompass fehlt');
ok(S.length >= 6, `nur ${S.length} Szenarien`);
S.forEach(s => {
  ok(s.knoten && s.knoten[s.start], `Szenario ${s.id}: Startknoten fehlt`);
  Object.keys(s.knoten || {}).forEach(k => {
    const n = s.knoten[k];
    (n.optionen || []).forEach(o => {
      ok(['gut', 'ok', 'schlecht'].includes(o.bewertung), `Szenario ${s.id}/${k}: bewertung ${o.bewertung}`);
      if (o.technik) ok(tech.has(o.technik), `Szenario ${s.id}/${k}: Technik ${o.technik} unbekannt`);
      if (o.weiter) ok(s.knoten[o.weiter], `Szenario ${s.id}/${k}: weiter → ${o.weiter} unbekannt`);
    });
    if (!(n.optionen || []).length) warn(n.abschluss, `Szenario ${s.id}/${k}: Endknoten ohne abschluss`);
  });
});
if (C) {
  const bs = new Set((C.bausteine || []).map(b => b.id)), kz = new Set((C.kennzahlen || []).map(k => k.id)), seg = new Set((C.segmente || []).map(s => s.id));
  ok((C.bausteine || []).length >= 12, `nur ${(C.bausteine || []).length} Bausteine`);
  (C.bausteine || []).forEach(b => (b.segmente || []).forEach(x => warn(seg.has(x), `Baustein ${b.id}: Segment ${x} unbekannt`)));
  (C.phasen || []).forEach(p => { (p.bausteine || []).forEach(x => ok(bs.has(x), `Phase ${p.id}: Baustein ${x} unbekannt`)); (p.kennzahlen || []).forEach(x => ok(kz.has(x), `Phase ${p.id}: Kennzahl ${x} unbekannt`)); });
  ((C.planer || {}).fragen || []).forEach(f => f.optionen.forEach(o => [...(o.empfiehlt || []), ...(o.meidet || [])].forEach(x => ok(bs.has(x), `Planer ${f.id}/${o.id}: Baustein ${x} unbekannt`))));
  const covered = new Set((C.phasen || []).flatMap(p => p.bausteine || []));
  (C.bausteine || []).forEach(b => warn(covered.has(b.id), `Baustein ${b.id} in keiner Phase`));
} else errors.push('kampagne fehlt');
ok(LP && LP.grundsaetze && LP.grundsaetze.length >= 8, 'Leitplanken: zu wenige Grundsätze');
ok(LP && LP.datenschutz && LP.datenschutz.hinweis_tagebuch, 'Leitplanken: datenschutz.hinweis_tagebuch fehlt');
ok(H.length >= 12, `nur ${H.length} Anlaufstellen`);
H.forEach(h => warn(h.url, `Anlaufstelle ${h.id}: ohne URL`));
ok(M && M.stufen && M.stufen.length >= 4, 'Messung: Stufen fehlen');

// Selbsttest Teil 3 (Faktencheck) und Teil 4 (Gesprächs-Check)
{
  const sctx = { window: {} }; vm.createContext(sctx);
  vm.runInContext(fs.readFileSync(path.join(dir, 'selbsttest.js'), 'utf8'), sctx, { filename: 'selbsttest.js' });
  const ST = sctx.window.APP_DATA.selbsttest, FA = ST.fakten || [], GE = ST.gespraech || [], ids = new Set();
  ok(FA.length >= 10, 'Faktencheck: weniger als 10 Fragen');
  ok(GE.length >= 8, 'Gesprächs-Check: weniger als 8 Situationen');
  FA.forEach(f => {
    ok(f.id && !ids.has(f.id), 'Faktencheck: ID fehlt oder doppelt: ' + f.id); ids.add(f.id);
    ok(f.thema && f.frage && f.erklaerung && f.stand, 'Faktencheck ' + f.id + ': Feld fehlt');
    ok(Array.isArray(f.optionen) && f.optionen.length === 4 && f.optionen.every(o => typeof o === 'string' && o) && new Set(f.optionen).size === 4, 'Faktencheck ' + f.id + ': keine 4 verschiedenen Antworten');
    ok(Number.isInteger(f.richtig) && f.richtig >= 0 && f.richtig < 4, 'Faktencheck ' + f.id + ': richtige Antwort fehlt');
    ok(f.quelle && f.quelle.titel && /^https:\/\//.test(f.quelle.url || ''), 'Faktencheck ' + f.id + ': Quelle ohne Titel oder https-Adresse');
  });
  GE.forEach(g => {
    ok(g.id && !ids.has(g.id), 'Gesprächs-Check: ID fehlt oder doppelt: ' + g.id); ids.add(g.id);
    ok(g.situation && g.aussage, 'Gesprächs-Check ' + g.id + ': Feld fehlt');
    ok(Array.isArray(g.optionen) && g.optionen.length >= 3 && g.optionen.length <= 4, 'Gesprächs-Check ' + g.id + ': 3 oder 4 Antworten nötig');
    ok((g.optionen || []).filter(o => o.wert === 2).length === 1, 'Gesprächs-Check ' + g.id + ': nicht genau eine beste Antwort');
    (g.optionen || []).forEach(o => { ok(o.text && o.feedback && [0, 1, 2].indexOf(o.wert) >= 0, 'Gesprächs-Check ' + g.id + ': Antwort unvollständig'); if (o.technik) ok(tech.has(o.technik), 'Gesprächs-Check ' + g.id + ': Technik ' + o.technik + ' unbekannt'); });
  });
  // Die richtige Antwort soll nicht immer an derselben Stelle stehen
  const pos = new Set(FA.map(f => f.richtig)); ok(FA.length < 4 || pos.size >= 3, 'Faktencheck: richtige Antwort steht fast immer an derselben Stelle');
}

console.log(`Linien ${L.length} (${L.reduce((n, l) => n + l.stationen.length, 0)} Stationen), Techniken ${T.length}, Kompass-Fragen ${K ? K.fragen.length : 0}, Szenarien ${S.length}, Bausteine ${C ? (C.bausteine || []).length : 0}, Anlaufstellen ${H.length}`);
warns.forEach(w => console.log('WARNUNG ' + w));
errors.forEach(e => console.log('FEHLER ' + e));
console.log(errors.length ? `${errors.length} Fehler` : 'OK, keine Fehler');
process.exit(errors.length ? 1 : 0);
