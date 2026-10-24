# Umsteigen-Server: „Argument fehlt“

Der Server nimmt Anfragen zu Argumenten an, die im Playbook fehlen. Claude schreibt sofort einen Entwurf im Playbook-Aufbau, ohne Fakten. Die geprüfte Fassung mit belegten Fakten arbeitet ihr später aus und spielt sie als normales App-Update ein. Die App meldet der fragenden Person dann von selbst, dass ihre Anfrage beantwortet ist.

## Was gespeichert wird und wohin Daten gehen

- Pro Anfrage: Nummer, der Satz, der optionale Kontext, der Entwurf, Datum und Status. Keine IP-Adressen, keine Namen, keine Konten.
- Die Begrenzung pro Absender und Stunde läuft nur im Arbeitsspeicher und verschwindet beim Neustart.
- Satz und Kontext gehen zur Beantwortung an Anthropic (Claude, USA). Über die API gesendete Daten verwendet Anthropic laut eigenen Bedingungen nicht zum Training.
- Beantwortete oder gescheiterte Anfragen werden nach 90 Tagen gelöscht (`AUFBEWAHRUNG_TAGE`).
- Vor einer bundesweiten Verbreitung braucht die App ein Impressum und eine Datenschutzerklärung, die Anthropic als Empfänger nennt.

## Einrichten (einmalig, etwa 20 Minuten)

### 1. API-Schlüssel

Auf console.anthropic.com einen eigenen Schlüssel nur für Umsteigen anlegen und unter Limits ein monatliches Ausgabenlimit setzen, zum Beispiel 20 Dollar. Ein Entwurf kostet grob 12 Cent.

### 2. Auf dem Server

Voraussetzung: Docker mit Compose. Der Dienst läuft in einem eigenen, abgeschotteten Container: nur lesbares Dateisystem, keine Sonderrechte, eigener Benutzer, kein Zugriff auf andere Ordner, nur auf dem Server selbst erreichbar. Er bekommt keinen Ordner deiner Bots zu sehen.

```bash
git clone https://github.com/ohyannik-star/umsteigen.git
```

```bash
cd umsteigen/server && cp .env.example .env && nano .env
```

In `.env` den Schlüssel eintragen. Für den ersten Start `MOCK_CLAUDE=1` setzen: Dann kommt ein fester Beispiel-Entwurf, ohne KI und ohne Kosten.

```bash
docker compose up -d --build
```

```bash
curl http://127.0.0.1:8787/api/status
```

Die Antwort `{"ok":true}` heißt: Der Dienst läuft.

### 3. HTTPS-Adresse

Die App liegt auf GitHub Pages und darf nur HTTPS-Adressen ansprechen. Drei Wege:

**Weg A, Cloudflare Tunnel mit eigener Domain (empfohlen, keine offenen Ports):** In Cloudflare unter Zero Trust, Networks, Tunnels einen Tunnel anlegen und den Token in `.env` als `TUNNEL_TOKEN` eintragen. Beim Tunnel einen Public Hostname anlegen, zum Beispiel `umsteigen-api.deinedomain.de`, mit Service `http://umsteigen:8787`. Dann:

```bash
docker compose --profile tunnel up -d
```

**Weg B, nur zum Ausprobieren ohne Domain:** Ein Schnell-Tunnel zeigt eine zufällige Adresse wie `https://xyz.trycloudflare.com`. Die Adresse ändert sich bei jedem Neustart, deshalb nur zum Testen.

```bash
docker run --rm --network umsteigen_default cloudflare/cloudflared:latest tunnel --no-autoupdate --url http://umsteigen:8787
```

**Weg C, vorhandener Reverse-Proxy (Caddy, nginx):** auf `127.0.0.1:8787` weiterleiten und in `.env` `TRUST_PROXY_HEADER=x-forwarded-for` setzen.

### 4. Adresse in die App

Die HTTPS-Adresse in `app/config.json` als `api` eintragen, zum Beispiel `"api": "https://umsteigen-api.deinedomain.de"`. Dann `node app/build.js` und das Update hochladen. Erst danach zeigt die App den Kasten „Argument fehlt?“.

### 5. Echte KI einschalten

Wenn der Testmodus in der App funktioniert: in `.env` `MOCK_CLAUDE=0` setzen und neu starten.

```bash
docker compose up -d
```

## Anfragen bearbeiten

```bash
docker compose exec umsteigen node server/src/admin.js liste
```

- `liste [status]`: offene Anfragen; mit Status, etwa `liste beantwortet`, nur diese.
- `export`: alle offenen Anfragen samt Entwurf als JSON. Das ist die Vorlage für die geprüfte Fassung.
- `beantwortet <id> [argument-id]`: markieren, wenn der geprüfte Eintrag live ist.
- `loeschen <id>`, `aufraeumen`.

Die geprüfte Fassung entsteht wie jedes Argument: als Teildatei nach `app/SCHEMA.md`, mit dem Feld `anfragen: ["<id>"]`. Nach `node app/merge-argumente.js`, `node app/build.js` und dem Hochladen sieht die App beim nächsten Öffnen die Anfragenummer und meldet: Deine Anfrage ist beantwortet.

Optional meldet der Server jede neue Anfrage per Telegram (`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`).

## Aktualisieren und umziehen

Neue App-Inhalte fließen in die Entwürfe ein, wenn der Server neu gebaut wird:

```bash
git pull && docker compose up -d --build
```

Umzug auf einen anderen Server: dort wie oben einrichten und die gespeicherten Anfragen mitnehmen.

```bash
docker run --rm -v umsteigen_umsteigen-daten:/d -v "$PWD":/b alpine tar czf /b/anfragen.tgz -C /d .
```

## Entwickeln

```bash
npm install && npm test
```

```bash
MOCK_CLAUDE=1 ALLOWED_ORIGINS=http://localhost:8765 npm start
```

Endpunkte: `GET /api/status`, `POST /api/anfragen` mit `{ "argument": "…", "kontext": "…" }` (Antwort 202 mit `id`), `GET /api/anfragen/<id>` mit `status` (`in-arbeit`, `entwurf`, `ungeeignet`, `abgelehnt`, `fehler`, `beantwortet`), `hinweis` und `entwurf`.
