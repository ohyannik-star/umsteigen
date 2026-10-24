import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { oeffneSpeicher } from '../src/speicher.js';
import { erstelleLimit, absenderSchluessel } from '../src/limits.js';
import { ladeConfig } from '../src/config.js';
import { erstelleMelder } from '../src/melden.js';

const TAG = 864e5;
function tmp() { return fs.mkdtempSync(path.join(os.tmpdir(), 'umsteigen-')); }

test('Speichern, ändern, lesen über zwei Speicher-Objekte hinweg', () => {
  const dir = tmp();
  const a = oeffneSpeicher(dir), b = oeffneSpeicher(dir);
  a.neu({ id: '1', status: 'in-arbeit', erstellt: new Date().toISOString() });
  assert.equal(b.holen('1').status, 'in-arbeit');
  b.aendern('1', { status: 'entwurf' });
  assert.equal(a.holen('1').status, 'entwurf', 'Zwischenspeicher erneuert sich nach fremder Änderung');
  assert.equal(a.aendern('fehlt', { status: 'x' }), null);
  assert.equal(a.loeschen('1'), true);
  assert.equal(a.loeschen('1'), false);
  assert.deepEqual(b.alle(), []);
  assert.equal(fs.existsSync(path.join(dir, 'anfragen.json.lock')), false, 'keine Sperre bleibt liegen');
  fs.rmSync(dir, { recursive: true, force: true });
});

test('Verwaiste Sperrdatei blockiert nicht: alt oder von einem beendeten Prozess', () => {
  const dir = tmp(), s = oeffneSpeicher(dir), sperre = path.join(dir, 'anfragen.json.lock');
  fs.writeFileSync(sperre, '');
  const alt = (Date.now() - 60000) / 1000; fs.utimesSync(sperre, alt, alt);
  s.neu({ id: 'a', status: 'entwurf', erstellt: new Date().toISOString() });
  fs.writeFileSync(sperre, '999999');
  const start = Date.now();
  s.neu({ id: 'b', status: 'entwurf', erstellt: new Date().toISOString() });
  assert.ok(Date.now() - start < 1000, 'frische Sperre eines toten Prozesses wird sofort übernommen');
  assert.equal(s.alle().length, 2);
  fs.rmSync(dir, { recursive: true, force: true });
});

test('Reste abgebrochener Schreibvorgänge werden beim Öffnen entfernt', () => {
  const dir = tmp();
  fs.writeFileSync(path.join(dir, 'anfragen.json.123.456.tmp'), '[{"argument":"geheim"}]');
  oeffneSpeicher(dir);
  assert.deepEqual(fs.readdirSync(dir).filter(f => f.endsWith('.tmp')), []);
  fs.rmSync(dir, { recursive: true, force: true });
});

test('Aufräumen macht hängende Anfragen nach einer Stunde zu fehler', () => {
  const dir = tmp(), s = oeffneSpeicher(dir), jetzt = Date.now();
  s.neu({ id: 'h', status: 'in-arbeit', erstellt: new Date(jetzt - 2 * 36e5).toISOString() });
  s.neu({ id: 'j', status: 'in-arbeit', erstellt: new Date(jetzt - 60000).toISOString() });
  s.aufraeumen(90, 180, jetzt);
  assert.equal(s.holen('h').status, 'fehler');
  assert.equal(s.holen('j').status, 'in-arbeit');
  fs.rmSync(dir, { recursive: true, force: true });
});

test('Aufräumen: erledigte nach Frist, offene Entwürfe nach Höchstdauer, laufende nie', () => {
  const dir = tmp(), s = oeffneSpeicher(dir), jetzt = Date.now(), iso = t => new Date(jetzt - t * TAG).toISOString();
  s.neu({ id: 'offen-jung', status: 'entwurf', erstellt: iso(100) });
  s.neu({ id: 'offen-alt', status: 'entwurf', erstellt: iso(200) });
  s.neu({ id: 'laeuft', status: 'in-arbeit', erstellt: iso(400) });
  s.neu({ id: 'beantwortet-alt', status: 'beantwortet', erstellt: iso(100), beantwortet: iso(100) });
  s.neu({ id: 'beantwortet-neu', status: 'beantwortet', erstellt: iso(100), beantwortet: iso(5) });
  s.neu({ id: 'fehler-alt', status: 'fehler', erstellt: iso(100), fertig: iso(100) });
  assert.equal(s.aufraeumen(90, 180, jetzt), 3);
  assert.deepEqual(s.alle().map(a => a.id).sort(), ['beantwortet-neu', 'laeuft', 'offen-jung']);
  assert.equal(s.aufraeumen(90, 180, jetzt), 0);
  fs.rmSync(dir, { recursive: true, force: true });
});

test('Beantworten löscht den Inhalt, aber nicht bei gelöschten Anfragen', () => {
  const dir = tmp(), s = oeffneSpeicher(dir);
  s.neu({ id: 'x', argument: 'Satz', kontext: 'K', status: 'entwurf', entwurf: { titel: 't' }, erstellt: new Date().toISOString() });
  s.beantworten('x', 'arg-1');
  const a = s.holen('x');
  assert.deepEqual([a.status, a.argument, a.kontext, a.entwurf, a.argumentId], ['beantwortet', '', '', null, 'arg-1']);
  s.neu({ id: 'y', argument: 'Satz', status: 'entwurf', erstellt: new Date().toISOString() });
  s.tilgen('y');
  assert.equal(s.beantworten('y', 'arg-1'), null);
  assert.equal(s.holen('y').status, 'geloescht');
  fs.rmSync(dir, { recursive: true, force: true });
});

test('Fertigstellen wirkt nur auf laufende Anfragen; Platzhalter verschwinden nach einem Tag', () => {
  const dir = tmp(), s = oeffneSpeicher(dir), jetzt = Date.now();
  s.neu({ id: 'l', status: 'in-arbeit', erstellt: new Date(jetzt).toISOString() });
  s.neu({ id: 'g', status: 'in-arbeit', erstellt: new Date(jetzt - 2 * TAG).toISOString() });
  s.tilgen('g');
  assert.equal(s.fertigstellen('g', { status: 'entwurf' }), null);
  assert.equal(s.fertigstellen('l', { status: 'entwurf' }).status, 'entwurf');
  assert.equal(s.aufraeumen(90, 180, jetzt), 1);
  assert.deepEqual(s.alle().map(a => a.id), ['l']);
  fs.rmSync(dir, { recursive: true, force: true });
});

test('Tageslimit gesamt zählt gespeicherte Anfragen der letzten 24 Stunden; 0 pausiert', () => {
  const dir = tmp(), s = oeffneSpeicher(dir);
  s.neu({ id: 'a', erstellt: new Date().toISOString() });
  s.neu({ id: 'b', erstellt: new Date().toISOString() });
  assert.equal(erstelleLimit({ proStunde: 10, proTagProAbsender: 10, proTag: 2, speicher: s }).pruefen('x'), 'tag');
  assert.equal(erstelleLimit({ proStunde: 10, proTagProAbsender: 10, proTag: 0, speicher: oeffneSpeicher(tmp()) }).pruefen('x'), 'tag');
  fs.rmSync(dir, { recursive: true, force: true });
});

test('Absender-Limits pro Stunde und pro Tag, IPv6 zählt pro /64', () => {
  let t = Date.now();
  const limit = erstelleLimit({ proStunde: 2, proTagProAbsender: 3, proTag: 100, speicher: { alle: () => [] }, jetzt: () => t });
  assert.equal(limit.pruefen('2001:db8:1:2::a'), null);
  assert.equal(limit.pruefen('2001:db8:1:2:ffff::b'), null);
  assert.equal(limit.pruefen('2001:0db8:0001:0002::c'), 'stunde', 'gleiches /64');
  assert.equal(limit.pruefen('2001:db8:1:3::a'), null, 'anderes /64');
  t += 2 * 36e5;
  assert.equal(limit.pruefen('2001:db8:1:2::d'), null);
  assert.equal(limit.pruefen('2001:db8:1:2::e'), 'absender-tag');
});

test('Absenderschlüssel normalisiert Adressen', () => {
  assert.equal(absenderSchluessel('::ffff:192.0.2.7'), '192.0.2.7');
  assert.equal(absenderSchluessel('192.0.2.7'), '192.0.2.7');
  assert.equal(absenderSchluessel('2001:db8::1'), '2001:db8:0:0::/64');
  assert.equal(absenderSchluessel('fe80::1%eth0'), 'fe80:0:0:0::/64');
});

test('Config: Gesamtlimit 0 pausiert, Absender-Limits 0 und ungültige Werte fallen auf den Standard; ohne Schlüssel Testmodus', () => {
  const c = ladeConfig({ LIMIT_PRO_TAG: '0', LIMIT_PRO_STUNDE: 'abc', LIMIT_PRO_TAG_PRO_ABSENDER: '0', ANTHROPIC_API_KEY: 'x' });
  assert.equal(c.limitProTag, 0);
  assert.equal(c.limitProStunde, 2);
  assert.equal(c.limitProTagProAbsender, 3);
  assert.equal(c.mock, false);
  assert.equal(ladeConfig({}).limitProTag, 10);
  assert.equal(ladeConfig({}).mock, true);
});

test('Telegram-Nachricht enthält weder den Satz noch die volle Nummer', async () => {
  const gesendet = [];
  const melden = erstelleMelder({ telegramToken: 't', telegramChat: 'c' }, async (url, opt) => { gesendet.push(JSON.parse(opt.body).text); });
  const id = '3f2b9c1a-1111-4111-8111-111111111111';
  await melden({ id, status: 'entwurf', argument: 'Geheimer Satz über den Onkel' });
  assert.equal(gesendet.length, 1);
  assert.doesNotMatch(gesendet[0], /Geheimer Satz/);
  assert.doesNotMatch(gesendet[0], new RegExp(id));
  assert.match(gesendet[0], /3f2b9c1a/);
});
