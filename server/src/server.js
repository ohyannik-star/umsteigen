// HTTP-Dienst für „Argument fehlt“: nimmt Anfragen an, lässt im Hintergrund einen Entwurf erstellen und gibt ihn über die Anfragenummer heraus.
// Endpunkte: GET /api/status, POST /api/anfragen, GET /api/anfragen/<id>. Start: node src/server.js
import http from 'node:http';
import { randomUUID } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { ladeConfig } from './config.js';
import { ladeAppDaten } from './appdaten.js';
import { oeffneSpeicher } from './speicher.js';
import { erstelleLimit } from './limits.js';
import { erstelleEntwurfMit } from './claude.js';
import { erstelleMelder } from './melden.js';

const MAX_BODY = 4096;
const ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const FEHLER_ENTWURF = 'Der Entwurf konnte gerade nicht erstellt werden. Bitte später noch einmal senden.';

const sauber = s => String(s || '').replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim();

function koerper(req) {
  return new Promise((resolve, reject) => {
    let groesse = 0; const teile = [];
    // Zu lange Sendungen werden bis zum Ende verworfen, damit die 413-Antwort ankommt; ab 64-facher Größe wird die Verbindung getrennt.
    req.on('data', c => { groesse += c.length; if (groesse <= MAX_BODY) teile.push(c); else if (groesse > 64 * MAX_BODY) req.destroy(); });
    req.on('end', () => groesse > MAX_BODY ? reject(Object.assign(new Error('zu gross'), { code: 413 })) : resolve(Buffer.concat(teile).toString('utf8')));
    req.on('error', reject);
  });
}

export function starteServer({ config, speicher, erstelleEntwurf, melden }) {
  const limit = erstelleLimit({ proStunde: config.limitProStunde, proTag: config.limitProTag, speicher });

  // Anfragen, die bei einem Neustart mitten in der Arbeit waren, gelten als gescheitert.
  for (const a of speicher.alle()) if (a.status === 'in-arbeit') speicher.aendern(a.id, { status: 'fehler', hinweis: FEHLER_ENTWURF });

  async function verarbeiten(anfrage) {
    let ergebnis;
    try { ergebnis = await erstelleEntwurf({ argument: anfrage.argument, kontext: anfrage.kontext }); } catch (e) { console.error('Entwurf gescheitert: ' + e.message); ergebnis = { status: 'fehler', hinweis: FEHLER_ENTWURF }; }
    const fertig = speicher.aendern(anfrage.id, { ...ergebnis, fertig: new Date().toISOString() });
    if (fertig && fertig.status !== 'fehler') await melden(fertig);
  }

  const server = http.createServer(async (req, res) => {
    const origin = req.headers.origin;
    const kopf = { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' };
    if (origin && config.erlaubteOrigins.includes(origin)) Object.assign(kopf, { 'Access-Control-Allow-Origin': origin, Vary: 'Origin', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400' });
    const antwort = (code, daten) => { res.writeHead(code, kopf); res.end(daten === undefined ? '' : JSON.stringify(daten)); };
    const pfad = new URL(req.url, 'http://x').pathname;

    try {
      if (req.method === 'OPTIONS') return antwort(204);
      if (req.method === 'GET' && pfad === '/api/status') return antwort(200, { ok: true });
      if (req.method === 'GET' && pfad.startsWith('/api/anfragen/')) {
        const id = pfad.slice('/api/anfragen/'.length);
        const a = ID.test(id) ? speicher.holen(id) : null;
        if (!a) return antwort(404, { fehler: 'Diese Anfrage gibt es nicht (mehr).' });
        return antwort(200, { id: a.id, status: a.status, hinweis: a.hinweis || '', entwurf: a.entwurf || null });
      }
      if (req.method === 'POST' && pfad === '/api/anfragen') {
        let daten;
        try { daten = JSON.parse(await koerper(req)); } catch (e) { if (e.code === 413) return antwort(413, { fehler: 'Die Anfrage ist zu lang.' }); return antwort(400, { fehler: 'Die Anfrage ist nicht lesbar.' }); }
        const argument = sauber(daten && daten.argument), kontext = sauber(daten && daten.kontext);
        if (argument.length < 8 || argument.length > 300) return antwort(400, { fehler: 'Bitte das Argument in 8 bis 300 Zeichen eingeben.' });
        if (kontext.length > 300) return antwort(400, { fehler: 'Der Kontext darf höchstens 300 Zeichen haben.' });
        const absender = (config.proxyHeader && String(req.headers[config.proxyHeader] || '').split(',')[0].trim()) || req.socket.remoteAddress;
        const grenze = limit.pruefen(absender);
        if (grenze === 'stunde') return antwort(429, { fehler: 'Zu viele Anfragen in dieser Stunde. Bitte später noch einmal.' });
        if (grenze === 'tag') return antwort(503, { fehler: 'Heute sind schon sehr viele Anfragen eingegangen. Bitte morgen noch einmal.' });
        const anfrage = speicher.neu({ id: randomUUID(), argument, kontext, status: 'in-arbeit', erstellt: new Date().toISOString() });
        verarbeiten(anfrage);
        return antwort(202, { id: anfrage.id, status: anfrage.status });
      }
      return antwort(404, { fehler: 'Nicht gefunden.' });
    } catch (e) {
      console.error('Serverfehler: ' + e.message);
      return antwort(500, { fehler: 'Interner Fehler.' });
    }
  });

  return new Promise(resolve => server.listen(config.port, () => resolve(server)));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const config = ladeConfig();
  const speicher = oeffneSpeicher(config.datenDir);
  const appDaten = ladeAppDaten(config.appDatenDir);
  const erstelleEntwurf = erstelleEntwurfMit({ config, appDaten });
  const melden = erstelleMelder(config);
  speicher.aufraeumen(config.aufbewahrungTage);
  setInterval(() => speicher.aufraeumen(config.aufbewahrungTage), 864e5).unref();
  starteServer({ config, speicher, erstelleEntwurf, melden }).then(() => {
    console.log('Umsteigen-Server läuft auf Port ' + config.port + (config.mock ? ' (Testmodus, keine KI)' : ' mit ' + config.modell) + ', erlaubt: ' + config.erlaubteOrigins.join(', '));
  });
}
