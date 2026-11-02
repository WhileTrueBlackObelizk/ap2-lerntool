/* AP2-Lerntool – Persistenz (localStorage, Prefix "ap2.") und Datenzugriff */
(function (root) {
  "use strict";
  var App = (root.App = root.App || {});
  var U = App.util, E = App.engine;
  var PREFIX = "ap2.";
  var mem = {};

  function lsGet(key) {
    try { return root.localStorage ? root.localStorage.getItem(PREFIX + key) : null; } catch (e) { return null; }
  }
  function lsSet(key, str) {
    try { if (root.localStorage) { root.localStorage.setItem(PREFIX + key, str); return true; } } catch (e) {
      if (root.console) console.warn("Speichern fehlgeschlagen (" + key + "):", e && e.message);
    }
    return false;
  }
  function lsRemove(key) { try { if (root.localStorage) root.localStorage.removeItem(PREFIX + key); } catch (e) { /* ignore */ } }

  var S = (App.store = {});
  S.DEFAULT_SETTINGS = { examDate: "2026-11-25", dailyGoal: 20, model: "claude-opus-5-5", theme: "auto", autoSave: true };
  S.KEYS = ["settings", "progress", "log", "exams", "genStats", "aiQuestions", "aiExams", "placements", "profileHist", "examRun"];
  S.KEYS.push("fgProject", "fgLog"); // Fachgespräch-Training (Projektdaten = Eingaben, fgLog = Verlauf)
  S.saveFailed = false;

  S.read = function (key, def) {
    var raw = lsGet(key);
    if (raw == null) return key in mem ? mem[key] : def;
    try { return JSON.parse(raw); } catch (e) { return def; }
  };
  S.write = function (key, val) {
    mem[key] = val;
    var ok = lsSet(key, JSON.stringify(val));
    if (!ok && root.localStorage) S.saveFailed = true;
    if (!S.silent && key !== "examRun" && typeof S.onChange === "function") S.onChange(key);
    return ok;
  };

  /* Metadaten der Speicherkarte (Zeitstempel), lösen kein onChange aus */
  S.readMeta = function () { try { return JSON.parse(lsGet("cardMeta") || "null"); } catch (e) { return null; } };
  S.writeMeta = function (m) { lsSet("cardMeta", JSON.stringify(m)); };

  S.load = function () {
    var st = (S.state = {});
    var s = S.read("settings", {}) || {};
    st.settings = Object.assign({}, S.DEFAULT_SETTINGS, typeof s === "object" ? s : {});
    st.progress = obj(S.read("progress", {}));
    st.log = obj(S.read("log", {}));
    st.exams = arr(S.read("exams", []));
    st.genStats = obj(S.read("genStats", {}));
    st.aiQuestions = arr(S.read("aiQuestions", []));
    st.aiExams = arr(S.read("aiExams", []));
    st.placements = arr(S.read("placements", []));
    st.profileHist = obj(S.read("profileHist", {}));
    st.examRun = S.read("examRun", null);
    st.fgProject = obj(S.read("fgProject", {})); // Fachgespräch: Projekt-Eckdaten
    st.fgLog = arr(S.read("fgLog", []));         // Fachgespräch: Verlauf (Drill/Präsentation)
    return st;
  };
  function obj(x) { return x && typeof x === "object" && !Array.isArray(x) ? x : {}; }
  function arr(x) { return Array.isArray(x) ? x : []; }

  S.save = function (key) { S.write(key, S.state[key]); };

  /* API-Key separat, wird nicht exportiert */
  S.getApiKey = function () { var k = lsGet("apiKey"); return k != null ? k : mem.apiKey || ""; };
  S.setApiKey = function (k) { mem.apiKey = k || ""; if (k) lsSet("apiKey", k); else lsRemove("apiKey"); };

  /* ---------------------------------------------------- Versuche speichern */

  /** q: Frage, result: {points,max,pct} */
  S.recordAttempt = function (q, result) {
    var day = U.today();
    var pct = result.max ? result.points / result.max : 0;
    var st = S.state;
    var l = st.log[day] || (st.log[day] = { n: 0, sum: 0, pts: 0, max: 0, parts: {} });
    l.n++; l.sum += pct; l.pts += result.points; l.max += result.max;
    l.parts = l.parts || {};
    l.parts[q.part] = (l.parts[q.part] || 0) + 1;
    S.save("log");
    if (q._gen) {
      var g = st.genStats[q._gen] || (st.genStats[q._gen] = { n: 0, sum: 0, ok: 0, last: null });
      g.n++; g.sum += pct; if (pct >= E.PASS) g.ok++; g.last = day;
      S.save("genStats");
      return;
    }
    if (!q.id) return;
    var entry = st.progress[q.id];
    entry = E.leitnerUpdate(entry, pct, day);
    entry.part = q.part; entry.topic = q.topic;
    st.progress[q.id] = entry;
    S.save("progress");
  };

  S.addExamResult = function (r) {
    S.state.exams.push(r);
    if (S.state.exams.length > 200) S.state.exams = S.state.exams.slice(-200);
    S.save("exams");
  };

  /* ---------------------------------------------------- Export / Import */

  S.exportData = function () {
    var st = S.state;
    return {
      app: "ap2-lerntool", version: 1, exported: new Date().toISOString(),
      data: {
        settings: st.settings, progress: st.progress, log: st.log, exams: st.exams,
        genStats: st.genStats, aiQuestions: st.aiQuestions, aiExams: st.aiExams, placements: st.placements, profileHist: st.profileHist,
        fgProject: st.fgProject, fgLog: st.fgLog,
      },
    };
  };
  S.importData = function (json) {
    if (!json || json.app !== "ap2-lerntool" || !json.data || typeof json.data !== "object") throw new Error("Keine gültige Lerntool-Exportdatei.");
    var d = json.data;
    var st = S.state;
    if (d.settings && typeof d.settings === "object") st.settings = Object.assign({}, S.DEFAULT_SETTINGS, d.settings);
    st.progress = obj(d.progress);
    st.log = obj(d.log);
    st.exams = arr(d.exams);
    st.genStats = obj(d.genStats);
    st.aiQuestions = arr(d.aiQuestions);
    st.aiExams = arr(d.aiExams);
    st.placements = arr(d.placements);
    st.profileHist = obj(d.profileHist);
    if (d.fgProject !== undefined) st.fgProject = obj(d.fgProject); // ältere Exporte ohne Projektdaten: Eingaben behalten
    st.fgLog = arr(d.fgLog);
    ["settings", "progress", "log", "exams", "genStats", "aiQuestions", "aiExams", "placements", "profileHist", "fgProject", "fgLog"].forEach(S.save);
  };
  S.resetProgress = function () {
    var st = S.state;
    st.progress = {}; st.log = {}; st.exams = []; st.genStats = {}; st.examRun = null; st.placements = []; st.profileHist = {};
    ["progress", "log", "exams", "genStats", "examRun", "placements", "profileHist"].forEach(S.save);
    st.fgLog = []; S.save("fgLog"); // fgProject (Eingaben) bleibt erhalten
  };

  /* ================================================= Datenzugriff (AP2) */

  var D = (App.data = {});
  D.init = function () {
    var A = root.AP2 || {};
    var ok = function (x) { return x && typeof x === "object"; };
    D.topics = (Array.isArray(A.topics) ? A.topics : []).filter(function (t) { return ok(t) && t.id && t.title; });
    var seenT = {};
    D.topics = D.topics.filter(function (t) { if (seenT[t.id]) return false; seenT[t.id] = 1; return true; });
    D.baseQuestions = (Array.isArray(A.questions) ? A.questions : []).filter(function (q) { return ok(q) && q.id && q.type && q.question; });
    D.baseExams = (Array.isArray(A.exams) ? A.exams : []).filter(function (x) { return ok(x) && x.id && Array.isArray(x.tasks); });
    D.generators = (Array.isArray(A.generators) ? A.generators : []).filter(function (g) { return ok(g) && g.id && typeof g.generate === "function"; });
    D.refresh();
  };
  D.refresh = function () {
    var st = S.state || {};
    D.topicById = {};
    D.topics.forEach(function (t) { D.topicById[t.id] = t; });
    var ai = (st.aiQuestions || []).filter(function (q) { return q && q.id && q.type && q.question; });
    var seen = {};
    D.questions = D.baseQuestions.concat(ai).filter(function (q) { if (seen[q.id]) return false; seen[q.id] = 1; return true; });
    D.exams = D.baseExams.concat((st.aiExams || []).filter(function (x) { return x && x.id && Array.isArray(x.tasks); }));
    D.questionById = {};
    D.exams.forEach(function (x) { x.tasks.forEach(function (t) { if (t && t.id) D.questionById[t.id] = t; }); });
    D.questions.forEach(function (q) { D.questionById[q.id] = q; });
    D.byTopic = U.groupBy(D.questions, function (q) { return q.topic; });
    D.byPart = U.groupBy(D.questions, function (q) { return q.part; });
    D._search = null;
  };
  D.topicTitle = function (id) { var t = D.topicById[id]; return t ? t.title : id || "–"; };
  D.partOfTopic = function (id) { var t = D.topicById[id]; return t ? t.part : null; };
  D.examById = function (id) { return D.exams.filter(function (x) { return x.id === id; })[0] || null; };

  /** Beherrschung je Topic */
  D.masteryByTopic = function () {
    var m = {}, pr = S.state.progress;
    D.topics.forEach(function (t) { m[t.id] = E.mastery(D.byTopic[t.id] || [], pr); });
    return m;
  };

  /** Frage für die Generator-Ausgabe vervollständigen */
  D.fromGenerator = function (g, rnd) {
    var q = g.generate(rnd || Math.random);
    if (!q || typeof q !== "object") throw new Error("Generator lieferte keine Aufgabe");
    q = Object.assign({}, q);
    q.id = g.id + "-" + Date.now();
    q.part = q.part || g.part;
    q.topic = q.topic || g.topic;
    q.difficulty = q.difficulty || 2;
    q.points = q.points || 3;
    q.type = q.type || "numeric";
    q._gen = g.id;
    return q;
  };
})(typeof window !== "undefined" ? window : globalThis);
