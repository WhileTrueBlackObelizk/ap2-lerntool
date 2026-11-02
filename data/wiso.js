// WiSo – Wirtschafts- und Sozialkunde (AP2 FIAE, Winter 2026)
// Topics + Fragen. Stand: 2026. Unsichere Jahreswerte werden in den Aufgaben vorgegeben.
window.AP2 = window.AP2 || { topics: [], questions: [], exams: [], generators: [] };

AP2.topics.push(
  {
    id: "wiso-ausbildung",
    part: "WISO",
    title: "Berufsausbildung, Umschulung & Weiterbildung",
    summary: `<h4>Duales System</h4>
<ul>
<li>Lernorte <b>Betrieb</b> (Ausbildungsordnung, Ausbildungsrahmenplan, BBiG) und <b>Berufsschule</b> (Rahmenlehrplan der KMK, Schulgesetze der Länder).</li>
<li><b>Zuständige Stelle</b> (§ 71 BBiG) für IT-Berufe: <b>IHK</b> – führt das Verzeichnis der Berufsausbildungsverhältnisse, überwacht die Ausbildung (Ausbildungsberater), prüft Eignung von Betrieb und Ausbilder, errichtet Prüfungsausschüsse, berät.</li>
</ul>
<h4>Ausbildungsvertrag (BBiG)</h4>
<ul>
<li>Abschluss formfrei, aber <b>wesentlicher Inhalt unverzüglich, spätestens vor Beginn</b> niederzulegen (§ 11; seit 08/2024 auch in Textform/elektronisch möglich). Bei Minderjährigen unterschreiben die gesetzlichen Vertreter mit.</li>
<li><b>Pflichtinhalte § 11:</b> Art, sachliche/zeitliche Gliederung, Ziel; Beginn und Dauer; Ausbildungsmaßnahmen außerhalb der Ausbildungsstätte; tägliche Ausbildungszeit; <b>Probezeit</b>; Vergütung (Höhe, Zahlung); Urlaub; Kündigungsvoraussetzungen; Hinweis auf Tarifverträge/Betriebsvereinbarungen; Form des Ausbildungsnachweises.</li>
<li><b>Nichtig</b> (§ 12): Verpflichtung zur Weiterarbeit nach der Ausbildung (Ausnahme: Erklärung in den letzten 6 Monaten), Zahlung einer Entschädigung für die Ausbildung, Vertragsstrafen, Haftungsausschluss.</li>
<li><b>Probezeit § 20: mind. 1, höchstens 4 Monate.</b></li>
<li><b>Kündigung § 22</b> (immer <b>schriftlich</b>): in der Probezeit jederzeit <b>ohne Frist und ohne Grund</b>; nach der Probezeit durch den Betrieb nur <b>fristlos aus wichtigem Grund</b> (innerhalb 2 Wochen nach Kenntnis), durch den Azubi zusätzlich mit <b>4 Wochen Frist</b>, wenn er die Ausbildung aufgibt oder den Beruf wechselt; nach der Probezeit <b>mit Angabe der Gründe</b>.</li>
<li>Ende: mit Ablauf der Ausbildungszeit bzw. <b>vorher mit Bekanntgabe des Bestehens</b> der Abschlussprüfung (§ 21). Nicht bestanden → auf Verlangen Verlängerung bis zur nächsten Wiederholungsprüfung, max. 1 Jahr. Weiterbeschäftigung ohne Vereinbarung → <b>unbefristetes Arbeitsverhältnis</b> (§ 24).</li>
</ul>
<h4>Pflichten</h4>
<ul>
<li><b>Ausbildender</b> (§§ 14–19): ausbilden lassen (fachlich/persönlich geeignete Ausbilder), Ausbildungsmittel <b>kostenlos</b>, zum Berufsschulbesuch und zum Führen des Ausbildungsnachweises anhalten und <b>freistellen</b>, nur ausbildungsbezogene Tätigkeiten, angemessene Vergütung (Mindestausbildungsvergütung § 17), Zeugnis (§ 16, einfach – auf Verlangen qualifiziert).</li>
<li><b>Auszubildender</b> (§ 13): Lernpflicht, Weisungen befolgen, Berufsschule besuchen, Ordnung beachten, Betriebsgeheimnisse wahren, Ausbildungsnachweis führen, Werkzeug pfleglich behandeln.</li>
<li><b>Ausbildungsnachweis</b> (Berichtsheft) ist <b>Zulassungsvoraussetzung</b> zur Abschlussprüfung (§ 43); darf während der Ausbildungszeit geführt werden.</li>
</ul>
<h4>Umschulung (§§ 58–63 BBiG)</h4>
<ul>
<li>Befähigung zu einer <b>anderen</b> beruflichen Tätigkeit; Prüfung wie Ausbildungsberuf vor der IHK. Dauer meist <b>verkürzt (ca. 2/3)</b>, FIAE i. d. R. 24–28 Monate inkl. Praktikum.</li>
<li>Der Umschüler ist <b>kein Auszubildender</b> (Umschulungsvertrag mit dem Bildungsträger, Praktikumsvertrag mit dem Betrieb); Umschulungsmaßnahmen sind der IHK <b>anzuzeigen</b> (§ 62).</li>
<li>Förderung durch <b>Agentur für Arbeit</b> (SGB III) bzw. <b>Jobcenter</b> (SGB II) per <b>Bildungsgutschein</b> (§ 81 SGB III); Träger und Maßnahme müssen nach <b>AZAV</b> zugelassen sein. Lebensunterhalt: Arbeitslosengeld bei Weiterbildung bzw. Bürgergeld/Grundsicherung; zusätzlich Weiterbildungsgeld/-prämien möglich. Weitere Kostenträger: Rentenversicherung, Berufsgenossenschaft, Bundeswehr (BFD).</li>
</ul>
<h4>Prüfung (gestreckte Abschlussprüfung FIAE, AO 2020)</h4>
<ul>
<li><b>Teil 1</b> (Einrichten eines IT-gestützten Arbeitsplatzes) <b>20 %</b>; <b>Teil 2: 80 %</b> = Projektarbeit inkl. Präsentation/Fachgespräch 50 %, Planen eines Softwareproduktes 10 %, Algorithmen 10 %, <b>WiSo 10 %</b>.</li>
<li><b>Bestanden</b>, wenn: Gesamtergebnis ≥ ausreichend (50 P.), Teil 2 ≥ ausreichend, Projektarbeit ≥ ausreichend, mind. 2 der übrigen Bereiche von Teil 2 ≥ ausreichend, <b>kein Bereich in Teil 2 „ungenügend“</b> (unter 30 P.).</li>
<li><b>Mündliche Ergänzungsprüfung</b>: auf Antrag in <b>einem</b> schriftlichen Bereich von Teil 2, wenn schlechter als ausreichend und sie den Ausschlag geben kann; Gewichtung schriftlich : mündlich = <b>2 : 1</b>.</li>
<li>Wiederholung: <b>zweimal</b> (§ 37). Notenschlüssel: 100–92 sehr gut, &lt;92–81 gut, &lt;81–67 befriedigend, &lt;67–50 ausreichend, &lt;50–30 mangelhaft, &lt;30 ungenügend.</li>
</ul>
<h4>Weiterbildung</h4>
<ul>
<li>Anpassungsfortbildung (Wissen aktuell halten) vs. <b>Aufstiegsfortbildung</b> (§ 53 BBiG): <b>Geprüfter Berufsspezialist</b> (DQR 5), <b>Bachelor Professional</b> (DQR 6, z. B. IT-Operative Professional), <b>Master Professional</b> (DQR 7).</li>
<li><b>Aufstiegs-BAföG</b> (AFBG): einkommensunabhängige Förderung von Lehrgangs-/Prüfungskosten (Zuschuss + zinsgünstiges KfW-Darlehen, Teilerlass bei Bestehen), bei Vollzeit zusätzlich Unterhalt.</li>
</ul>
<p><b>Merke/Falle:</b> „Kündigung nach der Probezeit mit 4 Wochen Frist“ gilt <b>nur für den Azubi</b> (Berufsaufgabe/-wechsel), nie für den Betrieb.</p>`
  },
  {
    id: "wiso-arbeitsrecht",
    part: "WISO",
    title: "Individualarbeitsrecht & Schutzgesetze",
    summary: `<h4>Arbeitsvertrag</h4>
<ul>
<li>Grundsätzlich <b>formfrei</b> (§ 611a BGB). <b>Nachweisgesetz</b>: wesentliche Bedingungen schriftlich nachweisen – Name, Entgelt, Arbeitszeit spätestens am <b>1. Arbeitstag</b>, weitere Angaben binnen 7 Tagen bzw. 1 Monat (seit 2025 unter Voraussetzungen auch Textform). Inhalte u. a.: Beginn, Befristung, Arbeitsort, Tätigkeit, Probezeit, Entgelt, Arbeitszeit, Urlaub, Kündigungsverfahren inkl. Frist und <b>Klagefrist</b>, Hinweis auf Tarifverträge.</li>
<li><b>Pflichten AN:</b> Arbeitspflicht (persönlich), Gehorsamspflicht (Weisungsrecht § 106 GewO), Treuepflicht (Verschwiegenheit, Wettbewerbsverbot während des Arbeitsverhältnisses § 60 HGB). <b>AG:</b> Vergütungspflicht, Fürsorgepflicht (Arbeitsschutz, Sozialversicherung anmelden), Beschäftigungs-, Gleichbehandlungs-, Zeugnispflicht.</li>
</ul>
<h4>Befristung & Teilzeit (TzBfG)</h4>
<ul>
<li>Befristung nur <b>schriftlich</b> wirksam (§ 14 Abs. 4), sonst unbefristet. <b>Sachgrundlos: max. 2 Jahre, innerhalb dieser Zeit max. 3 Verlängerungen</b>, nicht bei Vorbeschäftigung beim selben AG; Ausnahmen: Neugründung 4 Jahre, AN ab 52 Jahren 5 Jahre (unter Voraussetzungen). Mit Sachgrund (§ 14 Abs. 1, z. B. Vertretung, Projekt) ohne Höchstdauer.</li>
<li>Teilzeitanspruch § 8: Arbeitsverhältnis &gt; 6 Monate, AG mit &gt; 15 AN, Antrag 3 Monate vorher. <b>Brückenteilzeit</b> § 9a (&gt; 45 AN, 1–5 Jahre). Diskriminierungsverbot § 4.</li>
</ul>
<h4>Kündigung</h4>
<ul>
<li><b>Schriftform § 623 BGB</b> (eigenhändige Unterschrift, keine E-Mail/WhatsApp/elektronische Form). Wirksam mit <b>Zugang</b>.</li>
<li><b>§ 622 BGB:</b> Grundfrist <b>4 Wochen zum 15. oder zum Monatsende</b> (für AN immer). Probezeit (max. 6 Monate): <b>2 Wochen</b> zu jedem Tag. Verlängerte Fristen <b>für AG-Kündigung</b> nach Betriebszugehörigkeit: 2 J. → 1 Monat, 5 J. → 2, 8 J. → 3, 10 J. → 4, 12 J. → 5, 15 J. → 6, 20 J. → 7 Monate, jeweils <b>zum Monatsende</b>.</li>
<li><b>Außerordentlich § 626 BGB:</b> wichtiger Grund (Unzumutbarkeit, z. B. Diebstahl, Arbeitszeitbetrug), Erklärung <b>binnen 2 Wochen ab Kenntnis</b>. Meist vorherige <b>Abmahnung</b> nötig bei Verhaltensmängeln (Hinweis-, Rüge-, Warnfunktion).</li>
<li><b>KSchG:</b> gilt bei <b>mehr als 10 AN</b> (Teilzeit anteilig 0,5/0,75) und Beschäftigung <b>länger als 6 Monate</b>. Kündigung muss <b>sozial gerechtfertigt</b> sein: <b>personen-</b> (z. B. lange Krankheit), <b>verhaltens-</b> (Pflichtverletzung, i. d. R. nach Abmahnung) oder <b>betriebsbedingt</b> (Wegfall Arbeitsplatz + Sozialauswahl: Betriebszugehörigkeit, Alter, Unterhaltspflichten, Schwerbehinderung). <b>Klagefrist 3 Wochen</b> nach Zugang (§ 4) beim Arbeitsgericht.</li>
<li><b>Besonderer Kündigungsschutz:</b> Schwangere bis 4 Monate nach Entbindung (§ 17 MuSchG, Zustimmung Aufsichtsbehörde), Elternzeit (§ 18 BEEG), Schwerbehinderte (Zustimmung Integrations-/Inklusionsamt, § 168 SGB IX), Betriebsrats-/JAV-Mitglieder (nur außerordentlich, § 15 KSchG, § 103 BetrVG), Azubis nach Probezeit, Pflegezeit.</li>
</ul>
<h4>Arbeitszeugnis (§ 109 GewO)</h4>
<ul><li><b>Einfach</b>: Art und Dauer der Tätigkeit. <b>Qualifiziert</b> (auf Verlangen): zusätzlich Leistung und Verhalten. Wahr und wohlwollend.</li></ul>
<h4>Schutzgesetze – Zahlen</h4>
<ul>
<li><b>ArbZG:</b> werktäglich (Mo–Sa) 8 h, bis <b>10 h</b> bei Ausgleich auf Ø 8 h in 6 Monaten/24 Wochen; Pausen &gt; 6 h → <b>30 Min</b>, &gt; 9 h → <b>45 Min</b> (Abschnitte ≥ 15 Min); <b>Ruhezeit 11 h</b>; Sonn-/Feiertagsruhe.</li>
<li><b>BUrlG:</b> <b>24 Werktage</b> (6-Tage-Woche) = <b>20 Arbeitstage</b> bei 5-Tage-Woche; Formel: 24 × Arbeitstage/Woche ÷ 6. Voller Anspruch nach 6 Monaten Wartezeit, sonst 1/12 pro vollem Monat; Übertragung bis 31.03.; Krankheit im Urlaub (mit Attest) wird nicht angerechnet.</li>
<li><b>EFZG:</b> Entgeltfortzahlung bei Krankheit <b>6 Wochen</b> (nach 4 Wochen Wartezeit), danach <b>Krankengeld</b> der KV; AU-Feststellung bei mehr als 3 Kalendertagen (eAU).</li>
<li><b>MuSchG:</b> Schutzfrist 6 Wochen vor, 8 Wochen nach der Geburt (12 bei Früh-/Mehrlingsgeburt). <b>Elternzeit:</b> bis 3 Jahre je Elternteil bis zum 8. Geburtstag, Anmeldung 7 Wochen vorher; <b>Elterngeld</b> ca. 65–67 % des Nettos (300–1.800 €), Basiselterngeld 12 + 2 Partnermonate.</li>
<li><b>JArbSchG</b> (unter 18): 8 h/Tag, 40 h/Woche, 5-Tage-Woche, Ruhezeit 12 h, Pausen 30 Min (4,5–6 h) bzw. 60 Min (&gt; 6 h), Urlaub 30/27/25 Werktage (unter 16/17/18), Erstuntersuchung vor Beginn.</li>
<li><b>MiLoG:</b> gesetzlicher Mindestlohn (2026: 13,90 €/h), nicht für Azubis (dort Mindestausbildungsvergütung). <b>AGG:</b> Benachteiligungsverbot wegen ethnischer Herkunft, Geschlecht, Religion/Weltanschauung, Behinderung, Alter, sexueller Identität; Ansprüche binnen 2 Monaten schriftlich geltend machen.</li>
</ul>
<p><b>Falle:</b> Die verlängerten Fristen des § 622 Abs. 2 gelten nur für Kündigungen <b>durch den Arbeitgeber</b> – der AN kann (ohne andere Vereinbarung) immer mit 4 Wochen zum 15./Monatsende kündigen.</p>`
  },
  {
    id: "wiso-tarif-mitbestimmung",
    part: "WISO",
    title: "Tarifrecht, Betriebsverfassung & Arbeitsgerichtsbarkeit",
    summary: `<h4>Tarifautonomie</h4>
<ul>
<li><b>Art. 9 Abs. 3 GG</b> (Koalitionsfreiheit): Gewerkschaften und Arbeitgeberverbände/einzelne AG regeln Arbeitsbedingungen <b>ohne staatliche Einmischung</b> (Tarifvertragsgesetz TVG).</li>
<li><b>Tarifparteien</b>: Gewerkschaft (z. B. ver.di, IG Metall) ↔ Arbeitgeberverband (<b>Verbands-/Flächentarifvertrag</b>) oder einzelner AG (<b>Haus-/Firmentarifvertrag</b>).</li>
<li><b>Arten</b>: <b>Manteltarifvertrag</b> (Rahmenbedingungen: Arbeitszeit, Urlaub, Kündigungsfristen, Zuschläge; lange Laufzeit), <b>Entgelt-/Lohn- und Gehaltstarifvertrag</b> (Höhe der Vergütung, kurze Laufzeit ~1–2 Jahre), <b>Entgeltrahmentarifvertrag</b> (Lohn-/Gehaltsgruppen, Eingruppierungsmerkmale).</li>
<li><b>Tarifbindung</b> (§ 3 TVG): Mitglieder der Tarifparteien; <b>Allgemeinverbindlicherklärung</b> durch BMAS (§ 5) → gilt für alle der Branche. Nicht gebundene AG wenden TV oft per <b>Bezugnahmeklausel</b> im Arbeitsvertrag an.</li>
<li><b>Günstigkeitsprinzip</b> (§ 4 Abs. 3): Abweichungen nur zugunsten des AN. <b>Unabdingbarkeit</b>: TV ist Mindeststandard. <b>Nachwirkung</b> nach Ablauf bis zu neuer Abmachung. <b>Friedenspflicht</b>: während der Laufzeit keine Arbeitskämpfe über die geregelten Inhalte.</li>
</ul>
<h4>Ablauf Tarifverhandlung/Arbeitskampf</h4>
<ol>
<li>Kündigung des TV / Ablauf, Forderungen der Gewerkschaft</li>
<li>Verhandlungen (ggf. <b>Warnstreiks</b> nach Ende der Friedenspflicht)</li>
<li>Scheitern der Verhandlungen, ggf. <b>Schlichtung</b> (neutraler Schlichter, Schlichterspruch)</li>
<li><b>Urabstimmung</b>: mind. <b>75 %</b> der Gewerkschaftsmitglieder für Streik</li>
<li><b>Streik</b> (Streikgeld der Gewerkschaft für Mitglieder; kein Lohn), ggf. <b>Aussperrung</b> durch AG</li>
<li>neue Verhandlungen → Einigung</li>
<li>zweite Urabstimmung: mind. <b>25 %</b> Zustimmung zum Ergebnis → Streikende, neuer TV</li>
</ol>
<h4>Betriebsverfassungsgesetz (BetrVG)</h4>
<ul>
<li><b>Betriebsrat</b> in Betrieben mit <b>mind. 5 ständigen wahlberechtigten AN</b>, davon 3 wählbar (§ 1). <b>Wahlberechtigt ab 16</b>, <b>wählbar ab 18</b> nach 6 Monaten Betriebszugehörigkeit. <b>Amtszeit 4 Jahre</b>, regelmäßige Wahlen 01.03.–31.05. (2022, <b>2026</b>, 2030). Größe nach AN-Zahl (5–20: 1 Mitglied, 21–50: 3, 51–100: 5 …); Freistellung ab 200 AN. Leitende Angestellte zählen nicht (Sprecherausschuss).</li>
<li><b>Mitbestimmung</b> (echtes Zustimmungsrecht, bei Nichteinigung <b>Einigungsstelle</b>) – <b>§ 87 soziale Angelegenheiten</b>: Ordnung des Betriebs, Beginn/Ende der Arbeitszeit, Pausen, Überstunden/Kurzarbeit, Urlaubsgrundsätze/-plan, <b>technische Einrichtungen zur Leistungs-/Verhaltensüberwachung (Nr. 6 – z. B. Software, Zeiterfassung, Videoüberwachung)</b>, Arbeitsschutz, Entlohnungsgrundsätze, mobile Arbeit (Nr. 14).</li>
<li><b>Mitwirkung</b>: Zustimmungsverweigerungsrecht bei personellen Einzelmaßnahmen (§ 99: Einstellung, Versetzung, Ein-/Umgruppierung; ab &gt; 20 AN; Widerspruch binnen 1 Woche), <b>Anhörung vor jeder Kündigung (§ 102)</b> – ohne Anhörung ist die Kündigung <b>unwirksam</b>; Bedenken: ordentlich 1 Woche, außerordentlich 3 Tage; Beratungsrechte (§ 90 Planung, § 111 Betriebsänderung).</li>
<li><b>Informationsrechte</b> (§ 80 Abs. 2, § 106 Wirtschaftsausschuss ab &gt; 100 AN).</li>
<li><b>Betriebsvereinbarung</b> (§ 77): schriftlicher Vertrag AG ↔ BR, gilt unmittelbar für alle AN des Betriebs; <b>Tarifvorbehalt</b>: Entgelte, die durch TV geregelt sind/üblicherweise geregelt werden, nicht per BV.</li>
<li><b>Betriebsversammlung</b>: einmal je <b>Kalendervierteljahr</b>, während der Arbeitszeit, Bericht des BR.</li>
<li><b>JAV</b> (§ 60 ff.): bei mind. 5 AN <b>unter 18</b> oder <b>Auszubildenden</b> (klassisch „unter 25“; seit 2021 gilt für Azubis keine Altersgrenze mehr); wählen dürfen diese, wählbar sind AN <b>unter 25</b> und Azubis; <b>Amtszeit 2 Jahre</b>; setzt einen Betriebsrat voraus, handelt über ihn (Teilnahme an BR-Sitzungen, Stimmrecht bei Jugendthemen).</li>
<li>Unternehmensmitbestimmung im Aufsichtsrat: DrittelbG ab 500 AN (1/3), MitbestG ab 2.000 AN (paritätisch).</li>
</ul>
<h4>Rangfolge (Normenhierarchie)</h4>
<p>EU-Recht → Grundgesetz → Gesetze → Rechtsverordnungen → <b>Tarifvertrag → Betriebsvereinbarung → Arbeitsvertrag</b> → Weisung. Die niedrigere Ebene darf nur <b>günstiger</b> sein (Günstigkeitsprinzip).</p>
<h4>Arbeitsgerichtsbarkeit</h4>
<ul>
<li><b>Arbeitsgericht → Landesarbeitsgericht → Bundesarbeitsgericht (Erfurt)</b>. Zuständig für Streitigkeiten aus Arbeits-/Ausbildungsverhältnis und BetrVG.</li>
<li>Erst <b>Güteverhandlung</b> (Vorsitzender allein), dann Kammertermin (Berufsrichter + 2 ehrenamtliche Richter von AG- und AN-Seite). 1. Instanz: kein Anwaltszwang, jede Partei trägt eigene Anwaltskosten. Bei Azubis ggf. vorher <b>Schlichtungsausschuss</b> der IHK.</li>
<li>Abgrenzung: Sozialgericht → LSG → BSG (Kassel) für Sozialversicherung.</li>
</ul>`
  },
  {
    id: "wiso-sozialversicherung",
    part: "WISO",
    title: "Sozialversicherung, Steuern & Entgeltabrechnung",
    summary: `<h4>Fünf Zweige (Sozialgesetzbuch)</h4>
<table><tr><th>Zweig</th><th>Träger</th><th>Leistungen</th><th>Beitrag 2026 (Gesamt)</th></tr>
<tr><td>Krankenversicherung (KV, 1883)</td><td>Krankenkassen (AOK, TK, BKK …)</td><td>Arzt, Krankenhaus, Medikamente, Vorsorge, Krankengeld ab 7. Woche</td><td>14,6 % + kassenindiv. Zusatzbeitrag (Ø 2,9 %), je hälftig</td></tr>
<tr><td>Pflegeversicherung (PV, 1995)</td><td>Pflegekassen (bei den KK)</td><td>Pflegegeld, Pflegesachleistung, stationäre Pflege, Pflegegrade 1–5</td><td>3,6 % hälftig + Kinderlosenzuschlag 0,6 % (nur AN, ab 23 J.); Abschläge ab 2. Kind</td></tr>
<tr><td>Rentenversicherung (RV, 1889)</td><td>Deutsche Rentenversicherung (Bund, Regionalträger, Knappschaft-Bahn-See)</td><td>Altersrente, Erwerbsminderungsrente, Hinterbliebenenrente, Reha</td><td>18,6 % hälftig</td></tr>
<tr><td>Arbeitslosenversicherung (AV, 1927)</td><td>Bundesagentur für Arbeit</td><td>Arbeitslosengeld I (60 %/67 % mit Kind), Weiterbildung (Bildungsgutschein), Kurzarbeiter-, Insolvenzgeld, Vermittlung</td><td>2,6 % hälftig</td></tr>
<tr><td>Unfallversicherung (UV, 1884)</td><td>Berufsgenossenschaften, Unfallkassen</td><td>Prävention, Heilbehandlung, Verletztengeld, Unfallrente bei Arbeits-/Wegeunfall, Berufskrankheit</td><td><b>nur AG</b> (nach Lohnsumme und Gefahrklasse)</td></tr></table>
<p>(Sätze gelten als Stand 2026 – in Aufgaben werden sie in der Regel vorgegeben. Sachsen: Sonderregel PV.)</p>
<h4>Prinzipien</h4>
<ul>
<li><b>Versicherungspflicht</b> für Arbeitnehmer und Azubis; Prinzipien: Solidarität, Versicherungspflicht, Selbstverwaltung (Sozialwahlen), <b>paritätische Finanzierung</b>.</li>
<li><b>Beitragsbemessungsgrenze (BBG):</b> Einkommen oberhalb ist <b>beitragsfrei</b> (Beitrag = Satz × min(Brutto, BBG)); eigene BBG für KV/PV und RV/AV, jährlich angepasst. <b>Versicherungspflichtgrenze (JAEG):</b> darüber kann man in die <b>private</b> KV wechseln.</li>
<li><b>Umlageverfahren/Generationenvertrag</b> (RV): Beiträge der Erwerbstätigen finanzieren die laufenden Renten (+ Bundeszuschuss) – Problem: demografischer Wandel. Gegensatz: Kapitaldeckungsverfahren (private Vorsorge).</li>
<li><b>Geringverdiener-Azubis</b> (≤ 325 € monatlich): AG trägt SV-Beiträge allein.</li>
<li><b>Minijob</b> (Grenze dynamisch an Mindestlohn gekoppelt; 2026: 603 €/Monat): AN brutto = netto (außer RV-Eigenanteil 3,6 %, Befreiung auf Antrag möglich); AG zahlt Pauschalen an die Minijob-Zentrale. <b>Midijob</b> (Übergangsbereich bis 2.000 €): reduzierte AN-Beiträge, volle Leistungsansprüche.</li>
<li>Streitigkeiten: Widerspruch beim Träger → <b>Sozialgericht → Landessozialgericht → Bundessozialgericht</b>.</li>
<li><b>3-Säulen-Modell der Altersvorsorge:</b> gesetzlich (RV), betrieblich (bAV, z. B. Entgeltumwandlung), privat (Riester, Rürup, private Rentenversicherung, ETF-Sparplan).</li>
</ul>
<h4>Entgeltabrechnung (Schema)</h4>
<pre><code>  Bruttoentgelt (inkl. Zuschläge, VWL-AG-Anteil, geldwerter Vorteil)
− Lohnsteuer (lt. Lohnsteuertabelle/Steuerklasse)
− Solidaritätszuschlag (5,5 % der LSt, für die meisten AN wegen Freigrenze 0 €)
− Kirchensteuer (8 % BW/Bayern, sonst 9 % der Lohnsteuer)
− AN-Anteile KV, PV, RV, AV
= Nettoentgelt
− vermögenswirksame Leistung (Sparrate), Vorschuss
= Auszahlungsbetrag</code></pre>
<p><b>AG-Kosten</b> = Brutto + AG-Anteile SV + Umlagen (U1, U2, Insolvenzgeldumlage) + UV-Beitrag.</p>
<h4>Steuern</h4>
<ul>
<li><b>Steuerklassen:</b> I ledig/geschieden; II alleinerziehend (Entlastungsbetrag); III verheiratet, Partner in V oder ohne Einkommen; IV/IV beide ähnlich (auch mit Faktor); V Partner von III; VI zweites/weiteres Dienstverhältnis.</li>
<li><b>Direkte Steuern</b> (Steuerschuldner = Steuerträger): Einkommen-/Lohnsteuer, Körperschaftsteuer, Gewerbesteuer, Kfz-Steuer. <b>Indirekte</b> (Abwälzung auf Verbraucher): Umsatzsteuer (19 %/7 %), Energie-, Tabak-, Alkoholsteuer.</li>
<li><b>Einkommensteuererklärung:</b> Lohnsteuer ist nur Vorauszahlung. <b>Werbungskosten</b> (Aufwendungen zur Erwerbung/Sicherung/Erhaltung der Einnahmen): Fahrten Wohnung–Arbeit (Entfernungspauschale je Entfernungs-km), Arbeitsmittel (PC, Fachliteratur), Fortbildung/Umschulungskosten, Homeoffice-Pauschale (6 €/Tag, max. 1.260 €), Bewerbungskosten. Nur der Betrag über dem <b>Arbeitnehmer-Pauschbetrag (1.230 €)</b> wirkt zusätzlich. Abgrenzung: Sonderausgaben (Vorsorgeaufwendungen, Kirchensteuer, Spenden), außergewöhnliche Belastungen.</li>
<li>Progressiver Tarif: Grundfreibetrag steuerfrei, dann steigender Grenzsteuersatz (14 % … 42 %, ab sehr hohem Einkommen 45 %).</li>
</ul>
<p><b>Falle:</b> Die <b>Unfallversicherung</b> zahlt der AG allein – sie taucht in der Lohnabrechnung des AN nicht auf. Der Kinderlosenzuschlag der PV trifft nur den AN.</p>`
  },
  {
    id: "wiso-unternehmen",
    part: "WISO",
    title: "Rechtsformen, Vollmachten & Organisation",
    summary: `<h4>Rechtsformen</h4>
<table><tr><th>Form</th><th>Gründung/Kapital</th><th>Haftung</th><th>Geschäftsführung/Vertretung</th><th>HR</th></tr>
<tr><td>Einzelunternehmen (e.K.)</td><td>1 Person, kein Mindestkapital</td><td>unbeschränkt mit Privatvermögen</td><td>Inhaber allein</td><td>A</td></tr>
<tr><td>GbR</td><td>≥ 2, formfrei; seit MoPeG 2024 rechtsfähig, optional Gesellschaftsregister (eGbR)</td><td>alle unbeschränkt, gesamtschuldnerisch</td><td>gemeinschaftlich (Gesamtgeschäftsführung)</td><td>– (Gesellschaftsregister)</td></tr>
<tr><td>OHG</td><td>≥ 2, kein Mindestkapital</td><td>alle <b>unbeschränkt, unmittelbar, solidarisch</b></td><td>jeder Gesellschafter einzeln</td><td>A</td></tr>
<tr><td>KG</td><td>≥ 1 Komplementär + ≥ 1 Kommanditist</td><td>Komplementär unbeschränkt; Kommanditist nur bis zur Einlage</td><td>Komplementär; Kommanditist: Kontrollrecht, Widerspruch bei außergewöhnlichen Geschäften</td><td>A</td></tr>
<tr><td>GmbH</td><td><b>25.000 € Stammkapital</b>, bei Anmeldung mind. 12.500 €; notarieller Vertrag</td><td>nur Gesellschaftsvermögen</td><td>Geschäftsführer; Gesellschafterversammlung (Kontrolle, Gewinnverwendung); AR ab 500 AN</td><td>B</td></tr>
<tr><td>UG (haftungsbeschränkt)</td><td>ab <b>1 €</b>, nur Bareinlage, voll einzahlen; <b>25 %</b> des Jahresüberschusses in Rücklage bis 25.000 €</td><td>wie GmbH</td><td>wie GmbH</td><td>B</td></tr>
<tr><td>AG</td><td><b>50.000 € Grundkapital</b>, Aktien ab 1 €</td><td>Gesellschaftsvermögen</td><td><b>Vorstand</b> (leitet, vertritt), <b>Aufsichtsrat</b> (bestellt/kontrolliert Vorstand), <b>Hauptversammlung</b> (Gewinnverwendung, Wahl AR, Entlastung, Satzungsänderung)</td><td>B</td></tr>
<tr><td>GmbH &amp; Co. KG</td><td>KG, Komplementär ist eine GmbH</td><td>faktisch beschränkt</td><td>GF der Komplementär-GmbH</td><td>A</td></tr>
<tr><td>Genossenschaft (eG)</td><td>≥ 3 Mitglieder, Förderzweck</td><td>Genossenschaftsvermögen</td><td>Vorstand, AR, Generalversammlung (1 Mitglied = 1 Stimme)</td><td>Genossenschaftsregister</td></tr></table>
<p><b>Gewinnverteilung</b> bei Personengesellschaften: nach Gesellschaftsvertrag; ohne Regelung seit MoPeG (2024) nach <b>Beteiligungsverhältnissen</b> (die alte Regel „4 % auf die Einlage, Rest nach Köpfen“ ist entfallen – in Aufgaben wird die Vertragsregel vorgegeben).</p>
<h4>Kaufmann & Handelsregister</h4>
<ul>
<li><b>Istkaufmann</b> (§ 1 HGB): Handelsgewerbe, das einen kaufmännisch eingerichteten Geschäftsbetrieb erfordert – Eintragung <b>deklaratorisch</b>. <b>Kannkaufmann</b> (§ 2 Kleingewerbe, § 3 Land-/Forstwirtschaft) – Eintragung <b>konstitutiv</b>. <b>Formkaufmann</b> (§ 6: GmbH, AG, eG) – Kaufmann kraft Rechtsform, Kapitalgesellschaft entsteht erst mit Eintragung (konstitutiv).</li>
<li><b>Handelsregister</b>: elektronisch beim Amtsgericht, öffentlich. <b>Abt. A</b>: e.K., OHG, KG; <b>Abt. B</b>: GmbH, UG, AG. Anmeldung notariell beglaubigt. Öffentlicher Glaube (§ 15 HGB).</li>
<li><b>Firma</b> (§ 17 HGB) = Name des Kaufmanns. Grundsätze: Wahrheit/Klarheit, Ausschließlichkeit (§ 30), Beständigkeit (§ 22), Öffentlichkeit, Rechtsformzusatz Pflicht (§ 19). Arten: Personen-, Sach-, Fantasie-, Mischfirma.</li>
</ul>
<h4>Prokura vs. Handlungsvollmacht</h4>
<ul>
<li><b>Prokura</b> (§§ 48 ff. HGB): nur von Kaufmann <b>ausdrücklich</b> erteilt, Eintragung ins HR (deklaratorisch), Zeichnung <b>„ppa.“</b>; erlaubt alle Geschäfte, die der Betrieb <b>irgendeines</b> Handelsgewerbes mit sich bringt (auch Darlehen, Prozesse, Einstellung/Kündigung). <b>Nicht</b>: Grundstücke verkaufen/belasten (ohne Sondererlaubnis), Bilanz/Steuererklärung unterschreiben, Prokura erteilen, Insolvenz anmelden, Gesellschafter aufnehmen, Geschäft veräußern/auflösen. Beschränkungen gelten nur im Innenverhältnis. Einzel-, Gesamt-, Filialprokura.</li>
<li><b>Handlungsvollmacht</b> (§ 54 HGB): formlos, nicht im HR, Zeichnung „i. V.“; <b>allgemeine</b> (gewöhnliche Geschäfte <b>dieses</b> Handelsgewerbes), <b>Art-</b> (bestimmte Art, z. B. Einkauf), <b>Einzelvollmacht</b>. Ohne besondere Befugnis keine Grundstücksgeschäfte, Wechsel, Darlehen, Prozessführung.</li>
</ul>
<h4>Ziele & Organisation</h4>
<ul>
<li><b>Ziele</b>: ökonomisch (Gewinn, Umsatz, Marktanteil, Liquidität), ökologisch (Ressourcen/Energie sparen, CO₂), sozial (Arbeitsplatzsicherheit, Gesundheit, faire Löhne). Zielharmonie, Zielkonflikt (z. B. Kostensenkung ↔ Umweltschutz), Zielneutralität. <b>Leitbild</b> (Mission, Vision, Werte), <b>Corporate Identity</b> = Corporate Design + Communication + Behaviour.</li>
<li><b>Aufbauorganisation</b> (Stellen, Instanzen, Abteilungen; Organigramm): <b>Einlinien</b> (jeder hat genau einen Vorgesetzten – klar, aber lange Dienstwege), <b>Mehrlinien</b> (mehrere Fachvorgesetzte – Spezialisierung, Kompetenzkonflikte), <b>Stablinien</b> (Stäbe beraten ohne Weisungsbefugnis, z. B. Datenschutz, Recht), <b>Sparten/divisional</b> (nach Produkten/Regionen, Profit-Center), <b>Matrix</b> (zwei Dimensionen: Funktion × Produkt/Projekt, Doppelunterstellung).</li>
<li><b>Ablauforganisation</b>: zeitliche, räumliche, sachliche Gestaltung der Arbeitsprozesse (z. B. EPK, BPMN).</li>
<li><b>Kooperation/Konzentration</b>: <b>Kartell</b> (rechtlich und wirtschaftlich selbstständig, Absprachen – grundsätzlich verboten, § 1 GWB, Bundeskartellamt), <b>Konzern</b> (rechtlich selbstständig, wirtschaftlich unter einheitlicher Leitung), <b>Fusion</b> (Verschmelzung – eine/beide verlieren rechtliche Selbstständigkeit), <b>Joint Venture</b> (gemeinsames Tochterunternehmen), Konsortium/Arbeitsgemeinschaft (befristet). Horizontal (gleiche Stufe), vertikal (vor-/nachgelagert), diagonal/konglomerat.</li>
<li><b>Insolvenz</b>: Gründe Zahlungsunfähigkeit, drohende Zahlungsunfähigkeit (nur Eigenantrag), Überschuldung (jur. Personen). Antragspflicht GmbH-GF spätestens 3 Wochen (Zahlungsunfähigkeit) bzw. 6 Wochen (Überschuldung). Insolvenzgericht (Amtsgericht) → Insolvenzverwalter → Verwertung oder Insolvenzplan → Quote. Aussonderung (fremdes Eigentum, z. B. Eigentumsvorbehalt) vor Absonderung. AN: <b>Insolvenzgeld</b> für 3 Monate.</li>
<li><b>Marketing-Mix (4P)</b>: Product, Price, Place (Distribution), Promotion (Kommunikation).</li>
</ul>`
  },
  {
    id: "wiso-vertragsrecht",
    part: "WISO",
    title: "Vertragsrecht & Leistungsstörungen",
    summary: `<h4>Rechts- und Geschäftsfähigkeit</h4>
<ul>
<li><b>Rechtsfähigkeit</b> (Träger von Rechten und Pflichten): natürliche Person mit <b>Vollendung der Geburt</b> bis Tod (§ 1 BGB); juristische Person (GmbH, AG, e.V.) mit Eintragung bis Löschung.</li>
<li><b>Geschäftsunfähig</b> unter 7 Jahren (§ 104) → Willenserklärung <b>nichtig</b>. <b>Beschränkt geschäftsfähig</b> 7–17 (§ 106): Verträge <b>schwebend unwirksam</b> bis zur Genehmigung der Eltern (§ 108); wirksam ohne Zustimmung: lediglich rechtlicher Vorteil (§ 107), <b>Taschengeldparagraph § 110</b> (mit eigenen, dafür überlassenen Mitteln <b>vollständig</b> bewirkt – keine Ratenkäufe/Abos), selbstständiges Erwerbsgeschäft (§ 112), ermächtigtes Arbeitsverhältnis (§ 113 – gilt <b>nicht</b> für Ausbildung). <b>Voll geschäftsfähig ab 18.</b></li>
</ul>
<h4>Vertragsschluss</h4>
<ul>
<li>Zwei übereinstimmende <b>Willenserklärungen</b>: <b>Antrag + Annahme</b>. Ausdrücklich, schlüssig (konkludent) – <b>Schweigen gilt grundsätzlich nicht als Annahme</b> (Ausnahme unter Kaufleuten, z. B. kaufmännisches Bestätigungsschreiben).</li>
<li>Werbung, Kataloge, Schaufenster, Online-Shop = <b>Aufforderung zur Abgabe eines Angebots</b> (invitatio ad offerendum). Bindung an Antrag: unter Anwesenden sofort, unter Abwesenden bis zum Eingang der Antwort unter regelmäßigen Umständen; verspätete/abgeänderte Annahme = neuer Antrag (§ 150). Freizeichnung: „freibleibend“, „solange Vorrat reicht“.</li>
<li><b>Kaufvertrag</b> (§ 433): <b>Verpflichtungsgeschäft</b> (Verkäufer: übergeben + Eigentum verschaffen, mangelfrei; Käufer: zahlen + abnehmen) und getrenntes <b>Erfüllungsgeschäft</b> (Einigung + Übergabe, § 929) – <b>Abstraktionsprinzip</b>.</li>
<li><b>Vertragsarten:</b> Kauf (Eigentum gegen Geld), <b>Werkvertrag</b> § 631 (Erfolg geschuldet, Abnahme, z. B. Individualsoftware), <b>Dienstvertrag</b> § 611 (Tätigkeit geschuldet, z. B. IT-Beratung, Support nach Stunden), Arbeitsvertrag § 611a, <b>Miete</b> § 535 (entgeltliche Gebrauchsüberlassung, z. B. SaaS/Server), Pacht (+ Früchte), Leihe (unentgeltlich), Darlehen, <b>Leasing</b> (atypischer Mietvertrag, Leasinggeber bleibt Eigentümer), <b>Lizenzvertrag</b> (Nutzungsrechte an Software), Werklieferungsvertrag (Kaufrecht).</li>
</ul>
<h4>Nichtigkeit & Anfechtung</h4>
<ul>
<li><b>Nichtig</b> (von Anfang an unwirksam): Geschäftsunfähigkeit, Scheingeschäft (§ 117), Scherzgeschäft (§ 118), <b>Formmangel</b> (§ 125), Verstoß gegen gesetzliches Verbot (§ 134), Sittenwidrigkeit/Wucher (§ 138).</li>
<li><b>Anfechtbar</b> (wirksam, bis angefochten – dann rückwirkend nichtig): Inhalts-/Erklärungsirrtum, Irrtum über verkehrswesentliche Eigenschaft (§ 119, <b>unverzüglich</b>), falsche Übermittlung (§ 120), <b>arglistige Täuschung/widerrechtliche Drohung</b> (§ 123, binnen 1 Jahr). <b>Nicht</b> anfechtbar: Motivirrtum, Kalkulationsirrtum.</li>
<li><b>Formen:</b> Formfreiheit; <b>Schriftform</b> (Kündigung Arbeitsvertrag, Bürgschaft von Nichtkaufleuten), elektronische Form (qualifizierte Signatur), Textform, öffentliche Beglaubigung (HR-Anmeldung), <b>notarielle Beurkundung</b> (Grundstückskauf, GmbH-Vertrag).</li>
<li><b>AGB</b> (§§ 305 ff.): vorformulierte Bedingungen für viele Verträge; Einbeziehung nur mit Hinweis + zumutbarer Kenntnisnahme; <b>Individualabrede geht vor</b>; überraschende Klauseln werden nicht Vertragsinhalt; unwirksame Klausel → Rest bleibt, Gesetz gilt.</li>
</ul>
<h4>Leistungsstörungen</h4>
<ul>
<li><b>Lieferungsverzug</b>: Fälligkeit + <b>Mahnung</b> (entbehrlich bei kalendermäßig bestimmtem Termin) + Verschulden (für Schadensersatz). Rechte: Lieferung + Verzugsschaden; nach <b>angemessener Nachfrist</b>: Rücktritt und/oder Schadensersatz statt der Leistung. <b>Fixkauf</b>: sofortiger Rücktritt.</li>
<li><b>Mangelhafte Lieferung</b> (§ 434): Sachmangel (vereinbarte Beschaffenheit/gewöhnliche Verwendung/Montage – auch mangelhafte Montageanleitung), <b>Falschlieferung</b>, <b>Zuweniglieferung</b>, Rechtsmangel. Nach Erkennbarkeit: offen, versteckt, arglistig verschwiegen. Rechte (§ 437): <b>vorrangig Nacherfüllung</b> (Käufer wählt Nachbesserung oder Ersatzlieferung); nach erfolgloser Frist (Nachbesserung gilt nach dem 2. erfolglosen Versuch als fehlgeschlagen): <b>Rücktritt</b> (nicht bei unerheblichem Mangel), <b>Minderung</b>, <b>Schadensersatz</b> (Verschulden). <b>§ 377 HGB</b> (zweiseitiger Handelskauf): Ware <b>unverzüglich</b> untersuchen und offene Mängel <b>unverzüglich</b> rügen, versteckte unverzüglich nach Entdeckung – sonst gilt die Ware als genehmigt.</li>
<li><b>Gewährleistung</b> (gesetzlich, Verkäufer): <b>2 Jahre ab Ablieferung</b> (§ 438); Verbrauchsgüterkauf: Beweislastumkehr im 1. Jahr (§ 477). <b>Garantie</b>: freiwillige vertragliche Zusage (oft Hersteller), zusätzlich.</li>
<li><b>Annahmeverzug</b> (Käufer nimmt ordnungsgemäß angebotene Ware nicht an, kein Verschulden nötig): Verkäufer haftet nur noch für Vorsatz/grobe Fahrlässigkeit, Ersatz Mehraufwand, Hinterlegung, <b>Selbsthilfeverkauf</b> (§ 373 HGB, nach Androhung), Klage auf Abnahme, Rücktritt.</li>
<li><b>Zahlungsverzug</b>: Mahnung, kalendermäßiger Termin oder automatisch <b>30 Tage</b> nach Fälligkeit und Rechnungszugang (§ 286 Abs. 3; bei Verbrauchern nur mit Hinweis). Verzugszinsen: Verbraucher <b>5</b>, B2B <b>9 Prozentpunkte über Basiszinssatz</b>, B2B zusätzlich <b>40 € Pauschale</b>.</li>
</ul>
<h4>Verjährung</h4>
<ul><li>Regelmäßig <b>3 Jahre</b> (§ 195), Beginn mit <b>Schluss des Jahres</b> der Entstehung und Kenntnis (§ 199) – Beispiel: fällig 15.03.2026 → Ende 31.12.2029. Mängelansprüche 2 Jahre ab Ablieferung, titulierte Ansprüche 30 Jahre. <b>Hemmung</b> (Uhr steht: Verhandlungen, Klage, Mahnbescheid) vs. <b>Neubeginn</b> (Anerkenntnis, z. B. Abschlagszahlung; Vollstreckungshandlung).</li></ul>
<h4>Fernabsatz, Eigentum, Mahnverfahren</h4>
<ul>
<li><b>Widerrufsrecht</b> für Verbraucher bei Fernabsatz-/Haustürgeschäften: <b>14 Tage</b> ab Erhalt der Ware (bei Belehrung), ohne Widerruf in Textform keine Begründung nötig; bei fehlender Belehrung max. 12 Monate + 14 Tage. Ausnahmen: Maßanfertigung, verderbliche Ware, entsiegelte Software/Datenträger. (Seit 19.06.2026 EU-Pflicht zur elektronischen Widerrufsfunktion in Online-Shops.)</li>
<li><b>Eigentum</b> = rechtliche Herrschaft; <b>Besitz</b> = tatsächliche Herrschaft (Mieter ist Besitzer, Vermieter Eigentümer). <b>Eigentumsvorbehalt</b> (§ 449): Eigentum geht erst mit vollständiger Zahlung über; erlischt u. a. durch Weiterverkauf an Gutgläubige, Verarbeitung, Verbrauch.</li>
<li><b>Gerichtliches Mahnverfahren</b>: Antrag auf Mahnbescheid (zentrales Mahngericht, online) → Zustellung Mahnbescheid → <b>2 Wochen Widerspruch</b> → Antrag Vollstreckungsbescheid → Zustellung → <b>2 Wochen Einspruch</b> → Zwangsvollstreckung (Gerichtsvollzieher, Pfändung). Gericht prüft die Berechtigung der Forderung <b>nicht</b>. Widerspruch/Einspruch → streitiges Verfahren.</li>
</ul>`
  },
  {
    id: "wiso-wirtschaft",
    part: "WISO",
    title: "Volkswirtschaft, Wirtschaftspolitik & Nachhaltigkeit",
    summary: `<h4>Grundbegriffe</h4>
<ul>
<li><b>Bedürfnis</b> (Mangelempfinden: Existenz-, Kultur-, Luxusbedürfnisse; Individual-/Kollektivbedürfnisse) → <b>Bedarf</b> (mit Kaufkraft) → <b>Nachfrage</b> (am Markt wirksam).</li>
<li><b>Güter</b>: freie (Luft) vs. wirtschaftliche/knappe; Sachgüter (Konsum-/Investitionsgüter, Gebrauchs-/Verbrauchsgüter), Dienstleistungen, Rechte (Lizenzen, Patente). Komplementärgüter (Drucker + Toner), Substitutionsgüter (Butter/Margarine).</li>
<li><b>Ökonomisches Prinzip</b>: <b>Maximalprinzip</b> = mit gegebenen Mitteln maximalen Erfolg; <b>Minimalprinzip</b> = gegebenes Ziel mit minimalem Mitteleinsatz. (Beides gleichzeitig ist unmöglich.)</li>
<li><b>Produktionsfaktoren</b>: VWL – Arbeit, Boden, Kapital (+ Wissen/Bildung); BWL – ausführende Arbeit, Betriebsmittel, Werkstoffe (Elementarfaktoren) + dispositiver Faktor (Leitung, Planung, Organisation).</li>
<li><b>Wirtschaftskreislauf</b>: Haushalte ↔ Unternehmen (Faktorleistungen gegen Einkommen; Konsumgüter gegen Konsumausgaben), erweitert um Staat, Banken (Sparen/Investieren), Ausland. Güterstrom und Geldstrom laufen entgegengesetzt.</li>
</ul>
<h4>Markt & Preis</h4>
<ul>
<li><b>Marktformen</b> (Anbieter × Nachfrager): <b>Polypol</b> (viele – viele, Preisnehmer), <b>Oligopol</b> (wenige Anbieter – starke Reaktionsverbundenheit, z. B. Mobilfunk, Betriebssysteme), <b>Monopol</b> (ein Anbieter – Preissetzer). Vollkommener Markt: homogene Güter, Markttransparenz, keine Präferenzen, sofortige Reaktion.</li>
<li><b>Preisbildung</b>: Nachfrage sinkt, Angebot steigt mit dem Preis; Schnittpunkt = <b>Gleichgewichtspreis</b> (maximaler Umsatz, Markt geräumt). Preis darüber → <b>Angebotsüberhang</b>, darunter → <b>Nachfrageüberhang</b>. Staatlicher <b>Höchstpreis</b> (unter GG, Mieterschutz) → Nachfrageüberhang; <b>Mindestpreis</b> (über GG, z. B. Agrar, Mindestlohn) → Angebotsüberhang.</li>
<li><b>Soziale Marktwirtschaft</b> (Müller-Armack, Erhard): freier Wettbewerb + sozialer Ausgleich. Elemente: Privateigentum, Vertrags-/Gewerbefreiheit, Wettbewerbsschutz (GWB, Bundeskartellamt), Tarifautonomie, Sozialversicherung, progressive Einkommensteuer, Arbeitnehmerschutz. Gegensätze: freie Marktwirtschaft – Zentralverwaltungswirtschaft.</li>
</ul>
<h4>Konjunktur & Wirtschaftspolitik</h4>
<ul>
<li><b>Konjunkturphasen</b>: Aufschwung (Expansion) → Hochkonjunktur (Boom: Vollauslastung, steigende Preise) → Abschwung (Rezession: BIP sinkt 2 Quartale in Folge) → Tiefstand (Depression: hohe Arbeitslosigkeit). Indikatoren: Früh- (Auftragseingänge, ifo-Geschäftsklima), Präsenz- (BIP, Kapazitätsauslastung), Spätindikatoren (Arbeitslosenquote, Preise).</li>
<li><b>Stabilitätsgesetz 1967 (§ 1 StabG) – magisches Viereck</b>: Preisniveaustabilität, hoher Beschäftigungsstand, außenwirtschaftliches Gleichgewicht, stetiges und angemessenes Wachstum. <b>Sechseck</b> + gerechte Einkommens-/Vermögensverteilung + Umweltschutz. „Magisch“, weil Zielkonflikte (z. B. Preisstabilität ↔ Vollbeschäftigung, Wachstum ↔ Umwelt).</li>
<li><b>Fiskalpolitik</b> (Staat): antizyklisch (Keynes) – im Abschwung Ausgaben erhöhen/Steuern senken (deficit spending), im Boom umgekehrt; angebotsorientiert – Rahmenbedingungen für Unternehmen verbessern.</li>
<li><b>Geldpolitik</b>: <b>EZB</b> (unabhängig, Sitz Frankfurt, EZB-Rat) – vorrangiges Ziel <b>Preisniveaustabilität: 2 % Inflation mittelfristig</b>. Instrumente: Leitzinsen (Hauptrefinanzierungssatz, Einlagefazilität, Spitzenrefinanzierung), Offenmarktgeschäfte, Mindestreserve, Anleihekäufe. Zinserhöhung → Kredite teurer → Nachfrage und Inflation sinken.</li>
<li><b>Inflation</b>: anhaltender Anstieg des Preisniveaus (Verbraucherpreisindex/HVPI, Warenkorb). Ursachen: nachfrage-, kosten-/angebotsinduziert (Energie, Löhne), importiert, Geldmenge. Folgen: Kaufkraftverlust, Sparer verlieren, Schuldner gewinnen, Flucht in Sachwerte. <b>Realzins = Nominalzins − Inflationsrate</b>. <b>Deflation</b>: sinkendes Preisniveau → Kaufzurückhaltung, Abwärtsspirale. Stagflation: Stagnation + Inflation.</li>
<li><b>BIP</b>: Wert aller im <b>Inland</b> in einem Jahr produzierten Waren und Dienstleistungen (Endprodukte) – nominal (in jeweiligen Preisen) vs. <b>real</b> (preisbereinigt, Maß für Wachstum). BNE = Inländerkonzept. Verwendung: Konsum + Investitionen + Staatsausgaben + Außenbeitrag (Ex − Im). Kritik: Hausarbeit, Ehrenamt, Schwarzarbeit, Umweltschäden fehlen.</li>
</ul>
<h4>Globalisierung, EU, Nachhaltigkeit</h4>
<ul>
<li><b>Globalisierung</b>: weltweite Verflechtung (sinkende Transport-/Kommunikationskosten, Internet, Freihandel/WTO). Chancen: Absatzmärkte, günstigere Beschaffung, Wohlstand; Risiken: Standortwettbewerb, Abhängigkeiten (Lieferketten, Chips), Umwelt- und Sozialdumping (→ Lieferkettengesetz).</li>
<li><b>EU</b>: 27 Staaten, Binnenmarkt mit <b>4 Freiheiten</b> (Waren, Personen, Dienstleistungen, Kapital). Organe: Parlament, Rat der EU, Kommission (Initiativrecht), Europäischer Rat, EuGH, EZB. <b>Verordnung</b> gilt unmittelbar (z. B. DSGVO), <b>Richtlinie</b> muss national umgesetzt werden. Euro seit 2026 in 21 Staaten (Bulgarien).</li>
<li><b>Nachhaltigkeit</b> (Brundtland 1987: Bedürfnisse heute befriedigen, ohne künftige Generationen zu gefährden): <b>Drei-Säulen-Modell</b> ökologisch – ökonomisch – sozial; UN-Agenda 2030 mit 17 SDGs.</li>
<li><b>Green IT/Umweltschutz im Betrieb</b>: energieeffiziente Hardware (EU-Energielabel, Blauer Engel, Energy Star), Virtualisierung/Konsolidierung, Cloud, Abwärmenutzung und PUE in Rechenzentren (EnEfG), Energiesparoptionen, Druckreduktion, längere Nutzungsdauer, Refurbished.</li>
<li><b>ElektroG</b>: Altgeräte (Symbol durchgestrichene Mülltonne) <b>nicht in den Hausmüll</b>; Rückgabe bei Wertstoffhöfen bzw. Händlern (große Händler: kleine Geräte bis 25 cm ohne Kauf, große 1:1 beim Neukauf); Hersteller registrieren sich bei der stiftung ear; <b>personenbezogene Daten vor der Abgabe löschen</b> (Endnutzer).</li>
<li><b>Kreislaufwirtschaftsgesetz – Abfallhierarchie</b>: 1. Vermeidung, 2. Vorbereitung zur Wiederverwendung, 3. Recycling, 4. sonstige (z. B. energetische) Verwertung, 5. Beseitigung.</li>
</ul>`
  },
  {
    id: "wiso-kalkulation",
    part: "WISO",
    title: "Kalkulation, Kosten & Kennzahlen",
    summary: `<h4>Kosten & Deckungsbeitrag</h4>
<ul>
<li><b>Fixe Kosten</b> (K<sub>f</sub>): unabhängig von der Menge (Miete, Gehälter, Abschreibung, Leasing). <b>Variable Kosten</b> (K<sub>v</sub> = k<sub>v</sub> · x): mengenabhängig (Material, Lizenzgebühr je Stück, Provision). Gesamtkosten K = K<sub>f</sub> + k<sub>v</sub> · x; Stückkosten sinken mit steigender Menge (Fixkostendegression).</li>
<li><b>Deckungsbeitrag</b> je Stück db = Preis p − k<sub>v</sub>; DB gesamt = db · x; <b>Gewinn = DB − K<sub>f</sub></b>.</li>
<li><b>Break-even-Menge</b> (Gewinnschwelle): x = K<sub>f</sub> ÷ db (Ergebnis ggf. <b>aufrunden</b>!). Kurzfristige Preisuntergrenze = k<sub>v</sub>; langfristige = Stückselbstkosten.</li>
</ul>
<h4>Bezugskalkulation</h4>
<pre><code>  Listeneinkaufspreis (LEP)
− Liefererrabatt (% vom LEP)
= Zieleinkaufspreis (ZEP)
− Liefererskonto (% vom ZEP)
= Bareinkaufspreis (BEP)
+ Bezugskosten (Fracht, Verpackung, Versicherung, Zoll)
= Bezugspreis (Einstandspreis)</code></pre>
<h4>Handelskalkulation (Vorwärtskalkulation)</h4>
<pre><code>  Bezugspreis
+ Handlungskosten (Zuschlag vom Bezugspreis)
= Selbstkosten
+ Gewinnzuschlag (vom Selbstkostenpreis)
= Barverkaufspreis
+ Kundenskonto  (im Hundert: BVP ÷ (100 − s) × 100)
= Zielverkaufspreis
+ Kundenrabatt  (im Hundert: ZVP ÷ (100 − r) × 100)
= Listenverkaufspreis netto
+ Umsatzsteuer 19 %
= Listenverkaufspreis brutto</code></pre>
<p>Kalkulationszuschlag = (LVP − Bezugspreis) ÷ Bezugspreis × 100; Kalkulationsfaktor = LVP ÷ Bezugspreis; Handelsspanne = (LVP − Bezugspreis) ÷ LVP × 100.</p>
<h4>Prozent- und Zinsrechnung</h4>
<ul>
<li>Prozentwert W = G · p ÷ 100; vermehrter Grundwert: G = W ÷ (100 + p) × 100 (z. B. Netto aus Brutto: Brutto ÷ 1,19); verminderter Grundwert: G = W ÷ (100 − p) × 100.</li>
<li><b>Zinsen</b> (kaufmännisch, 30 Tage/Monat, 360 Tage/Jahr): Z = K · p · t ÷ (100 · 360). Effektiver Jahreszins des Skontos ≈ Skontosatz × 360 ÷ (Zahlungsziel − Skontofrist) – meist &gt; 30 % → Skonto ziehen lohnt sich, notfalls mit Kontokorrentkredit.</li>
</ul>
<h4>Abschreibung (AfA)</h4>
<ul>
<li>Anschaffungskosten = Kaufpreis netto − Anschaffungspreisminderungen (Rabatt, Skonto) + Anschaffungsnebenkosten (Lieferung, Installation). USt (Vorsteuer) gehört nicht dazu.</li>
<li><b>Linear</b>: AfA/Jahr = AK ÷ Nutzungsdauer; im Anschaffungsjahr <b>monatsgenau</b> (pro rata temporis). Restbuchwert = AK − kumulierte AfA. GWG bis 800 € netto sofort abschreibbar; Computerhardware/Software darf steuerlich mit 1 Jahr ND angesetzt werden.</li>
</ul>
<h4>Finanzierung & Investition</h4>
<ul>
<li><b>Eigenfinanzierung</b> (Einlagen, Beteiligung, Selbstfinanzierung aus Gewinnen) vs. <b>Fremdfinanzierung</b> (Darlehen, Kontokorrentkredit, Lieferantenkredit – sehr teuer, Leasing). Innen- vs. Außenfinanzierung. Kreditsicherheiten: Bürgschaft, Sicherungsübereignung, Grundschuld, Eigentumsvorbehalt.</li>
<li><b>Leasing</b>: Vorteile – Liquiditätsschonung, aktuelle Technik, planbare Raten, kein Kapitalbedarf; Nachteile – insgesamt teurer, kein Eigentum, Vertragsbindung.</li>
<li><b>Investitionsrechnung (statisch)</b>: Kosten-, Gewinnvergleich, Rentabilitätsrechnung, <b>Amortisationsdauer = Anschaffungskosten ÷ jährlicher Rückfluss</b> (Gewinn + AfA bzw. Kosteneinsparung).</li>
</ul>
<h4>Kennzahlen</h4>
<ul>
<li><b>Produktivität</b> = Ausbringungsmenge ÷ Einsatzmenge (mengenmäßig, z. B. Tickets je Mitarbeiterstunde).</li>
<li><b>Wirtschaftlichkeit</b> = Ertrag ÷ Aufwand (bzw. Leistung ÷ Kosten), &gt; 1 = wirtschaftlich.</li>
<li><b>Rentabilität</b>: EK-Rentabilität = Gewinn ÷ EK × 100; GK-Rentabilität = (Gewinn + FK-Zinsen) ÷ GK × 100; Umsatzrentabilität = Gewinn ÷ Umsatz × 100.</li>
<li><b>Liquidität</b> 1. Grades = flüssige Mittel ÷ kurzfristige Verbindlichkeiten × 100 (Richtwert ≥ 20 %), 2. Grades = (flüssige Mittel + kurzfr. Forderungen) ÷ kurzfr. Verbindlichkeiten (≥ 100 %).</li>
<li><b>Bilanz</b> (Stichtag): Aktiva = Mittelverwendung (Anlagevermögen, Umlaufvermögen) = Passiva = Mittelherkunft (Eigenkapital, Fremdkapital). EK-Quote = EK ÷ GK × 100. <b>GuV</b> (Zeitraum): Erträge − Aufwendungen = Jahresüberschuss/-fehlbetrag. Inventur → Inventar → Bilanz. Aufbewahrung: Bücher/Bilanzen 10 Jahre, Buchungsbelege 8 Jahre, Handelsbriefe 6 Jahre.</li>
</ul>
<p><b>Falle:</b> Skonto vom <b>Zieleinkaufspreis</b> (nach Rabatt) rechnen; Kundenskonto/-rabatt in der Vorwärtskalkulation <b>im Hundert</b> rechnen.</p>`
  },
  {
    id: "wiso-arbeitsschutz",
    part: "WISO",
    title: "Arbeitsschutz, Unfallversicherung & Gesundheit",
    summary: `<h4>Rechtsgrundlagen (duales Arbeitsschutzsystem)</h4>
<ul>
<li>Staat: <b>ArbSchG</b>, ArbStättV, ArbMedVV, ASiG, ArbZG, JArbSchG, MuSchG – Aufsicht durch Gewerbeaufsicht/Arbeitsschutzbehörden der Länder. Unfallversicherungsträger: <b>DGUV-Vorschriften</b> der Berufsgenossenschaften (für IT-Betriebe meist die <b>VBG</b>), Aufsichtspersonen der BG.</li>
<li><b>ArbSchG:</b> AG ist verantwortlich und trägt die Kosten (§ 3); <b>Gefährdungsbeurteilung</b> (§ 5) inkl. <b>psychischer Belastungen</b> – Dokumentation (§ 6); Rangfolge der Maßnahmen <b>STOP</b>: Substitution, Technisch, Organisatorisch, Personenbezogen; <b>Unterweisung</b> (§ 12) bei Einstellung, bei Veränderungen und regelmäßig (mind. jährlich, Jugendliche halbjährlich); Pflichten der Beschäftigten (§§ 15, 16): Weisungen befolgen, Gefahren melden, Schutzausrüstung nutzen.</li>
</ul>
<h4>Bildschirmarbeit (ArbStättV Anhang 6) & Ergonomie</h4>
<ul>
<li>Bildschirm frei von Reflexionen/Blendung, Bild flimmerfrei, scharf, <b>dreh- und neigbar</b>, Helligkeit/Kontrast einstellbar; Tastatur getrennt und neigbar; ausreichend große Arbeitsfläche; ergonomische Software (Aufgabenangemessenheit – DIN EN ISO 9241); regelmäßige <b>Unterbrechungen</b> durch Pausen oder Mischarbeit.</li>
<li>Ergonomie: Oberkante Bildschirm leicht <b>unter Augenhöhe</b>, Sehabstand ca. <b>50–80 cm</b>, Blickrichtung <b>parallel zum Fenster</b> (Bildschirm im rechten Winkel zur Fensterfront), Ober-/Unterarm und Ober-/Unterschenkel etwa 90°, Füße flach auf dem Boden (ggf. Fußstütze), dynamisches Sitzen, Steh-Sitz-Tisch, positive Darstellung (dunkle Schrift auf hellem Grund).</li>
<li>Arbeitsstätte (ASR): Büro mind. <b>500 Lux</b>, Raumtemperatur mind. <b>20 °C</b>, über 26 °C Maßnahmen sinnvoll, über 30 °C erforderlich; Grundfläche ca. 8–10 m² je Arbeitsplatz; Lärm bei konzentrierter Arbeit möglichst ≤ 55 dB(A).</li>
<li><b>Telearbeitsplatz</b> (fest eingerichtet im Privatbereich, vereinbart) fällt unter die ArbStättV; <b>mobiles Arbeiten</b> nur unter das ArbSchG.</li>
<li><b>Arbeitsmedizinische Vorsorge (ArbMedVV)</b>: Pflicht-, <b>Angebots-</b> (z. B. Bildschirmarbeit inkl. Augenuntersuchung; spezielle Bildschirmbrille zahlt der AG) und Wunschvorsorge – durch Betriebsarzt, Ergebnisse unterliegen der Schweigepflicht.</li>
</ul>
<h4>Unfallversicherung</h4>
<ul>
<li><b>Arbeitsunfall</b> (§ 8 SGB VII): Unfall bei versicherter Tätigkeit (auch Homeoffice seit 2021, Betriebsfeier, Dienstreise). <b>Wegeunfall</b>: auf dem <b>unmittelbaren</b> Weg zwischen Wohnung und Arbeit; geschützt auch Umwege für Kinderbetreuung und Fahrgemeinschaften – <b>nicht</b> private Umwege (Einkauf, Tanken in Eigeninteresse).</li>
<li><b>Unfallanzeige</b> an die BG durch den AG, wenn der Versicherte <b>mehr als 3 Kalendertage arbeitsunfähig</b> ist oder stirbt – innerhalb von <b>3 Tagen</b> nach Kenntnis; Betriebsrat unterzeichnet mit; tödliche/Massenunfälle sofort. Behandlung beim <b>Durchgangsarzt</b> (D-Arzt). Kleinere Verletzungen ins <b>Verbandbuch</b> (5 Jahre aufbewahren) – Nachweis für spätere Ansprüche.</li>
<li>Leistungen der BG: Prävention, Heilbehandlung, Reha, Verletztengeld, Rente. Kosten trägt allein der AG; Haftungsablösung: AG/Kollegen haften i. d. R. nicht privat.</li>
</ul>
<h4>Sicherheitszeichen (ASR A1.3 / ISO 7010)</h4>
<table><tr><th>Art</th><th>Farbe/Form</th><th>Beispiel</th></tr>
<tr><td>Verbot</td><td>rot, rund, Diagonalbalken</td><td>Rauchen verboten</td></tr>
<tr><td>Gebot</td><td>blau, rund</td><td>Gehörschutz benutzen</td></tr>
<tr><td>Warnung</td><td>gelb, Dreieck, schwarzer Rand</td><td>Warnung vor elektrischer Spannung</td></tr>
<tr><td>Rettung/Erste Hilfe</td><td>grün, rechteckig/quadratisch</td><td>Notausgang, Sammelstelle, Erste Hilfe</td></tr>
<tr><td>Brandschutz</td><td>rot, rechteckig/quadratisch</td><td>Feuerlöscher, Brandmelder</td></tr></table>
<h4>Erste Hilfe & Brandschutz</h4>
<ul>
<li><b>Ersthelfer</b> (DGUV V1): bei 2–20 Versicherten mind. 1; darüber in Verwaltungs-/Handelsbetrieben <b>5 %</b>, sonst 10 %; Fortbildung alle 2 Jahre. Rettungskette: Sofortmaßnahmen/Eigenschutz → <b>Notruf 112</b> (Wo? Was? Wie viele? Welche Verletzungen? Warten auf Rückfragen) → Erste Hilfe → Rettungsdienst → Krankenhaus.</li>
<li><b>Brandschutz</b>: Brandschutzhelfer ca. 5 % der Beschäftigten; Verhalten: <b>Ruhe bewahren – Brand melden – in Sicherheit bringen – Löschversuch</b>; keinen Aufzug benutzen, Türen schließen, Sammelplatz. Für IT/Elektro: <b>CO₂-Löscher</b> (Brandklasse B, rückstandsfrei). Brandklassen A (fest), B (flüssig), C (Gase), D (Metalle), F (Speisefette).</li>
</ul>
<h4>Akteure</h4>
<ul>
<li><b>Fachkraft für Arbeitssicherheit</b> und <b>Betriebsarzt</b> (ASiG): beraten den AG, fachlich weisungsfrei. <b>Sicherheitsbeauftragter</b> (§ 22 SGB VII, bei mehr als 20 Beschäftigten): Kollege, ehrenamtlich, unterstützt und weist auf Mängel hin – <b>keine</b> Verantwortung/Weisungsbefugnis. <b>Arbeitsschutzausschuss</b> (&gt; 20 Beschäftigte) tagt mind. vierteljährlich. Betriebsrat: Mitbestimmung im Arbeitsschutz (§ 87 Nr. 7 BetrVG).</li>
</ul>
<h4>Gesundheit & Datenschutz</h4>
<ul>
<li><b>Betriebliches Gesundheitsmanagement</b> (freiwillig): Sportangebote, Ergonomieberatung, Stressprävention; steuerfrei bis 600 €/Jahr je AN. <b>BEM</b> (§ 167 SGB IX) <b>Pflicht</b> bei mehr als 6 Wochen AU innerhalb von 12 Monaten.</li>
<li><b>Datenschutz am Arbeitsplatz</b>: DSGVO + BDSG; Verarbeitung von Beschäftigtendaten nur mit Rechtsgrundlage; Clean Desk, Bildschirmsperre, Passwörter nicht weitergeben, Datenschutzbeauftragter ab 20 Personen mit ständiger automatisierter Verarbeitung; Datenpanne binnen <b>72 h</b> an Aufsichtsbehörde; Überwachungssoftware mitbestimmungspflichtig (§ 87 Nr. 6 BetrVG).</li>
</ul>`
  }
);

// ---------------------------------------------------------------------------
// Fragen: wiso-ausbildung
// ---------------------------------------------------------------------------
(function () {
  const Q = (o) => Object.assign({ part: "WISO", topic: "wiso-ausbildung" }, o);
  const CTX = "Sie sind Umschülerin/Umschüler zum Fachinformatiker Anwendungsentwicklung bei der <b>InnoSoft GmbH</b> in Karlsruhe (85 Mitarbeitende, Betriebsrat vorhanden). Die InnoSoft bildet außerdem drei Auszubildende aus.";
  AP2.questions.push(
    Q({
      id: "wiso-ausbildung-001", type: "mc", difficulty: 1, points: 2,
      context: CTX + " Der neue Auszubildende Tim Wagner (17) soll am 01.09. beginnen. Im Vertragsentwurf ist eine Probezeit von 6 Monaten vorgesehen.",
      question: "Wie beurteilen Sie die vorgesehene Probezeit?",
      options: [
        "Zulässig, weil § 622 BGB eine Probezeit von bis zu 6 Monaten erlaubt.",
        "Zulässig, wenn die Eltern des minderjährigen Tim zustimmen.",
        "Unzulässig, die Probezeit muss mindestens 1 Monat und darf höchstens 4 Monate betragen.",
        "Unzulässig, die Probezeit darf höchstens 3 Monate betragen.",
        "Zulässig, weil die Dauer der Probezeit frei vereinbart werden kann."
      ],
      correct: [2],
      solution: "Nach <b>§ 20 BBiG</b> beträgt die Probezeit im Berufsausbildungsverhältnis <b>mindestens einen Monat und höchstens vier Monate</b>. Eine längere Vereinbarung ist unwirksam.",
      explanation: "Falle: Die 6 Monate stammen aus § 622 Abs. 3 BGB (Probezeit im <i>Arbeitsverhältnis</i>). Für Ausbildungsverhältnisse gilt das BBiG als Spezialgesetz."
    }),
    Q({
      id: "wiso-ausbildung-002", type: "mc", difficulty: 1, points: 2,
      context: CTX + " Nach sechs Wochen Ausbildung merkt die Auszubildende Sarah, dass ihr der Beruf nicht liegt. Die vereinbarte Probezeit beträgt 3 Monate.",
      question: "Wie kann Sarah das Ausbildungsverhältnis beenden?",
      options: [
        "Jederzeit ohne Einhaltung einer Kündigungsfrist durch schriftliche Kündigung, ohne Angabe von Gründen.",
        "Mit einer Frist von 4 Wochen zum 15. oder zum Monatsende, mündlich.",
        "Nur mit Zustimmung der IHK.",
        "Mit einer Frist von 2 Wochen, die Kündigung muss begründet werden.",
        "Gar nicht – sie muss bis zum Ende der Probezeit warten."
      ],
      correct: [0],
      solution: "<b>§ 22 Abs. 1 BBiG</b>: Während der Probezeit kann das Berufsausbildungsverhältnis von beiden Seiten <b>jederzeit ohne Einhaltung einer Kündigungsfrist</b> gekündigt werden. Die Kündigung muss <b>schriftlich</b> erfolgen (§ 22 Abs. 3), eine Begründung ist in der Probezeit nicht nötig.",
      explanation: "Die 4-Wochen-Frist gilt erst nach der Probezeit und nur für den Azubi bei Berufsaufgabe/-wechsel. Mündliche Kündigungen sind immer unwirksam."
    }),
    Q({
      id: "wiso-ausbildung-003", type: "mc", difficulty: 2, points: 3,
      context: CTX + " Der Auszubildende Jonas ist im 2. Ausbildungsjahr und möchte in eine Ausbildung zum Mechatroniker wechseln.",
      question: "Welche Aussage zur Kündigung durch Jonas ist richtig?",
      options: [
        "Jonas kann nach der Probezeit nicht mehr kündigen; nur ein Aufhebungsvertrag ist möglich.",
        "Jonas kann mit einer Frist von vier Wochen kündigen; die Kündigung muss schriftlich erfolgen und den Kündigungsgrund nennen.",
        "Jonas kann fristlos kündigen, da der Berufswechsel ein wichtiger Grund ist.",
        "Jonas kann mit den Fristen des § 622 BGB kündigen, die Kündigung kann per E-Mail erfolgen.",
        "Jonas benötigt für die Kündigung die Zustimmung des Betriebsrats."
      ],
      correct: [1],
      solution: "<b>§ 22 Abs. 2 Nr. 2 BBiG</b>: Nach der Probezeit kann der Auszubildende mit einer <b>Frist von vier Wochen</b> kündigen, wenn er die Berufsausbildung aufgeben oder sich für eine andere Berufstätigkeit ausbilden lassen will. Die Kündigung muss <b>schriftlich</b> und <b>unter Angabe der Gründe</b> erfolgen (§ 22 Abs. 3).",
      explanation: "Der Berufswechsel ist kein wichtiger Grund für eine fristlose Kündigung. Ein Aufhebungsvertrag wäre zusätzlich jederzeit möglich, ist aber nicht die einzige Option."
    }),
    Q({
      id: "wiso-ausbildung-004", type: "mc", difficulty: 2, points: 2,
      context: CTX + " Die Personalabteilung möchte in den Ausbildungsvertrag neue Klauseln aufnehmen.",
      question: "Welche Vereinbarung wäre im Berufsausbildungsvertrag <b>nichtig</b>?",
      options: [
        "Die Ausbildung findet teilweise in einer Partnerfirma in Stuttgart statt.",
        "Die tägliche Ausbildungszeit beträgt 8 Stunden.",
        "Der Auszubildende verpflichtet sich, nach der Ausbildung mindestens zwei Jahre bei der InnoSoft GmbH zu arbeiten.",
        "Der Ausbildungsnachweis wird elektronisch geführt.",
        "Der Urlaub beträgt 28 Arbeitstage pro Jahr."
      ],
      correct: [2],
      solution: "<b>§ 12 Abs. 1 BBiG</b>: Eine Vereinbarung, die Auszubildende für die Zeit nach Beendigung der Ausbildung in der Ausübung ihrer beruflichen Tätigkeit beschränkt (Bleibeverpflichtung), ist <b>nichtig</b>. Ausnahme: Der Azubi verpflichtet sich innerhalb der <b>letzten sechs Monate</b> der Ausbildung zu einem Arbeitsverhältnis.",
      explanation: "Ebenfalls nichtig: Entschädigungszahlungen für die Ausbildung, Vertragsstrafen, Ausschluss/Beschränkung von Schadensersatzansprüchen, Pauschalierung von Schadensersatz."
    }),
    Q({
      id: "wiso-ausbildung-005", type: "mc", difficulty: 1, points: 2,
      context: CTX + " Ihr Kollege meint, das Berichtsheft (Ausbildungsnachweis) sei „nur Bürokratie“ und könne am Ende nachgeschrieben werden.",
      question: "Welche Aussage zum Ausbildungsnachweis ist richtig?",
      options: [
        "Der Ausbildungsnachweis ist freiwillig und dient nur der persönlichen Kontrolle.",
        "Der Ausbildungsnachweis muss in der Freizeit geführt werden.",
        "Der Ausbildungsnachweis wird von der Berufsschule geprüft und benotet.",
        "Das ordnungsgemäße Führen des Ausbildungsnachweises ist Voraussetzung für die Zulassung zur Abschlussprüfung.",
        "Der Ausbildungsnachweis ersetzt das Ausbildungszeugnis."
      ],
      correct: [3],
      solution: "Nach <b>§ 43 Abs. 1 Nr. 2 BBiG</b> wird zur Abschlussprüfung nur zugelassen, wer einen vom Ausbilder und Auszubildenden unterzeichneten <b>Ausbildungsnachweis</b> vorgelegt hat. Der Ausbildende muss das Führen während der Ausbildungszeit ermöglichen und es regelmäßig durchsehen (§ 14 Abs. 2 BBiG).",
      explanation: "Der Nachweis wird nicht benotet. Auch Umschüler müssen in der Regel einen Ausbildungsnachweis für die Zulassung vorlegen."
    }),
    Q({
      id: "wiso-ausbildung-006", type: "mc", difficulty: 2, points: 2,
      question: "Welche der folgenden Aufgaben gehört <b>nicht</b> zu den Aufgaben der IHK als zuständige Stelle nach dem BBiG?",
      options: [
        "Führen des Verzeichnisses der Berufsausbildungsverhältnisse",
        "Errichten von Prüfungsausschüssen und Durchführen der Abschlussprüfungen",
        "Überwachen der Durchführung der Berufsausbildung durch Ausbildungsberater",
        "Festlegen der Höhe der Ausbildungsvergütung für den einzelnen Betrieb",
        "Prüfen der Eignung von Ausbildungsstätte und Ausbildungspersonal"
      ],
      correct: [3],
      solution: "Die Vergütung wird im <b>Ausbildungsvertrag</b> vereinbart bzw. durch <b>Tarifverträge</b> bestimmt; das BBiG legt nur eine <b>Mindestausbildungsvergütung</b> fest (§ 17). Die IHK legt die Vergütung nicht fest (sie kann lediglich Empfehlungen veröffentlichen). Alle anderen Aufgaben ergeben sich aus §§ 34, 39, 71, 76 BBiG.",
      explanation: "Typische Verwechslung: Die IHK prüft den Vertrag bei der Eintragung u. a. auf eine angemessene Vergütung, setzt sie aber nicht fest."
    }),
    Q({
      id: "wiso-ausbildung-007", type: "mc", difficulty: 2, points: 2,
      context: CTX + " Laut Vertrag endet die Ausbildung der Auszubildenden Mia am 31.01.2027. Der Prüfungsausschuss teilt ihr am 20.01.2027 nach dem Fachgespräch mit, dass sie bestanden hat.",
      question: "Wann endet Mias Ausbildungsverhältnis?",
      options: [
        "Am 31.01.2027, dem vertraglich vereinbarten Ende",
        "Am 20.01.2027 mit Bekanntgabe des Ergebnisses durch den Prüfungsausschuss",
        "Mit Zugang des schriftlichen Prüfungszeugnisses der IHK",
        "Am Ende des Monats, in dem die Prüfung bestanden wurde",
        "Am letzten Tag der schriftlichen Prüfung im Herbst"
      ],
      correct: [1],
      solution: "<b>§ 21 Abs. 2 BBiG</b>: Bestehen Auszubildende vor Ablauf der Ausbildungszeit die Abschlussprüfung, so endet das Berufsausbildungsverhältnis mit <b>Bekanntgabe des Ergebnisses durch den Prüfungsausschuss</b>.",
      explanation: "Wichtig für die Praxis: Ab dem 21.01.2027 ist Mia keine Auszubildende mehr – arbeitet sie weiter, entsteht ein Arbeitsverhältnis (§ 24 BBiG)."
    }),
    Q({
      id: "wiso-ausbildung-008", type: "mc", difficulty: 2, points: 2,
      context: CTX + " Nach bestandener Prüfung arbeitet der ehemalige Auszubildende Jan am nächsten Tag einfach weiter. Über eine Übernahme wurde nicht gesprochen.",
      question: "Welche Rechtsfolge tritt ein?",
      options: [
        "Es entsteht ein auf 6 Monate befristetes Probearbeitsverhältnis.",
        "Es entsteht kein Arbeitsverhältnis, da die Schriftform fehlt.",
        "Es entsteht ein Arbeitsverhältnis auf unbestimmte Zeit.",
        "Das Ausbildungsverhältnis verlängert sich automatisch um ein Jahr.",
        "Jan gilt als Praktikant, bis ein Arbeitsvertrag unterschrieben ist."
      ],
      correct: [2],
      solution: "<b>§ 24 BBiG</b>: Werden Auszubildende im Anschluss an das Berufsausbildungsverhältnis beschäftigt, ohne dass hierüber ausdrücklich etwas vereinbart worden ist, so gilt ein <b>Arbeitsverhältnis auf unbestimmte Zeit</b> als begründet.",
      explanation: "Eine nachträgliche Befristung wäre ohne Schriftform vor Arbeitsantritt nicht wirksam (§ 14 Abs. 4 TzBfG)."
    }),
    Q({
      id: "wiso-ausbildung-009", type: "mc", difficulty: 1, points: 2,
      context: "Frau Becker (34) war zuletzt arbeitslos und möchte eine Umschulung zur Fachinformatikerin Anwendungsentwicklung beginnen. Sie bezieht Arbeitslosengeld.",
      question: "Wer stellt üblicherweise den Bildungsgutschein für die Umschulung aus?",
      options: [
        "Die IHK Karlsruhe",
        "Die Berufsschule",
        "Die Agentur für Arbeit (bei Bürgergeld/Grundsicherung das Jobcenter)",
        "Die Deutsche Rentenversicherung in jedem Fall",
        "Der Betriebsrat des Praktikumsbetriebs"
      ],
      correct: [2],
      solution: "Der <b>Bildungsgutschein</b> (§ 81 Abs. 4 SGB III) wird von der <b>Agentur für Arbeit</b> bzw. – für Leistungsberechtigte nach SGB II – vom <b>Jobcenter</b> ausgestellt. Er gilt für AZAV-zugelassene Träger und Maßnahmen.",
      explanation: "Die Rentenversicherung fördert Umschulungen nur in bestimmten Fällen (berufliche Reha). Die IHK ist für die Prüfung zuständig, nicht für die Förderung."
    }),
    Q({
      id: "wiso-ausbildung-010", type: "mc", difficulty: 3, points: 4,
      context: "Ergebnisse der Umschülerin Becker (jeweils 100-Punkte-Skala): Teil 1: 70; betriebliche Projektarbeit (inkl. Präsentation/Fachgespräch): 75; Planen eines Softwareproduktes: 55; Entwicklung und Umsetzung von Algorithmen: 28; WiSo: 60.<br>Gewichtung: Teil 1 20 %, Projekt 50 %, die drei schriftlichen Bereiche von Teil 2 je 10 %.",
      question: "Welche Aussage zum Prüfungsergebnis ist richtig?",
      options: [
        "Bestanden, da das Gesamtergebnis über 50 Punkten liegt.",
        "Bestanden, da die Projektarbeit mindestens ausreichend ist und diese 50 % ausmacht.",
        "Derzeit nicht bestanden, da „Algorithmen“ mit ungenügend bewertet ist; eine mündliche Ergänzungsprüfung in diesem Bereich kann den Ausschlag geben.",
        "Nicht bestanden; eine mündliche Ergänzungsprüfung ist nur bei der Projektarbeit möglich.",
        "Nicht bestanden, da Teil 1 schlechter als 80 Punkte ist."
      ],
      correct: [2],
      solution: "Gesamtergebnis: 0,2·70 + 0,5·75 + 0,1·55 + 0,1·28 + 0,1·60 = 14 + 37,5 + 5,5 + 2,8 + 6 = <b>65,8</b> (≥ 50). Projekt ≥ 50 ✓, zwei der übrigen Bereiche ≥ 50 (55 und 60) ✓, aber <b>kein Bereich von Teil 2 darf „ungenügend“ (&lt; 30 Punkte)</b> sein ✗ → derzeit nicht bestanden.<br>Mündliche Ergänzungsprüfung (auf Antrag in einem schriftlichen Bereich, der schlechter als ausreichend ist, 2 : 1): (2·28 + m) ÷ 3 ≥ 30 ⇒ m ≥ 34 Punkte – sie kann also den Ausschlag geben.",
      explanation: "Die Bestehensregeln sind kumulativ – ein hohes Gesamtergebnis rettet kein „ungenügend“."
    }),
    Q({
      id: "wiso-ausbildung-011", type: "numeric", difficulty: 2, points: 4,
      context: "Ergebnisse des Auszubildenden Tom: Teil 1: 72 Punkte; Projektarbeit: 80; Planen eines Softwareproduktes: 64; Algorithmen: 58; WiSo: 70.<br>Gewichtung: Teil 1 20 %, Projektarbeit 50 %, die drei schriftlichen Bereiche je 10 %.",
      question: "Berechnen Sie das Gesamtergebnis in Punkten (eine Nachkommastelle).",
      answer: 73.6, tolerance: 0.05, unit: "Punkte",
      solution: "0,2 · 72 = 14,4<br>0,5 · 80 = 40,0<br>0,1 · 64 = 6,4<br>0,1 · 58 = 5,8<br>0,1 · 70 = 7,0<br>Summe = <b>73,6 Punkte</b> (Note befriedigend).",
      explanation: "Teil 1 zählt mit 20 % ins Gesamtergebnis, obwohl er eineinhalb Jahre vorher stattfand."
    }),
    Q({
      id: "wiso-ausbildung-012", type: "numeric", difficulty: 2, points: 3,
      context: "Im Prüfungsbereich „Planen eines Softwareproduktes“ erreichte die Umschülerin 44 Punkte. In der mündlichen Ergänzungsprüfung erzielt sie 65 Punkte. Das schriftliche Ergebnis und die Ergänzungsprüfung werden im Verhältnis 2 : 1 gewichtet.",
      question: "Berechnen Sie das neue Ergebnis des Prüfungsbereichs in Punkten.",
      answer: 51, tolerance: 0.05, unit: "Punkte",
      solution: "(2 · 44 + 1 · 65) ÷ 3 = (88 + 65) ÷ 3 = 153 ÷ 3 = <b>51 Punkte</b> → ausreichend.",
      explanation: "Häufiger Fehler: einfacher Mittelwert (44 + 65) ÷ 2 = 54,5."
    }),
    Q({
      id: "wiso-ausbildung-013", type: "multi", difficulty: 2, points: 3,
      context: CTX,
      question: "Welche <b>zwei</b> Pflichten hat der Ausbildende nach dem BBiG?",
      options: [
        "Ausbildungsmittel, insbesondere Werkzeuge und Fachliteratur für die Ausbildung, kostenlos zur Verfügung zu stellen",
        "Den Auszubildenden nach bestandener Prüfung zu übernehmen",
        "Den Auszubildenden für den Berufsschulunterricht und für Prüfungen freizustellen",
        "Den Ausbildungsnachweis anstelle des Auszubildenden zu schreiben",
        "Dem Auszubildenden die Fahrtkosten zur Berufsschule zu erstatten"
      ],
      correct: [0, 2],
      solution: "<b>§ 14 Abs. 1 Nr. 3 BBiG</b>: kostenlose Ausbildungsmittel; <b>§ 15 BBiG</b>: Freistellung für Berufsschule und Prüfungen (Anrechnung auf die Ausbildungszeit).",
      explanation: "Eine Übernahmepflicht besteht nicht (Ausnahme: JAV-/BR-Mitglieder nach § 78a BetrVG auf Verlangen). Fahrtkosten zur Berufsschule müssen nicht gesetzlich erstattet werden (ggf. Tarifvertrag)."
    }),
    Q({
      id: "wiso-ausbildung-014", type: "multi", difficulty: 2, points: 3,
      context: "Frau Becker absolviert eine geförderte Umschulung bei einem Bildungsträger mit Praktikum bei der InnoSoft GmbH.",
      question: "Welche <b>zwei</b> Aussagen zur Umschulung sind richtig?",
      options: [
        "Die Umschulung endet mit einer Prüfung vor der IHK, die zum selben Berufsabschluss führt wie die Ausbildung.",
        "Frau Becker hat einen Berufsausbildungsvertrag nach § 10 BBiG mit der InnoSoft GmbH.",
        "Der Bildungsträger und die Maßnahme müssen für die Förderung per Bildungsgutschein nach AZAV zugelassen sein.",
        "Eine Umschulung dauert immer genau so lange wie die reguläre Ausbildung.",
        "Umschüler dürfen den Ausbildungsnachweis nicht führen."
      ],
      correct: [0, 2],
      solution: "Die Umschulung (<b>§§ 58 ff. BBiG</b>) führt bei anerkannten Ausbildungsberufen zur gleichen IHK-Prüfung. Die Förderung über den Bildungsgutschein setzt eine <b>AZAV-Zulassung</b> von Träger und Maßnahme voraus.",
      explanation: "Umschüler schließen i. d. R. einen Umschulungsvertrag mit dem Träger und einen Praktikumsvertrag mit dem Betrieb, keinen Ausbildungsvertrag. Die Dauer ist meist auf ca. 2/3 verkürzt."
    }),
    Q({
      id: "wiso-ausbildung-015", type: "order", difficulty: 2, points: 4,
      question: "Bringen Sie die Stationen eines Ausbildungsverhältnisses (FIAE) in die richtige zeitliche Reihenfolge.",
      items: [
        "Abschluss des Berufsausbildungsvertrags",
        "Eintragung in das Verzeichnis der Berufsausbildungsverhältnisse bei der IHK",
        "Ende der Probezeit",
        "Teil 1 der gestreckten Abschlussprüfung",
        "Zulassung zu Teil 2 (u. a. Vorlage des Ausbildungsnachweises)",
        "Schriftliche Prüfungen Teil 2 und Durchführung der Projektarbeit",
        "Projektpräsentation und Fachgespräch",
        "Bekanntgabe des Bestehens durch den Prüfungsausschuss – Ende der Ausbildung"
      ],
      solution: "Vertrag → Eintragung (§§ 34–36 BBiG) → Probezeit (max. 4 Monate) → Teil 1 (etwa nach der Hälfte) → Zulassung Teil 2 (§ 43) → schriftliche Prüfung/Projekt → Präsentation/Fachgespräch → Bekanntgabe = Ende (§ 21 Abs. 2)."
    }),
    Q({
      id: "wiso-ausbildung-016", type: "text", difficulty: 2, points: 5,
      context: "Ihr Kollege Ali hat die Ausbildung zum FIAE abgeschlossen und überlegt, sich weiterzubilden.",
      question: "Erläutern Sie den Unterschied zwischen einer <b>Anpassungsfortbildung</b> und einer <b>Aufstiegsfortbildung</b>, nennen Sie je ein Beispiel und eine staatliche Fördermöglichkeit für die Aufstiegsfortbildung.",
      solution: "<ul><li><b>Anpassungsfortbildung</b>: erhält und aktualisiert die beruflichen Kenntnisse im bisherigen Beruf, ohne höheren Abschluss (z. B. Kurs zu einem neuen Framework, Cloud-Zertifizierung, Scrum-Schulung).</li><li><b>Aufstiegsfortbildung</b> (§ 53 BBiG): führt zu einem höherqualifizierenden Abschluss mit öffentlich-rechtlicher Prüfung (IHK) und ermöglicht den beruflichen Aufstieg, z. B. <b>Geprüfter Berufsspezialist</b>, <b>Bachelor Professional in IT</b> (Operative Professional), <b>Master Professional</b>.</li><li>Förderung: <b>Aufstiegs-BAföG (AFBG)</b> – Zuschuss und zinsgünstiges Darlehen für Lehrgangs- und Prüfungsgebühren, Teilerlass bei Bestehen; ggf. Unterhaltsbeitrag bei Vollzeit. Alternativ: Weiterbildungsstipendium, Bildungsurlaub (BW: Bildungszeitgesetz).</li></ul>",
      keywords: ["anpassung", "aufstieg", "abschluss|qualifikation", "bachelor professional|berufsspezialist|master professional|fachwirt", "aufstiegs-bafög|afbg|aufstiegsbafög", "prüfung|ihk"],
      explanation: "Wichtig: Aufstiegsfortbildung = höherer, anerkannter Abschluss (DQR 5–7)."
    })
  );
})();

// ---------------------------------------------------------------------------
// Fragen: wiso-arbeitsrecht
// ---------------------------------------------------------------------------
(function () {
  const Q = (o) => Object.assign({ part: "WISO", topic: "wiso-arbeitsrecht" }, o);
  const CTX = "Sie arbeiten in der Personalabteilung der <b>InnoSoft GmbH</b> in Karlsruhe (85 Mitarbeitende, Betriebsrat vorhanden, keine Tarifbindung). In den Arbeitsverträgen ist zu den Kündigungsfristen nur auf die gesetzlichen Regelungen verwiesen.";
  AP2.questions.push(
    Q({
      id: "wiso-arbeitsrecht-001", type: "mc", difficulty: 2, points: 3,
      context: CTX + " Die Softwareentwicklerin Frau Kraus ist seit 3 Jahren im Unternehmen und möchte selbst kündigen, um zu einem anderen Arbeitgeber zu wechseln.",
      question: "Welche Kündigungsfrist muss Frau Kraus einhalten?",
      options: [
        "1 Monat zum Ende eines Kalendermonats",
        "4 Wochen zum 15. oder zum Ende eines Kalendermonats",
        "2 Wochen zu jedem beliebigen Tag",
        "3 Monate zum Quartalsende",
        "6 Wochen zum Quartalsende"
      ],
      correct: [1],
      solution: "Für Kündigungen durch den <b>Arbeitnehmer</b> gilt die Grundkündigungsfrist des <b>§ 622 Abs. 1 BGB</b>: <b>4 Wochen zum 15. oder zum Ende eines Kalendermonats</b>.",
      explanation: "Falle: Die nach Betriebszugehörigkeit verlängerten Fristen (§ 622 Abs. 2) gelten nur für Kündigungen durch den <b>Arbeitgeber</b> – „1 Monat zum Monatsende“ wäre die AG-Frist nach 2 Jahren."
    }),
    Q({
      id: "wiso-arbeitsrecht-002", type: "mc", difficulty: 2, points: 3,
      context: CTX + " Die InnoSoft GmbH möchte dem Mitarbeiter Herrn Lorenz, der seit 9 Jahren im Unternehmen beschäftigt ist, betriebsbedingt ordentlich kündigen.",
      question: "Welche gesetzliche Kündigungsfrist muss die InnoSoft GmbH einhalten?",
      options: [
        "4 Wochen zum 15. oder zum Monatsende",
        "2 Monate zum Ende eines Kalendermonats",
        "3 Monate zum Ende eines Kalendermonats",
        "4 Monate zum Ende eines Kalendermonats",
        "3 Monate zum Quartalsende"
      ],
      correct: [2],
      solution: "§ 622 Abs. 2 BGB: Betriebszugehörigkeit von <b>8 Jahren</b> → <b>3 Monate zum Ende eines Kalendermonats</b> (2 J. → 1 Monat, 5 J. → 2, 8 J. → 3, 10 J. → 4, 12 J. → 5, 15 J. → 6, 20 J. → 7 Monate).",
      explanation: "Außerdem nötig: Anhörung des Betriebsrats (§ 102 BetrVG), soziale Rechtfertigung inkl. Sozialauswahl (KSchG gilt: &gt; 10 AN, &gt; 6 Monate), Schriftform."
    }),
    Q({
      id: "wiso-arbeitsrecht-003", type: "mc", difficulty: 1, points: 2,
      context: CTX + " Ein Teamleiter hat einem Mitarbeiter die Kündigung per E-Mail mit eingescannter Unterschrift geschickt.",
      question: "Wie ist diese Kündigung zu beurteilen?",
      options: [
        "Wirksam, weil die E-Mail eine Unterschrift enthält.",
        "Wirksam, sobald der Mitarbeiter die E-Mail gelesen hat.",
        "Unwirksam, weil Kündigungen nach § 623 BGB der Schriftform bedürfen; die elektronische Form ist ausgeschlossen.",
        "Unwirksam, weil nur der Geschäftsführer Kündigungen per E-Mail versenden darf.",
        "Wirksam, wenn der Betriebsrat zustimmt."
      ],
      correct: [2],
      solution: "<b>§ 623 BGB</b>: Die Beendigung von Arbeitsverhältnissen durch Kündigung oder Auflösungsvertrag bedarf der <b>Schriftform</b> (Original mit eigenhändiger Unterschrift); die <b>elektronische Form ist ausgeschlossen</b>. Eine E-Mail, ein Fax oder eine Messenger-Nachricht genügen nicht → Kündigung nichtig (§ 125 BGB).",
      explanation: "Auch die Befristungsabrede (§ 14 Abs. 4 TzBfG) und das Ausbildungsverhältnis (§ 22 BBiG) verlangen eine schriftliche Kündigung."
    }),
    Q({
      id: "wiso-arbeitsrecht-004", type: "mc", difficulty: 2, points: 3,
      context: "Die Webagentur PixelWerk in Bruchsal beschäftigt 8 Vollzeitkräfte. Sie kündigt dem seit 4 Jahren beschäftigten Mitarbeiter Kevin fristgerecht, ohne einen Grund zu nennen.",
      question: "Welche Aussage ist richtig?",
      options: [
        "Die Kündigung ist unwirksam, da sie nicht sozial gerechtfertigt ist.",
        "Das Kündigungsschutzgesetz findet keine Anwendung, da der Betrieb nicht mehr als 10 Arbeitnehmer beschäftigt; die Kündigung braucht keinen Grund nach dem KSchG.",
        "Die Kündigung ist unwirksam, weil sie immer begründet werden muss.",
        "Das KSchG gilt, da Kevin länger als 6 Monate beschäftigt ist.",
        "Die Kündigung bedarf der Zustimmung der Agentur für Arbeit."
      ],
      correct: [1],
      solution: "Der allgemeine Kündigungsschutz gilt nur, wenn der Betrieb <b>mehr als 10 Arbeitnehmer</b> beschäftigt (§ 23 KSchG) <b>und</b> das Arbeitsverhältnis <b>länger als 6 Monate</b> besteht (§ 1 KSchG). Bei 8 AN ist der „Kleinbetrieb“ ausgenommen; einzuhalten sind aber Schriftform, Kündigungsfrist (§ 622: 4 J. → 1 Monat zum Monatsende) und ein Mindestmaß an Rücksichtnahme (kein Verstoß gegen Treu und Glauben/AGG).",
      explanation: "Beide KSchG-Voraussetzungen müssen gleichzeitig vorliegen."
    }),
    Q({
      id: "wiso-arbeitsrecht-005", type: "mc", difficulty: 1, points: 2,
      context: CTX + " Ein Mitarbeiter hat am 05.11.2026 eine ordentliche, aus seiner Sicht ungerechtfertigte Kündigung erhalten.",
      question: "Innerhalb welcher Frist muss er Kündigungsschutzklage erheben?",
      options: [
        "Innerhalb von 1 Woche nach Zugang beim Betriebsrat",
        "Innerhalb von 2 Wochen nach Zugang beim Sozialgericht",
        "Innerhalb von 3 Wochen nach Zugang beim Arbeitsgericht",
        "Innerhalb von 4 Wochen nach Ablauf der Kündigungsfrist beim Arbeitsgericht",
        "Innerhalb von 3 Monaten beim Landesarbeitsgericht"
      ],
      correct: [2],
      solution: "<b>§ 4 KSchG</b>: Klage beim <b>Arbeitsgericht</b> innerhalb von <b>3 Wochen nach Zugang</b> der schriftlichen Kündigung. Versäumt er die Frist, gilt die Kündigung als von Anfang an rechtswirksam (§ 7 KSchG).",
      explanation: "Der Betriebsrat kann innerhalb einer Woche Einspruch beim AG einlegen (§ 3 KSchG) – das ersetzt die Klage nicht."
    }),
    Q({
      id: "wiso-arbeitsrecht-006", type: "mc", difficulty: 2, points: 3,
      context: CTX + " Herr Kaya wurde am 01.01.2025 sachgrundlos für 6 Monate eingestellt. Der Vertrag wurde jeweils rechtzeitig schriftlich zum 01.07.2025, 01.01.2026 und 01.07.2026 um je 6 Monate verlängert. Jetzt soll er erneut befristet bis 31.03.2027 verlängert werden.",
      question: "Wie ist die geplante weitere Verlängerung zu beurteilen?",
      options: [
        "Zulässig, da die Gesamtdauer von 2 Jahren nicht überschritten wird.",
        "Zulässig, da es sich nur um 3 Monate handelt.",
        "Unzulässig, da bereits drei Verlängerungen erfolgt sind; ohne Sachgrund ist nur noch ein unbefristeter Vertrag möglich.",
        "Unzulässig, da sachgrundlose Befristungen höchstens 1 Jahr dauern dürfen.",
        "Zulässig, wenn der Betriebsrat zustimmt."
      ],
      correct: [2],
      solution: "<b>§ 14 Abs. 2 TzBfG</b>: Sachgrundlose Befristung bis zu <b>2 Jahren</b>, innerhalb dieser Gesamtdauer <b>höchstens dreimalige Verlängerung</b>. Hier: Erstvertrag + 3 Verlängerungen (bis 31.12.2026 = genau 2 Jahre). Eine vierte Verlängerung (die zudem die 2 Jahre überschreiten würde) ist unzulässig – eine unwirksame Befristung führt zu einem <b>unbefristeten</b> Arbeitsverhältnis (§ 16 TzBfG).",
      explanation: "Möglich wäre nur eine Befristung mit Sachgrund (§ 14 Abs. 1, z. B. Vertretung)."
    }),
    Q({
      id: "wiso-arbeitsrecht-007", type: "mc", difficulty: 1, points: 2,
      context: "Der Entwickler Max arbeitet wegen eines Release-Termins von 08:00 Uhr bis 18:00 Uhr und hat dabei eine reine Arbeitszeit von 9 Stunden 15 Minuten.",
      question: "Welche Ruhepause steht ihm nach dem Arbeitszeitgesetz mindestens zu?",
      options: ["15 Minuten", "30 Minuten", "45 Minuten", "60 Minuten", "Keine, da Pausen frei vereinbart werden"],
      correct: [2],
      solution: "<b>§ 4 ArbZG</b>: bei mehr als 6 bis 9 Stunden mind. 30 Minuten, bei <b>mehr als 9 Stunden mind. 45 Minuten</b>, aufteilbar in Abschnitte von mind. 15 Minuten. Länger als 6 Stunden hintereinander darf nicht ohne Pause gearbeitet werden.",
      explanation: "Kontrolle: 9 h 15 min Arbeit + 45 min Pause = 10 h Anwesenheit (08–18 Uhr) – passt."
    }),
    Q({
      id: "wiso-arbeitsrecht-008", type: "numeric", difficulty: 2, points: 3,
      context: "Frau Yilmaz arbeitet in Teilzeit an 4 Tagen pro Woche.",
      question: "Wie viele Arbeitstage beträgt ihr <b>gesetzlicher Mindesturlaub</b> nach dem Bundesurlaubsgesetz?",
      answer: 16, tolerance: 0, unit: "Arbeitstage",
      solution: "§ 3 BUrlG: 24 Werktage bei 6-Tage-Woche. Umrechnung: 24 · 4 ÷ 6 = <b>16 Arbeitstage</b> (entspricht 4 Wochen Urlaub).",
      explanation: "Bei der 5-Tage-Woche sind es 20 Arbeitstage. Teilzeitkräfte haben also ebenfalls 4 Wochen Erholungsurlaub."
    }),
    Q({
      id: "wiso-arbeitsrecht-009", type: "numeric", difficulty: 2, points: 3,
      context: CTX + " Der neue Mitarbeiter Herr Brandt beginnt am 01.09.2026. Sein Vertrag sieht 30 Urlaubstage pro Kalenderjahr vor (5-Tage-Woche).",
      question: "Wie viele Urlaubstage stehen Herrn Brandt für das Jahr 2026 zu?",
      answer: 10, tolerance: 0, unit: "Tage",
      solution: "Die Wartezeit von 6 Monaten (§ 4 BUrlG) kann 2026 nicht mehr erfüllt werden → <b>Teilurlaub</b> (§ 5 Abs. 1 a BUrlG): 1/12 des Jahresurlaubs je vollem Beschäftigungsmonat.<br>September–Dezember = 4 volle Monate: 30 ÷ 12 · 4 = <b>10 Tage</b>.",
      explanation: "Bruchteile von mind. einem halben Tag werden auf volle Tage aufgerundet (§ 5 Abs. 2)."
    }),
    Q({
      id: "wiso-arbeitsrecht-010", type: "numeric", difficulty: 1, points: 2,
      question: "Wie viele Stunden darf ein volljähriger Arbeitnehmer nach dem Arbeitszeitgesetz in einer Kalenderwoche (Montag bis Samstag) <b>höchstens</b> arbeiten, wenn ein Ausgleich auf durchschnittlich 8 Stunden werktäglich erfolgt?",
      answer: 60, tolerance: 0, unit: "Stunden",
      solution: "§ 3 ArbZG: werktäglich 8 h, verlängerbar auf <b>10 h</b> bei Ausgleich innerhalb von 6 Kalendermonaten bzw. 24 Wochen. Werktage = Montag bis Samstag: 6 · 10 h = <b>60 Stunden</b> (regulär 6 · 8 h = 48 h).",
      explanation: "Werktage ≠ Arbeitstage: Der Samstag zählt im ArbZG und BUrlG als Werktag."
    }),
    Q({
      id: "wiso-arbeitsrecht-011", type: "numeric", difficulty: 1, points: 2,
      context: "Ihr Kollege Paul wird Vater und möchte direkt nach der Geburt seines Kindes Elternzeit nehmen.",
      question: "Wie viele Wochen vor Beginn muss er die Elternzeit (für die Zeit bis zum 3. Geburtstag) spätestens schriftlich beim Arbeitgeber verlangen?",
      answer: 7, tolerance: 0, unit: "Wochen",
      solution: "<b>§ 16 Abs. 1 BEEG</b>: spätestens <b>7 Wochen</b> vor Beginn (für Elternzeit zwischen dem 3. und 8. Geburtstag: 13 Wochen). Ab dem Verlangen (frühestens 8 Wochen vor Beginn) besteht besonderer Kündigungsschutz (§ 18 BEEG).",
      explanation: "Elternzeit ist ein Anspruch gegenüber dem Arbeitgeber (unbezahlte Freistellung), Elterngeld eine staatliche Leistung (Elterngeldstelle)."
    }),
    Q({
      id: "wiso-arbeitsrecht-012", type: "multi", difficulty: 2, points: 4,
      context: CTX + " Wegen eines Auftragsrückgangs sollen mehreren Personen ordentlich gekündigt werden.",
      question: "Welche <b>zwei</b> Personen genießen einen <b>besonderen</b> Kündigungsschutz?",
      options: [
        "Frau Schmid, die dem Arbeitgeber ihre Schwangerschaft mitgeteilt hat",
        "Herr Wolf, 58 Jahre alt und seit 25 Jahren im Betrieb",
        "Herr Dietrich, Mitglied des Betriebsrats",
        "Frau Klein, die in Teilzeit 20 Stunden pro Woche arbeitet",
        "Herr Neumann, der sich noch in der sechsmonatigen Probezeit befindet"
      ],
      correct: [0, 2],
      solution: "<b>Schwangere</b>: Kündigungsverbot während der Schwangerschaft bis 4 Monate nach der Entbindung (§ 17 MuSchG), Ausnahme nur mit Zustimmung der Aufsichtsbehörde. <b>Betriebsratsmitglieder</b>: ordentliche Kündigung ausgeschlossen, außerordentliche nur mit Zustimmung des BR (§ 15 KSchG, § 103 BetrVG).",
      explanation: "Alter und lange Betriebszugehörigkeit sind Kriterien der Sozialauswahl (allgemeiner Kündigungsschutz) und verlängern die Kündigungsfrist – sie begründen keinen <i>besonderen</i> Kündigungsschutz."
    }),
    Q({
      id: "wiso-arbeitsrecht-013", type: "multi", difficulty: 2, points: 3,
      context: "Die Umschülerin Lena verlässt nach ihrer Prüfung die InnoSoft GmbH und bittet um ein Arbeitszeugnis.",
      question: "Welche <b>zwei</b> Aussagen zum Arbeitszeugnis sind richtig?",
      options: [
        "Ein einfaches Zeugnis enthält Angaben zur Art und Dauer der Tätigkeit.",
        "Der Arbeitgeber muss im Zeugnis stets den Kündigungsgrund angeben.",
        "Ein qualifiziertes Zeugnis enthält zusätzlich Aussagen zu Leistung und Verhalten und wird auf Verlangen erteilt.",
        "Ein Anspruch auf ein Zeugnis besteht erst nach mindestens einem Jahr Beschäftigung.",
        "Das Zeugnis darf negative Formulierungen enthalten, solange sie offen formuliert sind."
      ],
      correct: [0, 2],
      solution: "<b>§ 109 GewO</b> (für Azubis § 16 BBiG): einfaches Zeugnis = Art und Dauer; auf Verlangen <b>qualifiziertes Zeugnis</b> mit Leistung und Verhalten. Grundsätze: <b>Wahrheit</b> und <b>Wohlwollen</b>, klar und verständlich, keine versteckten Codes.",
      explanation: "Der Anspruch besteht bei jeder Beendigung, unabhängig von der Dauer. Der Kündigungsgrund gehört nur auf Wunsch des AN ins Zeugnis."
    }),
    Q({
      id: "wiso-arbeitsrecht-014", type: "mc", difficulty: 1, points: 2,
      context: "Herr Brenner ist seit dem 05.10.2026 ununterbrochen arbeitsunfähig erkrankt. Er arbeitet seit 3 Jahren bei der InnoSoft GmbH.",
      question: "Welche Aussage zur Entgeltfortzahlung ist richtig?",
      options: [
        "Der Arbeitgeber zahlt das Entgelt für bis zu 6 Wochen weiter; danach zahlt die Krankenkasse Krankengeld.",
        "Der Arbeitgeber zahlt für bis zu 6 Monate; danach zahlt die Rentenversicherung.",
        "Die Krankenkasse zahlt ab dem ersten Krankheitstag Krankengeld.",
        "Der Arbeitgeber zahlt 70 % des Bruttoentgelts für 78 Wochen.",
        "Die Berufsgenossenschaft zahlt ab der 3. Woche Verletztengeld."
      ],
      correct: [0],
      solution: "<b>§ 3 EFZG</b>: Entgeltfortzahlung durch den Arbeitgeber (100 %) für bis zu <b>6 Wochen</b> (nach 4 Wochen Wartezeit). Danach zahlt die <b>Krankenkasse Krankengeld</b> (70 % des Bruttos, max. 90 % des Nettos, wegen derselben Krankheit max. 78 Wochen innerhalb von 3 Jahren).",
      explanation: "Verletztengeld der BG gibt es nur nach Arbeits-/Wegeunfällen und Berufskrankheiten."
    }),
    Q({
      id: "wiso-arbeitsrecht-015", type: "mc", difficulty: 2, points: 3,
      context: "Der Auszubildende Tim (17) hat montags Berufsschule mit 6 Unterrichtsstunden à 45 Minuten (08:00–13:15 Uhr). Sein Ausbilder möchte, dass er danach noch bis 16:00 Uhr im Betrieb arbeitet. Es ist der einzige Berufsschultag der Woche.",
      question: "Wie ist die Anweisung des Ausbilders zu beurteilen?",
      options: [
        "Zulässig, da Tim an diesem Tag noch keine 8 Stunden gearbeitet hat.",
        "Zulässig, wenn Tim eine Pause von 60 Minuten erhält.",
        "Unzulässig, da Tim an einem Berufsschultag mit mehr als fünf Unterrichtsstunden (einmal pro Woche) nicht mehr beschäftigt werden darf.",
        "Unzulässig, da Jugendliche nach 12:00 Uhr nicht beschäftigt werden dürfen.",
        "Zulässig, wenn die Eltern zustimmen."
      ],
      correct: [2],
      solution: "<b>§ 9 Abs. 1 Nr. 2 JArbSchG</b>: Jugendliche dürfen an einem Berufsschultag mit <b>mehr als fünf Unterrichtsstunden von mindestens je 45 Minuten</b> – einmal in der Woche – nicht beschäftigt werden; der Tag wird mit 8 Stunden auf die Arbeitszeit angerechnet. (Seit 2020 gilt die Freistellung nach § 15 BBiG ebenso für volljährige Azubis.)",
      explanation: "Ein zweiter langer Berufsschultag in derselben Woche wäre nur mit der tatsächlichen Unterrichtszeit inkl. Pausen anzurechnen."
    }),
    Q({
      id: "wiso-arbeitsrecht-016", type: "mc", difficulty: 1, points: 2,
      context: "Die InnoSoft GmbH entwirft eine Stellenanzeige: „Wir suchen einen jungen, dynamischen Entwickler (max. 30 Jahre) für unser Team.“",
      question: "Gegen welches Gesetz verstößt diese Formulierung?",
      options: [
        "Nachweisgesetz",
        "Allgemeines Gleichbehandlungsgesetz (AGG)",
        "Teilzeit- und Befristungsgesetz",
        "Betriebsverfassungsgesetz",
        "Arbeitszeitgesetz"
      ],
      correct: [1],
      solution: "Die Anzeige benachteiligt wegen des <b>Alters</b> und (durch „Entwickler“ ohne m/w/d) wegen des <b>Geschlechts</b> – Verstoß gegen § 11 i. V. m. §§ 1, 7 <b>AGG</b>. Abgelehnte Bewerber können Entschädigung verlangen (§ 15 AGG; Geltendmachung binnen 2 Monaten, bei Nichteinstellung bis zu 3 Monatsgehälter, wenn sie auch bei benachteiligungsfreier Auswahl nicht eingestellt worden wären).",
      explanation: "Geschützte Merkmale: ethnische Herkunft, Geschlecht, Religion/Weltanschauung, Behinderung, Alter, sexuelle Identität."
    }),
    Q({
      id: "wiso-arbeitsrecht-017", type: "mc", difficulty: 2, points: 2,
      context: CTX + " Eine neue Mitarbeiterin beginnt am Montag. Bisher gibt es nur eine mündliche Einigung über die Einstellung.",
      question: "Welche Aussage entspricht dem Nachweisgesetz?",
      options: [
        "Ohne schriftlichen Vertrag ist das Arbeitsverhältnis unwirksam.",
        "Der Nachweis der wesentlichen Arbeitsbedingungen muss erst nach Ablauf der Probezeit erfolgen.",
        "Der Arbeitsvertrag muss notariell beurkundet werden.",
        "Spätestens am ersten Arbeitstag sind u. a. Name der Parteien, Zusammensetzung und Höhe des Entgelts sowie die Arbeitszeit schriftlich nachzuweisen.",
        "Das Nachweisgesetz gilt nur für befristete Arbeitsverhältnisse."
      ],
      correct: [3],
      solution: "Der Arbeitsvertrag ist formfrei wirksam. Nach dem <b>Nachweisgesetz</b> (§ 2 NachwG) muss der AG die wesentlichen Vertragsbedingungen nachweisen: <b>Name/Anschrift der Parteien, Entgelt, Arbeitszeit spätestens am 1. Arbeitstag</b>, weitere Angaben (Beginn, Befristung, Arbeitsort, Tätigkeit, Urlaub …) innerhalb von 7 Tagen bzw. 1 Monat.",
      explanation: "Verstöße sind Ordnungswidrigkeiten (Bußgeld), machen den Vertrag aber nicht unwirksam."
    }),
    Q({
      id: "wiso-arbeitsrecht-018", type: "order", difficulty: 2, points: 4,
      context: CTX + " Ein Mitarbeiter kommt wiederholt unentschuldigt zu spät. Die Personalabteilung prüft eine verhaltensbedingte Kündigung.",
      question: "Bringen Sie die Schritte in die richtige Reihenfolge.",
      items: [
        "Pflichtverstoß (Verspätung) dokumentieren",
        "Schriftliche Abmahnung mit Androhung arbeitsrechtlicher Konsequenzen",
        "Erneuter gleichartiger Pflichtverstoß",
        "Anhörung des Betriebsrats nach § 102 BetrVG",
        "Übergabe der schriftlichen Kündigung unter Einhaltung der Kündigungsfrist",
        "Mitarbeiter kann innerhalb von 3 Wochen Kündigungsschutzklage erheben"
      ],
      solution: "Verhaltensbedingte Kündigung setzt i. d. R. eine einschlägige <b>Abmahnung</b> voraus (Hinweis-, Rüge-, Warnfunktion). Vor Ausspruch muss der <b>Betriebsrat angehört</b> werden (Bedenken binnen 1 Woche), danach Kündigung in Schriftform (§ 623 BGB); Klagefrist 3 Wochen ab Zugang (§ 4 KSchG)."
    }),
    Q({
      id: "wiso-arbeitsrecht-019", type: "mc", difficulty: 1, points: 2,
      context: "Ihre Kollegin Frau Hoffmann erwartet ein Kind. Der errechnete Geburtstermin ist der 15.03.2027.",
      question: "Welche Schutzfristen gelten nach dem Mutterschutzgesetz im Regelfall?",
      options: [
        "4 Wochen vor und 4 Wochen nach der Entbindung",
        "6 Wochen vor und 8 Wochen nach der Entbindung",
        "8 Wochen vor und 6 Wochen nach der Entbindung",
        "6 Wochen vor und 12 Wochen nach der Entbindung",
        "Nur 8 Wochen nach der Entbindung"
      ],
      correct: [1],
      solution: "<b>§ 3 MuSchG</b>: <b>6 Wochen vor</b> der Entbindung (Beschäftigung nur, wenn die Frau es ausdrücklich verlangt) und <b>8 Wochen nach</b> der Entbindung (absolutes Beschäftigungsverbot), bei Früh-/Mehrlingsgeburten oder Behinderung des Kindes 12 Wochen.",
      explanation: "In dieser Zeit erhält sie Mutterschaftsgeld der Krankenkasse plus Arbeitgeberzuschuss bis zum Nettoentgelt."
    }),
    Q({
      id: "wiso-arbeitsrecht-020", type: "text", difficulty: 2, points: 6,
      context: CTX + " Ein Mitarbeiter wurde dabei erwischt, wie er Quellcode und Kundendaten auf einen privaten USB-Stick kopiert und an einen Konkurrenten weitergegeben hat. Die Geschäftsführung erfährt davon am 02.11.2026.",
      question: "Erläutern Sie den Unterschied zwischen einer <b>ordentlichen</b> und einer <b>außerordentlichen</b> Kündigung und nennen Sie die Frist, innerhalb derer die InnoSoft GmbH im vorliegenden Fall außerordentlich kündigen muss.",
      solution: "<ul><li><b>Ordentliche Kündigung</b>: unter Einhaltung der gesetzlichen (§ 622 BGB), tariflichen oder vertraglichen <b>Kündigungsfrist</b>; im Geltungsbereich des KSchG muss sie sozial gerechtfertigt sein (personen-, verhaltens-, betriebsbedingt).</li><li><b>Außerordentliche (meist fristlose) Kündigung</b> (§ 626 BGB): ohne Einhaltung einer Frist aus <b>wichtigem Grund</b>, wenn die Fortsetzung bis zum Ablauf der Kündigungsfrist unzumutbar ist (Interessenabwägung) – hier Verrat von Betriebsgeheimnissen/Datenschutzverstoß; eine Abmahnung ist bei so schweren Vertrauensbrüchen entbehrlich.</li><li><b>Frist</b>: Die Kündigung muss <b>innerhalb von 2 Wochen ab Kenntnis</b> der maßgeblichen Tatsachen erklärt werden (§ 626 Abs. 2 BGB) → spätestens am 16.11.2026 zugehen.</li><li>Beide: Schriftform (§ 623 BGB), vorherige Anhörung des Betriebsrats (§ 102 BetrVG; bei außerordentlicher Kündigung Bedenken binnen 3 Tagen).</li></ul>",
      keywords: ["kündigungsfrist|frist", "wichtiger grund|wichtigen grund", "§ 626|626", "2 wochen|zwei wochen", "kenntnis", "unzumutbar|unzumutbarkeit", "schriftform|schriftlich", "betriebsrat|§ 102"],
      explanation: "Typischer Fehler: Die 2-Wochen-Frist ist keine Kündigungsfrist, sondern eine Erklärungsfrist für den Arbeitgeber."
    })
  );
})();

// ---------------------------------------------------------------------------
// Fragen: wiso-tarif-mitbestimmung
// ---------------------------------------------------------------------------
(function () {
  const Q = (o) => Object.assign({ part: "WISO", topic: "wiso-tarif-mitbestimmung" }, o);
  const CTX = "Die <b>InnoSoft GmbH</b> in Karlsruhe beschäftigt 85 Arbeitnehmer (davon 80 wahlberechtigt, 4 Auszubildende unter 18 Jahren). Es besteht ein Betriebsrat.";
  AP2.questions.push(
    Q({
      id: "wiso-tarif-mitbestimmung-001", type: "mc", difficulty: 1, points: 2,
      question: "Auf welcher Rechtsgrundlage beruht die <b>Tarifautonomie</b> in Deutschland?",
      options: [
        "Art. 1 GG (Menschenwürde)",
        "Art. 9 Abs. 3 GG (Koalitionsfreiheit)",
        "Art. 12 GG (Berufsfreiheit)",
        "§ 87 Betriebsverfassungsgesetz",
        "§ 611a BGB (Arbeitsvertrag)"
      ],
      correct: [1],
      solution: "<b>Art. 9 Abs. 3 GG</b> garantiert das Recht, zur Wahrung und Förderung der Arbeits- und Wirtschaftsbedingungen Vereinigungen zu bilden (Koalitionsfreiheit). Daraus folgt die <b>Tarifautonomie</b>: Gewerkschaften und Arbeitgeber(verbände) handeln Tarifverträge ohne staatliche Einmischung aus; Details regelt das <b>Tarifvertragsgesetz</b>.",
      explanation: "Art. 12 GG (Berufsfreiheit) ist ein häufiger Distraktor."
    }),
    Q({
      id: "wiso-tarif-mitbestimmung-002", type: "mc", difficulty: 1, points: 2,
      question: "Welcher Inhalt wird typischerweise in einem <b>Manteltarifvertrag</b> geregelt?",
      options: [
        "Die konkrete Höhe der Monatsgehälter je Entgeltgruppe",
        "Die wöchentliche Arbeitszeit, Urlaubsdauer und Zuschläge für Nachtarbeit",
        "Die Wahl des Betriebsrats",
        "Der Verkaufspreis der Produkte",
        "Die Beitragssätze zur Sozialversicherung"
      ],
      correct: [1],
      solution: "Der <b>Manteltarifvertrag</b> (Rahmentarifvertrag) regelt allgemeine Arbeitsbedingungen mit längerer Laufzeit: Arbeitszeit, Urlaub, Zuschläge, Kündigungsfristen, Probezeit. Die <b>Höhe</b> der Entgelte steht im <b>Lohn-/Gehalts- bzw. Entgelttarifvertrag</b> (kurze Laufzeit), die Eingruppierungsmerkmale im Entgeltrahmentarifvertrag.",
      explanation: "SV-Beitragssätze sind gesetzlich geregelt, die BR-Wahl im BetrVG."
    }),
    Q({
      id: "wiso-tarif-mitbestimmung-003", type: "mc", difficulty: 2, points: 3,
      context: "Die tarifgebundene DataNet AG (Mitglied im Arbeitgeberverband) beschäftigt die Gewerkschaftsmitglieder Herrn Ott und Frau Reiter. Der Tarifvertrag sieht 30 Urlaubstage vor. Herrn Otts Arbeitsvertrag sieht 28 Urlaubstage vor, der Arbeitsvertrag von Frau Reiter 32 Urlaubstage.",
      question: "Wie viele Urlaubstage stehen den beiden zu?",
      options: [
        "Beide 30 Tage, da der Tarifvertrag immer gilt",
        "Herr Ott 28 Tage, Frau Reiter 32 Tage, da der Arbeitsvertrag Vorrang hat",
        "Herr Ott 30 Tage, Frau Reiter 32 Tage",
        "Beide 24 Werktage nach dem Bundesurlaubsgesetz",
        "Herr Ott 30 Tage, Frau Reiter 30 Tage, da höhere Ansprüche gekürzt werden"
      ],
      correct: [2],
      solution: "Der Tarifvertrag gilt bei beiderseitiger Tarifbindung unmittelbar und zwingend (§ 4 Abs. 1 TVG) als <b>Mindeststandard</b>. Abweichungen sind nur zugunsten des Arbeitnehmers zulässig – <b>Günstigkeitsprinzip</b> (§ 4 Abs. 3 TVG). Herr Ott erhält daher 30 Tage, Frau Reiter ihre günstigeren 32 Tage.",
      explanation: "Rangfolge: Gesetz &gt; Tarifvertrag &gt; Betriebsvereinbarung &gt; Arbeitsvertrag – die niedrigere Stufe darf nur besser sein."
    }),
    Q({
      id: "wiso-tarif-mitbestimmung-004", type: "mc", difficulty: 1, points: 2,
      question: "Was versteht man unter der <b>Friedenspflicht</b>?",
      options: [
        "Die Pflicht der Arbeitnehmer, im Betrieb Konflikte zu vermeiden",
        "Das Verbot, während der Laufzeit eines Tarifvertrags wegen der darin geregelten Inhalte Arbeitskämpfe zu führen",
        "Die Pflicht des Betriebsrats, Streiks zu organisieren",
        "Das Verbot von Aussperrungen in Kleinbetrieben",
        "Die Pflicht der Schlichter, eine Einigung herbeizuführen"
      ],
      correct: [1],
      solution: "Während der <b>Laufzeit</b> eines Tarifvertrags dürfen die Tarifparteien über die darin geregelten Gegenstände <b>keine Arbeitskampfmaßnahmen</b> (Streik, Aussperrung) durchführen. Erst nach Ablauf/Kündigung sind z. B. Warnstreiks zulässig.",
      explanation: "Auch zwischen Betriebsrat und Arbeitgeber gilt eine betriebliche Friedenspflicht (§ 74 Abs. 2 BetrVG) – Arbeitskampf auf Betriebsebene ist verboten."
    }),
    Q({
      id: "wiso-tarif-mitbestimmung-005", type: "mc", difficulty: 2, points: 2,
      question: "Welche Zustimmung ist bei einer gewerkschaftlichen <b>Urabstimmung</b> üblicherweise erforderlich, damit ein unbefristeter Streik beginnen kann?",
      options: [
        "Mehr als 50 % aller Beschäftigten der Branche",
        "Mindestens 75 % der abstimmenden bzw. stimmberechtigten Gewerkschaftsmitglieder",
        "Mindestens 25 % der Gewerkschaftsmitglieder",
        "Die Zustimmung des Betriebsrats",
        "Ein Beschluss des Arbeitsgerichts"
      ],
      correct: [1],
      solution: "Nach den Satzungen der großen DGB-Gewerkschaften müssen in der Urabstimmung mindestens <b>75 %</b> der Mitglieder für den Streik stimmen. Für die Annahme eines Verhandlungsergebnisses (Streikende) genügen in der zweiten Urabstimmung meist <b>25 %</b>.",
      explanation: "Der Betriebsrat ist nicht Tarifpartei und darf keinen Streik organisieren."
    }),
    Q({
      id: "wiso-tarif-mitbestimmung-006", type: "order", difficulty: 2, points: 4,
      question: "Bringen Sie die Schritte einer Tarifauseinandersetzung bis zum neuen Tarifvertrag in die übliche Reihenfolge.",
      items: [
        "Kündigung des bestehenden Entgelttarifvertrags und Forderung der Gewerkschaft",
        "Tarifverhandlungen, begleitet von Warnstreiks",
        "Scheitern der Verhandlungen und erfolglose Schlichtung",
        "Urabstimmung über einen Streik (mind. 75 % Zustimmung)",
        "Streik, ggf. Aussperrung durch die Arbeitgeber",
        "Erneute Verhandlungen und Einigung",
        "Zweite Urabstimmung über das Ergebnis (mind. 25 % Zustimmung) und Abschluss des neuen Tarifvertrags"
      ],
      solution: "Kündigung/Forderung → Verhandlungen (nach Ende der Friedenspflicht Warnstreiks möglich) → Scheitern und Schlichtung → Urabstimmung 75 % → Arbeitskampf → neue Verhandlungen/Einigung → Urabstimmung 25 % → neuer Tarifvertrag mit neuer Friedenspflicht."
    }),
    Q({
      id: "wiso-tarif-mitbestimmung-007", type: "mc", difficulty: 1, points: 2,
      context: "Die Mitarbeitenden eines Start-ups möchten einen Betriebsrat gründen.",
      question: "Ab welcher Betriebsgröße kann nach dem BetrVG ein Betriebsrat gewählt werden?",
      options: [
        "Ab 5 ständigen wahlberechtigten Arbeitnehmern, von denen 3 wählbar sind",
        "Ab 10 Arbeitnehmern",
        "Ab 20 Arbeitnehmern",
        "Ab 3 Arbeitnehmern, wenn der Arbeitgeber zustimmt",
        "Ab 50 Arbeitnehmern"
      ],
      correct: [0],
      solution: "<b>§ 1 BetrVG</b>: in Betrieben mit in der Regel <b>mindestens fünf ständigen wahlberechtigten Arbeitnehmern</b>, von denen <b>drei wählbar</b> sind. Wahlberechtigt ab 16 Jahren (§ 7), wählbar ab 18 Jahren nach 6 Monaten Betriebszugehörigkeit (§ 8).",
      explanation: "Der Arbeitgeber muss nicht zustimmen; die Behinderung einer BR-Wahl ist sogar strafbar (§ 119 BetrVG)."
    }),
    Q({
      id: "wiso-tarif-mitbestimmung-008", type: "mc", difficulty: 2, points: 3,
      context: CTX + " Die Geschäftsführung will ein neues Ticketsystem einführen, das auswertet, wie viele Tickets jede Entwicklerin und jeder Entwickler pro Stunde bearbeitet.",
      question: "Welches Recht hat der Betriebsrat bei der Einführung dieser Software?",
      options: [
        "Nur ein Informationsrecht nach Einführung",
        "Ein Anhörungsrecht ohne Einfluss auf die Entscheidung",
        "Ein echtes Mitbestimmungsrecht – ohne Zustimmung des Betriebsrats (oder Spruch der Einigungsstelle) darf die Software nicht eingeführt werden",
        "Kein Recht, da es sich um eine Investitionsentscheidung handelt",
        "Ein Vetorecht nur, wenn mehr als 100 Arbeitnehmer betroffen sind"
      ],
      correct: [2],
      solution: "<b>§ 87 Abs. 1 Nr. 6 BetrVG</b>: Mitbestimmung bei Einführung und Anwendung <b>technischer Einrichtungen, die geeignet sind, Verhalten oder Leistung der Arbeitnehmer zu überwachen</b>. Kommt keine Einigung zustande, entscheidet die <b>Einigungsstelle</b> verbindlich. Üblich ist eine Betriebsvereinbarung zur Nutzung.",
      explanation: "Es genügt, dass die Software zur Überwachung <i>geeignet</i> ist – eine Überwachungsabsicht ist nicht erforderlich. Für Entwickler/innen praktisch wichtig bei Logging, Tracking und KI-Tools."
    }),
    Q({
      id: "wiso-tarif-mitbestimmung-009", type: "mc", difficulty: 2, points: 2,
      context: CTX + " Die Personalleiterin kündigt einem Mitarbeiter ordentlich, ohne vorher den Betriebsrat zu informieren.",
      question: "Welche Rechtsfolge hat das?",
      options: [
        "Die Kündigung ist wirksam, der Betriebsrat kann nur nachträglich widersprechen.",
        "Die Kündigung ist unwirksam, weil der Betriebsrat vor jeder Kündigung anzuhören ist.",
        "Die Kündigung ist wirksam, wenn der Mitarbeiter nicht innerhalb von 3 Tagen widerspricht.",
        "Die Kündigung wird erst nach Zustimmung des Arbeitsgerichts wirksam.",
        "Die Kündigung ist wirksam, da der Betriebsrat nur bei Massenentlassungen beteiligt wird."
      ],
      correct: [1],
      solution: "<b>§ 102 Abs. 1 BetrVG</b>: Der Betriebsrat ist <b>vor jeder Kündigung</b> zu hören (Personalien, Art der Kündigung, Gründe). Eine ohne Anhörung ausgesprochene Kündigung ist <b>unwirksam</b>. Bedenken: ordentliche Kündigung binnen 1 Woche, außerordentliche binnen 3 Tagen.",
      explanation: "Anhörung ≠ Zustimmung: Der AG kann auch nach Widerspruch kündigen; ein ordnungsgemäßer Widerspruch begründet aber einen Weiterbeschäftigungsanspruch während des Prozesses."
    }),
    Q({
      id: "wiso-tarif-mitbestimmung-010", type: "multi", difficulty: 2, points: 4,
      context: CTX,
      question: "In welchen <b>zwei</b> Angelegenheiten hat der Betriebsrat ein <b>Mitbestimmungsrecht nach § 87 BetrVG</b>?",
      options: [
        "Festlegung von Beginn und Ende der täglichen Arbeitszeit und der Pausen",
        "Höhe des Gehalts der Geschäftsführerin",
        "Aufstellung des Urlaubsplans und allgemeiner Urlaubsgrundsätze",
        "Festlegung der Verkaufspreise für die Softwarelizenzen",
        "Entscheidung über den Kauf eines neuen Servers"
      ],
      correct: [0, 2],
      solution: "§ 87 Abs. 1 <b>Nr. 2</b> (Beginn/Ende der täglichen Arbeitszeit, Pausen, Verteilung auf die Wochentage) und <b>Nr. 5</b> (allgemeine Urlaubsgrundsätze, Urlaubsplan) BetrVG sind soziale Angelegenheiten mit echter Mitbestimmung.",
      explanation: "Wirtschaftliche Entscheidungen (Preise, Investitionen) bleiben unternehmerische Freiheit; der BR wird höchstens unterrichtet (Wirtschaftsausschuss ab &gt; 100 AN). Geschäftsführer sind keine Arbeitnehmer i. S. d. BetrVG."
    }),
    Q({
      id: "wiso-tarif-mitbestimmung-011", type: "multi", difficulty: 2, points: 3,
      context: CTX + " Die Auszubildenden überlegen, eine Jugend- und Auszubildendenvertretung (JAV) zu wählen.",
      question: "Welche <b>zwei</b> Aussagen zur JAV sind richtig?",
      options: [
        "Eine JAV kann gewählt werden, wenn im Betrieb mindestens 5 Arbeitnehmer unter 18 Jahren oder Auszubildende beschäftigt sind und ein Betriebsrat besteht.",
        "Die JAV kann ohne Betriebsrat direkt mit dem Arbeitgeber Betriebsvereinbarungen abschließen.",
        "Die regelmäßige Amtszeit der JAV beträgt zwei Jahre.",
        "Die Amtszeit der JAV beträgt wie beim Betriebsrat vier Jahre.",
        "In die JAV dürfen nur Auszubildende gewählt werden, die volljährig sind."
      ],
      correct: [0, 2],
      solution: "<b>§ 60 BetrVG</b>: JAV bei mind. 5 jugendlichen AN (unter 18) oder Auszubildenden (klassisch: unter 25), Voraussetzung ist ein bestehender Betriebsrat. <b>§ 64</b>: Amtszeit <b>2 Jahre</b> (Wahlen 01.10.–30.11.). Die JAV handelt <b>über den Betriebsrat</b>.",
      explanation: "Wählbar sind AN unter 25 und Auszubildende – Volljährigkeit ist nicht erforderlich. Hier: 4 Jugendliche + volljährige Azubis ⇒ die Schwelle von 5 kann erreicht werden."
    }),
    Q({
      id: "wiso-tarif-mitbestimmung-012", type: "numeric", difficulty: 2, points: 2,
      context: CTX,
      question: "Aus wie vielen Mitgliedern besteht der Betriebsrat der InnoSoft GmbH nach § 9 BetrVG?",
      answer: 5, tolerance: 0, unit: "Mitglieder",
      solution: "§ 9 BetrVG: 5–20 wahlberechtigte AN → 1 Mitglied; 21–50 → 3; <b>51–100 AN → 5 Mitglieder</b>; 101–200 → 7; 201–400 → 9.",
      explanation: "Die Mitgliederzahl ist immer ungerade, damit Mehrheitsentscheidungen möglich sind."
    }),
    Q({
      id: "wiso-tarif-mitbestimmung-013", type: "numeric", difficulty: 3, points: 3,
      context: "Der neue Entgelttarifvertrag sieht eine Erhöhung der Monatsentgelte um <b>5,5 %</b>, <b>mindestens jedoch um 200 €</b> vor. Die tarifgebundene Mitarbeiterin Frau Stein verdient bisher 3.400 € brutto.",
      question: "Berechnen Sie ihr neues Bruttomonatsentgelt.",
      answer: 3600, tolerance: 0.01, unit: "€",
      solution: "Prozentuale Erhöhung: 3.400 € · 5,5 % = 187 € &lt; 200 € Mindestbetrag → es gilt der <b>Mindestbetrag</b>.<br>Neues Entgelt: 3.400 € + 200 € = <b>3.600 €</b>.",
      explanation: "Mindestbeträge (Sockelbeträge) begünstigen untere Entgeltgruppen. Die Grenze liegt bei 200 ÷ 0,055 ≈ 3.636,36 €."
    }),
    Q({
      id: "wiso-tarif-mitbestimmung-014", type: "order", difficulty: 2, points: 3,
      question: "Ordnen Sie die arbeitsrechtlichen Rechtsquellen nach ihrem Rang – beginnend mit der <b>höchsten</b>.",
      items: [
        "Grundgesetz",
        "Bundesgesetze (z. B. BGB, ArbZG, BUrlG)",
        "Tarifvertrag",
        "Betriebsvereinbarung",
        "Arbeitsvertrag",
        "Weisung des Arbeitgebers (Direktionsrecht)"
      ],
      solution: "GG → Gesetze (→ Rechtsverordnungen) → <b>Tarifvertrag → Betriebsvereinbarung → Arbeitsvertrag</b> → Weisungsrecht (§ 106 GewO). Rangniedrigere Regelungen dürfen ranghöhere nur zugunsten der AN verbessern (Günstigkeitsprinzip). EU-Recht steht über dem nationalen Recht."
    }),
    Q({
      id: "wiso-tarif-mitbestimmung-015", type: "mc", difficulty: 1, points: 2,
      context: "Ein Mitarbeiter verliert seine Kündigungsschutzklage in erster Instanz und möchte Berufung einlegen.",
      question: "Welches Gericht ist für die Berufung zuständig?",
      options: [
        "Das Bundesarbeitsgericht in Erfurt",
        "Das Landesarbeitsgericht",
        "Das Landessozialgericht",
        "Das Oberlandesgericht",
        "Das Bundesverfassungsgericht"
      ],
      correct: [1],
      solution: "Instanzenzug der Arbeitsgerichtsbarkeit: <b>Arbeitsgericht</b> (1. Instanz) → <b>Landesarbeitsgericht</b> (Berufung) → <b>Bundesarbeitsgericht</b> in Erfurt (Revision).",
      explanation: "Sozialgerichte (SG → LSG → BSG Kassel) sind für Sozialversicherungsstreitigkeiten zuständig, die ordentliche Gerichtsbarkeit (AG/LG/OLG/BGH) für Zivil- und Strafsachen."
    }),
    Q({
      id: "wiso-tarif-mitbestimmung-016", type: "mc", difficulty: 2, points: 2,
      context: "Die InnoSoft GmbH ist nicht Mitglied in einem Arbeitgeberverband. Der Entgelttarifvertrag der Branche wird vom Bundesministerium für Arbeit und Soziales für allgemeinverbindlich erklärt.",
      question: "Welche Folge hat die Allgemeinverbindlicherklärung?",
      options: [
        "Sie gilt nur für Gewerkschaftsmitglieder.",
        "Der Tarifvertrag gilt auch für nicht tarifgebundene Arbeitgeber und Arbeitnehmer in seinem Geltungsbereich.",
        "Die InnoSoft GmbH muss dem Arbeitgeberverband beitreten.",
        "Der Tarifvertrag ersetzt alle Betriebsvereinbarungen und Arbeitsverträge, auch günstigere.",
        "Der Betriebsrat darf nun keine Betriebsvereinbarungen mehr abschließen."
      ],
      correct: [1],
      solution: "<b>§ 5 TVG</b>: Mit der Allgemeinverbindlicherklärung erfassen die Rechtsnormen des Tarifvertrags in seinem Geltungsbereich auch die <b>bisher nicht tarifgebundenen</b> Arbeitgeber und Arbeitnehmer.",
      explanation: "Günstigere Arbeitsverträge bleiben wirksam (Günstigkeitsprinzip)."
    }),
    Q({
      id: "wiso-tarif-mitbestimmung-017", type: "mc", difficulty: 1, points: 2,
      question: "Was versteht man unter einer <b>Aussperrung</b>?",
      options: [
        "Den Ausschluss eines Mitglieds aus der Gewerkschaft",
        "Die Kündigung aller streikenden Arbeitnehmer",
        "Die planmäßige Arbeitsniederlegung durch Arbeitnehmer",
        "Das Arbeitskampfmittel der Arbeitgeber, Arbeitnehmer vorübergehend nicht zu beschäftigen und keinen Lohn zu zahlen",
        "Die Sperrung der Zugangskarten eines gekündigten Mitarbeiters"
      ],
      correct: [3],
      solution: "Die <b>Aussperrung</b> ist das Gegenmittel der Arbeitgeber zum Streik: Arbeitnehmer werden planmäßig von der Arbeit ausgeschlossen, die Arbeitsverhältnisse ruhen, es wird <b>kein Entgelt</b> gezahlt (Gewerkschaftsmitglieder erhalten Streikgeld). Sie muss verhältnismäßig sein (Abwehraussperrung).",
      explanation: "Arbeitsverhältnisse werden durch Streik und Aussperrung nur suspendiert, nicht beendet."
    }),
    Q({
      id: "wiso-tarif-mitbestimmung-018", type: "text", difficulty: 2, points: 5,
      context: CTX + " Geschäftsführung und Betriebsrat wollen die Regeln für mobiles Arbeiten in einer Betriebsvereinbarung festlegen.",
      question: "Erklären Sie, was eine <b>Betriebsvereinbarung</b> ist, und nennen Sie drei Inhalte, die in einer Betriebsvereinbarung „Mobiles Arbeiten“ geregelt werden könnten. Nennen Sie außerdem eine Grenze für Betriebsvereinbarungen.",
      solution: "<ul><li><b>Betriebsvereinbarung</b> (§ 77 BetrVG): schriftlicher Vertrag zwischen <b>Arbeitgeber und Betriebsrat</b>, beidseitig unterzeichnet und im Betrieb bekannt gemacht; gilt <b>unmittelbar und zwingend</b> für alle Arbeitnehmer des Betriebs (außer leitende Angestellte).</li><li>Mögliche Inhalte (§ 87 Abs. 1 Nr. 14 BetrVG – Ausgestaltung mobiler Arbeit): Anzahl der Tage mobil pro Woche, Erreichbarkeitszeiten/Kernzeiten, Arbeitszeiterfassung, Bereitstellung von Hardware und Kostenübernahme, Datenschutz/IT-Sicherheit (VPN, Bildschirmsperre), Arbeitsschutz/Ergonomie, Unfallversicherung, Rückkehr- und Widerrufsregelungen.</li><li><b>Grenzen</b>: Gesetze und Tarifverträge gehen vor; <b>Tarifvorbehalt</b> (§ 77 Abs. 3): Arbeitsentgelte und sonstige Arbeitsbedingungen, die durch Tarifvertrag geregelt sind oder üblicherweise geregelt werden, können nicht Gegenstand einer BV sein; günstigere Arbeitsverträge bleiben wirksam.</li></ul>",
      keywords: ["arbeitgeber", "betriebsrat", "schriftlich", "alle arbeitnehmer|unmittelbar", "erreichbarkeit|arbeitszeit|anzahl der tage", "datenschutz|hardware|ausstattung|arbeitsschutz", "tarifvorbehalt|tarifvertrag|gesetz"],
      explanation: "Abgrenzung: Tarifvertrag = Gewerkschaft ↔ Arbeitgeber(verband); Betriebsvereinbarung = Betriebsrat ↔ Arbeitgeber."
    })
  );
})();

// ---------------------------------------------------------------------------
// Fragen: wiso-sozialversicherung
// ---------------------------------------------------------------------------
(function () {
  const Q = (o) => Object.assign({ part: "WISO", topic: "wiso-sozialversicherung" }, o);
  const SAETZE = "<table><tr><th>Zweig</th><th>Gesamtbeitrag</th><th>Aufteilung</th></tr><tr><td>Krankenversicherung inkl. Zusatzbeitrag</td><td>17,5 %</td><td>je 8,75 % AN/AG</td></tr><tr><td>Pflegeversicherung</td><td>3,6 %</td><td>je 1,8 % + Kinderlosenzuschlag 0,6 % nur AN</td></tr><tr><td>Rentenversicherung</td><td>18,6 %</td><td>je 9,3 %</td></tr><tr><td>Arbeitslosenversicherung</td><td>2,6 %</td><td>je 1,3 %</td></tr></table>";
  AP2.questions.push(
    Q({
      id: "wiso-sozialversicherung-001", type: "mc", difficulty: 1, points: 2,
      context: "Der Umschüler Herr Demir stürzt auf dem direkten Weg zum Praktikumsbetrieb mit dem Fahrrad und bricht sich das Handgelenk.",
      question: "Welcher Sozialversicherungsträger ist für die Leistungen zuständig?",
      options: [
        "Die Krankenkasse von Herrn Demir",
        "Die Deutsche Rentenversicherung",
        "Die Berufsgenossenschaft bzw. Unfallkasse (gesetzliche Unfallversicherung)",
        "Die Bundesagentur für Arbeit",
        "Die private Haftpflichtversicherung des Arbeitgebers"
      ],
      correct: [2],
      solution: "Ein Unfall auf dem unmittelbaren Weg zur Arbeit ist ein <b>Wegeunfall</b> (§ 8 Abs. 2 SGB VII) und damit ein Versicherungsfall der <b>gesetzlichen Unfallversicherung</b>. Träger: Berufsgenossenschaften bzw. Unfallkassen (bei Umschülern in geförderten Maßnahmen ggf. die BG des Bildungsträgers/die VBG).",
      explanation: "Die Krankenkasse ist nur bei privaten Unfällen und Krankheiten zuständig."
    }),
    Q({
      id: "wiso-sozialversicherung-002", type: "mc", difficulty: 1, points: 2,
      question: "Wie wird die gesetzliche <b>Unfallversicherung</b> finanziert?",
      options: [
        "Je zur Hälfte von Arbeitgeber und Arbeitnehmer",
        "Allein durch den Arbeitnehmer",
        "Allein durch den Arbeitgeber, abhängig von Lohnsumme und Gefahrklasse",
        "Ausschließlich durch Steuermittel des Bundes",
        "Durch einen festen Beitragssatz von 2,6 % vom Bruttolohn"
      ],
      correct: [2],
      solution: "Die Beiträge zur gesetzlichen Unfallversicherung trägt <b>allein der Arbeitgeber</b>. Die Höhe richtet sich nach der <b>Lohnsumme</b> und der <b>Gefahrklasse</b> des Gewerbezweigs (Umlageverfahren der Berufsgenossenschaft). Im Gegenzug sind AG und Kollegen von der Haftung für Personenschäden weitgehend befreit.",
      explanation: "2,6 % ist der Beitragssatz der Arbeitslosenversicherung."
    }),
    Q({
      id: "wiso-sozialversicherung-003", type: "mc", difficulty: 2, points: 2,
      question: "Welche Leistung gehört zur gesetzlichen <b>Rentenversicherung</b>?",
      options: [
        "Krankengeld ab der 7. Woche",
        "Kurzarbeitergeld",
        "Medizinische Rehabilitation zur Erhaltung der Erwerbsfähigkeit",
        "Pflegegeld bei Pflegegrad 2",
        "Insolvenzgeld"
      ],
      correct: [2],
      solution: "Die <b>Deutsche Rentenversicherung</b> zahlt Alters-, Erwerbsminderungs- und Hinterbliebenenrenten und erbringt Leistungen zur <b>Rehabilitation</b> („Reha vor Rente“) sowie zur Teilhabe am Arbeitsleben (z. B. Umschulungen nach Krankheit).",
      explanation: "Krankengeld → KV; Kurzarbeiter- und Insolvenzgeld → AV; Pflegegeld → PV."
    }),
    Q({
      id: "wiso-sozialversicherung-004", type: "mc", difficulty: 2, points: 2,
      question: "Was versteht man unter dem <b>Generationenvertrag</b> in der gesetzlichen Rentenversicherung?",
      options: [
        "Jeder Versicherte spart seine Beiträge auf einem eigenen Konto für seine spätere Rente an.",
        "Die heute Erwerbstätigen finanzieren mit ihren Beiträgen die Renten der heutigen Rentner (Umlageverfahren).",
        "Die Rente wird ausschließlich aus Steuern bezahlt.",
        "Eltern sind verpflichtet, die Rentenbeiträge ihrer Kinder zu zahlen.",
        "Der Arbeitgeber zahlt die Rente seiner ehemaligen Mitarbeiter."
      ],
      correct: [1],
      solution: "Die gesetzliche Rentenversicherung arbeitet im <b>Umlageverfahren</b>: Die laufenden Beiträge der Erwerbstätigen werden direkt für die laufenden Renten verwendet (ergänzt durch einen Bundeszuschuss). Die Beitragszahler erwerben dadurch Ansprüche, die die nächste Generation finanziert.",
      explanation: "Antwort A beschreibt das Kapitaldeckungsverfahren (private Vorsorge)."
    }),
    Q({
      id: "wiso-sozialversicherung-005", type: "mc", difficulty: 2, points: 2,
      context: "Ein Mitarbeiter der InnoSoft GmbH verdient deutlich mehr als die Beitragsbemessungsgrenze der Kranken- und Pflegeversicherung und mehr als die Versicherungspflichtgrenze (Jahresarbeitsentgeltgrenze).",
      question: "Welche Aussage ist richtig?",
      options: [
        "Er zahlt auf sein gesamtes Einkommen KV-Beiträge.",
        "Er ist von der Rentenversicherungspflicht befreit.",
        "Er kann sich privat krankenversichern; Beiträge zur gesetzlichen KV werden höchstens bis zur Beitragsbemessungsgrenze erhoben.",
        "Er muss sich privat krankenversichern.",
        "Er zahlt keine Arbeitslosenversicherung mehr."
      ],
      correct: [2],
      solution: "<b>Versicherungspflichtgrenze</b> (JAEG): Wer sie überschreitet, ist in der KV/PV nicht mehr pflichtversichert und <b>kann</b> wählen (freiwillig gesetzlich oder privat). <b>Beitragsbemessungsgrenze</b>: Einkommen oberhalb der BBG ist <b>beitragsfrei</b>. RV und AV bleiben für Arbeitnehmer unabhängig vom Einkommen Pflicht (dort gilt nur die höhere BBG der RV).",
      explanation: "Typische Verwechslung: BBG (bis wohin Beiträge berechnet werden) vs. Versicherungspflichtgrenze (ab wann Wechsel in PKV möglich)."
    }),
    Q({
      id: "wiso-sozialversicherung-006", type: "mc", difficulty: 1, points: 2,
      context: "Ihre Kollegin Frau Kern ist geschieden und lebt allein mit ihrer 8-jährigen Tochter, für die sie Kindergeld erhält.",
      question: "Welche Steuerklasse ist für Frau Kern zutreffend?",
      options: ["I", "II", "III", "IV", "V"],
      correct: [1],
      solution: "<b>Steuerklasse II</b>: Alleinerziehende, denen der <b>Entlastungsbetrag für Alleinerziehende</b> zusteht (mind. ein Kind im Haushalt mit Kindergeldanspruch, keine Haushaltsgemeinschaft mit einem anderen Erwachsenen).",
      explanation: "I = ledig/geschieden ohne Entlastungsbetrag; III/V und IV = Verheiratete; VI = weiteres Dienstverhältnis."
    }),
    Q({
      id: "wiso-sozialversicherung-007", type: "mc", difficulty: 2, points: 2,
      question: "Welche der folgenden Steuern ist eine <b>indirekte Steuer</b>?",
      options: ["Lohnsteuer", "Körperschaftsteuer", "Umsatzsteuer", "Gewerbesteuer", "Kraftfahrzeugsteuer"],
      correct: [2],
      solution: "Bei <b>indirekten Steuern</b> sind Steuerschuldner (Unternehmen, das an das Finanzamt abführt) und Steuerträger (Endverbraucher, der sie über den Preis bezahlt) verschieden – z. B. <b>Umsatzsteuer</b>, Energie-, Tabak-, Kaffeesteuer.",
      explanation: "Bei direkten Steuern (Lohn-/Einkommen-, Körperschaft-, Gewerbe-, Kfz-Steuer) zahlt der Steuerpflichtige selbst und trägt die Last."
    }),
    Q({
      id: "wiso-sozialversicherung-008", type: "mc", difficulty: 2, points: 2,
      context: "Die Auszubildende Emma (19) erhält im 1. Ausbildungsjahr eine Vergütung von 300 € monatlich (Annahme: Geringverdienergrenze 325 €).",
      question: "Wer trägt die Beiträge zur Sozialversicherung?",
      options: [
        "Emma und der Arbeitgeber je zur Hälfte",
        "Der Arbeitgeber allein",
        "Emma allein",
        "Keiner – Auszubildende sind versicherungsfrei",
        "Die Agentur für Arbeit"
      ],
      correct: [1],
      solution: "Bei Auszubildenden mit einem Entgelt bis zur <b>Geringverdienergrenze von 325 €</b> monatlich trägt der <b>Arbeitgeber die Beiträge allein</b> (§ 20 Abs. 3 SGB IV), einschließlich des Kinderlosenzuschlags.",
      explanation: "Auszubildende sind immer versicherungspflichtig – die Minijob-Regeln gelten für sie nicht."
    }),
    Q({
      id: "wiso-sozialversicherung-009", type: "mc", difficulty: 2, points: 2,
      context: "Ihre Kollegin erhält einen Bescheid der Deutschen Rentenversicherung, mit dem sie nicht einverstanden ist.",
      question: "Was muss sie zuerst tun, um sich zu wehren?",
      options: [
        "Klage beim Arbeitsgericht erheben",
        "Widerspruch beim Rentenversicherungsträger einlegen; danach ist Klage beim Sozialgericht möglich",
        "Sofort Klage beim Bundessozialgericht in Kassel erheben",
        "Beschwerde beim Betriebsrat einlegen",
        "Einspruch beim Finanzamt einlegen"
      ],
      correct: [1],
      solution: "Gegen Bescheide der Sozialversicherungsträger ist zunächst <b>Widerspruch</b> (i. d. R. binnen 1 Monat) beim Träger einzulegen. Nach einem ablehnenden Widerspruchsbescheid folgt die Klage beim <b>Sozialgericht</b> → Landessozialgericht → Bundessozialgericht (Kassel).",
      explanation: "Arbeitsgerichte entscheiden über Streit zwischen AN und AG, nicht über Sozialleistungen."
    }),
    Q({
      id: "wiso-sozialversicherung-010", type: "numeric", difficulty: 2, points: 6,
      context: "Gehaltsabrechnung der Mitarbeiterin Frau Weber (ledig, kinderlos, 28 Jahre, Steuerklasse I, evangelisch, Wohnsitz Karlsruhe) für November:<br>Bruttogehalt: 3.200,00 €; Lohnsteuer laut Tabelle: 352,16 €; Solidaritätszuschlag: 0,00 €; Kirchensteuer: 8 % der Lohnsteuer.<br>Sozialversicherung (vorgegebene Sätze):" + SAETZE,
      question: "Berechnen Sie das <b>Nettogehalt</b> von Frau Weber.",
      answer: 2123.67, tolerance: 0.02, unit: "€",
      solution: "Kirchensteuer: 352,16 · 8 % = 28,17 €<br>KV: 3.200 · 8,75 % = 280,00 €<br>PV: 3.200 · (1,8 % + 0,6 %) = 76,80 €<br>RV: 3.200 · 9,3 % = 297,60 €<br>AV: 3.200 · 1,3 % = 41,60 €<br>SV gesamt: 696,00 €<br>Netto = 3.200,00 − 352,16 − 28,17 − 696,00 = <b>2.123,67 €</b>",
      explanation: "Kinderlose ab 23 Jahren zahlen den PV-Zuschlag von 0,6 % allein. Kirchensteuer in BW/Bayern 8 %, sonst 9 % der Lohnsteuer."
    }),
    Q({
      id: "wiso-sozialversicherung-011", type: "numeric", difficulty: 2, points: 4,
      context: "Gleiche Angaben wie bei Frau Weber (Bruttogehalt 3.200,00 €). Sozialversicherung (vorgegebene Sätze):" + SAETZE,
      question: "Berechnen Sie den <b>Arbeitgeberanteil</b> zur Kranken-, Pflege-, Renten- und Arbeitslosenversicherung (ohne Unfallversicherung und Umlagen).",
      answer: 676.8, tolerance: 0.02, unit: "€",
      solution: "KV 8,75 % + PV 1,8 % + RV 9,3 % + AV 1,3 % = 21,15 %<br>3.200 · 21,15 % = <b>676,80 €</b><br>(Der Kinderlosenzuschlag trägt nur der AN.) Personalkosten ohne UV/Umlagen: 3.876,80 €.",
      explanation: "Der AN-Anteil (696,00 €) ist um den Kinderlosenzuschlag (19,20 €) höher als der AG-Anteil."
    }),
    Q({
      id: "wiso-sozialversicherung-012", type: "numeric", difficulty: 3, points: 3,
      context: "Der Teamleiter Herr Albrecht verdient 9.000 € brutto im Monat. Für die Aufgabe gilt: Beitragsbemessungsgrenze der Renten- und Arbeitslosenversicherung 8.450 € monatlich, Arbeitnehmeranteil zur Rentenversicherung 9,3 %.",
      question: "Berechnen Sie den monatlichen Arbeitnehmeranteil zur Rentenversicherung.",
      answer: 785.85, tolerance: 0.02, unit: "€",
      solution: "Beiträge werden höchstens bis zur <b>Beitragsbemessungsgrenze</b> erhoben: 8.450 € · 9,3 % = <b>785,85 €</b> (nicht 9.000 € · 9,3 % = 837,00 €).",
      explanation: "Der Teil über der BBG (550 €) ist beitragsfrei – entsprechend sind auch die späteren Rentenansprüche gedeckelt."
    }),
    Q({
      id: "wiso-sozialversicherung-013", type: "numeric", difficulty: 2, points: 3,
      context: "Eine Studentin soll bei der InnoSoft GmbH als Minijobberin Testfälle schreiben. Für die Aufgabe gilt: gesetzlicher Mindestlohn 13,90 €/Stunde, Geringfügigkeitsgrenze 603 € monatlich.",
      question: "Wie viele <b>volle Stunden</b> darf sie im Monat höchstens arbeiten, wenn sie Mindestlohn erhält und die Geringfügigkeitsgrenze nicht überschritten werden soll?",
      answer: 43, tolerance: 0, unit: "Stunden",
      solution: "603 € ÷ 13,90 €/h = 43,38 h → höchstens <b>43 volle Stunden</b> (43 · 13,90 € = 597,70 €; 44 h wären 611,60 € &gt; 603 €).",
      explanation: "Die Geringfügigkeitsgrenze ist an den Mindestlohn gekoppelt (Mindestlohn · 130 ÷ 3, aufgerundet) – sie entspricht immer etwa 10 Wochenstunden."
    }),
    Q({
      id: "wiso-sozialversicherung-014", type: "numeric", difficulty: 3, points: 4,
      context: "Die Umschülerin Frau Becker erstellt ihre Einkommensteuererklärung. Angaben: einfache Entfernung Wohnung–Praktikumsbetrieb 25 km an 210 Tagen; Entfernungspauschale (für die Aufgabe): 0,38 € je Entfernungskilometer ab dem ersten Kilometer; Fachbücher und Software für die Ausbildung: 450 €; Lehrgang zur Prüfungsvorbereitung (selbst bezahlt): 300 €. Arbeitnehmer-Pauschbetrag: 1.230 €.",
      question: "Um wie viel Euro übersteigen ihre Werbungskosten den Arbeitnehmer-Pauschbetrag?",
      answer: 1515, tolerance: 0.01, unit: "€",
      solution: "Fahrtkosten: 25 km · 210 Tage · 0,38 € = 1.995,00 €<br>+ Arbeitsmittel 450,00 € + Fortbildung 300,00 € = <b>2.745,00 €</b> Werbungskosten<br>− Pauschbetrag 1.230,00 € = <b>1.515,00 €</b>",
      explanation: "Nur die einfache Entfernung zählt (nicht Hin- und Rückweg). Ohne Nachweis wird automatisch der Pauschbetrag angesetzt."
    }),
    Q({
      id: "wiso-sozialversicherung-015", type: "multi", difficulty: 2, points: 3,
      question: "Welche <b>zwei</b> Aussagen zur Finanzierung der Sozialversicherung sind richtig?",
      options: [
        "Die Beiträge zur Renten- und Arbeitslosenversicherung tragen Arbeitgeber und Arbeitnehmer je zur Hälfte.",
        "Den Beitrag zur Unfallversicherung teilen sich Arbeitgeber und Arbeitnehmer.",
        "Den Zuschlag für Kinderlose in der Pflegeversicherung trägt der Arbeitnehmer allein.",
        "Der kassenindividuelle Zusatzbeitrag der Krankenversicherung wird allein vom Arbeitnehmer bezahlt.",
        "Die Arbeitslosenversicherung wird ausschließlich aus Steuern finanziert."
      ],
      correct: [0, 2],
      solution: "RV und AV werden <b>paritätisch</b> finanziert. Der <b>Kinderlosenzuschlag</b> (0,6 %) in der PV ist vom AN allein zu tragen.",
      explanation: "Seit 2019 wird auch der Zusatzbeitrag der KV wieder paritätisch getragen. UV zahlt der AG allein."
    }),
    Q({
      id: "wiso-sozialversicherung-016", type: "multi", difficulty: 2, points: 3,
      context: "Herr Klein (31) möchte seine Altersvorsorge planen und lässt sich das „Drei-Säulen-Modell“ erklären.",
      question: "Welche <b>zwei</b> Beispiele gehören zur <b>zweiten</b> bzw. <b>dritten</b> Säule (betriebliche bzw. private Vorsorge)?",
      options: [
        "Gesetzliche Altersrente der Deutschen Rentenversicherung",
        "Entgeltumwandlung in eine Direktversicherung über den Arbeitgeber",
        "Bürgergeld/Grundsicherung",
        "Private Rentenversicherung oder ETF-Sparplan",
        "Arbeitslosengeld I"
      ],
      correct: [1, 3],
      solution: "1. Säule: gesetzliche Rentenversicherung; <b>2. Säule: betriebliche Altersversorgung</b> (z. B. Entgeltumwandlung, Direktversicherung, Pensionskasse); <b>3. Säule: private Vorsorge</b> (private Rentenversicherung, Riester/Rürup, Fonds/ETF, Immobilie).",
      explanation: "Bürgergeld und ALG I sind keine Altersvorsorge."
    }),
    Q({
      id: "wiso-sozialversicherung-017", type: "order", difficulty: 3, points: 3,
      question: "Ordnen Sie die Zweige der Sozialversicherung nach dem Zeitpunkt ihrer Einführung – beginnend mit dem ältesten.",
      items: [
        "Krankenversicherung",
        "Unfallversicherung",
        "Renten- bzw. Invaliditäts- und Altersversicherung",
        "Arbeitslosenversicherung",
        "Pflegeversicherung"
      ],
      solution: "Bismarcksche Sozialgesetzgebung: KV 1883, UV 1884, RV 1889; Weimarer Republik: AV 1927; Pflegeversicherung als „fünfte Säule“ 1995.",
      explanation: "Merkhilfe: „K-U-R-A-P“ – Kranke Unfallopfer Rennen Ab Pflegeheim."
    }),
    Q({
      id: "wiso-sozialversicherung-018", type: "text", difficulty: 3, points: 6,
      question: "Erläutern Sie, warum die gesetzliche Rentenversicherung durch den <b>demografischen Wandel</b> unter Druck gerät, und nennen Sie drei mögliche Gegenmaßnahmen.",
      solution: "<ul><li>Die RV arbeitet im <b>Umlageverfahren</b> (Generationenvertrag): Die Beiträge der heutigen Erwerbstätigen finanzieren die heutigen Renten.</li><li><b>Demografischer Wandel</b>: niedrige Geburtenrate und steigende <b>Lebenserwartung</b> → immer weniger Beitragszahler stehen immer mehr Rentnern gegenüber (Renteneintritt der Babyboomer); Renten werden länger bezogen.</li><li>Folgen: steigende Beitragssätze, sinkendes Rentenniveau oder höhere Bundeszuschüsse (Steuern).</li><li><b>Gegenmaßnahmen</b>: Anhebung des Renteneintrittsalters (Regelaltersgrenze 67), höhere Beiträge oder Bundeszuschüsse, Stärkung der betrieblichen und privaten Vorsorge (Kapitaldeckung, z. B. Frühstart-Rente/Aktienrente), Zuwanderung von Fachkräften, höhere Erwerbsbeteiligung von Frauen und Älteren, Einbeziehung weiterer Gruppen (z. B. Selbstständige, Beamte).</li></ul>",
      keywords: ["umlageverfahren|generationenvertrag", "beitragszahler|erwerbstätige", "rentner|lebenserwartung", "geburtenrate|geburten", "renteneintrittsalter|rentenalter|regelaltersgrenze", "private vorsorge|betriebliche|kapitaldeckung", "zuwanderung|beitrag|bundeszuschuss"],
      explanation: "Das Verhältnis Beitragszahler je Rentner (Altenquotient) ist die Schlüsselgröße."
    })
  );
})();

// ---------------------------------------------------------------------------
// Fragen: wiso-unternehmen
// ---------------------------------------------------------------------------
(function () {
  const Q = (o) => Object.assign({ part: "WISO", topic: "wiso-unternehmen" }, o);
  AP2.questions.push(
    Q({
      id: "wiso-unternehmen-001", type: "mc", difficulty: 1, points: 2,
      context: "Frau Lang beteiligt sich als Kommanditistin mit einer voll eingezahlten Einlage von 50.000 € an der Software Lang & Partner KG. Die KG gerät in Zahlungsschwierigkeiten.",
      question: "Wie haftet Frau Lang für die Verbindlichkeiten der KG?",
      options: [
        "Unbeschränkt mit ihrem gesamten Privatvermögen",
        "Nur in Höhe ihrer Einlage; da diese voll eingezahlt ist, haftet sie nicht mit ihrem Privatvermögen",
        "Bis zum doppelten Betrag ihrer Einlage",
        "Gar nicht, auch die Einlage ist geschützt",
        "Gesamtschuldnerisch zusammen mit dem Komplementär für alle Schulden"
      ],
      correct: [1],
      solution: "Der <b>Kommanditist</b> haftet den Gläubigern nur <b>bis zur Höhe seiner (im Handelsregister eingetragenen) Einlage</b>; ist sie geleistet, ist die persönliche Haftung ausgeschlossen (§ 171 HGB). Die Einlage selbst ist aber Teil des Gesellschaftsvermögens und damit „verloren“, wenn die KG insolvent wird.",
      explanation: "Unbeschränkt haftet nur der Komplementär."
    }),
    Q({
      id: "wiso-unternehmen-002", type: "mc", difficulty: 1, points: 2,
      context: "Zwei Absolventen möchten die „CodeCraft GmbH“ gründen und Bareinlagen leisten.",
      question: "Welche Kapitalanforderung gilt bei der Gründung einer GmbH?",
      options: [
        "Mindeststammkapital 1 €",
        "Mindeststammkapital 25.000 €; vor der Anmeldung zum Handelsregister müssen mindestens 12.500 € eingezahlt sein",
        "Mindeststammkapital 50.000 €, voll einzuzahlen",
        "Mindeststammkapital 25.000 €, das erst nach 5 Jahren eingezahlt sein muss",
        "Kein Mindestkapital, aber eine Bankbürgschaft"
      ],
      correct: [1],
      solution: "<b>§ 5 GmbHG</b>: Stammkapital mind. <b>25.000 €</b>. <b>§ 7 Abs. 2 GmbHG</b>: Bei Bareinlagen muss auf jeden Geschäftsanteil mind. ein Viertel und insgesamt mind. die <b>Hälfte (12.500 €)</b> eingezahlt sein, bevor die Anmeldung erfolgt. Der Gesellschaftsvertrag ist notariell zu beurkunden; die GmbH entsteht erst mit Eintragung (Abt. B).",
      explanation: "1 € gilt für die UG (haftungsbeschränkt), 50.000 € Grundkapital für die AG."
    }),
    Q({
      id: "wiso-unternehmen-003", type: "mc", difficulty: 2, points: 2,
      context: "Die Gründerin Frau Aydin gründet eine „AppWerk UG (haftungsbeschränkt)“ mit 1.000 € Stammkapital. Im ersten Jahr erzielt die UG einen Jahresüberschuss von 20.000 €.",
      question: "Welche Pflicht besteht hinsichtlich des Jahresüberschusses?",
      options: [
        "Der gesamte Jahresüberschuss muss ausgeschüttet werden.",
        "Ein Viertel des Jahresüberschusses (hier 5.000 €) muss in eine gesetzliche Rücklage eingestellt werden.",
        "Der Jahresüberschuss muss vollständig in das Stammkapital eingezahlt werden.",
        "Die UG muss sofort in eine AG umgewandelt werden.",
        "Es besteht keine besondere Pflicht."
      ],
      correct: [1],
      solution: "<b>§ 5a Abs. 3 GmbHG</b>: In der Bilanz der UG ist eine gesetzliche Rücklage zu bilden, in die <b>ein Viertel des um einen Verlustvortrag geminderten Jahresüberschusses</b> einzustellen ist – so lange, bis das Stammkapital durch Kapitalerhöhung 25.000 € erreicht (dann Umfirmierung zur GmbH möglich).",
      explanation: "20.000 € · 25 % = 5.000 €."
    }),
    Q({
      id: "wiso-unternehmen-004", type: "mc", difficulty: 2, points: 2,
      question: "Welches Organ einer Aktiengesellschaft <b>bestellt und überwacht den Vorstand</b>?",
      options: ["Die Hauptversammlung", "Der Aufsichtsrat", "Der Betriebsrat", "Der Wirtschaftsprüfer", "Das Registergericht"],
      correct: [1],
      solution: "Der <b>Aufsichtsrat</b> bestellt und beruft den Vorstand ab und überwacht dessen Geschäftsführung (§§ 84, 111 AktG). Die <b>Hauptversammlung</b> wählt die Anteilseignervertreter im Aufsichtsrat, beschließt über Gewinnverwendung, Entlastung und Satzungsänderungen. Der <b>Vorstand</b> leitet die AG in eigener Verantwortung und vertritt sie.",
      explanation: "Merke: HV → wählt AR → bestellt Vorstand."
    }),
    Q({
      id: "wiso-unternehmen-005", type: "mc", difficulty: 2, points: 3,
      context: "Herr Graf ist Prokurist der InnoSoft GmbH (Einzelprokura, keine besonderen Befugnisse).",
      question: "Welches Rechtsgeschäft darf Herr Graf <b>nicht</b> vornehmen?",
      options: [
        "Einen Kredit über 100.000 € für neue Server aufnehmen",
        "Eine neue Mitarbeiterin einstellen",
        "Für die GmbH einen Prozess vor dem Landgericht führen",
        "Den Jahresabschluss (Bilanz) der GmbH unterschreiben",
        "Einen Mietvertrag für ein neues Büro abschließen"
      ],
      correct: [3],
      solution: "Die <b>Prokura</b> (§ 49 HGB) ermächtigt zu allen gerichtlichen und außergerichtlichen Geschäften, die der Betrieb <b>irgendeines</b> Handelsgewerbes mit sich bringt – auch Kredite, Prozesse, Einstellungen, Mietverträge. <b>Nicht</b> erlaubt sind <b>Grundlagengeschäfte</b>/Prinzipalgeschäfte: Bilanz und Steuererklärungen unterschreiben, Prokura erteilen, Insolvenz anmelden, Handelsregisteranmeldungen für das Unternehmen, Geschäft verkaufen/auflösen; Grundstücke veräußern/belasten nur mit besonderer Befugnis.",
      explanation: "Ein Handlungsbevollmächtigter dürfte ohne besondere Befugnis keinen Kredit aufnehmen und keinen Prozess führen (§ 54 Abs. 2 HGB)."
    }),
    Q({
      id: "wiso-unternehmen-006", type: "mc", difficulty: 2, points: 2,
      context: "Frau Roth ist bei der InnoSoft GmbH im Einkauf beschäftigt und berechtigt, sämtliche Hard- und Softwareeinkäufe für das Unternehmen abzuschließen.",
      question: "Welche Vollmacht besitzt Frau Roth?",
      options: [
        "Einzelprokura",
        "Gesamtprokura",
        "Allgemeine Handlungsvollmacht",
        "Artvollmacht (Arthandlungsvollmacht)",
        "Einzelvollmacht"
      ],
      correct: [3],
      solution: "Die <b>Artvollmacht</b> berechtigt zur Vornahme einer bestimmten <b>Art</b> von Rechtsgeschäften, die regelmäßig wiederkehren (z. B. alle Einkäufe, alle Kassengeschäfte). Allgemeine Handlungsvollmacht: alle gewöhnlichen Geschäfte des Betriebs; Einzelvollmacht: ein einzelnes Geschäft.",
      explanation: "Handlungsvollmacht ist formfrei und wird nicht ins Handelsregister eingetragen (Zeichnung i. V.)."
    }),
    Q({
      id: "wiso-unternehmen-007", type: "mc", difficulty: 1, points: 2,
      question: "In welcher Abteilung des Handelsregisters wird eine <b>GmbH</b> eingetragen?",
      options: [
        "Abteilung A",
        "Abteilung B",
        "Im Genossenschaftsregister",
        "Im Vereinsregister",
        "Eine GmbH muss nicht eingetragen werden"
      ],
      correct: [1],
      solution: "<b>Abteilung A</b>: Einzelkaufleute (e.K.), OHG, KG (auch GmbH &amp; Co. KG). <b>Abteilung B</b>: Kapitalgesellschaften – <b>GmbH</b>, UG, AG, KGaA. Das Handelsregister wird elektronisch vom Amtsgericht geführt.",
      explanation: "Die GmbH &amp; Co. KG steht als KG in Abteilung A, ihre Komplementär-GmbH zusätzlich in Abteilung B."
    }),
    Q({
      id: "wiso-unternehmen-008", type: "mc", difficulty: 3, points: 3,
      context: "Herr Vogel betreibt als Einzelunternehmer einen kleinen IT-Reparaturservice. Ein kaufmännisch eingerichteter Geschäftsbetrieb ist nicht erforderlich. Er lässt sich freiwillig ins Handelsregister eintragen.",
      question: "Welche Aussage ist richtig?",
      options: [
        "Herr Vogel ist Istkaufmann; die Eintragung wirkt deklaratorisch.",
        "Herr Vogel ist Kannkaufmann; die Eintragung wirkt konstitutiv (rechtsbegründend).",
        "Herr Vogel ist Formkaufmann.",
        "Eine Eintragung ist für Kleingewerbetreibende unzulässig.",
        "Herr Vogel bleibt trotz Eintragung Nichtkaufmann."
      ],
      correct: [1],
      solution: "Kleingewerbetreibende sind keine Istkaufleute (§ 1 Abs. 2 HGB). Sie können sich aber nach <b>§ 2 HGB</b> eintragen lassen und werden dadurch <b>Kannkaufmann</b> – die Eintragung wirkt <b>konstitutiv</b>. Danach gilt das HGB (z. B. Prokura möglich, Rügepflicht § 377 HGB).",
      explanation: "Istkaufmann (§ 1): Eintragung nur deklaratorisch; Formkaufmann (§ 6): Kapitalgesellschaften und eG."
    }),
    Q({
      id: "wiso-unternehmen-009", type: "mc", difficulty: 2, points: 2,
      context: "In der InnoSoft GmbH sind die Entwicklerinnen und Entwickler fachlich dem Leiter „Softwareentwicklung“ und gleichzeitig für die Dauer eines Kundenprojekts der jeweiligen Projektleiterin unterstellt.",
      question: "Um welche Organisationsform handelt es sich?",
      options: ["Einlinienorganisation", "Stablinienorganisation", "Matrixorganisation", "Spartenorganisation", "Funktionale Organisation nach Taylor"],
      correct: [2],
      solution: "Bei der <b>Matrixorganisation</b> werden zwei Gliederungsdimensionen kombiniert (hier Funktion „Entwicklung“ × Objekt „Projekt“). Mitarbeitende haben zwei Weisungsbefugte (Doppelunterstellung). Vorteile: Spezialisierung, Flexibilität, kurze Wege; Nachteile: Kompetenzkonflikte, hoher Abstimmungsbedarf.",
      explanation: "Das Mehrliniensystem nach Taylor kennt ebenfalls mehrere Vorgesetzte, aber nach Funktionen (Funktionsmeister), nicht als zweidimensionale Matrix."
    }),
    Q({
      id: "wiso-unternehmen-010", type: "mc", difficulty: 1, points: 2,
      context: "Der Geschäftsführung der InnoSoft GmbH ist eine Datenschutzbeauftragte zugeordnet, die berät, Gutachten erstellt, aber gegenüber den Abteilungen keine Weisungsbefugnis hat.",
      question: "Welche organisatorische Stelle beschreibt der Sachverhalt?",
      options: ["Instanz", "Stabsstelle", "Ausführende Stelle", "Sparte", "Profit-Center"],
      correct: [1],
      solution: "Eine <b>Stabsstelle</b> unterstützt und berät eine Leitungsinstanz (Entscheidungsvorbereitung), hat aber <b>keine Weisungsbefugnis</b> gegenüber der Linie – typisch in der <b>Stablinienorganisation</b> (z. B. Recht, Controlling, Datenschutz, IT-Sicherheit).",
      explanation: "Eine Instanz ist eine Stelle mit Leitungs- und Weisungsbefugnis."
    }),
    Q({
      id: "wiso-unternehmen-011", type: "mc", difficulty: 2, points: 2,
      context: "Die InnoSoft GmbH erwirbt 80 % der Anteile an der CloudOps GmbH. Beide Gesellschaften bleiben rechtlich selbstständig, werden aber von der Geschäftsführung der InnoSoft einheitlich geleitet.",
      question: "Welche Unternehmensverbindung liegt vor?",
      options: ["Kartell", "Konzern", "Fusion durch Neubildung", "Joint Venture", "Interessengemeinschaft ohne Kapitalbeteiligung"],
      correct: [1],
      solution: "Ein <b>Konzern</b> (§ 18 AktG) ist der Zusammenschluss rechtlich selbstständiger Unternehmen unter <b>einheitlicher Leitung</b>; die wirtschaftliche Selbstständigkeit der Tochter geht verloren (Mutter-/Tochtergesellschaft, Beherrschung meist über Kapitalmehrheit).",
      explanation: "Kartell: rechtlich und wirtschaftlich selbstständig, nur Absprachen; Fusion: mindestens ein Unternehmen verliert die rechtliche Selbstständigkeit; Joint Venture: gemeinsam gegründetes Tochterunternehmen."
    }),
    Q({
      id: "wiso-unternehmen-012", type: "mc", difficulty: 2, points: 2,
      question: "In welchem Beispiel liegt ein <b>Zielkonflikt</b> zwischen einem ökonomischen und einem ökologischen Unternehmensziel vor?",
      options: [
        "Durch Virtualisierung sinken die Stromkosten und der CO₂-Ausstoß.",
        "Die Geschäftsführung kauft billige Server mit hohem Stromverbrauch, um die Anschaffungskosten zu senken.",
        "Ein ergonomischer Arbeitsplatz senkt Krankheitstage und erhöht die Produktivität.",
        "Höhere Umsätze führen zu höheren Gewinnen.",
        "Durch Homeoffice sinken die Mietkosten und die Pendelwege."
      ],
      correct: [1],
      solution: "Ein <b>Zielkonflikt</b> liegt vor, wenn die Erreichung eines Ziels die Erreichung eines anderen beeinträchtigt: Niedrige Anschaffungskosten (ökonomisch) gehen zulasten von Energieeffizienz/Klimaschutz (ökologisch).",
      explanation: "Alle anderen Beispiele sind Zielharmonien (ein Ziel fördert das andere)."
    }),
    Q({
      id: "wiso-unternehmen-013", type: "numeric", difficulty: 3, points: 4,
      context: "An der IT-Systemhaus Kern KG sind Komplementär Kern mit 200.000 € und Kommanditistin Otto mit 100.000 € beteiligt. Der Gesellschaftsvertrag regelt: Jeder Gesellschafter erhält zunächst 5 % Verzinsung seiner Einlage, der Rest wird im Verhältnis 3 : 1 (Kern : Otto) verteilt. Der Jahresgewinn beträgt 90.000 €.",
      question: "Berechnen Sie den Gewinnanteil des Komplementärs Kern.",
      answer: 66250, tolerance: 0.01, unit: "€",
      solution: "Verzinsung: Kern 5 % von 200.000 = 10.000 €; Otto 5 % von 100.000 = 5.000 € → zusammen 15.000 €<br>Restgewinn: 90.000 − 15.000 = 75.000 € → 4 Teile à 18.750 €<br>Kern: 3 · 18.750 = 56.250 € + 10.000 € = <b>66.250 €</b> (Otto: 18.750 + 5.000 = 23.750 €)",
      explanation: "Der Komplementär erhält wegen Haftung und Arbeitseinsatz meist einen höheren Anteil am Restgewinn. Fehlt eine Vertragsregel, gilt seit 2024 (MoPeG) die Verteilung nach Beteiligungsverhältnissen."
    }),
    Q({
      id: "wiso-unternehmen-014", type: "numeric", difficulty: 2, points: 3,
      context: "Die Web &amp; Mobile OHG hat drei Gesellschafter: Müller (Einlage 20.000 €), Schulz (40.000 €) und Peters (60.000 €). Ein Lieferant hat eine fällige Forderung von 60.000 € gegen die OHG.",
      question: "Welchen Betrag kann der Lieferant <b>maximal</b> direkt von Gesellschafter Müller verlangen?",
      answer: 60000, tolerance: 0.01, unit: "€",
      solution: "OHG-Gesellschafter haften <b>unbeschränkt</b> (mit Privatvermögen), <b>unmittelbar</b> (Gläubiger kann direkt den Gesellschafter in Anspruch nehmen) und <b>solidarisch/gesamtschuldnerisch</b> (jeder für die gesamte Schuld) – § 126 HGB n. F. Müller kann also auf die vollen <b>60.000 €</b> in Anspruch genommen werden und anschließend bei den Mitgesellschaftern Ausgleich verlangen.",
      explanation: "Die Höhe der Einlage spielt für die Außenhaftung in der OHG keine Rolle."
    }),
    Q({
      id: "wiso-unternehmen-015", type: "multi", difficulty: 2, points: 3,
      question: "Welche <b>zwei</b> Aussagen zur <b>Prokura</b> sind richtig?",
      options: [
        "Die Prokura muss ausdrücklich erteilt und zur Eintragung ins Handelsregister angemeldet werden.",
        "Die Prokura kann von jedem Kleingewerbetreibenden erteilt werden.",
        "Der Prokurist unterschreibt mit dem Zusatz „ppa.“",
        "Eine im Innenverhältnis vereinbarte Beschränkung (z. B. nur Geschäfte bis 10.000 €) ist auch gegenüber Dritten wirksam.",
        "Ein Prokurist darf ohne Weiteres weitere Prokuren erteilen."
      ],
      correct: [0, 2],
      solution: "Prokura kann nur ein <b>Kaufmann</b> (bzw. dessen gesetzlicher Vertreter) <b>ausdrücklich</b> erteilen (§ 48 HGB); sie ist zur Eintragung anzumelden (Wirkung deklaratorisch, § 53 HGB). Zeichnung mit <b>„ppa.“</b> (per procura).",
      explanation: "Beschränkungen des Umfangs sind Dritten gegenüber unwirksam (§ 50 HGB) – nur Gesamt- oder Filialprokura sind eintragungsfähige Einschränkungen."
    }),
    Q({
      id: "wiso-unternehmen-016", type: "multi", difficulty: 1, points: 3,
      question: "Welche <b>zwei</b> Rechtsformen sind <b>Kapitalgesellschaften</b>?",
      options: ["Offene Handelsgesellschaft (OHG)", "Gesellschaft mit beschränkter Haftung (GmbH)", "Kommanditgesellschaft (KG)", "Aktiengesellschaft (AG)", "Gesellschaft bürgerlichen Rechts (GbR)"],
      correct: [1, 3],
      solution: "<b>GmbH</b> (inkl. UG) und <b>AG</b> (sowie KGaA) sind Kapitalgesellschaften: juristische Personen, Haftung nur mit dem Gesellschaftsvermögen, Leitung durch Organe (Fremdorganschaft möglich), Eintragung in HR Abt. B.",
      explanation: "OHG, KG und GbR sind Personengesellschaften mit persönlicher Haftung mindestens eines Gesellschafters."
    }),
    Q({
      id: "wiso-unternehmen-017", type: "order", difficulty: 3, points: 4,
      context: "Ein Kunde der InnoSoft GmbH, die DigiTrade GmbH, ist zahlungsunfähig.",
      question: "Bringen Sie die Schritte des Regelinsolvenzverfahrens in die richtige Reihenfolge.",
      items: [
        "Insolvenzantrag durch den Geschäftsführer (spätestens 3 Wochen nach Eintritt der Zahlungsunfähigkeit) oder einen Gläubiger",
        "Eröffnungsverfahren mit Bestellung eines vorläufigen Insolvenzverwalters",
        "Eröffnungsbeschluss des Insolvenzgerichts (sofern genügend Masse vorhanden)",
        "Anmeldung der Forderungen durch die Gläubiger beim Insolvenzverwalter",
        "Verwertung der Insolvenzmasse bzw. Umsetzung eines Insolvenzplans",
        "Verteilung des Erlöses an die Gläubiger (Insolvenzquote) und Aufhebung des Verfahrens"
      ],
      solution: "Antrag (§ 15a InsO) → Prüfung durch das Insolvenzgericht (Amtsgericht) mit vorläufigem Verwalter → Eröffnung oder Abweisung mangels Masse → Forderungsanmeldung (Tabelle) → Berichts-/Prüfungstermin, Verwertung oder Insolvenzplan → Schlussverteilung (Quote) → Aufhebung.",
      explanation: "Vor der Quote werden Aussonderungsrechte (fremdes Eigentum, z. B. Eigentumsvorbehalt) und Absonderungsrechte (Sicherungsübereignung) bedient."
    }),
    Q({
      id: "wiso-unternehmen-018", type: "mc", difficulty: 2, points: 2,
      context: "Die InnoSoft GmbH hat der DigiTrade GmbH (siehe Insolvenzfall) Server unter <b>Eigentumsvorbehalt</b> geliefert, die noch nicht bezahlt sind. Die Server stehen noch unverändert bei der DigiTrade.",
      question: "Welches Recht hat die InnoSoft GmbH im Insolvenzverfahren?",
      options: [
        "Sie erhält nur die Insolvenzquote wie alle anderen Gläubiger.",
        "Sie kann die Herausgabe der Server verlangen (Aussonderung).",
        "Sie muss die Server dem Insolvenzverwalter schenken.",
        "Sie kann vom Geschäftsführer persönlich Zahlung verlangen.",
        "Sie hat keine Rechte, da der Eigentumsvorbehalt mit der Insolvenz erlischt."
      ],
      correct: [1],
      solution: "Unter Eigentumsvorbehalt gelieferte Ware bleibt bis zur vollständigen Bezahlung <b>Eigentum des Verkäufers</b>. Sie gehört nicht zur Insolvenzmasse; der Verkäufer hat ein <b>Aussonderungsrecht</b> (§ 47 InsO), sofern der Insolvenzverwalter nicht Erfüllung wählt (§ 107 InsO).",
      explanation: "Der Eigentumsvorbehalt erlischt nur, wenn die Ware z. B. weiterverkauft, verarbeitet oder fest verbaut wurde."
    }),
    Q({
      id: "wiso-unternehmen-019", type: "mc", difficulty: 2, points: 2,
      context: "Die „Schneider IT-Service e.K.“ wird von Herrn Bauer gekauft. Er möchte den eingeführten Firmennamen mit Zustimmung des bisherigen Inhabers weiterführen.",
      question: "Welcher Firmengrundsatz ermöglicht dies?",
      options: ["Firmenwahrheit", "Firmenausschließlichkeit", "Firmenbeständigkeit", "Firmenöffentlichkeit", "Firmenklarheit"],
      correct: [2],
      solution: "<b>Firmenbeständigkeit</b> (§ 22 HGB): Bei Erwerb eines Handelsgeschäfts darf die bisherige Firma mit Einwilligung des bisherigen Inhabers (ggf. mit Nachfolgezusatz) fortgeführt werden – der aufgebaute Ruf (Goodwill) bleibt erhalten.",
      explanation: "Firmenausschließlichkeit (§ 30 HGB): Jede neue Firma muss sich von anderen am selben Ort deutlich unterscheiden."
    }),
    Q({
      id: "wiso-unternehmen-020", type: "text", difficulty: 2, points: 6,
      context: "Die InnoSoft GmbH bringt eine neue App zur digitalen Zeiterfassung für Handwerksbetriebe auf den Markt.",
      question: "Erläutern Sie die vier Instrumente des <b>Marketing-Mix</b> und nennen Sie zu jedem Instrument eine konkrete Maßnahme für die neue App.",
      solution: "<ul><li><b>Produktpolitik</b> (Product): Gestaltung des Leistungsangebots – z. B. Offline-Modus, einfache Bedienung, Schnittstelle zur Lohnabrechnung, Support, regelmäßige Updates.</li><li><b>Preispolitik</b> (Price): Preisgestaltung und Konditionen – z. B. Abo-Modell pro Nutzer/Monat, kostenlose Testphase (Freemium), Mengenrabatt, Jahresrabatt.</li><li><b>Distributionspolitik</b> (Place): Vertriebswege – z. B. App Stores, Direktvertrieb über die Website, Vertriebspartner (Handwerkskammern, Branchensoftware-Händler).</li><li><b>Kommunikationspolitik</b> (Promotion): Werbung, Verkaufsförderung, PR – z. B. Social-Media-Kampagne, Messeauftritt, Online-Werbung, Webinare, Referenzkunden.</li></ul>",
      keywords: ["produkt", "preis", "distribution|vertrieb|place", "kommunikation|werbung|promotion", "abo|rabatt|testphase|freemium", "app store|website|online"],
      explanation: "Die vier Instrumente müssen aufeinander abgestimmt sein (z. B. Premium-Produkt ↔ hoher Preis ↔ hochwertige Kommunikation)."
    })
  );
})();

// ---------------------------------------------------------------------------
// Fragen: wiso-vertragsrecht
// ---------------------------------------------------------------------------
(function () {
  const Q = (o) => Object.assign({ part: "WISO", topic: "wiso-vertragsrecht" }, o);
  const CTX = "Die <b>InnoSoft GmbH</b> in Karlsruhe entwickelt Software und verkauft zusätzlich Hardware an Geschäfts- und Privatkunden.";
  AP2.questions.push(
    Q({
      id: "wiso-vertragsrecht-001", type: "mc", difficulty: 1, points: 2,
      context: "Der 6-jährige Leon kauft im Elektronikmarkt mit seinem eigenen Taschengeld ein Spiel für 15 €.",
      question: "Wie ist der Kaufvertrag rechtlich zu beurteilen?",
      options: [
        "Wirksam nach dem Taschengeldparagraphen",
        "Schwebend unwirksam bis zur Genehmigung der Eltern",
        "Nichtig, da Leon geschäftsunfähig ist",
        "Anfechtbar durch die Eltern innerhalb eines Jahres",
        "Wirksam, da der Betrag gering ist"
      ],
      correct: [2],
      solution: "Kinder <b>unter 7 Jahren</b> sind <b>geschäftsunfähig</b> (§ 104 Nr. 1 BGB). Ihre Willenserklärungen sind <b>nichtig</b> (§ 105 BGB) – auch eine Genehmigung der Eltern kann das nicht heilen. Der Taschengeldparagraph (§ 110) gilt erst für beschränkt Geschäftsfähige (7–17 Jahre).",
      explanation: "Kinder unter 7 können nur als Bote der Eltern einkaufen."
    }),
    Q({
      id: "wiso-vertragsrecht-002", type: "mc", difficulty: 2, points: 3,
      context: "Die 16-jährige Auszubildende Sophie schließt ohne Wissen ihrer Eltern einen Ratenkaufvertrag über ein Smartphone ab (12 Raten à 40 €), die sie von ihrem Taschengeld bezahlen will.",
      question: "Wie ist der Vertrag zu beurteilen?",
      options: [
        "Wirksam nach § 110 BGB, da sie die Raten vom Taschengeld zahlt",
        "Wirksam, da Sophie als Auszubildende voll geschäftsfähig ist",
        "Nichtig, da Minderjährige keine Ratenverträge schließen dürfen",
        "Schwebend unwirksam; er wird erst mit Genehmigung der Eltern wirksam",
        "Wirksam, kann aber von Sophie innerhalb von 14 Tagen widerrufen werden"
      ],
      correct: [3],
      solution: "Sophie ist <b>beschränkt geschäftsfähig</b> (§ 106 BGB). Ohne Einwilligung ist der Vertrag <b>schwebend unwirksam</b> (§ 108 BGB). § 110 BGB greift nicht, weil die Leistung <b>nicht sofort vollständig</b> mit eigenen Mitteln bewirkt wird (Ratenkauf). Fordert der Händler die Eltern zur Genehmigung auf, gilt sie nach 2 Wochen Schweigen als verweigert.",
      explanation: "§ 113 BGB (Ermächtigung zum Arbeitsverhältnis) gilt nicht für Ausbildungsverhältnisse."
    }),
    Q({
      id: "wiso-vertragsrecht-003", type: "mc", difficulty: 2, points: 3,
      context: CTX + " Im Online-Shop bietet sie ein Notebook für 899 € an. Ein Kunde legt es in den Warenkorb und klickt auf „zahlungspflichtig bestellen“. Sofort erhält er eine automatische E-Mail „Wir haben Ihre Bestellung erhalten“. Zwei Tage später folgt die Versandbestätigung.",
      question: "Wann ist der Kaufvertrag zustande gekommen?",
      options: [
        "Bereits mit dem Einstellen des Notebooks in den Online-Shop",
        "Mit dem Ablegen im Warenkorb",
        "Mit dem Klick auf „zahlungspflichtig bestellen“",
        "Mit der automatischen Eingangsbestätigung",
        "Mit der Versandbestätigung (bzw. Lieferung) als Annahme des Kundenantrags"
      ],
      correct: [4],
      solution: "Das Angebot im Online-Shop ist eine <b>Aufforderung zur Abgabe eines Angebots</b> (invitatio ad offerendum). Die Bestellung des Kunden ist der <b>Antrag</b>. Die automatische Eingangsbestätigung (§ 312i BGB) ist i. d. R. <b>keine Annahme</b>. Die <b>Annahme</b> erfolgt mit der Auftrags-/Versandbestätigung oder der Lieferung.",
      explanation: "So schützt sich der Händler vor Preisfehlern und Lieferengpässen. Formuliert die Eingangsbestätigung „Wir führen Ihren Auftrag aus“, kann sie bereits Annahme sein."
    }),
    Q({
      id: "wiso-vertragsrecht-004", type: "mc", difficulty: 2, points: 2,
      context: CTX + " Ein Kunde beauftragt die InnoSoft GmbH, eine individuelle Lagerverwaltungs-App zu entwickeln. Vereinbart sind ein Festpreis, ein Pflichtenheft und eine Abnahme.",
      question: "Um welche Vertragsart handelt es sich?",
      options: ["Dienstvertrag", "Kaufvertrag", "Werkvertrag", "Mietvertrag", "Leihvertrag"],
      correct: [2],
      solution: "Beim <b>Werkvertrag</b> (§ 631 BGB) schuldet der Unternehmer einen <b>Erfolg</b> (funktionsfähige Software gemäß Pflichtenheft); der Besteller muss das Werk <b>abnehmen</b> (§ 640) und die Vergütung zahlen. Mängelrechte: Nacherfüllung, Selbstvornahme, Rücktritt, Minderung, Schadensersatz.",
      explanation: "Beim Dienstvertrag (§ 611) wird nur die Tätigkeit geschuldet (z. B. Beratung oder Entwicklerstunden nach Aufwand ohne Erfolgsgarantie)."
    }),
    Q({
      id: "wiso-vertragsrecht-005", type: "mc", difficulty: 2, points: 2,
      context: CTX + " Die InnoSoft GmbH stellt einem Kunden gegen eine monatliche Gebühr einen virtuellen Server in ihrem Rechenzentrum zur Nutzung zur Verfügung.",
      question: "Welche Vertragsart liegt im Kern vor?",
      options: ["Leihvertrag", "Mietvertrag", "Kaufvertrag", "Darlehensvertrag", "Schenkungsvertrag"],
      correct: [1],
      solution: "Die <b>entgeltliche</b> Überlassung einer Sache bzw. Ressource zum <b>Gebrauch</b> auf Zeit ist ein <b>Mietvertrag</b> (§ 535 BGB). Auch SaaS-/Hosting-Verträge werden überwiegend als Mietverträge eingeordnet.",
      explanation: "Leihe = unentgeltliche Gebrauchsüberlassung; Pacht = Gebrauch + Fruchtziehung (Ertrag)."
    }),
    Q({
      id: "wiso-vertragsrecht-006", type: "mc", difficulty: 2, points: 3,
      context: CTX + " Ein Vertriebsmitarbeiter schreibt in einem Angebot versehentlich „1.500 €“ statt „15.000 €“ für ein Softwareprojekt. Der Kunde nimmt sofort an.",
      question: "Welche Möglichkeit hat die InnoSoft GmbH?",
      options: [
        "Keine, der Vertrag ist zu 1.500 € wirksam und kann nicht beseitigt werden.",
        "Der Vertrag ist automatisch zu 15.000 € zustande gekommen.",
        "Sie kann den Vertrag wegen Erklärungsirrtums unverzüglich anfechten; ggf. muss sie dem Kunden den Vertrauensschaden ersetzen.",
        "Sie kann den Vertrag innerhalb eines Jahres wegen arglistiger Täuschung anfechten.",
        "Der Vertrag ist nichtig, weil er sittenwidrig ist."
      ],
      correct: [2],
      solution: "Ein Verschreiben/Vertippen ist ein <b>Erklärungsirrtum</b> (§ 119 Abs. 1 BGB): Der Erklärende wollte eine Erklärung dieses Inhalts nicht abgeben. Die Anfechtung muss <b>unverzüglich</b> (ohne schuldhaftes Zögern, § 121) erfolgen; der Vertrag ist dann von Anfang an nichtig (§ 142). Der Anfechtende ersetzt dem Gegner den <b>Vertrauensschaden</b> (§ 122).",
      explanation: "Abgrenzung: Ein interner Kalkulationsfehler (falsch gerechnete Stundenzahl) wäre ein unbeachtlicher Motivirrtum."
    }),
    Q({
      id: "wiso-vertragsrecht-007", type: "mc", difficulty: 2, points: 2,
      context: CTX + " Bestellt wurden 20 Monitore mit 27 Zoll. Geliefert werden 20 Monitore mit 24 Zoll.",
      question: "Welche Art der Leistungsstörung liegt vor?",
      options: [
        "Lieferungsverzug",
        "Annahmeverzug",
        "Mangelhafte Lieferung (Falschlieferung/Sachmangel)",
        "Rechtsmangel",
        "Zahlungsverzug"
      ],
      correct: [2],
      solution: "Die Lieferung einer <b>anderen Sache</b> (aliud) steht einem <b>Sachmangel</b> gleich (§ 434 Abs. 5 BGB). Es gelten die Mängelrechte des § 437 BGB (vorrangig Nacherfüllung). Beim zweiseitigen Handelskauf muss unverzüglich gerügt werden (§ 377 HGB).",
      explanation: "Weitere Mangelarten: Zuweniglieferung (Quantitätsmangel), fehlerhafte Montage/Montageanleitung, fehlende Updates bei digitalen Elementen."
    }),
    Q({
      id: "wiso-vertragsrecht-008", type: "mc", difficulty: 2, points: 3,
      context: CTX + " Die InnoSoft GmbH erhält von einem Großhändler eine Lieferung von 50 SSDs. Sie lagert die Kartons ungeöffnet ein. Sechs Wochen später stellt sich heraus, dass 10 SSDs sichtbar beschädigte Anschlüsse haben.",
      question: "Wie ist die Rechtslage?",
      options: [
        "Die InnoSoft GmbH kann innerhalb der zweijährigen Gewährleistung noch problemlos Nacherfüllung verlangen.",
        "Die Ware gilt als genehmigt, da es sich um einen beiderseitigen Handelskauf handelt und offene Mängel nicht unverzüglich gerügt wurden.",
        "Der Großhändler muss die SSDs austauschen, da er die Beweislast trägt.",
        "Die InnoSoft GmbH kann sofort vom Vertrag zurücktreten.",
        "Die Rügefrist beträgt beim Handelskauf generell 14 Tage."
      ],
      correct: [1],
      solution: "Beim <b>zweiseitigen Handelskauf</b> (beide Kaufleute) muss der Käufer die Ware <b>unverzüglich nach Ablieferung untersuchen</b> und offene Mängel <b>unverzüglich rügen</b> (<b>§ 377 HGB</b>). Unterlässt er dies, gilt die Ware als <b>genehmigt</b> – Mängelrechte entfallen. Versteckte Mängel sind unverzüglich nach Entdeckung zu rügen.",
      explanation: "„Unverzüglich“ heißt ohne schuldhaftes Zögern – in der Regel wenige Tage, keine feste 14-Tage-Frist."
    }),
    Q({
      id: "wiso-vertragsrecht-009", type: "mc", difficulty: 1, points: 2,
      context: "Ein Privatkunde hat bei der InnoSoft GmbH einen Laptop gekauft. Nach drei Monaten fällt das Display aus. Der Kunde verlangt sofort sein Geld zurück.",
      question: "Welches Recht muss der Kunde grundsätzlich <b>zuerst</b> geltend machen?",
      options: ["Rücktritt vom Vertrag", "Minderung des Kaufpreises", "Nacherfüllung (Reparatur oder Ersatzlieferung)", "Schadensersatz statt der Leistung", "Anfechtung wegen Irrtums"],
      correct: [2],
      solution: "Nach §§ 437, 439 BGB hat die <b>Nacherfüllung Vorrang</b>: Der Käufer wählt zwischen <b>Nachbesserung</b> (Reparatur) und <b>Ersatzlieferung</b>. Erst wenn eine angemessene Frist erfolglos abläuft, die Nacherfüllung verweigert wird oder fehlschlägt (Nachbesserung i. d. R. nach dem 2. erfolglosen Versuch, § 440), kann er zurücktreten, mindern oder Schadensersatz verlangen.",
      explanation: "Beim Verbrauchsgüterkauf wird im ersten Jahr vermutet, dass der Mangel schon bei Übergabe vorlag (§ 477 BGB)."
    }),
    Q({
      id: "wiso-vertragsrecht-010", type: "mc", difficulty: 2, points: 3,
      context: CTX + " Mit einem Lieferanten wurde für 20 neue Notebooks vertraglich die Lieferung „am 15.11.2026“ vereinbart (kein Fixgeschäft). Am 16.11. ist die Ware nicht da.",
      question: "Welche Aussage ist richtig?",
      options: [
        "Der Lieferant ist erst nach einer Mahnung in Verzug.",
        "Der Lieferant ist ohne Mahnung in Verzug, da der Liefertermin kalendermäßig bestimmt ist; ein Rücktritt setzt aber grundsätzlich eine angemessene Nachfrist voraus.",
        "Die InnoSoft GmbH kann sofort vom Vertrag zurücktreten und Schadensersatz verlangen, ohne Frist zu setzen.",
        "Der Lieferant ist nur dann in Verzug, wenn die InnoSoft GmbH bereits bezahlt hat.",
        "Ein Lieferungsverzug liegt erst 30 Tage nach dem Liefertermin vor."
      ],
      correct: [1],
      solution: "Voraussetzungen des Lieferungsverzugs: Fälligkeit, Nichtleistung, <b>Mahnung</b> – diese ist <b>entbehrlich</b>, wenn die Leistungszeit nach dem Kalender bestimmt ist (§ 286 Abs. 2 Nr. 1 BGB) – und Verschulden (für Schadensersatz). Rücktritt und Schadensersatz statt der Leistung erfordern grundsätzlich eine erfolglose <b>angemessene Nachfrist</b> (§§ 323, 281 BGB).",
      explanation: "Nur beim Fixkauf („fix“, „spätestens am …“ mit Interessewegfall) ist ein sofortiger Rücktritt möglich. Die 30-Tage-Regel gilt für Zahlungsverzug."
    }),
    Q({
      id: "wiso-vertragsrecht-011", type: "mc", difficulty: 2, points: 2,
      context: CTX + " Ein Geschäftskunde verweigert ohne Grund die Annahme von ordnungsgemäß gelieferten Druckern.",
      question: "Welches Recht steht der InnoSoft GmbH im Annahmeverzug zu?",
      options: [
        "Sie darf die Drucker vernichten.",
        "Sie kann die Ware nach Androhung öffentlich versteigern lassen (Selbsthilfeverkauf).",
        "Sie haftet ab sofort auch für leichte Fahrlässigkeit verschärft.",
        "Sie muss die Ware auf eigene Kosten erneut liefern.",
        "Sie verliert ihren Anspruch auf den Kaufpreis."
      ],
      correct: [1],
      solution: "Beim <b>Annahmeverzug</b> des Käufers (§§ 293 ff. BGB, § 373 HGB) kann der Verkäufer: die Ware auf Kosten und Gefahr des Käufers <b>hinterlegen</b>, nach Androhung einen <b>Selbsthilfeverkauf</b> (öffentliche Versteigerung bzw. freihändiger Verkauf bei Börsen-/Marktpreis) durchführen, auf Abnahme klagen oder zurücktreten. Er haftet nur noch für Vorsatz und grobe Fahrlässigkeit (§ 300) und kann Mehraufwendungen ersetzt verlangen (§ 304).",
      explanation: "Der Kaufpreisanspruch bleibt bestehen."
    }),
    Q({
      id: "wiso-vertragsrecht-012", type: "mc", difficulty: 1, points: 2,
      question: "Worin unterscheidet sich die <b>Garantie</b> von der gesetzlichen <b>Gewährleistung</b> (Mängelhaftung)?",
      options: [
        "Die Garantie ist gesetzlich vorgeschrieben und gilt immer 2 Jahre.",
        "Die Gewährleistung ist eine freiwillige Leistung des Herstellers.",
        "Die Garantie ist eine freiwillige, vertragliche Zusage (oft des Herstellers), die zusätzlich zur gesetzlichen Gewährleistung des Verkäufers gilt.",
        "Die Garantie ersetzt die Gewährleistung vollständig.",
        "Gewährleistung gibt es nur bei Privatkunden."
      ],
      correct: [2],
      solution: "<b>Gewährleistung</b>: gesetzlicher Anspruch gegen den <b>Verkäufer</b> (§§ 434 ff. BGB), 2 Jahre ab Ablieferung, für Mängel bei Gefahrübergang. <b>Garantie</b> (§ 443 BGB): <b>freiwillig</b> vertraglich vereinbart, Inhalt/Dauer frei bestimmbar, meist vom Hersteller; sie tritt <b>neben</b> die Gewährleistung.",
      explanation: "Gegenüber Verbrauchern darf die Gewährleistung bei Neuware nicht ausgeschlossen werden."
    }),
    Q({
      id: "wiso-vertragsrecht-013", type: "numeric", difficulty: 3, points: 4,
      context: CTX + " Ein Geschäftskunde (kein Verbraucher) zahlt eine fällige Rechnung über 12.000 € nicht. Er befindet sich seit 45 Tagen im Zahlungsverzug. Für die Aufgabe gilt: Basiszinssatz 1,27 %; Zinsberechnung kaufmännisch (360 Tage).",
      question: "Berechnen Sie die gesetzlichen Verzugszinsen für die 45 Tage (ohne Verzugspauschale).",
      answer: 154.05, tolerance: 0.02, unit: "€",
      solution: "Zinssatz bei Rechtsgeschäften ohne Verbraucherbeteiligung: Basiszinssatz + <b>9 Prozentpunkte</b> (§ 288 Abs. 2 BGB) = 1,27 % + 9 % = 10,27 %<br>Zinsen = 12.000 € · 10,27 · 45 ÷ (100 · 360) = <b>154,05 €</b><br>Zusätzlich: Verzugspauschale 40 € (§ 288 Abs. 5 BGB).",
      explanation: "Bei Verbrauchern: Basiszinssatz + 5 Prozentpunkte. Falle: „9 %“ sind Prozentpunkte, nicht 9 % vom Basiszinssatz."
    }),
    Q({
      id: "wiso-vertragsrecht-014", type: "numeric", difficulty: 2, points: 3,
      context: CTX + " Eine Forderung der InnoSoft GmbH aus einem Softwareprojekt gegen einen Kunden ist am 10.05.2026 entstanden und fällig geworden. Die Geschäftsführung kennt den Schuldner. Es gibt keine Hemmung oder einen Neubeginn.",
      question: "Mit Ablauf welchen Jahres ist die Forderung verjährt? (Jahreszahl eingeben)",
      answer: 2029, tolerance: 0, unit: "",
      solution: "Regelmäßige Verjährung <b>3 Jahre</b> (§ 195 BGB), Beginn mit dem <b>Schluss des Jahres</b>, in dem der Anspruch entstanden ist und der Gläubiger Kenntnis erlangt hat (§ 199 BGB): Beginn 31.12.2026, 24:00 Uhr → Ende <b>31.12.2029</b>, 24:00 Uhr.",
      explanation: "Falle: nicht 10.05.2029. Ein Mahnbescheid vor Ablauf würde die Verjährung hemmen, eine Abschlagszahlung des Schuldners sie neu beginnen lassen."
    }),
    Q({
      id: "wiso-vertragsrecht-015", type: "numeric", difficulty: 3, points: 4,
      context: CTX + " Die InnoSoft GmbH kaufte einen Konferenzraum-Bildschirm für 2.000 € netto. Der Bildschirm hat einen Pixelfehler, den der Verkäufer nicht beheben kann. Im mangelfreien Zustand wäre der Bildschirm 2.400 € wert, im mangelhaften Zustand 1.800 €. Die InnoSoft GmbH entscheidet sich für die Minderung.",
      question: "Berechnen Sie den geminderten Kaufpreis.",
      answer: 1500, tolerance: 0.01, unit: "€",
      solution: "§ 441 Abs. 3 BGB: Der Kaufpreis wird in dem Verhältnis herabgesetzt, in dem der Wert der mangelfreien Sache zum wirklichen Wert steht.<br>Geminderter Preis = 2.000 € · 1.800 € ÷ 2.400 € = <b>1.500 €</b> (Minderung um 25 % = 500 €).",
      explanation: "Häufiger Fehler: einfach die Wertdifferenz (600 €) abziehen → 1.400 €."
    }),
    Q({
      id: "wiso-vertragsrecht-016", type: "multi", difficulty: 2, points: 3,
      question: "Welche <b>zwei</b> Rechtsgeschäfte sind <b>nichtig</b>?",
      options: [
        "Ein 5-Jähriger kauft einen USB-Stick für 8 €.",
        "Ein Kunde wird beim Kauf über die Laufleistung eines gebrauchten Servers arglistig getäuscht.",
        "Ein Grundstück für ein neues Bürogebäude wird mit privatschriftlichem Vertrag gekauft.",
        "Ein 16-Jähriger schließt ohne Zustimmung der Eltern einen Handyvertrag ab.",
        "Ein Notebook wird mündlich im Laden gekauft."
      ],
      correct: [0, 2],
      solution: "Nichtig: Willenserklärung eines <b>Geschäftsunfähigen</b> (§ 105 BGB) und <b>Formmangel</b> – Grundstückskaufverträge bedürfen der <b>notariellen Beurkundung</b> (§ 311b, § 125 BGB).",
      explanation: "Arglistige Täuschung → <b>anfechtbar</b> (§ 123, binnen 1 Jahr); 16-Jähriger ohne Zustimmung → <b>schwebend unwirksam</b>; mündlicher Kauf → wirksam (Formfreiheit)."
    }),
    Q({
      id: "wiso-vertragsrecht-017", type: "multi", difficulty: 2, points: 3,
      context: CTX + " Die InnoSoft GmbH least zehn Notebooks bei der LeaseIT AG. Ein elftes Notebook wurde aus dem Büro gestohlen.",
      question: "Welche <b>zwei</b> Aussagen zu Eigentum und Besitz sind richtig?",
      options: [
        "Die InnoSoft GmbH ist Besitzerin, die LeaseIT AG Eigentümerin der geleasten Notebooks.",
        "Die InnoSoft GmbH ist Eigentümerin der geleasten Notebooks, weil sie die Raten zahlt.",
        "Der Dieb ist Besitzer, aber nicht Eigentümer des gestohlenen Notebooks.",
        "Der Dieb wird mit der Wegnahme Eigentümer.",
        "Besitz bedeutet die rechtliche Herrschaft über eine Sache."
      ],
      correct: [0, 2],
      solution: "<b>Eigentum</b> = rechtliche Herrschaft (§ 903 BGB), <b>Besitz</b> = tatsächliche Herrschaft (§ 854 BGB). Leasingnehmer und Dieb haben die tatsächliche Gewalt (Besitz), Eigentümer bleiben Leasinggeber bzw. Bestohlener.",
      explanation: "An gestohlenen Sachen ist auch ein gutgläubiger Erwerb ausgeschlossen (§ 935 BGB)."
    }),
    Q({
      id: "wiso-vertragsrecht-018", type: "order", difficulty: 2, points: 4,
      context: CTX + " Ein Kunde zahlt eine Rechnung trotz mehrerer Mahnungen nicht. Die InnoSoft GmbH leitet das gerichtliche Mahnverfahren ein.",
      question: "Bringen Sie die Schritte des gerichtlichen Mahnverfahrens in die richtige Reihenfolge.",
      items: [
        "Antrag auf Erlass eines Mahnbescheids beim zentralen Mahngericht",
        "Zustellung des Mahnbescheids an den Schuldner",
        "Ablauf der Widerspruchsfrist von 2 Wochen ohne Widerspruch",
        "Antrag auf Erlass des Vollstreckungsbescheids",
        "Zustellung des Vollstreckungsbescheids; Ablauf der Einspruchsfrist von 2 Wochen",
        "Zwangsvollstreckung, z. B. Pfändung durch den Gerichtsvollzieher"
      ],
      solution: "Mahnbescheid beantragen (online, Gericht prüft die Forderung nicht) → Zustellung → 2 Wochen Widerspruchsfrist → Vollstreckungsbescheid beantragen (innerhalb von 6 Monaten) → Zustellung, 2 Wochen Einspruchsfrist → vollstreckbarer Titel → Zwangsvollstreckung.",
      explanation: "Bei Widerspruch oder Einspruch geht das Verfahren in ein streitiges Gerichtsverfahren über."
    }),
    Q({
      id: "wiso-vertragsrecht-019", type: "mc", difficulty: 1, points: 2,
      context: "Eine Privatkundin bestellt am 02.11.2026 im Online-Shop der InnoSoft GmbH eine Webcam. Sie erhält die Ware am 05.11.2026 und wurde ordnungsgemäß über ihr Widerrufsrecht belehrt.",
      question: "Welche Aussage zum Widerrufsrecht ist richtig?",
      options: [
        "Sie kann innerhalb von 14 Tagen ab Erhalt der Ware ohne Angabe von Gründen widerrufen.",
        "Sie kann innerhalb von 14 Tagen ab Bestellung nur bei einem Mangel widerrufen.",
        "Ein Widerrufsrecht besteht im Online-Handel nur, wenn der Händler es freiwillig einräumt.",
        "Die Widerrufsfrist beträgt 30 Tage.",
        "Der Widerruf ist nur durch kommentarloses Zurücksenden der Ware möglich."
      ],
      correct: [0],
      solution: "Bei <b>Fernabsatzverträgen</b> zwischen Unternehmer und Verbraucher besteht ein <b>Widerrufsrecht von 14 Tagen</b> (§§ 312g, 355 BGB), bei Waren beginnend mit dem <b>Erhalt</b> (§ 356 Abs. 2) – hier bis einschließlich 19.11.2026. Der Widerruf muss eindeutig erklärt werden (z. B. E-Mail, Formular, Widerrufsfunktion), eine Begründung ist nicht nötig.",
      explanation: "Kommentarloses Zurücksenden reicht seit 2014 nicht mehr aus. Ohne Belehrung verlängert sich die Frist auf max. 12 Monate und 14 Tage."
    }),
    Q({
      id: "wiso-vertragsrecht-020", type: "mc", difficulty: 2, points: 2,
      context: CTX + " In den AGB der InnoSoft GmbH steht „Lieferzeit ca. 4 Wochen“. Im Angebot an einen Kunden wurde individuell eine Lieferung „innerhalb von 10 Tagen“ zugesagt.",
      question: "Welche Lieferzeit gilt?",
      options: [
        "4 Wochen, weil AGB immer Vorrang haben",
        "10 Tage, weil Individualabreden Vorrang vor AGB haben",
        "Keine – der Vertrag ist wegen widersprüchlicher Angaben nichtig",
        "Die gesetzliche Lieferzeit von 30 Tagen",
        "Der Durchschnitt beider Angaben"
      ],
      correct: [1],
      solution: "<b>§ 305b BGB</b>: <b>Individuelle Vertragsabreden</b> haben Vorrang vor Allgemeinen Geschäftsbedingungen.",
      explanation: "Weitere AGB-Regeln: überraschende Klauseln werden nicht Vertragsbestandteil (§ 305c), unklare Klauseln gehen zulasten des Verwenders, Inhaltskontrolle nach §§ 307–309."
    }),
    Q({
      id: "wiso-vertragsrecht-021", type: "text", difficulty: 3, points: 6,
      context: CTX + " Ein Hardwarelieferant liefert bestellte Firewalls nicht zum vereinbarten Termin. Die InnoSoft GmbH benötigt die Geräte dringend für ein Kundenprojekt.",
      question: "Nennen Sie die Voraussetzungen des <b>Lieferungsverzugs</b> und erläutern Sie die Rechte der InnoSoft GmbH (mit und ohne Nachfrist).",
      solution: "<b>Voraussetzungen</b> (§ 286 BGB): <ul><li><b>Fälligkeit</b> der Lieferung und Nichtleistung</li><li><b>Mahnung</b> – entbehrlich bei kalendermäßig bestimmtem/bestimmbarem Termin, ernsthafter Verweigerung oder Fixgeschäft</li><li><b>Verschulden</b> des Lieferers (Vorsatz/Fahrlässigkeit) – nur für Schadensersatzansprüche erforderlich</li></ul><b>Rechte</b>:<ul><li><b>Ohne Nachfrist</b>: auf Lieferung bestehen (Erfüllung) und zusätzlich Ersatz des <b>Verzögerungsschadens</b> verlangen (§ 280 Abs. 2, § 286), z. B. Vertragsstrafe gegenüber dem Endkunden.</li><li><b>Nach Ablauf einer angemessenen Nachfrist</b>: Lieferung ablehnen und <b>vom Vertrag zurücktreten</b> (§ 323, verschuldensunabhängig) und/oder <b>Schadensersatz statt der Leistung</b> verlangen (§ 281, z. B. Mehrkosten eines Deckungskaufs) bzw. Ersatz vergeblicher Aufwendungen.</li><li>Beim <b>Fixkauf</b> (§ 376 HGB) Rücktritt ohne Nachfrist.</li></ul>",
      keywords: ["fälligkeit|fällig", "mahnung", "verschulden", "nachfrist", "rücktritt", "schadensersatz", "verzögerungsschaden|verzugsschaden", "deckungskauf|fixkauf|kalendermäßig"],
      explanation: "Typischer Fehler: Rücktritt ohne Nachfrist – beim normalen Termingeschäft unzulässig."
    })
  );
})();

// ---------------------------------------------------------------------------
// Fragen: wiso-wirtschaft
// ---------------------------------------------------------------------------
(function () {
  const Q = (o) => Object.assign({ part: "WISO", topic: "wiso-wirtschaft" }, o);
  AP2.questions.push(
    Q({
      id: "wiso-wirtschaft-001", type: "mc", difficulty: 1, points: 2,
      question: "In welchem Beispiel handelt die InnoSoft GmbH nach dem <b>Maximalprinzip</b>?",
      options: [
        "Sie will ein festgelegtes Software-Release mit möglichst wenigen Entwicklerstunden fertigstellen.",
        "Sie will mit einem festen Marketingbudget von 20.000 € möglichst viele Neukunden gewinnen.",
        "Sie will mit möglichst geringem Aufwand einen möglichst hohen Gewinn erzielen.",
        "Sie will die Stromkosten des Rechenzentrums bei gleicher Leistung minimieren.",
        "Sie will einen Server zum niedrigsten Preis kaufen."
      ],
      correct: [1],
      solution: "<b>Maximalprinzip</b>: Mit <b>gegebenem Mitteleinsatz</b> (20.000 € Budget) soll ein <b>maximaler Erfolg</b> (möglichst viele Neukunden) erzielt werden.",
      explanation: "A, D, E = Minimalprinzip (Ziel fest, Mitteleinsatz minimieren). C ist unlogisch (beides gleichzeitig zu optimieren ist nicht möglich)."
    }),
    Q({
      id: "wiso-wirtschaft-002", type: "mc", difficulty: 1, points: 2,
      question: "Auf dem deutschen Mobilfunkmarkt stehen vielen Nachfragern nur wenige große Netzbetreiber gegenüber. Welche Marktform liegt vor?",
      options: ["Polypol", "Angebotsoligopol", "Angebotsmonopol", "Nachfragemonopol", "Bilaterales Monopol"],
      correct: [1],
      solution: "<b>Angebotsoligopol</b>: <b>wenige Anbieter</b>, viele Nachfrager. Typisch ist eine starke gegenseitige Abhängigkeit (Preisänderungen eines Anbieters lösen Reaktionen der Konkurrenten aus); Gefahr von Absprachen → Kartellaufsicht.",
      explanation: "Polypol: viele Anbieter und Nachfrager (z. B. Wochenmarkt); Monopol: ein Anbieter."
    }),
    Q({
      id: "wiso-wirtschaft-003", type: "mc", difficulty: 2, points: 2,
      question: "Der Staat legt für ein Gut einen <b>Höchstpreis unterhalb des Gleichgewichtspreises</b> fest. Welche Folge ist zu erwarten?",
      options: [
        "Ein Angebotsüberhang, da die Anbieter mehr produzieren",
        "Ein Nachfrageüberhang, da zu diesem Preis mehr nachgefragt als angeboten wird",
        "Der Markt bleibt im Gleichgewicht",
        "Der Preis steigt automatisch auf den Gleichgewichtspreis",
        "Die Nachfrage sinkt auf null"
      ],
      correct: [1],
      solution: "Unterhalb des Gleichgewichtspreises ist die nachgefragte Menge größer als die angebotene → <b>Nachfrageüberhang</b> (Knappheit, Wartelisten, Schwarzmärkte). Beispiel: Mietpreisbremse/Mietendeckel.",
      explanation: "Ein Mindestpreis über dem Gleichgewichtspreis (z. B. Agrarpreise) führt zu einem Angebotsüberhang."
    }),
    Q({
      id: "wiso-wirtschaft-004", type: "mc", difficulty: 2, points: 2,
      context: "Die Wirtschaftsnachrichten melden: Die Produktionskapazitäten sind voll ausgelastet, es herrscht Fachkräftemangel, die Preise und Löhne steigen stark, die Zinsen sind hoch.",
      question: "In welcher Konjunkturphase befindet sich die Wirtschaft?",
      options: ["Aufschwung (Expansion)", "Hochkonjunktur (Boom)", "Abschwung (Rezession)", "Tiefstand (Depression)", "Stagnation"],
      correct: [1],
      solution: "Merkmale der <b>Hochkonjunktur</b>: volle Kapazitätsauslastung, Vollbeschäftigung/Fachkräftemangel, stark steigende Preise und Löhne, hohe Zinsen, Unternehmensgewinne hoch – häufig kurz vor dem Umschwung.",
      explanation: "Im Aufschwung steigen Auftragseingänge und Produktion, die Kapazitäten sind aber noch nicht ausgelastet; Preise steigen moderat."
    }),
    Q({
      id: "wiso-wirtschaft-005", type: "mc", difficulty: 2, points: 2,
      question: "Welches Ziel gehört <b>nicht</b> zum „magischen Viereck“ des Stabilitäts- und Wachstumsgesetzes von 1967?",
      options: [
        "Stabilität des Preisniveaus",
        "Hoher Beschäftigungsstand",
        "Außenwirtschaftliches Gleichgewicht",
        "Stetiges und angemessenes Wirtschaftswachstum",
        "Gerechte Einkommens- und Vermögensverteilung"
      ],
      correct: [4],
      solution: "§ 1 StabG nennt vier Ziele: <b>Preisniveaustabilität, hoher Beschäftigungsstand, außenwirtschaftliches Gleichgewicht, stetiges und angemessenes Wachstum</b>. Die <b>gerechte Einkommens- und Vermögensverteilung</b> und der <b>Umweltschutz</b> ergänzen es zum „magischen Sechseck“.",
      explanation: "„Magisch“, weil nicht alle Ziele gleichzeitig erreichbar sind (Zielkonflikte)."
    }),
    Q({
      id: "wiso-wirtschaft-006", type: "mc", difficulty: 2, points: 2,
      question: "Die Europäische Zentralbank erhöht die Leitzinsen. Welche Wirkung soll damit in erster Linie erreicht werden?",
      options: [
        "Die Arbeitslosigkeit soll durch billigere Kredite gesenkt werden.",
        "Kredite werden teurer, die Nachfrage sinkt, und die Inflationsrate soll in Richtung 2 % zurückgeführt werden.",
        "Der Staat erhält mehr Steuereinnahmen.",
        "Die Exporte sollen durch einen schwächeren Euro steigen.",
        "Die Banken sollen mehr Kredite vergeben."
      ],
      correct: [1],
      solution: "Vorrangiges Ziel der EZB ist <b>Preisniveaustabilität</b> (Inflation mittelfristig <b>2 %</b>). Höhere Leitzinsen verteuern die Refinanzierung der Banken → höhere Kreditzinsen → weniger Investitionen und Konsum, mehr Sparen → sinkende Nachfrage → <b>Inflation sinkt</b> (restriktive Geldpolitik).",
      explanation: "Höhere Zinsen machen den Euro eher stärker, was Exporte verteuert."
    }),
    Q({
      id: "wiso-wirtschaft-007", type: "mc", difficulty: 2, points: 2,
      question: "Wer profitiert in der Regel von einer hohen, unerwarteten <b>Inflation</b>?",
      options: [
        "Sparer mit Guthaben auf dem Tagesgeldkonto",
        "Rentner mit fester Rente",
        "Schuldner mit einem Kredit zu festem Zinssatz",
        "Arbeitnehmer mit langfristig festen Löhnen",
        "Gläubiger, die Geld verliehen haben"
      ],
      correct: [2],
      solution: "Bei Inflation verliert Geld an Kaufkraft. <b>Schuldner</b> zahlen ihre Kredite mit „entwertetem“ Geld zurück – real sinkt ihre Schuld (besonders bei festem Zins unter der Inflationsrate). Verlierer sind Sparer, Gläubiger und Bezieher fester Einkommen.",
      explanation: "Der Staat als großer Schuldner profitiert ebenfalls (und über die „kalte Progression“)."
    }),
    Q({
      id: "wiso-wirtschaft-008", type: "mc", difficulty: 2, points: 2,
      question: "Welche Aussage zum <b>Bruttoinlandsprodukt (BIP)</b> ist richtig?",
      options: [
        "Es misst den Wert aller in einem Jahr im Inland produzierten Endprodukte (Waren und Dienstleistungen).",
        "Es misst nur die Produktion von Waren, nicht von Dienstleistungen.",
        "Es erfasst auch Hausarbeit und Ehrenamt.",
        "Das nominale BIP ist der beste Maßstab für das reale Wirtschaftswachstum.",
        "Es umfasst nur die Einkommen deutscher Staatsbürger weltweit."
      ],
      correct: [0],
      solution: "Das <b>BIP</b> ist der Wert aller in einer Periode <b>im Inland</b> (Inlandskonzept) erstellten Waren und Dienstleistungen, die als <b>Endprodukte</b> verwendet werden. Das Wirtschaftswachstum misst man am <b>realen</b> (preisbereinigten) BIP.",
      explanation: "Das Inländerkonzept (Einkommen der Inländer weltweit) ist das Bruttonationaleinkommen (BNE)."
    }),
    Q({
      id: "wiso-wirtschaft-009", type: "mc", difficulty: 2, points: 2,
      question: "Welche Maßnahme ist typisch für die <b>soziale</b> Komponente der sozialen Marktwirtschaft?",
      options: [
        "Freie Preisbildung am Markt",
        "Gewerbefreiheit",
        "Progressive Einkommensbesteuerung und gesetzliche Sozialversicherung",
        "Privateigentum an Produktionsmitteln",
        "Vertragsfreiheit"
      ],
      correct: [2],
      solution: "Die soziale Marktwirtschaft verbindet freien Wettbewerb mit <b>sozialem Ausgleich</b>: progressive Einkommensteuer (Umverteilung), <b>Sozialversicherung</b>, Arbeitnehmerschutzrechte, Kindergeld, Bürgergeld/Grundsicherung. Zusätzlich schützt der Staat den Wettbewerb (Kartellverbot).",
      explanation: "Die übrigen Optionen sind marktwirtschaftliche Grundelemente, die es auch in der freien Marktwirtschaft gibt."
    }),
    Q({
      id: "wiso-wirtschaft-010", type: "mc", difficulty: 1, points: 2,
      context: "In der InnoSoft GmbH sollen 30 alte Notebooks und Festplatten ausgemustert werden.",
      question: "Welches Vorgehen entspricht den gesetzlichen Vorgaben (ElektroG, DSGVO)?",
      options: [
        "Die Geräte werden über den Restmüll entsorgt.",
        "Die Geräte werden an Mitarbeitende verschenkt, ohne die Daten zu löschen.",
        "Die Datenträger werden sicher gelöscht bzw. vernichtet und die Geräte über einen zertifizierten Entsorger, Rücknahmesystem oder Händler der Verwertung zugeführt.",
        "Die Geräte werden ins Ausland verkauft, die Daten bleiben verschlüsselt darauf.",
        "Die Akkus werden mit den Geräten über den gelben Sack entsorgt."
      ],
      correct: [2],
      solution: "Elektroaltgeräte (Symbol durchgestrichene Mülltonne) dürfen <b>nicht in den Hausmüll</b> (ElektroG); Rückgabe über Sammelstellen, Händler-Rücknahme oder zertifizierte Entsorger. Vorher müssen <b>personenbezogene Daten gelöscht</b> werden (Pflicht des Endnutzers, DSGVO – z. B. Überschreiben/Datenträgervernichtung nach DIN 66399). Batterien/Akkus sind möglichst vorher zu entnehmen und getrennt zu entsorgen.",
      explanation: "Noch besser im Sinne der Abfallhierarchie: Vorbereitung zur Wiederverwendung (Refurbishing, Spende nach Löschung)."
    }),
    Q({
      id: "wiso-wirtschaft-011", type: "mc", difficulty: 2, points: 2,
      question: "Worin unterscheidet sich eine <b>EU-Verordnung</b> von einer <b>EU-Richtlinie</b>?",
      options: [
        "Eine Verordnung gilt unmittelbar in allen Mitgliedstaaten; eine Richtlinie muss erst in nationales Recht umgesetzt werden.",
        "Eine Richtlinie gilt unmittelbar, eine Verordnung ist nur eine Empfehlung.",
        "Verordnungen erlässt der Bundestag, Richtlinien das EU-Parlament.",
        "Beide sind unverbindliche Stellungnahmen.",
        "Verordnungen gelten nur für Staaten mit Euro."
      ],
      correct: [0],
      solution: "<b>Verordnung</b> (z. B. DSGVO, AI Act): allgemein, verbindlich und <b>unmittelbar</b> in jedem Mitgliedstaat geltend. <b>Richtlinie</b> (z. B. Verbraucherrechte-Richtlinie): verbindlich hinsichtlich des Ziels, muss aber innerhalb einer Frist in <b>nationales Recht umgesetzt</b> werden (z. B. BGB-Änderungen).",
      explanation: "Empfehlungen und Stellungnahmen sind unverbindlich."
    }),
    Q({
      id: "wiso-wirtschaft-012", type: "numeric", difficulty: 2, points: 3,
      context: "Frau Becker legt 10.000 € auf einem Festgeldkonto zu einem Zinssatz von 3,5 % p. a. an. Die Inflationsrate beträgt im gleichen Zeitraum 2,2 %.",
      question: "Wie hoch ist der <b>Realzins</b> (vereinfachte Berechnung) in Prozent?",
      answer: 1.3, tolerance: 0.01, unit: "%",
      solution: "Realzins ≈ Nominalzins − Inflationsrate = 3,5 % − 2,2 % = <b>1,3 %</b>.",
      explanation: "Exakt: (1,035 ÷ 1,022 − 1) · 100 ≈ 1,27 %. Ist die Inflation höher als der Zins, ist der Realzins negativ – das Vermögen verliert an Kaufkraft."
    }),
    Q({
      id: "wiso-wirtschaft-013", type: "numeric", difficulty: 3, points: 4,
      context: "Auf dem Markt für eine Projektmanagement-App gelten folgende Funktionen (p = Preis in €/Monat, x = Menge in Lizenzen):<br>Nachfrage: x = 1.000 − 20p<br>Angebot: x = 200 + 20p",
      question: "Berechnen Sie den <b>Gleichgewichtspreis</b> in €.",
      answer: 20, tolerance: 0.01, unit: "€",
      solution: "Gleichgewicht: Angebot = Nachfrage<br>1.000 − 20p = 200 + 20p ⇒ 800 = 40p ⇒ <b>p = 20 €</b><br>Gleichgewichtsmenge: x = 1.000 − 20 · 20 = 600 Lizenzen.",
      explanation: "Bei einem Preis von 25 € würden 500 nachgefragt, aber 700 angeboten (Angebotsüberhang 200)."
    }),
    Q({
      id: "wiso-wirtschaft-014", type: "numeric", difficulty: 2, points: 3,
      context: "Der Verbraucherpreisindex (Basisjahr 2020 = 100) betrug im September 2025 121,4 und im September 2026 124,8.",
      question: "Berechnen Sie die Inflationsrate gegenüber dem Vorjahresmonat in Prozent (zwei Nachkommastellen).",
      answer: 2.8, tolerance: 0.01, unit: "%",
      solution: "Inflationsrate = (124,8 ÷ 121,4 − 1) · 100 = <b>2,80 %</b>.",
      explanation: "Falle: Die Differenz der Indexpunkte (3,4) ist nicht die Inflationsrate in Prozent."
    }),
    Q({
      id: "wiso-wirtschaft-015", type: "multi", difficulty: 1, points: 3,
      context: "Die InnoSoft GmbH möchte ihre IT nachhaltiger gestalten (Green IT).",
      question: "Welche <b>zwei</b> Maßnahmen tragen zur Senkung des Energieverbrauchs bei?",
      options: [
        "Konsolidierung mehrerer schwach ausgelasteter physischer Server durch Virtualisierung",
        "Aktivieren eines animierten Bildschirmschoners statt Standby",
        "Beschaffung energieeffizienter Geräte (z. B. mit EU-Energielabel/Blauer Engel) und Aktivierung der Energiesparmodi",
        "Jährlicher Austausch aller Notebooks gegen neue Modelle",
        "Alle Arbeitsplatzrechner laufen nachts durch, damit sie morgens schneller starten"
      ],
      correct: [0, 2],
      solution: "<b>Virtualisierung</b> erhöht die Auslastung und spart Hardware, Strom und Kühlung. <b>Energieeffiziente Beschaffung</b> und Energiesparoptionen senken den Verbrauch im Betrieb.",
      explanation: "Bildschirmschoner sparen keine Energie. Ein jährlicher Austausch verschlechtert die Ökobilanz, da die Herstellung den größten Teil der Umweltbelastung verursacht."
    }),
    Q({
      id: "wiso-wirtschaft-016", type: "multi", difficulty: 2, points: 3,
      question: "Welche <b>zwei</b> Aussagen zur <b>antizyklischen Fiskalpolitik</b> sind richtig?",
      options: [
        "Im Abschwung erhöht der Staat seine Ausgaben (z. B. Investitionen in Infrastruktur), auch durch Kreditaufnahme.",
        "Im Boom erhöht der Staat seine Ausgaben, um die Nachfrage weiter zu steigern.",
        "Im Boom sollte der Staat Ausgaben senken bzw. Rücklagen bilden, um eine Überhitzung zu vermeiden.",
        "Die antizyklische Fiskalpolitik wird von der Europäischen Zentralbank betrieben.",
        "Im Abschwung erhöht der Staat die Steuern, um Schulden zu vermeiden."
      ],
      correct: [0, 2],
      solution: "Nach Keynes soll der Staat <b>gegen den Konjunkturverlauf</b> handeln: im Abschwung Nachfrage stärken (Ausgaben erhöhen, Steuern senken, „deficit spending“), im Boom dämpfen (Ausgaben senken, Steuern erhöhen, Konjunkturausgleichsrücklage).",
      explanation: "Geldpolitik (Zinsen) ist Aufgabe der EZB; Fiskalpolitik (Staatseinnahmen/-ausgaben) Aufgabe von Bund, Ländern und Gemeinden."
    }),
    Q({
      id: "wiso-wirtschaft-017", type: "order", difficulty: 2, points: 3,
      question: "Ordnen Sie die Stufen der <b>Abfallhierarchie</b> nach dem Kreislaufwirtschaftsgesetz – beginnend mit der höchsten Priorität.",
      items: [
        "Vermeidung",
        "Vorbereitung zur Wiederverwendung",
        "Recycling",
        "Sonstige Verwertung, insbesondere energetische Verwertung",
        "Beseitigung"
      ],
      solution: "§ 6 KrWG: <b>Vermeidung → Vorbereitung zur Wiederverwendung → Recycling → sonstige (energetische) Verwertung → Beseitigung</b>. IT-Beispiel: Geräte länger nutzen → Refurbishing → Rohstoffrückgewinnung → Verbrennung von Reststoffen → Deponie."
    }),
    Q({
      id: "wiso-wirtschaft-018", type: "order", difficulty: 1, points: 3,
      question: "Bringen Sie die Konjunkturphasen in die typische Reihenfolge – beginnend mit dem Aufschwung.",
      items: [
        "Aufschwung (Expansion)",
        "Hochkonjunktur (Boom)",
        "Abschwung (Rezession)",
        "Tiefstand (Depression)"
      ],
      solution: "Aufschwung → Hochkonjunktur → Abschwung → Tiefstand → (erneuter Aufschwung). Ein vollständiger Zyklus dauert meist mehrere Jahre."
    }),
    Q({
      id: "wiso-wirtschaft-019", type: "text", difficulty: 2, points: 6,
      context: "Die InnoSoft GmbH möchte in ihrem Unternehmensleitbild das Thema Nachhaltigkeit verankern.",
      question: "Erläutern Sie das <b>Drei-Säulen-Modell der Nachhaltigkeit</b> und nennen Sie zu jeder Säule eine konkrete Maßnahme für die InnoSoft GmbH.",
      solution: "Nachhaltigkeit bedeutet, die Bedürfnisse der Gegenwart zu befriedigen, ohne die Möglichkeiten künftiger Generationen zu gefährden (Brundtland-Bericht 1987). Die drei Dimensionen sind gleichrangig:<ul><li><b>Ökologisch</b> (Umwelt/Ressourcen schonen): Green IT, Ökostrom, energieeffiziente Server/Virtualisierung, längere Nutzungsdauer und Refurbishing, papierloses Büro, Jobrad/ÖPNV-Ticket.</li><li><b>Ökonomisch</b> (dauerhaft wirtschaftlich erfolgreich sein): langfristige Kundenbeziehungen statt kurzfristiger Gewinnmaximierung, Kostensenkung durch Energieeffizienz, Investition in Weiterbildung, solide Finanzierung.</li><li><b>Sozial</b> (Verantwortung für Menschen): faire Bezahlung, Gesundheitsmanagement, Vereinbarkeit von Familie und Beruf (mobiles Arbeiten), Ausbildung/Umschulung, Diversität, Barrierefreiheit der Software.</li></ul>",
      keywords: ["ökologisch|ökologie|umwelt", "ökonomisch|wirtschaftlich", "sozial", "künftige generationen|zukünftige generationen|generationen", "energie|green it|strom|ressourcen", "mitarbeiter|gesundheit|faire"],
      explanation: "Zielkonflikte zwischen den Säulen sind möglich (z. B. teurer Ökostrom ↔ Kosten)."
    })
  );
})();

// ---------------------------------------------------------------------------
// Fragen: wiso-kalkulation
// ---------------------------------------------------------------------------
(function () {
  const Q = (o) => Object.assign({ part: "WISO", topic: "wiso-kalkulation" }, o);
  const CTX = "Sie unterstützen das Controlling der <b>InnoSoft GmbH</b> in Karlsruhe.";
  AP2.questions.push(
    Q({
      id: "wiso-kalkulation-001", type: "numeric", difficulty: 2, points: 4,
      context: CTX + " Für neue Arbeitsplätze werden 25 Monitore zum Listeneinkaufspreis von je 320 € (netto) bestellt. Der Lieferant gewährt 15 % Mengenrabatt und 2 % Skonto bei Zahlung innerhalb von 10 Tagen. Für Fracht und Verpackung fallen pauschal 150 € an. Die InnoSoft zahlt innerhalb der Skontofrist.",
      question: "Berechnen Sie den <b>Bezugspreis</b> (Einstandspreis) für die gesamte Lieferung.",
      answer: 6814, tolerance: 0.01, unit: "€",
      solution: "<pre><code>  Listeneinkaufspreis 25 · 320 €   8.000,00 €\n− 15 % Liefererrabatt             1.200,00 €\n= Zieleinkaufspreis               6.800,00 €\n−  2 % Liefererskonto (vom ZEP)     136,00 €\n= Bareinkaufspreis                6.664,00 €\n+ Bezugskosten                      150,00 €\n= Bezugspreis                     6.814,00 €</code></pre>",
      explanation: "Falle: Skonto wird vom Zieleinkaufspreis (nach Rabatt) berechnet, nicht vom Listenpreis. Bezugskosten werden nicht rabattiert."
    }),
    Q({
      id: "wiso-kalkulation-002", type: "numeric", difficulty: 3, points: 5,
      context: CTX + " Ein Firewall-Gerät hat einen Bezugspreis von 600 €. Kalkulationsdaten: Handlungskostenzuschlag 25 %, Gewinnzuschlag 10 %, Kundenskonto 2 %, Kundenrabatt 10 %.",
      question: "Berechnen Sie den <b>Listenverkaufspreis (netto)</b>.",
      answer: 935.37, tolerance: 0.02, unit: "€",
      solution: "<pre><code>  Bezugspreis                         600,00 €\n+ 25 % Handlungskosten               150,00 €\n= Selbstkosten                       750,00 €\n+ 10 % Gewinn                         75,00 €\n= Barverkaufspreis (98 %)            825,00 €\n+  2 % Kundenskonto (i. H.)           16,84 €\n= Zielverkaufspreis (100 % / 90 %)   841,84 €\n+ 10 % Kundenrabatt (i. H.)           93,53 €\n= Listenverkaufspreis netto          935,37 €</code></pre>Zielverkaufspreis = 825 ÷ 0,98; Listenverkaufspreis = 841,84 ÷ 0,90. (Brutto mit 19 % USt: 1.113,09 €)",
      explanation: "Kundenskonto und -rabatt werden <b>im Hundert</b> gerechnet, weil sie später vom höheren Preis abgezogen werden. 825 · 1,02 · 1,10 = 925,65 € wäre falsch."
    }),
    Q({
      id: "wiso-kalkulation-003", type: "numeric", difficulty: 2, points: 3,
      context: CTX + " Für eine neue SaaS-Lösung fallen jährliche Fixkosten von 48.000 € an (Entwicklerteam, Server-Grundgebühr). Eine Jahreslizenz wird für 79 € verkauft, die variablen Kosten (Hosting, Support, Zahlungsgebühren) betragen 19 € je Lizenz.",
      question: "Berechnen Sie die <b>Break-even-Menge</b> (Gewinnschwelle) in Lizenzen.",
      answer: 800, tolerance: 0, unit: "Lizenzen",
      solution: "Deckungsbeitrag je Stück: db = 79 € − 19 € = 60 €<br>Break-even-Menge = Fixkosten ÷ db = 48.000 € ÷ 60 € = <b>800 Lizenzen</b>.",
      explanation: "An der Gewinnschwelle decken die Deckungsbeiträge genau die Fixkosten (Gewinn = 0)."
    }),
    Q({
      id: "wiso-kalkulation-004", type: "numeric", difficulty: 2, points: 3,
      context: "Daten wie in der vorherigen Aufgabe: Fixkosten 48.000 €/Jahr, Preis 79 €, variable Kosten 19 € je Lizenz. Im ersten Jahr werden 1.200 Lizenzen verkauft.",
      question: "Berechnen Sie den <b>Gewinn</b>.",
      answer: 24000, tolerance: 0.01, unit: "€",
      solution: "Deckungsbeitrag gesamt = 1.200 · 60 € = 72.000 €<br>Gewinn = DB − Fixkosten = 72.000 € − 48.000 € = <b>24.000 €</b>.",
      explanation: "Alternativ: (1.200 − 800) Lizenzen über der Gewinnschwelle · 60 € = 24.000 €."
    }),
    Q({
      id: "wiso-kalkulation-005", type: "numeric", difficulty: 3, points: 3,
      context: CTX + " Für ein Schulungsangebot gilt: Fixkosten 50.000 €, Preis je Teilnehmer 89 €, variable Kosten je Teilnehmer 24 €.",
      question: "Wie viele Teilnehmer werden <b>mindestens</b> benötigt, damit kein Verlust entsteht?",
      answer: 770, tolerance: 0, unit: "Teilnehmer",
      solution: "db = 89 € − 24 € = 65 €; 50.000 € ÷ 65 € = 769,23 → <b>aufrunden auf 770 Teilnehmer</b> (bei 769 bliebe ein kleiner Verlust von 15 €).",
      explanation: "Mengen in der Break-even-Analyse immer auf ganze Einheiten <b>aufrunden</b>."
    }),
    Q({
      id: "wiso-kalkulation-006", type: "numeric", difficulty: 3, points: 4,
      context: CTX + " Am 01.04.2026 wird ein Server angeschafft: Listenpreis 12.000 € netto, 3 % Skonto wurden genutzt, Installation und Einrichtung durch den Lieferanten 600 € netto. Betriebsgewöhnliche Nutzungsdauer für die Aufgabe: 4 Jahre, lineare Abschreibung.",
      question: "Berechnen Sie den <b>Abschreibungsbetrag für das Jahr 2026</b>.",
      answer: 2295, tolerance: 0.01, unit: "€",
      solution: "Anschaffungskosten = 12.000 € − 360 € Skonto + 600 € Nebenkosten = <b>12.240 €</b><br>Jährliche AfA = 12.240 € ÷ 4 = 3.060 €<br>Anschaffung im April → <b>monatsgenau</b> 9 Monate (April–Dezember): 3.060 € · 9 ÷ 12 = <b>2.295 €</b>",
      explanation: "Anschaffungspreisminderungen (Skonto, Rabatt) mindern, Anschaffungsnebenkosten erhöhen die AK; die Vorsteuer gehört nicht dazu."
    }),
    Q({
      id: "wiso-kalkulation-007", type: "numeric", difficulty: 2, points: 3,
      context: "Ein Lieferant gewährt folgende Zahlungsbedingung: „Zahlbar innerhalb von 30 Tagen netto, bei Zahlung innerhalb von 10 Tagen 2 % Skonto.“",
      question: "Berechnen Sie den effektiven Jahreszinssatz des Lieferantenkredits nach der Näherungsformel (in %).",
      answer: 36, tolerance: 0.01, unit: "%",
      solution: "Effektiver Zins ≈ Skontosatz · 360 ÷ (Zahlungsziel − Skontofrist) = 2 · 360 ÷ (30 − 10) = <b>36 %</b>.",
      explanation: "Wer kein Skonto zieht, „leiht“ sich das Geld für 20 Tage zu einem Jahreszins von ca. 36 % – fast immer teurer als ein Kontokorrentkredit."
    }),
    Q({
      id: "wiso-kalkulation-008", type: "numeric", difficulty: 3, points: 4,
      context: "Eine Rechnung über 10.000 € kann innerhalb von 10 Tagen mit 2 % Skonto oder nach 30 Tagen netto bezahlt werden. Da die InnoSoft GmbH derzeit nicht genügend liquide Mittel hat, müsste sie für die Skontozahlung ihren Kontokorrentkredit (12 % p. a.) für 20 Tage in Anspruch nehmen. Zinsberechnung kaufmännisch (360 Tage).",
      question: "Berechnen Sie den <b>Finanzierungsgewinn</b>, wenn das Skonto mithilfe des Kontokorrentkredits genutzt wird.",
      answer: 134.67, tolerance: 0.02, unit: "€",
      solution: "Skontoertrag: 10.000 € · 2 % = 200,00 €<br>Kreditbetrag: 10.000 € − 200 € = 9.800 €<br>Kreditzinsen: 9.800 € · 12 · 20 ÷ (100 · 360) = 65,33 €<br>Finanzierungsgewinn = 200,00 € − 65,33 € = <b>134,67 €</b>",
      explanation: "Der Kredit wird nur für den Überweisungsbetrag (9.800 €) und nur für die Differenz zwischen Zahlungsziel und Skontofrist (20 Tage) benötigt."
    }),
    Q({
      id: "wiso-kalkulation-009", type: "numeric", difficulty: 2, points: 3,
      context: "Bilanzdaten der InnoSoft GmbH: Eigenkapital 400.000 €, Fremdkapital 600.000 €, Jahresgewinn 60.000 €, Fremdkapitalzinsen 30.000 €.",
      question: "Berechnen Sie die <b>Eigenkapitalrentabilität</b> in Prozent.",
      answer: 15, tolerance: 0.01, unit: "%",
      solution: "EK-Rentabilität = Gewinn ÷ Eigenkapital · 100 = 60.000 ÷ 400.000 · 100 = <b>15 %</b>.<br>(Zum Vergleich: Gesamtkapitalrentabilität = (60.000 + 30.000) ÷ 1.000.000 · 100 = 9 %.)",
      explanation: "Bei der GK-Rentabilität werden die FK-Zinsen zum Gewinn addiert, weil sie die Verzinsung des Fremdkapitals darstellen."
    }),
    Q({
      id: "wiso-kalkulation-010", type: "numeric", difficulty: 2, points: 3,
      context: "Aus der Bilanz der InnoSoft GmbH: Kassenbestand und Bankguthaben 45.000 €, Forderungen aus Lieferungen und Leistungen 90.000 €, kurzfristige Verbindlichkeiten 150.000 €.",
      question: "Berechnen Sie die <b>Liquidität 1. Grades</b> in Prozent.",
      answer: 30, tolerance: 0.01, unit: "%",
      solution: "Liquidität 1. Grades = flüssige Mittel ÷ kurzfristige Verbindlichkeiten · 100 = 45.000 ÷ 150.000 · 100 = <b>30 %</b> (Richtwert ≥ 20 % erfüllt).<br>Liquidität 2. Grades = (45.000 + 90.000) ÷ 150.000 · 100 = 90 % (Richtwert 100 % knapp unterschritten).",
      explanation: "Forderungen gehören erst in die Liquidität 2. Grades."
    }),
    Q({
      id: "wiso-kalkulation-011", type: "numeric", difficulty: 2, points: 3,
      context: CTX + " Eine Automatisierungssoftware kostet 36.000 € (Nutzungsdauer 6 Jahre, lineare AfA). Sie führt zu einem zusätzlichen jährlichen Gewinn von 6.000 € (nach Abschreibung).",
      question: "Berechnen Sie die <b>Amortisationsdauer</b> in Jahren.",
      answer: 3, tolerance: 0.01, unit: "Jahre",
      solution: "Jährlicher Rückfluss = Gewinn + Abschreibung = 6.000 € + 36.000 € ÷ 6 = 6.000 € + 6.000 € = 12.000 €<br>Amortisationsdauer = Anschaffungskosten ÷ Rückfluss = 36.000 € ÷ 12.000 € = <b>3 Jahre</b>.",
      explanation: "Die AfA ist nicht zahlungswirksam und fließt daher als Rückfluss zurück. Ohne AfA käme man fälschlich auf 6 Jahre."
    }),
    Q({
      id: "wiso-kalkulation-012", type: "numeric", difficulty: 1, points: 2,
      context: "Eine Rechnung über eine Softwareschulung lautet auf 1.428,00 € inklusive 19 % Umsatzsteuer.",
      question: "Berechnen Sie den <b>Nettobetrag</b>.",
      answer: 1200, tolerance: 0.01, unit: "€",
      solution: "Brutto = 119 % → Netto = 1.428,00 € ÷ 1,19 = <b>1.200,00 €</b> (USt 228,00 €).",
      explanation: "Falle: 1.428 € − 19 % = 1.156,68 € ist falsch (vermehrter Grundwert)."
    }),
    Q({
      id: "wiso-kalkulation-013", type: "mc", difficulty: 2, points: 2,
      context: "Im Service-Desk der InnoSoft GmbH wurden im Oktober 1.800 Tickets in 600 Arbeitsstunden bearbeitet. Im November waren es 2.100 Tickets in 600 Stunden.",
      question: "Welche Kennzahl hat sich verbessert, und wie wird sie berechnet?",
      options: [
        "Die Rentabilität – Gewinn ÷ Kapital",
        "Die Produktivität – Ausbringungsmenge ÷ Einsatzmenge (von 3 auf 3,5 Tickets je Stunde)",
        "Die Wirtschaftlichkeit – Ertrag ÷ Aufwand",
        "Die Liquidität – flüssige Mittel ÷ kurzfristige Verbindlichkeiten",
        "Die Eigenkapitalquote – Eigenkapital ÷ Gesamtkapital"
      ],
      correct: [1],
      solution: "<b>Produktivität</b> ist eine <b>mengenmäßige</b> Kennzahl: Output ÷ Input. Oktober: 1.800 ÷ 600 = 3 Tickets/h; November: 2.100 ÷ 600 = 3,5 Tickets/h (+16,7 %).",
      explanation: "Wirtschaftlichkeit verwendet Wertgrößen (€), Produktivität Mengengrößen."
    }),
    Q({
      id: "wiso-kalkulation-014", type: "mc", difficulty: 1, points: 2,
      question: "Welche Kostenart ist bei einem Softwarehaus typischerweise <b>variabel</b>?",
      options: [
        "Miete für die Büroräume",
        "Gehalt der Geschäftsführerin",
        "Lizenzgebühr, die je verkaufter Softwarelizenz an einen Drittanbieter gezahlt wird",
        "Leasingrate für die Firmenwagen",
        "Abschreibung auf die Büroausstattung (linear)"
      ],
      correct: [2],
      solution: "<b>Variable Kosten</b> verändern sich mit der Ausbringungsmenge – eine Lizenzgebühr <b>je verkaufter Einheit</b> steigt proportional mit dem Absatz.",
      explanation: "Miete, Gehälter, Leasingraten und lineare Abschreibung fallen unabhängig von der Menge an (Fixkosten)."
    }),
    Q({
      id: "wiso-kalkulation-015", type: "mc", difficulty: 2, points: 2,
      question: "Welche Aussage zur <b>Bilanz</b> ist richtig?",
      options: [
        "Die Aktivseite zeigt die Mittelherkunft, die Passivseite die Mittelverwendung.",
        "Die Passivseite zeigt Eigen- und Fremdkapital (Mittelherkunft), die Aktivseite Anlage- und Umlaufvermögen (Mittelverwendung).",
        "Die Bilanz stellt Aufwendungen und Erträge eines Geschäftsjahres gegenüber.",
        "Ein Bankdarlehen gehört zum Anlagevermögen.",
        "Die Summe der Aktiva ist immer größer als die Summe der Passiva."
      ],
      correct: [1],
      solution: "Die <b>Bilanz</b> ist eine Stichtagsrechnung: <b>Aktiva</b> = Vermögen (Anlage- und Umlaufvermögen) = Mittelverwendung; <b>Passiva</b> = Kapital (Eigen- und Fremdkapital) = Mittelherkunft. Bilanzsummen sind immer gleich.",
      explanation: "Aufwendungen und Erträge stehen in der <b>GuV</b> (Zeitraumrechnung). Ein Bankdarlehen ist Fremdkapital (Passiva)."
    }),
    Q({
      id: "wiso-kalkulation-016", type: "multi", difficulty: 2, points: 3,
      context: CTX + " Für 40 neue Entwickler-Notebooks wird Leasing statt Kauf erwogen.",
      question: "Welche <b>zwei</b> Aussagen sind <b>Vorteile</b> des Leasings für die InnoSoft GmbH?",
      options: [
        "Die Liquidität wird geschont, da keine hohe Anschaffungszahlung anfällt.",
        "Die InnoSoft GmbH wird sofort Eigentümerin der Notebooks.",
        "Die Geräte können nach Vertragsende gegen aktuelle Modelle getauscht werden (technischer Fortschritt).",
        "Leasing ist über die gesamte Laufzeit immer günstiger als ein Barkauf.",
        "Die Leasingverträge können jederzeit ohne Kosten gekündigt werden."
      ],
      correct: [0, 2],
      solution: "Vorteile: <b>Liquiditätsschonung</b> (keine Kapitalbindung), feste kalkulierbare Raten (als Aufwand absetzbar), <b>Anpassung an den technischen Fortschritt</b>, ggf. Service inklusive.",
      explanation: "Nachteile: insgesamt meist teurer (Gewinn und Risikoaufschlag des Leasinggebers), kein Eigentum, feste Vertragslaufzeit (Grundmietzeit), Auflagen zur Nutzung."
    }),
    Q({
      id: "wiso-kalkulation-017", type: "multi", difficulty: 2, points: 3,
      question: "Welche <b>zwei</b> Finanzierungsvorgänge sind <b>Eigenfinanzierung</b>?",
      options: [
        "Aufnahme eines Bankdarlehens über 100.000 €",
        "Ein neuer Gesellschafter tritt in die GmbH ein und leistet eine Einlage",
        "Nutzung des Zahlungsziels eines Lieferanten",
        "Einbehaltung (Thesaurierung) des Jahresgewinns statt Ausschüttung",
        "Leasing von Servern"
      ],
      correct: [1, 3],
      solution: "Eigenfinanzierung: Kapital wird als <b>Eigenkapital</b> zugeführt – von außen als <b>Beteiligungs-/Einlagenfinanzierung</b> oder von innen als <b>Selbstfinanzierung</b> (einbehaltene Gewinne).",
      explanation: "Darlehen und Lieferantenkredit sind Fremdfinanzierung; Leasing ist eine Sonderform (Kreditsubstitut)."
    }),
    Q({
      id: "wiso-kalkulation-018", type: "order", difficulty: 1, points: 3,
      question: "Bringen Sie die Stufen der <b>Bezugskalkulation</b> in die richtige Reihenfolge.",
      items: [
        "Listeneinkaufspreis",
        "− Liefererrabatt = Zieleinkaufspreis",
        "− Liefererskonto = Bareinkaufspreis",
        "+ Bezugskosten = Bezugspreis (Einstandspreis)"
      ],
      solution: "LEP − Rabatt = ZEP − Skonto = BEP + Bezugskosten = Bezugspreis. Merkhilfe: „Rabatt vor Skonto, Fracht zum Schluss“."
    }),
    Q({
      id: "wiso-kalkulation-019", type: "text", difficulty: 2, points: 5,
      context: CTX + " Die Geschäftsführung fragt, warum sich die Stückkosten einer selbst entwickelten Software mit steigender Zahl verkaufter Lizenzen so stark verringern.",
      question: "Erläutern Sie die Begriffe <b>fixe</b> und <b>variable Kosten</b> sowie den Effekt der <b>Fixkostendegression</b> an diesem Beispiel. Nennen Sie außerdem die kurzfristige Preisuntergrenze.",
      solution: "<ul><li><b>Fixe Kosten</b> fallen unabhängig von der Absatzmenge an (Entwicklergehälter, Büromiete, Server-Grundgebühr). Bei Software sind sie sehr hoch, weil die Entwicklung einmalig ist.</li><li><b>Variable Kosten</b> ändern sich mit der Menge (Hosting je Kunde, Support, Zahlungs-/Lizenzgebühren je Verkauf) – bei Software oft sehr gering.</li><li><b>Fixkostendegression</b>: Die fixen Kosten verteilen sich auf mehr Einheiten; die fixen Stückkosten (K<sub>f</sub> ÷ x) und damit die Stückkosten insgesamt sinken mit steigender Menge (Skaleneffekt).</li><li><b>Kurzfristige Preisuntergrenze</b> = variable Stückkosten (Deckungsbeitrag = 0); langfristig müssen die gesamten Stückkosten gedeckt werden.</li></ul>",
      keywords: ["fix", "variabel", "menge|absatz|stückzahl", "stückkosten", "verteilen|verteilt", "preisuntergrenze", "variable stückkosten|deckungsbeitrag"],
      explanation: "Beispiel: Kf = 200.000 €; bei 1.000 Lizenzen 200 €/Lizenz Fixkostenanteil, bei 10.000 Lizenzen nur noch 20 €."
    })
  );
})();

// ---------------------------------------------------------------------------
// Fragen: wiso-arbeitsschutz
// ---------------------------------------------------------------------------
(function () {
  const Q = (o) => Object.assign({ part: "WISO", topic: "wiso-arbeitsschutz" }, o);
  const CTX = "Die <b>InnoSoft GmbH</b> in Karlsruhe (Softwareentwicklung, Verwaltungsbetrieb) beschäftigt 85 Mitarbeitende, die überwiegend an Bildschirmarbeitsplätzen tätig sind. Zuständiger Unfallversicherungsträger ist die Verwaltungs-Berufsgenossenschaft (VBG).";
  AP2.questions.push(
    Q({
      id: "wiso-arbeitsschutz-001", type: "mc", difficulty: 1, points: 2,
      context: CTX,
      question: "Wer ist nach dem Arbeitsschutzgesetz für die Durchführung der <b>Gefährdungsbeurteilung</b> verantwortlich?",
      options: [
        "Die Berufsgenossenschaft",
        "Der Betriebsrat",
        "Der Arbeitgeber",
        "Der Sicherheitsbeauftragte",
        "Jeder Beschäftigte für seinen eigenen Arbeitsplatz"
      ],
      correct: [2],
      solution: "<b>§ 5 ArbSchG</b>: Der <b>Arbeitgeber</b> hat durch eine Beurteilung der Gefährdungen (inkl. psychischer Belastungen) zu ermitteln, welche Arbeitsschutzmaßnahmen erforderlich sind, und das Ergebnis zu dokumentieren (§ 6). Er kann sich durch Fachkraft für Arbeitssicherheit und Betriebsarzt beraten lassen und Aufgaben delegieren – die Verantwortung bleibt bei ihm.",
      explanation: "Der Betriebsrat hat bei der Ausgestaltung ein Mitbestimmungsrecht (§ 87 Abs. 1 Nr. 7 BetrVG), ist aber nicht verantwortlich."
    }),
    Q({
      id: "wiso-arbeitsschutz-002", type: "mc", difficulty: 1, points: 2,
      question: "Ein rundes Sicherheitszeichen mit <b>blauem Grund und weißem Symbol</b> ist ein …",
      options: ["Verbotszeichen", "Gebotszeichen", "Warnzeichen", "Rettungszeichen", "Brandschutzzeichen"],
      correct: [1],
      solution: "<b>Gebotszeichen</b>: rund, <b>blau</b>, weißes Symbol (z. B. „Gehörschutz benutzen“, „Hände waschen“). Verbot: rund, weiß mit rotem Rand und Balken; Warnung: gelbes Dreieck; Rettung: grünes Rechteck; Brandschutz: rotes Rechteck.",
      explanation: "Merkhilfe: Rot = Stopp/Verbot und Brandschutz, Gelb = Achtung, Blau = Muss, Grün = Rettung."
    }),
    Q({
      id: "wiso-arbeitsschutz-003", type: "mc", difficulty: 1, points: 2,
      question: "Welche Bedeutung hat ein <b>grünes, rechteckiges</b> Sicherheitszeichen mit weißem Symbol (z. B. laufende Person und Pfeil)?",
      options: [
        "Warnung vor einer Gefahrstelle",
        "Verbot, den Bereich zu betreten",
        "Rettungsweg/Notausgang",
        "Standort eines Feuerlöschers",
        "Gebot, eine Schutzbrille zu tragen"
      ],
      correct: [2],
      solution: "<b>Rettungszeichen</b> sind <b>grün</b> und rechteckig/quadratisch mit weißem Symbol: Rettungsweg/Notausgang, Erste Hilfe, Sammelstelle, Notruftelefon.",
      explanation: "Der Feuerlöscher ist ein Brandschutzzeichen (rot, rechteckig)."
    }),
    Q({
      id: "wiso-arbeitsschutz-004", type: "mc", difficulty: 2, points: 3,
      context: CTX + " Eine Mitarbeiterin stolpert im Treppenhaus der Firma über ein Kabel und ist anschließend 2 Wochen arbeitsunfähig.",
      question: "Welche Pflicht hat die InnoSoft GmbH?",
      options: [
        "Keine, da es sich um einen privaten Unfall handelt.",
        "Sie muss den Unfall innerhalb von 3 Tagen der Berufsgenossenschaft anzeigen, da die Arbeitsunfähigkeit mehr als 3 Kalendertage beträgt.",
        "Sie muss den Unfall nur in das Verbandbuch eintragen.",
        "Sie muss den Unfall innerhalb von 4 Wochen der Krankenkasse melden.",
        "Die Mitarbeiterin muss den Unfall selbst bei der Polizei melden."
      ],
      correct: [1],
      solution: "<b>§ 193 SGB VII</b>: Der Unternehmer muss einen Arbeitsunfall dem Unfallversicherungsträger (BG) <b>anzeigen</b>, wenn der Versicherte getötet oder so verletzt ist, dass er <b>mehr als drei Kalendertage arbeitsunfähig</b> ist – binnen <b>3 Tagen</b> nach Kenntnis. Die Anzeige ist vom Betriebsrat mitzuunterzeichnen; die Mitarbeiterin sollte einen Durchgangsarzt aufsuchen.",
      explanation: "Das Verbandbuch reicht nur für Bagatellverletzungen ohne AU – es dient als Nachweis, falls sich später Folgen zeigen."
    }),
    Q({
      id: "wiso-arbeitsschutz-005", type: "mc", difficulty: 2, points: 3,
      context: "Mehrere Mitarbeitende der InnoSoft GmbH haben auf dem Weg zur oder von der Arbeit einen Unfall.",
      question: "In welchem Fall besteht <b>kein</b> Schutz der gesetzlichen Unfallversicherung?",
      options: [
        "Frau Kurz verunglückt auf dem direkten Weg von der Wohnung zur Arbeit.",
        "Herr Lenz verunglückt auf einem Umweg, weil er sein Kind in die Kita bringt.",
        "Herr Maier verunglückt auf einem Umweg, weil er eine Kollegin im Rahmen einer Fahrgemeinschaft abholt.",
        "Frau Nowak verunglückt, als sie auf dem Heimweg einen Umweg zum Shoppingcenter macht, um privat einzukaufen.",
        "Herr Otto stürzt im Homeoffice auf dem Weg vom Schreibtisch zur Küche, um sich ein Getränk zu holen."
      ],
      correct: [3],
      solution: "Versichert ist der <b>unmittelbare Weg</b> (§ 8 Abs. 2 SGB VII) sowie Umwege für Kinderbetreuung und Fahrgemeinschaften. Ein <b>privater Umweg</b> (Einkaufen) unterbricht den Versicherungsschutz. Seit 2021 sind Beschäftigte im Homeoffice im gleichen Umfang geschützt wie im Betrieb (§ 8 Abs. 1 Satz 3 SGB VII) – der Weg zur Küche zum Getränkeholen ist wie im Betrieb versichert.",
      explanation: "Nach Ende des privaten Umwegs und Rückkehr auf den direkten Weg besteht wieder Versicherungsschutz."
    }),
    Q({
      id: "wiso-arbeitsschutz-006", type: "mc", difficulty: 2, points: 2,
      context: CTX + " Ihr Kollege Herr Engel wurde zum Sicherheitsbeauftragten bestellt.",
      question: "Welche Aussage zu seiner Rolle ist richtig?",
      options: [
        "Er ist für die Einhaltung des Arbeitsschutzes verantwortlich und haftet bei Unfällen.",
        "Er darf den Kolleginnen und Kollegen Weisungen erteilen und Arbeiten stoppen.",
        "Er unterstützt den Arbeitgeber, achtet auf Mängel und Gefahren und weist Kollegen und Vorgesetzte darauf hin – ohne Weisungsbefugnis und ohne rechtliche Verantwortung.",
        "Er ersetzt die Fachkraft für Arbeitssicherheit.",
        "Er muss eine Ausbildung zum Betriebsarzt haben."
      ],
      correct: [2],
      solution: "<b>Sicherheitsbeauftragte</b> (§ 22 SGB VII; Pflicht bei mehr als 20 Beschäftigten) sind Beschäftigte, die ehrenamtlich den Arbeitgeber unterstützen: Mängel erkennen, Kollegen auf sicheres Verhalten hinweisen, Verbesserungen anregen. Sie haben <b>keine Weisungsbefugnis</b> und tragen <b>keine Verantwortung</b>; sie dürfen wegen der Aufgabe nicht benachteiligt werden.",
      explanation: "Die Fachkraft für Arbeitssicherheit (ASiG) ist eine fachkundige Beraterin mit Ausbildung (z. B. Ingenieur/Meister + Lehrgang)."
    }),
    Q({
      id: "wiso-arbeitsschutz-007", type: "mc", difficulty: 2, points: 2,
      context: "Ein neuer Bildschirmarbeitsplatz soll in einem Büro mit großer Fensterfront eingerichtet werden.",
      question: "Wie sollte der Bildschirm zum Fenster aufgestellt werden?",
      options: [
        "Mit dem Rücken des Nutzers zum Fenster, damit das Licht auf den Bildschirm fällt",
        "Mit Blick direkt zum Fenster, damit die Augen in die Ferne schauen können",
        "So, dass die Blickrichtung parallel zur Fensterfront verläuft (Bildschirm im rechten Winkel zum Fenster)",
        "Direkt vor dem Fenster, um Tageslicht optimal zu nutzen",
        "Die Aufstellung ist beliebig, da moderne Bildschirme entspiegelt sind"
      ],
      correct: [2],
      solution: "Die Blickrichtung soll <b>parallel zur Fensterfront</b> verlaufen. So werden <b>Spiegelungen</b> (Fenster im Rücken) und <b>Blendung</b> sowie starke Hell-Dunkel-Kontraste (Blick ins Fenster) vermieden (ArbStättV Anhang 6, ASR A6).",
      explanation: "Zusätzlich: Arbeitsplatz möglichst zwischen den Leuchtenreihen, Blendschutz (Jalousien) an den Fenstern."
    }),
    Q({
      id: "wiso-arbeitsschutz-008", type: "mc", difficulty: 2, points: 2,
      context: "Im Serverraum der InnoSoft GmbH bricht ein kleiner Kabelbrand aus.",
      question: "Welcher Feuerlöscher ist für einen ersten Löschversuch am besten geeignet?",
      options: [
        "Wasserlöscher",
        "Schaumlöscher",
        "Kohlendioxid-Löscher (CO₂)",
        "Metallbrandlöscher (Brandklasse D)",
        "Fettbrandlöscher (Brandklasse F)"
      ],
      correct: [2],
      solution: "<b>CO₂-Löscher</b> löschen rückstandsfrei, leiten keinen Strom und eignen sich daher besonders für elektrische Anlagen und IT-Räume (Mindestabstand zu spannungsführenden Teilen beachten). In geschlossenen, kleinen Räumen nach dem Löschen sofort verlassen (Erstickungsgefahr).",
      explanation: "Wasser und Schaum können bei elektrischen Anlagen gefährlich sein und Geräte zerstören; Pulverlöscher hinterlassen große Schäden an der Elektronik."
    }),
    Q({
      id: "wiso-arbeitsschutz-009", type: "mc", difficulty: 2, points: 2,
      context: "Eine Entwicklerin klagt über Augenbeschwerden bei der Bildschirmarbeit.",
      question: "Welche Aussage zur arbeitsmedizinischen Vorsorge bei Bildschirmarbeit ist richtig?",
      options: [
        "Bildschirmarbeit erfordert eine jährliche Pflichtvorsorge; wer nicht teilnimmt, darf nicht weiterarbeiten.",
        "Der Arbeitgeber muss eine Angebotsvorsorge inklusive Untersuchung der Augen anbieten; ist eine spezielle Bildschirmbrille erforderlich, trägt er die Kosten.",
        "Die Kosten für jede Brille trägt immer die Krankenkasse.",
        "Arbeitsmedizinische Vorsorge ist nur für Auszubildende vorgesehen.",
        "Das Ergebnis der Untersuchung erhält automatisch der Arbeitgeber."
      ],
      correct: [1],
      solution: "Nach der <b>ArbMedVV</b> (Anhang Teil 4) ist bei Tätigkeiten an Bildschirmgeräten eine <b>Angebotsvorsorge</b> anzubieten (inkl. Augenuntersuchung). Ergibt sich, dass eine spezielle <b>Bildschirmarbeitsplatzbrille</b> notwendig ist und normale Sehhilfen nicht geeignet sind, muss der <b>Arbeitgeber</b> sie zur Verfügung stellen.",
      explanation: "Die Teilnahme ist freiwillig; Befunde unterliegen der ärztlichen Schweigepflicht – der AG erhält nur eine Vorsorgebescheinigung."
    }),
    Q({
      id: "wiso-arbeitsschutz-010", type: "numeric", difficulty: 2, points: 3,
      context: CTX + " Regelmäßig sind alle 85 Beschäftigten anwesend.",
      question: "Wie viele <b>Ersthelfer</b> muss die InnoSoft GmbH nach der DGUV Vorschrift 1 mindestens stellen?",
      answer: 5, tolerance: 0, unit: "Ersthelfer",
      solution: "DGUV Vorschrift 1 § 26: bei 2–20 anwesenden Versicherten mind. 1 Ersthelfer; bei mehr als 20 in <b>Verwaltungs- und Handelsbetrieben 5 %</b>, in sonstigen Betrieben 10 %.<br>85 · 5 % = 4,25 → <b>aufrunden auf 5 Ersthelfer</b>.",
      explanation: "Ersthelfer müssen alle 2 Jahre fortgebildet werden. Zusätzlich sind ca. 5 % Brandschutzhelfer zu benennen (ASR A2.2)."
    }),
    Q({
      id: "wiso-arbeitsschutz-011", type: "numeric", difficulty: 2, points: 2,
      question: "Welche Beleuchtungsstärke (in Lux) muss nach der Technischen Regel für Arbeitsstätten ASR A3.4 an einem Büroarbeitsplatz mit Bildschirmarbeit mindestens erreicht werden?",
      answer: 500, tolerance: 0, unit: "lx",
      solution: "ASR A3.4: Büroarbeitsplätze (Schreiben, Lesen, Datenverarbeitung) mindestens <b>500 Lux</b> im Bereich der Arbeitsfläche.",
      explanation: "Weitere Richtwerte: Raumtemperatur im Büro mind. 20 °C (ASR A3.5), ab 26 °C sollen, ab 30 °C müssen Maßnahmen ergriffen werden."
    }),
    Q({
      id: "wiso-arbeitsschutz-012", type: "multi", difficulty: 1, points: 3,
      question: "Welche <b>zwei</b> Pflichten haben <b>Beschäftigte</b> nach dem Arbeitsschutzgesetz?",
      options: [
        "Festgestellte Gefahren und Defekte an Schutzsystemen unverzüglich dem Arbeitgeber oder Vorgesetzten melden",
        "Die Gefährdungsbeurteilung für den Betrieb erstellen",
        "Persönliche Schutzausrüstung und Arbeitsmittel bestimmungsgemäß verwenden",
        "Die Kosten für Arbeitsschutzmaßnahmen anteilig tragen",
        "Eine Fachkraft für Arbeitssicherheit bestellen"
      ],
      correct: [0, 2],
      solution: "<b>§§ 15, 16 ArbSchG</b>: Beschäftigte müssen für ihre Sicherheit und Gesundheit sowie die anderer sorgen, Arbeitsmittel und Schutzausrüstung <b>bestimmungsgemäß verwenden</b> und <b>Gefahren/Defekte unverzüglich melden</b>.",
      explanation: "Gefährdungsbeurteilung, Kosten (§ 3 Abs. 3) und Bestellung der Fachkraft (ASiG) sind Pflichten des Arbeitgebers."
    }),
    Q({
      id: "wiso-arbeitsschutz-013", type: "multi", difficulty: 2, points: 3,
      context: "Sie richten den Arbeitsplatz einer neuen Kollegin ergonomisch ein.",
      question: "Welche <b>zwei</b> Empfehlungen sind ergonomisch richtig?",
      options: [
        "Die oberste Bildschirmzeile liegt etwas unterhalb der Augenhöhe, der Sehabstand beträgt ca. 50–80 cm.",
        "Der Bildschirm steht möglichst hoch, damit der Kopf leicht nach oben geneigt ist.",
        "Ober- und Unterarm bilden beim Tippen etwa einen rechten Winkel, die Füße stehen flach auf dem Boden (ggf. Fußstütze).",
        "Für konzentriertes Arbeiten ist eine helle Schrift auf dunklem Hintergrund vorgeschrieben.",
        "Häufiges Sitzen ohne Unterbrechung verbessert die Konzentration und sollte gefördert werden."
      ],
      correct: [0, 2],
      solution: "Ergonomische Grundregeln: Bildschirmoberkante leicht <b>unter Augenhöhe</b> (Blick leicht nach unten), Sehabstand ca. 50–80 cm; Arme und Beine etwa im <b>90°-Winkel</b>, Füße flach auf dem Boden; dynamisches Sitzen, Wechsel zwischen Sitzen und Stehen sowie regelmäßige Unterbrechungen.",
      explanation: "Empfohlen ist eher die Positivdarstellung (dunkle Schrift auf hellem Grund), da Reflexionen weniger stören – vorgeschrieben ist keine bestimmte Darstellung."
    }),
    Q({
      id: "wiso-arbeitsschutz-014", type: "order", difficulty: 1, points: 3,
      context: "Im Büro der InnoSoft GmbH riechen Sie Rauch und sehen Flammen aus einem Papierkorb aufsteigen.",
      question: "Bringen Sie die Verhaltensregeln im Brandfall in die richtige Reihenfolge.",
      items: [
        "Ruhe bewahren",
        "Brand melden (Notruf 112 bzw. Brandmelder betätigen)",
        "Gefährdete Personen warnen und in Sicherheit bringen",
        "Löschversuch unternehmen, sofern ohne Eigengefährdung möglich",
        "Gebäude über die Rettungswege verlassen (keinen Aufzug benutzen) und Sammelstelle aufsuchen"
      ],
      solution: "Aushang „Verhalten im Brandfall“ (ASR A2.2/DIN 14096): <b>Ruhe bewahren → Brand melden → In Sicherheit bringen → Löschversuch unternehmen</b>; dann Sammelstelle aufsuchen und auf Anweisungen achten."
    }),
    Q({
      id: "wiso-arbeitsschutz-015", type: "order", difficulty: 2, points: 3,
      context: "Eine Kollegin bricht im Besprechungsraum bewusstlos zusammen.",
      question: "Bringen Sie die Glieder der <b>Rettungskette</b> in die richtige Reihenfolge.",
      items: [
        "Sofortmaßnahmen (Eigenschutz, Unfallstelle sichern, Bewusstsein und Atmung prüfen)",
        "Notruf 112 absetzen",
        "Weitere Erste Hilfe (z. B. stabile Seitenlage oder Herz-Lungen-Wiederbelebung)",
        "Rettungsdienst übernimmt",
        "Versorgung im Krankenhaus"
      ],
      solution: "Rettungskette: <b>Sofortmaßnahmen → Notruf → Erste Hilfe → Rettungsdienst → Krankenhaus</b>. Notruf nach den W-Fragen: Wo? Was ist passiert? Wie viele Verletzte? Welche Verletzungen? Warten auf Rückfragen."
    }),
    Q({
      id: "wiso-arbeitsschutz-016", type: "mc", difficulty: 2, points: 2,
      context: "Ein Mitarbeiter der InnoSoft GmbH war in den letzten 12 Monaten wiederholt erkrankt, insgesamt 8 Wochen.",
      question: "Wozu ist der Arbeitgeber verpflichtet?",
      options: [
        "Er muss dem Mitarbeiter krankheitsbedingt kündigen.",
        "Er muss ein betriebliches Eingliederungsmanagement (BEM) anbieten.",
        "Er muss den Mitarbeiter zu einer Untersuchung beim Amtsarzt verpflichten.",
        "Er muss die Krankenkasse über die Diagnose informieren.",
        "Er hat keine Pflichten, da die Entgeltfortzahlung je Krankheit neu beginnt."
      ],
      correct: [1],
      solution: "<b>§ 167 Abs. 2 SGB IX</b>: Sind Beschäftigte innerhalb eines Jahres länger als <b>sechs Wochen</b> ununterbrochen oder wiederholt arbeitsunfähig, muss der Arbeitgeber ein <b>betriebliches Eingliederungsmanagement</b> anbieten (mit Zustimmung des Betroffenen, unter Beteiligung von Betriebsrat/ggf. Betriebsarzt), um Arbeitsunfähigkeit zu überwinden und erneuter vorzubeugen.",
      explanation: "Die Teilnahme ist freiwillig. Ein unterlassenes BEM erschwert dem AG eine spätere krankheitsbedingte Kündigung erheblich."
    }),
    Q({
      id: "wiso-arbeitsschutz-017", type: "mc", difficulty: 2, points: 2,
      context: "Eine Mitarbeiterin hat versehentlich eine Excel-Liste mit Gesundheitsdaten von Kollegen an einen externen Verteiler gesendet.",
      question: "Innerhalb welcher Frist muss die InnoSoft GmbH diese Datenschutzverletzung in der Regel der Aufsichtsbehörde melden?",
      options: [
        "Unverzüglich, möglichst binnen 72 Stunden nach Bekanntwerden",
        "Innerhalb von 14 Tagen",
        "Innerhalb von 4 Wochen",
        "Nur, wenn ein Betroffener Anzeige erstattet",
        "Eine Meldung ist nur bei Bankdaten nötig"
      ],
      correct: [0],
      solution: "<b>Art. 33 DSGVO</b>: Meldung einer Verletzung des Schutzes personenbezogener Daten an die Aufsichtsbehörde (BW: LfDI) <b>unverzüglich und möglichst binnen 72 Stunden</b>, es sei denn, sie führt voraussichtlich nicht zu einem Risiko. Bei hohem Risiko (hier: Gesundheitsdaten) sind auch die Betroffenen zu benachrichtigen (Art. 34).",
      explanation: "Mitarbeitende sollten Vorfälle sofort intern (Datenschutzbeauftragter/IT-Sicherheit) melden."
    }),
    Q({
      id: "wiso-arbeitsschutz-018", type: "mc", difficulty: 1, points: 2,
      context: CTX + " Eine neue Mitarbeiterin beginnt am Montag.",
      question: "Wann muss die Unterweisung im Arbeitsschutz stattfinden?",
      options: [
        "Erst nach Ablauf der Probezeit",
        "Nur, wenn ein Unfall passiert ist",
        "Bei der Einstellung vor Aufnahme der Tätigkeit, bei Veränderungen und danach regelmäßig (mindestens einmal jährlich)",
        "Alle fünf Jahre",
        "Nur auf Wunsch der Mitarbeiterin"
      ],
      correct: [2],
      solution: "<b>§ 12 ArbSchG</b>: Unterweisung bei der <b>Einstellung</b>, bei Veränderungen im Aufgabenbereich, Einführung neuer Arbeitsmittel/Technologien – vor Aufnahme der Tätigkeit; Wiederholung regelmäßig, nach <b>DGUV Vorschrift 1 § 4 mindestens einmal jährlich</b> (Jugendliche nach § 29 JArbSchG halbjährlich). Dokumentation empfohlen.",
      explanation: "Inhalt: Gefahren am Arbeitsplatz, Verhalten im Brandfall, Fluchtwege, Erste Hilfe, Bildschirmarbeit."
    }),
    Q({
      id: "wiso-arbeitsschutz-019", type: "text", difficulty: 2, points: 6,
      context: CTX + " Nach einer Mitarbeiterbefragung klagen viele Entwicklerinnen und Entwickler über Zeitdruck, ständige Unterbrechungen durch Chat-Nachrichten und Rückenschmerzen.",
      question: "Beschreiben Sie das Vorgehen bei einer <b>Gefährdungsbeurteilung</b> und nennen Sie je eine geeignete Maßnahme gegen die <b>psychischen</b> und die <b>körperlichen</b> Belastungen.",
      solution: "<b>Schritte der Gefährdungsbeurteilung</b> (§§ 5, 6 ArbSchG):<ol><li>Arbeitsbereiche und Tätigkeiten festlegen</li><li>Gefährdungen ermitteln (physisch, ergonomisch, <b>psychisch</b> – z. B. per Befragung, Begehung)</li><li>Gefährdungen beurteilen (Risiko bewerten)</li><li>Maßnahmen festlegen (Rangfolge <b>STOP</b>: Substitution, technisch, organisatorisch, personenbezogen)</li><li>Maßnahmen umsetzen</li><li>Wirksamkeit überprüfen</li><li>Dokumentieren und fortschreiben</li></ol><b>Maßnahmen psychisch</b>: realistische Sprint-/Projektplanung, Fokuszeiten ohne Chat/Meetings, klare Erreichbarkeitsregeln, Priorisierung durch Product Owner, Pausen, Schulung Stressbewältigung.<br><b>Maßnahmen körperlich</b>: höhenverstellbare Steh-Sitz-Tische, ergonomische Stühle, Ergonomie-Unterweisung, Bewegungspausen, Angebote des BGM (Rückenkurs).",
      keywords: ["ermitteln|ermittlung", "beurteilen|bewerten", "maßnahmen", "wirksamkeit|überprüfen", "dokumentation|dokumentieren", "psychisch", "fokuszeit|erreichbarkeit|planung|pausen", "steh|ergonom|stuhl|tisch"],
      explanation: "Seit 2013 müssen psychische Belastungen ausdrücklich in der Gefährdungsbeurteilung berücksichtigt werden."
    })
  );
})();
