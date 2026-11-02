/* AP2-Lerntool – Start, Hash-Router, Theme, Tastatur */
(function (root) {
  "use strict";
  var App = (root.App = root.App || {});
  var U = App.util, UI = App.ui, S = App.store, D = App.data, V = App.views;

  var ROUTES = {
    "": "dashboard", dashboard: "dashboard", topics: "topics", topic: "topic", cards: "cards",
    train: "train", session: "session", q: "question", exam: "exam", generators: "generators",
    profile: "profile", path: "path", placement: "placement", ai: "ai", mistakes: "mistakes", stats: "stats", settings: "settings", search: "search",
    tree: "tree", calib: "calib", danger: "danger", plan: "plan",
    feynman: "feynman",
    fg: "fg",
  };
  var TITLES = {
    dashboard: "Dashboard", topics: "Themen", topic: "Thema", cards: "Lernkarten", train: "Training", session: "Training",
    question: "Aufgabe", profile: "Lernprofil", path: "Lernpfad", placement: "Einstufungstest", exam: "Prüfung", examRun: "Prüfung", generators: "Rechentrainer", ai: "KI-Studio",
    mistakes: "Fehlerheft", stats: "Statistik", settings: "Einstellungen", search: "Suche",
    tree: "Wissensbaum", calib: "Kalibrierung", danger: "Gefährliche Lücken", plan: "Countdown-Plan",
    feynman: "Erklär es einem Laien",
    fg: "Fachgespräch",
  };
  var cleanup = null;

  function parseHash() {
    var h = (location.hash || "").replace(/^#\/?/, "");
    var qi = h.indexOf("?");
    var path = qi >= 0 ? h.slice(0, qi) : h, qs = qi >= 0 ? h.slice(qi + 1) : "";
    var parts = path.split("/").filter(Boolean).map(function (p) { try { return decodeURIComponent(p); } catch (e) { return p; } });
    var query = {};
    qs.split("&").forEach(function (kv) {
      if (!kv) return;
      var i = kv.indexOf("=");
      var k = i >= 0 ? kv.slice(0, i) : kv, v = i >= 0 ? kv.slice(i + 1) : "";
      try { query[decodeURIComponent(k)] = decodeURIComponent(v.replace(/\+/g, " ")); } catch (e) { query[k] = v; }
    });
    return { parts: parts, query: query };
  }

  App.route = function () {
    var r = parseHash();
    var head = r.parts[0] || "";
    var name = ROUTES[head];
    var params = r.parts.slice(1);
    if (head === "exam" && params[0] === "run") { name = "examRun"; params = []; }
    if (!name) name = "dashboard";
    if (typeof cleanup === "function") { try { cleanup(); } catch (e) { /* ignore */ } }
    cleanup = null;
    App.keys.clear();
    if (UI.beiblatt) UI.beiblatt.detach();
    var view = UI.$("#view");
    document.body.classList.remove("nav-open");
    UI.$$(".nav a").forEach(function (a) {
      var tgt = a.getAttribute("data-nav");
      var active = tgt === head || (tgt === "dashboard" && !head) || (tgt === "topics" && (head === "topic" || head === "cards")) || (tgt === "train" && (head === "session" || head === "q")) || (tgt === "path" && head === "placement") || (tgt === "calib" && head === "danger");
      a.classList.toggle("active", active);
      if (active) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
    document.title = (TITLES[name] || "AP2") + " · AP2-Lerntool FIAE";
    updateExamBanner(name);
    try {
      view.innerHTML = "";
      cleanup = V[name](view, params, r.query) || null;
    } catch (e) {
      console.error(e);
      view.innerHTML = '<div class="notice error"><strong>Fehler beim Anzeigen dieser Seite:</strong> ' + U.esc(e.message) + '</div><a class="btn" href="#/dashboard">Zum Dashboard</a>';
    }
    if (name !== "session" && name !== "examRun") try { root.scrollTo({ top: 0 }); } catch (e) { /* ignore */ }
    try { view.focus({ preventScroll: true }); } catch (e) { /* ignore */ }
  };

  function updateExamBanner(name) {
    var b = UI.$("#exambanner");
    var run = S.state.examRun;
    if (b) {
      var show = run && run.phase === "running" && name !== "examRun" && Date.now() < run.endsAt;
      b.classList.toggle("hidden", !show);
      if (show) b.innerHTML = 'Prüfung läuft: <strong>' + U.esc(run.title) + '</strong> · <a href="#/exam/run">fortsetzen</a>';
    }
  }

  /* ------------------------------------------------------------- Theme */

  App.applyTheme = function () {
    var t = S.state.settings.theme;
    var html = document.documentElement;
    if (t === "light" || t === "dark") html.setAttribute("data-theme", t);
    else html.removeAttribute("data-theme");
    var btn = UI.$("#themebtn");
    if (btn) {
      var dark = isDark();
      btn.setAttribute("aria-label", dark ? "Zum hellen Modus wechseln" : "Zum dunklen Modus wechseln");
      btn.title = btn.getAttribute("aria-label") + " (aktuell: " + (t === "auto" ? "System" : t === "dark" ? "Dunkel" : "Hell") + ")";
      btn.textContent = dark ? "☀" : "☾";
    }
  };
  function isDark() {
    var t = S.state.settings.theme;
    if (t === "dark") return true;
    if (t === "light") return false;
    try { return root.matchMedia("(prefers-color-scheme: dark)").matches; } catch (e) { return false; }
  }

  App.updateAiBadge = function () {
    var b = UI.$("#aibadge");
    if (!b) return;
    var on = App.ai.available();
    b.textContent = on ? "KI aktiv" : "KI aus";
    b.className = "aibadge " + (on ? "on" : "off");
    b.title = on ? "Claude-API-Key hinterlegt (" + App.ai.model() + ")" : "Kein API-Key – KI-Funktionen deaktiviert";
  };

  /* ---------------------------------------------------------- Tastatur */

  function onKey(ev) {
    var h = App.keys.handlers || {};
    var t = ev.target || {}, tag = t.tagName || "";
    var type = (t.type || "").toLowerCase();
    var inField = tag === "TEXTAREA" || tag === "SELECT" || t.isContentEditable || (tag === "INPUT" && ["radio", "checkbox", "button", "submit", "file", "range"].indexOf(type) < 0);
    if (ev.key === "Escape") {
      if (inField) { t.blur(); ev.preventDefault(); return; }
      if (h.esc && h.esc()) { ev.preventDefault(); return; }
      if (document.body.classList.contains("nav-open")) document.body.classList.remove("nav-open");
      return;
    }
    if (ev.ctrlKey || ev.metaKey) {
      if (ev.key === "Enter" && !ev.shiftKey && h.enter && (tag === "TEXTAREA" || tag === "INPUT") && t.closest && t.closest(".qcard, .session, .exam")) { ev.preventDefault(); h.enter(); }
      return;
    }
    if (ev.altKey) return;
    if (inField) {
      if (ev.key === "Enter" && tag === "INPUT" && t.classList.contains("num") && h.enter) { ev.preventDefault(); h.enter(); }
      return;
    }
    if (ev.key === "/") {
      var s = UI.$("#globalsearch");
      if (s) { ev.preventDefault(); s.focus(); s.select(); }
      return;
    }
    if (/^[1-9]$/.test(ev.key) && h.digit) { if (h.digit(Number(ev.key))) ev.preventDefault(); return; }
    if (ev.key === "Enter" && h.enter) {
      if (tag === "BUTTON" || tag === "A" || tag === "SUMMARY") return; // native Aktivierung
      ev.preventDefault(); h.enter(); return;
    }
    if (ev.key === " " && h.space && tag !== "BUTTON" && tag !== "A" && tag !== "SUMMARY" && tag !== "INPUT") { ev.preventDefault(); h.space(); return; }
    if (ev.key === "ArrowLeft" && h.left && tag !== "INPUT") { h.left(); return; }
    if (ev.key === "ArrowRight" && h.right && tag !== "INPUT") { h.right(); return; }
  }

  /* ------------------------------------------ Hinweis für die Online-Version */

  function onlineHint() {
    if (!U.isHosted()) return;
    try { if (root.localStorage.getItem("ap2.onlineHintSeen")) return; } catch (e) { /* ohne Storage trotzdem zeigen */ }
    var b = document.createElement("div");
    b.className = "onlinehint";
    b.setAttribute("role", "status");
    b.innerHTML = '<span><strong>Willkommen!</strong> Dein Lernstand wird nur in diesem Browser gespeichert – kein Konto nötig. ' +
      'Sichere ihn ab und zu mit <strong>Speichern</strong> oben rechts (lädt eine Datei herunter) und spiele ihn bei Bedarf über <a href="#/settings">Einstellungen → Import</a> wieder ein.</span>' +
      '<button type="button" class="btn small">Verstanden</button>';
    b.querySelector("button").addEventListener("click", function () {
      try { root.localStorage.setItem("ap2.onlineHintSeen", "1"); } catch (e) { /* ignore */ }
      b.remove();
    });
    var ex = UI.$("#exambanner");
    if (ex && ex.parentNode) ex.parentNode.insertBefore(b, ex); else document.body.insertBefore(b, document.body.firstChild);
  }

  /* -------------------------------------------------------------- Start */

  App.init = function () {
    S.load();
    D.init();
    App.applyTheme();
    App.updateAiBadge();
    try {
      root.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", App.applyTheme);
    } catch (e) { /* ältere Browser */ }
    UI.$("#themebtn").addEventListener("click", function () {
      S.state.settings.theme = isDark() ? "light" : "dark";
      S.save("settings");
      App.applyTheme();
    });
    UI.$("#navtoggle").addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      this.setAttribute("aria-expanded", open ? "true" : "false");
    });
    UI.$("#navscrim").addEventListener("click", function () { document.body.classList.remove("nav-open"); });
    UI.$("#searchform").addEventListener("submit", function (ev) {
      ev.preventDefault();
      var q = UI.$("#globalsearch").value.trim();
      location.hash = "#/search" + (q ? "?q=" + encodeURIComponent(q) : "");
    });
    document.addEventListener("keydown", onKey);
    root.addEventListener("hashchange", App.route);
    // Hinweis bei Daten-Ladefehlern
    var missing = (root.AP2_LOAD_ERRORS || []);
    if (missing.length) console.warn("Nicht geladene Datendateien:", missing.join(", "));
    var go = function () { if (App.profile) App.profile.init(); App.route(); onlineHint(); };
    (App.card ? App.card.boot() : Promise.resolve()).then(go, function (e) { console.error(e); go(); });
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", App.init);
  else App.init();
})(window);
