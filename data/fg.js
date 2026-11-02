window.AP2 = window.AP2 || { topics: [], questions: [], exams: [], generators: [] };

AP2.topics.push(
  {
    id: "fg-projektarbeit",
    part: "FG",
    title: "Betriebliche Projektarbeit, Dokumentation & Präsentation",
    summary: `<h4>Rahmen (FIAE, AO 2020)</h4>
<ul>
<li>Prüfungsbereich <b>„Planen und Umsetzen eines Softwareprojektes“</b> = <b>50 %</b> des Gesamtergebnisses (AP1 20 %, GA1 10 %, GA2 10 %, WiSo 10 %).</li>
<li>Bestandteile: betriebliche Projektarbeit (<b>max. 80 Stunden</b>) mit <b>Projektdokumentation</b> und <b>Präsentation (max. 15 Min.) + Fachgespräch</b>, zusammen <b>höchstens 30 Minuten</b>.</li>
<li>Ablauf: Projektantrag → Genehmigung durch den Prüfungsausschuss → Durchführung im Betrieb → Abgabe der Dokumentation zum IHK-Termin → Präsentation &amp; Fachgespräch.</li>
<li>Bestehen (Teil 2): Gesamtergebnis ≥ 50 Punkte, Projektbereich ≥ ausreichend, mind. zwei der übrigen Teil-2-Bereiche ≥ ausreichend, kein Bereich „ungenügend“ (&lt; 30 Punkte).</li>
</ul>
<h4>Projektantrag</h4>
<ul>
<li>Titel, Ausgangssituation/Ist-Zustand, Projektziel (Soll), Projektumfeld/Schnittstellen, Abgrenzung (was gehört nicht dazu), Phasen mit Stundenplanung (Summe 80 h), geplante Präsentationsmittel.</li>
<li>Muss ein echtes <b>Projekt</b> sein: einmalig, zeitlich begrenzt, klares Ziel, eigene Planungs- und Entscheidungsanteile – keine reine Routinearbeit.</li>
<li>Genehmigung ggf. mit Auflagen; bei Ablehnung Überarbeitung innerhalb der IHK-Frist.</li>
</ul>
<h4>Aufbau der Projektdokumentation (max. ca. 15 Seiten + Anlagen, IHK-Vorgaben beachten)</h4>
<ol>
<li><b>Einleitung</b>: Projektumfeld, Ziel, Begründung, Schnittstellen, Abgrenzung</li>
<li><b>Projektplanung</b>: Phasen, Zeitplan, Ressourcen, Vorgehensmodell</li>
<li><b>Ist-Analyse</b> und <b>Soll-Konzept</b> (Anforderungen, Lasten-/Pflichtenheft)</li>
<li><b>Wirtschaftlichkeit</b>: Projektkosten, Make-or-Buy, Amortisation, nicht-monetäre Vorteile</li>
<li><b>Entwurf</b>: Architektur, Datenmodell (ERM), UML, GUI-Mockups, Technologieauswahl mit Begründung</li>
<li><b>Implementierung</b>: wesentliche Schritte, interessante Code-Stellen (Rest in Anlage)</li>
<li><b>Qualitätssicherung</b>: Teststrategie, Testfälle, Ergebnisse, Code-Reviews</li>
<li><b>Abnahme &amp; Einführung</b>: Abnahmeprotokoll, Deployment, Schulung</li>
<li><b>Fazit</b>: <b>Soll-Ist-Vergleich</b> (Zeit, Ziele), Lessons Learned, Ausblick</li>
</ol>
<p>Anlagen: Zeitplan/Gantt, UML, ERM, Mockups/Screenshots, Code-Auszüge, Testprotokolle, Benutzer-/Kundendokumentation. Am Ende: <b>persönliche (eidesstattliche) Erklärung</b>, unterschrieben – Täuschung kann zum Nichtbestehen führen.</p>
<h4>Präsentation (15 Min.)</h4>
<ul>
<li>Gliederung: Vorstellung &amp; Projektumfeld (1–2 Min.) → Ausgangslage &amp; Ziel → Planung/Entscheidungen → Umsetzung (Highlights) → Tests/Ergebnis → Soll-Ist-Vergleich &amp; Fazit.</li>
<li>Prozessorientiert: <b>Warum</b> wurde etwas entschieden – nicht nur was gemacht wurde.</li>
<li>Max. ca. 1 Folie pro Minute, wenig Text, lesbare Diagramme, Foliennummern. Live-Demo nur mit Backup (Screenshots/Video).</li>
<li>Zeit üben – Überziehen wird abgebrochen und kostet Punkte; frei sprechen, Blickkontakt.</li>
</ul>
<h4>Häufige Fehler</h4>
<ul>
<li>Projekt zu klein (reine Umsetzung ohne Entscheidungen) oder zu groß (nicht in 80 h schaffbar).</li>
<li>Kein Soll-Ist-Vergleich, fehlende Begründung von Entscheidungen, keine Alternativen betrachtet.</li>
<li>Wirtschaftlichkeit ohne nachvollziehbare Zahlen; zu viel Code in der Doku; fehlende Quellenangaben.</li>
<li>Rechtschreibung/Formatierung, fehlende Unterschrift unter der Erklärung, Abgabefrist verpasst.</li>
</ul>`
  },
  {
    id: "fg-fachgespraech",
    part: "FG",
    title: "Fachgespräch: typische Fragen & Antwortstrategien",
    summary: `<h4>Worum geht es?</h4>
<p>Im Fachgespräch (im Anschluss an die Präsentation, beides zusammen max. 30 Min.) prüft der Ausschuss, ob Sie Ihr Projekt <b>fachlich durchdrungen</b> haben und Ihr Wissen auf <b>angrenzende Themen übertragen</b> können. Fragen gehen vom Projekt aus und weiten sich dann auf das Berufsbild aus (Datenbanken, Sicherheit, Architektur, PM, Wirtschaftlichkeit).</p>
<h4>Typische Fragen</h4>
<ul>
<li>„Warum haben Sie sich für diese Technologie/Sprache/dieses Framework entschieden?“ – „Welche Alternativen gab es?“</li>
<li>„Wie haben Sie getestet?“ – „Wie stellen Sie sicher, dass…?“</li>
<li>„Was würden Sie heute anders machen?“ – „Warum gab es Abweichungen vom Zeitplan?“</li>
<li>Datenschutz (DSGVO, personenbezogene Daten, TOM), IT-Sicherheit (SQL-Injection, XSS, Passwort-Hashing, Authentifizierung).</li>
<li>Architektur (Schichten, MVC, REST), Datenbank (Normalisierung, ERM, Indizes, Transaktionen).</li>
<li>Wirtschaftlichkeit (Kosten, Amortisation, Annahmen), Vorgehensmodell (Wasserfall, Scrum), Versionskontrolle (Git), Deployment (CI/CD, Docker), Clean Code, Design Patterns.</li>
<li>Transferfragen: „Was passiert bei 100-facher Last?“, „Wie würden Sie das mobil anbieten?“</li>
</ul>
<h4>Antwortstrategie</h4>
<ol>
<li><b>Kurz zuhören, ggf. nachfragen</b> („Meinen Sie die Server- oder Client-Validierung?“).</li>
<li><b>Kernaussage zuerst</b> (1–2 Sätze), dann <b>Begründung</b>, dann <b>konkretes Beispiel aus dem Projekt</b>.</li>
<li><b>Fachbegriffe korrekt</b> verwenden und kurz erklären können.</li>
<li><b>Alternativen und Nachteile</b> nennen – zeigt Abwägung statt Auswendiglernen.</li>
<li>Bei Wissenslücken: <b>ehrlich</b> sein, laut <b>herleiten</b>, Bezug zu Bekanntem herstellen – nie raten oder ausweichen.</li>
</ol>
<h4>Schema „Begründete Entscheidung“</h4>
<p>Anforderung → Kriterien (z. B. Kosten, Know-how im Team, Wartbarkeit, Lizenz, Integration in bestehende Systeme) → betrachtete Alternativen → Bewertung (z. B. Nutzwertanalyse) → Entscheidung → Konsequenzen/Risiken.</p>
<h4>Vorbereitung</h4>
<ul>
<li>Eigene Doku Satz für Satz verteidigen können – jede Zahl, jedes Diagramm.</li>
<li>Code-Ausschnitte der Präsentation erklären können (Prüfer fragen oft genau dort nach).</li>
<li>Probefachgespräch mit Kollegen/Ausbilder, Liste mit 30 möglichen Fragen vorbereiten.</li>
<li>Reflexion vorbereiten: 2–3 konkrete Lessons Learned mit Verbesserungsvorschlag.</li>
</ul>
<p><b>Merksatz:</b> Nicht „Das macht man so“, sondern „Ich habe mich dafür entschieden, weil …“.</p>`
  }
);

AP2.questions.push(
  // ===========================================================================
  // fg-projektarbeit – Formalia (mc/multi/order)
  // ===========================================================================
  {
    id: "fg-projektarbeit-001", part: "FG", topic: "fg-projektarbeit", type: "mc", difficulty: 1, points: 2,
    question: "Wie viele Stunden stehen Fachinformatikern Anwendungsentwicklung (AO 2020) für die betriebliche Projektarbeit höchstens zur Verfügung?",
    options: ["35 Stunden", "40 Stunden", "70 Stunden", "80 Stunden"], correct: [3],
    solution: "<p><b>80 Stunden</b> – inklusive Planung, Durchführung, Test und Erstellung der Projektdokumentation.</p>",
    explanation: "Fachinformatiker Systemintegration haben 40 Stunden, Anwendungsentwickler 80 Stunden."
  },
  {
    id: "fg-projektarbeit-002", part: "FG", topic: "fg-projektarbeit", type: "mc", difficulty: 1, points: 2,
    question: "Wie lange darf die Projektpräsentation höchstens dauern?",
    options: ["10 Minuten", "15 Minuten", "20 Minuten", "30 Minuten"], correct: [1],
    solution: "<p>Die Präsentation dauert höchstens <b>15 Minuten</b>. Präsentation und Fachgespräch zusammen dauern höchstens 30 Minuten.</p>"
  },
  {
    id: "fg-projektarbeit-003", part: "FG", topic: "fg-projektarbeit", type: "mc", difficulty: 1, points: 2,
    question: "Wie lange dürfen Präsentation und Fachgespräch <b>zusammen</b> höchstens dauern?",
    options: ["20 Minuten", "30 Minuten", "45 Minuten", "60 Minuten"], correct: [1],
    solution: "<p>Insgesamt höchstens <b>30 Minuten</b> (Präsentation max. 15 Minuten, der Rest ist Fachgespräch).</p>"
  },
  {
    id: "fg-projektarbeit-004", part: "FG", topic: "fg-projektarbeit", type: "mc", difficulty: 1, points: 2,
    question: "Mit welchem Anteil geht der Prüfungsbereich „Planen und Umsetzen eines Softwareprojektes“ (Projektarbeit, Dokumentation, Präsentation, Fachgespräch) in das Gesamtergebnis der Abschlussprüfung FIAE ein?",
    options: ["10 %", "20 %", "30 %", "50 %"], correct: [3],
    solution: "<p><b>50 %</b>. Weitere Gewichtung: AP Teil 1 20 %, Planen eines Softwareproduktes 10 %, Entwicklung und Umsetzung von Algorithmen 10 %, Wirtschafts- und Sozialkunde 10 %.</p>",
    explanation: "Die Projektarbeit ist damit der wichtigste Einzelbaustein der gesamten Prüfung."
  },
  {
    id: "fg-projektarbeit-005", part: "FG", topic: "fg-projektarbeit", type: "multi", difficulty: 2, points: 4,
    question: "Welche Aussagen zu den Bestehensregeln der Abschlussprüfung (Teil 1 und Teil 2, FIAE) sind richtig? (Mehrfachauswahl)",
    options: [
      "Das Gesamtergebnis aus Teil 1 und Teil 2 muss mindestens „ausreichend“ (50 Punkte) sein.",
      "Im Prüfungsbereich „Planen und Umsetzen eines Softwareprojektes“ muss mindestens „ausreichend“ erreicht werden.",
      "In mindestens zwei der übrigen Prüfungsbereiche von Teil 2 muss mindestens „ausreichend“ erreicht werden.",
      "In keinem Prüfungsbereich von Teil 2 darf „ungenügend“ (unter 30 Punkte) erzielt werden.",
      "Teil 1 muss für sich allein mit mindestens „ausreichend“ bestanden sein.",
      "Eine mündliche Ergänzungsprüfung ist im Projektbereich möglich."
    ],
    correct: [0, 1, 2, 3],
    solution: "<p>Richtig sind die ersten vier Aussagen. Teil 1 muss nicht separat bestanden werden (er geht mit 20 % ein). Eine mündliche Ergänzungsprüfung ist nur in einem der <b>schriftlichen</b> Prüfungsbereiche von Teil 2 möglich (GA1, GA2 oder WiSo), wenn sie für das Bestehen den Ausschlag geben kann – das schriftliche Ergebnis wird dann im Verhältnis 2:1 mit dem mündlichen gewichtet.</p>"
  },
  {
    id: "fg-projektarbeit-006", part: "FG", topic: "fg-projektarbeit", type: "mc", difficulty: 1, points: 2,
    question: "Welcher Punktebereich entspricht nach dem IHK-Notenschlüssel der Note „ausreichend“?",
    options: ["30–49 Punkte", "50–66 Punkte", "67–80 Punkte", "40–59 Punkte"], correct: [1],
    solution: "<p>IHK-Notenschlüssel: 100–92 sehr gut, 91–81 gut, 80–67 befriedigend, <b>66–50 ausreichend</b>, 49–30 mangelhaft, 29–0 ungenügend.</p>"
  },
  {
    id: "fg-projektarbeit-007", part: "FG", topic: "fg-projektarbeit", type: "order", difficulty: 1, points: 3,
    question: "Bringen Sie die Schritte der betrieblichen Projektarbeit in die richtige Reihenfolge.",
    items: [
      "Projektantrag im IHK-Portal einreichen",
      "Genehmigung des Antrags durch den Prüfungsausschuss",
      "Durchführung des Projekts im Ausbildungs-/Praktikumsbetrieb (max. 80 h)",
      "Abgabe der Projektdokumentation zum festgelegten Termin",
      "Projektpräsentation (max. 15 Minuten)",
      "Fachgespräch",
      "Bewertung durch den Prüfungsausschuss"
    ],
    solution: "<p>Antrag → Genehmigung → Durchführung → Dokumentation abgeben → Präsentation → Fachgespräch → Bewertung. Mit der Durchführung darf erst nach der Genehmigung begonnen werden.</p>"
  },
  {
    id: "fg-projektarbeit-008", part: "FG", topic: "fg-projektarbeit", type: "order", difficulty: 2, points: 4,
    question: "Bringen Sie die Hauptkapitel einer typischen FIAE-Projektdokumentation in eine sinnvolle Reihenfolge.",
    items: [
      "Einleitung (Projektumfeld, Projektziel, Abgrenzung)",
      "Projektplanung (Phasen, Ressourcen, Vorgehensmodell)",
      "Ist-Analyse",
      "Soll-Konzept / Anforderungen",
      "Wirtschaftlichkeitsbetrachtung (Kosten, Amortisation)",
      "Entwurf (Architektur, Datenmodell, Oberfläche)",
      "Implementierung",
      "Qualitätssicherung / Tests",
      "Abnahme und Einführung",
      "Fazit mit Soll-Ist-Vergleich und Ausblick"
    ],
    solution: "<p>Die Reihenfolge folgt dem Projektverlauf: Einleitung → Planung → Ist-Analyse → Soll-Konzept → Wirtschaftlichkeit → Entwurf → Implementierung → QS → Abnahme/Einführung → Fazit. Kleinere Varianten (z. B. Wirtschaftlichkeit direkt nach der Ist-Analyse) sind üblich – wichtig ist ein nachvollziehbarer roter Faden.</p>"
  },
  {
    id: "fg-projektarbeit-009", part: "FG", topic: "fg-projektarbeit", type: "mc", difficulty: 1, points: 2,
    question: "Welcher Umfang wird für die Projektdokumentation (FIAE) üblicherweise vorgegeben?",
    options: ["Max. 5 Seiten ohne Anlagen", "Max. 15 Seiten ohne Anlagen, zzgl. Anlagen", "Mind. 30 Seiten inklusive Quellcode", "Kein Umfang vorgegeben, je mehr desto besser"], correct: [1],
    solution: "<p>Üblich sind <b>max. 15 Seiten</b> Textteil (ohne Deckblatt, Verzeichnisse und Anlagen). Die genauen Formvorgaben (Schriftgröße, Ränder, Anlagenumfang) legt die zuständige IHK fest – immer das aktuelle Merkblatt prüfen.</p>",
    explanation: "Zu lange Dokumentationen werden nicht besser bewertet – Prüfer erwarten Prägnanz und Begründungen statt Seitenfüllern."
  },
  {
    id: "fg-projektarbeit-010", part: "FG", topic: "fg-projektarbeit", type: "multi", difficulty: 2, points: 4,
    question: "Welche der folgenden Punkte sind typische Fehler in Projektdokumentationen? (Mehrfachauswahl)",
    options: [
      "Kein Soll-Ist-Vergleich im Fazit",
      "Entscheidungen werden beschrieben, aber nicht begründet",
      "Wirtschaftlichkeitsbetrachtung mit nachvollziehbaren Annahmen",
      "Seitenweise Quellcode im Textteil statt ausgewählter Auszüge",
      "Fehlende Unterschrift unter der persönlichen Erklärung",
      "Abbildungen mit Nummer und Bildunterschrift"
    ],
    correct: [0, 1, 3, 4],
    solution: "<p>Fehler: fehlender Soll-Ist-Vergleich, unbegründete Entscheidungen, zu viel Code im Fließtext, fehlende Unterschrift. Nachvollziehbare Wirtschaftlichkeit und beschriftete Abbildungen sind dagegen Qualitätsmerkmale.</p>"
  },
  {
    id: "fg-projektarbeit-011", part: "FG", topic: "fg-projektarbeit", type: "mc", difficulty: 2, points: 2,
    question: "Ihr Projektantrag wird vom Prüfungsausschuss abgelehnt. Was ist in der Regel der nächste Schritt?",
    options: [
      "Das Projekt trotzdem durchführen und in der Dokumentation begründen",
      "Innerhalb der von der IHK gesetzten Frist einen überarbeiteten bzw. neuen Antrag einreichen",
      "Die Prüfung gilt als nicht bestanden",
      "Automatische Zulassung im nächsten Prüfungsdurchgang ohne Projekt"
    ],
    correct: [1],
    solution: "<p>Bei Ablehnung (oder Genehmigung mit Auflagen) muss ein <b>überarbeiteter bzw. neuer Antrag</b> innerhalb der gesetzten Frist eingereicht werden. Ohne genehmigten Antrag darf das Projekt nicht als Prüfungsleistung durchgeführt werden.</p>"
  },
  {
    id: "fg-projektarbeit-012", part: "FG", topic: "fg-projektarbeit", type: "multi", difficulty: 2, points: 4,
    question: "Welche Tipps für die Projektpräsentation sind sinnvoll? (Mehrfachauswahl)",
    options: [
      "Zeit vorher mehrfach mit Stoppuhr üben",
      "Folien mit möglichst viel Text, damit nichts vergessen wird",
      "Bei einer Live-Demo Screenshots oder ein Video als Backup bereithalten",
      "Entscheidungen begründen und Alternativen kurz nennen",
      "Quellcode-Dateien vollständig zeigen, um Fleiß zu beweisen",
      "Mit einem Soll-Ist-Vergleich und einem Fazit abschließen"
    ],
    correct: [0, 2, 3, 5],
    solution: "<p>Sinnvoll: Zeit üben, Backup für Demo, Begründungen, Soll-Ist-Vergleich/Fazit. Textlastige Folien und vollständiger Quellcode überfordern das Publikum und kosten Zeit.</p>"
  },
  {
    id: "fg-projektarbeit-013", part: "FG", topic: "fg-projektarbeit", type: "multi", difficulty: 2, points: 3,
    question: "Welche Kriterien werden bei der Bewertung der Präsentation typischerweise herangezogen? (Mehrfachauswahl)",
    options: [
      "Aufbau und Struktur (roter Faden)",
      "Fachliche Richtigkeit und Darstellung der Entscheidungen",
      "Medieneinsatz und Gestaltung der Folien",
      "Sprache, Körpersprache, Blickkontakt",
      "Einhaltung der Zeit",
      "Anzahl der Folien (je mehr, desto besser)"
    ],
    correct: [0, 1, 2, 3, 4],
    solution: "<p>Bewertet werden Aufbau, Inhalt/Fachlichkeit, Medieneinsatz, Präsentationstechnik (Rhetorik, Auftreten) und Zeitmanagement. Die Folienanzahl ist kein Kriterium – zu viele Folien sind eher negativ.</p>"
  },
  // ===========================================================================
  // fg-projektarbeit – Freitext
  // ===========================================================================
  {
    id: "fg-projektarbeit-014", part: "FG", topic: "fg-projektarbeit", type: "text", difficulty: 2, points: 6,
    question: "Nennen Sie die wesentlichen Bestandteile eines Projektantrags für die betriebliche Projektarbeit und erläutern Sie kurz, worauf es jeweils ankommt.",
    solution: `<ul>
<li><b>Projektbezeichnung</b>: aussagekräftig, beschreibt das Ergebnis (z. B. „Entwicklung einer Webanwendung zur Verwaltung von Leihgeräten“).</li>
<li><b>Ausgangssituation / Ist-Zustand</b>: Welches Problem besteht? Wer ist betroffen?</li>
<li><b>Projektziel / Soll-Zustand</b>: messbar formuliert, Nutzen für den Auftraggeber.</li>
<li><b>Projektumfeld und Schnittstellen</b>: Auftraggeber, Abteilung, beteiligte Systeme.</li>
<li><b>Abgrenzung</b>: was ausdrücklich nicht Bestandteil ist (wichtig für den 80-Stunden-Rahmen).</li>
<li><b>Projektphasen mit Zeitplanung</b>: Analyse, Entwurf, Implementierung, Test, Abnahme, Dokumentation – Summe 80 Stunden.</li>
<li><b>Geplante Dokumentation / Anlagen</b> und <b>Präsentationsmittel</b>.</li>
</ul>
<p>Der Antrag muss zeigen, dass es ein echtes Projekt mit eigenen Planungs- und Entscheidungsanteilen ist.</p>`,
    keywords: ["ausgangssituation|ist-zustand", "projektziel|soll", "abgrenzung", "zeitplanung|phasen", "80 stunden|80", "schnittstellen|projektumfeld", "präsentationsmittel"]
  },
  {
    id: "fg-projektarbeit-015", part: "FG", topic: "fg-projektarbeit", type: "text", difficulty: 2, points: 5,
    question: "Woran erkennt ein Prüfungsausschuss, dass ein beantragtes Vorhaben ein geeignetes <b>Projekt</b> ist? Erläutern Sie außerdem, welche Probleme ein zu kleines bzw. zu großes Projekt mit sich bringt.",
    solution: `<p><b>Projektmerkmale</b> (DIN 69901): Einmaligkeit, zeitliche Begrenzung (Start/Ende), klares Ziel, begrenzte Ressourcen, eigene Organisation, gewisse Komplexität.</p>
<p>Zusätzlich muss der Prüfling <b>selbstständig planen und entscheiden</b> (Analyse, Alternativen, Entwurf, Test) – nicht nur nach Vorgabe programmieren.</p>
<p><b>Zu klein</b>: reine Routine-/Konfigurationsarbeit, keine Entscheidungsspielräume → Antrag wird abgelehnt oder schlechte Bewertung, weil Fachkompetenz nicht gezeigt werden kann.<br>
<b>Zu groß</b>: nicht in 80 Stunden machbar → Zeitdruck, fehlende Tests, schwacher Soll-Ist-Vergleich; Lösung: klar abgrenzen, Teilprojekt definieren.</p>`,
    keywords: ["einmalig", "zeitlich begrenzt|begrenzt", "ziel", "entscheidung|entscheidungen", "abgrenz", "80 stunden|80"]
  },
  {
    id: "fg-projektarbeit-016", part: "FG", topic: "fg-projektarbeit", type: "text", difficulty: 2, points: 5,
    question: "Beschreiben Sie, welche Inhalte in die Kapitel <b>Ist-Analyse</b> und <b>Soll-Konzept</b> einer Projektdokumentation gehören und mit welchen Methoden Sie die Informationen gewinnen.",
    solution: `<p><b>Ist-Analyse</b>: aktueller Prozess (z. B. als Aktivitätsdiagramm/EPK), eingesetzte Systeme, Schwachstellen (Medienbrüche, Fehlerquellen, Zeitaufwand), Mengengerüst (Nutzer, Datensätze).<br>
Methoden: Interviews mit Fachabteilung, Beobachtung, Dokumentenanalyse, Fragebögen, Auswertung vorhandener Daten.</p>
<p><b>Soll-Konzept</b>: funktionale und nicht-funktionale Anforderungen (z. B. Performance, Datenschutz, Usability), Lastenheft (Auftraggeber: Was?) bzw. Pflichtenheft (Auftragnehmer: Wie?), Use-Case-Diagramm, Abnahmekriterien, Priorisierung (z. B. MoSCoW).</p>
<p>Wichtig: Die Schwachstellen der Ist-Analyse müssen sich im Soll-Konzept als gelöste Anforderungen wiederfinden (roter Faden).</p>`,
    keywords: ["interview", "schwachstellen", "anforderungen", "lastenheft", "pflichtenheft", "nicht-funktional|nichtfunktional", "use-case|use case|anwendungsfall"]
  },
  {
    id: "fg-projektarbeit-017", part: "FG", topic: "fg-projektarbeit", type: "text", difficulty: 2, points: 6,
    question: "Erläutern Sie, welche Bestandteile eine überzeugende <b>Wirtschaftlichkeitsbetrachtung</b> in der Projektdokumentation enthält.",
    solution: `<ul>
<li><b>Projektkosten</b>: Personalkosten (Stunden × Stundensatz für Prüfling, Ansprechpartner, Fachabteilung, Abnahme), Sachkosten (Hardware, Lizenzen, Hosting), ggf. Gemeinkostenzuschlag – als Tabelle.</li>
<li><b>Make-or-Buy-Entscheidung</b>: Vergleich mit Standardsoftware/SaaS (Kosten, Anpassbarkeit, Abhängigkeit).</li>
<li><b>Nutzen/Einsparung</b>: z. B. Zeitersparnis pro Vorgang × Anzahl Vorgänge × Stundensatz, wegfallende Lizenzkosten.</li>
<li><b>Amortisationsrechnung</b>: Investition ÷ (jährliche Einsparung − laufende Kosten) = Amortisationsdauer, ggf. als Diagramm.</li>
<li><b>Nicht-monetäre Vorteile</b>: Datenqualität, Mitarbeiterzufriedenheit, DSGVO-Konformität, Image.</li>
<li>Alle <b>Annahmen offenlegen</b> und begründen (Quelle des Stundensatzes, Häufigkeiten).</li>
</ul>`,
    keywords: ["projektkosten|kosten", "stundensatz", "amortisation", "make-or-buy|make or buy", "einsparung|nutzen", "nicht-monetär|nicht monetär|qualitativ", "annahmen"]
  },
  {
    id: "fg-projektarbeit-018", part: "FG", topic: "fg-projektarbeit", type: "text", difficulty: 2, points: 5,
    question: "Erläutern Sie den Zweck des <b>Soll-Ist-Vergleichs</b> im Fazit und wie Sie Abweichungen vom Zeitplan darstellen sollten.",
    solution: `<p>Der Soll-Ist-Vergleich zeigt, ob die <b>Projektziele erreicht</b> wurden und wie gut die <b>Planung</b> war. Er ist Teil der Reflexion und wird von Prüfern ausdrücklich erwartet.</p>
<ul>
<li>Tabelle: Phase | geplante Stunden | tatsächliche Stunden | Differenz.</li>
<li>Abweichungen <b>begründen</b> (z. B. „Implementierung +4 h, da die Schnittstelle zum ERP anders dokumentiert war als angenommen“) und zeigen, wie sie <b>ausgeglichen</b> wurden (z. B. Puffer, Kürzung bei Dokumentation).</li>
<li>Zielerreichung: Welche Anforderungen sind umgesetzt, welche (begründet) nicht?</li>
<li>Lessons Learned und Ausblick (Erweiterungen, nächste Schritte).</li>
</ul>
<p>Abweichungen sind nicht schlimm – fehlende Reflexion schon. „Alles lief exakt nach Plan“ wirkt unglaubwürdig.</p>`,
    keywords: ["geplant", "tatsächlich|ist", "abweichung", "begründ", "ziel", "lessons learned|reflexion", "ausblick"]
  },
  {
    id: "fg-projektarbeit-019", part: "FG", topic: "fg-projektarbeit", type: "text", difficulty: 1, points: 4,
    question: "Nennen Sie typische Inhalte des <b>Anhangs</b> einer Projektdokumentation und erklären Sie, warum man Inhalte dorthin auslagert.",
    solution: `<ul>
<li>Detaillierter Zeitplan / Gantt-Diagramm</li>
<li>UML-Diagramme (Klassen-, Sequenz-, Use-Case-, Aktivitätsdiagramm), ER-Modell / Tabellenmodell</li>
<li>Mockups und Screenshots der Oberfläche</li>
<li>Ausgewählte Quellcode-Auszüge</li>
<li>Testfälle und Testprotokolle, Abnahmeprotokoll</li>
<li>Auszüge aus Lasten-/Pflichtenheft</li>
<li>Benutzer- bzw. Kundendokumentation (Handbuch)</li>
</ul>
<p>Grund: Der Textteil ist auf ca. 15 Seiten begrenzt und soll den <b>Prozess und die Entscheidungen</b> beschreiben. Details werden ausgelagert und im Text referenziert („siehe Anhang A3“).</p>`,
    keywords: ["uml", "screenshots|mockup", "quellcode|code", "testprotokoll|testfälle", "benutzerdokumentation|handbuch|kundendokumentation", "seiten|umfang"]
  },
  {
    id: "fg-projektarbeit-020", part: "FG", topic: "fg-projektarbeit", type: "text", difficulty: 1, points: 3,
    question: "Erläutern Sie Zweck und Inhalt der <b>persönlichen (eidesstattlichen) Erklärung</b> in der Projektdokumentation sowie mögliche Folgen eines Verstoßes.",
    solution: `<p>Mit der unterschriebenen Erklärung versichert der Prüfling, dass er die Projektarbeit und die Dokumentation <b>selbstständig</b> angefertigt und <b>keine anderen als die angegebenen Hilfsmittel und Quellen</b> verwendet hat; wörtliche und sinngemäße Übernahmen sind kenntlich gemacht.</p>
<p>Folgen bei Verstoß (z. B. Plagiat, fremd erstellter Code ohne Kennzeichnung, nicht deklarierter KI-generierter Text): Wertung als <b>Täuschungsversuch</b> – die Prüfungsleistung kann mit „ungenügend“ (0 Punkte) bewertet werden, in schweren Fällen kann die gesamte Prüfung als nicht bestanden gelten. Auch eine spätere Aberkennung ist möglich.</p>`,
    keywords: ["selbstständig|selbständig", "hilfsmittel", "quellen", "unterschrift|unterschrieben", "täuschung", "ungenügend|nicht bestanden"]
  },
  {
    id: "fg-projektarbeit-021", part: "FG", topic: "fg-projektarbeit", type: "text", difficulty: 2, points: 6,
    question: "Entwickeln Sie eine Gliederung für eine 15-minütige Projektpräsentation mit ungefährer Zeitaufteilung.",
    solution: `<table><tr><th>Abschnitt</th><th>Zeit</th></tr>
<tr><td>Begrüßung, Vorstellung, Unternehmen/Projektumfeld</td><td>1–2 Min.</td></tr>
<tr><td>Ausgangssituation, Problem, Projektziel</td><td>2 Min.</td></tr>
<tr><td>Planung: Vorgehensmodell, Zeitplan, Wirtschaftlichkeit (Kernzahlen)</td><td>2–3 Min.</td></tr>
<tr><td>Entwurf und wichtige Entscheidungen (Architektur, Technologie, Datenmodell) mit Begründung</td><td>3 Min.</td></tr>
<tr><td>Umsetzung: 1–2 Highlights (Code-Ausschnitt, Screenshot oder kurze Demo)</td><td>3 Min.</td></tr>
<tr><td>Qualitätssicherung und Abnahme</td><td>1–2 Min.</td></tr>
<tr><td>Soll-Ist-Vergleich, Fazit, Ausblick, Dank</td><td>1–2 Min.</td></tr></table>
<p>Tipps: ca. 10–15 Folien, Agenda-Folie, Foliennummern, roter Faden „Problem → Lösung → Ergebnis“, Schluss nicht „überhastet“ – lieber Inhalte kürzen.</p>`,
    keywords: ["ausgangssituation|problem", "ziel", "planung|zeitplan", "entscheidung|begründung", "umsetzung|implementierung", "test|qualitätssicherung", "soll-ist|fazit"]
  },
  {
    id: "fg-projektarbeit-022", part: "FG", topic: "fg-projektarbeit", type: "text", difficulty: 2, points: 4,
    question: "Sie möchten in Ihrer Präsentation eine <b>Live-Demo</b> Ihrer Webanwendung zeigen. Erläutern Sie Vor- und Nachteile und wie Sie Risiken minimieren.",
    solution: `<p><b>Vorteile</b>: anschaulich, zeigt funktionierendes Ergebnis, wirkt authentisch.</p>
<p><b>Nachteile/Risiken</b>: Netzwerk- oder Serverausfall, Login-Probleme, unerwartete Fehler, Zeitüberschreitung, Prüfer sehen auf dem Beamer wenig.</p>
<p><b>Absicherung</b>: lokale Installation statt Internetabhängigkeit, vorbereitete Testdaten (keine echten personenbezogenen Daten!), Demo-Drehbuch mit festen Klickpfaden, Zeitlimit (max. 2–3 Min.), <b>Backup als Screenshots oder Video</b> in den Folien, vorher auf dem Präsentationsgerät/Beamer testen.</p>`,
    keywords: ["backup", "screenshot|video", "testdaten", "zeit", "risiko|ausfall", "lokal|offline"]
  },
  {
    id: "fg-projektarbeit-023", part: "FG", topic: "fg-projektarbeit", type: "text", difficulty: 2, points: 5,
    question: "Erstellen Sie eine beispielhafte Zeitplanung für ein 80-Stunden-Projekt „Webanwendung zur Raumbuchung“ und begründen Sie die Verteilung.",
    solution: `<table><tr><th>Phase</th><th>Stunden</th></tr>
<tr><td>Analyse (Ist-Analyse, Interviews, Wirtschaftlichkeit, Anforderungen)</td><td>8</td></tr>
<tr><td>Entwurf (Architektur, ERM, UML, Mockups, Testplan)</td><td>12</td></tr>
<tr><td>Implementierung (Datenbank, Backend/REST-API, Frontend)</td><td>36</td></tr>
<tr><td>Qualitätssicherung (Unit-/Integrationstests, Code-Review, Fehlerbehebung)</td><td>9</td></tr>
<tr><td>Abnahme und Einführung (Deployment, Einweisung)</td><td>3</td></tr>
<tr><td>Dokumentation (Projekt- und Benutzerdokumentation)</td><td>12</td></tr>
<tr><td><b>Summe</b></td><td><b>80</b></td></tr></table>
<p>Begründung: Implementierung ist der größte Block, aber Analyse/Entwurf (ca. 25 %) zeigen die Planungskompetenz, die bewertet wird. Tests sind fester Bestandteil (kein „Rest“). Dokumentation wird projektbegleitend erstellt. Ein kleiner Puffer kann in der Implementierung eingeplant werden.</p>`,
    keywords: ["analyse", "entwurf", "implementierung", "test|qualitätssicherung", "dokumentation", "80", "puffer"]
  },
  {
    id: "fg-projektarbeit-024", part: "FG", topic: "fg-projektarbeit", type: "text", difficulty: 1, points: 4,
    question: "Grenzen Sie die <b>Projektdokumentation</b> (prozessorientiert) von der <b>Kundendokumentation</b> ab.",
    solution: `<p><b>Projektdokumentation</b>: richtet sich an den Prüfungsausschuss; beschreibt den <b>Prozess</b> – Ausgangslage, Planung, Entscheidungen mit Begründung, Durchführung, Tests, Soll-Ist-Vergleich. Zeigt die berufliche Handlungskompetenz.</p>
<p><b>Kundendokumentation</b> (Benutzer-/Administratorhandbuch): richtet sich an Anwender bzw. Betreiber; beschreibt die <b>Bedienung</b>, Installation und Konfiguration des Produkts, verständlich und ohne interne Projektdetails. Sie wird üblicherweise als Anlage beigefügt.</p>`,
    keywords: ["prüfungsausschuss|prüfer", "prozess", "entscheidung", "anwender|benutzer", "bedienung|handbuch", "anlage|anhang"]
  },
  {
    id: "fg-projektarbeit-025", part: "FG", topic: "fg-projektarbeit", type: "text", difficulty: 2, points: 4,
    question: "Beschreiben Sie, wie Sie sich gezielt auf Präsentation und Fachgespräch vorbereiten.",
    solution: `<ul>
<li>Präsentation mehrfach laut und mit Stoppuhr üben, vor Kollegen/Ausbilder halten, Feedback einarbeiten.</li>
<li>Technik prüfen: Laptop, Adapter (HDMI/USB-C), Akku, Präsentation als PDF-Backup auf USB-Stick.</li>
<li>Eigene Dokumentation gründlich wiederholen – jede Entscheidung, Zahl und jedes Diagramm erklären können.</li>
<li>Liste möglicher Prüferfragen erstellen (Technologiewahl, Alternativen, Tests, Datenschutz, Sicherheit, Wirtschaftlichkeit) und Antworten formulieren.</li>
<li>Grundlagenwissen auffrischen, das an das Projekt angrenzt (z. B. Normalisierung, OOP, REST, Git).</li>
<li>Probefachgespräch durchführen, Reflexion („Was würde ich anders machen?“) vorbereiten.</li>
</ul>`,
    keywords: ["üben|proben", "stoppuhr|zeit", "backup|pdf", "fragen", "dokumentation", "probefachgespräch|feedback"]
  },
  // ===========================================================================
  // fg-fachgespraech – Formalia/Strategie (mc/multi)
  // ===========================================================================
  {
    id: "fg-fachgespraech-001", part: "FG", topic: "fg-fachgespraech", type: "mc", difficulty: 1, points: 2,
    question: "Welche Aussage beschreibt das Fachgespräch am besten?",
    options: [
      "Es werden ausschließlich Fragen zum eigenen Quellcode gestellt.",
      "Ausgehend vom Projekt werden fachliche Hintergründe und Transferwissen aus dem Berufsfeld geprüft.",
      "Es ist eine Wiederholung der schriftlichen Prüfung in mündlicher Form ohne Projektbezug.",
      "Der Prüfling stellt dem Ausschuss Fragen zu dessen Bewertung."
    ],
    correct: [1],
    solution: "<p>Das Fachgespräch geht <b>vom Projekt aus</b> und prüft, ob der Prüfling die Hintergründe versteht und Wissen auf berufstypische Fragestellungen <b>übertragen</b> kann.</p>"
  },
  {
    id: "fg-fachgespraech-002", part: "FG", topic: "fg-fachgespraech", type: "multi", difficulty: 2, points: 4,
    question: "Welche Verhaltensweisen sind im Fachgespräch empfehlenswert? (Mehrfachauswahl)",
    options: [
      "Bei unklaren Fragen kurz nachfragen, was genau gemeint ist",
      "Erst die Kernaussage, dann Begründung und Beispiel aus dem Projekt",
      "Bei Wissenslücken möglichst lange um das Thema herumreden",
      "Alternativen und Nachteile der eigenen Lösung offen benennen",
      "Fachbegriffe verwenden und kurz erklären können",
      "Kritische Nachfragen als persönlichen Angriff zurückweisen"
    ],
    correct: [0, 1, 3, 4],
    solution: "<p>Empfehlenswert: Nachfragen, strukturierte Antwort (Kernaussage → Begründung → Beispiel), Alternativen/Nachteile nennen, Fachbegriffe sicher nutzen. Ausweichen oder Abwehr wirkt unsouverän – kritische Nachfragen dienen nur der Prüfung des Verständnisses.</p>"
  },
  {
    id: "fg-fachgespraech-003", part: "FG", topic: "fg-fachgespraech", type: "mc", difficulty: 1, points: 2,
    question: "Ein Prüfer stellt eine Frage, deren Antwort Sie nicht kennen. Welche Reaktion ist am sinnvollsten?",
    options: [
      "Schweigen, bis die nächste Frage kommt",
      "Eine Antwort erfinden, die plausibel klingt",
      "Ehrlich sagen, dass Sie es nicht genau wissen, und laut eine Herleitung aus bekanntem Wissen versuchen",
      "Auf ein anderes Thema wechseln, das Sie gut beherrschen"
    ],
    correct: [2],
    solution: "<p>Ehrlichkeit plus <b>nachvollziehbares Herleiten</b> zeigt Problemlösekompetenz. Erfundene Antworten werden meist durch Nachfragen entlarvt; Ausweichen wirkt unsouverän.</p>"
  },
  // ===========================================================================
  // fg-fachgespraech – typische Prüferfragen (text)
  // ===========================================================================
  {
    id: "fg-fachgespraech-004", part: "FG", topic: "fg-fachgespraech", type: "text", difficulty: 2, points: 6,
    question: "„Warum haben Sie sich für diese Technologie entschieden?“ – Erläutern Sie, wie Sie diese Frage strukturiert beantworten, und geben Sie eine Beispielantwort für ein Webprojekt (z. B. Backend mit Spring Boot, Frontend mit Angular).",
    solution: `<p><b>Struktur</b>: Anforderungen → Kriterien → Alternativen → Bewertung → Entscheidung → Konsequenzen.</p>
<p><b>Beispielantwort</b>: „Die Anwendung muss in die bestehende Java-Landschaft des Unternehmens integriert werden und von der IT-Abteilung gewartet werden können. Meine Kriterien waren deshalb Know-how im Team, Wartbarkeit, Lizenzkosten, Community/Langzeitsupport und Sicherheit. Als Alternativen habe ich Spring Boot, ASP.NET Core und Node.js mit Express betrachtet. In der Nutzwertanalyse lag Spring Boot vorn, weil das Team Java beherrscht, Spring Security eine ausgereifte Authentifizierung bietet und es Open Source ist. Angular habe ich gewählt, weil es TypeScript nutzt, eine klare Struktur vorgibt und bereits in anderen internen Anwendungen eingesetzt wird. Nachteil ist die steilere Lernkurve von Angular gegenüber Vue, die ich aber durch vorhandene Vorlagen im Unternehmen ausgleichen konnte.“</p>`,
    keywords: ["anforderung", "kriterien", "alternativ", "nutzwertanalyse|bewertung", "know-how|kenntnisse", "wartbarkeit", "lizenz|kosten", "nachteil"]
  },
  {
    id: "fg-fachgespraech-005", part: "FG", topic: "fg-fachgespraech", type: "text", difficulty: 2, points: 5,
    question: "„Welche Alternativen hätte es zu Ihrer Lösung gegeben, und warum haben Sie sie verworfen?“ – Geben Sie eine Musterantwort (übertragbar auf Ihr Projekt).",
    solution: `<p>Gute Antworten nennen <b>2–3 konkrete Alternativen</b> auf verschiedenen Ebenen und begründen die Ablehnung sachlich:</p>
<ul>
<li><b>Make or Buy</b>: „Eine Standardsoftware (z. B. ein SaaS-Buchungstool) wäre schnell verfügbar gewesen, hätte aber monatliche Lizenzkosten verursacht, keine Anbindung an unser Active Directory geboten und Daten außerhalb der EU gespeichert.“</li>
<li><b>Technologie</b>: „Statt einer Webanwendung wäre eine Desktop-Anwendung möglich gewesen; wegen der Verteilung an 60 Arbeitsplätze und der Nutzung im Homeoffice war eine Weblösung wartungsärmer.“</li>
<li><b>Datenhaltung</b>: „Eine NoSQL-Datenbank habe ich verworfen, weil die Daten stark relational sind und Transaktionen (ACID) benötigt werden.“</li>
</ul>
<p>Abschließen mit: „Die Entscheidung habe ich mit einer Nutzwertanalyse dokumentiert (Anhang …).“</p>`,
    keywords: ["make or buy|make-or-buy|standardsoftware", "kosten|lizenz", "datenschutz|dsgvo", "webanwendung|desktop", "relational|nosql", "nutzwertanalyse", "begründ"]
  },
  {
    id: "fg-fachgespraech-006", part: "FG", topic: "fg-fachgespraech", type: "text", difficulty: 2, points: 6,
    question: "„Wie haben Sie Ihre Anwendung getestet?“ – Beschreiben Sie eine vollständige Antwort mit Teststufen, Testverfahren und Dokumentation.",
    solution: `<ul>
<li><b>Teststrategie/Testplan</b> bereits im Entwurf erstellt (Was, wie, womit, Abnahmekriterien).</li>
<li><b>Unit-Tests</b> (z. B. JUnit/Jest) für Geschäftslogik, automatisiert im Build; ggf. Mocking von Abhängigkeiten.</li>
<li><b>Integrationstests</b> für REST-Schnittstellen und Datenbankzugriffe (z. B. mit Testdatenbank).</li>
<li><b>Systemtest/Oberflächentest</b> manuell anhand von Testfällen oder automatisiert (z. B. Selenium/Playwright).</li>
<li><b>Abnahmetest</b> mit der Fachabteilung anhand der Anforderungen → Abnahmeprotokoll.</li>
<li><b>Testfallermittlung</b>: Black-Box mit Äquivalenzklassen und Grenzwertanalyse, White-Box mit Zweigüberdeckung (Code Coverage).</li>
<li><b>Dokumentation</b>: Testfälle mit Eingabe, erwartetem und tatsächlichem Ergebnis; gefundene Fehler, Behebung, Regressionstest.</li>
</ul>
<p>Beispiel: „Für das Buchungsdatum habe ich Grenzwerte wie heute, gestern und das Ende des Buchungszeitraums getestet.“</p>`,
    keywords: ["unit", "integrationstest|integration", "abnahme", "grenzwert", "äquivalenzklasse", "testfall|testfälle", "protokoll", "black-box|white-box|überdeckung"]
  },
  {
    id: "fg-fachgespraech-007", part: "FG", topic: "fg-fachgespraech", type: "text", difficulty: 2, points: 5,
    question: "„Was würden Sie heute anders machen?“ – Erläutern Sie, wie man diese Reflexionsfrage überzeugend beantwortet, und geben Sie zwei Beispielantworten.",
    solution: `<p><b>Strategie</b>: ehrlich, konkret, konstruktiv. Nicht „nichts“ und nicht „alles“ – sondern <b>1–2 echte Erkenntnisse</b> mit Ursache und Verbesserung. Keine Schuldzuweisungen.</p>
<p><b>Beispiele</b>:</p>
<ul>
<li>„Ich würde die Fachabteilung früher mit einem klickbaren Prototyp einbinden. Zwei Anforderungen wurden erst bei der Abnahme präzisiert, was 3 Stunden Nacharbeit verursachte.“</li>
<li>„Ich würde die Unit-Tests konsequent parallel zur Implementierung schreiben (Test-First), statt sie am Ende nachzuziehen – dann wären zwei Fehler in der Preisberechnung früher aufgefallen.“</li>
</ul>
<p>Optional: Bezug zum Soll-Ist-Vergleich und was man für das nächste Projekt mitnimmt (Lessons Learned).</p>`,
    keywords: ["ehrlich|reflexion", "konkret", "früher", "prototyp", "test", "lessons learned|erkenntnis", "verbesser"]
  },
  {
    id: "fg-fachgespraech-008", part: "FG", topic: "fg-fachgespraech", type: "text", difficulty: 2, points: 6,
    question: "„Ihre Anwendung verarbeitet Mitarbeiterdaten. Wie haben Sie den Datenschutz berücksichtigt?“ – Formulieren Sie eine Musterantwort.",
    solution: `<ul>
<li><b>Personenbezogene Daten</b> identifiziert (Name, E-Mail, Abteilung) – keine besonderen Kategorien (Art. 9 DSGVO).</li>
<li><b>Rechtsgrundlage</b>: Art. 6 Abs. 1 lit. b DSGVO bzw. § 26 BDSG (Beschäftigungsverhältnis); Datenschutzbeauftragten einbezogen, Eintrag im Verzeichnis von Verarbeitungstätigkeiten.</li>
<li><b>Grundsätze</b> (Art. 5): Datenminimierung (nur nötige Felder), Zweckbindung, Speicherbegrenzung (Löschkonzept, z. B. Buchungen nach 12 Monaten löschen).</li>
<li><b>Privacy by Design/Default</b> (Art. 25): datensparsame Voreinstellungen.</li>
<li><b>TOM</b> (Art. 32): Rollen- und Rechtekonzept, Authentifizierung über AD/SSO, TLS-Verschlüsselung, Passwort-Hashing, Protokollierung, Backups, Hosting im eigenen Rechenzentrum/EU.</li>
<li>Testdaten: anonymisiert bzw. pseudonymisiert, keine Echtdaten in der Präsentation.</li>
<li>Betroffenenrechte (Auskunft, Löschung) technisch ermöglicht.</li>
</ul>`,
    keywords: ["personenbezogen", "dsgvo", "datenminimierung|datensparsamkeit", "zweckbindung", "tom|technisch-organisatorisch|technische und organisatorische", "verschlüssel|tls", "rechtekonzept|rollen", "löschkonzept|löschen"]
  },
  {
    id: "fg-fachgespraech-009", part: "FG", topic: "fg-fachgespraech", type: "text", difficulty: 2, points: 6,
    question: "„Erklären Sie die Architektur Ihrer Anwendung.“ – Geben Sie eine Musterantwort für eine typische Webanwendung mit Schichtenarchitektur und begründen Sie die Wahl.",
    solution: `<p>„Die Anwendung ist als <b>Client-Server-Anwendung</b> mit <b>Drei-Schichten-Architektur</b> aufgebaut:</p>
<ul>
<li><b>Präsentationsschicht</b>: Single-Page-Application im Browser, kommuniziert per HTTPS mit einer <b>REST-API</b> (JSON).</li>
<li><b>Logikschicht</b>: Controller nehmen Anfragen entgegen, Services enthalten die Geschäftslogik (z. B. Konfliktprüfung bei Buchungen).</li>
<li><b>Datenhaltungsschicht</b>: Repositories kapseln den Datenbankzugriff (ORM), relationale Datenbank.</li>
</ul>
<p>Begründung: <b>Trennung der Verantwortlichkeiten</b> (Separation of Concerns) → bessere Wartbarkeit und Testbarkeit (Services einzeln testbar), Austauschbarkeit einzelner Schichten (z. B. später mobile App an derselben API), Skalierbarkeit. Eine Microservice-Architektur wäre für den Umfang überdimensioniert gewesen.“</p>
<p>Ideal: Diagramm (Komponenten- oder Verteilungsdiagramm) aus der Doku zeigen können.</p>`,
    keywords: ["schicht", "präsentation", "logik|geschäftslogik|service", "daten|repository|persistenz", "rest|api", "wartbar", "testbar", "separation of concerns|trennung"]
  },
  {
    id: "fg-fachgespraech-010", part: "FG", topic: "fg-fachgespraech", type: "text", difficulty: 2, points: 6,
    question: "„Warum haben Sie Ihre Datenbank so modelliert? Was ist Normalisierung und warum ist sie wichtig?“ – Formulieren Sie eine Musterantwort.",
    solution: `<p>„Ich habe zuerst ein <b>ER-Modell</b> (Entitäten, Beziehungen, Kardinalitäten) erstellt und es in ein relationales Tabellenmodell überführt; m:n-Beziehungen (z. B. Mitarbeiter–Raum über Buchung) wurden über eine Zwischentabelle aufgelöst.</p>
<p><b>Normalisierung</b> bis zur <b>3. Normalform</b>:</p>
<ul>
<li>1. NF: atomare Werte, keine Wiederholungsgruppen</li>
<li>2. NF: jedes Nichtschlüsselattribut voll funktional vom gesamten Primärschlüssel abhängig</li>
<li>3. NF: keine transitiven Abhängigkeiten zwischen Nichtschlüsselattributen</li>
</ul>
<p>Ziel: <b>Redundanzen vermeiden</b> und damit <b>Anomalien</b> (Einfüge-, Änderungs-, Löschanomalie) verhindern sowie Datenkonsistenz sichern. Referentielle Integrität über Fremdschlüssel; Indizes auf häufig gefilterte Spalten (z. B. Datum). Eine bewusste Denormalisierung wäre nur aus Performancegründen sinnvoll.“</p>`,
    keywords: ["er-modell|erm|entity", "normalform|normalisierung", "redundanz", "anomalie", "fremdschlüssel|referentielle integrität", "primärschlüssel", "index"]
  },
  {
    id: "fg-fachgespraech-011", part: "FG", topic: "fg-fachgespraech", type: "text", difficulty: 2, points: 5,
    question: "„Wie sind Sie auf die Zahlen in Ihrer Wirtschaftlichkeitsbetrachtung gekommen – ist die Amortisation realistisch?“ – Formulieren Sie eine überzeugende Antwort.",
    solution: `<ul>
<li><b>Quellen der Annahmen</b> nennen: Stundensätze aus dem Controlling bzw. interner Verrechnungssatz, Zeitersparnis durch Messung/Befragung in der Ist-Analyse (z. B. 10 Minuten pro Vorgang × 400 Vorgänge/Monat).</li>
<li><b>Rechenweg</b> kurz erklären: Projektkosten (Personal + Sachkosten) ÷ (jährliche Einsparung − laufende Kosten) = Amortisationsdauer.</li>
<li><b>Grenzen</b> offen ansprechen: Schätzungen, nicht berücksichtigte Wartungskosten oder Schulungsaufwand; ggf. Sensitivität („selbst bei halber Zeitersparnis amortisiert sich das Projekt nach x Monaten“).</li>
<li><b>Nicht-monetäre Vorteile</b> ergänzen (Fehlerreduktion, Transparenz, Datenschutz).</li>
</ul>`,
    keywords: ["annahme", "stundensatz", "zeitersparnis|einsparung", "amortisation", "laufende kosten|wartung", "schätz", "nicht-monetär|qualitativ"]
  },
  {
    id: "fg-fachgespraech-012", part: "FG", topic: "fg-fachgespraech", type: "text", difficulty: 2, points: 6,
    question: "„Warum haben Sie dieses Vorgehensmodell gewählt?“ – Vergleichen Sie Wasserfallmodell und Scrum und begründen Sie die Wahl für ein 80-Stunden-Einzelprojekt.",
    solution: `<p><b>Wasserfall</b>: sequenzielle Phasen (Analyse → Entwurf → Implementierung → Test → Einführung), jede Phase mit Ergebnis abgeschlossen; gut planbar, klare Dokumentation, aber unflexibel bei Änderungen, Fehler fallen spät auf.</p>
<p><b>Scrum</b>: agil, iterativ in Sprints (1–4 Wochen), Rollen Product Owner, Scrum Master, Developers; Artefakte Product Backlog, Sprint Backlog, Increment; Events Sprint Planning, Daily, Review, Retrospektive. Flexibel, frühes Feedback, aber für Einzelpersonen und kurze Projekte nur eingeschränkt anwendbar (Rollen nicht besetzbar).</p>
<p><b>Begründung (Beispiel)</b>: „Die Anforderungen waren nach der Analyse stabil und der Zeitrahmen fest. Daher habe ich ein <b>Wasserfallmodell mit Rückkopplung</b> (bzw. V-Modell) gewählt; agile Elemente wie ein Zwischenreview mit der Fachabteilung habe ich ergänzt.“ – Alternativ ist auch eine agile Begründung möglich, wenn Anforderungen unklar waren und es regelmäßige Reviews gab.</p>`,
    keywords: ["wasserfall", "scrum", "sprint", "iterativ|agil", "anforderungen", "planbar", "feedback|review", "rollen|product owner"]
  },
  {
    id: "fg-fachgespraech-013", part: "FG", topic: "fg-fachgespraech", type: "text", difficulty: 2, points: 5,
    question: "„Wie haben Sie Versionskontrolle eingesetzt?“ – Beschreiben Sie eine Musterantwort zu Git (Konzepte, Branching, Nutzen).",
    solution: `<ul>
<li>„Ich habe <b>Git</b> mit einem zentralen Repository (z. B. GitLab/GitHub/Azure DevOps des Unternehmens) genutzt.“</li>
<li><b>Branching-Strategie</b>: <code>main</code> nur stabile Stände, Feature-Branches pro Funktion (z. B. <code>feature/raumbuchung</code>), Zusammenführung per <b>Merge/Pull Request</b> mit Code-Review.</li>
<li><b>Commits</b>: klein, aussagekräftige Messages (z. B. Conventional Commits „feat: …“, „fix: …“); <code>.gitignore</code> für Build-Artefakte und Secrets.</li>
<li><b>Nutzen</b>: Nachvollziehbarkeit (wer, was, wann, warum), Wiederherstellung älterer Stände, paralleles Arbeiten, Grundlage für CI/CD, Tags für Releases.</li>
<li>Merge-Konflikte: lokal auflösen, Tests erneut ausführen.</li>
</ul>`,
    keywords: ["git", "branch", "commit", "merge|pull request", "repository", "nachvollzieh|historie", "review", "ci"]
  },
  {
    id: "fg-fachgespraech-014", part: "FG", topic: "fg-fachgespraech", type: "text", difficulty: 2, points: 5,
    question: "„Wie wurde Ihre Anwendung in Betrieb genommen (Deployment)?“ – Beschreiben Sie eine Musterantwort inklusive CI/CD und Rollback.",
    solution: `<ul>
<li><b>Umgebungen</b>: Entwicklung → Test/Staging → Produktion; Konfiguration über Umgebungsvariablen, keine Passwörter im Code.</li>
<li><b>Build &amp; CI</b>: Bei jedem Push baut eine Pipeline (z. B. GitLab CI, GitHub Actions, Jenkins) die Anwendung, führt Unit-Tests und statische Codeanalyse aus.</li>
<li><b>Paketierung</b>: z. B. Docker-Image (Container) mit allen Abhängigkeiten → gleiche Laufzeitumgebung überall.</li>
<li><b>Deployment</b>: automatisiert auf den Testserver, nach Abnahme manuell freigegeben in Produktion (Continuous Delivery); Datenbankänderungen per Migrationsskript (z. B. Flyway/Liquibase).</li>
<li><b>Rollback</b>: vorheriges Image/Tag erneut ausrollen, Datenbank-Backup vor Migration.</li>
<li><b>Einführung</b>: Einweisung der Nutzer, Benutzerhandbuch, Monitoring/Logging nach Go-live.</li>
</ul>`,
    keywords: ["pipeline|ci/cd|ci", "test", "docker|container", "staging|testumgebung", "rollback", "backup", "migration", "konfiguration|umgebungsvariable"]
  },
  {
    id: "fg-fachgespraech-015", part: "FG", topic: "fg-fachgespraech", type: "text", difficulty: 3, points: 6,
    question: "„Wie haben Sie Ihre Webanwendung gegen Angriffe abgesichert?“ – Nennen Sie konkrete Maßnahmen gegen typische Schwachstellen (OWASP Top 10).",
    solution: `<ul>
<li><b>SQL-Injection</b>: Prepared Statements/parametrisierte Abfragen bzw. ORM, keine String-Verkettung von Benutzereingaben.</li>
<li><b>XSS</b>: Ausgaben kontextabhängig kodieren (Template-Engine/Framework escaped automatisch), Content-Security-Policy.</li>
<li><b>CSRF</b>: CSRF-Token bzw. SameSite-Cookies.</li>
<li><b>Authentifizierung</b>: Passwörter nur gehasht mit Salt (bcrypt/Argon2), SSO/AD-Anbindung, Sperre nach Fehlversuchen, ggf. 2FA.</li>
<li><b>Autorisierung</b>: rollenbasierte Rechte serverseitig prüfen (Broken Access Control vermeiden).</li>
<li><b>Transport</b>: HTTPS/TLS, sichere Cookies (HttpOnly, Secure).</li>
<li><b>Eingabevalidierung</b> serverseitig (Whitelist), Fehlermeldungen ohne interne Details.</li>
<li><b>Abhängigkeiten</b> aktuell halten (Dependency-Scan), Secrets nicht im Repository, Logging sicherheitsrelevanter Ereignisse.</li>
</ul>`,
    keywords: ["sql-injection|sql injection", "prepared statement|parametrisiert", "xss|cross-site scripting", "hash|bcrypt|argon2", "https|tls", "validierung|validieren", "rolle|autorisierung", "owasp"]
  },
  {
    id: "fg-fachgespraech-016", part: "FG", topic: "fg-fachgespraech", type: "text", difficulty: 2, points: 5,
    question: "„Was verstehen Sie unter Clean Code, und wo haben Sie das in Ihrem Projekt umgesetzt?“ – Formulieren Sie eine Musterantwort.",
    solution: `<p>Clean Code ist Quellcode, der <b>leicht lesbar, verständlich, änderbar und testbar</b> ist (nach Robert C. Martin).</p>
<ul>
<li><b>Sprechende Namen</b> für Klassen, Methoden, Variablen (<code>berechneGesamtpreis()</code> statt <code>calc()</code>).</li>
<li><b>Kleine Methoden</b> mit einer Aufgabe (Single Responsibility Principle).</li>
<li><b>DRY</b> (Don’t Repeat Yourself), <b>KISS</b> (Keep it simple), <b>YAGNI</b>.</li>
<li><b>SOLID</b>-Prinzipien, z. B. Abhängigkeiten über Interfaces (Dependency Inversion) → testbar mit Mocks.</li>
<li>Einheitliche Formatierung (Linter/Formatter), keine auskommentierten Codeblöcke, sinnvolle statt redundanter Kommentare.</li>
<li>Absicherung durch Unit-Tests und Code-Reviews; Refactoring in kleinen Schritten.</li>
</ul>
<p>Beispiel: „Die Konfliktprüfung für Buchungen habe ich in einen eigenen Service ausgelagert, statt sie im Controller zu implementieren.“</p>`,
    keywords: ["lesbar|verständlich", "namen", "single responsibility|srp", "dry", "kiss", "solid", "refactoring", "test"]
  },
  {
    id: "fg-fachgespraech-017", part: "FG", topic: "fg-fachgespraech", type: "text", difficulty: 3, points: 6,
    question: "„Haben Sie Entwurfsmuster (Design Patterns) eingesetzt?“ – Erläutern Sie zwei Muster, die in typischen Webprojekten vorkommen, und ihren Nutzen.",
    solution: `<ul>
<li><b>MVC (Model-View-Controller)</b> – Architekturmuster: Model = Daten/Logik, View = Darstellung, Controller = nimmt Eingaben entgegen und steuert. Nutzen: Trennung von Oberfläche und Logik, parallele Entwicklung, Testbarkeit.</li>
<li><b>Repository</b>: kapselt den Datenzugriff hinter einer Schnittstelle (z. B. <code>BuchungRepository.findByRaum()</code>). Nutzen: Geschäftslogik unabhängig von der Datenbanktechnik, leicht mockbar.</li>
<li><b>Dependency Injection</b> (z. B. durch Spring): Abhängigkeiten werden von außen übergeben → lose Kopplung.</li>
<li><b>Singleton</b>: genau eine Instanz (z. B. Konfiguration) – Nachteil: globaler Zustand, schwer testbar.</li>
<li><b>Observer</b>: Benachrichtigung bei Zustandsänderung (z. B. E-Mail-Versand nach neuer Buchung, Event-Listener im Frontend).</li>
<li><b>Strategy</b>: austauschbare Algorithmen über ein Interface (z. B. verschiedene Preisberechnungen).</li>
<li><b>Factory</b>: Objekterzeugung kapseln.</li>
</ul>
<p>Für die Antwort zwei Muster wählen, die wirklich im Projekt vorkommen, und am Code/Klassendiagramm zeigen.</p>`,
    keywords: ["mvc|model-view-controller", "repository", "singleton", "observer", "strategy", "factory", "lose kopplung|entkopplung", "dependency injection"]
  },
  {
    id: "fg-fachgespraech-018", part: "FG", topic: "fg-fachgespraech", type: "text", difficulty: 2, points: 5,
    question: "„Ihr Zeitplan wurde in der Implementierungsphase überschritten. Wie sind Sie damit umgegangen?“ – Formulieren Sie eine Musterantwort.",
    solution: `<ul>
<li><b>Ursache</b> sachlich nennen: z. B. unvollständige API-Dokumentation des Fremdsystems, Einarbeitung in eine Bibliothek unterschätzt.</li>
<li><b>Frühzeitiges Erkennen</b>: Abgleich Ist- gegen Planstunden im Projektverlauf.</li>
<li><b>Gegenmaßnahmen</b>: Rücksprache mit Ausbilder/Auftraggeber, Priorisierung (Muss- vor Kann-Anforderungen), Nutzung des Puffers, Verschiebung einer Kann-Funktion in den Ausblick – ohne Tests zu streichen.</li>
<li><b>Ergebnis</b>: Gesamtrahmen von 80 Stunden eingehalten, Abweichung im Soll-Ist-Vergleich dokumentiert.</li>
<li><b>Lernen</b>: künftig Risiken (unbekannte Schnittstellen) früher prüfen, z. B. durch Prototyp/Spike.</li>
</ul>`,
    keywords: ["ursache", "puffer", "priorisier", "rücksprache|auftraggeber|ausbilder", "soll-ist", "80", "risiko"]
  },
  {
    id: "fg-fachgespraech-019", part: "FG", topic: "fg-fachgespraech", type: "text", difficulty: 2, points: 5,
    question: "„Wie haben Sie die Anforderungen erhoben und dokumentiert?“ – Geben Sie eine Musterantwort.",
    solution: `<ul>
<li><b>Methoden</b>: Interviews/Workshops mit der Fachabteilung, Beobachtung des Ist-Prozesses, Analyse vorhandener Excel-Listen und Formulare.</li>
<li><b>Dokumentation</b>: Lastenheft des Auftraggebers als Grundlage, daraus Pflichtenheft (Lösungsbeschreibung), alternativ User Stories („Als Teamleiter möchte ich … damit …“) mit Akzeptanzkriterien.</li>
<li><b>Funktionale</b> (z. B. Raum buchen, stornieren) und <b>nicht-funktionale</b> Anforderungen (Antwortzeit &lt; 2 s, Barrierefreiheit, DSGVO, Browser-Kompatibilität).</li>
<li><b>Visualisierung</b>: Use-Case-Diagramm, Mockups zur frühen Abstimmung.</li>
<li><b>Priorisierung</b> (MoSCoW) und Freigabe durch den Auftraggeber; Anforderungen sind Basis für Abnahmetest.</li>
</ul>`,
    keywords: ["interview|workshop", "lastenheft", "pflichtenheft", "user stor", "funktional", "nicht-funktional|nichtfunktional", "use-case|use case", "priorisier|moscow"]
  },
  {
    id: "fg-fachgespraech-020", part: "FG", topic: "fg-fachgespraech", type: "text", difficulty: 3, points: 6,
    question: "Transferfrage: „Was müssten Sie ändern, wenn Ihre Anwendung statt 50 nun 50.000 Nutzer hätte?“ – Formulieren Sie eine strukturierte Antwort.",
    solution: `<ul>
<li><b>Engpässe analysieren</b>: Lasttests (z. B. JMeter), Monitoring von CPU, Speicher, Antwortzeiten, langsamen Abfragen.</li>
<li><b>Datenbank</b>: Indizes, Abfragen optimieren (N+1 vermeiden), Paginierung, Connection-Pooling, Read-Replikate.</li>
<li><b>Caching</b>: z. B. Redis oder HTTP-Caching für häufig gelesene Daten, CDN für statische Inhalte.</li>
<li><b>Horizontale Skalierung</b>: mehrere Instanzen hinter einem Load Balancer – Voraussetzung: zustandslose Anwendung (Sessions/Token z. B. JWT oder zentraler Session-Store).</li>
<li><b>Infrastruktur</b>: Container-Orchestrierung (Kubernetes) oder Cloud mit Autoscaling.</li>
<li><b>Asynchrone Verarbeitung</b>: Message Queue für E-Mails/Reports.</li>
<li>Kosten/Nutzen abwägen und Datenschutz bei Cloud-Nutzung beachten.</li>
</ul>`,
    keywords: ["lasttest|monitoring", "index", "cache|caching", "load balancer|lastverteil", "horizontal", "zustandslos|stateless", "cloud|kubernetes|container", "queue|asynchron"]
  },
  {
    id: "fg-fachgespraech-021", part: "FG", topic: "fg-fachgespraech", type: "text", difficulty: 2, points: 5,
    question: "„Was ist eine REST-Schnittstelle und wie haben Sie Ihre API gestaltet?“ – Formulieren Sie eine Musterantwort.",
    solution: `<p>REST (Representational State Transfer) ist ein Architekturstil für Webschnittstellen über HTTP:</p>
<ul>
<li><b>Ressourcen</b> mit eindeutigen URIs (z. B. <code>/api/raeume/12/buchungen</code>), Substantive statt Verben.</li>
<li><b>HTTP-Methoden</b>: GET (lesen), POST (anlegen), PUT/PATCH (ändern), DELETE (löschen); GET/PUT/DELETE sind idempotent.</li>
<li><b>Zustandslosigkeit</b>: jede Anfrage enthält alle nötigen Informationen (z. B. Token).</li>
<li><b>Statuscodes</b>: 200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 500 Internal Server Error.</li>
<li>Datenformat JSON, Versionierung (<code>/api/v1</code>), Dokumentation mit OpenAPI/Swagger.</li>
</ul>
<p>Beispiel: „Eine Doppelbuchung beantwortet die API mit 409 Conflict und einer verständlichen Fehlermeldung.“</p>`,
    keywords: ["ressource", "http", "get", "post", "statuscode|status", "zustandslos|stateless", "json", "openapi|swagger"]
  },
  {
    id: "fg-fachgespraech-022", part: "FG", topic: "fg-fachgespraech", type: "text", difficulty: 2, points: 4,
    question: "Der Prüfer zeigt auf einen Code-Ausschnitt Ihrer Präsentation und fragt: „Erklären Sie uns bitte, was hier passiert.“ – Beschreiben Sie, wie Sie vorgehen.",
    solution: `<ol>
<li><b>Einordnen</b>: „Das ist die Methode X im Service Y; sie wird aufgerufen, wenn …“ (Kontext, Zweck).</li>
<li><b>Ablauf schrittweise erklären</b>: Eingaben/Parameter → wichtige Bedingungen und Schleifen → Rückgabewert/Seiteneffekte.</li>
<li><b>Begründen</b>, warum es so umgesetzt wurde (z. B. Transaktion, Validierung, Performance) und welche Alternativen es gäbe.</li>
<li><b>Bezug zu Tests</b>: wie diese Stelle getestet wurde, welche Randfälle (null, leere Liste, Grenzwerte).</li>
<li>Ruhig bleiben, Fachbegriffe korrekt nennen (z. B. Lambda, Stream, Annotation, Exception), bei Fehlern im Code diese offen eingestehen und eine Verbesserung nennen.</li>
</ol>
<p>Vorbereitung: Jeden in Präsentation und Doku gezeigten Code-Ausschnitt vorher selbst Zeile für Zeile erklären können.</p>`,
    keywords: ["kontext|zweck", "schritt", "parameter|eingabe", "rückgabe", "begründ", "test", "randfall|grenzwert"]
  },
  {
    id: "fg-fachgespraech-023", part: "FG", topic: "fg-fachgespraech", type: "text", difficulty: 2, points: 5,
    question: "„Welche Maßnahmen zur Qualitätssicherung haben Sie außer Tests ergriffen?“ – Nennen und erläutern Sie mindestens vier Maßnahmen.",
    solution: `<ul>
<li><b>Code-Reviews</b> (Vier-Augen-Prinzip) über Pull Requests durch einen erfahrenen Entwickler.</li>
<li><b>Statische Codeanalyse</b> (z. B. SonarQube, ESLint) zur Erkennung von Code Smells und Sicherheitslücken.</li>
<li><b>Coding-Konventionen</b> und automatische Formatierung (Prettier, Checkstyle).</li>
<li><b>Continuous Integration</b>: automatischer Build und Tests bei jedem Commit.</li>
<li><b>Frühe Abstimmung</b> mit dem Auftraggeber durch Mockups/Prototyp (Validierung der Anforderungen).</li>
<li><b>Dokumentation</b> (Code-Kommentare, API-Doku, Benutzerhandbuch) und definierte <b>Abnahmekriterien</b>.</li>
<li>Usability-Prüfung nach DIN EN ISO 9241-110 (Dialogprinzipien).</li>
</ul>`,
    keywords: ["code-review|review", "statische|sonar|linter", "konvention|formatierung", "continuous integration|ci", "prototyp|mockup", "abnahmekriterien|abnahme", "dokumentation"]
  },
  {
    id: "fg-fachgespraech-024", part: "FG", topic: "fg-fachgespraech", type: "text", difficulty: 2, points: 5,
    question: "„Wie haben Sie die Benutzerfreundlichkeit (Software-Ergonomie) und Barrierefreiheit Ihrer Oberfläche sichergestellt?“ – Formulieren Sie eine Musterantwort.",
    solution: `<ul>
<li>Orientierung an den <b>Interaktionsprinzipien der DIN EN ISO 9241-110</b>: Aufgabenangemessenheit, Selbstbeschreibungsfähigkeit, Erwartungskonformität, Erlernbarkeit, Steuerbarkeit, Robustheit gegen Benutzungsfehler, Benutzerbindung.</li>
<li>Konkrete Beispiele: einheitliche Navigation, verständliche Fehlermeldungen mit Lösungshinweis, Pflichtfelder markiert, Bestätigungsdialog vor dem Löschen, Undo-Möglichkeit.</li>
<li><b>Barrierefreiheit</b> (WCAG 2.x, BITV, Barrierefreiheitsstärkungsgesetz): ausreichende Kontraste, Tastaturbedienbarkeit, Alternativtexte, semantisches HTML/ARIA, skalierbare Schrift.</li>
<li>Responsive Design für verschiedene Endgeräte.</li>
<li>Validierung durch Mockups, Feedback der Nutzer und einen kurzen Usability-Test.</li>
</ul>`,
    keywords: ["9241", "aufgabenangemessen", "erwartungskonform", "fehler", "barrierefrei|wcag", "kontrast", "tastatur", "responsive"]
  },
  {
    id: "fg-fachgespraech-025", part: "FG", topic: "fg-fachgespraech", type: "text", difficulty: 2, points: 4,
    question: "„Wie behandeln Sie Fehler und Ausnahmen in Ihrer Anwendung?“ – Formulieren Sie eine Musterantwort.",
    solution: `<ul>
<li><b>Exceptions</b> gezielt werfen und fangen (try-catch-finally bzw. try-with-resources), keine leeren catch-Blöcke.</li>
<li>Eigene, fachliche Exceptions (z. B. <code>RaumBereitsGebuchtException</code>) für erwartbare Fehler; technische Fehler zentral behandeln (globaler Exception-Handler).</li>
<li><b>Benutzerfreundliche Meldungen</b> in der Oberfläche, aber keine internen Details (Stacktrace) nach außen – Sicherheitsaspekt.</li>
<li>Passende HTTP-Statuscodes bei der API (400, 404, 409, 500).</li>
<li><b>Logging</b> mit Log-Levels (ERROR, WARN, INFO, DEBUG) über ein Framework (z. B. SLF4J/Logback), keine personenbezogenen Daten oder Passwörter im Log.</li>
<li>Transaktionen bei Fehlern zurückrollen (Rollback) → konsistente Daten.</li>
</ul>`,
    keywords: ["exception", "try|catch", "logging|log", "meldung", "statuscode|status", "rollback|transaktion", "stacktrace"]
  },
  {
    id: "fg-fachgespraech-026", part: "FG", topic: "fg-fachgespraech", type: "text", difficulty: 2, points: 4,
    question: "„Sie verwenden Open-Source-Bibliotheken. Was mussten Sie dabei beachten?“ – Formulieren Sie eine Musterantwort.",
    solution: `<ul>
<li><b>Lizenzbedingungen</b> prüfen: permissive Lizenzen (MIT, Apache 2.0, BSD) erlauben kommerzielle Nutzung mit Lizenz-/Copyright-Hinweis; <b>Copyleft</b>-Lizenzen (GPL) verlangen bei Weitergabe abgeleiteter Software die Offenlegung des Quellcodes unter gleicher Lizenz – für interne Nutzung meist unkritisch, bei Auslieferung an Kunden relevant; LGPL bei dynamischer Einbindung weniger streng.</li>
<li>Unternehmensrichtlinien (Freigabeliste) beachten.</li>
<li><b>Sicherheit und Wartung</b>: aktive Community, regelmäßige Updates, bekannte Schwachstellen (CVE) per Dependency-Scan prüfen.</li>
<li>Abhängigkeiten über Paketmanager (Maven, npm) mit festen Versionen verwalten.</li>
</ul>`,
    keywords: ["lizenz", "mit|apache", "gpl|copyleft", "quellcode", "sicherheit|cve|schwachstelle", "update|wartung", "paketmanager|maven|npm"]
  },
  {
    id: "fg-fachgespraech-027", part: "FG", topic: "fg-fachgespraech", type: "text", difficulty: 2, points: 4,
    question: "„Wie ist sichergestellt, dass die Daten Ihrer Anwendung nicht verloren gehen?“ – Formulieren Sie eine Musterantwort zu Datensicherung und Verfügbarkeit.",
    solution: `<ul>
<li><b>Backup-Konzept</b>: tägliche automatisierte Datenbanksicherung (z. B. Vollsicherung wöchentlich, inkrementell/differenziell täglich), Aufbewahrungsdauer festgelegt.</li>
<li><b>3-2-1-Regel</b>: 3 Kopien, 2 verschiedene Medien, 1 Kopie extern/offline (Schutz vor Ransomware).</li>
<li><b>Wiederherstellung testen</b> (Restore-Test) – ein Backup ist nur so gut wie seine Wiederherstellung.</li>
<li>Verfügbarkeit: Betrieb im Rechenzentrum mit USV, ggf. Redundanz (RAID, Datenbank-Replikation); RAID ersetzt kein Backup.</li>
<li>Transaktionen (ACID) sichern die Konsistenz im laufenden Betrieb.</li>
<li>Abstimmung mit der IT-Abteilung bzw. dem Betriebskonzept des Unternehmens.</li>
</ul>`,
    keywords: ["backup|datensicherung", "inkrementell|differenziell|vollsicherung", "3-2-1", "wiederherstell|restore", "redundanz|raid|replikation", "usv", "acid|transaktion"]
  },
  {
    id: "fg-fachgespraech-028", part: "FG", topic: "fg-fachgespraech", type: "text", difficulty: 1, points: 4,
    question: "Zu Beginn des Fachgesprächs bittet der Prüfer: „Fassen Sie Ihr Projekt bitte noch einmal in zwei Minuten zusammen.“ – Geben Sie eine Struktur und ein Beispiel.",
    solution: `<p><b>Struktur</b> (Elevator Pitch): Problem → Ziel → Lösung → Ergebnis/Nutzen.</p>
<p><b>Beispiel</b>: „In unserer Firma wurden Besprechungsräume über eine gemeinsam genutzte Excel-Datei gebucht. Das führte zu Doppelbuchungen und Versionskonflikten. Ziel war eine Webanwendung, mit der alle Mitarbeiter Räume in Echtzeit buchen können. Ich habe dazu eine Spring-Boot-Anwendung mit Angular-Frontend und PostgreSQL-Datenbank entwickelt, die über das Active Directory angemeldet wird. Nach erfolgreichem Abnahmetest ist die Anwendung seit Oktober im Einsatz; Doppelbuchungen sind ausgeschlossen und die Verwaltung spart etwa 6 Stunden pro Monat, womit sich das Projekt nach rund 14 Monaten amortisiert.“</p>`,
    keywords: ["problem|ausgangssituation", "ziel", "lösung", "ergebnis|nutzen", "amortis", "abnahme"]
  },
  {
    id: "fg-fachgespraech-029", part: "FG", topic: "fg-fachgespraech", type: "text", difficulty: 2, points: 5,
    question: "„Warum haben Sie eine Eigenentwicklung umgesetzt, statt eine fertige Standardsoftware zu kaufen?“ – Formulieren Sie eine Musterantwort.",
    solution: `<ul>
<li><b>Make-or-Buy-Analyse</b> durchgeführt: Marktrecherche zu 2–3 Standardprodukten/SaaS-Angeboten.</li>
<li><b>Kosten</b>: Lizenzkosten pro Nutzer und Jahr vs. einmalige Entwicklungskosten + Wartung; kritische Menge/Break-even berechnet.</li>
<li><b>Anforderungsabdeckung</b>: Standardsoftware deckte spezielle Prozesse (z. B. Anbindung an das ERP, interne Kostenstellenlogik) nicht ab; Anpassung (Customizing) wäre teuer gewesen.</li>
<li><b>Abhängigkeit</b>: Vendor-Lock-in, Preissteigerungen, Einstellung des Produkts.</li>
<li><b>Datenschutz</b>: Datenhaltung im eigenen Haus statt bei einem Drittanbieter (Auftragsverarbeitung, Drittlandtransfer).</li>
<li>Nachteile offen nennen: Wartungsaufwand und Know-how-Bindung im eigenen Team.</li>
</ul>`,
    keywords: ["make-or-buy|make or buy", "lizenz", "kosten", "anforderung", "abhängigkeit|lock-in", "datenschutz", "wartung", "anpassung|customizing"]
  },
  {
    id: "fg-fachgespraech-030", part: "FG", topic: "fg-fachgespraech", type: "text", difficulty: 2, points: 4,
    question: "„Wie stellen Sie sicher, dass ein anderer Entwickler Ihre Anwendung später warten und weiterentwickeln kann?“ – Formulieren Sie eine Musterantwort.",
    solution: `<ul>
<li><b>Lesbarer, strukturierter Code</b> (Clean Code, einheitliche Konventionen, sinnvolle Paketstruktur).</li>
<li><b>Automatisierte Tests</b> als Sicherheitsnetz für Änderungen (Regression).</li>
<li><b>Entwicklerdokumentation</b>: README mit Setup-Anleitung, Architekturübersicht, API-Dokumentation (OpenAPI), Datenmodell.</li>
<li><b>Versionskontrolle</b> mit nachvollziehbarer Historie und Issues/Tickets.</li>
<li>Reproduzierbare Umgebung (Docker, Build-Tool), CI-Pipeline.</li>
<li>Verbreitete Technologien statt Exoten (Know-how im Unternehmen), Übergabe/Code-Walkthrough an das Team.</li>
</ul>`,
    keywords: ["clean code|lesbar", "test", "dokumentation|readme", "versionskontrolle|git", "docker|umgebung", "konvention", "übergabe"]
  },
  {
    id: "fg-fachgespraech-031", part: "FG", topic: "fg-fachgespraech", type: "text", difficulty: 3, points: 5,
    question: "Transferfrage: „Erklären Sie den Unterschied zwischen Authentifizierung und Autorisierung und wie beides in Ihrer Anwendung umgesetzt ist.“",
    solution: `<p><b>Authentifizierung</b>: Nachweis der Identität – „Wer bist du?“ (z. B. Benutzername + Passwort, SSO über Active Directory/OAuth 2.0 mit OpenID Connect, Zwei-Faktor-Authentifizierung).</p>
<p><b>Autorisierung</b>: Prüfung der Berechtigung – „Was darfst du?“ (z. B. Rollen „Mitarbeiter“, „Raumverwalter“, „Administrator“; rollenbasierte Zugriffskontrolle RBAC).</p>
<p><b>Umsetzung (Beispiel)</b>: Login über das Unternehmens-SSO, die Anwendung erhält ein Token (z. B. JWT) mit Rolleninformationen. Jede API-Anfrage wird <b>serverseitig</b> geprüft (z. B. Annotation <code>@PreAuthorize("hasRole('ADMIN')")</code>); das Ausblenden von Buttons im Frontend allein genügt nicht. Prinzip der minimalen Rechte (Least Privilege).</p>`,
    keywords: ["authentifizierung", "autorisierung", "identität", "berechtigung|rechte", "rolle|rbac", "token|jwt|sso", "serverseitig", "least privilege|minimale rechte"]
  },
  {
    id: "fg-fachgespraech-032", part: "FG", topic: "fg-fachgespraech", type: "text", difficulty: 2, points: 4,
    question: "„Welche UML-Diagramme haben Sie verwendet und wozu?“ – Formulieren Sie eine Musterantwort.",
    solution: `<ul>
<li><b>Use-Case-Diagramm</b>: Akteure und Anwendungsfälle → Abstimmung des Funktionsumfangs mit dem Auftraggeber (Analyse).</li>
<li><b>Aktivitätsdiagramm</b>: Ist- und Soll-Prozess (z. B. Buchungsablauf) → Schwachstellen sichtbar machen.</li>
<li><b>Klassendiagramm</b>: Klassen, Attribute, Methoden, Beziehungen (Assoziation, Aggregation, Komposition, Vererbung) → Entwurf der Domäne.</li>
<li><b>Sequenzdiagramm</b>: zeitlicher Nachrichtenaustausch z. B. Browser → Controller → Service → Repository → DB.</li>
<li>Ggf. <b>Zustandsdiagramm</b> (Status einer Buchung) oder <b>Komponenten-/Verteilungsdiagramm</b> (Architektur, Server).</li>
</ul>
<p>Wichtig: Diagramme nicht „zum Selbstzweck“, sondern zur Kommunikation und Planung – im Fachgespräch erklären können, was sie aussagen.</p>`,
    keywords: ["use-case|anwendungsfall", "aktivitätsdiagramm", "klassendiagramm", "sequenzdiagramm", "zustandsdiagramm|verteilungsdiagramm|komponentendiagramm", "akteur", "vererbung|assoziation"]
  }
);
