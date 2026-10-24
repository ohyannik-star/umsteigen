// Speichert Anfragen als JSON-Datei. Änderungen laufen unter einer Sperrdatei und werden atomar geschrieben, damit Server und admin.js sich nicht überschreiben.
// Lesen nutzt einen Zwischenspeicher, der sich erneuert, sobald sich die Datei ändert.
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';

const TAG = 864e5;
const warten = ms => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);

// Öffentlich (in app/data/argumente.js) steht nur dieser Hash, nie die Nummer selbst, denn die Nummer erlaubt Abrufen und Löschen.
export const anfrageHash = id => createHash('sha256').update(String(id)).digest('hex');

// Lebt der Prozess, der die Sperre hält? Server und admin.js laufen im selben Container und sehen dieselben Prozessnummern.
function lebt(pid) { if (!pid) return false; try { process.kill(pid, 0); return true; } catch (e) { return e.code === 'EPERM'; } }

export function oeffneSpeicher(dir) {
  fs.mkdirSync(dir, { recursive: true });
  const datei = path.join(dir, 'anfragen.json'), sperre = datei + '.lock';
  // Reste abgebrochener Schreibvorgänge enthalten alle Anfragen und werden beim Öffnen entfernt.
  for (const f of fs.readdirSync(dir)) if (/^anfragen\.json\..*\.tmp$/.test(f)) { try { fs.unlinkSync(path.join(dir, f)); } catch (e) {} }
  let cache = null, cacheStempel = '';
  const stempel = () => { try { const s = fs.statSync(datei); return s.mtimeMs + ':' + s.size; } catch (e) { if (e.code === 'ENOENT') return ''; throw e; } };
  const frisch = () => { try { return JSON.parse(fs.readFileSync(datei, 'utf8')); } catch (e) { if (e.code === 'ENOENT') return []; throw e; } };
  const lesen = () => { const s = stempel(); if (!s) return []; if (cache && s === cacheStempel) return cache; cache = frisch(); cacheStempel = s; return cache; };
  const schreiben = liste => {
    const tmp = datei + '.' + process.pid + '.' + Date.now() + '.tmp';
    try { fs.writeFileSync(tmp, JSON.stringify(liste, null, 2), { mode: 0o600 }); fs.renameSync(tmp, datei); } catch (e) { try { fs.unlinkSync(tmp); } catch (e2) {} throw e; }
    cache = liste; cacheStempel = stempel();
  };
  // Führt eine Änderung exklusiv aus. Eine Sperre gilt als verwaist, wenn ihr Prozess nicht mehr lebt oder sie älter als 10 Sekunden ist.
  const exklusiv = fn => {
    let fd = null;
    for (let i = 0; i < 200 && fd === null; i++) {
      try { fd = fs.openSync(sperre, 'wx'); fs.writeSync(fd, String(process.pid)); } catch (e) {
        if (e.code !== 'EEXIST') throw e;
        try { const pid = Number(fs.readFileSync(sperre, 'utf8')); if (!lebt(pid) || Date.now() - fs.statSync(sperre).mtimeMs > 10000) fs.unlinkSync(sperre); } catch (e2) {}
        warten(10);
      }
    }
    if (fd === null) throw new Error('Speicher ist gesperrt');
    try { const liste = frisch(), ergebnis = fn(liste); if (ergebnis !== false) schreiben(liste); return ergebnis; } finally { fs.closeSync(fd); try { fs.unlinkSync(sperre); } catch (e) {} }
  };
  const aendern = (id, patch, nurStatus) => exklusiv(l => { const a = l.find(x => x.id === id); if (!a || (nurStatus && a.status !== nurStatus)) return false; Object.assign(a, patch); return a; }) || null;
  return {
    alle: lesen,
    holen: id => lesen().find(a => a.id === id) || null,
    neu: a => exklusiv(l => { l.push(a); return a; }),
    aendern,
    // Ergebnis eines Entwurfs nur übernehmen, wenn die Anfrage noch läuft, also nicht inzwischen gelöscht oder beantwortet ist.
    fertigstellen: (id, patch) => aendern(id, patch, 'in-arbeit'),
    // Endgültig entfernen (Verwaltung).
    loeschen: id => exklusiv(l => { const i = l.findIndex(a => a.id === id); if (i < 0) return false; l.splice(i, 1); return true; }) === true,
    // Löschen durch Nutzer:innen: Inhalt weg, ein leerer Platzhalter bleibt einen Tag, damit Löschen das Tageslimit nicht wieder freigibt.
    tilgen: id => aendern(id, { status: 'geloescht', argument: '', kontext: '', entwurf: null, hinweis: '', geloescht: new Date().toISOString() }),
    // Eine beantwortete Anfrage braucht ihren Inhalt nicht mehr; übrig bleiben Nummer, Status und Datum bis zum Aufräumen.
    beantworten: (id, argumentId) => exklusiv(l => { const a = l.find(x => x.id === id); if (!a || a.status === 'geloescht' || a.status === 'beantwortet') return false; Object.assign(a, { status: 'beantwortet', beantwortet: new Date().toISOString(), argumentId: argumentId || '', argument: '', kontext: '', entwurf: null, hinweis: '' }); return a; }) || null,
    // Löscht erledigte Anfragen nach der Aufbewahrungsfrist, offene Entwürfe nach der Höchstdauer und Platzhalter nach einem Tag.
    // Anfragen, die seit über einer Stunde „in Arbeit“ sind, hat niemand mehr in der Hand; sie werden zu „fehler“.
    aufraeumen: (tage, maxOffenTage, jetzt = Date.now()) => exklusiv(l => {
      const vorher = l.length;
      let geaendert = false;
      for (const a of l) if (a.status === 'in-arbeit' && jetzt - Date.parse(a.erstellt) > 36e5) { a.status = 'fehler'; a.hinweis = 'Der Entwurf konnte nicht erstellt werden. Bitte noch einmal senden.'; a.fertig = new Date(jetzt).toISOString(); geaendert = true; }
      const rest = l.filter(a => {
        if (a.status === 'in-arbeit') return true;
        if (a.status === 'geloescht') return jetzt - Date.parse(a.erstellt) < TAG;
        if (a.status === 'entwurf') return jetzt - Date.parse(a.erstellt) < maxOffenTage * TAG;
        return jetzt - Date.parse(a.beantwortet || a.fertig || a.erstellt) < tage * TAG;
      });
      if (rest.length === vorher && !geaendert) return false;
      l.splice(0, l.length, ...rest);
      return vorher - rest.length;
    }) || 0
  };
}
