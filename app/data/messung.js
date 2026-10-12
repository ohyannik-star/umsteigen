window.APP_DATA = window.APP_DATA || {};
window.APP_DATA.messung = {
  stufen: [
    {
      id: "verhaertung",
      name: "Verhärtung",
      beschreibung: "Die Person reagiert mit Reaktanz: Sie verteidigt, wertet den Boten ab und zieht sich zurück. Das kann in jeder Phase passieren, oft nach Faktenduellen, Beschämung oder Druck. Es ist kein Dauerzustand, aber ein klares Signal, das Vorgehen zu ändern.",
      signale: [
        "Gegenargumentieren, während du noch redest; Ärger richtet sich gegen dich, nicht gegen das Argument",
        "Deine Quellen werden abgewertet oder in die Erzählung eingebaut: Das zeigt nur, wie tief die stecken",
        "Rückzug aus dem Kontakt, Gesprächsabbruch, Nachrichten bleiben unbeantwortet",
        "Zunahme totalisierender Sprache: alle, immer, die da oben",
        "Wechsel von Diskussion zu Loyalitätsbekundung, oft öffentlich vor anderen"
      ],
      naechster_schritt: "Thema ruhen lassen, Beziehung pflegen, eigenes Vorgehen prüfen: Hast du belehrt, beschämt oder in der Gruppe diskutiert? Zurück zum Zuhören. Bei Rückzug plus Gefahrensignalen Beratung einbeziehen."
    },
    {
      id: "geschlossen",
      name: "Geschlossen",
      beschreibung: "Die Person sieht keinen Grund, etwas zu hinterfragen. Die Erzählung ist stimmig, die Gruppe bestätigt sie, Gegeninformationen prallen ab. Das entspricht der Absichtslosigkeit im Transtheoretischen Modell, das hier nur als Beobachtungsheuristik dient, nicht als Messinstrument.",
      signale: [
        "Rigide, totalisierende Aussagen ohne Einschränkung",
        "Keine eigenen Fragen, keine Neugier auf andere Sichtweisen",
        "Quellen ausschließlich aus der Szene oder aus einem Kanal",
        "Deine Sicht wird nicht wiedergegeben, sondern sofort abgewertet",
        "Beziehung ist auf das Thema geschrumpft oder wird vermieden"
      ],
      naechster_schritt: "Nicht überzeugen wollen. Beziehung sichern, Zeit ohne das Thema, zuhören und das Bedürfnis hinter der Haltung verstehen. Eigene Haltung einmal klar benennen, dann nicht wiederholen."
    },
    {
      id: "ambivalent",
      name: "Ambivalent",
      beschreibung: "Die Person spürt Widersprüche, hält aber an der Haltung fest. Ambivalenz macht empfänglicher für Einfluss, ist aber unangenehm; manche weichen Gegeninformation gerade jetzt aus, um den Konflikt nicht zu vergrößern. Das ist die wichtigste Phase für Geduld.",
      signale: [
        "Sätze mit ja, aber; Zugeständnisse in Nebensätzen",
        "Die Person lässt unbequeme Fragen zu, ohne das Gespräch abzubrechen",
        "Erste Differenzierungen: manche, nicht alle, kommt darauf an",
        "Persönliche Kosten werden angesprochen: Streit mit Familie, verlorene Freund:innen",
        "Nachfragen zu deiner Erfahrung oder zur Geschichte einer betroffenen Person"
      ],
      naechster_schritt: "Ambivalenz aushalten und erkunden, nicht auflösen: Was gibt dir die Haltung, was kostet sie dich? Geschichten statt Argumente, keine Schlussfolgerung erzwingen. Ambivalenz-Items als Zwischenmaß nutzen."
    },
    {
      id: "oeffnung",
      name: "Öffnung",
      beschreibung: "Die Person prüft aktiv andere Sichtweisen und Quellen. Die Sprache wird komplexer, andere Perspektiven werden korrekt wiedergegeben, ohne abgewertet zu werden. Das entspricht Absichtsbildung und Vorbereitung; Rückschläge sind normal und kein Scheitern.",
      signale: [
        "Die Person fragt von sich aus nach anderen Quellen oder Einschätzungen",
        "Sie gibt die Sicht anderer in eigenen Worten korrekt wieder",
        "Differenzierungen überwiegen Totalisierungen",
        "Sie benennt eigene Zweifel oder Vorbehalte gegenüber der Gruppe oder Partei",
        "Sie nimmt Einladungen außerhalb der Szene an, auch zögerlich"
      ],
      naechster_schritt: "Konkrete Alternativen anbieten, die das Bedürfnis bedienen: Menschen, Aktivitäten, Anerkennung außerhalb. Keine Siegesfeier, kein Ich hab es dir doch gesagt. Bei Szeneeinbindung jetzt Ausstiegsberatung ins Spiel bringen."
    },
    {
      id: "distanzierung",
      name: "Distanzierung",
      beschreibung: "Die Person verändert Verhalten: weniger Szenekonsum, weniger Kontakt zur Gruppe, neue Bezüge. Verhaltensindikatoren sind hier aussagekräftiger als Einstellungsaussagen, weil Selbstberichte sozialer Erwünschtheit unterliegen. Ausstiegsprozesse schwanken und verlaufen selten linear.",
      signale: [
        "Weniger Teilnahme an Szeneaktivitäten, Chats, Veranstaltungen",
        "Weniger Konsum von Szene-Inhalten, Musik, Kanälen",
        "Neue oder wiederbelebte Kontakte außerhalb: Verein, Arbeit, alte Freund:innen, Partnerschaft",
        "Eigeninitiative beim Kontakt mit dir, eingehaltene Termine, Offenlegen Persönlichem",
        "Symbole und Kleidung der Szene verschwinden allmählich"
      ],
      naechster_schritt: "Stabilisieren statt beschleunigen: Alltag, Arbeit, Wohnen, Freundeskreis. Rückfälle erwartbar machen und besprechbar halten. Bei Bedrohung durch die Gruppe oder bei Straftaten in der Vergangenheit professionelle Begleitung sichern."
    },
    {
      id: "stabil",
      name: "Stabil",
      beschreibung: "Die Person lebt dauerhaft außerhalb der Szene und hat eine eigene Perspektive. Die Kriterien stammen aus den DJI-Fallabschlusskriterien der Distanzierungsarbeit. Stabil heißt nicht fertig: Die Bundesregierung nennt jede Erfolgseinschätzung eine Momentaufnahme, und Begleitungen dauern oft Jahre.",
      signale: [
        "Keine Teilnahme an Szeneaktivitäten, keine rechte Musik, keine Symbole im Erscheinungsbild",
        "Stabile soziale Bezüge jenseits rechter Strukturen",
        "Neue Lebensperspektive: Ausbildung, Arbeit, Beziehung, Wohnung",
        "Selbständigkeit im Alltag, eigene Entscheidungen ohne die Gruppe",
        "Die Person spricht über die Zeit in der Szene reflektiert, ohne Verklärung und ohne Selbstabwertung"
      ],
      naechster_schritt: "Beziehung normal weiterführen, nicht als Projekt. Erreichbar bleiben für Krisen. Nach 3 und 12 Monaten ehrlich prüfen, ob die Signale noch gelten; Rückfälle sind kein Verrat, sondern Anlass für einen neuen Anlauf."
    }
  ],
  instrumente: [
    {
      id: "thermometer",
      name: "Gefühlsthermometer",
      wofuer: "Affektive Polarisierung: Wie warm oder kalt fühlt die Person gegenüber Gruppen, Parteien oder dir. Bestvalidierte Kurzmessung, misst Gefühle, nicht Demokratiehaltung.",
      items: [
        "Wie fühlst du gegenüber Geflüchteten, die hier leben? 0 ist sehr kalt, 100 sehr warm.",
        "Wie fühlst du gegenüber Menschen, die die Partei X wählen?",
        "Wie fühlst du gegenüber Menschen, die ganz anders wählen als du?",
        "Wie fühlst du gegenüber Politiker:innen im Gemeinderat?"
      ],
      skala: "0–100",
      auswertung: "Vorher und nach 4 Wochen sowie nach 3 Monaten erheben. Veränderungen unter 5 Punkten sind Rauschen. Vorsicht: anfällig für Antwortstil und Erhebungsmodus; deshalb nur in Kombination mit Verhaltenssignalen deuten. Die GLES-Variante nutzt ein Skalometer von -5 bis +5.",
      quelle: { titel: "Gidron, Sheffer & Mor (2022): Validating the feeling thermometer as a measure of partisan affect", url: "https://cris.huji.ac.il/en/publications/validating-the-feeling-thermometer-as-a-measure-of-partisan-affec/", jahr: "2022" }
    },
    {
      id: "ambivalenz",
      name: "Ambivalenz-Kurzskala",
      wofuer: "Zwischenziel: Spürt die Person Widersprüche in ihrer Haltung? Ambivalenz ist die Phase, in der Gespräche am ehesten wirken.",
      items: [
        "Beim Thema Migration fühle ich mich hin- und hergerissen.",
        "Ich habe zu dieser Partei sowohl positive als auch negative Gefühle.",
        "Meine Meinung zu diesem Thema ist in sich widersprüchlich."
      ],
      skala: "1–7",
      auswertung: "Mittelwert der drei Items. Werte unter 2 deuten auf eine geschlossene Haltung, Werte ab 4 auf Ambivalenz. Ein Anstieg über die Zeit ist ein positives Signal, auch wenn sich die Position selbst nicht bewegt. Nur per Selbstauskunft erhebbar, also nur, wenn die Person freiwillig mitmacht.",
      quelle: { titel: "Priester & Petty (1996): The gradual threshold model of ambivalence, zitiert nach Messung-Bericht", url: "", jahr: "1996" }
    },
    {
      id: "beziehung",
      name: "Beziehungs-Check",
      wofuer: "Beziehungsqualität als Voraussetzung aller weiteren Wirkung. Die Arbeitsbeziehung sagt in der Psychotherapieforschung das Ergebnis robust voraus; die Übertragung auf Ausstiegsarbeit ist plausibel, aber nicht geprüft. Wird von dir ausgefüllt, nicht von der Person.",
      items: [
        "Die Person ist für mich erreichbar und antwortet auf Nachrichten.",
        "Vereinbarte Treffen finden statt.",
        "Die Person meldet sich von sich aus bei mir.",
        "Die Person erzählt mir Persönliches, das nichts mit Politik zu tun hat.",
        "Die Person lässt unbequeme Fragen von mir zu, ohne abzubrechen."
      ],
      skala: "1–5",
      auswertung: "Alle vier Wochen für dich selbst ausfüllen. Summe unter 12: Beziehung zuerst, Thema ruhen lassen. Summe ab 18: tragfähig genug für Fragen, die Zweifel zulassen. Sinkende Werte sind ein Frühwarnsignal, lange bevor sich Inhalte verhärten.",
      quelle: { titel: "Flückiger et al. (2018): The Alliance in Adult Psychotherapy: A Meta-Analytic Synthesis; Figlestahler & Schau (2024): Was wirkt wie und warum?, DJI", url: "https://vielfalt-mediathek.de/wp-content/uploads/2024/05/Rechtsextremismus_Was-wirkt-wie-und-warum.pdf", jahr: "2024" }
    },
    {
      id: "sprache",
      name: "Sprach-Strichliste",
      wofuer: "Laienversion der integrativen Komplexität: Verhältnis von Totalisierungen zu Differenzierungen im Gespräch. Wurde in Präventionskursen als Vorher-Nachher-Maß genutzt, ohne Kontrollgruppe.",
      items: [
        "Totalisierung: alle, immer, nie, die da oben, die Ausländer, das System",
        "Differenzierung: manche, kommt darauf an, in dem Fall, ich weiß nicht genau, einerseits andererseits",
        "Perspektivwiedergabe: Die Person gibt eine andere Sicht korrekt wieder, ohne sie abzuwerten"
      ],
      skala: "Strichliste pro Gespräch",
      auswertung: "Nach dem Gespräch aus dem Gedächtnis zählen, nicht währenddessen. Berechne Differenzierungen geteilt durch Totalisierungen. Ein Verhältnis, das über Wochen steigt, zeigt Öffnung; ein fallendes Verhältnis zeigt Verhärtung. Keine Aufnahmen, keine schriftlichen Protokolle mit Namen; DSGVO und Vertrauen gehen vor.",
      quelle: { titel: "Liht & Savage (2013): Preventing Violent Extremism through Value Complexity, Journal of Strategic Security", url: "https://digitalcommons.usf.edu/jss/vol6/iss4/3", jahr: "2013" }
    },
    {
      id: "ksa-3",
      name: "Kurzskala Autoritarismus (KSA-3)",
      wofuer: "Validierte 9-Item-Skala der GESIS mit drei Subskalen: autoritäre Aggression, Unterwürfigkeit, Konventionalismus. Für Projekte und Evaluationen mit Einwilligung, nicht für das Küchentischgespräch.",
      items: [
        "Beispielitem Aggression: Gegen Außenseiter und Nichtstuer sollte in der Gesellschaft mit aller Härte vorgegangen werden.",
        "Die vollständigen 9 Items sind frei bei GESIS ZIS verfügbar und dürfen nicht verändert werden."
      ],
      skala: "1–5",
      auswertung: "Mittelwerte je Subskala. Reliabilität: Aggression omega 0,86, Unterwürfigkeit 0,74, Konventionalismus 0,78. Dauer unter einer Minute. Für Vorher-Nachher-Vergleiche in Gruppen geeignet; bei Einzelpersonen mit extremen Ausgangswerten droht Regression zur Mitte, deshalb Vergleichs- oder Wartegruppe einplanen. Als Ergänzung bietet sich die Populismus-Kurzskala (Reinecke et al. 2023, 13 Items) an.",
      quelle: { titel: "Beierlein et al. (2014): Die Kurzskala Autoritarismus (KSA-3), GESIS Working Paper 2014/35", url: "https://zis.gesis.org/skala/openScale/358", jahr: "2014" }
    }
  ],
  kampagne: [
    {
      id: "zielgruppenanteil",
      name: "Zielgruppenanteil an der Reichweite",
      wie: "Anteil der erreichten Personen, die zur definierten Zielgruppe gehören (etwa Unentschlossene, Enttäuschte, bestimmte Orte), geschätzt über Plattformdaten, Postleitzahl oder Teilnehmerbefragung.",
      warum: "Gesamtreichweite sagt nichts; wer nur die eigene Blase erreicht, hat nichts bewegt.",
      fallstrick: "Plattform-Zielgruppenschätzungen sind grob; Likes von Gleichgesinnten täuschen Erfolg vor."
    },
    {
      id: "completion",
      name: "Verweildauer und Completion Rate",
      wie: "Anteil der Personen, die ein Video zu Ende sehen, einen Text zu Ende lesen oder eine Veranstaltung bis zum Schluss bleiben.",
      warum: "Nur aufgenommene Inhalte können wirken; ein abgebrochener Prebunking-Clip inokuliert nicht.",
      fallstrick: "Hohe Completion bei kurzen, lauten Inhalten heißt nicht, dass sie verstanden wurden."
    },
    {
      id: "sentiment",
      name: "Anteil konstruktiver Reaktionen",
      wie: "Stichprobe der Kommentare und Rückmeldungen nach einem einfachen Schema codieren: konstruktiv, neutral, feindselig. Zwei Personen codieren unabhängig.",
      warum: "Zeigt, ob Inhalte Gespräch oder Abwehr auslösen; Reaktionsraten allein sagen laut Langer et al. nichts über Wirkung.",
      fallstrick: "Organisierte Trollwellen verzerren; Zeitfenster und Herkunft der Kommentare notieren."
    },
    {
      id: "handlungsrate",
      name: "Handlungsrate",
      wie: "Zahl konkreter Handlungen pro 1.000 erreichte Personen: Gesprächsanfragen, Anrufe bei Beratungsstellen, Anmeldungen, Veranstaltungsbesuche, Haustür-Rückmeldungen.",
      warum: "Verhalten ist härter als Einstellung und weniger anfällig für soziale Erwünschtheit.",
      fallstrick: "Handlungen der ohnehin Engagierten mitzählen; nach Zielgruppe trennen."
    },
    {
      id: "einstellungs-lift",
      name: "Einstellungs-Lift",
      wie: "Thermometer oder Kurzskala bei exponierten und nicht exponierten Personen vergleichen, Split nach Ort oder Zeit, Nachbefragung als scheinbar unabhängige Umfrage.",
      warum: "Der einzige Weg, Wirkung von Reichweite zu trennen; so haben die Canvassing-Studien gemessen.",
      fallstrick: "Ohne Vergleichsgruppe misst du Regression zur Mitte und Zeittrends, nicht deine Kampagne."
    },
    {
      id: "nachhaltigkeit",
      name: "Nachhaltigkeit",
      wie: "Dieselbe Messung 4 bis 12 Wochen nach Kampagnenende wiederholen.",
      warum: "Effekte halbieren sich im Schnitt nach zehn Tagen; die Megastudie fand nach zwei Wochen weitgehend verpuffte Effekte. Nur was bleibt, zählt.",
      fallstrick: "Direkt nach der Maßnahme messen und das Ergebnis als Wirkung verkaufen."
    },
    {
      id: "schaden",
      name: "Schadensindikator",
      wie: "Anteil feindseliger Reaktionen, Shitstorm-Volumen, Kontaktabbrüche, Beschwerden und Anzeichen von Reaktanz systematisch erfassen.",
      warum: "In der Megastudie senkten einzelne Interventionen Feindseligkeit und erhöhten zugleich antidemokratische Haltungen. Ohne Schadensmaß siehst du das nicht.",
      fallstrick: "Schaden als Erfolg deuten: Viel Gegenwind heißt nicht, dass man getroffen hat."
    },
    {
      id: "dialogfolge",
      name: "Dialogfolge",
      wie: "Zahl der Zweit- und Drittkontakte, die aus einem Erstkontakt entstehen: Folgegespräche, Einladungen, Weiterempfehlungen, neue Mitwirkende.",
      warum: "Dauerhafte Wirkung entsteht über Beziehung und Wiederholung, nicht über Einmalkontakte.",
      fallstrick: "Kontakte zählen, ohne zu erfassen, ob sie aus der Zielgruppe kommen."
    }
  ],
  zeithorizont: "Rechne in Monaten und Jahren, nicht in Gesprächen. Einzelgespräche mit Erzählungsaustausch erzeugen kleine Effekte, die mindestens drei bis vier Monate halten; kurze Einmalmaßnahmen erzeugen größere Effekte, die nach zwei Wochen weitgehend verpufft sind. Eine Messung direkt nach dem Gespräch überschätzt deshalb; realistisch sind Nachbefragungen nach vier Wochen und drei Monaten. Ausstiegsprozesse dauern Jahre: EXIT-Deutschland begleitete 60 Prozent der Fälle ein bis eineinhalb Jahre, 30 Prozent drei bis fünf Jahre, 10 Prozent länger. Rückfälle sind normal, werden bundesweit nicht erfasst und sind kein Beweis für Scheitern, sondern Anlass für den nächsten Anlauf."
};
