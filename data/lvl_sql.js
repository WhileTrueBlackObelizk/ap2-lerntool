// GA2 – Lernpfad SQL: aufbauende Übungen in drei Levels (1 Leicht / 2 Mittel / 3 Schwer)
// Ergänzt die Topics aus data/ga2_sql.js (definiert KEINE eigenen Topics).
// Fragen-IDs: lvl-sql-<topic-kurz>-<nr>; Feld "step" = Reihenfolge innerhalb Topic + Level.
// Schemata und Hilfsfunktionen sind aus ga2_sql.js übernommen (eigene Kopie innerhalb dieser IIFE).
window.AP2 = window.AP2 || { topics: [], questions: [], exams: [], generators: [] };
(function () {
  "use strict";

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

  // ---------------------------------------------------------------------------
  // Zusätzliches Schema: Girokonten (für Transaktionsaufgaben)
  // ---------------------------------------------------------------------------
  var BANK = DB("Kontoverwaltung der „Nordbank eG“", "Die Genossenschaftsbank verwaltet Girokonten. Ein Saldo darf laut CHECK-Bedingung nie negativ werden (<code>CHECK (saldo &gt;= 0)</code>).", [
    T("konto", [
      ["konto_id", "INTEGER", "PRIMARY KEY"],
      ["inhaber", "VARCHAR(50)", "NOT NULL"],
      ["saldo", "DECIMAL(10,2)", "NOT NULL CHECK (saldo >= 0)"]
    ], [
      [1, "Mia Krüger", 500.0], [2, "Ole Brandt", 1200.0], [3, "Lina Vogt", 80.0],
      [4, "Tarik Aydin", 0.0], [5, "Sara Holm", 340.5], [6, "Jonas Peik", 2750.0]
    ])
  ]);

  var G = "GA2";
  function Q(o) {
    o.part = G;
    AP2.questions.push(o);
  }
  // SQL-Aufgabe: sol = Musterlösung (SQL), why = Erläuterung nach dem Code
  function SQ(o) {
    var s = o.sol.trim();
    if (!/;\s*$/.test(s)) s += ";";
    var q = {
      id: o.id, topic: o.topic, type: "sql", difficulty: o.d, step: o.step, points: o.p,
      context: o.ctx, question: o.q,
      sql: { setup: o.setup, solution: o.sol, ordered: !!o.ordered },
      solution: pre(s) + (o.why || ""),
      explanation: o.ex,
      tags: o.tags || []
    };
    if (o.check) q.sql.check = o.check;
    Q(q);
  }
  var L = { details: true }; // Leicht: Testdaten direkt aufklappbar

  // Prüfabfragen für DDL (Struktur aus den SQLite-Katalogfunktionen)
  function colCheck(t) {
    return "SELECT 'spalte', lower(name), CASE WHEN pk > 0 THEN 1 ELSE 0 END, CASE WHEN pk > 0 OR \"notnull\" = 1 THEN 1 ELSE 0 END FROM pragma_table_info('" + t + "')";
  }
  function fkCheck(t) {
    return "SELECT 'fk', lower(\"from\"), lower(\"table\"), CASE WHEN upper(on_delete) IN ('NO ACTION','RESTRICT') THEN 'VERHINDERN' ELSE upper(on_delete) END FROM pragma_foreign_key_list('" + t + "')";
  }

  // ===========================================================================
  // DDL
  // ===========================================================================
  var TD = "ga2-sql-ddl";

  SQ({
    id: "lvl-sql-ddl-01", topic: TD, d: 1, step: 1, p: 3,
    ctx: ctx(BIB, "Die Bibliothek möchte Genres künftig in einer eigenen Tabelle pflegen."),
    q: `Erstellen Sie eine SQL-Anweisung, die die Tabelle <code>genre</code> mit genau zwei Spalten anlegt:
<ul><li><code>genre_id</code> – ganze Zahl, Primärschlüssel</li>
<li><code>bezeichnung</code> – Zeichenkette mit max. 30 Zeichen</li></ul>
<p><small>Geprüft werden Spaltennamen und Primärschlüssel.</small></p>`,
    setup: BIB.sql,
    sol: `CREATE TABLE genre (
  genre_id    INTEGER PRIMARY KEY,
  bezeichnung VARCHAR(30)
)`,
    check: "SELECT lower(name), CASE WHEN pk > 0 THEN 1 ELSE 0 END FROM pragma_table_info('genre')",
    why: "<p>Grundmuster: <code>CREATE TABLE name ( spalte typ [constraint], … );</code> – Spaltendefinitionen werden durch Kommas getrennt, nach der letzten Spalte steht <b>kein</b> Komma.</p>",
    ex: "Hinweis für Einsteiger: Der Primärschlüssel identifiziert jede Zeile eindeutig. Typischer Fehler: Komma nach <code>VARCHAR(30)</code> vor der schließenden Klammer oder die Klammer ganz vergessen.",
    tags: ["CREATE TABLE", "PRIMARY KEY"]
  });

  SQ({
    id: "lvl-sql-ddl-02", topic: TD, d: 1, step: 2, p: 4,
    ctx: ctx(BIB, "Die Bibliothek eröffnet Zweigstellen. Fast alle liegen in Bremen."),
    q: `Erstellen Sie die Tabelle <code>zweigstelle</code> mit den Spalten
<ul><li><code>zweig_id</code> – ganze Zahl, Primärschlüssel</li>
<li><code>name</code> – Zeichenkette (max. 50 Zeichen), <b>Pflichtfeld</b></li>
<li><code>stadt</code> – Zeichenkette (max. 50 Zeichen) mit dem Standardwert <code>'Bremen'</code></li></ul>
<p><small>Geprüft werden Spaltennamen, Primärschlüssel, NOT NULL und Standardwert.</small></p>`,
    setup: BIB.sql,
    sol: `CREATE TABLE zweigstelle (
  zweig_id INTEGER PRIMARY KEY,
  name     VARCHAR(50) NOT NULL,
  stadt    VARCHAR(50) DEFAULT 'Bremen'
)`,
    check: "SELECT lower(name), CASE WHEN pk > 0 THEN 1 ELSE 0 END, CASE WHEN pk > 0 OR \"notnull\" = 1 THEN 1 ELSE 0 END, replace(dflt_value, '\"', '''') FROM pragma_table_info('zweigstelle')",
    why: "<p><code>NOT NULL</code> macht eine Spalte zum Pflichtfeld, <code>DEFAULT</code> legt fest, welcher Wert eingetragen wird, wenn beim INSERT kein Wert angegeben wird.</p>",
    ex: "Hinweis: Textwerte stehen in SQL in <b>einfachen</b> Hochkommas: <code>DEFAULT 'Bremen'</code>. Häufiger Fehler: <code>DEFAULT Bremen</code> ohne Hochkommas oder NOT NULL beim Standardwert statt beim Namen.",
    tags: ["CREATE TABLE", "NOT NULL", "DEFAULT"]
  });

  SQ({
    id: "lvl-sql-ddl-03", topic: TD, d: 1, step: 3, p: 3,
    ctx: ctx(FUHRPARK, "Die Fahrer sollen künftig per E-Mail über Werkstatttermine informiert werden."),
    q: `Fügen Sie der bestehenden Tabelle <code>fahrer</code> die Spalte <code>email</code> (Zeichenkette, max. 100 Zeichen) hinzu. Die vorhandenen Daten dürfen nicht verloren gehen.`,
    setup: FUHRPARK.sql,
    sol: `ALTER TABLE fahrer ADD COLUMN email VARCHAR(100)`,
    check: "SELECT lower(name) FROM pragma_table_info('fahrer') UNION ALL SELECT COUNT(*) FROM fahrer",
    why: "<p><code>ALTER TABLE … ADD [COLUMN] …</code> ändert die <b>Struktur</b> einer bestehenden Tabelle. Alle vorhandenen Fahrer erhalten in der neuen Spalte den Wert NULL.</p>",
    ex: "Hinweis: Eine Tabelle löschen und neu anlegen würde die Daten vernichten. In MySQL darf <code>COLUMN</code> weggelassen werden (<code>ALTER TABLE fahrer ADD email VARCHAR(100);</code>).",
    tags: ["ALTER TABLE"]
  });

  var ALT_SQL = "CREATE TABLE ausleihe_alt (\n  ausleihe_id INTEGER PRIMARY KEY,\n  buch_id INTEGER,\n  leser_id INTEGER,\n  ausleihdatum DATE\n);\nINSERT INTO ausleihe_alt VALUES (1, 1, 1, '2019-05-03'), (2, 7, 1, '2019-06-11'), (3, 3, 2, '2020-01-15'), (4, 9, 2, '2020-02-01'), (5, 5, 3, '2021-03-12');\n";
  SQ({
    id: "lvl-sql-ddl-04", topic: TD, d: 1, step: 4, p: 2,
    ctx: ctx(BIB, "Aus einer Altdatenübernahme existiert noch die Tabelle <b>ausleihe_alt</b> (Spalten ausleihe_id, buch_id, leser_id, ausleihdatum). Sie wird nicht mehr benötigt."),
    q: `Entfernen Sie die Tabelle <code>ausleihe_alt</code> vollständig – also <b>Struktur und Daten</b> – aus der Datenbank.`,
    setup: BIB.sql + ALT_SQL,
    sol: `DROP TABLE ausleihe_alt`,
    check: "SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name",
    why: "<p><code>DROP TABLE</code> löscht die Tabelle samt Inhalt. Danach existiert der Tabellenname nicht mehr.</p>",
    ex: "Hinweis: <code>DELETE FROM ausleihe_alt;</code> löscht nur die <b>Zeilen</b> (DML) – die leere Tabelle bleibt bestehen. <code>DROP</code> ist DDL und lässt sich (bei Autocommit) nicht rückgängig machen.",
    tags: ["DROP TABLE"]
  });

  SQ({
    id: "lvl-sql-ddl-05", topic: TD, d: 1, step: 5, p: 3,
    ctx: ctx(BIB, "Am Ausleihtresen wird ständig nach allen Ausleihen eines Lesers gesucht (<code>WHERE leser_id = …</code>). Die Abfrage soll schneller werden."),
    q: `Erstellen Sie einen (nicht eindeutigen) Index mit dem Namen <code>idx_ausleihe_leser</code> auf der Spalte <code>leser_id</code> der Tabelle <code>ausleihe</code>.`,
    setup: BIB.sql,
    sol: `CREATE INDEX idx_ausleihe_leser ON ausleihe(leser_id)`,
    check: "SELECT lower(il.name), lower(ii.name), il.\"unique\" FROM pragma_index_list('ausleihe') AS il, pragma_index_info(il.name) AS ii WHERE il.origin = 'c'",
    why: "<p>Syntax: <code>CREATE INDEX indexname ON tabelle(spalte);</code>. Der Index (meist ein B-Baum) erlaubt dem DBMS, die passenden Zeilen ohne vollständigen Tabellendurchlauf zu finden.</p>",
    ex: "Hinweis: <code>UNIQUE</code> wäre hier falsch – ein Leser hat viele Ausleihen, die Werte in leser_id wiederholen sich. Ein Index kostet Speicher und verlangsamt INSERT/UPDATE leicht.",
    tags: ["CREATE INDEX"]
  });

  SQ({
    id: "lvl-sql-ddl-06", topic: TD, d: 1, step: 6, p: 4,
    ctx: ctx(FUHRPARK, "Die Disposition soll eine einfache Telefonliste der Fahrer erhalten.", L),
    q: `Erstellen Sie eine View <code>v_fahrer_kontakt</code> mit den Spalten <code>nachname</code>, <code>vorname</code> und <code>telefon</code> (in dieser Reihenfolge) aller Fahrer, für die eine Telefonnummer hinterlegt ist.`,
    setup: FUHRPARK.sql,
    sol: `CREATE VIEW v_fahrer_kontakt AS
SELECT nachname, vorname, telefon
FROM fahrer
WHERE telefon IS NOT NULL`,
    check: "SELECT * FROM v_fahrer_kontakt",
    why: "<p>Eine View ist eine gespeicherte SELECT-Abfrage: <code>CREATE VIEW name AS SELECT …;</code>. Sie liefert hier 4 Fahrer und kann wie eine Tabelle abgefragt werden.</p>",
    ex: "Hinweis: „hinterlegt“ heißt <code>IS NOT NULL</code> – <code>telefon &lt;&gt; NULL</code> liefert nie eine Zeile.",
    tags: ["CREATE VIEW"]
  });

  SQ({
    id: "lvl-sql-ddl-07", topic: TD, d: 2, step: 1, p: 6,
    ctx: ctx(BIB, "Leser sollen ausgeliehene Bücher vormerken können."),
    q: `Erstellen Sie die Tabelle <code>vormerkung</code>:
<ul><li><code>vormerk_id</code> – ganze Zahl, Primärschlüssel</li>
<li><code>buch_id</code> – ganze Zahl, Pflichtfeld, Fremdschlüssel auf <code>buch</code>; ein Buch mit Vormerkungen darf <b>nicht gelöscht</b> werden können</li>
<li><code>leser_id</code> – ganze Zahl, Pflichtfeld, Fremdschlüssel auf <code>leser</code>; wird ein Leser gelöscht, sollen seine Vormerkungen <b>automatisch mitgelöscht</b> werden</li>
<li><code>vorgemerkt_am</code> – Datum, Pflichtfeld</li></ul>
<p><small>Geprüft werden Spalten, Primärschlüssel, NOT NULL, Fremdschlüssel und deren Löschverhalten.</small></p>`,
    setup: BIB.sql,
    sol: `CREATE TABLE vormerkung (
  vormerk_id    INTEGER PRIMARY KEY,
  buch_id       INTEGER NOT NULL,
  leser_id      INTEGER NOT NULL,
  vorgemerkt_am DATE    NOT NULL,
  FOREIGN KEY (buch_id)  REFERENCES buch(buch_id)   ON DELETE RESTRICT,
  FOREIGN KEY (leser_id) REFERENCES leser(leser_id) ON DELETE CASCADE
)`,
    check: colCheck("vormerkung") + " UNION ALL " + fkCheck("vormerkung"),
    why: "<p><code>ON DELETE CASCADE</code> löscht abhängige Zeilen mit, <code>ON DELETE RESTRICT</code> (bzw. das Standardverhalten <code>NO ACTION</code>) verhindert das Löschen des referenzierten Datensatzes, solange noch Verweise existieren.</p>",
    ex: "Typischer Fehler: CASCADE beim Buch – dann würde das Löschen eines Buches still alle Vormerkungen vernichten. Ebenfalls häufig: <code>FOREIGN KEY leser_id REFERENCES …</code> ohne Klammern um die Spalte.",
    tags: ["FOREIGN KEY", "ON DELETE CASCADE"]
  });

  SQ({
    id: "lvl-sql-ddl-08", topic: TD, d: 2, step: 2, p: 6,
    ctx: ctx(FUHRPARK, "Künftig werden alle Tankvorgänge erfasst."),
    q: `Erstellen Sie die Tabelle <code>tankung</code>:
<ul><li><code>tank_id</code> – ganze Zahl, Primärschlüssel</li>
<li><code>fz_id</code> – ganze Zahl, Pflichtfeld, Fremdschlüssel auf <code>fahrzeug</code></li>
<li><code>datum</code> – Datum, Pflichtfeld</li>
<li><code>liter</code> – Dezimalzahl mit 2 Nachkommastellen (max. 999,99), Pflichtfeld, muss <b>größer 0</b> sein (CHECK)</li>
<li><code>betrag</code> – Geldbetrag mit 2 Nachkommastellen (max. 99999,99)</li></ul>
<p><small>Geprüft werden Spalten, PK, NOT NULL, Fremdschlüssel und das Vorhandensein der CHECK-Bedingung für liter.</small></p>`,
    setup: FUHRPARK.sql,
    sol: `CREATE TABLE tankung (
  tank_id INTEGER PRIMARY KEY,
  fz_id   INTEGER NOT NULL REFERENCES fahrzeug(fz_id),
  datum   DATE NOT NULL,
  liter   DECIMAL(5,2) NOT NULL CHECK (liter > 0),
  betrag  DECIMAL(7,2)
)`,
    check: colCheck("tankung") + " UNION ALL " + fkCheck("tankung") + " UNION ALL SELECT 'check', CASE WHEN lower(sql) LIKE '%check%liter%' THEN 1 ELSE 0 END, NULL, NULL FROM sqlite_master WHERE name = 'tankung'",
    why: "<p><code>DECIMAL(5,2)</code>: 5 Stellen insgesamt, davon 2 nach dem Komma → max. 999,99. <code>DECIMAL(7,2)</code> → max. 99999,99. Die CHECK-Bedingung weist jeden INSERT/UPDATE mit liter ≤ 0 ab.</p>",
    ex: "Häufige Fehler: <code>DECIMAL(2,5)</code> (Parameter vertauscht), FLOAT für Geldbeträge (Rundungsfehler), <code>CHECK liter &gt; 0</code> ohne Klammern.",
    tags: ["CHECK", "DECIMAL", "FOREIGN KEY"]
  });

  SQ({
    id: "lvl-sql-ddl-09", topic: TD, d: 2, step: 3, p: 6,
    ctx: ctx(FUHRPARK, "Für die Buchhaltung wird eine lesbare Sicht auf das Fahrtenbuch benötigt."),
    q: `Erstellen Sie die View <code>v_fahrtenbuch</code> mit den Spalten <code>datum</code>, <code>kennzeichen</code>, <code>nachname</code> (des Fahrers) und <code>km</code> (gefahrene Kilometer = km_ende − km_start) für alle Fahrten – in dieser Spaltenreihenfolge.`,
    setup: FUHRPARK.sql,
    sol: `CREATE VIEW v_fahrtenbuch AS
SELECT f.datum, fz.kennzeichen, fa.nachname, f.km_ende - f.km_start AS km
FROM fahrt f
JOIN fahrzeug fz ON fz.fz_id = f.fz_id
JOIN fahrer fa   ON fa.fahrer_id = f.fahrer_id`,
    check: "SELECT * FROM v_fahrtenbuch",
    why: "<p>Eine View kann beliebige SELECT-Abfragen kapseln – auch JOINs und berechnete Spalten. Berechnete Spalten brauchen einen Alias, damit die View-Spalte einen sinnvollen Namen bekommt.</p>",
    ex: "Typischer Fehler: <code>km_start - km_ende</code> (negatives Ergebnis) oder fehlende Join-Bedingung (kartesisches Produkt mit 12 × 8 × 6 Zeilen).",
    tags: ["CREATE VIEW", "JOIN"]
  });

  SQ({
    id: "lvl-sql-ddl-10", topic: TD, d: 3, step: 1, p: 8,
    ctx: ctx(SEMINAR, "Manche Kurse setzen andere Kurse voraus (z.B. „SQL für Fortgeschrittene“ setzt „SQL Grundlagen“ voraus). Ein Kurs kann mehrere Voraussetzungen haben und selbst Voraussetzung für mehrere Kurse sein."),
    q: `Erstellen Sie die Tabelle <code>kurs_voraussetzung</code> zur Abbildung dieser rekursiven m:n-Beziehung:
<ul><li><code>kurs_id</code> und <code>voraussetzung_id</code> – ganze Zahlen, beide Fremdschlüssel auf <code>kurs(kurs_id)</code></li>
<li>Der Primärschlüssel besteht aus beiden Spalten.</li>
<li>Ein Kurs darf nicht Voraussetzung für sich selbst sein (CHECK).</li></ul>
<p><small>Geprüft werden Spalten, Primärschlüssel, beide Fremdschlüssel (inkl. referenzierter Spalte) und das Vorhandensein einer CHECK-Bedingung.</small></p>`,
    setup: SEMINAR.sql,
    sol: `CREATE TABLE kurs_voraussetzung (
  kurs_id          INTEGER NOT NULL,
  voraussetzung_id INTEGER NOT NULL,
  PRIMARY KEY (kurs_id, voraussetzung_id),
  FOREIGN KEY (kurs_id)          REFERENCES kurs(kurs_id),
  FOREIGN KEY (voraussetzung_id) REFERENCES kurs(kurs_id),
  CHECK (kurs_id <> voraussetzung_id)
)`,
    check: "SELECT 'spalte', lower(name), CASE WHEN pk > 0 THEN 1 ELSE 0 END, NULL FROM pragma_table_info('kurs_voraussetzung') UNION ALL SELECT 'fk', lower(\"from\"), lower(\"table\"), COALESCE(lower(\"to\"), 'kurs_id') FROM pragma_foreign_key_list('kurs_voraussetzung') UNION ALL SELECT 'check', CASE WHEN lower(sql) LIKE '%check%' THEN 1 ELSE 0 END, NULL, NULL FROM sqlite_master WHERE name = 'kurs_voraussetzung'",
    why: "<p>Eine m:n-Beziehung einer Tabelle mit sich selbst wird über eine Zwischentabelle mit <b>zwei</b> Fremdschlüsseln auf dieselbe Tabelle aufgelöst. Der zusammengesetzte PK verhindert doppelte Einträge derselben Voraussetzung; die CHECK-Bedingung vergleicht zwei Spalten und steht deshalb als Tabellen-Constraint am Ende.</p>",
    ex: "IHK-Fallen: zwei PRIMARY-KEY-Angaben (<code>kurs_id INTEGER PRIMARY KEY, voraussetzung_id INTEGER PRIMARY KEY</code>) sind unzulässig; ein PK nur auf kurs_id würde nur eine Voraussetzung je Kurs erlauben. Die Spalte darf nicht ebenfalls <code>kurs_id</code> heißen – Spaltennamen müssen innerhalb einer Tabelle eindeutig sein.",
    tags: ["zusammengesetzter Schlüssel", "m:n", "CHECK", "rekursive Beziehung"]
  });

  SQ({
    id: "lvl-sql-ddl-11", topic: TD, d: 3, step: 2, p: 10,
    ctx: ctx(SHOP, "Kunden sollen Artikel mit 1 bis 5 Sternen bewerten können. Jeder Kunde darf jeden Artikel höchstens einmal bewerten."),
    q: `Erstellen Sie die Tabelle <code>bewertung</code>:
<ul><li><code>bewertung_id</code> – ganze Zahl, Primärschlüssel</li>
<li><code>kunden_id</code> – Pflichtfeld, Fremdschlüssel auf <code>kunde</code>; beim Löschen eines Kunden werden seine Bewertungen mitgelöscht</li>
<li><code>artikel_id</code> – Pflichtfeld, Fremdschlüssel auf <code>artikel</code> (Standard-Löschverhalten)</li>
<li><code>sterne</code> – ganze Zahl, Pflichtfeld, nur Werte von 1 bis 5 (CHECK)</li>
<li><code>kommentar</code> – Text</li>
<li><code>bewertet_am</code> – Datum mit dem Standardwert aktuelles Datum (<code>CURRENT_DATE</code>)</li>
<li>Die Kombination aus <code>kunden_id</code> und <code>artikel_id</code> muss eindeutig sein.</li></ul>
<p><small>Geprüft werden Spalten, PK, NOT NULL, Standardwert, Fremdschlüssel inkl. Löschverhalten, die Eindeutigkeit der Kombination und die CHECK-Bedingung für sterne.</small></p>`,
    setup: SHOP.sql,
    sol: `CREATE TABLE bewertung (
  bewertung_id INTEGER PRIMARY KEY,
  kunden_id    INTEGER NOT NULL,
  artikel_id   INTEGER NOT NULL,
  sterne       INTEGER NOT NULL CHECK (sterne BETWEEN 1 AND 5),
  kommentar    TEXT,
  bewertet_am  DATE DEFAULT CURRENT_DATE,
  UNIQUE (kunden_id, artikel_id),
  FOREIGN KEY (kunden_id)  REFERENCES kunde(kunden_id) ON DELETE CASCADE,
  FOREIGN KEY (artikel_id) REFERENCES artikel(artikel_id)
)`,
    check: "SELECT 'spalte', lower(name), CASE WHEN pk > 0 THEN 1 ELSE 0 END, (CASE WHEN pk > 0 OR \"notnull\" = 1 THEN 'NN' ELSE '' END) || COALESCE(upper(dflt_value), '') FROM pragma_table_info('bewertung') UNION ALL " + fkCheck("bewertung") +
      " UNION ALL SELECT 'unique', lower(ii.name), (SELECT COUNT(*) FROM pragma_index_info(il.name)), NULL FROM pragma_index_list('bewertung') AS il, pragma_index_info(il.name) AS ii WHERE il.\"unique\" = 1 AND il.origin <> 'pk'" +
      " UNION ALL SELECT 'check', CASE WHEN lower(sql) LIKE '%check%sterne%' THEN 1 ELSE 0 END, NULL, NULL FROM sqlite_master WHERE name = 'bewertung'",
    why: "<p>Die Bedingung „jeder Kunde bewertet jeden Artikel höchstens einmal“ ist ein <b>zusammengesetzter UNIQUE-Constraint</b> über zwei Spalten – ein UNIQUE auf jeder Spalte einzeln wäre falsch (dann dürfte jeder Kunde insgesamt nur einen Artikel bewerten). Alternativ kann <code>CHECK (sterne &gt;= 1 AND sterne &lt;= 5)</code> geschrieben werden.</p>",
    ex: "IHK-Fallen: <code>kunden_id INTEGER UNIQUE, artikel_id INTEGER UNIQUE</code> (zwei Einzel-UNIQUEs), CASCADE auch beim Artikel, <code>DEFAULT 'CURRENT_DATE'</code> in Hochkommas (dann wird der Text gespeichert statt des Datums). Alternativ wäre auch ein zusammengesetzter PK (kunden_id, artikel_id) ohne bewertung_id fachlich vertretbar – hier ist aber eine eigene ID gefordert.",
    tags: ["UNIQUE", "CHECK", "DEFAULT", "ON DELETE CASCADE"]
  });

  SQ({
    id: "lvl-sql-ddl-12", topic: TD, d: 3, step: 3, p: 8,
    ctx: ctx(SEMINAR, "Das Kursmanagement benötigt eine Auslastungsübersicht, die auch Kurse ohne Buchungen zeigt."),
    q: `Erstellen Sie die View <code>v_kursauslastung</code> mit den Spalten <code>titel</code>, <code>max_teilnehmer</code>, <code>gebucht</code> (Anzahl Buchungen) und <code>frei</code> (max_teilnehmer − gebucht) – in dieser Reihenfolge – für <b>alle</b> Kurse. Kurse ohne Buchung erscheinen mit gebucht = 0.`,
    setup: SEMINAR.sql,
    sol: `CREATE VIEW v_kursauslastung AS
SELECT k.titel, k.max_teilnehmer,
       COUNT(b.buchung_id) AS gebucht,
       k.max_teilnehmer - COUNT(b.buchung_id) AS frei
FROM kurs k
LEFT JOIN buchung b ON b.kurs_id = k.kurs_id
GROUP BY k.kurs_id, k.titel, k.max_teilnehmer`,
    check: "SELECT * FROM v_kursauslastung",
    why: "<p>Der LEFT JOIN behält auch „Git und DevOps“ (keine Buchung). <code>COUNT(b.buchung_id)</code> zählt nur Nicht-NULL-Werte und liefert daher 0, frei ist dann 12.</p>",
    ex: "IHK-Falle: <code>COUNT(*)</code> zählt die durch den LEFT JOIN entstandene NULL-Zeile mit und liefert 1 statt 0. Mit INNER JOIN fehlt der Kurs ganz. Gruppiert wird über den Primärschlüssel – zwei Kurse mit gleichem Titel würden sonst zusammengefasst.",
    tags: ["CREATE VIEW", "LEFT JOIN", "COUNT"]
  });

  SQ({
    id: "lvl-sql-ddl-13", topic: TD, d: 3, step: 4, p: 9,
    ctx: ctx(FUHRPARK, "Jedes Fahrzeug kann höchstens <b>einen</b> Wartungsvertrag haben (1:1-Beziehung bzw. 1:c). Wird ein Fahrzeug ausgemustert und gelöscht, entfällt auch sein Vertrag."),
    q: `Erstellen Sie die Tabelle <code>wartungsvertrag</code>:
<ul><li><code>vertrag_id</code> – ganze Zahl, Primärschlüssel</li>
<li><code>fz_id</code> – ganze Zahl, Pflichtfeld, Fremdschlüssel auf <code>fahrzeug</code> mit Löschweitergabe; jedes Fahrzeug darf nur in <b>einem</b> Vertrag vorkommen</li>
<li><code>werkstatt</code> – Zeichenkette (max. 50), Pflichtfeld</li>
<li><code>monatsrate</code> – Geldbetrag (max. 9999,99), größer 0</li>
<li><code>beginn</code> – Datum, Pflichtfeld; <code>ende</code> – Datum, darf leer sein, muss sonst nach beginn liegen</li></ul>
<p>Formulieren Sie die beiden Bedingungen als <b>zwei getrennte</b> CHECK-Constraints.</p>
<p><small>Geprüft werden Spalten, PK, NOT NULL, Fremdschlüssel inkl. Löschverhalten, die Eindeutigkeit von fz_id und die Anzahl der CHECK-Constraints.</small></p>`,
    setup: FUHRPARK.sql,
    sol: `CREATE TABLE wartungsvertrag (
  vertrag_id INTEGER PRIMARY KEY,
  fz_id      INTEGER NOT NULL UNIQUE,
  werkstatt  VARCHAR(50) NOT NULL,
  monatsrate DECIMAL(6,2) CHECK (monatsrate > 0),
  beginn     DATE NOT NULL,
  ende       DATE,
  CHECK (ende IS NULL OR ende > beginn),
  FOREIGN KEY (fz_id) REFERENCES fahrzeug(fz_id) ON DELETE CASCADE
)`,
    check: colCheck("wartungsvertrag") + " UNION ALL " + fkCheck("wartungsvertrag") +
      " UNION ALL SELECT 'unique', lower(ii.name), NULL, NULL FROM pragma_index_list('wartungsvertrag') AS il, pragma_index_info(il.name) AS ii WHERE il.\"unique\" = 1 AND il.origin <> 'pk'" +
      " UNION ALL SELECT 'checks', (length(lower(sql)) - length(replace(lower(sql), 'check', ''))) / 5, NULL, NULL FROM sqlite_master WHERE name = 'wartungsvertrag'",
    why: "<p>Eine <b>1:1-Beziehung</b> wird über einen Fremdschlüssel mit zusätzlichem <code>UNIQUE</code> umgesetzt – ohne UNIQUE wäre es eine 1:n-Beziehung. Die Bedingung für ende vergleicht zwei Spalten (Tabellen-CHECK). <code>ende IS NULL OR …</code> ist streng genommen nicht nötig, weil ein CHECK mit Ergebnis UNKNOWN (NULL) als erfüllt gilt – es macht die Absicht aber explizit.</p>",
    ex: "IHK-Fallen: UNIQUE vergessen (dann sind mehrere Verträge je Fahrzeug möglich), <code>fz_id INTEGER PRIMARY KEY</code> zusätzlich zu vertrag_id (zwei PKs), Löschweitergabe vergessen, Datumsvergleich als Text ohne ISO-Format.",
    tags: ["1:1-Beziehung", "UNIQUE", "CHECK", "ON DELETE CASCADE"]
  });

  SQ({
    id: "lvl-sql-ddl-14", topic: TD, d: 3, step: 5, p: 10,
    ctx: ctx(SUPPORT, "Die IT-Abteilung möchte Projekte erfassen. An einem Projekt arbeiten mehrere Mitarbeiter, ein Mitarbeiter kann in mehreren Projekten mitarbeiten; je Zuordnung werden seine Rolle und die geplanten Stunden gespeichert."),
    q: `Erstellen Sie mit zwei CREATE-TABLE-Anweisungen:
<ol><li><code>projekt</code>: <code>projekt_id</code> (ganze Zahl, PK), <code>titel</code> (max. 80 Zeichen, Pflichtfeld), <code>start</code> (Datum)</li>
<li><code>projekt_mitarbeiter</code>: <code>projekt_id</code>, <code>ma_id</code> (beide ganze Zahlen, zusammen Primärschlüssel), <code>rolle</code> (max. 30 Zeichen, Pflichtfeld), <code>stunden</code> (ganze Zahl, nicht negativ – CHECK).<br>
<code>projekt_id</code> verweist auf <code>projekt</code> – wird ein Projekt gelöscht, werden seine Zuordnungen mitgelöscht. <code>ma_id</code> verweist auf <code>mitarbeiter</code> (Standard-Löschverhalten).</li></ol>
<p><small>Geprüft werden beide Tabellen: Spalten, PK, NOT NULL, Fremdschlüssel inkl. Löschverhalten und die CHECK-Bedingung.</small></p>`,
    setup: SUPPORT.sql,
    sol: `CREATE TABLE projekt (
  projekt_id INTEGER PRIMARY KEY,
  titel      VARCHAR(80) NOT NULL,
  start      DATE
);
CREATE TABLE projekt_mitarbeiter (
  projekt_id INTEGER,
  ma_id      INTEGER,
  rolle      VARCHAR(30) NOT NULL,
  stunden    INTEGER CHECK (stunden >= 0),
  PRIMARY KEY (projekt_id, ma_id),
  FOREIGN KEY (projekt_id) REFERENCES projekt(projekt_id) ON DELETE CASCADE,
  FOREIGN KEY (ma_id)      REFERENCES mitarbeiter(ma_id)
);`,
    check: colCheck("projekt") + " UNION ALL " + colCheck("projekt_mitarbeiter") + " UNION ALL " + fkCheck("projekt_mitarbeiter") +
      " UNION ALL SELECT 'check', CASE WHEN lower(sql) LIKE '%check%stunden%' THEN 1 ELSE 0 END, NULL, NULL FROM sqlite_master WHERE name = 'projekt_mitarbeiter'",
    why: "<p>Die m:n-Beziehung zwischen projekt und mitarbeiter wird über die Zwischentabelle <code>projekt_mitarbeiter</code> aufgelöst. Ihre Attribute (rolle, stunden) beschreiben die <b>Beziehung</b>, nicht Projekt oder Mitarbeiter allein. Die Tabelle <code>projekt</code> muss <b>zuerst</b> angelegt werden, weil die Zwischentabelle auf sie verweist.</p>",
    ex: "IHK-Fallen: falsche Reihenfolge der CREATE-Anweisungen (in MySQL Fehler beim FK), rolle als Spalte in mitarbeiter (dann nur eine Rolle über alle Projekte), PK nur auf projekt_id, CASCADE auch beim Mitarbeiter-FK.",
    tags: ["m:n", "Zwischentabelle", "zusammengesetzter Schlüssel", "ON DELETE CASCADE"]
  });

  SQ({
    id: "lvl-sql-ddl-15", topic: TD, d: 3, step: 6, p: 9,
    ctx: ctx(FUHRPARK, "Der Fuhrparkleiter möchte auf einen Blick sehen, welche Fahrzeuge zur Wartung müssen. Als fällig gilt ein Fahrzeug, dessen letzte Wartung vor dem 01.04.2026 lag <b>oder</b> das noch nie gewartet wurde."),
    q: `Erstellen Sie die View <code>v_wartungsstatus</code> mit den Spalten <code>kennzeichen</code>, <code>letzte_wartung</code> (Datum der letzten Wartung, NULL wenn keine) und <code>hinweis</code> ('fällig' oder 'ok') – in dieser Reihenfolge – für <b>alle</b> Fahrzeuge.`,
    setup: FUHRPARK.sql,
    sol: `CREATE VIEW v_wartungsstatus AS
SELECT fz.kennzeichen,
       MAX(w.datum) AS letzte_wartung,
       CASE WHEN MAX(w.datum) IS NULL OR MAX(w.datum) < '2026-04-01'
            THEN 'fällig' ELSE 'ok' END AS hinweis
FROM fahrzeug fz
LEFT JOIN wartung w ON w.fz_id = fz.fz_id
GROUP BY fz.fz_id, fz.kennzeichen`,
    check: "SELECT * FROM v_wartungsstatus",
    why: "<p>Ergebnis: HH-FI 202 (letzte Wartung 2025-11-20), M-FI 302 und HH-FI 203 (nie gewartet) sind fällig, alle anderen ok. Der LEFT JOIN liefert für nie gewartete Fahrzeuge <code>MAX(w.datum) = NULL</code>.</p>",
    ex: "IHK-Falle NULL: <code>CASE WHEN MAX(w.datum) &lt; '2026-04-01' THEN 'fällig' ELSE 'ok' END</code> stuft nie gewartete Fahrzeuge als 'ok' ein, weil der Vergleich mit NULL UNKNOWN ergibt und in den ELSE-Zweig fällt. Mit INNER JOIN fehlen diese Fahrzeuge ganz.",
    tags: ["CREATE VIEW", "CASE", "LEFT JOIN", "NULL"]
  });

  Q({
    id: "lvl-sql-ddl-16", topic: TD, type: "multi", difficulty: 3, step: 7, points: 6,
    context: "<p>Gegeben ist (MySQL, InnoDB):</p>" + pre("CREATE TABLE abteilung (\n  abt_id INT PRIMARY KEY,\n  name   VARCHAR(50) NOT NULL UNIQUE\n);\nCREATE TABLE mitarbeiter (\n  ma_id  INT PRIMARY KEY,\n  email  VARCHAR(100) UNIQUE,\n  abt_id INT,\n  FOREIGN KEY (abt_id) REFERENCES abteilung(abt_id) ON DELETE SET NULL\n);"),
    question: "Welche Aussagen sind zutreffend? (Mehrere Antworten möglich)",
    options: [
      "Mehrere Mitarbeiter dürfen in der Spalte email den Wert NULL haben.",
      "Wird eine Abteilung gelöscht, werden alle ihre Mitarbeiter ebenfalls gelöscht.",
      "Wird eine Abteilung gelöscht, erhalten ihre Mitarbeiter in abt_id den Wert NULL.",
      "Ein Mitarbeiter mit abt_id = 99 kann eingefügt werden, wenn es keine Abteilung 99 gibt.",
      "Die Tabelle abteilung muss vor der Tabelle mitarbeiter angelegt werden.",
      "Zwei Abteilungen dürfen denselben Namen haben, solange ihre abt_id verschieden ist.",
      "Ein Mitarbeiter ohne Abteilung (abt_id NULL) verletzt die referenzielle Integrität."
    ],
    correct: [0, 2, 4],
    solution: "<p>Richtig: 1, 3, 5.</p><ul><li>UNIQUE erlaubt mehrere NULL-Werte (NULL ist „unbekannt“ und gilt nicht als gleich).</li><li><code>ON DELETE SET NULL</code> setzt den Fremdschlüssel der abhängigen Zeilen auf NULL – gelöscht würde nur bei CASCADE.</li><li>abt_id = 99 ohne passende Abteilung verletzt den Fremdschlüssel und wird abgewiesen; NULL dagegen ist erlaubt (die Spalte ist nicht NOT NULL).</li><li>Die referenzierte Tabelle muss vorher existieren.</li><li><code>name … UNIQUE</code> verbietet doppelte Abteilungsnamen.</li></ul>",
    explanation: "Typische Prüfungsfalle: UNIQUE wird mit „keine NULL“ verwechselt, und SET NULL mit CASCADE. Merksatz: Ein Fremdschlüssel muss entweder auf einen existierenden Schlüssel zeigen oder NULL sein.",
    tags: ["UNIQUE", "ON DELETE SET NULL", "referenzielle Integrität"]
  });

  // ===========================================================================
  // SELECT
  // ===========================================================================
  var TS = "ga2-sql-select";

  SQ({
    id: "lvl-sql-select-01", topic: TS, d: 1, step: 1, p: 2,
    ctx: ctx(BIB, "Sie verschaffen sich einen ersten Überblick über die Bibliotheksdatenbank.", L),
    q: `Geben Sie <b>alle Spalten</b> und alle Zeilen der Tabelle <code>autor</code> aus. Die Sortierung spielt keine Rolle.`,
    setup: BIB.sql,
    sol: `SELECT * FROM autor`,
    why: "<p>Der Stern <code>*</code> steht für „alle Spalten in der Reihenfolge der Tabellendefinition“. Ohne WHERE werden alle 7 Zeilen geliefert.</p>",
    ex: "Hinweis: Jede SQL-Abfrage braucht mindestens <code>SELECT … FROM …</code>. In der Prüfung sollten Sie statt <code>*</code> meist die geforderten Spalten einzeln nennen – hier sind aber ausdrücklich alle gefragt.",
    tags: ["SELECT *"]
  });

  SQ({
    id: "lvl-sql-select-02", topic: TS, d: 1, step: 2, p: 3,
    ctx: ctx(SEMINAR, "Die Kurspreise in der Datenbank sind Nettopreise. Für Privatkunden sollen die Bruttopreise (19 % USt.) angezeigt werden.", L),
    q: `Geben Sie für alle Kurse <code>titel</code>, <code>preis</code> und den Bruttopreis mit dem Alias <code>brutto</code> (preis × 1,19, auf 2 Nachkommastellen gerundet) aus – in dieser Spaltenreihenfolge. Die Sortierung spielt keine Rolle.`,
    setup: SEMINAR.sql,
    sol: `SELECT titel, preis, ROUND(preis * 1.19, 2) AS brutto
FROM kurs`,
    why: "<p>Im SELECT dürfen Berechnungen stehen. Mit <code>AS</code> erhält die berechnete Spalte einen Namen (Alias). <code>ROUND(wert, 2)</code> rundet auf 2 Nachkommastellen.</p>",
    ex: "Hinweis: Dezimalpunkt statt Komma verwenden (<code>1.19</code>, nicht <code>1,19</code> – das Komma würde zwei Spalten erzeugen!).",
    tags: ["Alias", "Berechnung", "ROUND"]
  });

  SQ({
    id: "lvl-sql-select-03", topic: TS, d: 1, step: 3, p: 2,
    ctx: ctx(SUPPORT, "Für die Inventur wird eine Liste aller vorhandenen Gerätetypen benötigt.", L),
    q: `Geben Sie jeden Gerätetyp (<code>typ</code>) aus der Tabelle <code>geraet</code> <b>genau einmal</b> aus, alphabetisch aufsteigend sortiert.`,
    setup: SUPPORT.sql,
    sol: `SELECT DISTINCT typ
FROM geraet
ORDER BY typ`,
    ordered: true,
    why: "<p><code>DISTINCT</code> entfernt doppelte Ergebniszeilen. Ergebnis: Desktop, Drucker, Monitor, Notebook, Smartphone.</p>",
    ex: "Hinweis: Ohne DISTINCT erscheinen 12 Zeilen (z.B. viermal 'Notebook'). <code>ORDER BY</code> ohne Zusatz sortiert aufsteigend (ASC).",
    tags: ["DISTINCT", "ORDER BY"]
  });

  SQ({
    id: "lvl-sql-select-04", topic: TS, d: 1, step: 4, p: 3,
    ctx: ctx(SEMINAR, "Für Namensschilder (Vorname groß gedruckt) soll die Teilnehmerliste nach Wohnort und innerhalb des Ortes nach Vorname sortiert werden.", L),
    q: `Geben Sie <code>ort</code>, <code>nachname</code> und <code>vorname</code> (in dieser Reihenfolge) aller Teilnehmer aus. Sortieren Sie aufsteigend nach Ort und bei gleichem Ort aufsteigend nach <b>Vorname</b>.`,
    setup: SEMINAR.sql,
    sol: `SELECT ort, nachname, vorname
FROM teilnehmer
ORDER BY ort, vorname`,
    ordered: true,
    why: "<p>Bei mehreren Sortierkriterien entscheidet zuerst die erste Spalte; nur bei Gleichstand wird nach der zweiten sortiert.</p>",
    ex: "Hinweis: <code>ORDER BY ort, vorname</code> ist etwas anderes als <code>ORDER BY vorname, ort</code>; nur <code>ORDER BY ort</code> lässt die Reihenfolge innerhalb eines Ortes offen. Zwei ORDER-BY-Klauseln hintereinander sind ein Syntaxfehler.",
    tags: ["ORDER BY"]
  });

  SQ({
    id: "lvl-sql-select-05", topic: TS, d: 3, step: 1, p: 6,
    ctx: ctx(SUPPORT, "Der Teamleiter verteilt dringende Arbeit neu."),
    q: `Geben Sie <code>ticket_id</code>, <code>betreff</code>, <code>prioritaet</code> und <code>bearbeiter_id</code> (in dieser Reihenfolge) aller Tickets aus, die
<ul><li>die Priorität 'hoch' <b>oder</b> 'mittel' haben,</li>
<li>noch nicht gelöst sind (kein Lösungsdatum) <b>und</b></li>
<li>entweder noch keinen Bearbeiter haben <b>oder</b> vom Mitarbeiter mit der ma_id 3 bearbeitet werden.</li></ul>
Sortieren Sie nach ticket_id aufsteigend.`,
    setup: SUPPORT.sql,
    sol: `SELECT ticket_id, betreff, prioritaet, bearbeiter_id
FROM ticket
WHERE prioritaet IN ('hoch', 'mittel')
  AND geloest_am IS NULL
  AND (bearbeiter_id IS NULL OR bearbeiter_id = 3)
ORDER BY ticket_id`,
    ordered: true,
    why: "<p>Ergebnis: Ticket 7 (Bearbeiter 3) und Ticket 10 (ohne Bearbeiter). Die beiden ODER-Bedingungen müssen geklammert bzw. mit <code>IN</code> formuliert werden.</p>",
    ex: "IHK-Fallen: <code>AND</code> bindet stärker als <code>OR</code> – ohne Klammern wird z.B. <code>prioritaet = 'hoch' OR prioritaet = 'mittel' AND …</code> als <code>hoch OR (mittel AND …)</code> ausgewertet und liefert alle hoch-Tickets, auch gelöste. <code>bearbeiter_id = NULL</code> ist nie wahr.",
    tags: ["AND/OR", "Klammern", "IS NULL"]
  });

  SQ({
    id: "lvl-sql-select-06", topic: TS, d: 3, step: 2, p: 5,
    ctx: ctx(SHOP, "Für eine Rabattaktion werden alle Artikel gesucht, die <b>nicht</b> zum Zubehör (kategorie_id 5) gehören – ausdrücklich auch Artikel, denen noch keine Kategorie zugeordnet ist."),
    q: `Geben Sie <code>artikel_id</code>, <code>bezeichnung</code> und <code>preis</code> aller Artikel aus, die nicht der Kategorie 5 angehören (auch ohne Kategorie) und weniger als 300 € kosten. Sortieren Sie nach artikel_id.`,
    setup: SHOP.sql,
    sol: `SELECT artikel_id, bezeichnung, preis
FROM artikel
WHERE (kategorie_id <> 5 OR kategorie_id IS NULL)
  AND preis < 300
ORDER BY artikel_id`,
    ordered: true,
    why: "<p>Ergebnis: 104, 108, 109, 111, 112. Für Artikel 111 und 112 ist <code>kategorie_id &lt;&gt; 5</code> nicht wahr, sondern UNKNOWN (NULL-Vergleich) – sie müssen ausdrücklich mit <code>IS NULL</code> einbezogen werden. Alternative: <code>COALESCE(kategorie_id, 0) &lt;&gt; 5</code>.</p>",
    ex: "IHK-Falle: <code>WHERE kategorie_id &lt;&gt; 5</code> allein unterschlägt alle Zeilen mit NULL. Ohne Klammern um die ODER-Bedingung würde <code>preis &lt; 300</code> nur für die NULL-Artikel gelten.",
    tags: ["NULL", "dreiwertige Logik", "AND/OR"]
  });

  SQ({
    id: "lvl-sql-select-07", topic: TS, d: 3, step: 3, p: 6,
    ctx: ctx(SHOP, "Das Lager benötigt eine Statusliste aller Artikel."),
    q: `Geben Sie <code>artikel_id</code>, <code>bezeichnung</code> und eine Spalte <code>lagerstatus</code> aus, sortiert nach artikel_id. Der Lagerstatus lautet
<ul><li>'unbekannt', wenn kein Bestand erfasst ist (NULL),</li>
<li>'ausverkauft' bei Bestand 0,</li>
<li>'nachbestellen' bei einem Bestand von 1 bis 9,</li>
<li>sonst 'ok'.</li></ul>`,
    setup: SHOP.sql,
    sol: `SELECT artikel_id, bezeichnung,
       CASE
         WHEN bestand IS NULL THEN 'unbekannt'
         WHEN bestand = 0     THEN 'ausverkauft'
         WHEN bestand < 10    THEN 'nachbestellen'
         ELSE 'ok'
       END AS lagerstatus
FROM artikel
ORDER BY artikel_id`,
    ordered: true,
    why: "<p>CASE prüft die WHEN-Zweige <b>von oben nach unten</b> und nimmt den ersten zutreffenden. Darum muss <code>bestand = 0</code> vor <code>bestand &lt; 10</code> stehen.</p>",
    ex: "IHK-Fallen: Ohne eigenen NULL-Zweig landet das Headset (Bestand NULL) im ELSE-Zweig und wird als 'ok' ausgewiesen. Steht <code>bestand &lt; 10</code> zuerst, wird der Monitor mit Bestand 0 als 'nachbestellen' statt 'ausverkauft' eingestuft.",
    tags: ["CASE", "NULL"]
  });

  SQ({
    id: "lvl-sql-select-08", topic: TS, d: 3, step: 4, p: 6,
    ctx: ctx(BIB, "Für verspätet zurückgegebene Bücher werden 0,50 € je angefangenem Verspätungstag berechnet."),
    q: `Geben Sie für alle Ausleihen, die <b>nach</b> dem Fälligkeitsdatum zurückgegeben wurden, <code>ausleihe_id</code>, <code>leser_id</code>, die Anzahl der Verspätungstage als ganze Zahl (<code>tage</code>) und die Gebühr (<code>gebuehr</code>, tage × 0,50) aus – in dieser Reihenfolge, die größte Verspätung zuerst.`,
    setup: BIB.sql,
    sol: `SELECT ausleihe_id, leser_id,
       CAST(julianday(rueckgabe_am) - julianday(faellig_am) AS INTEGER) AS tage,
       CAST(julianday(rueckgabe_am) - julianday(faellig_am) AS INTEGER) * 0.5 AS gebuehr
FROM ausleihe
WHERE rueckgabe_am > faellig_am
ORDER BY tage DESC`,
    ordered: true,
    why: "<p>Ergebnis: Ausleihe 6 (13 Tage, 6,50 €) und Ausleihe 2 (4 Tage, 2,00 €). Noch nicht zurückgegebene Ausleihen fallen heraus, weil <code>NULL &gt; faellig_am</code> UNKNOWN ist. In MySQL: <code>DATEDIFF(rueckgabe_am, faellig_am)</code>.</p>",
    ex: "IHK-Falle (SQLite): <code>rueckgabe_am - faellig_am</code> rechnet mit Text – SQLite wandelt '2026-07-12' in die Zahl 2026 um, das Ergebnis ist 0. Für Tagesdifferenzen <code>julianday()</code> verwenden. Der Vergleich <code>rueckgabe_am &gt; faellig_am</code> funktioniert dagegen, weil ISO-Datumswerte als Text richtig sortieren.",
    tags: ["Datumsfunktionen", "julianday", "CAST"]
  });

  SQ({
    id: "lvl-sql-select-09", topic: TS, d: 3, step: 5, p: 6,
    ctx: ctx(SHOP, "Das Marketing möchte wissen, bei welchen E-Mail-Anbietern die Kunden sind."),
    q: `Geben Sie für alle Kunden mit hinterlegter E-Mail-Adresse den <code>nachname</code> und die Domain der Adresse (alles nach dem Zeichen @, Alias <code>domain</code>) aus. Sortieren Sie nach Domain und bei gleicher Domain nach Nachname, jeweils aufsteigend.`,
    setup: SHOP.sql,
    sol: `SELECT nachname, SUBSTR(email, INSTR(email, '@') + 1) AS domain
FROM kunde
WHERE email IS NOT NULL
ORDER BY domain, nachname`,
    ordered: true,
    why: "<p><code>INSTR(text, '@')</code> liefert die Position des @ (1-basiert), <code>SUBSTR(text, start)</code> den Rest ab dieser Position. Ergebnis: vier Kunden bei mail.de, einer bei posteo.de, zwei bei web.de. (MySQL: <code>SUBSTRING_INDEX(email, '@', -1)</code> oder <code>LOCATE</code>.)</p>",
    ex: "IHK-Fallen: Ohne <code>+ 1</code> beginnt die Domain mit '@'. Ohne <code>IS NOT NULL</code> erscheinen drei Kunden mit Domain NULL. Ein Alias aus SELECT darf in ORDER BY benutzt werden, aber nicht in WHERE.",
    tags: ["Stringfunktionen", "SUBSTR", "INSTR"]
  });

  SQ({
    id: "lvl-sql-select-10", topic: TS, d: 3, step: 6, p: 5,
    ctx: ctx(BIB, "Auf der Startseite des Katalogs sollen Romane zuerst erscheinen."),
    q: `Geben Sie <code>titel</code> und <code>genre</code> aller Bücher aus. Sortierung: zuerst alle Bücher des Genres 'Roman', danach alle übrigen Genres alphabetisch aufsteigend; innerhalb eines Genres nach Titel aufsteigend.`,
    setup: BIB.sql,
    sol: `SELECT titel, genre
FROM buch
ORDER BY CASE WHEN genre = 'Roman' THEN 0 ELSE 1 END,
         genre,
         titel`,
    ordered: true,
    why: "<p>Ein <code>CASE</code>-Ausdruck in ORDER BY erzeugt einen künstlichen Sortierschlüssel (0 für Romane, 1 für alle anderen). Danach wird nach Genre und Titel sortiert.</p>",
    ex: "IHK-Falle: <code>ORDER BY genre = 'Roman' DESC, genre, titel</code> funktioniert in SQLite/MySQL ebenfalls (Wahrheitswert 1/0), ist aber nicht portabel. Nur <code>ORDER BY genre, titel</code> setzt 'Drama' und 'Dystopie' vor die Romane.",
    tags: ["ORDER BY", "CASE"]
  });

  SQ({
    id: "lvl-sql-select-11", topic: TS, d: 3, step: 7, p: 7,
    ctx: ctx(SUPPORT, "Mitarbeiter mit mindestens 10 <b>vollen</b> Dienstjahren am Stichtag 26.10.2026 erhalten eine Jubiläumsprämie."),
    q: `Geben Sie <code>nachname</code> und die Betriebszugehörigkeit in vollen Jahren (<code>jahre</code>) am Stichtag '2026-10-26' aller Mitarbeiter mit mindestens 10 vollen Dienstjahren aus, die längste Zugehörigkeit zuerst.`,
    setup: SUPPORT.sql,
    sol: `SELECT nachname,
       (CAST(strftime('%Y', '2026-10-26') AS INTEGER) - CAST(strftime('%Y', eintrittsdatum) AS INTEGER))
       - (strftime('%m-%d', '2026-10-26') < strftime('%m-%d', eintrittsdatum)) AS jahre
FROM mitarbeiter
WHERE (CAST(strftime('%Y', '2026-10-26') AS INTEGER) - CAST(strftime('%Y', eintrittsdatum) AS INTEGER))
       - (strftime('%m-%d', '2026-10-26') < strftime('%m-%d', eintrittsdatum)) >= 10
ORDER BY jahre DESC`,
    ordered: true,
    why: "<p>Volle Jahre = Differenz der Jahreszahlen, minus 1, wenn der „Jahrestag“ (Monat-Tag) im Stichtagsjahr noch nicht erreicht ist. Ergebnis: Richter 16, Haas 15, Peters 14, Vogel 11. Gleichwertig für diese Daten: <code>CAST((julianday('2026-10-26') - julianday(eintrittsdatum)) / 365.25 AS INTEGER)</code> (Abschneiden, nicht Runden). In MySQL: <code>TIMESTAMPDIFF(YEAR, eintrittsdatum, '2026-10-26')</code>.</p>",
    ex: "IHK-Falle: Frau Simon ist am 01.11.2016 eingetreten – am Stichtag hat sie erst 9 volle Jahre. Wer nur die Jahreszahlen subtrahiert (2026 − 2016 = 10) oder mit <code>ROUND</code> rundet (9,98 → 10), zahlt ihr die Prämie fälschlich aus.",
    tags: ["Datumsfunktionen", "strftime", "Stichtag"]
  });

  Q({
    id: "lvl-sql-select-12", topic: TS, type: "mc", difficulty: 3, step: 8, points: 3,
    context: ctx(SHOP, "In einem Programm wird eine Ausschlussliste dynamisch zusammengesetzt. Ist keine zweite Adresse vorhanden, wird NULL eingesetzt:") + pre("SELECT nachname FROM kunde\nWHERE email NOT IN ('anna.schmidt@mail.de', NULL);"),
    question: "Wie viele Zeilen liefert die Abfrage?",
    options: ["0", "6", "9", "10"],
    correct: [0],
    solution: "<p><b>0 Zeilen.</b> <code>x NOT IN (a, NULL)</code> bedeutet <code>x &lt;&gt; a AND x &lt;&gt; NULL</code>. Der Vergleich <code>x &lt;&gt; NULL</code> ist immer UNKNOWN, damit ist die gesamte UND-Verknüpfung nie TRUE – keine Zeile wird geliefert (Kunden ohne E-Mail ohnehin nicht).</p>",
    explanation: "Distraktor 6: Das wäre die Anzahl der Kunden mit E-Mail außer Anna Schmidt, wenn das NULL in der Liste fehlte. Dieselbe Falle tritt bei <code>NOT IN (SELECT spalte …)</code> auf, sobald die Unterabfrage ein NULL liefert – dann besser <code>NOT EXISTS</code> verwenden.",
    tags: ["NOT IN", "NULL", "dreiwertige Logik"]
  });

  // ===========================================================================
  // JOIN
  // ===========================================================================
  var TJ = "ga2-sql-join";

  SQ({
    id: "lvl-sql-join-01", topic: TJ, d: 1, step: 1, p: 3,
    ctx: ctx(BIB, "Im Katalog soll zu jedem Buch der Autor angezeigt werden.", L),
    q: `Geben Sie für alle Bücher den <code>titel</code> und den <code>nachname</code> des Autors aus (in dieser Reihenfolge), sortiert nach Titel aufsteigend.`,
    setup: BIB.sql,
    sol: `SELECT b.titel, a.nachname
FROM buch b
INNER JOIN autor a ON a.autor_id = b.autor_id
ORDER BY b.titel`,
    ordered: true,
    why: "<p>Der JOIN verbindet jede Zeile aus <code>buch</code> mit der Zeile aus <code>autor</code>, deren Primärschlüssel <code>autor_id</code> dem Fremdschlüssel im Buch entspricht.</p>",
    ex: "Hinweis: Die Join-Bedingung lautet immer <b>Fremdschlüssel = Primärschlüssel</b>. Ohne <code>ON …</code> (bzw. bei <code>FROM buch, autor</code> ohne WHERE) entsteht das kartesische Produkt mit 12 × 7 = 84 Zeilen.",
    tags: ["INNER JOIN"]
  });

  SQ({
    id: "lvl-sql-join-02", topic: TJ, d: 1, step: 2, p: 3,
    ctx: ctx(FUHRPARK, "Kai Arnold möchte eine Übersicht über seine Fahrten.", L),
    q: `Geben Sie <code>datum</code> und <code>zweck</code> aller Fahrten des Fahrers mit dem Nachnamen 'Arnold' aus, sortiert nach Datum aufsteigend. Ermitteln Sie den Fahrer über einen JOIN mit der Tabelle <code>fahrer</code> (nicht über die fest eingetragene fahrer_id).`,
    setup: FUHRPARK.sql,
    sol: `SELECT f.datum, f.zweck
FROM fahrt f
JOIN fahrer fa ON fa.fahrer_id = f.fahrer_id
WHERE fa.nachname = 'Arnold'
ORDER BY f.datum`,
    ordered: true,
    why: "<p>Nach dem JOIN stehen die Spalten beider Tabellen zur Verfügung, sodass in WHERE nach dem Nachnamen des Fahrers gefiltert werden kann. Ergebnis: 3 Fahrten.</p>",
    ex: "Hinweis: Tabellenaliase (<code>f</code>, <code>fa</code>) sparen Schreibarbeit. Spalten, die in beiden Tabellen vorkommen (hier fahrer_id), müssen mit Alias angesprochen werden.",
    tags: ["JOIN", "WHERE"]
  });

  SQ({
    id: "lvl-sql-join-03", topic: TJ, d: 1, step: 3, p: 3,
    ctx: ctx(SUPPORT, "Die IT möchte wissen, welcher Mitarbeiter welches Notebook nutzt.", L),
    q: `Geben Sie <code>inventar_nr</code> und den <code>nachname</code> des zugeordneten Mitarbeiters für alle Geräte vom Typ 'Notebook' aus, sortiert nach inventar_nr.`,
    setup: SUPPORT.sql,
    sol: `SELECT g.inventar_nr, m.nachname
FROM geraet g
JOIN mitarbeiter m ON m.ma_id = g.ma_id
WHERE g.typ = 'Notebook'
ORDER BY g.inventar_nr`,
    ordered: true,
    why: "<p>Alle fünf Notebooks sind einem Mitarbeiter zugeordnet, daher genügt ein INNER JOIN.</p>",
    ex: "Hinweis: Typischer Fehler ist die Bedingung <code>m.ma_id = g.geraet_id</code> – verknüpft wird der Fremdschlüssel <code>geraet.ma_id</code> mit dem Primärschlüssel <code>mitarbeiter.ma_id</code>.",
    tags: ["JOIN"]
  });

  SQ({
    id: "lvl-sql-join-04", topic: TJ, d: 1, step: 4, p: 4,
    ctx: ctx(SUPPORT, "Für ein Organigramm sollen alle Abteilungen mit ihren Mitarbeitern aufgelistet werden – auch Abteilungen, denen (noch) niemand zugeordnet ist.", L),
    q: `Geben Sie <code>bezeichnung</code> der Abteilung und <code>nachname</code> des Mitarbeiters aus. Abteilungen ohne Mitarbeiter sollen mit NULL als Nachname erscheinen. Die Sortierung spielt keine Rolle.`,
    setup: SUPPORT.sql,
    sol: `SELECT a.bezeichnung, m.nachname
FROM abteilung a
LEFT JOIN mitarbeiter m ON m.abteilung_id = a.abteilung_id`,
    why: "<p>Der <code>LEFT JOIN</code> liefert <b>alle</b> Zeilen der linken Tabelle (abteilung). Gibt es keinen passenden Mitarbeiter, werden dessen Spalten mit NULL aufgefüllt – hier bei der Abteilung 'Recht'.</p>",
    ex: "Hinweis: Mit INNER JOIN fehlt 'Recht'. Die Reihenfolge der Tabellen ist beim LEFT JOIN entscheidend: <code>FROM mitarbeiter LEFT JOIN abteilung</code> würde stattdessen alle Mitarbeiter (auch Böhm ohne Abteilung) liefern.",
    tags: ["LEFT JOIN"]
  });

  SQ({
    id: "lvl-sql-join-05", topic: TJ, d: 1, step: 5, p: 4,
    ctx: ctx(FUHRPARK, "Die Werkstattkosten sollen je Fahrzeug chronologisch geprüft werden.", L),
    q: `Geben Sie <code>kennzeichen</code>, <code>datum</code>, <code>art</code> und <code>kosten</code> (in dieser Reihenfolge) aller Wartungen aus. Sortieren Sie nach Kennzeichen aufsteigend und bei gleichem Kennzeichen die <b>neueste</b> Wartung zuerst.`,
    setup: FUHRPARK.sql,
    sol: `SELECT fz.kennzeichen, w.datum, w.art, w.kosten
FROM wartung w
JOIN fahrzeug fz ON fz.fz_id = w.fz_id
ORDER BY fz.kennzeichen, w.datum DESC`,
    ordered: true,
    why: "<p>Die Spalte <code>datum</code> existiert nur in wartung (in dieser Abfrage), trotzdem ist der Alias <code>w.datum</code> guter Stil.</p>",
    ex: "Hinweis: Jedes Sortierkriterium hat eine eigene Richtung – <code>ORDER BY fz.kennzeichen, w.datum DESC</code> sortiert nur das Datum absteigend, das Kennzeichen bleibt aufsteigend. Beide Kriterien stehen in <b>einer</b> ORDER-BY-Klausel.",
    tags: ["JOIN", "ORDER BY"]
  });

  SQ({
    id: "lvl-sql-join-06", topic: TJ, d: 3, step: 1, p: 7,
    ctx: ctx(SEMINAR, "Lena Albrecht möchte eine Lerngruppe gründen und sucht alle Personen, die mit ihr gemeinsam in mindestens einem Kurs waren."),
    q: `Geben Sie <code>nachname</code> und <code>vorname</code> aller Teilnehmer aus, die mindestens einen Kurs gebucht haben, den auch die Teilnehmerin mit dem Nachnamen 'Albrecht' gebucht hat. Frau Albrecht selbst soll nicht erscheinen, und jede Person nur einmal. Sortierung: Nachname aufsteigend.`,
    setup: SEMINAR.sql,
    sol: `SELECT DISTINCT t2.nachname, t2.vorname
FROM teilnehmer t1
JOIN buchung b1    ON b1.teilnehmer_id = t1.teilnehmer_id
JOIN buchung b2    ON b2.kurs_id = b1.kurs_id
JOIN teilnehmer t2 ON t2.teilnehmer_id = b2.teilnehmer_id
WHERE t1.nachname = 'Albrecht'
  AND t2.teilnehmer_id <> t1.teilnehmer_id
ORDER BY t2.nachname`,
    ordered: true,
    why: "<p>Die Tabelle <code>buchung</code> wird zweimal mit verschiedenen Aliasen eingebunden (Self-Join): b1 = Buchungen von Frau Albrecht, b2 = alle Buchungen derselben Kurse. Ergebnis: Berger, Celik, Engel, Franke, Hartmann.</p>",
    ex: "IHK-Fallen: Ohne <code>DISTINCT</code> erscheint Celik doppelt (zwei gemeinsame Kurse). Ohne <code>t2.teilnehmer_id &lt;&gt; t1.teilnehmer_id</code> steht Albrecht selbst in der Liste. Vergleich über den Nachnamen statt der ID wäre bei Namensgleichheit fehleranfällig.",
    tags: ["Self-Join", "DISTINCT"]
  });

  SQ({
    id: "lvl-sql-join-07", topic: TJ, d: 3, step: 2, p: 8,
    ctx: ctx(FUHRPARK, "Für den Oktober-Bericht soll jedes Fahrzeug erscheinen – mit seinen Fahrten im Oktober 2026 oder, falls es im Oktober nicht bewegt wurde, mit leeren Feldern."),
    q: `Geben Sie für <b>alle</b> Fahrzeuge <code>kennzeichen</code>, <code>datum</code> der Fahrt und <code>nachname</code> des Fahrers aus – nur Fahrten aus dem Oktober 2026 werden berücksichtigt. Fahrzeuge ohne Oktober-Fahrt erscheinen mit NULL in datum und nachname. Sortieren Sie nach Kennzeichen.`,
    setup: FUHRPARK.sql,
    sol: `SELECT fz.kennzeichen, f.datum, fa.nachname
FROM fahrzeug fz
LEFT JOIN fahrt f   ON f.fz_id = fz.fz_id
                   AND f.datum BETWEEN '2026-10-01' AND '2026-10-31'
LEFT JOIN fahrer fa ON fa.fahrer_id = f.fahrer_id
ORDER BY fz.kennzeichen`,
    ordered: true,
    why: "<p>8 Zeilen, davon 3 mit Oktober-Fahrten (B-FI 101, B-FI 102, B-FI 103). Die Datumsbedingung schränkt nur die <b>Partner</b> ein und gehört deshalb in die ON-Klausel. Auch der zweite JOIN muss ein LEFT JOIN sein.</p>",
    ex: "IHK-Fallen: Steht die Datumsbedingung in WHERE, werden die NULL-Zeilen herausgefiltert – der LEFT JOIN wirkt wie ein INNER JOIN (nur 3 Zeilen). Ein INNER JOIN auf fahrer am Ende entfernt die Fahrzeuge ohne Fahrt ebenfalls wieder.",
    tags: ["LEFT JOIN", "ON vs. WHERE", "Join-Kette"]
  });

  SQ({
    id: "lvl-sql-join-08", topic: TJ, d: 3, step: 3, p: 8,
    ctx: ctx(SUPPORT, "Die Personalabteilung prüft die Organisationsstruktur: Mitarbeiter sollten in derselben Abteilung arbeiten wie ihr direkter Vorgesetzter."),
    q: `Geben Sie für alle Mitarbeiter <b>mit</b> Vorgesetztem, deren Abteilung von der Abteilung ihres Vorgesetzten abweicht, folgende Spalten aus: <code>nachname</code> des Mitarbeiters, <code>bezeichnung</code> seiner Abteilung, <code>nachname</code> des Vorgesetzten, <code>bezeichnung</code> der Abteilung des Vorgesetzten. Mitarbeiter <b>ohne</b> Abteilung gelten ebenfalls als abweichend (Abteilung dann NULL). Sortierung nach Nachname des Mitarbeiters.`,
    setup: SUPPORT.sql,
    sol: `SELECT m.nachname, am.bezeichnung, v.nachname, av.bezeichnung
FROM mitarbeiter m
JOIN mitarbeiter v      ON v.ma_id = m.vorgesetzter_id
LEFT JOIN abteilung am  ON am.abteilung_id = m.abteilung_id
LEFT JOIN abteilung av  ON av.abteilung_id = v.abteilung_id
WHERE m.abteilung_id IS NULL
   OR m.abteilung_id <> v.abteilung_id
ORDER BY m.nachname`,
    ordered: true,
    why: "<p>Ergebnis: Böhm (NULL, Vorgesetzter Richter, IT) und Ludwig (Marketing, Vorgesetzter Peters, Vertrieb). <code>mitarbeiter</code> und <code>abteilung</code> werden je zweimal mit unterschiedlichen Aliasen verwendet.</p>",
    ex: "IHK-Fallen: <code>m.abteilung_id &lt;&gt; v.abteilung_id</code> allein liefert für Böhm UNKNOWN – er fehlt. Ein INNER JOIN auf die Abteilung des Mitarbeiters entfernt ihn ebenfalls. Der Vorgesetzten-Join darf INNER sein, weil nur Mitarbeiter mit Vorgesetztem gefragt sind.",
    tags: ["Self-Join", "NULL", "LEFT JOIN"]
  });

  SQ({
    id: "lvl-sql-join-09", topic: TJ, d: 3, step: 4, p: 9,
    ctx: ctx(FUHRPARK, "Ein Fahrzeug wird „übergeben“, wenn eine Fahrt genau an dem Kilometerstand beginnt, an dem eine andere Fahrt desselben Fahrzeugs endete, und die beiden Fahrten von <b>verschiedenen</b> Fahrern durchgeführt wurden."),
    q: `Geben Sie alle Fahrzeugübergaben mit den Spalten <code>kennzeichen</code>, <code>datum</code> der übernehmenden Fahrt, <code>nachname</code> des abgebenden Fahrers und <code>nachname</code> des übernehmenden Fahrers aus (in dieser Reihenfolge), sortiert nach dem Datum der übernehmenden Fahrt.`,
    setup: FUHRPARK.sql,
    sol: `SELECT fz.kennzeichen, f2.datum, a.nachname AS von, b.nachname AS an
FROM fahrt f1
JOIN fahrt f2     ON f2.fz_id = f1.fz_id AND f2.km_start = f1.km_ende
JOIN fahrzeug fz  ON fz.fz_id = f1.fz_id
JOIN fahrer a     ON a.fahrer_id = f1.fahrer_id
JOIN fahrer b     ON b.fahrer_id = f2.fahrer_id
WHERE f1.fahrer_id <> f2.fahrer_id
ORDER BY f2.datum`,
    ordered: true,
    why: "<p>Fünf Tabelleninstanzen: <code>fahrt</code> zweimal (vorherige und nachfolgende Fahrt), <code>fahrer</code> zweimal (abgebend, übernehmend) und <code>fahrzeug</code>. Ergebnis: 4 Übergaben (Arnold→Busch und Busch→Arnold bei B-FI 101, Arnold→Busch bei B-FI 102, Ernst→Busch bei M-FI 302). Die beiden Fahrten von Cramer mit B-FI 103 sind keine Übergabe.</p>",
    ex: "IHK-Fallen: Die Join-Bedingung zwischen den Fahrten braucht <b>zwei</b> Teile (gleiches Fahrzeug UND km-Anschluss). Ohne den Fahrervergleich erscheint auch B-FI 103 (Cramer → Cramer). Spaltennamen der zweimal verwendeten Tabelle immer mit dem richtigen Alias qualifizieren.",
    tags: ["Self-Join", "Mehrfach-Join"]
  });

  SQ({
    id: "lvl-sql-join-10", topic: TJ, d: 3, step: 5, p: 8,
    ctx: ctx(FUHRPARK, "Damit alle Fahrer der Klasse B jedes Hamburger Fahrzeug kennenlernen, plant die Disposition Einweisungsfahrten für Kombinationen, die es bisher noch nicht gab."),
    q: `Geben Sie alle Kombinationen aus Fahrern mit der Führerscheinklasse 'B' und Fahrzeugen mit dem Standort 'Hamburg' aus, für die es <b>noch keine</b> Fahrt gibt. Spalten: <code>nachname</code> (Fahrer), <code>kennzeichen</code>. Sortierung: nachname, dann kennzeichen.`,
    setup: FUHRPARK.sql,
    sol: `SELECT fa.nachname, fz.kennzeichen
FROM fahrer fa
CROSS JOIN fahrzeug fz
LEFT JOIN fahrt f ON f.fahrer_id = fa.fahrer_id AND f.fz_id = fz.fz_id
WHERE fa.fuehrerscheinklasse = 'B'
  AND fz.standort = 'Hamburg'
  AND f.fahrt_id IS NULL
ORDER BY fa.nachname, fz.kennzeichen`,
    ordered: true,
    why: "<p>Der <code>CROSS JOIN</code> erzeugt bewusst das kartesische Produkt (4 Fahrer × 3 Fahrzeuge = 12 Kombinationen). Der LEFT JOIN auf <code>fahrt</code> über <b>beide</b> Schlüssel und die Bedingung <code>f.fahrt_id IS NULL</code> (Anti-Join) entfernen die zwei Kombinationen, die schon gefahren wurden (Dorn mit HH-FI 201 und HH-FI 202). Ergebnis: 10 Zeilen.</p>",
    ex: "IHK-Fallen: Join auf fahrt nur über fahrer_id prüft nicht die konkrete Kombination. Alternative: <code>NOT EXISTS (SELECT 1 FROM fahrt f WHERE f.fahrer_id = fa.fahrer_id AND f.fz_id = fz.fz_id)</code>. Ein kartesisches Produkt ist sonst meist ein Fehler – hier ist es gewollt.",
    tags: ["CROSS JOIN", "Anti-Join"]
  });

  Q({
    id: "lvl-sql-join-11", topic: TJ, type: "numeric", difficulty: 3, step: 6, points: 3,
    context: ctx(SHOP, "Gegeben ist folgende Abfrage:", { details: true }) + pre("SELECT k.nachname, b.bestell_id\nFROM kunde k\nLEFT JOIN bestellung b ON b.kunden_id = k.kunden_id\n                       AND b.status = 'offen';"),
    question: "Wie viele Zeilen liefert die Abfrage? (Die Tabelle kunde enthält 10 Kunden; 3 Bestellungen haben den Status 'offen' – je eine von drei verschiedenen Kunden.)",
    answer: 10,
    tolerance: 0,
    solution: "<p><b>10 Zeilen.</b> Der LEFT JOIN liefert jeden Kunden mindestens einmal. Die Bedingung <code>b.status = 'offen'</code> in der ON-Klausel schränkt nur ein, welche Bestellungen als Partner in Frage kommen: Die drei Kunden mit offener Bestellung erscheinen mit deren bestell_id, die anderen sieben mit NULL. Da jeder dieser Kunden genau eine offene Bestellung hat, entstehen keine zusätzlichen Zeilen.</p>",
    explanation: "Stünde <code>b.status = 'offen'</code> in der WHERE-Klausel, wären es nur 3 Zeilen (NULL-Zeilen fallen heraus). Ohne Statusbedingung wären es 15 Zeilen (12 Bestellungen + 3 Kunden ohne Bestellung).",
    tags: ["LEFT JOIN", "ON vs. WHERE"]
  });

  // ===========================================================================
  // AGGREGAT
  // ===========================================================================
  var TA = "ga2-sql-aggregat";

  SQ({
    id: "lvl-sql-agg-01", topic: TA, d: 1, step: 1, p: 2,
    ctx: ctx(BIB, "Die Bibliotheksleitung fragt nach der Größe des Bestands.", L),
    q: `Ermitteln Sie die Anzahl aller Bücher in der Tabelle <code>buch</code> (eine Zeile, eine Spalte).`,
    setup: BIB.sql,
    sol: `SELECT COUNT(*) AS anzahl FROM buch`,
    why: "<p><code>COUNT(*)</code> zählt alle Zeilen. Ohne GROUP BY liefert eine Aggregatabfrage genau eine Ergebniszeile: 12.</p>",
    ex: "Hinweis: <code>SELECT * FROM buch</code> zeigt die Bücher, zählt sie aber nicht. Aggregatfunktionen fassen viele Zeilen zu einem Wert zusammen.",
    tags: ["COUNT"]
  });

  SQ({
    id: "lvl-sql-agg-02", topic: TA, d: 1, step: 2, p: 2,
    ctx: ctx(SUPPORT, "Der Teamleiter möchte wissen, wie viele Tickets noch niemand angefasst hat.", L),
    q: `Ermitteln Sie die Anzahl der Tickets mit dem Status 'offen'.`,
    setup: SUPPORT.sql,
    sol: `SELECT COUNT(*) AS anzahl
FROM ticket
WHERE status = 'offen'`,
    why: "<p>Zuerst filtert WHERE die Zeilen, dann zählt COUNT die verbliebenen: 3.</p>",
    ex: "Hinweis: Die logische Reihenfolge ist FROM → WHERE → SELECT (mit COUNT). Tickets 'in Bearbeitung' zählen hier nicht mit.",
    tags: ["COUNT", "WHERE"]
  });

  SQ({
    id: "lvl-sql-agg-03", topic: TA, d: 1, step: 3, p: 2,
    ctx: ctx(FUHRPARK, "Die Buchhaltung benötigt die gesamten Werkstattkosten.", L),
    q: `Ermitteln Sie die Summe der Kosten aller Wartungen (eine Zahl, Alias <code>gesamtkosten</code>).`,
    setup: FUHRPARK.sql,
    sol: `SELECT SUM(kosten) AS gesamtkosten FROM wartung`,
    why: "<p><code>SUM(spalte)</code> addiert alle Werte der Spalte: 5705,50 €.</p>",
    ex: "Hinweis: <code>COUNT(kosten)</code> würde die Anzahl der Wartungen (10) liefern, nicht die Summe.",
    tags: ["SUM"]
  });

  SQ({
    id: "lvl-sql-agg-04", topic: TA, d: 1, step: 4, p: 3,
    ctx: ctx(SEMINAR, "Für den Flyer wird die Preisspanne des Kursangebots benötigt.", L),
    q: `Geben Sie in einer Zeile den niedrigsten (<code>min_preis</code>) und den höchsten Kurspreis (<code>max_preis</code>) aus – in dieser Reihenfolge.`,
    setup: SEMINAR.sql,
    sol: `SELECT MIN(preis) AS min_preis, MAX(preis) AS max_preis
FROM kurs`,
    why: "<p>Mehrere Aggregatfunktionen dürfen in einem SELECT stehen. Ergebnis: 590 und 1290.</p>",
    ex: "Hinweis: Wer zusätzlich <code>titel</code> ausgeben möchte, braucht eine Unterabfrage (z.B. <code>WHERE preis = (SELECT MAX(preis) FROM kurs)</code>) – <code>SELECT titel, MAX(preis)</code> ist nach SQL-Standard falsch.",
    tags: ["MIN", "MAX"]
  });

  SQ({
    id: "lvl-sql-agg-05", topic: TA, d: 1, step: 5, p: 3,
    ctx: ctx(SUPPORT, "Für einen Gehaltsvergleich wird das Durchschnittsgehalt der IT-Abteilung (abteilung_id 1) benötigt.", L),
    q: `Ermitteln Sie das durchschnittliche Gehalt aller Mitarbeiter der Abteilung mit der <code>abteilung_id</code> 1, gerundet auf 2 Nachkommastellen (Alias <code>durchschnitt</code>).`,
    setup: SUPPORT.sql,
    sol: `SELECT ROUND(AVG(gehalt), 2) AS durchschnitt
FROM mitarbeiter
WHERE abteilung_id = 1`,
    why: "<p>(6200 + 4800 + 4300 + 3600) / 4 = 4725,00.</p>",
    ex: "Hinweis: <code>ROUND</code> wird um die Aggregatfunktion herum geschrieben: <code>ROUND(AVG(gehalt), 2)</code>, nicht <code>AVG(ROUND(…))</code>.",
    tags: ["AVG", "ROUND"]
  });

  SQ({
    id: "lvl-sql-agg-06", topic: TA, d: 1, step: 6, p: 3,
    ctx: ctx(SUPPORT, "Der Einkauf möchte wissen, mit wie vielen Herstellern die Firma zusammenarbeitet.", L),
    q: `Ermitteln Sie die Anzahl der <b>verschiedenen</b> Hersteller in der Tabelle <code>geraet</code>.`,
    setup: SUPPORT.sql,
    sol: `SELECT COUNT(DISTINCT hersteller) AS anzahl FROM geraet`,
    why: "<p><code>COUNT(DISTINCT spalte)</code> zählt jeden Wert nur einmal: Lenovo, Dell, HP, Brother, Apple, Samsung = 6.</p>",
    ex: "Hinweis: <code>COUNT(hersteller)</code> liefert 12 (alle Geräte). <code>SELECT DISTINCT COUNT(hersteller)</code> ist ebenfalls falsch – DISTINCT muss <b>innerhalb</b> der Klammer stehen.",
    tags: ["COUNT DISTINCT"]
  });

  SQ({
    id: "lvl-sql-agg-07", topic: TA, d: 1, step: 7, p: 3,
    ctx: ctx(FUHRPARK, "Für die Notfallkette wird geprüft, wie viele Fahrer telefonisch erreichbar sind.", L),
    q: `Geben Sie in einer Zeile die Anzahl aller Fahrer (<code>gesamt</code>) und die Anzahl der Fahrer mit hinterlegter Telefonnummer (<code>mit_telefon</code>) aus – ohne WHERE-Klausel.`,
    setup: FUHRPARK.sql,
    sol: `SELECT COUNT(*) AS gesamt, COUNT(telefon) AS mit_telefon
FROM fahrer`,
    why: "<p><code>COUNT(*)</code> zählt Zeilen (6), <code>COUNT(telefon)</code> nur die Werte ungleich NULL (4).</p>",
    ex: "Hinweis: Dieser Unterschied ist eine der häufigsten Prüfungsfragen. Alle Aggregatfunktionen außer <code>COUNT(*)</code> ignorieren NULL-Werte.",
    tags: ["COUNT", "NULL"]
  });

  SQ({
    id: "lvl-sql-agg-08", topic: TA, d: 3, step: 1, p: 8,
    ctx: ctx(SHOP, "Für das Kundenbeziehungsmanagement wird eine Übersicht über alle Kunden benötigt – auch über Kunden, die noch nie bestellt haben."),
    q: `Geben Sie für <b>alle</b> Kunden <code>kunden_id</code>, <code>nachname</code>, die Anzahl ihrer Bestellungen (<code>anzahl</code>, unabhängig vom Status) und den Gesamtumsatz (<code>umsatz</code>, Summe menge × einzelpreis, auf 2 Stellen gerundet) aus. Kunden ohne Bestellung erscheinen mit 0 und 0. Sortierung: kunden_id.`,
    setup: SHOP.sql,
    sol: `SELECT k.kunden_id, k.nachname,
       COUNT(DISTINCT b.bestell_id) AS anzahl,
       ROUND(COALESCE(SUM(bp.menge * bp.einzelpreis), 0), 2) AS umsatz
FROM kunde k
LEFT JOIN bestellung b       ON b.kunden_id = k.kunden_id
LEFT JOIN bestellposition bp ON bp.bestell_id = b.bestell_id
GROUP BY k.kunden_id, k.nachname
ORDER BY k.kunden_id`,
    ordered: true,
    why: "<p>Durch den JOIN mit <code>bestellposition</code> entsteht je Position eine Zeile – eine Bestellung mit drei Positionen erscheint dreimal. Darum muss die Anzahl der Bestellungen mit <code>COUNT(DISTINCT b.bestell_id)</code> gezählt werden. <code>COALESCE</code> macht aus der NULL-Summe der Kunden 8–10 eine 0.</p>",
    ex: "IHK-Fallen: <code>COUNT(b.bestell_id)</code> zählt Positionen (Schmidt: 5 statt 3). <code>COUNT(*)</code> liefert für Kunden ohne Bestellung 1. Ohne COALESCE steht beim Umsatz NULL. Zwei INNER JOINs würden die Kunden 8–10 ganz entfernen.",
    tags: ["LEFT JOIN", "COUNT DISTINCT", "COALESCE"]
  });

  SQ({
    id: "lvl-sql-agg-09", topic: TA, d: 3, step: 2, p: 8,
    ctx: ctx(BIB, "Die Bibliothek möchte ihre Vielleser auszeichnen: Leser, die mehr Ausleihen haben als der Durchschnitt <b>aller</b> Leser. Leser ohne Ausleihe zählen beim Durchschnitt mit 0 Ausleihen mit."),
    q: `Geben Sie <code>nachname</code> und die Anzahl der Ausleihen (<code>anzahl</code>) aller Leser aus, deren Anzahl über dem Durchschnitt liegt. Sortierung: anzahl absteigend, dann nachname aufsteigend.`,
    setup: BIB.sql,
    sol: `SELECT l.nachname, COUNT(*) AS anzahl
FROM leser l
JOIN ausleihe a ON a.leser_id = l.leser_id
GROUP BY l.leser_id, l.nachname
HAVING COUNT(*) > (SELECT COUNT(*) * 1.0 FROM ausleihe)
                / (SELECT COUNT(*) FROM leser)
ORDER BY anzahl DESC, l.nachname`,
    ordered: true,
    why: "<p>Durchschnitt aller Leser = 12 Ausleihen / 7 Leser ≈ 1,71. Ergebnis: Albers 3, Baum 3, Conrad 2, Dietz 2. Der Vergleich mit einem Wert aus einer Unterabfrage ist in HAVING erlaubt.</p>",
    ex: "IHK-Falle: Der „naheliegende“ Durchschnitt <code>(SELECT AVG(anz) FROM (SELECT COUNT(*) AS anz FROM ausleihe GROUP BY leser_id))</code> berücksichtigt nur Leser <b>mit</b> Ausleihe (12 / 6 = 2) und liefert nur Albers und Baum. Außerdem: <code>12 / 7</code> ist in SQLite eine Ganzzahldivision (= 1) – darum <code>* 1.0</code>.",
    tags: ["HAVING", "Unterabfrage", "Durchschnitt"]
  });

  SQ({
    id: "lvl-sql-agg-10", topic: TA, d: 3, step: 3, p: 8,
    ctx: ctx(SHOP, "Die Geschäftsführung möchte die umsatzstarken Monate des Jahres 2026 sehen. Stornierte Bestellungen zählen nicht zum Umsatz."),
    q: `Geben Sie für jeden Monat des Jahres 2026 den Monat im Format 'YYYY-MM' (<code>monat</code>) und den Umsatz (<code>umsatz</code>, Summe menge × einzelpreis, 2 Nachkommastellen) aller <b>nicht stornierten</b> Bestellungen aus – nur Monate mit einem Umsatz von mehr als 500 €. Sortierung: monat aufsteigend. Maßgeblich ist das Bestelldatum.`,
    setup: SHOP.sql,
    sol: `SELECT strftime('%Y-%m', b.bestelldatum) AS monat,
       ROUND(SUM(bp.menge * bp.einzelpreis), 2) AS umsatz
FROM bestellung b
JOIN bestellposition bp ON bp.bestell_id = b.bestell_id
WHERE b.status <> 'storniert'
  AND b.bestelldatum BETWEEN '2026-01-01' AND '2026-12-31'
GROUP BY strftime('%Y-%m', b.bestelldatum)
HAVING SUM(bp.menge * bp.einzelpreis) > 500
ORDER BY monat`,
    ordered: true,
    why: "<p>Ergebnis: 2026-01 (709,75), 2026-02 (1049,00), 2026-05 (2087,90), 2026-09 (1308,00). WHERE filtert die Zeilen (Status, Jahr) <b>vor</b> der Gruppierung, HAVING die Gruppen danach. In MySQL: <code>DATE_FORMAT(bestelldatum, '%Y-%m')</code>.</p>",
    ex: "IHK-Fallen: Ohne Jahresfilter erscheint 2025-11. <code>WHERE status = 'geliefert'</code> unterschlägt offene und versendete Bestellungen (September fehlt dann). <code>WHERE SUM(…) &gt; 500</code> ist ein Syntaxfehler – Aggregatbedingungen gehören in HAVING.",
    tags: ["GROUP BY", "HAVING", "strftime"]
  });

  SQ({
    id: "lvl-sql-agg-11", topic: TA, d: 3, step: 4, p: 7,
    ctx: ctx(SEMINAR, "Die Buchhaltung will die Zahlungsmoral je Kurs auswerten."),
    q: `Geben Sie für alle Kurse mit mindestens einer Buchung <code>titel</code>, die Anzahl der Buchungen (<code>anzahl</code>), die Anzahl der bezahlten Buchungen (<code>bezahlt</code>) und die Bezahlquote in Prozent (<code>quote</code>, auf 1 Nachkommastelle gerundet) aus. Sortierung: quote aufsteigend, bei Gleichstand titel aufsteigend.`,
    setup: SEMINAR.sql,
    sol: `SELECT k.titel,
       COUNT(*) AS anzahl,
       SUM(b.bezahlt) AS bezahlt,
       ROUND(100.0 * SUM(b.bezahlt) / COUNT(*), 1) AS quote
FROM kurs k
JOIN buchung b ON b.kurs_id = k.kurs_id
GROUP BY k.kurs_id, k.titel
ORDER BY quote, k.titel`,
    ordered: true,
    why: "<p>Da bezahlt 0 oder 1 ist, zählt <code>SUM(bezahlt)</code> die bezahlten Buchungen. Alternativ: <code>COUNT(CASE WHEN b.bezahlt = 1 THEN 1 END)</code>. Ergebnis beginnt mit „Kotlin für Android“ (0,0 %) und endet mit den Kursen mit 100,0 %.</p>",
    ex: "IHK-Falle Ganzzahldivision: <code>100 * SUM(b.bezahlt) / COUNT(*)</code> rechnet in SQLite (und SQL Server) ganzzahlig – Scrum Master hätte dann 66 statt 66,7 %. Ein Faktor <code>100.0</code> erzwingt Dezimalrechnung. <code>COUNT(b.bezahlt = 1)</code> wäre falsch: COUNT zählt auch den Wert 0 (false), nur NULL nicht.",
    tags: ["SUM", "Quote", "Ganzzahldivision"]
  });

  SQ({
    id: "lvl-sql-agg-12", topic: TA, d: 3, step: 5, p: 8,
    ctx: ctx(FUHRPARK, "Für die Jahresauswertung werden die Fahrleistungen aller Fahrer benötigt."),
    q: `Geben Sie für <b>alle</b> Fahrer <code>nachname</code>, die insgesamt gefahrenen Kilometer (<code>km</code>, Summe km_ende − km_start) und die Anzahl der <b>verschiedenen</b> Fahrzeuge, die sie gefahren haben (<code>fahrzeuge</code>), aus. Fahrer ohne Fahrten erscheinen mit 0 und 0. Sortierung: km absteigend, dann nachname.`,
    setup: FUHRPARK.sql,
    sol: `SELECT fa.nachname,
       COALESCE(SUM(f.km_ende - f.km_start), 0) AS km,
       COUNT(DISTINCT f.fz_id) AS fahrzeuge
FROM fahrer fa
LEFT JOIN fahrt f ON f.fahrer_id = fa.fahrer_id
GROUP BY fa.fahrer_id, fa.nachname
ORDER BY km DESC, fa.nachname`,
    ordered: true,
    why: "<p>Ergebnis: Busch 1300 km / 3 Fahrzeuge, Arnold 770 / 2, Cramer 750 / 1, Dorn 700 / 2, Ernst 600 / 2, Fuchs 0 / 0. <code>COUNT(DISTINCT f.fz_id)</code> liefert für Fuchs 0, weil NULL nicht gezählt wird.</p>",
    ex: "IHK-Fallen: <code>COUNT(f.fz_id)</code> zählt Fahrten statt Fahrzeuge (Arnold 3 statt 2). <code>SUM</code> ohne COALESCE liefert für Fuchs NULL, das bei absteigender Sortierung in SQLite ans Ende rutscht – der Wert ist trotzdem falsch.",
    tags: ["LEFT JOIN", "COUNT DISTINCT", "COALESCE"]
  });

  SQ({
    id: "lvl-sql-agg-13", topic: TA, d: 3, step: 6, p: 8,
    ctx: ctx(SUPPORT, "Das Controlling möchte wissen, welche Abteilungen mehr als 20 % der gesamten Gehaltssumme des Unternehmens verursachen. Die Gesamtsumme umfasst <b>alle</b> Mitarbeiter, auch solche ohne Abteilung."),
    q: `Geben Sie <code>bezeichnung</code> der Abteilung, die Gehaltssumme der Abteilung (<code>summe</code>) und ihren Anteil an der Gesamtgehaltssumme in Prozent (<code>anteil</code>, 1 Nachkommastelle) aus – nur Abteilungen mit einem Anteil von mehr als 20 %. Sortierung: anteil absteigend.`,
    setup: SUPPORT.sql,
    sol: `SELECT a.bezeichnung,
       SUM(m.gehalt) AS summe,
       ROUND(100.0 * SUM(m.gehalt) / (SELECT SUM(gehalt) FROM mitarbeiter), 1) AS anteil
FROM abteilung a
JOIN mitarbeiter m ON m.abteilung_id = a.abteilung_id
GROUP BY a.abteilung_id, a.bezeichnung
HAVING SUM(m.gehalt) > 0.2 * (SELECT SUM(gehalt) FROM mitarbeiter)
ORDER BY anteil DESC`,
    ordered: true,
    why: "<p>Gesamtsumme 53 000 €: IT 18 900 € (35,7 %), Vertrieb 13 400 € (25,3 %). Die nicht korrelierte Unterabfrage liefert die Gesamtsumme <b>unabhängig</b> vom JOIN der äußeren Abfrage.</p>",
    ex: "IHK-Fallen: Wird die Gesamtsumme über denselben JOIN mit abteilung berechnet, fehlt Böhm (ohne Abteilung) – die Anteile werden zu groß (IT 38,0 %). <code>SUM(m.gehalt) / SUM(gehalt)</code> ohne Unterabfrage bezieht sich auf die Gruppe und ergibt immer 100 %.",
    tags: ["HAVING", "Unterabfrage", "Anteil"]
  });

  // ===========================================================================
  // UNTERABFRAGEN
  // ===========================================================================
  var TU = "ga2-sql-subquery";

  SQ({
    id: "lvl-sql-sub-01", topic: TU, d: 1, step: 1, p: 3,
    ctx: ctx(SEMINAR, "Die Akademie möchte ihre Premium-Kurse hervorheben: Kurse, die teurer als der Durchschnitt sind.", L),
    q: `Geben Sie <code>titel</code> und <code>preis</code> aller Kurse aus, deren Preis über dem Durchschnittspreis aller Kurse liegt. Ermitteln Sie den Durchschnitt mit einer Unterabfrage. Sortierung: preis absteigend.`,
    setup: SEMINAR.sql,
    sol: `SELECT titel, preis
FROM kurs
WHERE preis > (SELECT AVG(preis) FROM kurs)
ORDER BY preis DESC`,
    ordered: true,
    why: "<p>Die Unterabfrage in Klammern wird zuerst ausgewertet und liefert genau einen Wert (≈ 907,78). Danach vergleicht die äußere Abfrage jeden Kurspreis mit diesem Wert. Ergebnis: 4 Kurse.</p>",
    ex: "Hinweis: <code>WHERE preis &gt; AVG(preis)</code> ist nicht erlaubt – Aggregatfunktionen dürfen nicht direkt in WHERE stehen. Genau dafür braucht man die Unterabfrage.",
    tags: ["Unterabfrage", "AVG"]
  });

  SQ({
    id: "lvl-sql-sub-02", topic: TU, d: 1, step: 2, p: 3,
    ctx: ctx(FUHRPARK, "Das Fahrzeug mit der höchsten Laufleistung soll ersetzt werden.", L),
    q: `Geben Sie <code>kennzeichen</code>, <code>modell</code> und <code>km_stand</code> des Fahrzeugs (bzw. der Fahrzeuge) mit dem höchsten Kilometerstand aus. Verwenden Sie eine Unterabfrage mit MAX.`,
    setup: FUHRPARK.sql,
    sol: `SELECT kennzeichen, modell, km_stand
FROM fahrzeug
WHERE km_stand = (SELECT MAX(km_stand) FROM fahrzeug)`,
    why: "<p>Ergebnis: B-FI 103 (Transit, 187 600 km). Die Lösung mit Unterabfrage liefert bei Gleichstand automatisch alle Fahrzeuge mit dem Höchstwert.</p>",
    ex: "Hinweis: <code>ORDER BY km_stand DESC LIMIT 1</code> liefert hier dasselbe, unterschlägt aber bei Gleichstand weitere Fahrzeuge – in der Prüfung ist die Unterabfrage die sichere Lösung.",
    tags: ["Unterabfrage", "MAX"]
  });

  SQ({
    id: "lvl-sql-sub-03", topic: TU, d: 1, step: 3, p: 3,
    ctx: ctx(BIB, "Für eine Ausstellung wird das älteste Buch des Bestands gesucht.", L),
    q: `Geben Sie <code>titel</code> und <code>erscheinungsjahr</code> des Buches mit dem frühesten Erscheinungsjahr aus (Unterabfrage mit MIN).`,
    setup: BIB.sql,
    sol: `SELECT titel, erscheinungsjahr
FROM buch
WHERE erscheinungsjahr = (SELECT MIN(erscheinungsjahr) FROM buch)`,
    why: "<p>Ergebnis: Buddenbrooks (1901).</p>",
    ex: "Hinweis: <code>SELECT titel, MIN(erscheinungsjahr) FROM buch</code> ist nach SQL-Standard fehlerhaft (titel steht weder in GROUP BY noch in einer Aggregatfunktion).",
    tags: ["Unterabfrage", "MIN"]
  });

  SQ({
    id: "lvl-sql-sub-04", topic: TU, d: 1, step: 4, p: 3,
    ctx: ctx(SUPPORT, "Die Personalabteilung prüft, welche Mitarbeiter unter dem Durchschnittsgehalt des Unternehmens liegen.", L),
    q: `Geben Sie <code>nachname</code> und <code>gehalt</code> aller Mitarbeiter aus, deren Gehalt unter dem Durchschnittsgehalt aller Mitarbeiter liegt. Sortierung: gehalt aufsteigend.`,
    setup: SUPPORT.sql,
    sol: `SELECT nachname, gehalt
FROM mitarbeiter
WHERE gehalt < (SELECT AVG(gehalt) FROM mitarbeiter)
ORDER BY gehalt`,
    ordered: true,
    why: "<p>Durchschnitt: 53 000 / 12 ≈ 4416,67 €. Ergebnis: 7 Mitarbeiter, beginnend mit Böhm (3200).</p>",
    ex: "Hinweis: Die Unterabfrage gehört in Klammern und bezieht sich hier auf dieselbe Tabelle wie die äußere Abfrage – das ist ausdrücklich erlaubt.",
    tags: ["Unterabfrage", "AVG"]
  });

  SQ({
    id: "lvl-sql-sub-05", topic: TU, d: 1, step: 5, p: 3,
    ctx: ctx(BIB, "Für einen Literaturabend werden alle Autoren gesucht, von denen die Bibliothek mindestens einen Roman besitzt.", L),
    q: `Geben Sie <code>nachname</code> und <code>vorname</code> aller Autoren aus, die mindestens ein Buch des Genres 'Roman' geschrieben haben. Verwenden Sie <code>IN</code> mit einer Unterabfrage. Sortierung: nachname.`,
    setup: BIB.sql,
    sol: `SELECT nachname, vorname
FROM autor
WHERE autor_id IN (SELECT autor_id FROM buch WHERE genre = 'Roman')
ORDER BY nachname`,
    ordered: true,
    why: "<p>Die Unterabfrage liefert eine <b>Liste</b> von autor_id-Werten (1, 1, 2, 2, 3, 3, 2). <code>IN</code> prüft, ob die autor_id in dieser Liste vorkommt. Ergebnis: Kafka, Mann, Zeh – jeder nur einmal.</p>",
    ex: "Hinweis: Bei einer Liste muss <code>IN</code> statt <code>=</code> verwendet werden; <code>= (SELECT …)</code> mit mehreren Werten ist ein Fehler (in SQLite wird stillschweigend nur der erste Wert genommen).",
    tags: ["IN", "Unterabfrage"]
  });

  SQ({
    id: "lvl-sql-sub-06", topic: TU, d: 1, step: 6, p: 3,
    ctx: ctx(FUHRPARK, "Für eine Kundenbefragung werden alle Fahrer gesucht, die schon einmal zu einem Kundentermin gefahren sind.", L),
    q: `Geben Sie <code>nachname</code> und <code>vorname</code> aller Fahrer aus, die mindestens eine Fahrt mit dem Zweck 'Kundentermin' hatten – jeden Fahrer nur einmal. Verwenden Sie eine Unterabfrage mit <code>IN</code>. Sortierung: nachname.`,
    setup: FUHRPARK.sql,
    sol: `SELECT nachname, vorname
FROM fahrer
WHERE fahrer_id IN (SELECT fahrer_id FROM fahrt WHERE zweck = 'Kundentermin')
ORDER BY nachname`,
    ordered: true,
    why: "<p>Ergebnis: Arnold, Dorn, Ernst. Arnold hatte drei Kundentermine, erscheint aber nur einmal, weil jede Zeile aus <code>fahrer</code> höchstens einmal geprüft wird.</p>",
    ex: "Hinweis: Eine Lösung mit JOIN liefert Arnold dreimal und braucht deshalb <code>DISTINCT</code>. Das ist ein typischer Vorteil von IN/EXISTS gegenüber dem JOIN.",
    tags: ["IN", "Unterabfrage"]
  });

  SQ({
    id: "lvl-sql-sub-07", topic: TU, d: 1, step: 7, p: 3,
    ctx: ctx(SUPPORT, "Die IT-Leitung möchte wissen, welche Mitarbeiter noch nie ein Ticket erstellt haben.", L),
    q: `Geben Sie <code>ma_id</code> und <code>nachname</code> aller Mitarbeiter aus, die noch kein Ticket <b>erstellt</b> haben (Spalte <code>ersteller_id</code>). Verwenden Sie <code>NOT IN</code>. Sortierung: ma_id.`,
    setup: SUPPORT.sql,
    sol: `SELECT ma_id, nachname
FROM mitarbeiter
WHERE ma_id NOT IN (SELECT ersteller_id FROM ticket)
ORDER BY ma_id`,
    ordered: true,
    why: "<p>Ergebnis: Richter, Kaiser, Lang. Da <code>ersteller_id</code> als NOT NULL definiert ist, enthält die Liste kein NULL – NOT IN funktioniert hier zuverlässig.</p>",
    ex: "Hinweis: Vorsicht bei Spalten, die NULL enthalten dürfen (z.B. bearbeiter_id): Enthält die Unterabfrage auch nur ein NULL, liefert <code>NOT IN</code> keine einzige Zeile.",
    tags: ["NOT IN", "Unterabfrage"]
  });

  SQ({
    id: "lvl-sql-sub-08", topic: TU, d: 1, step: 8, p: 3,
    ctx: ctx(SEMINAR, "Für eine Fahrgemeinschaft werden alle Teilnehmer gesucht, die im selben Ort wohnen wie Lena Albrecht.", L),
    q: `Geben Sie <code>nachname</code> und <code>vorname</code> aller Teilnehmer aus, die im selben Ort wohnen wie die Teilnehmerin mit dem Nachnamen 'Albrecht' – Frau Albrecht selbst ausgenommen. Ermitteln Sie den Ort per Unterabfrage. Sortierung: nachname.`,
    setup: SEMINAR.sql,
    sol: `SELECT nachname, vorname
FROM teilnehmer
WHERE ort = (SELECT ort FROM teilnehmer WHERE nachname = 'Albrecht')
  AND nachname <> 'Albrecht'
ORDER BY nachname`,
    ordered: true,
    why: "<p>Die Unterabfrage liefert 'Berlin'. Ergebnis: Celik, Hartmann.</p>",
    ex: "Hinweis: Ohne die zweite Bedingung erscheint Albrecht selbst. Den Ort fest als 'Berlin' einzutragen ist nicht gefragt – die Abfrage soll auch funktionieren, wenn Frau Albrecht umzieht.",
    tags: ["Unterabfrage", "skalarer Wert"]
  });

  SQ({
    id: "lvl-sql-sub-09", topic: TU, d: 1, step: 9, p: 4,
    ctx: ctx(SEMINAR, "Im Preisvergleich soll für jeden Kurs sichtbar sein, wie weit er vom Durchschnittspreis abweicht.", L),
    q: `Geben Sie für alle Kurse <code>titel</code>, <code>preis</code> und die Abweichung vom Durchschnittspreis aller Kurse (<code>abweichung</code> = preis − Durchschnitt, auf 2 Stellen gerundet) aus. Die Sortierung spielt keine Rolle.`,
    setup: SEMINAR.sql,
    sol: `SELECT titel, preis,
       ROUND(preis - (SELECT AVG(preis) FROM kurs), 2) AS abweichung
FROM kurs`,
    why: "<p>Eine Unterabfrage, die genau einen Wert liefert (skalare Unterabfrage), darf auch in der SELECT-Liste stehen. Sie wird für jede Zeile mit demselben Wert (≈ 907,78) verwendet.</p>",
    ex: "Hinweis: <code>preis - AVG(preis)</code> ohne Unterabfrage macht aus der Abfrage eine Aggregatabfrage mit nur einer Ergebniszeile.",
    tags: ["skalare Unterabfrage", "SELECT-Liste"]
  });

  SQ({
    id: "lvl-sql-sub-10", topic: TU, d: 3, step: 1, p: 6,
    ctx: ctx(SUPPORT, "Die Teamleitung sucht Mitarbeiter, die als Bearbeiter von Tickets noch nicht eingeplant sind. Ein Kollege schlägt <code>WHERE ma_id NOT IN (SELECT bearbeiter_id FROM ticket)</code> vor – die Abfrage liefert aber keine einzige Zeile."),
    q: `Geben Sie <code>ma_id</code> und <code>nachname</code> aller Mitarbeiter aus, die bei <b>keinem</b> Ticket als Bearbeiter (<code>bearbeiter_id</code>) eingetragen sind. Sortierung: ma_id.`,
    setup: SUPPORT.sql,
    sol: `SELECT m.ma_id, m.nachname
FROM mitarbeiter m
WHERE NOT EXISTS (SELECT 1 FROM ticket t
                  WHERE t.bearbeiter_id = m.ma_id)
ORDER BY m.ma_id`,
    ordered: true,
    why: "<p>Ergebnis: 9 Mitarbeiter (alle außer Vogel, Kaiser, Lang). Gleichwertig: <code>WHERE ma_id NOT IN (SELECT bearbeiter_id FROM ticket WHERE bearbeiter_id IS NOT NULL)</code>.</p>",
    ex: "IHK-Falle: Zwei Tickets haben keinen Bearbeiter. <code>NOT IN (…, NULL)</code> wird zu <code>ma_id &lt;&gt; … AND ma_id &lt;&gt; NULL</code> – der letzte Vergleich ist immer UNKNOWN, also wird keine Zeile geliefert. <code>NOT EXISTS</code> ist gegen NULL-Werte unempfindlich.",
    tags: ["NOT EXISTS", "NOT IN", "NULL"]
  });

  SQ({
    id: "lvl-sql-sub-11", topic: TU, d: 3, step: 2, p: 9,
    ctx: ctx(BIB, "Für einen Lesekreis werden Leser gesucht, die <b>jede</b> Dystopie des Bestands mindestens einmal ausgeliehen haben (relationale Division)."),
    q: `Geben Sie <code>nachname</code> und <code>vorname</code> aller Leser aus, die jedes Buch mit dem Genre 'Dystopie' mindestens einmal ausgeliehen haben. Die Lösung darf keine Buch-IDs fest enthalten. Sortierung: nachname.`,
    setup: BIB.sql,
    sol: `SELECT l.nachname, l.vorname
FROM leser l
WHERE NOT EXISTS (
  SELECT 1 FROM buch b
  WHERE b.genre = 'Dystopie'
    AND NOT EXISTS (SELECT 1 FROM ausleihe a
                    WHERE a.buch_id = b.buch_id
                      AND a.leser_id = l.leser_id)
)
ORDER BY l.nachname`,
    why: "<p>Gelesen: „Es gibt keine Dystopie, die dieser Leser nicht ausgeliehen hat.“ Ergebnis: Baum (hat „1984“ und „Der Report der Magd“ ausgeliehen). Alternative mit Zählen:</p>" +
      pre("SELECT l.nachname, l.vorname\nFROM leser l\nJOIN ausleihe a ON a.leser_id = l.leser_id\nJOIN buch b     ON b.buch_id = a.buch_id\nWHERE b.genre = 'Dystopie'\nGROUP BY l.leser_id, l.nachname, l.vorname\nHAVING COUNT(DISTINCT b.buch_id) = (SELECT COUNT(*) FROM buch WHERE genre = 'Dystopie');"),
    ordered: true,
    ex: "IHK-Fallen: <code>WHERE buch_id IN (SELECT buch_id FROM buch WHERE genre = 'Dystopie')</code> findet Leser mit <b>mindestens einer</b> Dystopie (Baum, Conrad, Dietz). Beim Zählen ohne DISTINCT würde ein Leser, der „1984“ zweimal ausleiht, fälschlich als vollständig gelten.",
    tags: ["NOT EXISTS", "relationale Division", "korreliert"]
  });

  SQ({
    id: "lvl-sql-sub-12", topic: TU, d: 3, step: 3, p: 9,
    ctx: ctx(SHOP, "Der Vertrieb sucht für jeden Kunden die Bestellungen, die über seinem <b>persönlichen</b> durchschnittlichen Bestellwert liegen. Bestellwert = Summe menge × einzelpreis aller Positionen einer Bestellung (alle Status)."),
    q: `Geben Sie <code>bestell_id</code>, <code>kunden_id</code> und den Bestellwert (<code>wert</code>, 2 Nachkommastellen) aller Bestellungen aus, deren Wert über dem durchschnittlichen Bestellwert <b>desselben Kunden</b> liegt. Sortierung: bestell_id.`,
    setup: SHOP.sql,
    sol: `SELECT w.bestell_id, w.kunden_id, ROUND(w.wert, 2) AS wert
FROM (SELECT b.bestell_id, b.kunden_id, SUM(bp.menge * bp.einzelpreis) AS wert
      FROM bestellung b
      JOIN bestellposition bp ON bp.bestell_id = b.bestell_id
      GROUP BY b.bestell_id, b.kunden_id) w
WHERE w.wert > (SELECT AVG(w2.wert)
                FROM (SELECT b.bestell_id, b.kunden_id, SUM(bp.menge * bp.einzelpreis) AS wert
                      FROM bestellung b
                      JOIN bestellposition bp ON bp.bestell_id = b.bestell_id
                      GROUP BY b.bestell_id, b.kunden_id) w2
                WHERE w2.kunden_id = w.kunden_id)
ORDER BY w.bestell_id`,
    ordered: true,
    why: "<p>Zwei Ebenen: Die abgeleitete Tabelle <code>w</code> berechnet den Wert je Bestellung; die <b>korrelierte</b> Unterabfrage bildet den Durchschnitt nur über die Bestellungen desselben Kunden. Ergebnis: 1001, 1002, 1003, 1007. Kunden mit nur einer Bestellung können ihren eigenen Durchschnitt nie übertreffen. Kürzer mit CTE: <code>WITH w AS (SELECT …) SELECT … FROM w WHERE wert &gt; (SELECT AVG(wert) FROM w w2 WHERE w2.kunden_id = w.kunden_id)</code>.</p>",
    ex: "IHK-Fallen: Ohne Korrelation (<code>WHERE w2.kunden_id = w.kunden_id</code>) wird mit dem Durchschnitt <b>aller</b> Bestellungen verglichen. <code>AVG(bp.menge * bp.einzelpreis)</code> ist der Durchschnitt je <b>Position</b>, nicht je Bestellung – erst summieren, dann mitteln.",
    tags: ["korrelierte Unterabfrage", "abgeleitete Tabelle"]
  });

  // ===========================================================================
  // DML
  // ===========================================================================
  var TM = "ga2-sql-dml";
  var FRISCH = "<p><small>Die Anweisung wird auf einer frischen Kopie der Datenbank ausgeführt; anschließend wird der Tabelleninhalt verglichen.</small></p>";

  SQ({
    id: "lvl-sql-dml-01", topic: TM, d: 1, step: 1, p: 3,
    ctx: ctx(FUHRPARK, "Die Firma hat eine neue Fahrerin eingestellt.", L),
    q: `Fügen Sie folgende Fahrerin in die Tabelle <code>fahrer</code> ein: fahrer_id 7, Nachname 'Graf', Vorname 'Lea', Führerscheinklasse 'B', keine Telefonnummer (NULL).` + FRISCH,
    setup: FUHRPARK.sql,
    sol: `INSERT INTO fahrer VALUES (7, 'Graf', 'Lea', 'B', NULL)`,
    check: "SELECT * FROM fahrer",
    why: "<p>Ohne Spaltenliste müssen Werte für <b>alle</b> Spalten in der Reihenfolge der Tabellendefinition angegeben werden. Besser lesbar und robuster gegenüber späteren Strukturänderungen ist die Variante mit Spaltenliste:</p>" + pre("INSERT INTO fahrer (fahrer_id, nachname, vorname, fuehrerscheinklasse, telefon)\nVALUES (7, 'Graf', 'Lea', 'B', NULL);"),
    ex: "Hinweis: Texte in einfache Hochkommas, Zahlen und NULL ohne. <code>'NULL'</code> in Hochkommas wäre der Text „NULL“, kein fehlender Wert.",
    tags: ["INSERT"]
  });

  SQ({
    id: "lvl-sql-dml-02", topic: TM, d: 1, step: 2, p: 3,
    ctx: ctx(BIB, "Ein neues Buch ist eingetroffen; ISBN, Erscheinungsjahr und Genre werden später nachgetragen.", L),
    q: `Fügen Sie das Buch mit der buch_id 13, dem Titel 'Leere Herzen' und der autor_id 3 ein. Alle übrigen Spalten sollen leer (NULL) bleiben. Verwenden Sie eine Spaltenliste.` + FRISCH,
    setup: BIB.sql,
    sol: `INSERT INTO buch (buch_id, titel, autor_id)
VALUES (13, 'Leere Herzen', 3)`,
    check: "SELECT * FROM buch",
    why: "<p>Mit Spaltenliste werden nur die genannten Spalten befüllt; alle anderen erhalten ihren DEFAULT-Wert bzw. NULL.</p>",
    ex: "Hinweis: Anzahl und Reihenfolge der Werte müssen zur Spaltenliste passen. Pflichtfelder (hier titel) dürfen nicht weggelassen werden.",
    tags: ["INSERT", "Spaltenliste"]
  });

  SQ({
    id: "lvl-sql-dml-03", topic: TM, d: 1, step: 3, p: 3,
    ctx: ctx(FUHRPARK, "Elena Busch (fahrer_id 2) hat ein Diensthandy erhalten.", L),
    q: `Tragen Sie für die Fahrerin mit der fahrer_id 2 die Telefonnummer '0157-4445556' ein. Alle anderen Fahrer bleiben unverändert.` + FRISCH,
    setup: FUHRPARK.sql,
    sol: `UPDATE fahrer
SET telefon = '0157-4445556'
WHERE fahrer_id = 2`,
    check: "SELECT * FROM fahrer",
    why: "<p><code>UPDATE tabelle SET spalte = wert WHERE bedingung;</code> – die WHERE-Klausel bestimmt, welche Zeilen geändert werden.</p>",
    ex: "Hinweis: Ohne WHERE erhalten <b>alle</b> Fahrer diese Nummer – der häufigste und folgenschwerste DML-Fehler. Ein neuer Datensatz (INSERT) wäre hier ebenfalls falsch.",
    tags: ["UPDATE"]
  });

  SQ({
    id: "lvl-sql-dml-04", topic: TM, d: 1, step: 4, p: 3,
    ctx: ctx(SEMINAR, "Online-Kurse verursachen keine Raumkosten und werden deshalb günstiger.", L),
    q: `Senken Sie den Preis aller Kurse mit dem Ort 'Online' um 50 €.` + FRISCH,
    setup: SEMINAR.sql,
    sol: `UPDATE kurs
SET preis = preis - 50
WHERE ort = 'Online'`,
    check: "SELECT kurs_id, preis FROM kurs",
    why: "<p>Auf der rechten Seite von SET darf der bisherige Wert der Spalte verwendet werden: <code>preis = preis - 50</code>. Betroffen sind 4 Kurse.</p>",
    ex: "Hinweis: <code>SET preis = 50</code> setzt den Preis auf 50 €, statt ihn um 50 € zu senken.",
    tags: ["UPDATE", "Berechnung"]
  });

  SQ({
    id: "lvl-sql-dml-05", topic: TM, d: 1, step: 5, p: 3,
    ctx: ctx(SUPPORT, "Alte, abgeschlossene Tickets aus der Zeit vor August 2026 werden nicht mehr benötigt.", L),
    q: `Löschen Sie alle Tickets mit dem Status 'geschlossen', die vor dem 01.08.2026 erstellt wurden.` + FRISCH,
    setup: SUPPORT.sql,
    sol: `DELETE FROM ticket
WHERE status = 'geschlossen'
  AND erstellt_am < '2026-08-01'`,
    check: "SELECT ticket_id FROM ticket",
    why: "<p>Gelöscht werden die Tickets 1 und 2. Beide Bedingungen müssen gelten, daher <code>AND</code>.</p>",
    ex: "Hinweis: <code>DELETE FROM ticket;</code> ohne WHERE löscht alle Tickets. Mit <code>OR</code> würden alle geschlossenen und zusätzlich alle alten Tickets gelöscht. Tipp: Vor dem DELETE die Bedingung mit <code>SELECT * FROM ticket WHERE …</code> testen.",
    tags: ["DELETE"]
  });

  SQ({
    id: "lvl-sql-dml-06", topic: TM, d: 3, step: 1, p: 9,
    ctx: ctx(SHOP, "Die Ware für offene Bestellungen wird reserviert: Der Lagerbestand jedes betroffenen Artikels soll um die Gesamtmenge verringert werden, die in Bestellungen mit dem Status 'offen' für diesen Artikel bestellt ist."),
    q: `Aktualisieren Sie die Spalte <code>bestand</code> der Tabelle <code>artikel</code> entsprechend. Artikel, die in keiner offenen Bestellung vorkommen, behalten ihren Bestand.` + FRISCH,
    setup: SHOP.sql,
    sol: `UPDATE artikel
SET bestand = bestand - (SELECT SUM(bp.menge)
                         FROM bestellposition bp
                         JOIN bestellung b ON b.bestell_id = bp.bestell_id
                         WHERE b.status = 'offen'
                           AND bp.artikel_id = artikel.artikel_id)
WHERE artikel_id IN (SELECT bp.artikel_id
                     FROM bestellposition bp
                     JOIN bestellung b ON b.bestell_id = bp.bestell_id
                     WHERE b.status = 'offen')`,
    check: "SELECT artikel_id, bestand FROM artikel",
    why: "<p>Die korrelierte Unterabfrage in SET berechnet für jede zu ändernde Artikelzeile die reservierte Menge. Betroffen: 102 (−1), 105 (−2), 106 (−3), 107 (−2), 108 (−1).</p>",
    ex: "IHK-Falle: Ohne die äußere WHERE-Klausel liefert die Unterabfrage für alle anderen Artikel NULL – und <code>bestand - NULL</code> ist NULL: Der Bestand von sieben Artikeln wäre gelöscht. Alternativ: <code>bestand - COALESCE((SELECT …), 0)</code> ohne WHERE.",
    tags: ["UPDATE", "korrelierte Unterabfrage", "NULL"]
  });

  SQ({
    id: "lvl-sql-dml-07", topic: TM, d: 3, step: 2, p: 8,
    ctx: ctx(FUHRPARK, "Zur Datenbereinigung soll für jedes Fahrzeug nur der <b>jeweils jüngste</b> Wartungseintrag erhalten bleiben. Achtung: Die Wartung 11 (M-FI 301, Dezember 2025) wurde nachträglich erfasst – die wartung_id sagt also nichts über die zeitliche Reihenfolge aus."),
    q: `Löschen Sie alle Wartungen, für die es bei <b>demselben Fahrzeug</b> eine Wartung mit einem späteren Datum gibt.` + FRISCH,
    setup: FUHRPARK.sql + "INSERT INTO wartung VALUES (11, 5, '2025-12-01', 'Bremsen', 610.0, 'BMW Service München');\n",
    sol: `DELETE FROM wartung
WHERE datum < (SELECT MAX(w2.datum)
               FROM wartung w2
               WHERE w2.fz_id = wartung.fz_id)`,
    check: "SELECT wartung_id FROM wartung",
    why: "<p>Die korrelierte Unterabfrage ermittelt das jüngste Wartungsdatum des Fahrzeugs der aktuell geprüften Zeile. Gelöscht werden die Wartungen 1, 2, 4, 6 und 11; es bleiben 3, 5, 7, 8, 9, 10. Alternativ: <code>WHERE EXISTS (SELECT 1 FROM wartung w2 WHERE w2.fz_id = wartung.fz_id AND w2.datum &gt; wartung.datum)</code>.</p>",
    ex: "IHK-Falle: Ohne Korrelation (<code>WHERE datum &lt; (SELECT MAX(datum) FROM wartung)</code>) wird mit der jüngsten Wartung <b>aller</b> Fahrzeuge verglichen – es bliebe nur eine einzige Wartung übrig. Wer die jüngste Wartung über <code>MAX(wartung_id)</code> bestimmt, löscht bei M-FI 301 die falsche. In MySQL ist die Unterabfrage auf dieselbe Tabelle in DELETE nur über eine abgeleitete Tabelle erlaubt.",
    tags: ["DELETE", "korrelierte Unterabfrage"]
  });

  var STAT_SQL = "CREATE TABLE kunden_statistik (\n  kunden_id INTEGER PRIMARY KEY,\n  anzahl INTEGER,\n  umsatz DECIMAL(10,2)\n);\n";
  SQ({
    id: "lvl-sql-dml-08", topic: TM, d: 3, step: 3, p: 8,
    ctx: ctx(SHOP, "Für ein Dashboard soll die (leere) Tabelle <b>kunden_statistik</b> befüllt werden.", { extraSchema: "<p>Zusätzlich existiert die leere Tabelle <b>kunden_statistik</b>: <u>kunden_id</u> <small>INTEGER, PK</small>, anzahl <small>INTEGER</small>, umsatz <small>DECIMAL(10,2)</small>.</p>" }),
    q: `Fügen Sie mit <b>einer</b> Anweisung für jeden Kunden mit mindestens einer nicht stornierten Bestellung eine Zeile in <code>kunden_statistik</code> ein: kunden_id, Anzahl seiner nicht stornierten Bestellungen (<code>anzahl</code>) und deren Umsatz (<code>umsatz</code>, Summe menge × einzelpreis, auf 2 Stellen gerundet).` + FRISCH,
    setup: SHOP.sql + STAT_SQL,
    sol: `INSERT INTO kunden_statistik (kunden_id, anzahl, umsatz)
SELECT b.kunden_id,
       COUNT(DISTINCT b.bestell_id),
       ROUND(SUM(bp.menge * bp.einzelpreis), 2)
FROM bestellung b
JOIN bestellposition bp ON bp.bestell_id = b.bestell_id
WHERE b.status <> 'storniert'
GROUP BY b.kunden_id`,
    check: "SELECT * FROM kunden_statistik",
    why: "<p><code>INSERT INTO … SELECT …</code> fügt das komplette Ergebnis einer Abfrage ein – ohne <code>VALUES</code>. Ergebnis: 6 Kunden (Kunde 4 hat nur eine stornierte Bestellung und fehlt).</p>",
    ex: "IHK-Fallen: <code>COUNT(*)</code> zählt Positionen statt Bestellungen. <code>INSERT INTO … VALUES (SELECT …)</code> ist ein Syntaxfehler. Wird die Statusbedingung vergessen, erscheint Kunde 4 mit 189 €.",
    tags: ["INSERT SELECT", "GROUP BY"]
  });

  SQ({
    id: "lvl-sql-dml-09", topic: TM, d: 3, step: 4, p: 8,
    ctx: ctx(SUPPORT, "Eskalationsregel: Jedes nicht geschlossene Ticket, das am Stichtag 26.10.2026 seit <b>mehr als</b> 14 Tagen besteht, wird um <b>genau eine</b> Prioritätsstufe angehoben (niedrig → mittel, mittel → hoch; hoch bleibt hoch)."),
    q: `Setzen Sie die Eskalationsregel mit einer UPDATE-Anweisung um. Ein Ticket, das genau 14 Tage vor dem Stichtag erstellt wurde, wird noch nicht eskaliert.` + FRISCH,
    setup: SUPPORT.sql,
    sol: `UPDATE ticket
SET prioritaet = CASE prioritaet
                   WHEN 'niedrig' THEN 'mittel'
                   WHEN 'mittel'  THEN 'hoch'
                   ELSE prioritaet
                 END
WHERE status <> 'geschlossen'
  AND erstellt_am < date('2026-10-26', '-14 days')`,
    check: "SELECT ticket_id, prioritaet FROM ticket",
    why: "<p><code>date('2026-10-26', '-14 days')</code> = '2026-10-12'. Eskaliert werden Ticket 7 (mittel → hoch) und Ticket 8 (niedrig → mittel); Ticket 9 ist bereits hoch, Ticket 10 (erstellt am 12.10.) ist genau 14 Tage alt. In MySQL: <code>DATE_SUB('2026-10-26', INTERVAL 14 DAY)</code>.</p>",
    ex: "IHK-Fallen: Zwei getrennte UPDATEs (erst niedrig → mittel, dann mittel → hoch) eskalieren Ticket 8 um <b>zwei</b> Stufen. Mit <code>&lt;=</code> wird Ticket 10 fälschlich eskaliert. Ohne <code>ELSE prioritaet</code> würden alle hoch-Tickets auf NULL gesetzt.",
    tags: ["UPDATE", "CASE", "Datum"]
  });

  SQ({
    id: "lvl-sql-dml-10", topic: TM, d: 3, step: 5, p: 8,
    ctx: ctx(SEMINAR, "Gut nachgefragte Kurse werden teurer: Kurse mit mindestens 3 <b>bezahlten</b> Buchungen erhalten einen Preisaufschlag von 5 % (auf 2 Nachkommastellen gerundet)."),
    q: `Führen Sie die Preiserhöhung mit einer UPDATE-Anweisung mit Unterabfrage durch.` + FRISCH,
    setup: SEMINAR.sql,
    sol: `UPDATE kurs
SET preis = ROUND(preis * 1.05, 2)
WHERE kurs_id IN (SELECT kurs_id
                  FROM buchung
                  WHERE bezahlt = 1
                  GROUP BY kurs_id
                  HAVING COUNT(*) >= 3)`,
    check: "SELECT kurs_id, preis FROM kurs",
    why: "<p>Die Unterabfrage liefert die Kurse 10 (4 bezahlte Buchungen) und 13 (3). Ihre Preise steigen auf 724,50 € bzw. 829,50 €.</p>",
    ex: "IHK-Fallen: Ohne <code>WHERE bezahlt = 1</code> wird auch Kurs 15 (3 Buchungen, davon nur 2 bezahlt) teurer. <code>HAVING COUNT(*) &gt; 3</code> trifft nur Kurs 10. <code>preis * 0.05</code> setzt den Preis auf den Aufschlag statt ihn zu erhöhen.",
    tags: ["UPDATE", "Unterabfrage", "HAVING"]
  });

  SQ({
    id: "lvl-sql-dml-11", topic: TM, d: 3, step: 6, p: 8,
    ctx: ctx(SEMINAR, "Der Kurs „Kotlin für Android“ entfällt ersatzlos. In dieser Datenbank ist die Fremdschlüsselprüfung <b>aktiviert</b> (<code>PRAGMA foreign_keys = ON</code>); die Fremdschlüssel haben kein ON DELETE CASCADE."),
    q: `Löschen Sie den Kurs mit dem Titel 'Kotlin für Android' und alle zugehörigen Buchungen. Ermitteln Sie die kurs_id ausschließlich über den Titel (Unterabfrage). Mehrere Anweisungen sind erlaubt.` + FRISCH,
    setup: SEMINAR.sql + "PRAGMA foreign_keys = ON;\n",
    sol: `DELETE FROM buchung
WHERE kurs_id = (SELECT kurs_id FROM kurs WHERE titel = 'Kotlin für Android');
DELETE FROM kurs
WHERE titel = 'Kotlin für Android';`,
    check: "SELECT 'kurs', kurs_id FROM kurs UNION ALL SELECT 'buchung', buchung_id FROM buchung",
    why: "<p>Zuerst müssen die abhängigen Zeilen (Kind-Tabelle <code>buchung</code>) gelöscht werden, danach der Kurs (Eltern-Tabelle). In der Praxis gehören beide Anweisungen in <b>eine Transaktion</b>, damit nicht nur eine von beiden ausgeführt wird.</p>",
    ex: "IHK-Falle: In umgekehrter Reihenfolge bricht das erste DELETE mit „FOREIGN KEY constraint failed“ ab, weil Buchung 19 noch auf den Kurs verweist. Wird der Kurs zuerst gelöscht und erst dann nach seiner ID gesucht, findet die Unterabfrage nichts mehr.",
    tags: ["DELETE", "referenzielle Integrität", "Reihenfolge"]
  });

  // ===========================================================================
  // TRANSAKTIONEN, DCL, Trigger, Index, Sicherheit
  // ===========================================================================
  var TT = "ga2-sql-transaktionen";

  Q({
    id: "lvl-sql-ta-01", topic: TT, type: "mc", difficulty: 1, step: 1, points: 2,
    question: "Was versteht man in einem relationalen Datenbanksystem unter einer <b>Transaktion</b>?",
    options: [
      "Eine Folge von Datenbankoperationen, die als logische Einheit entweder vollständig oder gar nicht ausgeführt wird",
      "Eine einzelne SELECT-Abfrage, die Daten aus mehreren Tabellen liest",
      "Die Übertragung einer Datenbank auf einen anderen Server",
      "Eine gespeicherte Sicht auf eine oder mehrere Tabellen"
    ],
    correct: [0],
    solution: "<p>Eine Transaktion fasst mehrere Operationen (z.B. Abbuchung und Gutschrift) zu einer <b>logischen Einheit</b> zusammen: Sie wird mit <code>COMMIT</code> vollständig festgeschrieben oder mit <code>ROLLBACK</code> vollständig zurückgenommen.</p>",
    explanation: "Hinweis: Die gespeicherte Sicht ist eine <b>View</b>. Typisches Beispiel für eine Transaktion ist die Umbuchung zwischen zwei Konten.",
    tags: ["Transaktion"]
  });

  Q({
    id: "lvl-sql-ta-02", topic: TT, type: "mc", difficulty: 1, step: 2, points: 2,
    context: pre("START TRANSACTION;\nUPDATE konto SET saldo = saldo - 100 WHERE konto_id = 1;\nUPDATE konto SET saldo = saldo + 100 WHERE konto_id = 2;\n-- ???"),
    question: "Mit welcher Anweisung werden beide Änderungen dauerhaft gespeichert und für andere Benutzer sichtbar?",
    options: ["SAVE;", "COMMIT;", "ROLLBACK;", "END UPDATE;"],
    correct: [1],
    solution: "<p><code>COMMIT</code> beendet die Transaktion erfolgreich und schreibt alle Änderungen dauerhaft fest. <code>ROLLBACK</code> würde beide Änderungen verwerfen.</p>",
    explanation: "Hinweis: <code>SAVE</code> und <code>END UPDATE</code> gibt es in SQL nicht. In SQLite startet man die Transaktion mit <code>BEGIN;</code>, in MySQL mit <code>START TRANSACTION;</code> oder <code>BEGIN;</code>.",
    tags: ["COMMIT"]
  });

  Q({
    id: "lvl-sql-ta-03", topic: TT, type: "multi", difficulty: 1, step: 3, points: 3,
    question: "Welche Begriffe gehören zu den <b>ACID</b>-Eigenschaften von Transaktionen? (Mehrere Antworten möglich)",
    options: ["Atomarität (Atomicity)", "Verfügbarkeit (Availability)", "Konsistenz (Consistency)", "Isolation (Isolation)", "Redundanz (Redundancy)", "Dauerhaftigkeit (Durability)"],
    correct: [0, 2, 3, 5],
    solution: "<p><b>A</b>tomicity – alles oder nichts; <b>C</b>onsistency – von einem konsistenten Zustand in einen konsistenten Zustand; <b>I</b>solation – parallele Transaktionen beeinflussen sich nicht; <b>D</b>urability – nach COMMIT dauerhaft gespeichert, auch bei Absturz.</p>",
    explanation: "Hinweis: Availability stammt aus dem CAP-Theorem bzw. der IT-Sicherheit (Schutzziele). Redundanz soll durch Normalisierung gerade vermieden werden.",
    tags: ["ACID"]
  });

  SQ({
    id: "lvl-sql-ta-04", topic: TT, d: 1, step: 4, p: 4,
    ctx: ctx(BANK, "Ole Brandt (Konto 2) überweist 250 € an Lina Vogt (Konto 3).", L),
    q: `Schreiben Sie die Umbuchung als Transaktion: Transaktion beginnen, 250 € von Konto 2 abbuchen, 250 € auf Konto 3 gutschreiben, Transaktion festschreiben (SQLite: <code>BEGIN;</code> … <code>COMMIT;</code>).` + FRISCH,
    setup: BANK.sql,
    sol: `BEGIN;
UPDATE konto SET saldo = saldo - 250 WHERE konto_id = 2;
UPDATE konto SET saldo = saldo + 250 WHERE konto_id = 3;
COMMIT;`,
    check: "SELECT konto_id, saldo FROM konto",
    why: "<p>Danach: Konto 2 = 950 €, Konto 3 = 330 €. Durch die Klammer BEGIN … COMMIT werden beide UPDATEs gemeinsam (atomar) ausgeführt – stürzt das System zwischen den beiden Anweisungen ab, wird auch die Abbuchung zurückgenommen.</p>",
    ex: "Hinweis: Nach jeder Anweisung steht ein Semikolon. Typischer Fehler: Vorzeichen vertauscht oder bei einem UPDATE die WHERE-Klausel vergessen (dann ändern sich alle Konten).",
    tags: ["BEGIN", "COMMIT", "Atomarität"]
  });

  Q({
    id: "lvl-sql-ta-05", topic: TT, type: "text", difficulty: 1, step: 5, points: 4,
    question: "Nennen Sie die vier ACID-Eigenschaften und erläutern Sie jede in einem Satz.",
    solution: "<ul><li><b>Atomarität</b>: Eine Transaktion wird ganz oder gar nicht ausgeführt.</li><li><b>Konsistenz</b>: Nach der Transaktion sind alle Integritätsbedingungen (PK, FK, CHECK) erfüllt – die DB geht von einem konsistenten in einen konsistenten Zustand über.</li><li><b>Isolation</b>: Parallel laufende Transaktionen beeinflussen sich nicht; das Ergebnis ist so, als liefen sie nacheinander.</li><li><b>Dauerhaftigkeit</b>: Nach dem COMMIT bleiben die Änderungen auch bei einem Systemabsturz erhalten (z.B. durch das Transaktionslog).</li></ul>",
    explanation: "Hinweis: In der Prüfung genügt je Eigenschaft ein treffender Satz. Häufige Verwechslung: Konsistenz ≠ „Daten sind immer richtig“, sondern „Integritätsbedingungen werden eingehalten“.",
    keywords: ["atomar|atomicity|atomarität", "ganz oder gar nicht|alles oder nichts", "konsisten", "integrität|konsistenten zustand", "isolation|isoliert", "parallel|gleichzeitig", "dauerhaft|durability", "commit|absturz"],
    tags: ["ACID"]
  });

  Q({
    id: "lvl-sql-ta-06", topic: TT, type: "mc", difficulty: 1, step: 6, points: 2,
    question: "Welche Maßnahme schützt eine Anwendung am wirksamsten vor <b>SQL-Injection</b>?",
    options: [
      "Prepared Statements mit Platzhaltern (Parametern) statt zusammengesetzter SQL-Strings",
      "Die Datenbank auf einem eigenen Server betreiben",
      "Alle Tabellen regelmäßig sichern (Backup)",
      "Benutzereingaben in Großbuchstaben umwandeln"
    ],
    correct: [0],
    solution: "<p>Bei einem <b>Prepared Statement</b> wird die SQL-Struktur vorab festgelegt (<code>WHERE login = ?</code>); die Benutzereingabe wird getrennt übergeben und immer als Wert, nie als SQL-Code interpretiert.</p>",
    explanation: "Hinweis: Ein Backup hilft nach einem Angriff, verhindert ihn aber nicht. Ergänzend: Eingabevalidierung und Datenbankbenutzer mit minimalen Rechten.",
    tags: ["SQL-Injection", "Prepared Statement"]
  });

  Q({
    id: "lvl-sql-ta-07", topic: TT, type: "mc", difficulty: 1, step: 7, points: 2,
    context: "<p>Der Benutzer <code>praktikant</code> hat bisher das Recht, Datensätze in der Tabelle <code>artikel</code> zu ändern. Dieses Recht soll ihm entzogen werden.</p>",
    question: "Welche Anweisung ist korrekt?",
    options: [
      "REVOKE UPDATE ON artikel FROM praktikant;",
      "GRANT NOT UPDATE ON artikel TO praktikant;",
      "DELETE UPDATE ON artikel FROM praktikant;",
      "REVOKE UPDATE ON artikel TO praktikant;"
    ],
    correct: [0],
    solution: "<p>Rechte werden mit <code>GRANT … ON … TO …</code> vergeben und mit <code>REVOKE … ON … FROM …</code> entzogen (DCL – Data Control Language).</p>",
    explanation: "Hinweis: Merkhilfe – man gibt <b>an</b> jemanden (TO) und nimmt <b>von</b> jemandem (FROM). <code>REVOKE … TO</code> ist ein häufiger Prüfungsfehler.",
    tags: ["DCL", "REVOKE"]
  });

  SQ({
    id: "lvl-sql-ta-08", topic: TT, d: 3, step: 1, p: 8,
    ctx: ctx(BANK, "Zwei Daueraufträge sollen ausgeführt werden: <b>A</b>: 300 € von Konto 2 an Konto 5, <b>B</b>: 700 € von Konto 1 an Konto 4. Jede Umbuchung darf nur ausgeführt werden, wenn das Quellkonto den Betrag vollständig deckt – sonst entfällt <b>die gesamte</b> Umbuchung (weder Abbuchung noch Gutschrift). Die Anweisungen dürfen keinen Fehler auslösen."),
    q: `Formulieren Sie die SQL-Anweisungen (innerhalb einer Transaktion), sodass beide Daueraufträge regelkonform verarbeitet werden. Die Deckungsprüfung muss in den SQL-Anweisungen selbst erfolgen – die Salden dürfen nicht fest eingetragen werden.` + FRISCH,
    setup: BANK.sql,
    sol: `BEGIN;
-- Umbuchung A: Abbuchung und Gutschrift in einer Anweisung, nur bei Deckung
UPDATE konto
SET saldo = CASE konto_id WHEN 2 THEN saldo - 300 ELSE saldo + 300 END
WHERE konto_id IN (2, 5)
  AND (SELECT saldo FROM konto WHERE konto_id = 2) >= 300;
-- Umbuchung B
UPDATE konto
SET saldo = CASE konto_id WHEN 1 THEN saldo - 700 ELSE saldo + 700 END
WHERE konto_id IN (1, 4)
  AND (SELECT saldo FROM konto WHERE konto_id = 1) >= 700;
COMMIT;`,
    check: "SELECT konto_id, saldo FROM konto",
    why: "<p>Ergebnis: A wird ausgeführt (Konto 2: 900 €, Konto 5: 640,50 €), B entfällt (Konto 1 hat nur 500 €). Abbuchung und Gutschrift stehen in <b>einer</b> Anweisung mit derselben Deckungsbedingung, damit nie nur eine Hälfte ausgeführt wird. In einer Anwendung würde man stattdessen den Saldo mit <code>SELECT … FOR UPDATE</code> sperren und lesen, dann im Programm entscheiden und COMMIT bzw. ROLLBACK ausführen.</p>",
    ex: "IHK-Fallen: Zwei getrennte UPDATEs, bei denen die Gutschrift die Deckung <b>nach</b> der Abbuchung prüft, sind fehleranfällig. Ohne Deckungsprüfung verletzt B die CHECK-Bedingung (Saldo −200) und bricht mit Fehler ab. Wird nur die Abbuchung bedingt ausgeführt, die Gutschrift aber nicht, entsteht bei B Geld aus dem Nichts (Konto 4 + 700 €).",
    tags: ["Transaktion", "Atomarität", "CASE"]
  });

  var LOG_SQL = "CREATE TABLE gehalt_log (\n  log_id INTEGER PRIMARY KEY,\n  ma_id INTEGER,\n  alt DECIMAL(8,2),\n  neu DECIMAL(8,2)\n);\n";
  SQ({
    id: "lvl-sql-ta-09", topic: TT, d: 3, step: 2, p: 9,
    ctx: ctx(SUPPORT, "Jede Gehaltsänderung soll – egal aus welcher Anwendung – automatisch protokolliert werden.", { extraSchema: "<p>Zusätzlich existiert die leere Tabelle <b>gehalt_log</b>: <u>log_id</u> <small>INTEGER, PK (wird automatisch vergeben)</small>, ma_id <small>INTEGER</small>, alt <small>DECIMAL(8,2)</small>, neu <small>DECIMAL(8,2)</small>.</p>" }),
    q: `<ol><li>Erstellen Sie einen Trigger <code>trg_gehalt_log</code> (SQLite-Syntax), der nach jeder Änderung der Spalte <code>gehalt</code> in <code>mitarbeiter</code> je geänderter Zeile ma_id, altes und neues Gehalt in <code>gehalt_log</code> schreibt.</li>
<li>Erhöhen Sie anschließend das Gehalt aller Mitarbeiter der Abteilung 1 um 200 €.</li></ol>
<p><small>Geprüft werden der Inhalt von gehalt_log (ma_id, alt, neu) und das Vorhandensein eines Triggers auf mitarbeiter.</small></p>`,
    setup: SUPPORT.sql + LOG_SQL,
    sol: `CREATE TRIGGER trg_gehalt_log
AFTER UPDATE OF gehalt ON mitarbeiter
FOR EACH ROW
BEGIN
  INSERT INTO gehalt_log (ma_id, alt, neu)
  VALUES (OLD.ma_id, OLD.gehalt, NEW.gehalt);
END;
UPDATE mitarbeiter SET gehalt = gehalt + 200 WHERE abteilung_id = 1;`,
    check: "SELECT 'log', ma_id, alt, neu FROM gehalt_log UNION ALL SELECT 'trigger', COUNT(*), NULL, NULL FROM sqlite_master WHERE type = 'trigger' AND tbl_name = 'mitarbeiter'",
    why: "<p>Der Trigger feuert automatisch für jede der 4 geänderten Zeilen. <code>OLD</code> enthält die Zeile vor, <code>NEW</code> nach der Änderung. MySQL-Variante: <code>CREATE TRIGGER … AFTER UPDATE ON mitarbeiter FOR EACH ROW INSERT INTO gehalt_log … ;</code> (bei mehreren Anweisungen mit BEGIN … END und geändertem DELIMITER).</p>",
    ex: "IHK-Fallen: <code>NEW.gehalt</code> für beide Werte (alt = neu), Trigger auf INSERT statt UPDATE, oder das Protokoll per Hand einfügen – dann umgeht jede andere Anwendung die Protokollierung. Eine Stored Procedure müsste explizit aufgerufen werden.",
    tags: ["Trigger", "OLD/NEW"]
  });

  Q({
    id: "lvl-sql-ta-10", topic: TT, type: "multi", difficulty: 3, step: 3, points: 5,
    context: "<p>Zwei Transaktionen laufen parallel mit Zeilensperren:</p>" +
      "<table><tr><th>Zeit</th><th>T1</th><th>T2</th></tr>" +
      "<tr><td>1</td><td>UPDATE artikel SET bestand = bestand − 1 WHERE artikel_id = 101; (sperrt 101)</td><td></td></tr>" +
      "<tr><td>2</td><td></td><td>UPDATE artikel SET bestand = bestand − 1 WHERE artikel_id = 102; (sperrt 102)</td></tr>" +
      "<tr><td>3</td><td>UPDATE artikel SET bestand = bestand − 1 WHERE artikel_id = 102; (wartet)</td><td></td></tr>" +
      "<tr><td>4</td><td></td><td>UPDATE artikel SET bestand = bestand − 1 WHERE artikel_id = 101; (wartet)</td></tr></table>",
    question: "Welche Aussagen zu dieser Situation sind zutreffend? (Mehrere Antworten möglich)",
    options: [
      "Es liegt ein Deadlock vor: Beide Transaktionen warten zyklisch auf eine Sperre der jeweils anderen.",
      "Das DBMS erkennt den Deadlock und bricht eine der Transaktionen mit ROLLBACK ab.",
      "Beide Transaktionen werden nach kurzer Wartezeit automatisch erfolgreich festgeschrieben.",
      "Ein Deadlock lässt sich vermeiden, wenn alle Transaktionen Sperren in derselben Reihenfolge anfordern (z.B. aufsteigende artikel_id).",
      "Es handelt sich um einen Dirty Read.",
      "Die Anwendung sollte eine abgebrochene Transaktion erkennen und sie wiederholen.",
      "Ein Deadlock kann nur bei der Isolationsstufe READ UNCOMMITTED auftreten."
    ],
    correct: [0, 1, 3, 5],
    solution: "<p>Richtig: 1, 2, 4, 6. T1 hält 101 und wartet auf 102, T2 hält 102 und wartet auf 101 – ein Zyklus (<b>Deadlock</b>). Das DBMS erkennt ihn (Wartegraph oder Timeout) und setzt eine Transaktion als „Opfer“ zurück; die andere läuft weiter. Gegenmaßnahmen: einheitliche Sperrreihenfolge, kurze Transaktionen, Wiederholungslogik in der Anwendung.</p>",
    explanation: "Ein Dirty Read ist das Lesen nicht festgeschriebener Daten – hier wird nur geschrieben und gewartet. Deadlocks entstehen durch Sperren und sind bei höheren Isolationsstufen eher wahrscheinlicher, nicht nur bei READ UNCOMMITTED.",
    tags: ["Deadlock", "Sperren"]
  });

  Q({
    id: "lvl-sql-ta-11", topic: TT, type: "text", difficulty: 3, step: 4, points: 8,
    context: "<p>Isolationsstufe READ COMMITTED. Zwei Transaktionen auf der Tabelle <code>buchung</code> der Seminarverwaltung:</p>" +
      "<table><tr><th>Zeit</th><th>T1 (Auswertung)</th><th>T2 (Online-Buchung)</th></tr>" +
      "<tr><td>1</td><td>SELECT COUNT(*) FROM buchung WHERE kurs_id = 10;  → 5</td><td></td></tr>" +
      "<tr><td>2</td><td></td><td>INSERT INTO buchung VALUES (21, 11, 10, '2026-10-26', 0);</td></tr>" +
      "<tr><td>3</td><td></td><td>COMMIT;</td></tr>" +
      "<tr><td>4</td><td>SELECT SUM(k.preis) FROM buchung b JOIN kurs k ON k.kurs_id = b.kurs_id WHERE b.kurs_id = 10;  → 4140</td><td></td></tr>" +
      "<tr><td>5</td><td>COMMIT;</td><td></td></tr></table>" +
      "<p>T1 erstellt einen Bericht: „5 Buchungen, Umsatz 4140 €“ (Kurspreis 690 €).</p>",
    question: "Benennen und erläutern Sie das aufgetretene Isolationsproblem. Begründen Sie, welche Isolationsstufe es (nach SQL-Standard) verhindert, und nennen Sie einen Nachteil dieser Stufe.",
    solution: "<p><b>Phantom Read</b>: T1 liest zweimal eine Menge von Zeilen mit derselben Bedingung (<code>kurs_id = 10</code>). Zwischen den Lesevorgängen fügt T2 eine passende Zeile ein und schreibt sie fest. Beim zweiten Lesen taucht diese neue Zeile („Phantom“) auf: 6 × 690 € = 4140 € passt nicht zu den zuvor gezählten 5 Buchungen – der Bericht ist inkonsistent.</p>" +
      "<p>Kein Dirty Read (T2 hat vor dem Lesen committet) und kein Non-Repeatable Read im engeren Sinn (keine bereits gelesene Zeile wurde geändert, sondern eine neue kam hinzu).</p>" +
      "<p><b>Abhilfe:</b> Nach SQL-Standard verhindert erst <b>SERIALIZABLE</b> Phantome (REPEATABLE READ sichert nur bereits gelesene Zeilen; einige DBMS wie InnoDB verhindern Phantome mit Next-Key-Locks/MVCC aber schon dort). Alternativ beide Werte in <b>einer</b> Abfrage ermitteln.</p>" +
      "<p><b>Nachteil:</b> weniger Parallelität – mehr Sperren bzw. Wartezeiten, Transaktionen können wegen Serialisierungskonflikten abgebrochen werden, Gefahr von Deadlocks, schlechtere Performance.</p>",
    explanation: "Typischer Fehler: Verwechslung mit Non-Repeatable Read. Merkhilfe: Non-Repeatable = <b>dieselbe</b> Zeile hat einen anderen Wert (UPDATE); Phantom = die <b>Menge</b> der Zeilen ändert sich (INSERT/DELETE).",
    keywords: ["phantom", "insert|eingefügt|neue zeile", "zweimal|wiederholt|erneut", "commit", "serializable|serialisierbar", "repeatable read", "parallel|sperr|wartezeit|performance", "inkonsistent|widersprüchlich"],
    tags: ["Isolationsstufen", "Phantom Read"]
  });

  Q({
    id: "lvl-sql-ta-12", topic: TT, type: "numeric", difficulty: 3, step: 5, points: 4,
    context: ctx(BANK, "Konto 1 hat vor Beginn einen Saldo von 500 €. Die folgenden Anweisungen werden nacheinander in <b>einer</b> Sitzung ausgeführt (SQLite, Autocommit außerhalb von Transaktionen).") +
      pre("BEGIN;\nUPDATE konto SET saldo = saldo - 200 WHERE konto_id = 1;\nSAVEPOINT sp1;\nUPDATE konto SET saldo = saldo - 250 WHERE konto_id = 1;\nROLLBACK TO sp1;\nUPDATE konto SET saldo = saldo + 50 WHERE konto_id = 1;\nCOMMIT;\nUPDATE konto SET saldo = saldo + 10 WHERE konto_id = 1;\nBEGIN;\nUPDATE konto SET saldo = saldo * 2 WHERE konto_id = 1;\nROLLBACK;"),
    question: "Welchen Saldo hat Konto 1 nach Ausführung aller Anweisungen?",
    answer: 360,
    tolerance: 0.001,
    unit: "€",
    solution: "<ul><li>500 − 200 = 300</li><li>SAVEPOINT sp1 merkt den Zustand 300</li><li>300 − 250 = 50, <code>ROLLBACK TO sp1</code> → wieder 300 (die Transaktion läuft weiter!)</li><li>300 + 50 = 350, COMMIT schreibt 350 fest</li><li>+ 10 im Autocommit-Modus → 360 sofort festgeschrieben</li><li>× 2 = 720, aber ROLLBACK → zurück auf <b>360 €</b></li></ul>",
    explanation: "Typische Fehler: <code>ROLLBACK TO sp1</code> mit einem vollständigen ROLLBACK verwechseln (würde auch die −200 zurücknehmen) oder übersehen, dass das UPDATE außerhalb einer Transaktion durch Autocommit sofort dauerhaft ist.",
    tags: ["SAVEPOINT", "ROLLBACK", "Autocommit"]
  });

  Q({
    id: "lvl-sql-ta-13", topic: TT, type: "text", difficulty: 3, step: 6, points: 8,
    context: ctx(SHOP, "Die Tabelle <code>bestellung</code> enthält inzwischen 8 Millionen Zeilen. Folgende Abfragen werden sehr häufig ausgeführt und sind zu langsam:") +
      pre("-- (1) Bestellhistorie eines Kunden, neueste zuerst\nSELECT * FROM bestellung WHERE kunden_id = ? ORDER BY bestelldatum DESC;\n-- (2) Offene Bestellungen eines Kunden\nSELECT * FROM bestellung WHERE kunden_id = ? AND status = 'offen';\n-- (3) Bestellungen eines Tages\nSELECT * FROM bestellung WHERE bestelldatum = ?;"),
    question: "Schlagen Sie geeignete Indizes vor (SQL-Anweisungen) und begründen Sie die Spaltenreihenfolge eines zusammengesetzten Index. Erläutern Sie außerdem, warum ein zusätzlicher Index nur auf <code>status</code> wenig sinnvoll ist und welchen Nachteil Indizes allgemein haben.",
    solution: pre("CREATE INDEX idx_best_kunde_datum ON bestellung(kunden_id, bestelldatum);\nCREATE INDEX idx_best_datum       ON bestellung(bestelldatum);") +
      "<ul><li>Der <b>zusammengesetzte Index (kunden_id, bestelldatum)</b> bedient Abfrage (1) vollständig: Suche über kunden_id, die Einträge liegen innerhalb eines Kunden bereits nach Datum sortiert vor (kein zusätzliches Sortieren). Auch (2) profitiert, da zuerst über kunden_id eingeschränkt wird.</li>" +
      "<li><b>Spaltenreihenfolge</b>: Ein zusammengesetzter Index kann nur von links nach rechts genutzt werden (Präfix-Regel). Die Spalte mit Gleichheitsbedingung (kunden_id) gehört nach vorn, die Sortier-/Bereichsspalte nach hinten. Ein Index (bestelldatum, kunden_id) hilft bei Abfrage (1) kaum.</li>" +
      "<li>Abfrage (3) braucht einen eigenen Index auf bestelldatum, weil bestelldatum im ersten Index nicht an erster Stelle steht.</li>" +
      "<li><b>Index nur auf status</b>: geringe Selektivität (nur wenige verschiedene Werte wie 'offen', 'geliefert') – ein großer Teil der Tabelle müsste trotzdem gelesen werden; das DBMS nutzt ihn oft gar nicht. Für (2) kann man stattdessen (kunden_id, status) indizieren.</li>" +
      "<li><b>Nachteile</b>: zusätzlicher Speicherplatz, langsamere INSERT/UPDATE/DELETE, weil jeder Index mitgepflegt werden muss.</li></ul>",
    explanation: "Typischer Fehler: für jede Spalte einen Einzelindex anlegen. Das DBMS nutzt meist nur einen Index pro Tabellenzugriff – ein passender zusammengesetzter Index ist effizienter.",
    keywords: ["create index", "kunden_id, bestelldatum|zusammengesetzt", "reihenfolge|links|präfix", "sortier|order by", "selektivität|wenige verschiedene werte|wenige werte", "speicher", "insert|update|schreib|langsamer", "b-baum|b-tree|full table scan|tabellendurchlauf"],
    tags: ["Index", "Performance"]
  });

})();
