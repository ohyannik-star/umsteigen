// Form eines KI-Entwurfs. Sie entspricht einem Playbook-Eintrag aus app/data/argumente.js, ohne Fakten: Belegte Fakten kommen erst mit der geprüften Fassung.
import * as z from 'zod/v4';

export const PHASEN = ['Anerkennen', 'Nachfragen', 'Erlebnis', 'Zweifel', 'Überleitung'];

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

// Prüft die Regeln, die das Schema nicht ausdrücken kann. Gibt eine Liste von Problemen zurück, leer heißt in Ordnung.
export function pruefeEntwurf(e) {
  const p = [];
  if (!e.titel.trim() || !e.dahinter.trim() || !e.tonalitaet.trim()) p.push('Titel, Dahinter oder Tonalität fehlt');
  if (e.schritte.map(s => s.phase).join('|') !== PHASEN.join('|')) p.push('Schritte nicht genau die fünf Phasen in Reihenfolge');
  if (e.schritte.some(s => s.sagen.length < 2)) p.push('Eine Phase hat weniger als zwei Sätze');
  if (e.nogo.length < 3) p.push('Weniger als drei No-gos');
  if (e.wenn_dann.length < 3) p.push('Weniger als drei Wenn-dann-Regeln');
  if (e.techniken.length < 1) p.push('Keine Technik');
  return p;
}

// Ersetzt gerade Anführungszeichen paarweise durch deutsche, wie es die App-Inhalte verlangen.
export function typografie(wert) {
  if (typeof wert === 'string') return wert.replace(/"([^"]*)"/g, '„$1“').replace(/"/g, '“');
  if (Array.isArray(wert)) return wert.map(typografie);
  if (wert && typeof wert === 'object') return Object.fromEntries(Object.entries(wert).map(([k, v]) => [k, typografie(v)]));
  return wert;
}
