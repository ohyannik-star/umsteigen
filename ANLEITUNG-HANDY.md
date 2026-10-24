# Umsteigen auf dem Handy: veröffentlichen, installieren, aktualisieren

Die App ist eine installierbare Web-App. Sie braucht keinen App Store und keine Entwicklerkonten. Sie liegt als Ordner `docs/` bereit und muss nur auf eine Web-Adresse gelegt werden. Danach kann jede Person sie in Safari oder Chrome öffnen, auf den Home-Bildschirm legen und wie eine App nutzen, auch offline. Alle Daten bleiben auf dem Gerät.

## Stand: schon veröffentlicht

Die App läuft unter **https://ohyannik-star.github.io/umsteigen/** aus dem Repository https://github.com/ohyannik-star/umsteigen (Ordner `docs/`). Die Schritte unter 1 sind damit erledigt; für Updates gilt Abschnitt 3.

## 1. Veröffentlichen (einmalig, etwa 10 Minuten)

### Weg A: GitHub Pages (kostenlos, dauerhaft, mit Verlauf)

1. Kostenloses Konto auf github.com anlegen, falls noch keines da ist.
2. Oben rechts auf **+** und **New repository**. Name zum Beispiel `umsteigen`, Sichtbarkeit **Public**, Haken bei **Add a README**, dann **Create repository**.
3. Im neuen Repository auf **Add file** und **Upload files**. Den gesamten Inhalt des Ordners `docs/` in das Fenster ziehen: `index.html`, `app.js`, `sw.js`, `manifest.webmanifest`, die drei PNG-Dateien und den Ordner `data`. Unten **Commit changes**.
4. Auf **Settings**, links **Pages**. Bei **Source** die Einstellung **Deploy from a branch**, Branch **main**, Ordner **/docs**, dann **Save**.
5. Nach ein bis zwei Minuten steht oben auf der Pages-Seite die Adresse, zum Beispiel `https://deinname.github.io/umsteigen/`. Diese Adresse bekommt deine Freundin.

Wer lieber mit Git arbeitet, erreicht dasselbe so (im Projektordner, nach dem ersten Erstellen des Repositories):

```bash
git init && git add . && git commit -m "Umsteigen"
```

```bash
git push
```

### Weg B: Netlify Drop (zwei Minuten, Adresse bleibt nur mit Konto gleich)

Auf `app.netlify.com/drop` den Ordner `docs/` in das Fenster ziehen. Die Adresse erscheint sofort. Mit einem kostenlosen Netlify-Konto bleibt sie bei späteren Uploads gleich; ohne Konto verfällt sie nach einer Weile.

## 2. Auf dem iPhone installieren

1. Die Adresse in **Safari** öffnen (nicht im Browser einer anderen App).
2. Unten auf das **Teilen**-Symbol tippen, das Quadrat mit dem Pfeil nach oben.
3. **Zum Home-Bildschirm** wählen, dann **Hinzufügen**.
4. Das Symbol „Umsteigen" erscheint neben den anderen Apps. Von dort aus öffnet die App ohne Browserleiste und funktioniert auch ohne Netz.

Android: Adresse in Chrome öffnen, Menü mit den drei Punkten, **App installieren** oder **Zum Startbildschirm hinzufügen**.

## 3. Aktualisieren

Neue Inhalte oder Funktionen kommen so zu deiner Freundin:

1. Im Projekt `node app/build.js` ausführen. Das erzeugt den Ordner `docs/` neu, mit einer neuen Versionsnummer.
2. Hochladen: im Projektordner `git add -A`, dann `git commit -m "Update"` und `git push`. Oder im Browser auf github.com im Ordner docs über **Add file**, **Upload files** die neuen Dateien hineinziehen; vorhandene werden ersetzt.
3. Beim nächsten Öffnen lädt die App im Hintergrund die neue Version und zeigt unten „Neue Version verfügbar. Jetzt laden". Ein Tipp genügt.

## 4. Daten sichern und zwischen Geräten übertragen

- Alles, was deine Freundin eingibt, liegt nur in ihrem Browser auf ihrem Gerät. Niemand sonst sieht es, auch nicht die Person, die die Adresse betreibt.
- Im Bereich **Tagebuch** unter **Sichern und auf ein anderes Gerät übertragen** gibt es **Sicherung teilen**. Das öffnet das Teilen-Menü des iPhones: an sich selbst per Signal, Mail oder in die Notizen schicken. Auf dem anderen Gerät den Text dort einfügen und **Einspielen** tippen. Alternativ **Als Datei speichern** und **Datei einspielen**.
- **Fahrplan teilen** und **Plan teilen** senden das jeweilige Ergebnis als lesbaren Text, zum Beispiel an eine Mitstreiterin.
- Wichtig: In den iPhone-Einstellungen unter Safari nicht „Verlauf und Websitedaten löschen" ausführen, solange die Daten nicht gesichert sind. Das löscht auch die App-Daten. Die vom Home-Bildschirm gestartete App ist von der automatischen Löschung selten genutzter Website-Daten ausgenommen, solange sie installiert bleibt.

## 5. Datenschutz in zwei Sätzen

Die App sendet nichts an einen Server; der Hosting-Dienst liefert nur die Dateien aus und protokolliert dabei wie jede Website technische Zugriffsdaten wie die IP-Adresse. Einzige Ausnahme ist „Argument fehlt?“ unter Antworten: Wer dort eine Anfrage sendet, schickt den Satz und den freiwilligen Kontext an den Umsteigen-Server und zur Beantwortung an Anthropic (Claude), ohne Namen, IP-Speicherung oder Konto (Einzelheiten in `server/README.md`).

## 6. „Argument fehlt?“ einschalten

Der Kasten erscheint erst, wenn in `app/config.json` eine Server-Adresse steht. Einrichtung des Servers, HTTPS und Bearbeitung der Anfragen: `server/README.md`.
