// Speichert Anfragen als JSON-Datei. Jede Operation liest die Datei neu und schreibt sie atomar, damit Server und admin.js sich nicht überschreiben.
import fs from 'node:fs';
import path from 'node:path';

const TAG = 864e5;

export function oeffneSpeicher(dir) {
  fs.mkdirSync(dir, { recursive: true });
  const datei = path.join(dir, 'anfragen.json');
  const lesen = () => { try { return JSON.parse(fs.readFileSync(datei, 'utf8')); } catch (e) { if (e.code === 'ENOENT') return []; throw e; } };
  const schreiben = liste => { const tmp = datei + '.tmp'; fs.writeFileSync(tmp, JSON.stringify(liste, null, 2)); fs.renameSync(tmp, datei); };
  return {
    alle: lesen,
    holen: id => lesen().find(a => a.id === id) || null,
    neu: a => { const l = lesen(); l.push(a); schreiben(l); return a; },
    aendern: (id, patch) => { const l = lesen(), a = l.find(x => x.id === id); if (!a) return null; Object.assign(a, patch); schreiben(l); return a; },
    loeschen: id => { const l = lesen(), rest = l.filter(a => a.id !== id); schreiben(rest); return rest.length !== l.length; },
    // Entfernt beantwortete und gescheiterte Anfragen nach der Aufbewahrungsfrist; offene Entwürfe bleiben, bis sie beantwortet sind.
    aufraeumen: (tage, jetzt = Date.now()) => {
      const l = lesen();
      const rest = l.filter(a => {
        if (a.status === 'entwurf' || a.status === 'in-arbeit') return true;
        const seit = Date.parse(a.beantwortet || a.fertig || a.erstellt);
        return jetzt - seit < tage * TAG;
      });
      if (rest.length !== l.length) schreiben(rest);
      return l.length - rest.length;
    }
  };
}
