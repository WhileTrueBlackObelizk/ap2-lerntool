// Neues Prüfungsformat „Fehler finden und korrigieren“ (type: "bugfix") – Pseudocode und SQL
// Definiert KEINE eigenen Topics, nutzt die bestehenden GA2-Topics. IDs: fmt-bugfix-<nr>.
// Jeder Fehler = genau eine falsche Zeile, die durch eine korrigierte Zeile ersetzt wird.
window.AP2 = window.AP2 || { topics: [], questions: [], exams: [], generators: [] };
(function () {
  var qs = [];
  var esc = function (s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); };
  var lines = function (code) { return String(code).split("\n"); };

  // Tabellenübersicht aus dem setup erzeugen: „tabelle(spalte1, spalte2, …)“
  function schema(setup) {
    var out = [], re = /CREATE TABLE (\w+) \(([^;]*)\);/g, m;
    while ((m = re.exec(setup))) {
      var depth = 0, cur = "", parts = [];
      for (var i = 0; i < m[2].length; i++) {
        var ch = m[2][i];
        if (ch === "(") depth++;
        if (ch === ")") depth--;
        if (ch === "," && depth === 0) { parts.push(cur); cur = ""; } else cur += ch;
      }
      parts.push(cur);
      var cols = parts.map(function (p) { return p.trim().split(/\s+/)[0]; }).filter(function (c) { return c && !/^(PRIMARY|FOREIGN|CHECK|UNIQUE)$/i.test(c); });
      out.push("<code>" + m[1] + "(" + cols.join(", ") + ")</code>");
    }
    return out.length ? "<br>Tabellen: " + out.join(", ") : "";
  }

  function bf(o) {
    var n = o.bugs.length, sql = o.lang === "sql";
    var pron = o.pron || (sql ? "Sie" : "Er");
    var code = o.code.replace(/^\n/, "").replace(/\s+$/, "");
    var ls = lines(code);
    var fixed = ls.slice();
    o.bugs.forEach(function (b) { fixed[b.line - 1] = b.fix; });
    var q = {
      id: "fmt-bugfix-" + ("00" + (qs.length + 1)).slice(-3),
      part: "GA2", topic: o.topic, type: "bugfix", lang: sql ? "sql" : "pseudocode",
      difficulty: o.difficulty, points: o.points,
      context: o.context + (sql ? schema(o.sql.setup) : ""),
      question: o.task + " " + pron + " enthält genau " + (n === 1 ? "einen Fehler" : ["", "", "zwei", "drei"][n] + " Fehler") +
        ". Markieren Sie die fehlerhafte" + (n === 1 ? " Zeile und geben Sie die korrigierte Zeile an." : "n Zeilen und geben Sie jeweils die korrigierte Zeile an."),
      code: code,
      bugs: o.bugs,
      solution: "<ul>" + o.bugs.map(function (b) {
        return "<li><b>Zeile " + b.line + ":</b> <code>" + esc(b.fix.trim()) + "</code> statt <code>" + esc(ls[b.line - 1].trim()) + "</code> – " + b.why + "</li>";
      }).join("") + "</ul>" + (sql ? "Korrekte Anweisung:" : "Korrigierter Code:") + "<pre><code>" + esc(fixed.join("\n")) + "</code></pre>",
      explanation: o.explanation,
      tags: ["fehler-finden"].concat(o.tags || []),
    };
    if (sql) q.sql = o.sql;
    qs.push(q);
  }

  /* =============================================================== Pseudocode */

  // ---------- ga2-pseudocode ----------
  bf({
    topic: "ga2-pseudocode", difficulty: 1, points: 3,
    context: "Im Ticketsystem eines IT-Dienstleisters haben Tickets eine Priorität von 1 (niedrig) bis 5 (sehr hoch). Als <b>kritisch</b> gelten Tickets mit Priorität 4 oder 5.",
    task: "Der folgende Algorithmus soll die Anzahl der kritischen Tickets im Array <code>prio</code> ermitteln.",
    code: `funktion zaehleKritisch(prio: Array von Ganzzahl): Ganzzahl
    var anzahl: Ganzzahl = 0
    für i von 0 bis länge(prio) - 1
        wenn prio[i] < 4 dann
            anzahl = anzahl + 1
        ende wenn
    ende für
    rückgabe anzahl
ende funktion`,
    bugs: [
      { line: 4, fix: "        wenn prio[i] >= 4 dann", keys: ["prio[i]≥4|prio[i]>3|4≤prio[i]|3<prio[i]"], not: ["<4"],
        why: "Gezählt werden müssen die Prioritäten 4 und 5, also prio[i] ≥ 4. Mit „kleiner 4“ werden genau die unkritischen Tickets gezählt." },
    ],
    explanation: "Vergleichsoperatoren genau am Text prüfen: „4 oder 5“ heißt „mindestens 4“ (≥ 4 oder &gt; 3). Ein Schreibtischtest mit [5, 1, 4] zeigt den Fehler sofort: erwartet 2, geliefert 1.",
    tags: ["vergleich"],
  });

  bf({
    topic: "ga2-pseudocode", difficulty: 1, points: 3,
    context: "Ein Lagerverwaltungssystem speichert den Bestand eines Artikels je Lagerplatz in einem Array (Indizes ab 0).",
    task: "Der folgende Algorithmus soll den Gesamtbestand über alle Lagerplätze berechnen.",
    code: `funktion gesamtbestand(bestand: Array von Ganzzahl): Ganzzahl
    var summe: Ganzzahl = 0
    var i: Ganzzahl = 0
    solange i <= länge(bestand)
        summe = summe + bestand[i]
        i = i + 1
    ende solange
    rückgabe summe
ende funktion`,
    bugs: [
      { line: 4, fix: "    solange i < länge(bestand)", keys: ["i<länge(bestand)|i≤länge(bestand)-1|länge(bestand)>i"],
        why: "Der letzte gültige Index ist länge(bestand) − 1. Mit „≤ länge“ wird ein Element hinter dem Array-Ende gelesen (Off-by-one, Indexfehler)." },
    ],
    explanation: "Klassischer Off-by-one-Fehler: Bei 0-basierten Arrays läuft die Schleife bis <code>länge − 1</code>, die Bedingung lautet also <code>i &lt; länge(bestand)</code>.",
    tags: ["off-by-one", "solange"],
  });

  bf({
    topic: "ga2-pseudocode", difficulty: 2, points: 5,
    context: "Ein Fahrradverleih berechnet den Mietpreis: Die <b>erste</b> Stunde kostet 5,00 €, <b>jede weitere</b> Stunde 3,00 €. Pro Ausleihe werden jedoch höchstens 25,00 € (Tagesdeckel) berechnet.",
    task: "Der folgende Algorithmus soll den Mietpreis für eine Ausleihe von <code>stunden</code> Stunden berechnen.",
    code: `funktion mietpreis(stunden: Ganzzahl): Gleitkommazahl
    var preis: Gleitkommazahl = 0.0
    wenn stunden >= 1 dann
        preis = 5.0 + stunden * 3.0
    ende wenn
    wenn preis < 25.0 dann
        preis = 25.0
    ende wenn
    rückgabe preis
ende funktion`,
    bugs: [
      { line: 4, fix: "        preis = 5.0 + (stunden - 1) * 3.0", keys: ["(stunden-1)*3|3*(stunden-1)|3.0*(stunden-1)"],
        why: "Die erste Stunde ist mit 5,00 € schon bezahlt; nur die übrigen stunden − 1 Stunden kosten je 3,00 €." },
      { line: 6, fix: "    wenn preis > 25.0 dann", keys: ["preis>25|25<preis|preis≥25|25≤preis"],
        why: "Der Deckel greift nur, wenn der Preis über 25,00 € liegt. So wie notiert würde jede günstige Ausleihe auf 25,00 € angehoben." },
    ],
    explanation: "Schreibtischtest mit 3 Stunden: richtig 5 + 2 · 3 = 11 €. Der fehlerhafte Code liefert 5 + 3 · 3 = 14 € und hebt anschließend auf 25 € an. Bei Höchstbeträgen gilt: Begrenzen mit „wenn größer als Grenze, dann Grenze“ (oder <code>min(preis, 25.0)</code>).",
    tags: ["verzweigung", "preisberechnung"],
  });

  bf({
    topic: "ga2-pseudocode", difficulty: 3, points: 8,
    context: "In einem Hochregallager liefern Füllstandssensoren Messwerte in Prozent. Fällt ein Sensor aus, liefert er den Wert <code>-1.0</code>. Solche Werte dürfen nicht in den Mittelwert eingehen. Gibt es keinen gültigen Wert, soll 0.0 geliefert werden.",
    task: "Der folgende Algorithmus soll den Mittelwert aller gültigen Messwerte berechnen.",
    code: `funktion mittelwertGueltig(werte: Array von Gleitkommazahl): Gleitkommazahl
    var summe: Gleitkommazahl = 0.0
    var anzahl: Ganzzahl = 1
    für i von 1 bis länge(werte) - 1
        wenn werte[i] >= 0.0 dann
            summe = summe + werte[i]
            anzahl = anzahl + 1
        ende wenn
    ende für
    wenn anzahl == 0 dann
        rückgabe 0.0
    ende wenn
    rückgabe summe / länge(werte)
ende funktion`,
    bugs: [
      { line: 3, fix: "    var anzahl: Ganzzahl = 0", keys: ["anzahl:ganzzahl=0|anzahl=0"],
        why: "Der Zähler muss mit 0 starten, sonst ist die Anzahl immer um 1 zu hoch und die Prüfung auf 0 greift nie." },
      { line: 4, fix: "    für i von 0 bis länge(werte) - 1", keys: ["von0bis"],
        why: "Arrays sind 0-basiert; ab Index 1 wird der erste Messwert übersprungen." },
      { line: 13, fix: "    rückgabe summe / anzahl", keys: ["summe/anzahl"], not: ["länge"],
        why: "Geteilt werden muss durch die Anzahl der gültigen Werte, nicht durch die Anzahl aller Werte (inklusive Ausfälle)." },
    ],
    explanation: "Typische Fallen bei gefilterten Mittelwerten: Zähler falsch initialisiert, Schleifenstart bei 1, Division durch die Gesamtlänge statt durch die Anzahl der gezählten Werte. Test mit [-1.0, 40.0, 60.0]: richtig 50.0.",
    tags: ["mittelwert", "initialisierung"],
  });

  // ---------- ga2-sortieren-suchen ----------
  bf({
    topic: "ga2-sortieren-suchen", difficulty: 1, points: 3,
    context: "In der Artikelverwaltung eines Großhändlers sollen die Preise (in Cent) für eine Preisliste <b>aufsteigend</b> sortiert werden. Dazu wird Bubble Sort verwendet.",
    task: "Der folgende Algorithmus soll das Array <code>preise</code> aufsteigend sortieren.",
    code: `prozedur sortiere(preise: Array von Ganzzahl)
    var n: Ganzzahl = länge(preise)
    var tmp: Ganzzahl = 0
    für i von 0 bis n - 2
        für j von 0 bis n - 2 - i
            wenn preise[j] < preise[j + 1] dann
                tmp = preise[j]
                preise[j] = preise[j + 1]
                preise[j + 1] = tmp
            ende wenn
        ende für
    ende für
ende prozedur`,
    bugs: [
      { line: 6, fix: "            wenn preise[j] > preise[j + 1] dann", keys: ["preise[j]>preise[j+1]|preise[j+1]<preise[j]|preise[j]≥preise[j+1]"],
        why: "Getauscht wird, wenn das linke Element größer ist als das rechte. Mit „kleiner“ entsteht eine absteigende Sortierung." },
    ],
    explanation: "Beim Bubble Sort bestimmt allein der Vergleich die Sortierrichtung: <code>&gt;</code> sortiert aufsteigend, <code>&lt;</code> absteigend.",
    tags: ["bubblesort"],
  });

  bf({
    topic: "ga2-sortieren-suchen", difficulty: 2, points: 5,
    context: "Ein Hotel speichert die Buchungsnummern eines Tages <b>aufsteigend sortiert</b> in einem Array. Eine Buchung soll mit der <b>binären Suche</b> gefunden werden; wird sie nicht gefunden, liefert die Funktion -1.",
    task: "Der folgende Algorithmus soll den Index der gesuchten Buchungsnummer liefern.",
    code: `funktion binaereSuche(nr: Array von Ganzzahl, gesucht: Ganzzahl): Ganzzahl
    var links: Ganzzahl = 0
    var rechts: Ganzzahl = länge(nr) - 1
    solange links < rechts
        var mitte: Ganzzahl = (links + rechts) div 2
        wenn nr[mitte] == gesucht dann
            rückgabe mitte
        sonst wenn nr[mitte] < gesucht dann
            links = mitte
        sonst
            rechts = mitte - 1
        ende wenn
    ende solange
    rückgabe -1
ende funktion`,
    bugs: [
      { line: 4, fix: "    solange links <= rechts", keys: ["links≤rechts|rechts≥links"],
        why: "Auch ein Suchbereich aus genau einem Element (links = rechts) muss noch geprüft werden, sonst wird z. B. das letzte Element nie gefunden." },
      { line: 9, fix: "            links = mitte + 1", keys: ["links=mitte+1"],
        why: "nr[mitte] wurde bereits geprüft; ohne + 1 verkleinert sich der Bereich nicht immer und es droht eine Endlosschleife (z. B. links = 0, rechts = 1)." },
    ],
    explanation: "Die beiden klassischen Fehler der binären Suche: falsche Abbruchbedingung (<code>&lt;</code> statt <code>&lt;=</code>) und Grenzen, die die Mitte nicht ausschließen (<code>mitte</code> statt <code>mitte ± 1</code>).",
    tags: ["binaere-suche"],
  });

  bf({
    topic: "ga2-sortieren-suchen", difficulty: 3, points: 8,
    context: "Ein Schulungsanbieter sortiert die Teilnehmerzahlen seiner Kurse <b>aufsteigend</b> mit Insertion Sort.",
    task: "Der folgende Algorithmus soll das Array <code>a</code> mit Insertion Sort aufsteigend sortieren.",
    code: `prozedur insertionSort(a: Array von Ganzzahl)
    für i von 1 bis länge(a) - 1
        var schluessel: Ganzzahl = a[i]
        var j: Ganzzahl = i
        solange j > 0 und a[j] > schluessel
            a[j + 1] = a[j]
            j = j - 1
        ende solange
        a[j] = schluessel
    ende für
ende prozedur`,
    bugs: [
      { line: 4, fix: "        var j: Ganzzahl = i - 1", keys: ["j:ganzzahl=i-1|j=i-1"],
        why: "Verglichen wird ab dem Element links vom einzufügenden Schlüssel, also ab Index i − 1." },
      { line: 5, fix: "        solange j >= 0 und a[j] > schluessel", keys: ["j≥0|j>-1|0≤j"],
        why: "Auch Index 0 muss noch verglichen werden, sonst kann ein Schlüssel nie ganz nach vorne wandern." },
      { line: 9, fix: "        a[j + 1] = schluessel", keys: ["a[j+1]=schluessel"],
        why: "Nach der Schleife zeigt j auf das erste Element, das nicht größer ist; der Schlüssel gehört eine Position dahinter." },
    ],
    explanation: "Insertion Sort: Schlüssel merken, größere Elemente von rechts nach links um eins nach rechts schieben, Schlüssel in die Lücke <code>j + 1</code> setzen. Die Bedingung <code>j &gt;= 0</code> muss wegen der Kurzschlussauswertung <b>vor</b> dem Arrayzugriff stehen.",
    tags: ["insertionsort", "abbruchbedingung"],
  });

  bf({
    topic: "ga2-sortieren-suchen", difficulty: 3, points: 8,
    context: "Ein Fahrradverleih sucht das günstigste <b>verfügbare</b> Fahrrad. <code>preise[i]</code> enthält den Tagespreis, <code>verfuegbar[i]</code> gibt an, ob Fahrrad i frei ist. Geliefert werden soll der <b>Index</b> des Fahrrads oder -1, wenn keines verfügbar ist.",
    task: "Der folgende Algorithmus soll den Index des günstigsten verfügbaren Fahrrads liefern.",
    code: `funktion indexGuenstigstes(preise: Array von Gleitkommazahl, verfuegbar: Array von Wahrheitswert): Ganzzahl
    var pos: Ganzzahl = 0
    für i von 0 bis länge(preise) - 1
        wenn verfuegbar[i] dann
            wenn pos == -1 und preise[i] < preise[pos] dann
                pos = i
            ende wenn
        ende wenn
    ende für
    rückgabe preise[pos]
ende funktion`,
    bugs: [
      { line: 2, fix: "    var pos: Ganzzahl = -1", keys: ["pos:ganzzahl=-1|pos=-1"],
        why: "Mit 0 wäre Fahrrad 0 als Kandidat gesetzt, auch wenn es gar nicht verfügbar ist; -1 kennzeichnet „noch keines gefunden“ und ist zugleich das geforderte Ergebnis ohne Treffer." },
      { line: 5, fix: "            wenn pos == -1 oder preise[i] < preise[pos] dann", keys: ["oder", "preise[i]<preise[pos]|preise[pos]>preise[i]"],
        why: "Das erste verfügbare Fahrrad wird immer übernommen (pos = -1) ODER ein späteres, wenn es günstiger ist. Mit UND wird nie etwas übernommen." },
      { line: 10, fix: "    rückgabe pos", keys: ["rückgabepos"],
        why: "Gefordert ist der Index (Rückgabetyp Ganzzahl), nicht der Preis; außerdem wäre preise[-1] ein ungültiger Zugriff." },
    ],
    explanation: "Minimumsuche mit Filter: Startwert „noch nichts gefunden“ (-1), erster Treffer wird immer übernommen. Wegen der Kurzschlussauswertung wird <code>preise[pos]</code> bei <code>pos == -1</code> gar nicht erst ausgewertet.",
    tags: ["minimumsuche", "initialisierung"],
  });

  // ---------- ga2-rekursion ----------
  bf({
    topic: "ga2-rekursion", difficulty: 1, points: 3,
    context: "Ein Schulungsanbieter möchte wissen, in wie vielen Reihenfolgen n Teilnehmende ihre Kurzpräsentationen halten können. Das ist n! (Fakultät), mit 0! = 1 und 1! = 1.",
    task: "Der folgende rekursive Algorithmus soll n! berechnen.",
    code: `funktion fakultaet(n: Ganzzahl): Ganzzahl
    wenn n < 0 dann
        wirf neue IllegalArgumentException("n darf nicht negativ sein")
    ende wenn
    wenn n <= 1 dann
        rückgabe 0
    ende wenn
    rückgabe n * fakultaet(n - 1)
ende funktion`,
    bugs: [
      { line: 6, fix: "        rückgabe 1", keys: ["rückgabe1"],
        why: "Der Rekursionsanker muss 1 liefern (0! = 1! = 1). Mit 0 wird jedes Produkt zu 0." },
    ],
    explanation: "Beim Rekursionsanker auf das neutrale Element der Operation achten: bei Produkten 1, bei Summen 0.",
    tags: ["rekursionsanker"],
  });

  bf({
    topic: "ga2-rekursion", difficulty: 2, points: 5,
    context: "Eine Kassensoftware summiert die Tagesumsätze rekursiv. Der Aufruf <code>summeAb(umsaetze, 0)</code> soll die Summe aller Elemente liefern.",
    task: "Der folgende rekursive Algorithmus soll die Summe der Elemente <code>a[i]</code> bis <code>a[länge(a) - 1]</code> berechnen.",
    code: `// liefert die Summe von a[i] bis a[länge(a) - 1]
funktion summeAb(a: Array von Ganzzahl, i: Ganzzahl): Ganzzahl
    wenn i > länge(a) dann
        rückgabe 0
    ende wenn
    rückgabe a[i] + summeAb(a, i)
ende funktion
// Aufruf im Hauptprogramm
var gesamt: Ganzzahl = summeAb(umsaetze, 0)`,
    bugs: [
      { line: 3, fix: "    wenn i >= länge(a) dann", keys: ["i≥länge(a)|i=länge(a)|i>länge(a)-1|länge(a)≤i"],
        why: "Bei i = länge(a) gibt es kein Element mehr; der Anker muss dort greifen, sonst wird a[länge(a)] gelesen." },
      { line: 6, fix: "    rückgabe a[i] + summeAb(a, i + 1)", keys: ["summeab(a,i+1)"],
        why: "Der rekursive Aufruf muss das Problem verkleinern (nächster Index). Mit i bleibt alles gleich: Endlosrekursion bzw. Stack Overflow." },
    ],
    explanation: "Jede Rekursion braucht einen erreichbaren Anker und einen Aufruf, der sich dem Anker nähert. Beide Fehler zusammen führen hier zu einem StackOverflowError.",
    tags: ["rekursionsanker", "endlosrekursion"],
  });

  bf({
    topic: "ga2-rekursion", difficulty: 3, points: 8,
    context: "Im Lager sind die Artikelnummern aufsteigend sortiert im Array <code>artikelNr</code> gespeichert. Die Suche erfolgt mit einer <b>rekursiven</b> binären Suche; nicht gefunden = -1.",
    task: "Der folgende Algorithmus soll die Position der Artikelnummer 4711 rekursiv ermitteln.",
    code: `funktion suche(a: Array von Ganzzahl, x: Ganzzahl, links: Ganzzahl, rechts: Ganzzahl): Ganzzahl
    wenn links >= rechts dann
        rückgabe -1
    ende wenn
    var mitte: Ganzzahl = (links + rechts) div 2
    wenn a[mitte] == x dann
        rückgabe mitte
    sonst wenn a[mitte] < x dann
        rückgabe suche(a, x, mitte, rechts)
    sonst
        rückgabe suche(a, x, links, mitte - 1)
    ende wenn
ende funktion
// Aufruf
var pos: Ganzzahl = suche(artikelNr, 4711, 0, länge(artikelNr))`,
    bugs: [
      { line: 2, fix: "    wenn links > rechts dann", keys: ["links>rechts|rechts<links"],
        why: "Erst ein leerer Bereich (links größer als rechts) bedeutet „nicht gefunden“; bei links = rechts muss das eine Element noch geprüft werden." },
      { line: 9, fix: "        rückgabe suche(a, x, mitte + 1, rechts)", keys: ["mitte+1,rechts"],
        why: "a[mitte] ist schon geprüft; ohne + 1 schrumpft der Bereich nicht und die Rekursion endet ggf. nie." },
      { line: 15, fix: "var pos: Ganzzahl = suche(artikelNr, 4711, 0, länge(artikelNr) - 1)", keys: ["länge(artikelnr)-1"],
        why: "rechts ist ein Index; der letzte gültige Index ist länge − 1, sonst droht ein Zugriff hinter das Array-Ende." },
    ],
    explanation: "Rekursive binäre Suche: Anker „Bereich leer“ (<code>links &gt; rechts</code>), Teilbereiche ohne die Mitte (<code>mitte + 1</code> / <code>mitte - 1</code>), Startaufruf mit den Indexgrenzen <code>0</code> und <code>länge − 1</code>.",
    tags: ["binaere-suche", "rekursionsanker"],
  });

  // ---------- ga2-datenstrukturen ----------
  bf({
    topic: "ga2-datenstrukturen", difficulty: 1, points: 3,
    context: "Die Rückgängig-Funktion eines Ticketsystems speichert die letzten Aktionen in einem Stack, der als Array mit <b>10 Plätzen</b> (Indizes 0–9) umgesetzt ist. <code>anzahl</code> ist die Anzahl der belegten Plätze.",
    task: "Der folgende Algorithmus soll eine Aktion auf den Stack legen und <code>falsch</code> liefern, wenn der Stack voll ist.",
    code: `var daten: Array[10] von Ganzzahl
var anzahl: Ganzzahl = 0
funktion push(aktion: Ganzzahl): Wahrheitswert
    wenn anzahl > 10 dann
        rückgabe falsch
    ende wenn
    daten[anzahl] = aktion
    anzahl = anzahl + 1
    rückgabe wahr
ende funktion`,
    bugs: [
      { line: 4, fix: "    wenn anzahl >= 10 dann", keys: ["anzahl≥10|anzahl=10|anzahl>9|10≤anzahl"],
        why: "Bei anzahl = 10 sind alle Plätze belegt; schon dann muss abgelehnt werden, sonst wird daten[10] beschrieben." },
    ],
    explanation: "Voll-Prüfung bei Array-Stacks: <code>anzahl == kapazitaet</code> bzw. <code>anzahl &gt;= kapazitaet</code>. Mit <code>&gt;</code> wird einmal über das Array-Ende hinaus geschrieben.",
    tags: ["stack", "off-by-one"],
  });

  bf({
    topic: "ga2-datenstrukturen", difficulty: 2, points: 5,
    context: "Ein Druckserver verwaltet Aufträge in einer <b>Warteschlange (FIFO)</b>, die als Ringpuffer umgesetzt ist: Array <code>puffer</code> mit <code>KAP</code> Plätzen, <code>vorne</code> = Index des ältesten Auftrags, <code>hinten</code> = nächster freier Platz, <code>anzahl</code> = belegte Plätze.",
    task: "Der folgende Algorithmus soll Aufträge einreihen und den ältesten Auftrag entnehmen.",
    code: `funktion einreihen(auftrag: Ganzzahl): Wahrheitswert
    wenn anzahl == KAP dann
        rückgabe falsch
    ende wenn
    puffer[hinten] = auftrag
    hinten = hinten + 1
    anzahl = anzahl + 1
    rückgabe wahr
ende funktion
funktion entnehmen(): Ganzzahl
    wenn anzahl == 0 dann
        wirf neue LeereWarteschlangeException()
    ende wenn
    var auftrag: Ganzzahl = puffer[hinten]
    vorne = (vorne + 1) mod KAP
    anzahl = anzahl - 1
    rückgabe auftrag
ende funktion`,
    bugs: [
      { line: 6, fix: "    hinten = (hinten + 1) mod KAP", keys: ["modkap|%kap"],
        why: "Im Ringpuffer muss der Index nach dem letzten Platz wieder bei 0 beginnen; ohne mod läuft hinten aus dem Array." },
      { line: 14, fix: "    var auftrag: Ganzzahl = puffer[vorne]", keys: ["puffer[vorne]"],
        why: "FIFO: Entnommen wird der älteste Auftrag an Position vorne. puffer[hinten] ist der nächste freie (leere) Platz." },
    ],
    explanation: "Ringpuffer: Beide Zeiger werden mit <code>(index + 1) mod KAP</code> weitergesetzt. Einfügen hinten, Entnehmen vorne – sonst entsteht kein FIFO-Verhalten.",
    tags: ["queue", "ringpuffer"],
  });

  bf({
    topic: "ga2-datenstrukturen", difficulty: 3, points: 8,
    context: "Die Warteliste eines Hotels ist als einfach verkettete Liste umgesetzt. Ein Knoten hat die Attribute <code>wert</code> (Gast-Nr.) und <code>naechster</code>; die Liste hat das Attribut <code>kopf</code>.",
    task: "Der folgende Algorithmus soll den ersten Knoten mit dem gesuchten Wert aus der Liste entfernen und <code>wahr</code> liefern, wenn ein Knoten entfernt wurde.",
    code: `funktion entferne(liste: Liste, wert: Ganzzahl): Wahrheitswert
    wenn liste.kopf == null dann
        rückgabe falsch
    ende wenn
    wenn liste.kopf.wert == wert dann
        liste.kopf = null
        rückgabe wahr
    ende wenn
    var k: Knoten = liste.kopf
    solange k != null
        wenn k.naechster.wert == wert dann
            k.naechster = null
            rückgabe wahr
        ende wenn
        k = k.naechster
    ende solange
    rückgabe falsch
ende funktion`,
    bugs: [
      { line: 6, fix: "        liste.kopf = liste.kopf.naechster", keys: ["kopf=liste.kopf.naechster"],
        why: "Beim Entfernen des ersten Knotens wird der Kopf auf den Nachfolger gesetzt; mit null ginge die gesamte restliche Liste verloren." },
      { line: 10, fix: "    solange k.naechster != null", keys: ["k.naechster≠null"],
        why: "Im Rumpf wird k.naechster.wert gelesen; ist k der letzte Knoten, ist k.naechster null und es kommt zur NullPointerException." },
      { line: 12, fix: "            k.naechster = k.naechster.naechster", keys: ["k.naechster=k.naechster.naechster"],
        why: "Der zu löschende Knoten wird übersprungen, indem k auf dessen Nachfolger zeigt. Mit null wird alles hinter k abgeschnitten." },
    ],
    explanation: "Löschen in einer einfach verketteten Liste: Sonderfall Kopf, danach mit dem <b>Vorgänger</b> laufen (<code>k.naechster</code> prüfen) und den Knoten „ausketten“. Typische Fehler sind NullPointer am Listenende und verlorene Restlisten.",
    tags: ["verkettete-liste", "nullpointer"],
  });

  // ---------- ga2-oop ----------
  bf({
    topic: "ga2-oop", difficulty: 1, points: 3, pron: "Sie",
    context: "Ein Fahrradverleih bildet seine Räder als Objekte der Klasse <code>Fahrrad</code> ab. Ein Rad kann nur ausgeliehen werden, wenn es nicht bereits verliehen ist.",
    task: "Die folgende Klasse soll das Ausleihen und Zurückgeben eines Fahrrads abbilden.",
    code: `klasse Fahrrad
    privat nummer: Ganzzahl
    privat verliehen: Wahrheitswert = falsch
    öffentlich methode ausleihen(): Wahrheitswert
        wenn verliehen dann
            rückgabe falsch
        ende wenn
        verliehen = falsch
        rückgabe wahr
    ende methode
    öffentlich methode zurueckgeben()
        verliehen = falsch
    ende methode
ende klasse`,
    bugs: [
      { line: 8, fix: "        verliehen = wahr", keys: ["verliehen=wahr|verliehen=true"],
        why: "Nach erfolgreicher Ausleihe muss der Zustand auf verliehen gesetzt werden, sonst kann dasselbe Rad beliebig oft ausgeliehen werden." },
    ],
    explanation: "Methoden ändern den Zustand (Attribute) des Objekts. Ein Schreibtischtest mit zwei Aufrufen von <code>ausleihen()</code> zeigt den Fehler: Beide liefern <code>wahr</code>.",
    tags: ["zustand", "kapselung"],
  });

  bf({
    topic: "ga2-oop", difficulty: 2, points: 5,
    context: "Eine Hotelsoftware berechnet Übernachtungspreise. Für normale Zimmer gilt <code>preisProNacht · naechte</code>. Die Unterklasse <code>Suite</code> verlangt zusätzlich einen Zuschlag von 50,00 € <b>pro Nacht</b>.",
    task: "Der folgende Pseudocode soll die Preisberechnung für Zimmer und Suiten umsetzen.",
    code: `klasse Zimmer
    geschützt preisProNacht: Gleitkommazahl
    öffentlich methode berechnePreis(naechte: Ganzzahl): Gleitkommazahl
        rückgabe preisProNacht + naechte
    ende methode
ende klasse
klasse Suite erbt von Zimmer
    privat zuschlag: Gleitkommazahl = 50.0
    öffentlich methode berechnePreis(naechte: Ganzzahl): Gleitkommazahl
        var basis: Gleitkommazahl = super.berechnePreis(naechte)
        rückgabe basis + zuschlag
    ende methode
ende klasse`,
    bugs: [
      { line: 4, fix: "        rückgabe preisProNacht * naechte", keys: ["preispronacht*naechte|naechte*preispronacht"],
        why: "Der Grundpreis ergibt sich aus Preis pro Nacht mal Anzahl der Nächte." },
      { line: 11, fix: "        rückgabe basis + zuschlag * naechte", keys: ["zuschlag*naechte|naechte*zuschlag"],
        why: "Der Zuschlag fällt pro Nacht an, nicht einmalig." },
    ],
    explanation: "Beim Überschreiben wird mit <code>super.berechnePreis(…)</code> die Logik der Oberklasse wiederverwendet; ein Fehler dort wirkt sich auf alle Unterklassen aus. Test: 3 Nächte à 120 € in der Suite = 360 + 150 = 510 €.",
    tags: ["vererbung", "ueberschreiben"],
  });

  bf({
    topic: "ga2-oop", difficulty: 3, points: 8, pron: "Sie",
    context: "Ein Online-Shop für Werkzeug verwaltet den Warenkorb als Klasse. Positionen mit einer Menge kleiner als 1 sind unzulässig. Ab einem Warenwert von 100,00 € gibt es <b>5 % Rabatt</b> auf die gesamte Summe.",
    task: "Die folgende Klasse soll Positionen aufnehmen und den Gesamtpreis berechnen.",
    code: `klasse Warenkorb
    privat positionen: Liste von Position
    öffentlich methode hinzufuegen(p: Position)
        wenn p.getMenge() < 0 dann
            wirf neue IllegalArgumentException("Menge muss mindestens 1 sein")
        ende wenn
        positionen.hinzufuegen(p)
    ende methode
    öffentlich methode gesamtpreis(): Gleitkommazahl
        var summe: Gleitkommazahl = 0.0
        für jedes p in positionen
            summe = p.getMenge() * p.getEinzelpreis()
        ende für
        wenn summe >= 100.0 dann
            summe = summe * 0.05
        ende wenn
        rückgabe summe
    ende methode
ende klasse`,
    bugs: [
      { line: 4, fix: "        wenn p.getMenge() < 1 dann", keys: ["getmenge()<1|getmenge()≤0|1>p.getmenge()|0≥p.getmenge()"],
        why: "Auch die Menge 0 ist unzulässig; geprüft werden muss auf kleiner 1 (bzw. kleiner gleich 0)." },
      { line: 12, fix: "            summe = summe + p.getMenge() * p.getEinzelpreis()", keys: ["summe=summe+|summe+="],
        why: "Die Positionswerte müssen aufsummiert werden; so bleibt nur der Wert der letzten Position übrig." },
      { line: 15, fix: "            summe = summe * 0.95", keys: ["summe*0.95|0.95*summe|summe-summe*0.05"],
        why: "5 % Rabatt bedeutet, dass 95 % zu zahlen sind; summe * 0.05 wäre nur der Rabattbetrag." },
    ],
    explanation: "Drei Klassiker: Grenzwert der Validierung, Akkumulator überschrieben statt erhöht, Prozentrechnung (Rabattbetrag vs. Restbetrag). Test: 2 × 30 € + 1 × 50 € = 110 € → 104,50 €.",
    tags: ["validierung", "akkumulator", "prozent"],
  });

  // ---------- ga2-exceptions-formate ----------
  bf({
    topic: "ga2-exceptions-formate", difficulty: 1, points: 3, pron: "Sie",
    context: "Ein Ticketsystem berechnet die durchschnittliche Bearbeitungszeit. Wurden noch keine Tickets bearbeitet, soll eine <code>ArithmeticException</code> geworfen, gefangen, eine Meldung ausgegeben und 0.0 geliefert werden.",
    task: "Die folgende Funktion soll die durchschnittliche Bearbeitungszeit in Minuten berechnen.",
    code: `funktion schnitt(gesamtMin: Ganzzahl, anzahl: Ganzzahl): Gleitkommazahl
    versuche
        wenn anzahl > 0 dann
            wirf neue ArithmeticException("Keine Tickets bearbeitet")
        ende wenn
        rückgabe gesamtMin / anzahl
    fange (ArithmeticException e)
        ausgabe("Fehler: " + e.getMessage())
        rückgabe 0.0
    ende versuche
ende funktion`,
    bugs: [
      { line: 3, fix: "        wenn anzahl == 0 dann", keys: ["anzahl=0|anzahl≤0|anzahl<1"],
        why: "Die Ausnahme soll nur bei 0 Tickets (Division durch 0) geworfen werden; so wird sie gerade im Normalfall ausgelöst." },
    ],
    explanation: "Die Bedingung für das Werfen einer Ausnahme beschreibt den <b>Fehlerfall</b>. Hier ist er genau umgekehrt formuliert: Jeder gültige Aufruf liefert 0.0.",
    tags: ["exception", "division-durch-null"],
  });

  bf({
    topic: "ga2-exceptions-formate", difficulty: 2, points: 5, pron: "Sie",
    context: "Ein Lager importiert Bestände aus einer CSV-Datei. Jede Zeile hat das Format <code>artikelNr;bezeichnung;preis;bestand</code>, z. B. <code>4711;Schraube M6;0,25;1200</code>. Verfügbar sind <code>teile(text, trenner): Array von Text</code> und <code>parseGanzzahl(text): Ganzzahl</code> (wirft NumberFormatException).",
    task: "Die folgende Funktion soll den Bestand (4. Feld) einer CSV-Zeile liefern und bei fehlerhaften Zeilen eine <code>FormatException</code> werfen.",
    code: `funktion leseBestand(zeile: Text): Ganzzahl
    var felder: Array von Text = teile(zeile, ",")
    wenn länge(felder) != 4 dann
        wirf neue FormatException("Falsche Spaltenanzahl: " + zeile)
    ende wenn
    versuche
        rückgabe parseGanzzahl(felder[4])
    fange (NumberFormatException e)
        wirf neue FormatException("Bestand ist keine Zahl: " + felder[3])
    ende versuche
ende funktion`,
    bugs: [
      { line: 2, fix: "    var felder: Array von Text = teile(zeile, \";\")", keys: ["teile(zeile,';')"],
        why: "Trennzeichen der Datei ist das Semikolon; mit Komma wird zudem der Dezimalpreis „0,25“ zerteilt." },
      { line: 7, fix: "        rückgabe parseGanzzahl(felder[3])", keys: ["felder[3]"],
        why: "Das 4. Feld hat bei 0-basierten Arrays den Index 3; felder[4] existiert nicht." },
    ],
    explanation: "Bei CSV-Dateien deutscher Herkunft ist das Semikolon üblich, weil das Komma Dezimaltrennzeichen ist. Feldnummern („4. Feld“) und Indizes (3) nicht verwechseln.",
    tags: ["csv", "exception"],
  });

  /* ===================================================================== SQL */

  // ---------- ga2-sql-select ----------
  var FAHRRAD = `CREATE TABLE fahrrad (id INTEGER PRIMARY KEY, modell TEXT, typ TEXT, tagespreis REAL);
INSERT INTO fahrrad VALUES (1,'Cube Touring','Trekking',15.0),(2,'Kalkhoff Image','E-Bike',25.0),(3,'Riese Nevo','E-Bike',32.5),(4,'Gazelle Arroyo','E-Bike',22.0),(5,'Canyon Grand','Rennrad',18.0),(6,'Stevens Strada','Trekking',14.0),(7,'Haibike Trekking 4','E-Bike',24.5),(8,'Bergamont E-Ville','E-Bike',29.0);`;
  bf({
    lang: "sql", topic: "ga2-sql-select", difficulty: 1, points: 3,
    context: "Ein Fahrradverleih möchte Kunden ein günstiges E-Bike anbieten.",
    task: "Die folgende SQL-Anweisung soll Modell und Tagespreis aller E-Bikes mit einem Tagespreis von <b>höchstens</b> 25,00 € aufsteigend nach Preis ausgeben.",
    code: `SELECT modell, tagespreis
FROM fahrrad
WHERE typ = 'E-Bike' AND tagespreis < 25
ORDER BY tagespreis;`,
    bugs: [
      { line: 3, fix: "WHERE typ = 'E-Bike' AND tagespreis <= 25", keys: ["tagespreis≤25|25≥tagespreis"],
        why: "„Höchstens 25 €“ schließt 25 € ein; mit „kleiner“ fehlt das Kalkhoff Image (25,00 €)." },
    ],
    sql: { setup: FAHRRAD, solution: "SELECT modell, tagespreis FROM fahrrad WHERE typ = 'E-Bike' AND tagespreis <= 25 ORDER BY tagespreis;", ordered: true },
    explanation: "„höchstens“ = <code>&lt;=</code>, „mindestens“ = <code>&gt;=</code>, „unter/über“ = <code>&lt;</code>/<code>&gt;</code>. Grenzwerte immer mit einem Datensatz genau auf der Grenze testen.",
    tags: ["where", "vergleich"],
  });

  bf({
    lang: "sql", topic: "ga2-sql-select", difficulty: 2, points: 5,
    context: "Ein Hotel möchte Stammgäste aus Berlin und Hamburg anrufen, von denen <b>keine E-Mail-Adresse</b> hinterlegt ist.",
    task: "Die folgende SQL-Anweisung soll Name und Ort aller Gäste aus Berlin oder Hamburg ohne E-Mail-Adresse alphabetisch nach Name ausgeben.",
    code: `SELECT name, ort
FROM gast
WHERE ort = 'Berlin' OR ort = 'Hamburg'
    AND email = NULL
ORDER BY name;`,
    bugs: [
      { line: 3, fix: "WHERE (ort = 'Berlin' OR ort = 'Hamburg')", keys: ["(ort='berlin'orort='hamburg')|(ort='hamburg'orort='berlin')|ortin('berlin','hamburg')|ortin('hamburg','berlin')"],
        why: "AND bindet stärker als OR. Ohne Klammern gilt die E-Mail-Bedingung nur für Hamburg, alle Berliner Gäste würden ausgegeben." },
      { line: 4, fix: "    AND email IS NULL", keys: ["emailisnull"], not: ["=null"],
        why: "Ein Vergleich mit = NULL ergibt immer UNKNOWN (nie wahr). Auf fehlende Werte prüft man mit IS NULL." },
    ],
    sql: {
      setup: `CREATE TABLE gast (id INTEGER PRIMARY KEY, name TEXT, ort TEXT, email TEXT);
INSERT INTO gast VALUES (1,'Arslan, Deniz','Berlin',NULL),(2,'Becker, Jana','Hamburg','jana.becker@example.de'),(3,'Chen, Li','Berlin','li.chen@example.de'),(4,'Dietrich, Ole','Hamburg',NULL),(5,'Engel, Mara','München',NULL),(6,'Fischer, Tom','Berlin',NULL),(7,'Graf, Lea','Köln','lea.graf@example.de'),(8,'Hoffmann, Ina','Hamburg',NULL);`,
      solution: "SELECT name, ort FROM gast WHERE ort IN ('Berlin', 'Hamburg') AND email IS NULL ORDER BY name;",
      ordered: true,
    },
    explanation: "Zwei Klassiker: Operatorrangfolge (NOT vor AND vor OR – im Zweifel klammern oder <code>IN (…)</code> verwenden) und NULL-Vergleiche nur mit <code>IS NULL</code> / <code>IS NOT NULL</code>.",
    tags: ["null", "operatorrangfolge"],
  });

  // ---------- ga2-sql-join ----------
  bf({
    lang: "sql", topic: "ga2-sql-join", difficulty: 1, points: 3,
    context: "Ein Schulungsanbieter erstellt eine Übersicht seiner Kurse mit den zuständigen Trainerinnen und Trainern.",
    task: "Die folgende SQL-Anweisung soll zu jedem Kurs den Titel und den Namen des Trainers ausgeben, sortiert nach Titel.",
    code: `SELECT k.titel, t.name
FROM kurs k
JOIN trainer t ON k.id = t.id
ORDER BY k.titel;`,
    bugs: [
      { line: 3, fix: "JOIN trainer t ON k.trainer_id = t.id", keys: ["k.trainer_id=t.id|t.id=k.trainer_id"],
        why: "Verknüpft wird über den Fremdschlüssel kurs.trainer_id mit dem Primärschlüssel trainer.id, nicht über die beiden Primärschlüssel." },
    ],
    sql: {
      setup: `CREATE TABLE trainer (id INTEGER PRIMARY KEY, name TEXT);
INSERT INTO trainer VALUES (1,'Kaya'),(2,'Lorenz'),(3,'Meyer'),(4,'Novak'),(5,'Otto');
CREATE TABLE kurs (id INTEGER PRIMARY KEY, titel TEXT, trainer_id INTEGER REFERENCES trainer(id));
INSERT INTO kurs VALUES (1,'Java Grundlagen',3),(2,'SQL kompakt',1),(3,'Scrum in der Praxis',4),(4,'Python für Einsteiger',3),(5,'Git und GitHub',2),(6,'Linux-Administration',5),(7,'UML-Modellierung',1);`,
      solution: "SELECT k.titel, t.name FROM kurs k JOIN trainer t ON t.id = k.trainer_id ORDER BY k.titel;",
      ordered: true,
    },
    explanation: "Die JOIN-Bedingung verbindet immer <b>Fremdschlüssel = Primärschlüssel</b>. PK = PK liefert zwar ein Ergebnis, aber mit zufälligen, falschen Zuordnungen.",
    tags: ["join-bedingung"],
  });

  bf({
    lang: "sql", topic: "ga2-sql-join", difficulty: 2, points: 5,
    context: "Die Leitung eines IT-Supports möchte alle noch <b>offenen</b> Tickets mit dem zuständigen Mitarbeiter sehen.",
    task: "Die folgende SQL-Anweisung soll ID und Titel aller offenen Tickets sowie den Namen des zuständigen Mitarbeiters ausgeben, sortiert nach Ticket-ID.",
    code: `SELECT t.id, t.titel, m.name
FROM ticket t
JOIN mitarbeiter m ON t.id = m.id
WHERE t.status <> 'offen'
ORDER BY t.id;`,
    bugs: [
      { line: 3, fix: "JOIN mitarbeiter m ON t.mitarbeiter_id = m.id", keys: ["t.mitarbeiter_id=m.id|m.id=t.mitarbeiter_id"],
        why: "Das Ticket verweist über den Fremdschlüssel mitarbeiter_id auf den Mitarbeiter." },
      { line: 4, fix: "WHERE t.status = 'offen'", keys: ["status='offen'"],
        why: "Gesucht sind die offenen Tickets; der Ungleich-Operator liefert genau alle anderen." },
    ],
    sql: {
      setup: `CREATE TABLE mitarbeiter (id INTEGER PRIMARY KEY, name TEXT);
INSERT INTO mitarbeiter VALUES (1,'Sommer'),(2,'Weber'),(3,'Yilmaz'),(4,'Zimmer'),(5,'Albers');
CREATE TABLE ticket (id INTEGER PRIMARY KEY, titel TEXT, status TEXT, mitarbeiter_id INTEGER REFERENCES mitarbeiter(id));
INSERT INTO ticket VALUES (1,'Drucker offline','offen',2),(2,'VPN bricht ab','geschlossen',1),(3,'Passwort zurücksetzen','offen',3),(4,'Monitor flackert','in Arbeit',2),(5,'Mail-Postfach voll','offen',1),(6,'Lizenz abgelaufen','geschlossen',4),(7,'Laptop langsam','offen',2),(8,'Teams-Login','geschlossen',3);`,
      solution: "SELECT t.id, t.titel, m.name FROM ticket t JOIN mitarbeiter m ON t.mitarbeiter_id = m.id WHERE t.status = 'offen' ORDER BY t.id;",
      ordered: true,
    },
    explanation: "Erst die richtige Verknüpfung (FK = PK), dann die Filterbedingung genau nach Aufgabentext. <code>&lt;&gt;</code> bzw. <code>!=</code> kehrt die Auswahl um.",
    tags: ["join-bedingung", "where"],
  });

  bf({
    lang: "sql", topic: "ga2-sql-join", difficulty: 3, points: 8,
    context: "Ein Hotel plant die Belegung seiner Suiten über den Jahreswechsel.",
    task: "Die folgende SQL-Anweisung soll für alle Buchungen von Zimmern der Kategorie „Suite“ mit Anreise im <b>Dezember 2026</b> den Gastnamen, die Zimmernummer und das Anreisedatum ausgeben, <b>aufsteigend</b> nach Anreise sortiert.",
    code: `SELECT g.name, z.nr, b.anreise
FROM buchung b
JOIN gast g ON b.gast_id = b.id
JOIN zimmer z ON b.zimmer_id = z.id
WHERE z.kategorie = 'Suite'
    AND b.anreise BETWEEN '2026-12-01' AND '2026-12-30'
ORDER BY b.anreise DESC;`,
    bugs: [
      { line: 3, fix: "JOIN gast g ON b.gast_id = g.id", keys: ["b.gast_id=g.id|g.id=b.gast_id"],
        why: "Die JOIN-Bedingung vergleicht zwei Spalten derselben Tabelle buchung; gast wird gar nicht verknüpft und praktisch per Kreuzprodukt angehängt." },
      { line: 6, fix: "    AND b.anreise BETWEEN '2026-12-01' AND '2026-12-31'", keys: ["'2026-12-31'|<'2027-01-01'|like'2026-12-%'"],
        why: "Der Dezember hat 31 Tage; BETWEEN schließt beide Grenzen ein, die Anreise am 31.12. fehlt sonst." },
      { line: 7, fix: "ORDER BY b.anreise;", alt: ["ORDER BY b.anreise ASC;", "ORDER BY anreise;", "ORDER BY anreise ASC;"],
        why: "Gefordert ist eine aufsteigende Sortierung (ASC ist Standard); DESC sortiert absteigend." },
    ],
    sql: {
      setup: `CREATE TABLE gast (id INTEGER PRIMARY KEY, name TEXT);
INSERT INTO gast VALUES (1,'Bauer'),(2,'Krüger'),(3,'Lang'),(4,'Schulz'),(5,'Vogel');
CREATE TABLE zimmer (id INTEGER PRIMARY KEY, nr TEXT, kategorie TEXT);
INSERT INTO zimmer VALUES (1,'101','Einzel'),(2,'102','Doppel'),(3,'201','Suite'),(4,'202','Doppel'),(5,'301','Suite');
CREATE TABLE buchung (id INTEGER PRIMARY KEY, gast_id INTEGER REFERENCES gast(id), zimmer_id INTEGER REFERENCES zimmer(id), anreise TEXT);
INSERT INTO buchung VALUES (1,2,3,'2026-12-03'),(2,1,5,'2026-12-31'),(3,4,2,'2026-12-10'),(4,3,3,'2026-11-28'),(5,5,5,'2026-12-20'),(6,1,1,'2026-12-24'),(7,4,3,'2026-12-27'),(8,2,4,'2027-01-02');`,
      solution: "SELECT g.name, z.nr, b.anreise FROM buchung b JOIN gast g ON g.id = b.gast_id JOIN zimmer z ON z.id = b.zimmer_id WHERE z.kategorie = 'Suite' AND b.anreise >= '2026-12-01' AND b.anreise < '2027-01-01' ORDER BY b.anreise;",
      ordered: true,
    },
    explanation: "Bei mehreren JOINs jede Bedingung einzeln prüfen: Verbindet sie wirklich die neue Tabelle mit einer bereits vorhandenen? Datumsbereiche am sichersten als halboffenes Intervall (<code>&gt;= '2026-12-01' AND &lt; '2027-01-01'</code>) formulieren.",
    tags: ["join-bedingung", "datum", "order-by"],
  });

  // ---------- ga2-sql-aggregat ----------
  bf({
    lang: "sql", topic: "ga2-sql-aggregat", difficulty: 1, points: 3,
    context: "Ein Fahrradverleih mit mehreren Stationen wertet die Ausleihen aus.",
    task: "Die folgende SQL-Anweisung soll den <b>Gesamtumsatz</b> (Summe der Beträge) je Station ausgeben, absteigend nach Umsatz.",
    code: `SELECT station, COUNT(betrag) AS umsatz
FROM ausleihe
GROUP BY station
ORDER BY umsatz DESC;`,
    bugs: [
      { line: 1, fix: "SELECT station, SUM(betrag) AS umsatz", keys: ["sum(betrag)"],
        why: "COUNT zählt die Ausleihen, der Umsatz ist die Summe der Beträge (SUM)." },
    ],
    sql: {
      setup: `CREATE TABLE ausleihe (id INTEGER PRIMARY KEY, station TEXT, kunde TEXT, dauer_std INTEGER, betrag REAL);
INSERT INTO ausleihe VALUES (1,'Hauptbahnhof','K01',3,15.0),(2,'Altstadt','K02',8,32.0),(3,'Hauptbahnhof','K03',2,10.0),(4,'Uni','K04',5,20.0),(5,'Altstadt','K05',24,45.0),(6,'Hauptbahnhof','K06',1,5.0),(7,'Uni','K07',4,16.0),(8,'Hauptbahnhof','K08',6,24.0),(9,'Altstadt','K09',2,8.0);`,
      solution: "SELECT station, SUM(betrag) AS umsatz FROM ausleihe GROUP BY station ORDER BY umsatz DESC;",
      ordered: true,
    },
    explanation: "<code>COUNT</code> = Anzahl, <code>SUM</code> = Summe, <code>AVG</code> = Durchschnitt. Hier liefert COUNT Hauptbahnhof (4) vor Altstadt (3), obwohl die Altstadt den höchsten Umsatz hat.",
    tags: ["sum", "count"],
  });

  bf({
    lang: "sql", topic: "ga2-sql-aggregat", difficulty: 2, points: 5,
    context: "Ein Schulungsanbieter führt Kurse nur durch, wenn sich <b>mindestens drei</b> Personen angemeldet haben.",
    task: "Die folgende SQL-Anweisung soll alle Kurse mit mindestens drei Anmeldungen und die jeweilige Anzahl der Anmeldungen ausgeben.",
    code: `SELECT kurs, COUNT(*) AS anzahl
FROM anmeldung
GROUP BY teilnehmer
HAVING COUNT(*) > 3
ORDER BY anzahl DESC;`,
    bugs: [
      { line: 3, fix: "GROUP BY kurs", keys: ["groupbykurs"],
        why: "Gezählt werden soll je Kurs; gruppiert wurde nach Teilnehmer." },
      { line: 4, fix: "HAVING COUNT(*) >= 3", keys: ["count(*)≥3|count(*)>2|anzahl≥3|anzahl>2"],
        why: "„Mindestens drei“ schließt drei ein; mit „größer 3“ fallen Kurse mit genau drei Anmeldungen heraus." },
    ],
    sql: {
      setup: `CREATE TABLE anmeldung (id INTEGER PRIMARY KEY, kurs TEXT, teilnehmer TEXT);
INSERT INTO anmeldung VALUES (1,'Java','Ahmadi'),(2,'SQL','Ahmadi'),(3,'Java','Brandt'),(4,'Scrum','Brandt'),(5,'Python','Celik'),(6,'Java','Celik'),(7,'SQL','Dorn'),(8,'Python','Dorn'),(9,'Java','Ernst'),(10,'SQL','Ernst'),(11,'Python','Fuchs'),(12,'Scrum','Fuchs'),(13,'Git','Ahmadi');`,
      solution: "SELECT kurs, COUNT(*) FROM anmeldung GROUP BY kurs HAVING COUNT(*) >= 3;",
      ordered: false,
    },
    explanation: "Die Spalte im <code>GROUP BY</code> bestimmt, wofür je eine Ergebniszeile entsteht. SQLite erlaubt nicht gruppierte Spalten im SELECT (andere DBMS melden einen Fehler) – das Ergebnis ist dann aber unsinnig.",
    tags: ["group-by", "having"],
  });

  bf({
    lang: "sql", topic: "ga2-sql-aggregat", difficulty: 3, points: 8,
    context: "Ein Baumarkt analysiert seine Preise. Berücksichtigt werden nur Artikel, die <b>auf Lager</b> sind (Bestand größer 0).",
    task: "Die folgende SQL-Anweisung soll je Kategorie den auf zwei Stellen gerundeten Durchschnittspreis der lagernden Artikel ausgeben – nur Kategorien mit einem Durchschnitt über 20,00 €, absteigend sortiert.",
    code: `SELECT kategorie, ROUND(AVG(preis), 2) AS schnitt
FROM artikel
WHERE AVG(preis) > 20
GROUP BY kategorie, bezeichnung
HAVING bestand > 0
ORDER BY schnitt DESC;`,
    bugs: [
      { line: 3, fix: "WHERE bestand > 0", keys: ["wherebestand>0|wherebestand≥1|where0<bestand"],
        why: "Bedingungen auf einzelne Datensätze gehören vor die Gruppierung in WHERE. Aggregatfunktionen sind in WHERE nicht erlaubt." },
      { line: 4, fix: "GROUP BY kategorie", alt: ["GROUP BY artikel.kategorie"],
        why: "Gruppiert werden darf nur nach der Kategorie; mit bezeichnung entsteht je Artikel eine eigene Gruppe." },
      { line: 5, fix: "HAVING AVG(preis) > 20", keys: ["havingavg(preis)>20|havingschnitt>20|havinground(avg(preis),2)>20"],
        why: "Bedingungen auf Gruppenergebnisse (Aggregate) stehen in HAVING, nach dem GROUP BY." },
    ],
    sql: {
      setup: `CREATE TABLE artikel (id INTEGER PRIMARY KEY, bezeichnung TEXT, kategorie TEXT, preis REAL, bestand INTEGER);
INSERT INTO artikel VALUES (1,'Akkuschrauber','Werkzeug',89.0,5),(2,'Hammer','Werkzeug',12.5,0),(3,'Zange','Werkzeug',9.9,14),(4,'Wasserwaage','Werkzeug',24.0,3),(5,'Kabeltrommel','Elektro',39.0,2),(6,'Steckdosenleiste','Elektro',15.0,0),(7,'LED-Strahler','Elektro',29.0,6),(8,'Gartenschere','Garten',18.0,10),(9,'Gartenschlauch','Garten',22.0,0),(10,'Rasenkantenschere','Garten',16.0,4);`,
      solution: "SELECT kategorie, ROUND(AVG(preis), 2) FROM artikel WHERE bestand > 0 GROUP BY kategorie HAVING AVG(preis) > 20 ORDER BY 2 DESC;",
      ordered: true,
    },
    explanation: "Reihenfolge der Auswertung: <code>FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY</code>. WHERE filtert Zeilen <b>vor</b>, HAVING Gruppen <b>nach</b> der Gruppierung. Ohne den Lagerfilter läge z. B. Garten bei 18,67 €, Werkzeug bei 33,85 € statt 40,97 €.",
    tags: ["where-vs-having", "group-by"],
  });

  // ---------- ga2-sql-subquery ----------
  bf({
    lang: "sql", topic: "ga2-sql-subquery", difficulty: 2, points: 5,
    context: "Ein Fahrradverleih möchte Kunden, die seit Jahresbeginn 2026 <b>nichts</b> ausgeliehen haben, mit einem Gutschein zurückgewinnen.",
    task: "Die folgende SQL-Anweisung soll die Namen aller Kunden ausgeben, die seit dem 01.01.2026 keine Ausleihe hatten, alphabetisch sortiert.",
    code: `SELECT k.name
FROM kunde k
WHERE k.id IN (
    SELECT a.id
    FROM ausleihe a
    WHERE a.datum >= '2026-01-01'
)
ORDER BY k.name;`,
    bugs: [
      { line: 3, fix: "WHERE k.id NOT IN (", keys: ["notin("],
        why: "Gesucht sind Kunden, die NICHT in der Menge der Ausleihenden vorkommen." },
      { line: 4, fix: "    SELECT a.kunde_id", keys: ["kunde_id"],
        why: "Die Unterabfrage muss die Kundennummern liefern (Fremdschlüssel kunde_id), nicht die Ausleihnummern." },
    ],
    sql: {
      setup: `CREATE TABLE kunde (id INTEGER PRIMARY KEY, name TEXT);
INSERT INTO kunde VALUES (1,'Adler'),(2,'Brück'),(3,'Claasen'),(4,'Demir'),(5,'Eggers'),(6,'Franke'),(7,'Gül');
CREATE TABLE ausleihe (id INTEGER PRIMARY KEY, kunde_id INTEGER NOT NULL REFERENCES kunde(id), datum TEXT);
INSERT INTO ausleihe VALUES (1,2,'2026-03-14'),(2,4,'2025-11-02'),(3,2,'2026-05-01'),(4,5,'2026-07-19'),(5,1,'2025-08-30'),(6,7,'2026-02-11'),(7,3,'2026-09-09');`,
      solution: "SELECT k.name FROM kunde k WHERE NOT EXISTS (SELECT 1 FROM ausleihe a WHERE a.kunde_id = k.id AND a.datum >= '2026-01-01') ORDER BY k.name;",
      ordered: true,
    },
    explanation: "Bei <code>IN</code>/<code>NOT IN</code> muss die Unterabfrage Werte derselben Bedeutung liefern wie die verglichene Spalte (hier Kundennummern). Vorsicht: Enthält die Unterabfrage NULL, liefert NOT IN gar keine Zeilen – daher ist kunde_id hier NOT NULL.",
    tags: ["not-in", "unterabfrage"],
  });

  bf({
    lang: "sql", topic: "ga2-sql-subquery", difficulty: 3, points: 8,
    context: "Die Leitung eines IT-Supports möchte für jeden Mitarbeiter das Ticket mit der <b>längsten</b> Bearbeitungsdauer sehen.",
    task: "Die folgende SQL-Anweisung soll je Mitarbeiter Name, Tickettitel und Dauer des am längsten bearbeiteten Tickets ausgeben, <b>absteigend</b> nach Dauer.",
    code: `SELECT m.name, t.titel, t.dauer_min
FROM ticket t
JOIN mitarbeiter m ON t.mitarbeiter_id = m.id
WHERE t.dauer_min = (
    SELECT MIN(t2.dauer_min)
    FROM ticket t2
    WHERE t2.mitarbeiter_id = t.id
)
ORDER BY t.dauer_min;`,
    bugs: [
      { line: 5, fix: "    SELECT MAX(t2.dauer_min)", keys: ["max(t2.dauer_min)|max(dauer_min)"],
        why: "Gesucht ist die längste Dauer, also MAX." },
      { line: 7, fix: "    WHERE t2.mitarbeiter_id = t.mitarbeiter_id", keys: ["t2.mitarbeiter_id=t.mitarbeiter_id|t.mitarbeiter_id=t2.mitarbeiter_id|t2.mitarbeiter_id=m.id|m.id=t2.mitarbeiter_id"],
        why: "Die korrelierte Unterabfrage muss die Tickets desselben Mitarbeiters betrachten; t.id ist die Ticketnummer." },
      { line: 9, fix: "ORDER BY t.dauer_min DESC;", keys: ["desc"],
        why: "Gefordert ist eine absteigende Sortierung." },
    ],
    sql: {
      setup: `CREATE TABLE mitarbeiter (id INTEGER PRIMARY KEY, name TEXT);
INSERT INTO mitarbeiter VALUES (1,'Sommer'),(2,'Weber'),(3,'Yilmaz'),(4,'Albers'),(5,'Zimmer');
CREATE TABLE ticket (id INTEGER PRIMARY KEY, titel TEXT, dauer_min INTEGER, mitarbeiter_id INTEGER REFERENCES mitarbeiter(id));
INSERT INTO ticket VALUES (1,'Drucker offline',45,2),(2,'VPN bricht ab',120,1),(3,'Passwort zurücksetzen',10,3),(4,'Monitor flackert',30,2),(5,'Mail-Postfach voll',25,1),(6,'Server-Update',240,4),(7,'Laptop langsam',95,2),(8,'Teams-Login',15,3),(9,'Netzlaufwerk fehlt',60,3),(10,'Backup prüfen',35,4);`,
      solution: "SELECT m.name, t.titel, t.dauer_min FROM ticket t JOIN mitarbeiter m ON m.id = t.mitarbeiter_id WHERE t.dauer_min = (SELECT MAX(dauer_min) FROM ticket WHERE mitarbeiter_id = m.id) ORDER BY t.dauer_min DESC;",
      ordered: true,
    },
    explanation: "Korrelierte Unterabfrage: Sie wird für jede Zeile der äußeren Abfrage neu ausgewertet und muss über die richtige Spalte (hier mitarbeiter_id) mit ihr verbunden sein. Alternative: JOIN auf eine Unterabfrage mit <code>GROUP BY mitarbeiter_id</code> und <code>MAX(dauer_min)</code>.",
    tags: ["korreliert", "max"],
  });

  // ---------- ga2-sql-dml ----------
  bf({
    lang: "sql", topic: "ga2-sql-dml", difficulty: 1, points: 3,
    context: "Ein Baumarkt erhöht wegen gestiegener Einkaufspreise die Preise aller Artikel der Kategorie „Werkzeug“ um <b>10 %</b>.",
    task: "Die folgende SQL-Anweisung soll die Preiserhöhung durchführen.",
    code: `UPDATE artikel
SET preis = preis * 0.10
WHERE kategorie = 'Werkzeug';`,
    bugs: [
      { line: 2, fix: "SET preis = preis * 1.1", keys: ["preis*1.1|preis+preis*0.1|preis*110/100|1.1*preis"],
        why: "Eine Erhöhung um 10 % bedeutet 110 % des alten Preises (Faktor 1,1). Faktor 0,10 senkt den Preis auf ein Zehntel." },
    ],
    sql: {
      setup: `CREATE TABLE artikel (id INTEGER PRIMARY KEY, bezeichnung TEXT, kategorie TEXT, preis REAL);
INSERT INTO artikel VALUES (1,'Akkuschrauber','Werkzeug',89.0),(2,'Hammer','Werkzeug',12.5),(3,'Zange','Werkzeug',9.9),(4,'Kabeltrommel','Elektro',39.0),(5,'LED-Strahler','Elektro',29.0),(6,'Gartenschere','Garten',18.0),(7,'Wasserwaage','Werkzeug',24.0);`,
      solution: "UPDATE artikel SET preis = preis * 1.1 WHERE kategorie = 'Werkzeug';",
      check: "SELECT id, preis FROM artikel ORDER BY id",
    },
    explanation: "Prozentuale Erhöhung um p %: Faktor <code>1 + p/100</code>, Senkung: <code>1 − p/100</code>. Vor jedem UPDATE die WHERE-Bedingung prüfen – ohne sie wären alle Artikel betroffen.",
    tags: ["update", "prozent"],
  });

  bf({
    lang: "sql", topic: "ga2-sql-dml", difficulty: 3, points: 8,
    context: "Ein Schulungsanbieter speichert in <code>kurs.freie_plaetze</code> die Anzahl der freien Plätze. Sie soll für <b>alle</b> Kurse neu berechnet werden: maximale Teilnehmerzahl minus Anzahl der <b>nicht stornierten</b> Anmeldungen (<code>storniert</code> = 1 bedeutet storniert, 0 aktiv).",
    task: "Die folgende SQL-Anweisung soll die freien Plätze aller Kurse neu berechnen.",
    code: `UPDATE kurs
SET freie_plaetze = max_tn + (
    SELECT COUNT(*)
    FROM anmeldung a
    WHERE a.kurs_id = a.id
    AND a.storniert = 1
);`,
    bugs: [
      { line: 2, fix: "SET freie_plaetze = max_tn - (", keys: ["max_tn-("],
        why: "Belegte Plätze werden von der maximalen Teilnehmerzahl abgezogen, nicht addiert." },
      { line: 5, fix: "    WHERE a.kurs_id = kurs.id", keys: ["a.kurs_id=kurs.id|kurs.id=a.kurs_id"],
        why: "Die Unterabfrage muss mit der gerade aktualisierten Zeile der Tabelle kurs korreliert sein; a.kurs_id = a.id vergleicht nur Spalten von anmeldung." },
      { line: 6, fix: "    AND a.storniert = 0", keys: ["storniert=0|storniert≠1|storniert<1"],
        why: "Gezählt werden die aktiven, also nicht stornierten Anmeldungen (storniert = 0)." },
    ],
    sql: {
      setup: `CREATE TABLE kurs (id INTEGER PRIMARY KEY, titel TEXT, max_tn INTEGER, freie_plaetze INTEGER);
INSERT INTO kurs VALUES (1,'Java Grundlagen',12,12),(2,'SQL kompakt',10,10),(3,'Scrum in der Praxis',8,8),(4,'Python für Einsteiger',15,15),(5,'Git und GitHub',6,6);
CREATE TABLE anmeldung (id INTEGER PRIMARY KEY, kurs_id INTEGER REFERENCES kurs(id), teilnehmer TEXT, storniert INTEGER);
INSERT INTO anmeldung VALUES (1,1,'Ahmadi',0),(2,1,'Brandt',0),(3,1,'Celik',1),(4,2,'Dorn',0),(5,3,'Ernst',0),(6,3,'Fuchs',0),(7,3,'Gerber',0),(8,4,'Haas',1),(9,1,'Iversen',0),(10,5,'Jansen',0),(11,2,'Klein',1);`,
      solution: "UPDATE kurs SET freie_plaetze = max_tn - (SELECT COUNT(*) FROM anmeldung WHERE anmeldung.kurs_id = kurs.id AND anmeldung.storniert = 0);",
      check: "SELECT id, freie_plaetze FROM kurs ORDER BY id",
    },
    explanation: "UPDATE mit korrelierter Unterabfrage: Die Unterabfrage wird je Zeile von <code>kurs</code> ausgewertet und muss über <code>kurs.id</code> auf diese Zeile verweisen. Ergebnis hier: Java 9, SQL 9, Scrum 5, Python 15, Git 5.",
    tags: ["update", "korreliert"],
  });

  // ---------- ga2-sql-ddl ----------
  bf({
    lang: "sql", topic: "ga2-sql-ddl", difficulty: 2, points: 5,
    context: "Ein Fahrradverleih ergänzt seine Datenbank um die Tabelle <code>ausleihe</code>. Anforderungen: <code>id</code> ist Primärschlüssel; <code>fahrrad_id</code> verweist auf <code>fahrrad</code>, <code>kunde_id</code> auf <code>kunde</code> (beide Pflicht); <code>beginn</code> ist Pflicht; <code>rueckgabe</code> bleibt leer, solange das Rad unterwegs ist.",
    task: "Die folgende SQL-Anweisung soll die Tabelle <code>ausleihe</code> gemäß den Anforderungen anlegen.",
    code: `CREATE TABLE ausleihe (
    id INTEGER PRIMARY KEY,
    fahrrad_id INTEGER NOT NULL REFERENCES kunde(id),
    kunde_id INTEGER NOT NULL REFERENCES kunde(id),
    beginn TEXT NOT NULL,
    rueckgabe TEXT NOT NULL
);`,
    bugs: [
      { line: 3, fix: "    fahrrad_id INTEGER NOT NULL REFERENCES fahrrad(id),", keys: ["referencesfahrrad"],
        why: "Der Fremdschlüssel fahrrad_id muss auf die Tabelle fahrrad verweisen, nicht auf kunde." },
      { line: 6, fix: "    rueckgabe TEXT", alt: ["    rueckgabe TEXT NULL", "    rueckgabe DATE", "    rueckgabe DATE NULL"],
        why: "Beim Anlegen einer Ausleihe ist die Rückgabe noch unbekannt; die Spalte muss NULL zulassen, sonst kann keine Ausleihe eingetragen werden." },
    ],
    sql: {
      setup: `CREATE TABLE fahrrad (id INTEGER PRIMARY KEY, modell TEXT);
INSERT INTO fahrrad VALUES (1,'Cube Touring'),(2,'Kalkhoff Image'),(3,'Riese Nevo'),(4,'Gazelle Arroyo'),(5,'Canyon Grand');
CREATE TABLE kunde (id INTEGER PRIMARY KEY, name TEXT);
INSERT INTO kunde VALUES (1,'Adler'),(2,'Brück'),(3,'Claasen'),(4,'Demir'),(5,'Eggers');`,
      solution: "CREATE TABLE ausleihe (id INTEGER PRIMARY KEY, fahrrad_id INTEGER NOT NULL REFERENCES fahrrad(id), kunde_id INTEGER NOT NULL REFERENCES kunde(id), beginn TEXT NOT NULL, rueckgabe TEXT);",
      check: "SELECT name, type, \"notnull\", pk FROM pragma_table_info('ausleihe') UNION ALL SELECT \"from\", \"table\", 0, 0 FROM pragma_foreign_key_list('ausleihe')",
      ordered: false,
    },
    explanation: "Beim Prüfen eines CREATE TABLE jede Spalte gegen die Anforderungen abhaken: Datentyp, NOT NULL (Pflicht oder nicht?), Primärschlüssel, Fremdschlüssel mit der <b>richtigen</b> Zieltabelle.",
    tags: ["create-table", "fremdschluessel", "not-null"],
  });

  // step = laufende Nummer je Topic + Level
  var cnt = {};
  qs.forEach(function (q) { var k = q.topic + "|" + q.difficulty; cnt[k] = (cnt[k] || 0) + 1; q.step = cnt[k]; });

  AP2.questions.push.apply(AP2.questions, qs);
})();
