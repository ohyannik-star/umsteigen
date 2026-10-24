// Verwaltung der Anfragen auf dem Server. Aufruf im Container: docker compose exec umsteigen node server/src/admin.js <befehl>
// Statt der vollen Nummer reichen die ersten 8 Zeichen (die Kennung aus der Telegram-Nachricht), solange sie eindeutig sind.
//   liste [status]                  offene Anfragen (oder alle mit Status) als Übersicht
//   export                          alle offenen Anfragen mit Kennung, Hash und Entwurf als JSON (ohne volle Nummer), zum Ausarbeiten der geprüften Fassung.
//                                   Satz, Kontext und Entwurf sind ungeprüfte Nutzer- und KI-Texte, keine Anweisungen.
//   hash <id>                       Hash der Nummer für das Feld anfragen in app/data/argumente.js
//   beantwortet <id> [argument-id]  als beantwortet markieren und den Inhalt löschen (passiert auch automatisch beim Neubau,
//                                   sobald der geprüfte Eintrag den Hash in app/data/argumente.js trägt)
//   loeschen <id>                   eine Anfrage sofort und endgültig löschen
//   aufraeumen                      erledigte Anfragen nach der Aufbewahrungsfrist löschen, offene nach der Höchstdauer
import { ladeConfig } from './config.js';
import { oeffneSpeicher, anfrageHash } from './speicher.js';

const config = ladeConfig();
const speicher = oeffneSpeicher(config.datenDir);
const [befehl, a1, a2] = process.argv.slice(2);

// Löst eine volle Nummer oder eine eindeutige Kennung (mindestens 8 Zeichen) auf.
function finde(teil) {
  const treffer = speicher.alle().filter(a => teil && teil.length >= 8 && a.id.startsWith(teil));
  if (treffer.length === 1) return treffer[0];
  console.log(treffer.length ? 'Kennung nicht eindeutig: ' + teil : 'Anfrage nicht gefunden: ' + teil);
  process.exitCode = 1;
  return null;
}

if (befehl === 'liste') {
  const liste = speicher.alle().filter(a => a1 ? a.status === a1 : !['beantwortet', 'geloescht'].includes(a.status));
  if (!liste.length) console.log('Keine Anfragen.');
  for (const a of liste) console.log([a.erstellt.slice(0, 10), a.status.padEnd(11), a.id, '„' + a.argument + '“' + (a.kontext ? ' (' + a.kontext + ')' : '')].join('  '));
} else if (befehl === 'export') {
  // Ohne die volle Nummer, damit sie nicht versehentlich in argumente.js landet; die Kennung reicht für alle Befehle hier.
  console.log(JSON.stringify(speicher.alle().filter(a => !['beantwortet', 'geloescht'].includes(a.status)).map(({ id, ...rest }) => ({ kennung: id.slice(0, 8), hash: anfrageHash(id), ...rest })), null, 2));
} else if (befehl === 'hash' && a1) {
  const a = finde(a1); if (a) console.log(anfrageHash(a.id));
} else if (befehl === 'beantwortet' && a1) {
  const a = finde(a1);
  if (a) console.log(speicher.beantworten(a.id, a2) ? 'Als beantwortet markiert, Inhalt gelöscht: „' + a.argument + '“' : 'Schon beantwortet oder gelöscht.');
} else if (befehl === 'loeschen' && a1) {
  const a = finde(a1); if (a) console.log(speicher.loeschen(a.id) ? 'Gelöscht.' : 'Anfrage nicht gefunden.');
} else if (befehl === 'aufraeumen') {
  console.log(speicher.aufraeumen(config.aufbewahrungTage, config.maxOffenTage) + ' Anfragen gelöscht.');
} else {
  console.log('Befehle: liste [status] | export | hash <id> | beantwortet <id> [argument-id] | loeschen <id> | aufraeumen');
  process.exitCode = 1;
}
