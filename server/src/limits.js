// Begrenzt Anfragen pro Absender (Tag und Stunde, nur im Arbeitsspeicher, nichts wird gespeichert), für alle zusammen pro Tag und gleichzeitig laufende Entwürfe.
// Das Gesamtlimit zählt auch gelöschte Anfragen (Platzhalter), denn ihr Entwurf hat trotzdem Geld gekostet.
const STUNDE = 36e5, TAG = 864e5;

// Ein Absender ist eine IPv4-Adresse oder ein IPv6-/64-Netz, weil ein Anschluss meist ein ganzes /64 bekommt.
export function absenderSchluessel(ip) {
  const a = String(ip || '').trim().toLowerCase().replace(/%.*$/, '');
  const v4 = a.match(/(\d{1,3}(?:\.\d{1,3}){3})$/);
  if (v4 && (!a.includes(':') || a.startsWith('::ffff:'))) return v4[1];
  if (!a.includes(':')) return a;
  const [kopf, rest] = a.split('::');
  const vorne = kopf ? kopf.split(':') : [], hinten = rest ? rest.split(':') : [];
  const voll = rest !== undefined ? vorne.concat(Array(Math.max(0, 8 - vorne.length - hinten.length)).fill('0'), hinten) : vorne;
  return voll.slice(0, 4).map(h => h.replace(/^0+(?=.)/, '')).join(':') + '::/64';
}

export function erstelleLimit({ proStunde, proTagProAbsender, proTag, maxParallel = 3, speicher, laufend = () => speicher.alle().filter(a => a.status === 'in-arbeit').length, jetzt = () => Date.now() }) {
  const treffer = new Map();
  return {
    // Gibt null zurück, wenn die Anfrage erlaubt ist, sonst 'absender-tag', 'stunde', 'tag' oder 'parallel'.
    // Das längere Absender-Limit zuerst, damit die Meldung nicht zu einem Versuch rät, der wieder scheitert.
    pruefen(absender) {
      const t = jetzt(), k = absenderSchluessel(absender);
      for (const [s, v] of treffer) { const frisch = v.filter(x => t - x < TAG); if (frisch.length) treffer.set(s, frisch); else treffer.delete(s); }
      const meine = treffer.get(k) || [];
      if (meine.length >= proTagProAbsender) return 'absender-tag';
      if (meine.filter(x => t - x < STUNDE).length >= proStunde) return 'stunde';
      const alle = speicher.alle();
      if (proTag === 0 || alle.filter(a => t - Date.parse(a.erstellt) < TAG).length >= proTag) return 'tag';
      if (laufend() >= maxParallel) return 'parallel';
      treffer.set(k, meine.concat(t));
      return null;
    }
  };
}
