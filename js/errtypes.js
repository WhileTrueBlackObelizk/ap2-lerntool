/* AP2-Lerntool – Fehlertypen: klassifiziert falsche Versuche nach Fehlermuster (offline, deterministisch) */
(function (root) {
  "use strict";
  var App = (root.App = root.App || {});
  var ET = (App.errtypes = {});

  function strip(s) { return String(s == null ? "" : s).replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim(); }
  function cut(s, n) { s = strip(s); return s.length > n ? s.slice(0, n - 1) + "…" : s; }
  function sqlSol(q) { return q && q.type === "sql" && q.sql ? String(q.sql.solution || "") : ""; }
  function kwText(q) { return ((q && q.keywords) || []).join(" ") + " " + strip(q && q.solution); }
  var NEG = /\b(nicht|kein|keine|keinen|keiner|falsch|falsche|falschen|unzutreffend|unzutreffende|nie)\b/i;
  var OPERATOR_LONG = /^\s*(erläutern|erklären|begründen|beschreiben|beurteilen|bewerten|vergleichen|diskutieren)\b/i;

  /**
   * Fehlermuster: label (kurz), tip (Merksatz), match(q) → passt die Frage zum Muster (für „Gezielt üben“).
   */
  ET.PATTERNS = {
    "sql-syntax": { group: "SQL", label: "SQL-Syntaxfehler", tip: "Reihenfolge der Klauseln: SELECT – FROM – JOIN … ON – WHERE – GROUP BY – HAVING – ORDER BY. Kommas zwischen Spalten, keins vor FROM; Texte in einfachen Anführungszeichen.", match: function (q) { return q.type === "sql"; } },
    "sql-type": { group: "SQL", label: "Falscher Anweisungstyp", tip: "Erst klären: Lesen (SELECT), Ändern (UPDATE), Einfügen (INSERT), Löschen (DELETE) oder Struktur (CREATE/ALTER)?", match: function (q) { return q.type === "sql" && !/^\s*select/i.test(sqlSol(q)); } },
    "sql-tables": { group: "SQL", label: "Falsche oder fehlende Tabellen", tip: "Prüfe im Beiblatt, in welcher Tabelle jede benötigte Spalte steht – jede davon muss im FROM/JOIN vorkommen.", match: function (q) { return q.type === "sql" && /join|,\s*\w+\s+(where|$)/i.test(sqlSol(q)); } },
    "sql-select": { group: "SQL", label: "Falsche Ausgabespalten", tip: "Genau die geforderten Spalten ausgeben (kein SELECT *), Aliase mit AS – lies die Aufgabe auf „Geben Sie … aus“.", match: function (q) { return q.type === "sql" && /^\s*select/i.test(sqlSol(q)); } },
    "sql-join": { group: "SQL", label: "JOIN fehlt oder falscher JOIN-Typ", tip: "INNER JOIN liefert nur Treffer in beiden Tabellen. Sollen auch Datensätze ohne Partner erscheinen („alle Kunden, auch ohne Bestellung“), brauchst du LEFT JOIN.", match: function (q) { return /join/i.test(sqlSol(q)); } },
    "sql-where": { group: "SQL", label: "WHERE-Bedingung fehlt oder falsch", tip: "Jede Einschränkung der Aufgabe („nur …“, „ab …“, „im Jahr …“) wird zu einer Bedingung; bei NULL immer IS NULL / IS NOT NULL.", match: function (q) { return /\bwhere\b/i.test(sqlSol(q)); } },
    "sql-agg": { group: "SQL", label: "Falsche Aggregatfunktion", tip: "COUNT zählt, SUM summiert, AVG mittelt, MIN/MAX suchen Extremwerte. COUNT(spalte) ignoriert NULL, COUNT(*) nicht.", match: function (q) { return /\b(count|sum|avg|min|max)\s*\(/i.test(sqlSol(q)); } },
    "sql-groupby": { group: "SQL", label: "GROUP BY fehlt oder unvollständig", tip: "Sobald „je/pro …“ in der Aufgabe steht: GROUP BY. Jede nicht aggregierte Spalte im SELECT gehört ins GROUP BY.", match: function (q) { return /group\s+by/i.test(sqlSol(q)); } },
    "sql-having": { group: "SQL", label: "HAVING fehlt", tip: "Bedingungen auf Gruppenergebnisse (z. B. COUNT(*) > 3) gehören ins HAVING – WHERE filtert vor der Gruppierung einzelne Zeilen.", match: function (q) { return /\bhaving\b/i.test(sqlSol(q)); } },
    "sql-having-where": { group: "SQL", label: "HAVING und WHERE vertauscht", tip: "WHERE filtert Zeilen VOR dem Gruppieren und kennt keine Aggregatfunktionen. HAVING filtert Gruppen DANACH.", match: function (q) { return /\bhaving\b/i.test(sqlSol(q)) || (/group\s+by/i.test(sqlSol(q)) && /\bwhere\b/i.test(sqlSol(q))); } },
    "sql-sub": { group: "SQL", label: "Unterabfrage fehlt", tip: "Vergleiche mit einem berechneten Wert („über dem Durchschnitt“, „die meisten“) lösen sich mit einer Unterabfrage in WHERE/HAVING.", match: function (q) { return /\(\s*select/i.test(sqlSol(q)); } },
    "sql-order": { group: "SQL", label: "Sortierung fehlt oder falsch", tip: "„sortiert“, „absteigend“, „die ersten …“ → ORDER BY … ASC/DESC (Standard ist ASC).", match: function (q) { return /order\s+by/i.test(sqlSol(q)); } },
    "sql-set": { group: "SQL", label: "UPDATE: falsche Spalten im SET", tip: "Nur die geforderten Spalten ändern – und WHERE nicht vergessen, sonst trifft es alle Zeilen.", match: function (q) { return /^\s*update/i.test(sqlSol(q)); } },
    "sql-values": { group: "SQL", label: "INSERT/CREATE: Werte oder Definitionen falsch", tip: "Spaltenliste und VALUES müssen in Anzahl und Reihenfolge passen; bei CREATE TABLE PK, FK und Datentypen prüfen.", match: function (q) { return /^\s*(insert|create)/i.test(sqlSol(q)); } },
    "sql-result": { group: "SQL", label: "Struktur stimmt, Ergebnis nicht", tip: "Die Klauseln sind da, aber die Logik filtert falsch: Vergleichsoperator, AND/OR-Klammern, Datumsformat oder Duplikate (DISTINCT) prüfen.", match: function (q) { return q.type === "sql"; } },

    "num-sign": { group: "Rechnen", label: "Vorzeichen falsch", tip: "Bei Differenzen und Kapitalwerten fragen: Einzahlung oder Auszahlung? Gewinn oder Verlust? Ergebnis auf Plausibilität prüfen.", match: function (q) { return q.type === "numeric"; } },
    "num-unit": { group: "Rechnen", label: "Einheit/Größenordnung (Faktor 10, 100, 1000 …)", tip: "Prozent vs. Dezimalzahl, € vs. T€, Bit vs. Byte (8), KiB (1024), Minuten vs. Stunden (60): Einheit der Aufgabe am Ende bewusst prüfen.", match: function (q) { return q.type === "numeric"; } },
    "num-tax": { group: "Rechnen", label: "Brutto/Netto verwechselt", tip: "Netto × 1,19 = Brutto; Brutto ÷ 1,19 = Netto (nicht × 0,81!). Rabatt und Skonto immer auf den richtigen Grundwert.", match: function (q) { return q.type === "numeric" && /ust|umsatzsteuer|mwst|brutto|netto|skonto|rabatt/i.test(strip(q.question) + " " + (q.topic || "")); } },
    "num-round": { group: "Rechnen", label: "Rundung/Genauigkeit", tip: "Erst am Ende runden und Zwischenergebnisse mit voller Genauigkeit weiterverwenden; Rundungsvorgabe der Aufgabe beachten.", match: function (q) { return q.type === "numeric" && Number(q.answer) % 1 !== 0; } },
    "num-offbyone": { group: "Rechnen", label: "Um eins daneben (Grenzfall)", tip: "Schleifen- und Fristgrenzen: zählt der erste/letzte Wert mit? < oder <=? Index ab 0 oder 1?", match: function (q) { return q.type === "numeric" && Number.isInteger(Number(q.answer)); } },
    "num-format": { group: "Rechnen", label: "Zahl nicht lesbar eingegeben", tip: "Nur die Zahl eingeben (z. B. 1.234,56) – Einheiten und Rechenweg gehören nicht ins Feld.", match: function (q) { return q.type === "numeric"; } },
    "num-calc": { group: "Rechnen", label: "Falscher Rechenweg/Ansatz", tip: "Formel zuerst allgemein aufschreiben, dann Werte einsetzen; Schema aus dem Lernzettel nutzen.", match: function (q) { return q.type === "numeric"; } },

    "mc-negation": { group: "Auswahl", label: "Verneinung überlesen („nicht“, „falsch“)", tip: "Frage zweimal lesen und das Signalwort markieren: Wird nach der FALSCHEN bzw. NICHT zutreffenden Aussage gefragt?", match: function (q) { return (q.type === "mc" || q.type === "multi") && NEG.test(strip(q.question)); } },
    "mc-confusion": { group: "Auswahl", label: "Begriffe verwechselt", tip: "Distraktoren sind oft Nachbarbegriffe. Für jede Option kurz begründen, warum sie (nicht) passt.", match: function (q) { return q.type === "mc"; } },
    "multi-extra": { group: "Auswahl", label: "Zu viel angekreuzt", tip: "Bei Mehrfachauswahl kostet jede falsche Option Punkte – nur ankreuzen, was du begründen kannst.", match: function (q) { return q.type === "multi"; } },
    "multi-missing": { group: "Auswahl", label: "Richtige Option übersehen", tip: "Jede Option einzeln als wahr/falsch prüfen, nicht nach der ersten passenden aufhören.", match: function (q) { return q.type === "multi"; } },
    "order-swap": { group: "Ablauf", label: "Benachbarte Schritte vertauscht", tip: "Für jeden Schritt fragen: Was muss vorher fertig sein (Eingabe → Verarbeitung → Ausgabe)?", match: function (q) { return q.type === "order"; } },
    "order-wrong": { group: "Ablauf", label: "Ablauf grundsätzlich unklar", tip: "Zuerst den ersten und letzten Schritt festlegen, dann die Mitte – Prozessmodell im Lernzettel wiederholen.", match: function (q) { return q.type === "order"; } },

    "text-short": { group: "Freitext", label: "Zu knapp für den Operator", tip: "„Erläutern/Begründen“ heißt: Aussage + Begründung + Beispiel. Ein Stichwort reicht nur bei „Nennen“.", match: function (q) { return q.type === "text" && OPERATOR_LONG.test(strip(q.question)); } },
    "text-terms": { group: "Freitext", label: "Fachbegriffe fehlen", tip: "IHK-Prüfer suchen Fachbegriffe: die Begriffe aus dem Lernzettel ausdrücklich verwenden.", match: function (q) { return q.type === "text"; } },
    "text-gap": { group: "Freitext", label: "Antwort lückenhaft (Kernaspekte fehlen)", tip: "Vor dem Schreiben die geforderte Anzahl („Nennen Sie drei …“) und alle Teilfragen abhaken.", match: function (q) { return q.type === "text"; } },

    "code-loop": { group: "Code", label: "Schleife fehlt/falsch", tip: "Zählschleife bei bekannter Anzahl, kopfgesteuerte Schleife bei Bedingung; Grenzen (0 bis n-1) prüfen.", match: function (q) { return q.type === "code" && /schleife|\bfor\b|\bwhile\b|solange|wiederhole/i.test(kwText(q)); } },
    "code-cond": { group: "Code", label: "Bedingung/Verzweigung fehlt", tip: "Jeden Sonderfall der Aufgabe als eigene Verzweigung (wenn … sonst …) abbilden.", match: function (q) { return q.type === "code" && /\bif\b|\bwenn\b|\bfalls\b|verzweig|bedingung/i.test(kwText(q)); } },
    "code-return": { group: "Code", label: "Rückgabe fehlt", tip: "Funktion mit Ergebnis → am Ende „return“/„gib … zurück“; Ausgabe auf dem Bildschirm ist keine Rückgabe.", match: function (q) { return q.type === "code" && /return|rückgabe|zurück/i.test(kwText(q)); } },
    "code-init": { group: "Code", label: "Initialisierung vergessen", tip: "Zähler, Summen und Min/Max vor der Schleife initialisieren (Summe = 0, Max = erstes Element).", match: function (q) { return q.type === "code" && /initial|summe|zähler|counter|\bmax\b|\bmin\b/i.test(kwText(q)); } },
    "code-recursion": { group: "Code", label: "Abbruchbedingung der Rekursion fehlt", tip: "Erst den Basisfall schreiben, dann den rekursiven Aufruf, der dem Basisfall näher kommt.", match: function (q) { return q.type === "code" && /rekurs|abbruch|basisfall/i.test(kwText(q)); } },
    "code-logic": { group: "Code", label: "Algorithmus-Logik unvollständig", tip: "Erst mit einem kleinen Beispiel von Hand durchspielen (Schreibtischtest), dann Pseudocode schreiben.", match: function (q) { return q.type === "code"; } },

    "no-answer": { group: "Allgemein", label: "Keine Antwort / Lösung aufgedeckt", tip: "Wissenslücke: Lernzettel zum Thema lesen und die Aufgabe danach ohne Hilfe lösen.", match: function () { return false; } },
  };

  var CODE_KW = [
    ["code-recursion", /rekurs|abbruch|basisfall|base/i],
    ["code-loop", /schleife|\bfor\b|\bwhile\b|solange|wiederhole|für jede|iter/i],
    ["code-cond", /\bif\b|\bwenn\b|\bfalls\b|\belse\b|sonst|verzweig|bedingung|vergleich/i],
    ["code-return", /return|rückgabe|zurück/i],
    ["code-init", /initial|:= ?0|= ?0|leer|summe|zähler|counter/i],
  ];
  var SQL_LABELS = [
    ["Anweisungstyp", "sql-type"], ["Tabellen", "sql-tables"], ["Ausgabespalten", "sql-select"], ["Verknüpfung", "sql-join"],
    ["Bedingung (WHERE)", "sql-where"], ["Aggregat", "sql-agg"], ["Gruppierung", "sql-groupby"], ["Gruppenbedingung", "sql-having"],
    ["Unterabfrage", "sql-sub"], ["Sortierung", "sql-order"], ["Ergebnis: Reihenfolge", "sql-order"], ["Geänderte Spalten", "sql-set"], ["Werte/Definitionen", "sql-values"],
  ];
  function near(a, b) { return Math.abs(a - b) <= Math.max(1e-9, Math.abs(b) * 0.005); }

  /** Zusatzinfos zur Antwort, die im Ergebnis nicht stehen (wird beim Bewerten ans Ergebnis gehängt) */
  ET.hints = function (q, ans) {
    ans = ans || {};
    var h = [];
    if (q.type === "sql" && ans.text) {
      var u = String(ans.text).replace(/--[^\n]*/g, " ").replace(/\s+/g, " ");
      var sol = sqlSol(q);
      var whereAgg = /\bwhere\b(?:(?!\bgroup\s+by\b).)*\b(count|sum|avg|min|max)\s*\(/i.test(u);
      if (/\bhaving\b/i.test(sol) && !/\bhaving\b/i.test(u) && whereAgg) h.push("sql-having-where");
      if (!/\bhaving\b/i.test(sol) && /\bhaving\b/i.test(u) && /\bwhere\b/i.test(sol)) h.push("sql-having-where");
    }
    if (q.type === "order" && Array.isArray(ans.order)) {
      var o = ans.order.map(Number), wrong = [];
      o.forEach(function (v, i) { if (v !== i) wrong.push(i); });
      var swaps = wrong.length > 0 && wrong.length <= 4 && wrong.every(function (i) { return Math.abs(o[i] - i) === 1; });
      h.push(swaps ? "order-swap" : "order-wrong");
    }
    if ((q.type === "text" || q.type === "code") && ans.text != null) {
      var words = String(ans.text).trim().split(/\s+/).filter(Boolean).length;
      if (q.type === "text" && words < 15 && OPERATOR_LONG.test(strip(q.question))) h.push("text-short");
    }
    return h;
  };

  /**
   * Klassifiziert einen Versuch. → {tags:[…], detail:"…"} oder null (kein Fehler)
   * q: Frage, r: finales Ergebnis (aus App.grader / E.applySelf)
   */
  ET.classify = function (q, r) {
    if (!q || !r || r.pct >= 0.8) return null;
    var tags = [], detail = "";
    function add(t) { if (ET.PATTERNS[t] && tags.indexOf(t) < 0) tags.push(t); }
    (r.errHints || []).forEach(function (t) { if (t !== "text-short" || r.pct < 0.8) add(t); });
    if (r.kind === "giveup" || r.kind === "empty" || r.answered === false) {
      add("no-answer");
      return { tags: tags, detail: r.kind === "giveup" ? "Lösung angezeigt" : "keine Antwort" };
    }
    switch (q.type) {
      case "mc":
        add(NEG.test(strip(q.question)) ? "mc-negation" : "mc-confusion");
        if (r.choice != null && q.options) detail = "gewählt: " + cut(q.options[r.choice], 70);
        break;
      case "multi":
        if (r.wrong) add("multi-extra");
        if (r.right < r.need) add("multi-missing");
        if (NEG.test(strip(q.question))) add("mc-negation");
        detail = r.right + " von " + r.need + " richtig" + (r.wrong ? ", " + r.wrong + " falsch angekreuzt" : "");
        break;
      case "numeric": {
        var A = Number(q.answer), v = r.parsed;
        if (r.invalid || v == null || !isFinite(v)) { add("num-format"); detail = "Eingabe „" + cut(r.value, 30) + "“"; break; }
        detail = "Eingabe " + fmt(v) + " statt " + fmt(A) + (q.unit ? " " + q.unit : "");
        var ratio = A !== 0 ? v / A : null;
        if (A !== 0 && near(v, -A)) add("num-sign");
        else if (ratio != null && [10, 100, 1000, 0.1, 0.01, 0.001, 60, 1 / 60, 3600, 1 / 3600, 8, 0.125, 1024, 1 / 1024, -100, -0.01].some(function (f) { return near(ratio, f); })) add("num-unit");
        else if (ratio != null && [1.19, 1 / 1.19, 1.07, 1 / 1.07, 0.81, 0.93].some(function (f) { return near(ratio, f); })) add("num-tax");
        else if (Number.isInteger(A) && Number.isInteger(v) && Math.abs(v - A) === 1) add("num-offbyone");
        else if (Math.abs(v - A) <= Math.max(0.05, Math.abs(A) * 0.01) || [0, 1, 2].some(function (d) { var f = Math.pow(10, d); return Math.round(A * f) / f === v; })) add("num-round");
        else add("num-calc");
        break;
      }
      case "order":
        if (!tags.length) add(r.hits >= r.n - 2 ? "order-swap" : "order-wrong");
        detail = r.hits + " von " + r.n + " Positionen richtig";
        break;
      case "sql":
        if (r.kind !== "sql") { textTags(q, r, add); break; }
        if (r.error) { add("sql-syntax"); detail = cut(r.error, 90); }
        var weakStruct = false;
        (r.rubric || []).forEach(function (it) {
          if (it.score >= 0.7) return;
          for (var i = 0; i < SQL_LABELS.length; i++) {
            if (String(it.label).indexOf(SQL_LABELS[i][0]) === 0) {
              if (SQL_LABELS[i][1] === "sql-having" && tags.indexOf("sql-having-where") >= 0) break;
              add(SQL_LABELS[i][1]); weakStruct = true;
              if (!detail) detail = it.label + (it.detail ? ": " + it.detail : "");
              break;
            }
          }
        });
        if (tags.indexOf("sql-having-where") >= 0 && !detail) detail = "Aggregatbedingung im falschen Teil (WHERE statt HAVING oder umgekehrt)";
        if (!r.error && !weakStruct && !tags.length) { add("sql-result"); detail = detail || cut(r.reason || "Ergebnismenge weicht ab", 90); }
        break;
      case "code": {
        var miss = (r.missing || []).join(" ");
        CODE_KW.forEach(function (c) { if (c[1].test(miss)) add(c[0]); });
        if (!tags.some(function (t) { return /^code-/.test(t); })) add("code-logic");
        if (r.missing && r.missing.length) detail = "fehlte: " + cut(r.missing.slice(0, 4).join(", "), 90);
        break;
      }
      default:
        textTags(q, r, add);
        if (r.missing && r.missing.length) detail = "fehlte: " + cut(r.missing.slice(0, 4).join(", "), 90);
    }
    if (!tags.length) return null;
    return { tags: tags.slice(0, 3), detail: detail };
  };
  function textTags(q, r, add) {
    if (r.pct < 0.4) add("text-gap");
    else add("text-terms");
  }
  function fmt(n) { return String(Math.round(n * 1000) / 1000).replace(".", ","); }

  /** Häufigste Muster im Log (letzte `days` Tage) → [{tag, n, last, examples:[entry], ids:[…], gens:[…]}] */
  ET.top = function (log, today, days, limit) {
    var from = null;
    if (today && days) { var d = new Date(today + "T12:00:00"); d.setDate(d.getDate() - days); from = d.toISOString().slice(0, 10); }
    var by = {};
    (log || []).forEach(function (e) {
      if (!e || (from && e.d < from)) return;
      (e.k || []).forEach(function (t) {
        if (!ET.PATTERNS[t]) return;
        var b = by[t] || (by[t] = { tag: t, n: 0, last: "", examples: [], ids: [], gens: [] });
        b.n++;
        if (e.d > b.last) b.last = e.d;
        if (e.id && b.ids.indexOf(e.id) < 0) b.ids.push(e.id);
        if (e.g && b.gens.indexOf(e.g) < 0) b.gens.push(e.g);
        b.examples.push(e);
      });
    });
    return Object.keys(by).map(function (k) { var b = by[k]; b.examples = b.examples.slice(-3).reverse(); return b; })
      .sort(function (a, b) { return b.n - a.n || (a.last < b.last ? 1 : -1); })
      .slice(0, limit || 5);
  };

  /** Übungsauswahl zu Mustern: erst die betroffenen Aufgaben, dann passende ungelöste aus dem Pool */
  ET.practiceSet = function (groups, pool, progress, perPattern, mastery) {
    var out = [], seen = {};
    function push(q) { if (q && !seen[q.id]) { seen[q.id] = 1; out.push(q); return true; } return false; }
    var byId = {};
    pool.forEach(function (q) { byId[q.id] = q; });
    groups.forEach(function (g) {
      var p = ET.PATTERNS[g.tag], n = 0;
      g.ids.slice().reverse().forEach(function (id) { if (n < perPattern && push(byId[id])) n++; });
      if (!p || n >= perPattern) return;
      var cand = pool.filter(function (q) { return !seen[q.id] && !q._gen && p.match(q); })
        .map(function (q) { return { q: q, m: mastery ? mastery(progress[q.id]) : 0, r: Math.random() }; })
        .sort(function (a, b) { return a.m - b.m || a.r - b.r; });
      cand.forEach(function (c) { if (n < perPattern && push(c.q)) n++; });
    });
    return out;
  };
})(typeof window !== "undefined" ? window : globalThis);
