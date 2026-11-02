/* AP2-Lerntool – Zeitbudget „Zeit pro Punkt wie in der Prüfung“
 * GA1/GA2: 90 Min für 100 Punkte (≈ 54 s/P), WiSo: 60 Min für 100 Punkte (≈ 36 s/P), FG: kein Budget.
 * In Prüfungssimulationen: run.minutes / Punktsumme.
 * Gemessen wird nur, solange der Tab sichtbar ist.
 * Hooks: views_exam.js (examRunning, examSummaryHtml, reviewBadge), components.js/App.Session (sessionShow, sessionGraded, sessionStop, sessionSummaryHtml).
 */
(function (root) {
  "use strict";
  var App = (root.App = root.App || {});
  var TB = (App.timebudget = {});
  var doc = root.document;

  TB.SEC_PER_POINT = { GA1: 54, GA2: 54, WISO: 36 };
  TB.MINUTES = { GA1: 90, GA2: 90, WISO: 60 };
  var MAX_DELTA = 15000; // Schutz gegen Standby/eingefrorene Timer: max. 15 s pro Messschritt

  function U() { return App.util; }
  function S() { return App.store; }
  function esc(s) { return U().esc(s); }
  function fmt(sec) { return U().fmtDuration(sec); }
  function fmtDiff(sec) { return (sec >= 0 ? "+" : "−") + fmt(Math.abs(sec)); }
  function fmtPts(p) { return U().fmtNum ? U().fmtNum(p, 1) : String(p); }
  function now() { return Date.now(); }
  function visible() { return !doc || doc.visibilityState !== "hidden"; }

  TB.enabled = function () {
    var st = S() && S().state;
    return !(st && st.settings && st.settings.timeBudget === false);
  };

  function sumPoints(tasks) {
    var s = 0;
    (tasks || []).forEach(function (t) { s += Number(t.points) || 0; });
    return s;
  }
  function isFG(q, run) { return (q && q.part === "FG") || (run && run.part === "FG"); }

  /** Sekunden pro Punkt (null = kein Budget). */
  TB.secPerPoint = function (part, run) {
    if (run) {
      if (run.part === "FG") return null;
      var sum = sumPoints(run.tasks);
      if (run.minutes && sum > 0) return (run.minutes * 60) / sum;
    }
    return TB.SEC_PER_POINT[part] || null;
  };

  /** Budget in Sekunden für eine Aufgabe (null = kein Budget). */
  TB.secondsFor = function (q, run) {
    if (!q || isFG(q, run)) return null;
    var pts = Number(q.points) || 0;
    if (pts <= 0) return null;
    var spp = TB.secPerPoint(q.part || (run && run.part), run);
    return spp ? Math.round(pts * spp) : null;
  };

  /** Erklärtext für title-Attribute. */
  TB.ruleText = function (part, run) {
    if (run && run.minutes) {
      var sum = sumPoints(run.tasks), spp = TB.secPerPoint(part, run);
      if (spp) {
        if (sum === 100 && (run.minutes === 90 || run.minutes === 60)) return "In der IHK-Prüfung hast du " + run.minutes + " Minuten für 100 Punkte, also ca. " + Math.round(spp) + " Sekunden pro Punkt.";
        return "In dieser Prüfung hast du " + run.minutes + " Minuten für " + fmtPts(sum) + " Punkte, also ca. " + Math.round(spp) + " Sekunden pro Punkt.";
      }
    }
    var m = TB.MINUTES[part];
    if (!m) return "Für diesen Bereich gibt es kein Zeitbudget.";
    return "In der IHK-Prüfung hast du " + m + " Minuten für 100 Punkte, also ca. " + TB.SEC_PER_POINT[part] + " Sekunden pro Punkt.";
  };

  /* ---------------------------------------------------- Uhr (nur sichtbar) */

  var clocks = [];
  function Clock(baseMs) {
    this.ms = Number(baseMs) || 0;
    this.last = visible() ? now() : null;
    clocks.push(this);
  }
  /** Zeit seit der letzten Messung aufaddieren (nur sichtbare Zeit). */
  Clock.prototype.sample = function () {
    var n = now();
    if (this.last != null) {
      var d = n - this.last;
      if (d > 0) this.ms += Math.min(d, MAX_DELTA);
    }
    this.last = visible() ? n : null;
    return this.ms;
  };
  Clock.prototype.stop = function () {
    this.sample();
    this.last = null;
    var i = clocks.indexOf(this);
    if (i >= 0) clocks.splice(i, 1);
    return this.ms;
  };
  TB.Clock = Clock;
  if (doc && doc.addEventListener) {
    doc.addEventListener("visibilitychange", function () {
      clocks.slice().forEach(function (c) { c.sample(); });
      if (doc.visibilityState === "hidden" && S() && S().state && S().state.examRun && S().state.examRun.phase === "running") {
        try { S().save("examRun"); } catch (e) { /* ignore */ }
      }
    });
  }

  /* --------------------------------------------------------------- Chip */

  /**
   * Dezente Anzeige „⏳ 1:12 / 3:36 · 4 P.“ mit dünnem Fortschrittsbalken.
   * opts: {budget (s), points, title}
   */
  function Chip(opts) {
    opts = opts || {};
    this.el = doc.createElement("span");
    this.el.className = "tbchip";
    this.el.setAttribute("aria-live", "off");
    this.el.innerHTML = '<span class="tbtxt"></span><span class="tbbar" aria-hidden="true"><span></span></span>';
    this.state = "ok";
    this.set(opts);
  }
  Chip.prototype.set = function (opts) {
    this.budget = opts.budget;
    this.points = opts.points;
    if (opts.title) this.el.title = opts.title;
    this.el.hidden = this.budget == null;
  };
  /** Aktualisiert die Anzeige; liefert den Zustand "ok" | "warn" | "crit". */
  Chip.prototype.update = function (ms) {
    if (this.budget == null) return "ok";
    var sec = ms / 1000, frac = this.budget ? sec / this.budget : 0;
    var st = frac >= 1.5 ? "crit" : frac >= 1 ? "warn" : "ok";
    this.el.firstChild.textContent = "⏳ " + fmt(sec) + " / " + fmt(this.budget) + " · " + fmtPts(this.points) + " P.";
    this.el.lastChild.firstChild.style.width = Math.round(Math.min(frac, 1) * 100) + "%";
    this.el.classList.toggle("warn", st === "warn");
    this.el.classList.toggle("crit", st === "crit");
    this.state = st;
    return st;
  };
  Chip.prototype.freeze = function () { this.el.classList.add("done"); };
  TB.Chip = Chip;
  TB.chip = function (opts) { return new Chip(opts); };

  function overToast(points, budget) {
    if (App.ui && App.ui.toast) App.ui.toast("Zeitbudget für diese Aufgabe überschritten (" + fmtPts(points) + " P. ≈ " + fmt(budget) + ")");
  }

  /* --------------------------------------------------- Prüfungssimulation */

  /**
   * Controller für runningView. Misst run.taskTime[taskId] (ms) und zeigt den Chip neben dem Timer.
   * Rückgabe: {show(task), tick(), stop(), navClass(task)}
   */
  TB.examRunning = function (run, c) {
    run.taskTime = run.taskTime || {};
    var on = TB.enabled();
    var chip = on && doc ? new Chip({}) : null;
    var tEl = c && c.querySelector(".timer");
    if (chip && tEl && tEl.parentNode) tEl.parentNode.insertBefore(chip.el, tEl.nextSibling);
    var cur = null, clock = null, budget = null, warned = {}, ticks = 0;

    function flush() {
      if (clock && cur) run.taskTime[cur.id] = Math.round(clock.sample());
    }
    function render() {
      if (chip && cur) chip.update(clock ? clock.ms : 0);
    }
    function markNav() {
      if (!on || !cur || !c) return;
      var i = run.tasks.indexOf(cur), b = c.querySelector('.tchip[data-go="' + i + '"]');
      if (b) { b.classList.add("tb-over"); b.title += " · Zeitbudget überschritten"; }
    }
    var api = {
      show: function (t) {
        if (cur && t && cur.id === t.id && clock) { render(); return; }
        flush();
        if (clock) clock.stop();
        cur = t;
        clock = new Clock(run.taskTime[t.id] || 0);
        budget = TB.secondsFor(t, run);
        if (chip) chip.set({ budget: budget, points: t.points, title: TB.ruleText(t.part || run.part, run) });
        render();
      },
      tick: function () {
        if (!cur || !clock) return;
        var before = clock.ms;
        flush();
        if (on && budget != null && before < budget * 1000 && clock.ms >= budget * 1000 && !warned[cur.id]) {
          warned[cur.id] = true;
          overToast(cur.points, budget);
          markNav();
        }
        render();
        if (++ticks % 10 === 0) { try { S().save("examRun"); } catch (e) { /* ignore */ } }
      },
      stop: function () {
        flush();
        if (clock) clock.stop();
        clock = null;
      },
      navClass: function (t) {
        if (!on) return "";
        var b = TB.secondsFor(t, run), ms = run.taskTime[t.id] || 0;
        return b != null && ms >= b * 1000 ? " tb-over" : "";
      },
    };
    return api;
  };

  function hasTimes(map) {
    if (!map) return false;
    for (var k in map) if (map[k] > 0) return true;
    return false;
  }

  /** Auswertungsabschnitt „Zeit je Aufgabe“ ("" wenn keine Zeitdaten). */
  TB.examSummaryHtml = function (run) {
    if (!run || !hasTimes(run.taskTime)) return "";
    var D = App.data;
    var rows = [], over = [], sumBudget = 0, sumUsed = 0;
    run.tasks.forEach(function (t, i) {
      var b = TB.secondsFor(t, run), used = (run.taskTime[t.id] || 0) / 1000;
      var r = run.results && run.results[t.id];
      var diff = b != null ? used - b : null;
      var isOver = b != null && used > b;
      sumUsed += used;
      if (b != null) sumBudget += b;
      var topic = D && D.topicTitle ? D.topicTitle(t.topic) : t.topic || "";
      var x = { i: i, t: t, b: b, used: used, diff: diff, over: isOver, topic: topic };
      if (isOver) over.push(x);
      rows.push("<tr" + (isOver ? ' class="tb-over"' : "") + "><td>" + (isOver ? '<span class="tbmark" aria-label="zu lange">✗</span> ' : "") + "Aufgabe " + (i + 1) + ' <span class="muted small">' + esc(topic) + "</span></td>" +
        "<td class='num'>" + fmtPts(Number(t.points) || 0) + "</td>" +
        "<td class='num'>" + (b != null ? fmt(b) : "–") + "</td>" +
        "<td class='num'>" + (used > 0 ? fmt(used) : "–") + "</td>" +
        "<td class='num tbdiff'>" + (diff != null && used > 0 ? fmtDiff(diff) : "–") + "</td>" +
        "<td class='num'>" + (r ? fmtPts(r.points || 0) + " / " + fmtPts(Number(t.points) || 0) : "–") + "</td></tr>");
    });
    var sentence;
    if (over.length) {
      var plus = over.reduce(function (s, x) { return s + x.diff; }, 0);
      var worst = over.slice().sort(function (a, b) { return b.diff - a.diff; })[0];
      sentence = "Bei <strong>" + over.length + " Aufgabe" + (over.length === 1 ? "" : "n") + "</strong> zu lange gebraucht (" + fmtDiff(plus) + " insgesamt) – die meiste Zeit kostete Aufgabe " + (worst.i + 1) + " (" + esc(worst.topic) + ", " + fmtDiff(worst.diff) + ").";
    } else {
      sentence = "Alle Aufgaben im Zeitbudget – gutes Prüfungstempo.";
    }
    return '<div class="tbsummary"><h3>Zeit je Aufgabe</h3>' +
      '<p class="small">' + sentence + ' <span class="muted">Gesamt: ' + fmt(sumUsed) + " gebraucht · Budget " + fmt(sumBudget) + ".</span></p>" +
      '<p class="muted small">' + esc(TB.ruleText(run.part, run)) + " Gezählt wird nur die Zeit, in der die Aufgabe geöffnet und der Tab sichtbar war.</p>" +
      '<div class="tbscroll"><table class="list compact tbtable"><thead><tr><th>Aufgabe</th><th>Punkte</th><th>Budget</th><th>gebraucht</th><th>Differenz</th><th>erreicht</th></tr></thead><tbody>' +
      rows.join("") + "</tbody></table></div></div>";
  };

  /** Kleines Badge „⏳ 5:10 / 3:36“ in der Kopfzeile einer Review-Karte. */
  TB.reviewBadge = function (run, t, cardEl) {
    if (!run || !run.taskTime || !cardEl) return;
    var ms = run.taskTime[t.id] || 0, b = TB.secondsFor(t, run);
    if (!ms || b == null) return;
    var over = ms / 1000 > b;
    var el = doc.createElement("span");
    el.className = "badge tbbadge" + (over ? " over" : "");
    el.title = "Gebrauchte Zeit / Zeitbudget. " + TB.ruleText(t.part || run.part, run);
    el.textContent = "⏳ " + fmt(ms / 1000) + " / " + fmt(b);
    var meta = cardEl.querySelector(".qmeta"), pts = meta && meta.querySelector(".pts");
    if (meta && pts) meta.insertBefore(el, pts);
    else if (meta) meta.appendChild(el);
  };

  /* --------------------------------------------------- Training (Session) */

  function stopCtl(sess) {
    var ctl = sess && sess._tb;
    if (!ctl) return;
    if (ctl.timer) clearInterval(ctl.timer);
    if (ctl.clock) ctl.clock.stop();
    sess._tb = null;
  }

  /** Start der Messung für die aktuell angezeigte Frage (nach dem Rendern von show()). */
  TB.sessionShow = function (sess, q) {
    stopCtl(sess);
    sess.times = sess.times || [];
    var idx = sess.idx, on = TB.enabled();
    var budget = TB.secondsFor(q);
    var ctl = { idx: idx, q: q, budget: budget, clock: new Clock(0), chip: null, warned: false };
    var sessEl = sess.c && sess.c.querySelector(".session");
    var head = sess.c && sess.c.querySelector(".sess-head");
    if (on && budget != null && head && doc) {
      ctl.chip = new Chip({ budget: budget, points: q.points, title: TB.ruleText(q.part) });
      var endBtn = head.querySelector('[data-act="end"]');
      head.insertBefore(ctl.chip.el, endBtn || null);
      ctl.chip.update(0);
    }
    ctl.timer = setInterval(function () {
      if (sessEl && !sessEl.isConnected) { stopCtl(sess); return; }
      var before = ctl.clock.ms, ms = ctl.clock.sample();
      if (ctl.chip) {
        ctl.chip.update(ms);
        if (!ctl.warned && before < budget * 1000 && ms >= budget * 1000) { ctl.warned = true; overToast(q.points, budget); }
      }
    }, 1000);
    sess._tb = ctl;
  };

  /** Frage bewertet: Zeit festhalten (sess.times[idx] in ms), Chip einfrieren. */
  TB.sessionGraded = function (sess, idx) {
    var ctl = sess && sess._tb;
    if (!ctl || ctl.idx !== idx) return;
    sess.times = sess.times || [];
    var ms = Math.round(ctl.clock.sample());
    if (sess.times[idx] == null) sess.times[idx] = ms;
    if (ctl.chip) { ctl.chip.update(sess.times[idx]); ctl.chip.freeze(); }
    stopCtl(sess);
  };

  TB.sessionStop = function (sess) { stopCtl(sess); };

  /** Abschnitt „Zeit“ für die Session-Auswertung ("" wenn keine Daten oder ausgeschaltet). */
  TB.sessionSummaryHtml = function (sess) {
    if (!sess || !sess.times || !TB.enabled()) return "";
    var total = 0, n = 0, bPts = 0, bUsed = 0, bBudget = 0, over = [];
    sess.qs.forEach(function (q, i) {
      var ms = sess.times[i];
      if (ms == null || !sess.results[i]) return;
      var sec = ms / 1000;
      total += sec; n++;
      var b = TB.secondsFor(q);
      if (b == null) return;
      bPts += Number(q.points) || 0; bUsed += sec; bBudget += b;
      if (sec > b) over.push({ q: q, sec: sec, b: b });
    });
    if (!n) return "";
    var html = '<div class="tbsummary"><h3>Zeit</h3><div class="kpis">' +
      '<div class="kpi"><div class="kv">' + fmt(total) + '</div><div class="kl">Gesamtzeit (' + n + " Aufgabe" + (n === 1 ? "" : "n") + ")</div></div>";
    if (bPts > 0) {
      var mine = bUsed / bPts, exam = bBudget / bPts;
      html += '<div class="kpi"><div class="kv' + (mine > exam ? " tbslow" : "") + '">' + Math.round(mine) + ' s</div><div class="kl">Ø pro Punkt (Prüfungstempo ≈ ' + Math.round(exam) + " s)</div></div>" +
        '<div class="kpi"><div class="kv">' + fmt(bUsed) + " / " + fmt(bBudget) + '</div><div class="kl">gebraucht / Budget</div></div>';
    }
    html += "</div>";
    if (over.length) {
      html += '<p class="small"><strong>Zu lange gebraucht</strong> (' + over.length + "):</p><ul class='qlist tblist'>" + over.map(function (x) {
        return "<li><span class='tbdiff'>" + fmt(x.sec) + " / " + fmt(x.b) + "</span> <span class='muted small'>" + fmtPts(x.q.points) + " P.</span> " + esc(U().truncate(U().stripHtml(x.q.question || ""), 120)) + "</li>";
      }).join("") + "</ul>";
    } else if (bPts > 0) {
      html += '<p class="small muted">Alle Aufgaben im Prüfungstempo gelöst.</p>';
    }
    return html + "</div>";
  };

  /* ------------------------------------------------------- Einstellungen */

  var V = (App.views = App.views || {});
  var origSettings = V.settings;
  if (typeof origSettings === "function") {
    V.settings = function (c) {
      var ret = origSettings.apply(this, arguments);
      try { addSettingsCard(c); } catch (e) { if (root.console) console.error(e); }
      return ret;
    };
  }
  function addSettingsCard(c) {
    if (!c || !doc) return;
    var st = S().state, s = st.settings;
    var card = doc.createElement("div");
    card.className = "card tbsettings";
    card.innerHTML = "<h2>Zeitbudget</h2>" +
      '<label class="check"><input type="checkbox" name="timeBudget"' + (TB.enabled() ? " checked" : "") + "> Zeitbudget pro Aufgabe anzeigen (Prüfungstempo)</label>" +
      '<p class="muted small">GA1/GA2: 90 Minuten für 100 Punkte (≈ 54 s pro Punkt), WiSo: 60 Minuten für 100 Punkte (≈ 36 s pro Punkt), Fachgespräch ohne Budget. ' +
      "Gemessen wird nur, solange der Tab sichtbar ist. Die Tabelle „Zeit je Aufgabe“ in der Prüfungsauswertung bleibt immer verfügbar.</p>";
    var anchor = c.querySelector("#cardsettings");
    if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(card, anchor.nextSibling);
    else c.appendChild(card);
    card.querySelector("input").addEventListener("change", function () {
      s.timeBudget = !!this.checked;
      S().save("settings");
      if (App.ui && App.ui.toast) App.ui.toast(this.checked ? "Zeitbudget eingeschaltet." : "Zeitbudget ausgeschaltet.");
    });
  }
})(typeof window !== "undefined" ? window : globalThis);
