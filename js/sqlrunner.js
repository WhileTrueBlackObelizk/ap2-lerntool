/* AP2-Lerntool – SQL-Ausführung mit sql.js (SQLite/WASM) und Ergebnisvergleich */
(function (root) {
  "use strict";
  var App = (root.App = root.App || {});
  var E = App.engine;
  var Q = (App.sql = {});

  Q._SQL = null;
  Q._loading = null;
  Q.MAX_ROWS_STORED = 60;

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = src;
      s.onload = function () { resolve(); };
      s.onerror = function () { reject(new Error("Konnte " + src + " nicht laden")); };
      document.head.appendChild(s);
    });
  }
  function b64ToBytes(b64) {
    var bin = atob(b64), n = bin.length, out = new Uint8Array(n);
    for (var i = 0; i < n; i++) out[i] = bin.charCodeAt(i);
    return out;
  }

  /** für node-Tests: fertige sql.js-Instanz setzen */
  Q.setLib = function (SQL) { Q._SQL = SQL; };

  /** lädt sql.js lazy; WASM kommt als Base64 (funktioniert auch unter file://) */
  Q.load = function () {
    if (Q._SQL) return Promise.resolve(Q._SQL);
    if (Q._loading) return Q._loading;
    Q._loading = (root.initSqlJs ? Promise.resolve() : loadScript("vendor/sql-wasm.js"))
      .then(function () { return root.SQL_WASM_BASE64 ? null : loadScript("vendor/sql-wasm-binary.js"); })
      .then(function () {
        if (!root.initSqlJs) throw new Error("sql.js nicht verfügbar");
        var opts = {};
        if (root.SQL_WASM_BASE64) opts.wasmBinary = b64ToBytes(root.SQL_WASM_BASE64);
        else opts.locateFile = function (f) { return "vendor/" + f; };
        return root.initSqlJs(opts);
      })
      .then(function (SQL) { Q._SQL = SQL; return SQL; })
      .catch(function (e) { Q._loading = null; throw e; });
    return Q._loading;
  };

  function lastResult(results) {
    if (!results || !results.length) return { columns: [], values: [] };
    var r = results[results.length - 1];
    return { columns: r.columns || [], values: r.values || [] };
  }

  /**
   * führt setup + sql (+ check) auf frischer DB aus.
   * → {results, last, changes, check?} oder {error}
   */
  Q.run = function (SQL, setup, sql, check) {
    var db = new SQL.Database();
    var out = {};
    try {
      try { if (setup) db.exec(setup); } catch (e) { return { error: "Fehler im Setup: " + e.message, setupError: true }; }
      try {
        out.results = db.exec(sql || "");
        out.changes = db.getRowsModified();
        out.last = lastResult(out.results);
      } catch (e) { return { error: e.message }; }
      if (check) {
        try { out.check = lastResult(db.exec(check)); } catch (e) { out.checkError = e.message; }
      }
      return out;
    } finally {
      try { db.close(); } catch (e) { /* ignore */ }
    }
  };

  /** Tabellen der Aufgabe: [{name, columns, values, schema}] */
  Q.tables = function (SQL, setup) {
    var db = new SQL.Database();
    try {
      db.exec(setup || "");
      var names = db.exec("SELECT name, sql FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY rowid");
      if (!names.length) return [];
      return names[0].values.map(function (row) {
        var name = row[0];
        var data = db.exec('SELECT * FROM "' + String(name).replace(/"/g, '""') + '" LIMIT 100');
        var info = db.exec('PRAGMA table_info("' + String(name).replace(/"/g, '""') + '")');
        var cols = info.length ? info[0].values.map(function (c) { return c[1] + (c[2] ? " " + c[2] : "") + (c[5] ? " PK" : ""); }) : [];
        var fk = db.exec('PRAGMA foreign_key_list("' + String(name).replace(/"/g, '""') + '")');
        var fks = {};
        if (fk.length) fk[0].values.forEach(function (f) { fks[f[3]] = f[2] + "." + (f[4] || "?"); });
        var detail = info.length ? info[0].values.map(function (c) { return { name: c[1], type: c[2] || "", notnull: !!c[3], pk: c[5] > 0, fk: fks[c[1]] || null }; }) : [];
        return { name: name, schema: cols, detail: detail, columns: data.length ? data[0].columns : (info.length ? info[0].values.map(function (c) { return c[1]; }) : []), values: data.length ? data[0].values : [] };
      });
    } finally {
      db.close();
    }
  };

  /* ---------------------------------------------------- Vergleich (pur) */

  /** Werte normalisieren: 1 == 1.0, numerische Strings → Zahl, NULL */
  Q.normValue = function (v) {
    if (v == null) return "∅NULL";
    if (typeof v === "number") return "n:" + String(Math.round(v * 1e6) / 1e6);
    if (typeof v === "boolean") return "n:" + (v ? 1 : 0);
    if (v instanceof Uint8Array) return "b:" + Array.prototype.join.call(v, ",");
    var s = String(v).replace(/\s+$/, "");
    if (/^-?\d+(\.\d+)?$/.test(s.trim())) return "n:" + String(Math.round(Number(s) * 1e6) / 1e6);
    return "s:" + s;
  };
  Q.rowKey = function (row) { return JSON.stringify((row || []).map(Q.normValue)); };

  /** Vergleich zweier Ergebnismengen {columns, values}; Spaltennamen werden ignoriert */
  Q.compare = function (exp, act, ordered) {
    exp = exp || { columns: [], values: [] };
    act = act || { columns: [], values: [] };
    var ev = exp.values || [], av = act.values || [];
    if (!ev.length && !av.length) return { equal: true };
    var ec = ev.length ? ev[0].length : exp.columns.length;
    var ac = av.length ? av[0].length : act.columns.length;
    if ((!ev.length || !av.length) && ev.length !== av.length) return { equal: false, reason: "Zeilenanzahl abweichend (erwartet " + ev.length + ", erhalten " + av.length + ")" };
    if (ec !== ac) return { equal: false, reason: "Spaltenanzahl abweichend (erwartet " + ec + ", erhalten " + ac + ")" };
    if (ev.length !== av.length) return { equal: false, reason: "Zeilenanzahl abweichend (erwartet " + ev.length + ", erhalten " + av.length + ")" };
    var ek = ev.map(Q.rowKey), ak = av.map(Q.rowKey);
    if (ordered) {
      for (var i = 0; i < ek.length; i++) if (ek[i] !== ak[i]) {
        var sameSet = ek.slice().sort().join("|") === ak.slice().sort().join("|");
        return { equal: false, reason: sameSet ? "Richtige Datensätze, aber falsche Reihenfolge (ORDER BY prüfen)" : "Werte abweichend (ab Zeile " + (i + 1) + ")" };
      }
      return { equal: true };
    }
    ek.sort(); ak.sort();
    for (var j = 0; j < ek.length; j++) if (ek[j] !== ak[j]) return { equal: false, reason: "Werte abweichend" };
    return { equal: true };
  };

  /* ------------------------------------------- Teilpunkte (IHK-Raster) */

  var KW = ("select distinct all from where group by having order asc desc limit offset join inner left right full outer cross on using as and or not in is null like between exists " +
    "case when then else end union intersect except insert into values update set delete create table view index drop alter add column primary key foreign references " +
    "unique check default constraint cascade restrict no action integer int text varchar char decimal numeric real date boolean begin commit rollback transaction grant revoke to " +
    "count sum avg min max round coalesce ifnull upper lower length substr strftime julianday trigger after before for each row if").split(" ");
  var KWSET = {};
  KW.forEach(function (k) { KWSET[k] = 1; });
  var AGG = ["count", "sum", "avg", "min", "max"];

  /** einfache SQL-Zerlegung: Typ, Klauseln (oberste Ebene), Tabellen, Bezeichner, Literale */
  Q.analyze = function (sql) {
    var src = String(sql || "").replace(/--[^\n]*/g, " ").replace(/\/\*[\s\S]*?\*\//g, " ");
    var lits = [];
    src = src.replace(/'(?:[^']|'')*'/g, function (m) { lits.push(m.slice(1, -1).replace(/''/g, "'").toLowerCase()); return " ?lit? "; });
    var low = src.toLowerCase().replace(/\s+/g, " ").trim();
    (low.match(/(^|[^\w.])(\d+(?:\.\d+)?)(?![\w.])/g) || []).forEach(function (m) { lits.push(String(Number(m.replace(/[^\d.]/g, "")))); });
    var type = (low.match(/^\s*(select|with|insert|update|delete|create|alter|drop|grant|revoke|begin|start)/) || [])[1] || "";
    if (type === "with") type = "select";
    // Klauseln auf oberster Klammerebene finden
    var CL = ["select", "from", "where", "group by", "having", "order by", "limit", "set", "values", "into"];
    var clauses = {}, depth = 0, marks = [];
    for (var i = 0; i < low.length; i++) {
      var ch = low[i];
      if (ch === "(") { depth++; continue; }
      if (ch === ")") { depth--; continue; }
      if (depth !== 0) continue;
      if (i > 0 && /\w/.test(low[i - 1])) continue;
      for (var k = 0; k < CL.length; k++) {
        var c = CL[k];
        if (low.substr(i, c.length) === c && !/\w/.test(low[i + c.length] || "")) { marks.push({ c: c, i: i, s: i + c.length }); i += c.length - 1; break; }
      }
    }
    marks.forEach(function (m, j) {
      var end = j + 1 < marks.length ? marks[j + 1].i : low.length;
      if (!(m.c in clauses)) clauses[m.c] = low.slice(m.s, end).trim();
    });
    function idents(s) {
      return (String(s || "").match(/[a-zäöüß_][\wäöüß]*(?:\.[a-zäöüß_][\wäöüß]*)?/g) || [])
        .map(function (w) { return w.indexOf(".") >= 0 ? w.split(".")[1] : w; })
        .filter(function (w) { return !KWSET[w] && w !== "lit"; });
    }
    // Tabellen: Wort nach FROM / JOIN / UPDATE / INTO / TABLE / Komma in FROM
    var tables = [];
    (low.match(/\b(?:from|join|update|into|table|on table)\s+[a-zäöüß_][\wäöüß]*/g) || []).forEach(function (m) { tables.push(m.split(/\s+/).pop()); });
    if (clauses.from) clauses.from.split(",").forEach(function (part) { var w = (part.trim().match(/^[a-zäöüß_][\wäöüß]*/) || [])[0]; if (w) tables.push(w); });
    tables = uniq(tables.filter(function (t) { return !KWSET[t] && t !== "select"; }));
    var joins = (low.match(/\b(left|right|full|inner|cross)?\s*(outer\s+)?join\b/g) || []).map(function (j) { return /left|right|full/.test(j) ? "outer" : "inner"; });
    var orderDesc = clauses["order by"] ? /\bdesc\b/.test(clauses["order by"]) : false;
    return {
      type: type, clauses: clauses, tables: tables, joins: joins,
      selectCols: uniq(idents(clauses.select)), whereCols: uniq(idents(clauses.where)),
      groupCols: uniq(idents(clauses["group by"])), orderCols: uniq(idents(clauses["order by"])), setCols: uniq(idents((clauses.set || "").replace(/=[^,]*/g, ""))),
      aggs: uniq(AGG.filter(function (a) { return new RegExp("\\b" + a + "\\s*\\(").test(low); })),
      sub: /\(\s*select\b/.test(low), distinct: /\bselect\s+distinct\b/.test(low), orderDesc: orderDesc,
      lits: uniq(lits), star: /\bselect\s+(distinct\s+)?\*/.test(low),
    };
  };
  function uniq(a) { var s = {}; return a.filter(function (x) { if (s[x]) return false; s[x] = 1; return true; }); }
  /** Übereinstimmung zweier Mengen (F1) */
  function overlap(exp, act) {
    if (!exp.length && !act.length) return 1;
    if (!exp.length || !act.length) return 0;
    var hit = exp.filter(function (x) { return act.indexOf(x) >= 0; }).length;
    var p = hit / act.length, r = hit / exp.length;
    return p + r ? (2 * p * r) / (p + r) : 0;
  }
  /** Zeilen-Übereinstimmung als Multimenge (F1) */
  function rowOverlap(ev, av) {
    if (!ev.length && !av.length) return 1;
    if (!ev.length || !av.length) return 0;
    var pool = {};
    ev.map(Q.rowKey).forEach(function (k) { pool[k] = (pool[k] || 0) + 1; });
    var hit = 0;
    av.map(Q.rowKey).forEach(function (k) { if (pool[k]) { pool[k]--; hit++; } });
    var p = hit / av.length, r = hit / ev.length;
    return { f1: p + r ? (2 * p * r) / (p + r) : 0, hit: hit };
  }
  /** Spalten mit gleicher Wertemenge (unabhängig von Zeilen-/Spaltenreihenfolge) */
  function columnMatch(ev, av) {
    if (!ev.length || !av.length) return 0;
    var nc = ev[0].length, na = av[0].length;
    var colKey = function (rows, c) { return rows.map(function (r) { return Q.normValue(r[c]); }).sort().join("|"); };
    var actKeys = [];
    for (var j = 0; j < na; j++) actKeys.push(colKey(av, j));
    var hit = 0;
    for (var i = 0; i < nc; i++) if (actKeys.indexOf(colKey(ev, i)) >= 0) hit++;
    return hit / nc;
  }

  /**
   * Teilpunkte nach Raster: Struktur der Anweisung (auch bei Syntaxfehler) + Ergebnis.
   * → {frac (0..1), items:[{label, score (0..1), detail}]}
   */
  Q.partial = function (q, userSql, exp, act, e, a, hasError) {
    var S0 = Q.analyze(q.sql.solution), U0 = Q.analyze(userSql);
    var items = [];
    function add(label, w, score, detail) { items.push({ label: label, w: w, score: Math.max(0, Math.min(1, score)), detail: detail || "" }); }
    function list(x) { return x.length ? x.join(", ") : "–"; }
    add("Anweisungstyp", 1, S0.type === U0.type ? 1 : 0, U0.type ? U0.type.toUpperCase() + (S0.type !== U0.type ? " statt " + S0.type.toUpperCase() : "") : "nicht erkannt");
    add("Tabellen", 2, overlap(S0.tables, U0.tables), "erwartet: " + list(S0.tables) + " · bei dir: " + list(U0.tables));
    if (S0.type === "select" && !S0.star) add("Ausgabespalten (SELECT)", 2, U0.star ? 0.3 : overlap(S0.selectCols, U0.selectCols), U0.star ? "SELECT * statt konkreter Spalten" : "");
    if (S0.joins.length) {
      var jt = !U0.joins.length ? (U0.tables.length >= S0.tables.length && U0.whereCols.length ? 0.5 : 0) : (S0.joins.indexOf("outer") >= 0) === (U0.joins.indexOf("outer") >= 0) ? 1 : 0.5;
      add("Verknüpfung (JOIN)", 1.5, jt, S0.joins.indexOf("outer") >= 0 ? "äußerer Verbund (LEFT JOIN) erwartet" : "");
    }
    if (S0.clauses.where != null) add("Bedingung (WHERE)", 2, U0.clauses.where == null ? 0 : 0.4 + 0.3 * overlap(S0.whereCols, U0.whereCols) + 0.3 * overlap(S0.lits, U0.lits), U0.clauses.where == null ? "WHERE fehlt" : "");
    if (S0.aggs.length) add("Aggregatfunktionen", 1.5, overlap(S0.aggs, U0.aggs), "erwartet: " + list(S0.aggs.map(function (x) { return x.toUpperCase(); })));
    if (S0.clauses["group by"] != null) add("Gruppierung (GROUP BY)", 1.5, U0.clauses["group by"] == null ? 0 : 0.4 + 0.6 * overlap(S0.groupCols, U0.groupCols), U0.clauses["group by"] == null ? "GROUP BY fehlt" : "");
    if (S0.clauses.having != null) add("Gruppenbedingung (HAVING)", 1, U0.clauses.having == null ? 0 : 1, U0.clauses.having == null ? "HAVING fehlt" : "");
    if (S0.sub) add("Unterabfrage", 0.75, U0.sub || U0.joins.length > S0.joins.length ? 1 : 0, U0.sub ? "" : "keine Unterabfrage");
    if (S0.clauses["order by"] != null) add("Sortierung (ORDER BY)", 1, U0.clauses["order by"] == null ? 0 : 0.5 + 0.3 * overlap(S0.orderCols, U0.orderCols) + 0.2 * (S0.orderDesc === U0.orderDesc ? 1 : 0), U0.clauses["order by"] == null ? "ORDER BY fehlt" : "");
    if (S0.type === "update") add("Geänderte Spalten (SET)", 1.5, overlap(S0.setCols, U0.setCols), "erwartet: " + list(S0.setCols));
    if (S0.type === "insert" || S0.type === "create") add("Werte/Definitionen", 1.5, overlap(S0.lits.concat(S0.selectCols), U0.lits.concat(U0.selectCols)) || overlap(S0.lits, U0.lits), "");
    var struct = sum(items);

    var result = 0, resItems = [];
    if (!hasError && e && a) {
      var ev = e.values || [], av = a.values || [];
      var ec = ev.length ? ev[0].length : (e.columns || []).length, ac = av.length ? av[0].length : (a.columns || []).length;
      var ro = rowOverlap(ev, av), cm = columnMatch(ev, av);
      resItems.push({ label: "Ergebnis: Spaltenanzahl", w: 1, score: ec === ac ? 1 : 0, detail: "erwartet " + ec + ", erhalten " + ac });
      resItems.push({ label: "Ergebnis: Datensätze", w: 3, score: ro.f1 != null ? ro.f1 : ro, detail: (ro.hit || 0) + " von " + ev.length + " erwarteten Zeilen richtig" + (av.length !== ev.length ? " (du lieferst " + av.length + ")" : "") });
      resItems.push({ label: "Ergebnis: Spaltenwerte", w: 1.5, score: cm, detail: Math.round(cm * ec) + " von " + ec + " Spalten mit richtigen Werten" });
      if (q.sql.ordered) {
        var sameOrder = ev.length === av.length && ev.every(function (r, i) { return Q.rowKey(r) === Q.rowKey(av[i]); });
        resItems.push({ label: "Ergebnis: Reihenfolge", w: 0.5, score: sameOrder ? 1 : 0, detail: "" });
      }
      result = sum(resItems);
    }
    var frac = hasError ? struct * 0.5 : 0.45 * struct + 0.55 * result;
    frac = Math.min(frac, 0.75); // nicht exakt richtig → nie „gelöst“ (Schwelle 80 %)
    return { frac: frac, items: items.concat(resItems), struct: struct, result: result };
  };
  function sum(items) {
    var w = 0, s = 0;
    items.forEach(function (x) { w += x.w; s += x.w * x.score; });
    return w ? s / w : 0;
  }

  function trim(r) {
    if (!r) return r;
    return { columns: r.columns, values: (r.values || []).slice(0, Q.MAX_ROWS_STORED), total: (r.values || []).length };
  }

  /** Bewertung einer SQL-Aufgabe (synchron, sql.js muss geladen sein) */
  Q.gradeWith = function (SQL, q, userSql) {
    var s = q.sql || {};
    var text = String(userSql || "").trim();
    if (!text) return E.makeResult(q, 0, { kind: "sql", answered: false, error: "Keine Anweisung eingegeben." });
    var exp = Q.run(SQL, s.setup, s.solution, s.check);
    if (exp.error || exp.checkError) {
      var r0 = E.makeResult(q, 0, { kind: "sql", answered: true, solutionError: exp.error || exp.checkError });
      r0.final = false; r0.needsSelf = true;
      return r0;
    }
    var act = Q.run(SQL, s.setup, text, s.check);
    var e = s.check ? exp.check : exp.last;
    function partialPts(p) { return Math.min(q.points - 0.5, Math.floor(q.points * p.frac * 2) / 2); }
    if (act.error || (s.check && act.checkError)) {
      var pe = Q.partial(q, text, exp, act, e, null, true);
      return E.makeResult(q, Math.max(0, partialPts(pe)), {
        kind: "sql", answered: true, error: act.error || "Kontrollabfrage nach Ihrer Anweisung fehlgeschlagen: " + act.checkError,
        expected: trim(e), rubric: pe.items,
      });
    }
    var a = s.check ? act.check : act.last;
    var cmp = Q.compare(e, a, !!s.ordered);
    var extra = { kind: "sql", answered: true, match: cmp.equal, reason: cmp.reason || "", expected: trim(e), actual: trim(a), viaCheck: !!s.check };
    if (cmp.equal) return E.makeResult(q, q.points, extra);
    var p = Q.partial(q, text, exp, act, e, a, false);
    extra.rubric = p.items;
    return E.makeResult(q, Math.max(0, partialPts(p)), extra);
  };

  Q.grade = function (q, userSql) {
    return Q.load().then(function (SQL) { return Q.gradeWith(SQL, q, userSql); });
  };

  /** prüft eine (KI-)SQL-Aufgabe: setup+solution(+check) müssen laufen */
  Q.validateTask = function (SQL, q) {
    var s = q.sql || {};
    var r = Q.run(SQL, s.setup, s.solution, s.check);
    if (r.error) return r.error;
    if (s.check && r.checkError) return "check: " + r.checkError;
    if (!s.check && (!r.last.values.length)) return "Lösung liefert keine Zeilen";
    return null;
  };
})(typeof window !== "undefined" ? window : globalThis);
