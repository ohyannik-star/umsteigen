import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { oeffneSpeicher } from '../src/speicher.js';
import { erstelleLimit } from '../src/limits.js';

const TAG = 864e5;
function tmp() { return fs.mkdtempSync(path.join(os.tmpdir(), 'umsteigen-')); }

test('Speichern, ändern, lesen über zwei Speicher-Objekte hinweg', () => {
  const dir = tmp();
  const a = oeffneSpeicher(dir), b = oeffneSpeicher(dir);
  a.neu({ id: '1', status: 'in-arbeit', erstellt: new Date().toISOString() });
  b.aendern('1', { status: 'entwurf' });
  assert.equal(a.holen('1').status, 'entwurf');
  assert.equal(a.loeschen('1'), true);
  assert.deepEqual(b.alle(), []);
  fs.rmSync(dir, { recursive: true, force: true });
});

test('Aufräumen entfernt alte erledigte Anfragen und behält offene Entwürfe', () => {
  const dir = tmp(), s = oeffneSpeicher(dir), jetzt = Date.now(), alt = new Date(jetzt - 100 * TAG).toISOString();
  s.neu({ id: 'offen', status: 'entwurf', erstellt: alt, fertig: alt });
  s.neu({ id: 'beantwortet-alt', status: 'beantwortet', erstellt: alt, beantwortet: alt });
  s.neu({ id: 'beantwortet-neu', status: 'beantwortet', erstellt: alt, beantwortet: new Date(jetzt - 5 * TAG).toISOString() });
  s.neu({ id: 'fehler-alt', status: 'fehler', erstellt: alt, fertig: alt });
  assert.equal(s.aufraeumen(90, jetzt), 2);
  assert.deepEqual(s.alle().map(a => a.id).sort(), ['beantwortet-neu', 'offen']);
  fs.rmSync(dir, { recursive: true, force: true });
});

test('Tageslimit zählt gespeicherte Anfragen der letzten 24 Stunden', () => {
  const dir = tmp(), s = oeffneSpeicher(dir);
  const limit = erstelleLimit({ proStunde: 10, proTag: 2, speicher: s });
  s.neu({ id: 'a', erstellt: new Date().toISOString() });
  s.neu({ id: 'b', erstellt: new Date().toISOString() });
  assert.equal(limit.pruefen('x'), 'tag');
  fs.rmSync(dir, { recursive: true, force: true });
});
