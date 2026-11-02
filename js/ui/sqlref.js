/* AP2-Lerntool – Beiblatt „SQL-Syntax“: Nachschlagewerk wie die Syntax-Anlage in der Prüfung.
 * Notation: [ ] = optional, { a | b } = Auswahl, … = Wiederholung. Beispiele laufen in SQLite (Lerntool),
 * Abweichungen zu MySQL/MariaDB sind markiert. */
(function (root) {
  "use strict";
  var App = (root.App = root.App || {});
  var UI = (App.ui = App.ui || {});

  function sec(id, title, body) { return { id: id, title: title, body: body }; }
  function code(s) { return "<pre><code>" + s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</code></pre>"; }

  UI.SQL_REF = [
    sec("grund", "Grundform SELECT & Ausführungsreihenfolge",
      code("SELECT [DISTINCT] spalte1 [AS alias], ausdruck, …\nFROM tabelle [alias]\n[JOIN tabelle2 ON bedingung]\n[WHERE zeilenbedingung]\n[GROUP BY spalte, …]\n[HAVING gruppenbedingung]\n[ORDER BY spalte [ASC|DESC], …]\n[LIMIT anzahl [OFFSET start]];") +
      "<p><strong>Logische Auswertungsreihenfolge:</strong> FROM/JOIN → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT.</p>" +
      "<ul><li>Darum darf ein Spalten-<b>Alias</b> aus SELECT nicht in WHERE verwendet werden (wohl aber in ORDER BY).</li><li>Aggregatfunktionen nie in WHERE – dafür gibt es HAVING.</li><li>Jede Anweisung mit <code>;</code> abschließen. Schlüsselwörter sind nicht case-sensitiv.</li><li><code>SELECT *</code> = alle Spalten; Kommentar: <code>-- bis Zeilenende</code> oder <code>/* … */</code>.</li></ul>"),
    sec("where", "WHERE – Vergleiche & Operatoren",
      "<table class='list'><tbody>" +
      "<tr><td><code>= &lt;&gt; != &lt; &lt;= &gt; &gt;=</code></td><td>Vergleich (<code>&lt;&gt;</code> ist Standard für ungleich)</td></tr>" +
      "<tr><td><code>AND, OR, NOT</code></td><td>Verknüpfung – Vorrang: NOT vor AND vor OR → Klammern setzen!</td></tr>" +
      "<tr><td><code>BETWEEN a AND b</code></td><td>Bereich <b>inklusive</b> beider Grenzen</td></tr>" +
      "<tr><td><code>IN (w1, w2, …)</code> / <code>NOT IN</code></td><td>Wert in Liste bzw. Unterabfrage</td></tr>" +
      "<tr><td><code>LIKE 'Mu%'</code></td><td><code>%</code> = beliebig viele Zeichen, <code>_</code> = genau ein Zeichen</td></tr>" +
      "<tr><td><code>IS NULL</code> / <code>IS NOT NULL</code></td><td>Prüfung auf NULL – <b>nie</b> <code>= NULL</code></td></tr>" +
      "<tr><td><code>EXISTS (SELECT …)</code></td><td>wahr, wenn die Unterabfrage mind. eine Zeile liefert</td></tr></tbody></table>" +
      code("SELECT name, ort FROM kunde\nWHERE (ort = 'Köln' OR ort = 'Bonn')\n  AND umsatz BETWEEN 1000 AND 5000\n  AND email IS NOT NULL\n  AND name LIKE 'M%';") +
      "<p>Texte und Datumswerte in einfachen Anführungszeichen: <code>'Müller'</code>, <code>'2026-11-25'</code>. Zahlen ohne Anführungszeichen.</p>"),
    sec("order", "ORDER BY, DISTINCT, LIMIT, Alias, Berechnungen",
      code("SELECT DISTINCT ort FROM kunde ORDER BY ort;            -- Duplikate entfernen\nSELECT name, preis * 1.19 AS brutto FROM artikel\nORDER BY brutto DESC, name ASC                        -- mehrere Sortierschlüssel\nLIMIT 5;                                              -- nur die ersten 5 Zeilen\nSELECT k.name FROM kunde AS k;                        -- Tabellen-Alias") +
      "<ul><li>ASC = aufsteigend (Standard), DESC = absteigend. NULL steht in SQLite/MySQL bei ASC zuerst.</li><li>Rechnen: <code>+ - * / %</code>. Achtung SQLite: <code>7 / 2 = 3</code> (Ganzzahldivision) → <code>7 / 2.0</code> oder <code>CAST(x AS REAL)</code>.</li><li>MS SQL Server: <code>SELECT TOP 5 …</code> statt LIMIT.</li></ul>"),
    sec("agg", "Aggregatfunktionen, GROUP BY, HAVING",
      "<table class='list'><tbody>" +
      "<tr><td><code>COUNT(*)</code></td><td>Anzahl Zeilen (inkl. NULL)</td></tr>" +
      "<tr><td><code>COUNT(spalte)</code></td><td>Anzahl Werte <b>ohne</b> NULL</td></tr>" +
      "<tr><td><code>COUNT(DISTINCT spalte)</code></td><td>Anzahl verschiedener Werte</td></tr>" +
      "<tr><td><code>SUM, AVG, MIN, MAX</code></td><td>Summe, Durchschnitt, Minimum, Maximum (ignorieren NULL)</td></tr></tbody></table>" +
      code("SELECT abteilung, COUNT(*) AS anzahl, AVG(gehalt) AS schnitt\nFROM mitarbeiter\nWHERE eintritt >= '2020-01-01'     -- filtert Zeilen VOR dem Gruppieren\nGROUP BY abteilung\nHAVING COUNT(*) > 3                -- filtert Gruppen NACH dem Gruppieren\nORDER BY schnitt DESC;") +
      "<ul><li>Regel: Jede Spalte im SELECT, die nicht in einer Aggregatfunktion steht, muss im GROUP BY stehen.</li><li>Gruppen ohne Treffer zählen: LEFT JOIN + <code>COUNT(rechte_tabelle.id)</code> (nicht <code>COUNT(*)</code>, das ergäbe 1).</li><li><code>ROUND(AVG(preis), 2)</code> rundet auf 2 Nachkommastellen.</li></ul>"),
    sec("join", "JOINs – Tabellen verknüpfen",
      code("-- INNER JOIN: nur Zeilen mit Partner in beiden Tabellen\nSELECT k.name, b.datum\nFROM kunde k\nINNER JOIN bestellung b ON b.kunde_id = k.kunde_id;\n\n-- LEFT JOIN: alle Zeilen der linken Tabelle, fehlende Partner = NULL\nSELECT k.name, b.bestell_id\nFROM kunde k\nLEFT JOIN bestellung b ON b.kunde_id = k.kunde_id;\n\n-- Kunden OHNE Bestellung\nSELECT k.name FROM kunde k\nLEFT JOIN bestellung b ON b.kunde_id = k.kunde_id\nWHERE b.bestell_id IS NULL;\n\n-- Mehrere Tabellen (n:m über Zwischentabelle)\nSELECT s.name, k.titel\nFROM schueler s\nJOIN belegung bl ON bl.schueler_id = s.schueler_id\nJOIN kurs k      ON k.kurs_id = bl.kurs_id;\n\n-- Self-Join (Mitarbeiter mit Vorgesetztem)\nSELECT m.name, v.name AS chef\nFROM mitarbeiter m LEFT JOIN mitarbeiter v ON m.chef_id = v.ma_id;") +
      "<table class='list'><tbody><tr><td><code>[INNER] JOIN</code></td><td>Schnittmenge</td></tr><tr><td><code>LEFT [OUTER] JOIN</code></td><td>alle links + passende rechts</td></tr><tr><td><code>RIGHT [OUTER] JOIN</code></td><td>alle rechts + passende links</td></tr><tr><td><code>FULL [OUTER] JOIN</code></td><td>alle aus beiden (MySQL: nicht vorhanden → LEFT … UNION … RIGHT)</td></tr><tr><td><code>CROSS JOIN</code></td><td>kartesisches Produkt (jede mit jeder Zeile)</td></tr></tbody></table>" +
      "<p>Alte Schreibweise (gleichwertig zu INNER JOIN): <code>FROM kunde k, bestellung b WHERE b.kunde_id = k.kunde_id</code> – ohne WHERE entsteht ein kartesisches Produkt. Bedingung für die rechte Tabelle bei LEFT JOIN in <code>ON</code> statt <code>WHERE</code>, sonst wird es wie ein INNER JOIN.</p>"),
    sec("sub", "Unterabfragen (Subqueries)",
      code("-- skalar: liefert genau einen Wert\nSELECT name, preis FROM artikel\nWHERE preis > (SELECT AVG(preis) FROM artikel);\n\n-- Liste mit IN\nSELECT name FROM kunde\nWHERE kunde_id IN (SELECT kunde_id FROM bestellung WHERE datum >= '2026-01-01');\n\n-- EXISTS / NOT EXISTS (korreliert: bezieht sich auf die äußere Zeile)\nSELECT k.name FROM kunde k\nWHERE NOT EXISTS (SELECT 1 FROM bestellung b WHERE b.kunde_id = k.kunde_id);\n\n-- korreliert: teuerster Artikel je Kategorie\nSELECT a.name, a.preis FROM artikel a\nWHERE a.preis = (SELECT MAX(a2.preis) FROM artikel a2 WHERE a2.kategorie_id = a.kategorie_id);\n\n-- in FROM (abgeleitete Tabelle, Alias Pflicht)\nSELECT AVG(anzahl) FROM\n  (SELECT kunde_id, COUNT(*) AS anzahl FROM bestellung GROUP BY kunde_id) AS t;") +
      "<ul><li><b>Falle:</b> <code>NOT IN (…)</code> liefert <b>keine</b> Zeile, sobald die Unterabfrage ein NULL enthält → <code>NOT EXISTS</code> oder <code>WHERE … IS NOT NULL</code> in der Unterabfrage.</li><li><code>&gt; ALL (…)</code> = größer als jeder Wert, <code>&gt; ANY (…)</code> = größer als mindestens einer (nicht in SQLite).</li></ul>"),
    sec("set", "Mengenoperationen",
      code("SELECT ort FROM kunde\nUNION            -- vereinigt, entfernt Duplikate (UNION ALL behält sie)\nSELECT ort FROM lieferant;\n\nSELECT ort FROM kunde INTERSECT SELECT ort FROM lieferant;  -- Schnittmenge\nSELECT ort FROM kunde EXCEPT    SELECT ort FROM lieferant;  -- Differenz (Oracle: MINUS)") +
      "<p>Beide SELECTs brauchen gleich viele Spalten mit kompatiblen Datentypen; ORDER BY nur einmal am Ende.</p>"),
    sec("func", "Funktionen: CASE, NULL, Text, Zahl, Datum",
      code("SELECT name,\n  CASE WHEN umsatz >= 10000 THEN 'A'\n       WHEN umsatz >= 5000  THEN 'B'\n       ELSE 'C' END AS klasse,\n  COALESCE(telefon, 'unbekannt') AS tel      -- erster Nicht-NULL-Wert\nFROM kunde;") +
      "<table class='list'><thead><tr><th>Zweck</th><th>SQLite (Lerntool)</th><th>MySQL / MariaDB</th></tr></thead><tbody>" +
      "<tr><td>NULL ersetzen</td><td><code>COALESCE(a,b)</code>, <code>IFNULL(a,b)</code></td><td>gleich</td></tr>" +
      "<tr><td>Text verketten</td><td><code>vorname || ' ' || name</code></td><td><code>CONCAT(vorname, ' ', name)</code></td></tr>" +
      "<tr><td>Groß/klein, Länge</td><td><code>UPPER(x) LOWER(x) LENGTH(x)</code></td><td>gleich (<code>CHAR_LENGTH</code>)</td></tr>" +
      "<tr><td>Teilstring</td><td><code>SUBSTR(x, start, länge)</code></td><td><code>SUBSTRING(x, start, länge)</code></td></tr>" +
      "<tr><td>Leerzeichen entfernen</td><td><code>TRIM(x)</code></td><td>gleich</td></tr>" +
      "<tr><td>Runden / Betrag</td><td><code>ROUND(x, 2)</code>, <code>ABS(x)</code></td><td>gleich, dazu <code>CEIL FLOOR</code></td></tr>" +
      "<tr><td>Heute</td><td><code>DATE('now')</code></td><td><code>CURDATE()</code>, <code>NOW()</code></td></tr>" +
      "<tr><td>Jahr / Monat</td><td><code>strftime('%Y', datum)</code>, <code>strftime('%m', datum)</code></td><td><code>YEAR(datum)</code>, <code>MONTH(datum)</code></td></tr>" +
      "<tr><td>Datum + 30 Tage</td><td><code>DATE(datum, '+30 days')</code></td><td><code>DATE_ADD(datum, INTERVAL 30 DAY)</code></td></tr>" +
      "<tr><td>Tage zwischen</td><td><code>julianday(b) - julianday(a)</code></td><td><code>DATEDIFF(b, a)</code></td></tr>" +
      "<tr><td>Typumwandlung</td><td><code>CAST(x AS INTEGER)</code></td><td>gleich</td></tr></tbody></table>" +
      "<p>Datumsvergleich mit Text im Format <code>'YYYY-MM-DD'</code> funktioniert, weil er sich lexikografisch richtig sortiert: <code>WHERE datum BETWEEN '2026-01-01' AND '2026-12-31'</code>.</p>"),
    sec("win", "Fensterfunktionen (Ranking)",
      code("SELECT name, abteilung, gehalt,\n  RANK()       OVER (PARTITION BY abteilung ORDER BY gehalt DESC) AS platz,\n  ROW_NUMBER() OVER (ORDER BY gehalt DESC) AS nr,\n  SUM(gehalt)  OVER (PARTITION BY abteilung) AS summe_abt\nFROM mitarbeiter;") +
      "<p>Wie Aggregat, aber ohne Zeilen zusammenzufassen. RANK lässt bei Gleichstand Plätze aus (1,1,3), DENSE_RANK nicht (1,1,2).</p>"),
    sec("dml", "DML – INSERT, UPDATE, DELETE",
      code("INSERT INTO kunde (kunde_id, name, ort) VALUES (101, 'Müller GmbH', 'Köln');\nINSERT INTO kunde (name, ort) VALUES ('A', 'Bonn'), ('B', 'Kiel');   -- mehrere Zeilen\nINSERT INTO archiv (id, name) SELECT kunde_id, name FROM kunde WHERE aktiv = 0;\n\nUPDATE artikel SET preis = preis * 1.05, geaendert = '2026-11-01'\nWHERE kategorie_id = 3;\n\nUPDATE artikel SET preis = preis * 0.9\nWHERE artikel_id IN (SELECT artikel_id FROM position GROUP BY artikel_id HAVING SUM(menge) < 5);\n\nDELETE FROM bestellung WHERE datum < '2020-01-01';") +
      "<ul><li><b>Ohne WHERE</b> betreffen UPDATE/DELETE <b>alle</b> Zeilen!</li><li>Spaltenliste bei INSERT angeben – Werte in derselben Reihenfolge; fehlende Spalten erhalten DEFAULT bzw. NULL.</li><li>Löschen mit Fremdschlüsseln: erst abhängige Datensätze (Kind), dann Eltern – oder <code>ON DELETE CASCADE</code>.</li><li><code>TRUNCATE TABLE t</code> (MySQL) leert die Tabelle komplett.</li></ul>"),
    sec("ddl", "DDL – CREATE, ALTER, DROP",
      code("CREATE TABLE bestellung (\n  bestell_id  INTEGER       PRIMARY KEY,           -- MySQL: INT AUTO_INCREMENT PRIMARY KEY\n  kunde_id    INTEGER       NOT NULL,\n  datum       DATE          NOT NULL DEFAULT CURRENT_DATE,\n  status      VARCHAR(20)   DEFAULT 'offen',\n  betrag      DECIMAL(10,2) CHECK (betrag >= 0),\n  rechnung_nr VARCHAR(20)   UNIQUE,\n  FOREIGN KEY (kunde_id) REFERENCES kunde(kunde_id)\n    ON DELETE CASCADE ON UPDATE CASCADE\n);\n\n-- zusammengesetzter Primärschlüssel (n:m-Zwischentabelle)\nCREATE TABLE belegung (\n  schueler_id INTEGER REFERENCES schueler(schueler_id),\n  kurs_id     INTEGER REFERENCES kurs(kurs_id),\n  note        INTEGER CHECK (note BETWEEN 1 AND 6),\n  PRIMARY KEY (schueler_id, kurs_id)\n);\n\nALTER TABLE kunde ADD COLUMN email VARCHAR(100);\nALTER TABLE kunde DROP COLUMN fax;                 -- SQLite ab 3.35\nALTER TABLE kunde RENAME COLUMN tel TO telefon;\nALTER TABLE kunde MODIFY email VARCHAR(150);       -- nur MySQL (SQL Server: ALTER COLUMN)\nALTER TABLE kunde RENAME TO kunden;\nDROP TABLE [IF EXISTS] alt;\n\nCREATE [UNIQUE] INDEX idx_kunde_name ON kunde(name);\nDROP INDEX idx_kunde_name;\n\nCREATE VIEW v_umsatz AS\n  SELECT kunde_id, SUM(betrag) AS umsatz FROM bestellung GROUP BY kunde_id;\nDROP VIEW v_umsatz;") +
      "<p><b>FK-Optionen:</b> <code>ON DELETE {CASCADE | SET NULL | RESTRICT | NO ACTION | SET DEFAULT}</code>. Constraint benennen: <code>CONSTRAINT fk_best_kunde FOREIGN KEY (…) REFERENCES …</code>. SQLite prüft FKs nur mit <code>PRAGMA foreign_keys = ON;</code></p>"),
    sec("types", "Datentypen",
      "<table class='list'><tbody>" +
      "<tr><td><code>INTEGER / INT, SMALLINT, BIGINT</code></td><td>Ganzzahl</td></tr>" +
      "<tr><td><code>DECIMAL(p,s) / NUMERIC(p,s)</code></td><td>Festkomma: p Stellen gesamt, s Nachkomma – für Geld, z. B. <code>DECIMAL(10,2)</code></td></tr>" +
      "<tr><td><code>FLOAT, DOUBLE, REAL</code></td><td>Gleitkomma (Rundungsfehler – nicht für Geld)</td></tr>" +
      "<tr><td><code>CHAR(n)</code></td><td>Text fester Länge (z. B. PLZ <code>CHAR(5)</code>)</td></tr>" +
      "<tr><td><code>VARCHAR(n)</code></td><td>Text variabler Länge bis n Zeichen</td></tr>" +
      "<tr><td><code>TEXT</code></td><td>langer Text</td></tr>" +
      "<tr><td><code>DATE, TIME, DATETIME / TIMESTAMP</code></td><td>Datum <code>'2026-11-25'</code>, Uhrzeit, Zeitpunkt</td></tr>" +
      "<tr><td><code>BOOLEAN</code></td><td>wahr/falsch (MySQL: <code>TINYINT(1)</code>, SQLite: 0/1)</td></tr>" +
      "<tr><td><code>BLOB</code></td><td>Binärdaten</td></tr></tbody></table>"),
    sec("dcl", "DCL – Rechte (GRANT / REVOKE)",
      code("CREATE USER 'azubi'@'localhost' IDENTIFIED BY 'geheim';     -- MySQL\nCREATE ROLE vertrieb;\nGRANT SELECT, INSERT ON shop.kunde TO vertrieb;\nGRANT vertrieb TO 'azubi'@'localhost';\nGRANT ALL PRIVILEGES ON shop.* TO admin WITH GRANT OPTION;\nGRANT SELECT ON v_umsatz TO controlling;              -- Rechte auf eine View\nREVOKE INSERT ON shop.kunde FROM vertrieb;") +
      "<p>Rechte: <code>SELECT, INSERT, UPDATE [(spalten)], DELETE, CREATE, ALTER, DROP, ALL</code>. Prinzip der minimalen Rechte; Views schränken sichtbare Spalten/Zeilen ein. (In SQLite gibt es kein GRANT.)</p>"),
    sec("tcl", "Transaktionen (TCL) & ACID",
      code("BEGIN TRANSACTION;            -- MySQL: START TRANSACTION;\nUPDATE konto SET saldo = saldo - 100 WHERE konto_id = 1;\nUPDATE konto SET saldo = saldo + 100 WHERE konto_id = 2;\nCOMMIT;                       -- dauerhaft speichern\n-- bei Fehler stattdessen:\nROLLBACK;                     -- alles seit BEGIN zurücknehmen\n\nSAVEPOINT sp1;  …  ROLLBACK TO sp1;  RELEASE sp1;") +
      "<p><b>ACID:</b> Atomarität (ganz oder gar nicht) · Konsistenz (Regeln bleiben erfüllt) · Isolation (parallele Transaktionen stören sich nicht) · Dauerhaftigkeit (nach COMMIT gespeichert).</p>" +
      "<p><b>Isolationsprobleme:</b> Dirty Read, Non-Repeatable Read, Phantom Read, Lost Update. Isolationsstufen: READ UNCOMMITTED → READ COMMITTED → REPEATABLE READ → SERIALIZABLE.</p>"),
    sec("trig", "Trigger & gespeicherte Prozeduren",
      code("CREATE TRIGGER trg_lager AFTER INSERT ON position\nFOR EACH ROW\nBEGIN\n  UPDATE artikel SET bestand = bestand - NEW.menge WHERE artikel_id = NEW.artikel_id;\nEND;\n\n-- MySQL: gespeicherte Prozedur\nDELIMITER //\nCREATE PROCEDURE preis_erhoehen(IN kat INT, IN faktor DECIMAL(4,2))\nBEGIN\n  UPDATE artikel SET preis = preis * faktor WHERE kategorie_id = kat;\nEND //\nDELIMITER ;\nCALL preis_erhoehen(3, 1.05);") +
      "<p>Im Trigger: <code>NEW.spalte</code> (neuer Wert, INSERT/UPDATE), <code>OLD.spalte</code> (alter Wert, UPDATE/DELETE). Zeitpunkt <code>BEFORE | AFTER</code>, Ereignis <code>INSERT | UPDATE | DELETE</code>.</p>"),
    sec("sicher", "Sicherheit: SQL-Injection & Prepared Statements",
      code("-- unsicher (Benutzereingabe wird in den SQL-Text geklebt):\n\"SELECT * FROM user WHERE name = '\" + eingabe + \"'\"      -- Eingabe: ' OR '1'='1\n\n-- sicher: Platzhalter, Werte werden getrennt übergeben\nPreparedStatement ps = con.prepareStatement(\"SELECT * FROM user WHERE name = ?\");\nps.setString(1, eingabe);\nResultSet rs = ps.executeQuery();") +
      "<p>Dazu: Eingaben validieren, minimale DB-Rechte für die Anwendung, Passwörter nur gehasht (bcrypt/Argon2) speichern.</p>"),
    sec("fallen", "Typische Prüfungsfallen",
      "<ul><li><code>WHERE COUNT(*) &gt; 3</code> ✗ → <code>HAVING COUNT(*) &gt; 3</code> ✓</li>" +
      "<li><code>= NULL</code> ✗ → <code>IS NULL</code> ✓; <code>&lt;&gt; 'x'</code> findet keine NULL-Zeilen</li>" +
      "<li>Spalte im SELECT, aber nicht im GROUP BY (und nicht aggregiert) ✗</li>" +
      "<li>„alle Kunden, auch ohne Bestellung“ → <b>LEFT</b> JOIN + <code>COUNT(b.id)</code></li>" +
      "<li>„der teuerste Artikel“ bei Gleichstand: <code>WHERE preis = (SELECT MAX(preis) …)</code> statt <code>ORDER BY … LIMIT 1</code></li>" +
      "<li>JOIN-Bedingung vergessen → kartesisches Produkt (Zeilenanzahl = Produkt beider Tabellen)</li>" +
      "<li>Mehrdeutige Spalte bei JOIN → mit Tabellen-Alias qualifizieren: <code>k.kunde_id</code></li>" +
      "<li>DISTINCT vergessen, wenn durch JOIN Duplikate entstehen</li>" +
      "<li>UPDATE/DELETE ohne WHERE</li>" +
      "<li>Text ohne Anführungszeichen bzw. doppelte statt einfache Anführungszeichen</li></ul>"),
  ];

  /** HTML des Syntax-Beiblatts mit Inhaltsverzeichnis */
  UI.sqlRefHtml = function () {
    return '<p class="small muted">Anlage: SQL-Syntax. Notation: <code>[ ]</code> optional, <code>{ a | b }</code> Auswahl, <code>…</code> Wiederholung. Beispiele laufen im Lerntool (SQLite); Abweichungen zu MySQL sind markiert.</p>' +
      '<input class="input bbsearch" type="search" placeholder="Im SQL-Beiblatt suchen, z. B. HAVING, LEFT JOIN, Datum …" aria-label="SQL-Beiblatt durchsuchen">' +
      '<nav class="bbnav">' + UI.SQL_REF.map(function (s) { return '<a href="#ref-' + s.id + '" data-bbjump="ref-' + s.id + '">' + s.title.split(/[–(,&]/)[0].trim() + "</a>"; }).join("") + "</nav>" +
      UI.SQL_REF.map(function (s) { return '<section class="bbtable bbref" id="ref-' + s.id + '"><h3>' + s.title + "</h3>" + s.body + "</section>"; }).join("");
  };
})(typeof window !== "undefined" ? window : globalThis);
