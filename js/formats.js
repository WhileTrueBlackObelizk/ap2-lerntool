/* AP2-Lerntool – Paket A: neue Prüfungsformate (Schreibtischtest, Diagramm, Fehler finden).
 * DOM-freie Bewertungslogik, in node testbar (tools/validate.js lädt diese Datei).
 * Erweitert U.TYPES, E.isAuto, E.gradeAuto und E.validateQuestion per Wrapping. */
(function (root) {
  "use strict";
  var App = (root.App = root.App || {});
  var U = App.util, E = App.engine;
  var F = (App.formats = {});

  F.TYPES = ["trace", "diagram", "bugfix"];
  F.TYPES.forEach(function (t) { if (U.TYPES.indexOf(t) < 0) U.TYPES.push(t); });
  U.TYPE_LABEL.trace = "Schreibtischtest";
  U.TYPE_LABEL.diagram = "Diagramm";
  U.TYPE_LABEL.bugfix = "Fehler finden";
  F.isFormat = function (q) { return !!q && F.TYPES.indexOf(q.type) >= 0; };

  /* ============================================================ Hilfen */

  function str(v) { return v == null ? "" : String(v); }
  function alts(v) { return str(v).split("|").map(function (s) { return s.trim(); }); }

  /* ================================================== Schreibtischtest */

  /** Zelle normalisieren: Leerraum, Klammern, Anführungszeichen, wahr/falsch, Dezimalkomma */
  F.normCell = function (v) {
    var s = str(v).toLowerCase().trim();
    s = s.replace(/[„“”"'`´]/g, "").replace(/[\[\]{}()]/g, "").replace(/;/g, ",").replace(/\s+/g, "");
    s = s.replace(/[−–—]/g, "-");
    if (s === "-" || s === "leer" || s === "/" || s === "∅") s = "";
    if (s === "wahr" || s === "true" || s === "w" || s === "ja") s = "true";
    if (s === "falsch" || s === "false" || s === "f" || s === "nein") s = "false";
    if (/^-?\d+,\d+$/.test(s)) s = s.replace(",", ".");
    if (/^-?\d+(\.\d+)?$/.test(s)) s = String(Number(s));
    return s;
  };
  F.cellMatches = function (expected, given) {
    var g = F.normCell(given);
    return alts(expected).some(function (a) { return F.normCell(a) === g; });
  };
  /** Zelle: String = auszufüllen, {g: "…"} = vorgegeben, null = leer/nicht bewertet */
  F.cellKind = function (cell) {
    if (cell == null) return "none";
    if (typeof cell === "object") return "given";
    return "input";
  };

  F.gradeTrace = function (q, ans) {
    var t = q.trace || {}, rows = t.rows || [];
    var cells = (ans && ans.cells) || [];
    var right = 0, total = 0, any = false, marks = [], rubric = [];
    rows.forEach(function (row, ri) {
      var m = [], rr = 0, rt = 0;
      row.forEach(function (cell, ci) {
        if (F.cellKind(cell) !== "input") { m.push(null); return; }
        var given = (cells[ri] || [])[ci];
        if (str(given).trim()) any = true;
        var ok = F.cellMatches(cell, given);
        m.push(ok);
        total++; rt++;
        if (ok) { right++; rr++; }
      });
      marks.push(m);
      if (rt) {
        var wrongCols = [];
        m.forEach(function (ok, ci) { if (ok === false) wrongCols.push((t.columns || [])[ci] || "Spalte " + (ci + 1)); });
        rubric.push({ label: (t.labels && t.labels[ri]) || "Zeile " + (ri + 1), score: rr / rt,
          detail: rr + " von " + rt + " Zellen richtig" + (wrongCols.length ? " – falsch: " + wrongCols.join(", ") : "") });
      }
    });
    return E.makeResult(q, total ? (q.points * right) / total : 0, {
      kind: "trace", marks: marks, right: right, total: total, rubric: rubric, answered: any,
    });
  };

  /* ===================================================== Fehler finden */

  /** Code-Zeile tolerant normalisieren: Groß/klein, Leerraum, Zuweisungs-/Vergleichsoperatoren */
  F.normCode = function (s) {
    s = str(s).toLowerCase();
    s = s.replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss");
    s = s.replace(/[„“”"`´]/g, "'");
    s = s.replace(/<-|:=/g, "←").replace(/!=|<>/g, "≠").replace(/<=/g, "≤").replace(/>=/g, "≥").replace(/==/g, "=");
    s = s.replace(/;\s*$/, "").replace(/\s+/g, "");
    return s;
  };
  /** Codezeilen (1-basiert) */
  F.codeLines = function (code) { return str(code).replace(/\r/g, "").replace(/\n+$/, "").split("\n"); };

  /** Bewertung einer Korrektur (0..1, ohne SQL-Ausführung) */
  F.fixScore = function (bug, faultyLine, correction) {
    var c = F.normCode(correction);
    if (!c || c === F.normCode(faultyLine)) return { score: 0, how: "unverändert" };
    var full = [bug.fix].concat(bug.alt || []).some(function (f) { return F.normCode(f) === c; });
    if (full) return { score: 1, how: "entspricht der Musterkorrektur" };
    var keys = bug.keys || [];
    if (!keys.length) return { score: 0, how: "weicht von der Musterkorrektur ab" };
    var found = keys.filter(function (k) { return alts(k).some(function (a) { var n = F.normCode(a); return n && c.indexOf(n) >= 0; }); });
    var forbidden = (bug.not || []).filter(function (k) { var n = F.normCode(k); return n && c.indexOf(n) >= 0; });
    var sc = found.length / keys.length;
    if (forbidden.length) sc = Math.min(sc, 0.5);
    return { score: sc, how: sc >= 1 ? "alle Schlüsselelemente vorhanden" : found.length + " von " + keys.length + " Schlüsselelementen" + (forbidden.length ? ", enthält noch den Fehler" : "") };
  };

  /** ans: {marked: {zeile: true}, fixes: {zeile: "korrigierte Zeile"}}; extraScores: {zeile: 1} (z. B. aus SQL-Ausführung) */
  F.gradeBugfix = function (q, ans, extraScores) {
    var lines = F.codeLines(q.code), bugs = q.bugs || [];
    var marked = (ans && ans.marked) || {}, fixes = (ans && ans.fixes) || {};
    var bugLines = {}, rubric = [], sum = 0;
    bugs.forEach(function (b) { bugLines[b.line] = b; });
    var per = bugs.map(function (b) {
      var found = !!marked[b.line];
      var fx = found ? F.fixScore(b, lines[b.line - 1], fixes[b.line] != null ? fixes[b.line] : lines[b.line - 1]) : { score: 0, how: "Zeile nicht markiert" };
      if (found && extraScores && extraScores[b.line] != null && extraScores[b.line] > fx.score) fx = { score: extraScores[b.line], how: "Korrektur liefert beim Ausführen das richtige Ergebnis" };
      var s = (found ? 0.5 : 0) + 0.5 * fx.score;
      sum += s;
      rubric.push({ label: "Fehler in Zeile " + b.line, score: s,
        detail: (found ? "Zeile gefunden" : "Zeile nicht gefunden") + " · Korrektur: " + fx.how });
      return { line: b.line, found: found, fix: fx.score, how: fx.how };
    });
    var falseMarks = Object.keys(marked).filter(function (k) { return marked[k] && !bugLines[k]; }).map(Number).sort(function (a, b) { return a - b; });
    if (falseMarks.length) rubric.push({ label: "Fälschlich markierte Zeilen: " + falseMarks.join(", "), score: 0, detail: "je −¼ Fehler Abzug" });
    var frac = bugs.length ? Math.max(0, sum - 0.25 * falseMarks.length) / bugs.length : 0;
    var any = Object.keys(marked).some(function (k) { return marked[k]; });
    return E.makeResult(q, q.points * frac, { kind: "bugfix", bugs: per, falseMarks: falseMarks, rubric: rubric, answered: any });
  };

  /** Code mit eingesetzten Korrekturen: fixes {zeile: text} */
  F.patchCode = function (code, fixes) {
    return F.codeLines(code).map(function (l, i) { return fixes && fixes[i + 1] != null ? fixes[i + 1] : l; }).join("\n");
  };
  /** Musterlösung: alle Bugs korrigiert */
  F.fixedCode = function (q) {
    var fx = {};
    (q.bugs || []).forEach(function (b) { fx[b.line] = b.fix; });
    return F.patchCode(q.code, fx);
  };

  /* =========================================================== Diagramm */

  F.DIAGRAM = {
    class: { label: "UML-Klassendiagramm", nodes: ["class"], edges: ["assoc", "aggr", "comp", "inherit", "impl", "dep"] },
    erm: { label: "Entity-Relationship-Modell", nodes: ["entity"], edges: ["rel"] },
    activity: { label: "UML-Aktivitätsdiagramm", nodes: ["start", "action", "decision", "end"], edges: ["flow"] },
    usecase: { label: "UML-Anwendungsfalldiagramm", nodes: ["actor", "usecase"], edges: ["assoc", "include", "extend", "inherit"] },
  };
  F.NODE_LABEL = { class: "Klasse", entity: "Entität", start: "Startknoten", end: "Endknoten", action: "Aktion", decision: "Verzweigung", actor: "Akteur", usecase: "Anwendungsfall" };
  F.EDGE_LABEL = { assoc: "Assoziation", aggr: "Aggregation", comp: "Komposition", inherit: "Vererbung/Generalisierung", impl: "Realisierung", dep: "Abhängigkeit", rel: "Beziehung", flow: "Kontrollfluss", include: "«include»", extend: "«extend»" };
  /** gerichtete Kanten: Richtung ist fachlich relevant */
  F.DIRECTED = { aggr: 1, comp: 1, inherit: 1, impl: 1, dep: 1, flow: 1, include: 1, extend: 1 };

  /** Namen tolerant normalisieren (Umlaute, Leerraum, Sonderzeichen weg) */
  F.normName = function (s) { return E.normalizeText(s).replace(/ /g, ""); };
  function lev(a, b) {
    if (a === b) return 0;
    var m = a.length, n = b.length, d = [], i, j;
    for (i = 0; i <= m; i++) d[i] = [i];
    for (j = 0; j <= n; j++) d[0][j] = j;
    for (i = 1; i <= m; i++) for (j = 1; j <= n; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return d[m][n];
  }
  /** Ähnlichkeit zweier Namen 0..1 (Groß/klein, Umlaute, Plural, Tippfehler tolerant) */
  F.nameSim = function (a, b) {
    var x = F.normName(a), y = F.normName(b);
    if (!x || !y) return 0;
    if (x === y) return 1;
    if (E.stem(x) === E.stem(y)) return 0.95;
    var L = Math.max(x.length, y.length), d = lev(x, y);
    if (L >= 5 && d <= 1) return 0.9;
    if (L >= 8 && d <= 2) return 0.85;
    var s = x.length < y.length ? x : y, l = x.length < y.length ? y : x;
    if (s.length >= 4 && l.indexOf(s) >= 0) return 0.8;
    return 0;
  };
  F.SIM_MIN = 0.75;
  function bestSim(names, name) {
    var best = 0;
    names.forEach(function (n) { best = Math.max(best, F.nameSim(n, name)); });
    return best;
  }

  /** Attribut-/Methodenzeile zerlegen: "- name: String" → {vis:"-", name:"name", pk:false} */
  F.parseMember = function (s) {
    s = str(s).trim();
    var pk = false, vis = "";
    // "#" am Anfang: bei Klassen protected, bei ERM Primärschlüssel (unterscheidet members())
    var m = /^([+\-#~])\s*/.exec(s);
    if (m) { vis = m[1]; s = s.slice(m[0].length); }
    if (/^pk\s+/i.test(s)) { pk = true; s = s.replace(/^pk\s+/i, ""); }
    if (/^_.*_$/.test(s)) { pk = true; s = s.replace(/^_|_$/g, ""); }
    s = s.replace(/^\//, "");
    var name = s.split(/[:(\s]/)[0] || s;
    return { vis: vis, name: name, pk: pk, raw: s };
  };
  function members(node, field, erm) {
    return (node[field] || []).map(function (s) {
      var p = F.parseMember(s);
      if (erm && p.vis === "#") { p.pk = true; p.vis = ""; }
      return p;
    }).filter(function (p) { return p.name; });
  }

  /** Multiplizität / Kardinalität normalisieren */
  F.normMult = function (m, erm) {
    var s = str(m).toLowerCase().replace(/\s+/g, "").replace(/\.{2,}/g, "..");
    if (!s) return "";
    if (erm) {
      if (/^(1|1\.\.1|eins)$/.test(s)) return "1";
      if (/^(0\.\.1|c)$/.test(s)) return "c";
      if (/[n*m]/.test(s)) return "n";
      return s;
    }
    if (s === "*" || s === "n" || s === "m" || s === "0..*" || s === "0..n") return "0..*";
    if (s === "1..*" || s === "1..n") return "1..*";
    if (s === "1..1") return "1";
    return s;
  };
  function multOk(expected, given, erm) {
    var g = F.normMult(given, erm);
    return alts(expected).some(function (a) { return F.normMult(a, erm) === g; });
  }

  /** Knoten der Musterlösung den Knoten des Nutzers zuordnen (gierig nach Ähnlichkeit) */
  F.matchNodes = function (sol, user) {
    var cands = [];
    (sol.nodes || []).forEach(function (sn) {
      (user.nodes || []).forEach(function (un) {
        if (sn.type !== un.type && !(sn.type === "class" && un.type === "class")) return;
        var sim;
        if (sn.type === "start" || sn.type === "end") sim = 1;
        else sim = bestSim([sn.name].concat(sn.alt || []), un.name);
        if (sim >= F.SIM_MIN) cands.push({ s: sn.id, u: un.id, sim: sim });
      });
    });
    cands.sort(function (a, b) { return b.sim - a.sim; });
    var map = {}, used = {};
    cands.forEach(function (c) { if (map[c.s] == null && !used[c.u]) { map[c.s] = c.u; used[c.u] = 1; } });
    return map;
  };

  F.gradeDiagram = function (q, ans) {
    var d = q.diagram || {}, sol = d.solution || { nodes: [], edges: [] };
    var user = (ans && ans.model) || { nodes: [], edges: [] };
    var erm = d.kind === "erm";
    var map = F.matchNodes(sol, user);
    var uById = {};
    (user.nodes || []).forEach(function (n) { uById[n.id] = n; });
    var sById = {};
    (sol.nodes || []).forEach(function (n) { sById[n.id] = n; });
    var rubric = [], got = 0, max = 0, marks = { nodes: {}, edges: {} };
    function mark(sc) { return sc >= 0.99 ? "ok" : sc > 0 ? "part" : "bad"; }
    function nodeName(n) { return n ? (n.name || F.NODE_LABEL[n.type] || n.type) : "?"; }

    (sol.nodes || []).forEach(function (sn) {
      var un = uById[map[sn.id]];
      var w = sn.type === "start" || sn.type === "end" ? 0.5 : 1, s = un ? w : 0, details = [];
      details.push(un ? "vorhanden" + (F.normName(un.name) !== F.normName(sn.name) && un.name ? " (als „" + un.name + "“)" : "") : "fehlt");
      ["attrs", "methods"].forEach(function (field) {
        var exp = members(sn, field, erm);
        if (!exp.length) return;
        w += 1;
        if (!un) return;
        var have = members(un, field, erm), ok = 0, miss = [], visBad = [], pkBad = [];
        exp.forEach(function (em) {
          var hit = null, best = 0;
          have.forEach(function (hm) { var x = F.nameSim(em.name, hm.name); if (x > best && x >= F.SIM_MIN) { best = x; hit = hm; } });
          if (!hit) { miss.push(em.name); return; }
          var v = 1;
          if (!erm && em.vis && hit.vis !== em.vis) { v = 0.75; visBad.push(em.name); }
          if (erm && em.pk && !hit.pk) { v = 0.6; pkBad.push(em.name); }
          ok += v;
        });
        s += ok / exp.length;
        var lab = field === "attrs" ? "Attribute" : "Methoden";
        details.push(lab + " " + Math.round((ok / exp.length) * 100) + " %" + (miss.length ? " – fehlt: " + miss.join(", ") : "") +
          (visBad.length ? " – Sichtbarkeit prüfen: " + visBad.join(", ") : "") + (pkBad.length ? " – Primärschlüssel nicht markiert: " + pkBad.join(", ") : ""));
      });
      got += s; max += w;
      if (un) marks.nodes[un.id] = mark(s / w);
      rubric.push({ label: (F.NODE_LABEL[sn.type] || sn.type) + " " + (sn.type === "start" || sn.type === "end" ? "" : nodeName(sn)), score: w ? s / w : 0, detail: details.join(" · ") });
    });

    var usedEdges = {};
    (sol.edges || []).forEach(function (se) {
      var a = map[se.from], b = map[se.to];
      var hasMult = !!(se.m1 || se.m2), hasLabel = se.type === "flow" && !!se.label;
      var w = 3 + (hasMult ? 1 : 0) + (hasLabel ? 0.5 : 0), s = 0, det = [];
      var label = nodeName(sById[se.from]) + " – " + nodeName(sById[se.to]);
      var cand = (user.edges || []).filter(function (ue) {
        return !usedEdges[ue.id] && a != null && b != null && ((ue.from === a && ue.to === b) || (ue.from === b && ue.to === a));
      });
      // passendste Kante wählen (gleicher Typ, gleiche Richtung zuerst)
      cand.sort(function (x, y) {
        function sc(e) { return (e.type === se.type ? 2 : 0) + (e.from === a ? 1 : 0); }
        return sc(y) - sc(x);
      });
      var ue = cand[0];
      if (!ue) {
        det.push(a == null || b == null ? "Beziehung fehlt (Element fehlt)" : "Beziehung fehlt");
      } else {
        usedEdges[ue.id] = 1;
        var rev = ue.from !== a;
        s += 1;
        // Typ
        var typeScore = 0;
        if (ue.type === se.type) typeScore = 1;
        else if ((se.type === "aggr" && ue.type === "comp") || (se.type === "comp" && ue.type === "aggr")) typeScore = 0.5;
        else if ((se.type === "inherit" && ue.type === "impl") || (se.type === "impl" && ue.type === "inherit")) typeScore = 0.5;
        if (typeScore > 0 && F.DIRECTED[se.type] && rev) { typeScore *= 0.5; det.push("Richtung vertauscht"); }
        s += 2 * typeScore; // Beziehungstyp zählt doppelt
        det.push("Typ: " + (F.EDGE_LABEL[ue.type] || ue.type) + (typeScore >= 1 ? " ✓" : " statt " + (F.EDGE_LABEL[se.type] || se.type)));
        if (hasMult) {
          var um1 = rev ? ue.m2 : ue.m1, um2 = rev ? ue.m1 : ue.m2, ms = 0, parts = 0;
          [[se.m1, um1], [se.m2, um2]].forEach(function (p) { if (p[0]) { parts++; if (multOk(p[0], p[1], erm)) ms++; } });
          s += parts ? ms / parts : 0;
          det.push((erm ? "Kardinalität " : "Multiplizität ") + (um1 || "?") + " / " + (um2 || "?") + (ms === parts ? " ✓" : " – erwartet " + (se.m1 || "–") + " / " + (se.m2 || "–")));
        }
        if (hasLabel) {
          var lok = F.nameSim(se.label, ue.label || "") >= F.SIM_MIN || F.normName(ue.label || "").indexOf(F.normName(se.label)) >= 0;
          s += lok ? 0.5 : 0;
          det.push("Bedingung " + (lok ? "✓" : "fehlt/abweichend (erwartet " + se.label + ")"));
        }
      }
      got += s; max += w;
      if (ue) marks.edges[ue.id] = mark((s - 1) / (w - 1));
      rubric.push({ label: (F.EDGE_LABEL[se.type] || "Beziehung") + ": " + label, score: w ? s / w : 0, detail: det.join(" · ") });
    });

    var matchedU = {};
    Object.keys(map).forEach(function (k) { matchedU[map[k]] = 1; });
    var extra = (user.nodes || []).filter(function (n) { return !matchedU[n.id]; }).map(nodeName);
    var any = (user.nodes || []).length > 0;
    var r = E.makeResult(q, max ? (q.points * got) / max : 0, { kind: "diagram", rubric: rubric, map: map, marks: marks, extra: extra, answered: any });
    return r;
  };

  /* ================================================ Engine-Erweiterung */

  F.grade = function (q, ans) {
    if (q.type === "trace") return F.gradeTrace(q, ans);
    if (q.type === "bugfix") return F.gradeBugfix(q, ans);
    if (q.type === "diagram") return F.gradeDiagram(q, ans);
    return null;
  };

  var origIsAuto = E.isAuto, origGradeAuto = E.gradeAuto, origValidate = E.validateQuestion;
  E.isAuto = function (q) { return F.isFormat(q) || origIsAuto(q); };
  E.gradeAuto = function (q, ans) { return F.isFormat(q) ? F.grade(q, ans) : origGradeAuto(q, ans); };

  /** Schema-Prüfung der neuen Typen; liefert Fehlerliste */
  F.validate = function (q) {
    var err = [];
    if (q.type === "trace") {
      var t = q.trace;
      if (!q.code || typeof q.code !== "string") err.push("trace: code fehlt");
      if (!t || !Array.isArray(t.columns) || !t.columns.length) err.push("trace.columns fehlen");
      else if (!Array.isArray(t.rows) || !t.rows.length) err.push("trace.rows fehlen");
      else {
        var inputs = 0;
        t.rows.forEach(function (row, i) {
          if (!Array.isArray(row) || row.length !== t.columns.length) err.push("trace.rows[" + i + "] hat " + (row && row.length) + " statt " + t.columns.length + " Zellen");
          else row.forEach(function (c) { if (F.cellKind(c) === "input") inputs++; });
        });
        if (!inputs) err.push("trace: keine auszufüllenden Zellen");
        if (t.labels && t.labels.length !== t.rows.length) err.push("trace.labels passt nicht zu rows");
        // Musterlösung muss volle Punkte ergeben
        var full = { cells: t.rows.map(function (row) { return row.map(function (c) { return F.cellKind(c) === "input" ? alts(c)[0] : ""; }); }) };
        if (!err.length && F.gradeTrace(q, full).pct < 1) err.push("trace: Musterlösung ergibt nicht 100 %");
      }
    }
    if (q.type === "bugfix") {
      var lines = F.codeLines(q.code);
      if (!q.code || typeof q.code !== "string") err.push("bugfix: code fehlt");
      if (!Array.isArray(q.bugs) || !q.bugs.length) err.push("bugfix: bugs fehlen");
      else {
        var seen = {};
        q.bugs.forEach(function (b, i) {
          if (!(b.line >= 1 && b.line <= lines.length) || b.line % 1) err.push("bugs[" + i + "].line ungültig");
          else if (seen[b.line]) err.push("bugs[" + i + "]: Zeile " + b.line + " doppelt");
          seen[b.line] = 1;
          if (!b.fix || typeof b.fix !== "string") err.push("bugs[" + i + "].fix fehlt");
          else if (F.normCode(b.fix) === F.normCode(lines[b.line - 1])) err.push("bugs[" + i + "]: fix gleicht der fehlerhaften Zeile");
          if (b.keys && !Array.isArray(b.keys)) err.push("bugs[" + i + "].keys muss Array sein");
          if (b.keys && b.fix && F.fixScore(b, lines[b.line - 1] || "", b.fix).score < 1) err.push("bugs[" + i + "]: fix erfüllt die eigenen keys nicht");
          if (b.keys && lines[b.line - 1] != null && F.fixScore(b, "", lines[b.line - 1]).score >= 1) err.push("bugs[" + i + "]: fehlerhafte Zeile erfüllt bereits alle keys");
        });
      }
      if (q.lang === "sql" && (!q.sql || typeof q.sql.setup !== "string" || !q.sql.setup.trim())) err.push("bugfix sql: sql.setup fehlt");
    }
    if (q.type === "diagram") {
      var d = q.diagram;
      if (!d || !F.DIAGRAM[d.kind]) err.push("diagram.kind ungültig");
      else if (!d.solution || !Array.isArray(d.solution.nodes) || !d.solution.nodes.length) err.push("diagram.solution.nodes fehlen");
      else {
        var K = F.DIAGRAM[d.kind], ids = {};
        d.solution.nodes.forEach(function (n, i) {
          if (!n.id) err.push("node[" + i + "].id fehlt");
          if (ids[n.id]) err.push("node-id doppelt: " + n.id);
          ids[n.id] = 1;
          if (K.nodes.indexOf(n.type) < 0) err.push("node " + n.id + ": type " + n.type + " passt nicht zu kind " + d.kind);
          if (n.type !== "start" && n.type !== "end" && !n.name) err.push("node " + n.id + ": name fehlt");
        });
        (d.solution.edges || []).forEach(function (e, i) {
          if (!ids[e.from] || !ids[e.to]) err.push("edge[" + i + "]: from/to unbekannt");
          if (K.edges.indexOf(e.type) < 0) err.push("edge[" + i + "]: type " + e.type + " passt nicht zu kind " + d.kind);
        });
        if (!err.length) {
          var self = F.gradeDiagram(q, { model: d.solution });
          if (self.pct < 1) err.push("diagram: Musterlösung gegen sich selbst nur " + Math.round(self.pct * 100) + " %");
        }
      }
    }
    return err;
  };

  E.validateQuestion = function (q, topicIds) {
    var err = origValidate(q, topicIds);
    return F.isFormat(q) ? err.concat(F.validate(q)) : err;
  };
})(typeof window !== "undefined" ? window : globalThis);
