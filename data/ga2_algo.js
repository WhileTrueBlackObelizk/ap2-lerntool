window.AP2 = window.AP2 || { topics: [], questions: [], exams: [], generators: [] };
// GA2 – Entwicklung und Umsetzung von Algorithmen (ohne SQL)
// Pseudocode-Notation: siehe Lernzettel "ga2-pseudocode"

AP2.topics.push(
  {
    id: "ga2-pseudocode",
    part: "GA2",
    title: "Pseudocode, Struktogramm & Array-/String-Algorithmen",
    summary: `<h4>Pseudocode-Notation in diesem Lerntool (Java/C-nah, wie in der IHK üblich)</h4>
<pre><code>funktion summe(zahlen: Array von Ganzzahl): Ganzzahl
  var s: Ganzzahl = 0                 // Deklaration + Initialisierung
  für i von 0 bis laenge(zahlen) - 1  // Grenzen INKLUSIVE, Arrays 0-basiert
    s = s + zahlen[i]                 // "=" Zuweisung
  ende für
  rückgabe s
ende funktion

wenn x == 0 dann … sonst wenn x &lt; 0 dann … sonst … ende wenn
solange bedingung … ende solange        // kopfgesteuert (0..n Durchläufe)
wiederhole … bis bedingung              // fußgesteuert (mind. 1 Durchlauf)
für i von n - 1 bis 0 schritt -1 … ende für
prozedur ausgeben(text: Text)           // ohne Rückgabewert
ausgabe(x)  eingabe()  laenge(a)  zeichenAn(s, i)  teilstring(s, von, bis)</code></pre>
<ul>
<li>Vergleich <code>==</code>, <code>!=</code>; logisch <code>UND</code>, <code>ODER</code>, <code>NICHT</code>; Ganzzahldivision <code>div</code>, Rest <code>mod</code>.</li>
<li>Datentypen: Ganzzahl, Gleitkommazahl, Wahrheitswert, Zeichen, Text, Array von T, Liste von T. In der Prüfung ist jede eindeutige Notation (auch Java/Python) erlaubt – wichtig ist <b>Konsistenz und Lesbarkeit</b>.</li>
</ul>
<h4>Kontrollstrukturen</h4>
<ul><li><b>Sequenz</b>, <b>Verzweigung</b> (ein-/zweiseitig, Mehrfachauswahl), <b>Schleifen</b>: kopfgesteuert (while), fußgesteuert (do-while/repeat-until), Zählschleife (for).</li></ul>
<h4>Struktogramm (Nassi-Shneiderman, DIN 66261)</h4>
<ul><li>Rechteckblöcke; jeder Block hat genau einen Ein- und Ausgang, <b>kein goto</b>. Verzweigung = Dreieck mit „ja/nein“, Mehrfachauswahl = mehrere Spalten, kopfgesteuerte Schleife: Bedingung oben, fußgesteuerte: Bedingung unten.</li>
<li><b>PAP</b> (Programmablaufplan, DIN 66001): Oval = Start/Ende, Rechteck = Operation, Raute = Verzweigung, Parallelogramm = Ein-/Ausgabe, Pfeile = Ablauf.</li></ul>
<h4>Schreibtischtest (Trace-Tabelle)</h4>
<ul><li>Eine Spalte je Variable (+ Bedingung/Ausgabe), eine Zeile je Schritt/Durchlauf. Mit Grenzfällen testen: leeres Array, ein Element, negative Werte, Maximum am Anfang/Ende.</li></ul>
<h4>Standardmuster auf Arrays</h4>
<ul>
<li><b>Summe/Mittelwert</b>: Akkumulator mit 0 initialisieren; Division durch 0 bei leerem Array abfangen.</li>
<li><b>Min/Max</b>: mit dem <b>ersten Element</b> initialisieren (nicht mit 0 – Falle bei negativen Werten!), ab Index 1 vergleichen; Position merken.</li>
<li><b>Zählen/Filtern</b>: Zähler bzw. neue Liste, Bedingung im Schleifenrumpf.</li>
<li><b>Umkehren</b>: zwei Zeiger <code>links</code>/<code>rechts</code>, tauschen über <code>temp</code>, solange <code>links &lt; rechts</code>.</li>
<li><b>Duplikate</b>: doppelte Schleife (O(n²)) oder Set (O(n)).</li>
<li><b>2D-Array</b>: <code>m[zeile][spalte]</code>, äußere Schleife Zeilen, innere Spalten; Zeilen- bzw. Spaltensummen.</li>
</ul>
<h4>Strings & Validierung</h4>
<ul><li>Palindrom: Zeichen von außen nach innen vergleichen. Prüfziffer (z. B. EAN-13: Gewichte 1,3,1,3…; Prüfziffer = (10 − Summe mod 10) mod 10). Passwortregeln: Länge, Zeichenklassen zählen.</li>
<li><b>Schaltjahr</b>: <code>(j mod 4 == 0 UND j mod 100 != 0) ODER j mod 400 == 0</code> (1900 nein, 2000 ja, 2028 ja).</li></ul>
<p><b>Typische Fallen:</b> Off-by-one (<code>bis laenge(a)</code> statt <code>laenge(a) - 1</code>), fehlende Initialisierung, Index statt Wert zurückgeben, Endlosschleife (Zählvariable nicht verändert), Ganzzahldivision beim Mittelwert.</p>`
  },
  {
    id: "ga2-sortieren-suchen",
    part: "GA2",
    title: "Sortier- und Suchverfahren",
    summary: `<h4>Einfache Sortierverfahren (O(n²))</h4>
<ul>
<li><b>Bubble Sort</b>: benachbarte Elemente vergleichen und tauschen; nach Durchlauf k steht das k-größte Element am Ende. Optimierung: Abbruch, wenn in einem Durchlauf nicht getauscht wurde (Best Case O(n)). Stabil, in-place.</li>
<li><b>Selection Sort</b>: Minimum im unsortierten Rest suchen und mit dem ersten unsortierten Element tauschen. Immer n(n−1)/2 Vergleiche, max. n−1 Tausche. <b>Nicht stabil</b> (Standardvariante), in-place.</li>
<li><b>Insertion Sort</b>: nächstes Element in den bereits sortierten linken Teil einfügen (größere nach rechts schieben). Best Case (vorsortiert) O(n), stabil, in-place – gut für kleine/fast sortierte Daten.</li>
</ul>
<h4>Höhere Verfahren (Divide and Conquer)</h4>
<ul>
<li><b>Quick Sort</b>: Pivot wählen, partitionieren (kleiner links, größer rechts), rekursiv beide Teile sortieren. Average O(n log n), Worst O(n²) bei ungünstigem Pivot (z. B. sortierte Daten + erstes Element als Pivot). In-place, nicht stabil.</li>
<li><b>Merge Sort</b>: halbieren bis Länge 1, dann sortierte Teillisten <b>mischen</b> (merge). Immer O(n log n), stabil, braucht O(n) Zusatzspeicher.</li>
</ul>
<h4>Begriffe</h4>
<ul><li><b>Stabil</b>: gleiche Schlüssel behalten ihre ursprüngliche Reihenfolge (wichtig bei Mehrfachsortierung, z. B. erst nach Name, dann stabil nach PLZ).</li>
<li><b>In-place</b>: kein nennenswerter Zusatzspeicher (O(1) bzw. O(log n) Stack).</li></ul>
<h4>Suchen</h4>
<ul><li><b>Lineare Suche</b>: von vorn nach hinten; Best 1, Worst n, Average ≈ n/2 Vergleiche; keine Voraussetzung.</li>
<li><b>Binäre Suche</b>: <b>Voraussetzung sortiertes Array</b> (und wahlfreier Zugriff). Mitte <code>m = (links + rechts) div 2</code>; gefunden → fertig; gesucht &lt; a[m] → <code>rechts = m − 1</code>, sonst <code>links = m + 1</code>; Ende wenn <code>links &gt; rechts</code>. Max. ⌈log₂(n+1)⌉ Vergleiche (1000 Elemente → 10, 1 Mio → 20).</li></ul>
<h4>Prüfungstipps</h4>
<ul><li>Durchläufe von Hand: nach <b>jedem Durchlauf</b> den kompletten Array-Zustand notieren.</li>
<li>Anzahl Vertauschungen bei Bubble/Insertion Sort = Anzahl der <b>Fehlstellungen (Inversionen)</b>.</li>
<li>Typische Fehler: innere Schleife läuft bis <code>n − 1</code> statt <code>n − 2 − i</code> (Index-Überlauf bei <code>a[j+1]</code>), Tausch ohne Hilfsvariable, bei binärer Suche <code>rechts = m</code> statt <code>m − 1</code> (Endlosschleife).</li></ul>`
  },
  {
    id: "ga2-rekursion",
    part: "GA2",
    title: "Rekursion",
    summary: `<h4>Grundidee</h4>
<ul><li>Eine Funktion ruft sich selbst mit einem <b>kleineren Teilproblem</b> auf.</li>
<li><b>Rekursionsanker (Abbruchbedingung)</b>: Fall, der ohne weiteren Aufruf gelöst wird. <b>Rekursionsschritt</b>: Aufruf mit verkleinertem Argument, das sicher den Anker erreicht.</li>
<li>Fehlt der Anker oder wird er nie erreicht (z. B. <code>n − 2</code> bei ungeradem n und Anker <code>n == 0</code>) → unendliche Rekursion → <b>StackOverflowError</b>.</li></ul>
<h4>Klassiker</h4>
<pre><code>fakultaet(n) = 1                        wenn n &lt;= 1
             = n * fakultaet(n - 1)     sonst
fib(n)       = n                        wenn n &lt; 2
             = fib(n - 1) + fib(n - 2)  sonst   // Baumrekursion, O(2^n)
potenz(b, e) = 1 wenn e == 0, sonst b * potenz(b, e - 1)
ggT(a, b)    = a wenn b == 0, sonst ggT(b, a mod b)  // Euklid
binaer(n)    = Text(n) wenn n &lt; 2, sonst binaer(n div 2) + Text(n mod 2)
hanoi(n)     : 2^n − 1 Züge</code></pre>
<h4>Aufrufstack</h4>
<ul><li>Jeder Aufruf erhält einen eigenen <b>Stack-Frame</b> (Parameter, lokale Variablen, Rücksprungadresse). Die Frames werden nach <b>LIFO</b> abgebaut – Anweisungen <i>nach</i> dem rekursiven Aufruf laufen in umgekehrter Reihenfolge.</li>
<li>Aufrufe zählen: Fibonacci naiv: A(n) = A(n−1) + A(n−2) + 1 mit A(0) = A(1) = 1 → fib(5) = 15 Aufrufe.</li></ul>
<h4>Rekursion vs. Iteration</h4>
<table><tr><th></th><th>Rekursion</th><th>Iteration</th></tr>
<tr><td>Lesbarkeit</td><td>elegant bei rekursiven Strukturen (Bäume, Divide&amp;Conquer)</td><td>oft länger, aber direkt</td></tr>
<tr><td>Speicher</td><td>O(Tiefe) Stack, Overflow-Gefahr</td><td>meist O(1)</td></tr>
<tr><td>Laufzeit</td><td>Overhead je Aufruf, ggf. Mehrfachberechnung</td><td>schneller</td></tr></table>
<ul><li>Jede Rekursion lässt sich iterativ umsetzen (ggf. mit eigenem Stack). Endrekursion (Aufruf ist letzte Anweisung) ist leicht in eine Schleife umzuwandeln.</li>
<li>Mehrfachberechnungen vermeiden: <b>Memoisierung</b> (Zwischenergebnisse speichern) oder iterativ.</li></ul>
<p><b>Prüfungstipp:</b> Bei Trace-Aufgaben Aufrufbaum zeichnen, Rückgabewerte von unten nach oben eintragen.</p>`
  },
  {
    id: "ga2-datenstrukturen",
    part: "GA2",
    title: "Datenstrukturen",
    summary: `<h4>Array vs. verkettete Liste</h4>
<table><tr><th></th><th>Array</th><th>Verkettete Liste</th></tr>
<tr><td>Zugriff per Index</td><td>O(1)</td><td>O(n)</td></tr>
<tr><td>Einfügen/Löschen vorn/Mitte</td><td>O(n) (verschieben)</td><td>O(1) bei bekanntem Knoten</td></tr>
<tr><td>Größe</td><td>fest (dyn. Array: ArrayList wächst)</td><td>dynamisch</td></tr>
<tr><td>Speicher</td><td>zusammenhängend, kompakt</td><td>zusätzlicher Zeiger je Knoten</td></tr></table>
<h4>Stack & Queue</h4>
<ul><li><b>Stack (Stapel, LIFO)</b>: <code>push</code>, <code>pop</code>, <code>peek/top</code>, <code>istLeer</code>. Einsatz: Aufrufstack, Undo, Klammerprüfung, Tiefensuche.</li>
<li><b>Queue (Warteschlange, FIFO)</b>: <code>enqueue</code> (hinten), <code>dequeue</code> (vorn). Einsatz: Druckaufträge, Tickets, Breitensuche. Mit Array als <b>Ringpuffer</b>: <code>ende = (ende + 1) mod kapazitaet</code>.</li>
<li>Priority Queue: Entnahme nach Priorität (Heap).</li></ul>
<h4>Bäume</h4>
<ul><li>Wurzel, Knoten, Blätter, Höhe. <b>Binärbaum</b>: max. 2 Kinder. <b>Binärer Suchbaum</b>: links kleiner, rechts größer → Suche O(log n) wenn balanciert, O(n) wenn entartet (sortiert eingefügt).</li>
<li>Traversierung: <b>Preorder</b> (Wurzel–links–rechts), <b>Inorder</b> (links–Wurzel–rechts → bei BST sortiert!), <b>Postorder</b> (links–rechts–Wurzel, z. B. Löschen), Level-Order (Breitensuche mit Queue).</li></ul>
<h4>Hash-Tabelle</h4>
<ul><li>Hashfunktion bildet Schlüssel auf Index ab (z. B. <code>k mod m</code>, m möglichst Primzahl). Suchen/Einfügen im Mittel O(1).</li>
<li><b>Kollision</b>: zwei Schlüssel → gleicher Index. Lösungen: <b>Verkettung</b> (Liste je Bucket) oder <b>offene Adressierung/Sondieren</b> (linear: nächster freier Platz, quadratisch, Doppel-Hashing). Füllgrad (Load Factor) beachten → Rehashing.</li></ul>
<h4>Graphen</h4>
<ul><li>Knoten + Kanten (gerichtet/ungerichtet, gewichtet). <b>Adjazenzmatrix</b> n×n (O(n²) Speicher, Kantenprüfung O(1), gut für dichte Graphen); <b>Adjazenzliste</b> (O(n+m), gut für dünne Graphen).</li></ul>
<h4>Map/Set/Dictionary – Auswahl</h4>
<ul><li><b>Set</b>: keine Duplikate, schnelle Enthaltenseinsprüfung. <b>Map/Dictionary</b>: Schlüssel → Wert (z. B. Artikelnr → Artikel, Wort → Häufigkeit). <b>List</b>: Reihenfolge, Duplikate, Indexzugriff.</li></ul>
<p><b>Merksatz:</b> „Was muss schnell gehen?“ – Index → Array; vorn einfügen → Liste/Deque; Schlüssel-Suche → HashMap; sortiert durchlaufen → TreeMap/Suchbaum; letzter rein, erster raus → Stack.</p>`
  },
  {
    id: "ga2-oop",
    part: "GA2",
    title: "Objektorientierte Programmierung",
    summary: `<h4>Grundbegriffe</h4>
<ul><li><b>Klasse</b> = Bauplan (Attribute + Methoden), <b>Objekt</b> = Instanz mit eigenem Zustand. <b>Konstruktor</b> initialisiert das Objekt (gleicher Name wie Klasse, kein Rückgabetyp, überladbar).</li>
<li><b>Kapselung</b>: Attribute <code>privat</code>, Zugriff nur über Methoden (Getter/Setter) → Validierung, Invarianten, Änderbarkeit der Implementierung.</li>
<li><b>Sichtbarkeiten</b> (UML): <code>+</code> public, <code>-</code> private, <code>#</code> protected (Klasse + Unterklassen), <code>~</code> package.</li>
<li><b>Statisch</b> (UML unterstrichen): gehört zur Klasse, nicht zum Objekt (z. B. Instanzzähler, <code>Math.max</code>).</li></ul>
<h4>Vererbung & Polymorphie</h4>
<ul><li><b>Vererbung</b> (is-a): Unterklasse übernimmt Attribute/Methoden, erweitert oder <b>überschreibt</b> sie. Konstruktor der Oberklasse wird zuerst ausgeführt (<code>super(…)</code>).</li>
<li><b>Abstrakte Klasse</b>: nicht instanziierbar, kann abstrakte (ohne Rumpf) und konkrete Methoden + Attribute haben. <b>Interface</b>: Vertrag (Methodensignaturen), eine Klasse kann mehrere Interfaces implementieren (Java: nur eine Oberklasse).</li>
<li><b>Polymorphie</b>: Variable vom Typ der Oberklasse/des Interfaces verweist auf Unterklassen-Objekt; zur Laufzeit wird die überschriebene Methode aufgerufen (dynamisches Binden).</li>
<li><b>Überladen</b> (Overloading): gleicher Name, <i>andere Parameterliste</i>, in derselben Klasse, Auflösung zur Compilezeit. <b>Überschreiben</b> (Overriding): gleiche Signatur in Unterklasse, Auflösung zur Laufzeit.</li></ul>
<h4>Beziehungen im Code</h4>
<ul><li><b>Assoziation</b>: Attribut mit Referenz (<code>kunde: Kunde</code>); Multiplizität * → <code>Liste von …</code>.</li>
<li><b>Aggregation</b> (◇): Teile existieren unabhängig (Team – Mitarbeiter, Übergabe von außen).</li>
<li><b>Komposition</b> (◆): Teile existieren nur mit dem Ganzen; das Ganze erzeugt die Teile selbst (Bestellung – Bestellposition).</li></ul>
<h4>Pseudocode-Schema</h4>
<pre><code>klasse Konto
  privat saldo: Gleitkommazahl
  privat statisch anzahl: Ganzzahl = 0
  öffentlich konstruktor Konto(startSaldo: Gleitkommazahl)
    this.saldo = startSaldo
    anzahl = anzahl + 1
  ende konstruktor
  öffentlich methode getSaldo(): Gleitkommazahl
    rückgabe this.saldo
  ende methode
ende klasse
klasse Girokonto erbt von Konto … ende klasse
klasse Kunde implementiert Exportierbar … ende klasse</code></pre>
<ul><li>Collections: <code>für jedes k in kunden … ende für</code>, <code>liste.hinzufuegen(x)</code>, <code>liste.groesse()</code>.</li></ul>
<p><b>Typische Fehler:</b> <code>alter = alter</code> im Setter ohne <code>this</code>, Konstruktor mit Rückgabetyp, Strings mit <code>==</code> statt <code>equals</code> vergleichen, abstrakte Klasse instanziieren, Attribute public.</p>`
  },
  {
    id: "ga2-komplexitaet",
    part: "GA2",
    title: "Komplexität & O-Notation",
    summary: `<h4>O-Notation</h4>
<ul><li>Beschreibt das <b>Wachstum</b> von Laufzeit (oder Speicher) in Abhängigkeit von der Eingabegröße n – obere Schranke, Konstanten und niedrigere Terme werden weggelassen: 3n² + 5n + 7 ∈ O(n²).</li></ul>
<table><tr><th>Klasse</th><th>Name</th><th>Beispiel</th><th>n=1000</th></tr>
<tr><td>O(1)</td><td>konstant</td><td>Array-Zugriff, HashMap-get (Mittel)</td><td>1</td></tr>
<tr><td>O(log n)</td><td>logarithmisch</td><td>binäre Suche, balancierter Baum</td><td>≈10</td></tr>
<tr><td>O(n)</td><td>linear</td><td>lineare Suche, Summe, Min/Max</td><td>1000</td></tr>
<tr><td>O(n log n)</td><td>linear-logarithmisch</td><td>Merge Sort, Quick Sort (Mittel)</td><td>≈10 000</td></tr>
<tr><td>O(n²)</td><td>quadratisch</td><td>Bubble/Selection/Insertion Sort, Paarvergleich</td><td>1 000 000</td></tr>
<tr><td>O(2ⁿ)</td><td>exponentiell</td><td>naive Fibonacci, alle Teilmengen</td><td>astronomisch</td></tr></table>
<h4>Schleifen analysieren</h4>
<ul><li>Hintereinander: addieren → größter Term zählt (O(n) + O(n²) = O(n²)).</li>
<li>Verschachtelt: multiplizieren (n · n = n²). Innere Schleife mit <b>konstanter</b> Anzahl (z. B. 10) → O(n)!</li>
<li>Dreiecksschleife <code>j von i+1 bis n−1</code>: n(n−1)/2 Durchläufe → O(n²).</li>
<li>Variable wird halbiert/verdoppelt (<code>i = i * 2</code>) → O(log n).</li></ul>
<h4>Best / Worst / Average Case</h4>
<ul><li>Lineare Suche: Best 1 (erstes Element), Worst n (letztes/nicht vorhanden), Average n/2 → O(n).</li>
<li>Insertion Sort: Best O(n) (vorsortiert), Worst O(n²) (umgekehrt sortiert).</li>
<li>Quick Sort: Average O(n log n), Worst O(n²). Merge Sort: immer O(n log n).</li></ul>
<h4>Laufzeit hochrechnen</h4>
<ul><li>O(n²): n verdoppeln → Zeit ×4; n ×5 → Zeit ×25.</li>
<li>O(n log n): t₂ = t₁ · (n₂·log n₂)/(n₁·log n₁).</li>
<li>O(2ⁿ): n + 1 → Zeit verdoppelt sich.</li></ul>
<p><b>Optimierungsmuster:</b> verschachtelte Suche durch HashSet/HashMap ersetzen (O(n²) → O(n)), vorher sortieren + binär suchen (O(n log n)), Zwischenergebnisse wiederverwenden (gleitendes Fenster, Präfixsummen, Memoisierung). Speicher gegen Zeit tauschen (Space-Time-Tradeoff).</p>`
  },
  {
    id: "ga2-zahlensysteme",
    part: "GA2",
    title: "Zahlensysteme, Bits & Kodierung",
    summary: `<h4>Umrechnen</h4>
<ul><li>Stellenwertsystem: Wert = Σ Ziffer · Basis^Stelle. 1011₂ = 8+0+2+1 = 11. Hex A–F = 10–15: 0x7EA = 7·256 + 14·16 + 10 = 2026.</li>
<li>Dezimal → Basis b: <b>Divisionsrestverfahren</b> (fortgesetzt durch b teilen, Reste von unten nach oben lesen).</li>
<li>Binär ↔ Hex: 4 Bit = 1 Hex-Ziffer (1011 0110 = B6); Binär ↔ Oktal: 3 Bit = 1 Oktalziffer.</li></ul>
<h4>Zweierkomplement</h4>
<ul><li>Negative Zahl: Betrag binär → alle Bits invertieren → +1. −45 (8 Bit): 00101101 → 11010010 → 11010011.</li>
<li>Höchstes Bit = Vorzeichen (Wertigkeit −2ⁿ⁻¹). Bereich bei n Bit: −2ⁿ⁻¹ … 2ⁿ⁻¹ − 1.</li>
<li>Java: <code>byte</code> 8 Bit (−128…127), <code>short</code> 16 Bit (−32 768…32 767), <code>int</code> 32 Bit (≈ ±2,1 Mrd.), <code>long</code> 64 Bit.</li>
<li><b>Überlauf</b>: 127 + 1 als byte = −128 (Wrap-around, kein Fehler!).</li></ul>
<h4>Bitoperationen</h4>
<ul><li>AND (&amp;) Bits ausmaskieren/prüfen, OR (|) Bits setzen, XOR (^) Bits umschalten, NOT (~) invertieren, <code>&lt;&lt; k</code> = ·2ᵏ, <code>&gt;&gt; k</code> = div 2ᵏ.</li>
<li>Rechte als Flags: <code>hatRecht = (rechte AND maske) != 0</code>, setzen: <code>rechte OR maske</code>, entziehen: <code>rechte AND NICHT maske</code>.</li></ul>
<h4>Boolesche Algebra</h4>
<ul><li>De Morgan: NICHT(A UND B) = NICHT A ODER NICHT B; NICHT(A ODER B) = NICHT A UND NICHT B. XOR = (A UND NICHT B) ODER (NICHT A UND B). Wahrheitstabelle mit 2ⁿ Zeilen.</li></ul>
<h4>Gleitkomma (IEEE 754)</h4>
<ul><li>Vorzeichen, Exponent, Mantisse (float 32 Bit, double 64 Bit). Viele Dezimalbrüche (0,1!) sind binär periodisch → Rundungsfehler: <code>0.1 + 0.2 != 0.3</code>. Nie mit <code>==</code> vergleichen (Toleranz ε), Geldbeträge als Ganzzahl in Cent oder <code>BigDecimal</code>.</li></ul>
<h4>Zeichenkodierung</h4>
<ul><li>ASCII: 7 Bit, 128 Zeichen ('A' = 65, 'a' = 97, '0' = 48). Unicode: Zeichensatz (Codepoints U+0000…U+10FFFF). <b>UTF-8</b>: variable Länge 1–4 Byte, ASCII-kompatibel; ä = 2 Byte, € = 3 Byte. UTF-16: 2 oder 4 Byte.</li></ul>
<h4>Speichergrößen</h4>
<ul><li>SI (dezimal): 1 KB = 1000 B, 1 MB = 10⁶ B. IEC (binär): 1 KiB = 1024 B, 1 MiB = 2²⁰ B, 1 GiB = 2³⁰ B. „2 TB“-Festplatte = 2·10¹² B ≈ 1,82 TiB.</li></ul>
<h4>Ganzzahldivision & Modulo</h4>
<ul><li>17 div 5 = 3, 17 mod 5 = 2. Anwendungen: gerade/ungerade (<code>n mod 2</code>), letzte Ziffer (<code>n mod 10</code>), Ringpuffer, Prüfziffern. Achtung: In Java ist <code>-7 % 3 == -1</code>.</li></ul>`
  },
  {
    id: "ga2-exceptions-formate",
    part: "GA2",
    title: "Exceptions, Dateien, Datenformate, Regex & Tests",
    summary: `<h4>Exceptions</h4>
<pre><code>versuche
  …                                // kritischer Code
fange (NumberFormatException e)    // spezielle zuerst!
  …
fange (Exception e)
  …
schließlich                        // finally: läuft IMMER (auch bei rückgabe)
  datei.schliessen()
ende versuche
wirf neue UngueltigeMengeException("Menge muss 1–999 sein")</code></pre>
<ul><li><b>Checked</b> Exceptions (Java: Unterklassen von Exception außer RuntimeException, z. B. IOException, FileNotFoundException, SQLException) müssen gefangen oder mit <code>throws</code> deklariert werden. <b>Unchecked</b> (RuntimeException: NullPointer-, ArithmeticException, ArrayIndexOutOfBounds-, NumberFormat-, IllegalArgumentException) nicht.</li>
<li><b>Eigene Exception</b>: <code>klasse KontoUeberzogenException erbt von Exception</code>, Konstruktor ruft <code>super(meldung)</code>.</li>
<li>Exceptions nicht „verschlucken“ (leerer catch), sinnvoll loggen, an der Stelle behandeln, an der reagiert werden kann.</li></ul>
<h4>Eingabevalidierung</h4>
<ul><li>Typ (parsebar?), Wertebereich, Pflichtfeld, Format (Regex), Plausibilität. Whitelisting statt Blacklisting; serverseitig immer prüfen.</li></ul>
<h4>Dateien / CSV</h4>
<ul><li>Öffnen → solange nicht Dateiende: Zeile lesen → <code>teile(zeile, ";")</code> → Felder konvertieren (Fehler abfangen) → Datei im <code>schließlich</code>-Block schließen. Kopfzeile überspringen, Trennzeichen/Encoding (UTF-8) beachten.</li></ul>
<h4>JSON & XML</h4>
<ul><li><b>JSON</b>: Objekte <code>{ "schluessel": wert }</code>, Arrays <code>[ … ]</code>, Werte: String (doppelte Anführungszeichen), Zahl, true/false, null. Kein Kommentar, kein abschließendes Komma.</li>
<li><b>XML</b>: genau ein Wurzelelement, Tags korrekt verschachtelt und geschlossen, Attributwerte in Anführungszeichen, case-sensitiv → <b>wohlgeformt</b>. <b>Gültig (valide)</b> = zusätzlich konform zu einer <b>DTD</b> oder einem <b>XML-Schema (XSD)</b> (XSD: Datentypen, Kardinalitäten, selbst in XML geschrieben).</li></ul>
<h4>Reguläre Ausdrücke</h4>
<table><tr><td><code>^ $</code></td><td>Anfang/Ende</td><td><code>[0-9]</code> / <code>\\d</code></td><td>Ziffer</td></tr>
<tr><td><code>{n} {n,m}</code></td><td>genau n / n bis m</td><td><code>? * +</code></td><td>0–1 / 0–n / 1–n</td></tr>
<tr><td><code>[A-Za-z]</code></td><td>Zeichenklasse</td><td><code>(a|b)</code></td><td>Alternative/Gruppe</td></tr>
<tr><td><code>\\.</code></td><td>Punkt literal</td><td><code>.</code></td><td>beliebiges Zeichen</td></tr></table>
<ul><li>PLZ: <code>^[0-9]{5}$</code>; Datum TT.MM.JJJJ: <code>^(0[1-9]|[12][0-9]|3[01])\\.(0[1-9]|1[0-2])\\.[0-9]{4}$</code> (prüft nur Format, nicht 31.02.!); E-Mail (einfach): <code>^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$</code>.</li></ul>
<h4>Unit-Tests</h4>
<ul><li>Ein Test prüft eine Funktion isoliert: <b>Arrange – Act – Assert</b>, z. B. <code>assertEquals(erwartet, berechneRabatt(500))</code>, Exceptions mit <code>assertThrows</code>.</li>
<li>Testfälle über <b>Äquivalenzklassen</b> und <b>Grenzwerte</b> (unmittelbar unter/auf/über der Grenze) sowie ungültige Eingaben.</li></ul>`
  }
);

// ===================== ga2-pseudocode =====================
AP2.questions.push(
  {
    id: "ga2-pseudocode-001", part: "GA2", topic: "ga2-pseudocode", type: "mc", difficulty: 1, points: 2,
    question: "Welche Schleifenart wird in jedem Fall <b>mindestens einmal</b> durchlaufen?",
    options: ["Kopfgesteuerte Schleife (solange … ende solange)", "Fußgesteuerte Schleife (wiederhole … bis …)", "Zählschleife (für i von 1 bis n)", "Keine – jede Schleife kann null Durchläufe haben"],
    correct: [1],
    solution: "Die <b>fußgesteuerte Schleife</b> prüft die Bedingung erst <i>nach</i> dem Schleifenrumpf, daher wird der Rumpf mindestens einmal ausgeführt (z. B. Menüabfrage, Eingabe wiederholen bis gültig).",
    explanation: "Kopfgesteuerte und Zählschleifen prüfen vor dem ersten Durchlauf; ist die Bedingung sofort falsch (bzw. n &lt; 1), wird der Rumpf nie ausgeführt. In Java: <code>do { … } while (bed);</code> – Achtung: bei <code>wiederhole … bis</code> ist die Bedingung eine <i>Abbruch</i>bedingung, bei <code>do-while</code> eine <i>Fortsetzungs</i>bedingung.",
    tags: ["schleifen"]
  },
  {
    id: "ga2-pseudocode-002", part: "GA2", topic: "ga2-pseudocode", type: "numeric", difficulty: 2, points: 4,
    question: `Führen Sie für den folgenden Algorithmus einen Schreibtischtest durch. Welchen Wert liefert <code>berechne(7)</code>?
<pre><code>funktion berechne(n: Ganzzahl): Ganzzahl
  var x: Ganzzahl = 1
  var i: Ganzzahl = 1
  solange i &lt;= n
    wenn i mod 3 == 0 dann
      x = x * 2
    sonst
      x = x + i
    ende wenn
    i = i + 1
  ende solange
  rückgabe x
ende funktion</code></pre>`,
    answer: 41, tolerance: 0,
    solution: `<table><tr><th>i</th><th>i mod 3</th><th>x danach</th></tr>
<tr><td>1</td><td>1</td><td>1+1 = 2</td></tr><tr><td>2</td><td>2</td><td>2+2 = 4</td></tr>
<tr><td>3</td><td>0</td><td>4·2 = 8</td></tr><tr><td>4</td><td>1</td><td>8+4 = 12</td></tr>
<tr><td>5</td><td>2</td><td>12+5 = 17</td></tr><tr><td>6</td><td>0</td><td>17·2 = 34</td></tr>
<tr><td>7</td><td>1</td><td>34+7 = 41</td></tr></table>Danach ist i = 8 &gt; 7, Schleife endet. Rückgabe <b>41</b>.`,
    explanation: "Typische Fehler: Start mit x = 0 statt 1, Durchlauf für i = 7 vergessen (Bedingung ist &lt;=), oder i wird vor der Berechnung erhöht.",
    tags: ["schreibtischtest", "trace"]
  },
  {
    id: "ga2-pseudocode-003", part: "GA2", topic: "ga2-pseudocode", type: "numeric", difficulty: 2, points: 3,
    context: "Ein Entwickler testet einen Algorithmus zur Collatz-Folge.",
    question: `Wie viele Schleifendurchläufe (Wert von <code>schritte</code>) liefert der Aufruf <code>collatz(12)</code>?
<pre><code>funktion collatz(n: Ganzzahl): Ganzzahl
  var schritte: Ganzzahl = 0
  solange n != 1
    wenn n mod 2 == 0 dann
      n = n div 2
    sonst
      n = 3 * n + 1
    ende wenn
    schritte = schritte + 1
  ende solange
  rückgabe schritte
ende funktion</code></pre>`,
    answer: 9, tolerance: 0,
    solution: "Folge der n-Werte: 12 → 6 → 3 → 10 → 5 → 16 → 8 → 4 → 2 → 1. Das sind <b>9</b> Übergänge, also 9 Schleifendurchläufe; bei n = 1 bricht die kopfgesteuerte Schleife ab.",
    explanation: "Häufiger Fehler: die Anzahl der Folgenglieder (10) statt der Durchläufe (9) angeben. In der Trace-Tabelle immer festhalten, wann die Bedingung geprüft wird.",
    tags: ["schreibtischtest"]
  },
  {
    id: "ga2-pseudocode-004", part: "GA2", topic: "ga2-pseudocode", type: "mc", difficulty: 2, points: 3,
    context: "In einer Urlaubsplanungssoftware muss geprüft werden, ob ein Jahr ein Schaltjahr ist (gregorianischer Kalender).",
    question: "Welche Bedingung liefert für eine Jahreszahl <code>j</code> genau dann <i>wahr</i>, wenn es sich um ein Schaltjahr handelt?",
    options: [
      "<code>(j mod 4 == 0) ODER (j mod 100 != 0)</code>",
      "<code>(j mod 4 == 0) UND ((j mod 100 != 0) ODER (j mod 400 != 0))</code>",
      "<code>((j mod 4 == 0) UND (j mod 100 != 0)) ODER (j mod 400 == 0)</code>",
      "<code>(j mod 4 == 0) UND (j mod 400 == 0)</code>"
    ],
    correct: [2],
    solution: "Schaltjahr: durch 4 teilbar, aber nicht durch 100 – außer es ist durch 400 teilbar. Also <code>((j mod 4 == 0) UND (j mod 100 != 0)) ODER (j mod 400 == 0)</code>. Test: 2028 → wahr, 1900 → falsch, 2000 → wahr, 2026 → falsch.",
    explanation: "Distraktor B liefert für 1900 fälschlich wahr (1900 mod 400 != 0 ist wahr). D erkennt nur Jahre, die durch 400 teilbar sind. A ist für fast alle Jahre wahr. Tipp: Bedingungen immer mit den Grenzfällen 1900, 2000, 2024, 2026 prüfen.",
    tags: ["datum", "schaltjahr"]
  },
  {
    id: "ga2-pseudocode-005", part: "GA2", topic: "ga2-pseudocode", type: "code", lang: "pseudocode", difficulty: 2, points: 8,
    context: "Ein Bildungsträger möchte in seiner Teilnehmerverwaltung die Durchschnittsnote einer Klausur berechnen. Die Noten liegen als Array von Gleitkommazahlen vor. Durch Erfassungsfehler können ungültige Werte (kleiner als 1,0 oder größer als 6,0) enthalten sein.",
    question: "Entwickeln Sie in Pseudocode die Funktion <code>durchschnitt(noten: Array von Gleitkommazahl): Gleitkommazahl</code>. Ungültige Werte sind zu ignorieren. Gibt es keine gültige Note, soll <code>-1.0</code> zurückgegeben werden.",
    starter: "funktion durchschnitt(noten: Array von Gleitkommazahl): Gleitkommazahl\n  // Ihr Code\nende funktion",
    solution: `<pre><code>funktion durchschnitt(noten: Array von Gleitkommazahl): Gleitkommazahl
  var summe: Gleitkommazahl = 0.0
  var anzahl: Ganzzahl = 0
  für i von 0 bis laenge(noten) - 1
    wenn noten[i] &gt;= 1.0 UND noten[i] &lt;= 6.0 dann
      summe = summe + noten[i]
      anzahl = anzahl + 1
    ende wenn
  ende für
  wenn anzahl == 0 dann
    rückgabe -1.0
  ende wenn
  rückgabe summe / anzahl
ende funktion</code></pre>
Java-Variante:
<pre><code>double durchschnitt(double[] noten) {
  double summe = 0; int anzahl = 0;
  for (double n : noten) {
    if (n &gt;= 1.0 &amp;&amp; n &lt;= 6.0) { summe += n; anzahl++; }
  }
  return anzahl == 0 ? -1.0 : summe / anzahl;
}</code></pre>`,
    explanation: "Bewertet werden: Initialisierung von Summe und Zähler, korrekte Schleifengrenzen (0 bis laenge − 1), Gültigkeitsprüfung mit UND, Division durch <b>Anzahl gültiger</b> Werte (nicht laenge(noten)!), Abfangen der Division durch 0. Typischer Fehler: <code>ODER</code> statt <code>UND</code> in der Bereichsprüfung – dann ist jede Zahl gültig.",
    keywords: ["summe", "anzahl|zaehler|zähler|count", "für|for|solange|while", "laenge|length|size", "wenn|if", ">= 1|>=1", "<= 6|<=6", "und|&&|and", "-1", "rückgabe|return"],
    tags: ["array", "mittelwert"]
  },
  {
    id: "ga2-pseudocode-006", part: "GA2", topic: "ga2-pseudocode", type: "code", lang: "pseudocode", difficulty: 2, points: 9,
    context: "In der Lagerverwaltung der Firma TechParts GmbH werden Artikelnummern und Lagerbestände in zwei gleich langen Arrays geführt: <code>artikelNr: Array von Text</code> und <code>bestand: Array von Ganzzahl</code>. Der Bestand an Position i gehört zur Artikelnummer an Position i.",
    question: `a) Entwickeln Sie die Funktion <code>kritischsterArtikel(artikelNr, bestand): Text</code>, die die Artikelnummer mit dem <b>geringsten</b> Bestand zurückgibt. Bei Gleichstand wird der zuerst gefundene Artikel geliefert; bei leeren Arrays ein leerer Text <code>""</code>. (6 P)<br>
b) Entwickeln Sie die Funktion <code>anzahlNachbestellen(bestand, mindestbestand: Ganzzahl): Ganzzahl</code>, die zählt, wie viele Artikel den Mindestbestand <b>unterschreiten</b>. (3 P)`,
    solution: `<pre><code>funktion kritischsterArtikel(artikelNr: Array von Text, bestand: Array von Ganzzahl): Text
  wenn laenge(bestand) == 0 dann
    rückgabe ""
  ende wenn
  var minIndex: Ganzzahl = 0
  für i von 1 bis laenge(bestand) - 1
    wenn bestand[i] &lt; bestand[minIndex] dann
      minIndex = i
    ende wenn
  ende für
  rückgabe artikelNr[minIndex]
ende funktion

funktion anzahlNachbestellen(bestand: Array von Ganzzahl, mindestbestand: Ganzzahl): Ganzzahl
  var anzahl: Ganzzahl = 0
  für i von 0 bis laenge(bestand) - 1
    wenn bestand[i] &lt; mindestbestand dann
      anzahl = anzahl + 1
    ende wenn
  ende für
  rückgabe anzahl
ende funktion</code></pre>`,
    explanation: "Das Minimum wird mit dem <b>ersten Element</b> (Index 0) initialisiert, nicht mit 0 oder einer willkürlich großen Zahl. Es wird der <b>Index</b> gemerkt, weil die Artikelnummer zurückgegeben werden soll. Strenger Vergleich <code>&lt;</code> sorgt dafür, dass bei Gleichstand der erste Artikel bleibt (bei <code>&lt;=</code> wäre es der letzte). „Unterschreiten“ bedeutet <code>&lt;</code>, nicht <code>&lt;=</code>.",
    keywords: ["minindex|index|position|pos", "bestand[0]|= 0|=0", "für|for", "laenge|length", "<", "rückgabe|return", "artikelnr[", "anzahl|zaehler|zähler|count", "\"\""],
    tags: ["array", "minimum", "zaehlen"]
  },
  {
    id: "ga2-pseudocode-007", part: "GA2", topic: "ga2-pseudocode", type: "code", lang: "pseudocode", difficulty: 2, points: 7,
    context: "Für ein Wortspiel in einer Lern-App soll geprüft werden, ob ein eingegebener Text ein Palindrom ist (z. B. „Reliefpfeiler“, „Ein Esel lese nie“). Groß-/Kleinschreibung und Leerzeichen sollen ignoriert werden.",
    question: "Entwickeln Sie die Funktion <code>istPalindrom(text: Text): Wahrheitswert</code>. Ihnen stehen die Funktionen <code>laenge(s)</code>, <code>zeichenAn(s, i)</code> (0-basiert) und <code>kleinbuchstaben(s)</code> zur Verfügung. Bibliotheksfunktionen zum Umkehren von Texten dürfen <b>nicht</b> verwendet werden.",
    starter: "funktion istPalindrom(text: Text): Wahrheitswert\n  // Ihr Code\nende funktion",
    solution: `<pre><code>funktion istPalindrom(text: Text): Wahrheitswert
  var s: Text = ""
  var t: Text = kleinbuchstaben(text)
  // 1. Leerzeichen entfernen
  für i von 0 bis laenge(t) - 1
    wenn zeichenAn(t, i) != ' ' dann
      s = s + zeichenAn(t, i)
    ende wenn
  ende für
  // 2. Von außen nach innen vergleichen
  var links: Ganzzahl = 0
  var rechts: Ganzzahl = laenge(s) - 1
  solange links &lt; rechts
    wenn zeichenAn(s, links) != zeichenAn(s, rechts) dann
      rückgabe falsch
    ende wenn
    links = links + 1
    rechts = rechts - 1
  ende solange
  rückgabe wahr
ende funktion</code></pre>
Trace „Ein Esel lese nie“ → klein und ohne Leerzeichen s = „einesellesenie“ (14 Zeichen): e=e, i=i, n=n, e=e, s=s, e=e, l=l → <b>wahr</b>.`,
    explanation: "Kernidee: zwei Indizes laufen aufeinander zu, Abbruch beim ersten Unterschied (früher Ausstieg spart Vergleiche, O(n)). Typische Fehler: <code>rechts = laenge(s)</code> (Index außerhalb), Bedingung <code>links &lt;= rechts</code> ist unschädlich, aber <code>links != rechts</code> führt bei gerader Länge zum Überkreuzen; <code>rückgabe wahr</code> im Schleifenrumpf (bricht nach dem ersten Vergleich ab).",
    keywords: ["kleinbuchstaben|tolowercase|lower", "links|anfang|start", "rechts|ende", "laenge|length", "solange|while|für|for", "zeichenan|charat|[", "!=|<>", "falsch|false", "wahr|true", "rückgabe|return"],
    tags: ["string", "palindrom"]
  },
  {
    id: "ga2-pseudocode-008", part: "GA2", topic: "ga2-pseudocode", type: "code", lang: "pseudocode", difficulty: 3, points: 9,
    context: `Das Warenwirtschaftssystem eines Großhändlers soll beim Wareneingang EAN-13-Codes prüfen. Die Prüfziffer (13. Stelle) wird so berechnet:<ul>
<li>Die ersten 12 Ziffern werden von links abwechselnd mit 1 und 3 gewichtet (1. Ziffer ·1, 2. Ziffer ·3, 3. Ziffer ·1, …).</li>
<li>Die gewichteten Werte werden summiert.</li>
<li>Prüfziffer = (10 − (Summe mod 10)) mod 10.</li></ul>`,
    question: "Entwickeln Sie die Funktion <code>istGueltigeEan(ean: Text): Wahrheitswert</code>. Sie soll <i>falsch</i> liefern, wenn der Text nicht genau 13 Zeichen lang ist, ein Zeichen keine Ziffer ist oder die Prüfziffer nicht stimmt. Verfügbar: <code>laenge(s)</code>, <code>zeichenAn(s, i)</code>, <code>istZiffer(z): Wahrheitswert</code>, <code>ziffernwert(z): Ganzzahl</code> (z. B. '7' → 7).",
    solution: `<pre><code>funktion istGueltigeEan(ean: Text): Wahrheitswert
  wenn laenge(ean) != 13 dann
    rückgabe falsch
  ende wenn
  var summe: Ganzzahl = 0
  für i von 0 bis 11
    var z: Zeichen = zeichenAn(ean, i)
    wenn NICHT istZiffer(z) dann
      rückgabe falsch
    ende wenn
    wenn i mod 2 == 0 dann          // 1., 3., 5. … Stelle (Index gerade)
      summe = summe + ziffernwert(z) * 1
    sonst
      summe = summe + ziffernwert(z) * 3
    ende wenn
  ende für
  wenn NICHT istZiffer(zeichenAn(ean, 12)) dann
    rückgabe falsch
  ende wenn
  var pruefziffer: Ganzzahl = (10 - (summe mod 10)) mod 10
  rückgabe pruefziffer == ziffernwert(zeichenAn(ean, 12))
ende funktion</code></pre>
Beispiel 4006381333931: Summe der ersten 12 gewichteten Ziffern = 89 → (10 − 9) mod 10 = 1 = letzte Ziffer → gültig.`,
    explanation: "Achtung bei der Gewichtung: Die 1. Stelle hat bei 0-basiertem Index den Index 0 (gerade) → Gewicht 1. Das äußere <code>mod 10</code> ist nötig, damit bei Summe mod 10 = 0 die Prüfziffer 0 (und nicht 10) entsteht. Die Prüfung der 13. Stelle auf Ziffer wird häufig vergessen.",
    keywords: ["laenge|length", "13", "summe", "für|for", "mod 2|% 2", "* 3|*3", "mod 10|% 10", "istziffer|isdigit", "rückgabe|return", "falsch|false"],
    tags: ["validierung", "pruefziffer"]
  },
  {
    id: "ga2-pseudocode-009", part: "GA2", topic: "ga2-pseudocode", type: "numeric", difficulty: 2, points: 3,
    context: "EAN-13: Die ersten 12 Ziffern werden von links abwechselnd mit 1 und 3 gewichtet und summiert. Prüfziffer = (10 − (Summe mod 10)) mod 10.",
    question: "Berechnen Sie die Prüfziffer für die ersten zwölf Ziffern <code>400638133393</code>.",
    answer: 1, tolerance: 0,
    solution: "4·1 + 0·3 + 0·1 + 6·3 + 3·1 + 8·3 + 1·1 + 3·3 + 3·1 + 3·3 + 9·1 + 3·3<br>= 4 + 0 + 0 + 18 + 3 + 24 + 1 + 9 + 3 + 9 + 9 + 9 = <b>89</b><br>89 mod 10 = 9 → (10 − 9) mod 10 = <b>1</b>. Vollständige EAN: 4006381333931.",
    explanation: "Fehlerquelle: Gewichtung von rechts beginnen oder mit 3 starten.",
    tags: ["pruefziffer"]
  },
  {
    id: "ga2-pseudocode-010", part: "GA2", topic: "ga2-pseudocode", type: "multi", difficulty: 2, points: 4,
    question: "Welche Aussagen zu Struktogrammen (Nassi-Shneiderman) und Programmablaufplänen (PAP) sind <b>richtig</b>?",
    options: [
      "Im Struktogramm hat jeder Strukturblock genau einen Eingang und einen Ausgang; Sprünge (goto) sind nicht darstellbar.",
      "Die Mehrfachauswahl (Fallunterscheidung) besitzt im Struktogramm einen eigenen Strukturblock.",
      "Bei einer kopfgesteuerten Schleife steht die Bedingung im Struktogramm unterhalb des Schleifenrumpfs.",
      "Struktogramme sind in der DIN 66261 genormt, Programmablaufpläne in der DIN 66001.",
      "Im Struktogramm werden Verzweigungen als Raute mit zwei ausgehenden Pfeilen gezeichnet."
    ],
    correct: [0, 1, 3],
    solution: "Richtig sind A, B und D. C ist falsch: Bei der kopfgesteuerten Schleife steht die Bedingung <b>oben</b>, bei der fußgesteuerten unten. E beschreibt den PAP; im Struktogramm wird eine Verzweigung als Block mit Dreieck (ja/nein-Spalten) dargestellt.",
    explanation: "Die IHK lässt oft ein Struktogramm vervollständigen oder in Pseudocode übersetzen – Blocktypen sicher kennen: Anweisung, Verzweigung, Fallauswahl, kopf-/fußgesteuerte Schleife, Zählschleife, Aufruf.",
    tags: ["struktogramm", "pap"]
  },
  {
    id: "ga2-pseudocode-011", part: "GA2", topic: "ga2-pseudocode", type: "text", difficulty: 1, points: 4,
    question: "Erläutern Sie, was ein <b>Schreibtischtest</b> ist und wie er durchgeführt wird. Nennen Sie außerdem einen Vorteil und eine Grenze dieses Verfahrens.",
    solution: `<ul><li><b>Definition:</b> Manuelles Durchspielen eines Algorithmus „auf dem Papier“ (ohne Rechner), um Logikfehler zu finden und das Ergebnis zu überprüfen.</li>
<li><b>Durchführung:</b> Testdaten (inkl. Grenzfälle) wählen; eine Trace-Tabelle anlegen mit einer Spalte je Variable (ggf. Bedingung, Ausgabe); Anweisung für Anweisung ausführen und jede Wertänderung in einer neuen Zeile notieren; Endergebnis mit dem erwarteten Ergebnis vergleichen.</li>
<li><b>Vorteil:</b> Findet Logikfehler (Off-by-one, falsche Initialisierung, Endlosschleifen) früh, ohne lauffähiges Programm; fördert Verständnis.</li>
<li><b>Grenze:</b> Zeitaufwendig, nur wenige Testfälle möglich, fehleranfällig bei großen Datenmengen; ersetzt keine automatisierten Tests.</li></ul>`,
    keywords: ["manuell|von hand|papier|ohne rechner|gedanklich", "tabelle|trace|wertetabelle", "variable", "testdaten|testwerte|beispielwerte|eingabewerte", "zeile|schritt|anweisung", "logikfehler|fehler", "grenzfall|grenzwert|randfall", "aufwendig|zeit|wenige"],
    tags: ["schreibtischtest"]
  },
  {
    id: "ga2-pseudocode-012", part: "GA2", topic: "ga2-pseudocode", type: "order", difficulty: 2, points: 4,
    question: "Bringen Sie die Zeilen der Prozedur <code>umkehren</code>, die ein Array <b>in-place</b> umkehrt, in die richtige Reihenfolge.",
    items: [
      "prozedur umkehren(a: Array von Ganzzahl)",
      "links = 0; rechts = laenge(a) - 1",
      "solange links < rechts",
      "temp = a[links]",
      "a[links] = a[rechts]",
      "a[rechts] = temp",
      "links = links + 1; rechts = rechts - 1",
      "ende solange",
      "ende prozedur"
    ],
    solution: `<pre><code>prozedur umkehren(a: Array von Ganzzahl)
  links = 0; rechts = laenge(a) - 1
  solange links &lt; rechts
    temp = a[links]
    a[links] = a[rechts]
    a[rechts] = temp
    links = links + 1; rechts = rechts - 1
  ende solange
ende prozedur</code></pre>`,
    explanation: "Der Dreieckstausch über <code>temp</code> ist zwingend: Ohne Hilfsvariable wäre der alte Wert von a[links] verloren. Die Schleife läuft nur bis zur Mitte – würde man bis zum Ende tauschen, wäre das Array wieder im Originalzustand.",
    tags: ["array", "umkehren"]
  },
  {
    id: "ga2-pseudocode-013", part: "GA2", topic: "ga2-pseudocode", type: "code", lang: "pseudocode", difficulty: 2, points: 6,
    context: "In einem Kühlhaus werden stündlich Temperaturen (in °C, typischerweise zwischen −25 und −15) gemessen. Ein Kollege hat folgende Funktion geschrieben, die die höchste gemessene Temperatur liefern soll. Beim Test mit realen Daten kommt es zu falschen Ergebnissen und einem Laufzeitfehler.",
    question: `Analysieren Sie den Code, nennen Sie alle Fehler und geben Sie eine korrigierte Fassung an.
<pre><code>funktion maximum(werte: Array von Ganzzahl): Ganzzahl
  var max: Ganzzahl = 0
  für i von 1 bis laenge(werte)
    wenn werte[i] &gt; max dann
      max = i
    ende wenn
  ende für
  rückgabe max
ende funktion</code></pre>`,
    starter: "funktion maximum(werte: Array von Ganzzahl): Ganzzahl\n  var max: Ganzzahl = 0\n  für i von 1 bis laenge(werte)\n    wenn werte[i] > max dann\n      max = i\n    ende wenn\n  ende für\n  rückgabe max\nende funktion",
    solution: `<b>Fehler:</b><ol>
<li><code>max = 0</code>: Bei ausschließlich negativen Temperaturen wird nie ein Wert größer als 0 gefunden → Ergebnis 0 ist falsch. Korrekt: mit <code>werte[0]</code> initialisieren.</li>
<li><code>bis laenge(werte)</code>: Off-by-one – der letzte gültige Index ist <code>laenge(werte) - 1</code> → Laufzeitfehler (Index außerhalb des Arrays).</li>
<li><code>max = i</code>: Es wird der Index statt des Werts gespeichert → <code>max = werte[i]</code>.</li>
<li>Leeres Array wird nicht behandelt (Zugriff auf werte[0] wäre ein Fehler) → Exception werfen oder Sonderwert.</li></ol>
<pre><code>funktion maximum(werte: Array von Ganzzahl): Ganzzahl
  wenn laenge(werte) == 0 dann
    wirf neue IllegalArgumentException("Keine Messwerte")
  ende wenn
  var max: Ganzzahl = werte[0]
  für i von 1 bis laenge(werte) - 1
    wenn werte[i] &gt; max dann
      max = werte[i]
    ende wenn
  ende für
  rückgabe max
ende funktion</code></pre>`,
    explanation: "Klassische IHK-Fehlersuche: Initialisierung, Schleifengrenzen, Index vs. Wert, Sonderfall leere Eingabe. Der Start bei Index 1 ist nach der Korrektur richtig, weil werte[0] bereits als Startwert dient.",
    keywords: ["werte[0]", "laenge(werte) - 1|laenge(werte)-1|length - 1|length-1", "max = werte[i]|max=werte[i]", "negativ|negative", "off-by-one|index|außerhalb|outofbounds", "leer|== 0|==0", "rückgabe|return"],
    tags: ["fehlersuche", "maximum"]
  },
  {
    id: "ga2-pseudocode-014", part: "GA2", topic: "ga2-pseudocode", type: "code", lang: "pseudocode", difficulty: 3, points: 10,
    context: "Eine Einzelhandelskette mit 4 Filialen speichert die Monatsumsätze eines Jahres in einem zweidimensionalen Array <code>umsatz: Array[4][12] von Gleitkommazahl</code>. <code>umsatz[f][m]</code> ist der Umsatz der Filiale f (0–3) im Monat m (0 = Januar … 11 = Dezember).",
    question: `a) Entwickeln Sie die Funktion <code>jahresumsaetze(umsatz): Array von Gleitkommazahl</code>, die für jede Filiale den Jahresumsatz liefert. (5 P)<br>
b) Entwickeln Sie die Funktion <code>besterMonat(umsatz): Ganzzahl</code>, die die Nummer des Monats (1–12) liefert, in dem alle Filialen <b>zusammen</b> den höchsten Umsatz erzielt haben. (5 P)<br>
Verwenden Sie <code>anzahlZeilen(m)</code> und <code>anzahlSpalten(m)</code>.`,
    solution: `<pre><code>funktion jahresumsaetze(umsatz: Array[][] von Gleitkommazahl): Array von Gleitkommazahl
  var ergebnis: Array[anzahlZeilen(umsatz)] von Gleitkommazahl
  für f von 0 bis anzahlZeilen(umsatz) - 1
    var summe: Gleitkommazahl = 0.0
    für m von 0 bis anzahlSpalten(umsatz) - 1
      summe = summe + umsatz[f][m]
    ende für
    ergebnis[f] = summe
  ende für
  rückgabe ergebnis
ende funktion

funktion besterMonat(umsatz: Array[][] von Gleitkommazahl): Ganzzahl
  var besterIndex: Ganzzahl = 0
  var besteSumme: Gleitkommazahl = -1.0
  für m von 0 bis anzahlSpalten(umsatz) - 1      // äußere Schleife: Spalten
    var monatssumme: Gleitkommazahl = 0.0
    für f von 0 bis anzahlZeilen(umsatz) - 1     // innere Schleife: Zeilen
      monatssumme = monatssumme + umsatz[f][m]
    ende für
    wenn monatssumme &gt; besteSumme dann
      besteSumme = monatssumme
      besterIndex = m
    ende wenn
  ende für
  rückgabe besterIndex + 1                        // Index 0..11 → Monat 1..12
ende funktion</code></pre>`,
    explanation: "Zeilensumme: Summe innerhalb der äußeren Schleife zurücksetzen (häufiger Fehler: Summe nur einmal vor allen Schleifen initialisieren → kumulierte Werte). Spaltensumme: Schleifen vertauschen. Umsätze sind nicht negativ, daher ist −1 als Startwert zulässig; sauberer ist die Initialisierung mit der ersten Monatssumme. Rückgabe <code>+ 1</code> beachten, da Monat 1–12 verlangt ist.",
    keywords: ["für|for", "anzahlzeilen|zeilen|length", "anzahlspalten|spalten", "umsatz[f][m]|[f][m]|[i][j]", "summe", "= 0|=0", "besteSumme|max", "+ 1|+1", "rückgabe|return"],
    tags: ["2d-array", "matrix"]
  },
  {
    id: "ga2-pseudocode-015", part: "GA2", topic: "ga2-pseudocode", type: "text", difficulty: 2, points: 4,
    question: "Ein Team soll einen neuen Algorithmus dokumentieren. Vergleichen Sie <b>Struktogramm</b> und <b>Programmablaufplan (PAP)</b> anhand von zwei Kriterien und begründen Sie, welche Darstellung für strukturierte Programmierung besser geeignet ist.",
    solution: `<ul><li><b>Strukturiertheit:</b> Struktogramme erlauben nur die Grundstrukturen Sequenz, Auswahl und Wiederholung (ein Ein-/Ausgang je Block, keine Sprünge). PAPs erlauben beliebige Pfeile/Sprünge (Gefahr von „Spaghetti-Code“).</li>
<li><b>Übersichtlichkeit/Platzbedarf:</b> Struktogramme sind kompakt und lassen sich direkt in Code (Schleifen, if) übersetzen; tiefe Schachtelungen werden aber schmal. PAPs zeigen den Ablauf sehr anschaulich, werden bei großen Algorithmen unübersichtlich.</li>
<li><b>Änderbarkeit:</b> Struktogramme müssen bei Änderungen oft neu gezeichnet werden, PAPs lassen sich leichter erweitern.</li>
<li><b>Fazit:</b> Für strukturierte Programmierung ist das <b>Struktogramm</b> besser geeignet, weil es die Strukturregeln erzwingt und sich 1:1 in Pseudocode/Code umsetzen lässt.</li></ul>`,
    keywords: ["sprung|goto|pfeil", "sequenz|auswahl|wiederholung|strukturblock", "übersicht|uebersicht|kompakt", "ein- und ausgang|eingang", "code|umsetz|übersetz", "struktogramm", "änder|aender|erweiter"],
    tags: ["struktogramm", "pap"]
  }
);

// ===================== ga2-sortieren-suchen =====================
AP2.questions.push(
  {
    id: "ga2-sortieren-suchen-001", part: "GA2", topic: "ga2-sortieren-suchen", type: "order", difficulty: 2, points: 4,
    question: "Das Array <code>[7, 3, 9, 1, 5]</code> wird mit <b>Bubble Sort</b> aufsteigend sortiert (benachbarte Elemente werden von links nach rechts verglichen und getauscht). Bringen Sie die Array-Zustände in die Reihenfolge, in der sie jeweils <b>nach einem vollständigen Durchlauf</b> entstehen (beginnend mit dem Ausgangszustand).",
    items: ["[7, 3, 9, 1, 5] (Ausgangszustand)", "[3, 7, 1, 5, 9]", "[3, 1, 5, 7, 9]", "[1, 3, 5, 7, 9]"],
    solution: "1. Durchlauf: 7↔3, 7&lt;9, 9↔1, 9↔5 → [3, 7, 1, 5, 9] (9 ist „aufgestiegen“)<br>2. Durchlauf: 3&lt;7, 7↔1, 7↔5 → [3, 1, 5, 7, 9]<br>3. Durchlauf: 3↔1 → [1, 3, 5, 7, 9]<br>4. Durchlauf: keine Vertauschung → Abbruch (optimierte Variante).",
    explanation: "Merkmal Bubble Sort: Nach dem k-ten Durchlauf stehen die k größten Elemente endgültig am Ende. Insgesamt 6 Vertauschungen = Anzahl der Inversionen.",
    tags: ["bubblesort", "durchlauf"]
  },
  {
    id: "ga2-sortieren-suchen-002", part: "GA2", topic: "ga2-sortieren-suchen", type: "order", difficulty: 2, points: 4,
    question: "Das Array <code>[64, 25, 12, 22, 11]</code> wird mit <b>Selection Sort</b> aufsteigend sortiert (Minimum des unsortierten Teils wird mit dem ersten unsortierten Element getauscht). Ordnen Sie die Zustände nach jedem Durchlauf.",
    items: ["[64, 25, 12, 22, 11] (Ausgangszustand)", "[11, 25, 12, 22, 64]", "[11, 12, 25, 22, 64]", "[11, 12, 22, 25, 64]"],
    solution: "1. Durchlauf: Minimum 11 ↔ 64 → [11, 25, 12, 22, 64]<br>2. Durchlauf: Minimum des Rests 12 ↔ 25 → [11, 12, 25, 22, 64]<br>3. Durchlauf: Minimum 22 ↔ 25 → [11, 12, 22, 25, 64]<br>4. Durchlauf: 25 ist bereits Minimum → keine Änderung.",
    explanation: "Selection Sort führt immer n(n−1)/2 = 10 Vergleiche durch, aber höchstens n−1 Vertauschungen. Der Tausch über große Distanzen macht das Verfahren instabil.",
    tags: ["selectionsort", "durchlauf"]
  },
  {
    id: "ga2-sortieren-suchen-003", part: "GA2", topic: "ga2-sortieren-suchen", type: "order", difficulty: 2, points: 5,
    question: "Das Array <code>[8, 4, 6, 2, 1]</code> wird mit <b>Insertion Sort</b> aufsteigend sortiert. Ordnen Sie die Zustände nach jedem Einfügeschritt.",
    items: ["[8, 4, 6, 2, 1] (Ausgangszustand)", "[4, 8, 6, 2, 1]", "[4, 6, 8, 2, 1]", "[2, 4, 6, 8, 1]", "[1, 2, 4, 6, 8]"],
    solution: "i=1: 4 vor 8 einfügen → [4, 8, 6, 2, 1]<br>i=2: 6 zwischen 4 und 8 → [4, 6, 8, 2, 1]<br>i=3: 2 ganz nach vorn → [2, 4, 6, 8, 1]<br>i=4: 1 ganz nach vorn → [1, 2, 4, 6, 8]",
    explanation: "Insertion Sort hält links immer einen sortierten Teil. Bei umgekehrt sortierten Elementen (wie 2 und 1 hier) müssen alle Elemente verschoben werden – Worst Case O(n²).",
    tags: ["insertionsort", "durchlauf"]
  },
  {
    id: "ga2-sortieren-suchen-004", part: "GA2", topic: "ga2-sortieren-suchen", type: "numeric", difficulty: 2, points: 3,
    question: "Wie viele <b>Vertauschungen</b> führt Bubble Sort insgesamt durch, um das Array <code>[7, 3, 9, 1, 5]</code> aufsteigend zu sortieren?",
    answer: 6, tolerance: 0,
    solution: "Bubble Sort tauscht nur benachbarte Elemente; jede Vertauschung beseitigt genau eine Fehlstellung (Inversion). Inversionen: (7,3), (7,1), (7,5), (3,1), (9,1), (9,5) = <b>6</b>.<br>Kontrolle über Durchläufe: 1. Durchlauf 3 Tausche, 2. Durchlauf 2, 3. Durchlauf 1 → 6.",
    explanation: "Inversion = Paar (i, j) mit i &lt; j und a[i] &gt; a[j]. Auch Insertion Sort verschiebt genau so oft.",
    tags: ["bubblesort", "zaehlen"]
  },
  {
    id: "ga2-sortieren-suchen-005", part: "GA2", topic: "ga2-sortieren-suchen", type: "numeric", difficulty: 2, points: 4,
    context: "Gegeben ist das sortierte Array (Indizes 0–14):<br><code>[3, 8, 12, 17, 21, 25, 30, 34, 41, 47, 52, 58, 63, 70, 77]</code><br>Die binäre Suche berechnet die Mitte mit <code>m = (links + rechts) div 2</code>.",
    question: "Wie viele Elemente werden mit dem Suchwert <b>21</b> verglichen, bis er gefunden ist?",
    answer: 4, tolerance: 0,
    solution: `<table><tr><th>Schritt</th><th>links</th><th>rechts</th><th>m</th><th>a[m]</th><th>Aktion</th></tr>
<tr><td>1</td><td>0</td><td>14</td><td>7</td><td>34</td><td>21 &lt; 34 → rechts = 6</td></tr>
<tr><td>2</td><td>0</td><td>6</td><td>3</td><td>17</td><td>21 &gt; 17 → links = 4</td></tr>
<tr><td>3</td><td>4</td><td>6</td><td>5</td><td>25</td><td>21 &lt; 25 → rechts = 4</td></tr>
<tr><td>4</td><td>4</td><td>4</td><td>4</td><td>21</td><td>gefunden</td></tr></table>Es werden <b>4</b> Elemente verglichen.`,
    explanation: "Bei 15 Elementen sind maximal ⌈log₂(16)⌉ = 4 Vergleiche nötig. Die lineare Suche hätte 5 Vergleiche gebraucht.",
    tags: ["binaere-suche", "trace"]
  },
  {
    id: "ga2-sortieren-suchen-006", part: "GA2", topic: "ga2-sortieren-suchen", type: "numeric", difficulty: 2, points: 2,
    context: "Ein Online-Shop verwaltet 1000 Artikel, sortiert nach Artikelnummer, in einem Array.",
    question: "Wie viele Elementvergleiche benötigt die <b>binäre Suche</b> im ungünstigsten Fall, um einen Artikel zu finden bzw. festzustellen, dass er nicht vorhanden ist?",
    answer: 10, tolerance: 0,
    solution: "Mit jedem Vergleich halbiert sich der Suchbereich: 1000 → 500 → 250 → 125 → 62 → 31 → 15 → 7 → 3 → 1. Maximal ⌈log₂(1000 + 1)⌉ = <b>10</b> Vergleiche (2¹⁰ = 1024 ≥ 1001). Die lineare Suche bräuchte im Worst Case 1000.",
    explanation: "Faustregel: 2¹⁰ ≈ 1000, 2²⁰ ≈ 1 Mio. Voraussetzung ist die Sortierung – sonst ist das Ergebnis der binären Suche nicht verlässlich.",
    tags: ["binaere-suche", "komplexitaet"]
  },
  {
    id: "ga2-sortieren-suchen-007", part: "GA2", topic: "ga2-sortieren-suchen", type: "mc", difficulty: 2, points: 2,
    question: "Welches Sortierverfahren ist in seiner Standardimplementierung <b>nicht stabil</b>?",
    options: ["Bubble Sort", "Insertion Sort", "Merge Sort", "Selection Sort"],
    correct: [3],
    solution: "<b>Selection Sort</b> ist nicht stabil: Beim Tausch des Minimums nach vorn kann ein Element über ein gleich großes hinweg verschoben werden. Beispiel [5a, 5b, 3] → Tausch 3 ↔ 5a → [3, 5b, 5a] – die Reihenfolge von 5a/5b ist vertauscht.",
    explanation: "Bubble Sort und Insertion Sort tauschen nur benachbarte Elemente bei echt größer, Merge Sort übernimmt bei Gleichheit das Element der linken Hälfte → stabil. Quick Sort ist ebenfalls nicht stabil.",
    tags: ["stabilitaet"]
  },
  {
    id: "ga2-sortieren-suchen-008", part: "GA2", topic: "ga2-sortieren-suchen", type: "multi", difficulty: 2, points: 4,
    question: "Welche Aussagen sind <b>richtig</b>?",
    options: [
      "Die binäre Suche setzt ein sortiertes Datenfeld mit direktem Indexzugriff voraus.",
      "Merge Sort benötigt im Worst Case O(n²) Vergleiche.",
      "Insertion Sort arbeitet bei bereits sortierten Daten in linearer Zeit.",
      "Quick Sort sortiert in-place, benötigt also kein zusätzliches Array.",
      "Die lineare Suche ist auf unsortierten Daten nicht anwendbar."
    ],
    correct: [0, 2, 3],
    solution: "Richtig: A, C, D. B ist falsch – Merge Sort hat immer O(n log n). E ist falsch – die lineare Suche funktioniert gerade auch auf unsortierten Daten.",
    explanation: "Quick Sort benötigt nur Stackspeicher für die Rekursion (im Mittel O(log n)), aber kein Hilfsarray – im Gegensatz zu Merge Sort (O(n) Zusatzspeicher).",
    tags: ["eigenschaften"]
  },
  {
    id: "ga2-sortieren-suchen-009", part: "GA2", topic: "ga2-sortieren-suchen", type: "mc", difficulty: 3, points: 3,
    question: "Wann tritt bei Quick Sort der <b>Worst Case</b> mit O(n²) auf?",
    options: [
      "Wenn das Array viele unterschiedliche Werte enthält.",
      "Wenn das Pivotelement in jedem Schritt das kleinste oder größte Element des Teilbereichs ist, z. B. bei bereits sortierten Daten und erstem Element als Pivot.",
      "Wenn das Pivotelement immer der Median des Teilbereichs ist.",
      "Wenn die Anzahl der Elemente eine Zweierpotenz ist."
    ],
    correct: [1],
    solution: "Ist das Pivot immer ein Extremwert, entsteht pro Partitionierung nur ein Teilbereich mit n−1 Elementen. Es gibt dann n Rekursionsebenen mit je bis zu n Vergleichen → n(n−1)/2 → O(n²).",
    explanation: "Gegenmaßnahmen: Pivot zufällig wählen oder „Median of three“ (Median aus erstem, mittlerem, letztem Element). Der Median als Pivot (C) ist der Best Case.",
    tags: ["quicksort"]
  },
  {
    id: "ga2-sortieren-suchen-010", part: "GA2", topic: "ga2-sortieren-suchen", type: "code", lang: "pseudocode", difficulty: 2, points: 8,
    context: "Im Ticketsystem eines IT-Dienstleisters sollen die Prioritäten der offenen Tickets (Ganzzahlen, 1 = höchste) aufsteigend sortiert werden. Die Bibliotheksfunktion <code>sort()</code> darf nicht verwendet werden.",
    question: "Entwickeln Sie die Prozedur <code>bubbleSort(a: Array von Ganzzahl)</code>, die das Array in-place aufsteigend sortiert. Die Sortierung soll vorzeitig beendet werden, wenn in einem Durchlauf keine Vertauschung mehr stattgefunden hat.",
    starter: "prozedur bubbleSort(a: Array von Ganzzahl)\n  // Ihr Code\nende prozedur",
    solution: `<pre><code>prozedur bubbleSort(a: Array von Ganzzahl)
  var n: Ganzzahl = laenge(a)
  var getauscht: Wahrheitswert = wahr
  var durchlauf: Ganzzahl = 0
  solange getauscht UND durchlauf &lt; n - 1
    getauscht = falsch
    für j von 0 bis n - 2 - durchlauf
      wenn a[j] &gt; a[j + 1] dann
        var temp: Ganzzahl = a[j]
        a[j] = a[j + 1]
        a[j + 1] = temp
        getauscht = wahr
      ende wenn
    ende für
    durchlauf = durchlauf + 1
  ende solange
ende prozedur</code></pre>
Java:
<pre><code>static void bubbleSort(int[] a) {
  boolean getauscht = true;
  for (int d = 0; d &lt; a.length - 1 &amp;&amp; getauscht; d++) {
    getauscht = false;
    for (int j = 0; j &lt; a.length - 1 - d; j++) {
      if (a[j] &gt; a[j + 1]) { int t = a[j]; a[j] = a[j + 1]; a[j + 1] = t; getauscht = true; }
    }
  }
}</code></pre>`,
    explanation: "Die innere Schleife darf höchstens bis <code>n − 2</code> laufen, weil auf <code>a[j + 1]</code> zugegriffen wird (sonst Index-Überlauf). Mit <code>− durchlauf</code> werden die bereits sortierten Elemente am Ende ausgespart. Das Flag <code>getauscht</code> muss <b>zu Beginn jedes Durchlaufs</b> auf falsch gesetzt werden. Best Case (sortiert): O(n).",
    keywords: ["getauscht|swapped|flag", "solange|while|wiederhole", "für|for", "n - 2|n-2|n - 1|n-1|length - 1", "a[j + 1]|a[j+1]", ">", "temp|tmp|hilf", "wahr|true", "falsch|false"],
    tags: ["bubblesort", "implementieren"]
  },
  {
    id: "ga2-sortieren-suchen-011", part: "GA2", topic: "ga2-sortieren-suchen", type: "code", lang: "pseudocode", difficulty: 2, points: 7,
    context: "Ein Lagerverwaltungssystem hält die Artikelnummern (Ganzzahlen) aufsteigend sortiert in einem Array. Beim Scannen soll schnell die Position eines Artikels ermittelt werden.",
    question: "Entwickeln Sie die Funktion <code>binaereSuche(a: Array von Ganzzahl, gesucht: Ganzzahl): Ganzzahl</code> <b>iterativ</b>. Sie liefert den Index des gesuchten Werts oder <code>-1</code>, wenn er nicht enthalten ist.",
    starter: "funktion binaereSuche(a: Array von Ganzzahl, gesucht: Ganzzahl): Ganzzahl\n  // Ihr Code\nende funktion",
    solution: `<pre><code>funktion binaereSuche(a: Array von Ganzzahl, gesucht: Ganzzahl): Ganzzahl
  var links: Ganzzahl = 0
  var rechts: Ganzzahl = laenge(a) - 1
  solange links &lt;= rechts
    var mitte: Ganzzahl = (links + rechts) div 2
    wenn a[mitte] == gesucht dann
      rückgabe mitte
    sonst wenn a[mitte] &lt; gesucht dann
      links = mitte + 1
    sonst
      rechts = mitte - 1
    ende wenn
  ende solange
  rückgabe -1
ende funktion</code></pre>`,
    explanation: "Typische Fehler: Bedingung <code>links &lt; rechts</code> (dann wird ein einzelnes verbleibendes Element nie geprüft), <code>links = mitte</code> bzw. <code>rechts = mitte</code> (Endlosschleife), <code>rechts = laenge(a)</code> (Index außerhalb). In Java kann <code>(links + rechts) / 2</code> bei sehr großen Arrays überlaufen → <code>links + (rechts - links) / 2</code>.",
    keywords: ["links|low|untere", "rechts|high|obere", "solange|while", "<=", "div 2|/ 2|/2", "mitte + 1|mitte+1|mid + 1|mid+1", "mitte - 1|mitte-1|mid - 1|mid-1", "-1", "rückgabe|return"],
    tags: ["binaere-suche", "implementieren"]
  },
  {
    id: "ga2-sortieren-suchen-012", part: "GA2", topic: "ga2-sortieren-suchen", type: "code", lang: "pseudocode", difficulty: 3, points: 9,
    context: "Ein Personaldienstleister speichert Bewerber als Objekte der Klasse <code>Bewerber</code> mit den Methoden <code>getName(): Text</code> und <code>getPunkte(): Ganzzahl</code>. Die Bewerberliste liegt bereits alphabetisch nach Namen sortiert vor. Sie soll nun absteigend nach Punkten sortiert werden, wobei Bewerber mit gleicher Punktzahl alphabetisch sortiert bleiben müssen.",
    question: "a) Begründen Sie, welche Eigenschaft das Sortierverfahren haben muss. (2 P)<br>b) Implementieren Sie <b>Insertion Sort</b> als Prozedur <code>sortiereNachPunkten(liste: Array von Bewerber)</code>, die diese Anforderung erfüllt. (7 P)",
    solution: `a) Das Verfahren muss <b>stabil</b> sein: Elemente mit gleichem Sortierschlüssel (Punkte) behalten ihre bisherige relative Reihenfolge – die vorhandene alphabetische Ordnung bleibt erhalten. Insertion Sort ist stabil, wenn nur bei <i>echt</i> kleinerer Punktzahl verschoben wird.<br>
b)<pre><code>prozedur sortiereNachPunkten(liste: Array von Bewerber)
  für i von 1 bis laenge(liste) - 1
    var aktuell: Bewerber = liste[i]
    var j: Ganzzahl = i - 1
    // größere Punktzahl soll nach vorn → verschiebe, solange Vorgänger WENIGER Punkte hat
    solange j &gt;= 0 UND liste[j].getPunkte() &lt; aktuell.getPunkte()
      liste[j + 1] = liste[j]
      j = j - 1
    ende solange
    liste[j + 1] = aktuell
  ende für
ende prozedur</code></pre>`,
    explanation: "Mit <code>&lt;=</code> statt <code>&lt;</code> würden gleich bewertete Bewerber übereinander geschoben → instabil, die alphabetische Reihenfolge ginge verloren. Die Prüfung <code>j &gt;= 0</code> muss <b>vor</b> dem Arrayzugriff stehen (Kurzschlussauswertung), sonst Zugriff auf liste[-1].",
    keywords: ["stabil", "reihenfolge", "für|for", "aktuell|key|temp|einfuegen", "solange|while", "j >= 0|j>=0", "getpunkte", "<", "liste[j + 1]|liste[j+1]", "j - 1|j-1"],
    tags: ["insertionsort", "stabilitaet", "objekte"]
  },
  {
    id: "ga2-sortieren-suchen-013", part: "GA2", topic: "ga2-sortieren-suchen", type: "code", lang: "pseudocode", difficulty: 3, points: 8,
    context: "Nach einer Firmenfusion liegen zwei Kundenlisten mit Kundennummern vor, die jeweils bereits aufsteigend sortiert sind. Sie sollen zu einer sortierten Liste zusammengeführt werden – effizienter als durch erneutes Sortieren (Merge-Schritt von Merge Sort).",
    question: "Entwickeln Sie die Funktion <code>mischen(a: Array von Ganzzahl, b: Array von Ganzzahl): Array von Ganzzahl</code>, die beide sortierten Arrays in O(n + m) zu einem sortierten Array zusammenführt.",
    solution: `<pre><code>funktion mischen(a: Array von Ganzzahl, b: Array von Ganzzahl): Array von Ganzzahl
  var ergebnis: Array[laenge(a) + laenge(b)] von Ganzzahl
  var i: Ganzzahl = 0      // Index in a
  var j: Ganzzahl = 0      // Index in b
  var k: Ganzzahl = 0      // Index in ergebnis
  solange i &lt; laenge(a) UND j &lt; laenge(b)
    wenn a[i] &lt;= b[j] dann
      ergebnis[k] = a[i]
      i = i + 1
    sonst
      ergebnis[k] = b[j]
      j = j + 1
    ende wenn
    k = k + 1
  ende solange
  solange i &lt; laenge(a)          // Rest von a übernehmen
    ergebnis[k] = a[i]
    i = i + 1
    k = k + 1
  ende solange
  solange j &lt; laenge(b)          // Rest von b übernehmen
    ergebnis[k] = b[j]
    j = j + 1
    k = k + 1
  ende solange
  rückgabe ergebnis
ende funktion</code></pre>`,
    explanation: "Häufig vergessen: das Übernehmen der Restelemente, nachdem eines der Arrays erschöpft ist. <code>&lt;=</code> sorgt für Stabilität (bei Gleichheit zuerst aus a). Jedes Element wird genau einmal kopiert → linear.",
    keywords: ["solange|while", "i < laenge(a)|i<laenge(a)|length", "<=", "ergebnis[k]|result", "k + 1|k+1|k++", "i + 1|i+1|i++", "j + 1|j+1|j++", "rest|übrig|uebrig", "rückgabe|return"],
    tags: ["mergesort", "merge"]
  },
  {
    id: "ga2-sortieren-suchen-014", part: "GA2", topic: "ga2-sortieren-suchen", type: "text", difficulty: 2, points: 6,
    question: "Erläutern Sie das Prinzip von <b>Quick Sort</b> und <b>Merge Sort</b> und stellen Sie drei Unterschiede der beiden Verfahren gegenüber.",
    solution: `<b>Gemeinsam:</b> Beide arbeiten nach dem Prinzip <b>Teile und herrsche</b> (Divide and Conquer) und sind meist rekursiv implementiert.<br>
<b>Quick Sort:</b> Ein Pivotelement wird gewählt; das Array wird so partitioniert, dass alle kleineren Elemente links und alle größeren rechts vom Pivot stehen. Danach werden beide Teilbereiche rekursiv sortiert. Die Hauptarbeit liegt im <i>Teilen</i>.<br>
<b>Merge Sort:</b> Das Array wird rekursiv halbiert, bis Teillisten der Länge 1 entstehen. Anschließend werden jeweils zwei sortierte Teillisten zu einer sortierten Liste gemischt (merge). Die Hauptarbeit liegt im <i>Zusammenführen</i>.<br>
<b>Unterschiede:</b><table><tr><th></th><th>Quick Sort</th><th>Merge Sort</th></tr>
<tr><td>Worst Case</td><td>O(n²)</td><td>O(n log n)</td></tr>
<tr><td>Speicher</td><td>in-place (nur Rekursionsstack)</td><td>O(n) Zusatzspeicher</td></tr>
<tr><td>Stabilität</td><td>nicht stabil</td><td>stabil</td></tr>
<tr><td>Praxis</td><td>im Mittel sehr schnell (Cache-freundlich)</td><td>gut für verkettete Listen/externe Sortierung</td></tr></table>`,
    keywords: ["teile und herrsche|divide|teilen", "pivot", "partition|kleiner|größer|groesser", "rekursiv|rekursion", "halbieren|hälfte|haelfte", "mischen|merge|zusammenführen|zusammenfuehren", "n log n|nlogn", "n²|n^2|quadratisch", "stabil", "speicher|in-place|in place"],
    tags: ["quicksort", "mergesort"]
  }
);

// ===================== ga2-rekursion =====================
AP2.questions.push(
  {
    id: "ga2-rekursion-001", part: "GA2", topic: "ga2-rekursion", type: "mc", difficulty: 1, points: 2,
    question: "Was versteht man bei einer rekursiven Funktion unter dem <b>Rekursionsanker</b>?",
    options: [
      "Den Aufruf der Funktion durch sich selbst mit einem kleineren Argument",
      "Die Abbruchbedingung, bei der das Ergebnis direkt (ohne weiteren rekursiven Aufruf) berechnet wird",
      "Den Speicherbereich, in dem die Rücksprungadressen abgelegt werden",
      "Die erste Zeile der Funktion, in der die Parameter deklariert werden"
    ],
    correct: [1],
    solution: "Der <b>Rekursionsanker</b> (Basisfall) ist der Fall, der ohne weiteren Selbstaufruf gelöst wird, z. B. <code>wenn n &lt;= 1 dann rückgabe 1</code> bei der Fakultät. Er beendet die Rekursion.",
    explanation: "A beschreibt den Rekursionsschritt, C den Aufrufstack. Ohne erreichbaren Anker entsteht eine unendliche Rekursion → StackOverflowError.",
    tags: ["grundlagen"]
  },
  {
    id: "ga2-rekursion-002", part: "GA2", topic: "ga2-rekursion", type: "numeric", difficulty: 2, points: 4,
    question: `Wie oft wird die Funktion <code>fib</code> insgesamt aufgerufen (einschließlich des ersten Aufrufs), wenn <code>fib(5)</code> berechnet wird?
<pre><code>funktion fib(n: Ganzzahl): Ganzzahl
  wenn n &lt; 2 dann
    rückgabe n
  ende wenn
  rückgabe fib(n - 1) + fib(n - 2)
ende funktion</code></pre>`,
    answer: 15, tolerance: 0,
    solution: "Aufrufanzahl A(n) = A(n−1) + A(n−2) + 1 mit A(0) = A(1) = 1:<br>A(2) = 1+1+1 = 3, A(3) = 3+1+1 = 5, A(4) = 5+3+1 = 9, A(5) = 9+5+1 = <b>15</b>.<br>Aufrufbaum: fib(5) → fib(4), fib(3); fib(4) → fib(3), fib(2); … fib(3) wird 2-mal, fib(2) 3-mal berechnet.",
    explanation: "Die naive Fibonacci-Rekursion hat exponentielle Laufzeit O(2ⁿ), weil Teilergebnisse mehrfach berechnet werden. Abhilfe: Memoisierung oder iterative Lösung (O(n)).",
    tags: ["fibonacci", "aufrufe-zaehlen"]
  },
  {
    id: "ga2-rekursion-003", part: "GA2", topic: "ga2-rekursion", type: "numeric", difficulty: 3, points: 5,
    question: `Welchen Wert liefert der Aufruf <code>geheim(7, 13)</code>?
<pre><code>funktion geheim(a: Ganzzahl, b: Ganzzahl): Ganzzahl
  wenn b == 0 dann
    rückgabe 0
  ende wenn
  wenn b mod 2 == 0 dann
    rückgabe geheim(a + a, b div 2)
  ende wenn
  rückgabe geheim(a + a, b div 2) + a
ende funktion</code></pre>`,
    answer: 91, tolerance: 0,
    solution: `<table><tr><th>Aufruf</th><th>b mod 2</th><th>Rückgabe</th></tr>
<tr><td>geheim(7, 13)</td><td>1</td><td>geheim(14, 6) + 7 = 84 + 7 = 91</td></tr>
<tr><td>geheim(14, 6)</td><td>0</td><td>geheim(28, 3) = 84</td></tr>
<tr><td>geheim(28, 3)</td><td>1</td><td>geheim(56, 1) + 28 = 56 + 28 = 84</td></tr>
<tr><td>geheim(56, 1)</td><td>1</td><td>geheim(112, 0) + 56 = 0 + 56 = 56</td></tr>
<tr><td>geheim(112, 0)</td><td>–</td><td>0 (Anker)</td></tr></table>Ergebnis: <b>91</b> = 7 · 13. Die Funktion multipliziert durch Verdoppeln und Halbieren („russische Bauernmultiplikation“).`,
    explanation: "Rückgabewerte von unten nach oben einsetzen. Fehlerquelle: Das „+ a“ wird mit dem a des jeweiligen Aufrufs addiert, nicht mit dem ursprünglichen a = 7.",
    tags: ["trace", "aufrufbaum"]
  },
  {
    id: "ga2-rekursion-004", part: "GA2", topic: "ga2-rekursion", type: "numeric", difficulty: 2, points: 3,
    context: `Die Türme von Hanoi werden rekursiv gelöst:
<pre><code>prozedur hanoi(n: Ganzzahl, von: Text, nach: Text, hilf: Text)
  wenn n &gt; 0 dann
    hanoi(n - 1, von, hilf, nach)
    ausgabe("Scheibe " + n + " von " + von + " nach " + nach)
    hanoi(n - 1, hilf, nach, von)
  ende wenn
ende prozedur</code></pre>`,
    question: "Wie viele Ausgaben (Scheibenbewegungen) erzeugt der Aufruf <code>hanoi(5, \"A\", \"C\", \"B\")</code>?",
    answer: 31, tolerance: 0,
    solution: "Z(n) = 2 · Z(n−1) + 1 mit Z(0) = 0 → Z(1) = 1, Z(2) = 3, Z(3) = 7, Z(4) = 15, Z(5) = <b>31</b> = 2⁵ − 1.",
    explanation: "Exponentielles Wachstum O(2ⁿ): Bei 64 Scheiben wären es 2⁶⁴ − 1 ≈ 1,8·10¹⁹ Züge.",
    tags: ["hanoi", "aufrufe-zaehlen"]
  },
  {
    id: "ga2-rekursion-005", part: "GA2", topic: "ga2-rekursion", type: "code", lang: "pseudocode", difficulty: 1, points: 5,
    question: "Entwickeln Sie eine <b>rekursive</b> Funktion <code>fakultaet(n: Ganzzahl): Ganzzahl</code>, die n! berechnet (0! = 1). Für negative Werte soll eine <code>IllegalArgumentException</code> geworfen werden.",
    starter: "funktion fakultaet(n: Ganzzahl): Ganzzahl\n  // Ihr Code\nende funktion",
    solution: `<pre><code>funktion fakultaet(n: Ganzzahl): Ganzzahl
  wenn n &lt; 0 dann
    wirf neue IllegalArgumentException("n darf nicht negativ sein")
  ende wenn
  wenn n &lt;= 1 dann            // Rekursionsanker: 0! = 1! = 1
    rückgabe 1
  ende wenn
  rückgabe n * fakultaet(n - 1)   // Rekursionsschritt
ende funktion</code></pre>
Java:
<pre><code>static long fakultaet(int n) {
  if (n &lt; 0) throw new IllegalArgumentException("n &lt; 0");
  return n &lt;= 1 ? 1 : n * fakultaet(n - 1);
}</code></pre>`,
    explanation: "Ohne Prüfung auf negative Werte würde <code>fakultaet(-1)</code> den Anker nie erreichen (StackOverflow). Hinweis: int läuft bereits ab 13! über, long ab 21! – ggf. BigInteger verwenden.",
    keywords: ["wenn|if", "n <= 1|n<=1|n == 0|n==0|n < 2|n<2", "rückgabe 1|return 1", "n * fakultaet(n - 1)|n*fakultaet(n-1)|n * fakultaet(n-1)", "n < 0|n<0", "wirf|throw", "exception"],
    tags: ["fakultaet"]
  },
  {
    id: "ga2-rekursion-006", part: "GA2", topic: "ga2-rekursion", type: "code", lang: "pseudocode", difficulty: 2, points: 6,
    context: "Für eine Bruchrechen-Lernsoftware sollen Brüche gekürzt werden. Dazu wird der größte gemeinsame Teiler (ggT) benötigt. Euklid: ggT(a, b) = a, falls b = 0, sonst ggT(b, a mod b).",
    question: "a) Entwickeln Sie die rekursive Funktion <code>ggT(a: Ganzzahl, b: Ganzzahl): Ganzzahl</code> (a, b ≥ 0). (3 P)<br>b) Entwickeln Sie unter Verwendung von ggT die Funktion <code>kgV(a, b)</code> (kleinstes gemeinsames Vielfaches, kgV = a · b / ggT(a, b)). Berücksichtigen Sie, dass a oder b 0 sein kann. (2 P)<br>c) Geben Sie die Aufruffolge für ggT(1071, 462) an. (1 P)",
    solution: `<pre><code>funktion ggT(a: Ganzzahl, b: Ganzzahl): Ganzzahl
  wenn b == 0 dann
    rückgabe a
  ende wenn
  rückgabe ggT(b, a mod b)
ende funktion

funktion kgV(a: Ganzzahl, b: Ganzzahl): Ganzzahl
  wenn a == 0 ODER b == 0 dann
    rückgabe 0
  ende wenn
  rückgabe (a div ggT(a, b)) * b     // erst teilen → kleineres Überlaufrisiko
ende funktion</code></pre>
c) ggT(1071, 462) → ggT(462, 147) → ggT(147, 21) → ggT(21, 0) → <b>21</b> (4 Aufrufe).`,
    explanation: "Der Euklidische Algorithmus ist endrekursiv und lässt sich leicht als Schleife schreiben (<code>solange b != 0: r = a mod b; a = b; b = r</code>). Bei kgV ohne Sonderfall 0 wäre ggT(0, 0) = 0 → Division durch 0.",
    keywords: ["b == 0|b==0", "rückgabe a|return a", "ggt(b, a mod b)|ggt(b,a mod b)|ggt(b, a % b)|ggt(b,a%b)", "mod|%", "kgv", "div|/", "== 0|==0", "21"],
    tags: ["ggt", "euklid"]
  },
  {
    id: "ga2-rekursion-007", part: "GA2", topic: "ga2-rekursion", type: "code", lang: "pseudocode", difficulty: 2, points: 5,
    question: "Entwickeln Sie eine <b>rekursive</b> Funktion <code>binaer(n: Ganzzahl): Text</code>, die eine nicht negative Ganzzahl in ihre Binärdarstellung umwandelt (z. B. <code>binaer(13)</code> → \"1101\"). Die Funktion <code>alsText(z)</code> wandelt eine Zahl in Text um.",
    starter: "funktion binaer(n: Ganzzahl): Text\n  // Ihr Code\nende funktion",
    solution: `<pre><code>funktion binaer(n: Ganzzahl): Text
  wenn n &lt; 2 dann                       // Anker: 0 → "0", 1 → "1"
    rückgabe alsText(n)
  ende wenn
  rückgabe binaer(n div 2) + alsText(n mod 2)
ende funktion</code></pre>
Ablauf binaer(13): binaer(6) + "1" → (binaer(3) + "0") + "1" → ((binaer(1) + "1") + "0") + "1" → "1" + "1" + "0" + "1" = <b>"1101"</b>.`,
    explanation: "Die Reihenfolge der Konkatenation ist entscheidend: Der rekursive Teil (höherwertige Bits) steht <b>vor</b> dem Rest. Bei <code>alsText(n mod 2) + binaer(n div 2)</code> würde die Zahl gespiegelt (\"1011\"). Das entspricht dem Divisionsrestverfahren, bei dem die Reste von unten nach oben gelesen werden.",
    keywords: ["n < 2|n<2|n <= 1|n<=1", "rückgabe|return", "binaer(n div 2)|binaer(n / 2)|binaer(n/2)|binaer(n div 2)", "mod 2|% 2|%2", "alstext|tostring|str", "+"],
    tags: ["binaer", "zahlensystem"]
  },
  {
    id: "ga2-rekursion-008", part: "GA2", topic: "ga2-rekursion", type: "code", lang: "pseudocode", difficulty: 2, points: 5,
    context: "Für eine Prüfziffernberechnung wird die Quersumme einer Zahl benötigt (z. B. Quersumme(4711) = 4 + 7 + 1 + 1 = 13).",
    question: "Entwickeln Sie eine <b>rekursive</b> Funktion <code>quersumme(n: Ganzzahl): Ganzzahl</code> für n ≥ 0 ohne Umwandlung in Text. Erläutern Sie kurz Anker und Rekursionsschritt.",
    solution: `<pre><code>funktion quersumme(n: Ganzzahl): Ganzzahl
  wenn n &lt; 10 dann                         // Anker: einstellige Zahl
    rückgabe n
  ende wenn
  rückgabe (n mod 10) + quersumme(n div 10) // letzte Ziffer + Quersumme des Rests
ende funktion</code></pre>
<b>Anker:</b> Eine einstellige Zahl ist ihre eigene Quersumme. <b>Rekursionsschritt:</b> Die letzte Ziffer (<code>n mod 10</code>) wird abgetrennt und zur Quersumme der um eine Stelle verkürzten Zahl (<code>n div 10</code>) addiert. Da n in jedem Schritt kleiner wird, wird der Anker sicher erreicht.<br>
quersumme(4711) = 1 + quersumme(471) = 1 + 1 + quersumme(47) = 1 + 1 + 7 + 4 = 13.`,
    explanation: "Typischer Fehler: <code>n / 10</code> mit Gleitkommadivision – dann wird n nie kleiner als 10 im Ganzzahlsinn bzw. es entstehen Nachkommastellen. Ganzzahldivision (div) verwenden.",
    keywords: ["n < 10|n<10|n == 0|n==0", "mod 10|% 10|%10", "div 10|/ 10|/10", "quersumme(", "rückgabe|return", "anker|abbruch", "rekursionsschritt|selbstaufruf|ruft sich"],
    tags: ["quersumme"]
  },
  {
    id: "ga2-rekursion-009", part: "GA2", topic: "ga2-rekursion", type: "code", lang: "pseudocode", difficulty: 3, points: 8,
    question: `Gegeben ist die rekursive Funktion:
<pre><code>funktion potenz(basis: Gleitkommazahl, exp: Ganzzahl): Gleitkommazahl
  wenn exp == 0 dann
    rückgabe 1
  ende wenn
  rückgabe basis * potenz(basis, exp - 1)
ende funktion</code></pre>
a) Formen Sie die Funktion in eine <b>iterative</b> Variante um. (3 P)<br>
b) Entwickeln Sie eine verbesserte rekursive Variante, die ausnutzt, dass b^e = (b^(e/2))² für gerade e gilt („schnelles Potenzieren“). (4 P)<br>
c) Geben Sie für beide Varianten die Anzahl der Multiplikationen in O-Notation an. (1 P)`,
    solution: `a)<pre><code>funktion potenzIterativ(basis: Gleitkommazahl, exp: Ganzzahl): Gleitkommazahl
  var ergebnis: Gleitkommazahl = 1
  für i von 1 bis exp
    ergebnis = ergebnis * basis
  ende für
  rückgabe ergebnis
ende funktion</code></pre>
b)<pre><code>funktion potenzSchnell(basis: Gleitkommazahl, exp: Ganzzahl): Gleitkommazahl
  wenn exp == 0 dann
    rückgabe 1
  ende wenn
  var halb: Gleitkommazahl = potenzSchnell(basis, exp div 2)   // nur EIN Aufruf
  wenn exp mod 2 == 0 dann
    rückgabe halb * halb
  sonst
    rückgabe halb * halb * basis
  ende wenn
ende funktion</code></pre>
c) Einfache Variante (rekursiv und iterativ): O(n) Multiplikationen (n = exp). Schnelles Potenzieren: O(log n), da sich der Exponent in jedem Schritt halbiert.`,
    explanation: "Fehlerfalle in b): <code>rückgabe potenzSchnell(b, e div 2) * potenzSchnell(b, e div 2)</code> ruft die Funktion zweimal auf – damit ist der Vorteil verloren (wieder O(n) Aufrufe). Das Zwischenergebnis muss in einer Variablen gespeichert werden.",
    keywords: ["für|for|solange|while", "ergebnis = ergebnis * basis|ergebnis*=basis|ergebnis *= basis", "exp == 0|exp==0", "div 2|/ 2|/2", "mod 2|% 2|%2", "halb * halb|halb*halb", "log", "o(n)"],
    tags: ["potenz", "iteration"]
  },
  {
    id: "ga2-rekursion-010", part: "GA2", topic: "ga2-rekursion", type: "mc", difficulty: 2, points: 2,
    question: "Ein Java-Programm bricht beim Aufruf einer rekursiven Methode mit <code>java.lang.StackOverflowError</code> ab. Was ist die <b>wahrscheinlichste</b> Ursache?",
    options: [
      "Es wurden zu viele Objekte auf dem Heap angelegt.",
      "Der Rekursionsanker fehlt oder wird mit den übergebenen Argumenten nie erreicht.",
      "Eine Ganzzahl ist über ihren Wertebereich hinaus gelaufen.",
      "Eine Datei konnte nicht geöffnet werden."
    ],
    correct: [1],
    solution: "Jeder Aufruf legt einen Stack-Frame an. Wird der Anker nie erreicht (oder ist die Rekursionstiefe extrem groß), wächst der Aufrufstack bis zu seinem Limit → <b>StackOverflowError</b>.",
    explanation: "A führt zu OutOfMemoryError, C zu einem stillen Überlauf (kein Fehler in Java), D zu einer IOException/FileNotFoundException.",
    tags: ["stack", "fehler"]
  },
  {
    id: "ga2-rekursion-011", part: "GA2", topic: "ga2-rekursion", type: "multi", difficulty: 2, points: 4,
    question: "Welche Aussagen zum Vergleich von Rekursion und Iteration sind <b>richtig</b>?",
    options: [
      "Jeder rekursive Algorithmus lässt sich auch iterativ formulieren (ggf. mit einem eigenen Stack).",
      "Rekursive Lösungen benötigen grundsätzlich weniger Speicher als iterative.",
      "Bei rekursiven Datenstrukturen wie Bäumen führen rekursive Lösungen oft zu kürzerem, besser lesbarem Code.",
      "Jeder rekursive Aufruf verursacht Verwaltungsaufwand (Stack-Frame für Parameter, lokale Variablen, Rücksprungadresse).",
      "Eine rekursive Funktion darf höchstens einen rekursiven Aufruf enthalten."
    ],
    correct: [0, 2, 3],
    solution: "Richtig: A, C, D. B ist falsch – Rekursion benötigt Speicher proportional zur Rekursionstiefe (Stack), eine Schleife meist nur konstanten Speicher. E ist falsch – Baumrekursion (z. B. Fibonacci, Merge Sort, Hanoi) enthält mehrere Aufrufe.",
    explanation: "In der Prüfung wird gern gefragt, wann Rekursion sinnvoll ist: bei rekursiv definierten Problemen/Strukturen (Bäume, Verzeichnisse, Divide and Conquer), wenn die Tiefe begrenzt ist.",
    tags: ["rekursion-vs-iteration"]
  },
  {
    id: "ga2-rekursion-012", part: "GA2", topic: "ga2-rekursion", type: "text", difficulty: 2, points: 5,
    question: "Beschreiben Sie, wie sich der <b>Aufrufstack</b> bei der Berechnung von <code>fakultaet(3)</code> (rekursiv: <code>n * fakultaet(n - 1)</code>, Anker n ≤ 1) aufbaut und wieder abbaut.",
    solution: `<b>Aufbau (Abstieg):</b><ol><li>fakultaet(3) wird aufgerufen → Frame mit n = 3; Berechnung 3 · fakultaet(2) muss warten.</li>
<li>fakultaet(2) → Frame n = 2 auf den Stack; wartet auf fakultaet(1).</li>
<li>fakultaet(1) → Frame n = 1; Anker erreicht, Rückgabe 1.</li></ol>
<b>Abbau (Aufstieg, LIFO):</b><ol><li>Frame n = 1 wird entfernt, Rückgabe 1 an fakultaet(2) → 2 · 1 = 2.</li>
<li>Frame n = 2 wird entfernt, Rückgabe 2 an fakultaet(3) → 3 · 2 = 6.</li>
<li>Frame n = 3 wird entfernt, Ergebnis 6 an den Aufrufer.</li></ol>
Jeder Frame enthält Parameter, lokale Variablen und die Rücksprungadresse. Maximal liegen hier 3 Frames gleichzeitig auf dem Stack (Tiefe = n).`,
    keywords: ["stack|stapel", "frame|rahmen", "parameter|lokale variable", "rücksprung|ruecksprung|rückgabe|rueckgabe", "anker", "lifo|zuletzt|umgekehrt", "6", "warten|wartet|ausstehend"],
    tags: ["stack", "fakultaet"]
  },
  {
    id: "ga2-rekursion-013", part: "GA2", topic: "ga2-rekursion", type: "text", difficulty: 2, points: 5,
    context: `Ein Auszubildender hat folgende Funktion geschrieben, die alle Zahlen n, n−2, n−4, … bis 0 summieren soll:
<pre><code>funktion summeJedeZweite(n: Ganzzahl): Ganzzahl
  wenn n == 0 dann
    rückgabe 0
  ende wenn
  rückgabe n + summeJedeZweite(n - 2)
ende funktion</code></pre>`,
    question: "Analysieren Sie, welches Problem beim Aufruf <code>summeJedeZweite(5)</code> auftritt, und schlagen Sie eine Korrektur vor.",
    solution: "Bei ungeradem n wird die Folge 5, 3, 1, −1, −3, … gebildet. Der Rekursionsanker <code>n == 0</code> wird <b>nie erreicht</b> → unendliche Rekursion, der Aufrufstack läuft über (<b>StackOverflowError</b>).<br><b>Korrektur:</b> Anker auf <code>wenn n &lt;= 0 dann rückgabe 0</code> ändern. Dann gilt summeJedeZweite(5) = 5 + 3 + 1 + 0 = 9. Alternativ negative Eingaben vorab mit einer Exception abweisen.",
    explanation: "Merksatz: Der Rekursionsschritt muss das Problem so verkleinern, dass der Anker <b>für alle zulässigen Eingaben</b> erreicht wird. Anker möglichst mit <code>&lt;=</code> statt <code>==</code> formulieren.",
    keywords: ["ungerade", "anker|abbruchbedingung", "nie erreicht|nicht erreicht|niemals", "negativ|-1", "stackoverflow|stack overflow|stapelüberlauf|endlos|unendlich", "<= 0|<=0", "9"],
    tags: ["fehlersuche", "anker"]
  },
  {
    id: "ga2-rekursion-014", part: "GA2", topic: "ga2-rekursion", type: "order", difficulty: 2, points: 4,
    question: `In welcher Reihenfolge erscheinen die Ausgaben beim Aufruf <code>zeige(3)</code>?
<pre><code>prozedur zeige(n: Ganzzahl)
  wenn n &gt; 0 dann
    ausgabe("A" + n)
    zeige(n - 1)
    ausgabe("B" + n)
  ende wenn
ende prozedur</code></pre>`,
    items: ["A3", "A2", "A1", "B1", "B2", "B3"],
    solution: "zeige(3): A3 → zeige(2): A2 → zeige(1): A1 → zeige(0): nichts → zurück in zeige(1): B1 → zurück in zeige(2): B2 → zurück in zeige(3): B3.<br>Ausgabe: <b>A3 A2 A1 B1 B2 B3</b>",
    explanation: "Anweisungen <b>vor</b> dem rekursiven Aufruf werden beim Abstieg ausgeführt, Anweisungen <b>danach</b> beim Aufstieg in umgekehrter Reihenfolge (LIFO des Aufrufstacks).",
    tags: ["trace", "stack"]
  }
);

// ===================== ga2-datenstrukturen =====================
AP2.questions.push(
  {
    id: "ga2-datenstrukturen-001", part: "GA2", topic: "ga2-datenstrukturen", type: "mc", difficulty: 1, points: 2,
    question: "Welche Datenstruktur arbeitet nach dem <b>LIFO</b>-Prinzip (Last In – First Out)?",
    options: ["Queue (Warteschlange)", "Stack (Stapel)", "Hash-Tabelle", "Binärer Suchbaum"],
    correct: [1],
    solution: "Beim <b>Stack</b> wird das zuletzt mit <code>push</code> abgelegte Element als erstes mit <code>pop</code> entnommen.",
    explanation: "Queue = FIFO (First In – First Out). Einsatz Stack: Aufrufstack, Undo-Funktion, Klammerprüfung, Rückwärtsnavigation im Browser.",
    tags: ["stack"]
  },
  {
    id: "ga2-datenstrukturen-002", part: "GA2", topic: "ga2-datenstrukturen", type: "order", difficulty: 2, points: 3,
    question: "Auf einem leeren Stack werden folgende Operationen ausgeführt: <code>push(\"A\"), push(\"B\"), pop(), push(\"C\"), push(\"D\"), pop(), pop(), pop()</code>. Bringen Sie die von <code>pop()</code> gelieferten Elemente in die Reihenfolge ihrer Ausgabe.",
    items: ["B", "D", "C", "A"],
    solution: `<table><tr><th>Operation</th><th>Stack (unten → oben)</th><th>Ausgabe</th></tr>
<tr><td>push A</td><td>A</td><td></td></tr><tr><td>push B</td><td>A B</td><td></td></tr>
<tr><td>pop</td><td>A</td><td>B</td></tr><tr><td>push C</td><td>A C</td><td></td></tr>
<tr><td>push D</td><td>A C D</td><td></td></tr><tr><td>pop</td><td>A C</td><td>D</td></tr>
<tr><td>pop</td><td>A</td><td>C</td></tr><tr><td>pop</td><td>–</td><td>A</td></tr></table>Ausgabe: <b>B, D, C, A</b>`,
    explanation: "Bei einer Queue wäre die Ausgabe A, B, C, D (Reihenfolge des Einfügens).",
    tags: ["stack", "trace"]
  },
  {
    id: "ga2-datenstrukturen-003", part: "GA2", topic: "ga2-datenstrukturen", type: "order", difficulty: 2, points: 4,
    question: "In einen leeren binären Suchbaum werden nacheinander die Schlüssel <code>50, 30, 70, 20, 40, 60, 80</code> eingefügt. Bringen Sie die Schlüssel in die Reihenfolge einer <b>Preorder</b>-Traversierung (Wurzel – links – rechts).",
    items: ["50", "30", "20", "40", "70", "60", "80"],
    solution: `Entstehender Baum:<pre><code>        50
      /    \\
    30      70
   /  \\    /  \\
  20  40  60  80</code></pre>
Preorder: <b>50, 30, 20, 40, 70, 60, 80</b><br>Inorder (links–Wurzel–rechts): 20, 30, 40, 50, 60, 70, 80 (sortiert!)<br>Postorder (links–rechts–Wurzel): 20, 40, 30, 60, 80, 70, 50`,
    explanation: "Inorder liefert bei einem binären Suchbaum immer die sortierte Folge. Preorder eignet sich zum Kopieren/Serialisieren eines Baums, Postorder zum Löschen (Kinder vor Eltern).",
    tags: ["baum", "traversierung"]
  },
  {
    id: "ga2-datenstrukturen-004", part: "GA2", topic: "ga2-datenstrukturen", type: "numeric", difficulty: 2, points: 4,
    context: "Eine Hash-Tabelle hat 11 Plätze (Index 0–10). Hashfunktion: <code>h(k) = k mod 11</code>. Kollisionen werden durch <b>lineares Sondieren</b> aufgelöst (nächster freier Platz, ggf. zyklisch).",
    question: "Die Schlüssel <code>22, 33, 15, 44</code> werden in dieser Reihenfolge eingefügt. An welchem Index wird der Schlüssel <b>44</b> gespeichert?",
    answer: 2, tolerance: 0,
    solution: "22 mod 11 = 0 → Index 0<br>33 mod 11 = 0 → belegt → Index 1<br>15 mod 11 = 4 → Index 4<br>44 mod 11 = 0 → 0 belegt, 1 belegt → Index <b>2</b>",
    explanation: "Lineares Sondieren führt zu Clusterbildung (Primärhäufung) – hier entsteht ein Block 0–2. Alternative: Verkettung (jeder Index enthält eine Liste) oder quadratisches Sondieren.",
    tags: ["hashtabelle", "kollision"]
  },
  {
    id: "ga2-datenstrukturen-005", part: "GA2", topic: "ga2-datenstrukturen", type: "numeric", difficulty: 2, points: 3,
    question: "In einen leeren binären Suchbaum werden die Schlüssel <code>10, 5, 15, 3, 7, 12, 20, 1</code> eingefügt. Wie viele Schlüsselvergleiche sind nötig, um den Schlüssel <b>1</b> zu finden (Vergleich mit dem gefundenen Knoten mitgezählt)?",
    answer: 4, tolerance: 0,
    solution: `Baum:<pre><code>         10
       /    \\
      5      15
     / \\    /  \\
    3   7  12  20
   /
  1</code></pre>Suchweg: 10 (1 &lt; 10, links) → 5 (links) → 3 (links) → 1 gefunden = <b>4</b> Vergleiche.`,
    explanation: "Die Suchdauer entspricht der Tiefe des Knotens. Werden die Schlüssel sortiert eingefügt (1, 3, 5, …), entartet der Baum zu einer Liste – Suche dann O(n).",
    tags: ["baum", "suchbaum"]
  },
  {
    id: "ga2-datenstrukturen-006", part: "GA2", topic: "ga2-datenstrukturen", type: "multi", difficulty: 2, points: 4,
    question: "Welche Aussagen zum Vergleich von <b>Array</b> und <b>einfach verketteter Liste</b> sind richtig?",
    options: [
      "Der Zugriff auf das i-te Element erfolgt beim Array in konstanter Zeit, bei der verketteten Liste in linearer Zeit.",
      "Das Einfügen am Listenanfang ist bei der verketteten Liste in konstanter Zeit möglich.",
      "Eine verkettete Liste benötigt pro Element weniger Speicher als ein Array.",
      "Beim Einfügen in der Mitte eines Arrays müssen nachfolgende Elemente verschoben werden.",
      "Binäre Suche ist auf einer verketteten Liste genauso effizient wie auf einem Array."
    ],
    correct: [0, 1, 3],
    solution: "Richtig: A, B, D. C ist falsch – jeder Knoten speichert zusätzlich mindestens einen Zeiger (Referenz). E ist falsch – ohne wahlfreien Zugriff muss zur Mitte gelaufen werden, die binäre Suche verliert ihren Vorteil.",
    explanation: "Faustregel: Viele Indexzugriffe → Array/ArrayList. Häufiges Einfügen/Löschen an bekannten Positionen (z. B. am Anfang) → LinkedList.",
    tags: ["array", "liste"]
  },
  {
    id: "ga2-datenstrukturen-007", part: "GA2", topic: "ga2-datenstrukturen", type: "mc", difficulty: 1, points: 2,
    context: "Im Support-Ticketsystem sollen eingehende Anfragen in der Reihenfolge ihres Eingangs bearbeitet werden.",
    question: "Welche Datenstruktur ist hierfür am besten geeignet?",
    options: ["Stack", "Queue", "Set", "Binärbaum"],
    correct: [1],
    solution: "Eine <b>Queue</b> (FIFO) liefert immer das am längsten wartende Ticket zuerst: <code>enqueue</code> fügt hinten an, <code>dequeue</code> entnimmt vorn.",
    explanation: "Sollen Tickets nach Dringlichkeit bearbeitet werden, wäre eine Priority Queue (z. B. Heap) geeignet.",
    tags: ["queue"]
  },
  {
    id: "ga2-datenstrukturen-008", part: "GA2", topic: "ga2-datenstrukturen", type: "mc", difficulty: 2, points: 2,
    context: "Bei einem Datenimport mit 500 000 Datensätzen soll für jeden Datensatz schnell geprüft werden, ob die Kundennummer bereits importiert wurde. Doppelte Kundennummern sollen ignoriert werden.",
    question: "Welche Datenstruktur ist am besten geeignet?",
    options: ["Unsortiertes Array mit linearer Suche", "Verkettete Liste", "HashSet", "Stack"],
    correct: [2],
    solution: "Ein <b>HashSet</b> speichert jede Kundennummer nur einmal und prüft mit <code>enthaelt()</code> im Mittel in O(1). Bei 500 000 Datensätzen ergibt das insgesamt O(n) statt O(n²) mit linearer Suche.",
    explanation: "Werden zusätzlich Daten zur Kundennummer benötigt, wäre eine HashMap (Kundennummer → Kunde) passend.",
    tags: ["set", "auswahl"]
  },
  {
    id: "ga2-datenstrukturen-009", part: "GA2", topic: "ga2-datenstrukturen", type: "code", lang: "pseudocode", difficulty: 3, points: 9,
    context: "Ein Formeleditor einer Tabellenkalkulation soll prüfen, ob die Klammern in einer Formel korrekt gesetzt sind. Erlaubt sind <code>()</code>, <code>[]</code> und <code>{}</code>. Beispiele: <code>\"(a+[b*c])\"</code> → gültig, <code>\"(a+b]\"</code> → ungültig, <code>\"((a)\"</code> → ungültig.",
    question: "Entwickeln Sie die Funktion <code>klammernKorrekt(formel: Text): Wahrheitswert</code> unter Verwendung eines Stacks (Methoden <code>push(z)</code>, <code>pop(): Zeichen</code>, <code>istLeer(): Wahrheitswert</code>).",
    starter: "funktion klammernKorrekt(formel: Text): Wahrheitswert\n  var stack: Stack von Zeichen = neuer Stack()\n  // Ihr Code\nende funktion",
    solution: `<pre><code>funktion klammernKorrekt(formel: Text): Wahrheitswert
  var stack: Stack von Zeichen = neuer Stack()
  für i von 0 bis laenge(formel) - 1
    var z: Zeichen = zeichenAn(formel, i)
    wenn z == '(' ODER z == '[' ODER z == '{' dann
      stack.push(z)
    sonst wenn z == ')' ODER z == ']' ODER z == '}' dann
      wenn stack.istLeer() dann
        rückgabe falsch                 // schließende Klammer ohne öffnende
      ende wenn
      var offen: Zeichen = stack.pop()
      wenn (z == ')' UND offen != '(') ODER
           (z == ']' UND offen != '[') ODER
           (z == '}' UND offen != '{') dann
        rückgabe falsch                 // falscher Klammertyp
      ende wenn
    ende wenn
  ende für
  rückgabe stack.istLeer()              // keine offenen Klammern übrig
ende funktion</code></pre>`,
    explanation: "Drei Fehlerfälle müssen erkannt werden: (1) schließende Klammer bei leerem Stack, (2) falscher Typ, (3) am Ende noch offene Klammern. Ein reiner Zähler (+1/−1) reicht bei mehreren Klammertypen nicht, weil \"(]\" nicht erkannt würde.",
    keywords: ["stack|stapel", "push", "pop", "istleer|isempty|empty", "für|for", "zeichenan|charat", "falsch|false", "rückgabe stack.istleer|return stack.isempty|istleer()", "'('|\"(\""],
    tags: ["stack", "klammern"]
  },
  {
    id: "ga2-datenstrukturen-010", part: "GA2", topic: "ga2-datenstrukturen", type: "code", lang: "pseudocode", difficulty: 3, points: 10,
    context: "Ein Druckserver soll Druckaufträge (Auftragsnummern als Ganzzahlen) in einer Warteschlange fester Größe verwalten. Die Warteschlange wird als <b>Ringpuffer</b> auf einem Array umgesetzt.",
    question: "Implementieren Sie die Klasse <code>Warteschlange</code> mit den Attributen <code>daten: Array von Ganzzahl</code>, <code>kopf</code>, <code>anzahl</code> und den Methoden<ul><li><code>konstruktor Warteschlange(kapazitaet: Ganzzahl)</code></li><li><code>einreihen(x: Ganzzahl)</code> – wirft eine Exception, wenn die Schlange voll ist</li><li><code>entnehmen(): Ganzzahl</code> – wirft eine Exception, wenn die Schlange leer ist</li><li><code>istLeer(): Wahrheitswert</code></li></ul>",
    solution: `<pre><code>klasse Warteschlange
  privat daten: Array von Ganzzahl
  privat kopf: Ganzzahl        // Index des ersten Elements
  privat anzahl: Ganzzahl      // aktuelle Anzahl Elemente

  öffentlich konstruktor Warteschlange(kapazitaet: Ganzzahl)
    this.daten = neues Array[kapazitaet] von Ganzzahl
    this.kopf = 0
    this.anzahl = 0
  ende konstruktor

  öffentlich methode einreihen(x: Ganzzahl)
    wenn anzahl == laenge(daten) dann
      wirf neue IllegalStateException("Warteschlange voll")
    ende wenn
    var ende: Ganzzahl = (kopf + anzahl) mod laenge(daten)
    daten[ende] = x
    anzahl = anzahl + 1
  ende methode

  öffentlich methode entnehmen(): Ganzzahl
    wenn istLeer() dann
      wirf neue IllegalStateException("Warteschlange leer")
    ende wenn
    var x: Ganzzahl = daten[kopf]
    kopf = (kopf + 1) mod laenge(daten)
    anzahl = anzahl - 1
    rückgabe x
  ende methode

  öffentlich methode istLeer(): Wahrheitswert
    rückgabe anzahl == 0
  ende methode
ende klasse</code></pre>`,
    explanation: "Der Modulo-Operator sorgt für das „Umlaufen“ am Array-Ende, sodass freigewordene Plätze vorn wiederverwendet werden. Ohne den Zähler <code>anzahl</code> lassen sich „leer“ und „voll“ nicht unterscheiden (kopf == ende in beiden Fällen), alternativ wird ein Platz frei gelassen.",
    keywords: ["klasse|class", "konstruktor|constructor", "kopf|head|front", "anzahl|size|count", "mod|%", "wirf|throw", "voll|full", "leer|empty", "rückgabe|return", "privat|private"],
    tags: ["queue", "ringpuffer", "klasse"]
  },
  {
    id: "ga2-datenstrukturen-011", part: "GA2", topic: "ga2-datenstrukturen", type: "code", lang: "pseudocode", difficulty: 3, points: 8,
    context: "Für eine Playlist-Verwaltung wird eine einfach verkettete Liste verwendet. Ein Knoten ist definiert als:<pre><code>klasse Knoten\n  öffentlich titel: Text\n  öffentlich naechster: Knoten     // null, wenn letzter Knoten\nende klasse</code></pre>Die Klasse <code>Playlist</code> besitzt das Attribut <code>kopf: Knoten</code> (null bei leerer Liste).",
    question: "Implementieren Sie in der Klasse <code>Playlist</code> die Methoden<br>a) <code>anhaengen(titel: Text)</code> – fügt einen neuen Titel am Ende ein (4 P)<br>b) <code>anzahl(): Ganzzahl</code> – liefert die Anzahl der Titel (2 P)<br>c) <code>enthaelt(titel: Text): Wahrheitswert</code> (2 P)",
    solution: `<pre><code>methode anhaengen(titel: Text)
  var neu: Knoten = neuer Knoten()
  neu.titel = titel
  neu.naechster = null
  wenn kopf == null dann
    kopf = neu                          // Sonderfall leere Liste
  sonst
    var akt: Knoten = kopf
    solange akt.naechster != null
      akt = akt.naechster
    ende solange
    akt.naechster = neu
  ende wenn
ende methode

methode anzahl(): Ganzzahl
  var n: Ganzzahl = 0
  var akt: Knoten = kopf
  solange akt != null
    n = n + 1
    akt = akt.naechster
  ende solange
  rückgabe n
ende methode

methode enthaelt(titel: Text): Wahrheitswert
  var akt: Knoten = kopf
  solange akt != null
    wenn akt.titel.equals(titel) dann
      rückgabe wahr
    ende wenn
    akt = akt.naechster
  ende solange
  rückgabe falsch
ende methode</code></pre>`,
    explanation: "Typische Fehler: Sonderfall leere Liste vergessen (NullPointerException bei <code>kopf.naechster</code>), Schleifenbedingung <code>akt != null</code> statt <code>akt.naechster != null</code> beim Anhängen (dann steht akt am Ende auf null), Weitersetzen von <code>akt</code> vergessen (Endlosschleife). Optimierung: Attribut <code>ende</code> mitführen → Anhängen in O(1).",
    keywords: ["kopf == null|kopf==null|head == null", "naechster|next", "solange|while", "!= null|!=null", "akt = akt.naechster|akt=akt.naechster|current = current.next", "neuer knoten|new knoten|neu", "n + 1|n+1|++", "rückgabe|return", "equals|=="],
    tags: ["liste", "verkettet"]
  },
  {
    id: "ga2-datenstrukturen-012", part: "GA2", topic: "ga2-datenstrukturen", type: "code", lang: "pseudocode", difficulty: 2, points: 7,
    context: "Ein Administrator möchte aus einer Logdatei ermitteln, wie oft welcher Fehlercode auftritt. Die Fehlercodes liegen bereits als <code>codes: Liste von Text</code> vor (z. B. [\"E404\", \"E500\", \"E404\", \"E403\", \"E404\"]).",
    question: "Entwickeln Sie die Funktion <code>haeufigkeiten(codes: Liste von Text): Map von Text nach Ganzzahl</code> unter Verwendung einer Map (Methoden <code>enthaeltSchluessel(k)</code>, <code>hole(k)</code>, <code>setze(k, v)</code>). Geben Sie anschließend in einer Prozedur alle Codes aus, die öfter als 2-mal vorkommen.",
    solution: `<pre><code>funktion haeufigkeiten(codes: Liste von Text): Map von Text nach Ganzzahl
  var zaehler: Map von Text nach Ganzzahl = neue HashMap()
  für jedes code in codes
    wenn zaehler.enthaeltSchluessel(code) dann
      zaehler.setze(code, zaehler.hole(code) + 1)
    sonst
      zaehler.setze(code, 1)
    ende wenn
  ende für
  rückgabe zaehler
ende funktion

prozedur haeufigeAusgeben(codes: Liste von Text)
  var m: Map von Text nach Ganzzahl = haeufigkeiten(codes)
  für jedes schluessel in m.schluessel()
    wenn m.hole(schluessel) &gt; 2 dann
      ausgabe(schluessel + ": " + m.hole(schluessel))
    ende wenn
  ende für
ende prozedur</code></pre>
Beispiel: {E404: 3, E500: 1, E403: 1} → Ausgabe „E404: 3“.`,
    explanation: "Eine Map (Dictionary) ist ideal für Schlüssel-Wert-Zuordnungen wie Häufigkeiten: jeder Code wird in O(1) gefunden, insgesamt O(n). Fehlerquelle: Beim ersten Auftreten <code>hole()</code> aufrufen, obwohl der Schlüssel noch nicht existiert (null).",
    keywords: ["map|hashmap|dictionary", "für jedes|for each|for", "enthaeltschluessel|containskey|in", "setze|put", "hole|get", "+ 1|+1", "1", "> 2|>2", "ausgabe|print"],
    tags: ["map", "zaehlen"]
  },
  {
    id: "ga2-datenstrukturen-013", part: "GA2", topic: "ga2-datenstrukturen", type: "text", difficulty: 2, points: 5,
    question: "Erläutern Sie, was bei einer Hash-Tabelle unter einer <b>Kollision</b> verstanden wird, und beschreiben Sie zwei Verfahren zur Kollisionsbehandlung.",
    solution: `<b>Kollision:</b> Zwei verschiedene Schlüssel liefern mit der Hashfunktion denselben Index (z. B. h(k) = k mod 10: 13 und 23 → 3). Da die Anzahl möglicher Schlüssel größer ist als die Tabellengröße, sind Kollisionen unvermeidbar.<br>
<b>1. Verkettung (Separate Chaining):</b> Jeder Tabellenplatz verweist auf eine Liste. Kollidierende Elemente werden in dieser Liste gespeichert; beim Suchen wird die Liste am berechneten Index durchlaufen.<br>
<b>2. Offene Adressierung / Sondieren:</b> Ist der Platz belegt, wird nach einem festgelegten Schema ein Ersatzplatz gesucht – linear (Index + 1, + 2, …), quadratisch (+1, +4, +9, …) oder mit einer zweiten Hashfunktion (Doppel-Hashing). Beim Löschen müssen Plätze als „gelöscht“ markiert werden.<br>
Ergänzend: Bei hohem Füllgrad (Load Factor, z. B. &gt; 0,75) wird die Tabelle vergrößert und neu gehasht (Rehashing).`,
    keywords: ["gleiche|gleichen|selben|derselbe", "index|position|adresse", "hashfunktion|hashwert", "verkettung|liste|chaining", "sondieren|offene adressierung|probing", "linear", "quadratisch|doppel", "füllgrad|fuellgrad|load factor|rehash"],
    tags: ["hashtabelle"]
  },
  {
    id: "ga2-datenstrukturen-014", part: "GA2", topic: "ga2-datenstrukturen", type: "text", difficulty: 2, points: 6,
    context: "Ein Logistikunternehmen hat fünf Lager A, B, C, D, E. Direkte Lieferwege (in beide Richtungen nutzbar) bestehen zwischen: A–B, A–C, B–D, C–D und D–E.",
    question: "a) Stellen Sie das Wegenetz als <b>Adjazenzmatrix</b> und als <b>Adjazenzliste</b> dar. (4 P)<br>b) Erläutern Sie, wann welche Darstellung vorteilhaft ist. (2 P)",
    solution: `a) Adjazenzmatrix (1 = direkte Verbindung, symmetrisch, da ungerichtet):
<table><tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th></tr>
<tr><th>A</th><td>0</td><td>1</td><td>1</td><td>0</td><td>0</td></tr>
<tr><th>B</th><td>1</td><td>0</td><td>0</td><td>1</td><td>0</td></tr>
<tr><th>C</th><td>1</td><td>0</td><td>0</td><td>1</td><td>0</td></tr>
<tr><th>D</th><td>0</td><td>1</td><td>1</td><td>0</td><td>1</td></tr>
<tr><th>E</th><td>0</td><td>0</td><td>0</td><td>1</td><td>0</td></tr></table>
Adjazenzliste: A → B, C | B → A, D | C → A, D | D → B, C, E | E → D<br>
b) Die <b>Matrix</b> benötigt n² Speicher, erlaubt aber die Prüfung „gibt es eine Kante X–Y?“ in O(1) – vorteilhaft bei dichten Graphen. Die <b>Liste</b> benötigt nur Speicher proportional zu Knoten + Kanten und erlaubt schnelles Durchlaufen der Nachbarn – vorteilhaft bei dünnen Graphen (wenige Kanten, z. B. Straßennetze). Gewichte (z. B. Entfernungen) können in beiden Fällen statt der 1 gespeichert werden.`,
    keywords: ["matrix", "symmetrisch|ungerichtet", "liste", "d → b, c, e|d: b, c, e|d -> b, c, e|b, c, e", "speicher", "dicht", "dünn|duenn|wenige kanten", "o(1)|schnell|direkt"],
    tags: ["graph"]
  }
);

// ===================== ga2-oop =====================
AP2.questions.push(
  {
    id: "ga2-oop-001", part: "GA2", topic: "ga2-oop", type: "mc", difficulty: 2, points: 2,
    question: "Eine Klasse <code>Rechner</code> enthält die Methoden <code>addiere(a: Ganzzahl, b: Ganzzahl)</code> und <code>addiere(a: Gleitkommazahl, b: Gleitkommazahl)</code>. Wie nennt man dieses Konzept?",
    options: ["Überschreiben (Overriding)", "Überladen (Overloading)", "Kapselung", "Vererbung"],
    correct: [1],
    solution: "<b>Überladen</b>: gleicher Methodenname, aber unterschiedliche Parameterliste (Anzahl, Typen oder Reihenfolge) innerhalb einer Klasse. Welche Methode aufgerufen wird, entscheidet der Compiler anhand der Argumente.",
    explanation: "Überschreiben bedeutet: Eine Unterklasse definiert eine Methode mit <b>derselben Signatur</b> wie die Oberklasse neu; die Auswahl erfolgt zur Laufzeit (Polymorphie). Ein unterschiedlicher Rückgabetyp allein reicht zum Überladen nicht.",
    tags: ["ueberladen"]
  },
  {
    id: "ga2-oop-002", part: "GA2", topic: "ga2-oop", type: "mc", difficulty: 1, points: 2,
    question: "Ein Attribut ist im UML-Klassendiagramm mit <code>#</code> gekennzeichnet. Welche Sichtbarkeit hat es?",
    options: ["public – überall sichtbar", "private – nur in der eigenen Klasse", "protected – in der eigenen Klasse und in Unterklassen (Java: zusätzlich im Paket)", "package – nur im selben Paket"],
    correct: [2],
    solution: "<code>#</code> steht für <b>protected</b>. Weitere Symbole: <code>+</code> public, <code>-</code> private, <code>~</code> package.",
    explanation: "Statische Elemente werden im Klassendiagramm unterstrichen, abstrakte kursiv dargestellt.",
    tags: ["sichtbarkeit", "uml"]
  },
  {
    id: "ga2-oop-003", part: "GA2", topic: "ga2-oop", type: "multi", difficulty: 2, points: 4,
    question: "Welche Aussagen zu <b>abstrakten Klassen</b> und <b>Interfaces</b> (Java) sind richtig?",
    options: [
      "Von einer abstrakten Klasse können keine Objekte erzeugt werden.",
      "Eine abstrakte Klasse kann sowohl abstrakte als auch implementierte Methoden sowie Attribute besitzen.",
      "Eine Klasse kann mehrere Interfaces implementieren, aber nur von einer Klasse erben.",
      "Eine Unterklasse einer abstrakten Klasse muss nicht alle abstrakten Methoden implementieren, um instanziierbar zu sein.",
      "Interfaces dürfen in Java keine Konstruktoren enthalten."
    ],
    correct: [0, 1, 2, 4],
    solution: "Richtig: A, B, C, E. D ist falsch – eine konkrete (instanziierbare) Unterklasse muss <b>alle</b> geerbten abstrakten Methoden implementieren, sonst muss sie selbst abstrakt sein.",
    explanation: "Abstrakte Klassen eignen sich für gemeinsame Implementierung verwandter Klassen (is-a), Interfaces für Fähigkeiten/Verträge, die auch unverwandte Klassen erfüllen können (z. B. Comparable, Exportierbar). Seit Java 8 können Interfaces default-Methoden enthalten.",
    tags: ["abstrakt", "interface"]
  },
  {
    id: "ga2-oop-004", part: "GA2", topic: "ga2-oop", type: "mc", difficulty: 2, points: 2,
    question: "Was bewirkt das Schlüsselwort <b>static</b> bei einem Attribut <code>anzahlKunden</code> der Klasse <code>Kunde</code>?",
    options: [
      "Der Wert des Attributs kann nach der Initialisierung nicht mehr geändert werden.",
      "Das Attribut existiert nur einmal pro Klasse und wird von allen Objekten gemeinsam genutzt.",
      "Das Attribut ist nur innerhalb der Klasse sichtbar.",
      "Jedes Objekt besitzt eine eigene Kopie des Attributs, die beim Erzeugen auf 0 gesetzt wird."
    ],
    correct: [1],
    solution: "Ein <b>statisches Attribut</b> (Klassenattribut) gehört zur Klasse, nicht zum einzelnen Objekt. Alle Objekte teilen sich denselben Wert – typisch für Instanzzähler oder fortlaufende Nummern. Zugriff z. B. über <code>Kunde.anzahlKunden</code>.",
    explanation: "A beschreibt <code>final</code>, C beschreibt <code>private</code>, D beschreibt ein normales Instanzattribut.",
    tags: ["static"]
  },
  {
    id: "ga2-oop-005", part: "GA2", topic: "ga2-oop", type: "numeric", difficulty: 2, points: 3,
    context: `<pre><code>klasse Ticket
  privat statisch naechsteNr: Ganzzahl = 100
  privat nr: Ganzzahl
  öffentlich konstruktor Ticket()
    this.nr = naechsteNr
    naechsteNr = naechsteNr + 10
  ende konstruktor
  öffentlich methode getNr(): Ganzzahl
    rückgabe nr
  ende methode
ende klasse

var t1 = neues Ticket()
var t2 = neues Ticket()
var t3 = neues Ticket()
var t4 = neues Ticket()
var t5 = neues Ticket()</code></pre>`,
    question: "Welchen Wert liefert <code>t4.getNr()</code>?",
    answer: 130, tolerance: 0,
    solution: "Das statische Attribut wird von allen Objekten geteilt: t1.nr = 100 (danach 110), t2.nr = 110, t3.nr = 120, t4.nr = <b>130</b>, t5.nr = 140. Nach t5 steht naechsteNr auf 150.",
    explanation: "Wäre <code>naechsteNr</code> nicht statisch, hätte jedes Ticket die Nummer 100.",
    tags: ["static", "trace"]
  },
  {
    id: "ga2-oop-006", part: "GA2", topic: "ga2-oop", type: "code", lang: "pseudocode", difficulty: 2, points: 10,
    context: "Eine Bank entwickelt ein neues Kontoverwaltungssystem. Ein Konto hat eine Kontonummer, einen Inhaber, einen Saldo und einen Dispositionsrahmen (Dispo). Der Saldo darf nur über Methoden verändert werden.",
    question: `Implementieren Sie die Klasse <code>Konto</code>:<ul>
<li>private Attribute <code>kontonummer: Text</code>, <code>inhaber: Text</code>, <code>saldo: Gleitkommazahl</code>, <code>dispo: Gleitkommazahl</code></li>
<li>Konstruktor mit Kontonummer, Inhaber und Dispo (Startsaldo 0)</li>
<li><code>einzahlen(betrag)</code>: nur positive Beträge, sonst <code>IllegalArgumentException</code></li>
<li><code>abheben(betrag): Wahrheitswert</code>: nur, wenn der Saldo dadurch nicht unter −dispo fällt; liefert, ob abgehoben wurde</li>
<li>Getter für den Saldo</li></ul>`,
    solution: `<pre><code>klasse Konto
  privat kontonummer: Text
  privat inhaber: Text
  privat saldo: Gleitkommazahl
  privat dispo: Gleitkommazahl

  öffentlich konstruktor Konto(kontonummer: Text, inhaber: Text, dispo: Gleitkommazahl)
    this.kontonummer = kontonummer
    this.inhaber = inhaber
    this.dispo = dispo
    this.saldo = 0.0
  ende konstruktor

  öffentlich methode einzahlen(betrag: Gleitkommazahl)
    wenn betrag &lt;= 0 dann
      wirf neue IllegalArgumentException("Betrag muss positiv sein")
    ende wenn
    saldo = saldo + betrag
  ende methode

  öffentlich methode abheben(betrag: Gleitkommazahl): Wahrheitswert
    wenn betrag &lt;= 0 ODER saldo - betrag &lt; -dispo dann
      rückgabe falsch
    ende wenn
    saldo = saldo - betrag
    rückgabe wahr
  ende methode

  öffentlich methode getSaldo(): Gleitkommazahl
    rückgabe saldo
  ende methode
ende klasse</code></pre>
Java (Auszug):
<pre><code>public class Konto {
  private final String kontonummer; private String inhaber;
  private double saldo; private double dispo;
  public Konto(String kontonummer, String inhaber, double dispo) {
    this.kontonummer = kontonummer; this.inhaber = inhaber; this.dispo = dispo;
  }
  public void einzahlen(double betrag) {
    if (betrag &lt;= 0) throw new IllegalArgumentException("Betrag muss positiv sein");
    saldo += betrag;
  }
  public boolean abheben(double betrag) {
    if (betrag &lt;= 0 || saldo - betrag &lt; -dispo) return false;
    saldo -= betrag; return true;
  }
  public double getSaldo() { return saldo; }
}</code></pre>`,
    explanation: "Kapselung: Kein Setter für den Saldo – nur fachlich sinnvolle Operationen. <code>this.</code> ist nötig, wenn Parameter und Attribute gleich heißen. In echter Banksoftware würde man BigDecimal statt double verwenden (Rundungsfehler).",
    keywords: ["klasse|class", "privat|private", "konstruktor|constructor|public konto", "this.", "einzahlen", "<= 0|<=0", "wirf|throw", "abheben", "-dispo|- dispo", "getsaldo"],
    tags: ["klasse", "kapselung"]
  },
  {
    id: "ga2-oop-007", part: "GA2", topic: "ga2-oop", type: "code", lang: "pseudocode", difficulty: 3, points: 12,
    context: `Eine Autovermietung setzt folgendes Klassendiagramm um:
<pre><code>        «abstract» Fahrzeug
  - kennzeichen: Text
  # tagespreis: Gleitkommazahl
  + Fahrzeug(kennzeichen, tagespreis)
  + getKennzeichen(): Text
  + berechneMiete(tage: Ganzzahl): Gleitkommazahl  {abstract}
            △                    △
            |                    |
          PKW                Transporter
  - sitzplaetze: Ganzzahl   - ladevolumen: Gleitkommazahl
                              (m³)</code></pre>
Regeln: PKW: tagespreis · tage, ab 7 Tagen 10 % Rabatt. Transporter: tagespreis · tage + 15 € Reinigungspauschale je angefangene 10 m³ Ladevolumen (einmalig).`,
    question: "a) Implementieren Sie die Klassen <code>Fahrzeug</code>, <code>PKW</code> und <code>Transporter</code> (Konstruktoren mit Aufruf des Oberklassenkonstruktors). (9 P)<br>b) Schreiben Sie eine Funktion <code>gesamtmiete(flotte: Liste von Fahrzeug, tage: Ganzzahl): Gleitkommazahl</code>, die polymorph die Miete aller Fahrzeuge summiert. (3 P)",
    solution: `<pre><code>abstrakte klasse Fahrzeug
  privat kennzeichen: Text
  geschützt tagespreis: Gleitkommazahl
  öffentlich konstruktor Fahrzeug(kennzeichen: Text, tagespreis: Gleitkommazahl)
    this.kennzeichen = kennzeichen
    this.tagespreis = tagespreis
  ende konstruktor
  öffentlich methode getKennzeichen(): Text
    rückgabe kennzeichen
  ende methode
  öffentlich abstrakte methode berechneMiete(tage: Ganzzahl): Gleitkommazahl
ende klasse

klasse PKW erbt von Fahrzeug
  privat sitzplaetze: Ganzzahl
  öffentlich konstruktor PKW(kennzeichen: Text, tagespreis: Gleitkommazahl, sitzplaetze: Ganzzahl)
    super(kennzeichen, tagespreis)
    this.sitzplaetze = sitzplaetze
  ende konstruktor
  öffentlich methode berechneMiete(tage: Ganzzahl): Gleitkommazahl   // überschreibt
    var miete: Gleitkommazahl = tagespreis * tage
    wenn tage &gt;= 7 dann
      miete = miete * 0.9
    ende wenn
    rückgabe miete
  ende methode
ende klasse

klasse Transporter erbt von Fahrzeug
  privat ladevolumen: Gleitkommazahl
  öffentlich konstruktor Transporter(kennzeichen: Text, tagespreis: Gleitkommazahl, ladevolumen: Gleitkommazahl)
    super(kennzeichen, tagespreis)
    this.ladevolumen = ladevolumen
  ende konstruktor
  öffentlich methode berechneMiete(tage: Ganzzahl): Gleitkommazahl
    var einheiten: Ganzzahl = aufrunden(ladevolumen / 10)   // je angefangene 10 m³
    rückgabe tagespreis * tage + einheiten * 15.0
  ende methode
ende klasse

funktion gesamtmiete(flotte: Liste von Fahrzeug, tage: Ganzzahl): Gleitkommazahl
  var summe: Gleitkommazahl = 0.0
  für jedes f in flotte
    summe = summe + f.berechneMiete(tage)   // dynamisches Binden
  ende für
  rückgabe summe
ende funktion</code></pre>
Beispiel: Transporter 80 €/Tag, 12 m³, 3 Tage → 240 + 2 · 15 = 270 € (12 m³ = 2 angefangene 10-m³-Einheiten).`,
    explanation: "Polymorphie: <code>gesamtmiete</code> kennt nur den Typ Fahrzeug; welche <code>berechneMiete</code> ausgeführt wird, entscheidet der Laufzeittyp. Neue Fahrzeugarten erfordern keine Änderung dieser Funktion (Open-Closed-Prinzip). Fehlerquellen: <code>super(...)</code> vergessen, <code>tagespreis</code> privat statt protected (dann kein Zugriff in der Unterklasse → Getter nötig), Fallunterscheidung mit <code>instanceof</code> statt Polymorphie.",
    keywords: ["abstrakt|abstract", "erbt von|extends", "super(", "berechnemiete", "0.9|0,9|10", "aufrunden|ceil", "15", "für jedes|for", "f.berechnemiete|.berechnemiete(tage)", "rückgabe|return"],
    tags: ["vererbung", "polymorphie", "klassendiagramm"]
  },
  {
    id: "ga2-oop-008", part: "GA2", topic: "ga2-oop", type: "code", lang: "pseudocode", difficulty: 2, points: 7,
    context: "Verschiedene Klassen eines CRM-Systems (Kunde, Lieferant, Produkt) sollen als CSV-Zeile exportiert werden können. Dazu wird das Interface <code>Exportierbar</code> mit der Methode <code>alsCsv(): Text</code> eingeführt.",
    question: "a) Definieren Sie das Interface <code>Exportierbar</code>. (1 P)<br>b) Implementieren Sie die Klasse <code>Kunde</code> (Attribute: kundennr: Ganzzahl, name: Text, ort: Text) mit Konstruktor, die das Interface implementiert. Trennzeichen ist das Semikolon. (4 P)<br>c) Schreiben Sie eine Prozedur <code>exportiere(objekte: Liste von Exportierbar)</code>, die alle Zeilen ausgibt. (2 P)",
    solution: `<pre><code>interface Exportierbar
  methode alsCsv(): Text
ende interface

klasse Kunde implementiert Exportierbar
  privat kundennr: Ganzzahl
  privat name: Text
  privat ort: Text
  öffentlich konstruktor Kunde(kundennr: Ganzzahl, name: Text, ort: Text)
    this.kundennr = kundennr
    this.name = name
    this.ort = ort
  ende konstruktor
  öffentlich methode alsCsv(): Text
    rückgabe kundennr + ";" + name + ";" + ort
  ende methode
ende klasse

prozedur exportiere(objekte: Liste von Exportierbar)
  für jedes o in objekte
    ausgabe(o.alsCsv())
  ende für
ende prozedur</code></pre>
Java: <code>interface Exportierbar { String alsCsv(); }</code> und <code>class Kunde implements Exportierbar { … @Override public String alsCsv() { return kundennr + ";" + name + ";" + ort; } }</code>`,
    explanation: "Über das Interface können völlig unterschiedliche Klassen gleich behandelt werden (Polymorphie ohne gemeinsame Oberklasse). Bei echten CSV-Exporten müssen Semikolons im Text maskiert werden (Anführungszeichen).",
    keywords: ["interface", "alscsv", "implementiert|implements", "konstruktor|constructor", "this.", "\";\"|';'", "für jedes|for", "ausgabe|print|system.out", "rückgabe|return"],
    tags: ["interface"]
  },
  {
    id: "ga2-oop-009", part: "GA2", topic: "ga2-oop", type: "code", lang: "pseudocode", difficulty: 2, points: 8,
    context: "Ein Lagerverwaltungssystem besitzt die Klasse <code>Artikel</code> mit den Gettern <code>getBezeichnung(): Text</code>, <code>getBestand(): Ganzzahl</code>, <code>getMindestbestand(): Ganzzahl</code> und <code>getEinkaufspreis(): Gleitkommazahl</code>. Die Klasse <code>Lager</code> verwaltet die Artikel in einem Attribut <code>artikelListe: Liste von Artikel</code>.",
    question: "Implementieren Sie in der Klasse <code>Lager</code> die Methoden<br>a) <code>nachzubestellen(): Liste von Artikel</code> – liefert alle Artikel, deren Bestand unter dem Mindestbestand liegt (4 P)<br>b) <code>lagerwert(): Gleitkommazahl</code> – Summe aus Bestand · Einkaufspreis aller Artikel (4 P)",
    solution: `<pre><code>öffentlich methode nachzubestellen(): Liste von Artikel
  var ergebnis: Liste von Artikel = neue Liste()
  für jedes a in artikelListe
    wenn a.getBestand() &lt; a.getMindestbestand() dann
      ergebnis.hinzufuegen(a)
    ende wenn
  ende für
  rückgabe ergebnis
ende methode

öffentlich methode lagerwert(): Gleitkommazahl
  var summe: Gleitkommazahl = 0.0
  für i von 0 bis artikelListe.groesse() - 1
    var a: Artikel = artikelListe.hole(i)
    summe = summe + a.getBestand() * a.getEinkaufspreis()
  ende für
  rückgabe summe
ende methode</code></pre>
Java (Streams, alternativ):
<pre><code>List&lt;Artikel&gt; nachzubestellen() {
  return artikelListe.stream().filter(a -&gt; a.getBestand() &lt; a.getMindestbestand()).toList();
}</code></pre>`,
    explanation: "Typische Fehler: neue Ergebnisliste nicht erzeugen (null), direkt auf private Attribute anderer Klassen zugreifen (<code>a.bestand</code>) statt Getter zu nutzen, Summe innerhalb der Schleife initialisieren.",
    keywords: ["liste|list", "neue liste|new arraylist|new list", "für jedes|for", "getbestand", "getmindestbestand", "<", "hinzufuegen|add", "summe", "geteinkaufspreis", "rückgabe|return"],
    tags: ["collections", "filtern"]
  },
  {
    id: "ga2-oop-010", part: "GA2", topic: "ga2-oop", type: "code", lang: "pseudocode", difficulty: 3, points: 10,
    context: "In einem Webshop besteht eine <b>Komposition</b> zwischen <code>Bestellung</code> (◆) und <code>Bestellposition</code> (1..*). Eine Bestellposition besteht aus Artikelname, Menge und Einzelpreis. Positionen existieren nur innerhalb ihrer Bestellung. Bei einem Warenwert ab 500 € gibt es 5 % Rabatt; unter 50 € fallen 4,90 € Versand an.",
    question: "Implementieren Sie die Klassen <code>Bestellposition</code> (mit Methode <code>positionswert()</code>) und <code>Bestellung</code> mit<ul><li><code>positionHinzufuegen(name: Text, menge: Ganzzahl, preis: Gleitkommazahl)</code> – die Bestellung erzeugt die Position selbst</li><li><code>gesamtbetrag(): Gleitkommazahl</code> nach den genannten Regeln</li></ul>",
    solution: `<pre><code>klasse Bestellposition
  privat artikelname: Text
  privat menge: Ganzzahl
  privat einzelpreis: Gleitkommazahl
  öffentlich konstruktor Bestellposition(name: Text, menge: Ganzzahl, preis: Gleitkommazahl)
    this.artikelname = name
    this.menge = menge
    this.einzelpreis = preis
  ende konstruktor
  öffentlich methode positionswert(): Gleitkommazahl
    rückgabe menge * einzelpreis
  ende methode
ende klasse

klasse Bestellung
  privat bestellnr: Ganzzahl
  privat positionen: Liste von Bestellposition = neue Liste()

  öffentlich methode positionHinzufuegen(name: Text, menge: Ganzzahl, preis: Gleitkommazahl)
    wenn menge &lt;= 0 dann
      wirf neue IllegalArgumentException("Menge ungültig")
    ende wenn
    positionen.hinzufuegen(neue Bestellposition(name, menge, preis))   // Komposition
  ende methode

  öffentlich methode gesamtbetrag(): Gleitkommazahl
    var warenwert: Gleitkommazahl = 0.0
    für jedes p in positionen
      warenwert = warenwert + p.positionswert()
    ende für
    wenn warenwert &gt;= 500 dann
      rückgabe warenwert * 0.95
    sonst wenn warenwert &lt; 50 dann
      rückgabe warenwert + 4.90
    ende wenn
    rückgabe warenwert
  ende methode
ende klasse</code></pre>`,
    explanation: "Komposition im Code: Das Ganze (Bestellung) erzeugt die Teile selbst mit <code>neue Bestellposition(...)</code> und gibt keine Referenzen nach außen heraus – wird die Bestellung gelöscht, verschwinden auch die Positionen. Bei Aggregation würde ein bereits existierendes Objekt übergeben. Grenzwerte: genau 500 € → Rabatt (≥), genau 50 € → kein Versand.",
    keywords: ["klasse|class", "liste|list", "neue bestellposition|new bestellposition", "hinzufuegen|add", "für jedes|for", "positionswert", "menge * einzelpreis|menge*einzelpreis", ">= 500|>=500", "0.95|0,95", "4.90|4,90|4.9"],
    tags: ["komposition", "klassen"]
  },
  {
    id: "ga2-oop-011", part: "GA2", topic: "ga2-oop", type: "code", lang: "java", difficulty: 2, points: 8,
    context: "Ein Kollege hat für die Mitgliederverwaltung eines Sportvereins folgende Java-Klasse geschrieben. Sie kompiliert nicht bzw. verhält sich fehlerhaft.",
    question: `Nennen Sie alle Fehler bzw. Schwachstellen und geben Sie eine korrigierte Fassung an.
<pre><code>public class Mitglied {
  public String name;
  private int alter;
  private String beitragsklasse;

  public void Mitglied(String name, int alter) {
    name = name;
    this.alter = alter;
  }
  public void setAlter(int alter) {
    alter = alter;
  }
  public boolean istJugend() {
    return beitragsklasse == "Jugend";
  }
}</code></pre>`,
    starter: "public class Mitglied {\n  // korrigierte Fassung\n}",
    solution: `<b>Fehler:</b><ol>
<li><code>public String name</code>: verletzt die Kapselung → <code>private</code>.</li>
<li><code>public void Mitglied(...)</code>: Durch den Rückgabetyp <code>void</code> ist das eine normale Methode, kein Konstruktor → Rückgabetyp entfernen.</li>
<li><code>name = name;</code> und <code>alter = alter;</code> weisen den Parameter sich selbst zu (Shadowing) → <code>this.name = name;</code>.</li>
<li>Keine Validierung im Setter (negatives Alter möglich).</li>
<li><code>beitragsklasse == "Jugend"</code> vergleicht Referenzen statt Inhalte → <code>"Jugend".equals(beitragsklasse)</code>; zudem wird beitragsklasse nie gesetzt (null).</li></ol>
<pre><code>public class Mitglied {
  private String name;
  private int alter;
  private String beitragsklasse;

  public Mitglied(String name, int alter) {
    this.name = name;
    setAlter(alter);
  }
  public void setAlter(int alter) {
    if (alter &lt; 0) throw new IllegalArgumentException("Alter negativ");
    this.alter = alter;
    this.beitragsklasse = alter &lt; 18 ? "Jugend" : "Erwachsen";
  }
  public boolean istJugend() {
    return "Jugend".equals(beitragsklasse);
  }
}</code></pre>`,
    explanation: "Diese Fehlerarten (Konstruktor mit Rückgabetyp, fehlendes <code>this</code>, String-Vergleich mit <code>==</code>, public Attribute) sind Klassiker in IHK-Fehlersuchaufgaben.",
    keywords: ["private", "void|rückgabetyp|rueckgabetyp", "konstruktor|constructor", "this.name", "this.alter", "equals", "kapselung", "== |referenz"],
    tags: ["fehlersuche", "java"]
  },
  {
    id: "ga2-oop-012", part: "GA2", topic: "ga2-oop", type: "text", difficulty: 2, points: 5,
    question: "Erläutern Sie den Begriff <b>Polymorphie</b> und zeigen Sie an einem selbst gewählten Beispiel, welchen Vorteil sie bei der Erweiterung einer Software bietet.",
    solution: `<b>Polymorphie</b> („Vielgestaltigkeit“) bedeutet, dass eine Variable vom Typ einer Oberklasse oder eines Interfaces auf Objekte unterschiedlicher Unterklassen verweisen kann. Beim Methodenaufruf wird zur Laufzeit die Implementierung des tatsächlichen Objekttyps ausgeführt (<b>dynamisches Binden</b>, späte Bindung), sofern die Methode überschrieben wurde.<br>
<b>Beispiel:</b> Abstrakte Klasse <code>Zahlungsart</code> mit Methode <code>bezahlen(betrag)</code>; Unterklassen <code>Kreditkarte</code>, <code>PayPal</code>, <code>Rechnung</code>. Der Bestellprozess ruft nur <code>zahlungsart.bezahlen(summe)</code> auf.<br>
<b>Vorteil:</b> Kommt eine neue Zahlungsart (z. B. <code>Lastschrift</code>) hinzu, wird nur eine neue Unterklasse geschrieben – der Bestellprozess bleibt unverändert (keine if/switch-Kaskaden, Open-Closed-Prinzip, bessere Wartbarkeit und Erweiterbarkeit).`,
    keywords: ["oberklasse|basisklasse|interface", "unterklasse", "überschreib|ueberschreib|override", "laufzeit|dynamisch|späte bindung|spaete bindung", "beispiel", "erweiter", "wartbar|änderung|aenderung|unverändert|unveraendert", "if|switch|fallunterscheidung"],
    tags: ["polymorphie"]
  },
  {
    id: "ga2-oop-013", part: "GA2", topic: "ga2-oop", type: "text", difficulty: 1, points: 4,
    question: "Erläutern Sie das Prinzip der <b>Kapselung</b> und nennen Sie drei Vorteile, die sich durch den Einsatz von Getter- und Setter-Methoden ergeben.",
    solution: `<b>Kapselung (Information Hiding):</b> Die Attribute eines Objekts werden vor direktem Zugriff von außen verborgen (Sichtbarkeit <code>private</code>). Der Zugriff erfolgt ausschließlich über definierte öffentliche Methoden (Schnittstelle).<br><b>Vorteile:</b><ul>
<li><b>Validierung:</b> Setter können ungültige Werte abweisen (z. B. negatives Alter) → Objekt bleibt in konsistentem Zustand.</li>
<li><b>Änderbarkeit:</b> Die interne Darstellung kann geändert werden (z. B. Preis in Cent statt Euro), ohne dass aufrufender Code angepasst werden muss.</li>
<li><b>Zugriffskontrolle:</b> Nur lesender Zugriff möglich, indem kein Setter angeboten wird (z. B. Kontonummer).</li>
<li>Zusätzliche Logik wie Protokollierung, Benachrichtigung oder Lazy Loading beim Zugriff.</li></ul>`,
    keywords: ["private|privat", "verbergen|verborgen|information hiding|direkt", "methode|schnittstelle", "validier|prüf|pruef|ungültig|ungueltig", "konsistent", "änder|aender|intern", "nur lesen|lesend|read-only|kein setter"],
    tags: ["kapselung"]
  },
  {
    id: "ga2-oop-014", part: "GA2", topic: "ga2-oop", type: "text", difficulty: 3, points: 6,
    question: "Erläutern Sie die Unterschiede zwischen <b>Assoziation</b>, <b>Aggregation</b> und <b>Komposition</b> und zeigen Sie jeweils, wie sich die Beziehung im Programmcode niederschlägt.",
    solution: `<ul><li><b>Assoziation:</b> allgemeine Beziehung („kennt“) zwischen gleichberechtigten Klassen, z. B. Kunde – Berater. Code: Attribut mit Referenz, z. B. <code>privat berater: Berater</code>, gesetzt per Setter oder Konstruktor; bei Multiplizität * eine Liste.</li>
<li><b>Aggregation</b> (leere Raute): „hat-ein“-Beziehung (Ganzes – Teil), Teile können <b>unabhängig</b> vom Ganzen existieren und ggf. mehreren Ganzen zugeordnet werden, z. B. Team – Mitarbeiter. Code: Liste von Referenzen; die Teil-Objekte werden <b>von außen übergeben</b> (<code>team.hinzufuegen(mitarbeiter)</code>) und überleben das Löschen des Teams.</li>
<li><b>Komposition</b> (gefüllte Raute): starke Ganzes-Teil-Beziehung, die Teile sind <b>existenzabhängig</b> und gehören genau zu einem Ganzen, z. B. Rechnung – Rechnungsposition, Gebäude – Raum. Code: Das Ganze <b>erzeugt die Teile selbst</b> (<code>neue Rechnungsposition(...)</code> im Konstruktor oder einer Methode), gibt keine Referenzen nach außen; wird das Ganze gelöscht, sind auch die Teile nicht mehr erreichbar.</li></ul>`,
    keywords: ["referenz|attribut", "raute", "unabhängig|unabhaengig", "existenzabhängig|existenzabhaengig|lebensdauer|nur mit", "erzeugt|neue|new", "übergeben|uebergeben|von außen|von aussen", "liste", "ganzes|teil"],
    tags: ["beziehungen", "uml"]
  },
  {
    id: "ga2-oop-015", part: "GA2", topic: "ga2-oop", type: "order", difficulty: 3, points: 4,
    question: `In welcher Reihenfolge erscheinen die Ausgaben, wenn folgendes Programm ausgeführt wird?
<pre><code>klasse A
  öffentlich konstruktor A()
    ausgabe("Konstruktor A")
  ende konstruktor
  öffentlich methode info()
    ausgabe("info A")
  ende methode
ende klasse

klasse B erbt von A
  öffentlich konstruktor B()
    super()
    ausgabe("Konstruktor B")
  ende konstruktor
  öffentlich methode info()
    super.info()
    ausgabe("info B")
  ende methode
ende klasse

klasse C erbt von B
  öffentlich konstruktor C()
    super()
    ausgabe("Konstruktor C")
  ende konstruktor
ende klasse

var obj: A = neues C()
obj.info()</code></pre>`,
    items: ["Konstruktor A", "Konstruktor B", "Konstruktor C", "info A", "info B"],
    solution: "Beim Erzeugen von C wird zuerst der Konstruktor der obersten Oberklasse vollständig ausgeführt: <b>Konstruktor A → Konstruktor B → Konstruktor C</b>. <code>obj.info()</code>: C überschreibt info() nicht, also wird die geerbte Version aus B ausgeführt (dynamisches Binden, obwohl obj vom Typ A deklariert ist). B.info() ruft zuerst <code>super.info()</code> → <b>info A</b>, dann <b>info B</b>.",
    explanation: "Typischer Fehler: annehmen, dass wegen des deklarierten Typs A nur „info A“ ausgegeben wird – entscheidend ist der Laufzeittyp C.",
    tags: ["vererbung", "konstruktor", "polymorphie"]
  }
);

// ===================== ga2-komplexitaet =====================
AP2.questions.push(
  {
    id: "ga2-komplexitaet-001", part: "GA2", topic: "ga2-komplexitaet", type: "order", difficulty: 1, points: 3,
    question: "Ordnen Sie die Komplexitätsklassen nach ihrem Wachstum für große n – beginnend mit dem <b>langsamsten</b> Wachstum (effizientester Algorithmus).",
    items: ["O(1)", "O(log n)", "O(n)", "O(n log n)", "O(n²)", "O(2ⁿ)"],
    solution: "O(1) &lt; O(log n) &lt; O(n) &lt; O(n log n) &lt; O(n²) &lt; O(2ⁿ).<br>Für n = 1000: 1 – ≈10 – 1000 – ≈10 000 – 1 000 000 – ≈10³⁰¹.",
    explanation: "Für kleine n können Konstanten entscheidend sein (z. B. ist Insertion Sort für n &lt; 20 oft schneller als Quick Sort) – die O-Notation beschreibt das asymptotische Verhalten.",
    tags: ["o-notation"]
  },
  {
    id: "ga2-komplexitaet-002", part: "GA2", topic: "ga2-komplexitaet", type: "mc", difficulty: 1, points: 2,
    question: `Welche Zeitkomplexität hat der folgende Algorithmus in Abhängigkeit von n?
<pre><code>für i von 0 bis n - 1
  für j von 0 bis n - 1
    wenn a[i] + a[j] == ziel dann
      zaehler = zaehler + 1
    ende wenn
  ende für
ende für</code></pre>`,
    options: ["O(n)", "O(n log n)", "O(n²)", "O(2ⁿ)"],
    correct: [2],
    solution: "Zwei verschachtelte Schleifen mit je n Durchläufen → n · n = n² Ausführungen des Rumpfs → <b>O(n²)</b>.",
    explanation: "Verschachtelte Schleifen multiplizieren, aufeinanderfolgende Schleifen addieren.",
    tags: ["schleifen"]
  },
  {
    id: "ga2-komplexitaet-003", part: "GA2", topic: "ga2-komplexitaet", type: "mc", difficulty: 2, points: 2,
    question: `Welche Zeitkomplexität hat folgender Code?
<pre><code>var i: Ganzzahl = n
solange i &gt; 1
  ausgabe(i)
  i = i div 2
ende solange</code></pre>`,
    options: ["O(1)", "O(log n)", "O(n)", "O(n / 2)"],
    correct: [1],
    solution: "i wird in jedem Durchlauf halbiert. Nach k Durchläufen gilt i ≈ n / 2ᵏ; die Schleife endet bei 2ᵏ ≈ n, also k ≈ log₂ n → <b>O(log n)</b>.",
    explanation: "O(n/2) ist keine übliche Angabe – Konstanten fallen weg (O(n/2) = O(n)), wäre hier aber ohnehin falsch, da nicht i = i − 2, sondern i = i div 2 gerechnet wird.",
    tags: ["schleifen", "logarithmisch"]
  },
  {
    id: "ga2-komplexitaet-004", part: "GA2", topic: "ga2-komplexitaet", type: "mc", difficulty: 2, points: 2,
    question: `Welche Zeitkomplexität hat folgender Code (n = Anzahl der Kunden)?
<pre><code>für i von 0 bis n - 1
  für j von 0 bis 9
    ausgabe(kunden[i].getName() + " Monat " + j)
  ende für
ende für</code></pre>`,
    options: ["O(1)", "O(n)", "O(n²)", "O(10ⁿ)"],
    correct: [1],
    solution: "Die innere Schleife läuft immer genau 10-mal – unabhängig von n. Gesamt 10 · n Durchläufe → <b>O(n)</b>.",
    explanation: "Falle: Verschachtelte Schleifen sind nicht automatisch O(n²) – entscheidend ist, ob die innere Schleife von n abhängt.",
    tags: ["schleifen"]
  },
  {
    id: "ga2-komplexitaet-005", part: "GA2", topic: "ga2-komplexitaet", type: "multi", difficulty: 2, points: 4,
    question: "Welche Aussagen zu Best, Worst und Average Case sind <b>richtig</b>?",
    options: [
      "Die lineare Suche hat im Best Case die Komplexität O(1).",
      "Insertion Sort hat auf bereits sortierten Daten die Komplexität O(n).",
      "Merge Sort hat im Worst Case die Komplexität O(n²).",
      "Quick Sort hat im Average Case die Komplexität O(n log n).",
      "Die binäre Suche hat im Worst Case die Komplexität O(n)."
    ],
    correct: [0, 1, 3],
    solution: "Richtig: A (Element an erster Stelle), B (je Element nur ein Vergleich), D. Falsch: C – Merge Sort ist immer O(n log n); E – binäre Suche ist auch im Worst Case O(log n).",
    explanation: "In Prüfungen wird meist der Worst Case angegeben, weil er eine Garantie liefert.",
    tags: ["best-worst-average"]
  },
  {
    id: "ga2-komplexitaet-006", part: "GA2", topic: "ga2-komplexitaet", type: "mc", difficulty: 2, points: 2,
    question: "Welche durchschnittliche Zeitkomplexität hat das Suchen eines Schlüssels in einer gut dimensionierten <b>Hash-Tabelle</b>?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correct: [0],
    solution: "Die Hashfunktion berechnet den Index direkt → im Mittel <b>O(1)</b>. Im Worst Case (alle Schlüssel kollidieren) O(n).",
    explanation: "Ein balancierter Suchbaum (z. B. TreeMap) hat O(log n), bietet dafür aber sortiertes Durchlaufen.",
    tags: ["hashtabelle"]
  },
  {
    id: "ga2-komplexitaet-007", part: "GA2", topic: "ga2-komplexitaet", type: "numeric", difficulty: 2, points: 3,
    context: `Ein Programm vergleicht jeden Teilnehmer eines Turniers genau einmal mit jedem anderen:
<pre><code>für i von 0 bis n - 1
  für j von i + 1 bis n - 1
    spiele(teilnehmer[i], teilnehmer[j])
  ende für
ende für</code></pre>`,
    question: "Wie oft wird <code>spiele</code> für n = 10 Teilnehmer aufgerufen?",
    answer: 45, tolerance: 0,
    solution: "i = 0: 9 Aufrufe, i = 1: 8, …, i = 8: 1, i = 9: 0 → 9 + 8 + … + 1 = n(n−1)/2 = 10 · 9 / 2 = <b>45</b>.",
    explanation: "Trotz halbierter Anzahl ist die Komplexität O(n²) (Faktor ½ fällt weg). Fehler: n² = 100 oder n(n+1)/2 = 55 angeben.",
    tags: ["schleifen", "zaehlen"]
  },
  {
    id: "ga2-komplexitaet-008", part: "GA2", topic: "ga2-komplexitaet", type: "numeric", difficulty: 2, points: 3,
    context: "Ein Sortieralgorithmus mit quadratischer Laufzeit O(n²) benötigt für 1000 Datensätze 2 Sekunden.",
    question: "Wie viele Sekunden sind für 5000 Datensätze zu erwarten?",
    answer: 50, tolerance: 0.5, unit: "s",
    solution: "n wird um den Faktor 5 größer → Laufzeit um den Faktor 5² = 25 → 2 s · 25 = <b>50 s</b>.",
    explanation: "Mit einem O(n log n)-Verfahren wäre der Faktor nur ≈ 5 · log(5000)/log(1000) ≈ 6,2.",
    tags: ["laufzeit-hochrechnen"]
  },
  {
    id: "ga2-komplexitaet-009", part: "GA2", topic: "ga2-komplexitaet", type: "numeric", difficulty: 3, points: 4,
    context: "Ein Algorithmus hat eine Laufzeit proportional zu n · log₂ n. Für n = 1024 Elemente benötigt er 10 ms.",
    question: "Wie viele Millisekunden benötigt er für n = 4096 Elemente?",
    answer: 48, tolerance: 0.1, unit: "ms",
    solution: "1024 · log₂ 1024 = 1024 · 10 = 10 240<br>4096 · log₂ 4096 = 4096 · 12 = 49 152<br>Faktor 49 152 / 10 240 = 4,8 → 10 ms · 4,8 = <b>48 ms</b>.",
    explanation: "log₂ 1024 = 10 und log₂ 4096 = 12 (2¹² = 4096) sollten ohne Rechner bekannt sein.",
    tags: ["laufzeit-hochrechnen"]
  },
  {
    id: "ga2-komplexitaet-010", part: "GA2", topic: "ga2-komplexitaet", type: "numeric", difficulty: 2, points: 2,
    question: `Wie oft wird der Schleifenrumpf ausgeführt?
<pre><code>var i: Ganzzahl = 1
solange i &lt; 1000
  i = i * 2
ende solange</code></pre>`,
    answer: 10, tolerance: 0,
    solution: "i nimmt vor jedem Durchlauf die Werte 1, 2, 4, 8, 16, 32, 64, 128, 256, 512 an (alle &lt; 1000) → <b>10</b> Durchläufe. Danach ist i = 1024 und die Bedingung falsch.",
    explanation: "Verdoppeln bis n entspricht ⌈log₂ n⌉ Durchläufen → O(log n).",
    tags: ["schleifen", "zaehlen"]
  },
  {
    id: "ga2-komplexitaet-011", part: "GA2", topic: "ga2-komplexitaet", type: "code", lang: "pseudocode", difficulty: 3, points: 8,
    context: `Ein Importmodul prüft, ob in einer Liste von E-Mail-Adressen Duplikate enthalten sind. Bei 200 000 Adressen dauert die Prüfung inakzeptabel lange:
<pre><code>funktion hatDuplikate(mails: Array von Text): Wahrheitswert
  für i von 0 bis laenge(mails) - 1
    für j von 0 bis laenge(mails) - 1
      wenn i != j UND mails[i] == mails[j] dann
        rückgabe wahr
      ende wenn
    ende für
  ende für
  rückgabe falsch
ende funktion</code></pre>`,
    question: "a) Geben Sie die Zeitkomplexität des vorhandenen Codes an. (1 P)<br>b) Entwickeln Sie eine Variante mit linearer Laufzeit unter Verwendung eines <code>HashSet</code> (Methoden <code>enthaelt(x)</code>, <code>hinzufuegen(x)</code>). (5 P)<br>c) Nennen Sie den Nachteil Ihrer Lösung. (2 P)",
    solution: `a) <b>O(n²)</b> – jedes Element wird mit jedem verglichen (n² ≈ 4 · 10¹⁰ Vergleiche).<br>
b)<pre><code>funktion hatDuplikate(mails: Array von Text): Wahrheitswert
  var gesehen: Set von Text = neues HashSet()
  für jedes m in mails
    var normal: Text = kleinbuchstaben(m)      // E-Mail-Adressen case-insensitiv
    wenn gesehen.enthaelt(normal) dann
      rückgabe wahr
    ende wenn
    gesehen.hinzufuegen(normal)
  ende für
  rückgabe falsch
ende funktion</code></pre>
Jedes Element wird einmal betrachtet, <code>enthaelt</code>/<code>hinzufuegen</code> kosten im Mittel O(1) → <b>O(n)</b>.<br>
c) Zusätzlicher Speicherbedarf O(n) für das Set (Space-Time-Tradeoff). Alternative ohne viel Zusatzspeicher: sortieren (O(n log n)) und benachbarte Elemente vergleichen.`,
    explanation: "Zusätzlicher Fehler im Original: Die innere Schleife könnte bei <code>j = i + 1</code> beginnen (halbiert die Vergleiche, bleibt aber O(n²)). Texte in Java mit <code>equals</code> vergleichen.",
    keywords: ["o(n²)|o(n^2)|quadratisch", "set|hashset", "enthaelt|contains", "hinzufuegen|add", "für jedes|for", "wahr|true", "o(n)|linear", "speicher"],
    tags: ["optimierung", "hashset"]
  },
  {
    id: "ga2-komplexitaet-012", part: "GA2", topic: "ga2-komplexitaet", type: "code", lang: "pseudocode", difficulty: 3, points: 8,
    context: "Ein Smart-Home-System speichert Temperaturmesswerte in einem Array. Für ein Diagramm soll für jede Position i ≥ k − 1 der gleitende Mittelwert der letzten k Werte (Positionen i − k + 1 bis i) berechnet werden. Eine naive Lösung summiert für jede Position k Werte neu – Laufzeit O(n · k).",
    question: "Entwickeln Sie die Funktion <code>gleitenderMittelwert(werte: Array von Gleitkommazahl, k: Ganzzahl): Array von Gleitkommazahl</code> mit Laufzeit <b>O(n)</b>. Das Ergebnisarray hat die Länge n − k + 1. Erläutern Sie kurz die Idee.",
    solution: `<b>Idee (Sliding Window):</b> Die Fenstersumme wird nicht neu berechnet, sondern beim Verschieben um eine Position aktualisiert: neuen Wert addieren, herausfallenden Wert subtrahieren.
<pre><code>funktion gleitenderMittelwert(werte: Array von Gleitkommazahl, k: Ganzzahl): Array von Gleitkommazahl
  var n: Ganzzahl = laenge(werte)
  wenn k &lt;= 0 ODER k &gt; n dann
    wirf neue IllegalArgumentException("k ungültig")
  ende wenn
  var ergebnis: Array[n - k + 1] von Gleitkommazahl
  var summe: Gleitkommazahl = 0.0
  für i von 0 bis k - 1                  // erstes Fenster
    summe = summe + werte[i]
  ende für
  ergebnis[0] = summe / k
  für i von k bis n - 1                  // Fenster verschieben
    summe = summe + werte[i] - werte[i - k]
    ergebnis[i - k + 1] = summe / k
  ende für
  rückgabe ergebnis
ende funktion</code></pre>
Jeder Wert wird genau einmal addiert und einmal subtrahiert → O(n).`,
    explanation: "Index-Fallen: herausfallender Wert ist <code>werte[i - k]</code>, Zielindex <code>i - k + 1</code>. Prüfen mit k = 1 (Ergebnis = Eingabe) und k = n (ein Wert = Gesamtmittel).",
    keywords: ["summe", "für|for", "k - 1|k-1", "werte[i - k]|werte[i-k]", "+ werte[i]|+werte[i]", "/ k|/k", "n - k + 1|n-k+1", "o(n)|linear", "rückgabe|return"],
    tags: ["optimierung", "sliding-window"]
  },
  {
    id: "ga2-komplexitaet-013", part: "GA2", topic: "ga2-komplexitaet", type: "text", difficulty: 1, points: 4,
    question: "Erläutern Sie die Begriffe <b>Best Case</b>, <b>Worst Case</b> und <b>Average Case</b> am Beispiel der linearen Suche in einem Array mit n Elementen.",
    solution: `<ul><li><b>Best Case</b> (günstigster Fall): Das gesuchte Element steht an der ersten Position → 1 Vergleich, O(1).</li>
<li><b>Worst Case</b> (ungünstigster Fall): Das Element steht an der letzten Position oder ist nicht enthalten → n Vergleiche, O(n).</li>
<li><b>Average Case</b> (durchschnittlicher Fall): Bei gleichverteilter Position des vorhandenen Elements im Mittel (n + 1)/2 ≈ n/2 Vergleiche → ebenfalls O(n).</li></ul>
Für Garantien (z. B. Antwortzeiten) ist der Worst Case maßgeblich.`,
    keywords: ["best case|günstig|guenstig", "worst case|ungünstig|unguenstig", "average|durchschnitt|mittel", "erste|ersten", "letzte|nicht enthalten|nicht vorhanden", "n/2|n / 2|hälfte|haelfte", "o(1)", "o(n)"],
    tags: ["best-worst-average"]
  },
  {
    id: "ga2-komplexitaet-014", part: "GA2", topic: "ga2-komplexitaet", type: "text", difficulty: 3, points: 6,
    question: `Die folgende Funktion berechnet Fibonacci-Zahlen. Für <code>fib(50)</code> rechnet das Programm minutenlang.
<pre><code>funktion fib(n: Ganzzahl): Ganzzahl
  wenn n &lt; 2 dann rückgabe n ende wenn
  rückgabe fib(n - 1) + fib(n - 2)
ende funktion</code></pre>
a) Begründen Sie die lange Laufzeit und geben Sie die Komplexitätsklasse an. (3 P)<br>b) Beschreiben Sie zwei Möglichkeiten zur Verbesserung und deren Komplexität. (3 P)`,
    solution: `a) Jeder Aufruf erzeugt zwei weitere Aufrufe (Baumrekursion). Dieselben Teilprobleme werden vielfach neu berechnet (fib(48) zweimal, fib(47) dreimal, …). Die Anzahl der Aufrufe wächst exponentiell → <b>O(2ⁿ)</b> (genauer ≈ 1,618ⁿ). Für n = 50 sind das über 10¹⁰ Aufrufe.<br>
b)<ul><li><b>Memoisierung</b> (dynamische Programmierung top-down): bereits berechnete Werte in einem Array/einer Map speichern und bei erneutem Bedarf nachschlagen → jeder Wert wird nur einmal berechnet: <b>O(n)</b> Zeit, O(n) Speicher.</li>
<li><b>Iterative Lösung</b> (bottom-up): mit zwei Variablen <code>a = 0, b = 1</code> in einer Schleife n-mal <code>(a, b) = (b, a + b)</code> → <b>O(n)</b> Zeit, O(1) Speicher, kein Stackoverflow-Risiko.</li></ul>`,
    keywords: ["zwei aufrufe|zweimal|baumrekursion|doppelt", "mehrfach|wiederholt|erneut", "exponentiell|2^n|2ⁿ", "memo|zwischenspeich|cache|speichern", "iterativ|schleife", "o(n)|linear", "dynamische programmierung|bottom-up|top-down"],
    tags: ["exponentiell", "fibonacci"]
  }
);

// ===================== ga2-zahlensysteme =====================
AP2.questions.push(
  {
    id: "ga2-zahlensysteme-001", part: "GA2", topic: "ga2-zahlensysteme", type: "numeric", difficulty: 1, points: 2,
    question: "Wandeln Sie die Dualzahl <code>1011 0110</code> in eine Dezimalzahl um.",
    answer: 182, tolerance: 0,
    solution: "1·128 + 0·64 + 1·32 + 1·16 + 0·8 + 1·4 + 1·2 + 0·1 = 128 + 32 + 16 + 4 + 2 = <b>182</b>. (Hex: B6 = 11·16 + 6 = 182)",
    explanation: "Stellenwerte von rechts: 1, 2, 4, 8, 16, 32, 64, 128. Fehlerquelle: von links mit 1 beginnen.",
    tags: ["dual", "umrechnen"]
  },
  {
    id: "ga2-zahlensysteme-002", part: "GA2", topic: "ga2-zahlensysteme", type: "numeric", difficulty: 1, points: 2,
    question: "Wandeln Sie die Hexadezimalzahl <code>0x7EA</code> in eine Dezimalzahl um.",
    answer: 2026, tolerance: 0,
    solution: "7·16² + E·16¹ + A·16⁰ = 7·256 + 14·16 + 10 = 1792 + 224 + 10 = <b>2026</b>.",
    explanation: "Umgekehrt (Divisionsrestverfahren): 2026 : 16 = 126 Rest 10 (A); 126 : 16 = 7 Rest 14 (E); 7 : 16 = 0 Rest 7 → 7EA.",
    tags: ["hex", "umrechnen"]
  },
  {
    id: "ga2-zahlensysteme-003", part: "GA2", topic: "ga2-zahlensysteme", type: "numeric", difficulty: 2, points: 3,
    question: "Ein Sensor liefert den 8-Bit-Wert <code>1110 1100</code> im <b>Zweierkomplement</b>. Welchem Dezimalwert entspricht er?",
    answer: -20, tolerance: 0,
    solution: "Das höchste Bit ist 1 → negative Zahl. Betrag: invertieren → 0001 0011, +1 → 0001 0100 = 20. Ergebnis: <b>−20</b>.<br>Alternativ: −128 + 64 + 32 + 8 + 4 = −20.",
    explanation: "Vorzeichenbit hat die Wertigkeit −2⁷ = −128. Als vorzeichenlose Zahl wäre der Wert 236 (= 256 − 20).",
    tags: ["zweierkomplement"]
  },
  {
    id: "ga2-zahlensysteme-004", part: "GA2", topic: "ga2-zahlensysteme", type: "numeric", difficulty: 2, points: 3,
    question: "In Java wird ausgeführt: <code>byte b = 120; b = (byte)(b + 10);</code> Welchen Wert hat <code>b</code> anschließend?",
    answer: -126, tolerance: 0,
    solution: "Wertebereich byte: −128 … 127. 120 + 10 = 130 passt nicht; beim Cast werden nur die unteren 8 Bit übernommen: 130 = 1000 0010 → im Zweierkomplement −128 + 2 = <b>−126</b> (130 − 256).",
    explanation: "Ganzzahlüberlauf löst in Java keinen Fehler aus (Wrap-around). Abhilfe: größeren Datentyp verwenden oder <code>Math.addExact</code> (wirft ArithmeticException).",
    tags: ["ueberlauf", "wertebereich"]
  },
  {
    id: "ga2-zahlensysteme-005", part: "GA2", topic: "ga2-zahlensysteme", type: "numeric", difficulty: 2, points: 3,
    question: "Gegeben ist <code>x = 1011 0110₂</code>. Berechnen Sie den Dezimalwert von <code>(x &gt;&gt; 2) AND 0000 1111₂</code>.",
    answer: 13, tolerance: 0,
    solution: "x &gt;&gt; 2 (logisch um 2 nach rechts): 1011 0110 → 0010 1101<br>AND 0000 1111 → 0000 1101 = 8 + 4 + 1 = <b>13</b>.<br>Damit werden die Bits 2–5 des ursprünglichen Werts extrahiert.",
    explanation: "Shift nach rechts um k entspricht Ganzzahldivision durch 2ᵏ (182 div 4 = 45 = 0010 1101), die AND-Maske 0x0F behält nur die unteren 4 Bit (45 mod 16 = 13).",
    tags: ["bitoperationen", "maske"]
  },
  {
    id: "ga2-zahlensysteme-006", part: "GA2", topic: "ga2-zahlensysteme", type: "numeric", difficulty: 2, points: 3,
    context: "Ein Kunde beschwert sich: Auf seiner neuen Festplatte steht „2 TB“, das Betriebssystem zeigt aber weniger an.",
    question: "Wie viele <b>TiB</b> zeigt das Betriebssystem an (auf zwei Nachkommastellen)?",
    answer: 1.82, tolerance: 0.01, unit: "TiB",
    solution: "2 TB = 2 · 10¹² Byte (SI-Präfix, Hersteller). 1 TiB = 2⁴⁰ Byte = 1 099 511 627 776 Byte.<br>2 · 10¹² / 2⁴⁰ ≈ <b>1,82 TiB</b>.",
    explanation: "Die Differenz (~9 %) entsteht nur durch die unterschiedlichen Einheiten (dezimal vs. binär), nicht durch fehlenden Speicher.",
    tags: ["speichergroessen"]
  },
  {
    id: "ga2-zahlensysteme-007", part: "GA2", topic: "ga2-zahlensysteme", type: "mc", difficulty: 1, points: 2,
    question: "Welchen Wertebereich hat ein vorzeichenbehafteter 16-Bit-Ganzzahltyp (Java <code>short</code>)?",
    options: ["0 bis 65 535", "−32 768 bis 32 767", "−32 767 bis 32 768", "−65 536 bis 65 535"],
    correct: [1],
    solution: "Bei n Bit im Zweierkomplement: −2ⁿ⁻¹ bis 2ⁿ⁻¹ − 1 → −2¹⁵ = <b>−32 768</b> bis 2¹⁵ − 1 = <b>32 767</b>.",
    explanation: "0 bis 65 535 wäre vorzeichenlos (z. B. Java <code>char</code>). Der negative Bereich ist um eins größer, weil die 0 im positiven Bereich liegt.",
    tags: ["wertebereich"]
  },
  {
    id: "ga2-zahlensysteme-008", part: "GA2", topic: "ga2-zahlensysteme", type: "mc", difficulty: 2, points: 2,
    question: "Warum liefert in Java der Ausdruck <code>0.1 + 0.2 == 0.3</code> den Wert <code>false</code>?",
    options: [
      "Weil der Operator == bei Gleitkommazahlen die Speicheradressen vergleicht.",
      "Weil 0,1 und 0,2 im Binärsystem nicht exakt darstellbar sind (periodische Brüche) und dadurch Rundungsfehler entstehen.",
      "Weil Java bei double-Werten nur 2 Nachkommastellen speichert.",
      "Weil die Addition von Gleitkommazahlen in Java nicht kommutativ ist."
    ],
    correct: [1],
    solution: "Nach IEEE 754 werden Zahlen als Mantisse · 2^Exponent gespeichert. 0,1 ist binär periodisch (0,000110011…) und wird gerundet. Die Summe ergibt 0.30000000000000004 ≠ 0.3.",
    explanation: "Gleitkommazahlen immer mit Toleranz vergleichen: <code>Math.abs(a - b) &lt; 1e-9</code>. Für Geldbeträge BigDecimal oder Ganzzahlen in Cent verwenden.",
    tags: ["gleitkomma", "ieee754"]
  },
  {
    id: "ga2-zahlensysteme-009", part: "GA2", topic: "ga2-zahlensysteme", type: "multi", difficulty: 2, points: 4,
    question: "Welche Aussagen zur Zeichenkodierung sind <b>richtig</b>?",
    options: [
      "UTF-8 kodiert Zeichen mit variabler Länge von 1 bis 4 Byte.",
      "Die ersten 128 Zeichen von UTF-8 sind identisch mit ASCII.",
      "In UTF-8 belegt jedes Zeichen genau 2 Byte.",
      "Der Umlaut „ä“ benötigt in UTF-8 zwei Byte.",
      "ASCII ist ein 16-Bit-Code mit 65 536 Zeichen."
    ],
    correct: [0, 1, 3],
    solution: "Richtig: A, B, D. C ist falsch (variable Länge; ASCII-Zeichen 1 Byte, € 3 Byte, Emojis 4 Byte). E ist falsch – ASCII ist ein 7-Bit-Code mit 128 Zeichen.",
    explanation: "Unicode ist der Zeichensatz (jedem Zeichen ist ein Codepoint zugeordnet, z. B. U+00E4 für ä), UTF-8/UTF-16 sind Kodierungen dieser Codepoints in Bytes. Typischer Fehler beim Datenaustausch: UTF-8-Datei als ISO-8859-1 gelesen → „Ã¤“ statt „ä“.",
    tags: ["kodierung", "utf8"]
  },
  {
    id: "ga2-zahlensysteme-010", part: "GA2", topic: "ga2-zahlensysteme", type: "multi", difficulty: 2, points: 4,
    question: "Welche booleschen Ausdrücke sind für alle Belegungen von A und B <b>gleichwertig</b> zu <code>NICHT (A UND B)</code>?",
    options: [
      "<code>NICHT A ODER NICHT B</code>",
      "<code>NICHT A UND NICHT B</code>",
      "<code>NICHT (NICHT A ODER NICHT B) XOR wahr</code>",
      "<code>A ODER B</code>",
      "<code>(A UND NICHT B) ODER (NICHT A)</code>"
    ],
    correct: [0, 2, 4],
    solution: `Wahrheitstabelle von NICHT(A UND B): A=0,B=0 → 1; 0,1 → 1; 1,0 → 1; 1,1 → 0 (NAND).<ul>
<li>A: De Morgan – gleichwertig.</li>
<li>B: NICHT A UND NICHT B = NICHT(A ODER B) (NOR) → bei 0,1 bereits 0 – nicht gleichwertig.</li>
<li>C: NICHT(NICHT A ODER NICHT B) = A UND B; XOR wahr negiert → NICHT(A UND B) – gleichwertig.</li>
<li>D: bei 0,0 → 0 – nicht gleichwertig.</li>
<li>E: 0,0 → 1; 0,1 → 1; 1,0 → 1; 1,1 → 0 – gleichwertig.</li></ul>`,
    explanation: "De Morgan: NICHT(A UND B) = NICHT A ODER NICHT B; NICHT(A ODER B) = NICHT A UND NICHT B. Nützlich beim Umformen von Schleifenbedingungen (z. B. „wiederhole … bis X ODER Y“ ↔ „solange NICHT X UND NICHT Y“).",
    tags: ["boolesche-algebra", "wahrheitstabelle"]
  },
  {
    id: "ga2-zahlensysteme-011", part: "GA2", topic: "ga2-zahlensysteme", type: "code", lang: "pseudocode", difficulty: 2, points: 7,
    context: "Für eine Lernsoftware zur Digitaltechnik soll eine Dezimalzahl (0–255) als 8-stellige Dualzahl angezeigt werden, z. B. 13 → \"00001101\". Bibliotheksfunktionen zur Umwandlung (z. B. <code>Integer.toBinaryString</code>) dürfen nicht verwendet werden.",
    question: "Entwickeln Sie die Funktion <code>alsDual8(zahl: Ganzzahl): Text</code> mithilfe des Divisionsrestverfahrens (<code>div</code>, <code>mod</code>). Liegt die Zahl außerhalb von 0–255, soll eine <code>IllegalArgumentException</code> geworfen werden.",
    starter: "funktion alsDual8(zahl: Ganzzahl): Text\n  // Ihr Code\nende funktion",
    solution: `<pre><code>funktion alsDual8(zahl: Ganzzahl): Text
  wenn zahl &lt; 0 ODER zahl &gt; 255 dann
    wirf neue IllegalArgumentException("Nur 0 bis 255 erlaubt")
  ende wenn
  var ergebnis: Text = ""
  var rest: Ganzzahl = zahl
  für i von 1 bis 8                      // genau 8 Stellen → führende Nullen
    ergebnis = alsText(rest mod 2) + ergebnis   // Rest VORNE anfügen
    rest = rest div 2
  ende für
  rückgabe ergebnis
ende funktion</code></pre>
Trace 13: Reste 1, 0, 1, 1, 0, 0, 0, 0 → jeweils vorn angefügt → „00001101“.`,
    explanation: "Die Reste ergeben die Bits von der niederwertigsten Stelle an – daher vorn anfügen (oder am Ende umkehren). Mit <code>solange rest &gt; 0</code> statt fester 8 Durchläufe fehlen die führenden Nullen, und für 0 entstünde ein leerer Text.",
    keywords: ["mod 2|% 2|%2", "div 2|/ 2|/2", "für|for|solange|while", "8", "+ ergebnis|+ergebnis", "< 0|<0", "> 255|>255", "wirf|throw", "rückgabe|return"],
    tags: ["umrechnen", "divisionsrest"]
  },
  {
    id: "ga2-zahlensysteme-012", part: "GA2", topic: "ga2-zahlensysteme", type: "code", lang: "pseudocode", difficulty: 3, points: 8,
    context: "In einem Dokumentenmanagementsystem werden Benutzerrechte platzsparend als Bitfeld in einer Ganzzahl gespeichert: <code>LESEN = 1</code> (0001), <code>SCHREIBEN = 2</code> (0010), <code>AUSFUEHREN = 4</code> (0100), <code>LOESCHEN = 8</code> (1000). Verfügbar sind die bitweisen Operatoren <code>AND</code>, <code>OR</code>, <code>XOR</code>, <code>NOT</code>.",
    question: "a) Entwickeln Sie die Funktionen <code>hatRecht(rechte, recht): Wahrheitswert</code>, <code>gewaehren(rechte, recht): Ganzzahl</code> und <code>entziehen(rechte, recht): Ganzzahl</code>. (6 P)<br>b) Ein Benutzer hat den Rechtewert 13. Welche Rechte besitzt er? (2 P)",
    solution: `a)<pre><code>funktion hatRecht(rechte: Ganzzahl, recht: Ganzzahl): Wahrheitswert
  rückgabe (rechte AND recht) == recht      // alle Bits der Maske gesetzt?
ende funktion

funktion gewaehren(rechte: Ganzzahl, recht: Ganzzahl): Ganzzahl
  rückgabe rechte OR recht                  // Bit setzen
ende funktion

funktion entziehen(rechte: Ganzzahl, recht: Ganzzahl): Ganzzahl
  rückgabe rechte AND (NOT recht)           // Bit löschen
ende funktion</code></pre>
Java: <code>(rechte &amp; recht) == recht</code>, <code>rechte | recht</code>, <code>rechte &amp; ~recht</code>.<br>
b) 13 = 1101₂ = 8 + 4 + 1 → <b>LESEN, AUSFUEHREN, LOESCHEN</b> (kein SCHREIBEN).`,
    explanation: "Fehlerquelle beim Entziehen: <code>rechte XOR recht</code> schaltet das Bit nur um – hat der Benutzer das Recht nicht, würde es dadurch gewährt. Ebenso falsch: <code>rechte - recht</code> (wird negativ/falsch, wenn das Bit nicht gesetzt war).",
    keywords: ["and|&", "or|oder", "not|~", "== recht|==recht|!= 0|!=0", "rückgabe|return", "8 + 4 + 1|1101", "lesen", "loeschen|löschen"],
    tags: ["bitoperationen", "maske", "rechte"]
  },
  {
    id: "ga2-zahlensysteme-013", part: "GA2", topic: "ga2-zahlensysteme", type: "text", difficulty: 2, points: 5,
    context: "In einer Rechnungssoftware werden Beträge als <code>double</code> gespeichert. Bei der Summierung von 1 000 Positionen à 0,10 € ergibt sich 99,9999999999986 € statt 100,00 €.",
    question: "Erläutern Sie die Ursache und beschreiben Sie zwei Lösungsmöglichkeiten.",
    solution: `<b>Ursache:</b> double ist eine binäre Gleitkommazahl nach IEEE 754 (Vorzeichen, Exponent, 52-Bit-Mantisse). Dezimalbrüche wie 0,10 sind im Dualsystem periodisch (0,0001100110011…₂) und können nur gerundet gespeichert werden. Bei vielen Additionen summieren sich die kleinen Rundungsfehler.<br>
<b>Lösungen:</b><ul><li><b>Ganzzahlige Darstellung in Cent</b> (long): 10 Cent · 1000 = 10 000 Cent exakt; nur bei der Ausgabe durch 100 teilen.</li>
<li><b>Dezimaler Datentyp</b> wie <code>BigDecimal</code> (Java) bzw. <code>decimal</code> (C#, SQL DECIMAL(10,2)) mit definierter Rundung (z. B. HALF_UP), der Dezimalzahlen exakt darstellt.</li>
<li>Ergänzend: Vergleiche nie mit == sondern mit Toleranz; Rundung nur einmal am Ende nach kaufmännischen Regeln.</li></ul>`,
    keywords: ["ieee|gleitkomma", "binär|binaer|dual", "periodisch|nicht exakt|nicht genau", "rundung", "cent|ganzzahl|long", "bigdecimal|decimal", "summ|addition|akkumul"],
    tags: ["gleitkomma"]
  },
  {
    id: "ga2-zahlensysteme-014", part: "GA2", topic: "ga2-zahlensysteme", type: "order", difficulty: 2, points: 3,
    question: "Ordnen Sie die Speichergrößen <b>aufsteigend</b>.",
    items: ["1 KB (1000 Byte)", "1 KiB", "1 MB", "1 MiB", "1 GB", "1 GiB"],
    solution: "1 KB = 1000 B &lt; 1 KiB = 1024 B &lt; 1 MB = 1 000 000 B &lt; 1 MiB = 1 048 576 B &lt; 1 GB = 10⁹ B &lt; 1 GiB = 1 073 741 824 B.",
    explanation: "Die Abweichung zwischen SI- und IEC-Präfix wächst mit der Größe: ca. 2,4 % (Kilo), 4,9 % (Mega), 7,4 % (Giga), 10 % (Tera).",
    tags: ["speichergroessen"]
  }
);

// ===================== ga2-exceptions-formate =====================
AP2.questions.push(
  {
    id: "ga2-exceptions-formate-001", part: "GA2", topic: "ga2-exceptions-formate", type: "mc", difficulty: 2, points: 2,
    question: "Wann wird der <code>finally</code>-Block (Pseudocode: <code>schließlich</code>) einer try-catch-finally-Anweisung ausgeführt?",
    options: [
      "Nur wenn im try-Block eine Exception aufgetreten ist",
      "Nur wenn im try-Block keine Exception aufgetreten ist",
      "Immer – unabhängig davon, ob eine Exception auftritt, gefangen wird oder im try-Block ein return steht",
      "Nur wenn keiner der catch-Blöcke zur Exception passt"
    ],
    correct: [2],
    solution: "Der finally-Block wird <b>immer</b> ausgeführt (Ausnahme: Programmabbruch z. B. durch <code>System.exit()</code>). Er dient zum Freigeben von Ressourcen (Datei schließen, Datenbankverbindung trennen).",
    explanation: "Moderne Alternative in Java: try-with-resources <code>try (BufferedReader r = …) { … }</code> schließt AutoCloseable-Ressourcen automatisch.",
    tags: ["exceptions", "finally"]
  },
  {
    id: "ga2-exceptions-formate-002", part: "GA2", topic: "ga2-exceptions-formate", type: "multi", difficulty: 2, points: 4,
    question: "Welche der folgenden Java-Exceptions sind <b>checked</b> Exceptions (müssen gefangen oder mit <code>throws</code> deklariert werden)?",
    options: ["IOException", "NullPointerException", "FileNotFoundException", "ArrayIndexOutOfBoundsException", "NumberFormatException", "SQLException"],
    correct: [0, 2, 5],
    solution: "Checked: <b>IOException</b>, <b>FileNotFoundException</b> (Unterklasse von IOException), <b>SQLException</b>. Unchecked (Unterklassen von RuntimeException): NullPointerException, ArrayIndexOutOfBoundsException, NumberFormatException (Unterklasse von IllegalArgumentException).",
    explanation: "Checked Exceptions beschreiben äußere, vorhersehbare Fehler (Datei fehlt, Netzwerk), auf die der Aufrufer reagieren soll. Unchecked Exceptions deuten meist auf Programmierfehler hin.",
    tags: ["exceptions", "checked"]
  },
  {
    id: "ga2-exceptions-formate-003", part: "GA2", topic: "ga2-exceptions-formate", type: "mc", difficulty: 1, points: 2,
    question: "Welcher reguläre Ausdruck prüft, ob eine Eingabe genau einer deutschen Postleitzahl (fünf Ziffern) entspricht?",
    options: ["<code>[0-9]{5}</code>", "<code>^[0-9]{5}$</code>", "<code>^[0-9]+$</code>", "<code>^[1-9]{5}$</code>"],
    correct: [1],
    solution: "<code>^[0-9]{5}$</code>: <code>^</code> Anfang, genau fünf Ziffern, <code>$</code> Ende. „01067“ (Dresden) wird akzeptiert, „1067“ und „123456“ nicht.",
    explanation: "Ohne Anker (A) würde z. B. „ABC123456“ einen Treffer liefern, wenn nur nach einem Teilstring gesucht wird. C erlaubt beliebig viele Ziffern, D schließt die 0 aus (PLZ beginnen mit 0!).",
    tags: ["regex"]
  },
  {
    id: "ga2-exceptions-formate-004", part: "GA2", topic: "ga2-exceptions-formate", type: "multi", difficulty: 3, points: 4,
    question: "Gegeben ist der reguläre Ausdruck <code>^(0[1-9]|[12][0-9]|3[01])\\.(0[1-9]|1[0-2])\\.[0-9]{4}$</code>. Welche Eingaben werden <b>akzeptiert</b>?",
    options: ["07.11.2026", "7.11.2026", "31.02.2026", "15.13.2026", "01.01.26"],
    correct: [0, 2],
    solution: "Akzeptiert: <b>07.11.2026</b> und <b>31.02.2026</b>.<ul><li>„7.11.2026“: Tag muss zweistellig sein.</li><li>„31.02.2026“ passt formal (31 ∈ 3[01], 02 ∈ 0[1-9]) – obwohl es den 31. Februar nicht gibt!</li><li>„15.13.2026“: Monat 13 passt nicht zu (0[1-9]|1[0-2]).</li><li>„01.01.26“: Jahr braucht 4 Ziffern.</li></ul>",
    explanation: "Reguläre Ausdrücke prüfen nur das <b>Format</b>. Die fachliche Gültigkeit (Monatslängen, Schaltjahr) muss zusätzlich, z. B. mit <code>LocalDate.parse()</code>, geprüft werden. <code>\\.</code> steht für einen echten Punkt, ein unmaskierter <code>.</code> wäre ein beliebiges Zeichen.",
    tags: ["regex", "datum"]
  },
  {
    id: "ga2-exceptions-formate-005", part: "GA2", topic: "ga2-exceptions-formate", type: "numeric", difficulty: 2, points: 4,
    question: `Welchen Wert hat <code>zaehler</code> nach Ausführung des folgenden Codes?
<pre><code>var zaehler: Ganzzahl = 0
für i von 0 bis 4
  versuche
    wenn i == 2 dann
      wirf neue Exception("Fehler")
    ende wenn
    zaehler = zaehler + 10
  fange (Exception e)
    zaehler = zaehler + 1
  schließlich
    zaehler = zaehler + 100
  ende versuche
ende für</code></pre>`,
    answer: 541, tolerance: 0,
    solution: "5 Durchläufe (i = 0 … 4).<br>i = 0, 1, 3, 4 (4×): try vollständig → +10, finally → +100 = je 110 → 440<br>i = 2: Exception → +10 wird übersprungen, catch → +1, finally → +100 = 101<br>Summe: 440 + 101 = <b>541</b>",
    explanation: "Nach dem Werfen wird der Rest des try-Blocks nicht mehr ausgeführt. Da die Exception im Schleifenrumpf gefangen wird, läuft die Schleife normal weiter.",
    tags: ["exceptions", "trace"]
  },
  {
    id: "ga2-exceptions-formate-006", part: "GA2", topic: "ga2-exceptions-formate", type: "code", lang: "pseudocode", difficulty: 2, points: 8,
    context: "In der Bestellmaske eines Webshops wird die Menge als Text eingegeben. Gültig sind ganze Zahlen von 1 bis 999. Die Funktion <code>parseGanzzahl(text)</code> wirft bei nicht numerischen Eingaben eine <code>NumberFormatException</code>.",
    question: "a) Definieren Sie die eigene Exception-Klasse <code>UngueltigeMengeException</code>. (2 P)<br>b) Entwickeln Sie die Funktion <code>leseMenge(eingabe: Text): Ganzzahl</code>, die die Eingabe (ohne führende/folgende Leerzeichen, Funktion <code>trimmen</code>) umwandelt und prüft. Bei leerer, nicht numerischer oder außerhalb des Bereichs liegender Eingabe soll eine <code>UngueltigeMengeException</code> mit aussagekräftiger Meldung geworfen werden. (6 P)",
    solution: `<pre><code>klasse UngueltigeMengeException erbt von Exception
  öffentlich konstruktor UngueltigeMengeException(meldung: Text)
    super(meldung)
  ende konstruktor
ende klasse

funktion leseMenge(eingabe: Text): Ganzzahl  wirft UngueltigeMengeException
  wenn eingabe == null ODER laenge(trimmen(eingabe)) == 0 dann
    wirf neue UngueltigeMengeException("Bitte eine Menge eingeben.")
  ende wenn
  var menge: Ganzzahl
  versuche
    menge = parseGanzzahl(trimmen(eingabe))
  fange (NumberFormatException e)
    wirf neue UngueltigeMengeException("'" + eingabe + "' ist keine ganze Zahl.")
  ende versuche
  wenn menge &lt; 1 ODER menge &gt; 999 dann
    wirf neue UngueltigeMengeException("Menge muss zwischen 1 und 999 liegen.")
  ende wenn
  rückgabe menge
ende funktion</code></pre>`,
    explanation: "Die technische NumberFormatException wird in eine fachliche Exception übersetzt (Exception-Chaining, in Java optional mit Ursache <code>new UngueltigeMengeException(msg, e)</code>). Grenzwerte 1 und 999 sind gültig (&lt; bzw. &gt;). Leerer catch-Block oder Rückgabe von 0 statt Exception wären schlechter Stil.",
    keywords: ["erbt von|extends", "exception", "super(", "versuche|try", "fange|catch", "numberformatexception", "wirf|throw", "< 1|<1", "> 999|>999", "rückgabe|return"],
    tags: ["exceptions", "validierung", "eigene-exception"]
  },
  {
    id: "ga2-exceptions-formate-007", part: "GA2", topic: "ga2-exceptions-formate", type: "code", lang: "java", difficulty: 3, points: 9,
    context: "Im Kontoverwaltungssystem einer Bank soll ein Abheben, das den Dispositionsrahmen überschreitet, als fachlicher Fehler signalisiert werden. Der Aufrufer (Geldautomat-Steuerung) soll dem Kunden eine verständliche Meldung anzeigen; in jedem Fall soll ein Protokolleintrag erfolgen.",
    question: "a) Implementieren Sie die checked Exception <code>KontoUeberzogenException</code>, die den fehlenden Betrag speichert und per Getter bereitstellt. (3 P)<br>b) Implementieren Sie die Methode <code>abheben(double betrag)</code> der Klasse Konto (Attribute <code>saldo</code>, <code>dispo</code>), die die Exception wirft. (3 P)<br>c) Schreiben Sie den Aufruf mit Fehlerbehandlung inkl. Protokollierung über <code>log(String)</code> in einem finally-Block. (3 P)",
    starter: "public class KontoUeberzogenException extends Exception {\n  // a)\n}\n\n// b) in Klasse Konto\n\n// c) Aufrufer",
    solution: `<pre><code>// a)
public class KontoUeberzogenException extends Exception {
  private final double fehlbetrag;
  public KontoUeberzogenException(String meldung, double fehlbetrag) {
    super(meldung);
    this.fehlbetrag = fehlbetrag;
  }
  public double getFehlbetrag() { return fehlbetrag; }
}

// b)
public void abheben(double betrag) throws KontoUeberzogenException {
  if (betrag &lt;= 0) throw new IllegalArgumentException("Betrag muss positiv sein");
  if (saldo - betrag &lt; -dispo) {
    double fehlt = -dispo - (saldo - betrag);
    throw new KontoUeberzogenException("Verfügungsrahmen überschritten", fehlt);
  }
  saldo -= betrag;
}

// c)
try {
  konto.abheben(500.0);
  anzeigen("Bitte entnehmen Sie Ihr Geld.");
} catch (KontoUeberzogenException e) {
  anzeigen("Abhebung nicht möglich, es fehlen " + e.getFehlbetrag() + " EUR.");
} finally {
  log("Abhebeversuch Konto " + konto.getNummer() + " über 500.0");
}</code></pre>`,
    explanation: "Checked → Unterklasse von <code>Exception</code> (nicht RuntimeException), Methode muss <code>throws</code> deklarieren. Der Saldo darf bei einer Exception <b>nicht</b> verändert werden (erst prüfen, dann buchen). Fehlerquelle: <code>catch (Exception e)</code> vor dem speziellen catch – der spezielle wäre dann unerreichbar (Compilerfehler).",
    keywords: ["extends exception", "super(meldung)|super(", "getfehlbetrag", "throws kontoueberzogenexception|throws", "throw new kontoueberzogenexception", "try", "catch (kontoueberzogenexception|catch(kontoueberzogenexception", "finally", "log("],
    tags: ["eigene-exception", "java"]
  },
  {
    id: "ga2-exceptions-formate-008", part: "GA2", topic: "ga2-exceptions-formate", type: "code", lang: "pseudocode", difficulty: 3, points: 10,
    context: `Ein Bildungsträger exportiert Prüfungsergebnisse als CSV-Datei <code>noten.csv</code>:
<pre><code>Name;Note
Meier;2,3
Schulz;1,7
Yilmaz;abc
Krause;3,0</code></pre>
Verfügbare Funktionen: <code>oeffneLesen(pfad): Datei</code> (wirft DateiNichtGefundenException), <code>datei.istEnde(): Wahrheitswert</code>, <code>datei.leseZeile(): Text</code>, <code>datei.schliessen()</code>, <code>teile(text, trenner): Array von Text</code>, <code>parseGleitkomma(text): Gleitkommazahl</code> (akzeptiert Komma, wirft NumberFormatException).`,
    question: "Entwickeln Sie die Funktion <code>durchschnittAusDatei(pfad: Text): Gleitkommazahl</code>. Die Kopfzeile ist zu überspringen. Fehlerhafte Zeilen (falsche Spaltenanzahl oder ungültige Note) sollen mit Zeilennummer per <code>log(text)</code> protokolliert und übersprungen werden. Die Datei muss in jedem Fall geschlossen werden. Existiert die Datei nicht, soll die Exception an den Aufrufer weitergegeben werden.",
    solution: `<pre><code>funktion durchschnittAusDatei(pfad: Text): Gleitkommazahl  wirft DateiNichtGefundenException
  var datei: Datei = oeffneLesen(pfad)      // Exception wird weitergereicht
  var summe: Gleitkommazahl = 0.0
  var anzahl: Ganzzahl = 0
  var zeilenNr: Ganzzahl = 0
  versuche
    wenn NICHT datei.istEnde() dann
      datei.leseZeile()                     // Kopfzeile überspringen
      zeilenNr = 1
    ende wenn
    solange NICHT datei.istEnde()
      var zeile: Text = datei.leseZeile()
      zeilenNr = zeilenNr + 1
      var felder: Array von Text = teile(zeile, ";")
      wenn laenge(felder) != 2 dann
        log("Zeile " + zeilenNr + ": falsche Spaltenanzahl")
      sonst
        versuche
          summe = summe + parseGleitkomma(felder[1])
          anzahl = anzahl + 1
        fange (NumberFormatException e)
          log("Zeile " + zeilenNr + ": ungültige Note '" + felder[1] + "'")
        ende versuche
      ende wenn
    ende solange
  schließlich
    datei.schliessen()
  ende versuche
  wenn anzahl == 0 dann
    rückgabe 0.0
  ende wenn
  rückgabe summe / anzahl
ende funktion</code></pre>
Ergebnis für die Beispieldatei: (2,3 + 1,7 + 3,0) / 3 ≈ 2,33; Protokoll: „Zeile 4: ungültige Note 'abc'“.`,
    explanation: "Wichtig: inneres try/catch <b>pro Zeile</b>, damit eine fehlerhafte Zeile nicht den ganzen Import abbricht; <code>schliessen()</code> im finally-Block; Division durch die Anzahl der <b>gültigen</b> Zeilen. Die Datei wird außerhalb des try geöffnet – schlägt das Öffnen fehl, gibt es nichts zu schließen.",
    keywords: ["oeffnelesen|öffne|open", "solange|while", "istende|eof|hasnext", "lesezeile|readline", "teile|split", "\";\"", "versuche|try", "fange|catch", "schließlich|schliesslich|finally", "schliessen|close"],
    tags: ["csv", "datei", "exceptions"]
  },
  {
    id: "ga2-exceptions-formate-009", part: "GA2", topic: "ga2-exceptions-formate", type: "code", difficulty: 2, points: 6,
    context: "Ein Onlineshop soll Bestellungen per REST-Schnittstelle an den Logistikpartner übermitteln. Bestellung 4711 vom 24.11.2026 des Kunden Nr. 1003 (Anna Schmidt, Hauptstr. 5, 10115 Berlin) enthält: 2 × USB-Hub (Art.-Nr. A-100, 19,99 €) und 1 × Monitor (Art.-Nr. M-270, 189,00 €). Die Bestellung ist bezahlt, eine Bemerkung gibt es nicht.",
    question: "Erstellen Sie ein JSON-Dokument, das diese Bestellung abbildet. Verwenden Sie geeignete Datentypen (Zahl, Text, Wahrheitswert, null, Array, Objekt).",
    solution: `<pre><code>{
  "bestellnummer": 4711,
  "datum": "2026-11-24",
  "kunde": {
    "kundennummer": 1003,
    "name": "Anna Schmidt",
    "adresse": {
      "strasse": "Hauptstr. 5",
      "plz": "10115",
      "ort": "Berlin"
    }
  },
  "positionen": [
    { "artikelnummer": "A-100", "bezeichnung": "USB-Hub", "menge": 2, "einzelpreis": 19.99 },
    { "artikelnummer": "M-270", "bezeichnung": "Monitor", "menge": 1, "einzelpreis": 189.00 }
  ],
  "bezahlt": true,
  "bemerkung": null
}</code></pre>`,
    explanation: "Typische Fehler: einfache Anführungszeichen (in JSON nicht erlaubt), Komma nach dem letzten Element, Dezimalkomma statt Punkt (19,99 wäre ungültig), PLZ als Zahl (führende Null ginge verloren), Datum in uneinheitlichem Format (ISO 8601 empfohlen), Positionen nicht als Array.",
    keywords: ["{", "\"bestellnummer\"|\"nr\"|\"id\"", "[", "\"positionen\"|\"artikel\"|\"items\"", "19.99", "true", "null", "\"kunde\"", "4711"],
    tags: ["json"]
  },
  {
    id: "ga2-exceptions-formate-010", part: "GA2", topic: "ga2-exceptions-formate", type: "code", lang: "java", difficulty: 2, points: 8,
    context: `Gegeben ist die Funktion zur Rabattberechnung eines Onlineshops:
<ul><li>Bestellwert &lt; 100 € → 0 % Rabatt</li><li>100 € bis &lt; 500 € → 5 %</li><li>ab 500 € → 10 %</li><li>negative Bestellwerte → IllegalArgumentException</li></ul>
Signatur: <code>int rabattProzent(double bestellwert)</code> in der Klasse <code>RabattRechner</code>.`,
    question: "a) Ermitteln Sie die Äquivalenzklassen und geeignete Grenzwerte. (3 P)<br>b) Schreiben Sie Unit-Tests (JUnit-Notation oder Pseudocode mit <code>assertEquals(erwartet, tatsaechlich)</code> und <code>assertThrows</code>), die alle Klassen und Grenzen abdecken. (5 P)",
    solution: `a) Äquivalenzklassen: ungültig (&lt; 0), [0; 100), [100; 500), [500; ∞).<br>Grenzwerte: −0,01 | 0 | 99,99 | 100 | 499,99 | 500.
<pre><code>class RabattRechnerTest {
  private final RabattRechner r = new RabattRechner();

  @Test void negativerWertWirftException() {
    assertThrows(IllegalArgumentException.class, () -&gt; r.rabattProzent(-0.01));
  }
  @Test void nullEuroKeinRabatt()        { assertEquals(0,  r.rabattProzent(0.0)); }
  @Test void knappUnter100KeinRabatt()   { assertEquals(0,  r.rabattProzent(99.99)); }
  @Test void genau100FuenfProzent()      { assertEquals(5,  r.rabattProzent(100.0)); }
  @Test void knappUnter500FuenfProzent() { assertEquals(5,  r.rabattProzent(499.99)); }
  @Test void genau500ZehnProzent()       { assertEquals(10, r.rabattProzent(500.0)); }
  @Test void grosserWertZehnProzent()    { assertEquals(10, r.rabattProzent(10000.0)); }
}</code></pre>`,
    explanation: "Grenzwertanalyse findet typische Off-by-one-Fehler (<code>&gt;</code> statt <code>&gt;=</code>). Jeder Test prüft genau einen Aspekt und hat einen sprechenden Namen (Arrange – Act – Assert). Tests sollen unabhängig voneinander und wiederholbar sein.",
    keywords: ["äquivalenzklasse|aequivalenzklasse|klasse", "grenzwert|grenze", "@test|test", "assertequals", "assertthrows", "99.99|99,99", "100", "500", "illegalargumentexception", "-0.01|-1|negativ"],
    tags: ["unittest", "junit"]
  },
  {
    id: "ga2-exceptions-formate-011", part: "GA2", topic: "ga2-exceptions-formate", type: "text", difficulty: 2, points: 6,
    question: "Vergleichen Sie die Datenformate <b>XML</b> und <b>JSON</b> anhand von drei Kriterien. Erläutern Sie außerdem den Unterschied zwischen einem <b>wohlgeformten</b> und einem <b>gültigen</b> XML-Dokument und die Aufgabe einer DTD bzw. eines XML-Schemas.",
    solution: `<table><tr><th>Kriterium</th><th>XML</th><th>JSON</th></tr>
<tr><td>Syntax/Größe</td><td>Start- und End-Tags, Attribute → umfangreicher (Overhead)</td><td>kompakt: Objekte {}, Arrays [], Schlüssel-Wert-Paare</td></tr>
<tr><td>Datentypen</td><td>alles Text, Typen erst über Schema</td><td>native Typen: String, Zahl, Boolean, null, Array, Objekt</td></tr>
<tr><td>Validierung</td><td>sehr ausgereift (DTD, XSD), Namensräume, XSLT, XPath</td><td>JSON Schema (weniger verbreitet)</td></tr>
<tr><td>Einsatz</td><td>Konfiguration, Dokumente, SOAP, Behördenformate (XRechnung)</td><td>REST-APIs, Web/JavaScript, NoSQL</td></tr></table>
<b>Wohlgeformt:</b> Das Dokument hält die XML-Syntaxregeln ein: genau ein Wurzelelement, jedes Element korrekt geschlossen und korrekt verschachtelt, Attributwerte in Anführungszeichen, Groß-/Kleinschreibung der Tags übereinstimmend.<br>
<b>Gültig (valide):</b> Das Dokument ist wohlgeformt <b>und</b> entspricht zusätzlich einer Strukturdefinition (DTD oder XML-Schema).<br>
<b>DTD/XML-Schema</b> legen fest, welche Elemente und Attribute in welcher Reihenfolge und Anzahl vorkommen dürfen; ein XML-Schema (XSD) ist selbst in XML geschrieben und ermöglicht zusätzlich Datentypen (xs:int, xs:date), Wertebereiche und Muster.`,
    keywords: ["tag|element", "kompakt|overhead|umfangreich", "datentyp", "wurzelelement|root", "verschachtel|geschlossen", "wohlgeformt", "gültig|gueltig|valide", "dtd", "schema|xsd"],
    tags: ["xml", "json"]
  },
  {
    id: "ga2-exceptions-formate-012", part: "GA2", topic: "ga2-exceptions-formate", type: "text", difficulty: 2, points: 5,
    context: `Ein Partnerunternehmen liefert folgendes XML-Dokument, das der Parser ablehnt:
<pre><code>&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;bestellung nr=4711&gt;
  &lt;kunde&gt;Müller GmbH&lt;/Kunde&gt;
  &lt;position&gt;&lt;artikel&gt;Maus&lt;/position&gt;&lt;/artikel&gt;
  &lt;menge&gt;3&lt;/menge&gt;
&lt;/bestellung&gt;
&lt;bestellung nr="4712"&gt;&lt;/bestellung&gt;</code></pre>`,
    question: "Nennen Sie alle Verstöße gegen die Wohlgeformtheit und geben Sie eine korrigierte Fassung an.",
    solution: `<ol><li><code>nr=4711</code>: Attributwerte müssen in Anführungszeichen stehen → <code>nr="4711"</code>.</li>
<li><code>&lt;kunde&gt;…&lt;/Kunde&gt;</code>: XML ist case-sensitiv, Start- und End-Tag stimmen nicht überein.</li>
<li><code>&lt;position&gt;&lt;artikel&gt;…&lt;/position&gt;&lt;/artikel&gt;</code>: falsche Verschachtelung – das zuletzt geöffnete Element muss zuerst geschlossen werden.</li>
<li>Zwei Wurzelelemente (zwei <code>bestellung</code>-Elemente auf oberster Ebene) – erlaubt ist genau eines.</li></ol>
Korrektur:<pre><code>&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;bestellungen&gt;
  &lt;bestellung nr="4711"&gt;
    &lt;kunde&gt;Müller GmbH&lt;/kunde&gt;
    &lt;position&gt;
      &lt;artikel&gt;Maus&lt;/artikel&gt;
      &lt;menge&gt;3&lt;/menge&gt;
    &lt;/position&gt;
  &lt;/bestellung&gt;
  &lt;bestellung nr="4712"/&gt;
&lt;/bestellungen&gt;</code></pre>`,
    explanation: "Die Menge außerhalb der Position ist kein Wohlgeformtheitsfehler, aber fachlich unsinnig – das würde erst ein Schema (Gültigkeit) erkennen.",
    keywords: ["anführungszeichen|anfuehrungszeichen|quotes|\"4711\"", "groß|gross|case|kunde", "verschachtel|reihenfolge|schachtel", "wurzel|root", "bestellungen", "</artikel>", "</kunde>"],
    tags: ["xml", "fehlersuche"]
  },
  {
    id: "ga2-exceptions-formate-013", part: "GA2", topic: "ga2-exceptions-formate", type: "text", difficulty: 2, points: 5,
    context: "Im Ticketsystem eines IT-Dienstleisters haben Ticketnummern das Format <code>TKT-2026-000123</code>: das Präfix „TKT-“, eine vierstellige Jahreszahl, ein Bindestrich und eine sechsstellige laufende Nummer. Außerdem soll eine einfache Prüfung von E-Mail-Adressen erfolgen.",
    question: "a) Erstellen Sie einen regulären Ausdruck, der genau gültige Ticketnummern akzeptiert, und erläutern Sie seine Bestandteile. (3 P)<br>b) Erstellen Sie einen einfachen regulären Ausdruck für E-Mail-Adressen (Lokalteil, @, Domain mit mindestens zweistelliger Top-Level-Domain). (2 P)",
    solution: `a) <code>^TKT-[0-9]{4}-[0-9]{6}$</code><ul>
<li><code>^</code> / <code>$</code>: Anfang bzw. Ende der Eingabe – nichts davor oder dahinter erlaubt</li>
<li><code>TKT-</code>: feste Zeichenfolge (Literal)</li>
<li><code>[0-9]{4}</code> (oder <code>\\d{4}</code>): genau vier Ziffern</li>
<li><code>-</code>: Bindestrich</li>
<li><code>[0-9]{6}</code>: genau sechs Ziffern</li></ul>
b) <code>^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$</code><br>
Lokalteil: ein oder mehrere erlaubte Zeichen (<code>+</code>), dann <code>@</code>, Domain, ein maskierter Punkt <code>\\.</code> und mindestens zwei Buchstaben (<code>{2,}</code>) als TLD.`,
    explanation: "Ohne <code>^…$</code> würde auch „XTKT-2026-0001234“ einen Teiltreffer liefern. Ein vollständig RFC-konformer E-Mail-Regex ist sehr komplex – in der Praxis reicht eine einfache Prüfung plus Bestätigungsmail.",
    keywords: ["^", "$", "tkt-", "[0-9]{4}|\\d{4}", "[0-9]{6}|\\d{6}", "@", "\\.", "{2,}", "+"],
    tags: ["regex"]
  },
  {
    id: "ga2-exceptions-formate-014", part: "GA2", topic: "ga2-exceptions-formate", type: "order", difficulty: 2, points: 4,
    question: "Bringen Sie die Abläufe beim Auftreten einer Exception innerhalb eines try-Blocks (mit passendem catch- und finally-Block) in die richtige Reihenfolge.",
    items: [
      "Im try-Block tritt ein Fehler auf und ein Exception-Objekt wird erzeugt (geworfen).",
      "Die restlichen Anweisungen des try-Blocks werden übersprungen.",
      "Die catch-Blöcke werden von oben nach unten auf einen passenden Exception-Typ geprüft.",
      "Der erste passende catch-Block wird ausgeführt.",
      "Der finally-Block wird ausgeführt.",
      "Das Programm wird mit der ersten Anweisung nach der try-catch-finally-Anweisung fortgesetzt."
    ],
    solution: "Werfen → Rest des try überspringen → passenden catch suchen (Reihenfolge der catch-Blöcke, daher spezielle vor allgemeinen Exceptions) → catch ausführen → finally ausführen → Programm danach fortsetzen.",
    explanation: "Gibt es keinen passenden catch-Block, wird nach dem finally-Block die Exception an die aufrufende Methode weitergereicht (Stack Unwinding); fängt sie niemand, bricht das Programm mit Stacktrace ab.",
    tags: ["exceptions", "ablauf"]
  }
);
