// Erstellt mit Claude einen Playbook-Entwurf zu einem fehlenden Argument. Im Testmodus (MOCK_CLAUDE=1) kommt ohne Kosten ein fester Entwurf zurück.
import Anthropic from '@anthropic-ai/sdk';
import { betaZodOutputFormat } from '@anthropic-ai/sdk/helpers/beta/zod';
import { entwurfSchema, pruefeEntwurf, typografie } from './schema.js';
import { systemPrompt, nutzerText } from './prompt.js';

export function erstelleEntwurfMit({ config, appDaten, client }) {
  if (config.mock) return testEntwurf(appDaten);
  const format = betaZodOutputFormat(entwurfSchema(appDaten));
  const system = systemPrompt(appDaten);
  const api = client || new Anthropic();
  return async function erstelleEntwurf({ argument, kontext }) {
    const res = await api.beta.messages.create({
      model: config.modell,
      max_tokens: 16000,
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
    const e = typografie(format.parse(text.text));
    if (!e.geeignet) return { status: 'ungeeignet', hinweis: e.hinweis };
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
    return { status: 'entwurf', entwurf: { ...rest, titel: argument, geeignet: true, hinweis: 'Testmodus: fester Beispiel-Entwurf, keine KI.', aehnlich: '', recherche: ['Testmodus: hier stünden die Punkte, die für die geprüfte Fassung belegt werden.'] } };
  };
}
