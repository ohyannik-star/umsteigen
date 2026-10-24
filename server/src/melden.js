// Schickt euch optional eine Telegram-Nachricht, wenn eine neue Anfrage einen Entwurf hat. Ohne TELEGRAM_BOT_TOKEN und TELEGRAM_CHAT_ID passiert nichts.
export function erstelleMelder({ telegramToken, telegramChat }, abrufen = globalThis.fetch) {
  if (!telegramToken || !telegramChat) return async () => {};
  return async function melden(anfrage) {
    const text = 'Umsteigen: neue Anfrage (' + anfrage.status + ')\n„' + anfrage.argument + '“';
    try {
      await abrufen('https://api.telegram.org/bot' + telegramToken + '/sendMessage', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: telegramChat, text }) });
    } catch (e) { console.error('Telegram nicht erreichbar: ' + e.message); }
  };
}
