// Selbsttest „Wo stehe ich?“: Teil 1 „Was liegt dir?“ (Stärken) und Teil 2 „Wo stehst du politisch?“ (Thesen und Parteien).
// Parteipositionen stammen ausschließlich aus den Wahlprogrammen zur Bundestagswahl 2025 (Titel, Adresse, Seitenzahl und SHA-256 der Fassung in quellen).
// Jede klare Position (zu, ab, neutral) hat eine eigene Einordnung, ein kurzes wörtliches Zitat (§ 51 UrhG) und die Seite im PDF-Betrachter. Zitate: Urheberrecht bei den jeweiligen Parteien.
// pos: 'zu' (stimmt zu), 'ab' (lehnt ab), 'neutral', 'offen' (keine klare Aussage im Programm, ohne Zitat; die Partei bekommt dafür 1 von 2 Punkten, siehe stErgebnis in app.js).
// IDs von Fragen, Optionen und Thesen nie umbenennen oder neu vergeben: Gespeicherte Antworten hängen daran. Neue Optionen bekommen neue Buchstaben.
window.APP_DATA = window.APP_DATA || {};
window.APP_DATA.selbsttest = {
  stand: '2026-11-12',
  staerken: {
    fragen: [
      { id: 's1', text: 'Jemand haut eine steile These raus. Was tust du als Erstes?', optionen: [
        { id: 'a', text: 'Ich frage nach, wie die Person darauf kommt.', typ: { zuhoeren: 2 } },
        { id: 'b', text: 'Ich überlege, welche Fakten dagegen sprechen.', typ: { fakten: 2 } },
        { id: 'c', text: 'Ich merke mir den Satz und überlege später in Ruhe, was ich sage.', typ: { planen: 2 } },
        { id: 'd', text: 'Ich schaue, wer noch dabei ist und wie die anderen reagieren.', typ: { bruecken: 2 } },
        { id: 'e', text: 'Ich werde innerlich unruhig oder wütend.', typ: { kraft: 2 } }
      ] },
      { id: 's2', text: 'Was fällt dir am leichtesten?', optionen: [
        { id: 'a', text: 'Zuhören, ohne gleich zu widersprechen', typ: { zuhoeren: 2 } },
        { id: 'b', text: 'Zusammenhänge erklären', typ: { fakten: 2 } },
        { id: 'c', text: 'Ein Gespräch vorbereiten', typ: { planen: 2 } },
        { id: 'd', text: 'Andere für eine Sache gewinnen', typ: { bruecken: 2 } },
        { id: 'e', text: 'Ehrlich gesagt: gerade nichts davon', typ: { kraft: 2 } }
      ] },
      { id: 's3', text: 'Nach einem schwierigen Gespräch …', optionen: [
        { id: 'a', text: '… denke ich darüber nach, was die Person wirklich bewegt.', typ: { zuhoeren: 2 } },
        { id: 'b', text: '… suche ich Belege für das, was ich hätte sagen können.', typ: { fakten: 2 } },
        { id: 'c', text: '… überlege ich, wie ich es beim nächsten Mal anders mache.', typ: { planen: 2 } },
        { id: 'd', text: '… rede ich mit anderen darüber, wie wir damit umgehen.', typ: { bruecken: 2 } },
        { id: 'e', text: '… brauche ich erst einmal Abstand.', typ: { kraft: 2 } }
      ] },
      { id: 's4', text: 'Wie viel Kraft kosten dich diese Gespräche gerade?', optionen: [
        { id: 'a', text: 'Kaum, ich bleibe gelassen.', typ: { zuhoeren: 1, fakten: 1 } },
        { id: 'b', text: 'Etwas, aber es geht.', typ: { planen: 1, bruecken: 1 } },
        { id: 'c', text: 'Viel. Ich gehe ihnen lieber aus dem Weg.', typ: { kraft: 2 } },
        { id: 'd', text: 'So viel, dass ich schlecht schlafe oder ständig daran denke.', typ: { kraft: 4 } }
      ] },
      { id: 's5', text: 'Worüber würdest du am liebsten mehr wissen?', optionen: [
        { id: 'a', text: 'Warum Menschen so denken, wie sie denken', typ: { zuhoeren: 2 } },
        { id: 'b', text: 'Was an bestimmten Behauptungen dran ist', typ: { fakten: 2 } },
        { id: 'c', text: 'Welche Sätze im Gespräch wirklich helfen', typ: { planen: 2 } },
        { id: 'd', text: 'Was man in Nachbarschaft, Verein oder Schule tun kann', typ: { bruecken: 2 } },
        { id: 'e', text: 'Wie ich mich selbst schütze', typ: { kraft: 2 } }
      ] },
      { id: 's6', text: 'Mit wem willst du vor allem im Gespräch bleiben?', optionen: [
        { id: 'a', text: 'Mit einem Menschen, der mir nahesteht', typ: { zuhoeren: 1, planen: 1 } },
        { id: 'b', text: 'Mit Leuten, die im Netz oder im Bekanntenkreis Falsches verbreiten', typ: { fakten: 2 } },
        { id: 'c', text: 'Mit vielen: in Nachbarschaft, Verein, Schule oder Betrieb', typ: { bruecken: 2 } },
        { id: 'd', text: 'Im Moment eigentlich mit niemandem', typ: { kraft: 2 } }
      ] },
      { id: 's7', text: 'Welcher Satz passt am ehesten zu dir?', optionen: [
        { id: 'a', text: '„Ich will verstehen, nicht recht haben.“', typ: { zuhoeren: 2 } },
        { id: 'b', text: '„Was stimmt, gehört auf den Tisch.“', typ: { fakten: 2 } },
        { id: 'c', text: '„Gut vorbereitet ist halb gewonnen.“', typ: { planen: 2 } },
        { id: 'd', text: '„Gemeinsam geht mehr.“', typ: { bruecken: 2 } },
        { id: 'e', text: '„Ich brauche gerade selbst Halt.“', typ: { kraft: 2 } }
      ] },
      { id: 's8', text: 'Was wäre für dich ein gutes Ergebnis?', optionen: [
        { id: 'a', text: 'Wir reden wieder ehrlich miteinander.', typ: { zuhoeren: 2 } },
        { id: 'b', text: 'Die Person prüft ihre Quellen.', typ: { fakten: 2 } },
        { id: 'c', text: 'Ich weiß, was ich beim nächsten Mal sage.', typ: { planen: 2 } },
        { id: 'd', text: 'In meinem Umfeld halten mehr Leute zusammen.', typ: { bruecken: 2 } },
        { id: 'e', text: 'Ich komme mit der Situation besser klar.', typ: { kraft: 2 } }
      ] }
    ],
    // Reihenfolge bei Gleichstand: zuerst Kraft (Selbstschutz geht vor), dann die übrigen
    typen: [
      { id: 'kraft', name: 'Erst einmal Kraft tanken', staerke: 'Du merkst, dass dich das Thema mitnimmt. Das ehrlich zu sehen, ist eine Stärke: Wer erschöpft ins Gespräch geht, kann kaum zuhören.', tipp: 'Sorge zuerst für dich. Pausen sind erlaubt, auch lange, und du musst gerade kein schwieriges Gespräch führen. Sprich mit jemandem, dem du vertraust. Wenn dich das Thema nicht mehr loslässt oder du schlecht schläfst: Die Telefonseelsorge hilft rund um die Uhr, anonym und kostenlos, unter 0800 111 0 111 oder 0800 111 0 222.', hub: 'schutz', cta: 'Zu „Mich schützen & Grenzen setzen“' },
      { id: 'zuhoeren', name: 'Zuhören und verstehen', staerke: 'Du hörst zu, fragst nach und bleibst ruhig. Damit öffnest du Türen, die Argumente allein oft verschließen.', tipp: 'Zuhören heißt nicht, alles hinzunehmen. Du darfst deine Sicht und deine Grenze nennen, freundlich und klar.', hub: 'verstehen', cta: 'Zu „Verstehen & Einordnen“' },
      { id: 'fakten', name: 'Mit guten Argumenten', staerke: 'Du kennst dich aus und findest passende Fakten. Das gibt dir Sicherheit, wenn es um Behauptungen geht.', tipp: 'Fakten wirken am besten, wenn sich die Person vorher verstanden fühlt. Erst anerkennen, dann höchstens ein Fakt.', hub: 'argumentieren', cta: 'Zu „Argumentieren & Reagieren“' },
      { id: 'planen', name: 'Gut vorbereitet', staerke: 'Du gehst Gespräche gern mit einem Plan an und denkst einen Schritt voraus.', tipp: 'Gespräche laufen selten nach Plan. Übe auch, spontan und gelassen zu reagieren.', hub: 'vorbereiten', cta: 'Zu „Gespräche vorbereiten“' },
      { id: 'bruecken', name: 'Brücken bauen', staerke: 'Du bringst Menschen zusammen und denkst über das einzelne Gespräch hinaus.', tipp: 'Viele erreichst du über Vertrauen vor Ort, nicht über Aufrufe. Fang klein an, mit Leuten, die du kennst.', hub: 'aktiv', cta: 'Zu „Aktiv werden & Vernetzen“' }
    ]
  },
  // Aufnahme: alle Parteien mit mindestens 1 % der Zweitstimmen bei der Bundestagswahl 2025 (amtliches Endergebnis); Anzeige alphabetisch
  parteien: [
    { id: 'afd', name: 'AfD', lang: 'Alternative für Deutschland', ergebnis: '20,8 %', quellen: [{ id: 'afd', titel: 'Zeit für Deutschland. Programm der AfD für die Wahl zum 21. Deutschen Bundestag', url: 'https://www.afd.de/wp-content/uploads/2025/02/AfD_Bundestagswahlprogramm2025_web.pdf', seiten: 177, sha256: 'e2d0a944f54017aa432bcd0c069c7908aefb3ea65af4904e7f86ca7c7bd0d4bb' }] },
    { id: 'bsw', name: 'BSW', lang: 'Bündnis Sahra Wagenknecht – Vernunft und Gerechtigkeit (Name zur Wahl; heute: BSW – Bündnis Soziale Gerechtigkeit und Wirtschaftliche Vernunft)', ergebnis: '4,98 %', quellen: [{ id: 'bsw', titel: 'Unser Land verdient mehr! Wahlprogramm für die Bundestagswahl 2025', url: 'https://bsw-vg.de/wp-content/uploads/2026/02/BSW_Wahlprogramm_2025.pdf', seiten: 45, sha256: '5018fea279eab9942138090d75f21634faf13af5bc42081fad28f5fea4eb8ce1' }] },
    { id: 'cducsu', name: 'CDU/CSU', lang: 'Christlich Demokratische Union Deutschlands und Christlich-Soziale Union in Bayern', ergebnis: 'CDU 22,6 %, CSU 6,0 %', quellen: [{ id: 'cducsu', titel: 'Politikwechsel für Deutschland. Wahlprogramm von CDU und CSU', url: 'https://www.cdu.de/app/uploads/2025/01/km_btw_2025_wahlprogramm_langfassung_ansicht.pdf', seiten: 82, sha256: '08f751316e731b77aa2f18090b8695d88268f2942481399f37a3a47317361795' }] },
    { id: 'linke', name: 'Die Linke', lang: 'Die Linke', ergebnis: '8,8 %', quellen: [{ id: 'linke', titel: 'Wahlprogramm der Partei Die Linke zur Bundestagswahl 2025', url: 'https://www.die-linke.de/fileadmin/user_upload/Wahlprogramm_Langfassung_Linke-BTW25_01.pdf', seiten: 60, sha256: '301bd30a5fcd2a7e791adc4db5294e79d8f3fd71b8c9b080b057f14bf8cae600' }] },
    { id: 'fdp', name: 'FDP', lang: 'Freie Demokratische Partei', ergebnis: '4,3 %', quellen: [{ id: 'fdp', titel: 'Alles lässt sich ändern. Das Wahlprogramm der FDP zur Bundestagswahl 2025', url: 'https://www.fdp.de/sites/default/files/2024-12/fdp-wahlprogramm_2025.pdf', seiten: 52, sha256: 'a549dcb318f60fdd8a257fb2e68745d1df50151f4914910e2afde20c3b0fa039' }, { id: 'fdp-ergaenzung', titel: 'Ergänzende Beschlüsse zum Bundestagswahlprogramm 2025', url: 'https://www.fdp.de/sites/default/files/2025-01/2025-01-13_ergaenzende-beschluesse-zum-bundestagswahlprogramm-2025.pdf', seiten: 102, sha256: 'dabc560b32611172329040a34e8781cedf0647cbadba03752e779797ce67f51a' }] },
    { id: 'fw', name: 'Freie Wähler', lang: 'FREIE WÄHLER', ergebnis: '1,5 %', quellen: [{ id: 'fw', titel: 'Verantwortung für Deutschland. Bundestagswahlprogramm 2025–2029', url: 'https://ni.freiewaehler.eu/template/elemente/71/Verantwortung%20f%C3%BCr%20Deutschland_FREIE%20W%C3%84HLER%20Wahlprogramm%202025.pdf', seiten: 114, sha256: '5ea80dcf85a75654586c27ae06fdba73e144e063f845b8bbb736138e322d28c3' }] },
    { id: 'gruene', name: 'Grüne', lang: 'Bündnis 90/Die Grünen', ergebnis: '11,6 %', quellen: [{ id: 'gruene', titel: 'Zusammen wachsen. Regierungsprogramm 2025', url: 'https://cms.gruene.de/uploads/assets/20250318_Regierungsprogramm_DIGITAL_DINA5.pdf', seiten: 160, sha256: 'bf8d15021d8cc2695cb97d0d4a4bc9b7b93de54b86d491d8536b1325354dc213' }] },
    { id: 'spd', name: 'SPD', lang: 'Sozialdemokratische Partei Deutschlands', ergebnis: '16,4 %', quellen: [{ id: 'spd', titel: 'Mehr für Dich. Besser für Deutschland. Regierungsprogramm der SPD für die Bundestagswahl 2025', url: 'https://www.spd.de/fileadmin/Dokumente/Beschluesse/Programm/SPD_Programm_bf.pdf', seiten: 68, sha256: '05aeb9eb19fd423288d94de1d15cabcddbcb9bb1ecf65237657d10e4839b9d7e' }] }
  ],
  thesen: [
    {
      "id": "tempolimit-autobahn",
      "thema": "Verkehr",
      "text": "Auf allen Autobahnen soll ein allgemeines Tempolimit gelten.",
      "erklaerung": "Auf gut 70 Prozent der Autobahnstrecken gibt es keine feste Höchstgeschwindigkeit, nur die empfohlene Richtgeschwindigkeit von 130 km/h; vorgeschlagen werden Grenzen von 120 oder 130 km/h.",
      "positionen": {
        "afd": {
          "pos": "ab",
          "text": "Das Programm lehnt ein generelles Tempolimit auf Bundesautobahnen ab und will stattdessen vor allem Autobahnen und Brücken sanieren.",
          "zitat": "Die AfD lehnt ein generelles Tempolimit auf Bundesautobahnen strikt ab.",
          "seite": 45
        },
        "bsw": {
          "pos": "offen",
          "text": "Das Programm sagt dazu nichts Eindeutiges."
        },
        "cducsu": {
          "pos": "ab",
          "text": "Das Programm lehnt ein generelles Tempolimit auf deutschen Autobahnen ab.",
          "zitat": "Anti-Auto-Haltung, Fahrverbote für Innenstädte, das Umwidmen von Parkplätzen und ein generelles Tempolimit auf deutschen Autobahnen lehnen wir ab.",
          "seite": 74
        },
        "linke": {
          "pos": "zu",
          "text": "Das Programm fordert ein Tempolimit von 120 km/h auf Autobahnen sowie Tempo 30 innerorts außer auf Hauptverkehrsachsen.",
          "zitat": "Um Menschen und Klima zu schützen, brauchen wir endlich ein Tempolimit von 120 km/h auf Autobahnen und innerorts Tempo 30 – außer auf Hauptverkehrsachsen.",
          "seite": 37
        },
        "fdp": {
          "pos": "ab",
          "text": "Das Programm lehnt ein generelles Tempolimit auf Autobahnen ab und setzt im Straßenverkehr auf ausgewogene Regeln und gegenseitigen Respekt statt auf Verbote.",
          "zitat": "Wir Freie Demokraten lehnen ein generelles Tempolimit auf Autobahnen ab.",
          "seite": 41
        },
        "fw": {
          "pos": "offen",
          "text": "Das Programm sagt zu einem allgemeinen Tempolimit auf Autobahnen nichts Eindeutiges."
        },
        "gruene": {
          "pos": "zu",
          "text": "Das Programm fordert ein generelles Tempolimit von 130 km/h auf Autobahnen.",
          "zitat": "Ein Sicherheitstempo von 130 km/h auf Autobahnen als generelles Tempolimit ist deshalb überfällig.",
          "seite": 48
        },
        "spd": {
          "pos": "zu",
          "text": "Das Programm fordert die Einführung eines Tempolimits von 130 km/h auf Bundesautobahnen.",
          "zitat": "Wir wollen ein Tempolimit von 130 km/h auf Bundesautobahnen einführen.",
          "seite": 36
        }
      }
    },
    {
      "id": "cannabis-besitz-verbieten",
      "thema": "Gesellschaft",
      "text": "Der Besitz von Cannabis soll für Erwachsene wieder verboten werden.",
      "erklaerung": "Seit April 2024 dürfen Erwachsene bis zu 25 Gramm Cannabis mitführen, 50 Gramm zu Hause haben und drei Pflanzen anbauen, seit Juli 2024 auch über Vereine beziehen; Verkauf in Geschäften ist verboten.",
      "positionen": {
        "afd": {
          "pos": "zu",
          "text": "Das Programm bezeichnet die Freigabe des Cannabiskonsums außerhalb bestimmter medizinischer Anwendungen als Fehler, der umgehend korrigiert werden muss.",
          "zitat": "Die Freigabe des Cannabiskonsums außerhalb bestimmter medizinischer Indikationen halten wir für einen Fehler, der umgehend korrigiert werden muss.",
          "seite": 32
        },
        "bsw": {
          "pos": "offen",
          "text": "Das Programm sagt dazu nichts Eindeutiges."
        },
        "cducsu": {
          "pos": "zu",
          "text": "Das Programm will das Cannabisgesetz der Ampel abschaffen und die Legalisierung von Cannabis zurücknehmen.",
          "zitat": "Kiffen verboten. Die Ampel ist mit ihrem Cannabis-Gesetz gescheitert. […] Die Legalisierung dieser Droge nehmen wir deshalb zurück.",
          "seite": 39
        },
        "linke": {
          "pos": "ab",
          "text": "Das Programm fordert eine vollständige Legalisierung von Cannabis und will den Drogenkonsum insgesamt entkriminalisieren.",
          "zitat": "Wir wollen eine vollständige Legalisierung von Cannabis und die dafür notwendigen Änderungen auf EU- und UN-Ebene durchsetzen.",
          "seite": 20
        },
        "fdp": {
          "pos": "ab",
          "text": "Das Programm will an der Cannabis-Legalisierung festhalten und setzt bei Suchtmitteln auf Aufklärung statt auf eine Kriminalisierung des Konsums.",
          "zitat": "Bei Cannabis haben wir bereits einen entscheidenden ersten Schritt gemacht, der hilft, den Schwarzmarkt einzudämmen und zugleich Qualität und Jugendschutz zu sichern. Wir halten deshalb an der Cannabis-Legalisierung fest.",
          "seite": 34
        },
        "fw": {
          "pos": "ab",
          "text": "Das Programm hält die geltende Regelung mit Eigenanbau und Vereinen für einen Fehler und fordert stattdessen einen gesetzlich geregelten, legalen Verkauf von Cannabis in regulierten Fachgeschäften. Zugleich will es die Menge, die für den Eigenkonsum mitgeführt werden darf, verringern und die Schutzabstände zu Schulen vergrößern.",
          "zitat": "Wir setzen uns für einen gesetzlich normierten legalen Verkauf von Cannabis in regulierten Fachgeschäften ein, der die von der Bundesregierung geschaffenen Regelungen ablöst.",
          "seite": 55
        },
        "gruene": {
          "pos": "ab",
          "text": "Laut Programm stellt das Cannabisgesetz Bürgerrechte sowie Gesundheits- und Jugendschutz in den Mittelpunkt; die Partei hält zudem am Ziel fest, Cannabis in lizenzierten Fachgeschäften zu verkaufen.",
          "zitat": "An dem Ziel des Verkaufs von Cannabis in lizenzierten Fachgeschäften halten wir weiter fest und setzen uns auf europäischer und internationaler Ebene dafür ein, auch um damit den Schwarzmarkt und die Organisierte Kriminalität weiter einzudämmen.",
          "seite": 96
        },
        "spd": {
          "pos": "ab",
          "text": "Laut Programm sollen die notwendigen Schritte eingeleitet werden, um eine mit EU-Recht vereinbare Legalisierung von Cannabis zu ermöglichen.",
          "zitat": "Bei Cannabis wollen wir, um den Gesundheitsschutz, den Jugendschutz und den Kampf gegen die Organisierte Kriminalität zu verbessern, die notwendigen Schritte einleiten, um eine europarechtskonforme Legalisierung zu ermöglichen.",
          "seite": 46
        }
      }
    },
    {
      "id": "mindestlohn-15-euro",
      "thema": "Arbeit",
      "text": "Der Staat soll dafür sorgen, dass der Mindestlohn auf mindestens 15 Euro pro Stunde steigt.",
      "erklaerung": "Die Höhe schlägt eine Kommission aus Arbeitgebern und Gewerkschaften vor, die Regierung setzt sie per Verordnung um: 13,90 Euro seit Januar 2026, 14,60 Euro ab Januar 2027.",
      "positionen": {
        "afd": {
          "pos": "offen",
          "text": "Das Programm sagt zur Höhe des gesetzlichen Mindestlohns nichts Eindeutiges."
        },
        "bsw": {
          "pos": "zu",
          "text": "Das Programm fordert, den gesetzlichen Mindestlohn unverzüglich auf 15 Euro anzuheben; künftige Anpassungen sollen sich an 60 Prozent des Medianeinkommens orientieren.",
          "zitat": "Wir wollen den gesetzlichen Mindestlohn unverzüglich auf 15 Euro anheben.",
          "seite": 21
        },
        "cducsu": {
          "pos": "ab",
          "text": "Das Programm bekennt sich zum gesetzlichen Mindestlohn und zur unabhängigen Mindestlohnkommission, lehnt aber einen politisch festgelegten Mindestlohn ab.",
          "zitat": "Wir stehen zum gesetzlichen Mindestlohn und der unabhängigen Mindestlohnkommission. Lohnfindung muss weiterhin Sache der Sozialpartner sein und nicht der Politik. Einen politischen Mindestlohn lehnen wir ab.",
          "seite": 32
        },
        "linke": {
          "pos": "zu",
          "text": "Das Programm fordert, den gesetzlichen Mindestlohn auf mindestens 60 Prozent des mittleren Lohns anzuheben, was 2025 etwa 15 Euro entspräche, und spätestens 2026 einen Mindestlohn von 16 Euro.",
          "zitat": "Der gesetzliche Mindestlohn muss gemäß der Europäischen Richtlinie erhöht werden – auf mindestens 60 Prozent des mittleren Einkommens (Medianlohn). Das wären schon 2025 etwa 15 Euro. Um die Europäische Richtlinie klar zu erfüllen, fordern wir spätestens bis 2026 einen Mindestlohn von 16 Euro […]",
          "seite": 26
        },
        "fdp": {
          "pos": "ab",
          "text": "Das Programm lehnt politische Eingriffe in die Arbeit der unabhängigen Mindestlohnkommission ab; Löhne sollen zwischen Arbeitnehmern und Arbeitgebern ausgehandelt werden. Einen Betrag von 15 Euro nennt es nicht.",
          "zitat": "Löhne und Gehälter werden in der sozialen Marktwirtschaft zwischen Arbeitnehmern und Arbeitgebern ausgehandelt. Wir respektieren die Tarifautonomie und lehnen politische Eingriffe in die Arbeit der unabhängigen Mindestlohnkommission ab.",
          "seite": 18
        },
        "fw": {
          "pos": "ab",
          "text": "Laut Programm ist die Lohnfindung Sache der Sozialpartner, ohne politische Einflussnahme; den Mindestlohn oder eine bestimmte Höhe nennt es nicht.",
          "zitat": "Lohnfindung ist Sache der Sozialpartner und es gibt keine politische Einflussnahme.",
          "seite": 38
        },
        "gruene": {
          "pos": "zu",
          "text": "Das Programm fordert einen schrittweise steigenden Mindestlohn von zunächst 15 Euro im Jahr 2025, auch für unter 18-Jährige, und will den Referenzwert von 60 Prozent des Medianlohns im Mindestlohngesetz verankern.",
          "zitat": "Um die Inflation der vergangenen Jahre auszugleichen, braucht es jetzt einen schrittweise steigenden Mindestlohn von zunächst 15 Euro in 2025 und das auch für unter 18-Jährige.",
          "seite": 67
        },
        "spd": {
          "pos": "zu",
          "text": "Das Programm fordert, dass der Mindestlohn spätestens ab 2026 bei 15 Euro liegt; die Mindestlohnkommission soll dafür den EU-Referenzwert von 60 Prozent des mittleren Einkommens berücksichtigen.",
          "zitat": "Wir werden dafür sorgen, dass dieses europäische Recht von der Mindestlohnkommission künftig berücksichtigt wird. Dementsprechend muss der Mindestlohn spätestens ab 2026 bei 15 Euro liegen.",
          "seite": 23
        }
      }
    },
    {
      "id": "rundfunkbeitrag-senken",
      "thema": "Medien",
      "text": "Der Rundfunkbeitrag für ARD, ZDF und Deutschlandradio soll sinken.",
      "erklaerung": "Jede Wohnung zahlt derzeit 18,36 Euro im Monat. Über die Höhe entscheiden die Bundesländer; ob der Beitrag steigen muss, prüft gerade das Bundesverfassungsgericht auf Klage von ARD und ZDF.",
      "positionen": {
        "afd": {
          "pos": "zu",
          "text": "Das Programm fordert, den Rundfunkbeitrag abzuschaffen; der öffentlich-rechtliche Rundfunk soll nur noch eine gebührenfreie Grundversorgung anbieten.",
          "zitat": "So sind die Grunderwerbsteuer für Selbstnutzer, die Grundsteuer und der Rundfunkbeitrag (GEZ) aufzuheben […]",
          "seite": 37
        },
        "bsw": {
          "pos": "neutral",
          "text": "Das Programm lehnt eine Erhöhung des Rundfunkbeitrags ab und fordert eine grundlegende Reform des öffentlich-rechtlichen Rundfunks; eine Senkung des Beitrags fordert es nicht ausdrücklich.",
          "zitat": "Eine Erhöhung des Rundfunkbeitrags lehnen wir ab.",
          "seite": 41
        },
        "cducsu": {
          "pos": "offen",
          "text": "Das Programm sagt zur Höhe des Rundfunkbeitrags nichts Eindeutiges; es fordert eine schnellere Reform des öffentlich-rechtlichen Rundfunks und will ihn auf Sparsamkeit, mehr Meinungsvielfalt und Neutralität verpflichten."
        },
        "linke": {
          "pos": "neutral",
          "text": "Das Programm fordert keine allgemeine Senkung des Rundfunkbeitrags, will aber soziale Einrichtungen und Menschen mit Behinderung davon befreien; die Programmvielfalt des öffentlich-rechtlichen Rundfunks soll erhalten bleiben.",
          "zitat": "Soziale Einrichtungen und Menschen mit Behinderung wollen wir vom Rundfunkbeitrag befreien. Beitragsbefreiungen sollten für Berechtigte automatisch erfolgen.",
          "seite": 55
        },
        "fdp": {
          "pos": "zu",
          "text": "Das Programm will den Rundfunkbeitrag durch weniger Kanäle und den Abbau von Doppelstrukturen deutlich senken und junge Menschen in Ausbildung vom Beitrag befreien.",
          "zitat": "Durch eine Reduktion der Kanäle sowie den Abbau von Doppelstrukturen wollen wir den Rundfunkbeitrag deutlich senken.",
          "seite": 27
        },
        "fw": {
          "pos": "neutral",
          "text": "Das Programm bekennt sich zum öffentlich-rechtlichen Rundfunk und will, dass die Rundfunkteilnehmer künftig selbst über die Höhe des Rundfunkbeitrags entscheiden; eine Senkung fordert es nicht ausdrücklich.",
          "zitat": "Wir stehen zum öffentlich-rechtlichen Rundfunk. […] Konkret wollen wir, dass Rundfunkteilnehmer künftig die Besetzung der Rundfunkräte bestimmen. Über die Grundzüge des Programms, die Höhe des Rundfunkbeitrags sowie über die Intendanten müssen sie entscheiden.",
          "seite": 112
        },
        "gruene": {
          "pos": "offen",
          "text": "Das Programm sagt zur Höhe des Rundfunkbeitrags nichts Eindeutiges; es fordert eine auskömmliche Finanzierung des öffentlich-rechtlichen Rundfunks und bezieht sich dabei unter anderem auf die Vorschläge der Finanzkommission KEF."
        },
        "spd": {
          "pos": "offen",
          "text": "Das Programm sagt zur Höhe des Rundfunkbeitrags nichts Eindeutiges; es fordert, den öffentlich-rechtlichen Rundfunk durch eine auftragsgerechte, rechtssichere Finanzierung zu stärken."
        }
      }
    },
    {
      "id": "mietendeckel-bundesweit",
      "thema": "Wohnen",
      "text": "In Gegenden mit Wohnungsmangel sollen die Mieten per Bundesgesetz für mehrere Jahre eingefroren werden.",
      "erklaerung": "Ein Mietendeckel würde auch laufende Mieten einfrieren; die Mietpreisbremse (bis 2029) begrenzt nur neue Verträge. Berlins eigenen Deckel kippte 2021 das Bundesverfassungsgericht, weil der Bund zuständig ist.",
      "positionen": {
        "afd": {
          "pos": "ab",
          "text": "Das Programm lehnt Mietpreisbremse und Mietendeckel als staatliche Überregulierung ab.",
          "zitat": "Die AfD steht für ein ausgewogenes Mietrecht und lehnt staatliche Überregulierungen sowie Investitionshemmnisse wie die Mietpreisbremse oder den Mietendeckel ab.",
          "seite": 39
        },
        "bsw": {
          "pos": "zu",
          "text": "Das Programm fordert einen bundesweiten Mietendeckel und will die Mieten in Regionen, in denen Wohnraum mit normalem Einkommen nicht mehr bezahlbar ist, bis zum Ende des Jahrzehnts einfrieren.",
          "zitat": "In allen Regionen, in denen es nicht mehr möglich ist, sich mit einem normalen Einkommen adäquaten Wohnraum zu leisten, wollen wir die Mieten bis zum Ende des Jahrzehnts einfrieren.",
          "seite": 28
        },
        "cducsu": {
          "pos": "offen",
          "text": "Das Programm sagt zu einem Einfrieren der Mieten nichts Eindeutiges; es zählt Regeln zur Miethöhe zum Mieterschutz und setzt vor allem auf mehr und günstigeres Bauen."
        },
        "linke": {
          "pos": "zu",
          "text": "Das Programm fordert einen bundesweiten Mietendeckel und als Sofortmaßnahme den Ausschluss von Mieterhöhungen für sechs Jahre; in angespannten Wohnungsmärkten sollen besonders hohe Mieten gesenkt werden.",
          "zitat": "Als Sofortmaßnahme müssen Mieterhöhungen bundesweit für die nächsten sechs Jahre ausgeschlossen werden.",
          "seite": 8
        },
        "fdp": {
          "pos": "ab",
          "text": "Das Programm schließt einen bundesweiten Mietendeckel aus und will auch die Mietpreisbremse auslaufen lassen.",
          "zitat": "Um Anreize für den dringend notwendigen Neubau zu schaffen, durchbrechen wir die staatliche Regulierungsspirale im Mietmarkt. Einen bundesweiten Mietendeckel wird es mit uns nicht geben.",
          "seite": 44
        },
        "fw": {
          "pos": "ab",
          "text": "Das Programm lehnt einen Mietendeckel ab und setzt stattdessen auf mehr Wohnungsbau, neue Wohngenossenschaften und zweckgebundene Bürgeranleihen.",
          "zitat": "Statt für einen investitionsfeindlichen Mietendeckel stehen wir für zweckgebundene Bürgeranleihen nach Münchener Vorbild.",
          "seite": 85
        },
        "gruene": {
          "pos": "zu",
          "text": "Das Programm will in angespannten Wohnungsmärkten einen Mietenstopp ermöglichen; wie lange er gelten und wer ihn verhängen soll, sagt es nicht. Außerdem soll die Mietpreisbremse verlängert und verschärft und die Kappungsgrenze für Mieterhöhungen gesenkt werden.",
          "zitat": "Kommunen sollen angespannte Wohnungsmärkte eigenständig nachweisen können. Wir werden in angespannten Wohnungsmärkten einen Mietenstopp ermöglichen.",
          "seite": 69
        },
        "spd": {
          "pos": "neutral",
          "text": "Das Programm will Mieterhöhungen in angespannten Wohnungsmärkten auf höchstens sechs Prozent in drei Jahren begrenzen, die Mietpreisbremse unbefristet verlängern und den Ländern stärkere eigene Begrenzungen erlauben; ein Einfrieren der Mieten fordert es nicht.",
          "zitat": "Deswegen wollen wir, dass in Gebieten mit angespanntem Wohnungsmarkt nur eine maximale Mietsteigerung von sechs Prozent in drei Jahren bis zur ortsüblichen Vergleichsmiete gestattet ist.",
          "seite": 21
        }
      }
    },
    {
      "id": "atomkraft-zurueck",
      "thema": "Klima und Energie",
      "text": "In Deutschland sollen wieder Kernkraftwerke (Atomkraftwerke) Strom erzeugen dürfen.",
      "erklaerung": "Die letzten drei deutschen Kernkraftwerke wurden im April 2023 abgeschaltet und werden zurückgebaut; gemeint ist sowohl das Wiederanfahren alter als auch der Bau neuer Kraftwerke.",
      "positionen": {
        "afd": {
          "pos": "zu",
          "text": "Das Programm fordert den Wiedereinstieg in die Kernenergie und den Bau neuer Kernkraftwerke.",
          "zitat": "Die AfD wird in Deutschland neue, dringend benötigte Kernforschungszentren und Kernkraftwerke schaffen, um seine führende Position in der Kerntechnik zurückzugewinnen.",
          "seite": 166
        },
        "bsw": {
          "pos": "ab",
          "text": "Das Programm lehnt den Neubau konventioneller Atomkraftwerke und derzeit auch kleiner modularer Reaktoren ab; die Forschung zur Kernfusion will es verstärken. Zum Wiederanfahren abgeschalteter Kraftwerke äußert es sich nicht.",
          "zitat": "Den Neubau konventioneller Atomkraftwerke lehnen wir ab. Dasselbe gilt derzeit für Mini-Kraftwerke (SMR), deren Betrieb bis zu 30-mal mehr radioaktive Abfälle erzeugt als konventionelle Reaktoren.",
          "seite": 11
        },
        "cducsu": {
          "pos": "zu",
          "text": "Das Programm will an der Option Kernenergie festhalten, setzt auf Forschung zu neuen Reaktortypen und will prüfen, ob die zuletzt abgeschalteten Kernkraftwerke wieder in Betrieb gehen können.",
          "zitat": "Wir halten an der Option Kernenergie fest. Dabei setzen wir auf die Forschung zu Kernenergie der vierten und fünften Generation, Small Modular Reactors und Fusionskraftwerken. Die Wiederaufnahme des Betriebs der zuletzt abgeschalteten Kernkraftwerke prüfen wir.",
          "seite": 4
        },
        "linke": {
          "pos": "ab",
          "text": "Das Programm lehnt eine Rückkehr zur Atomkraft ab und will den Atomausstieg im Grundgesetz festschreiben.",
          "zitat": "Kein Rollback, sondern Atomausstieg sofort: Wir wollen den Ausstieg aus der Atomkraft im Grundgesetz festschreiben und die Fertigung von Uranbrennstoff in den Atomfabriken in Gronau und Lingen beenden.",
          "seite": 33
        },
        "fdp": {
          "pos": "zu",
          "text": "Das Programm will die Wiederinbetriebnahme vorhandener Kernkraftwerke rechtlich ermöglichen und die Entscheidung den Betreibern überlassen; Kernkraftwerke neuer Bauart sollen ohne Subventionen gebaut werden können.",
          "zitat": "Wir wollen die Wiederinbetriebnahme der vorhandenen Kernkraftwerke rechtlich ermöglichen und die Entscheidung darüber den Betreibern überlassen.",
          "seite": 18
        },
        "fw": {
          "pos": "neutral",
          "text": "Das Programm nennt die wissenschaftliche Weiterentwicklung von Kernkraft- und Kernfusionsoptionen ein unverzichtbares Potenzial, fordert aber nicht, dass wieder Kernkraftwerke Strom erzeugen; an anderer Stelle geht es vom Atomausstieg aus.",
          "zitat": "Grundlastfähige Kraftwerke sowie Forschung, Entwicklung und Anwendung im Bereich Wasserstoff und die wissenschaftliche Weiterentwicklung von Kernkraft- und Kernfusionsoptionen stellen unverzichtbare Potenziale für eine klimaneutrale Energieversorgung dar.",
          "seite": 46
        },
        "gruene": {
          "pos": "ab",
          "text": "Das Programm lehnt eine Rückkehr zur Atomkraft ab und will den Atomausstieg vollenden, unter anderem durch ein Ende von Brennelementefertigung und Urananreicherung in Deutschland.",
          "zitat": "Eine Rückkehr zur Hochrisikotechnologie Atomkraft ist weder für das Erreichen der Klimaziele noch für die Versorgungssicherheit notwendig und für uns aufgrund der ungeklärten Endlagerfrage, der Kosten und der Gefahr der Verbreitung von atomwaffenfähigem Material keine Option.",
          "seite": 43
        },
        "spd": {
          "pos": "ab",
          "text": "Das Programm begrüßt, dass die Atomkraftwerke in Deutschland stillgelegt sind, und will nun die sichere Endlagerung voranbringen.",
          "zitat": "Die Atomkraft in Deutschland ist stillgelegt und das ist gut so. Jetzt braucht es die sichere Endlagerung der radioaktiven Stoffe.",
          "seite": 53
        }
      }
    },
    {
      "id": "buergerversicherung",
      "thema": "Gesundheit",
      "text": "Alle, auch Beamte und Selbstständige, sollen in dieselbe gesetzliche Krankenversicherung einzahlen.",
      "erklaerung": "Heute können sich Beamte, Selbstständige und Angestellte mit hohem Einkommen (2026 ab 77.400 Euro im Jahr) privat versichern. Mit „Bürgerversicherung“ meinen Parteien Verschiedenes: eine gesetzliche Versicherung für alle oder einen Finanzausgleich, an dem auch die privaten Versicherungen beteiligt sind. Gegner sprechen von Einheitskasse.",
      "positionen": {
        "afd": {
          "pos": "offen",
          "text": "Das Programm sagt zu einer gemeinsamen gesetzlichen Krankenversicherung für alle, auch für Beamte und Selbstständige, nichts Eindeutiges."
        },
        "bsw": {
          "pos": "zu",
          "text": "Das Programm fordert eine Bürgerversicherung, in die alle Bürger nach ihrem Einkommen einzahlen und gleiche Leistungen erhalten, und die Abschaffung der Zusatzbeiträge.",
          "zitat": "Wir fordern die Abschaffung der Zusatzbeiträge und die Einführung einer Bürgerversicherung, in die alle Bürger nach ihrem Einkommen einzahlen und grundsätzlich gleiche Leistungen auf dem Niveau der höchsten medizinischen Standards erhalten.",
          "seite": 26
        },
        "cducsu": {
          "pos": "ab",
          "text": "Das Programm bekennt sich zum Nebeneinander von gesetzlicher und privater Krankenversicherung.",
          "zitat": "Wir stehen dabei zu den Grundpfeilern des deutschen Gesundheitssystems mit seiner bewährten Selbstverwaltung, zur Dualität von gesetzlicher und privater Krankenversicherung […]",
          "seite": 69
        },
        "linke": {
          "pos": "zu",
          "text": "Das Programm fordert eine solidarische Gesundheits- und Pflegeversicherung, in die alle einzahlen; Privatversicherte sollen in die gesetzliche Krankenversicherung übernommen werden.",
          "zitat": "Wir setzen uns für eine solidarische Gesundheits- und Pflegeversicherung ein. Alle zahlen ein, Beiträge werden auf alle Einkommen erhoben, alle werden gut versorgt. […] Privatversicherte werden in die gesetzliche Krankenversicherung übernommen.",
          "seite": 18
        },
        "fdp": {
          "pos": "ab",
          "text": "Das Programm bekennt sich zum dualen System aus gesetzlicher und privater Krankenversicherung und lehnt eine Bürgerversicherung ab.",
          "zitat": "Wir bekennen uns zum dualen System aus gesetzlicher (GKV) und privater (PKV) Krankenversicherung. Daher lehnen wir eine Einheitskasse (sog. Bürgersversicherung) ab.",
          "seite": 33
        },
        "fw": {
          "pos": "offen",
          "text": "Das Programm sagt zu einer gemeinsamen Krankenversicherung für alle nichts Eindeutiges; es fordert unter anderem, dass sich private Krankenversicherungen an den Vorhaltekosten medizinischer Einrichtungen beteiligen."
        },
        "gruene": {
          "pos": "neutral",
          "text": "Das Programm nennt als Ziel eine Bürgerversicherung, die die Privatversicherten in den solidarischen Finanzausgleich des Gesundheitssystems einbezieht; für Beamte will es die Wahlfreiheit stärken. Dass alle in dieselbe gesetzliche Krankenversicherung einzahlen, fordert es nicht ausdrücklich.",
          "zitat": "Unser Ziel ist die Bürgerversicherung, die neben den gesetzlich Krankenversicherten auch die Privatver- […] sicherten in den solidarischen Finanzausgleich des Gesundheitssystems einbezieht.",
          "seite": 93
        },
        "spd": {
          "pos": "neutral",
          "text": "Das Programm setzt auf eine solidarische Bürgerversicherung, in der gesetzliche Krankenkassen und private Krankenversicherungen gemeinsam ein System bilden; die privaten Versicherungen sollen zum Finanzausgleich beitragen, Bundesbeamte ein Wahlrecht zur gesetzlichen Krankenversicherung erhalten. Dass alle in dieselbe gesetzliche Krankenversicherung einzahlen, fordert es nicht ausdrücklich.",
          "zitat": "Krankenkassen und private Krankenversicherungen bilden so ein System einer solidarischen Bürgerversicherung aus, an dem alle beteiligt sind und mit dem für alle die medizinische und pflegerische Versorgung sowie der Zugang zu dieser Versorgung gleichermaßen sichergestellt ist.",
          "seite": 29
        }
      }
    },
    {
      "id": "zurueckweisung-an-grenzen",
      "thema": "Migration",
      "text": "Asylsuchende, die aus einem Nachbarland kommen, sollen an der deutschen Grenze grundsätzlich abgewiesen werden.",
      "erklaerung": "Nach EU-Recht ist meist das Land fürs Asylverfahren zuständig, in dem jemand zuerst EU-Boden betrat. Seit Mai 2025 weist Deutschland auch Asylsuchende teils an der Grenze zurück; das ist rechtlich umstritten.",
      "positionen": {
        "afd": {
          "pos": "zu",
          "text": "Das Programm fordert, die deutschen Grenzen wieder selbst zu kontrollieren und illegal einreisende Personen an der Grenze zurückzuweisen; die Einreise zum Asylantrag aus einem sicheren Drittstaat hält es für rechtlich ausgeschlossen.",
          "zitat": "Wir werden stattdessen unsere Grenzen wieder selbst kontrollieren und die Bundespolizei als Grenzbehörde einsetzen, um illegale Einreisen wirksam zu unterbinden und illegal einreisende Personen konsequent an der Grenze zurückweisen zu können.",
          "seite": 104
        },
        "bsw": {
          "pos": "zu",
          "text": "Laut Programm soll gelten: Wer aus einem sicheren Drittstaat einreist, hat kein Recht auf Aufenthalt, keinen Anspruch auf ein Asylverfahren und keinen Anspruch auf Sozialleistungen. Das Wort Zurückweisung verwendet es nicht.",
          "zitat": "Wer aus einem sicheren Drittstaat einreist, hat kein Recht auf Aufenthalt. Wer kein Recht auf Aufenthalt hat, hat keinen Anspruch auf […] ein Asylverfahren und auch keinen Anspruch auf soziale Leistungen.",
          "seite": 36
        },
        "cducsu": {
          "pos": "zu",
          "text": "Das Programm will die deutschen Grenzen kontrollieren und Menschen, die aus einem anderen EU- oder Schengen-Staat einreisen und in Deutschland Asyl beantragen wollen, an der Grenze zurückweisen.",
          "zitat": "Wir kontrollieren die deutschen Staatsgrenzen und setzen konsequente Zurückweisungen an der Grenze durch.",
          "seite": 6
        },
        "linke": {
          "pos": "ab",
          "text": "Das Programm hält systematische Kontrollen an den Binnengrenzen und Zurückweisungen von Schutzsuchenden an den Grenzen für unzulässig.",
          "zitat": "Systematische Binnengrenzkontrollen und Zurückweisungen von Schutzsuchenden an den Grenzen sind unzulässig.",
          "seite": 53
        },
        "fdp": {
          "pos": "neutral",
          "text": "Das Programm unterstützt, Zurückweisungen an den deutschen Außengrenzen modellhaft zu erproben; eine generelle Zurückweisung von Asylsuchenden fordert es nicht.",
          "zitat": "Als Freie Demokraten unterstützen wir die modellhafte Erprobung von Zurückweisungen an den deutschen Außengrenzen, um alle rechtlichen Möglichkeiten zur Begrenzung der irregulären Migration auszuschöpfen.",
          "seite": 28
        },
        "fw": {
          "pos": "zu",
          "text": "Das Programm fordert, dass die Bundespolizei illegale Migration an den deutschen Grenzen gezielt zurückweist, solange der Schutz der EU-Außengrenzen nicht funktioniert und Nachbarländer Migranten nach Deutschland weiterreisen lassen.",
          "zitat": "Solange der EU-Außengrenzschutz sichtbar nicht funktioniert und auch Nachbarländer illegale Migranten nach Deutschland „durchwinken“, muss Deutschland durch die Bundespolizei illegale Migration an den deutschen Grenzen gezielt zurückweisen.",
          "seite": 49
        },
        "gruene": {
          "pos": "ab",
          "text": "Laut Programm gelten das Recht auf Einzelfallprüfung und das Nichtzurückweisungsgebot immer und überall; dauerhafte stationäre Kontrollen an den EU-Binnengrenzen lehnt es ab.",
          "zitat": "Unsere Haltung ist klar: Das Recht auf Einzelfallprüfung und das Nichtzurückweisungsgebot gelten immer und überall.",
          "seite": 131
        },
        "spd": {
          "pos": "ab",
          "text": "Laut Programm widersprechen Grenzschließungen und pauschale Zurückweisungen an den EU-Binnengrenzen dem Gedanken eines gemeinsamen europäischen Rechtsraums; Binnengrenzkontrollen sollen die absolute Ausnahme bleiben.",
          "zitat": "Grenzschließungen und Pauschalzurückweisungen an den Binnengrenzen widersprechen dem Geist eines gemeinsamen Raums der Freiheit, der Sicherheit und des Rechts.",
          "seite": 55
        }
      }
    },
    {
      "id": "vermoegensteuer",
      "thema": "Wirtschaft und Steuern",
      "text": "Auf sehr große Vermögen soll wieder eine Vermögensteuer erhoben werden.",
      "erklaerung": "Die Vermögensteuer wird seit 1997 nicht mehr erhoben, nachdem das Bundesverfassungsgericht die ungleiche Bewertung von Vermögen beanstandet hatte; Parteien schlagen Freibeträge von 1 bis 25 Millionen Euro vor.",
      "positionen": {
        "afd": {
          "pos": "ab",
          "text": "Das Programm will die derzeit ausgesetzte Vermögensteuer abschaffen.",
          "zitat": "Die AfD will die derzeit zur Erhebung ausgesetzte Vermögensteuer sowie die Erbschaftssteuer abschaffen.",
          "seite": 61
        },
        "bsw": {
          "pos": "zu",
          "text": "Das Programm will die Vermögensteuer für Vermögen ab 25 Millionen Euro mit einem Satz von 1 Prozent wieder erheben, ansteigend auf 2 Prozent ab 100 Millionen und 3 Prozent ab 1 Milliarde Euro.",
          "zitat": "Die Vermögenssteuer wollen wir für Vermögen ab 25 Millionen Euro mit einem Steuersatz von 1 Prozent reaktivieren, der ab 100 Millionen Euro Vermögen auf 2 Prozent und ab 1 Mrd. Euro auf 3 Prozent steigt.",
          "seite": 17
        },
        "cducsu": {
          "pos": "ab",
          "text": "Das Programm lehnt eine Vermögensteuer ab.",
          "zitat": "Wir wollen Menschen, die sich etwas erarbeitet und aufgebaut haben, nicht bestrafen. Stattdessen wollen wir alle Menschen beim Aufbau eines eigenen Vermögens unterstützen. Eine Vermögensteuer lehnen wir ab.",
          "seite": 34
        },
        "linke": {
          "pos": "zu",
          "text": "Das Programm fordert die Wiedereinführung der Vermögensteuer mit einem Freibetrag von einer Million Euro pro Person für Privatvermögen und fünf Millionen Euro für Betriebsvermögen.",
          "zitat": "Die Linke fordert, dass die Vermögensteuer wieder eingeführt wird. Damit wir nur die reichsten 2,5 Prozent unserer Gesellschaft belasten, fordern wir einen Freibetrag für Privatvermögen von einer Million Euro pro Person […]",
          "seite": 10
        },
        "fdp": {
          "pos": "ab",
          "text": "Das Programm lehnt jede Form einer Vermögensteuer oder Vermögensabgabe ab.",
          "zitat": "Wir lehnen jede Form einer Vermögensteuer oder Vermögensabgabe ab.",
          "seite": 14
        },
        "fw": {
          "pos": "offen",
          "text": "Das Programm sagt zur Vermögensteuer nichts Eindeutiges."
        },
        "gruene": {
          "pos": "neutral",
          "text": "Das Programm nennt eine nationale Vermögensteuer auf sehr hohe Vermögen als einen möglichen Ansatz, zählt sie aber nicht zu den Maßnahmen, auf die es sich konzentriert (vor allem Reform der Erbschaftsteuer und globale Milliardärssteuer).",
          "zitat": "Zu möglichen Ansätzen gehören: eine globale Milliardärssteuer, eine fairere Erbschaftssteuer, eine gerechte Immobilienbesteuerung ohne Schlupflöcher und eine nationale Vermögenssteuer auf sehr hohe Vermögen.",
          "seite": 73
        },
        "spd": {
          "pos": "zu",
          "text": "Das Programm will die ausgesetzte Vermögensteuer für sehr hohe Vermögen wieder erheben.",
          "zitat": "Die ausgesetzte Vermögensteuer wollen wir für sehr hohe Vermögen revitalisieren.",
          "seite": 19
        }
      }
    },
    {
      "id": "wehrpflicht-wieder-einfuehren",
      "thema": "Bundeswehr und Ukraine",
      "text": "Der Wehrdienst soll wieder verpflichtend sein (allgemeine Wehrpflicht).",
      "erklaerung": "Die Wehrpflicht ist seit 2011 ausgesetzt. Seit 2026 müssen 18-jährige Männer einen Fragebogen ausfüllen, auch die Musterung wird für sie wieder Pflicht; gedient wird freiwillig.",
      "positionen": {
        "afd": {
          "pos": "zu",
          "text": "Das Programm will die Wehrpflicht wieder einsetzen, einschließlich des Ersatzdienstes.",
          "zitat": "Daher wollen wir die Wehrpflicht wieder einsetzen. Diese beinhaltet gemäß aktueller Gesetzeslage auch den Ersatzdienst.",
          "seite": 89
        },
        "bsw": {
          "pos": "ab",
          "text": "Das Programm lehnt die Wiedereinführung einer Wehrpflicht ab.",
          "zitat": "Wir lehnen die Wiedereinführung einer Wehrpflicht ab.",
          "seite": 6
        },
        "cducsu": {
          "pos": "zu",
          "text": "Das Programm will die Wehrpflicht schrittweise wieder einführen und perspektivisch ein verpflichtendes Gesellschaftsjahr; zum Grundwehrdienst einberufen werden sollen aus dem Kreis der Gemusterten die benötigten Tauglichen, die ihre Bereitschaft zum Wehrdienst signalisiert haben.",
          "zitat": "Wir führen eine aufwachsende Wehrpflicht ein. Das ist notwendig für Frieden und Sicherheit unseres Landes.",
          "seite": 8
        },
        "linke": {
          "pos": "ab",
          "text": "Das Programm lehnt eine Wiedereinführung der Wehrpflicht ab.",
          "zitat": "Wir stellen uns gegen eine Militarisierung der Gesellschaft: keine Wiedereinführung der Wehrpflicht, kein Werben fürs Sterben an Schulen, auf Bildungsmessen, an Universitäten oder per Briefsendungen.",
          "seite": 23
        },
        "fdp": {
          "pos": "ab",
          "text": "Das Programm lehnt die Wiedereinsetzung der allgemeinen Wehrpflicht ab und setzt auf eine Freiwilligenarmee mit starker Reserve sowie eine Datenbank zur Erfassung wehrfähiger Männer und Frauen.",
          "zitat": "Die Wiedereinsetzung der allgemeinen Wehrpflicht lehnen wir ab.",
          "seite": 48
        },
        "fw": {
          "pos": "neutral",
          "text": "Laut Programm wurde mit der Aussetzung der Wehrpflicht ein gesellschaftliches Bindeglied ohne Not aufgegeben; es fordert ein Gesellschaftsjahr für Frauen und Männer mit freier Wahl zwischen Bundeswehr, Katastrophenschutz, Feuerwehr und anderen Blaulichtorganisationen sowie sozialem Bereich.",
          "zitat": "Wir fordern deshalb ein Gesellschaftsjahr für Frauen und Männer. Dabei soll es eine Wahlfreiheit zwischen dem Dienst in der Bundeswehr, im Katastrophenschutz, bei der Feuerwehr und weiteren Blaulichtorganisationen sowie im sozialen Bereich geben.",
          "seite": 69
        },
        "gruene": {
          "pos": "ab",
          "text": "Das Programm lehnt die Wiedereinführung des allgemeinen Grundwehrdienstes ab und will stattdessen den freiwilligen Wehrdienst und die Reserve attraktiver machen; für den Verteidigungsfall ist eine neue Form der Wehrerfassung vorgesehen.",
          "zitat": "Statt den aus guten Gründen seit 2011 ausgesetzten allgemeinen Grundwehrdienst wieder einzuführen, wollen wir den freiwilligen Wehrdienst und die Reserve […] attraktiver machen […]",
          "seite": 154
        },
        "spd": {
          "pos": "ab",
          "text": "Laut Programm soll ein neuer, flexibler Wehrdienst eingeführt werden, der auf Freiwilligkeit beruht; zudem sollen die Grundlagen für eine Wehrerfassung geschaffen werden.",
          "zitat": "Angesichts der veränderten sicherheitspolitischen Lage plant die SPD die Einführung eines neuen, flexiblen Wehrdienstes. Der neue Wehrdienst soll auf Freiwilligkeit basieren und sich dabei am Bedarf der Bundeswehr orientieren.",
          "seite": 58
        }
      }
    },
    {
      "id": "abtreibung-ausserhalb-strafrecht",
      "thema": "Gesellschaft",
      "text": "Schwangerschaftsabbrüche in den ersten zwölf Wochen sollen außerhalb des Strafgesetzbuchs geregelt werden.",
      "erklaerung": "Laut Strafgesetzbuch ist ein Abbruch grundsätzlich rechtswidrig, aber bis zwölf Wochen nach der Empfängnis mit Pflichtberatung straffrei. Reformvorschläge wollen ihn in dieser Zeit rechtmäßig machen.",
      "positionen": {
        "afd": {
          "pos": "ab",
          "text": "Das Programm will die Regelungen zum Schwangerschaftsabbruch im Strafgesetzbuch (§ 218 ff.) unverändert lassen und nur konsequenter umsetzen.",
          "zitat": "Aus Sicht der AfD sind die Regelungen der §218 ff StGB ausgewogen und bedürfen keiner Änderung, lediglich einer konsequenten Umsetzung.",
          "seite": 150
        },
        "bsw": {
          "pos": "neutral",
          "text": "Das Programm verlangt, die freie, selbstbestimmte Entscheidung über ein Kind zu garantieren, und fordert die grundsätzliche Straffreiheit von Schwangerschaftsabbrüchen bis zur 12. Woche; ob die Regelung außerhalb des Strafgesetzbuchs erfolgen soll, sagt es nicht.",
          "zitat": "Die freie, selbstbestimmte Entscheidung über den eigenen Körper und darüber, ein Kind zu haben oder nicht, muss garantiert sein. Das BSW fordert die grundsätzliche Straffreiheit des Schwangerschaftsabbruchs bis zur 12. Woche.",
          "seite": 34
        },
        "cducsu": {
          "pos": "ab",
          "text": "Das Programm will Paragraf 218 und die geltende Rechtslage zum Schwangerschaftsabbruch beibehalten.",
          "zitat": "Paragraf 218 bleibt. Die geltende Rechtslage zum Schwangerschaftsabbruch bildet einen mühsam gefundenen gesellschaftlichen Kompromiss ab, der das Selbstbestimmungsrecht der Frau und den Schutz des ungeborenen Kindes berücksichtigt. Zu dieser Rechtslage stehen wir.",
          "seite": 64
        },
        "linke": {
          "pos": "zu",
          "text": "Das Programm fordert, § 218 StGB ersatzlos zu streichen und den Schwangerschaftsabbruch als Teil der Gesundheitsversorgung zu behandeln; Beratung soll freiwillig sein.",
          "zitat": "§ 218 StGB muss ersatzlos gestrichen werden. […] Der Schwangerschaftsabbruch muss als medizinischer Eingriff gelten, der zur gesundheitlichen Versorgung dazugehört.",
          "seite": 46
        },
        "fdp": {
          "pos": "neutral",
          "text": "Laut Programm soll über eine Reform der Paragrafen 218 und 218a StGB im Bundestag mit fraktionsübergreifenden Gruppenanträgen und freier Gewissensentscheidung beraten werden; eine eigene Festlegung trifft es nicht. Die Versorgung ungewollt Schwangerer will es verbessern.",
          "zitat": "Eine Reform der Regelungen zum Schwangerschaftsabbruch (§§218, 218a StGB) soll im Wege von sog. fraktionsübergreifenden Gruppenanträgen mit Gewissensfreiheit für jede Abgeordnete und jeden Abgeordneten im nächsten Bundestag beraten werden.",
          "seite": 29
        },
        "fw": {
          "pos": "neutral",
          "text": "Laut Programm soll keine Frau wegen eines Schwangerschaftsabbruchs strafbar gemacht werden, die verpflichtende Schwangerschaftskonfliktberatung soll erhalten bleiben und der Zugang zu sicherer medizinischer Versorgung flächendeckend sein. Ob der Abbruch außerhalb des Strafgesetzbuchs geregelt werden soll, sagt es nicht ausdrücklich.",
          "zitat": "Keine Frau sollte wegen des Abbruchs ihrer Schwangerschaft strafbar gemacht werden. Schwangere brauchen beste Betreuung und Rechtssicherheit. Die verpflichtende Schwangerschaftskonfliktberatung ist von herausragender Bedeutung und muss zwingend erhalten bleiben.",
          "seite": 82
        },
        "gruene": {
          "pos": "zu",
          "text": "Das Programm fordert, selbstbestimmte Schwangerschaftsabbrüche grundsätzlich außerhalb des Strafrechts zu regeln; in der Frühphase der Schwangerschaft soll der Abbruch rechtmäßig sein.",
          "zitat": "Wir wollen, dass selbstbestimmte Schwangerschaftsabbrüche nicht mehr in § 218 des Strafgesetzbuches kriminalisiert, sondern grundsätzlich außerhalb des Strafrechts geregelt werden.",
          "seite": 120
        },
        "spd": {
          "pos": "zu",
          "text": "Das Programm will Schwangerschaftsabbrüche entkriminalisieren und außerhalb des Strafrechts regeln, ausgenommen Abbrüche gegen oder ohne den Willen der Schwangeren.",
          "zitat": "Wir werden Schwangerschaftsabbrüche entkriminalisieren und außerhalb des Strafrechts regeln – außer wenn sie gegen oder ohne den Willen der Schwangeren erfolgen.",
          "seite": 48
        }
      }
    },
    {
      "id": "rente-aktien",
      "thema": "Rente",
      "text": "Der Staat soll Geld für die Altersvorsorge der Bürger am Aktienmarkt anlegen.",
      "erklaerung": "Die gesetzliche Rente wird aus Beiträgen und Steuern bezahlt. Im Oktober 2026 beschloss der Bundestag eine Frühstart-Rente: 10 Euro im Monat vom Staat für Kinder, angelegt am Kapitalmarkt mit schwankendem Wert.",
      "positionen": {
        "afd": {
          "pos": "zu",
          "text": "Das Programm fordert für jedes neugeborene Kind mit deutscher Staatsangehörigkeit ein Altersvorsorge-Depot, in das bis zum 18. Lebensjahr monatlich 100 Euro aus Steuermitteln in einen ETF- oder Aktienfonds-Sparplan fließen.",
          "zitat": "Das „Junior-Spardepot“ ergänzt das bestehende Altersvorsorgesystem um eine aus Steuermitteln finanzierte, kapitalgedeckte Altersvorsorge. […] Bis zum vollendeten 18. Lebensjahr sollen monatlich 100 Euro aus Steuermitteln in einen ETF-Sparplan oder Aktienfonds-Sparplan eingezahlt werden.",
          "seite": 20
        },
        "bsw": {
          "pos": "ab",
          "text": "Das Programm wendet sich dagegen, Rentengelder am Aktienmarkt anzulegen, und will die umlagefinanzierte Rente stärken.",
          "zitat": "Keine Spekulation mit der Rente am Aktienmarkt.",
          "seite": 23
        },
        "cducsu": {
          "pos": "zu",
          "text": "Das Programm will eine Frühstart-Rente einführen: Der Staat zahlt für jedes Kind von 6 bis 18 Jahren monatlich 10 Euro in ein kapitalgedecktes, privatwirtschaftlich organisiertes Altersvorsorgedepot.",
          "zitat": "Deshalb werden wir für jedes Kind vom 6. bis zum 18. Lebensjahr pro Monat 10 Euro in ein individuelles, kapitalgedecktes und privatwirtschaftlich organisiertes Altersvorsorgedepot einzahlen.",
          "seite": 35
        },
        "linke": {
          "pos": "ab",
          "text": "Das Programm lehnt eine Aktienrente beziehungsweise das geplante Generationenkapital als riskant und teuer ab und setzt auf die gesetzliche Rente.",
          "zitat": "Die gesetzliche Rente gehört nicht an die Börse! Die angedachte Aktienrente („Generationenkapital“) soll angeblich die Beiträge über den Kapitalmarkt stabil halten. Das ist riskant und teuer und der falsche Weg.",
          "seite": 15
        },
        "fdp": {
          "pos": "zu",
          "text": "Das Programm fordert eine gesetzliche Aktienrente, bei der nach schwedischem Vorbild ein kleiner Teil der Rentenbeiträge in einem unabhängig verwalteten Fonds angelegt wird. Zusätzlich will es ein steuerlich gefördertes Altersvorsorgedepot.",
          "zitat": "Daneben wollen wir die Gesetzliche Aktienrente. Wir wollen, dass ebenfalls wie in Schweden ein kleiner Teil der Rentenbeiträge in einem unabhängig verwalteten Fonds angelegt wird, […] die Menschen stärker von den Chancen einer kapitalgedeckten Altersvorsorge profitieren.",
          "seite": 21
        },
        "fw": {
          "pos": "offen",
          "text": "Das Programm sagt nichts Eindeutiges dazu, dass der Staat Geld für die Altersvorsorge am Aktienmarkt anlegt; es will private und betriebliche Vorsorge stärken und nennt steuerfreie Kapitalerträge auf privaten Vorsorgekonten in Kanada als Beispiel."
        },
        "gruene": {
          "pos": "zu",
          "text": "Das Programm will in der gesetzlichen Rentenversicherung eine ergänzende Kapitaldeckung aus Bundesmitteln schaffen und einen öffentlich verwalteten Fonds einführen, der in die Realwirtschaft investiert; Rentenbeiträge sollen dafür nicht angelegt werden.",
          "zitat": "Wir schaffen in der gesetzlichen Rentenversicherung eine ergänzende Kapitaldeckung – und zwar ausschließlich mittels Darlehen aus dem Bundeshaushalt und der Übertragung von Eigenmitteln vom Bund.",
          "seite": 98
        },
        "spd": {
          "pos": "offen",
          "text": "Das Programm sagt dazu nichts Eindeutiges; es will die betriebliche und private Altersvorsorge stärker fördern, eine Geldanlage des Staates am Kapitalmarkt für die Rente nennt es nicht."
        }
      }
    },
    {
      "id": "familiennachzug-wieder-erlauben",
      "thema": "Migration",
      "text": "Geflüchtete mit eingeschränktem Schutz sollen ihre Ehepartner und minderjährigen Kinder wieder nachholen dürfen.",
      "erklaerung": "Gemeint ist subsidiärer Schutz, etwa bei Krieg in der Heimat. Dieser Nachzug war auf 1.000 Menschen im Monat begrenzt und ist von Juli 2025 bis Juli 2027 ausgesetzt, außer in Härtefällen.",
      "positionen": {
        "afd": {
          "pos": "ab",
          "text": "Das Programm fordert, den grundsätzlichen Anspruch auf Familiennachzug für subsidiär Schutzberechtigte abzuschaffen.",
          "zitat": "Wegfall des grundsätzlichen Nachzugsanspruches für Familienangehörige subsidiär Schutzberechtigter",
          "seite": 105
        },
        "bsw": {
          "pos": "offen",
          "text": "Das Programm sagt dazu nichts Eindeutiges."
        },
        "cducsu": {
          "pos": "ab",
          "text": "Das Programm will den Familiennachzug zu subsidiär Schutzberechtigten aussetzen.",
          "zitat": "Wir setzen den Familiennachzug zu subsidiär Schutzberechtigten aus und beenden alle freiwilligen Aufnahmeprogramme.",
          "seite": 43
        },
        "linke": {
          "pos": "zu",
          "text": "Das Programm fordert Verbesserungen bei den Regeln zum Familiennachzug aus menschenrechtlicher Sicht und lehnt alle bisherigen Asylrechtsverschärfungen ab; subsidiär Schutzberechtigte nennt es dabei nicht ausdrücklich.",
          "zitat": "Bei der weiteren Ausgestaltung der Einwanderungsregeln im Aufenthaltsgesetz drängen wir vor allem auf Verbesserungen aus menschenrechtlicher Perspektive, bspw. bei Regeln zum Familiennachzug.",
          "seite": 54
        },
        "fdp": {
          "pos": "ab",
          "text": "Das Programm will den Familiennachzug zu subsidiär Schutzberechtigten aussetzen und Aufnahmeprogramme pausieren.",
          "zitat": "Den Familiennachzug zu subsidiär Schutzberechtigten wollen wir aussetzen und Aufnahmeprogramme pausieren.",
          "seite": 28
        },
        "fw": {
          "pos": "offen",
          "text": "Das Programm sagt zum Familiennachzug nichts Eindeutiges."
        },
        "gruene": {
          "pos": "zu",
          "text": "Das Programm will den Familiennachzug weiter ermöglichen, bestehende Einschränkungen aufheben und die Verfahren beschleunigen.",
          "zitat": "Daher wollen wir weiter den Familiennachzug ermöglichen und existierende Einschränkungen aufheben.",
          "seite": 130
        },
        "spd": {
          "pos": "zu",
          "text": "Das Programm will den Familiennachzug für Menschen mit subsidiärem Schutz weiterhin ermöglichen.",
          "zitat": "Wir werden die Familienzusammenführung für subsidiär Schutzbedürftige weiterhin ermöglichen, da sie eine entscheidende Voraussetzung für eine gelungene Integration darstellt.",
          "seite": 55
        }
      }
    },
    {
      "id": "co2-preis-heizen-abschaffen",
      "thema": "Klima und Energie",
      "text": "Der CO₂-Preis auf Heizöl und Erdgas zum Heizen soll abgeschafft werden.",
      "erklaerung": "Seit 2021 verteuert ein CO₂-Preis Heizöl, Erdgas, Benzin und Diesel, damit weniger verbraucht wird; 2026 liegt er bei 55 bis 65 Euro je Tonne. Ab 2028 soll ihn ein EU-weiter Emissionshandel ablösen.",
      "positionen": {
        "afd": {
          "pos": "zu",
          "text": "Das Programm fordert die ersatzlose Abschaffung aller CO₂-Abgaben, ausdrücklich auch der CO₂-Steuer bei den Wohnkosten.",
          "zitat": "Wir fordern eine ersatzlose Abschaffung der CO₂-Abgaben.",
          "seite": 58
        },
        "bsw": {
          "pos": "zu",
          "text": "Das Programm will den CO₂-Preis abschaffen und den technologischen Wandel stattdessen über Förderung von Innovation und gezielte Anreize erreichen.",
          "zitat": "Den CO2-Preis, der alles teurer macht, ohne dass es für die meisten Menschen Alternativen gibt, wollen wir abschaffen.",
          "seite": 10
        },
        "cducsu": {
          "pos": "ab",
          "text": "Das Programm setzt im Gebäudebereich auf eine CO₂-Bepreisung mit sozialem Ausgleich und will die CO₂-Bepreisung insgesamt zum Leitinstrument ausbauen und die Einnahmen zurückgeben.",
          "zitat": "Verlässliche Dekarbonisierung im Gebäudebereich. Dabei setzen wir auf CO2-Bepreisung mit sozialem Ausgleich, verlässliche Förderung und technologieoffene Lösungen.",
          "seite": 22
        },
        "linke": {
          "pos": "zu",
          "text": "Das Programm lehnt CO₂-Preise im Wärmebereich ab, weil Mieterinnen und Mieter ihre Heizung nicht selbst wechseln könnten; auch den EU-Emissionshandel für Wärme und Verkehr lehnt es ab.",
          "zitat": "Mieter*innen können ihre Heizungen nicht wechseln, deshalb lehnen wir CO2-Preise im Wärmebereich ab.",
          "seite": 34
        },
        "fdp": {
          "pos": "ab",
          "text": "Das Programm setzt beim Heizen auf den CO₂-Zertifikatehandel, der auch den Gebäudesektor erfassen soll, und will die Kosten über eine Klimadividende und eine niedrigere Energiebesteuerung abfedern.",
          "zitat": "Statt unzähliger Einzelvorschriften setzen wir auf eine marktwirtschaftliche Lösung – den CO2-Zertifikatehandel, der ab 2027 auch den Gebäudesektor umfasst.",
          "seite": 83,
          "quelle": "fdp-ergaenzung"
        },
        "fw": {
          "pos": "offen",
          "text": "Das Programm sagt zum CO₂-Preis beim Heizen nichts Eindeutiges; für den Verkehr spricht es sich für eine verlässliche Bepreisung von Treibhausgasen aus."
        },
        "gruene": {
          "pos": "ab",
          "text": "Das Programm unterstützt den geplanten EU-Emissionshandel für Gebäude und Verkehr und will den CO₂-Preis als zentralen Hebel für Klimaschutz stärken; ein Großteil der Einnahmen aus der CO₂-Bepreisung von Gebäudewärme und Verkehr soll als sozial gestaffeltes Klimageld an Menschen mit niedrigen und mittleren Einkommen gehen.",
          "zitat": "Wir geben ein Sicherheitsversprechen: Die Einnahmen der CO₂-Bepreisung von Gebäudewärme und Transport werden wir für sozial gerechten Klimaschutz ausgeben. Einen Großteil dieser Einnahmen werden wir als sozial gestaffeltes Klimageld an Menschen mit niedrigen und mittleren Einkommen auszahlen.",
          "seite": 40
        },
        "spd": {
          "pos": "ab",
          "text": "Laut Programm kann ein CO₂-Preis für private Haushalte nur ein ergänzendes Instrument sein; der gesetzlich beschlossene Preis von 55 Euro (2025) und höchstens 65 Euro (2026) soll aber gelten, und beim EU-System ab 2027 soll etwa ein Klimageld verhindern, dass jemand überfordert wird.",
          "zitat": "Ein Preis auf den Ausstoß von CO2 für private Haushalte und kleine Unternehmen kann für uns immer nur ein ergänzendes Instrument sein. Der bereits gesetzlich beschlossene CO2-Preis pro Tonne von […] 55 Euro in 2025 und maximal 65 Euro in 2026 gilt.",
          "seite": 33
        }
      }
    },
    {
      "id": "demokratiefoerdergesetz",
      "thema": "Demokratie",
      "text": "Der Bund soll Vereine, die Demokratie fördern und Extremismus vorbeugen wollen, per Gesetz dauerhaft finanzieren.",
      "erklaerung": "Heute fördert der Bund solche Vereine befristet, etwa über „Demokratie leben!“. Befürworter eines Gesetzes wollen Planungssicherheit, Kritiker halten manche Vereine für parteipolitisch einseitig.",
      "positionen": {
        "afd": {
          "pos": "ab",
          "text": "Das Programm nennt kein Demokratiefördergesetz; es fordert aber, die Finanzierung nichtstaatlicher Akteure zu beenden, die auf die freie Meinungsbildung einwirken, und staatliche Zuwendungen an Nichtregierungsorganisationen zu überprüfen und zu verringern.",
          "zitat": "Wir fordern die Beendigung jeglicher Finanzierung von nichtstaatlichen Akteuren, die auf die freie Meinungsbildung einwirken oder diese zu unterdrücken versuchen.",
          "seite": 50
        },
        "bsw": {
          "pos": "ab",
          "text": "Das Programm lehnt ein Demokratiefördergesetz ab und fordert, die staatliche Finanzierung von Projekten und Organisationen zu beenden, die den öffentlichen Diskurs beeinflussen sollen und für bestimmte politische Meinungen stehen.",
          "zitat": "Wir fordern die Beendigung der Finanzierung von Projekten, Programmen und Organisationen, die den öffentlichen Diskurs beeinflussen sollen und für bestimmte politische Meinungen stehen. Ein sogenanntes Demokratiefördergesetz lehnen wir ab.",
          "seite": 39
        },
        "cducsu": {
          "pos": "neutral",
          "text": "Das Programm will das Bundesprogramm „Demokratie leben“ ins Bundesinnenministerium verlagern und staatliches Geld an ein Bekenntnis zur freiheitlich-demokratischen Grundordnung knüpfen; eine gesetzliche Dauerfinanzierung erwähnt es nicht.",
          "zitat": "Alle Einrichtungen, die Geld vom Staat erhalten wollen, müssen sich zur freiheitlich-demokratischen Grundordnung bekennen und eine Erklärung gegen Antisemitismus abgeben. Das Bundesprogramm „Demokratie leben“ siedeln wir künftig im Bundesinnenministerium an.",
          "seite": 45
        },
        "linke": {
          "pos": "zu",
          "text": "Das Programm fordert ein Demokratiefördergesetz, mit dem unter anderem Beratungsprojekte gegen Rechtsextremismus, Opferberatungen und Demokratiebündnisse langfristig finanziell abgesichert werden.",
          "zitat": "Projekte der mobilen Beratung gegen Rechtsextremismus, Opferberatungen und zivilgesellschaftliche Demokratiebündnisse, Migrant*innen-Selbstorganisationen sowie Antifa-Initiativen müssen mit einem echten, wirksamen Demokratiefördergesetz […] langfristig finanziell abgesichert werden.",
          "seite": 51
        },
        "fdp": {
          "pos": "offen",
          "text": "Das Programm sagt dazu nichts Eindeutiges."
        },
        "fw": {
          "pos": "offen",
          "text": "Das Programm sagt zu einer dauerhaften gesetzlichen Finanzierung solcher Vereine nichts Eindeutiges; es fordert allgemein, die Präventions- und Deradikalisierungsarbeit gegen Extremismus auszubauen."
        },
        "gruene": {
          "pos": "zu",
          "text": "Das Programm will Programme wie „Demokratie leben!“ finanziell stärken und mit einem Demokratiefördergesetz dauerhaft absichern.",
          "zitat": "Deswegen wollen wir Programme wie „Demokratie leben!“ finanziell stärken und dauerhaft mit einem Demokratiefördergesetz absichern.",
          "seite": 109
        },
        "spd": {
          "pos": "zu",
          "text": "Das Programm will mit einem Demokratiefördergesetz die Grundlage schaffen, zivilgesellschaftliche Initiativen aus Programmen wie „Demokratie leben!“ nachhaltig zu unterstützen.",
          "zitat": "Mit dem Demokratiefördergesetz schaffen wir die Grundlage, zivilgesellschaftliche Initiativen, die durch Programme wie das Bundesprogramm „Demokratie leben!“ gefördert werden, nachhaltig zu unterstützen.",
          "seite": 41
        }
      }
    },
    {
      "id": "selbstbestimmungsgesetz-abschaffen",
      "thema": "Gesellschaft",
      "text": "Das Selbstbestimmungsgesetz zum Ändern des Geschlechtseintrags soll wieder abgeschafft werden.",
      "erklaerung": "Seit November 2024 kann man Geschlechtseintrag und Vornamen mit einer Erklärung beim Standesamt ändern, die drei Monate vorher anzumelden ist; Gutachten oder Gerichtsverfahren sind nicht mehr nötig.",
      "positionen": {
        "afd": {
          "pos": "zu",
          "text": "Das Programm fordert, das Selbstbestimmungsgesetz vollständig zurückzunehmen.",
          "zitat": "Das Selbstbestimmungsgesetz, welches am 01. November 2024 das Transsexuellengesetz von 1980 abgelöst hat, ist vollumfänglich zurückzunehmen.",
          "seite": 152
        },
        "bsw": {
          "pos": "zu",
          "text": "Das Programm lehnt das Selbstbestimmungsgesetz ausdrücklich ab; ein Wechsel des Geschlechtseintrags soll mit ärztlichem Gutachten möglich sein.",
          "zitat": "Das neue Selbstbestimmungsgesetz, das einmal jährlich den Wechsel des Geschlechts ermöglicht, höhlt die Schutzrechte für Frauen aus. Wir lehnen dieses Gesetz ausdrücklich ab.",
          "seite": 34
        },
        "cducsu": {
          "pos": "zu",
          "text": "Das Programm will das Selbstbestimmungsgesetz wieder abschaffen.",
          "zitat": "Wir schaffen das Selbstbestimmungsgesetz der Ampel wieder ab. Der Jugendschutz und das Erziehungsrecht der Eltern dürfen nicht untergraben werden.",
          "seite": 9
        },
        "linke": {
          "pos": "ab",
          "text": "Das Programm will das Selbstbestimmungsgesetz verbessern; Regelungen etwa zum Kriegsfall und Ausschlüsse etwa von Geflüchteten sollen gestrichen werden.",
          "zitat": "Das Selbstbestimmungsgesetz (SBGG) ist in seiner jetzigen Form mangelhaft und muss verbessert werden. Absurde Regelungen etwa mit Blick auf den Kriegsfall oder rassistische Ausschlüsse (etwa von Geflüchteten) müssen gestrichen werden.",
          "seite": 47
        },
        "fdp": {
          "pos": "offen",
          "text": "Das Programm sagt dazu nichts Eindeutiges."
        },
        "fw": {
          "pos": "neutral",
          "text": "Das Programm erkennt das Recht auf Anerkennung der selbstbestimmten geschlechtlichen Identität an, sieht beim Selbstbestimmungsgesetz aber den Ausgleich etwa mit Frauenrechten und Kinderschutz nicht überall gelungen und fordert eine Überarbeitung des Gesetzes.",
          "zitat": "Beim Selbstbestimmungsgesetz ist dieser Ausgleich nicht in allen Bereichen gelungen. Es braucht daher eine Überarbeitung des Gesetzes noch in der kommenden Wahlperiode mit dem Ziel den gesellschaftlichen Frieden wiederherzustellen.",
          "seite": 94
        },
        "gruene": {
          "pos": "ab",
          "text": "Das Programm will das Selbstbestimmungsgesetz erhalten und vor Angriffen schützen.",
          "zitat": "Bereits erkämpfte Rechte wie das Selbstbestimmungsgesetz schützen wir vor Angriffen und setzen uns weiterhin für die Stärkung von Rechten queerer Menschen und ihrer Selbstbestimmung ein.",
          "seite": 121
        },
        "spd": {
          "pos": "ab",
          "text": "Laut Programm steht die Partei hinter dem Selbstbestimmungsgesetz und lehnt eine Rücknahme ab.",
          "zitat": "Die SPD steht hinter dem Selbstbestimmungsgesetz und den bisherigen queerpolitischen Errungenschaften. Ein Zurück wird es mit uns nicht geben.",
          "seite": 49
        }
      }
    },
    {
      "id": "waffen-fuer-ukraine",
      "thema": "Bundeswehr und Ukraine",
      "text": "Deutschland soll weiterhin Waffen an die Ukraine liefern.",
      "erklaerung": "Russland hat im Februar 2022 die gesamte Ukraine angegriffen, der Krieg dauert an. Deutschland liefert seitdem Waffen und gehört zu den größten Unterstützern der Ukraine.",
      "positionen": {
        "afd": {
          "pos": "ab",
          "text": "Das Programm enthält keine ausdrückliche Forderung zu Waffenlieferungen, kritisiert aber die Abgabe von Waffensystemen aus Beständen der Bundeswehr an die Ukraine und nennt die Waffenfinanzierung der Ukraine über die EU als Beispiel für ein Versagen der EU.",
          "zitat": "Aufgrund der chronischen Unterfinanzierung über Jahrzehnte, sowie der fortlaufenden Abgabe von einsatzfähigem Material und Waffensystemen aus Beständen der Bundeswehr an die Ukraine […] befinden sich die deutschen Streitkräfte in einem desolaten Zustand.",
          "seite": 89
        },
        "bsw": {
          "pos": "ab",
          "text": "Das Programm fordert, jede militärische Unterstützung für Kriegs- und Bürgerkriegsparteien einzustellen, lehnt ausdrücklich die Lieferung von Taurus-Marschflugkörpern an die Ukraine ab und fordert einen Waffenstillstand und Verhandlungen.",
          "zitat": "Deshalb ist jegliche militärische Unterstützung für Kriegs- und Bürgerkriegsparteien einzustellen.",
          "seite": 38
        },
        "cducsu": {
          "pos": "zu",
          "text": "Das Programm will die Ukraine weiterhin diplomatisch, finanziell, humanitär und mit Waffenlieferungen unterstützen.",
          "zitat": "Daher unterstützen wir die Ukraine mit allen erforderlichen diplomatischen, finanziellen und humanitären Mitteln sowie mit Waffenlieferungen.",
          "seite": 47
        },
        "linke": {
          "pos": "ab",
          "text": "Das Programm lehnt Waffenlieferungen in Kriegs- und Krisengebiete ab und fordert für die Ukraine stattdessen eine diplomatische Verhandlungsoffensive.",
          "zitat": "Um endlich einen Friedensprozess für die Ukraine zu ermöglichen, muss die Bundesregierung Friedensinitiativen wie die von China und Brasilien endlich aufgreifen […] Wir lehnen Waffenlieferungen in Kriegs- und Krisengebiete ab.",
          "seite": 23
        },
        "fdp": {
          "pos": "zu",
          "text": "Laut Programm darf die Verteidigung der Ukraine nicht an Geld und Waffenlieferungen scheitern; es fordert unter anderem die unverzügliche Lieferung des Marschflugkörpers Taurus.",
          "zitat": "Für uns Freie Demokraten steht fest, dass die Verteidigung der Ukraine nicht am Geld und an Waffenlieferungen scheitern darf, da ein russischer Sieg teurer sein wird und in der Ukraine auch unsere Freiheit verteidigt wird.",
          "seite": 47
        },
        "fw": {
          "pos": "zu",
          "text": "Das Programm hält die Unterstützung der Ukraine mit allem Nötigen einschließlich modernster Waffentechnik für richtig und fordert zugleich europäische Vorschläge für einen Friedensplan.",
          "zitat": "Unsere Unterstützung der Ukraine mit allem, was nötig ist, um den Krieg nicht zu verlieren, ist daher richtig. Modernste Waffentechnik gehört selbstverständlich dazu.",
          "seite": 60
        },
        "gruene": {
          "pos": "zu",
          "text": "Das Programm sagt der Ukraine weiterhin auch militärische Unterstützung zu und will ihre Verteidigungsfähigkeit verbessern.",
          "zitat": "Die Ukraine muss in der Lage sein, sich zu verteidigen und eine starke Position für einen möglichen Friedensprozess sicherzustellen. Dafür wollen wir sie auch weiter in ihrem Recht auf Selbstverteidigung deutlich stärken und ihre Verteidigungsfähigkeit verbessern.",
          "seite": 142
        },
        "spd": {
          "pos": "zu",
          "text": "Das Programm unterstützt die Ausbildung ukrainischer Streitkräfte und die Lieferung von Waffen und Ausrüstung; den Marschflugkörper Taurus will es nicht liefern.",
          "zitat": "Zur Verteidigung der Ukraine und zur Sicherung des Friedens in Europa unterstützt die SPD die Ausbildung der ukrainischen Streitkräfte und die Lieferung von Waffen und Ausrüstung mit Besonnenheit und Augenmaß.",
          "seite": 58
        }
      }
    },
    {
      "id": "erbschaftsteuer-abschaffen",
      "thema": "Wirtschaft und Steuern",
      "text": "Die Erbschaftsteuer soll abgeschafft werden.",
      "erklaerung": "Oberhalb von Freibeträgen, etwa 400.000 Euro pro Kind und Elternteil, fallen 7 bis 50 Prozent Steuer an; wer eine Firma erbt und weiterführt, kann weitgehend befreit werden. Das Bundesverfassungsgericht prüft die Regeln gerade.",
      "positionen": {
        "afd": {
          "pos": "zu",
          "text": "Das Programm will die Erbschaftsteuer ebenso wie die ausgesetzte Vermögensteuer abschaffen.",
          "zitat": "Die AfD will die derzeit zur Erhebung ausgesetzte Vermögensteuer sowie die Erbschaftssteuer abschaffen.",
          "seite": 61
        },
        "bsw": {
          "pos": "ab",
          "text": "Das Programm will alle vererbten Vermögen oberhalb der Freibeträge gleich besteuern, damit große Erbschaften nicht niedriger belastet werden als kleine.",
          "zitat": "Aktuell gilt: je höher das Erbvermögen, desto niedriger der effektive Steuersatz. […] Das wollen wir verändern und alle vererbten Vermögen oberhalb der Freibeträge gleich besteuern.",
          "seite": 17
        },
        "cducsu": {
          "pos": "neutral",
          "text": "Das Programm fordert keine Abschaffung, sondern deutlich höhere Freibeträge bei der Erbschaftsteuer; Familienunternehmen sollen in der Erbfolge nicht in der Substanz belastet werden.",
          "zitat": "Wir erhöhen die Freibeträge bei der Erbschaftsteuer deutlich. So kann das Eigenheim in höherem Maße steuerfrei vererbt werden.",
          "seite": 34
        },
        "linke": {
          "pos": "ab",
          "text": "Das Programm will die Erbschaftsteuer beibehalten und verschärfen: höhere Sätze für sehr große Erbschaften, einheitliche Freibeträge von 200.000 Euro und keine Vergünstigungen mehr für Unternehmensvermögen.",
          "zitat": "Die Schlupflöcher bei der Erbschaftsteuer müssen geschlossen werden. Vergünstigungen bei Unternehmensvermögen, großen Wohnungsbeständen und insbesondere der Verschonungsbedarfsprüfung sollen entfallen.",
          "seite": 11
        },
        "fdp": {
          "pos": "neutral",
          "text": "Laut Programm darf die Erbschaft- und Schenkungsteuer die Existenz von Unternehmen nicht gefährden; es fordert, die Freibeträge automatisch um die Inflationsrate zu erhöhen, damit die durchschnittliche Steuerlast konstant bleibt. Eine Abschaffung fordert es nicht.",
          "zitat": "Die Existenz von Unternehmen darf nicht durch die Erbschaft- und Schenkungsteuer gefährdet sein. Wir fordern, dass die Freibeträge automatisch um die Inflationsrate erhöht werden. Nur so bleibt die durchschnittliche Steuerlast auf Schenkungen und Erbschaften bei steigenden Preisen konstant.",
          "seite": 15
        },
        "fw": {
          "pos": "zu",
          "text": "Das Programm fordert die Abschaffung der Erbschaft- und Schenkungsteuer.",
          "zitat": "Wir setzen zum Schutz von mittelständischen, familiengeführten Unternehmen und über Generationen geschaffenen Eigentums auf eine Abschaffung der Erbschafts- und Schenkungssteuer.",
          "seite": 38
        },
        "gruene": {
          "pos": "ab",
          "text": "Das Programm will die Erbschaftsteuer reformieren: mit einem persönlichen Lebensfreibetrag, weitgehend ohne die bisherigen Ausnahmen für sehr große Erbschaften und mit großzügigen Stundungsregeln; selbst bewohntes Eigentum soll befreit bleiben.",
          "zitat": "Deswegen fokussieren wir uns auf folgende Maßnahmen: eine Reform der Erbschaftssteuer hin zu einem Modell mit personenbezogenem Lebensfreibetrag, weitgehender Streichung bestehender Ausnahmen für außerordentlich große Erbschaften (selbst bewohntes Eigentum bleibt befreit) […]",
          "seite": 73
        },
        "spd": {
          "pos": "ab",
          "text": "Das Programm will die Erbschaft- und Schenkungsteuer beibehalten und reformieren, mit einer Mindestbesteuerung großer Betriebsvermögen und höheren persönlichen Freibeträgen; das selbst genutzte Familienheim soll unbelastet bleiben.",
          "zitat": "Innerhalb des bestehenden progressiven Steuertarifs führen wir eine effektive Mindestbesteuerung für große Betriebsvermögen ein, die auch für vermögenshaltende Familienstiftungen gilt. Die persönlichen Freibeträge wollen wir erhöhen […]",
          "seite": 19
        }
      }
    },
    {
      "id": "who-pandemieabkommen",
      "thema": "Corona und Pandemien",
      "text": "Deutschland soll dem Pandemieabkommen der Weltgesundheitsorganisation (WHO) beitreten.",
      "erklaerung": "Das 2025 von den WHO-Staaten angenommene Abkommen regelt etwa das Teilen von Impfstoffen; Lockdowns oder Impfpflichten darf die WHO laut Text nicht vorschreiben. Zur Unterzeichnung fehlt noch ein Anhang. Befürworter erhoffen bessere Vorsorge für künftige Pandemien, Kritiker fürchten zu viel Einfluss der WHO auf die Staaten.",
      "positionen": {
        "afd": {
          "pos": "ab",
          "text": "Das Programm lehnt den geplanten Pandemievertrag der WHO ab, weil er der WHO umfangreiche Rechte gegenüber den Staaten einräume, und fordert die Ablehnung beziehungsweise Kündigung solcher Verträge.",
          "zitat": "Mit dem für 2025 geplanten Pandemievertrag werden der WHO […] umfangreiche Rechte gegenüber den nationalen Staaten eingeräumt […]. Dies lehnen wir grundsätzlich ab.",
          "seite": 30
        },
        "bsw": {
          "pos": "ab",
          "text": "Das Programm fordert, dass die Bundesregierung einem WHO-Pandemievertrag mit erweiterten Kompetenzen für die WHO nicht zustimmt, und verlangt eine Aufarbeitung der Rolle der WHO in der Corona-Zeit.",
          "zitat": "Wir fordern, dass die Bundesregierung einem WHO-Pandemievertrag mit erweiterten Kompetenzen für die WHO nicht zustimmt.",
          "seite": 41
        },
        "cducsu": {
          "pos": "offen",
          "text": "Das Programm sagt zum Pandemieabkommen der WHO nichts Eindeutiges."
        },
        "linke": {
          "pos": "offen",
          "text": "Das Programm sagt zum Pandemieabkommen der WHO nichts Eindeutiges."
        },
        "fdp": {
          "pos": "offen",
          "text": "Das Programm sagt dazu nichts Eindeutiges."
        },
        "fw": {
          "pos": "offen",
          "text": "Das Programm sagt zum Pandemieabkommen der WHO nichts Eindeutiges."
        },
        "gruene": {
          "pos": "zu",
          "text": "Das Programm will die Weltgesundheitsorganisation stärken und ein internationales Pandemieabkommen vorantreiben.",
          "zitat": "In diesem Sinne wollen wir Partnerländer im Aufbau ihrer Gesundheitssysteme unterstützen, die Weltgesundheitsorganisation (WHO) stärken und ein internationales Pandemieabkommen vorantreiben.",
          "seite": 157
        },
        "spd": {
          "pos": "offen",
          "text": "Das Programm sagt dazu nichts Eindeutiges; es sieht eine breit unterstützte Weltgesundheitsorganisation als zentrale Stelle internationaler Gesundheitszusammenarbeit, nennt das Pandemieabkommen aber nicht."
        }
      }
    },
    {
      "id": "abschiebung-afghanistan-syrien",
      "thema": "Sicherheit",
      "text": "Ausländische Straftäter sollen regelmäßig auch nach Afghanistan und Syrien abgeschoben werden.",
      "erklaerung": "Nach Afghanistan schiebt Deutschland seit 2024 Straftäter ab, inzwischen mit regelmäßigen Sammelflügen, nach Syrien seit Ende 2025 vereinzelt. Befürworter verweisen auf die Sicherheit in Deutschland, Kritiker auf drohende Folter in den Herkunftsländern.",
      "positionen": {
        "afd": {
          "pos": "zu",
          "text": "Das Programm fordert die unverzügliche Rückführung ausländischer Gefährder, Extremisten und Schwerkrimineller in ihre Herkunftsländer oder in aufnahmebereite Drittstaaten und will dies ausdrücklich auch bei Syrern umsetzen; Afghanistan wird dabei nicht eigens genannt.",
          "zitat": "Unverzügliche Rückführung ausländischer Gefährder, Extremisten und Schwerkrimineller entweder in ihre Herkunftsländer oder in aufnahmebereite Drittstaaten […] Diesen Kurswechsel werden wir […] ausdrücklich auch bei der größten seit 2014/15 eingewanderte Gruppe – den Syrern – vollziehen.",
          "seite": 108
        },
        "bsw": {
          "pos": "zu",
          "text": "Das Programm fordert, dass Flüchtlinge nach schweren Straftaten ihren Anspruch auf ein Asylverfahren verlieren und Schutz vor Abschiebung nur noch besteht, wenn klare Indizien für eine drohende Todesstrafe im Herkunftsstaat vorliegen; Afghanistan und Syrien nennt es dabei nicht.",
          "zitat": "Wir fordern, […] dass Flüchtlinge nach schweren Straftaten ihren Anspruch auf ein Asylverfahren in Deutschland verlieren und der Schutz vor Abschiebung auf Fälle begrenzt wird, in denen klare Indizien vorliegen, dass dem Betroffenen im Herkunftsstaat die Todesstrafe droht.",
          "seite": 37
        },
        "cducsu": {
          "pos": "zu",
          "text": "Das Programm will regelmäßig nach Afghanistan und Syrien abschieben, vor allem Straftäter und Gefährder.",
          "zitat": "Nach Afghanistan und Syrien wollen wir regelmäßig abschieben – vor allem Straftäter und Gefährder.",
          "seite": 43
        },
        "linke": {
          "pos": "ab",
          "text": "Das Programm lehnt Abschiebungen in Krieg, Verfolgung und Elend sowie als zusätzliche Strafe ab; straffällige Ausländer sollen ihre Strafen in Deutschland verbüßen.",
          "zitat": "Abschiebungen, insbesondere in Krieg, Verfolgung und Elend oder als Form der Doppelbestrafung, lehnen wir ab. Straftäter*innen müssen unabhängig vom Aufenthaltsstatus ein reguläres Strafverfahren im Inland erhalten und gegebenenfalls Haftstrafen im Inland verbüßen.",
          "seite": 53
        },
        "fdp": {
          "pos": "zu",
          "text": "Laut Programm müssen auch Abschiebungen nach Afghanistan und Syrien erfolgen; die Forderung bezieht sich allgemein auf Menschen ohne Bleiberecht, nicht nur auf Straftäter.",
          "zitat": "Es müssen auch Abschiebungen nach Afghanistan und Syrien erfolgen.",
          "seite": 45,
          "quelle": "fdp-ergaenzung"
        },
        "fw": {
          "pos": "offen",
          "text": "Das Programm nennt Afghanistan und Syrien nicht; es fordert allgemein die sofortige Abschiebung oder Inhaftierung von Gefährdern und straffälligen Geflüchteten."
        },
        "gruene": {
          "pos": "ab",
          "text": "Laut Programm verbieten sich Abschiebungen in Kriegs- und Krisengebiete; Rückführungsvereinbarungen mit den Taliban lehnt es ab, und übereilte Forderungen nach Rückführungen nach Syrien hält es in der unklaren Lage für falsch. Zugleich sollen Ausreisepflichtige, die schwere Straftaten begangen haben, nach Verbüßung ihrer Strafe vorrangig zurückgeführt werden.",
          "zitat": "Abschiebungen in Kriegs- und Krisengebiete verbieten sich. Wir wollen Schutz vor Unrechtsregimen wie den Taliban bieten und sie nicht durch Rückführungsvereinbarungen politisch legitimieren.",
          "seite": 130
        },
        "spd": {
          "pos": "offen",
          "text": "Das Programm sagt dazu nichts Eindeutiges; es fordert allgemein rasche und konsequente Abschiebungen, insbesondere von Straftätern, nennt Afghanistan und Syrien in diesem Zusammenhang aber nicht."
        }
      }
    },
    {
      "id": "klimaneutral-2045",
      "thema": "Klima und Energie",
      "text": "Deutschland soll am Ziel festhalten, bis spätestens 2045 klimaneutral zu werden.",
      "erklaerung": "Klimaneutral heißt: Es werden höchstens so viele Treibhausgase ausgestoßen, wie wieder gebunden werden. Das Ziel 2045 steht im Klimaschutzgesetz und wird seit 2025 auch im Grundgesetz genannt.",
      "positionen": {
        "afd": {
          "pos": "ab",
          "text": "Das Programm lehnt jede Politik ab, die sich auf Klimaschutz beruft, und will aus dem Pariser Klimaabkommen austreten.",
          "zitat": "Die AfD lehnt daher jede Politik und jede Steuer ab, die sich auf angeblichen Klimaschutz beruft, denn das Klima kann der Mensch nicht schützen. Wir wollen zudem aus dem Pariser Klimaabkommen aussteigen.",
          "seite": 80
        },
        "bsw": {
          "pos": "ab",
          "text": "Das Programm fordert eine Abkehr von dem Ziel, schnell eine vollständige Klimaneutralität zu erreichen; ein Zieljahr nennt es nicht. Zugleich bekennt es sich zum Pariser Klimaabkommen.",
          "zitat": "Wir fordern eine Abkehr vom Wunschdenken einer schnell erreichbaren völligen Klimaneutralität.",
          "seite": 10
        },
        "cducsu": {
          "pos": "zu",
          "text": "Das Programm bekennt sich zur Klimaneutralität bis 2045 und will dieses Ziel mit dem Erhalt der Wettbewerbsfähigkeit und der sozialen Tragfähigkeit verbinden.",
          "zitat": "Die Klimaneutralität bis 2045 haben wir fest im Blick. […] Wir verbinden dieses Ziel unbedingt mit dem Erhalt der Wettbewerbsfähigkeit unserer Wirtschaft und der Notwendigkeit der sozialen Tragfähigkeit.",
          "seite": 23
        },
        "linke": {
          "pos": "zu",
          "text": "Das Programm will Deutschland schon bis 2040 klimaneutral machen.",
          "zitat": "Wir wollen Deutschland bis 2040 klimaneutral machen.",
          "seite": 32
        },
        "fdp": {
          "pos": "ab",
          "text": "Das Programm will das deutsche Ziel der Klimaneutralität bis 2045 durch das europäische Ziel der Klimaneutralität bis 2050 ersetzen.",
          "zitat": "Da nationale Sonderziele im Rahmen des europäischen Emissionshandels keinerlei zusätzlichen Nutzen für den Klimaschutz haben können, wollen wir das Ziel der Klimaneutralität bis 2045 im deutschen Klimaschutzgesetz durch das europäische Ziel der Klimaneutralität bis 2050 ersetzen.",
          "seite": 40
        },
        "fw": {
          "pos": "neutral",
          "text": "Das Programm bekennt sich zum Ziel der Klimaneutralität, will ein festes Zieljahr aber nicht unbedingt einhalten, wenn die Belastungen für Bürger, Wirtschaft und Staatshaushalt zu hoch sind und die Umsetzung unrealistisch erscheint.",
          "zitat": "Wir stehen zum Ziel der Klimaneutralität, allerdings darf eine fixe Jahreszahl kein Dogma sein, wenn die Belastungen für Bürger, Wirtschaft und Staatshaushalt zu hoch sind und die Umsetzung unrealistisch erscheint.",
          "seite": 43
        },
        "gruene": {
          "pos": "zu",
          "text": "Das Programm hält am gesetzlich festgelegten Ziel der Klimaneutralität bis 2045 und an den verbindlichen Zwischenzielen fest.",
          "zitat": "Wir halten deshalb an den rechtlich festgeschriebenen Zielen der Klimaneutralität 2045 und den verbindlichen Zwischenzielen fest.",
          "seite": 38
        },
        "spd": {
          "pos": "zu",
          "text": "Das Programm bekennt sich zu den Klimazielen für Deutschland und die EU und lehnt eine Abschwächung ab; das Jahr 2045 nennt es nicht ausdrücklich.",
          "zitat": "Wir bekennen uns klar zu den Klimazielen für Deutschland und die EU.",
          "seite": 33
        }
      }
    },
    {
      "id": "mercosur-abkommen",
      "thema": "EU und Handel",
      "text": "Das Handelsabkommen der EU mit den südamerikanischen Mercosur-Staaten soll dauerhaft gelten.",
      "erklaerung": "Es senkt Zölle etwa für Autos aus Europa und für Rindfleisch und Geflügel aus Südamerika. Der Handelsteil gilt seit Mai 2026 vorläufig; das EU-Parlament muss noch zustimmen und hat den Europäischen Gerichtshof (EuGH) um ein Gutachten gebeten.",
      "positionen": {
        "afd": {
          "pos": "ab",
          "text": "Das Programm befürwortet eine Zusammenarbeit mit dem Mercosur, wenn sie Deutschland nützt, sagt aber, das Mercosur-Abkommen schade derzeit der heimischen Landwirtschaft und der Versorgung mit Nahrungsmitteln.",
          "zitat": "Das Mercosur-Abkommen schadet unserer Landwirtschaft derzeit allerdings und erschwert damit langfristig die Sicherstellung der Nahrungsmittelversorgung unserer Bevölkerung aus eigener Kraft.",
          "seite": 95
        },
        "bsw": {
          "pos": "ab",
          "text": "Das Programm lehnt Handelsabkommen ab, die den Konkurrenzdruck auf die heimische Landwirtschaft erhöhen, und nennt dabei ausdrücklich das Mercosur-Abkommen.",
          "zitat": "Handelsabkommen, die den Konkurrenzdruck für unsere heimische Landwirtschaft erhöhen, wie das Mercosur-Abkommen, lehnen wir ab.",
          "seite": 19
        },
        "cducsu": {
          "pos": "zu",
          "text": "Das Programm will, dass das Mercosur-Abkommen zügig in Kraft tritt, und achtet dabei besonders auf faire Wettbewerbsbedingungen für die Landwirtschaft.",
          "zitat": "Mercosur ist ausverhandelt und muss jetzt zügig in Kraft treten. Dabei haben wir die Sicherstellung fairer Wettbewerbsbedingungen zum Schutz unserer Landwirtschaft besonders im Blick.",
          "seite": 20
        },
        "linke": {
          "pos": "ab",
          "text": "Das Programm nennt das Mercosur-Abkommen nicht ausdrücklich, lehnt aber Freihandelsabkommen allgemein ab und fordert stattdessen faire Kooperationsabkommen; die heimische Landwirtschaft soll vor billigen Importen geschützt werden, die den hiesigen Standards nicht entsprechen.",
          "zitat": "Landwirtschaft im Einklang mit der Natur: Das geht nur, wenn die hohen Produktionsstandards der heimischen Agrarwirtschaft vor billigen Importen aus Drittländern, die unseren Standards nicht entsprechen, geschützt werden. Freihandelsabkommen zeigen in die falsche Richtung.",
          "seite": 42
        },
        "fdp": {
          "pos": "zu",
          "text": "Das Programm fordert eine unverzügliche Ratifizierung des Mercosur-Abkommens.",
          "zitat": "Wir Freie Demokraten engagieren uns für eine unverzügliche Ratifizierung des Mercosur-Abkommens.",
          "seite": 52
        },
        "fw": {
          "pos": "offen",
          "text": "Das Programm nennt das Mercosur-Abkommen nicht; allgemein verlangt es, dass die Landwirtschaft nicht zum Verlierer von EU-Freihandelsabkommen wird und Importe die deutschen Standards einhalten."
        },
        "gruene": {
          "pos": "offen",
          "text": "Das Programm sagt dazu nichts Eindeutiges; es nennt das Mercosur-Abkommen nicht und knüpft Handelsabkommen allgemein an verbindliche soziale und ökologische Standards."
        },
        "spd": {
          "pos": "zu",
          "text": "Das Programm nennt den Abschluss weitreichender Handelsabkommen, ausdrücklich auch des EU-Mercosur-Abkommens, einen wichtigen Meilenstein; solche Abkommen sollen zugleich soziale Rechte, Menschenrechte, Umwelt und Klima schützen.",
          "zitat": "Der Abschluss von weitreichenden Handels- und Investitionsabkommen (beispielsweise das EUMercosur-Abkommen oder die Freihandelsverträge der EU mit Indien und Australien) sind wichtige Meilensteine, um robuste Allianzen und Partnerschaften zu etablieren.",
          "seite": 65
        }
      }
    },
    {
      "id": "schuldenbremse-investitionen",
      "thema": "Wirtschaft und Steuern",
      "text": "Investitionen des Staates sollen dauerhaft von der Schuldenbremse ausgenommen werden.",
      "erklaerung": "Die Schuldenbremse begrenzt neue Kredite. Ausgenommen sind seit 2025 Verteidigungsausgaben über 1 Prozent der Wirtschaftsleistung und ein einmaliger Topf von 500 Milliarden Euro für Infrastruktur und Klimaschutz.",
      "positionen": {
        "afd": {
          "pos": "ab",
          "text": "Das Programm lehnt jede Aufweichung der Schuldenbremse ab.",
          "zitat": "Die AfD lehnt jedwede Aufweichung der Schuldenbremse entschieden ab.",
          "seite": 55
        },
        "bsw": {
          "pos": "zu",
          "text": "Das Programm will die Schuldenbremse reformieren und Investitionen in Brücken, Straßen, Schienen, Schulen, Wohnungen und Netze von ihr ausnehmen.",
          "zitat": "Wir wollen Investitionen in Brücken, Straßen, Schienen, Schulen, Wohnungen und Netze aus der Schuldenbremse ausklammern und den dramatischen Investitionsstau, der zum Verfall unserer Infrastruktur führt, ohne weiteren Verzug durch ein großes Investitionsprogramm beheben.",
          "seite": 15
        },
        "cducsu": {
          "pos": "ab",
          "text": "Das Programm will an der Schuldenbremse des Grundgesetzes festhalten.",
          "zitat": "An der grundgesetzlichen Schuldenbremse festhalten. Sie stellt sicher, dass Lasten nicht unseren Kindern und Enkeln aufgebürdet werden.",
          "seite": 77
        },
        "linke": {
          "pos": "zu",
          "text": "Das Programm fordert die Abschaffung der Schuldenbremse, damit öffentliche Investitionen wieder über Kredite finanziert werden können.",
          "zitat": "Wir fordern die Abschaffung der Schuldenbremse. Es muss wieder möglich sein, öffentliche Investitionen in die Infrastruktur, eine klimaneutrale Industrie und den sozialen Ausgleich über Kredite zu finanzieren.",
          "seite": 13
        },
        "fdp": {
          "pos": "ab",
          "text": "Das Programm will die Schuldenbremse einhalten und Erhalt und Ausbau der Infrastruktur im Rahmen der Schuldenbremse finanzieren, unter anderem über Maut-Einnahmen und privates Kapital.",
          "zitat": "Angesichts eines steigenden Investitionsbedarfs brauchen wir eine nachhaltige Lösung im Rahmen der Schuldenbremse für den Erhalt und den Ausbau der Infrastruktur in Deutschland.",
          "seite": 42
        },
        "fw": {
          "pos": "neutral",
          "text": "Das Programm will die Schuldenbremse beibehalten und lehnt ihre Aufweichung ab, fordert aber eine Investitionsklausel für einige wenige besonders wichtige Vorhaben, etwa als Sondervermögen.",
          "zitat": "Deshalb halten wir an unserer Forderung nach einer Investitionsklausel für einige wenige elementare Vorhaben von überragender Bedeutung – etwa in Form eines investiven Sondervermögens – unter Beibehaltung der Schuldenbremse fest.",
          "seite": 36
        },
        "gruene": {
          "pos": "zu",
          "text": "Das Programm will die Schuldenbremse reformieren, sodass der Staat Kredite im Umfang seiner Investitionen aufnehmen kann.",
          "zitat": "Die Aufnahme von staatlichen Krediten soll dazu in dem Umfang ermöglicht werden, wie vom Staat Investitionen getätigt werden.",
          "seite": 36
        },
        "spd": {
          "pos": "zu",
          "text": "Das Programm will die Schuldenregel im Grundgesetz reformieren, Ausnahmen für wichtige Zukunftsinvestitionen einführen und die Defizitregel flexibler gestalten.",
          "zitat": "Zusätzlich gilt es, die veralteten Kreditobergrenzen zu reformieren: Neben der Einführung von Ausnahmetatbeständen für wichtige Zukunftsinvestitionen setzen wir uns für eine flexiblere Ausgestaltung der Defizitregel selbst ein.",
          "seite": 17
        }
      }
    },
    {
      "id": "ukraine-eu-mitglied",
      "thema": "EU und Handel",
      "text": "Die Ukraine soll Mitglied der Europäischen Union werden.",
      "erklaerung": "Die Ukraine ist seit 2022 offiziell Beitrittskandidat; seit 2024 wird verhandelt, seit 2026 auch über erste Themenbereiche. Aufgenommen werden kann sie nur, wenn alle EU-Staaten zustimmen.",
      "positionen": {
        "afd": {
          "pos": "ab",
          "text": "Das Programm sieht die Ukraine künftig als neutralen Staat außerhalb von NATO und EU und lehnt eine Osterweiterung der EU ab.",
          "zitat": "Die Zukunft der Ukraine sehen wir als neutralen Staat außerhalb von NATO und EU.",
          "seite": 93
        },
        "bsw": {
          "pos": "ab",
          "text": "Das Programm fordert einen Stopp der EU-Erweiterung, der auch für die Ukraine gelten soll.",
          "zitat": "Wir wollen einen EU-Erweiterungsstopp, der auch für die Ukraine gilt, die sonst zum Fass ohne Boden für die deutschen Steuerzahler wird.",
          "seite": 9
        },
        "cducsu": {
          "pos": "zu",
          "text": "Laut Programm liegt ein EU-Beitritt der Ukraine im Interesse Deutschlands und Europas; vorher müssen alle Beitrittskriterien vollständig erfüllt sein.",
          "zitat": "Der Ukraine eine Perspektive aufzeigen. Ihr EU-Beitritt liegt im sicherheits- und geopolitischen Interesse Deutschlands und Europas. Vor einem Beitritt müssen alle Kriterien vollständig erfüllt sein.",
          "seite": 48
        },
        "linke": {
          "pos": "offen",
          "text": "Das Programm sagt zu einem EU-Beitritt der Ukraine nichts Eindeutiges."
        },
        "fdp": {
          "pos": "zu",
          "text": "Laut Programm liegt ein EU-Beitritt der Ukraine nach den Kopenhagener Kriterien im deutschen und europäischen Interesse; an anderer Stelle unterstützt es den Beitritt als längerfristige Perspektive.",
          "zitat": "Denn der Beitritt der westlichen Balkanregion, der Moldau und der Ukraine in die EU gemäß der Kopenhagener Kriterien ist im deutschen und europäischen Interesse.",
          "seite": 52
        },
        "fw": {
          "pos": "zu",
          "text": "Laut Programm soll die Folge des russischen Angriffs sein, dass die Ukraine in NATO und EU integriert wird.",
          "zitat": "Auch wenn mit vertretbaren Mitteln nicht mehr alle Teile der Ukraine zu befreien sein werden, muss die klare Konsequenz gegenüber Putin sein, dass er mit dem Angriff die Integration der Ukraine in NATO und EU erst erzwungen hat.",
          "seite": 60
        },
        "gruene": {
          "pos": "zu",
          "text": "Das Programm unterstützt die Ukraine auf ihrem Weg zur Mitgliedschaft in der EU; Beitritte setzen laut Programm voraus, dass die Kandidaten die notwendigen Kriterien erfüllen.",
          "zitat": "Zudem bekräftigen wir das Recht auf freie Bündniswahl und unterstützen die Ukraine auf ihrem Weg zur Mitgliedschaft in der EU und NATO.",
          "seite": 142
        },
        "spd": {
          "pos": "zu",
          "text": "Das Programm will, dass die Ukraine Teil der EU wird; die Kopenhagener Kriterien müssen laut Programm dabei immer erfüllt sein.",
          "zitat": "Auch die Ukraine und Moldau sollen ein Teil der EU werden.",
          "seite": 60
        }
      }
    }
  ]
};
