window.APP_DATA = window.APP_DATA || {};
window.APP_DATA.kompass = {
  "hinweis": "Der Kompass ist keine Diagnose und kein Urteil über die Person. Er sortiert nur, was du beobachtest: Themen, Verhalten, Beziehung. Daraus entsteht ein Vorschlag, wo du im Fahrplan einsteigst. Hinter jeder Haltung stehen legitime Bedürfnisse, und die Person bleibt ein Mensch mit eigenen Gründen, kein Fall. Trage keine Namen ein und notiere nichts, was du der Person nicht selbst zeigen würdest.",
  "fragen": [
    {
      "id": "th1",
      "bereich": "themen",
      "typ": "single",
      "text": "Wie oft kommt die Person im Gespräch auf Politik, ganz gleich, mit wem sie redet?",
      "warum": "Landet fast jedes Thema bei Politik, ist die Haltung Teil der Identität; dann trägt die Beziehung, nicht das Argument. Bleibt Politik ein Thema unter vielen, ist der Alltag der leichtere Einstieg (Spissinger, Praxis der Angehörigenberatung).",
      "optionen": [
        {
          "id": "th1a",
          "text": "Fast immer: Beinahe jedes Gespräch landet bei Politik, auch beim Essen oder im Urlaub",
          "gewichte": {
            "identitaet-heimat": 1,
            "protest-wut": 1
          },
          "skalen": {
            "belastung": 2,
            "offenheit": 1
          },
          "hinweis": "Politik ist für die Person ein Dauerthema. Vereinbart politikfreie Zeiten und Orte, damit die Beziehung nicht nur aus Streit besteht; das schützt auch dich."
        },
        {
          "id": "th1b",
          "text": "Oft, aber die Person lässt es, wenn man sie darum bittet",
          "gewichte": {},
          "skalen": {
            "offenheit": 2
          }
        },
        {
          "id": "th1c",
          "text": "Nur, wenn es einen aktuellen Anlass gibt",
          "gewichte": {},
          "skalen": {
            "offenheit": 2
          },
          "hinweis": "Politik ist für die Person ein Anlass, kein Lebensinhalt. Du kannst über den konkreten Anlass sprechen, ohne die ganze Haltung zu verhandeln."
        },
        {
          "id": "th1d",
          "text": "Selten: Die Person redet lieber über anderes und teilt politische Inhalte eher still",
          "gewichte": {
            "zugehoerigkeit": 1
          },
          "skalen": {
            "offenheit": 1
          },
          "hinweis": "Die Person trägt ihre Haltung eher still. Sprich geteilte Inhalte ruhig und unter vier Augen an; dein Schweigen würde als Zustimmung gelesen."
        },
        {
          "id": "th1e",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "th2",
      "bereich": "themen",
      "typ": "multi",
      "text": "Wenn die Person von sich aus auf Politik kommt: Womit fängt sie meistens an?",
      "warum": "Das Einstiegsthema zeigt, welches Bedürfnis vorne liegt. Sorge um Zuwanderung erklärt den Großteil der AfD-Sympathie (Schröder et al. 2026); Preise, Medien oder „die da oben“ verweisen auf andere Treiber und damit auf andere Zugänge.",
      "optionen": [
        {
          "id": "th2a",
          "text": "Zuwanderung, Grenzen, Kriminalität",
          "gewichte": {
            "kontrolle-angst": 2,
            "identitaet-heimat": 1
          }
        },
        {
          "id": "th2b",
          "text": "Preise, Rente, Löhne, Wohnen, Energie",
          "gewichte": {
            "gerechtigkeit-abgehaengt": 2
          }
        },
        {
          "id": "th2c",
          "text": "Politiker:innen, die abkassieren und das Volk betrügen",
          "gewichte": {
            "protest-wut": 2,
            "misstrauen": 1
          }
        },
        {
          "id": "th2d",
          "text": "Medien, die lügen oder Wichtiges verschweigen",
          "gewichte": {
            "misstrauen": 2
          },
          "skalen": {
            "verschwoerung": 1
          }
        },
        {
          "id": "th2e",
          "text": "Dass man seine Meinung nicht mehr sagen darf",
          "gewichte": {
            "anerkennung": 2,
            "protest-wut": 1
          }
        },
        {
          "id": "th2f",
          "text": "Heimat, Tradition, Familie, „unsere Kultur“, Gender",
          "gewichte": {
            "identitaet-heimat": 2
          }
        },
        {
          "id": "th2g",
          "text": "Corona, Klima oder Krieg als Lüge oder Bevormundung",
          "gewichte": {
            "misstrauen": 1,
            "kontrolle-angst": 1
          },
          "skalen": {
            "verschwoerung": 2
          }
        }
      ]
    },
    {
      "id": "th3",
      "bereich": "themen",
      "typ": "single",
      "text": "Redet die Person über eigene Erlebnisse oder über Zustände, die sie nur aus Nachrichten kennt?",
      "warum": "Politisch wirksam ist meist die Wahrnehmung der Lage Deutschlands, nicht die eigene (Teney 2026). Wer aus Nachrichten spricht, ist über Diskurse aktiviert (Ziller 2025); wer aus Erlebnissen spricht, braucht erst Anerkennung des Erlebten.",
      "optionen": [
        {
          "id": "th3a",
          "text": "Fast nur über Erlebnisse: Arbeit, Nachbarschaft, Amt, Bus, Arztpraxis",
          "gewichte": {
            "gerechtigkeit-abgehaengt": 2,
            "anerkennung": 1
          },
          "hinweis": "Die Erlebnisse der Person sind echt. Nimm die Erlebnisse ernst und frag nach Einzelheiten, bevor du über die Schlüsse sprichst, die die Person daraus zieht."
        },
        {
          "id": "th3b",
          "text": "Fast nur über Zustände aus Nachrichten und Kanälen, die die Person selbst nicht erlebt hat",
          "gewichte": {
            "misstrauen": 1,
            "kontrolle-angst": 1
          },
          "hinweis": "Die Sorge ist medial gespeist. Frag, was die Person selbst vor Ort erlebt hat; die Lücke zwischen Medienbild und Alltag ist ein guter Gesprächsanfang."
        },
        {
          "id": "th3c",
          "text": "Beides, und die Person verknüpft es: „Bei uns ist das auch schon so“",
          "gewichte": {
            "identitaet-heimat": 1,
            "kontrolle-angst": 1
          }
        },
        {
          "id": "th3d",
          "text": "Vor allem Geschichten anderer, die die Person weitererzählt („der Kollege kennt einen, der…“)",
          "gewichte": {
            "zugehoerigkeit": 1,
            "misstrauen": 1
          }
        },
        {
          "id": "th3e",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "th4",
      "bereich": "themen",
      "typ": "single",
      "text": "Wie spricht die Person über Gruppen: pauschal („alle“, „immer“, „die“) oder unterscheidend?",
      "warum": "Das Verhältnis von Totalisierungen zu Differenzierungen ist ein beobachtbares Maß für Offenheit; weniger rigide Ablehnung macht Distanzierung möglich (DJI 2021, Liht/Savage 2013). Danach richtet sich, ob du schon fragen darfst oder erst zuhören musst.",
      "optionen": [
        {
          "id": "th4a",
          "text": "Fast immer pauschal, ohne Ausnahmen",
          "gewichte": {
            "kontrolle-angst": 1,
            "identitaet-heimat": 1
          },
          "skalen": {
            "offenheit": 0
          },
          "hinweis": "Pauschalurteile sind verfestigt. Frag nach dem konkreten Fall („Wer genau?“), ohne zu belehren; liefere keine Gegenbeispiele, sondern lass die Person selbst Ausnahmen benennen."
        },
        {
          "id": "th4b",
          "text": "Pauschal, aber mit Ausnahmen für Menschen, die die Person kennt",
          "gewichte": {
            "identitaet-heimat": 1
          },
          "skalen": {
            "offenheit": 1
          },
          "hinweis": "Diese Ausnahmen sind der Hebel. Sprich über diese Menschen und deren Geschichten, nicht über Gruppen; das verschiebt Einstellungen nachweislich (Kalla/Broockman)."
        },
        {
          "id": "th4c",
          "text": "Es schwankt: Je aufgeregter, desto pauschaler",
          "gewichte": {
            "protest-wut": 1
          },
          "skalen": {
            "offenheit": 2
          }
        },
        {
          "id": "th4d",
          "text": "Meist unterscheidend („manche“, „kommt drauf an“)",
          "gewichte": {},
          "skalen": {
            "offenheit": 3
          },
          "hinweis": "Die Person differenziert bereits. Du kannst früh zu Fragen übergehen, die Zweifel zulassen: „Gab es etwas, das dich an dieser Erklärung hat zweifeln lassen?“"
        },
        {
          "id": "th4e",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "th5",
      "bereich": "themen",
      "typ": "single",
      "text": "Wie klingt es, wenn die Person über Menschen spricht, die sie ablehnt?",
      "warum": "Der Ton unterscheidet Enttäuschung von Entmenschlichung. Spott ist oft Schutz vor eigener Verletzung; Ungeziefer-Vergleiche oder Schadenswünsche markieren eine Grenze, die du benennen musst (MBR 2025, Praxiskonsens).",
      "optionen": [
        {
          "id": "th5a",
          "text": "Enttäuscht oder bitter, eher über Zustände als über Personen",
          "gewichte": {
            "gerechtigkeit-abgehaengt": 2,
            "protest-wut": 1
          },
          "skalen": {
            "offenheit": 2
          }
        },
        {
          "id": "th5b",
          "text": "Spöttisch, verächtlich, von oben herab",
          "gewichte": {
            "protest-wut": 1,
            "misstrauen": 1
          },
          "skalen": {
            "offenheit": 1
          },
          "hinweis": "Verachtung ist oft Schutz vor eigener Verletzung. Nicht kontern, sondern nach dem Erlebnis dahinter fragen: Was hat dich so enttäuscht?"
        },
        {
          "id": "th5c",
          "text": "Als Gruppe, die „uns“ schadet oder bedroht",
          "gewichte": {
            "kontrolle-angst": 2,
            "identitaet-heimat": 1
          },
          "skalen": {
            "offenheit": 1
          }
        },
        {
          "id": "th5d",
          "text": "Abwertend bis entmenschlichend (Tiere, Ungeziefer, „Abschaum“)",
          "gewichte": {
            "kontrolle-angst": 1,
            "protest-wut": 1
          },
          "skalen": {
            "offenheit": 0,
            "belastung": 2
          },
          "hinweis": "Hier gilt eine Grenze: Sag ruhig, dass du so nicht weiterredest, ohne die Beziehung zu kündigen („Darüber nicht, über alles andere gern“). Setze nur Grenzen, die du einhältst."
        },
        {
          "id": "th5e",
          "text": "Feindselig: Die Person wünscht diesen Menschen offen Schaden oder findet es richtig, wenn sie angegriffen werden",
          "gewichte": {
            "protest-wut": 2
          },
          "skalen": {
            "offenheit": 0,
            "belastung": 3
          },
          "hinweis": "Schadenswünsche sind ein Warnzeichen. Beurteile das nicht allein: Mobile Beratung oder die Fachstelle Rechtsextremismus und Familie helfen bei der Einschätzung."
        },
        {
          "id": "th5f",
          "text": "Unterschiedlich, je nach Tagesform und Gegenüber",
          "gewichte": {},
          "skalen": {
            "offenheit": 2
          }
        },
        {
          "id": "th5g",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "th6",
      "bereich": "themen",
      "typ": "single",
      "text": "Benutzt die Person Ironie, Memes oder Codes, bei denen unklar bleibt, ob sie es ernst meint?",
      "warum": "Ironie und Codes („war nur Spaß“) senken die Hemmschwelle und machen Widerspruch lächerlich; Szenecodes zeigen Nähe zu Milieus über die Partei hinaus (MBR 2025, Pfeiffer 2024). Darauf reagiert man mit ruhigem Nachfragen, nicht mit Empörung.",
      "optionen": [
        {
          "id": "th6a",
          "text": "Nein, die Person sagt direkt, was sie meint",
          "gewichte": {},
          "skalen": {
            "offenheit": 2
          }
        },
        {
          "id": "th6b",
          "text": "Ja, Witze und Memes über Minderheiten oder Politiker:innen, „war nur Spaß“",
          "gewichte": {
            "protest-wut": 1,
            "zugehoerigkeit": 1
          },
          "hinweis": "Frag ruhig und ernst nach: „Wie meinst du das?“ Das nimmt dem Witz die Deckung, ohne dass du als humorlos dastehst."
        },
        {
          "id": "th6c",
          "text": "Ja, Begriffe oder Zahlencodes, die ich erst nachschlagen musste",
          "gewichte": {
            "zugehoerigkeit": 2,
            "identitaet-heimat": 1
          },
          "hinweis": "Szenecodes zeigen, dass sich die Person in Milieus bewegt, die über die Partei hinausgehen. Lass dir bei einer Mobilen Beratung erklären, was die Codes bedeuten, bevor du das Thema ansprichst."
        },
        {
          "id": "th6d",
          "text": "Ja, Ironie als Schutz: Die Person vertritt etwas und nimmt es zugleich zurück",
          "gewichte": {
            "anerkennung": 1,
            "misstrauen": 1
          },
          "skalen": {
            "offenheit": 1
          }
        },
        {
          "id": "th6e",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "th7",
      "bereich": "themen",
      "typ": "single",
      "text": "Wie reagiert die Person, wenn jemand sie oder die Partei als „rechts“ oder „Nazi“ bezeichnet?",
      "warum": "Etiketten treffen das Bedürfnis nach Anerkennung und schaden dem Absender (Dusso/Perkins 2023); das Nazi-Label trifft nur eine Minderheit der Wählerschaft (Teney 2026). Ob die Person das Etikett abwehrt, umdeutet oder annimmt, bestimmt, wie du Haltung zeigst.",
      "optionen": [
        {
          "id": "th7a",
          "text": "Gekränkt oder empört: „Ich bin doch kein Nazi!“",
          "gewichte": {
            "anerkennung": 3
          },
          "skalen": {
            "offenheit": 2
          },
          "hinweis": "Die Person lehnt das Etikett ab, teilt also einen Teil deiner Werte. Benenne konkrete Aussagen, statt Personen zu etikettieren: „Dieser Satz ist rassistisch“, nicht „Du bist…“."
        },
        {
          "id": "th7b",
          "text": "Trotzig: „Dann bin ich eben rechts, das ist heute normal“",
          "gewichte": {
            "protest-wut": 2,
            "identitaet-heimat": 1
          },
          "skalen": {
            "offenheit": 1
          },
          "hinweis": "Das Etikett ist für die Person zur Identität geworden; Streit darüber bestätigt sie nur. Rede über Inhalte und konkrete Menschen, nicht über Zuschreibungen."
        },
        {
          "id": "th7c",
          "text": "Umdeutend: „Rechts ist, was früher Mitte war“, Vorwürfe prallen ab",
          "gewichte": {
            "misstrauen": 1,
            "anerkennung": 1
          },
          "skalen": {
            "offenheit": 1
          }
        },
        {
          "id": "th7d",
          "text": "Stolz: Die Person nimmt es an und nutzt es als Selbstbezeichnung",
          "gewichte": {
            "identitaet-heimat": 2,
            "zugehoerigkeit": 1
          },
          "skalen": {
            "offenheit": 0
          },
          "hinweis": "Hier ist das Weltbild Teil des Selbstbildes. Private Gespräche ändern daran selten etwas; halte Beziehung und rote Linien und sprich mit einer Fachberatung über deine Rolle."
        },
        {
          "id": "th7e",
          "text": "Hat noch niemand in Gegenwart der Person gesagt",
          "gewichte": {}
        },
        {
          "id": "th7f",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "wb1",
      "bereich": "weltbild",
      "typ": "single",
      "text": "Was sagt die Person über Wahlen?",
      "warum": "Misstrauen in Wahlen hat sich in vier Jahren verdreifacht (Mitte-Studie 2024/25: 18 %). Wer Wahlen für gefälscht hält, denkt verschwörungsförmig und braucht einen anderen Zugang als jemand, der sie für wirkungslos hält oder nur die Auswahl kritisiert.",
      "optionen": [
        {
          "id": "wb1a",
          "text": "Wahlen werden manipuliert oder gefälscht",
          "gewichte": {
            "misstrauen": 3
          },
          "skalen": {
            "verschwoerung": 3,
            "offenheit": 0
          },
          "hinweis": "Wahlbetrugsglaube lässt sich nicht mit Fakten lösen. Frag, woran die Person merken würde, dass eine Wahl korrekt war, und würdige das Misstrauen als Anspruch an Ehrlichkeit."
        },
        {
          "id": "wb1b",
          "text": "Wahlen ändern nichts, „die machen eh, was sie wollen“",
          "gewichte": {
            "protest-wut": 2,
            "misstrauen": 1
          },
          "skalen": {
            "offenheit": 1
          }
        },
        {
          "id": "wb1c",
          "text": "Die eigene Stimme ist ein Denkzettel, damit „die anderen aufwachen“",
          "gewichte": {
            "protest-wut": 3
          },
          "skalen": {
            "offenheit": 2
          },
          "hinweis": "Protestwahl ist ansprechbar: Trennt gemeinsam, was Protest gegen Zustände und was Zustimmung zu Inhalten ist. Frag, was passieren müsste, damit der Denkzettel überflüssig wird."
        },
        {
          "id": "wb1d",
          "text": "Wahlen sind wichtig, nur die Auswahl taugt nichts",
          "gewichte": {
            "protest-wut": 1
          },
          "skalen": {
            "offenheit": 3
          }
        },
        {
          "id": "wb1e",
          "text": "Die Person wählt die Partei aus Überzeugung, die Forderungen stimmen für sie",
          "gewichte": {
            "identitaet-heimat": 1,
            "kontrolle-angst": 1
          },
          "skalen": {
            "offenheit": 1
          }
        },
        {
          "id": "wb1f",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "wb2",
      "bereich": "weltbild",
      "typ": "single",
      "text": "Lehnt die Person die Idee der Demokratie ab oder nur die Art, wie die Demokratie gerade funktioniert?",
      "warum": "79 % nennen sich Demokrat:innen, nur 52 % sehen die Demokratie funktionieren (Mitte-Studie). Das Rückgewinnungspotenzial liegt bei diesen „systemkritischen Demokrat:innen“; wer die Idee selbst ablehnt, braucht Fachberatung statt Überzeugungsarbeit.",
      "optionen": [
        {
          "id": "wb2a",
          "text": "Die Idee: „Demokratie funktioniert nicht, es braucht einen, der durchgreift“",
          "gewichte": {
            "kontrolle-angst": 3
          },
          "skalen": {
            "offenheit": 0
          },
          "hinweis": "Die Ablehnung gilt dem System selbst. Vermeide Bedrohungsrhetorik („Demokratie in Gefahr“), sie verstärkt den Ruf nach harter Hand. Realistisches Ziel: Beziehung und rote Linien."
        },
        {
          "id": "wb2b",
          "text": "Nur das Funktionieren: „Die Idee ist gut, aber die Parteien versagen“",
          "gewichte": {
            "protest-wut": 2,
            "gerechtigkeit-abgehaengt": 1
          },
          "skalen": {
            "offenheit": 3
          },
          "hinweis": "Die Person trägt die Demokratie noch mit. Das ist die beste Ausgangslage: Frag, was konkret funktionieren müsste, und zeig Wege, wie die eigene Stimme vor Ort etwas bewirkt."
        },
        {
          "id": "wb2c",
          "text": "Die Person sieht die Partei als Retterin der „echten“ Demokratie gegen „das System“",
          "gewichte": {
            "misstrauen": 2,
            "identitaet-heimat": 1
          },
          "skalen": {
            "offenheit": 1,
            "verschwoerung": 2
          },
          "hinweis": "Die Person beansprucht die Demokratie für sich. Nutze das: Frag, welche Regeln auch für die eigene Seite gelten müssten, etwa Pressefreiheit oder Minderheitenschutz."
        },
        {
          "id": "wb2d",
          "text": "Unentschieden, mal so, mal so",
          "gewichte": {},
          "skalen": {
            "offenheit": 2
          }
        },
        {
          "id": "wb2e",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "wb3",
      "bereich": "weltbild",
      "typ": "single",
      "text": "Wie spricht die Person über Gerichte, Grundgesetz und Verfassungsschutz?",
      "warum": "Ob die Person Rechtsstaat und Grundgesetz als gemeinsamen Boden anerkennt, entscheidet, ob du dich darauf berufen kannst. Hält die Person Gerichte für gesteuert, wirken Verweise auf Urteile wie Beweise der Verschwörung (Imhoff et al. 2022, Praxiskonsens).",
      "optionen": [
        {
          "id": "wb3a",
          "text": "Gerichte und Verfassungsschutz sind politisch gesteuert oder gekauft",
          "gewichte": {
            "misstrauen": 3
          },
          "skalen": {
            "verschwoerung": 2,
            "offenheit": 0
          },
          "hinweis": "Verweise auf Urteile oder Behörden wirken bei der Person nicht, denn Institutionen gelten als Teil des Systems. Argumentiere nicht über Institutionen, sondern über Erlebnisse und Menschen."
        },
        {
          "id": "wb3b",
          "text": "Das Grundgesetz ist gut, wird aber „gegen uns“ benutzt",
          "gewichte": {
            "misstrauen": 1,
            "identitaet-heimat": 1
          },
          "skalen": {
            "offenheit": 1
          }
        },
        {
          "id": "wb3c",
          "text": "Die Person beruft sich selbst auf Grundrechte, vor allem auf die Meinungsfreiheit",
          "gewichte": {
            "anerkennung": 2
          },
          "skalen": {
            "offenheit": 2
          },
          "hinweis": "Die Grundrechte sind gemeinsamer Boden. Frag, ob diese Rechte für alle gelten sollen, auch für Menschen, die die Person ablehnt; das öffnet ohne Belehrung."
        },
        {
          "id": "wb3d",
          "text": "Regeln und Rechte gelten für „uns“, nicht für Feinde oder „Verräter“",
          "gewichte": {
            "kontrolle-angst": 2,
            "identitaet-heimat": 1
          },
          "skalen": {
            "offenheit": 0
          },
          "hinweis": "Zweierlei Recht für Freund und Feind ist ein Kernmerkmal geschlossener Weltbilder. Allein kommst du hier kaum weiter; beziehe Fachberatung ein und halte rote Linien."
        },
        {
          "id": "wb3e",
          "text": "Das Thema kommt bei der Person nicht vor",
          "gewichte": {}
        },
        {
          "id": "wb3f",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "wb4",
      "bereich": "weltbild",
      "typ": "single",
      "text": "Wie reagiert die Person auf Kompromisse und lange Verhandlungen in der Politik?",
      "warum": "Der Ruf nach einem, der durchgreift, misst autoritäre Unterwürfigkeit (KSA-3) und wächst mit Bedrohungsgefühlen; „alternativlos“-Rhetorik schließt den Verhandlungsraum (Leipzig 2024). Wer Kompromisse grundsätzlich akzeptiert, ist für Beteiligung erreichbar.",
      "optionen": [
        {
          "id": "wb4a",
          "text": "„Einer muss durchgreifen, statt ewig zu reden“",
          "gewichte": {
            "kontrolle-angst": 3
          },
          "skalen": {
            "offenheit": 1
          },
          "hinweis": "Die Person sucht Ordnung und Verlässlichkeit. Biete beides im Kleinen: klare Absprachen, eingehaltene Termine, Beteiligung mit sichtbarer Wirkung. Keine Angstbilder."
        },
        {
          "id": "wb4b",
          "text": "Kompromisse sind Verrat an den eigenen Leuten",
          "gewichte": {
            "identitaet-heimat": 2,
            "protest-wut": 1
          },
          "skalen": {
            "offenheit": 0
          }
        },
        {
          "id": "wb4c",
          "text": "Kompromisse sind nötig, nur die aktuellen sind schlecht",
          "gewichte": {
            "gerechtigkeit-abgehaengt": 1
          },
          "skalen": {
            "offenheit": 3
          },
          "hinweis": "Die Person akzeptiert das Aushandeln. Dazu passt eine Einladung, selbst zu erleben, wie Entscheidungen entstehen: Bürgerversammlung, Ortsbeirat, Betriebsrat."
        },
        {
          "id": "wb4d",
          "text": "Die Person kann beide Seiten wiedergeben, bevor sie urteilt",
          "gewichte": {},
          "skalen": {
            "offenheit": 3
          }
        },
        {
          "id": "wb4e",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "wb5",
      "bereich": "weltbild",
      "typ": "single",
      "text": "Hält die Person Gewalt in bestimmten Fällen für gerechtfertigt?",
      "warum": "Meinungs- und Handlungsradikalisierung sind getrennte Prozesse (McCauley/Moskalenko): Verständnis für Gewalt ist nicht Gewaltbereitschaft. Die Antwort bestimmt aber, ob du allein weitermachen kannst oder Fachberatung brauchst (bpb 2024, Praxiskonsens).",
      "optionen": [
        {
          "id": "wb5a",
          "text": "Nein, die Person lehnt Gewalt klar ab, auch von der eigenen Seite",
          "gewichte": {},
          "skalen": {
            "offenheit": 2
          },
          "hinweis": "Gewaltablehnung ist gemeinsamer Boden. Wenn Mitstreiter:innen diese Grenze überschreiten, frag ruhig, wie die Person das sieht; das stärkt Zweifel ohne Angriff."
        },
        {
          "id": "wb5b",
          "text": "„Irgendwann reicht es“: Verständnis für Gewalt anderer, selbst gewaltfrei",
          "gewichte": {
            "protest-wut": 2,
            "kontrolle-angst": 1
          },
          "skalen": {
            "offenheit": 1
          },
          "hinweis": "Verständnis für Gewalt ist ein Vorbote, kein Urteil. Frag, was sich die Person stattdessen wünschen würde, und benenne klar, wo deine Grenze liegt."
        },
        {
          "id": "wb5c",
          "text": "Gewalt gegen bestimmte Gruppen gilt der Person als Notwehr oder Selbstschutz",
          "gewichte": {
            "kontrolle-angst": 2,
            "identitaet-heimat": 1
          },
          "skalen": {
            "offenheit": 0,
            "belastung": 2
          },
          "hinweis": "Gewalt als Notwehr zu rahmen ist ein Kernnarrativ geschlossener Weltbilder. Hol dir Fachberatung (Mobile Beratung, Fachstelle Rechtsextremismus und Familie), bevor du das allein bearbeitest."
        },
        {
          "id": "wb5d",
          "text": "Die Person spricht davon, selbst „zurückzuschlagen“, oder droht",
          "gewichte": {
            "protest-wut": 2
          },
          "skalen": {
            "offenheit": 0,
            "belastung": 3
          },
          "hinweis": "Nimm das ernst, auch wenn es wie Großsprech klingt. Bei konkreten Opfern, Orten oder Mitteln: Polizei 110. Beurteile Gefährdung nie allein; dein eigener Schutz geht vor."
        },
        {
          "id": "wb5e",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "wb6",
      "bereich": "weltbild",
      "typ": "single",
      "text": "Was soll nach Meinung der Person mit Menschen oder Medien geschehen, die die Partei kritisieren?",
      "warum": "Autoritäre Aggression („mit aller Härte vorgehen“, KSA-3) trennt Streitlust von Feindbild: Wer Kritiker:innen bestraft sehen will, denkt in Freund und Feind. Das entscheidet, ob Argumente ankommen oder nur Loyalität abgerufen wird (Leipzig 2024).",
      "optionen": [
        {
          "id": "wb6a",
          "text": "Nichts, Kritiker:innen sollen mitreden; die Person sieht es nur anders",
          "gewichte": {},
          "skalen": {
            "offenheit": 3
          },
          "hinweis": "Die Person trennt Position und Mensch. Hier tragen offene Fragen und Gegenerfahrungen; du kannst Widerspruch ohne Beziehungsrisiko äußern."
        },
        {
          "id": "wb6b",
          "text": "Kritiker:innen sollen „endlich den Mund halten“, sie nerven",
          "gewichte": {
            "protest-wut": 2
          },
          "skalen": {
            "offenheit": 1
          }
        },
        {
          "id": "wb6c",
          "text": "Kritiker:innen sind gekauft oder gesteuert, man sollte ihnen Geld und Posten entziehen",
          "gewichte": {
            "misstrauen": 2,
            "protest-wut": 1
          },
          "skalen": {
            "verschwoerung": 2,
            "offenheit": 1
          }
        },
        {
          "id": "wb6d",
          "text": "Kritiker:innen sollten bestraft, verboten oder entlassen werden",
          "gewichte": {
            "kontrolle-angst": 2,
            "protest-wut": 1
          },
          "skalen": {
            "offenheit": 0
          },
          "hinweis": "Die Person will Gegner:innen zum Schweigen bringen. Frag, wer entscheidet, wer schweigen muss, und ob das auch gegen die Person selbst gelten dürfte; Faktenstreit bringt hier nichts."
        },
        {
          "id": "wb6e",
          "text": "Kritiker:innen sollten „weg“: abgeschoben, eingesperrt, „an die Wand“",
          "gewichte": {
            "kontrolle-angst": 2,
            "identitaet-heimat": 1
          },
          "skalen": {
            "offenheit": 0,
            "belastung": 3
          },
          "hinweis": "Vernichtungs- oder Vertreibungswünsche sind ein Warnzeichen für ein geschlossenes Weltbild. Benenne die Grenze klar und hol dir Fachberatung; allein erreichst du hier wenig."
        },
        {
          "id": "wb6f",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "wb7",
      "bereich": "weltbild",
      "typ": "single",
      "text": "Wer gehört für die Person zum „Volk“ oder zu „uns“?",
      "warum": "Homogenitätsüberzeugung und völkische Abgrenzung trennen Protest von Ethnonationalismus (Populismus-Kurzskala, Teney 2026). Ob die Person „uns“ über Leistung, Wohnort oder Abstammung definiert, bestimmt, welche Geschichten und Begegnungen anknüpfen (Kalla/Broockman).",
      "optionen": [
        {
          "id": "wb7a",
          "text": "Alle, die hier leben, arbeiten und sich an Regeln halten",
          "gewichte": {
            "gerechtigkeit-abgehaengt": 1
          },
          "skalen": {
            "offenheit": 3
          },
          "hinweis": "Dieses Wir ist offen und leistungsbezogen. Erzähle von Zugewanderten, die genau das tun; das knüpft an die Werte der Person an, statt ihnen zu widersprechen."
        },
        {
          "id": "wb7b",
          "text": "Die „normalen, fleißigen Leute“ im Gegensatz zu „denen da oben“",
          "gewichte": {
            "gerechtigkeit-abgehaengt": 2,
            "protest-wut": 1
          },
          "skalen": {
            "offenheit": 2
          }
        },
        {
          "id": "wb7c",
          "text": "Die Menschen der eigenen Region oder des eigenen Ortes, gegen „die in Berlin“",
          "gewichte": {
            "identitaet-heimat": 2,
            "gerechtigkeit-abgehaengt": 1
          },
          "skalen": {
            "offenheit": 2
          }
        },
        {
          "id": "wb7d",
          "text": "Nur Menschen mit deutschen Wurzeln, egal wie lange jemand hier lebt",
          "gewichte": {
            "identitaet-heimat": 3
          },
          "skalen": {
            "offenheit": 0
          },
          "hinweis": "Abstammung als Grenze ist völkisches Denken und eine rote Linie. Sag das klar, halte die Beziehung trotzdem und ermögliche Begegnung auf Augenhöhe, wo sie freiwillig entsteht."
        },
        {
          "id": "wb7e",
          "text": "Das wechselt, je nachdem, worüber die Person gerade spricht",
          "gewichte": {},
          "skalen": {
            "offenheit": 2
          }
        },
        {
          "id": "wb7f",
          "text": "Die Person benutzt solche Begriffe nicht",
          "gewichte": {}
        },
        {
          "id": "wb7g",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "bd1",
      "bereich": "beduerfnisse",
      "typ": "multi",
      "text": "Was bekommt die Person in der Partei oder in deren Umfeld, was ihr sonst fehlt?",
      "warum": "Nach dem 3N-Modell halten Netzwerk und Erzählung, nicht nur das Bedürfnis (Da Silva et al. 2024). Was die Partei liefert, muss ein demokratisches Angebot ersetzen können, sonst bleibt jeder Appell leer (Pfeiffer 2024: Gemeinschaft, Anerkennung, Identität).",
      "optionen": [
        {
          "id": "bd1a",
          "text": "Leute, die anrufen, einladen und nach der Person fragen",
          "gewichte": {
            "zugehoerigkeit": 3
          },
          "hinweis": "Die Person wird dort gebraucht und vermisst. Biete Gemeinschaft, die sich echt anfühlt: regelmäßig, mit Ritualen und Aufgaben, nicht nur Gesprächsangebote."
        },
        {
          "id": "bd1b",
          "text": "Das Gefühl, endlich ernst genommen zu werden",
          "gewichte": {
            "anerkennung": 3
          }
        },
        {
          "id": "bd1c",
          "text": "Eine Aufgabe oder Rolle, in der die Person wichtig ist",
          "gewichte": {
            "anerkennung": 2,
            "zugehoerigkeit": 1
          },
          "hinweis": "Bedeutsamkeit über Rollen ist ersetzbar: Verein, Nachbarschaft, Betrieb, Familie. Gib der Person eine Aufgabe, die ohne sie nicht läuft."
        },
        {
          "id": "bd1d",
          "text": "Eine Erklärung, warum alles so ist und wer schuld hat",
          "gewichte": {
            "misstrauen": 2,
            "kontrolle-angst": 1
          },
          "skalen": {
            "verschwoerung": 1
          }
        },
        {
          "id": "bd1e",
          "text": "Das Gefühl, Teil von etwas Großem zu sein, „Widerstand“",
          "gewichte": {
            "identitaet-heimat": 2,
            "zugehoerigkeit": 1
          }
        },
        {
          "id": "bd1f",
          "text": "Ein Ventil für Wut und Enttäuschung",
          "gewichte": {
            "protest-wut": 3
          }
        },
        {
          "id": "bd1g",
          "text": "Kann ich nicht einschätzen",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "bd2",
      "bereich": "beduerfnisse",
      "typ": "single",
      "text": "Gibt es ein Erlebnis von Kränkung oder Demütigung, das die Person immer wieder erzählt?",
      "warum": "Bedeutungsverlust durch Kränkung ist nach Kruglanski der häufigste Auslöser der Bedeutsamkeitssuche; die oft erzählte Geschichte ist die Tür zum Bedürfnis. Wo die Kränkung passierte, zeigt, ob Arbeit, Staat, Familie oder Öffentlichkeit das Vertrauen brachen.",
      "optionen": [
        {
          "id": "bd2a",
          "text": "Ja, am Arbeitsplatz: übergangen, entlassen, schlecht behandelt",
          "gewichte": {
            "anerkennung": 2,
            "kontrolle-angst": 1
          },
          "hinweis": "Hör dir die Geschichte noch einmal ganz an und spiegle, was das Erlebnis für die Person bedeutet hat. Erst danach lässt sich über die Schlüsse sprechen, die daraus gezogen werden."
        },
        {
          "id": "bd2b",
          "text": "Ja, mit Ämtern, Behörden, Gericht oder Polizei",
          "gewichte": {
            "misstrauen": 2,
            "gerechtigkeit-abgehaengt": 1
          },
          "hinweis": "Das Misstrauen hat einen Anfang. Würdige die Erfahrung, bevor du Institutionen verteidigst; sonst stehst du in den Augen der Person auf deren Seite."
        },
        {
          "id": "bd2c",
          "text": "Ja, in Familie, Partnerschaft oder Freundeskreis",
          "gewichte": {
            "zugehoerigkeit": 2,
            "anerkennung": 1
          }
        },
        {
          "id": "bd2d",
          "text": "Ja, öffentlich: beschimpft, ausgeladen, als „Nazi“ abgestempelt",
          "gewichte": {
            "anerkennung": 2,
            "protest-wut": 1
          },
          "hinweis": "Die Kränkung kam von der Seite, der du angehörst. Erkenne an, dass das verletzt hat, ohne die Haltung zu teilen; sonst wirst du nicht mehr gehört."
        },
        {
          "id": "bd2e",
          "text": "Nein, so eine Geschichte kenne ich nicht",
          "gewichte": {}
        },
        {
          "id": "bd2f",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "bd3",
      "bereich": "beduerfnisse",
      "typ": "single",
      "text": "Hat die Person das Gefühl, in ihrem Leben und Umfeld etwas bewirken zu können?",
      "warum": "71,7 % meinen, Leute wie sie hätten keinen Einfluss, 63,7 % halten Engagement für sinnlos (Leipzig 2024); Kontrollverlust erhöht die Neigung, rechts zu wählen (Hilmer et al. 2017). Das Gegenmittel ist Beteiligung mit spürbarer Wirkung, nicht Beschwichtigung.",
      "optionen": [
        {
          "id": "bd3a",
          "text": "Ja, die Person packt an und sieht Ergebnisse, auch über den Alltag hinaus",
          "gewichte": {},
          "skalen": {
            "offenheit": 2
          },
          "hinweis": "Selbstwirksamkeit ist da. Lenke diese Kraft auf etwas Konkretes vor Ort: Ortsbeirat, Verein, Betriebsrat, Petition; geh mit, statt nur hinzuschicken."
        },
        {
          "id": "bd3b",
          "text": "Privat ja, politisch nein: „Auf Leute wie mich hört keiner“",
          "gewichte": {
            "protest-wut": 2,
            "anerkennung": 1
          },
          "skalen": {
            "offenheit": 2
          },
          "hinweis": "Ohnmacht mit lauter Stimme. Frag, wo die Person je etwas bewirkt hat, und such gemeinsam eine kleine politische Erfahrung, die das wiederholt."
        },
        {
          "id": "bd3c",
          "text": "Kaum noch, die Person fühlt sich ausgeliefert: Arbeit, Gesundheit, Amt, Geld",
          "gewichte": {
            "kontrolle-angst": 3
          },
          "skalen": {
            "belastung": 1
          }
        },
        {
          "id": "bd3d",
          "text": "Resigniert: „Es ändert sich eh nichts, egal was man tut“",
          "gewichte": {
            "protest-wut": 1,
            "kontrolle-angst": 1
          },
          "skalen": {
            "offenheit": 1
          }
        },
        {
          "id": "bd3e",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "bd4",
      "bereich": "beduerfnisse",
      "typ": "single",
      "text": "Mit wem vergleicht sich die Person, wenn sie sich benachteiligt fühlt?",
      "warum": "Nicht objektive Armut, sondern gefühlte Benachteiligung im Vergleich treibt die Hinwendung (Hilmer et al. 2017, Schröder et al. 2026). Die Vergleichsgruppe zeigt, ob Fairness, Migration oder Eliten den Kern bilden und welche Geschichten anknüpfen.",
      "optionen": [
        {
          "id": "bd4a",
          "text": "Mit Menschen, die Leistungen bekommen, ohne zu arbeiten",
          "gewichte": {
            "gerechtigkeit-abgehaengt": 3
          },
          "hinweis": "Der Maßstab der Person ist Leistung und Fairness. Argumentiere in diesen Werten, nicht in deinen, und erzähle von Menschen, die hart arbeiten und trotzdem zu „den anderen“ gezählt werden."
        },
        {
          "id": "bd4b",
          "text": "Mit Zugewanderten, die aus Sicht der Person bevorzugt werden",
          "gewichte": {
            "gerechtigkeit-abgehaengt": 2,
            "identitaet-heimat": 2
          },
          "hinweis": "Hier verbinden sich Fairness und Migrationssorge. Tabuisiere das Thema nicht; frag nach konkreten Fällen und erzähle von einzelnen Menschen, statt über Gruppen zu reden."
        },
        {
          "id": "bd4c",
          "text": "Mit „denen da oben“: Politiker:innen, Reichen, Beamt:innen",
          "gewichte": {
            "protest-wut": 2,
            "gerechtigkeit-abgehaengt": 1
          }
        },
        {
          "id": "bd4d",
          "text": "Mit anderen Regionen, Städten oder Generationen, denen es besser gehe",
          "gewichte": {
            "identitaet-heimat": 2,
            "gerechtigkeit-abgehaengt": 1
          },
          "hinweis": "Regionale Kränkung ist oft real (geschlossene Schulen, fehlende Ärzte). Nimm das ernst und frag, was sich konkret verändert hat, bevor ihr über Schuld sprecht."
        },
        {
          "id": "bd4e",
          "text": "Mit dem eigenen früheren Leben: „Früher ging es uns besser“",
          "gewichte": {
            "identitaet-heimat": 1,
            "kontrolle-angst": 1
          }
        },
        {
          "id": "bd4f",
          "text": "Die Person fühlt sich nicht benachteiligt",
          "gewichte": {}
        },
        {
          "id": "bd4g",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "bd5",
      "bereich": "beduerfnisse",
      "typ": "single",
      "text": "Was würde der Person nach eigener Aussage mehr Sicherheit geben?",
      "warum": "Sicherheitsbedürfnisse sind legitim, aber der Inhalt unterscheidet sich: Ordnungswünsche verweisen auf Kontrolle, materielle Sicherheit auf Gerechtigkeit, Stillstand auf Identität (Stenner, Hilmer et al. 2017). Was genau Sicherheit gäbe, bestimmt dein Angebot.",
      "optionen": [
        {
          "id": "bd5a",
          "text": "Mehr Polizei, härtere Strafen, Abschiebungen, Kontrolle an Grenzen",
          "gewichte": {
            "kontrolle-angst": 3
          },
          "hinweis": "Nimm die Sorge ernst und frag nach dem konkreten Erleben dahinter. Statistiken wischen Angst nicht weg; was hilft, ist ein sichtbar verlässlicher Alltag."
        },
        {
          "id": "bd5b",
          "text": "Sichere Arbeit, Rente, bezahlbares Wohnen und Energie",
          "gewichte": {
            "gerechtigkeit-abgehaengt": 2,
            "kontrolle-angst": 1
          }
        },
        {
          "id": "bd5c",
          "text": "Dass alles bleibt, wie es war, keine Veränderung mehr",
          "gewichte": {
            "identitaet-heimat": 2,
            "kontrolle-angst": 1
          },
          "hinweis": "Die Person sucht Halt im Vertrauten. Erkenne an, was bleiben soll, und zeig, dass Vertrautes und Veränderung nebeneinander bestehen können."
        },
        {
          "id": "bd5d",
          "text": "Dass endlich jemand „ehrlich sagt, was los ist“",
          "gewichte": {
            "misstrauen": 2,
            "anerkennung": 1
          }
        },
        {
          "id": "bd5e",
          "text": "Nicht allein zu sein, wenn etwas passiert",
          "gewichte": {
            "zugehoerigkeit": 2
          },
          "hinweis": "Sicherheit ist für die Person etwas Soziales. Verlässliche Menschen sind das Angebot: regelmäßiger Kontakt, Hilfe im Alltag, feste Verabredungen."
        },
        {
          "id": "bd5f",
          "text": "Sicherheit ist für die Person kein Thema",
          "gewichte": {}
        },
        {
          "id": "bd5g",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "bd6",
      "bereich": "beduerfnisse",
      "typ": "single",
      "text": "Wo fühlt sich die Person nach eigener Aussage zugehörig, abgesehen von der Partei?",
      "warum": "Beziehungen außerhalb der Szene sind der wichtigste Schutz- und Ausstiegsfaktor (Bjørgo, Jensen et al.); fehlen solche Beziehungen, wird die Gruppe zum Lebensmittelpunkt (Violence Prevention Network). Daran entscheidet sich, ob du Brücken stärkst oder neu bauen musst.",
      "optionen": [
        {
          "id": "bd6a",
          "text": "In Familie, Betrieb, Verein oder Nachbarschaft, fest und verlässlich",
          "gewichte": {},
          "skalen": {
            "kapital": 2
          },
          "hinweis": "Diese Bindungen sind das Gegengewicht zur Szene. Stärke diese Bindungen, ohne sie politisch aufzuladen: gemeinsame Routinen, Aufgaben, Feste."
        },
        {
          "id": "bd6b",
          "text": "Früher ja, das ist weggebrochen: Trennung, Rente, Wegzug, Krankheit",
          "gewichte": {
            "zugehoerigkeit": 3
          },
          "hinweis": "Die Partei füllt eine Lücke, die vorher etwas anderes gefüllt hat. Frag, was der Person fehlt, und hilf, es außerhalb der Szene wiederzufinden."
        },
        {
          "id": "bd6c",
          "text": "Vor allem online, in Gruppen und Chats",
          "gewichte": {
            "zugehoerigkeit": 2,
            "anerkennung": 1
          }
        },
        {
          "id": "bd6d",
          "text": "Nirgends richtig, die Person beschreibt sich selbst als Außenseiter:in",
          "gewichte": {
            "zugehoerigkeit": 3
          },
          "hinweis": "Du bist möglicherweise eine der wenigen Brücken. Halte Kontakt auch ohne das Thema und hol weitere Bezugspersonen ins Boot, damit du nicht allein trägst."
        },
        {
          "id": "bd6e",
          "text": "Nur noch bei Menschen, die politisch genauso denken",
          "gewichte": {
            "zugehoerigkeit": 2,
            "identitaet-heimat": 1
          },
          "skalen": {
            "offenheit": 1
          }
        },
        {
          "id": "bd6f",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "bd7",
      "bereich": "beduerfnisse",
      "typ": "single",
      "text": "Wie geht die Person mit Fragen um, auf die es keine einfache Antwort gibt?",
      "warum": "Selbstunsicherheit treibt in Gruppen mit klaren Normen und einfachen Erklärungen (Hogg; Choi/Hogg 2020). Wer Ungewissheit schlecht aushält, braucht Verlässlichkeit und Klarheit von dir statt Ambivalenz; wer Offenes stehen lassen kann, verträgt auch offene Fragen.",
      "optionen": [
        {
          "id": "bd7a",
          "text": "Die Person greift zu einer einfachen Erklärung und hält daran fest",
          "gewichte": {
            "kontrolle-angst": 2,
            "misstrauen": 1
          },
          "skalen": {
            "offenheit": 1,
            "verschwoerung": 1
          },
          "hinweis": "Einfache Erklärungen geben der Person Halt. Nimm nichts weg, ohne etwas anzubieten: klare Absprachen, eine verständliche Gegenerzählung, Verlässlichkeit in der Beziehung."
        },
        {
          "id": "bd7b",
          "text": "Die Person wird unruhig oder gereizt und bricht ab",
          "gewichte": {
            "kontrolle-angst": 2
          },
          "skalen": {
            "offenheit": 1
          }
        },
        {
          "id": "bd7c",
          "text": "Die Person verlässt sich auf das, was „ihre Leute“ dazu sagen",
          "gewichte": {
            "zugehoerigkeit": 2,
            "misstrauen": 1
          },
          "skalen": {
            "offenheit": 1
          }
        },
        {
          "id": "bd7d",
          "text": "Die Person kann offene Fragen stehen lassen, ohne sofort zu urteilen",
          "gewichte": {},
          "skalen": {
            "offenheit": 3
          },
          "hinweis": "Die Person hält Unsicherheit aus. Fragen nach Quellen, Erlebnissen und eigenen Vorbehalten sind hier erlaubt und führen weiter als jedes Gegenargument."
        },
        {
          "id": "bd7e",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "gf1",
      "bereich": "gefuehle",
      "typ": "single",
      "text": "Welches Gefühl ist bei der Person am deutlichsten, wenn es um Politik geht?",
      "warum": "Die Partei wirkt als Gefühlsgemeinschaft, an der Argumente abprallen (Spissinger). Das Leitgefühl bestimmt den Zugang: Wut will gehört werden, Angst braucht Sicherheit, Bitterkeit Anerkennung, Stolz Respekt (Motivational Interviewing, Itzchakov et al. 2017).",
      "optionen": [
        {
          "id": "gf1a",
          "text": "Wut und Empörung",
          "gewichte": {
            "protest-wut": 3
          },
          "hinweis": "Lass die Wut aussprechen, bevor du etwas erwiderst, und frag, was genau enttäuscht hat. Beschwichtigen („so schlimm ist es nicht“) macht es schlimmer."
        },
        {
          "id": "gf1b",
          "text": "Angst und Sorge",
          "gewichte": {
            "kontrolle-angst": 3
          },
          "hinweis": "Angst lässt sich nicht wegargumentieren. Benenne, was verlässlich ist und bleibt, und frag, was der Person konkret Sicherheit geben würde."
        },
        {
          "id": "gf1c",
          "text": "Bitterkeit und Enttäuschung",
          "gewichte": {
            "gerechtigkeit-abgehaengt": 2,
            "anerkennung": 1
          },
          "hinweis": "Hinter Bitterkeit steckt oft ein unerfülltes Versprechen. Frag, was die Person erwartet hatte und wer es gebrochen hat."
        },
        {
          "id": "gf1d",
          "text": "Stolz, Trotz, Kampfeslust",
          "gewichte": {
            "identitaet-heimat": 2,
            "zugehoerigkeit": 1
          },
          "hinweis": "Trotz braucht ein Gegenüber. Streite nicht gegen den Stolz, sondern frag, worauf er sich gründet, und würdige, was daran berechtigt ist."
        },
        {
          "id": "gf1e",
          "text": "Spott und Überlegenheit („ich durchschaue das“)",
          "gewichte": {
            "misstrauen": 2,
            "anerkennung": 1
          },
          "skalen": {
            "verschwoerung": 1
          }
        },
        {
          "id": "gf1f",
          "text": "Gleichgültigkeit, es ist eher Gewohnheit",
          "gewichte": {},
          "hinweis": "Politik ist für die Person Nebensache. Die Hebel sind Alltag und Beziehung, nicht das Argument."
        },
        {
          "id": "gf1g",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "gf2",
      "bereich": "gefuehle",
      "typ": "multi",
      "text": "Was löst bei der Person die heftigste Reaktion aus?",
      "warum": "Auslöser zeigen das verletzte Bedürfnis genauer als Parolen und lassen sich im Gespräch gezielt meiden oder vorbereiten. Beschämung und Belehrung aktivieren Abwehr, nicht Nachdenken (Itzchakov et al. 2017, Dusso/Perkins 2023).",
      "optionen": [
        {
          "id": "gf2a",
          "text": "Nachrichten über Gewalttaten oder Kriminalität",
          "gewichte": {
            "kontrolle-angst": 2
          }
        },
        {
          "id": "gf2b",
          "text": "Wenn sich die Person belehrt, bevormundet oder beschämt fühlt",
          "gewichte": {
            "anerkennung": 2,
            "protest-wut": 1
          },
          "hinweis": "Belehrung ist der Auslöser. Formuliere in Ich-Sätzen, frag, statt zu erklären, und gib der Person Raum, selbst zu einem Schluss zu kommen."
        },
        {
          "id": "gf2c",
          "text": "Wenn jemand die Person oder „ihre Leute“ als rechts oder Nazi bezeichnet",
          "gewichte": {
            "anerkennung": 2,
            "zugehoerigkeit": 1
          }
        },
        {
          "id": "gf2d",
          "text": "Wenn andere etwas bekommen, das der Person verwehrt bleibt",
          "gewichte": {
            "gerechtigkeit-abgehaengt": 2
          }
        },
        {
          "id": "gf2e",
          "text": "Wenn jemand aus dem Umfeld der Person auf Abstand zur Partei geht",
          "gewichte": {
            "zugehoerigkeit": 2
          },
          "hinweis": "Abstand anderer trifft die Loyalität der Person, nicht ihre Argumente. Verlange keine Distanzierung vor anderen; Zweifel darf die Person zuerst nur dir gegenüber zeigen."
        },
        {
          "id": "gf2f",
          "text": "Wenn sich etwas im Ort, Betrieb oder Alltag der Person verändert",
          "gewichte": {
            "identitaet-heimat": 2,
            "kontrolle-angst": 1
          }
        },
        {
          "id": "gf2g",
          "text": "Nichts davon, die Person bleibt meist ruhig",
          "gewichte": {},
          "skalen": {
            "offenheit": 2
          }
        }
      ]
    },
    {
      "id": "gf3",
      "bereich": "gefuehle",
      "typ": "single",
      "text": "Wie sieht es aus, wenn die Person wütend wird?",
      "warum": "Heiße Wut ist Beteiligung und klingt ab; kalter Zynismus und Rückzug sind schwerer zu erreichen; Beleidigung und Drohung verlangen Grenzen und Selbstschutz (Angehörigenberatung, Nocun). Danach richtet sich, ob Pause-Regel, Ich-Botschaft oder Abbruch passt.",
      "optionen": [
        {
          "id": "gf3a",
          "text": "Laut und aufbrausend, danach ist es wieder gut",
          "gewichte": {
            "protest-wut": 2
          },
          "skalen": {
            "offenheit": 2,
            "kapital": 1
          },
          "hinweis": "Vereinbart eine Pause-Regel: Wer merkt, dass es kippt, darf unterbrechen, ohne dass es als Sieg zählt. Nach dem Abkühlen weiterreden."
        },
        {
          "id": "gf3b",
          "text": "Kalt, zynisch, sarkastisch",
          "gewichte": {
            "misstrauen": 2,
            "protest-wut": 1
          },
          "skalen": {
            "offenheit": 1
          },
          "hinweis": "Zynismus schützt vor Enttäuschung. Nicht mitspotten, nicht belehren; frag ernsthaft, was die Person früher einmal erwartet hat."
        },
        {
          "id": "gf3c",
          "text": "Zurückgezogen: Die Person schweigt oder bricht den Kontakt ab",
          "gewichte": {
            "zugehoerigkeit": 1,
            "anerkennung": 1
          },
          "skalen": {
            "offenheit": 1,
            "kapital": 1
          },
          "hinweis": "Rückzug ist hier die Form der Wut. Lass die Tür offen, benenne Pausen als Pausen und melde dich ohne das Thema wieder."
        },
        {
          "id": "gf3d",
          "text": "Beleidigend, verletzend oder drohend",
          "gewichte": {
            "protest-wut": 2
          },
          "skalen": {
            "belastung": 3,
            "offenheit": 0
          },
          "hinweis": "Hier gilt dein Schutz zuerst. Beende das Gespräch mit Rückkehrangebot („Ich höre hier auf, nächste Woche sehen wir uns“) und hol dir Unterstützung bei einer Angehörigenberatung."
        },
        {
          "id": "gf3e",
          "text": "Selten wütend, eher traurig oder müde",
          "gewichte": {
            "gerechtigkeit-abgehaengt": 1,
            "anerkennung": 1
          },
          "skalen": {
            "offenheit": 2
          }
        },
        {
          "id": "gf3f",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "gf4",
      "bereich": "gefuehle",
      "typ": "single",
      "text": "Woran merkst du, dass die Person Angst hat, auch wenn sie es nie so nennt?",
      "warum": "Angst zeigt sich oft als Wut, Rückzug oder Nachrichtenhunger; AfD-Nahe sorgen sich deutlich häufiger um ihre Zukunft (67 % gegenüber 46 %, Hilmer et al. 2017). Wer Angst hinter Wut erkennt, kann Sicherheit anbieten statt zu kontern.",
      "optionen": [
        {
          "id": "gf4a",
          "text": "An Wut und Lautstärke",
          "gewichte": {
            "kontrolle-angst": 2,
            "protest-wut": 1
          },
          "hinweis": "Die Wut ist Angstabwehr. Reagiere auf die Angst, nicht auf die Lautstärke: „Das macht dir Sorgen, oder?“ senkt den Ton oft sofort."
        },
        {
          "id": "gf4b",
          "text": "An Stille und Rückzug",
          "gewichte": {
            "zugehoerigkeit": 1,
            "kontrolle-angst": 1
          }
        },
        {
          "id": "gf4c",
          "text": "An noch mehr Nachrichten und Kanälen",
          "gewichte": {
            "misstrauen": 1,
            "kontrolle-angst": 1
          },
          "skalen": {
            "verschwoerung": 1
          },
          "hinweis": "Nachrichtenhunger ist Kontrollsuche. Biete gemeinsames Abschalten an: ein Abend ohne Handy, ein Spaziergang, etwas, das Sicherheit im Alltag gibt."
        },
        {
          "id": "gf4d",
          "text": "An der Suche nach Bestätigung bei Gleichgesinnten",
          "gewichte": {
            "zugehoerigkeit": 2
          }
        },
        {
          "id": "gf4e",
          "text": "Daran, dass die Person offen darüber spricht, auch mit mir",
          "gewichte": {},
          "skalen": {
            "offenheit": 3,
            "kapital": 3
          },
          "hinweis": "Dass die Person dir Angst zeigt, ist Vertrauen. Nimm die Angst an, ohne die Schlüsse zu bestätigen; das ist der Moment für Zuhören statt Argument."
        },
        {
          "id": "gf4f",
          "text": "Ich erkenne bei der Person keine Angst",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "gf5",
      "bereich": "gefuehle",
      "typ": "single",
      "text": "Worauf ist die Person sichtbar stolz?",
      "warum": "Stolz zeigt, wo Anerkennung andocken kann; Würdigung konkreter Leistung stillt das Bedürfnis nach Bedeutsamkeit außerhalb der Szene (Kruglanski). Wer sich abwertet, ist über Rollen erreichbar, wer auf „Durchblick“ stolz ist, über kritisches Denken.",
      "optionen": [
        {
          "id": "gf5a",
          "text": "Auf Arbeit und Können, auf das, was die Person aufgebaut hat",
          "gewichte": {
            "anerkennung": 2
          },
          "hinweis": "Würdige das konkret und regelmäßig, nicht pauschal. Gesehen zu werden ist hier schon ein Teil der Lösung."
        },
        {
          "id": "gf5b",
          "text": "Auf Familie, Ort oder Region",
          "gewichte": {
            "identitaet-heimat": 2,
            "zugehoerigkeit": 1
          },
          "hinweis": "Heimatstolz ist kein Gegner. Erkenne an, was bleiben soll, und frag, was Heimat für die Person konkret ausmacht."
        },
        {
          "id": "gf5c",
          "text": "Darauf, „nicht auf die Lügen hereinzufallen“",
          "gewichte": {
            "misstrauen": 2,
            "anerkennung": 1
          },
          "skalen": {
            "verschwoerung": 2
          },
          "hinweis": "Würdige das kritische Denken und lade ein, es auf beide Seiten anzuwenden: Woran würde die Person merken, dass ihre Quelle sie täuscht?"
        },
        {
          "id": "gf5d",
          "text": "Darauf, sich gegen alle zu stellen, „Widerstand“ zu leisten",
          "gewichte": {
            "protest-wut": 2,
            "zugehoerigkeit": 1
          }
        },
        {
          "id": "gf5e",
          "text": "Auf wenig, die Person wertet sich eher ab",
          "gewichte": {
            "anerkennung": 3
          },
          "hinweis": "Fehlender Selbstwert macht die Szene attraktiv, weil die Szene Bedeutung verleiht. Gib der Person Aufgaben, in denen sie gebraucht wird, und benenne, was sie gut macht."
        },
        {
          "id": "gf5f",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "gf6",
      "bereich": "gefuehle",
      "typ": "single",
      "text": "Worauf freut sich die Person, was gibt ihr Hoffnung?",
      "warum": "Niedergangspessimismus kennzeichnet den radikal-rechten Kern (Teney 2026); Hoffnungen außerhalb der Politik sind Brücken und Schutzfaktoren (Bjørgo: Partnerschaft, Familie, Pläne). Danach richtet sich, ob du an Lebensthemen oder an Wirksamkeit ansetzt.",
      "optionen": [
        {
          "id": "gf6a",
          "text": "Auf Familie, Enkel, Hobbys, Reisen, Garten, Projekte",
          "gewichte": {},
          "skalen": {
            "offenheit": 2,
            "kapital": 1
          },
          "hinweis": "Hier liegt das Leben der Person außerhalb der Politik. Verbringe Zeit damit, gemeinsam und ohne das Thema; das hält die Beziehung und zeigt, dass die Person mehr ist als ihre Haltung."
        },
        {
          "id": "gf6b",
          "text": "Auf einen Wahlsieg, „wenn die erst mal dran sind“",
          "gewichte": {
            "protest-wut": 2,
            "kontrolle-angst": 1
          },
          "hinweis": "Die Hoffnung ist politisch gebunden. Frag, was sich dann im Alltag der Person konkret ändern soll, und ob es dafür auch heute schon Wege gibt."
        },
        {
          "id": "gf6c",
          "text": "Darauf, dass es wieder wird „wie früher“",
          "gewichte": {
            "identitaet-heimat": 2,
            "kontrolle-angst": 1
          }
        },
        {
          "id": "gf6d",
          "text": "Auf nichts, „es geht alles den Bach runter“",
          "gewichte": {
            "gerechtigkeit-abgehaengt": 1,
            "kontrolle-angst": 1
          },
          "skalen": {
            "belastung": 1,
            "offenheit": 1
          },
          "hinweis": "Durchgehende Hoffnungslosigkeit belastet auch dich. Such kleine, gemeinsame Vorhaben mit sichtbarem Ergebnis und achte auf deine eigene Kraft."
        },
        {
          "id": "gf6e",
          "text": "Darauf, dass „die Wahrheit“ ans Licht kommt und die Schuldigen zahlen",
          "gewichte": {
            "misstrauen": 2,
            "protest-wut": 1
          },
          "skalen": {
            "verschwoerung": 2
          }
        },
        {
          "id": "gf6f",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "gf7",
      "bereich": "gefuehle",
      "typ": "single",
      "text": "Was passiert, wenn du das Gefühl der Person ansprichst statt ihrer Aussage, etwa „Das klingt enttäuscht“?",
      "warum": "Empathisches Spiegeln senkt Abwehr und macht Einstellungen weniger extrem (Itzchakov et al. 2017; Yeomans et al. 2020). Ob die Person darauf eingeht, zeigt, ob der Zugang über Gefühle offen ist oder erst Vertrauen aufgebaut werden muss.",
      "optionen": [
        {
          "id": "gf7a",
          "text": "Die Person wird weicher und erzählt mehr",
          "gewichte": {},
          "skalen": {
            "offenheit": 3,
            "kapital": 2
          },
          "hinweis": "Das ist dein Schlüssel. Bleib beim Gefühl und beim Erlebnis, bevor du etwas erwiderst; Zusammenfassen („Wenn ich dich richtig verstehe…“) wirkt stärker als jedes Argument."
        },
        {
          "id": "gf7b",
          "text": "Die Person blockt ab: „Das ist kein Gefühl, das sind Fakten“",
          "gewichte": {
            "anerkennung": 1,
            "kontrolle-angst": 1
          },
          "skalen": {
            "offenheit": 1
          },
          "hinweis": "Gefühle anzusprechen wirkt auf die Person wie eine Entwertung. Bleib bei Erlebnissen und Sachfragen („Was ist da genau passiert?“); das Gefühl darf unbenannt mitlaufen."
        },
        {
          "id": "gf7c",
          "text": "Die Person wird wütender oder fühlt sich ertappt",
          "gewichte": {
            "protest-wut": 1,
            "anerkennung": 1
          },
          "skalen": {
            "offenheit": 1
          }
        },
        {
          "id": "gf7d",
          "text": "Die Person lenkt ab oder macht einen Witz",
          "gewichte": {},
          "skalen": {
            "offenheit": 1
          }
        },
        {
          "id": "gf7e",
          "text": "Habe ich bisher nicht ausprobiert",
          "gewichte": {},
          "hinweis": "Probiere es im ruhigen Moment, nicht im Streit: ein Satz, der das Gefühl benennt, ohne Deutung und ohne Gegenargument. Dann abwarten."
        }
      ]
    },
    {
      "id": "qu1",
      "bereich": "quellen",
      "typ": "multi",
      "text": "Über welche Kanäle kommen politische Inhalte täglich zur Person?",
      "warum": "Kanäle unterscheiden sich in Dynamik und Gegenstrategie: Geschlossene Chats liefern Verschwörungsinhalte, Kurzvideos Empörung per Algorithmus, Lokalgruppen Zugehörigkeit. Nur bei gemeinsam genutzten Medien gibt es geteilten Boden (Lewandowsky/Cook 2020).",
      "optionen": [
        {
          "id": "qu1a",
          "text": "Telegram-Kanäle oder WhatsApp-Weiterleitungen",
          "gewichte": {
            "misstrauen": 1,
            "zugehoerigkeit": 1
          },
          "skalen": {
            "verschwoerung": 1
          },
          "hinweis": "Geschlossene Kanäle liefern täglich Empörung ohne Widerspruch. Betrachtet gemeinsam die Mechanik (Wer schreibt? Wer verdient?), statt einzelne Inhalte zu widerlegen."
        },
        {
          "id": "qu1b",
          "text": "Kurzvideos auf TikTok, YouTube oder Instagram",
          "gewichte": {
            "protest-wut": 1
          },
          "hinweis": "Kurzvideos wirken über Emotion und Wiederholung, nicht über Argumente. Frag, welches Video die Person zuletzt überzeugt hat, und schaut es gemeinsam an."
        },
        {
          "id": "qu1c",
          "text": "Facebook- oder Nachbarschaftsgruppen aus der Region",
          "gewichte": {
            "zugehoerigkeit": 1,
            "identitaet-heimat": 1
          }
        },
        {
          "id": "qu1d",
          "text": "Alternative Nachrichtenseiten, Blogs, Podcasts",
          "gewichte": {
            "misstrauen": 2
          }
        },
        {
          "id": "qu1e",
          "text": "Kanäle, Newsletter oder Veranstaltungen der Partei",
          "gewichte": {
            "zugehoerigkeit": 2
          }
        },
        {
          "id": "qu1f",
          "text": "Fernsehen, Radio, Tageszeitung",
          "gewichte": {},
          "hinweis": "Klassische Medien sind geteilter Boden. Nutze ihn: Über einen gemeinsam gesehenen Beitrag redet es sich leichter als über einen weitergeleiteten Link."
        },
        {
          "id": "qu1g",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "qu2",
      "bereich": "quellen",
      "typ": "single",
      "text": "Wie viel Zeit verbringt die Person nach deinem Eindruck täglich mit diesen Inhalten?",
      "warum": "Dosis und Dauerschleife machen aus Meinungen eine Weltsicht: Ständiger Konsum liefert Bestätigung und Empörung im Minutentakt. Daran entscheidet sich, ob Abschalten und Medienmechanik Thema sein müssen oder Inhalte nur Anlass sind (Kurswechsel 2022, KAST).",
      "optionen": [
        {
          "id": "qu2a",
          "text": "Fast ständig, das Handy ist immer dabei und Inhalte werden sofort geteilt",
          "gewichte": {
            "zugehoerigkeit": 1,
            "misstrauen": 1
          },
          "skalen": {
            "belastung": 2,
            "verschwoerung": 1
          },
          "hinweis": "Der Konsum ist Dauerschleife; Argumente gegen einzelne Inhalte verpuffen. Biete Zeit ohne Bildschirm an, gemeinsam und ohne Vorwurf, und sprich über die Mechanik statt über Posts."
        },
        {
          "id": "qu2b",
          "text": "Täglich, aber begrenzt, meist morgens oder abends",
          "gewichte": {},
          "skalen": {
            "offenheit": 1
          }
        },
        {
          "id": "qu2c",
          "text": "Gelegentlich, wenn etwas Großes passiert",
          "gewichte": {},
          "skalen": {
            "offenheit": 2
          },
          "hinweis": "Inhalte sind für die Person Anlass, nicht Dauerbegleitung. Über konkrete Ereignisse lässt sich sachlich sprechen; die Haltung musst du nicht als Ganzes verhandeln."
        },
        {
          "id": "qu2d",
          "text": "Kaum, die Person hört es vor allem von anderen und liest selbst wenig",
          "gewichte": {
            "zugehoerigkeit": 2
          },
          "hinweis": "Die Quelle sind Menschen, nicht Kanäle. Wer das ist, zählt mehr als jeder Link; dort liegt auch der Hebel für andere Stimmen."
        },
        {
          "id": "qu2e",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "qu3",
      "bereich": "quellen",
      "typ": "single",
      "text": "Warum hält die Person ihre Quellen für glaubwürdig?",
      "warum": "Das Glaubwürdigkeitskriterium bestimmt, wer die Person erreichen kann: Nur Botschafter:innen, die sie selbst anerkennt, kommen an (Lewandowsky/Cook 2020; Walter et al. 2020). Prüft die Person Belege, trägt Sachlichkeit; vertraut sie Bekannten, tragen Menschen.",
      "optionen": [
        {
          "id": "qu3a",
          "text": "Weil die Quellen „unabhängig“ sind und nicht zum „Mainstream“ gehören",
          "gewichte": {
            "misstrauen": 2
          },
          "skalen": {
            "verschwoerung": 2
          },
          "hinweis": "Unabhängigkeit ist der Maßstab der Person. Frag, wie unabhängig die Quelle wirklich ist: Wer finanziert sie, was passiert mit Widerspruch, wer verdient an der Empörung?"
        },
        {
          "id": "qu3b",
          "text": "Weil Menschen, die die Person kennt und schätzt, diese Quellen teilen",
          "gewichte": {
            "zugehoerigkeit": 2
          },
          "hinweis": "Vertrauen läuft bei der Person über Menschen. Wer respektiert wird und anders denkt, ist glaubwürdiger als jede Statistik; ermögliche solche Begegnungen."
        },
        {
          "id": "qu3c",
          "text": "Weil die Quellen bestätigen, was die Person selbst erlebt hat",
          "gewichte": {
            "gerechtigkeit-abgehaengt": 1,
            "identitaet-heimat": 1
          }
        },
        {
          "id": "qu3d",
          "text": "Weil die Leute dort „Klartext“ reden und mutig wirken",
          "gewichte": {
            "anerkennung": 1,
            "protest-wut": 1
          }
        },
        {
          "id": "qu3e",
          "text": "Die Person prüft tatsächlich Belege und Gegenpositionen",
          "gewichte": {},
          "skalen": {
            "offenheit": 3
          },
          "hinweis": "Hier trägt Sachlichkeit. Prüft gemeinsam Quellen mit denselben Maßstäben auf beiden Seiten, respektvoll und ohne Besserwisserei."
        },
        {
          "id": "qu3f",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "qu4",
      "bereich": "quellen",
      "typ": "single",
      "text": "Spricht die Person in eigenen Worten oder übernimmt sie Begriffe und Sätze aus ihren Kanälen?",
      "warum": "Übernommene Formeln zeigen, wie weit die Erzählung eigenes Denken ersetzt hat; Szenebegriffe markieren Nähe zu Milieus über die Partei hinaus (MBR 2025, Pfeiffer 2024). Danach richtet sich, ob du nach eigenen Worten fragst oder eine Grenze setzen musst.",
      "optionen": [
        {
          "id": "qu4a",
          "text": "Meist eigene Worte und eigene Beispiele",
          "gewichte": {},
          "skalen": {
            "offenheit": 3
          },
          "hinweis": "Die Person denkt selbst. Fragen nach eigenen Beispielen und Erlebnissen finden Anschluss; du musst keine Videos widerlegen."
        },
        {
          "id": "qu4b",
          "text": "Einzelne Schlagworte wie „Altparteien“, „Mainstream“ oder „Systemmedien“",
          "gewichte": {
            "misstrauen": 1
          },
          "skalen": {
            "offenheit": 2
          }
        },
        {
          "id": "qu4c",
          "text": "Ganze Argumentketten, die ich aus Videos oder Posts wiedererkenne",
          "gewichte": {
            "misstrauen": 1,
            "zugehoerigkeit": 1
          },
          "skalen": {
            "offenheit": 1
          },
          "hinweis": "Bitte die Person, es in eigenen Worten zu erklären: „Wie würdest du das jemandem sagen, der das Video nicht kennt?“ Eigene Worte bringen eigenes Denken zurück."
        },
        {
          "id": "qu4d",
          "text": "Szenebegriffe wie „Remigration“, „Umvolkung“ oder „Globalisten“",
          "gewichte": {
            "identitaet-heimat": 2,
            "misstrauen": 1
          },
          "skalen": {
            "offenheit": 0,
            "verschwoerung": 2
          },
          "hinweis": "Diese Begriffe tragen völkische oder antisemitische Erzählungen, oft ohne dass die Person es so meint. Benenne ruhig, was du hörst, setz eine Grenze und lass dir die Begriffe bei einer Mobilen Beratung erklären."
        },
        {
          "id": "qu4e",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "qu5",
      "bereich": "quellen",
      "typ": "multi",
      "text": "Welche Art von Inhalten zeigt oder schickt dir die Person am häufigsten?",
      "warum": "Die Form der Inhalte verrät das Bedürfnis dahinter und bestimmt deine Antwort: Einzelfall-Videos sprechen Angst an und lassen sich nicht mit Statistik beantworten, Spott sucht Zustimmung, Enthüllungen versprechen Durchblick (Lewandowsky/Cook 2020).",
      "optionen": [
        {
          "id": "qu5a",
          "text": "Einzelfälle: Videos von Straftaten, Vorfällen, Ausschreitungen",
          "gewichte": {
            "kontrolle-angst": 2
          },
          "hinweis": "Einzelfälle wecken Angst, Statistik löscht sie nicht. Reagiere auf das Gefühl („Das hat dich erschreckt?“) und frag, was die Person vor Ort selbst erlebt."
        },
        {
          "id": "qu5b",
          "text": "Spott: Memes, Versprecher, Pannen von Politiker:innen",
          "gewichte": {
            "protest-wut": 2
          },
          "hinweis": "Spott sucht Komplizenschaft. Nicht mitlachen, nicht empören; frag ruhig, was die Person an den Verspotteten wirklich stört."
        },
        {
          "id": "qu5c",
          "text": "Enthüllungen: „Was man uns verschweigt“",
          "gewichte": {
            "misstrauen": 2
          },
          "skalen": {
            "verschwoerung": 2
          },
          "hinweis": "Enthüllungen bedienen das Bedürfnis nach Durchblick. Frag nach der Mechanik: Wer verdient daran, dass sich die Person getäuscht fühlt?"
        },
        {
          "id": "qu5d",
          "text": "Reden und Auftritte von Leuten aus der Partei",
          "gewichte": {
            "zugehoerigkeit": 2,
            "identitaet-heimat": 1
          },
          "hinweis": "Die Person teilt Zugehörigkeit, nicht Argumente. Frag, was an dem Auftritt überzeugt; oft ist es der Ton, nicht der Inhalt."
        },
        {
          "id": "qu5e",
          "text": "Zahlen, Grafiken und Vergleiche",
          "gewichte": {
            "gerechtigkeit-abgehaengt": 1
          },
          "skalen": {
            "offenheit": 2
          },
          "hinweis": "Bei Zahlen trägt gemeinsames Prüfen: Quelle, Zeitraum, Vergleichsgruppe. Respektvoll und mit denselben Maßstäben für beide Seiten."
        },
        {
          "id": "qu5f",
          "text": "Lokales: Vorfälle und Entscheidungen aus Ort oder Region",
          "gewichte": {
            "identitaet-heimat": 2
          },
          "hinweis": "Lokales ist überprüfbar und gemeinsamer Boden. Geht hin, fragt nach, besucht die Bürgerfragestunde; vor Ort zerfällt manche Erzählung von selbst."
        },
        {
          "id": "qu5g",
          "text": "Die Person schickt oder zeigt mir nichts",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "qu6",
      "bereich": "quellen",
      "typ": "single",
      "text": "Wie spricht die Person über Algorithmen, Empfehlungen und das, was ihr der Feed zeigt?",
      "warum": "Prebunking und Medienmechanik wirken stärker als nachträgliche Gegenargumente (O’Mahony et al. 2023), aber nur, wenn die Person die Mechanik als Thema zulässt. Wer gezielte Unterdrückung der eigenen Seite annimmt, denkt bereits verschwörungsförmig.",
      "optionen": [
        {
          "id": "qu6a",
          "text": "Das Thema ist der Person fremd, der Feed ist für sie „die Nachrichten“",
          "gewichte": {},
          "skalen": {
            "offenheit": 2
          },
          "hinweis": "Hier lohnt gemeinsames Hinschauen: Zeig an deinem eigenen Handy, wie sich ein Feed nach ein paar Klicks verändert. Keine Belehrung, ein Experiment."
        },
        {
          "id": "qu6b",
          "text": "Die Person kennt das Prinzip, hält ihre Kanäle aber für die Ausnahme",
          "gewichte": {
            "misstrauen": 1
          },
          "skalen": {
            "offenheit": 1
          }
        },
        {
          "id": "qu6c",
          "text": "Die Person glaubt, Plattformen und Staat unterdrücken gezielt ihre Seite",
          "gewichte": {
            "misstrauen": 2,
            "protest-wut": 1
          },
          "skalen": {
            "verschwoerung": 3,
            "offenheit": 0
          },
          "hinweis": "Zensurglaube ist Teil der Erzählung; jede Einschränkung bestätigt ihn. Lenke auf die Erzählung selbst: Wer profitiert davon, dass sich die Person unterdrückt fühlt?"
        },
        {
          "id": "qu6d",
          "text": "Die Person ist selbst kritisch und hat schon Kanäle abbestellt",
          "gewichte": {},
          "skalen": {
            "offenheit": 3
          },
          "hinweis": "Die Person reguliert sich selbst. Frag, was den Ausschlag gab; solche Momente sind Vorbilder für weitere Zweifel."
        },
        {
          "id": "qu6e",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "qu7",
      "bereich": "quellen",
      "typ": "single",
      "text": "Gibt es jemanden oder ein Medium, dem ihr beide vertraut, du und die Person?",
      "warum": "Korrekturen wirken nur aus Quellen, die das Gegenüber anerkennt; glaubwürdige Botschafter:innen wie Aussteiger:innen oder respektierte Bekannte sind die wirksamste Brücke (Lewandowsky/Cook 2020). Ohne gemeinsame Quelle wird jeder Link zum Angriff.",
      "optionen": [
        {
          "id": "qu7a",
          "text": "Ja, einen Menschen: Bekannte, Fachkraft, Aussteiger:in",
          "gewichte": {},
          "skalen": {
            "kapital": 2
          },
          "hinweis": "Dieser Mensch ist deine wichtigste Brücke. Nicht instrumentalisieren, aber Begegnungen ermöglichen und seine Sicht im Gespräch erwähnen."
        },
        {
          "id": "qu7b",
          "text": "Ja, ein Medium: Lokalzeitung, Regionalsender, Fachportal",
          "gewichte": {},
          "skalen": {
            "kapital": 1
          },
          "hinweis": "Nutze nur diese Quelle, wenn du etwas belegen willst. Alles andere wird als Teil des Systems abgewehrt."
        },
        {
          "id": "qu7c",
          "text": "Nein, die Person lehnt alles ab, was ich nenne",
          "gewichte": {
            "misstrauen": 3
          },
          "skalen": {
            "verschwoerung": 2,
            "kapital": 0
          },
          "hinweis": "Ohne gemeinsame Quelle sind Faktenduelle sinnlos. Baue erst Vertrauen in dich als Person auf und arbeite mit Fragen, nicht mit Links."
        },
        {
          "id": "qu7d",
          "text": "Habe ich nie gefragt",
          "gewichte": {},
          "hinweis": "Frag es direkt: „Wem würdest du glauben, wenn der das Gegenteil sagt?“ Die Antwort spart dir viele vergebliche Links."
        }
      ]
    },
    {
      "id": "wi1",
      "bereich": "widerspruch",
      "typ": "single",
      "text": "Wie reagiert die Person, wenn du ruhig nachfragst, etwa „Wie kommst du darauf?“ oder „Wen meinst du genau?“",
      "warum": "Offene Nachfragen sind das Kernwerkzeug der Beratungsstellen (KAST, MBR) und der Street Epistemology. Ob die Person erklärt, abblockt oder eine Prüfung wittert, entscheidet, ob du mit Fragen arbeiten kannst oder erst Vertrauen aufbauen musst.",
      "optionen": [
        {
          "id": "wi1a",
          "text": "Die Person erklärt in eigenen Worten, was sie meint",
          "gewichte": {},
          "skalen": {
            "offenheit": 3
          },
          "hinweis": "Gute Basis: Die Person denkt mit, wenn man fragt. Bleib bei Fragen statt bei Belegen und fass zusammen, was du gehört hast."
        },
        {
          "id": "wi1b",
          "text": "Die Person wiederholt die Parole, nur lauter",
          "gewichte": {
            "protest-wut": 1
          },
          "skalen": {
            "offenheit": 1
          }
        },
        {
          "id": "wi1c",
          "text": "Die Person fühlt sich geprüft und wird misstrauisch",
          "gewichte": {
            "misstrauen": 2
          },
          "skalen": {
            "offenheit": 1
          },
          "hinweis": "Fragen wirken auf die Person wie ein Verhör. Frag seltener, erzähl mehr von dir und sag offen, warum du etwas wissen willst."
        },
        {
          "id": "wi1d",
          "text": "Die Person springt zu einem anderen Aufreger",
          "gewichte": {},
          "skalen": {
            "offenheit": 1
          }
        },
        {
          "id": "wi1e",
          "text": "Die Person gibt zu, es nicht genau zu wissen",
          "gewichte": {},
          "skalen": {
            "offenheit": 3
          },
          "hinweis": "Die Person kann Unsicherheit aushalten. Das ist der Moment für gemeinsames Nachschauen, nicht für ein Triumphgefühl."
        },
        {
          "id": "wi1f",
          "text": "Habe ich so noch nicht probiert",
          "gewichte": {},
          "hinweis": "Probiere eine einzige ruhige Nachfrage pro Gespräch. Nicht widerlegen, nur verstehen wollen."
        }
      ]
    },
    {
      "id": "wi2",
      "bereich": "widerspruch",
      "typ": "single",
      "text": "Was passiert, wenn du der Person eine eigene Erfahrung erzählst, die zu ihrer Sicht nicht passt?",
      "warum": "Nicht wertender Austausch von Erfahrungen verschiebt Einstellungen über Monate, reine Argumente nicht (Kalla/Broockman 2020). Die Reaktion auf Erzählungen zeigt, ob dieser am besten belegte Zugang bei der Person offensteht.",
      "optionen": [
        {
          "id": "wi2a",
          "text": "Die Person hört zu und fragt nach",
          "gewichte": {},
          "skalen": {
            "offenheit": 3,
            "kapital": 2
          },
          "hinweis": "Erzählen trägt bei der Person. Mehr Geschichten von konkreten Menschen, weniger Zahlen und Links."
        },
        {
          "id": "wi2b",
          "text": "„Das ist die Ausnahme.“ Die Person hört zu, aber es ändert nichts",
          "gewichte": {},
          "skalen": {
            "offenheit": 2
          },
          "hinweis": "Das ist normal, Erzählungen wirken verzögert. Wiederhole die Geschichte gelegentlich, ohne daraus ein Argument zu machen."
        },
        {
          "id": "wi2c",
          "text": "Die Person zählt sofort Gegenbeispiele auf",
          "gewichte": {
            "protest-wut": 1
          },
          "skalen": {
            "offenheit": 1
          }
        },
        {
          "id": "wi2d",
          "text": "Die Person wertet die Menschen in der Geschichte ab",
          "gewichte": {
            "identitaet-heimat": 1
          },
          "skalen": {
            "offenheit": 0
          },
          "hinweis": "Setz hier eine ruhige Grenze: Über konkrete Menschen redest du nicht abfällig. Die Beziehung bleibt, das Gespräch endet für heute."
        },
        {
          "id": "wi2e",
          "text": "Habe ich noch nie probiert",
          "gewichte": {},
          "hinweis": "Probiere es: eine kurze, echte Geschichte aus deinem Leben, ohne Moral am Ende. Danach fragen, ob die Person Ähnliches kennt."
        }
      ]
    },
    {
      "id": "wi3",
      "bereich": "widerspruch",
      "typ": "single",
      "text": "Fragt dich die Person von sich aus, wie du etwas siehst?",
      "warum": "Neugier auf deine Sicht ist das sichtbarste Zeichen von Gesprächsoffenheit und Vertrauen in dich. Fehlt diese Neugier, läuft das Gespräch einseitig, und du musst zuerst zuhören und spiegeln, bevor du selbst etwas sagst (Itzchakov et al. 2017).",
      "optionen": [
        {
          "id": "wi3a",
          "text": "Ja, und die Person hört sich die Antwort auch an",
          "gewichte": {},
          "skalen": {
            "offenheit": 3,
            "kapital": 2
          },
          "hinweis": "Nutze das: Sag ehrlich, wie du es siehst, in Ich-Form und ohne Etikett. Die Person hat dich eingeladen."
        },
        {
          "id": "wi3b",
          "text": "Ja, aber nur, um dann zu widerlegen",
          "gewichte": {
            "anerkennung": 1
          },
          "skalen": {
            "offenheit": 1
          }
        },
        {
          "id": "wi3c",
          "text": "Selten, meist redet die Person",
          "gewichte": {},
          "skalen": {
            "offenheit": 1
          }
        },
        {
          "id": "wi3d",
          "text": "Nein, nie",
          "gewichte": {},
          "skalen": {
            "offenheit": 0
          },
          "hinweis": "Einseitige Gespräche kippen schnell. Vereinbart einen Wechsel: erst die Person zehn Minuten, dann du, ohne Unterbrechung."
        },
        {
          "id": "wi3e",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "wi4",
      "bereich": "widerspruch",
      "typ": "multi",
      "text": "Was passiert, wenn du mit der Person bei einem einzigen Punkt bleiben willst?",
      "warum": "Parolen-Hopping und Linkfluten sind die häufigsten Gründe, warum Gespräche scheitern (MBR, KAST). Ob die Person beim Thema bleiben kann, entscheidet, ob du vorab eine Ein-Thema-Regel vereinbaren musst.",
      "optionen": [
        {
          "id": "wi4a",
          "text": "Die Person bleibt dabei und geht ins Detail",
          "gewichte": {},
          "skalen": {
            "offenheit": 3
          }
        },
        {
          "id": "wi4b",
          "text": "Die Person springt zum nächsten Aufreger",
          "gewichte": {
            "protest-wut": 1
          },
          "skalen": {
            "offenheit": 1
          },
          "hinweis": "Parolen-Hopping. Vereinbart vorher: ein Thema pro Gespräch. Sag freundlich „Lass uns bei dem einen Punkt bleiben“, so oft es nötig ist."
        },
        {
          "id": "wi4c",
          "text": "Die Person holt Videos oder Links aufs Handy",
          "gewichte": {
            "misstrauen": 1
          },
          "skalen": {
            "offenheit": 1
          },
          "hinweis": "Linkflut nicht erwidern. Schaut euch ein einziges Beispiel gemeinsam an und frag, woran man erkennen würde, dass es stimmt."
        },
        {
          "id": "wi4d",
          "text": "Die Person bricht ab: „Das hat keinen Sinn mit dir.“",
          "gewichte": {},
          "skalen": {
            "offenheit": 0
          },
          "hinweis": "Abbruch ist Abwehr, nicht Ablehnung von dir. Lass es stehen, bleib im Kontakt und komm nach Tagen ohne das Thema zurück."
        },
        {
          "id": "wi4e",
          "text": "Die Person wird persönlich und greift dich an",
          "gewichte": {
            "protest-wut": 2
          },
          "skalen": {
            "offenheit": 0
          }
        },
        {
          "id": "wi4f",
          "text": "Habe ich noch nicht versucht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "wi5",
      "bereich": "widerspruch",
      "typ": "single",
      "text": "Wie reagiert die Person, wenn du deine eigene Haltung klar sagst, ohne sie anzugreifen?",
      "warum": "Praxiskonsens: Position zeigen bei Wertschätzung der Person, denn Schweigen wird als Zustimmung gelesen. Die Reaktion auf offenen Dissens zeigt, ob Verschiedenheit in eurer Beziehung Platz hat oder Reaktanz auslöst.",
      "optionen": [
        {
          "id": "wi5a",
          "text": "Die Person akzeptiert, dass wir verschieden denken",
          "gewichte": {},
          "skalen": {
            "offenheit": 3,
            "kapital": 3
          },
          "hinweis": "Eure Beziehung trägt Dissens. Du kannst Haltung und Grenzen klar benennen, ohne die Verbindung zu riskieren."
        },
        {
          "id": "wi5b",
          "text": "Die Person versucht, mich zu überzeugen, bleibt aber freundlich",
          "gewichte": {},
          "skalen": {
            "offenheit": 2,
            "kapital": 2
          }
        },
        {
          "id": "wi5c",
          "text": "Die Person wertet mich ab: naiv, Gutmensch, Schlafschaf",
          "gewichte": {
            "protest-wut": 1,
            "misstrauen": 1
          },
          "skalen": {
            "offenheit": 1
          },
          "hinweis": "Benenne die Abwertung ruhig als Grenze. Abwerten ist hier Schutz. Frag später, was die Person an deiner Sicht so stört."
        },
        {
          "id": "wi5d",
          "text": "Die Person zieht sich zurück und geht auf Abstand",
          "gewichte": {
            "zugehoerigkeit": 1
          },
          "skalen": {
            "offenheit": 1,
            "kapital": 1
          },
          "hinweis": "Rückzug nach Dissens: Melde dich ohne das Thema und zeig, dass die Beziehung nicht von Zustimmung abhängt."
        },
        {
          "id": "wi5e",
          "text": "Ich habe meine Haltung noch nie klar gesagt",
          "gewichte": {},
          "hinweis": "Sag es einmal ruhig und kurz: „Ich sehe das anders, und ich bleibe.“ Deine sichtbare Haltung wirkt stärker als jedes Argument."
        }
      ]
    },
    {
      "id": "wi6",
      "bereich": "widerspruch",
      "typ": "single",
      "text": "Äußert die Person selbst manchmal Kritik an der Partei oder an Leuten aus ihrem politischen Umfeld?",
      "warum": "Eigene Kritik an der Partei ist geäußerte Ambivalenz und das stärkste Öffnungssignal (Priester/Petty 1996; DJI-Distanzierungskriterien). Ob die Person nur Taktik oder auch Inhalte kritisiert, zeigt, wo du anknüpfen kannst, ohne dass sie verteidigen muss.",
      "optionen": [
        {
          "id": "wi6a",
          "text": "Ja, offen und konkret, auch bei Inhalten",
          "gewichte": {},
          "skalen": {
            "offenheit": 3
          },
          "hinweis": "Greif die eigene Kritik der Person auf und frag nach, ohne zu verstärken. Die Grenze darf die Person selbst ziehen; dein Nachlegen würde sie wieder in die Verteidigung bringen."
        },
        {
          "id": "wi6b",
          "text": "Nur an Taktik oder Personal: „Die machen es falsch, aber die Richtung stimmt.“",
          "gewichte": {
            "identitaet-heimat": 1
          },
          "skalen": {
            "offenheit": 2
          }
        },
        {
          "id": "wi6c",
          "text": "Nur unter vier Augen, vor anderen verteidigt die Person alles",
          "gewichte": {
            "zugehoerigkeit": 2
          },
          "skalen": {
            "offenheit": 2
          },
          "hinweis": "Die Zweifel sind da, aber an Loyalität gebunden. Sprich nur zu zweit darüber und verlange nie, dass die Person vor anderen Abstand zeigt."
        },
        {
          "id": "wi6d",
          "text": "Nur, dass die Partei zu zahm sei",
          "gewichte": {
            "protest-wut": 2
          },
          "skalen": {
            "offenheit": 0
          },
          "hinweis": "Kritik von der radikaleren Seite ist kein Öffnungssignal. Frag nach dem Bedürfnis hinter der Härte, nicht nach der Position; bei Gewaltnähe Fachberatung einbeziehen."
        },
        {
          "id": "wi6e",
          "text": "Nein, die Person verteidigt alles, auch Widersprüchliches",
          "gewichte": {
            "zugehoerigkeit": 2
          },
          "skalen": {
            "offenheit": 0
          }
        },
        {
          "id": "wi6f",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "wi7",
      "bereich": "widerspruch",
      "typ": "single",
      "text": "Was passiert nach einem Gespräch, in dem die Person einen Zweifel zugelassen hat?",
      "warum": "Zweifel verfallen nach Tagen (Coppock 2017) oder werden mit Loyalitätsbekundung überdeckt, dem Doubling down. Was danach passiert, zeigt, ob du Zweifel nur stehen lassen oder behutsam wieder aufgreifen solltest.",
      "optionen": [
        {
          "id": "wi7a",
          "text": "Die Person kommt von sich aus darauf zurück",
          "gewichte": {},
          "skalen": {
            "offenheit": 3,
            "kapital": 2
          },
          "hinweis": "Die Person arbeitet weiter daran. Nicht drängen; frag nur, was seither durch den Kopf gegangen ist."
        },
        {
          "id": "wi7b",
          "text": "Beim nächsten Mal ist alles wie vorher",
          "gewichte": {},
          "skalen": {
            "offenheit": 2
          },
          "hinweis": "Normal, Zweifel verfallen schnell. Greif ihn nach ein paar Wochen ohne Druck wieder auf: „Du hattest neulich gesagt, dass …“"
        },
        {
          "id": "wi7c",
          "text": "Die Person verteidigt die Partei danach noch stärker",
          "gewichte": {
            "zugehoerigkeit": 2
          },
          "skalen": {
            "offenheit": 0
          },
          "hinweis": "Doubling down: Der Zweifel hat Angst gemacht. Zweifel nie als Sieg behandeln, nur stehen lassen, und die Beziehung betonen."
        },
        {
          "id": "wi7d",
          "text": "Die Person hat bisher nie gezweifelt",
          "gewichte": {},
          "skalen": {
            "offenheit": 0
          }
        },
        {
          "id": "wi7e",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "vs1",
      "bereich": "verschwoerung",
      "typ": "single",
      "text": "Wenn etwas Unerwartetes passiert, etwa eine Krise, ein Unglück oder ein Wahlergebnis: Wie erklärt es die Person?",
      "warum": "„Nichts geschieht durch Zufall“ ist das Kernmuster der Verschwörungsmentalität (Imhoff et al. 2022). Es trennt konkrete Unzufriedenheit von einem Deutungsmuster, an dem Fakten abprallen, und bestimmt, ob du über Inhalte oder über die Erzählung selbst sprichst.",
      "optionen": [
        {
          "id": "vs1a",
          "text": "Als Zufall, Fehler oder Pech, wie die meisten Leute",
          "gewichte": {},
          "skalen": {
            "verschwoerung": 0
          }
        },
        {
          "id": "vs1b",
          "text": "Als Versagen oder Eigeninteresse konkreter Politiker:innen",
          "gewichte": {
            "protest-wut": 1
          },
          "skalen": {
            "verschwoerung": 1
          }
        },
        {
          "id": "vs1c",
          "text": "Als Absicht: „Das war kein Zufall, das war geplant.“",
          "gewichte": {
            "misstrauen": 2
          },
          "skalen": {
            "verschwoerung": 3
          },
          "hinweis": "Hier hilft kein Faktencheck. Frag nach der Erzählung selbst: Wer müsste da alles mitmachen? Woran würde man merken, dass es nicht stimmt?"
        },
        {
          "id": "vs1d",
          "text": "Je nach Thema mal so, mal so",
          "gewichte": {
            "misstrauen": 1
          },
          "skalen": {
            "verschwoerung": 1
          }
        },
        {
          "id": "vs1e",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "vs2",
      "bereich": "verschwoerung",
      "typ": "multi",
      "text": "Wem traut die Person zu, bei strittigen Fragen die Wahrheit zu sagen?",
      "warum": "Verschwörungsdenken ist vor allem verlagertes Vertrauen. Wohin es gewandert ist, entscheidet, welche Boten und Quellen bei der Person überhaupt ankommen (Handbuch Verschwörungsmythen: vertrauenswürdige Botschafter statt Gegenargumente).",
      "optionen": [
        {
          "id": "vs2a",
          "text": "Fachleuten, wenn sie unabhängig wirken",
          "gewichte": {},
          "skalen": {
            "verschwoerung": 0,
            "offenheit": 2
          }
        },
        {
          "id": "vs2b",
          "text": "Menschen, die die Person persönlich kennt",
          "gewichte": {
            "zugehoerigkeit": 1
          },
          "skalen": {
            "verschwoerung": 1
          },
          "hinweis": "Das Vertrauen ist persönlich. Du und andere aus dem Umfeld der Person seid die glaubwürdigsten Boten, keine Studie und kein Link."
        },
        {
          "id": "vs2c",
          "text": "Einzelnen Kanälen oder Erklärern, die „es wagen“",
          "gewichte": {
            "misstrauen": 2
          },
          "skalen": {
            "verschwoerung": 2
          },
          "hinweis": "Frag nicht, ob der Kanal lügt, sondern wovon er lebt: Reichweite, Spenden, Produkte. Mechanik statt Inhalt."
        },
        {
          "id": "vs2d",
          "text": "Aussteiger:innen und Menschen, die „es selbst erlebt haben“",
          "gewichte": {
            "misstrauen": 1
          },
          "skalen": {
            "verschwoerung": 1
          },
          "hinweis": "Aussteigerberichte und persönliche Erfahrung erreichen die Person. Solche Geschichten sind dein bester Zugang."
        },
        {
          "id": "vs2e",
          "text": "Nur sich selbst: „Ich habe recherchiert.“",
          "gewichte": {
            "anerkennung": 2
          },
          "skalen": {
            "verschwoerung": 2
          },
          "hinweis": "Würdige, dass die Person selbst denken will, und lade sie ein, dieselbe Strenge auf beide Seiten anzuwenden."
        },
        {
          "id": "vs2f",
          "text": "Niemandem mehr: „Alle lügen.“",
          "gewichte": {
            "misstrauen": 3
          },
          "skalen": {
            "verschwoerung": 3
          },
          "hinweis": "Generalisiertes Misstrauen ist ohne Beziehung nicht erreichbar. Erst Vertrauen in dich als Person, lange bevor es um Inhalte geht."
        },
        {
          "id": "vs2g",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "vs3",
      "bereich": "verschwoerung",
      "typ": "single",
      "text": "Wie geht die Person mit Informationen um, bevor sie diese weitergibt?",
      "warum": "Asymmetrisches Prüfen ist Bestätigungsdenken: Was passt, wird geteilt, was stört, wird zerpflückt. Inokulation gegen Manipulationstechniken wirkt deutlich stärker als nachträgliche Korrektur (O’Mahony et al. 2023).",
      "optionen": [
        {
          "id": "vs3a",
          "text": "Die Person prüft Quellen, auch bei Dingen, die ihr gefallen",
          "gewichte": {},
          "skalen": {
            "verschwoerung": 0,
            "offenheit": 2
          }
        },
        {
          "id": "vs3b",
          "text": "Die Person prüft nur, was ihr nicht passt",
          "gewichte": {
            "misstrauen": 1
          },
          "skalen": {
            "verschwoerung": 2
          },
          "hinweis": "Prüft gemeinsam einmal etwas, das der Person gefällt, mit denselben Fragen. Nicht als Falle, sondern als Spiel mit offenem Ausgang."
        },
        {
          "id": "vs3c",
          "text": "Die Person teilt sofort weiter, was ins Bild passt",
          "gewichte": {
            "zugehoerigkeit": 1
          },
          "skalen": {
            "verschwoerung": 2
          },
          "hinweis": "Prebunking: Sprecht über die Tricks, mit denen Beiträge Empörung erzeugen, bevor der nächste kommt. Das wirkt besser als jedes Dementi."
        },
        {
          "id": "vs3d",
          "text": "Die Person fragt nicht nach Quellen, sondern ob es sich richtig anfühlt",
          "gewichte": {
            "misstrauen": 1
          },
          "skalen": {
            "verschwoerung": 2
          }
        },
        {
          "id": "vs3e",
          "text": "Die Person gibt kaum etwas weiter",
          "gewichte": {},
          "skalen": {
            "verschwoerung": 0
          }
        },
        {
          "id": "vs3f",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "vs4",
      "bereich": "verschwoerung",
      "typ": "single",
      "text": "Wie geht die Person damit um, wenn eine ihrer Vorhersagen nicht eingetreten ist?",
      "warum": "Nicht eingetroffene Vorhersagen sind der Lackmustest für Weltbild-Geschlossenheit: Wer Gegenbelege in die Erzählung einbaut, ist mit Fakten nicht erreichbar (Warnsignal nach Swire-Thompson et al. 2020); wer einräumt, ist für Fragen offen.",
      "optionen": [
        {
          "id": "vs4a",
          "text": "Die Person räumt es ein, manchmal sogar mit Humor",
          "gewichte": {},
          "skalen": {
            "verschwoerung": 0,
            "offenheit": 3
          },
          "hinweis": "Die Person kann Irrtum zugeben. Die Frage „Was müsste passieren, damit du zweifelst?“ ist hier erlaubt und wirkt."
        },
        {
          "id": "vs4b",
          "text": "Die Person spricht einfach nicht mehr davon",
          "gewichte": {},
          "skalen": {
            "verschwoerung": 1,
            "offenheit": 1
          }
        },
        {
          "id": "vs4c",
          "text": "„Das kommt noch, nur später.“",
          "gewichte": {
            "kontrolle-angst": 1
          },
          "skalen": {
            "verschwoerung": 2
          }
        },
        {
          "id": "vs4d",
          "text": "„Die haben es vertuscht oder verhindert, weil wir es aufgedeckt haben.“",
          "gewichte": {
            "misstrauen": 2
          },
          "skalen": {
            "verschwoerung": 3,
            "offenheit": 0
          },
          "hinweis": "Selbstabdichtende Erklärung: Jeder Gegenbeleg bestätigt die Verschwörung. Keine Faktenduelle mehr. Frag nach dem Bedürfnis dahinter und halte die Beziehung."
        },
        {
          "id": "vs4e",
          "text": "Mir ist keine solche Vorhersage bekannt",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "vs5",
      "bereich": "verschwoerung",
      "typ": "multi",
      "text": "Wenn die Person von „denen“ spricht, die angeblich im Hintergrund steuern: Wen meint sie?",
      "warum": "Vom diffusen Elitenmisstrauen zu benannten Drahtziehern führt der Weg in geschlossene Erzählungen; bei Chiffren wie „Globalisten“ laufen antisemitische Codes mit. Dort ist eine klare Grenze nötig, keine Diskussion (MBR, Praxiskonsens).",
      "optionen": [
        {
          "id": "vs5a",
          "text": "Die Person spricht nicht von Steuerung im Hintergrund",
          "gewichte": {},
          "skalen": {
            "verschwoerung": 0
          }
        },
        {
          "id": "vs5b",
          "text": "Konkrete Politiker:innen, Parteien oder die Regierung",
          "gewichte": {
            "protest-wut": 1
          },
          "skalen": {
            "verschwoerung": 1
          }
        },
        {
          "id": "vs5c",
          "text": "„Die Medien“ als einen Block",
          "gewichte": {
            "misstrauen": 2
          },
          "skalen": {
            "verschwoerung": 2
          }
        },
        {
          "id": "vs5d",
          "text": "Vage: „irgendwer da oben“, „das System“",
          "gewichte": {
            "misstrauen": 1,
            "protest-wut": 1
          },
          "skalen": {
            "verschwoerung": 2
          },
          "hinweis": "Frag konkret: Wer genau? Wie würde das praktisch gehen? Vage Erzählungen zerfallen oft an der eigenen Konkretisierung."
        },
        {
          "id": "vs5e",
          "text": "„Eliten“, „Globalisten“, „Soros“, „die Finanzwelt“",
          "gewichte": {
            "misstrauen": 2
          },
          "skalen": {
            "verschwoerung": 3
          },
          "hinweis": "Hier laufen antisemitische Codes mit, oft ohne dass die Person es so meint. Benenne ruhig, was du hörst, und setz eine Grenze. Nicht diskutieren, sondern erklären, warum du da aussteigst."
        },
        {
          "id": "vs5f",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "vs6",
      "bereich": "verschwoerung",
      "typ": "single",
      "text": "Wie wirkt die Person, wenn sie über „die Wahrheit hinter den Dingen“ spricht?",
      "warum": "Verschwörungserzählungen erfüllen Bedürfnisse: Durchblick, Bedeutung, Zugehörigkeit oder Schutz vor Angst. Das Handbuch Verschwörungsmythen rät, Beweggründe zu verstehen, bevor man widerlegt. Das Gefühl beim Erzählen zeigt den Beweggrund.",
      "optionen": [
        {
          "id": "vs6a",
          "text": "Empört und aufgebracht",
          "gewichte": {
            "protest-wut": 2
          },
          "skalen": {
            "verschwoerung": 1
          }
        },
        {
          "id": "vs6b",
          "text": "Stolz, eingeweiht, den anderen voraus",
          "gewichte": {
            "anerkennung": 2
          },
          "skalen": {
            "verschwoerung": 2
          },
          "hinweis": "Die Erzählung gibt der Person Bedeutsamkeit. Wer die Erzählung wegnimmt, muss etwas anbieten: eine Rolle, in der das Wissen oder die Erfahrung der Person zählt."
        },
        {
          "id": "vs6c",
          "text": "Ängstlich und bedrückt",
          "gewichte": {
            "kontrolle-angst": 2
          },
          "skalen": {
            "verschwoerung": 1
          },
          "hinweis": "Hinter der Erzählung steht Angst. Beruhigen hilft mehr als widerlegen: Was gibt der Person Sicherheit, was kannst du verlässlich zusagen?"
        },
        {
          "id": "vs6d",
          "text": "Verbunden mit anderen: „Wir haben es durchschaut.“",
          "gewichte": {
            "zugehoerigkeit": 2
          },
          "skalen": {
            "verschwoerung": 2
          },
          "hinweis": "Die Erzählung ist für die Person Gemeinschaft; Angriffe darauf treffen ihre Freunde. Baue Gemeinschaft außerhalb auf, bevor du über Inhalte sprichst."
        },
        {
          "id": "vs6e",
          "text": "Gelassen, eher wie ein Hobby",
          "gewichte": {},
          "skalen": {
            "verschwoerung": 1
          }
        },
        {
          "id": "vs6f",
          "text": "Die Person spricht nicht so",
          "gewichte": {},
          "skalen": {
            "verschwoerung": 0
          }
        }
      ]
    },
    {
      "id": "vs7",
      "bereich": "verschwoerung",
      "typ": "multi",
      "text": "Hat das Misstrauen der Person schon Folgen im Alltag?",
      "warum": "Verhaltensfolgen trennen eine Mentalität von einer Lebensführung und markieren den Umsteigepunkt von privaten Gesprächen zu Fachberatung, besonders bei Reichsbürger-Bezug (Praxis der Beratungsstellen, Fachstelle Rechtsextremismus und Familie).",
      "optionen": [
        {
          "id": "vs7a",
          "text": "Nein, es bleibt beim Reden",
          "gewichte": {},
          "skalen": {
            "verschwoerung": 1
          }
        },
        {
          "id": "vs7b",
          "text": "Die Person meidet Ärzte, Vorsorge oder Behörden",
          "gewichte": {
            "misstrauen": 2
          },
          "skalen": {
            "verschwoerung": 2
          },
          "hinweis": "Nicht missionieren, aber die eigene Norm sichtbar machen: „Ich gehe hin, und ich bleibe an deiner Seite.“ Normen naher Menschen wirken (Winter et al. 2022)."
        },
        {
          "id": "vs7c",
          "text": "Die Person bereitet sich auf einen Zusammenbruch vor: Vorräte, Bargeld, Rückzugspläne",
          "gewichte": {
            "kontrolle-angst": 2
          },
          "skalen": {
            "verschwoerung": 3
          }
        },
        {
          "id": "vs7d",
          "text": "Die Person erkennt den Staat nicht mehr an: Bescheide ignoriert, Reichsbürger-Begriffe",
          "gewichte": {
            "misstrauen": 2
          },
          "skalen": {
            "verschwoerung": 3,
            "belastung": 2
          },
          "hinweis": "Reichsbürger-Bezug ist ein Fall für Fachberatung, nicht für Privatdiskussion. Mobile Beratung oder Fachstelle Rechtsextremismus und Familie einbeziehen."
        },
        {
          "id": "vs7e",
          "text": "Die Person hat Kontakte abgebrochen, die „nicht aufgewacht“ sind",
          "gewichte": {
            "zugehoerigkeit": 2
          },
          "skalen": {
            "verschwoerung": 2,
            "belastung": 1
          },
          "hinweis": "Du bist vielleicht eine der letzten Brücken nach draußen. Halte den Kontakt ohne das Thema und such dir Unterstützung bei einer Angehörigenberatung."
        },
        {
          "id": "vs7f",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "nw1",
      "bereich": "netzwerk",
      "typ": "single",
      "text": "Gibt es Gruppen, in denen die Person mit Andersdenkenden gemeinsam etwas tut, nicht nur redet?",
      "warum": "Kontakt auf Augenhöhe mit gemeinsamem Ziel baut Vorurteile ab, bloßes Nebeneinander nicht. Die Ausstiegsforschung nennt stabile Bezüge jenseits der Szene als wichtigsten Schutzfaktor (Bjørgo, DJI-Abschlusskriterien).",
      "optionen": [
        {
          "id": "nw1a",
          "text": "Ja, regelmäßig: Verein, Mannschaft, Feuerwehr, Ehrenamt",
          "gewichte": {},
          "hinweis": "Gemeinsame Aufgaben sind die stärkste Brücke. Halte diese Aufgaben lebendig und sprich dort nicht über Politik."
        },
        {
          "id": "nw1b",
          "text": "Nur am Arbeitsplatz",
          "gewichte": {
            "zugehoerigkeit": 1
          }
        },
        {
          "id": "nw1c",
          "text": "Früher ja, die Person hat sich daraus zurückgezogen",
          "gewichte": {
            "zugehoerigkeit": 2
          },
          "hinweis": "Rückzug aus gemischten Gruppen ist ein Frühwarnzeichen. Lade die Person konkret zu etwas ein, bei dem sie gebraucht wird, ohne das Thema."
        },
        {
          "id": "nw1d",
          "text": "Nein, die Gruppen der Person denken politisch alle gleich",
          "gewichte": {
            "zugehoerigkeit": 2,
            "identitaet-heimat": 1
          }
        },
        {
          "id": "nw1e",
          "text": "Nein, die Person ist in keiner Gruppe",
          "gewichte": {
            "zugehoerigkeit": 2,
            "anerkennung": 1
          },
          "hinweis": "Fehlende Gemeinschaft macht die Szene attraktiv. Ein konkretes Gruppenangebot wirkt mehr als jedes Gespräch."
        },
        {
          "id": "nw1f",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "nw2",
      "bereich": "netzwerk",
      "typ": "single",
      "text": "Gibt es im Umfeld der Person jemanden, der die Partei aktiv vertritt und die Person mitzieht?",
      "warum": "Hinwendung läuft über Beziehungen: Radikalisierte Freunde erhöhen das Risiko stärker als Familie (Jasko et al.), nahe Personen in der Szene blockieren Ausstiegsfaktoren (Jensen et al.). Ob es eine Zugperson gibt, bestimmt deine Rolle.",
      "optionen": [
        {
          "id": "nw2a",
          "text": "Ja, jemand ganz Nahes: Partner:in, Elternteil, beste Freundin oder bester Freund",
          "gewichte": {
            "zugehoerigkeit": 3
          },
          "hinweis": "Gegen diesen Menschen zu argumentieren, verliert. Stärke deine eigene Verbindung, bleib verlässlich und hol dir Angehörigenberatung."
        },
        {
          "id": "nw2b",
          "text": "Ja, im weiteren Umfeld: Kollegium, Verein, Nachbarschaft",
          "gewichte": {
            "zugehoerigkeit": 2
          }
        },
        {
          "id": "nw2c",
          "text": "Nein, die Person kam eher über Kanäle und Medien dazu",
          "gewichte": {
            "misstrauen": 1
          }
        },
        {
          "id": "nw2d",
          "text": "Die Person zieht selbst andere mit",
          "gewichte": {
            "anerkennung": 2,
            "zugehoerigkeit": 1
          },
          "hinweis": "Die Person hat in der Szene Rolle und Anerkennung. Eine Rolle außerhalb muss genauso echt sein. Allein schaffst du das kaum: Fachberatung einbeziehen."
        },
        {
          "id": "nw2e",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "nw3",
      "bereich": "netzwerk",
      "typ": "single",
      "text": "Gibt es außer dir Menschen, die der Person nahestehen und sich ähnliche Sorgen machen?",
      "warum": "Angehörigenberatung rät, Verbündete zu suchen und sich abzusprechen, damit nicht alle gleichzeitig auf die Person einreden und niemand allein trägt. Wer allein ist, erschöpft sich und bricht eher ab (Selbstschutz vor Fremdschutz).",
      "optionen": [
        {
          "id": "nw3a",
          "text": "Ja, und wir sprechen uns ab",
          "gewichte": {},
          "skalen": {
            "belastung": 0
          },
          "hinweis": "Gut. Verteilt Rollen: Wer hält den Alltagskontakt, wer spricht Inhalte an. Keine inszenierten Interventionen."
        },
        {
          "id": "nw3b",
          "text": "Ja, aber jeder macht sein eigenes Ding",
          "gewichte": {},
          "skalen": {
            "belastung": 1
          },
          "hinweis": "Sprecht euch ab. Drei Leute, die einzeln einreden, wirken wie eine Belagerung und bestätigen das Gefühl der Person, angegriffen zu werden."
        },
        {
          "id": "nw3c",
          "text": "Nein, ich bin allein damit",
          "gewichte": {},
          "skalen": {
            "belastung": 2
          },
          "hinweis": "Allein ist das kaum zu halten. Angehörigenberatung oder eine Angehörigengruppe nimmt dir Last ab, ohne dass du die Person preisgibst."
        },
        {
          "id": "nw3d",
          "text": "Die anderen haben aufgegeben oder abgebrochen",
          "gewichte": {
            "zugehoerigkeit": 1
          },
          "skalen": {
            "belastung": 2
          },
          "hinweis": "Du bist vielleicht die letzte Brücke. Das ist wertvoll und schwer. Hol dir Unterstützung, bevor auch du erschöpft bist."
        },
        {
          "id": "nw3e",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "nw4",
      "bereich": "netzwerk",
      "typ": "single",
      "text": "Hat die Person im Alltag persönlichen Kontakt zu Menschen aus den Gruppen, die sie politisch ablehnt?",
      "warum": "Begegnung baut Vorurteile ab, wenn sie freiwillig ist und ein gemeinsames Ziel hat; flüchtiger Kontakt verstärkt Vorurteile eher (Pettigrew/Tropp 2006; Paluck et al. 2019). Ob die Person solche Menschen kennt, entscheidet: an Ausnahmen anknüpfen oder Begegnung ermöglichen.",
      "optionen": [
        {
          "id": "nw4a",
          "text": "Ja, regelmäßig und auf Augenhöhe: Kolleg:innen, Nachbarn, Verein",
          "gewichte": {},
          "skalen": {
            "offenheit": 2
          },
          "hinweis": "Diese Menschen sind die Ausnahmen im Bild der Person. Nenne Namen und erzähle Geschichten dieser Menschen, statt über Gruppen zu reden; so verschiebt sich das Bild (Kalla/Broockman 2020)."
        },
        {
          "id": "nw4b",
          "text": "Nur flüchtig: beim Einkaufen, im Amt, auf der Straße",
          "gewichte": {
            "kontrolle-angst": 1
          },
          "skalen": {
            "offenheit": 1
          },
          "hinweis": "Flüchtiger Kontakt bestätigt eher Vorurteile. Was hilft, ist eine gemeinsame Aufgabe mit festem Ziel, etwa im Verein oder bei einem Fest; nicht inszenieren."
        },
        {
          "id": "nw4c",
          "text": "Ja, und gerade daraus stammen die negativen Erlebnisse der Person",
          "gewichte": {
            "kontrolle-angst": 2,
            "gerechtigkeit-abgehaengt": 1
          },
          "hinweis": "Das Erlebnis ist echt und wird nicht wegargumentiert. Frag nach Einzelheiten und spiegle, was es für die Person bedeutet hat, bevor ihr über den Schluss daraus sprecht."
        },
        {
          "id": "nw4d",
          "text": "Nein, im Alltag der Person kommt das kaum vor",
          "gewichte": {
            "identitaet-heimat": 1
          },
          "hinweis": "Das Bild stammt aus Kanälen, nicht aus Begegnung. Erzähle von Menschen, die du kennst, und ermögliche Begegnung nur dort, wo sie freiwillig und mit gemeinsamer Aufgabe entsteht."
        },
        {
          "id": "nw4e",
          "text": "Die Person meidet solche Kontakte bewusst",
          "gewichte": {
            "identitaet-heimat": 2,
            "kontrolle-angst": 1
          },
          "skalen": {
            "offenheit": 0
          },
          "hinweis": "Bewusstes Meiden ist Abgrenzung als Haltung. Keine Begegnung erzwingen; halte die Beziehung, benenne rote Linien und hol dir Fachberatung zu deiner Rolle."
        },
        {
          "id": "nw4f",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "nw5",
      "bereich": "netzwerk",
      "typ": "single",
      "text": "Wie reagiert das Umfeld, wenn die Person ihre politische Haltung äußert?",
      "warum": "Normen naher Menschen moderieren Verschwörungs- und Abwertungsdenken: Wo Nahestehende sichtbar anders stehen, verliert die Mentalität an Wirkung (Winter et al. 2022). Schweigen wird dagegen als Zustimmung gelesen (Praxiskonsens).",
      "optionen": [
        {
          "id": "nw5a",
          "text": "Zustimmung, man bestärkt sich gegenseitig",
          "gewichte": {
            "zugehoerigkeit": 2,
            "protest-wut": 1
          }
        },
        {
          "id": "nw5b",
          "text": "Schweigen, niemand widerspricht",
          "gewichte": {},
          "hinweis": "Schweigen wirkt als Zustimmung. Eine einzige ruhige Gegenstimme im Umfeld verändert die Norm. Sprich mit anderen, ob sie das mittragen."
        },
        {
          "id": "nw5c",
          "text": "Ruhiger Widerspruch, die Beziehung bleibt",
          "gewichte": {},
          "skalen": {
            "offenheit": 1
          },
          "hinweis": "Das Umfeld hält Dissens aus. Das ist die beste Ausgangslage: weiter so, ohne Etiketten."
        },
        {
          "id": "nw5d",
          "text": "Streit, Spott oder Abwertung",
          "gewichte": {
            "protest-wut": 1
          },
          "hinweis": "Spott verhärtet und treibt in die Szene. Bitte das Umfeld, Etiketten zu lassen und bei Ich-Botschaften zu bleiben."
        },
        {
          "id": "nw5e",
          "text": "Die Person äußert sich im Umfeld kaum, nur mir gegenüber",
          "gewichte": {
            "anerkennung": 1
          },
          "skalen": {
            "kapital": 2
          },
          "hinweis": "Die Person vertraut dir etwas an, das sie sonst nicht zeigt. Das ist Beziehungskapital. Nicht weitertragen, nicht bloßstellen."
        },
        {
          "id": "nw5f",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "nw6",
      "bereich": "netzwerk",
      "typ": "single",
      "text": "Wie spricht die Person über Menschen, die sich von ihr abgewandt haben?",
      "warum": "Ob verlorene Kontakte schmerzen oder ideologisch umgedeutet werden, zeigt, ob Beziehungen außerhalb der Szene noch Zugkraft haben. Genau diese Beziehungen sind die Pull-Faktoren für Distanzierung (Bjørgo, C-REX).",
      "optionen": [
        {
          "id": "nw6a",
          "text": "Verletzt, es tut der Person sichtbar leid",
          "gewichte": {
            "zugehoerigkeit": 2,
            "anerkennung": 1
          },
          "skalen": {
            "offenheit": 2
          },
          "hinweis": "Der Schmerz ist dein Ansatzpunkt, denn die Beziehungen fehlen der Person. Frag nach dem, was die Person an diesen Menschen vermisst, nicht nach dem, was schiefging."
        },
        {
          "id": "nw6b",
          "text": "Verächtlich: „Die haben nichts verstanden.“",
          "gewichte": {
            "protest-wut": 2,
            "zugehoerigkeit": 1
          },
          "skalen": {
            "offenheit": 0
          }
        },
        {
          "id": "nw6c",
          "text": "Als Beleg: „Man darf ja nichts mehr sagen.“",
          "gewichte": {
            "anerkennung": 2,
            "misstrauen": 1
          },
          "hinweis": "Der Abbruch bestätigt die Erzählung vom Ausgeschlossensein. Zeig, dass du anders denkst und trotzdem bleibst; das widerlegt die Erzählung mehr als Worte."
        },
        {
          "id": "nw6d",
          "text": "Gar nicht, die Person erwähnt diese Menschen nicht mehr",
          "gewichte": {
            "zugehoerigkeit": 1
          }
        },
        {
          "id": "nw6e",
          "text": "Es gibt keine solchen Kontakte",
          "gewichte": {}
        },
        {
          "id": "nw6f",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "nw7",
      "bereich": "netzwerk",
      "typ": "single",
      "text": "Wer würde es merken, wenn sich die Person für Wochen zurückzöge?",
      "warum": "Je weniger Menschen außerhalb der Szene jemanden halten, desto mehr wird die Gruppe zum Lebensmittelpunkt und desto weniger greift der Einfluss von Familie und Freundeskreis (Violence Prevention Network). Das zeigt, wie dringend Außenkontakte sind.",
      "optionen": [
        {
          "id": "nw7a",
          "text": "Viele: Familie, Freundeskreis, Kollegium, Verein",
          "gewichte": {},
          "hinweis": "Die Person ist gut eingebettet. Deine Aufgabe ist nicht Rettung, sondern einer von vielen verlässlichen Kontakten zu bleiben."
        },
        {
          "id": "nw7b",
          "text": "Einige wenige, ich gehöre dazu",
          "gewichte": {
            "zugehoerigkeit": 1
          },
          "skalen": {
            "belastung": 1
          }
        },
        {
          "id": "nw7c",
          "text": "Vor allem Leute aus der Partei oder der Szene",
          "gewichte": {
            "zugehoerigkeit": 3
          },
          "hinweis": "Die Szene ist zum Sicherheitsnetz der Person geworden. Außenkontakte müssen aktiv gepflegt werden: regelmäßig, verlässlich, ohne das Thema."
        },
        {
          "id": "nw7d",
          "text": "Fast nur ich",
          "gewichte": {
            "zugehoerigkeit": 2
          },
          "skalen": {
            "belastung": 2
          },
          "hinweis": "Du trägst viel. Sei verlässlich erreichbar, aber hol dir Unterstützung und versuche, weitere Bezugspersonen einzubinden."
        },
        {
          "id": "nw7e",
          "text": "Niemand wirklich",
          "gewichte": {
            "zugehoerigkeit": 3,
            "anerkennung": 2
          },
          "skalen": {
            "belastung": 2
          },
          "hinweis": "Hohe Isolation. Jeder Kontakt zählt. Angehörigenberatung einbeziehen, auch um deine eigene Rolle realistisch zu halten."
        },
        {
          "id": "nw7f",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "bi1",
      "bereich": "biografie",
      "typ": "multi",
      "text": "Wie erlebt die Person ihre Arbeit oder die letzte, die sie hatte?",
      "warum": "Kontrollverlust und Ausgeliefertsein am Arbeitsplatz erhöhen die Wahrscheinlichkeit, rechts zu wählen, Arbeitslosigkeit nicht; Befristung und fehlender Tarif wiegen schwer (Hilmer et al. 2017). Die Arbeitserfahrung zeigt, welches Bedürfnis verletzt ist.",
      "optionen": [
        {
          "id": "bi1a",
          "text": "Die Person hat Einfluss und wird gefragt",
          "gewichte": {},
          "hinweis": "Arbeit ist für die Person eine Quelle von Anerkennung, nicht von Kränkung. Der Hebel liegt woanders."
        },
        {
          "id": "bi1b",
          "text": "Die Person wird übergangen, Entscheidungen kommen von oben",
          "gewichte": {
            "kontrolle-angst": 2,
            "anerkennung": 1
          },
          "hinweis": "Erlebte Ohnmacht im Betrieb ist einer der stärksten Prädiktoren. Frag, wo die Person Mitsprache hätte: Betriebsrat, Gewerkschaft, Team."
        },
        {
          "id": "bi1c",
          "text": "Unsicher: befristet, Leiharbeit, Schichten, Angst vor Kündigung",
          "gewichte": {
            "gerechtigkeit-abgehaengt": 2,
            "kontrolle-angst": 1
          }
        },
        {
          "id": "bi1d",
          "text": "Hart und schlecht bezahlt, die Leistung sieht keiner",
          "gewichte": {
            "anerkennung": 2,
            "gerechtigkeit-abgehaengt": 1
          },
          "hinweis": "Würdige konkret, was die Person leistet, bevor es um Politik geht. Gesehen zu werden ist hier schon ein Teil der Lösung."
        },
        {
          "id": "bi1e",
          "text": "Die Person schafft die Arbeit körperlich kaum noch",
          "gewichte": {
            "kontrolle-angst": 1,
            "anerkennung": 1
          }
        },
        {
          "id": "bi1f",
          "text": "Trifft nicht zu, die Person hat lange nicht oder nie gearbeitet",
          "gewichte": {}
        },
        {
          "id": "bi1g",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "bi2",
      "bereich": "biografie",
      "typ": "single",
      "text": "Wie spricht die Person über Rente und Alter?",
      "warum": "„Ich habe 40 Jahre gearbeitet und bekomme weniger als …“ ist die typische Form der moralischen Ökonomie: Fairness zwischen Leistenden und Empfangenden. Die Art der Klage zeigt, ob Anerkennung, Gerechtigkeit oder Rollenverlust dahintersteht.",
      "optionen": [
        {
          "id": "bi2a",
          "text": "Gelassen, die Person sieht sich abgesichert",
          "gewichte": {}
        },
        {
          "id": "bi2b",
          "text": "Sorge, trotz langem Arbeiten nicht genug zu haben",
          "gewichte": {
            "gerechtigkeit-abgehaengt": 2,
            "kontrolle-angst": 1
          }
        },
        {
          "id": "bi2c",
          "text": "Im Vergleich: „Andere bekommen ohne Arbeit mehr.“",
          "gewichte": {
            "gerechtigkeit-abgehaengt": 3
          },
          "hinweis": "Frag, womit genau die Person vergleicht, und würdige ihren Beitrag, bevor du die Rechnung prüfst. Statistik gegen das Gefühl verliert."
        },
        {
          "id": "bi2d",
          "text": "Seit dem Berufsende fühlt sich die Person überflüssig",
          "gewichte": {
            "anerkennung": 3,
            "zugehoerigkeit": 1
          },
          "hinweis": "Rollenverlust. Eine Aufgabe, in der die Person gebraucht wird, wirkt mehr als jedes Gespräch über Politik."
        },
        {
          "id": "bi2e",
          "text": "Rente ist für die Person noch weit weg und kein Thema",
          "gewichte": {}
        },
        {
          "id": "bi2f",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "bi3",
      "bereich": "biografie",
      "typ": "multi",
      "text": "Spricht die Person über Belastungen durch Krankheit, Pflege oder das Gesundheitssystem, bei sich oder Angehörigen?",
      "warum": "Dauerbelastung senkt die Toleranz für lange, komplexe Gespräche, und schlechte Erfahrungen mit Ärzten, Kassen oder Pflege sind oft der Ort, an dem Misstrauen gegen Institutionen begann. Das bestimmt Gesprächslänge und Einstieg.",
      "optionen": [
        {
          "id": "bi3a",
          "text": "Nein, soweit ich weiß",
          "gewichte": {}
        },
        {
          "id": "bi3b",
          "text": "Ja, die Person erzählt, wie Beschwerden den Alltag einschränken",
          "gewichte": {
            "kontrolle-angst": 2
          },
          "hinweis": "Kurze Gespräche, kein Marathon. Praktische Entlastung vor politischem Gespräch."
        },
        {
          "id": "bi3c",
          "text": "Die Person hat sich von Ärzten, Kassen oder Behörden schlecht behandelt gefühlt",
          "gewichte": {
            "misstrauen": 2,
            "gerechtigkeit-abgehaengt": 1
          },
          "hinweis": "Hier begann oft das Misstrauen. Nimm die Erfahrung ernst, bevor du Institutionen verteidigst."
        },
        {
          "id": "bi3d",
          "text": "Die Person pflegt Angehörige",
          "gewichte": {
            "anerkennung": 2,
            "kontrolle-angst": 1
          },
          "hinweis": "Pflegende fühlen sich alleingelassen. Konkrete Hilfe, Pflegeberatung und Entlastung wirken mehr als Argumente."
        },
        {
          "id": "bi3e",
          "text": "Vor Ort fehlen Ärzte oder es gibt lange Wartezeiten",
          "gewichte": {
            "gerechtigkeit-abgehaengt": 2,
            "identitaet-heimat": 1
          }
        },
        {
          "id": "bi3f",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "bi4",
      "bereich": "biografie",
      "typ": "single",
      "text": "Gab es einen Wendepunkt, nach dem sich die Haltung der Person spürbar verschärft hat?",
      "warum": "Krisen aktivieren latente Dispositionen, Vorbehalte werden durch Erlebnisse und Diskurse aktiviert (Stenner, Ziller 2025). Der Wendepunkt zeigt das verletzte Bedürfnis; dort setzt du an, nicht bei der politischen Schlussfolgerung.",
      "optionen": [
        {
          "id": "bi4a",
          "text": "Ein persönlicher Verlust: Tod, Trennung, Jobverlust",
          "gewichte": {
            "zugehoerigkeit": 2,
            "anerkennung": 1
          },
          "hinweis": "Hinwendung nach Verlust ist Suche nach Halt. Der Verlust ist das Thema, nicht die Politik."
        },
        {
          "id": "bi4b",
          "text": "Ein Erlebnis mit Kriminalität oder Gewalt, selbst oder im Umfeld",
          "gewichte": {
            "kontrolle-angst": 3
          },
          "hinweis": "Ein reales Erlebnis wird nicht wegargumentiert. Frag, was seitdem fehlt und was Sicherheit geben würde."
        },
        {
          "id": "bi4c",
          "text": "Eine Kränkung: übergangen, beschämt, öffentlich bloßgestellt",
          "gewichte": {
            "anerkennung": 3
          },
          "hinweis": "Die Kränkung sitzt tiefer als die Politik. Frag nach dem Erlebnis, nicht nach der Meinung."
        },
        {
          "id": "bi4d",
          "text": "Eine Krise wie Corona oder Hochwasser, in der sich die Person alleingelassen fühlte",
          "gewichte": {
            "misstrauen": 2,
            "kontrolle-angst": 1
          }
        },
        {
          "id": "bi4e",
          "text": "Nein, es war ein schleichender Prozess",
          "gewichte": {
            "zugehoerigkeit": 1,
            "misstrauen": 1
          },
          "hinweis": "Schleichend heißt meist: Kanäle und Gruppen. Setz beim Netzwerk und bei den Quellen an, nicht bei einem Ereignis."
        },
        {
          "id": "bi4f",
          "text": "Die Person war schon immer so",
          "gewichte": {
            "identitaet-heimat": 1
          }
        },
        {
          "id": "bi4g",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "bi5",
      "bereich": "biografie",
      "typ": "single",
      "text": "Wie hat sich die Person früher politisch orientiert, soweit du es weißt?",
      "warum": "Schwache Parteibindung und Wechselbereitschaft kennzeichnen viele Hinwendungen (Mau; Arzheimer/Berning 2019). Woher die Person politisch kommt, zeigt, welche Werte anknüpfbar sind: Gerechtigkeit, Ordnung oder das Gefühl, erstmals gehört zu werden.",
      "optionen": [
        {
          "id": "bi5a",
          "text": "Die Person hat oft gewechselt oder je nach Lage gewählt",
          "gewichte": {
            "protest-wut": 1
          },
          "skalen": {
            "offenheit": 2
          },
          "hinweis": "Wer gewechselt hat, kann wieder wechseln. Frag, was die Person bei der jeweiligen Wahl erwartet hat und was davon enttäuscht wurde."
        },
        {
          "id": "bi5b",
          "text": "Früher eher links oder sozialdemokratisch orientiert",
          "gewichte": {
            "gerechtigkeit-abgehaengt": 2,
            "anerkennung": 1
          },
          "hinweis": "Gerechtigkeit ist der alte Wert der Person. Knüpf daran an: Wer trägt die Lasten, wer wird gesehen? Die Enttäuschung über die frühere Seite ernst nehmen, nicht verteidigen."
        },
        {
          "id": "bi5c",
          "text": "Früher konservativ, die Partei ist für die Person die Fortsetzung",
          "gewichte": {
            "identitaet-heimat": 2,
            "kontrolle-angst": 1
          },
          "hinweis": "Ordnung, Familie und Verlässlichkeit sind die Werte der Person. Frag, wo die Partei diese Werte selbst verletzt, etwa im Umgang mit Menschen; die Werte nicht angreifen."
        },
        {
          "id": "bi5d",
          "text": "Lange nicht gewählt und kaum für Politik interessiert",
          "gewichte": {
            "protest-wut": 1,
            "misstrauen": 1
          },
          "hinweis": "Die Partei hat die Person als Erste erreicht und ihr das Gefühl gegeben, dass ihre Stimme zählt. Ein demokratisches Angebot muss das genauso konkret tun."
        },
        {
          "id": "bi5e",
          "text": "Seit ich die Person kenne, denkt sie so",
          "gewichte": {
            "identitaet-heimat": 1
          },
          "hinweis": "Die Haltung ist alt und Teil des Selbstbilds. Erwarte keine Wende; realistisch sind Beziehung, rote Linien und einzelne Zweifel."
        },
        {
          "id": "bi5f",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "bi6",
      "bereich": "biografie",
      "typ": "single",
      "text": "Wenn die Person über „Leute wie uns“ spricht: Wo ordnet sie sich ein?",
      "warum": "AfD-Wählende stufen ihren Status unabhängig vom Einkommen niedriger ein (Hilmer et al. 2017). Der subjektive Platz, nicht der Kontostand, bestimmt die Kränkung; die Selbstbeschreibung zeigt, ob Gerechtigkeit, Anerkennung oder Ohnmacht dominiert.",
      "optionen": [
        {
          "id": "bi6a",
          "text": "Als die, die alles tragen und nichts zurückbekommen",
          "gewichte": {
            "gerechtigkeit-abgehaengt": 3
          },
          "hinweis": "Argumentiere in den Werten der Person: Leistung, Fairness, Fleiß. Zeig, dass auch andere, die zu „denen“ gezählt werden, hart arbeiten."
        },
        {
          "id": "bi6b",
          "text": "Als die Vergessenen, um die sich niemand kümmert",
          "gewichte": {
            "anerkennung": 2,
            "zugehoerigkeit": 1
          }
        },
        {
          "id": "bi6c",
          "text": "Als die, die kleingehalten werden",
          "gewichte": {
            "protest-wut": 2,
            "misstrauen": 1
          }
        },
        {
          "id": "bi6d",
          "text": "Als die, die ihr Land verlieren",
          "gewichte": {
            "identitaet-heimat": 3
          }
        },
        {
          "id": "bi6e",
          "text": "Als die Normalen, die einfach ihre Ruhe wollen",
          "gewichte": {
            "kontrolle-angst": 1
          }
        },
        {
          "id": "bi6f",
          "text": "Die Person spricht nicht von „Leuten wie uns“",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "bi7",
      "bereich": "biografie",
      "typ": "single",
      "text": "Wie spricht die Person über die Zukunft, die eigene und die des Landes?",
      "warum": "Politisch wirkt das Bild von der Lage Deutschlands stärker als die eigene Lage (Teney 2026); Niedergangspessimismus prägt das autoritäre Profil. Ob die Angst persönlich oder kollektiv ist, entscheidet, ob du über das Leben der Person oder über andere Menschen sprichst.",
      "optionen": [
        {
          "id": "bi7a",
          "text": "Zuversichtlich, mit eigenen Plänen",
          "gewichte": {},
          "skalen": {
            "offenheit": 1
          }
        },
        {
          "id": "bi7b",
          "text": "Für sich selbst unsicher: „Man weiß ja nicht, was kommt.“",
          "gewichte": {
            "kontrolle-angst": 2
          },
          "hinweis": "Benenne, was verlässlich ist und bleibt. Kleine planbare Dinge geben mehr Halt als große Debatten."
        },
        {
          "id": "bi7c",
          "text": "Für sich okay, aber für Deutschland schwarz",
          "gewichte": {
            "identitaet-heimat": 2,
            "kontrolle-angst": 1
          },
          "hinweis": "Nicht die eigene Lage ist das Problem, sondern das Bild vom Land. Geschichten konkreter Menschen verschieben das Bild, Statistiken nicht."
        },
        {
          "id": "bi7d",
          "text": "Durchweg pessimistisch: „Es wird nur schlimmer.“",
          "gewichte": {
            "kontrolle-angst": 2,
            "protest-wut": 1
          },
          "hinweis": "Nicht das Ganze bestreiten. Frag nach dem einen Punkt, der sich für die Person konkret ändern müsste, und was sie selbst dazu tun könnte."
        },
        {
          "id": "bi7e",
          "text": "Apokalyptisch: Zusammenbruch, Bürgerkrieg, „bald knallt es“",
          "gewichte": {
            "kontrolle-angst": 2,
            "misstrauen": 1
          },
          "skalen": {
            "verschwoerung": 2
          },
          "hinweis": "Untergangsszenarien rechtfertigen Härte. Keine Gegenprognosen. Frag, was die Person konkret tun würde, wenn es nicht kommt, und bleib ruhig."
        },
        {
          "id": "bi7f",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "hm1",
      "bereich": "heimat",
      "typ": "multi",
      "text": "Wenn die Person von Heimat spricht, was meint sie vor allem?",
      "warum": "Heimat kann Ort, Beziehung, Brauch, Ordnung oder Abgrenzung bedeuten. Je nachdem ist der Zugang Mitgestaltung, Gemeinschaft, Mitmachen oder das Erzählen einzelner Geschichten (Perspective-Getting, Kalla/Broockman 2021).",
      "optionen": [
        {
          "id": "hm1a",
          "text": "Landschaft, Ort, Haus und Garten",
          "gewichte": {
            "identitaet-heimat": 2
          },
          "hinweis": "Ortsbindung ist eine Ressource. Gemeinsam etwas vor Ort zu gestalten (Fest, Pflanzaktion, Dorfladen) verbindet die Person mit anderen."
        },
        {
          "id": "hm1b",
          "text": "Die Menschen: Familie, Nachbarn, Verein",
          "gewichte": {
            "zugehoerigkeit": 2,
            "identitaet-heimat": 1
          },
          "hinweis": "Heimat heißt für die Person Beziehungen. Die kannst du stärken, ohne je über Politik zu reden."
        },
        {
          "id": "hm1c",
          "text": "Bräuche, Feste, Dialekt, Essen",
          "gewichte": {
            "identitaet-heimat": 2
          },
          "hinweis": "Tradition ist kein Gegner. Mach mit, statt zu bewerten. Wer mitfeiert, darf später auch widersprechen."
        },
        {
          "id": "hm1d",
          "text": "Ordnung, Sicherheit, dass man sich auskennt",
          "gewichte": {
            "kontrolle-angst": 2,
            "identitaet-heimat": 1
          }
        },
        {
          "id": "hm1e",
          "text": "Abgrenzung: deutsch sein, keine Fremden",
          "gewichte": {
            "identitaet-heimat": 3
          },
          "hinweis": "Heimat ist hier vor allem Abgrenzung. Nicht über Gruppen streiten, sondern Geschichten einzelner Menschen erzählen und die der Person anhören."
        },
        {
          "id": "hm1f",
          "text": "Die Person spricht nicht von Heimat",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "hm2",
      "bereich": "heimat",
      "typ": "multi",
      "text": "Wie beschreibt die Person die Veränderung ihres Ortes in den letzten Jahren?",
      "warum": "Subjektive Bewertungen des Ortes weichen oft vom objektiven Zustand ab (FES-Kreisanalyse), Sorgen werden durch Diskurse aktiviert (Ziller 2025). Ob ein realer Verlust, eine Unsicherheit oder ein übernommenes Bild dahintersteht, bestimmt das Gespräch.",
      "optionen": [
        {
          "id": "hm2a",
          "text": "Weniger Leben: Läden, Kneipe, Jugend, Verein sind weg",
          "gewichte": {
            "identitaet-heimat": 2,
            "gerechtigkeit-abgehaengt": 1
          },
          "hinweis": "Der Verlust ist real und greifbar. Frag, was die Person am meisten vermisst, und ob sich etwas davon gemeinsam zurückholen lässt."
        },
        {
          "id": "hm2b",
          "text": "Fremder: „Man kennt sich nicht mehr.“",
          "gewichte": {
            "identitaet-heimat": 2,
            "kontrolle-angst": 1
          },
          "hinweis": "Begegnung wirkt nur freiwillig und mit gemeinsamer Aufgabe: Fest, Verein, Nachbarschaftsprojekt. Nicht inszenieren."
        },
        {
          "id": "hm2c",
          "text": "Unsicherer: Die Person geht abends ungern raus",
          "gewichte": {
            "kontrolle-angst": 3
          },
          "hinweis": "Sicherheitssorgen ernst nehmen. Frag konkret, was passiert ist und was der Person Sicherheit geben würde, bevor du Zahlen nennst."
        },
        {
          "id": "hm2d",
          "text": "Teurer: Die Person kann sich den Ort kaum noch leisten",
          "gewichte": {
            "gerechtigkeit-abgehaengt": 2,
            "kontrolle-angst": 1
          }
        },
        {
          "id": "hm2e",
          "text": "Die Person beschreibt Veränderungen, die ich vor Ort so nicht sehe",
          "gewichte": {
            "misstrauen": 1,
            "identitaet-heimat": 1
          },
          "hinweis": "Die Sorge stammt eher aus Kanälen als vom Ort. Sprich über die Quellen und die eigene Erfahrung der Person vor Ort, nicht über den Ort selbst."
        },
        {
          "id": "hm2g",
          "text": "Die Person spricht nicht über Veränderungen im Ort",
          "gewichte": {}
        },
        {
          "id": "hm2f",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "hm3",
      "bereich": "heimat",
      "typ": "multi",
      "text": "Wie spricht die Person über Berlin, die Großstädte oder „die da oben“ im Verhältnis zum eigenen Ort?",
      "warum": "Erlebte Geringschätzung von oben ist ein eigener Treiber: enttäuschte Angleichungsversprechen (Mau), Benachteiligungsgefühl in Abwanderungsregionen (Salomo). Ob Anerkennung, Gerechtigkeit oder Kontrolle gekränkt ist, zeigt die Formulierung.",
      "optionen": [
        {
          "id": "hm3a",
          "text": "„Die kennen unser Leben nicht.“",
          "gewichte": {
            "anerkennung": 3,
            "identitaet-heimat": 1
          },
          "hinweis": "Die Kernkränkung ist Geringschätzung. Würdige, was vor Ort geleistet wird, bevor du über Politik sprichst."
        },
        {
          "id": "hm3b",
          "text": "„Für uns wird nichts getan, für andere alles.“",
          "gewichte": {
            "gerechtigkeit-abgehaengt": 3,
            "protest-wut": 1
          }
        },
        {
          "id": "hm3c",
          "text": "„Die wollen uns vorschreiben, wie wir zu leben haben.“",
          "gewichte": {
            "kontrolle-angst": 2,
            "misstrauen": 1
          },
          "hinweis": "Bevormundung ist das Thema. Jede belehrende Formulierung von dir bestätigt es. Fragen statt erklären."
        },
        {
          "id": "hm3d",
          "text": "„Die lachen über uns.“",
          "gewichte": {
            "anerkennung": 2,
            "protest-wut": 2
          }
        },
        {
          "id": "hm3e",
          "text": "Unaufgeregt, Stadt und Land sind kein Thema",
          "gewichte": {}
        },
        {
          "id": "hm3f",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "hm4",
      "bereich": "heimat",
      "typ": "multi",
      "text": "Was hat die Person selbst mit Weggehen und Bleiben erlebt?",
      "warum": "Abwanderung, Männerüberhang und Überalterung verbinden sich mit Benachteiligungsgefühl (Salomo). Ob die Person Gebliebene, Verlassene oder Zugezogene ist, zeigt, ob Anerkennung, Verlust oder fehlende Zugehörigkeit das Bedürfnis ist.",
      "optionen": [
        {
          "id": "hm4a",
          "text": "Die Person ist geblieben, während viele gegangen sind",
          "gewichte": {
            "identitaet-heimat": 2,
            "anerkennung": 1
          },
          "hinweis": "Bleiben war die Entscheidung der Person, und sie verteidigt diese Entscheidung. Würdige das Bleiben als Leistung, nicht als Versäumnis."
        },
        {
          "id": "hm4b",
          "text": "Die Kinder oder engsten Freunde der Person sind weggezogen",
          "gewichte": {
            "zugehoerigkeit": 2,
            "identitaet-heimat": 1
          },
          "hinweis": "Der Verlust ist persönlich, die Politik nur die Übersetzung. Sprich über die Menschen, die fehlen."
        },
        {
          "id": "hm4c",
          "text": "Die Person ist selbst weggegangen und zurückgekommen",
          "gewichte": {
            "identitaet-heimat": 1,
            "anerkennung": 1
          }
        },
        {
          "id": "hm4d",
          "text": "Die Person ist zugezogen und fühlt sich nicht aufgenommen",
          "gewichte": {
            "zugehoerigkeit": 2,
            "anerkennung": 1
          },
          "hinweis": "Die Person sucht Zugehörigkeit. Ein Verein oder ein Nachbarschaftsprojekt wirkt mehr als Gespräche."
        },
        {
          "id": "hm4e",
          "text": "Die Person lebt weit weg von dort, wo sie aufgewachsen ist",
          "gewichte": {
            "zugehoerigkeit": 1,
            "identitaet-heimat": 1
          }
        },
        {
          "id": "hm4f",
          "text": "Das spielt bei der Person keine Rolle",
          "gewichte": {}
        },
        {
          "id": "hm4g",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "hm5",
      "bereich": "heimat",
      "typ": "single",
      "text": "Wie spricht die Person vor allem über „früher“?",
      "warum": "„Früher“ ist das Fenster in das verletzte Bedürfnis: Gemeinschaft, Ordnung oder Anerkennung. Unsichere Menschen suchen klare Gruppen und Regeln (Hogg). Nostalgie zeigt, was dein Angebot heute ersetzen muss.",
      "optionen": [
        {
          "id": "hm5a",
          "text": "„Früher war mehr Zusammenhalt.“",
          "gewichte": {
            "zugehoerigkeit": 2,
            "identitaet-heimat": 1
          },
          "hinweis": "Hinter Nostalgie steckt der Wunsch nach Gemeinschaft. Schaff Anlässe, bei denen es das heute gibt: Essen, Helfen, Feiern."
        },
        {
          "id": "hm5b",
          "text": "„Früher galten noch Regeln, man wusste, woran man ist.“",
          "gewichte": {
            "kontrolle-angst": 2,
            "identitaet-heimat": 1
          },
          "hinweis": "Die Person braucht Verlässlichkeit. Benenne, was gilt und bleibt, und halte eigene Zusagen peinlich genau ein."
        },
        {
          "id": "hm5c",
          "text": "„Früher hat meine Arbeit noch etwas gegolten.“",
          "gewichte": {
            "anerkennung": 2,
            "gerechtigkeit-abgehaengt": 1
          }
        },
        {
          "id": "hm5d",
          "text": "„Früher war alles besser, bis die es kaputt gemacht haben.“",
          "gewichte": {
            "protest-wut": 2,
            "misstrauen": 1
          }
        },
        {
          "id": "hm5e",
          "text": "Die Person schaut eher nach vorn, früher ist kein Thema",
          "gewichte": {}
        },
        {
          "id": "hm5f",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "hm6",
      "bereich": "heimat",
      "typ": "multi",
      "text": "Bezieht sich die Person auf Erfahrungen von Umbruch und Entwertung, etwa nach 1990?",
      "warum": "Enttäuschte Angleichungsversprechen und familiär tradierte Transformationserfahrung prägen die Parteibindung (Mau). Ob die Entwertung selbst erlebt, ererbt oder als Narrativ übernommen ist, bestimmt, ob du würdigst, nachfragst oder konkretisierst.",
      "optionen": [
        {
          "id": "hm6a",
          "text": "Ja, selbst erlebt: Betrieb dicht, Abschluss nicht anerkannt, neu angefangen",
          "gewichte": {
            "anerkennung": 2,
            "gerechtigkeit-abgehaengt": 2
          },
          "hinweis": "Entwertete Lebensleistung sitzt tief. Nicht relativieren, sondern würdigen: Frag, was die Person damals aufgebaut hat und was davon blieb."
        },
        {
          "id": "hm6b",
          "text": "Ja, aus Erzählungen der Eltern oder Großeltern",
          "gewichte": {
            "identitaet-heimat": 2,
            "gerechtigkeit-abgehaengt": 1
          },
          "hinweis": "Die Familiengeschichte ist das Fundament der Person. Frag danach mit echtem Interesse, statt zu bewerten."
        },
        {
          "id": "hm6c",
          "text": "Ja, als allgemeines Bild: „Bürger zweiter Klasse“",
          "gewichte": {
            "gerechtigkeit-abgehaengt": 2,
            "protest-wut": 1
          },
          "hinweis": "Das Narrativ ist kollektiv. Frag nach dem konkreten Erlebnis dahinter. Erst dort wird es besprechbar."
        },
        {
          "id": "hm6d",
          "text": "Nein, das spielt bei der Person keine Rolle",
          "gewichte": {}
        },
        {
          "id": "hm6e",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "hm7",
      "bereich": "heimat",
      "typ": "single",
      "text": "Hat die Person je versucht, vor Ort etwas zu verändern, und was ist daraus geworden?",
      "warum": "Ob die Person Wirksamkeit vor Ort erlebt, enttäuscht aufgegeben oder nie versucht hat, bestimmt das realistische Angebot: anknüpfen, Enttäuschung würdigen oder beim ersten Mal mitgehen. Erlebte Wirksamkeit ist das Gegenmittel zur Ohnmacht (Leipzig 2024).",
      "optionen": [
        {
          "id": "hm7a",
          "text": "Ja, mit Erfolg",
          "gewichte": {},
          "hinweis": "Die Person kennt Selbstwirksamkeit. Knüpf daran an: Was wäre heute das nächste kleine Projekt?"
        },
        {
          "id": "hm7b",
          "text": "Ja, ohne Erfolg, die Person hat aufgegeben",
          "gewichte": {
            "protest-wut": 2,
            "kontrolle-angst": 1
          },
          "hinweis": "Enttäuschte Wirksamkeit ist der Nährboden. Ein kleiner, erreichbarer Erfolg vor Ort wirkt mehr als jedes Argument. Geh mit."
        },
        {
          "id": "hm7c",
          "text": "Nein: „Das bringt doch eh nichts.“",
          "gewichte": {
            "protest-wut": 2,
            "misstrauen": 1
          },
          "hinweis": "Biete eine konkrete Beteiligung mit sichtbarer Folge: Ortsbeirat, Bürgerfragestunde, Petition, Verein. Begleite die Person beim ersten Mal."
        },
        {
          "id": "hm7d",
          "text": "Nein, die Person hatte nie Anlass oder Interesse",
          "gewichte": {}
        },
        {
          "id": "hm7e",
          "text": "Die Person engagiert sich inzwischen über die Partei vor Ort",
          "gewichte": {
            "zugehoerigkeit": 2,
            "anerkennung": 1
          },
          "hinweis": "Die Partei gibt der Person Wirksamkeit und eine Rolle, die andere nicht boten. Ein demokratisches Angebot muss genauso konkret sein, sonst bleibt es bei Worten."
        },
        {
          "id": "hm7f",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "bz1",
      "bereich": "beziehung-zu-dir",
      "typ": "single",
      "text": "Wie war der Kontakt zwischen dir und der Person in den letzten drei Monaten?",
      "warum": "Beziehungsqualität sagt in der Beratungsforschung das Ergebnis voraus (Flückiger 2018; DJI 2024): Ohne tragfähigen Kontakt greift keine Gesprächstechnik. Die Antwort entscheidet, ob du bei „Beziehung sichern“ oder beim Zuhören einsteigst.",
      "optionen": [
        {
          "id": "bz1a",
          "text": "Regelmäßig und selbstverständlich, auch ohne Anlass",
          "gewichte": {},
          "skalen": {
            "kapital": 3
          }
        },
        {
          "id": "bz1b",
          "text": "Regelmäßig, aber fast nur zu Anlässen wie Feiern oder Arbeit",
          "gewichte": {},
          "skalen": {
            "kapital": 2
          }
        },
        {
          "id": "bz1c",
          "text": "Wir sehen uns täglich, etwa im Haushalt oder im Betrieb, oft angespannt",
          "gewichte": {},
          "skalen": {
            "kapital": 2,
            "belastung": 1
          }
        },
        {
          "id": "bz1d",
          "text": "Seltener geworden, meist auf meine Initiative",
          "gewichte": {},
          "skalen": {
            "kapital": 1
          },
          "hinweis": "Kontakt, der nur von dir ausgeht, ist trotzdem Kontakt. Halte ihn über Alltägliches am Leben, bevor du Politik ansprichst."
        },
        {
          "id": "bz1e",
          "text": "Fast abgebrochen oder nur noch über Dritte",
          "gewichte": {
            "zugehoerigkeit": 1
          },
          "skalen": {
            "kapital": 0
          },
          "hinweis": "Erst Kontakt herstellen, dann reden. Ein Anlass ohne Thema (Hilfe, Geburtstag, gemeinsame Erinnerung) ist der realistische erste Schritt."
        }
      ]
    },
    {
      "id": "bz2",
      "bereich": "beziehung-zu-dir",
      "typ": "single",
      "text": "Weiß die Person, dass dich ihre politische Haltung beschäftigt?",
      "warum": "Offenheit über die eigene Sorge ist Voraussetzung für Vertrauen; verdeckte Strategien scheitern am Transparenz-Test und kosten Beziehungskapital, wenn sie auffliegen (Susser et al. 2019; MBR). Die Antwort zeigt, ob du zuerst offen über deine Sorge reden musst.",
      "optionen": [
        {
          "id": "bz2a",
          "text": "Ja, wir haben offen darüber gesprochen",
          "gewichte": {},
          "skalen": {
            "kapital": 3,
            "offenheit": 2
          },
          "hinweis": "Die Karten liegen auf dem Tisch. Du kannst Gespräche ankündigen und um Erlaubnis fragen, statt sie zu inszenieren."
        },
        {
          "id": "bz2b",
          "text": "Die Person ahnt es, wir sprechen aber nicht darüber",
          "gewichte": {},
          "skalen": {
            "kapital": 2
          },
          "hinweis": "Sag es einmal kurz und ohne Vorwurf: „Mich beschäftigt, wie du über manches denkst, und du bist mir wichtig.“ Das ersetzt viele indirekte Versuche."
        },
        {
          "id": "bz2c",
          "text": "Nein, ich halte meine Sorge bewusst zurück",
          "gewichte": {},
          "skalen": {
            "kapital": 1,
            "belastung": 1
          },
          "hinweis": "Verdeckte Sorge wird irgendwann sichtbar und wirkt dann wie Taktik. Benenne die Sorge lieber selbst, in Ruhe und als Ich-Botschaft."
        },
        {
          "id": "bz2d",
          "text": "Ja, und die Person erlebt es als Angriff oder Bevormundung",
          "gewichte": {
            "anerkennung": 1,
            "kontrolle-angst": 1
          },
          "skalen": {
            "kapital": 1,
            "offenheit": 1
          },
          "hinweis": "Die Person hört Sorge als Urteil. Frag um Erlaubnis, bevor du das Thema aufmachst, und sprich eher über dich als über die Person."
        },
        {
          "id": "bz2e",
          "text": "Ja, aber es ist der Person sichtbar gleichgültig",
          "gewichte": {},
          "skalen": {
            "kapital": 0
          },
          "hinweis": "Gleichgültigkeit gegenüber deiner Sorge zeigt wenig Beziehungskapital. Investiere erst in gemeinsame Zeit ohne das Thema."
        },
        {
          "id": "bz2f",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "bz3",
      "bereich": "beziehung-zu-dir",
      "typ": "multi",
      "text": "Was verbindet dich und die Person außerhalb von Politik?",
      "warum": "Beratungsstellen raten übereinstimmend, die Beziehung nicht auf das Thema zu reduzieren (bpb 2024, MBR). Was euch sonst verbindet, ist der Boden, auf dem Gespräche möglich bleiben, und bestimmt, welche Anlässe du nutzen kannst.",
      "optionen": [
        {
          "id": "bz3a",
          "text": "Gemeinsame Geschichte: Kindheit, lange Freundschaft, Familie",
          "gewichte": {},
          "skalen": {
            "kapital": 2
          }
        },
        {
          "id": "bz3b",
          "text": "Eine feste Routine: Sport, Spieleabend, Garten, Stammtisch",
          "gewichte": {},
          "skalen": {
            "kapital": 2
          },
          "hinweis": "Routinen sind dein Anker und tragen den Kontakt auch nach einem schwierigen Gespräch. Halte die Routinen unabhängig vom Thema."
        },
        {
          "id": "bz3c",
          "text": "Praktische Hilfe im Alltag: Kinder, Pflege, Reparaturen, Fahrten",
          "gewichte": {},
          "skalen": {
            "kapital": 2
          },
          "hinweis": "Gegenseitige Hilfe zeigt der Person: Du bist verlässlich. Das wiegt bei Misstrauen schwerer als jedes Argument."
        },
        {
          "id": "bz3d",
          "text": "Ein gemeinsames Projekt, Verein oder Ehrenamt",
          "gewichte": {},
          "skalen": {
            "kapital": 2
          }
        },
        {
          "id": "bz3e",
          "text": "Arbeit oder Schule, sonst wenig",
          "gewichte": {},
          "skalen": {
            "kapital": 1
          }
        },
        {
          "id": "bz3f",
          "text": "Kaum etwas, das Thema nimmt fast allen Raum ein",
          "gewichte": {},
          "skalen": {
            "kapital": 0,
            "belastung": 1
          },
          "hinweis": "Wenn die Beziehung nur noch aus dem Thema besteht, verhärtet jedes Treffen. Baue erst einen themenfreien Anlass auf, etwa etwas, das ihr früher gern gemacht habt."
        }
      ]
    },
    {
      "id": "bz4",
      "bereich": "beziehung-zu-dir",
      "typ": "single",
      "text": "Wenn du der Person etwas Persönliches erzählst, wie reagiert sie?",
      "warum": "Nicht wertender Austausch persönlicher Erzählungen ist die einzige Gesprächsform mit belegter Monatswirkung (Kalla/Broockman 2020). Ob die Person dir zuhört, zeigt, ob dieser Weg bei euch offen ist oder erst Zuhören aufgebaut werden muss.",
      "optionen": [
        {
          "id": "bz4a",
          "text": "Die Person hört zu, fragt nach und erinnert sich später daran",
          "gewichte": {},
          "skalen": {
            "kapital": 3,
            "offenheit": 2
          },
          "hinweis": "Die Person kann zuhören. Eigene Erlebnisse und Geschichten Betroffener zu erzählen hat hier eine echte Chance."
        },
        {
          "id": "bz4b",
          "text": "Die Person hört zu, lenkt aber schnell auf sich oder ihr Thema",
          "gewichte": {
            "anerkennung": 1
          },
          "skalen": {
            "kapital": 1
          }
        },
        {
          "id": "bz4c",
          "text": "Die Person nimmt es auf, aber Politik kommt immer wieder dazwischen",
          "gewichte": {},
          "skalen": {
            "kapital": 1
          }
        },
        {
          "id": "bz4d",
          "text": "Die Person wirkt desinteressiert oder abwesend",
          "gewichte": {},
          "skalen": {
            "kapital": 0
          }
        },
        {
          "id": "bz4e",
          "text": "Ich erzähle der Person kaum noch etwas Persönliches",
          "gewichte": {},
          "skalen": {
            "kapital": 0,
            "belastung": 1
          },
          "hinweis": "Dass du dich zurückgezogen hast, ist ein Signal für dich selbst. Starte klein: ein Erlebnis aus deinem Alltag, ohne Politikbezug."
        }
      ]
    },
    {
      "id": "bz5",
      "bereich": "beziehung-zu-dir",
      "typ": "multi",
      "text": "Was schätzt die Person an dir, soweit du es weißt?",
      "warum": "Was die Person an dir schätzt, ist dein Pfund: Vertrauen in dich als Person wirkt bei Misstrauen und Verschwörungsdenken mehr als jede Quelle (Lewandowsky/Cook 2020). Die Antwort legt fest, welchen Ton und welche Rolle du im Gespräch einnimmst.",
      "optionen": [
        {
          "id": "bz5a",
          "text": "Dass ich ehrlich bin und nichts beschönige",
          "gewichte": {
            "misstrauen": 1
          },
          "skalen": {
            "kapital": 2
          },
          "hinweis": "Ehrlichkeit ist dein Kapital. Sag deine Position offen und begründet; verdeckte Taktik würde genau das zerstören."
        },
        {
          "id": "bz5b",
          "text": "Dass ich zur Person halte, egal was andere sagen",
          "gewichte": {
            "zugehoerigkeit": 1
          },
          "skalen": {
            "kapital": 3
          },
          "hinweis": "Loyalität ist eure Brücke. Trenne klar: „Ich bleibe bei dir, und ich sehe das anders.“ Beides zusammen ist der stärkste Satz, den du hast."
        },
        {
          "id": "bz5c",
          "text": "Meinen Rat oder mein Wissen in bestimmten Dingen",
          "gewichte": {
            "anerkennung": 1
          },
          "skalen": {
            "kapital": 2
          }
        },
        {
          "id": "bz5d",
          "text": "Dass ich mich nicht in das Leben der Person einmische",
          "gewichte": {},
          "skalen": {
            "kapital": 1
          },
          "hinweis": "Die Person schätzt Abstand. Politik anzusprechen wird als Einmischung erlebt; frag um Erlaubnis, bevor du das Thema aufmachst."
        },
        {
          "id": "bz5e",
          "text": "Unsere gemeinsame Zeit und Unternehmungen",
          "gewichte": {},
          "skalen": {
            "kapital": 2
          }
        },
        {
          "id": "bz5f",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "bz6",
      "bereich": "beziehung-zu-dir",
      "typ": "single",
      "text": "Wie geht ihr, du und die Person, mit Konflikten um, die nichts mit Politik zu tun haben?",
      "warum": "Wie ihr Alltagsstreit löst, zeigt besser als jede Politikdebatte, ob ihr Dissens aushaltet. Beratungsstellen empfehlen, Pausen als Pausen zu benennen; ob das nötig ist, hängt von eurem Muster ab (bpb 2024; Nocun).",
      "optionen": [
        {
          "id": "bz6a",
          "text": "Wir sprechen es an und vertragen uns wieder",
          "gewichte": {},
          "skalen": {
            "kapital": 3
          },
          "hinweis": "Ihr habt eine Streitkultur, nutze sie: Dieselben Regeln, die bei Alltagsstreit helfen, gelten auch für Politik."
        },
        {
          "id": "bz6b",
          "text": "Es wird nicht angesprochen, bleibt aber nicht lange im Raum",
          "gewichte": {},
          "skalen": {
            "kapital": 2
          }
        },
        {
          "id": "bz6c",
          "text": "Einer von uns gibt meist nach, damit Ruhe ist",
          "gewichte": {},
          "skalen": {
            "kapital": 1
          },
          "hinweis": "Nachgeben hält die Ruhe, kostet aber Ehrlichkeit. Übe bei kleinen Themen, deine Sicht zu sagen, bevor du es bei Politik tust."
        },
        {
          "id": "bz6d",
          "text": "Es schwelt lange, manchmal mit Funkstille",
          "gewichte": {},
          "skalen": {
            "kapital": 0,
            "belastung": 1
          },
          "hinweis": "Funkstille nach Streit ist bei euch Muster. Vereinbart vorher, dass ein Abbruch eine Pause ist und kein Ende, und wer sich wann wieder meldet."
        },
        {
          "id": "bz6e",
          "text": "Es gibt kaum Konflikte, wir gehen uns eher aus dem Weg",
          "gewichte": {},
          "skalen": {
            "kapital": 1
          }
        }
      ]
    },
    {
      "id": "bz7",
      "bereich": "beziehung-zu-dir",
      "typ": "single",
      "text": "Hat sich die Person dir in letzter Zeit mit einer Sorge oder einem Problem anvertraut?",
      "warum": "Offenlegen von Persönlichem ist ein Beziehungsindikator (DJI 2024) und zugleich der direkte Weg zum Bedürfnis hinter der Position (3N-Modell). Die Antwort zeigt, ob du am Bedürfnis oder erst an der Beziehung arbeiten musst.",
      "optionen": [
        {
          "id": "bz7a",
          "text": "Ja, mit etwas Persönlichem, das die Person sonst nicht erzählt",
          "gewichte": {},
          "skalen": {
            "kapital": 3
          },
          "hinweis": "Die Person vertraut dir, und das Anvertraute ist oft das Bedürfnis hinter der Politik. Bleib dort, bevor du über Parteien sprichst."
        },
        {
          "id": "bz7b",
          "text": "Ja, aber nur über Praktisches wie Geld, Arbeit oder Gesundheit",
          "gewichte": {
            "gerechtigkeit-abgehaengt": 1,
            "kontrolle-angst": 1
          },
          "skalen": {
            "kapital": 2
          }
        },
        {
          "id": "bz7c",
          "text": "Nur über politische Sorgen, die die Person ohnehin allen erzählt",
          "gewichte": {
            "protest-wut": 1
          },
          "skalen": {
            "kapital": 1
          }
        },
        {
          "id": "bz7d",
          "text": "Nein, die Person zeigt mir keine Schwäche",
          "gewichte": {
            "anerkennung": 1
          },
          "skalen": {
            "kapital": 0
          }
        },
        {
          "id": "bz7e",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "ge1",
      "bereich": "gespraeche",
      "typ": "multi",
      "text": "In welchen Situationen kommt es zwischen dir und der Person meist zu politischen Gesprächen?",
      "warum": "Das Setting entscheidet mehr als Argumente: Praxisstellen raten zu Gesprächen unter vier Augen und warnen vor Gruppe und Chat (MBR, KAST, bpb 2024). Die Antwort zeigt, ob du erst das Setting ändern musst.",
      "optionen": [
        {
          "id": "ge1a",
          "text": "Unter vier Augen, in Ruhe",
          "gewichte": {},
          "skalen": {
            "offenheit": 2
          },
          "hinweis": "Beste Bedingung. Behalte das bei; vor Publikum geht es um Gesichtswahrung, nicht um Inhalte."
        },
        {
          "id": "ge1b",
          "text": "Am Familientisch oder in einer Runde mit anderen",
          "gewichte": {},
          "skalen": {
            "offenheit": 1
          },
          "hinweis": "In der Gruppe verteidigt die Person eine Position, keinen Gedanken. Verschiebe es auf ein Gespräch zu zweit: „Lass uns das später in Ruhe besprechen.“"
        },
        {
          "id": "ge1c",
          "text": "Im Chat oder per Sprachnachricht, oft mit weitergeleiteten Inhalten",
          "gewichte": {
            "misstrauen": 1
          },
          "skalen": {
            "offenheit": 0
          },
          "hinweis": "Chats eskalieren und beweisen nichts. Antworte auf Weitergeleitetes nicht inhaltlich, sondern mit einem Gesprächsangebot: „Lass uns das am Sonntag besprechen.“"
        },
        {
          "id": "ge1d",
          "text": "Spontan, wenn Nachrichten laufen oder etwas passiert ist",
          "gewichte": {},
          "skalen": {
            "offenheit": 1
          }
        },
        {
          "id": "ge1e",
          "text": "Nach Alkohol oder spät abends",
          "gewichte": {
            "protest-wut": 1
          },
          "skalen": {
            "offenheit": 0
          },
          "hinweis": "In dieser Lage nicht diskutieren. Vertage freundlich und komm nüchtern darauf zurück."
        },
        {
          "id": "ge1f",
          "text": "Es kommt kaum zu politischen Gesprächen",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "ge2",
      "bereich": "gespraeche",
      "typ": "multi",
      "text": "Was passiert typischerweise, kurz bevor ein Gespräch mit der Person kippt?",
      "warum": "Reaktanz, nicht Backfire, ist der Mechanismus der Verhärtung: Gegenargumentieren, Ärger auf den Boten, Etiketten (Swire-Thompson 2020). Wer den eigenen Kipppunkt kennt, kann ihn im nächsten Gespräch gezielt vermeiden.",
      "optionen": [
        {
          "id": "ge2a",
          "text": "Ich bringe Fakten, Zahlen oder Links",
          "gewichte": {},
          "skalen": {
            "offenheit": 1
          },
          "hinweis": "Faktenduelle sind der häufigste Kipppunkt; Fakten wirken nur klein und kurz (Walter 2020). Ersetze Belege durch Fragen: „Wie kommst du darauf?“"
        },
        {
          "id": "ge2b",
          "text": "Einer von uns benutzt Wörter wie „Nazi“, „Schwurbler“ oder „Gutmensch“",
          "gewichte": {},
          "skalen": {
            "offenheit": 0
          },
          "hinweis": "Etiketten schaden dem Absender und schließen Türen (Dusso/Perkins 2023). Vereinbart, dass bestimmte Wörter tabu sind, auf beiden Seiten."
        },
        {
          "id": "ge2c",
          "text": "Die Person springt von Parole zu Parole, ich komme nicht hinterher",
          "gewichte": {
            "misstrauen": 1
          },
          "skalen": {
            "offenheit": 1
          },
          "hinweis": "Parolen-Hopping unterbinden: „Lass uns bei dem einen Punkt bleiben.“ Ein Thema pro Gespräch ist genug."
        },
        {
          "id": "ge2d",
          "text": "Die Person fühlt sich persönlich angegriffen, obwohl ich die Sache meinte",
          "gewichte": {
            "anerkennung": 2
          },
          "skalen": {
            "offenheit": 1
          },
          "hinweis": "Die Person hört Kritik an der Partei als Kritik an sich. Trenne hörbar: „Ich meine nicht dich, ich meine diese Aussage.“"
        },
        {
          "id": "ge2e",
          "text": "Andere mischen sich ein",
          "gewichte": {},
          "skalen": {
            "offenheit": 1
          }
        },
        {
          "id": "ge2f",
          "text": "Ich merke es nicht, plötzlich ist es laut",
          "gewichte": {},
          "skalen": {
            "offenheit": 1
          },
          "hinweis": "Achte auf das erste Körpersignal: schnelleres Reden, Unterbrechen. Vereinbart ein Stoppwort, das beide ohne Gesichtsverlust nutzen dürfen."
        },
        {
          "id": "ge2g",
          "text": "Es kippt eigentlich nicht",
          "gewichte": {},
          "skalen": {
            "offenheit": 3
          }
        }
      ]
    },
    {
      "id": "ge3",
      "bereich": "gespraeche",
      "typ": "multi",
      "text": "Was hat die Person in einem Gespräch schon einmal ruhiger werden lassen?",
      "warum": "Nicht wertendes Zuhören und Erzählen senken Abwehr und Extremität (Itzchakov 2017; Kalla/Broockman 2020). Was bei der Person schon einmal gewirkt hat, ist der wiederholbare Zugang, den der Fahrplan an den Anfang stellt.",
      "optionen": [
        {
          "id": "ge3a",
          "text": "Dass ich das Erlebnis der Person ernst genommen habe, ohne ihre Schlüsse zu teilen",
          "gewichte": {},
          "skalen": {
            "offenheit": 2
          },
          "hinweis": "Das ist der Kern des wirksamen Gesprächs. Mach es zur Regel: erst das Erlebnis würdigen, dann getrennt über die Schlüsse reden."
        },
        {
          "id": "ge3b",
          "text": "Dass ich in eigenen Worten wiederholt habe, was die Person meint",
          "gewichte": {
            "anerkennung": 1
          },
          "skalen": {
            "offenheit": 2
          },
          "hinweis": "Spiegeln senkt Abwehr (Itzchakov 2017). Nutze es bewusst, bevor du etwas erwiderst."
        },
        {
          "id": "ge3c",
          "text": "Eine persönliche Geschichte von mir oder von jemandem, den die Person kennt",
          "gewichte": {},
          "skalen": {
            "offenheit": 2
          },
          "hinweis": "Geschichten tragen bei der Person. Sammle Erlebnisse konkreter Menschen, die bei der Person Respekt genießen, und erzähle davon, statt zu argumentieren."
        },
        {
          "id": "ge3d",
          "text": "Ein Wechsel zu etwas Gemeinsamem oder eine Pause",
          "gewichte": {},
          "skalen": {
            "offenheit": 1
          }
        },
        {
          "id": "ge3e",
          "text": "Nichts, es beruhigt sich erst, wenn ich schweige",
          "gewichte": {},
          "skalen": {
            "offenheit": 0
          },
          "hinweis": "Schweigen wird oft als Zustimmung gelesen (bpb 2024). Ersetze es durch eine kurze Ich-Botschaft: „Ich sehe das anders, und ich bleibe.“"
        },
        {
          "id": "ge3f",
          "text": "Weiß ich nicht, ich habe nie darauf geachtet",
          "gewichte": {},
          "hinweis": "Achte beim nächsten Mal bewusst darauf, wann der Ton der Person weicher wird. Das ist dein wichtigstes Werkzeug."
        }
      ]
    },
    {
      "id": "ge4",
      "bereich": "gespraeche",
      "typ": "single",
      "text": "Wer vermeidet das Thema Politik, du oder die Person, und warum?",
      "warum": "Beratungsstellen raten: früh ansprechen, nicht schweigen, aber unter vier Augen (bpb 2024, MBR). Wer das Thema aus welchem Grund meidet, bestimmt, ob dein nächster Schritt ein Gesprächsangebot oder eine Entlastung ist.",
      "optionen": [
        {
          "id": "ge4a",
          "text": "Ich, um den Frieden zu wahren",
          "gewichte": {},
          "skalen": {
            "offenheit": 1,
            "belastung": 1
          },
          "hinweis": "Dein Schweigen wird als Zustimmung oder Abwertung gelesen. Ein kurzer, ruhiger Satz mit deiner Haltung reicht; keine Debatte nötig."
        },
        {
          "id": "ge4b",
          "text": "Die Person, sie blockt ab, sobald ich anfange",
          "gewichte": {
            "kontrolle-angst": 1
          },
          "skalen": {
            "offenheit": 0
          },
          "hinweis": "Die Person schützt sich. Frag um Erlaubnis: „Darf ich dich etwas dazu fragen, ohne dass wir streiten?“ Ein Nein ist dann auch eine Antwort."
        },
        {
          "id": "ge4c",
          "text": "Beide, stillschweigend",
          "gewichte": {},
          "skalen": {
            "offenheit": 1
          },
          "hinweis": "Beidseitiges Vermeiden kostet nichts Akutes, verfestigt aber. Beginne nicht mit Politik, sondern mit dem, was die Person gerade wirklich beschäftigt."
        },
        {
          "id": "ge4d",
          "text": "Niemand, es ist ständig Thema",
          "gewichte": {
            "protest-wut": 1
          },
          "skalen": {
            "offenheit": 1,
            "belastung": 1
          },
          "hinweis": "Dauerthema erschöpft beide. Vereinbart politikfreie Zeiten, in denen ihr euch als Menschen begegnet."
        },
        {
          "id": "ge4e",
          "text": "Niemand, wir können es ansprechen und auch wieder lassen",
          "gewichte": {},
          "skalen": {
            "offenheit": 3
          }
        }
      ]
    },
    {
      "id": "ge5",
      "bereich": "gespraeche",
      "typ": "multi",
      "text": "Was hast du bei der Person bisher schon versucht?",
      "warum": "Was du schon probiert hast, bestimmt, was der Fahrplan überspringt oder korrigiert: Fakten allein wirken kaum, Druck und Spott schaden, Zuhören und Erzählen tragen (Walter 2020; O’Mahony 2023; Kalla/Broockman 2020).",
      "optionen": [
        {
          "id": "ge5a",
          "text": "Mit Fakten und Quellen widerlegen",
          "gewichte": {},
          "hinweis": "Richtig war: nicht schweigen. Wirksamer: Fakten einmal nennen, dann zum Erlebnis wechseln und fragen, wie die Person prüfen würde, ob etwas stimmt."
        },
        {
          "id": "ge5b",
          "text": "Zuhören und nachfragen, ohne zu bewerten",
          "gewichte": {},
          "skalen": {
            "offenheit": 1
          },
          "hinweis": "Du bist auf dem belegten Weg (Kalla/Broockman 2020). Nächster Schritt: eigene Erlebnisse erzählen und die Geschichte von jemandem einbringen, der selbst betroffen ist."
        },
        {
          "id": "ge5c",
          "text": "Meine Position klar gesagt und eine Grenze gezogen",
          "gewichte": {},
          "skalen": {
            "offenheit": 1
          },
          "hinweis": "Grenze plus Beziehung ist der Praxiskonsens. Prüfe, ob die Grenze begründet und durchsetzbar war; nur solche halten."
        },
        {
          "id": "ge5d",
          "text": "Mit Druck: Ultimatum, Kontaktdrohung, Verbot",
          "gewichte": {},
          "skalen": {
            "offenheit": 0
          },
          "hinweis": "Druck beschleunigt den Weg in die Gruppe. Nimm Ultimaten zurück, die du nicht halten kannst, und benenne stattdessen Kontaktregeln, die du wirklich einhältst."
        },
        {
          "id": "ge5e",
          "text": "Andere Menschen eingebunden, die die Person respektiert",
          "gewichte": {},
          "skalen": {
            "offenheit": 1
          },
          "hinweis": "Guter Hebel, solange es nicht inszeniert wirkt. Keine Überraschungsrunden; Begegnungen beiläufig ermöglichen."
        },
        {
          "id": "ge5f",
          "text": "Ironie, Spott oder Augenrollen",
          "gewichte": {},
          "skalen": {
            "offenheit": 0
          },
          "hinweis": "Spott erhöht Verschwörungsglauben teils (O’Mahony 2023) und trifft das Bedürfnis nach Anerkennung. Lass es weg, auch im Scherz."
        },
        {
          "id": "ge5g",
          "text": "Noch nichts Gezieltes",
          "gewichte": {},
          "hinweis": "Gut, dann startest du ohne verbrannte Erde. Beginne mit Zuhören und einer offenen Frage, nicht mit Belegen."
        }
      ]
    },
    {
      "id": "ge6",
      "bereich": "gespraeche",
      "typ": "single",
      "text": "Wie unterscheidet sich das, was die Person dir allein sagt, von dem, was sie vor anderen sagt?",
      "warum": "Der Wechsel von Diskussion zu Loyalitätsbekundung ist ein Warnsignal für Verhärtung, geäußerte Ambivalenz ein Öffnungssignal (Priester/Petty 1996). Der Unterschied zeigt, welche Situation du suchen und welche du meiden solltest.",
      "optionen": [
        {
          "id": "ge6a",
          "text": "Allein ist die Person nachdenklicher, differenzierter, auch mal unsicher",
          "gewichte": {},
          "skalen": {
            "offenheit": 3
          },
          "hinweis": "Ambivalenz ist der Moment, in dem Einfluss möglich ist. Lass das „ja, aber“ stehen, ohne es auszunutzen; frag, was die Person zögern lässt."
        },
        {
          "id": "ge6b",
          "text": "Allein ist die Person härter, vor anderen hält sie sich zurück",
          "gewichte": {
            "misstrauen": 1
          },
          "skalen": {
            "offenheit": 1
          },
          "hinweis": "Die Person zeigt dir ihre ungefilterte Sicht, das ist Vertrauen. Setze bei menschenverachtenden Aussagen trotzdem Grenzen, ruhig und begründet."
        },
        {
          "id": "ge6c",
          "text": "Vor anderen ist die Person lauter und bekennt sich betont zur Partei",
          "gewichte": {
            "zugehoerigkeit": 2
          },
          "skalen": {
            "offenheit": 1
          },
          "hinweis": "Öffentliches Bekennen ist Loyalität zur Gruppe, nicht Überzeugung. Diskutiere nie in der Runde; dort kann die Person nur verlieren oder lauter werden."
        },
        {
          "id": "ge6d",
          "text": "Kein Unterschied, die Person sagt überall dasselbe",
          "gewichte": {},
          "skalen": {
            "offenheit": 1
          }
        },
        {
          "id": "ge6e",
          "text": "Ich erlebe die Person nur in einer der beiden Situationen",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "ge7",
      "bereich": "gespraeche",
      "typ": "multi",
      "text": "Gibt es Punkte, bei denen ihr euch einig seid, du und die Person, auch wenn ihr die Lösung anders seht?",
      "warum": "Gespräche, die bei geteilten Sorgen beginnen, senken Abwehr und machen Dissens tragbar (Kalla/Broockman 2020; Motivational Interviewing). Wo ihr euch einig seid, entscheidet, womit du anfängst, bevor ihr über Unterschiede sprecht.",
      "optionen": [
        {
          "id": "ge7a",
          "text": "Beim Problem ja, bei der Lösung nein",
          "gewichte": {},
          "skalen": {
            "offenheit": 2
          },
          "hinweis": "Beginne jedes Gespräch mit dem geteilten Problem und benenne erst dann, wo ihr euch trennt. So muss die Person nicht die ganze Haltung verteidigen."
        },
        {
          "id": "ge7b",
          "text": "Bei konkreten Dingen vor Ort: Bus, Arzt, Schule, Sicherheit",
          "gewichte": {
            "identitaet-heimat": 1,
            "gerechtigkeit-abgehaengt": 1
          },
          "skalen": {
            "offenheit": 2
          },
          "hinweis": "Lokales ist der beste gemeinsame Boden. Macht etwas daraus: Bürgerfragestunde, Ortsbeirat, eine Anfrage. Gemeinsames Handeln wirkt stärker als jedes Gespräch."
        },
        {
          "id": "ge7c",
          "text": "Bei Kritik an Regierung oder Parteien allgemein",
          "gewichte": {
            "protest-wut": 1
          },
          "skalen": {
            "offenheit": 1
          },
          "hinweis": "Geteilte Enttäuschung verbindet, kann aber in gemeinsames Schimpfen kippen. Frag, was stattdessen sein sollte; dort trennen sich die Wege, und dort wird es ehrlich."
        },
        {
          "id": "ge7d",
          "text": "Bei Werten: Fairness, Ehrlichkeit, Anstand",
          "gewichte": {
            "gerechtigkeit-abgehaengt": 1,
            "anerkennung": 1
          },
          "skalen": {
            "offenheit": 2
          },
          "hinweis": "Argumentiere in diesen gemeinsamen Werten, nicht in deinen eigenen, und frag, ob die Werte auch für die Menschen gelten, die die Person ablehnt."
        },
        {
          "id": "ge7e",
          "text": "Nein, wir sehen fast alles verschieden",
          "gewichte": {},
          "skalen": {
            "offenheit": 1
          },
          "hinweis": "Ohne gemeinsamen Boden trägt nur die Beziehung. Such bewusst nach einer einzigen geteilten Sorge, bevor du über Politik sprichst."
        },
        {
          "id": "ge7f",
          "text": "Haben wir nie gesucht",
          "gewichte": {},
          "hinweis": "Frag die Person direkt: „Was müsste sich aus deiner Sicht ändern?“ Oft findet ihr dort mehr Gemeinsames, als ihr dachtet."
        }
      ]
    },
    {
      "id": "ak1",
      "bereich": "aktivitaet",
      "typ": "multi",
      "text": "Was davon hast du in den letzten zwölf Monaten bei der Person beobachtet?",
      "warum": "Das Zwiebelmodell trennt Sympathisanten, Unterstützer, Aktivisten und Elite; je weiter innen, desto mehr ist Zugehörigkeit statt Inhalt der Halteanker (Pfeiffer 2024; Spissinger). Die Stufe entscheidet, ob du allein weiterkommst oder Fachberatung brauchst.",
      "optionen": [
        {
          "id": "ak1a",
          "text": "Die Person war bei Veranstaltungen, Demos oder Stammtischen der Partei",
          "gewichte": {
            "zugehoerigkeit": 2,
            "protest-wut": 1
          }
        },
        {
          "id": "ak1b",
          "text": "Die Person ist Mitglied oder hat gespendet",
          "gewichte": {
            "zugehoerigkeit": 2
          }
        },
        {
          "id": "ak1c",
          "text": "Die Person hilft mit: Flyer, Plakate, Infostand, Fahrdienst",
          "gewichte": {
            "zugehoerigkeit": 3
          },
          "hinweis": "Praktisches Mitmachen bindet über Aufgaben, nicht über das Programm. Frag, was der Person die Aufgabe gibt und ob es das auch woanders gäbe."
        },
        {
          "id": "ak1d",
          "text": "Die Person hat ein Amt, eine Kandidatur oder eine feste Rolle",
          "gewichte": {
            "zugehoerigkeit": 3,
            "anerkennung": 2
          },
          "hinweis": "Mit einer Funktion sind Partei, Identität und Status verbunden. Private Gespräche ändern hier selten etwas; hol dir Ausstiegs- oder Angehörigenberatung dazu."
        },
        {
          "id": "ak1e",
          "text": "Die Person war bei Demos oder Aktionen, die nicht von der Partei kamen",
          "gewichte": {
            "protest-wut": 2,
            "zugehoerigkeit": 1
          }
        },
        {
          "id": "ak1f",
          "text": "Nichts davon, nur Reden und Teilen",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "ak2",
      "bereich": "aktivitaet",
      "typ": "multi",
      "text": "Wie sichtbar zeigt die Person ihre Haltung nach außen?",
      "warum": "Symbole, Kleidung und Musik sind in der Ausstiegsarbeit Beobachtungskriterien für Szeneeinbindung (DJI-Fallabschlusskriterien). Sichtbarkeit zeigt, wie sehr die Haltung zur Identität geworden ist, und ob Fachberatung sinnvoll ist.",
      "optionen": [
        {
          "id": "ak2a",
          "text": "Aufkleber, Fahne, Profilbild oder Schild am Haus",
          "gewichte": {
            "zugehoerigkeit": 1,
            "protest-wut": 1
          }
        },
        {
          "id": "ak2b",
          "text": "Kleidung, Marken oder Codes, die in der Szene bekannt sind",
          "gewichte": {
            "zugehoerigkeit": 2
          },
          "hinweis": "Szenekleidung und Codes sind Teil der Gruppenidentität. Nicht lächerlich machen; bei Minderjährigen Schule und Fachberatung einbeziehen."
        },
        {
          "id": "ak2c",
          "text": "Musik oder Bands aus dem rechten Spektrum",
          "gewichte": {
            "zugehoerigkeit": 2,
            "identitaet-heimat": 1
          },
          "hinweis": "Rechte Musik ist Einstiegsmedium und Gemeinschaftsritual; verschwindet die Musik, zählt das zu den Distanzierungskriterien des DJI. Achte auf Veränderungen in beide Richtungen."
        },
        {
          "id": "ak2d",
          "text": "Die Person trägt es offen vor sich her, auch im Beruf oder im Verein",
          "gewichte": {
            "protest-wut": 1,
            "anerkennung": 1
          },
          "hinweis": "Offenes Bekennen im Beruf kann Folgen haben, die die Person als Verfolgung deutet und die enger an die Gruppe binden. Sprich Konsequenzen sachlich an, nicht drohend."
        },
        {
          "id": "ak2e",
          "text": "Nur in Chats und sozialen Medien, nicht im Alltag",
          "gewichte": {
            "zugehoerigkeit": 1
          }
        },
        {
          "id": "ak2f",
          "text": "Gar nicht, das bleibt privat",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "ak3",
      "bereich": "aktivitaet",
      "typ": "single",
      "text": "Wie sieht die Online-Aktivität der Person aus, soweit du sie siehst?",
      "warum": "Online-Verhalten reicht von Konsum bis Organisation; mit jedem Schritt wächst das Netzwerk, das die Erzählung bestätigt (3N-Modell). Die Stufe bestimmt, ob Weiterleitungen ein Kontaktangebot sind oder ob Beratung nötig ist.",
      "optionen": [
        {
          "id": "ak3a",
          "text": "Die Person liest und schaut, teilt aber kaum",
          "gewichte": {}
        },
        {
          "id": "ak3b",
          "text": "Die Person leitet regelmäßig Inhalte weiter, auch an mich",
          "gewichte": {
            "zugehoerigkeit": 1,
            "protest-wut": 1
          },
          "hinweis": "Weiterleitungen sind oft Kontaktangebote, keine Argumente. Reagiere nicht auf den Inhalt, sondern auf die Person: „Was hat dich daran berührt?“"
        },
        {
          "id": "ak3c",
          "text": "Die Person kommentiert, streitet oder postet selbst",
          "gewichte": {
            "protest-wut": 2,
            "anerkennung": 1
          },
          "hinweis": "Online-Streit gibt der Person Wirkung und Anerkennung. Das Bedürfnis ist real; frag, wo es das auch offline gäbe."
        },
        {
          "id": "ak3d",
          "text": "Die Person ist in Gruppen aktiv, die sich auch offline treffen",
          "gewichte": {
            "zugehoerigkeit": 3
          },
          "hinweis": "Online-Gruppen mit Offline-Treffen sind der Weg in feste Strukturen. Jetzt zählt, dass du als Außenkontakt bleibst; hol dir Angehörigenberatung."
        },
        {
          "id": "ak3e",
          "text": "Die Person betreibt einen eigenen Kanal oder moderiert Gruppen",
          "gewichte": {
            "zugehoerigkeit": 2,
            "anerkennung": 2
          },
          "hinweis": "Mit eigener Reichweite hat die Person Status und eine Verpflichtung gegenüber Followern; Ausstieg hieße Statusverlust. Professionelle Beratung einbeziehen."
        },
        {
          "id": "ak3f",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "ak4",
      "bereich": "aktivitaet",
      "typ": "single",
      "text": "Versucht die Person, andere zu überzeugen oder für die Partei zu gewinnen?",
      "warum": "Werben ist das Kriterium für Basisaktivismus im Zwiebelmodell; wer andere gewinnt, bindet sich selbst tiefer (Pfeiffer 2024). Bei Werbung unter Minderjährigen braucht es Schule und Fachberatung (RuF 2024).",
      "optionen": [
        {
          "id": "ak4a",
          "text": "Nein, die Person redet über ihre Sicht, wirbt aber nicht",
          "gewichte": {}
        },
        {
          "id": "ak4b",
          "text": "Die Person versucht es bei Familie und Freunden, eher beiläufig",
          "gewichte": {
            "protest-wut": 1,
            "zugehoerigkeit": 1
          }
        },
        {
          "id": "ak4c",
          "text": "Die Person wirbt gezielt, bringt Leute mit, verteilt Material",
          "gewichte": {
            "zugehoerigkeit": 3,
            "anerkennung": 1
          },
          "hinweis": "Wer wirbt, hat Mission und Rolle. Das ist Basisaktivismus; hol dir die Mobile Beratung oder eine Angehörigenberatung dazu und schütze Jüngere im Umfeld."
        },
        {
          "id": "ak4d",
          "text": "Die Person wirbt vor allem bei Jugendlichen oder Kindern",
          "gewichte": {
            "zugehoerigkeit": 2
          },
          "hinweis": "Werben bei Minderjährigen ist eine rote Linie. Informiere Eltern, Schule oder Jugendarbeit und lass dich beraten (Fachstelle Rechtsextremismus und Familie)."
        },
        {
          "id": "ak4e",
          "text": "Die Person hat es aufgegeben, weil niemand zuhört",
          "gewichte": {
            "protest-wut": 1,
            "anerkennung": 1
          },
          "hinweis": "Aufgegebenes Werben zeigt Enttäuschung, auch über die eigene Seite. Ein Moment für Fragen nach dem, was sich die Person erhofft hatte."
        },
        {
          "id": "ak4f",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "ak5",
      "bereich": "aktivitaet",
      "typ": "single",
      "text": "Hat die Person persönlichen Kontakt zu Funktionären oder bekannten Köpfen der Szene?",
      "warum": "Das Netzwerk bestätigt die Erzählung; radikalisierte Freund:innen erhöhen das Risiko mehr als Familie (Kruglanski; Jasko et al.). Die Nähe zu Kadern oder außerparteilichen Gruppen entscheidet, ob du allein oder mit Fachberatung handeln solltest.",
      "optionen": [
        {
          "id": "ak5a",
          "text": "Nein, die Person kennt niemanden persönlich",
          "gewichte": {}
        },
        {
          "id": "ak5b",
          "text": "Die Person kennt Leute vom Ortsverband oder Stammtisch",
          "gewichte": {
            "zugehoerigkeit": 2
          }
        },
        {
          "id": "ak5c",
          "text": "Die Person ist mit Funktionären befreundet oder trifft sie privat",
          "gewichte": {
            "zugehoerigkeit": 3,
            "anerkennung": 1
          },
          "hinweis": "Private Freundschaften mit Kadern sind die stärkste Bindung; Ausstieg gilt dort als Verrat. Erwarte keine schnellen Schritte und lass dich bei einer Ausstiegsberatung zu deiner Rolle beraten."
        },
        {
          "id": "ak5d",
          "text": "Die Person hat Kontakt zu Gruppen außerhalb der Partei, etwa Kameradschaften oder Reichsbürger-Kreisen",
          "gewichte": {
            "zugehoerigkeit": 2,
            "misstrauen": 1
          },
          "skalen": {
            "verschwoerung": 2
          },
          "hinweis": "Kontakte zu Kameradschaften oder Reichsbürger-Kreisen sind ein Grund für professionelle Hilfe: Mobile Beratung, Fachstelle Rechtsextremismus und Familie oder EXIT-Deutschland. Keine eigenen Nachforschungen."
        },
        {
          "id": "ak5e",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "ak6",
      "bereich": "aktivitaet",
      "typ": "single",
      "text": "Wie viel Zeit und Geld steckt die Person in die Sache, verglichen mit früher?",
      "warum": "Zeit- und Geldeinsatz zeigt die Gewichtung im Leben; weniger Szene-Konsum und Aktivitäten außerhalb sind DJI-Verlaufsindikatoren. Ob es zunimmt oder abnimmt, verändert dein Ziel: Brücke halten oder Alternative anbieten.",
      "optionen": [
        {
          "id": "ak6a",
          "text": "Kaum, es ist ein Thema unter vielen",
          "gewichte": {}
        },
        {
          "id": "ak6b",
          "text": "Mehr als früher, andere Hobbys treten zurück",
          "gewichte": {
            "zugehoerigkeit": 2
          },
          "hinweis": "Wenn alte Hobbys weichen, verschiebt sich das Netzwerk der Person. Halte die alten Aktivitäten am Leben und lade gezielt dazu ein."
        },
        {
          "id": "ak6c",
          "text": "Es ist zum Lebensmittelpunkt der Person geworden",
          "gewichte": {
            "zugehoerigkeit": 3
          },
          "hinweis": "Wird die Gruppe zum Lebensmittelpunkt, greift privater Einfluss nur begrenzt (Violence Prevention Network). Bleib Brücke, mobilisiere weitere Außenkontakte und hol dir Angehörigenberatung."
        },
        {
          "id": "ak6d",
          "text": "Es nimmt gerade wieder ab",
          "gewichte": {},
          "hinweis": "Nachlassender Einsatz kann ein erster Rückzug sein. Nicht kommentieren, sondern Alternativen anbieten, die Gemeinschaft und Aufgabe ersetzen."
        },
        {
          "id": "ak6e",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "ak7",
      "bereich": "aktivitaet",
      "typ": "single",
      "text": "Hatte die Haltung der Person schon spürbare Folgen für sie, etwa im Job, im Verein oder in der Familie?",
      "warum": "Sanktionen können Verfolgungserzählungen bestätigen oder Ambivalenz auslösen; verlorene Außenkontakte sind der stärkste Schub in die Szene (Bjørgo; Jensen et al.). Wie die Person Folgen deutet, zeigt, ob du Brücken oder Fragen priorisierst.",
      "optionen": [
        {
          "id": "ak7a",
          "text": "Nein, bisher nicht",
          "gewichte": {}
        },
        {
          "id": "ak7b",
          "text": "Ja, und die Person deutet es als Beweis, dass man verfolgt wird",
          "gewichte": {
            "misstrauen": 2,
            "protest-wut": 1
          },
          "skalen": {
            "verschwoerung": 1
          },
          "hinweis": "Folgen, die als Verfolgung gelesen werden, binden enger an die Gruppe. Widersprich der Deutung nicht frontal; frag, was sich die Person von den Menschen gewünscht hätte."
        },
        {
          "id": "ak7c",
          "text": "Ja, und es hat die Person nachdenklich gemacht",
          "gewichte": {},
          "skalen": {
            "offenheit": 2
          },
          "hinweis": "Nachdenklichkeit nach Folgen ist eine Chance. Nicht „siehst du“, sondern: „Was war dir an dem Verein wichtig?“ Das Bedürfnis dahinter braucht einen anderen Ort."
        },
        {
          "id": "ak7d",
          "text": "Ja, die Person hat Kontakte oder einen Verein verloren und ist jetzt mehr in der Szene",
          "gewichte": {
            "zugehoerigkeit": 3
          },
          "hinweis": "Verlorene Außenkontakte werden durch die Gruppe ersetzt. Jede Brücke, die du hältst oder neu knüpfst, wirkt direkt gegen diesen Mechanismus."
        },
        {
          "id": "ak7e",
          "text": "Weiß ich nicht",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "du1",
      "bereich": "du-selbst",
      "typ": "single",
      "text": "Was wäre für dich in einem halben Jahr ein echter Erfolg mit der Person?",
      "warum": "Realistische Ziele schützen vor Erschöpfung: Niemand wird umgedreht, realistisch sind Zweifel, Beziehungserhalt und kleine Verschiebungen über Monate (Kalla/Broockman 2020; Rothkegel 2021). Dein Ziel bestimmt, woran der Fahrplan Fortschritt misst.",
      "optionen": [
        {
          "id": "du1a",
          "text": "Dass die Person die Partei nicht mehr unterstützt",
          "gewichte": {},
          "skalen": {
            "belastung": 2
          },
          "hinweis": "In sechs Monaten unrealistisch: Ausstiege dauern Jahre, Einstellungseffekte sind klein. Setze ein Zwischenziel, sonst wirst du enttäuscht aufgeben."
        },
        {
          "id": "du1b",
          "text": "Dass wir wieder reden können, ohne zu streiten",
          "gewichte": {},
          "skalen": {
            "belastung": 1
          },
          "hinweis": "Beziehungserhalt ist ein legitimes, messbares Zwischenziel und die Voraussetzung für alles Weitere (DJI 2024)."
        },
        {
          "id": "du1c",
          "text": "Dass die Person einmal einen Zweifel äußert oder nachfragt",
          "gewichte": {},
          "skalen": {
            "belastung": 0
          },
          "hinweis": "Realistisch und gut beobachtbar. Zähle „ja, aber“-Momente und Fragen nach anderen Quellen als Fortschritt."
        },
        {
          "id": "du1d",
          "text": "Dass die Person Kontakte außerhalb der Szene behält oder neu findet",
          "gewichte": {},
          "skalen": {
            "belastung": 0
          },
          "hinweis": "Der stärkste bekannte Schutzfaktor. Daran kannst du konkret arbeiten: Einladungen, gemeinsame Aufgaben, andere Bezugspersonen einbinden."
        },
        {
          "id": "du1e",
          "text": "Dass ich die Beziehung ohne Schuldgefühl beenden kann",
          "gewichte": {},
          "skalen": {
            "belastung": 3
          },
          "hinweis": "Ein Ende zu erwägen ist legitim; Selbstschutz geht vor. Sprich das zuerst mit einer Angehörigenberatung durch; dort lernst du, Pause und Abbruch zu unterscheiden."
        },
        {
          "id": "du1f",
          "text": "Ich weiß es nicht",
          "gewichte": {},
          "skalen": {
            "belastung": 1
          },
          "hinweis": "Ohne Ziel misst du Erfolg an den Reaktionen der Person, und die enttäuschen. Wähle ein kleines, beobachtbares Ziel aus dem Fahrplan, bevor du weitermachst."
        }
      ]
    },
    {
      "id": "du2",
      "bereich": "du-selbst",
      "typ": "multi",
      "text": "Was am Verhalten der Person trifft dich selbst am stärksten?",
      "warum": "Eigene Auslöser zu kennen ist Voraussetzung, um im Gespräch nicht selbst in Reaktanz zu fallen; Mitgefühlserschöpfung ist bei Angehörigen und Beratenden belegt (Rothkegel 2021). Die Antwort legt fest, welche Leitplanke du vorab brauchst.",
      "optionen": [
        {
          "id": "du2a",
          "text": "Bestimmte Wörter oder Aussagen über Gruppen von Menschen",
          "gewichte": {},
          "skalen": {
            "belastung": 2
          },
          "hinweis": "Benenne diese Grenze vorab, ruhig und als Ich-Botschaft: „Bei diesem Wort steige ich aus.“ Eine vorher bekannte Grenze muss nicht im Streit gesetzt werden."
        },
        {
          "id": "du2b",
          "text": "Dass die Person mich oder meine Arbeit abwertet",
          "gewichte": {},
          "skalen": {
            "belastung": 2
          },
          "hinweis": "Abwertung ist oft Abwehr, trifft dich aber real. Hol dir Rückhalt bei Menschen, die deine Arbeit sehen, bevor du das nächste Gespräch führst."
        },
        {
          "id": "du2c",
          "text": "Dass die Person Dinge sagt, die sie früher nie gesagt hätte",
          "gewichte": {},
          "skalen": {
            "belastung": 2
          },
          "hinweis": "Du trauerst um den Menschen, der die Person früher war. Das ist normal und braucht einen Ort: Angehörigengruppen und Beratung sind genau dafür da."
        },
        {
          "id": "du2d",
          "text": "Dass die Person mir nicht zuhört, egal was ich sage",
          "gewichte": {},
          "skalen": {
            "belastung": 1
          },
          "hinweis": "Nicht gehört zu werden erschöpft. Prüfe, ob du selbst zuerst zuhörst; oft öffnet erst das die Ohren der Person."
        },
        {
          "id": "du2e",
          "text": "Dass andere mich fragen, wie ich das aushalte",
          "gewichte": {},
          "skalen": {
            "belastung": 2
          },
          "hinweis": "Du musst dich für die Beziehung nicht rechtfertigen: Kontakt halten ist Prävention, nicht Nachgiebigkeit."
        },
        {
          "id": "du2f",
          "text": "Wenig, ich kann es meist von mir fernhalten",
          "gewichte": {},
          "skalen": {
            "belastung": 0
          }
        }
      ]
    },
    {
      "id": "du3",
      "bereich": "du-selbst",
      "typ": "single",
      "text": "Wie geht es dir nach einem Gespräch mit der Person meistens?",
      "warum": "Die Belastung der nutzenden Person entscheidet, ob der Fahrplan beim Gespräch oder beim Selbstschutz beginnt (Umsteigepunkt eigene Erschöpfung). Erschöpfung und Vermeidung sind belegte Risiken für Angehörige (Rothkegel 2021; Nocun).",
      "optionen": [
        {
          "id": "du3a",
          "text": "Normal, es ist ein Thema unter vielen",
          "gewichte": {},
          "skalen": {
            "belastung": 0
          }
        },
        {
          "id": "du3b",
          "text": "Angespannt, aber nach einer Weile wieder gut",
          "gewichte": {},
          "skalen": {
            "belastung": 1
          }
        },
        {
          "id": "du3c",
          "text": "Lange aufgewühlt, ich grüble oder schlafe schlecht",
          "gewichte": {},
          "skalen": {
            "belastung": 2
          },
          "hinweis": "Nachwirkungen über Stunden sind ein Belastungszeichen. Plane nach Gesprächen bewusst Erholung und sprich mit jemandem darüber; Angehörigenberatung ist auch für dich da."
        },
        {
          "id": "du3d",
          "text": "Erschöpft, ich vermeide inzwischen den Kontakt",
          "gewichte": {},
          "skalen": {
            "belastung": 3
          },
          "hinweis": "Selbstschutz geht vor Fremdschutz. Benenne eine Pause als Pause, hol dir Unterstützung bei einer Angehörigenberatung und lies die Leitplanken, bevor du weitermachst."
        },
        {
          "id": "du3e",
          "text": "Schuldig, weil ich zu wenig oder zu viel gesagt habe",
          "gewichte": {},
          "skalen": {
            "belastung": 2
          },
          "hinweis": "Schuldgefühle zeigen überhöhte Erwartungen an dich. Du bist verantwortlich für dein Verhalten, nicht für die Haltung der Person."
        }
      ]
    },
    {
      "id": "du4",
      "bereich": "du-selbst",
      "typ": "multi",
      "text": "Mit wem kannst du offen über die Situation mit der Person sprechen?",
      "warum": "Nicht allein bleiben ist der erste Rat jeder Angehörigenberatung (RuF 2024); Supervision und kollegialer Austausch schützen vor Erschöpfung (Rothkegel 2021). Fehlt ein Netz, gehört Unterstützung suchen vor jedes Gespräch.",
      "optionen": [
        {
          "id": "du4a",
          "text": "Mit Partner:in, Familie oder engen Freund:innen",
          "gewichte": {},
          "skalen": {
            "belastung": 0
          }
        },
        {
          "id": "du4b",
          "text": "Mit anderen, die dasselbe Problem mit jemandem haben",
          "gewichte": {},
          "skalen": {
            "belastung": 0
          },
          "hinweis": "Austausch mit Gleichbetroffenen entlastet und liefert Ideen. Angehörigengruppen bieten genau das strukturiert an."
        },
        {
          "id": "du4c",
          "text": "Mit einer Beratungsstelle oder einer Fachkraft",
          "gewichte": {},
          "skalen": {
            "belastung": 0
          },
          "hinweis": "Gut. Nutze die Beratung auch zur Vorbereitung konkreter Gespräche, nicht nur in Krisen."
        },
        {
          "id": "du4d",
          "text": "Mit niemandem, die meisten verstehen nicht, warum ich dranbleibe",
          "gewichte": {},
          "skalen": {
            "belastung": 3
          },
          "hinweis": "Alleingänge sind das größte Risiko für dich (Rothkegel 2021). Die Fachstelle Rechtsextremismus und Familie und die Mobile Beratung sind vertraulich und für Angehörige da."
        },
        {
          "id": "du4e",
          "text": "Mit niemandem, ich will die Person nicht bloßstellen",
          "gewichte": {},
          "skalen": {
            "belastung": 2
          },
          "hinweis": "Beratung ist vertraulich, du musst keine Namen nennen. Dich zu stützen verrät die Person nicht."
        },
        {
          "id": "du4f",
          "text": "Ich habe bisher mit niemandem darüber gesprochen",
          "gewichte": {},
          "skalen": {
            "belastung": 2
          },
          "hinweis": "Such dir mindestens einen Menschen oder eine Beratungsstelle. Wer allein bleibt, überfordert sich, und das merkt auch die Person."
        }
      ]
    },
    {
      "id": "du5",
      "bereich": "du-selbst",
      "typ": "single",
      "text": "Wo liegt für dich die Grenze, an der du ein Gespräch mit der Person beendest oder den Kontakt pausierst?",
      "warum": "Grenzen setzen, begründen und nur verbieten, was man durchsetzen kann, ist der einhellige Praxiskonsens (bpb 2024, MBR). Ob du eine ausgesprochene, haltbare Grenze hast, bestimmt den nächsten Schritt im Fahrplan.",
      "optionen": [
        {
          "id": "du5a",
          "text": "Bei menschenverachtenden Aussagen, und das habe ich der Person gesagt",
          "gewichte": {},
          "skalen": {
            "belastung": 0
          },
          "hinweis": "Benannte, durchsetzbare Grenzen sind der Praxiskonsens. Halte jede Grenze jedes Mal ein, sonst verliert sie ihren Wert."
        },
        {
          "id": "du5b",
          "text": "Ich habe eine Grenze, aber die Person kennt sie nicht",
          "gewichte": {},
          "skalen": {
            "belastung": 1
          },
          "hinweis": "Eine unausgesprochene Grenze wirkt wie Laune. Sprich die Grenze in Ruhe aus und begründe sie, bevor sie das nächste Mal gebraucht wird."
        },
        {
          "id": "du5c",
          "text": "Ich ziehe keine, ich halte aus, bis es vorbei ist",
          "gewichte": {},
          "skalen": {
            "belastung": 2
          },
          "hinweis": "Aushalten ohne Grenze führt zu Rückzug oder Ausbruch. Übe eine kleine Grenze: „Über dieses Wort rede ich nicht. Über alles andere gern.“"
        },
        {
          "id": "du5d",
          "text": "Meine Grenze wechselt je nach Tagesform",
          "gewichte": {},
          "skalen": {
            "belastung": 2
          },
          "hinweis": "Wechselnde Grenzen verwirren und erschöpfen. Lege eine feste Grenze schriftlich fest, am besten mit jemandem aus deinem Umfeld."
        },
        {
          "id": "du5e",
          "text": "Ich habe mit Abbruch gedroht, es aber nicht durchgehalten",
          "gewichte": {},
          "skalen": {
            "belastung": 2
          },
          "hinweis": "Nicht eingelöste Drohungen entwerten Grenzen. Nimm die Drohung zurück und ersetze sie durch Kontaktregeln, die du wirklich halten kannst."
        },
        {
          "id": "du5f",
          "text": "Erst bei Gewalt oder Drohungen, alles andere halte ich aus",
          "gewichte": {},
          "skalen": {
            "belastung": 1
          }
        }
      ]
    },
    {
      "id": "du6",
      "bereich": "du-selbst",
      "typ": "single",
      "text": "Wie klar ist dir selbst, was du denkst und wo du stehst, bevor du mit der Person sprichst?",
      "warum": "Überwältigungsverbot und Transparenz-Test verlangen, die eigene Haltung offen zu vertreten, ohne zu belehren (Pohl 2015; Susser et al. 2019). Ob du deine Position kurz und ehrlich sagen kannst, entscheidet, ob du sie zeigst oder erst klärst.",
      "optionen": [
        {
          "id": "du6a",
          "text": "Sehr klar, ich kann meine Position in zwei Sätzen sagen",
          "gewichte": {},
          "skalen": {
            "belastung": 0
          },
          "hinweis": "Gut. Deine Haltung sichtbar zu machen wirkt über Normen, nicht über Argumente (Winter et al. 2022). Zwei Sätze reichen, mehr wird Belehrung."
        },
        {
          "id": "du6b",
          "text": "Klar in der Sache, aber ich kenne die Argumente der Person nicht gut",
          "gewichte": {},
          "skalen": {
            "belastung": 1
          },
          "hinweis": "Du musst nicht alles widerlegen können. Fragen wie „Wie kommst du darauf?“ funktionieren ohne Vorwissen; die Mobile Beratung hat Argumentationshilfen."
        },
        {
          "id": "du6c",
          "text": "Ich finde manches, was die Person sagt, selbst nachvollziehbar",
          "gewichte": {},
          "skalen": {
            "belastung": 1
          },
          "hinweis": "Teilzustimmung ist ehrlich und ein Zugang: Benenne, was du teilst (das Problem), und wo du dich trennst (Lösung, Abwertung). Das ist glaubwürdiger als Totalablehnung."
        },
        {
          "id": "du6d",
          "text": "Ich bin unsicher und will nicht besserwisserisch wirken",
          "gewichte": {},
          "skalen": {
            "belastung": 1
          },
          "hinweis": "Unsicherheit ist kein Hindernis, Belehrung wäre eins. Sag ehrlich: „Ich weiß es nicht genau, aber mir ist wichtig, dass …“"
        },
        {
          "id": "du6e",
          "text": "Mir geht es weniger um Politik als um die Person selbst",
          "gewichte": {},
          "skalen": {
            "belastung": 0
          },
          "hinweis": "Die tragfähigste Haltung: Beziehung vor Thema. Benenne trotzdem eine Grenze für menschenverachtende Aussagen."
        }
      ]
    },
    {
      "id": "du7",
      "bereich": "du-selbst",
      "typ": "single",
      "text": "In welcher Rolle bist du der Person gegenüber unterwegs?",
      "warum": "Rolle und Auftrag bestimmen Einfluss, Grenzen und Pflichten: Eltern Minderjähriger haben erzieherische Verantwortung, Fachkräfte Supervision und Datenschutz, Freund:innen den größten Zugeffekt (RuF 2024; Jasko et al.; BAG Ausstieg).",
      "optionen": [
        {
          "id": "du7a",
          "text": "Elternteil, und die Person ist minderjährig",
          "gewichte": {},
          "skalen": {
            "belastung": 1
          },
          "hinweis": "Erzieherische Verantwortung heißt: Interesse zeigen, Grenzen begründen, nur verbieten, was du durchsetzen kannst, keine heimliche Überwachung. Schule und Fachberatung einbeziehen (RuF 2024)."
        },
        {
          "id": "du7b",
          "text": "Elternteil, Kind oder Geschwister, und die Person ist erwachsen",
          "gewichte": {},
          "skalen": {
            "belastung": 1
          },
          "hinweis": "Familie hat weniger Einfluss als Freund:innen, aber die längste Brücke. Erwartungen realistisch halten; die Fachstelle Rechtsextremismus und Familie berät bundesweit."
        },
        {
          "id": "du7c",
          "text": "Partner:in",
          "gewichte": {},
          "skalen": {
            "belastung": 2
          },
          "hinweis": "In Partnerschaften ist der Abstand am kleinsten und die Belastung am höchsten. Lege fest, was du für dich brauchst, bevor du Gespräche planst; Angehörigenberatung ist für dich da."
        },
        {
          "id": "du7d",
          "text": "Freund:in",
          "gewichte": {},
          "skalen": {
            "belastung": 0
          },
          "hinweis": "Freund:innen außerhalb der Szene sind der wichtigste Zugfaktor für den Ausstieg (Bjørgo). Dein Kontakt zählt, auch ohne Politik."
        },
        {
          "id": "du7e",
          "text": "Kolleg:in oder Vorgesetzte:r",
          "gewichte": {},
          "skalen": {
            "belastung": 1
          },
          "hinweis": "Im Betrieb gelten Regeln und Rollen. Kläre, was du privat ansprichst und was Sache von Betriebsrat oder Leitung ist; die Mobile Beratung unterstützt auch Betriebe."
        },
        {
          "id": "du7f",
          "text": "Fachkraft, etwa in Schule, Jugendarbeit, Pflege oder Beratung",
          "gewichte": {},
          "skalen": {
            "belastung": 0
          },
          "hinweis": "Du hast Auftrag und Grenzen deiner Rolle. Nutze kollegiale Fallberatung und Supervision, beachte Vertraulichkeit und Datenschutz; keine Profile anlegen."
        },
        {
          "id": "du7g",
          "text": "Nachbar:in, Bekannte:r oder eine andere Rolle",
          "gewichte": {},
          "skalen": {
            "belastung": 0
          },
          "hinweis": "Lose Kontakte haben weniger Einfluss, aber auch weniger Last. Dein Beitrag ist, als freundliche Gegenstimme im Umfeld sichtbar zu bleiben (Winter et al. 2022)."
        }
      ]
    },
    {
      "id": "stufe",
      "bereich": "ausgangslage",
      "typ": "single",
      "text": "Wie eng ist die Person eingebunden?",
      "optionen": [
        {
          "id": "sympathie",
          "text": "Die Person sympathisiert und teilt Inhalte, mehr nicht",
          "gewichte": {}
        },
        {
          "id": "wahl",
          "text": "Die Person wählt die Partei und verteidigt sie",
          "gewichte": {}
        },
        {
          "id": "mitglied",
          "text": "Die Person ist Mitglied oder regelmäßig bei Veranstaltungen",
          "gewichte": {
            "zugehoerigkeit": 1
          }
        },
        {
          "id": "aktiv",
          "text": "Die Person engagiert sich aktiv, wirbt, organisiert",
          "gewichte": {
            "zugehoerigkeit": 2
          }
        },
        {
          "id": "kader",
          "text": "Die Person hat eine Funktion oder gehört zum inneren Kreis",
          "gewichte": {
            "zugehoerigkeit": 2,
            "anerkennung": 1
          }
        }
      ]
    },
    {
      "id": "beziehung",
      "bereich": "ausgangslage",
      "typ": "single",
      "text": "Wie nah steht ihr euch, du und die Person?",
      "optionen": [
        {
          "id": "eng",
          "text": "Sehr nah: Familie, Partnerschaft, enge Freundschaft",
          "gewichte": {}
        },
        {
          "id": "mittel",
          "text": "Mittel: Bekannte, Kolleg:innen, Vereinskontakt",
          "gewichte": {}
        },
        {
          "id": "lose",
          "text": "Lose: Nachbarschaft, gelegentlicher Kontakt",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "risiko",
      "bereich": "ausgangslage",
      "typ": "multi",
      "text": "Gibt es Warnzeichen bei der Person?",
      "optionen": [
        {
          "id": "gewalt",
          "text": "Die Person rechtfertigt Gewalt oder droht damit",
          "gewichte": {}
        },
        {
          "id": "waffen",
          "text": "Die Person besitzt Waffen oder spricht über Bewaffnung",
          "gewichte": {}
        },
        {
          "id": "rueckzug",
          "text": "Die Person zieht sich komplett zurück und bricht alle Kontakte ab",
          "gewichte": {}
        },
        {
          "id": "minderjaehrig",
          "text": "Die Person ist minderjährig",
          "gewichte": {}
        },
        {
          "id": "keine",
          "text": "Keines davon",
          "gewichte": {}
        }
      ]
    },
    {
      "id": "kraft",
      "bereich": "ausgangslage",
      "typ": "single",
      "text": "Wie viel Zeit und Kraft kannst du gerade für die Person aufbringen?",
      "optionen": [
        {
          "id": "kraft-viel",
          "text": "Regelmäßig Zeit, ich bin nah dran",
          "gewichte": {},
          "hinweis": "Du kannst die Linie „Das Gespräch“ vollständig fahren. Plane in Monaten, nicht in Wochen."
        },
        {
          "id": "kraft-mittel",
          "text": "Gelegentlich, in Abständen",
          "gewichte": {},
          "hinweis": "Konzentriere dich auf wenige Stationen: Zuhören, Beziehung halten, einen Zweifel stehen lassen."
        },
        {
          "id": "kraft-wenig",
          "text": "Ich bin selbst erschöpft oder belastet",
          "gewichte": {},
          "hinweis": "Selbstschutz zuerst. Lies die Leitplanken zum Selbstschutz und hol dir Unterstützung bei einer Angehörigenberatung, bevor du weitermachst."
        }
      ]
    }
  ],
  "treiber": [
    {
      "id": "anerkennung",
      "name": "Anerkennung und Bedeutung",
      "beduerfnis": "Gesehen werden, die eigene Leistung gewürdigt wissen und eine Rolle haben, die zählt.",
      "beschreibung": "Menschen, die sich als unsichtbar oder abgestempelt erleben, finden in der Partei und ihrem Umfeld etwas, das sonst fehlt: Jemand hört zu und nimmt sie ernst. Nach dem 3N-Modell von Kruglanski ist die Suche nach Bedeutsamkeit ein zentraler Motor der Hinwendung (Meta-Analysen 2024, Evidenz mittel). AfD-Wählende stufen ihren Status unabhängig vom Einkommen niedriger ein (Hilmer et al. 2017). Das Etikett „Nazi“ trifft dieses Bedürfnis frontal und schließt Türen (Dusso und Perkins 2023).",
      "zugang": [
        "Frag nach dem, was die Person geleistet hat und leistet, und würdige es konkret, nicht pauschal.",
        "Gib ihr eine echte Rolle: eine Aufgabe im Verein, in der Nachbarschaft, in der Familie, die ohne sie nicht läuft.",
        "Spiegle, was du hörst, bevor du etwas erwiderst. Gehört zu werden ist hier schon ein Teil der Lösung.",
        "Sprich unter vier Augen. Vor Publikum geht es um Gesichtwahrung, nicht um Inhalte."
      ],
      "vermeiden": [
        "Etiketten wie Nazi, Schwurbler oder dumm, auch beiläufig oder im Scherz.",
        "Belehren und Besserwissen, selbst wenn du inhaltlich recht hast.",
        "Die Person in der Gruppe oder im Chat zur Rede stellen."
      ],
      "start": {
        "linie": "gespraech",
        "station": "zuhoeren"
      },
      "techniken": [
        "aktives-zuhoeren",
        "motivational-interviewing",
        "beduerfnisse-adressieren"
      ]
    },
    {
      "id": "zugehoerigkeit",
      "name": "Zugehörigkeit und Gemeinschaft",
      "beduerfnis": "Dazugehören, einen festen Platz in einer Gemeinschaft mit klaren Regeln und verlässlichen Menschen haben.",
      "beschreibung": "Für viele ist nicht das Programm der Halteanker, sondern das Wir: Stammtisch, Chatgruppe, Dorffest, Leute, die anrufen. Spissinger beschreibt die Partei als Gefühlsgemeinschaft, an der Einwände abprallen. Die Uncertainty-Identity-Theorie (Hogg) zeigt, dass Selbstunsicherheit in klar umrissene Gruppen treibt (Evidenz mittel). Ausstiegsforschung (Bjørgo, Jensen) nennt Beziehungen außerhalb der Szene als wichtigsten Schutz- und Ausstiegsfaktor. Deine Beziehung ist deshalb kein Nebenschauplatz, sondern der Kern.",
      "zugang": [
        "Halte den Kontakt, auch ohne das Thema: Einladungen, gemeinsame Routinen, Hilfe im Alltag.",
        "Biete Gemeinschaft, die sich echt anfühlt: regelmäßig, mit Ritualen und Aufgaben, nicht nur Gesprächsangebote.",
        "Mobilisiere andere Bezugspersonen, damit du nicht der einzige Außenkontakt bist.",
        "Mach deine eigene Haltung sichtbar, ohne sie zur Bedingung für die Beziehung zu machen."
      ],
      "vermeiden": [
        "Kontaktabbruch als Druckmittel. Er beschleunigt den Weg in die Gruppe.",
        "Die Freunde der Person pauschal abwerten. Das ist ein Angriff auf ihre Wahl.",
        "Die Beziehung auf das Thema reduzieren, sodass jedes Treffen zum Streit wird."
      ],
      "start": {
        "linie": "gespraech",
        "station": "beziehung"
      },
      "techniken": [
        "kontakt-begegnung",
        "beduerfnisse-adressieren",
        "soziale-normen",
        "aktives-zuhoeren"
      ]
    },
    {
      "id": "kontrolle-angst",
      "name": "Kontrolle, Sicherheit und Ordnung",
      "beduerfnis": "Das eigene Leben planen können, Regeln, die gelten, und das Gefühl, dass nicht alles über den Kopf hinweg entschieden wird.",
      "beschreibung": "Kontrollverlust am Arbeitsplatz, Befristung und das Gefühl, übergangen zu werden, erhöhen die Wahrscheinlichkeit, rechts zu wählen (Hilmer et al. 2017). Im Osten fühlen sich 30 Prozent bei betrieblichen Entscheidungen übergangen (Leipzig 2024). Ob Bedrohung autoritäre Dispositionen aktiviert (Stenner), ist umstritten; die Praxisfolge ist dennoch robust: Angstrhetorik, auch von demokratischer Seite, verstärkt den Wunsch nach harter Ordnung. Verlässlichkeit und erlebbare Mitsprache sind das Gegenmittel.",
      "zugang": [
        "Frag, wo die Person im Alltag Kontrolle verloren hat: Arbeit, Wohnen, Gesundheit, Ort.",
        "Biete kleine, konkrete Beteiligung mit spürbarer Wirkung, zum Beispiel Bürgerfragestunde oder Betriebsrat.",
        "Benenne, was verlässlich ist und bleibt, statt nur zu widersprechen.",
        "Nimm Sicherheitssorgen ernst und frag, was genau Sicherheit geben würde."
      ],
      "vermeiden": [
        "Bedrohungsrhetorik wie Demokratie in Gefahr oder Alles bricht zusammen.",
        "Sorgen als irrational abtun oder mit Statistiken wegwischen.",
        "Entscheidungen über die Person treffen, statt mit ihr."
      ],
      "start": {
        "linie": "gespraech",
        "station": "verstehen"
      },
      "techniken": [
        "aktives-zuhoeren",
        "beduerfnisse-adressieren",
        "fragen-statt-fakten",
        "buergerrat-deliberation"
      ]
    },
    {
      "id": "misstrauen",
      "name": "Misstrauen und Verschwörungsdenken",
      "beduerfnis": "Nicht getäuscht werden, ehrliche Antworten bekommen und die Welt verstehen können.",
      "beschreibung": "Verschwörungsglauben hängt mit erlebter Machtlosigkeit zusammen und ist bei Menschen stärker, die sich politisch ohne Einfluss fühlen (Imhoff et al. 2022, 26 Länder). Geringes politisches Vertrauen plus Souveränitätspopulismus sagt AfD-Wahlbereitschaft voraus (JSPP 2022). Faktenchecks allein ändern eine Mentalität nicht; nachträgliche Gegenargumente wirken schwach, Spott und Labels erhöhen den Glauben teils (O’Mahony et al. 2023). Was hilft: Vertrauen in dich als Person, Reflexion eigener Vorbehalte und glaubwürdige Botschafter:innen, etwa Aussteiger:innen.",
      "zugang": [
        "Baue erst Vertrauen in dich auf. Die Person soll erleben, dass du ehrlich bist, auch wenn du anders denkst.",
        "Frag nach dem Moment, an dem das Misstrauen begann, und würdige die Erfahrung dahinter.",
        "Würdige das kritische Denken der Person und lade ein, es auf beide Seiten anzuwenden.",
        "Lenke auf die Erzählung selbst: Wer profitiert, wie würde man merken, dass sie falsch ist?",
        "Leite nur Quellen weiter, die die Person selbst als glaubwürdig anerkennen kann."
      ],
      "vermeiden": [
        "Faktenduelle und Linkfluten. Jeder Link wird mit drei anderen beantwortet.",
        "Spott, das Wort Schwurbler oder Zweifel an der Intelligenz.",
        "Die Person unter Druck setzen, sich sofort zu distanzieren."
      ],
      "start": {
        "linie": "gespraech",
        "station": "beziehung"
      },
      "techniken": [
        "street-epistemology",
        "fragen-statt-fakten",
        "vertrauenswuerdige-botschafter",
        "prebunking",
        "soziale-normen"
      ]
    },
    {
      "id": "gerechtigkeit-abgehaengt",
      "name": "Gerechtigkeit und Abgehängtsein",
      "beduerfnis": "Fairness erleben: dass Arbeit und Beitrag zählen, dass niemand vergessen wird und Regeln für alle gelten.",
      "beschreibung": "Objektive Armut erklärt die Hinwendung wenig, subjektive Kränkung viel: Das Gefühl, dass Leistende auf der Strecke bleiben, während andere bekommen, verbindet sich mit der Sorge um Zuwanderung und verstärkt sie (Schröder et al. 2026, Hilmer et al. 2017). Regionale Faktoren wie geschlossene Schulen, fehlende Ärzte und abgebaute Verwaltungen spiegeln sich in Wahlergebnissen (FES, DIW). Mau beschreibt enttäuschte Angleichungsversprechen. Die Erfahrung ist oft real; die Erklärung, wer schuld sei, ist das, worüber du reden kannst.",
      "zugang": [
        "Nimm das Ungerechtigkeitsempfinden ernst, bevor du über Ursachen sprichst.",
        "Frag, was sich konkret verändert hat: Bus, Arzt, Schule, Vertrag. Das ist meist greifbarer als Politik.",
        "Erzähl Geschichten von Menschen, die ähnlich hart arbeiten und auch zu den anderen gezählt werden.",
        "Argumentiere in den Werten der Person: Leistung, Fairness, Fleiß, nicht in deinen.",
        "Zeig Wege, wie ihre Stimme vor Ort etwas bewirkt."
      ],
      "vermeiden": [
        "Erklären, dass es ihr doch gut gehe oder dass andere ärmer seien.",
        "Mit Statistiken gegen ein Gefühl argumentieren.",
        "Das Thema Migration tabuisieren. Sorgen äußern dürfen ohne Beschämung ist ein Kernbedürfnis."
      ],
      "start": {
        "linie": "gespraech",
        "station": "zuhoeren"
      },
      "techniken": [
        "aktives-zuhoeren",
        "moral-reframing",
        "perspektivwechsel-erzaehlung",
        "beduerfnisse-adressieren"
      ]
    },
    {
      "id": "identitaet-heimat",
      "name": "Identität und Heimat",
      "beduerfnis": "Ein klares Wir, Verwurzelung und das Gefühl, dass das Eigene bleiben darf.",
      "beschreibung": "Die Sorge um Zuwanderung ist der stärkste Einzelprädiktor für die AfD-Sympathie (Schröder et al. 2026, SOEP), gemessen wird dabei die subjektive Sorge, nicht die Zuwanderung vor Ort. Teney (2026) findet drei Wählerprofile, alle migrationsrestriktiv, aber nur ein Fünftel radikal-rechts autoritär. Stabile Grundhaltungen ändern sich kaum; aktiviert wird die Problemwahrnehmung durch Diskurse (Ziller 2025). Was Einstellungen über Monate verschiebt, ist nicht das Argument, sondern das Hören persönlicher Geschichten Betroffener (Kalla und Broockman 2020, 2021, Evidenz stark, Übertragung nach Deutschland mittel).",
      "zugang": [
        "Frag, was Heimat für die Person konkret bedeutet und was sie daran bedroht sieht.",
        "Erzähl Geschichten einzelner Menschen statt über Gruppen zu reden, und hör ihre Geschichten an.",
        "Ermögliche echten Kontakt auf Augenhöhe mit gemeinsamem Ziel: Verein, Nachbarschaftsprojekt, Fest.",
        "Erkenne an, was bleiben soll, und zeig, dass Heimat und Offenheit kein Gegensatz sein müssen."
      ],
      "vermeiden": [
        "Heimatgefühl und Stolz als solche verurteilen.",
        "Das Wir der Person durch ein vages Alle ersetzen wollen.",
        "Kontaktsituationen erzwingen oder inszenieren. Begegnung wirkt nur freiwillig und auf Augenhöhe."
      ],
      "start": {
        "linie": "gespraech",
        "station": "verstehen"
      },
      "techniken": [
        "perspektivwechsel-erzaehlung",
        "deep-canvassing",
        "kontakt-begegnung",
        "moral-reframing"
      ]
    },
    {
      "id": "protest-wut",
      "name": "Protest und Wut",
      "beduerfnis": "Gehört werden, Wirkung haben und Enttäuschung ausdrücken dürfen.",
      "beschreibung": "Die reine Protestthese ist widerlegt: 68 Prozent der AfD-Wählenden 2025 wählten wegen der Forderungen, 29 Prozent als Denkzettel (Forschungsgruppe Wahlen). Aber Enttäuschung bleibt Begleitmotiv: 71,7 Prozent meinen, Leute wie sie hätten keinen Einfluss, 63,7 Prozent halten Engagement für sinnlos (Leipzig 2024). Zwei Drittel erwarten, dass die Partei schwächer würde, wenn die Regierung spürbare Fortschritte macht (ARD-DeutschlandTrend 2025). Wut ist hier oft Ohnmacht mit lauter Stimme. Die Antwort ist Selbstwirksamkeit, nicht Beschwichtigung.",
      "zugang": [
        "Lass die Wut aussprechen und frag, was genau dahinter enttäuscht hat.",
        "Unterscheide gemeinsam: Was ist Protest gegen Zustände, was ist Zustimmung zu Inhalten?",
        "Biete einen Weg, selbst wirksam zu werden: Bürgerversammlung, Ortsbeirat, Petition, Verein.",
        "Geh mit, statt nur hinzuschicken. Begleitung senkt die Hürde."
      ],
      "vermeiden": [
        "Beschwichtigen mit Es ist doch nicht so schlimm.",
        "Die Wahl als Dummheit oder Verrat bezeichnen.",
        "Versprechen machen, die du nicht halten kannst. Das bestätigt die Enttäuschung."
      ],
      "start": {
        "linie": "gespraech",
        "station": "zuhoeren"
      },
      "techniken": [
        "aktives-zuhoeren",
        "motivational-interviewing",
        "buergerrat-deliberation",
        "beduerfnisse-adressieren"
      ]
    }
  ],
  "stufen": [
    {
      "id": "sympathie",
      "name": "Sympathie",
      "beschreibung": "Die Person findet einzelne Positionen richtig, sagt das gelegentlich und bewegt sich im ambivalenten Graubereich, in dem laut Mitte-Studie rund ein Fünftel der Bevölkerung liegt.",
      "hinweis": "Hier ist die Chance am größten. Dramatisiere nicht, rede normal weiter und finde heraus, welches Bedürfnis hinter der Sympathie steht. Schweigen wird als Zustimmung gelesen, Etiketten als Angriff."
    },
    {
      "id": "wahl",
      "name": "Wählt die Partei",
      "beschreibung": "Die Person wählt die Partei oder hat sie gewählt, teils aus Überzeugung, teils als Denkzettel. Beides ist legal und sagt noch nichts über ein geschlossenes Weltbild.",
      "hinweis": "Frag nach dem Warum, nicht nach dem Wie-konnte-man-nur. Trenne gemeinsam, was Protest gegen Zustände und was Zustimmung zu Inhalten ist. Deine Position darfst du klar sagen, ohne die Wahl zur Identität zu machen."
    },
    {
      "id": "mitglied",
      "name": "Mitglied oder regelmäßig dabei",
      "beschreibung": "Die Person ist Mitglied, besucht Veranstaltungen oder ist in Chatgruppen aktiv. Das Netzwerk wird Teil des Alltags und validiert die Erzählung.",
      "hinweis": "Jetzt zählt vor allem, dass du als Außenkontakt bleibst. Reduziere die Beziehung nicht auf das Thema, halte gemeinsame Routinen und hol dir Angehörigenberatung, bevor du erschöpft bist."
    },
    {
      "id": "aktiv",
      "name": "Aktiv und engagiert",
      "beschreibung": "Die Person verteilt Material, organisiert mit, tritt auf. Der Freundeskreis besteht zunehmend aus der Szene, Kritik wird als Angriff auf die Gruppe erlebt.",
      "hinweis": "Allein kommst du hier nur begrenzt weiter. Beziehe Fachberatung ein, benenne rote Linien und halte sie ein, und bleib als Brücke erreichbar. Ziel ist nicht, zu überzeugen, sondern Türen offen zu halten."
    },
    {
      "id": "kader",
      "name": "Führungsrolle oder fester Szenekern",
      "beschreibung": "Die Person hat Funktionen, die Ideologie ist Lebensinhalt, Ausstieg gilt in ihrem Umfeld als Verrat.",
      "hinweis": "Private Gespräche ändern hier selten etwas. Wechsle in die Linie Professionelle Begleitung und Ausstieg, sprich mit einer Ausstiegsberatung über deine Rolle und achte auf deinen eigenen Schutz. Beziehung halten bleibt sinnvoll, Erwartungen müssen realistisch sein."
    }
  ],
  "beziehung": [
    {
      "id": "eng",
      "name": "Enge Beziehung",
      "hinweis": "Du bist vermutlich der wichtigste Außenkontakt der Person, und das ist ein Schutzfaktor. Reduziere die Beziehung nicht auf das Thema, sprich unter vier Augen, benenne Pausen als Pausen statt Kontakt abzubrechen, und sorge für dich selbst. Selbstschutz geht vor."
    },
    {
      "id": "mittel",
      "name": "Mittlere Nähe",
      "hinweis": "Regelmäßiger Kontakt ohne Beziehungspflicht: Das erlaubt kurze, wiederkehrende Gespräche. Gemeinsame Aufgaben im Verein, im Betrieb oder in der Nachbarschaft sind die beste Brücke. Zeig deine Position, missioniere nicht, und such dir Verbündete."
    },
    {
      "id": "lose",
      "name": "Lose Bekanntschaft",
      "hinweis": "Ein Gespräch, kein Prozess. Realistisches Ziel ist Entfeindung und ein Samen des Zweifels, nicht Überzeugung. Hör zu, frag nach, zeig Haltung ohne Etikett und beende freundlich. Für viele solcher Begegnungen sind die Linien Nachbarschaft und Öffentlichkeit gedacht."
    }
  ],
  "risiko": [
    {
      "id": "gewalt",
      "text": "Die Person droht mit Gewalt gegen Menschen oder Einrichtungen oder nennt Opfer, Orte oder Mittel.",
      "aktion": "Nimm das ernst, auch wenn es wie Großsprech klingt. Konkrete Angaben zu Opfern, Tatmitteln, Orten oder Vorbereitungen sind nach der LATERAN-Studie Ernsthaftigkeitsmerkmale: dann sofort Polizei 110. Bei glaubhaftem Wissen über geplante schwere Straftaten besteht nach Paragraf 138 StGB eine Anzeigepflicht. Beurteile Gefährdung nie allein: Die Mobile Beratung gegen Rechtsextremismus in deinem Bundesland (bundesverband-mobile-beratung.de) und die Fachstelle Rechtsextremismus und Familie (LidiceHaus Bremen, rechtsextremismus-und-familie.de) helfen bei der Einschätzung. Dein eigener Schutz geht vor."
    },
    {
      "id": "waffen",
      "text": "Die Person besitzt oder beschafft Waffen, übt Schießen oder spricht über Bewaffnung.",
      "aktion": "Keine eigenen Nachforschungen und keine Konfrontation über die Waffen. Bei Hinweisen auf illegale Waffen, Gewaltpläne oder Reichsbürger-Bezug: Polizei 110 oder die örtliche Polizeidienststelle. Lass dich parallel beraten, zum Beispiel bei der Mobilen Beratung deines Bundeslandes, der Fachstelle Rechtsextremismus und Familie oder dem Aussteigerprogramm EXIT-Deutschland (exit-deutschland.de). Sprich nicht allein mit der Person über dieses Thema."
    },
    {
      "id": "rueckzug",
      "text": "Die Person zieht sich aus allen anderen Beziehungen zurück, die Gruppe wird zum Lebensmittelpunkt.",
      "aktion": "Beziehungen außerhalb der Szene sind der stärkste Schutz- und Ausstiegsfaktor. Halte den Kontakt, auch ohne das Thema: Einladungen, gemeinsame Routinen, Hilfe im Alltag. Mobilisiere weitere Bezugspersonen, damit du nicht allein bist. Hol dir Angehörigenberatung: Fachstelle Rechtsextremismus und Familie (bundesweit), Beratungskompass Verschwörungsdenken (bundesweit, anonym) oder Landesangebote wie RuF Brandenburg, F.U.E.R. Bayern, KER Sachsen-Anhalt, Kurswechsel Hamburg. Bei Ausstiegswunsch der Person: EXIT-Deutschland oder das Ausstiegsprogramm deines Bundeslandes."
    },
    {
      "id": "minderjaehrig",
      "text": "Die Person ist minderjährig.",
      "aktion": "Brich den Kontakt nicht ab und nimm deine erzieherische Verantwortung wahr: Interesse zeigen, Grenzen begründen, nur verbieten, was du durchsetzen kannst. Keine heimliche Überwachung, keine Profile, keine Listen. Beziehe Schule, Jugendarbeit und Fachberatung ein: Fachstelle Rechtsextremismus und Familie, Mobile Beratung oder Landesangebote wie JUMP MV und Kurswechsel Hamburg. Bei Anzeichen für eine Gefährdung des Kindeswohls greift Paragraf 8a SGB VIII: Jugendamt oder eine insoweit erfahrene Fachkraft einschalten."
    }
  ],
  "bereiche": [
    {
      "id": "themen",
      "name": "Themen und Sprache",
      "beschreibung": "Worüber die Person spricht und welche Wörter sie dafür wählt."
    },
    {
      "id": "weltbild",
      "name": "Weltbild und Demokratie",
      "beschreibung": "Wie die Person über Wahlen, Institutionen, Kompromisse und Gewalt denkt."
    },
    {
      "id": "beduerfnisse",
      "name": "Bedürfnisse",
      "beschreibung": "Was der Person fehlt und was die Partei ihr gibt."
    },
    {
      "id": "gefuehle",
      "name": "Gefühle",
      "beschreibung": "Wut, Angst, Scham, Stolz: woran du diese Gefühle bei der Person erkennst und was sie auslöst."
    },
    {
      "id": "quellen",
      "name": "Informationsquellen",
      "beschreibung": "Woher die Sicht der Person kommt und wie sie mit Quellen umgeht."
    },
    {
      "id": "widerspruch",
      "name": "Umgang mit Widerspruch",
      "beschreibung": "Wie die Person auf Belege, Nachfragen und Zustimmung reagiert."
    },
    {
      "id": "verschwoerung",
      "name": "Verschwörungsdenken",
      "beschreibung": "Ob die Person geheime Steuerung hinter den Dingen vermutet."
    },
    {
      "id": "netzwerk",
      "name": "Umfeld und Netzwerk",
      "beschreibung": "Mit wem die Person ihre Zeit verbringt und wer sie noch erreicht."
    },
    {
      "id": "biografie",
      "name": "Biografie und Lebenslage",
      "beschreibung": "Arbeit, Geld, Verluste und Umbrüche im Leben der Person."
    },
    {
      "id": "heimat",
      "name": "Identität und Heimat",
      "beschreibung": "Bindung der Person an Ort, Region und Tradition."
    },
    {
      "id": "beziehung-zu-dir",
      "name": "Eure Beziehung",
      "beschreibung": "Vertrauen, gemeinsame Geschichte und was euch verbindet."
    },
    {
      "id": "gespraeche",
      "name": "Eure Gespräche",
      "beschreibung": "Wie eure Gespräche laufen und was du schon probiert hast."
    },
    {
      "id": "aktivitaet",
      "name": "Einbindung und Aktivität",
      "beschreibung": "Was die Person konkret tut: Veranstaltungen, Symbole, Werben, Funktionen."
    },
    {
      "id": "du-selbst",
      "name": "Du selbst",
      "beschreibung": "Deine Ziele, Auslöser, Grenzen und dein Rückhalt."
    },
    {
      "id": "ausgangslage",
      "name": "Ausgangslage",
      "beschreibung": "Einbindungsstufe, Nähe, Warnzeichen und deine Kraft."
    }
  ],
  "skalen": [
    {
      "id": "offenheit",
      "name": "Gesprächsoffenheit",
      "beschreibung": "Wie viel Widerspruch und Nachfragen die Person gerade aushält.",
      "baender": [
        {
          "bis": 33,
          "name": "Verschlossen",
          "text": "Die Person wehrt Widerspruch ab. Beginne ausschließlich mit Zuhören und Beziehung. Fragen und Zweifel kommen erst, wenn die Person von sich aus mehr erzählt."
        },
        {
          "bis": 66,
          "name": "Teilweise offen",
          "text": "Die Person hört zu, bleibt aber bei sich. Stelle Fragen nach eigenen Erlebnissen und lass einen Zweifel stehen, ohne nachzusetzen."
        },
        {
          "bis": 100,
          "name": "Offen",
          "text": "Die Person fragt nach und hält Unsicherheit aus. Du kannst früh zu Fragen, gemeinsamer Quellenprüfung und Alternativen übergehen."
        }
      ]
    },
    {
      "id": "kapital",
      "name": "Beziehungskapital",
      "beschreibung": "Wie viel Vertrauen zwischen euch trägt.",
      "baender": [
        {
          "bis": 33,
          "name": "Wenig Vertrauen",
          "text": "Gespräche über Inhalte tragen noch nicht. Investiere zuerst in gemeinsame Zeit ohne Politik."
        },
        {
          "bis": 66,
          "name": "Solide Basis",
          "text": "Es gibt Reibung, aber auch Verbindung. Benenne, was euch verbindet, bevor ihr über Politik sprecht."
        },
        {
          "bis": 100,
          "name": "Viel Vertrauen",
          "text": "Du kannst direkter sein und auch Grenzen setzen, ohne die Beziehung zu gefährden."
        }
      ]
    },
    {
      "id": "verschwoerung",
      "name": "Verschwörungsnähe",
      "beschreibung": "Wie geschlossen das Weltbild der Person ist.",
      "baender": [
        {
          "bis": 33,
          "name": "Gering",
          "text": "Kaum Verschwörungsdenken. Sachliche Gespräche über konkrete Probleme sind möglich."
        },
        {
          "bis": 66,
          "name": "Einzelne Erzählungen",
          "text": "Widerlege nicht einzelne Behauptungen. Sprich über das Bedürfnis nach Durchblick und Kontrolle, das diese Erzählungen befriedigen."
        },
        {
          "bis": 100,
          "name": "Geschlossenes Weltbild",
          "text": "Vermeide Faktenduelle vollständig. Beziehung halten, Fragen stellen, professionelle Beratung prüfen."
        }
      ]
    },
    {
      "id": "belastung",
      "name": "Deine Belastung",
      "beschreibung": "Wie viel das Ganze dich gerade kostet.",
      "baender": [
        {
          "bis": 33,
          "name": "Du hast Kraft",
          "text": "Plane in Monaten. Nimm dir Pausen trotzdem fest vor, damit es so bleibt."
        },
        {
          "bis": 66,
          "name": "Spürbar belastet",
          "text": "Hol dir jemanden, mit dem du nach Gesprächen reden kannst, und setze dir klare Zeiten."
        },
        {
          "bis": 100,
          "name": "Hoch belastet",
          "text": "Selbstschutz zuerst: Leitplanken lesen, Angehörigenberatung kontaktieren. Abstand ist erlaubt."
        }
      ]
    }
  ]
};
