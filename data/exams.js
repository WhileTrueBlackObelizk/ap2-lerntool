// Prüfungssimulationen AP2 FIAE (GA1, GA2, WiSo) – Format siehe SCHEMA.md, Abschnitt Exam.
// Jede Simulation steht in einer eigenen IIFE, damit lokale Konstanten (z. B. wiederverwendete Tabellen) nicht global kollidieren.
window.AP2 = window.AP2 || { topics: [], questions: [], exams: [], generators: [] };

/* =====================================================================
   GA1 – Simulation 1: Fahrradverleih VeloRegio GmbH
   ===================================================================== */
(function () {
  const NETZPLAN = `<p>Für das Projekt „VeloGo“ wurden folgende Vorgänge geplant (Dauer in Arbeitstagen):</p>
<table>
<tr><th>Vorgang</th><th>Beschreibung</th><th>Dauer</th><th>Vorgänger</th></tr>
<tr><td>A</td><td>Anforderungsanalyse / Pflichtenheft</td><td>5</td><td>–</td></tr>
<tr><td>B</td><td>UI-/UX-Design der App</td><td>4</td><td>A</td></tr>
<tr><td>C</td><td>Entwicklung Backend-API</td><td>8</td><td>A</td></tr>
<tr><td>D</td><td>Datenbankentwurf und -einrichtung</td><td>3</td><td>A</td></tr>
<tr><td>E</td><td>Entwicklung App-Frontend</td><td>6</td><td>B, D</td></tr>
<tr><td>F</td><td>Anbindung Zahlungsdienstleister</td><td>4</td><td>C</td></tr>
<tr><td>G</td><td>Integration und Systemtest</td><td>5</td><td>E, F</td></tr>
<tr><td>H</td><td>Schulung und Rollout</td><td>2</td><td>G</td></tr>
</table>
<p>Die Vorgänge sind durch Normalfolgen (Ende-Anfang-Beziehungen) verknüpft, das Projekt beginnt zum Zeitpunkt 0.</p>`;

  const NETZPLAN_LOESUNG = `<table>
<tr><th>Vorgang</th><th>Dauer</th><th>FAZ</th><th>FEZ</th><th>SAZ</th><th>SEZ</th><th>GP</th><th>FP</th></tr>
<tr><td>A</td><td>5</td><td>0</td><td>5</td><td>0</td><td>5</td><td>0</td><td>0</td></tr>
<tr><td>B</td><td>4</td><td>5</td><td>9</td><td>7</td><td>11</td><td>2</td><td>0</td></tr>
<tr><td>C</td><td>8</td><td>5</td><td>13</td><td>5</td><td>13</td><td>0</td><td>0</td></tr>
<tr><td>D</td><td>3</td><td>5</td><td>8</td><td>8</td><td>11</td><td>3</td><td>1</td></tr>
<tr><td>E</td><td>6</td><td>9</td><td>15</td><td>11</td><td>17</td><td>2</td><td>2</td></tr>
<tr><td>F</td><td>4</td><td>13</td><td>17</td><td>13</td><td>17</td><td>0</td><td>0</td></tr>
<tr><td>G</td><td>5</td><td>17</td><td>22</td><td>17</td><td>22</td><td>0</td><td>0</td></tr>
<tr><td>H</td><td>2</td><td>22</td><td>24</td><td>22</td><td>24</td><td>0</td><td>0</td></tr>
</table>
<p>Vorwärtsrechnung: FAZ = größtes FEZ aller Vorgänger, FEZ = FAZ + Dauer. Rückwärtsrechnung: SEZ = kleinstes SAZ aller Nachfolger, SAZ = SEZ − Dauer. GP = SAZ − FAZ, FP = kleinstes FAZ der Nachfolger − FEZ.</p>`;

  const NUTZWERT = `<p>Für die Realisierung von „VeloGo“ werden drei Alternativen verglichen: <b>A</b> Eigenentwicklung durch die CodeWerk Solutions GmbH, <b>B</b> Miete der SaaS-Lösung „RentFlow“ eines Anbieters, <b>C</b> Anpassung einer Open-Source-Verleihsoftware. Bewertet wird mit Punkten von 1 (sehr schlecht) bis 10 (sehr gut).</p>
<table>
<tr><th>Kriterium</th><th>Gewichtung</th><th>A Punkte</th><th>B Punkte</th><th>C Punkte</th></tr>
<tr><td>Funktionsumfang</td><td>30 %</td><td>9</td><td>8</td><td>6</td></tr>
<tr><td>Kosten</td><td>25 %</td><td>4</td><td>9</td><td>7</td></tr>
<tr><td>Anpassbarkeit</td><td>20 %</td><td>10</td><td>4</td><td>8</td></tr>
<tr><td>Datenschutz / Hosting in der EU</td><td>15 %</td><td>9</td><td>6</td><td>8</td></tr>
<tr><td>Support</td><td>10 %</td><td>6</td><td>9</td><td>4</td></tr>
<tr><td><b>Nutzwert</b></td><td>100 %</td><td>7,65</td><td>?</td><td>6,75</td></tr>
</table>`;

  AP2.exams.push({
    id: "ga1-sim-1",
    part: "GA1",
    title: "Simulation GA1 #1 – Verleih-App „VeloGo“ für die VeloRegio GmbH",
    minutes: 90,
    scenario: `<p>Sie sind Mitarbeiterin bzw. Mitarbeiter der <b>CodeWerk Solutions GmbH</b> in Freiburg im Breisgau, eines IT-Dienstleisters mit 45 Beschäftigten, der Individualsoftware für mittelständische Kunden entwickelt.</p>
<p>Die <b>VeloRegio GmbH</b> betreibt in Südbaden 14 Verleihstationen mit insgesamt 420 Fahrrädern, davon 180 E-Bikes. Bisher werden Reservierungen telefonisch angenommen, Ausleihen an der Station auf Papier dokumentiert und bar oder per Karte bezahlt.</p>
<p>Die VeloRegio GmbH beauftragt Ihr Unternehmen mit der Entwicklung des Systems <b>„VeloGo“</b>:</p>
<ul>
<li>Kundinnen und Kunden registrieren sich per App, suchen freie Räder an einer Station, reservieren diese und leihen sie per QR-Code am Rahmenschloss aus.</li>
<li>Nach der Rückgabe an einer beliebigen Station wird bargeldlos über einen externen Zahlungsdienstleister abgerechnet.</li>
<li>Stationsmitarbeitende können Räder in die Wartung nehmen oder sperren.</li>
<li>Die Geschäftsführung wünscht Auswertungen zur Auslastung der Stationen.</li>
</ul>
<p>Sie sind Mitglied des Projektteams und bearbeiten die folgenden vier Aufgaben (Bearbeitungszeit 90 Minuten, 100 Punkte).</p>`,
    tasks: [
      // ---------- Aufgabe 1: Anforderungen und Projektplanung (25 P) ----------
      {
        id: "ga1-sim-1-1a", part: "GA1", topic: "ga1-anforderungen", type: "text", difficulty: 1, points: 4,
        question: `<b>Aufgabe 1 a)</b> Die VeloRegio GmbH hat Ihnen ein Lastenheft übergeben. Ihr Projektleiter beauftragt Sie mit der Erstellung des Pflichtenhefts. Erläutern Sie den Unterschied zwischen Lastenheft und Pflichtenheft hinsichtlich <i>Verfasser</i> und <i>Inhalt</i>.`,
        solution: `<ul>
<li><b>Lastenheft</b> (2 P): wird vom <b>Auftraggeber</b> (VeloRegio GmbH) erstellt. Es beschreibt die Gesamtheit der Anforderungen aus Kundensicht – <b>WAS</b> soll das System leisten und <b>WOFÜR</b> (z. B. Reservierung per App, bargeldlose Zahlung, Auswertungen).</li>
<li><b>Pflichtenheft</b> (2 P): wird vom <b>Auftragnehmer</b> (CodeWerk Solutions GmbH) auf Basis des Lastenhefts erstellt. Es beschreibt, <b>WIE und WOMIT</b> die Anforderungen umgesetzt werden (technische Lösung, Architektur, Schnittstellen, Plattformen). Nach Abnahme durch den Auftraggeber ist es verbindliche Grundlage für Realisierung und Abnahme.</li>
</ul>`,
        keywords: ["auftraggeber", "auftragnehmer", "was|wofür|wofuer", "wie|womit", "anforderung", "umsetzung|realisierung|technisch", "verbindlich|vertrag|abnahme"]
      },
      {
        id: "ga1-sim-1-1b", part: "GA1", topic: "ga1-anforderungen", type: "multi", difficulty: 2, points: 4,
        question: `<b>Aufgabe 1 b)</b> Kreuzen Sie an, welche der folgenden Anforderungen aus dem Lastenheft <b>nichtfunktionale</b> Anforderungen sind.`,
        options: [
          "Die App zeigt die freien Räder einer Station in Echtzeit an.",
          "Das Schloss wird nach dem Scannen des QR-Codes in höchstens 3 Sekunden entsperrt.",
          "Kundinnen und Kunden können eine Reservierung bis 15 Minuten vor Beginn kostenfrei stornieren.",
          "Das System ist zu mindestens 99,5 % eines Kalenderjahres verfügbar.",
          "Personenbezogene Daten werden ausschließlich auf Servern innerhalb der EU gespeichert.",
          "Stationsmitarbeitende können ein Rad als „in Wartung“ markieren."
        ],
        correct: [1, 3, 4],
        solution: `Nichtfunktional sind die Anforderungen an die <b>Qualität bzw. Rahmenbedingungen</b>: Antwortzeit ≤ 3 s (Leistungseffizienz), Verfügbarkeit 99,5 % (Zuverlässigkeit) und Speicherung in der EU (Sicherheit/Datenschutz, rechtliche Randbedingung). Die übrigen drei beschreiben, <b>was</b> das System tut (Funktionen) und sind damit funktional. Je richtig gesetztem bzw. richtig weggelassenem Kreuz anteilige Punkte.`
      },
      {
        id: "ga1-sim-1-1c", part: "GA1", topic: "ga1-anforderungen", type: "text", difficulty: 2, points: 5,
        question: `<b>Aufgabe 1 c)</b> Das Team arbeitet die Anforderungen zusätzlich als User Stories auf. Formulieren Sie <b>zwei</b> User Stories für „VeloGo“ aus Sicht <b>unterschiedlicher</b> Rollen im üblichen Standardformat und ergänzen Sie zu jeder User Story <b>ein</b> überprüfbares Akzeptanzkriterium.`,
        solution: `<p><b>Format:</b> „Als &lt;Rolle&gt; möchte ich &lt;Funktion&gt;, damit &lt;Nutzen&gt;.“ (je Story 1,5 P: Rolle, Funktion, Nutzen; je Akzeptanzkriterium 1 P)</p>
<ol>
<li><b>Story 1:</b> Als <i>Kundin</i> möchte ich ein E-Bike an einer Station für einen bestimmten Zeitraum reservieren, damit mir zum gewünschten Zeitpunkt sicher ein Rad zur Verfügung steht.<br><b>AK:</b> Gegeben ist ein freies E-Bike an Station „Freiburg Hbf“. Wenn ich es für 10:00–12:00 Uhr reserviere, dann wird es für diesen Zeitraum anderen Nutzern als „reserviert“ angezeigt und ich erhalte innerhalb einer Minute eine Bestätigung per Push-Nachricht.</li>
<li><b>Story 2:</b> Als <i>Stationsmitarbeiter</i> möchte ich ein defektes Rad sperren, damit es nicht an Kunden verliehen wird.<br><b>AK:</b> Ein gesperrtes Rad erscheint nicht mehr in der Suche nach freien Rädern und lässt sich per QR-Code nicht entsperren.</li>
</ol>
<p>Weitere Rollen: Geschäftsführung (Auslastungsbericht), Firmenkunde (Sammelrechnung). Akzeptanzkriterien müssen konkret und prüfbar sein (z. B. Given-When-Then).</p>`,
        keywords: ["als", "möchte ich|moechte ich", "damit", "akzeptanzkriterium|akzeptanz", "kunde|kundin", "mitarbeiter|geschäftsführung|geschaeftsfuehrung", "reservier|sperr|ausleih"]
      },
      {
        id: "ga1-sim-1-1d", part: "GA1", topic: "ga1-projektmanagement", type: "numeric", difficulty: 2, points: 5,
        context: NETZPLAN,
        question: `<b>Aufgabe 1 d)</b> Führen Sie für den Netzplan eine Vorwärts- und eine Rückwärtsrechnung durch und ermitteln Sie die <b>Gesamtdauer</b> des Projekts in Arbeitstagen.`,
        answer: 24, tolerance: 0, unit: "Tage",
        solution: `<p><b>Gesamtdauer: 24 Arbeitstage</b> (FEZ des letzten Vorgangs H).</p>${NETZPLAN_LOESUNG}<p>Punkte: Vorwärtsrechnung 2 P, Rückwärtsrechnung 2 P, Ergebnis 1 P.</p>`,
        explanation: "Typischer Fehler: Bei E wird FAZ = FEZ von D (8) statt des Maximums von B und D (9) genommen. Bei mehreren Vorgängern immer das Maximum der FEZ, bei mehreren Nachfolgern das Minimum der SAZ."
      },
      {
        id: "ga1-sim-1-1e", part: "GA1", topic: "ga1-projektmanagement", type: "numeric", difficulty: 2, points: 3,
        context: NETZPLAN,
        question: `<b>Aufgabe 1 e)</b> Berechnen Sie den <b>Gesamtpuffer</b> des Vorgangs D (Datenbankentwurf und -einrichtung).`,
        answer: 3, tolerance: 0, unit: "Tage",
        solution: `<p>D: FAZ = 5, FEZ = 8. Nachfolger ist nur E mit SAZ = 11 ⇒ SEZ(D) = 11, SAZ(D) = 11 − 3 = 8.</p><p><b>GP(D) = SAZ − FAZ = 8 − 5 = 3 Tage</b> (freier Puffer FP(D) = FAZ(E) − FEZ(D) = 9 − 8 = 1 Tag).</p>`
      },
      {
        id: "ga1-sim-1-1f", part: "GA1", topic: "ga1-projektmanagement", type: "text", difficulty: 3, points: 4,
        context: NETZPLAN,
        question: `<b>Aufgabe 1 f)</b> Nennen Sie den <b>kritischen Pfad</b> des Projekts und erläutern Sie, welche Auswirkung eine Verzögerung des Vorgangs B (UI-/UX-Design) um <b>3 Tage</b> auf das Projektende und auf den Nachfolger E hat.`,
        solution: `<ul>
<li><b>Kritischer Pfad</b> (2 P): <b>A → C → F → G → H</b> (alle Vorgänge mit Gesamtpuffer 0; 5 + 8 + 4 + 5 + 2 = 24 Tage).</li>
<li><b>Auswirkung</b> (2 P): B hat einen Gesamtpuffer von 2 Tagen, aber einen freien Puffer von 0. Die Verzögerung um 3 Tage verschiebt daher E sofort um 3 Tage (FAZ 12, FEZ 18). Da nur 2 Tage Gesamtpuffer vorhanden sind, verschiebt sich das <b>Projektende um 1 Tag auf 25 Arbeitstage</b>; E (und damit B) wird kritisch, der kritische Pfad verläuft nun A → B → E → G → H.</li>
</ul>`,
        keywords: ["a-c-f-g-h|a, c, f, g, h|acfgh|a → c → f → g → h|a->c->f->g->h", "gesamtpuffer|puffer", "1 tag|einen tag|25", "kritisch", "e"]
      },
      // ---------- Aufgabe 2: Wirtschaftlichkeit (21 P) ----------
      {
        id: "ga1-sim-1-2a", part: "GA1", topic: "ga1-wirtschaftlichkeit", type: "numeric", difficulty: 2, points: 6,
        context: NUTZWERT,
        question: `<b>Aufgabe 2 a)</b> Berechnen Sie den <b>Nutzwert</b> der Alternative B (SaaS-Lösung „RentFlow“). Geben Sie das Ergebnis mit zwei Nachkommastellen an.`,
        answer: 7.25, tolerance: 0.01,
        solution: `<p>Nutzwert = Σ (Gewichtung × Punkte)</p>
<p>B: 0,30 · 8 + 0,25 · 9 + 0,20 · 4 + 0,15 · 6 + 0,10 · 9 = 2,40 + 2,25 + 0,80 + 0,90 + 0,90 = <b>7,25</b></p>
<p>Punkte: Teilnutzwerte 4 P, Summe 2 P.</p>`
      },
      {
        id: "ga1-sim-1-2b", part: "GA1", topic: "ga1-wirtschaftlichkeit", type: "mc", difficulty: 1, points: 2,
        context: NUTZWERT,
        question: `<b>Aufgabe 2 b)</b> Welche Entscheidung ist auf Grundlage der Nutzwertanalyse zu empfehlen?`,
        options: [
          "Alternative B, da sie beim höchstgewichteten Kostenkriterium die meisten Punkte erzielt.",
          "Alternative A, da sie mit 7,65 den höchsten Nutzwert erzielt.",
          "Alternative C, da sie bei keinem Kriterium unter 4 Punkten liegt.",
          "Alternative B, da ihr Nutzwert über 7,0 liegt.",
          "Keine, da eine Nutzwertanalyse nur bei gleichen Kosten aller Alternativen zulässig ist."
        ],
        correct: [1],
        solution: `Entscheidend ist der <b>gesamte gewichtete Nutzwert</b>: A 7,65 &gt; B 7,25 &gt; C 6,75. Empfohlen wird daher <b>Alternative A (Eigenentwicklung)</b>. Das Kostenkriterium ist mit 25 % nicht das höchstgewichtete (Funktionsumfang 30 %).`
      },
      {
        id: "ga1-sim-1-2c", part: "GA1", topic: "ga1-wirtschaftlichkeit", type: "numeric", difficulty: 2, points: 5,
        context: `<p>Kostenvergleich der Alternativen A und B:</p>
<table>
<tr><th></th><th>A Eigenentwicklung</th><th>B SaaS „RentFlow“</th></tr>
<tr><td>Einmalige Kosten</td><td>48.000,00 € (Entwicklung)</td><td>3.600,00 € (Einrichtung, Datenübernahme)</td></tr>
<tr><td>Laufende Kosten</td><td>600,00 € je Monat (Hosting, Wartung)</td><td>2.200,00 € je Monat (Lizenz für 420 Räder)</td></tr>
</table>`,
        question: `<b>Aufgabe 2 c)</b> Berechnen Sie, nach wie vielen Monaten die Gesamtkosten beider Alternativen gleich hoch sind (kritische Nutzungsdauer). Geben Sie das Ergebnis mit zwei Nachkommastellen an.`,
        answer: 27.75, tolerance: 0.01, unit: "Monate",
        solution: `<p>Ansatz: 48.000 + 600 · x = 3.600 + 2.200 · x</p>
<p>48.000 − 3.600 = (2.200 − 600) · x ⇒ 44.400 = 1.600 · x ⇒ <b>x = 27,75 Monate</b></p>
<p>Ab dem 28. Monat ist die Eigenentwicklung günstiger. Punkte: Ansatz 2 P, Umformung 2 P, Ergebnis 1 P.</p>`
      },
      {
        id: "ga1-sim-1-2d", part: "GA1", topic: "ga1-wirtschaftlichkeit", type: "text", difficulty: 1, points: 4,
        question: `<b>Aufgabe 2 d)</b> Die Geschäftsführung möchte nicht allein nach Kosten entscheiden. Nennen Sie <b>vier qualitative Kriterien</b>, die bei einer Make-or-Buy-Entscheidung berücksichtigt werden sollten.`,
        solution: `<p>Je Kriterium 1 P, z. B.:</p><ul>
<li>Abhängigkeit vom Anbieter (Vendor-Lock-in), Zukunftssicherheit des Anbieters</li>
<li>Anpassbarkeit/Flexibilität an eigene Prozesse (z. B. eigene Tarife)</li>
<li>Datenschutz und Datenhoheit (Speicherort, Zugriff)</li>
<li>Know-how-Aufbau bzw. Know-how-Verlust im eigenen Unternehmen</li>
<li>Zeit bis zur Einführung (Time-to-Market)</li>
<li>Integration in bestehende Systeme (Buchhaltung, Schlösser)</li>
<li>Qualität und Verfügbarkeit von Support/Wartung</li>
</ul>`,
        keywords: ["abhängigkeit|abhaengigkeit|lock-in", "anpassbar|flexib", "datenschutz|datenhoheit", "know-how|wissen", "zeit|time-to-market", "integration|schnittstelle", "support|wartung"]
      },
      {
        id: "ga1-sim-1-2e", part: "GA1", topic: "ga1-sicherheit", type: "text", difficulty: 2, points: 4,
        question: `<b>Aufgabe 2 e)</b> Bei der SaaS-Variante würden Kundendaten (Name, Anschrift, Zahlungsdaten, Standorte der Fahrten) beim Anbieter verarbeitet. Erläutern Sie, welche vertragliche Vereinbarung nach der DSGVO dafür erforderlich ist, und nennen Sie <b>zwei</b> wesentliche Inhalte dieser Vereinbarung.`,
        solution: `<p>Es ist ein <b>Vertrag zur Auftragsverarbeitung (AVV) nach Art. 28 DSGVO</b> abzuschließen (2 P): Der SaaS-Anbieter verarbeitet personenbezogene Daten im Auftrag und nach Weisung der VeloRegio GmbH, die Verantwortliche bleibt.</p>
<p>Inhalte (je 1 P), z. B.:</p><ul>
<li>Gegenstand, Dauer, Art und Zweck der Verarbeitung, Art der Daten und Kategorien betroffener Personen</li>
<li>Weisungsgebundenheit des Auftragsverarbeiters</li>
<li>Technische und organisatorische Maßnahmen (TOMs, Art. 32)</li>
<li>Vertraulichkeitsverpflichtung der eingesetzten Personen</li>
<li>Unterauftragsverhältnisse nur mit Genehmigung</li>
<li>Löschung bzw. Rückgabe der Daten nach Vertragsende, Kontroll- und Prüfrechte des Auftraggebers</li>
</ul>`,
        keywords: ["auftragsverarbeitung|avv|art. 28|artikel 28", "weisung", "tom|technische und organisatorische", "löschung|loeschung|rückgabe|rueckgabe", "unterauftrag", "zweck|dauer|gegenstand", "kontroll|prüfrecht|pruefrecht"]
      },
      // ---------- Aufgabe 3: UML und Datenmodell (28 P) ----------
      {
        id: "ga1-sim-1-3a", part: "GA1", topic: "ga1-uml", type: "text", difficulty: 2, points: 6,
        context: `<p>Aus einem Workshop liegt folgende Beschreibung vor:</p><ul>
<li>Kundinnen und Kunden können sich registrieren, ein Rad reservieren, ein Rad ausleihen und ein Rad zurückgeben.</li>
<li>Bei jeder Rückgabe wird <b>immer</b> die Bezahlung durchgeführt; daran ist der externe Zahlungsdienstleister beteiligt.</li>
<li>Bei der Ausleihe <b>kann</b> optional eine Diebstahlversicherung hinzugebucht werden.</li>
<li>Firmenkunden können alles, was Kunden können, und zusätzlich eine Sammelrechnung abrufen.</li>
<li>Stationsmitarbeitende können Räder sperren; die Geschäftsführung kann die Auslastung auswerten.</li>
</ul>`,
        question: `<b>Aufgabe 3 a)</b> Erstellen Sie ein UML-Anwendungsfalldiagramm (Use-Case-Diagramm) in Textnotation. Berücksichtigen Sie Systemgrenze, Akteure, Anwendungsfälle sowie die passenden Beziehungen (Assoziation, «include», «extend», Generalisierung).`,
        solution: `<pre><code>System "VeloGo" (Systemgrenze)
  UC1 Registrieren
  UC2 Rad reservieren
  UC3 Rad ausleihen
  UC4 Rad zurückgeben
  UC5 Bezahlen
  UC6 Versicherung hinzubuchen
  UC7 Sammelrechnung abrufen
  UC8 Rad sperren
  UC9 Auslastung auswerten

Akteure / Assoziationen:
  Kunde              —— UC1, UC2, UC3, UC4
  Firmenkunde  ──▷ Kunde   (Generalisierung: Firmenkunde erbt alle UCs)
  Firmenkunde        —— UC7
  Stationsmitarbeiter —— UC8
  Geschäftsführung   —— UC9
  Zahlungsdienstleister (externes System, rechts) —— UC5

Beziehungen zwischen Anwendungsfällen:
  UC4 Rad zurückgeben ‑‑«include»‑‑&gt; UC5 Bezahlen
  UC6 Versicherung hinzubuchen ‑‑«extend»‑‑&gt; UC3 Rad ausleihen</code></pre>
<p>Punkte: Systemgrenze und Anwendungsfälle 1,5 P, Akteure mit Assoziationen 1,5 P, «include» richtig gerichtet 1 P, «extend» richtig gerichtet (vom erweiternden zum Basisfall) 1 P, Generalisierung 1 P.</p>`,
        keywords: ["include", "extend", "generalisierung|erbt", "systemgrenze|system", "zahlungsdienstleister", "bezahlen", "firmenkunde", "akteur"]
      },
      {
        id: "ga1-sim-1-3b", part: "GA1", topic: "ga1-uml", type: "text", difficulty: 3, points: 8,
        context: `<p>Ein Kollege hat folgenden Ausschnitt eines Klassendiagramms in Textnotation begonnen:</p>
<pre><code>Klasse Station
  - stationId : int
  - bezeichnung : String
  - adresse : String
  + freieRaeder() : List&lt;Fahrrad&gt;

Klasse Fahrrad
  - rahmennummer : String
  - status : RadStatus
  + sperren() : void

Klasse Kunde
  - kundenNr : int
  - name : String
  - email : String</code></pre>`,
        question: `<b>Aufgabe 3 b)</b> Ergänzen Sie das Klassendiagramm in Textnotation um
<ol>
<li>eine Klasse <code>EBike</code>, die von <code>Fahrrad</code> erbt und den Akkustand in Prozent speichert,</li>
<li>eine Aufzählung <code>RadStatus</code> mit den Werten FREI, RESERVIERT, VERLIEHEN, WARTUNG,</li>
<li>eine Klasse <code>Ausleihe</code> mit Beginn, Ende, Preis und einer Methode zur Preisberechnung,</li>
<li>alle Assoziationen mit Multiplizitäten: Eine Station verwaltet beliebig viele Fahrräder, ein Fahrrad ist höchstens einer Station zugeordnet (während einer Fahrt keiner). Eine Ausleihe betrifft genau ein Fahrrad und genau einen Kunden; Kunden und Fahrräder können beliebig viele Ausleihen haben. Eine Ausleihe beginnt an genau einer Station und endet an höchstens einer Station.</li>
</ol>
Geben Sie Sichtbarkeiten und Datentypen an.`,
        solution: `<pre><code>Klasse EBike  erbt von Fahrrad        (Generalisierung: EBike ——▷ Fahrrad)
  - akkustand : int        // 0..100 %

«enumeration» RadStatus
  FREI
  RESERVIERT
  VERLIEHEN
  WARTUNG

Klasse Ausleihe
  - beginn : DateTime
  - ende : DateTime        // null, solange nicht zurückgegeben
  - preis : double
  + berechnePreis() : double

Assoziationen (Multiplizitäten):
  Station  "0..1" ——— "0..*"  Fahrrad        (verwaltet)
  Kunde    "1"    ——— "0..*"  Ausleihe       (tätigt)
  Fahrrad  "1"    ——— "0..*"  Ausleihe       (betrifft)
  Station  "1"    ——— "0..*"  Ausleihe       (Startstation)
  Station  "0..1" ——— "0..*"  Ausleihe       (Zielstation)
  Fahrrad  ———&gt; RadStatus   (Attributtyp)</code></pre>
<p>Punkte: EBike mit Generalisierung 1,5 P; Enumeration 1,5 P; Klasse Ausleihe mit Attributen/Methode 2 P; Assoziationen und Multiplizitäten 3 P (je korrekter Assoziation 0,5–1 P).</p>`,
        explanation: "Die Multiplizität steht immer an dem Ende, dessen Anzahl beschrieben wird: „ein Fahrrad ist höchstens einer Station zugeordnet“ ⇒ 0..1 steht an der Station.",
        keywords: ["erbt|generalisierung|extends", "enumeration|enum", "akkustand", "berechnepreis", "0..1", "0..*|*", "1", "ausleihe"]
      },
      {
        id: "ga1-sim-1-3c", part: "GA1", topic: "ga1-datenmodell", type: "text", difficulty: 2, points: 7,
        question: `<b>Aufgabe 3 c)</b> Überführen Sie die Klassen <code>Station</code>, <code>Fahrrad</code>, <code>EBike</code>, <code>Kunde</code> und <code>Ausleihe</code> aus Aufgabe 3 b) in ein <b>Relationenmodell</b>. Kennzeichnen Sie Primärschlüssel (PK) und Fremdschlüssel (FK). Die Vererbung soll mit <b>einer einzigen Tabelle</b> für alle Fahrräder (Single-Table-Strategie) abgebildet werden.`,
        solution: `<pre><code>Station  (PK station_id, bezeichnung, adresse)
Fahrrad  (PK rahmennummer, typ, status, akkustand, FK station_id → Station)
           -- typ: 'STANDARD' | 'EBIKE'; akkustand nur bei E-Bikes gefüllt (sonst NULL)
           -- station_id NULL, solange das Rad unterwegs ist
Kunde    (PK kunden_nr, name, email)
Ausleihe (PK ausleihe_id, beginn, ende, preis,
          FK kunden_nr → Kunde, FK rahmennummer → Fahrrad,
          FK start_station_id → Station, FK ziel_station_id → Station)</code></pre>
<p>Punkte: Station/Kunde 1 P; Fahrrad mit Typ-Diskriminator und nullbarem Akkustand 2 P; Ausleihe mit vier Fremdschlüsseln 3 P; korrekte Kennzeichnung PK/FK 1 P.</p>`,
        keywords: ["primärschlüssel|primaerschluessel|pk", "fremdschlüssel|fremdschluessel|fk", "station_id|stationid", "rahmennummer", "kunden_nr|kundennr", "typ|diskriminator", "start", "ziel"]
      },
      {
        id: "ga1-sim-1-3d", part: "GA1", topic: "ga1-datenmodell", type: "text", difficulty: 2, points: 4,
        context: `<p>Die bisherige Excel-Liste „Ausleihprotokoll“ soll in eine Datenbank übernommen werden (Primärschlüssel: AusleihNr):</p>
<table>
<tr><th>AusleihNr</th><th>Datum</th><th>KundenNr</th><th>KundenName</th><th>KundenEmail</th><th>Rahmennr</th><th>Radtyp</th><th>StationsNr</th><th>StationsName</th></tr>
<tr><td>1001</td><td>2026-06-03</td><td>17</td><td>Maier, Lena</td><td>l.maier@web.de</td><td>FR-0815</td><td>E-Bike</td><td>3</td><td>Freiburg Hbf</td></tr>
<tr><td>1002</td><td>2026-06-03</td><td>17</td><td>Maier, Lena</td><td>l.maier@web.de</td><td>FR-0420</td><td>Trekking</td><td>5</td><td>Titisee</td></tr>
<tr><td>1003</td><td>2026-06-04</td><td>23</td><td>Öztürk, Can</td><td>can.oe@gmx.de</td><td>FR-0815</td><td>E-Bike</td><td>3</td><td>Freiburg Hbf</td></tr>
</table>`,
        question: `<b>Aufgabe 3 d)</b> Geben Sie an, in welcher Normalform sich die Tabelle befindet, begründen Sie Ihre Antwort und erläutern Sie das Problem anhand einer konkreten Anomalie.`,
        solution: `<ul>
<li><b>Normalform</b> (2 P): Die Tabelle ist in der <b>2. NF, aber nicht in der 3. NF</b>. Alle Attribute sind atomar (1. NF); da der Primärschlüssel aus nur einem Attribut (AusleihNr) besteht, kann es keine partiellen Abhängigkeiten geben (2. NF). Es bestehen jedoch <b>transitive Abhängigkeiten</b> über Nichtschlüsselattribute: KundenNr → KundenName, KundenEmail; Rahmennr → Radtyp; StationsNr → StationsName.</li>
<li><b>Anomalie</b> (2 P), z. B. <b>Änderungsanomalie</b>: Ändert Frau Maier ihre E-Mail-Adresse, muss diese in allen ihren Ausleihzeilen geändert werden; wird eine Zeile vergessen, ist der Datenbestand inkonsistent. Alternativ <b>Einfügeanomalie</b> (eine neue Station kann erst mit einer Ausleihe erfasst werden) oder <b>Löschanomalie</b> (Löschen der einzigen Ausleihe eines Kunden löscht auch dessen Daten).</li>
</ul>`,
        keywords: ["2. nf|zweite normalform|2nf", "3. nf|dritte normalform|3nf", "transitiv", "anomalie", "änderung|aenderung|update|einfüge|einfuege|lösch|loesch", "redundan|inkonsisten"]
      },
      {
        id: "ga1-sim-1-3e", part: "GA1", topic: "ga1-uml", type: "mc", difficulty: 2, points: 3,
        question: `<b>Aufgabe 3 e)</b> Zwischen <code>Ausleihe</code> (Ganzes) und <code>Zahlung</code> (Teil) soll eine <b>Komposition</b> modelliert werden. Welche Aussage ist korrekt?`,
        options: [
          "Wird eine Ausleihe gelöscht, existiert die zugehörige Zahlung als eigenständiges Objekt weiter.",
          "Eine Zahlung kann gleichzeitig Teil mehrerer Ausleihen sein.",
          "Die Lebensdauer der Zahlung ist an die Ausleihe gebunden; die Zahlung gehört zu genau einer Ausleihe.",
          "Die Komposition wird mit einer leeren (weißen) Raute auf der Seite des Teils dargestellt.",
          "Komposition und Generalisierung sind in UML gleichbedeutend."
        ],
        correct: [2],
        solution: `Bei der <b>Komposition</b> (gefüllte Raute am <i>Ganzen</i>) ist das Teil existenzabhängig vom Ganzen und gehört zu genau einem Ganzen (Multiplizität am Ganzen 1). Wird die Ausleihe gelöscht, wird auch die Zahlung gelöscht. Die leere Raute kennzeichnet die Aggregation.`
      },
      // ---------- Aufgabe 4: Ergonomie, Sicherheit, Test, Architektur (26 P) ----------
      {
        id: "ga1-sim-1-4a", part: "GA1", topic: "ga1-ergonomie", type: "text", difficulty: 2, points: 6,
        context: `<p>Bei einem Usability-Test des App-Prototyps wurden folgende Mängel festgestellt:</p><ol>
<li>Im Reservierungsformular muss das Datum im Format JJJJ-MM-TT eingetippt werden. Bei falscher Eingabe erscheint „Error 422“ und alle bisherigen Eingaben sind gelöscht.</li>
<li>Nach dem Scannen des QR-Codes kann der Ausleihvorgang nicht mehr abgebrochen werden.</li>
<li>Die Schaltfläche zum Beenden der Ausleihe befindet sich je nach Bildschirm mal oben rechts, mal unten links und heißt einmal „Rückgabe“, einmal „Fahrt beenden“.</li>
</ol>`,
        question: `<b>Aufgabe 4 a)</b> Ordnen Sie jedem Mangel einen verletzten <b>Interaktionsgrundsatz nach DIN EN ISO 9241-110</b> zu und beschreiben Sie jeweils eine Verbesserung.`,
        solution: `<table>
<tr><th>Mangel</th><th>Grundsatz (je 1 P)</th><th>Verbesserung (je 1 P)</th></tr>
<tr><td>1</td><td><b>Robustheit gegen Benutzerfehler</b> (früher Fehlertoleranz); auch Selbstbeschreibungsfähigkeit vertretbar</td><td>Datumsauswahl per Kalender-Widget, Eingaben bei Fehler erhalten, verständliche Fehlermeldung mit Hinweis auf das erwartete Format</td></tr>
<tr><td>2</td><td><b>Steuerbarkeit</b></td><td>„Abbrechen“-Schaltfläche bis zur Entsperrung des Schlosses, ggf. Abbruch innerhalb der ersten Minute kostenfrei</td></tr>
<tr><td>3</td><td><b>Erwartungskonformität</b> (Konsistenz)</td><td>Einheitliche Position und einheitliche Beschriftung der Schaltfläche auf allen Bildschirmen (Styleguide)</td></tr>
</table>`,
        keywords: ["robustheit|fehlertoleranz", "steuerbarkeit", "erwartungskonformität|erwartungskonformitaet|konsisten", "abbrechen|abbruch", "kalender|datepicker|auswahl", "einheitlich"]
      },
      {
        id: "ga1-sim-1-4b", part: "GA1", topic: "ga1-sicherheit", type: "text", difficulty: 2, points: 4,
        question: `<b>Aufgabe 4 b)</b> Ein Entwickler schlägt vor, die Passwörter der Kundenkonten als MD5-Hash in der Datenbank zu speichern. Beurteilen Sie diesen Vorschlag und beschreiben Sie ein sicheres Verfahren zur Speicherung von Passwörtern.`,
        solution: `<ul>
<li><b>Beurteilung</b> (2 P): MD5 ist ungeeignet. Es ist sehr schnell berechenbar (Brute-Force/Wörterbuchangriffe mit GPUs), kryptografisch gebrochen (Kollisionen) und ohne Salt anfällig für Rainbow Tables; gleiche Passwörter ergeben gleiche Hashes.</li>
<li><b>Sicheres Verfahren</b> (2 P): Verwendung einer speziellen, absichtlich langsamen Passwort-Hashfunktion wie <b>Argon2id</b>, <b>bcrypt</b> oder <b>scrypt</b> mit einem <b>individuellen, zufälligen Salt</b> je Passwort und einstellbarem Kosten-/Arbeitsfaktor; optional zusätzlich ein geheimer Pepper. Beim Login wird das eingegebene Passwort mit demselben Salt gehasht und mit dem gespeicherten Hash verglichen. Passwörter werden nie im Klartext oder umkehrbar verschlüsselt gespeichert.</li>
</ul>`,
        keywords: ["salt", "argon2|bcrypt|scrypt|pbkdf2", "langsam|kostenfaktor|arbeitsfaktor|work factor", "rainbow|brute|wörterbuch|woerterbuch", "unsicher|gebrochen|kollision|schnell", "hash"]
      },
      {
        id: "ga1-sim-1-4c", part: "GA1", topic: "ga1-qualitaet", type: "text", difficulty: 3, points: 8,
        context: `<p>Die Methode <code>pruefeReservierung(dauer: int, akkustand: int) : boolean</code> soll getestet werden. Es gilt:</p><ul>
<li><code>dauer</code>: Reservierungsdauer in vollen Stunden, zulässig sind 1 bis einschließlich 72 Stunden.</li>
<li><code>akkustand</code>: Akkustand des E-Bikes in Prozent (0 bis 100). Ein E-Bike darf nur reserviert werden, wenn der Akkustand mindestens 30 % beträgt.</li>
<li>Bei unzulässigen Eingabewerten wird eine Exception ausgelöst, bei zulässigen Werten <code>true</code> (reservierbar) bzw. <code>false</code> (zu geringer Akkustand) zurückgegeben.</li>
</ul>`,
        question: `<b>Aufgabe 4 c)</b> Bilden Sie für beide Parameter die <b>gültigen und ungültigen Äquivalenzklassen</b> und geben Sie für jeden Parameter die <b>Grenzwerte</b> an, die im Rahmen einer Grenzwertanalyse getestet werden sollten, jeweils mit erwartetem Ergebnis.`,
        solution: `<p><b>Parameter dauer</b> (4 P)</p>
<table>
<tr><th>Klasse</th><th>Bereich</th><th>Erwartung</th></tr>
<tr><td>gÄK1</td><td>1 ≤ dauer ≤ 72</td><td>zulässig</td></tr>
<tr><td>uÄK1</td><td>dauer &lt; 1</td><td>Exception</td></tr>
<tr><td>uÄK2</td><td>dauer &gt; 72</td><td>Exception</td></tr>
</table>
<p>Grenzwerte: <b>0</b> (Exception), <b>1</b> (zulässig), <b>72</b> (zulässig), <b>73</b> (Exception).</p>
<p><b>Parameter akkustand</b> (4 P)</p>
<table>
<tr><th>Klasse</th><th>Bereich</th><th>Erwartung</th></tr>
<tr><td>gÄK2</td><td>30 ≤ akkustand ≤ 100</td><td>true</td></tr>
<tr><td>gÄK3</td><td>0 ≤ akkustand ≤ 29</td><td>false (gültige Eingabe, aber nicht reservierbar)</td></tr>
<tr><td>uÄK3</td><td>akkustand &lt; 0</td><td>Exception</td></tr>
<tr><td>uÄK4</td><td>akkustand &gt; 100</td><td>Exception</td></tr>
</table>
<p>Grenzwerte: <b>−1</b> (Exception), <b>0</b> (false), <b>29</b> (false), <b>30</b> (true), <b>100</b> (true), <b>101</b> (Exception).</p>
<p>Hinweis: Bei der Kombination der Testfälle wird je Testfall nur <i>ein</i> Parameter mit einem ungültigen Wert belegt, damit die Fehlerursache eindeutig bleibt.</p>`,
        keywords: ["äquivalenzklasse|aequivalenzklasse|äk", "gültig|gueltig", "ungültig|ungueltig", "0", "1", "72", "73", "29", "30", "101"]
      },
      {
        id: "ga1-sim-1-4d", part: "GA1", topic: "ga1-qualitaet", type: "numeric", difficulty: 3, points: 4,
        context: `<p>Tarifregel für normale Räder: Die Ausleihe wird in Blöcke zu je 24 Stunden eingeteilt (der letzte Block ggf. angefangen). Für jeden Block gilt: erste Stunde 4,00 €, jede weitere <i>angefangene</i> Stunde 2,50 €, höchstens jedoch 25,00 € je Block.</p>`,
        question: `<b>Aufgabe 4 d)</b> Für einen Testfall der Methode <code>berechnePreis()</code> muss das erwartete Ergebnis festgelegt werden. Berechnen Sie den Preis für eine Ausleihe von <b>30 Stunden und 10 Minuten</b>.`,
        answer: 44.0, tolerance: 0.01, unit: "€",
        solution: `<ul>
<li>Block 1 (24 h): 4,00 € + 23 · 2,50 € = 61,50 € ⇒ gedeckelt auf <b>25,00 €</b></li>
<li>Block 2 (6 h 10 min ⇒ 7 angefangene Stunden): 4,00 € + 6 · 2,50 € = <b>19,00 €</b> (unter dem Höchstbetrag)</li>
<li>Gesamt: 25,00 € + 19,00 € = <b>44,00 €</b></li>
</ul>`
      },
      {
        id: "ga1-sim-1-4e", part: "GA1", topic: "ga1-architektur", type: "text", difficulty: 2, points: 4,
        context: `<p>Die App kommuniziert über eine REST-API mit dem Backend. Folgende Ressourcen sind geplant:</p>
<table>
<tr><th>Nr.</th><th>Operation</th><th>URI</th></tr>
<tr><td>1</td><td>Alle freien Räder einer Station abrufen</td><td>/api/v1/stationen/{id}/raeder?status=FREI</td></tr>
<tr><td>2</td><td>Neue Reservierung anlegen</td><td>/api/v1/reservierungen</td></tr>
<tr><td>3</td><td>Ausleihe beenden (nur Ende und Zielstation ändern)</td><td>/api/v1/ausleihen/{id}</td></tr>
<tr><td>4</td><td>Reservierung stornieren</td><td>/api/v1/reservierungen/{id}</td></tr>
</table>`,
        question: `<b>Aufgabe 4 e)</b> Ergänzen Sie für jede Operation die passende <b>HTTP-Methode</b> und einen typischen <b>HTTP-Statuscode</b> bei erfolgreicher Ausführung.`,
        solution: `<table>
<tr><th>Nr.</th><th>Methode</th><th>Statuscode</th></tr>
<tr><td>1</td><td>GET</td><td>200 OK</td></tr>
<tr><td>2</td><td>POST</td><td>201 Created (mit Location-Header)</td></tr>
<tr><td>3</td><td>PATCH (Teilaktualisierung; PUT bei vollständiger Ersetzung vertretbar)</td><td>200 OK (oder 204 No Content)</td></tr>
<tr><td>4</td><td>DELETE</td><td>204 No Content (oder 200 OK)</td></tr>
</table><p>Je Zeile 1 P (Methode 0,5 P, Statuscode 0,5 P).</p>`,
        keywords: ["get", "post", "patch|put", "delete", "200", "201", "204"]
      }
    ]
  });
})();

/* =====================================================================
   GA1 – Simulation 2: Online-Terminbuchung Ärztehaus am Stadtpark
   ===================================================================== */
(function () {
  const TERMINLISTE = `<p>Bisher führt die Anmeldung des Ärztehauses folgende Tabelle „Terminliste“:</p>
<table>
<tr><th>TerminNr</th><th>Datum</th><th>Uhrzeit</th><th>PatNr</th><th>PatName</th><th>Krankenkasse</th><th>ArztKürzel</th><th>ArztName</th><th>Praxis</th><th>Leistungen</th></tr>
<tr><td>5001</td><td>2026-11-02</td><td>08:30</td><td>311</td><td>Schulz, Anna</td><td>AOK Hessen</td><td>DRW</td><td>Dr. Wagner</td><td>Allgemeinmedizin</td><td>Blutabnahme, EKG</td></tr>
<tr><td>5002</td><td>2026-11-02</td><td>09:00</td><td>127</td><td>Yilmaz, Emre</td><td>TK</td><td>DRW</td><td>Dr. Wagner</td><td>Allgemeinmedizin</td><td>Impfung</td></tr>
<tr><td>5003</td><td>2026-11-02</td><td>09:00</td><td>311</td><td>Schulz, Anna</td><td>AOK Hessen</td><td>DRK</td><td>Dr. Krüger</td><td>Orthopädie</td><td>Röntgen, Beratung</td></tr>
</table>
<p>Eine Leistung (z. B. „EKG“) hat eine eindeutige Leistungsnummer und eine Bezeichnung. Jeder Arzt gehört genau einer Praxis an.</p>`;

  AP2.exams.push({
    id: "ga1-sim-2",
    part: "GA1",
    title: "Simulation GA1 #2 – Terminbuchungsportal „TerminPlus“ für ein Ärztehaus",
    minutes: 90,
    scenario: `<p>Sie sind als Anwendungsentwicklerin bzw. Anwendungsentwickler bei der <b>Nordhessen Digital GmbH</b> in Kassel beschäftigt. Das Unternehmen entwickelt Webanwendungen für Kunden aus dem Gesundheitswesen und arbeitet nach <b>Scrum</b>.</p>
<p>Das <b>Ärztehaus am Stadtpark</b> vereint sechs Praxen (Allgemeinmedizin, Orthopädie, HNO, Dermatologie, Kinderheilkunde, Physiotherapie) mit 22 Ärztinnen, Ärzten und Therapeuten. Terminvereinbarungen erfolgen bisher ausschließlich telefonisch; die Anmeldung ist morgens oft stundenlang nicht erreichbar.</p>
<p>Ihr Unternehmen entwickelt das Portal <b>„TerminPlus“</b>:</p>
<ul>
<li>Patientinnen und Patienten buchen, verschieben und stornieren Termine über eine Web-App.</li>
<li>Vor dem Termin werden Erinnerungen per E-Mail oder SMS versendet.</li>
<li>Das Praxispersonal pflegt Sprechzeiten und Kalender; das Portal synchronisiert die Termine mit dem Praxisverwaltungssystem (PVS) über eine Schnittstelle.</li>
<li>Bei der Buchung kann der Anlass (z. B. „Impfung“, „akute Rückenschmerzen“) angegeben werden – es werden also <b>Gesundheitsdaten</b> verarbeitet.</li>
</ul>
<p>Bearbeiten Sie die folgenden vier Aufgaben (90 Minuten, 100 Punkte).</p>`,
    tasks: [
      // ---------- Aufgabe 1: Agiles Projektmanagement und Anforderungen (25 P) ----------
      {
        id: "ga1-sim-2-1a", part: "GA1", topic: "ga1-projektmanagement", type: "text", difficulty: 1, points: 4,
        question: `<b>Aufgabe 1 a)</b> Das Projekt wird mit Scrum durchgeführt. Nennen Sie die <b>drei Verantwortlichkeiten (Rollen)</b> eines Scrum Teams und beschreiben Sie jeweils eine wesentliche Aufgabe.`,
        solution: `<ul>
<li><b>Product Owner</b>: verantwortet den Produktwert, pflegt und ordnet (priorisiert) das Product Backlog, formuliert das Produktziel, ist Ansprechpartner für die Stakeholder (hier: Ärztehaus).</li>
<li><b>Scrum Master</b>: sorgt für das Verständnis und die Einhaltung von Scrum, moderiert die Events, beseitigt Hindernisse (Impediments), coacht Team und Organisation (dienende Führungskraft).</li>
<li><b>Developers</b> (Entwicklungsteam): erstellen in jedem Sprint ein nutzbares Inkrement, planen den Sprint (Sprint Backlog), schätzen Aufwände, organisieren sich selbst und halten die Definition of Done ein.</li>
</ul><p>Je Rolle 1 P, sinnvolle Aufgaben 1 P gesamt.</p>`,
        keywords: ["product owner", "scrum master", "developer|entwicklungsteam|entwickler", "backlog", "hindernis|impediment", "inkrement", "priorisier|ordnet"]
      },
      {
        id: "ga1-sim-2-1b", part: "GA1", topic: "ga1-projektmanagement", type: "order", difficulty: 1, points: 4,
        question: `<b>Aufgabe 1 b)</b> Bringen Sie die folgenden Schritte eines Sprints in die richtige zeitliche Reihenfolge.`,
        items: [
          "Product Owner ordnet (priorisiert) das Product Backlog",
          "Sprint Planning: Sprint-Ziel und Sprint Backlog werden festgelegt",
          "Daily Scrum der Developers (täglich, max. 15 Minuten)",
          "Fertigstellung des Inkrements gemäß Definition of Done",
          "Sprint Review: Das Inkrement wird den Stakeholdern vorgestellt",
          "Sprint Retrospective: Das Scrum Team plant Verbesserungen seiner Arbeitsweise"
        ],
        solution: `Product Backlog ordnen → Sprint Planning → Daily Scrums während des Sprints → fertiges Inkrement (DoD) → Sprint Review → Sprint Retrospective (letztes Event des Sprints). Danach beginnt unmittelbar der nächste Sprint.`
      },
      {
        id: "ga1-sim-2-1c", part: "GA1", topic: "ga1-projektmanagement", type: "numeric", difficulty: 2, points: 4,
        context: `<p>Das Team hat in den ersten vier Sprints (je 2 Wochen) folgende Story Points vollständig abgeschlossen:</p>
<table><tr><th>Sprint</th><td>1</td><td>2</td><td>3</td><td>4</td></tr><tr><th>Story Points</th><td>34</td><td>29</td><td>38</td><td>31</td></tr></table>
<p>Im Product Backlog sind noch Einträge mit insgesamt <b>231 Story Points</b> geschätzt.</p>`,
        question: `<b>Aufgabe 1 c)</b> Berechnen Sie auf Basis der durchschnittlichen Velocity, wie viele <b>weitere Sprints</b> voraussichtlich noch benötigt werden.`,
        answer: 7, tolerance: 0, unit: "Sprints",
        solution: `<p>Durchschnittliche Velocity = (34 + 29 + 38 + 31) / 4 = 132 / 4 = <b>33 Story Points je Sprint</b></p>
<p>Benötigte Sprints = 231 / 33 = <b>7 Sprints</b> (entspricht ca. 14 Wochen).</p><p>Punkte: Velocity 2 P, Sprints 2 P.</p>`
      },
      {
        id: "ga1-sim-2-1d", part: "GA1", topic: "ga1-anforderungen", type: "text", difficulty: 2, points: 5,
        question: `<b>Aufgabe 1 d)</b> Der Product Owner möchte die Funktion „Termin absagen“ ins Product Backlog aufnehmen. Formulieren Sie dafür eine <b>User Story</b> und <b>zwei</b> überprüfbare Akzeptanzkriterien. Berücksichtigen Sie, dass Termine nur bis 24 Stunden vor Beginn online abgesagt werden können.`,
        solution: `<p><b>User Story</b> (2 P): „Als <i>Patientin</i> möchte ich einen gebuchten Termin online absagen, damit ich nicht anrufen muss und der Termin für andere Patienten frei wird.“</p>
<p><b>Akzeptanzkriterien</b> (je 1,5 P), z. B.:</p><ol>
<li>Wenn der Termin mindestens 24 Stunden in der Zukunft liegt, kann ich ihn über „Absagen“ stornieren; der Termin erscheint danach im Kalender der Praxis als frei.</li>
<li>Liegt der Termin weniger als 24 Stunden in der Zukunft, ist „Absagen“ deaktiviert und es wird die Telefonnummer der Praxis angezeigt.</li>
<li>Nach erfolgreicher Absage erhalte ich innerhalb von 5 Minuten eine Bestätigung per E-Mail.</li>
</ol>`,
        keywords: ["als", "möchte|moechte", "damit", "24 stunden|24 h|24h", "akzeptanz", "bestätigung|bestaetigung|frei"]
      },
      {
        id: "ga1-sim-2-1e", part: "GA1", topic: "ga1-qualitaet", type: "text", difficulty: 2, points: 4,
        question: `<b>Aufgabe 1 e)</b> Im Team kommt es zu Diskussionen, wann eine User Story „fertig“ ist. Erläutern Sie den Unterschied zwischen der <b>Definition of Done</b> und den <b>Akzeptanzkriterien</b> einer User Story und geben Sie für die Definition of Done zwei Beispiele.`,
        solution: `<ul>
<li><b>Akzeptanzkriterien</b> (1,5 P) gelten für <b>eine einzelne</b> User Story und beschreiben fachlich, welche Bedingungen das Ergebnis aus Sicht des Product Owners/Kunden erfüllen muss.</li>
<li><b>Definition of Done</b> (1,5 P) ist eine vom Scrum Team vereinbarte, <b>für alle</b> Backlog-Einträge geltende Qualitätscheckliste; erst wenn sie erfüllt ist, gilt ein Eintrag als Teil des Inkrements.</li>
<li><b>Beispiele DoD</b> (je 0,5 P): Code-Review durchgeführt; Unit-Tests geschrieben und grün (z. B. Testabdeckung ≥ 80 %); in die Staging-Umgebung deployt; Dokumentation aktualisiert; keine bekannten kritischen Fehler; barrierefreie Gestaltung geprüft.</li>
</ul>`,
        keywords: ["definition of done|dod", "akzeptanzkriterien", "alle|jede", "einzelne|story", "qualität|qualitaet|checkliste", "review|test"]
      },
      {
        id: "ga1-sim-2-1f", part: "GA1", topic: "ga1-projektmanagement", type: "multi", difficulty: 2, points: 4,
        question: `<b>Aufgabe 1 f)</b> Welche der folgenden Aussagen zu Scrum sind <b>zutreffend</b>?`,
        options: [
          "Während des Sprints werden keine Änderungen vorgenommen, die das Sprint-Ziel gefährden.",
          "Der Scrum Master legt fest, welche Product-Backlog-Einträge in den Sprint übernommen werden.",
          "Ein Sprint hat eine feste Dauer von höchstens einem Monat.",
          "Das Product Backlog ist nach dem Sprint Planning bis zum Projektende unveränderlich.",
          "Die Velocity eignet sich gut, um die Leistung verschiedener Scrum Teams miteinander zu vergleichen.",
          "Die Developers schätzen den Aufwand der Einträge, z. B. mit Planning Poker."
        ],
        correct: [0, 2, 5],
        solution: `Zutreffend: Schutz des Sprint-Ziels, Sprintlänge max. ein Monat (Timebox), Schätzung durch die Developers (z. B. Planning Poker). Falsch: Die Auswahl im Sprint Planning treffen Developers gemeinsam mit dem Product Owner, nicht der Scrum Master; das Product Backlog wird laufend verfeinert (Refinement); Story Points sind teamspezifisch, die Velocity ist daher nicht zwischen Teams vergleichbar.`
      },
      // ---------- Aufgabe 2: Datenschutz und IT-Sicherheit (25 P) ----------
      {
        id: "ga1-sim-2-2a", part: "GA1", topic: "ga1-sicherheit", type: "text", difficulty: 2, points: 4,
        question: `<b>Aufgabe 2 a)</b> Bei der Buchung kann der Anlass des Termins angegeben werden. Erläutern Sie, warum diese Daten nach DSGVO <b>besonders schutzbedürftig</b> sind, und nennen Sie <b>zwei</b> Pflichten, die sich daraus für den Betrieb von „TerminPlus“ ergeben.`,
        solution: `<p><b>Begründung</b> (2 P): Angaben wie „akute Rückenschmerzen“ sind <b>Gesundheitsdaten</b> und gehören zu den <b>besonderen Kategorien personenbezogener Daten nach Art. 9 DSGVO</b>. Ihre Verarbeitung ist grundsätzlich untersagt und nur ausnahmsweise erlaubt, z. B. mit ausdrücklicher Einwilligung (Art. 9 Abs. 2 lit. a) oder für Zwecke der Gesundheitsversorgung (lit. h). Ein Missbrauch kann Betroffene erheblich schädigen (Diskriminierung, Arbeitsplatz, Versicherung).</p>
<p><b>Pflichten</b> (je 1 P), z. B.:</p><ul>
<li>Durchführung einer <b>Datenschutz-Folgenabschätzung</b> (Art. 35 DSGVO) bei hohem Risiko</li>
<li>Einholen einer <b>ausdrücklichen Einwilligung</b> bzw. Prüfung der Rechtsgrundlage, Informationspflichten (Art. 13)</li>
<li>Besonders strenge <b>TOMs</b> (Verschlüsselung, Zugriffsbeschränkung nach Need-to-know, Protokollierung)</li>
<li>Abschluss eines <b>AV-Vertrags</b> mit dem Hoster, Datensparsamkeit (Anlass optional, Freitext begrenzen), Löschkonzept</li>
</ul>`,
        keywords: ["art. 9|artikel 9|besondere kategorie", "gesundheitsdaten", "einwilligung", "folgenabschätzung|folgenabschaetzung|dsfa|art. 35", "verschlüssel|verschluessel|tom", "datensparsam|löschkonzept|loeschkonzept"]
      },
      {
        id: "ga1-sim-2-2b", part: "GA1", topic: "ga1-sicherheit", type: "text", difficulty: 2, points: 6,
        question: `<b>Aufgabe 2 b)</b> Für das Sicherheitskonzept sollen technische und organisatorische Maßnahmen (TOMs) festgelegt werden. Nennen Sie für jedes der Schutzziele <b>Vertraulichkeit, Integrität und Verfügbarkeit</b> eine Erläuterung und eine konkrete, auf „TerminPlus“ bezogene Maßnahme.`,
        solution: `<table>
<tr><th>Schutzziel</th><th>Erläuterung (je 1 P)</th><th>Maßnahme (je 1 P)</th></tr>
<tr><td>Vertraulichkeit</td><td>Nur Berechtigte dürfen Daten einsehen.</td><td>TLS-Verschlüsselung (HTTPS), Verschlüsselung der Datenbank, rollenbasiertes Berechtigungskonzept (Praxis sieht nur eigene Termine), 2FA für Personal</td></tr>
<tr><td>Integrität</td><td>Daten sind vollständig und unverfälscht; Änderungen sind nachvollziehbar.</td><td>Eingabevalidierung, Prepared Statements, Prüfsummen/digitale Signaturen bei der PVS-Schnittstelle, Änderungsprotokoll (Audit-Log)</td></tr>
<tr><td>Verfügbarkeit</td><td>System und Daten stehen bei Bedarf zur Verfügung.</td><td>Redundante Server/Hosting mit SLA, regelmäßige und getestete Backups (3-2-1-Regel), USV, DDoS-Schutz, Monitoring</td></tr>
</table>`,
        keywords: ["vertraulichkeit", "integrität|integritaet", "verfügbarkeit|verfuegbarkeit", "verschlüssel|verschluessel|tls|https", "berechtigung|rolle|zugriff", "backup|datensicherung|redundan", "protokoll|log|prüfsumme|pruefsumme|hash"]
      },
      {
        id: "ga1-sim-2-2c", part: "GA1", topic: "ga1-sicherheit", type: "text", difficulty: 2, points: 5,
        question: `<b>Aufgabe 2 c)</b> Das Praxispersonal soll sich mit einer <b>Zwei-Faktor-Authentisierung</b> anmelden. Erläutern Sie das Prinzip, nennen Sie die drei Kategorien von Authentisierungsfaktoren jeweils mit Beispiel und begründen Sie den Sicherheitsgewinn.`,
        solution: `<ul>
<li><b>Prinzip</b> (1 P): Die Identität wird durch die Kombination von <b>zwei Faktoren aus unterschiedlichen Kategorien</b> nachgewiesen.</li>
<li><b>Kategorien</b> (je 1 P): <b>Wissen</b> (Passwort, PIN), <b>Besitz</b> (Smartphone mit Authenticator-App/TOTP, Hardware-Token, Smartcard/eHBA), <b>Inhärenz/Sein</b> (biometrisches Merkmal: Fingerabdruck, Gesichtserkennung).</li>
<li><b>Sicherheitsgewinn</b> (1 P): Ein Angreifer, der z. B. per Phishing das Passwort erbeutet, kann sich ohne den zweiten Faktor (Besitz) nicht anmelden; die Faktoren müssten getrennt kompromittiert werden.</li>
</ul>`,
        keywords: ["wissen", "besitz", "biometr|inhärenz|inhaerenz|sein", "passwort|pin", "token|smartphone|app|totp", "zwei|unterschiedlich|kategorie", "phishing|gestohlen|erbeut"]
      },
      {
        id: "ga1-sim-2-2d", part: "GA1", topic: "ga1-sicherheit", type: "mc", difficulty: 1, points: 3,
        question: `<b>Aufgabe 2 d)</b> Welches Verfahren ist für die Speicherung der Passwörter der Patientenkonten am besten geeignet?`,
        options: [
          "SHA-256 ohne Salt",
          "Verschlüsselung mit AES-256 und zentral gespeichertem Schlüssel",
          "Argon2id mit individuellem Salt je Passwort",
          "MD5 mit einem für alle Konten gleichen Salt",
          "Base64-Kodierung"
        ],
        correct: [2],
        solution: `<b>Argon2id</b> ist eine speziell für Passwörter entwickelte, speicher- und rechenintensive Hashfunktion; mit individuellem Salt sind Rainbow Tables wirkungslos und Brute-Force wird stark verlangsamt. SHA-256/MD5 sind zu schnell, AES ist umkehrbar (Schlüsselverlust = alle Passwörter offen), Base64 ist nur eine Kodierung.`
      },
      {
        id: "ga1-sim-2-2e", part: "GA1", topic: "ga1-sicherheit", type: "text", difficulty: 2, points: 4,
        context: `<p>Im Backend wurde für die Patientensuche des Personals folgender Java-Code gefunden:</p>
<pre><code>String sql = "SELECT * FROM patient WHERE nachname = '" + eingabe + "'";
ResultSet rs = connection.createStatement().executeQuery(sql);</code></pre>`,
        question: `<b>Aufgabe 2 e)</b> Erläutern Sie die Sicherheitslücke anhand eines Beispiels für die Eingabe und beschreiben Sie, wie der Code abgesichert werden kann.`,
        solution: `<ul>
<li><b>Lücke</b> (2 P): <b>SQL-Injection</b>. Die Benutzereingabe wird ungeprüft in den SQL-String eingefügt und als SQL-Code interpretiert. Beispiel: Eingabe <code>' OR '1'='1</code> ergibt <code>... WHERE nachname = '' OR '1'='1'</code> und liefert alle Patientendaten; mit <code>'; DROP TABLE patient; --</code> könnten Daten zerstört werden (sofern Mehrfachanweisungen erlaubt).</li>
<li><b>Absicherung</b> (2 P): Verwendung von <b>Prepared Statements</b> mit Platzhaltern (parametrisierte Abfrage), z. B.<br><code>PreparedStatement ps = connection.prepareStatement("SELECT * FROM patient WHERE nachname = ?"); ps.setString(1, eingabe);</code><br>zusätzlich Eingabevalidierung (Whitelist), minimale Datenbankrechte des Anwendungsbenutzers, ORM-Framework.</li>
</ul>`,
        keywords: ["sql-injection|sql injection", "prepared statement|preparedstatement|parametris", "' or|or '1'='1|or 1=1", "platzhalter|?", "validier", "rechte"]
      },
      {
        id: "ga1-sim-2-2f", part: "GA1", topic: "ga1-sicherheit", type: "numeric", difficulty: 2, points: 3,
        question: `<b>Aufgabe 2 f)</b> Der Hosting-Anbieter garantiert im Service Level Agreement eine Verfügbarkeit von <b>99,5 %</b> bezogen auf ein Kalenderjahr mit 365 Tagen (24/7-Betrieb). Berechnen Sie die maximal zulässige Ausfallzeit pro Jahr in <b>Stunden</b>.`,
        answer: 43.8, tolerance: 0.05, unit: "h",
        solution: `<p>Stunden pro Jahr: 365 · 24 = 8.760 h</p><p>Zulässiger Ausfall: 8.760 h · (100 % − 99,5 %) = 8.760 h · 0,005 = <b>43,8 h</b> (≈ 43 h 48 min)</p>`
      },
      // ---------- Aufgabe 3: Datenmodellierung und UML (26 P) ----------
      {
        id: "ga1-sim-2-3a", part: "GA1", topic: "ga1-datenmodell", type: "text", difficulty: 2, points: 6,
        context: `<p>Für das Datenmodell von „TerminPlus“ wurden folgende Sachverhalte erhoben:</p><ol>
<li>Jeder Arzt gehört genau einer Praxis an; eine Praxis hat mindestens einen Arzt.</li>
<li>Ein Patient kann beliebig viele Termine buchen; ein gebuchter Termin gehört zu genau einem Patienten.</li>
<li>Ein Termin findet bei genau einem Arzt statt; ein Arzt hat beliebig viele Termine.</li>
<li>Bei einem Termin können mehrere Leistungen erbracht werden; eine Leistung kann bei beliebig vielen Terminen erbracht werden.</li>
<li>Ein Patient kann höchstens einen Hausarzt im Ärztehaus haben; ein Arzt kann Hausarzt vieler Patienten sein.</li>
</ol>`,
        question: `<b>Aufgabe 3 a)</b> Geben Sie für jeden Sachverhalt den <b>Beziehungstyp</b> (1:1, 1:n, m:n) mit den Kardinalitäten in Min-Max-Notation an und beschreiben Sie, wie die m:n-Beziehung im Relationenmodell umgesetzt wird.`,
        solution: `<table>
<tr><th>Nr.</th><th>Beziehung</th><th>Typ</th><th>Min-Max</th></tr>
<tr><td>1</td><td>Praxis – Arzt</td><td>1:n</td><td>Praxis (1,*) — Arzt (1,1)</td></tr>
<tr><td>2</td><td>Patient – Termin</td><td>1:n</td><td>Patient (0,*) — Termin (1,1)</td></tr>
<tr><td>3</td><td>Arzt – Termin</td><td>1:n</td><td>Arzt (0,*) — Termin (1,1)</td></tr>
<tr><td>4</td><td>Termin – Leistung</td><td>m:n</td><td>Termin (0,*) — Leistung (0,*)</td></tr>
<tr><td>5</td><td>Arzt (Hausarzt) – Patient</td><td>1:n (optional)</td><td>Patient (0,1) — Arzt (0,*)</td></tr>
</table>
<p>(Min-Max: Angabe, an wie vielen Beziehungen ein Entity <i>teilnimmt</i>.) Je Beziehung 0,8 P.</p>
<p><b>Umsetzung m:n</b> (2 P): Auflösung über eine <b>Zwischentabelle</b> (Beziehungstabelle) <code>Termin_Leistung(#termin_nr, #leistung_nr)</code>, deren Primärschlüssel aus den beiden Fremdschlüsseln zusammengesetzt ist; ggf. Zusatzattribute wie Anzahl. Aus m:n werden zwei 1:n-Beziehungen.</p>`,
        keywords: ["1:n", "m:n", "zwischentabelle|beziehungstabelle|verbindungstabelle|koppeltabelle", "fremdschlüssel|fremdschluessel|fk", "zusammengesetzt", "(0,1)|0,1|0..1", "(1,1)|1,1"]
      },
      {
        id: "ga1-sim-2-3b", part: "GA1", topic: "ga1-datenmodell", type: "text", difficulty: 3, points: 8,
        context: TERMINLISTE,
        question: `<b>Aufgabe 3 b)</b> Überführen Sie die Tabelle „Terminliste“ in die <b>3. Normalform</b>. Geben Sie alle Relationen mit Attributen an, kennzeichnen Sie Primär- und Fremdschlüssel und benennen Sie, welche Verstöße Sie in den einzelnen Schritten beseitigt haben.`,
        solution: `<p><b>Verstöße</b> (3 P):</p><ul>
<li>1. NF verletzt: „Leistungen“ ist <b>nicht atomar</b> (Wiederholungsgruppe „Blutabnahme, EKG“); „PatName“ enthält Nach- und Vorname.</li>
<li>Nach Auflösung der Leistungen ist der Schlüssel (TerminNr, LeistungNr); Termin-Daten hängen nur von TerminNr ab ⇒ <b>partielle Abhängigkeit</b> (2. NF).</li>
<li><b>Transitive Abhängigkeiten</b> (3. NF): PatNr → Name, Krankenkasse; ArztKürzel → ArztName, Praxis.</li>
</ul>
<p><b>Relationen in 3. NF</b> (5 P):</p>
<pre><code>Patient        (PK pat_nr, nachname, vorname, krankenkasse)
Praxis         (PK praxis_id, bezeichnung)
Arzt           (PK arzt_kuerzel, name, FK praxis_id)
Termin         (PK termin_nr, datum, uhrzeit, FK pat_nr, FK arzt_kuerzel)
Leistung       (PK leistung_nr, bezeichnung)
Termin_Leistung(PK/FK termin_nr, PK/FK leistung_nr)</code></pre>
<p>Vertretbar: Krankenkasse als eigene Relation (kasse_id, name), um Schreibvarianten zu vermeiden.</p>`,
        keywords: ["atomar|1. nf|erste normalform", "partiell|2. nf", "transitiv|3. nf", "patient", "arzt", "praxis", "termin_leistung|zwischentabelle|terminleistung", "leistung"]
      },
      {
        id: "ga1-sim-2-3c", part: "GA1", topic: "ga1-uml", type: "text", difficulty: 3, points: 6,
        context: `<p>Ablauf der Online-Buchung: Die Patientin wählt in der Web-Oberfläche (<code>:BuchungsUI</code>) einen Zeitslot. Die Oberfläche ruft synchron <code>bucheTermin(slotId, patNr)</code> am <code>:TerminController</code> auf. Dieser fragt beim <code>:KalenderService</code> mit <code>istFrei(slotId)</code> an.</p>
<ul><li>Ist der Slot frei, speichert der Controller den Termin über das <code>:TerminRepository</code> (<code>speichere(termin)</code>), stößt <b>asynchron</b> beim <code>:BenachrichtigungsService</code> den Versand einer Bestätigung an (<code>sendeBestaetigung(termin)</code>) und gibt die Terminbestätigung an die Oberfläche zurück.</li>
<li>Andernfalls gibt der Controller die Meldung „Slot belegt“ zurück und die Oberfläche zeigt Alternativtermine an.</li></ul>`,
        question: `<b>Aufgabe 3 c)</b> Beschreiben Sie das zugehörige <b>UML-Sequenzdiagramm</b> in Textnotation. Geben Sie Lebenslinien, Nachrichten in der richtigen Reihenfolge, die Art der Nachrichten (synchron, asynchron, Antwort) sowie das passende kombinierte Fragment an.`,
        solution: `<pre><code>Lebenslinien: Patientin (Akteur), :BuchungsUI, :TerminController,
              :KalenderService, :TerminRepository, :BenachrichtigungsService

1  Patientin        -&gt;  :BuchungsUI          slotWaehlen()           synchron
2  :BuchungsUI      -&gt;  :TerminController    bucheTermin(slotId, patNr) synchron
3  :TerminController-&gt;  :KalenderService     istFrei(slotId)          synchron
4  :KalenderService --&gt; :TerminController    frei : boolean           Antwort
   alt [frei == true]
5     :TerminController -&gt;  :TerminRepository        speichere(termin)       synchron
6     :TerminRepository --&gt; :TerminController        ok                      Antwort
7     :TerminController -&gt;&gt; :BenachrichtigungsService sendeBestaetigung(termin) asynchron
8     :TerminController --&gt; :BuchungsUI              Terminbestätigung       Antwort
   [else]
9     :TerminController --&gt; :BuchungsUI              "Slot belegt"           Antwort
10    :BuchungsUI       -&gt;  :BuchungsUI              zeigeAlternativen()     Selbstaufruf
   end alt</code></pre>
<p>Notation: synchron = durchgezogene Linie mit gefüllter Pfeilspitze; asynchron = durchgezogene Linie mit offener Pfeilspitze; Antwort = gestrichelte Linie mit offener Pfeilspitze. Punkte: Lebenslinien 1 P, Nachrichten/Reihenfolge 2 P, Nachrichtenarten 1,5 P, alt-Fragment mit Bedingungen 1,5 P.</p>`,
        keywords: ["alt", "else|sonst", "synchron", "asynchron", "antwort|rückgabe|rueckgabe", "istfrei", "speichere", "sendebestaetigung|bestätigung"]
      },
      {
        id: "ga1-sim-2-3d", part: "GA1", topic: "ga1-uml", type: "mc", difficulty: 2, points: 3,
        context: `<p>Zustandsdiagramm eines Termin-Slots (Textnotation):</p>
<pre><code>[Start] --&gt; frei
frei        --Patient wählt Slot--&gt;                    reserviert
reserviert  --Bestätigung innerhalb 10 min--&gt;         gebucht
reserviert  --after(10 min)--&gt;                        frei
gebucht     --Absage [Beginn - jetzt &gt;= 24 h]--&gt;      frei
gebucht     --Patient erscheint--&gt;                    wahrgenommen
gebucht     --Termin verstrichen [nicht erschienen]--&gt; nichtErschienen
wahrgenommen --&gt; [Ende]
nichtErschienen --&gt; [Ende]</code></pre>`,
        question: `<b>Aufgabe 3 d)</b> Welcher der folgenden Zustandsübergänge ist laut Zustandsdiagramm <b>zulässig</b>?`,
        options: [
          "reserviert → wahrgenommen",
          "frei → gebucht",
          "gebucht → frei durch Absage 48 Stunden vor Terminbeginn",
          "nichtErschienen → gebucht",
          "gebucht → frei durch Absage 2 Stunden vor Terminbeginn"
        ],
        correct: [2],
        solution: `Nur der Übergang gebucht → frei bei einer Absage mit mindestens 24 h Vorlauf ist modelliert; der Wächter (Guard) <code>[Beginn - jetzt &gt;= 24 h]</code> ist bei 48 h erfüllt, bei 2 h nicht. „frei → gebucht“ ist nur über den Zwischenzustand „reserviert“ möglich, von Endzuständen gehen keine Übergänge aus.`
      },
      {
        id: "ga1-sim-2-3e", part: "GA1", topic: "ga1-uml", type: "mc", difficulty: 2, points: 3,
        question: `<b>Aufgabe 3 e)</b> Welche Aussage zur Notation von UML-Sequenzdiagrammen ist <b>korrekt</b>?`,
        options: [
          "Eine synchrone Nachricht wird als durchgezogene Linie mit gefüllter Pfeilspitze dargestellt; der Sender wartet auf die Antwort.",
          "Eine asynchrone Nachricht wird als gestrichelte Linie mit gefüllter Pfeilspitze dargestellt.",
          "Antwortnachrichten werden als durchgezogene Linie ohne Pfeilspitze dargestellt.",
          "Das kombinierte Fragment „loop“ beschreibt sich gegenseitig ausschließende Alternativen.",
          "Die Zeitachse verläuft in Sequenzdiagrammen von rechts nach links."
        ],
        correct: [0],
        solution: `Synchron: durchgezogene Linie, gefüllte Spitze (Sender blockiert). Asynchron: durchgezogene Linie, offene Spitze. Antwort: gestrichelte Linie, offene Spitze. „alt“ beschreibt Alternativen, „loop“ Wiederholungen, „opt“ optionale Abschnitte. Die Zeit verläuft von oben nach unten.`
      },
      // ---------- Aufgabe 4: Architektur, Ergonomie und Test (24 P) ----------
      {
        id: "ga1-sim-2-4a", part: "GA1", topic: "ga1-architektur", type: "text", difficulty: 2, points: 6,
        question: `<b>Aufgabe 4 a)</b> Die Web-App soll nach dem Architekturmuster <b>Model-View-Controller (MVC)</b> aufgebaut werden. Beschreiben Sie die Aufgaben der drei Komponenten, ordnen Sie jeweils ein Beispiel aus „TerminPlus“ zu und nennen Sie zwei Vorteile des Musters.`,
        solution: `<ul>
<li><b>Model</b> (1 P + Bsp.): Daten und Geschäftslogik, unabhängig von der Darstellung – z. B. Klassen <code>Termin</code>, <code>Patient</code>, Regel „Absage nur ≥ 24 h vorher“, Datenbankzugriff.</li>
<li><b>View</b> (1 P + Bsp.): Darstellung der Daten und Entgegennahme von Benutzeraktionen – z. B. Kalenderansicht mit freien Slots, Buchungsformular.</li>
<li><b>Controller</b> (1 P + Bsp.): Steuerung; nimmt Benutzeraktionen der View entgegen, ruft das Model auf und wählt die passende View – z. B. <code>TerminController.bucheTermin()</code>.</li>
<li><b>Vorteile</b> (je 0,5 P, max. 1 P): Trennung von Zuständigkeiten (Separation of Concerns), bessere Wartbarkeit und Testbarkeit, mehrere Views für ein Model (Web, App, Praxis-Ansicht), paralleles Arbeiten von Frontend- und Backend-Entwicklern.</li>
</ul><p>Beispiele insgesamt 2 P.</p>`,
        keywords: ["model", "view", "controller", "daten|geschäftslogik|geschaeftslogik", "darstellung|oberfläche|oberflaeche", "steuer|benutzeraktion", "wartbar|testbar|trennung"]
      },
      {
        id: "ga1-sim-2-4b", part: "GA1", topic: "ga1-ergonomie", type: "text", difficulty: 1, points: 4,
        question: `<b>Aufgabe 4 b)</b> Viele Patientinnen und Patienten sind älter oder haben Seh- bzw. motorische Einschränkungen. Das Ärztehaus wünscht ein barrierefreies Portal nach WCAG 2.1, Konformitätsstufe AA. Nennen Sie <b>vier konkrete Maßnahmen</b> zur barrierefreien Gestaltung.`,
        solution: `<p>Je Maßnahme 1 P, z. B.:</p><ul>
<li>Ausreichender Kontrast (mind. 4,5 : 1 für normalen Text), Informationen nicht nur über Farbe vermitteln (freie Slots zusätzlich mit Text/Symbol)</li>
<li>Vollständige Bedienbarkeit per Tastatur, sichtbarer Fokus</li>
<li>Alternativtexte für Grafiken und Icons, semantisches HTML/ARIA für Screenreader</li>
<li>Skalierbare Schrift (Zoom bis 200 % ohne Funktionsverlust), responsives Layout</li>
<li>Formularfelder mit beschrifteten Labels, verständliche Fehlermeldungen</li>
<li>Ausreichend große Klickflächen, keine zu kurzen Zeitlimits (bzw. verlängerbar)</li>
<li>Leichte Sprache / verständliche Texte</li>
</ul>`,
        keywords: ["kontrast", "tastatur", "alternativtext|alt-text|screenreader", "schrift|zoom|skalier", "label|beschrift", "zeitlimit|klickfläche|klickflaeche|leichte sprache"]
      },
      {
        id: "ga1-sim-2-4c", part: "GA1", topic: "ga1-ergonomie", type: "multi", difficulty: 2, points: 4,
        question: `<b>Aufgabe 4 c)</b> Nach dem Klick auf „Termin absagen“ erscheint 10 Sekunden lang der Hinweis „Termin abgesagt – <u>Rückgängig</u>“, über den die Absage zurückgenommen werden kann. Welche <b>zwei</b> Interaktionsgrundsätze nach DIN EN ISO 9241-110 werden durch diese Maßnahme in erster Linie unterstützt?`,
        options: [
          "Aufgabenangemessenheit",
          "Erwartungskonformität",
          "Erlernbarkeit",
          "Steuerbarkeit",
          "Robustheit gegen Benutzerfehler",
          "Benutzerbindung"
        ],
        correct: [3, 4],
        solution: `<b>Steuerbarkeit</b>: Der Benutzer kann den Ablauf beeinflussen und eine Aktion rückgängig machen. <b>Robustheit gegen Benutzerfehler</b> (früher Fehlertoleranz): Ein versehentlicher Klick führt nicht zu einem unerwünschten Ergebnis, der Fehler lässt sich mit minimalem Aufwand korrigieren.`
      },
      {
        id: "ga1-sim-2-4d", part: "GA1", topic: "ga1-qualitaet", type: "text", difficulty: 3, points: 7,
        context: `<p>Die Methode <code>istAbsagbar(beginn: DateTime, jetzt: DateTime) : boolean</code> liefert <code>true</code>, wenn zwischen <code>jetzt</code> und <code>beginn</code> <b>mindestens 24 Stunden</b> liegen, sonst <code>false</code>. Liegt <code>beginn</code> bereits in der Vergangenheit (<code>beginn &lt; jetzt</code>), wird eine <code>IllegalArgumentException</code> ausgelöst. Die Zeitangaben sind minutengenau.</p>`,
        question: `<b>Aufgabe 4 d)</b> Erstellen Sie für einen Termin mit Beginn am <b>10.12.2026 um 10:00 Uhr</b> eine Testfalltabelle nach der <b>Grenzwertanalyse</b> mit mindestens <b>fünf</b> Testfällen (Testfall-Nr., Wert für <code>jetzt</code>, Differenz, erwartetes Ergebnis). Begründen Sie kurz, warum Grenzwerte besonders häufig fehlerhaft implementiert werden.`,
        solution: `<table>
<tr><th>TF</th><th>jetzt</th><th>Differenz</th><th>Erwartung</th></tr>
<tr><td>1</td><td>09.12.2026 09:59</td><td>24 h 1 min</td><td>true</td></tr>
<tr><td>2</td><td>09.12.2026 10:00</td><td>genau 24 h</td><td>true (Grenzwert, „mindestens“)</td></tr>
<tr><td>3</td><td>09.12.2026 10:01</td><td>23 h 59 min</td><td>false</td></tr>
<tr><td>4</td><td>10.12.2026 10:00</td><td>0 min</td><td>false (Beginn noch nicht vergangen)</td></tr>
<tr><td>5</td><td>10.12.2026 10:01</td><td>−1 min</td><td>IllegalArgumentException</td></tr>
</table>
<p>Punkte: je korrektem Testfall 1 P (5 P). <b>Begründung</b> (2 P): An Bereichsgrenzen passieren typische Programmierfehler wie <code>&gt;</code> statt <code>&gt;=</code> („Off-by-one“), falsche Rundung von Zeitdifferenzen oder Zeitzonen-/Sommerzeitprobleme; Werte direkt an und neben der Grenze decken diese Fehler mit wenigen Testfällen auf.</p>`,
        keywords: ["24", "true", "false", "exception", "23:59|23 h 59|10:01", "09:59", ">=|größer gleich|groesser gleich|off-by-one|off by one", "grenz"]
      },
      {
        id: "ga1-sim-2-4e", part: "GA1", topic: "ga1-qualitaet", type: "mc", difficulty: 1, points: 3,
        question: `<b>Aufgabe 4 e)</b> Nach der Behebung eines Fehlers in der Erinnerungsfunktion werden alle bereits erfolgreich durchlaufenen automatisierten Tests erneut ausgeführt. Wie heißt dieses Vorgehen?`,
        options: [
          "Abnahmetest – der Kunde prüft die vertraglich vereinbarten Anforderungen.",
          "Regressionstest – es wird geprüft, ob durch die Änderung neue Fehler in bereits funktionierenden Teilen entstanden sind.",
          "Lasttest – es wird das Verhalten unter hoher Benutzerzahl geprüft.",
          "Integrationstest – es wird ausschließlich die Schnittstelle zum PVS geprüft.",
          "Smoke-Test – es wird nur geprüft, ob die Anwendung startet."
        ],
        correct: [1],
        solution: `Ein <b>Regressionstest</b> wiederholt bereits bestandene Tests nach einer Änderung, um unbeabsichtigte Seiteneffekte (Regressionen) aufzudecken. Er wird idealerweise automatisiert in der CI-Pipeline ausgeführt.`
      }
    ]
  });
})();

/* =====================================================================
   GA1 – Simulation 3: Lagerverwaltung Getränke Hansen GmbH & Co. KG
   ===================================================================== */
(function () {
  const KOSTEN = `<p>Für das Projekt „LagerFlow“ wurden folgende Kosten geplant:</p>
<table>
<tr><th>Position</th><th>Menge</th><th>Kostensatz</th></tr>
<tr><td>Softwareentwicklung</td><td>3 Entwickler je 18 Arbeitstage à 8 Stunden</td><td>62,00 € je Stunde</td></tr>
<tr><td>Projektleitung</td><td>6 Arbeitstage à 8 Stunden</td><td>78,00 € je Stunde</td></tr>
<tr><td>Mobile Barcode-Scanner (Android, robust)</td><td>8 Stück</td><td>649,00 € je Stück</td></tr>
<tr><td>Lizenz Datenbank/Middleware (einmalig)</td><td>1</td><td>2.400,00 €</td></tr>
</table>`;

  const RABATT_CODE = `<pre><code>funktion berechneRabatt(menge: Ganzzahl, istStammkunde: Wahrheitswert): Gleitkommazahl
  rabatt ← 0.0
  wenn menge &gt;= 100 dann
    rabatt ← 0.05
    wenn menge &gt;= 500 dann
      rabatt ← 0.08
    ende wenn
  ende wenn
  wenn istStammkunde dann
    rabatt ← rabatt + 0.02
  ende wenn
  rückgabe rabatt
ende funktion</code></pre>`;

  AP2.exams.push({
    id: "ga1-sim-3",
    part: "GA1",
    title: "Simulation GA1 #3 – Lagerverwaltung „LagerFlow“ für einen Getränkegroßhändler",
    minutes: 90,
    scenario: `<p>Sie arbeiten in der IT-Abteilung der <b>Getränke Hansen GmbH &amp; Co. KG</b> in Lüneburg, eines Getränkegroßhändlers mit 85 Beschäftigten. Das Unternehmen beliefert rund 900 Gastronomiebetriebe und Getränkemärkte mit ca. 2.500 Artikeln (Bier, Wasser, Säfte, Spirituosen) sowie dem zugehörigen Leergut (Pfandkisten und -flaschen).</p>
<p>Ausgangslage:</p>
<ul>
<li>Lagerbestände werden in Excel-Listen geführt, die Lagerplätze (Halle, Regal, Fach) sind nur den erfahrenen Lageristen bekannt.</li>
<li>Bei der Kommissionierung kommt es häufig zu Fehlern (falscher Artikel, abgelaufenes Mindesthaltbarkeitsdatum).</li>
<li>Das ERP-System für Buchhaltung und Fakturierung soll weiter genutzt werden.</li>
</ul>
<p>Die IT-Abteilung entwickelt deshalb die Lagerverwaltung <b>„LagerFlow“</b>: Wareneingänge und Kommissionierung werden mit mobilen Barcode-Scannern erfasst, Bestände je Lagerplatz geführt, Mindestbestände überwacht und Buchungen per Schnittstelle an das ERP-System übertragen. Sie sind als Anwendungsentwicklerin bzw. Anwendungsentwickler im Projekt tätig.</p>
<p>Bearbeiten Sie die folgenden vier Aufgaben (90 Minuten, 100 Punkte).</p>`,
    tasks: [
      // ---------- Aufgabe 1: Projektinitiierung und Wirtschaftlichkeit (24 P) ----------
      {
        id: "ga1-sim-3-1a", part: "GA1", topic: "ga1-anforderungen", type: "text", difficulty: 1, points: 4,
        question: `<b>Aufgabe 1 a)</b> Zu Projektbeginn soll der Ist-Zustand im Lager erhoben werden. Nennen Sie <b>zwei Methoden der Ist-Analyse</b> und beschreiben Sie jeweils einen Vor- und einen Nachteil im Kontext des Lagers.`,
        solution: `<p>Je Methode 2 P (Methode 0,5 P, Vorteil 0,75 P, Nachteil 0,75 P), z. B.:</p><ul>
<li><b>Interview</b> mit Lageristen: + Detailwissen und Hintergründe (z. B. „inoffizielle“ Lagerplätze) können nachgefragt werden; − zeitaufwendig, subjektive Darstellung.</li>
<li><b>Beobachtung</b> (Mitlaufen bei der Kommissionierung): + reale Abläufe und Fehlerquellen werden sichtbar; − Beobachtete verhalten sich evtl. anders, nur Momentaufnahme.</li>
<li><b>Fragebogen</b>: + viele Mitarbeitende (auch Schichtdienst) mit wenig Aufwand erreichbar, gut auswertbar; − keine Rückfragen möglich, geringe Rücklaufquote.</li>
<li><b>Dokumentenanalyse</b> (Excel-Listen, Lieferscheine): + objektive Daten/Mengengerüst; − Dokumente sind ggf. unvollständig oder veraltet.</li>
</ul>`,
        keywords: ["interview|befragung", "beobachtung", "fragebogen", "dokumentenanalyse|dokument", "vorteil|+", "nachteil|-|−", "aufwand|zeit"]
      },
      {
        id: "ga1-sim-3-1b", part: "GA1", topic: "ga1-projektmanagement", type: "text", difficulty: 2, points: 4,
        question: `<b>Aufgabe 1 b)</b> Die Geschäftsführung formuliert als Projektziel: „Die Kommissionierung soll besser werden.“ Erläutern Sie, warum dieses Ziel ungeeignet ist, und formulieren Sie es nach der <b>SMART</b>-Regel um. Geben Sie die Bedeutung der fünf Buchstaben an.`,
        solution: `<p><b>Kritik</b> (1 P): Das Ziel ist nicht messbar, nicht terminiert und unspezifisch – die Zielerreichung kann nicht überprüft werden.</p>
<p><b>SMART</b> (1,5 P): <b>S</b>pezifisch, <b>M</b>essbar, <b>A</b>kzeptiert/attraktiv (bzw. erreichbar), <b>R</b>ealistisch, <b>T</b>erminiert.</p>
<p><b>Beispiel</b> (1,5 P): „Bis zum <b>31.03.2027</b> wird mit LagerFlow die Fehlerquote bei der Kommissionierung von derzeit 2,4 % auf <b>unter 0,5 %</b> der Auftragspositionen gesenkt; Messung über die Reklamationsstatistik des ERP-Systems.“</p>`,
        keywords: ["spezifisch", "messbar", "akzeptiert|attraktiv|erreichbar", "realistisch", "terminiert", "%|prozent|quote", "bis zum|bis 20"]
      },
      {
        id: "ga1-sim-3-1c", part: "GA1", topic: "ga1-wirtschaftlichkeit", type: "numeric", difficulty: 1, points: 6,
        context: KOSTEN,
        question: `<b>Aufgabe 1 c)</b> Berechnen Sie die <b>gesamten Projektkosten</b>.`,
        answer: 38120, tolerance: 0.01, unit: "€",
        solution: `<table>
<tr><td>Softwareentwicklung</td><td>3 · 18 · 8 h · 62,00 € = 432 h · 62,00 €</td><td>26.784,00 €</td></tr>
<tr><td>Projektleitung</td><td>6 · 8 h · 78,00 € = 48 h · 78,00 €</td><td>3.744,00 €</td></tr>
<tr><td>Barcode-Scanner</td><td>8 · 649,00 €</td><td>5.192,00 €</td></tr>
<tr><td>Lizenz</td><td></td><td>2.400,00 €</td></tr>
<tr><td><b>Summe</b></td><td></td><td><b>38.120,00 €</b></td></tr>
</table><p>Punkte: Personalkosten 3 P, Sachkosten 2 P, Summe 1 P.</p>`
      },
      {
        id: "ga1-sim-3-1d", part: "GA1", topic: "ga1-wirtschaftlichkeit", type: "numeric", difficulty: 2, points: 5,
        context: `${KOSTEN}<p>Erwartete Effekte nach Einführung:</p><ul>
<li>3 Lageristen benötigen heute je 1,5 Stunden pro Arbeitstag für Suche und Listenpflege, mit LagerFlow nur noch 0,5 Stunden. Kostensatz Lagerist: 32,00 € je Stunde, 220 Arbeitstage pro Jahr.</li>
<li>Durch weniger Fehlkommissionierungen werden Reklamations- und Nachlieferkosten von 4.800,00 € pro Jahr eingespart.</li>
<li>Für Wartung und Support von LagerFlow fallen laufende Kosten von 3.000,00 € pro Jahr an.</li>
</ul>`,
        question: `<b>Aufgabe 1 d)</b> Berechnen Sie die <b>Amortisationsdauer</b> des Projekts in Jahren (zwei Nachkommastellen).`,
        answer: 1.66, tolerance: 0.01, unit: "Jahre",
        solution: `<p>Personaleinsparung: 3 · (1,5 h − 0,5 h) · 220 Tage · 32,00 €/h = 3 · 1 · 220 · 32 = 21.120,00 € pro Jahr</p>
<p>Jährlicher Nettonutzen: 21.120,00 € + 4.800,00 € − 3.000,00 € = <b>22.920,00 €</b></p>
<p>Amortisationsdauer = Investition / jährlicher Nettonutzen = 38.120,00 € / 22.920,00 € ≈ <b>1,66 Jahre</b> (ca. 20 Monate)</p>
<p>Punkte: Einsparung 2 P, Nettonutzen 1 P, Formel und Ergebnis 2 P.</p>`,
        explanation: "Häufiger Fehler: Die laufenden Kosten werden vergessen oder zur Investition addiert. Bei der statischen Amortisationsrechnung wird die einmalige Investition durch den jährlichen Rückfluss (Einsparungen minus laufende Kosten) geteilt."
      },
      {
        id: "ga1-sim-3-1e", part: "GA1", topic: "ga1-projektmanagement", type: "text", difficulty: 2, points: 5,
        question: `<b>Aufgabe 1 e)</b> Im Rahmen der Projektplanung soll eine <b>Risikoanalyse</b> erstellt werden. Beschreiben Sie, wie Risiken bewertet werden, und nennen Sie <b>zwei</b> konkrete Projektrisiken von „LagerFlow“ mit je einer Gegenmaßnahme.`,
        solution: `<p><b>Bewertung</b> (1 P): Jedes Risiko wird nach <b>Eintrittswahrscheinlichkeit</b> und <b>Schadensausmaß (Auswirkung)</b> bewertet; das Produkt ergibt die Risikokennzahl bzw. die Position in einer Risikomatrix. Daraus werden Maßnahmen (vermeiden, vermindern, übertragen, akzeptieren) und Verantwortliche abgeleitet.</p>
<p><b>Risiken mit Maßnahme</b> (je 2 P), z. B.:</p><ul>
<li>WLAN-Abdeckung in den Hallen unzureichend ⇒ frühzeitige Funkausleuchtung, Offline-Fähigkeit der Scanner-App mit späterer Synchronisation.</li>
<li>Schnittstelle zum ERP-System schlecht dokumentiert ⇒ frühzeitiger Prototyp/Durchstich, Ansprechpartner beim ERP-Hersteller vertraglich sichern.</li>
<li>Geringe Akzeptanz bei langjährigen Lageristen ⇒ frühe Einbindung (Key-User), Schulungen.</li>
<li>Ausfall eines Entwicklers ⇒ Wissensverteilung (Pair Programming, Dokumentation), Puffer im Zeitplan.</li>
</ul>`,
        keywords: ["wahrscheinlichkeit", "auswirkung|schadensausmaß|schadensausmass|schaden", "matrix|risikokennzahl|produkt", "wlan|netz|offline", "schnittstelle|erp", "akzeptanz|schulung", "maßnahme|massnahme"]
      },
      // ---------- Aufgabe 2: Datenmodellierung (26 P) ----------
      {
        id: "ga1-sim-3-2a", part: "GA1", topic: "ga1-datenmodell", type: "text", difficulty: 3, points: 8,
        context: `<p>Für LagerFlow gelten folgende Sachverhalte:</p><ul>
<li>Ein Lieferant (Lieferantennr., Name, Anschrift) liefert beliebig viele Artikel; jeder Artikel (Artikelnr., EAN, Bezeichnung, Nettopreis) wird von genau einem Hauptlieferanten bezogen.</li>
<li>Ein Lagerplatz wird durch Halle, Regal und Fach beschrieben. Ein Artikel kann auf mehreren Lagerplätzen liegen und ein Lagerplatz mehrere Artikel enthalten; zu speichern ist die Menge je Artikel und Lagerplatz.</li>
<li>Kunden (Kundennr., Name, Kundengruppe, Anschrift) erteilen Aufträge (Auftragsnr., Datum). Ein Auftrag besteht aus mindestens einer Position; jede Position enthält genau einen Artikel, die Menge und den vereinbarten Preis.</li>
</ul>`,
        question: `<b>Aufgabe 2 a)</b> Erstellen Sie ein <b>Relationenmodell</b> (Tabellen mit Attributen) für die beschriebenen Sachverhalte. Kennzeichnen Sie Primärschlüssel und Fremdschlüssel.`,
        solution: `<pre><code>Lieferant        (PK lieferant_nr, name, anschrift)
Artikel          (PK artikel_nr, ean, bezeichnung, nettopreis, FK lieferant_nr)
Lagerplatz       (PK lagerplatz_id, halle, regal, fach)
Bestand          (PK/FK artikel_nr, PK/FK lagerplatz_id, menge)
Kunde            (PK kunden_nr, name, kundengruppe, anschrift)
Auftrag          (PK auftrag_nr, datum, FK kunden_nr)
Auftragsposition (PK/FK auftrag_nr, PK pos_nr, FK artikel_nr, menge, preis)</code></pre>
<p>Alternativ: Lagerplatz mit zusammengesetztem Schlüssel (halle, regal, fach) bzw. Auftragsposition mit Schlüssel (auftrag_nr, artikel_nr).</p>
<p>Punkte: Lieferant/Artikel mit FK 2 P; Lagerplatz 1 P; m:n-Auflösung „Bestand“ mit Menge 2 P; Kunde/Auftrag 1 P; Auftragsposition mit Preis 2 P.</p>`,
        keywords: ["lieferant", "artikel", "lagerplatz", "bestand|artikel_lagerplatz|lagerbestand", "menge", "auftragsposition|position", "fremdschlüssel|fremdschluessel|fk", "primärschlüssel|primaerschluessel|pk"]
      },
      {
        id: "ga1-sim-3-2b", part: "GA1", topic: "ga1-datenmodell", type: "text", difficulty: 3, points: 6,
        context: `<p>Wareneingänge werden derzeit in folgender Tabelle erfasst (Primärschlüssel: LSNr + PosNr):</p>
<table>
<tr><th>LSNr</th><th>PosNr</th><th>Datum</th><th>LiefNr</th><th>LiefName</th><th>EAN</th><th>Bezeichnung</th><th>Pfand</th><th>Menge</th></tr>
<tr><td>LS-881</td><td>1</td><td>2026-11-23</td><td>4711</td><td>Brauerei Kühn</td><td>4012345000017</td><td>Pils 20×0,5 l</td><td>3,10</td><td>120</td></tr>
<tr><td>LS-881</td><td>2</td><td>2026-11-23</td><td>4711</td><td>Brauerei Kühn</td><td>4012345000024</td><td>Radler 20×0,5 l</td><td>3,10</td><td>40</td></tr>
<tr><td>LS-882</td><td>1</td><td>2026-11-23</td><td>5020</td><td>Quelle Heidetal</td><td>4098765000013</td><td>Mineralwasser 12×0,7 l</td><td>3,30</td><td>200</td></tr>
</table>`,
        question: `<b>Aufgabe 2 b)</b> Benennen Sie die Abhängigkeiten, die gegen die 2. bzw. 3. Normalform verstoßen, und überführen Sie die Tabelle in die <b>3. Normalform</b>.`,
        solution: `<p><b>Verstöße</b> (2 P):</p><ul>
<li><b>2. NF</b>: Datum, LiefNr und LiefName hängen nur von <i>LSNr</i> (Teil des Schlüssels) ab; Bezeichnung und Pfand hängen nur von EAN ab ⇒ partielle bzw. nicht voll funktionale Abhängigkeit.</li>
<li><b>3. NF</b>: LiefNr → LiefName (transitiv über LSNr), EAN → Bezeichnung, Pfand (transitiv über die Position).</li>
</ul>
<p><b>3. NF</b> (4 P):</p>
<pre><code>Lieferant           (PK lief_nr, lief_name)
Lieferschein        (PK ls_nr, datum, FK lief_nr)
Artikel             (PK ean, bezeichnung, pfand)
Lieferscheinposition(PK/FK ls_nr, PK pos_nr, FK ean, menge)</code></pre>`,
        keywords: ["partiell|teil des schlüssels|teil des schluessels|2. nf", "transitiv|3. nf", "lieferant", "lieferschein", "artikel", "position", "ean"]
      },
      {
        id: "ga1-sim-3-2c", part: "GA1", topic: "ga1-datenmodell", type: "mc", difficulty: 1, points: 3,
        question: `<b>Aufgabe 2 c)</b> In der nicht normalisierten Tabelle aus Aufgabe 2 b) erhöht sich der Pfand einer Bierkiste. Der neue Wert muss in über 2.000 Zeilen geändert werden; wird eine Zeile übersehen, sind die Daten widersprüchlich. Um welche Art von Anomalie handelt es sich?`,
        options: ["Einfügeanomalie", "Löschanomalie", "Änderungsanomalie (Update-Anomalie)", "Phantom Read", "Deadlock"],
        correct: [2],
        solution: `Es handelt sich um eine <b>Änderungsanomalie</b>: Redundant gespeicherte Werte müssen an vielen Stellen geändert werden, sonst entstehen Inkonsistenzen. Phantom Read und Deadlock sind Probleme paralleler Transaktionen, keine Normalisierungsanomalien.`
      },
      {
        id: "ga1-sim-3-2d", part: "GA1", topic: "ga1-datenmodell", type: "text", difficulty: 2, points: 5,
        question: `<b>Aufgabe 2 d)</b> Für die Tabelle <code>Artikel</code> sollen Datentypen festgelegt werden. Ein Kollege schlägt vor: <code>ean INTEGER</code>, <code>nettopreis FLOAT</code>, <code>mhd VARCHAR(10)</code>. Beurteilen Sie die drei Vorschläge und nennen Sie jeweils einen besser geeigneten Datentyp mit Begründung.`,
        solution: `<ul>
<li><b>ean</b> (2 P): Die EAN ist ein Identifikator, mit dem nicht gerechnet wird; 13 Stellen überschreiten zudem den Wertebereich eines 32-Bit-INTEGER, führende Nullen gingen verloren. Besser: <code>CHAR(13)</code> (feste Länge).</li>
<li><b>nettopreis</b> (2 P): FLOAT ist ein binärer Gleitkommatyp mit Rundungsfehlern (z. B. 0,1 nicht exakt darstellbar), ungeeignet für Geldbeträge. Besser: <code>DECIMAL(10,2)</code> bzw. <code>NUMERIC</code>.</li>
<li><b>mhd</b> (1 P): Als Text sind Datumsvergleiche, Sortierung und Plausibilitätsprüfungen (z. B. „MHD in weniger als 90 Tagen“) unsicher. Besser: <code>DATE</code>.</li>
</ul>`,
        keywords: ["char|varchar", "führende null|fuehrende null|nicht gerechnet|identifikator|wertebereich", "decimal|numeric", "rundung", "date", "vergleich|sortier"]
      },
      {
        id: "ga1-sim-3-2e", part: "GA1", topic: "ga1-datenmodell", type: "text", difficulty: 2, points: 4,
        question: `<b>Aufgabe 2 e)</b> Erläutern Sie den Begriff <b>referenzielle Integrität</b> am Beispiel der Tabellen <code>Kunde</code> und <code>Auftrag</code> und begründen Sie, welche Löschregel (<code>ON DELETE CASCADE</code>, <code>SET NULL</code> oder <code>RESTRICT</code>) für den Fremdschlüssel <code>auftrag.kunden_nr</code> sinnvoll ist.`,
        solution: `<ul>
<li><b>Referenzielle Integrität</b> (2 P): Jeder Fremdschlüsselwert muss auf einen existierenden Primärschlüsselwert der referenzierten Tabelle verweisen (oder NULL sein, falls erlaubt). Ein Auftrag darf also nur eine Kundennummer enthalten, die in <code>Kunde</code> existiert; das DBMS verhindert „verwaiste“ Aufträge beim Einfügen, Ändern und Löschen.</li>
<li><b>Löschregel</b> (2 P): <b>RESTRICT</b> (bzw. NO ACTION): Ein Kunde mit Aufträgen kann nicht gelöscht werden. Aufträge sind buchhaltungsrelevante Belege mit gesetzlichen Aufbewahrungspflichten und dürfen nicht automatisch mitgelöscht werden (CASCADE); SET NULL würde die Zuordnung des Auftrags zum Kunden zerstören. Inaktive Kunden werden stattdessen als „gesperrt/inaktiv“ markiert.</li>
</ul>`,
        keywords: ["fremdschlüssel|fremdschluessel", "primärschlüssel|primaerschluessel", "existier", "restrict|no action", "cascade", "aufbewahr|beleg|buchhaltung", "verwaist|inkonsisten"]
      },
      // ---------- Aufgabe 3: Objektorientierter Entwurf mit UML (26 P) ----------
      {
        id: "ga1-sim-3-3a", part: "GA1", topic: "ga1-uml", type: "text", difficulty: 3, points: 8,
        context: `<p>Für die Auftragsverwaltung wurden folgende Anforderungen an das Klassenmodell formuliert:</p><ul>
<li>Es gibt keine Objekte der Klasse <code>Artikel</code> selbst, sondern nur von den Unterklassen <code>Getraenk</code> und <code>Leergut</code>. Jeder Artikel hat eine Artikelnummer, eine Bezeichnung und einen Nettopreis sowie eine Methode <code>getPfand()</code>, die erst in den Unterklassen implementiert wird.</li>
<li>Ein <code>Getraenk</code> hat zusätzlich eine Füllmenge in Litern und ein Mindesthaltbarkeitsdatum. Jedes Getränk ist genau einem Leergut-Artikel (z. B. „Kiste 20×0,5 l“) zugeordnet, dessen Pfand <code>getPfand()</code> liefert.</li>
<li>Ein <code>Leergut</code>-Artikel hat einen Pfandbetrag.</li>
<li>Ein <code>Kunde</code> erteilt beliebig viele Aufträge; jeder <code>Auftrag</code> gehört zu genau einem Kunden und hat eine Auftragsnummer, ein Datum und eine Methode <code>berechneSumme()</code>.</li>
<li>Ein Auftrag besteht aus mindestens einer <code>Auftragsposition</code> (Menge, Methode <code>berechnePositionswert()</code>); Positionen existieren nicht ohne ihren Auftrag. Jede Position bezieht sich auf genau einen Artikel.</li>
</ul>`,
        question: `<b>Aufgabe 3 a)</b> Erstellen Sie das <b>UML-Klassendiagramm</b> in Textnotation mit Attributen (Sichtbarkeit, Datentyp), Methoden, Beziehungsarten und Multiplizitäten.`,
        solution: `<pre><code>{abstract} Klasse Artikel
  - artikelNr : int
  - bezeichnung : String
  - nettopreis : double
  + getPfand() : double {abstract}

Klasse Getraenk  erbt von Artikel       (Generalisierung ——▷ Artikel)
  - fuellmengeLiter : double
  - mhd : Date
  + getPfand() : double                // liefert leergut.getPfand()

Klasse Leergut  erbt von Artikel        (Generalisierung ——▷ Artikel)
  - pfandbetrag : double
  + getPfand() : double                // liefert pfandbetrag

Klasse Kunde
  - kundenNr : int
  - name : String

Klasse Auftrag
  - auftragsNr : int
  - datum : Date
  + berechneSumme() : double

Klasse Auftragsposition
  - menge : int
  + berechnePositionswert() : double

Beziehungen:
  Getraenk "0..*" ——&gt; "1" Leergut               (gerichtete Assoziation „hat Pfandgebinde“)
  Kunde    "1"    ——— "0..*" Auftrag             (erteilt)
  Auftrag  "1" ◆——— "1..*" Auftragsposition      (Komposition, Raute am Auftrag)
  Auftragsposition "0..*" ——— "1" Artikel        (bezieht sich auf)</code></pre>
<p>Punkte: abstrakte Klasse mit abstrakter Methode 1,5 P; Unterklassen mit Generalisierung 2 P; Kunde/Auftrag/Position mit Attributen und Methoden 1,5 P; Komposition 1 P; übrige Assoziationen und Multiplizitäten 2 P.</p>`,
        keywords: ["abstract|abstrakt", "erbt|generalisierung", "getpfand", "komposition|◆|raute", "1..*", "0..*", "berechnesumme", "leergut"]
      },
      {
        id: "ga1-sim-3-3b", part: "GA1", topic: "ga1-uml", type: "text", difficulty: 2, points: 6,
        context: `<p>Ablauf des Wareneingangs: Der Lagerist scannt den Lieferschein und prüft die gelieferte Menge. Weicht die Menge vom Lieferschein ab, wird die Abweichung erfasst. Anschließend wird das Mindesthaltbarkeitsdatum geprüft: Beträgt die Resthaltbarkeit weniger als 90 Tage, wird die Ware zurückgewiesen und der Vorgang endet. Andernfalls werden <b>gleichzeitig</b> der Lagerplatz zugewiesen und die Ware eingelagert sowie der Wareneingang an das ERP-System gebucht. Sind beide Tätigkeiten abgeschlossen, endet der Vorgang.</p>`,
        question: `<b>Aufgabe 3 b)</b> Beschreiben Sie das zugehörige <b>UML-Aktivitätsdiagramm</b> in Textnotation. Verwenden Sie Startknoten, Aktionen, Verzweigungen mit Bedingungen, Zusammenführungen, Gabelung/Vereinigung und Endknoten.`,
        solution: `<pre><code>(●) Startknoten
 → [Lieferschein scannen]
 → [Menge prüfen]
 → ◇ Verzweigung
      [Menge weicht ab]  → [Abweichung erfassen] → ◇ Zusammenführung
      [Menge stimmt]     ──────────────────────→ ◇ Zusammenführung
 → [MHD prüfen]
 → ◇ Verzweigung
      [Resthaltbarkeit &lt; 90 Tage]  → [Ware zurückweisen] → (◉) Endknoten
      [Resthaltbarkeit &gt;= 90 Tage]
 → ▬ Gabelung (Fork)
      ├─ [Lagerplatz zuweisen] → [Ware einlagern] ─┐
      └─ [Wareneingang an ERP buchen] ─────────────┤
 → ▬ Vereinigung (Join)
 → (◉) Endknoten</code></pre>
<p>Punkte: Start/Ende 1 P; Aktionen in richtiger Reihenfolge 1,5 P; erste Verzweigung mit Zusammenführung 1 P; MHD-Verzweigung mit Bedingungen 1 P; Gabelung/Vereinigung 1,5 P.</p>`,
        keywords: ["start", "ende|endknoten", "verzweigung|entscheidung", "zusammenführung|zusammenfuehrung|merge", "gabelung|fork|parallel", "vereinigung|join|synchronisation", "90", "zurückweisen|zurueckweisen"]
      },
      {
        id: "ga1-sim-3-3c", part: "GA1", topic: "ga1-uml", type: "mc", difficulty: 2, points: 3,
        question: `<b>Aufgabe 3 c)</b> Welcher Sachverhalt aus dem Getränkegroßhandel wird korrekt als <b>Aggregation</b> modelliert?`,
        options: [
          "Eine Auftragsposition existiert nur innerhalb ihres Auftrags und wird mit ihm gelöscht.",
          "Ein Getränk ist ein spezieller Artikel.",
          "Eine Auslieferungstour fasst mehrere Aufträge zusammen; wird die Tour storniert, bestehen die Aufträge weiter und werden einer anderen Tour zugeordnet.",
          "Ein Lagerplatz ist fester Bestandteil genau einer Halle und wird beim Abriss der Halle mit gelöscht.",
          "Die Klasse ScannerApp implementiert die Schnittstelle Synchronisierbar."
        ],
        correct: [2],
        solution: `Die <b>Aggregation</b> (leere Raute am Ganzen) beschreibt eine Teil-Ganzes-Beziehung, bei der die Teile unabhängig vom Ganzen existieren können: Aufträge bestehen auch ohne Tour. Auftragsposition und Lagerplatz sind existenzabhängig (Komposition), „ist ein“ ist eine Generalisierung, die Implementierung einer Schnittstelle ist eine Realisierung.`
      },
      {
        id: "ga1-sim-3-3d", part: "GA1", topic: "ga1-architektur", type: "text", difficulty: 3, points: 5,
        question: `<b>Aufgabe 3 d)</b> Unterschreitet ein Artikel den Mindestbestand, sollen der Einkauf per E-Mail und das Lager-Dashboard informiert werden. Später sollen weitere Empfänger (z. B. ein automatischer Bestellvorschlag) ergänzt werden können, <b>ohne</b> die Klasse <code>Lagerbestand</code> zu ändern. Beschreiben Sie, wie dies mit dem <b>Entwurfsmuster Beobachter (Observer)</b> umgesetzt wird, stellen Sie die beteiligten Klassen/Schnittstellen in Textnotation dar und nennen Sie einen Vorteil.`,
        solution: `<p><b>Prinzip</b> (1,5 P): Das beobachtete Objekt (Subjekt, hier <code>Lagerbestand</code>) verwaltet eine Liste von Beobachtern, die eine gemeinsame Schnittstelle implementieren. Bei einer relevanten Zustandsänderung (Mindestbestand unterschritten) ruft es bei allen registrierten Beobachtern dieselbe Methode auf; das Subjekt kennt nur die Schnittstelle, nicht die konkreten Klassen.</p>
<p><b>Klassen</b> (2,5 P):</p>
<pre><code>«interface» BestandsBeobachter
  + aktualisiere(artikelNr : int, bestand : int) : void

Klasse Lagerbestand
  - beobachter : List&lt;BestandsBeobachter&gt;
  + registriere(b : BestandsBeobachter) : void
  + entferne(b : BestandsBeobachter) : void
  - benachrichtige(artikelNr : int, bestand : int) : void
  + bucheAbgang(artikelNr : int, menge : int) : void   // ruft benachrichtige() bei Unterschreitung

Klasse EinkaufMailer      realisiert BestandsBeobachter  (- - -▷)
Klasse DashboardAnzeige   realisiert BestandsBeobachter  (- - -▷)
Lagerbestand "1" ——&gt; "0..*" BestandsBeobachter</code></pre>
<p><b>Vorteil</b> (1 P): Lose Kopplung; neue Empfänger werden nur registriert (Open-Closed-Prinzip), Lagerbestand bleibt unverändert und ist separat testbar.</p>`,
        keywords: ["beobachter|observer", "subjekt|subject", "interface|schnittstelle", "registrier|anmelden|attach", "benachrichtig|notify", "aktualisiere|update", "lose kopplung|lose gekoppelt|open-closed|offen"]
      },
      {
        id: "ga1-sim-3-3e", part: "GA1", topic: "ga1-uml", type: "multi", difficulty: 2, points: 4,
        question: `<b>Aufgabe 3 e)</b> Welche Aussagen zu abstrakten Klassen und Schnittstellen sind <b>korrekt</b>?`,
        options: [
          "Von einer abstrakten Klasse können keine Objekte erzeugt werden.",
          "Eine abstrakte Klasse darf keine Attribute besitzen.",
          "Abstrakte Klassen und Methoden werden in UML kursiv oder mit {abstract} gekennzeichnet.",
          "Eine konkrete Unterklasse muss alle geerbten abstrakten Methoden implementieren.",
          "Die Realisierung einer Schnittstelle wird mit einer durchgezogenen Linie und gefüllter Pfeilspitze dargestellt.",
          "In Java kann eine Klasse gleichzeitig von mehreren abstrakten Klassen erben."
        ],
        correct: [0, 2, 3],
        solution: `Korrekt: keine Instanziierung abstrakter Klassen; Kennzeichnung kursiv bzw. {abstract}; konkrete Unterklassen müssen abstrakte Methoden implementieren. Falsch: Abstrakte Klassen dürfen Attribute und implementierte Methoden besitzen; die Realisierung wird mit <b>gestrichelter</b> Linie und hohlem Dreieck dargestellt; Java erlaubt nur Einfachvererbung von Klassen (aber die Implementierung mehrerer Interfaces).`
      },
      // ---------- Aufgabe 4: Architektur, Schnittstellen, Qualitätssicherung (24 P) ----------
      {
        id: "ga1-sim-3-4a", part: "GA1", topic: "ga1-architektur", type: "text", difficulty: 2, points: 6,
        question: `<b>Aufgabe 4 a)</b> LagerFlow soll als <b>Drei-Schichten-Architektur</b> realisiert werden. Beschreiben Sie die drei Schichten, ordnen Sie jeweils eine Komponente von LagerFlow zu und erläutern Sie zwei Vorteile dieser Architektur.`,
        solution: `<ul>
<li><b>Präsentationsschicht</b> (1 P): Benutzeroberflächen – Scanner-App auf den Handgeräten, Web-Dashboard für die Lagerleitung.</li>
<li><b>Logikschicht / Anwendungsschicht</b> (1 P): Geschäftsregeln und Abläufe – Prüfung des MHD, Lagerplatzvergabe, Mindestbestandsüberwachung, REST-API, ERP-Schnittstelle.</li>
<li><b>Datenhaltungsschicht</b> (1 P): Persistenz – relationale Datenbank mit Artikeln, Beständen, Aufträgen.</li>
<li><b>Vorteile</b> (je 1,5 P): Jede Schicht kommuniziert nur mit der benachbarten Schicht über definierte Schnittstellen ⇒ Austauschbarkeit (z. B. neue Scanner-Hardware/neues Frontend ohne Änderung der Logik), bessere Wartbarkeit und Testbarkeit, Skalierbarkeit (Logikschicht auf mehrere Server verteilbar), Sicherheit (kein direkter Datenbankzugriff von den Scannern), Wiederverwendung der Logik für mehrere Clients.</li>
</ul>`,
        keywords: ["präsentation|praesentation|oberfläche|oberflaeche", "logik|anwendung|geschäft|geschaeft", "daten|persistenz|datenbank", "austausch", "wartbar", "skalier", "schnittstelle"]
      },
      {
        id: "ga1-sim-3-4b", part: "GA1", topic: "ga1-architektur", type: "text", difficulty: 2, points: 4,
        question: `<b>Aufgabe 4 b)</b> Bei jedem Wareneingang sendet LagerFlow eine Nachricht im JSON-Format an das ERP-System. Erstellen Sie ein gültiges JSON-Dokument für folgenden Wareneingang:<br>Lieferschein <i>LS-881</i> vom <i>23.11.2026</i>, Lieferant <i>4711</i>; Positionen: EAN <i>4012345000017</i>, Menge <i>120</i>, MHD <i>31.05.2027</i> sowie EAN <i>4012345000024</i>, Menge <i>40</i>, MHD <i>15.03.2027</i>; Abweichung festgestellt: <i>nein</i>.`,
        solution: `<pre><code>{
  "lieferscheinNr": "LS-881",
  "datum": "2026-11-23",
  "lieferantNr": 4711,
  "abweichung": false,
  "positionen": [
    { "ean": "4012345000017", "menge": 120, "mhd": "2027-05-31" },
    { "ean": "4012345000024", "menge": 40,  "mhd": "2027-03-15" }
  ]
}</code></pre>
<p>Punkte: Objekt mit Schlüssel-Wert-Paaren und doppelten Anführungszeichen 1 P; Array der Positionen 1,5 P; passende Datentypen (EAN als String, Menge als Zahl, Boolean <code>false</code>, Datum ISO 8601) 1,5 P.</p>`,
        keywords: ["{", "[", "\"positionen\"|positionen", "false", "\"ean\"|ean", "2026-11-23", "120"]
      },
      {
        id: "ga1-sim-3-4c", part: "GA1", topic: "ga1-qualitaet", type: "numeric", difficulty: 2, points: 3,
        context: RABATT_CODE,
        question: `<b>Aufgabe 4 c)</b> Ermitteln Sie die <b>zyklomatische Komplexität nach McCabe</b> der Funktion <code>berechneRabatt</code>.`,
        answer: 4, tolerance: 0,
        solution: `<p>Die Funktion enthält drei binäre Entscheidungen (<code>menge &gt;= 100</code>, <code>menge &gt;= 500</code>, <code>istStammkunde</code>).</p><p>M = Anzahl binärer Entscheidungen + 1 = 3 + 1 = <b>4</b> (alternativ über den Kontrollflussgraphen: M = Kanten − Knoten + 2).</p>`
      },
      {
        id: "ga1-sim-3-4d", part: "GA1", topic: "ga1-qualitaet", type: "text", difficulty: 3, points: 4,
        context: RABATT_CODE,
        question: `<b>Aufgabe 4 d)</b> Geben Sie für die Funktion <code>berechneRabatt</code> die <b>minimale Anzahl</b> an Testfällen für eine vollständige <b>Anweisungsüberdeckung (C0)</b> und für eine vollständige <b>Zweigüberdeckung (C1)</b> an und nennen Sie passende Testfälle mit erwartetem Ergebnis.`,
        solution: `<ul>
<li><b>Anweisungsüberdeckung C0</b> (1,5 P): <b>1 Testfall</b> genügt, z. B. (menge = 600, istStammkunde = true) ⇒ erwartet 0,10 – dabei werden alle Anweisungen ausgeführt.</li>
<li><b>Zweigüberdeckung C1</b> (2,5 P): <b>3 Testfälle</b>, da jede Bedingung einmal wahr und einmal falsch sein muss und der innere Falsch-Zweig nur bei 100 ≤ menge &lt; 500 erreicht wird:
<table><tr><th>TF</th><th>menge</th><th>Stammkunde</th><th>Zweige</th><th>Erwartung</th></tr>
<tr><td>1</td><td>600</td><td>true</td><td>außen W, innen W, Stamm W</td><td>0,10</td></tr>
<tr><td>2</td><td>200</td><td>false</td><td>außen W, innen F, Stamm F</td><td>0,05</td></tr>
<tr><td>3</td><td>50</td><td>false</td><td>außen F</td><td>0,00</td></tr></table></li>
</ul>`,
        keywords: ["1", "3", "anweisung", "zweig", "600", "0,10|0.10|0,1|0.1", "0,05|0.05", "true|false"]
      },
      {
        id: "ga1-sim-3-4e", part: "GA1", topic: "ga1-devops", type: "order", difficulty: 2, points: 4,
        question: `<b>Aufgabe 4 e)</b> Für LagerFlow wird eine CI/CD-Pipeline eingerichtet. Bringen Sie die Schritte in die richtige Reihenfolge.`,
        items: [
          "Entwicklerin pusht ihre Änderungen in das Git-Repository",
          "CI-Server kompiliert den Code und erstellt das Build-Artefakt",
          "Automatisierte Unit-Tests werden ausgeführt",
          "Deployment des Artefakts in die Staging-Umgebung",
          "Integrations- und Abnahmetests auf der Staging-Umgebung",
          "Freigabe und Deployment in die Produktionsumgebung"
        ],
        solution: `Push → Build → Unit-Tests → Staging-Deployment → Integrations-/Abnahmetests → Produktions-Deployment. Schlägt ein Schritt fehl, bricht die Pipeline ab und das Team erhält eine Rückmeldung („fail fast“).`
      },
      {
        id: "ga1-sim-3-4f", part: "GA1", topic: "ga1-qualitaet", type: "mc", difficulty: 1, points: 3,
        question: `<b>Aufgabe 4 f)</b> Anforderung: „Die Scanner-App quittiert einen Scan innerhalb von 0,5 Sekunden, auch wenn 40 Geräte gleichzeitig arbeiten.“ Welchem Qualitätsmerkmal nach ISO/IEC 25010 ist diese Anforderung zuzuordnen?`,
        options: ["Funktionale Eignung", "Leistungseffizienz (Performance)", "Kompatibilität", "Wartbarkeit", "Übertragbarkeit / Flexibilität"],
        correct: [1],
        solution: `Antwortzeit- und Lastanforderungen gehören zur <b>Leistungseffizienz</b> (Zeitverhalten, Ressourcenverbrauch, Kapazität).`
      }
    ]
  });
})();

/* =====================================================================
   GA2 – Simulation 1: Ticketsystem eines IT-Dienstleisters
   ===================================================================== */
(function () {
  const SQL_SETUP = `CREATE TABLE kunde (kunde_id INTEGER PRIMARY KEY, firma TEXT NOT NULL, ort TEXT NOT NULL, sla_stufe TEXT NOT NULL);
CREATE TABLE mitarbeiter (ma_id INTEGER PRIMARY KEY, name TEXT NOT NULL, team TEXT NOT NULL);
CREATE TABLE ticket (ticket_id INTEGER PRIMARY KEY, kunde_id INTEGER NOT NULL REFERENCES kunde(kunde_id), ma_id INTEGER REFERENCES mitarbeiter(ma_id), titel TEXT NOT NULL, prioritaet INTEGER NOT NULL, status TEXT NOT NULL, erstellt_am TEXT NOT NULL, geloest_am TEXT);
CREATE TABLE zeiterfassung (ze_id INTEGER PRIMARY KEY, ticket_id INTEGER NOT NULL REFERENCES ticket(ticket_id), ma_id INTEGER NOT NULL REFERENCES mitarbeiter(ma_id), datum TEXT NOT NULL, minuten INTEGER NOT NULL);
INSERT INTO kunde VALUES (1,'Bäckerei Kranz','Leipzig','Gold'),(2,'Autohaus Stern','Halle','Silber'),(3,'Kanzlei Roth & Partner','Leipzig','Gold'),(4,'Stadtwerke Delitzsch','Delitzsch','Platin'),(5,'Praxis Dr. Abel','Leipzig','Silber'),(6,'Möbel Lindner','Halle','Bronze'),(7,'Hotel Elsterblick','Leipzig','Silber'),(8,'Druckerei Vogt','Markkleeberg','Bronze');
INSERT INTO mitarbeiter VALUES (1,'Jana Becker','1st-Level'),(2,'Tobias Kern','1st-Level'),(3,'Mehmet Aydin','2nd-Level'),(4,'Sophie Lang','2nd-Level'),(5,'Lukas Brandt','Netzwerk'),(6,'Clara Wolff','Netzwerk'),(7,'Felix Hahn','2nd-Level');
INSERT INTO ticket VALUES
(1,1,1,'Drucker druckt nicht',3,'geschlossen','2026-10-01','2026-10-01'),
(2,4,5,'VPN-Verbindung bricht ab',1,'in Bearbeitung','2026-10-05',NULL),
(3,3,3,'Outlook startet nicht',2,'geloest','2026-10-06','2026-10-07'),
(4,2,NULL,'Neuen Arbeitsplatz einrichten',3,'offen','2026-10-08',NULL),
(5,4,6,'Firewall-Regel anpassen',2,'geloest','2026-10-09','2026-10-12'),
(6,5,4,'Praxissoftware reagiert langsam',1,'offen','2026-10-12',NULL),
(7,1,2,'Kassensystem offline',1,'geloest','2026-10-13','2026-10-13'),
(8,6,NULL,'Passwort zurücksetzen',3,'offen','2026-10-14',NULL),
(9,3,3,'Datenbank-Backup fehlgeschlagen',1,'in Bearbeitung','2026-10-15',NULL),
(10,7,1,'WLAN im Tagungsraum gestört',2,'in Bearbeitung','2026-10-16',NULL),
(11,4,NULL,'Server-Zertifikat läuft ab',1,'offen','2026-10-19',NULL),
(12,2,4,'Lizenzverlängerung Office',3,'geloest','2026-10-20','2026-10-22');
INSERT INTO zeiterfassung VALUES
(1,1,1,'2026-10-01',30),(2,2,5,'2026-10-05',120),(3,2,5,'2026-10-06',90),(4,3,3,'2026-10-06',60),(5,3,3,'2026-10-07',45),
(6,5,6,'2026-10-09',150),(7,5,5,'2026-10-12',30),(8,6,4,'2026-10-12',75),(9,7,2,'2026-10-13',40),(10,7,3,'2026-10-13',95),
(11,9,3,'2026-10-15',180),(12,9,4,'2026-10-16',60),(13,10,1,'2026-10-16',50),(14,12,4,'2026-10-20',20),(15,12,4,'2026-10-22',25);`;

  const SQL_CONTEXT = `<p>Die Datenbank des Ticketsystems „HelpDesk+“ enthält folgende Tabellen (Auszug, SQLite-Dialekt; Datumswerte als Text im Format JJJJ-MM-TT):</p>
<table>
<tr><th>Tabelle</th><th>Spalten</th></tr>
<tr><td><b>kunde</b></td><td><u>kunde_id</u> INTEGER, firma TEXT, ort TEXT, sla_stufe TEXT ('Bronze', 'Silber', 'Gold', 'Platin')</td></tr>
<tr><td><b>mitarbeiter</b></td><td><u>ma_id</u> INTEGER, name TEXT, team TEXT</td></tr>
<tr><td><b>ticket</b></td><td><u>ticket_id</u> INTEGER, kunde_id INTEGER (FK → kunde), ma_id INTEGER (FK → mitarbeiter, NULL = noch nicht zugewiesen), titel TEXT, prioritaet INTEGER (1 = hoch … 3 = niedrig), status TEXT ('offen', 'in Bearbeitung', 'geloest', 'geschlossen'), erstellt_am TEXT, geloest_am TEXT (NULL, solange nicht gelöst)</td></tr>
<tr><td><b>zeiterfassung</b></td><td><u>ze_id</u> INTEGER, ticket_id INTEGER (FK → ticket), ma_id INTEGER (FK → mitarbeiter), datum TEXT, minuten INTEGER</td></tr>
</table>
<p>Auszug aus der Tabelle <b>ticket</b>:</p>
<table>
<tr><th>ticket_id</th><th>kunde_id</th><th>ma_id</th><th>titel</th><th>prioritaet</th><th>status</th><th>erstellt_am</th><th>geloest_am</th></tr>
<tr><td>2</td><td>4</td><td>5</td><td>VPN-Verbindung bricht ab</td><td>1</td><td>in Bearbeitung</td><td>2026-10-05</td><td>NULL</td></tr>
<tr><td>3</td><td>3</td><td>3</td><td>Outlook startet nicht</td><td>2</td><td>geloest</td><td>2026-10-06</td><td>2026-10-07</td></tr>
<tr><td>4</td><td>2</td><td>NULL</td><td>Neuen Arbeitsplatz einrichten</td><td>3</td><td>offen</td><td>2026-10-08</td><td>NULL</td></tr>
<tr><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td></tr>
</table>`;

  const TICKET_KLASSEN = `<p>Für die neue Version von „HelpDesk+“ wurde folgendes Klassendiagramm (Textnotation) entworfen:</p>
<pre><code>{abstract} Ticket
  - nummer : int
  - titel : String
  - prioritaet : int                  // nur 1, 2 oder 3 zulässig
  - erstelltAm : LocalDateTime
  + Ticket(nummer : int, titel : String, prioritaet : int, erstelltAm : LocalDateTime)
  + getPrioritaet() : int
  + getErstelltAm() : LocalDateTime
  + setPrioritaet(p : int) : void      // ungültiger Wert ⇒ IllegalArgumentException
  + berechneFaelligkeit() : LocalDateTime {abstract}

StoerungsTicket  erbt von Ticket
  - betroffeneNutzer : int
  + StoerungsTicket(nummer, titel, prioritaet, erstelltAm, betroffeneNutzer : int)
  + berechneFaelligkeit() : LocalDateTime

ServiceAnfrage  erbt von Ticket
  + berechneFaelligkeit() : LocalDateTime   // immer erstelltAm + 5 Tage</code></pre>
<p>Reaktionsfristen für Störungen: Priorität 1 = 240 Minuten, Priorität 2 = 480 Minuten, Priorität 3 = 1440 Minuten. Sind <b>mehr als 50</b> Nutzer betroffen, halbiert sich die Frist.<br>Hinweis: <code>LocalDateTime</code> besitzt die Methoden <code>plusMinutes(long)</code> und <code>plusDays(long)</code>, die jeweils ein neues Objekt zurückgeben.</p>`;

  const ESKALATION = `<pre><code>funktion eskalationsstufe(wartezeiten: Array von Ganzzahl): Ganzzahl
  stufe ← 0
  summe ← 0
  für i ← 0 bis länge(wartezeiten) - 1
    summe ← summe + wartezeiten[i]
    wenn wartezeiten[i] &gt; 60 dann
      stufe ← stufe + 2
    sonst wenn summe &gt; 100 dann
      stufe ← stufe + 1
      summe ← 0
    ende wenn
  ende für
  rückgabe stufe
ende funktion</code></pre>`;

  AP2.exams.push({
    id: "ga2-sim-1",
    part: "GA2",
    title: "Simulation GA2 #1 – Ticketsystem „HelpDesk+“ eines IT-Dienstleisters",
    minutes: 90,
    scenario: `<p>Sie sind Anwendungsentwicklerin bzw. Anwendungsentwickler bei der <b>SaxIT Services GmbH</b> in Leipzig. Das Unternehmen betreut mit 60 Beschäftigten die IT von rund 150 kleinen und mittleren Unternehmen (Kanzleien, Arztpraxen, Handwerksbetriebe, Stadtwerke).</p>
<p>Kundenanfragen werden im selbst entwickelten Ticketsystem <b>„HelpDesk+“</b> erfasst. Jeder Kunde hat einen Servicevertrag mit einer SLA-Stufe (Bronze bis Platin), die maximale Reaktionszeiten festlegt. Tickets werden vom 1st-Level-Support angenommen, bei Bedarf an den 2nd-Level- oder Netzwerk-Support weitergegeben und die Arbeitszeit wird minutengenau erfasst.</p>
<p>„HelpDesk+“ soll erweitert werden: automatische Prüfung von SLA-Verletzungen, Eskalationsregeln, ein objektorientiertes Ticketmodell, Auswertungen per SQL und ein JSON-Export für das Kundenportal. Sie übernehmen Teile der Umsetzung.</p>
<p>Bearbeiten Sie die folgenden vier Aufgaben (90 Minuten, 100 Punkte). Algorithmen sind in Pseudocode oder einer gängigen Programmiersprache (z. B. Java, Python) zu formulieren.</p>`,
    tasks: [
      // ---------- Aufgabe 1: Algorithmen (25 P) ----------
      {
        id: "ga2-sim-1-1a", part: "GA2", topic: "ga2-pseudocode", type: "code", lang: "pseudocode", difficulty: 2, points: 8,
        context: `<p>Ein Ticket wird als Datensatz mit folgenden Attributen übergeben:</p>
<ul><li><code>prioritaet</code> (Ganzzahl 1, 2 oder 3)</li>
<li><code>erstelltMin</code> – Erstellungszeitpunkt in Minuten seit Jahresbeginn</li>
<li><code>geloestMin</code> – Lösungszeitpunkt in Minuten seit Jahresbeginn, <b>−1</b>, wenn das Ticket noch nicht gelöst ist</li></ul>
<p>Maximale Lösungszeiten: Priorität 1 = 240 Minuten, Priorität 2 = 480 Minuten, Priorität 3 = 1440 Minuten. Ein Ticket verletzt das SLA, wenn seine Bearbeitungsdauer die maximale Lösungszeit <b>überschreitet</b>. Bei ungelösten Tickets wird die Bearbeitungsdauer bis zum Zeitpunkt <code>jetzt</code> gerechnet.</p>`,
        question: `<b>Aufgabe 1 a)</b> Entwickeln Sie die Funktion <code>anzahlSlaVerletzungen(tickets, jetzt)</code>, die die Anzahl der Tickets mit SLA-Verletzung zurückgibt. Die maximale Lösungszeit soll in einer eigenen Hilfsfunktion <code>maxDauer(prioritaet)</code> ermittelt werden.`,
        starter: `funktion maxDauer(prioritaet: Ganzzahl): Ganzzahl
  // ...
ende funktion

funktion anzahlSlaVerletzungen(tickets: Array von Ticket, jetzt: Ganzzahl): Ganzzahl
  // ...
ende funktion`,
        solution: `<pre><code>funktion maxDauer(prioritaet: Ganzzahl): Ganzzahl
  wenn prioritaet = 1 dann
    rückgabe 240
  sonst wenn prioritaet = 2 dann
    rückgabe 480
  sonst
    rückgabe 1440
  ende wenn
ende funktion

funktion anzahlSlaVerletzungen(tickets: Array von Ticket, jetzt: Ganzzahl): Ganzzahl
  anzahl ← 0
  für i ← 0 bis länge(tickets) - 1
    t ← tickets[i]
    wenn t.geloestMin = -1 dann
      ende ← jetzt
    sonst
      ende ← t.geloestMin
    ende wenn
    dauer ← ende - t.erstelltMin
    wenn dauer &gt; maxDauer(t.prioritaet) dann
      anzahl ← anzahl + 1
    ende wenn
  ende für
  rückgabe anzahl
ende funktion</code></pre>
<p>Punkte: Hilfsfunktion 2 P; Schleife über alle Tickets 1 P; Fallunterscheidung gelöst/ungelöst 2 P; Dauerberechnung und Vergleich mit „&gt;“ 2 P; Zähler und Rückgabe 1 P.</p>`,
        keywords: ["240", "480", "1440", "-1", "jetzt", "maxdauer", "anzahl", "für|for|solange|while"]
      },
      {
        id: "ga2-sim-1-1b", part: "GA2", topic: "ga2-pseudocode", type: "numeric", difficulty: 2, points: 5,
        context: `<p>Für die Eskalation wartender Tickets wurde folgende Funktion implementiert:</p>${ESKALATION}`,
        question: `<b>Aufgabe 1 b)</b> Führen Sie einen <b>Schreibtischtest</b> für den Aufruf <code>eskalationsstufe([30, 50, 70, 20, 90, 10, 45])</code> durch. Welchen Wert gibt die Funktion zurück?`,
        answer: 6, tolerance: 0,
        solution: `<table>
<tr><th>i</th><th>wartezeiten[i]</th><th>summe nach Addition</th><th>erfüllte Bedingung</th><th>stufe</th><th>summe am Ende</th></tr>
<tr><td>0</td><td>30</td><td>30</td><td>–</td><td>0</td><td>30</td></tr>
<tr><td>1</td><td>50</td><td>80</td><td>–</td><td>0</td><td>80</td></tr>
<tr><td>2</td><td>70</td><td>150</td><td>70 &gt; 60</td><td>2</td><td>150</td></tr>
<tr><td>3</td><td>20</td><td>170</td><td>170 &gt; 100</td><td>3</td><td>0</td></tr>
<tr><td>4</td><td>90</td><td>90</td><td>90 &gt; 60</td><td>5</td><td>90</td></tr>
<tr><td>5</td><td>10</td><td>100</td><td>– (100 ist nicht &gt; 100)</td><td>5</td><td>100</td></tr>
<tr><td>6</td><td>45</td><td>145</td><td>145 &gt; 100</td><td>6</td><td>0</td></tr>
</table><p>Rückgabewert: <b>6</b>. Beachte: Im Fall <code>wartezeiten[i] &gt; 60</code> wird die Summe <i>nicht</i> zurückgesetzt, der <code>sonst wenn</code>-Zweig wird dann nicht geprüft.</p>`
      },
      {
        id: "ga2-sim-1-1c", part: "GA2", topic: "ga2-sortieren-suchen", type: "text", difficulty: 3, points: 6,
        context: `<p>Ein Kollege hat eine binäre Suche nach Ticketnummern implementiert. Das Array <code>ids</code> ist aufsteigend sortiert; zurückgegeben werden soll der Index des gesuchten Werts oder −1. <code>DIV</code> ist die ganzzahlige Division.</p>
<pre><code>01 funktion sucheTicket(ids: Array von Ganzzahl, gesucht: Ganzzahl): Ganzzahl
02   links ← 0
03   rechts ← länge(ids)
04   solange links &lt; rechts wiederhole
05     mitte ← (links + rechts) DIV 2
06     wenn ids[mitte] = gesucht dann
07       rückgabe mitte
08     sonst wenn ids[mitte] &lt; gesucht dann
09       links ← mitte
10     sonst
11       rechts ← mitte - 1
12     ende wenn
13   ende solange
14   rückgabe -1
15 ende funktion</code></pre>`,
        question: `<b>Aufgabe 1 c)</b> Die Funktion enthält in den Zeilen 03, 04 und 09 Fehler (die Suche arbeitet mit einem geschlossenen Intervall [links, rechts]). Beschreiben Sie für jede dieser Zeilen den Fehler und seine Auswirkung und geben Sie die korrigierte Zeile an. Zeigen Sie die Auswirkung des Fehlers in Zeile 09 am Aufruf <code>sucheTicket([3, 8, 15, 21, 42], 8)</code>.`,
        solution: `<ul>
<li><b>Zeile 03</b> (1,5 P): <code>rechts</code> zeigt hinter das letzte Element. Bei einem geschlossenen Intervall kann dadurch auf <code>ids[länge(ids)]</code> zugegriffen werden (Indexfehler/ArrayIndexOutOfBounds). Korrektur: <code>rechts ← länge(ids) - 1</code></li>
<li><b>Zeile 04</b> (1,5 P): Bei <code>links = rechts</code> bricht die Schleife ab, obwohl noch ein Element zu prüfen ist; ein vorhandener Wert wird ggf. nicht gefunden. Korrektur: <code>solange links &lt;= rechts wiederhole</code></li>
<li><b>Zeile 09</b> (1,5 P): Das Element an Position <code>mitte</code> wurde bereits geprüft; wird <code>links</code> nur auf <code>mitte</code> gesetzt, verkleinert sich der Suchbereich nicht immer ⇒ <b>Endlosschleife</b>. Korrektur: <code>links ← mitte + 1</code></li>
<li><b>Nachweis</b> (1,5 P): links = 0, rechts = 5 ⇒ mitte = 2, ids[2] = 15 &gt; 8 ⇒ rechts = 1. Danach links = 0, rechts = 1 ⇒ mitte = 0, ids[0] = 3 &lt; 8 ⇒ links = <b>0</b> (unverändert). Die Werte links = 0, rechts = 1 wiederholen sich ⇒ Endlosschleife, die 8 an Index 1 wird nie gefunden.</li>
</ul>`,
        keywords: ["länge(ids) - 1|laenge(ids) - 1|length - 1|länge - 1|-1", "<=", "mitte + 1|mitte+1", "endlosschleife", "index|out of bounds|außerhalb|ausserhalb", "links = 0|links bleibt|unverändert|unveraendert"]
      },
      {
        id: "ga2-sim-1-1d", part: "GA2", topic: "ga2-sortieren-suchen", type: "code", lang: "pseudocode", difficulty: 2, points: 6,
        question: `<b>Aufgabe 1 d)</b> Die Ticketliste im Dashboard soll nach <b>Priorität aufsteigend</b> (1 zuerst) und bei gleicher Priorität nach <b>Erstellungszeitpunkt aufsteigend</b> (ältestes zuerst) sortiert werden. Entwickeln Sie die Prozedur <code>sortiereTickets(tickets)</code> mit einem Sortierverfahren Ihrer Wahl (z. B. Bubblesort), ohne eine Bibliotheksfunktion zum Sortieren zu verwenden. Die Tickets besitzen die Attribute <code>prioritaet</code> und <code>erstelltMin</code>.`,
        starter: `prozedur sortiereTickets(tickets: Array von Ticket)
  // ...
ende prozedur`,
        solution: `<pre><code>funktion kommtVor(a: Ticket, b: Ticket): Wahrheitswert
  wenn a.prioritaet &lt; b.prioritaet dann
    rückgabe wahr
  sonst wenn a.prioritaet = b.prioritaet und a.erstelltMin &lt; b.erstelltMin dann
    rückgabe wahr
  ende wenn
  rückgabe falsch
ende funktion

prozedur sortiereTickets(tickets: Array von Ticket)
  n ← länge(tickets)
  für i ← 0 bis n - 2
    getauscht ← falsch
    für j ← 0 bis n - 2 - i
      wenn kommtVor(tickets[j + 1], tickets[j]) dann
        temp ← tickets[j]
        tickets[j] ← tickets[j + 1]
        tickets[j + 1] ← temp
        getauscht ← wahr
      ende wenn
    ende für
    wenn nicht getauscht dann
      abbrechen          // bereits sortiert
    ende wenn
  ende für
ende prozedur</code></pre>
<p>Punkte: korrekte Schleifengrenzen 2 P; zweistufiges Vergleichskriterium 2 P; Tausch über Hilfsvariable 1,5 P; Optimierung/Lesbarkeit 0,5 P. Andere Verfahren (Selection-, Insertionsort) gleichwertig.</p>`,
        keywords: ["prioritaet", "erstelltmin", "temp|tausch|swap", "für|for", "<", "n - 1|n - 2|n-1|n-2|länge"]
      },
      // ---------- Aufgabe 2: Objektorientierte Programmierung (25 P) ----------
      {
        id: "ga2-sim-1-2a", part: "GA2", topic: "ga2-oop", type: "code", lang: "java", difficulty: 2, points: 8,
        context: TICKET_KLASSEN,
        question: `<b>Aufgabe 2 a)</b> Implementieren Sie die abstrakte Klasse <code>Ticket</code> gemäß Klassendiagramm (Attribute, Konstruktor, Getter, Setter mit Gültigkeitsprüfung, abstrakte Methode). Der Konstruktor soll die Prüfung der Priorität nicht doppelt implementieren.`,
        starter: `import java.time.LocalDateTime;

public abstract class Ticket {
    // ...
}`,
        solution: `<pre><code>import java.time.LocalDateTime;

public abstract class Ticket {
    private int nummer;
    private String titel;
    private int prioritaet;
    private LocalDateTime erstelltAm;

    public Ticket(int nummer, String titel, int prioritaet, LocalDateTime erstelltAm) {
        this.nummer = nummer;
        this.titel = titel;
        setPrioritaet(prioritaet);          // Prüfung wiederverwenden
        this.erstelltAm = erstelltAm;
    }

    public int getPrioritaet() { return prioritaet; }

    public LocalDateTime getErstelltAm() { return erstelltAm; }

    public void setPrioritaet(int p) {
        if (p &lt; 1 || p &gt; 3) {
            throw new IllegalArgumentException("Priorität muss zwischen 1 und 3 liegen: " + p);
        }
        this.prioritaet = p;
    }

    public abstract LocalDateTime berechneFaelligkeit();
}</code></pre>
<p>Punkte: Klassenkopf <code>abstract</code> 1 P; private Attribute mit Typen 1,5 P; Konstruktor 2 P (mit Setter-Aufruf); Getter 1 P; Setter mit Exception 1,5 P; abstrakte Methode ohne Rumpf 1 P.</p>`,
        keywords: ["abstract class", "private", "this.", "illegalargumentexception", "throw", "public abstract localdatetime berechnefaelligkeit", "getprioritaet", "setprioritaet"]
      },
      {
        id: "ga2-sim-1-2b", part: "GA2", topic: "ga2-oop", type: "code", lang: "java", difficulty: 2, points: 6,
        context: TICKET_KLASSEN,
        question: `<b>Aufgabe 2 b)</b> Implementieren Sie die Klasse <code>StoerungsTicket</code> mit Konstruktor und der Methode <code>berechneFaelligkeit()</code> gemäß den angegebenen Reaktionsfristen.`,
        starter: `import java.time.LocalDateTime;

public class StoerungsTicket extends Ticket {
    // ...
}`,
        solution: `<pre><code>import java.time.LocalDateTime;

public class StoerungsTicket extends Ticket {
    private int betroffeneNutzer;

    public StoerungsTicket(int nummer, String titel, int prioritaet,
                           LocalDateTime erstelltAm, int betroffeneNutzer) {
        super(nummer, titel, prioritaet, erstelltAm);
        this.betroffeneNutzer = betroffeneNutzer;
    }

    @Override
    public LocalDateTime berechneFaelligkeit() {
        int minuten;
        switch (getPrioritaet()) {
            case 1:  minuten = 240;  break;
            case 2:  minuten = 480;  break;
            default: minuten = 1440;
        }
        if (betroffeneNutzer &gt; 50) {
            minuten = minuten / 2;
        }
        return getErstelltAm().plusMinutes(minuten);
    }
}</code></pre>
<p>Punkte: Vererbung und <code>super(...)</code> 2 P; Fristen je Priorität 2 P; Halbierung bei &gt; 50 Nutzern 1 P; Zugriff über Getter und Rückgabe mit <code>plusMinutes</code> 1 P.</p>`,
        keywords: ["extends ticket", "super(", "@override", "240", "480", "1440", "> 50|>50", "plusminutes"]
      },
      {
        id: "ga2-sim-1-2c", part: "GA2", topic: "ga2-oop", type: "text", difficulty: 2, points: 4,
        context: `<pre><code>List&lt;Ticket&gt; tickets = ladeOffeneTickets();   // enthält StoerungsTickets und ServiceAnfragen
for (Ticket t : tickets) {
    System.out.println(t.berechneFaelligkeit());
}</code></pre>`,
        question: `<b>Aufgabe 2 c)</b> Erläutern Sie am obigen Codeausschnitt den Begriff <b>Polymorphie</b> und das Prinzip der <b>dynamischen (späten) Bindung</b>.`,
        solution: `<ul>
<li><b>Polymorphie</b> (2 P): Eine Variable vom Typ der Oberklasse <code>Ticket</code> kann Objekte verschiedener Unterklassen referenzieren. Derselbe Methodenaufruf <code>t.berechneFaelligkeit()</code> führt je nach tatsächlichem Objekt zu unterschiedlichem Verhalten (Störung: Frist nach Priorität, Serviceanfrage: +5 Tage).</li>
<li><b>Dynamische Bindung</b> (2 P): Welche Implementierung ausgeführt wird, entscheidet sich erst <b>zur Laufzeit</b> anhand des Objekttyps, nicht anhand des deklarierten Variablentyps zur Compilezeit. Dadurch kann die Schleife ohne <code>instanceof</code>-Abfragen geschrieben werden; neue Tickettypen können ergänzt werden, ohne diesen Code zu ändern.</li>
</ul>`,
        keywords: ["oberklasse|basisklasse|superklasse", "unterklasse", "laufzeit", "überschrieben|ueberschrieben|override", "unterschiedlich|verschieden", "instanceof|ohne änderung|ohne aenderung|erweiterbar"]
      },
      {
        id: "ga2-sim-1-2d", part: "GA2", topic: "ga2-oop", type: "mc", difficulty: 2, points: 3,
        question: `<b>Aufgabe 2 d)</b> Es wird überlegt, <code>Ticket</code> statt als abstrakte Klasse als Interface zu definieren. Welche Aussage (bezogen auf Java) ist <b>korrekt</b>?`,
        options: [
          "Ein Interface kann Instanzattribute wie nummer und titel besitzen, die jede implementierende Klasse erbt.",
          "Eine Klasse kann mehrere Interfaces implementieren, aber nur von einer Klasse erben.",
          "Abstrakte Klassen dürfen keinen Konstruktor besitzen.",
          "Von einem Interface können mit new direkt Objekte erzeugt werden.",
          "Methoden eines Interfaces sind standardmäßig private."
        ],
        correct: [1],
        solution: `Java erlaubt <b>Einfachvererbung</b> bei Klassen, aber die Implementierung <b>beliebig vieler Interfaces</b>. Interfaces haben keine Instanzattribute (nur Konstanten), abstrakte Klassen dürfen Konstruktoren haben (Aufruf über <code>super</code>), Interfaces sind nicht instanziierbar und ihre abstrakten Methoden sind implizit <code>public</code>. Da <code>Ticket</code> gemeinsame Attribute und Logik (Prioritätsprüfung) besitzt, ist die abstrakte Klasse hier passend.`
      },
      {
        id: "ga2-sim-1-2e", part: "GA2", topic: "ga2-oop", type: "code", lang: "java", difficulty: 3, points: 4,
        context: TICKET_KLASSEN,
        question: `<b>Aufgabe 2 e)</b> Erstellen Sie <b>zwei</b> Unit-Tests (z. B. JUnit 5) für <code>StoerungsTicket.berechneFaelligkeit()</code>: einen für Priorität 1 mit 10 betroffenen Nutzern und einen, der die Halbierung der Frist bei Priorität 3 prüft. Geben Sie konkrete Eingabewerte und erwartete Ergebnisse an.`,
        solution: `<pre><code>import static org.junit.jupiter.api.Assertions.assertEquals;
import java.time.LocalDateTime;
import org.junit.jupiter.api.Test;

class StoerungsTicketTest {
    private final LocalDateTime start = LocalDateTime.of(2026, 11, 24, 8, 0);

    @Test
    void prio1OhneHalbierung() {
        Ticket t = new StoerungsTicket(1, "VPN", 1, start, 10);
        assertEquals(LocalDateTime.of(2026, 11, 24, 12, 0), t.berechneFaelligkeit());   // +240 min
    }

    @Test
    void prio3MitHalbierungBeiMehrAls50Nutzern() {
        Ticket t = new StoerungsTicket(2, "Mailserver", 3, start, 51);
        assertEquals(LocalDateTime.of(2026, 11, 24, 20, 0), t.berechneFaelligkeit());   // 1440/2 = 720 min
    }
}</code></pre>
<p>Punkte: je Test 2 P (Arrange: Objekt mit konkreten Werten, Act: Methodenaufruf, Assert: korrekt berechneter Erwartungswert). Sinnvoll ist zusätzlich ein Grenzwerttest mit genau 50 Nutzern (keine Halbierung).</p>`,
        keywords: ["@test", "assertequals", "new stoerungsticket", "12, 0|12:00", "20, 0|20:00|720", "51|> 50"]
      },
      // ---------- Aufgabe 3: SQL (30 P) ----------
      {
        id: "ga2-sim-1-3a", part: "GA2", topic: "ga2-sql-select", type: "sql", difficulty: 1, points: 5,
        context: SQL_CONTEXT,
        question: `<b>Aufgabe 3 a)</b> Erstellen Sie eine SQL-Abfrage, die alle Tickets der <b>Priorität 1</b> ausgibt, die <b>noch nicht gelöst</b> sind (Status 'offen' oder 'in Bearbeitung'). Ausgabe: <code>ticket_id, titel, status, erstellt_am</code>, sortiert nach Erstellungsdatum aufsteigend.`,
        sql: {
          setup: SQL_SETUP,
          solution: `SELECT ticket_id, titel, status, erstellt_am
FROM ticket
WHERE prioritaet = 1
  AND status IN ('offen', 'in Bearbeitung')
ORDER BY erstellt_am ASC;`,
          ordered: true
        },
        solution: `<pre><code>SELECT ticket_id, titel, status, erstellt_am
FROM ticket
WHERE prioritaet = 1
  AND status IN ('offen', 'in Bearbeitung')
ORDER BY erstellt_am ASC;</code></pre>
<p>Ergebnis: Tickets 2, 6, 9, 11. Alternativ: <code>status &lt;&gt; 'geloest' AND status &lt;&gt; 'geschlossen'</code> bzw. <code>geloest_am IS NULL</code>. Punkte: Projektion 1 P, WHERE mit beiden Bedingungen 3 P, Sortierung 1 P.</p>`
      },
      {
        id: "ga2-sim-1-3b", part: "GA2", topic: "ga2-sql-join", type: "sql", difficulty: 2, points: 5,
        context: SQL_CONTEXT,
        question: `<b>Aufgabe 3 b)</b> Listen Sie für alle Tickets mit dem Status <b>'in Bearbeitung'</b> die Ticketnummer, den Titel, die Firma des Kunden und den Namen des zuständigen Mitarbeiters auf. Ausgabe: <code>ticket_id, titel, firma, name</code>.`,
        sql: {
          setup: SQL_SETUP,
          solution: `SELECT t.ticket_id, t.titel, k.firma, m.name
FROM ticket t
JOIN kunde k ON k.kunde_id = t.kunde_id
JOIN mitarbeiter m ON m.ma_id = t.ma_id
WHERE t.status = 'in Bearbeitung';`
        },
        solution: `<pre><code>SELECT t.ticket_id, t.titel, k.firma, m.name
FROM ticket t
JOIN kunde k ON k.kunde_id = t.kunde_id
JOIN mitarbeiter m ON m.ma_id = t.ma_id
WHERE t.status = 'in Bearbeitung';</code></pre>
<p>Ergebnis: 2 / VPN-Verbindung bricht ab / Stadtwerke Delitzsch / Lukas Brandt; 9 / Datenbank-Backup fehlgeschlagen / Kanzlei Roth &amp; Partner / Mehmet Aydin; 10 / WLAN im Tagungsraum gestört / Hotel Elsterblick / Jana Becker. Punkte: zwei Joins mit korrekten Join-Bedingungen 3 P, Projektion 1 P, Filter 1 P.</p>`
      },
      {
        id: "ga2-sim-1-3c", part: "GA2", topic: "ga2-sql-aggregat", type: "sql", difficulty: 2, points: 5,
        context: SQL_CONTEXT,
        question: `<b>Aufgabe 3 c)</b> Ermitteln Sie je Mitarbeiter die <b>Summe der erfassten Minuten</b>. Es sollen nur Mitarbeiter mit <b>mindestens 150 Minuten</b> angezeigt werden, absteigend sortiert nach der Summe. Ausgabe: <code>name, summe_minuten</code>.`,
        sql: {
          setup: SQL_SETUP,
          solution: `SELECT m.name, SUM(z.minuten) AS summe_minuten
FROM mitarbeiter m
JOIN zeiterfassung z ON z.ma_id = m.ma_id
GROUP BY m.ma_id, m.name
HAVING SUM(z.minuten) >= 150
ORDER BY summe_minuten DESC;`,
          ordered: true
        },
        solution: `<pre><code>SELECT m.name, SUM(z.minuten) AS summe_minuten
FROM mitarbeiter m
JOIN zeiterfassung z ON z.ma_id = m.ma_id
GROUP BY m.ma_id, m.name
HAVING SUM(z.minuten) &gt;= 150
ORDER BY summe_minuten DESC;</code></pre>
<p>Ergebnis: Mehmet Aydin 380, Lukas Brandt 240, Sophie Lang 180, Clara Wolff 150. Punkte: Join 1 P, GROUP BY 1 P, SUM 1 P, HAVING (nicht WHERE!) 1 P, Sortierung 1 P.</p>`
      },
      {
        id: "ga2-sim-1-3d", part: "GA2", topic: "ga2-sql-join", type: "sql", difficulty: 2, points: 5,
        context: SQL_CONTEXT,
        question: `<b>Aufgabe 3 d)</b> Der Teamleiter möchte alle Tickets mit Status <b>'offen'</b> sehen, denen <b>noch kein Mitarbeiter zugewiesen</b> ist, zusammen mit Firma und SLA-Stufe des Kunden. Ausgabe: <code>ticket_id, titel, firma, sla_stufe</code>.`,
        sql: {
          setup: SQL_SETUP,
          solution: `SELECT t.ticket_id, t.titel, k.firma, k.sla_stufe
FROM ticket t
JOIN kunde k ON k.kunde_id = t.kunde_id
WHERE t.status = 'offen'
  AND t.ma_id IS NULL;`
        },
        solution: `<pre><code>SELECT t.ticket_id, t.titel, k.firma, k.sla_stufe
FROM ticket t
JOIN kunde k ON k.kunde_id = t.kunde_id
WHERE t.status = 'offen'
  AND t.ma_id IS NULL;</code></pre>
<p>Ergebnis: 4 (Autohaus Stern, Silber), 8 (Möbel Lindner, Bronze), 11 (Stadtwerke Delitzsch, Platin). Typischer Fehler: <code>ma_id = NULL</code> liefert nie ein Ergebnis, da Vergleiche mit NULL immer UNKNOWN ergeben. Punkte: Join 2 P, IS NULL 2 P, Statusfilter 1 P.</p>`
      },
      {
        id: "ga2-sim-1-3e", part: "GA2", topic: "ga2-sql-subquery", type: "sql", difficulty: 3, points: 5,
        context: SQL_CONTEXT,
        question: `<b>Aufgabe 3 e)</b> Ermitteln Sie alle Tickets, deren gesamter erfasster Zeitaufwand <b>über dem durchschnittlichen Gesamtaufwand je Ticket</b> liegt (Durchschnitt über alle Tickets, für die Zeit erfasst wurde). Ausgabe: <code>ticket_id, titel, gesamt_minuten</code>.`,
        sql: {
          setup: SQL_SETUP,
          solution: `SELECT t.ticket_id, t.titel, SUM(z.minuten) AS gesamt_minuten
FROM ticket t
JOIN zeiterfassung z ON z.ticket_id = t.ticket_id
GROUP BY t.ticket_id, t.titel
HAVING SUM(z.minuten) > (
  SELECT AVG(summe)
  FROM (SELECT SUM(minuten) AS summe FROM zeiterfassung GROUP BY ticket_id)
);`
        },
        solution: `<pre><code>SELECT t.ticket_id, t.titel, SUM(z.minuten) AS gesamt_minuten
FROM ticket t
JOIN zeiterfassung z ON z.ticket_id = t.ticket_id
GROUP BY t.ticket_id, t.titel
HAVING SUM(z.minuten) &gt; (
  SELECT AVG(summe)
  FROM (SELECT SUM(minuten) AS summe FROM zeiterfassung GROUP BY ticket_id) AS je_ticket
);</code></pre>
<p>Der Durchschnitt je Ticket beträgt 1.070 / 9 ≈ 118,9 Minuten. Ergebnis: Ticket 2 (210), 5 (180), 7 (135), 9 (240).<br>Typischer Fehler: <code>(SELECT AVG(minuten) FROM zeiterfassung)</code> bildet den Durchschnitt je <i>Buchung</i> (≈ 71,3) und liefert zusätzlich die Tickets 3 und 6. Punkte: Gruppierung/Summe 2 P, Unterabfrage mit Durchschnitt der Summen 2 P, HAVING-Vergleich 1 P.</p>`
      },
      {
        id: "ga2-sim-1-3f", part: "GA2", topic: "ga2-sql-dml", type: "sql", difficulty: 2, points: 5,
        context: SQL_CONTEXT,
        question: `<b>Aufgabe 3 f)</b> Alle Tickets mit Status <b>'geloest'</b>, deren Lösungsdatum <b>vor dem 15.10.2026</b> liegt, sollen automatisch auf den Status <b>'geschlossen'</b> gesetzt werden. Erstellen Sie die SQL-Anweisung.`,
        sql: {
          setup: SQL_SETUP,
          solution: `UPDATE ticket
SET status = 'geschlossen'
WHERE status = 'geloest'
  AND geloest_am < '2026-10-15';`,
          check: `SELECT ticket_id, status FROM ticket ORDER BY ticket_id;`
        },
        solution: `<pre><code>UPDATE ticket
SET status = 'geschlossen'
WHERE status = 'geloest'
  AND geloest_am &lt; '2026-10-15';</code></pre>
<p>Betroffen sind die Tickets 3, 5 und 7; Ticket 12 (gelöst am 22.10.) bleibt 'geloest'. Da das Datum im ISO-Format gespeichert ist, funktioniert der Textvergleich korrekt. Punkte: UPDATE/SET 2 P, beide Bedingungen 3 P. Ohne WHERE-Klausel würden alle Tickets geschlossen (0 P für die Bedingung).</p>`
      },
      // ---------- Aufgabe 4: Datenstrukturen, Rekursion, Datenformate (20 P) ----------
      {
        id: "ga2-sim-1-4a", part: "GA2", topic: "ga2-datenstrukturen", type: "text", difficulty: 2, points: 4,
        question: `<b>Aufgabe 4 a)</b> Eingehende Tickets sollen im 1st-Level-Support zwischengespeichert werden. Erläutern Sie die Unterschiede zwischen den Datenstrukturen <b>Queue</b> und <b>Stack</b> (Zugriffsprinzip, Grundoperationen) und begründen Sie, welche Struktur für die Abarbeitung geeignet ist. Nennen Sie eine Erweiterung, die die Priorität berücksichtigt.`,
        solution: `<ul>
<li><b>Queue</b> (1 P): Warteschlange nach dem <b>FIFO</b>-Prinzip (First In – First Out); Operationen <code>enqueue</code> (hinten anfügen) und <code>dequeue</code> (vorne entnehmen).</li>
<li><b>Stack</b> (1 P): Stapel nach dem <b>LIFO</b>-Prinzip (Last In – First Out); Operationen <code>push</code> und <code>pop</code> (oben), <code>peek</code>.</li>
<li><b>Eignung</b> (1 P): Die <b>Queue</b>, da Tickets fair in der Reihenfolge ihres Eingangs bearbeitet werden sollen; beim Stack würden die ältesten Tickets am längsten warten (SLA-Verletzungen).</li>
<li><b>Erweiterung</b> (1 P): <b>Prioritätswarteschlange</b> (Priority Queue, z. B. als Heap): Entnommen wird stets das Element mit der höchsten Priorität, bei gleicher Priorität das älteste.</li>
</ul>`,
        keywords: ["fifo", "lifo", "enqueue|dequeue", "push|pop", "queue|warteschlange", "priority queue|prioritätswarteschlange|prioritaetswarteschlange|heap", "reihenfolge|eingang"]
      },
      {
        id: "ga2-sim-1-4b", part: "GA2", topic: "ga2-rekursion", type: "numeric", difficulty: 2, points: 4,
        context: `<pre><code>funktion f(n: Ganzzahl): Ganzzahl
  wenn n &lt;= 1 dann
    rückgabe 1
  ende wenn
  wenn n mod 2 = 0 dann
    rückgabe f(n DIV 2) + n
  sonst
    rückgabe f(n - 1) * 2
  ende wenn
ende funktion</code></pre>`,
        question: `<b>Aufgabe 4 b)</b> Ermitteln Sie den Rückgabewert des Aufrufs <code>f(13)</code>.`,
        answer: 48, tolerance: 0,
        solution: `<p>Rekursionsabstieg: f(13) = f(12) · 2; f(12) = f(6) + 12; f(6) = f(3) + 6; f(3) = f(2) · 2; f(2) = f(1) + 2; f(1) = 1 (Abbruchbedingung).</p>
<p>Rückweg: f(2) = 3; f(3) = 6; f(6) = 12; f(12) = 24; <b>f(13) = 48</b>.</p>`
      },
      {
        id: "ga2-sim-1-4c", part: "GA2", topic: "ga2-exceptions-formate", type: "text", difficulty: 2, points: 5,
        context: `<p>Für das Kundenportal soll ein Ticket als JSON exportiert werden. Ein erster Entwurf wird vom Parser abgelehnt:</p>
<pre><code>{
  "ticketId": 1042,
  "titel": "VPN-Verbindung bricht ab",
  'prioritaet': 1,
  "zugewiesen": null,
  "tags": ["vpn", "netzwerk",],
  "kommentare": [
    { "autor": "Lukas Brandt", "text": "Firmware aktualisiert" },
    { "autor": "Jana Becker" "text": "Kunde informiert" }
  ],
  "eskaliert": False
}</code></pre>`,
        question: `<b>Aufgabe 4 c)</b> Nennen Sie die <b>vier</b> syntaktischen Fehler im JSON-Dokument und geben Sie das korrigierte Dokument an.`,
        solution: `<ol>
<li><code>'prioritaet'</code>: Schlüssel (und Strings) müssen in <b>doppelten</b> Anführungszeichen stehen.</li>
<li><code>["vpn", "netzwerk",]</code>: <b>abschließendes Komma</b> (Trailing Comma) ist in JSON nicht erlaubt.</li>
<li>Im zweiten Kommentar fehlt das <b>Komma</b> zwischen <code>"Jana Becker"</code> und <code>"text"</code>.</li>
<li><code>False</code>: Boolesche Werte werden <b>kleingeschrieben</b> (<code>false</code>).</li>
</ol>
<pre><code>{
  "ticketId": 1042,
  "titel": "VPN-Verbindung bricht ab",
  "prioritaet": 1,
  "zugewiesen": null,
  "tags": ["vpn", "netzwerk"],
  "kommentare": [
    { "autor": "Lukas Brandt", "text": "Firmware aktualisiert" },
    { "autor": "Jana Becker", "text": "Kunde informiert" }
  ],
  "eskaliert": false
}</code></pre><p>Je Fehler 1 P, korrigiertes Dokument 1 P.</p>`,
        keywords: ["doppelte anführungszeichen|doppelte anfuehrungszeichen|\"prioritaet\"", "komma", "trailing|abschließend|abschliessend|nach \"netzwerk\"", "false", "klein"]
      },
      {
        id: "ga2-sim-1-4d", part: "GA2", topic: "ga2-rekursion", type: "code", lang: "pseudocode", difficulty: 3, points: 7,
        context: `<p>Große Störungen werden in Unter-Tickets aufgeteilt, die selbst wieder Unter-Tickets haben können (Baumstruktur). Jedes Ticket besitzt das Attribut <code>status</code> (Text) und die Liste <code>unterTickets</code> (ggf. leer). Beispiel:</p>
<pre><code>#500 Netzausfall (in Bearbeitung)
 ├─ #501 Switch tauschen (geschlossen)
 │    └─ #504 Ersatzteil bestellen (geschlossen)
 ├─ #502 VLAN neu konfigurieren (offen)
 └─ #503 Kunden informieren (in Bearbeitung)
      └─ #505 Statusseite aktualisieren (offen)</code></pre>`,
        question: `<b>Aufgabe 4 d)</b> Entwickeln Sie eine <b>rekursive</b> Funktion <code>zaehleNichtGeschlossene(t)</code>, die für ein Ticket <code>t</code> die Anzahl aller Tickets im Teilbaum (einschließlich <code>t</code> selbst) zurückgibt, deren Status nicht 'geschlossen' ist. Geben Sie außerdem an, welchen Wert der Aufruf für Ticket #500 liefert, und nennen Sie die Abbruchbedingung Ihrer Rekursion.`,
        starter: `funktion zaehleNichtGeschlossene(t: Ticket): Ganzzahl
  // ...
ende funktion`,
        solution: `<pre><code>funktion zaehleNichtGeschlossene(t: Ticket): Ganzzahl
  anzahl ← 0
  wenn t.status ≠ "geschlossen" dann
    anzahl ← 1
  ende wenn
  für jedes u in t.unterTickets
    anzahl ← anzahl + zaehleNichtGeschlossene(u)   // rekursiver Aufruf
  ende für
  rückgabe anzahl
ende funktion</code></pre>
<ul>
<li><b>Abbruchbedingung</b>: Hat ein Ticket keine Unter-Tickets (Blatt), wird die Schleife nicht durchlaufen und kein weiterer rekursiver Aufruf erfolgt.</li>
<li><b>Ergebnis für #500</b>: #500, #502, #503 und #505 sind nicht geschlossen ⇒ <b>4</b>.</li>
</ul>
<p>Punkte: eigener Status 1,5 P; Schleife über Unter-Tickets 1,5 P; rekursiver Aufruf mit Aufsummierung 2 P; Abbruchbedingung 1 P; Ergebnis 1 P.</p>`,
        keywords: ["zaehlenichtgeschlossene(", "geschlossen", "untertickets", "anzahl", "rückgabe|return", "4", "blatt|keine unter|leer|abbruch"]
      }
    ]
  });
})();

/* =====================================================================
   GA2 – Simulation 2: Onlineshop für Haushaltsgeräte-Ersatzteile
   ===================================================================== */
(function () {
  const SQL_SETUP = `CREATE TABLE kategorie (kat_id INTEGER PRIMARY KEY, bezeichnung TEXT NOT NULL);
CREATE TABLE artikel (art_nr INTEGER PRIMARY KEY, bezeichnung TEXT NOT NULL, kat_id INTEGER NOT NULL REFERENCES kategorie(kat_id), preis REAL NOT NULL, bestand INTEGER NOT NULL);
CREATE TABLE kunde (kd_nr INTEGER PRIMARY KEY, name TEXT NOT NULL, plz TEXT NOT NULL, ort TEXT NOT NULL);
CREATE TABLE bestellung (best_nr INTEGER PRIMARY KEY, kd_nr INTEGER NOT NULL REFERENCES kunde(kd_nr), datum TEXT NOT NULL, status TEXT NOT NULL);
CREATE TABLE bestellposition (best_nr INTEGER NOT NULL REFERENCES bestellung(best_nr), art_nr INTEGER NOT NULL REFERENCES artikel(art_nr), menge INTEGER NOT NULL, einzelpreis REAL NOT NULL, PRIMARY KEY (best_nr, art_nr));
INSERT INTO kategorie VALUES (1,'Waschmaschine'),(2,'Geschirrspüler'),(3,'Kühlschrank'),(4,'Staubsauger'),(5,'Kaffeevollautomat');
INSERT INTO artikel VALUES
(101,'Laugenpumpe WM universal',1,29.90,14),(102,'Türdichtung WM Typ A',1,39.50,6),(103,'Kohlebürsten-Set Motor',1,12.90,40),(104,'Heizstab 2000 W',1,54.00,2),
(201,'Sprüharm unten GS',2,18.50,22),(202,'Umwälzpumpe GS',2,89.00,3),(203,'Besteckkorb GS',2,24.90,0),
(301,'Türdichtung KS 55x101',3,45.00,5),(302,'Thermostat KS universal',3,32.00,9),
(401,'HEPA-Filter Staubsauger',4,14.99,50),(402,'Bodendüse 35 mm',4,21.50,0),
(501,'Brüheinheit KVA',5,79.00,4);
INSERT INTO kunde VALUES (1,'Hausgeräte Service Krämer','50667','Köln'),(2,'Petra Lindemann','53111','Bonn'),(3,'Jonas Weber','50823','Köln'),(4,'Elektro Schmitz GmbH','51373','Leverkusen'),(5,'Aylin Demir','40210','Düsseldorf'),(6,'Markus Brandt','50667','Köln'),(7,'Sabine Hoffmann','42103','Wuppertal'),(8,'Reparaturcafé Ehrenfeld','50823','Köln');
INSERT INTO bestellung VALUES (1001,1,'2026-09-02','versendet'),(1002,2,'2026-09-05','versendet'),(1003,4,'2026-09-11','versendet'),(1004,3,'2026-09-18','storniert'),(1005,1,'2026-09-25','versendet'),(1006,5,'2026-10-01','versendet'),(1007,6,'2026-10-03','offen'),(1008,4,'2026-10-07','versendet'),(1009,7,'2026-10-09','offen'),(1010,2,'2026-10-12','offen');
INSERT INTO bestellposition VALUES
(1001,101,4,29.90),(1001,103,10,12.90),(1002,401,2,14.99),(1003,202,2,89.00),(1003,201,3,18.50),(1003,302,1,32.00),
(1004,501,1,79.00),(1005,101,2,29.90),(1005,102,2,39.50),(1006,301,1,45.00),(1007,401,1,14.99),(1007,501,1,79.00),
(1008,202,1,85.00),(1008,103,5,12.90),(1009,302,1,32.00),(1010,201,1,18.50),(1010,401,3,14.99);`;

  const SQL_CONTEXT = `<p>Die Shop-Datenbank enthält folgende Tabellen (SQLite-Dialekt, Datumswerte als Text JJJJ-MM-TT):</p>
<table>
<tr><th>Tabelle</th><th>Spalten</th></tr>
<tr><td><b>kategorie</b></td><td><u>kat_id</u> INTEGER, bezeichnung TEXT</td></tr>
<tr><td><b>artikel</b></td><td><u>art_nr</u> INTEGER, bezeichnung TEXT, kat_id INTEGER (FK → kategorie), preis REAL, bestand INTEGER</td></tr>
<tr><td><b>kunde</b></td><td><u>kd_nr</u> INTEGER, name TEXT, plz TEXT, ort TEXT</td></tr>
<tr><td><b>bestellung</b></td><td><u>best_nr</u> INTEGER, kd_nr INTEGER (FK → kunde), datum TEXT, status TEXT ('offen', 'versendet', 'storniert')</td></tr>
<tr><td><b>bestellposition</b></td><td><u>best_nr</u> INTEGER (FK → bestellung), <u>art_nr</u> INTEGER (FK → artikel), menge INTEGER, einzelpreis REAL (Preis zum Bestellzeitpunkt)</td></tr>
</table>
<p>Auszug aus der Tabelle <b>artikel</b>:</p>
<table>
<tr><th>art_nr</th><th>bezeichnung</th><th>kat_id</th><th>preis</th><th>bestand</th></tr>
<tr><td>101</td><td>Laugenpumpe WM universal</td><td>1</td><td>29.90</td><td>14</td></tr>
<tr><td>203</td><td>Besteckkorb GS</td><td>2</td><td>24.90</td><td>0</td></tr>
<tr><td>401</td><td>HEPA-Filter Staubsauger</td><td>4</td><td>14.99</td><td>50</td></tr>
<tr><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td></tr>
</table>`;

  const WARENKORB_REGELN = `<p>Regeln für die Berechnung des Gesamtpreises eines Warenkorbs:</p><ul>
<li>Warenwert = Summe über alle Positionen (<code>preis · menge</code>).</li>
<li>Mengenrabatt auf den Warenwert: ab 250,00 € 10 %, ab 100,00 € 5 %, darunter kein Rabatt.</li>
<li>Versandkosten: 4,95 €, wenn der Warenwert <b>nach</b> Rabatt unter 50,00 € liegt, sonst versandkostenfrei.</li>
<li>Bei Expressversand wird zusätzlich ein Zuschlag von 9,90 € berechnet (auch bei versandkostenfreien Bestellungen).</li>
</ul>
<p>Eine Position besitzt die Attribute <code>preis</code> (Gleitkommazahl) und <code>menge</code> (Ganzzahl).</p>`;

  const LAGER_CODE = `<p>Spezifikation: Eine Entnahme ist nur zulässig, wenn die Menge größer als 0 ist, der Bestand ausreicht (auch die Entnahme des <b>gesamten</b> Bestands ist erlaubt) und aus dem Lager „Zentrallager“ entnommen wird. Die Methode gibt <code>true</code> zurück, wenn entnommen wurde, sonst <code>false</code>. Unterschreitet der Bestand den Mindestbestand, wird nachbestellt. Bei einer Menge ≤ 0 ist eine <code>IllegalArgumentException</code> auszulösen.</p>
<pre><code>01 public boolean entnehmen(int menge, String lagerort) {
02     if (menge &lt; 0) {
03         throw new IllegalArgumentException("Menge muss positiv sein");
04     }
05     if (lagerort == "Zentrallager") {
06         if (bestand &gt; menge) {
07             bestand = bestand - menge;
08         }
09     }
10     if (bestand &lt; mindestbestand) {
11         nachbestellen();
12     }
13     return true;
14 }</code></pre>`;

  AP2.exams.push({
    id: "ga2-sim-2",
    part: "GA2",
    title: "Simulation GA2 #2 – Onlineshop „TeileExpress24“ für Ersatzteile",
    minutes: 90,
    scenario: `<p>Sie sind Anwendungsentwicklerin bzw. Anwendungsentwickler bei der <b>TeileExpress24 GmbH</b> in Köln. Das Unternehmen vertreibt über seinen Onlineshop Ersatzteile für Haushaltsgeräte (Waschmaschinen, Geschirrspüler, Kühlschränke, Staubsauger, Kaffeevollautomaten) an Privatkunden und Reparaturbetriebe. Das Sortiment umfasst rund 18.000 Artikel, die über EAN-Codes und interne Artikelnummern identifiziert werden.</p>
<p>Der Shop wird gerade technisch modernisiert. Ihr Team ist zuständig für:</p>
<ul>
<li>die Neuprogrammierung der Warenkorb- und Prüfziffernlogik,</li>
<li>die Überarbeitung der Lager- und Versandklassen im Java-Backend,</li>
<li>Auswertungen und Datenpflege in der relationalen Shop-Datenbank,</li>
<li>Datenaustausch mit Lieferanten (XML) und die Kategorienverwaltung.</li>
</ul>
<p>Bearbeiten Sie die folgenden vier Aufgaben (90 Minuten, 100 Punkte). Algorithmen sind in Pseudocode oder einer gängigen Programmiersprache zu formulieren.</p>`,
    tasks: [
      // ---------- Aufgabe 1: Algorithmen (25 P) ----------
      {
        id: "ga2-sim-2-1a", part: "GA2", topic: "ga2-pseudocode", type: "code", lang: "pseudocode", difficulty: 2, points: 7,
        context: WARENKORB_REGELN,
        question: `<b>Aufgabe 1 a)</b> Entwickeln Sie die Funktion <code>berechneGesamtpreis(positionen, express)</code>, die den zu zahlenden Gesamtpreis nach den angegebenen Regeln zurückgibt.`,
        starter: `funktion berechneGesamtpreis(positionen: Array von Position, express: Wahrheitswert): Gleitkommazahl
  // ...
ende funktion`,
        solution: `<pre><code>funktion berechneGesamtpreis(positionen: Array von Position, express: Wahrheitswert): Gleitkommazahl
  warenwert ← 0.0
  für jede p in positionen
    warenwert ← warenwert + p.preis * p.menge
  ende für

  wenn warenwert &gt;= 250.00 dann
    warenwert ← warenwert * 0.90
  sonst wenn warenwert &gt;= 100.00 dann
    warenwert ← warenwert * 0.95
  ende wenn

  gesamt ← warenwert
  wenn warenwert &lt; 50.00 dann
    gesamt ← gesamt + 4.95
  ende wenn
  wenn express dann
    gesamt ← gesamt + 9.90
  ende wenn
  rückgabe gesamt
ende funktion</code></pre>
<p>Punkte: Summierung 2 P; Rabattstufen in richtiger Reihenfolge (zuerst ≥ 250 prüfen!) 2 P; Versandkosten auf Basis des rabattierten Werts 1,5 P; Expresszuschlag 1 P; Rückgabe 0,5 P.</p>`,
        explanation: "Typischer Fehler: Wird zuerst „≥ 100“ geprüft, erhält ein Warenkorb über 250 € nur 5 % Rabatt, weil der zweite Zweig nicht mehr erreicht wird.",
        keywords: ["preis * p.menge|preis*menge|preis * menge", "250", "100", "0.90|0,90|0.9|10", "0.95|0,95|5", "50", "4.95|4,95", "9.90|9,90"]
      },
      {
        id: "ga2-sim-2-1b", part: "GA2", topic: "ga2-pseudocode", type: "numeric", difficulty: 1, points: 4,
        context: WARENKORB_REGELN,
        question: `<b>Aufgabe 1 b)</b> Ein Kunde bestellt mit <b>Expressversand</b>: 2 × Türdichtung zu 34,90 €, 1 × Umwälzpumpe zu 89,00 € und 3 × Filter zu 12,40 €. Berechnen Sie den Rückgabewert der Funktion aus 1 a).`,
        answer: 196.10, tolerance: 0.01, unit: "€",
        solution: `<p>Warenwert: 2 · 34,90 + 1 · 89,00 + 3 · 12,40 = 69,80 + 89,00 + 37,20 = 196,00 €</p>
<p>Rabatt 5 % (100 € ≤ 196 € &lt; 250 €): 196,00 · 0,95 = 186,20 €</p>
<p>Versand: 186,20 € ≥ 50 € ⇒ 0,00 €; Expresszuschlag: + 9,90 €</p>
<p><b>Gesamt: 196,10 €</b></p>`
      },
      {
        id: "ga2-sim-2-1c", part: "GA2", topic: "ga2-pseudocode", type: "code", lang: "pseudocode", difficulty: 3, points: 6,
        context: `<p>Die letzte Stelle eines EAN-13-Codes ist eine Prüfziffer. Berechnung: Die ersten 12 Ziffern werden von links beginnend abwechselnd mit 1 und 3 gewichtet (1. Ziffer · 1, 2. Ziffer · 3, 3. Ziffer · 1, …) und die Produkte addiert. Prüfziffer = (10 − (Summe mod 10)) mod 10.</p>
<p>Verfügbare Hilfsfunktionen: <code>länge(text)</code>, <code>zeichenAn(text, i)</code> (0-basiert), <code>istZiffer(zeichen)</code>, <code>zifferWert(zeichen)</code> (z. B. '7' → 7).</p>`,
        question: `<b>Aufgabe 1 c)</b> Entwickeln Sie die Funktion <code>eanGueltig(ean: Text): Wahrheitswert</code>. Sie soll <code>falsch</code> liefern, wenn der Text nicht aus genau 13 Ziffern besteht oder die Prüfziffer nicht stimmt, sonst <code>wahr</code>.`,
        starter: `funktion eanGueltig(ean: Text): Wahrheitswert
  // ...
ende funktion`,
        solution: `<pre><code>funktion eanGueltig(ean: Text): Wahrheitswert
  wenn länge(ean) ≠ 13 dann
    rückgabe falsch
  ende wenn
  summe ← 0
  für i ← 0 bis 12
    z ← zeichenAn(ean, i)
    wenn nicht istZiffer(z) dann
      rückgabe falsch
    ende wenn
    wenn i &lt; 12 dann
      wenn i mod 2 = 0 dann
        summe ← summe + zifferWert(z)        // Gewicht 1
      sonst
        summe ← summe + zifferWert(z) * 3    // Gewicht 3
      ende wenn
    ende wenn
  ende für
  pruefziffer ← (10 - (summe mod 10)) mod 10
  rückgabe pruefziffer = zifferWert(zeichenAn(ean, 12))
ende funktion</code></pre>
<p>Punkte: Längenprüfung 1 P; Ziffernprüfung 1 P; Gewichtung 1/3 über Index 2 P; Prüfzifferformel 1 P; Vergleich mit 13. Stelle und Rückgabe 1 P.</p>`,
        keywords: ["13", "mod 2|% 2", "* 3|*3", "mod 10|% 10", "istziffer", "zeichenan(ean, 12)|12", "falsch|false"]
      },
      {
        id: "ga2-sim-2-1d", part: "GA2", topic: "ga2-pseudocode", type: "numeric", difficulty: 2, points: 4,
        question: `<b>Aufgabe 1 d)</b> Berechnen Sie die <b>Prüfziffer</b> für die ersten zwölf Stellen <code>429015874632</code> eines neuen Artikels nach dem in 1 c) beschriebenen Verfahren.`,
        answer: 5, tolerance: 0,
        solution: `<table>
<tr><th>Ziffer</th><td>4</td><td>2</td><td>9</td><td>0</td><td>1</td><td>5</td><td>8</td><td>7</td><td>4</td><td>6</td><td>3</td><td>2</td></tr>
<tr><th>Gewicht</th><td>1</td><td>3</td><td>1</td><td>3</td><td>1</td><td>3</td><td>1</td><td>3</td><td>1</td><td>3</td><td>1</td><td>3</td></tr>
<tr><th>Produkt</th><td>4</td><td>6</td><td>9</td><td>0</td><td>1</td><td>15</td><td>8</td><td>21</td><td>4</td><td>18</td><td>3</td><td>6</td></tr>
</table>
<p>Summe = 95; 95 mod 10 = 5; Prüfziffer = (10 − 5) mod 10 = <b>5</b> ⇒ vollständige EAN 4290158746325.</p>`
      },
      {
        id: "ga2-sim-2-1e", part: "GA2", topic: "ga2-sortieren-suchen", type: "text", difficulty: 2, points: 4,
        question: `<b>Aufgabe 1 e)</b> Im Lagerprogramm wird ein Artikel derzeit per linearer Suche in einem Array mit 18.000 Artikelnummern gesucht. Vergleichen Sie lineare und binäre Suche hinsichtlich <b>Voraussetzung</b> und <b>maximaler Anzahl von Vergleichen</b> für dieses Array und geben Sie die Zeitkomplexität in O-Notation an.`,
        solution: `<ul>
<li><b>Lineare Suche</b> (1,5 P): keine Voraussetzung (Daten dürfen unsortiert sein); im schlechtesten Fall werden alle <b>18.000</b> Elemente verglichen ⇒ <b>O(n)</b>.</li>
<li><b>Binäre Suche</b> (1,5 P): Voraussetzung ist ein <b>sortiertes</b> Array mit direktem (wahlfreiem) Zugriff; der Suchbereich wird in jedem Schritt halbiert ⇒ max. ⌈log₂(18.001)⌉ = <b>15</b> Vergleiche (2<sup>14</sup> = 16.384 &lt; 18.000 ≤ 2<sup>15</sup> = 32.768) ⇒ <b>O(log n)</b>.</li>
<li><b>Fazit</b> (1 P): Bei häufigen Suchen lohnt sich das einmalige Sortieren (O(n log n)) bzw. das Sortiert-Halten des Arrays.</li>
</ul>`,
        keywords: ["sortiert", "o(n)", "o(log n)|log", "18.000|18000", "15", "halbier"]
      },
      // ---------- Aufgabe 2: Objektorientierung und Codeanalyse (25 P) ----------
      {
        id: "ga2-sim-2-2a", part: "GA2", topic: "ga2-oop", type: "text", difficulty: 3, points: 8,
        context: LAGER_CODE,
        question: `<b>Aufgabe 2 a)</b> Die Methode <code>entnehmen</code> der Klasse <code>Lagerartikel</code> entspricht nicht der Spezifikation. Ermitteln Sie <b>vier</b> Fehler (Zeilennummer, Beschreibung der Auswirkung) und geben Sie jeweils die Korrektur an.`,
        solution: `<table>
<tr><th>Zeile</th><th>Fehler / Auswirkung</th><th>Korrektur</th></tr>
<tr><td>02</td><td>Menge 0 löst keine Exception aus, obwohl Menge ≤ 0 unzulässig ist.</td><td><code>if (menge &lt;= 0)</code></td></tr>
<tr><td>05</td><td>Strings werden mit <code>==</code> auf <b>Referenzgleichheit</b> geprüft; ein inhaltlich gleicher String (z. B. aus einer Eingabe) wird nicht erkannt.</td><td><code>if ("Zentrallager".equals(lagerort))</code></td></tr>
<tr><td>06</td><td>Die Entnahme des gesamten Bestands (menge = bestand) wird verhindert.</td><td><code>if (bestand &gt;= menge)</code></td></tr>
<tr><td>13</td><td>Es wird immer <code>true</code> geliefert, auch wenn nicht entnommen wurde.</td><td>Nach Zeile 07 <code>entnommen = true;</code> setzen (bzw. direkt zurückgeben), am Ende <code>return false;</code> bzw. <code>return entnommen;</code></td></tr>
</table>
<p>Je Fehler 2 P (Erkennen/Auswirkung 1 P, Korrektur 1 P). Zusätzlich vertretbar: Nachbestellung sollte nur nach erfolgreicher Entnahme geprüft werden.</p>`,
        keywords: ["<= 0|<=0", "equals", "referenz", ">=", "return false|false", "02|2", "05|5", "06|6", "13"]
      },
      {
        id: "ga2-sim-2-2b", part: "GA2", topic: "ga2-oop", type: "code", lang: "java", difficulty: 2, points: 7,
        context: `<p>Die Versandkosten sollen austauschbar berechnet werden. Dazu wird eine Schnittstelle <code>Versandart</code> mit den Methoden <code>double berechneKosten(double gewichtKg)</code> und <code>String getBezeichnung()</code> eingeführt.</p>
<ul><li><b>Standardversand</b>: bis einschließlich 5 kg 4,95 €, bis einschließlich 20 kg 7,95 €, darüber 14,90 €.</li>
<li><b>Expressversand</b>: 12,90 € Grundpreis zuzüglich 0,50 € je kg.</li></ul>`,
        question: `<b>Aufgabe 2 b)</b> Implementieren Sie die Schnittstelle <code>Versandart</code> sowie die Klassen <code>Standardversand</code> und <code>Expressversand</code> in Java. Zeigen Sie zudem in einer Zeile, wie eine Variable vom Typ <code>Versandart</code> mit einem Expressversand belegt wird.`,
        starter: `public interface Versandart {
    // ...
}`,
        solution: `<pre><code>public interface Versandart {
    double berechneKosten(double gewichtKg);
    String getBezeichnung();
}

public class Standardversand implements Versandart {
    @Override
    public double berechneKosten(double gewichtKg) {
        if (gewichtKg &lt;= 5) {
            return 4.95;
        } else if (gewichtKg &lt;= 20) {
            return 7.95;
        }
        return 14.90;
    }
    @Override
    public String getBezeichnung() { return "Standardversand"; }
}

public class Expressversand implements Versandart {
    private static final double GRUNDPREIS = 12.90;
    private static final double PREIS_JE_KG = 0.50;

    @Override
    public double berechneKosten(double gewichtKg) {
        return GRUNDPREIS + PREIS_JE_KG * gewichtKg;
    }
    @Override
    public String getBezeichnung() { return "Expressversand"; }
}

// Verwendung:
Versandart va = new Expressversand();</code></pre>
<p>Punkte: Interface 1,5 P; Standardversand mit Gewichtsstufen 2,5 P; Expressversand 2 P; Verwendung über Interface-Typ 1 P.</p>`,
        keywords: ["interface versandart", "implements versandart", "berechnekosten", "<= 5|<=5", "<= 20|<=20", "12.90|12.9", "0.50|0.5", "new expressversand"]
      },
      {
        id: "ga2-sim-2-2c", part: "GA2", topic: "ga2-oop", type: "mc", difficulty: 2, points: 3,
        question: `<b>Aufgabe 2 c)</b> Welches Entwurfsmuster wird mit der Schnittstelle <code>Versandart</code> und den austauschbaren Implementierungen aus Aufgabe 2 b) umgesetzt?`,
        options: ["Singleton", "Beobachter (Observer)", "Strategie (Strategy)", "Fabrikmethode (Factory Method)", "Adapter"],
        correct: [2],
        solution: `Das <b>Strategie-Muster</b> kapselt austauschbare Algorithmen (hier: Kostenberechnung) hinter einer gemeinsamen Schnittstelle. Der Warenkorb arbeitet nur mit <code>Versandart</code>; neue Versandarten können ergänzt werden, ohne den aufrufenden Code zu ändern.`
      },
      {
        id: "ga2-sim-2-2d", part: "GA2", topic: "ga2-exceptions-formate", type: "text", difficulty: 2, points: 4,
        context: `<pre><code>public void bestellen(Warenkorb wk) throws BestandNichtAusreichendException {
    Connection con = db.verbinden();
    try {
        for (Position p : wk.getPositionen()) {
            lager.reservieren(p.getArtikelNr(), p.getMenge());   // kann BestandNichtAusreichendException werfen
        }
        con.commit();
    } catch (SQLException e) {
        con.rollback();
        log.error("Bestellung fehlgeschlagen", e);
    } finally {
        con.close();
    }
}</code></pre>`,
        question: `<b>Aufgabe 2 d)</b> Erläutern Sie den Unterschied zwischen <b>checked</b> und <b>unchecked</b> Exceptions in Java und beschreiben Sie die Aufgabe des <code>finally</code>-Blocks im obigen Code.`,
        solution: `<ul>
<li><b>Checked Exceptions</b> (1,5 P): erben von <code>Exception</code> (nicht von <code>RuntimeException</code>); der Compiler erzwingt, dass sie behandelt (<code>try/catch</code>) oder mit <code>throws</code> deklariert werden – z. B. <code>SQLException</code>, die eigene <code>BestandNichtAusreichendException</code>.</li>
<li><b>Unchecked Exceptions</b> (1,5 P): erben von <code>RuntimeException</code> (z. B. <code>NullPointerException</code>, <code>IllegalArgumentException</code>); sie müssen nicht deklariert werden und weisen meist auf Programmierfehler hin.</li>
<li><b>finally</b> (1 P): wird <b>immer</b> ausgeführt – nach normalem Ende, nach einer gefangenen und auch bei einer nicht gefangenen/weitergereichten Exception. Hier wird so die Datenbankverbindung in jedem Fall geschlossen (keine Ressourcenlecks). Alternative: try-with-resources.</li>
</ul>`,
        keywords: ["checked", "unchecked", "runtimeexception", "compiler", "throws", "immer", "schließ|schliess|close|ressource"]
      },
      {
        id: "ga2-sim-2-2e", part: "GA2", topic: "ga2-sortieren-suchen", type: "numeric", difficulty: 2, points: 3,
        context: `<pre><code>prozedur bubblesort(a: Array von Ganzzahl)
  für i ← 0 bis länge(a) - 2
    für j ← 0 bis länge(a) - 2 - i
      wenn a[j] &gt; a[j + 1] dann
        tausche(a[j], a[j + 1])
      ende wenn
    ende für
  ende für
ende prozedur</code></pre>`,
        question: `<b>Aufgabe 2 e)</b> Wie viele <b>Vertauschungen</b> führt die Prozedur für das Array <code>[42, 17, 8, 99, 23, 4]</code> insgesamt aus?`,
        answer: 10, tolerance: 0,
        solution: `<p>Bubblesort vertauscht nur benachbarte Fehlstellungen; die Anzahl der Vertauschungen entspricht der Anzahl der <b>Inversionen</b> (Paare i &lt; j mit a[i] &gt; a[j]):</p>
<ul><li>42 vor 17, 8, 23, 4 ⇒ 4</li><li>17 vor 8, 4 ⇒ 2</li><li>8 vor 4 ⇒ 1</li><li>99 vor 23, 4 ⇒ 2</li><li>23 vor 4 ⇒ 1</li></ul>
<p>Summe: <b>10 Vertauschungen</b>. Durchläufe: [17, 8, 42, 23, 4, 99] (4) → [8, 17, 23, 4, 42, 99] (3) → [8, 17, 4, 23, 42, 99] (1) → [8, 4, 17, 23, 42, 99] (1) → [4, 8, 17, 23, 42, 99] (1).</p>`
      },
      // ---------- Aufgabe 3: SQL (30 P) ----------
      {
        id: "ga2-sim-2-3a", part: "GA2", topic: "ga2-sql-select", type: "sql", difficulty: 1, points: 5,
        context: SQL_CONTEXT,
        question: `<b>Aufgabe 3 a)</b> Geben Sie alle Artikel mit einem Preis <b>von 20,00 € bis einschließlich 50,00 €</b> aus, die <b>vorrätig</b> sind (Bestand größer 0). Ausgabe: <code>art_nr, bezeichnung, preis</code>, absteigend nach Preis sortiert.`,
        sql: {
          setup: SQL_SETUP,
          solution: `SELECT art_nr, bezeichnung, preis
FROM artikel
WHERE preis BETWEEN 20 AND 50
  AND bestand > 0
ORDER BY preis DESC;`,
          ordered: true
        },
        solution: `<pre><code>SELECT art_nr, bezeichnung, preis
FROM artikel
WHERE preis BETWEEN 20 AND 50
  AND bestand &gt; 0
ORDER BY preis DESC;</code></pre>
<p>Ergebnis: 301 (45,00), 102 (39,50), 302 (32,00), 101 (29,90). Die Artikel 203 und 402 liegen im Preisbereich, sind aber nicht vorrätig. <code>BETWEEN</code> schließt beide Grenzen ein. Punkte: Preisbereich 2 P, Bestand 1 P, Sortierung 1 P, Projektion 1 P.</p>`
      },
      {
        id: "ga2-sim-2-3b", part: "GA2", topic: "ga2-sql-join", type: "sql", difficulty: 2, points: 5,
        context: SQL_CONTEXT,
        question: `<b>Aufgabe 3 b)</b> Für die Kommissionierung werden alle Positionen der Bestellungen mit Status <b>'offen'</b> benötigt. Ausgabe: <code>best_nr, name</code> (Kunde)<code>, bezeichnung</code> (Artikel)<code>, menge</code>, sortiert nach Bestellnummer und Artikelbezeichnung.`,
        sql: {
          setup: SQL_SETUP,
          solution: `SELECT b.best_nr, k.name, a.bezeichnung, bp.menge
FROM bestellung b
JOIN kunde k ON k.kd_nr = b.kd_nr
JOIN bestellposition bp ON bp.best_nr = b.best_nr
JOIN artikel a ON a.art_nr = bp.art_nr
WHERE b.status = 'offen'
ORDER BY b.best_nr, a.bezeichnung;`,
          ordered: true
        },
        solution: `<pre><code>SELECT b.best_nr, k.name, a.bezeichnung, bp.menge
FROM bestellung b
JOIN kunde k ON k.kd_nr = b.kd_nr
JOIN bestellposition bp ON bp.best_nr = b.best_nr
JOIN artikel a ON a.art_nr = bp.art_nr
WHERE b.status = 'offen'
ORDER BY b.best_nr, a.bezeichnung;</code></pre>
<p>Ergebnis: 1007 Markus Brandt – Brüheinheit KVA 1 / HEPA-Filter Staubsauger 1; 1009 Sabine Hoffmann – Thermostat KS universal 1; 1010 Petra Lindemann – HEPA-Filter Staubsauger 3 / Sprüharm unten GS 1. Punkte: drei Joins mit korrekten Bedingungen 3 P, Filter 1 P, Sortierung 1 P.</p>`
      },
      {
        id: "ga2-sim-2-3c", part: "GA2", topic: "ga2-sql-aggregat", type: "sql", difficulty: 2, points: 5,
        context: SQL_CONTEXT,
        question: `<b>Aufgabe 3 c)</b> Ermitteln Sie den <b>Umsatz je Kategorie</b> (Summe aus <code>menge · einzelpreis</code>) für alle Bestellungen mit Status <b>'versendet'</b>. Ausgabe: <code>bezeichnung</code> (Kategorie)<code>, umsatz</code> (mit <code>ROUND</code> auf zwei Nachkommastellen gerundet), absteigend nach Umsatz sortiert.`,
        sql: {
          setup: SQL_SETUP,
          solution: `SELECT k.bezeichnung, ROUND(SUM(bp.menge * bp.einzelpreis), 2) AS umsatz
FROM kategorie k
JOIN artikel a ON a.kat_id = k.kat_id
JOIN bestellposition bp ON bp.art_nr = a.art_nr
JOIN bestellung b ON b.best_nr = bp.best_nr
WHERE b.status = 'versendet'
GROUP BY k.kat_id, k.bezeichnung
ORDER BY umsatz DESC;`,
          ordered: true
        },
        solution: `<pre><code>SELECT k.bezeichnung, ROUND(SUM(bp.menge * bp.einzelpreis), 2) AS umsatz
FROM kategorie k
JOIN artikel a ON a.kat_id = k.kat_id
JOIN bestellposition bp ON bp.art_nr = a.art_nr
JOIN bestellung b ON b.best_nr = bp.best_nr
WHERE b.status = 'versendet'
GROUP BY k.kat_id, k.bezeichnung
ORDER BY umsatz DESC;</code></pre>
<p>Ergebnis: Waschmaschine 451,90; Geschirrspüler 318,50; Kühlschrank 77,00; Staubsauger 29,98 (Kaffeevollautomat hat keine versendeten Bestellungen). Der <b>einzelpreis</b> der Position ist zu verwenden, nicht der aktuelle Artikelpreis (Bestellung 1008: 85,00 € statt 89,00 €). Punkte: Joins 2 P, Filter 1 P, SUM/GROUP BY 1 P, Sortierung 1 P.</p>`
      },
      {
        id: "ga2-sim-2-3d", part: "GA2", topic: "ga2-sql-subquery", type: "sql", difficulty: 3, points: 5,
        context: SQL_CONTEXT,
        question: `<b>Aufgabe 3 d)</b> Ermitteln Sie alle Artikel, deren Preis <b>über dem Durchschnittspreis ihrer eigenen Kategorie</b> liegt (korrelierte Unterabfrage). Ausgabe: <code>art_nr, bezeichnung, preis</code>.`,
        sql: {
          setup: SQL_SETUP,
          solution: `SELECT a.art_nr, a.bezeichnung, a.preis
FROM artikel a
WHERE a.preis > (SELECT AVG(a2.preis) FROM artikel a2 WHERE a2.kat_id = a.kat_id);`
        },
        solution: `<pre><code>SELECT a.art_nr, a.bezeichnung, a.preis
FROM artikel a
WHERE a.preis &gt; (SELECT AVG(a2.preis)
                 FROM artikel a2
                 WHERE a2.kat_id = a.kat_id);</code></pre>
<p>Durchschnitte: Waschmaschine 34,08; Geschirrspüler 44,13; Kühlschrank 38,50; Staubsauger 18,25; Kaffeevollautomat 79,00. Ergebnis: 102, 104, 202, 301, 402. Punkte: Unterabfrage mit AVG 2 P, Korrelation über kat_id mit Tabellenalias 2 P, Vergleich/Projektion 1 P.</p>`
      },
      {
        id: "ga2-sim-2-3e", part: "GA2", topic: "ga2-sql-dml", type: "sql", difficulty: 2, points: 5,
        context: SQL_CONTEXT,
        question: `<b>Aufgabe 3 e)</b> Nach einer Lieferung soll der Bestand <b>aller Artikel der Kategorie 'Geschirrspüler'</b> um jeweils <b>10 Stück</b> erhöht werden. Verwenden Sie die Kategoriebezeichnung (nicht die kat_id) in Ihrer Anweisung.`,
        sql: {
          setup: SQL_SETUP,
          solution: `UPDATE artikel
SET bestand = bestand + 10
WHERE kat_id = (SELECT kat_id FROM kategorie WHERE bezeichnung = 'Geschirrspüler');`,
          check: `SELECT art_nr, bestand FROM artikel ORDER BY art_nr;`
        },
        solution: `<pre><code>UPDATE artikel
SET bestand = bestand + 10
WHERE kat_id = (SELECT kat_id
                FROM kategorie
                WHERE bezeichnung = 'Geschirrspüler');</code></pre>
<p>Betroffen: 201 (22 → 32), 202 (3 → 13), 203 (0 → 10). Alternativ mit <code>WHERE kat_id IN (SELECT …)</code>. Punkte: UPDATE/SET mit relativer Erhöhung 2 P, Unterabfrage 3 P.</p>`
      },
      {
        id: "ga2-sim-2-3f", part: "GA2", topic: "ga2-sql-dml", type: "sql", difficulty: 3, points: 5,
        context: SQL_CONTEXT,
        question: `<b>Aufgabe 3 f)</b> Das Sortiment wird bereinigt: Löschen Sie alle Artikel, die <b>keinen Bestand</b> haben (Bestand 0) <b>und noch nie bestellt</b> wurden.`,
        sql: {
          setup: SQL_SETUP,
          solution: `DELETE FROM artikel
WHERE bestand = 0
  AND art_nr NOT IN (SELECT art_nr FROM bestellposition);`,
          check: `SELECT art_nr FROM artikel ORDER BY art_nr;`
        },
        solution: `<pre><code>DELETE FROM artikel
WHERE bestand = 0
  AND art_nr NOT IN (SELECT art_nr FROM bestellposition);</code></pre>
<p>Gelöscht werden 203 (Besteckkorb GS) und 402 (Bodendüse 35 mm); Artikel 104 wurde zwar nie bestellt, hat aber Bestand 2. Alternativ <code>AND NOT EXISTS (SELECT 1 FROM bestellposition bp WHERE bp.art_nr = artikel.art_nr)</code>. Bestellte Artikel dürfen wegen der referenziellen Integrität ohnehin nicht gelöscht werden. Punkte: DELETE mit Bestandsbedingung 2 P, NOT IN/NOT EXISTS 3 P.</p>`
      },
      // ---------- Aufgabe 4: Zahlensysteme, Datenformate, Rekursion, Datenstrukturen (20 P) ----------
      {
        id: "ga2-sim-2-4a", part: "GA2", topic: "ga2-zahlensysteme", type: "numeric", difficulty: 1, points: 3,
        question: `<b>Aufgabe 4 a)</b> In alten Lieferantendaten sind Artikelnummern hexadezimal gespeichert. Rechnen Sie die Artikelnummer <code>3F7A</code> (hexadezimal) in das Dezimalsystem um.`,
        answer: 16250, tolerance: 0,
        solution: `<p>3F7A<sub>16</sub> = 3 · 16³ + 15 · 16² + 7 · 16¹ + 10 · 16⁰ = 3 · 4096 + 15 · 256 + 7 · 16 + 10 = 12.288 + 3.840 + 112 + 10 = <b>16.250</b></p>`
      },
      {
        id: "ga2-sim-2-4b", part: "GA2", topic: "ga2-exceptions-formate", type: "text", difficulty: 2, points: 5,
        question: `<b>Aufgabe 4 b)</b> Nachbestellungen werden als XML an Lieferanten übermittelt. Erstellen Sie ein <b>wohlgeformtes</b> XML-Dokument für die Nachbestellung Nr. <i>N-2026-117</i> vom <i>24.11.2026</i> beim Lieferanten <i>L-30</i> mit den Positionen Artikel <i>202</i> (Menge 20) und Artikel <i>203</i> (Menge 15). Die Bestellnummer und das Datum sollen als <b>Attribute</b> abgebildet werden. Erläutern Sie anschließend den Unterschied zwischen einem <i>wohlgeformten</i> und einem <i>gültigen</i> XML-Dokument.`,
        solution: `<pre><code>&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;nachbestellung nr="N-2026-117" datum="2026-11-24"&gt;
  &lt;lieferant&gt;L-30&lt;/lieferant&gt;
  &lt;positionen&gt;
    &lt;position&gt;
      &lt;artikel&gt;202&lt;/artikel&gt;
      &lt;menge&gt;20&lt;/menge&gt;
    &lt;/position&gt;
    &lt;position&gt;
      &lt;artikel&gt;203&lt;/artikel&gt;
      &lt;menge&gt;15&lt;/menge&gt;
    &lt;/position&gt;
  &lt;/positionen&gt;
&lt;/nachbestellung&gt;</code></pre>
<p>Punkte XML (3 P): Prolog 0,5 P, genau ein Wurzelelement mit Attributen in Anführungszeichen 1 P, korrekt verschachtelte und geschlossene Elemente 1,5 P.</p>
<ul>
<li><b>Wohlgeformt</b> (1 P): Das Dokument hält die XML-Syntaxregeln ein (ein Wurzelelement, jedes Start-Tag hat ein End-Tag, korrekte Verschachtelung, Groß-/Kleinschreibung, Attributwerte in Anführungszeichen, eindeutige Attributnamen).</li>
<li><b>Gültig (valide)</b> (1 P): Das Dokument ist wohlgeformt <b>und</b> entspricht zusätzlich einer Strukturdefinition (DTD oder XML Schema/XSD), z. B. erlaubte Elemente, Reihenfolge, Datentypen.</li>
</ul>`,
        keywords: ["<?xml", "nr=\"n-2026-117\"|nr=", "datum=", "<position>", "</nachbestellung>", "wohlgeformt", "gültig|gueltig|valide", "dtd|xsd|schema"]
      },
      {
        id: "ga2-sim-2-4c", part: "GA2", topic: "ga2-rekursion", type: "code", lang: "pseudocode", difficulty: 3, points: 7,
        context: `<p>Kategorien sind hierarchisch organisiert. Jede Kategorie hat die Attribute <code>name</code> (Text), <code>anzahlArtikel</code> (Anzahl der Artikel direkt in dieser Kategorie), <code>eltern</code> (übergeordnete Kategorie oder <code>null</code> bei der Wurzel) und <code>unterkategorien</code> (Liste, ggf. leer). Beispiel:</p>
<pre><code>Haushaltsgeräte (0)
 ├─ Waschmaschine (120)
 │    ├─ Pumpen (35)
 │    └─ Dichtungen (48)
 └─ Kühlschrank (60)
      └─ Thermostate (12)</code></pre>`,
        question: `<b>Aufgabe 4 c)</b> Entwickeln Sie zwei <b>rekursive</b> Funktionen:
<ol><li><code>gesamtArtikel(k)</code> liefert die Anzahl der Artikel in <code>k</code> einschließlich aller Unterkategorien (beliebig tief).</li>
<li><code>pfad(k)</code> liefert den Pfad von der Wurzel bis <code>k</code> als Text, z. B. für „Pumpen“: <code>"Haushaltsgeräte &gt; Waschmaschine &gt; Pumpen"</code>.</li></ol>
Geben Sie außerdem den Rückgabewert von <code>gesamtArtikel</code> für die Kategorie „Waschmaschine“ an.`,
        starter: `funktion gesamtArtikel(k: Kategorie): Ganzzahl
  // ...
ende funktion

funktion pfad(k: Kategorie): Text
  // ...
ende funktion`,
        solution: `<pre><code>funktion gesamtArtikel(k: Kategorie): Ganzzahl
  summe ← k.anzahlArtikel
  für jede u in k.unterkategorien
    summe ← summe + gesamtArtikel(u)
  ende für
  rückgabe summe
ende funktion

funktion pfad(k: Kategorie): Text
  wenn k.eltern = null dann
    rückgabe k.name                         // Abbruch: Wurzel erreicht
  ende wenn
  rückgabe pfad(k.eltern) + " &gt; " + k.name
ende funktion</code></pre>
<p><b>gesamtArtikel(Waschmaschine)</b> = 120 + 35 + 48 = <b>203</b>.</p>
<p>Punkte: gesamtArtikel 3 P (eigene Anzahl, Rekursion über alle Kinder, Rückgabe); pfad 3 P (Abbruchbedingung Wurzel, rekursiver Aufruf für Eltern, richtige Reihenfolge der Verkettung); Ergebnis 1 P.</p>`,
        keywords: ["gesamtartikel(u)|gesamtartikel(", "anzahlartikel", "unterkategorien", "eltern = null|eltern == null|null", "pfad(k.eltern)", "\" > \"|>", "203"]
      },
      {
        id: "ga2-sim-2-4d", part: "GA2", topic: "ga2-datenstrukturen", type: "text", difficulty: 2, points: 5,
        question: `<b>Aufgabe 4 d)</b> Der Warenkorb wird bisher als <code>ArrayList&lt;Position&gt;</code> gespeichert; vor jedem Hinzufügen wird die Liste durchsucht, ob der Artikel schon enthalten ist. Ein Kollege schlägt eine <code>HashMap&lt;Integer, Position&gt;</code> mit der Artikelnummer als Schlüssel vor. Erläutern Sie die Funktionsweise einer HashMap, vergleichen Sie die Zeitkomplexität der Suche nach einer Artikelnummer und nennen Sie einen Nachteil der HashMap.`,
        solution: `<ul>
<li><b>Funktionsweise</b> (2 P): Aus dem Schlüssel wird mit einer Hashfunktion (<code>hashCode()</code>) ein Index in einem internen Array (Buckets) berechnet; dort wird das Schlüssel-Wert-Paar abgelegt. Bei Kollisionen (gleicher Bucket) werden die Einträge z. B. verkettet gespeichert und per <code>equals()</code> unterschieden. Schlüssel sind eindeutig.</li>
<li><b>Komplexität</b> (2 P): Suche in der ArrayList: lineare Suche <b>O(n)</b>; HashMap: im Mittel <b>O(1)</b> (konstant), im schlechtesten Fall (viele Kollisionen) O(n) bzw. O(log n) bei Baum-Buckets.</li>
<li><b>Nachteil</b> (1 P): keine definierte Reihenfolge der Einträge (Einfügereihenfolge geht verloren – ggf. <code>LinkedHashMap</code>), höherer Speicherbedarf, Schlüssel müssen <code>hashCode()</code>/<code>equals()</code> korrekt implementieren.</li>
</ul>`,
        keywords: ["hashfunktion|hashcode|hash", "bucket|index", "kollision", "o(1)|konstant", "o(n)|linear", "reihenfolge|speicher", "schlüssel|schluessel"]
      }
    ]
  });
})();

/* =====================================================================
   GA2 – Simulation 3: Vereinsverwaltung TSV Eintracht Neustadt
   ===================================================================== */
(function () {
  const SQL_SETUP = `CREATE TABLE mitglied (mitglied_id INTEGER PRIMARY KEY, vorname TEXT NOT NULL, nachname TEXT NOT NULL, geburtsdatum TEXT NOT NULL, eintritt TEXT NOT NULL);
CREATE TABLE abteilung (abt_id INTEGER PRIMARY KEY, bezeichnung TEXT NOT NULL, leiter_id INTEGER REFERENCES mitglied(mitglied_id));
CREATE TABLE mitgliedschaft (mitglied_id INTEGER NOT NULL REFERENCES mitglied(mitglied_id), abt_id INTEGER NOT NULL REFERENCES abteilung(abt_id), seit TEXT NOT NULL, PRIMARY KEY (mitglied_id, abt_id));
CREATE TABLE beitrag (beitrag_id INTEGER PRIMARY KEY, mitglied_id INTEGER NOT NULL REFERENCES mitglied(mitglied_id), jahr INTEGER NOT NULL, betrag REAL NOT NULL, bezahlt_am TEXT);
INSERT INTO mitglied VALUES
(1,'Anna','Berger','1985-03-14','2010-01-01'),(2,'Ben','Schröder','2012-07-22','2019-09-01'),(3,'Carla','Neumann','1958-11-02','1990-04-01'),
(4,'David','Krause','2009-01-30','2017-03-01'),(5,'Elif','Kaya','1996-05-19','2021-02-01'),(6,'Florian','Jung','1979-08-08','2005-06-01'),
(7,'Greta','Wolf','2015-12-01','2022-08-15'),(8,'Hannes','Vogel','1949-02-17','1975-01-01'),(9,'Ida','Lorenz','2008-04-04','2020-01-01'),
(10,'Jonas','Haas','1990-10-10','2026-03-01'),(11,'Klara','Winter','2001-06-30','2024-05-01'),(12,'Leon','Fuchs','1968-09-12','2026-01-15'),
(13,'Mia','Schuster','2018-02-02','2026-11-01');
INSERT INTO abteilung VALUES (1,'Fußball',6),(2,'Handball',1),(3,'Tischtennis',3),(4,'Turnen',5),(5,'Leichtathletik',NULL),(6,'Schach',8);
INSERT INTO mitgliedschaft VALUES
(1,2,'2010-01-01'),(1,4,'2015-09-01'),(2,1,'2019-09-01'),(3,3,'1990-04-01'),(3,6,'2000-01-01'),(4,1,'2017-03-01'),(4,2,'2020-08-01'),
(5,4,'2021-02-01'),(6,1,'2005-06-01'),(7,4,'2022-08-15'),(8,6,'1975-01-01'),(8,3,'1980-01-01'),(9,2,'2020-01-01'),(10,1,'2026-03-01'),
(11,4,'2024-05-01'),(11,2,'2025-01-01');
INSERT INTO beitrag VALUES
(1,1,2026,180.00,'2026-01-15'),(2,2,2026,60.00,'2026-01-20'),(3,3,2026,120.00,'2026-02-01'),(4,4,2026,90.00,NULL),
(5,5,2026,180.00,'2026-01-31'),(6,6,2026,180.00,NULL),(7,7,2026,60.00,'2026-03-03'),(8,8,2026,120.00,'2026-01-10'),
(9,9,2026,90.00,NULL),(10,10,2026,150.00,NULL),(11,11,2026,180.00,'2026-02-14'),(12,12,2026,180.00,NULL),(13,13,2026,10.00,NULL),
(14,4,2025,90.00,NULL),(15,6,2025,180.00,'2025-02-01'),(16,9,2025,90.00,'2025-03-01'),(17,1,2025,180.00,'2025-01-12');`;

  const SQL_CONTEXT = `<p>Die Mitgliederdatenbank des Vereins enthält folgende Tabellen (SQLite-Dialekt, Datumswerte als Text JJJJ-MM-TT):</p>
<table>
<tr><th>Tabelle</th><th>Spalten</th></tr>
<tr><td><b>mitglied</b></td><td><u>mitglied_id</u> INTEGER, vorname TEXT, nachname TEXT, geburtsdatum TEXT, eintritt TEXT</td></tr>
<tr><td><b>abteilung</b></td><td><u>abt_id</u> INTEGER, bezeichnung TEXT, leiter_id INTEGER (FK → mitglied, NULL = unbesetzt)</td></tr>
<tr><td><b>mitgliedschaft</b></td><td><u>mitglied_id</u> INTEGER (FK → mitglied), <u>abt_id</u> INTEGER (FK → abteilung), seit TEXT</td></tr>
<tr><td><b>beitrag</b></td><td><u>beitrag_id</u> INTEGER, mitglied_id INTEGER (FK → mitglied), jahr INTEGER, betrag REAL, bezahlt_am TEXT (NULL = offen)</td></tr>
</table>
<p>Auszug aus der Tabelle <b>beitrag</b>:</p>
<table>
<tr><th>beitrag_id</th><th>mitglied_id</th><th>jahr</th><th>betrag</th><th>bezahlt_am</th></tr>
<tr><td>3</td><td>3</td><td>2026</td><td>120.00</td><td>2026-02-01</td></tr>
<tr><td>4</td><td>4</td><td>2026</td><td>90.00</td><td>NULL</td></tr>
<tr><td>14</td><td>4</td><td>2025</td><td>90.00</td><td>NULL</td></tr>
<tr><td>…</td><td>…</td><td>…</td><td>…</td><td>…</td></tr>
</table>`;

  const BEITRAG_REGELN = `<p>Beitragsordnung (Jahresbeitrag nach dem Alter zum 1. Januar des Beitragsjahres):</p>
<table>
<tr><th>Alter</th><th>Jahresbeitrag</th></tr>
<tr><td>unter 14 Jahre</td><td>60,00 €</td></tr>
<tr><td>14 bis 17 Jahre</td><td>90,00 €</td></tr>
<tr><td>18 bis 64 Jahre</td><td>180,00 €</td></tr>
<tr><td>ab 65 Jahre</td><td>120,00 €</td></tr>
</table>
<p>Familienregelung: Für das dritte und jedes weitere Familienmitglied (Reihenfolge wie im übergebenen Array) wird nur der halbe Beitrag erhoben. Der Beitrag einer Familie ist auf höchstens 400,00 € begrenzt.</p>`;

  const PUNKTE_CODE = `<pre><code>funktion punkte(tore: Array von Ganzzahl, gegentore: Array von Ganzzahl): Ganzzahl
  p ← 0
  serie ← 0
  für i ← 0 bis länge(tore) - 1
    wenn tore[i] &gt; gegentore[i] dann
      p ← p + 3
      serie ← serie + 1
      wenn serie = 3 dann
        p ← p + 1            // Bonuspunkt für drei Siege in Folge
        serie ← 0
      ende wenn
    sonst wenn tore[i] = gegentore[i] dann
      p ← p + 1
      serie ← 0
    sonst
      serie ← 0
    ende wenn
  ende für
  rückgabe p
ende funktion</code></pre>`;

  AP2.exams.push({
    id: "ga2-sim-3",
    part: "GA2",
    title: "Simulation GA2 #3 – Vereinsverwaltung „VereinsHub“ für den TSV Eintracht Neustadt",
    minutes: 90,
    scenario: `<p>Sie sind Anwendungsentwicklerin bzw. Anwendungsentwickler bei der <b>WebWerk Pfalz GmbH</b> in Neustadt an der Weinstraße. Ihr Unternehmen entwickelt für den Sportverein <b>TSV Eintracht Neustadt 1908 e. V.</b> die Software <b>„VereinsHub“</b>.</p>
<p>Der Verein hat ca. 1.400 Mitglieder in sechs Abteilungen (Fußball, Handball, Tischtennis, Turnen, Leichtathletik, Schach). Bisher werden Mitglieder, Beiträge und Mannschaften in mehreren Excel-Dateien verwaltet, die die ehrenamtliche Geschäftsstelle pflegt.</p>
<p>„VereinsHub“ soll</p>
<ul>
<li>die Jahresbeiträge nach Beitragsordnung automatisch berechnen und offene Beiträge überwachen,</li>
<li>Mitglieder- und Mannschaftslisten sortiert ausgeben,</li>
<li>Turnier- und Spielpläne unterstützen,</li>
<li>die Altdaten per CSV-Import übernehmen und Daten per JSON an die Vereins-App liefern.</li>
</ul>
<p>Bearbeiten Sie die folgenden vier Aufgaben (90 Minuten, 100 Punkte). Algorithmen sind in Pseudocode oder einer gängigen Programmiersprache zu formulieren.</p>`,
    tasks: [
      // ---------- Aufgabe 1: Algorithmen (26 P) ----------
      {
        id: "ga2-sim-3-1a", part: "GA2", topic: "ga2-pseudocode", type: "code", lang: "pseudocode", difficulty: 2, points: 8,
        context: BEITRAG_REGELN,
        question: `<b>Aufgabe 1 a)</b> Entwickeln Sie die Funktion <code>familienbeitrag(alter: Array von Ganzzahl): Gleitkommazahl</code>, die den Jahresbeitrag einer Familie berechnet. Das Array enthält das Alter jedes Familienmitglieds zum 1. Januar. Lagern Sie die Ermittlung des Einzelbeitrags in eine Funktion <code>einzelbeitrag(alter)</code> aus.`,
        starter: `funktion einzelbeitrag(alter: Ganzzahl): Gleitkommazahl
  // ...
ende funktion

funktion familienbeitrag(alter: Array von Ganzzahl): Gleitkommazahl
  // ...
ende funktion`,
        solution: `<pre><code>funktion einzelbeitrag(alter: Ganzzahl): Gleitkommazahl
  wenn alter &lt; 14 dann
    rückgabe 60.00
  sonst wenn alter &lt; 18 dann
    rückgabe 90.00
  sonst wenn alter &lt; 65 dann
    rückgabe 180.00
  sonst
    rückgabe 120.00
  ende wenn
ende funktion

funktion familienbeitrag(alter: Array von Ganzzahl): Gleitkommazahl
  summe ← 0.0
  für i ← 0 bis länge(alter) - 1
    b ← einzelbeitrag(alter[i])
    wenn i &gt;= 2 dann            // drittes und weiteres Mitglied
      b ← b / 2
    ende wenn
    summe ← summe + b
  ende für
  wenn summe &gt; 400.00 dann
    summe ← 400.00
  ende wenn
  rückgabe summe
ende funktion</code></pre>
<p>Punkte: Altersstufen mit korrekten Grenzen 3 P; Schleife 1 P; Halbierung ab Index 2 (dritte Person) 2 P; Deckelung 1 P; Summierung/Rückgabe 1 P.</p>`,
        keywords: ["14", "18", "65", "60", "90", "180", "120", "i >= 2|i>=2|index 2|dritte", "/ 2|* 0.5|0.5|/2", "400"]
      },
      {
        id: "ga2-sim-3-1b", part: "GA2", topic: "ga2-pseudocode", type: "numeric", difficulty: 1, points: 4,
        context: BEITRAG_REGELN,
        question: `<b>Aufgabe 1 b)</b> Berechnen Sie den Rückgabewert von <code>familienbeitrag([44, 70, 16, 12])</code>.`,
        answer: 375, tolerance: 0.01, unit: "€",
        solution: `<table>
<tr><th>Index</th><th>Alter</th><th>Einzelbeitrag</th><th>Familienregel</th><th>Beitrag</th></tr>
<tr><td>0</td><td>44</td><td>180,00 €</td><td>–</td><td>180,00 €</td></tr>
<tr><td>1</td><td>70</td><td>120,00 €</td><td>–</td><td>120,00 €</td></tr>
<tr><td>2</td><td>16</td><td>90,00 €</td><td>halber Beitrag</td><td>45,00 €</td></tr>
<tr><td>3</td><td>12</td><td>60,00 €</td><td>halber Beitrag</td><td>30,00 €</td></tr>
</table><p>Summe: <b>375,00 €</b> (unter der Höchstgrenze von 400,00 €).</p>`
      },
      {
        id: "ga2-sim-3-1c", part: "GA2", topic: "ga2-pseudocode", type: "code", lang: "pseudocode", difficulty: 2, points: 6,
        question: `<b>Aufgabe 1 c)</b> Für die Beitragsberechnung muss das Alter zu einem Stichtag bestimmt werden. Entwickeln Sie die Funktion <code>alterAm(gebTag, gebMonat, gebJahr, tag, monat, jahr)</code>, die das Alter in vollendeten Jahren zum angegebenen Stichtag zurückgibt (alle Parameter Ganzzahlen). Geben Sie zusätzlich zwei Testfälle mit erwartetem Ergebnis an, darunter einen Grenzfall.`,
        starter: `funktion alterAm(gebTag, gebMonat, gebJahr, tag, monat, jahr: Ganzzahl): Ganzzahl
  // ...
ende funktion`,
        solution: `<pre><code>funktion alterAm(gebTag, gebMonat, gebJahr, tag, monat, jahr: Ganzzahl): Ganzzahl
  alter ← jahr - gebJahr
  wenn monat &lt; gebMonat oder (monat = gebMonat und tag &lt; gebTag) dann
    alter ← alter - 1          // Geburtstag im Stichtagsjahr noch nicht erreicht
  ende wenn
  rückgabe alter
ende funktion</code></pre>
<p><b>Testfälle</b> (je 1 P), z. B.:</p><ul>
<li>Geburtstag 14.03.1985, Stichtag 01.01.2026 ⇒ <b>40</b> (Geburtstag noch nicht erreicht)</li>
<li>Grenzfall: Geburtstag 01.01.2012, Stichtag 01.01.2026 ⇒ <b>14</b> (Geburtstag genau am Stichtag zählt als vollendet)</li>
<li>Geburtstag 02.01.2012, Stichtag 01.01.2026 ⇒ 13</li>
</ul>
<p>Punkte: Jahresdifferenz 1 P; Korrektur bei noch nicht erreichtem Geburtstag mit Monats- <i>und</i> Tagesvergleich 3 P; Testfälle 2 P.</p>`,
        keywords: ["jahr - gebjahr", "monat < gebmonat|monat<gebmonat", "tag < gebtag|tag<gebtag", "- 1|-1", "oder|or", "und|and"]
      },
      {
        id: "ga2-sim-3-1d", part: "GA2", topic: "ga2-pseudocode", type: "numeric", difficulty: 2, points: 4,
        context: `<p>Für die Tabelle der Jugendliga wird folgende Funktion verwendet:</p>${PUNKTE_CODE}`,
        question: `<b>Aufgabe 1 d)</b> Führen Sie einen Schreibtischtest für den Aufruf <code>punkte([2, 1, 3, 0, 2, 4, 1, 2], [1, 0, 1, 0, 3, 2, 0, 1])</code> durch. Welchen Wert liefert die Funktion?`,
        answer: 21, tolerance: 0,
        solution: `<table>
<tr><th>i</th><th>Ergebnis</th><th>p</th><th>serie</th></tr>
<tr><td>0</td><td>2:1 Sieg</td><td>3</td><td>1</td></tr>
<tr><td>1</td><td>1:0 Sieg</td><td>6</td><td>2</td></tr>
<tr><td>2</td><td>3:1 Sieg, Serie = 3 ⇒ Bonus</td><td>10</td><td>0</td></tr>
<tr><td>3</td><td>0:0 Unentschieden</td><td>11</td><td>0</td></tr>
<tr><td>4</td><td>2:3 Niederlage</td><td>11</td><td>0</td></tr>
<tr><td>5</td><td>4:2 Sieg</td><td>14</td><td>1</td></tr>
<tr><td>6</td><td>1:0 Sieg</td><td>17</td><td>2</td></tr>
<tr><td>7</td><td>2:1 Sieg, Serie = 3 ⇒ Bonus</td><td>21</td><td>0</td></tr>
</table><p>Rückgabewert: <b>21</b>.</p>`
      },
      {
        id: "ga2-sim-3-1e", part: "GA2", topic: "ga2-pseudocode", type: "text", difficulty: 1, points: 4,
        question: `<b>Aufgabe 1 e)</b> Für die Eingabe einer gültigen Mitgliedsnummer (Wiederholung, bis die Eingabe gültig ist) schlägt ein Kollege eine kopfgesteuerte Schleife vor. Erläutern Sie den Unterschied zwischen <b>kopfgesteuerter</b> und <b>fußgesteuerter</b> Schleife und begründen Sie, welche Schleifenart für diesen Anwendungsfall besser geeignet ist.`,
        solution: `<ul>
<li><b>Kopfgesteuert</b> (1,5 P; z. B. <code>while</code>, <code>solange … wiederhole</code>): Die Bedingung wird <b>vor</b> jedem Durchlauf geprüft; der Schleifenrumpf wird ggf. <b>nie</b> ausgeführt (0 bis n Durchläufe).</li>
<li><b>Fußgesteuert</b> (1,5 P; z. B. <code>do … while</code>, <code>wiederhole … bis</code>): Die Bedingung wird <b>nach</b> dem Durchlauf geprüft; der Rumpf wird <b>mindestens einmal</b> ausgeführt.</li>
<li><b>Eignung</b> (1 P): Die <b>fußgesteuerte</b> Schleife, da die Eingabe mindestens einmal erfolgen muss, bevor sie geprüft werden kann; bei einer kopfgesteuerten Schleife müsste die Eingabe vor der Schleife dupliziert oder die Variable künstlich vorbelegt werden.</li>
</ul>`,
        keywords: ["vor", "nach", "mindestens einmal|mind. einmal|mindestens 1", "while", "do", "fußgesteuert|fussgesteuert", "eingabe"]
      },
      // ---------- Aufgabe 2: Sortieren, Suchen, OOP (24 P) ----------
      {
        id: "ga2-sim-3-2a", part: "GA2", topic: "ga2-sortieren-suchen", type: "code", lang: "pseudocode", difficulty: 3, points: 7,
        context: `<p>Ein <code>Mitglied</code> besitzt die Attribute <code>nachname</code> und <code>vorname</code> (Text). Die Funktion <code>vergleiche(a: Text, b: Text): Ganzzahl</code> liefert einen negativen Wert, wenn <code>a</code> alphabetisch vor <code>b</code> steht, 0 bei Gleichheit und einen positiven Wert sonst.</p>`,
        question: `<b>Aufgabe 2 a)</b> Entwickeln Sie die Prozedur <code>sortiereMitglieder(m: Array von Mitglied)</code>, die das Array mit dem Verfahren <b>Sortieren durch Einfügen (Insertionsort)</b> alphabetisch nach Nachname und bei gleichem Nachnamen nach Vorname sortiert. Das Verfahren soll <b>stabil</b> bleiben.`,
        starter: `prozedur sortiereMitglieder(m: Array von Mitglied)
  // ...
ende prozedur`,
        solution: `<pre><code>funktion kommtNach(a: Mitglied, b: Mitglied): Wahrheitswert
  c ← vergleiche(a.nachname, b.nachname)
  wenn c = 0 dann
    c ← vergleiche(a.vorname, b.vorname)
  ende wenn
  rückgabe c &gt; 0                 // nur echt größer ⇒ stabil
ende funktion

prozedur sortiereMitglieder(m: Array von Mitglied)
  für i ← 1 bis länge(m) - 1
    aktuell ← m[i]
    j ← i - 1
    solange j &gt;= 0 und kommtNach(m[j], aktuell) wiederhole
      m[j + 1] ← m[j]            // größere Elemente nach rechts schieben
      j ← j - 1
    ende solange
    m[j + 1] ← aktuell           // an freie Stelle einfügen
  ende für
ende prozedur</code></pre>
<p>Punkte: äußere Schleife ab Index 1 1 P; Zwischenspeichern des aktuellen Elements 1 P; innere Schleife mit Abbruchbedingung <code>j &gt;= 0</code> 1,5 P; Verschieben und Einfügen 2 P; zweistufiger Vergleich mit „&gt;“ (Stabilität) 1,5 P.</p>`,
        keywords: ["aktuell|temp|key", "j >= 0|j>=0", "m[j + 1]|m[j+1]", "j - 1|j-1", "nachname", "vorname", "> 0|>0", "solange|while"]
      },
      {
        id: "ga2-sim-3-2b", part: "GA2", topic: "ga2-sortieren-suchen", type: "text", difficulty: 2, points: 4,
        question: `<b>Aufgabe 2 b)</b> Erläutern Sie, was ein <b>stabiles</b> Sortierverfahren ist, und beschreiben Sie an einem Beispiel aus der Vereinsverwaltung, warum Stabilität relevant sein kann. Geben Sie an, an welcher Stelle Ihres Algorithmus aus 2 a) die Stabilität entschieden wird.`,
        solution: `<ul>
<li><b>Definition</b> (1,5 P): Ein Sortierverfahren ist stabil, wenn Elemente mit <b>gleichem Sortierschlüssel</b> ihre <b>relative Reihenfolge</b> aus der Eingabe behalten.</li>
<li><b>Beispiel</b> (1,5 P): Die Mitgliederliste ist bereits nach Eintrittsdatum sortiert und soll nun nach Abteilung sortiert werden. Mit einem stabilen Verfahren bleiben die Mitglieder innerhalb jeder Abteilung weiterhin nach Eintrittsdatum geordnet (mehrstufiges Sortieren in mehreren Durchläufen).</li>
<li><b>Stelle im Algorithmus</b> (1 P): Im Vergleich der inneren Schleife: Es wird nur verschoben, wenn das linke Element <b>echt größer</b> ist (<code>&gt; 0</code>). Mit <code>&gt;= 0</code> würden gleiche Elemente überholt und das Verfahren wäre nicht mehr stabil.</li>
</ul>`,
        keywords: ["gleich", "reihenfolge", "relativ|behalten|beibehalten", "> 0|echt größer|echt groesser", ">= 0", "abteilung|eintritt|mehrstufig"]
      },
      {
        id: "ga2-sim-3-2c", part: "GA2", topic: "ga2-komplexitaet", type: "numeric", difficulty: 2, points: 3,
        question: `<b>Aufgabe 2 c)</b> Die sortierte Mitgliederliste einer Abteilung enthält <b>1.000</b> Einträge. Wie viele Elementvergleiche benötigt eine binäre Suche im <b>schlechtesten Fall</b> höchstens, um einen Namen zu finden oder festzustellen, dass er nicht enthalten ist?`,
        answer: 10, tolerance: 0, unit: "Vergleiche",
        solution: `<p>Jeder Vergleich halbiert den Suchbereich. Benötigt wird die kleinste Zahl k mit 2<sup>k</sup> &gt; 1.000 bzw. k = ⌊log₂ 1.000⌋ + 1.</p><p>2<sup>9</sup> = 512 ≤ 1.000 &lt; 1.024 = 2<sup>10</sup> ⇒ <b>10 Vergleiche</b> (Zeitkomplexität O(log n)).</p>`
      },
      {
        id: "ga2-sim-3-2d", part: "GA2", topic: "ga2-oop", type: "code", lang: "java", difficulty: 2, points: 6,
        context: `<p>Klassendiagramm (Ausschnitt):</p>
<pre><code>Klasse Spieler
  - name : String
  - alter : int
  + getAlter() : int

Klasse Mannschaft
  - MAX_SPIELER : int = 22  {readOnly, static}
  - name : String
  - spieler : List&lt;Spieler&gt;
  + Mannschaft(name : String)
  + hinzufuegen(s : Spieler) : boolean
  + durchschnittsalter() : double

Mannschaft "0..*" ◇——— "0..22" Spieler   (Aggregation)</code></pre>`,
        question: `<b>Aufgabe 2 d)</b> Implementieren Sie die Klasse <code>Mannschaft</code> in Java. <code>hinzufuegen</code> nimmt einen Spieler nur auf, wenn er nicht <code>null</code> ist, noch nicht im Kader steht und die Höchstzahl nicht erreicht ist; der Rückgabewert zeigt den Erfolg an. <code>durchschnittsalter</code> liefert 0, wenn kein Spieler im Kader ist.`,
        starter: `import java.util.ArrayList;
import java.util.List;

public class Mannschaft {
    // ...
}`,
        solution: `<pre><code>import java.util.ArrayList;
import java.util.List;

public class Mannschaft {
    private static final int MAX_SPIELER = 22;
    private String name;
    private List&lt;Spieler&gt; spieler = new ArrayList&lt;&gt;();

    public Mannschaft(String name) {
        this.name = name;
    }

    public boolean hinzufuegen(Spieler s) {
        if (s == null || spieler.contains(s) || spieler.size() &gt;= MAX_SPIELER) {
            return false;
        }
        spieler.add(s);
        return true;
    }

    public double durchschnittsalter() {
        if (spieler.isEmpty()) {
            return 0;
        }
        int summe = 0;
        for (Spieler s : spieler) {
            summe += s.getAlter();
        }
        return (double) summe / spieler.size();
    }
}</code></pre>
<p>Punkte: Attribute inkl. Konstante und initialisierter Liste 1,5 P; Konstruktor 0,5 P; hinzufuegen mit drei Prüfungen 2 P; durchschnittsalter mit Sonderfall und Gleitkommadivision 2 P.</p>`,
        explanation: "Typischer Fehler: summe / spieler.size() mit zwei int-Werten ist eine Ganzzahldivision – der Nachkommaanteil geht verloren. Mindestens ein Operand muss nach double gecastet werden.",
        keywords: ["static final", "arraylist", "contains", "size() >= max_spieler|>= 22|>= max", "return false", "isempty|size() == 0", "(double)", "getalter"]
      },
      {
        id: "ga2-sim-3-2e", part: "GA2", topic: "ga2-komplexitaet", type: "mc", difficulty: 2, points: 4,
        question: `<b>Aufgabe 2 e)</b> Welche Aussage zur Zeitkomplexität von Sortierverfahren ist <b>korrekt</b>?`,
        options: [
          "Mergesort hat im besten, mittleren und schlechtesten Fall eine Laufzeit von O(n log n), benötigt jedoch zusätzlichen Speicher in der Größenordnung O(n).",
          "Quicksort hat auch im schlechtesten Fall eine Laufzeit von O(n log n).",
          "Bubblesort hat auch mit Abbruch bei fehlender Vertauschung im besten Fall eine Laufzeit von O(n²).",
          "Insertionsort ist für große, zufällig angeordnete Datenmengen schneller als Mergesort.",
          "Die binäre Suche hat eine Laufzeit von O(n log n)."
        ],
        correct: [0],
        solution: `Mergesort teilt immer in Hälften (log n Ebenen) und mischt pro Ebene n Elemente ⇒ stets O(n log n), benötigt aber ein Hilfsarray. Quicksort hat im schlechtesten Fall (ungünstiges Pivot, z. B. bereits sortierte Daten mit erstem Element als Pivot) O(n²). Bubblesort mit Abbruch ist bei sortierten Daten O(n). Insertionsort ist im Mittel O(n²) und nur für kleine bzw. fast sortierte Daten vorteilhaft. Die binäre Suche ist O(log n).`
      },
      // ---------- Aufgabe 3: SQL (30 P) ----------
      {
        id: "ga2-sim-3-3a", part: "GA2", topic: "ga2-sql-join", type: "sql", difficulty: 1, points: 5,
        context: SQL_CONTEXT,
        question: `<b>Aufgabe 3 a)</b> Der Fußballtrainer benötigt eine Liste aller Mitglieder der Abteilung <b>'Fußball'</b>. Ausgabe: <code>vorname, nachname, geburtsdatum</code>, alphabetisch nach Nachname sortiert.`,
        sql: {
          setup: SQL_SETUP,
          solution: `SELECT m.vorname, m.nachname, m.geburtsdatum
FROM mitglied m
JOIN mitgliedschaft ms ON ms.mitglied_id = m.mitglied_id
JOIN abteilung a ON a.abt_id = ms.abt_id
WHERE a.bezeichnung = 'Fußball'
ORDER BY m.nachname;`,
          ordered: true
        },
        solution: `<pre><code>SELECT m.vorname, m.nachname, m.geburtsdatum
FROM mitglied m
JOIN mitgliedschaft ms ON ms.mitglied_id = m.mitglied_id
JOIN abteilung a ON a.abt_id = ms.abt_id
WHERE a.bezeichnung = 'Fußball'
ORDER BY m.nachname;</code></pre>
<p>Ergebnis: Jonas Haas, Florian Jung, David Krause, Ben Schröder. Punkte: Join über die Zwischentabelle 3 P, Filter 1 P, Sortierung 1 P.</p>`
      },
      {
        id: "ga2-sim-3-3b", part: "GA2", topic: "ga2-sql-aggregat", type: "sql", difficulty: 2, points: 5,
        context: SQL_CONTEXT,
        question: `<b>Aufgabe 3 b)</b> Ermitteln Sie die <b>Anzahl der Mitglieder je Abteilung</b>. Auch Abteilungen ohne Mitglieder sollen mit der Anzahl 0 erscheinen. Ausgabe: <code>bezeichnung, anzahl</code>, absteigend nach Anzahl und bei gleicher Anzahl alphabetisch nach Bezeichnung sortiert.`,
        sql: {
          setup: SQL_SETUP,
          solution: `SELECT a.bezeichnung, COUNT(ms.mitglied_id) AS anzahl
FROM abteilung a
LEFT JOIN mitgliedschaft ms ON ms.abt_id = a.abt_id
GROUP BY a.abt_id, a.bezeichnung
ORDER BY anzahl DESC, a.bezeichnung ASC;`,
          ordered: true
        },
        solution: `<pre><code>SELECT a.bezeichnung, COUNT(ms.mitglied_id) AS anzahl
FROM abteilung a
LEFT JOIN mitgliedschaft ms ON ms.abt_id = a.abt_id
GROUP BY a.abt_id, a.bezeichnung
ORDER BY anzahl DESC, a.bezeichnung ASC;</code></pre>
<p>Ergebnis: Fußball 4, Handball 4, Turnen 4, Schach 2, Tischtennis 2, Leichtathletik 0. Wichtig: <code>LEFT JOIN</code> und <code>COUNT(ms.mitglied_id)</code> – <code>COUNT(*)</code> würde für Leichtathletik 1 liefern, da die Zeile mit NULL-Werten mitgezählt wird. Punkte: LEFT JOIN 2 P, COUNT auf Spalte 1 P, GROUP BY 1 P, Sortierung 1 P.</p>`
      },
      {
        id: "ga2-sim-3-3c", part: "GA2", topic: "ga2-sql-aggregat", type: "sql", difficulty: 2, points: 5,
        context: SQL_CONTEXT,
        question: `<b>Aufgabe 3 c)</b> Für das Mahnwesen wird eine Liste der <b>offenen Beiträge</b> (alle Jahre) benötigt. Ausgabe: <code>nachname, vorname, summe_offen</code> – nur Mitglieder mit offenen Beiträgen, absteigend nach offener Summe und bei gleicher Summe aufsteigend nach Nachname sortiert.`,
        sql: {
          setup: SQL_SETUP,
          solution: `SELECT m.nachname, m.vorname, SUM(b.betrag) AS summe_offen
FROM mitglied m
JOIN beitrag b ON b.mitglied_id = m.mitglied_id
WHERE b.bezahlt_am IS NULL
GROUP BY m.mitglied_id, m.nachname, m.vorname
ORDER BY summe_offen DESC, m.nachname ASC;`,
          ordered: true
        },
        solution: `<pre><code>SELECT m.nachname, m.vorname, SUM(b.betrag) AS summe_offen
FROM mitglied m
JOIN beitrag b ON b.mitglied_id = m.mitglied_id
WHERE b.bezahlt_am IS NULL
GROUP BY m.mitglied_id, m.nachname, m.vorname
ORDER BY summe_offen DESC, m.nachname ASC;</code></pre>
<p>Ergebnis: Fuchs 180, Jung 180, Krause 180 (2025 und 2026 je 90), Haas 150, Lorenz 90, Schuster 10. Punkte: Join 1 P, Filter IS NULL vor der Gruppierung 2 P, SUM/GROUP BY 1 P, zweistufige Sortierung 1 P.</p>`
      },
      {
        id: "ga2-sim-3-3d", part: "GA2", topic: "ga2-sql-subquery", type: "sql", difficulty: 2, points: 5,
        context: SQL_CONTEXT,
        question: `<b>Aufgabe 3 d)</b> Ermitteln Sie mit einer Unterabfrage (<code>NOT EXISTS</code> oder <code>NOT IN</code>) alle Mitglieder, die <b>keiner Abteilung</b> angehören. Ausgabe: <code>mitglied_id, vorname, nachname</code>.`,
        sql: {
          setup: SQL_SETUP,
          solution: `SELECT m.mitglied_id, m.vorname, m.nachname
FROM mitglied m
WHERE NOT EXISTS (SELECT 1 FROM mitgliedschaft ms WHERE ms.mitglied_id = m.mitglied_id);`
        },
        solution: `<pre><code>SELECT m.mitglied_id, m.vorname, m.nachname
FROM mitglied m
WHERE NOT EXISTS (SELECT 1
                  FROM mitgliedschaft ms
                  WHERE ms.mitglied_id = m.mitglied_id);</code></pre>
<p>Ergebnis: 12 Leon Fuchs, 13 Mia Schuster. Alternativ: <code>WHERE m.mitglied_id NOT IN (SELECT mitglied_id FROM mitgliedschaft)</code> oder <code>LEFT JOIN … WHERE ms.mitglied_id IS NULL</code>. Punkte: Unterabfrage 3 P, Korrelation bzw. korrekte Spalte 2 P.</p>`
      },
      {
        id: "ga2-sim-3-3e", part: "GA2", topic: "ga2-sql-dml", type: "sql", difficulty: 1, points: 5,
        context: SQL_CONTEXT,
        question: `<b>Aufgabe 3 e)</b> Mitglied <b>4</b> (David Krause) hat am <b>20.11.2026</b> alle seine offenen Beiträge bezahlt. Erstellen Sie die SQL-Anweisung, die das Zahlungsdatum für diese Beiträge einträgt.`,
        sql: {
          setup: SQL_SETUP,
          solution: `UPDATE beitrag
SET bezahlt_am = '2026-11-20'
WHERE mitglied_id = 4
  AND bezahlt_am IS NULL;`,
          check: `SELECT beitrag_id, bezahlt_am FROM beitrag ORDER BY beitrag_id;`
        },
        solution: `<pre><code>UPDATE beitrag
SET bezahlt_am = '2026-11-20'
WHERE mitglied_id = 4
  AND bezahlt_am IS NULL;</code></pre>
<p>Betroffen: Beiträge 4 (2026) und 14 (2025). Die Bedingung <code>bezahlt_am IS NULL</code> verhindert, dass bereits bezahlte Beiträge überschrieben würden. Punkte: SET 2 P, beide Bedingungen 3 P.</p>`
      },
      {
        id: "ga2-sim-3-3f", part: "GA2", topic: "ga2-sql-dml", type: "sql", difficulty: 2, points: 5,
        context: SQL_CONTEXT,
        question: `<b>Aufgabe 3 f)</b> Das neue Mitglied <b>Noah Richter</b> (mitglied_id 14, geboren am 03.05.2011) tritt am <b>24.11.2026</b> in den Verein und gleichzeitig in die Abteilung <b>'Handball'</b> ein. Erstellen Sie die beiden <code>INSERT</code>-Anweisungen. Ermitteln Sie die <code>abt_id</code> über die Bezeichnung mit einer Unterabfrage. Spaltenreihenfolge: <code>mitglied(mitglied_id, vorname, nachname, geburtsdatum, eintritt)</code>, <code>mitgliedschaft(mitglied_id, abt_id, seit)</code>.`,
        sql: {
          setup: SQL_SETUP,
          solution: `INSERT INTO mitglied (mitglied_id, vorname, nachname, geburtsdatum, eintritt)
VALUES (14, 'Noah', 'Richter', '2011-05-03', '2026-11-24');
INSERT INTO mitgliedschaft (mitglied_id, abt_id, seit)
SELECT 14, abt_id, '2026-11-24' FROM abteilung WHERE bezeichnung = 'Handball';`,
          check: `SELECT m.mitglied_id, m.vorname, m.nachname, m.geburtsdatum, m.eintritt, ms.abt_id, ms.seit FROM mitglied m LEFT JOIN mitgliedschaft ms ON ms.mitglied_id = m.mitglied_id ORDER BY m.mitglied_id, ms.abt_id;`
        },
        solution: `<pre><code>INSERT INTO mitglied (mitglied_id, vorname, nachname, geburtsdatum, eintritt)
VALUES (14, 'Noah', 'Richter', '2011-05-03', '2026-11-24');

INSERT INTO mitgliedschaft (mitglied_id, abt_id, seit)
SELECT 14, abt_id, '2026-11-24'
FROM abteilung
WHERE bezeichnung = 'Handball';</code></pre>
<p>Alternativ: <code>VALUES (14, (SELECT abt_id FROM abteilung WHERE bezeichnung = 'Handball'), '2026-11-24')</code>. Die Reihenfolge ist wegen des Fremdschlüssels zwingend: erst das Mitglied, dann die Mitgliedschaft. Punkte: INSERT Mitglied 2 P, INSERT Mitgliedschaft mit Unterabfrage 3 P.</p>`
      },
      // ---------- Aufgabe 4: Datenformate, Rekursion, Exceptions (20 P) ----------
      {
        id: "ga2-sim-3-4a", part: "GA2", topic: "ga2-exceptions-formate", type: "text", difficulty: 2, points: 5,
        question: `<b>Aufgabe 4 a)</b> Die Vereins-App erhält Mitgliedsdaten im JSON-Format. Erstellen Sie ein gültiges JSON-Dokument für das Mitglied <i>Anna Berger</i> (ID 1, geboren am 14.03.1985, Beitrag bezahlt: ja) mit der Anschrift <i>Weinstraße 12, 67433 Neustadt</i> als <b>verschachteltes Objekt</b> und den Abteilungen <i>Handball</i> (seit 01.01.2010, Abteilungsleiterin) und <i>Turnen</i> (seit 01.09.2015) als <b>Array von Objekten</b>. Erläutern Sie kurz den Unterschied zwischen JSON-Objekt und JSON-Array.`,
        solution: `<pre><code>{
  "id": 1,
  "vorname": "Anna",
  "nachname": "Berger",
  "geburtsdatum": "1985-03-14",
  "beitragBezahlt": true,
  "anschrift": {
    "strasse": "Weinstraße 12",
    "plz": "67433",
    "ort": "Neustadt"
  },
  "abteilungen": [
    { "bezeichnung": "Handball", "seit": "2010-01-01", "leitung": true },
    { "bezeichnung": "Turnen",   "seit": "2015-09-01", "leitung": false }
  ]
}</code></pre>
<p>Punkte JSON (4 P): korrekte Syntax mit doppelten Anführungszeichen 1 P; verschachteltes Objekt 1 P; Array von Objekten 1 P; passende Datentypen (Zahl, Boolean, PLZ als String) 1 P.</p>
<p><b>Unterschied</b> (1 P): Ein <b>Objekt</b> <code>{ }</code> ist eine ungeordnete Menge von Schlüssel-Wert-Paaren mit eindeutigen Schlüsseln; ein <b>Array</b> <code>[ ]</code> ist eine geordnete Liste von Werten, auf die über die Position zugegriffen wird.</p>`,
        keywords: ["{", "[", "\"anschrift\"|anschrift", "\"abteilungen\"|abteilungen", "true", "schlüssel|schluessel|key", "geordnet|liste|reihenfolge"]
      },
      {
        id: "ga2-sim-3-4b", part: "GA2", topic: "ga2-rekursion", type: "code", lang: "pseudocode", difficulty: 2, points: 6,
        question: `<b>Aufgabe 4 b)</b> Beim Tischtennis-Vereinsturnier spielt jeder gegen jeden genau einmal. Kommt ein weiterer Teilnehmer hinzu, muss er gegen alle bisherigen Teilnehmer spielen. Entwickeln Sie eine <b>rekursive</b> Funktion <code>anzahlSpiele(n)</code>, die die Anzahl der Spiele für <code>n</code> Teilnehmer berechnet. Nennen Sie die Abbruchbedingung und erläutern Sie, was ohne Abbruchbedingung zur Laufzeit geschieht.`,
        starter: `funktion anzahlSpiele(n: Ganzzahl): Ganzzahl
  // ...
ende funktion`,
        solution: `<pre><code>funktion anzahlSpiele(n: Ganzzahl): Ganzzahl
  wenn n &lt;= 1 dann
    rückgabe 0                         // Abbruchbedingung: allein kein Spiel
  ende wenn
  rückgabe (n - 1) + anzahlSpiele(n - 1)
ende funktion</code></pre>
<ul>
<li><b>Rekursionsvorschrift</b> (2,5 P): Der n-te Teilnehmer spielt gegen die n − 1 anderen; hinzu kommen alle Spiele der übrigen n − 1 Teilnehmer.</li>
<li><b>Abbruchbedingung</b> (1,5 P): n ≤ 1 ⇒ 0 Spiele.</li>
<li><b>Ohne Abbruch</b> (2 P): Die Funktion ruft sich unendlich oft auf (n wird negativ). Jeder Aufruf legt einen Eintrag (Stack-Frame mit Parametern und Rücksprungadresse) auf dem Aufrufstapel ab, bis der Speicher erschöpft ist ⇒ <b>Stapelüberlauf</b> (StackOverflowError), Programmabbruch.</li>
</ul>`,
        keywords: ["n <= 1|n<=1|n = 1|n == 1", "rückgabe 0|return 0", "n - 1|n-1", "anzahlspiele(n - 1)|anzahlspiele(n-1)", "stack|stapel", "overflow|überlauf|ueberlauf"]
      },
      {
        id: "ga2-sim-3-4c", part: "GA2", topic: "ga2-rekursion", type: "numeric", difficulty: 1, points: 3,
        question: `<b>Aufgabe 4 c)</b> Für das Turnier haben sich <b>12</b> Spielerinnen und Spieler angemeldet. Berechnen Sie den Rückgabewert von <code>anzahlSpiele(12)</code>.`,
        answer: 66, tolerance: 0, unit: "Spiele",
        solution: `<p>anzahlSpiele(12) = 11 + 10 + 9 + … + 1 + 0 = <b>66</b></p><p>Kontrolle mit der geschlossenen Formel n · (n − 1) / 2 = 12 · 11 / 2 = 66.</p>`
      },
      {
        id: "ga2-sim-3-4d", part: "GA2", topic: "ga2-exceptions-formate", type: "text", difficulty: 3, points: 6,
        context: `<p>Die Altdaten werden aus einer CSV-Datei importiert (Format: <code>Nachname;Vorname;Geburtsdatum;Abteilung</code>, Datum als <code>TT.MM.JJJJ</code>):</p>
<pre><code>public List&lt;Mitglied&gt; importiere(String pfad) throws IOException {
    List&lt;Mitglied&gt; liste = new ArrayList&lt;&gt;();
    BufferedReader reader = new BufferedReader(new FileReader(pfad));
    String zeile;
    while ((zeile = reader.readLine()) != null) {
        String[] f = zeile.split(";");
        LocalDate geb = LocalDate.parse(f[2], DateTimeFormatter.ofPattern("dd.MM.yyyy"));
        liste.add(new Mitglied(f[0], f[1], geb, f[3]));
    }
    reader.close();
    return liste;
}</code></pre>`,
        question: `<b>Aufgabe 4 d)</b> Nennen Sie <b>drei</b> Exceptions, die beim Import auftreten können, jeweils mit einer möglichen Ursache. Beschreiben Sie anschließend, wie der Code geändert werden sollte, damit fehlerhafte Zeilen protokolliert und übersprungen werden, der Import fortgesetzt wird und die Datei in jedem Fall geschlossen wird.`,
        solution: `<p><b>Exceptions</b> (je 1 P):</p><ul>
<li><code>FileNotFoundException</code>/<code>IOException</code>: Datei existiert nicht, keine Leserechte, Lesefehler.</li>
<li><code>ArrayIndexOutOfBoundsException</code>: Zeile enthält weniger als vier Felder (z. B. leere Zeile, fehlende Abteilung).</li>
<li><code>DateTimeParseException</code>: Geburtsdatum hat ein falsches Format (z. B. „1985-03-14“ statt „14.03.1985“ oder ein leeres Feld).</li>
<li>(auch: <code>NullPointerException</code> bei fehlenden Werten, Kodierungsprobleme bei Umlauten)</li>
</ul>
<p><b>Verbesserung</b> (3 P):</p>
<pre><code>try (BufferedReader reader = Files.newBufferedReader(Path.of(pfad), StandardCharsets.UTF_8)) {
    String zeile;
    int nr = 0;
    while ((zeile = reader.readLine()) != null) {
        nr++;
        try {
            String[] f = zeile.split(";");
            LocalDate geb = LocalDate.parse(f[2], DateTimeFormatter.ofPattern("dd.MM.yyyy"));
            liste.add(new Mitglied(f[0], f[1], geb, f[3]));
        } catch (ArrayIndexOutOfBoundsException | DateTimeParseException e) {
            log.warn("Zeile " + nr + " übersprungen: " + e.getMessage());
        }
    }
}   // try-with-resources schließt den Reader automatisch, auch bei Exceptions</code></pre>
<p>Kernpunkte: inneres try/catch <b>pro Zeile</b> (Import läuft weiter), Protokollierung mit Zeilennummer, <b>try-with-resources</b> bzw. <code>finally</code> zum Schließen; IOException wird weiterhin an den Aufrufer gemeldet.</p>`,
        keywords: ["ioexception|filenotfoundexception", "arrayindexoutofbounds", "datetimeparseexception", "try", "catch", "try-with-resources|finally", "protokoll|log", "zeile"]
      }
    ]
  });
})();

/* =====================================================================
   WiSo – Simulation 1: Ausbildungsbetrieb DataSphere GmbH
   ===================================================================== */
(function () {
  let nr = 0;
  // Hilfsfunktion: erzeugt eine Aufgabe mit fortlaufender Nummer
  const A = (topic, type, points, difficulty, rest) => {
    nr++;
    const n = String(nr).padStart(2, "0");
    return Object.assign({ id: "wiso-sim-1-" + n, part: "WISO", topic, type, points, difficulty }, rest, {
      question: `<b>Aufgabe ${nr})</b> ` + rest.question
    });
  };

  AP2.exams.push({
    id: "wiso-sim-1",
    part: "WISO",
    title: "Simulation WiSo #1 – Ausbildung und Arbeit bei der DataSphere GmbH",
    minutes: 60,
    scenario: `<p>Die <b>DataSphere GmbH</b> in Hannover ist ein IT-Dienstleister mit 120 Beschäftigten (Softwareentwicklung, Rechenzentrumsbetrieb, IT-Support). Das Unternehmen bildet Fachinformatiker/innen aus und beschäftigt Umschülerinnen und Umschüler im Rahmen von Umschulungen. Es gibt einen Betriebsrat und eine Jugend- und Auszubildendenvertretung (JAV). Das Unternehmen ist Mitglied im Arbeitgeberverband und an einen Tarifvertrag gebunden.</p>
<p>Sie sind Umschüler/in zum Fachinformatiker für Anwendungsentwicklung und bearbeiten Fragen, die im Betriebsalltag auftreten. Bearbeitungszeit 60 Minuten, 28 Aufgaben, 100 Punkte. Sofern Werte (Beitragssätze, Grenzen) angegeben sind, rechnen Sie mit diesen.</p>`,
    tasks: [
      A("wiso-ausbildung", "mc", 3, 1, {
        question: `Die DataSphere GmbH schließt mit der Auszubildenden Mia (17 Jahre) einen Berufsausbildungsvertrag. Welche Probezeit ist nach dem Berufsbildungsgesetz (BBiG) zulässig?`,
        options: ["Mindestens zwei Wochen, höchstens drei Monate", "Mindestens ein Monat, höchstens vier Monate", "Mindestens ein Monat, höchstens sechs Monate", "Genau drei Monate", "Eine Probezeit ist bei Minderjährigen nicht zulässig"],
        correct: [1],
        solution: `Nach <b>§ 20 BBiG</b> beginnt das Berufsausbildungsverhältnis mit der Probezeit; sie muss <b>mindestens einen Monat und darf höchstens vier Monate</b> betragen.`
      }),
      A("wiso-ausbildung", "mc", 4, 2, {
        question: `Mia möchte nach acht Monaten ihre Ausbildung abbrechen, weil sie ein Studium beginnen will. Welche Aussage zur Kündigung ist richtig?`,
        options: [
          "Sie kann jederzeit ohne Einhaltung einer Frist mündlich kündigen.",
          "Sie kann mit einer Frist von vier Wochen kündigen; die Kündigung muss schriftlich und unter Angabe des Kündigungsgrundes erfolgen.",
          "Eine Kündigung durch die Auszubildende ist nach der Probezeit ausgeschlossen.",
          "Sie kann nur mit Zustimmung der IHK kündigen.",
          "Sie kann mit einer Frist von zwei Wochen zum Monatsende kündigen; eine Begründung ist nicht erforderlich."
        ],
        correct: [1],
        solution: `Nach der Probezeit kann die Auszubildende nach <b>§ 22 Abs. 2 Nr. 2 BBiG</b> mit einer Kündigungsfrist von <b>vier Wochen</b> kündigen, wenn sie die Berufsausbildung aufgeben oder sich für eine andere Berufstätigkeit ausbilden lassen will. Die Kündigung muss <b>schriftlich</b> und in diesem Fall <b>unter Angabe der Kündigungsgründe</b> erfolgen (§ 22 Abs. 3 BBiG). Bei Minderjährigen ist die Zustimmung der gesetzlichen Vertreter erforderlich.`
      }),
      A("wiso-ausbildung", "multi", 4, 2, {
        question: `Welche der folgenden Pflichten hat die DataSphere GmbH als Ausbildender nach dem BBiG? (Mehrere Antworten sind richtig.)`,
        options: [
          "Ausbildungsmittel (z. B. Notebook, Fachsoftware) kostenlos zur Verfügung stellen",
          "Die Auszubildenden für den Besuch der Berufsschule freistellen",
          "Die Fahrtkosten zur Berufsschule in jedem Fall erstatten",
          "Bei Beendigung der Ausbildung ein schriftliches Zeugnis ausstellen",
          "Den Auszubildenden auf Anweisung auch ausbildungsfremde Tätigkeiten (z. B. private Besorgungen) übertragen",
          "Die Auszubildenden charakterlich fördern sowie sittlich und körperlich nicht gefährden"
        ],
        correct: [0, 1, 3, 5],
        solution: `Pflichten nach <b>§§ 14–16 BBiG</b>: kostenlose Ausbildungsmittel, Freistellung für Berufsschule und Prüfungen, Zeugnis bei Beendigung, charakterliche Förderung. Fahrtkosten zur Berufsschule muss der Betrieb gesetzlich nicht erstatten (ggf. tarif- oder landesrechtliche Regelungen). Es dürfen nur Aufgaben übertragen werden, die dem Ausbildungszweck dienen.`
      }),
      A("wiso-ausbildung", "numeric", 4, 2, {
        question: `Ein Umschüler hat in der Abschlussprüfung Fachinformatiker/in Anwendungsentwicklung folgende Ergebnisse (je 100 Punkte max.): Teil 1: 72 Punkte; Planen und Umsetzen eines Softwareprojektes: 81 Punkte; Planen eines Softwareproduktes (GA1): 64 Punkte; Entwicklung und Umsetzung von Algorithmen (GA2): 58 Punkte; Wirtschafts- und Sozialkunde: 77 Punkte. Gewichtung: Teil 1 20 %, Projekt 50 %, GA1, GA2 und WiSo je 10 %. Berechnen Sie das Gesamtergebnis in Punkten.`,
        answer: 74.8, tolerance: 0.05, unit: "Punkte",
        solution: `<p>0,2 · 72 + 0,5 · 81 + 0,1 · 64 + 0,1 · 58 + 0,1 · 77 = 14,4 + 40,5 + 6,4 + 5,8 + 7,7 = <b>74,8 Punkte</b></p><p>Das entspricht der Note „befriedigend“ (67 bis unter 81 Punkte). Die Prüfung ist bestanden, da das Gesamtergebnis, das Ergebnis von Teil 2 und mindestens drei Prüfungsbereiche von Teil 2 mindestens „ausreichend“ sind und kein Bereich „ungenügend“ ist.</p>`
      }),
      A("wiso-arbeitsrecht", "mc", 3, 2, {
        question: `Die DataSphere GmbH kündigt einem Mitarbeiter, der seit sechs Jahren im Unternehmen beschäftigt ist, ordentlich. Die Kündigung geht ihm am 10. März zu. Es gelten die gesetzlichen Kündigungsfristen nach § 622 BGB. Zu welchem Termin endet das Arbeitsverhältnis?`,
        options: ["7. April", "15. April", "30. April", "31. Mai", "30. Juni"],
        correct: [3],
        solution: `Bei einer Betriebszugehörigkeit von <b>mindestens 5 Jahren</b> beträgt die Kündigungsfrist für den Arbeitgeber <b>2 Monate zum Ende eines Kalendermonats</b> (§ 622 Abs. 2 Nr. 2 BGB). 10. März + 2 Monate = 10. Mai ⇒ nächstes Monatsende: <b>31. Mai</b>.`
      }),
      A("wiso-arbeitsrecht", "mc", 3, 1, {
        question: `Ein neuer Softwareentwickler wurde mit sechs Monaten Probezeit eingestellt. Welche Kündigungsfrist gilt während der Probezeit nach § 622 BGB, wenn vertraglich nichts anderes vereinbart ist?`,
        options: ["Keine Frist – fristlose Kündigung jederzeit möglich", "Eine Woche", "Zwei Wochen", "Vier Wochen zum 15. oder zum Ende eines Kalendermonats", "Ein Monat zum Monatsende"],
        correct: [2],
        solution: `Während einer vereinbarten Probezeit von <b>längstens sechs Monaten</b> kann das Arbeitsverhältnis mit einer Frist von <b>zwei Wochen</b> gekündigt werden (§ 622 Abs. 3 BGB). Im Unterschied dazu kann ein <i>Ausbildungs</i>verhältnis in der Probezeit jederzeit ohne Frist gekündigt werden.`
      }),
      A("wiso-arbeitsrecht", "numeric", 4, 2, {
        question: `Eine Umschülerin wird nach bestandener Prüfung zum <b>1. August</b> unbefristet bei der DataSphere GmbH eingestellt. Laut Arbeitsvertrag stehen ihr 30 Urlaubstage pro Kalenderjahr zu; für den gesamten Urlaub gelten die Regeln des Bundesurlaubsgesetzes. Wie viele Urlaubstage stehen ihr im Eintrittsjahr zu?`,
        answer: 13, tolerance: 0, unit: "Tage",
        solution: `<p>Da die Wartezeit von sechs Monaten im Eintrittsjahr nicht mehr erfüllt werden kann, besteht <b>Teilurlaub</b> von 1/12 je vollem Beschäftigungsmonat (§ 5 Abs. 1 a BUrlG): August bis Dezember = 5 Monate.</p><p>30 · 5/12 = 12,5 Tage. Bruchteile von mindestens einem halben Tag werden auf volle Tage <b>aufgerundet</b> (§ 5 Abs. 2 BUrlG) ⇒ <b>13 Tage</b>.</p>`
      }),
      A("wiso-arbeitsrecht", "multi", 4, 3, {
        question: `Der 17-jährige Auszubildende Jonas arbeitet in der IT-Abteilung (5-Tage-Woche). Welche der folgenden Regelungen sind nach dem Jugendarbeitsschutzgesetz (JArbSchG) <b>zulässig</b>?`,
        options: [
          "Jonas arbeitet montags bis donnerstags je 8,5 Stunden und freitags 6 Stunden.",
          "Jonas muss nach einem Berufsschultag mit sechs Unterrichtsstunden zu je 45 Minuten (erster Berufsschultag der Woche) noch in den Betrieb kommen.",
          "Bei einer Arbeitszeit von 8 Stunden erhält Jonas insgesamt 60 Minuten Ruhepause.",
          "Jonas unterstützt bei einem Server-Update bis 22:30 Uhr.",
          "Jonas erhält 25 Werktage Jahresurlaub, da er zu Beginn des Kalenderjahres 17 Jahre alt war.",
          "In einer Projektwoche arbeitet Jonas 45 Stunden."
        ],
        correct: [0, 2, 4],
        solution: `<ul><li>Zulässig: Wenn an einzelnen Werktagen die Arbeitszeit unter 8 Stunden liegt, dürfen Jugendliche an den übrigen Werktagen derselben Woche bis zu <b>8,5 Stunden</b> arbeiten (§ 8 Abs. 2a JArbSchG; hier 4 · 8,5 + 6 = 40 Std.).</li>
<li>Zulässig: Bei mehr als 6 Stunden Arbeitszeit stehen <b>60 Minuten</b> Ruhepause zu (§ 11).</li>
<li>Zulässig: Jugendliche, die zu Beginn des Kalenderjahres noch nicht 18 sind, haben Anspruch auf mindestens <b>25 Werktage</b> Urlaub (§ 19).</li>
<li>Unzulässig: An einem Berufsschultag mit <b>mehr als fünf Unterrichtsstunden</b> à 45 Minuten darf einmal pro Woche keine Beschäftigung erfolgen (§ 9).</li>
<li>Unzulässig: Nachtruhe – Jugendliche dürfen grundsätzlich nur von 6 bis 20 Uhr beschäftigt werden (§ 14).</li>
<li>Unzulässig: höchstens 40 Stunden wöchentlich (§ 8).</li></ul>`
      }),
      A("wiso-arbeitsrecht", "mc", 3, 2, {
        question: `Ein volljähriger Mitarbeiter soll wegen eines Projekts mehrere Wochen täglich 10 Stunden arbeiten. Unter welcher Voraussetzung ist das nach dem Arbeitszeitgesetz (ArbZG) zulässig?`,
        options: [
          "Nur mit Zustimmung der IHK",
          "Wenn innerhalb von sechs Kalendermonaten oder 24 Wochen im Durchschnitt 8 Stunden werktäglich nicht überschritten werden",
          "Die werktägliche Arbeitszeit darf ausnahmslos 8 Stunden nicht überschreiten.",
          "Wenn der Mitarbeiter schriftlich zustimmt, sind bis zu 12 Stunden täglich ohne Ausgleich erlaubt.",
          "Wenn die Überstunden vollständig ausbezahlt werden"
        ],
        correct: [1],
        solution: `Nach <b>§ 3 ArbZG</b> beträgt die werktägliche Arbeitszeit 8 Stunden; sie kann auf bis zu <b>10 Stunden</b> verlängert werden, wenn innerhalb von <b>sechs Kalendermonaten oder 24 Wochen</b> im Durchschnitt 8 Stunden werktäglich nicht überschritten werden. Eine Bezahlung oder Zustimmung ersetzt den Ausgleich nicht.`
      }),
      A("wiso-arbeitsrecht", "mc", 3, 1, {
        question: `Eine erwachsene Mitarbeiterin arbeitet an einem Tag 9 Stunden und 30 Minuten. Welche Ruhepause muss ihr nach dem ArbZG mindestens gewährt werden?`,
        options: ["15 Minuten", "30 Minuten", "45 Minuten", "60 Minuten", "Keine, da sie volljährig ist"],
        correct: [2],
        solution: `§ 4 ArbZG: bei mehr als 6 bis zu 9 Stunden mindestens 30 Minuten, bei <b>mehr als 9 Stunden mindestens 45 Minuten</b>; die Pausen können in Abschnitte von mindestens 15 Minuten aufgeteilt werden.`
      }),
      A("wiso-tarif-mitbestimmung", "mc", 4, 2, {
        question: `Der für die DataSphere GmbH geltende Tarifvertrag sieht 30 Urlaubstage vor. In einem Arbeitsvertrag wurden 32 Urlaubstage vereinbart, in einem anderen nur 28. Welche Aussage ist richtig?`,
        options: [
          "Beide Vereinbarungen sind unwirksam; es gelten 30 Tage, da der Tarifvertrag immer Vorrang hat.",
          "Beide Vereinbarungen sind wirksam, da der Arbeitsvertrag dem Tarifvertrag vorgeht.",
          "Die Vereinbarung über 32 Tage ist wirksam (Günstigkeitsprinzip); bei 28 Tagen gelten für tarifgebundene Arbeitnehmer die tariflichen 30 Tage.",
          "Es gilt in beiden Fällen der gesetzliche Mindesturlaub von 20 Arbeitstagen.",
          "Abweichungen vom Tarifvertrag sind nur mit Zustimmung des Betriebsrats wirksam."
        ],
        correct: [2],
        solution: `Nach dem <b>Günstigkeitsprinzip</b> (§ 4 Abs. 3 TVG) sind vom Tarifvertrag abweichende Abmachungen nur zulässig, wenn sie <b>für den Arbeitnehmer günstiger</b> sind. Tarifnormen sind Mindestbedingungen; ungünstigere Vereinbarungen werden durch die tarifliche Regelung ersetzt.`
      }),
      A("wiso-tarif-mitbestimmung", "mc", 3, 1, {
        question: `Während der Laufzeit eines Entgelttarifvertrags ruft die Gewerkschaft zu einem Streik für höhere Löhne auf. Gegen welchen Grundsatz verstößt sie damit?`,
        options: ["Günstigkeitsprinzip", "Friedenspflicht", "Tarifautonomie", "Allgemeinverbindlichkeit", "Ordnungsprinzip"],
        correct: [1],
        solution: `Während der Laufzeit eines Tarifvertrags gilt die <b>Friedenspflicht</b>: Arbeitskampfmaßnahmen über die im Vertrag geregelten Inhalte sind unzulässig.`
      }),
      A("wiso-tarif-mitbestimmung", "order", 4, 2, {
        question: `Bringen Sie die Schritte einer Tarifauseinandersetzung, die mit einem Streik verbunden ist, in die übliche Reihenfolge.`,
        items: [
          "Kündigung des bestehenden Entgelttarifvertrags",
          "Tarifverhandlungen zwischen Gewerkschaft und Arbeitgeberverband",
          "Erklärung des Scheiterns der Verhandlungen",
          "Urabstimmung der Gewerkschaftsmitglieder über einen Streik",
          "Streik (ggf. Aussperrung durch die Arbeitgeber)",
          "Neue Verhandlungen und Einigung",
          "Zweite Urabstimmung über das Verhandlungsergebnis und Abschluss des neuen Tarifvertrags"
        ],
        solution: `Kündigung → Verhandlungen → Scheitern → Urabstimmung (satzungsgemäß meist 75 % Zustimmung) → Streik → neue Verhandlungen/Einigung → zweite Urabstimmung (meist 25 % Zustimmung genügen) → neuer Tarifvertrag. Eine Schlichtung kann nach dem Scheitern vereinbart werden.`
      }),
      A("wiso-tarif-mitbestimmung", "mc", 4, 2, {
        question: `Die Geschäftsleitung will im IT-Support eine Software einführen, die für jedes Ticket minutengenau protokolliert, welcher Mitarbeiter wie lange daran arbeitet. Welches Recht hat der Betriebsrat?`,
        options: [
          "Kein Recht, da es sich um eine unternehmerische Entscheidung handelt.",
          "Nur ein Informationsrecht nach Einführung.",
          "Ein Anhörungsrecht; die Geschäftsleitung entscheidet allein.",
          "Ein echtes Mitbestimmungsrecht, da technische Einrichtungen eingeführt werden, die zur Überwachung von Verhalten oder Leistung der Arbeitnehmer bestimmt bzw. geeignet sind.",
          "Ein Vetorecht nur dann, wenn mehr als 500 Arbeitnehmer betroffen sind."
        ],
        correct: [3],
        solution: `Nach <b>§ 87 Abs. 1 Nr. 6 BetrVG</b> hat der Betriebsrat ein <b>Mitbestimmungsrecht</b> bei der Einführung und Anwendung technischer Einrichtungen, die dazu bestimmt (nach BAG: objektiv geeignet) sind, Verhalten oder Leistung der Arbeitnehmer zu überwachen. Ohne Einigung entscheidet die Einigungsstelle. In der Praxis wird eine Betriebsvereinbarung abgeschlossen.`
      }),
      A("wiso-tarif-mitbestimmung", "mc", 3, 2, {
        question: `In der DataSphere GmbH steht die Wahl der Jugend- und Auszubildendenvertretung (JAV) an. Wer ist <b>wahlberechtigt</b>?`,
        options: [
          "Alle Arbeitnehmer des Betriebs",
          "Nur Auszubildende unter 18 Jahren",
          "Arbeitnehmer, die das 18. Lebensjahr noch nicht vollendet haben, sowie die zu ihrer Berufsausbildung Beschäftigten, die das 25. Lebensjahr noch nicht vollendet haben",
          "Alle Auszubildenden unabhängig vom Alter sowie alle Mitglieder des Betriebsrats",
          "Nur Arbeitnehmer unter 25 Jahren, die Mitglied einer Gewerkschaft sind"
        ],
        correct: [2],
        solution: `Nach <b>§ 60 f. BetrVG</b> wird die JAV in Betrieben mit mindestens fünf solcher Beschäftigten gewählt von Arbeitnehmern <b>unter 18 Jahren</b> und von den <b>zu ihrer Berufsausbildung Beschäftigten unter 25 Jahren</b>.`
      }),
      A("wiso-sozialversicherung", "numeric", 4, 2, {
        question: `Ein 27-jähriger, kinderloser Anwendungsentwickler (Wohnort Niedersachsen) erhält ein monatliches Bruttogehalt von 3.200,00 €. Es gelten folgende Beitragssätze: Krankenversicherung 14,6 % zuzüglich Zusatzbeitrag 2,9 % (beides je zur Hälfte von Arbeitgeber und Arbeitnehmer), Pflegeversicherung 3,6 % (Arbeitnehmeranteil 1,8 % zuzüglich Kinderlosenzuschlag 0,6 %), Rentenversicherung 18,6 %, Arbeitslosenversicherung 2,6 % (jeweils hälftig). Berechnen Sie den <b>Arbeitnehmeranteil</b> zur Sozialversicherung.`,
        answer: 696.0, tolerance: 0.01, unit: "€",
        solution: `<table>
<tr><td>Krankenversicherung</td><td>(7,3 % + 1,45 %) = 8,75 % von 3.200 €</td><td>280,00 €</td></tr>
<tr><td>Pflegeversicherung</td><td>(1,8 % + 0,6 %) = 2,4 %</td><td>76,80 €</td></tr>
<tr><td>Rentenversicherung</td><td>9,3 %</td><td>297,60 €</td></tr>
<tr><td>Arbeitslosenversicherung</td><td>1,3 %</td><td>41,60 €</td></tr>
<tr><td><b>Summe</b></td><td>21,75 %</td><td><b>696,00 €</b></td></tr>
</table><p>Das Gehalt liegt unter den Beitragsbemessungsgrenzen, daher wird das volle Brutto zugrunde gelegt. Der Kinderlosenzuschlag wird allein vom Arbeitnehmer getragen.</p>`
      }),
      A("wiso-sozialversicherung", "mc", 3, 1, {
        question: `Wer trägt die Beiträge zur gesetzlichen Unfallversicherung der Beschäftigten der DataSphere GmbH, und wer ist Träger?`,
        options: [
          "Arbeitgeber und Arbeitnehmer je zur Hälfte; Träger ist die Krankenkasse",
          "Allein der Arbeitnehmer; Träger ist die Deutsche Rentenversicherung",
          "Allein der Arbeitgeber; Träger ist die zuständige Berufsgenossenschaft",
          "Der Staat aus Steuermitteln; Träger ist die Bundesagentur für Arbeit",
          "Allein der Arbeitgeber; Träger ist die IHK"
        ],
        correct: [2],
        solution: `Die Beiträge zur gesetzlichen Unfallversicherung trägt <b>allein der Arbeitgeber</b>. Träger sind die <b>Berufsgenossenschaften</b> (für IT-Dienstleister i. d. R. die VBG) bzw. im öffentlichen Dienst die Unfallkassen.`
      }),
      A("wiso-sozialversicherung", "mc", 4, 2, {
        question: `Ein Auszubildender stürzt auf dem direkten Heimweg von der Berufsschule mit dem Fahrrad und bricht sich das Handgelenk. Welche Aussage ist richtig?`,
        options: [
          "Es handelt sich um einen Privatunfall; zuständig ist die Krankenkasse.",
          "Es handelt sich um einen Wegeunfall; zuständig ist die gesetzliche Unfallversicherung (Berufsgenossenschaft).",
          "Unfälle auf dem Weg zur oder von der Berufsschule sind nicht versichert, da die Berufsschule kein Betrieb ist.",
          "Der Unfall ist nur versichert, wenn der Auszubildende mit öffentlichen Verkehrsmitteln gefahren ist.",
          "Zuständig ist die private Haftpflichtversicherung des Auszubildenden."
        ],
        correct: [1],
        solution: `Der Besuch der Berufsschule ist versicherte Tätigkeit; auch der <b>unmittelbare Weg</b> von und zu dieser Tätigkeit ist versichert (<b>§ 8 Abs. 2 SGB VII, Wegeunfall</b>). Leistungsträger ist die gesetzliche Unfallversicherung. Das Verkehrsmittel spielt keine Rolle; private Unterbrechungen (z. B. Einkauf) sind dagegen nicht versichert.`
      }),
      A("wiso-unternehmen", "mc", 3, 1, {
        question: `Die DataSphere GmbH wurde als Gesellschaft mit beschränkter Haftung gegründet. Welche Aussage trifft zu?`,
        options: [
          "Das Mindeststammkapital beträgt 50.000 €; die Gesellschafter haften persönlich unbeschränkt.",
          "Das Mindeststammkapital beträgt 25.000 €; den Gläubigern haftet nur das Gesellschaftsvermögen.",
          "Das Mindeststammkapital beträgt 1 €; die Geschäftsführer haften mit ihrem Privatvermögen.",
          "Ein Stammkapital ist nicht vorgeschrieben; es haftet der Hauptgesellschafter.",
          "Das Mindeststammkapital beträgt 12.500 €; Gesellschafter haften bis zur doppelten Einlage."
        ],
        correct: [1],
        solution: `Das <b>Mindeststammkapital einer GmbH beträgt 25.000 €</b> (§ 5 GmbHG); bei der Anmeldung muss mindestens die Hälfte (12.500 €) eingezahlt sein. Den Gläubigern haftet nur das <b>Gesellschaftsvermögen</b> (§ 13 GmbHG). 1 € ist das Mindestkapital der UG (haftungsbeschränkt).`
      }),
      A("wiso-unternehmen", "multi", 4, 2, {
        question: `Ein Kunde der DataSphere GmbH ist die „Hoffmann Software KG“. Welche Aussagen zur Kommanditgesellschaft (KG) sind richtig?`,
        options: [
          "Die Komplementäre haften unbeschränkt, unmittelbar und solidarisch.",
          "Die Kommanditisten haften nach Eintragung im Handelsregister nur bis zur Höhe ihrer Einlage.",
          "Die Kommanditisten sind kraft Gesetzes zur Geschäftsführung berechtigt.",
          "Die Geschäftsführung und Vertretung obliegt den Komplementären.",
          "Eine KG benötigt ein Mindestkapital von 25.000 €.",
          "Eine KG muss mindestens einen Komplementär und einen Kommanditisten haben."
        ],
        correct: [0, 1, 3, 5],
        solution: `Bei der KG haften die <b>Komplementäre</b> (Vollhafter) unbeschränkt; die <b>Kommanditisten</b> (Teilhafter) haften nach Eintragung nur bis zur Höhe ihrer Einlage (§§ 161, 171 f. HGB). Geschäftsführung und Vertretung liegen bei den Komplementären; Kommanditisten haben Kontroll- und bei außergewöhnlichen Geschäften Widerspruchsrechte. Ein gesetzliches Mindestkapital gibt es nicht.`
      }),
      A("wiso-unternehmen", "mc", 3, 2, {
        question: `Der Leiter Rechenzentrum der DataSphere GmbH erhält Prokura. Welche Handlung darf er <b>ohne besondere Befugnis</b> nicht vornehmen?`,
        options: [
          "Einen Arbeitsvertrag mit einer neuen Mitarbeiterin abschließen",
          "Einen Kredit für neue Server aufnehmen",
          "Ein Betriebsgrundstück verkaufen",
          "Einen Rahmenvertrag mit einem Hardwarelieferanten schließen",
          "Einen Prozess für das Unternehmen führen"
        ],
        correct: [2],
        solution: `Die <b>Prokura</b> ermächtigt zu allen gerichtlichen und außergerichtlichen Geschäften, die der Betrieb <i>irgendeines</i> Handelsgewerbes mit sich bringt (§ 49 Abs. 1 HGB). Zur <b>Veräußerung und Belastung von Grundstücken</b> ist der Prokurist nur bei besonderer Befugnis ermächtigt (§ 49 Abs. 2 HGB). Nicht erlaubt sind außerdem z. B. Bilanz unterschreiben, Prokura erteilen, Insolvenz anmelden.`
      }),
      A("wiso-vertragsrecht", "mc", 4, 2, {
        question: `Die DataSphere GmbH erhält von einem Händler ein Angebot über 20 Monitore „freibleibend“. Sie bestellt daraufhin 20 Monitore; der Händler sendet zwei Tage später eine Auftragsbestätigung. Wann ist der Kaufvertrag zustande gekommen?`,
        options: [
          "Mit Zugang des Angebots, da Angebote grundsätzlich bindend sind",
          "Mit Absenden der Bestellung",
          "Mit Zugang der Auftragsbestätigung beim Käufer, da das freibleibende Angebot unverbindlich war und die Bestellung den Antrag darstellt",
          "Erst mit Lieferung der Monitore",
          "Erst mit Bezahlung der Rechnung"
        ],
        correct: [2],
        solution: `Durch die Klausel „freibleibend“ ist das Angebot <b>unverbindlich</b> (Aufforderung zur Abgabe eines Antrags). Die <b>Bestellung</b> ist daher der Antrag, die <b>Auftragsbestätigung</b> die Annahme. Der Vertrag kommt mit Zugang der Annahmeerklärung zustande (zwei übereinstimmende Willenserklärungen).`
      }),
      A("wiso-vertragsrecht", "mc", 3, 1, {
        question: `Die 16-jährige Auszubildende Mia kauft ohne Wissen ihrer Eltern ein Smartphone für 900 € auf Raten. Wie ist der Vertrag rechtlich zu beurteilen?`,
        options: [
          "Er ist voll wirksam, da Mia eine Ausbildungsvergütung erhält.",
          "Er ist von Anfang an nichtig, da Mia geschäftsunfähig ist.",
          "Er ist schwebend unwirksam und wird erst mit Genehmigung der Eltern wirksam.",
          "Er ist anfechtbar wegen Irrtums.",
          "Er ist wirksam nach dem Taschengeldparagrafen."
        ],
        correct: [2],
        solution: `Mia ist <b>beschränkt geschäftsfähig</b> (7 bis 17 Jahre, § 106 BGB). Ein Vertrag ohne Einwilligung der gesetzlichen Vertreter ist <b>schwebend unwirksam</b> und hängt von deren Genehmigung ab (§ 108 BGB). Der Taschengeldparagraf (§ 110 BGB) greift nicht, da nicht mit eigenen Mitteln vollständig bezahlt wird (Ratenkauf).`
      }),
      A("wiso-vertragsrecht", "mc", 4, 2, {
        question: `Bei einem neu gelieferten Server ist ein Netzteil defekt. Die DataSphere GmbH hat die Ware unverzüglich geprüft und den Mangel sofort gerügt. Welches Recht muss sie <b>vorrangig</b> geltend machen?`,
        options: [
          "Rücktritt vom Vertrag",
          "Minderung des Kaufpreises",
          "Schadensersatz statt der Leistung",
          "Nacherfüllung (Nachbesserung oder Ersatzlieferung)",
          "Fristlose Kündigung des Vertrags"
        ],
        correct: [3],
        solution: `Bei mangelhafter Lieferung hat der Käufer zunächst Anspruch auf <b>Nacherfüllung</b> (§§ 437 Nr. 1, 439 BGB) – nach seiner Wahl Beseitigung des Mangels oder Lieferung einer mangelfreien Sache. Erst wenn diese fehlschlägt, verweigert wird oder eine gesetzte Frist erfolglos abläuft, kommen Rücktritt, Minderung oder Schadensersatz in Betracht. Beim zweiseitigen Handelskauf ist die unverzügliche Rüge (§ 377 HGB) Voraussetzung.`
      }),
      A("wiso-kalkulation", "numeric", 4, 2, {
        question: `Die DataSphere GmbH kalkuliert den Verkaufspreis für ein Firewall-Appliance-Paket: Listeneinkaufspreis 800,00 €, Liefererrabatt 10 %, Liefererskonto 2 %, Bezugskosten 24,40 €, Handlungskostenzuschlag 25 %, Gewinnzuschlag 12 %. Berechnen Sie den <b>Barverkaufspreis</b>.`,
        answer: 1022.0, tolerance: 0.01, unit: "€",
        solution: `<table>
<tr><td>Listeneinkaufspreis</td><td>800,00 €</td></tr>
<tr><td>− 10 % Liefererrabatt</td><td>80,00 €</td></tr>
<tr><td>= Zieleinkaufspreis</td><td>720,00 €</td></tr>
<tr><td>− 2 % Liefererskonto</td><td>14,40 €</td></tr>
<tr><td>= Bareinkaufspreis</td><td>705,60 €</td></tr>
<tr><td>+ Bezugskosten</td><td>24,40 €</td></tr>
<tr><td>= Bezugspreis</td><td>730,00 €</td></tr>
<tr><td>+ 25 % Handlungskosten</td><td>182,50 €</td></tr>
<tr><td>= Selbstkosten</td><td>912,50 €</td></tr>
<tr><td>+ 12 % Gewinn</td><td>109,50 €</td></tr>
<tr><td>= <b>Barverkaufspreis</b></td><td><b>1.022,00 €</b></td></tr>
</table>`
      }),
      A("wiso-kalkulation", "numeric", 4, 2, {
        question: `Die DataSphere GmbH bietet ein Backup-Paket für 120,00 € je Lizenz an. Die variablen Kosten betragen 75,00 € je Lizenz, die fixen Kosten 36.000,00 € pro Jahr. Ab wie vielen verkauften Lizenzen pro Jahr wird die Gewinnschwelle erreicht?`,
        answer: 800, tolerance: 0, unit: "Lizenzen",
        solution: `<p>Deckungsbeitrag je Stück = Preis − variable Stückkosten = 120,00 € − 75,00 € = 45,00 €</p><p>Gewinnschwelle (Break-even-Menge) = Fixkosten / Stückdeckungsbeitrag = 36.000 € / 45 € = <b>800 Lizenzen</b></p>`
      }),
      A("wiso-wirtschaft", "mc", 4, 2, {
        question: `Die Europäische Zentralbank senkt die Leitzinsen deutlich, um die schwache Konjunktur zu beleben. Welches Ziel des „magischen Vierecks“ der Wirtschaftspolitik kann dadurch am ehesten gefährdet werden?`,
        options: ["Hoher Beschäftigungsstand", "Stetiges und angemessenes Wirtschaftswachstum", "Stabilität des Preisniveaus", "Gerechte Einkommensverteilung", "Umweltschutz"],
        correct: [2],
        solution: `Niedrige Zinsen verbilligen Kredite, erhöhen Investitionen und Konsum und damit die Nachfrage – das fördert Wachstum und Beschäftigung, kann aber zu steigenden Preisen führen (Zielkonflikt mit der <b>Preisniveaustabilität</b>). Die Ziele des magischen Vierecks: Preisniveaustabilität, hoher Beschäftigungsstand, außenwirtschaftliches Gleichgewicht, stetiges und angemessenes Wachstum (StabG). Einkommensverteilung und Umweltschutz gehören zum erweiterten „magischen Sechseck“.`
      }),
      A("wiso-arbeitsschutz", "mc", 3, 1, {
        question: `Für die neuen Bildschirmarbeitsplätze im Großraumbüro soll eine Gefährdungsbeurteilung erstellt werden. Wer ist dafür nach dem Arbeitsschutzgesetz verantwortlich?`,
        options: ["Die Berufsgenossenschaft", "Der Betriebsrat", "Der Arbeitgeber", "Die einzelnen Beschäftigten", "Das Gewerbeaufsichtsamt"],
        correct: [2],
        solution: `Nach <b>§ 5 ArbSchG</b> hat der <b>Arbeitgeber</b> die Gefährdungen zu beurteilen und die erforderlichen Maßnahmen abzuleiten und zu dokumentieren (§ 6). Er kann sich durch Fachkraft für Arbeitssicherheit und Betriebsarzt beraten lassen; der Betriebsrat hat Mitbestimmungsrechte (§ 87 Abs. 1 Nr. 7 BetrVG), die Verantwortung bleibt beim Arbeitgeber.`
      })
    ]
  });
})();

/* =====================================================================
   WiSo – Simulation 2: Umschulungsbetrieb Kaiser IT-Solutions GmbH
   ===================================================================== */
(function () {
  let nr = 0;
  const A = (topic, type, points, difficulty, rest) => {
    nr++;
    const n = String(nr).padStart(2, "0");
    return Object.assign({ id: "wiso-sim-2-" + n, part: "WISO", topic, type, points, difficulty }, rest, {
      question: `<b>Aufgabe ${nr})</b> ` + rest.question
    });
  };

  AP2.exams.push({
    id: "wiso-sim-2",
    part: "WISO",
    title: "Simulation WiSo #2 – Betriebsalltag bei der Kaiser IT-Solutions GmbH",
    minutes: 60,
    scenario: `<p>Die <b>Kaiser IT-Solutions GmbH</b> in Nürnberg entwickelt Branchensoftware für Handwerksbetriebe und betreibt einen Cloud-Service. Sie beschäftigt 65 Arbeitnehmer, darunter sechs Auszubildende und vier Umschülerinnen und Umschüler, die über einen Bildungsträger betriebliche Praxisphasen absolvieren. Es besteht ein Betriebsrat; das Unternehmen ist tarifgebunden.</p>
<p>Sie sind Umschüler/in zum Fachinformatiker für Anwendungsentwicklung und werden in verschiedenen Abteilungen (Personal, Einkauf, Vertrieb, Entwicklung) eingesetzt. Bearbeitungszeit 60 Minuten, 30 Aufgaben, 100 Punkte. Sofern Werte vorgegeben sind, rechnen Sie mit diesen.</p>`,
    tasks: [
      A("wiso-ausbildung", "mc", 3, 1, {
        question: `Eine Auszubildende fragt, welche Bedeutung der schriftliche bzw. elektronische Ausbildungsnachweis hat. Welche Aussage ist richtig?`,
        options: [
          "Der Ausbildungsnachweis ist freiwillig und dient nur der persönlichen Erinnerung.",
          "Das ordnungsgemäße Führen des Ausbildungsnachweises ist Zulassungsvoraussetzung zur Abschlussprüfung.",
          "Der Ausbildungsnachweis wird von der Berufsschule benotet.",
          "Der Ausbildungsnachweis muss nur bei Minderjährigen geführt werden.",
          "Der Ausbildungsnachweis ersetzt das Abschlusszeugnis."
        ],
        correct: [1],
        solution: `Nach <b>§ 13 Nr. 7 BBiG</b> sind Auszubildende verpflichtet, einen Ausbildungsnachweis zu führen; der Ausbildende hält sie dazu an und prüft ihn regelmäßig (§ 14). Das Führen ist <b>Zulassungsvoraussetzung</b> zur Abschlussprüfung (§ 43 Abs. 1 Nr. 2 BBiG). Er wird während der Arbeitszeit geführt.`
      }),
      A("wiso-ausbildung", "mc", 3, 2, {
        question: `Ein Auszubildender hat die Abschlussprüfung nicht bestanden. Welche Folge hat das für sein Ausbildungsverhältnis?`,
        options: [
          "Das Ausbildungsverhältnis endet automatisch mit dem Nichtbestehen.",
          "Auf sein Verlangen verlängert sich das Ausbildungsverhältnis bis zur nächstmöglichen Wiederholungsprüfung, höchstens um ein Jahr.",
          "Der Betrieb muss ihn unbefristet weiterbeschäftigen.",
          "Er muss die gesamte Ausbildung neu beginnen.",
          "Die IHK entscheidet, ob das Ausbildungsverhältnis verlängert wird."
        ],
        correct: [1],
        solution: `Nach <b>§ 21 Abs. 3 BBiG</b> verlängert sich das Berufsausbildungsverhältnis bei Nichtbestehen <b>auf Verlangen des Auszubildenden</b> bis zur nächstmöglichen Wiederholungsprüfung, <b>höchstens um ein Jahr</b>. Die Prüfung kann zweimal wiederholt werden (§ 37 Abs. 1 BBiG).`
      }),
      A("wiso-ausbildung", "mc", 3, 2, {
        question: `Die reguläre Ausbildungszeit einer Auszubildenden endet am 31. Januar. Sie besteht die Abschlussprüfung bereits am 10. Dezember; der Prüfungsausschuss teilt ihr das Ergebnis am selben Tag mit. Wann endet das Ausbildungsverhältnis?`,
        options: ["Am 31. Januar", "Am 10. Dezember mit Bekanntgabe des Ergebnisses durch den Prüfungsausschuss", "Am 31. Dezember", "Mit Zugang des schriftlichen Prüfungszeugnisses", "Erst nach Kündigung durch den Betrieb"],
        correct: [1],
        solution: `Besteht der Auszubildende vor Ablauf der Ausbildungszeit die Abschlussprüfung, so endet das Berufsausbildungsverhältnis mit <b>Bekanntgabe des Ergebnisses durch den Prüfungsausschuss</b> (§ 21 Abs. 2 BBiG). Wird sie danach weiterbeschäftigt, ohne dass etwas vereinbart ist, gilt ein Arbeitsverhältnis auf unbestimmte Zeit als begründet (§ 24 BBiG).`
      }),
      A("wiso-ausbildung", "mc", 4, 3, {
        question: `Welche Aussage zur beruflichen <b>Umschulung</b> zum Fachinformatiker für Anwendungsentwicklung ist richtig?`,
        options: [
          "Umschülerinnen und Umschüler haben gegenüber dem Praktikumsbetrieb Anspruch auf die Mindestausbildungsvergütung nach § 17 BBiG.",
          "Eine Umschulung darf nur an einer Berufsschule stattfinden.",
          "Führt die Umschulung zu einem anerkannten Ausbildungsberuf, gelten für die Prüfung die Anforderungen der Ausbildungsordnung; zuständig für die Prüfung ist die IHK.",
          "Umschülerinnen und Umschüler legen eine vereinfachte Prüfung ohne Projektarbeit ab.",
          "Eine Umschulung dauert gesetzlich immer genau drei Jahre."
        ],
        correct: [2],
        solution: `Die berufliche Umschulung ist in <b>§§ 58 ff. BBiG</b> geregelt. Führt sie zu einem anerkannten Ausbildungsberuf, sind das Ausbildungsberufsbild, der Ausbildungsrahmenplan und die <b>Prüfungsanforderungen der Ausbildungsordnung</b> zugrunde zu legen (§ 60 BBiG). Die Prüfung nimmt die zuständige Stelle (IHK) ab. Die Mindestausbildungsvergütung gilt für Auszubildende, nicht für Umschüler; die Umschulungsdauer ist in der Regel verkürzt (meist 24–28 Monate).`
      }),
      A("wiso-arbeitsrecht", "mc", 3, 1, {
        question: `Ein Mitarbeiter scheidet aus der Kaiser IT-Solutions GmbH aus und verlangt ein Zeugnis, das auch Leistung und Verhalten beurteilt. Welche Aussage ist richtig?`,
        options: [
          "Ein Zeugnis wird nur auf Wunsch des Arbeitgebers ausgestellt.",
          "Der Arbeitnehmer hat Anspruch auf ein einfaches Zeugnis; auf Verlangen ist es auf Leistung und Verhalten zu erstrecken (qualifiziertes Zeugnis).",
          "Ein qualifiziertes Zeugnis muss negative Vorfälle ausführlich darstellen.",
          "Das Zeugnis darf ausschließlich mündlich erteilt werden.",
          "Ein Zeugnisanspruch besteht erst nach fünf Jahren Betriebszugehörigkeit."
        ],
        correct: [1],
        solution: `Nach <b>§ 109 GewO</b> hat der Arbeitnehmer bei Beendigung Anspruch auf ein schriftliches Zeugnis über Art und Dauer der Tätigkeit (einfaches Zeugnis); auf Verlangen erstreckt es sich auch auf <b>Leistung und Verhalten</b> (qualifiziertes Zeugnis). Es muss klar, verständlich, wahr und wohlwollend formuliert sein.`
      }),
      A("wiso-arbeitsrecht", "mc", 4, 2, {
        question: `Ein Start-up mit acht Arbeitnehmern (Vollzeit) kündigt einer Entwicklerin nach drei Jahren Betriebszugehörigkeit ordentlich und fristgerecht, ohne Gründe zu nennen. Welche Aussage ist richtig?`,
        options: [
          "Die Kündigung ist unwirksam, da sie nicht sozial gerechtfertigt ist.",
          "Das Kündigungsschutzgesetz ist nicht anwendbar, da der Betrieb nicht mehr als zehn Arbeitnehmer beschäftigt; die Kündigung ist grundsätzlich wirksam.",
          "Die Kündigung ist nur mit Zustimmung des Integrationsamtes wirksam.",
          "Die Entwicklerin hat Anspruch auf eine gesetzliche Abfindung von einem Monatsgehalt pro Beschäftigungsjahr.",
          "Die Kündigung ist unwirksam, weil sie nicht begründet wurde."
        ],
        correct: [1],
        solution: `Das <b>Kündigungsschutzgesetz</b> gilt erst in Betrieben mit <b>mehr als zehn Arbeitnehmern</b> (§ 23 KSchG; Teilzeitkräfte anteilig) und nach sechs Monaten Betriebszugehörigkeit (§ 1). Im Kleinbetrieb ist eine fristgerechte Kündigung ohne soziale Rechtfertigung grundsätzlich wirksam (Grenzen: Treu und Glauben, Diskriminierungsverbote, Sonderkündigungsschutz). Die Schriftform ist erforderlich (§ 623 BGB), eine Begründung nicht.`
      }),
      A("wiso-arbeitsrecht", "mc", 3, 2, {
        question: `Ein Mitarbeiter kommt wiederholt unentschuldigt zu spät zur Rufbereitschaft. Bevor die Kaiser IT-Solutions GmbH verhaltensbedingt kündigt, muss sie in der Regel …`,
        options: ["den Mitarbeiter abmahnen.", "eine Geldbuße verhängen.", "die IHK informieren.", "eine Änderungskündigung aussprechen.", "die Agentur für Arbeit einschalten."],
        correct: [0],
        solution: `Vor einer <b>verhaltensbedingten Kündigung</b> ist in der Regel eine <b>Abmahnung</b> erforderlich (Verhältnismäßigkeitsgrundsatz). Sie hat Hinweis-, Rüge- und Warnfunktion: konkretes Fehlverhalten benennen, zu vertragsgemäßem Verhalten auffordern und arbeitsrechtliche Konsequenzen androhen.`
      }),
      A("wiso-sozialversicherung", "numeric", 3, 2, {
        question: `Ein Student soll als Minijobber den Support unterstützen. Es gelten ein gesetzlicher Mindestlohn von 13,90 € je Stunde und eine Minijob-Verdienstgrenze von 603,00 € im Monat. Wie viele <b>volle</b> Stunden darf er bei Mindestlohn höchstens pro Monat arbeiten, ohne die Verdienstgrenze zu überschreiten?`,
        answer: 43, tolerance: 0, unit: "Stunden",
        solution: `<p>603,00 € / 13,90 €/h ≈ 43,38 h ⇒ höchstens <b>43 volle Stunden</b> (43 · 13,90 € = 597,70 €; 44 · 13,90 € = 611,60 € &gt; 603,00 €).</p>`
      }),
      A("wiso-arbeitsrecht", "mc", 3, 2, {
        question: `Eine Mitarbeiterin ist schwanger. Welche Aussage zum Mutterschutz ist richtig?`,
        options: [
          "Die Schutzfrist beginnt zwölf Wochen vor der Entbindung.",
          "Während der Schwangerschaft darf ihr jederzeit ordentlich gekündigt werden.",
          "Nach der Entbindung besteht grundsätzlich eine Schutzfrist von acht Wochen, in der sie nicht beschäftigt werden darf.",
          "Die Elternzeit beträgt höchstens sechs Monate je Kind.",
          "In der Schutzfrist vor der Entbindung ist eine Beschäftigung ausnahmslos verboten, auch wenn sie dies ausdrücklich wünscht."
        ],
        correct: [2],
        solution: `Nach dem <b>MuSchG</b> beginnt die Schutzfrist <b>sechs Wochen vor</b> der Entbindung (Beschäftigung nur, wenn die Frau sich ausdrücklich bereit erklärt) und endet grundsätzlich <b>acht Wochen nach</b> der Entbindung (absolutes Beschäftigungsverbot; bei Früh- und Mehrlingsgeburten zwölf Wochen). Ab Beginn der Schwangerschaft besteht Kündigungsschutz (§ 17 MuSchG). Elternzeit: bis zu drei Jahre je Kind (BEEG).`
      }),
      A("wiso-arbeitsrecht", "multi", 4, 2, {
        question: `Welche der folgenden Pflichten sind <b>Pflichten des Arbeitnehmers</b> aus dem Arbeitsvertrag?`,
        options: [
          "Arbeitspflicht (persönliche Erbringung der vereinbarten Arbeitsleistung)",
          "Verschwiegenheitspflicht über Betriebs- und Geschäftsgeheimnisse",
          "Fürsorgepflicht (Schutz von Leben und Gesundheit)",
          "Gesetzliches Wettbewerbsverbot während des Arbeitsverhältnisses",
          "Vergütungspflicht",
          "Pflicht zur Befolgung zulässiger Weisungen des Arbeitgebers"
        ],
        correct: [0, 1, 3, 5],
        solution: `Arbeitnehmerpflichten: <b>Arbeitspflicht</b>, <b>Treuepflicht</b> (u. a. Verschwiegenheit, Wettbewerbsverbot während des Arbeitsverhältnisses, § 60 HGB analog), <b>Gehorsamspflicht</b> (Weisungsrecht, § 106 GewO). Fürsorge- und Vergütungspflicht sind Pflichten des <b>Arbeitgebers</b>.`
      }),
      A("wiso-tarif-mitbestimmung", "mc", 3, 2, {
        question: `Ein Tarifvertrag gilt normalerweise nur für Mitglieder der Tarifvertragsparteien. Wodurch kann er auch für nicht tarifgebundene Arbeitgeber und Arbeitnehmer einer Branche verbindlich werden?`,
        options: [
          "Durch Beschluss des Betriebsrats",
          "Durch eine Allgemeinverbindlicherklärung des Bundesministeriums für Arbeit und Soziales (bzw. der obersten Arbeitsbehörde eines Landes)",
          "Durch Eintragung ins Handelsregister",
          "Durch Urabstimmung der Gewerkschaftsmitglieder",
          "Durch Beschluss der IHK-Vollversammlung"
        ],
        correct: [1],
        solution: `Nach <b>§ 5 TVG</b> kann das BMAS (bzw. eine Landesbehörde) einen Tarifvertrag auf gemeinsamen Antrag der Tarifvertragsparteien und im Einvernehmen mit dem Tarifausschuss für <b>allgemeinverbindlich</b> erklären, wenn dies im öffentlichen Interesse geboten erscheint.`
      }),
      A("wiso-tarif-mitbestimmung", "mc", 3, 1, {
        question: `Welche Regelung findet sich typischerweise in einem <b>Manteltarifvertrag</b> (Rahmentarifvertrag)?`,
        options: ["Die Höhe der Stundenlöhne für das laufende Jahr", "Die Wochenarbeitszeit, Urlaubsdauer und Kündigungsfristen", "Die Gewinnverteilung des Unternehmens", "Die Wahl des Aufsichtsrats", "Die Preisgestaltung der Produkte"],
        correct: [1],
        solution: `Der <b>Manteltarifvertrag</b> regelt längerfristig die allgemeinen Arbeitsbedingungen (Arbeitszeit, Urlaub, Zuschläge, Kündigungsfristen) und hat eine lange Laufzeit. Die Entgelthöhe wird im <b>Entgelt- bzw. Lohn- und Gehaltstarifvertrag</b> mit kürzerer Laufzeit festgelegt; Entgeltgruppen im Entgeltrahmentarifvertrag.`
      }),
      A("wiso-tarif-mitbestimmung", "mc", 4, 2, {
        question: `Die Geschäftsführung kündigt einem Mitarbeiter, ohne den Betriebsrat vorher anzuhören. Welche Rechtsfolge hat dies?`,
        options: [
          "Keine – der Betriebsrat ist nur über die erfolgte Kündigung zu informieren.",
          "Die Kündigung ist unwirksam.",
          "Die Kündigung wird erst nach einer Woche wirksam.",
          "Der Betriebsrat kann eine Geldbuße gegen den Mitarbeiter verhängen.",
          "Die Kündigung ist wirksam, der Arbeitgeber muss aber eine Abfindung zahlen."
        ],
        correct: [1],
        solution: `Nach <b>§ 102 Abs. 1 BetrVG</b> ist der Betriebsrat vor jeder Kündigung zu hören; eine <b>ohne Anhörung ausgesprochene Kündigung ist unwirksam</b>. Der Betriebsrat kann Bedenken (bei ordentlicher Kündigung binnen einer Woche) äußern oder unter bestimmten Voraussetzungen widersprechen; ein Zustimmungserfordernis besteht grundsätzlich nicht.`
      }),
      A("wiso-tarif-mitbestimmung", "mc", 3, 1, {
        question: `Ab welcher Betriebsgröße kann nach dem Betriebsverfassungsgesetz ein Betriebsrat gewählt werden, und wie lange ist seine regelmäßige Amtszeit?`,
        options: [
          "Ab 5 ständigen wahlberechtigten Arbeitnehmern, von denen 3 wählbar sind; Amtszeit 4 Jahre",
          "Ab 10 Arbeitnehmern; Amtszeit 2 Jahre",
          "Ab 20 Arbeitnehmern; Amtszeit 5 Jahre",
          "Ab 50 Arbeitnehmern; Amtszeit 3 Jahre",
          "In jedem Betrieb unabhängig von der Größe; Amtszeit unbegrenzt"
        ],
        correct: [0],
        solution: `Betriebsräte werden in Betrieben mit in der Regel <b>mindestens fünf ständigen wahlberechtigten Arbeitnehmern</b> gewählt, von denen <b>drei wählbar</b> sind (§ 1 BetrVG). Die regelmäßige Amtszeit beträgt <b>vier Jahre</b> (§ 21 BetrVG), regelmäßige Wahlen finden 2026, 2030 usw. statt.`
      }),
      A("wiso-sozialversicherung", "numeric", 4, 3, {
        question: `Eine Teamleiterin verdient 6.400,00 € brutto im Monat. Für die Krankenversicherung gelten eine Beitragsbemessungsgrenze von 5.812,50 € monatlich, ein allgemeiner Beitragssatz von 14,6 % und ein Zusatzbeitrag von 2,9 % (beides je zur Hälfte von Arbeitgeber und Arbeitnehmer). Berechnen Sie ihren monatlichen <b>Arbeitnehmeranteil zur Krankenversicherung</b> (kaufmännisch auf Cent gerundet).`,
        answer: 508.59, tolerance: 0.01, unit: "€",
        solution: `<p>Da das Gehalt über der Beitragsbemessungsgrenze liegt, wird nur bis 5.812,50 € verbeitragt.</p><p>AN-Anteil: (14,6 % + 2,9 %) / 2 = 8,75 % ⇒ 5.812,50 € · 0,0875 = 508,59375 € ≈ <b>508,59 €</b></p>`
      }),
      A("wiso-sozialversicherung", "mc", 3, 1, {
        question: `Nach welchem Prinzip wird die gesetzliche Rentenversicherung in Deutschland finanziert?`,
        options: [
          "Kapitaldeckungsverfahren – jeder spart sein eigenes Rentenkapital an",
          "Umlageverfahren – die Beiträge der heutigen Beschäftigten finanzieren die laufenden Renten (Generationenvertrag)",
          "Ausschließlich aus Steuermitteln",
          "Ausschließlich aus Beiträgen der Arbeitgeber",
          "Äquivalenzprinzip der privaten Versicherungswirtschaft"
        ],
        correct: [1],
        solution: `Die gesetzliche Rentenversicherung arbeitet im <b>Umlageverfahren</b> („Generationenvertrag“): Die Beiträge der Erwerbstätigen und Arbeitgeber (je 9,3 % bei 18,6 %) werden unmittelbar für die laufenden Renten verwendet, ergänzt um einen Bundeszuschuss aus Steuermitteln.`
      }),
      A("wiso-sozialversicherung", "mc", 3, 2, {
        question: `Ein Entwickler ist wegen einer Erkrankung neun Wochen arbeitsunfähig. Wer zahlt in welchem Zeitraum?`,
        options: [
          "Die Krankenkasse zahlt vom ersten Tag an Krankengeld.",
          "Der Arbeitgeber zahlt bis zu sechs Wochen das Entgelt fort; danach zahlt die Krankenkasse Krankengeld.",
          "Der Arbeitgeber zahlt für die gesamten neun Wochen das volle Gehalt.",
          "Die Berufsgenossenschaft zahlt ab dem dritten Tag Verletztengeld.",
          "Die Agentur für Arbeit zahlt Arbeitslosengeld."
        ],
        correct: [1],
        solution: `Nach dem <b>Entgeltfortzahlungsgesetz</b> besteht bei unverschuldeter Arbeitsunfähigkeit Anspruch auf Entgeltfortzahlung durch den Arbeitgeber für <b>bis zu sechs Wochen</b> (§ 3 EFZG), sofern das Arbeitsverhältnis vier Wochen bestand. Danach zahlt die <b>Krankenkasse Krankengeld</b> (70 % des Bruttos, höchstens 90 % des Nettos). Verletztengeld der BG gibt es nur bei Arbeits- und Wegeunfällen.`
      }),
      A("wiso-vertragsrecht", "order", 4, 1, {
        question: `Der Einkauf beschafft neue Entwickler-Notebooks. Bringen Sie die Schritte des Beschaffungs- und Kaufvorgangs in die übliche Reihenfolge.`,
        items: [
          "Anfrage an mehrere Lieferanten",
          "Eingang der Angebote und Angebotsvergleich",
          "Bestellung beim ausgewählten Lieferanten",
          "Auftragsbestätigung durch den Lieferanten",
          "Lieferung und Wareneingangsprüfung",
          "Rechnungsprüfung und Zahlung"
        ],
        solution: `Anfrage (rechtlich unverbindlich) → Angebot/Angebotsvergleich → Bestellung → Auftragsbestätigung → Lieferung mit Prüfung (bei Handelskauf unverzügliche Mängelrüge, § 377 HGB) → Rechnungsprüfung und Zahlung (Erfüllung).`
      }),
      A("wiso-unternehmen", "mc", 3, 2, {
        question: `Ein Großkunde der Kaiser IT-Solutions GmbH ist eine Aktiengesellschaft. Welches Organ der AG bestellt den Vorstand und überwacht dessen Geschäftsführung?`,
        options: ["Die Hauptversammlung", "Der Aufsichtsrat", "Der Betriebsrat", "Das Registergericht", "Der Wirtschaftsprüfer"],
        correct: [1],
        solution: `Organe der AG: <b>Vorstand</b> (Leitung, Vertretung), <b>Aufsichtsrat</b> (bestellt, überwacht und beruft den Vorstand ab, § 84, § 111 AktG) und <b>Hauptversammlung</b> (wählt die Anteilseignervertreter im Aufsichtsrat, beschließt über Gewinnverwendung und Satzungsänderungen).`
      }),
      A("wiso-unternehmen", "mc", 4, 2, {
        question: `Zwei Umschüler wollen sich nach der Prüfung selbstständig machen, verfügen aber nur über wenig Eigenkapital, möchten jedoch nicht mit ihrem Privatvermögen haften. Welche Aussage zur <b>Unternehmergesellschaft (haftungsbeschränkt)</b> ist richtig?`,
        options: [
          "Sie benötigt ein Mindeststammkapital von 25.000 €.",
          "Die Gesellschafter haften persönlich und unbeschränkt.",
          "Sie kann mit einem Stammkapital ab 1 € gegründet werden; ein Viertel des Jahresüberschusses ist in eine gesetzliche Rücklage einzustellen, bis das Stammkapital von 25.000 € erreicht ist.",
          "Sie muss nicht ins Handelsregister eingetragen werden.",
          "Sie ist eine Personengesellschaft wie die OHG."
        ],
        correct: [2],
        solution: `Die <b>UG (haftungsbeschränkt)</b> ist eine Variante der GmbH (§ 5a GmbHG, Kapitalgesellschaft): Stammkapital <b>ab 1 €</b> (Sacheinlagen ausgeschlossen), Haftung auf das Gesellschaftsvermögen beschränkt, Pflicht zur Bildung einer <b>Rücklage von 25 % des Jahresüberschusses</b>, bis 25.000 € erreicht sind; danach Umfirmierung in eine GmbH möglich. Eintragung ins Handelsregister ist erforderlich.`
      }),
      A("wiso-unternehmen", "mc", 3, 2, {
        question: `Die Leiterin des Einkaufs erhält eine Handlungsvollmacht (Artvollmacht für Einkäufe). Worin unterscheidet sie sich von der Prokura?`,
        options: [
          "Die Handlungsvollmacht wird ins Handelsregister eingetragen, die Prokura nicht.",
          "Die Handlungsvollmacht ist umfassender als die Prokura.",
          "Die Handlungsvollmacht wird nicht ins Handelsregister eingetragen und deckt nur Geschäfte, die ein derartiges Handelsgewerbe gewöhnlich mit sich bringt.",
          "Eine Handlungsvollmacht kann nur ein Notar erteilen.",
          "Mit Handlungsvollmacht darf ohne besondere Befugnis ein Grundstück verkauft werden."
        ],
        correct: [2],
        solution: `Die <b>Handlungsvollmacht</b> (§ 54 HGB) ermächtigt zu Geschäften, die der Betrieb eines <i>derartigen</i> Handelsgewerbes <b>gewöhnlich</b> mit sich bringt; sie kann formlos erteilt werden und wird <b>nicht eingetragen</b>. Die <b>Prokura</b> ist umfassender, muss ausdrücklich erteilt und ins Handelsregister eingetragen werden.`
      }),
      A("wiso-vertragsrecht", "mc", 3, 1, {
        question: `Ein Privatkunde kauft über den Onlineshop der Kaiser IT-Solutions GmbH eine Softwarelizenz auf DVD. Wie lange kann er den Vertrag grundsätzlich widerrufen, wenn er ordnungsgemäß belehrt wurde?`,
        options: ["7 Tage ab Vertragsschluss", "14 Tage, bei Warenlieferung beginnend mit Erhalt der Ware", "30 Tage ab Rechnungsdatum", "2 Jahre", "Ein Widerrufsrecht besteht bei Onlinekäufen nicht"],
        correct: [1],
        solution: `Bei <b>Fernabsatzverträgen</b> zwischen Unternehmer und Verbraucher besteht ein Widerrufsrecht von <b>14 Tagen</b> (§§ 312g, 355 BGB); bei Warenlieferungen beginnt die Frist mit Erhalt der Ware. Ausnahme z. B.: versiegelte Datenträger, deren Versiegelung nach Lieferung entfernt wurde (§ 312g Abs. 2 Nr. 6 BGB). Bei fehlender Belehrung erlischt das Recht spätestens nach 12 Monaten und 14 Tagen.`
      }),
      A("wiso-vertragsrecht", "mc", 4, 3, {
        question: `Ein Lieferant liefert bestellte Server nicht zum vereinbarten Termin „Lieferung Anfang November“. Unter welchen Voraussetzungen gerät er in <b>Lieferverzug</b>?`,
        options: [
          "Automatisch am 1. November, eine Mahnung ist nie erforderlich.",
          "Die Leistung muss fällig sein und der Käufer muss mahnen, da der Liefertermin nicht kalendermäßig genau bestimmt ist; zudem muss der Lieferant die Verzögerung zu vertreten haben.",
          "Nur wenn der Käufer sofort vom Vertrag zurücktritt.",
          "Nur bei Verschulden des Käufers.",
          "Erst nach einer gerichtlichen Feststellung."
        ],
        correct: [1],
        solution: `Voraussetzungen des Lieferverzugs (§ 286 BGB): <b>Fälligkeit</b>, <b>Mahnung</b> (entbehrlich bei kalendermäßig bestimmtem Termin, z. B. „bis 05.11.2026“ – „Anfang November“ ist nicht genau bestimmt) und <b>Vertretenmüssen</b> (Verschulden) des Lieferanten. Rechte: Erfüllung und Ersatz des Verzugsschadens; nach erfolgloser Nachfrist Rücktritt bzw. Schadensersatz statt der Leistung.`
      }),
      A("wiso-vertragsrecht", "mc", 3, 2, {
        question: `Die Kaiser IT-Solutions GmbH hat einem Kunden am 15. Mai 2026 eine Rechnung über Programmierleistungen gestellt (Forderung fällig am selben Tag). Wann verjährt die Forderung nach der regelmäßigen Verjährungsfrist, wenn keine Hemmung oder Unterbrechung eintritt?`,
        options: ["15. Mai 2029", "31. Dezember 2028", "31. Dezember 2029", "15. Mai 2028", "31. Dezember 2031"],
        correct: [2],
        solution: `Die regelmäßige Verjährungsfrist beträgt <b>drei Jahre</b> (§ 195 BGB) und beginnt mit dem <b>Schluss des Jahres</b>, in dem der Anspruch entstanden ist und der Gläubiger davon Kenntnis erlangt hat (§ 199 BGB). Beginn: 31.12.2026, 24:00 Uhr ⇒ Verjährung mit Ablauf des <b>31.12.2029</b>.`
      }),
      A("wiso-vertragsrecht", "multi", 4, 3, {
        question: `Welche der folgenden Rechtsgeschäfte sind von Anfang an <b>nichtig</b> (nicht nur anfechtbar)?`,
        options: [
          "Ein Sechsjähriger kauft von seinem Geld ein Videospiel.",
          "Ein Grundstückskaufvertrag wird nur privatschriftlich ohne notarielle Beurkundung geschlossen.",
          "Ein Kunde bestellt versehentlich 100 statt 10 Lizenzen (Erklärungsirrtum).",
          "Ein Kredit mit einem Zinssatz von 45 % unter Ausnutzung einer Zwangslage (Wucher).",
          "Ein Verkäufer verschweigt arglistig einen bekannten Unfallschaden am Firmenwagen.",
          "Eine offensichtlich nicht ernst gemeinte Erklärung im Scherz („Ich verkaufe dir die Firma für einen Euro“)."
        ],
        correct: [0, 1, 3, 5],
        solution: `<b>Nichtig</b>: Willenserklärungen Geschäftsunfähiger (unter 7 Jahre, §§ 104, 105 BGB), Verstoß gegen die gesetzliche Formvorschrift (§§ 125, 311b BGB), Sittenwidrigkeit/Wucher (§ 138 BGB), Scherzgeschäft (§ 118 BGB). <b>Anfechtbar</b> (zunächst wirksam): Irrtum (§ 119 BGB) und arglistige Täuschung (§ 123 BGB).`
      }),
      A("wiso-kalkulation", "numeric", 4, 2, {
        question: `Die Kaiser IT-Solutions GmbH bietet Cloud-Wartungsverträge zu 89,00 € pro Monat an. Die variablen Kosten je Vertrag betragen 34,00 € pro Monat, die monatlichen Fixkosten des Cloud-Service 41.250,00 €. Wie viele Verträge müssen mindestens bestehen, damit die Kosten gedeckt sind?`,
        answer: 750, tolerance: 0, unit: "Verträge",
        solution: `<p>Deckungsbeitrag je Vertrag: 89,00 € − 34,00 € = 55,00 €</p><p>Break-even-Menge: 41.250,00 € / 55,00 € = <b>750 Verträge</b></p>`
      }),
      A("wiso-wirtschaft", "numeric", 3, 3, {
        question: `Ein neuer Entgelttarifvertrag erhöht die Gehälter um 4,0 %. Im gleichen Zeitraum steigt der Verbraucherpreisindex um 2,2 %. Um wie viel Prozent steigt der <b>Reallohn</b>? Berechnen Sie exakt (nicht näherungsweise durch Subtraktion) und runden Sie auf zwei Nachkommastellen.`,
        answer: 1.76, tolerance: 0.01, unit: "%",
        solution: `<p>Reallohnindex = (1 + Nominallohnsteigerung) / (1 + Inflationsrate) = 1,040 / 1,022 ≈ 1,01761</p><p>Reallohnsteigerung ≈ <b>1,76 %</b> (Näherung durch Subtraktion: 4,0 % − 2,2 % = 1,8 %).</p>`
      }),
      A("wiso-wirtschaft", "mc", 3, 2, {
        question: `Die Europäische Zentralbank erhöht die Leitzinsen. Welche Wirkung ist damit typischerweise beabsichtigt?`,
        options: [
          "Kredite werden billiger, Investitionen steigen.",
          "Die Nachfrage wird gedämpft, um die Inflationsrate zu senken.",
          "Die Arbeitslosigkeit soll kurzfristig sinken.",
          "Die Staatsverschuldung wird automatisch abgebaut.",
          "Die Exporte in Länder außerhalb des Euroraums werden verbilligt."
        ],
        correct: [1],
        solution: `Höhere Leitzinsen verteuern Kredite und machen Sparen attraktiver; Konsum- und Investitionsnachfrage sinken, wodurch der Preisauftrieb gedämpft wird. Vorrangiges Ziel der EZB ist die <b>Preisniveaustabilität</b> (mittelfristig 2 % Inflation). Ein höherer Zins kann den Euro aufwerten und Exporte eher verteuern.`
      }),
      A("wiso-wirtschaft", "mc", 3, 1, {
        question: `Den Markt für Cloud-Infrastruktur teilen sich im Wesentlichen wenige große Anbieter, denen sehr viele Nachfrager gegenüberstehen. Welche Marktform liegt vor?`,
        options: ["Polypol", "Angebotsmonopol", "Angebotsoligopol", "Nachfragemonopol", "Bilaterales Monopol"],
        correct: [2],
        solution: `<b>Wenige Anbieter – viele Nachfrager</b> ⇒ Angebotsoligopol. Polypol: viele Anbieter und viele Nachfrager; Monopol: ein Anbieter; bilaterales Monopol: je ein Anbieter und ein Nachfrager.`
      }),
      A("wiso-arbeitsschutz", "mc", 3, 2, {
        question: `Ein Mitarbeiter stolpert im Serverraum über ein Kabel und ist anschließend fünf Kalendertage arbeitsunfähig. Welche Pflicht hat die Kaiser IT-Solutions GmbH?`,
        options: [
          "Keine, da der Unfall im Betrieb und nicht auf dem Arbeitsweg geschah.",
          "Sie muss den Unfall binnen drei Tagen nach Kenntnis dem Unfallversicherungsträger (Berufsgenossenschaft) anzeigen, da die Arbeitsunfähigkeit mehr als drei Kalendertage dauert.",
          "Sie muss den Unfall nur in das Verbandbuch eintragen.",
          "Sie muss den Unfall der Krankenkasse innerhalb eines Monats melden.",
          "Sie muss den Unfall nur melden, wenn der Mitarbeiter stationär behandelt wird."
        ],
        correct: [1],
        solution: `Nach <b>§ 193 SGB VII</b> muss der Unternehmer einen Arbeitsunfall anzeigen, wenn der Versicherte <b>mehr als drei Kalendertage arbeitsunfähig</b> ist oder stirbt; die Anzeige ist <b>binnen drei Tagen</b> nach Kenntnis an den Unfallversicherungsträger zu erstatten. Kleinere Verletzungen ohne Meldepflicht werden im Verbandbuch dokumentiert. Zudem sollten Ursachen (Kabelführung) im Rahmen der Gefährdungsbeurteilung beseitigt werden.`
      })
    ]
  });
})();
