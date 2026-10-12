window.APP_DATA = window.APP_DATA || {};
window.APP_DATA.linien = [
  {
    "id": "gespraech",
    "name": "Das Gespräch",
    "kurz": "Gespräch",
    "farbe": "#0a5fa7",
    "ebene": "individuum",
    "zielgruppe": "Angehörige, Freund:innen, Kolleg:innen, Vereinsmitglieder",
    "leitidee": "Diese Linie hilft dir, mit einem Menschen aus deinem Umfeld im Gespräch zu bleiben, der eine verfassungsfeindliche Partei attraktiv findet. Sie setzt auf Beziehungserhalt, Zuhören und kleine Verschiebungen über Monate. Ein Umdrehen in einem einzigen Gespräch leistet sie nicht, und bei Gefahr ersetzt sie keine professionelle Hilfe.",
    "dauer": "Monate, oft länger",
    "voraussetzungen": [
      "Du hast selbst eine Beziehung zu der Person, die ihr beide behalten wollt.",
      "Du bist bereit, mehr zu fragen als zu erklären.",
      "Du kennst deine eigenen Grenzen und weißt, wo du Hilfe bekommst (Linie Professionelle Begleitung)."
    ],
    "stationen": [
      {
        "id": "zuhoeren",
        "name": "Zuhören",
        "pos": 0,
        "spur": 0,
        "ziel": "Die Person erlebt, dass du sie hören willst, bevor du etwas von ihr willst.",
        "warum": "Hochwertiges, nicht wertendes Zuhören senkt nachweislich Abwehr und macht Einstellungen weniger extrem; Fakten allein bewegen fast nichts, wenn die Haltung mit Identität verknüpft ist. Wer zuhört, bekommt außerdem die Geschichte hinter der Parole, und genau die trägt später die Veränderung.",
        "evidenz": "mittel",
        "techniken": [
          "aktives-zuhoeren",
          "motivational-interviewing"
        ],
        "schritte": [
          "Such einen Rahmen unter vier Augen, ohne Zeitdruck und ohne Publikum (kein Familienessen, kein Gruppenchat).",
          "Beginne mit der Beziehung, nicht mit dem Thema: Sag, dass dir der Kontakt wichtig ist.",
          "Stell eine offene Frage und halte dann aus, dass du nicht antwortest.",
          "Spiegle in eigenen Worten, was du gehört hast, und frag, ob das stimmt.",
          "Beende das Gespräch, bevor es kippt, und verabrede etwas Gemeinsames ohne Politik."
        ],
        "formulierungen": [
          "Ich merke, wir streiten nur noch. Mir ist unser Kontakt wichtig. Können wir mal in Ruhe reden, nur wir zwei?",
          "Was hat sich für dich verändert, seit du das so siehst?",
          "Wenn ich dich richtig verstehe, ärgert dich vor allem, dass sich niemand um Leute wie dich kümmert. Stimmt das?",
          "Ich will dich erst mal verstehen. Erklären kann ich später."
        ],
        "fehler": [
          "Zuhören als Taktik, um danach den eigenen Vortrag zu halten; die Person merkt das.",
          "Faktenduell und Linkflut nach dem ersten Satz.",
          "Spott oder Labels (Schwurbler, Nazi), die die Intelligenz der Person abwerten.",
          "Das Gespräch in der Gruppe oder im Chat führen, wo die Person das Gesicht wahren muss."
        ],
        "signale_weiter": [
          "Die Person redet von sich aus weiter und erzählt Persönliches.",
          "Die Person korrigiert deine Spiegelung, statt abzublocken.",
          "Die Person fragt zurück, wie du etwas siehst."
        ],
        "signale_stopp": [
          "Die Person droht, verherrlicht Gewalt oder spricht von Waffen.",
          "Jede Frage wird als Angriff gelesen, der Ton eskaliert.",
          "Du merkst, dass du selbst nur noch wütend oder erschöpft bist."
        ],
        "dauer": "2 bis 3 Gespräche",
        "weiter": [
          {
            "zu": "verstehen",
            "wenn": "Die Person erzählt von sich aus, was sie bewegt."
          },
          {
            "zu": "pause",
            "wenn": "Das Gespräch eskaliert oder du bist erschöpft."
          },
          {
            "zu": "grenze",
            "wenn": "Die Person wertet Menschengruppen pauschal ab."
          }
        ],
        "umsteigen": [
          {
            "linie": "hilfe",
            "station": "erkennen",
            "wenn": "Es gibt Gewaltandrohungen, Waffen, Reichsbürger-Bezug oder Kinder in der Szene."
          }
        ]
      },
      {
        "id": "verstehen",
        "name": "Verstehen",
        "pos": 1,
        "spur": 0,
        "ziel": "Du kennst das legitime Bedürfnis hinter der Parteisympathie: Anerkennung, Sicherheit, Gerechtigkeit, Zugehörigkeit oder Kontrolle.",
        "warum": "Die Forschung zur Radikalisierung zeigt, dass Bedeutsamkeit, Zugehörigkeit und erlebte Kränkung stärker ziehen als Programme; subjektiver Status und Kontrollverlust sagen die Hinwendung besser voraus als Einkommen. Wer das Bedürfnis benennt, kann über Lösungen reden statt über Parolen.",
        "evidenz": "mittel",
        "techniken": [
          "motivational-interviewing",
          "beduerfnisse-adressieren",
          "fragen-statt-fakten"
        ],
        "schritte": [
          "Frag nach konkreten Erlebnissen statt nach Meinungen: Was ist dir passiert, wo wurdest du übergangen?",
          "Benenne das Bedürfnis, das du hörst, als Vermutung, nicht als Diagnose.",
          "Trenne innerlich das Bedürfnis (legitim) von der Lösung, die die Partei verspricht (strittig).",
          "Nutze den Kompass der App, um Treiber und Einbindungstiefe für dich zu sortieren.",
          "Notiere nur für dich, was du gelernt hast, ohne Namen oder Details, die anderen schaden könnten."
        ],
        "formulierungen": [
          "Wer ist mit ‚die‘ genau gemeint? Gibt es jemanden, der dich persönlich enttäuscht hat?",
          "Wenn ich das höre, klingt es für mich so, als wolltest du, dass deine Arbeit mal gesehen wird. Liege ich falsch?",
          "Was müsste anders laufen, damit du sagst: ‚Jetzt ist es gerecht‘?",
          "Was gibt dir die Partei, was du woanders nicht bekommst?"
        ],
        "fehler": [
          "Das Bedürfnis als Entschuldigung für Menschenverachtung durchgehen lassen; beides lässt sich trennen.",
          "Psychologisieren von oben herab („Du bist halt frustriert“).",
          "Nur Sozialpolitik anbieten, obwohl es um Respekt, Sicherheit oder Migrationssorge geht."
        ],
        "signale_weiter": [
          "Die Person spricht über eigene Erlebnisse statt über Feindbilder.",
          "Die Person unterscheidet zwischen der Partei und einzelnen Forderungen.",
          "Die Person nimmt deine Vermutung über ihr Bedürfnis an oder präzisiert sie."
        ],
        "signale_stopp": [
          "Die Person spricht nur noch in Totalisierungen: alle, immer, die da oben.",
          "Die Person beschreibt die Partei oder Gruppe als einzige Familie, die sie noch hat.",
          "Verschwörungserzählungen mit Feindbildern gegen konkrete Gruppen kommen ins Spiel."
        ],
        "dauer": "2 bis 4 Gespräche",
        "weiter": [
          {
            "zu": "beziehung",
            "wenn": "Du kannst das Bedürfnis in einem Satz benennen."
          },
          {
            "zu": "grenze",
            "wenn": "Abwertende Aussagen häufen sich."
          }
        ],
        "umsteigen": [
          {
            "linie": "hilfe",
            "station": "angehoerige",
            "wenn": "Die Gruppe ist zum Lebensmittelpunkt geworden und du kommst allein nicht weiter."
          }
        ]
      },
      {
        "id": "beziehung",
        "name": "Beziehung sichern",
        "pos": 2,
        "spur": 0,
        "ziel": "Ihr habt gemeinsame Zeit und Themen, die nicht Politik sind, und du bist als Außenkontakt verlässlich da.",
        "warum": "Außenkontakte sind der wichtigste Schutzfaktor: Pull-Faktoren für den Ausstieg sind Partner:innen, Familie und Freundschaften außerhalb der Szene, die größte Barriere ist drohende Isolation. Gespräche mit Andersdenkenden senken Abneigung, auch wenn Positionen bleiben; Beziehung ist deshalb ein eigenes Ziel und Voraussetzung für alles Weitere.",
        "evidenz": "mittel",
        "techniken": [
          "kontakt-begegnung",
          "aktives-zuhoeren",
          "selbstfuersorge"
        ],
        "schritte": [
          "Verabrede feste gemeinsame Aktivitäten: Sport, Essen, Handwerk, Kinder, Musik.",
          "Halte eine Themenbalance: höchstens ein politisches Gespräch pro Treffen, oft gar keins.",
          "Bleib erreichbar und verlässlich, auch nach einem schlechten Gespräch.",
          "Zeig deine Haltung sichtbar im Handeln, ohne Belehrung, zum Beispiel durch dein Engagement oder deine Freundschaften.",
          "Hol andere Menschen aus dem Umfeld dazu, die der Person wichtig sind und nicht in der Szene stehen."
        ],
        "formulierungen": [
          "Ich sehe das anders und handle auch anders. Und ich bleibe trotzdem dein Bruder.",
          "Lass uns heute nicht über Politik reden. Ich will einfach Zeit mit dir.",
          "Du bist mir wichtig, auch wenn wir uns bei dem Thema nicht einig werden."
        ],
        "fehler": [
          "Die Beziehung auf das eine Thema reduzieren.",
          "Schweigen um des Familienfriedens willen; Schweigen wird als Zustimmung gelesen.",
          "Kontakt als Druckmittel einsetzen („Wenn du so weitermachst, komme ich nicht mehr“).",
          "Sich selbst überfordern und keine Pausen nehmen."
        ],
        "signale_weiter": [
          "Die Person meldet sich von sich aus und hält Verabredungen ein.",
          "Die Person äußert leise Zweifel an Einzelnem aus Partei oder Gruppe.",
          "Die Person interessiert sich für Aktivitäten außerhalb der Szene."
        ],
        "signale_stopp": [
          "Die Person zieht sich aus allen Kontakten außerhalb der Gruppe zurück.",
          "Die Person verlangt von dir, dich zu entscheiden: für sie oder gegen die Partei.",
          "Du spürst, dass die Beziehung dich dauerhaft erschöpft."
        ],
        "dauer": "Wochen bis Monate, läuft parallel zu allen weiteren Stationen",
        "weiter": [
          {
            "zu": "zweifel",
            "wenn": "Der Kontakt ist stabil und die Person äußert erste Ambivalenz."
          },
          {
            "zu": "pause",
            "wenn": "Du bist erschöpft oder das Thema vergiftet jedes Treffen."
          }
        ],
        "umsteigen": [
          {
            "linie": "hilfe",
            "station": "angehoerige",
            "wenn": "Die Person bricht alle Außenkontakte ab oder du brauchst selbst Unterstützung."
          },
          {
            "linie": "nachbarschaft",
            "station": "begegnung",
            "wenn": "Es gibt vor Ort gemischte Formate, zu denen du die Person mitnehmen kannst."
          }
        ]
      },
      {
        "id": "zweifel",
        "name": "Zweifel zulassen",
        "pos": 3,
        "spur": 0,
        "ziel": "Die Person formuliert eigene Widersprüche, ohne das Gesicht zu verlieren.",
        "warum": "Gespräche mit wertfreiem Austausch persönlicher Geschichten senkten ausgrenzende Einstellungen über Monate, reine Argumente wirkten nicht; die Geschichte einer betroffenen Person zu hören war der Wirkfaktor. Die Reflexion eigener Vorbehalte wirkte in Studien zu Verschwörungsglauben am stärksten. Ambivalenz ist der beobachtbare Vorbote von Veränderung.",
        "evidenz": "stark",
        "techniken": [
          "perspektivwechsel-erzaehlung",
          "street-epistemology",
          "fragen-statt-fakten"
        ],
        "schritte": [
          "Erzähl eine eigene Erfahrung oder die Geschichte einer betroffenen Person, kurz und ohne Moral am Ende.",
          "Frag nach Vorbehalten: Gab es etwas, das dich an der Erklärung hat zweifeln lassen?",
          "Bleib bei einem Punkt und unterbinde freundlich das Springen zwischen Parolen.",
          "Wenn Fakten nötig sind, nenn einmal den Mythos, erklär den Trugschluss, wiederhol den Fakt und kehr dann zur Beziehung zurück.",
          "Lass Zweifel stehen, ohne sie zu feiern; Druck erzeugt Loyalitätsbekundung."
        ],
        "formulierungen": [
          "Darf ich dir erzählen, was meine Kollegin letzten Monat erlebt hat?",
          "Gab es mal einen Moment, in dem du gedacht hast: ‚Das passt nicht zusammen‘?",
          "Lass uns bei dem einen Punkt bleiben. Was genau meinst du damit?",
          "Wo hast du das her, und was macht diese Person für dich zur Expertin?",
          "Wie sicher bist du dir da, auf einer Skala von null bis zehn? Was fehlt zur Zehn?"
        ],
        "fehler": [
          "Gewinnen wollen und Zweifel sofort zum Sieg erklären.",
          "Moralisieren oder Beschämen, sobald die Person unsicher wird.",
          "Faktenduelle, die die Person zum Gegenargumentieren zwingen.",
          "Werte der Person als Trick benutzen, statt sie ernst zu nehmen."
        ],
        "signale_weiter": [
          "Die Person sagt „ja, aber“ oder „kommt darauf an“ statt „alle“ und „immer“.",
          "Die Person gibt die Sicht anderer in eigenen Worten korrekt wieder.",
          "Die Person fragt nach anderen Quellen oder liest etwas, das du ihr gegeben hast."
        ],
        "signale_stopp": [
          "Die Person wird wütend auf dich als Boten, nicht auf das Argument.",
          "Gegenbelege werden in die Verschwörungserzählung eingebaut.",
          "Die Person wechselt von der Diskussion zum öffentlichen Bekenntnis."
        ],
        "dauer": "Mehrere Gespräche über Wochen",
        "weiter": [
          {
            "zu": "alternativen",
            "wenn": "Die Person fragt, was sie stattdessen tun könnte."
          },
          {
            "zu": "grenze",
            "wenn": "Die Person reagiert mit Abwertung konkreter Gruppen."
          },
          {
            "zu": "pause",
            "wenn": "Ihr dreht euch im Kreis."
          }
        ],
        "umsteigen": [
          {
            "linie": "hilfe",
            "station": "beratung",
            "wenn": "Die Person ist fest in einer Gruppe eingebunden und du stößt an deine Grenze."
          }
        ]
      },
      {
        "id": "alternativen",
        "name": "Alternativen anbieten",
        "pos": 4,
        "spur": 0,
        "ziel": "Die Person erlebt, dass ihr Bedürfnis auch demokratisch erfüllt werden kann: Rolle, Gemeinschaft, Wirksamkeit.",
        "warum": "Deradikalisierung gelingt laut Distanzierungsforschung über alternative Beziehungen, neue Rollen und lebenspraktische Stabilität, nicht über Ideologiearbeit allein. Beteiligung mit spürbaren Folgen und ehrenamtliches Engagement gehen mit geringerer Neigung zum Rechtspopulismus einher.",
        "evidenz": "mittel",
        "techniken": [
          "beduerfnisse-adressieren",
          "kontakt-begegnung",
          "soziale-normen"
        ],
        "schritte": [
          "Überleg zusammen, wo die Person gebraucht wird: Verein, Feuerwehr, Elternrat, Nachbarschaftshilfe, Bürgerrat.",
          "Lade sie zu etwas ein, das Gemeinschaft bietet und nicht als Umerziehung wirkt.",
          "Mach Wirksamkeit erlebbar: ein konkretes Problem im Ort gemeinsam angehen.",
          "Verbinde sie mit Menschen aus ihrem Milieu, die demokratisch engagiert sind.",
          "Feiere kleine Schritte, ohne sie öffentlich zu machen."
        ],
        "formulierungen": [
          "Du hast gesagt, es kümmert sich niemand. Beim Sportverein fehlt genau jemand wie du. Kommst du mal mit?",
          "Wenn dich die Bushaltestelle ärgert: Ich gehe am Dienstag zur Gemeinderatssitzung. Begleitest du mich?",
          "Mich würde interessieren, was du zu dem Projekt sagst. Du kennst die Leute hier besser als ich."
        ],
        "fehler": [
          "Angebote, die wie Umerziehung oder Therapie wirken.",
          "Die Person in Formate schicken, in denen sie beschämt wird.",
          "Sofortige Distanzierung von Partei oder Gruppe als Bedingung setzen."
        ],
        "signale_weiter": [
          "Die Person nimmt an einer Aktivität außerhalb der Szene teil.",
          "Die Person übernimmt eine kleine Aufgabe oder Rolle.",
          "Die Person konsumiert weniger Szene-Inhalte oder spricht weniger darüber."
        ],
        "signale_stopp": [
          "Die Person nutzt die neuen Kontakte, um dort Parolen zu verbreiten.",
          "Die Person wird in der neuen Umgebung ausgegrenzt und zieht sich zurück.",
          "Die Gruppe reagiert mit Druck oder Drohungen auf die Außenkontakte der Person."
        ],
        "dauer": "Monate",
        "weiter": [
          {
            "zu": "dranbleiben",
            "wenn": "Es gibt eine stabile Aktivität außerhalb der Szene."
          },
          {
            "zu": "pause",
            "wenn": "Die Person lehnt alle Angebote ab; versuch es später neu."
          }
        ],
        "umsteigen": [
          {
            "linie": "nachbarschaft",
            "station": "probleme-loesen",
            "wenn": "Das Bedürfnis ist ein konkretes Problem im Ort, das sich gemeinsam angehen lässt."
          },
          {
            "linie": "hilfe",
            "station": "ausstieg",
            "wenn": "Die Person will raus aus einer festen Gruppe."
          }
        ]
      },
      {
        "id": "dranbleiben",
        "name": "Dranbleiben",
        "pos": 5,
        "spur": 0,
        "ziel": "Du hältst die Beziehung über Jahre, ohne dich zu verbrauchen, und erkennst Fortschritte und Rückschritte.",
        "warum": "Ausstiegs- und Distanzierungsprozesse dauern im Schnitt drei bis fünf Jahre, verlaufen in Schwankungen und selten linear. Effekte einzelner Gespräche verfallen nach Wochen, wenn nichts nachkommt. Gefährdet ist dabei auch deine eigene Gesundheit; Selbstschutz geht vor.",
        "evidenz": "mittel",
        "techniken": [
          "selbstfuersorge",
          "soziale-normen",
          "aktives-zuhoeren"
        ],
        "schritte": [
          "Leg einen Rhythmus fest, der für dich tragbar ist, zum Beispiel ein Treffen pro Monat.",
          "Beobachte Signale statt Parolen: Sprache, Kontakte, Aktivitäten, Zweifel.",
          "Rechne mit Rückschritten nach Wahlen, Krisen oder medialen Ereignissen und nimm sie nicht persönlich.",
          "Such dir Austausch: Angehörigengruppe, Beratungsstelle, Freund:innen.",
          "Prüfe alle paar Monate, ob dein Ziel noch realistisch ist, und passe es an."
        ],
        "formulierungen": [
          "Ich bleibe dran, egal wie es politisch läuft. Das hat nichts mit der Wahl zu tun.",
          "Mir ist aufgefallen, dass du in letzter Zeit anders redest. Darf ich dir sagen, was ich sehe?",
          "Ich brauche gerade eine Pause vom Thema. Nächste Woche sehen wir uns beim Fußball."
        ],
        "fehler": [
          "Nach einem guten Gespräch die Beziehung für gerettet halten und loslassen.",
          "Jeden Rückfall als persönliches Scheitern lesen.",
          "Sich isolieren und niemandem erzählen, was man trägt."
        ],
        "signale_weiter": [
          "Die Person hat stabile Kontakte jenseits der Szene und eine eigene Perspektive.",
          "Die Person äußert Ablehnung nicht mehr rigide, Offenheit bleibt erkennbar.",
          "Die Person sucht von sich aus das Gespräch mit dir."
        ],
        "signale_stopp": [
          "Du schläfst schlecht, bist ständig gereizt oder fühlst dich verantwortlich für alles.",
          "Die Person überschreitet wiederholt rote Linien trotz klarer Ansage.",
          "Neue Warnzeichen: Waffen, Gewalt, Drohungen, Straftaten."
        ],
        "dauer": "Jahre",
        "weiter": [],
        "umsteigen": [
          {
            "linie": "hilfe",
            "station": "angehoerige",
            "wenn": "Du bist erschöpft und brauchst selbst Begleitung."
          },
          {
            "linie": "hilfe",
            "station": "rueckfall",
            "wenn": "Die Person war schon distanziert und rutscht zurück."
          }
        ]
      },
      {
        "id": "pause",
        "name": "Kontaktpause",
        "pos": 2,
        "spur": 1,
        "ziel": "Du nimmst dir eine benannte Pause, die die Beziehung schützt statt sie abzubrechen.",
        "warum": "Beratungsstellen unterscheiden Kontaktregeln und Pausen vom Abbruch; eine Pause ist legitim, wenn sie als Pause benannt wird. Die eigene Gesundheit ist Voraussetzung dafür, überhaupt weiter da sein zu können; wer ausbrennt, fällt als Außenkontakt weg.",
        "evidenz": "schwach",
        "techniken": [
          "selbstfuersorge",
          "grenzen-setzen"
        ],
        "schritte": [
          "Benenne die Pause klar und mit Dauer, zum Beispiel vier Wochen ohne das Thema.",
          "Sag, was danach kommt: ein Treffen, ein Anruf, ein gemeinsamer Termin.",
          "Nutze die Zeit für dich: Austausch, Schlaf, Beratung, Angehörigengruppe.",
          "Notiere, was dich am meisten belastet hat, um es beim nächsten Mal anders zu machen."
        ],
        "formulierungen": [
          "Wir drehen uns im Kreis, ich höre hier auf. Nächste Woche sehen wir uns beim Fußball.",
          "Ich brauche vier Wochen Pause von dem Thema. Das ist keine Pause von dir.",
          "Ich melde mich am Sonntag, versprochen."
        ],
        "fehler": [
          "Die Pause als Strafe oder Druckmittel einsetzen.",
          "Verschwinden ohne Erklärung; das wird als Abbruch gelesen.",
          "Die Pause nutzen, um über die Person bei anderen zu klagen."
        ],
        "signale_weiter": [
          "Du hast wieder Energie und Neugier auf die Person.",
          "Die Person hat sich in der Pause gemeldet oder die Verabredung eingehalten."
        ],
        "signale_stopp": [
          "Die Person droht oder eskaliert während der Pause.",
          "Du merkst, dass auch nach der Pause nichts in dir Platz für das Gespräch hat."
        ],
        "dauer": "2 bis 6 Wochen",
        "weiter": [
          {
            "zu": "beziehung",
            "wenn": "Die Pause ist vorbei und ihr habt euch wie verabredet getroffen."
          },
          {
            "zu": "grenze",
            "wenn": "Die Person hat in der Pause rote Linien überschritten."
          }
        ],
        "umsteigen": [
          {
            "linie": "hilfe",
            "station": "angehoerige",
            "wenn": "Du brauchst mehr als eine Pause: Beratung oder eine Angehörigengruppe."
          }
        ]
      },
      {
        "id": "grenze",
        "name": "Grenze setzen",
        "pos": 3,
        "spur": -1,
        "ziel": "Du lehnst die Aussage ab, hältst die Beziehung und benennst, was mit dir nicht geht.",
        "warum": "Der deutsche Praxiskonsens lautet: Ablehnung der Position bei Wertschätzung der Person, Grenzen begründen und einhalten, nur verbieten, was man durchsetzen kann. Sichtbare Normen naher Menschen schwächen den Zusammenhang zwischen Verschwörungsmentalität und Handeln; Schweigen wird dagegen als Zustimmung gelesen.",
        "evidenz": "mittel",
        "techniken": [
          "grenzen-setzen",
          "soziale-normen"
        ],
        "schritte": [
          "Sprich die Aussage sofort und konkret an, mit Ich-Botschaft, nicht mit Etikett.",
          "Trenne Person und Aussage: „Diese Aussage ist rassistisch, du bist mir wichtig.“",
          "Setze eine Regel, die du halten kannst: kein Thema X in meinem Haus, keine Parolen vor den Kindern.",
          "Biete das Gespräch über alles andere weiter an.",
          "Schütze Betroffene im Raum, bevor du die Person überzeugst."
        ],
        "formulierungen": [
          "Wenn du ‚alle Ausländer‘ sagst, kann ich nicht weiterreden. Ich wünsche mir, dass wir über konkrete Menschen sprechen.",
          "Diese Aussage ist rassistisch, darüber diskutiere ich nicht. Über alles andere gern.",
          "Vor den Kindern reden wir nicht so. Das ist meine Grenze, und sie gilt."
        ],
        "fehler": [
          "Verbote aussprechen, die du nicht durchsetzen kannst.",
          "Die Person beschämen oder vor anderen bloßstellen.",
          "Grenze setzen und beim nächsten Mal aus Erschöpfung wieder schweigen.",
          "Kontaktabbruch androhen, um Druck zu machen."
        ],
        "signale_weiter": [
          "Die Person respektiert die Regel, auch wenn sie murrt.",
          "Die Person fragt nach, warum dich das verletzt, statt sich nur zu rechtfertigen."
        ],
        "signale_stopp": [
          "Die Person überschreitet die Grenze wiederholt und gezielt.",
          "Die Person bedroht dich oder andere im Umfeld.",
          "Die Person verlangt Loyalität gegen Betroffene in deinem Umfeld."
        ],
        "dauer": "Sofort, dann dauerhaft gültig",
        "weiter": [
          {
            "zu": "beziehung",
            "wenn": "Die Grenze hält und der Kontakt geht weiter."
          },
          {
            "zu": "pause",
            "wenn": "Die Grenze wird gerissen und du brauchst Abstand."
          }
        ],
        "umsteigen": [
          {
            "linie": "hilfe",
            "station": "erkennen",
            "wenn": "Es gibt Drohungen, Gewalt, Waffen oder Straftaten."
          },
          {
            "linie": "hilfe",
            "station": "angehoerige",
            "wenn": "Rote Linien werden wiederholt überschritten und du willst wissen, ob ein Abbruch angemessen ist."
          }
        ]
      }
    ]
  },
  {
    "id": "nachbarschaft",
    "name": "Gemeinde und Nachbarschaft",
    "kurz": "Nachbarschaft",
    "farbe": "#15803d",
    "ebene": "masse",
    "zielgruppe": "Ehrenamtliche, Vereine, Kirchengemeinden, Kommunalpolitik, Partnerschaften für Demokratie",
    "leitidee": "Diese Linie baut vor Ort Zuhören, Problemlösung und Begegnung so auf, dass Menschen im Graubereich wieder erleben: Hier wird man gehört, hier bewegt sich etwas, hier gehöre ich dazu. Sie wirkt auf vorgelagerte Größen wie Anerkennung, Kontakt und soziale Normen. Sie kann keine Partei wegkommunizieren und ersetzt keine Landes- oder Bundespolitik.",
    "dauer": "1 bis 3 Jahre",
    "voraussetzungen": [
      "Mindestens drei bis fünf Menschen, die über ein Jahr dranbleiben wollen.",
      "Zugang zu einem Ort oder Verein, in dem sich Leute ohnehin treffen.",
      "Kontakt zur Mobilen Beratung oder zur Partnerschaft für Demokratie im Landkreis."
    ],
    "stationen": [
      {
        "id": "zuhoeren-vor-ort",
        "name": "Zuhören vor Ort",
        "pos": 0,
        "spur": 0,
        "ziel": "Ihr wisst aus Gesprächen an der Haustür, im Verein und am Marktstand, was die Menschen im Ort wirklich beschäftigt.",
        "warum": "Qualitative Studien in Hochburgen zeigen, dass sich Menschen übergangen fühlen und Infrastruktur, ÖPNV, Kultur sowie Zuhören, Respekt und Wertschätzung wünschen; Abwertung anderer tritt oft als Reaktion auf eigene nicht anerkannte Probleme auf. Haustürgespräche mit Geschichtenaustausch wirken, reine Argumente nicht.",
        "evidenz": "mittel",
        "techniken": [
          "haustuergespraech",
          "aktives-zuhoeren",
          "deep-canvassing"
        ],
        "schritte": [
          "Legt ein Gebiet fest (eine Straße, ein Ortsteil) und ein Ziel: 50 Gespräche in vier Wochen.",
          "Trainiert ein Gesprächsgerüst: Vorstellen, offene Frage nach dem Ort, zuhören, nachfragen, bedanken.",
          "Geht zu zweit, bleibt bei einem Nein freundlich und sammelt nur Themen, keine Namen oder Meinungen einzelner Personen.",
          "Fasst die Themen wöchentlich zusammen und zählt, was am häufigsten genannt wird.",
          "Meldet den Befragten zurück, was ihr gehört habt, zum Beispiel per Aushang oder Lokalzeitung."
        ],
        "formulierungen": [
          "Wir sind aus dem Ort und wollen wissen, was Sie hier am meisten nervt und was Sie sich wünschen. Haben Sie fünf Minuten?",
          "Was müsste sich hier ändern, damit Sie sagen: ‚Jetzt kümmert sich jemand‘?",
          "Danke, dass Sie das erzählt haben. Darf ich das als Thema notieren, ohne Ihren Namen?"
        ],
        "fehler": [
          "Mit einer Botschaft an die Tür gehen statt mit einer Frage.",
          "Daten über Personen und ihre Parteineigung sammeln; das ist unzulässig und zerstört Vertrauen.",
          "Nur mit Gleichgesinnten reden, weil das angenehmer ist."
        ],
        "signale_weiter": [
          "Ihr habt eine Liste der fünf häufigsten Themen mit Zahlen dahinter.",
          "Menschen sprechen euch von sich aus an, weil sie von der Aktion gehört haben."
        ],
        "signale_stopp": [
          "Ihr werdet bedroht oder gezielt eingeschüchtert.",
          "Das Team ist nach zwei Wochen auf eine Person geschrumpft."
        ],
        "dauer": "4 bis 8 Wochen",
        "weiter": [
          {
            "zu": "verbuendete",
            "wenn": "Die Themenliste steht."
          },
          {
            "zu": "ermueden",
            "wenn": "Das Team bricht weg."
          }
        ],
        "umsteigen": [
          {
            "linie": "oeffentlichkeit",
            "station": "zielgruppe",
            "wenn": "Ihr wollt die Befunde in eine breitere Kampagne übersetzen."
          },
          {
            "linie": "hilfe",
            "station": "erkennen",
            "wenn": "Euch begegnen Drohungen oder organisierte rechtsextreme Strukturen."
          }
        ]
      },
      {
        "id": "verbuendete",
        "name": "Verbündete gewinnen",
        "pos": 1,
        "spur": 0,
        "ziel": "Vereine, Kirche, Feuerwehr, Betriebe und Verwaltung tragen das Vorhaben mit, auch Menschen aus Milieus, die sonst nicht dabei sind.",
        "warum": "Breite lokale Bündnisse machen eine Norm sichtbar; sichtbare Anti-Hass-Normen senkten in deutschen Studien Hassrede, und wo keine Norm etabliert war, stieg sie nach Anschlägen an. Überzeugend sind Menschen aus dem eigenen Lager oder Milieu, Botschaften des politischen Gegners polarisieren.",
        "evidenz": "mittel",
        "techniken": [
          "vertrauenswuerdige-botschafter",
          "soziale-normen",
          "kontakt-begegnung"
        ],
        "schritte": [
          "Listet auf, wer im Ort Vertrauen genießt: Vereinsvorstände, Handwerksmeister:innen, Pfarrer:innen, Ortsvorsteher:innen, Trainer:innen.",
          "Sprecht sie einzeln an, mit den Themen aus dem Zuhören, nicht mit dem Wort „Rechtsextremismus“.",
          "Holt die Partnerschaft für Demokratie und die Mobile Beratung als Unterstützung und Geldquelle dazu.",
          "Vereinbart einen gemeinsamen Satz, den alle unterschreiben können, ohne Nachbarn zu beschämen.",
          "Verteilt Rollen: Wer redet mit wem, wer kümmert sich um welches Thema."
        ],
        "formulierungen": [
          "Wir haben 60 Leute gefragt. Dreimal ganz oben: der Bus, die Arztpraxis, der Jugendraum. Wollt ihr da mit anpacken?",
          "Ihr werdet im Ort gehört. Wir brauchen jemanden wie euch, der sagt: ‚Hier reden wir miteinander.‘",
          "Es geht nicht gegen jemanden. Es geht darum, dass der Ort nicht kaputtgeht."
        ],
        "fehler": [
          "Nur die üblichen Engagierten ansprechen; so bleibt das Bündnis eine Blase.",
          "Mit moralischer Überlegenheit auftreten und Nachbarn als Nazis etikettieren.",
          "Vereine überfordern mit Erwartungen, die sie nicht erfüllen können."
        ],
        "signale_weiter": [
          "Mindestens drei Organisationen aus verschiedenen Milieus sind dabei.",
          "Jemand aus einem Milieu, das sonst nicht erreicht wird, übernimmt eine Rolle."
        ],
        "signale_stopp": [
          "Das Bündnis zerlegt sich an Parteipolitik.",
          "Verbündete werden bedroht oder ziehen sich aus Angst zurück."
        ],
        "dauer": "2 bis 3 Monate",
        "weiter": [
          {
            "zu": "probleme-loesen",
            "wenn": "Rollen und ein gemeinsames Thema sind verabredet."
          },
          {
            "zu": "konflikt",
            "wenn": "Im Ort gibt es offenen Streit über das Bündnis."
          }
        ],
        "umsteigen": [
          {
            "linie": "oeffentlichkeit",
            "station": "botschafter",
            "wenn": "Ihr habt glaubwürdige Stimmen gefunden, die auch öffentlich sprechen wollen."
          }
        ]
      },
      {
        "id": "probleme-loesen",
        "name": "Probleme lösen",
        "pos": 2,
        "spur": 0,
        "ziel": "Ein konkretes Alltagsproblem aus dem Zuhören ist sichtbar gelöst oder deutlich verbessert, und die Befragten wissen es.",
        "warum": "Wo Daseinsvorsorge wie Breitband, Kinderbetreuung und Schulen schlechter ist, liegt der Anteil der rechtsextremen Partei höher; Zufriedenheit mit lebendigen Ortszentren geht mit weniger Zustimmung einher. Beteiligung ohne Umsetzung verpufft, Beteiligung mit sichtbarer Folge stärkt Vertrauen bei Menschen mit niedrigem Vertrauen. Kausalität ist nicht bewiesen, die Richtung ist über Studien hinweg konsistent.",
        "evidenz": "mittel",
        "techniken": [
          "beduerfnisse-adressieren",
          "buergerrat-deliberation",
          "kontakt-begegnung"
        ],
        "schritte": [
          "Wählt ein Problem, das in 6 bis 12 Monaten lösbar ist, zum Beispiel ein Bürgerbus, ein Dorfladen, ein Jugendraum, eine Spielplatzsanierung.",
          "Bildet eine Arbeitsgruppe, in der Befragte aus dem Zuhören mitwirken, nicht nur das Bündnis.",
          "Klärt mit Verwaltung und Gemeinderat Zuständigkeit, Geld und Zeitplan.",
          "Macht Zwischenstände sichtbar: Aushang, Lokalzeitung, Gemeindeblatt, Dorffest.",
          "Feiert die Lösung mit allen, die beigetragen haben, und nennt die Beteiligten beim Namen, wenn sie das wollen."
        ],
        "formulierungen": [
          "Sie haben uns an der Haustür vom Bus erzählt. Wir haben einen Antrag im Gemeinderat. Kommen Sie am Donnerstag mit?",
          "Was wir nicht ändern können, sagen wir ehrlich. Was wir ändern können, packen wir an.",
          "Das hier ist entstanden, weil 60 Leute es gesagt haben. Es ist euer Projekt."
        ],
        "fehler": [
          "Versprechen, was Kommune oder Bündnis nicht liefern können.",
          "Das Projekt als „Maßnahme gegen Rechts“ etikettieren; das verprellt die, um die es geht.",
          "Die Befragten nicht einbeziehen und das Ergebnis nicht zurückmelden."
        ],
        "signale_weiter": [
          "Das Problem ist spürbar kleiner und im Ort bekannt.",
          "Menschen, die vorher nur gemeckert haben, arbeiten mit.",
          "Die Lokalzeitung oder das Gemeindeblatt berichtet."
        ],
        "signale_stopp": [
          "Das Projekt steckt seit Monaten in der Verwaltung fest und ihr sagt es niemandem.",
          "Die Arbeitsgruppe besteht nur noch aus dem Bündnis."
        ],
        "dauer": "6 bis 12 Monate",
        "weiter": [
          {
            "zu": "begegnung",
            "wenn": "Ein erstes Ergebnis ist sichtbar."
          },
          {
            "zu": "ermueden",
            "wenn": "Das Projekt zieht sich und die Energie sinkt."
          }
        ],
        "umsteigen": [
          {
            "linie": "oeffentlichkeit",
            "station": "botschaft",
            "wenn": "Ihr wollt das Ergebnis über den Ort hinaus erzählen."
          }
        ]
      },
      {
        "id": "begegnung",
        "name": "Begegnung schaffen",
        "pos": 3,
        "spur": 0,
        "ziel": "Menschen mit unterschiedlichen Ansichten treffen sich regelmäßig, moderiert und auf Augenhöhe.",
        "warum": "Ein zweistündiges Gespräch mit Andersdenkenden senkte bei „Deutschland spricht“ Abneigung und Stereotype und erhöhte Vertrauen, änderte Positionen aber nicht; Gespräche unter Gleichgesinnten polarisierten. Deliberation depolarisiert nur in heterogenen, moderierten, persönlichen Gruppen; homogene oder unmoderierte Runden polarisieren.",
        "evidenz": "mittel",
        "techniken": [
          "kontakt-begegnung",
          "buergerrat-deliberation",
          "perspektivwechsel-erzaehlung"
        ],
        "schritte": [
          "Wählt Formate mit gemeinsamer Aufgabe statt Podiumsdiskussion: Kochen, Bauen, Dorfspaziergang, Tafel der offenen Gesellschaft.",
          "Sorgt für Mischung: ladet gezielt Menschen ein, die sonst fernbleiben, über die Verbündeten aus deren Milieus.",
          "Setzt eine neutrale, empathische Moderation und klare Regeln: ausreden lassen, keine Abwertung von Gruppen.",
          "Baut Erzählen ein: Jede Person erzählt eine Erfahrung, bevor über Positionen geredet wird.",
          "Macht es regelmäßig, zum Beispiel monatlich, statt einmal groß."
        ],
        "formulierungen": [
          "Hier geht es nicht darum, wer recht hat. Hier geht es darum, dass wir uns kennen.",
          "Erzählen Sie mal, wann Sie sich hier im Ort zuletzt richtig wohlgefühlt haben.",
          "Wir haben eine Regel: Über Menschen reden wir so, als säßen sie mit am Tisch."
        ],
        "fehler": [
          "Streitformate, die zum Gewinnen einladen.",
          "Nur Gleichgesinnte, weil die Einladung nur im eigenen Netzwerk kursiert.",
          "Einmalige Großveranstaltung ohne Fortsetzung.",
          "Erwartung, dass Positionen sich ändern; das Ziel ist Entfeindung."
        ],
        "signale_weiter": [
          "Menschen kommen wieder, die beim ersten Mal skeptisch waren.",
          "Teilnehmende grüßen sich im Ort, die sich vorher nicht kannten.",
          "Jemand erzählt, dass er anders über eine Gruppe denkt als vorher."
        ],
        "signale_stopp": [
          "Das Format wird zur Bühne für Parolen und die Moderation greift nicht.",
          "Betroffene von Abwertung fühlen sich nicht geschützt und bleiben weg."
        ],
        "dauer": "Monatlich, über mindestens ein Jahr",
        "weiter": [
          {
            "zu": "sichtbar",
            "wenn": "Das Format läuft seit drei Monaten stabil."
          },
          {
            "zu": "konflikt",
            "wenn": "Ein Treffen eskaliert oder wird gezielt gestört."
          }
        ],
        "umsteigen": [
          {
            "linie": "praevention",
            "station": "kontakt",
            "wenn": "Ihr wollt Jugendliche und Schule einbinden."
          }
        ]
      },
      {
        "id": "sichtbar",
        "name": "Haltung sichtbar machen",
        "pos": 4,
        "spur": 0,
        "ziel": "Im Ort ist sichtbar, dass die Mehrheit Respekt und Miteinander will, ohne dass Nachbarn beschämt werden.",
        "warum": "Öffentliche Signale verändern, was Menschen zu sagen wagen: Sichtbare Normen senken Hassrede, fehlende Normen lassen sie steigen. Versuche, eine normalisierte Partei neu zu stigmatisieren, wirken dagegen nicht und erhöhen bei Teilgruppen sogar die Akzeptanz; Beschämung der Wählenden erzeugt Reaktanz.",
        "evidenz": "mittel",
        "techniken": [
          "soziale-normen",
          "vertrauenswuerdige-botschafter",
          "moral-reframing"
        ],
        "schritte": [
          "Formuliert die Norm positiv und lokal: „Hier reden wir miteinander, hier hilft man sich.“",
          "Lasst sie von Menschen aussprechen, die im Ort Gewicht haben, nicht von Parteien.",
          "Zeigt Gesichter und Geschichten aus dem Ort statt Parolen gegen die Partei.",
          "Nutzt bestehende Anlässe: Dorffest, Sportturnier, Kirchweih, Gemeindeblatt.",
          "Haltet die Linie: Positionen ablehnen, Menschen nicht etikettieren."
        ],
        "formulierungen": [
          "Wir sind der Verein, in dem alle mitspielen. Das war immer so und bleibt so.",
          "Hier zählt, was einer tut, nicht wo er herkommt.",
          "Ich bin gegen diese Partei, aber nicht gegen meinen Nachbarn. Mit dem rede ich."
        ],
        "fehler": [
          "Kampagnen gegen Wählende statt gegen Positionen.",
          "Moralische Überlegenheitsgesten und Nazi-Etiketten für den halben Ort.",
          "Bedrohungsrhetorik („Demokratie in Gefahr“) als Dauerton; sie kann autoritäre Reaktionen aktivieren.",
          "Botschafter aus dem politischen Gegenlager, die polarisieren."
        ],
        "signale_weiter": [
          "Menschen widersprechen Parolen im Alltag häufiger, am Stammtisch, im Verein.",
          "Aushänge und Beiträge werden nicht abgerissen oder nur vereinzelt.",
          "Neue Leute fragen, wie sie mitmachen können."
        ],
        "signale_stopp": [
          "Engagierte werden bedroht, Sachbeschädigungen häufen sich.",
          "Der Ort spaltet sich in Lager und das Bündnis gilt als Partei."
        ],
        "dauer": "Laufend",
        "weiter": [
          {
            "zu": "dauerhaft",
            "wenn": "Die Norm wird von anderen aufgegriffen, ohne dass ihr es organisiert."
          },
          {
            "zu": "konflikt",
            "wenn": "Es gibt Gegenwehr, Drohungen oder Störungen."
          }
        ],
        "umsteigen": [
          {
            "linie": "oeffentlichkeit",
            "station": "botschaft",
            "wenn": "Ihr wollt die Norm überregional oder online kommunizieren."
          },
          {
            "linie": "hilfe",
            "station": "gefahr",
            "wenn": "Es gibt Drohungen oder Angriffe auf Engagierte."
          }
        ]
      },
      {
        "id": "dauerhaft",
        "name": "Dauerhaft verankern",
        "pos": 5,
        "spur": 0,
        "ziel": "Zuhören, Problemlösen und Begegnung laufen in festen Strukturen weiter, unabhängig von einzelnen Personen und Förderprogrammen.",
        "warum": "Einmalige Events ohne Einbettung zeigen keine Wirkung, und Effekte von Interventionen verfallen ohne Wiederholung. Regionen mit Partnerschaften für Demokratie entwickelten sich in den meisten Aspekten günstiger, allerdings nach Selbsteinschätzung. Förderstrukturen ändern sich ab 2027 deutlich; wer nur auf Projektgeld baut, verliert.",
        "evidenz": "schwach",
        "techniken": [
          "kontakt-begegnung",
          "soziale-normen",
          "selbstfuersorge"
        ],
        "schritte": [
          "Verankert Formate in bestehenden Trägern: Verein, Gemeinde, Kirche, Volkshochschule.",
          "Sichert Finanzierung über mehrere Quellen: Kommune, Partnerschaft für Demokratie, Stiftungen, Beiträge.",
          "Baut Nachwuchs auf und verteilt Verantwortung auf mehrere Schultern.",
          "Wiederholt das Zuhören jährlich und passt die Themen an.",
          "Dokumentiert einfach und ehrlich: Gespräche, Teilnehmende, gelöste Probleme, Abbrüche."
        ],
        "formulierungen": [
          "Das Zuhören machen wir jedes Jahr im Frühjahr. Das gehört jetzt zum Ort wie das Maifest.",
          "Wir brauchen drei Leute, die das nächstes Jahr tragen. Wer hat Lust?",
          "Steigende Umfragewerte heißen nicht, dass wir umsonst arbeiten. Wir wissen nicht, wie es ohne uns wäre."
        ],
        "fehler": [
          "Alles an einer Person oder einem Förderprogramm aufhängen.",
          "Erfolg nur an Wahlergebnissen messen.",
          "Die Engagierten verbrauchen, ohne für Entlastung zu sorgen."
        ],
        "signale_weiter": [
          "Formate laufen auch, wenn die Initiator:innen fehlen.",
          "Die Kommune hat einen Beschluss oder Haushaltsposten dazu.",
          "Neue Themen aus dem Zuhören werden selbständig aufgegriffen."
        ],
        "signale_stopp": [
          "Die Kernpersonen sind ausgebrannt und niemand übernimmt.",
          "Förderung bricht weg und es gibt keinen Plan B."
        ],
        "dauer": "Jahre",
        "weiter": [],
        "umsteigen": [
          {
            "linie": "oeffentlichkeit",
            "station": "messen",
            "wenn": "Ihr wollt Wirkung systematischer erfassen."
          },
          {
            "linie": "praevention",
            "station": "verankern",
            "wenn": "Ihr wollt die Strukturen mit Schule und Jugendarbeit verbinden."
          }
        ]
      },
      {
        "id": "konflikt",
        "name": "Konflikt im Ort",
        "pos": 3,
        "spur": 1,
        "ziel": "Ihr geht mit Störungen, Drohungen und offenem Streit so um, dass Betroffene geschützt sind und das Bündnis hält.",
        "warum": "Bedrohung ist für Engagierte Alltag, deshalb gehören Schutz und Verweisstrukturen in jeden Plan. Die Mobile Beratung berät Kommunen und Initiativen anlassbezogen, die Opferberatung steht Betroffenen rechter Gewalt parteilich zur Seite; dieser Beistand ist ein belegter Wirkmechanismus.",
        "evidenz": "mittel",
        "techniken": [
          "grenzen-setzen",
          "vertrauenswuerdige-botschafter",
          "selbstfuersorge"
        ],
        "schritte": [
          "Holt sofort die Mobile Beratung im Landkreis dazu; sie kennt solche Lagen.",
          "Schützt Betroffene zuerst: Begleitung, Opferberatung, bei Straftaten Anzeige.",
          "Legt Regeln für Veranstaltungen fest: Hausrecht, Moderation, Ansprechpartner für Störungen.",
          "Sprecht als Bündnis mit einer Stimme und lasst vertrauenswürdige Personen aus dem Ort sprechen.",
          "Unterscheidet Streit in der Sache (aushalten) von Einschüchterung (nicht dulden)."
        ],
        "formulierungen": [
          "Über den Bus kann man streiten. Drohungen gegen Leute aus dem Ort dulden wir nicht.",
          "Wir haben die Mobile Beratung angerufen. Die kommen am Mittwoch und reden mit uns allen.",
          "Wer gestört hat, kann gern wiederkommen, wenn er sich an die Regeln hält."
        ],
        "fehler": [
          "Den Konflikt allein ausfechten, ohne Beratung und ohne Verbündete.",
          "Alle Kritiker mit Störern gleichsetzen.",
          "Betroffene zur Deeskalation verpflichten, statt sie zu schützen."
        ],
        "signale_weiter": [
          "Die Störungen nehmen ab oder bleiben folgenlos.",
          "Betroffene fühlen sich geschützt und bleiben dabei."
        ],
        "signale_stopp": [
          "Gewalt, Waffen, organisierte Einschüchterung.",
          "Das Bündnis zerbricht unter dem Druck."
        ],
        "dauer": "Wochen",
        "weiter": [
          {
            "zu": "begegnung",
            "wenn": "Die Lage ist beruhigt und Regeln sind etabliert."
          },
          {
            "zu": "ermueden",
            "wenn": "Der Konflikt hat das Team erschöpft."
          }
        ],
        "umsteigen": [
          {
            "linie": "hilfe",
            "station": "gefahr",
            "wenn": "Es gibt Gewalt, Waffen oder konkrete Drohungen."
          },
          {
            "linie": "oeffentlichkeit",
            "station": "shitstorm",
            "wenn": "Der Konflikt läuft vor allem online."
          }
        ]
      },
      {
        "id": "ermueden",
        "name": "Ermüdung im Team",
        "pos": 2,
        "spur": -1,
        "ziel": "Das Team erholt sich, verteilt Lasten neu und entscheidet bewusst, wie es weitergeht.",
        "warum": "Selbstschutz der Engagierten gehört laut Praxisberichten in jeden Fahrplan; Ausstiege aus dem Engagement entstehen durch Überlastung und Bedrohung, nicht durch mangelnde Überzeugung. Wer Erfolg nur an Wahlergebnissen misst, demotiviert sein Team, denn niemand weiß, wie es ohne das Engagement gelaufen wäre.",
        "evidenz": "schwach",
        "techniken": [
          "selbstfuersorge",
          "grenzen-setzen"
        ],
        "schritte": [
          "Benennt die Erschöpfung offen in einer Teamrunde.",
          "Streicht Aufgaben: Was kann liegen bleiben, was kann jemand anderes übernehmen?",
          "Plant eine Pause mit festem Wiederbeginn.",
          "Holt Unterstützung: Partnerschaft für Demokratie, Mobile Beratung, Supervision.",
          "Sammelt, was gelungen ist, und macht es für das Team sichtbar."
        ],
        "formulierungen": [
          "Wir machen bis Sommer Pause und treffen uns am ersten September wieder.",
          "Wir haben in einem Jahr 80 Gespräche geführt und einen Jugendraum geöffnet. Das war nicht nichts.",
          "Ich kann nicht mehr alles tragen. Wer übernimmt die Begegnungsrunde?"
        ],
        "fehler": [
          "Weitermachen, bis Schlüsselpersonen ganz aussteigen.",
          "Erschöpfung als Schwäche behandeln.",
          "Die Pause ohne Wiederbeginn, sodass alles einschläft."
        ],
        "signale_weiter": [
          "Nach der Pause kommen mindestens so viele wieder wie vorher.",
          "Aufgaben sind auf mehr Schultern verteilt."
        ],
        "signale_stopp": [
          "Niemand will nach der Pause weitermachen.",
          "Einzelne sind gesundheitlich ernsthaft angeschlagen."
        ],
        "dauer": "4 bis 12 Wochen",
        "weiter": [
          {
            "zu": "verbuendete",
            "wenn": "Ihr braucht neue Mitstreiter:innen."
          },
          {
            "zu": "probleme-loesen",
            "wenn": "Das Team ist erholt und ein Projekt wartet."
          }
        ],
        "umsteigen": [
          {
            "linie": "hilfe",
            "station": "beratung",
            "wenn": "Einzelne Engagierte brauchen nach Bedrohung oder Überlastung professionelle Unterstützung."
          }
        ]
      }
    ]
  },
  {
    "id": "oeffentlichkeit",
    "name": "Öffentlichkeit und Kampagne",
    "kurz": "Kampagne",
    "farbe": "#c2410c",
    "ebene": "masse",
    "zielgruppe": "Initiativen, Bündnisse, Kommunikationsteams, Kommunalpolitik, Lokalmedien",
    "leitidee": "Diese Linie plant Kommunikation, die den Graubereich erreicht statt die eigene Blase: Zielgruppe klären, Botschaft aus dem Bedürfnis bauen, glaubwürdige Stimmen finden, Manipulationstechniken vorab entlarven, Kanäle klug wählen und Wirkung ehrlich messen. Sie wirkt auf Erkennung von Manipulation und auf Normen, nicht direkt auf Wahlentscheidungen.",
    "dauer": "3 bis 12 Monate je Welle, wiederholt",
    "voraussetzungen": [
      "Ein Team mit Zeit für mindestens drei Monate und jemand, der Zahlen auswerten kann.",
      "Zugang zu Menschen aus der Zielgruppe, um Botschaften vorab zu testen.",
      "Klarheit, dass Reichweite kein Wirkungsnachweis ist."
    ],
    "stationen": [
      {
        "id": "zielgruppe",
        "name": "Zielgruppe klären",
        "pos": 0,
        "spur": 0,
        "ziel": "Ihr wisst, wen ihr erreichen wollt: den ambivalenten Graubereich und die Enttäuschten, nicht den geschlossenen Kern.",
        "warum": "Nur rund 3 Prozent haben ein geschlossen rechtsextremes Weltbild, aber etwa 20 Prozent sind ambivalent; die Wählerschaft der Partei ist heterogen, rund zwei Drittel konservative Hardliner, ein Fünftel radikal-rechte Autoritäre, eine kleine moderate Gruppe. Treiber sind subjektive Migrationssorge, Kränkung und Kontrollverlust, weniger objektive Armut.",
        "evidenz": "stark",
        "techniken": [
          "beduerfnisse-adressieren",
          "haustuergespraech"
        ],
        "schritte": [
          "Beschreibt zwei bis drei Segmente nach Motiven, nicht nach Demografie: Enttäuschte, Besorgte, Übergangene.",
          "Nutzt eure Zuhör-Ergebnisse aus Haustür und Verein als Grundlage.",
          "Legt fest, was ihr bei dieser Gruppe erreichen wollt: Manipulation erkennen, Vertrauen in Nachbarn, Beteiligung.",
          "Streicht den harten Kern bewusst als Kampagnenziel; dort gilt Grenze setzen und Betroffene schützen.",
          "Prüft, wie ihr diese Menschen tatsächlich erreicht, bevor ihr Inhalte produziert."
        ],
        "formulierungen": [
          "Wir reden mit denen, die enttäuscht sind, nicht mit denen, die entschieden sind.",
          "Unsere Zielgruppe ist der Nachbar, der sagt: ‚Ich bin kein Rechter, aber irgendwer muss doch mal.‘",
          "Wir wollen nicht die Partei kleinreden, sondern den Leuten im Graubereich etwas anbieten."
        ],
        "fehler": [
          "Kampagne für die eigene Blase, die sich gut anfühlt und niemanden erreicht.",
          "Die Zielgruppe als Nazis oder Schwurbler etikettieren.",
          "Alle Wählenden über einen Kamm scheren."
        ],
        "signale_weiter": [
          "Ihr könnt jedes Segment in zwei Sätzen mit seinem Bedürfnis beschreiben.",
          "Ihr habt Kontakt zu Menschen aus dem Segment, die Entwürfe gegenlesen."
        ],
        "signale_stopp": [
          "Ihr habt niemanden aus der Zielgruppe im Blick, nur Vermutungen.",
          "Das Team will eigentlich die Partei bekämpfen, nicht Menschen erreichen."
        ],
        "dauer": "2 bis 4 Wochen",
        "weiter": [
          {
            "zu": "botschaft",
            "wenn": "Segmente und Ziel stehen."
          }
        ],
        "umsteigen": [
          {
            "linie": "nachbarschaft",
            "station": "zuhoeren-vor-ort",
            "wenn": "Euch fehlt echtes Wissen über die Menschen vor Ort."
          }
        ]
      },
      {
        "id": "botschaft",
        "name": "Botschaft bauen",
        "pos": 1,
        "spur": 0,
        "ziel": "Eine Botschaft, die das Bedürfnis der Zielgruppe ernst nimmt, in deren Werten spricht und niemanden beschämt.",
        "warum": "Empathische Gegenrede reduzierte rassistische Posts, Humor und Drohungen bewirkten nichts. Argumente in den Werten des Gegenübers überzeugen besser, aber die Befunde zum Moral Reframing sind gemischt; sicher ist, dass Beschimpfung dem Absender schadet und Angstrhetorik autoritäre Reaktionen aktivieren kann.",
        "evidenz": "mittel",
        "techniken": [
          "moral-reframing",
          "perspektivwechsel-erzaehlung",
          "beduerfnisse-adressieren"
        ],
        "schritte": [
          "Startet mit dem Bedürfnis: Anerkennung, Sicherheit, Gerechtigkeit, Zugehörigkeit, Kontrolle.",
          "Erzählt Geschichten aus dem Ort statt Statistiken.",
          "Formuliert in den Werten der Zielgruppe: Fleiß, Zusammenhalt, Verlässlichkeit, Heimat.",
          "Streicht jede Zeile, die Wählende beschämt oder die Partei zum Hauptthema macht.",
          "Testet drei Varianten mit fünf Menschen aus der Zielgruppe und behaltet die Variante, die keine Abwehr auslöst."
        ],
        "formulierungen": [
          "Wer hier anpackt, gehört dazu. Egal, woher er kommt.",
          "Ordnung heißt für uns: Der Bus kommt, die Praxis ist besetzt, die Schule bleibt.",
          "Wir haben die Nase voll vom Gegeneinander. Deshalb reden wir miteinander."
        ],
        "fehler": [
          "Spott, Humor auf Kosten der Zielgruppe, Drohkulissen.",
          "Faktenlisten als Botschaft; Fakten sind Hygiene, kein Hebel.",
          "Der Dauerton „Demokratie in Gefahr“, der das Gefühl von Bedrohung verstärkt.",
          "Alternativlos-Rhetorik, die den Verhandlungsraum schließt."
        ],
        "signale_weiter": [
          "Testleser:innen aus der Zielgruppe sagen „Das meint mich“, ohne sich angegriffen zu fühlen.",
          "Die Botschaft funktioniert auch ohne Nennung der Partei."
        ],
        "signale_stopp": [
          "Testleser:innen reagieren mit Abwehr oder Spott.",
          "Das Team kann die Botschaft nur mit Angriff auf die Partei formulieren."
        ],
        "dauer": "3 bis 6 Wochen",
        "weiter": [
          {
            "zu": "botschafter",
            "wenn": "Eine getestete Botschaft steht."
          },
          {
            "zu": "gegenwind",
            "wenn": "Die Tests zeigen Abwehr bei der Zielgruppe."
          }
        ],
        "umsteigen": [
          {
            "linie": "nachbarschaft",
            "station": "sichtbar",
            "wenn": "Die Botschaft soll vor allem lokal als Norm sichtbar werden."
          }
        ]
      },
      {
        "id": "botschafter",
        "name": "Glaubwürdige Stimmen",
        "pos": 2,
        "spur": 0,
        "ziel": "Die Botschaft wird von Menschen getragen, denen die Zielgruppe vertraut: aus dem eigenen Milieu, Beruf oder Verein.",
        "warum": "Empfehlungen von Eliten des eigenen Lagers erhöhten Impfabsichten, dieselbe Botschaft vom politischen Gegner löste Abwehr aus. Beim Canvassing müssen die Gesprächsführenden nicht aus derselben demografischen Gruppe stammen, Glaubwürdigkeit und Nähe zum Milieu brauchen sie aber. Aussteiger:innen gelten als besonders vertrauenswürdige Stimmen bei Überzeugten.",
        "evidenz": "mittel",
        "techniken": [
          "vertrauenswuerdige-botschafter",
          "soziale-normen"
        ],
        "schritte": [
          "Sucht Stimmen, die gegen das eigene vermutete Interesse sprechen: Handwerksmeister, Landwirtin, Polizistin, Feuerwehrmann, Aussteiger.",
          "Fragt, ob sie die Botschaft in eigenen Worten sagen wollen, nicht ablesen.",
          "Schützt sie: klärt vorab, wie mit Anfeindungen umgegangen wird, und bietet Begleitung an.",
          "Haltet Parteien und bekannte Gesichter des Gegenlagers im Hintergrund.",
          "Verbindet Botschafter:innen mit den Begegnungsformaten vor Ort."
        ],
        "formulierungen": [
          "Ich wähle konservativ und sage trotzdem: So reden wir hier nicht über Menschen.",
          "Ich war selbst in der Szene. Was mir geholfen hat, war jemand, der nicht aufgegeben hat.",
          "Ihr kennt mich vom Betrieb. Mir könnt ihr glauben, dass es hier nicht um Parteien geht."
        ],
        "fehler": [
          "Prominente aus dem politischen Gegenlager vorschicken.",
          "Botschafter:innen ohne Schutz in den Shitstorm schicken.",
          "Aussteiger:innen als Einmal-Event ohne Einbettung einsetzen; das zeigte in Schulen keine Wirkung."
        ],
        "signale_weiter": [
          "Mindestens zwei Stimmen aus Milieus, die sonst nicht erreicht werden, sind dabei.",
          "Die Zielgruppe teilt oder kommentiert konstruktiv."
        ],
        "signale_stopp": [
          "Botschafter:innen werden bedroht und ziehen sich zurück.",
          "Nur die üblichen Verdächtigen sprechen."
        ],
        "dauer": "4 bis 8 Wochen",
        "weiter": [
          {
            "zu": "prebunking",
            "wenn": "Stimmen sind gewonnen und geschützt."
          },
          {
            "zu": "shitstorm",
            "wenn": "Eine Stimme wird online massiv angegriffen."
          }
        ],
        "umsteigen": [
          {
            "linie": "nachbarschaft",
            "station": "verbuendete",
            "wenn": "Ihr findet keine glaubwürdigen Stimmen und müsst erst lokal Vertrauen aufbauen."
          }
        ]
      },
      {
        "id": "prebunking",
        "name": "Manipulation vorab entlarven",
        "pos": 3,
        "spur": 0,
        "ziel": "Die Zielgruppe erkennt Sündenbock-Rhetorik, falsche Dichotomien und Emotionalisierung, bevor sie ihr begegnet.",
        "warum": "Eine Meta-Analyse von 42 Studien zeigt, dass psychologische Inokulation die Glaubwürdigkeit von Falschinformation senkt; 90-Sekunden-Videos zu Manipulationstechniken verbesserten die Erkennung parteiübergreifend, auch in einem YouTube-Feldtest mit über 22.000 Personen. Effekte verfallen ohne Auffrischung innerhalb von Wochen bis Monaten, und gemessen wird Erkennung, nicht Parteineigung.",
        "evidenz": "stark",
        "techniken": [
          "prebunking",
          "debunking-sandwich"
        ],
        "schritte": [
          "Wählt zwei bis drei Techniken, die lokal häufig sind: Sündenbock, falsche Dichotomie, Dekontextualisierung.",
          "Zeigt die Technik an neutralen Beispielen, nicht an der Partei; sonst wirkt es als Angriff.",
          "Nutzt vorhandene Clips und Materialien, zum Beispiel aus der Prebunking-Kampagne von 2023 und EU-weit 2024, und passt sie lokal an.",
          "Spielt sie dort aus, wo die Zielgruppe ist: Vereinsabende, Schulen, lokale Social-Media-Gruppen, Lokalzeitung.",
          "Wiederholt alle vier bis acht Wochen mit neuen Beispielen."
        ],
        "formulierungen": [
          "Wenn jemand für alles eine einzige Gruppe verantwortlich macht, ist das meistens ein Trick, kein Befund.",
          "‚Entweder wir oder die‘: Wer so redet, will, dass du aufhörst zu denken.",
          "Schau beim nächsten Video mal, ob es dich wütend machen will, bevor es dir etwas erklärt."
        ],
        "fehler": [
          "Einmalige Welle ohne Auffrischung.",
          "Prebunking als Angriff auf die Partei framen, das aktiviert Abwehr.",
          "Pauschale Medienskepsis fördern statt Technikerkennung."
        ],
        "signale_weiter": [
          "Menschen benennen Techniken im Alltag von selbst.",
          "Ein kurzer Vorher-Nachher-Test zeigt bessere Erkennung manipulativer Beispiele."
        ],
        "signale_stopp": [
          "Die Clips werden als Propaganda gelesen und geteilt, um euch lächerlich zu machen.",
          "Die Zielgruppe wird nicht erreicht, nur die eigene Blase."
        ],
        "dauer": "Laufend, in Wellen",
        "weiter": [
          {
            "zu": "kanaele",
            "wenn": "Materialien stehen und sind lokal angepasst."
          }
        ],
        "umsteigen": [
          {
            "linie": "praevention",
            "station": "inokulation",
            "wenn": "Ihr wollt mit Schulen arbeiten."
          }
        ]
      },
      {
        "id": "kanaele",
        "name": "Kanäle wählen",
        "pos": 4,
        "spur": 0,
        "ziel": "Die Botschaft erreicht die Zielgruppe über Kanäle, denen sie vertraut: Lokalzeitung, Vereine, Haustür, Dialogformate online.",
        "warum": "Nach dem Wegfall einer Lokalzeitung gewinnen kleinere, ideologisch entferntere Parteien; wo Lokalmedien fehlen, liegt der Anteil der rechtsextremen Partei höher. Auf TikTok erscheint die Partei weit überproportional in Empfehlungen, andere Parteien posten gleich viel ohne Sichtbarkeit. „Mehr posten“ ist keine Strategie, Dialogformate und Creator-Netzwerke sind plausibler, aber ohne Wirkungsnachweis.",
        "evidenz": "mittel",
        "techniken": [
          "haustuergespraech",
          "vertrauenswuerdige-botschafter",
          "kontakt-begegnung"
        ],
        "schritte": [
          "Priorisiert persönliche Kanäle: Haustür, Vereinsabend, Marktstand, Gemeindeblatt.",
          "Arbeitet mit der Lokalzeitung oder dem Lokalradio zusammen und liefert Geschichten statt Pressemitteilungen.",
          "Setzt online auf Antworten und Dialog in lokalen Gruppen statt auf ein Wettrüsten um Reichweite.",
          "Gewinnt lokale Creator oder Vereinsaccounts, die ohnehin Reichweite in der Zielgruppe haben.",
          "Verknüpft jeden Kanal mit einem Angebot: Treffen, Gespräch, Mitmachen."
        ],
        "formulierungen": [
          "Wir antworten auf jeden sachlichen Kommentar. Auf Beleidigungen nicht.",
          "Die Geschichte vom Jugendraum geben wir der Lokalzeitung, nicht dem Parteiblatt.",
          "Kommt am Samstag zum Marktstand, da reden wir in echt."
        ],
        "fehler": [
          "Reichweite auf TikTok als Ziel; das Wettrüsten verliert ihr.",
          "Nur Online, ohne Weg ins persönliche Gespräch.",
          "Kanäle bespielen, in denen die Zielgruppe nicht ist."
        ],
        "signale_weiter": [
          "Der Anteil der Zielgruppe an eurer Reichweite steigt, nicht nur die Gesamtzahl.",
          "Aus Online-Kontakten entstehen Zweit- und Drittkontakte vor Ort."
        ],
        "signale_stopp": [
          "Alle Reaktionen kommen aus der eigenen Blase.",
          "Die Online-Diskussion wird feindselig und bindet alle Kraft."
        ],
        "dauer": "Laufend",
        "weiter": [
          {
            "zu": "messen",
            "wenn": "Kanäle laufen seit mindestens vier Wochen."
          },
          {
            "zu": "shitstorm",
            "wenn": "Ein Kanal wird massiv angegriffen."
          }
        ],
        "umsteigen": [
          {
            "linie": "nachbarschaft",
            "station": "begegnung",
            "wenn": "Online-Kontakte sollen in persönliche Formate münden."
          }
        ]
      },
      {
        "id": "messen",
        "name": "Wirkung messen",
        "pos": 5,
        "spur": 0,
        "ziel": "Ihr wisst, ob die Kampagne bei der Zielgruppe etwas verändert hat, und nicht nur, wie viele sie gesehen haben.",
        "warum": "Reaktionsraten sagen nichts über Wirkung; direkt nach einer Intervention gemessene Effekte sind überschätzt, nach zwei Wochen sind viele verpufft. Interventionen können Feindseligkeit senken und zugleich antidemokratische Haltungen erhöhen, deshalb gehört ein Schadensindikator in jede Messung. Realistisch sind Nachbefragungen nach 4 Wochen und 3 Monaten.",
        "evidenz": "stark",
        "techniken": [
          "prebunking",
          "soziale-normen"
        ],
        "schritte": [
          "Legt vor dem Start fest, was ihr messt: Zielgruppenanteil an der Reichweite, Verweildauer, konstruktive versus feindselige Kommentare, Handlungsrate (Anfragen, Besuche), Dialogfolge.",
          "Macht eine kleine Vorher-Nachher-Messung mit einem Gefühlsthermometer oder einer Kurzskala bei exponierten und nicht exponierten Orten oder Zeiträumen.",
          "Wiederholt die Messung nach 4 bis 12 Wochen.",
          "Dokumentiert Abbrüche, Reaktanz und Shitstorm-Anteile als Schadensindikator.",
          "Zieht ehrliche Schlüsse und streicht, was nicht wirkt."
        ],
        "formulierungen": [
          "10.000 Aufrufe sagen uns nichts. Wie viele davon waren aus dem Ort, und was ist danach passiert?",
          "Wir fragen in acht Wochen noch mal. Was direkt danach gemessen wird, ist meist zu schön.",
          "Wenn Kommentare feindseliger geworden sind, müssen wir das wissen, nicht verstecken."
        ],
        "fehler": [
          "Likes und Teilnehmerzahlen als Wirkungsnachweis.",
          "Nur direkt nach der Aktion messen.",
          "Wahlergebnisse als einzigen Maßstab nehmen; niemand weiß, wie es ohne euch gelaufen wäre."
        ],
        "signale_weiter": [
          "Mindestens eine Kennzahl zeigt Veränderung in der Zielgruppe nach 4 Wochen.",
          "Die Handlungsrate steigt: mehr Gesprächsanfragen, mehr Besuche."
        ],
        "signale_stopp": [
          "Feindselige Reaktionen und Abbrüche nehmen zu.",
          "Ihr erreicht messbar nur die eigene Blase."
        ],
        "dauer": "4 bis 12 Wochen nach jeder Welle",
        "weiter": [],
        "umsteigen": [
          {
            "linie": "nachbarschaft",
            "station": "dauerhaft",
            "wenn": "Die Kampagne soll in lokale Dauerstrukturen übergehen."
          },
          {
            "linie": "oeffentlichkeit",
            "station": "zielgruppe",
            "wenn": "Die Messung zeigt, dass ihr die falsche Gruppe erreicht; plant eine neue Welle."
          }
        ]
      },
      {
        "id": "shitstorm",
        "name": "Shitstorm",
        "pos": 3,
        "spur": 1,
        "ziel": "Ihr kommt durch einen Angriff online, ohne Menschen zu verlieren oder selbst zu eskalieren.",
        "warum": "Empathische Antworten reduzierten in einem Feldexperiment rassistische Posts, Humor und Drohungen bewirkten nichts; Beschimpfungen schaden dem Absender. Engagierte sind oft Bedrohungen ausgesetzt, Schutz und Verweisstrukturen gehören deshalb in jeden Plan.",
        "evidenz": "mittel",
        "techniken": [
          "grenzen-setzen",
          "selbstfuersorge",
          "debunking-sandwich"
        ],
        "schritte": [
          "Benennt eine Person, die den Kanal für 48 Stunden moderiert, und entlastet die Betroffenen.",
          "Antwortet nur auf sachliche Kritik, kurz und freundlich; Beleidigungen und Drohungen dokumentiert, meldet und zeigt ihr an.",
          "Korrigiert Falschbehauptungen einmal: Mythos nennen, Trugschluss erklären, Fakt wiederholen, dann nicht mehr diskutieren.",
          "Informiert Verbündete und bittet um sichtbaren Rückhalt.",
          "Holt die Mobile Beratung oder eine Meldestelle für Hass im Netz dazu."
        ],
        "formulierungen": [
          "Danke für die Kritik. Da haben Sie recht, der Satz war missverständlich. Gemeint war …",
          "Beleidigungen beantworten wir nicht. Zum Thema gern beim Treffen am Samstag.",
          "Wir nehmen uns zwei Tage, bevor wir weiter posten. Das Team braucht Luft."
        ],
        "fehler": [
          "Zurückschlagen mit Spott oder Drohung.",
          "Jeden Kommentar beantworten und in Faktenduelle geraten.",
          "Betroffene allein lassen oder Drohungen nicht ernst nehmen."
        ],
        "signale_weiter": [
          "Die Welle ebbt nach wenigen Tagen ab.",
          "Verbündete haben sichtbar Rückhalt gegeben."
        ],
        "signale_stopp": [
          "Konkrete Drohungen gegen Personen, Adressen werden veröffentlicht.",
          "Das Team ist traumatisiert und will aufhören."
        ],
        "dauer": "Tage bis 2 Wochen",
        "weiter": [
          {
            "zu": "kanaele",
            "wenn": "Die Lage ist ruhig und ihr habt Regeln nachgeschärft."
          },
          {
            "zu": "botschafter",
            "wenn": "Ihr braucht neue oder besser geschützte Stimmen."
          }
        ],
        "umsteigen": [
          {
            "linie": "hilfe",
            "station": "gefahr",
            "wenn": "Es gibt Drohungen gegen Leib und Leben oder private Daten werden veröffentlicht."
          }
        ]
      },
      {
        "id": "gegenwind",
        "name": "Gegenwind in der Zielgruppe",
        "pos": 2,
        "spur": -1,
        "ziel": "Ihr versteht, warum die Zielgruppe abwehrt, und baut die Botschaft um, statt lauter zu werden.",
        "warum": "Reaktanz zeigt sich als Ärger auf den Boten, Abwertung der Quelle und Verhärtung der eigenen Position; Beschämung der Wählenden erzeugt sie zuverlässig. Erneute Stigmatisierung einer normalisierten Partei wirkt nicht und kann Akzeptanz erhöhen. Aufforderungen zum Perspektivwechsel senken die Offenheit, wenn die Werte als fremd erlebt werden.",
        "evidenz": "mittel",
        "techniken": [
          "aktives-zuhoeren",
          "moral-reframing",
          "beduerfnisse-adressieren"
        ],
        "schritte": [
          "Fragt fünf Menschen aus der Zielgruppe, was an der Botschaft sie geärgert hat, und hört nur zu.",
          "Prüft die Botschaft auf versteckte Beschämung, Überlegenheitston und Parteifokus.",
          "Baut die Botschaft aus dem Bedürfnis neu, in den Werten der Gruppe.",
          "Testet erneut mit denselben Menschen.",
          "Lasst die Botschaft weg, wenn nichts hilft, und setzt auf Begegnung vor Ort."
        ],
        "formulierungen": [
          "Wir haben euch offenbar verfehlt. Was genau hat euch gestört?",
          "Danke. Das war von oben herab, das sehen wir jetzt auch.",
          "Lassen wir das Plakat. Lasst uns lieber zusammen kochen."
        ],
        "fehler": [
          "Lauter und häufiger dieselbe Botschaft senden.",
          "Die Abwehr der Zielgruppe als Beleg für deren Verbohrtheit lesen.",
          "Noch mehr Fakten nachschieben."
        ],
        "signale_weiter": [
          "Die Testgruppe reagiert auf die neue Version ohne Abwehr.",
          "Ihr könnt den Grund der Abwehr in einem Satz benennen."
        ],
        "signale_stopp": [
          "Die Testgruppe ist für jedes Format unerreichbar; dann ist eine Kampagne das falsche Werkzeug."
        ],
        "dauer": "2 bis 4 Wochen",
        "weiter": [
          {
            "zu": "botschaft",
            "wenn": "Ihr habt verstanden, was gestört hat."
          },
          {
            "zu": "zielgruppe",
            "wenn": "Ihr merkt, dass ihr das falsche Segment anvisiert habt."
          }
        ],
        "umsteigen": [
          {
            "linie": "nachbarschaft",
            "station": "begegnung",
            "wenn": "Kommunikation allein kommt nicht an; persönliche Begegnung ist der bessere Weg."
          }
        ]
      }
    ]
  },
  {
    "id": "praevention",
    "name": "Schule und Jugend",
    "kurz": "Jugend",
    "farbe": "#7c3aed",
    "ebene": "beide",
    "zielgruppe": "Lehrkräfte, Schulsozialarbeit, Jugendarbeit, Trainer:innen, Eltern",
    "leitidee": "Diese Linie stärkt junge Menschen, bevor und während eine verfassungsfeindliche Partei für sie attraktiv wird: Manipulation erkennen, Gewissheit und Zugehörigkeit demokratisch erleben, Teilhabe mit Folgen, glaubwürdige Vorbilder und Kontakt über Gegensätze. Sie ersetzt keine Ausstiegsarbeit bei fest eingebundenen Jugendlichen und muss den Beutelsbacher Konsens einhalten: nicht überwältigen, Kontroverses kontrovers, Urteilsfähigkeit stärken.",
    "dauer": "Ein Schuljahr, dann verankert",
    "voraussetzungen": [
      "Rückhalt der Schulleitung oder des Trägers und Zeit im Stundenplan oder Programm.",
      "Haltung: Jugendliche sind Gesprächspartner, keine Fälle.",
      "Kontakt zur Mobilen Beratung oder zum Landes-Demokratiezentrum für den Ernstfall."
    ],
    "stationen": [
      {
        "id": "medienkompetenz",
        "name": "Medienkompetenz",
        "pos": 0,
        "spur": 0,
        "ziel": "Jugendliche durchschauen, wie Inhalte auf ihren Feeds entstehen, ausgewählt und emotionalisiert werden.",
        "warum": "Die Partei erscheint in Empfehlungen von Videoplattformen weit überproportional, bei Erstwähler:innen auf TikTok nach wenigen Minuten; 22 Prozent der 14- bis 29-Jährigen würden die Partei wählen, jeder vierte junge Mann nennt sich rechts. Wer Empfehlungslogik und Emotionalisierung versteht, kann sie einordnen.",
        "evidenz": "mittel",
        "techniken": [
          "prebunking",
          "fragen-statt-fakten"
        ],
        "schritte": [
          "Lasst die Jugendlichen ihre eigenen Feeds analysieren: Was wird mir warum gezeigt?",
          "Zeigt am neutralen Beispiel, wie Emotionalisierung und Schnitt wirken.",
          "Lasst sie selbst ein Video so schneiden, dass es wütend macht, und dann so, dass es informiert.",
          "Besprecht, wie man Quellen prüft, ohne alles für Lüge zu erklären.",
          "Bezieht Eltern mit einem Abend ein, an dem Jugendliche erklären, was sie gelernt haben."
        ],
        "formulierungen": [
          "Warum zeigt dir die App genau das? Wer verdient daran, dass du wütend bist?",
          "Du musst nicht alles glauben und nicht alles anzweifeln. Du musst nur wissen, wie du prüfst.",
          "Erklär mir deinen Feed. Ich kenne ihn nicht."
        ],
        "fehler": [
          "Verbote und Dämonisierung von Plattformen, die Jugendliche ohnehin nutzen.",
          "Moralisierende Belehrung über richtige Meinungen; das verstößt gegen das Überwältigungsverbot.",
          "Pauschale Medienskepsis säen, die auch seriöse Quellen trifft."
        ],
        "signale_weiter": [
          "Jugendliche benennen von sich aus Techniken in ihren Feeds.",
          "Die Jugendlichen fragen nach, woher etwas kommt, statt es nur zu teilen."
        ],
        "signale_stopp": [
          "Einzelne verbreiten gezielt rechtsextreme Inhalte in der Klasse.",
          "Die Gruppe spaltet sich in Lager und Betroffene von Abwertung ziehen sich zurück."
        ],
        "dauer": "4 bis 6 Unterrichtsstunden oder Workshops",
        "weiter": [
          {
            "zu": "inokulation",
            "wenn": "Die Gruppe kann die Empfehlungslogik erklären."
          },
          {
            "zu": "vorfall",
            "wenn": "Es gibt einen konkreten Vorfall mit rechtsextremen Inhalten."
          }
        ],
        "umsteigen": [
          {
            "linie": "oeffentlichkeit",
            "station": "prebunking",
            "wenn": "Ihr wollt Materialien aus einer laufenden Kampagne nutzen."
          }
        ]
      },
      {
        "id": "inokulation",
        "name": "Inokulation",
        "pos": 1,
        "spur": 0,
        "ziel": "Jugendliche erkennen Manipulationstechniken wie Sündenbock, falsche Dichotomie und Dekontextualisierung und können sie benennen.",
        "warum": "Psychologische Inokulation senkt die Glaubwürdigkeit von Falschinformation über 42 Studien hinweg; kurze Videos zu Techniken verbesserten die Erkennung parteiübergreifend. Effekte verfallen ohne Auffrischung innerhalb von Wochen bis Monaten; die Einmalveranstaltung ohne Konzept zeigte in einer randomisierten Schulstudie keine Wirkung.",
        "evidenz": "stark",
        "techniken": [
          "prebunking",
          "debunking-sandwich",
          "fragen-statt-fakten"
        ],
        "schritte": [
          "Führt je Technik eine kurze Einheit durch: Warnung, Erklärung an einem harmlosen Beispiel, Übung an echten Beispielen.",
          "Lasst Jugendliche eigene Beispiele aus ihren Feeds mitbringen und einordnen.",
          "Wiederholt die Techniken alle sechs bis acht Wochen in fünf Minuten, zum Beispiel im Klassenrat.",
          "Lasst ältere Schüler:innen jüngeren die Techniken erklären.",
          "Haltet Parteinamen aus den Beispielen heraus; die Technik ist das Thema, nicht die Partei."
        ],
        "formulierungen": [
          "Die Masche heißt ‚Sündenbock‘: Eine Gruppe ist an allem schuld. Wo habt ihr das diese Woche gesehen?",
          "‚Entweder oder‘: Wer euch nur zwei Optionen lässt, versteckt meistens die dritte.",
          "Was macht dieses Video mit deinem Bauch, bevor es deinem Kopf etwas sagt?"
        ],
        "fehler": [
          "Einmaliger Projekttag ohne Wiederholung.",
          "Beispiele, die eine Partei an den Pranger stellen; das wirkt als Parteinahme und verstößt gegen das Kontroversitätsgebot.",
          "Nur Fakten korrigieren statt Techniken zeigen."
        ],
        "signale_weiter": [
          "Ein kurzer Test zeigt, dass die Gruppe manipulative Beispiele besser erkennt als vorher.",
          "Jugendliche verwenden die Begriffe im Alltag."
        ],
        "signale_stopp": [
          "Die Gruppe nutzt die Begriffe nur, um Gegner abzuwerten.",
          "Einzelne reagieren mit Rückzug und Trotz."
        ],
        "dauer": "Ein Halbjahr mit Auffrischungen",
        "weiter": [
          {
            "zu": "teilhabe",
            "wenn": "Die Techniken sind verankert und werden aufgefrischt."
          }
        ],
        "umsteigen": [
          {
            "linie": "oeffentlichkeit",
            "station": "prebunking",
            "wenn": "Die Schule will Materialien mit dem Ort teilen."
          }
        ]
      },
      {
        "id": "teilhabe",
        "name": "Teilhabe mit Folgen",
        "pos": 2,
        "spur": 0,
        "ziel": "Jugendliche entscheiden über etwas, das sie betrifft, und sehen, dass ihre Entscheidung umgesetzt wird.",
        "warum": "Erlebte Machtlosigkeit und das Gefühl, keinen Einfluss zu haben, gehen mit Hinwendung zu autoritären Angeboten einher; 71,7 Prozent im Osten meinen, „Leute wie ich“ hätten keinen Einfluss. Beteiligung stärkt Vertrauen nur, wenn Empfehlungen umgesetzt werden; ohne Umsetzung verpufft der Effekt. Demokratische Angebote brauchen eine klare Wir-Identität mit Rollen und Ritualen.",
        "evidenz": "mittel",
        "techniken": [
          "buergerrat-deliberation",
          "beduerfnisse-adressieren",
          "soziale-normen"
        ],
        "schritte": [
          "Gebt ein echtes Budget oder eine echte Entscheidung frei: Pausenhof, Jugendraum, Projektwoche, Vereinsfest.",
          "Nutzt Klassenrat, Schülerparlament oder Jugendforum mit Moderation und festen Regeln.",
          "Setzt Beschlüsse sichtbar um und erklärt, was nicht geht und warum.",
          "Gebt Rollen: Sprecher:in, Kassenwart, Moderator:in, Protokoll.",
          "Feiert Ergebnisse mit der ganzen Gruppe."
        ],
        "formulierungen": [
          "Ihr entscheidet, was mit den 500 Euro passiert. Wir setzen um, was ihr beschließt.",
          "Das geht nicht, weil der Brandschutz es verbietet. Was wäre eure zweite Wahl?",
          "Du hast das Protokoll geführt. Ohne dich wüsste keiner, was beschlossen wurde."
        ],
        "fehler": [
          "Scheinbeteiligung ohne Umsetzung; das lehrt Ohnmacht.",
          "Nur die Lauten entscheiden lassen.",
          "Jugendliche mit rechten Sprüchen aus der Beteiligung ausschließen, statt sie in Rollen einzubinden."
        ],
        "signale_weiter": [
          "Jugendliche bringen eigene Anliegen ein, ohne aufgefordert zu werden.",
          "Auch Skeptische übernehmen eine Rolle."
        ],
        "signale_stopp": [
          "Beschlüsse werden von Erwachsenen regelmäßig kassiert.",
          "Die Gruppe wird von einzelnen dominiert, die andere abwerten."
        ],
        "dauer": "Ein Schuljahr",
        "weiter": [
          {
            "zu": "vorbilder",
            "wenn": "Mindestens ein Beschluss ist sichtbar umgesetzt."
          },
          {
            "zu": "eltern",
            "wenn": "Eltern blockieren oder fragen, was hier passiert."
          }
        ],
        "umsteigen": [
          {
            "linie": "nachbarschaft",
            "station": "probleme-loesen",
            "wenn": "Das Anliegen der Jugendlichen betrifft den ganzen Ort."
          }
        ]
      },
      {
        "id": "vorbilder",
        "name": "Vorbilder",
        "pos": 3,
        "spur": 0,
        "ziel": "Jugendliche erleben glaubwürdige Erwachsene und Gleichaltrige, die Haltung zeigen und Bedeutsamkeit bieten.",
        "warum": "Radikalisierung bedient das Bedürfnis nach Bedeutsamkeit, Netzwerke validieren die Erzählung; Szenen bieten Gemeinschaft, Action, Anerkennung, Selbstwert, Identität. Überzeugend sind Menschen aus dem eigenen Umfeld; einmalige Aussteiger-Vorträge ohne pädagogisches Konzept zeigten nach sechs Monaten keine Effekte.",
        "evidenz": "mittel",
        "techniken": [
          "vertrauenswuerdige-botschafter",
          "soziale-normen",
          "kontakt-begegnung"
        ],
        "schritte": [
          "Bindet Trainer:innen, Jugendleiter:innen, Azubi-Ausbilder:innen und ältere Jugendliche als Bezugspersonen ein.",
          "Lasst sie Haltung im Alltag zeigen, nicht in Vorträgen: wie sie mit Sprüchen umgehen, wen sie einladen.",
          "Ladet Aussteiger:innen nur eingebettet ein, mit Vor- und Nachbereitung und mehreren Terminen.",
          "Gebt Jugendlichen Aufgaben, bei denen sie gebraucht werden: Mentoring für Jüngere, Technik beim Fest, Teamkapitän.",
          "Macht Anerkennung konkret: Urkunde, Nennung, Verantwortung."
        ],
        "formulierungen": [
          "Bei mir im Training zählt, wie du dich reinhängst. Sprüche über andere gibt es hier nicht.",
          "Ich brauche dich am Samstag für die Technik. Ohne dich läuft das nicht.",
          "Ich war selbst mal nah dran. Erzähl mir, was dich daran anzieht."
        ],
        "fehler": [
          "Einmaliger Aussteiger-Vortrag als Alibi.",
          "Vorbilder, die moralisieren statt handeln.",
          "Anerkennung nur für die ohnehin Angepassten."
        ],
        "signale_weiter": [
          "Jugendliche suchen von sich aus Kontakt zu den Bezugspersonen.",
          "Die Jugendlichen übernehmen Verantwortung und halten sie durch."
        ],
        "signale_stopp": [
          "Eine Bezugsperson vertritt selbst rechtsextreme Positionen.",
          "Jugendliche werden von Gruppen außerhalb gezielt angeworben."
        ],
        "dauer": "Laufend",
        "weiter": [
          {
            "zu": "kontakt",
            "wenn": "Bezugspersonen sind etabliert."
          },
          {
            "zu": "vorfall",
            "wenn": "Es gibt eine Anwerbung oder einen Vorfall im Umfeld."
          }
        ],
        "umsteigen": [
          {
            "linie": "hilfe",
            "station": "beratung",
            "wenn": "Ein Jugendlicher ist bereits in einer Gruppe aktiv und sucht Rat."
          }
        ]
      },
      {
        "id": "kontakt",
        "name": "Kontakt über Gegensätze",
        "pos": 4,
        "spur": 0,
        "ziel": "Jugendliche aus verschiedenen Milieus, Herkünften und Meinungen arbeiten an gemeinsamen Zielen, mit gleichem Status.",
        "warum": "Randomisierte Kontaktstudien zeigen Effekte auf Vorurteile, bei ethnischen Vorurteilen kleiner und in präregistrierten Studien nahe null; keine Studie betraf Erwachsene über 25, Jugendliche sind also die bestbelegte Gruppe. Gespräche unter Gleichgesinnten polarisieren, heterogene moderierte Gruppen depolarisieren.",
        "evidenz": "mittel",
        "techniken": [
          "kontakt-begegnung",
          "perspektivwechsel-erzaehlung",
          "buergerrat-deliberation"
        ],
        "schritte": [
          "Plant Projekte mit gemeinsamem Ziel: Sportturnier, Theater, Bau, Schulgarten, Austausch mit einer anderen Schule.",
          "Mischt Gruppen bewusst und gebt gleichwertige Rollen.",
          "Baut Erzählrunden ein, in denen jede Person eine Erfahrung teilt.",
          "Moderiert und schützt Betroffene bei Abwertung sofort.",
          "Wiederholt über das Jahr statt einmal groß."
        ],
        "formulierungen": [
          "Ihr seid ein Team. Es zählt, ob ihr es zusammen schafft.",
          "Erzähl mal, wie das bei dir zu Hause war. Ich kenne das nicht.",
          "Hier gilt: Wir reden über Leute so, als wären sie im Raum."
        ],
        "fehler": [
          "Begegnung ohne gemeinsames Ziel und ohne gleichen Status.",
          "Einmalige Großveranstaltung.",
          "Einzelne Jugendliche als Vertreter:in ihrer Gruppe vorführen."
        ],
        "signale_weiter": [
          "Freundschaften über Milieugrenzen entstehen.",
          "Abwertende Sprüche nehmen ab oder werden von Gleichaltrigen gestoppt."
        ],
        "signale_stopp": [
          "Betroffene fühlen sich nicht geschützt und bleiben weg.",
          "Eine Gruppe dominiert und nutzt das Format als Bühne."
        ],
        "dauer": "Ein Schuljahr",
        "weiter": [
          {
            "zu": "verankern",
            "wenn": "Die Formate laufen und werden von Jugendlichen mitgetragen."
          }
        ],
        "umsteigen": [
          {
            "linie": "nachbarschaft",
            "station": "begegnung",
            "wenn": "Ihr wollt Familien und den Ort einbeziehen."
          }
        ]
      },
      {
        "id": "verankern",
        "name": "Verankern",
        "pos": 5,
        "spur": 0,
        "ziel": "Medienkompetenz, Beteiligung, Vorbilder und Kontakt sind Teil des Schul- oder Vereinsalltags, nicht Projektwochen.",
        "warum": "Einmalevents ohne Einbettung zeigen keine Wirkung, Inokulationseffekte verfallen ohne Auffrischung, und Prävention wirkt laut Evaluationen nur über Wiederholung und Verankerung in bestehenden Strukturen. Die Evidenz zu Wirkungen schulischer Prävention ist insgesamt dünn, deshalb braucht es Beobachtung von Anfang an.",
        "evidenz": "schwach",
        "techniken": [
          "soziale-normen",
          "prebunking",
          "selbstfuersorge"
        ],
        "schritte": [
          "Schreibt die Elemente ins Schulprogramm oder in die Vereinssatzung.",
          "Benennt Verantwortliche und Vertretung für jedes Element.",
          "Plant jährliche Auffrischungen und einen festen Platz im Kalender.",
          "Erhebt einfach: kurzer Vorher-Nachher-Test zur Technikerkennung, Beteiligungsquote, Vorfälle.",
          "Vernetzt euch mit Mobiler Beratung, Landes-Demokratiezentrum und Partnerschaft für Demokratie."
        ],
        "formulierungen": [
          "Das ist kein Projekt mehr. Das ist, wie wir Schule machen.",
          "Wer übernimmt den Klassenrat, wenn Frau Meyer in Elternzeit ist?",
          "Wir zählen jedes Jahr, wie viele mitentscheiden und wie viele Techniken erkennen."
        ],
        "fehler": [
          "Alles an einer engagierten Lehrkraft aufhängen.",
          "Projektwoche einmal im Jahr als Ersatz.",
          "Nicht messen und dann nicht wissen, ob etwas wirkt."
        ],
        "signale_weiter": [
          "Elemente laufen auch bei Personalwechsel weiter.",
          "Jugendliche tragen Formate selbst mit."
        ],
        "signale_stopp": [
          "Schulleitung oder Träger streichen Zeit und Rückhalt.",
          "Die Verantwortlichen sind erschöpft und niemand übernimmt."
        ],
        "dauer": "Dauerhaft",
        "weiter": [],
        "umsteigen": [
          {
            "linie": "nachbarschaft",
            "station": "dauerhaft",
            "wenn": "Schule und Ort sollen gemeinsam verankern."
          },
          {
            "linie": "oeffentlichkeit",
            "station": "messen",
            "wenn": "Ihr wollt Wirkung systematischer erfassen."
          }
        ]
      },
      {
        "id": "vorfall",
        "name": "Vorfall",
        "pos": 3,
        "spur": 1,
        "ziel": "Ihr reagiert auf einen Vorfall (Parolen, Symbole, Anwerbung, Bedrohung) so, dass Betroffene geschützt sind und der Jugendliche nicht verloren geht.",
        "warum": "Die Mobile Beratung unterscheidet Menschen mit noch offenem Denken (Gespräch lohnt) von geschlossenem Weltbild (positionieren, Grenzen setzen, Betroffene schützen). Der Praxiskonsens lautet: früh und unter vier Augen ansprechen, nicht schweigen, die Aussage ablehnen und die Person wertschätzen, nur verbieten, was man durchsetzen kann.",
        "evidenz": "mittel",
        "techniken": [
          "grenzen-setzen",
          "fragen-statt-fakten",
          "aktives-zuhoeren"
        ],
        "schritte": [
          "Schützt zuerst Betroffene und sprecht sie an, bevor ihr mit dem Verursacher redet.",
          "Sprecht den Jugendlichen unter vier Augen an: Benennt die Aussage, setzt eine Grenze und fragt, was dahintersteckt.",
          "Prüft, ob es um Provokation, Zugehörigkeit oder feste Überzeugung geht; der Kompass hilft.",
          "Holt die Mobile Beratung oder Schulsozialarbeit dazu, bei Straftaten oder Bedrohung die Polizei.",
          "Informiert Eltern transparent und ohne Schuldzuweisung."
        ],
        "formulierungen": [
          "Das, was du gesagt hast, ist rassistisch. Das geht hier nicht. Und ich will wissen, was dahintersteckt.",
          "Ich rede mit dir, nicht vor der Klasse. Was ist los?",
          "Ich habe gesehen, was passiert ist. Wie geht es dir damit? Was brauchst du?"
        ],
        "fehler": [
          "Vor der Klasse bloßstellen; das erzeugt Loyalitätsbekundung.",
          "Nur Sanktion ohne Gespräch, oder nur Gespräch ohne Schutz der Betroffenen.",
          "Den Vorfall verschweigen, um die Schule nicht in ein schlechtes Licht zu rücken."
        ],
        "signale_weiter": [
          "Der Jugendliche lässt sich auf das Gespräch ein und bleibt in Kontakt.",
          "Betroffene fühlen sich geschützt und bleiben."
        ],
        "signale_stopp": [
          "Feste Gruppeneinbindung, Symbole, Szene-Kontakte, Waffen.",
          "Wiederholte Vorfälle trotz klarer Grenzen."
        ],
        "dauer": "Tage bis Wochen",
        "weiter": [
          {
            "zu": "vorbilder",
            "wenn": "Der Jugendliche bleibt erreichbar und braucht Anbindung."
          },
          {
            "zu": "eltern",
            "wenn": "Eltern müssen einbezogen werden."
          }
        ],
        "umsteigen": [
          {
            "linie": "hilfe",
            "station": "beratung",
            "wenn": "Es gibt eine feste Szeneeinbindung oder wiederholte Vorfälle."
          },
          {
            "linie": "hilfe",
            "station": "gefahr",
            "wenn": "Es gibt Gewalt, Waffen oder Bedrohung."
          }
        ]
      },
      {
        "id": "eltern",
        "name": "Eltern einbeziehen",
        "pos": 2,
        "spur": -1,
        "ziel": "Eltern sind Verbündete, auch wenn sie selbst skeptisch oder überfordert sind, und wissen, wo sie Hilfe bekommen.",
        "warum": "Elternarbeit ist laut Distanzierungsforschung zentral; Angehörige, meist Mütter, sind der wichtigste Zugang und müssen Scham, Schuldgefühle und Angst vor Stigmatisierung überwinden. Elterlicher Einfluss greift nur bedingt, sobald die Gruppe Lebensmittelpunkt ist; deshalb früh und ohne Schuldzuweisung.",
        "evidenz": "mittel",
        "techniken": [
          "aktives-zuhoeren",
          "beduerfnisse-adressieren",
          "grenzen-setzen"
        ],
        "schritte": [
          "Ladet Eltern einzeln ein, nicht zur Anklage; beginnt mit dem, was ihr am Kind schätzt.",
          "Hört zu, was Eltern beobachten und befürchten.",
          "Erklärt, was ihr tut und warum, ohne Fachjargon.",
          "Nennt Anlaufstellen für Angehörige: Fachstelle Rechtsextremismus und Familie, Landes-Demokratiezentrum, Mobile Beratung.",
          "Vereinbart, wie ihr in Kontakt bleibt."
        ],
        "formulierungen": [
          "Ihr Sohn ist klug und wird in der Klasse gebraucht. Deshalb rede ich mit Ihnen.",
          "Sie sind nicht schuld. Und Sie sind nicht allein damit.",
          "Es gibt Leute, die sich mit genau solchen Situationen auskennen. Soll ich Ihnen die Nummer geben?"
        ],
        "fehler": [
          "Eltern beschuldigen oder belehren.",
          "Eltern übergehen, weil sie selbst der Partei nahestehen.",
          "Versprechen, dass die Schule das allein löst."
        ],
        "signale_weiter": [
          "Eltern melden sich von sich aus und arbeiten mit.",
          "Die Eltern nehmen eine Beratung in Anspruch."
        ],
        "signale_stopp": [
          "Eltern sind selbst in der Szene und blockieren jede Hilfe.",
          "Kindeswohl ist gefährdet."
        ],
        "dauer": "Wochen",
        "weiter": [
          {
            "zu": "teilhabe",
            "wenn": "Eltern tragen das Vorgehen mit."
          },
          {
            "zu": "vorfall",
            "wenn": "Ein neuer Vorfall erfordert gemeinsames Handeln."
          }
        ],
        "umsteigen": [
          {
            "linie": "hilfe",
            "station": "angehoerige",
            "wenn": "Eltern brauchen eigene Beratung."
          },
          {
            "linie": "gespraech",
            "station": "zuhoeren",
            "wenn": "Ein Elternteil sympathisiert selbst mit der Partei und ist gesprächsbereit."
          }
        ]
      }
    ]
  },
  {
    "id": "hilfe",
    "name": "Professionelle Begleitung und Ausstieg",
    "kurz": "Hilfe",
    "farbe": "#be185d",
    "ebene": "individuum",
    "zielgruppe": "Angehörige, Fachkräfte, Ausstiegswillige, Engagierte in Gefahr",
    "leitidee": "Diese Linie führt zu den Stellen, die mehr können als du allein: Angehörigenberatung ohne Schuldzuweisung, Ausstiegs- und Distanzierungsberatung, Opferberatung und Polizei bei Gefahr. Sie ist der Weg, wenn Warnzeichen auftauchen, die Person fest eingebunden ist oder du selbst nicht mehr weiterweißt. Sie ersetzt nicht deine Beziehung zur Person; die bleibt der wichtigste Außenkontakt.",
    "dauer": "Monate bis Jahre; Begleitungen dauern im Schnitt drei bis fünf Jahre",
    "voraussetzungen": [
      "Bereitschaft, Verantwortung zu teilen und nicht alles allein zu tragen.",
      "Bei Gefahr: Bereitschaft, Polizei oder Opferberatung einzuschalten.",
      "Hinweis: Förder- und Verweisstrukturen ändern sich ab 2027; Angebote vorher prüfen."
    ],
    "stationen": [
      {
        "id": "erkennen",
        "name": "Warnzeichen erkennen",
        "pos": 0,
        "spur": 0,
        "ziel": "Du unterscheidest zwischen offenem, widersprüchlichem Denken (Gespräch lohnt) und Warnzeichen, die professionelle Hilfe erfordern.",
        "warum": "Beratungsstellen nennen klare Anlässe für professionelle Hilfe: Gewalt oder Drohungen, Waffen, Reichsbürger-Bezug, Kinder in der Szene, Straftaten, Vereinnahmung durch feste Gruppen, Suizidalität oder psychische Krise, und wenn Angehörige nicht mehr weiterwissen. Meinungs- und Handlungsradikalisierung sind getrennt: Die meisten mit radikalen Meinungen handeln nie, viele Handelnde hatten vorher keine radikalen Meinungen.",
        "evidenz": "mittel",
        "techniken": [
          "aktives-zuhoeren",
          "grenzen-setzen"
        ],
        "schritte": [
          "Geh die Warnzeichen durch: Gewalt, Drohungen, Waffen, Symbole, Szene-Kontakte, Rückzug aus allen Außenkontakten, Minderjährige in der Szene.",
          "Beobachte Sprache: rigide Totalisierungen, Feindbilder gegen konkrete Gruppen, Loyalitätsbekundungen.",
          "Nutze den Kompass der App, um Einbindungstiefe und Risiko einzuordnen.",
          "Sprich mit einer Vertrauensperson darüber, ohne Namen der Person zu nennen, wenn das nicht nötig ist.",
          "Geh bei Hinweisen auf Gefahr direkt weiter zur Station Gefahrenlage."
        ],
        "formulierungen": [
          "Ich mache mir Sorgen, nicht wegen deiner Meinung, sondern wegen dem, was du über Gewalt sagst.",
          "Ich kann das nicht allein einschätzen. Ich hole mir Rat, ohne dich bloßzustellen.",
          "Wenn du mir sagst, dass du eine Waffe hast, muss ich das ernst nehmen."
        ],
        "fehler": [
          "Jede rechte Meinung als Gefahr lesen und die Person damit in die Szene treiben.",
          "Konkrete Gewalthinweise aus Loyalität verschweigen.",
          "Allein weiterwursteln, obwohl du überfordert bist."
        ],
        "signale_weiter": [
          "Du kannst benennen, welche Warnzeichen vorliegen und welche nicht.",
          "Du weißt, welche Anlaufstelle für deine Lage zuständig ist."
        ],
        "signale_stopp": [
          "Akute Gefahr für Leib und Leben: sofort Polizei 110.",
          "Suizidalität oder psychische Krise: Telefonseelsorge 0800 111 0 111, ärztlicher Notdienst."
        ],
        "dauer": "Tage",
        "weiter": [
          {
            "zu": "beratung",
            "wenn": "Warnzeichen liegen vor, aber keine akute Gefahr."
          },
          {
            "zu": "gefahr",
            "wenn": "Es gibt Gewalt, Waffen, Drohungen oder eine Kindeswohlgefährdung."
          },
          {
            "zu": "angehoerige",
            "wenn": "Es gibt keine akuten Warnzeichen, aber du bist überfordert."
          }
        ],
        "umsteigen": [
          {
            "linie": "gespraech",
            "station": "zuhoeren",
            "wenn": "Es gibt keine Warnzeichen, das Denken ist offen und das Gespräch lohnt sich."
          }
        ]
      },
      {
        "id": "beratung",
        "name": "Beratung finden",
        "pos": 1,
        "spur": 0,
        "ziel": "Du hast eine passende Beratungsstelle kontaktiert und einen ersten Termin.",
        "warum": "Deutschland hat eine dichte, aber zersplitterte Infrastruktur: Mobile Beratung in rund 50 Teams, Landes-Demokratiezentren in allen 16 Ländern, zivilgesellschaftliche und behördliche Ausstiegsberatung in fast allen Ländern. Eine zentrale Hotline mit Vermittlung an lokale Partner funktioniert; Zugang entsteht über Verankerung im Sozialraum, rein digitale Zugänge scheiterten. Seit dem Ende der anonymen Online-Beratung 2022 fehlt ein bundesweiter anonymer Online-Erstkontakt für Rechtsextremismus.",
        "evidenz": "mittel",
        "techniken": [
          "beduerfnisse-adressieren",
          "selbstfuersorge"
        ],
        "schritte": [
          "Starte mit dem KompRex-Infoportal der Amadeu Antonio Stiftung oder der Teamkarte des Bundesverbands Mobile Beratung, um Angebote in deinem Bundesland zu finden.",
          "Als Angehörige:r wende dich an die Fachstelle Rechtsextremismus und Familie (LidiceHaus, bundesweit) oder an die Angehörigenberatung deines Landes-Demokratiezentrums.",
          "Für Ausstiegswillige gibt es zivilgesellschaftlich EXIT-Deutschland, CROSSROADS beim Violence Prevention Network, JUMP (MV) und NinA NRW, behördlich WendePUNKT beim Bundesamt für Verfassungsschutz oder Landesprogramme wie Spurwechsel NRW, Aktion Neustart Niedersachsen, BIGE Bayern und (R)AUSwege Rheinland-Pfalz.",
          "Bei Verschwörungserzählungen wende dich an veritas Berlin oder an den Beratungskompass Verschwörungsdenken (Fortbestand prüfen).",
          "Ruf an, schildere die Lage kurz und frag, ob die Stelle zuständig ist oder weitervermittelt; das ist üblich und keine Zumutung.",
          "Beachte: Die BAMF-Beratungsstelle Radikalisierung ist auf Islamismus ausgerichtet und hier nicht die richtige Stelle."
        ],
        "formulierungen": [
          "Ich rufe an, weil mein Bruder in eine rechte Gruppe reinrutscht und ich nicht weiß, was ich tun soll. Sind Sie dafür zuständig?",
          "Ich möchte erst mal anonym bleiben. Geht das?",
          "Ich bin Lehrerin und habe einen Schüler, der Szene-Kontakte hat. Wer kann mich beraten?"
        ],
        "fehler": [
          "Aus Scham oder Angst vor Stigmatisierung gar nicht anrufen; Beratungsstellen arbeiten ausdrücklich ohne Schuldzuweisung.",
          "Die Person ohne ihr Wissen bei Sicherheitsbehörden melden, wenn keine Gefahr vorliegt; das zerstört Vertrauen.",
          "Erwarten, dass die Beratung die Person für dich umdreht."
        ],
        "signale_weiter": [
          "Du hast einen Termin oder eine klare Weitervermittlung.",
          "Du weißt, welche Rolle du selbst weiter spielst."
        ],
        "signale_stopp": [
          "Die Lage spitzt sich zu, bevor der Termin stattfindet; dann weiter zur Station Gefahrenlage.",
          "Die Stelle ist nicht zuständig und vermittelt nicht weiter; dann über das Landes-Demokratiezentrum neu ansetzen."
        ],
        "dauer": "1 bis 3 Wochen bis zum Ersttermin",
        "weiter": [
          {
            "zu": "angehoerige",
            "wenn": "Du bist Angehörige:r oder Fachkraft und begleitest die Person."
          },
          {
            "zu": "ausstieg",
            "wenn": "Die Person selbst will raus und sucht Begleitung."
          },
          {
            "zu": "gefahr",
            "wenn": "Die Lage wird akut."
          }
        ],
        "umsteigen": [
          {
            "linie": "gespraech",
            "station": "beziehung",
            "wenn": "Die Beratung empfiehlt, die Beziehung zu halten und Außenkontakt zu bleiben."
          }
        ]
      },
      {
        "id": "angehoerige",
        "name": "Angehörigenberatung",
        "pos": 2,
        "spur": 0,
        "ziel": "Du wirst selbst begleitet, entlastet und bekommst eine Strategie für deine Rolle als Außenkontakt.",
        "warum": "Angehörige, meist Mütter, waren die Hauptgruppe der Online-Beratung gegen Rechtsextremismus und mussten Scham, Schuldgefühle und Angst vor Stigmatisierung überwinden. Angehörigenberatungen wie die des Demokratiezentrums Rheinland-Pfalz oder ADA in Brandenburg arbeiten ausdrücklich ohne Schuldzuweisung. Elterlicher Einfluss greift nur bedingt, sobald die Gruppe Lebensmittelpunkt ist; deshalb geht es um deine Haltung, deine Grenzen und deine Entlastung.",
        "evidenz": "mittel",
        "techniken": [
          "selbstfuersorge",
          "grenzen-setzen",
          "motivational-interviewing"
        ],
        "schritte": [
          "Nimm die Beratung regelmäßig wahr, nicht nur in der Krise.",
          "Klär gemeinsam mit der Beratung: Was ist dein Ziel, was ist realistisch, wo sind deine Grenzen?",
          "Erarbeite Kontaktregeln, die du halten kannst, statt Verbote auszusprechen.",
          "Such eine Angehörigengruppe oder andere Betroffene zum Austausch.",
          "Achte auf deine Gesundheit: Schlaf, Pausen, eigene Freundschaften."
        ],
        "formulierungen": [
          "Ich bin nicht schuld, und ich kann es nicht allein lösen. Beides stimmt.",
          "Mein Ziel ist, dass die Tür offen bleibt. Nicht, dass morgen der Austritt kommt.",
          "Ich brauche Regeln für mich: Was ich aushalte, was nicht, und wann ich Pause mache."
        ],
        "fehler": [
          "Die Beratung abbrechen, sobald es kurz besser läuft.",
          "Kontaktabbruch als Strategie, um Druck zu machen; Isolation stärkt die Gruppe.",
          "Die eigene Erschöpfung ignorieren."
        ],
        "signale_weiter": [
          "Du fühlst dich entlastet und hast einen Plan.",
          "Die Beziehung zur Person ist stabiler, auch wenn die Haltung bleibt."
        ],
        "signale_stopp": [
          "Neue Warnzeichen bei der Person: Gewalt, Waffen, Straftaten.",
          "Deine Gesundheit leidet ernsthaft; dann eigene therapeutische Hilfe suchen."
        ],
        "dauer": "Monate, oft länger",
        "weiter": [
          {
            "zu": "ausstieg",
            "wenn": "Die Person signalisiert selbst, dass sie raus will."
          },
          {
            "zu": "stabilisieren",
            "wenn": "Die Person hat sich distanziert und braucht Halt von außen."
          },
          {
            "zu": "gefahr",
            "wenn": "Warnzeichen für Gefahr tauchen auf."
          }
        ],
        "umsteigen": [
          {
            "linie": "gespraech",
            "station": "dranbleiben",
            "wenn": "Die Beratung läuft und du nimmst deine Rolle als Außenkontakt wieder auf."
          },
          {
            "linie": "gespraech",
            "station": "pause",
            "wenn": "Du brauchst erst Abstand, bevor du wieder in Kontakt gehst."
          }
        ]
      },
      {
        "id": "ausstieg",
        "name": "Ausstieg begleiten",
        "pos": 3,
        "spur": 0,
        "ziel": "Die Person ist in einem Ausstiegs- oder Distanzierungsprogramm und du weißt, wie du ihren Weg unterstützt.",
        "warum": "Distanzierungsberatung wirkt über fünf Mechanismen: vertrauensvolle Beziehung mit transparent ausgehandelten Zielen, Arbeit an der eigenen Lebensgeschichte, kritisch-zugewandtes Irritieren von Feindbildern, autonome Begleitung der sozialen Loslösung mit Aufbau neuer Beziehungen, lebenspraktische Stabilisierung. Programme melden hohe Erfolgsquoten, aber fast nur Eigenzahlen ohne Kontrollgruppe; Begleitungen dauern drei bis fünf Jahre, Ausstieg gilt in der Szene als Verrat.",
        "evidenz": "mittel",
        "techniken": [
          "motivational-interviewing",
          "beduerfnisse-adressieren",
          "kontakt-begegnung"
        ],
        "schritte": [
          "Lass die Person selbst wählen: zivilgesellschaftliches Programm (EXIT, CROSSROADS, JUMP, NinA, Thüringer Beratungsdienst) oder behördliches (WendePUNKT, Landesprogramme); beides hat Vor- und Nachteile, etwa bei Sicherheit und Vertrauen.",
          "Dränge nicht auf Tempo; Ambivalenz gehört dazu, Rückschritte auch.",
          "Sei da als Außenkontakt: gemeinsame Zeit, neue Leute, praktische Hilfe bei Wohnung, Arbeit, Behörden.",
          "Rechne mit Druck und Drohungen aus der Szene und sprich mit der Beratung über Sicherheit.",
          "Halte dich selbst an die Rolle: Begleitung, nicht Therapie, nicht Kontrolle."
        ],
        "formulierungen": [
          "Du entscheidest, mit wem du arbeitest. Ich bin dabei, egal wie lange es dauert.",
          "Es ist okay, wenn du hin und her schwankst. Das gehört dazu.",
          "Was brauchst du gerade konkret: Fahrt zum Amt, Wohnung, jemanden zum Reden?"
        ],
        "fehler": [
          "Schnelle Distanzierung erwarten und bei jedem Rückschritt enttäuscht reagieren.",
          "Die Person zum Aussteiger-Vortrag drängen, bevor sie stabil ist.",
          "Sicherheit unterschätzen: Szene-Druck ist real."
        ],
        "signale_weiter": [
          "Die Person hält Termine mit der Beratung ein und meldet sich von sich aus.",
          "Die Person reduziert Szene-Kontakte, Musik und Symbole.",
          "Die Person baut Beziehungen außerhalb der Szene auf."
        ],
        "signale_stopp": [
          "Bedrohung durch die Szene; dann Sicherheit mit Beratung und Polizei klären.",
          "Die Person bricht die Beratung ab und zieht sich zurück."
        ],
        "dauer": "1 bis 5 Jahre",
        "weiter": [
          {
            "zu": "stabilisieren",
            "wenn": "Die Person hat sich sichtbar gelöst."
          },
          {
            "zu": "rueckfall",
            "wenn": "Die Person geht zurück in die Szene oder schwankt stark."
          },
          {
            "zu": "gefahr",
            "wenn": "Die Szene bedroht die Person."
          }
        ],
        "umsteigen": [
          {
            "linie": "gespraech",
            "station": "alternativen",
            "wenn": "Es geht jetzt um neue Rollen und Gemeinschaft im Alltag."
          }
        ]
      },
      {
        "id": "stabilisieren",
        "name": "Stabilisieren",
        "pos": 4,
        "spur": 0,
        "ziel": "Wohnung, Arbeit, Beziehungen und Alltag sind so stabil, dass die Szene nichts mehr zu bieten hat.",
        "warum": "Lebenspraktische Stabilisierung ist einer der fünf Wirkmechanismen der Distanzierungsberatung; im XENOS-Sonderprogramm war Arbeitsmarktintegration bei rund zwei Dritteln mit Abkehr verbunden. Pull-Faktoren für den Ausstieg sind Partnerschaft, Familie und Beziehungen außerhalb; Barrieren sind Verlust von Freundschaften, Stigma und drohende Isolation.",
        "evidenz": "mittel",
        "techniken": [
          "beduerfnisse-adressieren",
          "kontakt-begegnung",
          "soziale-normen"
        ],
        "schritte": [
          "Unterstütze praktisch: Bewerbungen, Behördengänge, Wohnungssuche, Schulden.",
          "Hilf beim Aufbau neuer Kreise: Verein, Arbeit, Nachbarschaft, ohne die Vergangenheit zur Schau zu stellen.",
          "Sprich über Stigma: Wer muss wissen, wer nicht?",
          "Achte auf psychische Belastungen und vermittle bei Bedarf therapeutische Hilfe.",
          "Feiere Alltägliches: erste Gehaltsabrechnung, Mietvertrag, ein Jahr ohne Szene."
        ],
        "formulierungen": [
          "Du musst niemandem deine Geschichte erzählen, wenn du nicht willst.",
          "Ein Jahr ohne die alten Leute. Das ist viel. Lass uns essen gehen.",
          "Wenn die Nächte schwer sind, gibt es Leute, die das kennen. Soll ich einen Termin mitsuchen?"
        ],
        "fehler": [
          "Die Person auf ihre Vergangenheit reduzieren.",
          "Alles für die Person erledigen, statt ihre Selbständigkeit zu stärken.",
          "Psychische Belastung übersehen."
        ],
        "signale_weiter": [
          "Stabile Arbeit oder Ausbildung, eigene Wohnung, feste Kontakte.",
          "Die Person plant Zukunft und spricht über Ziele."
        ],
        "signale_stopp": [
          "Jobverlust, Trennung oder Krise, die alte Kontakte wieder attraktiv machen.",
          "Rückzug, Alkohol, Schulden."
        ],
        "dauer": "1 bis 3 Jahre",
        "weiter": [
          {
            "zu": "neubeginn",
            "wenn": "Der Alltag trägt seit mindestens einem Jahr."
          },
          {
            "zu": "rueckfall",
            "wenn": "Eine Krise führt zu erneuter Annäherung an die Szene."
          }
        ],
        "umsteigen": [
          {
            "linie": "gespraech",
            "station": "dranbleiben",
            "wenn": "Die professionelle Begleitung endet und du bleibst als Bezugsperson."
          },
          {
            "linie": "nachbarschaft",
            "station": "verbuendete",
            "wenn": "Die Person will sich selbst im Ort engagieren."
          }
        ]
      },
      {
        "id": "neubeginn",
        "name": "Neubeginn",
        "pos": 5,
        "spur": 0,
        "ziel": "Die Person hat eine eigene Lebensperspektive und eine Geschichte über sich, die selbstkritisch und selbstwerterhaltend ist.",
        "warum": "Fallabschlusskriterien der Distanzierungsarbeit sind konkret: keine Szeneaktivitäten, keine rechte Musik, keine Symbole, stabile soziale Bezüge jenseits rechter Strukturen, neue Lebensperspektive, Selbständigkeit. Identitätsarbeit heißt, die eigene Biografie neu zu erzählen; Veränderungen sind graduell und nicht garantiert stabil, Rückfälle werden bundesweit nicht erfasst.",
        "evidenz": "mittel",
        "techniken": [
          "perspektivwechsel-erzaehlung",
          "selbstfuersorge"
        ],
        "schritte": [
          "Sprich mit der Person darüber, wie sie ihre Geschichte erzählt, ohne sie zu drängen.",
          "Lass offen, ob sie je öffentlich darüber sprechen will; Aussteiger-Vorträge sind kein Muss und ohne Einbettung wirkungslos.",
          "Halte die Beziehung normal; das Thema ist nicht mehr Nummer eins.",
          "Bleib aufmerksam für Krisen, aber ohne Kontrolle.",
          "Zieh für dich Bilanz: Was hast du gelernt, was gibst du weiter?"
        ],
        "formulierungen": [
          "Du bist nicht dein früheres Ich. Und du darfst erzählen, wie du da rausgekommen bist, oder auch nicht.",
          "Ich frage nicht mehr jede Woche nach. Ich bin einfach da.",
          "Wenn es mal wieder kippt, ruf an. Ohne Vorwurf."
        ],
        "fehler": [
          "Die Person als Vorzeige-Aussteiger:in vorführen.",
          "Das Thema für erledigt erklären und bei Krisen überrascht sein.",
          "Alte Kontakte verbieten, statt Alternativen zu stärken."
        ],
        "signale_weiter": [
          "Die Person erzählt ihre Geschichte in eigenen Worten mit Verantwortung und ohne Selbstzerstörung.",
          "Die Person hat Pläne, Beziehungen und einen Alltag unabhängig von dir."
        ],
        "signale_stopp": [
          "Erneute Annäherung an alte Kontakte in Krisen.",
          "Verherrlichung der alten Zeit."
        ],
        "dauer": "Offen",
        "weiter": [],
        "umsteigen": [
          {
            "linie": "gespraech",
            "station": "dranbleiben",
            "wenn": "Es bleibt eine normale Beziehung mit Aufmerksamkeit."
          },
          {
            "linie": "oeffentlichkeit",
            "station": "botschafter",
            "wenn": "Die Person will später eingebettet und freiwillig als Stimme wirken."
          }
        ]
      },
      {
        "id": "gefahr",
        "name": "Gefahrenlage",
        "pos": 2,
        "spur": 1,
        "ziel": "Bei Gewalt, Waffen, Drohungen oder Kindeswohlgefährdung sind Menschen geschützt und die richtigen Stellen informiert.",
        "warum": "Beratungsstellen nennen Gewalt, Drohungen, Waffen, Reichsbürger-Bezug, Kindeswohl, Straftaten und Suizidalität als klare Anlässe für professionelle und behördliche Hilfe. Die Opferberatung steht Betroffenen rechter Gewalt parteilich zur Seite, dieser Beistand ist ein belegter Wirkmechanismus; Bedrohung von Engagierten ist Alltag.",
        "evidenz": "mittel",
        "techniken": [
          "grenzen-setzen",
          "selbstfuersorge"
        ],
        "schritte": [
          "Bei akuter Gefahr Polizei 110 rufen, bei Suizidgefahr Rettungsdienst 112 oder Telefonseelsorge 0800 111 0 111.",
          "Bei Kindeswohlgefährdung: Jugendamt informieren; bei Gewalt gegen Kinder sofort.",
          "Betroffene rechter Gewalt oder Bedrohung: Opferberatung im Verband VBRG (19 Beratungsstellen, über 40 Anlaufstellen) kontaktieren; sie begleitet auch bei Anzeige.",
          "Drohungen dokumentieren: Datum, Wortlaut, Zeugen, Screenshots.",
          "Dich selbst schützen: Adresse, Wege, Erreichbarkeit mit der Beratung besprechen.",
          "Erst danach, mit Beratung, entscheiden, wie der Kontakt zur Person weitergeht."
        ],
        "formulierungen": [
          "Ich habe die Polizei gerufen, weil du gesagt hast, du tust ihm etwas an. Das meine ich ernst, und ich bleibe trotzdem deine Schwester.",
          "Ich rufe bei der Opferberatung an. Die kennen das und helfen mit der Anzeige.",
          "Deine Kinder sind sicher, das geht vor. Darüber reden wir, wenn das geklärt ist."
        ],
        "fehler": [
          "Drohungen kleinreden, weil man die Person kennt.",
          "Selbst eingreifen bei Waffen oder Gewalt.",
          "Betroffene zur Deeskalation verpflichten, statt sie zu schützen.",
          "Aus Loyalität schweigen, wenn Kinder betroffen sind."
        ],
        "signale_weiter": [
          "Betroffene sind in Sicherheit und begleitet.",
          "Behörden und Beratung sind informiert und ein Schutzplan steht."
        ],
        "signale_stopp": [
          "Die Gefahr besteht weiter: Kontakt nur noch mit Beratung und Polizei planen."
        ],
        "dauer": "Sofort, dann Wochen",
        "weiter": [
          {
            "zu": "beratung",
            "wenn": "Die akute Gefahr ist abgewendet und es braucht eine längerfristige Begleitung."
          },
          {
            "zu": "angehoerige",
            "wenn": "Du bist Angehörige:r und brauchst nach dem Vorfall selbst Begleitung."
          }
        ],
        "umsteigen": [
          {
            "linie": "gespraech",
            "station": "grenze",
            "wenn": "Die Gefahr ist geklärt und es geht wieder um Grenzen im Alltag."
          },
          {
            "linie": "nachbarschaft",
            "station": "konflikt",
            "wenn": "Die Bedrohung richtet sich gegen eine Initiative oder den Ort."
          }
        ]
      },
      {
        "id": "rueckfall",
        "name": "Rückfall",
        "pos": 3,
        "spur": -1,
        "ziel": "Ein Rückschritt wird als Teil des Weges behandelt, nicht als Ende, und die Begleitung geht weiter.",
        "warum": "Ausstiegsprozesse unterliegen in der Regel Schwankungen und verlaufen nur selten linear; Veränderungen sind graduell und nicht garantiert stabil. Programme nennen niedrige Rückfallquoten, aber als Eigenangaben ohne Prüfung. Rückschritte folgen oft auf Krisen wie Jobverlust, Trennung oder Bedrohung, und auf den Verlust von Außenkontakten.",
        "evidenz": "mittel",
        "techniken": [
          "motivational-interviewing",
          "aktives-zuhoeren",
          "selbstfuersorge"
        ],
        "schritte": [
          "Reagiere ohne Vorwurf und ohne Drama; frag, was passiert ist.",
          "Informiere die Beratung und besprich, wie es weitergeht.",
          "Such den Auslöser: Krise, Druck, Einsamkeit, Bedrohung.",
          "Halte die Beziehung und den Außenkontakt, auch wenn die Person sich abwendet.",
          "Achte auf dich: Rückfälle zehren auch an dir."
        ],
        "formulierungen": [
          "Du bist wieder mit denen unterwegs. Ich frage nicht, warum du so dumm bist. Ich frage, was los ist.",
          "Ein Rückschritt macht das letzte Jahr nicht ungültig.",
          "Ich melde mich nächste Woche wieder, egal was du heute sagst."
        ],
        "fehler": [
          "Enttäuschung in Vorwürfe verwandeln.",
          "Kontakt abbrechen als Konsequenz; das bestätigt die Szene.",
          "Den Rückfall vor der Beratung verheimlichen."
        ],
        "signale_weiter": [
          "Die Person bleibt erreichbar und spricht über den Auslöser.",
          "Die Person nimmt die Beratung wieder auf."
        ],
        "signale_stopp": [
          "Neue Warnzeichen: Gewalt, Waffen, Drohungen.",
          "Vollständiger Rückzug und Abbruch aller Außenkontakte."
        ],
        "dauer": "Wochen bis Monate",
        "weiter": [
          {
            "zu": "ausstieg",
            "wenn": "Die Person will erneut ansetzen."
          },
          {
            "zu": "beratung",
            "wenn": "Die bisherige Begleitung passt nicht mehr und eine neue Stelle ist nötig."
          },
          {
            "zu": "gefahr",
            "wenn": "Es besteht Gefahr für die Person oder für andere."
          }
        ],
        "umsteigen": [
          {
            "linie": "gespraech",
            "station": "beziehung",
            "wenn": "Jetzt zählt vor allem, dass der Kontakt nicht reißt."
          }
        ]
      }
    ]
  }
];
