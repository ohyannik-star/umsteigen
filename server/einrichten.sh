#!/usr/bin/env bash
# Richtet den Umsteigen-Server mit einem Befehl ein oder aktualisiert ihn (Code holen, Image neu bauen, starten).
# Aufruf auf dem Server:  bash <(curl -fsSL https://raw.githubusercontent.com/ohyannik-star/umsteigen/main/server/einrichten.sh)
# Ohne festen Tunnel steht am Ende die HTTPS-Adresse des Schnell-Tunnels; mit TUNNEL_TOKEN in server/tunnel.env läuft der feste Tunnel.
set -euo pipefail

ZIEL="${UMSTEIGEN_DIR:-$HOME/umsteigen}"
REPO="https://github.com/ohyannik-star/umsteigen.git"

command -v git >/dev/null || { echo "git fehlt. Bitte installieren (zum Beispiel: sudo apt install git) und den Befehl noch einmal ausführen."; exit 1; }
command -v curl >/dev/null || { echo "curl fehlt. Bitte installieren (zum Beispiel: sudo apt install curl) und den Befehl noch einmal ausführen."; exit 1; }
command -v docker >/dev/null || { echo "Docker fehlt. Anleitung: https://docs.docker.com/engine/install/ – danach den Befehl noch einmal ausführen."; exit 1; }
docker compose version >/dev/null 2>&1 || { echo "Docker Compose fehlt (Paket docker-compose-plugin). Danach den Befehl noch einmal ausführen."; exit 1; }
docker info >/dev/null 2>&1 || { echo "Kein Zugriff auf Docker. Einmal ausführen: sudo usermod -aG docker \$USER – dann ab- und wieder anmelden und den Befehl erneut starten."; exit 1; }

if [ -d "$ZIEL/.git" ]; then git -C "$ZIEL" pull --ff-only --quiet; else git clone --quiet "$REPO" "$ZIEL"; fi
cd "$ZIEL/server"

[ -f .env ] || { cp .env.example .env; sed -i 's|^MOCK_CLAUDE=.*|MOCK_CLAUDE=1|' .env; }
[ -f tunnel.env ] || ( umask 077; : > tunnel.env )
chmod 600 .env tunnel.env

# Eine .env-Zeile setzen, ohne den Wert in eine Befehlszeile zu schreiben (der Wert kommt über die Umgebung).
setze() { ( umask 077; SCHL="$1" WERT="$2" awk 'BEGIN { s = ENVIRON["SCHL"] "=" } index($0, s) == 1 { print s ENVIRON["WERT"]; next } { print }' "$3" > "$3.neu" ) && mv "$3.neu" "$3"; }

# Früher stand der Tunnel-Token in .env; er gehört jetzt nur in tunnel.env.
if grep -q '^TUNNEL_TOKEN=.\+' .env && ! grep -q '^TUNNEL_TOKEN=.\+' tunnel.env; then
  grep '^TUNNEL_TOKEN=' .env >> tunnel.env
  ( umask 077; grep -v '^TUNNEL_TOKEN=' .env > .env.neu ) && mv .env.neu .env
fi

# API-Schlüssel nur abfragen, solange keiner eingetragen ist. Die Eingabe bleibt unsichtbar, steht in keiner Befehlszeile und landet nur in server/.env.
if ! grep -q '^ANTHROPIC_API_KEY=.\+' .env; then
  echo "Vorher in der Anthropic-Konsole (console.anthropic.com) ein monatliches Ausgabenlimit setzen, zum Beispiel 20 Dollar."
  echo "Anthropic-API-Schlüssel einfügen und Enter drücken (unsichtbar). Leer lassen = Testmodus ohne KI und ohne Kosten:"
  read -rs SCHLUESSEL < /dev/tty || SCHLUESSEL=""
  echo
  if [ -n "$SCHLUESSEL" ]; then
    [[ "$SCHLUESSEL" =~ ^[A-Za-z0-9_-]+$ ]] || { echo "Der Schlüssel enthält unerwartete Zeichen. Bitte noch einmal versuchen."; exit 1; }
    setze ANTHROPIC_API_KEY "$SCHLUESSEL" .env
    setze MOCK_CLAUDE 0 .env
    unset SCHLUESSEL
  else
    setze MOCK_CLAUDE 1 .env
  fi
fi

# Fester Tunnel, sobald ein Token eingetragen ist; sonst Schnell-Tunnel. Der Schnell-Tunnel weicht erst, wenn der feste verbunden ist.
if grep -q '^TUNNEL_TOKEN=.\+' tunnel.env; then
  docker compose --profile tunnel up -d --build --remove-orphans
  SEIT=$(docker inspect -f '{{.State.StartedAt}}' "$(docker compose --profile tunnel ps -q tunnel)" 2>/dev/null || true)
  VERBUNDEN=""
  for _ in $(seq 1 30); do
    docker compose --profile tunnel logs ${SEIT:+--since "$SEIT"} tunnel 2>/dev/null | grep -q 'Registered tunnel connection' && { VERBUNDEN=1; break; }
    sleep 2
  done
  [ -n "$VERBUNDEN" ] || { echo "Der feste Tunnel verbindet sich nicht (Token oder Public Hostname prüfen). Der bisherige Tunnel läuft weiter. Letzte Meldungen:"; docker compose --profile tunnel logs --tail 30 tunnel; exit 1; }
  docker compose --profile schnelltunnel rm -sf schnelltunnel >/dev/null 2>&1 || true
  FEST=1
else
  docker compose --profile tunnel rm -sf tunnel >/dev/null 2>&1 || true
  docker compose --profile schnelltunnel up -d --build --remove-orphans
  FEST=0
fi

for _ in $(seq 1 45); do curl -fsS http://127.0.0.1:8787/api/status >/dev/null 2>&1 && break; sleep 2; done
STATUS=$(curl -fsS http://127.0.0.1:8787/api/status 2>/dev/null || true)
[ -n "$STATUS" ] || { echo "Der Dienst antwortet nicht. Letzte Meldungen:"; docker compose logs --tail 30 umsteigen; exit 1; }

echo
if echo "$STATUS" | grep -q '"testmodus":true'; then
  echo "Läuft im TESTMODUS: Die App zeigt feste Beispiel-Entwürfe, keine KI. Für echte Entwürfe den Befehl noch einmal ausführen und den Schlüssel eingeben"
  echo "(vorher in server/.env die Zeile ANTHROPIC_API_KEY= leeren, falls dort etwas steht)."
fi

if [ "$FEST" = 1 ]; then
  echo "Fertig. Der feste Tunnel läuft; die Adresse ist der Public Hostname, den du in Cloudflare eingetragen hast."
  exit 0
fi

# Nur die Meldungen seit dem letzten Start des Schnell-Tunnels lesen, damit keine alte Adresse auftaucht.
URL=""
SEIT=$(docker inspect -f '{{.State.StartedAt}}' "$(docker compose ps -q schnelltunnel)" 2>/dev/null || true)
for _ in $(seq 1 45); do
  URL=$(docker compose logs ${SEIT:+--since "$SEIT"} schnelltunnel 2>/dev/null | grep -oE 'https://[a-z0-9-]+\.trycloudflare\.com' | grep -v '^https://api\.trycloudflare\.com$' | tail -1 || true)
  [ -n "$URL" ] && break
  sleep 2
done
[ -n "$URL" ] || { echo "Der Tunnel hat noch keine Adresse. Letzte Meldungen:"; docker compose logs --tail 30 schnelltunnel; exit 1; }

echo "Wichtig: Diese Adresse ändert sich bei jedem Neustart des Servers oder von Docker. Dann diesen Befehl erneut ausführen und die neue Adresse schicken."
echo
echo "Fertig. Schick diese Zeile an Claude:"
echo "Server-Adresse: $URL"
