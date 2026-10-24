// Begrenzt Anfragen pro Absender und Stunde (nur im Arbeitsspeicher, nichts wird gespeichert) und für alle zusammen pro Tag.
const STUNDE = 36e5, TAG = 864e5;

export function erstelleLimit({ proStunde, proTag, speicher, jetzt = () => Date.now() }) {
  const treffer = new Map();
  return {
    // Gibt null zurück, wenn die Anfrage erlaubt ist, sonst 'stunde' oder 'tag'.
    pruefen(absender) {
      const t = jetzt();
      for (const [k, v] of treffer) { const frisch = v.filter(x => t - x < STUNDE); if (frisch.length) treffer.set(k, frisch); else treffer.delete(k); }
      const meine = treffer.get(absender) || [];
      if (meine.length >= proStunde) return 'stunde';
      if (speicher.alle().filter(a => t - Date.parse(a.erstellt) < TAG).length >= proTag) return 'tag';
      treffer.set(absender, meine.concat(t));
      return null;
    }
  };
}
