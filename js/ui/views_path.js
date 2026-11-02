/* AP2-Lerntool – Lernpfad GA2 (SQL & Algorithmen in Levels) und adaptiver Einstufungstest */
(function (root) {
  "use strict";
  var App = (root.App = root.App || {});
  var U = App.util, E = App.engine, UI = App.ui, S = App.store, D = App.data;
  var V = (App.views = App.views || {});

  var PATHS = [
    { id: "sql", label: "SQL", topics: ["ga2-sql-select", "ga2-sql-join", "ga2-sql-aggregat", "ga2-sql-subquery", "ga2-sql-dml", "ga2-sql-ddl", "ga2-sql-transaktionen"] },
    { id: "algo", label: "Pseudocode & Algorithmen", topics: ["ga2-pseudocode", "ga2-sortieren-suchen", "ga2-rekursion", "ga2-datenstrukturen", "ga2-oop", "ga2-komplexitaet"] },
  ];
  var LEVELS = [1, 2, 3];
  var RESULT = {
    0: { label: "Grundlagen aufbauen", hint: "Starte mit Leicht", cls: "low" },
    1: { label: "Leicht sicher", hint: "Weiter mit Mittel", cls: "mid" },
    2: { label: "Mittel sicher", hint: "Weiter mit Schwer", cls: "mid" },
    3: { label: "Schwer sicher", hint: "Nur noch wiederholen", cls: "good" },
  };
  App.PATHS = PATHS;

  function pathsFor(scope) { return PATHS.filter(function (p) { return scope === "all" || p.id === scope; }); }
  function shortTitle(t) { return D.topicTitle(t).replace(/^SQL:\s*/, ""); }

  /** Aufgaben eines Themas in einem Level, aufbauend sortiert (step, dann id) */
  function cellQs(topic, lvl) {
    return (D.byTopic[topic] || []).filter(function (q) { return Number(q.difficulty) === lvl && !q.ai && (!App.pathFilter || App.pathFilter(q)); })
      .slice().sort(function (a, b) {
        var sa = a.step || 999, sb = b.step || 999;
        return sa - sb || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
      });
  }
  /** Reihenfolge für eine Übungssession: aufbauend, noch nicht sichere Aufgaben zuerst */
  function practiceOrder(qs) {
    var pr = S.state.progress;
    var open = qs.filter(function (q) { return E.questionMastery(pr[q.id]) < E.PASS; });
    var done = qs.filter(function (q) { return E.questionMastery(pr[q.id]) >= E.PASS; });
    return open.concat(done);
  }
  function cellStat(topic, lvl) { return E.topicStats(cellQs(topic, lvl), S.state.progress, U.today()); }

  function lastPlacement() {
    var ps = S.state.placements || [];
    return ps.length ? ps[ps.length - 1] : null;
  }
  /** Eingestuftes Level je Thema aus dem jüngsten Test, in dem es vorkam */
  function placedLevel(topic) {
    var ps = S.state.placements || [];
    for (var i = ps.length - 1; i >= 0; i--) if (ps[i].skills && ps[i].skills[topic] != null) return ps[i].skills[topic];
    return null;
  }
  /** Empfohlenes Level: erstes nicht gemeistertes oberhalb der Einstufung */
  function recommended(topic) {
    var placed = placedLevel(topic) || 0;
    for (var i = 0; i < LEVELS.length; i++) {
      var l = LEVELS[i];
      if (l <= placed) continue;
      var st = cellStat(topic, l);
      if (st.total && st.mastery < E.PASS) return l;
    }
    return null;
  }

  function startCell(topic, lvl) {
    var qs = practiceOrder(cellQs(topic, lvl)).slice(0, 20);
    App.startSession(qs, { title: shortTitle(topic) + " · " + UI.LEVEL[lvl], backHref: "#/path" });
  }
  function startLevel(scope, lvl) {
    var qs = [];
    pathsFor(scope).forEach(function (p) { p.topics.forEach(function (t) { qs = qs.concat(practiceOrder(cellQs(t, lvl)).slice(0, 4)); }); });
    var pr = S.state.progress;
    qs.sort(function (a, b) { return E.questionMastery(pr[a.id]) - E.questionMastery(pr[b.id]); });
    App.startSession(qs.slice(0, 20), { title: (scope === "sql" ? "SQL" : scope === "algo" ? "Algorithmen" : "GA2") + " · alle " + UI.LEVEL[lvl], backHref: "#/path" });
  }

  function levelDots(level) {
    return '<span class="ldots">' + LEVELS.map(function (l) { return '<i class="' + (level != null && l <= level ? "on" : "") + '"></i>'; }).join("") + "</span>";
  }

  /* ============================================================ Lernpfad */

  V.path = function (c) {
    var s = S.state.settings;
    var scope = s.pathScope || "all", only = Number(s.pathLevel) || 0;
    var lp = lastPlacement();
    var shownLevels = only ? [only] : LEVELS;

    var html = '<div class="page-head"><h1>Lernpfad GA2: SQL &amp; Algorithmen</h1>' +
      '<p class="muted">Jedes Thema in drei aufeinander aufbauenden Levels. Ein Level gilt als <strong>gemeistert</strong>, wenn du es zu 80 % sicher beherrschst – dann ist das nächste dran.</p></div>';

    html += '<div class="card placement-cta"><div class="grow"><h2>Einstufungstest</h2>' +
      (lp ? '<p class="small">Zuletzt am ' + U.esc(U.fmtDate(lp.date)) + " (" + U.esc(lp.scopeLabel || "") + '). Deine Einstufung steuert die Empfehlungen unten.</p>'
        : '<p class="small">Finde in ca. 20–30 Minuten heraus, wo du stehst: Pro Thema prüft der Test zuerst eine mittlere Aufgabe und passt sich dann an (leichter oder schwerer).</p>') +
      '</div><div class="btnrow"><a class="btn primary" href="#/placement">' + (lp ? "Test wiederholen" : "Einstufungstest starten") + "</a>" +
      (lp ? '<a class="btn" href="#/placement/result">Letztes Ergebnis</a>' : "") + "</div></div>";

    html += '<div class="card pathbar"><div class="seg" role="group" aria-label="Bereich">' +
      [["all", "Beides"], ["sql", "SQL"], ["algo", "Algorithmen"]].map(function (x) {
        return '<button type="button" class="segbtn' + (scope === x[0] ? " on" : "") + '" data-scope="' + x[0] + '" aria-pressed="' + (scope === x[0]) + '">' + x[1] + "</button>";
      }).join("") + '</div><div class="seg" role="group" aria-label="Level">' +
      [[0, "Alle Level"], [1, "Nur Leicht"], [2, "Nur Mittel"], [3, "Nur Schwer"]].map(function (x) {
        return '<button type="button" class="segbtn' + (only === x[0] ? " on" : "") + (x[0] ? " lv" + x[0] : "") + '" data-level="' + x[0] + '" aria-pressed="' + (only === x[0]) + '">' + x[1] + "</button>";
      }).join("") + "</div></div>";

    // Stand je Level
    html += '<div class="grid kpi3">' + LEVELS.filter(function (l) { return shownLevels.indexOf(l) >= 0; }).map(function (l) {
      var all = [];
      pathsFor(scope).forEach(function (p) { p.topics.forEach(function (t) { all = all.concat(cellQs(t, l)); }); });
      var st = E.topicStats(all, S.state.progress, U.today());
      return '<div class="card kpi-card lvlcard lv' + l + '"><div class="kl">' + UI.diff(l) + '</div><div class="kv">' + U.pct(st.mastery) + "</div>" + UI.bar(st.mastery) +
        '<div class="muted small">' + st.mastered + " von " + st.total + ' Aufgaben sicher</div><div class="btnrow"><button class="btn small" data-all="' + l + '"' + (st.total ? "" : " disabled") + ">Alle " + UI.LEVEL[l] + "-Aufgaben üben</button></div></div>";
    }).join("") + "</div>";

    pathsFor(scope).forEach(function (p) {
      html += '<div class="card"><h2>' + U.esc(p.label) + '</h2><div class="tablewrap"><table class="list pathgrid"><thead><tr><th>Thema</th><th>Einstufung</th>' +
        shownLevels.map(function (l) { return "<th>" + UI.diff(l) + "</th>"; }).join("") + "</tr></thead><tbody>" +
        p.topics.map(function (t) {
          var rec = recommended(t), placed = placedLevel(t);
          var tm = E.mastery(D.byTopic[t] || [], S.state.progress);
          return '<tr><td>' + (App.profile ? App.profile.badge(tm, "xs") + " " : "") + '<a href="#/topic/' + encodeURIComponent(t) + '">' + U.esc(shortTitle(t)) + "</a></td><td class='small'>" +
            (placed != null ? levelDots(placed) + " " + U.esc(RESULT[placed].label) : '<span class="muted">nicht getestet</span>') + "</td>" +
            shownLevels.map(function (l) {
              var st = cellStat(t, l);
              if (!st.total) return '<td class="muted small">–</td>';
              var done = st.mastery >= E.PASS, isRec = rec === l;
              var prev = l > 1 ? cellStat(t, l - 1) : null;
              var early = prev && prev.total && prev.mastery < 0.5 && !done && (placed == null || placed < l - 1);
              return '<td class="pcell' + (done ? " done" : "") + (isRec ? " rec" : "") + (early ? " early" : "") + '">' +
                '<button type="button" class="pcellbtn" data-topic="' + U.esc(t) + '" data-lvl="' + l + '" title="' + U.esc(shortTitle(t) + " · " + UI.LEVEL[l] + " üben") + '">' +
                '<span class="ptop">' + (done ? "✓ gemeistert" : isRec ? "▶ empfohlen" : early ? "erst " + UI.LEVEL[l - 1] : st.attempted ? "in Arbeit" : "offen") + "</span>" +
                UI.bar(st.mastery) + '<span class="small muted">' + st.mastered + "/" + st.total + " sicher · " + U.pct(st.mastery) + "</span></button></td>";
            }).join("") + "</tr>";
        }).join("") + "</tbody></table></div></div>";
    });
    c.innerHTML = html;

    UI.$$("[data-scope]", c).forEach(function (b) { b.addEventListener("click", function () { s.pathScope = b.getAttribute("data-scope"); S.save("settings"); App.route(); }); });
    UI.$$("[data-level]", c).forEach(function (b) { b.addEventListener("click", function () { s.pathLevel = Number(b.getAttribute("data-level")); S.save("settings"); App.route(); }); });
    UI.$$("[data-all]", c).forEach(function (b) { b.addEventListener("click", function () { startLevel(scope, Number(b.getAttribute("data-all"))); }); });
    UI.$$(".pcellbtn", c).forEach(function (b) { b.addEventListener("click", function () { startCell(b.getAttribute("data-topic"), Number(b.getAttribute("data-lvl"))); }); });
  };

  /** Kompakte Übersicht fürs Dashboard */
  App.pathSummaryHtml = function () {
    var rows = PATHS.map(function (p) {
      return '<li><span class="pname">' + U.esc(p.label) + "</span>" + LEVELS.map(function (l) {
        var all = [];
        p.topics.forEach(function (t) { all = all.concat(cellQs(t, l)); });
        var m = E.mastery(all, S.state.progress);
        return '<span class="plv">' + UI.diff(l) + UI.bar(m) + '<span class="small num">' + U.pct(m) + "</span></span>";
      }).join("") + "</li>";
    }).join("");
    return '<div class="card"><h3>Lernpfad GA2 – Stand nach Level</h3><ul class="pathsum">' + rows + '</ul><div class="btnrow"><a class="btn primary" href="#/path">Zum Lernpfad</a><a class="btn" href="#/placement">' +
      (lastPlacement() ? "Einstufungstest wiederholen" : "Einstufungstest machen") + "</a></div></div>";
  };

  /* ===================================================== Einstufungstest */

  function pickQuestion(topic, lvl, used, autoOnly) {
    var pr = S.state.progress;
    var qs = cellQs(topic, lvl).filter(function (q) { return !used[q.id]; });
    var prefer = function (q) { return q.type === "sql" || E.isAuto(q); };
    var pool = autoOnly && qs.some(prefer) ? qs.filter(prefer) : qs;
    if (!pool.length) return null;
    var fresh = pool.filter(function (q) { return !pr[q.id]; });
    var cand = fresh.length ? fresh : pool;
    return cand[Math.floor(Math.random() * cand.length)];
  }

  function Placement(scope, autoOnly) {
    this.scope = scope; this.autoOnly = autoOnly;
    this.used = {};
    this.skills = [];
    var self = this;
    pathsFor(scope).forEach(function (p) { p.topics.forEach(function (t) { self.skills.push({ topic: t, asked: [], level: null, done: false }); }); });
    this.cur = 0;
  }
  /** nächste Frage für das aktuelle Thema bestimmen (oder zum nächsten Thema wechseln) */
  Placement.prototype.next = function () {
    while (this.cur < this.skills.length) {
      var sk = this.skills[this.cur];
      var lvl = this.decide(sk);
      if (lvl) {
        var q = pickQuestion(sk.topic, lvl, this.used, this.autoOnly);
        if (q) { this.used[q.id] = 1; sk.pending = lvl; return q; }
        // keine Aufgabe in diesem Level → so behandeln, als gäbe es das Level nicht
        sk.asked.push({ lvl: lvl, skip: true });
        continue;
      }
      sk.done = true;
      this.cur++;
    }
    return null;
  };
  /** Adaptive Regel: Start Mittel → bestanden: eine Stufe schwerer, nicht bestanden: eine Stufe leichter.
   *  Fehlt eine Stufe (keine Aufgabe), wird sie übersprungen. Gibt das nächste Level zurück oder 0 (= fertig, sk.level gesetzt). */
  Placement.prototype.decide = function (sk) {
    var tried = sk.asked.map(function (a) { return a.lvl; });
    var untried = function (l) { return l >= 1 && l <= 3 && tried.indexOf(l) < 0; };
    var real = sk.asked.filter(function (a) { return !a.skip; });
    var passed = real.filter(function (a) { return a.pass; }).map(function (a) { return a.lvl; });
    var best = passed.length ? Math.max.apply(null, passed) : 0;
    if (!real.length) {
      var start = [2, 1, 3].filter(untried)[0];
      if (start) return start;
      sk.level = null; return 0;
    }
    var last = real[real.length - 1];
    var dir = last.pass ? 1 : -1;
    for (var l = last.lvl + dir; l >= 1 && l <= 3; l += dir) {
      if (untried(l) && (dir > 0 || best < l)) return l;
      if (tried.indexOf(l) >= 0 && !sk.asked.some(function (a) { return a.lvl === l && a.skip; })) break;
    }
    sk.level = best;
    return 0;
  };
  Placement.prototype.record = function (q, r) {
    var sk = this.skills[this.cur];
    if (!sk || sk.topic !== q.topic) sk = this.skills.filter(function (x) { return x.topic === q.topic; })[0];
    if (!sk) return;
    sk.asked.push({ lvl: Number(q.difficulty), pass: r.pct >= E.PASS, pct: r.pct, id: q.id });
  };
  Placement.prototype.result = function () {
    var out = {};
    this.skills.forEach(function (sk) {
      if (sk.level == null) {
        var real = sk.asked.filter(function (a) { return !a.skip; });
        if (!real.length) return;
        // abgebrochen: höchstes bestandenes Level
        var passed = real.filter(function (a) { return a.pass; }).map(function (a) { return a.lvl; });
        sk.level = passed.length ? Math.max.apply(null, passed) : 0;
      }
      out[sk.topic] = sk.level;
    });
    return out;
  };

  App._Placement = Placement; // für Tests

  V.placement = function (c, params) {
    if (params[0] === "result") { renderResult(c, lastPlacement()); return; }
    var hasKey = App.ai && App.ai.available();
    var html = '<div class="page-head"><div class="crumbs"><a href="#/path">Lernpfad</a> › Einstufungstest</div><h1>Einstufungstest GA2</h1>' +
      '<p class="muted">Der Test passt sich dir an: Pro Thema kommt zuerst eine <strong>mittlere</strong> Aufgabe. Löst du sie (≥ 80 %), folgt eine <strong>schwere</strong>, sonst eine <strong>leichte</strong>. Am Ende siehst du je Thema, wo du stehst und mit welchem Level du weitermachen solltest.</p></div>' +
      '<form class="card" id="fplace"><fieldset><legend>Was soll getestet werden?</legend><div class="checks">' +
      [["all", "SQL + Algorithmen (13 Themen, ca. 25–30 Aufgaben)"], ["sql", "Nur SQL (7 Themen, ca. 14 Aufgaben)"], ["algo", "Nur Pseudocode & Algorithmen (6 Themen, ca. 12 Aufgaben)"]].map(function (x, i) {
        return '<label class="check"><input type="radio" name="scope" value="' + x[0] + '"' + (i === 0 ? " checked" : "") + "> " + x[1] + "</label>";
      }).join("") + "</div></fieldset>" +
      '<label class="check"><input type="checkbox" name="auto" checked> Bevorzugt automatisch prüfbare Aufgaben (SQL ausführen, Zahlen, Auswahl, Reihenfolge) – objektiver und schneller</label>' +
      (hasKey ? "" : '<p class="small muted">Ohne API-Key bewertest du freie Antworten/Code selbst anhand der Musterlösung – sei dabei ehrlich, sonst stimmt die Einstufung nicht.</p>') +
      '<p class="small muted">Tipp: Ohne Hilfsmittel und ohne „Lösung zeigen“ arbeiten. Die Ergebnisse zählen auch für deinen Lernfortschritt.</p>' +
      '<div class="btnrow"><button class="btn primary" type="submit">Test starten <kbd>Enter</kbd></button><a class="btn ghost" href="#/path">Abbrechen</a></div></form>';
    c.innerHTML = html;
    var f = UI.$("#fplace", c);
    f.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var scope = (UI.$('input[name="scope"]:checked', f) || {}).value || "all";
      var pl = new Placement(scope, f.auto.checked);
      var first = pl.next();
      if (!first) { UI.toast("Keine passenden Aufgaben gefunden.", "error"); return; }
      new App.Session(c, [first], {
        title: "Einstufungstest", backHref: "#/path", totalHint: pl.skills.length * 2,
        nextQuestion: function (q, r) { if (r) pl.record(q, r); return pl.next(); },
        onFinish: function (rows) {
          var res = pl.result();
          if (!Object.keys(res).length) { location.hash = "#/path"; return; }
          var entry = {
            date: U.today(), at: new Date().toISOString(), scope: scope,
            scopeLabel: scope === "sql" ? "SQL" : scope === "algo" ? "Algorithmen" : "SQL + Algorithmen",
            skills: res, answered: rows.length,
            points: U.sum(rows, function (x) { return x.r.points; }), max: U.sum(rows, function (x) { return x.r.max; }),
          };
          S.state.placements.push(entry);
          if (S.state.placements.length > 50) S.state.placements = S.state.placements.slice(-50);
          S.save("placements");
          renderResult(c, entry);
        },
      });
    });
    App.keys.set({ enter: function () { f.requestSubmit ? f.requestSubmit() : f.dispatchEvent(new Event("submit")); return true; } });
  };

  function renderResult(c, entry) {
    if (!entry) { c.innerHTML = '<div class="card"><h2>Noch kein Einstufungstest</h2><a class="btn primary" href="#/placement">Jetzt starten</a></div>'; return; }
    var topics = Object.keys(entry.skills);
    var strong = topics.filter(function (t) { return entry.skills[t] >= 2; });
    var build = topics.filter(function (t) { return entry.skills[t] <= 1; }).sort(function (a, b) { return entry.skills[a] - entry.skills[b]; });
    var avg = topics.length ? U.sum(topics, function (t) { return entry.skills[t]; }) / topics.length : 0;
    function chipList(ts) {
      return ts.length ? "<ul class='qlist'>" + ts.map(function (t) { return "<li><strong>" + U.esc(shortTitle(t)) + "</strong> – " + U.esc(RESULT[entry.skills[t]].label) + "</li>"; }).join("") + "</ul>" : '<p class="muted small">–</p>';
    }
    var html = '<div class="page-head"><div class="crumbs"><a href="#/path">Lernpfad</a> › Einstufung</div><h1>Dein Stand: ' + U.esc(entry.scopeLabel) + "</h1>" +
      '<p class="muted">Test vom ' + U.esc(U.fmtDate(entry.date)) + " · " + entry.answered + " Aufgaben · " + U.fmtNum(entry.points, 1) + " / " + U.fmtNum(entry.max, 1) + " Punkte · Durchschnitts-Level " + U.fmtNum(avg, 1) + " von 3</p></div>" +
      '<div class="grid parts2"><div class="card"><h3>Stärken (Mittel/Schwer sicher)</h3>' + chipList(strong) + '</div><div class="card"><h3>Hier musst du aufbauen</h3>' + chipList(build) + "</div></div>" +
      '<div class="card"><h2>Einstufung je Thema</h2><div class="tablewrap"><table class="list"><thead><tr><th>Thema</th><th>Level</th><th>Ergebnis</th><th>Nächster Schritt</th></tr></thead><tbody>' +
      topics.sort(function (a, b) { return entry.skills[a] - entry.skills[b]; }).map(function (t) {
        var lv = entry.skills[t], R = RESULT[lv], next = lv < 3 ? lv + 1 : 3;
        return "<tr><td><a href='#/topic/" + encodeURIComponent(t) + "'>" + U.esc(shortTitle(t)) + "</a></td><td>" + levelDots(lv) + "</td><td><span class='" + R.cls + "-t'>" + U.esc(R.label) + "</span></td>" +
          '<td><button type="button" class="btn small' + (lv < 2 ? " primary" : "") + '" data-topic="' + U.esc(t) + '" data-lvl="' + next + '">' + (lv < 3 ? UI.LEVEL[next] + " üben" : "Schwer wiederholen") + "</button></td></tr>";
      }).join("") + "</tbody></table></div>" +
      '<p class="small muted">Empfehlung: Arbeite die Themen von oben nach unten ab. Ein Level gilt als gemeistert, wenn du 80 % seiner Aufgaben sicher löst – der Lernpfad zeigt dir dann automatisch das nächste.</p>' +
      '<div class="btnrow"><a class="btn primary" href="#/path">Zum Lernpfad</a><a class="btn" href="#/placement">Neuer Test</a></div></div>';
    var hist = (S.state.placements || []).filter(function (p) { return p.scope === entry.scope; });
    if (hist.length > 1) {
      html += '<div class="card"><h3>Verlauf</h3><table class="list"><thead><tr><th>Datum</th><th>Ø Level</th><th>Punkte</th></tr></thead><tbody>' + hist.slice(-8).reverse().map(function (p) {
        var ts = Object.keys(p.skills), a = ts.length ? U.sum(ts, function (t) { return p.skills[t]; }) / ts.length : 0;
        return "<tr><td>" + U.esc(U.fmtDate(p.date)) + "</td><td>" + U.fmtNum(a, 1) + "</td><td>" + U.pct(p.max ? p.points / p.max : 0) + "</td></tr>";
      }).join("") + "</tbody></table></div>";
    }
    c.innerHTML = html;
    UI.$$("[data-topic]", c).forEach(function (b) { b.addEventListener("click", function () { startCell(b.getAttribute("data-topic"), Number(b.getAttribute("data-lvl"))); }); });
    try { root.scrollTo({ top: 0 }); } catch (e) { /* ignore */ }
  }
})(typeof window !== "undefined" ? window : globalThis);
