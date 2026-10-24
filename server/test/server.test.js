import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { starteServer } from '../src/server.js';
import { oeffneSpeicher } from '../src/speicher.js';

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
    assert.deepEqual(await fremd.json(), { ok: true });
  });
});

test('Limit pro Absender und Stunde greift', async () => {
  await mitServer({ config: { limitProStunde: 2 } }, async ({ basis }) => {
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
