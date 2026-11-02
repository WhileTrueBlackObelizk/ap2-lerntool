/* AP2-Lerntool – Prüfungssimulation */
(function (root) {
  "use strict";
  var App = (root.App = root.App || {});
  var U = App.util, E = App.engine, UI = App.ui, S = App.store, D = App.data;
  var V = (App.views = App.views || {});

  var WEIGHTS_HTML =
    '<div class="card info"><h3>Gewichtung & Bestehensregeln AP2 FIAE (AO 2020)</h3><div class="grid two"><div><table class="list compact"><tbody>' +
    "<tr><td>Betriebliche Projektarbeit (Doku + Präsentation + Fachgespräch)</td><td class='num'><strong>50 %</strong></td></tr>" +
    "<tr><td>Teil 1 der Abschlussprüfung (AP1)</td><td class='num'>20 %</td></tr>" +
    "<tr><td>GA1 – Planen eines Softwareproduktes (90 Min)</td><td class='num'>10 %</td></tr>" +
    "<tr><td>GA2 – Entwicklung und Umsetzung von Algorithmen (90 Min)</td><td class='num'>10 %</td></tr>" +
    "<tr><td>Wirtschafts- und Sozialkunde (60 Min)</td><td class='num'>10 %</td></tr>" +
    "</tbody></table></div><div><p><strong>Bestanden</strong>, wenn</p><ul>" +
    "<li>das Gesamtergebnis (AP1 + AP2) mindestens <strong>50 Punkte</strong> („ausreichend“) beträgt,</li>" +
    "<li>der Prüfungsbereich <strong>Projektarbeit</strong> mindestens 50 Punkte erreicht,</li>" +
    "<li>mindestens <strong>2 der 3 schriftlichen Bereiche</strong> (GA1, GA2, WiSo) mit mindestens 50 Punkten bewertet sind und</li>" +
    "<li><strong>kein Bereich</strong> unter 30 Punkten („ungenügend“) liegt.</li></ul>" +
    "<p class='muted small'>Eine <strong>mündliche Ergänzungsprüfung</strong> (ca. 15 Min) ist in einem schriftlichen Bereich möglich, wenn sie für das Bestehen den Ausschlag geben kann; das bisherige Ergebnis und die Ergänzungsprüfung werden im Verhältnis 2 : 1 gewichtet.</p>" +
    "<p class='muted small'>Notenschlüssel: 100–92 = 1 · 91–81 = 2 · 80–67 = 3 · 66–50 = 4 · 49–30 = 5 · 29–0 = 6</p></div></div></div>";

  function saveRun() { S.save("examRun"); }
  var saveRunSoon = U.debounce(saveRun, 400);

  function startRun(exam) {
    var cur = S.state.examRun;
    if (cur && cur.phase !== "done" && !UI.confirm("Es läuft bereits eine Prüfung („" + cur.title + "“). Verwerfen und neue starten?")) return;
    var now = Date.now();
    S.state.examRun = {
      runId: U.uid(), examId: exam.id, kind: exam.kind || (exam.ai ? "ai" : "exam"), title: exam.title, part: exam.part,
      minutes: exam.minutes || 90, scenario: exam.scenario || "", ai: !!exam.ai,
      tasks: U.clone(exam.tasks.map(function (t, i) { var x = Object.assign({}, t); if (!x.id) x.id = exam.id + "-t" + (i + 1); if (exam.ai) x.ai = true; return x; })),
      answers: {}, flags: {}, results: {}, startedAt: now, endsAt: now + (exam.minutes || 90) * 60000, current: 0, phase: "running",
    };
    // Generator-Funktionen sind nicht serialisierbar – Tasks sind bereits fertige Objekte
    saveRun();
    location.hash = "#/exam/run";
  }
  App.startExam = startRun;

  /* ============================================================ Übersicht */

  V.exam = function (c) {
    var st = S.state, run = st.examRun;
    var base = D.exams.filter(function (x) { return !x.ai; }), ai = D.exams.filter(function (x) { return x.ai; });
    var hist = st.exams.slice().reverse();
    function lastOf(id) { var r = hist.filter(function (h) { return h.examId === id; })[0]; return r; }
    var html = '<div class="page-head"><h1>Prüfungssimulation</h1><p class="muted">Unter Echtbedingungen: Zeitlimit, Navigation zwischen Aufgaben, Abgabe mit Gesamtbewertung und IHK-Note.</p></div>';
    if (run && run.phase !== "done") {
      html += '<div class="card hero"><div><h2>Laufende Prüfung</h2><p>' + U.esc(run.title) + " · " + (run.phase === "running" ? "Restzeit " + U.fmtDuration((run.endsAt - Date.now()) / 1000) : "Bewertung offen") + '</p></div><div class="btnrow"><a class="btn primary" href="#/exam/run">Fortsetzen</a><button class="btn ghost" data-act="discard">Verwerfen</button></div></div>';
    }
    html += '<section class="card"><h2>Vorgefertigte Simulationen</h2>' + (base.length ? '<div class="examgrid">' + base.map(examTile).join("") + "</div>" : '<p class="muted">Keine Simulationen geladen (data/exams.js).</p>') + "</section>";
    html += '<section class="card"><h2>Zufallsprüfung</h2><p class="muted">Aus dem Aufgabenpool und den Rechentrainern zusammengestellt, Punktsumme 100. GA1/GA2: 90 Minuten · WiSo: 60 Minuten, 25–30 überwiegend geschlossene Aufgaben.</p><div class="btnrow">' +
      ["GA1", "GA2", "WISO"].map(function (p) {
        var n = (D.byPart[p] || []).length;
        return '<button class="btn" data-random="' + p + '"' + (n < 5 ? " disabled" : "") + ">" + U.PART_SHORT[p] + ' <span class="muted small">(' + n + " im Pool)</span></button>";
      }).join("") + "</div></section>";
    html += '<section class="card"><h2>KI-Simulationen</h2>' + (ai.length ? '<div class="examgrid">' + ai.map(examTile).join("") + "</div>" : '<p class="muted">Noch keine. Im <a href="#/ai">KI-Studio</a> kannst du komplette GA1-/GA2-Prüfungen generieren lassen.</p>') + "</section>";
    html += WEIGHTS_HTML;
    html += '<section class="card"><h2>Ergebnis-Historie</h2>' + (hist.length ? '<table class="list"><thead><tr><th>Datum</th><th>Prüfung</th><th>Bereich</th><th>Punkte</th><th>Note</th><th>Dauer</th></tr></thead><tbody>' + hist.map(function (h) {
      return "<tr><td>" + U.fmtDate(h.date) + "</td><td>" + U.esc(h.title) + "</td><td>" + UI.partBadge(h.part) + "</td><td class='num'>" + h.points + "</td><td>" + UI.gradeChip(h.grade) + "</td><td class='num'>" + (h.minutesUsed != null ? h.minutesUsed + " Min" : "–") + "</td></tr>";
    }).join("") + "</tbody></table>" : '<p class="muted">Noch keine Simulation abgeschlossen.</p>') + "</section>";
    c.innerHTML = html;

    function examTile(x) {
      var sum = U.sum(x.tasks, function (t) { return Number(t.points) || 0; });
      var l = lastOf(x.id);
      return '<div class="examtile"><div>' + UI.partBadge(x.part) + (x.ai ? UI.badge("KI", "ai") : "") + '</div><div class="tt">' + U.esc(x.title) + '</div><div class="muted small">' + (x.minutes || 90) + " Min · " + x.tasks.length + " Aufgaben · " + sum + " Punkte</div>" +
        (l ? '<div class="small">Zuletzt: ' + l.points + " P. " + UI.gradeChip(l.grade) + " (" + U.fmtDate(l.date) + ")</div>" : "") +
        '<div class="btnrow"><button class="btn primary small" data-start="' + U.esc(x.id) + '">Starten</button>' + (x.ai ? '<button class="btn ghost small" data-del="' + U.esc(x.id) + '">Löschen</button>' : "") + "</div></div>";
    }
    UI.$$("[data-start]", c).forEach(function (b) { b.addEventListener("click", function () { var x = D.examById(b.getAttribute("data-start")); if (x) startRun(x); }); });
    UI.$$("[data-random]", c).forEach(function (b) {
      b.addEventListener("click", function () {
        var p = b.getAttribute("data-random");
        var ex = E.buildRandomExam(p, D.questions, D.generators, Math.random);
        if (!ex.tasks.length) { UI.toast("Zu wenige Aufgaben im Pool.", "error"); return; }
        startRun(ex);
      });
    });
    UI.$$("[data-del]", c).forEach(function (b) {
      b.addEventListener("click", function () {
        if (!UI.confirm("KI-Simulation löschen?")) return;
        var id = b.getAttribute("data-del");
        st.aiExams = st.aiExams.filter(function (x) { return x.id !== id; });
        S.save("aiExams"); D.refresh(); App.route();
      });
    });
    var d = UI.$('[data-act="discard"]', c);
    if (d) d.addEventListener("click", function () {
      if (!UI.confirm("Laufende Prüfung verwerfen? Antworten gehen verloren.")) return;
      st.examRun = null; saveRun(); App.route();
    });
  };

  /* ========================================================== Durchführung */

  V.examRun = function (c) {
    var run = S.state.examRun;
    if (!run) { location.replace("#/exam"); return; }
    if (run.phase === "running" && Date.now() >= run.endsAt) { run.phase = "grading"; run.timeout = true; run.submittedAt = run.endsAt; saveRun(); }
    if (run.phase === "running") return runningView(c, run);
    if (run.phase === "grading") return gradingView(c, run);
    return reviewView(c, run);
  };

  function runningView(c, run) {
    var timer = null, card = null;
    var n = run.tasks.length;
    c.innerHTML = '<div class="exam"><div class="examtop"><div class="et-title"><strong>' + U.esc(run.title) + "</strong> " + UI.partBadge(run.part) + '</div><div class="timer" aria-live="off" title="Restzeit"></div><button class="btn primary small" data-act="submit">Abgeben</button></div>' +
      (run.scenario ? '<details class="card scenario" ' + (run.current === 0 ? "open" : "") + "><summary><strong>Ausgangssituation</strong></summary><div>" + U.rich(run.scenario, run.ai) + "</div></details>" : "") +
      '<div class="examlayout"><nav class="tasknav" aria-label="Aufgaben"></nav><div class="examtask"><div class="etcard"></div><div class="btnrow examnav">' +
      '<button class="btn" data-act="prev">← Zurück</button><button class="btn ghost" data-act="flag">☆ Später ansehen</button><button class="btn" data-act="next">Weiter →</button></div></div></div></div>';
    var nav = UI.$(".tasknav", c), tEl = UI.$(".timer", c);
    var tb = App.timebudget ? App.timebudget.examRunning(run, c) : null; // Zeitbudget je Aufgabe (timebudget.js)

    function renderNav() {
      nav.innerHTML = run.tasks.map(function (t, i) {
        var a = App.grader.isAnswered(t, run.answers[t.id]);
        return '<button type="button" class="tchip' + (i === run.current ? " current" : "") + (a ? " answered" : "") + (run.flags[t.id] ? " flagged" : "") + (tb ? tb.navClass(t) : "") + '" data-go="' + i + '" title="Aufgabe ' + (i + 1) + " · " + t.points + " P." + (a ? " · beantwortet" : "") + (run.flags[t.id] ? " · markiert" : "") + '">' + (i + 1) + "</button>";
      }).join("") + '<div class="muted small navinfo">' + run.tasks.filter(function (t) { return App.grader.isAnswered(t, run.answers[t.id]); }).length + " / " + n + " beantwortet</div>";
      UI.$$("[data-go]", nav).forEach(function (b) { b.addEventListener("click", function () { go(Number(b.getAttribute("data-go"))); }); });
    }
    function showTask() {
      var t = run.tasks[run.current];
      run.answers[t.id] = run.answers[t.id] || {};
      card = new App.QCard(t, {
        mode: "exam", number: run.current + 1, total: n, answer: run.answers[t.id],
        onChange: function () { saveRunSoon(); renderNavSoon(); },
      });
      var box = UI.$(".etcard", c);
      box.innerHTML = "";
      box.appendChild(card.el);
      if (tb) tb.show(t);
      UI.$('[data-act="prev"]', c).disabled = run.current === 0;
      UI.$('[data-act="next"]', c).textContent = run.current === n - 1 ? "Zur Übersicht ✓" : "Weiter →";
      UI.$('[data-act="flag"]', c).textContent = run.flags[t.id] ? "★ Markiert" : "☆ Später ansehen";
      UI.$('[data-act="flag"]', c).classList.toggle("active", !!run.flags[t.id]);
      renderNav();
      saveRunSoon();
      card.focus();
    }
    var renderNavSoon = U.debounce(renderNav, 200);
    function go(i) {
      run.current = U.clamp(i, 0, n - 1);
      showTask();
      try { UI.$(".examtask", c).scrollIntoView({ block: "start", behavior: "smooth" }); } catch (e) { /* ignore */ }
    }
    function tick() {
      var left = (run.endsAt - Date.now()) / 1000;
      if (tb) tb.tick();
      tEl.textContent = "⏱ " + U.fmtDuration(left);
      tEl.classList.toggle("warn", left < 600);
      tEl.classList.toggle("crit", left < 120);
      if (left <= 0) {
        clearInterval(timer); timer = null;
        UI.toast("Die Bearbeitungszeit ist abgelaufen – die Prüfung wird abgegeben.", "error");
        submit(true);
      }
    }
    function submit(timeout) {
      if (!timeout) {
        var open = run.tasks.filter(function (t) { return !App.grader.isAnswered(t, run.answers[t.id]); }).length;
        var fl = Object.keys(run.flags).filter(function (k) { return run.flags[k]; }).length;
        if (!UI.confirm("Prüfung jetzt abgeben?" + (open ? "\n" + open + " Aufgabe(n) noch unbeantwortet." : "") + (fl ? "\n" + fl + " Aufgabe(n) markiert." : ""))) return;
      }
      if (timer) clearInterval(timer);
      if (tb) tb.stop();
      run.phase = "grading"; run.timeout = !!timeout; run.submittedAt = Math.min(Date.now(), run.endsAt);
      saveRun();
      App.route();
    }
    UI.$('[data-act="prev"]', c).addEventListener("click", function () { go(run.current - 1); });
    UI.$('[data-act="next"]', c).addEventListener("click", function () {
      if (run.current < n - 1) go(run.current + 1);
      else {
        var firstOpen = run.tasks.findIndex(function (t) { return !App.grader.isAnswered(t, run.answers[t.id]) || run.flags[t.id]; });
        if (firstOpen >= 0 && firstOpen !== run.current) { UI.toast("Offene oder markierte Aufgabe: " + (firstOpen + 1)); go(firstOpen); }
        else UI.toast("Alle Aufgaben bearbeitet – zum Abschluss „Abgeben“ klicken.");
      }
    });
    UI.$('[data-act="flag"]', c).addEventListener("click", function () {
      var t = run.tasks[run.current];
      run.flags[t.id] = !run.flags[t.id];
      showTask();
    });
    UI.$('[data-act="submit"]', c).addEventListener("click", function () { submit(false); });
    App.keys.set({
      digit: function (k) { return card ? card.digit(k) : false; },
      enter: function () { UI.$('[data-act="next"]', c).click(); return true; },
      left: function () { go(run.current - 1); return true; },
      right: function () { go(run.current + 1); return true; },
    });
    showTask();
    tick();
    timer = setInterval(tick, 1000);
    return function cleanup() { if (timer) clearInterval(timer); if (tb) tb.stop(); saveRun(); };
  }

  function gradingView(c, run) {
    var ctrl = new AbortController(), cancelled = false, alive = true;
    var useAI = App.ai.available();
    var n = run.tasks.length;
    c.innerHTML = '<div class="card"><h2>Prüfung wird bewertet …</h2><p class="muted">' + (useAI ? "Freitext- und Code-Aufgaben werden durch die KI bewertet (" + U.esc(App.ai.model()) + ")." : "Kein API-Key: Freitext- und Code-Aufgaben werden per Schlüsselbegriffen vorbewertet, danach schätzt du sie selbst ein.") + "</p>" +
      UI.bar(0, "accent") + '<p class="gstatus"></p><button class="btn ghost" data-act="cancel">' + (useAI ? "KI-Bewertung abbrechen (Rest selbst einschätzen)" : "Abbrechen") + "</button></div>";
    var status = UI.$(".gstatus", c), barEl = UI.$(".bar span", c);
    UI.$('[data-act="cancel"]', c).addEventListener("click", function () { cancelled = true; ctrl.abort(); });
    (async function () {
      for (var i = 0; i < n; i++) {
        if (!alive) return;
        var t = run.tasks[i];
        if (run.results[t.id]) continue;
        status.textContent = "Aufgabe " + (i + 1) + " von " + n + " …";
        barEl.style.width = Math.round((i / n) * 100) + "%";
        var r;
        try {
          r = await App.grader.grade(t, run.answers[t.id] || {}, { allowAI: useAI && !cancelled, signal: ctrl.signal, onStatus: function (s) { status.textContent = "Aufgabe " + (i + 1) + ": " + s; } });
        } catch (e) {
          // Abbruch: diese Aufgabe offline bewerten
          r = await App.grader.grade(t, run.answers[t.id] || {}, { allowAI: false });
        }
        run.results[t.id] = r;
        saveRun();
      }
      if (!alive) return;
      run.phase = "review";
      saveRun();
      App.route();
    })();
    return function () { alive = false; ctrl.abort(); };
  }

  function reviewView(c, run) {
    var n = run.tasks.length;
    var html = '<div class="page-head"><div class="crumbs"><a href="#/exam">Prüfungssimulation</a></div><h1>Ergebnis: ' + U.esc(run.title) + "</h1></div>" +
      '<div class="card result-summary"></div>' +
      (run.scenario ? '<details class="card scenario"><summary><strong>Ausgangssituation</strong></summary><div>' + U.rich(run.scenario, run.ai) + "</div></details>" : "") +
      '<div class="reviewlist"></div>';
    c.innerHTML = html;
    var sumEl = UI.$(".result-summary", c), list = UI.$(".reviewlist", c);
    function pending() { return run.tasks.filter(function (t) { var r = run.results[t.id]; return !r || r.needsSelf; }); }
    function renderSummary() {
      var tot = E.examTotal(run.tasks, run.results);
      var pend = pending();
      var used = run.submittedAt ? Math.round((run.submittedAt - run.startedAt) / 60000) : null;
      var byTopic = U.groupBy(run.tasks, function (t) { return t.topic; });
      var passed = tot.normalized >= 50;
      sumEl.innerHTML = '<div class="kpis"><div class="kpi"><div class="kv big">' + tot.normalized + '<span class="muted"> / 100</span></div><div class="kl">' + (pend.length ? "vorläufige " : "") + "Punkte</div></div>" +
        '<div class="kpi"><div class="kv">' + UI.gradeChip(tot.grade) + '</div><div class="kl">' + E.GRADE_LABEL[tot.grade] + "</div></div>" +
        '<div class="kpi"><div class="kv">' + (passed ? "≥ 50" : "< 50") + '</div><div class="kl">' + (passed ? "Bereich bestanden" : "unter 50 Punkten") + (tot.normalized < 30 ? " – ungenügend, Bestehen ausgeschlossen" : "") + "</div></div>" +
        '<div class="kpi"><div class="kv">' + (used != null ? used + " Min" : "–") + '</div><div class="kl">von ' + run.minutes + " Min" + (run.timeout ? " (Zeit abgelaufen)" : "") + "</div></div></div>" +
        (pend.length ? '<div class="notice">Noch <strong>' + pend.length + " Aufgabe(n)</strong> selbst einschätzen (Buttons unter der Musterlösung). Danach kannst du das Ergebnis speichern.</div>" : "") +
        "<h3>Nach Thema</h3><table class='list compact'><tbody>" + Object.keys(byTopic).map(function (tid) {
          var ts = byTopic[tid], p = U.sum(ts, function (t) { return (run.results[t.id] || {}).points || 0; }), m = U.sum(ts, function (t) { return t.points; });
          return "<tr><td>" + U.esc(D.topicTitle(tid)) + "</td><td class='num'>" + U.fmtNum(p, 1) + " / " + m + "</td><td style='width:40%'>" + UI.bar(m ? p / m : 0) + "</td></tr>";
        }).join("") + "</tbody></table>" + (App.timebudget ? App.timebudget.examSummaryHtml(run) : "") +
        '<div class="btnrow">' + (run.phase === "done" ? '<span class="badge ok">Ergebnis gespeichert</span><a class="btn primary" href="#/exam">Zur Übersicht</a><button class="btn ghost" data-act="close">Prüfung schließen</button>'
          : '<button class="btn primary" data-act="save"' + (pend.length ? " disabled" : "") + ">Ergebnis speichern</button><a class=\"btn ghost\" href=\"#/exam\">Später</a>") + "</div>";
      var sb = UI.$('[data-act="save"]', sumEl);
      if (sb) sb.addEventListener("click", finalize);
      var cb = UI.$('[data-act="close"]', sumEl);
      if (cb) cb.addEventListener("click", function () { S.state.examRun = null; saveRun(); location.hash = "#/exam"; });
    }
    function finalize() {
      if (pending().length || run.phase === "done") return;
      var tot = E.examTotal(run.tasks, run.results);
      run.tasks.forEach(function (t) { var r = run.results[t.id]; if (r) S.recordAttempt(t, r); });
      S.addExamResult({
        id: run.runId, examId: run.examId, kind: run.kind, title: run.title, part: run.part,
        date: U.today(), points: tot.normalized, raw: tot.points, max: tot.max, grade: tot.grade,
        minutesUsed: run.submittedAt ? Math.round((run.submittedAt - run.startedAt) / 60000) : null,
      });
      run.phase = "done";
      saveRun();
      UI.toast("Ergebnis gespeichert: " + tot.normalized + " Punkte, Note " + tot.grade);
      renderSummary();
    }
    run.tasks.forEach(function (t, i) {
      var wrap = UI.h('<div class="reviewitem"></div>');
      var card = new App.QCard(t, {
        mode: "review", number: i + 1, total: n, answer: run.answers[t.id] || {}, result: run.results[t.id],
        onGraded: function (r) { run.results[t.id] = r; saveRun(); renderSummary(); },
      });
      wrap.appendChild(card.el);
      if (App.timebudget) App.timebudget.reviewBadge(run, t, card.el);
      list.appendChild(wrap);
    });
    renderSummary();
    App.keys.set({});
  }
})(typeof window !== "undefined" ? window : globalThis);
