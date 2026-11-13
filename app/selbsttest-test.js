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
  // Drei Beispiel-Faktenfragen (richtig: 1, 2, 0) und zwei Gesprächssituationen mit bekannter Wertung
  window.APP_DATA.selbsttest.fakten = [1, 2, 0].map((r, n) => ({ id: 'f' + (n + 1), thema: 'Faktthema ' + (n + 1), frage: 'Faktfrage Nummer ' + (n + 1) + '?', optionen: ['A' + n, 'B' + n, 'C' + n, 'D' + n], richtig: r, erklaerung: 'Fakterklärung ' + (n + 1), quelle: { titel: 'Amtliche Quelle ' + (n + 1), url: 'https://example.org/q' + (n + 1) }, stand: '2025' }));
  window.APP_DATA.selbsttest.gespraech = [1, 2].map(n => ({ id: 'g' + n, situation: 'Situation ' + n, aussage: 'Aussage Nummer ' + n, optionen: [{ text: 'Gut ' + n, wert: 2, feedback: 'Öffnet ' + n, technik: '' }, { text: 'Mittel ' + n, wert: 1, feedback: 'Geht ' + n }, { text: 'Schlecht ' + n, wert: 0, feedback: 'Schließt ' + n }] }));
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
ok(/[Mm]ehrere Antworten/.test(html()), 'Teil 1 sagt nicht, dass mehrere Antworten möglich sind');
fragen.slice(0, 3).forEach(f => click({ act: 'st-wahl', f: f.id, o: 'b' }));
click({ act: 'st-auswerten' });
ok(html().indexOf('Mit guten Argumenten') < 0, 'Teil 1 wertet aus, obwohl Fragen fehlen');
ok(app.fokus[app.fokus.length - 1] === '#st-o-s3-b' && html().indexOf('id="st-o-s3-b"') >= 0, 'Teil 1: Fokus bleibt nach der Wahl nicht auf der gewählten Antwort');
fragen.slice(3).forEach(f => click({ act: 'st-wahl', f: f.id, o: 'b' }));
click({ act: 'st-auswerten' });
ok(html().indexOf('Mit guten Argumenten') >= 0, 'Teil 1: überall b ergibt nicht „Mit guten Argumenten“');
ok(html().indexOf('data-go="argumentieren"') >= 0, 'Teil 1: Ergebnis führt nicht in den passenden Bereich');
ok(html().indexOf('data-act="st-start"') >= 0, 'Teil 1: Ergebnis ohne Weg zur Übersicht');
// Jede Kombination in einer frischen App: wahl[frage] = Liste der angetippten Antworten (ohne Angabe: a)
const teil1 = wahl => { const a = starteApp(); a.route('selbsttest'); a.click({ act: 'st-teil', teil: 'staerken' }); fragen.forEach(f => (wahl[f.id] || ['a']).forEach(o => a.click({ act: 'st-wahl', f: f.id, o }))); a.click({ act: 'st-auswerten' }); return a; };
const gedrueckt = (a, f) => fragen.find(x => x.id === f).optionen.filter(o => new RegExp('id="st-o-' + f + '-' + o.id + '"[^>]*aria-pressed="true"').test(a.html())).map(o => o.id).join('');
// Gleichstand: Kraft geht vor. s4 d (Kraft 4) und s2 e (Kraft 2) gegen Zuhören 2 × 3 = 6
const gleich = teil1({ s4: ['d'], s2: ['e'], s6: ['b'], s8: ['c'], s5: ['d'] }).html();
ok(gleich.indexOf('<h2>Erst einmal Kraft tanken</h2>') >= 0, 'Teil 1: Bei Gleichstand geht „Kraft tanken“ nicht vor');
ok(gleich.indexOf('0800 111 0 111') >= 0, 'Teil 1: „Kraft tanken“ nennt keine Hilfe');
// Starke Belastung, aber eine andere Stärke vorn: Hinweis auf Selbstschutz statt „Auch stark: Kraft tanken“
const belastet = teil1({ s4: ['d'] }).html();
ok(belastet.indexOf('<h2>Zuhören und verstehen</h2>') >= 0, 'Teil 1: s4 d und sonst a ergibt nicht „Zuhören und verstehen“');
ok(belastet.indexOf('Achte auch auf dich') >= 0 && belastet.indexOf('data-go="schutz"') >= 0 && belastet.indexOf('Auch stark: Erst einmal Kraft tanken') < 0, 'Teil 1: Bei starker Belastung fehlt der Hinweis auf Selbstschutz');
// Mehrfachantworten: nochmal antippen nimmt die Antwort zurück; bei s4 (Belastung, eine Skala) gilt nur eine Antwort
const m = starteApp(); m.route('selbsttest'); m.click({ act: 'st-teil', teil: 'staerken' });
m.click({ act: 'st-wahl', f: 's1', o: 'a' }); m.click({ act: 'st-wahl', f: 's1', o: 'c' });
ok(gedrueckt(m, 's1') === 'ac', 'Teil 1: Zwei Antworten bei einer Frage sind nicht beide gewählt: ' + gedrueckt(m, 's1'));
m.click({ act: 'st-wahl', f: 's1', o: 'a' });
ok(gedrueckt(m, 's1') === 'c', 'Teil 1: Nochmal antippen nimmt die Antwort nicht zurück: ' + gedrueckt(m, 's1'));
m.click({ act: 'st-wahl', f: 's4', o: 'a' }); m.click({ act: 'st-wahl', f: 's4', o: 'c' });
ok(gedrueckt(m, 's4') === 'c', 'Teil 1: Bei der Belastungsfrage sind zwei Antworten gleichzeitig gewählt: ' + gedrueckt(m, 's4'));
m.click({ act: 'st-wahl', f: 's1', o: 'c' }); fragen.filter(f => f.id !== 's1').forEach(f => m.click({ act: 'st-wahl', f: f.id, o: 'b' })); m.click({ act: 'st-auswerten' });
ok(m.html().indexOf('Deine Stärke</div>') < 0, 'Teil 1: Frage ohne Antwort (alles abgewählt) wird trotzdem ausgewertet');
// Mehrfachantworten zählen geteilt: Jede Frage hat dasselbe Gewicht, egal wie viele Antworten man wählt.
// s2, s3 a (Zuhören 2 + 2), s4 a (Zuhören 1, Fakten 1), s6 a (Zuhören 1, Planen 1), s1, s5, s7, s8 je b bis e (je 0,5 für Fakten, Planen, Brücken, Kraft)
// Geteilt: Zuhören 6, Fakten 3, Planen 3, Brücken 2, Kraft 2. Würde man addieren, lägen Fakten und Planen mit 9 vorn.
const viel = ['b', 'c', 'd', 'e'];
const geteilt = teil1({ s1: viel, s2: ['a'], s3: ['a'], s4: ['a'], s5: viel, s6: ['a'], s7: viel, s8: viel }).html();
ok(geteilt.indexOf('<h2>Zuhören und verstehen</h2>') >= 0, 'Teil 1: Mehrfachantworten werden nicht geteilt gewertet');
ok(geteilt.indexOf('Achte auch auf dich') < 0, 'Teil 1: Hinweis auf Belastung ohne Grund');
// Gespeicherte Antworten aus der Zeit vor den Mehrfachantworten (eine Antwort als Text) gelten weiter
const altSpeicher = {}; fragen.forEach(f => { altSpeicher[f.id] = 'b'; });
mem['umsteigen:selbsttest'] = JSON.stringify({ a: {}, w: {}, s: altSpeicher, staerkeFertig: true });
const alt = starteApp(); alt.route('selbsttest'); alt.click({ act: 'st-teil', teil: 'staerken' });
ok(alt.html().indexOf('<h2>Mit guten Argumenten</h2>') >= 0, 'Teil 1: Alte gespeicherte Antworten werden nicht mehr erkannt');
delete mem['umsteigen:selbsttest'];

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
// Teil 3 Faktencheck: eine Frage nach der anderen, Rückmeldung mit Quelle, danach Punkte von 100
route('selbsttest'); click({ act: 'st-start' });
ok(html().indexOf('data-teil="fakten"') >= 0 && html().indexOf('data-teil="gespraech"') >= 0, 'Übersicht ohne Faktencheck und Gesprächs-Check');
click({ act: 'st-teil', teil: 'fakten' });
ok(html().indexOf('Faktfrage Nummer 1?') >= 0, 'Faktencheck beginnt nicht mit der ersten Frage');
ok(html().indexOf('Fakterklärung 1') < 0, 'Faktencheck verrät die Erklärung vor der Antwort');
click({ act: 'st-quiz', wert: '1' });
ok(app.fokus[app.fokus.length - 1] === '#st-fb' && html().indexOf('id="st-fb"') >= 0, 'Faktencheck: Fokus springt nach der Antwort nicht auf die Rückmeldung (Screenreader)');
ok(/Richtig/.test(html()) && html().indexOf('Fakterklärung 1') >= 0 && html().indexOf('https://example.org/q1') >= 0 && html().indexOf('Amtliche Quelle 1') >= 0, 'Faktencheck: Nach der Antwort fehlen Rückmeldung, Erklärung oder Quelle');
click({ act: 'st-quiz', wert: '0' }); // Eine gegebene Antwort lässt sich nicht nachträglich ändern
click({ act: 'st-quiz-weiter' });
ok(html().indexOf('Faktfrage Nummer 2?') >= 0, 'Faktencheck: Weiter führt nicht zur nächsten Frage');
click({ act: 'st-quiz', wert: '0' });
ok(/Nicht ganz/.test(html()) && /st-richtig[^>]*>(<span class="st-mark">[^<]*<\/span>)?C1</.test(html()) && /st-falsch[^>]*>(<span class="st-mark">[^<]*<\/span>)?A1</.test(html()), 'Faktencheck: Bei falscher Antwort fehlt die richtige oder die eigene Antwort');
click({ act: 'st-quiz-weiter' });
click({ act: 'st-quiz', wert: '0' });
click({ act: 'st-quiz-weiter' });
ok(/67 von 100/.test(html()), 'Faktencheck: 2 von 3 richtig ergibt nicht 67 von 100');
ok(html().indexOf('2 von 3 Fragen richtig') >= 0, 'Faktencheck: Ergebniszeile nicht „2 von 3 Fragen richtig“');
ok(app.fokus[app.fokus.length - 1] === '#st-ergebnis' && html().indexOf('id="st-ergebnis"') >= 0, 'Faktencheck: Fokus geht beim Ergebnis verloren');
ok(html().indexOf('Faktthema 2') >= 0, 'Faktencheck: Ergebnis nennt das Thema der falschen Antwort nicht');
// Teil 4 Gesprächs-Check: Wert 2 öffnet das Gespräch, 0 schließt Türen
click({ act: 'st-teil', teil: 'gespraech' });
ok(html().indexOf('Aussage Nummer 1') >= 0 && html().indexOf('Situation 1') >= 0, 'Gesprächs-Check beginnt nicht mit der ersten Situation');
click({ act: 'st-quiz', wert: '0' });
ok(html().indexOf('Öffnet 1') >= 0, 'Gesprächs-Check: Rückmeldung zur gewählten Antwort fehlt');
click({ act: 'st-quiz-weiter' });
click({ act: 'st-quiz', wert: '2' });
ok(html().indexOf('Schließt 2') >= 0 && /st-richtig[^>]*>(<span class="st-mark">[^<]*<\/span>)?Gut 2</.test(html()), 'Gesprächs-Check: Bei schwacher Antwort fehlt die bessere');
click({ act: 'st-quiz-weiter' });
ok(/50 von 100/.test(html()), 'Gesprächs-Check: Wert 2 und 0 ergeben nicht 50 von 100');
// Noch einmal: Antworten dieses Teils weg, die anderen bleiben
click({ act: 'st-quiz-neu', teil: 'gespraech' });
ok(html().indexOf('Aussage Nummer 1') >= 0 && html().indexOf('Öffnet 1') < 0, 'Gesprächs-Check: Noch einmal beginnt nicht von vorn');
click({ act: 'st-quiz', wert: '0' }); click({ act: 'st-quiz-weiter' }); click({ act: 'st-quiz', wert: '2' }); click({ act: 'st-quiz-weiter' });
// Gesamtauswertung: alle vier Teile auf einer Seite
click({ act: 'st-teil', teil: 'auswertung' });
const gesamt = html();
ok(gesamt.indexOf('Mit guten Argumenten') >= 0, 'Auswertung ohne Stärke aus Teil 1');
ok(gesamt.indexOf('BSW') >= 0 && /88 %/.test(gesamt), 'Auswertung ohne größte Nähe aus Teil 2');
ok(/67 von 100/.test(gesamt) && /50 von 100/.test(gesamt), 'Auswertung ohne Punkte aus Faktencheck und Gesprächs-Check');
ok(gesamt.indexOf('Faktthema 2') >= 0, 'Auswertung ohne Hinweis, was man nachlesen kann');
ok(/keine Wahlempfehlung/i.test(gesamt), 'Auswertung ohne Hinweis „keine Wahlempfehlung“');
ok(gesamt.indexOf('data-act="st-start"') >= 0, 'Auswertung ohne Weg zur Übersicht');
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
app2.click({ act: 'st-teil', teil: 'auswertung' });
ok(/67 von 100/.test(app2.html()) && /50 von 100/.test(app2.html()), 'Nach Neustart fehlen die Punkte aus Faktencheck und Gesprächs-Check');
app2.click({ act: 'st-teil', teil: 'thesen' });
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
app2.click({ act: 'st-teil', teil: 'auswertung' });
ok(!/von 100/.test(app2.html()), 'Nach dem Löschen sind die Punkte noch da');
app2.route('selbsttest'); app2.click({ act: 'st-start' });
// Alles übersprungen: kein Ergebnis, sondern ein Hinweis
app2.click({ act: 'st-teil', teil: 'thesen' });
[1, 2, 3].forEach(() => app2.click({ act: 'st-antwort', wert: 'skip' }));
ok(app2.html().indexOf('data-partei=') < 0 && /übersprungen/.test(app2.html()), 'Alles übersprungen ergibt trotzdem ein Ergebnis');

// Funde der Prüfung vom 13.11.2026
// Gleichstand trotz geteilter Gewichte exakt: Kraft und Fakten liegen gleichauf (je 250 von 60stel-Punkten), Kraft geht vor
const exakt = teil1({ s1: ['a', 'd', 'e'], s2: ['a', 'b'], s3: ['b', 'c', 'd', 'e'], s4: ['c'], s5: ['a', 'b'], s6: ['b', 'c'], s7: ['c', 'e'], s8: ['a', 'b', 'c'] }).html();
ok(exakt.indexOf('<h2>Erst einmal Kraft tanken</h2>') >= 0, 'Teil 1: Rundungsfehler beim Teilen kippt den Gleichstand weg von „Kraft tanken“');
// Antworten, die alle anderen ausschließen („gerade nichts davon“, „mit niemandem“)
const ex = starteApp(); ex.route('selbsttest'); ex.click({ act: 'st-teil', teil: 'staerken' });
ex.click({ act: 'st-wahl', f: 's2', o: 'a' }); ex.click({ act: 'st-wahl', f: 's2', o: 'e' });
ok(gedrueckt(ex, 's2') === 'e', 'Teil 1: „gerade nichts davon“ lässt andere Antworten gewählt: ' + gedrueckt(ex, 's2'));
ex.click({ act: 'st-wahl', f: 's2', o: 'b' });
ok(gedrueckt(ex, 's2') === 'b', 'Teil 1: Neue Antwort wählt „gerade nichts davon“ nicht ab: ' + gedrueckt(ex, 's2'));
ex.click({ act: 'st-wahl', f: 's6', o: 'a' }); ex.click({ act: 'st-wahl', f: 's6', o: 'd' });
ok(gedrueckt(ex, 's6') === 'd', 'Teil 1: „mit niemandem“ lässt andere Antworten gewählt: ' + gedrueckt(ex, 's6'));
// Auswertung bei starker Belastung: zuerst Selbstschutz, kein „gut vorbereitet“, kein Üben
const bel = teil1({ s4: ['d'] });
bel.click({ act: 'st-start' }); bel.click({ act: 'st-teil', teil: 'gespraech' });
[1, 2].forEach(() => { bel.click({ act: 'st-quiz', wert: '2' }); bel.click({ act: 'st-quiz-weiter' }); });
bel.click({ act: 'st-teil', teil: 'auswertung' });
const schritte = (/Deine nächsten Schritte<\/h2>([\s\S]*?)<\/ul>/.exec(bel.html()) || [])[1] || '';
ok(/^<ul[^>]*><li><button class="link" data-go="schutz">/.test(schritte), 'Auswertung: Bei Belastung steht der Selbstschutz nicht an erster Stelle: ' + schritte.slice(0, 120));
ok(schritte.indexOf('data-go="trainer"') < 0 && schritte.indexOf('gut vorbereitet') < 0, 'Auswertung: Belastete werden trotzdem zum Üben geschickt');
ok(bel.html().indexOf('Achte auch auf dich') >= 0, 'Auswertung: Hinweis „Achte auch auf dich“ fehlt bei Belastung');
// Datenschutz-Hinweis hängt davon ab, ob gespeichert wurde
ok(/Speicherst du sie/.test(bel.html()) && !/Niemand außer dir/.test(bel.html()), 'Auswertung: Datenschutz-Hinweis ungespeichert falsch');
// Lösch-Rückfrage bleibt beim Seitenwechsel nicht stehen
bel.click({ act: 'st-loeschen' }); bel.click({ act: 'st-teil', teil: 'gespraech' });
ok(bel.html().indexOf('data-act="st-loeschen-ja"') < 0, 'Lösch-Rückfrage erscheint nach dem Seitenwechsel noch');
bel.click({ act: 'st-loeschen' }); bel.route('start'); bel.route('selbsttest'); bel.click({ act: 'st-teil', teil: 'auswertung' });
ok(bel.html().indexOf('data-act="st-loeschen-ja"') < 0, 'Lösch-Rückfrage erscheint nach dem Verlassen des Selbsttests noch');
// Teil 2 angefangen: kein vorläufiges Ergebnis, sondern „Weitermachen“
const halb = starteApp(); halb.route('selbsttest'); halb.click({ act: 'st-teil', teil: 'thesen' }); halb.click({ act: 'st-antwort', wert: 'zu' }); halb.click({ act: 'st-teil', teil: 'auswertung' });
ok(/Angefangen: 1 von 3 Thesen/.test(halb.html()) && halb.html().indexOf('data-partei=') < 0, 'Auswertung: Halb beantwortete Thesen zeigen schon ein Ergebnis');
// Alles übersprungen: kein „Noch nicht gemacht“
const leer = starteApp(); leer.route('selbsttest'); leer.click({ act: 'st-teil', teil: 'thesen' }); [1, 2, 3].forEach(() => leer.click({ act: 'st-antwort', wert: 'skip' })); leer.click({ act: 'st-teil', teil: 'auswertung' });
ok(/Alle Thesen übersprungen/.test(leer.html()), 'Auswertung: Alle Thesen übersprungen wird als „noch nicht gemacht“ gezeigt');

fails.forEach(f => console.log('FEHLER ' + f));
console.log(fails.length ? fails.length + ' Fehler' : 'OK, Selbsttest rechnet und zeigt richtig');
process.exit(fails.length ? 1 : 0);
