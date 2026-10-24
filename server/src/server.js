// HTTP-Dienst für „Argument fehlt“: nimmt Anfragen an, lässt im Hintergrund einen Entwurf erstellen und gibt ihn über die Anfragenummer heraus.
// Endpunkte: GET /api/status, POST /api/anfragen, GET und DELETE /api/anfragen/<id>. Start: node src/server.js
import http from 'node:http';
import { randomUUID } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { ladeConfig } from './config.js';
import { ladeAppDaten } from './appdaten.js';
import { oeffneSpeicher, anfrageHash } from './speicher.js';
import { erstelleLimit } from './limits.js';
import { erstelleEntwurfMit } from './claude.js';
import { erstelleMelder } from './melden.js';

const MAX_BODY = 4096;
const ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const FEHLER_ENTWURF = 'Der Entwurf konnte gerade nicht erstellt werden. Bitte später noch einmal senden.';
const GRENZEN = {
  stunde: [429, 'Zu viele Anfragen in dieser Stunde. Bitte später noch einmal.'],
  'absender-tag': [429, 'Du hast heute schon mehrere Anfragen gesendet. Bitte morgen weiter.'],
  tag: [503, 'Heute sind schon sehr viele Anfragen eingegangen. Bitte morgen noch einmal.'],
  parallel: [503, 'Gerade sind viele Anfragen in Arbeit. Bitte in ein paar Minuten noch einmal.']
};

const sauber = s => String(s || '').replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim();
const log = (text, e) => console.error(text + (e ? ': ' + e.message : ''));

function koerper(req) {
  return new Promise((resolve, reject) => {
    let groesse = 0; const teile = [];
    // Zu lange Sendungen werden bis zum Ende verworfen, damit die 413-Antwort ankommt; ab 64-facher Größe wird die Verbindung getrennt.
    req.on('data', c => { groesse += c.length; if (groesse <= MAX_BODY) teile.push(c); else if (groesse > 64 * MAX_BODY) req.destroy(); });
    req.on('end', () => groesse > MAX_BODY ? reject(Object.assign(new Error('zu gross'), { code: 413 })) : resolve(Buffer.concat(teile).toString('utf8')));
    req.on('error', reject);
  });
}

// Absender für die Limits: mit vorgeschaltetem Proxy der letzte Eintrag im Header (den hängt der Proxy selbst an), sonst die Socket-Adresse.
function absenderVon(req, proxyHeader) {
  const teile = proxyHeader ? String(req.headers[proxyHeader] || '').split(',').map(s => s.trim()).filter(Boolean) : [];
  return teile[teile.length - 1] || req.socket.remoteAddress || '';
}

export function starteServer({ config, speicher, erstelleEntwurf, melden, beantwortet = [] }) {
  // Laufende Entwürfe zählt der Server selbst, unabhängig vom gespeicherten Status (eine gelöschte Anfrage kann noch einen Aufruf in Arbeit haben).
  let laufend = 0;
  const limit = erstelleLimit({ proStunde: config.limitProStunde, proTagProAbsender: config.limitProTagProAbsender ?? config.limitProStunde, proTag: config.limitProTag, maxParallel: config.maxParallel ?? 3, speicher, laufend: () => laufend });

  try {
    // Anfragen, die bei einem Neustart mitten in der Arbeit waren, gelten als gescheitert.
    for (const a of speicher.alle()) if (a.status === 'in-arbeit') speicher.aendern(a.id, { status: 'fehler', hinweis: FEHLER_ENTWURF });
    // Anfragen, deren Hash schon in einem geprüften Eintrag steht, gelten als beantwortet; ihr Inhalt wird gelöscht.
    const erledigt = new Map(beantwortet.map(b => [b.hash, b.argumentId]));
    if (erledigt.size) for (const a of speicher.alle()) { const arg = erledigt.get(anfrageHash(a.id)); if (arg !== undefined) speicher.beantworten(a.id, arg); }
  } catch (e) { log('Abgleich beim Start gescheitert', e); }

  async function verarbeiten(anfrage) {
    let ergebnis;
    laufend++;
    try { ergebnis = await erstelleEntwurf({ argument: anfrage.argument, kontext: anfrage.kontext }); } catch (e) { log('Entwurf gescheitert', e); ergebnis = { status: 'fehler', hinweis: FEHLER_ENTWURF }; } finally { laufend--; }
    // Speichern bis zu dreimal versuchen, falls die Datei kurz gesperrt ist; danach räumt aufraeumen die Anfrage nach einer Stunde als Fehler ab.
    let fertig = null;
    for (let versuch = 0; versuch < 3; versuch++) {
      try { fertig = speicher.fertigstellen(anfrage.id, { ...ergebnis, fertig: new Date().toISOString() }); break; } catch (e) { log('Ergebnis nicht gespeichert', e); await new Promise(r => setTimeout(r, 2000)); }
    }
    if (fertig && fertig.status !== 'fehler') await melden(fertig);
  }

  const server = http.createServer(async (req, res) => {
    const origin = req.headers.origin;
    const kopf = { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' };
    if (origin && config.erlaubteOrigins.includes(origin)) Object.assign(kopf, { 'Access-Control-Allow-Origin': origin, Vary: 'Origin', 'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400' });
    const antwort = (code, daten) => { if (res.headersSent) return; res.writeHead(code, kopf); res.end(daten === undefined ? '' : JSON.stringify(daten)); };

    try {
      const pfad = new URL(req.url, 'http://x').pathname;
      if (req.method === 'OPTIONS') return antwort(204);
      if (req.method === 'GET' && pfad === '/api/status') return antwort(200, { ok: true, testmodus: !!config.mock });
      if ((req.method === 'GET' || req.method === 'DELETE') && pfad.startsWith('/api/anfragen/')) {
        const id = pfad.slice('/api/anfragen/'.length);
        const a = ID.test(id) ? speicher.holen(id) : null;
        if (!a || a.status === 'geloescht') return antwort(404, { fehler: 'Diese Anfrage gibt es nicht (mehr).' });
        // Die Nummer ist das Geheimnis: Wer sie kennt, darf die Anfrage abrufen und löschen.
        if (req.method === 'DELETE') { speicher.tilgen(id); return antwort(204); }
        return antwort(200, { id: a.id, status: a.status, hinweis: a.hinweis || '', entwurf: a.status === 'entwurf' ? a.entwurf || null : null });
      }
      if (req.method === 'POST' && pfad === '/api/anfragen') {
        let daten;
        try { daten = JSON.parse(await koerper(req)); } catch (e) { if (e.code === 413) return antwort(413, { fehler: 'Die Anfrage ist zu lang.' }); return antwort(400, { fehler: 'Die Anfrage ist nicht lesbar.' }); }
        const argument = sauber(daten && daten.argument), kontext = sauber(daten && daten.kontext);
        if (argument.length < 8 || argument.length > 300) return antwort(400, { fehler: 'Bitte das Argument in 8 bis 300 Zeichen eingeben.' });
        if (kontext.length > 300) return antwort(400, { fehler: 'Der Kontext darf höchstens 300 Zeichen haben.' });
        const grenze = limit.pruefen(absenderVon(req, config.proxyHeader));
        if (grenze) return antwort(GRENZEN[grenze][0], { fehler: GRENZEN[grenze][1] });
        const anfrage = speicher.neu({ id: randomUUID(), argument, kontext, status: 'in-arbeit', erstellt: new Date().toISOString() });
        verarbeiten(anfrage).catch(e => log('Verarbeitung gescheitert', e));
        return antwort(202, { id: anfrage.id, status: anfrage.status });
      }
      return antwort(404, { fehler: 'Nicht gefunden.' });
    } catch (e) {
      log('Serverfehler', e);
      if (e instanceof TypeError && e.code === 'ERR_INVALID_URL') return antwort(400, { fehler: 'Ungültige Adresse.' });
      return antwort(500, { fehler: 'Interner Fehler.' });
    }
  });

  return new Promise(resolve => server.listen(config.port, () => resolve(server)));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  // Letzte Absicherung: Ein unerwarteter Fehler in einer Hintergrundaufgabe soll den Dienst nicht beenden.
  process.on('unhandledRejection', e => log('Unbehandelter Fehler', e instanceof Error ? e : new Error(String(e))));
  const config = ladeConfig();
  const speicher = oeffneSpeicher(config.datenDir);
  const appDaten = ladeAppDaten(config.appDatenDir);
  const erstelleEntwurf = erstelleEntwurfMit({ config, appDaten });
  const melden = erstelleMelder(config);
  const aufraeumen = () => { try { speicher.aufraeumen(config.aufbewahrungTage, config.maxOffenTage); } catch (e) { log('Aufräumen gescheitert', e); } };
  aufraeumen();
  setInterval(aufraeumen, 864e5).unref();
  starteServer({ config, speicher, erstelleEntwurf, melden, beantwortet: appDaten.beantwortet }).then(() => {
    console.log('Umsteigen-Server läuft auf Port ' + config.port + (config.mock ? ' im TESTMODUS (keine KI)' : ' mit ' + config.modell) + '. Erlaubt: ' + config.erlaubteOrigins.join(', ') +
      '. Limits: ' + config.limitProStunde + ' pro Stunde und ' + config.limitProTagProAbsender + ' pro Tag je Absender, ' + config.limitProTag + ' pro Tag gesamt' + (config.limitProTag === 0 ? ' (pausiert)' : '') + ', höchstens ' + config.maxParallel + ' gleichzeitig.');
  });
}
