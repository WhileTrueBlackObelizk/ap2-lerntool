/* AP2-Lerntool – Warum-Begründungen (Musterbegründung + Kernpunkte) je Frage-ID (Format: SCHEMA.md, Abschnitt Paket C) */
window.AP2 = window.AP2 || { topics: [], questions: [], exams: [], generators: [] };
AP2.why = AP2.why || [];

/* ---- ga1 ---- */
// GA1 – Musterbegründungen („Warum ist das so?“) zu ausgewählten Aufgaben
AP2.why.push(
  /* ---------- Projektmanagement ---------- */
  {
    id: "ga1-projektmanagement-001",
    why: "Ein Projekt ist ein einmaliges, zeitlich begrenztes Vorhaben mit eigenem Ziel und eigener Organisation. Die tägliche Datensicherung wiederholt sich dauerhaft gleich und gehört deshalb zur Linien- bzw. Routinetätigkeit.",
    keypoints: ["Projekt = einmalig, zeitlich begrenzt, klares Ziel", "Routine wiederholt sich ohne Ende", "Linientätigkeit ist kein Projekt"]
  },
  {
    id: "ga1-projektmanagement-003",
    why: "Zeit, Kosten und Leistung hängen im magischen Dreieck voneinander ab: Wird eine Ecke verschärft (kürzere Zeit), muss eine andere nachgeben – mehr Ressourcen (Kosten) oder weniger Umfang/Qualität.",
    keypoints: ["Zeit, Kosten, Leistung sind gekoppelt", "Änderung einer Ecke wirkt auf die anderen", "Kürzere Zeit → mehr Kosten oder weniger Umfang"]
  },
  {
    id: "ga1-projektmanagement-011",
    why: "Das WIP-Limit begrenzt die gleichzeitig laufende Arbeit; erst wenn durch das Fertigstellen ein Platz frei wird, darf nach dem Pull-Prinzip neue Arbeit gezogen werden. So werden Engpässe sichtbar und die Durchlaufzeit sinkt.",
    keypoints: ["WIP-Limit begrenzt parallele Arbeit", "Pull-Prinzip: nur bei freiem Platz ziehen", "Ziel: Engpässe sichtbar, kürzere Durchlaufzeit"]
  },
  {
    id: "ga1-projektmanagement-013",
    why: "Der Gesamtpuffer zeigt, wie weit sich ein Vorgang verschieben darf, ohne das Projektende zu gefährden. Er ergibt sich aus der Differenz zwischen spätestem und frühestem Anfang; bei mehreren Nachfolgern bestimmt der früheste SAZ (Minimum) das SEZ.",
    keypoints: ["GP = SAZ − FAZ (= SEZ − FEZ)", "Rückwärtsrechnung: SEZ = Minimum der Nachfolger-SAZ", "GP = Spielraum ohne Verschiebung des Projektendes"]
  },
  {
    id: "ga1-projektmanagement-014",
    why: "Auf dem kritischen Pfad liegen alle Vorgänge ohne Puffer; jede Verzögerung dort verlängert direkt das Projekt. Deshalb müssen diese Vorgänge besonders eng überwacht und bei Bedarf mit Ressourcen unterstützt werden.",
    keypoints: ["Kritischer Pfad = Vorgänge mit GP = 0", "Verzögerung verschiebt das Projektende", "Fokus für Steuerung und Überwachung"]
  },
  /* ---------- Anforderungen ---------- */
  {
    id: "ga1-anforderungen-001",
    why: "Das Lastenheft beschreibt aus Sicht des Auftraggebers, WAS und WOFÜR er etwas braucht. Erst der Auftragnehmer antwortet darauf mit dem Pflichtenheft (WIE und WOMIT).",
    keypoints: ["Lastenheft = Anforderungen aus Kundensicht", "Ersteller: Auftraggeber", "Pflichtenheft = Umsetzung durch Auftragnehmer"]
  },
  {
    id: "ga1-anforderungen-004",
    why: "Nicht-funktionale Anforderungen beschreiben nicht, WAS das System tut, sondern WIE GUT bzw. unter welchen Rahmenbedingungen – etwa Sicherheit, Plattform, Bedienbarkeit oder Performance.",
    keypoints: ["Funktional = was das System tut", "Nicht-funktional = Qualität/Randbedingungen", "Sicherheit, Performance, Usability sind nicht-funktional"]
  },
  {
    id: "ga1-anforderungen-006",
    why: "Laufzeit und Speicherverbrauch beschreiben, wie sparsam das System mit Zeit und Ressourcen umgeht. Genau das erfasst das Merkmal Leistungseffizienz der ISO/IEC 25010 – es ist keine Funktion, sondern eine Qualität.",
    keypoints: ["Zeitverhalten und Ressourcenverbrauch", "ISO 25010: Leistungseffizienz", "Messbar formuliert, daher prüfbar"]
  },
  {
    id: "ga1-anforderungen-009",
    why: "Eine User Story ist bewusst kein Vertrag, sondern Anlass für ein Gespräch zwischen Product Owner und Team. Details werden gemeinsam ausgehandelt – deshalb steht N für Negotiable.",
    keypoints: ["N = Negotiable (verhandelbar)", "Story ist Gesprächsanlass, kein Vertrag", "Details entstehen in Abstimmung mit dem Team"]
  },
  {
    id: "ga1-anforderungen-015",
    why: "MoSCoW ordnet nach Verbindlichkeit: Must ist zwingend, Should wichtig, Could wünschenswert, Won't bewusst zurückgestellt. Won't bedeutet nur „nicht in diesem Release“, nicht „nie“.",
    keypoints: ["Must → Should → Could → Won't", "Reihenfolge = abnehmende Verbindlichkeit", "Won't = nicht jetzt, nicht nie"]
  },
  /* ---------- Wirtschaftlichkeit ---------- */
  {
    id: "ga1-wirtschaftlichkeit-004",
    why: "Die Amortisationsdauer gibt an, wann die Investition durch Rückflüsse wieder hereingeholt ist. Rückfluss ist dabei nur das, was nach Abzug der laufenden Kosten von der Einsparung übrig bleibt.",
    keypoints: ["Amortisation = Investition / Rückfluss", "Rückfluss = Einsparung − laufende Kosten", "Zeiteinheit einheitlich halten"]
  },
  {
    id: "ga1-wirtschaftlichkeit-005",
    why: "Beim Break-even-Vergleich stellt man die Gesamtkostenfunktionen beider Alternativen (Fixkosten + variable Kosten × Zeit) gleich. Der Schnittpunkt zeigt, ab wann sich die Alternative mit hohen Fixkosten lohnt.",
    keypoints: ["Gesamtkosten = Fix + variabel × Zeit", "Beide Funktionen gleichsetzen, nach Zeit auflösen", "Danach ist die Alternative mit geringeren variablen Kosten günstiger"]
  },
  {
    id: "ga1-wirtschaftlichkeit-007",
    why: "Aufwand (Personentage) und Dauer (Kalendertage) sind verschieden: Die Dauer ergibt sich erst, wenn der Aufwand durch die tatsächlich verfügbare Kapazität pro Tag geteilt wird – inklusive Verfügbarkeitsgrad.",
    keypoints: ["Aufwand ≠ Dauer", "Kapazität = Personen × Verfügbarkeit", "Dauer = Aufwand / Kapazität"]
  },
  {
    id: "ga1-wirtschaftlichkeit-016",
    why: "Die TCO betrachtet alle Kosten über den gesamten Lebenszyklus. Laufende, indirekte Kosten wie Schulung, Administration und Ausfallzeiten sind oft höher als der Kaufpreis und werden beim reinen Preisvergleich übersehen.",
    keypoints: ["TCO = direkte + indirekte Kosten", "Betrachtung über gesamte Nutzungsdauer", "Indirekte Kosten oft größer als Anschaffung"]
  },
  {
    id: "ga1-wirtschaftlichkeit-021",
    why: "Die statische Amortisationsrechnung prüft nur, wann das Kapital zurückgeflossen ist. Sie ignoriert den Zeitwert des Geldes (keine Abzinsung) und alles, was nach dem Amortisationszeitpunkt passiert.",
    keypoints: ["Misst Rückflusszeit des Kapitals", "Keine Abzinsung (statisch)", "Ignoriert Zeitraum nach Amortisation"]
  },
  /* ---------- Qualität ---------- */
  {
    id: "ga1-qualitaet-005",
    why: "An Klassengrenzen entstehen besonders häufig Fehler, etwa durch < statt <=. Deshalb testet man jeden Grenzwert selbst und den direkt benachbarten Wert außerhalb des gültigen Bereichs.",
    keypoints: ["Fehler häufen sich an Grenzen", "Grenze und Nachbarwert außerhalb testen", "Typischer Fehler: < statt <="]
  },
  {
    id: "ga1-qualitaet-008",
    why: "Für Zweigüberdeckung muss jede Entscheidung mindestens einmal wahr und einmal falsch werden. Geschickt kombinierte Testfälle können mehrere Entscheidungen gleichzeitig abdecken, daher reichen oft wenige Testfälle.",
    keypoints: ["C1: jede Entscheidung true und false", "Testfälle decken mehrere Zweige gleichzeitig ab", "Minimum ≠ Anzahl der Entscheidungen × 2"]
  },
  {
    id: "ga1-qualitaet-010",
    why: "Wer jeden Zweig mindestens einmal durchläuft, führt automatisch auch jede Anweisung aus, denn jede Anweisung liegt auf irgendeinem Zweig. Umgekehrt gilt das nicht: Ein if ohne else braucht für C1 zusätzlich den false-Fall.",
    keypoints: ["C1 schließt C0 ein", "Umgekehrt nicht: false-Zweig fehlt bei C0", "If ohne else ist die typische Falle"]
  },
  {
    id: "ga1-qualitaet-014",
    why: "Bei TDD wird zuerst ein fehlschlagender Test geschrieben, damit klar ist, dass er das gewünschte Verhalten wirklich prüft. Danach genügt minimaler Code für Grün, und erst mit dem Sicherheitsnetz der Tests wird aufgeräumt.",
    keypoints: ["Red: Test zuerst, schlägt fehl", "Green: minimaler Code bis Test grün", "Refactor: Aufräumen abgesichert durch Tests"]
  },
  {
    id: "ga1-qualitaet-020",
    why: "Die Begriffe bilden eine Kausalkette: Ein menschlicher Irrtum (Fehlhandlung) erzeugt einen Defekt im Code (Fehlerzustand), der sich bei Ausführung als sichtbares Fehlverhalten (Fehlerwirkung) zeigt.",
    keypoints: ["Fehlhandlung = menschlicher Irrtum", "Fehlerzustand = Defekt im Code", "Fehlerwirkung = sichtbares Fehlverhalten"]
  },
  /* ---------- Ergonomie ---------- */
  {
    id: "ga1-ergonomie-001",
    why: "Steuerbarkeit bedeutet, dass der Benutzer Ablauf, Richtung und Tempo der Interaktion selbst bestimmt – etwa durch Abbrechen, Zurückgehen oder Unterbrechen. Genau diese Kontrolle wird hier ermöglicht.",
    keypoints: ["Benutzer bestimmt Ablauf und Tempo", "Abbrechen, Zurück, Pausieren", "Prinzip der ISO 9241-110"]
  },
  {
    id: "ga1-ergonomie-004",
    why: "Die Norm wurde 2020 überarbeitet: Statt Fehler nur zu tolerieren, soll das System Fehler vermeiden, tolerieren und die Korrektur unterstützen. Das drückt der neue Name „Robustheit gegen Benutzungsfehler“ aus.",
    keypoints: ["Neuer Name seit ISO 9241-110:2020", "Fehler vermeiden, tolerieren, Korrektur ermöglichen", "Alte Bezeichnung: Fehlertoleranz"]
  },
  {
    id: "ga1-ergonomie-008",
    why: "Ausreichender Kontrast macht Text auch für Menschen mit Sehschwäche lesbar. Die WCAG fordern auf Stufe AA für normalen Text 4,5:1; großer Text kommt mit 3:1 aus, weil er leichter erkennbar ist.",
    keypoints: ["AA, normaler Text: 4,5:1", "Großer Text/UI-Elemente: 3:1", "Ziel: Lesbarkeit bei Sehschwäche"]
  },
  {
    id: "ga1-ergonomie-019",
    why: "Wird Information nur über Farbe transportiert, können farbsehschwache Menschen sie nicht unterscheiden. Deshalb muss Farbe immer durch Text, Icons oder Formen ergänzt werden.",
    keypoints: ["Rot-Grün-Schwäche ist häufig", "Farbe nie einziger Informationsträger", "Zusätzlich Text oder Symbole"]
  },
  {
    id: "ga1-ergonomie-020",
    why: "Erwartungskonformität heißt, dass sich das System so verhält, wie Nutzer es aus Konventionen und anderen Anwendungen kennen. Strg+S zum Speichern entspricht genau dieser Erwartung.",
    keypoints: ["Verhalten entspricht gewohnten Konventionen", "Konsistent innerhalb und zwischen Anwendungen", "Nicht verwechseln mit Selbstbeschreibungsfähigkeit"]
  },
  /* ---------- UML ---------- */
  {
    id: "ga1-uml-001",
    why: "Die Kundenidentifikation ist bei jedem Ausleihvorgang zwingend Bestandteil. Ein immer ausgeführter Teilablauf wird mit «include» modelliert, der Pfeil zeigt vom Basis-Use-Case zum inkludierten.",
    keypoints: ["Immer ausgeführt → «include»", "Pfeil vom Basis-UC zum inkludierten UC", "Optional/bedingt wäre «extend»"]
  },
  {
    id: "ga1-uml-002",
    why: "Wohnungen können ohne das Gebäude nicht existieren und gehören genau zu einem Gebäude. Diese Existenzabhängigkeit ist eine Komposition, dargestellt mit gefüllter Raute am Ganzen.",
    keypoints: ["Teil existenzabhängig vom Ganzen", "Komposition = gefüllte Raute", "Raute sitzt immer am Ganzen"]
  },
  {
    id: "ga1-uml-003",
    why: "Multiplizitäten werden am gegenüberliegenden Ende notiert: Die Zahl beim Schüler sagt, wie viele Schüler zu einer Klasse gehören, die Zahl bei der Klasse, zu wie vielen Klassen ein Schüler gehört.",
    keypoints: ["Multiplizität steht am gegenüberliegenden Ende", "Satz bilden: Eine Klasse hat 10..32 Schüler", "Ein Schüler gehört zu genau 1 Klasse"]
  },
  {
    id: "ga1-uml-004",
    why: "Eine Verzweigung mit zwei Alternativen (wenn/sonst) wird im Sequenzdiagramm mit dem Fragment alt und zwei Operanden mit Guards abgebildet. opt passt nur für einen optionalen Fall ohne Alternative.",
    keypoints: ["alt = if/else mit mehreren Operanden", "opt = if ohne else", "Operanden mit [Guard] beschriften"]
  },
  {
    id: "ga1-uml-007",
    why: "Verhaltensdiagramme zeigen dynamische Abläufe und Zustandsänderungen, Strukturdiagramme den statischen Aufbau. Use-Case-, Aktivitäts-, Zustands- und Sequenzdiagramm beschreiben Verhalten.",
    keypoints: ["Verhalten = Dynamik, Abläufe", "Struktur = statischer Aufbau (Klasse, Komponente)", "Sequenzdiagramm ist Interaktions- und damit Verhaltensdiagramm"]
  },
  /* ---------- Architektur ---------- */
  {
    id: "ga1-architektur-001",
    why: "Idempotent heißt: mehrfaches Ausführen hat dieselbe Wirkung wie einmaliges. Jeder POST legt eine neue Ressource an, wiederholte Aufrufe erzeugen also mehrere Datensätze.",
    keypoints: ["Idempotent = gleiche Wirkung bei Wiederholung", "POST legt jedes Mal neu an", "GET, PUT, DELETE sind idempotent"]
  },
  {
    id: "ga1-architektur-002",
    why: "Der Benutzer ist angemeldet, also bekannt, hat aber nicht die nötige Berechtigung. 401 würde fehlende Authentifizierung bedeuten, 403 meldet fehlende Autorisierung.",
    keypoints: ["401 = nicht authentifiziert", "403 = authentifiziert, aber keine Berechtigung", "Authentifizierung ≠ Autorisierung"]
  },
  {
    id: "ga1-architektur-003",
    why: "Eine vorhandene Komponente hat eine andere Schnittstelle als die erwartete. Der Adapter übersetzt zwischen beiden, ohne dass eine Seite geändert werden muss.",
    keypoints: ["Inkompatible Schnittstelle anpassen", "Adapter übersetzt, ändert keine Seite", "Facade vereinfacht nur, übersetzt nicht"]
  },
  {
    id: "ga1-architektur-004",
    why: "Beim Thin Client liegen Logik und Daten zentral auf dem Server; der Client stellt nur dar und nimmt Eingaben an. Das erleichtert Wartung und Verteilung, macht aber vom Netz abhängig.",
    keypoints: ["Client nur Darstellung/Eingabe", "Logik und Daten zentral auf Server", "Vorteil Wartung, Nachteil Netzabhängigkeit"]
  },
  {
    id: "ga1-architektur-021",
    why: "Wird eine Abhängigkeit von außen über den Konstruktor übergeben, statt sie mit new selbst zu erzeugen, ist die Klasse nur lose gekoppelt. Im Test kann man so einfach ein Mock-Objekt hineingeben.",
    keypoints: ["Abhängigkeit von außen übergeben", "Lose Kopplung statt new in der Klasse", "Austausch durch Mocks im Test"]
  },
  /* ---------- Datenmodell ---------- */
  {
    id: "ga1-datenmodell-001",
    why: "Eine n:m-Beziehung lässt sich nicht mit einem einzelnen Fremdschlüssel abbilden, weil beide Seiten mehrere Partner haben. Eine Zwischentabelle mit beiden Fremdschlüsseln als zusammengesetztem Primärschlüssel löst das auf.",
    keypoints: ["n:m braucht Zwischentabelle", "Beide FKs bilden gemeinsam den PK", "Beziehungsattribute in die Zwischentabelle"]
  },
  {
    id: "ga1-datenmodell-003",
    why: "Ein Nichtschlüsselattribut hängt hier von einem anderen Nichtschlüsselattribut ab und nur indirekt vom Schlüssel. Diese transitive Abhängigkeit verletzt die 3. Normalform.",
    keypoints: ["Transitive Abhängigkeit über Nichtschlüsselattribut", "Verstoß gegen 3. NF", "Lösung: abhängige Attribute in eigene Tabelle"]
  },
  {
    id: "ga1-datenmodell-004",
    why: "Mit Postleitzahlen wird nicht gerechnet, sie haben feste Länge und können mit 0 beginnen. Ein Zahlentyp würde die führende Null verlieren, CHAR(5) speichert sie exakt.",
    keypoints: ["Führende Null muss erhalten bleiben", "Feste Länge → CHAR(5)", "Kein Rechnen → kein Zahlentyp"]
  },
  {
    id: "ga1-datenmodell-005",
    why: "Weil dieselben Informationen redundant in mehreren Zeilen stehen, muss bei Änderungen überall geändert werden, und Fakten lassen sich nicht unabhängig einfügen oder löschen. Das sind die typischen Anomalien nicht normalisierter Tabellen.",
    keypoints: ["Ursache: Redundanz", "Änderungs-, Einfüge-, Löschanomalie", "Abhilfe: Normalisierung"]
  },
  {
    id: "ga1-datenmodell-007",
    why: "Referentielle Integrität stellt sicher, dass jeder Fremdschlüssel auf einen existierenden Datensatz verweist. Deshalb darf weder ein Verweis ins Leere eingefügt noch ein referenzierter Datensatz einfach gelöscht werden.",
    keypoints: ["FK muss auf existierenden PK zeigen (oder NULL)", "Löschen wird verhindert oder kaskadiert", "Verhindert verwaiste Datensätze"]
  },
  /* ---------- Sicherheit ---------- */
  {
    id: "ga1-sicherheit-001",
    why: "Bei der Pseudonymisierung lässt sich der Personenbezug mit Zusatzinformationen wiederherstellen. Die Daten bleiben daher personenbezogen und die DSGVO gilt weiter – anders als bei echter Anonymisierung.",
    keypoints: ["Personenbezug wiederherstellbar", "Pseudonymisierte Daten bleiben personenbezogen", "Nur Anonymisierung fällt aus der DSGVO"]
  },
  {
    id: "ga1-sicherheit-003",
    why: "Signieren beweist die Herkunft: Nur die Absenderin besitzt ihren privaten Schlüssel, mit dem sie den Hash signiert. Jeder kann mit ihrem öffentlichen Schlüssel prüfen, ob Hash und Dokument übereinstimmen.",
    keypoints: ["Hash mit privatem Schlüssel des Absenders signieren", "Prüfung mit öffentlichem Schlüssel des Absenders", "Sichert Integrität und Authentizität"]
  },
  {
    id: "ga1-sicherheit-004",
    why: "Eine differenzielle Sicherung enthält alle Änderungen seit der letzten Vollsicherung. Für die Wiederherstellung genügen daher die Vollsicherung und die jüngste differenzielle Sicherung.",
    keypoints: ["Differenziell = seit letzter Vollsicherung", "Restore: Voll + letzte Differenzielle", "Inkrementell bräuchte alle Inkremente"]
  },
  {
    id: "ga1-sicherheit-006",
    why: "Passwort-Hashes müssen Angriffe mit vorberechneten Tabellen und Massenausprobieren erschweren. Ein zufälliger Salt pro Nutzer macht Rainbow Tables nutzlos, langsame Verfahren wie bcrypt oder Argon2 bremsen Brute Force.",
    keypoints: ["Nie Klartext oder schnelle Hashes", "Salt je Nutzer gegen Rainbow Tables", "Langsame Funktion (bcrypt, Argon2) gegen Brute Force"]
  },
  {
    id: "ga1-sicherheit-020",
    why: "Symmetrisch braucht jedes Kommunikationspaar einen eigenen geheimen Schlüssel, daher wächst die Zahl mit n·(n−1)/2 quadratisch. Asymmetrisch genügt ein Schlüsselpaar pro Person (2·n).",
    keypoints: ["Jedes Paar eigener Schlüssel", "Formel n·(n−1)/2", "Asymmetrisch nur 2·n Schlüssel"]
  },
  /* ---------- DevOps ---------- */
  {
    id: "ga1-devops-001",
    why: "git pull kombiniert zwei Schritte: Es holt die Änderungen vom Remote (fetch) und führt sie danach in den aktuellen lokalen Branch zusammen (merge). git fetch allein würde nur herunterladen.",
    keypoints: ["pull = fetch + merge", "fetch lädt nur herunter", "Merge in den aktuellen Branch"]
  },
  {
    id: "ga1-devops-002",
    why: "Beim Canary-Release erhält zuerst nur ein kleiner Teil der Nutzer die neue Version. Erst wenn die Metriken gut sind, wird der Anteil schrittweise erhöht – so bleibt das Risiko begrenzt.",
    keypoints: ["Erst kleiner Nutzeranteil", "Schrittweise Ausweitung nach Metriken", "Risiko begrenzt, schneller Rückzug möglich"]
  },
  {
    id: "ga1-devops-005",
    why: "Container virtualisieren nur auf Betriebssystemebene und teilen sich den Kernel des Hosts; VMs bringen ein komplettes Gastbetriebssystem mit. Deshalb sind Container leichter und schneller, VMs aber stärker isoliert.",
    keypoints: ["Container teilen den Host-Kernel", "VM hat eigenes Gast-OS", "Container leichter, VM stärker isoliert"]
  },
  {
    id: "ga1-devops-006",
    why: "Merge führt Historien zusammen und bewahrt sie, ggf. mit Merge-Commit. Rebase setzt die eigenen Commits neu auf und schreibt damit die Historie um – auf geteilten Branches führt das zu Konflikten bei anderen.",
    keypoints: ["Merge erhält Historie, Merge-Commit", "Rebase schreibt Historie um, linear", "Nie geteilte Branches rebasen"]
  },
  {
    id: "ga1-devops-021",
    why: "Nach Semantic Versioning erhöht eine neue, abwärtskompatible Funktion die MINOR-Stelle; PATCH wird dabei auf 0 zurückgesetzt. MAJOR steigt nur bei inkompatiblen Änderungen.",
    keypoints: ["MAJOR.MINOR.PATCH", "Neue kompatible Funktion → MINOR + 1", "Niedrigere Stellen auf 0 zurücksetzen"]
  }
);

/* ---- ga2algo ---- */
// Paket C: Musterbegründungen („Warum ist das so?“) für GA2 Algorithmen
AP2.why.push(
  // ---- Pseudocode ----
  {
    id: "ga2-pseudocode-001",
    why: "Bei der fußgesteuerten Schleife steht die Bedingung am Ende des Rumpfs – sie wird also erst geprüft, nachdem der Rumpf schon einmal ausgeführt wurde.",
    keypoints: ["Bedingung wird erst nach dem Rumpf geprüft", "Daher mindestens ein Durchlauf", "Kopfgesteuert prüft vorher: 0 Durchläufe möglich"]
  },
  {
    id: "ga2-pseudocode-004",
    why: "Die Regel hat Ausnahmen in zwei Stufen: Durch 4 teilbar ist Schaltjahr, außer Jahrhunderte – doch durch 400 teilbare Jahrhunderte sind wieder Schaltjahre. Nur die ODER-Verknüpfung mit der 400er-Regel bildet die Ausnahme von der Ausnahme ab.",
    keypoints: ["Grundregel: durch 4 teilbar", "Ausnahme: durch 100 teilbar ist kein Schaltjahr", "Ausnahme der Ausnahme: durch 400 teilbar (2000 ja, 1900 nein)"]
  },
  {
    id: "ga2-pseudocode-009",
    why: "Die Prüfziffer ergänzt die gewichtete Summe auf das nächste Vielfache von 10; das äußere mod 10 sorgt dafür, dass bei einer Summe, die schon durch 10 teilbar ist, 0 statt 10 herauskommt.",
    keypoints: ["Gewichte abwechselnd 1 und 3", "Prüfziffer = (10 − Summe mod 10) mod 10", "Äußeres mod 10 macht aus 10 eine 0"]
  },
  {
    id: "ga2-pseudocode-011",
    why: "Ein Schreibtischtest macht den Ablauf Schritt für Schritt sichtbar, weil jede Variablenänderung in einer Trace-Tabelle festgehalten wird – so fallen Logikfehler ohne Rechner auf, aber nur für die gewählten Testfälle.",
    keypoints: ["Algorithmus manuell mit konkreten Werten durchspielen", "Trace-Tabelle: Spalte je Variable, Zeile je Schritt", "Vorteil: findet Logikfehler früh, ohne Rechner", "Grenze: nur gewählte Fälle, aufwendig, kein Beweis"]
  },
  {
    id: "ga2-pseudocode-012",
    why: "Das Umkehren funktioniert mit zwei Zeigern, die von außen nach innen laufen; getauscht wird über eine Hilfsvariable, und die Schleife endet, sobald sich die Zeiger treffen – sonst würde zurückgetauscht.",
    keypoints: ["Zwei Zeiger links/rechts, von außen nach innen", "Tausch nur über Hilfsvariable temp", "Nur tauschen, solange links kleiner als rechts Zurücktauschen"]
  },
  {
    id: "ga2-pseudocode-013",
    why: "Ein Maximum mit 0 zu initialisieren unterstellt, dass mindestens ein Wert größer als 0 ist – bei nur negativen Werten wird dann fälschlich 0 geliefert. Mit dem ersten Element zu starten ist immer ein echter Kandidat.",
    keypoints: ["Startwert 0 ist kein Wert aus dem Array", "Bei nur negativen Werten falsches Ergebnis", "Mit erstem Element initialisieren, ab Index 1 vergleichen", "Leeres Array gesondert behandeln"]
  },
  {
    id: "lvl-algo-pc-01",
    why: "Die drei Zuweisungen tauschen a und b ohne Hilfsvariable: Die Summe speichert beide Werte, durch Subtraktion wird jeweils der andere zurückgewonnen.",
    keypoints: ["a + b speichert die Information beider Werte", "Subtraktion gewinnt den jeweils anderen Wert zurück", "Ergebnis: a = 3, b = 5 → 35"]
  },
  // ---- Sortieren & Suchen ----
  {
    id: "ga2-sortieren-suchen-004",
    why: "Jede Bubble-Sort-Vertauschung tauscht genau zwei benachbarte, falsch stehende Elemente und beseitigt damit genau eine Fehlstellung. Die Anzahl der Tausche entspricht daher der Anzahl der Inversionen.",
    keypoints: ["Ein Nachbartausch behebt genau eine Inversion", "Tausche = Anzahl der Fehlstellungen (Inversionen)", "Inversionen paarweise zählen: 6"]
  },
  {
    id: "ga2-sortieren-suchen-006",
    why: "Die binäre Suche halbiert den Suchbereich mit jedem Vergleich; nach k Vergleichen bleiben etwa n/2^k Elemente übrig. Für 1000 Elemente reichen deshalb 10 Vergleiche, weil 2^10 = 1024 schon mehr als 1000 ist.",
    keypoints: ["Jeder Vergleich halbiert den Suchbereich", "Worst Case ⌈log₂(n+1)⌉ Vergleiche", "2^10 = 1024 deckt 1000 Elemente ab"]
  },
  {
    id: "ga2-sortieren-suchen-007",
    why: "Selection Sort tauscht das Minimum über weite Strecken nach vorne; dabei kann ein Element über ein gleich großes hinweggeschoben werden, wodurch sich deren ursprüngliche Reihenfolge umkehrt.",
    keypoints: ["Tausch über große Distanz, nicht nur Nachbarn", "Gleiche Schlüssel können ihre Reihenfolge verlieren", "Bubble, Insertion und Merge Sort sind stabil"]
  },
  {
    id: "ga2-sortieren-suchen-009",
    why: "Quick Sort ist nur schnell, wenn das Pivot die Daten in etwa gleich große Hälften teilt. Ist es stets das kleinste oder größte Element, schrumpft das Problem nur um 1 und es entstehen n Ebenen mit je bis zu n Vergleichen.",
    keypoints: ["Effizienz hängt von ausgewogener Partitionierung ab", "Extremes Pivot: Teilproblem nur um 1 kleiner", "n Ebenen × n Vergleiche = O(n²)", "Typisch: sortierte Daten mit erstem/letztem Element als Pivot"]
  },
  {
    id: "ga2-sortieren-suchen-012",
    why: "Bei Gleichstand der Punkte soll die vorherige Ordnung erhalten bleiben – das garantiert nur ein stabiles Verfahren. Insertion Sort ist stabil, weil es nur echt größere Elemente nach rechts schiebt.",
    keypoints: ["Gleiche Schlüssel behalten ihre bisherige Reihenfolge", "Wichtig bei Mehrfachsortierung", "Insertion Sort stabil: nur echt größere Elemente verschieben"]
  },
  {
    id: "ga2-sortieren-suchen-014",
    why: "Beide teilen das Problem rekursiv auf, aber an verschiedenen Stellen liegt die Arbeit: Quick Sort ordnet beim Partitionieren vor dem Teilen, Merge Sort beim Mischen danach. Deshalb ist Merge Sort immer O(n log n), braucht aber Zusatzspeicher.",
    keypoints: ["Beide Divide and Conquer, rekursiv", "Quick Sort: Arbeit beim Partitionieren, in-place, Worst O(n²)", "Merge Sort: Arbeit beim Mischen, immer O(n log n)", "Merge Sort stabil, aber O(n) Zusatzspeicher"]
  },
  {
    id: "lvl-algo-sort-07",
    why: "Die binäre Suche vergleicht immer mit dem mittleren Element und schließt dadurch eine Hälfte sicher aus, weil das Array sortiert ist; die neuen Grenzen liegen jeweils eins neben der Mitte.",
    keypoints: ["Mitte = (links + rechts) div 2", "Sortierung erlaubt Ausschluss einer Hälfte", "Neue Grenze m + 1 bzw. m − 1"]
  },
  // ---- Rekursion ----
  {
    id: "ga2-rekursion-001",
    why: "Ohne einen Fall, der direkt ohne weiteren Aufruf gelöst wird, würde sich die Funktion endlos selbst aufrufen. Der Anker beendet die Kette und liefert den Startwert für die Rückrechnung.",
    keypoints: ["Fall ohne weiteren rekursiven Aufruf", "Beendet die Aufrufkette", "Liefert den Wert, aus dem zurückgerechnet wird"]
  },
  {
    id: "ga2-rekursion-002",
    why: "Naive Fibonacci verzweigt bei jedem Aufruf in zwei weitere, ohne bereits berechnete Werte wiederzuverwenden. Die Aufrufe wachsen daher nach A(n) = A(n−1) + A(n−2) + 1, also exponentiell.",
    keypoints: ["Jeder Aufruf erzeugt zwei weitere (Baumrekursion)", "Gleiche Teilprobleme werden mehrfach berechnet", "A(n) = A(n−1) + A(n−2) + 1 → 15 bei fib(5)"]
  },
  {
    id: "ga2-rekursion-004",
    why: "Um n Scheiben zu versetzen, muss man zweimal n−1 Scheiben versetzen und einmal die größte bewegen: Z(n) = 2·Z(n−1) + 1. Daraus folgt 2^n − 1 Züge.",
    keypoints: ["Z(n) = 2 · Z(n−1) + 1", "Geschlossen: 2^n − 1", "n = 5 → 31 Züge"]
  },
  {
    id: "ga2-rekursion-010",
    why: "Jeder Aufruf legt einen Stack-Frame an, der erst beim Rücksprung freigegeben wird. Wird der Anker nie erreicht, wächst der Aufrufstack, bis der begrenzte Stack-Speicher voll ist.",
    keypoints: ["Jeder Aufruf belegt einen Stack-Frame", "Ohne erreichbaren Anker keine Rücksprünge", "Stack-Speicher ist begrenzt → StackOverflowError"]
  },
  {
    id: "ga2-rekursion-013",
    why: "Der Rekursionsschritt n − 2 überspringt bei ungeradem n die 0, sodass die Abbruchbedingung n == 0 nie wahr wird. Ein Anker muss für alle Eingaben sicher erreicht werden, z. B. mit n ≤ 0.",
    keypoints: ["Ungerades n: 5, 3, 1, −1 … springt über 0", "Anker n == 0 wird nie erreicht", "Korrektur: Anker n ≤ 0"]
  },
  {
    id: "ga2-rekursion-014",
    why: "Anweisungen vor dem rekursiven Aufruf laufen beim Abstieg, Anweisungen danach erst beim Abbau des Stacks. Weil der Stack LIFO arbeitet, erscheinen die B-Ausgaben in umgekehrter Reihenfolge.",
    keypoints: ["Vor dem Aufruf: Ausgabe beim Abstieg (A3, A2, A1)", "Nach dem Aufruf: Ausgabe beim Rückweg", "LIFO kehrt die Reihenfolge um (B1, B2, B3)"]
  },
  {
    id: "lvl-algo-rek-14",
    why: "Jede Rekursionsebene belegt einen Stackframe; bei großer Tiefe reicht der Stack nicht. Mit einer Schleife und einem eigenen Stack (bzw. einer Queue) auf dem Heap verlagert man die offenen Aufgaben in eine Datenstruktur, die nicht so begrenzt ist.",
    keypoints: ["Stackframe je Aufruf: Parameter, lokale Variablen, Rücksprungadresse", "Rekursionstiefe übersteigt Stack-Größe", "Iterativ: offene Aufgaben in eigenem Stack auf dem Heap"]
  },
  // ---- Datenstrukturen ----
  {
    id: "ga2-datenstrukturen-001",
    why: "Beim Stapel kommt man nur an das oberste Element heran – das zuletzt abgelegte wird also zuerst wieder entnommen.",
    keypoints: ["Zugriff nur auf das oberste Element", "Zuletzt hinein, zuerst heraus", "Beispiele: Aufrufstack, Undo"]
  },
  {
    id: "ga2-datenstrukturen-006",
    why: "Ein Array liegt zusammenhängend im Speicher, daher lässt sich die Adresse des i-ten Elements direkt berechnen. Eine verkettete Liste kennt nur Nachfolger-Zeiger und muss sich durchhangeln, kann dafür aber ohne Verschieben einfügen.",
    keypoints: ["Array: Adresse berechenbar → Indexzugriff O(1)", "Liste: Durchlaufen über Zeiger → O(n)", "Liste: Einfügen ohne Verschieben, O(1) am bekannten Knoten", "Liste: zusätzlicher Speicher für Zeiger"]
  },
  {
    id: "ga2-datenstrukturen-007",
    why: "Wenn Aufträge in der Reihenfolge ihres Eintreffens abgearbeitet werden sollen, braucht man FIFO – genau das leistet eine Queue mit Einfügen hinten und Entnehmen vorne.",
    keypoints: ["Abarbeitung in Eingangsreihenfolge = FIFO", "Queue: enqueue hinten, dequeue vorne", "Stack wäre LIFO und unfair"]
  },
  {
    id: "ga2-datenstrukturen-008",
    why: "Gefragt sind Eindeutigkeit und schnelle Enthaltensprüfung ohne Reihenfolge – ein HashSet verbietet Duplikate und prüft per Hashfunktion im Mittel in O(1).",
    keypoints: ["Set verhindert Duplikate", "Hashing: Enthaltensprüfung im Mittel O(1)", "Liste müsste linear suchen: O(n)"]
  },
  {
    id: "ga2-datenstrukturen-013",
    why: "Eine Hashfunktion bildet viele mögliche Schlüssel auf wenige Indizes ab, daher sind Kollisionen unvermeidbar. Man löst sie, indem entweder mehrere Einträge pro Bucket gespeichert werden (Verkettung) oder nach einem anderen freien Platz gesucht wird (Sondieren).",
    keypoints: ["Kollision: verschiedene Schlüssel, gleicher Index", "Unvermeidbar, da Schlüsselraum größer als Tabelle", "Verkettung: Liste je Bucket", "Offene Adressierung: nächsten freien Platz sondieren"]
  },
  {
    id: "ga2-datenstrukturen-003",
    why: "Im binären Suchbaum sind links alle kleineren und rechts alle größeren Schlüssel. Inorder besucht erst links, dann die Wurzel, dann rechts – und liefert deshalb die Schlüssel sortiert.",
    keypoints: ["Suchbaum-Eigenschaft: links kleiner, rechts größer", "Preorder: Wurzel zuerst", "Inorder liefert sortierte Reihenfolge", "Postorder: Wurzel zuletzt"]
  },
  {
    id: "lvl-algo-ds-11",
    why: "Bei der Postfix-Auswertung kommen Operanden auf den Stack; ein Operator nimmt die obersten zwei herunter und legt das Ergebnis zurück. Klammern sind unnötig, weil die Reihenfolge der Operatoren die Auswertung festlegt.",
    keypoints: ["Zahl → push", "Operator → zwei pop, Ergebnis push", "Am Ende liegt genau ein Ergebnis auf dem Stack"]
  },
  // ---- OOP ----
  {
    id: "ga2-oop-001",
    why: "Die Methoden heißen gleich, unterscheiden sich aber in der Parameterliste und liegen in derselben Klasse; der Compiler wählt anhand der Argumenttypen die passende aus.",
    keypoints: ["Gleicher Name, andere Parameterliste", "In derselben Klasse", "Auflösung zur Compilezeit (statisch)"]
  },
  {
    id: "ga2-oop-003",
    why: "Eine abstrakte Klasse ist eine unvollständige Oberklasse mit gemeinsamem Zustand und Code, ein Interface ein reiner Vertrag. Weil Java nur Einfachvererbung erlaubt, sind Interfaces der Weg, mehrere Fähigkeiten zu kombinieren.",
    keypoints: ["Abstrakte Klasse: nicht instanziierbar, Attribute und konkrete Methoden möglich", "Interface: Vertrag aus Methodensignaturen", "Nur eine Oberklasse, aber mehrere Interfaces"]
  },
  {
    id: "ga2-oop-004",
    why: "Ein statisches Attribut gehört zur Klasse statt zum einzelnen Objekt; alle Instanzen teilen sich denselben Speicherplatz – ideal für einen Instanzzähler.",
    keypoints: ["Gehört zur Klasse, nicht zum Objekt", "Existiert nur einmal, von allen geteilt", "Typisch: Zähler, Konstanten"]
  },
  {
    id: "ga2-oop-012",
    why: "Der aufrufende Code arbeitet nur mit dem Typ der Oberklasse bzw. des Interfaces; welche Implementierung läuft, entscheidet sich erst zur Laufzeit am tatsächlichen Objekt. Neue Unterklassen lassen sich daher ergänzen, ohne bestehenden Code zu ändern.",
    keypoints: ["Variable vom Obertyp verweist auf Unterklassenobjekt", "Dynamisches Binden zur Laufzeit", "Erweiterung ohne Änderung bestehenden Codes", "Ersetzt lange wenn/sonst-Ketten nach Typ"]
  },
  {
    id: "ga2-oop-013",
    why: "Wenn Attribute nur über Methoden erreichbar sind, kann das Objekt selbst über seinen Zustand wachen: Ungültige Werte werden abgewiesen, und die interne Darstellung kann sich ändern, ohne dass Nutzer der Klasse angepasst werden müssen.",
    keypoints: ["Attribute privat, Zugriff über Methoden", "Validierung im Setter schützt Invarianten", "Interne Implementierung austauschbar", "Lesend/schreibend getrennt steuerbar"]
  },
  {
    id: "ga2-oop-014",
    why: "Entscheidend ist die Lebensdauer der Teile: Bei der Komposition erzeugt und besitzt das Ganze seine Teile, bei der Aggregation werden unabhängig existierende Teile nur gesammelt, bei der Assoziation kennen sich die Objekte nur.",
    keypoints: ["Assoziation: kennt-Beziehung über Referenzattribut", "Aggregation: Teile existieren unabhängig, von außen übergeben", "Komposition: Ganzes erzeugt Teile, gleiche Lebensdauer"]
  },
  {
    id: "ga2-oop-015",
    why: "Ein Unterklassenobjekt enthält den Teil der Oberklasse; dieser muss zuerst fertig initialisiert sein. Deshalb ruft jeder Konstruktor zuerst (implizit) super() auf, und die Ausgaben laufen von der obersten Klasse nach unten.",
    keypoints: ["super() ist erste Anweisung im Konstruktor", "Oberklassenteil wird zuerst initialisiert", "Reihenfolge von oben (A) nach unten (C)"]
  },
  {
    id: "lvl-algo-oop-04",
    why: "Kapselung bedeutet nicht nur private Attribute, sondern dass das Objekt ungültige Zustände verhindert. Ein Setter, der den Wertebereich prüft und sonst ablehnt, schützt die Invariante.",
    keypoints: ["Attribut privat, Änderung nur über Setter", "Setter prüft den gültigen Wertebereich", "Ungültige Werte werden abgewiesen (z. B. Exception)"]
  },
  // ---- Komplexität ----
  {
    id: "ga2-komplexitaet-003",
    why: "Die Variable wird in jedem Durchlauf halbiert; bis sie 1 erreicht, vergehen nur etwa log₂(n) Schritte.",
    keypoints: ["Halbieren pro Durchlauf", "Anzahl Schritte ≈ log₂ n", "Wie bei der binären Suche"]
  },
  {
    id: "ga2-komplexitaet-004",
    why: "Die innere Schleife läuft immer genau 10-mal, unabhängig von n. Konstante Faktoren fallen in der O-Notation weg, also bleibt 10·n ∈ O(n).",
    keypoints: ["Innere Schleife hat konstante Länge", "10 · n Durchläufe", "Konstanten entfallen → O(n)"]
  },
  {
    id: "ga2-komplexitaet-006",
    why: "Die Hashfunktion berechnet den Speicherplatz direkt aus dem Schlüssel, statt zu suchen. Bei guter Dimensionierung gibt es kaum Kollisionen, daher ist der Aufwand im Mittel unabhängig von n.",
    keypoints: ["Index wird aus dem Schlüssel berechnet", "Kein Durchsuchen nötig", "Wenige Kollisionen bei niedrigem Füllgrad → O(1) im Mittel"]
  },
  {
    id: "ga2-komplexitaet-008",
    why: "Bei O(n²) wächst die Laufzeit mit dem Quadrat der Eingabegröße: Fünfmal so viele Datensätze bedeuten 25-mal so viel Zeit.",
    keypoints: ["Laufzeit proportional zu n²", "Faktor 5 bei n → Faktor 25 bei Zeit", "2 s · 25 = 50 s"]
  },
  {
    id: "ga2-komplexitaet-011",
    why: "Statt jedes Element mit jedem zu vergleichen, merkt man sich die bisher gesehenen Elemente in einem HashSet, dessen Enthaltensprüfung im Mittel O(1) kostet. So wird aus n² Vergleichen ein einziger Durchlauf – Speicher wird gegen Zeit getauscht.",
    keypoints: ["Paarvergleich mit zwei Schleifen: O(n²)", "HashSet: Enthaltensprüfung im Mittel O(1)", "Ein Durchlauf → O(n)", "Space-Time-Tradeoff: O(n) Zusatzspeicher"]
  },
  {
    id: "ga2-komplexitaet-014",
    why: "Die naive Rekursion berechnet dieselben Fibonacci-Werte immer wieder, daher wächst der Aufwand exponentiell. Speichert man jedes Zwischenergebnis (Memoisierung) oder rechnet iterativ von unten, wird jeder Wert nur einmal berechnet.",
    keypoints: ["Baumrekursion mit Mehrfachberechnung → O(2ⁿ)", "Memoisierung speichert Teilergebnisse", "Iterativ oder memoisiert: O(n)"]
  },
  {
    id: "lvl-algo-kx-08",
    why: "Die äußere Schleife läuft n-mal, die innere verdoppelt j und läuft daher nur etwa log₂ n-mal. Verschachtelte Schleifen werden multipliziert: n · log n.",
    keypoints: ["Äußere Schleife: n Durchläufe", "Innere Schleife verdoppelt: log n Durchläufe", "Verschachtelt → multiplizieren: O(n log n)"]
  },
  // ---- Zahlensysteme ----
  {
    id: "ga2-zahlensysteme-003",
    why: "Im Zweierkomplement hat das höchste Bit die negative Wertigkeit −128; die übrigen Bits werden normal addiert. Alternativ: invertieren und 1 addieren ergibt den Betrag.",
    keypoints: ["Höchstes Bit = Vorzeichen mit Wertigkeit −2ⁿ⁻¹", "−128 + 64 + 32 + 8 + 4 = −20", "Kontrolle: invertieren + 1 → 20"]
  },
  {
    id: "ga2-zahlensysteme-004",
    why: "130 passt nicht in den byte-Bereich (−128 … 127). Der Cast schneidet auf 8 Bit ab, und das gesetzte höchste Bit wird als negatives Vorzeichen gelesen – ein stiller Überlauf, keine Exception.",
    keypoints: ["byte: 8 Bit, Bereich −128 bis 127", "Überlauf läuft im Kreis (Wrap-around)", "130 − 256 = −126, kein Fehler"]
  },
  {
    id: "ga2-zahlensysteme-006",
    why: "Hersteller rechnen dezimal (1 TB = 10¹² Byte), das Betriebssystem zeigt binäre Einheiten (1 TiB = 2⁴⁰ Byte). Da 2⁴⁰ größer als 10¹² ist, erscheint dieselbe Bytezahl als kleinere Zahl.",
    keypoints: ["SI-Präfixe dezimal: TB = 10¹²", "IEC-Präfixe binär: TiB = 2⁴⁰", "2 · 10¹² / 2⁴⁰ ≈ 1,82 TiB"]
  },
  {
    id: "ga2-zahlensysteme-008",
    why: "Wie 1/3 im Dezimalsystem ist 0,1 im Binärsystem ein unendlicher periodischer Bruch. Die begrenzte Mantisse muss runden, und die Rundungsfehler von 0,1 und 0,2 ergeben nicht exakt die gerundete 0,3.",
    keypoints: ["0,1 ist binär periodisch", "Mantisse begrenzt → Rundung", "Gleitkommazahlen nie mit == vergleichen, Toleranz nutzen"]
  },
  {
    id: "ga2-zahlensysteme-009",
    why: "UTF-8 verwendet für häufige ASCII-Zeichen nur ein Byte und für seltenere Zeichen mehr – dadurch bleibt es ASCII-kompatibel und speichersparend, kann aber trotzdem alle Unicode-Zeichen darstellen.",
    keypoints: ["Variable Länge: 1 bis 4 Byte", "Erste 128 Zeichen identisch mit ASCII", "Unicode = Zeichensatz, UTF-8 = Kodierung"]
  },
  {
    id: "ga2-zahlensysteme-010",
    why: "Nach De Morgan wird beim Negieren einer Verknüpfung jedes Glied negiert und UND zu ODER getauscht. Gleichwertigkeit beweist man sicher mit einer Wahrheitstabelle über alle 4 Belegungen.",
    keypoints: ["De Morgan: NICHT(A UND B) = NICHT A ODER NICHT B", "UND wird zu ODER, Glieder werden negiert", "Prüfung per Wahrheitstabelle (2ⁿ Zeilen)"]
  },
  {
    id: "ga2-zahlensysteme-012",
    why: "Jedes Recht belegt ein eigenes Bit. Mit AND blendet man alle anderen Bits aus und prüft so ein einzelnes, mit OR setzt man es, ohne andere zu verändern, und mit AND NICHT löscht man gezielt nur dieses Bit.",
    keypoints: ["Ein Bit je Recht (Maske = Zweierpotenz)", "Prüfen: (rechte AND maske) != 0", "Setzen: rechte OR maske", "Entziehen: rechte AND NICHT maske"]
  },
  // ---- Exceptions, Formate, Regex, Tests ----
  {
    id: "ga2-exceptions-formate-001",
    why: "Der finally-Block ist für Aufräumarbeiten wie das Schließen von Dateien gedacht. Damit Ressourcen nie offen bleiben, wird er garantiert ausgeführt – egal ob normal beendet, eine Exception geflogen oder per return verlassen wurde.",
    keypoints: ["Läuft immer, auch bei return oder Exception", "Zweck: Ressourcen sicher freigeben", "Typisch: Datei oder Verbindung schließen"]
  },
  {
    id: "ga2-exceptions-formate-002",
    why: "Checked Exceptions beschreiben Fehler, mit denen ein korrektes Programm rechnen muss (Datei fehlt, Datenbank nicht erreichbar). Deshalb erzwingt der Compiler eine Behandlung; Programmierfehler wie NullPointerException sind dagegen unchecked.",
    keypoints: ["Checked: erwartbare äußere Fehler (I/O, DB)", "Compiler erzwingt catch oder throws", "Unchecked = RuntimeException, meist Programmierfehler"]
  },
  {
    id: "ga2-exceptions-formate-004",
    why: "Ein regulärer Ausdruck prüft nur das Muster der Zeichen, nicht deren Bedeutung. 31.02. passt formal in Tag 01–31 und Monat 01–12, obwohl der Februar keinen 31. hat – die Plausibilität muss zusätzlich im Code geprüft werden.",
    keypoints: ["Regex prüft nur das Format", "31.02.2026 ist formal gültig", "Semantische Prüfung (Kalender) zusätzlich nötig"]
  },
  {
    id: "ga2-exceptions-formate-010",
    why: "Alle Werte einer Äquivalenzklasse werden vom Programm gleich behandelt, daher genügt ein Repräsentant je Klasse. Fehler stecken besonders oft an den Grenzen (z. B. kleiner statt kleiner-gleich), deshalb testet man direkt unter, auf und über jeder Grenze.",
    keypoints: ["Äquivalenzklasse: gleiches erwartetes Verhalten", "Ein Repräsentant je Klasse reicht", "Grenzwerte decken Off-by-one-Fehler auf", "Ungültige Klassen ebenfalls testen"]
  },
  {
    id: "ga2-exceptions-formate-011",
    why: "XML ist durch Tags ausführlicher, aber über Schemas streng validierbar; JSON ist kompakter und passt direkt zu JavaScript-Objekten. Wohlgeformt betrifft nur die Syntax, gültig zusätzlich die Konformität zu DTD oder XSD.",
    keypoints: ["XML: Tags, Attribute, mehr Overhead, XSD-Validierung", "JSON: kompakt, Datentypen, gut für REST-APIs", "Wohlgeformt = syntaktisch korrekt", "Gültig = zusätzlich schemakonform"]
  },
  {
    id: "ga2-exceptions-formate-014",
    why: "Sobald eine Exception geworfen wird, bricht der try-Block an dieser Stelle ab; der erste passende catch-Block (daher spezielle zuerst) behandelt sie, und danach läuft auf jeden Fall finally.",
    keypoints: ["Rest des try-Blocks wird übersprungen", "Erster passender catch-Block greift", "finally läuft zum Schluss immer"]
  },
  {
    id: "ga2-exceptions-formate-003",
    why: "Ohne ^ und $ würde der Ausdruck auch dann passen, wenn fünf Ziffern irgendwo in einer längeren Eingabe stehen. Erst die Anker erzwingen, dass die gesamte Eingabe aus genau fünf Ziffern besteht.",
    keypoints: ["^ und $ verankern Anfang und Ende", "[0-9]{5}: genau fünf Ziffern", "Ohne Anker passt auch 123456"]
  }
);

/* ---- ga2sql ---- */
AP2.why.push(
  /* ---------- DDL ---------- */
  {
    id: "ga2-sql-ddl-007",
    why: "<code>DROP TABLE</code> ist DDL und entfernt das Objekt selbst (Struktur + Daten), während <code>DELETE</code> und <code>TRUNCATE</code> nur den Inhalt leeren und die leere Tabelle stehen lassen.",
    keypoints: ["DROP entfernt Struktur und Daten", "DELETE/TRUNCATE löschen nur Zeilen", "Tabelle bleibt bei DELETE bestehen"]
  },
  {
    id: "ga2-sql-ddl-008",
    why: "Der Primärschlüssel identifiziert jede Zeile eindeutig, deshalb gibt es genau einen pro Tabelle (ggf. zusammengesetzt) und er darf nie NULL sein; Fremdschlüssel dagegen verweisen nur auf andere Zeilen und dürfen mehrfach vorkommen und NULL sein.",
    keypoints: ["PK: eindeutig und NOT NULL, genau einer", "PK kann aus mehreren Spalten bestehen", "FK darf NULL sein, beliebig viele FKs", "UNIQUE macht noch keinen PK"]
  },
  {
    id: "ga2-sql-ddl-009",
    why: "Geldbeträge gehören in <code>DECIMAL</code>, weil <code>FLOAT</code> Dezimalbrüche binär nur näherungsweise speichert und so Rundungsfehler entstehen; die übrigen Fehler sind Syntaxregeln (Länge bei VARCHAR, Hochkommas bei Texten, Klammern bei FOREIGN KEY, kein Komma vor der schließenden Klammer).",
    keypoints: ["FLOAT ist ungenau, DECIMAL exakt", "VARCHAR braucht eine Längenangabe", "Textliterale in einfachen Hochkommas", "Kein Komma nach letzter Definition"]
  },
  {
    id: "ga2-sql-ddl-010",
    why: "Die referenzielle Aktion am Fremdschlüssel legt fest, was mit Kinddatensätzen geschieht, wenn der Elterndatensatz gelöscht wird; <code>ON DELETE CASCADE</code> löscht sie mit, wirkt aber nur entlang genau dieser einen Beziehung.",
    keypoints: ["CASCADE löscht abhängige Kindzeilen mit", "Wirkt nur in Richtung Eltern → Kind", "RESTRICT verhindert, SET NULL leert den FK"]
  },
  {
    id: "lvl-sql-ddl-16",
    why: "NULL bedeutet „unbekannt“ und gilt nicht als gleich zu einem anderen NULL, daher erlaubt UNIQUE mehrere NULL-Werte; ein Fremdschlüssel kann nur auf schon existierende Zeilen verweisen, weshalb die referenzierte Tabelle zuerst angelegt werden muss.",
    keypoints: ["UNIQUE erlaubt mehrere NULL-Werte", "SET NULL setzt den FK auf NULL statt zu löschen", "Referenzierte Tabelle zuerst anlegen", "FK-Wert muss existieren oder NULL sein"]
  },
  {
    id: "lvl-sql-ddl-10",
    why: "Eine m:n-Beziehung lässt sich relational nicht direkt speichern, sondern nur über eine Zwischentabelle mit zwei Fremdschlüsseln, deren Kombination der Primärschlüssel ist – das gilt auch, wenn beide auf dieselbe Tabelle zeigen.",
    keypoints: ["m:n braucht eine Zwischentabelle", "Zusammengesetzter PK aus beiden FKs", "Rekursiv: beide FKs auf dieselbe Tabelle", "CHECK verhindert Selbstbezug"]
  },
  {
    id: "ga2-sql-ddl-005",
    why: "Ein <code>UNIQUE INDEX</code> beschleunigt die Suche und erzwingt zugleich Eindeutigkeit, weil das DBMS beim Einfügen im Index nachsieht, ob der Wert schon vorhanden ist.",
    keypoints: ["Index beschleunigt Suchen", "UNIQUE verhindert doppelte Werte", "Normaler Index prüft keine Eindeutigkeit"]
  },

  /* ---------- SELECT ---------- */
  {
    id: "ga2-sql-select-015",
    why: "Bei LIKE steht <code>_</code> für genau ein Zeichen und <code>%</code> für beliebig viele (auch null), deshalb legt <code>'_a%n'</code> die zweite Position fest und lässt die Länge offen; mit <code>=</code> wirken die Platzhalter gar nicht.",
    keypoints: ["_ = genau ein Zeichen", "% = beliebig viele, auch null", "Platzhalter nur mit LIKE, nicht mit ="]
  },
  {
    id: "ga2-sql-select-016",
    why: "AND bindet stärker als OR (wie Punkt vor Strich), daher wird ohne Klammern nur der Berlin-Teil mit der E-Mail-Bedingung verknüpft und alle Kölner kommen ungefiltert durch.",
    keypoints: ["AND bindet stärker als OR", "Ohne Klammern andere Logik als gemeint", "Bei Mischung immer Klammern setzen"]
  },
  {
    id: "ga2-sql-select-017",
    why: "NULL ist kein Wert, sondern „unbekannt“; SQL rechnet mit dreiwertiger Logik, jeder Vergleich mit NULL ergibt UNKNOWN, und WHERE lässt nur TRUE durch – deshalb braucht man den Sonderoperator <code>IS NULL</code>.",
    keypoints: ["NULL = unbekannt, kein vergleichbarer Wert", "Vergleich mit NULL ergibt UNKNOWN", "WHERE übernimmt nur TRUE", "Korrekt: IS NULL / IS NOT NULL"]
  },
  {
    id: "lvl-sql-select-12",
    why: "<code>x NOT IN (a, NULL)</code> wird zu <code>x &lt;&gt; a AND x &lt;&gt; NULL</code>; der zweite Teil ist immer UNKNOWN, darum kann die gesamte UND-Verknüpfung nie TRUE werden und es kommt keine Zeile.",
    keypoints: ["NOT IN = UND-Kette von Ungleich-Vergleichen", "Ungleich NULL ist immer UNKNOWN", "Ein NULL in der Liste → leeres Ergebnis", "Abhilfe: NULL ausfiltern oder NOT EXISTS"]
  },
  {
    id: "ga2-sql-select-005",
    why: "<code>BETWEEN</code> schließt beide Grenzen ein, und ISO-Datumswerte 'YYYY-MM-DD' sind so aufgebaut, dass ihre Textsortierung der zeitlichen Reihenfolge entspricht – daher funktioniert der Vergleich in jedem DBMS.",
    keypoints: ["BETWEEN: beide Grenzen inklusive", "ISO-Format sortiert chronologisch", "Datum in einfachen Hochkommas"]
  },
  {
    id: "ga2-sql-select-006",
    why: "Ohne <code>DISTINCT</code> erscheint jeder Ort so oft, wie dort passende Kunden wohnen; DISTINCT fasst identische Ergebniszeilen zusammen, und <code>IS NOT NULL</code> filtert die Kunden ohne E-Mail heraus.",
    keypoints: ["DISTINCT entfernt doppelte Ergebniszeilen", "DISTINCT wirkt auf die ganze Zeile", "Filter mit IS NOT NULL, nicht ungleich NULL"]
  },

  /* ---------- JOIN ---------- */
  {
    id: "ga2-sql-join-003",
    why: "Ein INNER JOIN liefert nur Zeilen mit Partner, Kurse ohne Dozent würden also fehlen; der LEFT JOIN behält alle Zeilen der linken Tabelle und füllt den fehlenden Partner mit NULL auf.",
    keypoints: ["INNER JOIN verwirft Zeilen ohne Partner", "LEFT JOIN behält alle linken Zeilen", "Fehlender Partner erscheint als NULL"]
  },
  {
    id: "ga2-sql-join-004",
    why: "Nach einem LEFT JOIN haben Kunden ohne Bestellung in allen Bestellspalten NULL; filtert man mit <code>IS NULL</code> auf den Primärschlüssel der rechten Tabelle, bleiben genau die Zeilen ohne Partner übrig (Anti-Join).",
    keypoints: ["LEFT JOIN erzeugt NULL bei fehlendem Partner", "WHERE rechter PK IS NULL", "Ergebnis: Zeilen ohne Partner"]
  },
  {
    id: "ga2-sql-join-014",
    why: "Ohne Join-Bedingung wird jede Zeile der einen Tabelle mit jeder Zeile der anderen kombiniert (kartesisches Produkt), die Zeilenzahl ist also das Produkt der beiden Zeilenzahlen.",
    keypoints: ["Fehlende Join-Bedingung → kartesisches Produkt", "Zeilen = Anzahl A × Anzahl B", "Erkennbar an unrealistisch vielen Zeilen"]
  },
  {
    id: "ga2-sql-join-015",
    why: "Ein LEFT JOIN über eine 1:n-Beziehung liefert pro Partner eine Zeile, Kunden mit mehreren Bestellungen erscheinen also mehrfach; dazu kommt je eine NULL-Zeile für jeden Kunden ohne Bestellung.",
    keypoints: ["Jede Bestellung ergibt eine Zeile", "Kunden ohne Bestellung zusätzlich einmal mit NULL", "1:n-Join vervielfacht die linke Seite"]
  },
  {
    id: "lvl-sql-join-11",
    why: "Eine Bedingung in der ON-Klausel schränkt nur ein, welche Partner passen, die linke Zeile bleibt trotzdem erhalten; in WHERE dagegen wird nach dem Join gefiltert und die NULL-Zeilen fallen heraus – der LEFT JOIN wird faktisch zum INNER JOIN.",
    keypoints: ["ON filtert Partner, linke Zeilen bleiben", "WHERE filtert nach dem Join", "WHERE auf rechte Tabelle macht LEFT zu INNER"]
  },
  {
    id: "ga2-sql-join-016",
    why: "Der Unterschied liegt darin, was mit Zeilen ohne passenden Partner passiert: INNER verwirft sie, LEFT behält die der linken Tabelle mit NULL; ein Self-Join braucht zwei Aliase, weil dieselbe Tabelle in zwei Rollen gelesen wird.",
    keypoints: ["INNER: nur Zeilen mit Partner", "LEFT: alle linken Zeilen, sonst NULL", "Self-Join: Tabelle mit sich selbst", "Zwei verschiedene Aliase nötig"]
  },
  {
    id: "ga2-sql-join-007",
    why: "Der Vorgesetzte steht in derselben Tabelle wie der Mitarbeiter, deshalb verbindet man die Tabelle über zwei Aliase mit sich selbst; LEFT JOIN ist nötig, damit Mitarbeiter ohne Vorgesetzten (FK = NULL) nicht wegfallen.",
    keypoints: ["Rekursive Beziehung → Self-Join", "Zwei Aliase für zwei Rollen", "LEFT JOIN behält Mitarbeiter ohne Vorgesetzten"]
  },

  /* ---------- Aggregat ---------- */
  {
    id: "ga2-sql-aggregat-005",
    why: "Der LEFT JOIN erzeugt für Kurse ohne Buchung eine Zeile mit NULL in den Buchungsspalten; <code>COUNT(*)</code> zählt diese Zeile mit (Ergebnis 1), <code>COUNT(b.buchung_id)</code> ignoriert das NULL und liefert korrekt 0.",
    keypoints: ["LEFT JOIN nötig, damit Kurse ohne Buchung bleiben", "COUNT(*) zählt auch die NULL-Zeile", "COUNT(spalte der rechten Tabelle) liefert 0"]
  },
  {
    id: "ga2-sql-aggregat-016",
    why: "<code>COUNT(spalte)</code> zählt nur Zeilen, in denen diese Spalte nicht NULL ist, während <code>COUNT(*)</code> alle Zeilen zählt – so lässt sich z. B. direkt die Anzahl gelöster Tickets ermitteln.",
    keypoints: ["COUNT(*) zählt alle Zeilen", "COUNT(spalte) überspringt NULL", "Unterschied = Anzahl der NULL-Werte"]
  },
  {
    id: "ga2-sql-aggregat-017",
    why: "Aggregatfunktionen ignorieren NULL; AVG teilt deshalb nur durch die Anzahl der vorhandenen Werte, ein fehlender Stundensatz wird weder addiert noch mitgezählt.",
    keypoints: ["AVG ignoriert NULL-Werte", "Nenner = Anzahl Nicht-NULL-Werte", "NULL als 0: AVG(COALESCE(x, 0))"]
  },
  {
    id: "ga2-sql-aggregat-018",
    why: "GROUP BY verdichtet jede Gruppe zu genau einer Ergebniszeile; eine nicht aggregierte Spalte, die nicht im GROUP BY steht, hat pro Gruppe mehrere Werte und das DBMS wüsste nicht, welchen es ausgeben soll.",
    keypoints: ["Eine Ergebniszeile pro Gruppe", "Nicht aggregierte Spalten müssen ins GROUP BY", "Sonst mehrdeutiger bzw. zufälliger Wert"]
  },
  {
    id: "ga2-sql-aggregat-019",
    why: "Wegen der Ausführungsreihenfolge FROM → WHERE → GROUP BY → HAVING filtert WHERE einzelne Zeilen, bevor Gruppen entstehen, und kennt daher noch keine Aggregate; HAVING filtert danach ganze Gruppen und darf Aggregatfunktionen verwenden.",
    keypoints: ["WHERE: Zeilen vor der Gruppierung", "HAVING: Gruppen nach der Gruppierung", "Aggregate nur in HAVING erlaubt", "Grund: logische Ausführungsreihenfolge"]
  },
  {
    id: "ga2-sql-aggregat-004",
    why: "„Mindestens 3 Buchungen“ ist eine Bedingung an das Ergebnis der Zählung je Kurs, die erst nach dem Gruppieren feststeht – darum gehört sie in HAVING und nicht in WHERE.",
    keypoints: ["Bedingung bezieht sich auf ein Aggregat", "Erst GROUP BY, dann HAVING mit COUNT(*)", "Gruppieren nach PK (plus Titel)"]
  },
  {
    id: "ga2-sql-aggregat-006",
    why: "Der Wert einer Position ist <code>menge * einzelpreis</code>; erst wird je Zeile multipliziert und dann je Bestellung summiert – die Summe der Mengen mal die Summe der Preise wäre mathematisch falsch.",
    keypoints: ["SUM(menge * einzelpreis), nicht SUM × SUM", "GROUP BY bestell_id", "ROUND erst auf das Endergebnis"]
  },

  /* ---------- Unterabfragen ---------- */
  {
    id: "ga2-sql-subquery-001",
    why: "In WHERE ist kein Aggregat erlaubt, weil dort einzelne Zeilen geprüft werden; der Durchschnitt muss daher in einer eigenständigen Unterabfrage ermittelt werden, die genau einen Wert liefert, mit dem jede Zeile verglichen wird.",
    keypoints: ["Kein Aggregat direkt in WHERE", "Skalare Unterabfrage liefert genau einen Wert", "Jede Zeile wird mit diesem Wert verglichen"]
  },
  {
    id: "ga2-sql-subquery-005",
    why: "Jeder Mitarbeiter soll mit dem Durchschnitt seiner eigenen Abteilung verglichen werden, also hängt das Vergleichsergebnis von der äußeren Zeile ab – das leistet nur eine korrelierte Unterabfrage, die sich über einen zweiten Alias auf die äußere Abteilung bezieht.",
    keypoints: ["Vergleichswert hängt von der äußeren Zeile ab", "Korreliert: Bezug auf äußere Spalte", "Unterschiedliche Aliase (m, m2) nötig", "Logisch je äußerer Zeile neu ausgewertet"]
  },
  {
    id: "ga2-sql-subquery-014",
    why: "Enthält die Unterabfrage ein NULL, wird <code>NOT IN</code> zu einer UND-Kette, in der ein Vergleich mit NULL UNKNOWN ergibt – damit ist die Bedingung für keine Zeile TRUE und das Ergebnis leer.",
    keypoints: ["NOT IN mit NULL liefert nie TRUE", "Ergebnis ist leer, kein Fehler", "Abhilfe: IS NOT NULL in der Unterabfrage oder NOT EXISTS"]
  },
  {
    id: "ga2-sql-subquery-011",
    why: "<code>ORDER BY … LIMIT 1</code> schneidet bei Gleichstand willkürlich ab; der Vergleich jeder Gruppe mit dem in einer Unterabfrage ermittelten Maximum liefert dagegen alle Spitzenreiter.",
    keypoints: ["LIMIT 1 verliert gleichrangige Treffer", "Maximum per Unterabfrage ermitteln", "HAVING COUNT(*) = (SELECT MAX …)", "MAX(COUNT(*)) ist nicht erlaubt"]
  },
  {
    id: "ga2-sql-subquery-015",
    why: "UNION muss Duplikate erkennen und entfernen (Sortieren/Hashen) und ist darum meist langsamer als UNION ALL; Mengenoperationen setzen gleich viele, typkompatible Spalten voraus, und hinter <code>=</code> darf eine Unterabfrage nur einen Wert liefern.",
    keypoints: ["UNION entfernt Duplikate, UNION ALL nicht", "Gleiche Spaltenzahl, kompatible Typen", "Nach = genau ein Wert, sonst IN", "Unterabfrage in FROM braucht Alias"]
  },
  {
    id: "ga2-sql-subquery-016",
    why: "Eine nicht korrelierte Unterabfrage ist eigenständig lauffähig und liefert ein festes Ergebnis, eine korrelierte verwendet Spalten der äußeren Abfrage und muss daher (logisch) für jede äußere Zeile neu berechnet werden.",
    keypoints: ["Unkorreliert: eigenständig, einmal ausgewertet", "Korreliert: Bezug auf äußere Spalte", "Korreliert: je äußerer Zeile neu ausgewertet"]
  },
  {
    id: "ga2-sql-subquery-007",
    why: "Ein Aggregat kann nicht direkt ein anderes Aggregat enthalten; deshalb wird zuerst in einer abgeleiteten Tabelle je Bestellung summiert und erst darüber der Durchschnitt gebildet.",
    keypoints: ["Erst je Bestellung summieren", "Dann über die Summen mitteln", "AVG(SUM(…)) ist nicht erlaubt", "Abgeleitete Tabelle braucht Alias"]
  },

  /* ---------- DML ---------- */
  {
    id: "ga2-sql-dml-013",
    why: "Die WHERE-Klausel bestimmt, welche Zeilen betroffen sind; fehlt sie, gilt die Anweisung für alle Zeilen, und mit Autocommit ist das Ergebnis sofort dauerhaft – die Tabellenstruktur bleibt aber erhalten, weil DELETE nur Daten (DML) betrifft.",
    keypoints: ["Ohne WHERE: alle Zeilen betroffen", "DELETE löscht Daten, nicht die Tabelle", "Autocommit: kein ROLLBACK mehr möglich", "Vorbeugung: SELECT testen, Transaktion"]
  },
  {
    id: "ga2-sql-dml-014",
    why: "Mehrere Zuweisungen in SET werden mit Komma getrennt, weil <code>AND</code> einen logischen Ausdruck bildet, dessen Ergebnis zugewiesen würde; außerdem schließen sich VALUES und SELECT bei INSERT aus, und ohne Spaltenliste müssen alle Spalten befüllt werden.",
    keypoints: ["SET-Zuweisungen mit Komma, nicht AND", "INSERT: entweder VALUES oder SELECT", "Ohne Spaltenliste alle Spalten befüllen", "Texte in Hochkommas, Dezimalpunkt"]
  },
  {
    id: "ga2-sql-dml-015",
    why: "Ein Fremdschlüsselwert muss in der referenzierten Tabelle existieren; ein INSERT mit einem nicht vorhandenen Artikel würde auf nichts verweisen und wird daher vom DBMS abgewiesen.",
    keypoints: ["FK-Wert muss in Zieltabelle existieren", "Verweis ins Leere wird abgewiesen", "Änderungen an Nicht-Schlüsseln sind unkritisch"]
  },
  {
    id: "ga2-sql-dml-011",
    why: "Eine korrelierte Unterabfrage im SET liefert für Fahrzeuge ohne Fahrten NULL, weil MAX über eine leere Menge NULL ergibt; mit <code>WHERE EXISTS</code> werden nur Zeilen geändert, für die es auch einen Wert gibt.",
    keypoints: ["SET-Unterabfrage je Zeile korreliert", "MAX über leere Menge = NULL", "WHERE EXISTS schränkt Änderung ein"]
  },
  {
    id: "ga2-sql-dml-006",
    why: "Beim Übernehmen von Daten aus einer Abfrage liefert das SELECT selbst die einzufügenden Zeilen, deshalb entfällt VALUES; die Spalten des SELECT müssen in Anzahl und Reihenfolge zur Spaltenliste passen.",
    keypoints: ["INSERT … SELECT ohne VALUES", "Spaltenanzahl und -reihenfolge müssen passen", "WHERE im SELECT wählt die Zeilen"]
  },
  {
    id: "ga2-sql-dml-003",
    why: "Eine Erhöhung um 10 % bedeutet neuer Preis = alter Preis × 1,10; da die Kategorie nur über ihre Bezeichnung bekannt ist, muss die ID per Unterabfrage ermittelt werden.",
    keypoints: ["Prozent: preis * 1.10", "Nicht preis + 10 oder * 10", "Kategorie-ID per Unterabfrage", "ROUND(…, 2) für Geldbeträge"]
  },

  /* ---------- Transaktionen ---------- */
  {
    id: "ga2-sql-transaktionen-001",
    why: "Atomarität macht die Transaktion zu einer unteilbaren Einheit: Wird sie nicht mit COMMIT abgeschlossen, setzt das DBMS anhand des Transaktionslogs alle bereits erfolgten Teilschritte zurück.",
    keypoints: ["Atomarität = alles oder nichts", "Unvollständige Transaktion wird zurückgesetzt", "Grundlage: Transaktionslog"]
  },
  {
    id: "ga2-sql-transaktionen-004",
    why: "Beim Lost Update rechnen beide Transaktionen mit demselben, inzwischen veralteten Lesewert, sodass der zweite Schreibvorgang den ersten überschreibt; Sperren oder relative Änderungen in einer Anweisung verhindern das.",
    keypoints: ["Beide lesen denselben alten Wert", "Zweites Schreiben überschreibt das erste", "Abhilfe: SELECT … FOR UPDATE / Sperren", "Oder relativ: SET bestand = bestand + 10"]
  },
  {
    id: "ga2-sql-transaktionen-005",
    why: "T2 liest einen Wert, den T1 noch nicht festgeschrieben hat und später per ROLLBACK verwirft – T2 arbeitet also mit Daten, die nie gültig waren; READ COMMITTED verhindert das, weil nur committete Daten sichtbar sind.",
    keypoints: ["Dirty Read: Lesen nicht committeter Daten", "Daten werden später per ROLLBACK verworfen", "Verhindert ab READ COMMITTED"]
  },
  {
    id: "ga2-sql-transaktionen-011",
    why: "Das Problem ist ein Non-Repeatable Read: Eine bereits gelesene Zeile ändert sich durch eine fremde, committete Transaktion; erst REPEATABLE READ hält gelesene Zeilen bis zum Transaktionsende stabil.",
    keypoints: ["Gleiche Zeile, anderer Wert → Non-Repeatable Read", "REPEATABLE READ ist die Mindeststufe", "Höhere Stufe = mehr Sperren, weniger Parallelität"]
  },
  {
    id: "lvl-sql-ta-11",
    why: "Beim Phantom Read ändert sich nicht eine gelesene Zeile, sondern die Menge der Zeilen, die die Bedingung erfüllen, weil eine andere Transaktion eine passende Zeile einfügt; erst SERIALIZABLE schützt nach SQL-Standard davor, kostet aber Parallelität.",
    keypoints: ["Neue Zeile taucht bei Wiederholung auf", "Abgrenzung zu Non-Repeatable Read", "Nach Standard erst SERIALIZABLE", "Nachteil: Wartezeiten, Abbrüche, Deadlocks"]
  },
  {
    id: "lvl-sql-ta-10",
    why: "Beim Deadlock hält jede Transaktion eine Sperre, auf die die andere wartet – ein Zyklus, der sich nie von selbst auflöst; das DBMS bricht deshalb eine Transaktion als Opfer ab, und eine einheitliche Sperrreihenfolge verhindert den Zyklus von vornherein.",
    keypoints: ["Zyklisches Warten auf gegenseitige Sperren", "DBMS bricht eine Transaktion ab (ROLLBACK)", "Vermeidung: gleiche Sperrreihenfolge", "Anwendung sollte Transaktion wiederholen"]
  },
  {
    id: "ga2-sql-transaktionen-014",
    why: "<code>ROLLBACK TO SAVEPOINT</code> nimmt nur die Änderungen nach dem Sicherungspunkt zurück, die Transaktion läuft weiter; erst COMMIT schreibt den dann gültigen Stand dauerhaft fest.",
    keypoints: ["Rücksetzen nur bis zum Savepoint", "Transaktion bleibt offen", "Vollständiges ROLLBACK nimmt alles zurück"]
  },
  {
    id: "ga2-sql-transaktionen-008",
    why: "Ein Index ist eine zusätzliche, sortierte Struktur (meist B-Baum), über die Zeilen ohne Full Table Scan gefunden werden; weil er bei jeder Änderung mitgepflegt werden muss, kostet er Speicher und verlangsamt Schreibzugriffe.",
    keypoints: ["B-Baum statt Full Table Scan", "Schneller bei WHERE, JOIN, ORDER BY", "Kostet Speicher, bremst INSERT/UPDATE", "Bei wenigen verschiedenen Werten kaum Nutzen"]
  },
  {
    id: "lvl-sql-ta-13",
    why: "Ein zusammengesetzter Index ist wie ein Telefonbuch nach Nachname, dann Vorname sortiert und kann nur von links her genutzt werden; daher gehört die Spalte mit Gleichheitsbedingung nach vorn und die Sortier- oder Bereichsspalte nach hinten.",
    keypoints: ["Präfix-Regel: Nutzung von links nach rechts", "Gleichheitsspalte vorn, Bereich/Sortierung hinten", "Index auf status: zu wenig verschiedene Werte", "Nachteil: Speicher, langsameres Schreiben"]
  },
  {
    id: "ga2-sql-transaktionen-009",
    why: "Wird Benutzereingabe direkt in den SQL-String eingebaut, kann sie die Struktur der Abfrage verändern (z. B. <code>' OR '1'='1</code>); Prepared Statements übertragen Parameter getrennt vom SQL-Code, sodass sie nur noch als Daten behandelt werden.",
    keypoints: ["Eingabe verändert die SQL-Struktur", "Prepared Statements mit Platzhaltern", "Parameter getrennt vom SQL-Code", "Zusätzlich: minimale Rechte, Validierung"]
  },
  {
    id: "ga2-sql-transaktionen-010",
    why: "Ein Trigger wird vom DBMS bei jedem INSERT/UPDATE/DELETE auf der Tabelle automatisch ausgelöst und kann auf OLD- und NEW-Werte zugreifen – die Protokollierung greift damit unabhängig davon, welche Anwendung die Änderung macht.",
    keypoints: ["Trigger feuert automatisch beim Ereignis", "Zugriff auf OLD und NEW", "Stored Procedure müsste explizit aufgerufen werden"]
  },
  {
    id: "ga2-sql-transaktionen-007",
    why: "Eine View zeigt nur die erlaubten Spalten und Zeilen; vergibt man Rechte ausschließlich auf die View und nicht auf die Basistabelle, bleiben sensible Daten wie das Gehalt verborgen (Least Privilege).",
    keypoints: ["View blendet sensible Spalten aus", "GRANT nur auf die View", "Kein Recht auf die Basistabelle", "Prinzip der minimalen Rechte"]
  }
);

/* ---- wisofg ---- */
// Paket C – Musterbegründungen („Warum ist das so?“) für WiSo und Fachgespräch
AP2.why.push(
  /* ---------- wiso-ausbildung ---------- */
  {
    id: "wiso-ausbildung-001",
    why: "Die Probezeit soll beiden Seiten eine kurze, risikoarme Prüfung ermöglichen. Weil der Azubi besonders schutzbedürftig ist, setzt das BBiG einen festen Rahmen (1 bis 4 Monate), von dem der Vertrag nicht zu seinen Lasten abweichen darf.",
    keypoints: ["BBiG ist Spezialgesetz, nicht § 622 BGB", "Rahmen: mindestens 1, höchstens 4 Monate", "Längere Vereinbarung ist unwirksam (Schutz des Azubis)"]
  },
  {
    id: "wiso-ausbildung-002",
    why: "In der Probezeit sollen sich beide Seiten ohne lange Bindung wieder trennen können – deshalb ist keine Frist und kein Grund nötig. Die Schriftform bleibt trotzdem Pflicht, weil sie Rechtssicherheit schafft.",
    keypoints: ["Probezeit = Erprobungsphase, schnelle Trennung möglich", "Keine Frist, keine Begründung", "Kündigung immer schriftlich"]
  },
  {
    id: "wiso-ausbildung-004",
    why: "Die Ausbildung dient der beruflichen Handlungsfähigkeit des Azubis, nicht der Bindung an einen Betrieb. Eine Bleibeverpflichtung würde die freie Berufswahl nach der Ausbildung einschränken und ist deshalb nichtig.",
    keypoints: ["Schutz der Berufsfreiheit nach der Ausbildung", "Bleibeverpflichtung ist nichtig", "Ausnahme: Vereinbarung in den letzten 6 Monaten"]
  },
  {
    id: "wiso-ausbildung-008",
    why: "Wer nach der Ausbildung einfach weiterarbeitet, schließt durch schlüssiges Verhalten einen Arbeitsvertrag. Weil nichts Abweichendes (z. B. eine schriftliche Befristung) vereinbart ist, gilt der gesetzliche Normalfall: unbefristet.",
    keypoints: ["Weiterbeschäftigung = konkludenter Arbeitsvertrag", "Ohne Vereinbarung keine wirksame Befristung", "Folge: unbefristetes Arbeitsverhältnis"]
  },
  {
    id: "wiso-ausbildung-014",
    why: "Die Umschulung führt zum selben anerkannten Berufsabschluss, daher legt man dieselbe IHK-Prüfung ab. Weil sie mit öffentlichen Mitteln gefördert wird, müssen Träger und Maßnahme vorher qualitätsgeprüft (AZAV) sein.",
    keypoints: ["Gleiche IHK-Prüfung, gleicher Abschluss", "Umschüler ist kein Auszubildender", "Bildungsgutschein nur bei AZAV-Zulassung"]
  },

  /* ---------- wiso-arbeitsrecht ---------- */
  {
    id: "wiso-arbeitsrecht-002",
    why: "Je länger jemand im Betrieb ist, desto schwerer trifft ihn der Verlust des Arbeitsplatzes – deshalb verlängert das Gesetz die Frist für Arbeitgeberkündigungen mit der Betriebszugehörigkeit. Bei 8 Jahren sind es 3 Monate zum Monatsende.",
    keypoints: ["Gestaffelte Fristen schützen langjährige Beschäftigte", "Gilt nur für Kündigung durch den Arbeitgeber", "8 Jahre → 3 Monate zum Monatsende"]
  },
  {
    id: "wiso-arbeitsrecht-005",
    why: "Arbeitgeber brauchen schnell Klarheit, ob eine Kündigung Bestand hat. Deshalb muss die Klage binnen 3 Wochen nach Zugang beim Arbeitsgericht erhoben werden; danach gilt die Kündigung als wirksam.",
    keypoints: ["Rechtssicherheit für beide Seiten", "3 Wochen ab Zugang der Kündigung", "Zuständig: Arbeitsgericht", "Fristversäumnis → Kündigung gilt als wirksam"]
  },
  {
    id: "wiso-arbeitsrecht-006",
    why: "Sachgrundlose Befristungen sind eine Ausnahme vom unbefristeten Normalfall und sollen nicht zu Kettenbefristungen missbraucht werden. Deshalb sind sie auf 2 Jahre und höchstens 3 Verlängerungen begrenzt.",
    keypoints: ["Unbefristeter Vertrag ist der Normalfall", "Max. 2 Jahre, max. 3 Verlängerungen", "Schutz vor Kettenbefristung", "Unwirksame Befristung → unbefristet"]
  },
  {
    id: "wiso-arbeitsrecht-012",
    why: "Besonderer Kündigungsschutz gilt für Personen, die wegen ihrer Lage besonders verletzlich oder von Benachteiligung bedroht sind. Schwangere sollen keinen Jobverlust fürchten, Betriebsräte sollen unabhängig gegenüber dem Arbeitgeber handeln können.",
    keypoints: ["Schwangere: Kündigungsverbot (Mutterschutz)", "Betriebsrat: nur außerordentliche Kündigung mit Zustimmung", "Ziel: Schutz vor Benachteiligung/Unabhängigkeit", "Alter oder Teilzeit allein reichen nicht"]
  },
  {
    id: "wiso-arbeitsrecht-014",
    why: "Kurze Krankheiten soll der Arbeitgeber im Rahmen seiner Fürsorgepflicht tragen, lange Krankheiten übernimmt die Solidargemeinschaft. Deshalb zahlt der Arbeitgeber 6 Wochen voll weiter, danach die Krankenkasse Krankengeld.",
    keypoints: ["Arbeitgeber: 6 Wochen 100 % Entgeltfortzahlung", "Danach Krankengeld der Krankenkasse", "Lastenteilung Arbeitgeber – Sozialversicherung"]
  },
  {
    id: "wiso-arbeitsrecht-020",
    why: "Die ordentliche Kündigung beendet das Arbeitsverhältnis planbar mit Frist, die außerordentliche sofort, weil das Weiterarbeiten unzumutbar ist. Die 2-Wochen-Frist verhindert, dass ein Arbeitgeber einen wichtigen Grund lange „aufspart“.",
    keypoints: ["Ordentlich: mit Kündigungsfrist, ggf. sozial gerechtfertigt", "Außerordentlich: wichtiger Grund, Unzumutbarkeit", "Erklärung binnen 2 Wochen ab Kenntnis"]
  },

  /* ---------- wiso-tarif-mitbestimmung ---------- */
  {
    id: "wiso-tarif-mitbestimmung-001",
    why: "Das Grundgesetz garantiert die Koalitionsfreiheit, also das Recht, sich in Gewerkschaften und Arbeitgeberverbänden zusammenzuschließen. Daraus folgt, dass diese Verbände Löhne und Arbeitsbedingungen selbst aushandeln – ohne den Staat.",
    keypoints: ["Art. 9 Abs. 3 GG: Koalitionsfreiheit", "Tarifparteien verhandeln ohne Staat", "Einzelheiten regelt das Tarifvertragsgesetz"]
  },
  {
    id: "wiso-tarif-mitbestimmung-004",
    why: "Ein Tarifvertrag ist ein Kompromiss, auf den sich beide Seiten verlassen sollen. Deshalb darf über die darin geregelten Punkte während der Laufzeit nicht gestreikt oder ausgesperrt werden.",
    keypoints: ["Vertragstreue während der Laufzeit", "Kein Streik/keine Aussperrung über geregelte Inhalte", "Erst nach Ablauf z. B. Warnstreiks"]
  },
  {
    id: "wiso-tarif-mitbestimmung-008",
    why: "Software, die Verhalten oder Leistung überwachen kann, greift stark in die Persönlichkeitsrechte der Beschäftigten ein. Deshalb hat der Betriebsrat ein echtes Mitbestimmungsrecht; ohne Einigung entscheidet die Einigungsstelle.",
    keypoints: ["§ 87 Abs. 1 Nr. 6 BetrVG: technische Überwachung", "Eignung zur Überwachung genügt", "Echtes Zustimmungsrecht, sonst Einigungsstelle"]
  },
  {
    id: "wiso-tarif-mitbestimmung-009",
    why: "Der Betriebsrat soll vor jeder Kündigung die Chance haben, Bedenken vorzubringen und den Arbeitgeber zum Umdenken zu bewegen. Wird diese Pflicht übergangen, ist die Kündigung unwirksam – sonst liefe das Recht ins Leere.",
    keypoints: ["Anhörung vor jeder Kündigung (§ 102 BetrVG)", "Ohne Anhörung: Kündigung unwirksam", "Anhörung ≠ Zustimmung"]
  },
  {
    id: "wiso-tarif-mitbestimmung-014",
    why: "Höhere Rechtsquellen setzen den Rahmen, niedrigere dürfen ihn nur ausfüllen. Abweichungen nach unten sind nur zugunsten des Arbeitnehmers erlaubt (Günstigkeitsprinzip).",
    keypoints: ["Grundgesetz → Gesetz → Tarifvertrag → Betriebsvereinbarung → Arbeitsvertrag", "Niedrigere Ebene nur günstiger erlaubt", "EU-Recht steht über nationalem Recht"]
  },
  {
    id: "wiso-tarif-mitbestimmung-016",
    why: "Normalerweise gilt ein Tarifvertrag nur für Mitglieder der Tarifparteien. Die Allgemeinverbindlicherklärung erstreckt ihn auf die ganze Branche, damit nicht tarifgebundene Firmen keinen Lohnunterbietungswettbewerb führen.",
    keypoints: ["Normal: Tarifbindung nur für Mitglieder", "AVE erstreckt TV auf alle im Geltungsbereich", "Schutz vor Lohndumping"]
  },

  /* ---------- wiso-sozialversicherung ---------- */
  {
    id: "wiso-sozialversicherung-002",
    why: "Die Unfallversicherung ersetzt die private Haftung des Arbeitgebers für Arbeitsunfälle. Weil sie ihn von dieser Haftung freistellt, trägt er die Beiträge allein – abhängig vom Risiko (Gefahrklasse) und der Lohnsumme.",
    keypoints: ["Beiträge allein vom Arbeitgeber", "Höhe nach Lohnsumme und Gefahrklasse", "Gegenleistung: Haftungsablösung"]
  },
  {
    id: "wiso-sozialversicherung-004",
    why: "In der Rentenversicherung wird nicht für sich selbst angespart: Die Beiträge der heute Arbeitenden werden sofort als Renten ausgezahlt. Darauf beruht das Versprechen, dass später die nächste Generation die eigene Rente zahlt.",
    keypoints: ["Umlageverfahren, kein Sparkonto", "Erwerbstätige zahlen für heutige Rentner", "Abhängig vom Verhältnis Beitragszahler/Rentner"]
  },
  {
    id: "wiso-sozialversicherung-009",
    why: "Die Verwaltung soll ihre Entscheidung zuerst selbst überprüfen können – das entlastet die Gerichte. Erst nach dem Widerspruchsverfahren ist der Weg zum Sozialgericht offen, nicht zum Arbeitsgericht.",
    keypoints: ["Erst Widerspruch beim Träger", "Dann Sozialgericht (nicht Arbeitsgericht)", "Instanzen: SG → LSG → BSG"]
  },
  {
    id: "wiso-sozialversicherung-015",
    why: "Grundsätzlich gilt die paritätische Finanzierung: Arbeitgeber und Arbeitnehmer zahlen je die Hälfte. Der Kinderlosenzuschlag ist eine Ausnahme, weil Kinderlose keinen Beitrag zur nächsten Beitragszahlergeneration leisten.",
    keypoints: ["RV und AV je zur Hälfte", "Kinderlosenzuschlag zahlt nur der Arbeitnehmer", "Unfallversicherung zahlt nur der Arbeitgeber"]
  },
  {
    id: "wiso-sozialversicherung-018",
    why: "Im Umlageverfahren hängen die Renten direkt von der Zahl der Beitragszahler ab. Wenn weniger Junge mehr und länger lebende Rentner finanzieren müssen, steigen Beiträge oder sinkt das Rentenniveau.",
    keypoints: ["Umlageverfahren: Beitragszahler finanzieren Rentner", "Weniger Geburten, höhere Lebenserwartung", "Gegenmaßnahmen: Renteneintrittsalter, Zuwanderung, private/betriebliche Vorsorge"]
  },

  /* ---------- wiso-unternehmen ---------- */
  {
    id: "wiso-unternehmen-001",
    why: "Der Kommanditist ist nur Kapitalgeber und hat keine Geschäftsführungsbefugnis. Weil er die Geschäfte nicht lenkt, haftet er auch nur bis zur Höhe seiner Einlage – ist sie eingezahlt, ist sein Privatvermögen geschützt.",
    keypoints: ["Kommanditist = Kapitalgeber ohne Geschäftsführung", "Haftung nur bis zur Einlage", "Eingezahlte Einlage schützt Privatvermögen"]
  },
  {
    id: "wiso-unternehmen-004",
    why: "Bei der AG sind Leitung und Kontrolle bewusst getrennt: Der Vorstand führt die Geschäfte, der Aufsichtsrat bestellt und überwacht ihn. Die Hauptversammlung wirkt nur indirekt über die Wahl des Aufsichtsrats.",
    keypoints: ["Trennung von Leitung und Kontrolle", "Aufsichtsrat bestellt und überwacht Vorstand", "Hauptversammlung wählt Aufsichtsrat"]
  },
  {
    id: "wiso-unternehmen-005",
    why: "Die Prokura erlaubt fast alle Geschäfte des laufenden Betriebs, aber keine Grundlagengeschäfte, die die Existenz des Unternehmens oder die persönliche Verantwortung des Inhabers betreffen. Die Bilanz zu unterschreiben ist Pflicht des Kaufmanns selbst.",
    keypoints: ["Prokura = sehr weite Vollmacht für Betriebsgeschäfte", "Grundlagengeschäfte bleiben dem Inhaber", "Bilanz/Steuererklärung unterschreibt der Inhaber"]
  },
  {
    id: "wiso-unternehmen-014",
    why: "Die OHG hat kein Mindestkapital – zum Ausgleich haften die Gesellschafter persönlich, unbeschränkt und gesamtschuldnerisch. Der Gläubiger darf sich deshalb aussuchen, wen er für die ganze Schuld in Anspruch nimmt.",
    keypoints: ["Unbeschränkt, unmittelbar, solidarisch", "Gläubiger kann vollen Betrag von einem fordern", "Ausgleich danach im Innenverhältnis"]
  },
  {
    id: "wiso-unternehmen-015",
    why: "Weil die Prokura so weitreichend ist, muss sie ausdrücklich erteilt und im Handelsregister öffentlich gemacht werden – Geschäftspartner sollen sich darauf verlassen können. Aus demselben Grund wirken interne Beschränkungen nicht nach außen.",
    keypoints: ["Ausdrückliche Erteilung nur durch Kaufmann", "Eintragung ins Handelsregister, Zeichnung „ppa.“", "Beschränkungen nur im Innenverhältnis wirksam"]
  },
  {
    id: "wiso-unternehmen-019",
    why: "Ein eingeführter Firmenname hat einen Wert (Ruf, Kundenstamm). Die Firmenbeständigkeit erlaubt deshalb, ihn beim Inhaberwechsel mit Einwilligung des bisherigen Inhabers fortzuführen.",
    keypoints: ["Firmenname hat Goodwill-Wert", "Fortführung bei Inhaberwechsel erlaubt", "Einwilligung des bisherigen Inhabers nötig"]
  },

  /* ---------- wiso-vertragsrecht ---------- */
  {
    id: "wiso-vertragsrecht-001",
    why: "Das Gesetz geht davon aus, dass Kinder unter 7 Jahren die Folgen eines Vertrags nicht überblicken. Ihre Erklärungen sind daher von vornherein nichtig – auch Eltern können sie nicht nachträglich genehmigen.",
    keypoints: ["Unter 7 Jahren geschäftsunfähig", "Willenserklärung nichtig, nicht heilbar", "Taschengeldparagraph erst ab 7 Jahren"]
  },
  {
    id: "wiso-vertragsrecht-003",
    why: "Ein Online-Shop ist nur eine Einladung, Angebote abzugeben – sonst müsste der Händler an jeden liefern, auch wenn die Ware ausverkauft ist. Der Kunde macht mit der Bestellung den Antrag, der Händler nimmt erst mit Auftragsbestätigung oder Lieferung an.",
    keypoints: ["Shop-Angebot = invitatio ad offerendum", "Bestellung = Antrag", "Annahme durch Auftrags-/Versandbestätigung oder Lieferung", "Eingangsbestätigung ist keine Annahme"]
  },
  {
    id: "wiso-vertragsrecht-007",
    why: "Für den Käufer macht es keinen Unterschied, ob die gelieferte Sache defekt oder eine ganz andere ist – er bekommt nicht das Vereinbarte. Deshalb behandelt das Gesetz die Falschlieferung wie einen Sachmangel.",
    keypoints: ["Falschlieferung steht Sachmangel gleich", "Mängelrechte, vorrangig Nacherfüllung", "Handelskauf: unverzüglich rügen"]
  },
  {
    id: "wiso-vertragsrecht-009",
    why: "Der Vertrag soll möglichst erhalten bleiben, und der Verkäufer bekommt eine zweite Chance. Deshalb muss der Käufer zuerst Nacherfüllung verlangen; Rücktritt, Minderung oder Schadensersatz kommen erst danach.",
    keypoints: ["Vorrang der Nacherfüllung", "Käufer wählt Reparatur oder Ersatz", "Weitere Rechte erst nach erfolgloser Frist"]
  },
  {
    id: "wiso-vertragsrecht-012",
    why: "Die Gewährleistung ist ein gesetzlicher Anspruch gegen den Verkäufer, der nicht wegverhandelt werden kann. Die Garantie ist ein freiwilliges Zusatzversprechen, meist des Herstellers, dessen Inhalt frei gestaltet wird.",
    keypoints: ["Gewährleistung: gesetzlich, gegen Verkäufer", "Garantie: freiwillig, vertraglich, oft Hersteller", "Garantie gilt zusätzlich, ersetzt nichts"]
  },
  {
    id: "wiso-vertragsrecht-016",
    why: "Nichtigkeit tritt ein, wenn ein Geschäft so grundlegend fehlerhaft ist, dass es nie wirksam werden soll – etwa wegen Geschäftsunfähigkeit oder wenn eine vorgeschriebene Form (Notar beim Grundstückskauf) fehlt. Täuschung oder fehlende Zustimmung machen dagegen nur anfechtbar bzw. schwebend unwirksam.",
    keypoints: ["Nichtig: Geschäftsunfähigkeit, Formmangel", "Grundstückskauf braucht notarielle Beurkundung", "Abgrenzung: anfechtbar, schwebend unwirksam"]
  },
  {
    id: "wiso-vertragsrecht-021",
    why: "Verzug setzt voraus, dass der Lieferer trotz Fälligkeit und Mahnung nicht liefert; die Mahnung entfällt bei einem festen Kalendertermin. Die Nachfrist gibt ihm eine letzte Chance, bevor der Käufer sich vom Vertrag lösen oder Schadensersatz statt der Leistung verlangen darf.",
    keypoints: ["Fälligkeit + Mahnung (entbehrlich bei Kalendertermin)", "Verschulden nur für Schadensersatz nötig", "Ohne Nachfrist: Lieferung + Verzugsschaden", "Nach Nachfrist: Rücktritt/Schadensersatz statt Leistung"]
  },

  /* ---------- wiso-wirtschaft ---------- */
  {
    id: "wiso-wirtschaft-003",
    why: "Ein künstlich niedriger Preis macht das Gut für mehr Käufer attraktiv, lohnt sich aber für weniger Anbieter. Die nachgefragte Menge übersteigt deshalb die angebotene – es entsteht Knappheit.",
    keypoints: ["Höchstpreis liegt unter Gleichgewichtspreis", "Nachfrage steigt, Angebot sinkt", "Folge: Nachfrageüberhang (Knappheit, Schwarzmarkt)"]
  },
  {
    id: "wiso-wirtschaft-006",
    why: "Höhere Leitzinsen verteuern Kredite für Banken, Unternehmen und Haushalte. Dadurch wird weniger investiert und konsumiert, die Nachfrage sinkt und mit ihr der Preisauftrieb.",
    keypoints: ["Ziel der EZB: Preisniveaustabilität (ca. 2 %)", "Zinserhöhung → Kredite teurer", "Weniger Nachfrage → Inflation sinkt"]
  },
  {
    id: "wiso-wirtschaft-007",
    why: "Inflation entwertet Geld. Wer einen festen Geldbetrag schuldet, zahlt ihn später mit Geld zurück, das weniger wert ist – real sinkt seine Schuld, während Sparer und Gläubiger verlieren.",
    keypoints: ["Geld verliert Kaufkraft", "Feste Schuld wird real kleiner", "Verlierer: Sparer, Gläubiger, feste Einkommen"]
  },
  {
    id: "wiso-wirtschaft-012",
    why: "Der Nominalzins sagt, wie viel Geld man mehr hat, die Inflation, wie viel weniger man dafür kaufen kann. Der tatsächliche Kaufkraftgewinn ist daher näherungsweise die Differenz.",
    keypoints: ["Realzins ≈ Nominalzins − Inflationsrate", "Misst Kaufkraftzuwachs", "Negativer Realzins = realer Verlust"]
  },
  {
    id: "wiso-wirtschaft-016",
    why: "Antizyklische Politik soll Konjunkturschwankungen glätten: Fehlt private Nachfrage, springt der Staat ein; ist die Wirtschaft überhitzt, hält er sich zurück. Sie ist Aufgabe des Staates (Fiskalpolitik), nicht der EZB.",
    keypoints: ["Gegen den Konjunkturverlauf handeln (Keynes)", "Abschwung: Ausgaben rauf, ggf. Kredite", "Boom: Ausgaben runter, Rücklagen bilden"]
  },

  /* ---------- wiso-kalkulation ---------- */
  {
    id: "wiso-kalkulation-007",
    why: "Wer Skonto nicht zieht, „leiht“ sich den Rechnungsbetrag nur für die wenigen Tage zwischen Skontofrist und Zahlungsziel – und bezahlt dafür den Skontobetrag. Auf ein Jahr hochgerechnet ergibt das einen sehr hohen Zinssatz.",
    keypoints: ["Kreditdauer = Zahlungsziel − Skontofrist", "Skontosatz × 360 ÷ Kreditdauer", "Lieferantenkredit ist sehr teuer"]
  },
  {
    id: "wiso-kalkulation-008",
    why: "Der Kontokorrentkredit ist zwar teuer, wird aber nur für wenige Tage gebraucht. Der Skontoertrag ist deshalb deutlich höher als die Kreditzinsen, die Differenz ist der Finanzierungsgewinn.",
    keypoints: ["Skontoertrag vom Rechnungsbetrag", "Zinsen nur auf Überweisungsbetrag für die Kreditdauer", "Gewinn = Skontoertrag − Kreditzinsen"]
  },
  {
    id: "wiso-kalkulation-011",
    why: "Eine Investition hat sich amortisiert, wenn die jährlichen Rückflüsse die Anschaffungskosten wieder eingespielt haben. Zum Rückfluss zählt auch die Abschreibung, weil sie Aufwand ohne Geldabfluss ist.",
    keypoints: ["Amortisationsdauer = Anschaffungskosten ÷ Rückfluss", "Rückfluss = Gewinn + Abschreibung", "Kürzere Dauer = geringeres Risiko"]
  },
  {
    id: "wiso-kalkulation-013",
    why: "Produktivität misst ein reines Mengenverhältnis (Output je Input) ohne Geldwerte. Mehr erledigte Tickets bei gleichen Stunden bedeuten also höhere Produktivität – Rentabilität oder Wirtschaftlichkeit bräuchten Euro-Größen.",
    keypoints: ["Produktivität = Ausbringung ÷ Einsatz (Mengen)", "Wirtschaftlichkeit/Rentabilität = Wertgrößen", "Gleicher Input, mehr Output → produktiver"]
  },
  {
    id: "wiso-kalkulation-019",
    why: "Fixkosten fallen unabhängig von der Menge an und verteilen sich bei steigender Stückzahl auf mehr Einheiten – die Stückkosten sinken. Kurzfristig reicht ein Preis, der die variablen Kosten deckt, weil Fixkosten ohnehin anfallen.",
    keypoints: ["Fixe Kosten mengenunabhängig, variable mengenabhängig", "Fixkostendegression: Stückkosten sinken mit Menge", "Kurzfristige Preisuntergrenze = variable Stückkosten"]
  },

  /* ---------- wiso-arbeitsschutz ---------- */
  {
    id: "wiso-arbeitsschutz-001",
    why: "Der Arbeitgeber bestimmt Arbeitsplätze, Abläufe und Arbeitsmittel und trägt deshalb die Verantwortung für den Arbeitsschutz. Fachkräfte und Betriebsarzt beraten nur, die Pflicht bleibt bei ihm.",
    keypoints: ["Arbeitgeber organisiert die Arbeit → trägt Verantwortung", "Gefährdungsbeurteilung inkl. psychischer Belastungen", "Berater entlasten nicht von der Verantwortung"]
  },
  {
    id: "wiso-arbeitsschutz-005",
    why: "Die Unfallversicherung schützt nur Wege, die mit der Arbeit zusammenhängen. Ein Umweg zum privaten Einkaufen dient eigenen Interessen und unterbricht deshalb den Versicherungsschutz – Kinderbetreuung und Fahrgemeinschaften sind bewusst ausgenommen.",
    keypoints: ["Versichert: unmittelbarer Arbeitsweg", "Ausnahmen: Kinderbetreuung, Fahrgemeinschaft", "Privater Umweg unterbricht den Schutz"]
  },
  {
    id: "wiso-arbeitsschutz-012",
    why: "Arbeitsschutz funktioniert nur, wenn auch die Beschäftigten mitwirken. Sie müssen Schutzausrüstung richtig nutzen und Gefahren melden, weil sie Mängel oft zuerst bemerken.",
    keypoints: ["Mitwirkungspflicht der Beschäftigten", "Arbeitsmittel und PSA bestimmungsgemäß nutzen", "Gefahren und Defekte sofort melden"]
  },
  {
    id: "wiso-arbeitsschutz-016",
    why: "Lange oder häufige Arbeitsunfähigkeit soll nicht automatisch zur Kündigung führen. Das BEM verpflichtet den Arbeitgeber, gemeinsam mit dem Beschäftigten nach Wegen zu suchen, die Arbeitsunfähigkeit zu überwinden und den Arbeitsplatz zu erhalten.",
    keypoints: ["Pflicht bei mehr als 6 Wochen AU in 12 Monaten", "Ziel: Arbeitsplatz erhalten, Rückfall vorbeugen", "Teilnahme für Beschäftigte freiwillig"]
  },
  {
    id: "wiso-arbeitsschutz-018",
    why: "Beschäftigte müssen Gefahren kennen, bevor sie ihnen ausgesetzt sind. Deshalb wird vor Aufnahme der Tätigkeit und bei Veränderungen unterwiesen und regelmäßig wiederholt, damit das Wissen aktuell bleibt.",
    keypoints: ["Vor Aufnahme der Tätigkeit", "Bei Veränderungen (neue Aufgaben, Arbeitsmittel)", "Regelmäßig, mindestens jährlich, dokumentiert"]
  },

  /* ---------- fg-projektarbeit ---------- */
  {
    id: "fg-projektarbeit-011",
    why: "Der Prüfungsausschuss muss vorab sicherstellen, dass das Vorhaben als Prüfungsleistung geeignet ist. Ohne genehmigten Antrag gibt es keine prüfbare Projektarbeit – deshalb wird fristgerecht nachgebessert.",
    keypoints: ["Genehmigung ist Voraussetzung", "Überarbeiteter/neuer Antrag innerhalb der IHK-Frist", "Ohne Genehmigung keine Prüfungsleistung"]
  },
  {
    id: "fg-projektarbeit-015",
    why: "Geprüft wird, ob du selbstständig planen, entscheiden und umsetzen kannst. Ein zu kleines Projekt bietet keine Entscheidungen, ein zu großes ist in 80 Stunden nicht sauber abschließbar.",
    keypoints: ["Projektmerkmale: einmalig, befristet, klares Ziel, Ressourcen", "Eigene Planungs- und Entscheidungsanteile", "Zu klein: keine Entscheidungen; zu groß: nicht in 80 h"]
  },
  {
    id: "fg-projektarbeit-017",
    why: "Ein Projekt ist nur sinnvoll, wenn sein Nutzen die Kosten übersteigt. Die Wirtschaftlichkeitsbetrachtung belegt das mit nachvollziehbaren Zahlen, vergleicht mit Alternativen (Make-or-Buy) und zeigt, wann sich die Investition rechnet.",
    keypoints: ["Projektkosten: Personal- und Sachkosten", "Make-or-Buy-Vergleich", "Amortisation mit nachvollziehbaren Annahmen", "Nicht-monetäre Vorteile ergänzen"]
  },
  {
    id: "fg-projektarbeit-018",
    why: "Der Soll-Ist-Vergleich zeigt, ob die Ziele erreicht wurden und wie realistisch die Planung war. Begründete Abweichungen zeigen Reflexionsfähigkeit – verschwiegene wirken unglaubwürdig.",
    keypoints: ["Ziele und Zeit: geplant vs. tatsächlich", "Tabelle mit Differenz je Phase", "Abweichungen begründen und reflektieren"]
  },

  /* ---------- fg-fachgespraech ---------- */
  {
    id: "fg-fachgespraech-003",
    why: "Prüfer wollen sehen, wie du denkst, nicht nur was du auswendig weißt. Ehrliches Eingestehen plus lautes Herleiten zeigt Problemlösekompetenz; erfundene Antworten fallen bei Nachfragen auf.",
    keypoints: ["Ehrlich sein statt raten", "Laut aus Bekanntem herleiten", "Erfundenes wird durch Nachfragen entlarvt"]
  },
  {
    id: "fg-fachgespraech-005",
    why: "Eine Entscheidung ist erst dann fachlich begründet, wenn Alternativen betrachtet und anhand von Kriterien verworfen wurden. Das zeigt Abwägung statt Zufall.",
    keypoints: ["2–3 konkrete Alternativen nennen", "Bewertung nach Kriterien (Kosten, Wartbarkeit, Integration)", "Ablehnung sachlich begründen"]
  },
  {
    id: "fg-fachgespraech-011",
    why: "Eine Amortisationsrechnung ist nur so gut wie ihre Annahmen. Wer die Herkunft der Zahlen (Stundensätze, gemessene Zeitersparnis) und den Rechenweg erklären kann, macht das Ergebnis glaubwürdig.",
    keypoints: ["Quellen der Annahmen nennen", "Rechenweg: Kosten ÷ jährliche Einsparung", "Unsicherheiten/Risiken offen ansprechen"]
  },
  {
    id: "fg-fachgespraech-012",
    why: "Das Vorgehensmodell muss zu Projektgröße, Team und Stabilität der Anforderungen passen. Für ein kurzes Einzelprojekt mit klaren Anforderungen ist ein planbares, phasenorientiertes Vorgehen oft passender als volles Scrum mit Rollen und Sprints.",
    keypoints: ["Wasserfall: sequenziell, planbar, unflexibel", "Scrum: iterativ, flexibel, braucht Team und Rollen", "Wahl anhand Projektgröße und Anforderungen begründen"]
  },
  {
    id: "fg-fachgespraech-018",
    why: "Abweichungen kommen in fast jedem Projekt vor; geprüft wird der professionelle Umgang damit. Ursache nennen, früh erkennen, gegensteuern und daraus lernen zeigt Projektkompetenz.",
    keypoints: ["Ursache sachlich benennen", "Früh erkannt durch Ist-/Plan-Abgleich", "Gegenmaßnahmen: Priorisieren, Rücksprache", "Lessons Learned ableiten"]
  },
  {
    id: "fg-fachgespraech-029",
    why: "Make-or-Buy ist eine wirtschaftliche und fachliche Abwägung. Eine Eigenentwicklung lohnt sich, wenn Standardsoftware Anforderungen oder Schnittstellen nicht abdeckt oder auf Dauer teurer ist.",
    keypoints: ["Marktrecherche zu Standardprodukten", "Kostenvergleich: Lizenzen vs. Entwicklung + Wartung", "Anforderungsabdeckung und Integration", "Abhängigkeiten/Datenschutz berücksichtigen"]
  }
);
