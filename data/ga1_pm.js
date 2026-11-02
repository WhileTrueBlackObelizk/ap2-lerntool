// GA1 – Planen eines Softwareproduktes: Projektmanagement, Anforderungen, Wirtschaftlichkeit, Qualität, Ergonomie
window.AP2 = window.AP2 || { topics: [], questions: [], exams: [], generators: [] };

AP2.topics.push(
  {
    id: "ga1-projektmanagement",
    part: "GA1",
    title: "Projektmanagement (klassisch & agil, Netzplan)",
    summary: `<h4>Projektmerkmale (DIN 69901)</h4>
<ul><li><b>Einmaligkeit</b> der Bedingungen, <b>zeitliche Begrenzung</b> (fester Start/Ende), <b>Zielvorgabe</b>, <b>begrenzte Ressourcen</b> (Personal, Budget), <b>projektspezifische Organisation</b>, Komplexität, Neuartigkeit, Risiko.</li>
<li>Abgrenzung: Routineaufgaben/Linientätigkeit sind <b>kein</b> Projekt.</li></ul>
<h4>Magisches Dreieck</h4>
<p><b>Zeit – Kosten – Qualität/Leistung (Umfang)</b>. Ändert man eine Ecke, wirkt sich das auf die anderen aus (z.&nbsp;B. kürzere Zeit → höhere Kosten oder weniger Umfang). Erweiterung: Teufelsquadrat (Zeit, Kosten, Qualität, Quantität).</p>
<h4>Vorgehensmodelle</h4>
<ul><li><b>Wasserfall</b>: sequenziell (Analyse → Entwurf → Implementierung → Test → Einführung → Wartung), Phase abgeschlossen bevor nächste beginnt; gut bei stabilen Anforderungen, späte Fehlererkennung.</li>
<li><b>V-Modell</b>: jeder Entwicklungsstufe links steht eine Teststufe rechts gegenüber (Anforderungen ↔ Abnahmetest, Systementwurf ↔ Systemtest, Architektur ↔ Integrationstest, Modulentwurf ↔ Modultest). Testfälle früh planbar. V-Modell XT = Standard öffentlicher Auftraggeber.</li>
<li><b>Spiralmodell</b> (Boehm): iterativ, jede Runde 4 Quadranten: Ziele festlegen → <b>Risiken analysieren</b>/Prototyp → entwickeln &amp; testen → nächste Runde planen. Risikogetrieben.</li>
<li><b>Inkrementell</b>: System wird in lauffähigen Teilen (Inkrementen) ausgeliefert. <b>Iterativ</b>: wiederholte Durchläufe zur Verfeinerung.</li></ul>
<h4>Scrum (Scrum Guide 2020)</h4>
<ul><li><b>Verantwortlichkeiten</b>: Product Owner (Wert, Product Backlog, priorisiert), Scrum Master (Coach, beseitigt Hindernisse, sorgt für Scrum-Verständnis), Developers (erstellen das Inkrement, selbstorganisiert). Scrum Team ≤ 10 Personen.</li>
<li><b>Events</b> (Timeboxes bei 1-Monats-Sprint): Sprint max. 1 Monat · Sprint Planning max. 8 h · Daily Scrum 15 min · Sprint Review max. 4 h · Sprint Retrospective max. 3 h. Bei kürzeren Sprints entsprechend kürzer.</li>
<li><b>Artefakte + Commitment</b>: Product Backlog → Produktziel; Sprint Backlog → Sprint-Ziel; Inkrement → <b>Definition of Done</b> (gemeinsames Qualitätsverständnis, wann etwas „fertig“ ist).</li>
<li>Velocity = erledigte Story Points pro Sprint (Planungsgröße, kein Leistungsvergleich zwischen Teams).</li></ul>
<h4>Kanban</h4>
<p>Visualisierung (Board: To Do – In Progress – Done), <b>WIP-Limit</b> (Work in Progress) begrenzt parallele Arbeit pro Spalte → Engpässe sichtbar, kürzere Durchlaufzeit, Pull-Prinzip, keine festen Iterationen.</p>
<h4>Planungswerkzeuge</h4>
<ul><li><b>Projektstrukturplan (PSP)</b>: hierarchische Zerlegung in Teilprojekte und <b>Arbeitspakete</b> (kleinste Einheit, verantwortliche Person, Aufwand, Ergebnis). Gliederung objekt-, funktions- (phasen-) oder gemischt orientiert. Keine Zeitabhängigkeiten!</li>
<li><b>Netzplan (Vorgangsknoten)</b>: Vorwärtsrechnung FAZ = max. FEZ der Vorgänger, FEZ = FAZ + Dauer. Rückwärtsrechnung SEZ = min. SAZ der Nachfolger, SAZ = SEZ − Dauer.<br><b>Gesamtpuffer GP = SAZ − FAZ</b> (= SEZ − FEZ), <b>Freier Puffer FP = min(FAZ Nachfolger) − FEZ</b>. <b>Kritischer Pfad</b>: alle Vorgänge mit GP = 0 – jede Verzögerung verlängert das Projekt.</li>
<li><b>Gantt-Diagramm</b> (Balkenplan): Vorgänge als Balken auf Zeitachse, Abhängigkeiten, Meilensteine (Raute), Fortschritt gut darstellbar.</li>
<li><b>Meilenstein</b>: Ereignis mit Dauer 0, prüfbares Zwischenergebnis (z.&nbsp;B. „Pflichtenheft abgenommen“).</li></ul>
<h4>Stakeholder &amp; Risiken</h4>
<ul><li><b>Stakeholderanalyse</b>: Stakeholder identifizieren, Einfluss/Interesse bewerten (Portfolio/Matrix), Maßnahmen ableiten (einbinden, informieren, beobachten).</li>
<li><b>Risikomanagement</b>: identifizieren → bewerten (<b>Risiko = Eintrittswahrscheinlichkeit × Schadenshöhe</b>) → Maßnahmen (vermeiden, vermindern, überwälzen/versichern, akzeptieren) → überwachen.</li></ul>
<h4>Projektabschluss</h4>
<p>Abnahme mit Abnahmeprotokoll, Soll-Ist-Vergleich, Abschlussbericht, Dokumentation übergeben, Ressourcen freigeben, <b>Lessons Learned</b> (was lief gut/schlecht → Erfahrungen für Folgeprojekte sichern).</p>
<p><b>Typische Fallen:</b> FP und GP verwechseln; FAZ bei mehreren Vorgängern nicht das <i>Maximum</i> nehmen; SEZ bei mehreren Nachfolgern nicht das <i>Minimum</i>; „Scrum Master = Projektleiter“ ist falsch.</p>`
  },
  {
    id: "ga1-anforderungen",
    part: "GA1",
    title: "Anforderungsanalyse (Lastenheft, Pflichtenheft, User Stories)",
    summary: `<h4>Lastenheft vs. Pflichtenheft (DIN 69901-5)</h4>
<table><tr><th></th><th>Lastenheft</th><th>Pflichtenheft</th></tr>
<tr><td>Ersteller</td><td><b>Auftraggeber</b></td><td><b>Auftragnehmer</b></td></tr>
<tr><td>Frage</td><td><b>WAS</b> und <b>WOFÜR</b>?</td><td><b>WIE</b> und <b>WOMIT</b>?</td></tr>
<tr><td>Inhalt</td><td>Ist-Zustand, Ziele, Anforderungen aus Anwendersicht, Rahmenbedingungen, Abnahmekriterien</td><td>Umsetzungskonzept: technische Lösung, Architektur, Plattform, Schnittstellen, Qualitätsanforderungen, Abnahmekriterien, Zeitplan</td></tr></table>
<p>Das Pflichtenheft baut auf dem Lastenheft auf; nach Freigabe durch den Auftraggeber ist es Vertragsgrundlage.</p>
<h4>Funktionale vs. nicht-funktionale Anforderungen</h4>
<ul><li><b>Funktional</b>: <i>was</i> das System tun soll (Funktion, Verhalten, Daten). „Das System muss Rechnungen als PDF exportieren.“</li>
<li><b>Nicht-funktional</b>: <i>wie gut</i> / unter welchen Randbedingungen (Qualität, Performance, Sicherheit, Usability, Rechtliches, Technik). „Die Suche liefert in 95 % der Fälle Ergebnisse in &lt; 2 s.“</li></ul>
<h4>ISO/IEC 25010 – Produktqualität</h4>
<p>Version 2011 (8 Merkmale): Funktionale Eignung, Leistungseffizienz (Performance), Kompatibilität, Benutzbarkeit, Zuverlässigkeit, Sicherheit (Security), Wartbarkeit, Übertragbarkeit. Version 2023: 9 Merkmale – Benutzbarkeit heißt „Interaktionsfähigkeit“, Übertragbarkeit „Flexibilität“, neu „Safety“ (Betriebssicherheit). Vorgänger: ISO 9126 (Funktionalität, Zuverlässigkeit, Benutzbarkeit, Effizienz, Änderbarkeit, Übertragbarkeit).</p>
<h4>User Stories</h4>
<ul><li>Format: <b>„Als &lt;Rolle&gt; möchte ich &lt;Ziel/Funktion&gt;, damit &lt;Nutzen&gt;.“</b></li>
<li><b>INVEST</b>: Independent, Negotiable, Valuable, Estimable, Small, Testable.</li>
<li><b>Akzeptanzkriterien</b>: prüfbare Bedingungen, oft im Format <b>Gegeben … wenn … dann …</b> (Given–When–Then).</li>
<li>Epic = große Story, die in mehrere Stories zerlegt wird.</li></ul>
<h4>Use Case (Anwendungsfall) – textuell</h4>
<p>Name, Akteur(e), Ziel, Vorbedingung, Auslöser, <b>Standardablauf</b> (nummerierte Schritte), <b>alternative Abläufe/Ausnahmen</b>, Nachbedingung (Erfolg/Fehlschlag).</p>
<h4>Anforderungserhebung</h4>
<ul><li><b>Interview</b>: tiefgehend, Rückfragen möglich – zeitaufwendig, wenige Personen.</li>
<li><b>Fragebogen</b>: viele Personen, anonym, gut auswertbar – keine Rückfragen, geringe Rücklaufquote.</li>
<li><b>Beobachtung</b>: reale Abläufe, implizites Wissen – Beobachtereffekt, aufwendig.</li>
<li><b>Workshop</b>: mehrere Stakeholder gleichzeitig, Konsens – Moderation nötig, Dominanz Einzelner.</li>
<li>Weitere: Dokumentenanalyse, Brainstorming, Prototyping.</li></ul>
<h4>Priorisierung: MoSCoW</h4>
<p><b>M</b>ust have (zwingend), <b>S</b>hould have (wichtig, nicht kritisch), <b>C</b>ould have (wünschenswert), <b>W</b>on't have (this time – bewusst nicht in diesem Release).</p>
<h4>Ist- und Soll-Analyse</h4>
<p>Ist-Analyse: aktuellen Zustand erheben, Schwachstellen erkennen (Medienbrüche, Doppelerfassung, Wartezeiten). Soll-Konzept: Zielzustand mit Lösung der Schwachstellen. Daraus ergeben sich die Anforderungen.</p>
<h4>SMART-Ziele</h4>
<p><b>S</b>pezifisch, <b>M</b>essbar, <b>A</b>kzeptiert/attraktiv (erreichbar), <b>R</b>ealistisch, <b>T</b>erminiert.<br>Schlecht: „Das System soll schnell sein.“ Gut: „Ab 01.03.2027 wird jede Bestellung in max. 3 s gespeichert.“</p>
<p><b>Typische Fallen:</b> Lasten-/Pflichtenheft-Ersteller vertauschen; Performance als funktionale Anforderung einordnen; User Story ohne Nutzen („damit …“); Akzeptanzkriterien nicht prüfbar formuliert.</p>`
  },
  {
    id: "ga1-wirtschaftlichkeit",
    part: "GA1",
    title: "Wirtschaftlichkeit (Make-or-Buy, Nutzwert, Amortisation, TCO)",
    summary: `<h4>Make-or-Buy</h4>
<ul><li><b>Make</b> (Eigenentwicklung): passgenau, Know-how bleibt im Haus, unabhängig – aber hoher Aufwand, Risiko, längere Zeit, eigene Wartung.</li>
<li><b>Buy</b> (Standardsoftware/SaaS): schnell verfügbar, erprobt, Support/Updates, kalkulierbare Kosten – aber Anpassungsaufwand, Abhängigkeit vom Hersteller (Lock-in), evtl. Funktionsüberhang, Lizenzkosten.</li>
<li>Entscheidung quantitativ (Kostenvergleich) <b>und</b> qualitativ (Nutzwertanalyse).</li></ul>
<h4>Nutzwertanalyse</h4>
<ol><li>Kriterien festlegen (z.&nbsp;B. Funktionsumfang, Kosten, Support)</li><li>Gewichtung vergeben (Summe 100 % bzw. 1,0)</li><li>Erfüllungsgrad je Alternative bewerten (z.&nbsp;B. 1–10)</li><li><b>Teilnutzen = Gewicht × Punkte</b>; Nutzwert = Summe der Teilnutzen</li><li>Alternative mit höchstem Nutzwert wählen.</li></ol>
<p>Vorteil: auch nicht-monetäre Kriterien vergleichbar. Nachteil: subjektive Gewichtung.</p>
<h4>Kostenvergleich / Break-even</h4>
<p>Gesamtkosten = Fixkosten + variable Kosten × Menge (bzw. × Monate). <b>Break-even-Punkt</b>: Kosten Alternative 1 = Kosten Alternative 2 → nach x auflösen. Beim Umsatz: Break-even-Menge = Fixkosten / (Preis − variable Stückkosten) (Deckungsbeitrag).</p>
<h4>Amortisationsrechnung (statisch)</h4>
<p><b>Amortisationsdauer = Investition / jährlicher (monatlicher) Rückfluss</b>. Rückfluss = Einsparungen/Mehrerlöse − laufende Kosten. Je kürzer, desto geringer das Risiko. Vergleich mit gewünschter Soll-Amortisationszeit.</p>
<h4>Projektkosten kalkulieren</h4>
<ul><li>Personalkosten = <b>Personentage × Stunden/Tag × Stundensatz</b> (1 PT = 8 h, 1 PM ≈ 20 PT)</li>
<li>Sachkosten: Hardware, Lizenzen, Schulungen, Reisekosten, Räume</li>
<li>Ggf. Gemeinkosten-/Risikozuschlag; Angebot: + Gewinnzuschlag + 19 % USt.</li>
<li>Dauer ≠ Aufwand: Dauer = Aufwand / (Personen × Verfügbarkeit).</li></ul>
<h4>Angebotsvergleich</h4>
<p>Quantitativ (Preis, Rabatt, Skonto, Lieferkosten → Bezugspreis) und qualitativ (Lieferzeit, Support, Referenzen) – oft kombiniert in der Nutzwertanalyse.</p>
<h4>TCO – Total Cost of Ownership</h4>
<p>Alle Kosten über den gesamten Lebenszyklus: <b>direkte</b> (Anschaffung, Lizenzen, Hardware, Implementierung) und <b>indirekte/laufende</b> (Wartung, Support, Schulung, Administration, Energie, Ausfallzeiten, Entsorgung/Migration). Vergleich immer über denselben Zeitraum!</p>
<h4>Lizenzmodelle</h4>
<ul><li><b>Kauf (perpetual)</b>: einmalige Zahlung, unbegrenzte Nutzung, Updates oft nur mit Wartungsvertrag (typisch 15–25 % p.&nbsp;a.).</li>
<li><b>Miete/Subscription/SaaS</b>: laufende Gebühr pro Nutzer/Monat, Updates inklusive, geringe Anfangsinvestition, skalierbar – langfristig ggf. teurer, Zugriff endet mit Vertrag.</li>
<li>Weitere: Named User, Concurrent User (gleichzeitige Nutzer), pro Gerät/Core, Volumenlizenz, Open Source (GPL = Copyleft, MIT/Apache = permissiv), Freemium.</li></ul>
<h4>Wartungsvertrag &amp; SLA</h4>
<ul><li>Wartungsvertrag: Fehlerbehebung, Updates, Hotline; Pflege vs. Weiterentwicklung.</li>
<li><b>SLA (Service Level Agreement)</b>: vertraglich messbare Dienstgüte: <b>Verfügbarkeit</b> (z.&nbsp;B. 99,9 %), <b>Reaktionszeit</b>, <b>Wiederherstellungszeit</b>, Servicezeiten (z.&nbsp;B. Mo–Fr 8–18 Uhr), Supportkanäle, Eskalation, <b>Vertragsstrafen/Pönalen</b>, Reporting.</li>
<li>Ausfallzeit = (1 − Verfügbarkeit) × Betrachtungszeitraum. 99,9 % pro Jahr ≈ 8,76 h.</li></ul>
<p><b>Typische Fallen:</b> Zeiträume nicht vereinheitlicht (Monat vs. Jahr); laufende Kosten beim Rückfluss vergessen; Gewichte summieren nicht auf 100 %; Aufwand (PT) mit Dauer (Kalendertage) verwechselt.</p>`
  },
  {
    id: "ga1-qualitaet",
    part: "GA1",
    title: "Qualitätssicherung & Softwaretest",
    summary: `<h4>Teststufen (V-Modell)</h4>
<ul><li><b>Komponenten-/Modul-/Unit-Test</b>: einzelne Klasse/Methode isoliert, Entwickler, automatisiert (JUnit), Abhängigkeiten werden gemockt.</li>
<li><b>Integrationstest</b>: Zusammenspiel/Schnittstellen der Komponenten (Top-down, Bottom-up, Big Bang).</li>
<li><b>Systemtest</b>: Gesamtsystem gegen funktionale und nicht-funktionale Anforderungen (Pflichtenheft) in produktionsnaher Testumgebung.</li>
<li><b>Abnahmetest</b>: durch den Kunden/Fachbereich gegen Lastenheft/Abnahmekriterien → <b>Abnahmeprotokoll</b> (Datum, Teilnehmer, geprüfte Punkte, Mängel mit Klassifizierung, Fristen, Ergebnis: abgenommen / mit Mängeln / verweigert, Unterschriften). Rechtsfolge: Gefahrübergang, Beginn der Gewährleistung, Fälligkeit der Vergütung.</li></ul>
<h4>Black-Box-Verfahren (Spezifikation, Code unbekannt)</h4>
<ul><li><b>Äquivalenzklassen</b>: Eingabebereiche, die gleich behandelt werden → je Klasse ein Repräsentant; gültige und ungültige Klassen.</li>
<li><b>Grenzwertanalyse</b>: Werte an und direkt neben den Klassengrenzen (z.&nbsp;B. gültig 18–67 → 17, 18, 67, 68), weil dort häufig Fehler (&lt; vs. &lt;=) entstehen.</li>
<li><b>Entscheidungstabelle</b>: Bedingungen × Aktionen; n binäre Bedingungen → <b>2<sup>n</sup> Regeln</b>, ggf. zusammenfassen („–“ = irrelevant).</li>
<li>Weitere: Zustandsübergangstest, Use-Case-Test.</li></ul>
<h4>White-Box-Verfahren (Code bekannt)</h4>
<ul><li><b>C0 – Anweisungsüberdeckung</b>: jede Anweisung mind. einmal ausgeführt.</li>
<li><b>C1 – Zweigüberdeckung</b>: jeder Zweig (jede Entscheidung true und false) mind. einmal; C1 schließt C0 ein.</li>
<li><b>C2 – Pfadüberdeckung</b>: alle Pfade (bei Schleifen praktisch unmöglich); 3 unabhängige if hintereinander → 2³ = 8 Pfade.</li>
<li>Überdeckungsgrad = ausgeführte / alle Anweisungen (Zweige) × 100 %.</li>
<li><b>McCabe (zyklomatische Komplexität)</b> = Anzahl Entscheidungen + 1 (bzw. E − N + 2) = Mindestanzahl Testfälle für Basispfade.</li></ul>
<h4>Testfälle formulieren</h4>
<p>Testfalltabelle: <b>Nr. | Beschreibung/Äquivalenzklasse | Vorbedingung | Eingabe | erwartetes Ergebnis</b> (| tatsächliches Ergebnis | Status). Erwartetes Ergebnis immer <i>vor</i> der Ausführung festlegen!</p>
<h4>Weitere Testarten &amp; Techniken</h4>
<ul><li><b>Regressionstest</b>: nach Änderungen bestehende Funktionen erneut testen (automatisiert, CI).</li>
<li><b>Last-/Performance-/Stresstest</b>: Antwortzeiten bei erwarteter Last / über Last hinaus bis zum Ausfall (Tools: JMeter, k6).</li>
<li><b>TDD</b>: Red (Test schreiben, schlägt fehl) → Green (minimaler Code) → Refactor.</li>
<li><b>Mocking</b>: Abhängigkeiten (DB, Webservice) durch Attrappen ersetzen (Mockito) → isoliert, schnell, deterministisch. Stub = feste Antworten, Mock = prüft zusätzlich Aufrufe.</li></ul>
<h4>Statische QS</h4>
<p><b>Code-Review</b> (Peer-Review, Walkthrough, Inspektion, Pull-Request-Review), <b>statische Analyse</b> (SonarQube, Linter: Code Smells, Duplikate, Sicherheitslücken – ohne Ausführung). <b>Clean Code</b>: sprechende Namen, kleine Funktionen, DRY, KISS, SOLID, keine magischen Zahlen. <b>Metriken</b>: LOC, zyklomatische Komplexität, Testabdeckung, Fehlerdichte (Fehler/KLOC), Kopplung.</p>
<h4>Qualitätssicherung vs. Qualitätsmanagement</h4>
<p><b>QM</b> = übergeordnet: Qualitätspolitik, -planung, -lenkung, -sicherung, -verbesserung (ISO 9001, PDCA). <b>QS</b> = Teil des QM: konkrete analytische (Tests, Reviews) und konstruktive (Richtlinien, Vorgehensmodell, Schulung) Maßnahmen.</p>
<h4>Fehlerklassen</h4>
<p>Kritisch/blockierend (Betrieb unmöglich) – schwer (wesentliche Funktion eingeschränkt, Workaround schwierig) – mittel – leicht/kosmetisch. Begriffe: <b>Fehlhandlung</b> (Irrtum) → <b>Fehlerzustand</b> (Defekt im Code) → <b>Fehlerwirkung</b> (Ausfall, sichtbar).</p>
<p><b>Typische Fallen:</b> C0 mit C1 verwechseln (ein if ohne else braucht für C1 auch den false-Fall); Grenzwerte nur innen testen; Abnahmetest durch Entwickler.</p>`
  },
  {
    id: "ga1-ergonomie",
    part: "GA1",
    title: "Software-Ergonomie & Barrierefreiheit",
    summary: `<h4>DIN EN ISO 9241-110:2020 – Interaktionsprinzipien</h4>
<ul><li><b>Aufgabenangemessenheit</b>: unterstützt die Aufgabe ohne unnötige Schritte (sinnvolle Vorbelegungen, nur benötigte Felder).</li>
<li><b>Selbstbeschreibungsfähigkeit</b>: Benutzer weiß jederzeit, wo er ist und was er tun kann (Statusanzeige, Tooltips, Beschriftungen, Pflichtfeld-Markierung).</li>
<li><b>Erwartungskonformität</b>: konsistent und vorhersehbar, entspricht Konventionen (Logo oben links → Startseite, gleiche Buttons an gleicher Stelle).</li>
<li><b>Erlernbarkeit</b> (alt: <i>Lernförderlichkeit</i>): unterstützt Entdecken und Lernen (Hilfe, Tutorials, Undo zum Ausprobieren).</li>
<li><b>Steuerbarkeit</b>: Benutzer bestimmt Ablauf, Tempo, Richtung (Abbrechen, Zurück, Pausieren, Tastaturkürzel, Anpassungen – Teile der früheren <i>Individualisierbarkeit</i>).</li>
<li><b>Robustheit gegen Benutzungsfehler</b> (alt: <i>Fehlertoleranz</i>): Fehler vermeiden (Auswahllisten, Eingabeprüfung), tolerieren, verständlich melden und Korrektur ermöglichen (Undo, Bestätigungsdialog).</li>
<li><b>Benutzerbindung</b> (neu 2020): motivierend, vertrauenswürdig, ansprechend gestaltet → Nutzer bleibt gern dabei.</li></ul>
<h4>DIN EN ISO 9241-11 – Gebrauchstauglichkeit (Usability)</h4>
<p>Ausmaß, in dem ein Produkt durch bestimmte Benutzer in einem bestimmten Nutzungskontext genutzt werden kann, um bestimmte Ziele <b>effektiv</b> (Ziel vollständig/genau erreicht), <b>effizient</b> (Aufwand: Zeit, Klicks im Verhältnis zum Ergebnis) und <b>zufriedenstellend</b> (positive Einstellung, keine Beeinträchtigung) zu erreichen.</p>
<h4>Barrierefreiheit</h4>
<ul><li><b>WCAG 2.2</b> (W3C, 2023): 4 Prinzipien <b>POUR</b> – wahrnehmbar, bedienbar, verständlich, robust. Konformitätsstufen A, <b>AA</b> (gesetzlich gefordert), AAA. Neu in 2.2 u.&nbsp;a.: sichtbarer, nicht verdeckter Fokus, Zielgröße mind. 24×24 CSS-Pixel, Alternativen zu Ziehbewegungen, barrierefreie Authentifizierung (keine Rätsel/Abtippen), konsistente Hilfe, keine redundante Eingabe.</li>
<li><b>Kontrast</b> (AA): normaler Text mind. <b>4,5:1</b>, großer Text (≥ 18 pt bzw. 14 pt fett) und UI-Komponenten/Grafiken mind. <b>3:1</b>; AAA: 7:1.</li>
<li><b>BITV 2.0</b>: Verordnung für <b>öffentliche Stellen des Bundes</b> (Websites, Apps, Intranet), verweist auf EN 301 549 (≈ WCAG AA), Erklärung zur Barrierefreiheit + Feedback-Mechanismus.</li>
<li><b>Barrierefreiheitsstärkungsgesetz (BFSG)</b>: setzt den European Accessibility Act um, gilt seit <b>28.06.2025</b> auch für <b>private Unternehmen</b> bei bestimmten Produkten und Dienstleistungen (z.&nbsp;B. Online-Shops/E-Commerce, Bankdienstleistungen, E-Books, Telekommunikation, Personenbeförderung). Ausnahme: Kleinstunternehmen (&lt; 10 Beschäftigte und ≤ 2 Mio. € Umsatz) bei Dienstleistungen. Marktüberwachung, Bußgelder möglich.</li>
<li>Maßnahmen: Alternativtexte, semantisches HTML, Tastaturbedienbarkeit, Labels an Formularfeldern, nicht nur Farbe als Informationsträger, skalierbare Schrift, Untertitel, ARIA nur ergänzend.</li></ul>
<h4>Mockup – Wireframe – Prototyp</h4>
<ul><li><b>Wireframe</b>: grobes Layout/Struktur (Low-Fidelity, Graustufen, Platzhalter), früh und billig.</li>
<li><b>Mockup</b>: statischer, visuell detaillierter Entwurf (Farben, Schriften, Bilder), nicht klickbar.</li>
<li><b>Prototyp</b>: interaktiv/klickbar (High-Fidelity, z.&nbsp;B. Figma); horizontal (viele Funktionen, oberflächlich) vs. vertikal (eine Funktion durch alle Schichten); Wegwerf- vs. evolutionärer Prototyp.</li></ul>
<h4>Usability-Test</h4>
<p>Echte Nutzer der Zielgruppe bearbeiten realistische Aufgaben, Beobachtung (Thinking Aloud, Eye-Tracking, Screen-Recording), Messung (Erfolgsquote = Effektivität, Zeit/Klicks = Effizienz, Fragebogen wie SUS = Zufriedenstellung), Auswertung → Verbesserungen. 5 Testpersonen finden bereits viele Probleme. Weitere Methoden: heuristische Evaluation (Experten), A/B-Test, Cognitive Walkthrough.</p>
<h4>Formulargestaltung &amp; Responsive Design</h4>
<ul><li>Labels über/vor dem Feld, logische Gruppierung und Tab-Reihenfolge, Pflichtfelder kennzeichnen, passende Eingabeelemente (Dropdown, Datepicker), Inline-Validierung mit konkreten Fehlermeldungen am Feld, sinnvolle Vorbelegung, Eingabeformat-Hinweis.</li>
<li><b>Responsive Design</b>: Layout passt sich an Bildschirmgrößen an (flexible Grids, relative Einheiten, Media Queries, Breakpoints), <b>Mobile First</b>, Touch-Ziele groß genug.</li>
<li>Farbe: begrenzte Palette, Bedeutung konsistent (Rot = Fehler), Rot-Grün-Schwäche (ca. 8 % der Männer) beachten → zusätzlich Icons/Text.</li></ul>
<p><b>Typische Fallen:</b> Erwartungskonformität vs. Selbstbeschreibungsfähigkeit verwechseln; alte Bezeichnungen nicht kennen; BITV (öffentlich) vs. BFSG (privatwirtschaftlich) vertauschen; Mockup ≠ klickbarer Prototyp.</p>`
  }
);

// ===================== ga1-projektmanagement =====================
(function () {
  const NP1_CTX = `Die <b>WebSolutions GmbH</b> entwickelt für die Stadtwerke Lindau ein Kundenportal. Als Auszubildende/r sollen Sie die Terminplanung übernehmen. Der Projektleiter hat folgende Vorgangsliste erstellt (Dauer in Arbeitstagen):
<table><tr><th>Vorgang</th><th>Beschreibung</th><th>Dauer</th><th>Vorgänger</th></tr>
<tr><td>A</td><td>Anforderungsanalyse</td><td>3</td><td>–</td></tr>
<tr><td>B</td><td>Datenbankentwurf</td><td>4</td><td>A</td></tr>
<tr><td>C</td><td>GUI-Entwurf</td><td>2</td><td>A</td></tr>
<tr><td>D</td><td>Backend implementieren</td><td>6</td><td>B</td></tr>
<tr><td>E</td><td>Frontend implementieren</td><td>5</td><td>C</td></tr>
<tr><td>F</td><td>Integrationstest</td><td>3</td><td>D, E</td></tr>
<tr><td>G</td><td>Schulungsunterlagen erstellen</td><td>2</td><td>E</td></tr>
<tr><td>H</td><td>Abnahme</td><td>1</td><td>F, G</td></tr></table>`;
  const NP1_SOL = `<table><tr><th>Vorgang</th><th>Dauer</th><th>FAZ</th><th>FEZ</th><th>SAZ</th><th>SEZ</th><th>GP</th><th>FP</th></tr>
<tr><td>A</td><td>3</td><td>0</td><td>3</td><td>0</td><td>3</td><td>0</td><td>0</td></tr>
<tr><td>B</td><td>4</td><td>3</td><td>7</td><td>3</td><td>7</td><td>0</td><td>0</td></tr>
<tr><td>C</td><td>2</td><td>3</td><td>5</td><td>6</td><td>8</td><td>3</td><td>0</td></tr>
<tr><td>D</td><td>6</td><td>7</td><td>13</td><td>7</td><td>13</td><td>0</td><td>0</td></tr>
<tr><td>E</td><td>5</td><td>5</td><td>10</td><td>8</td><td>13</td><td>3</td><td>0</td></tr>
<tr><td>F</td><td>3</td><td>13</td><td>16</td><td>13</td><td>16</td><td>0</td><td>0</td></tr>
<tr><td>G</td><td>2</td><td>10</td><td>12</td><td>14</td><td>16</td><td>4</td><td>4</td></tr>
<tr><td>H</td><td>1</td><td>16</td><td>17</td><td>16</td><td>17</td><td>0</td><td>0</td></tr></table>
Projektdauer: <b>17 Arbeitstage</b>, kritischer Pfad: <b>A → B → D → F → H</b>.`;

  const NP2_CTX = `Die <b>IT-Systemhaus Brandt KG</b> führt bei einer Spedition eine neue Tourenplanungssoftware ein. Folgende Vorgänge (Dauer in Tagen) wurden geplant:
<table><tr><th>Vorgang</th><th>Beschreibung</th><th>Dauer</th><th>Vorgänger</th></tr>
<tr><td>A</td><td>Kick-off</td><td>1</td><td>–</td></tr>
<tr><td>B</td><td>Ist-Analyse</td><td>3</td><td>A</td></tr>
<tr><td>C</td><td>Soll-Konzept</td><td>2</td><td>B</td></tr>
<tr><td>D</td><td>Hardwarebeschaffung</td><td>5</td><td>A</td></tr>
<tr><td>E</td><td>Softwareanpassung</td><td>8</td><td>C</td></tr>
<tr><td>F</td><td>Installation Server</td><td>2</td><td>D</td></tr>
<tr><td>G</td><td>Systemtest</td><td>3</td><td>E, F</td></tr>
<tr><td>H</td><td>Benutzerdokumentation</td><td>4</td><td>C</td></tr>
<tr><td>I</td><td>Einführung/Schulung</td><td>2</td><td>G, H</td></tr></table>`;
  const NP2_SOL = `<table><tr><th>Vorgang</th><th>Dauer</th><th>FAZ</th><th>FEZ</th><th>SAZ</th><th>SEZ</th><th>GP</th><th>FP</th></tr>
<tr><td>A</td><td>1</td><td>0</td><td>1</td><td>0</td><td>1</td><td>0</td><td>0</td></tr>
<tr><td>B</td><td>3</td><td>1</td><td>4</td><td>1</td><td>4</td><td>0</td><td>0</td></tr>
<tr><td>C</td><td>2</td><td>4</td><td>6</td><td>4</td><td>6</td><td>0</td><td>0</td></tr>
<tr><td>D</td><td>5</td><td>1</td><td>6</td><td>7</td><td>12</td><td>6</td><td>0</td></tr>
<tr><td>E</td><td>8</td><td>6</td><td>14</td><td>6</td><td>14</td><td>0</td><td>0</td></tr>
<tr><td>F</td><td>2</td><td>6</td><td>8</td><td>12</td><td>14</td><td>6</td><td>6</td></tr>
<tr><td>G</td><td>3</td><td>14</td><td>17</td><td>14</td><td>17</td><td>0</td><td>0</td></tr>
<tr><td>H</td><td>4</td><td>6</td><td>10</td><td>13</td><td>17</td><td>7</td><td>7</td></tr>
<tr><td>I</td><td>2</td><td>17</td><td>19</td><td>17</td><td>19</td><td>0</td><td>0</td></tr></table>`;

  AP2.questions.push(
    {
      id: "ga1-projektmanagement-001", part: "GA1", topic: "ga1-projektmanagement", type: "mc", difficulty: 1, points: 2,
      question: "Welches der folgenden Vorhaben ist <b>kein</b> Projekt im Sinne der DIN 69901?",
      options: [
        "Einführung eines neuen ERP-Systems bis zum 31.03.2027 mit einem Budget von 250.000 €",
        "Die tägliche Datensicherung der Server durch die IT-Abteilung",
        "Entwicklung einer App für die Landesgartenschau 2027",
        "Migration aller Kundendaten in eine Cloud-Datenbank innerhalb von sechs Monaten"
      ],
      correct: [1],
      solution: "Die tägliche Datensicherung ist eine <b>Routinetätigkeit</b> (Linienaufgabe): Sie wiederholt sich ständig, hat kein definiertes Ende und ist nicht einmalig.",
      explanation: "Projekte sind einmalig, zeitlich begrenzt, haben ein definiertes Ziel, begrenzte Ressourcen und eine projektspezifische Organisation. Wiederkehrende Betriebsaufgaben erfüllen diese Merkmale nicht.",
      tags: ["Projektmerkmale"]
    },
    {
      id: "ga1-projektmanagement-002", part: "GA1", topic: "ga1-projektmanagement", type: "multi", difficulty: 1, points: 3,
      question: "Welche der folgenden Aussagen beschreiben typische <b>Merkmale eines Projekts</b>? (Mehrfachauswahl)",
      options: [
        "Einmaligkeit der Bedingungen in ihrer Gesamtheit",
        "Zeitliche Begrenzung mit definiertem Anfang und Ende",
        "Unbegrenzte Ressourcen, um das Ziel sicher zu erreichen",
        "Projektspezifische Organisation",
        "Dauerhafte Wiederholung gleicher Arbeitsschritte",
        "Konkrete Zielvorgabe"
      ],
      correct: [0, 1, 3, 5],
      solution: "Richtig: Einmaligkeit, zeitliche Begrenzung, projektspezifische Organisation, Zielvorgabe. Falsch: Ressourcen sind in Projekten gerade <b>begrenzt</b>; dauerhafte Wiederholung kennzeichnet Routineprozesse.",
      tags: ["Projektmerkmale"]
    },
    {
      id: "ga1-projektmanagement-003", part: "GA1", topic: "ga1-projektmanagement", type: "mc", difficulty: 2, points: 3,
      context: "Der Kunde Mode-Huber e.K. möchte, dass sein neuer Webshop vier Wochen früher als vereinbart online geht, weil er das Weihnachtsgeschäft mitnehmen möchte. Der Funktionsumfang soll gleich bleiben.",
      question: "Welche Auswirkung hat dieser Wunsch gemäß dem <b>magischen Dreieck</b> des Projektmanagements am ehesten?",
      options: [
        "Keine – Zeit, Kosten und Qualität sind voneinander unabhängig.",
        "Bei gleichem Umfang und kürzerer Zeit steigen die Kosten (z. B. zusätzliches Personal, Überstunden) oder die Qualität sinkt.",
        "Die Kosten sinken, weil das Projekt kürzer dauert.",
        "Die Qualität steigt automatisch, da das Team fokussierter arbeitet."
      ],
      correct: [1],
      solution: "Das magische Dreieck verknüpft <b>Zeit, Kosten und Qualität/Leistung</b>. Wird eine Größe verändert (hier: Zeit verkürzt), müssen die anderen angepasst werden: mehr Ressourcen (höhere Kosten) oder Abstriche bei Qualität/Umfang.",
      explanation: "Typischer Fehler: „kürzer = billiger“. Eine Verkürzung bei gleichem Umfang erfordert meist zusätzliche Ressourcen (Brooks: zusätzliche Personen verursachen außerdem Einarbeitungs- und Kommunikationsaufwand).",
      tags: ["magisches Dreieck"]
    },
    {
      id: "ga1-projektmanagement-004", part: "GA1", topic: "ga1-projektmanagement", type: "text", difficulty: 2, points: 6,
      context: "Die Agentur PixelWerk GmbH soll für ein Start-up eine Fitness-App entwickeln. Der Kunde hat nur eine grobe Vorstellung vom Funktionsumfang und möchte regelmäßig Zwischenstände sehen.",
      question: "Ihr Teamleiter überlegt, ob das Projekt nach dem <b>Wasserfallmodell</b> oder mit <b>Scrum</b> durchgeführt werden soll. Nennen Sie je <b>zwei Vorteile</b> beider Vorgehensweisen und begründen Sie, welche Vorgehensweise Sie in dieser Situation empfehlen.",
      solution: `<b>Wasserfallmodell – Vorteile</b> (je 1 P.):<ul><li>Klare, sequenzielle Struktur mit eindeutigen Phasen und Meilensteinen → gut plan- und kontrollierbar</li><li>Umfangreiche Dokumentation, Kosten und Termine früh festlegbar (Festpreis möglich)</li></ul>
<b>Scrum – Vorteile</b> (je 1 P.):<ul><li>Flexibel bei sich ändernden Anforderungen (Product Backlog kann jederzeit angepasst werden)</li><li>Früh lauffähige Inkremente, regelmäßiges Kundenfeedback im Sprint Review → geringeres Risiko, am Bedarf vorbei zu entwickeln</li><li>Kontinuierliche Verbesserung durch Retrospektiven, hohe Transparenz</li></ul>
<b>Empfehlung</b> (2 P.): <b>Scrum</b>, da die Anforderungen noch unklar sind und sich voraussichtlich ändern werden und der Kunde regelmäßig Zwischenergebnisse sehen will. Beim Wasserfallmodell müssten die Anforderungen zu Beginn vollständig feststehen; Änderungen wären teuer, Fehler würden erst spät erkannt.`,
      explanation: "Wichtig ist der Bezug zur Ausgangssituation (unklare Anforderungen, Wunsch nach Zwischenständen). Eine Empfehlung ohne Begründung gibt keine Punkte.",
      keywords: ["planbar|plan|struktur", "dokumentation", "festpreis|kosten früh|termine", "flexib|änderung", "inkrement|zwischenstand|lauffähig", "feedback|review", "anforderungen|unklar", "scrum"],
      tags: ["Vorgehensmodelle", "Scrum", "Wasserfall"]
    },
    {
      id: "ga1-projektmanagement-005", part: "GA1", topic: "ga1-projektmanagement", type: "text", difficulty: 2, points: 6,
      question: "Erläutern Sie das Grundprinzip des <b>V-Modells</b> und ordnen Sie den Entwicklungsphasen <i>Anforderungsdefinition</i>, <i>Systementwurf/Architektur</i> und <i>Modulentwurf (Feinentwurf)</i> jeweils die zugehörige Teststufe zu.",
      solution: `<b>Grundprinzip</b> (3 P.): Das V-Modell erweitert das Wasserfallmodell. Auf dem linken Ast wird das System schrittweise spezifiziert und verfeinert (von den Anforderungen bis zum Modulentwurf), unten erfolgt die Implementierung. Auf dem rechten Ast wird integriert und getestet. Jeder Spezifikationsphase steht eine <b>Teststufe gegenüber</b>, die gegen die Ergebnisse dieser Phase prüft (Verifikation/Validierung). Testfälle können daher schon in der jeweiligen Entwurfsphase geplant werden.<br>
<b>Zuordnung</b> (je 1 P.):<ul><li>Anforderungsdefinition ↔ <b>Abnahmetest</b> (ggf. Systemtest)</li><li>Systementwurf/Architektur ↔ <b>Systemtest / Integrationstest</b></li><li>Modulentwurf ↔ <b>Modultest (Unit-Test)</b></li></ul>`,
      explanation: "Häufig wird vergessen, dass das V-Modell – wie der Wasserfall – sequenziell ist. Der Vorteil liegt in der frühen Testplanung und der klaren Zuordnung von Spezifikation zu Prüfung.",
      keywords: ["entwicklung|spezifikation|linker", "test|prüf|rechter", "gegenüber|zugeordnet|jede phase", "abnahmetest|abnahme", "systemtest|integrationstest", "modultest|unit|komponententest", "verifikation|validierung|früh"],
      tags: ["V-Modell", "Teststufen"]
    },
    {
      id: "ga1-projektmanagement-006", part: "GA1", topic: "ga1-projektmanagement", type: "mc", difficulty: 2, points: 2,
      question: "Welches Merkmal kennzeichnet das <b>Spiralmodell</b> nach Boehm besonders?",
      options: [
        "Es verzichtet vollständig auf Dokumentation.",
        "In jedem Zyklus wird eine explizite Risikoanalyse durchgeführt, häufig unterstützt durch Prototypen.",
        "Jede Phase wird genau einmal durchlaufen; Rücksprünge sind verboten.",
        "Es arbeitet mit festen Sprints von maximal einem Monat."
      ],
      correct: [1],
      solution: "Das Spiralmodell ist ein <b>iteratives, risikogetriebenes</b> Modell. Jede Windung durchläuft vier Quadranten: Ziele/Alternativen festlegen → <b>Risiken analysieren</b> (Prototyp) → entwickeln und testen → nächsten Zyklus planen.",
      explanation: "Feste Sprints gehören zu Scrum, das strikt sequenzielle Vorgehen zum Wasserfallmodell.",
      tags: ["Spiralmodell"]
    },
    {
      id: "ga1-projektmanagement-007", part: "GA1", topic: "ga1-projektmanagement", type: "order", difficulty: 1, points: 3,
      question: "Bringen Sie die Ereignisse eines <b>Scrum-Sprints</b> in die richtige zeitliche Reihenfolge.",
      items: ["Sprint Planning", "Daily Scrum (täglich während der Entwicklungsarbeit)", "Sprint Review", "Sprint Retrospective", "Sprint Planning des nächsten Sprints"],
      solution: "Sprint Planning → Daily Scrums → Sprint Review (Inkrement mit Stakeholdern prüfen) → Sprint Retrospective (Zusammenarbeit/Prozess verbessern) → nächster Sprint beginnt direkt mit dem Sprint Planning.",
      explanation: "Häufige Verwechslung: Die Retrospektive folgt auf das Review und ist das letzte Event des Sprints. Das Backlog Refinement ist kein offizielles Event, sondern eine fortlaufende Tätigkeit.",
      tags: ["Scrum"]
    },
    {
      id: "ga1-projektmanagement-008", part: "GA1", topic: "ga1-projektmanagement", type: "multi", difficulty: 2, points: 4,
      question: "Welche Aussagen zu den <b>Timeboxes</b> in Scrum (Scrum Guide 2020, Sprintlänge 1 Monat) sind korrekt?",
      options: [
        "Das Daily Scrum dauert höchstens 15 Minuten.",
        "Das Sprint Planning dauert höchstens 8 Stunden.",
        "Die Sprint Retrospective dauert höchstens 1 Stunde.",
        "Ein Sprint dauert höchstens einen Monat.",
        "Das Sprint Review dauert höchstens 4 Stunden.",
        "Ein Sprint kann verlängert werden, wenn das Sprint-Ziel nicht erreicht wurde."
      ],
      correct: [0, 1, 3, 4],
      solution: "Korrekt: Daily Scrum 15 min, Sprint Planning max. 8 h, Sprint max. 1 Monat, Sprint Review max. 4 h. Falsch: Die Retrospektive ist auf max. <b>3 h</b> begrenzt; ein Sprint wird <b>nicht verlängert</b> (fixe Timebox) – nicht erledigte Einträge gehen zurück ins Product Backlog.",
      tags: ["Scrum", "Timebox"]
    },
    {
      id: "ga1-projektmanagement-009", part: "GA1", topic: "ga1-projektmanagement", type: "mc", difficulty: 1, points: 2,
      question: "Wer ist in Scrum für die <b>Pflege und Priorisierung des Product Backlogs</b> verantwortlich?",
      options: ["Scrum Master", "Developers", "Product Owner", "Der Kunde direkt"],
      correct: [2],
      solution: "Der <b>Product Owner</b> ist für die Wertmaximierung des Produkts verantwortlich und damit für Inhalt, Reihenfolge und Transparenz des Product Backlogs.",
      explanation: "Der Scrum Master ist für die Effektivität des Teams und die Einhaltung von Scrum verantwortlich, die Developers für das Sprint Backlog und das Inkrement.",
      tags: ["Scrum", "Rollen"]
    },
    {
      id: "ga1-projektmanagement-010", part: "GA1", topic: "ga1-projektmanagement", type: "text", difficulty: 2, points: 5,
      context: "Im Scrum-Team der FinTec AG kommt es regelmäßig zu Diskussionen, ob eine User Story im Sprint Review als „fertig“ präsentiert werden darf.",
      question: "Erläutern Sie den Begriff <b>Definition of Done</b> und nennen Sie <b>drei</b> konkrete Kriterien, die darin enthalten sein könnten.",
      solution: `<b>Erläuterung</b> (2 P.): Die Definition of Done (DoD) ist eine vom Scrum Team gemeinsam festgelegte, verbindliche <b>Checkliste von Qualitätskriterien</b>, die jedes Product-Backlog-Item erfüllen muss, damit es als fertig gilt und Teil des Inkrements wird. Sie schafft ein gemeinsames, transparentes Verständnis von „fertig“ (Commitment des Inkrements).<br>
<b>Beispiele</b> (je 1 P.):<ul><li>Code ist implementiert und per Code-Review (Vier-Augen-Prinzip) geprüft</li><li>Unit-Tests geschrieben, alle Tests grün, Testabdeckung ≥ 80 %</li><li>Akzeptanzkriterien der User Story erfüllt und vom PO geprüft</li><li>Code ist in den Hauptzweig integriert, CI-Build erfolgreich</li><li>Dokumentation (z. B. API-Doku, Benutzerhandbuch) aktualisiert</li><li>Auf der Testumgebung deployt, keine bekannten kritischen Fehler</li></ul>`,
      explanation: "Abgrenzung: Akzeptanzkriterien gelten für <i>eine</i> User Story, die DoD gilt für <i>alle</i> Einträge gleichermaßen.",
      keywords: ["gemeinsam|team", "kriterien|checkliste", "fertig|done", "qualität", "test", "review|vier-augen", "akzeptanzkriterien", "dokumentation|integriert|deploy"],
      tags: ["Scrum", "Definition of Done"]
    },
    {
      id: "ga1-projektmanagement-011", part: "GA1", topic: "ga1-projektmanagement", type: "mc", difficulty: 2, points: 2,
      context: "Auf dem Kanban-Board des Supportteams steht über der Spalte „In Bearbeitung“ die Angabe „WIP 3“. Aktuell befinden sich drei Tickets in dieser Spalte.",
      question: "Was bedeutet das für ein Teammitglied, das gerade ein Ticket fertiggestellt und nach „Erledigt“ verschoben hat?",
      options: [
        "Es darf nun beliebig viele neue Tickets nach „In Bearbeitung“ ziehen.",
        "Es darf genau ein neues Ticket nach „In Bearbeitung“ ziehen, da nun wieder ein Platz frei ist.",
        "Es muss warten, bis der Sprint beendet ist.",
        "Es muss den Product Owner um Erlaubnis fragen."
      ],
      correct: [1],
      solution: "Das <b>WIP-Limit</b> (Work in Progress) begrenzt die Anzahl gleichzeitig bearbeiteter Aufgaben in einer Spalte auf 3. Nach Abschluss eines Tickets sind nur noch zwei in Bearbeitung, also darf genau ein neues gezogen werden (<b>Pull-Prinzip</b>).",
      explanation: "Kanban kennt keine Sprints und keinen Product Owner als Pflichtrolle. Ziel des WIP-Limits: weniger Multitasking, Engpässe sichtbar machen, kürzere Durchlaufzeiten.",
      tags: ["Kanban", "WIP"]
    },
    {
      id: "ga1-projektmanagement-012", part: "GA1", topic: "ga1-projektmanagement", type: "numeric", difficulty: 2, points: 4,
      context: NP1_CTX,
      question: "Berechnen Sie die <b>Gesamtdauer des Projekts</b> in Arbeitstagen (Vorwärtsrechnung, Start bei Tag 0).",
      answer: 17, tolerance: 0, unit: "Tage",
      solution: `Vorwärtsrechnung (FEZ = FAZ + Dauer, FAZ = max. FEZ der Vorgänger):<br>A 0–3 · B 3–7 · C 3–5 · D 7–13 · E 5–10 · F: max(13; 10) = 13 → 16 · G 10–12 · H: max(16; 12) = 16 → <b>17</b>.<br>${NP1_SOL}`,
      explanation: "Typischer Fehler: bei F das Minimum statt des Maximums der Vorgänger-FEZ verwenden (10 statt 13).",
      tags: ["Netzplan"]
    },
    {
      id: "ga1-projektmanagement-013", part: "GA1", topic: "ga1-projektmanagement", type: "numeric", difficulty: 2, points: 4,
      context: NP1_CTX,
      question: "Berechnen Sie den <b>Gesamtpuffer</b> des Vorgangs <b>E (Frontend implementieren)</b> in Tagen.",
      answer: 3, tolerance: 0, unit: "Tage",
      solution: `Rückwärtsrechnung: SEZ(E) = min(SAZ F = 13; SAZ G = 14) = 13 → SAZ(E) = 13 − 5 = 8.<br>GP(E) = SAZ − FAZ = 8 − 5 = <b>3 Tage</b>.<br>Der <b>freie Puffer</b> von E ist dagegen 0: FP(E) = min(FAZ F = 13; FAZ G = 10) − FEZ(E) 10 = 0, weil G direkt nach E beginnen muss, um seinen frühesten Anfangstermin zu halten.<br>${NP1_SOL}`,
      explanation: "GP = Verschiebung ohne Projektverzug; FP = Verschiebung ohne Verzug des frühesten Starts eines Nachfolgers. Bei mehreren Nachfolgern immer das Minimum nehmen.",
      tags: ["Netzplan", "Puffer"]
    },
    {
      id: "ga1-projektmanagement-014", part: "GA1", topic: "ga1-projektmanagement", type: "text", difficulty: 2, points: 5,
      context: NP1_CTX,
      question: "Nennen Sie den <b>kritischen Pfad</b> und erläutern Sie, welche Bedeutung er für das Projektmanagement hat. Erklären Sie außerdem, warum Vorgang G einen freien Puffer von 4 Tagen besitzt.",
      solution: `<b>Kritischer Pfad</b> (2 P.): <b>A → B → D → F → H</b> (alle Vorgänge mit Gesamtpuffer 0, Dauer 17 Tage).<br>
<b>Bedeutung</b> (2 P.): Jede Verzögerung eines Vorgangs auf dem kritischen Pfad verzögert unmittelbar den Projektendtermin. Diese Vorgänge müssen daher besonders überwacht werden; Maßnahmen zur Projektverkürzung (zusätzliche Ressourcen) sind nur hier wirksam.<br>
<b>Freier Puffer G</b> (1 P.): G endet frühestens an Tag 12, der Nachfolger H kann aber frühestens an Tag 16 beginnen (wegen F). FP = FAZ(H) − FEZ(G) = 16 − 12 = 4 Tage.<br>${NP1_SOL}`,
      keywords: ["a → b → d → f → h|a-b-d-f-h|a, b, d, f, h|abdfh|a b d f h|a->b->d->f->h", "puffer 0|gesamtpuffer|kein puffer|gp = 0", "verzögerung|verzug", "endtermin|projektende|projektdauer", "überwach|kontroll", "16", "12"],
      tags: ["Netzplan", "kritischer Pfad"]
    },
    {
      id: "ga1-projektmanagement-015", part: "GA1", topic: "ga1-projektmanagement", type: "code", difficulty: 3, points: 10, lang: "pseudocode",
      context: NP2_CTX,
      question: "Vervollständigen Sie die Netzplantabelle (FAZ, FEZ, SAZ, SEZ, Gesamtpuffer GP, freier Puffer FP). Geben Sie anschließend die <b>Projektdauer</b> und den <b>kritischen Pfad</b> an.",
      starter: "Vorgang | Dauer | FAZ | FEZ | SAZ | SEZ | GP | FP\nA       | 1     |     |     |     |     |    |\nB       | 3     |     |     |     |     |    |\nC       | 2     |     |     |     |     |    |\nD       | 5     |     |     |     |     |    |\nE       | 8     |     |     |     |     |    |\nF       | 2     |     |     |     |     |    |\nG       | 3     |     |     |     |     |    |\nH       | 4     |     |     |     |     |    |\nI       | 2     |     |     |     |     |    |\n\nProjektdauer: \nKritischer Pfad: ",
      solution: `${NP2_SOL}<br><b>Projektdauer: 19 Tage</b> · <b>Kritischer Pfad: A → B → C → E → G → I</b><br>
Punkte: Vorwärtsrechnung 3 P., Rückwärtsrechnung 3 P., Puffer 2 P., Dauer + kritischer Pfad 2 P.<br>
Rechenhinweise: G: FAZ = max(FEZ E 14; FEZ F 8) = 14. I: FAZ = max(17; 10) = 17. Rückwärts: SEZ(C) = min(SAZ E 6; SAZ H 13) = 6; SEZ(A) = min(SAZ B 1; SAZ D 7) = 1.`,
      explanation: "Interessant ist Vorgang D: GP = 6, aber FP = 0. D kann zwar 6 Tage später fertig werden, ohne das Projekt zu verzögern, jede Verschiebung verbraucht aber sofort den Puffer des Nachfolgers F.",
      keywords: ["19", "a, b, c, e, g, i|a-b-c-e-g-i|a b c e g i|abcegi|a → b → c → e → g → i", "gp|gesamtpuffer", "fp|freier puffer", "faz", "sez", "19 tage", "kritischer pfad"],
      tags: ["Netzplan", "kritischer Pfad", "Puffer"]
    },
    {
      id: "ga1-projektmanagement-016", part: "GA1", topic: "ga1-projektmanagement", type: "text", difficulty: 3, points: 6,
      context: NP2_CTX + "Der Netzplan ergibt eine Projektdauer von 19 Tagen. Vorgang D hat einen Gesamtpuffer von 6 Tagen und einen freien Puffer von 0 Tagen; Vorgang F hat GP = FP = 6.",
      question: "Der Lieferant teilt mit, dass sich die Hardwarebeschaffung (D) verzögert. Beschreiben Sie die Auswirkungen auf den Projektverlauf, wenn sich D <b>a)</b> um 4 Tage bzw. <b>b)</b> um 8 Tage verzögert. Nennen Sie <b>eine</b> mögliche Gegenmaßnahme für Fall b).",
      solution: `<b>a) 4 Tage</b> (2 P.): Da GP(D) = 6 ≥ 4, verschiebt sich das Projektende <b>nicht</b>. Weil FP(D) = 0 ist, verschiebt sich aber der früheste Anfang von F um 4 Tage (FAZ F = 10). Der Gesamtpuffer des Pfades D–F reduziert sich auf 2 Tage.<br>
<b>b) 8 Tage</b> (2 P.): Die Verzögerung übersteigt den Gesamtpuffer um 2 Tage. D endet an Tag 14, F an Tag 16, G kann erst an Tag 16 beginnen → Projektende verschiebt sich um <b>2 Tage auf 21 Tage</b>. Der kritische Pfad verläuft nun (auch) über A → D → F → G → I.<br>
<b>Gegenmaßnahme</b> (2 P.): z. B. Ersatzlieferanten/Leihgeräte nutzen, Installation (F) parallelisieren oder mit zusätzlichem Personal verkürzen, Systemtest teilweise auf vorhandener Testhardware/virtualisiert beginnen, Kunden frühzeitig informieren.`,
      keywords: ["puffer", "nicht|kein verzug|bleibt", "freier puffer|fp", "2 tage|zwei tage", "21", "kritisch", "ersatz|parallel|zusätzlich|personal|virtuell|leih"],
      tags: ["Netzplan", "Puffer"]
    },
    {
      id: "ga1-projektmanagement-017", part: "GA1", topic: "ga1-projektmanagement", type: "numeric", difficulty: 2, points: 4,
      context: "Ein Scrum-Team arbeitet mit Sprints von <b>2 Wochen</b>. In den letzten drei Sprints wurden 28, 32 und 30 Story Points fertiggestellt. Im Product Backlog sind für das nächste Release noch Einträge mit insgesamt <b>210 Story Points</b> geschätzt.",
      question: "Berechnen Sie, wie viele <b>Wochen</b> das Team voraussichtlich noch bis zum Release benötigt.",
      answer: 14, tolerance: 0, unit: "Wochen",
      solution: "Durchschnittliche Velocity = (28 + 32 + 30) / 3 = <b>30 SP/Sprint</b>.<br>Benötigte Sprints = 210 / 30 = <b>7 Sprints</b>.<br>Dauer = 7 × 2 Wochen = <b>14 Wochen</b>.",
      explanation: "Velocity ist ein teaminterner Erfahrungswert und eignet sich für Prognosen, nicht für Vergleiche zwischen Teams. Bei Nachkommastellen immer auf ganze Sprints aufrunden.",
      tags: ["Scrum", "Velocity"]
    },
    {
      id: "ga1-projektmanagement-018", part: "GA1", topic: "ga1-projektmanagement", type: "text", difficulty: 2, points: 5,
      context: "Für die Entwicklung eines Online-Terminbuchungssystems für eine Arztpraxis soll ein <b>Projektstrukturplan</b> erstellt werden.",
      question: "Erläutern Sie den Zweck eines Projektstrukturplans (PSP) und nennen Sie <b>drei</b> Angaben, die eine Arbeitspaketbeschreibung enthalten sollte.",
      solution: `<b>Zweck</b> (2 P.): Der PSP zerlegt das Gesamtprojekt hierarchisch in Teilprojekte/Teilaufgaben und schließlich in <b>Arbeitspakete</b> (kleinste, nicht weiter zerlegte Einheit). Er schafft Überblick über alle zu erledigenden Aufgaben, ist Grundlage für Aufwandsschätzung, Kosten-, Termin- und Ressourcenplanung sowie für die Zuordnung von Verantwortlichkeiten. Er enthält <b>keine zeitlichen Abhängigkeiten</b>. Gliederung objekt-, funktions-/phasenorientiert oder gemischt.<br>
<b>Arbeitspaketbeschreibung</b> (je 1 P.): eindeutige PSP-Nummer/Bezeichnung, verantwortliche Person, Ziel/Ergebnis (Lieferobjekt), Aufwand (Personentage) und Kosten, Start- und Endtermin bzw. Dauer, benötigte Ressourcen, Voraussetzungen/Schnittstellen, Abnahmekriterien.`,
      explanation: "Ein häufiger Fehler ist, den PSP mit dem Netzplan zu verwechseln: Reihenfolge und Abhängigkeiten zeigt erst der Netzplan bzw. das Gantt-Diagramm.",
      keywords: ["hierarchisch|zerleg|gliedert", "arbeitspaket", "überblick|vollständig", "aufwand|kosten|planung", "verantwortlich", "ergebnis|ziel", "termin|dauer", "keine zeitliche|ohne abhängigkeit"],
      tags: ["PSP"]
    },
    {
      id: "ga1-projektmanagement-019", part: "GA1", topic: "ga1-projektmanagement", type: "text", difficulty: 2, points: 4,
      question: "Stellen Sie <b>Netzplan</b> und <b>Gantt-Diagramm</b> gegenüber. Nennen Sie je einen Vorteil.",
      solution: `<b>Netzplan</b> (2 P.): Darstellung der Vorgänge als Knoten mit ihren logischen Abhängigkeiten; Vorteil: berechnet <b>Puffer</b> und den <b>kritischen Pfad</b> exakt, Auswirkungen von Verzögerungen sind rechnerisch ermittelbar.<br>
<b>Gantt-Diagramm</b> (2 P.): Balkendiagramm, Vorgänge als Balken auf einer Zeitachse (Kalender); Vorteil: sehr <b>anschaulich</b> und leicht verständlich (auch für Kunden/Management), Projektfortschritt, Parallelität, Meilensteine und Ressourcenauslastung sind auf einen Blick sichtbar.`,
      keywords: ["abhängigkeit", "puffer", "kritischer pfad", "balken", "zeitachse|kalender", "anschaulich|übersichtlich|verständlich", "fortschritt|meilenstein"],
      tags: ["Gantt", "Netzplan"]
    },
    {
      id: "ga1-projektmanagement-020", part: "GA1", topic: "ga1-projektmanagement", type: "text", difficulty: 2, points: 6,
      context: "Die Kreisverwaltung Neustadt lässt von der GovSoft GmbH ein neues Online-Bürgerportal entwickeln. Beteiligt bzw. betroffen sind u. a. der Landrat, die Sachbearbeiter/innen der Ämter, der Personalrat, der Datenschutzbeauftragte, die Bürger/innen und das IT-Team der Kreisverwaltung.",
      question: "Beschreiben Sie das Vorgehen bei einer <b>Stakeholderanalyse</b> und ordnen Sie zwei der genannten Stakeholder begründet eine Strategie zu.",
      solution: `<b>Vorgehen</b> (4 P.):<ol><li>Stakeholder <b>identifizieren</b> (alle Personen/Gruppen, die das Projekt beeinflussen oder davon betroffen sind)</li><li>Stakeholder <b>analysieren</b>: Interessen, Erwartungen, Einstellung (positiv/negativ), <b>Einfluss</b> und <b>Betroffenheit/Interesse</b> bewerten</li><li>Einordnen in eine <b>Stakeholder-Matrix</b> (Einfluss × Interesse)</li><li><b>Maßnahmen/Strategien</b> ableiten (aktiv einbinden, zufriedenstellen, informieren, beobachten) und regelmäßig aktualisieren</li></ol>
<b>Zuordnung</b> (je 1 P.), z. B.:<ul><li>Personalrat: hoher Einfluss (Mitbestimmung bei Einführung technischer Einrichtungen zur Leistungs-/Verhaltenskontrolle), → früh und <b>aktiv einbinden</b></li><li>Datenschutzbeauftragter: hoher Einfluss → einbinden (DSGVO-Konformität, Datenschutz-Folgenabschätzung)</li><li>Sachbearbeiter: hohe Betroffenheit → beteiligen (Anforderungsworkshops, Usability-Tests), schulen</li><li>Bürger: hohes Interesse, geringer Einfluss → <b>informieren</b>, ggf. Befragung/Tests</li><li>Landrat: Auftraggeber, hoher Einfluss → regelmäßig berichten (Lenkungsausschuss)</li></ul>`,
      keywords: ["identifizier", "einfluss", "interesse|betroffen", "matrix|portfolio", "einbinden|beteiligen", "informieren", "personalrat|datenschutz|landrat|bürger|sachbearbeiter", "maßnahme|strategie"],
      tags: ["Stakeholder"]
    },
    {
      id: "ga1-projektmanagement-021", part: "GA1", topic: "ga1-projektmanagement", type: "numeric", difficulty: 2, points: 4,
      context: `Im Risikomanagement des Projekts „CRM-Einführung“ wurden folgende Risiken identifiziert:
<table><tr><th>Risiko</th><th>Eintrittswahrscheinlichkeit</th><th>Schadenshöhe</th></tr>
<tr><td>R1: Ausfall des Lead-Entwicklers</td><td>20 %</td><td>25.000 €</td></tr>
<tr><td>R2: Schnittstelle zum ERP funktioniert nicht</td><td>10 %</td><td>40.000 €</td></tr>
<tr><td>R3: Verzögerte Datenlieferung des Kunden</td><td>50 %</td><td>6.000 €</td></tr></table>`,
      question: "Berechnen Sie die Summe der <b>Risikowerte</b> (Erwartungswerte), die als Risikobudget eingeplant werden soll.",
      answer: 12000, tolerance: 0.5, unit: "€",
      solution: "Risikowert = Eintrittswahrscheinlichkeit × Schadenshöhe<br>R1: 0,2 × 25.000 € = 5.000 €<br>R2: 0,1 × 40.000 € = 4.000 €<br>R3: 0,5 × 6.000 € = 3.000 €<br>Summe = <b>12.000 €</b>",
      explanation: "R1 ist das größte Risiko, obwohl R2 die höchste Schadenshöhe hat. Maßnahmen für R1 z. B.: Wissensverteilung (Pair Programming, Dokumentation), Vertretungsregelung. Strategien allgemein: vermeiden, vermindern, überwälzen (Versicherung/Vertrag), akzeptieren.",
      tags: ["Risikomanagement"]
    },
    {
      id: "ga1-projektmanagement-022", part: "GA1", topic: "ga1-projektmanagement", type: "order", difficulty: 1, points: 3,
      question: "Bringen Sie die Phasen des klassischen <b>Wasserfallmodells</b> in die richtige Reihenfolge.",
      items: ["Anforderungsanalyse", "Entwurf (System- und Softwaredesign)", "Implementierung", "Test (Integration und System)", "Einführung/Inbetriebnahme", "Betrieb und Wartung"],
      solution: "Anforderungsanalyse → Entwurf → Implementierung → Test → Einführung → Betrieb/Wartung. Jede Phase wird mit einem Ergebnisdokument abgeschlossen; Rücksprünge sind nur zur direkt vorherigen Phase vorgesehen.",
      tags: ["Wasserfall", "Phasen"]
    },
    {
      id: "ga1-projektmanagement-023", part: "GA1", topic: "ga1-projektmanagement", type: "text", difficulty: 2, points: 5,
      context: "Das Projekt „Digitale Lagerverwaltung“ wurde nach sieben Monaten erfolgreich abgenommen. Die Projektleiterin bittet Sie, den Projektabschluss vorzubereiten.",
      question: "Nennen Sie <b>drei</b> Tätigkeiten beim Projektabschluss und erläutern Sie Ziel und Ablauf einer <b>Lessons-Learned</b>-Sitzung.",
      solution: `<b>Abschlusstätigkeiten</b> (je 1 P.): Abnahme mit Abnahmeprotokoll durchführen; Soll-Ist-Vergleich (Termine, Kosten, Leistung); Projektabschlussbericht erstellen; Dokumentation an Betrieb/Kunden übergeben; Restarbeiten/offene Punkte klären; Ressourcen und Projektteam freigeben, Konten schließen; Abschlussfeier/Würdigung.<br>
<b>Lessons Learned</b> (2 P.): Ziel ist es, <b>Erfahrungen</b> (positive wie negative) systematisch zu sammeln und für <b>zukünftige Projekte</b> nutzbar zu machen. Ablauf: moderierter Workshop mit dem Team (und ggf. Kunde), Fragen „Was lief gut? Was lief schlecht? Was machen wir künftig anders?“, Ursachen analysieren, Ergebnisse dokumentieren und in einer Wissensdatenbank ablegen. Keine Schuldzuweisungen.`,
      keywords: ["abnahme|abnahmeprotokoll", "soll-ist|soll ist", "abschlussbericht|bericht", "dokumentation|übergabe", "ressourcen|freigeben|team auflösen", "erfahrung", "zukünftig|künftig|folgeprojekt", "gut|schlecht|verbesser"],
      tags: ["Projektabschluss", "Lessons Learned"]
    },
    {
      id: "ga1-projektmanagement-024", part: "GA1", topic: "ga1-projektmanagement", type: "multi", difficulty: 1, points: 3,
      question: "Welche Aussagen zu <b>Meilensteinen</b> sind zutreffend?",
      options: [
        "Ein Meilenstein ist ein Ereignis von besonderer Bedeutung und hat die Dauer 0.",
        "Ein Meilenstein sollte ein überprüfbares Ergebnis beschreiben, z. B. „Pflichtenheft vom Kunden freigegeben“.",
        "Meilensteine dauern in der Regel mehrere Tage.",
        "Im Gantt-Diagramm werden Meilensteine häufig als Raute dargestellt.",
        "Meilensteine dürfen nur am Projektende gesetzt werden."
      ],
      correct: [0, 1, 3],
      solution: "Meilensteine sind <b>Ereignisse ohne Dauer</b>, markieren prüfbare Zwischenergebnisse (Entscheidungspunkte, Quality Gates) und werden im Gantt-Diagramm meist als Raute dargestellt. Sie werden über das gesamte Projekt verteilt gesetzt.",
      tags: ["Meilenstein", "Gantt"]
    }
  );
})();

// ===================== ga1-anforderungen =====================
AP2.questions.push(
  {
    id: "ga1-anforderungen-001", part: "GA1", topic: "ga1-anforderungen", type: "mc", difficulty: 1, points: 2,
    question: "Wer erstellt üblicherweise das <b>Lastenheft</b>?",
    options: ["Der Auftragnehmer", "Der Auftraggeber", "Der Projektleiter des Auftragnehmers gemeinsam mit dem Testteam", "Die IHK als neutrale Stelle"],
    correct: [1],
    solution: "Das Lastenheft wird vom <b>Auftraggeber</b> erstellt. Es beschreibt die Gesamtheit der Forderungen an die Lieferungen und Leistungen (<b>WAS</b> und <b>WOFÜR</b>).",
    explanation: "Merkhilfe: Der Auftraggeber hat die „Last“, der Auftragnehmer die „Pflicht“, diese zu erfüllen.",
    tags: ["Lastenheft"]
  },
  {
    id: "ga1-anforderungen-002", part: "GA1", topic: "ga1-anforderungen", type: "text", difficulty: 2, points: 6,
    context: "Die Bäckereikette Kornmann (25 Filialen) möchte ein System zur Bestellung von Backwaren durch die Filialen bei der Zentralbäckerei einführen. Ihr Ausbildungsbetrieb, die SoftDev GmbH, hat sich um den Auftrag beworben.",
    question: "Unterscheiden Sie <b>Lastenheft</b> und <b>Pflichtenheft</b> hinsichtlich Ersteller, Zweck und Inhalt. Nennen Sie für jedes Dokument zwei typische Inhalte bezogen auf die Ausgangssituation.",
    solution: `<b>Lastenheft</b> (3 P.):<ul><li>Ersteller: <b>Auftraggeber</b> (Bäckerei Kornmann)</li><li>Zweck: beschreibt <b>was</b> und <b>wofür</b> – Anforderungen aus Sicht des Anwenders, Grundlage für Ausschreibung/Angebote</li><li>Inhalte: Ist-Zustand (z. B. Bestellungen per Fax/Telefon), Ziele (Bestellungen bis 14 Uhr digital erfassen), funktionale Anforderungen (Filiale bestellt Sortiment für Folgetag), nicht-funktionale Anforderungen (Bedienung per Tablet), Rahmenbedingungen (Budget, Termin), Abnahmekriterien</li></ul>
<b>Pflichtenheft</b> (3 P.):<ul><li>Ersteller: <b>Auftragnehmer</b> (SoftDev GmbH), auf Basis des Lastenhefts</li><li>Zweck: beschreibt <b>wie</b> und <b>womit</b> die Anforderungen umgesetzt werden; nach Freigabe durch den Auftraggeber verbindliche Vertragsgrundlage</li><li>Inhalte: technische Lösung/Architektur (Web-App, REST-Backend, PostgreSQL), Systemumgebung (Server, Browser), Schnittstellen (z. B. zur Warenwirtschaft), Datenmodell, GUI-Entwürfe, Test- und Abnahmekriterien, Zeit- und Ressourcenplanung</li></ul>`,
    explanation: "Punkte gibt es nur für situationsbezogene Inhalte. Typischer Fehler: Technische Details (Programmiersprache, Datenbank) ins Lastenheft schreiben.",
    keywords: ["auftraggeber", "auftragnehmer", "was|wofür", "wie|womit", "anforderung", "technisch|architektur|umsetzung", "vertrag|verbindlich|freigabe", "abnahmekriterien|abnahme"],
    tags: ["Lastenheft", "Pflichtenheft"]
  },
  {
    id: "ga1-anforderungen-003", part: "GA1", topic: "ga1-anforderungen", type: "multi", difficulty: 2, points: 4,
    context: "Für ein Ticketsystem des IT-Supports der Stadtverwaltung wurden folgende Anforderungen gesammelt.",
    question: "Welche der Anforderungen sind <b>funktionale</b> Anforderungen?",
    options: [
      "Mitarbeitende können ein Ticket mit Kategorie, Priorität und Beschreibung anlegen.",
      "Das System muss 99,5 % der Servicezeit verfügbar sein.",
      "Bei Statusänderung eines Tickets erhält der Ersteller eine E-Mail-Benachrichtigung.",
      "Die Oberfläche muss die Anforderungen der BITV 2.0 erfüllen.",
      "Supporter können Tickets nach Status und Priorität filtern.",
      "Seiten müssen bei 200 gleichzeitigen Nutzern in unter 2 Sekunden laden."
    ],
    correct: [0, 2, 4],
    solution: "<b>Funktional</b> (was das System tut): Ticket anlegen, E-Mail-Benachrichtigung, Filtern.<br><b>Nicht-funktional</b> (wie gut/unter welchen Bedingungen): Verfügbarkeit (Zuverlässigkeit), Barrierefreiheit nach BITV (Benutzbarkeit/rechtliche Vorgabe), Ladezeit (Leistungseffizienz).",
    tags: ["funktionale Anforderungen"]
  },
  {
    id: "ga1-anforderungen-004", part: "GA1", topic: "ga1-anforderungen", type: "numeric", difficulty: 2, points: 3,
    context: `Ausschnitt aus dem Anforderungskatalog einer Vereinsverwaltungs-App:
<ol><li>Der Kassenwart kann Mitgliedsbeiträge per SEPA-Lastschrift einziehen.</li>
<li>Passwörter werden mit bcrypt (Kostenfaktor ≥ 12) gehasht gespeichert.</li>
<li>Die App ist unter Android ab Version 12 und iOS ab Version 16 lauffähig.</li>
<li>Mitglieder können sich für Vereinsveranstaltungen an- und abmelden.</li>
<li>Ein neues Mitglied kann die Registrierung ohne Hilfe in höchstens 5 Minuten abschließen.</li>
<li>Der Vorstand kann eine Mitgliederliste als CSV exportieren.</li>
<li>Der Quellcode muss eine Testabdeckung von mindestens 80 % aufweisen.</li></ol>`,
    question: "Wie viele der aufgeführten Anforderungen sind <b>nicht-funktional</b>?",
    answer: 4, tolerance: 0,
    solution: "Nicht-funktional sind <b>4</b>: Nr. 2 (Sicherheit), Nr. 3 (Übertragbarkeit/Kompatibilität – Plattform), Nr. 5 (Benutzbarkeit/Erlernbarkeit), Nr. 7 (Wartbarkeit/Testbarkeit).<br>Funktional sind Nr. 1, 4 und 6.",
    explanation: "Frage dich: Beschreibt die Anforderung eine Funktion („kann …“) oder eine Eigenschaft/Qualität bzw. Rahmenbedingung der Lösung?",
    tags: ["nicht-funktionale Anforderungen"]
  },
  {
    id: "ga1-anforderungen-005", part: "GA1", topic: "ga1-anforderungen", type: "text", difficulty: 2, points: 6,
    context: "Ein regionaler Lieferdienst lässt eine Bestell-App entwickeln. Im Lastenheft steht lediglich: „Die App soll schnell, sicher und benutzerfreundlich sein.“",
    question: "Formulieren Sie <b>drei messbare nicht-funktionale Anforderungen</b>, die diese Aussage konkretisieren, und ordnen Sie jede einem Qualitätsmerkmal der ISO/IEC 25010 zu.",
    solution: `Je Anforderung 2 P. (1 P. messbare Formulierung, 1 P. korrekte Zuordnung), z. B.:<ul>
<li><b>Leistungseffizienz (Zeitverhalten):</b> „Die Artikelsuche liefert bei bis zu 500 gleichzeitigen Nutzern in 95 % der Anfragen ein Ergebnis in höchstens 1,5 Sekunden.“</li>
<li><b>Sicherheit:</b> „Die Kommunikation zwischen App und Server erfolgt ausschließlich über TLS 1.3; Passwörter werden mit Argon2id gehasht; nach 5 Fehlversuchen wird das Konto für 15 Minuten gesperrt.“</li>
<li><b>Benutzbarkeit/Interaktionsfähigkeit:</b> „90 % der Testpersonen schließen eine Erstbestellung ohne Hilfe in maximal 3 Minuten ab“ oder „Die App erfüllt WCAG 2.2 Stufe AA.“</li>
<li>Alternativ <b>Zuverlässigkeit:</b> „Verfügbarkeit von 99,5 % im Zeitraum 10–23 Uhr.“</li></ul>`,
    explanation: "Messbar heißt: Zahl + Einheit + Bedingung (Last, Zeitraum, Messverfahren). „Schnell“ oder „intuitiv“ allein sind nicht prüfbar und damit als Abnahmekriterium ungeeignet.",
    keywords: ["sekunde|ms|millisekunde", "gleichzeitig|nutzer|last", "leistungseffizienz|performance|zeitverhalten", "sicherheit|security", "tls|verschlüssel|hash", "benutzbarkeit|usability|interaktionsfähigkeit|gebrauchstauglich", "%|prozent", "wcag|testpersonen|minuten"],
    tags: ["nicht-funktionale Anforderungen", "ISO 25010"]
  },
  {
    id: "ga1-anforderungen-006", part: "GA1", topic: "ga1-anforderungen", type: "mc", difficulty: 2, points: 2,
    question: "Die Anforderung „Ein Rechnungslauf für 10.000 Kunden darf höchstens 15 Minuten dauern und dabei maximal 4 GB RAM belegen“ gehört zu welchem Qualitätsmerkmal der ISO/IEC 25010?",
    options: ["Funktionale Eignung", "Leistungseffizienz", "Wartbarkeit", "Kompatibilität"],
    correct: [1],
    solution: "<b>Leistungseffizienz</b> (Performance efficiency) mit den Teilmerkmalen Zeitverhalten, Ressourcennutzung und Kapazität.",
    explanation: "Funktionale Eignung beschreibt, ob die Funktionen vollständig, korrekt und angemessen sind – nicht wie schnell sie sind.",
    tags: ["ISO 25010"]
  },
  {
    id: "ga1-anforderungen-007", part: "GA1", topic: "ga1-anforderungen", type: "multi", difficulty: 2, points: 3,
    question: "Welche der folgenden Begriffe sind Qualitätsmerkmale (Hauptmerkmale) der Produktqualität nach <b>ISO/IEC 25010</b>?",
    options: ["Wartbarkeit", "Zuverlässigkeit", "Wirtschaftlichkeit", "Kompatibilität", "Termintreue", "Sicherheit (Security)"],
    correct: [0, 1, 3, 5],
    solution: "Hauptmerkmale (2011): Funktionale Eignung, Leistungseffizienz, Kompatibilität, Benutzbarkeit, Zuverlässigkeit, Sicherheit, Wartbarkeit, Übertragbarkeit (2023 zusätzlich Safety; Benutzbarkeit → Interaktionsfähigkeit, Übertragbarkeit → Flexibilität). <b>Wirtschaftlichkeit</b> und <b>Termintreue</b> sind Projekt-, keine Produktqualitätsmerkmale.",
    tags: ["ISO 25010"]
  },
  {
    id: "ga1-anforderungen-008", part: "GA1", topic: "ga1-anforderungen", type: "code", difficulty: 2, points: 6, lang: "pseudocode",
    context: "Die Stadtbibliothek Waldheim lässt eine Web-App entwickeln. Leser/innen sollen ausgeliehene Medien online verlängern können, sofern keine Vormerkung eines anderen Lesers vorliegt und die maximale Anzahl von zwei Verlängerungen nicht überschritten ist.",
    question: "Formulieren Sie für diese Funktion eine <b>User Story</b> im Standardformat und ergänzen Sie <b>drei Akzeptanzkriterien</b> im Format <i>Gegeben – Wenn – Dann</i>.",
    starter: "User Story:\nAls ...\n\nAkzeptanzkriterien:\n1. Gegeben ... wenn ... dann ...\n2. \n3. ",
    solution: `<b>User Story</b> (2 P.): „<b>Als</b> Leserin der Stadtbibliothek <b>möchte ich</b> meine ausgeliehenen Medien online verlängern, <b>damit</b> ich nicht persönlich in die Bibliothek kommen muss und keine Säumnisgebühren zahle.“<br>
<b>Akzeptanzkriterien</b> (4 P.):<ol>
<li><b>Gegeben</b> ein ausgeliehenes Medium ohne Vormerkung, das bisher 0- oder 1-mal verlängert wurde, <b>wenn</b> die Leserin auf „Verlängern“ klickt, <b>dann</b> verlängert sich die Leihfrist um 4 Wochen und das neue Rückgabedatum wird angezeigt.</li>
<li><b>Gegeben</b> ein Medium mit Vormerkung eines anderen Lesers, <b>wenn</b> die Leserin verlängern möchte, <b>dann</b> wird die Verlängerung abgelehnt und die Meldung „Verlängerung nicht möglich – Medium ist vorgemerkt“ angezeigt.</li>
<li><b>Gegeben</b> ein Medium, das bereits zweimal verlängert wurde, <b>wenn</b> die Leserin verlängern möchte, <b>dann</b> ist die Schaltfläche deaktiviert bzw. erscheint der Hinweis auf die maximale Anzahl von Verlängerungen.</li></ol>`,
    explanation: "Typische Fehler: fehlender Nutzen („damit …“), technische Formulierung aus Entwicklersicht, nicht prüfbare Akzeptanzkriterien („soll gut funktionieren“). Die Story selbst beschreibt kein UI-Detail.",
    keywords: ["als", "möchte ich|will ich", "damit", "gegeben|angenommen|given", "wenn|when", "dann|then", "vormerkung|vorgemerkt", "zwei|2|maximal|zweimal"],
    tags: ["User Story", "Akzeptanzkriterien"]
  },
  {
    id: "ga1-anforderungen-009", part: "GA1", topic: "ga1-anforderungen", type: "mc", difficulty: 2, points: 2,
    question: "Wofür steht das „N“ im Akronym <b>INVEST</b> für gute User Stories?",
    options: ["Necessary – die Story ist zwingend notwendig", "Negotiable – die Story ist verhandelbar und kein starrer Vertrag", "Normalized – die Story ist normiert formuliert", "New – jede Story beschreibt eine neue Funktion"],
    correct: [1],
    solution: "INVEST = <b>I</b>ndependent (unabhängig), <b>N</b>egotiable (verhandelbar), <b>V</b>aluable (wertvoll für Nutzer), <b>E</b>stimable (schätzbar), <b>S</b>mall (klein genug für einen Sprint), <b>T</b>estable (testbar).",
    tags: ["User Story", "INVEST"]
  },
  {
    id: "ga1-anforderungen-010", part: "GA1", topic: "ga1-anforderungen", type: "text", difficulty: 3, points: 6,
    context: "Im Product Backlog eines Hotelbuchungsportals steht folgende User Story:<br><i>„Als Entwickler möchte ich eine Tabelle BUCHUNG in der Datenbank anlegen und das komplette Buchungs-, Storno-, Bezahl- und Bewertungsmodul implementieren.“</i>",
    question: "Beurteilen Sie diese User Story anhand der <b>INVEST</b>-Kriterien (mindestens drei Kritikpunkte) und formulieren Sie eine verbesserte User Story.",
    solution: `<b>Kritik</b> (je 1 P., max. 4 P.):<ul>
<li><b>Valuable</b> verletzt: Rolle ist „Entwickler“ statt eines Nutzers, es fehlt der fachliche Nutzen („damit …“).</li>
<li><b>Small</b> verletzt: Die Story umfasst vier Module – sie ist ein <b>Epic</b> und passt nicht in einen Sprint.</li>
<li><b>Estimable</b>: durch den großen und unklaren Umfang kaum seriös schätzbar.</li>
<li><b>Testable</b>: keine Akzeptanzkriterien vorhanden.</li>
<li><b>Negotiable</b>: Lösung (Tabelle BUCHUNG) wird vorgegeben statt des Bedarfs.</li>
<li><b>Independent</b>: Module haben unterschiedliche Abhängigkeiten, sollten getrennt priorisierbar sein.</li></ul>
<b>Verbesserte Story</b> (2 P.), z. B.: „Als <b>Hotelgast</b> möchte ich eine gebuchte Übernachtung bis 24 Stunden vor Anreise <b>kostenlos stornieren</b>, damit ich bei geänderten Reiseplänen keine Kosten habe.“ + Akzeptanzkriterien. Buchen, Bezahlen und Bewerten werden zu eigenen Stories.`,
    keywords: ["valuable|nutzen|wert", "small|klein|zu groß", "epic", "testable|testbar|akzeptanzkriterien", "estimable|schätzbar", "entwickler|rolle", "als hotelgast|als gast|als kunde|als reisender", "damit"],
    tags: ["User Story", "INVEST"]
  },
  {
    id: "ga1-anforderungen-011", part: "GA1", topic: "ga1-anforderungen", type: "code", difficulty: 3, points: 8, lang: "pseudocode",
    context: "Für das Kino „Lichtspielhaus Aurora“ wird ein Online-Ticketsystem entwickelt. Kunden sollen Plätze für eine Vorstellung reservieren und anschließend online bezahlen können. Plätze werden während des Bezahlvorgangs 10 Minuten blockiert.",
    question: "Beschreiben Sie den Anwendungsfall <b>„Kinoticket online buchen“</b> textuell mit folgenden Punkten: Name, Akteure, Vorbedingung, Standardablauf (mind. 5 Schritte), mindestens zwei alternative Abläufe/Ausnahmen und Nachbedingung.",
    starter: "Name:\nAkteure:\nVorbedingung:\nStandardablauf:\n 1.\n 2.\n 3.\n 4.\n 5.\nAlternative Abläufe:\nNachbedingung:",
    solution: `<b>Name:</b> Kinoticket online buchen (1 P.)<br>
<b>Akteure:</b> Kunde (primär), Zahlungsdienstleister (sekundär) (1 P.)<br>
<b>Vorbedingung:</b> Vorstellung ist im Programm, freie Plätze vorhanden; Kunde ist angemeldet oder bucht als Gast (1 P.)<br>
<b>Standardablauf</b> (3 P.):<ol><li>Kunde wählt Film und Vorstellung.</li><li>System zeigt Saalplan mit freien/belegten Plätzen.</li><li>Kunde wählt Plätze und Ticketart (z. B. ermäßigt).</li><li>System blockiert die Plätze für 10 Minuten und zeigt den Gesamtpreis.</li><li>Kunde wählt Zahlungsart und bezahlt beim Zahlungsdienstleister.</li><li>System bestätigt die Buchung, markiert Plätze als verkauft und versendet das E-Ticket mit QR-Code per E-Mail.</li></ol>
<b>Alternative Abläufe</b> (je 1 P.):<ul><li>4a: Gewählte Plätze wurden zwischenzeitlich von einem anderen Kunden blockiert → Hinweis, zurück zu Schritt 2.</li><li>5a: Zahlung schlägt fehl → Fehlermeldung, erneuter Versuch oder andere Zahlungsart.</li><li>5b: 10 Minuten verstrichen → Blockierung wird aufgehoben, Buchung abgebrochen.</li><li>Kunde bricht ab → Plätze werden freigegeben.</li></ul>
<b>Nachbedingung:</b> Erfolg: Plätze sind verkauft, Zahlung ist erfasst, Ticket versendet. Fehlschlag: keine Plätze belegt, keine Zahlung (1 P.)`,
    explanation: "Häufige Fehler: Schritte aus Systemsicht ohne Akteur, technische Details (SQL-Statements) im Anwendungsfall, fehlende Nachbedingung für den Fehlerfall.",
    keywords: ["akteur", "kunde", "vorbedingung", "saalplan|plätze", "blockier|reserv", "bezahl|zahlung", "alternativ|ausnahme|fehlschlag", "nachbedingung", "e-ticket|ticket|bestätigung"],
    tags: ["Use Case", "Anwendungsfall"]
  },
  {
    id: "ga1-anforderungen-012", part: "GA1", topic: "ga1-anforderungen", type: "text", difficulty: 2, points: 6,
    context: "Die Versicherung NordSicher AG möchte die Software ihrer <b>320 Außendienstmitarbeiter/innen</b> ablösen. Zusätzlich gibt es <b>fünf erfahrene Schadenssachbearbeiter</b>, die viel Spezialwissen zu Sonderfällen besitzen.",
    question: "Schlagen Sie für die beiden Gruppen jeweils eine geeignete <b>Erhebungstechnik</b> vor. Begründen Sie Ihre Wahl und nennen Sie jeweils einen Nachteil der gewählten Technik.",
    solution: `<b>Außendienst (320 Personen) → Fragebogen/Online-Umfrage</b> (3 P.): Viele Personen können mit geringem Aufwand, ortsunabhängig und anonym befragt werden; standardisierte Antworten sind statistisch gut auswertbar. <i>Nachteil:</i> keine Rückfragen möglich, Fragen müssen sorgfältig vorbereitet werden, evtl. geringe Rücklaufquote, nur vorgedachte Aspekte werden erfasst.<br>
<b>Sachbearbeiter (5 Experten) → Interview</b> (oder Workshop/Beobachtung) (3 P.): Persönliches, leitfadengestütztes Interview ermöglicht Rückfragen und das Erfassen von <b>Detail- und Spezialwissen</b> zu Sonderfällen. <i>Nachteil:</i> zeitaufwendig in Durchführung und Auswertung, Ergebnisse subjektiv; Interviewte vergessen implizite Routinen (→ ergänzend Beobachtung).`,
    keywords: ["fragebogen|umfrage", "viele|anzahl|320", "anonym|auswertbar|statistik", "rückfrage", "interview|workshop", "detail|spezialwissen|tiefgehend|experten", "zeitaufwendig|aufwand", "rücklauf"],
    tags: ["Anforderungserhebung"]
  },
  {
    id: "ga1-anforderungen-013", part: "GA1", topic: "ga1-anforderungen", type: "mc", difficulty: 1, points: 2,
    question: "Welcher Vorteil spricht besonders für die Erhebungstechnik <b>Beobachtung</b> (Feldbeobachtung am Arbeitsplatz)?",
    options: [
      "Sie ist die günstigste Methode, um sehr viele Personen zu befragen.",
      "Sie erfasst tatsächliche Arbeitsabläufe einschließlich implizitem Wissen und Workarounds, die Befragte oft nicht benennen.",
      "Die Beobachteten verhalten sich garantiert völlig natürlich.",
      "Sie ersetzt die Abstimmung von Anforderungen mit dem Auftraggeber."
    ],
    correct: [1],
    solution: "Die Beobachtung zeigt die <b>realen Abläufe</b>, Medienbrüche und Umgehungslösungen, die in Interviews oft nicht genannt werden, weil sie selbstverständlich geworden sind.",
    explanation: "Nachteil ist gerade der Beobachtereffekt (Hawthorne-Effekt): Menschen verhalten sich anders, wenn sie beobachtet werden. Außerdem ist die Methode zeitaufwendig.",
    tags: ["Anforderungserhebung"]
  },
  {
    id: "ga1-anforderungen-014", part: "GA1", topic: "ga1-anforderungen", type: "multi", difficulty: 2, points: 3,
    context: "Für das erste Release einer Online-Terminbuchung einer Kfz-Werkstatt wurden Anforderungen nach <b>MoSCoW</b> priorisiert. Das Release muss in 6 Wochen live gehen.",
    question: "Welche Zuordnungen sind <b>sinnvoll</b>?",
    options: [
      "Must have: Kunde kann einen freien Termin auswählen und verbindlich buchen.",
      "Won't have (this time): Anbindung an das Warenwirtschaftssystem für Ersatzteilbestellung – kommt in einem späteren Release.",
      "Must have: animierter Hintergrund auf der Startseite.",
      "Should have: Erinnerungs-E-Mail 24 Stunden vor dem Termin.",
      "Could have: Kunde kann seinen Termin auf Wunsch in den eigenen Kalender exportieren (ICS-Datei)."
    ],
    correct: [0, 1, 3, 4],
    solution: "Die Buchung ist der Kern (Must). Die Erinnerungs-Mail ist wichtig, das System funktioniert aber auch ohne (Should). Der ICS-Export ist ein Komfortmerkmal (Could). Die ERP-Anbindung wird bewusst ausgeklammert (Won't have this time). Ein animierter Hintergrund ist höchstens ein Could have, keinesfalls Must.",
    tags: ["MoSCoW", "Priorisierung"]
  },
  {
    id: "ga1-anforderungen-015", part: "GA1", topic: "ga1-anforderungen", type: "order", difficulty: 1, points: 2,
    question: "Ordnen Sie die Kategorien der <b>MoSCoW</b>-Priorisierung von der <b>höchsten</b> zur <b>niedrigsten</b> Priorität.",
    items: ["Must have", "Should have", "Could have", "Won't have (this time)"],
    solution: "Must → Should → Could → Won't. „Won't have“ heißt nicht „nie“, sondern „nicht in diesem Release/Zeitraum“.",
    tags: ["MoSCoW"]
  },
  {
    id: "ga1-anforderungen-016", part: "GA1", topic: "ga1-anforderungen", type: "text", difficulty: 3, points: 6,
    context: "Ist-Situation bei der Firma Elektro Krause GmbH: Monteure notieren ihre Arbeitszeiten und verbrauchtes Material handschriftlich auf Papierformularen. Diese werden einmal pro Woche ins Büro gebracht, dort von einer Bürokraft in eine Excel-Tabelle übertragen und anschließend für die Rechnungsstellung erneut in die Buchhaltungssoftware eingegeben. Rechnungen gehen dadurch oft erst zwei bis drei Wochen nach dem Auftrag an die Kunden; häufig gibt es Rückfragen wegen unleserlicher Angaben.",
    question: "Führen Sie eine kurze <b>Ist-Analyse</b> durch, indem Sie <b>drei Schwachstellen</b> benennen, und leiten Sie für jede Schwachstelle eine Anforderung an das <b>Soll-Konzept</b> ab.",
    solution: `Je Schwachstelle + Soll-Anforderung 2 P.:<ul>
<li><b>Medienbrüche / Mehrfacherfassung</b> (Papier → Excel → Buchhaltung) → Daten werden einmalig mobil (App/Tablet) erfasst und über eine Schnittstelle automatisch an die Buchhaltungssoftware übergeben.</li>
<li><b>Fehleranfälligkeit</b> (unleserliche Handschrift, Übertragungsfehler) → digitale Eingabe mit Plausibilitätsprüfungen, Materialauswahl aus Artikelstamm, Pflichtfelder.</li>
<li><b>Lange Durchlaufzeit</b> (wöchentliche Abgabe, Rechnung nach 2–3 Wochen) → Echtzeit-Übertragung, Rechnung kann am Tag des Auftragsabschlusses erstellt werden (Liquidität verbessert).</li>
<li>Alternativ: hoher Personalaufwand im Büro → Automatisierung; fehlende Transparenz über laufende Aufträge → Status-Übersicht.</li></ul>`,
    keywords: ["medienbruch|mehrfach|doppelt", "fehler|unleserlich|übertragung", "zeit|verzögerung|durchlauf|wochen", "mobil|app|tablet|digital", "schnittstelle|automatisch", "plausibilität|prüfung|validierung", "echtzeit|sofort|zeitnah"],
    tags: ["Ist-Analyse", "Soll-Konzept"]
  },
  {
    id: "ga1-anforderungen-017", part: "GA1", topic: "ga1-anforderungen", type: "text", difficulty: 2, points: 5,
    context: "Der Geschäftsführer einer Spedition formuliert als Projektziel: „Mit der neuen Software soll die Disposition irgendwann deutlich besser werden.“",
    question: "Erläutern Sie die Bedeutung der Buchstaben von <b>SMART</b> und formulieren Sie das Projektziel SMART um.",
    solution: `<b>SMART</b> (je 0,5 P., 2,5 P.): <b>S</b>pezifisch (eindeutig, konkret), <b>M</b>essbar (quantifizierbar, prüfbar), <b>A</b>kzeptiert/attraktiv bzw. ausführbar (von Beteiligten getragen), <b>R</b>ealistisch (mit verfügbaren Mitteln erreichbar), <b>T</b>erminiert (fester Zeitpunkt).<br>
<b>Umformulierung</b> (2,5 P.), z. B.: „Bis zum <b>30.06.2027</b> wird die durchschnittliche Zeit für die Planung einer Tagestour durch die Disponenten mithilfe der neuen Tourenplanungssoftware von derzeit <b>45 auf maximal 15 Minuten</b> gesenkt; die Leerfahrten sollen um <b>10 %</b> reduziert werden.“`,
    keywords: ["spezifisch", "messbar", "akzeptiert|attraktiv|erreichbar|ausführbar", "realistisch", "terminiert|termin", "bis zum|bis ende", "minuten|%|prozent"],
    tags: ["SMART", "Projektziele"]
  },
  {
    id: "ga1-anforderungen-018", part: "GA1", topic: "ga1-anforderungen", type: "order", difficulty: 2, points: 3,
    question: "Bringen Sie die Haupttätigkeiten des <b>Requirements Engineering</b> in eine sinnvolle Reihenfolge.",
    items: ["Anforderungen ermitteln (erheben)", "Anforderungen dokumentieren (z. B. Lastenheft, User Stories)", "Anforderungen prüfen und abstimmen (validieren)", "Anforderungen verwalten (Änderungsmanagement, Versionierung, Nachverfolgbarkeit)"],
    solution: "Ermitteln → Dokumentieren → Prüfen/Abstimmen → Verwalten. Das Verwalten (Änderungen, Traceability) begleitet das Projekt dauerhaft.",
    tags: ["Requirements Engineering"]
  },
  {
    id: "ga1-anforderungen-019", part: "GA1", topic: "ga1-anforderungen", type: "mc", difficulty: 1, points: 2,
    question: "Welche Angabe gehört typischerweise ins <b>Pflichtenheft</b> und <b>nicht</b> ins Lastenheft?",
    options: [
      "„Die Kunden sollen ihre Bestellungen online verfolgen können.“",
      "„Das Backend wird als Spring-Boot-Anwendung mit PostgreSQL 16 umgesetzt und über eine REST-API angebunden.“",
      "„Das Projektbudget beträgt maximal 80.000 €.“",
      "„Derzeit werden Bestellungen telefonisch angenommen.“"
    ],
    correct: [1],
    solution: "Die konkrete <b>technische Umsetzung</b> (Architektur, Framework, Datenbank) beschreibt das <b>Pflichtenheft</b> (WIE/WOMIT). Die anderen Angaben sind Anforderungen, Rahmenbedingungen bzw. Ist-Zustand aus Auftraggebersicht und gehören ins Lastenheft.",
    tags: ["Pflichtenheft"]
  },
  {
    id: "ga1-anforderungen-020", part: "GA1", topic: "ga1-anforderungen", type: "numeric", difficulty: 2, points: 4,
    context: "In der Ist-Analyse eines Online-Händlers wurde festgestellt: Jede Retoure wird manuell erfasst und dauert durchschnittlich <b>12 Minuten</b>. Pro Arbeitstag fallen <b>150 Retouren</b> an. Mit dem geplanten Retourenportal (Kunde meldet Retoure selbst an, Etikett wird automatisch erzeugt) soll die Bearbeitung nur noch <b>4 Minuten</b> dauern.",
    question: "Berechnen Sie die Zeitersparnis in <b>Stunden pro Arbeitstag</b>.",
    answer: 20, tolerance: 0.01, unit: "h",
    solution: "Ersparnis je Retoure: 12 min − 4 min = 8 min<br>Pro Tag: 150 × 8 min = 1.200 min<br>1.200 min / 60 = <b>20 Stunden</b> pro Arbeitstag (≈ 2,5 Vollzeitstellen bei 8 h/Tag).",
    explanation: "Solche Kennzahlen aus der Ist-Analyse sind die Grundlage für Soll-Ziele und später für die Wirtschaftlichkeitsbetrachtung (Amortisation).",
    tags: ["Ist-Analyse"]
  },
  {
    id: "ga1-anforderungen-021", part: "GA1", topic: "ga1-anforderungen", type: "mc", difficulty: 2, points: 2,
    question: "Welche Aussage zu einem <b>Epic</b> in agilen Projekten ist richtig?",
    options: [
      "Ein Epic ist eine besonders kleine Story, die in einem Daily Scrum erledigt wird.",
      "Ein Epic ist eine große Anforderung, die vor der Umsetzung in mehrere kleinere User Stories zerlegt wird.",
      "Ein Epic ist das Protokoll der Sprint Retrospective.",
      "Ein Epic ist ein Synonym für die Definition of Done."
    ],
    correct: [1],
    solution: "Ein <b>Epic</b> ist eine umfangreiche Anforderung (z. B. „Online-Bezahlung“), die zu groß für einen Sprint ist und daher beim Refinement in mehrere User Stories aufgeteilt wird.",
    tags: ["User Story", "Epic"]
  }
);

// ===================== ga1-wirtschaftlichkeit =====================
AP2.questions.push(
  {
    id: "ga1-wirtschaftlichkeit-001", part: "GA1", topic: "ga1-wirtschaftlichkeit", type: "text", difficulty: 2, points: 6,
    context: "Die Physiotherapie-Kette Vitalis (12 Standorte) benötigt eine Software für Terminplanung, Patientenverwaltung und Abrechnung mit den Krankenkassen. Die interne IT (3 Entwickler) schlägt eine Eigenentwicklung vor, der Einkauf favorisiert eine am Markt verfügbare Branchensoftware als SaaS-Lösung.",
    question: "Erläutern Sie je <b>zwei Vor- und Nachteile</b> einer Eigenentwicklung (<i>Make</i>) gegenüber dem Kauf einer Standardsoftware (<i>Buy</i>) in dieser Situation.",
    solution: `<b>Vorteile Make</b> (je 1,5 P.):<ul><li>Software wird <b>passgenau</b> auf die Prozesse von Vitalis zugeschnitten, kein Funktionsüberhang</li><li><b>Unabhängigkeit</b> vom Hersteller (kein Vendor-Lock-in, keine Preiserhöhungen), Know-how und Quellcode bleiben im Unternehmen, Weiterentwicklung nach eigenen Prioritäten</li></ul>
<b>Nachteile Make</b> (je 1,5 P.):<ul><li>Hoher <b>Entwicklungsaufwand</b>, lange Zeit bis zur Einsatzbereitschaft, Kosten- und Terminrisiko; 3 Entwickler sind für eine komplexe Lösung knapp</li><li>Spezielle Anforderungen wie die <b>Krankenkassenabrechnung</b> (gesetzliche Vorgaben, regelmäßige Änderungen) müssen selbst umgesetzt und dauerhaft <b>gewartet</b> werden; Abhängigkeit von wenigen internen Wissensträgern</li></ul>`,
    explanation: "Situationsbezug ist entscheidend: Die Krankenkassenabrechnung ist ein starkes Argument für Standardsoftware, weil der Hersteller gesetzliche Änderungen pflegt.",
    keywords: ["passgenau|individuell|zugeschnitten", "unabhängig|lock-in|abhängigkeit", "know-how|wissen", "aufwand|kosten|teuer", "zeit|dauer|verfügbar", "risiko", "wartung|pflege|updates", "abrechnung|gesetzlich"],
    tags: ["Make-or-Buy"]
  },
  {
    id: "ga1-wirtschaftlichkeit-002", part: "GA1", topic: "ga1-wirtschaftlichkeit", type: "code", difficulty: 2, points: 8, lang: "pseudocode",
    context: `Für die Auswahl eines Ticketsystems liegen drei Angebote vor. Die IT-Leitung hat Kriterien gewichtet und die Angebote mit Punkten von 1 (schlecht) bis 10 (sehr gut) bewertet:
<table><tr><th>Kriterium</th><th>Gewicht</th><th>Angebot A</th><th>Angebot B</th><th>Angebot C</th></tr>
<tr><td>Funktionsumfang</td><td>35 %</td><td>8</td><td>6</td><td>9</td></tr>
<tr><td>Kosten</td><td>25 %</td><td>5</td><td>9</td><td>4</td></tr>
<tr><td>Support</td><td>20 %</td><td>7</td><td>6</td><td>8</td></tr>
<tr><td>Bedienbarkeit</td><td>20 %</td><td>9</td><td>7</td><td>8</td></tr></table>`,
    question: "Führen Sie die <b>Nutzwertanalyse</b> durch (gewichtete Punkte je Kriterium und Gesamtnutzwert je Angebot) und geben Sie eine begründete Empfehlung ab.",
    starter: "Kriterium        | Gewicht | A gewichtet | B gewichtet | C gewichtet\nFunktionsumfang  | 0,35    |             |             |\nKosten           | 0,25    |             |             |\nSupport          | 0,20    |             |             |\nBedienbarkeit    | 0,20    |             |             |\nNutzwert         |         |             |             |\n\nEmpfehlung:",
    solution: `<table><tr><th>Kriterium</th><th>Gewicht</th><th>A</th><th>B</th><th>C</th></tr>
<tr><td>Funktionsumfang</td><td>0,35</td><td>2,80</td><td>2,10</td><td>3,15</td></tr>
<tr><td>Kosten</td><td>0,25</td><td>1,25</td><td>2,25</td><td>1,00</td></tr>
<tr><td>Support</td><td>0,20</td><td>1,40</td><td>1,20</td><td>1,60</td></tr>
<tr><td>Bedienbarkeit</td><td>0,20</td><td>1,80</td><td>1,40</td><td>1,60</td></tr>
<tr><td><b>Nutzwert</b></td><td>1,00</td><td><b>7,25</b></td><td><b>6,95</b></td><td><b>7,35</b></td></tr></table>
(Tabelle 6 P.)<br><b>Empfehlung</b> (2 P.): <b>Angebot C</b> hat mit 7,35 den höchsten Nutzwert und sollte gewählt werden – es überzeugt bei den hoch gewichteten Kriterien Funktionsumfang und Support. Der Abstand zu A (7,25) ist jedoch gering; die Entscheidung sollte daher durch eine Sensitivitätsprüfung der Gewichte bzw. einen Kostenvergleich abgesichert werden.`,
    explanation: "Teilnutzen = Gewicht × Punkte. Typischer Fehler: Prozentwerte nicht als Dezimalzahl rechnen (35 × 8 = 280) und dann inkonsistent vergleichen – möglich, aber dann für alle Angebote gleich.",
    keywords: ["7,25|7.25", "6,95|6.95", "7,35|7.35", "angebot c|variante c|c hat|c mit|c wählen|c sollte", "höchste|höchsten", "3,15|3.15", "2,25|2.25", "gewicht"],
    tags: ["Nutzwertanalyse"]
  },
  {
    id: "ga1-wirtschaftlichkeit-003", part: "GA1", topic: "ga1-wirtschaftlichkeit", type: "numeric", difficulty: 1, points: 3,
    context: "Ein Hosting-Anbieter wird nach den Kriterien Verfügbarkeit (Gewicht 50 %), Preis (30 %) und Datenschutz/Serverstandort (20 %) bewertet. Anbieter X erhält die Punkte 4, 3 und 5 (Skala 1–5).",
    question: "Berechnen Sie den <b>Nutzwert</b> von Anbieter X.",
    answer: 3.9, tolerance: 0.001,
    solution: "Nutzwert = 0,5 × 4 + 0,3 × 3 + 0,2 × 5 = 2,0 + 0,9 + 1,0 = <b>3,9</b>",
    tags: ["Nutzwertanalyse"]
  },
  {
    id: "ga1-wirtschaftlichkeit-004", part: "GA1", topic: "ga1-wirtschaftlichkeit", type: "numeric", difficulty: 2, points: 4,
    context: "Ein Logistikunternehmen investiert <b>48.000 €</b> in eine Software zur automatischen Lieferscheinerfassung. Dadurch werden monatlich Personalkosten von <b>2.500 €</b> eingespart. Für Wartung und Cloud-Hosting fallen monatlich <b>500 €</b> an.",
    question: "Berechnen Sie die <b>Amortisationsdauer</b> in Monaten.",
    answer: 24, tolerance: 0.01, unit: "Monate",
    solution: "Monatlicher Rückfluss = Einsparung − laufende Kosten = 2.500 € − 500 € = 2.000 €<br>Amortisationsdauer = Investition / Rückfluss = 48.000 € / 2.000 €/Monat = <b>24 Monate</b> (2 Jahre).",
    explanation: "Typischer Fehler: Die laufenden Kosten werden vergessen → 48.000 / 2.500 = 19,2 Monate (falsch).",
    tags: ["Amortisation"]
  },
  {
    id: "ga1-wirtschaftlichkeit-005", part: "GA1", topic: "ga1-wirtschaftlichkeit", type: "numeric", difficulty: 2, points: 4,
    context: "Eine Eigenentwicklung kostet einmalig <b>36.000 €</b>; für Betrieb und Wartung fallen zusätzlich <b>300 € pro Monat</b> an. Alternativ kann eine vergleichbare SaaS-Lösung für <b>1.500 € pro Monat</b> (keine Einmalkosten) gemietet werden.",
    question: "Berechnen Sie, nach wie vielen <b>Monaten</b> beide Alternativen gleich hohe Gesamtkosten verursachen (kritische Nutzungsdauer / Break-even).",
    answer: 30, tolerance: 0.01, unit: "Monate",
    solution: "Kosten Eigenentwicklung: K₁ = 36.000 + 300 · m<br>Kosten SaaS: K₂ = 1.500 · m<br>Gleichsetzen: 36.000 + 300m = 1.500m → 36.000 = 1.200m → <b>m = 30 Monate</b>.<br>Wird die Software länger als 30 Monate genutzt, ist die Eigenentwicklung günstiger.",
    explanation: "Neben dem reinen Kostenvergleich sollten qualitative Aspekte (Risiko der Eigenentwicklung, Updates bei SaaS) berücksichtigt werden.",
    tags: ["Kostenvergleich", "Break-even"]
  },
  {
    id: "ga1-wirtschaftlichkeit-006", part: "GA1", topic: "ga1-wirtschaftlichkeit", type: "numeric", difficulty: 2, points: 5,
    context: `Für das Projekt „Kundenportal“ wurden folgende Aufwände geschätzt (1 Personentag = 8 Stunden):
<ul><li>3 Entwickler mit je <b>25 Personentagen</b>, interner Stundensatz <b>75 €</b></li>
<li>1 Projektleiterin mit <b>10 Personentagen</b>, interner Stundensatz <b>95 €</b></li>
<li>Sachkosten (Lizenzen, Testgeräte, Schulung): <b>2.400 €</b></li></ul>`,
    question: "Berechnen Sie die gesamten <b>Projektkosten</b>.",
    answer: 55000, tolerance: 0.5, unit: "€",
    solution: "Entwickler: 3 × 25 PT × 8 h × 75 €/h = 45.000 €<br>Projektleitung: 10 PT × 8 h × 95 €/h = 7.600 €<br>Sachkosten: 2.400 €<br>Summe = 45.000 + 7.600 + 2.400 = <b>55.000 €</b>",
    explanation: "Häufiger Fehler: die Stunden pro Personentag (× 8) vergessen oder nur einen Entwickler berechnen.",
    tags: ["Projektkosten", "Personentage"]
  },
  {
    id: "ga1-wirtschaftlichkeit-007", part: "GA1", topic: "ga1-wirtschaftlichkeit", type: "numeric", difficulty: 3, points: 4,
    context: "Für die Implementierungsphase eines Projekts wurde ein Aufwand von <b>120 Personentagen</b> geschätzt. Es stehen <b>drei Entwickler</b> zur Verfügung, die jeweils nur zu <b>80 %</b> für das Projekt eingesetzt werden können (Rest: Support).",
    question: "Berechnen Sie die <b>Dauer</b> der Implementierungsphase in Arbeitstagen.",
    answer: 50, tolerance: 0.01, unit: "Arbeitstage",
    solution: "Kapazität pro Arbeitstag = 3 Entwickler × 0,8 = 2,4 Personentage/Tag<br>Dauer = Aufwand / Kapazität = 120 PT / 2,4 PT/Tag = <b>50 Arbeitstage</b> (= 10 Wochen bei 5-Tage-Woche).",
    explanation: "Aufwand (Personentage) ≠ Dauer (Kalender-/Arbeitstage). Ohne Berücksichtigung der Verfügbarkeit käme man auf 40 Tage – ein typischer Planungsfehler.",
    tags: ["Personentage", "Aufwand"]
  },
  {
    id: "ga1-wirtschaftlichkeit-008", part: "GA1", topic: "ga1-wirtschaftlichkeit", type: "numeric", difficulty: 3, points: 6,
    context: `Ein Steuerbüro vergleicht für einen Betrachtungszeitraum von <b>4 Jahren</b> zwei Varianten für sein Dokumentenmanagementsystem:
<p><b>Variante 1 – On-Premise:</b> Serverhardware 18.000 € (einmalig), Softwarelizenzen 12.000 € (einmalig), Wartungsvertrag 20 % der Lizenzkosten pro Jahr, Administration 3.600 € pro Jahr, Strom 600 € pro Jahr.</p>
<p><b>Variante 2 – Cloud (SaaS):</b> Einmalige Migration 3.000 €, Nutzungsgebühr 1.250 € pro Monat.</p>`,
    question: "Berechnen Sie die <b>Total Cost of Ownership (TCO)</b> der <b>Variante 1</b> über 4 Jahre.",
    answer: 56400, tolerance: 0.5, unit: "€",
    solution: "Einmalkosten: 18.000 + 12.000 = 30.000 €<br>Laufende Kosten pro Jahr: Wartung 0,2 × 12.000 = 2.400 € + Administration 3.600 € + Strom 600 € = 6.600 €<br>4 Jahre: 4 × 6.600 = 26.400 €<br>TCO Variante 1 = 30.000 + 26.400 = <b>56.400 €</b><br><i>Zum Vergleich:</i> TCO Variante 2 = 3.000 + 48 × 1.250 = 63.000 € → Variante 1 ist über 4 Jahre um 6.600 € günstiger.",
    explanation: "Bei TCO-Vergleichen immer denselben Zeitraum ansetzen und alle Kostenarten (auch Personal für Administration) einbeziehen. Qualitative Faktoren (Verfügbarkeit, Datenschutz, Skalierbarkeit) gehören zusätzlich in die Entscheidung.",
    tags: ["TCO"]
  },
  {
    id: "ga1-wirtschaftlichkeit-009", part: "GA1", topic: "ga1-wirtschaftlichkeit", type: "numeric", difficulty: 2, points: 4,
    context: "Für eine CAD-Software stehen zwei Lizenzmodelle zur Auswahl (Preise je Arbeitsplatz):<ul><li><b>Kauflizenz:</b> 400 € einmalig + Wartungsvertrag (Updates) 80 € pro Jahr</li><li><b>Subscription:</b> 15 € pro Monat</li></ul>",
    question: "Berechnen Sie, nach wie vielen <b>Jahren</b> die Gesamtkosten beider Modelle gleich hoch sind.",
    answer: 4, tolerance: 0.01, unit: "Jahre",
    solution: "Subscription pro Jahr: 15 € × 12 = 180 €<br>Kauf: 400 + 80n · Subscription: 180n<br>400 + 80n = 180n → 400 = 100n → <b>n = 4 Jahre</b>.<br>Bei einer geplanten Nutzung über mehr als 4 Jahre ist die Kauflizenz günstiger.",
    explanation: "Monats- und Jahreswerte vereinheitlichen! Vorteile Subscription trotzdem: geringe Anfangsinvestition, immer aktuelle Version, flexibel kündbar/skalierbar.",
    tags: ["Lizenzmodelle", "Break-even"]
  },
  {
    id: "ga1-wirtschaftlichkeit-010", part: "GA1", topic: "ga1-wirtschaftlichkeit", type: "numeric", difficulty: 2, points: 3,
    context: "Im SLA für einen Webshop ist eine monatliche Verfügbarkeit von <b>99,5 %</b> vereinbart. Der Betrachtungszeitraum ist ein Monat mit 30 Tagen bei 24/7-Betrieb.",
    question: "Berechnen Sie die maximal zulässige <b>Ausfallzeit in Minuten</b> pro Monat.",
    answer: 216, tolerance: 0.01, unit: "min",
    solution: "Gesamtzeit: 30 × 24 h = 720 h<br>Zulässige Ausfallzeit: (1 − 0,995) × 720 h = 0,005 × 720 h = 3,6 h<br>3,6 h × 60 = <b>216 Minuten</b>",
    explanation: "Zum Vergleich: 99,9 % entspricht ca. 43 Minuten pro Monat bzw. 8,76 Stunden pro Jahr. Wichtig im SLA: Was zählt als Ausfall, sind geplante Wartungsfenster ausgenommen?",
    tags: ["SLA", "Verfügbarkeit"]
  },
  {
    id: "ga1-wirtschaftlichkeit-011", part: "GA1", topic: "ga1-wirtschaftlichkeit", type: "numeric", difficulty: 2, points: 4,
    context: "Ein Softwarehaus möchte eine Praxis-App als Standardprodukt vermarkten. Die Entwicklungskosten (Fixkosten) betragen <b>20.000 €</b>. Pro verkaufter Lizenz entstehen variable Kosten (Support, Zahlungsabwicklung) von <b>5 €</b>. Der Verkaufspreis je Lizenz beträgt <b>45 €</b>.",
    question: "Berechnen Sie die <b>Break-even-Menge</b> (Gewinnschwelle) in Lizenzen.",
    answer: 500, tolerance: 0.01, unit: "Lizenzen",
    solution: "Deckungsbeitrag je Lizenz = 45 € − 5 € = 40 €<br>Break-even-Menge = Fixkosten / Deckungsbeitrag = 20.000 € / 40 € = <b>500 Lizenzen</b><br>Ab der 501. Lizenz wird Gewinn erzielt.",
    tags: ["Break-even"]
  },
  {
    id: "ga1-wirtschaftlichkeit-012", part: "GA1", topic: "ga1-wirtschaftlichkeit", type: "numeric", difficulty: 3, points: 4,
    context: "Für einen neuen Server liegt Angebot A vor: Listenpreis 12.000 € netto, 10 % Rabatt, 2 % Skonto bei Zahlung innerhalb von 10 Tagen, Installation pauschal 500 € (nicht rabatt- und skontofähig). Angebot B: Listenpreis 11.500 €, 5 % Rabatt, Installation inklusive, kein Skonto.",
    question: "Berechnen Sie den <b>Bezugspreis (netto)</b> von Angebot A bei Skontoausnutzung.",
    answer: 11084, tolerance: 0.5, unit: "€",
    solution: "Listenpreis 12.000 € − 10 % Rabatt (1.200 €) = 10.800 €<br>− 2 % Skonto (216 €) = 10.584 €<br>+ Installation 500 € = <b>11.084 €</b><br>Angebot B: 11.500 € − 5 % = 10.925 € → B ist um 159 € günstiger.",
    explanation: "Reihenfolge beachten: erst Rabatt, dann Skonto vom Zieleinkaufspreis. Für die Entscheidung zählen zusätzlich qualitative Kriterien (Lieferzeit, Garantie, Support).",
    tags: ["Angebotsvergleich"]
  },
  {
    id: "ga1-wirtschaftlichkeit-013", part: "GA1", topic: "ga1-wirtschaftlichkeit", type: "mc", difficulty: 1, points: 2,
    question: "Was kennzeichnet ein <b>Concurrent-User</b>-Lizenzmodell?",
    options: [
      "Jede namentlich registrierte Person benötigt eine eigene Lizenz.",
      "Die Lizenzanzahl begrenzt, wie viele Benutzer die Software gleichzeitig nutzen dürfen.",
      "Die Lizenz ist an die Anzahl der CPU-Kerne gebunden.",
      "Die Software darf ohne Einschränkungen verändert und weitergegeben werden."
    ],
    correct: [1],
    solution: "Bei <b>Concurrent-User</b>-Lizenzen (Floating) wird die Anzahl der <b>gleichzeitigen</b> Nutzungen begrenzt – z. B. 20 Lizenzen für 60 Mitarbeitende im Schichtbetrieb. Option A beschreibt <i>Named User</i>, C die Core-Lizenzierung, D Open-Source-Lizenzen.",
    tags: ["Lizenzmodelle"]
  },
  {
    id: "ga1-wirtschaftlichkeit-014", part: "GA1", topic: "ga1-wirtschaftlichkeit", type: "multi", difficulty: 2, points: 4,
    question: "Welche Aussagen sind typische <b>Vorteile eines Subscription-/SaaS-Modells</b> gegenüber einer Kauflizenz?",
    options: [
      "Geringe Anfangsinvestition, Kosten sind als laufender Aufwand planbar.",
      "Updates und neue Versionen sind in der Regel inklusive.",
      "Die Software kann nach Vertragsende unbegrenzt weitergenutzt werden.",
      "Die Anzahl der Nutzer lässt sich flexibel an den Bedarf anpassen.",
      "Über eine sehr lange Nutzungsdauer ist das Modell immer günstiger."
    ],
    correct: [0, 1, 3],
    solution: "Richtig: geringe Anfangsinvestition/planbare Kosten, Updates inklusive, Skalierbarkeit. Falsch: Nach Vertragsende endet das Nutzungsrecht; über lange Laufzeiten ist Subscription häufig <b>teurer</b> als ein Kauf.",
    tags: ["Lizenzmodelle", "SaaS"]
  },
  {
    id: "ga1-wirtschaftlichkeit-015", part: "GA1", topic: "ga1-wirtschaftlichkeit", type: "text", difficulty: 2, points: 5,
    context: "Ein Onlinehändler lagert den Betrieb seines Webshops an einen Rechenzentrumsbetreiber aus. Sie sollen die Inhalte des <b>Service Level Agreements (SLA)</b> vorbereiten.",
    question: "Erläutern Sie den Begriff SLA und nennen Sie <b>vier</b> Inhalte, die im SLA geregelt werden sollten.",
    solution: `<b>SLA</b> (1 P.): Vertragliche Vereinbarung zwischen Dienstleister und Kunde über <b>messbare Qualitätsmerkmale</b> (Service Level) einer Dienstleistung, einschließlich der Folgen bei Nichteinhaltung.<br>
<b>Inhalte</b> (je 1 P.):<ul><li><b>Verfügbarkeit</b> in % (z. B. 99,9 % pro Monat) und Definition von Ausfall/Wartungsfenstern</li><li><b>Reaktionszeit</b> (z. B. 30 min bei Priorität 1) und <b>Wiederherstellungs-/Lösungszeit</b></li><li>Servicezeiten (24/7 oder Mo–Fr 8–18 Uhr), Supportkanäle, Ansprechpartner, Eskalationsstufen</li><li><b>Vertragsstrafen/Pönalen</b> bzw. Gutschriften bei Unterschreitung</li><li>Reporting/Messmethode, Datensicherung (RPO/RTO), Datenschutz (AV-Vertrag), Laufzeit/Kündigung</li></ul>`,
    keywords: ["vereinbarung|vertrag", "messbar|dienstgüte|service level", "verfügbarkeit", "reaktionszeit", "wiederherstell|lösungszeit|behebung", "servicezeit|support", "vertragsstrafe|pönale|gutschrift", "reporting|eskalation|datensicherung"],
    tags: ["SLA"]
  },
  {
    id: "ga1-wirtschaftlichkeit-016", part: "GA1", topic: "ga1-wirtschaftlichkeit", type: "mc", difficulty: 1, points: 2,
    question: "Welche Kostenposition wird bei einer reinen Betrachtung des Anschaffungspreises häufig übersehen, ist aber Bestandteil der <b>TCO</b>?",
    options: ["Kaufpreis der Hardware", "Kosten für Schulung, Administration und Ausfallzeiten während der Nutzungsdauer", "Listenpreis der Lizenz", "Einmaliger Rabatt des Händlers"],
    correct: [1],
    solution: "Die TCO berücksichtigen neben den Anschaffungskosten auch alle <b>indirekten und laufenden Kosten</b> über den gesamten Lebenszyklus: Betrieb, Wartung, Schulung, Administration, Energie, Ausfallzeiten, Entsorgung.",
    tags: ["TCO"]
  },
  {
    id: "ga1-wirtschaftlichkeit-017", part: "GA1", topic: "ga1-wirtschaftlichkeit", type: "text", difficulty: 2, points: 6,
    context: "Die Kanzlei Berger &amp; Partner holt drei Angebote für die Einführung einer neuen Kanzleisoftware ein. Der Geschäftsführer möchte einfach das billigste Angebot nehmen.",
    question: "Erläutern Sie, warum ein reiner Preisvergleich nicht ausreicht. Nennen Sie <b>drei quantitative</b> und <b>drei qualitative</b> Kriterien für den Angebotsvergleich.",
    solution: `<b>Begründung</b> (2 P.): Der Angebotspreis bildet nur einen Teil der Kosten ab (laufende Kosten, Folgekosten fehlen) und berücksichtigt keine nicht-monetären Faktoren wie Leistungsumfang, Qualität, Zukunftssicherheit oder Servicequalität. Das billigste Angebot kann über die Nutzungsdauer teurer sein oder Anforderungen nicht erfüllen.<br>
<b>Quantitativ</b> (2 P.): Anschaffungspreis/Lizenzkosten, Rabatt/Skonto, laufende Wartungs-/Supportkosten, Schulungs- und Einführungskosten, Hardwarekosten, Lieferzeit in Tagen.<br>
<b>Qualitativ</b> (2 P.): Funktionsumfang/Erfüllung der Anforderungen, Bedienbarkeit, Qualität des Supports (Erreichbarkeit, Reaktionszeit), Referenzen/Marktstellung des Anbieters, Datenschutz/Serverstandort, Schnittstellen/Integrationsfähigkeit, Zukunftssicherheit/Updates.<br>Ein geeignetes Verfahren zur Zusammenführung ist die <b>Nutzwertanalyse</b>.`,
    keywords: ["folgekosten|laufende|tco", "qualität|leistung", "preis|lizenz", "rabatt|skonto", "wartung|schulung", "support|service", "funktion|anforderung", "referenz|datenschutz|schnittstelle|bedienbarkeit", "nutzwert"],
    tags: ["Angebotsvergleich"]
  },
  {
    id: "ga1-wirtschaftlichkeit-018", part: "GA1", topic: "ga1-wirtschaftlichkeit", type: "order", difficulty: 1, points: 3,
    question: "Bringen Sie die Schritte einer <b>Nutzwertanalyse</b> in die richtige Reihenfolge.",
    items: ["Alternativen und Bewertungskriterien festlegen", "Kriterien gewichten (Summe 100 %)", "Erfüllungsgrad jeder Alternative je Kriterium bewerten (Punkte vergeben)", "Teilnutzwerte berechnen (Gewicht × Punkte) und zum Gesamtnutzwert addieren", "Rangfolge bilden und Alternative mit höchstem Nutzwert auswählen"],
    solution: "Kriterien festlegen → gewichten → bewerten → Teilnutzwerte berechnen und summieren → Rangfolge/Entscheidung (ggf. mit Sensitivitätsanalyse).",
    tags: ["Nutzwertanalyse"]
  },
  {
    id: "ga1-wirtschaftlichkeit-019", part: "GA1", topic: "ga1-wirtschaftlichkeit", type: "mc", difficulty: 2, points: 2,
    question: "Ein Entwickler möchte eine unter der <b>GPL v3</b> lizenzierte Bibliothek fest in eine Software einbauen, die an Kunden <b>verkauft und verteilt</b> wird. Welche Folge hat das?",
    options: [
      "Keine – Open-Source-Software darf immer beliebig in proprietäre Produkte übernommen werden.",
      "Das abgeleitete Werk muss bei Weitergabe ebenfalls unter der GPL (inkl. Quellcode) lizenziert werden (Copyleft).",
      "Die Software darf nicht verkauft werden.",
      "Es muss lediglich ein Copyright-Hinweis in die Dokumentation aufgenommen werden."
    ],
    correct: [1],
    solution: "Die GPL ist eine <b>Copyleft</b>-Lizenz: Wer ein abgeleitetes Werk verbreitet, muss es unter denselben Bedingungen weitergeben und den Quellcode zugänglich machen. Ein Verkauf ist grundsätzlich erlaubt.",
    explanation: "Permissive Lizenzen wie <b>MIT</b> oder <b>Apache 2.0</b> verlangen nur den Erhalt von Copyright- und Lizenzhinweisen (Option D) und erlauben die Nutzung in proprietärer Software.",
    tags: ["Lizenzmodelle", "Open Source"]
  },
  {
    id: "ga1-wirtschaftlichkeit-020", part: "GA1", topic: "ga1-wirtschaftlichkeit", type: "text", difficulty: 2, points: 4,
    context: "Ein Kunde fragt, warum er nach der Abnahme seiner Individualsoftware zusätzlich einen <b>Wartungsvertrag</b> abschließen soll, obwohl doch eine gesetzliche Gewährleistung besteht.",
    question: "Erläutern Sie den Unterschied zwischen Gewährleistung und Wartungsvertrag und nennen Sie <b>zwei</b> typische Leistungen eines Software-Wartungsvertrags.",
    solution: `<b>Unterschied</b> (2 P.): Die <b>Gewährleistung</b> ist gesetzlich geregelt (i. d. R. 2 Jahre ab Abnahme) und umfasst nur Mängel, die bereits bei Übergabe vorhanden waren (Nacherfüllung). Ein <b>Wartungsvertrag</b> ist eine freiwillige, kostenpflichtige Vereinbarung, die laufende Leistungen über die Gewährleistung hinaus sichert – mit definierten Reaktionszeiten.<br>
<b>Leistungen</b> (je 1 P.): Fehlerbehebung (Bugfixes) mit garantierten Reaktionszeiten, Sicherheits- und Funktionsupdates, Anpassung an neue Betriebssystem-/Browserversionen oder gesetzliche Änderungen, Hotline/Support, regelmäßige Systemprüfung, ggf. Kontingent für kleinere Weiterentwicklungen.`,
    keywords: ["gesetzlich", "2 jahre|zwei jahre", "mangel|mängel|übergabe", "freiwillig|vertraglich|kostenpflichtig", "reaktionszeit", "update|patch", "fehlerbehebung|bugfix", "hotline|support"],
    tags: ["Wartungsvertrag"]
  },
  {
    id: "ga1-wirtschaftlichkeit-021", part: "GA1", topic: "ga1-wirtschaftlichkeit", type: "mc", difficulty: 2, points: 2,
    question: "Welche Aussage zur <b>statischen Amortisationsrechnung</b> ist zutreffend?",
    options: [
      "Sie berücksichtigt den Zeitwert des Geldes durch Abzinsung.",
      "Sie ermittelt, nach welcher Zeit das eingesetzte Kapital durch die Rückflüsse wieder zurückgeflossen ist – und vernachlässigt Rückflüsse nach diesem Zeitpunkt.",
      "Sie liefert immer die rentabelste Investitionsalternative.",
      "Sie ist nur für Investitionen über 1 Mio. € zulässig."
    ],
    correct: [1],
    solution: "Die statische Amortisationsrechnung misst das <b>Risiko</b> (Kapitalrückflusszeit). Sie berücksichtigt weder Zinseffekte noch Rückflüsse nach dem Amortisationszeitpunkt und sagt daher nichts über die Gesamtrentabilität aus.",
    tags: ["Amortisation"]
  }
);

// ===================== ga1-qualitaet =====================
AP2.questions.push(
  {
    id: "ga1-qualitaet-001", part: "GA1", topic: "ga1-qualitaet", type: "order", difficulty: 1, points: 3,
    question: "Bringen Sie die <b>Teststufen</b> in die Reihenfolge, in der sie im V-Modell durchlaufen werden.",
    items: ["Komponententest (Modul-/Unit-Test)", "Integrationstest", "Systemtest", "Abnahmetest"],
    solution: "Komponententest → Integrationstest → Systemtest → Abnahmetest. Vom Kleinen (einzelne Einheit) zum Großen (Gesamtsystem beim Kunden).",
    tags: ["Teststufen"]
  },
  {
    id: "ga1-qualitaet-002", part: "GA1", topic: "ga1-qualitaet", type: "mc", difficulty: 1, points: 2,
    question: "Was wird beim <b>Integrationstest</b> vorrangig geprüft?",
    options: [
      "Ob einzelne Methoden isoliert korrekt rechnen",
      "Das Zusammenspiel und die Schnittstellen zwischen Komponenten bzw. zu Fremdsystemen",
      "Ob der Kunde die Software formal abnimmt",
      "Ob der Quellcode die Namenskonventionen einhält"
    ],
    correct: [1],
    solution: "Der Integrationstest prüft die <b>Schnittstellen und das Zusammenwirken</b> bereits getesteter Komponenten (z. B. Service ↔ Repository ↔ Datenbank, App ↔ REST-API). Strategien: Bottom-up, Top-down, Big Bang, inkrementell.",
    tags: ["Teststufen", "Integrationstest"]
  },
  {
    id: "ga1-qualitaet-003", part: "GA1", topic: "ga1-qualitaet", type: "text", difficulty: 2, points: 6,
    question: "Unterscheiden Sie <b>Black-Box-Test</b> und <b>White-Box-Test</b>. Nennen Sie für jedes Verfahren <b>zwei</b> konkrete Testmethoden.",
    solution: `<b>Black-Box-Test</b> (3 P.): Testfälle werden aus der <b>Spezifikation</b> (Anforderungen) abgeleitet, die innere Struktur/der Quellcode ist unbekannt bzw. wird nicht betrachtet. Geprüft wird das Ein-/Ausgabeverhalten. Methoden: <b>Äquivalenzklassenbildung</b>, <b>Grenzwertanalyse</b>, Entscheidungstabellentest, Zustandsübergangstest, Use-Case-basierter Test.<br>
<b>White-Box-Test</b> (3 P.): Testfälle werden aus dem <b>Quellcode</b>/der Kontrollstruktur abgeleitet, Ziel ist eine bestimmte <b>Überdeckung</b>. Methoden: <b>Anweisungsüberdeckung (C0)</b>, <b>Zweigüberdeckung (C1)</b>, Pfadüberdeckung (C2), Bedingungsüberdeckung.`,
    explanation: "Black-Box findet fehlende Funktionen, White-Box nicht ausgeführten/toten Code. Beide ergänzen sich (Grey-Box als Mischform).",
    keywords: ["spezifikation|anforderung", "quellcode|code|interne struktur", "äquivalenzklasse", "grenzwert", "entscheidungstabelle|zustand", "anweisungsüberdeckung|c0", "zweigüberdeckung|c1", "pfad|überdeckung"],
    tags: ["Black-Box", "White-Box"]
  },
  {
    id: "ga1-qualitaet-004", part: "GA1", topic: "ga1-qualitaet", type: "code", difficulty: 3, points: 10, lang: "pseudocode",
    context: "Die VersiCheck GmbH entwickelt einen Online-Tarifrechner für Kfz-Versicherungen. Das Eingabefeld <b>Alter des Fahrers</b> akzeptiert ganze Zahlen von <b>18 bis 75</b>. Fahrer von 18 bis 24 Jahren erhalten einen Zuschlag von 30 %, Fahrer von 25 bis 75 Jahren keinen Zuschlag. Ungültige Eingaben werden mit einer Fehlermeldung abgelehnt.",
    question: "a) Bilden Sie die <b>Äquivalenzklassen</b> (gültige und ungültige) für das Feld „Alter“. <br>b) Bestimmen Sie die Testwerte nach der <b>Grenzwertanalyse</b>.<br>c) Erstellen Sie eine <b>Testfalltabelle</b> mit mindestens 6 Testfällen (Nr., Äquivalenzklasse, Eingabe, erwartetes Ergebnis).",
    starter: "a) Äquivalenzklassen:\n\nb) Grenzwerte:\n\nc) Nr | Klasse | Eingabe | erwartetes Ergebnis\n   1 |        |         |",
    solution: `<b>a) Äquivalenzklassen</b> (3 P.):<ul><li>gÄK1: 18 ≤ Alter ≤ 24 (Zuschlag 30 %)</li><li>gÄK2: 25 ≤ Alter ≤ 75 (kein Zuschlag)</li><li>uÄK1: Alter &lt; 18</li><li>uÄK2: Alter &gt; 75</li><li>uÄK3: keine ganze Zahl (Text „abc“, Dezimalzahl 20,5, leere Eingabe)</li></ul>
<b>b) Grenzwerte</b> (2 P.): 17 | 18 | 24 | 25 | 75 | 76 (an jeder Klassengrenze der Wert auf und direkt neben der Grenze)<br>
<b>c) Testfalltabelle</b> (5 P.):
<table><tr><th>Nr.</th><th>Klasse</th><th>Eingabe</th><th>erwartetes Ergebnis</th></tr>
<tr><td>1</td><td>uÄK1 (Grenze)</td><td>17</td><td>Fehlermeldung „Mindestalter 18 Jahre“</td></tr>
<tr><td>2</td><td>gÄK1 (Grenze)</td><td>18</td><td>Beitrag mit 30 % Zuschlag</td></tr>
<tr><td>3</td><td>gÄK1 (Grenze)</td><td>24</td><td>Beitrag mit 30 % Zuschlag</td></tr>
<tr><td>4</td><td>gÄK2 (Grenze)</td><td>25</td><td>Beitrag ohne Zuschlag</td></tr>
<tr><td>5</td><td>gÄK2 (Grenze)</td><td>75</td><td>Beitrag ohne Zuschlag</td></tr>
<tr><td>6</td><td>uÄK2 (Grenze)</td><td>76</td><td>Fehlermeldung „Höchstalter 75 Jahre“</td></tr>
<tr><td>7</td><td>uÄK3</td><td>„abc“</td><td>Fehlermeldung „Bitte ganze Zahl eingeben“</td></tr>
<tr><td>8</td><td>uÄK3</td><td>20,5</td><td>Fehlermeldung „Bitte ganze Zahl eingeben“</td></tr></table>`,
    explanation: "Typische Fehler: nur eine gültige Klasse bilden (der Zuschlag teilt den gültigen Bereich!), die nicht-numerische Klasse vergessen, erwartetes Ergebnis zu unkonkret („funktioniert“).",
    keywords: ["17", "18", "24", "25", "75", "76", "ungültig", "gültig", "zuschlag", "fehlermeldung|fehler"],
    tags: ["Äquivalenzklassen", "Grenzwertanalyse", "Testfalltabelle"]
  },
  {
    id: "ga1-qualitaet-005", part: "GA1", topic: "ga1-qualitaet", type: "multi", difficulty: 2, points: 3,
    context: "In einem Bestellformular darf die Bestellmenge eine ganze Zahl von <b>1 bis 99</b> sein.",
    question: "Welche Werte sollten Sie nach der <b>Grenzwertanalyse</b> (Grenze und benachbarter Wert außerhalb) mindestens testen?",
    options: ["0", "1", "50", "99", "100", "-50"],
    correct: [0, 1, 3, 4],
    solution: "Grenzwerte: <b>0</b> (direkt unterhalb, ungültig), <b>1</b> (untere Grenze, gültig), <b>99</b> (obere Grenze, gültig), <b>100</b> (direkt oberhalb, ungültig). 50 und −50 sind typische Repräsentanten für Äquivalenzklassen, aber keine Grenzwerte.",
    explanation: "Bei der erweiterten Grenzwertanalyse kommen zusätzlich 2 und 98 hinzu.",
    tags: ["Grenzwertanalyse"]
  },
  {
    id: "ga1-qualitaet-006", part: "GA1", topic: "ga1-qualitaet", type: "numeric", difficulty: 1, points: 2,
    question: "Eine Geschäftsregel hängt von <b>vier</b> voneinander unabhängigen Bedingungen ab, die jeweils nur „ja“ oder „nein“ sein können. Wie viele Regeln (Spalten) hat die vollständige <b>Entscheidungstabelle</b> vor einer Vereinfachung?",
    answer: 16, tolerance: 0, unit: "Regeln",
    solution: "Bei n binären Bedingungen gibt es 2<sup>n</sup> Kombinationen: 2<sup>4</sup> = <b>16 Regeln</b>.",
    explanation: "Regeln, bei denen eine Bedingung keinen Einfluss hat, können anschließend mit „–“ (irrelevant) zusammengefasst werden.",
    tags: ["Entscheidungstabelle"]
  },
  {
    id: "ga1-qualitaet-007", part: "GA1", topic: "ga1-qualitaet", type: "code", difficulty: 3, points: 8, lang: "pseudocode",
    context: "Im Onlineshop der Gartenprofi GmbH gelten folgende Versandregeln: Der Standardversand kostet 4,95 €. Er ist kostenlos, wenn der Bestellwert mindestens 50 € beträgt <b>oder</b> der Kunde Premiumkunde ist. Wählt der Kunde Expressversand, fällt zusätzlich ein Expresszuschlag von 9,90 € an – Premiumkunden zahlen keinen Expresszuschlag.",
    question: "Erstellen Sie eine vollständige <b>Entscheidungstabelle</b> mit den Bedingungen <i>Bestellwert ≥ 50 €</i>, <i>Premiumkunde</i>, <i>Expressversand</i> und den Aktionen <i>Standardversand 4,95 €</i>, <i>Expresszuschlag 9,90 €</i> sowie den resultierenden Versandkosten. Vereinfachen Sie die Tabelle anschließend, soweit möglich.",
    starter: "                     | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8\nBestellwert >= 50 €   |    |    |    |    |    |    |    |\nPremiumkunde         |    |    |    |    |    |    |    |\nExpressversand       |    |    |    |    |    |    |    |\n---------------------+----+----+----+----+----+----+----+---\nStandard 4,95 €      |    |    |    |    |    |    |    |\nExpress 9,90 €       |    |    |    |    |    |    |    |\nVersandkosten gesamt |    |    |    |    |    |    |    |",
    solution: `<b>Vollständige Tabelle</b> (6 P.):
<table><tr><th></th><th>R1</th><th>R2</th><th>R3</th><th>R4</th><th>R5</th><th>R6</th><th>R7</th><th>R8</th></tr>
<tr><td>Bestellwert ≥ 50 €</td><td>J</td><td>J</td><td>J</td><td>J</td><td>N</td><td>N</td><td>N</td><td>N</td></tr>
<tr><td>Premiumkunde</td><td>J</td><td>J</td><td>N</td><td>N</td><td>J</td><td>J</td><td>N</td><td>N</td></tr>
<tr><td>Expressversand</td><td>J</td><td>N</td><td>J</td><td>N</td><td>J</td><td>N</td><td>J</td><td>N</td></tr>
<tr><td>Standard 4,95 €</td><td>–</td><td>–</td><td>–</td><td>–</td><td>–</td><td>–</td><td>X</td><td>X</td></tr>
<tr><td>Express 9,90 €</td><td>–</td><td>–</td><td>X</td><td>–</td><td>–</td><td>–</td><td>X</td><td>–</td></tr>
<tr><td>Gesamt</td><td>0,00</td><td>0,00</td><td>9,90</td><td>0,00</td><td>0,00</td><td>0,00</td><td>14,85</td><td>4,95</td></tr></table>
<b>Vereinfachung</b> (2 P.): R1, R2, R5, R6 → Regel „Premiumkunde = J, Rest egal (–)“ → 0,00 €. Es verbleiben 5 Regeln: [–/J/–] 0,00 € · [J/N/J] 9,90 € · [J/N/N] 0,00 € · [N/N/J] 14,85 € · [N/N/N] 4,95 €.`,
    explanation: "Vorgehen: Bedingungskombinationen systematisch (Halbierungsmuster J/N) eintragen, dann Aktionen je Regel ableiten. Jede Regel entspricht später mindestens einem Testfall.",
    keywords: ["14,85|14.85", "9,90|9.90", "4,95|4.95", "0,00|0 €|kostenlos", "regel", "premium", "irrelevant|egal|zusammengefasst|vereinfach", "5 regeln|fünf regeln"],
    tags: ["Entscheidungstabelle"]
  },
  {
    id: "ga1-qualitaet-008", part: "GA1", topic: "ga1-qualitaet", type: "numeric", difficulty: 2, points: 3,
    context: `<pre><code>funktion berechneRabatt(betrag, istStammkunde)
    rabatt ← 0
    wenn betrag &gt; 100 dann
        rabatt ← 5
    ende wenn
    wenn istStammkunde dann
        rabatt ← rabatt + 3
    ende wenn
    rückgabe rabatt
ende funktion</code></pre>`,
    question: "Wie viele Testfälle sind <b>mindestens</b> notwendig, um eine vollständige <b>Zweigüberdeckung (C1)</b> zu erreichen?",
    answer: 2, tolerance: 0, unit: "Testfälle",
    solution: "Jede der beiden Entscheidungen muss einmal <i>wahr</i> und einmal <i>falsch</i> ausgewertet werden. Das gelingt mit <b>2 Testfällen</b>:<br>TF1: betrag = 150, istStammkunde = wahr → beide Bedingungen wahr → Ergebnis 8<br>TF2: betrag = 50, istStammkunde = falsch → beide Bedingungen falsch → Ergebnis 0",
    explanation: "Zum Vergleich: <b>C0</b> (Anweisungsüberdeckung) braucht nur <b>1</b> Testfall (TF1 führt alle Anweisungen aus). <b>C2</b> (Pfadüberdeckung) braucht <b>4</b> Testfälle (2 × 2 Pfade). Typischer Fehler: Bei einem if ohne else wird der leere false-Zweig übersehen.",
    tags: ["Zweigüberdeckung", "C1", "White-Box"]
  },
  {
    id: "ga1-qualitaet-009", part: "GA1", topic: "ga1-qualitaet", type: "numeric", difficulty: 2, points: 3,
    context: `<pre><code>summe ← 0
i ← 0
solange i &lt; anzahl
    wenn werte[i] &gt; 0 dann
        summe ← summe + werte[i]
    ende wenn
    i ← i + 1
ende solange
wenn summe &gt; grenze dann
    ausgabe "Grenze überschritten"
sonst
    ausgabe "ok"
ende wenn</code></pre>`,
    question: "Bestimmen Sie die <b>zyklomatische Komplexität nach McCabe</b> für diesen Algorithmus.",
    answer: 4, tolerance: 0,
    solution: "Anzahl binärer Entscheidungen: Schleifenbedingung (solange), wenn werte[i] &gt; 0, wenn summe &gt; grenze = 3.<br>M = Entscheidungen + 1 = 3 + 1 = <b>4</b>.",
    explanation: "Alternativ über den Kontrollflussgraphen: M = Kanten − Knoten + 2. Die Komplexität gibt die Anzahl linear unabhängiger Pfade an (Mindestanzahl Testfälle für Basispfadtest). Werte &gt; 10 gelten als schwer wartbar.",
    tags: ["McCabe", "Metriken"]
  },
  {
    id: "ga1-qualitaet-010", part: "GA1", topic: "ga1-qualitaet", type: "mc", difficulty: 2, points: 2,
    question: "Welche Aussage zu Überdeckungsmaßen ist <b>richtig</b>?",
    options: [
      "100 % Anweisungsüberdeckung (C0) garantiert 100 % Zweigüberdeckung (C1).",
      "100 % Zweigüberdeckung (C1) schließt 100 % Anweisungsüberdeckung (C0) ein.",
      "Pfadüberdeckung (C2) ist bei Programmen mit Schleifen immer mit wenigen Tests erreichbar.",
      "Überdeckungsmaße gehören zu den Black-Box-Verfahren."
    ],
    correct: [1],
    solution: "C1 ist stärker als C0: Werden alle Zweige durchlaufen, werden automatisch alle Anweisungen ausgeführt. Umgekehrt nicht – ein leerer else-Zweig wird bei C0 nicht erzwungen.",
    explanation: "Pfadüberdeckung ist bei Schleifen wegen der vielen möglichen Durchläufe praktisch nicht vollständig erreichbar. Überdeckungsmaße sind White-Box-Verfahren.",
    tags: ["C0", "C1", "White-Box"]
  },
  {
    id: "ga1-qualitaet-011", part: "GA1", topic: "ga1-qualitaet", type: "numeric", difficulty: 1, points: 2,
    context: "Ein Modul enthält 240 ausführbare Anweisungen. Bei Ausführung der Unit-Tests wurden laut Coverage-Report 180 Anweisungen mindestens einmal ausgeführt.",
    question: "Berechnen Sie den <b>Anweisungsüberdeckungsgrad (C0)</b> in Prozent.",
    answer: 75, tolerance: 0.01, unit: "%",
    solution: "C0 = ausgeführte Anweisungen / alle Anweisungen × 100 % = 180 / 240 × 100 % = <b>75 %</b>",
    tags: ["Testabdeckung", "Metriken"]
  },
  {
    id: "ga1-qualitaet-012", part: "GA1", topic: "ga1-qualitaet", type: "text", difficulty: 2, points: 4,
    context: "In der Warenwirtschaftssoftware eines Großhändlers wurde die Berechnung der Mehrwertsteuer für Lebensmittel korrigiert. Der Projektleiter fragt, ob es reicht, nur die geänderte Funktion zu testen.",
    question: "Erläutern Sie den Begriff <b>Regressionstest</b> und begründen Sie, warum er in dieser Situation notwendig ist. Nennen Sie eine Maßnahme, um Regressionstests effizient durchzuführen.",
    solution: `<b>Regressionstest</b> (2 P.): Wiederholung bereits durchgeführter Tests nach einer Änderung (Fehlerbehebung, Erweiterung, Refactoring), um sicherzustellen, dass die Änderung <b>keine neuen Fehler in bisher funktionierenden Teilen</b> verursacht hat (Seiteneffekte).<br>
<b>Begründung</b> (1 P.): Die MwSt.-Berechnung wird vermutlich an vielen Stellen verwendet (Rechnungen, Gutschriften, Statistiken, Schnittstelle zur Buchhaltung) – Seiteneffekte sind wahrscheinlich.<br>
<b>Maßnahme</b> (1 P.): <b>Automatisierung</b> der Tests (Unit-/Integrationstests) und Ausführung in einer CI-Pipeline bei jedem Commit; risikobasierte Auswahl der Testfälle.`,
    keywords: ["wiederhol", "änderung", "seiteneffekt|nebenwirkung|bisher funktionierend|bestehende", "neue fehler", "automatisier", "ci|pipeline|continuous"],
    tags: ["Regressionstest"]
  },
  {
    id: "ga1-qualitaet-013", part: "GA1", topic: "ga1-qualitaet", type: "text", difficulty: 2, points: 4,
    context: "Ein Ticketportal für Konzerte erwartet beim Vorverkaufsstart eines Superstars bis zu 50.000 gleichzeitige Besucher.",
    question: "Unterscheiden Sie <b>Lasttest</b> und <b>Stresstest</b> und erläutern Sie, welche Erkenntnisse beide Tests für diese Situation liefern.",
    solution: `<b>Lasttest</b> (2 P.): Das System wird mit der <b>erwarteten (Spitzen-)Last</b> betrieben, z. B. 50.000 simulierte Nutzer. Gemessen werden Antwortzeiten, Durchsatz und Ressourcenauslastung. Erkenntnis: Werden die geforderten Antwortzeiten (z. B. &lt; 2 s) unter realistischer Last eingehalten?<br>
<b>Stresstest</b> (2 P.): Die Last wird <b>über die erwartete Grenze hinaus</b> gesteigert (z. B. 100.000 Nutzer) bzw. Ressourcen werden entzogen, bis das System versagt. Erkenntnis: Wo liegt die Belastungsgrenze, wie verhält sich das System bei Überlast (kontrollierte Fehlermeldung/Warteschlange statt Absturz, Datenkonsistenz) und erholt es sich danach wieder?`,
    keywords: ["erwartet|normal|spitzenlast", "antwortzeit|durchsatz", "über|grenze|überlast", "absturz|versagt|ausfall", "belastungsgrenze|kapazität", "erholung|wiederherstell|warteschlange", "simul"],
    tags: ["Lasttest", "Performance"]
  },
  {
    id: "ga1-qualitaet-014", part: "GA1", topic: "ga1-qualitaet", type: "order", difficulty: 1, points: 3,
    question: "Bringen Sie die Schritte eines Zyklus der <b>testgetriebenen Entwicklung (TDD)</b> in die richtige Reihenfolge.",
    items: ["Einen Test für die neue Funktionalität schreiben", "Test ausführen – er schlägt fehl (Red)", "Minimalen Produktivcode schreiben, bis der Test besteht (Green)", "Code verbessern/aufräumen, Tests bleiben grün (Refactor)", "Mit dem nächsten Test beginnen"],
    solution: "Red → Green → Refactor: Test schreiben, fehlschlagen lassen, minimal implementieren, refaktorisieren, wiederholen.",
    explanation: "Vorteile von TDD: hohe Testabdeckung, testbares Design, schnelle Rückmeldung, Tests als lebende Dokumentation.",
    tags: ["TDD"]
  },
  {
    id: "ga1-qualitaet-015", part: "GA1", topic: "ga1-qualitaet", type: "text", difficulty: 2, points: 5,
    context: "Die Klasse <code>BestellService</code> eines Onlineshops ruft beim Abschluss einer Bestellung den externen Zahlungsdienstleister über eine REST-API auf und speichert die Bestellung anschließend in der Datenbank. Für die Klasse sollen Unit-Tests geschrieben werden.",
    question: "Erläutern Sie, was <b>Mocking</b> ist, und begründen Sie <b>drei</b> Vorteile des Einsatzes von Mock-Objekten in diesem Fall.",
    solution: `<b>Mocking</b> (2 P.): Abhängigkeiten der zu testenden Einheit (hier: Zahlungs-API-Client, Repository/Datenbank) werden durch <b>Attrappen (Mock-Objekte)</b> ersetzt, die ein vorher festgelegtes Verhalten zeigen (z. B. „Zahlung erfolgreich“/„Zahlung abgelehnt“) und prüfen können, ob und wie sie aufgerufen wurden (z. B. mit Mockito).<br>
<b>Vorteile</b> (je 1 P.):<ul><li><b>Isolation</b>: Es wird nur die Logik von <code>BestellService</code> getestet; Fehler lassen sich eindeutig lokalisieren.</li><li><b>Unabhängigkeit/Geschwindigkeit</b>: keine Netzwerkverbindung, keine echte Datenbank nötig → schnelle, reproduzierbare (deterministische) Tests, auch in der CI.</li><li><b>Fehlerfälle simulierbar</b>: Timeouts, abgelehnte Zahlungen oder Datenbankfehler können gezielt erzeugt werden.</li><li><b>Keine Kosten/Seiteneffekte</b>: Es werden keine echten Zahlungen ausgelöst.</li></ul>`,
    keywords: ["attrappe|ersatz|ersetzt|platzhalter", "abhängigkeit", "isol", "schnell|geschwindigkeit", "reproduzierbar|deterministisch|unabhängig", "fehlerfall|timeout|simul", "keine echte|keine kosten|seiteneffekt", "mockito"],
    tags: ["Mocking", "Unit-Test"]
  },
  {
    id: "ga1-qualitaet-016", part: "GA1", topic: "ga1-qualitaet", type: "multi", difficulty: 2, points: 4,
    question: "Welche Aussagen zu <b>statischen</b> Qualitätssicherungsmaßnahmen sind richtig?",
    options: [
      "Bei der statischen Codeanalyse wird der Quellcode untersucht, ohne das Programm auszuführen.",
      "Ein Code-Review kann Fehler finden, bevor Tests überhaupt geschrieben wurden.",
      "Statische Analyse-Werkzeuge wie SonarQube erkennen u. a. Code-Duplikate, Code Smells und potenzielle Sicherheitslücken.",
      "Ein Lasttest ist eine statische Prüfmethode.",
      "Code-Reviews dienen auch dem Wissenstransfer im Team.",
      "Statische Analyse ersetzt dynamische Tests vollständig."
    ],
    correct: [0, 1, 2, 4],
    solution: "Statische Verfahren (Reviews, Inspektionen, Walkthroughs, statische Analyse/Linter) prüfen Artefakte <b>ohne Ausführung</b>. Sie finden Fehler früh und fördern den Wissenstransfer. Ein Lasttest ist dynamisch (Programm läuft). Statische Analyse <b>ergänzt</b> Tests, ersetzt sie aber nicht (z. B. Laufzeit- und Logikfehler).",
    tags: ["Code-Review", "statische Analyse"]
  },
  {
    id: "ga1-qualitaet-017", part: "GA1", topic: "ga1-qualitaet", type: "code", difficulty: 3, points: 6, lang: "java",
    context: `Bei einem Code-Review finden Sie folgende Methode:
<pre><code>public double calc(double a, int t) {
    double x;
    // berechne
    if (t == 1) { x = a * 0.19; }
    else if (t == 2) { x = a * 0.07; }
    else { x = 0; }
    return a + x;
}</code></pre>`,
    question: "Nennen Sie <b>drei</b> Verstöße gegen Clean-Code-Prinzipien und schreiben Sie die Methode verbessert neu (Java oder Pseudocode).",
    starter: "Verstöße:\n1.\n2.\n3.\n\nVerbesserter Code:\n",
    solution: `<b>Verstöße</b> (je 1 P.):<ol><li><b>Nichtssagende Namen</b> (<code>calc</code>, <code>a</code>, <code>t</code>, <code>x</code>) – die Absicht ist nicht erkennbar.</li><li><b>Magische Zahlen</b> (1, 2, 0.19, 0.07) statt benannter Konstanten bzw. Enum.</li><li><b>Überflüssiger Kommentar</b> („berechne“) ohne Mehrwert; guter Code erklärt sich selbst.</li><li>Typcodes als <code>int</code> → fehleranfällig (z. B. t = 3 wird stillschweigend steuerfrei); Geldbeträge besser mit <code>BigDecimal</code>.</li></ol>
<b>Verbesserter Code</b> (3 P.):
<pre><code>public enum Steuersatz {
    REGULAER(new BigDecimal("0.19")),
    ERMAESSIGT(new BigDecimal("0.07")),
    STEUERFREI(BigDecimal.ZERO);

    private final BigDecimal satz;
    Steuersatz(BigDecimal satz) { this.satz = satz; }
    public BigDecimal getSatz() { return satz; }
}

public BigDecimal berechneBruttopreis(BigDecimal nettopreis, Steuersatz steuersatz) {
    BigDecimal steuerbetrag = nettopreis.multiply(steuersatz.getSatz());
    return nettopreis.add(steuerbetrag);
}</code></pre>`,
    explanation: "Weitere Clean-Code-Prinzipien: DRY, KISS, Single Responsibility, kleine Methoden, frühe Rückgabe statt tiefer Verschachtelung.",
    keywords: ["name|bezeichner|sprechend", "magisch|magic|konstante", "kommentar", "enum", "brutto|netto|steuer", "bigdecimal|double", "final|static"],
    tags: ["Clean Code", "Code-Review"]
  },
  {
    id: "ga1-qualitaet-018", part: "GA1", topic: "ga1-qualitaet", type: "mc", difficulty: 2, points: 2,
    question: "Wie verhalten sich <b>Qualitätsmanagement (QM)</b> und <b>Qualitätssicherung (QS)</b> zueinander?",
    options: [
      "QS und QM sind Synonyme.",
      "QS ist ein Teilbereich des QM; QM umfasst zusätzlich Qualitätspolitik, -planung, -lenkung und -verbesserung.",
      "QM ist ein Teilbereich der QS und betrifft nur Softwaretests.",
      "QS findet ausschließlich nach der Auslieferung statt."
    ],
    correct: [1],
    solution: "Nach ISO 9000 ist das <b>Qualitätsmanagement</b> die übergeordnete, organisationsweite Steuerung (Politik, Ziele, Planung, Lenkung, Sicherung, Verbesserung – z. B. PDCA-Zyklus). Die <b>Qualitätssicherung</b> ist ein Teil davon und umfasst konstruktive (Richtlinien, Schulungen, Vorgehensmodell) und analytische (Tests, Reviews) Maßnahmen.",
    tags: ["Qualitätsmanagement", "Qualitätssicherung"]
  },
  {
    id: "ga1-qualitaet-019", part: "GA1", topic: "ga1-qualitaet", type: "text", difficulty: 2, points: 6,
    context: "Die neue Zeiterfassungssoftware für die Stadtwerke Lindau ist fertiggestellt. Morgen findet der Abnahmetermin mit dem Kunden statt. Ihre Projektleiterin bittet Sie, ein <b>Abnahmeprotokoll</b> vorzubereiten.",
    question: "Nennen Sie <b>fünf</b> Inhalte eines Abnahmeprotokolls und erläutern Sie <b>eine</b> rechtliche Folge der Abnahme.",
    solution: `<b>Inhalte</b> (je 1 P.):<ul><li>Projekt/Vertragsgegenstand, Auftraggeber und Auftragnehmer</li><li>Datum, Ort, Teilnehmer der Abnahme</li><li>Geprüfte Leistungen/Testfälle bzw. Abnahmekriterien mit Ergebnis</li><li>Festgestellte <b>Mängel</b> mit Beschreibung, <b>Fehlerklasse</b> (z. B. kritisch/schwer/leicht) und Frist zur Beseitigung</li><li>Abnahmeergebnis: abgenommen / abgenommen unter Vorbehalt (mit Mängeln) / Abnahme verweigert</li><li>Unterschriften beider Parteien</li></ul>
<b>Rechtliche Folge</b> (1 P.), z. B.: Mit der Abnahme beginnt die <b>Gewährleistungsfrist</b>; die <b>Vergütung wird fällig</b>; die <b>Beweislast</b> für Mängel geht auf den Auftraggeber über; die Gefahr geht auf den Auftraggeber über (Gefahrübergang).`,
    keywords: ["datum", "teilnehmer|beteiligte", "mängel|fehler", "fehlerklasse|schwere|kritisch", "frist", "ergebnis|abgenommen|vorbehalt|verweigert", "unterschrift", "gewährleistung|vergütung|fällig|beweislast|gefahr"],
    tags: ["Abnahme", "Abnahmeprotokoll"]
  },
  {
    id: "ga1-qualitaet-020", part: "GA1", topic: "ga1-qualitaet", type: "mc", difficulty: 2, points: 2,
    context: "Ein Entwickler verwechselt beim Programmieren &lt; mit &lt;= . Dadurch enthält der Code einen falschen Vergleich. Beim Kunden führt das dazu, dass Bestellungen mit genau 100 € keinen Rabatt erhalten.",
    question: "Welche Zuordnung der Fachbegriffe ist korrekt?",
    options: [
      "Verwechslung = Fehlerwirkung; falscher Vergleich = Fehlhandlung; fehlender Rabatt = Fehlerzustand",
      "Verwechslung = Fehlhandlung; falscher Vergleich = Fehlerzustand (Defekt); fehlender Rabatt = Fehlerwirkung",
      "Verwechslung = Fehlerzustand; falscher Vergleich = Fehlerwirkung; fehlender Rabatt = Fehlhandlung",
      "Alle drei Begriffe bezeichnen dasselbe."
    ],
    correct: [1],
    solution: "<b>Fehlhandlung</b> (error, menschlicher Irrtum) → führt zum <b>Fehlerzustand</b> (defect/bug im Code) → der sich bei Ausführung als <b>Fehlerwirkung</b> (failure, sichtbares Fehlverhalten) zeigen kann.",
    tags: ["Fehlerklassen", "Begriffe"]
  },
  {
    id: "ga1-qualitaet-021", part: "GA1", topic: "ga1-qualitaet", type: "multi", difficulty: 2, points: 3,
    question: "Welche der folgenden Kennzahlen sind gängige <b>Softwaremetriken</b> zur Beurteilung der Codequalität?",
    options: ["Zyklomatische Komplexität (McCabe)", "Testabdeckung (Code Coverage)", "Fehlerdichte (Fehler je 1.000 Codezeilen)", "Eigenkapitalquote", "Lines of Code (LOC)", "Fluktuationsrate"],
    correct: [0, 1, 2, 4],
    solution: "Softwaremetriken: McCabe-Komplexität, Testabdeckung, Fehlerdichte, LOC, außerdem z. B. Kopplung/Kohäsion, Duplikationsrate. Eigenkapitalquote und Fluktuationsrate sind betriebswirtschaftliche bzw. personalwirtschaftliche Kennzahlen.",
    explanation: "Metriken sind Indikatoren, keine Ziele an sich: 100 % Coverage garantiert keine fehlerfreie Software (Tests ohne sinnvolle Assertions).",
    tags: ["Metriken"]
  }
);

// ===================== ga1-ergonomie =====================
AP2.questions.push(
  {
    id: "ga1-ergonomie-001", part: "GA1", topic: "ga1-ergonomie", type: "mc", difficulty: 2, points: 2,
    context: "In einer Buchhaltungssoftware kann ein Benutzer einen laufenden Datenimport jederzeit über die Schaltfläche „Pausieren“ anhalten und später fortsetzen oder ganz abbrechen.",
    question: "Welches Interaktionsprinzip der DIN EN ISO 9241-110 wird hier vorrangig umgesetzt?",
    options: ["Selbstbeschreibungsfähigkeit", "Steuerbarkeit", "Erwartungskonformität", "Benutzerbindung"],
    correct: [1],
    solution: "<b>Steuerbarkeit</b>: Der Benutzer kann Ablauf, Richtung und Geschwindigkeit der Interaktion beeinflussen (starten, pausieren, abbrechen, fortsetzen), bis das Ziel erreicht ist.",
    explanation: "Verwechslungsgefahr: Eine Fortschrittsanzeige wäre Selbstbeschreibungsfähigkeit, das Eingreifen in den Ablauf ist Steuerbarkeit.",
    tags: ["ISO 9241-110"]
  },
  {
    id: "ga1-ergonomie-002", part: "GA1", topic: "ga1-ergonomie", type: "multi", difficulty: 2, points: 4,
    question: "Welche der folgenden Begriffe sind Interaktionsprinzipien der aktuellen <b>DIN EN ISO 9241-110:2020</b>?",
    options: ["Aufgabenangemessenheit", "Erlernbarkeit", "Robustheit gegen Benutzungsfehler", "Individualisierbarkeit", "Benutzerbindung", "Fehlertoleranz", "Erwartungskonformität"],
    correct: [0, 1, 2, 4, 6],
    solution: "Die 7 Prinzipien (2020): Aufgabenangemessenheit, Selbstbeschreibungsfähigkeit, Erwartungskonformität, <b>Erlernbarkeit</b>, Steuerbarkeit, <b>Robustheit gegen Benutzungsfehler</b>, <b>Benutzerbindung</b>.<br><i>Fehlertoleranz</i> (→ Robustheit gegen Benutzungsfehler) und <i>Individualisierbarkeit</i> (als eigenes Prinzip entfallen, Aspekte u. a. in Steuerbarkeit aufgegangen) sind Bezeichnungen der alten Fassung (2006); ebenso <i>Lernförderlichkeit</i> (→ Erlernbarkeit).",
    explanation: "In der IHK-Prüfung werden häufig noch die alten Begriffe verwendet – beide Fassungen kennen!",
    tags: ["ISO 9241-110"]
  },
  {
    id: "ga1-ergonomie-003", part: "GA1", topic: "ga1-ergonomie", type: "text", difficulty: 2, points: 6,
    context: "Die Gemeinde Talheim lässt ein Online-Formular zur Beantragung eines Anwohnerparkausweises entwickeln. Viele Antragstellende nutzen das Formular nur einmal im Jahr.",
    question: "Erläutern Sie <b>drei</b> Interaktionsprinzipien der DIN EN ISO 9241-110 und nennen Sie zu jedem Prinzip eine konkrete Gestaltungsmaßnahme für dieses Formular.",
    solution: `Je Prinzip 1 P. Erläuterung + 1 P. Maßnahme, z. B.:<ul>
<li><b>Aufgabenangemessenheit</b>: Das System unterstützt die Erledigung der Aufgabe effektiv und effizient, ohne unnötige Schritte. → Nur notwendige Felder abfragen, Adresse aus dem Melderegister vorbelegen, Kennzeichen-Format vorgeben.</li>
<li><b>Selbstbeschreibungsfähigkeit</b>: Der Benutzer erkennt jederzeit, wo er sich befindet und was er tun kann/muss. → Fortschrittsanzeige „Schritt 2 von 4“, eindeutige Feldbeschriftungen, Pflichtfelder markieren, Hilfetexte/Tooltips („Kennzeichen ohne Leerzeichen“).</li>
<li><b>Erwartungskonformität</b>: Das System verhält sich konsistent und entspricht den Erfahrungen und Konventionen der Benutzer. → „Weiter“-Button immer unten rechts, übliche Datumsformate (TT.MM.JJJJ), Gestaltung wie andere Formulare des Portals.</li>
<li><b>Robustheit gegen Benutzungsfehler</b>: Fehler werden vermieden bzw. lassen sich mit geringem Aufwand korrigieren. → Eingabeprüfung direkt am Feld mit verständlicher Meldung, Zusammenfassung vor dem Absenden mit Korrekturmöglichkeit.</li>
<li><b>Erlernbarkeit</b>: Unterstützung beim Kennenlernen → Ausfüllhilfe/Beispielwerte, da selten genutzt.</li>
<li><b>Steuerbarkeit</b>: Zwischenspeichern, „Zurück“ ohne Datenverlust.</li></ul>`,
    keywords: ["aufgabenangemessen", "selbstbeschreibungsfähig", "erwartungskonform", "robustheit|fehlertoleranz", "steuerbar|erlernbar|lernförderlich", "pflichtfeld|beschriftung|label", "fortschritt", "prüfung|validierung|fehlermeldung"],
    tags: ["ISO 9241-110", "Formulargestaltung"]
  },
  {
    id: "ga1-ergonomie-004", part: "GA1", topic: "ga1-ergonomie", type: "mc", difficulty: 1, points: 2,
    question: "Wie lautet die aktuelle Bezeichnung des früheren Grundsatzes <b>„Fehlertoleranz“</b> in der DIN EN ISO 9241-110:2020?",
    options: ["Benutzerbindung", "Robustheit gegen Benutzungsfehler", "Steuerbarkeit", "Fehlervermeidbarkeit"],
    correct: [1],
    solution: "Aus „Fehlertoleranz“ wurde <b>„Robustheit gegen Benutzungsfehler“</b>. Aus „Lernförderlichkeit“ wurde „Erlernbarkeit“; neu hinzu kam „Benutzerbindung“.",
    tags: ["ISO 9241-110"]
  },
  {
    id: "ga1-ergonomie-005", part: "GA1", topic: "ga1-ergonomie", type: "text", difficulty: 2, points: 6,
    context: "Für eine neue Reisekostenabrechnungs-App soll vor dem Rollout die <b>Gebrauchstauglichkeit</b> nach DIN EN ISO 9241-11 überprüft werden.",
    question: "Nennen und erläutern Sie die <b>drei Kriterien</b> der Gebrauchstauglichkeit nach ISO 9241-11 und geben Sie für jedes Kriterium eine messbare Größe an, die in einem Usability-Test erhoben werden kann.",
    solution: `Je Kriterium 2 P. (Erläuterung + Messgröße):<ul>
<li><b>Effektivität</b>: Genauigkeit und Vollständigkeit, mit der Benutzer ihr Ziel erreichen. Messgröße: <b>Erfolgsquote</b> (Anteil der Testpersonen, die eine Reisekostenabrechnung korrekt und vollständig einreichen), Anzahl Fehler.</li>
<li><b>Effizienz</b>: eingesetzter Aufwand (Zeit, Klicks, Kosten) im Verhältnis zum erreichten Ergebnis. Messgröße: <b>Bearbeitungszeit</b> pro Abrechnung, Anzahl Klicks/Seitenwechsel.</li>
<li><b>Zufriedenstellung</b>: Ausmaß, in dem die Nutzung positiv erlebt wird und Bedürfnisse/Erwartungen erfüllt werden, ohne Beeinträchtigung. Messgröße: standardisierter Fragebogen (z. B. <b>SUS-Score</b>, UEQ), Bewertung auf einer Skala.</li></ul>`,
    keywords: ["effektiv", "effizien", "zufrieden", "erfolgsquote|ziel erreicht|vollständig", "zeit|klick", "fragebogen|sus|skala|bewertung", "aufwand", "fehler"],
    tags: ["ISO 9241-11", "Usability"]
  },
  {
    id: "ga1-ergonomie-006", part: "GA1", topic: "ga1-ergonomie", type: "numeric", difficulty: 1, points: 2,
    context: "In einem Usability-Test sollten 12 Testpersonen in einer Banking-App eine SEPA-Überweisung anlegen. 9 Personen haben die Aufgabe vollständig und korrekt gelöst, die übrigen haben abgebrochen oder falsche Daten übermittelt.",
    question: "Berechnen Sie die <b>Effektivität</b> (Erfolgsquote) in Prozent.",
    answer: 75, tolerance: 0.01, unit: "%",
    solution: "Effektivität = erfolgreiche Testpersonen / alle Testpersonen × 100 % = 9 / 12 × 100 % = <b>75 %</b>",
    explanation: "Die Erfolgsquote misst die Effektivität. Die benötigte Zeit wäre ein Maß für die Effizienz.",
    tags: ["ISO 9241-11", "Usability-Test"]
  },
  {
    id: "ga1-ergonomie-007", part: "GA1", topic: "ga1-ergonomie", type: "numeric", difficulty: 3, points: 4,
    context: "Nach einem Usability-Test füllt eine Testperson den <b>System Usability Scale</b>-Fragebogen (SUS, 10 Aussagen, Skala 1–5) aus. Berechnungsregel: Bei ungeraden Aussagen (1, 3, 5, 7, 9) zählt <i>Antwort − 1</i>, bei geraden Aussagen (2, 4, 6, 8, 10) zählt <i>5 − Antwort</i>. Die Summe wird mit 2,5 multipliziert.<br>Antworten der Testperson (Aussage 1–10): <b>4, 2, 5, 1, 4, 2, 5, 2, 4, 1</b>",
    question: "Berechnen Sie den <b>SUS-Score</b> dieser Testperson.",
    answer: 85, tolerance: 0.01, unit: "Punkte",
    solution: "Ungerade Aussagen: (4−1)+(5−1)+(4−1)+(5−1)+(4−1) = 3+4+3+4+3 = 17<br>Gerade Aussagen: (5−2)+(5−1)+(5−2)+(5−2)+(5−1) = 3+4+3+3+4 = 17<br>Summe = 34 → SUS = 34 × 2,5 = <b>85</b>",
    explanation: "Der SUS-Score liegt zwischen 0 und 100; Werte über ca. 68 gelten als überdurchschnittlich. Er misst die Zufriedenstellung (subjektive Gebrauchstauglichkeit).",
    tags: ["Usability-Test", "SUS"]
  },
  {
    id: "ga1-ergonomie-008", part: "GA1", topic: "ga1-ergonomie", type: "mc", difficulty: 1, points: 2,
    question: "Welches <b>Kontrastverhältnis</b> fordert WCAG 2.2 auf Konformitätsstufe <b>AA</b> mindestens für normalen Fließtext?",
    options: ["2:1", "3:1", "4,5:1", "7:1"],
    correct: [2],
    solution: "Stufe AA: normaler Text mindestens <b>4,5:1</b>; großer Text (ab 18 pt bzw. 14 pt fett) sowie UI-Komponenten und Grafiken mindestens 3:1. Stufe AAA: 7:1 für normalen Text.",
    tags: ["WCAG", "Kontrast"]
  },
  {
    id: "ga1-ergonomie-009", part: "GA1", topic: "ga1-ergonomie", type: "multi", difficulty: 1, points: 2,
    question: "Welche Begriffe gehören zu den vier Grundprinzipien der <b>WCAG</b>?",
    options: ["Wahrnehmbar", "Bedienbar", "Bezahlbar", "Verständlich", "Robust", "Responsiv"],
    correct: [0, 1, 3, 4],
    solution: "Die WCAG basieren auf <b>POUR</b>: Perceivable (wahrnehmbar), Operable (bedienbar), Understandable (verständlich), Robust (robust – kompatibel mit Hilfstechnologien wie Screenreadern).",
    tags: ["WCAG"]
  },
  {
    id: "ga1-ergonomie-010", part: "GA1", topic: "ga1-ergonomie", type: "text", difficulty: 3, points: 5,
    context: "Die Outdoor-Profi GmbH (45 Mitarbeitende, 9 Mio. € Jahresumsatz) betreibt einen Onlineshop für Endkunden. Der Geschäftsführer meint: „Barrierefreiheit betrifft doch nur Behörden.“",
    question: "Nehmen Sie Stellung zu dieser Aussage. Gehen Sie dabei auf die <b>BITV 2.0</b> und das <b>Barrierefreiheitsstärkungsgesetz (BFSG)</b> ein.",
    solution: `<b>BITV 2.0</b> (2 P.): Die Barrierefreie-Informationstechnik-Verordnung gilt für <b>öffentliche Stellen des Bundes</b> (Websites, mobile Anwendungen, Intranet, elektronische Verwaltungsabläufe). Sie verweist auf die harmonisierte Norm EN 301 549 (≈ WCAG AA) und verlangt u. a. eine Erklärung zur Barrierefreiheit und einen Feedback-Mechanismus. Insoweit hat der Geschäftsführer für die BITV recht.<br>
<b>BFSG</b> (3 P.): Das BFSG setzt den European Accessibility Act (EU-Richtlinie 2019/882) um und gilt seit dem <b>28. Juni 2025</b> auch für <b>private Wirtschaftsakteure</b>, die bestimmte Produkte und Dienstleistungen für Verbraucher anbieten – ausdrücklich auch für <b>Dienstleistungen im elektronischen Geschäftsverkehr</b> (Onlineshops). Ausgenommen sind nur Kleinstunternehmen (weniger als 10 Beschäftigte <i>und</i> höchstens 2 Mio. € Jahresumsatz bzw. Bilanzsumme). Die Outdoor-Profi GmbH fällt <b>nicht</b> unter die Ausnahme und muss ihren Shop barrierefrei gestalten (Orientierung an WCAG 2.x AA/EN 301 549), Informationen zur Barrierefreiheit bereitstellen; bei Verstößen drohen Maßnahmen der Marktüberwachung und Bußgelder. Die Aussage ist daher <b>falsch</b>.`,
    keywords: ["öffentlich|behörde|bund", "bfsg|barrierefreiheitsstärkungsgesetz", "2025|28. juni|28.06", "privat|unternehmen|wirtschaft", "onlineshop|e-commerce|elektronischer geschäftsverkehr", "kleinstunternehmen|10 beschäftigte|2 mio", "wcag|en 301 549", "bußgeld|marktüberwachung", "falsch"],
    tags: ["BITV", "BFSG", "Barrierefreiheit"]
  },
  {
    id: "ga1-ergonomie-011", part: "GA1", topic: "ga1-ergonomie", type: "text", difficulty: 2, points: 4,
    context: "Ein Kontaktformular auf einer Website besteht aus Eingabefeldern mit grauem Platzhaltertext („Name“, „E-Mail“) ohne sichtbare Beschriftung. Fehlerhafte Felder werden ausschließlich durch einen roten Rahmen markiert. Das Absenden erfolgt über ein Bild ohne Alternativtext.",
    question: "Nennen Sie <b>vier</b> Maßnahmen, um dieses Formular barrierefrei zu gestalten, und begründen Sie jeweils kurz.",
    solution: `Je Maßnahme mit Begründung 1 P.:<ul>
<li>Jedem Feld ein sichtbares, programmatisch verknüpftes <b>&lt;label&gt;</b> zuordnen – Platzhalter verschwinden bei Eingabe und werden von Screenreadern nicht zuverlässig vorgelesen; meist auch zu kontrastarm.</li>
<li>Fehler nicht nur über <b>Farbe</b> kennzeichnen, sondern zusätzlich mit <b>Text und Icon</b> („Bitte gültige E-Mail-Adresse eingeben“) direkt am Feld, per aria-describedby/aria-live verknüpft – farbenblinde und blinde Nutzer erkennen sonst den Fehler nicht.</li>
<li>Absende-Schaltfläche als echtes <b>&lt;button&gt;</b> mit Text bzw. <b>Alternativtext</b> („Nachricht senden“) – sonst ist der Zweck für Screenreader unbekannt.</li>
<li><b>Tastaturbedienbarkeit</b> mit logischer Tab-Reihenfolge und sichtbarem Fokus sicherstellen – für Nutzer ohne Maus.</li>
<li>Ausreichender <b>Kontrast</b> (4,5:1) für Text und 3:1 für Feldrahmen; Pflichtfelder textlich kennzeichnen; Autocomplete-Attribute (z. B. autocomplete="email") setzen.</li></ul>`,
    keywords: ["label|beschriftung", "screenreader", "farbe|nicht nur rot|text", "alternativtext|alt", "button|schaltfläche", "tastatur|fokus|tab", "kontrast", "aria"],
    tags: ["Barrierefreiheit", "Formulargestaltung"]
  },
  {
    id: "ga1-ergonomie-012", part: "GA1", topic: "ga1-ergonomie", type: "mc", difficulty: 3, points: 2,
    question: "Welche Anforderung wurde mit <b>WCAG 2.2</b> neu eingeführt?",
    options: [
      "Bilder benötigen einen Alternativtext.",
      "Interaktive Ziele (z. B. Buttons) müssen mindestens 24 × 24 CSS-Pixel groß sein oder ausreichend Abstand haben.",
      "Videos benötigen Untertitel.",
      "Die Sprache der Seite muss im HTML ausgezeichnet sein."
    ],
    correct: [1],
    solution: "<b>2.5.8 Target Size (Minimum)</b> (Stufe AA) ist neu in WCAG 2.2. Weitere Neuerungen: Fokus nicht verdeckt, Alternativen zu Ziehbewegungen, konsistente Hilfe, keine redundante Eingabe, barrierefreie Authentifizierung. Alternativtexte, Untertitel und Sprachauszeichnung gibt es bereits seit WCAG 2.0.",
    tags: ["WCAG 2.2"]
  },
  {
    id: "ga1-ergonomie-013", part: "GA1", topic: "ga1-ergonomie", type: "order", difficulty: 1, points: 3,
    question: "Ordnen Sie die Entwurfsartefakte im UI-Design nach zunehmendem <b>Detaillierungsgrad (Fidelity)</b>.",
    items: ["Handskizze/Scribble", "Wireframe (Struktur, Graustufen, Platzhalter)", "Mockup (statisch, mit Farben, Schriften, Bildern)", "Klickbarer Prototyp (interaktiv)", "Fertige Benutzeroberfläche im Produkt"],
    solution: "Scribble → Wireframe → Mockup → interaktiver Prototyp → Produkt. Je früher, desto billiger sind Änderungen.",
    tags: ["Wireframe", "Mockup", "Prototyp"]
  },
  {
    id: "ga1-ergonomie-014", part: "GA1", topic: "ga1-ergonomie", type: "text", difficulty: 2, points: 6,
    context: "Ein Fahrradverleih möchte eine App zur Ausleihe von E-Bikes. Bevor programmiert wird, sollen die Oberflächen mit dem Kunden abgestimmt werden.",
    question: "Unterscheiden Sie <b>Wireframe</b>, <b>Mockup</b> und <b>Prototyp</b> und erläutern Sie, wofür Sie die jeweiligen Artefakte im Projektverlauf einsetzen würden.",
    solution: `<b>Wireframe</b> (2 P.): schematischer, grober Entwurf (Low-Fidelity) – zeigt Struktur, Anordnung und Informationsarchitektur mit Platzhaltern, ohne Farben/Bilder. Einsatz: früh, um Aufbau und Inhalte der Screens (z. B. Karte mit Standorten, Buchungsbutton) schnell und günstig mit dem Kunden abzustimmen.<br>
<b>Mockup</b> (2 P.): statischer, visuell detaillierter Entwurf (Mid/High-Fidelity) mit Farben, Typografie, Logos und Bildern – nicht interaktiv. Einsatz: Abstimmung des visuellen Designs/Corporate Design des Verleihs.<br>
<b>Prototyp</b> (2 P.): interaktives, klickbares Modell (z. B. in Figma), das Abläufe simuliert. Einsatz: Usability-Tests mit echten Nutzern (Ausleihe durchspielen), Validierung der Abläufe vor der Implementierung; ggf. evolutionärer Prototyp als Basis der Entwicklung.`,
    keywords: ["wireframe", "struktur|layout|anordnung", "low-fidelity|grob|schematisch|platzhalter", "mockup", "farbe|design|visuell|statisch", "prototyp", "interaktiv|klickbar", "usability-test|testen|nutzer"],
    tags: ["Wireframe", "Mockup", "Prototyp"]
  },
  {
    id: "ga1-ergonomie-015", part: "GA1", topic: "ga1-ergonomie", type: "order", difficulty: 2, points: 4,
    question: "Bringen Sie die Schritte eines <b>Usability-Tests</b> in eine sinnvolle Reihenfolge.",
    items: [
      "Testziele festlegen und Zielgruppe/Testpersonen auswählen",
      "Realistische Testaufgaben (Szenarien) und Messkriterien erstellen",
      "Testumgebung vorbereiten und Pilottest durchführen",
      "Test durchführen (Thinking Aloud, Beobachtung, Aufzeichnung)",
      "Abschlussbefragung (z. B. SUS-Fragebogen)",
      "Ergebnisse auswerten, Probleme priorisieren und Verbesserungen ableiten"
    ],
    solution: "Planung (Ziele, Testpersonen) → Aufgaben/Kriterien → Vorbereitung/Pilot → Durchführung → Befragung → Auswertung und Maßnahmen.",
    tags: ["Usability-Test"]
  },
  {
    id: "ga1-ergonomie-016", part: "GA1", topic: "ga1-ergonomie", type: "text", difficulty: 3, points: 8,
    context: `Für die Registrierung in einem Kundenportal liegt folgender Entwurf vor:
<ul><li>15 Eingabefelder auf einer Seite, ohne Gruppierung, u. a. Faxnummer und Hobbys als Pflichtfelder</li>
<li>Geburtsdatum als freies Textfeld ohne Formatangabe</li>
<li>Fehlermeldungen erscheinen erst nach dem Absenden gesammelt am Seitenanfang: „Fehler in Formular“</li>
<li>Nach einem Fehler sind alle bereits eingegebenen Passwörter und das Land wieder leer</li>
<li>Die Buttons „Abbrechen“ (blau, groß) und „Registrieren“ (grau, klein) sind gegenüber den übrigen Formularen des Portals vertauscht angeordnet</li></ul>`,
    question: "Beurteilen Sie den Entwurf. Nennen Sie <b>vier</b> Mängel, ordnen Sie jedem Mangel das verletzte Interaktionsprinzip der DIN EN ISO 9241-110 zu und schlagen Sie jeweils eine Verbesserung vor.",
    solution: `Je Mangel 2 P. (Prinzip + Verbesserung):<ul>
<li><b>Unnötige Pflichtfelder</b> (Fax, Hobbys), keine Gruppierung → <b>Aufgabenangemessenheit</b>: nur benötigte Felder abfragen, optionale Felder kennzeichnen, logisch gruppieren (Persönliche Daten, Zugangsdaten) oder mehrstufig mit Fortschrittsanzeige.</li>
<li><b>Geburtsdatum ohne Formatangabe</b> → <b>Selbstbeschreibungsfähigkeit</b> und <b>Robustheit gegen Benutzungsfehler</b>: Formathinweis „TT.MM.JJJJ“, Datepicker bzw. drei Auswahlfelder.</li>
<li><b>Unspezifische, gesammelte Fehlermeldung nach dem Absenden</b> → <b>Robustheit gegen Benutzungsfehler</b> (und Selbstbeschreibungsfähigkeit): Inline-Validierung direkt am Feld mit konkretem Hinweis („Bitte eine gültige PLZ mit 5 Ziffern eingeben“).</li>
<li><b>Eingaben gehen nach Fehler verloren</b> → <b>Robustheit gegen Benutzungsfehler</b>/Steuerbarkeit: alle Eingaben (außer ggf. Passwort aus Sicherheitsgründen – dann klarer Hinweis) erhalten, Fokus auf das erste fehlerhafte Feld setzen.</li>
<li><b>Vertauschte, inkonsistente Buttons</b>, primäre Aktion unauffällig → <b>Erwartungskonformität</b>: konsistente Anordnung wie in allen Formularen des Portals, primäre Aktion „Registrieren“ hervorgehoben.</li></ul>`,
    keywords: ["aufgabenangemessen", "pflichtfeld|unnötig", "selbstbeschreibungsfähig", "format|datepicker", "robustheit|fehlertoleranz", "inline|am feld|konkret", "erhalten|verloren", "erwartungskonform|konsistent"],
    tags: ["ISO 9241-110", "Formulargestaltung"]
  },
  {
    id: "ga1-ergonomie-017", part: "GA1", topic: "ga1-ergonomie", type: "code", difficulty: 2, points: 5,
    context: `Ausschnitt aus einem Anmeldeformular:
<pre><code>&lt;div&gt;E-Mail&lt;/div&gt;
&lt;input type="text" placeholder="E-Mail"&gt;
&lt;span style="color:red"&gt;Ungültig&lt;/span&gt;
&lt;img src="senden.png" onclick="absenden()"&gt;</code></pre>`,
    question: "Überarbeiten Sie den HTML-Ausschnitt so, dass er <b>barrierefrei</b> ist (korrekte Beschriftung, passender Eingabetyp, verknüpfte und nicht nur farbliche Fehlermeldung, bedienbare Schaltfläche). Erläutern Sie Ihre Änderungen kurz.",
    starter: "<!-- überarbeitetes HTML -->\n",
    solution: `<pre><code>&lt;label for="email"&gt;E-Mail-Adresse (Pflichtfeld)&lt;/label&gt;
&lt;input type="email" id="email" name="email" autocomplete="email"
       required aria-invalid="true" aria-describedby="email-fehler"&gt;
&lt;p id="email-fehler" class="fehler" role="alert"&gt;
  ⚠ Fehler: Bitte geben Sie eine gültige E-Mail-Adresse ein, z. B. name@beispiel.de
&lt;/p&gt;
&lt;button type="submit"&gt;Anmelden&lt;/button&gt;</code></pre>
<b>Erläuterung</b> (je 1 P.):<ul><li><code>&lt;label for&gt;</code> verknüpft die Beschriftung programmatisch mit dem Feld (Screenreader, größere Klickfläche).</li><li><code>type="email"</code> + <code>autocomplete</code>: passende Bildschirmtastatur, Browser-Validierung, Autofill.</li><li><code>aria-describedby</code>/<code>aria-invalid</code>/<code>role="alert"</code>: Fehlermeldung wird vorgelesen; Text + Icon statt nur roter Farbe, konkrete Handlungsanweisung.</li><li>Echtes <code>&lt;button&gt;</code> statt Bild mit onclick: per Tastatur fokussier- und auslösbar, hat zugänglichen Namen.</li><li><code>required</code> und Text „Pflichtfeld“ kennzeichnen Pflichtangaben.</li></ul>`,
    explanation: "Grundsatz: Zuerst semantisches HTML nutzen („No ARIA is better than bad ARIA“), ARIA nur ergänzend.",
    keywords: ["label", "for=|for =", "type=\"email\"|type=email", "aria-describedby", "button", "required", "role=\"alert\"|aria-live|aria-invalid", "autocomplete"],
    tags: ["Barrierefreiheit", "HTML", "Formulargestaltung"]
  },
  {
    id: "ga1-ergonomie-018", part: "GA1", topic: "ga1-ergonomie", type: "text", difficulty: 2, points: 5,
    context: "Ein Restaurant möchte, dass seine neue Website mit Online-Reservierung auf Smartphones, Tablets und Desktop-PCs gleichermaßen gut nutzbar ist. Rund 70 % der Besucher kommen über Smartphones.",
    question: "Erläutern Sie das Konzept <b>Responsive Design</b> sowie den Ansatz <b>Mobile First</b> und nennen Sie <b>zwei</b> technische Mittel zur Umsetzung.",
    solution: `<b>Responsive Design</b> (2 P.): Eine einzige Website passt Layout, Inhalte und Bedienelemente automatisch an die Bildschirmgröße, Auflösung und Ausrichtung des Endgeräts an (z. B. einspaltig auf Smartphone, mehrspaltig auf Desktop), statt separate mobile Seiten zu pflegen.<br>
<b>Mobile First</b> (1 P.): Das Design wird zuerst für kleine Bildschirme entworfen (Fokus auf das Wesentliche, große Touch-Ziele, schnelle Ladezeiten) und dann für größere Bildschirme schrittweise erweitert – passend, da 70 % mobil zugreifen.<br>
<b>Technische Mittel</b> (je 1 P.): CSS <b>Media Queries</b> mit Breakpoints, flexible Layouts mit <b>Flexbox/CSS Grid</b>, relative Einheiten (%, rem, vw), responsive Bilder (<code>srcset</code>, <code>max-width: 100%</code>), Viewport-Meta-Tag.`,
    keywords: ["anpass|passt sich", "bildschirmgröße|endgerät|gerät", "eine website|eine codebasis|einzige", "mobile first|zuerst|kleine", "media quer", "breakpoint", "flexbox|grid", "relative|rem|%|viewport|srcset"],
    tags: ["Responsive Design"]
  },
  {
    id: "ga1-ergonomie-019", part: "GA1", topic: "ga1-ergonomie", type: "mc", difficulty: 1, points: 2,
    context: "In einer Lagerverwaltungssoftware werden Artikel mit ausreichendem Bestand grün und Artikel mit kritischem Bestand rot dargestellt – ohne weiteren Hinweis.",
    question: "Welches Problem ergibt sich daraus vor allem?",
    options: [
      "Rot und Grün sind zu ähnlich im Dateiformat.",
      "Menschen mit Rot-Grün-Sehschwäche können den Bestandsstatus nicht zuverlässig erkennen; Farbe darf nicht der einzige Informationsträger sein.",
      "Grün wird in Deutschland als Warnfarbe verstanden.",
      "Es gibt kein Problem, da die Farbwahl ISO-konform ist."
    ],
    correct: [1],
    solution: "Etwa 8 % der Männer haben eine Rot-Grün-Sehschwäche. Laut WCAG (1.4.1 Benutzung von Farbe) darf Farbe nicht das einzige visuelle Mittel zur Informationsvermittlung sein → zusätzlich Symbol (✔/⚠), Text („kritisch“) oder Muster verwenden.",
    tags: ["Farbe", "Barrierefreiheit"]
  },
  {
    id: "ga1-ergonomie-020", part: "GA1", topic: "ga1-ergonomie", type: "mc", difficulty: 2, points: 2,
    question: "Welches Beispiel beschreibt am besten das Prinzip der <b>Erwartungskonformität</b>?",
    options: [
      "Ein Tooltip erklärt, welche Daten in ein Feld einzutragen sind.",
      "Die Tastenkombination Strg + S speichert wie in anderen Anwendungen das aktuelle Dokument, und der Speichern-Button ist in allen Masken an derselben Stelle.",
      "Der Benutzer kann eine Aktion mit „Rückgängig“ zurücknehmen.",
      "Die Anwendung belohnt regelmäßige Nutzung mit Abzeichen."
    ],
    correct: [1],
    solution: "<b>Erwartungskonformität</b>: Das System verhält sich konsistent (innerhalb der Anwendung) und entspricht allgemein anerkannten Konventionen sowie den Erfahrungen der Benutzer.",
    explanation: "Tooltip = Selbstbeschreibungsfähigkeit, Rückgängig = Robustheit gegen Benutzungsfehler (bzw. Steuerbarkeit), Abzeichen = Benutzerbindung.",
    tags: ["ISO 9241-110"]
  },
  {
    id: "ga1-ergonomie-021", part: "GA1", topic: "ga1-ergonomie", type: "multi", difficulty: 2, points: 3,
    question: "Welche Aussagen zu Methoden der <b>Usability-Evaluation</b> sind richtig?",
    options: [
      "Bei der Thinking-Aloud-Methode sprechen Testpersonen ihre Gedanken während der Bearbeitung laut aus.",
      "Bei einer heuristischen Evaluation prüfen Usability-Experten die Oberfläche anhand anerkannter Heuristiken – ohne echte Nutzer.",
      "Ein A/B-Test vergleicht zwei Varianten einer Oberfläche anhand des Verhaltens realer Nutzer.",
      "Für einen Usability-Test sollten möglichst die Entwickler der Software als Testpersonen eingesetzt werden.",
      "Schon mit ca. fünf Testpersonen lässt sich ein Großteil der Usability-Probleme aufdecken."
    ],
    correct: [0, 1, 2, 4],
    solution: "Richtig: Thinking Aloud, heuristische Evaluation (Experten, z. B. Nielsen-Heuristiken), A/B-Test, ca. 5 Testpersonen (Nielsen). Falsch: Entwickler sind betriebsblind und gehören nicht zur Zielgruppe – Testpersonen sollten repräsentative Endnutzer sein.",
    tags: ["Usability-Test"]
  }
);
