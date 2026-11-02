/* AP2-Lerntool – Paket A: Diagramm-Aufgaben (UML-Klassendiagramm, ERM, Aktivitäts- und Use-Case-Diagramm).
 * Fragetyp "diagram", Bewertung automatisch nach Raster aus diagram.solution (js/formats.js).
 * Keine eigenen Topics – nutzt ga1-uml, ga1-datenmodell, ga2-oop. */
window.AP2 = window.AP2 || { topics: [], questions: [], exams: [], generators: [] };
(function () {
  var qs = [];

  /* ---------- kleine Helfer für Knoten und Kanten ---------- */
  function N(id, type, name, x, y, more) {
    var n = { id: id, type: type, x: x, y: y };
    if (name) n.name = name;
    if (more) for (var k in more) n[k] = more[k];
    return n;
  }
  function cls(id, name, x, y, attrs, more) { var o = more || {}; if (attrs) o.attrs = attrs; return N(id, "class", name, x, y, o); }
  function ent(id, name, x, y, attrs, more) { var o = more || {}; o.attrs = attrs; return N(id, "entity", name, x, y, o); }
  function E(id, from, to, type, m1, m2, label) {
    var e = { id: id, from: from, to: to, type: type };
    if (m1) e.m1 = m1;
    if (m2) e.m2 = m2;
    if (label) e.label = label;
    return e;
  }
  function q(o) { o.type = "diagram"; qs.push(o); }

  /* =================================================================
   * UML-Klassendiagramme
   * ================================================================= */

  q({
    id: "fmt-diagram-001", part: "GA1", topic: "ga1-uml", difficulty: 1, step: 1, points: 5,
    context: "Für einen Online-Shop sind die Klassen <b>Kunde</b> und <b>Bestellung</b> bereits modelliert. Ein Kunde kann beliebig viele Bestellungen aufgeben (auch keine), jede Bestellung gehört zu genau einem Kunden. Zu einer Bestellung wird höchstens eine Rechnung erstellt (vor dem Versand noch keine); jede Rechnung bezieht sich auf genau eine Bestellung. Eine Rechnung hat eine Rechnungsnummer <code>rechnungsNr</code> (Ganzzahl) und einen Gesamtbetrag <code>betrag</code> (Gleitkommazahl). Alle Attribute sind privat.",
    question: "Vervollständigen Sie das UML-Klassendiagramm: Ergänzen Sie die Klasse <b>Rechnung</b> mit ihren Attributen (inkl. Sichtbarkeit und Datentyp, ohne Methoden) sowie die beiden Assoziationen mit Multiplizitäten.",
    diagram: {
      kind: "class",
      solution: {
        nodes: [
          cls("k", "Kunde", 60, 120),
          cls("b", "Bestellung", 360, 120),
          cls("r", "Rechnung", 660, 120, ["- rechnungsNr: int", "- betrag: double"]),
        ],
        edges: [
          E("e1", "k", "b", "assoc", "1", "0..*"),
          E("e2", "b", "r", "assoc", "1", "0..1"),
        ],
      },
      start: {
        nodes: [
          cls("k", "Kunde", 60, 120, ["- kundenNr: int", "- name: String"]),
          cls("b", "Bestellung", 360, 120, ["- bestellNr: int", "- datum: Date"]),
        ],
        edges: [],
      },
    },
    solution: `<ul>
<li><b>Rechnung</b> mit <code>- rechnungsNr: int</code> und <code>- betrag: double</code> (privat = <code>-</code>).</li>
<li><b>Kunde 1 —— 0..* Bestellung</b>: Ein Kunde hat 0 bis beliebig viele Bestellungen → <code>0..*</code> steht bei Bestellung; jede Bestellung hat genau einen Kunden → <code>1</code> steht bei Kunde.</li>
<li><b>Bestellung 1 —— 0..1 Rechnung</b>: höchstens eine Rechnung pro Bestellung (vor dem Versand keine) → <code>0..1</code> bei Rechnung; jede Rechnung gehört zu genau einer Bestellung → <code>1</code> bei Bestellung.</li>
</ul>`,
    explanation: "Häufigster Fehler: Multiplizitäten auf der falschen Seite. Die Zahl steht immer am <i>gegenüberliegenden</i> Ende: „Ein Kunde hat 0..* Bestellungen“ → <code>0..*</code> an der Klasse Bestellung. <code>0..1</code> (höchstens eins) ist nicht dasselbe wie <code>1</code> (genau eins) – hier gibt es Bestellungen noch ohne Rechnung.",
  });

  q({
    id: "fmt-diagram-002", part: "GA2", topic: "ga2-oop", difficulty: 1, step: 1, points: 5,
    context: "In einer Fuhrparkverwaltung ist die abstrakte Klasse <b>Fahrzeug</b> mit den geschützten Attributen <code>kennzeichen</code> und <code>baujahr</code> bereits vorhanden. Es sollen zwei konkrete Fahrzeugarten modelliert werden: Ein <b>PKW</b> ist ein Fahrzeug und hat zusätzlich das private Attribut <code>anzahlTueren</code> (Ganzzahl). Ein <b>LKW</b> ist ebenfalls ein Fahrzeug und hat zusätzlich das private Attribut <code>nutzlast</code> (Gleitkommazahl, in Tonnen).",
    question: "Vervollständigen Sie das UML-Klassendiagramm um die Klassen <b>PKW</b> und <b>LKW</b> mit ihren Attributen (inkl. Sichtbarkeit und Datentyp) sowie die passenden Beziehungen zur Klasse Fahrzeug.",
    diagram: {
      kind: "class",
      solution: {
        nodes: [
          cls("f", "Fahrzeug", 355, 60, null, { stereo: "abstract" }),
          cls("p", "PKW", 150, 330, ["- anzahlTueren: int"], { alt: ["Personenkraftwagen", "Auto"] }),
          cls("l", "LKW", 560, 330, ["- nutzlast: double"], { alt: ["Lastkraftwagen", "Lastwagen"] }),
        ],
        edges: [
          E("e1", "p", "f", "inherit"),
          E("e2", "l", "f", "inherit"),
        ],
      },
      start: {
        nodes: [cls("f", "Fahrzeug", 355, 60, ["# kennzeichen: String", "# baujahr: int"], { stereo: "abstract" })],
        edges: [],
      },
    },
    solution: `<ul>
<li><b>PKW</b> mit <code>- anzahlTueren: int</code>, <b>LKW</b> mit <code>- nutzlast: double</code>.</li>
<li>Je eine <b>Vererbung (Generalisierung)</b> von PKW bzw. LKW zu Fahrzeug: durchgezogene Linie mit hohlem Dreieck an der Oberklasse Fahrzeug („PKW <i>ist ein</i> Fahrzeug“).</li>
<li>Die geerbten Attribute <code>kennzeichen</code> und <code>baujahr</code> werden in den Unterklassen <b>nicht</b> wiederholt.</li>
</ul>`,
    explanation: "Typische Fehler: Pfeilspitze an der Unterklasse statt an der Oberklasse; Assoziation statt Vererbung; geerbte Attribute in den Unterklassen erneut eintragen. Fahrzeug ist abstrakt (kursiv bzw. {abstract}), weil es kein „allgemeines“ Fahrzeug-Objekt geben soll.",
  });

  q({
    id: "fmt-diagram-003", part: "GA1", topic: "ga1-uml", difficulty: 2, step: 1, points: 10,
    context: "Ein Großhändler lässt ein Fakturierungssystem entwickeln. Ein <b>Kunde</b> (kundenNr: Ganzzahl, name: Text, email: Text) kann beliebig viele Rechnungen erhalten; jede <b>Rechnung</b> (rechnungsNr: Ganzzahl, datum: Datum) ist genau einem Kunden zugeordnet. Eine Rechnung besteht aus mindestens einer <b>Rechnungsposition</b> (positionsNr: Ganzzahl, menge: Ganzzahl); Positionen existieren nur als Teil ihrer Rechnung und werden mit ihr gelöscht. Jede Position bezieht sich auf genau einen <b>Artikel</b> (artikelNr: Ganzzahl, bezeichnung: Text, preis: Gleitkommazahl), ein Artikel kann in beliebig vielen Positionen vorkommen. Alle Attribute sind privat.",
    question: "Erstellen Sie ein UML-Klassendiagramm mit allen Klassen, ihren Attributen (inkl. Sichtbarkeit und Datentyp, ohne Methoden) und den Beziehungen inkl. Multiplizitäten. Wählen Sie für jede Beziehung den fachlich passenden Beziehungstyp.",
    diagram: {
      kind: "class",
      solution: {
        nodes: [
          cls("k", "Kunde", 40, 60, ["- kundenNr: int", "- name: String", "- email: String"], { alt: ["Kundin"] }),
          cls("r", "Rechnung", 360, 60, ["- rechnungsNr: int", "- datum: Date"]),
          cls("p", "Rechnungsposition", 360, 340, ["- positionsNr: int", "- menge: int"], { alt: ["Position", "Rechnungsposten"] }),
          cls("a", "Artikel", 680, 340, ["- artikelNr: int", "- bezeichnung: String", "- preis: double"], { alt: ["Produkt"] }),
        ],
        edges: [
          E("e1", "k", "r", "assoc", "1", "0..*"),
          E("e2", "r", "p", "comp", "1", "1..*"),
          E("e3", "p", "a", "assoc", "0..*", "1"),
        ],
      },
    },
    solution: `<ul>
<li>Klassen: <b>Kunde</b> (<code>- kundenNr: int, - name: String, - email: String</code>), <b>Rechnung</b> (<code>- rechnungsNr: int, - datum: Date</code>), <b>Rechnungsposition</b> (<code>- positionsNr: int, - menge: int</code>), <b>Artikel</b> (<code>- artikelNr: int, - bezeichnung: String, - preis: double</code>).</li>
<li><b>Kunde 1 —— 0..* Rechnung</b> (Assoziation): ein Kunde beliebig viele Rechnungen, jede Rechnung genau ein Kunde.</li>
<li><b>Rechnung 1 ◆—— 1..* Rechnungsposition</b> (Komposition, gefüllte Raute an Rechnung): Positionen sind existenzabhängig, mindestens eine Position je Rechnung. Am Ganzen steht bei Komposition immer <code>1</code>.</li>
<li><b>Rechnungsposition 0..* —— 1 Artikel</b> (Assoziation): jede Position genau ein Artikel, ein Artikel in beliebig vielen Positionen.</li>
</ul>`,
    explanation: "Aggregation vs. Komposition: Rechnungspositionen haben ohne ihre Rechnung keinen Sinn und werden mitgelöscht → Komposition (◆). Artikel existieren unabhängig von Rechnungen → nur Assoziation, keine Raute. Die Raute gehört immer an das Ganze (Rechnung), nicht an das Teil.",
  });

  q({
    id: "fmt-diagram-004", part: "GA1", topic: "ga1-uml", difficulty: 2, step: 2, points: 9,
    context: "Ein Sportverband modelliert seine Vereinsverwaltung. Ein <b>Verein</b> (name: Text, gruendungsjahr: Ganzzahl) hat mindestens eine <b>Mannschaft</b> (bezeichnung: Text, liga: Text); eine Mannschaft gehört zu genau einem Verein und wird mit ihm aufgelöst. Eine Mannschaft besteht aus mindestens 11 <b>Spielern</b> (name: Text, rueckennummer: Ganzzahl). Spieler werden unabhängig von Mannschaften im Spielerpass-System geführt; ein Spieler spielt in höchstens einer Mannschaft. Jede Mannschaft wird von genau einem <b>Trainer</b> (name: Text, lizenz: Text) betreut, ein Trainer betreut mindestens eine Mannschaft. Alle Attribute sind privat.",
    question: "Erstellen Sie ein UML-Klassendiagramm mit allen Klassen, Attributen (inkl. Sichtbarkeit und Datentyp, ohne Methoden) und Beziehungen mit Multiplizitäten. Unterscheiden Sie dabei Assoziation, Aggregation und Komposition.",
    diagram: {
      kind: "class",
      solution: {
        nodes: [
          cls("v", "Verein", 40, 60, ["- name: String", "- gruendungsjahr: int"]),
          cls("m", "Mannschaft", 360, 60, ["- bezeichnung: String", "- liga: String"], { alt: ["Team"] }),
          cls("s", "Spieler", 680, 60, ["- name: String", "- rueckennummer: int"], { alt: ["Spielerin"] }),
          cls("t", "Trainer", 360, 360, ["- name: String", "- lizenz: String"], { alt: ["Trainerin"] }),
        ],
        edges: [
          E("e1", "v", "m", "comp", "1", "1..*"),
          E("e2", "m", "s", "aggr", "0..1", "11..*|11..n"),
          E("e3", "t", "m", "assoc", "1", "1..*"),
        ],
      },
    },
    solution: `<ul>
<li>Klassen: <b>Verein</b> (<code>- name: String, - gruendungsjahr: int</code>), <b>Mannschaft</b> (<code>- bezeichnung: String, - liga: String</code>), <b>Spieler</b> (<code>- name: String, - rueckennummer: int</code>), <b>Trainer</b> (<code>- name: String, - lizenz: String</code>).</li>
<li><b>Verein 1 ◆—— 1..* Mannschaft</b>: Komposition, da die Mannschaft mit dem Verein aufgelöst wird (existenzabhängig).</li>
<li><b>Mannschaft 0..1 ◇—— 11..* Spieler</b>: Aggregation, da Spieler unabhängig existieren; ein Spieler in höchstens einer Mannschaft (<code>0..1</code> bei Mannschaft), mindestens 11 Spieler (<code>11..*</code> bei Spieler).</li>
<li><b>Trainer 1 —— 1..* Mannschaft</b>: einfache Assoziation (keine Teil-Ganzes-Beziehung).</li>
</ul>`,
    explanation: "Prüffrage für die Raute: „Wird das Teil mit dem Ganzen gelöscht?“ – ja → Komposition (◆), nein → Aggregation (◇). Trainer und Mannschaft stehen nicht im Teil-Ganzes-Verhältnis, daher keine Raute. Multiplizitäten wie <code>11..*</code> sind zulässig und wurden im Text ausdrücklich verlangt.",
  });

  q({
    id: "fmt-diagram-005", part: "GA2", topic: "ga2-oop", difficulty: 2, step: 1, points: 10,
    context: "Eine Bank modelliert ihre Konten. Die abstrakte Klasse <b>Konto</b> besitzt die geschützten Attribute <code>kontoNr</code> (Text) und <code>saldo</code> (Gleitkommazahl) sowie die öffentlichen Methoden <code>einzahlen(betrag: double): void</code> und die abstrakte Methode <code>auszahlen(betrag: double): boolean</code>. <b>Girokonto</b> ist ein Konto mit dem privaten Attribut <code>dispo</code> (Gleitkommazahl) und überschreibt <code>auszahlen</code>. <b>Sparkonto</b> ist ebenfalls ein Konto mit dem privaten Attribut <code>zinssatz</code> (Gleitkommazahl), überschreibt <code>auszahlen</code> und bietet zusätzlich die öffentliche Methode <code>zinsenGutschreiben(): void</code>. Ein <b>Kunde</b> (privat: <code>kundenNr</code> Ganzzahl, <code>name</code> Text) besitzt mindestens ein Konto, jedes Konto gehört genau einem Kunden.",
    question: "Erstellen Sie das UML-Klassendiagramm mit allen Klassen, Attributen und den genannten Methoden (jeweils mit Sichtbarkeit und Datentypen) sowie allen Beziehungen inkl. Multiplizitäten.",
    diagram: {
      kind: "class",
      solution: {
        nodes: [
          cls("ku", "Kunde", 40, 60, ["- kundenNr: int", "- name: String"]),
          cls("k", "Konto", 360, 40, ["# kontoNr: String", "# saldo: double"], { stereo: "abstract", methods: ["+ einzahlen(betrag: double): void", "+ auszahlen(betrag: double): boolean"] }),
          cls("g", "Girokonto", 200, 360, ["- dispo: double"], { methods: ["+ auszahlen(betrag: double): boolean"] }),
          cls("s", "Sparkonto", 560, 360, ["- zinssatz: double"], { methods: ["+ auszahlen(betrag: double): boolean", "+ zinsenGutschreiben(): void"] }),
        ],
        edges: [
          E("e1", "ku", "k", "assoc", "1", "1..*"),
          E("e2", "g", "k", "inherit"),
          E("e3", "s", "k", "inherit"),
        ],
      },
    },
    solution: `<ul>
<li><b>Konto</b> {abstract}: <code># kontoNr: String</code>, <code># saldo: double</code>, <code>+ einzahlen(betrag: double): void</code>, <code>+ auszahlen(betrag: double): boolean</code> (abstrakt, kursiv).</li>
<li><b>Girokonto</b>: <code>- dispo: double</code>, <code>+ auszahlen(betrag: double): boolean</code> (überschrieben).</li>
<li><b>Sparkonto</b>: <code>- zinssatz: double</code>, <code>+ auszahlen(betrag: double): boolean</code>, <code>+ zinsenGutschreiben(): void</code>.</li>
<li><b>Kunde</b>: <code>- kundenNr: int</code>, <code>- name: String</code>.</li>
<li>Vererbung Girokonto → Konto und Sparkonto → Konto (hohles Dreieck an Konto).</li>
<li><b>Kunde 1 —— 1..* Konto</b>: mindestens ein Konto je Kunde (<code>1..*</code> bei Konto), genau ein Kunde je Konto (<code>1</code> bei Kunde). Die Assoziation geht zur Oberklasse und gilt damit für alle Kontoarten.</li>
</ul>`,
    explanation: "<code>#</code> (protected) ist nötig, damit die Unterklassen direkt auf <code>saldo</code> zugreifen können. Überschriebene Methoden werden in der Unterklasse erneut aufgeführt, geerbte Attribute nicht. Typischer Fehler: Kunde einzeln mit Girokonto und Sparkonto verbinden – eine Assoziation zur abstrakten Oberklasse reicht.",
  });

  q({
    id: "fmt-diagram-006", part: "GA2", topic: "ga2-oop", difficulty: 2, step: 2, points: 8,
    context: "Ein Online-Shop soll verschiedene Zahlungsarten unterstützen. Dazu wird die Schnittstelle (Interface) <b>Zahlungsart</b> mit der öffentlichen Methode <code>bezahlen(betrag: double): boolean</code> definiert. Die Klassen <b>Kreditkarte</b> (privat: <code>kartenNr</code> Text, <code>gueltigBis</code> Datum) und <b>Lastschrift</b> (privat: <code>iban</code> Text) implementieren diese Schnittstelle. Eine <b>Bestellung</b> (privat: <code>bestellNr</code> Ganzzahl, <code>betrag</code> Gleitkommazahl) wird mit genau einer Zahlungsart bezahlt; eine Zahlungsart kann für beliebig viele Bestellungen verwendet werden.",
    question: "Erstellen Sie das UML-Klassendiagramm mit Attributen und den genannten Methoden (inkl. Sichtbarkeit und Datentypen) sowie allen Beziehungen. Kennzeichnen Sie die Schnittstelle korrekt.",
    diagram: {
      kind: "class",
      solution: {
        nodes: [
          cls("z", "Zahlungsart", 360, 40, null, { stereo: "interface", methods: ["+ bezahlen(betrag: double): boolean"] }),
          cls("k", "Kreditkarte", 160, 340, ["- kartenNr: String", "- gueltigBis: Date"], { methods: ["+ bezahlen(betrag: double): boolean"] }),
          cls("l", "Lastschrift", 560, 340, ["- iban: String"], { methods: ["+ bezahlen(betrag: double): boolean"], alt: ["SEPA-Lastschrift"] }),
          cls("b", "Bestellung", 680, 40, ["- bestellNr: int", "- betrag: double"]),
        ],
        edges: [
          E("e1", "k", "z", "impl"),
          E("e2", "l", "z", "impl"),
          E("e3", "b", "z", "assoc", "0..*", "1"),
        ],
      },
    },
    solution: `<ul>
<li><b>«interface» Zahlungsart</b>: <code>+ bezahlen(betrag: double): boolean</code> (keine Attribute).</li>
<li><b>Kreditkarte</b>: <code>- kartenNr: String</code>, <code>- gueltigBis: Date</code>, <code>+ bezahlen(betrag: double): boolean</code>.</li>
<li><b>Lastschrift</b>: <code>- iban: String</code>, <code>+ bezahlen(betrag: double): boolean</code>.</li>
<li><b>Realisierung</b> (gestrichelte Linie, hohles Dreieck an Zahlungsart) von Kreditkarte und Lastschrift.</li>
<li><b>Bestellung 0..* —— 1 Zahlungsart</b>: genau eine Zahlungsart je Bestellung (<code>1</code> bei Zahlungsart), beliebig viele Bestellungen je Zahlungsart (<code>0..*</code> bei Bestellung).</li>
</ul>`,
    explanation: "Realisierung ≠ Vererbung: Bei einem Interface wird die Linie gestrichelt gezeichnet (Vererbung gibt hier nur halbe Punkte). Die Bestellung kennt nur die Schnittstelle, nicht die konkreten Klassen – so lassen sich neue Zahlungsarten ergänzen, ohne Bestellung zu ändern (Polymorphie).",
  });

  q({
    id: "fmt-diagram-007", part: "GA1", topic: "ga1-uml", difficulty: 3, step: 1, points: 14,
    context: "Für eine Hotelkette wird ein Buchungssystem entwickelt. Ein <b>Hotel</b> (name: Text, adresse: Text) besteht aus mindestens einem <b>Zimmer</b> (zimmerNr: Ganzzahl, preisProNacht: Gleitkommazahl); ein Zimmer gehört zu genau einem Hotel und existiert nicht ohne es. Eine <b>Suite</b> ist ein besonderes Zimmer mit dem zusätzlichen Attribut anzahlRaeume (Ganzzahl). Ein <b>Gast</b> (gastNr: Ganzzahl, name: Text) kann beliebig viele <b>Buchungen</b> (anreise: Datum, abreise: Datum) tätigen; jede Buchung gehört zu genau einem Gast. Eine Buchung umfasst mindestens ein Zimmer, ein Zimmer kann in beliebig vielen Buchungen vorkommen. Zu einer Buchung gibt es höchstens eine <b>Rechnung</b> (rechnungsNr: Ganzzahl, betrag: Gleitkommazahl), die nur zusammen mit ihrer Buchung existiert. Alle Attribute sind privat.",
    question: "Erstellen Sie ein vollständiges UML-Klassendiagramm mit allen Klassen, Attributen (inkl. Sichtbarkeit und Datentyp, ohne Methoden) und allen Beziehungen. Verwenden Sie die fachlich passenden Beziehungstypen und geben Sie Multiplizitäten an.",
    diagram: {
      kind: "class",
      solution: {
        nodes: [
          cls("h", "Hotel", 40, 40, ["- name: String", "- adresse: String"]),
          cls("z", "Zimmer", 40, 280, ["- zimmerNr: int", "- preisProNacht: double"], { alt: ["Hotelzimmer"] }),
          cls("s", "Suite", 40, 480, ["- anzahlRaeume: int"]),
          cls("g", "Gast", 680, 40, ["- gastNr: int", "- name: String"], { alt: ["Kunde", "Hotelgast"] }),
          cls("b", "Buchung", 360, 280, ["- anreise: Date", "- abreise: Date"], { alt: ["Reservierung"] }),
          cls("r", "Rechnung", 680, 280, ["- rechnungsNr: int", "- betrag: double"]),
        ],
        edges: [
          E("e1", "h", "z", "comp", "1", "1..*"),
          E("e2", "s", "z", "inherit"),
          E("e3", "g", "b", "assoc", "1", "0..*"),
          E("e4", "b", "z", "assoc", "0..*", "1..*"),
          E("e5", "b", "r", "comp", "1", "0..1"),
        ],
      },
    },
    solution: `<ul>
<li>Klassen mit privaten Attributen: <b>Hotel</b> (<code>name: String, adresse: String</code>), <b>Zimmer</b> (<code>zimmerNr: int, preisProNacht: double</code>), <b>Suite</b> (<code>anzahlRaeume: int</code>), <b>Gast</b> (<code>gastNr: int, name: String</code>), <b>Buchung</b> (<code>anreise: Date, abreise: Date</code>), <b>Rechnung</b> (<code>rechnungsNr: int, betrag: double</code>).</li>
<li><b>Hotel 1 ◆—— 1..* Zimmer</b>: Komposition (Zimmer existiert nicht ohne Hotel).</li>
<li><b>Suite ——▷ Zimmer</b>: Vererbung („Suite ist ein Zimmer“); geerbte Attribute nicht wiederholen.</li>
<li><b>Gast 1 —— 0..* Buchung</b>: Assoziation.</li>
<li><b>Buchung 0..* —— 1..* Zimmer</b>: Assoziation (mind. ein Zimmer je Buchung, beliebig viele Buchungen je Zimmer).</li>
<li><b>Buchung 1 ◆—— 0..1 Rechnung</b>: Komposition (Rechnung existiert nur mit ihrer Buchung), höchstens eine Rechnung.</li>
</ul>`,
    explanation: "Gemischte Beziehungstypen sind typisch für IHK-Spitzenaufgaben. Häufige Fehler: Buchung–Zimmer als Komposition (Zimmer existieren unabhängig von Buchungen!), Vererbungspfeil zeigt zur Suite statt zum Zimmer, <code>1</code> statt <code>0..1</code> bei der Rechnung (bei neuen Buchungen gibt es noch keine).",
  });

  q({
    id: "fmt-diagram-008", part: "GA2", topic: "ga2-oop", difficulty: 3, step: 1, points: 15,
    context: "Eine Stadtbibliothek modelliert ihre Ausleihe. Die abstrakte Klasse <b>Medium</b> hat die geschützten Attribute <code>inventarNr</code> (Ganzzahl) und <code>titel</code> (Text) sowie die öffentliche abstrakte Methode <code>getLeihfrist(): int</code>. <b>Buch</b> (privat: <code>isbn</code> Text) und <b>DVD</b> (privat: <code>laufzeit</code> Ganzzahl) sind Medien und überschreiben <code>getLeihfrist()</code>. Eine <b>Bibliothek</b> (privat: <code>name</code> Text) führt beliebig viele Medien in ihrem Bestand; ein Medium gehört höchstens zu einer Bibliothek und existiert auch ohne sie (Fernleihe). Ein <b>Mitglied</b> (privat: <code>mitgliedsNr</code> Ganzzahl, <code>name</code> Text) hat beliebig viele <b>Ausleihen</b> (privat: <code>ausleihdatum</code> Datum, <code>rueckgabeBis</code> Datum); jede Ausleihe gehört zu genau einem Mitglied und betrifft genau ein Medium, ein Medium kann beliebig oft ausgeliehen werden. Ausleihen sollen verlängert werden können: Dazu implementiert Ausleihe die Schnittstelle <b>Verlaengerbar</b> mit der öffentlichen Methode <code>verlaengern(tage: int): boolean</code>.",
    question: "Erstellen Sie das vollständige UML-Klassendiagramm mit allen Klassen und Schnittstellen, Attributen und den im Text genannten Methoden (jeweils mit Sichtbarkeit und Datentypen) sowie allen Beziehungen mit Multiplizitäten.",
    diagram: {
      kind: "class",
      solution: {
        nodes: [
          cls("bib", "Bibliothek", 40, 30, ["- name: String"]),
          cls("v", "Verlaengerbar", 400, 30, null, { stereo: "interface", methods: ["+ verlaengern(tage: int): boolean"], alt: ["Verlängerbar"] }),
          cls("m", "Medium", 40, 210, ["# inventarNr: int", "# titel: String"], { stereo: "abstract", methods: ["+ getLeihfrist(): int"] }),
          cls("a", "Ausleihe", 400, 210, ["- ausleihdatum: Date", "- rueckgabeBis: Date"], { methods: ["+ verlaengern(tage: int): boolean"] }),
          cls("mi", "Mitglied", 690, 210, ["- mitgliedsNr: int", "- name: String"], { alt: ["Leser", "Benutzer"] }),
          cls("b", "Buch", 40, 440, ["- isbn: String"], { methods: ["+ getLeihfrist(): int"] }),
          cls("d", "DVD", 300, 440, ["- laufzeit: int"], { methods: ["+ getLeihfrist(): int"] }),
        ],
        edges: [
          E("e1", "bib", "m", "aggr", "0..1", "0..*"),
          E("e2", "b", "m", "inherit"),
          E("e3", "d", "m", "inherit"),
          E("e4", "mi", "a", "assoc", "1", "0..*"),
          E("e5", "a", "m", "assoc", "0..*", "1"),
          E("e6", "a", "v", "impl"),
        ],
      },
    },
    solution: `<ul>
<li><b>Medium</b> {abstract}: <code># inventarNr: int, # titel: String, + getLeihfrist(): int</code> (abstrakt); <b>Buch</b> (<code>- isbn: String, + getLeihfrist(): int</code>) und <b>DVD</b> (<code>- laufzeit: int, + getLeihfrist(): int</code>) erben von Medium.</li>
<li><b>«interface» Verlaengerbar</b>: <code>+ verlaengern(tage: int): boolean</code>; <b>Ausleihe</b> (<code>- ausleihdatum: Date, - rueckgabeBis: Date, + verlaengern(tage: int): boolean</code>) realisiert sie (gestrichelt, hohles Dreieck).</li>
<li><b>Bibliothek 0..1 ◇—— 0..* Medium</b>: Aggregation, Medien existieren auch ohne Bibliothek.</li>
<li><b>Mitglied 1 —— 0..* Ausleihe</b> und <b>Ausleihe 0..* —— 1 Medium</b>: Assoziationen; die Ausleihe verbindet Mitglied und Medium (ein Medium kann im Lauf der Zeit beliebig oft ausgeliehen werden).</li>
</ul>`,
    explanation: "Die Klasse Ausleihe löst die n:m-Beziehung zwischen Mitglied und Medium auf und trägt die Daten der Ausleihe. Fehlerquellen: Realisierung als normale Vererbung gezeichnet, Komposition statt Aggregation bei Bibliothek–Medium (Fernleihe!), <code>getLeihfrist()</code> in Buch/DVD vergessen, obwohl es überschrieben wird.",
  });

  /* =================================================================
   * Entity-Relationship-Modelle
   * ================================================================= */

  q({
    id: "fmt-diagram-009", part: "GA1", topic: "ga1-datenmodell", difficulty: 1, step: 1, points: 5,
    context: "Ein mittelständisches Unternehmen möchte seine Personaldaten in einer Datenbank verwalten. Eine <b>Abteilung</b> wird über eine eindeutige AbteilungsNr identifiziert und hat eine Bezeichnung. Ein <b>Mitarbeiter</b> wird über seine eindeutige PersonalNr identifiziert und hat einen Namen und einen Vornamen. Jeder Mitarbeiter ist genau einer Abteilung zugeordnet; eine Abteilung beschäftigt mehrere Mitarbeiter.",
    question: "Erstellen Sie ein Entity-Relationship-Modell mit beiden Entitäten, ihren Attributen (Primärschlüssel kennzeichnen) und der Beziehung inkl. Beziehungsname und Kardinalität (Chen-Notation).",
    diagram: {
      kind: "erm",
      solution: {
        nodes: [
          ent("a", "Abteilung", 80, 180, ["#AbteilungsNr", "Bezeichnung"]),
          ent("m", "Mitarbeiter", 600, 180, ["#PersonalNr", "Name", "Vorname"], { alt: ["Angestellter", "Mitarbeiterin", "Beschäftigter"] }),
        ],
        edges: [E("e1", "a", "m", "rel", "1", "n", "beschäftigt")],
      },
    },
    solution: `<ul>
<li><b>Abteilung</b> (<u>AbteilungsNr</u>, Bezeichnung)</li>
<li><b>Mitarbeiter</b> (<u>PersonalNr</u>, Name, Vorname)</li>
<li>Beziehung <b>beschäftigt</b>: Abteilung <b>1</b> : <b>n</b> Mitarbeiter – eine Abteilung beschäftigt n Mitarbeiter, jeder Mitarbeiter gehört zu genau einer Abteilung.</li>
</ul>`,
    explanation: "Die Kardinalität steht an der Seite der Entität, von der „viele“ vorkommen: n bei Mitarbeiter. Bei der späteren Überführung ins Relationenmodell wird die AbteilungsNr als Fremdschlüssel in die Tabelle Mitarbeiter (n-Seite) übernommen. Der Fremdschlüssel gehört <b>nicht</b> ins ERM.",
  });

  q({
    id: "fmt-diagram-010", part: "GA1", topic: "ga1-datenmodell", difficulty: 1, step: 2, points: 4,
    context: "Im Datenmodell eines Unternehmens ist die Entität <b>Mitarbeiter</b> bereits vorhanden. Es sollen nun die <b>Firmenwagen</b> erfasst werden: Jeder Firmenwagen wird über sein Kennzeichen eindeutig identifiziert, außerdem werden Marke und Modell gespeichert. Jeder Firmenwagen ist genau einem Mitarbeiter fest zugeordnet. Ein Mitarbeiter nutzt höchstens einen Firmenwagen – viele Mitarbeiter haben keinen.",
    question: "Vervollständigen Sie das ERM um die Entität <b>Firmenwagen</b> mit ihren Attributen (Primärschlüssel kennzeichnen) und die Beziehung „nutzt“ inkl. Kardinalität (1, c, n/m).",
    diagram: {
      kind: "erm",
      solution: {
        nodes: [
          ent("m", "Mitarbeiter", 80, 180, []),
          ent("f", "Firmenwagen", 600, 180, ["#Kennzeichen", "Marke", "Modell"], { alt: ["Dienstwagen", "Fahrzeug"] }),
        ],
        edges: [E("e1", "m", "f", "rel", "1", "c", "nutzt")],
      },
      start: {
        nodes: [ent("m", "Mitarbeiter", 80, 180, ["#PersonalNr", "Name", "Vorname"])],
        edges: [],
      },
    },
    solution: `<ul>
<li><b>Firmenwagen</b> (<u>Kennzeichen</u>, Marke, Modell)</li>
<li>Beziehung <b>nutzt</b>: Mitarbeiter <b>1</b> : <b>c</b> Firmenwagen.
<ul><li><code>c</code> (0 oder 1) beim Firmenwagen: Ein Mitarbeiter nutzt <i>höchstens</i> einen Wagen, viele keinen.</li>
<li><code>1</code> beim Mitarbeiter: Jeder Firmenwagen ist <i>genau</i> einem Mitarbeiter zugeordnet.</li></ul></li>
</ul>`,
    explanation: "Eine reine 1:1-Beziehung wäre hier falsch, weil nicht jeder Mitarbeiter einen Wagen hat. In der Tabellenstruktur bekommt der Firmenwagen die PersonalNr als Fremdschlüssel mit UNIQUE-Constraint (die optionale Seite verweist auf die Pflichtseite).",
  });

  q({
    id: "fmt-diagram-011", part: "GA1", topic: "ga1-datenmodell", difficulty: 2, step: 1, points: 9,
    context: "Ein Webshop für Bürobedarf benötigt eine Datenbank. <b>Kunden</b> (KundenNr, Name, Email) können beliebig viele <b>Bestellungen</b> (BestellNr, Datum) aufgeben; jede Bestellung stammt von genau einem Kunden. Eine Bestellung enthält mehrere <b>Artikel</b> (ArtikelNr, Bezeichnung, Preis), ein Artikel kann in vielen Bestellungen enthalten sein; je Artikel und Bestellung wird die Menge gespeichert. Jeder Artikel gehört zu genau einer <b>Kategorie</b> (KategorieNr, Bezeichnung), eine Kategorie umfasst viele Artikel. Die jeweils zuerst genannte Nummer ist eindeutig.",
    question: "Erstellen Sie ein ERM in Chen-Notation mit allen Entitäten, Attributen (Primärschlüssel kennzeichnen), Beziehungsnamen und Kardinalitäten.",
    diagram: {
      kind: "erm",
      solution: {
        nodes: [
          ent("k", "Kunde", 40, 80, ["#KundenNr", "Name", "Email"]),
          ent("b", "Bestellung", 360, 80, ["#BestellNr", "Datum"], { alt: ["Auftrag"] }),
          ent("a", "Artikel", 680, 80, ["#ArtikelNr", "Bezeichnung", "Preis"], { alt: ["Produkt"] }),
          ent("c", "Kategorie", 680, 380, ["#KategorieNr", "Bezeichnung"], { alt: ["Warengruppe", "Artikelkategorie"] }),
        ],
        edges: [
          E("e1", "k", "b", "rel", "1", "n", "gibt auf"),
          E("e2", "b", "a", "rel", "n", "m", "enthält"),
          E("e3", "c", "a", "rel", "1", "n", "umfasst"),
        ],
      },
    },
    solution: `<ul>
<li><b>Kunde</b> (<u>KundenNr</u>, Name, Email), <b>Bestellung</b> (<u>BestellNr</u>, Datum), <b>Artikel</b> (<u>ArtikelNr</u>, Bezeichnung, Preis), <b>Kategorie</b> (<u>KategorieNr</u>, Bezeichnung)</li>
<li>Kunde <b>1 : n</b> Bestellung („gibt auf“)</li>
<li>Bestellung <b>n : m</b> Artikel („enthält“) – das Attribut <b>Menge</b> gehört an die Beziehung (Beziehungsattribut), nicht an Bestellung oder Artikel.</li>
<li>Kategorie <b>1 : n</b> Artikel („umfasst“)</li>
</ul>`,
    explanation: "Die Menge hängt von Bestellung <i>und</i> Artikel gemeinsam ab – sie ist ein Attribut der n:m-Beziehung und landet später in der Zwischentabelle Bestellposition(<u>↑BestellNr, ↑ArtikelNr</u>, Menge). Häufiger Fehler: Menge als Attribut von Artikel.",
  });

  q({
    id: "fmt-diagram-012", part: "GA1", topic: "ga1-datenmodell", difficulty: 2, step: 2, points: 9,
    context: "Eine Berufsschule verwaltet ihre Stammdaten. <b>Schüler</b> (SchuelerNr, Name, Geburtsdatum) besuchen genau eine <b>Klasse</b> (KlassenNr, Bezeichnung, Schuljahr); eine Klasse wird von vielen Schülern besucht. <b>Lehrer</b> (Kuerzel, Name) unterrichten mehrere <b>Fächer</b> (FachNr, Bezeichnung), ein Fach wird von mehreren Lehrern unterrichtet. Jede Klasse hat genau einen Klassenlehrer; ein Lehrer leitet höchstens eine Klasse (nicht jeder Lehrer ist Klassenlehrer). Die jeweils zuerst genannten Attribute sind eindeutig.",
    question: "Erstellen Sie ein ERM mit allen Entitäten, Attributen (Primärschlüssel kennzeichnen) und Beziehungen inkl. Beziehungsname und Kardinalität (1, c, n/m).",
    diagram: {
      kind: "erm",
      solution: {
        nodes: [
          ent("s", "Schüler", 40, 80, ["#SchuelerNr", "Name", "Geburtsdatum"], { alt: ["Schülerin", "Auszubildender"] }),
          ent("k", "Klasse", 360, 80, ["#KlassenNr", "Bezeichnung", "Schuljahr"], { alt: ["Schulklasse"] }),
          ent("l", "Lehrer", 360, 380, ["#Kuerzel", "Name"], { alt: ["Lehrkraft", "Lehrerin"] }),
          ent("f", "Fach", 680, 380, ["#FachNr", "Bezeichnung"], { alt: ["Unterrichtsfach", "Lernfeld"] }),
        ],
        edges: [
          E("e1", "s", "k", "rel", "n", "1", "besucht"),
          E("e2", "l", "k", "rel", "1", "c", "leitet"),
          E("e3", "l", "f", "rel", "n", "m", "unterrichtet"),
        ],
      },
    },
    solution: `<ul>
<li><b>Schüler</b> (<u>SchuelerNr</u>, Name, Geburtsdatum), <b>Klasse</b> (<u>KlassenNr</u>, Bezeichnung, Schuljahr), <b>Lehrer</b> (<u>Kuerzel</u>, Name), <b>Fach</b> (<u>FachNr</u>, Bezeichnung)</li>
<li>Schüler <b>n : 1</b> Klasse („besucht“)</li>
<li>Lehrer <b>1 : c</b> Klasse („leitet“): jede Klasse hat genau <b>1</b> Klassenlehrer (1 beim Lehrer), ein Lehrer leitet höchstens eine Klasse (<b>c</b> bei Klasse).</li>
<li>Lehrer <b>n : m</b> Fach („unterrichtet“)</li>
</ul>`,
    explanation: "Die Konditionalität <code>c</code> drückt „0 oder 1“ aus. Wer hier 1:1 zeichnet, unterstellt, dass jeder Lehrer eine Klasse leitet. Die n:m-Beziehung Lehrer–Fach wird später über eine Zwischentabelle aufgelöst.",
  });

  q({
    id: "fmt-diagram-013", part: "GA1", topic: "ga1-datenmodell", difficulty: 2, step: 3, points: 8,
    context: "Eine Autovermietung lässt eine Datenbank entwickeln. Ein <b>Kunde</b> (KundenNr, Name, FuehrerscheinNr) kann beliebig viele <b>Mietverträge</b> (VertragsNr, Beginn, Ende) abschließen; jeder Mietvertrag gehört zu genau einem Kunden. Jeder Mietvertrag betrifft genau ein <b>Fahrzeug</b> (Kennzeichen, Modell, Kilometerstand), ein Fahrzeug kann im Lauf der Zeit in vielen Mietverträgen vorkommen. Jedes Fahrzeug ist genau einer <b>Station</b> (StationsNr, Ort) zugeordnet, eine Station verfügt über viele Fahrzeuge. Die zuerst genannten Attribute sind jeweils eindeutig.",
    question: "Erstellen Sie ein ERM mit allen Entitäten, Attributen (Primärschlüssel kennzeichnen) und Beziehungen inkl. Beziehungsname und Kardinalität.",
    diagram: {
      kind: "erm",
      solution: {
        nodes: [
          ent("k", "Kunde", 40, 80, ["#KundenNr", "Name", "FuehrerscheinNr"], { alt: ["Mieter"] }),
          ent("v", "Mietvertrag", 360, 80, ["#VertragsNr", "Beginn", "Ende"], { alt: ["Vertrag", "Vermietung", "Miete"] }),
          ent("f", "Fahrzeug", 680, 80, ["#Kennzeichen", "Modell", "Kilometerstand"], { alt: ["Auto", "Mietwagen", "PKW"] }),
          ent("s", "Station", 680, 380, ["#StationsNr", "Ort"], { alt: ["Filiale", "Standort"] }),
        ],
        edges: [
          E("e1", "k", "v", "rel", "1", "n", "schließt ab"),
          E("e2", "v", "f", "rel", "n", "1", "betrifft"),
          E("e3", "s", "f", "rel", "1", "n", "verfügt über"),
        ],
      },
    },
    solution: `<ul>
<li><b>Kunde</b> (<u>KundenNr</u>, Name, FuehrerscheinNr), <b>Mietvertrag</b> (<u>VertragsNr</u>, Beginn, Ende), <b>Fahrzeug</b> (<u>Kennzeichen</u>, Modell, Kilometerstand), <b>Station</b> (<u>StationsNr</u>, Ort)</li>
<li>Kunde <b>1 : n</b> Mietvertrag („schließt ab“)</li>
<li>Mietvertrag <b>n : 1</b> Fahrzeug („betrifft“)</li>
<li>Station <b>1 : n</b> Fahrzeug („verfügt über“)</li>
</ul>`,
    explanation: "Der Mietvertrag ist eine eigene Entität mit eigenem Schlüssel und Attributen (Beginn, Ende). Er verbindet Kunde und Fahrzeug – eine direkte n:m-Beziehung Kunde–Fahrzeug wäre hier unvollständig, weil Mietbeginn und -ende nicht abgebildet würden.",
  });

  q({
    id: "fmt-diagram-014", part: "GA1", topic: "ga1-datenmodell", difficulty: 3, step: 1, points: 13,
    context: "Ein Krankenhaus modelliert seine Patientenverwaltung. Eine <b>Station</b> (StationsNr, Bezeichnung) umfasst mehrere <b>Zimmer</b> (ZimmerNr, Bettenanzahl), jedes Zimmer gehört zu genau einer Station. Ein <b>Patient</b> (PatientenNr, Name, Geburtsdatum) liegt in höchstens einem Zimmer (ambulante Patienten haben keins), in einem Zimmer liegen mehrere Patienten. Jeder <b>Arzt</b> (ArztNr, Name, Fachrichtung) arbeitet auf genau einer Station, eine Station hat mehrere Ärzte. Ärzte behandeln mehrere Patienten, ein Patient wird von mehreren Ärzten behandelt. Jeder Patient hat genau eine <b>Krankenakte</b> (AktenNr, Anlagedatum), jede Krankenakte gehört zu genau einem Patienten. Patienten erhalten mehrere <b>Medikamente</b> (PZN, Bezeichnung), ein Medikament wird vielen Patienten verabreicht. Die zuerst genannten Attribute sind jeweils eindeutig.",
    question: "Erstellen Sie ein vollständiges ERM mit allen Entitäten, Attributen (Primärschlüssel kennzeichnen) und Beziehungen inkl. Beziehungsname und Kardinalität (1, c, n/m).",
    diagram: {
      kind: "erm",
      solution: {
        nodes: [
          ent("st", "Station", 40, 40, ["#StationsNr", "Bezeichnung"]),
          ent("z", "Zimmer", 360, 40, ["#ZimmerNr", "Bettenanzahl"], { alt: ["Krankenzimmer"] }),
          ent("a", "Arzt", 40, 330, ["#ArztNr", "Name", "Fachrichtung"], { alt: ["Ärztin", "Mediziner"] }),
          ent("p", "Patient", 360, 330, ["#PatientenNr", "Name", "Geburtsdatum"], { alt: ["Patientin"] }),
          ent("k", "Krankenakte", 680, 170, ["#AktenNr", "Anlagedatum"], { alt: ["Patientenakte", "Akte"] }),
          ent("m", "Medikament", 680, 430, ["#PZN", "Bezeichnung"], { alt: ["Arzneimittel"] }),
        ],
        edges: [
          E("e1", "st", "z", "rel", "1", "n", "umfasst"),
          E("e2", "p", "z", "rel", "n", "c", "liegt in"),
          E("e3", "a", "st", "rel", "n", "1", "arbeitet auf"),
          E("e4", "a", "p", "rel", "n", "m", "behandelt"),
          E("e5", "p", "k", "rel", "1", "1", "hat"),
          E("e6", "p", "m", "rel", "n", "m", "erhält"),
        ],
      },
    },
    solution: `<ul>
<li>Entitäten: <b>Station</b> (<u>StationsNr</u>, Bezeichnung), <b>Zimmer</b> (<u>ZimmerNr</u>, Bettenanzahl), <b>Patient</b> (<u>PatientenNr</u>, Name, Geburtsdatum), <b>Arzt</b> (<u>ArztNr</u>, Name, Fachrichtung), <b>Krankenakte</b> (<u>AktenNr</u>, Anlagedatum), <b>Medikament</b> (<u>PZN</u>, Bezeichnung)</li>
<li>Station <b>1 : n</b> Zimmer („umfasst“)</li>
<li>Patient <b>n : c</b> Zimmer („liegt in“): höchstens ein Zimmer je Patient (c bei Zimmer), viele Patienten je Zimmer.</li>
<li>Arzt <b>n : 1</b> Station („arbeitet auf“)</li>
<li>Arzt <b>n : m</b> Patient („behandelt“)</li>
<li>Patient <b>1 : 1</b> Krankenakte („hat“): beide Seiten Pflicht und eindeutig.</li>
<li>Patient <b>n : m</b> Medikament („erhält“)</li>
</ul>`,
    explanation: "Alle drei Kardinalitätsarten kommen vor: 1:1 (Krankenakte), 1:n bzw. c:n (Zimmer) und n:m (Behandlung, Medikation). Fehler entstehen oft beim Zimmer: Ohne <code>c</code> müsste jeder – auch ein ambulanter – Patient ein Zimmer haben.",
  });

  q({
    id: "fmt-diagram-015", part: "GA1", topic: "ga1-datenmodell", difficulty: 3, step: 2, points: 14,
    context: "Eine Konzertagentur entwickelt ein Ticketsystem. Ein <b>Veranstaltungsort</b> (OrtNr, Name, Adresse) bietet viele <b>Veranstaltungen</b> (VeranstaltungsNr, Titel, Datum) an; jede Veranstaltung findet an genau einem Veranstaltungsort statt. An einer Veranstaltung treten mehrere <b>Künstler</b> (KuenstlerNr, Name) auf, ein Künstler tritt bei vielen Veranstaltungen auf. Ein Veranstaltungsort verfügt über viele <b>Sitzplätze</b> (PlatzNr, Reihe, Platz), jeder Sitzplatz gehört zu genau einem Ort. Für jede Veranstaltung gibt es viele <b>Tickets</b> (TicketNr, Preis); jedes Ticket gilt für genau eine Veranstaltung und genau einen Sitzplatz, für einen Sitzplatz gibt es (über verschiedene Veranstaltungen) viele Tickets. Ein <b>Kunde</b> (KundenNr, Name, Email) kauft viele Tickets; ein Ticket wird von höchstens einem Kunden gekauft (nicht verkaufte Tickets haben keinen Kunden). Die zuerst genannten Attribute sind jeweils eindeutig.",
    question: "Erstellen Sie ein vollständiges ERM mit allen Entitäten, Attributen (Primärschlüssel kennzeichnen) und Beziehungen inkl. Beziehungsname und Kardinalität (1, c, n/m).",
    diagram: {
      kind: "erm",
      solution: {
        nodes: [
          ent("ku", "Künstler", 40, 40, ["#KuenstlerNr", "Name"], { alt: ["Kuenstler", "Künstlerin", "Interpret", "Band"] }),
          ent("v", "Veranstaltung", 360, 40, ["#VeranstaltungsNr", "Titel", "Datum"], { alt: ["Konzert", "Event"] }),
          ent("o", "Veranstaltungsort", 680, 40, ["#OrtNr", "Name", "Adresse"], { alt: ["Ort", "Spielstätte", "Location", "Halle"] }),
          ent("k", "Kunde", 40, 360, ["#KundenNr", "Name", "Email"], { alt: ["Käufer"] }),
          ent("t", "Ticket", 360, 360, ["#TicketNr", "Preis"], { alt: ["Eintrittskarte", "Karte"] }),
          ent("s", "Sitzplatz", 680, 360, ["#PlatzNr", "Reihe", "Platz"], { alt: ["Sitz", "Platz"] }),
        ],
        edges: [
          E("e1", "o", "v", "rel", "1", "n", "bietet"),
          E("e2", "ku", "v", "rel", "n", "m", "tritt auf"),
          E("e3", "o", "s", "rel", "1", "n", "verfügt über"),
          E("e4", "v", "t", "rel", "1", "n", "hat"),
          E("e5", "s", "t", "rel", "1", "n", "gilt für"),
          E("e6", "k", "t", "rel", "c", "n", "kauft"),
        ],
      },
    },
    solution: `<ul>
<li>Entitäten: <b>Veranstaltungsort</b> (<u>OrtNr</u>, Name, Adresse), <b>Veranstaltung</b> (<u>VeranstaltungsNr</u>, Titel, Datum), <b>Künstler</b> (<u>KuenstlerNr</u>, Name), <b>Sitzplatz</b> (<u>PlatzNr</u>, Reihe, Platz), <b>Ticket</b> (<u>TicketNr</u>, Preis), <b>Kunde</b> (<u>KundenNr</u>, Name, Email)</li>
<li>Veranstaltungsort <b>1 : n</b> Veranstaltung („bietet“)</li>
<li>Künstler <b>n : m</b> Veranstaltung („tritt auf“)</li>
<li>Veranstaltungsort <b>1 : n</b> Sitzplatz („verfügt über“)</li>
<li>Veranstaltung <b>1 : n</b> Ticket und Sitzplatz <b>1 : n</b> Ticket – das Ticket verbindet Veranstaltung und Sitzplatz.</li>
<li>Kunde <b>c : n</b> Ticket („kauft“): ein Ticket hat höchstens einen Käufer (c bei Kunde), ein Kunde kauft viele Tickets.</li>
</ul>`,
    explanation: "Das Ticket ist der „Knotenpunkt“ des Modells: Es löst die n:m-Beziehung zwischen Veranstaltung und Sitzplatz auf. Beim Kauf ist die Seite des Kunden konditional (<code>c</code>), weil Tickets vorab für alle Plätze erzeugt werden und zunächst unverkauft sind.",
  });

  /* =================================================================
   * Aktivitätsdiagramme
   * ================================================================= */

  q({
    id: "fmt-diagram-016", part: "GA1", topic: "ga1-uml", difficulty: 1, step: 3, points: 5,
    context: "Der Anmeldevorgang einer Web-Anwendung läuft so ab: Nach dem Start gibt der Nutzer seine Zugangsdaten ein. Sind die Zugangsdaten korrekt, wird die Startseite angezeigt und der Ablauf endet. Sind sie nicht korrekt, wird eine Fehlermeldung angezeigt und der Nutzer gibt die Zugangsdaten erneut ein.",
    question: "Vervollständigen Sie das UML-Aktivitätsdiagramm um die Verzweigung (mit Bedingungen an den Kanten), die fehlenden Aktionen und alle fehlenden Kontrollflüsse.",
    diagram: {
      kind: "activity",
      solution: {
        nodes: [
          N("st", "start", null, 430, 20),
          N("a1", "action", "Zugangsdaten eingeben", 365, 90, { alt: ["Anmeldedaten eingeben", "Login-Daten eingeben"] }),
          N("d1", "decision", "Zugangsdaten korrekt?", 415, 200, { alt: ["Daten korrekt?", "Anmeldedaten korrekt?", "Login korrekt?"] }),
          N("a2", "action", "Startseite anzeigen", 150, 320, { alt: ["Startseite öffnen", "Startseite laden"] }),
          N("a3", "action", "Fehlermeldung anzeigen", 600, 320, { alt: ["Fehlermeldung ausgeben", "Fehler anzeigen"] }),
          N("en", "end", null, 215, 450),
        ],
        edges: [
          E("f1", "st", "a1", "flow"),
          E("f2", "a1", "d1", "flow"),
          E("f3", "d1", "a2", "flow", null, null, "[ja]"),
          E("f4", "d1", "a3", "flow", null, null, "[nein]"),
          E("f5", "a2", "en", "flow"),
          E("f6", "a3", "a1", "flow"),
        ],
      },
      start: {
        nodes: [
          N("st", "start", null, 430, 20),
          N("a1", "action", "Zugangsdaten eingeben", 365, 90),
          N("en", "end", null, 215, 450),
        ],
        edges: [E("f1", "st", "a1", "flow")],
      },
    },
    solution: `<ul>
<li>Nach „Zugangsdaten eingeben“ folgt die Verzweigung (Raute) <b>„Zugangsdaten korrekt?“</b>.</li>
<li><b>[ja]</b> → Aktion „Startseite anzeigen“ → Endknoten.</li>
<li><b>[nein]</b> → Aktion „Fehlermeldung anzeigen“ → zurück zu „Zugangsdaten eingeben“ (Schleife).</li>
</ul>`,
    explanation: "Die Bedingungen (Guards) stehen in eckigen Klammern an den ausgehenden Kanten der Raute und müssen sich gegenseitig ausschließen und vollständig sein. Häufiger Fehler: Nach der Fehlermeldung direkt zum Endknoten – laut Text wird die Eingabe aber wiederholt.",
  });

  q({
    id: "fmt-diagram-017", part: "GA1", topic: "ga1-uml", difficulty: 2, step: 4, points: 9,
    context: "Ein Versandhändler beschreibt seine Auftragsabwicklung: Zunächst wird die eingehende Bestellung erfasst. Danach wird geprüft, ob alle Artikel lieferbar sind. Ist das der Fall, wird die Ware versendet und anschließend die Rechnung erstellt. Sind nicht alle Artikel lieferbar, wird der Kunde über die Lieferverzögerung informiert. In beiden Fällen ist der Ablauf danach beendet.",
    question: "Erstellen Sie ein UML-Aktivitätsdiagramm für die Auftragsabwicklung mit Start- und Endknoten, allen Aktionen, der Verzweigung und den Bedingungen an den Kanten.",
    diagram: {
      kind: "activity",
      solution: {
        nodes: [
          N("st", "start", null, 430, 15),
          N("a1", "action", "Bestellung erfassen", 365, 75, { alt: ["Bestellung aufnehmen", "Auftrag erfassen"] }),
          N("d1", "decision", "Artikel lieferbar?", 415, 175, { alt: ["Alle Artikel lieferbar?", "Ware lieferbar?", "lieferbar?"] }),
          N("a2", "action", "Ware versenden", 150, 280, { alt: ["Ware verschicken", "Lieferung versenden"] }),
          N("a3", "action", "Rechnung erstellen", 150, 390, { alt: ["Rechnung schreiben", "Rechnung erzeugen"] }),
          N("a4", "action", "Kunden informieren", 600, 280, { alt: ["Kunde informieren", "Kunden benachrichtigen", "Lieferverzögerung mitteilen"] }),
          N("en", "end", null, 430, 500),
        ],
        edges: [
          E("f1", "st", "a1", "flow"),
          E("f2", "a1", "d1", "flow"),
          E("f3", "d1", "a2", "flow", null, null, "[ja]"),
          E("f4", "a2", "a3", "flow"),
          E("f5", "a3", "en", "flow"),
          E("f6", "d1", "a4", "flow", null, null, "[nein]"),
          E("f7", "a4", "en", "flow"),
        ],
      },
    },
    solution: `<ul>
<li>Startknoten → <b>Bestellung erfassen</b> → Verzweigung <b>„Artikel lieferbar?“</b></li>
<li><b>[ja]</b> → <b>Ware versenden</b> → <b>Rechnung erstellen</b> → Endknoten</li>
<li><b>[nein]</b> → <b>Kunden informieren</b> → Endknoten</li>
</ul>`,
    explanation: "Aktionen werden als Verb + Objekt formuliert („Ware versenden“), die Verzweigung als Frage bzw. Bedingung. Beide Zweige dürfen in denselben Endknoten münden (oder über eine Zusammenführungsraute). Fehlerquelle: Guards fehlen oder schließen sich nicht aus (z. B. [lieferbar] / [teilweise lieferbar]).",
  });

  q({
    id: "fmt-diagram-018", part: "GA1", topic: "ga1-uml", difficulty: 2, step: 5, points: 8,
    context: "An einer Supermarktkasse läuft der Kassiervorgang wie folgt ab: Der Kassierer scannt einen Artikel, anschließend zeigt das System die Zwischensumme an. Gibt es weitere Artikel, wird der nächste Artikel gescannt. Gibt es keine weiteren Artikel, wird die Zahlung entgegengenommen und danach der Kassenbon gedruckt. Dann endet der Vorgang.",
    question: "Erstellen Sie ein UML-Aktivitätsdiagramm für den Kassiervorgang mit Start- und Endknoten, allen Aktionen, der Verzweigung inkl. Bedingungen und der Schleife.",
    diagram: {
      kind: "activity",
      solution: {
        nodes: [
          N("st", "start", null, 165, 20),
          N("a1", "action", "Artikel scannen", 100, 90, { alt: ["Artikel erfassen", "Ware scannen"] }),
          N("a2", "action", "Zwischensumme anzeigen", 440, 90, { alt: ["Summe anzeigen", "Zwischensumme ausgeben"] }),
          N("d1", "decision", "Weitere Artikel?", 280, 200, { alt: ["Weiterer Artikel?", "Noch Artikel vorhanden?"] }),
          N("a3", "action", "Zahlung entgegennehmen", 230, 320, { alt: ["Bezahlen", "Zahlung annehmen", "Betrag kassieren"] }),
          N("a4", "action", "Kassenbon drucken", 230, 420, { alt: ["Bon drucken", "Beleg drucken", "Kassenbon ausgeben"] }),
          N("en", "end", null, 295, 520),
        ],
        edges: [
          E("f1", "st", "a1", "flow"),
          E("f2", "a1", "a2", "flow"),
          E("f3", "a2", "d1", "flow"),
          E("f4", "d1", "a1", "flow", null, null, "[ja]"),
          E("f5", "d1", "a3", "flow", null, null, "[nein]"),
          E("f6", "a3", "a4", "flow"),
          E("f7", "a4", "en", "flow"),
        ],
      },
    },
    solution: `<ul>
<li>Startknoten → <b>Artikel scannen</b> → <b>Zwischensumme anzeigen</b> → Verzweigung <b>„Weitere Artikel?“</b></li>
<li><b>[ja]</b> → zurück zu „Artikel scannen“ (Schleife)</li>
<li><b>[nein]</b> → <b>Zahlung entgegennehmen</b> → <b>Kassenbon drucken</b> → Endknoten</li>
</ul>`,
    explanation: "Schleifen werden im Aktivitätsdiagramm durch eine Verzweigung mit Rücksprung-Kante dargestellt – es gibt kein eigenes Schleifensymbol. Achten Sie auf die Richtung: Die [ja]-Kante führt <i>von</i> der Raute <i>zurück</i> zur Aktion „Artikel scannen“.",
  });

  q({
    id: "fmt-diagram-019", part: "GA1", topic: "ga1-uml", difficulty: 3, step: 3, points: 13,
    context: "Der Ablauf einer Bargeldauszahlung am Geldautomaten soll modelliert werden: Der Kunde führt seine Karte ein und gibt die PIN ein. Ist die PIN nicht korrekt, wird die Karte ausgegeben. Ist die PIN korrekt, wählt der Kunde einen Betrag. Danach prüft das System, ob die Kontodeckung ausreicht. Ist sie ausreichend, wird das Geld ausgezahlt, andernfalls wird ein Hinweis angezeigt. In beiden Fällen wird anschließend die Karte ausgegeben. Danach endet der Ablauf.",
    question: "Erstellen Sie ein UML-Aktivitätsdiagramm mit Start- und Endknoten, allen Aktionen, beiden Verzweigungen und den Bedingungen an den ausgehenden Kanten.",
    diagram: {
      kind: "activity",
      solution: {
        nodes: [
          N("st", "start", null, 95, 15),
          N("a1", "action", "Karte einführen", 30, 65, { alt: ["Karte einstecken", "Karte einlegen"] }),
          N("a2", "action", "PIN eingeben", 30, 150, { alt: ["Geheimzahl eingeben"] }),
          N("d1", "decision", "PIN korrekt?", 80, 240, { alt: ["PIN richtig?", "Geheimzahl korrekt?"] }),
          N("a3", "action", "Betrag wählen", 280, 248, { alt: ["Betrag auswählen", "Betrag eingeben"] }),
          N("d2", "decision", "Deckung ausreichend?", 530, 240, { alt: ["Kontodeckung ausreichend?", "Konto gedeckt?", "Guthaben ausreichend?"] }),
          N("a4", "action", "Geld auszahlen", 690, 340, { alt: ["Bargeld auszahlen", "Geld ausgeben"] }),
          N("a5", "action", "Hinweis anzeigen", 420, 340, { alt: ["Fehlermeldung anzeigen", "Meldung anzeigen"] }),
          N("a6", "action", "Karte ausgeben", 300, 460, { alt: ["Karte auswerfen", "Karte zurückgeben"] }),
          N("en", "end", null, 365, 550),
        ],
        edges: [
          E("f1", "st", "a1", "flow"),
          E("f2", "a1", "a2", "flow"),
          E("f3", "a2", "d1", "flow"),
          E("f4", "d1", "a3", "flow", null, null, "[ja]"),
          E("f5", "d1", "a6", "flow", null, null, "[nein]"),
          E("f6", "a3", "d2", "flow"),
          E("f7", "d2", "a4", "flow", null, null, "[ja]"),
          E("f8", "d2", "a5", "flow", null, null, "[nein]"),
          E("f9", "a4", "a6", "flow"),
          E("f10", "a5", "a6", "flow"),
          E("f11", "a6", "en", "flow"),
        ],
      },
    },
    solution: `<ul>
<li>Startknoten → <b>Karte einführen</b> → <b>PIN eingeben</b> → Verzweigung <b>„PIN korrekt?“</b></li>
<li><b>[nein]</b> → direkt zu <b>Karte ausgeben</b></li>
<li><b>[ja]</b> → <b>Betrag wählen</b> → Verzweigung <b>„Deckung ausreichend?“</b>
<ul><li><b>[ja]</b> → <b>Geld auszahlen</b> → Karte ausgeben</li><li><b>[nein]</b> → <b>Hinweis anzeigen</b> → Karte ausgeben</li></ul></li>
<li><b>Karte ausgeben</b> → Endknoten</li>
</ul>`,
    explanation: "Drei Pfade laufen in der Aktion „Karte ausgeben“ zusammen – die Aktion wird nur <b>einmal</b> gezeichnet (alternativ mit Zusammenführungsraute davor). Typische Fehler: zweite Verzweigung vergessen, Bedingungen an die Aktionen statt an die Kanten schreiben, mehrere Endknoten ohne vorherige Kartenausgabe.",
  });

  /* =================================================================
   * Use-Case-Diagramme
   * ================================================================= */

  q({
    id: "fmt-diagram-020", part: "GA1", topic: "ga1-uml", difficulty: 1, step: 2, points: 5,
    context: "In einem Webshop kann ein <b>Kunde</b> eine Bestellung aufgeben. Dabei muss er sich in jedem Fall anmelden. Optional kann er bei der Bestellung einen Gutschein einlösen.",
    question: "Vervollständigen Sie das Use-Case-Diagramm um die Anwendungsfälle „Anmelden“ und „Gutschein einlösen“ sowie alle Beziehungen (Assoziation, «include», «extend»).",
    diagram: {
      kind: "usecase",
      solution: {
        nodes: [
          N("k", "actor", "Kunde", 60, 220),
          N("u1", "usecase", "Bestellung aufgeben", 300, 232),
          N("u2", "usecase", "Anmelden", 640, 100, { alt: ["Einloggen", "Login"] }),
          N("u3", "usecase", "Gutschein einlösen", 640, 360, { alt: ["Gutschein verwenden", "Gutscheincode einlösen"] }),
        ],
        edges: [
          E("e1", "k", "u1", "assoc"),
          E("e2", "u1", "u2", "include"),
          E("e3", "u3", "u1", "extend"),
        ],
      },
      start: {
        nodes: [
          N("k", "actor", "Kunde", 60, 220),
          N("u1", "usecase", "Bestellung aufgeben", 300, 232),
        ],
        edges: [],
      },
    },
    solution: `<ul>
<li>Assoziation <b>Kunde —— Bestellung aufgeben</b> (einfache Linie).</li>
<li><b>Bestellung aufgeben ‑‑«include»‑‑&gt; Anmelden</b>: Anmelden ist immer Bestandteil – Pfeil vom Basis-UC zum eingebundenen UC.</li>
<li><b>Gutschein einlösen ‑‑«extend»‑‑&gt; Bestellung aufgeben</b>: optional – Pfeil vom erweiternden UC zum Basis-UC.</li>
</ul>`,
    explanation: "Merkhilfe: «include» = „muss“, Pfeil zeigt <i>weg</i> von der Basis; «extend» = „kann“, Pfeil zeigt <i>hin</i> zur Basis. Die vertauschte Pfeilrichtung ist der häufigste Fehler in IHK-Prüfungen.",
  });

  q({
    id: "fmt-diagram-021", part: "GA1", topic: "ga1-uml", difficulty: 2, step: 3, points: 10,
    context: "Für die Stadtbibliothek wird ein Ausleihsystem entwickelt. Ein <b>Mitglied</b> kann Medien ausleihen und Medien zurückgeben. Beide Vorgänge werden immer gemeinsam mit einem <b>Bibliothekar</b> am Schalter durchgeführt. Bei jeder Ausleihe wird der Mitgliedsausweis geprüft. Wird ein Medium verspätet zurückgegeben, muss bei der Rückgabe zusätzlich eine Mahngebühr bezahlt werden.",
    question: "Erstellen Sie ein Use-Case-Diagramm mit allen Akteuren, Anwendungsfällen und Beziehungen (Assoziation, «include», «extend»).",
    diagram: {
      kind: "usecase",
      solution: {
        nodes: [
          N("m", "actor", "Mitglied", 30, 240, { alt: ["Bibliotheksmitglied", "Leser", "Kunde"] }),
          N("b", "actor", "Bibliothekar", 810, 240, { alt: ["Bibliothekarin", "Mitarbeiter"] }),
          N("u1", "usecase", "Medium ausleihen", 220, 120, { alt: ["Medien ausleihen", "Ausleihen"] }),
          N("u2", "usecase", "Medium zurückgeben", 220, 400, { alt: ["Medien zurückgeben", "Rückgabe"] }),
          N("u3", "usecase", "Mitgliedsausweis prüfen", 480, 30, { alt: ["Ausweis prüfen"] }),
          N("u4", "usecase", "Mahngebühr bezahlen", 480, 490, { alt: ["Mahngebühr zahlen", "Gebühr bezahlen"] }),
        ],
        edges: [
          E("e1", "m", "u1", "assoc"),
          E("e2", "m", "u2", "assoc"),
          E("e3", "b", "u1", "assoc"),
          E("e4", "b", "u2", "assoc"),
          E("e5", "u1", "u3", "include"),
          E("e6", "u4", "u2", "extend"),
        ],
      },
    },
    solution: `<ul>
<li>Akteure: <b>Mitglied</b>, <b>Bibliothekar</b> (außerhalb der Systemgrenze).</li>
<li>Anwendungsfälle: <b>Medium ausleihen</b>, <b>Medium zurückgeben</b>, <b>Mitgliedsausweis prüfen</b>, <b>Mahngebühr bezahlen</b>.</li>
<li>Assoziationen: beide Akteure jeweils mit „Medium ausleihen“ und „Medium zurückgeben“.</li>
<li><b>Medium ausleihen ‑‑«include»‑‑&gt; Mitgliedsausweis prüfen</b> (bei <i>jeder</i> Ausleihe).</li>
<li><b>Mahngebühr bezahlen ‑‑«extend»‑‑&gt; Medium zurückgeben</b> (nur bei Verspätung, Bedingung als Extension Point).</li>
</ul>`,
    explanation: "Das Signalwort „bei jeder“ deutet auf «include», „nur wenn / zusätzlich bei“ auf «extend». Akteure sind Rollen (Bibliothekar), keine konkreten Personen. Ein Anwendungsfall kann mehrere Akteure haben.",
  });

  q({
    id: "fmt-diagram-022", part: "GA1", topic: "ga1-uml", difficulty: 3, step: 2, points: 14,
    context: "Ein Kino führt ein Online-Ticketsystem ein. Ein <b>Kunde</b> kann Tickets buchen; zu jeder Buchung gehört immer das Bezahlen. Das Bezahlen wird über einen externen <b>Zahlungsdienstleister</b> abgewickelt. Ein <b>Stammkunde</b> ist ein Kunde mit Kundenkarte: Er kann alles, was ein Kunde kann, und darf zusätzlich beim Buchen optional Bonuspunkte einlösen. Ein <b>Mitarbeiter</b> des Kinos pflegt das Kinoprogramm.",
    question: "Erstellen Sie ein Use-Case-Diagramm mit allen Akteuren (inkl. Generalisierung), Anwendungsfällen und Beziehungen (Assoziation, «include», «extend»).",
    diagram: {
      kind: "usecase",
      solution: {
        nodes: [
          N("k", "actor", "Kunde", 30, 110, { alt: ["Kinobesucher", "Besucher"] }),
          N("sk", "actor", "Stammkunde", 30, 400, { alt: ["Stammkundin"] }),
          N("z", "actor", "Zahlungsdienstleister", 820, 90, { alt: ["Zahlungsdienst", "Payment-Provider", "Zahlungssystem"] }),
          N("ma", "actor", "Mitarbeiter", 820, 410, { alt: ["Kinomitarbeiter", "Angestellter"] }),
          N("u1", "usecase", "Ticket buchen", 230, 130, { alt: ["Tickets buchen", "Kinokarte buchen", "Karte buchen"] }),
          N("u2", "usecase", "Bezahlen", 540, 130, { alt: ["Ticket bezahlen", "Zahlung durchführen", "Bezahlung"] }),
          N("u3", "usecase", "Bonuspunkte einlösen", 230, 420, { alt: ["Punkte einlösen", "Bonus einlösen"] }),
          N("u4", "usecase", "Programm pflegen", 540, 430, { alt: ["Kinoprogramm pflegen", "Programm verwalten", "Kinoprogramm verwalten"] }),
        ],
        edges: [
          E("e1", "sk", "k", "inherit"),
          E("e2", "k", "u1", "assoc"),
          E("e3", "u1", "u2", "include"),
          E("e4", "z", "u2", "assoc"),
          E("e5", "u3", "u1", "extend"),
          E("e6", "sk", "u3", "assoc"),
          E("e7", "ma", "u4", "assoc"),
        ],
      },
    },
    solution: `<ul>
<li>Akteure: <b>Kunde</b>, <b>Stammkunde</b>, <b>Zahlungsdienstleister</b> (Fremdsystem), <b>Mitarbeiter</b>.</li>
<li><b>Stammkunde ——▷ Kunde</b>: Generalisierung (hohles Dreieck am Kunden) – der Stammkunde erbt alle Anwendungsfälle des Kunden.</li>
<li>Kunde —— <b>Ticket buchen</b>; <b>Ticket buchen ‑‑«include»‑‑&gt; Bezahlen</b> (immer); Zahlungsdienstleister —— Bezahlen.</li>
<li><b>Bonuspunkte einlösen ‑‑«extend»‑‑&gt; Ticket buchen</b> (optional); Stammkunde —— Bonuspunkte einlösen.</li>
<li>Mitarbeiter —— <b>Programm pflegen</b>.</li>
</ul>`,
    explanation: "Durch die Generalisierung muss der Stammkunde nicht erneut mit „Ticket buchen“ verbunden werden. Externe Systeme wie der Zahlungsdienstleister sind ebenfalls Akteure (oft rechts mit «system» gezeichnet). Fehlerquellen: Generalisierungspfeil zeigt zum Stammkunden, extend-Pfeil zeigt von der Basis weg.",
  });

  AP2.questions.push.apply(AP2.questions, qs);
})();
