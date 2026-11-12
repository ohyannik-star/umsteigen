# UMDENKEN – Fahrplan-Netze für demokratische Gespräche

Die App hieß bis November 2026 „Umsteigen“. Die Web-Adresse, der Speichername im Browser und interne Bezeichner (`UMSTEIGEN_*`, Ordner- und Dienstnamen auf dem Server) tragen den alten Namen weiter, damit Links, gespeicherte Inhalte und Updates funktionieren.

Eine Web-App für alle, die mit einem Menschen im Gespräch bleiben wollen, der extreme Ansichten vertritt: in der Familie, im Freundeskreis, bei der Arbeit oder in der Nachbarschaft. Ziel ist, wieder miteinander zu reden, nicht recht zu behalten; niemand soll sich angegriffen fühlen, egal wo er politisch steht. Zwei Ebenen: einzelne Personen (Gespräch, Beziehung) und viele Menschen (Gemeinde, Öffentlichkeit, Kampagne). Alle Inhalte tragen eine Evidenzstufe und Quellen. Daten bleiben im Browser; einzige Ausnahme sind freiwillige Anfragen unter „Argument fehlt?“.

## Nutzen

- `dist/umdenken.html` doppelklicken: läuft offline in jedem Browser, eine einzige Datei zum Weitergeben.
- `docs/` auf eine Web-Adresse legen (GitHub Pages, Netlify): installierbare Web-App für iPhone und Android mit Offline-Betrieb und Update-Hinweis. Schritt für Schritt in `ANLEITUNG-HANDY.md`.
- Oder `app/index.html` mit einem lokalen Webserver öffnen (die Seite lädt `app/data/*.js`, `app/qr.js` und `app/app.js`).

## Aufbau

| Ordner / Datei | Inhalt |
| --- | --- |
| `app/index.html` | Oberfläche und Gestaltung |
| `app/app.js` | Logik: Netzplan, Kompass, Trainer, Kampagnenplaner, Wissen, Leitplanken, Tagebuch |
| `app/data/*.js` | Inhalte (Linien, Techniken, Kompass, Szenarien, Kampagne, Leitplanken, Anlaufstellen, Messung) |
| `app/SCHEMA.md` | Datenvertrag für die Inhalte, verbindlich beim Ändern |
| `app/validate.js` | Prüft Syntax, Mengen und Querverweise: `node app/validate.js` |
| `app/build.js` | Baut die Einzeldatei und `docs/`: `node app/build.js` |
| `app/icons/` | App-Symbole in allen Größen; neu erzeugen aus einer Vorlage mit `app/icons/erzeugen.ps1 -Vorlage <bild>` (Windows PowerShell) |
| `app/qr.js` | QR-Code-Erzeuger für „Weitersagen“, ohne Zusatzbibliothek |
| `app/config.json` | Server-Adresse für „Argument fehlt?“ (`api`, leer blendet die Funktion aus) und öffentliche Adresse der App für „Weitersagen“ (`url`) |
| `server/` | Dienst für „Argument fehlt?“ mit Claude-Entwürfen, Docker-Dateien und Anleitung (`server/README.md`); Tests: `npm test` im Ordner |
| `recherche/*.md` | Sechs Recherche-Berichte mit Quellen, die Grundlage der Inhalte |

## Module

1. **Netzplan**: fünf Linien (Gespräch, Gemeinde und Nachbarschaft, Öffentlichkeit und Kampagne, Schule und Jugend, Professionelle Begleitung und Ausstieg) mit Stationen, Abzweigen und Umsteigepunkten.
2. **Kompass**: 102 Fragen in 15 Richtungen zu beobachtbarem Verhalten, jede mit Begründung. Ergebnis: Profil über sieben Antriebe, vier Skalen (Gesprächsoffenheit, Beziehungskapital, Verschwörungsnähe, eigene Belastung), erste Schritte, Einstiegsstation. Fragen liegen in `app/data/kompass.js`; neue Fragen als Teildatei mit `node app/validate-kompass.js` prüfen und mit `node app/merge-kompass.js` zusammenführen.
3. **Trainer**: Szenarien mit Antwortoptionen und Rückmeldung.
3a. **Antworten**: Playbook zu typischen Argumenten (Tonalität, No-go-Wörter, wörtliche Sätze in fünf Schritten, Wenn-dann-Regeln, belegte Fakten), Verhaltensregeln für schwierige Reaktionen, Hilfe zum Lesen von Studien. Inhalte in `app/data/argumente.js`, gruppiert in Kategorien wie „Krieg und Frieden“; die Suche findet auch Stichworte. Neue Argumente als Teildatei mit `node app/validate-argumente.js <datei>` prüfen und mit `node app/merge-argumente.js <datei>` einfügen (Ablauf in `app/SCHEMA.md`). Fehlt ein Argument, sendet man es unter „Argument fehlt?“ an den Server, bekommt sofort einen KI-Entwurf ohne Fakten und später, als normales Update, die geprüfte Fassung; die App meldet sich dann von selbst („Meine Anfragen“).
3b. **Mein Fall** (Kompass-Ergebnis): Deine innere Einstellung, die Einstellung der Person, die Argumente der Person, deine Antworten bislang, Empfehlungen, Archiv.
3c. **Archiv**: gespeicherte Sätze, Fakten, Links und eigene Notizen mit Suche und drei Rettungssätzen für den Blackout.
4. **Kampagne**: Planer, Zielgruppen, Bausteine mit Evidenzstufe, Phasen, Kennzahlen.
5. **Wissen**: Techniken mit Vorgehen, Beispiel, Grenzen, Quellen.
6. **Leitplanken**: Ethik, Recht, Gefahrenzeichen, Selbstschutz, Datenschutz, Anlaufstellen.
7. **Tagebuch**: pseudonyme Notizen zur Selbstreflexion, nur lokal.
8. **Weitersagen**: QR-Code zur App (auch groß zum Vorzeigen), Link teilen, Aushang zum Ausdrucken. Der Code führt zur Adresse aus `app/config.json` (`url`); zieht die App um, dort und beim Vorgabewert in `app/app.js` ändern. Der Erzeuger in `app/qr.js` ist in `app/smoke.js` Punkt für Punkt gegen einen unabhängigen Erzeuger geprüft.

## Inhalte ändern

Inhalte in `app/data/` anpassen, dann `node app/validate.js` und `node app/build.js` ausführen.
