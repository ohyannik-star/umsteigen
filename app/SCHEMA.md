# Datenvertrag für die App-Inhalte

Jede Inhaltsdatei liegt unter `app/data/<name>.js`, ist reines JavaScript (kein Modul, kein JSON) und registriert sich so:

```js
window.APP_DATA = window.APP_DATA || {};
window.APP_DATA.<name> = { ... };
```

Regeln für alle Dateien:
- Sprache: Deutsch. Du-Ansprache gegenüber der nutzenden Person. Die angesprochene Person (das Gegenüber) wird als „die Person" oder „dein Gegenüber" bezeichnet, nie als Gegner, Feind oder Fall.
- IDs: nur Kleinbuchstaben, Ziffern und Bindestrich (`zuhoeren-1`). Keine Umlaute in IDs.
- Jede Aussage über Wirkung trägt eine Evidenzstufe: `"stark" | "mittel" | "schwach" | "umstritten"`.
- Quellen als `{ titel, url, jahr }`; `url` darf leer sein, wenn nicht verifiziert. Keine erfundenen Quellen.
- Keine HTML-Tags in Strings. Zeilenumbrüche nur als `\n` in längeren Texten.
- Datei muss ohne Syntaxfehler laden (`node --check app/data/<name>.js`).

## 1. `linien.js` – die Fahrplan-Netze (`APP_DATA.linien`, Array)

```js
{
  id: "gespraech",
  name: "Das Gespräch",              // Name ohne Nummer; die App nummeriert
  kurz: "Gespräch",                  // 1 Wort für Chips
  farbe: "#1d6fa5",                  // Linienfarbe, auf hell und dunkel lesbar
  ebene: "individuum" | "masse" | "beide",
  zielgruppe: "Angehörige, Freund:innen, Kolleg:innen",
  leitidee: "2–3 Sätze: Was diese Linie leistet und was nicht.",
  dauer: "Wochen bis Monate",
  voraussetzungen: ["..."],          // Was vor Abfahrt da sein muss
  stationen: [ /* Station */ ]
}
```

Station:

```js
{
  id: "zuhoeren",
  name: "Zuhören",
  pos: 0,                            // Spalte im Netzplan, 0-basiert, aufsteigend entlang der Hauptroute
  spur: 0,                           // 0 = Hauptroute, 1 = Abzweig oben, -1 = Abzweig unten
  ziel: "1 Satz: Was hier erreicht werden soll.",
  warum: "1–3 Sätze Evidenz in Alltagssprache.",
  evidenz: "stark",
  techniken: ["deep-canvassing", "motivational-interviewing"],   // IDs aus techniken.js
  schritte: ["konkrete Handlung 1", "konkrete Handlung 2"],       // 3–6 Einträge
  formulierungen: ["Beispielsatz 1", "Beispielsatz 2"],          // 2–5 wörtliche Sätze
  fehler: ["typischer Fehler 1"],                                // 2–4 Einträge
  signale_weiter: ["Woran du merkst, dass du weiterfahren kannst"],
  signale_stopp: ["Warnsignal: zurück, umsteigen oder Hilfe holen"],
  dauer: "2–3 Gespräche",
  weiter: [ { zu: "verstehen", wenn: "Die Person redet von sich aus weiter" } ],   // Verzweigung innerhalb der Linie
  umsteigen: [ { linie: "hilfe", station: "beratung", wenn: "Gewaltandrohung oder Waffen" } ] // Wechsel in andere Linie
}
```

Jede Linie hat 6–9 Stationen, davon mindestens 2 auf einer Abzweigspur, und mindestens 2 Umsteigepunkte. Die erste Station hat `pos: 0, spur: 0`. Eine Endstation hat `weiter: []`.

## 2. `techniken.js` – Wissensbasis (`APP_DATA.techniken`, Array)

```js
{
  id: "deep-canvassing",
  name: "Deep Canvassing",
  kurz: "1 Satz Kern.",
  evidenz: "stark",
  ebene: "individuum" | "masse" | "beide",
  beschreibung: "3–6 Sätze: Was es ist, warum es wirkt, Grenzen.",
  so_gehts: ["Schritt 1", "Schritt 2"],       // 3–7 Schritte
  beispiel: "Ein kurzer Dialogausschnitt oder Anwendungsfall, 3–6 Sätze.",
  nicht: ["Was dabei schiefgeht"],            // 2–4 Einträge
  quellen: [ { titel: "...", url: "...", jahr: "2016" } ]
}
```

## 3. `kompass.js` – Personen-Kompass (`APP_DATA.kompass`, Objekt)

Der Kompass fragt NICHT nach Identität, Namen oder Daten der Person, sondern nach beobachtbaren Treibern, der Beziehung und der Einbindungstiefe.

```js
{
  hinweis: "Kurzer Text, warum der Kompass keine Diagnose ist.",
  fragen: [
    {
      id: "f1",
      text: "Wenn die Person über Politik spricht, worum geht es meistens?",
      typ: "single" | "multi",
      optionen: [
        { id: "f1a", text: "Dass sie nicht gehört wird", gewichte: { anerkennung: 2, misstrauen: 1 } }
      ]
    }
  ],
  treiber: [
    {
      id: "anerkennung",
      name: "Anerkennung und Status",
      beduerfnis: "1 Satz: Welches legitime Bedürfnis dahinter steht.",
      beschreibung: "2–4 Sätze.",
      zugang: ["Was hilft"],            // 3–5
      vermeiden: ["Was schadet"],        // 2–4
      start: { linie: "gespraech", station: "zuhoeren" },
      techniken: ["technik-id"]
    }
  ],
  stufen: [
    { id: "sympathisant", name: "Sympathie", beschreibung: "...", hinweis: "Was das für dein Vorgehen bedeutet." }
  ],
  beziehung: [
    { id: "eng", name: "Enge Beziehung", hinweis: "..." }
  ],
  risiko: [
    { id: "gewalt", text: "Die Person droht mit Gewalt oder besitzt Waffen.", aktion: "Was jetzt zu tun ist, mit Anlaufstelle." }
  ]
}
```

Fragen: 8–12. Treiber: 6–8. Stufen: 4–5 (Sympathie, Wahl, Mitgliedschaft, Aktivismus, Kader o. ä.). Risiko: 4–6 Einträge. Die Frage zur Stufe hat `id: "stufe"`, die zur Beziehung `id: "beziehung"`, die zum Risiko `id: "risiko"` (multi); ihre Optionen-IDs entsprechen den IDs in `stufen`, `beziehung`, `risiko`.

## 4. `szenarien.js` – Gesprächstrainer (`APP_DATA.szenarien`, Array)

```js
{
  id: "familienessen",
  titel: "Beim Familienessen",
  ebene: "individuum",
  kontext: "2–4 Sätze Ausgangslage.",
  person: "1–2 Sätze: Wer das Gegenüber ist, ohne Klischee.",
  start: "k1",
  knoten: {
    k1: {
      aussage: "Was die Person sagt (wörtlich, realistisch, nicht karikiert).",
      optionen: [
        { text: "Deine mögliche Antwort", bewertung: "gut" | "ok" | "schlecht", feedback: "2–4 Sätze, warum und welche Technik.", technik: "technik-id", weiter: "k2" }
      ]
    },
    k2: { ... }
  }
}
```

6–8 Szenarien, je 4–6 Knoten, je Knoten 3 Optionen. Ein Endknoten hat `optionen: []` und ein Feld `abschluss: "Fazit 2–4 Sätze"`. Mindestens 2 Szenarien auf Massenebene (z. B. Bürgerversammlung, Haustürgespräch, Kommentarspalte).

## 5. `kampagne.js` – Kampagnenplaner (`APP_DATA.kampagne`, Objekt)

```js
{
  segmente: [
    { id: "protest", name: "Protestwählende", beschreibung: "...", motive: ["..."], erreichbar: "hoch" | "mittel" | "niedrig",
      wirkt: ["Botschaftsprinzip"], schadet: ["..."], kanaele: ["..."], botschafter: ["..."] }
  ],
  bausteine: [
    { id: "haustuer", name: "Haustürgespräche", typ: "format" | "kanal" | "botschaft" | "messung",
      beschreibung: "...", evidenz: "stark", aufwand: "niedrig" | "mittel" | "hoch", wirkung: "1 Satz",
      schritte: ["..."], fallstricke: ["..."], segmente: ["protest"], quellen: [ { titel, url, jahr } ] }
  ],
  phasen: [
    { id: "zuhoeren", name: "Zuhören", dauer: "4–8 Wochen", ziele: ["..."], bausteine: ["haustuer"], kennzahlen: ["gespraeche"] }
  ],
  kennzahlen: [
    { id: "gespraeche", name: "Geführte Gespräche", wie: "...", warum: "...", fallstrick: "..." }
  ],
  planer: {
    fragen: [
      { id: "ort", text: "Wo arbeitet ihr?", optionen: [ { id: "dorf", text: "Dorf oder Kleinstadt", empfiehlt: ["haustuer"], meidet: [] } ] }
    ]
  }
}
```

Segmente: 5–7. Bausteine: 12–18. Phasen: 4–5. Kennzahlen: 6–8. Planer-Fragen: 4–6 (Ort, Teamgröße, Zeit, Budget, Zugang zu Multiplikatoren, Ziel).

## 6. `leitplanken.js` – Ethik, Recht, Sicherheit (`APP_DATA.leitplanken`, Objekt)

```js
{
  grundsaetze: [ { id, titel, text, warum, quelle: { titel, url, jahr } } ],   // 8–12
  rote_linien: [ { id, text, stattdessen } ],                                   // 6–10
  gefahr: [ { id, signal, aktion, anlaufstelle } ],                             // 5–8
  selbstschutz: [ { id, titel, text } ],                                        // 5–8
  datenschutz: { kurz: "...", regeln: ["..."], hinweis_tagebuch: "..." }
}
```

## 7. `hilfe.js` – Anlaufstellen (`APP_DATA.hilfe`, Array)

```js
{ id, name, fuer: "Angehörige" | "Ausstieg" | "Kommune" | "Schule" | "Opfer" | "Notfall", region: "bundesweit" | "Bundesland", beschreibung, url, telefon: "" }
```

15–25 Einträge, nur verifizierte Angebote.

## 8. `messung.js` – Verlauf und Wirkung (`APP_DATA.messung`, Objekt)

```js
{
  stufen: [ { id, name, beschreibung, signale: ["beobachtbar"], naechster_schritt: "..." } ],   // 5–6 Stufen des Verlaufs
  instrumente: [ { id, name, wofuer, items: ["Aussage"], skala: "1–7", auswertung: "...", quelle: { titel, url, jahr } } ],  // 3–5 kurze Skalen
  kampagne: [ { id, name, wie, warum, fallstrick } ],   // darf mit kampagne.kennzahlen überlappen
  zeithorizont: "Realistischer Text, 3–5 Sätze."
}
```
