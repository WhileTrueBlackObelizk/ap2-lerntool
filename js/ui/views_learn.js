/* AP2-Lerntool – Ansichten: Dashboard, Themen, Lernkarten, Suche, Fehlerheft, Training, Rechentrainer */
(function (root) {
  "use strict";
  var App = (root.App = root.App || {});
  var U = App.util, E = App.engine, UI = App.ui, S = App.store, D = App.data;
  var V = (App.views = App.views || {});

  /** Session starten (über Route #/session) */
  App.startSession = function (questions, opts) {
    App.pending = { qs: questions, opts: opts || {} };
    if (location.hash === "#/session") App.route();
    else location.hash = "#/session";
  };

  function noData() {
    return '<div class="notice error"><strong>Keine Inhaltsdaten geladen.</strong> Die Dateien in <code>data/</code> (z. B. ga1_pm.js, wiso.js) fehlen oder enthalten Fehler. ' +
      "Prüfen Sie sie mit <code>node tools/validate.js</code>.</div>";
  }
  V.noData = noData;

  /* ========================================================== Dashboard */

  function partPrediction(part) {
    var st = S.state, att = [];
    Object.keys(st.progress).forEach(function (id) {
      var e = st.progress[id], q = D.questionById[id];
      var p = (q && q.part) || e.part;
      if (p !== part) return;
      var w = (q && q.points) || 1;
      (e.attempts || []).forEach(function (a) { att.push({ d: a.d, p: a.p, w: w }); });
    });
    att.sort(function (a, b) { return a.d < b.d ? -1 : a.d > b.d ? 1 : 0; });
    var ex = st.exams.filter(function (x) { return x.part === part; })
      .sort(function (a, b) { return a.date < b.date ? -1 : 1; })
      .map(function (x) { return x.points; });
    return E.predict(att, ex);
  }
  App.partPrediction = partPrediction;

  V.dashboard = function (c) {
    var st = S.state, day = U.today(), pr = st.progress;
    var pool = D.questions;
    var examDate = st.settings.examDate;
    var left = U.daysBetween(day, examDate);
    var mastery = D.masteryByTopic();
    var due = pool.filter(function (q) { return E.isDue(pr[q.id], day); });
    var todayN = (st.log[day] || {}).n || 0;
    var goal = Math.max(1, Number(st.settings.dailyGoal) || 20);
    var streak = E.streak(st.log, day);
    var overall = E.mastery(pool, pr);
    var attempted = pool.filter(function (q) { return pr[q.id]; }).length;
    var weak = E.weakTopics(D.topics, D.byTopic, pr, 6);
    var plan = E.studyPlan(D.topics, mastery, day, examDate, 3);
    var todayPlan = App.steer && App.steer.dashboardHtml ? null : plan[0]; // Phasenplan ersetzt den alten Tagesvorschlag

    var html = '<div class="page-head"><h1>Dashboard</h1><p class="muted">AP2 Fachinformatiker/in Anwendungsentwicklung · Prüfung am ' + U.weekday(examDate) + ", " + U.fmtDate(examDate) + "</p></div>";
    if (!pool.length) html += noData();
    if (App.profile) html += App.profile.dashboardHtml();
    html += '<div class="grid kpi4">' +
      '<div class="card kpi-card"><div class="kl">Countdown</div><div class="kv big">' + (left > 0 ? left : left === 0 ? "Heute!" : "–") + "</div><div class='muted small'>" + (left > 0 ? (left === 1 ? "Tag" : "Tage") + " bis zur Prüfung" : left === 0 ? "Viel Erfolg!" : "Termin liegt in der Vergangenheit") + "</div></div>" +
      '<div class="card kpi-card"><div class="kl">Tagesziel</div><div class="kv">' + todayN + " <span class='muted'>/ " + goal + "</span></div>" + UI.bar(todayN / goal, todayN >= goal ? "good" : "accent") + "<div class='muted small'>" + (todayN >= goal ? "Ziel erreicht" : goal - todayN + " Aufgaben offen") + "</div></div>" +
      '<div class="card kpi-card"><div class="kl">Lernstreak</div><div class="kv">' + streak + " <span class='muted'>" + (streak === 1 ? "Tag" : "Tage") + "</span></div><div class='muted small'>" + (todayN ? "heute schon gelernt" : streak ? "heute noch lernen, um die Serie zu halten" : "starte heute deine Serie") + "</div></div>" +
      '<div class="card kpi-card"><div class="kl">Fällige Wiederholungen</div><div class="kv">' + due.length + "</div>" + (due.length ? '<button class="btn small" data-act="due">Jetzt wiederholen</button>' : "<div class='muted small'>nichts fällig</div>") + "</div>" +
      "</div>";
    if (App.steer && App.steer.dashboardHtml) html += App.steer.dashboardHtml();

    html += '<div class="card hero"><div><h2>Heute lernen</h2><p class="muted">' + (App.steer && App.steer.stemsHint ? "Prüfungsmix: SQL, Pseudocode, Rechnen, WiSo und GA1 im Wechsel, gefährliche Lücken und fällige Karten zuerst, Level in deiner Zielzone. " + App.steer.stemsHint() : "Gemischte Session aus fälligen Wiederholungen, Aufgaben zu deinen schwächsten Themen und neuen Aufgaben.") +
      (todayPlan && todayPlan.kind === "learn" ? " Lernplan heute: <strong>" + todayPlan.topics.map(function (id) { return U.esc(D.topicTitle(id)); }).join(", ") + "</strong>." : todayPlan ? " Lernplan heute: <strong>" + U.esc(todayPlan.note) + "</strong>." : "") +
      "</p></div><div class='btnrow'><button class='btn primary big' data-act=\"today\"" + (pool.length ? "" : " disabled") + ">Heute lernen</button>" +
      (todayPlan && todayPlan.kind === "learn" ? "<button class='btn' data-act='plan'>Plan-Themen üben</button>" : todayPlan ? "<a class='btn' href='#/exam'>Zur Simulation</a>" : "") + "</div></div>";

    // Bereiche
    html += '<h2 class="sec">Prüfungsbereiche</h2><div class="grid parts">';
    U.PARTS.forEach(function (p) {
      var qs = D.byPart[p] || [];
      var ts = E.topicStats(qs, pr, day);
      var pred = p === "FG" ? null : partPrediction(p);
      html += '<div class="card partcard"><div class="row between"><div>' + UI.partBadge(p) + "</div>" +
        (p === "FG" ? "" : '<div class="pred" title="Prognose-Note' + (pred ? " (" + U.esc(pred.basis) + ")" : "") + '">Prognose ' + UI.gradeChip(pred && pred.grade) + (pred ? ' <span class="muted small">' + pred.points + " P.</span>" : "") + "</div>") + "</div>" + '<div class="muted small plabel">' + U.esc(U.PART_LABEL[p]) + "</div>" +
        '<div class="row between"><span class="kv">' + U.pct(ts.mastery) + '</span><span class="muted small">' + ts.attempted + "/" + ts.total + " bearbeitet · " + ts.mastered + " sicher</span></div>" +
        UI.bar(ts.mastery) + "</div>";
    });
    html += "</div>";
    html += '<div class="card"><div class="row between"><strong>Gesamt-Fortschritt</strong><span>' + U.pct(overall) + ' Beherrschung · ' + attempted + " von " + pool.length + " Aufgaben bearbeitet</span></div>" + UI.bar(overall, "accent") + "</div>";

    // Schwächste Themen + Lernplan
    html += '<div class="grid two">';
    html += '<div class="card"><h3>Schwächste Themen</h3>' + (weak.length ? '<ul class="toplist">' + weak.map(function (w) {
      return '<li><a href="#/topic/' + encodeURIComponent(w.topic.id) + '">' + U.esc(w.topic.title) + "</a>" + UI.partBadge(w.topic.part) +
        '<span class="grow">' + UI.bar(w.m) + '</span><span class="small">' + U.pct(w.m) + '</span><button class="btn small" data-topic="' + U.esc(w.topic.id) + '">Üben</button></li>';
    }).join("") + "</ul>" : '<p class="muted">Noch keine Daten.</p>') + "</div>";

    if (App.steer && App.steer.planCardHtml) html += App.steer.planCardHtml();
    else html += '<div class="card"><h3>Lernplan bis zur Prüfung</h3>' + (plan.length ? '<p class="muted small">Automatisch aus deinem Beherrschungsgrad berechnet: Schwerpunkt auf Schwächen, jeden 7. Tag Wiederholung, die letzten 3 Tage Simulationen.</p><ol class="plan">' +
      plan.map(function (d, i) {
        var label = i === 0 ? "Heute" : i === 1 ? "Morgen" : U.weekday(d.date) + " " + U.fmtDate(d.date).slice(0, 6);
        var body = d.kind === "learn" ? d.topics.map(function (id) { return '<a href="#/topic/' + encodeURIComponent(id) + '">' + U.esc(D.topicTitle(id)) + "</a>"; }).join(" · ") : U.esc(d.note);
        return '<li class="' + d.kind + (i >= 10 ? " more hidden" : "") + '"><span class="pday">' + label + '</span><span class="pkind">' + (d.kind === "sim" ? "Simulation" : d.kind === "review" ? "Wiederholung" : "Lernen") + '</span><span class="pbody">' + body + "</span></li>";
      }).join("") + "</ol>" + (plan.length > 10 ? '<button class="btn small ghost" data-act="planall">Gesamten Plan anzeigen (' + plan.length + " Tage)</button>" : "") : '<p class="muted">Kein zukünftiger Prüfungstermin gesetzt. <a href="#/settings">Termin ändern</a></p>') + "</div>";
    html += "</div>";

    if (App.pathSummaryHtml) html += App.pathSummaryHtml();

    // Beherrschung je Topic
    html += '<h2 class="sec">Beherrschung je Thema</h2><div class="grid parts2">';
    U.PARTS.forEach(function (p) {
      var ts = D.topics.filter(function (t) { return t.part === p; });
      if (!ts.length) return;
      html += '<div class="card"><h3>' + UI.partBadge(p) + " " + U.esc(U.PART_LABEL[p]) + '</h3><ul class="mlist">' + ts.map(function (t) {
        var m = mastery[t.id] || 0, n = (D.byTopic[t.id] || []).length;
        return '<li><a href="#/topic/' + encodeURIComponent(t.id) + '">' + U.esc(t.title) + '</a><span class="grow">' + UI.bar(m) + '</span><span class="small num">' + U.pct(m) + '</span><span class="muted small num">' + n + " A.</span></li>";
      }).join("") + "</ul></div>";
    });
    html += "</div>";
    c.innerHTML = html;
    if (App.steer && App.steer.bindDashboard) App.steer.bindDashboard(c);

    var b;
    if ((b = UI.$('[data-act="today"]', c))) b.addEventListener("click", function () {
      var cnt = Math.max(5, goal - todayN);
      App.startSession(E.buildToday(pool, pr, D.topics, day, Math.min(cnt, 40)), { title: "Heute lernen", backHref: "#/dashboard" });
    });
    if ((b = UI.$('[data-act="due"]', c))) b.addEventListener("click", function () {
      App.startSession(E.buildSession(pool, pr, { mode: "due", count: 50 }, day), { title: "Fällige Wiederholungen", backHref: "#/dashboard" });
    });
    if ((b = UI.$('[data-act="plan"]', c))) b.addEventListener("click", function () {
      App.startSession(E.buildSession(pool, pr, { topics: todayPlan.topics, count: 15, mode: "mixed" }, day), { title: "Lernplan heute", backHref: "#/dashboard" });
    });
    if ((b = UI.$('[data-act="planall"]', c))) b.addEventListener("click", function () {
      UI.$$(".plan li.more", c).forEach(function (li) { li.classList.remove("hidden"); });
      this.remove();
    });
    UI.$$("[data-topic]", c).forEach(function (btn) {
      btn.addEventListener("click", function () { practiceTopic(btn.getAttribute("data-topic")); });
    });
    App.keys.set({ enter: function () { var t = UI.$('[data-act="today"]', c); if (t && !t.disabled) t.click(); return true; } });
  };

  function practiceTopic(id, mode) {
    var qs = E.buildSession(D.byTopic[id] || [], S.state.progress, { count: 10, mode: mode || "mixed" }, U.today());
    App.startSession(qs, { title: D.topicTitle(id), backHref: "#/topic/" + encodeURIComponent(id) });
  }
  App.practiceTopic = practiceTopic;

  /* ============================================================= Themen */

  V.topics = function (c) {
    var pr = S.state.progress, day = U.today();
    var html = '<div class="page-head"><h1>Themen & Lernzettel</h1><p class="muted">Kompakte Lernzettel je Thema mit Übungsmodus und Lernkarten.</p></div>';
    if (!D.topics.length) html += noData();
    U.PARTS.forEach(function (p) {
      var ts = D.topics.filter(function (t) { return t.part === p; });
      if (!ts.length) return;
      html += '<section class="card"><h2>' + UI.partBadge(p) + " " + U.esc(U.PART_LABEL[p]) + '</h2><div class="topicgrid">' + ts.map(function (t) {
        var st = E.topicStats(D.byTopic[t.id] || [], pr, day);
        return '<a class="topictile" href="#/topic/' + encodeURIComponent(t.id) + '"><div class="tt">' + U.esc(t.title) + '</div><div class="muted small">' + st.total + " Aufgaben · " + st.attempted + " bearbeitet" + (st.due ? " · <strong>" + st.due + " fällig</strong>" : "") + "</div>" + UI.bar(st.mastery) + '<div class="small">' + U.pct(st.mastery) + " Beherrschung</div></a>";
      }).join("") + "</div></section>";
    });
    c.innerHTML = html;
  };

  V.topic = function (c, params) {
    var id = params[0], t = D.topicById[id];
    if (!t) { c.innerHTML = '<div class="card"><h2>Thema nicht gefunden</h2><a class="btn" href="#/topics">Zur Übersicht</a></div>'; return; }
    var pr = S.state.progress, day = U.today();
    var qs = D.byTopic[id] || [];
    var st = E.topicStats(qs, pr, day);
    var gens = D.generators.filter(function (g) { return g.topic === id; });
    var html = '<div class="page-head"><div class="crumbs"><a href="#/topics">Themen</a> › ' + U.esc(U.PART_SHORT[t.part]) + "</div><h1>" + U.esc(t.title) + " " + UI.partBadge(t.part) + "</h1></div>" +
      '<div class="card"><div class="kpis"><div class="kpi"><div class="kv">' + U.pct(st.mastery) + '</div><div class="kl">Beherrschung</div></div>' +
      '<div class="kpi"><div class="kv">' + st.attempted + " / " + st.total + '</div><div class="kl">bearbeitet</div></div>' +
      '<div class="kpi"><div class="kv">' + st.mastered + '</div><div class="kl">sicher (≥ 80 %)</div></div>' +
      '<div class="kpi"><div class="kv">' + st.due + '</div><div class="kl">fällig</div></div></div>' + UI.bar(st.mastery) +
      '<div class="btnrow"><button class="btn primary" data-act="practice"' + (qs.length ? "" : " disabled") + '>Üben (dieses Thema)</button>' +
      '<a class="btn" href="#/cards/' + encodeURIComponent(id) + '">Lernkarten-Modus</a>' +
      (st.due ? '<button class="btn" data-act="due">Fällige (' + st.due + ")</button>" : "") +
      (gens.length ? gens.map(function (g) { return '<a class="btn ghost" href="#/generators/' + encodeURIComponent(g.id) + '">Rechentrainer: ' + U.esc(g.title) + "</a>"; }).join("") : "") +
      "</div></div>" +
      '<article class="card lernzettel"><h2>Lernzettel</h2><div class="summary-html">' + (t.summary || "<p class='muted'>Kein Lernzettel vorhanden.</p>") + "</div></article>" +
      '<details class="card"><summary><strong>Aufgaben in diesem Thema (' + qs.length + ")</strong></summary><ul class='qlist'>" +
      qs.map(function (q) {
        var e = pr[q.id], m = E.questionMastery(e);
        return '<li><a href="#/q/' + encodeURIComponent(q.id) + '">' + U.esc(U.truncate(U.stripHtml(q.question), 150)) + "</a> " + UI.badge(U.TYPE_LABEL[q.type], "type") + UI.diff(q.difficulty) + (q.ai ? UI.badge("KI", "ai") : "") +
          ' <span class="small ' + UI.mClass(m) + '-t">' + (e ? U.pct(m) + " · Box " + e.box : "neu") + "</span></li>";
      }).join("") + "</ul></details>";
    c.innerHTML = html;
    var b;
    if ((b = UI.$('[data-act="practice"]', c))) b.addEventListener("click", function () { practiceTopic(id); });
    if ((b = UI.$('[data-act="due"]', c))) b.addEventListener("click", function () { practiceTopic(id, "due"); });
  };

  /* ========================================================= Lernkarten */

  V.cards = function (c, params) {
    var id = params[0], t = D.topicById[id];
    var pr = S.state.progress, day = U.today();
    var qs = (D.byTopic[id] || []).slice();
    if (!t || !qs.length) { c.innerHTML = '<div class="card"><h2>Keine Lernkarten</h2><a class="btn" href="#/topics">Zur Übersicht</a></div>'; return; }
    qs = U.shuffle(qs).sort(function (a, b) {
      var ea = pr[a.id], eb = pr[b.id];
      var sa = E.isDue(ea, day) ? 0 : !ea ? 1 : 2, sb = E.isDue(eb, day) ? 0 : !eb ? 1 : 2;
      return sa - sb || E.questionMastery(ea) - E.questionMastery(eb);
    });
    var idx = 0, revealed = false, stats = { n: 0, sum: 0 };
    function show() {
      revealed = false;
      if (idx >= qs.length) {
        c.innerHTML = '<div class="card summary"><h2>Lernkarten – ' + U.esc(t.title) + "</h2><p>" + stats.n + " Karten bearbeitet, Durchschnitt " + U.pct(stats.n ? stats.sum / stats.n : 0) + ".</p>" +
          '<div class="btnrow"><a class="btn primary" href="#/topic/' + encodeURIComponent(id) + '">Zum Thema</a><button class="btn" data-act="again">Noch einmal</button></div></div>';
        UI.$('[data-act="again"]', c).addEventListener("click", function () { idx = 0; show(); });
        App.keys.set({});
        return;
      }
      var q = qs[idx];
      c.innerHTML = '<div class="session"><div class="sess-head"><div><h2>Lernkarten: ' + U.esc(t.title) + '</h2><div class="muted small">Karte ' + (idx + 1) + " von " + qs.length + '</div></div><a class="btn ghost small" href="#/topic/' + encodeURIComponent(id) + '">Beenden</a></div>' +
        UI.bar(idx / qs.length, "accent") + '<div class="flash"></div><div class="btnrow flash-actions"><button class="btn primary" data-act="reveal">Lösung aufdecken <kbd>Leertaste</kbd></button></div></div>';
      var card = new App.QCard(q, { mode: "flash" });
      // Lernkarte: Eingabefelder ausblenden, nur Optionen/Elemente anzeigen
      card.el.classList.add("flashcard");
      UI.$(".flash", c).appendChild(card.el);
      UI.$('[data-act="reveal"]', c).addEventListener("click", reveal);
      function reveal() {
        if (revealed) return;
        revealed = true;
        var res = { points: 0, max: q.points, pct: 0, final: true, kind: "flash" };
        if (q.type === "mc" || q.type === "multi") {
          card.answer = { choice: null, choices: [] };
          card.result = res; card.renderInput();
        }
        var box = UI.$(".qresult", card.el);
        var extra = "";
        if (q.type === "numeric") extra = "<p>Ergebnis: <strong>" + U.fmtNum(q.answer, 6) + (q.unit ? " " + U.esc(q.unit) : "") + "</strong></p>";
        if (q.type === "order") extra = "<div class='sub'>Richtige Reihenfolge:</div><ol class='correct-order'>" + q.items.map(function (it) { return "<li>" + U.rich(it, q.ai) + "</li>"; }).join("") + "</ol>";
        if (q.type === "sql") extra = "<pre><code>" + U.esc(q.sql.solution) + "</code></pre>";
        box.innerHTML = '<div class="result flashres">' + extra + "<div class='sub'>Musterlösung</div><div class='sol'>" + U.rich(q.solution, q.ai) + "</div>" +
          (q.explanation ? "<details><summary>Erklärung</summary><div class='sol'>" + U.rich(q.explanation, q.ai) + "</div></details>" : "") + "</div>";
        var act = UI.$(".flash-actions", c);
        act.innerHTML = '<span class="muted small">Wie gut wusstest du es?</span><button class="btn bad" data-r="0"><kbd>1</kbd> Nicht gewusst</button><button class="btn mid" data-r="0.5"><kbd>2</kbd> Teilweise</button><button class="btn good" data-r="1"><kbd>3</kbd> Gewusst</button>';
        UI.$$("[data-r]", act).forEach(function (b) { b.addEventListener("click", function () { rate(Number(b.getAttribute("data-r"))); }); });
      }
      function rate(f) {
        if (!revealed) return;
        var pts = U.roundHalf(q.points * f);
        S.recordAttempt(q, { points: pts, max: q.points });
        stats.n++; stats.sum += f;
        idx++; show();
      }
      App.keys.set({
        space: function () { reveal(); return true; },
        enter: function () { if (!revealed) reveal(); return true; },
        digit: function (n) { if (revealed && n >= 1 && n <= 3) { rate([0, 0.5, 1][n - 1]); return true; } return false; },
      });
      try { root.scrollTo({ top: 0 }); } catch (e) { /* ignore */ }
    }
    show();
  };

  /* ============================================================== Suche */

  function searchIndex() {
    if (D._search) return D._search;
    var idx = [];
    D.topics.forEach(function (t) {
      var raw = t.title + "\n" + U.stripHtml(t.summary);
      idx.push({ kind: "topic", item: t, raw: raw, norm: E.normalizeText(raw) });
    });
    D.questions.forEach(function (q) {
      var raw = U.stripHtml(q.question) + "\n" + U.stripHtml(q.context || "") + "\n" + (q.options || []).map(U.stripHtml).join(" ") + "\n" + (q.items || []).map(U.stripHtml).join(" ") + "\n" +
        U.stripHtml(q.solution) + "\n" + U.stripHtml(q.explanation || "") + "\n" + (q.tags || []).join(" ") + " " + (q.keywords || []).join(" ").replace(/\|/g, " ");
      idx.push({ kind: "q", item: q, raw: raw, norm: E.normalizeText(raw) });
    });
    D._search = idx;
    return idx;
  }

  function snippet(raw, terms) {
    var low = raw.toLowerCase(), pos = -1;
    terms.forEach(function (t) { var p = low.indexOf(t); if (p >= 0 && (pos < 0 || p < pos)) pos = p; });
    var start = Math.max(0, pos - 60);
    var s = (start ? "…" : "") + raw.slice(start, start + 220).replace(/\s+/g, " ") + (raw.length > start + 220 ? "…" : "");
    var html = U.esc(s);
    terms.forEach(function (t) {
      if (t.length < 2) return;
      var re = new RegExp("(" + U.esc(t).replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "gi");
      html = html.replace(re, "<mark>$1</mark>");
    });
    return html;
  }

  V.search = function (c, params, query) {
    var q = (query && query.q) || "";
    c.innerHTML = '<div class="page-head"><h1>Suche</h1></div><div class="card"><form class="searchform"><input class="input" type="search" name="q" placeholder="Begriff suchen, z. B. Normalisierung, Kündigungsfrist, Rekursion …" aria-label="Suchbegriff" value="' + U.esc(q) + '"><button class="btn primary">Suchen</button></form></div><div class="results"></div>';
    var form = UI.$("form", c), inp = UI.$("input", form), out = UI.$(".results", c);
    function run(text) {
      var norm = E.normalizeText(text);
      var terms = norm.split(" ").filter(function (x) { return x.length >= 2; });
      if (!terms.length) { out.innerHTML = '<p class="muted">Mindestens 2 Zeichen eingeben.</p>'; return; }
      var rawTerms = String(text).toLowerCase().split(/\s+/).filter(function (x) { return x.length >= 2; });
      var hits = searchIndex().filter(function (x) { return terms.every(function (t) { return x.norm.indexOf(t) >= 0; }); });
      var topics = hits.filter(function (x) { return x.kind === "topic"; });
      var qs = hits.filter(function (x) { return x.kind === "q"; });
      var html = "<div class='card'><h2>Lernzettel (" + topics.length + ")</h2>" + (topics.length ? "<ul class='hits'>" + topics.map(function (x) {
        return '<li><a href="#/topic/' + encodeURIComponent(x.item.id) + '"><strong>' + U.esc(x.item.title) + "</strong></a> " + UI.partBadge(x.item.part) + '<div class="snip">' + snippet(x.raw, rawTerms) + "</div></li>";
      }).join("") + "</ul>" : "<p class='muted'>Keine Treffer.</p>") + "</div>";
      html += "<div class='card'><h2>Aufgaben (" + qs.length + ")</h2>" + (qs.length ? "<ul class='hits'>" + qs.slice(0, 80).map(function (x) {
        return '<li><a href="#/q/' + encodeURIComponent(x.item.id) + '">' + U.esc(U.truncate(U.stripHtml(x.item.question), 130)) + "</a> " + UI.partBadge(x.item.part) + UI.badge(U.TYPE_LABEL[x.item.type], "type") +
          '<div class="muted small">' + U.esc(D.topicTitle(x.item.topic)) + '</div><div class="snip">' + snippet(x.raw, rawTerms) + "</div></li>";
      }).join("") + "</ul>" + (qs.length > 80 ? "<p class='muted'>… weitere " + (qs.length - 80) + " Treffer – Suche verfeinern.</p>" : "") : "<p class='muted'>Keine Treffer.</p>") + "</div>";
      out.innerHTML = html;
    }
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      history.replaceState(null, "", "#/search?q=" + encodeURIComponent(inp.value));
      run(inp.value);
    });
    inp.addEventListener("input", U.debounce(function () { if (inp.value.trim().length >= 2) run(inp.value); }, 250));
    if (q) run(q);
    setTimeout(function () { try { inp.focus(); } catch (e) { /* ignore */ } }, 20);
  };

  /* ========================================================= Fehlerheft */

  V.mistakes = function (c, params, query) {
    var pr = S.state.progress;
    var part = (query && query.part) || "", topic = (query && query.topic) || "";
    var all = Object.keys(pr).map(function (id) { return { q: D.questionById[id], e: pr[id] }; })
      .filter(function (x) { var l = E.lastPct(x.e); return x.q && l != null && l < E.PASS; });
    var list = all.filter(function (x) { return (!part || x.q.part === part) && (!topic || x.q.topic === topic); })
      .sort(function (a, b) { return a.e.last < b.e.last ? 1 : a.e.last > b.e.last ? -1 : 0; });
    var topicsInAll = U.groupBy(all, function (x) { return x.q.topic; });
    var html = '<div class="page-head"><h1>Fehlerheft</h1><p class="muted">Alle Aufgaben, deren letzter Versuch unter 80 % lag. Wer sie erneut löst, fliegt hier raus.</p></div>' +
      '<div class="card"><form class="filters"><label>Bereich <select class="input" name="part"><option value="">alle</option>' + U.PARTS.map(function (p) { return '<option value="' + p + '"' + (p === part ? " selected" : "") + ">" + U.PART_SHORT[p] + "</option>"; }).join("") + "</select></label>" +
      '<label>Thema <select class="input" name="topic"><option value="">alle</option>' + Object.keys(topicsInAll).map(function (t) { return '<option value="' + U.esc(t) + '"' + (t === topic ? " selected" : "") + ">" + U.esc(D.topicTitle(t)) + " (" + topicsInAll[t].length + ")</option>"; }).join("") + "</select></label>" +
      '<button class="btn primary" type="button" data-act="all"' + (list.length ? "" : " disabled") + ">Alle üben (" + list.length + ")</button></form></div>";
    html += '<div class="card">' + (list.length ? '<table class="list"><thead><tr><th>Aufgabe</th><th>Thema</th><th>Letzter Versuch</th><th>Versuche</th><th></th></tr></thead><tbody>' + list.map(function (x) {
      return "<tr><td>" + U.esc(U.truncate(U.stripHtml(x.q.question), 120)) + " " + UI.badge(U.TYPE_LABEL[x.q.type], "type") + "</td><td>" + UI.partBadge(x.q.part) + " " + U.esc(D.topicTitle(x.q.topic)) + "</td><td>" + U.pct(E.lastPct(x.e)) + ' <span class="muted small">' + U.fmtDate(x.e.last) + "</span></td><td>" + x.e.attempts.length +
        '</td><td><a class="btn small" href="#/q/' + encodeURIComponent(x.q.id) + '">Üben</a></td></tr>';
    }).join("") + "</tbody></table>" : '<p class="muted">Das Fehlerheft ist leer' + (all.length ? " für diesen Filter" : "") + ".</p>") + "</div>";
    c.innerHTML = html;
    var form = UI.$("form", c);
    UI.$$("select", form).forEach(function (s) {
      s.addEventListener("change", function () {
        var p = form.part.value, t = form.topic.value;
        location.hash = "#/mistakes" + (p || t ? "?" + (p ? "part=" + encodeURIComponent(p) : "") + (p && t ? "&" : "") + (t ? "topic=" + encodeURIComponent(t) : "") : "");
      });
    });
    UI.$('[data-act="all"]', c).addEventListener("click", function () {
      App.startSession(U.shuffle(list.map(function (x) { return x.q; })).slice(0, 50), { title: "Fehlerheft", backHref: "#/mistakes" });
    });
  };

  /* ======================================================== Einzelfrage */

  V.question = function (c, params) {
    var q = D.questionById[params[0]];
    if (!q) { c.innerHTML = '<div class="card"><h2>Aufgabe nicht gefunden</h2><a class="btn" href="#/dashboard">Zum Dashboard</a></div>'; return; }
    new App.Session(c, [q], { title: "Einzelaufgabe – " + D.topicTitle(q.topic), backHref: "#/topic/" + encodeURIComponent(q.topic) });
  };

  /* ============================================================ Training */

  V.train = function (c) {
    var st = S.state;
    var cfg = Object.assign({ parts: ["GA1", "GA2", "WISO"], topics: [], types: [], difficulty: [], count: 10, mode: "mix" }, st.settings.trainCfg || {});
    var modes = [["mix", "Prüfungsmix"], ["mixed", "Gemischt"], ["new", "Nur neue"], ["due", "Fällige Wiederholungen"], ["mistakes", "Fehlerheft"], ["weak", "Schwache Themen"]];
    var html = '<div class="page-head"><h1>Training</h1><p class="muted">Stelle dir eine Übungssession zusammen.</p></div>';
    if (!D.questions.length) html += noData();
    html += '<form class="card trainform">' +
      '<fieldset><legend>Prüfungsbereiche</legend><div class="checks">' + U.PARTS.map(function (p) {
        return '<label class="check"><input type="checkbox" name="part" value="' + p + '"' + (cfg.parts.indexOf(p) >= 0 ? " checked" : "") + "> " + U.esc(U.PART_SHORT[p]) + ' <span class="muted small">(' + (D.byPart[p] || []).length + ")</span></label>";
      }).join("") + "</div></fieldset>" +
      '<fieldset><legend>Themen <span class="muted small">(keine Auswahl = alle der gewählten Bereiche)</span></legend><details><summary class="small">Themen auswählen</summary><div class="checks topics"></div></details></fieldset>' +
      '<fieldset><legend>Aufgabentypen <span class="muted small">(keine Auswahl = alle)</span></legend><div class="checks">' + U.TYPES.map(function (t) {
        return '<label class="check"><input type="checkbox" name="type" value="' + t + '"' + (cfg.types.indexOf(t) >= 0 ? " checked" : "") + "> " + U.TYPE_LABEL[t] + "</label>";
      }).join("") + "</div></fieldset>" +
      '<fieldset><legend>Level</legend><div class="checks">' + [1, 2, 3].map(function (d) {
        return '<label class="check"><input type="checkbox" name="diff" value="' + d + '"' + (cfg.difficulty.indexOf(d) >= 0 ? " checked" : "") + "> " + UI.diff(d) + "</label>";
      }).join("") + "</div></fieldset>" +
      '<fieldset><legend>Modus</legend><div class="checks">' + modes.map(function (m) {
        return '<label class="check"><input type="radio" name="mode" value="' + m[0] + '"' + (cfg.mode === m[0] ? " checked" : "") + "> " + m[1] + "</label>";
      }).join("") + "</div></fieldset>" +
      '<div class="row wrap"><label>Anzahl <input class="input short" type="number" name="count" min="1" max="200" value="' + cfg.count + '"></label>' +
      '<span class="avail muted"></span><button class="btn primary" type="submit">Session starten <kbd>Enter</kbd></button></div></form>';
    c.innerHTML = html;
    var form = UI.$("form", c);
    function vals(name) { return UI.$$('input[name="' + name + '"]:checked', form).map(function (i) { return i.value; }); }
    function renderTopics() {
      var parts = vals("part");
      var box = UI.$(".checks.topics", form);
      var sel = cfg.topics;
      box.innerHTML = D.topics.filter(function (t) { return !parts.length || parts.indexOf(t.part) >= 0; }).map(function (t) {
        return '<label class="check"><input type="checkbox" name="topic" value="' + U.esc(t.id) + '"' + (sel.indexOf(t.id) >= 0 ? " checked" : "") + "> " + U.esc(t.title) + ' <span class="muted small">(' + (D.byTopic[t.id] || []).length + ")</span></label>";
      }).join("");
    }
    function read() {
      cfg = {
        parts: vals("part"), topics: vals("topic"), types: vals("type"),
        difficulty: vals("diff").map(Number), mode: (vals("mode")[0] || "mixed"),
        count: U.clamp(Number(form.count.value) || 10, 1, 200),
      };
      return cfg;
    }
    function update() {
      var o = read();
      var avail = E.buildSession(D.questions, st.progress, Object.assign({}, o, { count: 100000 }), U.today()).length;
      UI.$(".avail", form).textContent = "Passende Aufgaben: " + avail;
    }
    renderTopics();
    update();
    form.addEventListener("change", function (ev) {
      if (ev.target.name === "part") { read(); renderTopics(); }
      update();
    });
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var o = read();
      st.settings.trainCfg = o; S.save("settings");
      var qs = E.buildSession(D.questions, st.progress, o, U.today());
      App.startSession(qs, { title: o.mode === "mix" ? "Prüfungsmix" : "Training", backHref: "#/train" });
    });
    App.keys.set({ enter: function () { form.requestSubmit ? form.requestSubmit() : form.dispatchEvent(new Event("submit")); return true; } });
  };

  V.session = function (c) {
    var p = App.pending;
    if (!p) { location.replace("#/train"); return; }
    new App.Session(c, p.qs, p.opts);
  };

  /* ===================================================== Rechentrainer */

  V.generators = function (c, params) {
    var gs = D.generators, stats = S.state.genStats;
    if (params[0]) {
      var g = gs.filter(function (x) { return x.id === params[0]; })[0];
      var pool = g ? [g] : params[0] === "all" ? gs : [];
      if (!pool.length) { c.innerHTML = '<div class="card"><h2>Generator nicht gefunden</h2><a class="btn" href="#/generators">Zur Übersicht</a></div>'; return; }
      function make() {
        for (var tries = 0; tries < 5; tries++) {
          var gg = pool[Math.floor(Math.random() * pool.length)];
          try {
            var q = D.fromGenerator(gg, Math.random);
            if (q.question && q.solution) return q;
          } catch (e) { UI.toast("Generator " + gg.id + " fehlerhaft: " + e.message, "error"); }
        }
        return null;
      }
      var first = make();
      if (!first) { c.innerHTML = '<div class="card"><h2>Generator lieferte keine Aufgabe</h2><a class="btn" href="#/generators">Zurück</a></div>'; return; }
      new App.Session(c, [first], { title: "Rechentrainer – " + (g ? g.title : "gemischt"), endless: make, backHref: "#/generators" });
      return;
    }
    var html = '<div class="page-head"><h1>Rechentrainer</h1><p class="muted">Parametrisierte Aufgaben mit Zufallswerten – unendlich viele Varianten (Endlos-Modus).</p></div>';
    if (!gs.length) html += '<div class="notice">Keine Generatoren geladen (data/generators.js).</div>';
    else html += '<div class="card row between"><span>Alle Generatoren gemischt üben</span><a class="btn primary" href="#/generators/all">Gemischt starten</a></div>';
    U.PARTS.forEach(function (p) {
      var list = gs.filter(function (g) { return g.part === p; });
      if (!list.length) return;
      html += '<section class="card"><h2>' + UI.partBadge(p) + " " + U.esc(U.PART_LABEL[p]) + '</h2><div class="topicgrid">' + list.map(function (g) {
        var s = stats[g.id];
        return '<a class="topictile" href="#/generators/' + encodeURIComponent(g.id) + '"><div class="tt">' + U.esc(g.title) + '</div><div class="muted small">' + U.esc(D.topicTitle(g.topic)) + "</div>" +
          (s ? UI.bar(s.sum / s.n) + '<div class="small">' + s.n + " gerechnet · Ø " + U.pct(s.sum / s.n) + " · " + s.ok + " richtig</div>" : '<div class="small muted">noch nicht geübt</div>') + "</a>";
      }).join("") + "</div></section>";
    });
    c.innerHTML = html;
  };
})(typeof window !== "undefined" ? window : globalThis);
