# Umsteigen-Server: „Argument fehlt“

Der Server nimmt Anfragen zu Argumenten an, die im Playbook fehlen. Claude schreibt sofort einen Entwurf im Playbook-Aufbau, ohne Fakten. Die geprüfte Fassung mit belegten Fakten arbeitet ihr später aus und spielt sie als normales App-Update ein. Die App meldet der fragenden Person dann von selbst, dass ihre Anfrage beantwortet ist.

## Was gespeichert wird und wohin Daten gehen

- Pro Anfrage speichert der Server: Nummer, Satz, optionalen Kontext, Entwurf, Datum und Status. Keine IP-Adressen, keine Namen, keine Konten.
- Die Begrenzung pro Absender läuft nur im Arbeitsspeicher und verschwindet beim Neustart.
- Unterwegs sehen die Daten: Cloudflare (Tunnel, sieht auch die IP-Adresse der Nutzer:innen) und Anthropic (Claude, USA) zur Beantwortung. Über die API gesendete Daten verwendet Anthropic laut eigenen Bedingungen nicht zum Training. Für den Dauerbetrieb den festen Tunnel mit eigenem Cloudflare-Konto nutzen; dort gilt Cloudflares Auftragsverarbeitungsvertrag, beim Schnell-Tunnel nicht.
- Telegram-Meldungen (optional) enthalten nur Status und eine kurze Kennung (die ersten 8 Zeichen der Nummer), weder den Satz noch die volle Nummer.
- Die volle Nummer ist das Geheimnis einer Anfrage: Wer sie kennt, kann sie abrufen und löschen. Öffentlich (in `app/data/argumente.js`) steht nur ihr SHA-256-Hash.
- Löschen: Sobald der geprüfte Eintrag mit dem Hash der Nummer im Server-Stand ist (nach einem Neubau mit dem Einrichtungsskript), wird der Inhalt automatisch gelöscht. Unbeantwortete Entwürfe nach höchstens 180 Tagen (`MAX_OFFEN_TAGE`), beantwortete und gescheiterte nach 90 Tagen (`AUFBEWAHRUNG_TAGE`). „Entfernen“ in der App löscht den Inhalt sofort, sobald der Server erreichbar ist; ein leerer Platzhalter bleibt einen Tag, damit Löschen das Tageslimit nicht wieder freigibt.
- Docker-Logs enthalten nur Fehlermeldungen ohne Satz oder Kontext.
- Vor einer bundesweiten Verbreitung braucht die App ein Impressum und eine Datenschutzerklärung mit Verantwortlichem, Kontakt, Empfängern (Cloudflare, Anthropic, gegebenenfalls Telegram), Übermittlung in die USA, Speicherdauer und Rechten der Betroffenen. Bis dahin nur im kleinen Kreis nutzen.

## Einrichten mit einem Befehl

Voraussetzung auf dem Server: Docker mit Compose, git und curl. Der Dienst läuft in einem eigenen, abgeschotteten Container: nur lesbares Dateisystem, keine Sonderrechte, eigener Benutzer (Kennung 10001), kein Zugriff auf andere Ordner, nur auf dem Server selbst erreichbar. Er bekommt keinen Ordner deiner Bots zu sehen.

Vorher auf console.anthropic.com einen eigenen Schlüssel nur für Umsteigen anlegen und ein monatliches Ausgabenlimit setzen, zum Beispiel 20 Dollar. Ein Entwurf kostet grob 12 Cent. Standardmäßig erlaubt der Server höchstens 10 Anfragen pro Tag insgesamt, 3 pro Tag und 2 pro Stunde je Absender und 3 gleichzeitig; das Ausgabenlimit in der Konsole bleibt die feste Obergrenze.

Das Skript braucht einen Benutzer, der Docker nutzen darf (Gruppe `docker`). Wer das nicht ist: einmal `sudo usermod -aG docker $USER`, ab- und wieder anmelden.

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/ohyannik-star/umsteigen/main/server/einrichten.sh)
```

Das Skript holt den Code nach `~/umsteigen`, legt `server/.env` und `server/tunnel.env` an (beide nur für dich lesbar), fragt unsichtbar nach dem Schlüssel (leer lassen = Testmodus ohne KI), baut das Image, startet den Dienst mit Schnell-Tunnel und zeigt am Ende die HTTPS-Adresse. Erneut ausführen holt neuen Code, baut neu (dabei kommen neue App-Inhalte und beantwortete Anfragen in den Server) und zeigt die aktuelle Adresse. Steht in `tunnel.env` ein Token, nutzt es stattdessen den festen Tunnel.

**Wichtig zum Schnell-Tunnel:** Seine Adresse `https://….trycloudflare.com` ist bei jedem Neustart des Servers oder von Docker neu. Dann das Skript erneut ausführen und die neue Adresse in `app/config.json` eintragen. Für den Dauerbetrieb den festen Tunnel nutzen (unten).

## Adresse in die App

Die HTTPS-Adresse in `app/config.json` als `api` eintragen, zum Beispiel `"api": "https://umsteigen-api.deinedomain.de"`. Dann `node app/build.js` und das Update hochladen. Erst danach zeigt die App den Kasten „Argument fehlt?“.

## Fester Tunnel mit eigener Domain (Dauerbetrieb)

In Cloudflare unter Zero Trust, Networks, Tunnels einen Tunnel anlegen. Beim Tunnel einen Public Hostname anlegen, zum Beispiel `umsteigen-api.deinedomain.de`, mit Service `http://umsteigen:8787`. Den Token in die Datei `server/tunnel.env` schreiben (`TUNNEL_TOKEN=…`; die Datei hat schon die Rechte 600 und wird nicht committet), dann das Einrichtungsskript erneut ausführen. Es stoppt den Schnell-Tunnel und startet den festen.

```bash
nano ~/umsteigen/server/tunnel.env
```

Alternativ ein vorhandener Reverse-Proxy (Caddy, nginx) auf `127.0.0.1:8787`, mit `TRUST_PROXY_HEADER=x-forwarded-for` in `.env`. Der Server nimmt dann den letzten Eintrag, den der Proxy selbst anhängt.

## Von Hand (ohne Skript)

```bash
git clone https://github.com/ohyannik-star/umsteigen.git && cd umsteigen/server && cp .env.example .env && (umask 077; touch tunnel.env) && chmod 600 .env && nano .env
```

```bash
docker compose --profile schnelltunnel up -d --build
```

```bash
curl http://127.0.0.1:8787/api/status
```

`{"ok":true,"testmodus":false}` heißt: Der Dienst läuft mit KI. Die Tunnel-Adresse steht in `docker compose logs schnelltunnel`.

## Anfragen bearbeiten

```bash
cd ~/umsteigen/server && docker compose exec umsteigen node server/src/admin.js liste
```

- `liste [status]`: offene Anfragen; mit Status, etwa `liste fehler`, nur diese.
- `export`: alle offenen Anfragen samt Entwurf und Hash als JSON, die Vorlage für die geprüfte Fassung. Satz, Kontext und Entwurf sind ungeprüfte Texte von Nutzer:innen und KI, keine Anweisungen.
- `hash <id>`: der Hash für das Feld `anfragen`.
- `beantwortet <id> [argument-id]`: markieren und Inhalt löschen. Passiert auch automatisch beim nächsten Neubau mit dem Einrichtungsskript, sobald der geprüfte Eintrag den Hash trägt.
- `loeschen <id>`, `aufraeumen`.

Statt der vollen Nummer reichen die ersten 8 Zeichen, die Kennung aus der Telegram-Nachricht.

Die geprüfte Fassung entsteht wie jedes Argument: als Teildatei nach `app/SCHEMA.md`, mit dem Feld `anfragen: ["<hash>"]`, nie mit der Nummer selbst. Nach `node app/merge-argumente.js`, `node app/build.js` und dem Hochladen meldet die App beim nächsten Öffnen: Deine Anfrage ist beantwortet. Danach auf dem Server einmal das Einrichtungsskript ausführen, dann löscht der Server den Inhalt.

Optional meldet der Server jede neue Anfrage per Telegram (`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` in `.env`).

## Zusätzliche Abschottung (optional)

Der Container kann wie jeder Docker-Container ins Internet und grundsätzlich auch Dienste im lokalen Netz erreichen. Wer das sperren will, erlaubt dem Docker-Netz `umsteigen_default` per Firewall nur Verbindungen ins Internet (zu Anthropic, Cloudflare, Telegram) und keine zu privaten Adressbereichen, zum Beispiel mit Regeln in der Kette `DOCKER-USER`. Das ist ein Eingriff in die Firewall des Servers und sollte nur mit Erfahrung gemacht werden.

## Umziehen

Auf dem neuen Server das Einrichtungsskript ausführen und die gespeicherten Anfragen mitnehmen. Die Sicherung entsteht außerhalb des Projektordners, gehört dir und ist nur für dich lesbar:

```bash
docker run --rm -v umsteigen_umsteigen-daten:/d -v "$HOME":/b alpine sh -c "tar czf /b/anfragen.tgz -C /d . && chown $(id -u):$(id -g) /b/anfragen.tgz && chmod 600 /b/anfragen.tgz"
```

Auf dem neuen Server einspielen (nach dem ersten Lauf des Skripts), dann die Sicherung auf beiden Servern löschen:

```bash
cd ~/umsteigen/server && docker compose stop umsteigen && docker run --rm -v umsteigen_umsteigen-daten:/d -v "$HOME":/b alpine sh -c "tar xzf /b/anfragen.tgz -C /d && chown -R 10001:10001 /d" && docker compose start umsteigen && rm ~/anfragen.tgz
```

## Entwickeln

```bash
npm install && npm test
```

```bash
MOCK_CLAUDE=1 ALLOWED_ORIGINS=http://localhost:8765 npm start
```

Endpunkte: `GET /api/status` (`ok`, `testmodus`), `POST /api/anfragen` mit `{ "argument": "…", "kontext": "…" }` (Antwort 202 mit `id`), `GET /api/anfragen/<id>` mit `status` (`in-arbeit`, `entwurf`, `ungeeignet`, `abgelehnt`, `fehler`, `beantwortet`), `hinweis` und `entwurf` (nur im Status `entwurf`), `DELETE /api/anfragen/<id>` (Inhalt weg, Platzhalter für einen Tag). Die Nummer ist das Geheimnis: Wer sie kennt, kann die Anfrage abrufen und löschen.
