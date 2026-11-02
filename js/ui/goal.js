/* AP2-Lerntool – Dranbleiben: Tagesziel-Ring, Serie, Heatmap, Feier und Erinnerung */
(function (root) {
  "use strict";
  var App = (root.App = root.App || {});
  var U = App.util, E = App.engine, S = App.store;
  var V = (App.views = App.views || {});
  var G = (App.goal = {});
  var doc = root.document;

  var KEY_CELEBRATED = "ap2.goalCelebrated"; // Datum, an dem das Tagesziel gefeiert wurde (nur gerätelokal)
  var KEY_MILESTONE = "ap2.goalMilestone"; // Datum des letzten Serien-Meilenstein-Toasts
  var KEY_REMIND = "ap2.remindDay"; // Datum der letzten Erinnerung
  var MILESTONES = [3, 7, 14, 21, 28];
  var MONTHS = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
  var SVGNS = 'xmlns="http://www.w3.org/2000/svg"';

  function lget(k) { try { return root.localStorage ? root.localStorage.getItem(k) : null; } catch (e) { return null; } }
  function lset(k, v) { try { if (root.localStorage) root.localStorage.setItem(k, v); } catch (e) { /* ignore */ } }
  function st() { return (S && S.state) || {}; }
  function logOf() { return st().log || {}; }
  function settings() { return st().settings || {}; }
  function UI() { return App.ui || {}; }

  /* ---------------------------------------------------------- Texte */
  G.tage = function (n) { return n + (n === 1 ? " Tag" : " Tage"); };
  G.aufgaben = function (n) { return n + (n === 1 ? " Aufgabe" : " Aufgaben"); };

  /* ---------------------------------------------------------- Kennzahlen */
  G.goal = function () { return Math.max(1, Math.round(Number(settings().dailyGoal) || 20)); };
  G.todayCount = function () { var l = logOf()[U.today()]; return (l && l.n) || 0; };
  G.streak = function (log, day) { return E.streak(log || logOf(), day || U.today()); };

  /** längste Serie aufeinanderfolgender Lerntage (n > 0) im Log */
  G.longestStreak = function (log) {
    log = log || logOf();
    var days = Object.keys(log).filter(function (d) { return U.parseDay(d) != null && log[d] && log[d].n > 0; }).sort();
    var best = 0, cur = 0, prev = null;
    days.forEach(function (d) {
      cur = prev && U.addDays(prev, 1) === d ? cur + 1 : 1;
      if (cur > best) best = cur;
      prev = d;
    });
    return best;
  };

  /** Tage der Woche (Mo–So) mit erreichtem Ziel */
  G.weekStats = function (log, goal, day) {
    log = log || logOf(); goal = goal || G.goal(); day = day || U.today();
    var mon = U.addDays(day, -((new Date(U.parseDay(day)).getUTCDay() + 6) % 7));
    var hit = 0, learned = 0;
    for (var i = 0; i < 7; i++) {
      var n = ((log[U.addDays(mon, i)] || {}).n) || 0;
      if (n > 0) learned++;
      if (n >= goal) hit++;
    }
    return { monday: mon, hit: hit, learned: learned };
  };

  G.level = function (n, goal) {
    if (!n) return 0;
    var r = n / goal;
    return r < 0.5 ? 1 : r < 1 ? 2 : r < 1.5 ? 3 : 4;
  };

  /* ---------------------------------------------------------- SVG-Bausteine */

  /** Fortschrittsring; frac 0..1 (>1 wird gekappt) */
  G.ringSvg = function (frac, size, stroke, center, cls) {
    size = size || 30; stroke = stroke || 4;
    var r = (size - stroke) / 2, c = size / 2;
    var p = Math.round(U.clamp(frac || 0, 0, 1) * 1000) / 10;
    return '<svg class="gring' + (cls ? " " + cls : "") + (frac >= 1 ? " done" : "") + '" ' + SVGNS + ' viewBox="0 0 ' + size + " " + size + '" width="' + size + '" height="' + size + '" aria-hidden="true" focusable="false">' +
      '<circle class="gr-bg" cx="' + c + '" cy="' + c + '" r="' + r + '" fill="none" stroke-width="' + stroke + '"/>' +
      '<circle class="gr-fg" cx="' + c + '" cy="' + c + '" r="' + r + '" fill="none" stroke-width="' + stroke + '" stroke-linecap="round" pathLength="100" stroke-dasharray="' + p + ' 100" transform="rotate(-90 ' + c + " " + c + ')"' + (p ? "" : ' stroke-opacity="0"') + "/>" +
      (center || "") + "</svg>";
  };

  /**
   * Heatmap im GitHub-Stil: Spalten = Wochen (Mo–So), Zeilen = Wochentage.
   * opts: {log, goal, today, weeks (Standard 16, inkl. aktueller Woche), examDate, futureWeeks (max. Wochen in die Zukunft bis zum Prüfungstag, Standard 6)}
   */
  G.heatmapSvg = function (opts) {
    opts = opts || {};
    var log = opts.log || logOf(), goal = Math.max(1, opts.goal || G.goal()), today = opts.today || U.today();
    var weeks = Math.max(1, opts.weeks || 16), exam = opts.examDate !== undefined ? opts.examDate : settings().examDate;
    var futureMax = opts.futureWeeks != null ? opts.futureWeeks : 6;
    var thisMon = U.addDays(today, -((new Date(U.parseDay(today)).getUTCDay() + 6) % 7));
    var extra = 0;
    if (exam && U.parseDay(exam) != null) {
      var dd = U.daysBetween(thisMon, exam);
      if (dd >= 7 && dd < (futureMax + 1) * 7) extra = Math.floor(dd / 7);
    }
    var cols = weeks + extra;
    var start = U.addDays(thisMon, -(weeks - 1) * 7);
    var CELL = 11, STEP = 14, LEFT = 24, TOP = 16;
    var w = LEFT + cols * STEP, h = TOP + 7 * STEP;
    var out = [];
    out.push('<svg class="gheat" ' + SVGNS + ' viewBox="0 0 ' + w + " " + h + '" width="100%" preserveAspectRatio="xMinYMin meet" role="img" aria-label="Lernaktivität der letzten ' + weeks + ' Wochen">');
    ["Mo", "", "Mi", "", "Fr", "", "So"].forEach(function (lbl, i) {
      if (lbl) out.push('<text class="ghl" x="0" y="' + (TOP + i * STEP + 9) + '">' + lbl + "</text>");
    });
    // Monatsbeschriftungen: Spalte, in deren Woche ein Monat beginnt (erste Spalte nur, wenn Platz ist)
    var labels = [];
    for (var lc = 0; lc < cols; lc++) {
      var lmon = U.addDays(start, lc * 7);
      for (var k = 0; k < 7; k++) { var dk = U.addDays(lmon, k); if (dk.slice(8) === "01") { labels.push({ col: lc, m: Number(dk.slice(5, 7)) - 1 }); break; } }
    }
    if (!labels.length || labels[0].col >= 3) labels.unshift({ col: 0, m: Number(start.slice(5, 7)) - 1 });
    labels.forEach(function (l, i) {
      if (i && l.col - labels[i - 1].col < 3) return;
      out.push('<text class="ghl" x="' + (LEFT + l.col * STEP) + '" y="10">' + MONTHS[l.m] + "</text>");
    });
    for (var col = 0; col < cols; col++) {
      var mon = U.addDays(start, col * 7);
      for (var row = 0; row < 7; row++) {
        var d = U.addDays(mon, row);
        var x = LEFT + col * STEP, y = TOP + row * STEP;
        var future = d > today, isExam = exam && d === exam, isToday = d === today;
        var n = ((log[d] || {}).n) || 0;
        var cls = future ? "gfut" : "hm" + G.level(n, goal);
        if (isToday) cls += " gtoday";
        if (isExam) cls += " gexam";
        var tip = U.weekday(d) + ", " + U.fmtDate(d) + ": " + (future ? "noch offen" : G.aufgaben(n) + (n >= goal ? " – Ziel erreicht" : "")) + (isExam ? " – Prüfungstag" : "") + (isToday ? " (heute)" : "");
        out.push('<rect class="' + cls + '" x="' + x + '" y="' + y + '" width="' + CELL + '" height="' + CELL + '" rx="2.5"><title>' + U.esc(tip) + "</title></rect>");
        if (isExam) out.push('<text class="gexamt" x="' + (x + CELL / 2) + '" y="' + (y + 8.6) + '" text-anchor="middle" aria-hidden="true">P</text>');
      }
    }
    out.push("</svg>");
    return out.join("");
  };

  function legendHtml(goal) {
    var tips = ["keine Aufgabe", "unter 50 % des Ziels", "unter 100 % des Ziels", "Ziel erreicht (" + goal + ")", "ab 150 % des Ziels"];
    return '<div class="gheatlegend small muted"><span>weniger</span>' + [0, 1, 2, 3, 4].map(function (i) {
      return '<svg ' + SVGNS + ' viewBox="0 0 11 11" width="11" height="11" aria-hidden="true"><rect class="hm' + i + '" width="11" height="11" rx="2.5"><title>' + U.esc(tips[i]) + "</title></rect></svg>";
    }).join("") + "<span>mehr</span>" + '<span class="gexamleg"><svg ' + SVGNS + ' viewBox="0 0 11 11" width="11" height="11" aria-hidden="true"><rect class="gfut gexam" x="0.5" y="0.5" width="10" height="10" rx="2.5"/></svg>Prüfungstag</span></div>';
  }

  /* ---------------------------------------------------------- Kopfzeile */

  function chipEl() {
    var el = doc && doc.getElementById("goalchip");
    if (el || !doc) return el;
    var bar = doc.querySelector(".topbar");
    if (!bar) return null;
    el = doc.createElement("a");
    el.id = "goalchip";
    el.className = "goalchip";
    el.href = "#/dashboard";
    var ref = doc.getElementById("rankchip") || doc.getElementById("savebtn");
    if (ref && ref.parentNode === bar) bar.insertBefore(el, ref); else bar.appendChild(el);
    return el;
  }

  G.renderChip = function () {
    var el = chipEl();
    if (!el) return;
    var n = G.todayCount(), goal = G.goal(), s = G.streak();
    var txt = "Tagesziel heute: " + n + " von " + goal + " Aufgaben" + (n >= goal ? " – erreicht" : "") + " · Serie: " + G.tage(s);
    el.setAttribute("aria-label", txt);
    el.title = txt;
    el.classList.toggle("done", n >= goal);
    el.classList.toggle("nostreak", !s);
    el.innerHTML = G.ringSvg(n / goal, 30, 4, n >= goal ? '<path class="gr-check" d="M10 15.5l3.2 3.2L20.5 11.5" fill="none" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>' : "") +
      '<span class="gcf" aria-hidden="true">🔥</span><span class="gcn" aria-hidden="true">' + s + "</span>";
  };

  /* ---------------------------------------------------------- Dashboard */

  function streakHint(n, goal, s) {
    if (n >= goal) return "Tagesziel erreicht – stark! Die Serie ist für heute gesichert.";
    if (n > 0) return "Serie für heute gesichert ✓ – noch " + G.aufgaben(goal - n) + " bis zum Tagesziel.";
    if (s > 0) return "Heute noch mindestens 1 Aufgabe, um deine " + s + (s === 1 ? "-Tages-Serie" : "-Tage-Serie") + " zu halten – " + G.aufgaben(goal) + " bis zum Tagesziel.";
    return "Starte heute eine neue Serie – " + G.aufgaben(goal) + " bis zum Tagesziel.";
  }

  G.dashboardHtml = function () {
    var log = logOf(), day = U.today(), n = G.todayCount(), goal = G.goal();
    var s = G.streak(), best = Math.max(G.longestStreak(log), s), wk = G.weekStats(log, goal, day);
    var center = '<text class="grc-n" x="60" y="60" text-anchor="middle">' + n + '</text><text class="grc-g" x="60" y="80" text-anchor="middle">von ' + goal + "</text>";
    return '<div class="card goalcard" id="goalcard"><h2>Dranbleiben</h2>' +
      '<div class="gtop">' +
      '<div class="gbig" role="img" aria-label="Heute ' + n + " von " + goal + ' Aufgaben gelöst">' + G.ringSvg(n / goal, 120, 11, center, "big") + "</div>" +
      '<div class="gstats">' +
      '<div class="gstreak' + (s ? "" : " off") + '"><span class="gflame" aria-hidden="true">🔥</span><span class="gsv">' + s + '</span><span class="gsl">' + (s === 1 ? "Tag" : "Tage") + " Serie</span></div>" +
      '<div class="small muted">Längste Serie: <strong>' + G.tage(best) + "</strong></div>" +
      '<p class="ghint">' + U.esc(streakHint(n, goal, s)) + "</p>" +
      '<div class="small">Diese Woche: <strong>' + wk.hit + " von 7 Tagen</strong> Ziel erreicht" + (wk.learned > wk.hit ? ' <span class="muted">(' + wk.learned + " Tage gelernt)</span>" : "") + "</div>" +
      "</div></div>" +
      '<div class="gheatwrap">' + G.heatmapSvg({ log: log, goal: goal, today: day }) + "</div>" + legendHtml(goal) +
      "</div>";
  };

  function insertDashboard(c) {
    if (!c || !c.querySelector) return;
    var old = c.querySelector("#goalcard");
    var tmp = doc.createElement("div");
    tmp.innerHTML = G.dashboardHtml();
    var card = tmp.firstChild;
    if (old) { old.parentNode.replaceChild(card, old); return; }
    var kpi = c.querySelector(".grid.kpi4"), hero = c.querySelector(".card.hero");
    if (kpi && kpi.parentNode) kpi.parentNode.insertBefore(card, kpi.nextSibling);
    else if (hero && hero.parentNode) hero.parentNode.insertBefore(card, hero);
    else c.appendChild(card);
  }

  if (typeof V.dashboard === "function") {
    var origDash = V.dashboard;
    V.dashboard = function (c) {
      var ret = origDash.apply(this, arguments);
      try { insertDashboard(c); } catch (e) { if (root.console) console.error(e); }
      return ret;
    };
  }

  /* ---------------------------------------------------------- Feier */

  function reducedMotion() {
    try { return root.matchMedia && root.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) { return false; }
  }

  G.confetti = function () {
    if (!doc || !doc.body || reducedMotion()) return;
    var box = doc.createElement("div");
    box.className = "gconfetti";
    box.setAttribute("aria-hidden", "true");
    var colors = ["var(--accent)", "var(--good)", "var(--mid)", "var(--bad)", "var(--p-ga2)", "var(--p-wiso)"];
    var html = "";
    for (var i = 0; i < 48; i++) {
      html += '<i style="left:' + (Math.random() * 100).toFixed(1) + "%;background:" + colors[i % colors.length] +
        ";--gx:" + Math.round((Math.random() - 0.5) * 160) + "px;--gr:" + Math.round(Math.random() * 720 - 360) + "deg" +
        ";animation-delay:" + Math.round(Math.random() * 300) + "ms;width:" + (6 + Math.round(Math.random() * 5)) + "px" + '"></i>';
    }
    box.innerHTML = html;
    doc.body.appendChild(box);
    setTimeout(function () { if (box.parentNode) box.parentNode.removeChild(box); }, 2000);
  };

  function pulseChip() {
    var el = chipEl();
    if (!el) return;
    el.classList.remove("pulse");
    void el.offsetWidth; // Animation neu starten
    el.classList.add("pulse");
    setTimeout(function () { el.classList.remove("pulse"); }, 1600);
  }

  function toast(msg, kind) { var ui = UI(); if (ui.toast) ui.toast(msg, kind); }

  /** nach einem Versuch: Übergänge erkennen (vorher/nachher am selben Tag) */
  G._afterAttempt = function (day, before, after) {
    var goal = G.goal(), today = U.today();
    if (day !== today) return;
    var s = G.streak(logOf(), today);
    if (before < goal && after >= goal && lget(KEY_CELEBRATED) !== today) {
      lset(KEY_CELEBRATED, today);
      G.confetti();
      pulseChip();
      toast("Tagesziel erreicht! 🔥 Serie: " + G.tage(s), "ok");
    }
    if (before === 0 && after > 0 && MILESTONES.indexOf(s) >= 0 && lget(KEY_MILESTONE) !== today) {
      lset(KEY_MILESTONE, today);
      setTimeout(function () { toast("🔥 " + s + " Tage in Folge gelernt – weiter so!", "ok"); }, 400);
    }
  };

  if (S && typeof S.recordAttempt === "function") {
    var origRecord = S.recordAttempt;
    S.recordAttempt = function () {
      var day = U.today(), before = G.todayCount();
      var ret = origRecord.apply(this, arguments);
      try {
        var after = G.todayCount();
        G._afterAttempt(day, before, after);
        G.refresh();
      } catch (e) { if (root.console) console.error(e); }
      return ret;
    };
  }

  /* ---------------------------------------------------------- Erinnerung */

  G.notifyInfo = function () {
    var has = typeof root.Notification === "function";
    var secure = !!root.isSecureContext;
    return {
      supported: has, secure: secure, usable: has && secure,
      permission: has ? root.Notification.permission : "unsupported",
      file: root.location && root.location.protocol === "file:",
    };
  };

  function remindAt() { var v = String(settings().remindAt || ""); return /^\d{2}:\d{2}$/.test(v) ? v : "19:00"; }

  function remindText() {
    var rest = Math.max(0, G.goal() - G.todayCount());
    return "Heute noch " + G.aufgaben(rest) + " bis zum Tagesziel – Serie: " + G.tage(G.streak()) + " 🔥";
  }

  /** Benachrichtigung zeigen; Fallback In-App-Toast. Rückgabe: true = System-Benachrichtigung */
  G.notify = function (body) {
    var info = G.notifyInfo();
    if (info.usable && info.permission === "granted") {
      try {
        var nt = new root.Notification("AP2-Lerntool", { body: body, tag: "ap2-goal" });
        nt.onclick = function () {
          try { root.focus(); } catch (e) { /* ignore */ }
          root.location.hash = "#/dashboard";
          try { nt.close(); } catch (e) { /* ignore */ }
        };
        return true;
      } catch (e) { /* z. B. Android ohne Service Worker → Fallback */ }
    }
    toast("⏰ " + body);
    return false;
  };

  G.checkReminder = function () {
    var s = settings();
    if (!s.remindOn) return false;
    var now = U.now(), hm = U.pad(now.getHours()) + ":" + U.pad(now.getMinutes());
    var today = U.today();
    if (hm < remindAt() || G.todayCount() >= G.goal() || lget(KEY_REMIND) === today) return false;
    lset(KEY_REMIND, today);
    G.notify(remindText());
    return true;
  };

  function permLabel(info) {
    if (!info.supported) return "Dieser Browser unterstützt keine Benachrichtigungen.";
    if (!info.secure) return "Nicht verfügbar: Benachrichtigungen brauchen einen sicheren Kontext (https oder localhost). Über die LAN-IP (z. B. am Handy) geht das nicht – dann erinnert dich das Lerntool nur innerhalb der Seite.";
    if (info.permission === "granted") return "Berechtigung erteilt ✓";
    if (info.permission === "denied") return "Berechtigung verweigert – bitte in den Website-Einstellungen des Browsers erlauben. Bis dahin erinnert das Lerntool nur innerhalb der Seite.";
    return "Noch nicht erlaubt – beim Aktivieren fragt der Browser nach.";
  }

  function requestPermission(cb) {
    var info = G.notifyInfo();
    if (!info.usable || info.permission !== "default") { cb(info.permission); return; }
    try {
      var p = root.Notification.requestPermission(function (r) { cb(r); });
      if (p && typeof p.then === "function") p.then(cb, function () { cb(root.Notification.permission); });
    } catch (e) { cb(root.Notification.permission); }
  }

  G.settingsHtml = function () {
    var s = settings(), info = G.notifyInfo();
    return '<div class="card goalremind" id="goalremind"><h2>Tagesziel &amp; Erinnerung</h2>' +
      '<p class="muted small">Dein Tagesziel (aktuell <strong>' + G.aufgaben(G.goal()) + "</strong>) stellst du oben unter „Lernen“ ein. Optional erinnert dich das Lerntool zu einer festen Uhrzeit, wenn das Ziel noch nicht erreicht ist.</p>" +
      '<div class="row wrap">' +
      '<label class="gcheck"><input type="checkbox" name="remindOn"' + (s.remindOn ? " checked" : "") + "> Tägliche Erinnerung</label>" +
      '<label>Uhrzeit <input class="input short" type="time" name="remindAt" value="' + U.esc(remindAt()) + '"></label>' +
      '<button class="btn" type="button" data-act="testnotify">Test-Benachrichtigung</button>' +
      "</div>" +
      '<p class="small gperm' + (info.usable ? "" : " off") + '" data-perm>' + U.esc(permLabel(info)) + "</p>" +
      '<div class="notice small">Die Erinnerung funktioniert nur, solange ein Tab mit dem Lerntool geöffnet ist (geprüft wird jede Minute) – es gibt keinen Push-Server. ' +
      (info.file ? "Unter <code>file://</code> erlauben manche Browser keine Benachrichtigungen; dann erscheint die Erinnerung als Hinweis in der Seite. " : "") +
      "Ohne Berechtigung erscheint die Erinnerung als Hinweis innerhalb der Seite.</div></div>";
  };

  function bindSettings(card) {
    var cb = card.querySelector('[name="remindOn"]'), tm = card.querySelector('[name="remindAt"]');
    var permEl = card.querySelector("[data-perm]"), test = card.querySelector('[data-act="testnotify"]');
    function showPerm() { var info = G.notifyInfo(); permEl.textContent = permLabel(info); permEl.classList.toggle("off", !info.usable); }
    cb.addEventListener("change", function () {
      var s = settings();
      s.remindOn = cb.checked;
      if (!s.remindAt) s.remindAt = remindAt();
      S.save("settings");
      if (cb.checked) {
        requestPermission(function () {
          showPerm();
          toast("Erinnerung um " + remindAt() + " Uhr aktiviert" + (G.notifyInfo().permission === "granted" ? "." : " (als Hinweis in der Seite)."));
        });
      } else toast("Erinnerung deaktiviert.");
    });
    tm.addEventListener("change", function () {
      if (!/^\d{2}:\d{2}$/.test(tm.value)) { toast("Ungültige Uhrzeit.", "error"); return; }
      settings().remindAt = tm.value;
      S.save("settings");
      toast("Erinnerung um " + tm.value + " Uhr gespeichert.");
    });
    test.addEventListener("click", function () {
      requestPermission(function () {
        showPerm();
        G.notify(remindText());
      });
    });
  }

  if (typeof V.settings === "function") {
    var origSettings = V.settings;
    V.settings = function (c) {
      var ret = origSettings.apply(this, arguments);
      try {
        if (c && c.querySelector && !c.querySelector("#goalremind")) {
          var tmp = doc.createElement("div");
          tmp.innerHTML = G.settingsHtml();
          var card = tmp.firstChild, form = c.querySelector("#fsettings");
          if (form && form.parentNode) form.parentNode.insertBefore(card, form.nextSibling); else c.appendChild(card);
          bindSettings(card);
        }
      } catch (e) { if (root.console) console.error(e); }
      return ret;
    };
  }

  /* ---------------------------------------------------------- Aktualisieren & Start */

  G.refresh = function () {
    if (!doc) return;
    G.renderChip();
    var card = doc.getElementById("goalcard");
    if (card && card.parentNode) insertDashboard(card.parentNode);
  };

  var lastDay = null;
  function tick() {
    try {
      var d = U.today();
      if (d !== lastDay) { lastDay = d; G.renderChip(); }
      G.checkReminder();
    } catch (e) { /* ignore */ }
  }

  function hookRoute() {
    if (typeof App.route !== "function" || App.route._goal) return;
    var origRoute = App.route;
    App.route = function () {
      var ret = origRoute.apply(this, arguments);
      try { G.renderChip(); } catch (e) { /* ignore */ }
      return ret;
    };
    App.route._goal = true;
  }

  var started = false;
  function start() {
    if (started) return;
    started = true;
    hookRoute(); // vor App.init, damit auch der hashchange-Listener den Wrapper bekommt
    try { G.renderChip(); } catch (e) { /* ignore */ }
    lastDay = U.today();
    setInterval(tick, 60000);
    setTimeout(tick, 3000);
    doc.addEventListener("visibilitychange", function () { if (!doc.hidden) tick(); });
    root.addEventListener("hashchange", function () { try { G.renderChip(); } catch (e) { /* ignore */ } });
  }

  if (doc && typeof setInterval === "function") {
    if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", start);
    else setTimeout(start, 0);
  }
})(typeof window !== "undefined" ? window : globalThis);
