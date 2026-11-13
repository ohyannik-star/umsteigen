// Prüft den Selbsttest „Wo stehe ich?“ mit drei Beispielthesen, deren Ergebnis von Hand ausgerechnet ist. Aufruf: node app/selbsttest-test.js
const fs = require('fs'), path = require('path'), vm = require('vm');
const mem = {}, fails = [];
const ok = (bed, text) => { if (!bed) fails.push(text); };
const P = (pos, s) => ({ pos, text: 'Einordnung ' + pos, zitat: pos === 'offen' ? '' : 'Zitat ' + s, seite: pos === 'offen' ? null : s });
const POS = {
  t1: { afd: 'zu', bsw: 'zu', cducsu: 'ab', linke: 'ab', fdp: 'neutral', fw: 'offen', gruene: 'ab', spd: 'ab' },
  t2: { afd: 'ab', bsw: 'neutral', cducsu: 'zu', linke: 'ab', fdp: 'zu', fw: 'zu', gruene: 'zu', spd: 'zu' },
  t3: { afd: 'zu', bsw: 'ab', cducsu: 'zu', linke: 'ab', fdp: 'ab', fw: 'zu', gruene: 'ab', spd: 'neutral' }
};
// Startet die App in einer frischen Umgebung; der Speicher (mem) bleibt über Neustarts erhalten
function starteApp() {
  const handlers = {}, els = {}, fokus = [], zwischenablage = [];
  const el = sel => ({ _sel: sel, innerHTML: '', dataset: {}, style: {}, value: '', textContent: '', hidden: true, addEventListener(t, fn) { (this.on = this.on || {})[t] = fn; }, querySelector() { return null; }, querySelectorAll() { return []; }, scrollIntoView() {}, getAttribute() { return '0'; }, setAttribute() {}, removeAttribute() {}, remove() {}, appendChild() {}, focus() { fokus.push(this._sel); }, select() {}, matches() { return false; } });
  const document = { querySelector: s => els[s] || (els[s] = el(s)), querySelectorAll: () => [], addEventListener: (t, fn) => { handlers['doc:' + t] = fn; }, createElement: () => el(''), body: el('body') };
  const localStorage = { getItem: k => (k in mem ? mem[k] : null), setItem: (k, v) => { mem[k] = String(v); }, removeItem: k => { delete mem[k]; }, key: i => Object.keys(mem)[i], get length() { return Object.keys(mem).length; } };
  const window = { APP_DATA: {}, UMSTEIGEN_HOSTED: true, addEventListener: (t, fn) => { handlers['win:' + t] = fn; }, scrollTo() {} };
  const navigator = { clipboard: { writeText: t => { zwischenablage.push(t); return Promise.resolve(); } } };
  const ctx = { window, document, localStorage, location: { hash: '' }, navigator, history: {}, console, setTimeout: (fn, ms) => setTimeout(fn, Math.min(ms || 0, 5)), clearTimeout, MouseEvent: function () {} };
  vm.createContext(ctx);
  // Echte Daten für Teil 1 und die Parteien, dazu drei Beispielthesen mit bekannten Positionen
  vm.runInContext(fs.readFileSync(path.join(__dirname, 'data', 'selbsttest.js'), 'utf8'), ctx, { filename: 'selbsttest.js' });
  window.APP_DATA.selbsttest.thesen = ['t1', 't2', 't3'].map((id, n) => ({ id, thema: 'Thema ' + (n + 1), text: 'Beispielthese Nummer ' + (n + 1) + '.', erklaerung: 'Erklärung ' + (n + 1), positionen: Object.keys(POS[id]).reduce((o, p, i) => { o[p] = P(POS[id][p], 10 + i); return o; }, {}) }));
  vm.runInContext(fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8'), ctx, { filename: 'app.js' });
  const main = els['#main'];
  return {
    window, fokus, zwischenablage,
    html: () => main.innerHTML,
    click(d, id) { try { handlers['doc:click']({ target: { closest: () => ({ dataset: d, id: id || '' }) }, preventDefault() {} }); } catch (e) { fails.push(JSON.stringify(d) + ': ' + e.stack.split('\n').slice(0, 2).join(' ')); } },
    route(r) { ctx.location.hash = '#' + r; handlers['win:hashchange'](); }
  };
}
const app = starteApp(), { click, route, html } = app;
const gespeichert = () => Object.keys(mem).filter(k => /selbsttest/.test(k));
const balken = () => (html().match(/data-partei="[a-z]+"[^>]*>[\s\S]*?<span class="bar-v">[^<]*<\/span>/g) || []).map(b => /data-partei="([a-z]+)"/.exec(b)[1] + ' ' + /<span class="bar-v">([^<]*)</.exec(b)[1].replace(/ /g, ' '));
const gemein = () => (/<section class="stack" id="gemeinsam">([\s\S]*?)<\/section>/.exec(html()) || [])[1] || '';

// Einstieg: beide Teile, Hinweis auf Datenschutz und keine Wahlempfehlung
route('selbsttest');
ok(html().indexOf('data-teil="staerken"') >= 0 && html().indexOf('data-teil="thesen"') >= 0, 'Einstieg ohne die beiden Teile');
ok(/keine Wahlempfehlung/i.test(html()), 'Einstieg ohne Hinweis „keine Wahlempfehlung“');

// Teil 1: unvollständig keine Auswertung; überall Antwort b ergibt „Mit guten Argumenten“
click({ act: 'st-teil', teil: 'staerken' });
const fragen = app.window.APP_DATA.selbsttest.staerken.fragen;
fragen.slice(0, 3).forEach(f => click({ act: 'st-wahl', f: f.id, o: 'b' }));
click({ act: 'st-auswerten' });
ok(html().indexOf('Mit guten Argumenten') < 0, 'Teil 1 wertet aus, obwohl Fragen fehlen');
ok(app.fokus[app.fokus.length - 1] === '#st-o-s3-b' && html().indexOf('id="st-o-s3-b"') >= 0, 'Teil 1: Fokus bleibt nach der Wahl nicht auf der gewählten Antwort');
fragen.forEach(f => click({ act: 'st-wahl', f: f.id, o: 'b' }));
click({ act: 'st-auswerten' });
ok(html().indexOf('Mit guten Argumenten') >= 0, 'Teil 1: überall b ergibt nicht „Mit guten Argumenten“');
ok(html().indexOf('data-go="argumentieren"') >= 0, 'Teil 1: Ergebnis führt nicht in den passenden Bereich');
ok(html().indexOf('data-act="st-start"') >= 0, 'Teil 1: Ergebnis ohne Weg zur Übersicht');
// Gleichstand: Kraft geht vor. s4 d (Kraft 4) und s2 e (Kraft 2) gegen Zuhören 2 × 3 = 6
fragen.forEach(f => click({ act: 'st-wahl', f: f.id, o: f.id === 's4' ? 'd' : f.id === 's2' ? 'e' : f.id === 's6' ? 'b' : f.id === 's8' ? 'c' : f.id === 's5' ? 'd' : 'a' }));
click({ act: 'st-auswerten' });
ok(html().indexOf('Erst einmal Kraft tanken') >= 0, 'Teil 1: Bei Gleichstand geht „Kraft tanken“ nicht vor');
ok(html().indexOf('0800 111 0 111') >= 0, 'Teil 1: „Kraft tanken“ nennt keine Hilfe');
// Starke Belastung, aber eine andere Stärke vorn: Hinweis auf Selbstschutz statt „Auch stark: Kraft tanken“
fragen.forEach(f => click({ act: 'st-wahl', f: f.id, o: f.id === 's4' ? 'd' : 'a' }));
click({ act: 'st-auswerten' });
ok(html().indexOf('Zuhören und verstehen') >= 0, 'Teil 1: s4 d und sonst a ergibt nicht „Zuhören und verstehen“');
ok(html().indexOf('Achte auch auf dich') >= 0 && html().indexOf('data-go="schutz"') >= 0 && html().indexOf('Auch stark: Erst einmal Kraft tanken') < 0, 'Teil 1: Bei starker Belastung fehlt der Hinweis auf Selbstschutz');

// Teil 2: t1 zu, t2 zu, t3 ab und doppelt gewichtet
route('selbsttest'); click({ act: 'st-start' }); click({ act: 'st-teil', teil: 'thesen' });
ok(html().indexOf('Beispielthese Nummer 1.') >= 0, 'Teil 2 beginnt nicht mit der ersten These');
ok(html().indexOf('class="crumb"') < 0, 'Bei den Thesen stehen zwei Zurück-Links');
ok(html().indexOf('data-act="st-start"') >= 0, 'Bei den Thesen fehlt der Weg zur Übersicht');
click({ act: 'st-antwort', wert: 'zu' });
ok(html().indexOf('Beispielthese Nummer 2.') >= 0, 'Nach der Antwort kommt nicht die nächste These');
ok(app.fokus[app.fokus.length - 1] === '#st-these' && html().indexOf('id="st-these"') >= 0, 'Nach der Antwort steht der Fokus nicht auf der neuen These');
click({ act: 'st-zurueck' });
ok(html().indexOf('Beispielthese Nummer 1.') >= 0 && /data-wert="zu"[^>]*aria-pressed="true"|aria-pressed="true"[^>]*data-wert="zu"/.test(html()), 'Zurück zeigt die vorige These nicht mit gewählter Antwort');
click({ act: 'st-antwort', wert: 'zu' });
click({ act: 'st-antwort', wert: 'zu' });
click({ act: 'st-wichtig' });
click({ act: 'st-antwort', wert: 'ab' });
// Ergebnis: von Hand gerechnet (2/1/0 Punkte, t3 doppelt, „keine klare Aussage“ zählt halb: 1 von 2 Punkten). Freie Wähler: t1 offen 1/2, t2 2/2, t3 0/4 = 3/8 = 38 %
const erwartet = 'bsw 88 %, fdp 88 %, gruene 75 %, linke 50 %, spd 50 %, fw 38 %, afd 25 %, cducsu 25 %';
ok(balken().join(', ') === erwartet, 'Ergebnis falsch berechnet oder sortiert: ' + balken().join(', '));
ok(/keine Wahlempfehlung/i.test(html()), 'Ergebnis ohne Hinweis „keine Wahlempfehlung“');
ok(html().indexOf('data-act="st-start"') >= 0, 'Ergebnis ohne Weg zur Übersicht');
// Gemeinsamkeiten: AfD und CDU/CSU liegen gleichauf hinten; beide werden genannt, mit ihren gemeinsamen Thesen
ok(/Am wenigsten[^<]*AfD[^<]*CDU\/CSU/.test(gemein()) && gemein().indexOf('Beispielthese Nummer 2.') >= 0, 'Gemeinsamkeiten: Gleichstand hinten nicht beide Parteien genannt: ' + gemein().replace(/<[^>]+>/g, ' ').slice(0, 200));
// Farben im Vergleich folgen deiner Antwort, nicht der Richtung der These
ok(html().indexOf('wie du') >= 0 && html().indexOf('anders als du') >= 0 && html().indexOf('teils wie du') >= 0, 'Vergleich zeigt nicht, ob die Partei so geantwortet hat wie du');
ok(!/class="chip st-(good|bad|warn)">(stimmt zu|lehnt ab|neutral)</.test(html()), 'Positionen sind nach der Richtung der These eingefärbt');
ok(html().indexOf('Zitat 10') >= 0 && html().indexOf('#page=10') >= 0 && html().indexOf('PDF-Seite 10') >= 0, 'Vergleich ohne Beleg mit Seitenlink und PDF-Seite');
ok(html().indexOf('keine klare Aussage') >= 0, 'Vergleich zeigt „keine klare Aussage“ nicht');
// Antworten ändern: Weiter, ohne die Antwort zu überschreiben
click({ act: 'st-neu' });
ok(html().indexOf('data-act="st-weiter"') >= 0 && html().indexOf('data-wert="skip"') < 0, 'Bei beantworteter These fehlt „Weiter, Antwort behalten“');
[1, 2, 3].forEach(() => click({ act: 'st-weiter' }));
ok(balken().join(', ') === erwartet, 'Weiterblättern verändert das Ergebnis: ' + balken().join(', '));
// Datenschutz: nichts gespeichert, bis man es ausdrücklich will; nicht in der Sicherung
ok(gespeichert().length === 0, 'Antworten werden ohne Zustimmung gespeichert: ' + gespeichert().join(', '));
click({ act: 'st-speichern' });
ok(gespeichert().length === 1, 'Speichern legt die Antworten nicht ab');
click({ act: 'bk-copy' });
const sicherung = JSON.parse(app.zwischenablage[app.zwischenablage.length - 1] || '{"daten":{}}');
ok(!('selbsttest' in sicherung.daten), 'Selbsttest-Antworten landen in der Sicherung');
// Neustart mit demselben Speicher: Ergebnis und „gespeichert“ sind wieder da, Änderungen werden weiter gespeichert
const app2 = starteApp();
app2.route('selbsttest'); app2.click({ act: 'st-teil', teil: 'thesen' });
ok(app2.html().indexOf('Dein Ergebnis') >= 0 && app2.html().indexOf('Auf diesem Gerät gespeichert') >= 0, 'Nach Neustart fehlt das gespeicherte Ergebnis');
const vorher = mem['umsteigen:selbsttest'];
app2.click({ act: 'st-neu' }); app2.click({ act: 'st-antwort', wert: 'ab' });
ok(mem['umsteigen:selbsttest'] !== vorher, 'Nach Neustart werden Änderungen nicht mehr gespeichert');
// Löschen fragt erst nach
app2.click({ act: 'st-teil', teil: 'thesen' });
app2.click({ act: 'st-loeschen' });
ok(gespeichert().length === 1 && app2.html().indexOf('data-act="st-loeschen-ja"') >= 0, 'Löschen fragt nicht nach');
app2.click({ act: 'st-loeschen-ja' });
ok(gespeichert().length === 0, 'Löschen entfernt die gespeicherten Antworten nicht');
app2.route('selbsttest');
ok(app2.html().indexOf('Dein Ergebnis') < 0, 'Nach dem Löschen ist das Ergebnis noch da');
// Alles übersprungen: kein Ergebnis, sondern ein Hinweis
app2.click({ act: 'st-teil', teil: 'thesen' });
[1, 2, 3].forEach(() => app2.click({ act: 'st-antwort', wert: 'skip' }));
ok(app2.html().indexOf('data-partei=') < 0 && /übersprungen/.test(app2.html()), 'Alles übersprungen ergibt trotzdem ein Ergebnis');

fails.forEach(f => console.log('FEHLER ' + f));
console.log(fails.length ? fails.length + ' Fehler' : 'OK, Selbsttest rechnet und zeigt richtig');
process.exit(fails.length ? 1 : 0);
