window.APP_DATA = window.APP_DATA || {};
window.APP_DATA.kampagne = {
  segmente: [
    {
      id: "protest",
      name: "Enttäuschte und Protestwählende",
      beschreibung: "Menschen, die sich von der Politik übergangen fühlen und mit ihrer Stimme ein Signal senden wollen. Die Partei ist für sie weniger Programm als Megafon. In 500 Gesprächen in zwölf Hochburgen (Hillje 2018) und 217 Interviews in strukturschwachen Regionen („Die Übergangenen“ 2021) äußerten diese Menschen vor allem den Wunsch nach Zuhören, Respekt und sichtbaren Verbesserungen vor Ort. Die Abwertung anderer erscheint dort oft als Reaktion auf eigene Probleme, die niemand anerkennt.",
      motive: ["Gehört werden", "Ein Zeichen setzen gegen „die da oben“", "Konkrete Probleme vor Ort: Bus, Arzt, Schule, Internet", "Respekt und Wertschätzung für die eigene Lebensleistung"],
      erreichbar: "hoch",
      wirkt: ["Zuerst zuhören, ohne Gegenrede und ohne Agenda", "Sichtbar liefern und zurückmelden, was aus einem Anliegen geworden ist", "Anerkennung aussprechen, ohne Bedingungen daran zu knüpfen"],
      schadet: ["Protest als dumm oder gefährlich abtun", "Faktenvorträge statt Nachfragen", "Versprechen vor der Wahl, die danach verpuffen"],
      kanaele: ["Haustür und Hofgespräch", "Vereinsheim, Sportplatz, Feuerwehr", "Lokalzeitung und Gemeindeblatt", "Bürgersprechstunde ohne Tagesordnung"],
      botschafter: ["Nachbarinnen und Nachbarn aus demselben Ort", "Handwerk, Pflege, Landwirtschaft", "Ortsvorsteher und Vereinsvorsitzende"]
    },
    {
      id: "konservative-hardliner",
      name: "Konservative Hardliner",
      beschreibung: "Laut GLES 2025 rund zwei Drittel der Wählerschaft. Diese Menschen sind migrationsrestriktiv und ordnungsorientiert, aber nicht durchgängig autoritär und nicht geschlossen rechtsextrem. Viele haben früher andere Parteien gewählt und halten bürgerliche Werte wie Leistung, Sicherheit und Verlässlichkeit hoch. Migrationskritik und EU-Skepsis sind die stärksten Treiber der Wahlentscheidung (FES 2024).",
      motive: ["Ordnung und Sicherheit", "Kontrolle über Migration", "Regeln, die für alle gleich gelten", "Misstrauen gegenüber Medien und Eliten"],
      erreichbar: "mittel",
      wirkt: ["Botschaften, die an ihre Werte anknüpfen: Verlässlichkeit, Fairness, Verantwortung, Leistung", "Botschafter aus dem bürgerlich-konservativen Lager", "Kontroversen ehrlich als solche zeigen, keine Scheinharmonie"],
      schadet: ["Jede Sorge als Rassismus etikettieren", "Botschaften aus dem politischen Gegenlager, sie lösen Abwehr aus (Pink et al. 2021)", "Moralische Überlegenheitsgesten"],
      kanaele: ["Lokalmedien", "Kirchengemeinde, Unternehmerstammtisch, Landfrauen", "Direktes Gespräch am Arbeitsplatz"],
      botschafter: ["Konservative Kommunalpolitikerinnen und -politiker", "Unternehmer und Handwerksmeisterinnen", "Pfarrerinnen, Polizisten, Soldaten im Ruhestand"]
    },
    {
      id: "ambivalente",
      name: "Ambivalente Mitte",
      beschreibung: "Rund ein Fünftel der Bevölkerung ist laut Mitte-Studie 2024/25 ambivalent. Diese Menschen stimmen manchen rechtsextremen Aussagen zu, anderen nicht, und sind unentschieden, ob sie eine solche Partei wählen sollen. Hier entscheidet sich, ob die Zustimmung wächst oder schrumpft. Die Gruppe reagiert stark darauf, was sie im eigenen Umfeld als normal wahrnimmt.",
      motive: ["Unsicherheit und Zukunftsangst", "Was die anderen im Ort oder im Betrieb sagen", "Wunsch nach einfachen Antworten", "Ärger über konkrete Missstände"],
      erreichbar: "hoch",
      wirkt: ["Sichtbare Normen („Hier lehnen viele Menschenfeindlichkeit ab“), ohne jemanden auszugrenzen", "Prebunking, also Manipulationstechniken erkennen lernen", "Positive Kontakterfahrungen mit Andersdenkenden"],
      schadet: ["Beschämung, die diese Menschen ins andere Lager drängt", "Schwarz-Weiß-Rhetorik, die Ambivalenz nicht aushält"],
      kanaele: ["Kurze Clips in sozialen Medien", "Elternabend, Betriebsversammlung, Vereinsabend", "Nachbarschaftsgruppen und Messenger-Gruppen"],
      botschafter: ["Vertraute Personen aus dem Alltag", "Lokal bekannte Gesichter ohne Parteibindung"]
    },
    {
      id: "abgehaengte",
      name: "Menschen in abgehängten Regionen",
      beschreibung: "Wo Breitband, Kinderbetreuung, Schulen und lebendige Ortszentren fehlen, liegt der Stimmenanteil der Partei höher und die Wahlbeteiligung niedriger, auch wenn man Wirtschaftskraft und Alter herausrechnet (FES 2025, 400 Kreise). Fällt die Lokalzeitung weg, gewinnen kleinere, ideologisch entferntere Parteien (Ellger et al. 2024). Es geht um erlebte Daseinsvorsorge und das Gefühl, dass niemand mehr kommt.",
      motive: ["Abwanderung und leere Ortskerne", "Wegfall von Bus, Bank, Arzt und Lokalzeitung", "Gefühl, vergessen worden zu sein", "Vergleichende Abwertung („Für die wird etwas getan, für uns nicht“)"],
      erreichbar: "mittel",
      wirkt: ["Sichtbare Verbesserungen mit Beteiligung und Rückmeldung", "Lokaljournalismus und Gemeindeblatt stützen", "Lange Präsenz statt Kampagnenwelle"],
      schadet: ["Einmalbesuche kurz vor der Wahl", "Angebote, die aus der Großstadt importiert wirken", "Beteiligung ohne Umsetzung"],
      kanaele: ["Dorfgemeinschaftshaus, Feuerwehr, Sportverein", "Gemeindeblatt und Lokalradio", "Haustür und Hofgespräch"],
      botschafter: ["Bürgermeisterinnen und Ortsvorsteher", "Lokale Unternehmer", "Zurückgekehrte Jüngere"]
    },
    {
      id: "junge-online",
      name: "Junge Erst- und Jungwählende online",
      beschreibung: "Junge Wählende erleben die Partei vor allem über Kurzvideos. Auf TikTok taucht die Partei bei neuen Profilen schon nach 11 bis 12 Minuten in den Empfehlungen auf, andere Parteien erst nach über einer Stunde (Uni Potsdam 2024/2025). Diese Sichtbarkeit entsteht vor allem durch gewöhnliche Nutzerinnen und Nutzer, nicht durch die Partei selbst. Mehr zu posten ist deshalb keine Strategie.",
      motive: ["Zugehörigkeit und Identität", "Provokation, Spaß, Tabubruch", "Gefühl, dass niemand die eigenen Themen anspricht", "Zukunftsangst und Wohnungsnot"],
      erreichbar: "mittel",
      wirkt: ["Prebunking-Clips zu Sündenbock-Rhetorik und falschen Dichotomien", "Dialogformate mit Creatorinnen und Creators aus ihrer Welt", "Teilhabe mit echter Entscheidungsmacht vor Ort"],
      schadet: ["Reichweiten-Wettrüsten", "Belehrende Erwachsene in Jugendsprache", "Humor oder Drohung als Gegenrede ohne Empathie (Hangartner et al. 2021)"],
      kanaele: ["TikTok, Instagram, YouTube Shorts", "Schule, Ausbildung, Jugendclub", "Sport und Gaming"],
      botschafter: ["Creator aus demselben Milieu", "Trainerinnen, Ausbilder, ältere Geschwister"]
    },
    {
      id: "geschlossen",
      name: "Geschlossen rechtsextremes Weltbild",
      beschreibung: "Etwa 3 Prozent der Bevölkerung und knapp ein Fünftel der Wählerschaft (radikal-rechte Autoritäre, GLES 2025). Für Kampagnen ist diese Gruppe kein Ziel. Überzeugung wirkt hier nicht, und erneute Stigmatisierung kann die Akzeptanz bei Teilgruppen sogar erhöhen (Balcells et al. 2025). Die Aufgabe besteht darin, Grenzen zu setzen, Betroffene zu schützen und Ausstiegswillige an Profis zu übergeben.",
      motive: ["Ideologische Gewissheit", "Feindbilder als Identität", "Szenezugehörigkeit und Kameradschaft"],
      erreichbar: "niedrig",
      wirkt: ["Klare Grenzen bei Menschenverachtung, ohne Dauerstreit", "Die Tür offenhalten, falls Zweifel entstehen", "Übergabe an Ausstiegs- und Distanzierungsberatung"],
      schadet: ["Zeit und Kraft in Überzeugungsversuche stecken", "Öffentliche Duelle, die eine Bühne bieten", "Beschämung, die den Märtyrerstatus stärkt"],
      kanaele: ["Keine Kampagnenkanäle", "Professionelle Beratung (Linie Hilfe)"],
      botschafter: ["Ehemalige aus der Szene nur mit pädagogischem Konzept, nie als Einmalvortrag (Walsh und Gansewig 2019)"]
    }
  ],

  bausteine: [
    {
      id: "haustuer",
      name: "Haustürgespräche mit Geschichten",
      typ: "format",
      beschreibung: "Zehnminütige, nicht wertende Gespräche an der Haustür, in denen beide Seiten persönliche Erfahrungen teilen. In drei präregistrierten Feldexperimenten (Kalla und Broockman 2020, 6.869 Personen) senkten solche Gespräche ausgrenzende Einstellungen für mindestens vier Monate; Argumente allein wirkten nicht. Die Gesprächsführenden müssen nicht dieselbe Herkunft haben wie ihr Gegenüber. In Europa wirkt Haustürwahlkampf schwächer als in den USA; deutsche Deep-Canvassing-Projekte sind bislang nicht evaluiert.",
      evidenz: "mittel",
      aufwand: "hoch",
      wirkung: "Kleine, aber über Monate messbare Abnahme ausgrenzender Einstellungen; eine Wirkung auf die Wahlabsicht ist nicht belegt.",
      schritte: ["Ein Team von 4 bis 10 Personen schulen: zuhören, die eigene Geschichte in 60 Sekunden erzählen, keine Gegenrede", "Straßen auswählen, immer zu zweit gehen, Gespräche auf 10 Minuten anlegen", "Eine offene Einstiegsfrage stellen, dann die Person erzählen lassen und nach einem Erlebnis fragen", "Eine eigene Geschichte erzählen, die zum Thema passt, und nach der Reaktion fragen", "Danach nur Pseudonym, Thema und Gesprächsqualität notieren, keine Adressen oder Namen"],
      fallstricke: ["Argumente und Zahlen statt Erzählaustausch bringen nichts", "Allein gehen oder ohne Schutzkonzept in Hochburgen unterwegs sein", "Daten über Haushalte sammeln (Art. 9 DSGVO)", "Nach der Wahl verschwinden"],
      segmente: ["protest", "abgehaengte", "ambivalente"],
      quellen: [
        { titel: "Kalla und Broockman 2020, Reducing Exclusionary Attitudes through Interpersonal Conversation, APSR", url: "https://www.cambridge.org/core/journals/american-political-science-review/article/abs/reducing-exclusionary-attitudes-through-interpersonal-conversation-evidence-from-three-field-experiments/4AA5B97806A4CAFBAB0651F5DAD8F223", jahr: "2020" },
        { titel: "Kalla und Broockman 2024, Shared demographics, BJPS", url: "https://www.cambridge.org/core/services/aop-cambridge-core/content/view/6B7FA4A2CC36C4362C103BFDF97FB88C/S0007123424000279a.pdf", jahr: "2024" },
        { titel: "Hillje 2018, Rückkehr zu den politisch Verlassenen (FES-Interview)", url: "https://www.fes.de/e/rueckkehr-zu-den-politisch-verlassenen", jahr: "2018" }
      ]
    },
    {
      id: "zuhoer-format",
      name: "Zuhör-Formate ohne Agenda",
      typ: "format",
      beschreibung: "Zuhör-Bänke, Küchentischgespräche, offene Sprechstunden oder Hofbesuche, bei denen das Team nur eine Frage mitbringt: „Was müsste sich hier ändern?“ Die qualitativen Studien zu Hochburgen und strukturschwachen Regionen zeigen durchgehend den Wunsch nach Zuhören, Respekt und Wertschätzung. Eine Wirkung auf Einstellungen ist nicht gemessen; das Format liefert aber die Themen für alle weiteren Bausteine.",
      evidenz: "schwach",
      aufwand: "niedrig",
      wirkung: "Erzeugt Anerkennung und ein belastbares Bild der Anliegen; eine Wirkung auf Einstellungen ist nicht belegt.",
      schritte: ["Einen Ort wählen, an dem Menschen ohnehin sind: Markt, Bushaltestelle, Vereinsfest", "Eine offene Frage stellen, keine Flyer, keine Parteilogos", "Jedes Anliegen auf eine Karte schreiben und sichtbar sammeln", "Innerhalb von vier Wochen öffentlich zurückmelden, was mit den Anliegen passiert"],
      fallstricke: ["Zuhören als Vorwand für Überzeugungsarbeit – das fällt auf und zerstört Vertrauen", "Anliegen sammeln und nie zurückmelden", "Nur die eigenen Leute erreichen"],
      segmente: ["protest", "abgehaengte", "konservative-hardliner"],
      quellen: [
        { titel: "Fröhlich, Mannewitz und Ranft 2021, Die Übergangenen, FES", url: "https://www.fes.de/studie-die-uebergangenen", jahr: "2021" },
        { titel: "Schwuchow 2024, Eine Frage von Demütigung und Respekt, FES", url: "https://www.fes.de/themenportal-bildung-arbeit-digitalisierung/artikelseite/eine-frage-von-demuetigung-und-respekt", jahr: "2024" }
      ]
    },
    {
      id: "problem-loesen",
      name: "Lokale Probleme sichtbar lösen",
      typ: "format",
      beschreibung: "Ein konkretes Anliegen aus dem Zuhören wird mit Beteiligung der Betroffenen angepackt: Bus, Jugendraum, Breitband, Arztpraxis, Ortskern. Die FES-Analyse von 400 Kreisen zeigt, dass schlechtere Daseinsvorsorge mit höherer Zustimmung einhergeht und Zufriedenheit mit lebendigen Ortszentren mit niedrigerer. Kausalität ist nicht bewiesen, aber die Richtung ist über mehrere Studien hinweg konsistent. Die Rückmeldung ist Teil der Wirkung.",
      evidenz: "mittel",
      aufwand: "hoch",
      wirkung: "Senkt erlebten Kontrollverlust und das Gefühl, vernachlässigt zu werden; der Zusammenhang mit dem Wahlverhalten ist korrelativ belegt.",
      schritte: ["Ein lösbares Anliegen aus der Zuhörphase wählen, nicht das größte", "Betroffene in die Arbeitsgruppe holen, auch Menschen mit Parteinähe", "Verwaltung und Gemeinderat früh einbinden, Zuständigkeiten klären", "Meilensteine öffentlich machen, auch Rückschläge", "Beim Abschluss die Beteiligten sichtbar würdigen"],
      fallstricke: ["Beteiligung ohne Umsetzung erzeugt mehr Frust als keine Beteiligung", "Erfolg allein dem Bündnis zuschreiben statt den Beteiligten", "Zu große Projekte, die vor der nächsten Wahl nicht sichtbar werden"],
      segmente: ["abgehaengte", "protest", "konservative-hardliner"],
      quellen: [
        { titel: "Heider et al. 2025, Antidemokratische Wahlerfolge im ungleichen Deutschland, FES", url: "https://www.fes.de/news/ungleiches-deutschland-antidemokratische-wahlerfolge-durch-fehlende-daseinsvorsorge", jahr: "2025" },
        { titel: "More in Common 2019, Die andere deutsche Teilung", url: "https://www.moreincommon.com/media/osgpejd1/more-in-common_dieandereteilung_studie_1-0-1.pdf", jahr: "2019" }
      ]
    },
    {
      id: "begegnung",
      name: "Moderierte Begegnung zwischen Andersdenkenden",
      typ: "format",
      beschreibung: "Zweier- oder Kleingruppengespräche mit Moderation oder klaren Gesprächsregeln, in denen Menschen mit gegensätzlichen politischen Ansichten aufeinandertreffen. Die quasi-experimentelle Auswertung von „Deutschland spricht“ 2018 zeigt, dass ein zweistündiges Gespräch affektive Polarisierung und Stereotype um 0,2 bis 0,35 Standardabweichungen senkt und Vertrauen erhöht; die politischen Positionen bleiben aber bestehen. Treiber ist die positive Kontakterfahrung, nicht das Argument. Gespräche unter Gleichgesinnten radikalisieren.",
      evidenz: "mittel",
      aufwand: "mittel",
      wirkung: "Weniger Feindseligkeit und mehr Vertrauen zwischen den Lagern; Meinungen ändern sich nicht.",
      schritte: ["Paare oder Gruppen bewusst gegensätzlich zusammensetzen, nie homogen", "Gesprächsregeln vorab festlegen: ausreden lassen, nachfragen, niemand muss überzeugen", "Mit persönlichen Fragen beginnen, nicht mit Streitthemen", "Moderation oder geschulte Gastgeberinnen und Gastgeber einsetzen", "Kurze Befragung vorher und nachher zu den Gefühlen gegenüber der anderen Seite"],
      fallstricke: ["Runden, zu denen nur die eigene Blase kommt, polarisieren", "Unmoderierte Foren und offene Mikrofone", "Erfolg an Meinungsänderung messen"],
      segmente: ["ambivalente", "konservative-hardliner", "protest"],
      quellen: [
        { titel: "Fang, Heuser und Stötzer 2025, How In-Person Conversations Shape Political Polarization, Journal of Public Economics", url: "https://epflicht.ulb.uni-bonn.de/download/pdf/760027", jahr: "2025" },
        { titel: "Paluck, Green und Green 2019, The contact hypothesis re-evaluated", url: "https://www.cambridge.org/core/journals/behavioural-public-policy/article/contact-hypothesis-reevaluated/142C913E7FA9E121277B29E994124EC5", jahr: "2019" },
        { titel: "Caluwaerts et al. 2023, Deliberation and polarization review", url: "https://www.frontiersin.org/journals/political-science/articles/10.3389/fpos.2023.1127372/full", jahr: "2023" }
      ]
    },
    {
      id: "buergerrat",
      name: "Bürgerrat oder Bürgerversammlung mit Losverfahren",
      typ: "format",
      beschreibung: "Eine zufällig ausgewählte, stratifizierte Gruppe berät mit neutraler Moderation eine konkrete Frage und gibt Empfehlungen an Gemeinderat oder Kreistag. Von 80 Studien berichten 46 Prozent Depolarisierung und 43 Prozent Polarisierung; heterogene, moderierte Gruppen, die sich persönlich treffen, depolarisieren, homogene oder unmoderierte polarisieren. In Irland stieg die wahrgenommene Legitimität vor allem bei Menschen mit niedrigem Vertrauen; der Effekt verschwand aber, wenn Empfehlungen nicht umgesetzt wurden. Ob das Format Menschen mit rechtsextremer Parteibindung erreicht, ist nicht belegt.",
      evidenz: "umstritten",
      aufwand: "hoch",
      wirkung: "Kann das Vertrauen von Misstrauischen erhöhen, aber nur mit verbindlicher Umsetzung und echter Vielfalt.",
      schritte: ["Vor dem Start einen Beschluss des Gemeinderats einholen, wie mit den Empfehlungen umgegangen wird", "Losverfahren mit Quoten nach Alter, Bildung und Ortsteil, nicht nur Freiwillige", "Neutrale, empathische Moderation beauftragen", "Die Frage eng und lokal fassen: Ortsmitte, Mobilität, Jugend", "Ergebnis und Umsetzung öffentlich nachverfolgen"],
      fallstricke: ["Bürgerrat ohne Umsetzungspflicht – der Legitimitätsgewinn verpufft", "Nur Engagierte melden sich, Vielfalt bleibt aus", "Unmoderierte oder homogene Untergruppen"],
      segmente: ["abgehaengte", "protest", "konservative-hardliner"],
      quellen: [
        { titel: "Caluwaerts et al. 2023, Deliberation and polarization review", url: "https://www.frontiersin.org/journals/political-science/articles/10.3389/fpos.2023.1127372/full", jahr: "2023" },
        { titel: "Germann, Marien und Muradova 2024, Scaling up (Irland)", url: "https://eprints.soton.ac.uk/502402/1/germann-et-al-2022-scaling-up-unpacking-the-effect-of-deliberative-mini-publics-on-legitimacy-perceptions.pdf", jahr: "2024" },
        { titel: "IDPF Wuppertal und Verian 2024, Evaluation Bürgerrat Ernährung im Wandel", url: "https://bundestag.de/resource/blob/1011226/f8bb4b360f58189eeec8fe3e47b53ca7/evaluation_br_ergebnisse_kurzfassung.pdf", jahr: "2024" }
      ]
    },
    {
      id: "partnerschaft",
      name: "Breites Bündnis vor Ort",
      typ: "format",
      beschreibung: "Ein Bündnis aus Vereinen, Kirchen, Gewerbe, Verwaltung und Schulen, das für Werte und Sachthemen steht, nicht gegen einen Parteinamen. Die Evaluation der „Partnerschaften für Demokratie“ fand in 51 von 54 Aspekten eine günstigere Entwicklung als in Regionen ohne Partnerschaft, 22 davon signifikant; die Daten beruhen allerdings auf Selbsteinschätzungen der Koordinatorinnen und Koordinatoren. Das Bundesverwaltungsgericht hat 2026 bestätigt, dass Kommunen Bündnissen gegen Rechtsextremismus beitreten dürfen, solange diese sachlich bleiben.",
      evidenz: "mittel",
      aufwand: "mittel",
      wirkung: "Schafft Struktur, Sichtbarkeit und Dauer; eine Wirkung auf Einstellungen ist plausibel, aber nicht kausal belegt.",
      schritte: ["Die unwahrscheinlichen Partner zuerst fragen: Feuerwehr, Schützen, Landfrauen, Handwerk", "Gemeinsame Grundsätze auf eine Seite schreiben, ohne Parteinamen", "Rollen trennen: Amt und Verein sprechen nicht mit derselben Stimme", "Ein Jahr Laufzeit mit festen Treffen, nicht nur vor Wahlen"],
      fallstricke: ["Ein Bündnis, das faktisch nur gegen eine Partei gerichtet ist, gefährdet Gemeinnützigkeit und Neutralitätspflicht", "Ein Bündnis aus den immer gleichen Engagierten", "Nachbarn, die anders wählen, als Gegner behandeln"],
      segmente: ["ambivalente", "konservative-hardliner", "abgehaengte"],
      quellen: [
        { titel: "ISS 2024, Partnerschaften für Demokratie, Abschlussbericht", url: "https://www.vielfalt-mediathek.de/wp-content/uploads/2025/05/Zusammenleben-in-der-Migrationsgesellschaft_Abschlussbericht-zu-Partnerschaften-fuer-Demokratie.pdf", jahr: "2024" },
        { titel: "BVerwG, Urteil vom 26.03.2026, 8 C 3.25", url: "https://www.bverwg.de/de/pm/2026/24", jahr: "2026" },
        { titel: "Helfenstein 2025, Politisch, aber neutral? BBE-Newsletter", url: "https://www.b-b-e.de/fileadmin/Redaktion/05_Newsletter/01_BBE_Newsletter/2025/23/NL_23-2025_Eva_Helfenstein.pdf", jahr: "2025" }
      ]
    },
    {
      id: "gegenprotest",
      name: "Demonstration und Gegenprotest",
      typ: "format",
      beschreibung: "Große Kundgebungen setzen eine sichtbare Norm und mobilisieren die eigene Seite. Lokale antirassistische Proteste nach Hanau 2020 und im Januar 2024 gingen mit niedrigeren Stimmenanteilen der Partei bei den folgenden Wahlen einher (WZB 2025); der Umfrageeinbruch um 2 bis 4 Punkte war aber bis zum Jahresende wieder aufgeholt. Eine Befragung von 534 Demonstrierenden zeigt, dass vor allem Gebildete und Linke mobilisiert wurden. Reaktanz bei Anhängern ist plausibel, aber nicht gemessen.",
      evidenz: "umstritten",
      aufwand: "mittel",
      wirkung: "Stärkt Norm und Zusammenhalt im demokratischen Lager; die Wirkung auf Wählende ist unklar, das Risiko der Beschämung real.",
      schritte: ["Die Botschaft auf Werte und Ort ausrichten: „Wir hier stehen für Respekt“, nicht gegen Nachbarn", "Breite Trägerschaft sichern, auch Vereine, Kirchen und Gewerbe", "Keine Schilder, die Wählende beschämen", "Nach der Demo zu Zuhören und Problemlösen übergehen"],
      fallstricke: ["„Nazis raus“-Rhetorik trifft Nachbarn und erzeugt Reaktanz", "Einmalige Veranstaltung ohne Anschluss", "Gegenprotest als Ersatz für das Gespräch"],
      segmente: ["ambivalente"],
      quellen: [
        { titel: "Stephan und Schürmann 2025, Anti-racist protests and voting, WZB", url: "https://ideas.repec.org/p/zbw/wzbccs/309433.html", jahr: "2025" },
        { titel: "FES und ipb 2024, Was bringen Proteste für die Demokratie", url: "https://www.fes.de/news/studie-was-bringen-proteste-fuer-die-demokratie", jahr: "2024" },
        { titel: "ZDF 2025, AfD-Umfragewerte nach Protesten", url: "https://www.zdfheute.de/politik/deutschland/afd-umfragewerte-protest-100.html", jahr: "2025" }
      ]
    },
    {
      id: "botschafter",
      name: "Vertrauenswürdige Botschafter aus dem Milieu",
      typ: "botschaft",
      beschreibung: "Überzeugend ist, wer aus dem eigenen Lager kommt oder gegen das eigene Interesse spricht. Impfempfehlungen republikanischer Eliten erhöhten bei Republikanern die Impfbereitschaft um 5,7 Punkte; dieselbe Botschaft von Demokraten löste Abwehr aus (Pink et al. 2021). Übertragen auf den Ort heißt das: Die Handwerksmeisterin, der Feuerwehrkommandant, die Pflegekraft oder der ehemalige Wähler tragen Botschaften, die abprallen würden, kämen sie von Aktivisten.",
      evidenz: "mittel",
      aufwand: "mittel",
      wirkung: "Botschaften werden gehört statt abgewehrt; die Effektgröße ist in Deutschland nicht gemessen.",
      schritte: ["Eine Liste der im Ort respektierten Personen erstellen, quer durch die politischen Lager", "Persönlich anfragen, mit einem konkreten Anliegen statt mit Kampagnenlogo", "Botschafter sprechen in eigenen Worten, ohne Skript", "Sichtbarkeit dort, wo ihre Glaubwürdigkeit liegt: Betrieb, Verein, Gemeindeblatt"],
      fallstricke: ["Botschafter aus dem gegnerischen Lager verstärken die Abwehr", "Prominente von außen statt bekannter Gesichter von hier", "Botschafter verbrauchen, indem man sie vor jeden Karren spannt"],
      segmente: ["konservative-hardliner", "protest", "abgehaengte", "junge-online"],
      quellen: [
        { titel: "Pink et al. 2021, Elite party cues increase vaccination intentions, PNAS", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8364165", jahr: "2021" },
        { titel: "Kalla und Broockman 2024, Shared demographics, BJPS", url: "https://www.cambridge.org/core/services/aop-cambridge-core/content/view/6B7FA4A2CC36C4362C103BFDF97FB88C/S0007123424000279a.pdf", jahr: "2024" }
      ]
    },
    {
      id: "normen-sichtbar",
      name: "Soziale Normen sichtbar machen, ohne zu beschämen",
      typ: "botschaft",
      beschreibung: "Menschen richten sich danach, was sie in ihrem Umfeld für normal halten. Ein öffentliches Signal kann die Bereitschaft erhöhen, fremdenfeindliche Meinungen zu äußern (Bursztyn et al. 2020). Umgekehrt senken sichtbare Normen gegen Hass die Hassrede; nach den Anschlägen 2016 nahm der Hass gegen Geflüchtete nur dort zu, wo keine solche Norm etabliert war (Álvarez-Benjumea und Winter 2020). Die Norm richtet sich gegen Menschenverachtung, nicht gegen Nachbarn.",
      evidenz: "mittel",
      aufwand: "niedrig",
      wirkung: "Senkt offen geäußerte Menschenfeindlichkeit im Umfeld; verändert Einstellungen nicht zwingend.",
      schritte: ["Eine Werteerklärung des Ortes oder Vereins formulieren: „Hier ist jeder Mensch willkommen, hier reden wir respektvoll“", "Von vielen Alltagsorten tragen lassen: Bäckerei, Vereinsheim, Praxis, Betrieb", "Bei Hassrede ruhig und sichtbar widersprechen, ohne die Person anzugreifen", "Regelmäßig erneuern, denn eine Norm braucht Wiederholung"],
      fallstricke: ["Erklärungen, die Wählende als Nazis ansprechen, erzeugen Reaktanz; erneute Stigmatisierung wirkt nicht (Balcells et al. 2025)", "Die Norm ist nur in der eigenen Blase sichtbar", "Einmalige Aktion ohne Verankerung"],
      segmente: ["ambivalente", "junge-online", "konservative-hardliner"],
      quellen: [
        { titel: "Álvarez-Benjumea und Winter 2020, PNAS", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7502775", jahr: "2020" },
        { titel: "Bursztyn, Egorov und Fiorin 2020, From Extreme to Mainstream", url: "https://home.uchicago.edu/~bursztyn/Bursztyn_Egorov_Fiorin_Extreme_Mainstream_2020_03_26.pdf", jahr: "2020" },
        { titel: "Balcells et al. 2025, Restigmatizing the radical right, JEPS", url: "https://www.cambridge.org/core/journals/journal-of-experimental-political-science/article/restigmatizing-the-radical-right-a-oneway-street/CF4D0AD5E55335AB741D473061618D11", jahr: "2025" }
      ]
    },
    {
      id: "respekt",
      name: "Respekt am Arbeitsplatz und im Amt",
      typ: "botschaft",
      beschreibung: "Wer am Arbeitsplatz institutionelle Demütigung erlebt, ohne sich wehren zu können, wählt mit 7 Prozentpunkten höherer Wahrscheinlichkeit die Partei (FES 2024, über 5.000 Befragte). More in Common beschreibt einen dreifachen Kontrollverlust: persönlich, politisch, national. Betriebe, Behörden und Vereine können Anerkennung zur Alltagspraxis machen, etwa durch Beschwerdewege, Mitsprache und die Würdigung von Leistung. Anerkennung ist ein eigenständiger, aber nicht der dominante Faktor.",
      evidenz: "mittel",
      aufwand: "mittel",
      wirkung: "Senkt erlebte Demütigung, einen der Treiber; die Wirkung auf das Wahlverhalten ist korrelativ belegt.",
      schritte: ["Mit Betriebsräten, Behördenleitungen und Vereinsvorständen Beschwerde- und Mitsprachewege prüfen", "Leistung sichtbar würdigen, besonders in unterbezahlten Berufen", "Mitarbeitende im Amt für Bürgerkontakt auf Augenhöhe schulen", "Rückmeldung einholen, ob sich Menschen ernst genommen fühlen"],
      fallstricke: ["Anerkennung als Trick für politische Zwecke wird durchschaut", "Nur Symbolik ohne echte Mitsprache"],
      segmente: ["protest", "konservative-hardliner", "abgehaengte"],
      quellen: [
        { titel: "Schwuchow 2024, Eine Frage von Demütigung und Respekt, FES", url: "https://www.fes.de/themenportal-bildung-arbeit-digitalisierung/artikelseite/eine-frage-von-demuetigung-und-respekt", jahr: "2024" },
        { titel: "More in Common 2019, Die andere deutsche Teilung", url: "https://www.moreincommon.com/media/osgpejd1/more-in-common_dieandereteilung_studie_1-0-1.pdf", jahr: "2019" }
      ]
    },
    {
      id: "faktencheck",
      name: "Faktencheck mit klaren Grenzen",
      typ: "botschaft",
      beschreibung: "Faktenchecks korrigieren Fehlwissen, auch bei Anhängern; ein Backfire-Effekt ist nach großen Replikationsstudien selten (Wood und Porter 2019, über 10.000 Personen). Die Bewertung von Kandidaten und die Wahlabsicht ändern sie aber nicht (Nyhan et al. 2019). Faktenchecks sind Hygiene, kein Hebel. Sinnvoll sind sie als Reaktion auf konkrete Falschbehauptungen im Ort, nie als Kern einer Kampagne.",
      evidenz: "stark",
      aufwand: "niedrig",
      wirkung: "Korrigiert Wissen zuverlässig; verändert die Parteineigung nicht.",
      schritte: ["Nur konkrete, lokal kursierende Behauptungen prüfen", "Kurz korrigieren, mit Quelle und ohne Häme", "Die Erzähltechnik dahinter benennen, nicht die Person", "Jeden Faktencheck mit einem Gesprächsangebot verbinden"],
      fallstricke: ["Faktenduelle als Hauptstrategie ändern keine Wahlentscheidung", "Korrektur mit Spott beschämt und schließt Türen", "Jeden Unsinn prüfen und ihm damit Reichweite geben"],
      segmente: ["ambivalente", "konservative-hardliner"],
      quellen: [
        { titel: "Wood und Porter 2019, The elusive backfire effect", url: "https://www.doi.org/10.1007/s11109-018-9443-y", jahr: "2019" },
        { titel: "Nyhan et al. 2019, Taking fact-checks literally but not seriously", url: "https://ore.exeter.ac.uk/repository/handle/10871/38020", jahr: "2019" }
      ]
    },
    {
      id: "prebunking-clips",
      name: "Prebunking-Clips lokal und wiederholt",
      typ: "kanal",
      beschreibung: "Kurze Videos oder Beiträge, die Manipulationstechniken erklären, bevor diese wirken: Sündenbock-Rhetorik, falsche Dichotomien, Emotionalisierung, Dekontextualisierung. Eine Meta-Analyse von 42 Studien (rund 42.500 Personen) zeigt, dass Inokulation die Glaubwürdigkeit von Falschinformationen senkt; in einem YouTube-Feldtest mit 22.632 Personen verbesserten 90-Sekunden-Videos die Erkennung parteiübergreifend um etwa 5 Prozentpunkte. Gemessen wird dabei, ob Techniken erkannt werden, nicht die Parteineigung. Ohne Auffrischung verfallen die Effekte innerhalb von Wochen bis Monaten.",
      evidenz: "stark",
      aufwand: "mittel",
      wirkung: "Verbessert das Erkennen von Manipulationstechniken; eine Wirkung auf die Parteipräferenz ist nicht belegt.",
      schritte: ["Bestehende Clips (Jigsaw, klicksafe, Correctiv) sichten und lokal einbetten", "Eigene Beispiele aus dem Ort nachbauen: Welche Technik steckt im Flugblatt oder im Post?", "Über Schulen, Vereine, Lokalmedien und Messenger-Gruppen verbreiten", "Alle 6 bis 8 Wochen auffrischen und die Erkennung vorher und nachher testen"],
      fallstricke: ["Einmalige Welle ohne Auffrischung", "Clips, die eine Partei direkt angreifen, statt Techniken zu erklären", "Die wichtigsten Studien sind von Jigsaw mitfinanziert; Erwartungen realistisch halten", "Allgemeine Medienskepsis fördern statt Urteilskraft"],
      segmente: ["junge-online", "ambivalente"],
      quellen: [
        { titel: "Lu et al. 2023, Meta-Analyse Inokulation, JMIR", url: "https://www.jmir.org/2023/1/e49255", jahr: "2023" },
        { titel: "Roozenbeek et al. 2022, Science Advances (Cambridge-Zusammenfassung)", url: "https://www.cam.ac.uk/stories/inoculateexperiment", jahr: "2022" },
        { titel: "Maertens et al. 2021, Long-term effectiveness of inoculation", url: "https://www.repository.cam.ac.uk/handle/1810/312077", jahr: "2021" },
        { titel: "Jigsaw und Google 2023, Prebunking-Kampagne Deutschland", url: "https://blog.google/intl/de-de/unternehmen/technologie/prebunking-kampagne-gegen-falschinformationen/", jahr: "2023" }
      ]
    },
    {
      id: "lokalmedien",
      name: "Lokaljournalismus stützen und nutzen",
      typ: "kanal",
      beschreibung: "Nach dem Wegfall einer Lokalzeitung gewinnen in Deutschland kleinere, ideologisch entferntere Parteien (Ellger et al. 2024, BJPS); eine Auswertung von 1.100 Gemeinden in Baden-Württemberg findet höhere Stimmenanteile dort, wo es keine Lokalzeitung gibt. Lokalzeitung, Gemeindeblatt und Lokalradio sind zugleich der Kanal, über den Zuhören, Problemlösung und Botschafter ihre Reichweite bekommen. Kausalität ist nicht bewiesen.",
      evidenz: "mittel",
      aufwand: "mittel",
      wirkung: "Hält lokale Öffentlichkeit und Rechenschaft aufrecht; der Zusammenhang mit dem Wahlverhalten ist korrelativ.",
      schritte: ["Die Lokalredaktion als Partner gewinnen, etwa für Serien zu Anliegen aus dem Zuhören", "Ein Gemeindeblatt oder einen Newsletter aufbauen, wo es keine Zeitung mehr gibt", "Botschafter und gelöste Probleme als Geschichten anbieten, nicht als Pressemitteilung", "Lokalen Journalismus finanziell oder mit Abo-Aktionen stützen"],
      fallstricke: ["Medien als Sprachrohr des Bündnisses benutzen – das zerstört Glaubwürdigkeit", "Nur Verlautbarungen statt Geschichten von Menschen", "Die Lokalredaktion mit Parteienstreit statt mit Sachthemen füttern"],
      segmente: ["abgehaengte", "konservative-hardliner", "protest"],
      quellen: [
        { titel: "Ellger et al. 2024, Local newspaper decline, BJPS", url: "https://www.cambridge.org/core/services/aop-cambridge-core/content/view/C672161DC8EF72E990B88DACD5088BEB/S0007123424000243a.pdf", jahr: "2024" },
        { titel: "Heider et al. 2025, FES, Antidemokratische Wahlerfolge im ungleichen Deutschland", url: "https://www.fes.de/news/ungleiches-deutschland-antidemokratische-wahlerfolge-durch-fehlende-daseinsvorsorge", jahr: "2025" }
      ]
    },
    {
      id: "vereine-sport",
      name: "Vereine und Sport als Träger",
      typ: "kanal",
      beschreibung: "Sportvereine, Feuerwehren, Schützen, Landfrauen und Chöre erreichen Menschen quer durch alle politischen Lager und sind oft die letzten Orte gemeinsamer Erfahrung im Dorf. Das BMI-Programm „Zusammenhalt durch Teilhabe“ setzt auf Demokratieberaterinnen und -berater in Vereinen ländlicher Räume. Die Evaluationslage ist dünn: Belegt sind Strukturen und Zufriedenheit, nicht Einstellungsänderungen. Als Träger für Begegnung, Zuhören und Normen sind Vereine aber kaum zu ersetzen.",
      evidenz: "schwach",
      aufwand: "mittel",
      wirkung: "Öffnet den Zugang zu Milieus, die Kampagnen sonst nicht erreichen; die Wirkung selbst ist nicht gemessen.",
      schritte: ["Vereinsvorstände persönlich ansprechen und mit einem Anliegen des Vereins beginnen", "Angebote in den Vereinsalltag einbauen: Trainingsabend, Vereinsfest, Jahreshauptversammlung", "Vereinsregeln für respektvollen Umgang gemeinsam formulieren", "Die Demokratieberatung des Landesprogramms anfragen"],
      fallstricke: ["Den Verein politisch vereinnahmen – das spaltet ihn", "Einmaliger Vortrag ohne Einbettung (Walsh und Gansewig 2019)", "Mitglieder mit Parteinähe ausschließen, statt sie einzubinden"],
      segmente: ["protest", "abgehaengte", "konservative-hardliner", "junge-online"],
      quellen: [
        { titel: "Demokratie leben!, Abschlussbericht Evaluationsverbund 2020 bis 2024", url: "https://www.demokratie-leben.de/resource/blob/267870/1f2d838303b26a22cb4e89c85a70d92b/fp2-langfassung-abschlussbericht-evaluationsverbund-data.pdf", jahr: "2025" },
        { titel: "Walsh und Gansewig 2019, Evaluationsstudie einer schulbasierten Präventionsmaßnahme, NZK", url: "https://epflicht.ulb.uni-bonn.de/download/pdf/591326", jahr: "2019" }
      ]
    },
    {
      id: "online-dialog",
      name: "Empathische Gegenrede und Dialog online",
      typ: "kanal",
      beschreibung: "In einem Twitter-Feldexperiment mit 1.350 Accounts verringerten empathische Antworten rassistische Posts um 0,1 bis 0,2 Standardabweichungen; Humor und Drohungen bewirkten nichts (Hangartner et al. 2021). Der Sock-Puppet-Audit zeigt, dass mehr Posten keine Sichtbarkeit bringt. Dialogformate, Creator-Netzwerke und Prebunking-Clips sind die plausibleren Wege, bislang aber ohne Wirkungsnachweis auf das Wahlverhalten.",
      evidenz: "mittel",
      aufwand: "mittel",
      wirkung: "Senkt Hassrede in Kommentarspalten; eine Wirkung auf Einstellungen und Wahlverhalten ist nicht belegt.",
      schritte: ["Ein kleines Team mit festen Regeln: empathisch, kurz, nie spöttisch, nie drohend", "Dem Menschen hinter dem Post antworten: „Ich verstehe die Sorge, ich sehe es so.“", "Lokale Creator und Gruppen-Admins als Gastgeber gewinnen", "Bedrohungen dokumentieren und melden, Selbstschutz geht vor"],
      fallstricke: ["Humor, Sarkasmus und Bloßstellen wirken nicht", "Reichweiten-Wettrüsten mit immer mehr Posts", "Einzelne, die sich im Kommentarkrieg aufreiben"],
      segmente: ["junge-online", "ambivalente"],
      quellen: [
        { titel: "Hangartner et al. 2021, Empathy-based counterspeech, PNAS", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8685915", jahr: "2021" },
        { titel: "Verwiebe et al. 2025, Uni Potsdam und Bertelsmann, Algorithmen im Wahlkampf", url: "https://www.bertelsmann-stiftung.de/de/unsere-projekte/engagement-junger-menschen-fuer-demokratie/projektnachrichten/algorithmen-im-wahlkampf", jahr: "2025" }
      ]
    },
    {
      id: "wirkungsmessung",
      name: "Wirkung messen von Anfang an",
      typ: "messung",
      beschreibung: "Von zwölf Evaluationen in der Rechtsextremismusprävention war eine einzige eine Wirkungsbilanzierung mit Kontrollgruppe (NZK 2019). Typische Fehler sind der Rückzug auf Prozesszahlen, die Zersplitterung in Mikrointerventionen und überzogene Geltungsansprüche. Der Standard sind realistische, abgestufte Zielgrößen mit Vergleichsgruppe, Messung vorher und nachher und Prüfung unerwünschter Effekte. Steigende Umfragewerte belegen keine Unwirksamkeit, weil der Vergleich fehlt, wie es ohne die Kampagne gelaufen wäre.",
      evidenz: "schwach",
      aufwand: "mittel",
      wirkung: "Macht Lernen möglich und schützt vor Selbsttäuschung; ist selbst kein Wirkungshebel.",
      schritte: ["Vor dem Start zwei bis drei Zielgrößen festlegen: Kontakterfahrung, Erkennen von Techniken, erlebte Anerkennung", "Einen Vergleich einbauen: anderer Ortsteil, spätere Welle, Wartegruppe", "Kurze Skalen vorher und nachher, anonym, höchstens fünf Fragen", "Unerwünschte Effekte abfragen: Reaktanz, Spaltung im Verein", "Quartalsweise auswerten und die Bausteine anpassen"],
      fallstricke: ["Reichweite, Teilnehmerzahlen und Zufriedenheit als Wirkung ausgeben", "Personenbezogene Daten über politische Einstellungen sammeln (Art. 9 DSGVO)", "Misserfolge verschweigen, statt daraus zu lernen"],
      segmente: ["protest", "konservative-hardliner", "ambivalente", "abgehaengte", "junge-online"],
      quellen: [
        { titel: "Schmidt, Kober und Adewuyi 2019, Effekte von Maßnahmen zur Prävention von Rechtsextremismus, NZK", url: "https://epflicht.ulb.uni-bonn.de/download/pdf/591327", jahr: "2019" },
        { titel: "Greuel, Heinze und König 2025, Was wirkt wie und warum? Wirkungsevaluationen", url: "https://www.pedocs.de/volltexte/2025/33087/pdf/Greuel_et_al_2025_Was_wirkt_wie_warum_Wirkungsevaluationen.pdf", jahr: "2025" },
        { titel: "Koynova und van Heeswijk 2025, Klientenzentrierte Evaluation, PrEval-Studie 8", url: "https://preval.hsfk.de/en/publications/preval-studies/preval-studie-8/2025", jahr: "2025" }
      ]
    }
  ],

  phasen: [
    {
      id: "zuhoeren",
      name: "Zuhören und verstehen",
      dauer: "4 bis 8 Wochen",
      ziele: ["Die fünf wichtigsten Anliegen im Ort kennen, in den Worten der Menschen", "Erste Beziehungen zu Menschen außerhalb der eigenen Blase", "Nullmessung für die spätere Wirkungsprüfung"],
      bausteine: ["zuhoer-format", "haustuer", "wirkungsmessung"],
      kennzahlen: ["gespraeche", "anliegen"]
    },
    {
      id: "buendnis",
      name: "Bündnis und Botschafter",
      dauer: "4 bis 8 Wochen, parallel zum Zuhören",
      ziele: ["Breite Trägerschaft quer durch die Lager", "Fünf bis zehn glaubwürdige Botschafter aus dem Milieu", "Rollen zwischen Amt, Verein und Privatpersonen geklärt"],
      bausteine: ["partnerschaft", "botschafter", "vereine-sport", "lokalmedien"],
      kennzahlen: ["botschafter-aktiv"]
    },
    {
      id: "liefern",
      name: "Liefern und begegnen",
      dauer: "3 bis 12 Monate",
      ziele: ["Mindestens ein Anliegen sichtbar gelöst, mit Rückmeldung", "Moderierte Begegnungen zwischen Andersdenkenden", "Anerkennung als Alltagspraxis in Betrieb, Amt und Verein"],
      bausteine: ["problem-loesen", "begegnung", "buergerrat", "respekt"],
      kennzahlen: ["umgesetzt", "kontakt-erfahrung"]
    },
    {
      id: "verstaerken",
      name: "Sichtbar machen und immunisieren",
      dauer: "laufend, Auffrischung alle 6 bis 8 Wochen",
      ziele: ["Die Norm des respektvollen Umgangs ist an vielen Alltagsorten sichtbar", "Manipulationstechniken werden im Ort erkannt", "Hassrede wird online und offline empathisch beantwortet"],
      bausteine: ["normen-sichtbar", "prebunking-clips", "online-dialog", "faktencheck", "gegenprotest"],
      kennzahlen: ["erkennung", "reichweite"]
    },
    {
      id: "lernen",
      name: "Messen, anpassen, verankern",
      dauer: "Quartalsrhythmus, mindestens zwei Jahre",
      ziele: ["Wirkung mit Vergleichsgruppe prüfen, nicht nur Reichweite", "Bausteine streichen, die nicht wirken, auch wenn sie beliebt sind", "Strukturen in bestehende Träger überführen, damit es nach der Förderung weitergeht"],
      bausteine: ["wirkungsmessung", "partnerschaft"],
      kennzahlen: ["einstellung-vergleich", "gespraeche"]
    }
  ],

  kennzahlen: [
    {
      id: "gespraeche",
      name: "Geführte Gespräche nach Qualität",
      wie: "Anzahl der Gespräche von mehr als fünf Minuten, in denen die Person von sich erzählt hat; nur Strichliste und Thema, keine Namen.",
      warum: "Nicht wertende Gespräche mit Erzählaustausch sind der am besten belegte Einzelhebel auf Personenebene.",
      fallstrick: "Türklingeln und verteilte Flyer mitzählen – Kontakte ohne Gespräch haben keine belegte Wirkung."
    },
    {
      id: "anliegen",
      name: "Gesammelte und zurückgemeldete Anliegen",
      wie: "Liste der genannten Anliegen mit Häufigkeit und dem Anteil, zu dem innerhalb von vier Wochen öffentlich eine Rückmeldung erfolgt ist.",
      warum: "Zuhören wirkt nur, wenn Menschen merken, dass etwas damit passiert.",
      fallstrick: "Anliegen sammeln als Selbstzweck; eine Rückmeldequote unter 50 Prozent zerstört Vertrauen."
    },
    {
      id: "umgesetzt",
      name: "Sichtbar gelöste Probleme",
      wie: "Anzahl der umgesetzten Anliegen und ob die Beteiligten das Ergebnis auch so wahrnehmen (kurze Nachfrage).",
      warum: "Erlebte Daseinsvorsorge und Kontrolle hängen über viele Studien hinweg mit niedrigerer Zustimmung zusammen.",
      fallstrick: "Dem Bündnis zuschreiben, was Verwaltung oder Beteiligte geleistet haben."
    },
    {
      id: "kontakt-erfahrung",
      name: "Positive Kontakterfahrung zwischen Lagern",
      wie: "Vorher und nachher fragen: „Wie warm oder kalt stehst du Menschen gegenüber, die politisch anders denken?“ Skala von 0 bis 100, anonym, nach Begegnungsformaten.",
      warum: "„Deutschland spricht“ zeigt eine messbare Abnahme affektiver Polarisierung durch Kontakt, nicht durch Argumente.",
      fallstrick: "Meinungsänderung erwarten; die bleibt aus und ist nicht das Ziel."
    },
    {
      id: "erkennung",
      name: "Erkennung von Manipulationstechniken",
      wie: "Kurztest mit vier Beispielposts vor und nach dem Prebunking, Wiederholung nach acht Wochen.",
      warum: "Inokulation verbessert nachweislich die Erkennung, der Effekt verfällt aber ohne Auffrischung.",
      fallstrick: "Views oder Klicks der Clips zählen, statt zu testen, ob jemand etwas erkannt hat."
    },
    {
      id: "botschafter-aktiv",
      name: "Aktive Botschafter aus dem Milieu",
      wie: "Anzahl der Personen, die in den letzten vier Wochen in eigenen Worten öffentlich oder im Verein für respektvollen Umgang eingetreten sind, aufgeschlüsselt nach Herkunftsmilieu.",
      warum: "Botschaften wirken nur aus dem eigenen Lager; die Liste zeigt, ob das Bündnis über die eigene Blase hinausreicht.",
      fallstrick: "Nur Engagierte zählen, die ohnehin dabei wären."
    },
    {
      id: "einstellung-vergleich",
      name: "Einstellungsveränderung mit Vergleichsgruppe",
      wie: "Drei bis fünf anonyme Fragen zu Vertrauen, Zugehörigkeit und Ausgrenzung, vorher und nach sechs Monaten, im Zielgebiet und im Vergleichsgebiet.",
      warum: "Nur der Vergleich zeigt, ob die Kampagne etwas bewirkt hat oder ob sich einfach die Zeiten geändert haben.",
      fallstrick: "Wahlergebnisse als Erfolgsmaß nehmen – zu viele Einflüsse, kein Vergleich ohne Kampagne; steigende Werte heißen nicht, dass nichts gewirkt hat."
    },
    {
      id: "reichweite",
      name: "Reichweite als Inputzahl",
      wie: "Views, Teilnehmende, verteilte Exemplare; nur als Maß dafür, ob Formate überhaupt angekommen sind.",
      warum: "Ohne Reichweite kann nichts wirken, aber Reichweite ist kein Wirkungsnachweis.",
      fallstrick: "Reichweite als Erfolg verkaufen; die Partei hat mehr Reichweite als alle anderen zusammen, dieses Wettrüsten verlierst du."
    }
  ],

  planer: {
    fragen: [
      {
        id: "ort",
        text: "Wo seid ihr aktiv?",
        optionen: [
          { id: "dorf", text: "Dorf oder Gemeinde unter 10.000 Einwohnern", empfiehlt: ["zuhoer-format", "haustuer", "vereine-sport", "problem-loesen", "lokalmedien"], meidet: ["gegenprotest"] },
          { id: "kleinstadt", text: "Kleinstadt oder Landkreis", empfiehlt: ["haustuer", "partnerschaft", "begegnung", "lokalmedien", "botschafter"], meidet: [] },
          { id: "stadtviertel", text: "Großstadt oder Stadtviertel", empfiehlt: ["begegnung", "normen-sichtbar", "prebunking-clips", "online-dialog"], meidet: [] },
          { id: "online", text: "Vor allem online", empfiehlt: ["prebunking-clips", "online-dialog", "faktencheck"], meidet: ["haustuer", "buergerrat", "gegenprotest"] }
        ]
      },
      {
        id: "team",
        text: "Wie groß ist euer Team?",
        optionen: [
          { id: "allein", text: "Ich allein oder wir zu zweit", empfiehlt: ["zuhoer-format", "online-dialog", "faktencheck", "botschafter"], meidet: ["haustuer", "buergerrat", "gegenprotest"] },
          { id: "klein", text: "3 bis 10 Personen", empfiehlt: ["haustuer", "begegnung", "normen-sichtbar", "partnerschaft"], meidet: ["buergerrat"] },
          { id: "gross", text: "Mehr als 10 Personen oder eine Organisation", empfiehlt: ["haustuer", "partnerschaft", "problem-loesen", "buergerrat", "wirkungsmessung"], meidet: [] }
        ]
      },
      {
        id: "zeit",
        text: "Wie viel Zeit habt ihr?",
        optionen: [
          { id: "wochen", text: "Einige Wochen, etwa bis zu einer Wahl", empfiehlt: ["zuhoer-format", "normen-sichtbar", "faktencheck", "online-dialog"], meidet: ["buergerrat", "problem-loesen", "haustuer"] },
          { id: "monate", text: "Einige Monate", empfiehlt: ["haustuer", "begegnung", "prebunking-clips", "partnerschaft", "botschafter"], meidet: ["buergerrat"] },
          { id: "jahre", text: "Ein Jahr oder länger", empfiehlt: ["problem-loesen", "buergerrat", "lokalmedien", "vereine-sport", "wirkungsmessung", "respekt"], meidet: [] }
        ]
      },
      {
        id: "budget",
        text: "Welches Budget habt ihr?",
        optionen: [
          { id: "keins", text: "Kein Geld, nur Zeit", empfiehlt: ["zuhoer-format", "normen-sichtbar", "online-dialog", "vereine-sport", "haustuer"], meidet: ["buergerrat", "lokalmedien"] },
          { id: "klein", text: "Bis zu einigen tausend Euro oder eine Partnerschaft für Demokratie", empfiehlt: ["haustuer", "begegnung", "prebunking-clips", "partnerschaft"], meidet: [] },
          { id: "gross", text: "Ein kommunales Budget oder ein Landesbudget", empfiehlt: ["buergerrat", "lokalmedien", "problem-loesen", "wirkungsmessung", "respekt"], meidet: [] }
        ]
      },
      {
        id: "multiplikatoren",
        text: "Habt ihr Zugang zu Menschen, denen man im Ort vertraut, auch außerhalb eures Lagers?",
        optionen: [
          { id: "keine", text: "Noch nicht", empfiehlt: ["zuhoer-format", "haustuer", "vereine-sport"], meidet: ["botschafter", "gegenprotest"] },
          { id: "einige", text: "Ja, zu einzelnen Vereinen, Betrieben oder Kirchengemeinden", empfiehlt: ["botschafter", "vereine-sport", "begegnung", "normen-sichtbar"], meidet: [] },
          { id: "viele", text: "Ja, zu Verwaltung, Lokalmedien, Vereinen und Gewerbe", empfiehlt: ["botschafter", "partnerschaft", "lokalmedien", "respekt", "buergerrat"], meidet: [] }
        ]
      },
      {
        id: "ziel",
        text: "Was wollt ihr in erster Linie erreichen?",
        optionen: [
          { id: "verstehen", text: "Verstehen, was die Menschen hier bewegt", empfiehlt: ["zuhoer-format", "haustuer", "wirkungsmessung"], meidet: ["gegenprotest", "faktencheck"] },
          { id: "gespraech", text: "Menschen mit Parteinähe wieder ins Gespräch holen", empfiehlt: ["haustuer", "begegnung", "botschafter", "vereine-sport"], meidet: ["gegenprotest"] },
          { id: "liefern", text: "Konkrete Probleme vor Ort lösen", empfiehlt: ["problem-loesen", "partnerschaft", "buergerrat", "respekt"], meidet: [] },
          { id: "immunisieren", text: "Widerstandskraft gegen Manipulation stärken", empfiehlt: ["prebunking-clips", "online-dialog", "normen-sichtbar", "faktencheck"], meidet: [] },
          { id: "haltung", text: "Sichtbar Haltung zeigen", empfiehlt: ["normen-sichtbar", "partnerschaft", "botschafter", "gegenprotest"], meidet: [] }
        ]
      }
    ]
  }
};
