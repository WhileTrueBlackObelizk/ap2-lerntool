/* AP2-Lerntool – Paket A: Oberfläche der neuen Prüfungsformate (Schreibtischtest, Diagramm, Fehler finden)
 * und Einbindung in Training, Lernpfad, Fehlerheft und Statistik.
 * Erweitert QCard, App.grader und die Views per Wrapping – components.js bleibt unverändert. */
(function (root) {
  "use strict";
  var App = (root.App = root.App || {});
  var U = App.util, E = App.engine, UI = App.ui, S = App.store, D = App.data, F = App.formats;
  var V = (App.views = App.views || {});
  var QCard = App.QCard;

  function esc(s) { return U.esc(s); }
  function clone(o) { return JSON.parse(JSON.stringify(o || null)); }

  /** Pseudocode/SQL mit Zeilennummern */
  F.codeHtml = function (code, cls) {
    return '<ol class="fmt-code ' + (cls || "") + '">' + F.codeLines(code).map(function (l, i) {
      return '<li><span class="ln">' + (i + 1) + "</span><code>" + (esc(l) || " ") + "</code></li>";
    }).join("") + "</ol>";
  };
  /** Bewertungsraster ohne den SQL-spezifischen 75-%-Hinweis */
  function rubric(items, r) {
    return UI.rubricHtml(items, r).replace(/ – nicht exakt richtige Lösungen erhalten höchstens 75 %/, "");
  }

  /* ================================================== Schreibtischtest */

  function renderTrace(card, box, locked) {
    var q = card.q, a = card.answer, r = card.result, t = q.trace || {};
    var graded = !!(r && r.kind === "trace");
    var reveal = !graded && (card.mode === "review" || !!(r && r.final)); // „Lösung zeigen“: Musterwerte eintragen
    a.cells = a.cells || [];
    var html = '<div class="hint">Code ausführen wie der Rechner: Tragen Sie je Zeile die Werte ein. Leere Zelle = keine Änderung/keine Ausgabe (auch „-“). Listen als <code>3,1,2</code>. Enter springt zur nächsten Zelle.</div>' +
      F.codeHtml(q.code) +
      '<div class="tablewrap"><table class="fmt-trace"><thead><tr><th class="lbl">' + (t.labels ? "Schritt" : "#") + "</th>" +
      (t.columns || []).map(function (c) { return "<th>" + esc(c) + "</th>"; }).join("") + "</tr></thead><tbody>";
    (t.rows || []).forEach(function (row, ri) {
      html += '<tr><th class="lbl">' + esc(t.labels ? t.labels[ri] : ri + 1) + "</th>";
      row.forEach(function (cell, ci) {
        var kind = F.cellKind(cell);
        if (kind === "none") { html += '<td class="none"></td>'; return; }
        if (kind === "given") { html += '<td class="given">' + esc(cell.g) + "</td>"; return; }
        var v = (a.cells[ri] || [])[ci];
        v = v == null ? "" : String(v);
        var m = graded && r.marks[ri] ? r.marks[ri][ci] : null;
        var cls = graded ? (m ? " ok" : " bad") : "";
        if (reveal) { html += '<td class="cell reveal"><span class="exp">' + esc(String(cell).split("|")[0]) + "</span></td>"; return; }
        html += '<td class="cell' + cls + '"><input class="input fmt-cell" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" data-r="' + ri + '" data-c="' + ci + '" aria-label="' +
          esc((t.labels ? t.labels[ri] : "Zeile " + (ri + 1)) + ", " + t.columns[ci]) + '" value="' + esc(v) + '"' + (locked ? " disabled" : "") + ">" +
          (graded && !m ? '<span class="exp" title="richtig">' + esc(String(cell).split("|")[0] || "leer") + "</span>" : "") + "</td>";
      });
      html += "</tr>";
    });
    box.innerHTML = html + "</tbody></table></div>";
    var inputs = UI.$$("input.fmt-cell", box);
    inputs.forEach(function (inp, k) {
      inp.addEventListener("input", function () {
        var ri = Number(inp.getAttribute("data-r")), ci = Number(inp.getAttribute("data-c"));
        a.cells[ri] = a.cells[ri] || [];
        a.cells[ri][ci] = inp.value;
        card.changed();
      });
      inp.addEventListener("keydown", function (ev) {
        if (ev.key === "Enter" && !ev.ctrlKey && !ev.metaKey) {
          ev.preventDefault(); ev.stopPropagation();
          var nx = inputs[k + (ev.shiftKey ? -1 : 1)];
          if (nx) nx.focus();
        }
      });
    });
  }

  function traceDetail(q, r) {
    if (r.kind === "trace") return "<p>" + r.right + " von " + r.total + " Zellen richtig. Falsche Zellen sind rot markiert, darunter steht der richtige Wert.</p>" + (r.rubric.length > 1 ? rubric(r.rubric, r) : "");
    return "";
  }

  /* ===================================================== Fehler finden */

  function renderBugfix(card, box, locked) {
    var q = card.q, a = card.answer, r = card.result;
    var lines = F.codeLines(q.code);
    var show = r && (r.final || r.needsSelf) || card.mode === "review";
    var bugBy = {};
    (q.bugs || []).forEach(function (b) { bugBy[b.line] = b; });
    a.marked = a.marked || {};
    a.fixes = a.fixes || {};
    var html = '<div class="hint">Tippen Sie fehlerhafte Zeilen an und schreiben Sie darunter die korrigierte Zeile. Falsch markierte Zeilen kosten Punkte.</div>' +
      '<ol class="fmt-bug' + (q.lang === "sql" ? " sql" : "") + '">';
    lines.forEach(function (l, i) {
      var n = i + 1, on = !!a.marked[n], b = bugBy[n], cls = on ? " marked" : "";
      if (show) cls += b ? (on ? " found" : " missed") : on ? " wrong" : "";
      html += '<li class="bline' + cls + '" data-line="' + n + '"><label class="bl"><input type="checkbox" data-mark="' + n + '"' + (on ? " checked" : "") + (locked ? " disabled" : "") +
        ' aria-label="Zeile ' + n + ' als fehlerhaft markieren"><span class="ln">' + n + "</span><code>" + (esc(l) || " ") + "</code></label>" +
        '<div class="bfix' + (on ? "" : " hidden") + '"><input class="input mono" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" data-fix="' + n + '" aria-label="Korrektur für Zeile ' + n + '" value="' +
        esc(a.fixes[n] != null ? a.fixes[n] : l) + '"' + (locked ? " disabled" : "") + "></div>";
      if (show && b) {
        var res = r && r.bugs ? r.bugs.filter(function (x) { return x.line === n; })[0] : null;
        html += '<div class="bsol"><span class="tag">' + (res && res.found && res.fix >= 1 ? "✓" : res && res.found ? "◐" : "✗") + " Musterkorrektur:</span> <code>" + esc(b.fix.trim()) + "</code>" +
          (b.why ? '<div class="muted small">' + U.rich(b.why) + "</div>" : "") + "</div>";
      }
      html += "</li>";
    });
    html += "</ol>";
    if (q.lang === "sql" && q.sql) {
      html += '<div class="sqlbar"><button type="button" class="btn small" data-act="runfix">▶ Mit meinen Korrekturen ausführen</button><button type="button" class="btn small" data-act="beiblatt">📄 Beiblatt <kbd>B</kbd></button><span class="muted small">SQLite · frische Datenbank je Ausführung</span></div><div class="sqlout"></div>';
    }
    box.innerHTML = html;
    UI.$$("[data-mark]", box).forEach(function (cb) {
      cb.addEventListener("change", function () {
        var n = Number(cb.getAttribute("data-mark")), li = cb.closest("li");
        if (cb.checked) a.marked[n] = true; else delete a.marked[n];
        li.classList.toggle("marked", cb.checked);
        var fx = UI.$(".bfix", li);
        fx.classList.toggle("hidden", !cb.checked);
        if (cb.checked) { var inp = UI.$("input", fx); try { inp.focus({ preventScroll: true }); inp.setSelectionRange(inp.value.length, inp.value.length); } catch (e) { /* ignore */ } }
        card.changed();
      });
    });
    UI.$$("[data-fix]", box).forEach(function (inp) {
      inp.addEventListener("input", function () { a.fixes[Number(inp.getAttribute("data-fix"))] = inp.value; card.changed(); });
      inp.addEventListener("keydown", function (ev) { if (ev.key === "Enter" && !ev.ctrlKey && !ev.metaKey) ev.preventDefault(); });
    });
    var rb = UI.$('[data-act="runfix"]', box);
    if (rb) rb.addEventListener("click", function () { runPatched(card); });
    var bb = UI.$('[data-act="beiblatt"]', box);
    if (bb) bb.addEventListener("click", function () { UI.beiblatt.open(q, "data"); });
    if (q.lang === "sql" && q.sql && UI.beiblatt) UI.beiblatt.attach(q);
  }

  function userFixes(q, a) {
    var fx = {};
    Object.keys(a.marked || {}).forEach(function (k) { if (a.marked[k] && a.fixes && a.fixes[k] != null) fx[k] = a.fixes[k]; });
    return fx;
  }

  async function runPatched(card) {
    var q = card.q, out = UI.$(".sqlout", card.el);
    out.innerHTML = '<div class="muted"><span class="spinner"></span> SQL-Engine wird geladen …</div>';
    try {
      var SQL = await App.sql.load();
      var code = F.patchCode(q.code, userFixes(q, card.answer));
      var r = App.sql.run(SQL, q.sql.setup, code, q.sql.check);
      if (r.error) { out.innerHTML = '<div class="notice error"><strong>Fehler:</strong> ' + esc(r.error) + "</div>"; return; }
      var html = "";
      if (r.results && r.results.length) html += UI.resultTable({ columns: r.last.columns, values: r.last.values.slice(0, 100), total: r.last.values.length }, "Ergebnis");
      else html += '<div class="notice">Anweisung ausgeführt' + (r.changes ? " – " + r.changes + " Zeile(n) geändert" : "") + ".</div>";
      if (q.sql.check && r.check) html += UI.resultTable({ columns: r.check.columns, values: r.check.values.slice(0, 100), total: r.check.values.length }, "Kontrollabfrage: <code>" + esc(q.sql.check) + "</code>");
      out.innerHTML = html;
    } catch (e) { out.innerHTML = '<div class="notice error">' + esc(e.message) + "</div>"; }
  }

  /** SQL-Korrekturen ausführen: Code mit Nutzer-Korrektur dieser Zeile + Musterkorrektur der übrigen Fehler */
  async function gradeBugfixSql(q, ans) {
    var extra = {};
    try {
      var SQL = await App.sql.load();
      var exp = App.sql.run(SQL, q.sql.setup, q.sql.solution || F.fixedCode(q), q.sql.check);
      if (!exp.error) {
        var e = q.sql.check ? exp.check : exp.last;
        var model = {};
        (q.bugs || []).forEach(function (b) { model[b.line] = b.fix; });
        (q.bugs || []).forEach(function (b) {
          if (!ans.marked || !ans.marked[b.line] || !ans.fixes || ans.fixes[b.line] == null) return;
          var fx = Object.assign({}, model);
          fx[b.line] = ans.fixes[b.line];
          if (F.normCode(fx[b.line]) === F.normCode(F.codeLines(q.code)[b.line - 1])) return;
          var act = App.sql.run(SQL, q.sql.setup, F.patchCode(q.code, fx), q.sql.check);
          if (act.error || act.checkError) return;
          if (App.sql.compare(e, q.sql.check ? act.check : act.last, !!q.sql.ordered).equal) extra[b.line] = 1;
        });
      }
    } catch (err) { /* ohne SQL-Engine: nur Schlüsselwort-Abgleich */ }
    return F.gradeBugfix(q, ans, extra);
  }

  function bugfixDetail(q, r) {
    if (r.kind !== "bugfix") return "";
    var found = r.bugs.filter(function (b) { return b.found; }).length;
    return "<p>" + found + " von " + r.bugs.length + " Fehlern gefunden" + (r.falseMarks.length ? ", " + r.falseMarks.length + " Zeile(n) fälschlich markiert" : "") + ".</p>" + rubric(r.rubric, r) +
      "<div class='sub'>Korrigierter Code:</div>" + F.codeHtml(F.fixedCode(q), "small");
  }

  /* =========================================================== Diagramm */

  function renderDiagram(card, box, locked) {
    var q = card.q, a = card.answer, r = card.result, d = q.diagram || {};
    if (card._dg) { try { card._dg.destroy(); } catch (e) { /* ignore */ } card._dg = null; }
    if (!a.model) a.model = clone(d.start) || { nodes: [], edges: [] };
    a.model.nodes = a.model.nodes || []; a.model.edges = a.model.edges || [];
    var K = F.DIAGRAM[d.kind] || {};
    box.innerHTML = '<div class="hint">' + esc(K.label || "Diagramm") + ": Elemente über die Werkzeugleiste hinzufügen, antippen zum Bearbeiten, ziehen zum Verschieben. Beziehungen per „Verbinden“ oder über das Formular unten.</div><div class=\"fmt-dg\"></div>";
    var host = UI.$(".fmt-dg", box);
    if (!App.DiagramEditor) { host.innerHTML = '<div class="notice error">Diagrammeditor nicht geladen.</div>'; return; }
    var show = r && (r.final || r.needsSelf);
    if (locked || card.mode === "flash") {
      host.innerHTML = App.DiagramEditor.svg(a.model, d.kind, show && r.marks ? r.marks : null);
      if (!a.model.nodes.length) host.innerHTML = '<p class="muted small">(kein Diagramm gezeichnet)</p>';
      return;
    }
    card._dg = new App.DiagramEditor(host, {
      kind: d.kind, model: a.model, readOnly: false,
      onChange: function () { a.touched = true; card.changed(); },
    });
  }

  function diagramDetail(q, r) {
    var d = q.diagram || {}, html = "";
    if (r.kind === "diagram") {
      html += "<p>Bewertet nach Raster aus der Musterlösung: Elemente (tolerant bei Schreibweise), Attribute/Methoden, Beziehungen, Typ, Richtung und Multiplizität. Ihr Diagramm oben ist entsprechend eingefärbt.</p>" + rubric(r.rubric, r);
      if (r.extra && r.extra.length) html += '<p class="muted small">Zusätzliche Elemente (nicht in der Musterlösung, kein Abzug): ' + esc(r.extra.join(", ")) + "</p>";
    }
    if (App.DiagramEditor) html += "<div class='sub'>Musterlösung (Diagramm):</div><div class='fmt-dg sol'>" + App.DiagramEditor.svg(clone(d.solution), d.kind) + "</div>";
    return html;
  }

  /* ================================================ QCard-Erweiterung */

  var RENDER = { trace: renderTrace, bugfix: renderBugfix, diagram: renderDiagram };
  var origRender = QCard.prototype.renderInput;
  QCard.prototype.renderInput = function () {
    var fn = RENDER[this.q.type];
    if (!fn) return origRender.apply(this, arguments);
    if (!(this.q.type === "bugfix" && this.q.lang === "sql") && this.mode !== "review" && UI.beiblatt) UI.beiblatt.detach();
    fn(this, UI.$(".qinput", this.el), this.locked());
  };
  var origFocus = QCard.prototype.focus;
  QCard.prototype.focus = function () {
    if (this.q.type === "trace") {
      var f = UI.$("input.fmt-cell:not([disabled])", this.el);
      if (f && root.matchMedia && root.matchMedia("(pointer:fine)").matches) try { f.focus({ preventScroll: true }); } catch (e) { /* ignore */ }
      return;
    }
    if (F.isFormat(this.q)) return;
    return origFocus.apply(this, arguments);
  };

  var G = App.grader;
  var origGrade = G.grade, origAnswered = G.isAnswered, origDescribe = G.describeAnswer;
  G.grade = async function (q, ans, opts) {
    if (!F.isFormat(q)) return origGrade.apply(G, arguments);
    ans = ans || {};
    if (q.type === "bugfix" && q.lang === "sql" && q.sql && q.sql.setup) return gradeBugfixSql(q, ans);
    return F.grade(q, ans);
  };
  G.isAnswered = function (q, ans) {
    if (!F.isFormat(q)) return origAnswered.apply(G, arguments);
    if (!ans) return false;
    if (q.type === "trace") return (ans.cells || []).some(function (row) { return (row || []).some(function (v) { return String(v || "").trim(); }); });
    if (q.type === "bugfix") return Object.keys(ans.marked || {}).some(function (k) { return ans.marked[k]; });
    return !!(ans.touched && ans.model && ans.model.nodes && ans.model.nodes.length);
  };
  G.describeAnswer = function (q, ans) {
    if (!F.isFormat(q)) return origDescribe.apply(G, arguments);
    ans = ans || {};
    var t = q.trace || {};
    if (q.type === "trace") return "Trace-Tabelle: " + (t.rows || []).map(function (row, ri) { return (t.labels ? t.labels[ri] : "Zeile " + (ri + 1)) + ": " + row.map(function (c, ci) { return F.cellKind(c) === "input" ? t.columns[ci] + "=" + ((ans.cells || [])[ri] || [])[ci] : ""; }).filter(Boolean).join(", "); }).join(" | ");
    if (q.type === "bugfix") return "Markierte Zeilen: " + Object.keys(ans.marked || {}).filter(function (k) { return ans.marked[k]; }).map(function (k) { return k + " → " + (ans.fixes && ans.fixes[k] != null ? ans.fixes[k] : "(unverändert)"); }).join(" | ");
    var m = ans.model || { nodes: [], edges: [] };
    var nm = {};
    m.nodes.forEach(function (n) { nm[n.id] = n.name || n.type; });
    return "Elemente: " + m.nodes.map(function (n) { return n.name || n.type; }).join(", ") + " · Beziehungen: " + m.edges.map(function (e) { return nm[e.from] + " –" + e.type + "→ " + nm[e.to] + (e.m1 || e.m2 ? " (" + (e.m1 || "") + "/" + (e.m2 || "") + ")" : ""); }).join(", ");
  };

  var origResult = UI.resultHtml;
  UI.resultHtml = function (q, r, ans) {
    var html = origResult.apply(UI, arguments);
    if (!r || !F.isFormat(q)) return html;
    var d = q.type === "trace" ? traceDetail(q, r) : q.type === "bugfix" ? bugfixDetail(q, r) : diagramDetail(q, r);
    if (r.kind === "giveup" && q.type === "bugfix") d = "<div class='sub'>Korrigierter Code:</div>" + F.codeHtml(F.fixedCode(q), "small");
    var i = html.indexOf("</div>");
    return i < 0 ? html + d : html.slice(0, i + 6) + d + html.slice(i + 6);
  };

  /* ========================================================== Training */

  var TILES = [
    { type: "trace", title: "Schreibtischtest", icon: "▦", text: "Pseudocode Schritt für Schritt ausführen und die Trace-Tabelle ausfüllen – jede Zelle wird geprüft." },
    { type: "diagram", title: "Diagramme", icon: "◫", text: "UML-Klassen-, Aktivitäts- und Use-Case-Diagramme sowie ERM im Editor zeichnen – Bewertung nach Raster." },
    { type: "bugfix", title: "Fehler finden", icon: "⚑", text: "Fehlerhaften Pseudocode bzw. SQL lesen, Fehlerzeilen markieren und korrigieren." },
  ];
  F.traceGenerators = function () { return (D.generators || []).filter(function (g) { return /^gen-trace-/.test(g.id); }); };
  F.questionsOf = function (type, filter) { return D.questions.filter(function (q) { return q.type === type && (!filter || filter(q)); }); };

  F.practice = function (type, filter, title) {
    var qs = E.buildSession(F.questionsOf(type, filter), S.state.progress, { count: 10, mode: "mixed" }, U.today());
    App.startSession(qs, { title: title || U.TYPE_LABEL[type], backHref: "#/train" });
  };
  F.endlessTrace = function () {
    var gs = F.traceGenerators();
    if (!gs.length) { UI.toast("Keine Schreibtischtest-Generatoren geladen.", "error"); return; }
    function make() {
      for (var k = 0; k < 5; k++) {
        try { return D.fromGenerator(gs[Math.floor(Math.random() * gs.length)], Math.random); } catch (e) { /* nächster Versuch */ }
      }
      return null;
    }
    var first = make();
    if (first) App.startSession([first], { title: "Schreibtischtest – Zufallsaufgaben", endless: make, backHref: "#/train" });
  };

  function tilesHtml() {
    var pr = S.state.progress, day = U.today();
    return '<section class="card fmt-tiles"><h2>Prüfungsformate</h2><p class="muted small">Typische AP2-Aufgabenformate gezielt trainieren. Die Aufgaben zählen wie alle anderen für Leitner-Wiederholung, Fehlerheft und Statistik.</p><div class="topicgrid">' +
      TILES.map(function (t) {
        var qs = F.questionsOf(t.type), st = E.topicStats(qs, pr, day);
        var extra = "";
        if (t.type === "trace") extra = '<button type="button" class="btn small" data-fmt-endless>∞ Zufallsaufgaben (' + F.traceGenerators().length + " Generatoren)</button>";
        if (t.type === "diagram") extra = ["class", "erm", "activity", "usecase"].map(function (k) {
          var n = F.questionsOf("diagram", function (q) { return q.diagram && q.diagram.kind === k; }).length;
          return n ? '<button type="button" class="btn small ghost" data-fmt-kind="' + k + '">' + esc({ class: "Klasse", erm: "ERM", activity: "Aktivität", usecase: "Use Case" }[k]) + " (" + n + ")</button>" : "";
        }).join("");
        if (t.type === "bugfix") extra = ["pseudocode", "sql"].map(function (l) {
          var n = F.questionsOf("bugfix", function (q) { return (q.lang || "pseudocode") === l; }).length;
          return n ? '<button type="button" class="btn small ghost" data-fmt-lang="' + l + '">' + (l === "sql" ? "SQL" : "Pseudocode") + " (" + n + ")</button>" : "";
        }).join("");
        return '<div class="topictile fmt-tile"><div class="tt"><span class="fmt-ico" aria-hidden="true">' + t.icon + "</span> " + esc(t.title) + '</div><div class="muted small">' + esc(t.text) + "</div>" +
          UI.bar(st.mastery) + '<div class="small">' + qs.length + " Aufgaben · " + st.attempted + " bearbeitet · " + st.mastered + " sicher" + (st.due ? " · " + st.due + " fällig" : "") + "</div>" +
          '<div class="btnrow"><button type="button" class="btn small primary" data-fmt="' + t.type + '"' + (qs.length ? "" : " disabled") + ">Üben</button>" + extra + "</div></div>";
      }).join("") + "</div></section>";
  }

  var origTrain = V.train;
  V.train = function (c) {
    var ret = origTrain.apply(this, arguments);
    var head = UI.$(".page-head", c);
    var sec = UI.h(tilesHtml());
    if (head && head.nextSibling) c.insertBefore(sec, head.nextSibling); else c.appendChild(sec);
    UI.$$("[data-fmt]", sec).forEach(function (b) { b.addEventListener("click", function () { F.practice(b.getAttribute("data-fmt")); }); });
    var en = UI.$("[data-fmt-endless]", sec);
    if (en) en.addEventListener("click", F.endlessTrace);
    UI.$$("[data-fmt-kind]", sec).forEach(function (b) {
      var k = b.getAttribute("data-fmt-kind");
      b.addEventListener("click", function () { F.practice("diagram", function (q) { return q.diagram && q.diagram.kind === k; }, F.DIAGRAM[k].label); });
    });
    UI.$$("[data-fmt-lang]", sec).forEach(function (b) {
      var l = b.getAttribute("data-fmt-lang");
      b.addEventListener("click", function () { F.practice("bugfix", function (q) { return (q.lang || "pseudocode") === l; }, "Fehler finden – " + (l === "sql" ? "SQL" : "Pseudocode")); });
    });
    return ret;
  };

  /* ========================================================= Lernpfad */

  var FMT_FILTER = [["", "Alle Formate"], ["classic", "Klassisch"], ["trace", "Schreibtischtest"], ["bugfix", "Fehler finden"], ["diagram", "Diagramme"]];
  /** Hook für views_path.js (cellQs): nur Aufgaben des gewählten Formats */
  App.pathFilter = function (q) {
    var f = (S.state.settings || {}).pathFmt || "";
    if (!f) return true;
    if (f === "classic") return !F.isFormat(q);
    return q.type === f;
  };
  var origPath = V.path;
  V.path = function (c) {
    var ret = origPath.apply(this, arguments);
    var bar = UI.$(".pathbar", c);
    if (bar) {
      var cur = S.state.settings.pathFmt || "";
      var seg = UI.h('<div class="seg" role="group" aria-label="Aufgabenformat">' + FMT_FILTER.map(function (x) {
        return '<button type="button" class="segbtn' + (cur === x[0] ? " on" : "") + '" data-pfmt="' + x[0] + '" aria-pressed="' + (cur === x[0]) + '">' + x[1] + "</button>";
      }).join("") + "</div>");
      bar.appendChild(seg);
      UI.$$("[data-pfmt]", seg).forEach(function (b) {
        b.addEventListener("click", function () { S.state.settings.pathFmt = b.getAttribute("data-pfmt"); S.save("settings"); App.route(); });
      });
    }
    return ret;
  };

  /* ======================================================= Fehlerheft */

  var origMistakes = V.mistakes;
  V.mistakes = function (c) {
    var ret = origMistakes.apply(this, arguments);
    var pr = S.state.progress, by = {};
    Object.keys(pr).forEach(function (id) {
      var q = D.questionById[id], l = E.lastPct(pr[id]);
      if (q && F.isFormat(q) && l != null && l < E.PASS) (by[q.type] = by[q.type] || []).push(q);
    });
    var types = F.TYPES.filter(function (t) { return by[t]; });
    if (types.length) {
      var head = UI.$(".page-head", c);
      var box = UI.h('<div class="card fmt-mistakes"><strong>Nach Prüfungsformat:</strong> <span class="btnrow">' + types.map(function (t) {
        return '<button type="button" class="btn small" data-fmtm="' + t + '">' + esc(U.TYPE_LABEL[t]) + " (" + by[t].length + ") üben</button>";
      }).join("") + "</span></div>");
      if (head && head.nextSibling) c.insertBefore(box, head.nextSibling); else c.appendChild(box);
      UI.$$("[data-fmtm]", box).forEach(function (b) {
        b.addEventListener("click", function () { var t = b.getAttribute("data-fmtm"); App.startSession(U.shuffle(by[t]).slice(0, 30), { title: "Fehlerheft – " + U.TYPE_LABEL[t], backHref: "#/mistakes" }); });
      });
    }
    return ret;
  };

  /* ======================================================== Statistik */

  var origStats = V.stats;
  V.stats = function (c) {
    var ret = origStats.apply(this, arguments);
    var pr = S.state.progress, day = U.today();
    var rows = U.TYPES.map(function (t) {
      var qs = D.questions.filter(function (q) { return q.type === t; });
      if (!qs.length) return "";
      var st = E.topicStats(qs, pr, day), att = 0;
      qs.forEach(function (q) { if (pr[q.id]) att += pr[q.id].attempts.length; });
      var gen = 0;
      if (t === "trace") F.traceGenerators().forEach(function (g) { var s = S.state.genStats[g.id]; if (s) gen += s.n; });
      return "<tr" + (F.TYPES.indexOf(t) >= 0 ? ' class="fmt-row"' : "") + "><td>" + esc(U.TYPE_LABEL[t]) + "</td><td class='num'>" + st.attempted + " / " + qs.length + "</td><td class='num'>" + att + (gen ? ' <span class="muted small">+ ' + gen + " generiert</span>" : "") +
        "</td><td class='num'>" + st.mastered + "</td><td class='num'>" + st.due + "</td><td style='min-width:140px'>" + UI.bar(st.mastery) + ' <span class="small">' + U.pct(st.mastery) + "</span></td></tr>";
    }).join("");
    var card = UI.h('<div class="card"><h3>Ergebnisse je Aufgabenformat</h3><div class="tablewrap"><table class="list"><thead><tr><th>Format</th><th>bearbeitet</th><th>Versuche</th><th>sicher</th><th>fällig</th><th>Beherrschung</th></tr></thead><tbody>' + rows + "</tbody></table></div></div>");
    var cards = UI.$$(".card", c);
    var anchor = cards.filter(function (x) { var h = UI.$("h3", x); return h && /je Thema/.test(h.textContent); })[0];
    if (anchor) c.insertBefore(card, anchor); else c.appendChild(card);
    return ret;
  };
})(typeof window !== "undefined" ? window : globalThis);
