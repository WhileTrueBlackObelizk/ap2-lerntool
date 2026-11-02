// GA2 – SQL / Datenbanken (AP2 FIAE, Winter 2026)
// Topics: ga2-sql-ddl, ga2-sql-select, ga2-sql-join, ga2-sql-aggregat, ga2-sql-subquery, ga2-sql-dml, ga2-sql-transaktionen
// Alle SQL-Aufgaben (type "sql") laufen im Browser mit SQLite (sql.js). Die Schemata unten sind die gemeinsame Datenbasis.
window.AP2 = window.AP2 || { topics: [], questions: [], exams: [], generators: [] };
(function () {
  "use strict";

  // ---------------------------------------------------------------------------
  // Hilfsfunktionen: aus einer Tabellendefinition werden Setup-SQL und die
  // Kontext-Darstellung (Schema + Tabelleninhalte) erzeugt -> eine Datenquelle.
  // ---------------------------------------------------------------------------
  function lit(v) {
    if (v === null || v === undefined) return "NULL";
    if (typeof v === "number") return String(v);
    return "'" + String(v).replace(/'/g, "''") + "'";
  }
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  // Spalte: [name, typ, constraint, schluessel-anzeige (optional)]
  function T(name, cols, rows, extra) {
    return { name: name, cols: cols, rows: rows, extra: extra || [] };
  }
  function keyOf(c) {
    if (c[3]) return c[3];
    var k = [];
    if (/PRIMARY KEY/i.test(c[2] || "")) k.push("PK");
    var m = /REFERENCES\s+(\w+)/i.exec(c[2] || "");
    if (m) k.push("FK → " + m[1]);
    return k.join(", ");
  }
  function DB(title, intro, tables) {
    var sql = tables
      .map(function (t) {
        var defs = t.cols
          .map(function (c) { return "  " + c[0] + " " + c[1] + (c[2] ? " " + c[2] : ""); })
          .concat(t.extra.map(function (e) { return "  " + e; }));
        var s = "CREATE TABLE " + t.name + " (\n" + defs.join(",\n") + "\n);\n";
        if (t.rows.length)
          s += "INSERT INTO " + t.name + " VALUES\n" +
            t.rows.map(function (r) { return "  (" + r.map(lit).join(", ") + ")"; }).join(",\n") + ";\n";
        return s;
      })
      .join("\n");
    return { title: title, intro: intro, tables: tables, sql: sql };
  }
  function schemaHtml(db, only) {
    var rows = db.tables
      .filter(function (t) { return !only || only.indexOf(t.name) >= 0; })
      .map(function (t) {
        var cols = t.cols
          .map(function (c) {
            var k = keyOf(c);
            var n = /PK/.test(k) ? "<u>" + c[0] + "</u>" : c[0];
            return n + " <small>" + esc(c[1]) + (k ? ", " + esc(k) : "") + (/NOT NULL/i.test(c[2] || "") ? ", NOT NULL" : "") + "</small>";
          })
          .join("<br>");
        return "<tr><td><b>" + t.name + "</b></td><td>" + cols + "</td></tr>";
      })
      .join("");
    return "<table><tr><th>Tabelle</th><th>Spalten (Datentyp, Schlüssel)</th></tr>" + rows + "</table>";
  }
  function dataHtml(db, only) {
    return db.tables
      .filter(function (t) { return !only || only.indexOf(t.name) >= 0; })
      .map(function (t) {
        var head = "<tr>" + t.cols.map(function (c) { return "<th>" + c[0] + "</th>"; }).join("") + "</tr>";
        var body = t.rows
          .map(function (r) {
            return "<tr>" + r.map(function (v) { return "<td>" + (v === null ? "<i>NULL</i>" : esc(v)) + "</td>"; }).join("") + "</tr>";
          })
          .join("");
        return "<p><b>" + t.name + "</b></p><table>" + head + body + "</table>";
      })
      .join("");
  }
  // Kontext für eine Aufgabe: Szenario-Text + Schema + (aufklappbar) Tabelleninhalte
  function ctx(db, text, opts) {
    opts = opts || {};
    var h = "";
    if (text) h += "<p>" + text + "</p>";
    h += "<p><b>" + db.title + "</b> – " + db.intro + "</p>";
    h += schemaHtml(db, opts.only);
    if (opts.extraSchema) h += opts.extraSchema;
    h += "<p><small>PK = Primärschlüssel (unterstrichen), FK = Fremdschlüssel → referenzierte Tabelle. Datumswerte im Format 'YYYY-MM-DD'.</small></p>";
    if (opts.showData) h += dataHtml(db, opts.only);
    else if (opts.details) h += "<details><summary>Tabelleninhalte (Testdaten) anzeigen</summary>" + dataHtml(db, opts.only) + "</details>";
    else h += "<p><small>Die vollständigen Testdaten können Sie über „Tabellen anzeigen“ einsehen.</small></p>";
    return h;
  }
  function pre(sql) {
    return "<pre><code>" + esc(sql) + "</code></pre>";
  }

  // ---------------------------------------------------------------------------
  // Schema 1: Onlineshop
  // ---------------------------------------------------------------------------
  var SHOP = DB("Onlineshop „TechStore24“", "Der IT-Fachhändler TechStore24 verwaltet Kunden, Artikel und Bestellungen in einer relationalen Datenbank.", [
    T("kategorie", [
      ["kategorie_id", "INTEGER", "PRIMARY KEY"],
      ["bezeichnung", "VARCHAR(50)", "NOT NULL"],
      ["oberkategorie_id", "INTEGER", "REFERENCES kategorie(kategorie_id)"]
    ], [
      [1, "Hardware", null], [2, "Software", null], [3, "Notebooks", 1], [4, "Monitore", 1],
      [5, "Zubehör", 1], [6, "Betriebssysteme", 2], [7, "Office", 2], [8, "Netzwerk", null]
    ]),
    T("kunde", [
      ["kunden_id", "INTEGER", "PRIMARY KEY"],
      ["vorname", "VARCHAR(50)", ""],
      ["nachname", "VARCHAR(50)", "NOT NULL"],
      ["plz", "CHAR(5)", ""],
      ["ort", "VARCHAR(50)", ""],
      ["email", "VARCHAR(100)", "UNIQUE"],
      ["registriert_am", "DATE", ""]
    ], [
      [1, "Anna", "Schmidt", "10115", "Berlin", "anna.schmidt@mail.de", "2024-03-12"],
      [2, "Bernd", "Müller", "80331", "München", "b.mueller@web.de", "2024-07-01"],
      [3, "Clara", "Weber", "50667", "Köln", null, "2025-01-20"],
      [4, "David", "Schneider", "10117", "Berlin", "d.schneider@mail.de", "2025-02-14"],
      [5, "Eva", "Fischer", "20095", "Hamburg", "eva.f@posteo.de", "2025-05-30"],
      [6, "Frank", "Meyer", "80333", "München", null, "2025-09-02"],
      [7, "Gül", "Yilmaz", "70173", "Stuttgart", "guel.yilmaz@mail.de", "2026-01-15"],
      [8, "Hans", "Wagner", "50668", "Köln", "h.wagner@web.de", "2026-03-03"],
      [9, "Ines", "Becker", "20097", "Hamburg", "ines.becker@mail.de", "2026-06-21"],
      [10, "Jonas", "Schulz", "04109", "Leipzig", null, "2026-08-10"]
    ]),
    T("artikel", [
      ["artikel_id", "INTEGER", "PRIMARY KEY"],
      ["bezeichnung", "VARCHAR(100)", "NOT NULL"],
      ["preis", "DECIMAL(8,2)", "NOT NULL"],
      ["bestand", "INTEGER", "DEFAULT 0"],
      ["kategorie_id", "INTEGER", "REFERENCES kategorie(kategorie_id)"]
    ], [
      [101, "Notebook ProBook 450", 899.0, 12, 3],
      [102, "Notebook ThinkPad E14", 1049.0, 5, 3],
      [103, "Monitor 27 Zoll WQHD", 329.9, 20, 4],
      [104, "Monitor 24 Zoll FullHD", 149.9, 0, 4],
      [105, "USB-C-Dockingstation", 189.0, 8, 5],
      [106, "Funkmaus", 24.99, 45, 5],
      [107, "Tastatur mechanisch", 89.9, 15, 5],
      [108, "Windows 11 Pro", 259.0, 30, 6],
      [109, "Office 2024 Home", 149.0, 25, 7],
      [110, "USB-Stick 64 GB", 9.99, 100, 5],
      [111, "Headset Bluetooth", 59.9, null, null],
      [112, "Linux-Schulungshandbuch", 39.9, 7, null]
    ]),
    T("bestellung", [
      ["bestell_id", "INTEGER", "PRIMARY KEY"],
      ["kunden_id", "INTEGER", "NOT NULL REFERENCES kunde(kunden_id)"],
      ["bestelldatum", "DATE", "NOT NULL"],
      ["versanddatum", "DATE", ""],
      ["status", "VARCHAR(20)", ""]
    ], [
      [1001, 1, "2025-11-03", "2025-11-05", "geliefert"],
      [1002, 2, "2025-12-14", "2025-12-16", "geliefert"],
      [1003, 1, "2026-01-08", "2026-01-09", "geliefert"],
      [1004, 3, "2026-02-20", "2026-02-23", "geliefert"],
      [1005, 4, "2026-03-15", null, "storniert"],
      [1006, 2, "2026-04-02", "2026-04-03", "geliefert"],
      [1007, 5, "2026-05-19", "2026-05-22", "geliefert"],
      [1008, 1, "2026-06-30", "2026-07-02", "geliefert"],
      [1009, 6, "2026-08-11", null, "offen"],
      [1010, 7, "2026-09-25", null, "offen"],
      [1011, 2, "2026-10-01", "2026-10-02", "versendet"],
      [1012, 5, "2026-10-12", null, "offen"]
    ]),
    T("bestellposition", [
      ["bestell_id", "INTEGER", "NOT NULL REFERENCES bestellung(bestell_id)", "PK, FK → bestellung"],
      ["artikel_id", "INTEGER", "NOT NULL REFERENCES artikel(artikel_id)", "PK, FK → artikel"],
      ["menge", "INTEGER", "NOT NULL"],
      ["einzelpreis", "DECIMAL(8,2)", "NOT NULL"]
    ], [
      [1001, 101, 1, 899.0], [1001, 106, 2, 24.99],
      [1002, 108, 1, 259.0], [1002, 109, 1, 149.0],
      [1003, 103, 2, 329.9], [1003, 110, 5, 9.99],
      [1004, 102, 1, 1049.0],
      [1005, 105, 1, 189.0],
      [1006, 107, 1, 89.9], [1006, 106, 1, 24.99], [1006, 110, 10, 9.99],
      [1007, 101, 2, 879.0], [1007, 103, 1, 329.9],
      [1008, 109, 2, 149.0],
      [1009, 105, 2, 189.0], [1009, 106, 3, 24.99],
      [1010, 102, 1, 1049.0], [1010, 108, 1, 259.0],
      [1011, 110, 3, 9.99],
      [1012, 107, 2, 89.9]
    ], ["PRIMARY KEY (bestell_id, artikel_id)"])
  ]);

  // ---------------------------------------------------------------------------
  // Schema 2: Seminarverwaltung
  // ---------------------------------------------------------------------------
  var SEMINAR = DB("Seminarverwaltung „IT-Akademie Nord“", "Die Schulungsfirma IT-Akademie Nord verwaltet Dozenten, Kurse, Teilnehmer und Buchungen.", [
    T("dozent", [
      ["dozent_id", "INTEGER", "PRIMARY KEY"],
      ["nachname", "VARCHAR(50)", "NOT NULL"],
      ["vorname", "VARCHAR(50)", ""],
      ["fachgebiet", "VARCHAR(50)", ""],
      ["stundensatz", "DECIMAL(6,2)", ""]
    ], [
      [1, "Krause", "Petra", "Datenbanken", 85.0],
      [2, "Lehmann", "Tobias", "Programmierung", 90.0],
      [3, "Hoffmann", "Sabine", "Netzwerke", 80.0],
      [4, "Wolf", "Martin", "Projektmanagement", 95.0],
      [5, "Neumann", "Julia", "Programmierung", null],
      [6, "Braun", "Oliver", "IT-Sicherheit", 100.0]
    ]),
    T("kurs", [
      ["kurs_id", "INTEGER", "PRIMARY KEY"],
      ["titel", "VARCHAR(100)", "NOT NULL"],
      ["dozent_id", "INTEGER", "REFERENCES dozent(dozent_id)"],
      ["beginn", "DATE", ""],
      ["dauer_tage", "INTEGER", ""],
      ["preis", "DECIMAL(8,2)", ""],
      ["max_teilnehmer", "INTEGER", ""],
      ["ort", "VARCHAR(50)", ""]
    ], [
      [10, "SQL Grundlagen", 1, "2026-01-12", 3, 690.0, 12, "Berlin"],
      [11, "SQL für Fortgeschrittene", 1, "2026-03-09", 2, 590.0, 10, "Online"],
      [12, "Java Einstieg", 2, "2026-02-02", 5, 1290.0, 12, "Hamburg"],
      [13, "Python kompakt", 2, "2026-04-20", 3, 790.0, 15, "Online"],
      [14, "Netzwerktechnik", 3, "2026-05-11", 4, 990.0, 10, "Berlin"],
      [15, "Scrum Master", 4, "2026-06-15", 2, 890.0, 14, "München"],
      [16, "IT-Grundschutz", 6, "2026-09-14", 3, 1090.0, 8, "Online"],
      [17, "Kotlin für Android", null, "2026-11-16", 4, 1190.0, 10, "Hamburg"],
      [18, "Git und DevOps", 2, "2026-12-07", 2, 650.0, 12, "Online"]
    ]),
    T("teilnehmer", [
      ["teilnehmer_id", "INTEGER", "PRIMARY KEY"],
      ["nachname", "VARCHAR(50)", "NOT NULL"],
      ["vorname", "VARCHAR(50)", ""],
      ["firma", "VARCHAR(100)", ""],
      ["ort", "VARCHAR(50)", ""],
      ["geburtsdatum", "DATE", ""]
    ], [
      [1, "Albrecht", "Lena", "DataSoft GmbH", "Berlin", "1995-04-12"],
      [2, "Berger", "Max", null, "Hamburg", "1988-11-30"],
      [3, "Celik", "Aylin", "DataSoft GmbH", "Berlin", "1999-07-05"],
      [4, "Dietrich", "Paul", "Netcom AG", "München", "1979-02-18"],
      [5, "Engel", "Sophie", null, "Köln", "2001-09-23"],
      [6, "Franke", "Tim", "Netcom AG", "München", "1992-12-01"],
      [7, "Graf", "Nina", "WebWerk KG", "Leipzig", "1985-06-14"],
      [8, "Hartmann", "Jan", null, "Berlin", "1997-03-08"],
      [9, "Ivanova", "Maria", "WebWerk KG", "Leipzig", "1990-10-27"],
      [10, "Jung", "Felix", "DataSoft GmbH", "Hamburg", "2000-01-19"],
      [11, "Keller", "Laura", null, "Köln", "1983-08-02"]
    ]),
    T("buchung", [
      ["buchung_id", "INTEGER", "PRIMARY KEY"],
      ["teilnehmer_id", "INTEGER", "NOT NULL REFERENCES teilnehmer(teilnehmer_id)"],
      ["kurs_id", "INTEGER", "NOT NULL REFERENCES kurs(kurs_id)"],
      ["buchungsdatum", "DATE", ""],
      ["bezahlt", "INTEGER", "DEFAULT 0", "0 = nein, 1 = ja"]
    ], [
      [1, 1, 10, "2025-12-01", 1], [2, 3, 10, "2025-12-03", 1], [3, 8, 10, "2025-12-20", 0],
      [4, 2, 10, "2026-01-05", 1], [5, 1, 11, "2026-02-10", 1], [6, 3, 11, "2026-02-12", 1],
      [7, 10, 12, "2026-01-15", 1], [8, 2, 12, "2026-01-18", 0], [9, 5, 13, "2026-03-30", 1],
      [10, 10, 13, "2026-04-01", 1], [11, 8, 13, "2026-04-02", 1], [12, 4, 14, "2026-04-15", 1],
      [13, 6, 14, "2026-04-16", 1], [14, 7, 15, "2026-05-20", 1], [15, 9, 15, "2026-05-22", 0],
      [16, 4, 15, "2026-05-25", 1], [17, 1, 16, "2026-08-01", 1], [18, 6, 16, "2026-08-03", 0],
      [19, 7, 17, "2026-10-01", 0], [20, 5, 10, "2026-01-08", 1]
    ])
  ]);

  // ---------------------------------------------------------------------------
  // Schema 3: IT-Support / Ticketsystem
  // ---------------------------------------------------------------------------
  var SUPPORT = DB("IT-Support „HelpDesk“ der Nordwind Logistik GmbH", "Die interne IT verwaltet Abteilungen, Mitarbeiter, Geräte und Störungstickets.", [
    T("abteilung", [
      ["abteilung_id", "INTEGER", "PRIMARY KEY"],
      ["bezeichnung", "VARCHAR(50)", "NOT NULL"],
      ["standort", "VARCHAR(50)", ""]
    ], [
      [1, "IT", "Berlin"], [2, "Vertrieb", "Hamburg"], [3, "Buchhaltung", "Berlin"],
      [4, "Personal", "München"], [5, "Marketing", "Hamburg"], [6, "Recht", "Berlin"]
    ]),
    T("mitarbeiter", [
      ["ma_id", "INTEGER", "PRIMARY KEY"],
      ["nachname", "VARCHAR(50)", "NOT NULL"],
      ["vorname", "VARCHAR(50)", ""],
      ["abteilung_id", "INTEGER", "REFERENCES abteilung(abteilung_id)"],
      ["vorgesetzter_id", "INTEGER", "REFERENCES mitarbeiter(ma_id)"],
      ["eintrittsdatum", "DATE", ""],
      ["gehalt", "DECIMAL(8,2)", ""]
    ], [
      [1, "Richter", "Klaus", 1, null, "2010-04-01", 6200],
      [2, "Vogel", "Sandra", 1, 1, "2015-09-01", 4800],
      [3, "Kaiser", "Ahmet", 1, 1, "2019-02-15", 4300],
      [4, "Lang", "Miriam", 1, 2, "2023-08-01", 3600],
      [5, "Peters", "Ralf", 2, null, "2012-01-01", 5900],
      [6, "Schuster", "Ute", 2, 5, "2018-06-01", 4100],
      [7, "Brandt", "Kevin", 2, 5, "2024-03-01", 3400],
      [8, "Haas", "Monika", 3, null, "2011-10-01", 5100],
      [9, "Kraus", "Dieter", 3, 8, "2020-05-15", 3900],
      [10, "Simon", "Lisa", 4, null, "2016-11-01", 4700],
      [11, "Ludwig", "Jana", 5, 5, "2021-07-01", 3800],
      [12, "Böhm", "Erik", null, 1, "2026-09-01", 3200]
    ]),
    T("geraet", [
      ["geraet_id", "INTEGER", "PRIMARY KEY"],
      ["inventar_nr", "VARCHAR(20)", "NOT NULL"],
      ["typ", "VARCHAR(30)", ""],
      ["hersteller", "VARCHAR(30)", ""],
      ["kaufdatum", "DATE", ""],
      ["ma_id", "INTEGER", "REFERENCES mitarbeiter(ma_id)"]
    ], [
      [1, "INV-1001", "Notebook", "Lenovo", "2022-03-10", 2],
      [2, "INV-1002", "Notebook", "Dell", "2023-01-20", 3],
      [3, "INV-1003", "Desktop", "HP", "2019-06-05", 8],
      [4, "INV-1004", "Drucker", "Brother", "2018-11-12", null],
      [5, "INV-1005", "Notebook", "Lenovo", "2024-02-01", 6],
      [6, "INV-1006", "Monitor", "Dell", "2021-08-30", 2],
      [7, "INV-1007", "Smartphone", "Apple", "2025-04-14", 5],
      [8, "INV-1008", "Desktop", "HP", "2020-09-01", 9],
      [9, "INV-1009", "Notebook", "Dell", "2025-10-05", 7],
      [10, "INV-1010", "Drucker", "HP", "2023-05-22", null],
      [11, "INV-1011", "Notebook", "Lenovo", "2026-09-01", 12],
      [12, "INV-1012", "Smartphone", "Samsung", "2019-06-11", null]
    ]),
    T("ticket", [
      ["ticket_id", "INTEGER", "PRIMARY KEY"],
      ["betreff", "VARCHAR(100)", "NOT NULL"],
      ["ersteller_id", "INTEGER", "NOT NULL REFERENCES mitarbeiter(ma_id)"],
      ["bearbeiter_id", "INTEGER", "REFERENCES mitarbeiter(ma_id)"],
      ["geraet_id", "INTEGER", "REFERENCES geraet(geraet_id)"],
      ["erstellt_am", "DATE", "NOT NULL"],
      ["geloest_am", "DATE", ""],
      ["prioritaet", "VARCHAR(10)", "", "'niedrig' | 'mittel' | 'hoch'"],
      ["status", "VARCHAR(20)", "", "'offen' | 'in Bearbeitung' | 'geschlossen'"]
    ], [
      [1, "Drucker druckt nicht", 8, 3, 4, "2026-07-01", "2026-07-02", "mittel", "geschlossen"],
      [2, "VPN-Verbindung bricht ab", 6, 2, 5, "2026-07-14", "2026-07-16", "hoch", "geschlossen"],
      [3, "Passwort zurücksetzen", 9, 4, null, "2026-08-03", "2026-08-03", "niedrig", "geschlossen"],
      [4, "Bildschirm flackert", 2, 3, 6, "2026-08-20", "2026-08-25", "mittel", "geschlossen"],
      [5, "Outlook startet nicht", 11, 4, null, "2026-09-02", "2026-09-04", "mittel", "geschlossen"],
      [6, "Neues Notebook einrichten", 12, 2, 11, "2026-09-01", "2026-09-03", "hoch", "geschlossen"],
      [7, "Desktop sehr langsam", 9, 3, 8, "2026-09-15", null, "mittel", "in Bearbeitung"],
      [8, "Drucker Papierstau", 10, null, 10, "2026-10-05", null, "niedrig", "offen"],
      [9, "Smartphone-Display defekt", 5, 2, 7, "2026-10-08", null, "hoch", "in Bearbeitung"],
      [10, "Zugriff auf Laufwerk K:", 7, null, null, "2026-10-12", null, "mittel", "offen"],
      [11, "Notebook-Akku schwach", 7, 3, 9, "2026-10-15", null, "niedrig", "in Bearbeitung"],
      [12, "Drucker druckt nicht", 6, 4, 4, "2026-10-20", null, "hoch", "offen"]
    ])
  ]);

  // ---------------------------------------------------------------------------
  // Schema 4: Fuhrpark
  // ---------------------------------------------------------------------------
  var FUHRPARK = DB("Fuhrparkverwaltung der „FlottIT Services GmbH“", "Die Firma verwaltet ihre Dienstfahrzeuge, Fahrer, Fahrten (Fahrtenbuch) und Werkstattaufenthalte.", [
    T("fahrzeug", [
      ["fz_id", "INTEGER", "PRIMARY KEY"],
      ["kennzeichen", "VARCHAR(12)", "NOT NULL"],
      ["marke", "VARCHAR(30)", ""],
      ["modell", "VARCHAR(30)", ""],
      ["baujahr", "INTEGER", ""],
      ["km_stand", "INTEGER", ""],
      ["standort", "VARCHAR(30)", ""]
    ], [
      [1, "B-FI 101", "VW", "Golf", 2019, 98100, "Berlin"],
      [2, "B-FI 102", "VW", "Passat", 2021, 63800, "Berlin"],
      [3, "HH-FI 201", "Opel", "Astra", 2018, 143900, "Hamburg"],
      [4, "HH-FI 202", "Skoda", "Octavia", 2022, 41000, "Hamburg"],
      [5, "M-FI 301", "BMW", "320d", 2020, 111900, "München"],
      [6, "M-FI 302", "Tesla", "Model 3", 2023, 28700, "München"],
      [7, "B-FI 103", "Ford", "Transit", 2017, 187600, "Berlin"],
      [8, "HH-FI 203", "VW", "ID.3", 2024, 9800, "Hamburg"]
    ]),
    T("fahrer", [
      ["fahrer_id", "INTEGER", "PRIMARY KEY"],
      ["nachname", "VARCHAR(50)", "NOT NULL"],
      ["vorname", "VARCHAR(50)", ""],
      ["fuehrerscheinklasse", "VARCHAR(5)", ""],
      ["telefon", "VARCHAR(20)", ""]
    ], [
      [1, "Arnold", "Kai", "B", "0171-1234567"],
      [2, "Busch", "Elena", "B", null],
      [3, "Cramer", "Uwe", "C1", "0160-9876543"],
      [4, "Dorn", "Jasmin", "B", "0151-2223334"],
      [5, "Ernst", "Leon", "BE", null],
      [6, "Fuchs", "Mia", "B", "0176-5556667"]
    ]),
    T("fahrt", [
      ["fahrt_id", "INTEGER", "PRIMARY KEY"],
      ["fz_id", "INTEGER", "NOT NULL REFERENCES fahrzeug(fz_id)"],
      ["fahrer_id", "INTEGER", "NOT NULL REFERENCES fahrer(fahrer_id)"],
      ["datum", "DATE", "NOT NULL"],
      ["km_start", "INTEGER", ""],
      ["km_ende", "INTEGER", ""],
      ["zweck", "VARCHAR(50)", ""]
    ], [
      [1, 1, 1, "2026-09-01", 98100, 98250, "Kundentermin"],
      [2, 1, 2, "2026-09-03", 98250, 98500, "Messe"],
      [3, 2, 1, "2026-09-04", 63800, 64200, "Kundentermin"],
      [4, 3, 4, "2026-09-08", 143500, 143900, "Schulung"],
      [5, 5, 5, "2026-09-10", 111900, 112300, "Kundentermin"],
      [6, 6, 5, "2026-08-28", 27900, 28100, "Schulung"],
      [7, 6, 2, "2026-09-15", 28100, 28700, "Messe"],
      [8, 7, 3, "2026-09-18", 187200, 187600, "Materialtransport"],
      [9, 4, 4, "2026-09-22", 40700, 41000, "Kundentermin"],
      [10, 2, 2, "2026-10-06", 64200, 64650, "Messe"],
      [11, 1, 1, "2026-10-13", 98500, 98720, "Kundentermin"],
      [12, 7, 3, "2026-10-20", 187600, 187950, "Materialtransport"]
    ]),
    T("wartung", [
      ["wartung_id", "INTEGER", "PRIMARY KEY"],
      ["fz_id", "INTEGER", "NOT NULL REFERENCES fahrzeug(fz_id)"],
      ["datum", "DATE", "NOT NULL"],
      ["art", "VARCHAR(30)", ""],
      ["kosten", "DECIMAL(8,2)", ""],
      ["werkstatt", "VARCHAR(50)", ""]
    ], [
      [1, 1, "2026-02-10", "Inspektion", 420.5, "Autohaus Nord"],
      [2, 3, "2026-03-05", "Bremsen", 680.0, "Meisterwerkstatt Kühn"],
      [3, 5, "2026-04-12", "Inspektion", 510.0, "BMW Service München"],
      [4, 7, "2026-04-20", "Reifenwechsel", 240.0, "Reifen Express"],
      [5, 3, "2026-06-18", "Inspektion", 395.0, "Autohaus Nord"],
      [6, 7, "2026-07-02", "Getriebe", 1850.0, "Meisterwerkstatt Kühn"],
      [7, 2, "2026-08-15", "Inspektion", 450.0, "Autohaus Nord"],
      [8, 1, "2026-10-02", "Reifenwechsel", 220.0, "Reifen Express"],
      [9, 7, "2026-10-10", "Inspektion", 560.0, "Meisterwerkstatt Kühn"],
      [10, 4, "2025-11-20", "Inspektion", 380.0, "Autohaus Nord"]
    ])
  ]);

  // ---------------------------------------------------------------------------
  // Schema 5: Stadtbibliothek
  // ---------------------------------------------------------------------------
  var BIB = DB("Stadtbibliothek Bremen-Nord", "Die Bibliothek verwaltet Autoren, Bücher, Leser und Ausleihen.", [
    T("autor", [
      ["autor_id", "INTEGER", "PRIMARY KEY"],
      ["nachname", "VARCHAR(50)", "NOT NULL"],
      ["vorname", "VARCHAR(50)", ""],
      ["land", "VARCHAR(50)", ""]
    ], [
      [1, "Mann", "Thomas", "Deutschland"], [2, "Kafka", "Franz", "Österreich-Ungarn"],
      [3, "Zeh", "Juli", "Deutschland"], [4, "Orwell", "George", "Großbritannien"],
      [5, "Atwood", "Margaret", "Kanada"], [6, "von Schirach", "Ferdinand", "Deutschland"],
      [7, "Rowling", "Joanne K.", "Großbritannien"]
    ]),
    T("buch", [
      ["buch_id", "INTEGER", "PRIMARY KEY"],
      ["isbn", "VARCHAR(17)", "UNIQUE"],
      ["titel", "VARCHAR(100)", "NOT NULL"],
      ["autor_id", "INTEGER", "REFERENCES autor(autor_id)"],
      ["erscheinungsjahr", "INTEGER", ""],
      ["genre", "VARCHAR(30)", ""]
    ], [
      [1, "978-3-10-048211-1", "Buddenbrooks", 1, 1901, "Roman"],
      [2, "978-3-10-048212-8", "Der Zauberberg", 1, 1924, "Roman"],
      [3, "978-3-596-90110-6", "Die Verwandlung", 2, 1915, "Erzählung"],
      [4, "978-3-596-90111-3", "Der Process", 2, 1925, "Roman"],
      [5, "978-3-630-87648-3", "Unterleuten", 3, 2016, "Roman"],
      [6, "978-3-630-87700-8", "Über Menschen", 3, 2021, "Roman"],
      [7, "978-3-548-23410-6", "1984", 4, 1949, "Dystopie"],
      [8, "978-3-257-20118-5", "Farm der Tiere", 4, 1945, "Fabel"],
      [9, "978-3-492-31166-1", "Der Report der Magd", 5, 1985, "Dystopie"],
      [10, "978-3-442-71520-8", "Verbrechen", 6, 2009, "Erzählung"],
      [11, "978-3-442-71616-8", "Terror", 6, 2015, "Drama"],
      [12, "978-3-596-90112-0", "Das Schloss", 2, 1926, "Roman"]
    ]),
    T("leser", [
      ["leser_id", "INTEGER", "PRIMARY KEY"],
      ["nachname", "VARCHAR(50)", "NOT NULL"],
      ["vorname", "VARCHAR(50)", ""],
      ["ort", "VARCHAR(50)", ""],
      ["mitglied_seit", "DATE", ""]
    ], [
      [1, "Albers", "Tom", "Bremen", "2019-05-01"], [2, "Baum", "Ella", "Bremen", "2021-02-15"],
      [3, "Conrad", "Ben", "Oldenburg", "2022-09-10"], [4, "Dietz", "Hanna", "Bremen", "2023-01-03"],
      [5, "Eckert", "Luis", "Oldenburg", "2024-06-20"], [6, "Frey", "Zoe", "Bremen", "2025-11-11"],
      [7, "Gerber", "Noah", "Delmenhorst", "2026-04-01"]
    ]),
    T("ausleihe", [
      ["ausleihe_id", "INTEGER", "PRIMARY KEY"],
      ["buch_id", "INTEGER", "NOT NULL REFERENCES buch(buch_id)"],
      ["leser_id", "INTEGER", "NOT NULL REFERENCES leser(leser_id)"],
      ["ausleihdatum", "DATE", "NOT NULL"],
      ["faellig_am", "DATE", "NOT NULL"],
      ["rueckgabe_am", "DATE", "", "NULL = noch nicht zurück"]
    ], [
      [1, 1, 1, "2026-06-02", "2026-06-30", "2026-06-25"],
      [2, 7, 2, "2026-06-10", "2026-07-08", "2026-07-12"],
      [3, 3, 1, "2026-07-01", "2026-07-29", "2026-07-20"],
      [4, 5, 3, "2026-07-15", "2026-08-12", "2026-08-10"],
      [5, 7, 4, "2026-08-01", "2026-08-29", "2026-08-28"],
      [6, 9, 2, "2026-08-20", "2026-09-17", "2026-09-30"],
      [7, 10, 5, "2026-09-01", "2026-09-29", "2026-09-15"],
      [8, 4, 1, "2026-09-10", "2026-10-08", null],
      [9, 7, 3, "2026-09-25", "2026-10-23", null],
      [10, 6, 6, "2026-10-05", "2026-11-02", null],
      [11, 11, 2, "2026-10-10", "2026-11-07", null],
      [12, 2, 4, "2026-10-15", "2026-11-12", null]
    ])
  ]);

  // Kurzhelfer für Fragen
  var G = "GA2";
  function Q(o) {
    o.part = G;
    AP2.questions.push(o);
  }

  // ---------------------------------------------------------------------------
  // Topics mit Lernzetteln
  // ---------------------------------------------------------------------------
  AP2.topics.push(
    {
      id: "ga2-sql-ddl",
      part: G,
      title: "SQL: DDL – Tabellen, Schlüssel, Views, Indizes",
      summary: `<h4>DDL = Data Definition Language</h4>
<p>Mit DDL wird die <b>Struktur</b> der Datenbank festgelegt (nicht die Daten). Befehle: <code>CREATE</code>, <code>ALTER</code>, <code>DROP</code> (oft auch <code>TRUNCATE</code>).</p>
<h4>Spickzettel CREATE TABLE</h4>
<pre><code>CREATE TABLE bestellung (
  bestell_id   INTEGER      PRIMARY KEY,          -- MySQL: INT AUTO_INCREMENT
  kunden_id    INTEGER      NOT NULL,
  bestelldatum DATE         NOT NULL DEFAULT CURRENT_DATE,
  status       VARCHAR(20)  DEFAULT 'offen'
               CHECK (status IN ('offen','versendet','geliefert','storniert')),
  rabatt       DECIMAL(5,2) CHECK (rabatt BETWEEN 0 AND 100),
  bestellnr    CHAR(10)     UNIQUE,
  FOREIGN KEY (kunden_id) REFERENCES kunde(kunden_id)
      ON DELETE RESTRICT ON UPDATE CASCADE
);</code></pre>
<ul>
<li><b>Datentypen</b>: <code>INTEGER/INT</code>, <code>DECIMAL(p,s)</code> (Geldbeträge! p = Gesamtstellen, s = Nachkommastellen), <code>FLOAT/DOUBLE</code>, <code>CHAR(n)</code> (feste Länge, z.B. PLZ), <code>VARCHAR(n)</code>, <code>TEXT</code>, <code>DATE</code>, <code>TIME</code>, <code>DATETIME/TIMESTAMP</code>, <code>BOOLEAN</code>.</li>
<li><b>PRIMARY KEY</b>: eindeutig + NOT NULL, genau einer pro Tabelle (kann aus mehreren Spalten bestehen: <code>PRIMARY KEY (bestell_id, artikel_id)</code>).</li>
<li><b>FOREIGN KEY … REFERENCES</b>: referenzielle Integrität – nur Werte, die in der Zieltabelle existieren (oder NULL). <code>ON DELETE CASCADE</code> löscht abhängige Datensätze mit, <code>SET NULL</code> setzt den FK auf NULL, <code>RESTRICT/NO ACTION</code> verhindert das Löschen.</li>
<li><b>UNIQUE</b>: keine Duplikate (NULL ist erlaubt), <b>NOT NULL</b>: Pflichtfeld, <b>DEFAULT</b>: Standardwert, <b>CHECK</b>: Wertebereich.</li>
</ul>
<h4>Struktur ändern / löschen</h4>
<pre><code>ALTER TABLE kunde ADD telefon VARCHAR(30);          -- Spalte hinzufügen (SQLite: ADD COLUMN)
ALTER TABLE kunde DROP COLUMN telefon;              -- Spalte entfernen
ALTER TABLE kunde MODIFY plz CHAR(5) NOT NULL;      -- MySQL (SQL-Standard: ALTER COLUMN)
ALTER TABLE kunde RENAME TO kundenstamm;
DROP TABLE wartung;                                 -- Struktur + Daten weg
TRUNCATE TABLE log;                                 -- nur Daten weg (nicht in SQLite)</code></pre>
<h4>Index und View</h4>
<pre><code>CREATE INDEX idx_bestellung_datum ON bestellung(bestelldatum);
CREATE UNIQUE INDEX idx_fz_kennz ON fahrzeug(kennzeichen);
CREATE VIEW v_offene_bestellungen AS
  SELECT b.bestell_id, k.nachname FROM bestellung b
  JOIN kunde k ON k.kunden_id = b.kunden_id WHERE b.status = 'offen';
DROP VIEW v_offene_bestellungen;</code></pre>
<h4>Typische Fallen</h4>
<ul>
<li>Komma nach der letzten Spaltendefinition vor <code>)</code> → Syntaxfehler.</li>
<li>Fremdschlüssel muss denselben Datentyp wie der referenzierte Schlüssel haben; die referenzierte Tabelle muss <b>vorher</b> angelegt werden.</li>
<li>Geldbeträge nicht als FLOAT (Rundungsfehler), sondern DECIMAL.</li>
<li>m:n-Beziehungen brauchen eine <b>Zwischentabelle</b> mit zusammengesetztem PK aus zwei FKs.</li>
<li><code>DROP TABLE</code> ≠ <code>DELETE FROM</code>: DROP entfernt die Tabelle selbst, DELETE nur Zeilen.</li>
<li>SQLite-Besonderheit: <code>INTEGER PRIMARY KEY</code> vergibt automatisch fortlaufende Werte; Fremdschlüssel werden nur mit <code>PRAGMA foreign_keys = ON</code> geprüft.</li>
</ul>`
    },
    {
      id: "ga2-sql-select",
      part: G,
      title: "SQL: SELECT – Filtern, Sortieren, Funktionen",
      summary: `<h4>Grundaufbau (Reihenfolge merken!)</h4>
<pre><code>SELECT [DISTINCT] spalte1, spalte2 AS alias, preis * 1.19 AS brutto
FROM tabelle
WHERE bedingung
GROUP BY …  HAVING …
ORDER BY spalte1 ASC, spalte2 DESC
LIMIT 10;              -- MySQL/SQLite; SQL Server: SELECT TOP 10; Standard: FETCH FIRST 10 ROWS ONLY</code></pre>
<p>Logische Ausführungsreihenfolge: <b>FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT</b>. Darum kann ein Spaltenalias aus SELECT nicht in WHERE verwendet werden (wohl aber in ORDER BY).</p>
<h4>Bedingungen in WHERE</h4>
<ul>
<li>Vergleich: <code>= &lt;&gt; != &lt; &lt;= &gt; &gt;=</code>; Texte und Datumswerte in <b>einfachen Hochkommas</b>: <code>ort = 'Berlin'</code>.</li>
<li><code>AND</code> bindet stärker als <code>OR</code> → bei Mischung <b>Klammern setzen</b>: <code>WHERE (ort='Berlin' OR ort='Köln') AND email IS NULL</code>.</li>
<li><code>BETWEEN 10 AND 20</code> – Grenzen <b>inklusive</b>.</li>
<li><code>IN ('Berlin','Köln')</code> / <code>NOT IN (…)</code>.</li>
<li><code>LIKE 'M%'</code>: <code>%</code> = beliebig viele Zeichen (auch 0), <code>_</code> = genau ein Zeichen. <code>'%für%'</code> = enthält „für“.</li>
<li><code>IS NULL</code> / <code>IS NOT NULL</code> – <b>niemals</b> <code>= NULL</code> (ergibt UNKNOWN → keine Zeile).</li>
</ul>
<h4>Funktionen</h4>
<ul>
<li>Text: <code>UPPER()</code>, <code>LOWER()</code>, <code>LENGTH()</code>, <code>SUBSTR(s, start, länge)</code> (MySQL auch <code>SUBSTRING</code>, <code>LEFT</code>), <code>TRIM()</code>, <code>REPLACE()</code>. Verketten: Standard/SQLite/Oracle <code>vorname || ' ' || nachname</code>, MySQL <code>CONCAT(vorname, ' ', nachname)</code>.</li>
<li>Zahlen: <code>ROUND(x, 2)</code>, <code>ABS()</code>; NULL ersetzen: <code>COALESCE(x, 0)</code> (MySQL/SQLite auch <code>IFNULL</code>).</li>
<li>Fallunterscheidung: <code>CASE WHEN preis &lt; 50 THEN 'günstig' WHEN … ELSE 'teuer' END</code>.</li>
</ul>
<h4>Datum: SQLite vs. MySQL</h4>
<table><tr><th>Zweck</th><th>SQLite (dieses Tool)</th><th>MySQL / MariaDB</th></tr>
<tr><td>Heute</td><td><code>date('now')</code></td><td><code>CURDATE()</code>, <code>NOW()</code></td></tr>
<tr><td>Jahr</td><td><code>strftime('%Y', datum)</code> (liefert Text '2026')</td><td><code>YEAR(datum)</code> (liefert Zahl)</td></tr>
<tr><td>Monat</td><td><code>strftime('%m', datum)</code> → '03'</td><td><code>MONTH(datum)</code> → 3</td></tr>
<tr><td>Tage zwischen</td><td><code>julianday(b) - julianday(a)</code></td><td><code>DATEDIFF(b, a)</code></td></tr>
<tr><td>Datum + 14 Tage</td><td><code>date(datum, '+14 days')</code></td><td><code>DATE_ADD(datum, INTERVAL 14 DAY)</code></td></tr></table>
<p>Datumswerte im ISO-Format 'YYYY-MM-DD' lassen sich direkt mit <code>&lt;</code>, <code>&gt;</code>, <code>BETWEEN</code> vergleichen – das funktioniert in jedem DBMS und ist in der Prüfung die sicherste Lösung: <code>WHERE datum BETWEEN '2026-01-01' AND '2026-12-31'</code>.</p>
<h4>Typische Fallen</h4>
<ul>
<li>Doppelte Hochkommas <code>"Berlin"</code> sind im Standard Bezeichner, keine Texte.</li>
<li><code>DISTINCT</code> wirkt auf die <b>ganze Zeile</b>, nicht nur auf die erste Spalte.</li>
<li>ORDER BY ohne ASC/DESC = aufsteigend. NULL-Werte stehen in SQLite/MySQL bei ASC vorne.</li>
<li>Gefragte <b>Spaltenreihenfolge</b> und Sortierung der Aufgabenstellung exakt einhalten – das gibt in der IHK-Prüfung Punkte.</li>
</ul>`
    },
    {
      id: "ga2-sql-join",
      part: G,
      title: "SQL: JOINs – Tabellen verknüpfen",
      summary: `<h4>Wozu Joins?</h4>
<p>In einer normalisierten Datenbank sind Informationen auf mehrere Tabellen verteilt. Ein JOIN verbindet Zeilen über die <b>Fremdschlüssel-Beziehung</b> (FK = PK).</p>
<h4>Spickzettel</h4>
<pre><code>-- INNER JOIN: nur Zeilen mit Partner in beiden Tabellen
SELECT b.bestell_id, k.nachname
FROM bestellung b
INNER JOIN kunde k ON k.kunden_id = b.kunden_id;

-- LEFT (OUTER) JOIN: alle Zeilen der linken Tabelle, fehlender Partner = NULL
SELECT k.nachname, b.bestell_id
FROM kunde k LEFT JOIN bestellung b ON b.kunden_id = k.kunden_id;

-- "Kunden ohne Bestellung" (Anti-Join)
… LEFT JOIN bestellung b ON b.kunden_id = k.kunden_id WHERE b.bestell_id IS NULL;

-- Mehrfach-Join (n Tabellen → mind. n-1 Join-Bedingungen)
FROM kunde k
JOIN bestellung b       ON b.kunden_id  = k.kunden_id
JOIN bestellposition bp ON bp.bestell_id = b.bestell_id
JOIN artikel a          ON a.artikel_id  = bp.artikel_id

-- Self-Join: Tabelle mit sich selbst (zwei Aliase!)
SELECT m.nachname AS mitarbeiter, v.nachname AS vorgesetzter
FROM mitarbeiter m LEFT JOIN mitarbeiter v ON v.ma_id = m.vorgesetzter_id;</code></pre>
<ul>
<li><b>RIGHT JOIN</b>: wie LEFT, nur alle Zeilen der rechten Tabelle (lässt sich immer durch Vertauschen in einen LEFT JOIN umschreiben).</li>
<li><b>FULL OUTER JOIN</b>: alle Zeilen beider Seiten (MySQL kennt ihn nicht → LEFT JOIN UNION RIGHT JOIN).</li>
<li><b>CROSS JOIN / kartesisches Produkt</b>: jede Zeile mit jeder: <code>FROM kunde, bestellung</code> ohne WHERE-Bedingung liefert 10 × 12 = 120 Zeilen. Erkennungsmerkmal falscher Abfragen: unrealistisch viele Zeilen, gleiche Werte wiederholen sich.</li>
<li>Alte Schreibweise (Theta-Join): <code>FROM kunde k, bestellung b WHERE k.kunden_id = b.kunden_id</code> – entspricht INNER JOIN.</li>
</ul>
<h4>Typische Fallen</h4>
<ul>
<li><b>LEFT JOIN + Bedingung in WHERE</b> auf die rechte Tabelle (z.B. <code>WHERE a.rueckgabe_am IS NULL</code>, <code>WHERE b.status='offen'</code>) macht den LEFT JOIN faktisch zum INNER JOIN. Bedingungen, die nur die „Partner“ einschränken sollen, gehören in die <b>ON</b>-Klausel.</li>
<li>In einer LEFT-JOIN-Kette müssen auch die folgenden Joins LEFT sein, sonst fallen die NULL-Zeilen wieder heraus.</li>
<li>Mehrdeutige Spaltennamen (<code>ort</code>, <code>nachname</code>, <code>…_id</code>) immer mit Tabellenalias qualifizieren.</li>
<li>Joins über 1:n-Beziehungen vervielfachen Zeilen → bei „welche Kunden …“ ggf. <code>DISTINCT</code>.</li>
<li>Die Join-Bedingung verbindet FK mit PK – nicht zwei beliebige gleichnamige Spalten.</li>
</ul>`
    },
    {
      id: "ga2-sql-aggregat",
      part: G,
      title: "SQL: Aggregatfunktionen, GROUP BY, HAVING",
      summary: `<h4>Aggregatfunktionen</h4>
<ul>
<li><code>COUNT(*)</code> zählt <b>Zeilen</b> (auch mit NULL), <code>COUNT(spalte)</code> zählt nur Werte <b>ungleich NULL</b>, <code>COUNT(DISTINCT spalte)</code> zählt verschiedene Werte.</li>
<li><code>SUM()</code>, <code>AVG()</code>, <code>MIN()</code>, <code>MAX()</code> ignorieren NULL-Werte (AVG teilt nur durch die Anzahl der Nicht-NULL-Werte!).</li>
<li>Runden: <code>ROUND(AVG(preis), 2)</code>.</li>
</ul>
<h4>Spickzettel GROUP BY / HAVING</h4>
<pre><code>SELECT k.ort, COUNT(*) AS anzahl, ROUND(AVG(a.preis), 2) AS schnitt
FROM …
WHERE b.status = 'geliefert'      -- filtert ZEILEN vor der Gruppierung
GROUP BY k.ort                    -- eine Ergebniszeile je Ort
HAVING COUNT(*) &gt;= 3              -- filtert GRUPPEN (Aggregate erlaubt)
ORDER BY anzahl DESC;</code></pre>
<p><b>Merksatz:</b> Jede Spalte im SELECT, die nicht in einer Aggregatfunktion steht, muss im <code>GROUP BY</code> stehen. (MySQL im alten Modus und SQLite lassen das zu und liefern dann einen zufälligen Wert – in der Prüfung als Fehler gewertet.)</p>
<h4>WHERE vs. HAVING</h4>
<table><tr><th>WHERE</th><th>HAVING</th></tr>
<tr><td>vor der Gruppierung, auf einzelne Zeilen</td><td>nach der Gruppierung, auf Gruppen</td></tr>
<tr><td>keine Aggregatfunktionen erlaubt</td><td>typischerweise mit Aggregatfunktionen</td></tr></table>
<h4>Aggregation mit JOIN</h4>
<ul>
<li>„… <b>auch</b> Kurse ohne Buchung (mit 0)“ → <code>LEFT JOIN</code> und <code>COUNT(b.buchung_id)</code> – <b>nicht</b> <code>COUNT(*)</code>, das würde 1 statt 0 liefern.</li>
<li>Summen mit NULL-Ergebnis durch <code>COALESCE(SUM(kosten), 0)</code> zu 0 machen.</li>
<li>Gruppieren am besten nach dem <b>Primärschlüssel</b> (und dem Namen), sonst werden z.B. zwei Kunden mit gleichem Nachnamen zusammengefasst.</li>
<li>Umsatz einer Bestellung = <code>SUM(menge * einzelpreis)</code> – erst multiplizieren, dann summieren.</li>
</ul>
<h4>Typische Fallen</h4>
<ul>
<li>Aggregat in WHERE (<code>WHERE COUNT(*) &gt; 2</code>) → Fehler, gehört in HAVING.</li>
<li>Durchschnitt von Summen („durchschnittlicher Bestellwert“) braucht eine Unterabfrage in FROM: erst je Bestellung summieren, dann mitteln.</li>
<li>Ohne GROUP BY liefert eine Aggregatabfrage genau <b>eine</b> Zeile.</li>
<li>Join über 1:n vor dem Aggregieren kann Werte mehrfach zählen (z.B. Kurspreis × Anzahl Buchungen) – genau überlegen, was gezählt/summiert werden soll.</li>
</ul>`
    },
    {
      id: "ga2-sql-subquery",
      part: G,
      title: "SQL: Unterabfragen und Mengenoperationen",
      summary: `<h4>Unterabfrage (Subquery)</h4>
<p>Eine SELECT-Anweisung in Klammern innerhalb einer anderen Anweisung. Einsatzorte: <b>WHERE/HAVING</b>, <b>FROM</b> (abgeleitete Tabelle, braucht Alias), <b>SELECT</b> (skalare Unterabfrage), außerdem in INSERT/UPDATE/DELETE.</p>
<h4>Spickzettel</h4>
<pre><code>-- Vergleich mit Aggregat (Unterabfrage liefert genau 1 Wert)
SELECT bezeichnung, preis FROM artikel
WHERE preis &gt; (SELECT AVG(preis) FROM artikel);

-- IN / NOT IN (Unterabfrage liefert eine Spalte)
SELECT nachname FROM kunde
WHERE kunden_id IN (SELECT kunden_id FROM bestellung WHERE status = 'offen');

-- EXISTS / NOT EXISTS (korreliert: bezieht sich auf die äußere Zeile)
SELECT d.nachname FROM dozent d
WHERE NOT EXISTS (SELECT 1 FROM kurs k WHERE k.dozent_id = d.dozent_id);

-- korreliert: Vergleich mit dem Durchschnitt der EIGENEN Abteilung
SELECT m.nachname, m.gehalt FROM mitarbeiter m
WHERE m.gehalt &gt; (SELECT AVG(m2.gehalt) FROM mitarbeiter m2
                  WHERE m2.abteilung_id = m.abteilung_id);

-- Unterabfrage in FROM
SELECT ROUND(AVG(summe), 2) FROM
  (SELECT bestell_id, SUM(menge * einzelpreis) AS summe
   FROM bestellposition GROUP BY bestell_id) AS t;

-- Mengenoperationen (gleiche Spaltenanzahl, kompatible Typen)
SELECT ort FROM kurs UNION SELECT ort FROM teilnehmer;     -- ohne Duplikate
SELECT ort FROM kurs UNION ALL SELECT ort FROM teilnehmer; -- mit Duplikaten
-- INTERSECT (Schnittmenge), EXCEPT / MINUS (Differenz)</code></pre>
<h4>Unkorreliert vs. korreliert</h4>
<ul>
<li><b>Unkorreliert</b>: Unterabfrage ist eigenständig ausführbar, wird (logisch) einmal ausgewertet.</li>
<li><b>Korreliert</b>: Unterabfrage verwendet eine Spalte der äußeren Abfrage und wird (logisch) für jede äußere Zeile neu ausgewertet – unbedingt unterschiedliche Aliase verwenden.</li>
</ul>
<h4>Typische Fallen</h4>
<ul>
<li><b>NOT IN mit NULL</b>: Enthält die Unterabfrage auch nur einen NULL-Wert, liefert <code>x NOT IN (…)</code> nie TRUE → leeres Ergebnis. Abhilfe: <code>WHERE spalte IS NOT NULL</code> in der Unterabfrage oder <code>NOT EXISTS</code>.</li>
<li><code>=</code> statt <code>IN</code>, wenn die Unterabfrage mehrere Zeilen liefert → Fehler (bzw. in SQLite: nur erster Wert wird verwendet).</li>
<li>„Der teuerste Artikel“ nicht über <code>ORDER BY … LIMIT 1</code>, wenn mehrere gleich teuer sein können – <code>= (SELECT MAX(…))</code> liefert alle.</li>
<li><code>UNION</code> entfernt Duplikate (Sortieraufwand), <code>UNION ALL</code> nicht – wenn Duplikate gewünscht oder ausgeschlossen sind, ist UNION ALL schneller.</li>
<li>Abgeleitete Tabelle in FROM braucht in MySQL zwingend einen Alias.</li>
</ul>`
    },
    {
      id: "ga2-sql-dml",
      part: G,
      title: "SQL: DML – INSERT, UPDATE, DELETE",
      summary: `<h4>DML = Data Manipulation Language</h4>
<p>Ändert den <b>Datenbestand</b>: <code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code> (SELECT wird oft als DQL separat gezählt).</p>
<h4>Spickzettel</h4>
<pre><code>-- INSERT mit Spaltenliste (empfohlen; fehlende Spalten → NULL/DEFAULT)
INSERT INTO kunde (kunden_id, vorname, nachname, ort)
VALUES (11, 'Kai', 'Lorenz', 'Bremen');

-- INSERT ohne Spaltenliste: Werte für ALLE Spalten in Tabellenreihenfolge
INSERT INTO kategorie VALUES (9, 'Drucker', 1);

-- mehrere Zeilen
INSERT INTO kategorie (kategorie_id, bezeichnung) VALUES (10,'Kabel'), (11,'Server');

-- INSERT … SELECT (Daten aus Abfrage übernehmen, KEIN VALUES)
INSERT INTO ticket_archiv (ticket_id, betreff, geloest_am)
SELECT ticket_id, betreff, geloest_am FROM ticket WHERE status = 'geschlossen';

-- UPDATE mit Berechnung
UPDATE artikel SET preis = ROUND(preis * 1.10, 2), bestand = bestand + 5
WHERE kategorie_id = 5;

-- UPDATE mit Unterabfrage
UPDATE buchung SET bezahlt = 1
WHERE teilnehmer_id = (SELECT teilnehmer_id FROM teilnehmer
                       WHERE nachname = 'Berger' AND vorname = 'Max');

-- DELETE mit Unterabfrage
DELETE FROM bestellposition
WHERE bestell_id IN (SELECT bestell_id FROM bestellung WHERE status = 'storniert');</code></pre>
<h4>Fehlende WHERE-Klausel</h4>
<ul>
<li><code>UPDATE artikel SET preis = 0;</code> ändert <b>alle</b> Zeilen.</li>
<li><code>DELETE FROM kunde;</code> löscht <b>alle</b> Zeilen (Tabelle bleibt bestehen).</li>
<li>Gegenmaßnahmen: erst mit <code>SELECT … WHERE …</code> testen, in einer Transaktion arbeiten (<code>ROLLBACK</code> möglich), Backups, „Safe-Update-Mode“ (MySQL).</li>
</ul>
<h4>Integrität beachten</h4>
<ul>
<li>Erst <b>Kind-</b>, dann <b>Elterndatensätze</b> löschen (Bestellpositionen vor Bestellung), sonst FK-Verletzung – außer <code>ON DELETE CASCADE</code> ist definiert.</li>
<li>Beim INSERT müssen FK-Werte in der referenzierten Tabelle existieren; PK- und UNIQUE-Werte dürfen nicht doppelt sein; NOT-NULL-Spalten brauchen einen Wert.</li>
<li>Korrelierte UPDATEs (<code>SET km_stand = (SELECT MAX(…) … WHERE f.fz_id = fahrzeug.fz_id)</code>) setzen Zeilen ohne Treffer auf NULL – mit <code>WHERE EXISTS (…)</code> einschränken.</li>
</ul>
<h4>Typische Fallen</h4>
<ul>
<li><code>INSERT INTO … VALUES (SELECT …)</code> ist falsch – bei INSERT … SELECT entfällt VALUES.</li>
<li>Texte/Datum in Hochkommas, Dezimalpunkt statt Komma (<code>149.90</code>).</li>
<li>Bei UPDATE mehrere Spalten mit Komma trennen, <b>nicht</b> mit AND (<code>SET a = 1 AND b = 2</code> ist ein logischer Ausdruck!).</li>
<li>Prozentuale Erhöhung: <code>preis * 1.10</code>, nicht <code>preis + 10</code> oder <code>preis * 10</code>.</li>
</ul>`
    },
    {
      id: "ga2-sql-transaktionen",
      part: G,
      title: "SQL: Transaktionen, Rechte, Indizes, Sicherheit",
      summary: `<h4>Transaktion & ACID</h4>
<p>Eine Transaktion ist eine Folge von Operationen, die als <b>logische Einheit</b> ganz oder gar nicht ausgeführt wird (z.B. Umbuchung: Abbuchung + Gutschrift).</p>
<ul>
<li><b>A</b>tomicity (Atomarität): alles oder nichts.</li>
<li><b>C</b>onsistency (Konsistenz): von einem konsistenten Zustand in einen konsistenten Zustand (Constraints erfüllt).</li>
<li><b>I</b>solation: parallele Transaktionen beeinflussen sich nicht (als liefen sie nacheinander).</li>
<li><b>D</b>urability (Dauerhaftigkeit): nach COMMIT bleiben Änderungen auch bei Absturz erhalten (Transaktionslog).</li>
</ul>
<pre><code>START TRANSACTION;   -- bzw. BEGIN / BEGIN TRANSACTION
UPDATE konto SET saldo = saldo - 500 WHERE konto_id = 1;
UPDATE konto SET saldo = saldo + 500 WHERE konto_id = 2;
COMMIT;              -- dauerhaft übernehmen   |  ROLLBACK; -- alles zurücknehmen
SAVEPOINT sp1;  ROLLBACK TO sp1;               -- Teil-Rücksetzpunkt</code></pre>
<h4>Isolationsprobleme (Anomalien)</h4>
<table><tr><th>Problem</th><th>Beschreibung</th><th>verhindert ab</th></tr>
<tr><td>Lost Update</td><td>zwei Transaktionen lesen denselben Wert, beide schreiben – eine Änderung geht verloren</td><td>Sperren / höhere Isolation</td></tr>
<tr><td>Dirty Read</td><td>Lesen nicht festgeschriebener Daten, die später per ROLLBACK verworfen werden</td><td>READ COMMITTED</td></tr>
<tr><td>Non-Repeatable Read</td><td>wiederholtes Lesen derselben Zeile liefert anderen Wert</td><td>REPEATABLE READ</td></tr>
<tr><td>Phantom Read</td><td>wiederholte Abfrage liefert neue/fehlende Zeilen</td><td>SERIALIZABLE</td></tr></table>
<p><b>Sperren</b>: Lesesperre (shared lock, mehrere Leser), Schreibsperre (exclusive lock, exklusiv). <code>SELECT … FOR UPDATE</code> sperrt Zeilen zum Ändern. Gefahr: <b>Deadlock</b> (gegenseitiges Warten) – DBMS bricht eine Transaktion ab.</p>
<h4>DCL – Rechte</h4>
<pre><code>CREATE USER 'azubi'@'localhost' IDENTIFIED BY '…';
GRANT SELECT, INSERT ON shop.bestellung TO 'azubi'@'localhost';
GRANT UPDATE (preis) ON artikel TO vertrieb;      -- spaltenbezogen
REVOKE INSERT ON shop.bestellung FROM 'azubi'@'localhost';
CREATE ROLE support; GRANT SELECT ON ticket TO support; GRANT support TO 'mueller';</code></pre>
<p><b>Views für Rechtekonzepte</b>: Eine View blendet sensible Spalten/Zeilen aus (z.B. ohne <code>gehalt</code>); Benutzer erhalten nur Rechte auf die View, nicht auf die Basistabelle. Prinzip der minimalen Rechte (Least Privilege).</p>
<h4>Indizes</h4>
<ul><li>+ schnelleres Suchen, Sortieren, Joinen (B-Baum statt Full Table Scan); UNIQUE-Index sichert Eindeutigkeit.</li>
<li>− zusätzlicher Speicher, langsamere INSERT/UPDATE/DELETE (Index muss gepflegt werden); bei kleinen Tabellen oder Spalten mit wenigen verschiedenen Werten kaum Nutzen.</li></ul>
<h4>Trigger & Stored Procedure</h4>
<ul><li><b>Trigger</b>: wird automatisch bei INSERT/UPDATE/DELETE auf einer Tabelle ausgeführt (BEFORE/AFTER), z.B. Protokollierung, Bestand anpassen.</li>
<li><b>Stored Procedure</b>: in der DB gespeicherte, benannte Routine mit Parametern, wird explizit mit <code>CALL</code> aufgerufen; Logik nahe an den Daten, weniger Netzwerkverkehr, Rechte nur auf die Prozedur.</li></ul>
<h4>SQL-Injection</h4>
<p>Benutzereingaben werden ungeprüft in einen SQL-String eingebaut, z.B. Eingabe <code>' OR '1'='1</code>. Schutz: <b>Prepared Statements</b> mit Platzhaltern (<code>?</code>), Parameter werden getrennt vom SQL-Code übertragen; zusätzlich Eingabevalidierung, minimale DB-Rechte, keine Fehlermeldungen mit SQL-Details an den Nutzer.</p>
<h4>Normalisierung und Abfragen</h4>
<p>Redundanz (nicht normalisierte Tabellen) führt zu <b>Anomalien</b> (Einfüge-, Änderungs-, Löschanomalie) und damit zu widersprüchlichen Abfrageergebnissen. Normalisierte Tabellen (3NF) brauchen dafür mehr JOINs; für Auswertungen wird manchmal bewusst denormalisiert.</p>`
    }
  );

  // ===========================================================================
  // DDL
  // ===========================================================================
  var RAUM_SQL = "CREATE TABLE raum (\n  raum_id INTEGER PRIMARY KEY,\n  bezeichnung VARCHAR(30) NOT NULL,\n  kapazitaet INTEGER,\n  ort VARCHAR(50)\n);\nINSERT INTO raum VALUES (1,'Raum Turing',12,'Berlin'),(2,'Raum Lovelace',16,'Berlin'),(3,'Raum Zuse',10,'Hamburg'),(4,'Raum Hopper',14,'München'),(5,'Virtueller Raum',30,'Online');\n";
  var RAUM_SCHEMA = "<p>Zusätzlich existiert bereits die Tabelle <b>raum</b>: <u>raum_id</u> <small>INTEGER, PK</small>, bezeichnung <small>VARCHAR(30), NOT NULL</small>, kapazitaet <small>INTEGER</small>, ort <small>VARCHAR(50)</small>.</p>";

  Q({
    id: "ga2-sql-ddl-001",
    topic: "ga2-sql-ddl",
    type: "sql",
    difficulty: 1,
    points: 6,
    context: ctx(SEMINAR, "Die IT-Akademie Nord möchte künftig auch ihre Schulungsräume in der Datenbank verwalten."),
    question: `Erstellen Sie eine SQL-Anweisung, die die Tabelle <code>raum</code> mit folgenden Spalten anlegt:
<ul><li><code>raum_id</code> – ganze Zahl, Primärschlüssel</li>
<li><code>bezeichnung</code> – Zeichenkette mit max. 30 Zeichen, Pflichtfeld</li>
<li><code>kapazitaet</code> – ganze Zahl</li>
<li><code>ort</code> – Zeichenkette mit max. 50 Zeichen</li></ul>
<p><small>Geprüft werden Spaltennamen, Primärschlüssel und NOT-NULL-Eigenschaft.</small></p>`,
    sql: {
      setup: SEMINAR.sql,
      solution: "CREATE TABLE raum (\n  raum_id INTEGER PRIMARY KEY,\n  bezeichnung VARCHAR(30) NOT NULL,\n  kapazitaet INTEGER,\n  ort VARCHAR(50)\n)",
      check: "SELECT lower(name), CASE WHEN pk > 0 THEN 1 ELSE 0 END, CASE WHEN pk > 0 OR \"notnull\" = 1 THEN 1 ELSE 0 END FROM pragma_table_info('raum')",
      ordered: false
    },
    solution: pre("CREATE TABLE raum (\n  raum_id     INTEGER     PRIMARY KEY,\n  bezeichnung VARCHAR(30) NOT NULL,\n  kapazitaet  INTEGER,\n  ort         VARCHAR(50)\n);") +
      "<p>Jede Spalte wird mit Name, Datentyp und optionalen Constraints angegeben, die Definitionen werden durch Kommas getrennt. Alternativ kann der Primärschlüssel am Ende als <code>PRIMARY KEY (raum_id)</code> angegeben werden.</p>",
    explanation: "Typische Fehler: Komma nach der letzten Spalte, <code>NOT NULL</code> bei bezeichnung vergessen, VARCHAR ohne Längenangabe (in MySQL ein Fehler). In MySQL würde man für automatisch vergebene IDs <code>INT AUTO_INCREMENT PRIMARY KEY</code> schreiben – in SQLite übernimmt das <code>INTEGER PRIMARY KEY</code>.",
    tags: ["CREATE TABLE", "PRIMARY KEY", "NOT NULL"]
  });

  Q({
    id: "ga2-sql-ddl-002",
    topic: "ga2-sql-ddl",
    type: "sql",
    difficulty: 2,
    points: 8,
    context: ctx(SEMINAR, "Kurse finden an bestimmten Tagen in bestimmten Räumen statt. Ein Raum kann an einem Datum nur von einem Kurs belegt sein.", { extraSchema: RAUM_SCHEMA }),
    question: `Erstellen Sie die SQL-Anweisung für die Tabelle <code>belegung</code> mit den Spalten <code>raum_id</code> (ganze Zahl), <code>datum</code> (Datum) und <code>kurs_id</code> (ganze Zahl, Pflichtfeld).
<ul><li>Der Primärschlüssel setzt sich aus <code>raum_id</code> und <code>datum</code> zusammen.</li>
<li><code>raum_id</code> verweist auf die Tabelle <code>raum</code>, <code>kurs_id</code> auf die Tabelle <code>kurs</code>.</li></ul>
<p><small>Geprüft werden Spaltennamen, Primärschlüssel, NOT NULL und Fremdschlüssel.</small></p>`,
    sql: {
      setup: SEMINAR.sql + RAUM_SQL,
      solution: "CREATE TABLE belegung (\n  raum_id INTEGER,\n  datum DATE,\n  kurs_id INTEGER NOT NULL,\n  PRIMARY KEY (raum_id, datum),\n  FOREIGN KEY (raum_id) REFERENCES raum(raum_id),\n  FOREIGN KEY (kurs_id) REFERENCES kurs(kurs_id)\n)",
      check: "SELECT 'spalte', lower(name), CASE WHEN pk > 0 THEN 1 ELSE 0 END, CASE WHEN pk > 0 OR \"notnull\" = 1 THEN 1 ELSE 0 END FROM pragma_table_info('belegung') UNION ALL SELECT 'fk', lower(\"from\"), lower(\"table\"), 0 FROM pragma_foreign_key_list('belegung')",
      ordered: false
    },
    solution: pre("CREATE TABLE belegung (\n  raum_id INTEGER,\n  datum   DATE,\n  kurs_id INTEGER NOT NULL,\n  PRIMARY KEY (raum_id, datum),\n  FOREIGN KEY (raum_id) REFERENCES raum(raum_id),\n  FOREIGN KEY (kurs_id) REFERENCES kurs(kurs_id)\n);") +
      "<p>Ein <b>zusammengesetzter Primärschlüssel</b> muss als Tabellen-Constraint am Ende angegeben werden. Die Fremdschlüssel sichern die referenzielle Integrität: Es können nur existierende Räume und Kurse eingetragen werden.</p>",
    explanation: "Häufiger Fehler: <code>raum_id INTEGER PRIMARY KEY, datum DATE PRIMARY KEY</code> – zwei PRIMARY-KEY-Angaben sind nicht erlaubt (eine Tabelle hat genau einen Primärschlüssel, der aber aus mehreren Spalten bestehen kann). Ebenfalls falsch: <code>FOREIGN KEY raum_id …</code> ohne Klammern um die Spalte.",
    tags: ["CREATE TABLE", "FOREIGN KEY", "zusammengesetzter Schlüssel"]
  });

  Q({
    id: "ga2-sql-ddl-003",
    topic: "ga2-sql-ddl",
    type: "sql",
    difficulty: 1,
    points: 4,
    context: ctx(SHOP, "Kunden sollen sich künftig für den Newsletter anmelden können. Bestehende Kunden gelten zunächst als nicht angemeldet."),
    question: `Erstellen Sie eine SQL-Anweisung, die der bestehenden Tabelle <code>kunde</code> die Spalte <code>newsletter</code> (ganze Zahl, 0 = nein, 1 = ja) mit dem Standardwert <code>0</code> hinzufügt.`,
    sql: {
      setup: SHOP.sql,
      solution: "ALTER TABLE kunde ADD COLUMN newsletter INTEGER DEFAULT 0",
      check: "SELECT kunden_id, newsletter FROM kunde",
      ordered: false
    },
    solution: pre("ALTER TABLE kunde ADD COLUMN newsletter INTEGER DEFAULT 0;") +
      "<p>Mit <code>ALTER TABLE … ADD</code> wird die Tabellenstruktur geändert, ohne bestehende Daten zu verlieren. Durch <code>DEFAULT 0</code> erhalten alle vorhandenen Zeilen automatisch den Wert 0.</p>",
    explanation: "Ohne <code>DEFAULT 0</code> hätten alle bestehenden Kunden den Wert NULL. In MySQL ist das Schlüsselwort <code>COLUMN</code> optional (<code>ALTER TABLE kunde ADD newsletter BOOLEAN DEFAULT FALSE</code>). Falsch wäre <code>UPDATE</code> – das ändert Daten, nicht die Struktur.",
    tags: ["ALTER TABLE", "DEFAULT"]
  });

  Q({
    id: "ga2-sql-ddl-004",
    topic: "ga2-sql-ddl",
    type: "sql",
    difficulty: 2,
    points: 6,
    context: ctx(SUPPORT, "Die Mitarbeiter des 1st-Level-Supports sollen eine vereinfachte Sicht auf alle noch nicht abgeschlossenen Tickets erhalten."),
    question: `Erstellen Sie eine View <code>v_offene_tickets</code>, die für alle Tickets, deren Status <b>nicht</b> 'geschlossen' ist, die Spalten <code>ticket_id</code>, <code>betreff</code> und <code>prioritaet</code> (in dieser Reihenfolge) enthält.`,
    sql: {
      setup: SUPPORT.sql,
      solution: "CREATE VIEW v_offene_tickets AS\nSELECT ticket_id, betreff, prioritaet\nFROM ticket\nWHERE status <> 'geschlossen'",
      check: "SELECT * FROM v_offene_tickets",
      ordered: false
    },
    solution: pre("CREATE VIEW v_offene_tickets AS\nSELECT ticket_id, betreff, prioritaet\nFROM ticket\nWHERE status <> 'geschlossen';") +
      "<p>Eine View ist eine gespeicherte Abfrage (virtuelle Tabelle). Sie kann anschließend wie eine Tabelle verwendet werden: <code>SELECT * FROM v_offene_tickets;</code>. Es werden 6 Tickets geliefert (Status 'offen' und 'in Bearbeitung').</p>",
    explanation: "Typischer Fehler: <code>WHERE status = 'offen'</code> – dann fehlen die Tickets mit Status 'in Bearbeitung'. Alternativ korrekt: <code>WHERE status IN ('offen','in Bearbeitung')</code> oder <code>WHERE geloest_am IS NULL</code>. Views eignen sich auch für Rechtekonzepte (Benutzer bekommen nur Zugriff auf die View).",
    tags: ["CREATE VIEW"]
  });

  Q({
    id: "ga2-sql-ddl-005",
    topic: "ga2-sql-ddl",
    type: "sql",
    difficulty: 2,
    points: 4,
    context: ctx(FUHRPARK, "Fahrzeuge werden in der Anwendung fast immer über das Kennzeichen gesucht. Außerdem darf jedes Kennzeichen nur einmal vorkommen."),
    question: `Erstellen Sie einen Index mit dem Namen <code>idx_fahrzeug_kennzeichen</code> auf der Spalte <code>kennzeichen</code> der Tabelle <code>fahrzeug</code>, der zugleich die <b>Eindeutigkeit</b> der Kennzeichen sicherstellt.`,
    sql: {
      setup: FUHRPARK.sql,
      solution: "CREATE UNIQUE INDEX idx_fahrzeug_kennzeichen ON fahrzeug(kennzeichen)",
      check: "SELECT lower(ii.name), il.\"unique\" FROM pragma_index_list('fahrzeug') AS il, pragma_index_info(il.name) AS ii WHERE il.origin = 'c'",
      ordered: false
    },
    solution: pre("CREATE UNIQUE INDEX idx_fahrzeug_kennzeichen ON fahrzeug(kennzeichen);") +
      "<p>Ein Index beschleunigt Suchen (<code>WHERE kennzeichen = 'B-FI 101'</code>), weil statt eines vollständigen Tabellendurchlaufs ein B-Baum durchsucht wird. Mit <code>UNIQUE</code> lehnt die Datenbank doppelte Kennzeichen ab.</p>",
    explanation: "Ohne <code>UNIQUE</code> wäre der Index nur ein Suchindex. Nachteile eines Index: zusätzlicher Speicherplatz und langsamere INSERT/UPDATE/DELETE-Operationen, weil der Index mitgepflegt werden muss. Alternativ: <code>ALTER TABLE fahrzeug ADD CONSTRAINT uq_kennz UNIQUE (kennzeichen)</code> (nicht in SQLite).",
    tags: ["CREATE INDEX", "UNIQUE"]
  });

  Q({
    id: "ga2-sql-ddl-006",
    topic: "ga2-sql-ddl",
    type: "code",
    lang: "sql",
    difficulty: 3,
    points: 10,
    context: `<p>Für eine neue Mietwagen-Anwendung soll die Tabelle <b>mietvertrag</b> angelegt werden. Die Tabellen <b>kunde</b> (PK <code>kunden_id INT</code>) und <b>fahrzeug</b> (PK <code>fz_id INT</code>) existieren bereits.</p>
<table><tr><th>Spalte</th><th>Anforderung</th></tr>
<tr><td>vertrag_id</td><td>ganze Zahl, Primärschlüssel, automatisch fortlaufend</td></tr>
<tr><td>kunden_id</td><td>Pflichtfeld, Fremdschlüssel auf kunde</td></tr>
<tr><td>fz_id</td><td>Pflichtfeld, Fremdschlüssel auf fahrzeug</td></tr>
<tr><td>beginn, ende</td><td>Datum, beginn ist Pflicht; ende darf nicht vor beginn liegen</td></tr>
<tr><td>tagespreis</td><td>Geldbetrag mit 2 Nachkommastellen (max. 9999,99), größer 0</td></tr>
<tr><td>vertragsnr</td><td>Zeichenkette, 12 Zeichen, eindeutig</td></tr>
<tr><td>status</td><td>Standardwert 'reserviert'</td></tr></table>`,
    question: "Erstellen Sie die CREATE-TABLE-Anweisung (MySQL-Syntax) für die Tabelle <code>mietvertrag</code>.",
    starter: "CREATE TABLE mietvertrag (\n  \n);",
    solution: pre("CREATE TABLE mietvertrag (\n  vertrag_id INT AUTO_INCREMENT PRIMARY KEY,\n  kunden_id  INT NOT NULL,\n  fz_id      INT NOT NULL,\n  beginn     DATE NOT NULL,\n  ende       DATE,\n  tagespreis DECIMAL(6,2) CHECK (tagespreis > 0),\n  vertragsnr CHAR(12) UNIQUE,\n  status     VARCHAR(20) DEFAULT 'reserviert',\n  CHECK (ende >= beginn),\n  FOREIGN KEY (kunden_id) REFERENCES kunde(kunden_id),\n  FOREIGN KEY (fz_id)     REFERENCES fahrzeug(fz_id)\n);") +
      "<p>DECIMAL(6,2): 6 Stellen insgesamt, davon 2 nach dem Komma → max. 9999,99. Die Bedingung „ende nicht vor beginn“ betrifft zwei Spalten und wird daher als Tabellen-CHECK formuliert.</p>",
    explanation: "Bewertet werden: korrekte Datentypen (DECIMAL statt FLOAT für Geld), PRIMARY KEY mit AUTO_INCREMENT, beide FOREIGN KEY … REFERENCES, NOT NULL, UNIQUE, DEFAULT und CHECK. Häufige Fehler: FLOAT für Geldbeträge, DECIMAL(2,6) (vertauscht), fehlende Klammern bei FOREIGN KEY (spalte).",
    keywords: ["create table", "primary key", "auto_increment", "foreign key|references", "not null", "decimal", "unique", "default", "check", "date"],
    tags: ["CREATE TABLE", "CHECK", "DEFAULT"]
  });

  Q({
    id: "ga2-sql-ddl-007",
    topic: "ga2-sql-ddl",
    type: "mc",
    difficulty: 1,
    points: 2,
    question: "Die Tabelle <code>wartung</code> wird nicht mehr benötigt. Sowohl die Daten als auch die Tabellenstruktur sollen dauerhaft entfernt werden. Welche Anweisung ist richtig?",
    options: ["DELETE FROM wartung;", "DROP TABLE wartung;", "ALTER TABLE wartung DROP COLUMN *;", "TRUNCATE TABLE wartung;"],
    correct: [1],
    solution: "<p><code>DROP TABLE wartung;</code> entfernt die Tabelle samt Struktur, Daten, Indizes und Constraints.</p>",
    explanation: "<code>DELETE FROM</code> (DML) und <code>TRUNCATE</code> (DDL) entfernen nur die Datensätze, die leere Tabelle bleibt bestehen. TRUNCATE ist schneller, protokolliert nicht zeilenweise und setzt AUTO_INCREMENT zurück. <code>DROP COLUMN *</code> gibt es nicht."
  });

  Q({
    id: "ga2-sql-ddl-008",
    topic: "ga2-sql-ddl",
    type: "multi",
    difficulty: 2,
    points: 4,
    question: "Welche Aussagen zu Schlüsseln und Constraints sind zutreffend? (Mehrere Antworten möglich)",
    options: [
      "Ein Primärschlüssel darf keine NULL-Werte enthalten und muss eindeutig sein.",
      "Eine Tabelle kann mehrere Primärschlüssel haben, aber nur einen Fremdschlüssel.",
      "Ein Fremdschlüssel darf – sofern nicht NOT NULL – den Wert NULL annehmen.",
      "Eine Spalte mit UNIQUE-Constraint ist automatisch der Primärschlüssel.",
      "Ein Primärschlüssel kann aus mehreren Spalten zusammengesetzt sein.",
      "Ein Fremdschlüssel muss immer auf eine Spalte derselben Tabelle verweisen."
    ],
    correct: [0, 2, 4],
    solution: "<p>Richtig sind 1, 3 und 5. Eine Tabelle hat genau einen Primärschlüssel (ggf. zusammengesetzt), aber beliebig viele Fremdschlüssel. UNIQUE erzwingt nur Eindeutigkeit (NULL erlaubt) – solche Spalten sind Schlüsselkandidaten. Fremdschlüssel verweisen in der Regel auf eine <b>andere</b> Tabelle; der Verweis auf dieselbe Tabelle (z.B. <code>vorgesetzter_id</code>) ist ein Sonderfall (rekursive Beziehung).</p>"
  });

  Q({
    id: "ga2-sql-ddl-009",
    topic: "ga2-sql-ddl",
    type: "text",
    difficulty: 2,
    points: 6,
    context: "<p>Ein Kollege hat folgende Anweisung für MySQL geschrieben. Die Tabelle <code>kunde</code> mit PK <code>kunden_id INT</code> existiert.</p>" +
      pre("CREATE TABLE bestellung (\n  bestell_id INT PRIMARY KEY,\n  kunden_id INT NOT NULL,\n  bestelldatum DATE NOT NULL,\n  gesamtbetrag FLOAT,\n  status VARCHAR DEFAULT offen,\n  FOREIGN KEY kunden_id REFERENCES kunde(kunden_id),\n);"),
    question: "Die Anweisung enthält vier Fehler bzw. fachliche Mängel. Nennen Sie diese und geben Sie jeweils die Korrektur an.",
    solution: "<ol><li><code>VARCHAR</code> ohne Längenangabe → <code>VARCHAR(20)</code>.</li><li>Textliteral ohne Hochkommas: <code>DEFAULT offen</code> → <code>DEFAULT 'offen'</code>.</li><li>Fremdschlüsselspalte ohne Klammern: <code>FOREIGN KEY (kunden_id) REFERENCES kunde(kunden_id)</code>.</li><li>Komma nach der letzten Definition vor <code>)</code> entfernen.</li></ol><p>Fachlicher Mangel zusätzlich: Geldbeträge nicht als <code>FLOAT</code> (Rundungsfehler bei Binärdarstellung), sondern <code>DECIMAL(10,2)</code> speichern.</p>",
    explanation: "In der IHK-Prüfung wird bei „Fehler finden“ meist Fehler + Korrektur erwartet. Achten Sie auf Kommas, Klammern, Hochkommas und Längenangaben.",
    keywords: ["varchar(", "hochkomma|anführungszeichen|'offen'", "klammer|(kunden_id)", "komma", "decimal", "float"]
  });

  Q({
    id: "ga2-sql-ddl-010",
    topic: "ga2-sql-ddl",
    type: "mc",
    difficulty: 2,
    points: 3,
    context: pre("CREATE TABLE bestellposition (\n  bestell_id INT REFERENCES bestellung(bestell_id) ON DELETE CASCADE,\n  artikel_id INT REFERENCES artikel(artikel_id) ON DELETE RESTRICT,\n  menge INT,\n  PRIMARY KEY (bestell_id, artikel_id)\n);"),
    question: "Was passiert, wenn die Bestellung 1006 (mit drei Bestellpositionen) mit <code>DELETE FROM bestellung WHERE bestell_id = 1006;</code> gelöscht wird?",
    options: [
      "Das Löschen wird abgelehnt, weil noch Bestellpositionen existieren.",
      "Die Bestellung und automatisch auch ihre drei Bestellpositionen werden gelöscht.",
      "Die Bestellung wird gelöscht, bei den Bestellpositionen wird bestell_id auf NULL gesetzt.",
      "Die Bestellung, ihre Positionen und die enthaltenen Artikel werden gelöscht."
    ],
    correct: [1],
    solution: "<p><code>ON DELETE CASCADE</code> bewirkt, dass beim Löschen des Elterndatensatzes (bestellung) alle abhängigen Kinddatensätze (bestellposition) mitgelöscht werden. Die Artikel bleiben unberührt – <code>ON DELETE RESTRICT</code> bei artikel_id betrifft nur das Löschen von Artikeln.</p>",
    explanation: "SET NULL wäre <code>ON DELETE SET NULL</code> (hier ohnehin unmöglich, da die Spalte Teil des PK ist). RESTRICT/NO ACTION verhindert das Löschen, solange Kinddatensätze existieren."
  });

  // ===========================================================================
  // SELECT
  // ===========================================================================
  function S(id, d, pts, db, ctxText, question, solutionSql, erl, explanation, opts) {
    opts = opts || {};
    Q({
      id: "ga2-sql-select-" + id,
      topic: "ga2-sql-select",
      type: "sql",
      difficulty: d,
      points: pts,
      context: ctx(db, ctxText),
      question: question,
      sql: { setup: db.sql, solution: solutionSql, ordered: !!opts.ordered },
      solution: pre(solutionSql + ";") + "<p>" + erl + "</p>",
      explanation: explanation,
      tags: opts.tags || ["SELECT"]
    });
  }

  S("001", 1, 3, SHOP, "Die Marketingabteilung plant eine Aktion für günstige Artikel.",
    "Erstellen Sie eine SQL-Abfrage, die <code>bezeichnung</code> und <code>preis</code> aller Artikel ausgibt, die weniger als 100 € kosten. Die teuersten Artikel sollen zuerst erscheinen.",
    "SELECT bezeichnung, preis\nFROM artikel\nWHERE preis < 100\nORDER BY preis DESC",
    "Es werden 5 Artikel geliefert, beginnend mit „Tastatur mechanisch“ (89,90 €).",
    "Typische Fehler: <code>ORDER BY preis</code> ohne <code>DESC</code> (sortiert aufsteigend), Preis in Hochkommas oder mit Dezimalkomma (<code>100,00</code>). Die Reihenfolge der Klauseln ist fest: SELECT – FROM – WHERE – ORDER BY.",
    { ordered: true, tags: ["WHERE", "ORDER BY"] });

  S("002", 1, 3, SHOP, "Für eine Regionalwerbung werden Kunden aus Berlin und München benötigt.",
    "Geben Sie <code>nachname</code>, <code>vorname</code> und <code>ort</code> aller Kunden aus, die in Berlin <b>oder</b> München wohnen. Sortieren Sie aufsteigend nach Nachname.",
    "SELECT nachname, vorname, ort\nFROM kunde\nWHERE ort = 'Berlin' OR ort = 'München'\nORDER BY nachname",
    "Alternativ: <code>WHERE ort IN ('Berlin', 'München')</code>. Ergebnis: Meyer, Müller, Schmidt, Schneider.",
    "Häufiger Denkfehler: „Kunden aus Berlin <i>und</i> München“ als <code>ort = 'Berlin' AND ort = 'München'</code> – eine Zeile kann nicht gleichzeitig zwei Orte haben, das Ergebnis wäre leer.",
    { ordered: true, tags: ["WHERE", "OR", "IN"] });

  S("003", 1, 2, SHOP, "Für eine Datenbereinigung sollen Kunden ohne hinterlegte E-Mail-Adresse angeschrieben werden.",
    "Geben Sie <code>kunden_id</code> und <code>nachname</code> aller Kunden aus, für die <b>keine</b> E-Mail-Adresse gespeichert ist.",
    "SELECT kunden_id, nachname\nFROM kunde\nWHERE email IS NULL",
    "Fehlende Werte sind NULL und werden ausschließlich mit <code>IS NULL</code> geprüft. Ergebnis: Weber, Meyer, Schulz.",
    "<code>WHERE email = NULL</code> liefert keine einzige Zeile, weil jeder Vergleich mit NULL den Wahrheitswert UNKNOWN ergibt (dreiwertige Logik). <code>WHERE email = ''</code> findet nur leere Zeichenketten, nicht NULL.",
    { tags: ["IS NULL"] });

  S("004", 1, 3, SEMINAR, "",
    "Geben Sie <code>titel</code> und <code>beginn</code> aller Kurse aus, deren Titel das Wort „für“ an einer beliebigen Stelle enthält.",
    "SELECT titel, beginn\nFROM kurs\nWHERE titel LIKE '%für%'",
    "<code>%</code> steht für beliebig viele (auch null) Zeichen. Ergebnis: „SQL für Fortgeschrittene“ und „Kotlin für Android“.",
    "<code>LIKE 'für%'</code> findet nur Titel, die mit „für“ <i>beginnen</i>; <code>= '%für%'</code> vergleicht exakt mit dem Text „%für%“ (Platzhalter wirken nur bei LIKE). In manchen Systemen ist <code>*</code> der Platzhalter (MS Access) – in SQL ist es <code>%</code>.",
    { tags: ["LIKE"] });

  S("005", 1, 3, SEMINAR, "",
    "Geben Sie <code>titel</code> und <code>beginn</code> aller Kurse aus, die im Zeitraum vom 01.03.2026 bis einschließlich 30.06.2026 beginnen, sortiert nach Kursbeginn.",
    "SELECT titel, beginn\nFROM kurs\nWHERE beginn BETWEEN '2026-03-01' AND '2026-06-30'\nORDER BY beginn",
    "BETWEEN schließt beide Grenzen ein. Datumswerte im ISO-Format 'YYYY-MM-DD' lassen sich als Text korrekt vergleichen. Ergebnis: 4 Kurse (SQL für Fortgeschrittene, Python kompakt, Netzwerktechnik, Scrum Master).",
    "Datumswerte müssen in Hochkommas stehen: <code>BETWEEN 2026-03-01 AND …</code> würde als Rechnung 2026 − 3 − 1 = 2022 interpretiert. Das deutsche Format '01.03.2026' ist nicht sortierbar.",
    { ordered: true, tags: ["BETWEEN", "Datum"] });

  S("006", 2, 3, SHOP, "",
    "Erstellen Sie eine alphabetisch sortierte Liste aller Orte, in denen Kunden mit hinterlegter E-Mail-Adresse wohnen. Jeder Ort soll nur <b>einmal</b> erscheinen.",
    "SELECT DISTINCT ort\nFROM kunde\nWHERE email IS NOT NULL\nORDER BY ort",
    "<code>DISTINCT</code> entfernt doppelte Ergebniszeilen. Ergebnis: Berlin, Hamburg, Köln, München, Stuttgart.",
    "Ohne DISTINCT erscheinen Berlin und Hamburg doppelt. Alternativ wäre <code>GROUP BY ort</code> möglich. Achtung: DISTINCT bezieht sich immer auf die <b>gesamte</b> Zeile – <code>SELECT DISTINCT ort, nachname</code> würde wieder alle Kunden liefern.",
    { ordered: true, tags: ["DISTINCT", "IS NOT NULL"] });

  S("007", 2, 4, SHOP, "Für die Inventur wird der Lagerwert je Artikel (Preis × Bestand) benötigt.",
    "Geben Sie für alle Artikel mit einem Bestand größer 0 die <code>bezeichnung</code> und den Lagerwert (Alias <code>lagerwert</code>, auf 2 Nachkommastellen gerundet mit <code>ROUND</code>) aus. Sortieren Sie absteigend nach Lagerwert.",
    "SELECT bezeichnung, ROUND(preis * bestand, 2) AS lagerwert\nFROM artikel\nWHERE bestand > 0\nORDER BY lagerwert DESC",
    "Berechnete Spalten werden direkt im SELECT angegeben und mit <code>AS</code> benannt. Der Alias darf in ORDER BY (nicht aber in WHERE) verwendet werden. Spitzenreiter: Notebook ProBook 450 mit 10 788,00 €.",
    "<code>WHERE lagerwert &gt; 0</code> funktioniert nicht, da WHERE vor SELECT ausgewertet wird. Ohne die Bedingung <code>bestand &gt; 0</code> erscheinen der Monitor mit Bestand 0 und das Headset mit Bestand NULL (Lagerwert NULL).",
    { ordered: true, tags: ["berechnete Spalte", "Alias", "ROUND"] });

  S("008", 2, 3, SEMINAR, "",
    "Geben Sie <code>nachname</code>, <code>vorname</code> und <code>ort</code> aller Teilnehmer aus, die <b>weder</b> in Berlin <b>noch</b> in Hamburg wohnen, sortiert nach Nachname.",
    "SELECT nachname, vorname, ort\nFROM teilnehmer\nWHERE ort NOT IN ('Berlin', 'Hamburg')\nORDER BY nachname",
    "Gleichwertig: <code>WHERE ort &lt;&gt; 'Berlin' AND ort &lt;&gt; 'Hamburg'</code>. Ergebnis: Dietrich, Engel, Franke, Graf, Ivanova, Keller.",
    "Klassischer Logikfehler: <code>ort &lt;&gt; 'Berlin' OR ort &lt;&gt; 'Hamburg'</code> ist für <b>jede</b> Zeile wahr (De Morgan: NOT (A OR B) = NOT A AND NOT B).",
    { ordered: true, tags: ["NOT IN", "De Morgan"] });

  S("009", 2, 4, SEMINAR, "Für Namensschilder der Selbstzahler (Teilnehmer ohne Firma) wird eine Kurzform des Namens benötigt.",
    "Geben Sie für alle Teilnehmer ohne Firmenzugehörigkeit eine einzige Spalte <code>namensschild</code> im Format <code>M. Berger</code> (erster Buchstabe des Vornamens, Punkt, Leerzeichen, Nachname) aus, alphabetisch nach Nachname sortiert. <small>Hinweis: In SQLite werden Zeichenketten mit <code>||</code> verkettet, Teilstrings mit <code>SUBSTR(text, start, länge)</code> gebildet.</small>",
    "SELECT SUBSTR(vorname, 1, 1) || '. ' || nachname AS namensschild\nFROM teilnehmer\nWHERE firma IS NULL\nORDER BY nachname",
    "Ergebnis: M. Berger, S. Engel, J. Hartmann, L. Keller. In MySQL lautet die Lösung <code>CONCAT(LEFT(vorname, 1), '. ', nachname)</code>.",
    "In MySQL ist <code>||</code> standardmäßig ein logisches ODER! Dort <code>CONCAT()</code> verwenden. SUBSTR beginnt bei Position 1, nicht 0.",
    { ordered: true, tags: ["Stringfunktionen", "Verkettung"] });

  S("010", 2, 5, SHOP, "Die Logistik möchte Bestellungen mit langer Bearbeitungszeit analysieren.",
    "Geben Sie <code>bestell_id</code>, <code>bestelldatum</code> und <code>versanddatum</code> aller Bestellungen aus, bei denen zwischen Bestellung und Versand <b>mehr als 2 Tage</b> lagen. <small>Hinweis: In SQLite liefert <code>julianday(datum)</code> eine Tageszahl, mit der gerechnet werden kann.</small>",
    "SELECT bestell_id, bestelldatum, versanddatum\nFROM bestellung\nWHERE julianday(versanddatum) - julianday(bestelldatum) > 2",
    "Die Differenz zweier julianday-Werte ergibt die Anzahl Tage – auch über Monatsgrenzen hinweg (Bestellung 1008: 30.06. → 02.07. = 2 Tage). Ergebnis: Bestellungen 1004 und 1007. In MySQL: <code>WHERE DATEDIFF(versanddatum, bestelldatum) &gt; 2</code>.",
    "<code>versanddatum - bestelldatum</code> rechnet in SQLite mit Texten (ergibt 0), in MySQL mit Zahlen wie 20260223 − 20260220 – über Monatsgrenzen falsch. Bestellungen ohne Versanddatum fallen automatisch heraus, da die Differenz NULL ist.",
    { tags: ["Datum", "julianday", "DATEDIFF"] });

  S("011", 2, 3, SEMINAR, "",
    "Geben Sie <code>nachname</code>, <code>vorname</code> und <code>geburtsdatum</code> aller Teilnehmer aus, die in den Jahren 1990 bis 1999 geboren wurden, sortiert nach Geburtsdatum (ältester zuerst).",
    "SELECT nachname, vorname, geburtsdatum\nFROM teilnehmer\nWHERE geburtsdatum BETWEEN '1990-01-01' AND '1999-12-31'\nORDER BY geburtsdatum",
    "Alternativ in SQLite: <code>WHERE strftime('%Y', geburtsdatum) BETWEEN '1990' AND '1999'</code>, in MySQL: <code>WHERE YEAR(geburtsdatum) BETWEEN 1990 AND 1999</code>. Ergebnis: Ivanova, Franke, Albrecht, Hartmann, Celik.",
    "<code>BETWEEN '1990' AND '1999'</code> direkt auf das Datum angewendet schließt alle 1999 Geborenen aus, da '1999-07-05' als Text größer als '1999' ist. Ebenso fehlerhaft: obere Grenze '1999-01-01'.",
    { ordered: true, tags: ["Datum", "strftime", "YEAR"] });

  S("012", 2, 5, SUPPORT, "Die IT plant den Austausch alter Geräte.",
    "Geben Sie für alle Geräte <code>inventar_nr</code>, <code>typ</code> und eine Spalte <code>empfehlung</code> aus, sortiert nach Inventarnummer. Die Empfehlung lautet<ul><li>'austauschen' bei Kauf vor dem 01.01.2020,</li><li>'prüfen' bei Kauf von 2020 bis einschließlich 2022,</li><li>'ok' bei Kauf ab 2023.</li></ul>",
    "SELECT inventar_nr, typ,\n       CASE\n         WHEN kaufdatum < '2020-01-01' THEN 'austauschen'\n         WHEN kaufdatum < '2023-01-01' THEN 'prüfen'\n         ELSE 'ok'\n       END AS empfehlung\nFROM geraet\nORDER BY inventar_nr",
    "Der CASE-Ausdruck wird von oben nach unten ausgewertet; die erste zutreffende WHEN-Bedingung gewinnt. Daher genügt im zweiten Zweig die Obergrenze.",
    "Fehlerquellen: falsche Grenzen (<code>&lt;= '2022-01-01'</code>), fehlendes <code>END</code>, Reihenfolge der WHEN-Zweige vertauscht (dann erhielte ein Gerät von 2018 'prüfen').",
    { ordered: true, tags: ["CASE"] });

  S("013", 1, 3, FUHRPARK, "",
    "Ermitteln Sie die <b>drei</b> Fahrzeuge mit dem höchsten Kilometerstand. Geben Sie <code>kennzeichen</code> und <code>km_stand</code> aus, höchster Wert zuerst.",
    "SELECT kennzeichen, km_stand\nFROM fahrzeug\nORDER BY km_stand DESC\nLIMIT 3",
    "<code>LIMIT</code> begrenzt die Ergebnismenge nach der Sortierung (MySQL, SQLite, PostgreSQL). SQL Server: <code>SELECT TOP 3 …</code>, SQL-Standard/Oracle: <code>FETCH FIRST 3 ROWS ONLY</code>.",
    "Ohne <code>DESC</code> erhielte man die drei Fahrzeuge mit dem <i>niedrigsten</i> Kilometerstand. Bei gleichen Werten an der Grenze ist das Ergebnis von LIMIT nicht eindeutig – dann zusätzlich nach einer zweiten Spalte sortieren.",
    { ordered: true, tags: ["ORDER BY", "LIMIT"] });

  S("014", 3, 6, BIB, "Stichtag für die Mahnläufe ist der <b>26.10.2026</b>.",
    "Geben Sie für alle Ausleihen, die am Stichtag 26.10.2026 überfällig sind (noch nicht zurückgegeben und Fälligkeitsdatum vor dem Stichtag), die <code>ausleihe_id</code>, das Fälligkeitsdatum <code>faellig_am</code> und die Anzahl der überfälligen Tage (Alias <code>tage</code>) aus. Sortieren Sie absteigend nach den überfälligen Tagen. <small>Verwenden Sie den Stichtag als festes Datum '2026-10-26' (nicht <code>date('now')</code>).</small>",
    "SELECT ausleihe_id, faellig_am,\n       julianday('2026-10-26') - julianday(faellig_am) AS tage\nFROM ausleihe\nWHERE rueckgabe_am IS NULL\n  AND faellig_am < '2026-10-26'\nORDER BY tage DESC",
    "Zwei Ausleihen sind überfällig: Nr. 8 (18 Tage) und Nr. 9 (3 Tage). In MySQL: <code>DATEDIFF('2026-10-26', faellig_am)</code> bzw. mit dem Tagesdatum <code>DATEDIFF(CURDATE(), faellig_am)</code>; in SQLite wäre das Tagesdatum <code>date('now')</code>.",
    "Ohne <code>rueckgabe_am IS NULL</code> würden bereits (verspätet) zurückgegebene Bücher erneut angemahnt. Ohne die Fälligkeitsbedingung erscheinen auch noch nicht fällige offene Ausleihen (mit negativen Tagen).",
    { ordered: true, tags: ["Datum", "julianday", "IS NULL"] });

  Q({
    id: "ga2-sql-select-015",
    topic: "ga2-sql-select",
    type: "mc",
    difficulty: 1,
    points: 2,
    question: "Welche Bedingung findet alle Nachnamen, deren <b>zweiter</b> Buchstabe ein „a“ ist und die auf „n“ enden (z.B. „Hartmann“)?",
    options: ["WHERE nachname LIKE '_a%n'", "WHERE nachname LIKE '%a%n'", "WHERE nachname LIKE '_a_n'", "WHERE nachname = '_a%n'"],
    correct: [0],
    solution: "<p><code>_</code> steht für genau ein beliebiges Zeichen, <code>%</code> für beliebig viele. <code>'_a%n'</code>: ein Zeichen, dann „a“, dann beliebig viel, am Ende „n“.</p>",
    explanation: "<code>'%a%n'</code> findet ein „a“ an beliebiger Stelle, <code>'_a_n'</code> nur Namen mit genau 4 Zeichen. Mit <code>=</code> wirken die Platzhalter nicht."
  });

  Q({
    id: "ga2-sql-select-016",
    topic: "ga2-sql-select",
    type: "numeric",
    difficulty: 2,
    points: 3,
    context: ctx(SHOP, "", { only: ["kunde"], showData: true }),
    question: "Wie viele Zeilen liefert folgende Abfrage?" + pre("SELECT nachname FROM kunde\nWHERE ort = 'Köln' OR ort = 'Berlin' AND email IS NULL;"),
    answer: 2,
    tolerance: 0,
    unit: "Zeilen",
    solution: "<p><b>2 Zeilen</b> (Weber, Wagner). <code>AND</code> bindet stärker als <code>OR</code>; die Bedingung wird gelesen als <code>ort = 'Köln' OR (ort = 'Berlin' AND email IS NULL)</code>. Köln: Weber und Wagner (2). Berlin ohne E-Mail: niemand. Summe: 2.</p>",
    explanation: "Gemeint war vermutlich „Kunden aus Köln oder Berlin ohne E-Mail“ – dafür sind Klammern nötig: <code>WHERE (ort = 'Köln' OR ort = 'Berlin') AND email IS NULL</code> → 1 Zeile (Weber)."
  });

  Q({
    id: "ga2-sql-select-017",
    topic: "ga2-sql-select",
    type: "text",
    difficulty: 2,
    points: 4,
    question: "Ein Kollege wundert sich, dass <code>SELECT * FROM kunde WHERE email = NULL;</code> keine Zeile liefert, obwohl es Kunden ohne E-Mail gibt. Erläutern Sie die Ursache und geben Sie die korrekte Anweisung an.",
    solution: "<p>NULL bedeutet „Wert unbekannt/nicht vorhanden“ und ist kein Wert, mit dem man vergleichen kann. SQL verwendet eine <b>dreiwertige Logik</b> (TRUE, FALSE, UNKNOWN): Jeder Vergleich mit NULL (<code>=</code>, <code>&lt;&gt;</code>, <code>&lt;</code> …) ergibt UNKNOWN, und WHERE übernimmt nur Zeilen mit TRUE. Korrekt ist der Operator <code>IS NULL</code>:</p>" + pre("SELECT * FROM kunde WHERE email IS NULL;"),
    explanation: "Analog: <code>IS NOT NULL</code> statt <code>&lt;&gt; NULL</code>. Auch <code>NOT IN</code> mit NULL-Werten in der Liste führt deshalb zu leeren Ergebnissen.",
    keywords: ["is null", "unknown|unbekannt", "dreiwertig|drei", "vergleich", "true|wahr"]
  });

  // ===========================================================================
  // JOIN
  // ===========================================================================
  function J(id, d, pts, db, ctxText, question, solutionSql, erl, explanation, opts) {
    opts = opts || {};
    Q({
      id: "ga2-sql-join-" + id,
      topic: "ga2-sql-join",
      type: "sql",
      difficulty: d,
      points: pts,
      context: ctx(db, ctxText),
      question: question,
      sql: { setup: db.sql, solution: solutionSql, ordered: !!opts.ordered },
      solution: pre(solutionSql + ";") + "<p>" + erl + "</p>",
      explanation: explanation,
      tags: opts.tags || ["JOIN"]
    });
  }

  J("001", 1, 4, SHOP, "Der Kundenservice benötigt eine Liste aller offenen Bestellungen.",
    "Geben Sie für alle Bestellungen mit dem Status 'offen' die <code>bestell_id</code>, das <code>bestelldatum</code> und den <code>nachname</code> des Kunden aus.",
    "SELECT b.bestell_id, b.bestelldatum, k.nachname\nFROM bestellung b\nINNER JOIN kunde k ON k.kunden_id = b.kunden_id\nWHERE b.status = 'offen'",
    "Der Fremdschlüssel <code>bestellung.kunden_id</code> wird mit dem Primärschlüssel <code>kunde.kunden_id</code> verknüpft. Ergebnis: 1009 Meyer, 1010 Yilmaz, 1012 Fischer.",
    "Ohne Join-Bedingung (<code>FROM bestellung, kunde WHERE status = 'offen'</code>) entsteht ein kartesisches Produkt: 3 × 10 = 30 Zeilen. Alte Schreibweise, ebenfalls korrekt: <code>FROM bestellung b, kunde k WHERE k.kunden_id = b.kunden_id AND b.status = 'offen'</code>.",
    { tags: ["INNER JOIN"] });

  J("002", 1, 4, SEMINAR, "",
    "Geben Sie <code>titel</code> und den <code>nachname</code> des Dozenten aller Kurse aus, denen ein Dozent zugeordnet ist. Sortieren Sie nach Titel.",
    "SELECT k.titel, d.nachname\nFROM kurs k\nINNER JOIN dozent d ON d.dozent_id = k.dozent_id\nORDER BY k.titel",
    "Der INNER JOIN liefert nur Kurse, zu denen ein passender Dozent existiert – „Kotlin für Android“ (dozent_id NULL) fehlt daher. 8 Zeilen.",
    "Mit LEFT JOIN würde auch der Kurs ohne Dozent erscheinen (mit NULL) – das ist hier nicht gefragt. Join-Bedingung nicht vergessen, sonst entstehen 9 × 6 = 54 Zeilen.",
    { ordered: true, tags: ["INNER JOIN"] });

  J("003", 2, 4, SEMINAR, "Die Kursplanung möchte sehen, welche Kurse noch keinen Dozenten haben.",
    "Geben Sie für <b>alle</b> Kurse den <code>titel</code> und den <code>nachname</code> des Dozenten aus. Kurse ohne zugeordneten Dozenten sollen ebenfalls erscheinen. Sortieren Sie nach Titel.",
    "SELECT k.titel, d.nachname\nFROM kurs k\nLEFT JOIN dozent d ON d.dozent_id = k.dozent_id\nORDER BY k.titel",
    "Der LEFT JOIN übernimmt alle Zeilen der linken Tabelle (kurs). Für „Kotlin für Android“ ist <code>nachname</code> NULL. 9 Zeilen.",
    "Die Reihenfolge der Tabellen ist beim LEFT JOIN entscheidend: <code>FROM dozent LEFT JOIN kurs</code> liefert alle Dozenten (auch Neumann ohne Kurs), aber nicht den Kurs ohne Dozent. Gleichwertig: <code>FROM dozent d RIGHT JOIN kurs k ON …</code>.",
    { ordered: true, tags: ["LEFT JOIN"] });

  J("004", 2, 5, SHOP, "Kunden, die sich registriert, aber noch nie bestellt haben, sollen einen Gutschein erhalten.",
    "Ermitteln Sie mithilfe eines JOINs <code>nachname</code> und <code>vorname</code> aller Kunden, die noch <b>keine</b> Bestellung aufgegeben haben.",
    "SELECT k.nachname, k.vorname\nFROM kunde k\nLEFT JOIN bestellung b ON b.kunden_id = k.kunden_id\nWHERE b.bestell_id IS NULL",
    "Kunden ohne Bestellung erhalten durch den LEFT JOIN NULL in allen Spalten von bestellung; diese Zeilen werden mit <code>IS NULL</code> herausgefiltert („Anti-Join“). Ergebnis: Wagner, Becker, Schulz.",
    "Mit INNER JOIN ist das Ergebnis leer, da gerade die Kunden ohne Partner wegfallen. Alternative mit Unterabfrage: <code>WHERE kunden_id NOT IN (SELECT kunden_id FROM bestellung)</code> oder <code>NOT EXISTS</code>.",
    { tags: ["LEFT JOIN", "Anti-Join"] });

  J("005", 2, 5, SHOP, "Für eine Rechnungskopie werden die Positionen einer Bestellung benötigt. Hinweis: Der in der Bestellposition gespeicherte <code>einzelpreis</code> ist der Preis zum Bestellzeitpunkt (ggf. rabattiert) und kann vom aktuellen Artikelpreis abweichen.",
    "Geben Sie für die Bestellung <b>1007</b> die <code>bezeichnung</code> des Artikels, die <code>menge</code>, den <code>einzelpreis</code> und den Positionswert (menge × einzelpreis, Alias <code>positionswert</code>) aus – absteigend nach Positionswert sortiert.",
    "SELECT a.bezeichnung, bp.menge, bp.einzelpreis,\n       bp.menge * bp.einzelpreis AS positionswert\nFROM bestellposition bp\nJOIN artikel a ON a.artikel_id = bp.artikel_id\nWHERE bp.bestell_id = 1007\nORDER BY positionswert DESC",
    "Ergebnis: Notebook ProBook 450 (2 × 879,00 = 1 758,00) und Monitor 27 Zoll WQHD (329,90).",
    "Wer <code>a.preis</code> statt <code>bp.einzelpreis</code> verwendet, berechnet 2 × 899,00 € – falsch, denn der Kunde hat einen Rabattpreis bezahlt. Genau deshalb speichert man den Preis zum Bestellzeitpunkt redundant in der Position (historisierter Wert).",
    { ordered: true, tags: ["JOIN", "berechnete Spalte"] });

  J("006", 2, 7, SHOP, "Für eine Zubehör-Aktion sollen alle Kunden angeschrieben werden, die bereits Zubehör gekauft haben.",
    "Geben Sie <code>nachname</code> und <code>vorname</code> aller Kunden aus, die mindestens einen Artikel der Kategorie mit der Bezeichnung <b>'Zubehör'</b> bestellt haben. Jeder Kunde soll nur <b>einmal</b> erscheinen. Sortieren Sie nach Nachname.",
    "SELECT DISTINCT k.nachname, k.vorname\nFROM kunde k\nJOIN bestellung b       ON b.kunden_id   = k.kunden_id\nJOIN bestellposition bp ON bp.bestell_id  = b.bestell_id\nJOIN artikel a          ON a.artikel_id   = bp.artikel_id\nJOIN kategorie kat      ON kat.kategorie_id = a.kategorie_id\nWHERE kat.bezeichnung = 'Zubehör'\nORDER BY k.nachname",
    "Für 5 Tabellen werden 4 Join-Bedingungen benötigt. Da ein Kunde mehrere Zubehörartikel (auch in mehreren Bestellungen) haben kann, ist <code>DISTINCT</code> nötig. Ergebnis: Fischer, Meyer, Müller, Schmidt, Schneider.",
    "Ohne DISTINCT erscheint z.B. Müller viermal. Die Kategorie-ID (5) im WHERE fest einzutragen ist in der Prüfung meist nicht gewollt, wenn nach der Bezeichnung gefragt ist. Eine fehlende Join-Bedingung erzeugt ein (Teil-)Kreuzprodukt.",
    { ordered: true, tags: ["Mehrfach-Join", "DISTINCT"] });

  J("007", 2, 5, SUPPORT, "Für das Organigramm wird eine Liste „Mitarbeiter – Vorgesetzter“ benötigt.",
    "Geben Sie für <b>alle</b> Mitarbeiter den <code>nachname</code> und den Nachnamen des direkten Vorgesetzten aus. Mitarbeiter ohne Vorgesetzten sollen ebenfalls erscheinen (Vorgesetzter = NULL). Sortieren Sie nach dem Nachnamen des Mitarbeiters.",
    "SELECT m.nachname, v.nachname AS vorgesetzter\nFROM mitarbeiter m\nLEFT JOIN mitarbeiter v ON v.ma_id = m.vorgesetzter_id\nORDER BY m.nachname",
    "Beim <b>Self-Join</b> wird dieselbe Tabelle zweimal mit unterschiedlichen Aliasen (m = Mitarbeiter, v = Vorgesetzter) verwendet. Der Fremdschlüssel <code>m.vorgesetzter_id</code> zeigt auf den Primärschlüssel <code>v.ma_id</code>.",
    "Mit INNER JOIN fehlen die Abteilungsleiter (Richter, Peters, Haas, Simon). Vertauschte Bedingung <code>ON m.ma_id = v.vorgesetzter_id</code> liefert stattdessen die <i>Untergebenen</i>.",
    { ordered: true, tags: ["Self-Join", "LEFT JOIN"] });

  J("008", 2, 6, SUPPORT, "Die Teamleitung möchte für alle nicht geschlossenen Tickets sehen, wer sie erstellt hat und wer sie bearbeitet.",
    "Geben Sie für alle Tickets mit einem Status ungleich 'geschlossen' die <code>ticket_id</code>, den <code>betreff</code>, den Nachnamen des Erstellers und den Nachnamen des Bearbeiters aus. Noch nicht zugewiesene Tickets (ohne Bearbeiter) sollen ebenfalls erscheinen. Sortieren Sie nach <code>ticket_id</code>.",
    "SELECT t.ticket_id, t.betreff, e.nachname AS ersteller, b.nachname AS bearbeiter\nFROM ticket t\nJOIN mitarbeiter e      ON e.ma_id = t.ersteller_id\nLEFT JOIN mitarbeiter b ON b.ma_id = t.bearbeiter_id\nWHERE t.status <> 'geschlossen'\nORDER BY t.ticket_id",
    "Die Tabelle mitarbeiter wird zweimal mit verschiedenen Rollen eingebunden (Ersteller, Bearbeiter). Der Ersteller ist Pflicht (INNER JOIN möglich), der Bearbeiter optional (LEFT JOIN). 6 Zeilen, Tickets 8 und 10 ohne Bearbeiter.",
    "Ein einziger Join mit <code>ON m.ma_id = t.ersteller_id OR m.ma_id = t.bearbeiter_id</code> liefert zwei Zeilen pro Ticket statt zweier Spalten. Mit INNER JOIN beim Bearbeiter fehlen die Tickets 8 und 10.",
    { ordered: true, tags: ["JOIN", "Alias", "LEFT JOIN"] });

  J("009", 3, 6, SUPPORT, "Für die Inventur wird eine vollständige Geräteliste benötigt.",
    "Geben Sie für <b>alle</b> Geräte <code>inventar_nr</code>, <code>typ</code>, den <code>nachname</code> des zugeordneten Mitarbeiters und die <code>bezeichnung</code> von dessen Abteilung aus. Geräte ohne Mitarbeiter und Mitarbeiter ohne Abteilung sollen nicht verloren gehen. Sortieren Sie nach Inventarnummer.",
    "SELECT g.inventar_nr, g.typ, m.nachname, a.bezeichnung\nFROM geraet g\nLEFT JOIN mitarbeiter m ON m.ma_id = g.ma_id\nLEFT JOIN abteilung a   ON a.abteilung_id = m.abteilung_id\nORDER BY g.inventar_nr",
    "Beide Joins müssen LEFT JOINs sein. 12 Zeilen; z.B. INV-1004 ohne Mitarbeiter (NULL, NULL), INV-1011 bei Böhm ohne Abteilung.",
    "Häufiger Fehler: <code>LEFT JOIN mitarbeiter … JOIN abteilung …</code> – der zweite INNER JOIN entfernt alle Zeilen, bei denen <code>m.abteilung_id</code> NULL ist, also die Geräte ohne Mitarbeiter und das Gerät von Böhm. Eine LEFT-JOIN-Kette muss durchgehend LEFT bleiben.",
    { ordered: true, tags: ["LEFT JOIN", "Mehrfach-Join"] });

  J("010", 2, 6, FUHRPARK, "Für die Abrechnung von Kundenterminen wird ein Auszug aus dem Fahrtenbuch benötigt.",
    "Geben Sie für alle Fahrten mit dem Zweck 'Kundentermin' das <code>datum</code>, das <code>kennzeichen</code> des Fahrzeugs, den <code>nachname</code> des Fahrers und die gefahrenen Kilometer (Alias <code>km</code>) aus, chronologisch sortiert.",
    "SELECT f.datum, z.kennzeichen, p.nachname, f.km_ende - f.km_start AS km\nFROM fahrt f\nJOIN fahrzeug z ON z.fz_id = f.fz_id\nJOIN fahrer p   ON p.fahrer_id = f.fahrer_id\nWHERE f.zweck = 'Kundentermin'\nORDER BY f.datum",
    "Die Tabelle fahrt ist die Verbindungstabelle zwischen fahrzeug und fahrer (m:n-Beziehung mit Attributen). 5 Fahrten, insgesamt 1 470 km.",
    "Wird die Differenz falsch herum gebildet (<code>km_start - km_ende</code>), entstehen negative Werte. Ohne Tabellenalias ist z.B. <code>fz_id</code> mehrdeutig („ambiguous column name“).",
    { ordered: true, tags: ["Mehrfach-Join", "m:n"] });

  J("011", 3, 7, BIB, "Die Bibliothek möchte eine Übersicht aller Leser mit ihren aktuell (noch nicht zurückgegebenen) ausgeliehenen Büchern.",
    "Geben Sie für <b>alle</b> Leser den <code>nachname</code> und den <code>titel</code> des aktuell ausgeliehenen Buches aus. Leser ohne aktuelle Ausleihe sollen mit NULL als Titel erscheinen. Sortieren Sie nach Nachname.",
    "SELECT l.nachname, b.titel\nFROM leser l\nLEFT JOIN ausleihe a ON a.leser_id = l.leser_id\n                     AND a.rueckgabe_am IS NULL\nLEFT JOIN buch b     ON b.buch_id = a.buch_id\nORDER BY l.nachname",
    "Die Bedingung <code>rueckgabe_am IS NULL</code> gehört in die <b>ON-Klausel</b>: Sie schränkt nur die Partnerzeilen ein, die Leser bleiben alle erhalten. Ergebnis: 7 Zeilen, Eckert und Gerber mit NULL.",
    "Steht die Bedingung im WHERE, wird nach dem Join gefiltert: Eckert (hat nur eine zurückgegebene Ausleihe) verschwindet, Gerber (gar keine Ausleihe, daher NULL) bleibt zufällig erhalten – ein klassischer Fehler, der den LEFT JOIN teilweise zum INNER JOIN macht.",
    { ordered: true, tags: ["LEFT JOIN", "ON vs. WHERE"] });

  J("012", 1, 4, SEMINAR, "",
    "Geben Sie <code>nachname</code>, <code>vorname</code> und den Zahlungsstatus <code>bezahlt</code> aller Teilnehmer aus, die den Kurs mit dem Titel <b>'SQL Grundlagen'</b> gebucht haben. Sortieren Sie nach Nachname.",
    "SELECT t.nachname, t.vorname, b.bezahlt\nFROM teilnehmer t\nJOIN buchung b ON b.teilnehmer_id = t.teilnehmer_id\nJOIN kurs k    ON k.kurs_id = b.kurs_id\nWHERE k.titel = 'SQL Grundlagen'\nORDER BY t.nachname",
    "Die Zwischentabelle buchung löst die m:n-Beziehung zwischen teilnehmer und kurs auf. 5 Teilnehmer, Hartmann hat noch nicht bezahlt.",
    "<code>LIKE 'SQL%'</code> würde auch „SQL für Fortgeschrittene“ einschließen. Beim Join über die Zwischentabelle braucht man zwei Join-Bedingungen.",
    { ordered: true, tags: ["JOIN", "m:n"] });

  J("013", 3, 6, SHOP, "Die Kategorien sind hierarchisch aufgebaut: Eine Kategorie kann einer Oberkategorie zugeordnet sein (<code>oberkategorie_id</code>).",
    "Geben Sie für <b>alle</b> Artikel die <code>bezeichnung</code> des Artikels, die Bezeichnung seiner Kategorie und die Bezeichnung der zugehörigen Oberkategorie aus (in dieser Reihenfolge). Artikel ohne Kategorie sollen ebenfalls erscheinen. Sortieren Sie nach <code>artikel_id</code>.",
    "SELECT a.bezeichnung, k.bezeichnung AS kategorie, o.bezeichnung AS oberkategorie\nFROM artikel a\nLEFT JOIN kategorie k ON k.kategorie_id = a.kategorie_id\nLEFT JOIN kategorie o ON o.kategorie_id = k.oberkategorie_id\nORDER BY a.artikel_id",
    "Die Tabelle kategorie wird zweimal eingebunden (Self-Join über <code>oberkategorie_id</code>). 12 Zeilen, z.B. „Funkmaus – Zubehör – Hardware“, „Headset Bluetooth – NULL – NULL“.",
    "Mit INNER JOINs fehlen Artikel ohne Kategorie. Wer nur einmal mit kategorie verknüpft, erhält die Oberkategorie lediglich als ID. Wichtig sind eindeutige Aliase (k, o), sonst ist <code>bezeichnung</code> mehrdeutig.",
    { ordered: true, tags: ["Self-Join", "LEFT JOIN"] });

  Q({
    id: "ga2-sql-join-014",
    topic: "ga2-sql-join",
    type: "numeric",
    difficulty: 1,
    points: 2,
    context: "<p>Die Tabelle <b>kunde</b> enthält 10 Datensätze, die Tabelle <b>bestellung</b> 12 Datensätze.</p>",
    question: "Wie viele Zeilen liefert die Abfrage <code>SELECT * FROM kunde, bestellung;</code>?",
    answer: 120,
    tolerance: 0,
    unit: "Zeilen",
    solution: "<p>Ohne Join-Bedingung entsteht das <b>kartesische Produkt</b> (CROSS JOIN): jede Zeile von kunde wird mit jeder Zeile von bestellung kombiniert: 10 × 12 = <b>120 Zeilen</b>.</p>",
    explanation: "Mit Join-Bedingung <code>WHERE kunde.kunden_id = bestellung.kunden_id</code> wären es 12 Zeilen (jede Bestellung genau einmal mit ihrem Kunden). Ein auffällig großes Ergebnis mit sich wiederholenden Werten deutet auf eine vergessene Join-Bedingung hin."
  });

  Q({
    id: "ga2-sql-join-015",
    topic: "ga2-sql-join",
    type: "mc",
    difficulty: 2,
    points: 3,
    context: "<p>Die Tabelle <b>kunde</b> enthält 10 Kunden. In der Tabelle <b>bestellung</b> sind 12 Bestellungen von insgesamt 7 verschiedenen Kunden gespeichert; 3 Kunden haben nie bestellt. Jede Bestellung gehört zu genau einem existierenden Kunden.</p>" +
      pre("SELECT k.nachname, b.bestell_id\nFROM kunde k\nLEFT JOIN bestellung b ON b.kunden_id = k.kunden_id;"),
    question: "Wie viele Zeilen liefert die Abfrage?",
    options: ["10", "12", "15", "120"],
    correct: [2],
    solution: "<p><b>15 Zeilen</b>: Jede der 12 Bestellungen erscheint einmal mit ihrem Kunden (12 Zeilen), zusätzlich erscheinen die 3 Kunden ohne Bestellung je einmal mit <code>bestell_id</code> = NULL.</p>",
    explanation: "Ein INNER JOIN liefert 12 Zeilen, das kartesische Produkt 120. 10 wäre die Anzahl der Kunden – der LEFT JOIN „vervielfacht“ aber Kunden mit mehreren Bestellungen."
  });

  Q({
    id: "ga2-sql-join-016",
    topic: "ga2-sql-join",
    type: "text",
    difficulty: 2,
    points: 6,
    question: "Erläutern Sie den Unterschied zwischen einem INNER JOIN und einem LEFT JOIN und beschreiben Sie, was ein Self-Join ist. Nennen Sie jeweils ein Anwendungsbeispiel.",
    solution: "<ul><li><b>INNER JOIN</b>: liefert nur Zeilenkombinationen, bei denen die Join-Bedingung in beiden Tabellen erfüllt ist. Beispiel: Bestellungen mit ihrem Kunden.</li><li><b>LEFT (OUTER) JOIN</b>: liefert alle Zeilen der linken Tabelle; gibt es keinen passenden Partner in der rechten Tabelle, werden deren Spalten mit NULL aufgefüllt. Beispiel: alle Kunden, auch solche ohne Bestellung (z.B. um diese mit <code>IS NULL</code> zu finden).</li><li><b>Self-Join</b>: eine Tabelle wird mit sich selbst verknüpft, dazu werden zwei unterschiedliche Aliase verwendet. Anwendung bei rekursiven Beziehungen, z.B. Mitarbeiter und ihr Vorgesetzter (<code>vorgesetzter_id</code> verweist auf <code>ma_id</code> derselben Tabelle) oder Kategorie und Oberkategorie.</li></ul>",
    keywords: ["beide|beiden", "alle zeilen|alle datensätze", "linke|links", "null", "alias", "selbst|sich selbst", "vorgesetzt|rekursiv"]
  });

  // ===========================================================================
  // Aggregatfunktionen, GROUP BY, HAVING
  // ===========================================================================
  function A(id, d, pts, db, ctxText, question, solutionSql, erl, explanation, opts) {
    opts = opts || {};
    Q({
      id: "ga2-sql-aggregat-" + id,
      topic: "ga2-sql-aggregat",
      type: "sql",
      difficulty: d,
      points: pts,
      context: ctx(db, ctxText),
      question: question,
      sql: { setup: db.sql, solution: solutionSql, ordered: !!opts.ordered },
      solution: pre(solutionSql + ";") + "<p>" + erl + "</p>",
      explanation: explanation,
      tags: opts.tags || ["GROUP BY"]
    });
  }

  A("001", 1, 3, SHOP, "",
    "Ermitteln Sie die Anzahl der Kunden je Wohnort. Geben Sie <code>ort</code> und <code>anzahl</code> aus.",
    "SELECT ort, COUNT(*) AS anzahl\nFROM kunde\nGROUP BY ort",
    "GROUP BY bildet eine Gruppe je Ort, COUNT(*) zählt die Zeilen jeder Gruppe. Ergebnis: Berlin, Hamburg, Köln, München je 2; Leipzig, Stuttgart je 1.",
    "Ohne GROUP BY liefert <code>COUNT(*)</code> nur eine Zeile (10). <code>COUNT(email)</code> würde Kunden ohne E-Mail nicht mitzählen.",
    { tags: ["COUNT", "GROUP BY"] });

  A("002", 1, 2, SHOP, "",
    "Ermitteln Sie den durchschnittlichen Preis aller Artikel, gerundet auf zwei Nachkommastellen.",
    "SELECT ROUND(AVG(preis), 2) AS durchschnittspreis\nFROM artikel",
    "Ergebnis: 270,79 €. Ohne GROUP BY liefert eine Aggregatabfrage genau eine Zeile.",
    "<code>ROUND</code> muss um das AVG gelegt werden – <code>AVG(ROUND(preis, 2))</code> rundet nur die Einzelwerte. Achtung: AVG ignoriert NULL-Werte.",
    { tags: ["AVG", "ROUND"] });

  A("003", 2, 4, SHOP, "Für den Datenschutzbericht werden Kennzahlen zum Kundenstamm benötigt.",
    "Geben Sie in einer Zeile aus (in dieser Reihenfolge):<ol><li>die Anzahl aller Kunden,</li><li>die Anzahl der Kunden mit hinterlegter E-Mail-Adresse,</li><li>die Anzahl der verschiedenen Wohnorte.</li></ol>Verwenden Sie keine WHERE-Klausel.",
    "SELECT COUNT(*) AS kunden, COUNT(email) AS mit_email, COUNT(DISTINCT ort) AS orte\nFROM kunde",
    "Ergebnis: 10 | 7 | 6. <code>COUNT(*)</code> zählt alle Zeilen, <code>COUNT(spalte)</code> nur Werte ungleich NULL, <code>COUNT(DISTINCT spalte)</code> nur verschiedene Werte.",
    "Der Unterschied zwischen COUNT(*) und COUNT(spalte) wird in Prüfungen gern abgefragt. <code>COUNT(ort)</code> ohne DISTINCT ergäbe 10.",
    { tags: ["COUNT", "DISTINCT"] });

  A("004", 2, 5, SEMINAR, "Die Geschäftsleitung möchte wissen, welche Kurse gut nachgefragt sind.",
    "Geben Sie <code>titel</code> und Anzahl der Buchungen (<code>anzahl</code>) aller Kurse aus, die <b>mindestens 3</b> Buchungen haben.",
    "SELECT k.titel, COUNT(*) AS anzahl\nFROM kurs k\nJOIN buchung b ON b.kurs_id = k.kurs_id\nGROUP BY k.kurs_id, k.titel\nHAVING COUNT(*) >= 3",
    "Bedingungen auf Gruppen (Aggregate) stehen in <b>HAVING</b>. Ergebnis: SQL Grundlagen (5), Python kompakt (3), Scrum Master (3).",
    "<code>WHERE COUNT(*) &gt;= 3</code> ist ein Fehler – WHERE wird vor der Gruppierung ausgewertet und darf keine Aggregatfunktionen enthalten. <code>&gt; 3</code> statt <code>&gt;= 3</code> liefert nur einen Kurs.",
    { tags: ["HAVING", "COUNT", "JOIN"] });

  A("005", 2, 6, SEMINAR, "Für die Kursplanung sollen auch Kurse ohne Buchungen sichtbar sein.",
    "Geben Sie für <b>alle</b> Kurse den <code>titel</code> und die Anzahl der Buchungen aus. Kurse ohne Buchung sollen mit der Anzahl <b>0</b> erscheinen.",
    "SELECT k.titel, COUNT(b.buchung_id) AS anzahl\nFROM kurs k\nLEFT JOIN buchung b ON b.kurs_id = k.kurs_id\nGROUP BY k.kurs_id, k.titel",
    "Der LEFT JOIN erhält „Git und DevOps“ (ohne Buchung) mit NULL-Werten in den buchung-Spalten. <code>COUNT(b.buchung_id)</code> zählt diese NULL nicht → 0.",
    "Mit <code>COUNT(*)</code> erhielte „Git und DevOps“ die Anzahl <b>1</b>, weil die durch den LEFT JOIN entstandene Zeile mitgezählt wird. Mit INNER JOIN fehlt der Kurs ganz.",
    { tags: ["LEFT JOIN", "COUNT(spalte)"] });

  A("006", 2, 5, SHOP, "",
    "Ermitteln Sie den Gesamtwert jeder Bestellung (Summe aus menge × einzelpreis, gerundet auf 2 Nachkommastellen). Geben Sie <code>bestell_id</code> und <code>gesamtwert</code> aus, absteigend nach Gesamtwert sortiert.",
    "SELECT bestell_id, ROUND(SUM(menge * einzelpreis), 2) AS gesamtwert\nFROM bestellposition\nGROUP BY bestell_id\nORDER BY gesamtwert DESC",
    "Erst wird je Position multipliziert, dann je Bestellung summiert. Höchster Bestellwert: 1007 mit 2 087,90 €.",
    "<code>SUM(menge) * SUM(einzelpreis)</code> ist mathematisch falsch. Ohne GROUP BY erhält man nur die Gesamtsumme aller Bestellungen.",
    { ordered: true, tags: ["SUM", "ORDER BY"] });

  A("007", 2, 7, SHOP, "Für ein Treueprogramm werden Kunden mit hohem Umsatz gesucht. Gezählt werden nur Bestellungen mit dem Status 'geliefert'.",
    "Geben Sie <code>nachname</code> und den Umsatz (Summe menge × einzelpreis, auf 2 Stellen gerundet) aller Kunden aus, deren Umsatz aus <b>gelieferten</b> Bestellungen <b>mehr als 1 000 €</b> beträgt.",
    "SELECT k.nachname, ROUND(SUM(bp.menge * bp.einzelpreis), 2) AS umsatz\nFROM kunde k\nJOIN bestellung b       ON b.kunden_id = k.kunden_id\nJOIN bestellposition bp ON bp.bestell_id = b.bestell_id\nWHERE b.status = 'geliefert'\nGROUP BY k.kunden_id, k.nachname\nHAVING SUM(bp.menge * bp.einzelpreis) > 1000",
    "WHERE filtert die Zeilen (nur gelieferte Bestellungen) <b>vor</b> der Gruppierung, HAVING filtert die Gruppen (Umsatz &gt; 1000) <b>danach</b>. Ergebnis: Schmidt 1 956,73 €, Weber 1 049,00 €, Fischer 2 087,90 €.",
    "Ohne Statusfilter erscheint zusätzlich Yilmaz (nur offene Bestellung) und die Werte ändern sich. Die Statusbedingung in HAVING zu schreiben ist nicht zulässig, da <code>status</code> keine Gruppierungsspalte ist.",
    { tags: ["WHERE vs. HAVING", "SUM", "JOIN"] });

  A("008", 2, 5, SUPPORT, "Die Personalabteilung benötigt eine Gehaltsübersicht.",
    "Geben Sie für jede Abteilung, der Mitarbeiter zugeordnet sind, die <code>bezeichnung</code> und das Durchschnittsgehalt (auf 2 Stellen gerundet) aus – höchstes Durchschnittsgehalt zuerst.",
    "SELECT a.bezeichnung, ROUND(AVG(m.gehalt), 2) AS durchschnitt\nFROM abteilung a\nJOIN mitarbeiter m ON m.abteilung_id = a.abteilung_id\nGROUP BY a.abteilung_id, a.bezeichnung\nORDER BY durchschnitt DESC",
    "Ergebnis: IT 4 725,00 · Personal 4 700,00 · Buchhaltung 4 500,00 · Vertrieb 4 466,67 · Marketing 3 800,00.",
    "Mit LEFT JOIN von abteilung aus erschiene auch „Recht“ mit NULL – das ist hier ausdrücklich nicht gefragt („denen Mitarbeiter zugeordnet sind“). Gruppiert man nur nach <code>m.abteilung_id</code> ohne Join, fehlt die Bezeichnung.",
    { ordered: true, tags: ["AVG", "JOIN"] });

  A("009", 2, 4, SUPPORT, "",
    "Ermitteln Sie die Anzahl der Tickets je Kombination aus <code>prioritaet</code> und <code>status</code>. Geben Sie <code>prioritaet</code>, <code>status</code> und <code>anzahl</code> aus.",
    "SELECT prioritaet, status, COUNT(*) AS anzahl\nFROM ticket\nGROUP BY prioritaet, status",
    "Bei mehreren Gruppierungsspalten entsteht je <b>Wertekombination</b> eine Gruppe, z.B. „hoch | geschlossen | 2“.",
    "Steht <code>status</code> im SELECT, aber nicht im GROUP BY, ist die Abfrage nach SQL-Standard ungültig (SQLite/MySQL im alten Modus liefern dann einen beliebigen Status je Priorität).",
    { tags: ["GROUP BY mehrere Spalten"] });

  A("010", 3, 7, FUHRPARK, "Das Controlling möchte die Werkstattkosten je Fahrzeug analysieren.",
    "Geben Sie für <b>alle</b> Fahrzeuge das <code>kennzeichen</code>, die Anzahl der Werkstattaufenthalte und die Summe der Wartungskosten aus. Fahrzeuge ohne Wartung sollen mit Anzahl <b>0</b> und Kosten <b>0</b> (nicht NULL) erscheinen. Sortieren Sie absteigend nach Kosten, bei gleichen Kosten aufsteigend nach Kennzeichen.",
    "SELECT f.kennzeichen, COUNT(w.wartung_id) AS anzahl,\n       COALESCE(SUM(w.kosten), 0) AS kosten\nFROM fahrzeug f\nLEFT JOIN wartung w ON w.fz_id = f.fz_id\nGROUP BY f.fz_id, f.kennzeichen\nORDER BY kosten DESC, f.kennzeichen",
    "<code>COALESCE(x, 0)</code> (MySQL/SQLite auch <code>IFNULL</code>) ersetzt das NULL der leeren Summe durch 0. Spitzenreiter: B-FI 103 (3 Aufenthalte, 2 650,00 €).",
    "Fehlerbilder: INNER JOIN (Fahrzeuge ohne Wartung fehlen), <code>COUNT(*)</code> (liefert 1 statt 0), SUM ohne COALESCE (NULL statt 0), fehlendes zweites Sortierkriterium.",
    { ordered: true, tags: ["LEFT JOIN", "COALESCE", "SUM"] });

  A("011", 2, 5, BIB, "",
    "Geben Sie <code>nachname</code>, <code>vorname</code> und die Anzahl der Ausleihen aller Leser aus, die insgesamt <b>mehr als zwei</b> Ausleihen getätigt haben.",
    "SELECT l.nachname, l.vorname, COUNT(*) AS anzahl\nFROM leser l\nJOIN ausleihe a ON a.leser_id = l.leser_id\nGROUP BY l.leser_id, l.nachname, l.vorname\nHAVING COUNT(*) > 2",
    "Ergebnis: Albers und Baum mit je 3 Ausleihen. Gruppiert wird über den Primärschlüssel, damit zwei Leser mit gleichem Namen nicht zusammengefasst werden.",
    "„Mehr als zwei“ bedeutet <code>&gt; 2</code>, nicht <code>&gt;= 2</code>. Aggregatbedingung in HAVING, nicht in WHERE.",
    { tags: ["HAVING", "COUNT"] });

  A("012", 2, 5, SEMINAR, "",
    "Geben Sie je Veranstaltungsort (<code>ort</code>) die Anzahl der Kurse sowie den frühesten und den spätesten Kursbeginn aus (Reihenfolge: ort, anzahl, frühester Beginn, spätester Beginn).",
    "SELECT ort, COUNT(*) AS anzahl, MIN(beginn) AS erster_kurs, MAX(beginn) AS letzter_kurs\nFROM kurs\nGROUP BY ort",
    "MIN und MAX funktionieren auch mit Datumswerten und Texten. Online: 4 Kurse, 09.03.2026 bis 07.12.2026.",
    "Ohne GROUP BY erhielte man nur Gesamtwerte über alle Kurse.",
    { tags: ["MIN", "MAX"] });

  A("013", 3, 6, SHOP, "",
    "Ermitteln Sie für jede Kategorie, deren Artikel im Durchschnitt <b>mehr als 200 €</b> kosten, die <code>bezeichnung</code> der Kategorie und den Durchschnittspreis (auf 2 Stellen gerundet). Sortieren Sie absteigend nach Durchschnittspreis.",
    "SELECT k.bezeichnung, ROUND(AVG(a.preis), 2) AS durchschnitt\nFROM kategorie k\nJOIN artikel a ON a.kategorie_id = k.kategorie_id\nGROUP BY k.kategorie_id, k.bezeichnung\nHAVING AVG(a.preis) > 200\nORDER BY durchschnitt DESC",
    "Ergebnis: Notebooks 974,00 · Betriebssysteme 259,00 · Monitore 239,90.",
    "<code>WHERE a.preis &gt; 200</code> filtert einzelne Artikel vor der Gruppierung und ergibt andere Durchschnitte (z.B. Zubehör fiele ganz weg, Monitore hätte 329,90). Gefragt ist die Bedingung auf den Durchschnitt → HAVING.",
    { ordered: true, tags: ["HAVING", "AVG"] });

  A("014", 3, 7, SEMINAR, "Die Dozenten werden am Umsatz ihrer Kurse beteiligt. Umsatz = Summe der Kurspreise aller <b>bezahlten</b> Buchungen.",
    "Geben Sie für jeden Dozenten mit Umsatz den <code>nachname</code> und den Umsatz aus, höchster Umsatz zuerst.",
    "SELECT d.nachname, SUM(k.preis) AS umsatz\nFROM dozent d\nJOIN kurs k    ON k.dozent_id = d.dozent_id\nJOIN buchung b ON b.kurs_id = k.kurs_id\nWHERE b.bezahlt = 1\nGROUP BY d.dozent_id, d.nachname\nORDER BY umsatz DESC",
    "Jede bezahlte Buchung trägt einmal den Kurspreis bei. Ergebnis: Krause 3 940 · Lehmann 3 660 · Hoffmann 1 980 · Wolf 1 780 · Braun 1 090.",
    "<code>SUM(DISTINCT k.preis)</code> oder eine Summe ohne Join mit buchung würde jeden Kurs nur einmal zählen. Ohne <code>bezahlt = 1</code> werden auch offene Forderungen mitgerechnet.",
    { ordered: true, tags: ["SUM", "Mehrfach-Join"] });

  A("015", 3, 6, SUPPORT, "Die Teamleitung möchte die Auslastung der Ticketbearbeiter vergleichen.",
    "Geben Sie für jeden Mitarbeiter, der mindestens ein Ticket bearbeitet, den <code>nachname</code>, die Gesamtzahl seiner Tickets und die Anzahl seiner noch <b>nicht geschlossenen</b> Tickets aus (in dieser Reihenfolge), sortiert nach Nachname. <small>Tipp: bedingte Zählung mit <code>SUM(CASE WHEN … THEN 1 ELSE 0 END)</code>.</small>",
    "SELECT m.nachname, COUNT(*) AS gesamt,\n       SUM(CASE WHEN t.status <> 'geschlossen' THEN 1 ELSE 0 END) AS offen\nFROM mitarbeiter m\nJOIN ticket t ON t.bearbeiter_id = m.ma_id\nGROUP BY m.ma_id, m.nachname\nORDER BY m.nachname",
    "Ergebnis: Kaiser 4 | 2, Lang 3 | 1, Vogel 3 | 1. Die bedingte Aggregation zählt in einer Gruppe nur die Zeilen, auf die die Bedingung zutrifft.",
    "Ein WHERE <code>status &lt;&gt; 'geschlossen'</code> würde auch die Gesamtzahl verfälschen. Join über <code>ersteller_id</code> statt <code>bearbeiter_id</code> beantwortet eine andere Frage.",
    { ordered: true, tags: ["CASE", "bedingte Aggregation"] });

  Q({
    id: "ga2-sql-aggregat-016",
    topic: "ga2-sql-aggregat",
    type: "numeric",
    difficulty: 1,
    points: 2,
    context: ctx(SUPPORT, "", { only: ["ticket"], showData: true }),
    question: "Welchen Wert liefert die Abfrage <code>SELECT COUNT(geloest_am) FROM ticket;</code>?",
    answer: 6,
    tolerance: 0,
    solution: "<p><b>6</b> – <code>COUNT(spalte)</code> zählt nur Zeilen, in denen die Spalte <b>nicht NULL</b> ist. Gelöst wurden die Tickets 1 bis 6; die übrigen 6 Tickets haben <code>geloest_am</code> = NULL.</p>",
    explanation: "<code>COUNT(*)</code> würde 12 liefern."
  });

  Q({
    id: "ga2-sql-aggregat-017",
    topic: "ga2-sql-aggregat",
    type: "numeric",
    difficulty: 2,
    points: 3,
    context: ctx(SEMINAR, "", { only: ["dozent"], showData: true }),
    question: "Welchen Wert liefert die Abfrage <code>SELECT AVG(stundensatz) FROM dozent;</code>?",
    answer: 90,
    tolerance: 0.01,
    unit: "€",
    solution: "<p><b>90,00 €</b>. AVG ignoriert NULL-Werte: (85 + 90 + 80 + 95 + 100) / <b>5</b> = 450 / 5 = 90. Der Stundensatz von Neumann (NULL) wird weder addiert noch mitgezählt.</p>",
    explanation: "Wer durch 6 teilt (75,00 €), behandelt NULL fälschlich wie 0. Soll NULL als 0 zählen, muss man <code>AVG(COALESCE(stundensatz, 0))</code> schreiben."
  });

  Q({
    id: "ga2-sql-aggregat-018",
    topic: "ga2-sql-aggregat",
    type: "mc",
    difficulty: 2,
    points: 2,
    context: pre("SELECT ort, nachname, COUNT(*) AS anzahl\nFROM kunde\nGROUP BY ort;"),
    question: "Warum ist diese Abfrage nach SQL-Standard fehlerhaft?",
    options: [
      "COUNT(*) darf nicht zusammen mit GROUP BY verwendet werden.",
      "Die Spalte nachname steht weder im GROUP BY noch in einer Aggregatfunktion.",
      "Der Alias anzahl ist nicht erlaubt, weil er in GROUP BY fehlt.",
      "GROUP BY muss immer vor FROM stehen."
    ],
    correct: [1],
    solution: "<p>Jede nicht aggregierte Spalte im SELECT muss in der GROUP-BY-Klausel stehen. Pro Ort gibt es mehrere Nachnamen – welcher soll in der einen Ergebniszeile pro Ort erscheinen? Korrektur: <code>nachname</code> entfernen oder in GROUP BY aufnehmen (dann aber je Ort und Name gruppiert).</p>",
    explanation: "SQLite und MySQL (ohne ONLY_FULL_GROUP_BY) führen die Abfrage trotzdem aus und liefern einen beliebigen Nachnamen – in der Prüfung gilt das als Fehler."
  });

  Q({
    id: "ga2-sql-aggregat-019",
    topic: "ga2-sql-aggregat",
    type: "text",
    difficulty: 2,
    points: 4,
    question: "Erläutern Sie den Unterschied zwischen der WHERE- und der HAVING-Klausel und geben Sie jeweils ein Beispiel aus der Seminarverwaltung an.",
    solution: "<p><b>WHERE</b> filtert einzelne Datensätze <b>vor</b> der Gruppierung; Aggregatfunktionen sind dort nicht erlaubt. Beispiel: nur bezahlte Buchungen berücksichtigen – <code>WHERE bezahlt = 1</code>.</p><p><b>HAVING</b> filtert die <b>Gruppen nach</b> der Gruppierung mit GROUP BY und enthält typischerweise Aggregatfunktionen. Beispiel: nur Kurse mit mindestens 3 Buchungen – <code>GROUP BY kurs_id HAVING COUNT(*) &gt;= 3</code>.</p><p>Beide können in einer Abfrage kombiniert werden: erst WHERE, dann GROUP BY, dann HAVING.</p>",
    keywords: ["vor", "nach", "gruppierung|group by", "aggregat", "zeilen|datensätze", "gruppen", "count|sum|avg"]
  });

  // ===========================================================================
  // Unterabfragen, Mengenoperationen
  // ===========================================================================
  function U(id, d, pts, db, ctxText, question, solutionSql, erl, explanation, opts) {
    opts = opts || {};
    Q({
      id: "ga2-sql-subquery-" + id,
      topic: "ga2-sql-subquery",
      type: "sql",
      difficulty: d,
      points: pts,
      context: ctx(db, ctxText),
      question: question,
      sql: { setup: db.sql, solution: solutionSql, ordered: !!opts.ordered },
      solution: pre(solutionSql + ";") + "<p>" + erl + "</p>",
      explanation: explanation,
      tags: opts.tags || ["Unterabfrage"]
    });
  }

  U("001", 2, 4, SHOP, "",
    "Geben Sie <code>bezeichnung</code> und <code>preis</code> aller Artikel aus, deren Preis <b>über dem Durchschnittspreis</b> aller Artikel liegt.",
    "SELECT bezeichnung, preis\nFROM artikel\nWHERE preis > (SELECT AVG(preis) FROM artikel)",
    "Die Unterabfrage liefert genau einen Wert (270,79), mit dem jede Zeile verglichen wird. Ergebnis: beide Notebooks und der 27-Zoll-Monitor.",
    "<code>WHERE preis &gt; AVG(preis)</code> ist nicht erlaubt – Aggregatfunktionen dürfen nicht direkt in WHERE stehen. Ein fest eingetragener Wert (270.79) ist keine Lösung, da sich der Durchschnitt ändert.",
    { tags: ["Unterabfrage", "AVG"] });

  U("002", 2, 4, SHOP, "Das Sortiment soll bereinigt werden.",
    "Geben Sie <code>artikel_id</code> und <code>bezeichnung</code> aller Artikel aus, die noch <b>nie bestellt</b> wurden. Verwenden Sie eine Unterabfrage.",
    "SELECT artikel_id, bezeichnung\nFROM artikel\nWHERE artikel_id NOT IN (SELECT artikel_id FROM bestellposition)",
    "Die Unterabfrage liefert alle bestellten Artikelnummern; NOT IN schließt diese aus. Ergebnis: 104, 111, 112. Da <code>bestellposition.artikel_id</code> Teil des Primärschlüssels ist, enthält die Liste kein NULL.",
    "Alternativen: <code>WHERE NOT EXISTS (SELECT 1 FROM bestellposition bp WHERE bp.artikel_id = a.artikel_id)</code> oder LEFT JOIN … IS NULL. <code>NOT IN (SELECT artikel_id FROM artikel)</code> wäre die falsche Tabelle (leeres Ergebnis).",
    { tags: ["NOT IN"] });

  U("003", 2, 5, SEMINAR, "Für eine Aufbauzertifizierung werden Teilnehmer gesucht, die beide SQL-Kurse gebucht haben.",
    "Geben Sie <code>nachname</code> und <code>vorname</code> aller Teilnehmer aus, die <b>sowohl</b> den Kurs 'SQL Grundlagen' <b>als auch</b> den Kurs 'SQL für Fortgeschrittene' gebucht haben.",
    "SELECT nachname, vorname\nFROM teilnehmer\nWHERE teilnehmer_id IN (SELECT b.teilnehmer_id FROM buchung b\n                        JOIN kurs k ON k.kurs_id = b.kurs_id\n                        WHERE k.titel = 'SQL Grundlagen')\n  AND teilnehmer_id IN (SELECT b.teilnehmer_id FROM buchung b\n                        JOIN kurs k ON k.kurs_id = b.kurs_id\n                        WHERE k.titel = 'SQL für Fortgeschrittene')",
    "Jede Unterabfrage liefert die Teilnehmer eines Kurses; die Verknüpfung mit AND bildet die Schnittmenge. Ergebnis: Albrecht, Celik. Alternativ mit <code>INTERSECT</code>.",
    "Ein einfacher Join mit <code>WHERE k.titel = 'SQL Grundlagen' AND k.titel = 'SQL für Fortgeschrittene'</code> liefert nichts (eine Buchungszeile hat nur einen Titel), mit OR bzw. IN erhält man alle Teilnehmer, die <i>mindestens einen</i> der Kurse gebucht haben.",
    { tags: ["IN", "Schnittmenge"] });

  U("004", 3, 6, SEMINAR, "Die Kursplanung sucht Dozenten, die derzeit keinen Kurs leiten. Beachten Sie: Ein Kurs hat noch keinen Dozenten (<code>dozent_id</code> ist NULL).",
    "Geben Sie <code>nachname</code> und <code>vorname</code> aller Dozenten aus, die <b>keinen</b> Kurs leiten.",
    "SELECT d.nachname, d.vorname\nFROM dozent d\nWHERE NOT EXISTS (SELECT 1 FROM kurs k WHERE k.dozent_id = d.dozent_id)",
    "NOT EXISTS prüft für jeden Dozenten, ob ein Kurs mit seiner ID existiert (korrelierte Unterabfrage). Ergebnis: Neumann.",
    "<b>Falle:</b> <code>WHERE dozent_id NOT IN (SELECT dozent_id FROM kurs)</code> liefert hier ein <b>leeres</b> Ergebnis! Die Liste enthält NULL; <code>5 NOT IN (1, 2, NULL)</code> ergibt UNKNOWN statt TRUE. Korrekt wäre auch <code>NOT IN (SELECT dozent_id FROM kurs WHERE dozent_id IS NOT NULL)</code>.",
    { tags: ["NOT EXISTS", "NOT IN", "NULL"] });

  U("005", 3, 6, SUPPORT, "Die Personalabteilung prüft die Gehaltsstruktur innerhalb der Abteilungen.",
    "Geben Sie <code>nachname</code> und <code>gehalt</code> aller Mitarbeiter aus, die mehr verdienen als der Durchschnitt <b>ihrer eigenen Abteilung</b>.",
    "SELECT m.nachname, m.gehalt\nFROM mitarbeiter m\nWHERE m.gehalt > (SELECT AVG(m2.gehalt)\n                  FROM mitarbeiter m2\n                  WHERE m2.abteilung_id = m.abteilung_id)",
    "Die <b>korrelierte</b> Unterabfrage bezieht sich über <code>m.abteilung_id</code> auf die jeweilige Zeile der äußeren Abfrage und berechnet den Durchschnitt der passenden Abteilung. Ergebnis: Richter, Vogel, Peters, Haas.",
    "Ohne Korrelation (<code>SELECT AVG(gehalt) FROM mitarbeiter</code>) wird mit dem Gesamtdurchschnitt (4 416,67) verglichen – dann erscheint auch Simon. Gleiche Aliase innen und außen führen dazu, dass sich die Bedingung auf die innere Tabelle bezieht.",
    { tags: ["korreliert", "AVG"] });

  U("006", 2, 4, SHOP, "",
    "Geben Sie mithilfe von <code>EXISTS</code> <code>nachname</code> und <code>vorname</code> aller Kunden aus, die mindestens eine Bestellung mit dem Status 'offen' haben.",
    "SELECT k.nachname, k.vorname\nFROM kunde k\nWHERE EXISTS (SELECT 1 FROM bestellung b\n              WHERE b.kunden_id = k.kunden_id\n                AND b.status = 'offen')",
    "EXISTS ist wahr, sobald die Unterabfrage mindestens eine Zeile liefert; was im SELECT der Unterabfrage steht, ist egal. Ergebnis: Fischer, Meyer, Yilmaz.",
    "Fehlt die Korrelation <code>b.kunden_id = k.kunden_id</code>, ist EXISTS für alle Kunden wahr (es gibt ja irgendeine offene Bestellung) → alle 10 Kunden.",
    { tags: ["EXISTS", "korreliert"] });

  U("007", 3, 6, SHOP, "Das Controlling fragt nach dem durchschnittlichen Bestellwert.",
    "Ermitteln Sie den durchschnittlichen Wert einer Bestellung (Wert = Summe menge × einzelpreis aller Positionen einer Bestellung), gerundet auf 2 Nachkommastellen. Verwenden Sie eine Unterabfrage in der FROM-Klausel.",
    "SELECT ROUND(AVG(bestellwert), 2) AS durchschnitt\nFROM (SELECT bestell_id, SUM(menge * einzelpreis) AS bestellwert\n      FROM bestellposition\n      GROUP BY bestell_id) AS t",
    "Die innere Abfrage (abgeleitete Tabelle) berechnet je Bestellung den Wert, die äußere bildet den Durchschnitt dieser 12 Werte: 656,35 €.",
    "<code>SELECT AVG(menge * einzelpreis) FROM bestellposition</code> mittelt über die 20 <i>Positionen</i>, nicht über die Bestellungen (393,81 €). Aggregatfunktionen lassen sich nicht schachteln: <code>AVG(SUM(…))</code> ist ungültig. In MySQL braucht die abgeleitete Tabelle zwingend einen Alias.",
    { tags: ["Unterabfrage in FROM", "abgeleitete Tabelle"] });

  U("008", 3, 6, SUPPORT, "",
    "Geben Sie für jede Abteilung die <code>bezeichnung</code> sowie <code>nachname</code> und <code>gehalt</code> des Mitarbeiters mit dem höchsten Gehalt in dieser Abteilung aus.",
    "SELECT a.bezeichnung, m.nachname, m.gehalt\nFROM mitarbeiter m\nJOIN abteilung a ON a.abteilung_id = m.abteilung_id\nWHERE m.gehalt = (SELECT MAX(m2.gehalt)\n                  FROM mitarbeiter m2\n                  WHERE m2.abteilung_id = m.abteilung_id)",
    "Die korrelierte Unterabfrage ermittelt das Maximum der jeweiligen Abteilung. Ergebnis: IT – Richter, Vertrieb – Peters, Buchhaltung – Haas, Personal – Simon, Marketing – Ludwig. Bei Gleichstand würden alle Spitzenverdiener ausgegeben.",
    "<code>SELECT a.bezeichnung, m.nachname, MAX(m.gehalt) … GROUP BY a.bezeichnung</code> ist nach Standard ungültig (nachname nicht gruppiert) und liefert in manchen DBMS einen falschen Namen. Ohne Korrelation erhält man nur den Spitzenverdiener des ganzen Unternehmens.",
    { tags: ["korreliert", "MAX"] });

  U("009", 2, 4, SEMINAR, "Für Marketingzwecke wird eine Liste aller relevanten Orte benötigt.",
    "Erstellen Sie eine alphabetisch sortierte Liste aller Orte, an denen Kurse stattfinden <b>oder</b> in denen Teilnehmer wohnen. Jeder Ort soll nur einmal erscheinen. Verwenden Sie einen Mengenoperator.",
    "SELECT ort FROM kurs\nUNION\nSELECT ort FROM teilnehmer\nORDER BY ort",
    "<code>UNION</code> vereinigt beide Ergebnismengen und entfernt Duplikate. ORDER BY steht einmal am Ende und gilt für das Gesamtergebnis. Ergebnis: Berlin, Hamburg, Köln, Leipzig, München, Online.",
    "<code>UNION ALL</code> behält Duplikate (20 Zeilen). Beide Teilabfragen müssen gleich viele Spalten mit kompatiblen Datentypen haben.",
    { ordered: true, tags: ["UNION"] });

  U("010", 2, 4, BIB, "Der Bestand soll auf Ladenhüter geprüft werden.",
    "Geben Sie mithilfe von <code>NOT EXISTS</code> <code>titel</code> und <code>erscheinungsjahr</code> aller Bücher aus, die noch <b>nie</b> ausgeliehen wurden.",
    "SELECT b.titel, b.erscheinungsjahr\nFROM buch b\nWHERE NOT EXISTS (SELECT 1 FROM ausleihe a WHERE a.buch_id = b.buch_id)",
    "Ergebnis: „Farm der Tiere“ (1945) und „Das Schloss“ (1926).",
    "Fehlt die Korrelation <code>a.buch_id = b.buch_id</code>, ist die Unterabfrage immer nicht leer → NOT EXISTS immer falsch → leeres Ergebnis.",
    { tags: ["NOT EXISTS"] });

  U("011", 3, 6, FUHRPARK, "Der Fahrer mit den meisten Fahrten soll eine Prämie erhalten. Bei Gleichstand erhalten alle Spitzenreiter die Prämie.",
    "Geben Sie <code>nachname</code> und die Anzahl der Fahrten des Fahrers bzw. der Fahrer mit den <b>meisten</b> Fahrten aus.",
    "SELECT p.nachname, COUNT(*) AS anzahl\nFROM fahrer p\nJOIN fahrt f ON f.fahrer_id = p.fahrer_id\nGROUP BY p.fahrer_id, p.nachname\nHAVING COUNT(*) = (SELECT MAX(anz)\n                   FROM (SELECT COUNT(*) AS anz\n                         FROM fahrt\n                         GROUP BY fahrer_id) AS t)",
    "Die innere Unterabfrage zählt die Fahrten je Fahrer, die mittlere ermittelt das Maximum (3), HAVING vergleicht jede Gruppe damit. Ergebnis: Arnold und Busch mit je 3 Fahrten.",
    "<code>ORDER BY anzahl DESC LIMIT 1</code> liefert bei Gleichstand nur <b>einen</b> der beiden Spitzenreiter – welchen, ist nicht festgelegt. Daher ist der Vergleich mit dem Maximum die korrekte Lösung. <code>MAX(COUNT(*))</code> ist ungültig.",
    { tags: ["HAVING", "MAX", "Unterabfrage in FROM"] });

  U("012", 2, 5, FUHRPARK, "Laut Richtlinie muss jedes Fahrzeug einmal pro Kalenderjahr in die Werkstatt.",
    "Geben Sie <code>kennzeichen</code> und <code>modell</code> aller Fahrzeuge aus, die im Jahr <b>2026</b> noch <b>nicht</b> gewartet wurden.",
    "SELECT kennzeichen, modell\nFROM fahrzeug\nWHERE fz_id NOT IN (SELECT fz_id FROM wartung\n                    WHERE datum BETWEEN '2026-01-01' AND '2026-12-31')",
    "Die Unterabfrage liefert alle Fahrzeuge mit Wartung in 2026. Ergebnis: HH-FI 202 (zuletzt 2025 gewartet), M-FI 302, HH-FI 203.",
    "Ohne Jahresfilter in der Unterabfrage fehlt der Skoda HH-FI 202, der zwar gewartet wurde – aber 2025. Der Filter muss <b>in</b> die Unterabfrage, nicht in die äußere Abfrage.",
    { tags: ["NOT IN", "Datum"] });

  U("013", 2, 3, SEMINAR, "",
    "Geben Sie alle Wohnorte von Teilnehmern aus, an denen <b>kein</b> Kurs stattfindet. Verwenden Sie einen Mengenoperator.",
    "SELECT ort FROM teilnehmer\nEXCEPT\nSELECT ort FROM kurs",
    "<code>EXCEPT</code> (Oracle: <code>MINUS</code>) bildet die Differenzmenge und entfernt dabei Duplikate. Ergebnis: Köln, Leipzig.",
    "Die Reihenfolge ist entscheidend: <code>kurs EXCEPT teilnehmer</code> liefert „Online“. MySQL unterstützt EXCEPT erst ab Version 8.0.31 – sonst <code>WHERE ort NOT IN (SELECT ort FROM kurs)</code> mit DISTINCT.",
    { tags: ["EXCEPT", "Mengenoperation"] });

  Q({
    id: "ga2-sql-subquery-014",
    topic: "ga2-sql-subquery",
    type: "mc",
    difficulty: 3,
    points: 3,
    context: "<p>Tabelle <b>kurs</b>, Spalte <code>dozent_id</code>: 1, 1, 2, 2, 3, 4, 6, NULL, 2<br>Tabelle <b>dozent</b>, Spalte <code>dozent_id</code>: 1, 2, 3, 4, 5, 6</p>" +
      pre("SELECT dozent_id FROM dozent\nWHERE dozent_id NOT IN (SELECT dozent_id FROM kurs);"),
    question: "Welches Ergebnis liefert die Abfrage?",
    options: ["Die Zeile mit dozent_id 5", "Die Zeilen 5 und NULL", "Ein leeres Ergebnis", "Eine Fehlermeldung, weil die Unterabfrage mehrere Zeilen liefert"],
    correct: [2],
    solution: "<p><b>Leeres Ergebnis.</b> <code>5 NOT IN (1, 2, 3, 4, 6, NULL)</code> entspricht <code>5 &lt;&gt; 1 AND … AND 5 &lt;&gt; NULL</code>. Der letzte Vergleich ergibt UNKNOWN, damit ist der ganze Ausdruck UNKNOWN – nie TRUE. Keine Zeile wird ausgegeben.</p>",
    explanation: "Abhilfe: <code>NOT EXISTS</code> oder <code>WHERE dozent_id IS NOT NULL</code> in der Unterabfrage. IN mit mehreren Zeilen ist erlaubt – nur <code>=</code> verlangt genau einen Wert."
  });

  Q({
    id: "ga2-sql-subquery-015",
    topic: "ga2-sql-subquery",
    type: "multi",
    difficulty: 2,
    points: 4,
    question: "Welche Aussagen zu Mengenoperationen und Unterabfragen sind richtig? (Mehrere Antworten möglich)",
    options: [
      "UNION entfernt doppelte Zeilen, UNION ALL nicht.",
      "Bei UNION müssen beide Teilabfragen dieselbe Anzahl an Spalten mit kompatiblen Datentypen liefern.",
      "Eine Unterabfrage hinter dem Operator = darf beliebig viele Zeilen liefern.",
      "Eine Unterabfrage in der FROM-Klausel wird wie eine Tabelle verwendet und erhält einen Alias.",
      "UNION ALL ist in der Regel langsamer als UNION, da mehr Zeilen ausgegeben werden.",
      "Eine korrelierte Unterabfrage verweist auf eine Spalte der äußeren Abfrage."
    ],
    correct: [0, 1, 3, 5],
    solution: "<p>Richtig: 1, 2, 4, 6. Hinter <code>=</code> muss die Unterabfrage genau einen Wert liefern (skalare Unterabfrage), sonst <code>IN</code> verwenden. UNION ist meist <b>langsamer</b>, weil zur Duplikatentfernung sortiert bzw. gehasht werden muss.</p>"
  });

  Q({
    id: "ga2-sql-subquery-016",
    topic: "ga2-sql-subquery",
    type: "text",
    difficulty: 3,
    points: 5,
    question: "Erklären Sie den Unterschied zwischen einer korrelierten und einer nicht korrelierten Unterabfrage. Gehen Sie auch auf die Auswirkung auf die Ausführung ein und nennen Sie je ein Beispiel.",
    solution: "<p><b>Nicht korrelierte Unterabfrage</b>: ist unabhängig von der äußeren Abfrage und kann eigenständig ausgeführt werden; sie wird (logisch) nur <b>einmal</b> ausgewertet, ihr Ergebnis wird für alle Zeilen verwendet. Beispiel: <code>WHERE preis &gt; (SELECT AVG(preis) FROM artikel)</code>.</p><p><b>Korrelierte Unterabfrage</b>: verwendet eine Spalte der äußeren Abfrage (über deren Alias) und wird daher (logisch) <b>für jede Zeile</b> der äußeren Abfrage neu ausgewertet – das kann bei großen Tabellen langsam sein (Optimierer formen sie oft in Joins um). Beispiel: <code>WHERE m.gehalt &gt; (SELECT AVG(m2.gehalt) FROM mitarbeiter m2 WHERE m2.abteilung_id = m.abteilung_id)</code> oder <code>EXISTS</code>-Abfragen.</p>",
    keywords: ["äußere|aussere", "einmal", "jede zeile|für jede|pro zeile", "unabhängig|eigenständig", "alias", "exists|avg", "performance|langsam|aufwand"]
  });

  // ===========================================================================
  // DML: INSERT, UPDATE, DELETE
  // ===========================================================================
  function M(id, d, pts, db, ctxText, question, solutionSql, check, erl, explanation, opts) {
    opts = opts || {};
    Q({
      id: "ga2-sql-dml-" + id,
      topic: "ga2-sql-dml",
      type: "sql",
      difficulty: d,
      points: pts,
      context: ctx(db, ctxText, { extraSchema: opts.extraSchema }),
      question: question + "<p><small>Die Anweisung wird auf einer frischen Kopie der Datenbank ausgeführt; anschließend wird der Tabelleninhalt mit der Musterlösung verglichen.</small></p>",
      sql: { setup: db.sql + (opts.extraSetup || ""), solution: solutionSql, check: check, ordered: false },
      solution: pre(solutionSql + ";") + "<p>" + erl + "</p>",
      explanation: explanation,
      tags: opts.tags || ["DML"]
    });
  }

  M("001", 1, 3, SHOP, "Ein neuer Kunde hat sich im Shop registriert.",
    "Fügen Sie den folgenden Kunden in die Tabelle <code>kunde</code> ein: Kundennummer <b>11</b>, Kai Lorenz, 28195 Bremen, E-Mail kai.lorenz@mail.de, registriert am 26.10.2026.",
    "INSERT INTO kunde (kunden_id, vorname, nachname, plz, ort, email, registriert_am)\nVALUES (11, 'Kai', 'Lorenz', '28195', 'Bremen', 'kai.lorenz@mail.de', '2026-10-26')",
    "SELECT * FROM kunde",
    "Die Spaltenliste macht die Anweisung robust gegenüber späteren Strukturänderungen und lesbar. Texte und Datumswerte stehen in Hochkommas; die PLZ ist eine Zeichenkette (führende Nullen!).",
    "Typische Fehler: Vor- und Nachname vertauscht (ohne Spaltenliste muss die Reihenfolge der Tabellendefinition eingehalten werden), Datum im Format '26.10.2026', fehlende Hochkommas.",
    { tags: ["INSERT"] });

  M("002", 1, 2, SHOP, "Der Monitor mit der Artikelnummer 104 wird im Preis gesenkt.",
    "Ändern Sie den Preis des Artikels <b>104</b> auf <b>139,90 €</b>.",
    "UPDATE artikel\nSET preis = 139.90\nWHERE artikel_id = 104",
    "SELECT artikel_id, preis FROM artikel",
    "Die WHERE-Klausel über den Primärschlüssel stellt sicher, dass genau ein Datensatz geändert wird.",
    "Ohne WHERE würden <b>alle</b> Artikel 139,90 € kosten! Dezimaltrennzeichen in SQL ist der Punkt: <code>139,90</code> wäre ein Syntaxfehler bzw. zwei Werte.",
    { tags: ["UPDATE"] });

  M("003", 2, 4, SHOP, "Wegen gestiegener Einkaufspreise werden alle Artikel der Kategorie 'Zubehör' teurer.",
    "Erhöhen Sie die Preise aller Artikel der Kategorie mit der Bezeichnung <b>'Zubehör'</b> um <b>10 %</b>. Runden Sie auf 2 Nachkommastellen. Die Kategorie-ID soll per Unterabfrage ermittelt werden.",
    "UPDATE artikel\nSET preis = ROUND(preis * 1.10, 2)\nWHERE kategorie_id = (SELECT kategorie_id FROM kategorie\n                      WHERE bezeichnung = 'Zubehör')",
    "SELECT artikel_id, ROUND(preis, 2) FROM artikel",
    "Der neue Wert wird aus dem alten berechnet (<code>preis * 1.10</code>). Betroffen sind die Artikel 105, 106, 107 und 110; z.B. Funkmaus 24,99 € → 27,49 €.",
    "Häufige Fehler: <code>preis + 10</code> (10 € statt 10 %), <code>preis * 0.10</code> (Preis wird auf 10 % gesenkt), <code>preis * 10</code>. Bei <code>=</code> vor der Unterabfrage muss diese genau einen Wert liefern.",
    { tags: ["UPDATE", "Unterabfrage", "Berechnung"] });

  M("004", 2, 4, SHOP, "Stornierte Bestellungen sollen aus der Positionsübersicht entfernt werden. Die Bestellköpfe (Tabelle bestellung) bleiben zu Dokumentationszwecken erhalten.",
    "Löschen Sie alle <b>Bestellpositionen</b>, die zu Bestellungen mit dem Status 'storniert' gehören.",
    "DELETE FROM bestellposition\nWHERE bestell_id IN (SELECT bestell_id FROM bestellung\n                     WHERE status = 'storniert')",
    "SELECT bestell_id, artikel_id FROM bestellposition",
    "Da der Status nur in der Tabelle bestellung steht, wird die Menge der betroffenen Bestellnummern per Unterabfrage ermittelt. Gelöscht wird die Position der Bestellung 1005.",
    "<code>DELETE FROM bestellung WHERE status = 'storniert'</code> löscht die falsche Tabelle (und verletzt bei aktiver FK-Prüfung die referenzielle Integrität). Einen JOIN im DELETE (<code>DELETE bp FROM … JOIN …</code>) gibt es nur in MySQL-Syntax.",
    { tags: ["DELETE", "Unterabfrage"] });

  M("005", 2, 4, SEMINAR, "Der Teilnehmer Max Berger hat alle offenen Rechnungen beglichen.",
    "Markieren Sie alle Buchungen des Teilnehmers <b>Max Berger</b> als bezahlt (<code>bezahlt = 1</code>). Die Teilnehmernummer soll per Unterabfrage über Vor- und Nachname ermittelt werden.",
    "UPDATE buchung\nSET bezahlt = 1\nWHERE teilnehmer_id = (SELECT teilnehmer_id FROM teilnehmer\n                       WHERE nachname = 'Berger' AND vorname = 'Max')",
    "SELECT buchung_id, bezahlt FROM buchung",
    "Betroffen ist die Buchung 8 (Java Einstieg); Buchung 4 war bereits bezahlt.",
    "Ohne WHERE würden alle Buchungen als bezahlt markiert – ein typischer und folgenschwerer Fehler. Gibt es mehrere Teilnehmer namens Berger, liefert die Unterabfrage mehrere Werte → dann <code>IN</code> verwenden bzw. über den Primärschlüssel arbeiten.",
    { tags: ["UPDATE", "Unterabfrage"] });

  var ARCHIV_SQL = "CREATE TABLE ticket_archiv (\n  ticket_id INTEGER PRIMARY KEY,\n  betreff VARCHAR(100),\n  geloest_am DATE,\n  archiviert_am DATE\n);\n";
  M("006", 2, 5, SUPPORT, "Abgeschlossene Tickets sollen in eine Archivtabelle übernommen werden.",
    "Übernehmen Sie für alle Tickets mit dem Status 'geschlossen' die Spalten <code>ticket_id</code>, <code>betreff</code> und <code>geloest_am</code> in die Tabelle <code>ticket_archiv</code>. Als <code>archiviert_am</code> ist das Datum '2026-10-26' einzutragen. Verwenden Sie <b>eine</b> Anweisung.",
    "INSERT INTO ticket_archiv (ticket_id, betreff, geloest_am, archiviert_am)\nSELECT ticket_id, betreff, geloest_am, '2026-10-26'\nFROM ticket\nWHERE status = 'geschlossen'",
    "SELECT * FROM ticket_archiv",
    "Bei <code>INSERT … SELECT</code> entfällt das Schlüsselwort VALUES; das Ergebnis der Abfrage wird zeilenweise eingefügt. Konstante Werte (hier das Archivierungsdatum) können direkt im SELECT stehen. 6 Tickets werden archiviert.",
    "Falsch: <code>INSERT INTO ticket_archiv VALUES (SELECT …)</code>. Ohne WHERE würden auch offene Tickets archiviert. Anzahl und Reihenfolge der Spalten in INSERT-Liste und SELECT müssen übereinstimmen.",
    { tags: ["INSERT … SELECT"], extraSetup: ARCHIV_SQL,
      extraSchema: "<p>Zusätzlich existiert die (leere) Tabelle <b>ticket_archiv</b>: <u>ticket_id</u> <small>INTEGER, PK</small>, betreff <small>VARCHAR(100)</small>, geloest_am <small>DATE</small>, archiviert_am <small>DATE</small>.</p>" });

  M("007", 3, 6, SUPPORT, "Altgeräte sollen aus dem Inventar entfernt werden. Geräte, auf die sich noch ein Ticket bezieht, dürfen wegen der Fremdschlüsselbeziehung nicht gelöscht werden. Beachten Sie, dass <code>ticket.geraet_id</code> NULL-Werte enthält.",
    "Löschen Sie alle Geräte, die <b>vor dem 01.01.2020</b> gekauft wurden, <b>keinem Mitarbeiter</b> zugeordnet sind und auf die sich <b>kein Ticket</b> bezieht.",
    "DELETE FROM geraet\nWHERE kaufdatum < '2020-01-01'\n  AND ma_id IS NULL\n  AND geraet_id NOT IN (SELECT geraet_id FROM ticket\n                        WHERE geraet_id IS NOT NULL)",
    "SELECT geraet_id FROM geraet",
    "Gelöscht wird nur das Smartphone INV-1012. Der Drucker INV-1004 ist zwar alt und nicht zugeordnet, wird aber noch in Tickets referenziert.",
    "Ohne <code>WHERE geraet_id IS NOT NULL</code> in der Unterabfrage löscht die Anweisung <b>nichts</b> (NOT IN mit NULL ergibt nie TRUE). Mit <code>OR</code> statt <code>AND</code> würden fast alle Geräte gelöscht. Alternative: <code>AND NOT EXISTS (SELECT 1 FROM ticket t WHERE t.geraet_id = geraet.geraet_id)</code>.",
    { tags: ["DELETE", "NOT IN", "NULL"] });

  M("008", 2, 4, SUPPORT, "Die langjährigen Mitarbeiter der IT erhalten eine Gehaltserhöhung.",
    "Erhöhen Sie das Gehalt aller Mitarbeiter der Abteilung <b>'IT'</b>, die <b>vor dem 01.01.2020</b> eingetreten sind, um <b>3 %</b> (auf 2 Nachkommastellen gerundet).",
    "UPDATE mitarbeiter\nSET gehalt = ROUND(gehalt * 1.03, 2)\nWHERE eintrittsdatum < '2020-01-01'\n  AND abteilung_id = (SELECT abteilung_id FROM abteilung\n                      WHERE bezeichnung = 'IT')",
    "SELECT ma_id, ROUND(gehalt, 2) FROM mitarbeiter",
    "Betroffen sind Richter (6 386,00), Vogel (4 944,00) und Kaiser (4 429,00). Lang (Eintritt 2023) erhält keine Erhöhung.",
    "<code>gehalt * 3 / 100</code> setzt das Gehalt auf 3 % des alten Wertes. Ohne Datumsbedingung wird auch Lang erhöht.",
    { tags: ["UPDATE", "Berechnung"] });

  M("009", 3, 6, SEMINAR, "Alle Teilnehmer, die den Kurs 'SQL Grundlagen' (kurs_id 10) gebucht <b>und bezahlt</b> haben, erhalten eine vorläufige, noch unbezahlte Buchung für den neuen Kurs 'Git und DevOps' (kurs_id 18). Die <code>buchung_id</code> wird von der Datenbank automatisch vergeben (INTEGER PRIMARY KEY).",
    "Erstellen Sie <b>eine</b> SQL-Anweisung, die diese Buchungen mit dem Buchungsdatum '2026-10-26' und <code>bezahlt = 0</code> anlegt.",
    "INSERT INTO buchung (teilnehmer_id, kurs_id, buchungsdatum, bezahlt)\nSELECT teilnehmer_id, 18, '2026-10-26', 0\nFROM buchung\nWHERE kurs_id = 10 AND bezahlt = 1",
    "SELECT teilnehmer_id, kurs_id, buchungsdatum, bezahlt FROM buchung",
    "Es werden 4 Buchungen (Teilnehmer 1, 2, 3 und 5) erzeugt. Die Spalte buchung_id wird in der Spaltenliste weggelassen und automatisch vergeben (MySQL: AUTO_INCREMENT).",
    "Ohne <code>bezahlt = 1</code> erhielte auch Hartmann eine Buchung. Wer die Konstante 18 vergisst und <code>kurs_id</code> übernimmt, bucht die Teilnehmer erneut in Kurs 10.",
    { tags: ["INSERT … SELECT"] });

  M("010", 2, 4, BIB, "Der Leser Tom Albers bringt am 26.10.2026 alle ausgeliehenen Bücher zurück.",
    "Tragen Sie für alle <b>noch offenen</b> Ausleihen des Lesers mit dem Nachnamen 'Albers' das Rückgabedatum '2026-10-26' ein. Ermitteln Sie die Lesernummer per Unterabfrage.",
    "UPDATE ausleihe\nSET rueckgabe_am = '2026-10-26'\nWHERE rueckgabe_am IS NULL\n  AND leser_id = (SELECT leser_id FROM leser WHERE nachname = 'Albers')",
    "SELECT ausleihe_id, rueckgabe_am FROM ausleihe",
    "Nur die offene Ausleihe 8 („Der Process“) wird geändert.",
    "Fehlt <code>rueckgabe_am IS NULL</code>, werden auch die historischen Rückgabedaten der Ausleihen 1 und 3 überschrieben – Datenverlust! <code>rueckgabe_am = NULL</code> in der WHERE-Klausel trifft keine Zeile.",
    { tags: ["UPDATE", "IS NULL"] });

  M("011", 3, 6, FUHRPARK, "Der Kilometerstand in der Tabelle fahrzeug ist bei einigen Fahrzeugen veraltet. Maßgeblich ist der höchste <code>km_ende</code>-Wert aus dem Fahrtenbuch.",
    "Aktualisieren Sie <code>km_stand</code> aller Fahrzeuge auf den höchsten <code>km_ende</code>-Wert ihrer Fahrten. Fahrzeuge <b>ohne</b> Fahrten sollen ihren bisherigen Kilometerstand behalten.",
    "UPDATE fahrzeug\nSET km_stand = (SELECT MAX(f.km_ende) FROM fahrt f\n                WHERE f.fz_id = fahrzeug.fz_id)\nWHERE EXISTS (SELECT 1 FROM fahrt f WHERE f.fz_id = fahrzeug.fz_id)",
    "SELECT fz_id, km_stand FROM fahrzeug",
    "Die korrelierte Unterabfrage im SET liefert je Fahrzeug den maximalen Endkilometerstand. Die WHERE-EXISTS-Bedingung beschränkt die Änderung auf Fahrzeuge mit Fahrten. Alternativ: <code>SET km_stand = COALESCE((SELECT MAX(…) …), km_stand)</code>.",
    "Ohne die EXISTS-Bedingung erhält der VW ID.3 (keine Fahrten) den Kilometerstand <b>NULL</b>, weil MAX über eine leere Menge NULL liefert. Ohne Korrelation bekämen alle Fahrzeuge den höchsten km-Wert der gesamten Flotte.",
    { tags: ["UPDATE", "korreliert", "EXISTS"] });

  M("012", 1, 3, SHOP, "Das Sortiment wird um zwei Kategorien erweitert.",
    "Fügen Sie mit <b>einer</b> Anweisung zwei neue Kategorien ein: Nr. <b>9</b> 'Drucker' (Oberkategorie 1 = Hardware) und Nr. <b>10</b> 'Antivirus' (Oberkategorie 2 = Software).",
    "INSERT INTO kategorie (kategorie_id, bezeichnung, oberkategorie_id)\nVALUES (9, 'Drucker', 1),\n       (10, 'Antivirus', 2)",
    "SELECT * FROM kategorie",
    "Mehrere Datensätze werden durch Kommas getrennt in einer VALUES-Klausel angegeben (MySQL, PostgreSQL, SQLite, SQL Server ab 2008).",
    "Ohne Spaltenliste (<code>INSERT INTO kategorie VALUES (9, 'Drucker', 1), …</code>) ist die Anweisung hier ebenfalls korrekt, da Werte für alle Spalten in Tabellenreihenfolge angegeben werden.",
    { tags: ["INSERT"] });

  Q({
    id: "ga2-sql-dml-013",
    topic: "ga2-sql-dml",
    type: "mc",
    difficulty: 1,
    points: 2,
    question: "Ein Auszubildender führt versehentlich <code>DELETE FROM kunde;</code> aus (keine Fremdschlüssel-Prüfung aktiv, Autocommit an). Was ist die Folge?",
    options: [
      "Es wird ein Fehler gemeldet, weil die WHERE-Klausel fehlt.",
      "Nur der zuletzt eingefügte Kunde wird gelöscht.",
      "Alle Datensätze der Tabelle kunde werden gelöscht, die leere Tabelle bleibt bestehen.",
      "Die Tabelle kunde wird samt Struktur aus der Datenbank entfernt."
    ],
    correct: [2],
    solution: "<p>Ohne WHERE-Klausel betrifft DELETE <b>alle</b> Zeilen. Die Tabellenstruktur bleibt erhalten (anders als bei DROP TABLE). Bei Autocommit ist die Änderung sofort dauerhaft – Wiederherstellung nur über ein Backup.</p>",
    explanation: "Vorbeugung: vorher die Bedingung mit SELECT testen, in einer Transaktion arbeiten (<code>START TRANSACTION … ROLLBACK</code>), MySQL-Option <code>sql_safe_updates</code>, eingeschränkte Benutzerrechte."
  });

  Q({
    id: "ga2-sql-dml-014",
    topic: "ga2-sql-dml",
    type: "text",
    difficulty: 2,
    points: 6,
    context: "<p>Tabelle <b>artikel</b>(artikel_id, bezeichnung, preis, bestand, kategorie_id). Ein Kollege hat folgende Anweisungen geschrieben:</p>" +
      pre("-- (1)\nINSERT INTO artikel VALUES (113, Webcam HD, 49,90, 10);\n-- (2)\nUPDATE artikel SET preis = 59.90 AND bestand = 20 WHERE artikel_id = 111;\n-- (3)\nINSERT INTO artikel (artikel_id, bezeichnung, preis)\nVALUES (SELECT 114, 'Webcam 4K', 129.00);"),
    question: "Nennen Sie die Fehler in den drei Anweisungen und geben Sie jeweils eine korrigierte Fassung an.",
    solution: "<p><b>(1)</b> Text ohne Hochkommas (<code>'Webcam HD'</code>), Dezimalkomma statt Punkt (<code>49.90</code>; so entstehen zwei Werte), und es fehlt ein Wert: Ohne Spaltenliste müssen alle 5 Spalten befüllt werden.</p>" +
      pre("INSERT INTO artikel VALUES (113, 'Webcam HD', 49.90, 10, 5);") +
      "<p><b>(2)</b> Mehrere Zuweisungen werden mit Komma, nicht mit AND getrennt (sonst wird <code>preis</code> das Ergebnis des logischen Ausdrucks <code>59.90 AND (bestand = 20)</code> zugewiesen).</p>" +
      pre("UPDATE artikel SET preis = 59.90, bestand = 20 WHERE artikel_id = 111;") +
      "<p><b>(3)</b> VALUES und SELECT dürfen nicht kombiniert werden – entweder VALUES mit Werteliste oder INSERT … SELECT.</p>" +
      pre("INSERT INTO artikel (artikel_id, bezeichnung, preis) VALUES (114, 'Webcam 4K', 129.00);"),
    keywords: ["hochkomma|anführungszeichen", "punkt|dezimal", "spaltenliste|anzahl|fehlt", "komma", "and", "values", "select"]
  });

  Q({
    id: "ga2-sql-dml-015",
    topic: "ga2-sql-dml",
    type: "mc",
    difficulty: 2,
    points: 3,
    context: "<p>Im Onlineshop (siehe Schema) ist die Fremdschlüsselprüfung aktiv. Es existieren die Kunden 1–10, die Artikel 101–112 und die Bestellungen 1001–1012.</p>",
    question: "Welche Anweisung wird wegen Verletzung der <b>referenziellen Integrität</b> abgewiesen?",
    options: [
      "INSERT INTO bestellung VALUES (1013, 4, '2026-10-26', NULL, 'offen');",
      "INSERT INTO bestellposition VALUES (1012, 199, 1, 19.99);",
      "UPDATE artikel SET preis = 0.99 WHERE artikel_id = 110;",
      "DELETE FROM kunde WHERE kunden_id = 9;"
    ],
    correct: [1],
    solution: "<p>Den Artikel <b>199</b> gibt es nicht – der Fremdschlüssel <code>bestellposition.artikel_id</code> verweist ins Leere, die Anweisung wird abgewiesen.</p>",
    explanation: "Kunde 4 existiert (A ist zulässig), die Preisänderung betrifft keinen Schlüssel (C), Kunde 9 hat keine Bestellungen und darf gelöscht werden (D). Würde man Kunde 1 löschen, wäre das ohne ON DELETE CASCADE ebenfalls eine Integritätsverletzung."
  });

  // ===========================================================================
  // Transaktionen, Rechte, Indizes, Sicherheit
  // ===========================================================================
  var TT = "ga2-sql-transaktionen";

  Q({
    id: TT + "-001", topic: TT, type: "mc", difficulty: 1, points: 2,
    context: "<p>Bei einer Umbuchung im Onlinebanking wird ein Betrag von Konto A abgebucht und Konto B gutgeschrieben. Nach der Abbuchung stürzt der Datenbankserver ab.</p>",
    question: "Welche ACID-Eigenschaft stellt sicher, dass in diesem Fall auch die Abbuchung rückgängig gemacht wird?",
    options: ["Atomarität (Atomicity)", "Konsistenz (Consistency)", "Isolation (Isolation)", "Dauerhaftigkeit (Durability)"],
    correct: [0],
    solution: "<p><b>Atomarität</b>: Eine Transaktion wird entweder vollständig oder gar nicht ausgeführt („alles oder nichts“). Die unvollständige Transaktion wird beim Neustart anhand des Transaktionslogs zurückgesetzt.</p>",
    explanation: "Dauerhaftigkeit betrifft bereits mit COMMIT bestätigte Transaktionen; Isolation die gegenseitige Beeinflussung paralleler Transaktionen; Konsistenz die Einhaltung aller Integritätsbedingungen."
  });

  Q({
    id: TT + "-002", topic: TT, type: "multi", difficulty: 2, points: 4,
    question: "Welche Aussagen zu den ACID-Eigenschaften sind korrekt? (Mehrere Antworten möglich)",
    options: [
      "Durability bedeutet, dass nach einem COMMIT die Änderungen auch einen Systemabsturz überstehen.",
      "Isolation bedeutet, dass jede Transaktion auf einem eigenen Server ausgeführt wird.",
      "Consistency bedeutet, dass eine Transaktion die Datenbank von einem konsistenten in einen konsistenten Zustand überführt.",
      "Atomicity bedeutet, dass jede SQL-Anweisung nur einen Datensatz ändern darf.",
      "Isolation bedeutet, dass parallel laufende Transaktionen sich so verhalten, als würden sie nacheinander ausgeführt.",
      "Durability wird z.B. über ein Transaktionslog (Write-Ahead-Log) realisiert."
    ],
    correct: [0, 2, 4, 5],
    solution: "<p>Richtig: 1, 3, 5, 6. Isolation hat nichts mit getrennten Servern zu tun, sondern mit der logischen Trennung paralleler Transaktionen (Sperren, MVCC). Atomarität bezieht sich auf die gesamte Transaktion (beliebig viele Anweisungen), nicht auf einzelne Datensätze.</p>"
  });

  Q({
    id: TT + "-003", topic: TT, type: "order", difficulty: 2, points: 4,
    context: "<p>Von Konto 1 sollen 500 € auf Konto 2 umgebucht werden. Die Umbuchung darf nur erfolgen, wenn Konto 1 danach nicht im Minus ist.</p>",
    question: "Bringen Sie die Schritte der Transaktion in die richtige Reihenfolge.",
    items: [
      "START TRANSACTION;",
      "SELECT saldo FROM konto WHERE konto_id = 1 FOR UPDATE;  (Saldo prüfen und Zeile sperren)",
      "UPDATE konto SET saldo = saldo - 500 WHERE konto_id = 1;",
      "UPDATE konto SET saldo = saldo + 500 WHERE konto_id = 2;",
      "COMMIT;  (bei Fehler oder zu geringem Saldo stattdessen ROLLBACK;)"
    ],
    solution: "<p>Die Transaktion wird gestartet, der Saldo wird mit Sperre gelesen (verhindert, dass eine parallele Transaktion zwischen Prüfung und Abbuchung denselben Betrag abbucht), dann werden Abbuchung und Gutschrift ausgeführt und mit COMMIT festgeschrieben. Tritt ein Fehler auf, wird mit ROLLBACK alles zurückgesetzt.</p>"
  });

  Q({
    id: TT + "-004", topic: TT, type: "text", difficulty: 2, points: 6,
    context: "<p>Im Onlineshop bearbeiten zwei Lagermitarbeiter gleichzeitig den Bestand des Artikels 106 (Bestand: 45). Mitarbeiter A bucht einen Zugang von 10 Stück, Mitarbeiter B einen Abgang von 5 Stück. Beide Programme lesen zuerst den Bestand und schreiben dann den neu berechneten Wert zurück.</p>",
    question: "Beschreiben Sie anhand des Beispiels das Problem „Lost Update“ und nennen Sie zwei Möglichkeiten, es zu verhindern.",
    solution: "<p><b>Ablauf:</b> A liest 45, B liest 45. A schreibt 45 + 10 = 55. B schreibt 45 − 5 = 40. Endstand 40 statt korrekt 50 – die Änderung von A ist <b>verloren gegangen</b>, weil B mit einem veralteten Wert gerechnet hat.</p><p><b>Gegenmaßnahmen:</b></p><ul><li>Sperren (pessimistisch): Zeile beim Lesen exklusiv sperren, z.B. <code>SELECT … FOR UPDATE</code> in einer Transaktion; B muss warten, bis A COMMIT ausführt.</li><li>Relative Änderung in <b>einer</b> Anweisung: <code>UPDATE artikel SET bestand = bestand + 10 WHERE artikel_id = 106;</code> – das DBMS sperrt die Zeile für die Dauer der Anweisung.</li><li>Optimistisches Sperren: Versionsnummer/Zeitstempel mitführen und beim Update prüfen (<code>WHERE version = 7</code>); bei Konflikt neu lesen.</li><li>Höhere Isolationsstufe (z.B. SERIALIZABLE).</li></ul>",
    keywords: ["lost update|verloren", "gleichzeitig|parallel", "überschreib|veraltet", "sperre|lock", "for update", "transaktion", "isolation|serializable|optimistisch"]
  });

  Q({
    id: TT + "-005", topic: TT, type: "mc", difficulty: 2, points: 3,
    context: "<p>Transaktion T1 ändert den Preis eines Artikels von 89,90 € auf 79,90 €, hat aber noch kein COMMIT ausgeführt. Transaktion T2 liest den Preis 79,90 € und erstellt damit eine Rechnung. Danach bricht T1 mit ROLLBACK ab.</p>",
    question: "Um welches Isolationsproblem handelt es sich?",
    options: ["Lost Update", "Dirty Read", "Non-Repeatable Read", "Phantom Read"],
    correct: [1],
    solution: "<p><b>Dirty Read</b>: T2 liest Daten, die von T1 noch nicht festgeschrieben wurden und durch das ROLLBACK nie gültig waren. Verhindert ab Isolationsstufe <b>READ COMMITTED</b>.</p>",
    explanation: "Non-Repeatable Read: dieselbe Zeile liefert beim zweiten Lesen einen anderen (committeten) Wert. Phantom Read: eine wiederholte Abfrage liefert zusätzliche/fehlende Zeilen. Lost Update: eine Schreiboperation überschreibt eine andere."
  });

  Q({
    id: TT + "-006", topic: TT, type: "code", lang: "sql", difficulty: 2, points: 6,
    context: "<p>Für die Datenbank <code>shop</code> (MySQL) sollen Rechte vergeben werden:</p><ol><li>Der Benutzer <code>'praktikant'@'localhost'</code> darf die Tabellen <code>artikel</code> und <code>kategorie</code> nur lesen.</li><li>Die Rolle <code>vertrieb</code> darf Bestellungen lesen, anlegen und ändern, aber nicht löschen.</li><li>Dem Benutzer <code>'mueller'@'%'</code> soll das bisher vergebene Löschrecht auf <code>shop.bestellung</code> entzogen werden.</li></ol>",
    question: "Erstellen Sie die erforderlichen SQL-Anweisungen (DCL).",
    starter: "-- 1.\n\n-- 2.\n\n-- 3.\n",
    solution: pre("-- 1.\nGRANT SELECT ON shop.artikel   TO 'praktikant'@'localhost';\nGRANT SELECT ON shop.kategorie TO 'praktikant'@'localhost';\n\n-- 2.\nCREATE ROLE vertrieb;\nGRANT SELECT, INSERT, UPDATE ON shop.bestellung TO vertrieb;\n\n-- 3.\nREVOKE DELETE ON shop.bestellung FROM 'mueller'@'%';") +
      "<p>Mit GRANT werden Rechte (SELECT, INSERT, UPDATE, DELETE, ALL PRIVILEGES …) auf Objekte vergeben, mit REVOKE entzogen. Rollen bündeln Rechte und werden Benutzern zugewiesen (<code>GRANT vertrieb TO 'schulz'@'%';</code>).</p>",
    explanation: "Typische Fehler: <code>REVOKE … TO</code> statt <code>FROM</code>, mehrere Tabellen in einer GRANT-Anweisung (<code>ON artikel, kategorie</code> ist in MySQL nicht erlaubt), <code>GRANT ALL</code> statt nur der benötigten Rechte (Verstoß gegen das Least-Privilege-Prinzip).",
    keywords: ["grant", "select", "insert", "update", "on", "to", "revoke", "from", "role|rolle"]
  });

  Q({
    id: TT + "-007", topic: TT, type: "code", lang: "sql", difficulty: 3, points: 8,
    context: ctx(SUPPORT, "Die Mitarbeiter des Service-Desks (Datenbankrolle <code>servicedesk</code>) sollen Name, Vorname und Abteilungsbezeichnung aller Mitarbeiter einsehen können, um Tickets zuzuordnen. Gehalt und Eintrittsdatum sind vertraulich.", { details: true }),
    question: "Erstellen Sie eine View <code>v_mitarbeiter_info</code> mit den erlaubten Informationen und vergeben Sie der Rolle <code>servicedesk</code> ausschließlich Leserechte auf diese View. Begründen Sie kurz, warum dieses Vorgehen sicherer ist als ein direktes Leserecht auf die Tabelle mitarbeiter.",
    solution: pre("CREATE VIEW v_mitarbeiter_info AS\nSELECT m.ma_id, m.nachname, m.vorname, a.bezeichnung AS abteilung\nFROM mitarbeiter m\nLEFT JOIN abteilung a ON a.abteilung_id = m.abteilung_id;\n\nGRANT SELECT ON v_mitarbeiter_info TO servicedesk;") +
      "<p>Die View enthält nur die freigegebenen Spalten. Da die Rolle <b>kein</b> Recht auf die Basistabelle <code>mitarbeiter</code> erhält, kann sie Gehalt und Eintrittsdatum nicht lesen (Prinzip der minimalen Rechte, Datenschutz/DSGVO). Ändert sich die Tabellenstruktur, bleibt die Schnittstelle der View stabil.</p>",
    explanation: "Der LEFT JOIN sorgt dafür, dass auch Mitarbeiter ohne Abteilung (Böhm) sichtbar sind. Ein zusätzliches <code>GRANT SELECT ON mitarbeiter</code> würde das Rechtekonzept aushebeln.",
    keywords: ["create view", "select", "join", "grant select", "v_mitarbeiter_info", "servicedesk", "gehalt", "basistabelle|tabelle"]
  });

  Q({
    id: TT + "-008", topic: TT, type: "multi", difficulty: 2, points: 4,
    question: "Die Tabelle <code>bestellung</code> enthält mehrere Millionen Datensätze. Welche Aussagen zu einem Index auf der Spalte <code>kunden_id</code> sind zutreffend? (Mehrere Antworten möglich)",
    options: [
      "Abfragen mit WHERE kunden_id = … werden in der Regel deutlich schneller.",
      "INSERT- und UPDATE-Operationen werden schneller, weil der Index die Daten sortiert.",
      "Der Index benötigt zusätzlichen Speicherplatz.",
      "JOINs zwischen kunde und bestellung über kunden_id können profitieren.",
      "Ein Index garantiert automatisch, dass keine doppelten kunden_id-Werte gespeichert werden.",
      "Ein Index auf einer Spalte mit nur zwei verschiedenen Werten (z.B. bezahlt 0/1) bringt meist kaum Vorteile."
    ],
    correct: [0, 2, 3, 5],
    solution: "<p>Richtig: 1, 3, 4, 6. Ein Index (meist B-Baum) beschleunigt Suchen, Sortieren und Joins, kostet aber Speicher und verlangsamt schreibende Operationen, da er bei jeder Änderung mitgepflegt werden muss. Eindeutigkeit erzwingt nur ein <b>UNIQUE</b>-Index – bei kunden_id in bestellung wäre das sogar falsch (ein Kunde hat viele Bestellungen).</p>"
  });

  Q({
    id: TT + "-009", topic: TT, type: "text", difficulty: 3, points: 8,
    context: "<p>In einer Java-Anwendung wird der Login folgendermaßen geprüft:</p>" +
      pre("String sql = \"SELECT * FROM benutzer WHERE login = '\" + login\n           + \"' AND passwort_hash = '\" + hash + \"'\";\nResultSet rs = stmt.executeQuery(sql);"),
    question: "Erläutern Sie die Sicherheitslücke anhand einer konkreten Eingabe für <code>login</code> und zeigen Sie, wie der Code mit einem Prepared Statement abgesichert wird. Nennen Sie eine weitere Schutzmaßnahme.",
    solution: "<p><b>SQL-Injection:</b> Die Benutzereingabe wird ungeprüft in den SQL-String eingebaut. Gibt ein Angreifer als Login <code>admin' --</code> ein, entsteht</p>" +
      pre("SELECT * FROM benutzer WHERE login = 'admin' --' AND passwort_hash = '…'") +
      "<p>Der Rest wird zum Kommentar, die Passwortprüfung entfällt – der Angreifer ist als admin angemeldet. Mit <code>' OR '1'='1</code> lassen sich alle Datensätze auslesen, mit <code>'; DROP TABLE benutzer; --</code> ggf. Daten zerstören.</p><p><b>Absicherung mit Prepared Statement:</b></p>" +
      pre("String sql = \"SELECT * FROM benutzer WHERE login = ? AND passwort_hash = ?\";\nPreparedStatement ps = con.prepareStatement(sql);\nps.setString(1, login);\nps.setString(2, hash);\nResultSet rs = ps.executeQuery();") +
      "<p>Die SQL-Struktur wird vorab festgelegt (vorkompiliert); die Parameter werden getrennt übertragen und immer als <b>Daten</b>, nie als SQL-Code interpretiert.</p><p><b>Weitere Maßnahmen:</b> Eingabevalidierung (Whitelist, Länge), Datenbankbenutzer mit minimalen Rechten, keine technischen Fehlermeldungen an den Benutzer, ORM/Stored Procedures mit Parametern, Web Application Firewall.</p>",
    keywords: ["sql-injection|injection", "eingabe", "' or|'--|-- |kommentar", "preparedstatement|prepared statement", "platzhalter|parameter", "setstring", "validierung|rechte|least privilege"]
  });

  Q({
    id: TT + "-010", topic: TT, type: "mc", difficulty: 2, points: 2,
    question: "Bei jeder Änderung des Gehalts in der Tabelle <code>mitarbeiter</code> soll automatisch ein Eintrag mit altem und neuem Wert in der Tabelle <code>gehalt_log</code> erzeugt werden – unabhängig davon, welche Anwendung die Änderung durchführt. Welches Datenbankobjekt ist dafür am besten geeignet?",
    options: ["Eine View", "Ein Index", "Ein Trigger (AFTER UPDATE)", "Eine Stored Procedure, die von jeder Anwendung aufgerufen werden muss"],
    correct: [2],
    solution: "<p>Ein <b>Trigger</b> wird vom DBMS automatisch bei einem Ereignis (INSERT/UPDATE/DELETE) auf einer Tabelle ausgeführt und kann auf alte und neue Werte (<code>OLD.gehalt</code>, <code>NEW.gehalt</code>) zugreifen.</p>" +
      pre("CREATE TRIGGER trg_gehalt_log AFTER UPDATE ON mitarbeiter\nFOR EACH ROW\nINSERT INTO gehalt_log (ma_id, alt, neu, geaendert_am)\nVALUES (OLD.ma_id, OLD.gehalt, NEW.gehalt, NOW());"),
    explanation: "Eine Stored Procedure müsste explizit aufgerufen werden – eine Anwendung, die direkt ein UPDATE ausführt, würde die Protokollierung umgehen."
  });

  Q({
    id: TT + "-011", topic: TT, type: "mc", difficulty: 3, points: 3,
    question: "Eine Auswertung liest innerhalb einer Transaktion zweimal den Bestand von Artikel 101. Dazwischen ändert eine andere Transaktion den Bestand und führt COMMIT aus. Die Auswertung soll beide Male denselben Wert erhalten. Welche Isolationsstufe ist <b>mindestens</b> erforderlich?",
    options: ["READ UNCOMMITTED", "READ COMMITTED", "REPEATABLE READ", "SERIALIZABLE"],
    correct: [2],
    solution: "<p>Das beschriebene Problem ist der <b>Non-Repeatable Read</b>. Er wird ab <b>REPEATABLE READ</b> verhindert (gelesene Zeilen bleiben bis zum Transaktionsende stabil). READ COMMITTED verhindert nur Dirty Reads; SERIALIZABLE verhindert zusätzlich Phantom Reads, ist aber nicht mindestens erforderlich.</p>",
    explanation: "Je höher die Isolationsstufe, desto weniger Anomalien – aber desto mehr Sperren/Wartezeiten und Deadlock-Gefahr. Standard in MySQL/InnoDB: REPEATABLE READ, in PostgreSQL/SQL Server: READ COMMITTED."
  });

  Q({
    id: TT + "-012", topic: TT, type: "text", difficulty: 2, points: 6,
    context: "<p>Eine Schulungsfirma speichert alle Daten in einer einzigen Tabelle:</p><table><tr><th>buchung_id</th><th>teilnehmer</th><th>kurs</th><th>dozent</th><th>dozent_telefon</th></tr><tr><td>1</td><td>Albrecht</td><td>SQL Grundlagen</td><td>Krause</td><td>030-111</td></tr><tr><td>2</td><td>Celik</td><td>SQL Grundlagen</td><td>Krause</td><td>030-111</td></tr><tr><td>3</td><td>Jung</td><td>Java Einstieg</td><td>Lehmann</td><td>040-222</td></tr></table>",
    question: "Erläutern Sie an diesem Beispiel die Änderungs- und die Löschanomalie und beschreiben Sie, wie sich die Anomalien auf Abfrageergebnisse auswirken können. Wie wird das Problem gelöst?",
    solution: "<ul><li><b>Änderungsanomalie</b>: Ändert sich die Telefonnummer von Krause, muss sie in allen Zeilen geändert werden. Wird eine Zeile vergessen, ist der Datenbestand inkonsistent – eine Abfrage <code>SELECT DISTINCT dozent_telefon … WHERE dozent = 'Krause'</code> liefert dann zwei verschiedene Nummern.</li><li><b>Löschanomalie</b>: Wird die einzige Buchung von Jung gelöscht, gehen auch die Informationen über den Kurs „Java Einstieg“ und den Dozenten Lehmann verloren – Abfragen nach allen Dozenten liefern Lehmann nicht mehr.</li><li>(Einfügeanomalie: Ein neuer Dozent ohne Buchung kann nicht erfasst werden.)</li></ul><p><b>Lösung:</b> Normalisierung bis zur 3. Normalform – Aufteilung in die Tabellen teilnehmer, kurs, dozent und buchung, verbunden über Primär-/Fremdschlüssel. Jede Information wird nur einmal gespeichert; Auswertungen erfolgen per JOIN.</p>",
    keywords: ["redundanz|redundant|mehrfach", "änderungsanomalie|änderung|update", "löschanomalie|lösch", "inkonsistent|widersprüchlich", "normalform|normalisierung|3nf", "tabelle|aufteil", "join|fremdschlüssel"]
  });

  Q({
    id: TT + "-013", topic: TT, type: "mc", difficulty: 1, points: 2,
    context: pre("START TRANSACTION;\nDELETE FROM bestellposition WHERE bestell_id = 1005;\nDELETE FROM bestellung WHERE bestell_id = 1005;\nROLLBACK;"),
    question: "Welchen Zustand haben die Tabellen nach Ausführung dieser Anweisungen?",
    options: [
      "Bestellung 1005 und ihre Positionen sind gelöscht.",
      "Nur die Positionen der Bestellung 1005 sind gelöscht.",
      "Beide Tabellen sind unverändert – alle Änderungen der Transaktion wurden zurückgenommen.",
      "Die Tabellen sind leer, weil ROLLBACK alle Daten zurücksetzt."
    ],
    correct: [2],
    solution: "<p><code>ROLLBACK</code> macht <b>alle</b> Änderungen seit <code>START TRANSACTION</code> rückgängig. Der Zustand entspricht dem vor Beginn der Transaktion.</p>",
    explanation: "Mit COMMIT wären beide Löschungen dauerhaft. DDL-Anweisungen (CREATE, DROP) führen in MySQL ein implizites COMMIT aus und lassen sich nicht zurückrollen."
  });

  Q({
    id: TT + "-014", topic: TT, type: "numeric", difficulty: 2, points: 3,
    context: "<p>Das Konto 1 hat einen Saldo von 1 000,00 €. Es wird folgende Sequenz ausgeführt:</p>" +
      pre("START TRANSACTION;\nUPDATE konto SET saldo = saldo - 200 WHERE konto_id = 1;\nSAVEPOINT sp1;\nUPDATE konto SET saldo = saldo - 300 WHERE konto_id = 1;\nROLLBACK TO SAVEPOINT sp1;\nUPDATE konto SET saldo = saldo + 50 WHERE konto_id = 1;\nCOMMIT;"),
    question: "Welchen Saldo hat Konto 1 nach dem COMMIT?",
    answer: 850,
    tolerance: 0.01,
    unit: "€",
    solution: "<p>1 000 − 200 = 800 (vor dem Savepoint). Die Abbuchung von 300 € wird durch <code>ROLLBACK TO SAVEPOINT sp1</code> zurückgenommen → wieder 800. Danach + 50 = <b>850,00 €</b>, mit COMMIT festgeschrieben.</p>",
    explanation: "ROLLBACK TO SAVEPOINT setzt nur bis zum Sicherungspunkt zurück, die Transaktion läuft weiter. Ein vollständiges ROLLBACK hätte 1 000 € ergeben."
  });

  Q({
    id: TT + "-015", topic: TT, type: "text", difficulty: 2, points: 4,
    question: "Grenzen Sie Trigger und Stored Procedures voneinander ab und nennen Sie je einen typischen Anwendungsfall.",
    solution: "<ul><li><b>Trigger</b>: an eine Tabelle und ein Ereignis (INSERT, UPDATE, DELETE; BEFORE/AFTER) gebunden und wird vom DBMS <b>automatisch</b> ausgelöst; keine Parameter, kein direkter Aufruf. Anwendung: Protokollierung (Audit-Log), automatische Bestandsfortschreibung, komplexe Integritätsprüfungen.</li><li><b>Stored Procedure</b>: in der Datenbank gespeicherte, benannte Routine mit Ein-/Ausgabeparametern, die <b>explizit</b> aufgerufen wird (<code>CALL bestellung_anlegen(…)</code>). Anwendung: wiederkehrende Geschäftslogik nahe an den Daten, z.B. Monatsabschluss; Vorteile: weniger Netzwerkverkehr, zentrale Logik, Rechte nur auf die Prozedur statt auf Tabellen.</li></ul>",
    keywords: ["trigger", "automatisch", "ereignis|insert|update|delete", "stored procedure|prozedur", "call|aufruf|explizit", "parameter", "protokoll|log"]
  });

})();
