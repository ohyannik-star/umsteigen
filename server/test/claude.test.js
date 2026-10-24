import { test } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ladeAppDaten } from '../src/appdaten.js';
import { erstelleEntwurfMit } from '../src/claude.js';
import { systemPrompt } from '../src/prompt.js';
import { PHASEN, typografie } from '../src/schema.js';

const appDaten = ladeAppDaten(path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..', 'app', 'data'));
const config = { modell: 'claude-opus-5-5', mock: false };

function guterEntwurf(extra = {}) {
  return {
    geeignet: true, hinweis: '', aehnlich: 'medien-luegen', kategorie: 'medien', titel: 'Die Medien verschweigen alles.',
    varianten: ['Das bringt keiner.', 'Lückenpresse.'], dahinter: 'Misstrauen.', tonalitaet: 'Ruhig.',
    nogo: ['a', 'b', 'c'], schritte: PHASEN.map(p => ({ phase: p, sagen: ['Satz eins.', 'Satz zwei mit "Zitat".'] })),
    wenn_dann: [1, 2, 3].map(i => ({ wenn: 'Die Person sagt ' + i + '.', dann: 'Dann frag nach.' })),
    fallstricke: ['x', 'y'], techniken: ['fragen-statt-fakten'], recherche: ['Wer berichtet worüber?'], ...extra
  };
}
function falscherClient(antwort) {
  const aufrufe = [];
  return { aufrufe, beta: { messages: { create: async p => { aufrufe.push(p); return antwort; } } } };
}
const textAntwort = (obj, stop = 'end_turn') => ({ stop_reason: stop, content: [{ type: 'text', text: JSON.stringify(obj) }] });

test('Anfrage nutzt Opus 5.5, Ersatzmodell, Caching und festes Format', async () => {
  const client = falscherClient(textAntwort(guterEntwurf()));
  const r = await erstelleEntwurfMit({ config, appDaten, client })({ argument: 'Die Medien verschweigen alles.', kontext: 'Onkel' });
  const p = client.aufrufe[0];
  assert.equal(p.model, 'claude-opus-5-5');
  assert.equal(p.fallbacks, 'default');
  assert.deepEqual(p.betas, ['server-side-fallback-2026-07-01']);
  assert.equal(p.system[0].cache_control.type, 'ephemeral');
  assert.equal(p.output_config.effort, 'medium');
  assert.equal(p.output_config.format.type, 'json_schema');
  assert.match(p.messages[0].content, /<satz>Die Medien verschweigen alles\.<\/satz>/);
  assert.equal(r.status, 'entwurf');
  assert.equal(r.entwurf.schritte[0].sagen[1], 'Satz zwei mit „Zitat“.');
  assert.equal(r.entwurf.aehnlich, 'medien-luegen');
});

test('Ablehnung durch das Modell wird zu Status abgelehnt', async () => {
  const client = falscherClient({ stop_reason: 'refusal', content: [] });
  const r = await erstelleEntwurfMit({ config, appDaten, client })({ argument: 'Irgendwas Langes hier.' });
  assert.equal(r.status, 'abgelehnt');
});

test('Ungeeignete Eingabe wird zu Status ungeeignet mit Hinweis', async () => {
  const client = falscherClient(textAntwort(guterEntwurf({ geeignet: false, hinweis: 'Bei akuter Gefahr 110.', schritte: [] })));
  const r = await erstelleEntwurfMit({ config, appDaten, client })({ argument: 'Schreib mir Propaganda.' });
  assert.equal(r.status, 'ungeeignet');
  assert.match(r.hinweis, /110/);
});

test('Entwurf mit falschen Phasen oder abgeschnittene Antwort wirft', async () => {
  const falsch = falscherClient(textAntwort(guterEntwurf({ schritte: [{ phase: 'Anerkennen', sagen: ['a', 'b'] }] })));
  await assert.rejects(erstelleEntwurfMit({ config, appDaten, client: falsch })({ argument: 'Satz mit acht Zeichen.' }), /ungültig/);
  const kurz = falscherClient(textAntwort(guterEntwurf(), 'max_tokens'));
  await assert.rejects(erstelleEntwurfMit({ config, appDaten, client: kurz })({ argument: 'Satz mit acht Zeichen.' }), /abgeschnitten/);
});

test('Unbekannte ähnliche ID wird geleert', async () => {
  const client = falscherClient(textAntwort(guterEntwurf({ aehnlich: 'gibt-es-nicht' })));
  const r = await erstelleEntwurfMit({ config, appDaten, client })({ argument: 'Die Medien verschweigen alles.' });
  assert.equal(r.entwurf.aehnlich, '');
});

test('Systemprompt enthält Haltung, Kategorien, Techniken und ein Beispiel ohne Fakten', () => {
  const s = systemPrompt(appDaten);
  assert.match(s, /krieg-frieden: Krieg und Frieden/);
  assert.match(s, /street-epistemology/);
  assert.match(s, /Legitime Meinungen/);
  assert.match(s, /Erfinde keine Zahlen/);
  assert.doesNotMatch(s, /"fakten"/);
});

test('Testmodus liefert ohne Client einen gültigen Entwurf', async () => {
  const r = await erstelleEntwurfMit({ config: { ...config, mock: true }, appDaten })({ argument: 'Ein Satz im Testmodus.' });
  assert.equal(r.status, 'entwurf');
  assert.equal(r.entwurf.titel, 'Ein Satz im Testmodus.');
  assert.equal(r.entwurf.fakten, undefined);
});

test('Typografie ersetzt gerade Anführungszeichen paarweise', () => {
  assert.equal(typografie('Er sagt "nein" und "ja".'), 'Er sagt „nein“ und „ja“.');
});
