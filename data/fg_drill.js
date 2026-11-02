/* AP2-Lerntool – Prüfer-Drill fürs Fachgespräch (FIAE, AO 2020)
 * questions: allgemeine Prüferfragen, templates: Vorlagen mit Platzhaltern aus den Projekt-Eckdaten.
 * Platzhalter: {titel} {ausgang} {ziel} {tech} {tech.alt} {tech.grund} {entscheidung} {entscheidung.alt}
 *   {entscheidung.grund} {problem} {loesung} {vorgehen} {qs} {kosten} {nutzen} {amortisation} {soll} {ist}
 *   Fallback: {platzhalter|Ersatztext}. needs: alle Platzhalter, die OHNE Fallback vorkommen.
 * hints: Stichpunkte für die Selbstbewertung; Alternativen mit "|" (der erste Begriff wird angezeigt).
 */
window.AP2 = window.AP2 || { topics: [], questions: [], exams: [], generators: [] };
window.AP2.fgDrill = window.AP2.fgDrill || { questions: [], templates: [] };

/* ================================================== Allgemeine Prüferfragen */
window.AP2.fgDrill.questions.push(
  /* ---------------------------------------------------------------- Technik */
  {
    id: "fgd-q-001", cat: "technik",
    text: "Was ist ein Datenbankindex, und wann ist ein Index sinnvoll – wann eher schädlich?",
    hints: ["B-Baum|B-Tree|Baumstruktur", "schnellere Suche|Lesezugriff|Suche", "langsameres Schreiben|INSERT|UPDATE", "Speicherplatz|Speicher", "WHERE|JOIN|Fremdschlüssel"],
    followUps: ["Würden Sie auf jede Spalte einer Tabelle einen Index legen? Begründen Sie."]
  },
  {
    id: "fgd-q-002", cat: "technik",
    text: "Was ist eine Datenbanktransaktion? Erklären Sie die ACID-Eigenschaften.",
    hints: ["Atomarität|atomar|alles oder nichts", "Konsistenz|konsistent", "Isolation|isoliert", "Dauerhaftigkeit|Durability|persistent", "COMMIT|ROLLBACK"],
    followUps: ["Was ist ein Deadlock, und wie kann ein Datenbanksystem damit umgehen?"]
  },
  {
    id: "fgd-q-003", cat: "technik",
    text: "Wie speichert man Passwörter in einer Anwendung richtig?",
    hints: ["Hashfunktion|Hash|gehasht", "Salt", "bcrypt|Argon2|PBKDF2|scrypt", "nicht verschlüsselt|Einwegfunktion|nicht umkehrbar", "langsam|Kostenfaktor|Work Factor"],
    followUps: ["Warum sind MD5 oder SHA-1 für Passwörter ungeeignet?"]
  },
  {
    id: "fgd-q-004", cat: "technik",
    text: "Erklären Sie an einem Beispiel, wie eine SQL-Injection funktioniert und warum Prepared Statements sie verhindern.",
    hints: ["Benutzereingabe|Eingabe", "String-Verkettung|zusammengesetzt|konkateniert", "Prepared Statement|parametrisiert|Platzhalter", "Daten und Befehl getrennt|getrennt", "OR 1=1|Anmeldung umgehen|Daten auslesen"],
    followUps: ["Reicht es aus, Hochkommas aus der Eingabe zu entfernen?"]
  },
  {
    id: "fgd-q-005", cat: "technik",
    text: "Was ist Cross-Site-Scripting (XSS), welche Arten gibt es und wie schützen Sie sich davor?",
    hints: ["JavaScript|Skript|Schadcode", "Ausgabe kodieren|Escaping|escapen|encode", "reflektiert|persistent|gespeichert|DOM", "Content-Security-Policy|CSP", "Session-Cookie|Cookie|Sitzung"],
    followUps: ["Was bewirkt das Cookie-Attribut HttpOnly?"]
  },
  {
    id: "fgd-q-006", cat: "technik",
    text: "Erklären Sie das MVC-Muster und grenzen Sie es von einer Drei-Schichten-Architektur ab.",
    hints: ["Model|Modell", "View|Ansicht", "Controller|Steuerung", "Trennung der Zuständigkeiten|Separation of Concerns|Trennung", "Präsentation|Logik|Datenhaltung|Schicht"],
    followUps: ["Wo genau liegt in Ihrer Anwendung die Geschäftslogik?"]
  },
  {
    id: "fgd-q-007", cat: "technik",
    text: "Worin unterscheidet sich eine sitzungsbasierte Anmeldung (Session) von einer tokenbasierten Anmeldung (z. B. JWT)?",
    hints: ["serverseitig|Server speichert", "Cookie|Session-ID", "Token|JWT", "Signatur|signiert", "zustandslos|stateless", "Ablaufzeit|Gültigkeit|expire"],
    followUps: ["Wie würden Sie ein JWT vor Ablauf ungültig machen, z. B. nach einem Passwortwechsel?"]
  },
  {
    id: "fgd-q-008", cat: "technik",
    text: "Was unterscheidet einen Container (z. B. Docker) von einer virtuellen Maschine?",
    hints: ["Kernel|Betriebssystemkern", "Image", "Hypervisor", "leichtgewichtig|ressourcenschonend|schneller Start", "Isolation|isoliert", "reproduzierbar|portabel"],
    followUps: ["Wie würden Sie die Daten einer Datenbank in einem Container dauerhaft speichern?"]
  },
  {
    id: "fgd-q-009", cat: "technik",
    text: "Wie funktioniert HTTPS vereinfacht, und wozu braucht man dabei Zertifikate?",
    hints: ["TLS", "Zertifikat|Zertifizierungsstelle|CA", "asymmetrisch|öffentlicher Schlüssel|Public Key", "symmetrisch|Sitzungsschlüssel", "Handshake", "Man-in-the-Middle|Integrität|Authentizität"],
    followUps: ["Was passiert, wenn ein Zertifikat abgelaufen ist?"]
  },
  {
    id: "fgd-q-010", cat: "technik",
    text: "Was versteht man unter referentieller Integrität, und wie setzen Sie sie in einer relationalen Datenbank durch?",
    hints: ["Fremdschlüssel|Foreign Key", "Primärschlüssel", "ON DELETE|CASCADE|RESTRICT", "Constraint|Einschränkung", "verwaiste Datensätze|verwaist|Datenintegrität"],
    followUps: ["Wann würden Sie ON DELETE CASCADE einsetzen und wann nicht?"]
  },
  {
    id: "fgd-q-011", cat: "technik",
    text: "Wann würden Sie eine NoSQL-Datenbank statt einer relationalen Datenbank einsetzen?",
    hints: ["Schema|schemalos|flexibel", "horizontale Skalierung|Skalierung|skalier", "Dokument|Key-Value|Graph", "Konsistenz|ACID|eventual", "Beziehungen|Joins"],
    followUps: ["Hätte NoSQL für Ihr Projekt Vorteile gebracht?"]
  },
  {
    id: "fgd-q-012", cat: "technik",
    text: "Was ist Dependency Injection, und welchen Vorteil bringt sie?",
    hints: ["Abhängigkeit", "von außen übergeben|Konstruktor|übergeben", "lose Kopplung|lose gekoppelt", "testbar|Mock", "Framework|Container|Spring"],
    followUps: ["Wie hängt Dependency Injection mit dem Dependency-Inversion-Prinzip zusammen?"]
  },

  /* ------------------------------------------------------------------ QS */
  {
    id: "fgd-q-013", cat: "qs",
    text: "Erklären Sie testgetriebene Entwicklung (TDD). Welche Vor- und Nachteile hat sie?",
    hints: ["Test zuerst|zuerst den Test", "Red|rot|fehlschlagen", "Green|grün", "Refactoring|Refactor", "kleine Schritte", "Mehraufwand|Aufwand"],
    followUps: ["Haben Sie in Ihrem Projekt testgetrieben gearbeitet? Warum (nicht)?"]
  },
  {
    id: "fgd-q-014", cat: "qs",
    text: "Ihre Tests erreichen eine Testabdeckung von 80 %. Was sagt diese Zahl aus – und was nicht?",
    hints: ["Anweisungsüberdeckung|Code Coverage|Zeilen", "Zweigüberdeckung|Branch|Zweig", "nicht fehlerfrei|keine Aussage über Qualität|Qualität", "Randfälle|Grenzwerte", "JaCoCo|Istanbul|coverage"],
    followUps: ["Welche Teile Ihrer Anwendung würden Sie bewusst nicht mit Unit-Tests abdecken?"]
  },
  {
    id: "fgd-q-015", cat: "qs",
    text: "Wie leiten Sie Testfälle systematisch ab? Erklären Sie Äquivalenzklassen und Grenzwertanalyse an einem Beispiel.",
    hints: ["Äquivalenzklasse", "Grenzwert", "gültig|ungültig", "Black-Box|Blackbox", "Repräsentant|Stellvertreter"],
    followUps: ["Nennen Sie die Testwerte für ein Eingabefeld „Alter“, das Werte von 18 bis 67 erlaubt."]
  },
  {
    id: "fgd-q-016", cat: "qs",
    text: "Was ist ein Mock-Objekt, und wozu brauchen Sie es beim Unit-Test?",
    hints: ["isoliert|Isolation", "Abhängigkeit", "Datenbank|externe Schnittstelle|Schnittstelle", "simulieren|Attrappe|Stub", "Verhalten prüfen|Aufruf prüfen|verify"],
    followUps: ["Wo liegt die Grenze zwischen Unit-Test und Integrationstest?"]
  },
  {
    id: "fgd-q-017", cat: "qs",
    text: "Was ist Refactoring, und wie stellen Sie sicher, dass dabei keine Fehler entstehen?",
    hints: ["Struktur verbessern|Struktur", "Verhalten unverändert|ohne Funktionsänderung|gleiches Verhalten", "Tests|Regressionstest", "kleine Schritte", "Code Smell|Duplikat|lange Methode"],
    followUps: ["Nennen Sie ein Beispiel für ein Refactoring aus Ihrem Projekt."]
  },
  {
    id: "fgd-q-018", cat: "qs",
    text: "Wie erkennen Sie Fehler, nachdem Ihre Anwendung in Betrieb genommen wurde?",
    hints: ["Logging|Log", "Log-Level|ERROR|WARN", "Monitoring|Überwachung", "Alarm|Benachrichtigung", "keine personenbezogenen Daten|Datenschutz", "Fehlermeldung der Nutzer|Ticket|Support"],
    followUps: ["Welche Informationen gehören in einen Log-Eintrag – und welche nicht?"]
  },

  /* ------------------------------------------------------------ Wirtschaft */
  {
    id: "fgd-q-019", cat: "wirtschaft",
    text: "Wie führen Sie eine Nutzwertanalyse durch?",
    hints: ["Kriterien", "Gewichtung|gewichten", "Bewertung|Punkte", "Nutzwert|Summe|multiplizieren", "Alternativen vergleichen|Alternativen"],
    followUps: ["Welche Schwäche hat die Nutzwertanalyse, und wie können Sie diese abmildern?"]
  },
  {
    id: "fgd-q-020", cat: "wirtschaft",
    text: "Wie berechnet man die Amortisationszeit, und welche Schwächen hat diese Kennzahl?",
    hints: ["Investition|Projektkosten|Kosten", "Einsparung|laufender Nutzen|Ersparnis", "dividieren|geteilt|durch", "Zinsen|Zeitwert", "Nutzen nach der Amortisation|danach"],
    followUps: ["Wie würde sich die Amortisationszeit ändern, wenn laufende Wartungskosten anfallen?"]
  },
  {
    id: "fgd-q-021", cat: "wirtschaft",
    text: "Wie kommen Sie auf den Stundensatz, mit dem Sie die Personalkosten Ihres Projekts berechnet haben?",
    hints: ["Bruttogehalt|Gehalt", "Arbeitgeberanteil|Sozialversicherung|Lohnnebenkosten", "Gemeinkosten|Arbeitsplatzkosten|Overhead", "Jahresarbeitsstunden|produktive Stunden", "Ressourcen|Hardware|Lizenzen"],
    followUps: ["Warum ist der Stundensatz deutlich höher als das Gehalt pro Stunde?"]
  },

  /* ----------------------------------------------------- Projektmanagement */
  {
    id: "fgd-q-022", cat: "projektmanagement",
    text: "Was ist der kritische Pfad, und wozu dienen Pufferzeiten?",
    hints: ["längste Kette|Vorgangskette|längster Weg", "kein Puffer|Puffer null|Puffer 0", "Netzplan", "Gesamtpuffer|freier Puffer", "Endtermin|Verzögerung"],
    followUps: ["Wie hätten Sie Ihren Projektplan als Netzplan darstellen können?"]
  },
  {
    id: "fgd-q-023", cat: "projektmanagement",
    text: "Grenzen Sie Lastenheft und Pflichtenheft voneinander ab.",
    hints: ["Auftraggeber", "Auftragnehmer", "Was|Anforderungen", "Wie|Umsetzung", "verbindlich|Vertragsgrundlage|Vertrag"],
    followUps: ["Gab es in Ihrem Projekt ein Lasten- oder Pflichtenheft? Wer hat es erstellt?"]
  },
  {
    id: "fgd-q-024", cat: "projektmanagement",
    text: "Was ist ein Meilenstein, und welche Meilensteine hatte Ihr Projekt?",
    hints: ["Zeitpunkt|Ereignis", "keine Dauer|Dauer null", "überprüfbares Ergebnis|Ergebnis", "Phasenende|Phase", "Fortschrittskontrolle|Kontrolle"],
    followUps: ["Was passiert, wenn ein Meilenstein nicht erreicht wird?"]
  },
  {
    id: "fgd-q-025", cat: "projektmanagement",
    text: "Welche Risiken gibt es typischerweise in einem Softwareprojekt, und wie gehen Sie mit ihnen um?",
    hints: ["Risikoanalyse|Eintrittswahrscheinlichkeit", "Auswirkung|Schadenshöhe", "Gegenmaßnahme|Maßnahme", "Puffer", "Ausfall|Krankheit|technische Probleme"],
    followUps: ["Welches Risiko ist in Ihrem Projekt tatsächlich eingetreten?"]
  },

  /* ---------------------------------------------------------- Datenschutz */
  {
    id: "fgd-q-026", cat: "datenschutz",
    text: "Nennen Sie Grundsätze der DSGVO für die Verarbeitung personenbezogener Daten.",
    hints: ["Rechtmäßigkeit|Rechtsgrundlage", "Zweckbindung", "Datenminimierung", "Speicherbegrenzung|Löschfrist|Löschung", "Integrität|Vertraulichkeit", "Transparenz"],
    followUps: ["Wie haben Sie Datenminimierung in Ihrem Projekt umgesetzt?"]
  },
  {
    id: "fgd-q-027", cat: "datenschutz",
    text: "Welche Rechte haben Betroffene nach der DSGVO, und wie muss eine Anwendung technisch darauf vorbereitet sein?",
    hints: ["Auskunft", "Löschung|Vergessenwerden", "Berichtigung", "Datenübertragbarkeit|Export", "Widerspruch|Einschränkung"],
    followUps: ["Wie würden Sie das Recht auf Löschung umsetzen, wenn Daten auch in Backups liegen?"]
  },
  {
    id: "fgd-q-028", cat: "datenschutz",
    text: "Was ist der Unterschied zwischen Pseudonymisierung und Anonymisierung?",
    hints: ["Pseudonym|Kennung|Kennziffer", "Zuordnung|Schlüssel|Zuordnungstabelle", "nicht rückführbar|kein Personenbezug", "DSGVO gilt weiter|weiterhin personenbezogen", "Testdaten"],
    followUps: ["Mit welchen Daten haben Sie während der Entwicklung getestet?"]
  },
  {
    id: "fgd-q-029", cat: "datenschutz",
    text: "Ihre Anwendung soll bei einem Cloud-Anbieter betrieben werden. Was ist datenschutzrechtlich zu beachten?",
    hints: ["Auftragsverarbeitung|AVV", "Serverstandort|Drittland|USA", "Angemessenheitsbeschluss|Standardvertragsklauseln", "Verschlüsselung", "TOM|technische und organisatorische Maßnahmen"],
    followUps: ["Wer ist in diesem Fall Verantwortlicher im Sinne der DSGVO?"]
  },

  /* ---------------------------------------------------------------- Recht */
  {
    id: "fgd-q-030", cat: "recht",
    text: "Wem stehen die Rechte an der Software zu, die Sie als Angestellte(r) im Betrieb entwickelt haben?",
    hints: ["Arbeitgeber", "Nutzungsrecht|vermögensrechtliche Befugnisse", "Urheber|Urheberpersönlichkeitsrecht", "§ 69b UrhG|69b|Urheberrechtsgesetz", "Arbeitsvertrag|dienstlich"],
    followUps: ["Dürften Sie Teile des Quellcodes in Ihrem privaten GitHub-Profil veröffentlichen?"]
  },
  {
    id: "fgd-q-031", cat: "recht",
    text: "Welche gesetzlichen Vorgaben und Standards zur Barrierefreiheit kennen Sie, und wie prüfen Sie eine Weboberfläche darauf?",
    hints: ["WCAG", "BITV|Barrierefreiheitsstärkungsgesetz|BFSG", "Kontrast", "Tastaturbedienung|Tastatur", "Screenreader|Alternativtext", "Lighthouse|WAVE|axe|Prüfwerkzeug"],
    followUps: ["Nennen Sie die vier Grundprinzipien der WCAG."]
  },
  {
    id: "fgd-q-032", cat: "recht",
    text: "Was regelt ein Service Level Agreement (SLA), und welche Kennzahlen enthält es typischerweise?",
    hints: ["Verfügbarkeit|99", "Reaktionszeit", "Wiederherstellungszeit|Lösungszeit", "Vertragsstrafe|Pönale", "Messung|Reporting|Bericht"],
    followUps: ["Wie viele Stunden Ausfall im Jahr erlaubt eine Verfügbarkeit von 99,5 %?"]
  },

  /* ------------------------------------------------------------- Methodik */
  {
    id: "fgd-q-033", cat: "methodik",
    text: "Was bedeutet Semantic Versioning, z. B. bei der Versionsnummer 2.4.1?",
    hints: ["Major|Hauptversion", "Minor|Nebenversion", "Patch|Fehlerbehebung", "inkompatibel|Breaking Change", "abwärtskompatibel|kompatibel"],
    followUps: ["Wie hätten Sie die Versionen Ihrer Anwendung nummeriert?"]
  },
  {
    id: "fgd-q-034", cat: "methodik",
    text: "Wie stellen Sie sicher, dass Ihr Quellcode für andere verständlich dokumentiert ist, ohne zu viel zu kommentieren?",
    hints: ["sprechende Namen|aussagekräftige Namen|Bezeichner", "Warum statt Was|Warum", "Javadoc|Docstring|Schnittstellendokumentation", "README|Entwicklerdokumentation", "veraltete Kommentare|aktuell halten"],
    followUps: ["Zeigen Sie an einem Beispiel, wann ein Kommentar sinnvoll ist."]
  },

  /* ------------------------------------------------------------ Reflexion */
  {
    id: "fgd-q-035", cat: "reflexion",
    text: "Was haben Sie während des Projekts über Ihre eigene Arbeitsweise gelernt?",
    hints: ["konkretes Beispiel|Beispiel", "Erkenntnis|gelernt", "künftig|nächstes Mal|zukünftig", "ehrlich|Schwäche"],
    followUps: ["Wie setzen Sie diese Erkenntnis heute schon um?"]
  },
  {
    id: "fgd-q-036", cat: "reflexion",
    text: "Sie hätten zehn zusätzliche Projektstunden gehabt. Wofür hätten Sie sie eingesetzt?",
    hints: ["Priorität|priorisieren", "Tests|Testabdeckung", "Dokumentation", "Nutzen|Begründung", "Kann-Kriterium|Erweiterung|Feature"],
    followUps: ["Warum genau diese Priorität und nicht eine andere?"]
  },
  {
    id: "fgd-q-037", cat: "reflexion",
    text: "Wie sind Sie vorgegangen, wenn Sie bei einem technischen Problem nicht weiterkamen?",
    hints: ["eingrenzen|reproduzieren|Debugger", "Recherche|Dokumentation|Stack Overflow", "Kollegen|Ausbilder|Ansprechpartner", "Zeitlimit|Timebox", "dokumentiert|festgehalten"]
  }
);

/* ================================================== Vorlagen mit Projektbezug */
window.AP2.fgDrill.templates.push(
  /* ---------------------------------------------------------------- Technik */
  {
    id: "fgd-t-001", cat: "technik", needs: ["tech"],
    text: "Warum haben Sie sich für {tech} entschieden und nicht für {tech.alt|eine Alternative}?",
    hints: ["Kriterien|Anforderungen", "Vergleich|Alternative", "Vorkenntnisse|Know-how|Betriebsstandard", "Kosten|Lizenz", "weil"],
    followUps: ["Welche Kriterien waren für diese Entscheidung ausschlaggebend, und wie haben Sie sie gewichtet?"]
  },
  {
    id: "fgd-t-002", cat: "technik", needs: ["tech"],
    text: "Welche Nachteile hat {tech}, und wie sind Sie in Ihrem Projekt damit umgegangen?",
    hints: ["Nachteil|Schwäche", "Einschränkung|Grenze", "Gegenmaßnahme|Workaround|umgangen", "Abwägung|in Kauf genommen"]
  },
  {
    id: "fgd-t-003", cat: "technik", needs: ["tech", "tech.alt"],
    text: "Angenommen, {tech} wäre nicht verfügbar gewesen: Wäre {tech.alt} gleichwertig gewesen? Was hätte sich an Ihrer Lösung geändert?",
    hints: ["Unterschiede|Unterschied", "Aufwand|Einarbeitung", "Architektur|Umsetzung", "Vor- und Nachteile|Vorteil"]
  },
  {
    id: "fgd-t-004", cat: "technik", needs: ["tech"],
    text: "Wie haben Sie sich in {tech} eingearbeitet, und wie stellt Ihr Betrieb sicher, dass die Lösung mit {tech} später gewartet werden kann?",
    hints: ["Dokumentation|Tutorial", "Kollegen|Know-how", "Wartbarkeit|Wartung", "Entwicklerdokumentation|README", "Verbreitung|Community|Support"]
  },
  {
    id: "fgd-t-005", cat: "technik", needs: ["tech"],
    text: "Wie ist {tech} in die Gesamtarchitektur von „{titel|Ihrem Projekt}“ eingebunden? Welche Schichten bzw. Komponenten gibt es?",
    hints: ["Schicht|Schichtenarchitektur", "Präsentation|Oberfläche|Frontend", "Geschäftslogik|Backend|Service", "Datenhaltung|Datenbank|Persistenz", "Schnittstelle|REST|API"]
  },
  {
    id: "fgd-t-006", cat: "recht", needs: ["tech"],
    text: "Unter welcher Lizenz steht {tech}, und welche Folgen hat das für den Einsatz in Ihrem Betrieb?",
    hints: ["Lizenz|Lizenzbedingungen", "Open Source|proprietär|kommerziell", "Copyleft|GPL|MIT|Apache", "Weitergabe|Quellcode offenlegen", "Kosten|Lizenzkosten"]
  },
  {
    id: "fgd-t-007", cat: "technik", needs: ["tech"],
    text: "Wie verwalten Sie die Abhängigkeiten von {tech} in Ihrem Projekt, und wie gehen Sie mit Sicherheitsupdates um?",
    hints: ["Paketmanager|Maven|Gradle|npm|pip|Composer", "Versionen fixieren|Version|Lockfile", "Sicherheitslücke|CVE|Schwachstelle", "Update|Aktualisierung", "Tests nach Update|Regressionstest"]
  },
  {
    id: "fgd-t-008", cat: "technik", needs: ["titel"],
    text: "An welchen Stellen verarbeitet „{titel}“ Benutzereingaben, und wie validieren Sie diese?",
    hints: ["serverseitig|Server", "clientseitig|Browser", "Whitelist|erlaubte Werte|Format", "Fehlermeldung", "SQL-Injection|XSS|Prepared Statement"]
  },
  {
    id: "fgd-t-009", cat: "technik", needs: ["titel"],
    text: "Wie ist die Anmeldung und Rechtevergabe in „{titel}“ umgesetzt? Wer darf was?",
    hints: ["Authentifizierung|Anmeldung", "Autorisierung|Berechtigung", "Rolle|Rollenkonzept", "Passwort-Hash|Hash|Single Sign-on|SSO", "Minimalprinzip|Least Privilege|nur notwendige Rechte"]
  },
  {
    id: "fgd-t-010", cat: "technik", needs: ["titel"],
    text: "Erklären Sie das Datenmodell von „{titel}“: Welche Tabellen bzw. Entitäten gibt es, und in welcher Normalform liegt es vor?",
    hints: ["Entität|Tabelle", "Beziehung|Kardinalität|1:n|n:m", "Primärschlüssel|Fremdschlüssel", "dritte Normalform|3. NF|Normalform", "Redundanz|Anomalie"]
  },

  /* ------------------------------------------------------- Entscheidungen */
  {
    id: "fgd-t-011", cat: "methodik", needs: ["entscheidung"],
    text: "Sie haben sich für „{entscheidung}“ entschieden. Nach welchen Kriterien haben Sie diese Entscheidung getroffen?",
    hints: ["Kriterien", "Gewichtung|Nutzwertanalyse", "Anforderungen|Ziel", "Alternativen", "weil"]
  },
  {
    id: "fgd-t-012", cat: "methodik", needs: ["entscheidung", "entscheidung.alt"],
    text: "Warum haben Sie „{entscheidung.alt}“ verworfen? Unter welchen Umständen wäre das die bessere Wahl gewesen?",
    hints: ["Nachteil|verworfen", "Rahmenbedingungen|Umstände", "Abwägung|Vergleich", "Kosten|Aufwand"]
  },
  {
    id: "fgd-t-013", cat: "wirtschaft", needs: ["entscheidung"],
    text: "Hätten Sie die Entscheidung „{entscheidung}“ auch mit einer Nutzwertanalyse belegen können? Wie wären Sie vorgegangen?",
    hints: ["Kriterien", "Gewichtung", "Punkte|Bewertung", "Nutzwert|Summe", "Alternativen"]
  },
  {
    id: "fgd-t-014", cat: "reflexion", needs: ["entscheidung"],
    text: "Würden Sie die Entscheidung „{entscheidung}“ heute wieder genauso treffen? Begründen Sie.",
    hints: ["ja|nein|teilweise", "Begründung|weil", "Erfahrung|Erkenntnis", "rückblickend|heute"]
  },
  {
    id: "fgd-t-015", cat: "projektmanagement", needs: ["entscheidung"],
    text: "Welche Risiken brachte die Entscheidung „{entscheidung}“ mit sich, und wie haben Sie diese abgesichert?",
    hints: ["Risiko", "Eintrittswahrscheinlichkeit|Auswirkung", "Gegenmaßnahme|Absicherung", "Prototyp|Machbarkeit|Test"]
  },
  {
    id: "fgd-t-016", cat: "methodik", needs: ["entscheidung", "entscheidung.grund"],
    text: "Sie begründen „{entscheidung}“ mit: {entscheidung.grund}. Mit welchen Fakten oder Messungen können Sie das belegen?",
    hints: ["Messung|gemessen|Zahlen", "Quelle|Dokumentation", "Prototyp|Test", "Vergleich"]
  },

  /* --------------------------------------------------------------- Probleme */
  {
    id: "fgd-t-017", cat: "reflexion", needs: ["problem"],
    text: "Sie nennen das Problem „{problem}“. Wie haben Sie es bemerkt, und wie sind Sie bei der Analyse vorgegangen?",
    hints: ["bemerkt|Fehlermeldung|Test", "reproduziert|eingegrenzt", "Ursache|Ursachenanalyse", "Debugger|Logs|Log"]
  },
  {
    id: "fgd-t-018", cat: "reflexion", needs: ["problem", "loesung"],
    text: "Ihre Lösung für „{problem}“ war: {loesung}. Welche anderen Lösungswege gab es, und warum haben Sie diesen gewählt?",
    hints: ["Alternative|Lösungsweg", "Vorteil|Nachteil", "Aufwand|Zeit", "weil|Begründung"]
  },
  {
    id: "fgd-t-019", cat: "qs", needs: ["problem"],
    text: "Wie stellen Sie sicher, dass das Problem „{problem}“ nicht erneut auftritt?",
    hints: ["Regressionstest|Test", "automatisiert|Testautomatisierung|CI", "Dokumentation|dokumentiert", "Ursache beseitigt|Ursache", "Code-Review|Review"]
  },
  {
    id: "fgd-t-020", cat: "projektmanagement", needs: ["problem"],
    text: "Welche Auswirkungen hatte „{problem}“ auf Ihren Zeitplan, und wie haben Sie das mit Ihrem Auftraggeber kommuniziert?",
    hints: ["Verzögerung|Stunden|Zeitplan", "Puffer", "Auftraggeber|Ansprechpartner|Ausbilder", "frühzeitig|rechtzeitig", "Priorisierung|Umfang reduziert"]
  },

  /* ------------------------------------------------------ Ziel / Ausgang */
  {
    id: "fgd-t-021", cat: "projektmanagement", needs: ["ziel"],
    text: "Ihr Projektziel war: „{ziel}“. Woran messen Sie, dass Sie es erreicht haben?",
    hints: ["Abnahmekriterien|Abnahme", "messbar|Kennzahl", "Soll-Ist-Vergleich|Soll-Ist", "Anforderungen erfüllt|Muss-Kriterien"]
  },
  {
    id: "fgd-t-022", cat: "projektmanagement", needs: ["ziel"],
    text: "Welche Anforderungen aus dem Ziel „{ziel}“ waren Muss-, welche Kann-Kriterien, und wie haben Sie priorisiert?",
    hints: ["Muss-Kriterium|Muss", "Kann-Kriterium|Kann|Wunsch", "Abgrenzung|nicht Bestandteil", "Priorisierung|MoSCoW"]
  },
  {
    id: "fgd-t-023", cat: "methodik", needs: ["ausgang"],
    text: "Wie haben Sie die Ausgangssituation von „{titel|Ihrem Projekt}“ analysiert, und welche Schwachstellen haben Sie dabei festgestellt?",
    hints: ["Ist-Analyse|Ist-Zustand", "Interview|Befragung|Beobachtung", "Schwachstelle|Problem", "Dokumentenanalyse|Prozess"]
  },
  {
    id: "fgd-t-024", cat: "qs", needs: ["ziel"],
    text: "Wie haben Sie nachgewiesen, dass Ihre Lösung das Ziel „{ziel}“ erfüllt? Wie lief die Abnahme ab?",
    hints: ["Abnahmetest|Abnahme", "Abnahmeprotokoll|Protokoll", "Fachbereich|Auftraggeber|Anwender", "Testfälle|Testszenario"]
  },

  /* ------------------------------------------------------------ Vorgehen */
  {
    id: "fgd-t-025", cat: "projektmanagement", needs: ["vorgehen"],
    text: "Welche Elemente von „{vorgehen}“ haben Sie in Ihrem Projekt tatsächlich genutzt, und was mussten Sie für ein Einzelprojekt anpassen?",
    hints: ["Phasen|Sprint|Iteration", "Rollen", "Artefakte|Backlog|Dokumente", "angepasst|Anpassung", "Einzelprojekt|allein"]
  },
  {
    id: "fgd-t-026", cat: "projektmanagement", needs: ["vorgehen"],
    text: "Wie wäre Ihr Projekt verlaufen, wenn Sie statt „{vorgehen}“ ein anderes Vorgehensmodell gewählt hätten?",
    hints: ["Wasserfall|Scrum|Kanban|V-Modell", "iterativ|sequenziell", "Änderungen|Flexibilität", "Planbarkeit|Dokumentation"]
  },

  /* ------------------------------------------------------------------ QS */
  {
    id: "fgd-t-027", cat: "qs", needs: ["qs"],
    text: "Zur Qualitätssicherung nennen Sie: {qs}. Welche Testfälle waren dabei am wichtigsten, und wie haben Sie sie ausgewählt?",
    hints: ["Äquivalenzklasse|Grenzwert", "kritische Funktion|Risiko", "positiv|negativ|Fehlerfall", "Testfall|Testprotokoll"]
  },
  {
    id: "fgd-t-028", cat: "qs", needs: ["qs"],
    text: "Wie haben Sie die Ergebnisse Ihrer Qualitätssicherung ({qs}) dokumentiert, und was haben Sie mit gefundenen Fehlern gemacht?",
    hints: ["Testprotokoll|Protokoll", "Fehler|Bug|Ticket", "Priorisierung|Schweregrad", "erneut getestet|Retest|Regressionstest"]
  },
  {
    id: "fgd-t-029", cat: "qs", needs: ["tech"],
    text: "Wie testet man Code, der mit {tech} entwickelt wurde, automatisiert? Welche Werkzeuge gibt es dafür?",
    hints: ["Unit-Test|Unittest", "JUnit|PHPUnit|pytest|Jest|NUnit|xUnit|Testframework", "Integrationstest", "CI|Pipeline|automatisiert", "Mock"]
  },

  /* ------------------------------------------------------- Wirtschaftlichkeit */
  {
    id: "fgd-t-030", cat: "wirtschaft", needs: ["kosten"],
    text: "Ihre Projektkosten betragen {kosten}. Aus welchen Positionen setzen sich diese zusammen?",
    hints: ["Personalkosten|Stundensatz", "Ressourcen|Hardware|Arbeitsplatz", "Lizenzen|Software", "Gemeinkosten", "Ansprechpartner|Abnahme|Fachbereich"]
  },
  {
    id: "fgd-t-031", cat: "wirtschaft", needs: ["amortisation"],
    text: "Sie rechnen mit einer Amortisation nach {amortisation}. Wie haben Sie das berechnet, und welche Unsicherheiten enthält diese Rechnung?",
    hints: ["Projektkosten|Kosten", "Einsparung|Nutzen", "geteilt|dividiert|durch", "Annahme|Schätzung", "laufende Kosten|Wartung"]
  },
  {
    id: "fgd-t-032", cat: "wirtschaft", needs: ["nutzen"],
    text: "Als Nutzen nennen Sie: {nutzen}. Welche nicht-monetären Vorteile hat Ihr Projekt zusätzlich?",
    hints: ["Qualität|Fehlerreduktion", "Zufriedenheit|Mitarbeiter|Kunden", "Datenschutz|Sicherheit", "Image|Transparenz|Nachvollziehbarkeit"]
  },
  {
    id: "fgd-t-033", cat: "wirtschaft", needs: ["kosten"],
    text: "Angenommen, Ihr Projekt hätte doppelt so viel gekostet wie geplant ({kosten}). Hätte es sich trotzdem gelohnt?",
    hints: ["Amortisation|Amortisationszeit", "Nutzen|Einsparung", "Nutzungsdauer|Lebensdauer", "nicht-monetär|qualitativ"]
  },
  {
    id: "fgd-t-034", cat: "wirtschaft", needs: ["titel"],
    text: "Hätte man „{titel}“ auch als Standardsoftware oder SaaS-Lösung einkaufen können? Was spricht für bzw. gegen Ihre Eigenentwicklung?",
    hints: ["Make-or-Buy|Make or Buy", "Anpassung|individuell|Anforderungen", "Lizenzkosten|Kosten", "Abhängigkeit|Vendor-Lock-in|Anbieter", "Integration|Schnittstellen"]
  },

  /* ------------------------------------------------------------ Zeitplanung */
  {
    id: "fgd-t-035", cat: "projektmanagement", needs: ["soll", "ist"],
    text: "Sie hatten {soll} Stunden geplant und {ist} Stunden benötigt. Wie erklären Sie die Abweichung bzw. Punktlandung?",
    hints: ["Soll-Ist-Vergleich|Soll-Ist", "Phase|Phasen", "Ursache|Grund", "Puffer", "Erkenntnis|Schätzung"]
  },
  {
    id: "fgd-t-036", cat: "projektmanagement", needs: ["soll"],
    text: "Wie sind Sie bei der Zeitplanung Ihrer {soll} Stunden vorgegangen, und haben Sie Pufferzeiten eingeplant?",
    hints: ["Phasen|Arbeitspakete", "Schätzung|Erfahrungswerte", "Puffer", "Gantt|Zeitplan", "Abhängigkeiten|Reihenfolge"]
  },

  /* --------------------------------------------------------- Datenschutz */
  {
    id: "fgd-t-037", cat: "datenschutz", needs: ["titel"],
    text: "Verarbeitet „{titel}“ personenbezogene Daten? Auf welcher Rechtsgrundlage, und welche technischen und organisatorischen Maßnahmen haben Sie umgesetzt?",
    hints: ["personenbezogene Daten|personenbezogen", "Art. 6|Rechtsgrundlage|Einwilligung|Vertrag|berechtigtes Interesse", "TOM|technische und organisatorische Maßnahmen", "Zugriffskontrolle|Berechtigung", "Verschlüsselung|Löschkonzept"]
  },
  {
    id: "fgd-t-038", cat: "datenschutz", needs: [],
    text: "Mit welchen Testdaten haben Sie {titel|Ihre Anwendung} entwickelt und getestet? Durften Sie Echtdaten verwenden?",
    hints: ["Testdaten|Dummy-Daten|generiert", "anonymisiert|pseudonymisiert", "Echtdaten|Produktivdaten", "DSGVO|Datenschutz", "Datenschutzbeauftragter|Freigabe"]
  },

  /* ------------------------------------------------------------ Reflexion */
  {
    id: "fgd-t-039", cat: "reflexion", needs: [],
    text: "Wie könnte {titel|Ihre Anwendung} in den nächsten zwei Jahren weiterentwickelt werden, und ist Ihre Architektur darauf vorbereitet?",
    hints: ["Erweiterung|Ausblick", "Modularität|modular|lose Kopplung", "Schnittstelle|API", "Wartbarkeit|Dokumentation", "Skalierung|skalierbar"]
  },
  {
    id: "fgd-t-040", cat: "reflexion", needs: ["titel"],
    text: "Was war für Sie der wichtigste Lerneffekt im Projekt „{titel}“?",
    hints: ["konkretes Beispiel|Beispiel", "fachlich|technisch", "methodisch|Planung", "künftig|nächstes Mal"]
  },
  {
    id: "fgd-t-041", cat: "projektmanagement", needs: [],
    text: "Wer waren die Stakeholder von {titel|Ihrem Projekt}, und wie haben Sie sie eingebunden?",
    hints: ["Auftraggeber|Fachabteilung", "Anwender|Nutzer|Endbenutzer", "IT-Betrieb|Administration|Datenschutzbeauftragter", "Kommunikation|Meeting|Abstimmung", "Stakeholderanalyse|Interesse|Einfluss"]
  }
);
