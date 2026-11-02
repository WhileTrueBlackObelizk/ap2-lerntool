/* AP2-Lerntool – Feynman-Modus: Begriffe mit Kernpunkten, typischen Lücken und Musterklärung (Format: SCHEMA.md, Abschnitt Paket C) */
window.AP2 = window.AP2 || { topics: [], questions: [], exams: [], generators: [] };
AP2.feynman = AP2.feynman || [];

/* ---- ga1 ---- */
// GA1 – Feynman-Modus: Fachbegriffe einem Laien erklären
AP2.feynman.push(
  /* ---------- Projektmanagement ---------- */
  {
    id: "fey-scrum",
    term: "Scrum",
    part: "GA1",
    topic: "ga1-projektmanagement",
    prompt: "Erkläre einem Laien, wie ein Team nach Scrum arbeitet.",
    keypoints: [
      { text: "Agiles Vorgehen in kurzen, festen Iterationen (Sprints, max. 1 Monat)", kw: "sprint|iteration|zyklus|wochen" },
      { text: "Product Owner pflegt und priorisiert das Product Backlog", kw: "product owner|backlog|priorisier" },
      { text: "Scrum Master coacht und beseitigt Hindernisse – kein Projektleiter", kw: "scrum master|hindernis|coach" },
      { text: "Developers organisieren sich selbst und liefern ein Inkrement", kw: "inkrement|selbstorganis|entwickler|developer" },
      { text: "Feste Events: Planning, Daily, Review, Retrospektive", kw: "daily|review|retro|planning" }
    ],
    gaps: ["Hinweis: Der Scrum Master ist kein Chef oder Projektleiter.", "Hinweis: Nach jedem Sprint gibt es ein nutzbares Ergebnis, nicht erst am Projektende."],
    model: "Scrum ist eine Arbeitsweise, bei der ein Team in kurzen Etappen von höchstens einem Monat arbeitet, den Sprints. Der Product Owner führt eine priorisierte Wunschliste (Product Backlog) und entscheidet, was am wichtigsten ist. Das Team plant zu Beginn, was es im Sprint schafft, stimmt sich täglich kurz ab und zeigt am Ende ein fertiges Teilergebnis. In der Retrospektive überlegt es, wie es besser zusammenarbeiten kann. Der Scrum Master ist dabei wie ein Trainer, der Hindernisse aus dem Weg räumt."
  },
  {
    id: "fey-kritischer-pfad",
    term: "Kritischer Pfad",
    part: "GA1",
    topic: "ga1-projektmanagement",
    prompt: "Erkläre einem Laien, was der kritische Pfad in einem Netzplan ist.",
    keypoints: [
      { text: "Kette von Vorgängen ohne zeitlichen Puffer", kw: "puffer|spielraum|reserve" },
      { text: "Jede Verzögerung dort verschiebt das Projektende", kw: "verzöger|verschieb|später|verläng" },
      { text: "Bestimmt die Gesamtdauer des Projekts", kw: "gesamtdauer|projektdauer|längst|dauer" },
      { text: "Ermittlung über Vorwärts- und Rückwärtsrechnung im Netzplan", kw: "netzplan|vorwärts|rückwärts|faz|saz" },
      { text: "Diese Vorgänge besonders überwachen", kw: "überwach|kontroll|fokus|steuer|achten" }
    ],
    gaps: ["Hinweis: Kritisch heißt nicht „schwierig“, sondern „ohne Puffer“.", "Hinweis: Der kritische Pfad ist der längste Weg, nicht der kürzeste."],
    model: "Ein Projekt besteht aus vielen Aufgaben, von denen manche erst beginnen können, wenn andere fertig sind. Der kritische Pfad ist die längste Kette solcher abhängigen Aufgaben – sie bestimmt, wie lange das ganze Projekt mindestens dauert. Auf diesem Pfad gibt es keinen Puffer: Verspätet sich dort etwas um einen Tag, ist auch das Projekt einen Tag später fertig. Wie bei einer Reise mit knappen Umstiegen: Verpasst du einen Anschluss, kommst du später an. Deshalb behält die Projektleitung diese Aufgaben besonders im Blick."
  },
  {
    id: "fey-magisches-dreieck",
    term: "Magisches Dreieck",
    part: "GA1",
    topic: "ga1-projektmanagement",
    prompt: "Erkläre einem Laien das magische Dreieck des Projektmanagements.",
    keypoints: [
      { text: "Drei Zielgrößen: Zeit, Kosten, Qualität/Leistung", kw: "zeit|termin" },
      { text: "Kosten bzw. Budget als zweite Ecke", kw: "kosten|budget|geld" },
      { text: "Qualität bzw. Leistungsumfang als dritte Ecke", kw: "qualität|umfang|leistung" },
      { text: "Die Größen hängen voneinander ab – ändert man eine, leiden die anderen", kw: "abhäng|auswirk|zulasten|gegenseitig|wirkt" }
    ],
    gaps: ["Hinweis: Man kann nicht alle drei Ecken gleichzeitig optimieren.", "Hinweis: Ein Beispiel für eine Wechselwirkung macht die Erklärung greifbar."],
    model: "Jedes Projekt hat drei Stellschrauben: wie schnell es fertig wird, was es kostet und wie viel bzw. wie gut geliefert wird. Diese drei hängen zusammen wie die Ecken eines Dreiecks. Soll ein Hausbau schneller fertig werden, braucht man mehr Handwerker (höhere Kosten) oder verzichtet auf etwas (weniger Umfang). Alles gleichzeitig billiger, schneller und besser geht nicht – deshalb heißt es „magisch“."
  },
  /* ---------- Anforderungen ---------- */
  {
    id: "fey-lastenheft-pflichtenheft",
    term: "Lastenheft vs. Pflichtenheft",
    part: "GA1",
    topic: "ga1-anforderungen",
    prompt: "Erkläre einem Laien den Unterschied zwischen Lastenheft und Pflichtenheft.",
    keypoints: [
      { text: "Lastenheft wird vom Auftraggeber erstellt", kw: "auftraggeber|kunde" },
      { text: "Lastenheft beschreibt WAS und WOFÜR (Anforderungen)", kw: "was |wofür|anforderung|wünsch" },
      { text: "Pflichtenheft wird vom Auftragnehmer erstellt", kw: "auftragnehmer|dienstleister|entwickler|anbieter" },
      { text: "Pflichtenheft beschreibt WIE und WOMIT (Umsetzung)", kw: "wie |womit|umsetz|technisch|lösung" },
      { text: "Pflichtenheft baut auf dem Lastenheft auf und wird Vertragsgrundlage", kw: "vertrag|baut auf|grundlage|freigabe" }
    ],
    gaps: ["Typische Lücke: Ersteller vertauscht – das Lastenheft schreibt der Kunde.", "Hinweis: Technische Details (Datenbank, Framework) gehören ins Pflichtenheft."],
    model: "Stell dir vor, du willst ein Haus bauen lassen. Im Lastenheft schreibst du als Auftraggeber auf, was du brauchst: vier Zimmer, Garten, barrierefrei. Der Bauunternehmer antwortet mit dem Pflichtenheft und beschreibt, wie er das umsetzt: welche Materialien, welcher Grundriss, welcher Zeitplan. Das Pflichtenheft baut also auf dem Lastenheft auf. Wenn du es freigibst, wird es zur Vertragsgrundlage."
  },
  {
    id: "fey-nichtfunktionale-anforderungen",
    term: "Funktionale vs. nicht-funktionale Anforderungen",
    part: "GA1",
    topic: "ga1-anforderungen",
    prompt: "Erkläre einem Laien den Unterschied zwischen funktionalen und nicht-funktionalen Anforderungen.",
    keypoints: [
      { text: "Funktional: WAS das System tun soll", kw: "was |funktion|tun|kann" },
      { text: "Nicht-funktional: WIE GUT bzw. unter welchen Bedingungen", kw: "wie gut|qualität|bedingung" },
      { text: "Beispiele: Performance, Sicherheit, Bedienbarkeit", kw: "schnell|performance|sicher|bedien|usability" },
      { text: "Nicht-funktionale Anforderungen messbar formulieren", kw: "mess|prüfbar|sekunde|prozent|zahl" }
    ],
    gaps: ["Typische Lücke: Antwortzeiten gelten fälschlich als funktionale Anforderung.", "Hinweis: „Das System soll schnell sein“ ist nicht prüfbar – Zahlen nennen."],
    model: "Funktionale Anforderungen sagen, was eine Software können muss, zum Beispiel „Rechnungen als PDF exportieren“. Nicht-funktionale Anforderungen sagen, wie gut sie das tun soll: wie schnell, wie sicher, wie leicht bedienbar. Bei einem Auto wäre „kann fahren und bremsen“ funktional, „bremst aus 100 km/h in unter 40 Metern“ nicht-funktional. Gute nicht-funktionale Anforderungen enthalten messbare Werte, damit man sie prüfen kann."
  },
  {
    id: "fey-user-story",
    term: "User Story",
    part: "GA1",
    topic: "ga1-anforderungen",
    prompt: "Erkläre einem Laien, was eine User Story ist.",
    keypoints: [
      { text: "Kurze Anforderung aus Sicht eines Nutzers", kw: "nutzer|anwender|benutzer|rolle|sicht" },
      { text: "Format: Als … möchte ich …, damit …", kw: "als |möchte|damit" },
      { text: "Nutzen bzw. Zweck wird mitgenannt", kw: "nutzen|zweck|damit|warum" },
      { text: "Akzeptanzkriterien machen sie prüfbar", kw: "akzeptanz|kriteri|prüfbar|gegeben|testbar" },
      { text: "Qualitätskriterien INVEST (z. B. klein, verhandelbar, testbar)", kw: "invest|klein|verhandelbar|unabhängig" }
    ],
    gaps: ["Typische Lücke: Der Nutzen („damit …“) fehlt.", "Hinweis: Die Rolle ist ein echter Nutzer, nicht „der Entwickler“."],
    model: "Eine User Story ist ein kurzer Satz, der einen Wunsch aus Sicht eines Nutzers beschreibt: „Als Leserin möchte ich meine Ausleihen verlängern, damit ich keine Mahngebühr zahle.“ Sie sagt also, wer etwas will, was er will und warum. Dazu kommen Akzeptanzkriterien, an denen man später prüft, ob die Story erfüllt ist. Sie ist eher eine Einladung zum Gespräch als ein fertiger Vertrag."
  },
  /* ---------- Wirtschaftlichkeit ---------- */
  {
    id: "fey-nutzwertanalyse",
    term: "Nutzwertanalyse",
    part: "GA1",
    topic: "ga1-wirtschaftlichkeit",
    prompt: "Erkläre einem Laien, wie eine Nutzwertanalyse funktioniert.",
    keypoints: [
      { text: "Entscheidungshilfe zwischen mehreren Alternativen", kw: "alternativ|angebot|entscheid|vergleich|auswahl" },
      { text: "Kriterien festlegen und gewichten (Summe 100 %)", kw: "gewicht|wichtig|prozent" },
      { text: "Jede Alternative je Kriterium mit Punkten bewerten", kw: "punkt|bewert|note" },
      { text: "Gewicht × Punkte summieren, höchster Nutzwert gewinnt", kw: "multipli|summ|addier|höchst|mal " },
      { text: "Auch nicht-monetäre Kriterien vergleichbar, aber subjektiv", kw: "subjektiv|qualitativ|nicht-monetär|nicht monetär|geld" }
    ],
    gaps: ["Hinweis: Die Gewichte müssen zusammen 100 % ergeben.", "Hinweis: Die Gewichtung ist subjektiv – das ist der Hauptnachteil."],
    model: "Die Nutzwertanalyse hilft, zwischen mehreren Angeboten zu wählen, wenn nicht nur der Preis zählt. Zuerst legt man fest, was wichtig ist – etwa Funktionen, Preis und Support – und wie wichtig jedes Kriterium ist, zusammen 100 %. Dann vergibt man für jedes Angebot Punkte pro Kriterium, multipliziert sie mit dem Gewicht und addiert alles. Das Angebot mit der höchsten Summe gewinnt. Wie beim Wohnungsvergleich: Lage zählt dir 50 %, Größe 30 %, Balkon 20 %."
  },
  {
    id: "fey-amortisation",
    term: "Amortisationsrechnung",
    part: "GA1",
    topic: "ga1-wirtschaftlichkeit",
    prompt: "Erkläre einem Laien, was die Amortisationsdauer einer Investition aussagt.",
    keypoints: [
      { text: "Zeit, bis die Investition durch Rückflüsse wieder hereingeholt ist", kw: "zurück|hereingeholt|wieder drin|rückfluss|bezahlt" },
      { text: "Formel: Investition / Rückfluss pro Periode", kw: "investition|geteilt|dividier" },
      { text: "Rückfluss = Einsparung minus laufende Kosten", kw: "einspar|laufend|abzüglich|minus" },
      { text: "Je kürzer, desto geringer das Risiko", kw: "kürzer|risiko|schneller" }
    ],
    gaps: ["Typische Lücke: Laufende Kosten werden beim Rückfluss vergessen.", "Hinweis: Die statische Rechnung berücksichtigt keine Zinsen."],
    model: "Die Amortisationsdauer sagt, wie lange es dauert, bis sich eine Anschaffung bezahlt gemacht hat. Kauft eine Firma Software für 24.000 € und spart dadurch nach Abzug der laufenden Kosten 2.000 € pro Monat, ist das Geld nach 12 Monaten wieder drin. Wie bei einer Solaranlage auf dem Dach: Irgendwann haben die gesparten Stromkosten den Kaufpreis ausgeglichen. Je kürzer diese Zeit, desto sicherer ist die Investition."
  },
  {
    id: "fey-kapitalwert",
    term: "Kapitalwert",
    part: "GA1",
    topic: "ga1-wirtschaftlichkeit",
    prompt: "Erkläre einem Laien, was der Kapitalwert einer Investition ist.",
    keypoints: [
      { text: "Dynamisches Verfahren: berücksichtigt den Zeitwert des Geldes", kw: "zeitwert|dynamisch|später|heute" },
      { text: "Zukünftige Rückflüsse werden mit einem Zinssatz abgezinst", kw: "abzins|diskont|zinssatz|kalkulationszins|zins" },
      { text: "Summe der abgezinsten Rückflüsse minus Anfangsinvestition", kw: "minus|abzüglich|investition|summe" },
      { text: "Kapitalwert > 0 → Investition lohnt sich", kw: "positiv|größer|lohnt|vorteilhaft|> 0" }
    ],
    gaps: ["Hinweis: Anders als die statische Amortisation berücksichtigt der Kapitalwert Zinsen.", "Typische Lücke: Es fehlt die Entscheidungsregel (positiv = lohnend)."],
    model: "Ein Euro heute ist mehr wert als ein Euro in fünf Jahren, weil man ihn heute schon anlegen und verzinsen könnte. Der Kapitalwert rechnet deshalb alle künftigen Einnahmen einer Investition mit einem Zinssatz auf ihren heutigen Wert herunter (Abzinsung) und zieht davon die Anschaffungskosten ab. Ist das Ergebnis positiv, bringt die Investition mehr als die Alternative, das Geld einfach zum Zinssatz anzulegen. Ist es negativ, lässt man es besser."
  },
  {
    id: "fey-tco",
    term: "Total Cost of Ownership (TCO)",
    part: "GA1",
    topic: "ga1-wirtschaftlichkeit",
    prompt: "Erkläre einem Laien, was die TCO sind und warum der Kaufpreis allein nicht reicht.",
    keypoints: [
      { text: "Alle Kosten über den gesamten Lebenszyklus", kw: "lebenszyklus|gesamte|nutzungsdauer|alle kosten|jahre" },
      { text: "Direkte Kosten: Anschaffung, Lizenzen, Hardware", kw: "anschaff|kauf|lizenz|hardware" },
      { text: "Indirekte/laufende Kosten: Wartung, Schulung, Administration, Ausfälle", kw: "wartung|schulung|administr|ausfall|laufend" },
      { text: "Vergleich nur über denselben Zeitraum sinnvoll", kw: "zeitraum|gleich|vergleich" }
    ],
    gaps: ["Typische Lücke: Nur Anschaffungskosten genannt.", "Hinweis: Alternativen immer über denselben Zeitraum vergleichen."],
    model: "TCO heißt Gesamtkosten des Besitzes. Beim Autokauf zählt nicht nur der Kaufpreis, sondern auch Sprit, Versicherung, Werkstatt und Wertverlust über die Jahre. Bei Software ist es genauso: Neben Lizenz und Hardware kosten Wartung, Schulung, Administration und Ausfallzeiten Geld. Ein billiges Produkt kann so über fünf Jahre teurer sein als ein teures. Deshalb vergleicht man Alternativen über denselben Zeitraum mit allen Kosten."
  },
  /* ---------- Qualität ---------- */
  {
    id: "fey-black-box-test",
    term: "Black-Box-Test vs. White-Box-Test",
    part: "GA1",
    topic: "ga1-qualitaet",
    prompt: "Erkläre einem Laien den Unterschied zwischen Black-Box- und White-Box-Test.",
    keypoints: [
      { text: "Black-Box: Testfälle aus der Spezifikation, Code unbekannt", kw: "spezifikation|anforderung|ohne code|von außen|unbekannt" },
      { text: "Geprüft wird nur Eingabe und erwartete Ausgabe", kw: "eingabe|ausgabe|ergebnis" },
      { text: "Methoden: Äquivalenzklassen, Grenzwertanalyse, Entscheidungstabelle", kw: "äquivalenz|grenzwert|entscheidungstabelle" },
      { text: "White-Box: Code bekannt, Überdeckung von Anweisungen/Zweigen", kw: "überdeckung|zweig|anweisung|quellcode|innen" }
    ],
    gaps: ["Hinweis: Mindestens eine konkrete Methode je Verfahren nennen.", "Typische Lücke: Black-Box heißt nicht „ohne Plan testen“."],
    model: "Beim Black-Box-Test behandelt man die Software wie eine verschlossene Kiste: Man kennt nur die Beschreibung, was sie tun soll, gibt etwas hinein und prüft, ob das Richtige herauskommt. Testfälle entstehen zum Beispiel über Äquivalenzklassen und Grenzwerte. Beim White-Box-Test schaut man in die Kiste hinein und sorgt dafür, dass jede Codezeile oder jeder Zweig mindestens einmal durchlaufen wird. Wie beim Auto: Probefahrt (Black-Box) gegenüber Blick unter die Motorhaube (White-Box)."
  },
  {
    id: "fey-grenzwertanalyse",
    term: "Äquivalenzklassen und Grenzwertanalyse",
    part: "GA1",
    topic: "ga1-qualitaet",
    prompt: "Erkläre einem Laien, wie man mit Äquivalenzklassen und Grenzwerten Testfälle findet.",
    keypoints: [
      { text: "Eingaben in Klassen einteilen, die gleich behandelt werden", kw: "klasse|gruppe|gleich behandelt|bereich" },
      { text: "Gültige und ungültige Klassen bilden", kw: "gültig|ungültig" },
      { text: "Je Klasse ein Repräsentant reicht", kw: "repräsentant|stellvertret|ein wert|beispielwert" },
      { text: "Grenzwerte und direkte Nachbarn testen, weil dort Fehler häufig sind", kw: "grenz|rand|neben|nachbar" }
    ],
    gaps: ["Typische Lücke: Nur Werte innerhalb der Grenze getestet.", "Hinweis: Auch ungültige Klassen brauchen Testfälle."],
    model: "Man kann nicht jede mögliche Eingabe testen. Deshalb fasst man Eingaben zu Gruppen zusammen, die das Programm gleich behandeln sollte – etwa beim Alter für einen Jugendtarif: unter 18 ungültig, 18 bis 24 gültig, über 24 normaler Tarif. Aus jeder Gruppe testet man einen Stellvertreter. Zusätzlich prüft man genau die Ränder, also 17, 18, 24 und 25, weil Programmierer dort oft „kleiner“ und „kleiner gleich“ verwechseln."
  },
  {
    id: "fey-regressionstest",
    term: "Regressionstest",
    part: "GA1",
    topic: "ga1-qualitaet",
    prompt: "Erkläre einem Laien, was ein Regressionstest ist und warum man ihn braucht.",
    keypoints: [
      { text: "Wiederholung bestehender Tests nach einer Änderung", kw: "wiederhol|erneut|nochmal" },
      { text: "Ziel: Prüfen, dass Bestehendes nicht kaputtgegangen ist", kw: "kaputt|nebenwirkung|bestehend|weiterhin|funktioniert noch" },
      { text: "Anlass: Bugfix, neue Funktion, Update", kw: "änderung|bugfix|update|neue funktion" },
      { text: "Sinnvoll automatisiert, z. B. in der CI-Pipeline", kw: "automat|pipeline|ci" }
    ],
    gaps: ["Hinweis: Es geht nicht um die neue Funktion, sondern um die alten.", "Hinweis: Ohne Automatisierung ist das zu aufwendig."],
    model: "Wenn man an einer Software etwas ändert, kann dabei unbemerkt etwas anderes kaputtgehen – wie wenn ein Handwerker die Küche repariert und danach im Bad kein Wasser mehr läuft. Beim Regressionstest führt man deshalb nach jeder Änderung die bereits vorhandenen Tests erneut aus. So merkt man sofort, ob alte Funktionen noch gehen. Weil das oft passiert, lässt man diese Tests automatisch laufen, zum Beispiel bei jedem Hochladen von Code."
  },
  /* ---------- Ergonomie ---------- */
  {
    id: "fey-barrierefreiheit",
    term: "Barrierefreiheit",
    part: "GA1",
    topic: "ga1-ergonomie",
    prompt: "Erkläre einem Laien, was barrierefreie Software bedeutet.",
    keypoints: [
      { text: "Nutzbar für alle, auch Menschen mit Einschränkungen", kw: "einschränk|behinder|blind|sehschwäch|alle menschen" },
      { text: "WCAG-Prinzipien: wahrnehmbar, bedienbar, verständlich, robust", kw: "wcag|wahrnehmbar|bedienbar|verständlich|robust" },
      { text: "Maßnahmen: Alternativtexte, Tastaturbedienung, Kontrast, Labels", kw: "alternativtext|alt-text|tastatur|kontrast|label|screenreader" },
      { text: "Information nicht nur über Farbe vermitteln", kw: "farbe" },
      { text: "Gesetzlich gefordert: BITV (öffentlich), BFSG (privat)", kw: "bitv|bfsg|gesetz|pflicht" }
    ],
    gaps: ["Hinweis: Barrierefreiheit hilft nicht nur Blinden, sondern z. B. auch älteren Menschen oder bei Sonnenlicht.", "Typische Lücke: Gesetzliche Grundlage (BITV/BFSG) fehlt."],
    model: "Barrierefreie Software kann von allen Menschen benutzt werden – auch von Menschen, die schlecht sehen, nicht hören oder keine Maus bedienen können. Dazu bekommen Bilder Beschreibungstexte für Vorleseprogramme, alles ist mit der Tastatur erreichbar, Texte haben genug Kontrast, und Fehler werden nicht nur rot markiert, sondern auch beschrieben. Das ist wie eine Rampe neben der Treppe: Sie hilft Rollstuhlfahrern, aber auch Menschen mit Kinderwagen. Behörden (BITV) und seit 2025 viele Unternehmen (BFSG) sind gesetzlich dazu verpflichtet."
  },
  {
    id: "fey-gebrauchstauglichkeit",
    term: "Gebrauchstauglichkeit (Usability)",
    part: "GA1",
    topic: "ga1-ergonomie",
    prompt: "Erkläre einem Laien, was Gebrauchstauglichkeit nach ISO 9241-11 bedeutet.",
    keypoints: [
      { text: "Effektivität: Ziel wird vollständig und genau erreicht", kw: "effektiv|ziel erreich|erfolgsquote" },
      { text: "Effizienz: mit angemessenem Aufwand (Zeit, Klicks)", kw: "effizien|aufwand|zeit|klick" },
      { text: "Zufriedenstellung: positive Nutzererfahrung", kw: "zufrieden|angenehm|sus|gefühl" },
      { text: "Bezogen auf bestimmte Nutzer, Ziele und Nutzungskontext", kw: "kontext|zielgruppe|bestimmte nutzer|situation" },
      { text: "Messung im Usability-Test mit echten Nutzern", kw: "usability-test|test|messen|testperson" }
    ],
    gaps: ["Typische Lücke: Effektivität und Effizienz verwechselt.", "Hinweis: Usability hängt immer vom Nutzungskontext ab."],
    model: "Gebrauchstauglichkeit beschreibt, wie gut bestimmte Menschen mit einer Software ihre Aufgaben erledigen können. Erstens effektiv: Schaffen sie ihr Ziel überhaupt richtig? Zweitens effizient: Wie viel Zeit und Mühe kostet es? Drittens zufriedenstellend: Fühlen sie sich dabei wohl? Ein Fahrkartenautomat ist gebrauchstauglich, wenn Reisende schnell das richtige Ticket bekommen, ohne sich zu ärgern. Messen kann man das, indem echte Nutzer Aufgaben lösen und man Erfolgsquote, Zeit und Zufriedenheit erfasst."
  },
  /* ---------- UML ---------- */
  {
    id: "fey-komposition-aggregation",
    term: "Aggregation vs. Komposition",
    part: "GA1",
    topic: "ga1-uml",
    prompt: "Erkläre einem Laien den Unterschied zwischen Aggregation und Komposition im Klassendiagramm.",
    keypoints: [
      { text: "Beide beschreiben eine Teil-Ganzes-Beziehung", kw: "teil|ganze|besteht aus" },
      { text: "Aggregation: Teile können ohne das Ganze existieren", kw: "ohne|unabhängig|weiter existier|eigenständig" },
      { text: "Komposition: Teile sind existenzabhängig, sterben mit dem Ganzen", kw: "existenzabhängig|abhängig|mitgelöscht|gelöscht|nicht ohne" },
      { text: "Notation: hohle Raute (Aggregation), gefüllte Raute (Komposition) am Ganzen", kw: "raute" }
    ],
    gaps: ["Typische Lücke: Raute auf die Seite des Teils gesetzt.", "Hinweis: Ein Beispiel pro Beziehung macht den Unterschied klar."],
    model: "Beide Beziehungen sagen: Etwas besteht aus Teilen. Bei der Aggregation können die Teile auch allein weiterleben – löst sich eine Fußballmannschaft auf, gibt es die Spieler trotzdem noch. Bei der Komposition hängen die Teile vom Ganzen ab: Wird eine Rechnung gelöscht, verschwinden auch ihre Rechnungspositionen. Im Diagramm zeichnet man am Ganzen eine Raute – hohl für Aggregation, gefüllt für Komposition."
  },
  {
    id: "fey-use-case-diagramm",
    term: "Use-Case-Diagramm («include»/«extend»)",
    part: "GA1",
    topic: "ga1-uml",
    prompt: "Erkläre einem Laien, was ein Use-Case-Diagramm zeigt und was «include» und «extend» bedeuten.",
    keypoints: [
      { text: "Zeigt, wer (Akteure) was (Anwendungsfälle) mit dem System macht", kw: "akteur|anwendungsfall|use case|wer" },
      { text: "Akteure stehen außerhalb der Systemgrenze", kw: "außerhalb|systemgrenze|rechteck" },
      { text: "«include»: Teilablauf wird immer ausgeführt", kw: "include|immer" },
      { text: "«extend»: Teilablauf wird nur optional/bedingt ausgeführt", kw: "extend|optional|bedingt|manchmal" }
    ],
    gaps: ["Typische Lücke: Pfeilrichtung von include/extend vertauscht.", "Hinweis: Akteure sind Rollen, keine konkreten Personen."],
    model: "Ein Use-Case-Diagramm ist eine Übersicht, wer mit einem System was erledigen kann. Die Strichmännchen sind Rollen, etwa „Kunde“, und stehen außerhalb eines Rechtecks, das das System darstellt. Darin stehen als Ovale die Anwendungsfälle, etwa „Bestellung aufgeben“. «include» heißt, ein Teilschritt gehört immer dazu, zum Beispiel „Anmelden“. «extend» heißt, er kommt nur manchmal dazu, etwa „Gutschein einlösen“."
  },
  /* ---------- Architektur ---------- */
  {
    id: "fey-mvc",
    term: "MVC (Model-View-Controller)",
    part: "GA1",
    topic: "ga1-architektur",
    prompt: "Erkläre einem Laien das Architekturmuster MVC.",
    keypoints: [
      { text: "Model: Daten und Fachlogik", kw: "model|daten|fachlogik|logik" },
      { text: "View: Darstellung für den Benutzer", kw: "view|darstell|anzeige|oberfläche" },
      { text: "Controller: nimmt Eingaben an und steuert Model und View", kw: "controller|eingabe|steuer|vermittel" },
      { text: "Trennung der Zuständigkeiten → Wartbarkeit, Austauschbarkeit, Testbarkeit", kw: "trenn|austausch|wartbar|testbar|unabhängig" }
    ],
    gaps: ["Hinweis: Das Model kennt die Darstellung nicht.", "Typische Lücke: Der Vorteil der Trennung wird nicht genannt."],
    model: "MVC teilt eine Anwendung in drei Rollen auf, ähnlich wie in einem Restaurant. Das Model ist die Küche: Dort liegen die Daten und die eigentliche Logik. Die View ist der Teller, den der Gast sieht – die Darstellung. Der Controller ist der Kellner: Er nimmt die Bestellung (Eingabe) entgegen, gibt sie an die Küche und bringt das Ergebnis zur Anzeige. Weil die Teile getrennt sind, kann man zum Beispiel die Oberfläche austauschen, ohne die Logik anzufassen."
  },
  {
    id: "fey-rest",
    term: "REST-API",
    part: "GA1",
    topic: "ga1-architektur",
    prompt: "Erkläre einem Laien, was eine REST-Schnittstelle ist.",
    keypoints: [
      { text: "Architekturstil für Schnittstellen über HTTP", kw: "http|schnittstelle|api|web" },
      { text: "Ressourcen werden über eindeutige URIs adressiert", kw: "ressource|uri|url|adresse" },
      { text: "HTTP-Methoden: GET lesen, POST anlegen, PUT ersetzen, DELETE löschen", kw: "get|post|put|delete" },
      { text: "Zustandslos: jede Anfrage enthält alle nötigen Infos", kw: "zustandslos|stateless|alle informationen|merkt sich nichts" },
      { text: "Datenformat meist JSON, Statuscodes als Rückmeldung", kw: "json|statuscode|200|404" }
    ],
    gaps: ["Typische Lücke: Zustandslosigkeit wird nicht erwähnt.", "Hinweis: REST ist ein Architekturstil, kein Protokoll wie SOAP."],
    model: "Eine REST-Schnittstelle ist eine Art, wie Programme über das Web miteinander reden. Jedes Ding, etwa ein Kunde, hat eine eigene Adresse wie /kunden/42. Mit wenigen Standardbefehlen sagt man, was passieren soll: GET zum Lesen, POST zum Anlegen, PUT zum Ändern, DELETE zum Löschen. Der Server merkt sich zwischen zwei Anfragen nichts, jede Anfrage bringt alles Nötige mit – wie ein Brief mit vollständiger Adresse. Die Antwort kommt meist als JSON mit einem Statuscode wie 200 (ok) oder 404 (nicht gefunden)."
  },
  {
    id: "fey-kohaesion-kopplung",
    term: "Hohe Kohäsion, lose Kopplung",
    part: "GA1",
    topic: "ga1-architektur",
    prompt: "Erkläre einem Laien, warum Software hohe Kohäsion und lose Kopplung anstrebt.",
    keypoints: [
      { text: "Kohäsion: Ein Baustein erfüllt eine klar abgegrenzte Aufgabe", kw: "kohäsion|eine aufgabe|zusammengehör|zuständig" },
      { text: "Kopplung: Grad der Abhängigkeit zwischen Bausteinen", kw: "kopplung|abhängig" },
      { text: "Lose Kopplung: Änderungen wirken sich kaum auf andere Teile aus", kw: "lose|austausch|ändern|unabhängig" },
      { text: "Ziel: Wartbarkeit, Testbarkeit, Wiederverwendbarkeit", kw: "wartbar|testbar|wiederverwend|pflegbar" },
      { text: "Mittel: Schnittstellen, Schichten, Dependency Injection", kw: "schnittstelle|interface|schicht|injection" }
    ],
    gaps: ["Typische Lücke: Kohäsion und Kopplung verwechselt – hohe Kohäsion ist gut, hohe Kopplung schlecht.", "Hinweis: Ein konkretes Mittel (Interface, DI) nennen."],
    model: "Hohe Kohäsion heißt: Jeder Baustein einer Software kümmert sich um genau eine Sache, wie in einer Werkstatt jedes Werkzeug seinen festen Zweck hat. Lose Kopplung heißt: Die Bausteine hängen möglichst wenig voneinander ab und reden nur über klar festgelegte Schnittstellen miteinander. Wie bei Steckdose und Stecker kann man dann ein Gerät tauschen, ohne die Hausverkabelung zu ändern. So lässt sich Software leichter ändern, testen und wiederverwenden."
  },
  {
    id: "fey-dependency-injection",
    term: "Dependency Injection",
    part: "GA1",
    topic: "ga1-architektur",
    prompt: "Erkläre einem Laien, was Dependency Injection ist.",
    keypoints: [
      { text: "Abhängigkeiten werden von außen übergeben statt selbst erzeugt", kw: "von außen|übergeben|übergibt|reingegeben|injiz" },
      { text: "Meist über Konstruktor oder Setter", kw: "konstruktor|setter" },
      { text: "Führt zu loser Kopplung", kw: "lose|kopplung|austauschbar|unabhängig" },
      { text: "Bessere Testbarkeit durch Mocks", kw: "test|mock|attrappe" }
    ],
    gaps: ["Hinweis: Der Kern ist „nicht selbst mit new erzeugen“.", "Typische Lücke: Der Nutzen für Tests fehlt."],
    model: "Bei Dependency Injection besorgt sich ein Programmteil seine Helfer nicht selbst, sondern bekommt sie von außen gereicht, meist beim Erzeugen über den Konstruktor. Vergleichbar mit einer Bohrmaschine, in die man verschiedene Bohrer einsetzen kann, statt dass der Bohrer fest eingebaut ist. Dadurch ist der Teil nur lose an seine Helfer gebunden. Im Test kann man ihm einfach eine Attrappe (Mock) geben, zum Beispiel eine Fake-Datenbank."
  },
  /* ---------- Datenmodell ---------- */
  {
    id: "fey-normalisierung",
    term: "Normalisierung",
    part: "GA1",
    topic: "ga1-datenmodell",
    prompt: "Erkläre einem Laien, was Normalisierung ist und wozu man sie braucht.",
    keypoints: [
      { text: "Ziel: Redundanzen (doppelt gespeicherte Daten) vermeiden", kw: "redundan|doppelt|mehrfach" },
      { text: "Vermeidet Anomalien beim Einfügen, Ändern, Löschen", kw: "anomalie|inkonsisten|widerspr" },
      { text: "Daten werden auf mehrere Tabellen verteilt und über Schlüssel verknüpft", kw: "tabelle|aufteil|schlüssel|verknüpf" },
      { text: "1. NF: atomare Werte", kw: "atomar|1. nf|erste normalform|unteilbar" },
      { text: "2./3. NF: keine partiellen bzw. transitiven Abhängigkeiten", kw: "transitiv|partiell|abhängig|3. nf|2. nf" }
    ],
    gaps: ["Hinweis: Nicht nur Regeln aufzählen, sondern den Zweck (Anomalien vermeiden) nennen.", "Typische Lücke: Denormalisierung als Gegenbegriff (Performance) unbekannt."],
    model: "Normalisierung ist ein Aufräumverfahren für Datenbanktabellen. Steht zum Beispiel die Adresse eines Kunden in jeder seiner Bestellungen, muss man sie bei einem Umzug an vielen Stellen ändern – vergisst man eine, widersprechen sich die Daten. Deshalb verteilt man die Daten so auf mehrere Tabellen, dass jede Information nur einmal steht, und verknüpft sie über Schlüssel. Die Normalformen sind die Stufen dieses Aufräumens: erst unteilbare Werte, dann keine Abhängigkeiten von nur einem Teil des Schlüssels oder von anderen Nicht-Schlüsselfeldern."
  },
  {
    id: "fey-referentielle-integritaet",
    term: "Referentielle Integrität",
    part: "GA1",
    topic: "ga1-datenmodell",
    prompt: "Erkläre einem Laien, was referentielle Integrität in einer Datenbank sichert.",
    keypoints: [
      { text: "Fremdschlüssel muss auf einen existierenden Datensatz verweisen", kw: "fremdschlüssel|verweis|existier" },
      { text: "Kein Verweis ins Leere (keine verwaisten Datensätze)", kw: "leere|verwaist|ins nichts|nicht existier" },
      { text: "Einfügen mit ungültigem Verweis wird abgelehnt", kw: "einfüg|abgelehnt|verhindert|nicht erlaubt" },
      { text: "Beim Löschen: RESTRICT, CASCADE oder SET NULL", kw: "restrict|cascade|set null|lösch" }
    ],
    gaps: ["Hinweis: Auch das Verhalten beim Löschen des referenzierten Datensatzes erklären.", "Typische Lücke: Verwechslung mit Entitätsintegrität (Primärschlüssel eindeutig)."],
    model: "In einer Datenbank verweisen Tabellen aufeinander, zum Beispiel jede Bestellung auf einen Kunden. Referentielle Integrität bedeutet, dass solche Verweise immer stimmen: Eine Bestellung für Kunde 99 darf es nur geben, wenn Kunde 99 existiert. Will man einen Kunden löschen, der noch Bestellungen hat, verhindert die Datenbank das oder löscht die Bestellungen gleich mit – je nach Einstellung. So gibt es keine Verweise ins Leere, ähnlich wie ein Telefonbuch keine Nummern von Anschlüssen enthalten sollte, die es nicht gibt."
  },
  /* ---------- Sicherheit ---------- */
  {
    id: "fey-asymmetrische-verschluesselung",
    term: "Asymmetrische Verschlüsselung",
    part: "GA1",
    topic: "ga1-sicherheit",
    prompt: "Erkläre einem Laien, wie asymmetrische Verschlüsselung funktioniert.",
    keypoints: [
      { text: "Schlüsselpaar aus öffentlichem und privatem Schlüssel", kw: "schlüsselpaar|öffentlich|privat|public|private" },
      { text: "Verschlüsseln mit dem öffentlichen Schlüssel des Empfängers", kw: "empfänger|öffentlichen schlüssel" },
      { text: "Entschlüsseln nur mit dem privaten Schlüssel des Empfängers", kw: "entschlüssel|nur der empfänger|geheim" },
      { text: "Löst das Schlüsselaustauschproblem, ist aber langsam", kw: "austausch|langsam|verteilen" },
      { text: "Praxis: hybrid – symmetrischer Sitzungsschlüssel wird asymmetrisch übertragen", kw: "hybrid|sitzungsschlüssel|symmetrisch|tls" }
    ],
    gaps: ["Typische Lücke: Mit dem eigenen privaten Schlüssel „verschlüsseln“ – das ist Signieren, nicht Verschlüsseln.", "Hinweis: Nachteil Geschwindigkeit und deshalb hybride Verfahren erwähnen."],
    model: "Bei asymmetrischer Verschlüsselung hat jede Person zwei Schlüssel: einen öffentlichen, den jeder kennen darf, und einen privaten, den nur sie hat. Das ist wie ein Briefkasten: Jeder kann mit dem öffentlichen Schlüssel einen Brief einwerfen, also verschlüsseln, aber nur der Besitzer kann mit seinem privaten Schlüssel den Kasten öffnen. So muss man vorher kein Geheimnis austauschen. Weil das Verfahren langsam ist, nutzt man es in der Praxis meist nur, um einen schnellen symmetrischen Schlüssel sicher zu übertragen (hybride Verschlüsselung, z. B. bei HTTPS)."
  },
  {
    id: "fey-hashing-salt",
    term: "Passwort-Hashing mit Salt",
    part: "GA1",
    topic: "ga1-sicherheit",
    prompt: "Erkläre einem Laien, wie Passwörter sicher gespeichert werden.",
    keypoints: [
      { text: "Passwort nie im Klartext, sondern als Hash speichern", kw: "klartext|hash" },
      { text: "Hash ist eine Einwegfunktion – nicht zurückrechenbar", kw: "einweg|nicht zurück|umkehr|nicht entschlüssel" },
      { text: "Salt: zufälliger Wert je Nutzer, verhindert Rainbow-Table-Angriffe", kw: "salt|zufällig|rainbow" },
      { text: "Langsame Verfahren wie bcrypt oder Argon2 bremsen Brute Force", kw: "bcrypt|argon|langsam|brute" },
      { text: "Login: eingegebenes Passwort erneut hashen und vergleichen", kw: "vergleich|erneut|login|anmeld" }
    ],
    gaps: ["Typische Lücke: Hashing mit Verschlüsselung verwechselt.", "Hinweis: Erklären, warum gleiche Passwörter mit Salt verschiedene Hashes ergeben."],
    model: "Ein Passwort wird nie direkt gespeichert, sondern nur sein Hash – eine Art Fingerabdruck, aus dem man das Passwort nicht zurückrechnen kann. Beim Login wird das eingegebene Passwort genauso umgerechnet und der Fingerabdruck verglichen. Damit Angreifer keine fertigen Tabellen mit Fingerabdrücken häufiger Passwörter nutzen können, wird vorher ein zufälliger Zusatz, der Salt, angehängt – so sehen selbst gleiche Passwörter unterschiedlich aus. Bewusst langsame Verfahren wie bcrypt oder Argon2 machen massenhaftes Ausprobieren zusätzlich teuer."
  },
  {
    id: "fey-digitale-signatur",
    term: "Digitale Signatur",
    part: "GA1",
    topic: "ga1-sicherheit",
    prompt: "Erkläre einem Laien, wie eine digitale Signatur funktioniert und was sie beweist.",
    keypoints: [
      { text: "Hashwert des Dokuments wird gebildet", kw: "hash|fingerabdruck|prüfsumme" },
      { text: "Hash wird mit dem privaten Schlüssel des Absenders signiert", kw: "privat|absender" },
      { text: "Empfänger prüft mit dem öffentlichen Schlüssel des Absenders", kw: "öffentlich|prüf" },
      { text: "Sichert Integrität, Authentizität und Nichtabstreitbarkeit", kw: "integrität|authentizität|echtheit|unverändert|abstreit" }
    ],
    gaps: ["Hinweis: Eine Signatur macht das Dokument nicht geheim – sie verschlüsselt den Inhalt nicht.", "Typische Lücke: Rollen der Schlüssel vertauscht."],
    model: "Eine digitale Signatur ist wie ein fälschungssicheres Siegel. Der Absender berechnet aus dem Dokument einen Fingerabdruck (Hash) und versiegelt ihn mit seinem privaten Schlüssel, den nur er besitzt. Der Empfänger öffnet das Siegel mit dem öffentlichen Schlüssel des Absenders und vergleicht den Fingerabdruck mit dem selbst berechneten. Stimmen beide überein, weiß er: Das Dokument stammt wirklich vom Absender und wurde unterwegs nicht verändert. Der Inhalt selbst bleibt dabei lesbar."
  },
  {
    id: "fey-sql-injection",
    term: "SQL-Injection",
    part: "GA1",
    topic: "ga1-sicherheit",
    prompt: "Erkläre einem Laien, was SQL-Injection ist und wie man sich schützt.",
    keypoints: [
      { text: "Benutzereingaben werden ungeprüft in SQL-Befehle eingebaut", kw: "eingabe|ungeprüft|zusammengesetzt|verkettet|string" },
      { text: "Angreifer schleust eigene SQL-Befehle ein", kw: "einschleus|eigene befehle|manipul|' or" },
      { text: "Folgen: Daten auslesen, ändern oder löschen, Login umgehen", kw: "auslesen|lösch|umgehen|stehlen|zugriff" },
      { text: "Schutz: Prepared Statements / parametrisierte Abfragen", kw: "prepared|parametri|platzhalter" },
      { text: "Zusätzlich: Eingabevalidierung, minimale DB-Rechte", kw: "validier|whitelist|rechte|least privilege" }
    ],
    gaps: ["Typische Lücke: Nur „Eingaben filtern“ als Schutz – Prepared Statements sind die Hauptmaßnahme.", "Hinweis: Ein kurzes Angriffsbeispiel macht die Erklärung anschaulich."],
    model: "Viele Programme bauen aus dem, was ein Nutzer eintippt, einen Befehl an die Datenbank zusammen. Tippt ein Angreifer statt eines Namens geschickt formulierten Datenbank-Code ein, führt die Datenbank diesen mit aus – etwa um alle Kundendaten auszugeben oder den Login zu umgehen. Das ist, als würde man einem Boten einen Zettel mitgeben und jemand schreibt heimlich „und bring mir den Tresorschlüssel“ dazu. Schutz bieten Prepared Statements: Befehl und Eingabe werden getrennt übergeben, sodass die Eingabe nie als Befehl gilt."
  },
  /* ---------- DevOps ---------- */
  {
    id: "fey-ci-cd",
    term: "CI/CD",
    part: "GA1",
    topic: "ga1-devops",
    prompt: "Erkläre einem Laien, was Continuous Integration und Continuous Delivery/Deployment bedeuten.",
    keypoints: [
      { text: "CI: Änderungen häufig zusammenführen, jeder Push startet Build und Tests automatisch", kw: "häufig|automatisch|build|push" },
      { text: "Fehler werden früh erkannt", kw: "früh|sofort|schnell erkannt" },
      { text: "Continuous Delivery: jederzeit auslieferbar, Freigabe manuell", kw: "auslieferbar|manuell|freigabe|delivery" },
      { text: "Continuous Deployment: automatisch bis in die Produktion", kw: "produktion|deployment|automatisch ausgerollt|live" },
      { text: "Umsetzung über eine Pipeline mit Stufen (Build, Test, Analyse, Deploy)", kw: "pipeline|stufe|jenkins|gitlab|github actions" }
    ],
    gaps: ["Typische Lücke: Delivery und Deployment nicht unterschieden (manuelle vs. automatische Freigabe).", "Hinweis: Den Nutzen (frühe Fehlererkennung, schnelle Releases) nennen."],
    model: "Bei Continuous Integration laden Entwickler ihre Änderungen mehrmals täglich hoch, und jedes Mal baut ein Automat das Programm und lässt alle Tests laufen. So fallen Fehler sofort auf, nicht erst Wochen später. Continuous Delivery geht weiter: Die Software ist danach jederzeit bereit zur Auslieferung, ein Mensch drückt nur noch auf „Freigeben“. Bei Continuous Deployment entfällt auch dieser Knopf – jede erfolgreich getestete Änderung geht automatisch live. Das Ganze läuft als Pipeline ab, wie ein Fließband mit Prüfstationen."
  },
  {
    id: "fey-container",
    term: "Container (Docker)",
    part: "GA1",
    topic: "ga1-devops",
    prompt: "Erkläre einem Laien, was ein Container ist und wie er sich von einer virtuellen Maschine unterscheidet.",
    keypoints: [
      { text: "Verpackt Anwendung mit allen Abhängigkeiten", kw: "abhängigkeit|bibliothek|verpack|alles drin|mitsamt" },
      { text: "Läuft überall gleich (Entwicklung, Test, Produktion)", kw: "überall|gleich|portabel|jede umgebung" },
      { text: "Teilt sich den Kernel des Host-Betriebssystems", kw: "kernel|betriebssystem|host" },
      { text: "Leichter und schneller als eine VM, die ein eigenes Gast-OS hat", kw: "leicht|schnell|sekunden|vm|virtuelle maschine" },
      { text: "Image = Bauplan, Container = laufende Instanz", kw: "image|dockerfile|instanz|bauplan" }
    ],
    gaps: ["Typische Lücke: Container mit VM gleichgesetzt – Container haben kein eigenes Betriebssystem.", "Hinweis: Unterschied Image vs. Container erwähnen."],
    model: "Ein Container ist wie ein Schiffscontainer für Software: Die Anwendung wird mit allem, was sie braucht – Bibliotheken, Einstellungen, Laufzeitumgebung – in ein genormtes Paket gepackt. Dieses Paket läuft dann auf jedem Rechner gleich, egal ob beim Entwickler oder auf dem Server. Anders als eine virtuelle Maschine bringt ein Container kein eigenes Betriebssystem mit, sondern nutzt den Kern des Gastgeber-Systems mit. Deshalb ist er viel kleiner und startet in Sekunden. Der Bauplan heißt Image, der laufende Container ist eine Instanz davon."
  },
  {
    id: "fey-copyleft",
    term: "Open-Source-Lizenzen (Copyleft vs. permissiv)",
    part: "GA1",
    topic: "ga1-devops",
    prompt: "Erkläre einem Laien den Unterschied zwischen einer GPL- und einer MIT-Lizenz.",
    keypoints: [
      { text: "Open Source: Quellcode offen, Nutzung/Änderung/Weitergabe erlaubt", kw: "quellcode|offen|open source" },
      { text: "Copyleft (GPL): abgeleitete, weitergegebene Werke müssen ebenfalls unter GPL stehen", kw: "copyleft|gpl|ebenfalls|gleiche lizenz|ansteck" },
      { text: "Dann muss auch der eigene Quellcode offengelegt werden", kw: "offenleg|quellcode heraus|veröffentlich|zugänglich" },
      { text: "Permissiv (MIT/Apache): fast alles erlaubt, nur Lizenzhinweis behalten", kw: "permissiv|mit-lizenz|mit lizenz|apache|lizenzhinweis" }
    ],
    gaps: ["Hinweis: Die GPL-Pflicht greift bei Weitergabe/Verbreitung, nicht bei rein interner Nutzung.", "Typische Lücke: Open Source mit „kostenlos ohne Bedingungen“ gleichgesetzt."],
    model: "Open-Source-Software darf man ansehen, verändern und weitergeben – aber unter Bedingungen. Bei der GPL gilt das Copyleft-Prinzip: Wer GPL-Code in sein Programm einbaut und dieses weitergibt, muss auch sein eigenes Programm unter der GPL samt Quellcode freigeben. Das ist wie ein Rezept, das man nur nutzen darf, wenn man das eigene Gericht-Rezept ebenfalls teilt. Permissive Lizenzen wie MIT erlauben dagegen fast alles, auch den Einbau in verkaufte, geschlossene Software; man muss nur den Lizenzhinweis beibehalten."
  }
);

/* ---- ga2algo ---- */
// Paket C: Feynman-Modus „Erklär es einem Laien“ für GA2 Algorithmen
AP2.feynman.push(
  // ---- Pseudocode ----
  {
    id: "fey-schreibtischtest",
    term: "Schreibtischtest",
    part: "GA2",
    topic: "ga2-pseudocode",
    prompt: "Erkläre einem Laien, was ein Schreibtischtest ist und warum man ihn macht.",
    keypoints: [
      { text: "Algorithmus wird von Hand ohne Rechner durchgespielt", kw: "hand|papier|ohne rechner|manuell" },
      { text: "Mit konkreten Beispielwerten als Eingabe", kw: "beispiel|konkret|testwert|eingabe" },
      { text: "Variablenwerte werden Schritt für Schritt in einer Tabelle notiert", kw: "tabelle|variable|schritt|trace" },
      { text: "Ziel: Logikfehler früh finden", kw: "fehler|logik|finden|prüf" },
      { text: "Grenzfälle testen (leer, ein Element, negative Werte)", kw: "grenz|leer|sonderfall|negativ" }
    ],
    gaps: ["Oft vergessen: Ein Schreibtischtest beweist nicht die Korrektheit – er prüft nur die gewählten Fälle.", "Grenzfälle wie ein leeres Array werden gern ausgelassen."],
    model: "Beim Schreibtischtest spielst du ein Programm mit Stift und Papier durch, als wärst du selbst der Computer. Du nimmst konkrete Beispielwerte und schreibst in einer Tabelle nach jedem Schritt auf, welchen Wert jede Variable hat. So siehst du, ob am Ende das Richtige herauskommt, und entdeckst Denkfehler, bevor du überhaupt etwas eintippst. Wichtig ist, auch knifflige Fälle wie eine leere Liste auszuprobieren – aber alle Fälle deckt so ein Test nie ab."
  },
  {
    id: "fey-struktogramm",
    term: "Struktogramm vs. Programmablaufplan",
    part: "GA2",
    topic: "ga2-pseudocode",
    prompt: "Erkläre einem Laien, wie sich ein Struktogramm von einem Programmablaufplan unterscheidet.",
    keypoints: [
      { text: "Beide stellen den Ablauf eines Algorithmus grafisch dar", kw: "grafisch|darstell|ablauf|diagramm" },
      { text: "Struktogramm: verschachtelte Rechteckblöcke", kw: "block|rechteck|verschachtel|kasten" },
      { text: "Struktogramm erzwingt strukturierte Programmierung, kein goto", kw: "goto|sprung|struktur" },
      { text: "PAP: Symbole mit Pfeilen (Raute für Verzweigung)", kw: "pfeil|raute|symbol|fluss" },
      { text: "PAP erlaubt beliebige Sprünge, wird schnell unübersichtlich", kw: "unübersicht|spaghetti|beliebig|frei" }
    ],
    gaps: ["Häufig fehlt, dass im Struktogramm jeder Block genau einen Ein- und Ausgang hat.", "Die Normen (DIN 66261 bzw. DIN 66001) werden manchmal verwechselt."],
    model: "Beide Diagramme zeigen, in welcher Reihenfolge ein Programm Dinge tut. Ein Programmablaufplan sieht aus wie ein Flussdiagramm: Kästchen und Rauten werden mit Pfeilen verbunden, und man kann von überall nach überall springen – das wird schnell zum Pfeilsalat. Ein Struktogramm besteht dagegen aus ineinander geschachtelten Rechtecken, wie Kisten in Kisten. Weil jede Kiste nur einen Eingang und einen Ausgang hat, gibt es keine wilden Sprünge, und der Ablauf bleibt sauber strukturiert."
  },
  // ---- Sortieren & Suchen ----
  {
    id: "fey-binaere-suche",
    term: "Binäre Suche",
    part: "GA2",
    topic: "ga2-sortieren-suchen",
    prompt: "Erkläre einem Laien, wie die binäre Suche funktioniert und warum sie so schnell ist.",
    keypoints: [
      { text: "Voraussetzung: Daten sind sortiert", kw: "sortiert|geordnet|reihenfolge" },
      { text: "Vergleich mit dem mittleren Element", kw: "mitte|mittler" },
      { text: "Je nach Ergebnis wird eine Hälfte verworfen", kw: "hälfte|halbier|verwerf|ausschl" },
      { text: "Wiederholen, bis gefunden oder Bereich leer", kw: "wiederhol|bis|leer|gefunden" },
      { text: "Sehr schnell: logarithmisch, 1000 Elemente in ca. 10 Schritten", kw: "log|10 schritt|zehn|schnell" }
    ],
    gaps: ["Die Voraussetzung „sortiert“ wird häufig vergessen.", "Oft fehlt die Abbruchbedingung, wenn das Element nicht vorhanden ist."],
    model: "Stell dir vor, du suchst ein Wort im Wörterbuch. Du schlägst es nicht ab der ersten Seite durch, sondern in der Mitte auf und schaust, ob dein Wort davor oder danach kommt. Die falsche Hälfte ignorierst du ab jetzt komplett und wiederholst das Spiel in der übrigen Hälfte. Das klappt nur, weil das Wörterbuch alphabetisch sortiert ist. Da sich der Suchbereich jedes Mal halbiert, findest du unter 1000 Einträgen jeden in höchstens etwa 10 Schritten."
  },
  {
    id: "fey-bubblesort",
    term: "Bubble Sort",
    part: "GA2",
    topic: "ga2-sortieren-suchen",
    prompt: "Erkläre einem Laien, wie Bubble Sort eine Liste sortiert.",
    keypoints: [
      { text: "Benachbarte Elemente werden verglichen", kw: "benachbar|nachbar|nebeneinander" },
      { text: "Stehen sie falsch herum, werden sie getauscht", kw: "tausch|vertausch" },
      { text: "Größtes Element wandert pro Durchlauf ans Ende", kw: "ende|aufsteig|blase|wandert" },
      { text: "Mehrere Durchläufe, Abbruch wenn nichts mehr getauscht wird", kw: "durchl|abbruch|kein tausch|nichts" },
      { text: "Einfach, aber langsam: quadratische Laufzeit O(n²)", kw: "n²|n^2|quadrat|langsam" }
    ],
    gaps: ["Oft fehlt die Optimierung: Abbruch, sobald ein Durchlauf ohne Tausch bleibt.", "Die Laufzeit O(n²) wird häufig nicht genannt."],
    model: "Bubble Sort geht eine Reihe von links nach rechts durch und vergleicht immer zwei Nachbarn. Steht der größere links, tauschen die beiden die Plätze. So steigt die größte Zahl wie eine Luftblase im Wasser bis ganz nach rechts auf. Das wiederholt man so oft, bis in einem ganzen Durchgang nichts mehr getauscht werden musste. Das ist leicht zu verstehen, aber bei vielen Daten sehr langsam, weil sich der Aufwand bei doppelt so vielen Daten vervierfacht."
  },
  {
    id: "fey-quicksort",
    term: "Quick Sort",
    part: "GA2",
    topic: "ga2-sortieren-suchen",
    prompt: "Erkläre einem Laien, wie Quick Sort funktioniert.",
    keypoints: [
      { text: "Ein Pivotelement (Vergleichswert) wird gewählt", kw: "pivot|vergleichswert|trennelement" },
      { text: "Kleinere Elemente nach links, größere nach rechts (Partitionieren)", kw: "partition|kleiner|links|aufteil" },
      { text: "Beide Teile werden rekursiv genauso sortiert", kw: "rekursiv|teil|wiederhol|gleiche" },
      { text: "Prinzip Teile und herrsche", kw: "teile und herrsche|divide" },
      { text: "Meist O(n log n), im ungünstigsten Fall O(n²)", kw: "n log n|n²|worst|ungünstig" }
    ],
    gaps: ["Der Worst Case O(n²) bei schlechtem Pivot (z. B. vorsortierte Daten) wird oft vergessen.", "Quick Sort ist nicht stabil – das wird häufig verwechselt."],
    model: "Quick Sort ist wie das Aufteilen einer Klasse nach Körpergröße: Du wählst eine Person als Maßstab (das Pivot). Alle Kleineren stellen sich links auf, alle Größeren rechts. Dann wiederholst du dasselbe in jeder der beiden Gruppen, bis jede Gruppe nur noch aus einer Person besteht – dann steht alles in der richtigen Reihenfolge. Meist ist das sehr schnell; erwischt man aber ständig die kleinste oder größte Person als Maßstab, wird es so langsam wie ein einfaches Verfahren."
  },
  {
    id: "fey-stabiles-sortieren",
    term: "Stabiles Sortierverfahren",
    part: "GA2",
    topic: "ga2-sortieren-suchen",
    prompt: "Erkläre einem Laien, was ein stabiles Sortierverfahren ist und wann das wichtig ist.",
    keypoints: [
      { text: "Elemente mit gleichem Schlüssel behalten ihre Reihenfolge", kw: "gleich|reihenfolge|behalten|beibehalt" },
      { text: "Wichtig beim Sortieren nach mehreren Kriterien", kw: "mehrere|mehrfach|kriteri|zweit" },
      { text: "Beispiele stabil: Bubble, Insertion, Merge Sort", kw: "bubble|insertion|merge" },
      { text: "Nicht stabil: Selection Sort, Quick Sort", kw: "selection|quick|nicht stabil|instabil" }
    ],
    gaps: ["Stabil wird oft mit „stürzt nicht ab“ oder „immer gleich schnell“ verwechselt.", "Häufig fehlt ein Anwendungsbeispiel mit zwei Sortierkriterien."],
    model: "Stell dir eine Namensliste vor, die schon alphabetisch sortiert ist. Jetzt sortierst du sie nach Wohnort. Ein stabiles Verfahren sorgt dafür, dass alle Leute aus demselben Ort weiterhin alphabetisch geordnet bleiben – Gleiches wird nicht durcheinandergewürfelt. Ein instabiles Verfahren darf die Reihenfolge unter Gleichen beliebig verändern. Bubble, Insertion und Merge Sort sind stabil, Selection und Quick Sort in der Standardform nicht."
  },
  // ---- Rekursion ----
  {
    id: "fey-rekursion",
    term: "Rekursion",
    part: "GA2",
    topic: "ga2-rekursion",
    prompt: "Erkläre einem Laien, was Rekursion ist.",
    keypoints: [
      { text: "Funktion ruft sich selbst auf", kw: "selbst auf|sich selbst|ruft sich" },
      { text: "Mit einem kleineren Teilproblem", kw: "kleiner|teilproblem|verkleiner|einfacher" },
      { text: "Rekursionsanker/Abbruchbedingung beendet die Kette", kw: "anker|abbruch|ende|basisfall" },
      { text: "Ohne Anker: unendliche Rekursion, Stack Overflow", kw: "overflow|unendlich|stack|absturz" },
      { text: "Jeder Aufruf belegt Speicher auf dem Aufrufstack", kw: "stack|speicher|frame|stapel" }
    ],
    gaps: ["Häufig fehlt der Rekursionsanker in der Erklärung.", "Dass jeder Aufruf Stackspeicher belegt (und es deshalb einen Stack Overflow geben kann), wird oft nicht erwähnt."],
    model: "Rekursion bedeutet, dass eine Aufgabe gelöst wird, indem man dieselbe Aufgabe in kleiner noch einmal löst. Beispiel Matroschka: Um zu zählen, wie viele Puppen ineinanderstecken, öffnest du die äußere und zählst die Puppen in der nächsten – und so weiter. Irgendwann kommt die kleinste Puppe, die sich nicht mehr öffnen lässt: Das ist der Anker, an dem es aufhört. Fehlt so ein Ende, ruft sich die Funktion endlos auf, bis der Speicher für die offenen Aufrufe voll ist und das Programm abstürzt."
  },
  // ---- Datenstrukturen ----
  {
    id: "fey-stack-queue",
    term: "Stack vs. Queue",
    part: "GA2",
    topic: "ga2-datenstrukturen",
    prompt: "Erkläre einem Laien den Unterschied zwischen einem Stack und einer Queue.",
    keypoints: [
      { text: "Stack: LIFO – zuletzt hinein, zuerst heraus", kw: "lifo|last in|zuletzt|oben" },
      { text: "Queue: FIFO – zuerst hinein, zuerst heraus", kw: "fifo|first in|zuerst|warteschlange" },
      { text: "Stack-Operationen push und pop", kw: "push|pop" },
      { text: "Queue-Operationen enqueue (hinten) und dequeue (vorne)", kw: "enqueue|dequeue|hinten|vorne" },
      { text: "Beispiele: Undo/Aufrufstack bzw. Druckerwarteschlange", kw: "undo|drucker|aufrufstack|ticket" }
    ],
    gaps: ["Oft werden LIFO und FIFO vertauscht.", "Es fehlen Praxisbeispiele, wofür man welche Struktur einsetzt."],
    model: "Ein Stack ist wie ein Tellerstapel: Den Teller, den du zuletzt obendrauf gelegt hast, nimmst du als Erstes wieder herunter – „last in, first out“. Eine Queue ist wie die Schlange an der Supermarktkasse: Wer zuerst kommt, wird zuerst bedient, neue Leute stellen sich hinten an – „first in, first out“. Programme nutzen den Stack etwa für die Rückgängig-Funktion, die Queue zum Beispiel für Druckaufträge."
  },
  {
    id: "fey-hashtabelle",
    term: "Hash-Tabelle",
    part: "GA2",
    topic: "ga2-datenstrukturen",
    prompt: "Erkläre einem Laien, wie eine Hash-Tabelle funktioniert und warum sie so schnell ist.",
    keypoints: [
      { text: "Hashfunktion berechnet aus dem Schlüssel den Speicherplatz", kw: "hashfunktion|berechn|index|platz" },
      { text: "Dadurch direkter Zugriff ohne Suchen, im Mittel O(1)", kw: "o(1)|direkt|konstant|ohne such" },
      { text: "Kollision: zwei Schlüssel landen auf demselben Platz", kw: "kollision|gleiche|selben platz" },
      { text: "Lösung durch Verkettung oder Sondieren", kw: "verkett|sondier|liste|nächsten freien" },
      { text: "Einsatz: HashMap, HashSet, schnelle Schlüsselsuche", kw: "hashmap|hashset|map|schlüssel" }
    ],
    gaps: ["Kollisionen und ihre Behandlung werden gern ausgelassen.", "O(1) gilt nur im Mittel – bei vielen Kollisionen wird es langsamer."],
    model: "Stell dir eine Garderobe vor, bei der du nicht deine Jacke suchen musst, weil aus deinem Namen nach einer festen Regel direkt die Hakennummer berechnet wird. Genau das macht die Hashfunktion: Sie rechnet aus dem Schlüssel aus, wo der Wert liegt, deshalb geht das Finden fast sofort. Manchmal ergibt die Regel für zwei Namen denselben Haken – das nennt man Kollision. Dann hängt man entweder mehrere Jacken an einen Haken (Verkettung) oder nimmt den nächsten freien Haken (Sondieren)."
  },
  {
    id: "fey-binaerer-suchbaum",
    term: "Binärer Suchbaum",
    part: "GA2",
    topic: "ga2-datenstrukturen",
    prompt: "Erkläre einem Laien, was ein binärer Suchbaum ist.",
    keypoints: [
      { text: "Jeder Knoten hat höchstens zwei Kinder", kw: "zwei kind|höchstens zwei|zwei nachfolger|links und rechts" },
      { text: "Links stehen kleinere, rechts größere Schlüssel", kw: "kleiner|größer|links|rechts" },
      { text: "Suche: an jedem Knoten links oder rechts abbiegen", kw: "abbieg|entscheid|vergleich|weg" },
      { text: "Balanciert O(log n), entartet zur Liste O(n)", kw: "log|balanc|entart|liste" },
      { text: "Inorder-Durchlauf liefert sortierte Ausgabe", kw: "inorder|sortiert" }
    ],
    gaps: ["Dass ein Baum bei sortiertem Einfügen zur Liste entartet, wird oft übersehen.", "Die Regel „links kleiner, rechts größer“ gilt für den ganzen Teilbaum, nicht nur für die direkten Kinder."],
    model: "Ein binärer Suchbaum ist wie ein Ratespiel „größer oder kleiner?“. Ganz oben steht ein Wert; alles Kleinere wird links davon einsortiert, alles Größere rechts, und an jeder Stelle wiederholt sich diese Regel. Suchst du eine Zahl, entscheidest du an jedem Knoten nur „links oder rechts“ und schließt damit jedes Mal einen großen Teil aus. Wenn man allerdings schon sortierte Werte einfügt, wächst der Baum nur in eine Richtung und wird so langsam wie eine Liste."
  },
  // ---- OOP ----
  {
    id: "fey-klasse-objekt",
    term: "Klasse und Objekt",
    part: "GA2",
    topic: "ga2-oop",
    prompt: "Erkläre einem Laien den Unterschied zwischen einer Klasse und einem Objekt.",
    keypoints: [
      { text: "Klasse ist der Bauplan/die Vorlage", kw: "bauplan|vorlage|schablone|muster" },
      { text: "Objekt ist ein konkretes Exemplar (Instanz)", kw: "instanz|exemplar|konkret" },
      { text: "Klasse legt Attribute (Eigenschaften) fest", kw: "attribut|eigenschaft" },
      { text: "Klasse legt Methoden (Verhalten) fest", kw: "methode|verhalten|fähigkeit" },
      { text: "Objekt wird über den Konstruktor erzeugt und hat eigenen Zustand", kw: "konstruktor|erzeug|zustand|eigene werte" }
    ],
    gaps: ["Häufig fehlt, dass jedes Objekt seine eigenen Attributwerte hat.", "Der Konstruktor als „Erzeuger“ wird oft nicht erwähnt."],
    model: "Eine Klasse ist wie der Bauplan für ein Haus: Er legt fest, dass es Zimmer, Fenster und eine Tür gibt, und was man damit tun kann. Ein Objekt ist ein tatsächlich gebautes Haus nach diesem Plan. Aus einem Plan kannst du viele Häuser bauen, und jedes hat seine eigene Farbe und Adresse. Beim Programmieren entsteht ein Objekt über den Konstruktor, und jedes Objekt speichert seine eigenen Werte."
  },
  {
    id: "fey-kapselung",
    term: "Kapselung",
    part: "GA2",
    topic: "ga2-oop",
    prompt: "Erkläre einem Laien, was Kapselung bedeutet und welche Vorteile sie hat.",
    keypoints: [
      { text: "Attribute sind privat und von außen nicht direkt zugreifbar", kw: "privat|private|verborgen|versteck" },
      { text: "Zugriff nur über Methoden (Getter/Setter)", kw: "getter|setter|methode|schnittstelle" },
      { text: "Setter können Werte prüfen (Validierung)", kw: "prüf|validier|ungültig|kontroll" },
      { text: "Interne Umsetzung kann geändert werden, ohne Nutzer anzupassen", kw: "änder|austausch|intern|unabhängig" }
    ],
    gaps: ["Oft fehlt der eigentliche Nutzen: ungültige Zustände verhindern.", "Getter/Setter ohne Prüfung bringen kaum Schutz – das wird selten erwähnt."],
    model: "Kapselung ist wie bei einem Geldautomaten: Du kommst nicht direkt an das Geldfach, sondern nur über die Tastatur und den Bildschirm. Der Automat prüft, ob deine Eingabe erlaubt ist, bevor er etwas tut. Genauso sind bei einem Objekt die Daten versteckt (privat), und man ändert sie nur über bestimmte Methoden, die ungültige Werte abweisen. Außerdem kann man das Innere später umbauen, ohne dass sich für die Nutzer etwas ändert."
  },
  {
    id: "fey-vererbung",
    term: "Vererbung",
    part: "GA2",
    topic: "ga2-oop",
    prompt: "Erkläre einem Laien, was Vererbung in der objektorientierten Programmierung ist.",
    keypoints: [
      { text: "Unterklasse übernimmt Attribute und Methoden der Oberklasse", kw: "übernimm|erbt|oberklasse|unterklasse" },
      { text: "„Ist-ein“-Beziehung", kw: "ist ein|ist-ein|is-a" },
      { text: "Unterklasse kann erweitern oder Methoden überschreiben", kw: "erweiter|überschreib|ergänz|zusätzlich" },
      { text: "Vorteil: Wiederverwendung, weniger doppelter Code", kw: "wiederverwend|doppelt|redundan|einmal" },
      { text: "In Java nur eine Oberklasse (Einfachvererbung)", kw: "eine oberklasse|einfachvererbung|nur eine" }
    ],
    gaps: ["Die „ist-ein“-Prüfung wird oft vergessen – nicht jede Wiederverwendung rechtfertigt Vererbung.", "Dass der Oberklassenkonstruktor zuerst läuft, wird selten erwähnt."],
    model: "Vererbung heißt: Eine neue Klasse baut auf einer bestehenden auf und bekommt automatisch deren Eigenschaften und Fähigkeiten. Ein PKW ist ein Fahrzeug – also muss man Kennzeichen und Fahren nicht noch einmal programmieren, sondern ergänzt nur das Besondere wie die Anzahl der Sitze. Die Unterklasse kann geerbtes Verhalten auch anpassen, also überschreiben. So schreibt man gemeinsamen Code nur einmal. In Java darf eine Klasse aber nur von einer einzigen Oberklasse erben."
  },
  {
    id: "fey-polymorphie",
    term: "Polymorphie",
    part: "GA2",
    topic: "ga2-oop",
    prompt: "Erkläre einem Laien, was Polymorphie ist und welchen Vorteil sie bringt.",
    keypoints: [
      { text: "Vielgestaltigkeit: gleicher Aufruf, unterschiedliches Verhalten", kw: "vielgestalt|unterschiedlich|verschieden|gleicher aufruf" },
      { text: "Variable vom Typ der Oberklasse/des Interfaces zeigt auf Unterklassenobjekt", kw: "oberklasse|interface|obertyp|unterklasse" },
      { text: "Welche Methode läuft, entscheidet sich zur Laufzeit", kw: "laufzeit|dynamisch|binden" },
      { text: "Grundlage: überschriebene Methoden", kw: "überschreib|override" },
      { text: "Vorteil: neue Klassen ohne Änderung des bestehenden Codes", kw: "erweiter|ohne änder|neue klasse|flexib" }
    ],
    gaps: ["Polymorphie wird oft mit Überladen verwechselt – gemeint ist vor allem Überschreiben mit dynamischem Binden.", "Der praktische Vorteil (Erweiterbarkeit ohne wenn/sonst-Ketten) fehlt häufig."],
    model: "Polymorphie heißt „Vielgestaltigkeit“: Du gibst allen denselben Befehl, und jeder führt ihn auf seine eigene Art aus. Sagst du zu einem Hund, einer Katze und einer Kuh „mach ein Geräusch“, bellt, miaut und muht es – du musst nicht vorher fragen, welches Tier vor dir steht. Im Programm hält eine Variable vom allgemeinen Typ „Tier“ das konkrete Objekt, und erst beim Ausführen wird die passende Methode gewählt. Kommt später ein neues Tier dazu, muss der bestehende Code nicht geändert werden."
  },
  {
    id: "fey-interface-abstrakt",
    term: "Interface vs. abstrakte Klasse",
    part: "GA2",
    topic: "ga2-oop",
    prompt: "Erkläre einem Laien den Unterschied zwischen einem Interface und einer abstrakten Klasse.",
    keypoints: [
      { text: "Von beiden kann man keine Objekte direkt erzeugen", kw: "keine objekt|nicht instanz|nicht erzeug" },
      { text: "Abstrakte Klasse: gemeinsamer Code und Attribute möglich", kw: "attribut|code|konkrete methode|zustand" },
      { text: "Interface: reiner Vertrag, welche Methoden es geben muss", kw: "vertrag|signatur|vorgabe|verpflicht" },
      { text: "Nur eine Oberklasse, aber mehrere Interfaces", kw: "mehrere interface|nur eine|mehrfach" },
      { text: "Abstrakt = „ist ein“, Interface = „kann etwas“", kw: "ist ein|kann|fähigkeit|rolle" }
    ],
    gaps: ["Oft fehlt, dass eine Klasse mehrere Interfaces, aber nur eine Oberklasse haben kann.", "Abstrakte Klassen können Attribute haben – das wird gern unterschlagen."],
    model: "Eine abstrakte Klasse ist wie ein halb fertiger Bauplan: Vieles ist schon vorgegeben, nur einzelne Teile muss jede konkrete Variante selbst ergänzen. Ein Interface ist dagegen nur eine Liste von Pflichten, wie eine Stellenbeschreibung: Wer es implementiert, verspricht, diese Methoden anzubieten – wie, ist seine Sache. Von beiden kann man nichts direkt erzeugen. Eine Klasse kann nur einen einzigen Bauplan als Grundlage haben, aber beliebig viele Stellenbeschreibungen erfüllen."
  },
  {
    id: "fey-ueberladen-ueberschreiben",
    term: "Überladen vs. Überschreiben",
    part: "GA2",
    topic: "ga2-oop",
    prompt: "Erkläre einem Laien den Unterschied zwischen Überladen und Überschreiben von Methoden.",
    keypoints: [
      { text: "Überladen: gleicher Name, andere Parameterliste", kw: "parameter|andere argumente|parameterliste" },
      { text: "Überladen meist in derselben Klasse, Auswahl beim Kompilieren", kw: "selben klasse|kompil|compile" },
      { text: "Überschreiben: Unterklasse ersetzt geerbte Methode mit gleicher Signatur", kw: "unterklasse|geerbt|gleiche signatur|ersetz" },
      { text: "Überschreiben: Auswahl zur Laufzeit (Polymorphie)", kw: "laufzeit|polymorph|dynamisch" }
    ],
    gaps: ["Die beiden Begriffe werden häufig verwechselt.", "Dass beim Überladen der Rückgabetyp allein nicht reicht, wird oft nicht erwähnt."],
    model: "Überladen ist, wenn es mehrere Methoden mit gleichem Namen gibt, die sich nur darin unterscheiden, was man ihnen übergibt – etwa „addiere“ einmal für ganze Zahlen und einmal für Kommazahlen. Der Compiler sucht anhand der Werte die passende aus. Überschreiben ist, wenn eine Unterklasse eine geerbte Methode durch eine eigene Version mit genau derselben Signatur ersetzt. Welche Version läuft, entscheidet sich dann erst beim Ausführen am tatsächlichen Objekt."
  },
  {
    id: "fey-singleton",
    term: "Entwurfsmuster Singleton",
    part: "GA2",
    topic: "ga2-oop",
    prompt: "Erkläre einem Laien, was das Entwurfsmuster Singleton ist.",
    keypoints: [
      { text: "Von einer Klasse gibt es genau ein Objekt", kw: "genau ein|nur ein|einzige" },
      { text: "Privater Konstruktor verhindert weiteres Erzeugen", kw: "privat|private|konstruktor" },
      { text: "Statische Methode (getInstance) liefert die Instanz", kw: "statisch|static|getinstance|instanz" },
      { text: "Globaler Zugriffspunkt, z. B. Konfiguration, Logger, DB-Verbindung", kw: "global|konfig|logger|verbindung" },
      { text: "Nachteile: schwer testbar, versteckte Abhängigkeit, Thread-Sicherheit", kw: "test|abhängig|thread|nachteil" }
    ],
    gaps: ["Oft fehlt, wie das Muster technisch erzwungen wird (privater Konstruktor + statische Methode).", "Nachteile wie schlechte Testbarkeit werden selten genannt."],
    model: "Ein Singleton ist eine Klasse, von der es im ganzen Programm nur ein einziges Objekt geben darf – wie ein Land nur einen Bundespräsidenten hat. Damit niemand ein zweites erzeugt, ist der Konstruktor privat. Stattdessen fragt man über eine statische Methode nach „der“ Instanz und bekommt immer dasselbe Objekt. Das ist praktisch für Dinge wie eine zentrale Konfiguration oder einen Logger, macht Programme aber schwerer testbar, weil alle heimlich vom selben Objekt abhängen."
  },
  {
    id: "fey-observer",
    term: "Entwurfsmuster Observer",
    part: "GA2",
    topic: "ga2-oop",
    prompt: "Erkläre einem Laien, wie das Beobachter-Muster (Observer) funktioniert.",
    keypoints: [
      { text: "Beobachter melden sich bei einem Subjekt an", kw: "anmeld|registrier|abonnier|hinzufüg" },
      { text: "Bei Zustandsänderung benachrichtigt das Subjekt alle Beobachter", kw: "benachrichtig|informier|notify|änder" },
      { text: "Lose Kopplung: Subjekt kennt nur das Observer-Interface", kw: "lose|kopplung|interface|unabhängig" },
      { text: "Beobachter können sich wieder abmelden", kw: "abmeld|entfern" },
      { text: "Beispiel: Event-Listener, Newsletter, GUI-Aktualisierung", kw: "listener|event|newsletter|abo|gui" }
    ],
    gaps: ["Häufig fehlt die lose Kopplung als eigentlicher Vorteil.", "Push vs. Pull (wer die neuen Daten liefert) wird selten erwähnt."],
    model: "Das Observer-Muster funktioniert wie ein Zeitungsabo: Wer sich anmeldet, bekommt automatisch jede neue Ausgabe, ohne ständig am Kiosk nachfragen zu müssen. Im Programm gibt es ein Objekt, das Änderungen hat (das Subjekt), und viele Beobachter, die sich dort registrieren. Ändert sich etwas, ruft das Subjekt bei allen angemeldeten Beobachtern eine Benachrichtigungsmethode auf. Das Subjekt muss dabei nicht wissen, wer genau zuhört – deshalb kann man Beobachter leicht hinzufügen oder abmelden."
  },
  {
    id: "fey-nebenlaeufigkeit",
    term: "Thread und Nebenläufigkeit",
    part: "GA2",
    topic: "ga2-oop",
    prompt: "Erkläre einem Laien, was Threads sind und welche Probleme Nebenläufigkeit mit sich bringt.",
    keypoints: [
      { text: "Thread: eigener Ausführungsstrang innerhalb eines Programms", kw: "ausführungsstrang|strang|faden|parallel" },
      { text: "Mehrere Threads laufen gleichzeitig bzw. abwechselnd", kw: "gleichzeitig|parallel|abwechselnd|nebenläufig" },
      { text: "Threads teilen sich den Speicher des Prozesses", kw: "teilen|gemeinsam|speicher|prozess" },
      { text: "Problem: Race Condition bei gleichzeitigem Zugriff", kw: "race|wettlauf|gleichzeitig zugr|inkonsist" },
      { text: "Lösung: Synchronisation, Sperren (synchronized, Lock)", kw: "synchron|sperr|lock|mutex" }
    ],
    gaps: ["Oft fehlt der Unterschied Thread vs. Prozess (gemeinsamer Speicher).", "Race Conditions und ihre Lösung durch Synchronisation werden häufig ausgelassen."],
    model: "Ein Thread ist wie ein Koch in einer Küche: Ein Programm kann mehrere Köche gleichzeitig arbeiten lassen, damit es schneller geht oder die Oberfläche nicht einfriert, während im Hintergrund gerechnet wird. Alle Köche benutzen aber dieselbe Küche, also denselben Speicher. Greifen zwei gleichzeitig nach derselben Schüssel, kommt Unsinn heraus – das nennt man Race Condition. Deshalb muss man den Zugriff regeln, etwa indem immer nur einer eine Sache benutzen darf (Sperre bzw. Synchronisation)."
  },
  {
    id: "fey-deadlock",
    term: "Deadlock",
    part: "GA2",
    topic: "ga2-oop",
    prompt: "Erkläre einem Laien, was ein Deadlock ist und wie man ihn vermeidet.",
    keypoints: [
      { text: "Zwei oder mehr Threads warten gegenseitig aufeinander", kw: "gegenseitig|aufeinander|warten" },
      { text: "Jeder hält eine Ressource und will die des anderen", kw: "ressource|sperre|hält|belegt" },
      { text: "Folge: Programm hängt dauerhaft", kw: "hängt|blockier|stillstand|ewig" },
      { text: "Vermeidung: Sperren immer in derselben Reihenfolge anfordern", kw: "reihenfolge|gleiche|ordnung" },
      { text: "Weitere Vermeidung: Timeouts, alle Ressourcen auf einmal anfordern", kw: "timeout|auf einmal|zeitlimit" }
    ],
    gaps: ["Oft wird nur „das Programm hängt“ gesagt, ohne das gegenseitige Warten auf Ressourcen zu erklären.", "Gegenmaßnahmen wie eine feste Sperr-Reihenfolge fehlen häufig."],
    model: "Ein Deadlock ist eine Verklemmung: Zwei Autos stehen sich in einer engen Gasse gegenüber, und jedes wartet darauf, dass das andere zurücksetzt – keines bewegt sich je wieder. Im Programm hält Thread A eine Ressource und wartet auf die von Thread B, während B auf die von A wartet. Das Programm hängt dann dauerhaft. Vermeiden kann man das, indem alle Threads Ressourcen immer in derselben Reihenfolge sperren oder nur begrenzt lange warten (Timeout)."
  },
  // ---- Komplexität ----
  {
    id: "fey-o-notation",
    term: "O-Notation",
    part: "GA2",
    topic: "ga2-komplexitaet",
    prompt: "Erkläre einem Laien, was die O-Notation aussagt.",
    keypoints: [
      { text: "Beschreibt das Wachstum der Laufzeit/des Speichers abhängig von der Eingabegröße n", kw: "wachstum|wächst|eingabegröße|abhängig" },
      { text: "Konstanten und kleinere Terme werden weggelassen", kw: "konstant|weggelass|vernachlässig|kleinere term" },
      { text: "Obere Schranke, meist für den ungünstigsten Fall", kw: "obere schranke|worst|ungünstig|schlechtest" },
      { text: "Beispiele: O(1), O(log n), O(n), O(n²)", kw: "o(1)|log n|o(n)|n²" },
      { text: "Nicht absolute Zeit, sondern Vergleichbarkeit von Algorithmen", kw: "nicht sekunden|vergleich|keine zeit|hardware" }
    ],
    gaps: ["Häufige Fehlvorstellung: O-Notation gibt die Laufzeit in Sekunden an.", "Dass Konstanten wegfallen (O(10n) = O(n)), wird oft nicht erklärt."],
    model: "Die O-Notation beantwortet die Frage: Wie viel länger dauert es, wenn die Datenmenge wächst? Sie misst keine Sekunden, sondern beschreibt den Trend. Bei O(n) dauert es bei doppelt so vielen Daten etwa doppelt so lang, bei O(n²) viermal so lang, bei O(log n) kaum länger. Kleinigkeiten wie konstante Faktoren lässt man weg, weil bei sehr großen Datenmengen nur das Wachstum zählt. So kann man Algorithmen unabhängig vom Computer vergleichen."
  },
  // ---- Zahlensysteme ----
  {
    id: "fey-zweierkomplement",
    term: "Zweierkomplement",
    part: "GA2",
    topic: "ga2-zahlensysteme",
    prompt: "Erkläre einem Laien, wie ein Computer mit dem Zweierkomplement negative Zahlen speichert.",
    keypoints: [
      { text: "Darstellung negativer Ganzzahlen im Binärsystem", kw: "negativ|minus|binär" },
      { text: "Bildung: alle Bits invertieren und 1 addieren", kw: "invertier|umkehr|kipp|+1|plus 1|1 addier" },
      { text: "Höchstes Bit zeigt das Vorzeichen", kw: "höchst|vorzeichen|erste bit|linke bit" },
      { text: "Subtraktion wird zur Addition, nur eine Null", kw: "addition|addier|eine null|subtrakt" },
      { text: "Wertebereich asymmetrisch, z. B. 8 Bit: −128 bis 127; Überlauf möglich", kw: "128|127|bereich|überlauf" }
    ],
    gaps: ["Das „+1“ nach dem Invertieren wird oft vergessen.", "Der asymmetrische Wertebereich und der stille Überlauf fehlen häufig."],
    model: "Ein Computer kennt nur Nullen und Einsen, also braucht er einen Trick für Minuszahlen. Beim Zweierkomplement nimmt man die positive Zahl, dreht alle Bits um und zählt eins dazu. Das vorderste Bit zeigt dann an, ob die Zahl negativ ist. Der Vorteil: Der Computer kann Minus-Rechnen wie Plus-Rechnen erledigen. Mit 8 Bit kommt man so von −128 bis 127 – und wer zu 127 eins addiert, landet ohne Warnung bei −128, wie bei einem Kilometerzähler, der überläuft."
  },
  {
    id: "fey-gleitkomma",
    term: "Gleitkommazahlen und Rundungsfehler",
    part: "GA2",
    topic: "ga2-zahlensysteme",
    prompt: "Erkläre einem Laien, warum 0,1 + 0,2 im Computer nicht genau 0,3 ergibt.",
    keypoints: [
      { text: "Gleitkommazahl nach IEEE 754: Vorzeichen, Exponent, Mantisse", kw: "ieee|mantisse|exponent|vorzeichen" },
      { text: "0,1 ist im Binärsystem ein periodischer Bruch", kw: "periodisch|unendlich|binär" },
      { text: "Begrenzte Bits erzwingen Rundung", kw: "rund|begrenzt|ungenau" },
      { text: "Nicht mit == vergleichen, sondern mit Toleranz", kw: "toleranz|epsilon|==|nicht vergleich" },
      { text: "Geldbeträge in Cent als Ganzzahl oder BigDecimal", kw: "cent|bigdecimal|ganzzahl|geld" }
    ],
    gaps: ["Oft wird behauptet, der Computer „rechnet falsch“ – tatsächlich ist die Darstellung begrenzt.", "Die praktische Konsequenz (Geld nicht als double) fehlt häufig."],
    model: "So wie man 1/3 im Dezimalsystem nicht exakt aufschreiben kann (0,3333…), kann der Computer 0,1 im Binärsystem nicht exakt speichern – es wird zu einer unendlich langen Ziffernfolge. Weil nur eine begrenzte Anzahl Stellen zur Verfügung steht, muss gerundet werden. Die kleinen Rundungsfehler von 0,1 und 0,2 addieren sich, sodass nicht genau 0,3 herauskommt. Deshalb vergleicht man Kommazahlen mit einer kleinen Toleranz und speichert Geldbeträge besser als ganze Cent."
  },
  // ---- Exceptions & Formate ----
  {
    id: "fey-exception-handling",
    term: "Exception-Handling",
    part: "GA2",
    topic: "ga2-exceptions-formate",
    prompt: "Erkläre einem Laien, was Exception-Handling ist und wozu es dient.",
    keypoints: [
      { text: "Exception: Ausnahmesituation/Fehler zur Laufzeit", kw: "fehler|ausnahme|laufzeit" },
      { text: "Riskanter Code im try-Block", kw: "try|versuche|riskant" },
      { text: "Fehlerbehandlung im catch-Block, spezielle zuerst", kw: "catch|fange|behandl|abfang" },
      { text: "finally läuft immer, z. B. zum Schließen von Ressourcen", kw: "finally|schließlich|immer|schließ" },
      { text: "Checked müssen behandelt/deklariert werden, unchecked nicht", kw: "checked|throws|deklar|unchecked" }
    ],
    gaps: ["Der finally-Block und sein Zweck (Ressourcen freigeben) fehlen oft.", "Leere catch-Blöcke („Fehler verschlucken“) werden nicht als schlechte Praxis erkannt."],
    model: "Exception-Handling ist wie ein Notfallplan. Man versucht etwas Riskantes, zum Beispiel eine Datei zu öffnen (try). Geht dabei etwas schief, springt das Programm nicht einfach ab, sondern in einen vorbereiteten Plan B, der den Fehler behandelt (catch) – etwa eine verständliche Meldung anzeigt. Egal, ob alles klappt oder nicht, wird am Ende immer aufgeräumt, zum Beispiel die Datei wieder geschlossen (finally). Bei manchen erwartbaren Fehlern zwingt Java den Programmierer sogar, so einen Plan zu haben."
  },
  {
    id: "fey-json-xml",
    term: "JSON vs. XML",
    part: "GA2",
    topic: "ga2-exceptions-formate",
    prompt: "Erkläre einem Laien den Unterschied zwischen JSON und XML.",
    keypoints: [
      { text: "Beides textbasierte Formate zum Datenaustausch", kw: "austausch|text|format|übertrag" },
      { text: "XML: Start- und End-Tags, ausführlicher", kw: "tag|ausführlich|umfangreich|overhead" },
      { text: "JSON: Schlüssel-Wert-Paare, Arrays, kompakter", kw: "schlüssel|kompakt|array|klammer" },
      { text: "XML: wohlgeformt und gültig per DTD/XSD", kw: "wohlgeformt|xsd|dtd|schema|valid" },
      { text: "JSON verbreitet bei REST-APIs und JavaScript", kw: "rest|api|javascript|web" }
    ],
    gaps: ["Der Unterschied zwischen wohlgeformt und gültig wird oft nicht erklärt.", "JSON hat echte Datentypen (Zahl, Boolean, null) – das fehlt häufig."],
    model: "JSON und XML sind beide Arten, Daten als Text aufzuschreiben, damit verschiedene Programme sie austauschen können. XML sieht aus wie HTML: Jeder Wert steht zwischen einem öffnenden und einem schließenden Etikett, das ist gut lesbar, aber ausführlich. JSON ist kompakter und schreibt einfach „Name: Wert“ in geschweiften Klammern, mit Listen in eckigen Klammern – deshalb ist es bei Web-Schnittstellen beliebt. XML kann man dafür sehr streng gegen ein Schema prüfen lassen."
  },
  {
    id: "fey-regex",
    term: "Regulärer Ausdruck",
    part: "GA2",
    topic: "ga2-exceptions-formate",
    prompt: "Erkläre einem Laien, was ein regulärer Ausdruck ist und wofür man ihn nutzt.",
    keypoints: [
      { text: "Muster zur Beschreibung von Zeichenketten", kw: "muster|pattern|zeichenkette|text" },
      { text: "Einsatz: Eingabevalidierung (PLZ, E-Mail) und Suchen", kw: "validier|prüf|plz|mail|such" },
      { text: "Bausteine: Zeichenklassen, Wiederholungen ({n}, +, *)", kw: "klasse|wiederhol|{|quantor|ziffer" },
      { text: "^ und $ verankern Anfang und Ende", kw: "anfang|ende|anker|^" },
      { text: "Prüft nur das Format, nicht die inhaltliche Plausibilität", kw: "nur format|plausib|inhalt|31.02" }
    ],
    gaps: ["Ohne ^ und $ passt der Ausdruck auch auf Teile einer längeren Eingabe – oft übersehen.", "Regex prüft keine Bedeutung (z. B. 31.02. ist formal gültig)."],
    model: "Ein regulärer Ausdruck ist eine Art Schablone für Text. Du beschreibst damit zum Beispiel: „Genau fünf Ziffern, nichts davor und nichts danach“ – das ist eine Postleitzahl. Das Programm hält jede Eingabe an diese Schablone und sagt, ob sie passt. So kann man Formulareingaben prüfen oder in großen Texten nach Mustern suchen. Aber Achtung: Die Schablone prüft nur die Form, nicht ob es den 31. Februar wirklich gibt."
  },
  {
    id: "fey-unit-test",
    term: "Unit-Test mit Äquivalenzklassen und Grenzwerten",
    part: "GA2",
    topic: "ga2-exceptions-formate",
    prompt: "Erkläre einem Laien, was ein Unit-Test ist und wie man sinnvolle Testfälle findet.",
    keypoints: [
      { text: "Unit-Test prüft eine einzelne Funktion isoliert und automatisch", kw: "einzeln|isoliert|automat|funktion" },
      { text: "Aufbau Arrange – Act – Assert, Vergleich erwartet/tatsächlich", kw: "arrange|assert|erwartet|vergleich" },
      { text: "Äquivalenzklassen: Eingaben mit gleichem Verhalten, ein Vertreter je Klasse", kw: "äquivalenz|klasse|vertreter|repräsent" },
      { text: "Grenzwerte: knapp unter, auf und über der Grenze testen", kw: "grenz|knapp|unter|über" },
      { text: "Auch ungültige Eingaben testen", kw: "ungültig|fehler|exception|falsch" }
    ],
    gaps: ["Ungültige Äquivalenzklassen werden oft vergessen.", "Grenzwerte werden nur auf, nicht direkt unter und über der Grenze getestet."],
    model: "Ein Unit-Test ist ein kleines Prüfprogramm, das eine einzelne Funktion mit festen Eingaben aufruft und automatisch kontrolliert, ob das erwartete Ergebnis herauskommt. Weil man nicht jede mögliche Eingabe testen kann, teilt man sie in Gruppen ein, die gleich behandelt werden – etwa „kein Rabatt“, „5 % Rabatt“, „10 % Rabatt“ – und nimmt je einen Vertreter. Zusätzlich testet man genau an den Übergängen, denn dort passieren die meisten Fehler, und auch Unsinnseingaben wie negative Beträge."
  }
);

/* ---- ga2sql ---- */
AP2.feynman.push(
  {
    id: "fey-primaerschluessel",
    term: "Primärschlüssel",
    part: "GA2",
    topic: "ga2-sql-ddl",
    prompt: "Erkläre einem Laien, was ein Primärschlüssel ist und wozu eine Tabelle ihn braucht.",
    keypoints: [
      { text: "Identifiziert jede Zeile eindeutig", kw: "eindeutig|identifiz|unverwechsel" },
      { text: "Darf nicht leer (NULL) sein", kw: "null|leer|pflicht|muss vorhanden" },
      { text: "Genau ein Primärschlüssel pro Tabelle", kw: "genau ein|nur ein|einen pro" },
      { text: "Kann aus mehreren Spalten zusammengesetzt sein", kw: "mehrere spalten|zusammengesetzt|kombination" },
      { text: "Ziel von Fremdschlüssel-Verweisen", kw: "fremdschl|verweis|beziehung" }
    ],
    gaps: ["Typische Lücke: „eindeutig“ genannt, aber vergessen, dass der Wert nie NULL sein darf.", "Fehlvorstellung: Eine UNIQUE-Spalte sei automatisch der Primärschlüssel."],
    model: "Ein Primärschlüssel ist wie die Ausweisnummer eines Datensatzes: Jede Zeile einer Tabelle bekommt einen Wert, den keine andere Zeile hat, und dieser Wert darf nie fehlen. Dadurch kann man jeden Datensatz gezielt finden, ändern oder löschen, ohne ihn mit einem anderen zu verwechseln. Jede Tabelle hat genau einen Primärschlüssel, der aber auch aus zwei Spalten zusammen bestehen kann. Andere Tabellen verweisen über diesen Wert auf den Datensatz."
  },
  {
    id: "fey-fremdschluessel",
    term: "Fremdschlüssel und referenzielle Integrität",
    part: "GA2",
    topic: "ga2-sql-ddl",
    prompt: "Erkläre einem Laien, was ein Fremdschlüssel ist und was referenzielle Integrität bedeutet.",
    keypoints: [
      { text: "Spalte, die auf den Primärschlüssel einer anderen Tabelle verweist", kw: "verweis|zeigt auf|primärschl|primaerschl" },
      { text: "Bildet die Beziehung zwischen Tabellen ab", kw: "beziehung|verbind|verknüpf" },
      { text: "Nur existierende Werte (oder NULL) erlaubt", kw: "existier|vorhanden|gibt es|ins leere" },
      { text: "Regelt das Löschen des Elterndatensatzes (CASCADE, RESTRICT, SET NULL)", kw: "cascade|restrict|set null|mitgelöscht|verhinder" },
      { text: "Verhindert verwaiste Datensätze", kw: "verwaist|ins leere|widerspr|integrit" }
    ],
    gaps: ["Typische Lücke: Es fehlt, was beim Löschen des referenzierten Datensatzes passiert.", "Fehlvorstellung: Ein Fremdschlüssel müsse eindeutig sein – er darf sich wiederholen und NULL sein."],
    model: "Ein Fremdschlüssel ist ein Verweis von einer Tabelle auf eine andere, ähnlich wie eine Kundennummer auf einer Rechnung, die zu einem Eintrag in der Kundenkartei gehört. Die Datenbank achtet darauf, dass dort nur Nummern stehen, die es in der Kundenkartei wirklich gibt – das nennt man referenzielle Integrität. So entstehen keine Rechnungen für Kunden, die gar nicht existieren. Zusätzlich legt man fest, was beim Löschen eines Kunden passiert: Löschen verbieten, Rechnungen mitlöschen oder den Verweis leeren."
  },
  {
    id: "fey-view",
    term: "View (Sicht)",
    part: "GA2",
    topic: "ga2-sql-ddl",
    prompt: "Erkläre einem Laien, was eine View in einer Datenbank ist und wofür man sie einsetzt.",
    keypoints: [
      { text: "Gespeicherte Abfrage, die wie eine Tabelle genutzt wird", kw: "gespeichert|abfrage|wie eine tabelle|virtuell" },
      { text: "Speichert selbst keine eigenen Daten", kw: "keine eigenen|keine daten|nicht gespeichert|jedes mal|aktuell" },
      { text: "Vereinfacht komplexe Abfragen (z. B. Joins)", kw: "vereinfach|komplex|join|bequem" },
      { text: "Blendet sensible Spalten/Zeilen aus (Rechtekonzept)", kw: "ausblend|sensib|recht|verberg|schutz" }
    ],
    gaps: ["Fehlvorstellung: Eine View sei eine Kopie der Daten.", "Typische Lücke: Der Einsatz für Zugriffsrechte (nur Rechte auf die View) wird vergessen."],
    model: "Eine View ist wie ein Fenster auf eine oder mehrere Tabellen: Man speichert eine Abfrage unter einem Namen und kann sie danach wie eine Tabelle benutzen. Die Daten werden dabei nicht kopiert, sondern bei jedem Zugriff frisch aus den Tabellen geholt. So kann man komplizierte Verknüpfungen hinter einem einfachen Namen verstecken. Außerdem kann man Benutzern nur die View freigeben, damit sie zum Beispiel Namen sehen, aber keine Gehälter."
  },
  {
    id: "fey-null",
    term: "NULL",
    part: "GA2",
    topic: "ga2-sql-select",
    prompt: "Erkläre einem Laien, was NULL in einer Datenbank bedeutet und warum man damit vorsichtig sein muss.",
    keypoints: [
      { text: "NULL heißt „unbekannt/nicht vorhanden“, nicht 0 oder Leerstring", kw: "unbekannt|nicht vorhanden|fehlt|kein wert" },
      { text: "Vergleich mit = NULL ergibt UNKNOWN, keine Zeile", kw: "unknown|= null|vergleich|dreiwertig" },
      { text: "Prüfung nur mit IS NULL / IS NOT NULL", kw: "is null|is not null" },
      { text: "Aggregatfunktionen ignorieren NULL (z. B. AVG, COUNT(spalte))", kw: "ignor|avg|count|aggregat|durchschnitt" },
      { text: "Falle bei NOT IN mit NULL", kw: "not in|leeres ergebnis|leer" }
    ],
    gaps: ["Fehlvorstellung: NULL sei dasselbe wie 0 oder ein leerer Text.", "Typische Lücke: Dass WHERE spalte = NULL nie etwas findet, wird nicht erklärt."],
    model: "NULL bedeutet in einer Datenbank „hier steht nichts, der Wert ist unbekannt“ – das ist etwas anderes als die Zahl 0 oder ein leerer Text. Weil man Unbekanntes nicht vergleichen kann, ist die Antwort auf „ist dieses Feld gleich NULL?“ weder ja noch nein, sondern „unbekannt“, und die Abfrage findet nichts. Darum fragt man ausdrücklich mit IS NULL. Auch beim Rechnen werden NULL-Felder übersprungen: Ein Durchschnitt teilt nur durch die vorhandenen Werte."
  },
  {
    id: "fey-join",
    term: "JOIN (INNER JOIN)",
    part: "GA2",
    topic: "ga2-sql-join",
    prompt: "Erkläre einem Laien, was ein JOIN ist und warum man ihn braucht.",
    keypoints: [
      { text: "Daten sind durch Normalisierung auf mehrere Tabellen verteilt", kw: "mehrere tabellen|verteilt|normalis|aufgeteilt" },
      { text: "Verbindet Zeilen über Fremdschlüssel = Primärschlüssel", kw: "fremdschl|primärschl|schlüssel|nummer" },
      { text: "INNER JOIN liefert nur Zeilen mit Partner auf beiden Seiten", kw: "beide|partner|passend|übereinstimm" },
      { text: "Ohne Join-Bedingung entsteht ein kartesisches Produkt", kw: "kartes|jede mit jeder|kreuzprodukt|cross" }
    ],
    gaps: ["Typische Lücke: Es wird nicht gesagt, worüber verbunden wird (FK = PK).", "Typische Lücke: Dass Zeilen ohne Partner beim INNER JOIN wegfallen, fehlt."],
    model: "In einer Datenbank stehen zusammengehörige Informationen oft in verschiedenen Tabellen, zum Beispiel Kunden in einer und Bestellungen in einer anderen. Ein JOIN legt die Tabellen nebeneinander und verbindet jede Bestellung mit dem passenden Kunden über die gemeinsame Kundennummer. Beim INNER JOIN erscheinen nur Paare, die wirklich zusammenpassen; Kunden ohne Bestellung fehlen. Vergisst man die Verbindungsbedingung, wird jede Zeile mit jeder kombiniert und man bekommt riesige, unsinnige Ergebnisse."
  },
  {
    id: "fey-left-join",
    term: "LEFT JOIN",
    part: "GA2",
    topic: "ga2-sql-join",
    prompt: "Erkläre einem Laien den Unterschied zwischen LEFT JOIN und INNER JOIN.",
    keypoints: [
      { text: "Alle Zeilen der linken Tabelle bleiben erhalten", kw: "alle zeilen|alle der linken|links|behält|bleiben" },
      { text: "Fehlender Partner wird mit NULL aufgefüllt", kw: "null|leer|aufgefüllt" },
      { text: "Einsatz: „auch die ohne …“, z. B. Kunden ohne Bestellung", kw: "ohne|auch die|anti" },
      { text: "Bedingung auf rechte Tabelle in ON statt WHERE", kw: "on-klausel|in on|where|inner join" }
    ],
    gaps: ["Typische Lücke: Die Falle „WHERE auf rechte Tabelle macht LEFT zu INNER“ fehlt.", "Fehlvorstellung: LEFT JOIN liefere automatisch weniger Zeilen als INNER JOIN – es sind gleich viele oder mehr."],
    model: "Beim LEFT JOIN ist die linke Tabelle die Hauptliste, von der garantiert jeder Eintrag im Ergebnis auftaucht. Gibt es auf der rechten Seite einen passenden Partner, wird er danebengeschrieben, sonst bleiben die Felder leer (NULL). So sieht man zum Beispiel alle Kunden, auch die, die noch nie bestellt haben. Filtert man danach mit WHERE auf die rechte Tabelle, verschwinden diese leeren Zeilen wieder – solche Bedingungen gehören deshalb in die ON-Klausel."
  },
  {
    id: "fey-group-by",
    term: "GROUP BY und Aggregatfunktionen",
    part: "GA2",
    topic: "ga2-sql-aggregat",
    prompt: "Erkläre einem Laien, was GROUP BY macht und warum es bei Aggregatfunktionen nötig ist.",
    keypoints: [
      { text: "Fasst Zeilen mit gleichem Wert zu Gruppen zusammen", kw: "zusammenfass|gruppe|gleiche" },
      { text: "Pro Gruppe genau eine Ergebniszeile", kw: "eine zeile|pro gruppe|je gruppe|eine ergebniszeile" },
      { text: "Aggregatfunktionen (COUNT, SUM, AVG) rechnen je Gruppe", kw: "count|sum|avg|zähl|summ|durchschnitt" },
      { text: "Nicht aggregierte SELECT-Spalten müssen ins GROUP BY", kw: "nicht aggreg|im group by|muss im|alle spalten" },
      { text: "Ohne GROUP BY: genau eine Zeile für die ganze Tabelle", kw: "ohne group by|ganze tabelle|eine einzige" }
    ],
    gaps: ["Typische Lücke: Die Regel zu nicht aggregierten Spalten im SELECT fehlt.", "Fehlvorstellung: GROUP BY sortiere nur – es verdichtet Zeilen."],
    model: "GROUP BY sortiert die Zeilen einer Tabelle in Stapel, zum Beispiel alle Kunden nach ihrem Wohnort. Für jeden Stapel entsteht genau eine Ergebniszeile, und Funktionen wie COUNT oder SUM rechnen dann pro Stapel: „Berlin: 4 Kunden, Köln: 2 Kunden“. Darum darf im Ergebnis nur stehen, was für den ganzen Stapel eindeutig ist – also die Gruppierungsspalte oder ein berechneter Wert. Ein einzelner Nachname passt nicht, weil im Stapel mehrere stecken."
  },
  {
    id: "fey-having",
    term: "HAVING (vs. WHERE)",
    part: "GA2",
    topic: "ga2-sql-aggregat",
    prompt: "Erkläre einem Laien, wozu HAVING dient und wie es sich von WHERE unterscheidet.",
    keypoints: [
      { text: "WHERE filtert einzelne Zeilen vor der Gruppierung", kw: "vor der gruppierung|vorher|einzelne zeilen|zeilen" },
      { text: "HAVING filtert ganze Gruppen nach der Gruppierung", kw: "nach der gruppierung|danach|gruppen" },
      { text: "Aggregatfunktionen nur in HAVING, nicht in WHERE", kw: "aggregat|count|sum|avg" },
      { text: "Grund: Ausführungsreihenfolge FROM, WHERE, GROUP BY, HAVING", kw: "reihenfolge|zuerst|erst danach" }
    ],
    gaps: ["Typische Lücke: Es fehlt, warum WHERE COUNT(*) nicht geht (Gruppen existieren da noch nicht).", "Fehlvorstellung: HAVING sei nur eine andere Schreibweise für WHERE."],
    model: "WHERE und HAVING sind beide Filter, arbeiten aber zu verschiedenen Zeitpunkten. WHERE sortiert einzelne Zeilen aus, bevor überhaupt gruppiert wird – zum Beispiel nur gelieferte Bestellungen. HAVING kommt erst nach dem Gruppieren und wirft ganze Gruppen raus, etwa alle Orte mit weniger als drei Kunden. Weil man erst nach dem Gruppieren zählen kann, dürfen Funktionen wie COUNT nur in HAVING stehen."
  },
  {
    id: "fey-unterabfrage",
    term: "Unterabfrage (korreliert / unkorreliert)",
    part: "GA2",
    topic: "ga2-sql-subquery",
    prompt: "Erkläre einem Laien, was eine Unterabfrage ist und was eine korrelierte Unterabfrage besonders macht.",
    keypoints: [
      { text: "SELECT in Klammern innerhalb einer anderen Abfrage", kw: "in klammern|innerhalb|verschachtelt|abfrage in" },
      { text: "Liefert z. B. einen Vergleichswert (Durchschnitt, Maximum)", kw: "vergleich|durchschnitt|maximum|avg|max" },
      { text: "Unkorreliert: eigenständig, einmal ausgewertet", kw: "eigenständig|unabhängig|einmal|unkorreliert" },
      { text: "Korreliert: bezieht sich auf die äußere Zeile, je Zeile neu ausgewertet", kw: "äußere|aeussere|jede zeile|je zeile|neu ausgewertet|korreliert" },
      { text: "Einsatz in WHERE, FROM, SELECT; mit IN/EXISTS", kw: "where|from|exists|not in" }
    ],
    gaps: ["Typische Lücke: Der Unterschied korreliert/unkorreliert wird nicht genannt.", "Typische Lücke: Die NOT-IN-Falle mit NULL fehlt."],
    model: "Eine Unterabfrage ist eine Frage innerhalb einer Frage: Um „Welche Artikel sind teurer als der Durchschnitt?“ zu beantworten, berechnet man zuerst in Klammern den Durchschnitt und vergleicht dann jeden Artikel damit. Diese innere Frage kann für sich allein laufen und wird nur einmal gestellt. Bei einer korrelierten Unterabfrage hängt die innere Frage dagegen von der gerade betrachteten Zeile ab, etwa „teurer als der Durchschnitt der eigenen Abteilung“ – sie wird für jede Zeile neu gestellt."
  },
  {
    id: "fey-ddl-dml",
    term: "DDL, DML und DCL",
    part: "GA2",
    topic: "ga2-sql-dml",
    prompt: "Erkläre einem Laien, worin sich DDL, DML und DCL in SQL unterscheiden.",
    keypoints: [
      { text: "DDL definiert die Struktur (CREATE, ALTER, DROP)", kw: "struktur|create|alter|drop" },
      { text: "DML ändert die Daten (INSERT, UPDATE, DELETE)", kw: "insert|update|delete|daten ändern|datenbestand" },
      { text: "DCL vergibt Rechte (GRANT, REVOKE)", kw: "grant|revoke|recht" },
      { text: "DELETE ohne WHERE trifft alle Zeilen", kw: "where|alle zeilen" }
    ],
    gaps: ["Fehlvorstellung: DROP TABLE und DELETE FROM seien gleich.", "Typische Lücke: DCL (Rechtevergabe) wird nicht genannt."],
    model: "SQL hat verschiedene Befehlsgruppen. Mit DDL baut man das Regal: Man legt Tabellen an, ändert ihren Aufbau oder entfernt sie (CREATE, ALTER, DROP). Mit DML räumt man Dinge ins Regal, ändert oder entfernt sie (INSERT, UPDATE, DELETE) – das Regal selbst bleibt stehen. Mit DCL bestimmt man, wer an das Regal darf (GRANT, REVOKE). Wichtig: Ein DELETE ohne Bedingung leert das ganze Regal."
  },
  {
    id: "fey-transaktion",
    term: "Transaktion",
    part: "GA2",
    topic: "ga2-sql-transaktionen",
    prompt: "Erkläre einem Laien, was eine Transaktion in einer Datenbank ist.",
    keypoints: [
      { text: "Mehrere Operationen bilden eine logische Einheit", kw: "einheit|zusammen|mehrere|folge" },
      { text: "Ganz oder gar nicht ausgeführt", kw: "ganz oder gar|alles oder nichts|gar nicht" },
      { text: "COMMIT schreibt dauerhaft fest", kw: "commit|festschreib|dauerhaft" },
      { text: "ROLLBACK nimmt alles zurück", kw: "rollback|zurück|rückgängig" },
      { text: "Beispiel Umbuchung: Abbuchung und Gutschrift", kw: "umbuchung|überweis|abbuch|gutschrift|konto" }
    ],
    gaps: ["Typische Lücke: COMMIT/ROLLBACK werden nicht erwähnt.", "Typische Lücke: Kein Beispiel, warum Teilausführung gefährlich wäre."],
    model: "Eine Transaktion ist ein Paket von Datenbankänderungen, das nur komplett oder gar nicht ausgeführt werden darf. Bei einer Überweisung muss das Geld vom einen Konto abgebucht und dem anderen gutgeschrieben werden – fällt dazwischen der Strom aus, darf nicht nur die Abbuchung übrig bleiben. Erst mit COMMIT werden alle Änderungen gemeinsam dauerhaft gespeichert. Geht etwas schief, macht ROLLBACK alles rückgängig, als wäre nichts passiert."
  },
  {
    id: "fey-acid",
    term: "ACID",
    part: "GA2",
    topic: "ga2-sql-transaktionen",
    prompt: "Erkläre einem Laien die vier ACID-Eigenschaften von Transaktionen.",
    keypoints: [
      { text: "Atomarität: alles oder nichts", kw: "atomar|alles oder nichts|ganz oder gar" },
      { text: "Konsistenz: von gültigem zu gültigem Zustand", kw: "konsisten|gültig|regeln|integrit" },
      { text: "Isolation: parallele Transaktionen stören sich nicht", kw: "isolation|parallel|gleichzeitig|stören" },
      { text: "Dauerhaftigkeit: nach COMMIT bleibt die Änderung, auch bei Absturz", kw: "dauerhaft|durab|absturz|bleibt" }
    ],
    gaps: ["Typische Lücke: Konsistenz und Isolation werden verwechselt.", "Typische Lücke: Bei Dauerhaftigkeit fehlt der Bezug zum COMMIT bzw. Absturz."],
    model: "ACID sind vier Versprechen einer Datenbank für Transaktionen. Atomarität: Ein Auftrag wird ganz oder gar nicht erledigt. Konsistenz: Danach sind alle Regeln wieder erfüllt, zum Beispiel stimmt die Gesamtsumme aller Konten. Isolation: Mehrere Leute können gleichzeitig arbeiten, ohne sich gegenseitig halbfertige Zwischenstände zu zeigen. Dauerhaftigkeit: Was bestätigt wurde, bleibt gespeichert – auch wenn kurz danach der Server abstürzt."
  },
  {
    id: "fey-isolationslevel",
    term: "Isolationslevel und Anomalien",
    part: "GA2",
    topic: "ga2-sql-transaktionen",
    prompt: "Erkläre einem Laien, was Isolationslevel sind und welche Probleme sie verhindern.",
    keypoints: [
      { text: "Steuern, wie stark sich parallele Transaktionen sehen/beeinflussen", kw: "parallel|gleichzeitig|beeinfluss|sichtbar" },
      { text: "Dirty Read: Lesen nicht festgeschriebener Daten (ab READ COMMITTED verhindert)", kw: "dirty|nicht festgeschrieben|read committed|uncommitted" },
      { text: "Non-Repeatable Read: gleiche Zeile, anderer Wert (ab REPEATABLE READ)", kw: "non-repeatable|repeatable|anderer wert|erneut lesen" },
      { text: "Phantom Read: neue Zeilen tauchen auf (SERIALIZABLE)", kw: "phantom|serializ|neue zeile" },
      { text: "Höhere Stufe = mehr Sicherheit, aber weniger Parallelität/mehr Sperren", kw: "langsam|sperre|wartezeit|parallelität|performance|leistung" }
    ],
    gaps: ["Typische Lücke: Der Preis höherer Isolation (Wartezeiten, Deadlocks) wird nicht genannt.", "Fehlvorstellung: Non-Repeatable Read und Phantom Read seien dasselbe."],
    model: "Wenn viele Nutzer gleichzeitig mit einer Datenbank arbeiten, kann einer Zwischenstände eines anderen sehen. Das Isolationslevel ist ein Regler dafür, wie streng die Arbeiten voneinander abgeschirmt werden. Auf niedriger Stufe kann man zum Beispiel Daten lesen, die der andere gleich wieder verwirft (Dirty Read), oder beim zweiten Nachsehen einen anderen Wert oder plötzlich neue Zeilen finden. Je höher die Stufe, desto weniger solcher Überraschungen – dafür muss öfter gewartet werden und alles wird langsamer."
  },
  {
    id: "fey-deadlock-db",
    term: "Deadlock in Datenbanken",
    part: "GA2",
    topic: "ga2-sql-transaktionen",
    prompt: "Erkläre einem Laien, was ein Deadlock in einer Datenbank ist und wie man damit umgeht.",
    keypoints: [
      { text: "Zwei Transaktionen halten je eine Sperre und warten auf die des anderen", kw: "sperre|lock|gesperrt|hält" },
      { text: "Zyklisches gegenseitiges Warten, löst sich nicht von selbst", kw: "gegenseitig|zyklisch|ewig|kreis|wartet" },
      { text: "DBMS erkennt den Deadlock und bricht eine Transaktion ab", kw: "abbr|bricht|rollback|opfer|erkennt" },
      { text: "Vermeidung: Sperren immer in gleicher Reihenfolge, kurze Transaktionen", kw: "reihenfolge|kurz|gleiche" },
      { text: "Anwendung wiederholt die abgebrochene Transaktion", kw: "wiederhol|erneut|retry" }
    ],
    gaps: ["Typische Lücke: Es fehlt, dass das DBMS eine Transaktion zwangsweise zurücksetzt.", "Typische Lücke: Keine Gegenmaßnahme (einheitliche Sperrreihenfolge) genannt."],
    model: "Ein Deadlock ist wie zwei Autos an einer engen Brücke, die von beiden Seiten gleichzeitig hineinfahren: Keiner kann weiter, weil der andere im Weg steht. In der Datenbank hält Transaktion A eine Zeile gesperrt und wartet auf eine Zeile, die B gesperrt hat – und B wartet umgekehrt auf A. Das Datenbanksystem erkennt diese Blockade und bricht eine der beiden ab, die dann neu gestartet werden muss. Vermeiden lässt sich das, wenn alle Programme Zeilen immer in derselben Reihenfolge sperren."
  },
  {
    id: "fey-index",
    term: "Index",
    part: "GA2",
    topic: "ga2-sql-transaktionen",
    prompt: "Erkläre einem Laien, was ein Datenbank-Index ist und welche Vor- und Nachteile er hat.",
    keypoints: [
      { text: "Zusätzliche sortierte Suchstruktur (B-Baum)", kw: "sortiert|b-baum|baum|verzeichnis|register" },
      { text: "Beschleunigt Suchen, Sortieren, Joins", kw: "schnell|beschleunig|such" },
      { text: "Kein Durchsuchen der ganzen Tabelle nötig (Full Table Scan)", kw: "ganze tabelle|full table|jede zeile|komplett durch" },
      { text: "Kostet Speicher und bremst INSERT/UPDATE/DELETE", kw: "speicher|langsamer|schreib|insert|update" },
      { text: "Wenig Nutzen bei kleinen Tabellen oder wenigen verschiedenen Werten", kw: "klein|wenige|zwei werte|selektiv" }
    ],
    gaps: ["Typische Lücke: Nur Vorteile genannt, Nachteile beim Schreiben fehlen.", "Fehlvorstellung: Ein normaler Index verhindere doppelte Werte – das kann nur ein UNIQUE-Index."],
    model: "Ein Index funktioniert wie das Stichwortverzeichnis hinten in einem Buch: Statt jede Seite durchzublättern, schlägt man das Wort nach und springt direkt zur richtigen Stelle. Genauso findet die Datenbank Zeilen viel schneller, ohne die ganze Tabelle zu lesen. Das Verzeichnis kostet aber Platz und muss bei jeder Änderung mit aktualisiert werden, deshalb werden Einfügen und Ändern langsamer. Bei winzigen Tabellen oder Spalten mit nur zwei möglichen Werten lohnt es sich kaum."
  },
  {
    id: "fey-prepared-statements",
    term: "Prepared Statements (Schutz vor SQL-Injection)",
    part: "GA2",
    topic: "ga2-sql-transaktionen",
    prompt: "Erkläre einem Laien, was SQL-Injection ist und wie man sich davor schützt.",
    keypoints: [
      { text: "Benutzereingabe wird ungeprüft in den SQL-Befehl eingebaut", kw: "eingabe|ungeprüft|eingebaut|zusammengesetzt" },
      { text: "Angreifer verändert damit die Abfrage (z. B. ' OR '1'='1)", kw: "verändert|or '1'='1|1=1|manipul|einschleus" },
      { text: "Schutz: Prepared Statements mit Platzhaltern", kw: "prepared|platzhalter|parameter" },
      { text: "Eingaben werden nur als Daten, nicht als Code behandelt", kw: "als daten|nicht als code|getrennt" },
      { text: "Zusätzlich: Eingabevalidierung, minimale Rechte", kw: "validier|minimal|least privilege|rechte" }
    ],
    gaps: ["Fehlvorstellung: Escaping oder eine Blacklist von Zeichen sei ein vollständiger Schutz.", "Typische Lücke: Es wird nicht erklärt, warum Prepared Statements wirken (Trennung von Code und Daten)."],
    model: "Bei SQL-Injection tippt ein Angreifer in ein Eingabefeld keinen normalen Text, sondern Bruchstücke von Datenbankbefehlen. Baut das Programm diese Eingabe einfach in seinen Befehl ein, ändert sich dessen Bedeutung – etwa so, dass die Passwortprüfung immer „wahr“ ergibt. Das ist, als würde ein Formular den Satz „…und gib mir alle Akten“ einfach mit ausführen. Prepared Statements verhindern das: Der Befehl steht vorher fest und die Eingabe wird nur noch als reiner Wert eingesetzt, nie als Befehl."
  },
  {
    id: "fey-trigger",
    term: "Trigger und Stored Procedure",
    part: "GA2",
    topic: "ga2-sql-transaktionen",
    prompt: "Erkläre einem Laien, was ein Trigger ist und wie er sich von einer Stored Procedure unterscheidet.",
    keypoints: [
      { text: "Trigger läuft automatisch bei INSERT/UPDATE/DELETE", kw: "automatisch|ausgelöst|insert|update|delete" },
      { text: "Zeitpunkt BEFORE oder AFTER, Zugriff auf alte/neue Werte", kw: "before|after|old|new|alt|neu" },
      { text: "Stored Procedure wird explizit aufgerufen (CALL)", kw: "call|aufgerufen|explizit|aufruf" },
      { text: "Typisch: Protokollierung, Bestand anpassen", kw: "protokoll|log|bestand|historie" }
    ],
    gaps: ["Typische Lücke: Der Unterschied „automatisch vs. explizit aufgerufen“ fehlt.", "Typische Lücke: Kein Anwendungsbeispiel genannt."],
    model: "Ein Trigger ist wie ein Bewegungsmelder in der Datenbank: Sobald in einer Tabelle etwas eingefügt, geändert oder gelöscht wird, springt er automatisch an und erledigt eine Zusatzaufgabe, zum Beispiel einen Eintrag ins Änderungsprotokoll mit altem und neuem Wert. Niemand muss daran denken, ihn auszulösen. Eine Stored Procedure ist dagegen eher wie ein gespeichertes Rezept: Sie liegt in der Datenbank bereit, wird aber nur ausgeführt, wenn jemand sie ausdrücklich mit CALL aufruft."
  }
);

/* ---- wisofg ---- */
// Paket C – Feynman-Modus „Erklär es einem Laien“ für WiSo und Fachgespräch
AP2.feynman.push(
  /* =================== WiSo =================== */
  {
    id: "fey-wiso-skonto",
    term: "Skonto",
    part: "WISO",
    topic: "wiso-kalkulation",
    prompt: "Erkläre einem Laien, was Skonto ist und warum es sich fast immer lohnt, Skonto zu ziehen.",
    keypoints: [
      { text: "Preisnachlass für schnelle Zahlung innerhalb einer kurzen Frist", kw: "schnell|frist|innerhalb|frueh|früh" },
      { text: "Sonst gilt ein längeres Zahlungsziel ohne Abzug", kw: "zahlungsziel|30 tage|spaeter|später" },
      { text: "Nicht-Ziehen wirkt wie ein sehr teurer Kredit (hoher Jahreszins)", kw: "kredit|zins|teuer" },
      { text: "Notfalls lohnt sich ein Kontokorrentkredit, um Skonto zu nutzen", kw: "kontokorrent|dispo|kredit aufnehmen|finanzierungsgewinn" },
      { text: "Wird in der Bezugskalkulation vom Zieleinkaufspreis abgezogen", kw: "zieleinkauf|nach rabatt|bezugskalkulation" }
    ],
    gaps: ["Typische Lücke: Skonto mit Rabatt verwechseln – Rabatt gibt es für Menge/Treue, Skonto für schnelle Zahlung.", "Hinweis: Erkläre, warum der Verzicht auf Skonto einem teuren Lieferantenkredit entspricht."],
    model: "Skonto ist ein kleiner Rabatt dafür, dass du eine Rechnung sehr schnell bezahlst, z. B. 2 % bei Zahlung innerhalb von 10 Tagen statt voller Betrag nach 30 Tagen. Wer nicht sofort zahlt, „leiht“ sich das Geld also für 20 Tage vom Lieferanten und zahlt dafür 2 % – aufs Jahr gerechnet sind das rund 36 % Zinsen. Deshalb lohnt es sich fast immer, Skonto zu ziehen, notfalls sogar mit einem Bankkredit, der viel billiger ist."
  },
  {
    id: "fey-wiso-kuendigungsschutz",
    term: "Kündigungsschutz (KSchG)",
    part: "WISO",
    topic: "wiso-arbeitsrecht",
    prompt: "Erkläre einem Laien, was das Kündigungsschutzgesetz bewirkt und wann es greift.",
    keypoints: [
      { text: "Gilt bei mehr als 10 Arbeitnehmern im Betrieb", kw: "10 |zehn|kleinbetrieb|betriebsgröße|betriebsgroesse" },
      { text: "Gilt erst nach mehr als 6 Monaten Beschäftigung", kw: "6 monat|sechs monat|wartezeit" },
      { text: "Kündigung muss sozial gerechtfertigt sein: personen-, verhaltens- oder betriebsbedingt", kw: "sozial gerecht|personen|verhalten|betriebsbedingt" },
      { text: "Bei betriebsbedingter Kündigung Sozialauswahl", kw: "sozialauswahl|unterhalt|alter|betriebszugehörigkeit" },
      { text: "Klage innerhalb von 3 Wochen beim Arbeitsgericht", kw: "3 wochen|drei wochen|arbeitsgericht|klage" }
    ],
    gaps: ["Typische Lücke: Der Kleinbetrieb (bis 10 AN) und die Wartezeit von 6 Monaten werden vergessen.", "Hinweis: Besonderer Kündigungsschutz (Schwangere, Betriebsrat) ist etwas anderes als der allgemeine Kündigungsschutz."],
    model: "Das Kündigungsschutzgesetz sorgt dafür, dass ein Arbeitgeber nicht einfach „ohne Grund“ kündigen darf. Es gilt, wenn der Betrieb mehr als 10 Beschäftigte hat und du länger als 6 Monate dort arbeitest. Dann braucht die Kündigung einen anerkannten Grund: in deiner Person (z. B. lange Krankheit), in deinem Verhalten (meist nach Abmahnung) oder im Betrieb (Arbeitsplatz fällt weg, dann mit Sozialauswahl). Wer sich wehren will, muss innerhalb von 3 Wochen beim Arbeitsgericht klagen."
  },
  {
    id: "fey-wiso-probezeit",
    term: "Probezeit in der Ausbildung",
    part: "WISO",
    topic: "wiso-ausbildung",
    prompt: "Erkläre einem Laien, wozu die Probezeit in der Ausbildung dient und was in ihr gilt.",
    keypoints: [
      { text: "Gegenseitiges Kennenlernen/Erproben von Betrieb und Azubi", kw: "kennenlernen|erprob|testen|ausprobieren|passt" },
      { text: "Dauer mindestens 1, höchstens 4 Monate", kw: "4 monat|vier monat|1 monat|einen monat" },
      { text: "Kündigung jederzeit ohne Frist und ohne Grund", kw: "ohne frist|jederzeit|fristlos|ohne grund" },
      { text: "Kündigung trotzdem schriftlich", kw: "schriftlich|schriftform" },
      { text: "Danach kann der Betrieb nur noch aus wichtigem Grund kündigen", kw: "wichtig|danach|nach der probezeit" }
    ],
    gaps: ["Typische Lücke: Die 6 Monate aus dem Arbeitsrecht werden auf die Ausbildung übertragen – im BBiG sind es höchstens 4 Monate.", "Hinweis: Auch in der Probezeit braucht es die Schriftform."],
    model: "Die Probezeit ist wie eine Schnupperphase: Betrieb und Azubi prüfen, ob sie zueinander passen. In der Ausbildung dauert sie mindestens einen und höchstens vier Monate. In dieser Zeit können beide jederzeit ohne Frist und ohne Begründung kündigen, allerdings schriftlich. Nach der Probezeit ist der Azubi stark geschützt – der Betrieb kann dann nur noch aus wichtigem Grund kündigen."
  },
  {
    id: "fey-wiso-tarifautonomie",
    term: "Tarifautonomie",
    part: "WISO",
    topic: "wiso-tarif-mitbestimmung",
    prompt: "Erkläre einem Laien, was Tarifautonomie bedeutet.",
    keypoints: [
      { text: "Gewerkschaften und Arbeitgeber(verbände) handeln Arbeitsbedingungen selbst aus", kw: "gewerkschaft|arbeitgeberverb|aushandeln|verhandeln" },
      { text: "Ohne Einmischung des Staates", kw: "staat|ohne einmisch|unabhängig|unabhaengig" },
      { text: "Grundlage: Koalitionsfreiheit im Grundgesetz (Art. 9 Abs. 3)", kw: "grundgesetz|koalitionsfreiheit|art. 9|artikel 9" },
      { text: "Ergebnis ist der Tarifvertrag (z. B. Lohn, Urlaub, Arbeitszeit)", kw: "tarifvertrag|lohn|gehalt|urlaub" },
      { text: "Arbeitskampfmittel Streik und Aussperrung, Friedenspflicht während der Laufzeit", kw: "streik|aussperr|friedenspflicht" }
    ],
    gaps: ["Typische Lücke: Der Betriebsrat wird als Tarifpartei genannt – Tarifparteien sind Gewerkschaft und Arbeitgeber(verband).", "Hinweis: Die rechtliche Grundlage (Grundgesetz) gehört in eine vollständige Erklärung."],
    model: "Tarifautonomie heißt: Löhne, Urlaub und Arbeitszeiten werden nicht vom Staat festgelegt, sondern von Gewerkschaften und Arbeitgeberverbänden selbst ausgehandelt. Das Recht dazu steht im Grundgesetz (Koalitionsfreiheit). Das Ergebnis ist ein Tarifvertrag. Können sich beide Seiten nicht einigen, dürfen sie Druck ausüben – mit Streik oder Aussperrung –, aber nicht, solange der alte Vertrag noch läuft (Friedenspflicht)."
  },
  {
    id: "fey-wiso-betriebsrat",
    term: "Betriebsrat und Mitbestimmung",
    part: "WISO",
    topic: "wiso-tarif-mitbestimmung",
    prompt: "Erkläre einem Laien, was ein Betriebsrat ist und wo er mitbestimmen darf.",
    keypoints: [
      { text: "Gewählte Vertretung der Arbeitnehmer im Betrieb", kw: "vertret|gewählt|gewaehlt|interessen" },
      { text: "Möglich ab 5 ständigen wahlberechtigten Arbeitnehmern, Amtszeit 4 Jahre", kw: "5 |fünf|fuenf|4 jahre|vier jahre" },
      { text: "Echte Mitbestimmung in sozialen Angelegenheiten (z. B. Arbeitszeit, Überwachungssoftware)", kw: "mitbestimm|arbeitszeit|überwach|ueberwach|zustimm" },
      { text: "Bei Nichteinigung entscheidet die Einigungsstelle", kw: "einigungsstelle" },
      { text: "Muss vor jeder Kündigung angehört werden, sonst unwirksam", kw: "anhör|anhoer|kündigung|kuendigung" }
    ],
    gaps: ["Typische Lücke: Mitbestimmung, Mitwirkung (Anhörung, Widerspruch) und Information werden nicht unterschieden.", "Hinweis: Der Betriebsrat verhandelt keine Tarifverträge, sondern Betriebsvereinbarungen."],
    model: "Der Betriebsrat ist so etwas wie die gewählte Klassensprecher-Gruppe der Beschäftigten in einem Betrieb. Er kann gewählt werden, sobald mindestens fünf Beschäftigte dauerhaft dort arbeiten, und bleibt vier Jahre im Amt. Bei manchen Themen – etwa Arbeitszeiten oder Software, die Mitarbeiter überwachen kann – darf der Chef nichts ohne seine Zustimmung entscheiden; im Streit entscheidet eine Einigungsstelle. Vor jeder Kündigung muss er gefragt werden, sonst ist die Kündigung unwirksam."
  },
  {
    id: "fey-wiso-generationenvertrag",
    term: "Generationenvertrag (Umlageverfahren)",
    part: "WISO",
    topic: "wiso-sozialversicherung",
    prompt: "Erkläre einem Laien, wie der Generationenvertrag in der Rentenversicherung funktioniert und warum er unter Druck steht.",
    keypoints: [
      { text: "Heutige Beitragszahler finanzieren die heutigen Renten", kw: "heutig|erwerbstätig|erwerbstaetig|arbeitende|beitragszahler" },
      { text: "Kein eigenes Sparkonto – Umlageverfahren", kw: "umlage|kein konto|nicht angespart|sparkonto" },
      { text: "Ergänzt durch einen Zuschuss aus Steuermitteln", kw: "zuschuss|steuer|bund" },
      { text: "Demografischer Wandel: weniger Junge, mehr und länger lebende Rentner", kw: "demograf|geburten|lebenserwartung|älter|aelter" },
      { text: "Gegensatz: Kapitaldeckung bei privater/betrieblicher Vorsorge", kw: "kapitaldeckung|privat|betrieblich|vorsorge" }
    ],
    gaps: ["Typische Lücke: Man glaubt, die eigenen Beiträge würden für die eigene Rente angespart.", "Hinweis: Nenne die Ursache des Problems (Verhältnis Beitragszahler zu Rentnern)."],
    model: "Beim Generationenvertrag zahlst du deine Rentenbeiträge nicht auf ein eigenes Sparkonto, sondern sie werden direkt an die heutigen Rentner ausgezahlt. Dafür vertraust du darauf, dass später die nächste Generation deine Rente bezahlt. Das klappt gut, solange es viele Beitragszahler und wenige Rentner gibt. Weil aber weniger Kinder geboren werden und die Menschen länger leben, kippt das Verhältnis – deshalb sind zusätzlich betriebliche und private Vorsorge wichtig."
  },
  {
    id: "fey-wiso-maengelruege",
    term: "Kaufvertrag und Mängelrüge",
    part: "WISO",
    topic: "wiso-vertragsrecht",
    prompt: "Erkläre einem Laien, wie ein Kaufvertrag zustande kommt und was er bei mangelhafter Ware tun muss.",
    keypoints: [
      { text: "Vertrag durch zwei übereinstimmende Willenserklärungen: Antrag und Annahme", kw: "antrag|annahme|willenserklärung|willenserklaerung" },
      { text: "Pflichten: Verkäufer liefert mangelfrei und verschafft Eigentum, Käufer zahlt und nimmt ab", kw: "eigentum|mangelfrei|zahlen|abnehmen|bezahl" },
      { text: "Bei Mangel zuerst Nacherfüllung (Reparatur oder Ersatz)", kw: "nacherfüll|nacherfuell|reparatur|ersatz|nachbesser" },
      { text: "Danach Rücktritt, Minderung oder Schadensersatz", kw: "rücktritt|ruecktritt|minderung|schadensersatz" },
      { text: "Unter Kaufleuten: Ware unverzüglich prüfen und rügen (§ 377 HGB)", kw: "unverzüglich|unverzueglich|rüge|ruege|377|kaufleute" }
    ],
    gaps: ["Typische Lücke: Sofortiger Rücktritt wird genannt – der Verkäufer hat aber Vorrang zur Nacherfüllung.", "Hinweis: Beim zweiseitigen Handelskauf geht das Recht verloren, wenn nicht unverzüglich gerügt wird."],
    model: "Ein Kaufvertrag entsteht, wenn einer etwas anbietet oder bestellt (Antrag) und der andere zustimmt (Annahme). Der Verkäufer muss dann eine fehlerfreie Sache übergeben, der Käufer bezahlen und sie abnehmen. Ist die Ware kaputt oder falsch, muss der Käufer dem Verkäufer zuerst die Chance geben, sie zu reparieren oder auszutauschen. Erst wenn das scheitert, darf er vom Vertrag zurücktreten, den Preis mindern oder Schadensersatz verlangen. Unter Firmen gilt zusätzlich: Ware sofort prüfen und Mängel sofort melden, sonst gilt sie als genehmigt."
  },
  {
    id: "fey-wiso-gmbh-ag",
    term: "GmbH vs. AG",
    part: "WISO",
    topic: "wiso-unternehmen",
    prompt: "Erkläre einem Laien die wichtigsten Unterschiede zwischen GmbH und AG.",
    keypoints: [
      { text: "Beide sind Kapitalgesellschaften – Haftung nur mit dem Gesellschaftsvermögen", kw: "kapitalgesellschaft|haft|privatvermögen|privatvermoegen|gesellschaftsvermögen" },
      { text: "Mindestkapital: GmbH 25.000 €, AG 50.000 €", kw: "25.000|25000|50.000|50000|stammkapital|grundkapital" },
      { text: "GmbH: Geschäftsführer + Gesellschafterversammlung", kw: "geschäftsführer|geschaeftsfuehrer|gesellschafterversammlung" },
      { text: "AG: Vorstand, Aufsichtsrat, Hauptversammlung", kw: "vorstand|aufsichtsrat|hauptversammlung" },
      { text: "AG-Anteile (Aktien) leicht handelbar, geeignet für viel Kapital/Börse", kw: "aktie|börse|boerse|handelbar" }
    ],
    gaps: ["Typische Lücke: Die Organe der AG werden verwechselt (Aufsichtsrat überwacht, Vorstand leitet).", "Hinweis: Beide werden in Abteilung B des Handelsregisters eingetragen."],
    model: "GmbH und AG sind beides Firmen, bei denen die Eigentümer nicht mit ihrem privaten Geld haften – nur das Firmenvermögen steht für Schulden ein. Eine GmbH braucht mindestens 25.000 € Startkapital und wird von Geschäftsführern geleitet, die Gesellschafter kontrollieren sie. Eine AG braucht 50.000 € und hat drei Organe: Der Vorstand leitet, der Aufsichtsrat überwacht den Vorstand, und die Hauptversammlung der Aktionäre entscheidet über Grundsätzliches. Aktien lassen sich leicht verkaufen, deshalb eignet sich die AG für große Unternehmen mit viel Kapitalbedarf."
  },
  {
    id: "fey-wiso-prokura",
    term: "Prokura",
    part: "WISO",
    topic: "wiso-unternehmen",
    prompt: "Erkläre einem Laien, was Prokura ist und wo ihre Grenzen liegen.",
    keypoints: [
      { text: "Sehr weitreichende Vollmacht für fast alle Geschäfte eines Handelsgewerbes", kw: "vollmacht|fast alle|weitreichend|umfassend" },
      { text: "Nur vom Kaufmann ausdrücklich erteilt, Eintragung ins Handelsregister", kw: "ausdrücklich|ausdruecklich|handelsregister|kaufmann" },
      { text: "Unterschrift mit „ppa.“", kw: "ppa" },
      { text: "Grenzen: Bilanz unterschreiben, Prokura erteilen, Grundstücke verkaufen, Insolvenz anmelden", kw: "bilanz|grundstück|grundstueck|insolvenz|nicht erlaubt" },
      { text: "Interne Beschränkungen gelten nicht gegenüber Dritten", kw: "innenverhältnis|innenverhaeltnis|dritte|außen|aussen" }
    ],
    gaps: ["Typische Lücke: Prokura mit Handlungsvollmacht („i. V.“) verwechseln.", "Hinweis: Nenne mindestens ein Geschäft, das ein Prokurist nicht darf."],
    model: "Prokura ist eine Art Generalschlüssel für die Firma: Ein Prokurist darf fast alles, was in einem Unternehmen vorkommt – Verträge schließen, Kredite aufnehmen, Personal einstellen. Weil diese Macht so groß ist, muss der Kaufmann sie ausdrücklich erteilen und ins Handelsregister eintragen lassen; der Prokurist unterschreibt mit „ppa.“. Ein paar Dinge bleiben aber dem Chef vorbehalten, etwa die Bilanz zu unterschreiben, Grundstücke zu verkaufen oder weitere Prokura zu erteilen. Interne Absprachen wie „nur bis 10.000 €“ gelten nach außen nicht."
  },
  {
    id: "fey-wiso-inflation",
    term: "Inflation",
    part: "WISO",
    topic: "wiso-wirtschaft",
    prompt: "Erkläre einem Laien, was Inflation ist, wer davon profitiert und was die EZB dagegen tut.",
    keypoints: [
      { text: "Anhaltender Anstieg des allgemeinen Preisniveaus", kw: "preisniveau|preise steigen|teurer|preisanstieg" },
      { text: "Kaufkraft des Geldes sinkt", kw: "kaufkraft|weniger kaufen|wert" },
      { text: "Gemessen über Verbraucherpreisindex/Warenkorb", kw: "warenkorb|verbraucherpreisindex|vpi|hvpi" },
      { text: "Schuldner gewinnen, Sparer und Gläubiger verlieren", kw: "schuldner|sparer|gläubiger|glaeubiger" },
      { text: "EZB erhöht Leitzinsen, Ziel ca. 2 %", kw: "ezb|leitzins|zins|2 %|2%" }
    ],
    gaps: ["Typische Lücke: Ein einzelnes teurer werdendes Produkt ist noch keine Inflation – es geht um das allgemeine Preisniveau.", "Hinweis: Erkläre den Realzins (Nominalzins minus Inflationsrate)."],
    model: "Inflation bedeutet, dass die Preise insgesamt über längere Zeit steigen – du bekommst also für 100 € weniger als früher. Gemessen wird das mit einem Warenkorb typischer Einkäufe. Wer Geld auf dem Sparbuch hat, verliert real, wer Schulden hat, gewinnt, weil er sie mit weniger wertvollem Geld zurückzahlt. Die Europäische Zentralbank will die Inflation bei etwa 2 % halten; ist sie zu hoch, erhöht sie die Leitzinsen, Kredite werden teurer und die Nachfrage sinkt."
  },
  {
    id: "fey-wiso-deckungsbeitrag",
    term: "Deckungsbeitrag",
    part: "WISO",
    topic: "wiso-kalkulation",
    prompt: "Erkläre einem Laien, was der Deckungsbeitrag ist und wozu man ihn braucht.",
    keypoints: [
      { text: "Deckungsbeitrag je Stück = Preis minus variable Stückkosten", kw: "preis minus|variable|minus" },
      { text: "Dient zur Deckung der Fixkosten", kw: "fixkosten|fixe kosten|deck" },
      { text: "Gewinn = Deckungsbeitrag gesamt minus Fixkosten", kw: "gewinn" },
      { text: "Break-even: Fixkosten ÷ Deckungsbeitrag je Stück", kw: "break-even|break even|gewinnschwelle" },
      { text: "Positiver Deckungsbeitrag: Auftrag kann sich kurzfristig lohnen", kw: "positiv|preisuntergrenze|kurzfristig|lohnt" }
    ],
    gaps: ["Typische Lücke: Deckungsbeitrag wird mit Gewinn gleichgesetzt – die Fixkosten fehlen noch.", "Hinweis: Ergänze die Break-even-Menge als Anwendung."],
    model: "Stell dir einen Eisstand vor: Eine Kugel kostet 1,50 €, Eis und Waffel kosten dich 0,50 €. Der Euro, der übrig bleibt, ist der Deckungsbeitrag. Er dient zuerst dazu, die festen Kosten wie Standmiete zu bezahlen – erst wenn die gedeckt sind, machst du Gewinn. Teilt man die Fixkosten durch den Deckungsbeitrag je Kugel, weiß man, wie viele Kugeln man verkaufen muss, um ohne Verlust dazustehen (Break-even)."
  },
  {
    id: "fey-wiso-handelskalkulation",
    term: "Handelskalkulation (Vorwärtskalkulation)",
    part: "WISO",
    topic: "wiso-kalkulation",
    prompt: "Erkläre einem Laien, wie ein Händler vom Einkaufspreis zum Verkaufspreis kommt.",
    keypoints: [
      { text: "Start beim Bezugspreis (Einstandspreis)", kw: "bezugspreis|einstandspreis|einkauf" },
      { text: "Plus Handlungskosten = Selbstkosten", kw: "handlungskosten|selbstkosten|gemeinkosten" },
      { text: "Plus Gewinnzuschlag = Barverkaufspreis", kw: "gewinn" },
      { text: "Kundenskonto und Kundenrabatt im Hundert aufschlagen", kw: "im hundert|skonto|rabatt" },
      { text: "Ergebnis: Listenverkaufspreis netto, dann Umsatzsteuer", kw: "listenverkaufspreis|umsatzsteuer|netto|brutto" }
    ],
    gaps: ["Typische Lücke: Skonto und Rabatt werden wie ein normaler Aufschlag (vom Hundert) gerechnet statt im Hundert.", "Hinweis: Erkläre, warum man Nachlässe vorher einrechnet (der Kunde zieht sie später ab)."],
    model: "Ein Händler startet mit dem Preis, den ihn die Ware bis ins Lager kostet (Bezugspreis). Darauf schlägt er seine eigenen Kosten wie Miete und Personal auf und erhält die Selbstkosten, dann seinen gewünschten Gewinn. Weil er weiß, dass Kunden später Skonto und Rabatt abziehen, rechnet er diese vorher „im Hundert“ ein, damit am Ende trotzdem sein Gewinn übrig bleibt. So entsteht der Listenpreis, auf den dann noch die Umsatzsteuer kommt."
  },
  {
    id: "fey-wiso-arbeitsschutzgesetz",
    term: "Arbeitsschutzgesetz und Gefährdungsbeurteilung",
    part: "WISO",
    topic: "wiso-arbeitsschutz",
    prompt: "Erkläre einem Laien, was das Arbeitsschutzgesetz vom Arbeitgeber verlangt.",
    keypoints: [
      { text: "Arbeitgeber ist verantwortlich und trägt die Kosten", kw: "arbeitgeber|verantwort|kosten" },
      { text: "Gefährdungsbeurteilung inkl. psychischer Belastungen, dokumentiert", kw: "gefährdungsbeurteilung|gefaehrdungsbeurteilung|psychisch|dokument" },
      { text: "Maßnahmen nach STOP: Substitution, technisch, organisatorisch, personenbezogen", kw: "stop|substitution|technisch|organisatorisch" },
      { text: "Unterweisung vor Beginn und regelmäßig (mind. jährlich)", kw: "unterweis|jährlich|jaehrlich|regelmäßig|regelmaessig" },
      { text: "Beschäftigte müssen mitwirken: Gefahren melden, Schutzausrüstung nutzen", kw: "melden|mitwirk|schutzausrüstung|schutzausruestung|beschäftigte" }
    ],
    gaps: ["Typische Lücke: Psychische Belastungen (Stress, Zeitdruck) werden in der Gefährdungsbeurteilung vergessen.", "Hinweis: Der Sicherheitsbeauftragte unterstützt nur, die Verantwortung bleibt beim Arbeitgeber."],
    model: "Das Arbeitsschutzgesetz verpflichtet den Arbeitgeber, dafür zu sorgen, dass niemand bei der Arbeit krank wird oder sich verletzt – und er zahlt dafür. Zuerst schaut er sich jeden Arbeitsplatz genau an und hält schriftlich fest, welche Gefahren es gibt, auch Stress und Zeitdruck. Dann trifft er Maßnahmen, am besten die Gefahr ganz beseitigen, sonst technisch, organisatorisch und zuletzt mit persönlicher Schutzausrüstung. Er muss die Leute vor dem Start und danach regelmäßig unterweisen, und die Beschäftigten müssen mitmachen und Gefahren melden."
  },
  {
    id: "fey-wiso-duales-system",
    term: "Duales Ausbildungssystem",
    part: "WISO",
    topic: "wiso-ausbildung",
    prompt: "Erkläre einem Laien, was das duale System der Berufsausbildung ist.",
    keypoints: [
      { text: "Zwei Lernorte: Betrieb und Berufsschule", kw: "betrieb|berufsschule|zwei lernorte" },
      { text: "Betrieb: Ausbildungsordnung/Rahmenplan, BBiG", kw: "ausbildungsordnung|rahmenplan|bbig|praxis" },
      { text: "Schule: Rahmenlehrplan der KMK, Ländersache", kw: "rahmenlehrplan|kmk|länder|laender|theorie" },
      { text: "IHK als zuständige Stelle: überwacht, berät, prüft", kw: "ihk|zuständige stelle|zustaendige stelle|prüf" }
    ],
    gaps: ["Typische Lücke: Die IHK als zuständige Stelle wird nicht erwähnt.", "Hinweis: Nenne, wer jeweils die Regeln vorgibt (Bund für den Betrieb, Länder für die Schule)."],
    model: "„Dual“ heißt zweigleisig: Du lernst gleichzeitig im Betrieb (die Praxis) und in der Berufsschule (die Theorie). Was der Betrieb vermitteln muss, steht in der bundesweiten Ausbildungsordnung, was in der Schule gelehrt wird, im Rahmenlehrplan der Kultusminister. Die IHK passt als zuständige Stelle auf, dass alles korrekt läuft, berät und nimmt am Ende die Prüfung ab."
  },
  {
    id: "fey-wiso-guenstigkeitsprinzip",
    term: "Günstigkeitsprinzip und Rangfolge der Rechtsquellen",
    part: "WISO",
    topic: "wiso-tarif-mitbestimmung",
    prompt: "Erkläre einem Laien, in welcher Rangfolge Gesetz, Tarifvertrag, Betriebsvereinbarung und Arbeitsvertrag stehen.",
    keypoints: [
      { text: "Rangfolge: Grundgesetz – Gesetz – Tarifvertrag – Betriebsvereinbarung – Arbeitsvertrag", kw: "gesetz|tarifvertrag|betriebsvereinbarung|arbeitsvertrag" },
      { text: "Höhere Ebene setzt Mindeststandards", kw: "mindest|untergrenze|höher|hoeher" },
      { text: "Niedrigere Ebene darf nur günstiger für den Arbeitnehmer sein", kw: "günstig|guenstig|besser|zugunsten" },
      { text: "Beispiel: Gesetz 20 Urlaubstage, Tarifvertrag 30 – es gelten 30", kw: "urlaub|beispiel|tage" }
    ],
    gaps: ["Typische Lücke: Es wird nur die Rangfolge genannt, aber nicht, dass Abweichungen zugunsten des AN erlaubt sind.", "Hinweis: Ein konkretes Beispiel macht die Erklärung für Laien greifbar."],
    model: "Im Arbeitsrecht gibt es eine Treppe von Regeln: oben Grundgesetz und Gesetze, darunter Tarifvertrag, Betriebsvereinbarung und ganz unten dein Arbeitsvertrag. Jede höhere Stufe legt eine Untergrenze fest, die die unteren nicht unterschreiten dürfen. Besser für dich dürfen die unteren Stufen aber immer sein – das ist das Günstigkeitsprinzip. Gibt das Gesetz 20 Urlaubstage vor und der Tarifvertrag 30, bekommst du 30."
  },
  {
    id: "fey-wiso-soziale-marktwirtschaft",
    term: "Soziale Marktwirtschaft",
    part: "WISO",
    topic: "wiso-wirtschaft",
    prompt: "Erkläre einem Laien, was die soziale Marktwirtschaft ausmacht.",
    keypoints: [
      { text: "Freier Wettbewerb und Preisbildung am Markt", kw: "wettbewerb|markt|angebot|nachfrage" },
      { text: "Privateigentum, Vertrags- und Gewerbefreiheit", kw: "eigentum|vertragsfreiheit|gewerbefreiheit|freiheit" },
      { text: "Staat sorgt für sozialen Ausgleich (Sozialversicherung, progressive Steuer)", kw: "sozial|ausgleich|sozialversicherung|steuer" },
      { text: "Staat schützt Wettbewerb (Kartellamt)", kw: "kartell|monopol|wettbewerbsschutz" },
      { text: "Abgrenzung zu freier Markt- und Zentralverwaltungswirtschaft", kw: "freie marktwirtschaft|zentralverwaltung|planwirtschaft" }
    ],
    gaps: ["Typische Lücke: Nur „sozial“ wird erklärt, der Wettbewerbsschutz durch den Staat fehlt.", "Hinweis: Eine Abgrenzung zu den beiden Extremformen zeigt Verständnis."],
    model: "In der sozialen Marktwirtschaft entscheiden grundsätzlich Angebot und Nachfrage, was produziert wird und was es kostet – Unternehmen konkurrieren frei miteinander. Der Staat greift aber ein, wo der Markt unfaire Ergebnisse liefert: Er sorgt mit Sozialversicherung, Kündigungsschutz und höheren Steuern für Gutverdiener für einen Ausgleich. Außerdem verhindert das Kartellamt, dass sich Firmen absprechen oder den Markt beherrschen. Sie liegt damit zwischen der reinen freien Marktwirtschaft und der staatlichen Planwirtschaft."
  },
  {
    id: "fey-wiso-abschreibung",
    term: "Abschreibung (AfA)",
    part: "WISO",
    topic: "wiso-kalkulation",
    prompt: "Erkläre einem Laien, was eine lineare Abschreibung ist und warum Unternehmen abschreiben.",
    keypoints: [
      { text: "Erfasst den Wertverlust von Anlagegütern über die Nutzungsdauer", kw: "wertverlust|nutzungsdauer|abnutzung|wert" },
      { text: "Linear: Anschaffungskosten ÷ Nutzungsdauer pro Jahr", kw: "linear|gleich|anschaffungskosten|geteilt" },
      { text: "Im Anschaffungsjahr monatsgenau", kw: "monatsgenau|pro rata|anteilig" },
      { text: "Mindert den Gewinn und damit die Steuer, ohne Geldabfluss", kw: "gewinn|steuer|aufwand|kein geld" },
      { text: "Geringwertige Wirtschaftsgüter können sofort abgeschrieben werden", kw: "gwg|geringwertig|sofort" }
    ],
    gaps: ["Typische Lücke: Die monatsgenaue Abschreibung im Anschaffungsjahr wird vergessen.", "Hinweis: Erkläre, warum die Abschreibung beim Rückfluss (Amortisation) wieder addiert wird."],
    model: "Kauft eine Firma einen Server für 6.000 €, der sechs Jahre hält, wäre es unfair, die ganzen Kosten nur dem ersten Jahr anzulasten. Deshalb verteilt man sie als Abschreibung auf die Nutzungsdauer – bei linearer Abschreibung 1.000 € pro Jahr, im Kaufjahr nur für die Monate ab Kauf. Die Abschreibung mindert den Gewinn und damit die Steuer, obwohl in diesem Jahr kein Geld fließt. Kleine Anschaffungen (geringwertige Wirtschaftsgüter) dürfen sofort komplett abgeschrieben werden."
  },
  {
    id: "fey-wiso-lieferungsverzug",
    term: "Lieferungsverzug",
    part: "WISO",
    topic: "wiso-vertragsrecht",
    prompt: "Erkläre einem Laien, wann ein Lieferant in Verzug ist und welche Rechte der Käufer dann hat.",
    keypoints: [
      { text: "Voraussetzung: Lieferung fällig, aber nicht erfolgt", kw: "fällig|faellig|nicht geliefert|termin" },
      { text: "Mahnung nötig, außer bei festem Kalendertermin", kw: "mahnung|kalender|fester termin" },
      { text: "Verschulden nur für Schadensersatz erforderlich", kw: "verschulden|schuld|fahrlässig|fahrlaessig" },
      { text: "Ohne Nachfrist: auf Lieferung bestehen + Verzugsschaden", kw: "verzugsschaden|bestehen|weiterhin" },
      { text: "Nach angemessener Nachfrist: Rücktritt und/oder Schadensersatz statt der Leistung", kw: "nachfrist|rücktritt|ruecktritt|schadensersatz statt" }
    ],
    gaps: ["Typische Lücke: Die Nachfrist als Voraussetzung für Rücktritt wird vergessen.", "Hinweis: Beim Fixkauf ist sofortiger Rücktritt möglich."],
    model: "Ein Lieferant ist in Verzug, wenn die Ware fällig ist, er nicht liefert und der Käufer ihn gemahnt hat – bei einem festen Kalendertermin braucht es keine Mahnung. Der Käufer kann dann weiter auf Lieferung bestehen und den Schaden ersetzt verlangen, der durch die Verspätung entsteht. Will er sich vom Vertrag lösen oder bei einem anderen Lieferanten kaufen, muss er in der Regel erst eine letzte Frist setzen. Läuft die ab, darf er zurücktreten oder Schadensersatz statt der Lieferung fordern."
  },
  {
    id: "fey-wiso-befristung",
    term: "Befristeter Arbeitsvertrag",
    part: "WISO",
    topic: "wiso-arbeitsrecht",
    prompt: "Erkläre einem Laien, was bei befristeten Arbeitsverträgen gilt.",
    keypoints: [
      { text: "Befristung nur schriftlich wirksam, sonst unbefristet", kw: "schriftlich|schriftform|unbefristet" },
      { text: "Ohne Sachgrund höchstens 2 Jahre", kw: "2 jahre|zwei jahre|sachgrundlos|ohne sachgrund" },
      { text: "Innerhalb dieser Zeit höchstens dreimal verlängern", kw: "drei|3 mal|dreimal|verlänger|verlaenger" },
      { text: "Mit Sachgrund (z. B. Vertretung, Projekt) ohne Höchstdauer", kw: "sachgrund|vertretung|projekt" },
      { text: "Schutz vor Kettenbefristungen", kw: "kette|missbrauch|schutz" }
    ],
    gaps: ["Typische Lücke: Die Begrenzung auf drei Verlängerungen wird vergessen.", "Hinweis: Erkläre die Folge einer unwirksamen Befristung (unbefristetes Arbeitsverhältnis)."],
    model: "Ein befristeter Vertrag endet automatisch zu einem festen Datum, ohne dass gekündigt werden muss. Damit Firmen das nicht endlos ausnutzen, gilt: Ohne besonderen Grund darf höchstens zwei Jahre befristet und in dieser Zeit maximal dreimal verlängert werden. Gibt es einen sachlichen Grund, etwa eine Elternzeitvertretung, ist auch länger möglich. Wichtig: Die Befristung muss schriftlich vereinbart sein – sonst gilt der Vertrag als unbefristet."
  },
  {
    id: "fey-wiso-beitragsbemessungsgrenze",
    term: "Beitragsbemessungsgrenze",
    part: "WISO",
    topic: "wiso-sozialversicherung",
    prompt: "Erkläre einem Laien, was die Beitragsbemessungsgrenze in der Sozialversicherung bedeutet.",
    keypoints: [
      { text: "Obergrenze des Einkommens, bis zu der Beiträge berechnet werden", kw: "obergrenze|bis zu|höchst|hoechst|grenze" },
      { text: "Einkommen darüber ist beitragsfrei", kw: "beitragsfrei|darüber|darueber|keine beiträge" },
      { text: "Unterschiedliche Grenzen für KV/PV und RV/AV, jährlich angepasst", kw: "unterschiedlich|kranken|renten|jährlich|jaehrlich" },
      { text: "Abgrenzung zur Versicherungspflichtgrenze (Wechsel in private KV)", kw: "versicherungspflichtgrenze|privat|jaeg" }
    ],
    gaps: ["Typische Lücke: Beitragsbemessungsgrenze und Versicherungspflichtgrenze werden verwechselt.", "Hinweis: Ein Rechenbeispiel (Satz × Grenze statt × Brutto) macht es klarer."],
    model: "Sozialversicherungsbeiträge werden als Prozentsatz vom Bruttogehalt berechnet – aber nur bis zu einer bestimmten Höhe, der Beitragsbemessungsgrenze. Wer mehr verdient, zahlt auf den Teil darüber keine Beiträge mehr, der Beitrag bleibt also ab dort gleich. Für Kranken- und Pflegeversicherung gilt eine andere Grenze als für Renten- und Arbeitslosenversicherung, und beide werden jedes Jahr angepasst. Nicht verwechseln mit der Versicherungspflichtgrenze, ab der man in eine private Krankenversicherung wechseln darf."
  },
  {
    id: "fey-wiso-nachhaltigkeit",
    term: "Nachhaltigkeit (Drei-Säulen-Modell)",
    part: "WISO",
    topic: "wiso-wirtschaft",
    prompt: "Erkläre einem Laien, was Nachhaltigkeit nach dem Drei-Säulen-Modell bedeutet, mit Beispielen aus einem IT-Betrieb.",
    keypoints: [
      { text: "Heutige Bedürfnisse befriedigen, ohne künftige Generationen zu gefährden", kw: "künftig|kuenftig|generation|zukunft" },
      { text: "Ökologische Säule: Umwelt/Ressourcen schonen", kw: "ökolog|oekolog|umwelt|energie|ressource" },
      { text: "Ökonomische Säule: wirtschaftlich dauerhaft tragfähig", kw: "ökonom|oekonom|wirtschaftlich|gewinn" },
      { text: "Soziale Säule: faire Arbeit, Gesundheit, Gerechtigkeit", kw: "sozial|fair|gesundheit|mitarbeiter" },
      { text: "IT-Beispiel: Green IT, Virtualisierung, längere Nutzung, Altgeräte richtig entsorgen", kw: "green it|virtualis|refurbish|nutzungsdauer|elektrog" }
    ],
    gaps: ["Typische Lücke: Nachhaltigkeit wird nur als Umweltschutz verstanden – ökonomische und soziale Säule fehlen.", "Hinweis: Konkrete Maßnahmen aus deinem Betrieb machen die Erklärung überzeugend."],
    model: "Nachhaltig handeln heißt, heute so zu wirtschaften, dass auch spätere Generationen noch gut leben können. Das Drei-Säulen-Modell sagt: Umwelt, Wirtschaft und Soziales müssen zusammen betrachtet werden, wie drei Beine eines Hockers. Ein IT-Betrieb kann z. B. Server virtualisieren und Geräte länger nutzen (Umwelt), dabei Kosten sparen (Wirtschaft) und auf gesunde, faire Arbeitsbedingungen achten (Soziales)."
  },
  {
    id: "fey-wiso-gewaehrleistung-garantie",
    term: "Gewährleistung vs. Garantie",
    part: "WISO",
    topic: "wiso-vertragsrecht",
    prompt: "Erkläre einem Laien den Unterschied zwischen Gewährleistung und Garantie.",
    keypoints: [
      { text: "Gewährleistung ist gesetzlich vorgeschrieben", kw: "gesetz|pflicht|vorgeschrieben" },
      { text: "Anspruch richtet sich gegen den Verkäufer, 2 Jahre ab Ablieferung", kw: "verkäufer|verkaeufer|2 jahre|zwei jahre" },
      { text: "Gilt für Mängel, die bei Übergabe schon vorhanden waren", kw: "übergabe|uebergabe|gefahrübergang|von anfang|bereits" },
      { text: "Garantie ist eine freiwillige Zusage, meist des Herstellers", kw: "freiwillig|hersteller|zusage" },
      { text: "Garantie gilt zusätzlich, ersetzt die Gewährleistung nicht", kw: "zusätzlich|zusaetzlich|ersetzt nicht|neben" }
    ],
    gaps: ["Typische Lücke: Man glaubt, die Garantie ersetze die Gewährleistung oder sei gesetzlich vorgeschrieben.", "Hinweis: Nenne den Anspruchsgegner jeweils (Verkäufer vs. Hersteller)."],
    model: "Die Gewährleistung ist dein gesetzliches Recht: Ist eine gekaufte Sache schon beim Kauf mangelhaft, muss der Verkäufer innerhalb von zwei Jahren dafür geradestehen. Die Garantie ist dagegen ein freiwilliges Extra-Versprechen, meist vom Hersteller – zum Beispiel „5 Jahre Garantie auf den Akku“. Was genau sie abdeckt, bestimmt der, der sie gibt. Sie kommt immer zusätzlich zur Gewährleistung dazu und kann diese nicht ersetzen."
  },

  /* =================== Fachgespräch =================== */
  {
    id: "fey-fg-projektauftrag",
    term: "Projektauftrag / Projektantrag",
    part: "FG",
    topic: "fg-projektarbeit",
    prompt: "Erkläre einem Laien, was in einen Projektantrag gehört und wozu er dient.",
    keypoints: [
      { text: "Ausgangssituation (Ist) und Projektziel (Soll)", kw: "ausgangs|ist-zustand|ziel|soll" },
      { text: "Abgrenzung: was gehört nicht zum Projekt", kw: "abgrenz|nicht dazu|umfang" },
      { text: "Phasen mit Zeitplanung (insgesamt max. 80 Stunden)", kw: "phase|zeitplan|80|stunden" },
      { text: "Genehmigung durch den Prüfungsausschuss vor Beginn", kw: "genehmig|prüfungsausschuss|pruefungsausschuss|ihk" },
      { text: "Muss ein echtes Projekt mit eigenen Entscheidungen sein", kw: "entscheid|einmalig|projektmerkmal|keine routine" }
    ],
    gaps: ["Typische Lücke: Die Abgrenzung fehlt – sie verhindert, dass das Projekt ausufert.", "Hinweis: Erkläre, warum ein reines Umsetzen ohne eigene Entscheidungen nicht genehmigt wird."],
    model: "Der Projektantrag ist wie ein Bauplan, den man vor dem Hausbau beim Amt einreicht. Darin steht, wie es heute aussieht, was am Ende erreicht sein soll, was ausdrücklich nicht dazugehört und wie die 80 Stunden auf die Phasen verteilt werden. Der Prüfungsausschuss prüft vorher, ob das Vorhaben ein echtes Projekt ist, in dem man selbst planen und entscheiden muss. Erst nach der Genehmigung darf man loslegen."
  },
  {
    id: "fey-fg-make-or-buy",
    term: "Make-or-Buy-Entscheidung",
    part: "FG",
    topic: "fg-fachgespraech",
    prompt: "Erkläre einem Laien, wie du entschieden hast, ob selbst entwickelt oder eine fertige Software gekauft wird.",
    keypoints: [
      { text: "Abwägung: selbst entwickeln oder Standardsoftware/SaaS kaufen", kw: "selbst|eigenentwicklung|kaufen|standardsoftware|saas" },
      { text: "Kostenvergleich: Lizenzen vs. Entwicklung und Wartung", kw: "kosten|lizenz|wartung|entwicklungskosten" },
      { text: "Anforderungsabdeckung und Integration in bestehende Systeme", kw: "anforderung|schnittstelle|integration|anbindung" },
      { text: "Abhängigkeit vom Anbieter, Datenschutz, Know-how im Team", kw: "abhängig|abhaengig|datenschutz|know-how|anbieter" },
      { text: "Bewertung z. B. per Nutzwertanalyse, begründete Entscheidung", kw: "nutzwert|kriterien|bewert|begründ|begruend" }
    ],
    gaps: ["Typische Lücke: Nur die Kosten werden verglichen, nicht die Anforderungsabdeckung und Abhängigkeiten.", "Hinweis: Nenne konkrete Alternativen aus deinem Projekt."],
    model: "Make-or-Buy ist die Frage: selbst kochen oder Essen bestellen? Ich habe zuerst geschaut, welche fertigen Programme es auf dem Markt gibt, und sie mit einer Eigenentwicklung verglichen – bei Kosten (Lizenzgebühren gegen Entwicklungs- und Wartungsaufwand), bei der Frage, ob sie unsere speziellen Anforderungen und Schnittstellen abdecken, und bei der Abhängigkeit vom Anbieter. Mit einer Nutzwertanalyse habe ich die Kriterien gewichtet und mich dann begründet entschieden."
  },
  {
    id: "fey-fg-soll-ist-vergleich",
    term: "Soll-Ist-Vergleich",
    part: "FG",
    topic: "fg-projektarbeit",
    prompt: "Erkläre einem Laien, was ein Soll-Ist-Vergleich im Projekt ist und warum er wichtig ist.",
    keypoints: [
      { text: "Vergleich von geplanten mit tatsächlichen Werten (Zeit, Ziele, Kosten)", kw: "geplant|tatsächlich|tatsaechlich|plan|ist" },
      { text: "Darstellung als Tabelle je Phase mit Differenz", kw: "tabelle|phase|differenz|abweichung" },
      { text: "Abweichungen begründen", kw: "begründ|begruend|ursache|warum" },
      { text: "Gehört ins Fazit und zeigt Reflexion/Lessons Learned", kw: "fazit|reflex|lessons|lernen|gelernt" }
    ],
    gaps: ["Typische Lücke: Abweichungen werden verschwiegen statt begründet.", "Hinweis: Nicht nur Zeit, auch die Zielerreichung gehört in den Vergleich."],
    model: "Ein Soll-Ist-Vergleich ist wie der Blick aufs Navi nach der Fahrt: Geplant waren 2 Stunden, gebraucht habe ich 2,5 – warum? Im Projekt stelle ich in einer Tabelle für jede Phase die geplanten und die tatsächlichen Stunden gegenüber und prüfe, ob alle Ziele erreicht wurden. Abweichungen erkläre ich ehrlich, zum Beispiel eine unterschätzte Schnittstelle. So zeige ich, dass ich aus dem Projekt gelernt habe."
  },
  {
    id: "fey-fg-amortisation",
    term: "Amortisation im Projekt",
    part: "FG",
    topic: "fg-projektarbeit",
    prompt: "Erkläre einem Laien, was die Amortisationsdauer deines Projekts aussagt und wie du sie berechnet hast.",
    keypoints: [
      { text: "Zeitpunkt, ab dem die Einsparungen die Projektkosten wieder eingespielt haben", kw: "einspar|eingespielt|zurück|zurueck|rechnet sich" },
      { text: "Projektkosten aus Personal- und Sachkosten", kw: "personalkosten|sachkosten|stundensatz|projektkosten" },
      { text: "Laufende Einsparung pro Jahr/Monat minus laufende Kosten", kw: "pro jahr|pro monat|jährlich|jaehrlich|laufend" },
      { text: "Formel: Projektkosten ÷ jährliche Nettoeinsparung", kw: "geteilt|÷|durch|formel" },
      { text: "Annahmen nachvollziehbar belegen (Messung, Befragung)", kw: "annahme|messung|befrag|nachvollziehbar|quelle" }
    ],
    gaps: ["Typische Lücke: Laufende Kosten (Wartung, Hosting) werden von der Einsparung nicht abgezogen.", "Hinweis: Erkläre, woher deine Zahlen stammen – Prüfer fragen gezielt danach."],
    model: "Die Amortisationsdauer sagt, nach wie vielen Monaten sich das Projekt bezahlt gemacht hat – wie bei einer Solaranlage, die irgendwann ihre Anschaffung wieder eingespart hat. Ich habe die Projektkosten aus meinen Stunden mal Stundensatz plus Sachkosten berechnet. Dann habe ich gemessen, wie viel Zeit die neue Lösung pro Vorgang spart, das auf ein Jahr hochgerechnet und die laufenden Kosten abgezogen. Projektkosten geteilt durch diese jährliche Ersparnis ergibt die Amortisationsdauer."
  },
  {
    id: "fey-fg-qualitaetssicherung",
    term: "Qualitätssicherung im Projekt",
    part: "FG",
    topic: "fg-fachgespraech",
    prompt: "Erkläre einem Laien, wie du die Qualität deiner Software sichergestellt hast.",
    keypoints: [
      { text: "Tests auf mehreren Stufen: Unit-, Integrations-, System-, Abnahmetest", kw: "unit|integrationstest|systemtest|abnahme|teststufe" },
      { text: "Testfälle vorab aus Anforderungen ableiten und protokollieren", kw: "testfall|testfälle|protokoll|anforderung" },
      { text: "Code-Reviews und statische Codeanalyse", kw: "review|codeanalyse|linter|sonar|statisch" },
      { text: "Coding-Konventionen/Clean Code, Versionskontrolle", kw: "clean code|konvention|git|versionskontrolle" },
      { text: "Abnahme durch den Auftraggeber gegen die Anforderungen", kw: "auftraggeber|abnahmeprotokoll|fachabteilung|kunde" }
    ],
    gaps: ["Typische Lücke: Qualitätssicherung wird auf „ich habe getestet“ reduziert – konstruktive Maßnahmen (Reviews, Konventionen) fehlen.", "Hinweis: Nenne konkrete Werkzeuge und Ergebnisse aus deinem Projekt."],
    model: "Qualität entsteht nicht erst am Ende, sondern während der ganzen Entwicklung – wie beim Kochen, wo man zwischendurch abschmeckt. Ich habe aus den Anforderungen vorab Testfälle abgeleitet und auf mehreren Ebenen getestet: einzelne Funktionen mit Unit-Tests, das Zusammenspiel mit Integrationstests und am Ende die Abnahme mit dem Auftraggeber. Zusätzlich hat ein Kollege meinen Code gegengelesen, ich habe einheitliche Programmierregeln eingehalten und alles mit Git versioniert."
  },
  {
    id: "fey-fg-stakeholder",
    term: "Stakeholder",
    part: "FG",
    topic: "fg-projektarbeit",
    prompt: "Erkläre einem Laien, wer die Stakeholder deines Projekts waren und warum man sie kennen muss.",
    keypoints: [
      { text: "Alle Personen/Gruppen, die am Projekt beteiligt oder davon betroffen sind", kw: "beteiligt|betroffen|interesse|person" },
      { text: "Beispiele: Auftraggeber, Endanwender, Fachabteilung, IT-Betrieb, Datenschutz/Betriebsrat", kw: "auftraggeber|anwender|nutzer|fachabteilung|betriebsrat|datenschutz" },
      { text: "Unterschiedliche Interessen und Einfluss", kw: "einfluss|unterschiedlich|erwartung|interessen" },
      { text: "Früh einbinden, um Anforderungen zu erheben und Akzeptanz zu sichern", kw: "einbind|früh|frueh|akzeptanz|anforderung" }
    ],
    gaps: ["Typische Lücke: Nur der Auftraggeber wird genannt, Endanwender oder Betriebsrat/Datenschutz fehlen.", "Hinweis: Erkläre, welchen Nutzen eine Stakeholderanalyse für dein Projekt hatte."],
    model: "Stakeholder sind alle, die bei einem Projekt mitreden wollen oder davon betroffen sind – wie bei einem Hausbau der Bauherr, die Nachbarn und das Bauamt. In meinem Projekt waren das zum Beispiel der Auftraggeber, die späteren Anwender, die IT, die das System betreibt, und wegen personenbezogener Daten der Datenschutz. Jeder hat andere Erwartungen und unterschiedlich viel Einfluss. Wer sie früh einbindet, erfasst die Anforderungen vollständig und sorgt dafür, dass das Ergebnis später auch genutzt wird."
  },
  {
    id: "fey-fg-vorgehensmodell",
    term: "Vorgehensmodell (Wasserfall vs. Scrum)",
    part: "FG",
    topic: "fg-fachgespraech",
    prompt: "Erkläre einem Laien, welches Vorgehensmodell du gewählt hast und warum.",
    keypoints: [
      { text: "Wasserfall: Phasen nacheinander, gut planbar", kw: "wasserfall|nacheinander|sequenziell|phase" },
      { text: "Nachteil Wasserfall: unflexibel, Fehler fallen spät auf", kw: "unflexibel|spät|spaet|änderung|aenderung" },
      { text: "Scrum: kurze Iterationen (Sprints), flexibel bei Änderungen", kw: "scrum|sprint|iterativ|agil" },
      { text: "Scrum braucht Team und Rollen (Product Owner, Scrum Master)", kw: "product owner|scrum master|rollen|team" },
      { text: "Wahl begründet nach Projektgröße und Stabilität der Anforderungen", kw: "begründ|begruend|projektgröße|einzelprojekt|anforderungen" }
    ],
    gaps: ["Typische Lücke: Das Modell wird nur beschrieben, aber die Wahl nicht mit dem eigenen Projekt begründet.", "Hinweis: Nenne auch die Nachteile deiner gewählten Methode."],
    model: "Beim Wasserfallmodell arbeitet man Schritt für Schritt wie beim Hausbau: erst planen, dann bauen, dann prüfen. Das ist gut planbar, aber spätere Änderungen sind teuer. Scrum arbeitet in kurzen Runden von wenigen Wochen und liefert immer wieder kleine fertige Stücke – flexibel, braucht aber ein Team mit festen Rollen. Für mein 80-Stunden-Einzelprojekt mit klaren Anforderungen habe ich ein phasenorientiertes Vorgehen gewählt, ergänzt um regelmäßige Abstimmungen mit dem Auftraggeber."
  },
  {
    id: "fey-fg-nutzwertanalyse",
    term: "Nutzwertanalyse",
    part: "FG",
    topic: "fg-fachgespraech",
    prompt: "Erkläre einem Laien, wie eine Nutzwertanalyse funktioniert und wofür du sie eingesetzt hast.",
    keypoints: [
      { text: "Methode zum Vergleich mehrerer Alternativen", kw: "alternative|vergleich|optionen" },
      { text: "Kriterien festlegen und gewichten (Summe 100 %)", kw: "kriteri|gewicht|100" },
      { text: "Alternativen je Kriterium mit Punkten bewerten", kw: "punkte|bewert|note" },
      { text: "Gewichtete Punkte addieren – höchster Nutzwert gewinnt", kw: "addier|summe|multiplizier|höchst|hoechst" },
      { text: "Berücksichtigt auch nicht-monetäre Kriterien", kw: "nicht-monetär|nicht monetär|qualitativ|nicht nur kosten" }
    ],
    gaps: ["Typische Lücke: Die Gewichtung der Kriterien wird vergessen.", "Hinweis: Erwähne, dass die Gewichtung subjektiv ist und begründet werden muss."],
    model: "Eine Nutzwertanalyse hilft, wenn man sich zwischen mehreren Möglichkeiten entscheiden muss – etwa beim Autokauf. Man legt fest, was einem wichtig ist (Preis, Wartbarkeit, Know-how im Team) und wie wichtig, zum Beispiel 40 %, 35 %, 25 %. Dann bekommt jede Alternative pro Kriterium Punkte, diese werden mit der Gewichtung multipliziert und addiert. Die Alternative mit der höchsten Summe ist die beste – und so lassen sich auch Dinge vergleichen, die man nicht in Euro ausdrücken kann."
  }
);
