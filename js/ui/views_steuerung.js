/* AP2-Lerntool – Lernsteuerung, Teil 2: Wissensbaum (#/tree), Phasenplan (#/plan),
   Dashboard-Kärtchen „Heute laut Plan“, Kontext für Prüfungsmix / „Heute lernen“ */
(function (root) {
  "use strict";
  var App = (root.App = root.App || {});
  var U = App.util, E = App.engine, UI = App.ui, S = App.store, D = App.data;
  var V = (App.views = App.views || {});
  var ST = (App.steer = App.steer || {});

  /* ============================================================ Baum-Index */

  var ixCache = null;
  ST.treeIndex = function () {
    var nodes = (root.AP2 && root.AP2.tree) || [];
    if (!ixCache || ixCache.qsRef !== D.questions || ixCache.nodesN !== nodes.length) {
      ixCache = E.treeIndex(nodes, D.questions);
      ixCache.qsRef = D.questions; ixCache.nodesN = nodes.length;
    }
    return ixCache;
  };

  /** wackelige Stämme: angefangen, aber < 80 % (zuerst), danach offene – schwächste zuerst */
  ST.shakyStems = function (ix, st, n) {
    return ix.nodes.filter(function (x) { return x.kind === "stamm" && st[x.id].n && st[x.id].m < E.PASS; })
      .sort(function (a, b) { return (st[a.id].status === "shaky" ? 0 : 1) - (st[b.id].status === "shaky" ? 0 : 1) || st[a.id].m - st[b.id].m; })
      .slice(0, n || 2);
  };

  // Kontext für Prüfungsmix und „Heute lernen“: Zielzone + wackelige Stämme + gesperrte Blätter
  E.mixContext = function () {
    var ix = ST.treeIndex(), st = E.treeState(ix, S.state.progress);
    var focus = {}, locked = {};
    var stems = ST.shakyStems(ix, st, 2);
    stems.forEach(function (n) { ix.qs[n.id].forEach(function (q) { focus[q.id] = 1; }); });
    ix.nodes.forEach(function (n) {
      if (st[n.id].status === "locked") ix.qs[n.id].forEach(function (q) { if (!focus[q.id]) locked[q.id] = 1; });
    });
    return { zone: ST.zone ? ST.zone() : null, focusIds: focus, lockedIds: locked, stems: stems };
  };

  /* ============================================================ Aktionen */

  function startMix(count, back) {
    var qs = E.buildSession(D.questions, S.state.progress, { mode: "mix", count: count || 15 }, U.today());
    App.startSession(qs, { title: "Prüfungsmix", backHref: back || "#/dashboard" });
  }
  ST.startMix = startMix;

  function startStems(back) {
    var ix = ST.treeIndex(), st = E.treeState(ix, S.state.progress);
    var stems = ST.shakyStems(ix, st, 2);
    if (!stems.length) { UI.toast("Alle Stämme sitzen – weiter mit dem Prüfungsmix.", "ok"); startMix(15, back); return; }
    var qs = [];
    stems.forEach(function (n) { qs = qs.concat(ix.qs[n.id]); });
    var pick = E.buildSession(qs, S.state.progress, { count: 15, mode: "mixed" }, U.today());
    App.startSession(pick, { title: "Stämme festigen: " + stems.map(function (n) { return n.title; }).join(" · "), backHref: back || "#/dashboard" });
  }

  ST.runTask = function (t, back) {
    var pr = S.state.progress, day = U.today();
    switch (t.act) {
      case "mix": return startMix(t.arg || 15, back);
      case "stems": return startStems(back);
      case "danger": return ST.startDanger ? ST.startDanger(back) : null;
      case "due": {
        var due = E.buildSession(D.questions, pr, { mode: "due", count: 50 }, day);
        if (!due.length) { UI.toast("Nichts fällig – Prüfungsmix statt dessen.", "ok"); return startMix(15, back); }
        var mixed = E.interleave(due);
        return App.startSession(mixed.concat(due.filter(function (q) { return mixed.indexOf(q) < 0; })), { title: "Fällige Wiederholungen", backHref: back });
      }
      case "mistakes": {
        var ms = E.buildSession(D.questions, pr, { mode: "mistakes", count: 30 }, day);
        if (!ms.length) { UI.toast("Fehlerheft ist leer – stark!", "ok"); return; }
        return App.startSession(ms, { title: "Fehlerheft", backHref: back });
      }
      case "sim": {
        var x = t.arg || {};
        var ex = x.id ? D.examById(x.id) : E.buildRandomExam(x.random || x.part, D.questions, D.generators, Math.random);
        if (!ex || !ex.tasks.length) { UI.toast("Simulation nicht gefunden.", "error"); return; }
        if (App.startExam) App.startExam(ex); else location.hash = "#/exam";
        return;
      }
    }
  };

  /* ============================================================ Phasenplan */

  ST.plan = function () {
    var s = S.state.settings, today = U.today();
    var a = s.planAnchor;
    // Plan am ersten Tag verankern → feste Zuordnung der Simulationen; neu bei geändertem Termin
    if (!a || a.examDate !== s.examDate || a.start > today) {
      a = s.planAnchor = { start: today, examDate: s.examDate };
      S.save("settings");
    }
    var exams = D.exams.filter(function (x) { return !x.ai; }).map(function (x) { return { id: x.id, part: x.part, title: x.title }; });
    var plan = E.phasePlan({ start: a.start, examDate: a.examDate, exams: exams });
    plan.today = today;
    plan.todayEntry = plan.days.filter(function (d) { return d.date === today; })[0] || null;
    return plan;
  };

  function simDone(d, plan) {
    if (!d.exam) return null;
    return S.state.exams.filter(function (r) {
      if (d.exam.id) return r.examId === d.exam.id && r.date >= plan.start;
      return r.kind === "random" && r.part === d.exam.part && r.date === d.date;
    })[0] || null;
  }
  function dayLabel(date, today) {
    var n = U.daysBetween(today, date);
    return n === 0 ? "Heute" : n === 1 ? "Morgen" : n === -1 ? "Gestern" : U.weekday(date) + " " + U.fmtDate(date).slice(0, 6);
  }
  var KIND_LABEL = { gaps: "Lücken schließen", gapsReview: "Wochenrückblick", sim: "Simulation", simReview: "Nacharbeiten", review: "Wiederholung" };

  function tasksHtml(d, plan, primaryFirst) {
    return d.tasks.map(function (t, i) {
      var done = t.act === "sim" ? simDone(d, plan) : null;
      return '<button type="button" class="btn' + (i === 0 && primaryFirst ? " primary" : "") + '" data-task="' + i + '" data-date="' + d.date + '">' + U.esc(t.label) +
        (done ? " ✓ " + done.points + " P." : "") + "</button>";
    }).join("");
  }
  function bindTasks(c, plan, back) {
    UI.$$("[data-task]", c).forEach(function (b) {
      b.addEventListener("click", function () {
        var d = plan.days.filter(function (x) { return x.date === b.getAttribute("data-date"); })[0];
        if (d) ST.runTask(d.tasks[Number(b.getAttribute("data-task"))], back);
      });
    });
  }

  function phaseBar(plan) {
    var n = plan.days.length || 1, idx = U.daysBetween(plan.start, plan.today);
    return '<div class="phasebar" aria-hidden="true">' + E.PHASES.map(function (p, i) {
      var len = plan.lengths[i];
      return len ? '<div class="ph ph' + p.n + '" style="flex:' + len + '"><span>' + p.n + " · " + U.esc(p.name) + " (" + len + " T.)</span></div>" : "";
    }).join("") + (idx >= 0 && idx < n ? '<i class="phnow" style="left:' + ((idx + 0.5) / n) * 100 + '%" title="heute"></i>' : "") + "</div>";
  }

  /** Dashboard-Kärtchen „Heute laut Plan“ */
  ST.dashboardHtml = function () {
    var plan = ST.plan(), d = plan.todayEntry;
    var left = U.daysBetween(plan.today, S.state.settings.examDate);
    var html = '<div class="card plantoday"><div class="row between wrap"><div><div class="kl">Heute laut Plan</div>';
    if (!d) {
      html += "<h2>" + (left === 0 ? "Prüfungstag – viel Erfolg!" : left < 0 ? "Prüfungstermin liegt in der Vergangenheit" : "Kein Plan") + "</h2></div>" +
        '<a class="btn small" href="#/settings">Termin ändern</a></div></div>';
      return html;
    }
    var ph = E.PHASES[d.phase - 1];
    html += "<h2>Phase " + ph.n + ": " + U.esc(ph.name) + ' <span class="muted small">· ' + U.esc(KIND_LABEL[d.kind] || "") + "</span></h2>" +
      '<p class="muted small">' + U.esc(d.note || ph.text) + "</p></div>" +
      '<div class="daysleft"><span class="kv big">' + left + '</span><span class="muted small">' + (left === 1 ? "Tag" : "Tage") + " bis zur Prüfung</span></div></div>" +
      phaseBar(plan) + '<div class="btnrow">' + tasksHtml(d, plan, true) + '<a class="btn ghost" href="#/plan">Ganzer Plan</a><a class="btn ghost" href="#/tree">Wissensbaum</a></div></div>';
    return html;
  };
  ST.bindDashboard = function (c) {
    if (UI.$(".plantoday", c)) bindTasks(UI.$(".plantoday", c), ST.plan(), "#/dashboard");
  };

  /** Ersatz für die alte Lernplan-Liste im Dashboard: die nächsten Tage des Phasenplans */
  ST.planCardHtml = function () {
    var plan = ST.plan();
    var next = plan.days.filter(function (d) { return d.date >= plan.today; }).slice(0, 8);
    if (!next.length) return '<div class="card"><h3>Phasenplan bis zur Prüfung</h3><p class="muted">Kein zukünftiger Prüfungstermin gesetzt. <a href="#/settings">Termin ändern</a></p></div>';
    return '<div class="card"><h3>Phasenplan bis zur Prüfung</h3><p class="muted small">Phase 1 Lücken schließen · Phase 2 jeden 2. Tag eine Simulation · Phase 3 nur Wiederholung und Fehlerheft.</p><ol class="plan">' +
      next.map(function (d) {
        var body = d.exam ? U.esc(d.exam.title) + (simDone(d, plan) ? " ✓" : "") : d.tasks.map(function (t) { return U.esc(t.label); }).join(" · ");
        return '<li class="' + (d.kind === "sim" ? "sim" : d.phase === 3 ? "review" : "learn") + '"><span class="pday">' + dayLabel(d.date, plan.today) + '</span><span class="pkind">P' + d.phase + " " + U.esc(KIND_LABEL[d.kind]) + '</span><span class="pbody">' + body + "</span></li>";
      }).join("") + '</ol><a class="btn small ghost" href="#/plan">Gesamten Plan anzeigen (' + plan.days.length + " Tage)</a></div>";
  };

  V.plan = function (c) {
    var plan = ST.plan(), d = plan.todayEntry;
    var html = '<div class="page-head"><h1>Countdown-Plan</h1><p class="muted">Prüfung am ' + U.weekday(plan.examDate) + ", " + U.fmtDate(plan.examDate) + " · Plan seit " + U.fmtDate(plan.start) +
      ". Die Simulationen sind fest auf Tage verteilt (GA2 → GA1 → WiSo, dann Zufallsprüfungen).</p></div>";
    if (!plan.days.length) {
      c.innerHTML = html + '<div class="card"><p class="muted">Kein zukünftiger Prüfungstermin. <a href="#/settings">Termin ändern</a></p></div>';
      return;
    }
    html += '<div class="card">' + phaseBar(plan) + '<div class="grid kpi3 phases">' + E.PHASES.map(function (p, i) {
      return '<div class="phinfo ph' + p.n + '"><strong>Phase ' + p.n + ": " + U.esc(p.name) + '</strong> <span class="muted small">' + plan.lengths[i] + " Tage</span><div class='small muted'>" + U.esc(p.text) + "</div></div>";
    }).join("") + "</div></div>";
    if (d) {
      html += '<div class="card hero today-plan"><div><h2>Heute: ' + U.esc(KIND_LABEL[d.kind]) + ' <span class="muted small">Phase ' + d.phase + "</span></h2>" +
        '<p class="muted">' + U.esc(d.note || E.PHASES[d.phase - 1].text) + '</p></div><div class="btnrow">' + tasksHtml(d, plan, true) + "</div></div>";
    }
    html += '<div class="card"><h2>Alle Tage</h2><ol class="plan full">' + plan.days.map(function (x) {
      var past = x.date < plan.today, done = simDone(x, plan);
      var body = x.exam ? "<strong>" + U.esc(x.exam.title) + "</strong>" + (done ? ' <span class="good-t">✓ ' + done.points + " P., Note " + done.grade + "</span>" : past ? ' <span class="muted small">verpasst</span>' : "") : x.tasks.map(function (t) { return U.esc(t.label); }).join(" · ");
      return '<li class="ph' + x.phase + (x.date === plan.today ? " now" : "") + (past ? " past" : "") + (x.kind === "sim" ? " sim" : "") + '"><span class="pday">' + dayLabel(x.date, plan.today) + '</span><span class="pkind">' + U.esc(KIND_LABEL[x.kind]) + '</span><span class="pbody">' + body +
        (x.note ? ' <span class="muted small">' + U.esc(x.note) + "</span>" : "") + "</span>" +
        (!past && x.date !== plan.today && x.exam ? '<button type="button" class="btn small ghost" data-task="0" data-date="' + x.date + '">vorziehen</button>' : "") + "</li>";
    }).join("") + "</ol>" +
      '<div class="btnrow"><button type="button" class="btn small ghost" data-act="reanchor">Plan ab heute neu aufbauen</button></div></div>';
    c.innerHTML = html;
    bindTasks(c, plan, "#/plan");
    UI.$('[data-act="reanchor"]', c).addEventListener("click", function () {
      if (!UI.confirm("Plan ab heute neu aufbauen? Die Phasen und Simulationstage werden neu verteilt.")) return;
      S.state.settings.planAnchor = null; S.save("settings"); App.route();
    });
    App.keys.set({ enter: function () { var b = UI.$(".today-plan .btn.primary", c); if (b) b.click(); return true; } });
  };

  /* ============================================================ Wissensbaum */

  var KIND = { stamm: "Stamm", ast: "Ast", blatt: "Blatt" };
  var STATUS = { solid: "sitzt", shaky: "wackelig", open: "offen", locked: "erst Stamm festigen" };

  function nodeBtn(n, s, rec) {
    var cls = "tnode k-" + n.kind + " st-" + s.status + " m-" + UI.mClass(s.m) + (rec ? " rec" : "");
    return '<button type="button" class="' + cls + '" data-node="' + U.esc(n.id) + '" title="' + U.esc(n.text || "") + '"' + (s.n ? "" : " disabled") + ">" +
      '<span class="tk">' + KIND[n.kind] + (s.status === "locked" ? " 🔒" : "") + (rec ? " ★" : "") + "</span>" +
      '<span class="tt">' + U.esc(n.title) + "</span>" +
      '<span class="tm">' + U.pct(s.m) + ' <span class="muted">· ' + s.n + " A. · " + STATUS[s.status] + "</span></span>" +
      '<span class="tbar"><i style="width:' + Math.round(s.m * 100) + '%"></i></span></button>';
  }

  V.tree = function (c, params, query) {
    var ix = ST.treeIndex(), st = E.treeState(ix, S.state.progress);
    var parts = U.PARTS.filter(function (p) { return ix.nodes.some(function (n) { return n.part === p; }); });
    var part = (query && query.part) || S.state.settings.treePart || parts[0];
    if (parts.indexOf(part) < 0) part = parts[0];
    var recs = E.treeRecommend(ix, st, 4);
    var recIds = {};
    E.treeRecommend(ix, st, 999).filter(function (n) { return n.part === part; }).slice(0, 3).forEach(function (n) { recIds[n.id] = 1; });

    var html = '<div class="page-head"><h1>Wissensbaum</h1><p class="muted">Erst der <strong>Stamm</strong> (Grundprinzipien), dann die <strong>Äste</strong>, zuletzt die <strong>Blätter</strong> (Details). Ein Blatt wird erst empfohlen, wenn sein Stamm sitzt (≥ 80 %). Klick auf einen Knoten startet eine Session nur mit dessen Aufgaben.</p></div>';
    if (!ix.nodes.length) { c.innerHTML = html + '<div class="notice error">Keine Baumdaten geladen (data/tree.js).</div>'; return; }
    html += '<div class="card"><h3>Als Nächstes empfohlen</h3>' + (recs.length ? '<div class="treerec">' + recs.map(function (n) {
      return '<div class="recitem">' + UI.partBadge(n.part) + " " + nodeBtn(n, st[n.id], true) + "</div>";
    }).join("") + "</div>" : '<p class="muted">Alles sitzt – jetzt nur noch Prüfungsmix und Simulationen.</p>') + "</div>";
    html += '<div class="card treebar"><div class="seg" role="group" aria-label="Prüfungsbereich">' + parts.map(function (p) {
      return '<button type="button" class="segbtn' + (p === part ? " on" : "") + '" data-part="' + p + '" aria-pressed="' + (p === part) + '">' + U.esc(U.PART_SHORT[p]) + "</button>";
    }).join("") + '</div><span class="legend small"><i class="lg m-good"></i>sitzt ≥ 80 % <i class="lg m-mid"></i>50–79 % <i class="lg m-low"></i>&lt; 50 % <i class="lg m-none"></i>offen · 🔒 Stamm erst festigen · ★ empfohlen</span></div>';

    var stems = ix.nodes.filter(function (n) { return n.part === part && n.kind === "stamm"; });
    html += '<div class="tree">' + stems.map(function (sn) {
      return '<section class="tstem"><div class="trow">' + nodeBtn(sn, st[sn.id], recIds[sn.id]) + "</div>" +
        '<div class="tbranches">' + ix.children[sn.id].map(function (aid) {
          var an = ix.byId[aid];
          var leaves = ix.children[aid].map(function (bid) { return nodeBtn(ix.byId[bid], st[bid], recIds[bid]); }).join("");
          return '<div class="tbranch">' + nodeBtn(an, st[aid], recIds[aid]) + (leaves ? '<div class="tleaves">' + leaves + "</div>" : "") + "</div>";
        }).join("") + "</div></section>";
    }).join("") + "</div>";
    c.innerHTML = html;

    UI.$$("[data-part]", c).forEach(function (b) {
      b.addEventListener("click", function () {
        S.state.settings.treePart = b.getAttribute("data-part"); S.save("settings");
        location.hash = "#/tree?part=" + b.getAttribute("data-part");
      });
    });
    UI.$$("[data-node]", c).forEach(function (b) {
      b.addEventListener("click", function () {
        var n = ix.byId[b.getAttribute("data-node")];
        var qs = E.buildSession(ix.qs[n.id], S.state.progress, { count: 12, mode: "mixed" }, U.today());
        App.startSession(qs, { title: KIND[n.kind] + ": " + n.title, backHref: "#/tree?part=" + n.part });
      });
    });
  };

  /** kurzer Baum-Überblick (für „Heute lernen“) */
  ST.stemsHint = function () {
    var ix = ST.treeIndex(), st = E.treeState(ix, S.state.progress);
    var stems = ST.shakyStems(ix, st, 2);
    return stems.length ? "Zuerst wackelige Stämme: <strong>" + stems.map(function (n) { return U.esc(n.title) + " (" + U.pct(st[n.id].m) + ")"; }).join(", ") + "</strong>." : "Alle Stämme sitzen.";
  };
})(typeof window !== "undefined" ? window : globalThis);
