// Form eines KI-Entwurfs. Sie entspricht einem Playbook-Eintrag aus app/data/argumente.js, ohne Fakten: Belegte Fakten kommen erst mit der geprüften Fassung.
import * as z from 'zod/v4';

export const PHASEN = ['Anerkennen', 'Nachfragen', 'Erlebnis', 'Zweifel', 'Überleitung'];
const MAX_TEXT = 600;

export function entwurfSchema({ kategorien, techniken }) {
  return z.object({
    geeignet: z.boolean(),
    hinweis: z.string(),
    aehnlich: z.string(),
    kategorie: z.enum(kategorien.map(k => k.id)),
    titel: z.string(),
    varianten: z.array(z.string()),
    dahinter: z.string(),
    tonalitaet: z.string(),
    nogo: z.array(z.string()),
    schritte: z.array(z.object({ phase: z.enum(PHASEN), sagen: z.array(z.string()) })),
    wenn_dann: z.array(z.object({ wenn: z.string(), dann: z.string() })),
    fallstricke: z.array(z.string()),
    techniken: z.array(z.enum(techniken.map(t => t.id))),
    recherche: z.array(z.string())
  });
}

// Das SDK 1.3.0 schreibt Aufzählungen nur in die Beschreibung. Die API unterstützt enum, darum kommen die erlaubten Werte zurück ins Schema.
export function mitAufzaehlungen(format, { kategorien, techniken }) {
  const p = format.schema.properties;
  p.kategorie.enum = kategorien.map(k => k.id);
  p.schritte.items.properties.phase.enum = PHASEN;
  p.techniken.items.enum = techniken.map(t => t.id);
  return format;
}

// Prüft die Regeln, die das Schema nicht ausdrücken kann. Gibt eine Liste von Problemen zurück, leer heißt in Ordnung.
export function pruefeEntwurf(e) {
  const p = [];
  const leer = s => !String(s).trim();
  if (leer(e.titel) || leer(e.dahinter) || leer(e.tonalitaet)) p.push('Titel, Dahinter oder Tonalität fehlt');
  if (e.schritte.map(s => s.phase).join('|') !== PHASEN.join('|')) p.push('Schritte nicht genau die fünf Phasen in Reihenfolge');
  if (e.schritte.some(s => s.sagen.length < 2 || s.sagen.length > 6)) p.push('Eine Phase hat nicht 2 bis 6 Sätze');
  if (e.nogo.length < 3 || e.nogo.length > 8) p.push('Nicht 3 bis 8 No-gos');
  if (e.wenn_dann.length < 3 || e.wenn_dann.length > 6) p.push('Nicht 3 bis 6 Wenn-dann-Regeln');
  if (e.varianten.length > 6 || e.fallstricke.length > 6 || e.recherche.length > 8) p.push('Zu viele Varianten, Fallstricke oder Recherchepunkte');
  if (e.techniken.length < 1 || e.techniken.length > 3 || new Set(e.techniken).size !== e.techniken.length) p.push('Nicht 1 bis 3 verschiedene Techniken');
  const texte = [e.titel, e.dahinter, e.tonalitaet, ...e.varianten, ...e.nogo, ...e.fallstricke, ...e.recherche, ...e.schritte.flatMap(s => s.sagen), ...e.wenn_dann.flatMap(w => [w.wenn, w.dann])];
  if (texte.some(leer)) p.push('Leerer Text');
  if (texte.some(s => s.length > MAX_TEXT)) p.push('Text länger als ' + MAX_TEXT + ' Zeichen');
  return p;
}

// Ersetzt gerade Anführungszeichen durch deutsche, wie es die App-Inhalte verlangen. Ein gerades Zeichen öffnet, wenn danach Text folgt
// und davor kein Buchstabe, keine Ziffer und kein Satzzeichen steht; sonst schließt es das innerste offene Zitat. Zitate im Zitat werden zu ‚…‘.
// innen: der Text steht selbst schon in Anführungszeichen (die App setzt sie um jeden Satz der fünf Schritte).
function anfuehrung(s, innen) {
  const offen = innen ? ['„'] : [];
  let aus = '';
  for (let i = 0; i < s.length; i++) {
    const c = s[i], vor = i ? s[i - 1] : ' ', nach = s[i + 1] || ' ';
    if (c === '„' || c === '‚') { const z = innen && c === '„' ? '‚' : c; offen.push(z); aus += z; continue; }
    if ((c === '“' || c === '”') && offen[offen.length - 1] === '„') { offen.pop(); aus += '“'; continue; }
    if ((c === '“' || c === '‘') && offen[offen.length - 1] === '‚') { offen.pop(); aus += '‘'; continue; }
    if (c !== '"') { aus += c; continue; }
    if (!/\s/.test(nach) && !/[\p{L}\p{N}.,;!?)\]}…‘“]/u.test(vor)) { const z = offen.length ? '‚' : '„'; offen.push(z); aus += z; }
    else aus += offen.length && offen.pop() === '‚' ? '‘' : '“';
  }
  return aus;
}
export function typografie(wert, innen) {
  if (typeof wert === 'string') return /["”]|„/.test(wert) ? anfuehrung(wert, innen) : wert;
  if (Array.isArray(wert)) return wert.map(w => typografie(w, innen));
  if (wert && typeof wert === 'object') return Object.fromEntries(Object.entries(wert).map(([k, v]) => [k, typografie(v, innen)]));
  return wert;
}

// Sätze der fünf Schritte: ein äußeres Anführungspaar entfernen (die App setzt eigene), innere Zitate werden zu ‚…‘.
export function satzTypografie(s) {
  const t = String(s).trim().replace(/^["„](.*)["“”]$/s, '$1');
  return typografie(t, true);
}
