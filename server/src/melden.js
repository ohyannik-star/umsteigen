// Schickt euch optional eine Telegram-Nachricht, wenn eine neue Anfrage bearbeitet ist. Ohne TELEGRAM_BOT_TOKEN und TELEGRAM_CHAT_ID passiert nichts.
// Die Nachricht enthält weder den Satz noch die volle Nummer (die erlaubt Abrufen und Löschen), nur Status und die ersten 8 Zeichen der Nummer.
export function erstelleMelder({ telegramToken, telegramChat }, abrufen = globalThis.fetch) {
  if (!telegramToken || !telegramChat) return async () => {};
  return async function melden(anfrage) {
    const text = 'Umsteigen: neue Anfrage (' + anfrage.status + '), Kennung ' + String(anfrage.id).slice(0, 8) + '. Lesen auf dem Server mit admin.js liste.';
    try {
      await abrufen('https://api.telegram.org/bot' + telegramToken + '/sendMessage', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: telegramChat, text }) });
    } catch (e) { console.error('Telegram nicht erreichbar: ' + e.message); }
  };
}
