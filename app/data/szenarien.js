// Gesprächstrainer: realistische Szenarien mit Rückmeldung je Option.
// Evidenzbasis: recherche/individuum.md, recherche/psychologie.md, recherche/ethik_recht.md
window.APP_DATA = window.APP_DATA || {};
window.APP_DATA.szenarien = [
  {
    id: "familienessen",
    titel: "Beim Familienessen",
    ebene: "individuum",
    kontext: "Sonntagsessen bei deinen Eltern. Dein Vater kommt auf die geplante Flüchtlingsunterkunft in der alten Schule zu sprechen. Deine Mutter schaut auf den Teller. Du hast dir vorgenommen, nicht wieder zu streiten.",
    person: "Dein Vater, 63, früher Schichtleiter, seit zwei Jahren in Rente. Er fühlt sich wenig gefragt und schaut seit einem Jahr täglich denselben YouTube-Kanal.",
    start: "k1",
    knoten: {
      k1: {
        aussage: "Habt ihr das mitgekriegt? Die bauen jetzt die alte Schule für Flüchtlinge um. Für uns gab es dreißig Jahre lang nichts, nicht mal einen vernünftigen Bus. Aber dafür ist plötzlich Geld da.",
        optionen: [
          { text: "Das Geld kommt vom Land, das hat mit dem Bus nichts zu tun. Das ist ein ganz anderer Topf.", bewertung: "schlecht", feedback: "Der Fakt mag stimmen, aber ihm ging es um Ungerechtigkeit, nicht um Haushaltsrecht. Fakten allein bewegen Überzeugungen kaum, vor allem bei Menschen mit einer festen Vormeinung (Walter et al. 2020). Er hört nur, dass du ihn nicht ernst nimmst. Erst verstehen, dann gegebenenfalls korrigieren.", technik: "fragen-statt-fakten", weiter: "k2" },
          { text: "Das ärgert dich, oder? Dreißig Jahre nichts, und jetzt auf einmal doch. Erzähl mal, was dir hier am meisten fehlt.", bewertung: "gut", feedback: "Du spiegelst das Gefühl, ohne zuzustimmen, und öffnest das Gespräch mit einer Frage. Zuhören ohne Bewertung senkt die Abwehr und macht Einstellungen weniger extrem (Itzchakov et al. 2017). Jetzt redet er über sich statt über die Unterkunft.", technik: "aktives-zuhoeren", weiter: "k2" },
          { text: "Papa, lass uns heute mal nicht über Politik reden. Mama hat gekocht.", bewertung: "ok", feedback: "Die Beziehung zu schützen ist legitim, und du musst nicht jedes Gespräch führen. Aber Schweigen wird oft als Zustimmung gelesen (Fachstelle Rechtsextremismus und Familie). Besser ist, das Thema zu vertagen und später unter vier Augen aufzugreifen.", technik: "selbstfuersorge", weiter: "k2" }
        ]
      },
      k2: {
        aussage: "Was mir fehlt? Dass mal jemand fragt. Vierzig Jahre Schicht, und jetzt bin ich nur noch der alte Mann, der sich aufregt. Die im Rathaus kennen mich nicht mal mit Namen.",
        optionen: [
          { text: "Vierzig Jahre Schicht, das weiß ich. Und dass dich keiner fragt, das ist das Eigentliche, oder? Nicht die Schule.", bewertung: "gut", feedback: "Du benennst das Bedürfnis, das hinter der Parole steckt – Anerkennung. Nach dem 3N-Modell ist die Suche nach Bedeutsamkeit einer der stärksten Antriebe für die Hinwendung. Wer sich gesehen fühlt, braucht die Parole weniger.", technik: "beduerfnisse-adressieren", weiter: "k3" },
          { text: "Du regst dich ja auch wirklich ständig auf. Kein Wunder, dass keiner mehr fragt.", bewertung: "schlecht", feedback: "Das ist Beschämung, und sie trifft genau die Stelle, die er gerade offengelegt hat. Beschämen erzeugt Abwehr und Reaktanz. Beim nächsten Mal wird er nicht mehr sagen, was ihm fehlt.", technik: "aktives-zuhoeren", weiter: "k3" },
          { text: "Meine Kollegin aus Syrien hat auch vierzig Jahre Arbeit vor sich. Die würde dich gern mal fragen, wie das früher war.", bewertung: "ok", feedback: "Die Geschichte einer konkreten Person ist die richtige Idee; Perspective-Getting wirkt (Kalla und Broockman 2021). Aber der Zeitpunkt ist zu früh. Erst muss sein Bedürfnis gewürdigt sein, sonst klingt es wie ein Gegenargument.", technik: "perspektivwechsel-erzaehlung", weiter: "k3" }
        ]
      },
      k3: {
        aussage: "Ja, vielleicht. Aber die Partei, die nimmt das wenigstens ernst. Die waren beim Dorffest und haben zugehört. Die anderen habe ich hier seit Jahren nicht gesehen.",
        optionen: [
          { text: "Ich sehe das anders, das weißt du. Ich finde, die nutzen genau das aus. Aber ich verstehe, dass dir das Zuhören fehlt.", bewertung: "ok", feedback: "Deine Position sichtbar zu machen ist richtig; nahestehende Menschen, die ihre Haltung zeigen, wirken als soziale Norm (Winter et al. 2022). Aber die Behauptung „die nutzen das aus“ kommt vor der Frage. Frag erst, was ihm das Zuhören gegeben hat.", technik: "soziale-normen", weiter: "k4" },
          { text: "Papa, das sind Rechtsextreme. Dass du darauf reinfällst, hätte ich nicht gedacht.", bewertung: "schlecht", feedback: "Das Etikett trifft ihn als Person, und wer beschimpft, schadet sich selbst (Dusso und Perkins 2023). Du darfst deine Position klar benennen, aber ohne Etikett und ohne den Vorwurf, er habe dich enttäuscht. So schließt du die Tür, die gerade aufgegangen ist.", technik: "grenzen-setzen", weiter: "k4" },
          { text: "Ich verstehe, dass es guttut, wenn jemand zuhört. Was müsste passieren, damit du das auch von anderen wieder erlebst?", bewertung: "gut", feedback: "Du würdigst die Erfahrung und fragst nach seinem Wunsch, ohne den Weg vorzugeben. Das ist motivierende Gesprächsführung. Die Veränderung formuliert er selbst; du hältst den Righting Reflex zurück, also den Drang, ihn zu korrigieren.", technik: "motivational-interviewing", weiter: "k4" }
        ]
      },
      k4: {
        aussage: "Weiß ich nicht. Vielleicht, wenn mal jemand vom Gemeinderat hier am Tisch sitzen würde statt in Berlin. Du bist doch im Elternbeirat, du kennst doch Leute.",
        optionen: [
          { text: "Ich kann denen ja mal erzählen, was du so sagst. Dann wissen die, wo bei dir das Problem liegt.", bewertung: "schlecht", feedback: "Du redest über ihn statt mit ihm und machst ihn zum Fall. Entscheidungen über seinen Kopf hinweg sind genau das, was ihn ärgert. Selbstwirksamkeit entsteht nur, wenn er selbst handelt.", technik: "motivational-interviewing", weiter: "k5" },
          { text: "Ja, kenne ich. Was hältst du davon, wenn wir zur nächsten Bürgerfragestunde gehen, du und ich? Dann sagst du es denen selbst.", bewertung: "gut", feedback: "Ein kleiner, konkreter Schritt hin zu Beteiligung mit spürbarer Wirkung, und du gehst mit. Das ist eine Antwort auf das Gefühl, keinen Einfluss zu haben, das laut Leipziger Studie 2024 über 70 Prozent teilen.", technik: "beduerfnisse-adressieren", weiter: "k5" },
          { text: "Komm doch mal mit zum Schulfest, da ist der Bürgermeister. Und die Familien aus der neuen Unterkunft.", bewertung: "ok", feedback: "Begegnung in einem gemeinsamen Rahmen kann Vorurteile abbauen, aber nur freiwillig und auf Augenhöhe. Du packst zwei Ziele in eine Einladung; er hört vor allem das zweite. Ein Schritt nach dem anderen.", technik: "kontakt-begegnung", weiter: "k5" }
        ]
      },
      k5: {
        aussage: "Hm. Bürgerfragestunde. Da war ich noch nie. Na gut, wenn du mitkommst.",
        optionen: [],
        abschluss: "Du hast nicht über die Schule gestritten und trotzdem etwas erreicht. Dein Vater hat gesagt, was ihm fehlt, und einem Schritt hin zu mehr Selbstwirksamkeit zugestimmt. Deine Position hast du gezeigt, ohne ihn zu etikettieren. Mehr ist in einem Gespräch nicht drin; der Rest ist Dranbleiben."
      }
    }
  },

  {
    id: "kollege-pause",
    titel: "Pausenraum in der Firma",
    ebene: "individuum",
    kontext: "Seit der Umstrukturierung sind drei Kollegen befristet beschäftigt, auch Marco. Ihr versteht euch gut, aber bei Politik wird es seit Monaten schwierig. Heute seid ihr allein im Pausenraum.",
    person: "Marco, 38, Facharbeiter, befristeter Vertrag, zwei Kinder. Er redet oft von „denen da oben“ und war letzte Woche auf einer Parteiveranstaltung.",
    start: "k1",
    knoten: {
      k1: {
        aussage: "Die Geschäftsführung kriegt Boni, wir kriegen Befristungen. Und die Politik kümmert sich um alles, nur nicht um Leute wie uns. Da hilft nur noch eine Partei, die denen Angst macht.",
        optionen: [
          { text: "Die Partei will doch die Gewerkschaften schwächen und die Erbschaftssteuer abschaffen. Schlimmer geht es für Arbeiter kaum.", bewertung: "schlecht", feedback: "Das Argument mag stimmen, aber Gespräche, die nur aus Argumenten bestehen, hatten in drei Feldexperimenten keinen Effekt (Kalla und Broockman 2020). Marco fühlt sich nicht ernst genommen und verteidigt jetzt die Partei, statt über seine Lage zu reden.", technik: "deep-canvassing", weiter: "k2" },
          { text: "Angst machen, okay. Und wer genau soll dann die Befristungen abschaffen? Was steht dazu im Programm?", bewertung: "ok", feedback: "Eine gute Frage, die später Zweifel auslösen kann. Aber sie kommt zu früh und noch im Ton einer Debatte. Erst zuhören, damit er merkt, dass es dir um ihn geht und nicht ums Rechthaben.", technik: "fragen-statt-fakten", weiter: "k2" },
          { text: "Befristet mit zwei Kindern, das macht was mit einem. Wie läuft das bei euch gerade mit der Planung, Wohnung und so?", bewertung: "gut", feedback: "Du gehst auf seine Lebenslage ein, nicht auf die Partei. Kontrollverlust am Arbeitsplatz und Befristung erhöhen die Neigung, rechts zu wählen (Hilmer et al. 2017). Das ist das Thema, nicht die Parole.", technik: "aktives-zuhoeren", weiter: "k2" }
        ]
      },
      k2: {
        aussage: "Wie soll das laufen? Keine Bank gibt dir mit Befristung einen Kredit. Meine Frau macht Nachtschicht im Heim, wir sehen uns kaum. Und dann lese ich, dass wir für alle anderen alles bezahlen.",
        optionen: [
          { text: "Also eigentlich geht es darum, dass ihr euch den Hintern aufreißt und trotzdem nicht planen könnt. Das ist der Kern, oder? Alles andere kommt obendrauf.", bewertung: "gut", feedback: "Du trennst das Bedürfnis (Planbarkeit, Fairness) von der Erklärung („die anderen“). Das Ungerechtigkeitsempfinden ernst zu nehmen, ist laut einem Review von 74 Präventionsprogrammen ein Erfolgsfaktor.", technik: "beduerfnisse-adressieren", weiter: "k3" },
          { text: "Mein Schwager hatte auch zwei Befristungen hintereinander, der ist fast durchgedreht. Irgendwann ist er in den Betriebsrat gegangen.", bewertung: "ok", feedback: "Eine eigene Geschichte schafft Nähe und zeigt einen Weg. Aber du servierst die Lösung, bevor Marco fertig erzählt hat. Erst sein Erleben würdigen, dann die Geschichte anbieten.", technik: "perspektivwechsel-erzaehlung", weiter: "k3" },
          { text: "Was heißt „alle anderen“? Du meinst Ausländer, oder? Sag es doch gleich.", bewertung: "schlecht", feedback: "Die Frage, wer genau gemeint ist, ist richtig – als Vorwurf formuliert aber eine Falle. Er muss sich jetzt verteidigen. Neutral gestellt („Wen meinst du genau?“) öffnet dieselbe Frage das Gespräch, ohne zu beschämen.", technik: "fragen-statt-fakten", weiter: "k3" }
        ]
      },
      k3: {
        aussage: "Ja, genau das. Und die Gewerkschaft? Hat beim letzten Mal auch nichts verhindert. Auf der Veranstaltung hat wenigstens mal einer gesagt, dass es so nicht weitergeht. Da war ich nicht der Einzige.",
        optionen: [
          { text: "Du warst bei denen? Marco, ernsthaft? Das hätte ich von dir nicht erwartet.", bewertung: "schlecht", feedback: "Der Vorwurf, er habe dich enttäuscht, ist Beschämung mit Beziehungsdruck. Beim nächsten Mal erzählt er dir nichts mehr, und du verlierst die Brücke, die du als Kollege bist.", technik: "aktives-zuhoeren", weiter: "k4" },
          { text: "Du warst nicht der Einzige, das tut gut, verstehe ich. Was hat der Redner konkret dazu gesagt, wie er Befristungen ändern will? Hat das für dich gepasst?", bewertung: "gut", feedback: "Du würdigst das Zugehörigkeitsgefühl und lenkst dann auf sein eigenes Anliegen zurück. Die Lücke zwischen seinem Bedürfnis und dem Angebot der Partei soll er selbst entdecken; in der motivierenden Gesprächsführung heißt das Change Talk.", technik: "motivational-interviewing", weiter: "k4" },
          { text: "Ich bin in der Gewerkschaft, und ja, das ist zäh. Aber ich glaube nicht, dass es ohne geht.", bewertung: "ok", feedback: "Deine Haltung sichtbar zu machen ist wichtig; die Normen nahestehender Menschen wirken. Aber du antwortest mit einer Gegenposition statt mit einer Nachfrage. Beides geht zusammen: erst Haltung zeigen, dann fragen, was ihm die Veranstaltung gebracht hat.", technik: "soziale-normen", weiter: "k4" }
        ]
      },
      k4: {
        aussage: "Ehrlich? Zu Befristungen hat er nichts gesagt. Ging mehr um Grenzen und Sicherheit. Aber die Stimmung war halt: wir gegen die, die uns vergessen haben.",
        optionen: [
          { text: "Beim nächsten Betriebsratstreffen geht es genau um die Befristungen. Komm mit, dann sagst du das denen direkt ins Gesicht.", bewertung: "ok", feedback: "Beteiligung mit spürbaren Folgen ist genau die richtige Antwort auf das Gefühl, vergessen zu sein. Aber lass ihn erst selbst den Schluss ziehen, dass die Veranstaltung sein Problem nicht löst. Dann trägt die Einladung.", technik: "buergerrat-deliberation", weiter: "k5" },
          { text: "Das ist ehrlich von dir. Wenn es dir um Befristungen geht und dazu nichts kam – wo müsstest du dann hin, damit sich daran etwas ändert?", bewertung: "gut", feedback: "Du würdigst seine Ehrlichkeit und stellst die Frage, die er sich jetzt selbst stellen kann. Die Antwort kommt von ihm. Das hält länger als jedes Argument von dir.", technik: "fragen-statt-fakten", weiter: "k5" },
          { text: "Siehst du, die haben dir nichts zu bieten. Das sagen alle Experten. Du hast dich von der Stimmung blenden lassen.", bewertung: "schlecht", feedback: "Triumph statt Resonanz. Er hat gerade einen Zweifel laut ausgesprochen, und du bestrafst ihn dafür mit Rechthaberei. Zweifel brauchen Raum, keinen Sieger.", technik: "debunking-sandwich", weiter: "k5" }
        ]
      },
      k5: {
        aussage: "Keine Ahnung. Vielleicht sollte ich beim Betriebsrat mal nachfragen, was die zu den Befristungen machen. Schreib mir, wann das nächste Treffen ist.",
        optionen: [],
        abschluss: "Marco hat selbst festgestellt, dass die Veranstaltung ihm für sein eigentliches Problem nichts gebracht hat. Das wiegt mehr als jedes Gegenargument von dir. Beteiligung mit spürbarer Wirkung ist die beste Antwort auf das Gefühl, vergessen zu sein. Halte den Kontakt und tu, was du angeboten hast."
      }
    }
  },

  {
    id: "freundin-telefon",
    titel: "Telefonat mit der alten Freundin",
    ebene: "individuum",
    kontext: "Deine Schulfreundin Sandra schickt dir seit Monaten Videos und Telegram-Links. Heute hat sie ein Telefonat vorgeschlagen. Du willst die Freundschaft nicht verlieren und auch nicht so tun, als würdest du zustimmen.",
    person: "Sandra, 41, Physiotherapeutin. Seit der Pandemie misstraut sie Behörden und Medien. Sie liest viel, ist klug und fühlt sich von den meisten Freundinnen belächelt.",
    start: "k1",
    knoten: {
      k1: {
        aussage: "Ich weiß, du findest das alles Quatsch. Aber hast du das Video überhaupt angeschaut? Da sind Dokumente drin, die zeigen, dass die Medien gesteuert werden. Ich will nur, dass du dir selbst ein Bild machst.",
        optionen: [
          { text: "Ich habe es angeschaut. Mich überzeugt es nicht, aber ich merke, dass es dir wichtig ist. Warum gerade dieses Video?", bewertung: "ok", feedback: "Ehrlich und respektvoll, und du fragst nach. Nur dein Urteil kommt etwas früh. Das Handbuch über Verschwörungsmythen empfiehlt, zuerst die Beweggründe zu verstehen und erst dann Inhalte zu bewerten.", technik: "aktives-zuhoeren", weiter: "k2" },
          { text: "Sandra, das ist ein bekannter Verschwörungskanal. Das wurde alles schon widerlegt, ich schicke dir den Faktencheck.", bewertung: "schlecht", feedback: "Linkflut gegen Linkflut. Etikettieren verstärkt bei Überzeugten den Glauben teils sogar, und nachgeschobene Gegenargumente wirken schwach (O’Mahony et al. 2023). Der Faktencheck kann später kommen; zuerst zählt, warum ihr das Video wichtig ist.", technik: "debunking-sandwich", weiter: "k2" },
          { text: "Ich habe reingeschaut, ja. Bevor wir über das Video reden: Wann hast du angefangen, den Nachrichten nicht mehr zu trauen? Das würde ich gern verstehen.", bewertung: "gut", feedback: "Du gehst vom Inhalt zu der Frage, wie die Überzeugung entstanden ist. Über die eigenen Vorbehalte nachzudenken, war bei Meyer et al. (2024) die wirksamste Einzeltechnik gegen Verschwörungsglauben. Und Sandra erlebt Interesse statt Belehrung.", technik: "street-epistemology", weiter: "k2" }
        ]
      },
      k2: {
        aussage: "Als ich in der Praxis Patienten hatte, denen es nach der Impfung schlecht ging, und im Fernsehen hieß es, das gebe es nicht. Da habe ich gedacht: Was verschweigen die noch?",
        optionen: [
          { text: "Über Nebenwirkungen wurde doch ständig berichtet. Du hast dir das eingeredet, weil du es sehen wolltest.", bewertung: "schlecht", feedback: "Du wertest ihre Wahrnehmung ab. Bei dir erlebt sie genau das, was sie den Medien vorwirft: Sie wird nicht ernst genommen. Das bestätigt ihre Erzählung, statt sie zu lockern.", technik: "aktives-zuhoeren", weiter: "k3" },
          { text: "Das kann ich nachvollziehen. Du hast etwas mit eigenen Augen gesehen, und öffentlich wurde es weggewischt. Das ist ein Vertrauensbruch, unabhängig davon, was medizinisch stimmt.", bewertung: "gut", feedback: "Du würdigst die Erfahrung, ohne die Schlussfolgerung zu übernehmen. Verschwörungsglaube hängt mit erlebter Machtlosigkeit zusammen (Imhoff et al. 2022); das Gefühl, übergangen zu werden, ist der Kern, nicht die Impfung.", technik: "aktives-zuhoeren", weiter: "k3" },
          { text: "Woher weißt du, dass es an der Impfung lag? Hast du das mal mit einer Ärztin besprochen?", bewertung: "ok", feedback: "Eine legitime Frage, aber Sandra hört Zweifel an ihrer Kompetenz heraus. Würdige erst die Beobachtung, dann kannst du fragen, wie sie zwischen Zusammenhang und Zufall unterscheidet.", technik: "fragen-statt-fakten", weiter: "k3" }
        ]
      },
      k3: {
        aussage: "Danke. Das sagt sonst niemand. Alle tun so, als wäre ich verrückt. In der Telegram-Gruppe ist das anders, da verstehen die Leute, was ich meine. Und die haben die Belege.",
        optionen: [
          { text: "Darf ich dich etwas fragen? Wie würdest du merken, wenn in der Gruppe mal etwas nicht stimmt? Gab es dort schon mal etwas, das dich hat zweifeln lassen?", bewertung: "gut", feedback: "Du würdigst ihr kritisches Denken und lädst sie ein, es auf beide Seiten anzuwenden. Das Handbuch über Verschwörungsmythen empfiehlt genau das: den Blick auf die Erzählung selbst lenken, statt gewinnen zu wollen.", technik: "street-epistemology", weiter: "k4" },
          { text: "Es gibt Leute, die lange in solchen Gruppen waren und erzählen, wie das von innen aussah. Soll ich dir mal etwas von denen schicken?", bewertung: "ok", feedback: "Aussteigerinnen und Aussteiger sind glaubwürdige Botschafter für Menschen, die den Medien misstrauen. Richtig, dass du fragst, statt einfach zu schicken. Noch besser passt das einen Schritt später, wenn sie selbst Zweifel formuliert hat.", technik: "vertrauenswuerdige-botschafter", weiter: "k4" },
          { text: "Die Gruppe ist das Problem. Die füttern dich mit Müll. Du musst da raus, sonst verlierst du noch mehr Freunde.", bewertung: "schlecht", feedback: "Druck und die Drohung mit Isolation. Die Gruppe ist für sie gerade der Ort, an dem sie nicht verrückt ist; wer ihn angreift, treibt sie tiefer hinein (3N-Modell). Die Beziehung zu halten ist Prävention, nicht Nachgiebigkeit.", technik: "soziale-normen", weiter: "k4" }
        ]
      },
      k4: {
        aussage: "Zweifeln? Na ja. Letztens hat einer gepostet, ein Sturm werde die Regierung wegfegen, und dann kam nichts. Da habe ich schon gedacht, der übertreibt. Aber das heißt ja nicht, dass alles falsch ist.",
        optionen: [
          { text: "Dann hör doch auf, mir diese Links zu schicken, wenn du selbst weißt, dass da Quatsch drin ist.", bewertung: "schlecht", feedback: "Die Grenze wäre legitim, aber jetzt wirkt sie wie eine Strafe für ihre Offenheit. Sie hat sich gerade geöffnet und wird es nicht wieder tun. Grenzen setzt du besser in einem ruhigen Moment, mit Begründung und ohne Vorwurf.", technik: "grenzen-setzen", weiter: "k5" },
          { text: "Stimmt, das heißt nicht, dass alles falsch ist. Du hast selbst gemerkt, dass da jemand übertreibt. Das ist genau der kritische Blick, mit dem du die Medien prüfst. Wendest du ihn auf beide Seiten an?", bewertung: "gut", feedback: "Du nimmst ihren Einwand ernst, spiegelst ihren eigenen Zweifel und machst ihn zur Stärke. Der Change Talk kommt von ihr; du verstärkst ihn, statt ihn auszunutzen.", technik: "motivational-interviewing", weiter: "k5" },
          { text: "Siehst du, das war Unsinn, und das wusstest du auch. Vieles andere in der Gruppe ist auf demselben Niveau.", bewertung: "ok", feedback: "Inhaltlich richtig, aber das „Siehst du“ ist Triumph. Beim Korrigieren gilt: den Mythos einmal nennen, den Trugschluss erklären, den Fakt wiederholen – und das ohne Sieger. Zweifel braucht Raum, keine Bestätigung von außen.", technik: "debunking-sandwich", weiter: "k5" }
        ]
      },
      k5: {
        aussage: "Puh. Beide Seiten. Ich weiß nicht. Lass uns nächste Woche wieder telefonieren, aber vielleicht mal über etwas anderes.",
        optionen: [],
        abschluss: "Sandra hat laut ausgesprochen, dass ein Teil ihrer Quellen übertreibt. Das kam von ihr, nicht von dir, und möglich war es nur, weil sie dir als Person vertraut. Über anderes zu reden ist kein Rückschritt, sondern Beziehungspflege. Die Links musst du nicht lesen; das darfst du ihr in Ruhe sagen, ohne sie abzuwerten."
      }
    }
  },

  {
    id: "sohn-sechzehn",
    titel: "Dein Sohn und die neuen Freunde",
    ebene: "individuum",
    kontext: "Dein Sohn Jonas hat seit ein paar Monaten neue Freunde aus dem Fußballverein. Er postet Clips mit Deutschlandfahnen und Sprüchen, die du aus Parteikanälen kennst. Heute hast du ihn beim Abendessen darauf angesprochen.",
    person: "Jonas, 16, Schüler. Früher eher still, seit dem neuen Freundeskreis selbstbewusster. Er sucht einen Platz, an dem er etwas gilt.",
    start: "k1",
    knoten: {
      k1: {
        aussage: "Was soll das jetzt? Das ist einfach Patriotismus. Alle in der Mannschaft posten das. Nur bei uns zu Hause ist das plötzlich ein Problem.",
        optionen: [
          { text: "Solange du unter meinem Dach wohnst, postest du so einen Mist nicht. Handy her.", bewertung: "schlecht", feedback: "Ein Verbot, das du nicht durchsetzen kannst, und es treibt ihn zur Gruppe. Beratungsstellen raten, nur zu verbieten, was man auch durchsetzen kann, und bei Jugendlichen den Kontakt nicht gleich als Erstes aufs Spiel zu setzen.", technik: "grenzen-setzen", weiter: "k2" },
          { text: "Patriotismus ist für mich etwas anderes als diese Sprüche. Ich sage dir, wie ich das sehe, und du sagst mir, wie du es siehst.", bewertung: "ok", feedback: "Position zu zeigen ist richtig, und du bietest Austausch an. Nur die Reihenfolge stimmt nicht. Frag zuerst, was ihm daran gefällt, sonst hört er nur deinen Teil.", technik: "soziale-normen", weiter: "k2" },
          { text: "Stimmt, ich habe es gerade als Problem angesprochen. Eigentlich will ich es lieber verstehen. Was gefällt dir an den Clips, und was bedeutet dir die Mannschaft?", bewertung: "gut", feedback: "Du korrigierst deinen Einstieg und fragst offen. Für Jugendliche bieten solche Szenen vor allem Gemeinschaft, Anerkennung und Identität (Pfeiffer 2024). Genau danach fragst du jetzt, nicht nach der Fahne.", technik: "aktives-zuhoeren", weiter: "k2" }
        ]
      },
      k2: {
        aussage: "Was mir gefällt? Dass man endlich mal stolz sein darf. In der Schule wird nur gesagt, was man alles nicht darf. Bei den Jungs ist das anders, da lacht keiner über mich.",
        optionen: [
          { text: "Dass keiner über dich lacht, ist wichtig, das verstehe ich. Das hat dir gefehlt, oder? Erzähl mir von den Jungs.", bewertung: "gut", feedback: "Du hörst das Bedürfnis heraus, nämlich Zugehörigkeit und Anerkennung. Die Uncertainty-Identity-Theorie beschreibt, wie verunsicherte Jugendliche Halt in klar umrissenen Gruppen finden. Das Bedürfnis ist legitim, und du zeigst, dass du es siehst.", technik: "beduerfnisse-adressieren", weiter: "k3" },
          { text: "Stolz worauf denn? Auf ein Land, in dem du zufällig geboren bist? Das ist doch Unsinn.", bewertung: "schlecht", feedback: "Ein Schlagabtausch über Identität trifft genau sein Bedürfnis, dazuzugehören. Er hört daraus, dass zu Hause über ihn gelacht wird und bei den Jungs nicht. Das ist das Gegenteil von dem, was du willst.", technik: "fragen-statt-fakten", weiter: "k3" },
          { text: "Ich war mit sechzehn auch in einer Clique, in der ich mich endlich stark gefühlt habe. Ich erzähle dir mal, wie das ausging.", bewertung: "ok", feedback: "Eine eigene Geschichte schafft Nähe. Aber als Warnung verpackt wird sie zur Moralpredigt. Erzähl sie als Erfahrung, nicht als Lehre – und erst, wenn er mit seiner Geschichte fertig ist.", technik: "perspektivwechsel-erzaehlung", weiter: "k3" }
        ]
      },
      k3: {
        aussage: "Die sind einfach cool. Tim ist zwanzig und hat uns zu einem Treffen mitgenommen, da waren Leute von der Jugendorganisation. Grillen, Fußball, und die haben erklärt, warum Deutschland den Bach runtergeht.",
        optionen: [
          { text: "Was heißt „den Bach runter“? Was genau meinen die damit, und was sollst du dagegen tun?", bewertung: "ok", feedback: "Die Frage lenkt auf das Narrativ, das ist richtig. Aber im Moment hört er ein Verhör heraus. Stell sie später, wenn klar ist, dass du ihn nicht ausfragen willst.", technik: "fragen-statt-fakten", weiter: "k4" },
          { text: "Du gehst da nie wieder hin. Das ist eine rechtsextreme Organisation, das verbiete ich dir.", bewertung: "schlecht", feedback: "Das Verbot kannst du nicht kontrollieren. Er geht heimlich hin, und die Gruppe wird zum Lebensmittelpunkt. Genau dann greift elterlicher Einfluss kaum noch (Violence Prevention Network). Hol dir Beratung, statt im Alleingang zu verbieten.", technik: "grenzen-setzen", weiter: "k4" },
          { text: "Grillen, Fußball, Leute, die sich kümmern. Das klingt erst mal gut. Darf ich Tim mal kennenlernen? Lad ihn doch zum Essen ein.", bewertung: "gut", feedback: "Du bleibst mit seiner Welt in Kontakt, statt sie auszugrenzen. Beziehungen außerhalb der Szene sind der wichtigste Schutzfaktor. Dafür musst du wissen, wer zur Szene gehört, und selbst sichtbar bleiben.", technik: "kontakt-begegnung", weiter: "k4" }
        ]
      },
      k4: {
        aussage: "Du willst ihn doch nur ausfragen. Aber okay. Wenn du nicht wieder so eine Nummer machst wie neulich bei Lukas.",
        optionen: [
          { text: "Lukas war ein Idiot, und wenn Tim genauso ist, sage ich das auch.", bewertung: "schlecht", feedback: "Wer seine Freunde abwertet, wertet seine Wahl ab. Er wird Tim nicht einladen, und das Gespräch ist vorbei. Deine Meinung zu Lukas darfst du haben, aber nicht als Drohung vorbringen.", technik: "aktives-zuhoeren", weiter: "k5" },
          { text: "Keine Nummer, versprochen. Zwei Dinge sind mir aber wichtig, und die sage ich dir jetzt: keine Sprüche gegen Menschen an diesem Tisch, und wenn es um Gewalt geht, reden wir sofort. Alles andere darfst du anders sehen als ich.", bewertung: "gut", feedback: "Klare, begründete Grenzen, die du einhalten kannst, und Raum für seine Meinung. Genau das empfiehlt die Praxis: die Position ablehnen, die Person wertschätzen, Grenzen benennen, Kontakt halten.", technik: "grenzen-setzen", weiter: "k5" },
          { text: "Okay, ich halte mich zurück. Ich spreche aber auch mal mit deinem Trainer, der kennt Tim.", bewertung: "ok", feedback: "Verbündete zu suchen ist richtig; Trainer und Schule gehören dazu. Aber nicht hinter seinem Rücken. Sag ihm, dass du das tust und warum, sonst erlebt er es als Überwachung.", technik: "selbstfuersorge", weiter: "k5" }
        ]
      },
      k5: {
        aussage: "Okay. Dann Samstag. Aber du hörst ihm zu und fragst ihn nicht nur aus.",
        optionen: [],
        abschluss: "Du hast den Kontakt gehalten, sein Bedürfnis gesehen und zwei Grenzen gesetzt, die du begründen und einhalten kannst. Achte darauf, ob Jonas sich zurückzieht oder die Gruppe zu seinem Lebensmittelpunkt wird. Wenn ja, hol dir Rat bei der Fachstelle Rechtsextremismus und Familie oder bei einer Mobilen Beratung, bevor du allein weitermachst."
      }
    }
  },

  {
    id: "haustuer",
    titel: "An der Haustür",
    ebene: "masse",
    kontext: "Du bist mit einer Initiative unterwegs, die Haustürgespräche über das Zusammenleben im Stadtteil führt. Du klingelst, ein Mann um die fünfzig öffnet. Hinter ihm läuft der Fernseher.",
    person: "Ein Anwohner, Handwerker, seit 25 Jahren im Viertel. Er hat zuletzt eine Partei gewählt, die er selbst „das kleinere Übel“ nennt.",
    start: "k1",
    knoten: {
      k1: {
        aussage: "Ach, ihr seid das mit den Gesprächen. Hört mal, ich habe schon gewählt, und zwar nicht das, was ihr wollt. Wenn ihr mich bekehren wollt, könnt ihr gleich wieder gehen.",
        optionen: [
          { text: "Wir wollen Sie nicht bekehren, aber Sie sollten wissen, was diese Partei wirklich vorhat. Hier, ein Flyer.", bewertung: "schlecht", feedback: "Flyer statt Gespräch, und du bestätigst seinen Verdacht. Reine Argumentation hatte in Feldexperimenten keinen Effekt; der Austausch über Erfahrungen schon (Kalla und Broockman 2020).", technik: "haustuergespraech", weiter: "k2" },
          { text: "Bekehren will ich niemanden, versprochen. Wir fragen Leute, was sich im Viertel ändern müsste. Zwei Minuten, dann bin ich weg. Was nervt Sie hier am meisten?", bewertung: "gut", feedback: "Du machst deine Absicht transparent, begrenzt die Zeit und stellst eine konkrete Frage. Deep Canvassing beginnt mit Zuhören, nicht mit einer Botschaft. Er hat jetzt etwas, worauf er antworten kann.", technik: "haustuergespraech", weiter: "k2" },
          { text: "Ich bin selbst aus dem Viertel und will nur hören, wie es Ihnen geht. Welche Partei Sie wählen, ist Ihre Sache.", bewertung: "ok", feedback: "Nähe und Respekt vor seiner Wahl sind richtig. Es fehlt nur die konkrete Frage, die das Gespräch öffnet. „Wie geht es Ihnen?“ ist an der Haustür zu groß.", technik: "soziale-normen", weiter: "k2" }
        ]
      },
      k2: {
        aussage: "Am meisten? Dass hier nachts die Jugendlichen vor dem Kiosk rumhängen und keiner was macht. Ich habe dreimal die Polizei gerufen. Nichts. Aber für die Unterkunft am Park war Geld da.",
        optionen: [
          { text: "Mich hat das auch genervt. Ich habe dann mit dem Quartiersmanagement geredet, und jetzt gibt es abends einen Streetworker.", bewertung: "ok", feedback: "Eine eigene Erfahrung schafft Nähe und zeigt einen Weg. Aber die Lösung kommt vor dem Zuhören. Spiegle erst seinen Frust; dann wird deine Geschichte zum Angebot statt zur Belehrung.", technik: "perspektivwechsel-erzaehlung", weiter: "k3" },
          { text: "Dreimal gerufen, und nichts passiert. Das ist frustrierend. Was wäre für Sie ein Zeichen, dass sich jemand kümmert?", bewertung: "gut", feedback: "Du nimmst seine Erfahrung ernst, ohne die Verbindung zur Unterkunft zu übernehmen oder zu bekämpfen. Die Frage lenkt auf das Bedürfnis dahinter: gesehen zu werden und vor Ort etwas in der Hand zu haben.", technik: "aktives-zuhoeren", weiter: "k3" },
          { text: "Die Unterkunft hat damit nichts zu tun, das ist Landesgeld. Und die Jugendlichen sind übrigens meistens von hier.", bewertung: "schlecht", feedback: "Zwei Korrekturen, null Beziehung. Beide Fakten können stimmen, aber er hört nur, dass du ihn nicht ernst nimmst. Fakten gehören ins Gespräch, sobald er sich gehört fühlt.", technik: "debunking-sandwich", weiter: "k3" }
        ]
      },
      k3: {
        aussage: "Ein Zeichen? Dass mal jemand vom Amt hier steht statt ihr. Nichts gegen euch. Aber ihr könnt ja auch nichts entscheiden.",
        optionen: [
          { text: "Stimmt, entscheiden kann ich nichts. Aber ich kann erzählen, was letzten Monat passiert ist, als zwanzig Leute aus der Straße beim Ortsbeirat aufgetaucht sind. Darf ich?", bewertung: "gut", feedback: "Du gibst ihm recht, wo er recht hat, und bittest um Erlaubnis für eine Geschichte. Erzählen statt argumentieren ist der Wirkfaktor im Deep Canvassing, und die Bitte um Erlaubnis gibt ihm die Kontrolle.", technik: "perspektivwechsel-erzaehlung", weiter: "k4" },
          { text: "Na, dann wählen Sie halt weiter die, die auch nichts entscheiden. Schönen Abend.", bewertung: "schlecht", feedback: "Gekränkt abziehen. Du hast den Kontakt abgebrochen, nicht er, und morgen erzählt er es dem Nachbarn. An der Haustür gilt: freundlich beenden, auch wenn nichts erreicht wurde.", technik: "haustuergespraech", weiter: "k4" },
          { text: "Am 14. ist Ortsbeirat, da geht es genau um den Kiosk. Ich schreibe Ihnen die Uhrzeit auf.", bewertung: "ok", feedback: "Konkret und richtig, das ist Beteiligung mit spürbarer Wirkung. Aber ohne Brücke wirkt die Einladung wie ein Termin vom Amt. Erst anknüpfen, dann einladen.", technik: "buergerrat-deliberation", weiter: "k4" }
        ]
      },
      k4: {
        aussage: "Na, erzählen Sie. Aber kurz, mein Essen wird kalt.",
        optionen: [
          { text: "Die Partei, die Sie gewählt haben, hat im Ortsbeirat übrigens gegen den Streetworker gestimmt. Nur dass Sie es wissen.", bewertung: "schlecht", feedback: "Nachtreten statt erzählen. Der Fakt könnte später zählen; jetzt bestätigt er sein Bild von euch als Bekehrern. Außerdem sollte eine gemeinnützige Initiative an der Haustür keinen Wahlkampf gegen eine Partei führen.", technik: "prebunking", weiter: "k5" },
          { text: "Der Streetworker ist übrigens selbst aus dem Viertel, früher Kioskkunde. Soll ich ihm sagen, er soll mal klingeln?", bewertung: "ok", feedback: "Ein Botschafter aus dem Viertel ist stark. Aber ungefragt jemanden vorbeizuschicken ist übergriffig. Erzähl erst die Geschichte und frag dann, ob er den Kontakt möchte.", technik: "vertrauenswuerdige-botschafter", weiter: "k5" },
          { text: "Kurz: Die Nachbarin aus der 12 hatte dasselbe Problem mit dem Kiosk. Sie hat beim Ortsbeirat zwei Minuten geredet, und jetzt gibt es abends Streetwork. Sie hat vorher auch nicht geglaubt, dass es etwas bringt. Würden Sie hingehen, wenn sie mitgeht?", bewertung: "gut", feedback: "Eine Geschichte von jemandem wie ihm, aus seiner Straße, mit konkretem Ergebnis, dazu ein Angebot mit Begleitung. Das ist die Form von Deep Canvassing, deren Wirkung in Feldexperimenten über Monate anhielt.", technik: "deep-canvassing", weiter: "k5" }
        ]
      },
      k5: {
        aussage: "Die Frau aus der 12? Die kenne ich. Na gut, schreiben Sie mir den Termin auf. Aber ich verspreche nichts.",
        optionen: [],
        abschluss: "Ein Haustürgespräch ändert keine Wahlentscheidung, und das war auch nicht dein Ziel. Er hat sein Problem benannt, eine Geschichte aus seiner Straße gehört und eine konkrete Möglichkeit bekommen, selbst etwas zu bewirken. Notiere nur, was ihr vereinbart habt, nichts über seine Wahl oder seine Haltung."
      }
    }
  },

  {
    id: "buergerversammlung",
    titel: "Bürgerversammlung in der Turnhalle",
    ebene: "masse",
    kontext: "Bürgerversammlung zur geplanten Gemeinschaftsunterkunft. Du sitzt für die Gemeinde oder eine Initiative vorn am Tisch. Etwa 120 Menschen sind da, die Stimmung ist angespannt. Eine Frau steht auf und nimmt das Mikrofon.",
    person: "Eine Anwohnerin, Mitte fünfzig, Erzieherin, in der Gemeinde bekannt. Sie ist keine Aktivistin, aber sie spricht aus, was viele im Saal denken.",
    start: "k1",
    knoten: {
      k1: {
        aussage: "Ich sage es mal direkt: Wir wurden nicht gefragt. Die Kita ist voll, die Schule hat keine Lehrer, der Arzt geht in Rente. Und jetzt kommen achtzig Leute dazu. Wer soll das stemmen? Und kommen Sie mir jetzt nicht mit „Wir schaffen das“.",
        optionen: [
          { text: "Ich höre Sorge heraus und auch Ärger darüber, dass Sie übergangen wurden. Das nehme ich ernst.", bewertung: "ok", feedback: "Spiegeln ist richtig, aber vor 120 Menschen braucht es sofort etwas Greifbares, sonst klingt es nach Floskel. Nenn ihre drei Punkte und sag, was du damit machst.", technik: "aktives-zuhoeren", weiter: "k2" },
          { text: "Ich bitte um Sachlichkeit. Die Unterkunft ist beschlossen, wir sind hier, um zu informieren, nicht um zu diskutieren.", bewertung: "schlecht", feedback: "Anordnung von oben statt erlebter Kontrolle. Das weckt Ohnmacht und Wut. Über 70 Prozent meinen laut Leipziger Studie, Leute wie sie hätten keinen Einfluss – und du hast es gerade bestätigt.", technik: "buergerrat-deliberation", weiter: "k2" },
          { text: "Sie haben recht, das Verfahren kam zu spät, und dafür stehe ich hier gerade. Kita, Schule, Arzt – drei konkrete Punkte, die schreibe ich mit. Wer im Saal hat noch einen? Dann gehen wir sie einzeln durch.", bewertung: "gut", feedback: "Du gibst ihr recht, wo sie recht hat, machst die Sorgen zu Tagesordnungspunkten und beteiligst den Saal. Das ist Deliberation statt Verkündung. Beteiligung mit spürbaren Folgen antwortet auf das Gefühl, übergangen zu werden.", technik: "buergerrat-deliberation", weiter: "k2" }
        ]
      },
      k2: {
        aussage: "Ein Zwischenruf: „Und die Sicherheit? Meine Tochter geht abends vom Training allein nach Hause.“ Die Frau am Mikrofon: „Genau. Darüber redet keiner.“",
        optionen: [
          { text: "Diese Angst wird gezielt geschürt, das kennen wir aus den Kampagnen einer bestimmten Partei. Lassen Sie sich nicht instrumentalisieren.", bewertung: "schlecht", feedback: "Für Amtsträger ein Neutralitätsproblem, für alle anderen eine Beschämung, denn sie hört, dass du sie für eine Marionette hältst. Prebunking wirkt vorab und ohne konkrete Zielperson, nicht als Vorwurf im Saal.", technik: "prebunking", weiter: "k3" },
          { text: "Dann reden wir darüber. Was genau würde Ihnen Sicherheit geben? Beleuchtung am Sportplatz, feste Ansprechpersonen, ein Abendbus? Ich frage, weil wir das in der Nachbargemeinde so gemacht haben.", bewertung: "gut", feedback: "Du nimmst die Sorge ernst und übersetzt sie in konkrete Möglichkeiten, statt sie zu bewerten. Sicherheit und Ordnung sind legitime Bedürfnisse; wer sie glaubwürdig bedient, entzieht autoritären Angeboten den Boden.", technik: "fragen-statt-fakten", weiter: "k3" },
          { text: "Die Kriminalitätsstatistik zeigt für vergleichbare Unterkünfte keine Zunahme. Aber ich verstehe, dass Zahlen die Sorge nicht wegnehmen.", bewertung: "ok", feedback: "Fakt plus Anerkennung ist handwerklich sauber. Aber im Saal klingt Statistik nach Abwimmeln. Der Fakt gehört ins Protokoll und auf die Website; ins Mikrofon gehört die Frage, was helfen würde.", technik: "debunking-sandwich", weiter: "k3" }
        ]
      },
      k3: {
        aussage: "Beleuchtung, ja. Aber ehrlich, ich glaube Ihnen nicht, dass das kommt. Vor drei Jahren haben Sie uns den Radweg versprochen. Wo ist der?",
        optionen: [
          { text: "Der Vereinsvorsitzende vom SV war in der Nachbargemeinde dabei. Herr Krause, möchten Sie kurz sagen, wie es dort gelaufen ist?", bewertung: "ok", feedback: "Ein glaubwürdiger Botschafter aus dem Ort ist stärker als jede Behördenstimme. Aber die Radweg-Frage bleibt unbeantwortet, und genau das bestätigt ihr Misstrauen. Erst antworten, dann den Botschafter.", technik: "vertrauenswuerdige-botschafter", weiter: "k4" },
          { text: "Das ist ein anderes Thema. Bleiben wir bitte bei der Unterkunft.", bewertung: "schlecht", feedback: "Du wischst einen erlebten Vertrauensbruch vom Tisch. Geringes politisches Vertrauen ist ein zentraler Prädiktor für die Hinwendung, und du hast gerade gezeigt, warum. Auf Misstrauen antwortet man mit Transparenz, nicht mit der Tagesordnung.", technik: "motivational-interviewing", weiter: "k4" },
          { text: "Der Radweg ist nicht da, das stimmt, und ich erkläre Ihnen in einem Satz, woran es hängt. Und ich schlage vor, dass wir heute eine Gruppe aus dem Saal bilden, die die heutigen Zusagen in drei Monaten öffentlich prüft. Wer macht mit?", bewertung: "gut", feedback: "Du räumst den Vertrauensbruch ein, erklärst kurz und bietest Kontrolle an, statt um Vertrauen zu bitten. Transparenz und erlebbare Kontrolle sind das Gegenmittel gegen Misstrauen; Versprechen sind es nicht.", technik: "soziale-normen", weiter: "k4" }
        ]
      },
      k4: {
        aussage: "Eine Gruppe, die Sie kontrolliert? Das wäre mal etwas Neues. Aber wer garantiert, dass das nicht wieder im Sand verläuft?",
        optionen: [
          { text: "Niemand garantiert das – außer Sie selbst. Deshalb legen wir den Termin heute fest, das Protokoll geht an alle, und Sie bestimmen die Sprecherin. Wenn Sie wollen, übernehmen Sie das.", bewertung: "gut", feedback: "Du gibst Kontrolle ab, baust Struktur statt Versprechen und bietest ihr eine Rolle an. Eine Rolle zu haben erfüllt das Bedürfnis nach Bedeutsamkeit, und eine Prüfgruppe macht Kontrolle erlebbar.", technik: "buergerrat-deliberation", weiter: "k5" },
          { text: "Wenn Sie uns sowieso nichts glauben, kann ich auch nichts mehr sagen.", bewertung: "schlecht", feedback: "Beleidigt aufgeben. Der Saal registriert Hilflosigkeit, und sie behält recht, denn es ändert sich nichts. Erschöpfung ist verständlich, gehört aber nicht ins Mikrofon.", technik: "selbstfuersorge", weiter: "k5" },
          { text: "Ich persönlich garantiere das. Sie haben mein Wort.", bewertung: "ok", feedback: "Ehrlich gemeint, aber ein Wort ist genau das, was schon einmal gebrochen wurde. Biete Struktur an statt deiner Person: Termine, Protokolle, eine Gruppe, die prüft.", technik: "beduerfnisse-adressieren", weiter: "k5" }
        ]
      },
      k5: {
        aussage: "Na gut. Schreiben Sie mich auf. Aber ich bringe noch drei Leute mit, die ebenfalls genau hinschauen.",
        optionen: [],
        abschluss: "Die Unterkunft bleibt umstritten, aber heute Abend ist etwas anderes passiert. Die Frau, der viele zuhören, hat eine Rolle bekommen. Kontrolle erleben, Zusagen prüfen, gesehen werden – das sind die Bedürfnisse hinter der Wut. Du hast keine Partei genannt, niemanden für seine Sorge beschämt und nichts versprochen, was du nicht halten kannst."
      }
    }
  },

  {
    id: "kommentarspalte",
    titel: "In der Kommentarspalte des Vereins",
    ebene: "masse",
    kontext: "Dein Sportverein hat ein Foto vom Integrationsturnier gepostet. Darunter sammeln sich Kommentare. Einer stammt von einem langjährigen Mitglied, das du vom Platz kennst, und hat schon 14 Likes.",
    person: "Bernd, Ende vierzig, seit zwanzig Jahren im Verein, Platzwart in der Freizeit. Sonst postet er Fotos vom Rasenmäher.",
    start: "k1",
    knoten: {
      k1: {
        aussage: "Schön bunt. Und wer räumt nach dem Turnier auf? Wieder die Alten. Erst wird für alle Geld ausgegeben, und die eigenen Leute dürfen die Drecksarbeit machen. Aber das darf man ja nicht sagen.",
        optionen: [
          { text: "Öffentlich antworten: Bernd, was meinst du mit „für alle Geld ausgegeben“? Das Turnier hat der Landessportbund bezahlt.", bewertung: "ok", feedback: "Faktisch in Ordnung, aber vor 14 Leuten, die ihm zugestimmt haben, wird jede Nachfrage zum Duell, und er kann nicht zurück, ohne das Gesicht zu verlieren. Hol das Gespräch ins Private; öffentlich reicht ein kurzer, warmer Satz.", technik: "fragen-statt-fakten", weiter: "k2" },
          { text: "Öffentlich antworten: Hallo Bernd, danke fürs Aufräumen, ehrlich. Das hat am Samstag niemand gesehen, und das ist nicht in Ordnung. Ich rufe dich nachher an, dann machen wir das besser.", bewertung: "gut", feedback: "Du würdigst öffentlich seine Leistung, gibst ihm recht, wo er recht hat, und holst den Rest ins Private. Die Mitlesenden sehen Respekt statt Streit, und Bernd muss nicht vor Publikum nachgeben.", technik: "aktives-zuhoeren", weiter: "k2" },
          { text: "Kommentar löschen und antworten: Solche Kommentare haben auf unserer Seite nichts verloren.", bewertung: "schlecht", feedback: "Löschen ohne Gespräch bestätigt das „Das darf man ja nicht sagen“, und 14 Leute sehen Zensur. Grenzen gelten bei menschenverachtenden Inhalten, und dann mit Begründung. Das hier ist Kränkung, keine Hetze.", technik: "grenzen-setzen", weiter: "k2" }
        ]
      },
      k2: {
        aussage: "Er antwortet öffentlich: Anrufen kannst du, aber ich bin nicht der Einzige, der so denkt. Guck dir die Likes an. Wir sind im eigenen Verein nicht mehr die Mehrheit.",
        optionen: [
          { text: "Öffentlich: 14 Likes sind kein Argument. Solche Sprüche kennt man aus bestimmten Parteikanälen, das sollte dir zu denken geben.", bewertung: "schlecht", feedback: "Likes abwerten und ein Etikett verteilen. Die Mitlesenden verbünden sich jetzt mit ihm, und du hast den Verein gespalten, statt Bernd zu erreichen. Wer beschimpft, schadet sich selbst.", technik: "prebunking", weiter: "k3" },
          { text: "Öffentlich: Du bist nicht der Einzige, stimmt. Und du bist seit zwanzig Jahren das Rückgrat vom Platz. Das mit „nicht mehr die Mehrheit“ sehe ich anders, das sage ich offen. Ich melde mich. Danach anrufen.", bewertung: "gut", feedback: "Du zeigst deine Haltung, ohne zu etikettieren, und würdigst ihn gleichzeitig. Die Normen nahestehender Menschen wirken, wenn sie ohne Beschämung sichtbar werden (Winter et al. 2022). Das eigentliche Gespräch führst du am Telefon.", technik: "soziale-normen", weiter: "k3" },
          { text: "Der Jugendtrainer antwortet: Bernd, ohne dich kein Platz. Lass uns Samstag beim Bier reden. Du hältst dich zurück.", bewertung: "ok", feedback: "Richtiger Botschafter, richtiger Ort: Jemand, dem Bernd vertraut, holt das Gespräch ins Persönliche. Aber als Vorstand oder Admin solltest du deine Haltung ebenfalls kurz zeigen, sonst wirkt es wie Wegducken.", technik: "vertrauenswuerdige-botschafter", weiter: "k3" }
        ]
      },
      k3: {
        aussage: "Am Telefon: Weißt du, ich bin seit zwanzig Jahren hier, und seit zwei Jahren redet jeder nur noch über Integration. Vom Platzwart redet keiner. Ich bin müde.",
        optionen: [
          { text: "Weißt du, Amir aus der Zweiten hat nach dem Turnier zwei Stunden mit abgebaut, hast du das mitbekommen? Der fühlt sich auch nicht gesehen.", bewertung: "ok", feedback: "Eine Geschichte, die verbindet und aus dem „Wir gegen die“ ein gemeinsames Problem macht. Aber erst sein Bedürfnis, dann die Brücke. Sonst hört er nur, dass es schon wieder um die anderen geht.", technik: "perspektivwechsel-erzaehlung", weiter: "k4" },
          { text: "Müde sind wir alle. Aber du hast öffentlich gegen den Verein geschossen, das kannst du nicht einfach mit „müde“ erklären.", bewertung: "schlecht", feedback: "Vorwurf statt Zuhören. Er hat gerade das Eigentliche gesagt – ihm fehlt Anerkennung –, und du antwortest mit Disziplin. Er wird den Kommentar nicht ändern, sondern noch mehr schreiben.", technik: "motivational-interviewing", weiter: "k4" },
          { text: "Das höre ich. Du bist müde, weil keiner sieht, was du machst. Wie wäre es, wenn der Platzwart beim nächsten Turnier eine sichtbare Rolle hätte, nicht erst danach? Was würde dir gefallen?", bewertung: "gut", feedback: "Du benennst das Bedürfnis nach Anerkennung und bietest eine Rolle an, statt über Integration zu diskutieren. Bedeutsamkeit über Aufgaben anzubieten ist die praktische Konsequenz aus dem 3N-Modell.", technik: "beduerfnisse-adressieren", weiter: "k4" }
        ]
      },
      k4: {
        aussage: "Eine Rolle, hm. Wenn ich das Turnier mitorganisieren könnte, würde ich wenigstens mitentscheiden, wie das läuft. Den Kommentar nehme ich raus. Aber ich stehe trotzdem zu dem, was ich meine.",
        optionen: [],
        abschluss: "Du hast in der Kommentarspalte Haltung gezeigt, ohne zu etikettieren, und das eigentliche Gespräch ins Private geholt. Bernd nimmt den Kommentar raus, weil er sich gesehen fühlt, nicht weil er verloren hat. Dass er zu seiner Meinung steht, ist in Ordnung. Dein Ziel war Entfeindung und Einbindung, nicht Bekehrung."
      }
    }
  }
];
