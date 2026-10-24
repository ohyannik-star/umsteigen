// Liest die Einstellungen aus Umgebungsvariablen. Alle Werte sind in server/.env.example beschrieben.
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
// Nur das Gesamtlimit darf 0 sein (Funktion pausiert); fehlende oder ungültige Werte fallen auf den Standard zurück.
const zahl = (v, d, nullErlaubt) => { if (v === undefined || String(v).trim() === '') return d; const n = Number(v); return Number.isFinite(n) && (n > 0 || (nullErlaubt && n === 0)) ? n : d; };

export function ladeConfig(env = process.env) {
  return {
    port: zahl(env.PORT, 8787),
    datenDir: env.DATA_DIR || path.join(here, '..', 'data'),
    appDatenDir: env.APP_DATA_DIR || path.join(here, '..', '..', 'app', 'data'),
    erlaubteOrigins: (env.ALLOWED_ORIGINS || 'https://ohyannik-star.github.io').split(',').map(s => s.trim()).filter(Boolean),
    proxyHeader: (env.TRUST_PROXY_HEADER || '').trim().toLowerCase(),
    limitProStunde: zahl(env.LIMIT_PRO_STUNDE, 2),
    maxParallel: zahl(env.MAX_PARALLEL, 3),
    limitProTagProAbsender: zahl(env.LIMIT_PRO_TAG_PRO_ABSENDER, 3),
    limitProTag: zahl(env.LIMIT_PRO_TAG, 10, true),
    modell: env.CLAUDE_MODEL || 'claude-opus-5-5',
    // Ohne Schlüssel gibt es keine KI; dann lieber ehrlich im Testmodus als jede Anfrage scheitern lassen.
    mock: env.MOCK_CLAUDE === '1' || !(env.ANTHROPIC_API_KEY || env.ANTHROPIC_AUTH_TOKEN),
    telegramToken: env.TELEGRAM_BOT_TOKEN || '',
    telegramChat: env.TELEGRAM_CHAT_ID || '',
    aufbewahrungTage: zahl(env.AUFBEWAHRUNG_TAGE, 90),
    maxOffenTage: zahl(env.MAX_OFFEN_TAGE, 180)
  };
}
