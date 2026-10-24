// Verwaltung der Anfragen auf dem Server. Aufruf im Container: docker compose exec umsteigen node server/src/admin.js <befehl>
//   liste [status]                  offene Anfragen (oder alle mit Status) als Übersicht
//   export                          alle Anfragen mit Entwurf als JSON, zum Ausarbeiten der geprüften Fassung
//   beantwortet <id> [argument-id]  als beantwortet markieren, nachdem der geprüfte Eintrag live ist
//   loeschen <id>                   eine Anfrage sofort löschen
//   aufraeumen                      erledigte Anfragen nach der Aufbewahrungsfrist löschen
import { ladeConfig } from './config.js';
import { oeffneSpeicher } from './speicher.js';

const config = ladeConfig();
const speicher = oeffneSpeicher(config.datenDir);
const [befehl, a1, a2] = process.argv.slice(2);

if (befehl === 'liste') {
  const liste = speicher.alle().filter(a => a1 ? a.status === a1 : a.status !== 'beantwortet');
  if (!liste.length) console.log('Keine Anfragen.');
  for (const a of liste) console.log([a.erstellt.slice(0, 10), a.status.padEnd(11), a.id, '„' + a.argument + '“' + (a.kontext ? ' (' + a.kontext + ')' : '')].join('  '));
} else if (befehl === 'export') {
  console.log(JSON.stringify(speicher.alle().filter(a => a.status !== 'beantwortet'), null, 2));
} else if (befehl === 'beantwortet' && a1) {
  const a = speicher.aendern(a1, { status: 'beantwortet', beantwortet: new Date().toISOString(), argumentId: a2 || '' });
  console.log(a ? 'Als beantwortet markiert: „' + a.argument + '“' : 'Anfrage nicht gefunden: ' + a1);
} else if (befehl === 'loeschen' && a1) {
  console.log(speicher.loeschen(a1) ? 'Gelöscht.' : 'Anfrage nicht gefunden: ' + a1);
} else if (befehl === 'aufraeumen') {
  console.log(speicher.aufraeumen(config.aufbewahrungTage) + ' Anfragen gelöscht.');
} else {
  console.log('Befehle: liste [status] | export | beantwortet <id> [argument-id] | loeschen <id> | aufraeumen');
  process.exitCode = 1;
}
