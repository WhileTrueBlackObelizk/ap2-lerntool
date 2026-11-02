// Lernpfad Algorithmen/Pseudocode: aufbauende Übungen in drei Levels (Leicht/Mittel/Schwer)
// Ergänzt die Topics aus data/ga2_algo.js (definiert KEINE eigenen Topics).
window.AP2 = window.AP2 || { topics: [], questions: [], exams: [], generators: [] };
(function () {
  var esc = function (s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); };
  // Pseudocode-Block: Rohtext rein, escaped <pre><code> raus
  var pre = function (s) { return "<pre><code>" + esc(String(s).replace(/^\n/, "").replace(/\s+$/, "")) + "</code></pre>"; };
  var c = function (s) { return "<code>" + esc(s) + "</code>"; };
  var qs = [];
  var add = function () { for (var i = 0; i < arguments.length; i++) qs.push(arguments[i]); };

  // ===================== ga2-pseudocode =====================
  add(
    // ---------- Leicht ----------
    {
      id: "lvl-algo-pc-01", topic: "ga2-pseudocode", type: "numeric", difficulty: 1, step: 1, points: 2,
      context: "Sie lernen gerade, Pseudocode Zeile für Zeile „im Kopf“ auszuführen (Schreibtischtest). Jede Zuweisung überschreibt den alten Wert der Variablen.",
      question: "Welcher Wert wird ausgegeben?" + pre(`
var a: Ganzzahl = 5
var b: Ganzzahl = 3
a = a + b
b = a - b
a = a - b
ausgabe(a * 10 + b)`),
      answer: 35, tolerance: 0,
      solution: "Trace: a = 5, b = 3 → a = 5 + 3 = 8 → b = 8 − 3 = 5 → a = 8 − 5 = 3. Ausgabe: 3 · 10 + 5 = <b>35</b>.",
      explanation: "Hinweis für Einsteiger: Notieren Sie nach <b>jeder</b> Zeile den aktuellen Wert aller Variablen in einer kleinen Tabelle. Der Code vertauscht a und b ohne Hilfsvariable. Typischer Fehler: mit dem alten Wert von a weiterrechnen, obwohl a schon überschrieben wurde.",
      tags: ["schreibtischtest", "variablen"]
    },
    {
      id: "lvl-algo-pc-02", topic: "ga2-pseudocode", type: "code", lang: "pseudocode", difficulty: 1, step: 2, points: 3,
      context: "Ein Online-Shop für Druckerzubehör berechnet die Versandkosten: Ab einem Bestellwert von 50,00 € ist der Versand kostenlos, darunter kostet er 4,95 €.",
      question: "Vervollständigen Sie die Funktion <code>versandkosten</code>, indem Sie die fehlende Verzweigung ergänzen.",
      starter: "funktion versandkosten(bestellwert: Gleitkommazahl): Gleitkommazahl\n  var kosten: Gleitkommazahl = 0.0\n  // TODO: Verzweigung ergänzen (ab 50.00 kostenlos, sonst 4.95)\n\n  rückgabe kosten\nende funktion",
      solution: pre(`
funktion versandkosten(bestellwert: Gleitkommazahl): Gleitkommazahl
  var kosten: Gleitkommazahl = 0.0
  wenn bestellwert >= 50.00 dann
    kosten = 0.0
  sonst
    kosten = 4.95
  ende wenn
  rückgabe kosten
ende funktion`) + "Kürzer (gleichwertig): <code>wenn bestellwert &lt; 50.00 dann kosten = 4.95 ende wenn</code>, da kosten bereits mit 0.0 initialisiert ist.",
      explanation: "Hinweis: „ab 50 €“ heißt <b>einschließlich</b> 50 € → <code>&gt;=</code>. Typischer Fehler ist <code>&gt; 50</code>: Dann zahlt ein Kunde mit genau 50,00 € Versand. Testen Sie Grenzwerte immer mit dem Wert selbst (50,00) und knapp darunter (49,99).",
      keywords: ["wenn|if", ">= 50|>=50|< 50|<50", "4.95|4,95", "sonst|else", "kosten =|kosten=", "ende wenn|}"],
      tags: ["verzweigung", "grenzwert"]
    },
    {
      id: "lvl-algo-pc-03", topic: "ga2-pseudocode", type: "numeric", difficulty: 1, step: 3, points: 2,
      question: "Welchen Wert hat <code>s</code> nach Ausführung des folgenden Codes?" + pre(`
var s: Ganzzahl = 0
für i von 2 bis 8 schritt 3
  s = s + i
ende für`),
      answer: 15, tolerance: 0,
      solution: "i nimmt die Werte 2, 5, 8 an (die Grenze 8 ist inklusive, 11 wäre zu groß). s = 0 + 2 + 5 + 8 = <b>15</b>. Es gibt 3 Durchläufe.",
      explanation: "Hinweis: In dieser Notation ist die obere Grenze bei <code>für … bis …</code> <b>inklusive</b>. Typischer Fehler: die 8 vergessen (Ergebnis 7) oder mit Schritt 1 rechnen.",
      tags: ["zaehlschleife", "schreibtischtest"]
    },
    {
      id: "lvl-algo-pc-04", topic: "ga2-pseudocode", type: "code", lang: "pseudocode", difficulty: 1, step: 4, points: 3,
      context: "Das Kassensystem einer Bäckerei speichert alle Einzelumsätze eines Tages im Array <code>umsaetze</code>. Am Abend soll die Tagessumme berechnet werden.",
      question: "Ergänzen Sie die zwei fehlenden Zeilen (markiert mit TODO), sodass die Funktion die Summe aller Umsätze liefert.",
      starter: "funktion tagessumme(umsaetze: Array von Gleitkommazahl): Gleitkommazahl\n  // TODO 1: Summenvariable anlegen\n  für i von 0 bis laenge(umsaetze) - 1\n    // TODO 2: aktuellen Umsatz addieren\n  ende für\n  rückgabe summe\nende funktion",
      solution: pre(`
funktion tagessumme(umsaetze: Array von Gleitkommazahl): Gleitkommazahl
  var summe: Gleitkommazahl = 0.0
  für i von 0 bis laenge(umsaetze) - 1
    summe = summe + umsaetze[i]
  ende für
  rückgabe summe
ende funktion`),
      explanation: "Muster „Akkumulator“: <b>vor</b> der Schleife mit 0 initialisieren, <b>in</b> der Schleife aufaddieren, <b>nach</b> der Schleife zurückgeben. Typische Fehler: Initialisierung in der Schleife (summe wird jedes Mal auf 0 gesetzt) oder <code>summe = umsaetze[i]</code> (überschreibt statt addiert).",
      keywords: ["var summe|summe: gleitkommazahl|summe =", "0.0|= 0|=0", "summe + umsaetze[i]|summe+umsaetze[i]|+=", "umsaetze[i]"],
      tags: ["array", "summe"]
    },
    {
      id: "lvl-algo-pc-05", topic: "ga2-pseudocode", type: "order", difficulty: 1, step: 5, points: 3,
      context: "Eine Wetterstation liefert die Tageshöchsttemperaturen einer Woche als Array <code>t</code> (mindestens ein Element). Gesucht ist die höchste Temperatur.",
      question: "Bringen Sie die Zeilen der Funktion <code>maximum</code> in die richtige Reihenfolge.",
      items: [
        "funktion maximum(t: Array von Gleitkommazahl): Gleitkommazahl",
        "var max: Gleitkommazahl = t[0]",
        "für i von 1 bis laenge(t) - 1",
        "wenn t[i] > max dann",
        "max = t[i]",
        "ende wenn",
        "ende für",
        "rückgabe max",
        "ende funktion"
      ].map(esc),
      solution: pre(`
funktion maximum(t: Array von Gleitkommazahl): Gleitkommazahl
  var max: Gleitkommazahl = t[0]
  für i von 1 bis laenge(t) - 1
    wenn t[i] > max dann
      max = t[i]
    ende wenn
  ende für
  rückgabe max
ende funktion`),
      explanation: "Hinweis: Das Maximum wird mit dem <b>ersten Element</b> initialisiert – nicht mit 0! Bei lauter negativen Wintertemperaturen (−3, −7, −1) würde sonst fälschlich 0 geliefert. Die Schleife kann dann bei Index 1 beginnen. <code>rückgabe</code> steht <b>nach</b> der Schleife.",
      tags: ["array", "maximum"]
    },
    {
      id: "lvl-algo-pc-06", topic: "ga2-pseudocode", type: "mc", difficulty: 1, step: 6, points: 2,
      context: "Eine Funktion soll zählen, wie viele Prüflinge mindestens 50 Punkte erreicht haben. Beim Test bricht das Programm mit „Index außerhalb des gültigen Bereichs“ ab.",
      question: "In welcher Zeile steckt der Fehler?" + pre(`
1  funktion bestanden(punkte: Array von Ganzzahl): Ganzzahl
2    var anzahl: Ganzzahl = 0
3    für i von 0 bis laenge(punkte)
4      wenn punkte[i] >= 50 dann
5        anzahl = anzahl + 1
6      ende wenn
7    ende für
8    rückgabe anzahl
9  ende funktion`),
      options: ["Zeile 2", "Zeile 3", "Zeile 4", "Zeile 5"],
      correct: [1],
      solution: "Zeile 3: Die Schleife läuft bis <code>laenge(punkte)</code> (inklusive). Der letzte gültige Index ist aber <code>laenge(punkte) - 1</code>. Korrekt: <code>für i von 0 bis laenge(punkte) - 1</code>.",
      explanation: "Das ist der Klassiker <b>Off-by-one</b>: Ein Array mit 5 Elementen hat die Indizes 0 bis 4. Zeile 2 (Zähler mit 0 initialisieren), Zeile 4 (≥ 50 = „mindestens“) und Zeile 5 (Zähler erhöhen) sind korrekt.",
      tags: ["fehlersuche", "off-by-one", "zaehlen"]
    },
    {
      id: "lvl-algo-pc-07", topic: "ga2-pseudocode", type: "code", lang: "pseudocode", difficulty: 1, step: 7, points: 4,
      context: "Die IHK rechnet Prüfungspunkte (0–100) nach folgendem Schlüssel in Noten um: ab 92 → 1, ab 81 → 2, ab 67 → 3, ab 50 → 4, ab 30 → 5, darunter → 6.",
      question: "Vervollständigen Sie die Mehrfachverzweigung der Funktion <code>note</code>. Die ersten beiden Fälle sind vorgegeben.",
      starter: "funktion note(punkte: Ganzzahl): Ganzzahl\n  wenn punkte >= 92 dann\n    rückgabe 1\n  sonst wenn punkte >= 81 dann\n    rückgabe 2\n  // TODO: restliche Fälle ergänzen\n\n  ende wenn\nende funktion",
      solution: pre(`
funktion note(punkte: Ganzzahl): Ganzzahl
  wenn punkte >= 92 dann
    rückgabe 1
  sonst wenn punkte >= 81 dann
    rückgabe 2
  sonst wenn punkte >= 67 dann
    rückgabe 3
  sonst wenn punkte >= 50 dann
    rückgabe 4
  sonst wenn punkte >= 30 dann
    rückgabe 5
  sonst
    rückgabe 6
  ende wenn
ende funktion`),
      explanation: "Hinweis: Weil die Bedingungen <b>von oben nach unten</b> geprüft werden, reicht jeweils die Untergrenze – ein Wert ab 92 kommt nie bis zur Prüfung „≥ 81“. Typischer Fehler: Reihenfolge umdrehen (zuerst <code>&gt;= 30</code>) – dann bekäme jeder mit ≥ 30 Punkten die Note 5. Das abschließende <code>sonst</code> fängt alle übrigen Werte ab.",
      keywords: ["sonst wenn|else if|elif", ">= 67|>=67", ">= 50|>=50", ">= 30|>=30", "rückgabe 3|return 3", "rückgabe 6|return 6", "sonst|else"],
      tags: ["verzweigung", "mehrfachauswahl"]
    },
    {
      id: "lvl-algo-pc-08", topic: "ga2-pseudocode", type: "numeric", difficulty: 1, step: 8, points: 3,
      context: "Ein Sparplan-Rechner ermittelt, nach wie vielen Jahren ein Startkapital von 1.000 € bei 10 % Zinsen pro Jahr (Zinseszins) die Marke von 1.500 € erreicht oder überschreitet.",
      question: "Welchen Wert hat <code>jahre</code> nach Ende der Schleife?" + pre(`
var kapital: Gleitkommazahl = 1000.0
var jahre: Ganzzahl = 0
solange kapital < 1500.0
  kapital = kapital * 1.10
  jahre = jahre + 1
ende solange`),
      answer: 5, tolerance: 0,
      solution: "Trace: 1000 → 1100 (1) → 1210 (2) → 1331 (3) → 1464,10 (4) → 1610,51 (5). Jetzt ist 1610,51 &lt; 1500 falsch → Abbruch. <b>jahre = 5</b>.",
      explanation: "Hinweis: Bei der <code>solange</code>-Schleife wird die Bedingung <b>vor</b> jedem Durchlauf geprüft. Die Anzahl der Durchläufe ist vorher nicht bekannt – genau dafür ist sie gedacht. Typischer Fehler: nach Jahr 4 aufhören, weil 1464 „fast“ 1500 ist. Würde <code>jahre</code> nicht erhöht oder <code>kapital</code> nicht verändert, entstünde eine Endlosschleife.",
      tags: ["solange", "schreibtischtest"]
    },
    // ---------- Schwer ----------
    {
      id: "lvl-algo-pc-09", topic: "ga2-pseudocode", type: "code", lang: "pseudocode", difficulty: 3, step: 1, points: 10,
      context: "Ein Kinobetreiber speichert die Belegung eines Saals im 2D-Array <code>saal: Array von Array von Wahrheitswert</code>. <code>saal[r][p] == wahr</code> bedeutet: Platz p in Reihe r ist belegt. Alle Reihen haben gleich viele Plätze.",
      question: "a) Entwickeln Sie die Funktion <code>freiProReihe(saal): Array von Ganzzahl</code>, die für jede Reihe die Anzahl freier Plätze liefert. (5 P)<br>b) Entwickeln Sie die Funktion <code>besteReihe(saal): Ganzzahl</code>, die den Index der Reihe mit den meisten freien Plätzen liefert (bei Gleichstand die vordere, also kleinere Reihe). Nutzen Sie a). (5 P)",
      solution: pre(`
funktion freiProReihe(saal: Array von Array von Wahrheitswert): Array von Ganzzahl
  var frei: Array von Ganzzahl = neues Array[laenge(saal)]
  für r von 0 bis laenge(saal) - 1
    frei[r] = 0
    für p von 0 bis laenge(saal[r]) - 1
      wenn NICHT saal[r][p] dann
        frei[r] = frei[r] + 1
      ende wenn
    ende für
  ende für
  rückgabe frei
ende funktion

funktion besteReihe(saal: Array von Array von Wahrheitswert): Ganzzahl
  var frei: Array von Ganzzahl = freiProReihe(saal)
  var beste: Ganzzahl = 0
  für r von 1 bis laenge(frei) - 1
    wenn frei[r] > frei[beste] dann
      beste = r
    ende wenn
  ende für
  rückgabe beste
ende funktion`) + "Java-Variante a):" + pre(`
int[] freiProReihe(boolean[][] saal) {
  int[] frei = new int[saal.length];
  for (int r = 0; r < saal.length; r++)
    for (int p = 0; p < saal[r].length; p++)
      if (!saal[r][p]) frei[r]++;
  return frei;
}`),
      explanation: "Bewertet werden: äußere Schleife über Reihen, innere über Plätze (<code>laenge(saal[r])</code>, nicht <code>laenge(saal)</code>!), Zähler <b>je Reihe</b> zurücksetzen, Maximumsuche über den Index mit strengem <code>&gt;</code> (bei Gleichstand bleibt die vordere Reihe). Typischer Fehler: den Zähler nur einmal vor der äußeren Schleife initialisieren – dann summieren sich die Reihen auf.",
      keywords: ["für|for", "saal[r][p]|saal[i][j]|[r][p]|[i][j]", "nicht|!|== falsch|== false", "frei[r]|frei[i]", "laenge(saal[r])|laenge(saal[i])|.length", "beste|maxindex|index", ">", "rückgabe|return"],
      tags: ["2d-array", "verschachtelt", "maximum"]
    },
    {
      id: "lvl-algo-pc-10", topic: "ga2-pseudocode", type: "numeric", difficulty: 3, step: 2, points: 5,
      question: "Führen Sie einen Schreibtischtest durch. Welchen Wert hat <code>z</code> am Ende?" + pre(`
var z: Ganzzahl = 0
für i von 0 bis 4
  für j von i bis 4
    wenn (i + j) mod 2 == 0 dann
      z = z + i * j
    ende wenn
  ende für
ende für`),
      answer: 41, tolerance: 0,
      solution: "Die innere Schleife startet bei j = i. Berücksichtigt werden Paare mit geradem i + j:<br>i = 0: j = 0, 2, 4 → 0 + 0 + 0 = 0<br>i = 1: j = 1, 3 → 1 + 3 = 4<br>i = 2: j = 2, 4 → 4 + 8 = 12<br>i = 3: j = 3 → 9<br>i = 4: j = 4 → 16<br>Summe: 0 + 4 + 12 + 9 + 16 = <b>41</b>.",
      explanation: "Bei verschachtelten Schleifen hilft eine Tabelle mit einer Zeile pro i. Typische Fehler: Die innere Schleife fälschlich bei 0 starten lassen (dann würden Paare doppelt gezählt) oder Paare mit i = 0 vergessen, die zwar 0 beitragen, aber in der Trace-Tabelle stehen müssen.",
      tags: ["verschachtelt", "schreibtischtest"]
    },
    {
      id: "lvl-algo-pc-11", topic: "ga2-pseudocode", type: "mc", difficulty: 3, step: 3, points: 4,
      context: "Ein Messsystem liefert <b>sortierte</b> Werte mit Duplikaten. Die folgende Funktion entfernt Duplikate in-place und gibt die neue Anzahl gültiger Elemente zurück.",
      question: "Welchen Rückgabewert und welchen Arrayzustand liefert der Aufruf mit <code>a = [2, 2, 3, 3, 3, 5, 8, 8]</code>?" + pre(`
funktion entferneDuplikate(a: Array von Ganzzahl): Ganzzahl
  wenn laenge(a) == 0 dann
    rückgabe 0
  ende wenn
  var k: Ganzzahl = 1
  für i von 1 bis laenge(a) - 1
    wenn a[i] != a[k - 1] dann
      a[k] = a[i]
      k = k + 1
    ende wenn
  ende für
  rückgabe k
ende funktion`),
      options: [
        "Rückgabe 4, a = [2, 3, 5, 8, 3, 5, 8, 8]",
        "Rückgabe 4, a = [2, 3, 5, 8, 0, 0, 0, 0]",
        "Rückgabe 5, a = [2, 3, 5, 8, 8, 5, 8, 8]",
        "Rückgabe 4, a = [2, 3, 5, 8]"
      ],
      correct: [0],
      solution: "k zeigt auf die nächste freie Schreibposition. i = 1 (2 = a[0]) → nichts; i = 2 (3) → a[1] = 3, k = 2; i = 3, 4 (3) → nichts; i = 5 (5) → a[2] = 5, k = 3; i = 6 (8) → a[3] = 8, k = 4; i = 7 (8) → nichts. Rückgabe <b>4</b>. Die Positionen ab Index 4 werden nicht angefasst: <b>[2, 3, 5, 8, 3, 5, 8, 8]</b>.",
      explanation: "Zwei-Zeiger-Technik (Lese- und Schreibindex), O(n) ohne Zusatzspeicher. Das Array behält seine Länge – nur die ersten k Elemente sind gültig (Option D wäre nur mit neuem Array möglich). Typischer Fehler: <code>a[i] != a[i - 1]</code> ist hier zufällig auch korrekt, aber <code>a[k - 1]</code> ist robuster, weil es mit dem zuletzt <i>geschriebenen</i> Wert vergleicht.",
      tags: ["array", "zwei-zeiger", "trace"]
    },
    {
      id: "lvl-algo-pc-12", topic: "ga2-pseudocode", type: "code", lang: "pseudocode", difficulty: 3, step: 4, points: 9,
      context: "Für ein Energiemonitoring soll die <b>längste Serie streng steigender</b> Tagesverbräuche ermittelt werden. Beispiel: [5, 6, 9, 4, 7, 8, 10, 2] → längste Serie 4, 7, 8, 10 → Länge 4. Ein Kollege hat folgenden Code geschrieben, der falsche Ergebnisse liefert bzw. abstürzt:" + pre(`
1  funktion laengsteSerie(v: Array von Ganzzahl): Ganzzahl
2    var laenge: Ganzzahl = 0
3    var beste: Ganzzahl = 0
4    für i von 1 bis laenge(v)
5      wenn v[i] > v[i - 1] dann
6        laenge = laenge + 1
7      sonst
8        laenge = 0
9      ende wenn
10     wenn laenge > beste dann
11       beste = laenge
12     ende wenn
13   ende für
14   rückgabe beste
15 ende funktion`),
      question: "Nennen Sie alle Fehler (mit Zeilennummer) und geben Sie eine korrigierte Fassung an. Ein leeres Array soll 0, ein Array mit einem Element 1 liefern. Hinweis: Auch der Variablenname in Zeile 2 ist problematisch.",
      solution: "<b>Fehler:</b><ul><li>Zeile 2: Eine Serie besteht mindestens aus einem Element → Startwert 1 (nicht 0). Außerdem verdeckt der Name <code>laenge</code> die Funktion <code>laenge(v)</code> → umbenennen in <code>aktuell</code>.</li><li>Zeile 3: <code>beste</code> muss bei nicht leerem Array mit 1 starten (sonst liefert [7] den Wert 0).</li><li>Zeile 4: Off-by-one: <code>bis laenge(v) - 1</code>.</li><li>Zeile 8: Nach einem Abbruch beginnt eine neue Serie mit dem aktuellen Element → 1, nicht 0.</li><li>Fehlende Prüfung auf leeres Array.</li></ul>" + pre(`
funktion laengsteSerie(v: Array von Ganzzahl): Ganzzahl
  wenn laenge(v) == 0 dann
    rückgabe 0
  ende wenn
  var aktuell: Ganzzahl = 1
  var beste: Ganzzahl = 1
  für i von 1 bis laenge(v) - 1
    wenn v[i] > v[i - 1] dann
      aktuell = aktuell + 1
    sonst
      aktuell = 1
    ende wenn
    wenn aktuell > beste dann
      beste = aktuell
    ende wenn
  ende für
  rückgabe beste
ende funktion`) + "Trace für das Beispiel: aktuell = 1, 2, 3, 1, 2, 3, 4, 1 → beste = <b>4</b>.",
      explanation: "Der ursprüngliche Code zählt <i>Übergänge</i> statt <i>Elemente</i> – das Ergebnis wäre immer um 1 zu klein (Initialisierungsfehler). Bei der Fehlersuche systematisch prüfen: Initialisierung, Schleifengrenzen, Rücksetzwert, Sonderfälle (leer, ein Element), Namenskonflikte.",
      keywords: ["laenge(v) - 1|laenge(v)-1|length - 1|length-1", "aktuell|serie|zaehler|count", "= 1|=1", "beste|max", "laenge(v) == 0|leer|length == 0", "v[i - 1]|v[i-1]", "sonst|else", "zeile 4", "zeile 8"],
      tags: ["fehlersuche", "array", "off-by-one"]
    },
    {
      id: "lvl-algo-pc-13", topic: "ga2-pseudocode", type: "code", lang: "pseudocode", difficulty: 3, step: 5, points: 8,
      context: "Ein Logistikunternehmen komprimiert Scannerdaten mit der <b>Lauflängenkodierung</b> (Run-Length-Encoding): Aufeinanderfolgende gleiche Zeichen werden durch Anzahl + Zeichen ersetzt. Beispiel: <code>\"AAABCCDDDD\"</code> → <code>\"3A1B2C4D\"</code>.",
      question: "Entwickeln Sie die Funktion <code>rle(s: Text): Text</code>. Verfügbar sind <code>laenge(s)</code>, <code>zeichenAn(s, i)</code> und die Verkettung mit <code>+</code> (Ganzzahl + Text ergibt Text). Für den leeren Text ist <code>\"\"</code> zu liefern.",
      starter: "funktion rle(s: Text): Text\n  // Ihr Code\nende funktion",
      solution: pre(`
funktion rle(s: Text): Text
  wenn laenge(s) == 0 dann
    rückgabe ""
  ende wenn
  var ergebnis: Text = ""
  var zeichen: Zeichen = zeichenAn(s, 0)
  var anzahl: Ganzzahl = 1
  für i von 1 bis laenge(s) - 1
    wenn zeichenAn(s, i) == zeichen dann
      anzahl = anzahl + 1
    sonst
      ergebnis = ergebnis + anzahl + zeichen
      zeichen = zeichenAn(s, i)
      anzahl = 1
    ende wenn
  ende für
  ergebnis = ergebnis + anzahl + zeichen     // letzte Gruppe!
  rückgabe ergebnis
ende funktion`),
      explanation: "Der häufigste Fehler ist, die <b>letzte Gruppe</b> nach der Schleife nicht mehr anzuhängen (\"AAABCCDDDD\" → \"3A1B2C\"). Weitere Fehler: <code>anzahl</code> beim Gruppenwechsel auf 0 statt 1 setzen, leeren Text nicht abfangen (zeichenAn(s, 0) schlägt fehl). Laufzeit O(n).",
      keywords: ["zeichenan|charat", "anzahl|count|zaehler", "für|for|solange|while", "==", "sonst|else", "anzahl = 1|anzahl=1", "ergebnis +|ergebnis+|+=", "laenge(s) == 0|laenge(s)==0|leer", "rückgabe|return"],
      tags: ["string", "kompression"]
    },
    {
      id: "lvl-algo-pc-14", topic: "ga2-pseudocode", type: "code", lang: "pseudocode", difficulty: 3, step: 6, points: 10,
      context: "Für eine Lern-App wird ein Tic-Tac-Toe-Spiel auf einem <b>n × n</b>-Feld entwickelt. Das Feld ist ein 2D-Array <code>feld: Array von Array von Zeichen</code> mit den Werten <code>'X'</code>, <code>'O'</code> oder <code>' '</code> (leer). Gewonnen hat ein Spieler, wenn er eine komplette Zeile, Spalte oder eine der beiden Diagonalen belegt.",
      question: "Entwickeln Sie die Funktion <code>hatGewonnen(feld, spieler: Zeichen): Wahrheitswert</code>.",
      starter: "funktion hatGewonnen(feld: Array von Array von Zeichen, spieler: Zeichen): Wahrheitswert\n  var n: Ganzzahl = laenge(feld)\n  // Ihr Code\nende funktion",
      solution: pre(`
funktion hatGewonnen(feld: Array von Array von Zeichen, spieler: Zeichen): Wahrheitswert
  var n: Ganzzahl = laenge(feld)
  var diag1: Wahrheitswert = wahr
  var diag2: Wahrheitswert = wahr
  für i von 0 bis n - 1
    var zeileVoll: Wahrheitswert = wahr
    var spalteVoll: Wahrheitswert = wahr
    für j von 0 bis n - 1
      wenn feld[i][j] != spieler dann
        zeileVoll = falsch
      ende wenn
      wenn feld[j][i] != spieler dann
        spalteVoll = falsch
      ende wenn
    ende für
    wenn zeileVoll ODER spalteVoll dann
      rückgabe wahr
    ende wenn
    wenn feld[i][i] != spieler dann
      diag1 = falsch
    ende wenn
    wenn feld[i][n - 1 - i] != spieler dann
      diag2 = falsch
    ende wenn
  ende für
  rückgabe diag1 ODER diag2
ende funktion`),
      explanation: "Kernideen: Zeile i = <code>feld[i][j]</code>, Spalte i = <code>feld[j][i]</code> (Indizes vertauscht), Hauptdiagonale <code>feld[i][i]</code>, Gegendiagonale <code>feld[i][n - 1 - i]</code>. Die Flags müssen <b>pro Zeile/Spalte</b> neu mit wahr initialisiert werden. Typischer Fehler: <code>rückgabe falsch</code> schon nach der ersten nicht vollen Zeile (bricht zu früh ab) oder Gegendiagonale mit <code>n - i</code> (Off-by-one). Laufzeit O(n²) – optimal, da jedes Feld betrachtet werden muss.",
      keywords: ["für|for", "feld[i][j]", "feld[j][i]", "feld[i][i]", "n - 1 - i|n-1-i|n - i - 1|n-i-1", "!= spieler|!=spieler|== spieler|==spieler", "wahr|true", "falsch|false", "oder|or", "rückgabe|return"],
      tags: ["2d-array", "verschachtelt", "spiel"]
    },
    {
      id: "lvl-algo-pc-15", topic: "ga2-pseudocode", type: "numeric", difficulty: 3, step: 7, points: 5,
      context: "Das <b>Sieb des Eratosthenes</b> ermittelt alle Primzahlen bis n. Es soll für n = 30 von Hand nachvollzogen werden.",
      question: "Wie oft wird die Zeile <code>istPrim[j] = falsch</code> für <b>n = 30</b> insgesamt ausgeführt (auch wenn der Eintrag bereits falsch war)?" + pre(`
prozedur sieb(n: Ganzzahl)
  var istPrim: Array von Wahrheitswert = neues Array[n + 1]
  für k von 2 bis n
    istPrim[k] = wahr
  ende für
  var i: Ganzzahl = 2
  solange i * i <= n
    wenn istPrim[i] dann
      var j: Ganzzahl = i * i
      solange j <= n
        istPrim[j] = falsch
        j = j + i
      ende solange
    ende wenn
    i = i + 1
  ende solange
ende prozedur`),
      answer: 24, tolerance: 0,
      solution: "Die äußere Schleife läuft für i = 2, 3, 4, 5 (6 · 6 = 36 &gt; 30).<br>i = 2 (prim): j = 4, 6, 8, …, 30 → 14 Zuweisungen<br>i = 3 (prim): j = 9, 12, 15, 18, 21, 24, 27, 30 → 8 Zuweisungen<br>i = 4: istPrim[4] ist falsch → keine<br>i = 5 (prim): j = 25, 30 → 2 Zuweisungen<br>Summe: 14 + 8 + 2 = <b>24</b>. (Übrig bleiben die 10 Primzahlen 2, 3, 5, 7, 11, 13, 17, 19, 23, 29.)",
      explanation: "Feinheiten: Das Streichen beginnt erst bei i · i, weil kleinere Vielfache schon von kleineren Primzahlen gestrichen wurden; die äußere Schleife endet bei √n. Doppelt gestrichene Zahlen (z. B. 12, 18, 24, 30) werden mehrfach gezählt. Laufzeit O(n log log n).",
      tags: ["verschachtelt", "schreibtischtest", "primzahlen"]
    }
  );

  // ===================== ga2-sortieren-suchen =====================
  add(
    // ---------- Leicht ----------
    {
      id: "lvl-algo-sort-01", topic: "ga2-sortieren-suchen", type: "numeric", difficulty: 1, step: 1, points: 2,
      context: "In einer Ersatzteil-Datenbank werden Artikelnummern unsortiert im Array <code>[17, 8, 42, 3, 99]</code> gehalten. Die <b>lineare Suche</b> vergleicht von vorn nach hinten jedes Element mit dem Suchwert.",
      question: "Wie viele Vergleiche benötigt die lineare Suche, bis der Wert <b>42</b> gefunden ist?",
      answer: 3, tolerance: 0,
      solution: "17 ≠ 42 (1), 8 ≠ 42 (2), 42 = 42 (3) → <b>3 Vergleiche</b>, gefunden an Index 2.",
      explanation: "Hinweis: Index und Anzahl Vergleiche nicht verwechseln – der Wert steht an Index 2, es sind aber 3 Vergleiche. Wird ein Wert gar nicht gefunden, sind es n = 5 Vergleiche (Worst Case).",
      tags: ["lineare suche"]
    },
    {
      id: "lvl-algo-sort-02", topic: "ga2-sortieren-suchen", type: "code", lang: "pseudocode", difficulty: 1, step: 2, points: 3,
      context: "Für die Ersatzteil-Datenbank soll die lineare Suche als Funktion umgesetzt werden. Sie liefert den <b>Index</b> des ersten Treffers oder <code>-1</code>, wenn der Wert nicht enthalten ist.",
      question: "Ergänzen Sie die fehlenden Zeilen der Funktion <code>suche</code>.",
      starter: "funktion suche(a: Array von Ganzzahl, gesucht: Ganzzahl): Ganzzahl\n  für i von 0 bis laenge(a) - 1\n    // TODO: Treffer prüfen und Index zurückgeben\n\n  ende für\n  // TODO: Rückgabe, wenn nichts gefunden\nende funktion",
      solution: pre(`
funktion suche(a: Array von Ganzzahl, gesucht: Ganzzahl): Ganzzahl
  für i von 0 bis laenge(a) - 1
    wenn a[i] == gesucht dann
      rückgabe i
    ende wenn
  ende für
  rückgabe -1
ende funktion`),
      explanation: "Hinweis: <code>rückgabe -1</code> gehört <b>hinter</b> die Schleife – erst wenn alle Elemente geprüft sind, steht fest, dass der Wert fehlt. Typischer Fehler: ein <code>sonst rückgabe -1</code> in der Schleife; dann wird nur das erste Element geprüft. Außerdem: <code>rückgabe i</code> (Index), nicht <code>a[i]</code> (Wert).",
      keywords: ["wenn|if", "a[i] == gesucht|a[i]==gesucht", "rückgabe i|return i", "rückgabe -1|return -1|-1", "ende für|}"],
      tags: ["lineare suche"]
    },
    {
      id: "lvl-algo-sort-03", topic: "ga2-sortieren-suchen", type: "mc", difficulty: 1, step: 3, points: 2,
      context: "Fast jedes Sortierverfahren muss zwei Array-Elemente <code>a[i]</code> und <code>a[j]</code> vertauschen.",
      question: "Welche Anweisungsfolge vertauscht die beiden Werte korrekt?",
      options: [
        c("a[i] = a[j]") + "<br>" + c("a[j] = a[i]"),
        c("temp = a[i]") + "<br>" + c("a[i] = a[j]") + "<br>" + c("a[j] = temp"),
        c("temp = a[i]") + "<br>" + c("a[j] = temp") + "<br>" + c("a[i] = a[j]"),
        c("temp = a[j]") + "<br>" + c("a[i] = temp") + "<br>" + c("a[j] = a[i]")
      ],
      correct: [1],
      solution: "Der alte Wert von <code>a[i]</code> wird in <code>temp</code> gesichert, dann wird <code>a[i]</code> überschrieben und schließlich der gesicherte Wert nach <code>a[j]</code> geschrieben.",
      explanation: "Hinweis: Ohne Hilfsvariable geht ein Wert verloren (A: beide Positionen enthalten danach den alten a[j]). C und D überschreiben zuerst die Position, deren Wert noch gebraucht wird. Spielen Sie es mit a[i] = 4, a[j] = 9 durch.",
      tags: ["tauschen", "grundlagen"]
    },
    {
      id: "lvl-algo-sort-04", topic: "ga2-sortieren-suchen", type: "numeric", difficulty: 1, step: 4, points: 2,
      question: "Bei Bubble Sort werden in einem Durchlauf von links nach rechts jeweils benachbarte Elemente verglichen und getauscht, wenn das linke größer ist. Wie viele <b>Vertauschungen</b> finden im <b>ersten Durchlauf</b> für <code>[5, 1, 4, 2, 8]</code> statt?",
      answer: 3, tolerance: 0,
      solution: "5 &gt; 1 → tauschen [1, 5, 4, 2, 8]; 5 &gt; 4 → tauschen [1, 4, 5, 2, 8]; 5 &gt; 2 → tauschen [1, 4, 2, 5, 8]; 5 &lt; 8 → kein Tausch. <b>3 Vertauschungen</b>, Zustand danach [1, 4, 2, 5, 8].",
      explanation: "Hinweis: Nach dem Tausch wandert das größere Element mit – im nächsten Vergleich wird es wieder betrachtet (die 5 „blubbert“ nach rechts). Es gibt 4 Vergleiche (n − 1), aber nur 3 Tausche.",
      tags: ["bubblesort", "durchlauf"]
    },
    {
      id: "lvl-algo-sort-05", topic: "ga2-sortieren-suchen", type: "mc", difficulty: 1, step: 5, points: 2,
      question: "Das Array <code>[6, 2, 9, 4, 1]</code> wird mit Bubble Sort aufsteigend sortiert. Welchen Zustand hat es <b>nach dem ersten Durchlauf</b>?",
      options: ["[2, 6, 4, 1, 9]", "[1, 2, 4, 6, 9]", "[2, 6, 9, 4, 1]", "[1, 6, 2, 9, 4]"],
      correct: [0],
      solution: "6↔2 → [2, 6, 9, 4, 1]; 6 &lt; 9; 9↔4 → [2, 6, 4, 9, 1]; 9↔1 → [2, 6, 4, 1, 9]. Ergebnis: <b>[2, 6, 4, 1, 9]</b> – das größte Element 9 steht am Ende.",
      explanation: "Merksatz: Nach dem k-ten Bubble-Sort-Durchlauf stehen die k größten Elemente endgültig rechts. Option B ist das Endergebnis, C der Zustand nach nur einem Vergleich, D entspricht keinem Verfahren.",
      tags: ["bubblesort", "durchlauf"]
    },
    {
      id: "lvl-algo-sort-06", topic: "ga2-sortieren-suchen", type: "mc", difficulty: 1, step: 6, points: 2,
      question: "Das Array <code>[29, 10, 14, 37, 13]</code> wird mit <b>Selection Sort</b> aufsteigend sortiert (Minimum des unsortierten Teils suchen und mit dem ersten unsortierten Element tauschen). Welchen Zustand hat es nach dem <b>ersten</b> Durchlauf?",
      options: ["[10, 29, 14, 37, 13]", "[10, 14, 29, 37, 13]", "[10, 29, 14, 13, 37]", "[13, 10, 14, 37, 29]"],
      correct: [0],
      solution: "Minimum des gesamten Arrays ist 10 (Index 1). Es wird mit dem ersten Element 29 getauscht: <b>[10, 29, 14, 37, 13]</b>. Alle anderen Elemente bleiben an ihrer Position.",
      explanation: "Hinweis: Selection Sort tauscht pro Durchlauf <b>genau einmal</b> (Minimum ↔ erste unsortierte Position). Option B sieht nach Insertion Sort aus, C nach einem Bubble-Sort-Schritt.",
      tags: ["selectionsort", "durchlauf"]
    },
    {
      id: "lvl-algo-sort-07", topic: "ga2-sortieren-suchen", type: "order", difficulty: 1, step: 7, points: 3,
      context: "Im sortierten Array <code>[2, 5, 8, 12, 16, 23, 38, 56, 72, 91]</code> (Indizes 0–9) wird mit der <b>binären Suche</b> der Wert 23 gesucht. Mitte: <code>m = (links + rechts) div 2</code>.",
      question: "Bringen Sie die Schritte der binären Suche in die richtige Reihenfolge.",
      items: [
        "links = 0, rechts = 9",
        "m = 4 → a[4] = 16 < 23 → links = 5",
        "m = 7 → a[7] = 56 > 23 → rechts = 6",
        "m = 5 → a[5] = 23 → gefunden, Rückgabe 5"
      ].map(esc),
      solution: "(0 + 9) div 2 = 4 → 16 ist zu klein, rechts weitersuchen (links = 5). (5 + 9) div 2 = 7 → 56 ist zu groß (rechts = 6). (5 + 6) div 2 = 5 → Treffer nach <b>3 Vergleichen</b>.",
      explanation: "Hinweis: <code>div</code> ist die Ganzzahldivision (Nachkommastellen abschneiden). Bei jedem Schritt halbiert sich der Suchbereich – deshalb reichen für 10 Elemente höchstens 4 Vergleiche. Voraussetzung: Das Array ist sortiert.",
      tags: ["binaere suche"]
    },
    {
      id: "lvl-algo-sort-08", topic: "ga2-sortieren-suchen", type: "code", lang: "pseudocode", difficulty: 1, step: 8, points: 3,
      context: "Bevor die binäre Suche eingesetzt wird, soll geprüft werden, ob ein Array aufsteigend sortiert ist (gleiche Nachbarn sind erlaubt).",
      question: "Ergänzen Sie in der Funktion <code>istSortiert</code> die fehlende Bedingung und die Rückgabe innerhalb der Schleife.",
      starter: "funktion istSortiert(a: Array von Ganzzahl): Wahrheitswert\n  für i von 0 bis laenge(a) - 2\n    // TODO: Nachbarn vergleichen\n\n  ende für\n  rückgabe wahr\nende funktion",
      solution: pre(`
funktion istSortiert(a: Array von Ganzzahl): Wahrheitswert
  für i von 0 bis laenge(a) - 2
    wenn a[i] > a[i + 1] dann
      rückgabe falsch
    ende wenn
  ende für
  rückgabe wahr
ende funktion`),
      explanation: "Hinweis: Weil <code>a[i + 1]</code> gelesen wird, darf i nur bis <code>laenge(a) - 2</code> laufen – sonst Zugriff außerhalb des Arrays. Sobald ein Paar falsch herum steht, kann sofort <code>falsch</code> geliefert werden. <code>&gt;=</code> wäre falsch, weil gleiche Nachbarn erlaubt sind.",
      keywords: ["wenn|if", "a[i] > a[i + 1]|a[i]>a[i+1]|a[i + 1] < a[i]|a[i+1]<a[i]", "rückgabe falsch|return false", "falsch|false"],
      tags: ["sortiert", "grundlagen"]
    },
    // ---------- Schwer ----------
    {
      id: "lvl-algo-sort-09", topic: "ga2-sortieren-suchen", type: "mc", difficulty: 3, step: 1, points: 4,
      context: "Quick Sort mit <b>Lomuto-Partitionierung</b>: Pivot ist das <b>letzte</b> Element. Ein Index i markiert das Ende des Bereichs „≤ Pivot“; jedes Element a[j] ≤ Pivot wird nach vorn getauscht, am Ende kommt das Pivot an Position i + 1." + pre(`
funktion partition(a: Array von Ganzzahl, lo: Ganzzahl, hi: Ganzzahl): Ganzzahl
  var pivot: Ganzzahl = a[hi]
  var i: Ganzzahl = lo - 1
  für j von lo bis hi - 1
    wenn a[j] <= pivot dann
      i = i + 1
      tausche(a, i, j)
    ende wenn
  ende für
  tausche(a, i + 1, hi)
  rückgabe i + 1
ende funktion`),
      question: "Welchen Zustand hat das Array <code>[7, 2, 9, 4, 3, 8, 5]</code> nach dem Aufruf <code>partition(a, 0, 6)</code>, und welcher Index wird zurückgegeben?",
      options: [
        "[2, 4, 3, 5, 9, 8, 7], Rückgabe 3",
        "[2, 4, 3, 5, 7, 9, 8], Rückgabe 3",
        "[2, 3, 4, 5, 7, 8, 9], Rückgabe 3",
        "[4, 2, 3, 5, 9, 8, 7], Rückgabe 4"
      ],
      correct: [0],
      solution: "Pivot = 5, i = −1.<br>j = 0: 7 &gt; 5 → nichts<br>j = 1: 2 ≤ 5 → i = 0, tausche a[0]↔a[1] → [2, 7, 9, 4, 3, 8, 5]<br>j = 2: 9 → nichts<br>j = 3: 4 ≤ 5 → i = 1, tausche a[1]↔a[3] → [2, 4, 9, 7, 3, 8, 5]<br>j = 4: 3 ≤ 5 → i = 2, tausche a[2]↔a[4] → [2, 4, 3, 7, 9, 8, 5]<br>j = 5: 8 → nichts<br>Pivot tauschen a[3]↔a[6] → <b>[2, 4, 3, 5, 9, 8, 7]</b>, Rückgabe <b>3</b>.",
      explanation: "Nach der Partitionierung steht das Pivot an seiner <b>endgültigen</b> Position; links nur kleinere, rechts nur größere Elemente – aber beide Teile sind noch <b>unsortiert</b> (Option C ist bereits das Endergebnis). Anschließend wird rekursiv <code>quickSort(a, 0, 2)</code> und <code>quickSort(a, 4, 6)</code> aufgerufen.",
      tags: ["quicksort", "partition", "trace"]
    },
    {
      id: "lvl-algo-sort-10", topic: "ga2-sortieren-suchen", type: "order", difficulty: 3, step: 2, points: 5,
      context: "Das Array <code>[38, 27, 43, 3, 9, 82, 10]</code> wird mit <b>Merge Sort</b> (top-down) sortiert. Bei ungerader Länge erhält die <b>linke</b> Hälfte das zusätzliche Element (<code>mitte = (lo + hi) div 2</code>, links lo..mitte). Zuerst wird immer die linke Hälfte vollständig bearbeitet.",
      question: "Bringen Sie die Ergebnisse der <b>Merge-Schritte</b> in die Reihenfolge, in der sie entstehen.",
      items: ["[27, 38]", "[3, 43]", "[3, 27, 38, 43]", "[9, 82]", "[9, 10, 82]", "[3, 9, 10, 27, 38, 43, 82]"],
      solution: "Teilen: [38, 27, 43, 3] | [9, 82, 10] → [38, 27] | [43, 3] und [9, 82] | [10].<br>Mischen (Reihenfolge der Rekursion): [38]+[27] → <b>[27, 38]</b>; [43]+[3] → <b>[3, 43]</b>; → <b>[3, 27, 38, 43]</b>; [9]+[82] → <b>[9, 82]</b>; +[10] → <b>[9, 10, 82]</b>; final → <b>[3, 9, 10, 27, 38, 43, 82]</b>.",
      explanation: "Merge Sort arbeitet wie eine Tiefensuche: Die rechte Hälfte wird erst angefasst, wenn die linke komplett gemischt ist. Beim Mischen werden jeweils die vordersten Elemente beider Teillisten verglichen. Laufzeit immer O(n log n), Zusatzspeicher O(n).",
      tags: ["mergesort", "rekursion"]
    },
    {
      id: "lvl-algo-sort-11", topic: "ga2-sortieren-suchen", type: "code", lang: "pseudocode", difficulty: 3, step: 3, points: 10,
      context: "Ein Ticketsystem soll bis zu 100.000 Anfragen nach Priorität sortieren. Weil Bubble Sort zu langsam ist, wird Quick Sort eingesetzt. Gegeben ist die Hilfsprozedur <code>tausche(a, i, j)</code>.",
      question: "a) Entwickeln Sie die Funktion <code>partition(a, lo, hi): Ganzzahl</code> (Pivot = letztes Element, Rückgabe = Endposition des Pivots). (6 P)<br>b) Entwickeln Sie die rekursive Prozedur <code>quickSort(a, lo, hi)</code>. (4 P)",
      starter: "funktion partition(a: Array von Ganzzahl, lo: Ganzzahl, hi: Ganzzahl): Ganzzahl\n  // Ihr Code\nende funktion\n\nprozedur quickSort(a: Array von Ganzzahl, lo: Ganzzahl, hi: Ganzzahl)\n  // Ihr Code\nende prozedur",
      solution: pre(`
funktion partition(a: Array von Ganzzahl, lo: Ganzzahl, hi: Ganzzahl): Ganzzahl
  var pivot: Ganzzahl = a[hi]
  var i: Ganzzahl = lo - 1
  für j von lo bis hi - 1
    wenn a[j] <= pivot dann
      i = i + 1
      tausche(a, i, j)
    ende wenn
  ende für
  tausche(a, i + 1, hi)
  rückgabe i + 1
ende funktion

prozedur quickSort(a: Array von Ganzzahl, lo: Ganzzahl, hi: Ganzzahl)
  wenn lo < hi dann                      // Anker: 0 oder 1 Element
    var p: Ganzzahl = partition(a, lo, hi)
    quickSort(a, lo, p - 1)
    quickSort(a, p + 1, hi)
  ende wenn
ende prozedur

// Aufruf: quickSort(a, 0, laenge(a) - 1)`) + "Java:" + pre(`
static void quickSort(int[] a, int lo, int hi) {
  if (lo < hi) {
    int p = partition(a, lo, hi);
    quickSort(a, lo, p - 1);
    quickSort(a, p + 1, hi);
  }
}`),
      explanation: "Bewertet werden: korrekte Partitionierung (i startet bei lo − 1, Schleife bis hi − 1, Pivot am Ende auf i + 1), Rekursionsanker <code>lo &lt; hi</code>, Rekursion <b>ohne</b> das Pivot (p − 1 bzw. p + 1). Typischer Fehler: <code>quickSort(a, lo, p)</code> – das Pivot wird erneut einbezogen, was zu unendlicher Rekursion führen kann. Laufzeit Average O(n log n), Worst O(n²) bei vorsortierten Daten mit diesem Pivot (Abhilfe: Median-of-three oder zufälliges Pivot).",
      keywords: ["pivot", "a[hi]", "lo - 1|lo-1", "<=", "tausche|swap", "i + 1|i+1", "lo < hi|lo<hi", "p - 1|p-1", "p + 1|p+1", "quicksort("],
      tags: ["quicksort", "rekursion", "implementieren"]
    },
    {
      id: "lvl-algo-sort-12", topic: "ga2-sortieren-suchen", type: "numeric", difficulty: 3, step: 4, points: 5,
      context: pre(`
prozedur insertionSort(a: Array von Ganzzahl)
  für i von 1 bis laenge(a) - 1
    var key: Ganzzahl = a[i]
    var j: Ganzzahl = i - 1
    solange j >= 0 UND a[j] > key      // Vergleich a[j] > key zählen
      a[j + 1] = a[j]
      j = j - 1
    ende solange
    a[j + 1] = key
  ende für
ende prozedur`) + "Gezählt wird jede Auswertung von <code>a[j] &gt; key</code>. Ist <code>j &gt;= 0</code> falsch, wird <code>a[j] &gt; key</code> wegen Kurzschlussauswertung <b>nicht</b> ausgewertet.",
      question: "Wie viele Vergleiche <code>a[j] &gt; key</code> werden beim Sortieren von <code>[5, 2, 4, 6, 1, 3]</code> ausgeführt?",
      answer: 12, tolerance: 0,
      solution: "i = 1 (key 2): 5 &gt; 2 ja, dann j = −1 → <b>1</b> → [2, 5, 4, 6, 1, 3]<br>i = 2 (key 4): 5 &gt; 4 ja, 2 &gt; 4 nein → <b>2</b> → [2, 4, 5, 6, 1, 3]<br>i = 3 (key 6): 5 &gt; 6 nein → <b>1</b><br>i = 4 (key 1): 6, 5, 4, 2 &gt; 1 ja, dann j = −1 → <b>4</b> → [1, 2, 4, 5, 6, 3]<br>i = 5 (key 3): 6, 5, 4 &gt; 3 ja, 2 &gt; 3 nein → <b>4</b> → [1, 2, 3, 4, 5, 6]<br>Summe: 1 + 2 + 1 + 4 + 4 = <b>12</b> (davon 9 Verschiebungen = Anzahl der Inversionen).",
      explanation: "Faustregel: Vergleiche = Verschiebungen + Anzahl der Durchläufe, in denen die Schleife durch <code>a[j] &gt; key</code> = falsch (und nicht durch j &lt; 0) endet. Ohne Kurzschlussauswertung würde <code>a[-1]</code> gelesen – deshalb muss <code>j &gt;= 0</code> <b>zuerst</b> stehen.",
      tags: ["insertionsort", "vergleiche", "trace"]
    },
    {
      id: "lvl-algo-sort-13", topic: "ga2-sortieren-suchen", type: "code", lang: "pseudocode", difficulty: 3, step: 5, points: 8,
      context: "In einem Kundenportal hängt sich die Suche nach Kundennummern manchmal auf, manchmal stürzt sie ab. Das Array <code>kunden</code> ist aufsteigend sortiert." + pre(`
1  funktion binaerSuche(kunden: Array von Ganzzahl, nr: Ganzzahl): Ganzzahl
2    var links: Ganzzahl = 0
3    var rechts: Ganzzahl = laenge(kunden)
4    solange links < rechts
5      var m: Ganzzahl = (links + rechts) / 2
6      wenn kunden[m] == nr dann
7        rückgabe m
8      sonst wenn nr < kunden[m] dann
9        rechts = m
10     sonst
11       links = m
12     ende wenn
13   ende solange
14   rückgabe -1
15 ende funktion`),
      question: "Analysieren Sie den Code. Nennen Sie die Fehler mit Zeilennummer, beschreiben Sie jeweils die Auswirkung und geben Sie eine korrigierte Fassung an (Variante mit geschlossenem Intervall [links, rechts]).",
      solution: "<ul><li>Zeile 3: <code>rechts = laenge(kunden)</code> → Index außerhalb (z. B. bei Suche nach einer sehr großen Nummer). Korrekt: <code>laenge(kunden) - 1</code>.</li><li>Zeile 4: Bei geschlossenem Intervall muss <code>links &lt;= rechts</code> gelten, sonst wird das letzte verbleibende Element nicht geprüft.</li><li>Zeile 5: <code>/</code> kann eine Gleitkommazahl liefern → <code>div</code> (Ganzzahldivision).</li><li>Zeile 9: <code>rechts = m - 1</code>, da m schon geprüft ist.</li><li>Zeile 11: <code>links = m</code> → <b>Endlosschleife</b>, wenn links + 1 == rechts (m bleibt gleich). Korrekt: <code>links = m + 1</code>.</li></ul>" + pre(`
funktion binaerSuche(kunden: Array von Ganzzahl, nr: Ganzzahl): Ganzzahl
  var links: Ganzzahl = 0
  var rechts: Ganzzahl = laenge(kunden) - 1
  solange links <= rechts
    var m: Ganzzahl = (links + rechts) div 2
    wenn kunden[m] == nr dann
      rückgabe m
    sonst wenn nr < kunden[m] dann
      rechts = m - 1
    sonst
      links = m + 1
    ende wenn
  ende solange
  rückgabe -1
ende funktion`),
      explanation: "Die Grenzen müssen <b>zueinander passen</b>: Entweder geschlossenes Intervall (rechts = n − 1, <code>&lt;=</code>, m ± 1) oder halboffenes Intervall (rechts = n, <code>&lt;</code>, rechts = m, links = m + 1). Gemischte Varianten führen zu Endlosschleifen oder Indexfehlern. Test: leeres Array, ein Element, Wert kleiner als alle, größer als alle.",
      keywords: ["laenge(kunden) - 1|laenge(kunden)-1|length - 1", "<=", "div", "m - 1|m-1", "m + 1|m+1", "endlosschleife|endlos", "zeile 11", "zeile 3", "rückgabe -1|return -1"],
      tags: ["binaere suche", "fehlersuche"]
    },
    {
      id: "lvl-algo-sort-14", topic: "ga2-sortieren-suchen", type: "code", lang: "pseudocode", difficulty: 3, step: 6, points: 10,
      context: "Ein Bewerbermanagement-System speichert Bewerber als Objekte der Klasse <code>Bewerber</code> mit den Methoden <code>getPunkte(): Ganzzahl</code> und <code>getName(): Text</code>. Für die Rangliste soll nach <b>Punkten absteigend</b> und bei Punktgleichstand nach <b>Name alphabetisch aufsteigend</b> sortiert werden. Zum Textvergleich gibt es <code>a.vergleiche(b)</code> (negativ, wenn a alphabetisch vor b liegt; 0 bei Gleichheit).",
      question: "a) Entwickeln Sie die Funktion <code>kommtVor(x: Bewerber, y: Bewerber): Wahrheitswert</code>, die wahr liefert, wenn x in der Rangliste <b>vor</b> y stehen muss. (4 P)<br>b) Entwickeln Sie die Prozedur <code>rangliste(b: Array von Bewerber)</code>, die das Array mit <b>Insertion Sort</b> unter Verwendung von a) sortiert. (6 P)",
      solution: pre(`
funktion kommtVor(x: Bewerber, y: Bewerber): Wahrheitswert
  wenn x.getPunkte() != y.getPunkte() dann
    rückgabe x.getPunkte() > y.getPunkte()        // absteigend
  ende wenn
  rückgabe x.getName().vergleiche(y.getName()) < 0  // aufsteigend
ende funktion

prozedur rangliste(b: Array von Bewerber)
  für i von 1 bis laenge(b) - 1
    var akt: Bewerber = b[i]
    var j: Ganzzahl = i - 1
    solange j >= 0 UND kommtVor(akt, b[j])
      b[j + 1] = b[j]
      j = j - 1
    ende solange
    b[j + 1] = akt
  ende für
ende prozedur`),
      explanation: "Das zweistufige Kriterium wird in <b>einer</b> Vergleichsfunktion gekapselt – so bleibt der Sortieralgorithmus unverändert (wie <code>Comparator</code> in Java). Weil <code>kommtVor</code> bei völliger Gleichheit falsch liefert, bleibt Insertion Sort <b>stabil</b>. Alternative: zuerst nach Name, dann <b>stabil</b> nach Punkten sortieren. Typische Fehler: Punkte aufsteigend statt absteigend, Strings mit <code>&lt;</code> statt Vergleichsmethode, <code>j &gt;= 0</code> nach dem Arrayzugriff prüfen.",
      keywords: ["getpunkte", "getname", "vergleiche|compareto", ">", "< 0|<0", "für|for", "solange|while", "j >= 0|j>=0", "b[j + 1]|b[j+1]", "kommtvor("],
      tags: ["insertionsort", "mehrere kriterien", "stabil", "objekte"]
    }
  );

  // ===================== ga2-rekursion =====================
  add(
    // ---------- Leicht ----------
    {
      id: "lvl-algo-rek-01", topic: "ga2-rekursion", type: "mc", difficulty: 1, step: 1, points: 2,
      question: "Welche Zeile enthält den <b>Rekursionsanker</b>?" + pre(`
1  funktion summe(n: Ganzzahl): Ganzzahl
2    wenn n == 0 dann
3      rückgabe 0
4    ende wenn
5    rückgabe n + summe(n - 1)
6  ende funktion`),
      options: ["Zeile 1", "Zeilen 2–3", "Zeile 5", "Es gibt keinen Rekursionsanker"],
      correct: [1],
      solution: "Zeilen 2–3: Für <code>n == 0</code> wird das Ergebnis direkt (ohne weiteren Aufruf) geliefert. Zeile 5 ist der <b>Rekursionsschritt</b>.",
      explanation: "Hinweis: Jede rekursive Funktion braucht (1) einen Anker, der ohne Selbstaufruf endet, und (2) einen Schritt, der das Problem verkleinert (hier n − 1) und so den Anker sicher erreicht.",
      tags: ["anker", "grundlagen"]
    },
    {
      id: "lvl-algo-rek-02", topic: "ga2-rekursion", type: "numeric", difficulty: 1, step: 2, points: 2,
      context: pre(`
funktion summe(n: Ganzzahl): Ganzzahl
  wenn n == 0 dann
    rückgabe 0
  ende wenn
  rückgabe n + summe(n - 1)
ende funktion`),
      question: "Welchen Wert liefert <code>summe(4)</code>?",
      answer: 10, tolerance: 0,
      solution: "summe(4) = 4 + summe(3) = 4 + 3 + summe(2) = 4 + 3 + 2 + summe(1) = 4 + 3 + 2 + 1 + summe(0) = 4 + 3 + 2 + 1 + 0 = <b>10</b>.",
      explanation: "Hinweis: Schreiben Sie die Aufrufe untereinander („Abstieg“) und setzen Sie die Ergebnisse von unten nach oben ein („Aufstieg“). Die Additionen werden erst ausgeführt, wenn der Anker erreicht ist.",
      tags: ["trace", "grundlagen"]
    },
    {
      id: "lvl-algo-rek-03", topic: "ga2-rekursion", type: "numeric", difficulty: 1, step: 3, points: 2,
      question: "Wie viele Aufrufe der Funktion <code>summe</code> aus der vorherigen Aufgabe gibt es beim Aufruf <code>summe(4)</code> insgesamt (einschließlich des ersten Aufrufs)?" + pre(`
funktion summe(n: Ganzzahl): Ganzzahl
  wenn n == 0 dann
    rückgabe 0
  ende wenn
  rückgabe n + summe(n - 1)
ende funktion`),
      answer: 5, tolerance: 0,
      solution: "summe(4), summe(3), summe(2), summe(1), summe(0) → <b>5 Aufrufe</b>. Gleichzeitig liegen maximal 5 Aufrufe auf dem Stack (Rekursionstiefe 5).",
      explanation: "Hinweis: Der Anker-Aufruf summe(0) zählt mit – typischer Fehler: 4 angeben. Allgemein: summe(n) erzeugt n + 1 Aufrufe; bei sehr großem n droht ein StackOverflowError.",
      tags: ["aufrufe", "stack"]
    },
    {
      id: "lvl-algo-rek-04", topic: "ga2-rekursion", type: "code", lang: "pseudocode", difficulty: 1, step: 4, points: 3,
      context: "Für einen Raketenstart in einer Kinder-Lern-App soll ein Countdown ausgegeben werden: <code>countdown(3)</code> gibt 3, 2, 1 und dann „Start!“ aus.",
      question: "Ergänzen Sie die Prozedur <code>countdown</code> <b>rekursiv</b> (ohne Schleife): Rekursionsanker und rekursiver Aufruf fehlen.",
      starter: "prozedur countdown(n: Ganzzahl)\n  // TODO: Anker – bei n == 0 \"Start!\" ausgeben\n\n  ausgabe(n)\n  // TODO: rekursiver Aufruf\n\nende prozedur",
      solution: pre(`
prozedur countdown(n: Ganzzahl)
  wenn n == 0 dann
    ausgabe("Start!")
    rückgabe
  ende wenn
  ausgabe(n)
  countdown(n - 1)
ende prozedur`) + "Alternativ mit <code>sonst</code>-Zweig statt <code>rückgabe</code>.",
      explanation: "Hinweis: Nach der Ausgabe von „Start!“ muss die Prozedur <b>beendet</b> werden (rückgabe oder sonst-Zweig), sonst würde 0, −1, −2 … ausgegeben (unendliche Rekursion). Steht <code>ausgabe(n)</code> <i>nach</i> dem rekursiven Aufruf, kehrt sich die Reihenfolge um (Start!, 1, 2, 3).",
      keywords: ["wenn|if", "n == 0|n==0|n <= 0|n<=0", "start", "rückgabe|return|sonst|else", "countdown(n - 1)|countdown(n-1)"],
      tags: ["anker", "ausgabe"]
    },
    {
      id: "lvl-algo-rek-05", topic: "ga2-rekursion", type: "order", difficulty: 1, step: 5, points: 3,
      context: "Die Anzahl der Ziffern einer nicht negativen Ganzzahl soll rekursiv bestimmt werden: Eine Zahl &lt; 10 hat eine Ziffer; sonst ist es eine Ziffer mehr als bei <code>n div 10</code> (letzte Ziffer abgeschnitten).",
      question: "Bringen Sie die Zeilen der Funktion <code>anzahlZiffern</code> in die richtige Reihenfolge.",
      items: [
        "funktion anzahlZiffern(n: Ganzzahl): Ganzzahl",
        "wenn n < 10 dann",
        "rückgabe 1",
        "ende wenn",
        "rückgabe 1 + anzahlZiffern(n div 10)",
        "ende funktion"
      ].map(esc),
      solution: pre(`
funktion anzahlZiffern(n: Ganzzahl): Ganzzahl
  wenn n < 10 dann
    rückgabe 1
  ende wenn
  rückgabe 1 + anzahlZiffern(n div 10)
ende funktion`) + "Beispiel: anzahlZiffern(2026) = 1 + aZ(202) = 1 + 1 + aZ(20) = 1 + 1 + 1 + aZ(2) = 4.",
      explanation: "Hinweis: Der Anker steht immer <b>vor</b> dem rekursiven Aufruf. Ganzzahldivision <code>div 10</code> entfernt die letzte Ziffer – das verkleinert das Problem garantiert bis in den Bereich 0–9.",
      tags: ["anker", "ziffern"]
    },
    {
      id: "lvl-algo-rek-06", topic: "ga2-rekursion", type: "mc", difficulty: 1, step: 6, points: 2,
      context: pre(`
funktion halbieren(n: Ganzzahl): Ganzzahl
  wenn n == 1 dann
    rückgabe 0
  ende wenn
  rückgabe 1 + halbieren(n div 2)
ende funktion`),
      question: "Welcher Aufruf führt zu einer <b>unendlichen Rekursion</b> (StackOverflowError)?",
      options: ["halbieren(1)", "halbieren(8)", "halbieren(7)", "halbieren(0)"],
      correct: [3],
      solution: "halbieren(0): 0 ≠ 1, Aufruf halbieren(0 div 2) = halbieren(0) → der Anker n == 1 wird nie erreicht. Die anderen enden: 8 → 4 → 2 → 1 (Ergebnis 3), 7 → 3 → 1 (Ergebnis 2), 1 → 0.",
      explanation: "Hinweis: Prüfen Sie bei jeder Rekursion, ob <b>jeder</b> zulässige Startwert den Anker erreicht. Robuster wäre <code>wenn n &lt;= 1 dann</code>. Typischer Fehler: nur „normale“ Werte testen, nicht 0 oder negative Zahlen.",
      tags: ["anker", "stackoverflow"]
    },
    {
      id: "lvl-algo-rek-07", topic: "ga2-rekursion", type: "code", lang: "pseudocode", difficulty: 1, step: 7, points: 4,
      context: "Die Summe aller Elemente eines Arrays soll rekursiv berechnet werden. Die Hilfsfunktion <code>summeAb(a, i)</code> liefert die Summe der Elemente ab Index i. Aufruf von außen: <code>summeAb(a, 0)</code>.",
      question: "Ergänzen Sie die fehlende Zeile mit dem rekursiven Aufruf.",
      starter: "funktion summeAb(a: Array von Ganzzahl, i: Ganzzahl): Ganzzahl\n  wenn i == laenge(a) dann\n    rückgabe 0\n  ende wenn\n  // TODO: aktuelles Element + Summe des Rests\n\nende funktion",
      solution: pre(`
funktion summeAb(a: Array von Ganzzahl, i: Ganzzahl): Ganzzahl
  wenn i == laenge(a) dann
    rückgabe 0
  ende wenn
  rückgabe a[i] + summeAb(a, i + 1)
ende funktion`) + "Trace für a = [4, 1, 7]: 4 + (1 + (7 + 0)) = 12.",
      explanation: "Hinweis: Das Array selbst wird nicht kleiner – stattdessen wandert der Index i nach rechts, bis er hinter dem letzten Element steht (Anker <code>i == laenge(a)</code>, liefert 0 = neutrales Element der Addition). Typischer Fehler: <code>summeAb(a, i)</code> ohne +1 → unendliche Rekursion.",
      keywords: ["rückgabe|return", "a[i]", "summeab(a, i + 1)|summeab(a,i+1)|i + 1|i+1", "+"],
      tags: ["array", "index"]
    },
    // ---------- Schwer ----------
    {
      id: "lvl-algo-rek-08", topic: "ga2-rekursion", type: "numeric", difficulty: 3, step: 1, points: 4,
      context: "Eine Treppe hat n Stufen. Man kann mit jedem Schritt <b>eine oder zwei</b> Stufen nehmen. Die Anzahl der verschiedenen Wege wird rekursiv berechnet:" + pre(`
funktion wege(n: Ganzzahl): Ganzzahl
  wenn n <= 1 dann
    rückgabe 1
  ende wenn
  rückgabe wege(n - 1) + wege(n - 2)
ende funktion`),
      question: "Welchen Wert liefert <code>wege(6)</code>?",
      answer: 13, tolerance: 0,
      solution: "Bottom-up: wege(0) = 1, wege(1) = 1, wege(2) = 2, wege(3) = 3, wege(4) = 5, wege(5) = 8, wege(6) = 8 + 5 = <b>13</b>.",
      explanation: "Der letzte Schritt ist entweder 1 Stufe (Rest n − 1) oder 2 Stufen (Rest n − 2) – daher die Summe zweier Teilprobleme (Mehrfachrekursion, Fibonacci-Struktur). Tipp: Bei Mehrfachrekursion nicht den kompletten Aufrufbaum zeichnen, sondern die Werte von unten nach oben tabellieren.",
      tags: ["mehrfachrekursion", "fibonacci"]
    },
    {
      id: "lvl-algo-rek-09", topic: "ga2-rekursion", type: "numeric", difficulty: 3, step: 2, points: 5,
      context: "Der Binomialkoeffizient „n über k“ (Anzahl der Möglichkeiten, k aus n Elementen auszuwählen) wird nach dem Pascalschen Dreieck rekursiv berechnet:" + pre(`
funktion bk(n: Ganzzahl, k: Ganzzahl): Ganzzahl
  wenn k == 0 ODER k == n dann
    rückgabe 1
  ende wenn
  rückgabe bk(n - 1, k - 1) + bk(n - 1, k)
ende funktion`),
      question: "Wie viele Aufrufe von <code>bk</code> erzeugt <code>bk(5, 2)</code> insgesamt (einschließlich des ersten)?",
      answer: 19, tolerance: 0,
      solution: "Aufrufe A(n, k) = 1 bei Anker, sonst 1 + A(n−1, k−1) + A(n−1, k).<br>A(1,1) = 1, A(1,0) = 1, A(2,1) = 3, A(2,2) = 1, A(2,0) = 1, A(3,1) = 1 + A(2,0) + A(2,1) = 5, A(3,2) = 1 + A(2,1) + A(2,2) = 5, A(3,3) = 1<br>A(4,1) = 1 + A(3,0) + A(3,1) = 1 + 1 + 5 = 7, A(4,2) = 1 + A(3,1) + A(3,2) = 11<br>A(5,2) = 1 + A(4,1) + A(4,2) = 1 + 7 + 11 = <b>19</b>. (Ergebnis bk(5, 2) = 10.)",
      explanation: "Faustregel: Ein binärer Aufrufbaum mit B Blättern (Anker-Aufrufen) hat 2B − 1 Knoten. Hier liefert jedes Blatt 1, also B = Ergebnis = 10 → 2 · 10 − 1 = 19. Viele Teilprobleme (z. B. bk(3,1), bk(2,1)) werden mehrfach berechnet → Kandidat für Memoisierung.",
      tags: ["mehrfachrekursion", "aufrufe", "aufrufbaum"]
    },
    {
      id: "lvl-algo-rek-10", topic: "ga2-rekursion", type: "mc", difficulty: 3, step: 3, points: 4,
      question: "Welche Ausgabe erzeugt der Aufruf <code>p(3)</code>?" + pre(`
prozedur p(n: Ganzzahl)
  wenn n > 0 dann
    p(n - 1)
    ausgabe(n)
    p(n - 1)
  ende wenn
ende prozedur`),
      options: ["1 2 1 3 1 2 1", "3 2 1 1 2 1 1", "1 2 3 3 2 1", "3 2 1 2 1 3 2 1"],
      correct: [0],
      solution: "p(1) gibt „1“ aus (p(0), 1, p(0)). p(2) = p(1), 2, p(1) → „1 2 1“. p(3) = p(2), 3, p(2) → <b>1 2 1 3 1 2 1</b>.",
      explanation: "Die Ausgabe steht <b>zwischen</b> zwei rekursiven Aufrufen (In-Order-Struktur wie beim Durchlaufen eines Binärbaums bzw. bei den Türmen von Hanoi). Insgesamt 2³ − 1 = 7 Ausgaben. Tipp: Rekursion von klein nach groß auflösen (p(1), dann p(2) …).",
      tags: ["mehrfachrekursion", "ausgabe", "trace"]
    },
    {
      id: "lvl-algo-rek-11", topic: "ga2-rekursion", type: "code", lang: "pseudocode", difficulty: 3, step: 4, points: 10,
      context: "Ein Lagerverwaltungssystem stellt die Hallenfläche als Raster dar: <code>halle: Array von Array von Zeichen</code> mit <code>'.'</code> = freie Fläche, <code>'#'</code> = Regal. Zusammenhängende freie Flächen (waagerecht/senkrecht benachbart) bilden einen Bereich. Für die Planung eines neuen Stellplatzes soll die Größe des Bereichs bestimmt werden, in dem ein bestimmtes Feld liegt.",
      question: "Entwickeln Sie die <b>rekursive</b> Funktion <code>bereichsGroesse(halle, z: Ganzzahl, s: Ganzzahl): Ganzzahl</code>, die die Anzahl der freien Felder im Bereich von (z, s) liefert. Bereits gezählte Felder sollen mit <code>'x'</code> markiert werden, damit sie nicht doppelt gezählt werden. Ungültige Koordinaten liefern 0.",
      starter: "funktion bereichsGroesse(halle: Array von Array von Zeichen, z: Ganzzahl, s: Ganzzahl): Ganzzahl\n  // Ihr Code\nende funktion",
      solution: pre(`
funktion bereichsGroesse(halle: Array von Array von Zeichen, z: Ganzzahl, s: Ganzzahl): Ganzzahl
  // Anker 1: außerhalb des Rasters
  wenn z < 0 ODER z >= laenge(halle) ODER s < 0 ODER s >= laenge(halle[z]) dann
    rückgabe 0
  ende wenn
  // Anker 2: Regal oder schon gezählt
  wenn halle[z][s] != '.' dann
    rückgabe 0
  ende wenn
  halle[z][s] = 'x'                       // markieren VOR den Aufrufen
  rückgabe 1 + bereichsGroesse(halle, z - 1, s)
             + bereichsGroesse(halle, z + 1, s)
             + bereichsGroesse(halle, z, s - 1)
             + bereichsGroesse(halle, z, s + 1)
ende funktion`),
      explanation: "Flood-Fill: Rekursion mit <b>vier</b> Selbstaufrufen. Entscheidend: (1) Grenzprüfung <b>vor</b> dem Arrayzugriff (Kurzschlussauswertung von ODER), (2) Markieren <b>vor</b> den rekursiven Aufrufen – sonst ruft das Nachbarfeld das aktuelle Feld wieder auf → unendliche Rekursion. Laufzeit O(Zeilen · Spalten), da jedes Feld höchstens einmal gezählt wird. Bei sehr großen Flächen droht ein StackOverflow → iterativ mit eigenem Stack/Queue lösen.",
      keywords: ["z < 0|z<0", "laenge(halle)|length", "rückgabe 0|return 0", "!= '.'|!='.'|== '#'", "'x'", "z - 1|z-1", "z + 1|z+1", "s - 1|s-1", "s + 1|s+1", "bereichsgroesse("],
      tags: ["flood-fill", "2d-array", "mehrfachrekursion"]
    },
    {
      id: "lvl-algo-rek-12", topic: "ga2-rekursion", type: "code", lang: "pseudocode", difficulty: 3, step: 5, points: 9,
      context: "Ein Cloud-Speicherdienst verwaltet Ordner als Baumstruktur:" + pre(`
klasse Datei
  öffentlich methode getGroesse(): Ganzzahl        // in KB
ende klasse
klasse Ordner
  öffentlich methode getDateien(): Liste von Datei
  öffentlich methode getUnterordner(): Liste von Ordner
  öffentlich methode getName(): Text
ende klasse`),
      question: "a) Entwickeln Sie die rekursive Funktion <code>gesamtGroesse(o: Ordner): Ganzzahl</code>, die die Größe aller Dateien im Ordner <b>und allen Unterordnern</b> liefert. (5 P)<br>b) Entwickeln Sie die rekursive Funktion <code>tiefe(o: Ordner): Ganzzahl</code>, die die maximale Verschachtelungstiefe liefert (Ordner ohne Unterordner: 1). (4 P)",
      solution: pre(`
funktion gesamtGroesse(o: Ordner): Ganzzahl
  var summe: Ganzzahl = 0
  für jedes d in o.getDateien()
    summe = summe + d.getGroesse()
  ende für
  für jedes u in o.getUnterordner()
    summe = summe + gesamtGroesse(u)        // Rekursion
  ende für
  rückgabe summe
ende funktion

funktion tiefe(o: Ordner): Ganzzahl
  var maxTiefe: Ganzzahl = 0
  für jedes u in o.getUnterordner()
    var t: Ganzzahl = tiefe(u)
    wenn t > maxTiefe dann
      maxTiefe = t
    ende wenn
  ende für
  rückgabe 1 + maxTiefe
ende funktion`),
      explanation: "Der Rekursionsanker ist hier <b>implizit</b>: Ein Ordner ohne Unterordner durchläuft die zweite Schleife nicht und ruft sich nicht selbst auf. Die Anzahl der Selbstaufrufe ist variabel (so viele wie Unterordner). Typische Fehler: Summe als globale Variable ohne Rücksetzen, nur die direkten Unterordner berücksichtigen (keine Rekursion), bei <code>tiefe</code> die Tiefen der Unterordner addieren statt das Maximum zu nehmen. Diese Struktur entspricht dem Entwurfsmuster <i>Composite</i>.",
      keywords: ["für jedes|for", "getdateien", "getgroesse", "getunterordner", "gesamtgroesse(u)|gesamtgroesse(", "summe", "tiefe(u)|tiefe(", "1 +|1+|+ 1|+1", "max", "rückgabe|return"],
      tags: ["baum", "composite", "rekursion"]
    },
    {
      id: "lvl-algo-rek-13", topic: "ga2-rekursion", type: "code", lang: "pseudocode", difficulty: 3, step: 6, points: 8,
      context: "Die folgende rekursive Funktion soll das Maximum der ersten <code>n</code> Elemente eines Arrays liefern (Aufruf: <code>maximum(a, laenge(a))</code>, laenge(a) ≥ 1). Sie liefert falsche Ergebnisse bzw. bricht ab." + pre(`
1  funktion maximum(a: Array von Ganzzahl, n: Ganzzahl): Ganzzahl
2    wenn n == 0 dann
3      rückgabe a[0]
4    ende wenn
5    var m: Ganzzahl = maximum(a, n)
6    wenn a[n] > m dann
7      rückgabe a[n]
8    ende wenn
9    rückgabe m
10 ende funktion`),
      question: "Nennen Sie die Fehler mit Zeilennummer und Auswirkung, geben Sie eine korrigierte Fassung an und führen Sie für <code>a = [3, 9, 4]</code> einen Trace der korrigierten Fassung durch.",
      solution: "<ul><li>Zeile 5: <code>maximum(a, n)</code> verkleinert das Problem nicht → unendliche Rekursion / StackOverflowError. Korrekt: <code>maximum(a, n - 1)</code>.</li><li>Zeile 6/7: Bei n Elementen ist das letzte <code>a[n - 1]</code>; <code>a[n]</code> liegt außerhalb.</li><li>Zeile 2: Der sinnvolle Anker ist <code>n == 1</code> (ein Element → a[0]); mit n == 0 funktioniert die Funktion nach Korrektur von Zeile 5–7 zwar, liefert aber für „0 Elemente“ einen Wert und vergleicht a[0] mit sich selbst (logisch unsauber, ein überflüssiger Aufruf).</li></ul>" + pre(`
funktion maximum(a: Array von Ganzzahl, n: Ganzzahl): Ganzzahl
  wenn n == 1 dann
    rückgabe a[0]
  ende wenn
  var m: Ganzzahl = maximum(a, n - 1)
  wenn a[n - 1] > m dann
    rückgabe a[n - 1]
  ende wenn
  rückgabe m
ende funktion`) + "Trace: maximum(a, 3) → maximum(a, 2) → maximum(a, 1) = 3; zurück in n = 2: a[1] = 9 &gt; 3 → 9; zurück in n = 3: a[2] = 4 &gt; 9? nein → <b>9</b>.",
      explanation: "Prüfschema für Rekursion: (1) Gibt es einen Anker? (2) Wird das Argument in Richtung Anker verkleinert? (3) Stimmen die Indizes (Anzahl n ↔ letzter Index n − 1)? Off-by-one-Fehler sind bei „Anzahl“-Parametern besonders häufig.",
      keywords: ["n - 1|n-1", "a[n - 1]|a[n-1]", "n == 1|n==1", "zeile 5", "unendlich|stackoverflow|endlos", "zeile 6", "9", "rückgabe|return"],
      tags: ["fehlersuche", "array", "rekursion"]
    }
  );

  // ===================== ga2-datenstrukturen =====================
  add(
    // ---------- Leicht ----------
    {
      id: "lvl-algo-ds-01", topic: "ga2-datenstrukturen", type: "numeric", difficulty: 1, step: 1, points: 2,
      context: "Ein Array speichert die Losnummern einer Tombola: <code>a = [4, 8, 15, 16, 23, 42]</code> (Indizes beginnen bei 0).",
      question: "Welchen Wert liefert <code>a[laenge(a) - 2]</code>?",
      answer: 23, tolerance: 0,
      solution: "laenge(a) = 6 → a[6 − 2] = a[4] = <b>23</b> (das vorletzte Element).",
      explanation: "Hinweis: Das letzte Element steht immer an Index <code>laenge(a) - 1</code>, hier a[5] = 42. Der Zugriff auf a[6] wäre ein Fehler (Index außerhalb). Arrayzugriff per Index dauert unabhängig von der Größe gleich lang: O(1).",
      tags: ["array", "index"]
    },
    {
      id: "lvl-algo-ds-02", topic: "ga2-datenstrukturen", type: "mc", difficulty: 1, step: 2, points: 2,
      context: "In einem Büro senden mehrere Mitarbeitende Druckaufträge an denselben Netzwerkdrucker. Die Aufträge sollen in der Reihenfolge ihres Eingangs gedruckt werden.",
      question: "Welche Datenstruktur und welches Prinzip sind dafür geeignet?",
      options: ["Stack (LIFO)", "Queue/Warteschlange (FIFO)", "Binärer Suchbaum (sortiert)", "Hash-Tabelle (Schlüssel → Wert)"],
      correct: [1],
      solution: "<b>Queue (FIFO – First In, First Out)</b>: Der zuerst eingegangene Auftrag wird zuerst gedruckt. Operationen: <code>enqueue</code> (hinten anstellen), <code>dequeue</code> (vorne entnehmen).",
      explanation: "Hinweis: Ein Stack würde den <i>neuesten</i> Auftrag zuerst drucken – unfair für die, die zuerst gesendet haben. Weitere Queue-Beispiele: Kassenschlange, Ticket-Support, Nachrichtenwarteschlangen.",
      tags: ["queue", "fifo"]
    },
    {
      id: "lvl-algo-ds-03", topic: "ga2-datenstrukturen", type: "numeric", difficulty: 1, step: 3, points: 2,
      question: "Auf einem leeren Stack werden nacheinander ausgeführt:<br><code>push(3), push(7), pop(), push(5), push(2), pop(), pop()</code><br>Welchen Wert liefert das <b>letzte</b> <code>pop()</code>?",
      answer: 5, tolerance: 0,
      solution: "[3] → [3, 7] → pop liefert 7 → [3] → [3, 5] → [3, 5, 2] → pop liefert 2 → [3, 5] → pop liefert <b>5</b> → [3].",
      explanation: "Hinweis: Notieren Sie den Stack als Liste, deren <b>rechtes Ende</b> die Spitze (top) ist. <code>pop</code> nimmt immer das zuletzt hinzugefügte Element (LIFO).",
      tags: ["stack", "lifo", "trace"]
    },
    {
      id: "lvl-algo-ds-04", topic: "ga2-datenstrukturen", type: "mc", difficulty: 1, step: 4, points: 2,
      question: "In eine leere Queue werden nacheinander eingereiht bzw. entnommen:<br><code>enqueue(\"A\"), enqueue(\"B\"), enqueue(\"C\"), dequeue(), enqueue(\"D\"), dequeue()</code><br>Welches Element steht danach <b>vorne</b> in der Queue?",
      options: ["\"A\"", "\"B\"", "\"C\"", "\"D\""],
      correct: [2],
      solution: "[A] → [A, B] → [A, B, C] → dequeue liefert A → [B, C] → [B, C, D] → dequeue liefert B → <b>[C, D]</b>. Vorne steht <b>C</b>.",
      explanation: "Hinweis: Bei der Queue wird vorne entnommen und hinten angefügt. Wer hier „D“ wählt, hat wie bei einem Stack gerechnet.",
      tags: ["queue", "fifo", "trace"]
    },
    {
      id: "lvl-algo-ds-05", topic: "ga2-datenstrukturen", type: "code", lang: "pseudocode", difficulty: 1, step: 5, points: 4,
      context: "Ein Texteditor speichert die letzten Aktionen für „Rückgängig“ in einem Stack auf Array-Basis. <code>top</code> ist der Index des obersten Elements (−1 = leer)." + pre(`
klasse AktionsStack
  privat daten: Array von Text = neues Array[100]
  privat top: Ganzzahl = -1
ende klasse`),
      question: "Ergänzen Sie in der Methode <code>push</code> die zwei fehlenden Zeilen.",
      starter: "öffentlich methode push(aktion: Text)\n  wenn top == laenge(daten) - 1 dann\n    wirf neue StackVollException()\n  ende wenn\n  // TODO: top erhöhen und Element ablegen\n\nende methode",
      solution: pre(`
öffentlich methode push(aktion: Text)
  wenn top == laenge(daten) - 1 dann
    wirf neue StackVollException()
  ende wenn
  top = top + 1
  daten[top] = aktion
ende methode`) + "Passend dazu <code>pop</code>: <code>var x = daten[top]; top = top - 1; rückgabe x</code> (vorher auf <code>top == -1</code> prüfen).",
      explanation: "Hinweis: Reihenfolge beachten – erst <code>top</code> erhöhen, dann schreiben. Andersherum würde bei top = −1 auf <code>daten[-1]</code> geschrieben. Die Prüfung auf „voll“ verhindert einen Überlauf des Arrays (Stack Overflow im wörtlichen Sinn).",
      keywords: ["top = top + 1|top=top+1|top++|top += 1", "daten[top]", "= aktion|=aktion"],
      tags: ["stack", "array", "implementieren"]
    },
    {
      id: "lvl-algo-ds-06", topic: "ga2-datenstrukturen", type: "order", difficulty: 1, step: 6, points: 3,
      context: "Eine Musik-App speichert die Playlist als einfach verkettete Liste. Ein neuer Titel soll <b>am Anfang</b> eingefügt werden. Jeder <code>Knoten</code> hat die Attribute <code>titel</code> und <code>naechster</code>; die Liste kennt ihren ersten Knoten über <code>kopf</code>.",
      question: "Bringen Sie die Zeilen der Methode <code>einfuegenVorne</code> in die richtige Reihenfolge.",
      items: [
        "methode einfuegenVorne(titel: Text)",
        "var neu: Knoten = neuer Knoten()",
        "neu.titel = titel",
        "neu.naechster = kopf",
        "kopf = neu",
        "ende methode"
      ],
      solution: pre(`
methode einfuegenVorne(titel: Text)
  var neu: Knoten = neuer Knoten()
  neu.titel = titel
  neu.naechster = kopf
  kopf = neu
ende methode`),
      explanation: "Hinweis: Entscheidend ist die Reihenfolge der letzten beiden Zeilen. Wird zuerst <code>kopf = neu</code> gesetzt, zeigt <code>neu.naechster = kopf</code> auf sich selbst – die restliche Liste ist verloren. Einfügen vorne kostet O(1), funktioniert auch bei leerer Liste (kopf = null).",
      tags: ["liste", "verkettet", "einfuegen"]
    },
    {
      id: "lvl-algo-ds-07", topic: "ga2-datenstrukturen", type: "code", lang: "pseudocode", difficulty: 1, step: 7, points: 3,
      context: "Für die Playlist (einfach verkettete Liste mit <code>kopf</code>, Knoten mit <code>naechster</code>) soll die Anzahl der Titel ermittelt werden.",
      question: "Ergänzen Sie die zwei fehlenden Zeilen im Schleifenrumpf.",
      starter: "methode anzahl(): Ganzzahl\n  var n: Ganzzahl = 0\n  var akt: Knoten = kopf\n  solange akt != null\n    // TODO: zählen und weiterlaufen\n\n  ende solange\n  rückgabe n\nende methode",
      solution: pre(`
methode anzahl(): Ganzzahl
  var n: Ganzzahl = 0
  var akt: Knoten = kopf
  solange akt != null
    n = n + 1
    akt = akt.naechster
  ende solange
  rückgabe n
ende methode`),
      explanation: "Hinweis: Das ist das Grundmuster für jeden Listendurchlauf. Fehlt <code>akt = akt.naechster</code>, entsteht eine Endlosschleife. Die Bedingung <code>akt != null</code> (nicht <code>akt.naechster != null</code>) sorgt dafür, dass auch der letzte Knoten gezählt wird und die leere Liste 0 liefert.",
      keywords: ["n = n + 1|n=n+1|n++|n += 1", "akt = akt.naechster|akt=akt.naechster|akt.naechster"],
      tags: ["liste", "verkettet", "durchlauf"]
    },
    // ---------- Schwer ----------
    {
      id: "lvl-algo-ds-08", topic: "ga2-datenstrukturen", type: "code", lang: "pseudocode", difficulty: 3, step: 1, points: 10,
      context: "Ein Routenplaner benötigt einen Stack ohne feste Größenbegrenzung. Er soll daher als <b>einfach verkettete Liste</b> implementiert werden – ohne Bibliotheksklassen." + pre(`
klasse Knoten
  öffentlich wert: Ganzzahl
  öffentlich naechster: Knoten
ende klasse`),
      question: "Implementieren Sie die Klasse <code>Stack</code> mit dem Attribut <code>top: Knoten</code> und den Methoden <code>push(x: Ganzzahl)</code>, <code>pop(): Ganzzahl</code>, <code>peek(): Ganzzahl</code> und <code>istLeer(): Wahrheitswert</code>. <code>pop</code> und <code>peek</code> werfen bei leerem Stack eine <code>LeererStackException</code>. Alle Operationen sollen in O(1) laufen.",
      solution: pre(`
klasse Stack
  privat top: Knoten = null

  öffentlich methode istLeer(): Wahrheitswert
    rückgabe top == null
  ende methode

  öffentlich methode push(x: Ganzzahl)
    var neu: Knoten = neuer Knoten()
    neu.wert = x
    neu.naechster = top
    top = neu
  ende methode

  öffentlich methode pop(): Ganzzahl
    wenn istLeer() dann
      wirf neue LeererStackException()
    ende wenn
    var x: Ganzzahl = top.wert
    top = top.naechster
    rückgabe x
  ende methode

  öffentlich methode peek(): Ganzzahl
    wenn istLeer() dann
      wirf neue LeererStackException()
    ende wenn
    rückgabe top.wert
  ende methode
ende klasse`),
      explanation: "Der Listenkopf ist die Spitze des Stacks – Einfügen und Entfernen am Kopf kostet O(1). Typische Fehler: bei <code>pop</code> den Wert erst nach <code>top = top.naechster</code> lesen (dann ist er weg), Prüfung auf leeren Stack vergessen (NullPointerException), bei <code>push</code> am Listenende anhängen (O(n)).",
      keywords: ["klasse stack|class stack", "top", "neuer knoten|new knoten", "naechster = top|naechster=top|next = top", "top = neu|top=neu", "top = top.naechster|top=top.naechster|top = top.next", "top == null|top==null", "wirf|throw", "leererstackexception", "rückgabe|return"],
      tags: ["stack", "verkettet", "implementieren"]
    },
    {
      id: "lvl-algo-ds-09", topic: "ga2-datenstrukturen", type: "code", lang: "pseudocode", difficulty: 3, step: 2, points: 10,
      context: "Eine Arztpraxis verwaltet die Warteliste als <b>aufsteigend nach Termin-Uhrzeit sortierte</b> einfach verkettete Liste. Knoten: <code>zeit: Ganzzahl</code> (Minuten seit 0 Uhr), <code>name: Text</code>, <code>naechster: Knoten</code>. Die Liste hat das Attribut <code>kopf</code>.",
      question: "a) Implementieren Sie <code>einfuegenSortiert(zeit: Ganzzahl, name: Text)</code>, sodass die Sortierung erhalten bleibt (bei gleicher Zeit hinter den vorhandenen Einträgen). (6 P)<br>b) Implementieren Sie <code>entferne(name: Text): Wahrheitswert</code>, die den ersten Knoten mit diesem Namen löscht und wahr liefert, falls einer gefunden wurde. (4 P)",
      solution: pre(`
methode einfuegenSortiert(zeit: Ganzzahl, name: Text)
  var neu: Knoten = neuer Knoten()
  neu.zeit = zeit
  neu.name = name
  // Fall 1: leere Liste oder neuer Knoten wird erster
  wenn kopf == null ODER zeit < kopf.zeit dann
    neu.naechster = kopf
    kopf = neu
    rückgabe
  ende wenn
  // Fall 2: Vorgänger suchen
  var akt: Knoten = kopf
  solange akt.naechster != null UND akt.naechster.zeit <= zeit
    akt = akt.naechster
  ende solange
  neu.naechster = akt.naechster
  akt.naechster = neu
ende methode

methode entferne(name: Text): Wahrheitswert
  wenn kopf == null dann
    rückgabe falsch
  ende wenn
  wenn kopf.name.equals(name) dann
    kopf = kopf.naechster
    rückgabe wahr
  ende wenn
  var akt: Knoten = kopf
  solange akt.naechster != null
    wenn akt.naechster.name.equals(name) dann
      akt.naechster = akt.naechster.naechster     // aushängen
      rückgabe wahr
    ende wenn
    akt = akt.naechster
  ende solange
  rückgabe falsch
ende methode`),
      explanation: "Bei einfach verketteten Listen braucht man zum Einfügen/Löschen den <b>Vorgänger</b> – daher läuft <code>akt</code> immer einen Knoten „hinterher“ (<code>akt.naechster</code> wird geprüft). Sonderfälle: leere Liste, Einfügen/Löschen am Kopf. <code>&lt;=</code> in der Suchschleife sorgt dafür, dass bei gleicher Zeit hinten eingefügt wird (stabil). Reihenfolge der Zeiger-Zuweisungen: zuerst <code>neu.naechster</code>, dann <code>akt.naechster</code>.",
      keywords: ["kopf == null|kopf==null", "neu.naechster = kopf|neu.naechster=kopf", "akt.naechster != null|akt.naechster!=null", "akt.naechster.zeit|.zeit <=", "neu.naechster = akt.naechster|neu.naechster=akt.naechster", "akt.naechster = neu|akt.naechster=neu", "kopf = kopf.naechster|kopf=kopf.naechster", "akt.naechster.naechster", "equals|==", "rückgabe|return"],
      tags: ["liste", "verkettet", "sortiert", "loeschen"]
    },
    {
      id: "lvl-algo-ds-10", topic: "ga2-datenstrukturen", type: "numeric", difficulty: 3, step: 3, points: 5,
      context: "Eine Sensor-Queue ist als <b>Ringpuffer</b> mit Kapazität 4 realisiert: Array <code>d[0..3]</code>, <code>kopf</code> (Index des vordersten Elements), <code>ende</code> (nächste freie Position), <code>anzahl</code>. Anfangs kopf = ende = anzahl = 0." + pre(`
enqueue(x): wenn anzahl == 4 dann Fehlermeldung "voll", sonst
            d[ende] = x; ende = (ende + 1) mod 4; anzahl = anzahl + 1
dequeue():  x = d[kopf]; kopf = (kopf + 1) mod 4; anzahl = anzahl - 1; rückgabe x`) + "Ausgeführt wird:<br><code>enqueue(10), enqueue(20), enqueue(30), dequeue(), enqueue(40), enqueue(50), dequeue(), enqueue(60), enqueue(70)</code>",
      question: "An welchem <b>Array-Index</b> steht nach allen Operationen der Wert <b>60</b>?",
      answer: 1, tolerance: 0,
      solution: "enq 10 → d[0], ende 1 · enq 20 → d[1], ende 2 · enq 30 → d[2], ende 3 · deq → 10, kopf 1 · enq 40 → d[3], ende 0 · enq 50 → d[0] (überschreibt den entnommenen Platz), ende 1, anzahl 4 · deq → 20, kopf 2, anzahl 3 · enq 60 → <b>d[1]</b>, ende 2, anzahl 4 · enq 70 → „voll“.<br>Endzustand: d = [50, 60, 30, 40], kopf = 2, ende = 2, anzahl = 4 (Reihenfolge der Queue: 30, 40, 50, 60).",
      explanation: "Der Ringpuffer nutzt frei gewordene Plätze am Anfang wieder (<code>mod</code> lässt die Indizes „umlaufen“). Aus kopf == ende allein lässt sich nicht erkennen, ob der Puffer leer oder voll ist – deshalb wird <code>anzahl</code> mitgeführt. Der Wert 30 in d[2] ist das vorderste Element, nicht etwa d[0].",
      tags: ["queue", "ringpuffer", "trace"]
    },
    {
      id: "lvl-algo-ds-11", topic: "ga2-datenstrukturen", type: "mc", difficulty: 3, step: 4, points: 4,
      context: "Ein Taschenrechner wertet Ausdrücke in <b>Postfix-Notation</b> (umgekehrte polnische Notation) mit einem Stack aus: Zahl → push; Operator → zwei Werte poppen (zuerst den <b>rechten</b> Operanden), verknüpfen, Ergebnis pushen.",
      question: "Welches Ergebnis liefert <code>5 1 2 + 4 * + 3 -</code>, und wie viele Elemente liegen während der Auswertung <b>maximal gleichzeitig</b> auf dem Stack?",
      options: ["Ergebnis 14, maximal 3 Elemente", "Ergebnis 14, maximal 4 Elemente", "Ergebnis 12, maximal 3 Elemente", "Ergebnis −14, maximal 3 Elemente"],
      correct: [0],
      solution: "5 → [5] · 1 → [5, 1] · 2 → [5, 1, 2] (3 Elemente) · + → [5, 3] · 4 → [5, 3, 4] (3 Elemente) · * → [5, 12] · + → [17] · 3 → [17, 3] · − → 17 − 3 = <b>14</b>. Maximal <b>3</b> Elemente.",
      explanation: "Infix entspricht <code>5 + (1 + 2) · 4 − 3</code>. Bei nicht kommutativen Operatoren (−, /) ist die Reihenfolge wichtig: Der zuerst gepoppte Wert ist der <b>rechte</b> Operand (17 − 3, nicht 3 − 17 → Distraktor −14).",
      tags: ["stack", "postfix", "trace"]
    },
    {
      id: "lvl-algo-ds-12", topic: "ga2-datenstrukturen", type: "code", lang: "pseudocode", difficulty: 3, step: 5, points: 10,
      context: "Ein Online-Wörterbuch speichert Einträge in einem <b>binären Suchbaum</b> (links kleiner, rechts größer, keine Duplikate)." + pre(`
klasse BaumKnoten
  öffentlich schluessel: Ganzzahl
  öffentlich links: BaumKnoten
  öffentlich rechts: BaumKnoten
ende klasse`),
      question: "a) Entwickeln Sie die <b>rekursive</b> Funktion <code>einfuegen(k: BaumKnoten, s: Ganzzahl): BaumKnoten</code>, die den Schlüssel einfügt und die (ggf. neue) Wurzel des Teilbaums zurückgibt. (5 P)<br>b) Entwickeln Sie die <b>iterative</b> Funktion <code>enthaelt(wurzel: BaumKnoten, s: Ganzzahl): Wahrheitswert</code>. (3 P)<br>c) Geben Sie die Laufzeit der Suche im besten und im schlechtesten Fall an und begründen Sie. (2 P)",
      solution: pre(`
funktion einfuegen(k: BaumKnoten, s: Ganzzahl): BaumKnoten
  wenn k == null dann
    var neu: BaumKnoten = neuer BaumKnoten()
    neu.schluessel = s
    rückgabe neu
  ende wenn
  wenn s < k.schluessel dann
    k.links = einfuegen(k.links, s)
  sonst wenn s > k.schluessel dann
    k.rechts = einfuegen(k.rechts, s)
  ende wenn                      // s == k.schluessel: Duplikat, nichts tun
  rückgabe k
ende funktion

funktion enthaelt(wurzel: BaumKnoten, s: Ganzzahl): Wahrheitswert
  var akt: BaumKnoten = wurzel
  solange akt != null
    wenn s == akt.schluessel dann
      rückgabe wahr
    sonst wenn s < akt.schluessel dann
      akt = akt.links
    sonst
      akt = akt.rechts
    ende wenn
  ende solange
  rückgabe falsch
ende funktion`) + "c) Laufzeit = Höhe des Baums. <b>Balanciert</b>: O(log n), weil pro Ebene die Hälfte der Knoten wegfällt. <b>Entartet</b> (z. B. Einfügen bereits sortierter Schlüssel 1, 2, 3, …): Der Baum wird zur Liste → O(n). Abhilfe: selbstbalancierende Bäume (AVL, Rot-Schwarz).",
      explanation: "Der Trick bei a): Die Funktion gibt den Teilbaum zurück, sodass <code>k.links = einfuegen(k.links, s)</code> den neuen Knoten automatisch an der richtigen Stelle einhängt – kein Sonderfall für die leere Wurzel nötig. Typischer Fehler: <code>einfuegen(k.links, s)</code> aufrufen, aber das Ergebnis nicht zuweisen (neuer Knoten geht verloren).",
      keywords: ["k == null|k==null|null", "neuer baumknoten|new baumknoten", "k.links = einfuegen|k.links=einfuegen", "k.rechts = einfuegen|k.rechts=einfuegen", "s < k.schluessel|s<k.schluessel|<", "solange|while", "akt = akt.links|akt=akt.links", "log n|logn|log(n)", "o(n)|entartet|liste", "rückgabe|return"],
      tags: ["baum", "bst", "rekursion", "implementieren"]
    }
  );

  // ===================== ga2-oop =====================
  add(
    // ---------- Leicht ----------
    {
      id: "lvl-algo-oop-01", topic: "ga2-oop", type: "mc", difficulty: 1, step: 1, points: 2,
      context: "In einem Fahrradverleih gibt es die Klasse <code>Fahrrad</code>. Im Programm werden mit <code>var f1 = neues Fahrrad(\"FR-01\")</code> und <code>var f2 = neues Fahrrad(\"FR-02\")</code> zwei Fahrräder angelegt.",
      question: "Welche Aussage ist richtig?",
      options: [
        "f1 und f2 sind zwei Objekte (Instanzen) der Klasse Fahrrad.",
        "f1 und f2 sind zwei Klassen, Fahrrad ist ein Objekt.",
        "f1 ist die Klasse, f2 ein Objekt von f1.",
        "Eine Klasse kann höchstens ein Objekt haben."
      ],
      correct: [0],
      solution: "Die <b>Klasse</b> ist der Bauplan (Attribute + Methoden), die <b>Objekte</b> f1 und f2 sind konkrete Ausprägungen mit eigenen Attributwerten (FR-01, FR-02). Erzeugt werden sie mit <code>neues</code> / <code>new</code>, wobei der Konstruktor aufgerufen wird.",
      explanation: "Hinweis: Merkbild „Klasse = Ausstechform, Objekt = Plätzchen“. Von einer Klasse können beliebig viele Objekte erzeugt werden (Ausnahme: Singleton-Muster).",
      tags: ["klasse", "objekt", "grundlagen"]
    },
    {
      id: "lvl-algo-oop-02", topic: "ga2-oop", type: "code", lang: "pseudocode", difficulty: 1, step: 2, points: 3,
      context: "Für einen Webshop wird die Klasse <code>Artikel</code> mit den privaten Attributen <code>name</code> und <code>preis</code> angelegt.",
      question: "Ergänzen Sie im Konstruktor die zwei fehlenden Zuweisungen.",
      starter: "klasse Artikel\n  privat name: Text\n  privat preis: Gleitkommazahl\n\n  öffentlich konstruktor Artikel(name: Text, preis: Gleitkommazahl)\n    // TODO: Attribute setzen\n\n  ende konstruktor\n\n  öffentlich methode getPreis(): Gleitkommazahl\n    rückgabe this.preis\n  ende methode\nende klasse",
      solution: pre(`
öffentlich konstruktor Artikel(name: Text, preis: Gleitkommazahl)
  this.name = name
  this.preis = preis
ende konstruktor`),
      explanation: "Hinweis: Heißen Parameter und Attribut gleich, verdeckt der Parameter das Attribut. <code>name = name</code> weist den Parameter sich selbst zu – das Attribut bleibt leer (null). Mit <code>this.</code> ist das Attribut des aktuellen Objekts gemeint. Ein Konstruktor hat keinen Rückgabetyp.",
      keywords: ["this.name = name|this.name=name", "this.preis = preis|this.preis=preis", "this"],
      tags: ["konstruktor", "this"]
    },
    {
      id: "lvl-algo-oop-03", topic: "ga2-oop", type: "numeric", difficulty: 1, step: 3, points: 3,
      context: pre(`
klasse Konto
  privat saldo: Gleitkommazahl
  öffentlich konstruktor Konto(start: Gleitkommazahl)
    this.saldo = start
  ende konstruktor
  öffentlich methode einzahlen(b: Gleitkommazahl)
    saldo = saldo + b
  ende methode
  öffentlich methode abheben(b: Gleitkommazahl)
    saldo = saldo - b
  ende methode
  öffentlich methode getSaldo(): Gleitkommazahl
    rückgabe saldo
  ende methode
ende klasse

var k: Konto = neues Konto(100)
k.einzahlen(50)
k.abheben(30)
var k2: Konto = k
k2.einzahlen(10)
var k3: Konto = neues Konto(100)
k3.einzahlen(500)
ausgabe(k.getSaldo())`),
      question: "Welcher Wert wird ausgegeben?",
      answer: 130, tolerance: 0,
      solution: "k: 100 + 50 − 30 = 120. <code>k2 = k</code> kopiert nur die <b>Referenz</b> – k und k2 zeigen auf <b>dasselbe</b> Objekt. k2.einzahlen(10) → 130. k3 ist ein eigenes, neues Objekt und beeinflusst k nicht. Ausgabe: <b>130</b>.",
      explanation: "Hinweis: Variablen von Klassentypen speichern einen Verweis auf das Objekt, nicht das Objekt selbst. Neue Objekte entstehen nur mit <code>neues</code>. Typischer Fehler: 120 (k2 als Kopie verstanden) oder 630 (k3 mitgezählt).",
      tags: ["objekt", "referenz", "trace"]
    },
    {
      id: "lvl-algo-oop-04", topic: "ga2-oop", type: "mc", difficulty: 1, step: 4, points: 2,
      context: "Die Klasse <code>Mitarbeiter</code> hat das private Attribut <code>alter: Ganzzahl</code>. Gültig sind Werte von 15 bis 70.",
      question: "Welcher Setter setzt das Prinzip der <b>Kapselung</b> korrekt um?",
      options: [
        c("öffentlich methode setAlter(a: Ganzzahl)") + "<br>" + c("  alter = a"),
        c("öffentlich methode setAlter(a: Ganzzahl)") + "<br>" + c("  wenn a >= 15 UND a <= 70 dann this.alter = a") + "<br>" + c("  sonst wirf neue IllegalArgumentException()"),
        c("privat methode setAlter(a: Ganzzahl)") + "<br>" + c("  wenn a >= 15 UND a <= 70 dann this.alter = a"),
        c("öffentlich methode setAlter(alter: Ganzzahl)") + "<br>" + c("  wenn alter >= 15 ODER alter <= 70 dann alter = alter")
      ],
      correct: [1],
      solution: "B: öffentlicher Setter, der den Wert <b>prüft</b> und ungültige Werte mit einer Exception ablehnt. So kann das Objekt nie in einen ungültigen Zustand geraten.",
      explanation: "A prüft nichts (kaum besser als ein öffentliches Attribut). C ist privat und damit von außen nicht nutzbar. D hat zwei Fehler: <code>ODER</code> lässt jeden Wert durch, und <code>alter = alter</code> ohne <code>this</code> ändert das Attribut nicht.",
      tags: ["kapselung", "setter"]
    },
    {
      id: "lvl-algo-oop-05", topic: "ga2-oop", type: "order", difficulty: 1, step: 5, points: 3,
      context: "Für ein Hotelbuchungssystem wird die Klasse <code>Zimmer</code> mit Nummer und Preis pro Nacht benötigt sowie eine Methode, die den Preis für mehrere Nächte berechnet.",
      question: "Bringen Sie die Zeilen der Klassendefinition in die richtige Reihenfolge.",
      items: [
        "klasse Zimmer",
        "privat nummer: Ganzzahl",
        "privat preisProNacht: Gleitkommazahl",
        "öffentlich konstruktor Zimmer(nummer: Ganzzahl, preis: Gleitkommazahl)",
        "this.nummer = nummer; this.preisProNacht = preis",
        "ende konstruktor",
        "öffentlich methode gesamtpreis(naechte: Ganzzahl): Gleitkommazahl",
        "rückgabe preisProNacht * naechte",
        "ende methode",
        "ende klasse"
      ],
      solution: pre(`
klasse Zimmer
  privat nummer: Ganzzahl
  privat preisProNacht: Gleitkommazahl
  öffentlich konstruktor Zimmer(nummer: Ganzzahl, preis: Gleitkommazahl)
    this.nummer = nummer; this.preisProNacht = preis
  ende konstruktor
  öffentlich methode gesamtpreis(naechte: Ganzzahl): Gleitkommazahl
    rückgabe preisProNacht * naechte
  ende methode
ende klasse`),
      explanation: "Hinweis: Übliche Reihenfolge in einer Klasse: Attribute (privat) → Konstruktor(en) → Methoden. Jeder Block (konstruktor, methode, klasse) wird mit dem passenden <code>ende …</code> geschlossen.",
      tags: ["klasse", "aufbau"]
    },
    {
      id: "lvl-algo-oop-06", topic: "ga2-oop", type: "multi", difficulty: 1, step: 6, points: 3,
      context: pre(`
klasse Fahrzeug
  geschützt kennzeichen: Text
  öffentlich methode beschreibung(): Text
    rückgabe "Fahrzeug " + kennzeichen
  ende methode
ende klasse

klasse PKW erbt von Fahrzeug
  privat sitze: Ganzzahl
  öffentlich methode beschreibung(): Text
    rückgabe "PKW " + kennzeichen + " mit " + sitze + " Sitzen"
  ende methode
ende klasse`),
      question: "Welche Aussagen sind richtig?",
      options: [
        "PKW ist die Unterklasse, Fahrzeug die Oberklasse.",
        "PKW besitzt die Attribute kennzeichen und sitze.",
        "PKW überschreibt die Methode beschreibung().",
        "Fahrzeug kann auf das Attribut sitze zugreifen.",
        "Eine Variable vom Typ Fahrzeug darf auf ein PKW-Objekt verweisen."
      ],
      correct: [0, 1, 2, 4],
      solution: "Richtig: A, B, C, E. PKW <b>erbt</b> kennzeichen (geschützt = protected, daher in der Unterklasse sichtbar) und ergänzt sitze. beschreibung() wird mit gleicher Signatur <b>überschrieben</b>. Ein PKW <i>ist ein</i> Fahrzeug, darum ist <code>var f: Fahrzeug = neuer PKW()</code> erlaubt. D ist falsch: Die Oberklasse kennt die Attribute ihrer Unterklassen nicht.",
      explanation: "Hinweis: Vererbung wirkt nur in eine Richtung (von oben nach unten). Prüffrage für Vererbung: „Ist ein PKW ein Fahrzeug?“ – ja → Vererbung passt.",
      tags: ["vererbung", "ueberschreiben"]
    },
    // ---------- Schwer ----------
    {
      id: "lvl-algo-oop-07", topic: "ga2-oop", type: "code", lang: "pseudocode", difficulty: 3, step: 1, points: 12,
      context: "Eine IT-Dienstleistungsfirma rechnet monatliche Personalkosten ab. Es gibt <b>Festangestellte</b> (Monatsgehalt + 20 % Arbeitgeberanteil) und <b>Freelancer</b> (Stundensatz × geleistete Stunden, ohne Zuschlag). Jede Person hat einen Namen. Neue Beschäftigungsarten sollen später ergänzt werden können, ohne die Kostenberechnung zu ändern.",
      question: "a) Implementieren Sie die <b>abstrakte</b> Klasse <code>Mitarbeiter</code> mit Attribut <code>name</code>, Konstruktor und abstrakter Methode <code>monatskosten(): Gleitkommazahl</code>. (3 P)<br>b) Implementieren Sie die Klassen <code>Festangestellter</code> und <code>Freelancer</code>. (6 P)<br>c) Entwickeln Sie die Funktion <code>gesamtkosten(team: Liste von Mitarbeiter): Gleitkommazahl</code> und erläutern Sie, wo Polymorphie wirkt. (3 P)",
      solution: pre(`
abstrakte klasse Mitarbeiter
  geschützt name: Text
  öffentlich konstruktor Mitarbeiter(name: Text)
    this.name = name
  ende konstruktor
  öffentlich abstrakte methode monatskosten(): Gleitkommazahl
ende klasse

klasse Festangestellter erbt von Mitarbeiter
  privat gehalt: Gleitkommazahl
  öffentlich konstruktor Festangestellter(name: Text, gehalt: Gleitkommazahl)
    super(name)
    this.gehalt = gehalt
  ende konstruktor
  öffentlich methode monatskosten(): Gleitkommazahl
    rückgabe gehalt * 1.2
  ende methode
ende klasse

klasse Freelancer erbt von Mitarbeiter
  privat stundensatz: Gleitkommazahl
  privat stunden: Gleitkommazahl
  öffentlich konstruktor Freelancer(name: Text, satz: Gleitkommazahl, stunden: Gleitkommazahl)
    super(name)
    this.stundensatz = satz
    this.stunden = stunden
  ende konstruktor
  öffentlich methode monatskosten(): Gleitkommazahl
    rückgabe stundensatz * stunden
  ende methode
ende klasse

funktion gesamtkosten(team: Liste von Mitarbeiter): Gleitkommazahl
  var summe: Gleitkommazahl = 0.0
  für jedes m in team
    summe = summe + m.monatskosten()     // dynamisches Binden
  ende für
  rückgabe summe
ende funktion`) + "c) Die Variable <code>m</code> hat den statischen Typ Mitarbeiter. Erst <b>zur Laufzeit</b> wird anhand des tatsächlichen Objekts entschieden, welche <code>monatskosten()</code> ausgeführt wird. Eine neue Klasse (z. B. Werkstudent) muss nur von Mitarbeiter erben und die Methode implementieren – <code>gesamtkosten</code> bleibt unverändert (Open-Closed-Prinzip).",
      explanation: "Typische Fehler: <code>super(name)</code> vergessen, abstrakte Methode mit Rumpf schreiben, in <code>gesamtkosten</code> mit <code>instanceof</code>-Abfragen unterscheiden (widerspricht Polymorphie), 20 % als <code>gehalt + 0.2</code> statt <code>gehalt * 1.2</code>.",
      keywords: ["abstrakte klasse|abstract class", "abstrakte methode|abstract", "erbt von|extends", "super(name)|super(", "monatskosten", "1.2|1,2|0.2", "stundensatz * stunden|stundensatz*stunden", "für jedes|for", "m.monatskosten()|.monatskosten()", "polymorphie|dynamisch|laufzeit"],
      tags: ["abstrakt", "polymorphie", "vererbung"]
    },
    {
      id: "lvl-algo-oop-08", topic: "ga2-oop", type: "numeric", difficulty: 3, step: 2, points: 5,
      context: pre(`
klasse Artikel
  geschützt preis: Gleitkommazahl
  öffentlich konstruktor Artikel(p: Gleitkommazahl)
    this.preis = p
  ende konstruktor
  öffentlich methode getPreis(): Gleitkommazahl
    rückgabe preis
  ende methode
ende klasse

klasse Buch erbt von Artikel
  öffentlich konstruktor Buch(p: Gleitkommazahl)
    super(p)
  ende konstruktor
  öffentlich methode getPreis(): Gleitkommazahl
    rückgabe preis - 2
  ende methode
ende klasse

klasse Elektro erbt von Artikel
  öffentlich konstruktor Elektro(p: Gleitkommazahl)
    super(p)
  ende konstruktor
  öffentlich methode getPreis(): Gleitkommazahl
    rückgabe super.getPreis() + 5        // Entsorgungsgebühr
  ende methode
ende klasse

klasse Sonderangebot erbt von Elektro
  öffentlich konstruktor Sonderangebot(p: Gleitkommazahl)
    super(p)
  ende konstruktor
  öffentlich methode getPreis(): Gleitkommazahl
    rückgabe super.getPreis() * 0.5
  ende methode
ende klasse

var korb: Liste von Artikel = [neuer Artikel(20), neues Buch(30), neues Elektro(40), neues Sonderangebot(60)]
var summe: Gleitkommazahl = 0
für jedes a in korb
  summe = summe + a.getPreis()
ende für
ausgabe(summe)`),
      question: "Welcher Wert wird ausgegeben?",
      answer: 125.5, tolerance: 0.001,
      solution: "Dynamisches Binden – maßgeblich ist der Laufzeittyp:<br>Artikel(20): 20<br>Buch(30): 30 − 2 = 28<br>Elektro(40): Artikel.getPreis() + 5 = 45<br>Sonderangebot(60): <code>super.getPreis()</code> ruft <b>Elektro</b>.getPreis() = 60 + 5 = 65 → 65 · 0,5 = 32,5<br>Summe: 20 + 28 + 45 + 32,5 = <b>125,5</b>.",
      explanation: "<code>super.getPreis()</code> verweist immer auf die <b>direkte</b> Oberklasse, nicht auf die oberste. Typischer Fehler: beim Sonderangebot 60 · 0,5 = 30 rechnen (Gebühr vergessen) → 123. Obwohl die Liste den Typ <code>Artikel</code> hat, wird jeweils die überschriebene Methode ausgeführt.",
      tags: ["polymorphie", "super", "trace"]
    },
    {
      id: "lvl-algo-oop-09", topic: "ga2-oop", type: "code", lang: "pseudocode", difficulty: 3, step: 3, points: 10,
      context: "Ein Webshop unterstützt mehrere Zahlungsarten. Die Gebühren: <b>Kreditkarte</b> 2 % des Betrags, <b>PayPal</b> 0,35 € + 1,5 % des Betrags, <b>Rechnung</b> gebührenfrei, aber nur bis 1.000 € erlaubt. Die Kasse soll mit jeder Zahlungsart arbeiten, ohne deren konkrete Klasse zu kennen.",
      question: "a) Definieren Sie das Interface <code>Zahlungsart</code> mit den Methoden <code>gebuehr(betrag): Gleitkommazahl</code> und <code>istMoeglich(betrag): Wahrheitswert</code>. (2 P)<br>b) Implementieren Sie die drei Klassen. (5 P)<br>c) Entwickeln Sie die Methode <code>guenstigste(arten: Liste von Zahlungsart, betrag): Zahlungsart</code>, die unter den möglichen Zahlungsarten die mit der geringsten Gebühr liefert (null, falls keine möglich ist). (3 P)",
      solution: pre(`
interface Zahlungsart
  methode gebuehr(betrag: Gleitkommazahl): Gleitkommazahl
  methode istMoeglich(betrag: Gleitkommazahl): Wahrheitswert
ende interface

klasse Kreditkarte implementiert Zahlungsart
  öffentlich methode gebuehr(betrag: Gleitkommazahl): Gleitkommazahl
    rückgabe betrag * 0.02
  ende methode
  öffentlich methode istMoeglich(betrag: Gleitkommazahl): Wahrheitswert
    rückgabe wahr
  ende methode
ende klasse

klasse PayPal implementiert Zahlungsart
  öffentlich methode gebuehr(betrag: Gleitkommazahl): Gleitkommazahl
    rückgabe 0.35 + betrag * 0.015
  ende methode
  öffentlich methode istMoeglich(betrag: Gleitkommazahl): Wahrheitswert
    rückgabe wahr
  ende methode
ende klasse

klasse Rechnung implementiert Zahlungsart
  öffentlich methode gebuehr(betrag: Gleitkommazahl): Gleitkommazahl
    rückgabe 0.0
  ende methode
  öffentlich methode istMoeglich(betrag: Gleitkommazahl): Wahrheitswert
    rückgabe betrag <= 1000.0
  ende methode
ende klasse

methode guenstigste(arten: Liste von Zahlungsart, betrag: Gleitkommazahl): Zahlungsart
  var beste: Zahlungsart = null
  für jedes z in arten
    wenn z.istMoeglich(betrag) dann
      wenn beste == null ODER z.gebuehr(betrag) < beste.gebuehr(betrag) dann
        beste = z
      ende wenn
    ende wenn
  ende für
  rückgabe beste
ende methode`) + "Beispiel 2.000 €: Kreditkarte 40,00 €, PayPal 30,35 €, Rechnung nicht möglich → PayPal.",
      explanation: "Interfaces legen nur den <b>Vertrag</b> fest; jede Klasse liefert ihre eigene Implementierung. Die Kasse programmiert „gegen das Interface“ – neue Zahlungsarten (z. B. Apple Pay) brauchen keine Änderung an <code>guenstigste</code>. Typische Fehler: <code>beste == null</code> nicht prüfen (NullPointerException beim ersten Vergleich), unmögliche Zahlungsarten mitvergleichen, 1,5 % als 1.5 statt 0.015.",
      keywords: ["interface", "implementiert|implements", "gebuehr", "istmoeglich", "0.02|0,02", "0.35|0,35", "0.015|0,015", "<= 1000|<=1000", "beste == null|beste==null|null", "für jedes|for"],
      tags: ["interface", "polymorphie"]
    },
    {
      id: "lvl-algo-oop-10", topic: "ga2-oop", type: "code", lang: "pseudocode", difficulty: 3, step: 4, points: 9,
      context: "Ein Auszubildender hat für die Mitgliederverwaltung eines Sportvereins folgenden Code geschrieben (Java):" + pre(`
1  public class Mitglied {
2    public String name;
3    private int nr;
4    private int anzahl = 0;
5    public void Mitglied(String name) {
6      name = name;
7      anzahl++;
8      nr = anzahl;
9    }
10   public boolean gleicherName(Mitglied m) {
11     return this.name == m.name;
12   }
13 }
14 public class Jugendmitglied extends Mitglied {
15   private int alter;
16   public Jugendmitglied(String name, int alter) {
17     this.alter = alter;
18   }
19 }`),
      question: "Nennen Sie <b>sechs</b> Fehler bzw. Schwachstellen mit Zeilennummer und Auswirkung und geben Sie eine korrigierte Fassung an. Jedes Mitglied soll eine fortlaufende, eindeutige Nummer erhalten.",
      solution: "<ol><li>Zeile 2: <code>name</code> ist public → Kapselung verletzt; <code>private</code> + Getter.</li><li>Zeile 4: <code>anzahl</code> ist ein Objektattribut → jedes Objekt zählt bei 0 los, alle erhalten Nr. 1. Korrekt: <code>private static int anzahl</code>.</li><li>Zeile 5: <code>void</code> macht daraus eine normale Methode, keinen Konstruktor → der Standardkonstruktor wird verwendet, nichts wird gesetzt.</li><li>Zeile 6: <code>name = name</code> weist den Parameter sich selbst zu → <code>this.name = name</code>.</li><li>Zeile 11: Strings mit <code>==</code> vergleichen prüft die Referenz, nicht den Inhalt → <code>equals</code>.</li><li>Zeile 16/17: Aufruf <code>super(name)</code> fehlt → der Name wird nicht gesetzt (und es gibt nach Korrektur von Zeile 5 keinen parameterlosen Konstruktor mehr → Compilerfehler).</li></ol>" + pre(`
public class Mitglied {
  private static int anzahl = 0;
  private String name;
  private int nr;
  public Mitglied(String name) {
    this.name = name;
    anzahl++;
    this.nr = anzahl;
  }
  public String getName() { return name; }
  public int getNr() { return nr; }
  public boolean gleicherName(Mitglied m) {
    return this.name.equals(m.getName());
  }
}
public class Jugendmitglied extends Mitglied {
  private int alter;
  public Jugendmitglied(String name, int alter) {
    super(name);
    this.alter = alter;
  }
}`),
      explanation: "Diese Fehlerarten (static, Konstruktor mit Rückgabetyp, fehlendes this, == bei Strings, fehlendes super) gehören zu den häufigsten Fallen in GA2-Code-Analysen. Bei Fehlersuch-Aufgaben immer auch die <b>Auswirkung</b> nennen – das bringt in der Prüfung die Punkte.",
      keywords: ["static|statisch", "void|rückgabetyp|konstruktor", "this.name = name|this.name=name", "equals", "super(name)|super(", "private|privat", "zeile 4", "zeile 5", "zeile 11", "getname|getter"],
      tags: ["fehlersuche", "java", "static", "konstruktor"]
    },
    {
      id: "lvl-algo-oop-11", topic: "ga2-oop", type: "multi", difficulty: 3, step: 5, points: 5,
      context: pre(`
interface Druckbar
  methode drucke(): Text
ende interface

abstrakte klasse Dokument implementiert Druckbar
  geschützt titel: Text
  öffentlich konstruktor Dokument(titel: Text)
    this.titel = titel
  ende konstruktor
  öffentlich abstrakte methode seiten(): Ganzzahl
  öffentlich methode drucke(): Text
    rückgabe titel + " (" + seiten() + " S.)"
  ende methode
ende klasse

klasse Rechnung erbt von Dokument
  privat positionen: Ganzzahl
  öffentlich konstruktor Rechnung(titel: Text, positionen: Ganzzahl)
    super(titel)
    this.positionen = positionen
  ende konstruktor
  öffentlich methode seiten(): Ganzzahl
    rückgabe 1 + positionen div 20
  ende methode
ende klasse`),
      question: "Welche Aussagen sind richtig?",
      options: [
        c("var d: Dokument = neues Dokument(\"Info\")") + " ist zulässig.",
        c("var p: Druckbar = neue Rechnung(\"R-17\", 45)") + " ist zulässig.",
        c("neue Rechnung(\"R-17\", 45).drucke()") + " liefert \"R-17 (3 S.)\".",
        "Dokument muss die Methode drucke() nicht implementieren, weil die Klasse abstrakt ist – sie tut es hier aber.",
        "Rechnung müsste seiten() nicht implementieren, da Dokument bereits drucke() implementiert."
      ],
      correct: [1, 2, 3],
      solution: "Richtig: B, C, D.<br>A: Abstrakte Klassen sind nicht instanziierbar → Fehler.<br>B: Rechnung ist ein Dokument und damit Druckbar → zulässig (Polymorphie über das Interface).<br>C: seiten() = 1 + 45 div 20 = 1 + 2 = 3 → „R-17 (3 S.)“. drucke() aus Dokument ruft dynamisch die seiten()-Methode von Rechnung auf (Schablonenmethode).<br>D: Eine abstrakte Klasse darf Interface-Methoden offenlassen; hier ist drucke() aber implementiert.<br>E: Falsch – als konkrete Klasse muss Rechnung <b>jede</b> geerbte abstrakte Methode implementieren.",
      explanation: "Das Muster in C heißt <b>Template Method</b>: Die Oberklasse legt den Ablauf fest, Unterklassen liefern die variablen Teile. Häufige Falle: <code>45 div 20</code> ist Ganzzahldivision (= 2), nicht 2,25.",
      tags: ["abstrakt", "interface", "polymorphie"]
    }
  );

  // ===================== ga2-komplexitaet =====================
  add(
    // ---------- Leicht ----------
    {
      id: "lvl-algo-kx-01", topic: "ga2-komplexitaet", type: "mc", difficulty: 1, step: 1, points: 2,
      question: "Welche Zeitkomplexität hat die folgende Funktion in Abhängigkeit von n = laenge(a)?" + pre(`
funktion erstesUndLetztes(a: Array von Ganzzahl): Ganzzahl
  rückgabe a[0] + a[laenge(a) - 1]
ende funktion`),
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correct: [0],
      solution: "<b>O(1)</b> – konstant. Unabhängig von der Arraygröße werden genau zwei Zugriffe per Index und eine Addition ausgeführt.",
      explanation: "Hinweis: Die O-Notation fragt, wie die Laufzeit mit wachsendem n <b>wächst</b>. Ohne Schleife oder Rekursion über n ist der Aufwand konstant. Arrayzugriff per Index ist O(1), bei einer verketteten Liste wäre der Zugriff auf das letzte Element O(n).",
      tags: ["o-notation", "konstant"]
    },
    {
      id: "lvl-algo-kx-02", topic: "ga2-komplexitaet", type: "numeric", difficulty: 1, step: 2, points: 2,
      question: "Wie oft wird <code>ausgabe(i)</code> ausgeführt, wenn <b>n = 10</b> ist?" + pre(`
für i von 0 bis n - 1 schritt 2
  ausgabe(i)
ende für`),
      answer: 5, tolerance: 0,
      solution: "i = 0, 2, 4, 6, 8 → <b>5</b> Ausgaben (10 wäre größer als n − 1 = 9). Allgemein ⌈n / 2⌉ Durchläufe → trotzdem <b>O(n)</b>.",
      explanation: "Hinweis: Konstante Faktoren (hier ½) fallen in der O-Notation weg – „halb so viele Durchläufe“ bleibt linear. Typischer Fehler: 6 zählen, weil die obere Grenze mit n statt n − 1 gelesen wird.",
      tags: ["zaehlen", "o-notation"]
    },
    {
      id: "lvl-algo-kx-03", topic: "ga2-komplexitaet", type: "numeric", difficulty: 1, step: 3, points: 2,
      context: "Eine Kundendatei enthält 1.000 unsortierte Datensätze. Gesucht wird ein Kunde per <b>linearer Suche</b>.",
      question: "Wie viele Vergleiche sind im <b>schlechtesten Fall</b> (Worst Case) nötig?",
      answer: 1000, tolerance: 0,
      solution: "Worst Case: Der Kunde steht ganz am Ende oder ist nicht vorhanden → alle <b>1.000</b> Datensätze werden verglichen. Laufzeit O(n).",
      explanation: "Hinweis: Best Case = 1 Vergleich (erstes Element), Average Case ≈ n / 2 = 500. In der Prüfung wird meist nach dem Worst Case gefragt, weil er eine garantierte Obergrenze liefert. Eine binäre Suche bräuchte bei sortierten Daten höchstens 10 Vergleiche.",
      tags: ["worst case", "lineare suche"]
    },
    {
      id: "lvl-algo-kx-04", topic: "ga2-komplexitaet", type: "mc", difficulty: 1, step: 4, points: 2,
      question: "Welche Zeitkomplexität hat folgender Code (n = laenge(a))?" + pre(`
var summe: Ganzzahl = 0
für i von 0 bis laenge(a) - 1
  summe = summe + a[i]
ende für
var max: Ganzzahl = a[0]
für i von 1 bis laenge(a) - 1
  wenn a[i] > max dann
    max = a[i]
  ende wenn
ende für`),
      options: ["O(1)", "O(n)", "O(n²)", "O(2n²)"],
      correct: [1],
      solution: "Zwei Schleifen <b>nacheinander</b>: n + (n − 1) ≈ 2n Schritte → <b>O(n)</b>.",
      explanation: "Hinweis: Nacheinander → Aufwände <b>addieren</b> (O(n) + O(n) = O(n)). Nur <b>verschachtelte</b> Schleifen werden multipliziert (O(n · n) = O(n²)). „O(2n²)“ ist keine übliche Schreibweise – Konstanten entfallen.",
      tags: ["o-notation", "sequenz"]
    },
    {
      id: "lvl-algo-kx-05", topic: "ga2-komplexitaet", type: "order", difficulty: 1, step: 5, points: 3,
      question: "Ordnen Sie die Algorithmen nach ihrer Worst-Case-Zeitkomplexität – vom <b>schnellsten</b> zum <b>langsamsten</b> (n = Anzahl der Elemente).",
      items: [
        "Zugriff auf a[i] in einem Array – O(1)",
        "Binäre Suche in einem sortierten Array – O(log n)",
        "Lineare Suche – O(n)",
        "Merge Sort – O(n log n)",
        "Bubble Sort – O(n²)",
        "Alle Teilmengen einer Menge erzeugen – O(2ⁿ)"
      ],
      solution: "O(1) &lt; O(log n) &lt; O(n) &lt; O(n log n) &lt; O(n²) &lt; O(2ⁿ). Für n = 1.000: 1 · 10 · 1.000 · ca. 10.000 · 1.000.000 · unvorstellbar groß.",
      explanation: "Hinweis: Merken Sie sich zu jeder Klasse ein Beispiel. Exponentielle Laufzeit ist schon ab n ≈ 50 praktisch nicht mehr berechenbar.",
      tags: ["o-notation", "vergleich"]
    },
    {
      id: "lvl-algo-kx-06", topic: "ga2-komplexitaet", type: "numeric", difficulty: 1, step: 6, points: 2,
      context: "Ein Export-Algorithmus mit <b>linearer</b> Laufzeit O(n) benötigt für 1.000 Datensätze 2 Sekunden.",
      question: "Wie viele Sekunden sind für <b>4.000</b> Datensätze zu erwarten?",
      answer: 8, tolerance: 0.01, unit: "s",
      solution: "Linear: 4-fache Datenmenge → 4-fache Zeit. 2 s · 4 = <b>8 s</b>.",
      explanation: "Hinweis: Bei O(n²) wäre es 4² = 16-fach (32 s), bei O(log n) nur geringfügig mehr. Der Faktor ergibt sich, indem man das neue n ins Wachstum einsetzt: T(neu) = T(alt) · f(n_neu) / f(n_alt).",
      tags: ["hochrechnen", "linear"]
    },
    // ---------- Mittel ----------
    {
      id: "lvl-algo-kx-07", topic: "ga2-komplexitaet", type: "numeric", difficulty: 2, step: 1, points: 3,
      context: "Für ein Vereinsturnier soll jede Mannschaft genau einmal gegen jede andere spielen. Der Spielplan wird so erzeugt:" + pre(`
für i von 0 bis n - 1
  für j von i + 1 bis n - 1
    planeSpiel(i, j)
  ende für
ende für`),
      question: "Wie oft wird <code>planeSpiel</code> für <b>n = 6</b> Mannschaften aufgerufen?",
      answer: 15, tolerance: 0,
      solution: "i = 0: j = 1..5 → 5; i = 1: 4; i = 2: 3; i = 3: 2; i = 4: 1; i = 5: 0. Summe 5 + 4 + 3 + 2 + 1 = <b>15</b> = n(n − 1)/2 = 6 · 5 / 2.",
      explanation: "Obwohl die innere Schleife immer kürzer wird, ist die Gesamtzahl n(n − 1)/2 ≈ n²/2 → <b>O(n²)</b>. Typischer Fehler: 36 (n²) oder 30 (jedes Paar doppelt, wenn j bei 0 starten würde und nur i ≠ j ausgeschlossen wäre).",
      tags: ["verschachtelt", "zaehlen", "quadratisch"]
    },
    {
      id: "lvl-algo-kx-08", topic: "ga2-komplexitaet", type: "mc", difficulty: 2, step: 2, points: 3,
      question: "Welche Zeitkomplexität hat der folgende Code?" + pre(`
für i von 1 bis n
  var j: Ganzzahl = 1
  solange j < n
    ausgabe(i * j)
    j = j * 2
  ende solange
ende für`),
      options: ["O(n)", "O(log n)", "O(n log n)", "O(n²)"],
      correct: [2],
      solution: "Die äußere Schleife läuft n-mal. Die innere verdoppelt j bei jedem Durchlauf → etwa log₂ n Durchläufe. Verschachtelt: n · log n → <b>O(n log n)</b>.",
      explanation: "Merkregel: Wird die Laufvariable <b>multipliziert</b> oder <b>geteilt</b> (j · 2, n div 2), ergibt sich ein logarithmischer Anteil. Diese Kombination findet sich z. B. bei Merge Sort (log n Ebenen × n Arbeit pro Ebene).",
      tags: ["logarithmisch", "verschachtelt"]
    },
    // ---------- Schwer ----------
    {
      id: "lvl-algo-kx-09", topic: "ga2-komplexitaet", type: "numeric", difficulty: 3, step: 1, points: 5,
      question: "Wie oft wird <code>z = z + 1</code> für <b>n = 5</b> ausgeführt?" + pre(`
var z: Ganzzahl = 0
für i von 0 bis n - 1
  für j von 0 bis i
    für k von j bis i
      z = z + 1
    ende für
  ende für
ende für`),
      answer: 35, tolerance: 0,
      solution: "Für festes i läuft j von 0 bis i und k von j bis i, also (i − j + 1) Durchläufe. Summe über j: (i + 1) + i + … + 1 = (i + 1)(i + 2)/2.<br>i = 0: 1 · i = 1: 3 · i = 2: 6 · i = 3: 10 · i = 4: 15<br>Summe: 1 + 3 + 6 + 10 + 15 = <b>35</b> (Tetraederzahl, allgemein n(n + 1)(n + 2)/6).",
      explanation: "Drei abhängige verschachtelte Schleifen ergeben ≈ n³/6 Durchläufe → <b>O(n³)</b>. Strategie: von innen nach außen zählen und die Summe pro i tabellieren. Typischer Fehler: k von 0 statt von j laufen lassen.",
      tags: ["verschachtelt", "kubisch", "zaehlen"]
    },
    {
      id: "lvl-algo-kx-10", topic: "ga2-komplexitaet", type: "numeric", difficulty: 3, step: 2, points: 4,
      context: "Ein Abgleich zweier Kundenlisten ist mit einem Algorithmus der Komplexität <b>O(n²)</b> implementiert. Für n = 2.000 Datensätze benötigt er 0,5 Sekunden.",
      question: "Wie viele Sekunden sind für <b>n = 10.000</b> zu erwarten?",
      answer: 12.5, tolerance: 0.01, unit: "s",
      solution: "Faktor n: 10.000 / 2.000 = 5. Quadratisch → 5² = 25. 0,5 s · 25 = <b>12,5 s</b>.",
      explanation: "Mit einem O(n log n)-Verfahren (z. B. beide Listen sortieren und dann mischen) wären es nur ca. 0,5 s · 5 · log₂(10.000)/log₂(2.000) ≈ 0,5 · 5 · 1,21 ≈ 3 s – bei O(n) (Hash-Set) 2,5 s. Typischer Fehler: linear hochrechnen (2,5 s).",
      tags: ["hochrechnen", "quadratisch"]
    },
    {
      id: "lvl-algo-kx-11", topic: "ga2-komplexitaet", type: "code", lang: "pseudocode", difficulty: 3, step: 3, points: 10,
      context: "Ein Kassensystem soll prüfen, ob es in einer Liste von Gutscheinwerten <b>zwei verschiedene Gutscheine</b> gibt, deren Summe genau dem Rechnungsbetrag entspricht. Die bisherige Lösung:" + pre(`
funktion paarVorhanden(w: Array von Ganzzahl, ziel: Ganzzahl): Wahrheitswert
  für i von 0 bis laenge(w) - 1
    für j von i + 1 bis laenge(w) - 1
      wenn w[i] + w[j] == ziel dann
        rückgabe wahr
      ende wenn
    ende für
  ende für
  rückgabe falsch
ende funktion`),
      question: "a) Geben Sie die Zeitkomplexität der vorhandenen Lösung an und begründen Sie. (2 P)<br>b) Entwickeln Sie eine Lösung in <b>O(n)</b> mit einer Menge (<code>Set</code> mit <code>enthaelt(x)</code> und <code>hinzufuegen(x)</code> in O(1)). (5 P)<br>c) Nennen Sie eine alternative Lösung ohne Zusatzspeicher, wenn das Array <b>sortiert</b> ist, und deren Laufzeit. (3 P)",
      solution: "a) Zwei verschachtelte Schleifen, insgesamt n(n − 1)/2 Paarvergleiche im Worst Case → <b>O(n²)</b>." + pre(`
// b) O(n) mit Set
funktion paarVorhanden(w: Array von Ganzzahl, ziel: Ganzzahl): Wahrheitswert
  var gesehen: Set von Ganzzahl = neues Set()
  für i von 0 bis laenge(w) - 1
    wenn gesehen.enthaelt(ziel - w[i]) dann
      rückgabe wahr
    ende wenn
    gesehen.hinzufuegen(w[i])
  ende für
  rückgabe falsch
ende funktion

// c) sortiertes Array: Zwei-Zeiger-Technik, O(n), Speicher O(1)
funktion paarSortiert(w: Array von Ganzzahl, ziel: Ganzzahl): Wahrheitswert
  var links: Ganzzahl = 0
  var rechts: Ganzzahl = laenge(w) - 1
  solange links < rechts
    var s: Ganzzahl = w[links] + w[rechts]
    wenn s == ziel dann
      rückgabe wahr
    sonst wenn s < ziel dann
      links = links + 1
    sonst
      rechts = rechts - 1
    ende wenn
  ende solange
  rückgabe falsch
ende funktion`) + "Ist das Array unsortiert, kostet vorheriges Sortieren O(n log n) – dann ist c) insgesamt O(n log n).",
      explanation: "Kernidee b): Für jedes Element wird nicht nach <i>allen</i> Partnern gesucht, sondern gezielt nach dem einen passenden (<code>ziel - w[i]</code>). Das Element wird <b>erst nach</b> der Prüfung eingefügt – sonst würde ein Gutschein mit dem halben Zielbetrag mit sich selbst kombiniert. Zeit gegen Speicher: b) braucht O(n) Zusatzspeicher.",
      keywords: ["o(n²)|o(n^2)|quadratisch", "set|menge|hashset", "enthaelt|contains", "ziel - w[i]|ziel-w[i]", "hinzufuegen|add", "für|for", "links|rechts", "sortiert", "o(n)|linear", "rückgabe|return"],
      tags: ["optimierung", "hashset", "zwei-zeiger"]
    },
    {
      id: "lvl-algo-kx-12", topic: "ga2-komplexitaet", type: "text", difficulty: 3, step: 4, points: 8,
      context: "Ein Online-Händler importiert jede Nacht ca. 2 Millionen Bestellungen und muss <b>doppelte Bestellnummern</b> finden. Drei Vorschläge liegen vor:<br>(1) Jede Bestellnummer mit jeder anderen vergleichen.<br>(2) Bestellnummern mit Merge Sort sortieren, dann benachbarte Einträge vergleichen.<br>(3) Alle Nummern in ein HashSet einfügen; ist eine Nummer schon enthalten, ist sie doppelt.",
      question: "Bewerten Sie die drei Vorschläge hinsichtlich <b>Zeit- und Speicherkomplexität</b> (jeweils mit Begründung) und geben Sie eine begründete Empfehlung ab.",
      solution: "<ul><li><b>(1) Paarweiser Vergleich:</b> zwei verschachtelte Schleifen, n(n − 1)/2 ≈ 2 · 10¹² Vergleiche → Zeit <b>O(n²)</b>, Speicher O(1). Für 2 Mio. Datensätze praktisch unbrauchbar (Stunden bis Tage).</li><li><b>(2) Sortieren + Nachbarvergleich:</b> Merge Sort O(n log n) (≈ 2 Mio. · 21 ≈ 42 Mio. Schritte) + ein linearer Durchlauf O(n) → gesamt <b>O(n log n)</b>. Speicher O(n) für Merge Sort (mit Heap Sort O(1)). Nebeneffekt: Daten liegen sortiert vor.</li><li><b>(3) HashSet:</b> n Einfüge-/Suchoperationen mit durchschnittlich O(1) → <b>O(n)</b> im Mittel (Worst Case bei vielen Kollisionen O(n²)). Speicher <b>O(n)</b> für die Hash-Tabelle.</li></ul><b>Empfehlung:</b> (3), da am schnellsten und einfach umzusetzen; der Speicherbedarf (2 Mio. Zahlen ≈ einige zehn MB) ist auf einem Server unkritisch. Ist der Speicher knapp oder werden die Daten ohnehin sortiert benötigt, ist (2) die robuste Alternative mit garantiertem O(n log n).",
      explanation: "In der Prüfung wird eine <b>Abwägung</b> erwartet: Zeit gegen Speicher, Average gegen Worst Case, Zusatznutzen (Sortierung). Konkrete Größenordnungen (Anzahl Operationen) machen die Begründung überzeugend.",
      keywords: ["o(n²)|o(n^2)|quadratisch", "o(n log n)|n log n|nlogn", "o(n)|linear", "speicher", "hash|hashset", "kollision", "sortier", "empfehl", "worst case|average|durchschnitt"],
      tags: ["bewertung", "duplikate", "speicher"]
    }
  );

  // ===================== Ergänzungen (order/text) =====================
  add(
    {
      id: "lvl-algo-pc-16", topic: "ga2-pseudocode", type: "order", difficulty: 1, step: 9, points: 4,
      context: "Eine Fitness-App speichert die Schrittzahlen eines Monats. Tage ohne getragene Uhr haben den Wert 0. Gesucht ist der Durchschnitt <b>nur der Tage mit Schritten</b> (Wert &gt; 0); gibt es keinen solchen Tag, wird 0 geliefert.",
      question: "Bringen Sie die Zeilen der Funktion <code>schnittAktiv</code> in die richtige Reihenfolge.",
      items: [
        "funktion schnittAktiv(s: Array von Ganzzahl): Gleitkommazahl",
        "var summe: Ganzzahl = 0; var anzahl: Ganzzahl = 0",
        "für i von 0 bis laenge(s) - 1",
        "wenn s[i] > 0 dann",
        "summe = summe + s[i]; anzahl = anzahl + 1",
        "ende wenn",
        "ende für",
        "wenn anzahl == 0 dann rückgabe 0.0 ende wenn",
        "rückgabe summe / anzahl",
        "ende funktion"
      ].map(esc),
      solution: pre(`
funktion schnittAktiv(s: Array von Ganzzahl): Gleitkommazahl
  var summe: Ganzzahl = 0; var anzahl: Ganzzahl = 0
  für i von 0 bis laenge(s) - 1
    wenn s[i] > 0 dann
      summe = summe + s[i]; anzahl = anzahl + 1
    ende wenn
  ende für
  wenn anzahl == 0 dann rückgabe 0.0 ende wenn
  rückgabe summe / anzahl
ende funktion`),
      explanation: "Hinweis: Diese Aufgabe kombiniert die Muster <b>Summe</b> und <b>Zählen mit Bedingung</b>. Geteilt wird durch die Anzahl der <i>gezählten</i> Tage, nicht durch laenge(s). Die Prüfung auf 0 muss <b>vor</b> der Division stehen. Achtung: In vielen Sprachen ist Ganzzahl / Ganzzahl eine Ganzzahldivision – in Java z. B. <code>(double) summe / anzahl</code>.",
      tags: ["array", "mittelwert", "zaehlen"]
    },
    {
      id: "lvl-algo-sort-15", topic: "ga2-sortieren-suchen", type: "order", difficulty: 3, step: 7, points: 5,
      context: "Kern von Merge Sort ist das <b>Mischen</b> zweier bereits sortierter Arrays <code>a</code> und <code>b</code> zu einem sortierten Ergebnis <code>e</code> (Länge laenge(a) + laenge(b)).",
      question: "Bringen Sie die Zeilen der Funktion <code>mische</code> in die richtige Reihenfolge.",
      items: [
        "var i = 0; var j = 0; var k = 0",
        "solange i < laenge(a) UND j < laenge(b)",
        "wenn a[i] <= b[j] dann e[k] = a[i]; i = i + 1",
        "sonst e[k] = b[j]; j = j + 1 ende wenn",
        "k = k + 1",
        "ende solange",
        "solange i < laenge(a): e[k] = a[i]; i = i + 1; k = k + 1 ende solange",
        "solange j < laenge(b): e[k] = b[j]; j = j + 1; k = k + 1 ende solange",
        "rückgabe e"
      ].map(esc),
      solution: pre(`
funktion mische(a: Array von Ganzzahl, b: Array von Ganzzahl): Array von Ganzzahl
  var e: Array von Ganzzahl = neues Array[laenge(a) + laenge(b)]
  var i = 0; var j = 0; var k = 0
  solange i < laenge(a) UND j < laenge(b)
    wenn a[i] <= b[j] dann e[k] = a[i]; i = i + 1
    sonst e[k] = b[j]; j = j + 1 ende wenn
    k = k + 1
  ende solange
  solange i < laenge(a): e[k] = a[i]; i = i + 1; k = k + 1 ende solange
  solange j < laenge(b): e[k] = b[j]; j = j + 1; k = k + 1 ende solange
  rückgabe e
ende funktion`),
      explanation: "Die Hauptschleife läuft nur, solange <b>beide</b> Arrays noch Elemente haben; danach wird der Rest des übrig gebliebenen Arrays kopiert (nur eine der beiden Restschleifen läuft tatsächlich). <code>&lt;=</code> statt <code>&lt;</code> macht Merge Sort <b>stabil</b>. Typischer Fehler: Restschleifen vergessen – dann fehlen Elemente im Ergebnis. Laufzeit O(laenge(a) + laenge(b)).",
      tags: ["mergesort", "mischen"]
    },
    {
      id: "lvl-algo-rek-14", topic: "ga2-rekursion", type: "text", difficulty: 3, step: 7, points: 8,
      context: "Die rekursive Funktion <code>gesamtGroesse(ordner)</code> eines Cloud-Speicherdienstes bricht bei einem Kunden mit einem automatisch erzeugten, extrem tief verschachtelten Verzeichnis (über 50.000 Ebenen) mit einem <code>StackOverflowError</code> ab.",
      question: "a) Erläutern Sie, warum der Fehler auftritt (Aufrufstack, Stackframe). (3 P)<br>b) Beschreiben Sie, wie die Funktion <b>iterativ</b> mit einer eigenen Datenstruktur umgesetzt werden kann, und skizzieren Sie den Ablauf. (3 P)<br>c) Nennen Sie je einen Vor- und Nachteil der rekursiven Lösung. (2 P)",
      solution: "a) Jeder Funktionsaufruf legt einen <b>Stackframe</b> (Parameter, lokale Variablen, Rücksprungadresse) auf dem Aufrufstack ab. Erst wenn ein Aufruf zurückkehrt, wird sein Frame freigegeben. Bei 50.000 Ebenen liegen 50.000 Frames gleichzeitig auf dem Stack; dessen Größe ist begrenzt (z. B. wenige MB in der JVM) → <b>StackOverflowError</b>.<br>b) Eigener <b>Stack</b> (oder Queue) auf dem Heap:" + pre(`
funktion gesamtGroesse(start: Ordner): Ganzzahl
  var summe: Ganzzahl = 0
  var offen: Stack von Ordner = neuer Stack()
  offen.push(start)
  solange NICHT offen.istLeer()
    var o: Ordner = offen.pop()
    für jedes d in o.getDateien()
      summe = summe + d.getGroesse()
    ende für
    für jedes u in o.getUnterordner()
      offen.push(u)
    ende für
  ende solange
  rückgabe summe
ende funktion`) + "Ablauf: Startordner ablegen; solange noch Ordner offen sind, einen entnehmen, seine Dateigrößen addieren und seine Unterordner ablegen. Der Heap ist deutlich größer als der Aufrufstack.<br>c) Vorteil Rekursion: kurz, lesbar, entspricht direkt der Baumstruktur. Nachteil: Speicherbedarf O(Tiefe) auf dem begrenzten Aufrufstack, Overhead durch Funktionsaufrufe.",
      explanation: "Jede Rekursion lässt sich mit einem expliziten Stack in eine Iteration umwandeln (mit Stack: Tiefensuche, mit Queue: Breitensuche). Für die Summe ist die Besuchsreihenfolge egal. Fachbegriffe, die in der Antwort fallen sollten: Aufrufstack, Stackframe, Rekursionstiefe, Heap.",
      keywords: ["stackframe|frame|aufrufstack|call stack", "stackoverflow", "tiefe|rekursionstiefe", "begrenzt|speicher", "stack|queue|warteschlange", "push", "pop", "solange|while", "iterativ|schleife", "lesbar|übersichtlich|uebersichtlich|kurz"],
      tags: ["rekursion", "iteration", "stack"]
    },
    {
      id: "lvl-algo-ds-13", topic: "ga2-datenstrukturen", type: "order", difficulty: 3, step: 6, points: 5,
      context: "Aus einem binären Suchbaum soll ein Knoten K gelöscht werden, der <b>zwei Kinder</b> hat. Verwendet wird das Verfahren mit dem <b>In-Order-Nachfolger</b>.",
      question: "Bringen Sie die Schritte in die richtige Reihenfolge.",
      items: [
        "Knoten K mit dem zu löschenden Schlüssel suchen (links/rechts je nach Vergleich)",
        "Im rechten Teilbaum von K so lange nach links gehen, bis kein linkes Kind mehr existiert → Nachfolger N",
        "Schlüssel (und Daten) von N in den Knoten K kopieren",
        "N aus dem rechten Teilbaum entfernen: Der Verweis seines Elternknotens zeigt nun auf das rechte Kind von N (ggf. null)",
        "Die Suchbaum-Eigenschaft ist erhalten: alle Schlüssel links von K sind kleiner, alle rechts größer"
      ],
      solution: "Der In-Order-Nachfolger N ist der <b>kleinste</b> Schlüssel im rechten Teilbaum. Er ist größer als alles links von K und kleiner als alles übrige rechts – passt also exakt an die Stelle von K. N hat höchstens ein (rechtes) Kind, deshalb ist sein Entfernen einfach (Fall 0 oder 1 Kind). Beispiel: Baum 50 (30, 70 (60, 80)) – Löschen von 50 → Nachfolger 60 rückt an die Wurzel.",
      explanation: "Gleichwertige Alternative: In-Order-<b>Vorgänger</b> (größter Schlüssel im linken Teilbaum). Typischer Fehler: einfach den rechten Teilbaum an die Stelle von K hängen – dann geht der linke Teilbaum verloren oder die Sortierung bricht.",
      tags: ["baum", "bst", "loeschen"]
    },
    {
      id: "lvl-algo-oop-12", topic: "ga2-oop", type: "text", difficulty: 1, step: 7, points: 4,
      context: "In einem Code-Review fallen in der Klasse <code>Rechner</code> zwei Methoden <code>addiere(a: Ganzzahl, b: Ganzzahl)</code> und <code>addiere(a: Gleitkommazahl, b: Gleitkommazahl)</code> auf. In der Unterklasse <code>Kassenrechner</code> gibt es außerdem eine eigene Methode <code>toString()</code>, die es auch in der Oberklasse gibt.",
      question: "Erläutern Sie die Begriffe <b>Überladen</b> und <b>Überschreiben</b> und ordnen Sie die beiden Beispiele aus dem Code-Review zu.",
      solution: "<b>Überladen (Overloading):</b> mehrere Methoden mit <b>gleichem Namen</b>, aber <b>unterschiedlicher Parameterliste</b> (Anzahl/Typen) in derselben Klasse. Welche aufgerufen wird, entscheidet der Compiler anhand der Argumente (statisch). → Die beiden <code>addiere</code>-Methoden.<br><b>Überschreiben (Overriding):</b> Eine Unterklasse stellt eine Methode mit <b>gleicher Signatur</b> wie die Oberklasse bereit und ersetzt deren Verhalten. Welche Version läuft, entscheidet sich zur <b>Laufzeit</b> am tatsächlichen Objekt (dynamisches Binden, Polymorphie). → <code>toString()</code> in Kassenrechner.",
      explanation: "Hinweis: Merkhilfe – Über<b>laden</b>: „mehr Ladung“, also mehr Varianten nebeneinander in einer Klasse. Über<b>schreiben</b>: die alte Version wird in der Unterklasse „überschrieben“. Ein nur anderer Rückgabetyp reicht zum Überladen nicht.",
      keywords: ["überladen|ueberladen|overloading", "parameter|parameterliste", "gleicher name|gleichen namen|selber name", "überschreiben|ueberschreiben|overriding", "unterklasse|oberklasse|vererbung", "signatur", "laufzeit|dynamisch", "compiler|kompilier|statisch"],
      tags: ["ueberladen", "ueberschreiben", "polymorphie"]
    }
  );

  qs.forEach(function (q) {
    q.part = "GA2";
    if (q.type === "code" && !q.lang) q.lang = "pseudocode";
  });
  AP2.questions.push.apply(AP2.questions, qs);
})();
