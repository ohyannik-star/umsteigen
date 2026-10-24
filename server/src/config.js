// Liest die Einstellungen aus Umgebungsvariablen. Alle Werte sind in server/.env.example beschrieben.
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const zahl = (v, d) => { const n = Number(v); return Number.isFinite(n) && n > 0 ? n : d; };

export function ladeConfig(env = process.env) {
  return {
    port: zahl(env.PORT, 8787),
    datenDir: env.DATA_DIR || path.join(here, '..', 'data'),
    appDatenDir: env.APP_DATA_DIR || path.join(here, '..', '..', 'app', 'data'),
    erlaubteOrigins: (env.ALLOWED_ORIGINS || 'https://ohyannik-star.github.io').split(',').map(s => s.trim()).filter(Boolean),
    proxyHeader: (env.TRUST_PROXY_HEADER || '').trim().toLowerCase(),
    limitProStunde: zahl(env.LIMIT_PRO_STUNDE, 5),
    limitProTag: zahl(env.LIMIT_PRO_TAG, 50),
    modell: env.CLAUDE_MODEL || 'claude-opus-5-5',
    mock: env.MOCK_CLAUDE === '1',
    telegramToken: env.TELEGRAM_BOT_TOKEN || '',
    telegramChat: env.TELEGRAM_CHAT_ID || '',
    aufbewahrungTage: zahl(env.AUFBEWAHRUNG_TAGE, 90)
  };
}
