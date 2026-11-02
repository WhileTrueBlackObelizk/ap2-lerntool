/* AP2-Lerntool – Vorab-Tests: je Thema 3 Ratefragen, mark = wörtliche Stelle im Lernzettel (Format: SCHEMA.md, Abschnitt Paket C) */
window.AP2 = window.AP2 || { topics: [], questions: [], exams: [], generators: [] };
AP2.pretest = AP2.pretest || [];

/* ---- ga1 ---- */
// GA1 – Vorab-Tests (Pretesting): je Thema 3 Ratefragen vor dem Lernzettel
AP2.pretest.push(
  {
    topic: "ga1-projektmanagement",
    questions: [
      { q: "Welche Vorgänge liegen im Netzplan auf dem kritischen Pfad?", options: ["Die Vorgänge mit der längsten Dauer", "Alle Vorgänge mit Gesamtpuffer 0", "Alle Vorgänge mit freiem Puffer größer 0", "Die ersten und letzten Vorgänge"], correct: 1,
        mark: "alle Vorgänge mit GP = 0" },
      { q: "Was bewirkt ein WIP-Limit auf einem Kanban-Board?", options: ["Es legt die Sprintlänge fest", "Es begrenzt die Anzahl der Teammitglieder", "Es begrenzt parallele Arbeit pro Spalte", "Es priorisiert das Backlog"], correct: 2,
        mark: "begrenzt parallele Arbeit pro Spalte" },
      { q: "Der Kunde will das Projekt bei gleichem Umfang früher fertig haben. Was folgt laut magischem Dreieck?", options: ["Die Kosten steigen oder der Umfang sinkt", "Nichts, wenn das Team motiviert ist", "Die Qualität steigt automatisch", "Der kritische Pfad entfällt"], correct: 0,
        mark: "kürzere Zeit → höhere Kosten oder weniger Umfang" }
    ]
  },
  {
    topic: "ga1-anforderungen",
    questions: [
      { q: "Wer erstellt das Pflichtenheft?", options: ["Der Auftraggeber", "Der Auftragnehmer", "Die IHK", "Der Endanwender"], correct: 1,
        mark: "Auftragnehmer" },
      { q: "„Die Suche liefert in 95 % der Fälle Ergebnisse in unter 2 s.“ – Welche Art von Anforderung ist das?", options: ["Funktionale Anforderung", "Randbedingung des Projektbudgets", "Akzeptanzkriterium einer User Story", "Nicht-funktionale Anforderung"], correct: 3,
        mark: "Die Suche liefert in 95 % der Fälle Ergebnisse in" },
      { q: "Was bedeutet „Won't have“ bei der MoSCoW-Priorisierung?", options: ["Wird niemals umgesetzt", "Bewusst nicht in diesem Release", "Nur wenn Budget übrig ist", "Vom Kunden abgelehnt"], correct: 1,
        mark: "bewusst nicht in diesem Release" }
    ]
  },
  {
    topic: "ga1-wirtschaftlichkeit",
    questions: [
      { q: "Wie berechnet man die statische Amortisationsdauer?", options: ["Investition / Rückfluss pro Periode", "Rückfluss / Investition", "Investition × Zinssatz", "Fixkosten / Deckungsbeitrag"], correct: 0,
        mark: "Amortisationsdauer = Investition / jährlicher (monatlicher) Rückfluss" },
      { q: "Welchen Vorteil hat die Nutzwertanalyse gegenüber einem reinen Kostenvergleich?", options: ["Sie ist völlig objektiv", "Sie braucht keine Gewichtung", "Auch nicht-monetäre Kriterien werden vergleichbar", "Sie liefert immer das billigste Angebot"], correct: 2,
        mark: "auch nicht-monetäre Kriterien vergleichbar" },
      { q: "Wie viel Ausfallzeit pro Jahr erlaubt eine Verfügbarkeit von 99,9 %?", options: ["Etwa 52 Minuten", "Etwa 3,6 Tage", "Etwa 87,6 Stunden", "Etwa 8,76 Stunden"], correct: 3,
        mark: "99,9 % pro Jahr ≈ 8,76 h" }
    ]
  },
  {
    topic: "ga1-qualitaet",
    questions: [
      { q: "Welche Werte testet man bei der Grenzwertanalyse?", options: ["Nur Werte in der Mitte der Klasse", "Werte an und direkt neben den Klassengrenzen", "Zufällige Werte", "Nur ungültige Werte"], correct: 1,
        mark: "Werte an und direkt neben den Klassengrenzen" },
      { q: "Wie berechnet man die zyklomatische Komplexität nach McCabe vereinfacht?", options: ["Anzahl Zeilen / 10", "Anzahl Methoden + 1", "Anzahl Entscheidungen + 1", "Anzahl Schleifen × 2"], correct: 2,
        mark: "Anzahl Entscheidungen + 1" },
      { q: "Wie hängen Anweisungsüberdeckung (C0) und Zweigüberdeckung (C1) zusammen?", options: ["C1 schließt C0 ein", "C0 schließt C1 ein", "Sie sind unabhängig voneinander", "Sie sind identisch"], correct: 0,
        mark: "C1 schließt C0 ein" }
    ]
  },
  {
    topic: "ga1-ergonomie",
    questions: [
      { q: "Wie heißt der frühere Grundsatz „Fehlertoleranz“ in der DIN EN ISO 9241-110:2020?", options: ["Fehlerfreiheit", "Robustheit gegen Benutzungsfehler", "Steuerbarkeit", "Benutzerbindung"], correct: 1,
        mark: "Robustheit gegen Benutzungsfehler" },
      { q: "Welches Kontrastverhältnis fordert WCAG (Stufe AA) mindestens für normalen Text?", options: ["2:1", "3:1", "4,5:1", "10:1"], correct: 2,
        mark: "4,5:1" },
      { q: "Wen verpflichtet das Barrierefreiheitsstärkungsgesetz (BFSG) seit Mitte 2025 zusätzlich?", options: ["Nur Bundesbehörden", "Nur Schulen", "Niemanden, es ist eine Empfehlung", "Private Unternehmen bei bestimmten Produkten und Diensten"], correct: 3,
        mark: "private Unternehmen" }
    ]
  },
  {
    topic: "ga1-uml",
    questions: [
      { q: "Was kennzeichnet eine Komposition im Klassendiagramm?", options: ["Teile existieren unabhängig vom Ganzen", "Das Teil ist existenzabhängig vom Ganzen", "Es handelt sich um eine Vererbung", "Es ist eine reine Benutzt-Beziehung"], correct: 1,
        mark: "existenzabhängig, Teil gehört genau zu einem Ganzen" },
      { q: "Wann verwendet man im Use-Case-Diagramm «extend»?", options: ["Wenn ein Ablauf optional bzw. bedingt ausgeführt wird", "Wenn ein Ablauf immer enthalten ist", "Für Vererbung zwischen Akteuren", "Für die Systemgrenze"], correct: 0,
        mark: "optional/bedingt" },
      { q: "An welchem Ende einer Assoziation steht die Multiplizität „0..* Bestellungen eines Kunden“?", options: ["Beim Kunden", "In der Mitte der Linie", "Beim gegenüberliegenden Ende, also bei Bestellung", "Gar nicht, nur in der Beschriftung"], correct: 2,
        mark: "gegenüberliegenden" }
    ]
  },
  {
    topic: "ga1-architektur",
    questions: [
      { q: "Was bedeutet „idempotent“ bei HTTP-Methoden?", options: ["Die Methode ändert nie Daten", "Die Antwort wird immer gecacht", "Die Methode ist verschlüsselt", "Mehrfaches Ausführen wirkt wie einmaliges"], correct: 3,
        mark: "mehrfaches Ausführen hat dieselbe Wirkung wie einmaliges" },
      { q: "Ein angemeldeter Benutzer ruft eine Ressource ohne ausreichende Rechte ab. Welcher Statuscode passt?", options: ["401 Unauthorized", "403 Forbidden", "404 Not Found", "500 Internal Server Error"], correct: 1,
        mark: "403 Forbidden (keine Berechtigung)" },
      { q: "Ist der Payload eines signierten JWT verschlüsselt?", options: ["Ja, immer mit AES", "Ja, mit dem privaten Schlüssel", "Nein, nur kodiert und signiert", "Nur bei HTTPS"], correct: 2,
        mark: "nicht verschlüsselt" }
    ]
  },
  {
    topic: "ga1-datenmodell",
    questions: [
      { q: "Was verbietet die 3. Normalform?", options: ["Ein Nichtschlüsselattribut hängt von einem anderen Nichtschlüsselattribut ab", "Zusammengesetzte Primärschlüssel", "Fremdschlüssel", "Mehr als 10 Spalten"], correct: 0,
        mark: "Nichtschlüsselattribut hängt von anderem Nichtschlüsselattribut ab" },
      { q: "Wohin gehört das Attribut „Menge“ bei einer n:m-Beziehung Bestellung – Artikel?", options: ["In die Tabelle Bestellung", "In die Tabelle Artikel", "In eine eigene Tabelle Menge", "In die Zwischentabelle"], correct: 3,
        mark: "Beziehungsattribute (Menge, Datum) gehören in die Zwischentabelle" },
      { q: "Warum speichert man eine deutsche PLZ nicht als INT?", options: ["INT ist zu langsam", "Die führende Null ginge verloren", "INT erlaubt keine Indizes", "PLZ sind Fremdschlüssel"], correct: 1,
        mark: "PLZ als CHAR(5), nicht INT – führende Null!" }
    ]
  },
  {
    topic: "ga1-sicherheit",
    questions: [
      { q: "Innerhalb welcher Frist muss eine Datenpanne der Aufsichtsbehörde gemeldet werden?", options: ["24 Stunden", "72 Stunden", "7 Tage", "30 Tage"], correct: 1,
        mark: "72 Stunden" },
      { q: "Wofür dient ein Salt beim Speichern von Passwort-Hashes?", options: ["Er verschlüsselt das Passwort umkehrbar", "Er ersetzt die Hashfunktion", "Er macht vorberechnete Rainbow Tables nutzlos", "Er wird geheim außerhalb der DB gehalten"], correct: 2,
        mark: "zufällig je Nutzer, in DB gespeichert) gegen Rainbow Tables" },
      { q: "Welche Sicherungen braucht man zur Wiederherstellung bei differenzieller Sicherung?", options: ["Vollsicherung + letzte differenzielle Sicherung", "Nur die letzte differenzielle Sicherung", "Vollsicherung + alle differenziellen Sicherungen", "Alle Sicherungen der letzten 30 Tage"], correct: 0,
        mark: "Restore braucht Voll + letzte Differenzielle" }
    ]
  },
  {
    topic: "ga1-devops",
    questions: [
      { q: "Was macht git pull standardmäßig?", options: ["Nur herunterladen, nichts zusammenführen", "Lokale Commits hochladen", "Einen neuen Branch anlegen", "Herunterladen und zusammenführen (fetch + merge)"], correct: 3,
        mark: "= fetch + merge" },
      { q: "Was unterscheidet einen Container grundlegend von einer virtuellen Maschine?", options: ["Container teilen sich den Kernel des Host-Betriebssystems", "Container haben ein eigenes Gast-OS", "Container laufen nur in der Cloud", "Container sind stärker isoliert"], correct: 0,
        mark: "teilen sich den Kernel des Host-OS" },
      { q: "Was kennzeichnet ein Canary-Release?", options: ["Zwei identische Umgebungen mit Umschalten", "Alle Server werden gleichzeitig aktualisiert", "Die neue Version geht erst an einen kleinen Nutzeranteil", "Die alte Version läuft dauerhaft parallel"], correct: 2,
        mark: "neue Version erst für kleinen Nutzeranteil" }
    ]
  }
);

/* ---- ga2algo ---- */
// Paket C: Vorab-Tests (Pretesting) je Thema für GA2 Algorithmen
AP2.pretest.push(
  {
    topic: "ga2-pseudocode",
    questions: [
      { q: "Welche Schleifenart wird garantiert mindestens einmal durchlaufen?",
        options: ["Kopfgesteuerte Schleife (solange)", "Fußgesteuerte Schleife (wiederhole … bis)", "Zählschleife (für)", "Keine – das hängt immer von den Daten ab"], correct: 1,
        mark: "fußgesteuert (mind. 1 Durchlauf)" },
      { q: "Womit sollte man die Variable max initialisieren, wenn man das Maximum eines Arrays sucht?",
        options: ["Mit dem ersten Element des Arrays", "Mit 0", "Mit −1", "Mit der Länge des Arrays"], correct: 0,
        mark: "(nicht mit 0 – Falle bei negativen Werten!)" },
      { q: "Was ist in einem Struktogramm (Nassi-Shneiderman) nicht erlaubt?",
        options: ["Verschachtelte Schleifen", "Mehrfachauswahl", "Sprünge mit goto", "Fußgesteuerte Schleifen"], correct: 2,
        mark: "kein goto" }
    ]
  },
  {
    topic: "ga2-sortieren-suchen",
    questions: [
      { q: "Was muss gelten, damit man die binäre Suche verwenden darf?",
        options: ["Das Array darf keine Duplikate enthalten", "Das Array muss sortiert sein", "Das Array muss eine Zweierpotenz an Elementen haben", "Das Array muss kleiner als 1000 Elemente sein"], correct: 1,
        mark: "Voraussetzung sortiertes Array" },
      { q: "Was bedeutet es, wenn ein Sortierverfahren „stabil“ ist?",
        options: ["Es stürzt bei großen Datenmengen nicht ab", "Es braucht keinen Zusatzspeicher", "Es hat immer dieselbe Laufzeit", "Gleiche Schlüssel behalten ihre ursprüngliche Reihenfolge"], correct: 3,
        mark: "gleiche Schlüssel behalten ihre ursprüngliche Reihenfolge" },
      { q: "Welches Verfahren sortiert in jedem Fall in O(n log n)?",
        options: ["Quick Sort", "Merge Sort", "Insertion Sort", "Bubble Sort"], correct: 1,
        mark: "Immer O(n log n), stabil, braucht O(n) Zusatzspeicher" }
    ]
  },
  {
    topic: "ga2-rekursion",
    questions: [
      { q: "Was passiert typischerweise, wenn eine rekursive Funktion ihren Anker nie erreicht?",
        options: ["Sie liefert 0 zurück", "Der Compiler meldet einen Syntaxfehler", "Das Programm bricht mit einem StackOverflowError ab", "Sie läuft einfach unendlich weiter ohne Speicherbedarf"], correct: 2,
        mark: "StackOverflowError" },
      { q: "Wie viele Züge braucht man bei den Türmen von Hanoi mit n Scheiben?",
        options: ["n²", "2^n − 1", "2 · n", "n · log n"], correct: 1,
        mark: "2^n − 1 Züge" },
      { q: "Wie vermeidet man, dass eine Rekursion dieselben Teilergebnisse immer wieder neu berechnet?",
        options: ["Memoisierung (Zwischenergebnisse speichern)", "Mehr Rekursionsanker einbauen", "Den Stack vergrößern", "Die Parameter als static deklarieren"], correct: 0,
        mark: "Memoisierung" }
    ]
  },
  {
    topic: "ga2-datenstrukturen",
    questions: [
      { q: "Welche Datenstruktur passt zu Druckaufträgen, die in Eingangsreihenfolge abgearbeitet werden?",
        options: ["Stack", "Binärbaum", "Hash-Tabelle", "Queue"], correct: 3,
        mark: "Queue (Warteschlange, FIFO)" },
      { q: "Welche Traversierung liefert die Schlüssel eines binären Suchbaums sortiert?",
        options: ["Preorder", "Inorder", "Postorder", "Keine – dazu muss man sortieren"], correct: 1,
        mark: "bei BST sortiert!" },
      { q: "Wie schnell ist das Suchen in einer Hash-Tabelle im Mittel?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"], correct: 0,
        mark: "Suchen/Einfügen im Mittel O(1)" }
    ]
  },
  {
    topic: "ga2-oop",
    questions: [
      { q: "Wann wird bei Polymorphie entschieden, welche überschriebene Methode ausgeführt wird?",
        options: ["Beim Kompilieren", "Zur Laufzeit", "Beim Laden der Klasse", "Beim Schreiben des Codes durch den Entwickler"], correct: 1,
        mark: "zur Laufzeit wird die überschriebene Methode aufgerufen (dynamisches Binden)" },
      { q: "Wie viele Interfaces kann eine Java-Klasse implementieren?",
        options: ["Genau eines", "Höchstens zwei", "Mehrere", "Keines, wenn sie schon eine Oberklasse hat"], correct: 2,
        mark: "eine Klasse kann mehrere Interfaces implementieren (Java: nur eine Oberklasse)" },
      { q: "Welcher Konstruktor läuft beim Erzeugen eines Unterklassenobjekts zuerst?",
        options: ["Der Konstruktor der Unterklasse", "Der Konstruktor der Oberklasse", "Beide gleichzeitig", "Nur der Unterklassen-Konstruktor, die Oberklasse wird übersprungen"], correct: 1,
        mark: "Konstruktor der Oberklasse wird zuerst ausgeführt" }
    ]
  },
  {
    topic: "ga2-komplexitaet",
    questions: [
      { q: "Eine äußere Schleife läuft n-mal, die innere immer genau 10-mal. Welche Komplexität ergibt sich?",
        options: ["O(n²)", "O(10n²)", "O(n)", "O(log n)"], correct: 2,
        mark: "Anzahl (z. B. 10) → O(n)!" },
      { q: "Ein O(n²)-Algorithmus bekommt doppelt so viele Daten. Wie ändert sich die Laufzeit ungefähr?",
        options: ["Sie verdoppelt sich", "Sie vervierfacht sich", "Sie bleibt gleich", "Sie verachtfacht sich"], correct: 1,
        mark: "n verdoppeln → Zeit ×4" },
      { q: "Eine Schleifenvariable wird in jedem Durchlauf verdoppelt, bis sie n erreicht. Welche Komplexität hat die Schleife?",
        options: ["O(log n)", "O(n)", "O(2ⁿ)", "O(n²)"], correct: 0,
        mark: "→ O(log n)." }
    ]
  },
  {
    topic: "ga2-zahlensysteme",
    questions: [
      { q: "Was passiert in Java bei byte b = 127; b++?",
        options: ["Es wird eine Exception geworfen", "b bleibt 127", "b wird −128", "b wird 128"], correct: 2,
        mark: "127 + 1 als byte = −128 (Wrap-around, kein Fehler!)" },
      { q: "Warum ist 0.1 + 0.2 == 0.3 in Java falsch?",
        options: ["Weil 0,1 im Binärsystem periodisch ist und gerundet wird", "Weil Java Kommazahlen abschneidet", "Weil == bei Zahlen die Referenz vergleicht", "Weil double nur ganze Zahlen exakt speichert"], correct: 0,
        mark: "Viele Dezimalbrüche (0,1!) sind binär periodisch" },
      { q: "Wie viele Byte belegt das Eurozeichen in UTF-8?",
        options: ["1 Byte", "2 Byte", "3 Byte", "4 Byte"], correct: 2,
        mark: "ä = 2 Byte, € = 3 Byte" }
    ]
  },
  {
    topic: "ga2-exceptions-formate",
    questions: [
      { q: "Wann wird ein finally-Block ausgeführt?",
        options: ["Nur wenn keine Exception auftritt", "Nur wenn eine Exception gefangen wurde", "Immer – auch bei return im try-Block", "Nur wenn kein catch-Block passt"], correct: 2,
        mark: "finally: läuft IMMER (auch bei rückgabe)" },
      { q: "Was unterscheidet ein gültiges (valides) von einem nur wohlgeformten XML-Dokument?",
        options: ["Es ist kleiner", "Es entspricht zusätzlich einer DTD bzw. einem XML-Schema", "Es enthält keine Attribute", "Es ist in UTF-8 kodiert"], correct: 1,
        mark: "= zusätzlich konform zu einer" },
      { q: "Erkennt der Datums-Regex für TT.MM.JJJJ, dass der 31.02. ungültig ist?",
        options: ["Ja, Regex prüfen auch den Kalender", "Nur in Schaltjahren", "Ja, wegen des Ausdrucks 3[01]", "Nein, ein Regex prüft nur das Format"], correct: 3,
        mark: "(prüft nur Format, nicht 31.02.!)" }
    ]
  }
);

/* ---- ga2sql ---- */
AP2.pretest.push(
  {
    topic: "ga2-sql-ddl",
    questions: [
      { q: "Was legst du mit DDL-Befehlen wie CREATE TABLE fest?", options: ["Die Datensätze einer Tabelle", "Die Struktur der Datenbank", "Die Zugriffsrechte der Benutzer", "Die Reihenfolge der Ausgabe"], correct: 1,
        mark: "der Datenbank festgelegt (nicht die Daten)" },
      { q: "Welche Werte darf eine Fremdschlüsselspalte enthalten?", options: ["Beliebige Werte desselben Datentyps", "Nur Werte, die es in der Zieltabelle gibt (oder NULL)", "Nur fortlaufende Zahlen", "Nur Werte, die in der eigenen Tabelle eindeutig sind"], correct: 1,
        mark: "referenzielle Integrität – nur Werte, die in der Zieltabelle existieren" },
      { q: "Welcher Datentyp eignet sich am besten für Geldbeträge?", options: ["FLOAT", "VARCHAR", "INTEGER", "DECIMAL"], correct: 3,
        mark: "Geldbeträge nicht als FLOAT (Rundungsfehler), sondern DECIMAL." }
    ]
  },
  {
    topic: "ga2-sql-select",
    questions: [
      { q: "Warum kannst du einen Spaltenalias aus dem SELECT nicht in der WHERE-Klausel verwenden?", options: ["Aliase sind nur bei Zahlenspalten erlaubt", "WHERE wird logisch vor SELECT ausgeführt", "WHERE akzeptiert nur Tabellennamen", "Das geht doch, es ist erlaubt"], correct: 1,
        mark: "Darum kann ein Spaltenalias aus SELECT nicht in WHERE verwendet werden" },
      { q: "Was liefert WHERE email = NULL?", options: ["Alle Zeilen ohne E-Mail", "Alle Zeilen mit E-Mail", "Keine Zeile", "Einen Syntaxfehler"], correct: 2,
        mark: "(ergibt UNKNOWN → keine Zeile)" },
      { q: "Was gilt, wenn AND und OR ohne Klammern gemischt werden?", options: ["AND bindet stärker als OR", "OR bindet stärker als AND", "Es wird strikt von links nach rechts ausgewertet", "Die Abfrage ist ungültig"], correct: 0,
        mark: "bindet stärker als" }
    ]
  },
  {
    topic: "ga2-sql-join",
    questions: [
      { q: "Welche Zeilen liefert ein INNER JOIN?", options: ["Alle Zeilen der linken Tabelle", "Jede Zeile mit jeder Zeile", "Alle Zeilen beider Tabellen", "Nur Zeilen mit Partner in beiden Tabellen"], correct: 3,
        mark: "INNER JOIN: nur Zeilen mit Partner in beiden Tabellen" },
      { q: "Was steht bei einem LEFT JOIN in den Spalten der rechten Tabelle, wenn kein Partner existiert?", options: ["0 bzw. Leerstring", "NULL", "Die Zeile fällt weg", "Der Wert der vorherigen Zeile"], correct: 1,
        mark: "alle Zeilen der linken Tabelle, fehlender Partner = NULL" },
      { q: "Was passiert, wenn du bei einem LEFT JOIN in WHERE eine Bedingung auf die rechte Tabelle setzt?", options: ["Nichts, das Ergebnis ist gleich", "Es entsteht ein kartesisches Produkt", "Der LEFT JOIN verhält sich faktisch wie ein INNER JOIN", "Es gibt einen Syntaxfehler"], correct: 2,
        mark: "macht den LEFT JOIN faktisch zum INNER JOIN" }
    ]
  },
  {
    topic: "ga2-sql-aggregat",
    questions: [
      { q: "Du zählst Kurse inkl. solcher ohne Buchung per LEFT JOIN mit COUNT(*). Was steht bei einem Kurs ohne Buchung?", options: ["0", "1", "NULL", "Der Kurs fehlt"], correct: 1,
        mark: "das würde 1 statt 0 liefern" },
      { q: "Welche Spalten im SELECT müssen bei einer Gruppierung im GROUP BY stehen?", options: ["Nur die erste Spalte", "Alle Spalten, die nicht in einer Aggregatfunktion stehen", "Nur Spalten mit Aggregatfunktion", "Keine, GROUP BY ist unabhängig vom SELECT"], correct: 1,
        mark: "Jede Spalte im SELECT, die nicht in einer Aggregatfunktion steht, muss im " },
      { q: "Wann filtert HAVING?", options: ["Vor dem FROM", "Vor der Gruppierung, auf einzelne Zeilen", "Nach ORDER BY", "Nach der Gruppierung, auf Gruppen"], correct: 3,
        mark: "nach der Gruppierung, auf Gruppen" }
    ]
  },
  {
    topic: "ga2-sql-subquery",
    questions: [
      { q: "Was kennzeichnet eine korrelierte Unterabfrage?", options: ["Sie steht immer in der FROM-Klausel", "Sie verwendet eine Spalte der äußeren Abfrage", "Sie liefert immer genau einen Wert", "Sie verbindet zwei Abfragen mit UNION"], correct: 1,
        mark: "Unterabfrage verwendet eine Spalte der äußeren Abfrage" },
      { q: "Die Unterabfrage hinter NOT IN liefert auch einen NULL-Wert. Was ist das Ergebnis?", options: ["Ein leeres Ergebnis", "Alle Zeilen", "Eine Fehlermeldung", "NULL wird einfach ignoriert"], correct: 0,
        mark: "nie TRUE → leeres Ergebnis" },
      { q: "Worin unterscheidet sich UNION von UNION ALL?", options: ["UNION ALL entfernt Duplikate", "UNION verlangt keine gleiche Spaltenanzahl", "UNION entfernt Duplikate", "Es gibt keinen Unterschied"], correct: 2,
        mark: "entfernt Duplikate (Sortieraufwand)" }
    ]
  },
  {
    topic: "ga2-sql-dml",
    questions: [
      { q: "Was bewirkt DELETE FROM kunde; ohne WHERE-Klausel?", options: ["Fehlermeldung wegen fehlender Bedingung", "Die Tabelle wird samt Struktur entfernt", "Nur die erste Zeile wird gelöscht", "Alle Zeilen werden gelöscht, die Tabelle bleibt"], correct: 3,
        mark: "Zeilen (Tabelle bleibt bestehen)" },
      { q: "In welcher Reihenfolge löschst du Bestellung und Bestellpositionen ohne ON DELETE CASCADE?", options: ["Erst die Bestellung, dann die Positionen", "Erst die Positionen, dann die Bestellung", "Die Reihenfolge ist egal", "Beides geht nur mit DROP TABLE"], correct: 1,
        mark: "löschen (Bestellpositionen vor Bestellung), sonst FK-Verletzung" },
      { q: "Womit trennst du mehrere Zuweisungen in UPDATE … SET?", options: ["Mit Komma", "Mit AND", "Mit Semikolon", "Mit OR"], correct: 0,
        mark: "Bei UPDATE mehrere Spalten mit Komma trennen" }
    ]
  },
  {
    topic: "ga2-sql-transaktionen",
    questions: [
      { q: "Welche ACID-Eigenschaft bedeutet „alles oder nichts“?", options: ["Konsistenz", "Isolation", "Atomarität", "Dauerhaftigkeit"], correct: 2,
        mark: "(Atomarität): alles oder nichts." },
      { q: "Was macht das DBMS, wenn zwei Transaktionen gegenseitig auf ihre Sperren warten (Deadlock)?", options: ["Es wartet unbegrenzt", "Es bricht eine der Transaktionen ab", "Es führt beide gleichzeitig aus", "Es löscht die gesperrten Zeilen"], correct: 1,
        mark: "DBMS bricht eine Transaktion ab" },
      { q: "Warum schützen Prepared Statements vor SQL-Injection?", options: ["Sie verschlüsseln die Datenbank", "Sie verbieten Sonderzeichen in Eingaben", "Sie laufen nur mit Administratorrechten", "Parameter werden getrennt vom SQL-Code übertragen"], correct: 3,
        mark: "Parameter werden getrennt vom SQL-Code übertragen" }
    ]
  }
);

/* ---- wisofg ---- */
// Paket C – Vorab-Tests (Pretesting) für WiSo und Fachgespräch: je Topic genau 3 Ratefragen
AP2.pretest.push(
  {
    topic: "wiso-ausbildung",
    questions: [
      { q: "Wie lang darf die Probezeit in einer Berufsausbildung höchstens sein?", options: ["2 Wochen", "6 Monate", "4 Monate", "3 Monate"], correct: 2,
        mark: "mind. 1, höchstens 4 Monate" },
      { q: "Wann endet die Ausbildung, wenn du die Abschlussprüfung vorzeitig bestehst?", options: ["Mit Bekanntgabe des Bestehens", "Erst am vertraglichen Ende", "Am Monatsende nach der Prüfung", "Mit Erhalt des Zeugnisses per Post"], correct: 0,
        mark: "vorher mit Bekanntgabe des Bestehens" },
      { q: "Welcher Anteil des Gesamtergebnisses entfällt bei FIAE auf Teil 1 der Abschlussprüfung?", options: ["10 %", "50 %", "30 %", "20 %"], correct: 3,
        mark: "(Einrichten eines IT-gestützten Arbeitsplatzes)" }
    ]
  },
  {
    topic: "wiso-arbeitsrecht",
    questions: [
      { q: "Ab welcher Betriebsgröße gilt das Kündigungsschutzgesetz?", options: ["Ab 5 Arbeitnehmern", "Bei mehr als 10 Arbeitnehmern", "Ab 20 Arbeitnehmern", "In jedem Betrieb"], correct: 1,
        mark: "mehr als 10 AN" },
      { q: "In welcher Form muss eine Kündigung des Arbeitsverhältnisses erfolgen?", options: ["Per E-Mail genügt", "Mündlich vor Zeugen", "Schriftlich mit eigenhändiger Unterschrift", "In beliebiger Textform"], correct: 2,
        mark: "eigenhändige Unterschrift, keine E-Mail/WhatsApp/elektronische Form" },
      { q: "Wie viele Urlaubstage stehen dir gesetzlich mindestens bei einer 5-Tage-Woche zu?", options: ["24 Arbeitstage", "30 Arbeitstage", "25 Arbeitstage", "20 Arbeitstage"], correct: 3,
        mark: "20 Arbeitstage" }
    ]
  },
  {
    topic: "wiso-tarif-mitbestimmung",
    questions: [
      { q: "Wie viel Zustimmung braucht eine Urabstimmung, damit gestreikt werden kann?", options: ["Mind. 75 % der Gewerkschaftsmitglieder", "Einfache Mehrheit", "Mind. 25 %", "Zustimmung des Betriebsrats"], correct: 0,
        mark: "der Gewerkschaftsmitglieder für Streik" },
      { q: "Ab wie vielen ständigen wahlberechtigten Arbeitnehmern kann ein Betriebsrat gewählt werden?", options: ["Ab 20", "Ab 5", "Ab 10", "Ab 50"], correct: 1,
        mark: "mind. 5 ständigen wahlberechtigten AN" },
      { q: "Was passiert, wenn der Arbeitgeber vor einer Kündigung den Betriebsrat nicht anhört?", options: ["Nichts, die Anhörung ist freiwillig", "Er muss ein Bußgeld zahlen", "Die Kündigung ist unwirksam", "Die Kündigungsfrist verlängert sich"], correct: 2,
        mark: "Anhörung vor jeder Kündigung (§ 102)" }
    ]
  },
  {
    topic: "wiso-sozialversicherung",
    questions: [
      { q: "Wer zahlt die Beiträge zur gesetzlichen Unfallversicherung?", options: ["Arbeitgeber und Arbeitnehmer je zur Hälfte", "Der Staat aus Steuern", "Nur der Arbeitnehmer", "Nur der Arbeitgeber"], correct: 3,
        mark: "(nach Lohnsumme und Gefahrklasse)" },
      { q: "Was bedeutet die Beitragsbemessungsgrenze?", options: ["Einkommen oberhalb der Grenze ist beitragsfrei", "Darunter zahlt man keine Beiträge", "Ab dieser Grenze ist man nicht mehr versichert", "Sie begrenzt die Höhe der Rente"], correct: 0,
        mark: "Einkommen oberhalb ist" },
      { q: "Wohin wendest du dich zuerst, wenn du mit einem Bescheid der Rentenversicherung nicht einverstanden bist?", options: ["Arbeitsgericht", "Widerspruch beim Träger", "Bundessozialgericht", "Betriebsrat"], correct: 1,
        mark: "Widerspruch beim Träger" }
    ]
  },
  {
    topic: "wiso-unternehmen",
    questions: [
      { q: "Wie hoch ist das Mindest-Stammkapital einer GmbH?", options: ["1 €", "50.000 €", "25.000 €", "12.500 €"], correct: 2,
        mark: "25.000 € Stammkapital" },
      { q: "Mit welchem Zusatz unterschreibt ein Prokurist?", options: ["„i. A.“", "„i. V.“", "„gez.“", "„ppa.“"], correct: 3,
        mark: "„ppa.“" },
      { q: "Welches Organ bestellt und überwacht den Vorstand einer AG?", options: ["Der Aufsichtsrat", "Die Hauptversammlung", "Der Betriebsrat", "Das Handelsregister"], correct: 0,
        mark: "(bestellt/kontrolliert Vorstand)" }
    ]
  },
  {
    topic: "wiso-vertragsrecht",
    questions: [
      { q: "Ist ein Produkt im Online-Shop rechtlich schon ein verbindliches Angebot?", options: ["Ja, der Händler muss liefern", "Nein, es ist eine Aufforderung zur Abgabe eines Angebots", "Nur, wenn ein Preis angegeben ist", "Nur bei Verbrauchern"], correct: 1,
        mark: "Aufforderung zur Abgabe eines Angebots" },
      { q: "Welches Recht muss ein Käufer bei einer mangelhaften Lieferung grundsätzlich zuerst geltend machen?", options: ["Rücktritt", "Minderung", "Nacherfüllung", "Schadensersatz"], correct: 2,
        mark: "vorrangig Nacherfüllung" },
      { q: "Wie lange beträgt die regelmäßige Verjährungsfrist?", options: ["3 Jahre ab Jahresende", "2 Jahre ab Vertragsschluss", "30 Jahre", "1 Jahr ab Fälligkeit"], correct: 0,
        mark: "Schluss des Jahres" }
    ]
  },
  {
    topic: "wiso-wirtschaft",
    questions: [
      { q: "Was ist das vorrangige Ziel der Europäischen Zentralbank?", options: ["Vollbeschäftigung", "Hohes Wirtschaftswachstum", "Starker Euro gegenüber dem Dollar", "Preisniveaustabilität (ca. 2 % Inflation)"], correct: 3,
        mark: "Preisniveaustabilität: 2 % Inflation mittelfristig" },
      { q: "Wer gewinnt typischerweise bei Inflation?", options: ["Sparer", "Schuldner", "Gläubiger", "Rentner mit fester Rente"], correct: 1,
        mark: "Schuldner gewinnen" },
      { q: "Was steht an der Spitze der Abfallhierarchie?", options: ["Recycling", "Energetische Verwertung", "Vermeidung", "Beseitigung"], correct: 2,
        mark: "1. Vermeidung" }
    ]
  },
  {
    topic: "wiso-kalkulation",
    questions: [
      { q: "Wie berechnet man die Break-even-Menge?", options: ["Fixkosten ÷ Deckungsbeitrag je Stück", "Umsatz ÷ Gesamtkosten", "Variable Kosten ÷ Preis", "Gewinn ÷ Fixkosten"], correct: 0,
        mark: "Break-even-Menge" },
      { q: "Wie hoch ist die kurzfristige Preisuntergrenze?", options: ["Die Stückselbstkosten", "Der Listenverkaufspreis", "Die Fixkosten je Stück", "Die variablen Stückkosten"], correct: 3,
        mark: "Kurzfristige Preisuntergrenze" },
      { q: "Wovon wird der Liefererskonto in der Bezugskalkulation berechnet?", options: ["Vom Listeneinkaufspreis", "Vom Zieleinkaufspreis (nach Rabatt)", "Vom Bezugspreis", "Vom Bruttopreis"], correct: 1,
        mark: "Liefererskonto (% vom ZEP)" }
    ]
  },
  {
    topic: "wiso-arbeitsschutz",
    questions: [
      { q: "Wer ist für die Gefährdungsbeurteilung im Betrieb verantwortlich?", options: ["Der Betriebsrat", "Der Sicherheitsbeauftragte", "Der Arbeitgeber", "Die Berufsgenossenschaft"], correct: 2,
        mark: "AG ist verantwortlich und trägt die Kosten" },
      { q: "Welche Farbe und Form hat ein Gebotszeichen?", options: ["Blau und rund", "Rot und rund", "Gelb und dreieckig", "Grün und rechteckig"], correct: 0,
        mark: "blau, rund" },
      { q: "Wie viel Beleuchtungsstärke braucht ein Büroarbeitsplatz mindestens?", options: ["200 Lux", "300 Lux", "1.000 Lux", "500 Lux"], correct: 3,
        mark: "Arbeitsstätte (ASR): Büro mind." }
    ]
  },
  {
    topic: "fg-projektarbeit",
    questions: [
      { q: "Wie viele Stunden stehen dir für die betriebliche Projektarbeit (FIAE) höchstens zur Verfügung?", options: ["40 Stunden", "80 Stunden", "70 Stunden", "120 Stunden"], correct: 1,
        mark: "max. 80 Stunden" },
      { q: "Wie lange dauern Präsentation und Fachgespräch zusammen höchstens?", options: ["15 Minuten", "45 Minuten", "30 Minuten", "60 Minuten"], correct: 2,
        mark: "höchstens 30 Minuten" },
      { q: "Was gehört unbedingt ins Fazit der Projektdokumentation?", options: ["Ein Soll-Ist-Vergleich", "Der vollständige Quellcode", "Das Benutzerhandbuch", "Die Lebensläufe der Beteiligten"], correct: 0,
        mark: "(Zeit, Ziele), Lessons Learned, Ausblick" }
    ]
  },
  {
    topic: "fg-fachgespraech",
    questions: [
      { q: "Wovon gehen die Fragen im Fachgespräch in der Regel aus?", options: ["Von einem festen Fragenkatalog der IHK", "Von deinem eigenen Projekt", "Von der WiSo-Prüfung", "Von den Noten aus der Berufsschule"], correct: 1,
        mark: "Fragen gehen vom Projekt aus" },
      { q: "Wie solltest du eine Antwort im Fachgespräch aufbauen?", options: ["Erst ausführlich Hintergründe, dann das Ergebnis", "Nur mit Fachbegriffen ohne Beispiel", "Möglichst lang reden, um Zeit zu füllen", "Kernaussage zuerst, dann Begründung, dann Beispiel aus dem Projekt"], correct: 3,
        mark: "konkretes Beispiel aus dem Projekt" },
      { q: "Wie reagierst du am besten auf eine Frage, deren Antwort du nicht kennst?", options: ["Ehrlich sein und laut herleiten", "Schnell etwas Plausibles raten", "Auf ein anderes Thema ausweichen", "Schweigen und abwarten"], correct: 0,
        mark: "Bezug zu Bekanntem herstellen" }
    ]
  }
);
