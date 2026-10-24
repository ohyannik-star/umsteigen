import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { starteServer } from '../src/server.js';
import { oeffneSpeicher, anfrageHash } from '../src/speicher.js';

const ORIGIN = 'https://ohyannik-star.github.io';

async function mitServer(optionen, fn) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'umsteigen-'));
  const speicher = oeffneSpeicher(dir);
  const gemeldet = [];
  const config = { port: 0, erlaubteOrigins: [ORIGIN], proxyHeader: '', limitProStunde: 5, limitProTag: 50, aufbewahrungTage: 90, ...optionen.config };
  const erstelleEntwurf = optionen.entwurf || (async ({ argument }) => ({ status: 'entwurf', entwurf: { titel: argument } }));
  const server = await starteServer({ config, speicher, erstelleEntwurf, melden: async a => { gemeldet.push(a); } });
  const basis = 'http://127.0.0.1:' + server.address().port;
  try { await fn({ basis, speicher, gemeldet }); } finally { await new Promise(r => server.close(r)); fs.rmSync(dir, { recursive: true, force: true }); }
}
const senden = (basis, body, headers = {}) => fetch(basis + '/api/anfragen', { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: ORIGIN, ...headers }, body: typeof body === 'string' ? body : JSON.stringify(body) });
async function warteAufStatus(basis, id) {
  for (let i = 0; i < 50; i++) { const r = await (await fetch(basis + '/api/anfragen/' + id)).json(); if (r.status !== 'in-arbeit') return r; await new Promise(r2 => setTimeout(r2, 20)); }
  throw new Error('Entwurf kam nicht');
}

test('Anfrage wird angenommen, verarbeitet und abrufbar', async () => {
  await mitServer({}, async ({ basis, speicher, gemeldet }) => {
    const res = await senden(basis, { argument: 'Die da oben machen doch, was sie wollen.', kontext: 'Kollege' });
    assert.equal(res.status, 202);
    assert.equal(res.headers.get('access-control-allow-origin'), ORIGIN);
    const { id, status } = await res.json();
    assert.match(id, /^[0-9a-f-]{36}$/);
    assert.equal(status, 'in-arbeit');
    const fertig = await warteAufStatus(basis, id);
    assert.equal(fertig.status, 'entwurf');
    assert.equal(fertig.entwurf.titel, 'Die da oben machen doch, was sie wollen.');
    assert.equal(fertig.kontext, undefined, 'Kontext wird nicht zurückgegeben');
    const gespeichert = speicher.holen(id);
    assert.equal(gespeichert.kontext, 'Kollege');
    assert.equal(gespeichert.ip, undefined, 'keine IP gespeichert');
    assert.equal(gemeldet.length, 1);
  });
});

test('Ungültige Eingaben werden abgelehnt', async () => {
  await mitServer({}, async ({ basis }) => {
    assert.equal((await senden(basis, { argument: 'kurz' })).status, 400);
    assert.equal((await senden(basis, { argument: 'x'.repeat(301) })).status, 400);
    assert.equal((await senden(basis, { argument: 'Ein gültiger Satz hier.', kontext: 'y'.repeat(301) })).status, 400);
    assert.equal((await senden(basis, 'kein json')).status, 400);
    assert.equal((await senden(basis, { argument: 'a'.repeat(5000) })).status, 413);
  });
});

test('Unbekannte und ungültige IDs geben 404', async () => {
  await mitServer({}, async ({ basis }) => {
    assert.equal((await fetch(basis + '/api/anfragen/00000000-0000-4000-8000-000000000000')).status, 404);
    assert.equal((await fetch(basis + '/api/anfragen/../etc')).status, 404);
  });
});

test('CORS nur für erlaubte Herkunft, Preflight antwortet', async () => {
  await mitServer({}, async ({ basis }) => {
    const pre = await fetch(basis + '/api/anfragen', { method: 'OPTIONS', headers: { Origin: ORIGIN, 'Access-Control-Request-Method': 'POST' } });
    assert.equal(pre.status, 204);
    assert.equal(pre.headers.get('access-control-allow-origin'), ORIGIN);
    const fremd = await fetch(basis + '/api/status', { headers: { Origin: 'https://boese.example' } });
    assert.equal(fremd.headers.get('access-control-allow-origin'), null);
    assert.deepEqual(await fremd.json(), { ok: true, testmodus: false });
    assert.match(pre.headers.get('access-control-allow-methods'), /DELETE/);
  });
});

test('Kaputte Anfrage-Adresse beendet den Dienst nicht', async () => {
  await mitServer({}, async ({ basis }) => {
    const net = await import('node:net');
    const port = new URL(basis).port;
    const roh = await new Promise((resolve, reject) => {
      const s = net.connect(port, '127.0.0.1', () => s.write('GET //a:b/x HTTP/1.1\r\nHost: x\r\nConnection: close\r\n\r\n'));
      let d = ''; s.on('data', c => { d += c; }); s.on('end', () => resolve(d)); s.on('error', reject);
    });
    assert.match(roh, /^HTTP\/1\.1 400/);
    assert.equal((await fetch(basis + '/api/status')).status, 200, 'Dienst läuft weiter');
  });
});

test('Löschen über die Nummer entfernt den Inhalt auf dem Server', async () => {
  await mitServer({}, async ({ basis, speicher }) => {
    const { id } = await (await senden(basis, { argument: 'Die Medien lügen doch alle.' })).json();
    await warteAufStatus(basis, id);
    const del = await fetch(basis + '/api/anfragen/' + id, { method: 'DELETE', headers: { Origin: ORIGIN } });
    assert.equal(del.status, 204);
    const rest = speicher.holen(id);
    assert.deepEqual([rest.status, rest.argument, rest.kontext, rest.entwurf], ['geloescht', '', '', null]);
    assert.equal((await fetch(basis + '/api/anfragen/' + id)).status, 404);
    assert.equal((await fetch(basis + '/api/anfragen/' + id, { method: 'DELETE' })).status, 404);
  });
});

test('Löschen gibt das Tageslimit nicht wieder frei', async () => {
  await mitServer({ config: { proxyHeader: 'x-forwarded-for', limitProTag: 1 } }, async ({ basis }) => {
    const { id } = await (await senden(basis, { argument: 'Die Medien lügen doch alle.' }, { 'X-Forwarded-For': '1.1.1.1' })).json();
    assert.equal((await fetch(basis + '/api/anfragen/' + id, { method: 'DELETE' })).status, 204);
    assert.equal((await senden(basis, { argument: 'Die Medien lügen doch alle.' }, { 'X-Forwarded-For': '2.2.2.2' })).status, 503);
  });
});

test('Ein später fertiger Entwurf belebt eine gelöschte Anfrage nicht wieder', async () => {
  let fertig;
  const langsam = () => new Promise(r => { fertig = () => r({ status: 'entwurf', entwurf: { titel: 'spät' } }); });
  await mitServer({ entwurf: langsam }, async ({ basis, speicher, gemeldet }) => {
    const { id } = await (await senden(basis, { argument: 'Früher war alles besser hier.' })).json();
    assert.equal((await fetch(basis + '/api/anfragen/' + id, { method: 'DELETE' })).status, 204);
    fertig();
    await new Promise(r => setTimeout(r, 50));
    assert.equal(speicher.holen(id).status, 'geloescht');
    assert.equal(speicher.holen(id).entwurf, null);
    assert.equal(gemeldet.length, 0);
  });
});

test('Löschen einer laufenden Anfrage gibt ihren Platz für gleichzeitige Entwürfe nicht frei', async () => {
  const offen = [];
  await mitServer({ config: { proxyHeader: 'x-forwarded-for', maxParallel: 1 }, entwurf: () => new Promise(r => offen.push(r)) }, async ({ basis }) => {
    const { id } = await (await senden(basis, { argument: 'Die Medien lügen doch alle.' }, { 'X-Forwarded-For': '1.1.1.1' })).json();
    assert.equal((await fetch(basis + '/api/anfragen/' + id, { method: 'DELETE' })).status, 204);
    assert.equal((await senden(basis, { argument: 'Die Medien lügen doch alle.' }, { 'X-Forwarded-For': '2.2.2.2' })).status, 503);
    offen.forEach(r => r({ status: 'fehler', hinweis: '' }));
    await new Promise(r => setTimeout(r, 30));
    assert.equal((await senden(basis, { argument: 'Die Medien lügen doch alle.' }, { 'X-Forwarded-For': '3.3.3.3' })).status, 202, 'nach dem Ende ist der Platz wieder frei');
    offen.forEach(r => r({ status: 'fehler', hinweis: '' }));
  });
});

test('Höchstens so viele Entwürfe gleichzeitig wie erlaubt', async () => {
  const offen = [];
  await mitServer({ config: { proxyHeader: 'x-forwarded-for', maxParallel: 1 }, entwurf: () => new Promise(r => offen.push(r)) }, async ({ basis }) => {
    assert.equal((await senden(basis, { argument: 'Die Medien lügen doch alle.' }, { 'X-Forwarded-For': '1.1.1.1' })).status, 202);
    const zweite = await senden(basis, { argument: 'Die Medien lügen doch alle.' }, { 'X-Forwarded-For': '2.2.2.2' });
    assert.equal(zweite.status, 503);
    assert.match((await zweite.json()).fehler, /in Arbeit/);
    offen.forEach(r => r({ status: 'fehler', hinweis: '' }));
  });
});

test('Tageslimit pro Absender greift vor dem Gesamtlimit', async () => {
  await mitServer({ config: { limitProStunde: 10, limitProTagProAbsender: 2, limitProTag: 50 } }, async ({ basis }) => {
    const satz = { argument: 'Die da oben machen eh, was sie wollen.' };
    assert.equal((await senden(basis, satz)).status, 202);
    assert.equal((await senden(basis, satz)).status, 202);
    const r = await senden(basis, satz);
    assert.equal(r.status, 429);
    assert.match((await r.json()).fehler, /heute/);
  });
});

test('Proxy-Header: der letzte Eintrag zählt, vorangestellte gefälschte Einträge helfen nicht', async () => {
  await mitServer({ config: { proxyHeader: 'x-forwarded-for', limitProStunde: 1 } }, async ({ basis }) => {
    const satz = { argument: 'Früher war alles besser hier.' };
    assert.equal((await senden(basis, satz, { 'X-Forwarded-For': '1.1.1.1, 9.9.9.9' })).status, 202);
    assert.equal((await senden(basis, satz, { 'X-Forwarded-For': '2.2.2.2, 9.9.9.9' })).status, 429);
    assert.equal((await senden(basis, satz, { 'X-Forwarded-For': '8.8.8.8' })).status, 202);
  });
});

test('Entwurf wird nur im Status entwurf herausgegeben; beantwortete Nummern werden beim Start abgeglichen', async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'umsteigen-'));
  const speicher = oeffneSpeicher(dir);
  const id = '11111111-1111-4111-8111-111111111111';
  speicher.neu({ id, argument: 'Alt', kontext: 'k', status: 'entwurf', entwurf: { titel: 'x' }, erstellt: new Date().toISOString() });
  const config = { port: 0, erlaubteOrigins: [ORIGIN], proxyHeader: '', limitProStunde: 5, limitProTag: 50 };
  const server = await starteServer({ config, speicher, erstelleEntwurf: async () => ({}), melden: async () => {}, beantwortet: [{ hash: anfrageHash(id), argumentId: 'medien-luegen' }] });
  try {
    const r = await (await fetch('http://127.0.0.1:' + server.address().port + '/api/anfragen/' + id)).json();
    assert.equal(r.status, 'beantwortet');
    assert.equal(r.entwurf, null);
    const a = speicher.holen(id);
    assert.equal(a.argument, '');
    assert.equal(a.argumentId, 'medien-luegen');
  } finally { await new Promise(r => server.close(r)); fs.rmSync(dir, { recursive: true, force: true }); }
});

test('Limit pro Absender und Stunde greift', async () => {
  await mitServer({ config: { limitProStunde: 2, limitProTagProAbsender: 10 } }, async ({ basis }) => {
    const satz = { argument: 'Die Medien lügen doch alle.' };
    assert.equal((await senden(basis, satz)).status, 202);
    assert.equal((await senden(basis, satz)).status, 202);
    const dritte = await senden(basis, satz);
    assert.equal(dritte.status, 429);
    assert.match((await dritte.json()).fehler, /Stunde/);
  });
});

test('Fehler beim Entwurf landet als Status fehler', async () => {
  await mitServer({ entwurf: async () => { throw new Error('kaputt'); } }, async ({ basis }) => {
    const { id } = await (await senden(basis, { argument: 'Früher war alles besser.' })).json();
    const r = await warteAufStatus(basis, id);
    assert.equal(r.status, 'fehler');
    assert.match(r.hinweis, /später/);
  });
});
