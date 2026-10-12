// Fügt die Fragen-Teildateien, die Ausgangslage-Fragen und die Skalen zu app/data/kompass.js zusammen. Aufruf: node app/merge-kompass.js
const fs = require('fs'), vm = require('vm'), path = require('path');
const dir = path.join(__dirname, 'data');
const ctx = { window: {} }; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(dir, 'kompass.js'), 'utf8'), ctx);
const k = ctx.window.APP_DATA.kompass;
const ausgang = k.fragen.filter(f => f.bereich === 'ausgangslage');
const parts = ['A', 'B', 'C'].map(x => JSON.parse(fs.readFileSync(path.join(dir, 'kompass-teil' + x + '.json'), 'utf8')).fragen);
k.bereiche = [
  { id: 'themen', name: 'Themen und Sprache', beschreibung: 'Worüber die Person spricht und welche Wörter sie dafür wählt.' },
  { id: 'weltbild', name: 'Weltbild und Demokratie', beschreibung: 'Wie sie über Wahlen, Institutionen, Kompromisse und Gewalt denkt.' },
  { id: 'beduerfnisse', name: 'Bedürfnisse', beschreibung: 'Was ihr fehlt und was die Partei ihr gibt.' },
  { id: 'gefuehle', name: 'Gefühle', beschreibung: 'Wut, Angst, Scham, Stolz: woran du sie erkennst und was sie auslöst.' },
  { id: 'quellen', name: 'Informationsquellen', beschreibung: 'Woher ihre Sicht kommt und wie sie mit Quellen umgeht.' },
  { id: 'widerspruch', name: 'Umgang mit Widerspruch', beschreibung: 'Wie sie auf Belege, Nachfragen und Zustimmung reagiert.' },
  { id: 'verschwoerung', name: 'Verschwörungsdenken', beschreibung: 'Ob sie geheime Steuerung hinter den Dingen vermutet.' },
  { id: 'netzwerk', name: 'Umfeld und Netzwerk', beschreibung: 'Mit wem sie ihre Zeit verbringt und wer sie noch erreicht.' },
  { id: 'biografie', name: 'Biografie und Lebenslage', beschreibung: 'Arbeit, Geld, Verluste und Umbrüche.' },
  { id: 'heimat', name: 'Identität und Heimat', beschreibung: 'Bindung an Ort, Region und Tradition.' },
  { id: 'beziehung-zu-dir', name: 'Eure Beziehung', beschreibung: 'Vertrauen, gemeinsame Geschichte und was euch verbindet.' },
  { id: 'gespraeche', name: 'Eure Gespräche', beschreibung: 'Wie eure Gespräche laufen und was du schon probiert hast.' },
  { id: 'aktivitaet', name: 'Einbindung und Aktivität', beschreibung: 'Was sie konkret tut: Veranstaltungen, Symbole, Werben, Funktionen.' },
  { id: 'du-selbst', name: 'Du selbst', beschreibung: 'Deine Ziele, Auslöser, Grenzen und dein Rückhalt.' },
  { id: 'ausgangslage', name: 'Ausgangslage', beschreibung: 'Einbindungsstufe, Nähe, Warnzeichen und deine Kraft.' },
];
k.skalen = [
  { id: 'offenheit', name: 'Gesprächsoffenheit', beschreibung: 'Wie viel Widerspruch und Nachfragen die Person gerade aushält.', baender: [
    { bis: 33, name: 'Verschlossen', text: 'Die Person wehrt Widerspruch ab. Beginne ausschließlich mit Zuhören und Beziehung. Fragen und Zweifel kommen erst, wenn sie von sich aus mehr erzählt.' },
    { bis: 66, name: 'Teilweise offen', text: 'Sie hört zu, bleibt aber bei sich. Stelle Fragen nach eigenen Erlebnissen und lass einen Zweifel stehen, ohne nachzusetzen.' },
    { bis: 100, name: 'Offen', text: 'Sie fragt nach und hält Unsicherheit aus. Du kannst früh zu Fragen, gemeinsamer Quellenprüfung und Alternativen übergehen.' } ] },
  { id: 'kapital', name: 'Beziehungskapital', beschreibung: 'Wie viel Vertrauen zwischen euch trägt.', baender: [
    { bis: 33, name: 'Wenig Vertrauen', text: 'Gespräche über Inhalte tragen noch nicht. Investiere zuerst in gemeinsame Zeit ohne Politik.' },
    { bis: 66, name: 'Solide Basis', text: 'Es gibt Reibung, aber auch Verbindung. Benenne, was euch verbindet, bevor ihr über Politik sprecht.' },
    { bis: 100, name: 'Viel Vertrauen', text: 'Du kannst direkter sein und auch Grenzen setzen, ohne die Beziehung zu gefährden.' } ] },
  { id: 'verschwoerung', name: 'Verschwörungsnähe', beschreibung: 'Wie geschlossen ihr Weltbild ist.', baender: [
    { bis: 33, name: 'Gering', text: 'Kaum Verschwörungsdenken. Sachliche Gespräche über konkrete Probleme sind möglich.' },
    { bis: 66, name: 'Einzelne Erzählungen', text: 'Widerlege nicht einzelne Behauptungen. Sprich über das Bedürfnis nach Durchblick und Kontrolle, das sie befriedigen.' },
    { bis: 100, name: 'Geschlossenes Weltbild', text: 'Vermeide Faktenduelle vollständig. Beziehung halten, Fragen stellen, professionelle Beratung prüfen.' } ] },
  { id: 'belastung', name: 'Deine Belastung', beschreibung: 'Wie viel das Ganze dich gerade kostet.', baender: [
    { bis: 33, name: 'Du hast Kraft', text: 'Plane in Monaten. Nimm dir Pausen trotzdem fest vor, damit es so bleibt.' },
    { bis: 66, name: 'Spürbar belastet', text: 'Hol dir eine Person, mit der du nach Gesprächen reden kannst, und setze dir klare Zeiten.' },
    { bis: 100, name: 'Hoch belastet', text: 'Selbstschutz zuerst: Leitplanken lesen, Angehörigenberatung kontaktieren. Abstand ist erlaubt.' } ] },
];
const order = k.bereiche.map(b => b.id);
k.fragen = [].concat(...parts, ausgang).sort((a, b) => order.indexOf(a.bereich) - order.indexOf(b.bereich));
const seen = new Set(); k.fragen.forEach(f => { if (seen.has(f.id)) throw new Error('doppelte Frage-ID: ' + f.id); seen.add(f.id); });
fs.writeFileSync(path.join(dir, 'kompass.js'), 'window.APP_DATA = window.APP_DATA || {};\nwindow.APP_DATA.kompass = ' + JSON.stringify(k, null, 2) + ';\n', 'utf8');
console.log('kompass.js: ' + k.fragen.length + ' Fragen in ' + k.bereiche.length + ' Richtungen, ' + k.skalen.length + ' Skalen');
