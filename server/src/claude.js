// Erstellt mit Claude einen Playbook-Entwurf zu einem fehlenden Argument. Im Testmodus (MOCK_CLAUDE=1) kommt ohne Kosten ein fester, als Test markierter Entwurf zurück.
import Anthropic from '@anthropic-ai/sdk';
import { betaZodOutputFormat } from '@anthropic-ai/sdk/helpers/beta/zod';
import { entwurfSchema, mitAufzaehlungen, pruefeEntwurf, typografie, satzTypografie } from './schema.js';
import { systemPrompt, nutzerText } from './prompt.js';

// Reicht für Entwurf plus Nachdenken bei mittlerem Aufwand und begrenzt die Kosten eines einzelnen Aufrufs.
const MAX_TOKENS = 12000;
const HINWEIS_UNGEEIGNET = 'Zu diesem Text kann die KI keinen Entwurf schreiben. Bei akuter Gefahr: Polizei 110. Beratung findest du unter „Leitplanken“.';

export function erstelleEntwurfMit({ config, appDaten, client }) {
  if (config.mock) return testEntwurf(appDaten);
  const format = mitAufzaehlungen(betaZodOutputFormat(entwurfSchema(appDaten)), appDaten);
  const system = systemPrompt(appDaten);
  const api = client || new Anthropic();
  return async function erstelleEntwurf({ argument, kontext }) {
    const res = await api.beta.messages.create({
      model: config.modell,
      max_tokens: MAX_TOKENS,
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      system: [{ type: 'text', text: system, cache_control: { type: 'ephemeral' } }],
      messages: [{ role: 'user', content: nutzerText(argument, kontext) }],
      output_config: { effort: 'medium', format }
    });
    if (res.stop_reason === 'refusal') return { status: 'abgelehnt', hinweis: 'Zu diesem Satz kann die KI keinen Entwurf schreiben. Eure Anfrage liegt trotzdem vor und wird von Menschen geprüft.' };
    if (res.stop_reason === 'max_tokens') throw new Error('Entwurf abgeschnitten');
    const text = res.content.find(b => b.type === 'text');
    if (!text) throw new Error('Antwort ohne Text');
    const roh = format.parse(text.text);
    const e = typografie({ ...roh, schritte: [] });
    e.schritte = roh.schritte.map(s => ({ phase: s.phase, sagen: s.sagen.map(satzTypografie) }));
    if (!e.geeignet) return { status: 'ungeeignet', hinweis: e.hinweis.trim() || HINWEIS_UNGEEIGNET };
    const probleme = pruefeEntwurf(e);
    if (probleme.length) throw new Error('Entwurf ungültig: ' + probleme.join('; '));
    if (!appDaten.argumente.some(a => a.id === e.aehnlich)) e.aehnlich = '';
    return { status: 'entwurf', entwurf: e };
  };
}

function testEntwurf({ beispiel }) {
  return async function erstelleEntwurf({ argument }) {
    await new Promise(r => setTimeout(r, 1500));
    const { fakten, stichworte, anfragen, id, ...rest } = beispiel;
    return { status: 'entwurf', entwurf: { ...rest, titel: 'Testmodus: ' + argument, geeignet: true, hinweis: 'Testmodus: Das ist ein fester Beispiel-Entwurf, keine KI-Antwort auf deinen Satz.', aehnlich: '', recherche: ['Testmodus: Hier stünden die Punkte, die für die geprüfte Fassung belegt werden.'] } };
  };
}
