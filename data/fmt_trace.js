// Paket A – Schreibtischtest-Aufgaben (Fragetyp "trace"): feste Aufgaben + Generatoren.
// Definiert KEINE Topics, nutzt die GA2-Topics aus data/ga2_algo.js. Tabellen wurden per Simulation erzeugt.
window.AP2 = window.AP2 || { topics: [], questions: [], exams: [], generators: [] };
(function () {
  var qs = [];

  qs.push({
    id: "fmt-trace-001",
    part: "GA2",
    topic: "ga2-pseudocode",
    type: "trace",
    difficulty: 1,
    step: 1,
    points: 3,
    context: "Das Kassensystem eines Drogeriemarkts vergibt in einer Aktionswoche Treuepunkte: am 1. Tag 1 Punkt, am 2. Tag 2 Punkte usw. Die Funktion <code>treuepunkte</code> berechnet die Gesamtpunkte nach <code>n</code> Tagen.",
    question: "Führen Sie einen Schreibtischtest für den Aufruf <code>treuepunkte(5)</code> durch und füllen Sie die Tabelle aus. Tragen Sie die Werte <b>am Ende</b> jedes Schleifendurchlaufs ein.",
    code: `funktion treuepunkte(n: Ganzzahl): Ganzzahl
    var summe: Ganzzahl = 0
    für i von 1 bis n
        summe = summe + i
    ende für
    rückgabe summe
ende funktion`,
    trace: {
      columns: ["i","summe","Rückgabe"],
      rows: [
        [{ g: "–" }, { g: "0" }, null],
        ["1", "1", null],
        ["2", "3", null],
        ["3", "6", null],
        ["4", "10", null],
        ["5", "15", null],
        [null, null, "15"],
      ],
      labels: ["Start","1. Durchlauf","2. Durchlauf","3. Durchlauf","4. Durchlauf","5. Durchlauf","Ende"],
    },
    solution: "Die Zählschleife läuft von 1 bis 5 (Grenze <b>inklusive</b>). In jedem Durchlauf wird der aktuelle Wert von <code>i</code> zu <code>summe</code> addiert: 0 + 1 = 1, 1 + 2 = 3, 3 + 3 = 6, 6 + 4 = 10, 10 + 5 = 15. Nach der Schleife wird <b>15</b> zurückgegeben.",
    explanation: "Typische Fehler: die obere Grenze 5 vergessen (Ergebnis 10) oder <code>summe</code> mit dem <i>alten</i> statt dem neuen Wert eintragen. Kontrolle: Gaußsche Summenformel n · (n + 1) / 2 = 5 · 6 / 2 = 15.",
    tags: ["schreibtischtest","zaehlschleife","summe"],
  });

  qs.push({
    id: "fmt-trace-002",
    part: "GA2",
    topic: "ga2-pseudocode",
    type: "trace",
    difficulty: 1,
    step: 2,
    points: 4,
    context: "Eine Lagerverwaltung prüft, auf wie vielen Lagerplätzen eine <b>gerade</b> Stückzahl liegt – diese Artikel können paarweise verpackt werden.",
    question: "Führen Sie einen Schreibtischtest durch und füllen Sie die Tabelle aus. Tragen Sie je Durchlauf den Wert der Bedingung und den Wert von <code>anzahl</code> <b>nach</b> dem Durchlauf ein.",
    code: `var mengen: Array von Ganzzahl = [4, 7, 10, 3, 8]
var anzahl: Ganzzahl = 0
für i von 0 bis länge(mengen) - 1
    wenn mengen[i] mod 2 == 0 dann
        anzahl = anzahl + 1
    ende wenn
ende für
ausgabe(anzahl)`,
    trace: {
      columns: ["i","mengen[i]","mengen[i] mod 2 == 0","anzahl"],
      rows: [
        [{ g: "–" }, { g: "–" }, { g: "–" }, { g: "0" }],
        [{ g: "0" }, "4", "wahr|true", "1"],
        [{ g: "1" }, "7", "falsch|false", "1"],
        [{ g: "2" }, "10", "wahr|true", "2"],
        [{ g: "3" }, "3", "falsch|false", "2"],
        [{ g: "4" }, "8", "wahr|true", "3"],
      ],
      labels: ["Start","1. Durchlauf","2. Durchlauf","3. Durchlauf","4. Durchlauf","5. Durchlauf"],
    },
    solution: "Arrays beginnen bei Index 0, daher läuft <code>i</code> von 0 bis 4. <code>mod</code> liefert den Rest der Ganzzahldivision: 4, 10 und 8 haben den Rest 0 (gerade), 7 und 3 den Rest 1. <code>anzahl</code> wird nur bei wahrer Bedingung erhöht: 1, 1, 2, 2, 3. Ausgabe: <b>3</b>.",
    explanation: "Typische Fehler: <code>i</code> mit dem Wert <code>mengen[i]</code> verwechseln oder <code>anzahl</code> in jedem Durchlauf erhöhen. Merke: Der Index sagt, <i>wo</i> ein Element steht, <code>mengen[i]</code>, <i>was</i> dort steht.",
    tags: ["schreibtischtest","verzweigung","modulo","zaehlen"],
  });

  qs.push({
    id: "fmt-trace-003",
    part: "GA2",
    topic: "ga2-pseudocode",
    type: "trace",
    difficulty: 1,
    step: 3,
    points: 4,
    context: "Ein Getränkehändler verkauft von einem Artikel täglich 12 Kisten. Das Programm ermittelt, nach wie vielen Tagen der Mindestbestand von 15 Kisten unterschritten wird.",
    question: "Führen Sie einen Schreibtischtest durch und füllen Sie die Tabelle aus. Die Spalte „bestand &gt;= 15“ enthält das Ergebnis der Prüfung <b>vor</b> dem Durchlauf, <code>bestand</code> und <code>tage</code> die Werte <b>nach</b> dem Durchlauf. In der letzten Zeile endet die Schleife.",
    code: `var bestand: Ganzzahl = 50
var tage: Ganzzahl = 0
solange bestand >= 15
    bestand = bestand - 12
    tage = tage + 1
ende solange
ausgabe(tage)`,
    trace: {
      columns: ["bestand >= 15","bestand","tage","Ausgabe"],
      rows: [
        [{ g: "–" }, { g: "50" }, { g: "0" }, null],
        ["wahr|true", "38", "1", null],
        ["wahr|true", "26", "2", null],
        ["wahr|true", "14", "3", null],
        ["falsch|false", null, null, "3"],
      ],
      labels: ["Start","1. Durchlauf","2. Durchlauf","3. Durchlauf","Schleifenende"],
    },
    solution: "Die <code>solange</code>-Schleife prüft die Bedingung <b>vor</b> jedem Durchlauf: 50 ≥ 15 → 38 Kisten, Tag 1; 38 ≥ 15 → 26, Tag 2; 26 ≥ 15 → 14, Tag 3; 14 ≥ 15 ist falsch → Schleifenende. Ausgabe: <b>3</b>.",
    explanation: "Typischer Fehler: einen weiteren Durchlauf ausführen (bestand = 2, tage = 4), obwohl die Bedingung bereits falsch ist. Die Anzahl der Durchläufe einer <code>solange</code>-Schleife steht vorher nicht fest – sie hängt nur von der Bedingung ab.",
    tags: ["schreibtischtest","solange","abbruchbedingung"],
  });

  qs.push({
    id: "fmt-trace-004",
    part: "GA2",
    topic: "ga2-pseudocode",
    type: "trace",
    difficulty: 2,
    step: 1,
    points: 6,
    context: "Ein Diagnoseprogramm zeigt Speicheradressen hexadezimal an. Dazu wird eine Dezimalzahl mit dem Restwertverfahren (fortgesetzte Division durch 16) umgerechnet. <code>ziffern[r]</code> liefert das Zeichen an Position <code>r</code> (0-basiert).",
    question: "Führen Sie einen Schreibtischtest für den Aufruf <code>zuHex(64206)</code> durch und füllen Sie die Tabelle aus. Die Bedingung wird <b>vor</b> dem Durchlauf geprüft, alle anderen Werte gelten <b>nach</b> dem Durchlauf.",
    code: `funktion zuHex(zahl: Ganzzahl): Text
    var ziffern: Text = "0123456789ABCDEF"
    var ergebnis: Text = ""
    solange zahl > 0
        var rest: Ganzzahl = zahl mod 16
        ergebnis = ziffern[rest] + ergebnis
        zahl = zahl div 16
    ende solange
    rückgabe ergebnis
ende funktion`,
    trace: {
      columns: ["zahl > 0","rest","ergebnis","zahl"],
      rows: [
        [{ g: "–" }, { g: "–" }, { g: "\"\"" }, { g: "64206" }],
        ["wahr|true", "14", "E", "4012"],
        ["wahr|true", "12", "CE", "250"],
        ["wahr|true", "10", "ACE", "15"],
        ["wahr|true", "15", "FACE", "0"],
        ["falsch|false", null, null, null],
      ],
      labels: ["Start","1. Durchlauf","2. Durchlauf","3. Durchlauf","4. Durchlauf","Schleifenende"],
    },
    solution: "64206 mod 16 = 14 → „E“, 64206 div 16 = 4012; 4012 mod 16 = 12 → „C“, 4012 div 16 = 250; 250 mod 16 = 10 → „A“, 250 div 16 = 15; 15 mod 16 = 15 → „F“, 15 div 16 = 0. Da jede neue Ziffer <b>vorne</b> angefügt wird, entsteht E → CE → ACE → <b>FACE</b>. Bei zahl = 0 endet die Schleife. Probe: 15·16³ + 10·16² + 12·16 + 14 = 64206.",
    explanation: "Typische Fehler: die Ziffer hinten anhängen (Ergebnis „ECAF“, also rückwärts) oder den Rest als Dezimalzahl (14) statt als Hex-Ziffer (E) notieren. <code>div</code> ist die Ganzzahldivision ohne Nachkommastellen.",
    tags: ["schreibtischtest","zahlensysteme","hexadezimal","restwertverfahren"],
  });

  qs.push({
    id: "fmt-trace-005",
    part: "GA2",
    topic: "ga2-pseudocode",
    type: "trace",
    difficulty: 2,
    step: 2,
    points: 6,
    context: "Das Kassensystem eines Baumarkts gewährt eine Rabattstaffel je Artikel: ab 40 € 10 %, ab 20 € 5 %, darunter kein Rabatt. Alle Beträge sind ganze Euro, <code>div</code> ist die Ganzzahldivision.",
    question: "Führen Sie einen Schreibtischtest durch und füllen Sie die Tabelle aus (Werte jeweils am Ende des Durchlaufs).",
    code: `var preise: Array von Ganzzahl = [20, 50, 8, 40, 60]
var summe: Ganzzahl = 0
für i von 0 bis länge(preise) - 1
    var rabatt: Ganzzahl = 0
    wenn preise[i] >= 40 dann
        rabatt = 10
    sonst wenn preise[i] >= 20 dann
        rabatt = 5
    ende wenn
    summe = summe + preise[i] - preise[i] * rabatt div 100
ende für
ausgabe(summe)`,
    trace: {
      columns: ["i","preise[i]","rabatt","summe"],
      rows: [
        [{ g: "–" }, { g: "–" }, { g: "–" }, { g: "0" }],
        [{ g: "0" }, { g: "20" }, "5", "19"],
        [{ g: "1" }, { g: "50" }, "10", "64"],
        [{ g: "2" }, { g: "8" }, "0", "72"],
        [{ g: "3" }, { g: "40" }, "10", "108"],
        [{ g: "4" }, { g: "60" }, "10", "162"],
      ],
      labels: ["Start","1. Durchlauf","2. Durchlauf","3. Durchlauf","4. Durchlauf","5. Durchlauf"],
    },
    solution: "Die Mehrfachverzweigung prüft von oben nach unten, nur der erste zutreffende Zweig wird ausgeführt: 20 → 5 % (Abzug 100 div 100 = 1) → 19; 50 → 10 % (Abzug 5) → 64; 8 → kein Rabatt → 72; 40 → 10 % (Abzug 4) → 108; 60 → 10 % (Abzug 6) → <b>162</b>.",
    explanation: "Typische Fehler: bei 40 € oder mehr <i>beide</i> Rabatte anwenden (bei <code>sonst wenn</code> wird nach dem ersten Treffer nicht weiter geprüft), <code>rabatt</code> aus dem Vordurchlauf übernehmen (er wird in jedem Durchlauf neu mit 0 angelegt) oder die Grenze 40 als „größer als“ lesen.",
    tags: ["schreibtischtest","mehrfachverzweigung","kassensystem"],
  });

  qs.push({
    id: "fmt-trace-006",
    part: "GA2",
    topic: "ga2-pseudocode",
    type: "trace",
    difficulty: 2,
    step: 3,
    points: 7,
    context: "Ein Verpackungsbetrieb möchte 126 Schrauben und 48 Muttern ohne Rest auf möglichst wenige, gleich bestückte Tütchen verteilen. Dazu wird der größte gemeinsame Teiler mit dem euklidischen Algorithmus berechnet.",
    question: "Führen Sie einen Schreibtischtest für <code>ggT(126, 48)</code> durch und füllen Sie die Tabelle aus (Werte am Ende jedes Durchlaufs).",
    code: `funktion ggT(a: Ganzzahl, b: Ganzzahl): Ganzzahl
    solange b != 0
        var rest: Ganzzahl = a mod b
        a = b
        b = rest
    ende solange
    rückgabe a
ende funktion`,
    trace: {
      columns: ["rest","a","b","Rückgabe"],
      rows: [
        [{ g: "–" }, { g: "126" }, { g: "48" }, null],
        ["30", "48", "30", null],
        ["18", "30", "18", null],
        ["12", "18", "12", null],
        ["6", "12", "6", null],
        ["0", "6", "0", null],
        [null, null, null, "6"],
      ],
      labels: ["Start","1. Durchlauf","2. Durchlauf","3. Durchlauf","4. Durchlauf","5. Durchlauf","Ende"],
    },
    solution: "126 mod 48 = 30 → (48, 30); 48 mod 30 = 18 → (30, 18); 30 mod 18 = 12 → (18, 12); 18 mod 12 = 6 → (12, 6); 12 mod 6 = 0 → (6, 0). Jetzt ist b = 0, die Schleife endet, Rückgabe <b>6</b>. Es entstehen 6 Tütchen mit je 21 Schrauben und 8 Muttern.",
    explanation: "Typische Fehler: die Reihenfolge der Zuweisungen vertauschen (<code>b = rest</code> vor <code>a = b</code> würde a mit dem Rest überschreiben) oder <code>b</code> statt <code>a</code> zurückgeben (wäre 0).",
    tags: ["schreibtischtest","solange","ggt","euklid"],
  });

  qs.push({
    id: "fmt-trace-007",
    part: "GA2",
    topic: "ga2-pseudocode",
    type: "trace",
    difficulty: 3,
    step: 1,
    points: 10,
    context: "Ein Hochregallager hat 3 Regale (r) mit je 3 Fächern (f). Das zweidimensionale Array <code>lager</code> enthält die Stückzahlen je Fach. Das Programm zählt leere Fächer und ermittelt das Regal mit dem größten Bestand.",
    question: "Führen Sie einen Schreibtischtest durch und füllen Sie die Tabelle aus. Jede Zeile beschreibt den Zustand <b>nach</b> einem Durchlauf der inneren Schleife. <code>maxSumme</code> und <code>maxRegal</code> tragen Sie nur in den Zeilen mit f = 2 ein – dort nach Ausführung der Verzweigung in Zeile 14 bis 17.",
    code: `var lager: Array von Array von Ganzzahl = [[3, 0, 5], [2, 7, 1], [0, 4, 0]]
var leer: Ganzzahl = 0
var maxSumme: Ganzzahl = -1
var maxRegal: Ganzzahl = -1
für r von 0 bis 2
    var summe: Ganzzahl = 0
    für f von 0 bis 2
        wenn lager[r][f] == 0 dann
            leer = leer + 1
        sonst
            summe = summe + lager[r][f]
        ende wenn
    ende für
    wenn summe > maxSumme dann
        maxSumme = summe
        maxRegal = r
    ende wenn
ende für
ausgabe(leer, maxRegal)`,
    trace: {
      columns: ["r","f","lager[r][f]","summe","leer","maxSumme","maxRegal"],
      rows: [
        [{ g: "–" }, { g: "–" }, { g: "–" }, { g: "–" }, { g: "0" }, { g: "-1" }, { g: "-1" }],
        [{ g: "0" }, { g: "0" }, "3", "3", "0", null, null],
        [{ g: "0" }, { g: "1" }, "0", "3", "1", null, null],
        [{ g: "0" }, { g: "2" }, "5", "8", "1", "8", "0"],
        [{ g: "1" }, { g: "0" }, "2", "2", "1", null, null],
        [{ g: "1" }, { g: "1" }, "7", "9", "1", null, null],
        [{ g: "1" }, { g: "2" }, "1", "10", "1", "10", "1"],
        [{ g: "2" }, { g: "0" }, "0", "0", "2", null, null],
        [{ g: "2" }, { g: "1" }, "4", "4", "2", null, null],
        [{ g: "2" }, { g: "2" }, "0", "4", "3", "10", "1"],
      ],
      labels: ["Start","r = 0, f = 0","r = 0, f = 1","r = 0, f = 2","r = 1, f = 0","r = 1, f = 1","r = 1, f = 2","r = 2, f = 0","r = 2, f = 1","r = 2, f = 2"],
    },
    solution: "Die äußere Schleife wählt das Regal, die innere läuft über dessen Fächer; <code>summe</code> wird je Regal neu mit 0 begonnen, <code>leer</code> zählt über alle Regale weiter. Regal 0: 3 + 5 = 8 (1 leeres Fach) → 8 &gt; −1, maxRegal = 0. Regal 1: 2 + 7 + 1 = 10 → 10 &gt; 8, maxRegal = 1. Regal 2: 4 (2 leere Fächer, leer = 3) → 4 &gt; 10 ist falsch. Ausgabe: <b>3</b> leere Fächer, Regal <b>1</b>.",
    explanation: "Typische Fehler: <code>summe</code> nicht pro Regal zurücksetzen (dann 8, 18, 22), leere Fächer in <code>summe</code> mitzählen oder <code>maxRegal</code> schon innerhalb der inneren Schleife aktualisieren. Der Zugriff <code>lager[r][f]</code> bedeutet: zuerst die Zeile (Regal), dann die Spalte (Fach).",
    tags: ["schreibtischtest","verschachtelte schleifen","2d-array"],
  });

  qs.push({
    id: "fmt-trace-008",
    part: "GA2",
    topic: "ga2-pseudocode",
    type: "trace",
    difficulty: 3,
    step: 2,
    points: 9,
    context: "Ein Fahrkartenautomat gibt Wechselgeld in möglichst wenigen Münzen aus (Greedy-Verfahren). Beträge werden in Cent übergeben. Die Textverkettung <code>+</code> erzeugt z. B. „2 x 50 Cent“.",
    question: "Führen Sie einen Schreibtischtest für <code>wechselgeld(176)</code> durch und füllen Sie die Tabelle aus. Jede Zeile beschreibt den Zustand am Ende eines Durchlaufs der <b>äußeren</b> Schleife. Erfolgt keine Ausgabe, tragen Sie „-“ ein.",
    code: `prozedur wechselgeld(betrag: Ganzzahl)
    var muenzen: Array von Ganzzahl = [50, 20, 10, 5, 2, 1]
    var rest: Ganzzahl = betrag
    für i von 0 bis länge(muenzen) - 1
        var anzahl: Ganzzahl = 0
        solange rest >= muenzen[i]
            rest = rest - muenzen[i]
            anzahl = anzahl + 1
        ende solange
        wenn anzahl > 0 dann
            ausgabe(anzahl + " x " + muenzen[i] + " Cent")
        ende wenn
    ende für
ende prozedur`,
    trace: {
      columns: ["i","muenzen[i]","anzahl","rest","Ausgabe"],
      rows: [
        [{ g: "–" }, { g: "–" }, { g: "–" }, { g: "176" }, null],
        [{ g: "0" }, { g: "50" }, "3", "26", "3 x 50 Cent|3 x 50|3x50"],
        [{ g: "1" }, { g: "20" }, "1", "6", "1 x 20 Cent|1 x 20|1x20"],
        [{ g: "2" }, { g: "10" }, "0", "6", "-|keine"],
        [{ g: "3" }, { g: "5" }, "1", "1", "1 x 5 Cent|1 x 5|1x5"],
        [{ g: "4" }, { g: "2" }, "0", "1", "-|keine"],
        [{ g: "5" }, { g: "1" }, "1", "0", "1 x 1 Cent|1 x 1|1x1"],
      ],
      labels: ["Start","i = 0","i = 1","i = 2","i = 3","i = 4","i = 5"],
    },
    solution: "Die innere <code>solange</code>-Schleife zieht die aktuelle Münze so oft ab, wie es geht: 176 → 3 × 50 (Rest 26) → 1 × 20 (Rest 6) → 10 passt nicht (0, keine Ausgabe) → 1 × 5 (Rest 1) → 2 passt nicht → 1 × 1 (Rest 0). Ausgaben: „3 x 50 Cent“, „1 x 20 Cent“, „1 x 5 Cent“, „1 x 1 Cent“ – insgesamt 6 Münzen.",
    explanation: "Typische Fehler: nur einmal pro Münze abziehen (<code>wenn</code> statt <code>solange</code> gedacht), <code>anzahl</code> nicht pro Münze auf 0 zurücksetzen oder bei anzahl = 0 trotzdem „0 x 10 Cent“ ausgeben. Die innere Schleife kann auch <b>gar nicht</b> durchlaufen werden, wenn die Bedingung sofort falsch ist.",
    tags: ["schreibtischtest","verschachtelte schleifen","greedy","solange"],
  });

  qs.push({
    id: "fmt-trace-009",
    part: "GA2",
    topic: "ga2-sortieren-suchen",
    type: "trace",
    difficulty: 1,
    step: 1,
    points: 3,
    context: "In einer Lagerverwaltung wird die Position einer Artikelnummer im (unsortierten) Array <code>nummern</code> gesucht.",
    question: "Führen Sie einen Schreibtischtest für <code>suche([17, 4, 23, 9, 31], 9)</code> durch und füllen Sie die Tabelle aus. Tragen Sie je Schleifendurchlauf eine Zeile ein; die Spalte „Rückgabe“ füllen Sie nur, wenn die Funktion in diesem Durchlauf endet.",
    code: `funktion suche(nummern: Array von Ganzzahl, gesucht: Ganzzahl): Ganzzahl
    für i von 0 bis länge(nummern) - 1
        wenn nummern[i] == gesucht dann
            rückgabe i
        ende wenn
    ende für
    rückgabe -1
ende funktion`,
    trace: {
      columns: ["i","nummern[i]","nummern[i] == gesucht","Rückgabe"],
      rows: [
        ["0", "17", "falsch|false", null],
        ["1", "4", "falsch|false", null],
        ["2", "23", "falsch|false", null],
        ["3", "9", "wahr|true", "3"],
      ],
      labels: ["1. Durchlauf","2. Durchlauf","3. Durchlauf","4. Durchlauf"],
    },
    solution: "Die lineare Suche vergleicht die Elemente der Reihe nach mit 9: 17, 4 und 23 passen nicht, bei i = 3 ist <code>nummern[3] == 9</code> wahr. <code>rückgabe i</code> beendet die Funktion sofort – Ergebnis <b>3</b> (Index, nicht Position 4). Das Element 31 wird nicht mehr betrachtet.",
    explanation: "Typische Fehler: die Position 4 statt des Index 3 zurückgeben oder nach dem Treffer weitersuchen. <code>rückgabe</code> verlässt die Funktion sofort – auch mitten in einer Schleife. <code>-1</code> wird nur geliefert, wenn kein Element passt.",
    tags: ["schreibtischtest","lineare suche"],
  });

  qs.push({
    id: "fmt-trace-010",
    part: "GA2",
    topic: "ga2-sortieren-suchen",
    type: "trace",
    difficulty: 1,
    step: 2,
    points: 4,
    context: "Ein Kassensystem sortiert die Positionen eines Bons aufsteigend nach Menge. Dazu wird Bubble Sort verwendet. Betrachtet wird hier nur der <b>erste Durchlauf</b>.",
    question: "Führen Sie einen Schreibtischtest für den ersten Durchlauf mit <code>a = [5, 1, 4, 2, 8]</code> durch und füllen Sie die Tabelle aus. Tragen Sie das Array jeweils <b>nach</b> dem Schritt ein (Format: 1,5,4,2,8).",
    code: `für j von 0 bis länge(a) - 2
    wenn a[j] > a[j + 1] dann
        var tmp: Ganzzahl = a[j]
        a[j] = a[j + 1]
        a[j + 1] = tmp
    ende wenn
ende für`,
    trace: {
      columns: ["j","a[j] > a[j + 1]","Array a"],
      rows: [
        [{ g: "–" }, { g: "–" }, { g: "5,1,4,2,8" }],
        [{ g: "0" }, "wahr|true", "1,5,4,2,8"],
        [{ g: "1" }, "wahr|true", "1,4,5,2,8"],
        [{ g: "2" }, "wahr|true", "1,4,2,5,8"],
        [{ g: "3" }, "falsch|false", "1,4,2,5,8"],
      ],
      labels: ["Start","j = 0","j = 1","j = 2","j = 3"],
    },
    solution: "Es werden immer zwei <b>benachbarte</b> Elemente verglichen und bei Bedarf getauscht: 5 &gt; 1 → tauschen; 5 &gt; 4 → tauschen; 5 &gt; 2 → tauschen; 5 &gt; 8 → nein. Die 5 „blubbert“ nach rechts, bis sie auf die größere 8 trifft. Ergebnis: <b>1,4,2,5,8</b> – das größte Element (8) steht nach dem Durchlauf sicher ganz rechts.",
    explanation: "Typischer Fehler: mit dem <i>ursprünglichen</i> Array weitervergleichen statt mit dem bereits veränderten (bei j = 1 wird 5 mit 4 verglichen, nicht 1 mit 4). Die Schleife endet bei <code>länge(a) - 2</code>, weil <code>a[j + 1]</code> sonst außerhalb des Arrays läge.",
    tags: ["schreibtischtest","bubblesort"],
  });

  qs.push({
    id: "fmt-trace-011",
    part: "GA2",
    topic: "ga2-sortieren-suchen",
    type: "trace",
    difficulty: 2,
    step: 1,
    points: 6,
    context: "Eine Lagerverwaltung sortiert Lieferzeiten (in Tagen) aufsteigend mit Bubble Sort. Zusätzlich wird je Durchlauf die Anzahl der Vertauschungen gezählt.",
    question: "Führen Sie einen Schreibtischtest für <code>a = [6, 3, 8, 2, 5]</code> durch und füllen Sie die Tabelle aus. Tragen Sie je Durchlauf der äußeren Schleife die Anzahl der Vertauschungen und das Array <b>nach</b> dem Durchlauf ein.",
    code: `prozedur bubbleSort(a: Array von Ganzzahl)
    var n: Ganzzahl = länge(a)
    für i von 1 bis n - 1
        var tausch: Ganzzahl = 0
        für j von 0 bis n - 1 - i
            wenn a[j] > a[j + 1] dann
                var tmp: Ganzzahl = a[j]
                a[j] = a[j + 1]
                a[j + 1] = tmp
                tausch = tausch + 1
            ende wenn
        ende für
    ende für
ende prozedur`,
    trace: {
      columns: ["i","tausch","Array a"],
      rows: [
        [{ g: "–" }, { g: "–" }, { g: "6,3,8,2,5" }],
        [{ g: "1" }, "3", "3,6,2,5,8"],
        [{ g: "2" }, "2", "3,2,5,6,8"],
        [{ g: "3" }, "1", "2,3,5,6,8"],
        [{ g: "4" }, "0", "2,3,5,6,8"],
      ],
      labels: ["Start","1. Durchlauf","2. Durchlauf","3. Durchlauf","4. Durchlauf"],
    },
    solution: "Nach jedem Durchlauf steht das größte noch unsortierte Element an seiner endgültigen Position, deshalb läuft <code>j</code> nur bis <code>n - 1 - i</code>. Durchlauf 1: 3 Vertauschungen → 3,6,2,5,8. Durchlauf 2: 2 → 3,2,5,6,8. Durchlauf 3: 1 → 2,3,5,6,8. Durchlauf 4: 0 → unverändert. Insgesamt 6 Vertauschungen (= Anzahl der Fehlstellungen).",
    explanation: "Typische Fehler: in einem Durchlauf nur <i>einen</i> Tausch ausführen oder das Array nach jedem Vergleich statt nach jedem Durchlauf eintragen. Beobachtung: Durchlauf 4 tauscht nichts – eine optimierte Variante würde mit einem Flag <code>getauscht</code> vorzeitig abbrechen.",
    tags: ["schreibtischtest","bubblesort"],
  });

  qs.push({
    id: "fmt-trace-012",
    part: "GA2",
    topic: "ga2-sortieren-suchen",
    type: "trace",
    difficulty: 2,
    step: 2,
    points: 6,
    context: "Ein Ticketsystem sortiert Wartezeiten (in Minuten) aufsteigend mit Selection Sort (Sortieren durch Auswahl).",
    question: "Führen Sie einen Schreibtischtest für <code>a = [29, 10, 14, 37, 13]</code> durch und füllen Sie die Tabelle aus. Tragen Sie je Durchlauf der äußeren Schleife den Index und den Wert des gefundenen Minimums sowie das Array <b>nach</b> dem Tausch ein.",
    code: `prozedur selectionSort(a: Array von Ganzzahl)
    var n: Ganzzahl = länge(a)
    für i von 0 bis n - 2
        var minIdx: Ganzzahl = i
        für j von i + 1 bis n - 1
            wenn a[j] < a[minIdx] dann
                minIdx = j
            ende wenn
        ende für
        var tmp: Ganzzahl = a[i]
        a[i] = a[minIdx]
        a[minIdx] = tmp
    ende für
ende prozedur`,
    trace: {
      columns: ["i","minIdx","a[minIdx] (Minimum)","Array a"],
      rows: [
        [{ g: "–" }, { g: "–" }, { g: "–" }, { g: "29,10,14,37,13" }],
        [{ g: "0" }, "1", "10", "10,29,14,37,13"],
        [{ g: "1" }, "4", "13", "10,13,14,37,29"],
        [{ g: "2" }, "2", "14", "10,13,14,37,29"],
        [{ g: "3" }, "4", "29", "10,13,14,29,37"],
      ],
      labels: ["Start","1. Durchlauf","2. Durchlauf","3. Durchlauf","4. Durchlauf"],
    },
    solution: "In jedem Durchlauf wird das Minimum des <b>unsortierten Rests</b> (ab Index i) gesucht und mit <code>a[i]</code> getauscht. i = 0: Minimum 10 an Index 1 → 10,29,14,37,13. i = 1: Minimum 13 an Index 4 → 10,13,14,37,29. i = 2: Minimum 14 an Index 2 (Tausch mit sich selbst) → unverändert. i = 3: Minimum 29 an Index 4 → <b>10,13,14,29,37</b>.",
    explanation: "Typische Fehler: den Index des Minimums im <i>ursprünglichen</i> Array angeben, den bereits sortierten Teil erneut durchsuchen oder sofort bei jedem kleineren Element tauschen (das wäre eher Bubble Sort). Selection Sort führt höchstens n − 1 Tausche aus.",
    tags: ["schreibtischtest","selectionsort"],
  });

  qs.push({
    id: "fmt-trace-013",
    part: "GA2",
    topic: "ga2-sortieren-suchen",
    type: "trace",
    difficulty: 2,
    step: 3,
    points: 7,
    context: "Ein Onlineshop speichert Artikelpreise (in €) <b>aufsteigend sortiert</b>: <code>a = [3, 7, 11, 15, 19, 24, 30, 42, 51, 66]</code> (Indizes 0–9). Gesucht wird der Preis 30 mit der binären Suche.",
    question: "Führen Sie einen Schreibtischtest für <code>binaereSuche(a, 30)</code> durch und füllen Sie die Tabelle aus. Jede Zeile ist ein Schleifendurchlauf mit den Werten von <code>links</code> und <code>rechts</code> <b>zu Beginn</b> des Durchlaufs. In „Vergleich“ tragen Sie ein, ob <code>a[mitte]</code> kleiner, größer oder gleich dem gesuchten Wert ist.",
    code: `funktion binaereSuche(a: Array von Ganzzahl, gesucht: Ganzzahl): Ganzzahl
    var links: Ganzzahl = 0
    var rechts: Ganzzahl = länge(a) - 1
    solange links <= rechts
        var mitte: Ganzzahl = (links + rechts) div 2
        wenn a[mitte] == gesucht dann
            rückgabe mitte
        sonst wenn a[mitte] < gesucht dann
            links = mitte + 1
        sonst
            rechts = mitte - 1
        ende wenn
    ende solange
    rückgabe -1
ende funktion`,
    trace: {
      columns: ["links","rechts","mitte","a[mitte]","Vergleich","Rückgabe"],
      rows: [
        [{ g: "0" }, { g: "9" }, "4", "19", "kleiner|<|zu klein", null],
        ["5", "9", "7", "42", "größer|>|zu groß|groesser", null],
        ["5", "6", "5", "24", "kleiner|<|zu klein", null],
        ["6", "6", "6", "30", "gleich|==|=|gefunden", "6"],
      ],
      labels: ["1. Durchlauf","2. Durchlauf","3. Durchlauf","4. Durchlauf"],
    },
    solution: "(0 + 9) div 2 = 4 → 19 &lt; 30 → rechts weitersuchen, links = 5. (5 + 9) div 2 = 7 → 42 &gt; 30 → links weitersuchen, rechts = 6. (5 + 6) div 2 = 5 → 24 &lt; 30 → links = 6. (6 + 6) div 2 = 6 → 30 gefunden, Rückgabe <b>6</b>. Statt bis zu 10 Vergleichen (linear) reichen 4.",
    explanation: "Typische Fehler: <code>/</code> statt <code>div</code> (mitte = 4,5), <code>links = mitte</code> statt <code>mitte + 1</code> (das geprüfte Element wird erneut betrachtet, ggf. Endlosschleife) oder den Wert 30 statt des Index 6 zurückgeben. Voraussetzung der binären Suche: das Array ist sortiert.",
    tags: ["schreibtischtest","binaere suche"],
  });

  qs.push({
    id: "fmt-trace-014",
    part: "GA2",
    topic: "ga2-sortieren-suchen",
    type: "trace",
    difficulty: 3,
    step: 1,
    points: 8,
    context: "Ein Turnierprogramm sortiert Startnummern mit Insertion Sort (Sortieren durch Einfügen). Der linke Teil des Arrays ist dabei stets sortiert; das nächste Element <code>key</code> wird darin an der richtigen Stelle eingefügt.",
    question: "Führen Sie einen Schreibtischtest für <code>a = [7, 3, 9, 1, 5]</code> durch und füllen Sie die Tabelle aus. Tragen Sie je Durchlauf der äußeren Schleife <code>key</code>, die Anzahl der Verschiebungen (Ausführungen von Zeile 6) und das Array <b>nach</b> dem Durchlauf ein.",
    code: `prozedur insertionSort(a: Array von Ganzzahl)
    für i von 1 bis länge(a) - 1
        var key: Ganzzahl = a[i]
        var j: Ganzzahl = i - 1
        solange j >= 0 UND a[j] > key
            a[j + 1] = a[j]
            j = j - 1
        ende solange
        a[j + 1] = key
    ende für
ende prozedur`,
    trace: {
      columns: ["i","key","Verschiebungen","Array a"],
      rows: [
        [{ g: "–" }, { g: "–" }, { g: "–" }, { g: "7,3,9,1,5" }],
        [{ g: "1" }, "3", "1", "3,7,9,1,5"],
        [{ g: "2" }, "9", "0", "3,7,9,1,5"],
        [{ g: "3" }, "1", "3", "1,3,7,9,5"],
        [{ g: "4" }, "5", "2", "1,3,5,7,9"],
      ],
      labels: ["Start","1. Durchlauf","2. Durchlauf","3. Durchlauf","4. Durchlauf"],
    },
    solution: "i = 1: key 3, 7 wird nach rechts verschoben → 3,7,9,1,5. i = 2: key 9, 7 &gt; 9 ist falsch → keine Verschiebung. i = 3: key 1, 9, 7 und 3 werden verschoben (j wird −1) → 1,3,7,9,5. i = 4: key 5, 9 und 7 werden verschoben, 3 &gt; 5 ist falsch → <b>1,3,5,7,9</b>. Insgesamt 6 Verschiebungen.",
    explanation: "Typische Fehler: Elemente tauschen statt verschieben (Zwischenzustände sehen dann anders aus), <code>key</code> nach dem Verschieben mit dem überschriebenen <code>a[i]</code> verwechseln oder bei j = −1 noch <code>a[-1]</code> lesen. Die Kurzschlussauswertung von <code>UND</code> verhindert diesen Zugriff. Auf fast sortierten Daten ist Insertion Sort sehr schnell (best case O(n)).",
    tags: ["schreibtischtest","insertionsort"],
  });

  qs.push({
    id: "fmt-trace-015",
    part: "GA2",
    topic: "ga2-sortieren-suchen",
    type: "trace",
    difficulty: 3,
    step: 2,
    points: 9,
    context: "Ein Lagerverwaltungssystem sucht in der sortierten Liste belegter Lagerplatznummern <code>a = [4, 9, 13, 18, 21, 27, 33, 40, 46, 52, 58, 63, 71, 80, 95]</code> (Indizes 0–14), ob Platz 50 belegt ist.",
    question: "Führen Sie einen Schreibtischtest für <code>binaereSuche(a, 50)</code> durch und füllen Sie die Tabelle aus. Jede Zeile entspricht einer Prüfung der Schleifenbedingung mit den Werten von <code>links</code> und <code>rechts</code> zu diesem Zeitpunkt. In der letzten Zeile ist die Bedingung falsch.",
    code: `funktion binaereSuche(a: Array von Ganzzahl, gesucht: Ganzzahl): Ganzzahl
    var links: Ganzzahl = 0
    var rechts: Ganzzahl = länge(a) - 1
    solange links <= rechts
        var mitte: Ganzzahl = (links + rechts) div 2
        wenn a[mitte] == gesucht dann
            rückgabe mitte
        sonst wenn a[mitte] < gesucht dann
            links = mitte + 1
        sonst
            rechts = mitte - 1
        ende wenn
    ende solange
    rückgabe -1
ende funktion`,
    trace: {
      columns: ["links","rechts","links <= rechts","mitte","a[mitte]","Rückgabe"],
      rows: [
        [{ g: "0" }, { g: "14" }, "wahr|true", "7", "40", null],
        ["8", "14", "wahr|true", "11", "63", null],
        ["8", "10", "wahr|true", "9", "52", null],
        ["8", "8", "wahr|true", "8", "46", null],
        ["9", "8", "falsch|false", null, null, "-1"],
      ],
      labels: ["1. Prüfung","2. Prüfung","3. Prüfung","4. Prüfung","5. Prüfung"],
    },
    solution: "(0 + 14) div 2 = 7 → 40 &lt; 50 → links = 8. (8 + 14) div 2 = 11 → 63 &gt; 50 → rechts = 10. (8 + 10) div 2 = 9 → 52 &gt; 50 → rechts = 8. (8 + 8) div 2 = 8 → 46 &lt; 50 → links = 9. Jetzt ist links (9) &gt; rechts (8): Der Suchbereich ist leer, die Schleife endet, Rückgabe <b>−1</b> (nicht gefunden). Nach 4 Vergleichen steht fest, dass 50 fehlt – höchstens ⌈log₂(16)⌉ = 4 Vergleiche bei 15 Elementen.",
    explanation: "Typische Fehler: die Schleife schon bei links == rechts abbrechen (dann würde das Element an Index 8 nicht geprüft) oder bei <code>rechts = mitte</code> statt <code>mitte - 1</code> in eine Endlosschleife geraten. Die Abbruchbedingung „links &gt; rechts“ bedeutet: kein Element mehr übrig.",
    tags: ["schreibtischtest","binaere suche","abbruchbedingung"],
  });

  qs.push({
    id: "fmt-trace-016",
    part: "GA2",
    topic: "ga2-rekursion",
    type: "trace",
    difficulty: 1,
    step: 1,
    points: 4,
    context: "Ein Planungstool berechnet, auf wie viele Arten n Aufträge nacheinander abgearbeitet werden können: n! (Fakultät). Die Berechnung erfolgt rekursiv.",
    question: "Führen Sie einen Schreibtischtest für <code>fakultaet(4)</code> durch und füllen Sie die Tabelle aus. Jede Zeile ist ein Aufruf (in der Reihenfolge, in der die Aufrufe starten); „Rückgabe“ ist der Wert, den <b>dieser</b> Aufruf zurückgibt.",
    code: `funktion fakultaet(n: Ganzzahl): Ganzzahl
    wenn n <= 1 dann
        rückgabe 1
    ende wenn
    rückgabe n * fakultaet(n - 1)
ende funktion`,
    trace: {
      columns: ["Aufruf","n","n <= 1","Rückgabe"],
      rows: [
        [{ g: "fakultaet(4)" }, "4", "falsch|false", "24"],
        ["fakultaet(3)|fakultät(3)", "3", "falsch|false", "6"],
        ["fakultaet(2)|fakultät(2)", "2", "falsch|false", "2"],
        ["fakultaet(1)|fakultät(1)", "1", "wahr|true", "1"],
      ],
      labels: ["1. Aufruf","2. Aufruf","3. Aufruf","4. Aufruf"],
    },
    solution: "Abstieg: fakultaet(4) ruft fakultaet(3) auf, dieser fakultaet(2), dieser fakultaet(1). Bei n = 1 greift der <b>Rekursionsanker</b> → Rückgabe 1. Aufstieg (die Aufrufe werden in umgekehrter Reihenfolge beendet): 2 · 1 = 2, 3 · 2 = 6, 4 · 6 = <b>24</b>.",
    explanation: "Typische Fehler: die Rückgabe des äußersten Aufrufs mit 4 angeben (die Multiplikation erfolgt erst, wenn der innere Aufruf fertig ist) oder einen Aufruf fakultaet(0) eintragen – der Anker <code>n &lt;= 1</code> greift bereits bei 1. Jeder Aufruf hat sein <b>eigenes</b> n auf dem Aufrufstapel.",
    tags: ["schreibtischtest","rekursion","aufrufstapel","fakultaet"],
  });

  qs.push({
    id: "fmt-trace-017",
    part: "GA2",
    topic: "ga2-rekursion",
    type: "trace",
    difficulty: 2,
    step: 1,
    points: 5,
    context: "In einem Netzwerk-Planungstool wird die Anzahl möglicher Verzweigungen über die Potenz <code>basis^exp</code> berechnet – rekursiv, ohne eingebauten Potenzoperator.",
    question: "Führen Sie einen Schreibtischtest für <code>potenz(3, 4)</code> durch und füllen Sie die Tabelle aus. Jede Zeile ist ein Aufruf; „Rückgabe“ ist der Wert, den <b>dieser</b> Aufruf zurückgibt.",
    code: `funktion potenz(basis: Ganzzahl, exp: Ganzzahl): Ganzzahl
    wenn exp == 0 dann
        rückgabe 1
    ende wenn
    rückgabe basis * potenz(basis, exp - 1)
ende funktion`,
    trace: {
      columns: ["Aufruf","exp","Rückgabe"],
      rows: [
        [{ g: "potenz(3, 4)" }, "4", "81"],
        ["potenz(3, 3)|potenz(3,3)", "3", "27"],
        ["potenz(3, 2)|potenz(3,2)", "2", "9"],
        ["potenz(3, 1)|potenz(3,1)", "1", "3"],
        ["potenz(3, 0)|potenz(3,0)", "0", "1"],
      ],
      labels: ["1. Aufruf","2. Aufruf","3. Aufruf","4. Aufruf","5. Aufruf"],
    },
    solution: "Der Exponent wird bei jedem Aufruf um 1 kleiner, bis der Anker <code>exp == 0</code> mit Rückgabe 1 erreicht ist (5 Aufrufe). Beim Aufstieg wird jeweils mit 3 multipliziert: 1 → 3 → 9 → 27 → <b>81</b>.",
    explanation: "Typische Fehler: den Aufruf potenz(3, 0) vergessen (der Anker ist ein eigener Aufruf auf dem Stapel) oder die Rückgabewerte in der Aufrufreihenfolge statt in der Ergebnisreihenfolge berechnen. Ohne Anker (oder bei negativem exp) würde die Rekursion nie enden → StackOverflow.",
    tags: ["schreibtischtest","rekursion","aufrufstapel","potenz"],
  });

  qs.push({
    id: "fmt-trace-018",
    part: "GA2",
    topic: "ga2-rekursion",
    type: "trace",
    difficulty: 2,
    step: 2,
    points: 6,
    context: "Ein Warenwirtschaftssystem nutzt für eine einfache Prüfziffer die Quersumme einer Artikelnummer. Die Quersumme wird rekursiv berechnet: letzte Ziffer (<code>n mod 10</code>) plus Quersumme der restlichen Ziffern (<code>n div 10</code>).",
    question: "Führen Sie einen Schreibtischtest für <code>quersumme(4728)</code> durch und füllen Sie die Tabelle aus. Jede Zeile ist ein Aufruf; beim Rekursionsanker bleiben die Spalten <code>n mod 10</code> und <code>n div 10</code> leer.",
    code: `funktion quersumme(n: Ganzzahl): Ganzzahl
    wenn n < 10 dann
        rückgabe n
    ende wenn
    rückgabe n mod 10 + quersumme(n div 10)
ende funktion`,
    trace: {
      columns: ["Aufruf","n mod 10","n div 10","Rückgabe"],
      rows: [
        [{ g: "quersumme(4728)" }, "8", "472", "21"],
        ["quersumme(472)", "2", "47", "13"],
        ["quersumme(47)", "7", "4", "11"],
        ["quersumme(4)", null, null, "4"],
      ],
      labels: ["1. Aufruf","2. Aufruf","3. Aufruf","4. Aufruf"],
    },
    solution: "Abstieg: 4728 → 472 → 47 → 4 (je die letzte Ziffer abgeschnitten). quersumme(4) ist der Anker (4 &lt; 10) und liefert 4. Aufstieg: 7 + 4 = 11, 2 + 11 = 13, 8 + 13 = <b>21</b>. Probe: 4 + 7 + 2 + 8 = 21.",
    explanation: "Typische Fehler: <code>mod</code> und <code>div</code> verwechseln, die Rückgabe eines Aufrufs mit seiner eigenen Ziffer gleichsetzen (8 statt 21) oder für den Anker noch quersumme(0) aufrufen.",
    tags: ["schreibtischtest","rekursion","quersumme"],
  });

  qs.push({
    id: "fmt-trace-019",
    part: "GA2",
    topic: "ga2-rekursion",
    type: "trace",
    difficulty: 3,
    step: 1,
    points: 10,
    context: "Eine Simulationssoftware berechnet Fibonacci-Zahlen mit einer baumartigen Rekursion (zwei Selbstaufrufe je Aufruf). Die Ausdrücke werden von links nach rechts ausgewertet: Zuerst läuft <code>fib(n - 1)</code> vollständig ab, danach <code>fib(n - 2)</code>.",
    question: "Führen Sie einen Schreibtischtest für <code>fib(4)</code> durch. Tragen Sie alle Aufrufe in der Reihenfolge ein, in der sie <b>gestartet</b> werden, und jeweils den Wert, den der Aufruf zurückgibt.",
    code: `funktion fib(n: Ganzzahl): Ganzzahl
    wenn n <= 1 dann
        rückgabe n
    ende wenn
    rückgabe fib(n - 1) + fib(n - 2)
ende funktion`,
    trace: {
      columns: ["Nr.","Aufruf","Rückgabe"],
      rows: [
        [{ g: "1" }, { g: "fib(4)" }, "3"],
        [{ g: "2" }, "fib(3)", "2"],
        [{ g: "3" }, "fib(2)", "1"],
        [{ g: "4" }, "fib(1)", "1"],
        [{ g: "5" }, "fib(0)", "0"],
        [{ g: "6" }, "fib(1)", "1"],
        [{ g: "7" }, "fib(2)", "1"],
        [{ g: "8" }, "fib(1)", "1"],
        [{ g: "9" }, "fib(0)", "0"],
      ],
    },
    solution: "Aufrufbaum (Tiefensuche, links zuerst): fib(4) → fib(3) → fib(2) → fib(1) = 1, fib(0) = 0 ⇒ fib(2) = 1; dann fib(1) = 1 ⇒ fib(3) = 2; dann fib(2) → fib(1) = 1, fib(0) = 0 ⇒ fib(2) = 1 ⇒ fib(4) = 2 + 1 = <b>3</b>. Insgesamt 9 Aufrufe; fib(2) wird doppelt berechnet.",
    explanation: "Typische Fehler: Aufrufe in Ebenen (Breitensuche) statt in Startreihenfolge notieren, den zweiten Teilaufruf <code>fib(n - 2)</code> vor dem vollständigen Ende von <code>fib(n - 1)</code> starten oder fib(0) als 1 annehmen. Die Mehrfachberechnung führt zu exponentieller Laufzeit O(2ⁿ) – Abhilfe: Memoisation oder iterative Lösung.",
    tags: ["schreibtischtest","rekursion","mehrfachaufruf","fibonacci"],
  });

  qs.push({
    id: "fmt-trace-020",
    part: "GA2",
    topic: "ga2-rekursion",
    type: "trace",
    difficulty: 3,
    step: 2,
    points: 10,
    context: "Ein Auswertungsprogramm summiert Verkaufszahlen nach dem Prinzip „Teile und herrsche“: Der Bereich <code>lo..hi</code> wird halbiert, beide Hälften werden rekursiv summiert. Es gilt <code>a = [4, 7, 1, 6]</code>.",
    question: "Führen Sie einen Schreibtischtest für <code>summe(a, 0, 3)</code> durch. Tragen Sie alle Aufrufe in der Reihenfolge ein, in der sie <b>gestartet</b> werden (linke Hälfte zuerst vollständig). Bei Aufrufen, die den Rekursionsanker erreichen, bleibt <code>mitte</code> leer.",
    code: `funktion summe(a: Array von Ganzzahl, lo: Ganzzahl, hi: Ganzzahl): Ganzzahl
    wenn lo == hi dann
        rückgabe a[lo]
    ende wenn
    var mitte: Ganzzahl = (lo + hi) div 2
    var links: Ganzzahl = summe(a, lo, mitte)
    var rechts: Ganzzahl = summe(a, mitte + 1, hi)
    rückgabe links + rechts
ende funktion`,
    trace: {
      columns: ["Nr.","lo","hi","mitte","Rückgabe"],
      rows: [
        [{ g: "1" }, { g: "0" }, { g: "3" }, "1", "18"],
        [{ g: "2" }, "0", "1", "0", "11"],
        [{ g: "3" }, "0", "0", null, "4"],
        [{ g: "4" }, "1", "1", null, "7"],
        [{ g: "5" }, "2", "3", "2", "7"],
        [{ g: "6" }, "2", "2", null, "1"],
        [{ g: "7" }, "3", "3", null, "6"],
      ],
    },
    solution: "summe(0, 3): mitte 1 → zuerst summe(0, 1): mitte 0 → summe(0, 0) = 4, summe(1, 1) = 7 ⇒ 11. Dann summe(2, 3): mitte 2 → summe(2, 2) = 1, summe(3, 3) = 6 ⇒ 7. Gesamt: 11 + 7 = <b>18</b>. Es entstehen 7 Aufrufe (ein Binärbaum mit 4 Blättern).",
    explanation: "Typische Fehler: rechte Hälfte mit <code>mitte</code> statt <code>mitte + 1</code> beginnen (Element doppelt bzw. Endlosrekursion), die rechte Hälfte starten, bevor die linke vollständig berechnet ist, oder beim Anker den Index statt <code>a[lo]</code> zurückgeben. Dasselbe Aufteilungsmuster nutzt Merge Sort.",
    tags: ["schreibtischtest","rekursion","teile und herrsche","mehrfachaufruf"],
  });

  qs.push({
    id: "fmt-trace-021",
    part: "GA2",
    topic: "ga2-datenstrukturen",
    type: "trace",
    difficulty: 1,
    step: 1,
    points: 4,
    context: "Ein Texteditor verwaltet die Rückgängig-Funktion mit einem Stack (LIFO). <code>push</code> legt oben ab, <code>pop</code> entfernt das oberste Element und gibt es zurück.",
    question: "Führen Sie einen Schreibtischtest durch und füllen Sie die Tabelle aus. Notieren Sie nach jeder Zeile den Stack-Inhalt von <b>unten nach oben</b> (Format: 5,8) sowie den aktuellen Wert von <code>x</code>.",
    code: `var s: Stack von Ganzzahl = neuer Stack()
var x: Ganzzahl
s.push(5)
s.push(8)
x = s.pop()
s.push(3)
s.push(9)
x = s.pop()
x = s.pop()
s.push(x * 2)`,
    trace: {
      columns: ["Zeile","Stack (unten → oben)","x"],
      rows: [
        [{ g: "3" }, "5", null],
        [{ g: "4" }, "5,8", null],
        [{ g: "5" }, "5", "8"],
        [{ g: "6" }, "5,3", "8"],
        [{ g: "7" }, "5,3,9", "8"],
        [{ g: "8" }, "5,3", "9"],
        [{ g: "9" }, "5", "3"],
        [{ g: "10" }, "5,6", "3"],
      ],
      labels: ["s.push(5)","s.push(8)","x = s.pop()","s.push(3)","s.push(9)","x = s.pop()","x = s.pop()","s.push(x * 2)"],
    },
    solution: "Bei einem Stack wird immer das <b>zuletzt</b> abgelegte Element zuerst entnommen (Last In – First Out). [5] → [5,8] → pop liefert 8 → [5] → [5,3] → [5,3,9] → pop liefert 9 → [5,3] → pop liefert 3 → [5] → push(3 · 2) → <b>[5,6]</b>.",
    explanation: "Typischer Fehler: wie bei einer Queue das <i>unterste</i> Element entnehmen (x = 5). Achtung beim letzten Schritt: <code>x * 2</code> verwendet den <b>aktuellen</b> Wert von x (3), nicht den ersten gepoppten Wert.",
    tags: ["schreibtischtest","stack","lifo"],
  });

  qs.push({
    id: "fmt-trace-022",
    part: "GA2",
    topic: "ga2-datenstrukturen",
    type: "trace",
    difficulty: 1,
    step: 2,
    points: 4,
    context: "Ein Netzwerkdrucker verwaltet Druckaufträge in einer Warteschlange (Queue, FIFO). <code>enqueue</code> fügt hinten an, <code>dequeue</code> entnimmt vorne und gibt das Element zurück.",
    question: "Führen Sie einen Schreibtischtest durch und füllen Sie die Tabelle aus. Notieren Sie nach jeder Zeile den Inhalt der Queue von <b>vorne nach hinten</b> (Format: 101,102) sowie den aktuellen Wert von <code>auftrag</code>.",
    code: `var q: Queue von Ganzzahl = neue Queue()
var auftrag: Ganzzahl
q.enqueue(101)
q.enqueue(102)
q.enqueue(103)
auftrag = q.dequeue()
q.enqueue(104)
auftrag = q.dequeue()
auftrag = q.dequeue()`,
    trace: {
      columns: ["Zeile","Queue (vorne → hinten)","auftrag"],
      rows: [
        [{ g: "3" }, "101", null],
        [{ g: "4" }, "101,102", null],
        [{ g: "5" }, "101,102,103", null],
        [{ g: "6" }, "102,103", "101"],
        [{ g: "7" }, "102,103,104", "101"],
        [{ g: "8" }, "103,104", "102"],
        [{ g: "9" }, "104", "103"],
      ],
      labels: ["q.enqueue(101)","q.enqueue(102)","q.enqueue(103)","auftrag = q.dequeue()","q.enqueue(104)","auftrag = q.dequeue()","auftrag = q.dequeue()"],
    },
    solution: "Bei einer Queue wird das <b>zuerst</b> eingereihte Element zuerst entnommen (First In – First Out). [101] → [101,102] → [101,102,103] → dequeue liefert 101 → [102,103] → [102,103,104] → dequeue liefert 102 → dequeue liefert 103 → <b>[104]</b>.",
    explanation: "Typischer Fehler: wie bei einem Stack das zuletzt eingefügte Element entnehmen (auftrag = 103 bzw. 104). Merkhilfe: Queue = Warteschlange an der Supermarktkasse – wer zuerst kommt, wird zuerst bedient.",
    tags: ["schreibtischtest","queue","fifo"],
  });

  qs.push({
    id: "fmt-trace-023",
    part: "GA2",
    topic: "ga2-datenstrukturen",
    type: "trace",
    difficulty: 2,
    step: 1,
    points: 6,
    context: "Eine Logistik-App zeigt die Stopps einer Lieferroute an. Für die Rückfahrt wird die Reihenfolge der Stopp-Nummern im Array <b>an Ort und Stelle</b> (ohne zweites Array) umgekehrt.",
    question: "Führen Sie einen Schreibtischtest für <code>umkehren([3, 8, 1, 6, 2, 9, 4])</code> durch und füllen Sie die Tabelle aus. Die Bedingung wird <b>vor</b> dem Durchlauf geprüft, <code>links</code>, <code>rechts</code> und das Array gelten <b>nach</b> dem Durchlauf.",
    code: `prozedur umkehren(a: Array von Ganzzahl)
    var links: Ganzzahl = 0
    var rechts: Ganzzahl = länge(a) - 1
    solange links < rechts
        var tmp: Ganzzahl = a[links]
        a[links] = a[rechts]
        a[rechts] = tmp
        links = links + 1
        rechts = rechts - 1
    ende solange
ende prozedur`,
    trace: {
      columns: ["links < rechts","links","rechts","Array a"],
      rows: [
        [{ g: "–" }, { g: "0" }, { g: "6" }, { g: "3,8,1,6,2,9,4" }],
        ["wahr|true", "1", "5", "4,8,1,6,2,9,3"],
        ["wahr|true", "2", "4", "4,9,1,6,2,8,3"],
        ["wahr|true", "3", "3", "4,9,2,6,1,8,3"],
        ["falsch|false", null, null, null],
      ],
      labels: ["Start","1. Durchlauf","2. Durchlauf","3. Durchlauf","Schleifenende"],
    },
    solution: "Zwei Zeiger laufen von außen nach innen und tauschen jeweils die Elemente: (0, 6) 3 ↔ 4, (1, 5) 8 ↔ 9, (2, 4) 1 ↔ 2. Danach ist links = rechts = 3: Das mittlere Element (6) bleibt stehen, die Bedingung 3 &lt; 3 ist falsch. Ergebnis: <b>4,9,2,6,1,8,3</b>.",
    explanation: "Typische Fehler: die Schleife bis zum Ende des Arrays laufen lassen (dann wird alles zweimal getauscht und das Array ist wieder im Original), den Tausch ohne Hilfsvariable <code>tmp</code> durchführen (ein Wert geht verloren) oder bei gerader Länge <code>links &lt;= rechts</code> annehmen.",
    tags: ["schreibtischtest","array","umkehren","zwei zeiger"],
  });

  qs.push({
    id: "fmt-trace-024",
    part: "GA2",
    topic: "ga2-datenstrukturen",
    type: "trace",
    difficulty: 2,
    step: 2,
    points: 7,
    context: "Ein Taschenrechner-Modul wertet Ausdrücke in umgekehrter polnischer Notation (UPN, Postfix) mit einem Stack aus. Der Ausdruck <code>(8 − 3) · (4 + 2)</code> lautet in UPN: <code>8 3 - 4 2 + *</code>.",
    question: "Führen Sie einen Schreibtischtest für <code>berechneUPN([\"8\", \"3\", \"-\", \"4\", \"2\", \"+\", \"*\"])</code> durch und füllen Sie die Tabelle aus. Tragen Sie <code>a</code> und <code>b</code> nur bei Operatoren ein und den Stack von <b>unten nach oben</b> jeweils am Ende des Durchlaufs.",
    code: `funktion berechneUPN(tokens: Array von Text): Ganzzahl
    var s: Stack von Ganzzahl = neuer Stack()
    für i von 0 bis länge(tokens) - 1
        var t: Text = tokens[i]
        wenn istZahl(t) dann
            s.push(zuZahl(t))
        sonst
            var b: Ganzzahl = s.pop()
            var a: Ganzzahl = s.pop()
            wenn t == "+" dann
                s.push(a + b)
            sonst wenn t == "-" dann
                s.push(a - b)
            sonst
                s.push(a * b)
            ende wenn
        ende wenn
    ende für
    rückgabe s.pop()
ende funktion`,
    trace: {
      columns: ["t","a","b","Stack (unten → oben)"],
      rows: [
        [{ g: "8" }, null, null, "8"],
        [{ g: "3" }, null, null, "8,3"],
        [{ g: "-" }, "8", "3", "5"],
        [{ g: "4" }, null, null, "5,4"],
        [{ g: "2" }, null, null, "5,4,2"],
        [{ g: "+" }, "4", "2", "5,6"],
        [{ g: "*" }, "5", "6", "30"],
      ],
      labels: ["i = 0","i = 1","i = 2","i = 3","i = 4","i = 5","i = 6"],
    },
    solution: "Zahlen werden auf den Stack gelegt. Bei einem Operator wird zuerst <code>b</code> (oberstes Element), dann <code>a</code> entnommen und <code>a op b</code> zurückgelegt: 8 − 3 = 5, später 4 + 2 = 6, zuletzt 5 · 6 = 30. Am Ende liegt nur noch <b>30</b> auf dem Stack und wird zurückgegeben.",
    explanation: "Typischer Fehler: <code>a</code> und <code>b</code> vertauschen – bei „−“ ergäbe sich 3 − 8 = −5. Weil der Stack LIFO arbeitet, ist das zuerst entnommene Element der <b>rechte</b> Operand. UPN braucht keine Klammern, weil die Reihenfolge der Operationen durch die Position der Operatoren festgelegt ist.",
    tags: ["schreibtischtest","stack","upn","postfix"],
  });

  qs.push({
    id: "fmt-trace-025",
    part: "GA2",
    topic: "ga2-datenstrukturen",
    type: "trace",
    difficulty: 3,
    step: 1,
    points: 11,
    context: "Eine Maschinensteuerung puffert Messwerte in einer Queue, die als <b>Ringpuffer</b> auf einem Array mit 4 Plätzen umgesetzt ist. <code>kopf</code> ist der Index des vordersten Elements, <code>anzahl</code> die Zahl gespeicherter Elemente. Entnommene Werte werden im Array <b>nicht</b> gelöscht. Das Array ist zu Beginn mit 0 gefüllt.",
    question: "Für ein Objekt <code>p</code> der Klasse werden nacheinander die Aufrufe der Tabelle ausgeführt. Führen Sie einen Schreibtischtest durch und füllen Sie die Tabelle aus: Attributwerte <b>nach</b> dem Aufruf, das komplette Array <code>daten</code> (Index 0 bis 3, Format: 10,20,0,0) und den Rückgabewert.",
    code: `klasse Ringpuffer
    privat daten: Array von Ganzzahl = [0, 0, 0, 0]
    privat kopf: Ganzzahl = 0
    privat anzahl: Ganzzahl = 0

    öffentlich methode einreihen(x: Ganzzahl): Wahrheitswert
        wenn anzahl == länge(daten) dann
            rückgabe falsch
        ende wenn
        var pos: Ganzzahl = (kopf + anzahl) mod länge(daten)
        daten[pos] = x
        anzahl = anzahl + 1
        rückgabe wahr
    ende methode

    öffentlich methode entnehmen(): Ganzzahl
        var x: Ganzzahl = daten[kopf]
        kopf = (kopf + 1) mod länge(daten)
        anzahl = anzahl - 1
        rückgabe x
    ende methode
ende klasse`,
    trace: {
      columns: ["Aufruf","kopf","anzahl","daten","Rückgabe"],
      rows: [
        [{ g: "–" }, { g: "0" }, { g: "0" }, { g: "0,0,0,0" }, null],
        [{ g: "p.einreihen(10)" }, "0", "1", "10,0,0,0", "wahr|true"],
        [{ g: "p.einreihen(20)" }, "0", "2", "10,20,0,0", "wahr|true"],
        [{ g: "p.einreihen(30)" }, "0", "3", "10,20,30,0", "wahr|true"],
        [{ g: "p.entnehmen()" }, "1", "2", "10,20,30,0", "10"],
        [{ g: "p.einreihen(40)" }, "1", "3", "10,20,30,40", "wahr|true"],
        [{ g: "p.einreihen(50)" }, "1", "4", "50,20,30,40", "wahr|true"],
        [{ g: "p.einreihen(60)" }, "1", "4", "50,20,30,40", "falsch|false"],
        [{ g: "p.entnehmen()" }, "2", "3", "50,20,30,40", "20"],
        [{ g: "p.einreihen(60)" }, "2", "4", "50,60,30,40", "wahr|true"],
      ],
      labels: ["Start","einreihen(10)","einreihen(20)","einreihen(30)","entnehmen()","einreihen(40)","einreihen(50)","einreihen(60)","entnehmen()","einreihen(60)"],
    },
    solution: "10, 20, 30 landen an den Indizes 0–2. <code>entnehmen</code> liefert 10, kopf = 1, anzahl = 2 (die 10 bleibt physisch stehen). 40 kommt an (1 + 2) mod 4 = 3, 50 an (1 + 3) mod 4 = <b>0</b> – der Puffer läuft „im Kreis“ und überschreibt die alte 10. Jetzt ist er voll (anzahl = 4): einreihen(60) liefert falsch. <code>entnehmen</code> liefert 20, kopf = 2. Danach kommt 60 an (2 + 3) mod 4 = 1. Endzustand: daten = 50,60,30,40, kopf = 2, anzahl = 4.",
    explanation: "Typische Fehler: beim Einreihen <code>mod</code> vergessen (Index 4 außerhalb), entnommene Werte im Array löschen oder verschieben (ein Ringpuffer verschiebt nie Elemente – deshalb sind alle Operationen O(1)) oder bei vollem Puffer trotzdem schreiben. Die logische Reihenfolge der Queue am Ende ist 30, 40, 50, 60 (ab kopf = 2 im Kreis gelesen).",
    tags: ["schreibtischtest","queue","ringpuffer","array","modulo"],
  });

  qs.push({
    id: "fmt-trace-026",
    part: "GA2",
    topic: "ga2-oop",
    type: "trace",
    difficulty: 1,
    step: 1,
    points: 4,
    context: "Eine Banking-App verwaltet Konten als Objekte der Klasse <code>Konto</code>. Eine Abhebung ist nur möglich, wenn der Saldo ausreicht (kein Dispo).",
    question: "Führen Sie einen Schreibtischtest für das Hauptprogramm (ab Zeile 20) durch und füllen Sie die Tabelle aus. Tragen Sie den Wert des Attributs <code>saldo</code> von <code>k</code> und den Wert der Variablen <code>ok</code> jeweils <b>nach</b> der Anweisung ein.",
    code: `klasse Konto
    privat saldo: Ganzzahl

    öffentlich konstruktor Konto(start: Ganzzahl)
        this.saldo = start
    ende konstruktor

    öffentlich methode einzahlen(betrag: Ganzzahl)
        this.saldo = this.saldo + betrag
    ende methode

    öffentlich methode abheben(betrag: Ganzzahl): Wahrheitswert
        wenn betrag > this.saldo dann
            rückgabe falsch
        ende wenn
        this.saldo = this.saldo - betrag
        rückgabe wahr
    ende methode
ende klasse
var k: Konto = neues Konto(100)
k.einzahlen(50)
var ok: Wahrheitswert = k.abheben(180)
ok = k.abheben(120)
k.einzahlen(25)`,
    trace: {
      columns: ["Anweisung","k.saldo","ok"],
      rows: [
        [{ g: "var k: Konto = neues Konto(100)" }, "100", null],
        [{ g: "k.einzahlen(50)" }, "150", null],
        [{ g: "var ok = k.abheben(180)" }, "150", "falsch|false"],
        [{ g: "ok = k.abheben(120)" }, "30", "wahr|true"],
        [{ g: "k.einzahlen(25)" }, "55", "wahr|true"],
      ],
    },
    solution: "Der Konstruktor setzt saldo = 100, einzahlen(50) → 150. abheben(180): 180 &gt; 150 → <code>rückgabe falsch</code> beendet die Methode <b>vor</b> der Subtraktion, saldo bleibt 150. abheben(120): 120 ≤ 150 → saldo 30, ok = wahr. einzahlen(25) → <b>55</b>; ok behält seinen Wert (wahr).",
    explanation: "Typische Fehler: bei der abgelehnten Abhebung trotzdem abziehen (saldo −30) oder <code>ok</code> nach <code>einzahlen</code> leeren – eine Variable behält ihren Wert, bis ihr ein neuer zugewiesen wird. Das Attribut ist <code>privat</code>: Von außen kann es nur über die Methoden geändert werden (Datenkapselung).",
    tags: ["schreibtischtest","oop","objektzustand","kapselung"],
  });

  qs.push({
    id: "fmt-trace-027",
    part: "GA2",
    topic: "ga2-oop",
    type: "trace",
    difficulty: 2,
    step: 1,
    points: 6,
    context: "Eine Lagerverwaltung modelliert Artikel als Objekte. Wird beim Entnehmen der Mindestbestand unterschritten, wird automatisch eine Nachbestellung ausgelöst (<code>bestellt</code>). Ist zu wenig Ware da, wird nur der vorhandene Bestand ausgeliefert.",
    question: "Führen Sie einen Schreibtischtest für das Hauptprogramm durch und füllen Sie die Tabelle aus. Tragen Sie die Attributwerte von <code>a</code> und den Wert von <code>g</code> jeweils <b>nach</b> der Anweisung ein.",
    code: `klasse Artikel
    privat bestand: Ganzzahl
    privat mindestbestand: Ganzzahl
    privat bestellt: Wahrheitswert = falsch

    öffentlich konstruktor Artikel(bestand: Ganzzahl, mindestbestand: Ganzzahl)
        this.bestand = bestand
        this.mindestbestand = mindestbestand
    ende konstruktor

    öffentlich methode entnehmen(menge: Ganzzahl): Ganzzahl
        var geliefert: Ganzzahl = menge
        wenn menge > this.bestand dann
            geliefert = this.bestand
        ende wenn
        this.bestand = this.bestand - geliefert
        wenn this.bestand < this.mindestbestand UND NICHT this.bestellt dann
            this.bestellt = wahr
        ende wenn
        rückgabe geliefert
    ende methode

    öffentlich methode wareneingang(menge: Ganzzahl)
        this.bestand = this.bestand + menge
        this.bestellt = falsch
    ende methode
ende klasse
var a: Artikel = neuer Artikel(40, 15)
var g: Ganzzahl = a.entnehmen(18)
g = a.entnehmen(10)
g = a.entnehmen(20)
a.wareneingang(50)
g = a.entnehmen(5)`,
    trace: {
      columns: ["Anweisung","a.bestand","a.bestellt","g"],
      rows: [
        [{ g: "var a: Artikel = neuer Artikel(40, 15)" }, { g: "40" }, { g: "falsch" }, null],
        [{ g: "var g = a.entnehmen(18)" }, "22", "falsch|false", "18"],
        [{ g: "g = a.entnehmen(10)" }, "12", "wahr|true", "10"],
        [{ g: "g = a.entnehmen(20)" }, "0", "wahr|true", "12"],
        [{ g: "a.wareneingang(50)" }, "50", "falsch|false", "12"],
        [{ g: "g = a.entnehmen(5)" }, "45", "falsch|false", "5"],
      ],
    },
    solution: "entnehmen(18): 40 − 18 = 22, 22 &lt; 15 ist falsch → keine Bestellung, g = 18. entnehmen(10): 12 &lt; 15 → bestellt = wahr, g = 10. entnehmen(20): 20 &gt; 12 → nur 12 geliefert, bestand 0, bestellt bleibt wahr, g = <b>12</b>. wareneingang(50): bestand 50, bestellt = falsch. entnehmen(5): 45, g = 5.",
    explanation: "Typische Fehler: bei entnehmen(20) einen negativen Bestand (−8) eintragen oder g = 20 statt der tatsächlich gelieferten 12. Das Attribut <code>bestellt</code> wird nur in <code>wareneingang</code> zurückgesetzt – der Objektzustand „merkt“ sich frühere Methodenaufrufe.",
    tags: ["schreibtischtest","oop","objektzustand","lager"],
  });

  qs.push({
    id: "fmt-trace-028",
    part: "GA2",
    topic: "ga2-oop",
    type: "trace",
    difficulty: 2,
    step: 2,
    points: 7,
    context: "Ein Ticketsystem für Konzerte vergibt fortlaufende Ticketnummern über das <b>statische</b> Attribut <code>zaehler</code> (Klassenattribut, existiert nur einmal für alle Objekte). Objektvariablen speichern <b>Referenzen</b> auf Objekte.",
    question: "Führen Sie einen Schreibtischtest für das Hauptprogramm durch und füllen Sie die Tabelle aus (Werte jeweils <b>nach</b> der Anweisung). Mit <code>t3.nr</code> ist die Nummer des Objekts gemeint, auf das <code>t3</code> gerade verweist.",
    code: `klasse Ticket
    privat statisch zaehler: Ganzzahl = 0
    privat nr: Ganzzahl
    privat preis: Ganzzahl

    öffentlich konstruktor Ticket(preis: Ganzzahl)
        Ticket.zaehler = Ticket.zaehler + 1
        this.nr = Ticket.zaehler
        this.preis = preis
    ende konstruktor

    öffentlich methode rabattieren(prozent: Ganzzahl)
        this.preis = this.preis - this.preis * prozent div 100
    ende methode
ende klasse
var t1: Ticket = neues Ticket(80)
var t2: Ticket = neues Ticket(60)
var t3: Ticket = t1
t3.rabattieren(25)
t2.rabattieren(50)
t3 = neues Ticket(40)
t3.rabattieren(10)`,
    trace: {
      columns: ["Anweisung","Ticket.zaehler","t1.preis","t2.preis","t3.nr","t3.preis"],
      rows: [
        [{ g: "var t1: Ticket = neues Ticket(80)" }, { g: "1" }, { g: "80" }, { g: "–" }, { g: "–" }, { g: "–" }],
        [{ g: "var t2: Ticket = neues Ticket(60)" }, "2", "80", "60", { g: "–" }, { g: "–" }],
        [{ g: "var t3: Ticket = t1" }, "2", "80", "60", "1", "80"],
        [{ g: "t3.rabattieren(25)" }, "2", "60", "60", "1", "60"],
        [{ g: "t2.rabattieren(50)" }, "2", "60", "30", "1", "60"],
        [{ g: "t3 = neues Ticket(40)" }, "3", "60", "30", "3", "40"],
        [{ g: "t3.rabattieren(10)" }, "3", "60", "30", "3", "36"],
      ],
    },
    solution: "<code>t3 = t1</code> erzeugt <b>kein</b> neues Objekt: t3 verweist auf dasselbe Ticket wie t1 (nr 1), der Zähler bleibt 2. Deshalb ändert <code>t3.rabattieren(25)</code> auch t1.preis: 80 − 20 = 60. t2: 60 − 30 = 30. Erst <code>neues Ticket(40)</code> erzeugt Objekt Nr. 3 (zaehler = 3); t3 verweist nun darauf, t1 bleibt bei 60. Zuletzt 40 − 4 = <b>36</b>.",
    explanation: "Typische Fehler: <code>t3 = t1</code> als Kopie verstehen (dann bliebe t1.preis 80) oder den Zähler bei der Zuweisung erhöhen. Der Konstruktor – und damit der Zähler – läuft nur bei <code>neues</code>. Ein statisches Attribut gehört der Klasse, nicht dem einzelnen Objekt.",
    tags: ["schreibtischtest","oop","referenz","statisch"],
  });

  qs.push({
    id: "fmt-trace-029",
    part: "GA2",
    topic: "ga2-oop",
    type: "trace",
    difficulty: 3,
    step: 1,
    points: 9,
    context: "Eine Autovermietung berechnet Mietpreise polymorph. Die abstrakte Klasse <code>Fahrzeug</code> liefert den Standardpreis; <code>PKW</code> gewährt ab 7 Tagen einen Tag gratis, <code>Transporter</code> schlägt eine Kaution auf. Beide Unterklassen überschreiben <code>miete</code>.",
    question: "Führen Sie einen Schreibtischtest für das Hauptprogramm (ab Zeile 33) durch und füllen Sie die Tabelle aus. Tragen Sie in „Klasse“ ein, in welcher Klasse die überschreibende Methode <code>miete</code> zur Laufzeit ausgewählt wird, sowie <code>betrag</code> und <code>gesamt</code> <b>nach</b> dem Durchlauf.",
    code: `abstrakte klasse Fahrzeug
    geschützt tagespreis: Ganzzahl
    öffentlich konstruktor Fahrzeug(tagespreis: Ganzzahl)
        this.tagespreis = tagespreis
    ende konstruktor
    öffentlich methode miete(tage: Ganzzahl): Ganzzahl
        rückgabe this.tagespreis * tage
    ende methode
ende klasse

klasse PKW erbt von Fahrzeug
    öffentlich konstruktor PKW(tagespreis: Ganzzahl)
        super(tagespreis)
    ende konstruktor
    öffentlich methode miete(tage: Ganzzahl): Ganzzahl
        wenn tage >= 7 dann
            rückgabe this.tagespreis * (tage - 1)
        ende wenn
        rückgabe super.miete(tage)
    ende methode
ende klasse

klasse Transporter erbt von Fahrzeug
    privat kaution: Ganzzahl
    öffentlich konstruktor Transporter(tagespreis: Ganzzahl, kaution: Ganzzahl)
        super(tagespreis)
        this.kaution = kaution
    ende konstruktor
    öffentlich methode miete(tage: Ganzzahl): Ganzzahl
        rückgabe super.miete(tage) + this.kaution
    ende methode
ende klasse
var flotte: Array von Fahrzeug = [neuer PKW(40), neuer Transporter(70, 100), neuer PKW(55), neuer Transporter(60, 150)]
var tage: Array von Ganzzahl = [7, 3, 2, 10]
var gesamt: Ganzzahl = 0
für i von 0 bis länge(flotte) - 1
    var betrag: Ganzzahl = flotte[i].miete(tage[i])
    gesamt = gesamt + betrag
ende für
ausgabe(gesamt)`,
    trace: {
      columns: ["i","Klasse","tage[i]","betrag","gesamt"],
      rows: [
        [{ g: "–" }, { g: "–" }, { g: "–" }, { g: "–" }, { g: "0" }],
        [{ g: "0" }, "PKW", { g: "7" }, "240", "240"],
        [{ g: "1" }, "Transporter", { g: "3" }, "310", "550"],
        [{ g: "2" }, "PKW", { g: "2" }, "110", "660"],
        [{ g: "3" }, "Transporter", { g: "10" }, "750", "1410"],
      ],
      labels: ["Start","1. Durchlauf","2. Durchlauf","3. Durchlauf","4. Durchlauf"],
    },
    solution: "Obwohl das Array den statischen Typ <code>Fahrzeug</code> hat, wird zur Laufzeit die Methode der <b>tatsächlichen</b> Klasse aufgerufen (dynamische Bindung). i = 0: PKW, 7 Tage → 40 · 6 = 240. i = 1: Transporter → 70 · 3 + 100 = 310 (550). i = 2: PKW, 2 Tage → <code>super.miete</code> → 110 (660). i = 3: Transporter → 60 · 10 + 150 = 750. Ausgabe: <b>1410</b>.",
    explanation: "Typische Fehler: immer <code>Fahrzeug.miete</code> annehmen (statischer statt dynamischer Typ; Ergebnis 280 + 210 + 110 + 600 = 1200), die Kaution vergessen oder beim PKW mit 2 Tagen ebenfalls einen Tag abziehen. <code>super.miete(tage)</code> ruft die Methode der Oberklasse auf – so wird Code wiederverwendet statt kopiert.",
    tags: ["schreibtischtest","oop","polymorphie","vererbung"],
  });

  AP2.questions.push.apply(AP2.questions, qs);

  /* ================================================================
   * Generatoren: simulieren den Algorithmus in JS und erzeugen daraus
   * code, trace und solution. Zufall ausschließlich über rnd().
   * ================================================================ */
  var W = "wahr|true", F = "falsch|false";
  function B(b) { return b ? W : F; }
  function G(v) { return { g: String(v) }; }
  function A(a) { return a.join(","); }
  function L(a) { return "[" + a.join(", ") + "]"; }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function c(s) { return "<code>" + esc(s) + "</code>"; }
  function ri(rnd, a, b) { return a + Math.floor(rnd() * (b - a + 1)); }
  function pick(rnd, arr) { return arr[Math.floor(rnd() * arr.length)]; }
  function nth(k) { return k + ". Durchlauf"; }
  function nths(n) { var r = []; for (var k = 1; k <= n; k++) r.push(nth(k)); return r; }
  /** n Zufallszahlen aus [lo, hi]; distinct = ohne Wiederholung */
  function randArr(rnd, n, lo, hi, distinct) {
    var a = [];
    var guard = 0;
    while (a.length < n && guard++ < 1000) {
      var x = ri(rnd, lo, hi);
      if (distinct && a.indexOf(x) >= 0) continue;
      a.push(x);
    }
    return a;
  }
  function sorted(a) { return a.slice().sort(function (x, y) { return x - y; }); }
  function isSorted(a) { for (var i = 1; i < a.length; i++) if (a[i - 1] > a[i]) return false; return true; }
  /** unsortiertes Array (nicht schon aufsteigend) */
  function unsortedArr(rnd, n, lo, hi) {
    var a;
    do { a = randArr(rnd, n, lo, hi, true); } while (isSorted(a));
    return a;
  }

  var CTX_ARR = [
    { name: "umsaetze", ctx: "Ein Kassensystem summiert die Umsätze (in €) der einzelnen Kassen einer Filiale.", was: "Tagesumsatz" },
    { name: "mengen", ctx: "Eine Lagerverwaltung summiert die Zugänge (in Stück) eines Artikels über mehrere Lieferungen.", was: "Gesamtzugang" },
    { name: "punkte", ctx: "Eine Lernplattform addiert die Punkte, die ein Prüfling in den einzelnen Aufgaben erreicht hat.", was: "Gesamtpunktzahl" },
    { name: "stunden", ctx: "Eine Zeiterfassung addiert die gearbeiteten Stunden eines Mitarbeiters an den Arbeitstagen einer Woche.", was: "Wochenarbeitszeit" },
    { name: "kisten", ctx: "Ein Getränkehandel addiert die ausgelieferten Kisten je Tour.", was: "Gesamtmenge" },
  ];

  // ---------- 1. Summen-Schleife ----------
  AP2.generators.push({
    id: "gen-trace-summe", part: "GA2", topic: "ga2-pseudocode", title: "Schreibtischtest: Summe in einer Schleife",
    generate: function (rnd) {
      var k = pick(rnd, CTX_ARR), n = ri(rnd, 4, 6), a = randArr(rnd, n, 1, 20), sumVar = pick(rnd, ["summe", "gesamt"]);
      var code = "var " + k.name + ": Array von Ganzzahl = " + L(a) + "\nvar " + sumVar + ": Ganzzahl = 0\nfür i von 0 bis länge(" + k.name + ") - 1\n    " +
        sumVar + " = " + sumVar + " + " + k.name + "[i]\nende für\nausgabe(" + sumVar + ")";
      var rows = [[G("–"), G("–"), G("0"), null]], s = 0, steps = [];
      a.forEach(function (x, i) { s += x; steps.push(s); rows.push([G(i), String(x), String(s), null]); });
      rows.push([null, null, null, String(s)]);
      return {
        type: "trace", difficulty: 1, points: 3, context: k.ctx,
        question: "Führen Sie einen Schreibtischtest durch und füllen Sie die Tabelle aus. Tragen Sie die Werte <b>am Ende</b> jedes Schleifendurchlaufs ein.",
        code: code,
        trace: { columns: ["i", k.name + "[i]", sumVar, "Ausgabe"], rows: rows, labels: ["Start"].concat(nths(n), ["Ende"]) },
        solution: "Der Akkumulator " + c(sumVar) + " startet bei 0, in jedem Durchlauf wird das Element mit Index i addiert: " + steps.join(" → ") + ". Ausgabe (" + k.was + "): <b>" + s + "</b>.",
        explanation: "Typische Fehler: Index und Wert verwechseln oder den letzten Index " + c("länge(" + k.name + ") - 1") + " auslassen. Die Grenze von " + c("für … bis …") + " ist inklusive.",
      };
    },
  });

  // ---------- 2. Zählschleife mit Bedingung ----------
  AP2.generators.push({
    id: "gen-trace-zaehlen", part: "GA2", topic: "ga2-pseudocode", title: "Schreibtischtest: Zählen mit Bedingung",
    generate: function (rnd) {
      var v = pick(rnd, [
        { ctx: "Eine Lagerverwaltung zählt Lagerplätze mit gerader Stückzahl (paarweise verpackbar).", name: "mengen", cond: "mengen[i] mod 2 == 0", f: function (x) { return x % 2 === 0; }, txt: "gerade Werte (Rest 0 bei Division durch 2)" },
        { ctx: "Ein Kassensystem zählt Bons, die durch 3 teilbar sind (Aktion „jeder dritte Euro“).", name: "betraege", cond: "betraege[i] mod 3 == 0", f: function (x) { return x % 3 === 0; }, txt: "durch 3 teilbare Werte" },
        { ctx: "Eine Wetterstation zählt die Tage, an denen die Höchsttemperatur über dem Schwellenwert lag.", name: "temp", thr: true },
        { ctx: "Ein Prüfprogramm zählt die Werkstücke, deren Abweichung (in 1/100 mm) mindestens so groß ist wie die Toleranz.", name: "abweichung", thr: true, ge: true },
      ]);
      var n = ri(rnd, 4, 6), a = randArr(rnd, n, 1, 20), cond = v.cond, f = v.f, txt = v.txt, pre = "";
      if (v.thr) {
        var t = ri(rnd, 6, 14);
        pre = "var grenze: Ganzzahl = " + t + "\n";
        cond = v.name + "[i] " + (v.ge ? ">=" : ">") + " grenze";
        f = v.ge ? function (x) { return x >= t; } : function (x) { return x > t; };
        txt = "Werte " + (v.ge ? "≥ " : "&gt; ") + t;
      }
      var code = "var " + v.name + ": Array von Ganzzahl = " + L(a) + "\n" + pre + "var anzahl: Ganzzahl = 0\nfür i von 0 bis länge(" + v.name + ") - 1\n    wenn " + cond +
        " dann\n        anzahl = anzahl + 1\n    ende wenn\nende für\nausgabe(anzahl)";
      var rows = [[G("–"), G("–"), G("–"), G("0")]], cnt = 0, hits = [];
      a.forEach(function (x, i) { var b = f(x); if (b) { cnt++; hits.push(x); } rows.push([G(i), String(x), B(b), String(cnt)]); });
      return {
        type: "trace", difficulty: 1, points: 4, context: v.ctx,
        question: "Führen Sie einen Schreibtischtest durch und füllen Sie die Tabelle aus. Tragen Sie je Durchlauf den Wert der Bedingung und den Wert von " + c("anzahl") + " <b>nach</b> dem Durchlauf ein.",
        code: code,
        trace: { columns: ["i", v.name + "[i]", cond, "anzahl"], rows: rows, labels: ["Start"].concat(nths(n)) },
        solution: "Gezählt werden " + txt + ": " + (hits.length ? hits.join(", ") : "keine") + ". " + c("anzahl") + " wird nur bei wahrer Bedingung erhöht. Ausgabe: <b>" + cnt + "</b>.",
        explanation: "Typische Fehler: den Zähler in jedem Durchlauf erhöhen, Grenzwerte falsch bewerten (" + c(">") + " vs. " + c(">=") + ") oder " + c("mod") + " mit " + c("div") + " verwechseln.",
      };
    },
  });

  // ---------- 3. Bubble Sort ----------
  AP2.generators.push({
    id: "gen-trace-bubble", part: "GA2", topic: "ga2-sortieren-suchen", title: "Schreibtischtest: Bubble-Sort-Durchläufe",
    generate: function (rnd) {
      var name = pick(rnd, ["a", "werte", "preise", "nummern"]), n = ri(rnd, 4, 6), a = unsortedArr(rnd, n, 1, 20), start = a.slice();
      var rows = [[G("–"), G("–"), G(A(a))]], desc = [], total = 0;
      for (var i = 1; i <= n - 1; i++) {
        var t = 0;
        for (var j = 0; j <= n - 1 - i; j++) if (a[j] > a[j + 1]) { var x = a[j]; a[j] = a[j + 1]; a[j + 1] = x; t++; }
        total += t;
        rows.push([G(i), String(t), A(a)]);
        desc.push("Durchlauf " + i + ": " + t + " × getauscht → " + A(a));
      }
      var code = "prozedur bubbleSort(" + name + ": Array von Ganzzahl)\n    var n: Ganzzahl = länge(" + name + ")\n    für i von 1 bis n - 1\n        var tausch: Ganzzahl = 0\n" +
        "        für j von 0 bis n - 1 - i\n            wenn " + name + "[j] > " + name + "[j + 1] dann\n                var tmp: Ganzzahl = " + name + "[j]\n                " + name + "[j] = " + name + "[j + 1]\n" +
        "                " + name + "[j + 1] = tmp\n                tausch = tausch + 1\n            ende wenn\n        ende für\n    ende für\nende prozedur";
      return {
        type: "trace", difficulty: 2, points: 6,
        question: "Führen Sie einen Schreibtischtest für " + c("bubbleSort(" + L(start) + ")") + " durch und füllen Sie die Tabelle aus. Tragen Sie je Durchlauf der äußeren Schleife die Anzahl der Vertauschungen und das Array <b>nach</b> dem Durchlauf ein (Format: 3,1,2).",
        code: code,
        trace: { columns: ["i", "tausch", "Array " + name], rows: rows, labels: ["Start"].concat(nths(n - 1)) },
        solution: "Benachbarte Elemente werden verglichen und getauscht, das größte unsortierte Element wandert je Durchlauf ans Ende.<br>" + desc.join("<br>") + "<br>Insgesamt " + total + " Vertauschungen.",
        explanation: "Typische Fehler: nur einen Tausch pro Durchlauf ausführen oder mit dem Ausgangsarray statt mit dem bereits veränderten Array weiterarbeiten. Die innere Schleife wird pro Durchlauf um 1 kürzer.",
      };
    },
  });

  // ---------- 4. Selection Sort ----------
  AP2.generators.push({
    id: "gen-trace-selection", part: "GA2", topic: "ga2-sortieren-suchen", title: "Schreibtischtest: Selection-Sort-Durchläufe",
    generate: function (rnd) {
      var name = pick(rnd, ["a", "zeiten", "werte"]), n = ri(rnd, 4, 6), a = unsortedArr(rnd, n, 1, 20), start = a.slice();
      var rows = [[G("–"), G("–"), G("–"), G(A(a))]], desc = [];
      for (var i = 0; i <= n - 2; i++) {
        var m = i;
        for (var j = i + 1; j <= n - 1; j++) if (a[j] < a[m]) m = j;
        var mv = a[m], x = a[i]; a[i] = a[m]; a[m] = x;
        rows.push([G(i), String(m), String(mv), A(a)]);
        desc.push("i = " + i + ": Minimum " + mv + " an Index " + m + (m === i ? " (kein echter Tausch)" : "") + " → " + A(a));
      }
      var code = "prozedur selectionSort(" + name + ": Array von Ganzzahl)\n    var n: Ganzzahl = länge(" + name + ")\n    für i von 0 bis n - 2\n        var minIdx: Ganzzahl = i\n" +
        "        für j von i + 1 bis n - 1\n            wenn " + name + "[j] < " + name + "[minIdx] dann\n                minIdx = j\n            ende wenn\n        ende für\n" +
        "        var tmp: Ganzzahl = " + name + "[i]\n        " + name + "[i] = " + name + "[minIdx]\n        " + name + "[minIdx] = tmp\n    ende für\nende prozedur";
      return {
        type: "trace", difficulty: 2, points: 6,
        question: "Führen Sie einen Schreibtischtest für " + c("selectionSort(" + L(start) + ")") + " durch und füllen Sie die Tabelle aus. Tragen Sie je Durchlauf den Index und den Wert des Minimums sowie das Array <b>nach</b> dem Tausch ein (Format: 3,1,2).",
        code: code,
        trace: { columns: ["i", "minIdx", "Minimum", "Array " + name], rows: rows, labels: ["Start"].concat(nths(n - 1)) },
        solution: "Je Durchlauf wird das Minimum des unsortierten Rests (ab Index i) gesucht und mit dem Element an Index i getauscht.<br>" + desc.join("<br>"),
        explanation: "Typische Fehler: den bereits sortierten Teil erneut durchsuchen, den Index im Ausgangsarray statt im aktuellen Array angeben oder bei jedem kleineren Element sofort tauschen.",
      };
    },
  });

  // ---------- 5. Insertion Sort ----------
  AP2.generators.push({
    id: "gen-trace-insertion", part: "GA2", topic: "ga2-sortieren-suchen", title: "Schreibtischtest: Insertion-Sort-Durchläufe",
    generate: function (rnd) {
      var name = pick(rnd, ["a", "startNr", "werte"]), n = ri(rnd, 4, 6), a = unsortedArr(rnd, n, 1, 20), start = a.slice();
      var rows = [[G("–"), G("–"), G("–"), G(A(a))]], desc = [], total = 0;
      for (var i = 1; i < n; i++) {
        var key = a[i], j = i - 1, s = 0;
        while (j >= 0 && a[j] > key) { a[j + 1] = a[j]; j--; s++; }
        a[j + 1] = key; total += s;
        rows.push([G(i), String(key), String(s), A(a)]);
        desc.push("i = " + i + ": key " + key + ", " + s + " Verschiebung" + (s === 1 ? "" : "en") + " → " + A(a));
      }
      var code = "prozedur insertionSort(" + name + ": Array von Ganzzahl)\n    für i von 1 bis länge(" + name + ") - 1\n        var key: Ganzzahl = " + name + "[i]\n        var j: Ganzzahl = i - 1\n" +
        "        solange j >= 0 UND " + name + "[j] > key\n            " + name + "[j + 1] = " + name + "[j]\n            j = j - 1\n        ende solange\n        " + name + "[j + 1] = key\n    ende für\nende prozedur";
      return {
        type: "trace", difficulty: 2, points: 7,
        question: "Führen Sie einen Schreibtischtest für " + c("insertionSort(" + L(start) + ")") + " durch und füllen Sie die Tabelle aus. Tragen Sie je Durchlauf der äußeren Schleife " + c("key") + ", die Anzahl der Verschiebungen (Zeile 6) und das Array <b>nach</b> dem Durchlauf ein (Format: 3,1,2).",
        code: code,
        trace: { columns: ["i", "key", "Verschiebungen", "Array " + name], rows: rows, labels: ["Start"].concat(nths(n - 1)) },
        solution: "Der linke Teil ist stets sortiert; " + c("key") + " wird dort eingefügt, größere Elemente rücken je eine Stelle nach rechts.<br>" + desc.join("<br>") + "<br>Insgesamt " + total + " Verschiebungen.",
        explanation: "Typische Fehler: tauschen statt verschieben (andere Zwischenstände), " + c("key") + " mit dem überschriebenen Wert an Index i verwechseln oder die Schleife nicht bei " + c("j < 0") + " beenden.",
      };
    },
  });

  // ---------- 6. Lineare Suche ----------
  AP2.generators.push({
    id: "gen-trace-linear", part: "GA2", topic: "ga2-sortieren-suchen", title: "Schreibtischtest: lineare Suche",
    generate: function (rnd) {
      var v = pick(rnd, [
        { ctx: "Eine Lagerverwaltung sucht den Index eines Lagerplatzes mit einer bestimmten Artikelnummer.", name: "nummern" },
        { ctx: "Ein Kassensystem sucht die Position eines Artikels im aktuellen Bon.", name: "bon" },
        { ctx: "Eine Zutrittskontrolle sucht einen Ausweis in der Liste der berechtigten Ausweisnummern.", name: "ausweise" },
      ]);
      var n = ri(rnd, 4, 6), a = randArr(rnd, n, 1, 20, true), found = rnd() < 0.75, g;
      if (found) g = a[ri(rnd, 1, n - 1)];
      else { do { g = ri(rnd, 1, 20); } while (a.indexOf(g) >= 0); }
      var rows = [], labels = [], res = -1;
      for (var i = 0; i < n; i++) {
        var hit = a[i] === g;
        rows.push([String(i), String(a[i]), B(hit), hit ? String(i) : null]);
        labels.push(nth(i + 1));
        if (hit) { res = i; break; }
      }
      if (res < 0) { rows.push([null, null, null, "-1"]); labels.push("nach der Schleife"); }
      var code = "funktion suche(" + v.name + ": Array von Ganzzahl, gesucht: Ganzzahl): Ganzzahl\n    für i von 0 bis länge(" + v.name + ") - 1\n        wenn " + v.name +
        "[i] == gesucht dann\n            rückgabe i\n        ende wenn\n    ende für\n    rückgabe -1\nende funktion";
      return {
        type: "trace", difficulty: 1, points: 3, context: v.ctx,
        question: "Führen Sie einen Schreibtischtest für " + c("suche(" + L(a) + ", " + g + ")") + " durch und füllen Sie die Tabelle aus. Tragen Sie je Schleifendurchlauf eine Zeile ein; „Rückgabe“ füllen Sie nur, wenn die Funktion dort endet.",
        code: code,
        trace: { columns: ["i", v.name + "[i]", v.name + "[i] == gesucht", "Rückgabe"], rows: rows, labels: labels },
        solution: res >= 0
          ? "Die Elemente werden der Reihe nach verglichen; bei i = " + res + " ist " + c(v.name + "[" + res + "] == " + g) + " wahr, " + c("rückgabe i") + " beendet die Funktion sofort. Ergebnis: <b>" + res + "</b> (Index)."
          : "Kein Element ist gleich " + g + ": Die Schleife läuft vollständig durch (" + n + " Vergleiche), danach wird <b>−1</b> zurückgegeben.",
        explanation: "Typische Fehler: Position (ab 1) statt Index (ab 0) zurückgeben, nach einem Treffer weitersuchen oder " + c("rückgabe -1") + " schon im ersten nicht passenden Durchlauf ausführen.",
      };
    },
  });

  // ---------- 7. Binäre Suche ----------
  AP2.generators.push({
    id: "gen-trace-binaer", part: "GA2", topic: "ga2-sortieren-suchen", title: "Schreibtischtest: binäre Suche",
    generate: function (rnd) {
      var n = ri(rnd, 7, 10), a = sorted(randArr(rnd, n, 1, 40, true)), found = rnd() < 0.65, g;
      if (found) g = a[ri(rnd, 0, n - 1)];
      else { do { g = ri(rnd, 1, 40); } while (a.indexOf(g) >= 0); }
      var l = 0, r = n - 1, rows = [], labels = [], desc = [], res = -1;
      while (l <= r) {
        var m = Math.floor((l + r) / 2), v = a[m], cmp;
        if (v === g) cmp = "gleich|==|=|gefunden"; else if (v < g) cmp = "kleiner|<|zu klein"; else cmp = "größer|>|zu groß|groesser";
        rows.push([rows.length ? String(l) : G(l), rows.length ? String(r) : G(r), W, String(m), String(v), cmp, v === g ? String(m) : null]);
        labels.push((rows.length) + ". Prüfung");
        desc.push("(" + l + " + " + r + ") div 2 = " + m + " → a[" + m + "] = " + v + (v === g ? " = " + g + " → gefunden" : v < g ? " &lt; " + g + " → links = " + (m + 1) : " &gt; " + g + " → rechts = " + (m - 1)));
        if (v === g) { res = m; break; }
        if (v < g) l = m + 1; else r = m - 1;
      }
      if (res < 0) { rows.push([String(l), String(r), F, null, null, null, "-1"]); labels.push(rows.length + ". Prüfung"); desc.push("links (" + l + ") &gt; rechts (" + r + ") → Suchbereich leer"); }
      var code = "funktion binaereSuche(a: Array von Ganzzahl, gesucht: Ganzzahl): Ganzzahl\n    var links: Ganzzahl = 0\n    var rechts: Ganzzahl = länge(a) - 1\n    solange links <= rechts\n" +
        "        var mitte: Ganzzahl = (links + rechts) div 2\n        wenn a[mitte] == gesucht dann\n            rückgabe mitte\n        sonst wenn a[mitte] < gesucht dann\n" +
        "            links = mitte + 1\n        sonst\n            rechts = mitte - 1\n        ende wenn\n    ende solange\n    rückgabe -1\nende funktion";
      return {
        type: "trace", difficulty: 2, points: 7,
        context: "Ein Onlineshop sucht in der aufsteigend sortierten Liste " + c("a = " + L(a)) + " (Indizes 0–" + (n - 1) + ") mit der binären Suche nach dem Wert " + g + ".",
        question: "Führen Sie einen Schreibtischtest für " + c("binaereSuche(a, " + g + ")") + " durch und füllen Sie die Tabelle aus. Jede Zeile entspricht einer Prüfung der Schleifenbedingung mit den Werten von " + c("links") + " und " + c("rechts") + " zu diesem Zeitpunkt. „Vergleich“: Ist " + c("a[mitte]") + " kleiner, größer oder gleich dem gesuchten Wert?",
        code: code,
        trace: { columns: ["links", "rechts", "links <= rechts", "mitte", "a[mitte]", "Vergleich", "Rückgabe"], rows: rows, labels: labels },
        solution: desc.join("<br>") + "<br>Rückgabe: <b>" + res + "</b>" + (res < 0 ? " (nicht gefunden)." : " (Index)."),
        explanation: "Typische Fehler: " + c("/") + " statt " + c("div") + ", Grenzen auf " + c("mitte") + " statt " + c("mitte ± 1") + " setzen (Endlosschleife) oder den Wert statt des Index zurückgeben.",
      };
    },
  });

  // ---------- 8. Verschachtelte Schleifen ----------
  AP2.generators.push({
    id: "gen-trace-verschachtelt", part: "GA2", topic: "ga2-pseudocode", title: "Schreibtischtest: verschachtelte Schleifen",
    generate: function (rnd) {
      if (rnd() < 0.5) {
        // 2D-Array: Summe und Zählung
        var zeilen = ri(rnd, 2, 3), spalten = 3, thr = ri(rnd, 4, 8), feld = [];
        for (var z = 0; z < zeilen; z++) feld.push(randArr(rnd, spalten, 0, 9));
        var rows = [[G("–"), G("–"), G("–"), G("0"), G("0")]], labels = ["Start"], s = 0, k = 0;
        for (z = 0; z < zeilen; z++) for (var sp = 0; sp < spalten; sp++) {
          var x = feld[z][sp];
          s += x; if (x >= thr) k++;
          rows.push([G(z), G(sp), String(x), String(s), String(k)]);
          labels.push("z = " + z + ", s = " + sp);
        }
        var lit = "[" + feld.map(L).join(", ") + "]";
        var code = "var lager: Array von Array von Ganzzahl = " + lit + "\nvar summe: Ganzzahl = 0\nvar voll: Ganzzahl = 0\nfür z von 0 bis " + (zeilen - 1) + "\n    für s von 0 bis 2\n" +
          "        summe = summe + lager[z][s]\n        wenn lager[z][s] >= " + thr + " dann\n            voll = voll + 1\n        ende wenn\n    ende für\nende für\nausgabe(summe, voll)";
        return {
          type: "trace", difficulty: 3, points: 8,
          context: "Ein Lager hat " + zeilen + " Regale (z) mit je 3 Fächern (s). Das zweidimensionale Array " + c("lager") + " enthält die Stückzahlen. Gezählt werden außerdem Fächer mit mindestens " + thr + " Stück.",
          question: "Führen Sie einen Schreibtischtest durch und füllen Sie die Tabelle aus. Jede Zeile beschreibt den Zustand <b>nach</b> einem Durchlauf der inneren Schleife.",
          code: code,
          trace: { columns: ["z", "s", "lager[z][s]", "summe", "voll"], rows: rows, labels: labels },
          solution: "Die äußere Schleife wählt das Regal, die innere läuft über dessen 3 Fächer – insgesamt " + (zeilen * 3) + " Durchläufe der inneren Schleife. " + c("summe") + " und " + c("voll") + " werden <b>nicht</b> pro Regal zurückgesetzt. Ausgabe: summe = <b>" + s + "</b>, voll = <b>" + k + "</b>.",
          explanation: "Typische Fehler: Zeilen- und Spaltenindex vertauschen (" + c("lager[s][z]") + "), ein Fach doppelt oder gar nicht lesen oder bei der Bedingung " + c(">=") + " den Grenzwert " + thr + " nicht mitzählen.",
        };
      }
      // Dreiecksschleife
      var n = ri(rnd, 3, 4), op = pick(rnd, ["*", "+"]);
      var rows2 = [], labels2 = [], w = 0;
      for (var i = 1; i <= n; i++) for (var j = i; j <= n; j++) {
        var t = op === "*" ? i * j : i + j; w += t;
        rows2.push([String(i), String(j), String(t), String(w)]);
        labels2.push((labels2.length + 1) + ". innerer Durchlauf");
      }
      var code2 = "var n: Ganzzahl = " + n + "\nvar wert: Ganzzahl = 0\nfür i von 1 bis n\n    für j von i bis n\n        var t: Ganzzahl = i " + op + " j\n        wert = wert + t\n    ende für\nende für\nausgabe(wert)";
      return {
        type: "trace", difficulty: 3, points: 8,
        context: "Ein Turnierplaner berechnet für alle Paarungen (i, j) mit i ≤ j eine Kennzahl. Die innere Schleife beginnt dabei jeweils beim aktuellen Wert von i; <code>wert</code> startet mit 0.",
        question: "Führen Sie einen Schreibtischtest durch und füllen Sie die Tabelle aus. Jede Zeile beschreibt einen Durchlauf der <b>inneren</b> Schleife (Werte nach dem Durchlauf).",
        code: code2,
        trace: { columns: ["i", "j", "t", "wert"], rows: rows2, labels: labels2 },
        solution: "Weil " + c("j") + " bei " + c("i") + " startet, wird die innere Schleife immer kürzer: " + n + " + " + (n - 1) + " + … + 1 = " + rows2.length + " Durchläufe. Ausgabe: <b>" + w + "</b>.",
        explanation: "Typische Fehler: " + c("j") + " jedes Mal bei 1 beginnen lassen (quadratisch viele Durchläufe) oder " + c("wert") + " pro äußerem Durchlauf zurücksetzen.",
      };
    },
  });

  // ---------- 9. solange mit Abbruch ----------
  AP2.generators.push({
    id: "gen-trace-solange", part: "GA2", topic: "ga2-pseudocode", title: "Schreibtischtest: solange-Schleife mit Abbruch",
    generate: function (rnd) {
      var kind = pick(rnd, ["zins", "collatz", "ggt"]);
      if (kind === "zins") {
        var kap0 = ri(rnd, 10, 40) * 100, p = pick(rnd, [5, 8, 10, 12]), years = ri(rnd, 3, 6), kk = kap0;
        var hist = [kap0];
        for (var y = 0; y < years; y++) { kk = kk + Math.floor(kk * p / 100); hist.push(kk); }
        var ziel = hist[years - 1] + 1 + Math.floor(rnd() * (hist[years] - hist[years - 1]));
        var rows = [[G("–"), G("0"), G("–"), G(kap0)]], k = kap0, j = 0;
        while (k < ziel) { var zi = Math.floor(k * p / 100); k += zi; j++; rows.push([W, String(j), String(zi), String(k)]); }
        rows.push([F, null, null, null]);
        var code = "var kapital: Ganzzahl = " + kap0 + "\nvar jahre: Ganzzahl = 0\nsolange kapital < " + ziel + "\n    var zinsen: Ganzzahl = kapital * " + p + " div 100\n" +
          "    kapital = kapital + zinsen\n    jahre = jahre + 1\nende solange\nausgabe(jahre)";
        return {
          type: "trace", difficulty: 2, points: 6,
          context: "Ein Sparplan-Rechner ermittelt, nach wie vielen Jahren ein Startkapital von " + kap0 + " € bei " + p + " % Zinseszins das Ziel von " + ziel + " € erreicht. Gerechnet wird in ganzen Euro (" + c("div") + " = Ganzzahldivision).",
          question: "Führen Sie einen Schreibtischtest durch und füllen Sie die Tabelle aus. Die Bedingung wird <b>vor</b> dem Durchlauf geprüft, alle anderen Werte gelten <b>nach</b> dem Durchlauf.",
          code: code,
          trace: { columns: ["kapital < " + ziel, "jahre", "zinsen", "kapital"], rows: rows, labels: ["Start"].concat(nths(j), ["Schleifenende"]) },
          solution: "Die Zinsen werden jedes Jahr vom <b>aktuellen</b> Kapital berechnet (Zinseszins): " + hist.slice(0, j + 1).join(" → ") + " €. Bei " + k + " ≥ " + ziel + " endet die Schleife. Ausgabe: <b>" + j + "</b> Jahre.",
          explanation: "Typische Fehler: Zinsen immer vom Startkapital berechnen (einfache Verzinsung), einen Durchlauf zu viel ausführen oder Nachkommastellen mitrechnen, obwohl " + c("div") + " sie abschneidet.",
        };
      }
      if (kind === "collatz") {
        var cands = [];
        for (var s = 3; s <= 40; s++) { var x = s, st = 0; while (x !== 1) { x = x % 2 === 0 ? x / 2 : 3 * x + 1; st++; } if (st >= 4 && st <= 8) cands.push(s); }
        var n0 = pick(rnd, cands), nn = n0, sc = 0;
        var rows2 = [[G("–"), G("–"), G(n0), G("0")]], seq = [n0];
        while (nn !== 1) { var ev = nn % 2 === 0; nn = ev ? nn / 2 : 3 * nn + 1; sc++; seq.push(nn); rows2.push([W, B(ev), String(nn), String(sc)]); }
        rows2.push([F, null, null, null]);
        var code2 = "var n: Ganzzahl = " + n0 + "\nvar schritte: Ganzzahl = 0\nsolange n != 1\n    wenn n mod 2 == 0 dann\n        n = n div 2\n    sonst\n        n = 3 * n + 1\n    ende wenn\n" +
          "    schritte = schritte + 1\nende solange\nausgabe(schritte)";
        return {
          type: "trace", difficulty: 2, points: 6,
          context: "Ein Testprogramm für Schleifen berechnet die Collatz-Folge: Ist n gerade, wird halbiert, sonst wird 3 · n + 1 gerechnet – so lange, bis n = 1 ist.",
          question: "Führen Sie einen Schreibtischtest durch und füllen Sie die Tabelle aus. Die Spalten „n != 1“ und „n gerade“ gelten <b>vor</b>, n und schritte <b>nach</b> dem Durchlauf.",
          code: code2,
          trace: { columns: ["n != 1", "n gerade", "n", "schritte"], rows: rows2, labels: ["Start"].concat(nths(sc), ["Schleifenende"]) },
          solution: "Folge: " + seq.join(" → ") + ". Bei n = 1 ist die Bedingung falsch. Ausgabe: <b>" + sc + "</b> Schritte.",
          explanation: "Typische Fehler: die Bedingung nach dem Durchlauf statt davor prüfen (ein Schritt zu viel) oder bei ungeradem n halbieren. Die Anzahl der Durchläufe ist vorher nicht bekannt – typischer Einsatz einer " + c("solange") + "-Schleife.",
        };
      }
      // ggT
      var a0, b0, it;
      do {
        var g = ri(rnd, 2, 9); a0 = g * ri(rnd, 4, 12); b0 = g * ri(rnd, 2, 11);
        if (a0 < b0) { var tmp = a0; a0 = b0; b0 = tmp; }
        var aa = a0, bb = b0; it = 0; while (bb !== 0) { var r = aa % bb; aa = bb; bb = r; it++; }
      } while (a0 === b0 || it < 3 || it > 7);
      var rows3 = [[G("–"), G(a0), G(b0), null]], a = a0, b = b0, steps = [];
      while (b !== 0) { var rr = a % b; steps.push(a + " mod " + b + " = " + rr); a = b; b = rr; rows3.push([String(rr), String(a), String(b), null]); }
      rows3.push([null, null, null, String(a)]);
      return {
        type: "trace", difficulty: 2, points: 6,
        context: "Ein Bruchrechner kürzt Brüche mit dem größten gemeinsamen Teiler (euklidischer Algorithmus).",
        question: "Führen Sie einen Schreibtischtest für " + c("ggT(" + a0 + ", " + b0 + ")") + " durch und füllen Sie die Tabelle aus (Werte am Ende jedes Durchlaufs).",
        code: "funktion ggT(a: Ganzzahl, b: Ganzzahl): Ganzzahl\n    solange b != 0\n        var rest: Ganzzahl = a mod b\n        a = b\n        b = rest\n    ende solange\n    rückgabe a\nende funktion",
        trace: { columns: ["rest", "a", "b", "Rückgabe"], rows: rows3, labels: ["Start"].concat(nths(it), ["Ende"]) },
        solution: steps.join("; ") + ". Bei b = 0 endet die Schleife, Rückgabe <b>" + a + "</b>.",
        explanation: "Typische Fehler: Zuweisungen vertauschen (" + c("b = rest") + " vor " + c("a = b") + ") oder " + c("b") + " (dann 0) statt " + c("a") + " zurückgeben.",
      };
    },
  });

  // ---------- 10. Rekursion mit Aufrufstapel ----------
  AP2.generators.push({
    id: "gen-trace-rekursion", part: "GA2", topic: "ga2-rekursion", title: "Schreibtischtest: Rekursion mit Aufrufstapel",
    generate: function (rnd) {
      var kind = pick(rnd, ["fak", "pot", "qs", "sum"]), calls = [], code, ctx, colP, fn, anchor;
      if (kind === "fak") {
        var n = ri(rnd, 3, 6);
        for (var k = n; k >= 1; k--) calls.push({ arg: "fakultaet(" + k + ")", p: k });
        calls.forEach(function (o) { var f = 1; for (var x = 2; x <= o.p; x++) f *= x; o.r = f; });
        code = "funktion fakultaet(n: Ganzzahl): Ganzzahl\n    wenn n <= 1 dann\n        rückgabe 1\n    ende wenn\n    rückgabe n * fakultaet(n - 1)\nende funktion";
        ctx = "Ein Planungstool berechnet die Anzahl möglicher Reihenfolgen von n Aufträgen (n!) rekursiv.";
        colP = "n"; anchor = "n <= 1";
      } else if (kind === "pot") {
        var b = ri(rnd, 2, 5), e = ri(rnd, 2, 5);
        for (var q = e; q >= 0; q--) calls.push({ arg: "potenz(" + b + ", " + q + ")", alt: "potenz(" + b + "," + q + ")", p: q, r: Math.pow(b, q) });
        code = "funktion potenz(basis: Ganzzahl, exp: Ganzzahl): Ganzzahl\n    wenn exp == 0 dann\n        rückgabe 1\n    ende wenn\n    rückgabe basis * potenz(basis, exp - 1)\nende funktion";
        ctx = "Ein Rechenmodul berechnet Potenzen rekursiv, ohne eingebauten Potenzoperator.";
        colP = "exp"; anchor = "exp == 0";
      } else if (kind === "qs") {
        var m = ri(rnd, 100, 99999);
        for (var v = m; ; v = Math.floor(v / 10)) { calls.push({ arg: "quersumme(" + v + ")", p: v }); if (v < 10) break; }
        calls.forEach(function (o) { o.r = String(o.p).split("").reduce(function (s, d) { return s + Number(d); }, 0); });
        code = "funktion quersumme(n: Ganzzahl): Ganzzahl\n    wenn n < 10 dann\n        rückgabe n\n    ende wenn\n    rückgabe n mod 10 + quersumme(n div 10)\nende funktion";
        ctx = "Ein Warenwirtschaftssystem berechnet für eine Prüfziffer die Quersumme einer Artikelnummer rekursiv.";
        colP = "n"; anchor = "n < 10";
      } else {
        var s = ri(rnd, 3, 7);
        for (var t = s; t >= 0; t--) calls.push({ arg: "summeBis(" + t + ")", p: t, r: (t * (t + 1)) / 2 });
        code = "funktion summeBis(n: Ganzzahl): Ganzzahl\n    wenn n == 0 dann\n        rückgabe 0\n    ende wenn\n    rückgabe n + summeBis(n - 1)\nende funktion";
        ctx = "Ein Lernprogramm berechnet die Summe 1 + 2 + … + n rekursiv.";
        colP = "n"; anchor = "n == 0";
      }
      var last = calls.length - 1;
      var rows = calls.map(function (o, i) {
        return [i === 0 ? G(o.arg) : o.arg + (o.alt ? "|" + o.alt : ""), String(o.p), B(i === last), String(o.r)];
      });
      var rets = calls.slice().reverse().map(function (o) { return o.r; });
      return {
        type: "trace", difficulty: 2, points: 6, context: ctx,
        question: "Führen Sie einen Schreibtischtest für " + c(calls[0].arg) + " durch und füllen Sie die Tabelle aus. Jede Zeile ist ein Aufruf (in der Reihenfolge, in der die Aufrufe starten); „Rückgabe“ ist der Wert, den <b>dieser</b> Aufruf zurückgibt.",
        code: code,
        trace: { columns: ["Aufruf", colP, anchor, "Rückgabe"], rows: rows, labels: calls.map(function (o, i) { return (i + 1) + ". Aufruf"; }) },
        solution: "Abstieg bis zum Rekursionsanker " + c(calls[last].arg) + " (" + c(anchor) + " ist wahr), insgesamt " + calls.length + " Aufrufe auf dem Stapel. Aufstieg (Rückgaben vom innersten zum äußersten Aufruf): " + rets.join(" → ") + ". Ergebnis: <b>" + calls[0].r + "</b>.",
        explanation: "Typische Fehler: den Anker-Aufruf nicht als eigenen Aufruf zählen oder die Rückgabe eines äußeren Aufrufs eintragen, bevor die inneren fertig sind. Jeder Aufruf hat eigene Parameterwerte auf dem Aufrufstapel.",
      };
    },
  });

  // ---------- 11. Array-Manipulation ----------
  AP2.generators.push({
    id: "gen-trace-array", part: "GA2", topic: "ga2-datenstrukturen", title: "Schreibtischtest: Array-Manipulation",
    generate: function (rnd) {
      var kind = pick(rnd, ["umkehren", "rotieren", "praefix"]), n = ri(rnd, 4, 6), a = randArr(rnd, n, 1, 20), start = a.slice();
      if (kind === "umkehren") {
        var l = 0, r = n - 1, rows = [[G("–"), G(l), G(r), G(A(a))]], it = 0;
        while (l < r) { var t = a[l]; a[l] = a[r]; a[r] = t; l++; r--; it++; rows.push([W, String(l), String(r), A(a)]); }
        rows.push([F, null, null, null]);
        return {
          type: "trace", difficulty: 2, points: 6,
          context: "Eine Logistik-App kehrt die Reihenfolge der Stopps einer Lieferroute für die Rückfahrt an Ort und Stelle um.",
          question: "Führen Sie einen Schreibtischtest für " + c("umkehren(" + L(start) + ")") + " durch. Die Bedingung gilt <b>vor</b>, links, rechts und das Array (Format: 3,1,2) <b>nach</b> dem Durchlauf.",
          code: "prozedur umkehren(a: Array von Ganzzahl)\n    var links: Ganzzahl = 0\n    var rechts: Ganzzahl = länge(a) - 1\n    solange links < rechts\n        var tmp: Ganzzahl = a[links]\n" +
            "        a[links] = a[rechts]\n        a[rechts] = tmp\n        links = links + 1\n        rechts = rechts - 1\n    ende solange\nende prozedur",
          trace: { columns: ["links < rechts", "links", "rechts", "Array a"], rows: rows, labels: ["Start"].concat(nths(it), ["Schleifenende"]) },
          solution: "Zwei Zeiger laufen von außen nach innen und tauschen; nach " + it + " Tausch" + (it === 1 ? "" : "en") + " gilt links ≥ rechts. " + (n % 2 ? "Das mittlere Element bleibt stehen. " : "") + "Ergebnis: <b>" + A(a) + "</b>.",
          explanation: "Typische Fehler: bis zum Arrayende laufen (alles wird doppelt getauscht → Original) oder ohne " + c("tmp") + " tauschen (ein Wert geht verloren).",
        };
      }
      if (kind === "rotieren") {
        var first = a[0], rows2 = [[G("–"), G(first), G(A(a))]];
        for (var i = 0; i <= n - 2; i++) { a[i] = a[i + 1]; rows2.push([G(i), G(first), A(a)]); }
        a[n - 1] = first;
        rows2.push([null, G(first), A(a)]);
        return {
          type: "trace", difficulty: 2, points: 5,
          context: "Eine Schichtplanung verschiebt die Reihenfolge der Mitarbeiter-IDs jede Woche um eine Position nach links; der Erste rückt ans Ende (Rotation).",
          question: "Führen Sie einen Schreibtischtest für " + c("rotiereLinks(" + L(start) + ")") + " durch und füllen Sie die Tabelle aus. Tragen Sie das Array (Format: 3,1,2) jeweils <b>nach</b> dem Schleifendurchlauf bzw. nach Zeile 6 ein.",
          code: "prozedur rotiereLinks(a: Array von Ganzzahl)\n    var erstes: Ganzzahl = a[0]\n    für i von 0 bis länge(a) - 2\n        a[i] = a[i + 1]\n    ende für\n    a[länge(a) - 1] = erstes\nende prozedur",
          trace: { columns: ["i", "erstes", "Array a"], rows: rows2, labels: ["Start"].concat(nths(n - 1), ["nach Zeile 6"]) },
          solution: "Jedes Element wird eine Position nach links kopiert; dabei steht das vorletzte und letzte Element kurzzeitig doppelt im Array. Erst Zeile 6 schreibt den gemerkten Wert " + first + " ans Ende: <b>" + A(a) + "</b>.",
          explanation: "Typische Fehler: den ersten Wert nicht zwischenspeichern (er wäre nach dem 1. Durchlauf überschrieben) oder die Schleife bis " + c("länge(a) - 1") + " laufen lassen (Zugriff auf " + c("a[länge(a)]") + ").",
        };
      }
      var rows3 = [[G("–"), G(A(a))]];
      for (var j = 1; j < n; j++) { a[j] = a[j] + a[j - 1]; rows3.push([G(j), A(a)]); }
      return {
        type: "trace", difficulty: 2, points: 5,
        context: "Eine Vertriebsstatistik wandelt Monatsumsätze in kumulierte Umsätze um (laufende Summe, „bis einschließlich Monat i“).",
        question: "Führen Sie einen Schreibtischtest für " + c("kumulieren(" + L(start) + ")") + " durch und füllen Sie die Tabelle aus. Tragen Sie das Array (Format: 3,1,2) jeweils <b>nach</b> dem Durchlauf ein.",
        code: "prozedur kumulieren(a: Array von Ganzzahl)\n    für i von 1 bis länge(a) - 1\n        a[i] = a[i] + a[i - 1]\n    ende für\nende prozedur",
        trace: { columns: ["i", "Array a"], rows: rows3, labels: ["Start"].concat(nths(n - 1)) },
        solution: "In jedem Durchlauf wird zum aktuellen Element das <b>bereits kumulierte</b> Vorgängerelement addiert. Ergebnis: <b>" + A(a) + "</b>; das letzte Element ist die Gesamtsumme.",
        explanation: "Typischer Fehler: mit den Originalwerten statt mit dem bereits veränderten " + c("a[i - 1]") + " rechnen – dann entsteht nur die Summe zweier Nachbarn.",
      };
    },
  });

  // ---------- 12. Stack / Queue ----------
  AP2.generators.push({
    id: "gen-trace-stack-queue", part: "GA2", topic: "ga2-datenstrukturen", title: "Schreibtischtest: Stack- und Queue-Operationen",
    generate: function (rnd) {
      var isStack = rnd() < 0.5, nOps = ri(rnd, 6, 8), ds = [], x = null, lines = [], rows = [], labels = [];
      var vName = isStack ? "s" : "q", put = isStack ? "push" : "enqueue", take = isStack ? "pop" : "dequeue";
      var used = [];
      for (var i = 0; i < nOps; i++) {
        var doTake = ds.length > 0 && (i >= 2 && rnd() < 0.45);
        var line;
        if (doTake) { x = isStack ? ds.pop() : ds.shift(); line = "x = " + vName + "." + take + "()"; }
        else {
          var v; do { v = ri(rnd, 1, 20); } while (used.indexOf(v) >= 0); used.push(v);
          ds.push(v); line = vName + "." + put + "(" + v + ")";
        }
        lines.push(line);
        rows.push([G(i + 3), ds.length ? A(ds) : "leer|-", x === null ? null : String(x)]);
        labels.push(line);
      }
      if (x === null) { // mindestens eine Entnahme sicherstellen
        x = isStack ? ds.pop() : ds.shift();
        var ln = "x = " + vName + "." + take + "()";
        lines.push(ln); rows.push([G(nOps + 3), ds.length ? A(ds) : "leer|-", String(x)]); labels.push(ln);
      }
      var code = "var " + vName + ": " + (isStack ? "Stack" : "Queue") + " von Ganzzahl = " + (isStack ? "neuer Stack()" : "neue Queue()") + "\nvar x: Ganzzahl\n" + lines.join("\n");
      return {
        type: "trace", difficulty: 1, points: 4,
        context: isStack
          ? "Ein Texteditor verwaltet Rückgängig-Schritte in einem Stack (LIFO): " + c("push") + " legt oben ab, " + c("pop") + " entnimmt das oberste Element."
          : "Ein Drucker verwaltet Aufträge in einer Queue (FIFO): " + c("enqueue") + " fügt hinten an, " + c("dequeue") + " entnimmt vorne.",
        question: "Führen Sie einen Schreibtischtest durch und füllen Sie die Tabelle aus. Notieren Sie nach jeder Zeile den Inhalt " + (isStack ? "von <b>unten nach oben</b>" : "von <b>vorne nach hinten</b>") + " (Format: 5,8; leer = „-“) und den aktuellen Wert von " + c("x") + ".",
        code: code,
        trace: { columns: ["Zeile", isStack ? "Stack (unten → oben)" : "Queue (vorne → hinten)", "x"], rows: rows, labels: labels },
        solution: (isStack ? "Stack = Last In – First Out: Entnommen wird immer das zuletzt abgelegte Element." : "Queue = First In – First Out: Entnommen wird immer das am längsten wartende Element.") +
          " Endzustand: <b>" + (ds.length ? A(ds) : "leer") + "</b>, x = <b>" + x + "</b>.",
        explanation: "Typischer Fehler: Stack und Queue verwechseln, also am falschen Ende entnehmen. " + c("x") + " behält seinen Wert, bis erneut entnommen wird.",
      };
    },
  });

  // ---------- 13. Zahlensysteme (Restwertverfahren) ----------
  AP2.generators.push({
    id: "gen-trace-umrechnung", part: "GA2", topic: "ga2-zahlensysteme", title: "Schreibtischtest: Dezimalzahl umrechnen (Restwertverfahren)",
    generate: function (rnd) {
      var basis = pick(rnd, [2, 2, 8, 16]), zahl;
      if (basis === 2) zahl = ri(rnd, 9, 120); else if (basis === 8) zahl = ri(rnd, 70, 500); else zahl = ri(rnd, 200, 4000);
      var Z = "0123456789ABCDEF", z = zahl, rows = [], res = "", it = 0;
      while (z > 0) {
        var r = z % basis, q = Math.floor(z / basis);
        res = Z[r] + res; it++;
        rows.push([it === 1 ? G(z) : String(z), String(r) + (r >= 10 ? "|" + Z[r] : ""), String(q), null]);
        z = q;
      }
      rows.push([null, null, null, res + "|" + res + "_" + basis + (basis === 16 ? "|0x" + res : "")]);
      var name = { 2: "Binärzahl", 8: "Oktalzahl", 16: "Hexadezimalzahl" }[basis];
      return {
        type: "trace", difficulty: 2, points: 5,
        context: "Ein Diagnosewerkzeug rechnet Dezimalzahlen in eine " + name + " um. " + c("ziffern[r]") + " liefert das Zeichen an Position r (0-basiert).",
        question: "Führen Sie einen Schreibtischtest für " + c("umrechnen(" + zahl + ", " + basis + ")") + " durch und füllen Sie die Tabelle aus. Jede Zeile ist ein Schleifendurchlauf: " + c("zahl") + " zu Beginn, Rest und " + c("zahl div basis") + ". In der letzten Zeile tragen Sie die Rückgabe ein.",
        code: "funktion umrechnen(zahl: Ganzzahl, basis: Ganzzahl): Text\n    var ziffern: Text = \"0123456789ABCDEF\"\n    var ergebnis: Text = \"\"\n    solange zahl > 0\n" +
          "        var rest: Ganzzahl = zahl mod basis\n        ergebnis = ziffern[rest] + ergebnis\n        zahl = zahl div basis\n    ende solange\n    rückgabe ergebnis\nende funktion",
        trace: { columns: ["zahl", "zahl mod " + basis, "zahl div " + basis, "Rückgabe"], rows: rows, labels: nths(it).concat(["Ende"]) },
        solution: "Fortgesetzte Division durch " + basis + ", bis 0 erreicht ist. Die Reste ergeben – <b>von unten nach oben</b> gelesen (jede neue Ziffer wird vorne angefügt) – die " + name + ": <b>" + res + "</b>" + (basis === 16 ? " (Reste ≥ 10 werden als A–F geschrieben)" : "") + ".",
        explanation: "Typische Fehler: die Reste von oben nach unten lesen (Ziffernfolge umgekehrt), " + c("mod") + " und " + c("div") + " verwechseln oder bei Hexadezimal Reste wie 11 nicht als „B“ schreiben.",
      };
    },
  });

  // ---------- 14. Objektzustand (OOP) ----------
  AP2.generators.push({
    id: "gen-trace-objekt", part: "GA2", topic: "ga2-oop", title: "Schreibtischtest: Objektzustand nach Methodenaufrufen",
    generate: function (rnd) {
      var v = pick(rnd, [
        { cls: "Konto", obj: "k", attr: "saldo", add: "einzahlen", sub: "abheben", ctx: "Eine Banking-App verwaltet Konten als Objekte. Eine Abhebung ist nur möglich, wenn der Saldo ausreicht." },
        { cls: "Lagerplatz", obj: "p", attr: "bestand", add: "einlagern", sub: "auslagern", ctx: "Eine Lagerverwaltung modelliert Lagerplätze als Objekte. Ausgelagert werden kann nur, wenn genug Ware vorhanden ist." },
        { cls: "Guthabenkarte", obj: "g", attr: "guthaben", add: "aufladen", sub: "bezahlen", ctx: "Eine Kantine nutzt Guthabenkarten. Eine Zahlung wird abgelehnt, wenn das Guthaben nicht reicht." },
      ]);
      var start = ri(rnd, 2, 10) * 10, val = start, ok = null, rows = [], main = [];
      main.push("var " + v.obj + ": " + v.cls + " = neues " + v.cls + "(" + start + ")");
      rows.push([G(main[0]), G(start), null]);
      var nOps = ri(rnd, 4, 5), hadFail = false;
      for (var i = 0; i < nOps; i++) {
        var isSub = rnd() < 0.6 || (i === nOps - 1 && !hadFail), amt;
        if (isSub) {
          amt = (!hadFail && (rnd() < 0.4 || i === nOps - 1)) ? val + ri(rnd, 1, 5) * 10 : ri(rnd, 1, Math.max(1, Math.floor(val / 10))) * 10;
          var line = (ok === null ? "var ok: Wahrheitswert = " : "ok = ") + v.obj + "." + v.sub + "(" + amt + ")";
          if (amt > val) { ok = false; hadFail = true; } else { val -= amt; ok = true; }
          main.push(line);
        } else {
          amt = ri(rnd, 1, 8) * 10; val += amt;
          main.push(v.obj + "." + v.add + "(" + amt + ")");
        }
        rows.push([G(main[main.length - 1]), String(val), ok === null ? null : B(ok)]);
      }
      var code = "klasse " + v.cls + "\n    privat " + v.attr + ": Ganzzahl\n\n    öffentlich konstruktor " + v.cls + "(start: Ganzzahl)\n        this." + v.attr + " = start\n    ende konstruktor\n\n" +
        "    öffentlich methode " + v.add + "(betrag: Ganzzahl)\n        this." + v.attr + " = this." + v.attr + " + betrag\n    ende methode\n\n" +
        "    öffentlich methode " + v.sub + "(betrag: Ganzzahl): Wahrheitswert\n        wenn betrag > this." + v.attr + " dann\n            rückgabe falsch\n        ende wenn\n" +
        "        this." + v.attr + " = this." + v.attr + " - betrag\n        rückgabe wahr\n    ende methode\nende klasse\n" + main.join("\n");
      return {
        type: "trace", difficulty: 1, points: 4, context: v.ctx,
        question: "Führen Sie einen Schreibtischtest für das Hauptprogramm (ab Zeile 20) durch und füllen Sie die Tabelle aus. Tragen Sie den Wert des Attributs " + c(v.obj + "." + v.attr) + " und der Variablen " + c("ok") + " jeweils <b>nach</b> der Anweisung ein.",
        code: code,
        trace: { columns: ["Anweisung", v.obj + "." + v.attr, "ok"], rows: rows },
        solution: "Bei einem zu hohen Betrag liefert " + c(v.sub) + " sofort " + c("falsch") + " – die Subtraktion wird nicht ausgeführt, der Zustand bleibt unverändert. " + c(v.add) + " ändert " + c("ok") + " nicht. Endzustand: " + v.attr + " = <b>" + val + "</b>.",
        explanation: "Typische Fehler: auch bei abgelehnter Buchung abziehen (negativer Wert) oder " + c("ok") + " nach " + c(v.add) + " leeren. Das Attribut ist privat und wird nur über Methoden verändert (Datenkapselung).",
      };
    },
  });
})();
