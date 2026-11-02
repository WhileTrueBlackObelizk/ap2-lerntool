/* AP2-Lerntool – Bewertungs- und Lernlogik (DOM-frei, in node testbar) */
(function (root) {
  "use strict";
  var App = (root.App = root.App || {});
  var U = App.util;
  var E = (App.engine = {});

  E.PASS = 0.8; // ab 80 % gilt eine Aufgabe als gelöst
  E.INTERVALS = [0, 1, 3, 7, 14]; // Leitner-Box 1..5 → Tage

  /* ------------------------------------------------------------------ Zahlen */

  /**
   * Liefert mögliche Zahlenwerte einer Eingabe (Komma/Punkt als Dezimaltrenner,
   * Tausenderpunkte/-kommas, Leerzeichen, Einheiten). Bei mehrdeutigen Eingaben
   * wie "1.234" werden beide Lesarten zurückgegeben.
   */
  E.parseNumber = function (input) {
    if (input == null) return [];
    if (typeof input === "number") return isFinite(input) ? [input] : [];
    var s = String(input).trim();
    if (!s) return [];
    s = s.replace(/[−–]/g, "-").replace(/[\s  '’]/g, "");
    // Einheiten / Währungszeichen / Prozent entfernen
    s = s.replace(/^[^\d\-+.,]+/, "").replace(/[^\d.,]+$/, "");
    var neg = false;
    if (/^[-+]/.test(s)) { neg = s[0] === "-"; s = s.slice(1); }
    if (!/^[\d.,]+$/.test(s) || !/\d/.test(s)) return [];
    var out = [];
    function add(str) {
      var v = Number(str);
      if (str !== "" && isFinite(v)) { v = neg ? -v : v; if (out.indexOf(v) < 0) out.push(v); }
    }
    var hasDot = s.indexOf(".") >= 0, hasComma = s.indexOf(",") >= 0;
    if (hasDot && hasComma) {
      // der zuletzt stehende Trenner ist der Dezimaltrenner
      if (s.lastIndexOf(",") > s.lastIndexOf(".")) add(s.replace(/\./g, "").replace(",", "."));
      else add(s.replace(/,/g, ""));
    } else if (hasComma) {
      var cParts = s.split(",");
      if (cParts.length > 2) add(s.replace(/,/g, "")); // 1,234,567
      else {
        add(s.replace(",", ".")); // deutsches Dezimalkomma
        if (/^\d{1,3},\d{3}$/.test(s)) add(s.replace(",", "")); // evtl. englischer Tausender
      }
    } else if (hasDot) {
      var dParts = s.split(".");
      if (dParts.length > 2) {
        if (/^\d{1,3}(\.\d{3})+$/.test(s)) add(s.replace(/\./g, ""));
      } else {
        add(s); // Dezimalpunkt
        if (/^\d{1,3}\.\d{3}$/.test(s)) add(s.replace(".", "")); // deutscher Tausenderpunkt
      }
    } else add(s);
    return out;
  };

  /* ------------------------------------------------------------- Bewertung */

  function res(q, points, extra) {
    var max = Number(q.points) || 1;
    points = U.clamp(U.roundHalf(points), 0, max);
    var r = { points: points, max: max, pct: max ? points / max : 0, final: true };
    for (var k in extra) r[k] = extra[k];
    r.correct = r.pct >= E.PASS;
    return r;
  }
  E.makeResult = res;

  E.gradeMC = function (q, ans) {
    var choice = ans && ans.choice != null ? Number(ans.choice) : null;
    var ok = choice != null && (q.correct || []).indexOf(choice) >= 0;
    return res(q, ok ? q.points : 0, { kind: "mc", choice: choice, answered: choice != null });
  };

  /** Teilpunkte: (richtig gewählt − falsch gewählt) / Anzahl richtiger, min. 0 */
  E.gradeMulti = function (q, ans) {
    var chosen = (ans && ans.choices) || [];
    var correct = q.correct || [];
    var right = 0, wrong = 0;
    chosen.forEach(function (c) { if (correct.indexOf(Number(c)) >= 0) right++; else wrong++; });
    var frac = correct.length ? Math.max(0, right - wrong) / correct.length : 0;
    return res(q, q.points * frac, { kind: "multi", right: right, wrong: wrong, need: correct.length, answered: chosen.length > 0 });
  };

  E.numericTolerance = function (q) {
    if (q.tolerance != null && isFinite(q.tolerance)) return Math.abs(Number(q.tolerance));
    return Math.max(0.01, Math.abs(Number(q.answer) || 0) * 1e-6);
  };
  E.gradeNumeric = function (q, ans) {
    var raw = ans && ans.value != null ? ans.value : "";
    var cands = E.parseNumber(raw);
    var tol = E.numericTolerance(q) + 1e-9;
    var target = Number(q.answer);
    var hit = cands.some(function (v) { return Math.abs(v - target) <= tol; });
    return res(q, hit ? q.points : 0, {
      kind: "numeric", value: String(raw), parsed: cands.length ? cands[0] : null,
      invalid: String(raw).trim() !== "" && !cands.length, answered: String(raw).trim() !== "",
    });
  };

  /** ans.order = Liste ursprünglicher Item-Indizes in der Reihenfolge des Nutzers */
  E.gradeOrder = function (q, ans) {
    var items = q.items || [];
    var order = (ans && ans.order) || [];
    var n = items.length, hits = 0;
    var positions = order.map(function (idx, pos) { var ok = Number(idx) === pos; if (ok) hits++; return ok; });
    return res(q, n ? (q.points * hits) / n : 0, { kind: "order", hits: hits, n: n, positions: positions, answered: true });
  };

  E.gradeAuto = function (q, ans) {
    switch (q.type) {
      case "mc": return E.gradeMC(q, ans);
      case "multi": return E.gradeMulti(q, ans);
      case "numeric": return E.gradeNumeric(q, ans);
      case "order": return E.gradeOrder(q, ans);
    }
    return null;
  };
  E.isAuto = function (q) { return ["mc", "multi", "numeric", "order"].indexOf(q.type) >= 0; };

  /** Initiale (gemischte) Reihenfolge für order-Aufgaben – garantiert nicht schon richtig */
  E.initialOrder = function (q, rnd) {
    var n = (q.items || []).length;
    var idx = [];
    for (var i = 0; i < n; i++) idx.push(i);
    if (n < 2) return idx;
    var a, tries = 0;
    do { a = U.shuffle(idx, rnd); tries++; } while (tries < 20 && a.every(function (v, i) { return v === i; }));
    return a;
  };

  /* ---------------------------------------------------- Keyword-Abgleich */

  E.normalizeText = function (s) {
    return String(s || "")
      .toLowerCase()
      .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
      .replace(/[áàâ]/g, "a").replace(/[éèê]/g, "e").replace(/[óòô]/g, "o").replace(/[úùû]/g, "u")
      .replace(/[^a-z0-9+#%€$<>=!*\/_.\- ]+/g, " ")
      .replace(/[_.\-\/]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };
  var SUFFIXES = ["ungen", "ung", "heiten", "heit", "keiten", "keit", "ern", "en", "er", "es", "em", "e", "n", "s"];
  E.stem = function (w) {
    w = String(w || "");
    if (w.length <= 4) return w;
    for (var i = 0; i < SUFFIXES.length; i++) {
      var suf = SUFFIXES[i];
      if (w.length - suf.length >= 4 && w.slice(-suf.length) === suf) return w.slice(0, -suf.length);
    }
    return w;
  };

  /** prüft ob eine (normalisierte) Alternative im Text vorkommt */
  E.matchAlt = function (alt, normText, words) {
    alt = E.normalizeText(alt);
    if (!alt) return false;
    if (alt.indexOf(" ") >= 0) {
      if (normText.indexOf(alt) >= 0) return true;
      // Phrase: alle Wortstämme in Folge (tolerant)
      var parts = alt.split(" ");
      return parts.every(function (p) { return E.matchAlt(p, normText, words); });
    }
    var st = E.stem(alt);
    for (var i = 0; i < words.length; i++) {
      var w = words[i];
      if (w === alt) return true;
      if (alt.length < 4) continue; // kurze Begriffe (z.B. "id", "sql") nur exakt
      var ws = E.stem(w);
      if (ws === st) return true;
      if (st.length >= 4 && w.indexOf(st) === 0) return true; // Wortstamm am Anfang
      if (alt.length >= 5 && w.indexOf(alt) >= 0) return true; // Kompositum: "datenkapselung"
      if (st.length >= 6 && w.indexOf(st) >= 0) return true;
    }
    return false;
  };

  E.keywordScore = function (q, text) {
    var kws = (q.keywords || []).filter(Boolean);
    var norm = E.normalizeText(text);
    var words = norm.split(" ").filter(Boolean);
    var found = [], missing = [];
    kws.forEach(function (kw) {
      var alts = String(kw).split("|").map(function (a) { return a.trim(); }).filter(Boolean);
      var ok = alts.some(function (a) { return E.matchAlt(a, norm, words); });
      (ok ? found : missing).push(alts[0] || kw);
    });
    var ratio = kws.length ? found.length / kws.length : 0;
    return { found: found, missing: missing, ratio: ratio, points: U.roundHalf((Number(q.points) || 0) * ratio) };
  };

  /** Keyword-Ergebnis (vorläufig) – Selbsteinschätzung setzt die Punkte final */
  E.gradeKeywords = function (q, text) {
    var empty = !String(text || "").trim();
    var k = E.keywordScore(q, text);
    var r = res(q, empty ? 0 : k.points, { kind: "keywords", found: k.found, missing: k.missing, ratio: k.ratio, answered: !empty });
    r.final = empty; // leere Antwort: sofort 0
    r.needsSelf = !empty;
    r.prelim = r.points;
    return r;
  };

  E.applySelf = function (result, frac) {
    var r = U.clone(result);
    r.points = U.clamp(U.roundHalf(r.max * frac), 0, r.max);
    r.pct = r.max ? r.points / r.max : 0;
    r.correct = r.pct >= E.PASS;
    r.self = frac;
    r.needsSelf = false;
    r.final = true;
    return r;
  };

  /* ------------------------------------------------------- Leitner / SRS */

  E.leitnerUpdate = function (entry, pct, day) {
    entry = entry || { box: 0, attempts: [] };
    entry.attempts = entry.attempts || [];
    var box = entry.box || 1;
    if (pct >= E.PASS) box = Math.min(5, (entry.box || 1) + 1);
    else box = 1;
    entry.box = box;
    entry.due = U.addDays(day, E.INTERVALS[box - 1]);
    entry.last = day;
    entry.attempts.push({ d: day, p: Math.round(pct * 1000) / 1000 });
    if (entry.attempts.length > 30) entry.attempts = entry.attempts.slice(-30);
    return entry;
  };

  /** gewichteter Mittelwert der letzten (max. 5) Versuche, neuere zählen mehr; unbearbeitet = 0 */
  E.questionMastery = function (entry) {
    if (!entry || !entry.attempts || !entry.attempts.length) return 0;
    var a = entry.attempts.slice(-5).reverse();
    var w = 1, sw = 0, s = 0;
    a.forEach(function (x) { s += w * x.p; sw += w; w *= 0.6; });
    return sw ? s / sw : 0;
  };

  E.isDue = function (entry, day) { return !!(entry && entry.due && entry.due <= day); };
  E.lastPct = function (entry) {
    return entry && entry.attempts && entry.attempts.length ? entry.attempts[entry.attempts.length - 1].p : null;
  };

  /** Beherrschung einer Fragenmenge (Mittel der Fragen-Beherrschung) */
  E.mastery = function (questions, progress) {
    if (!questions.length) return 0;
    return U.sum(questions, function (q) { return E.questionMastery(progress[q.id]); }) / questions.length;
  };

  E.topicStats = function (questions, progress, day) {
    var st = { total: questions.length, attempted: 0, mastered: 0, due: 0, mastery: 0 };
    questions.forEach(function (q) {
      var e = progress[q.id];
      if (e && e.attempts && e.attempts.length) {
        st.attempted++;
        if (E.questionMastery(e) >= E.PASS) st.mastered++;
        if (E.isDue(e, day)) st.due++;
      }
    });
    st.mastery = E.mastery(questions, progress);
    return st;
  };

  /* ---------------------------------------------------------- IHK-Noten */

  E.ihkGrade = function (points) {
    var p = Math.round(points);
    if (p >= 92) return 1;
    if (p >= 81) return 2;
    if (p >= 67) return 3;
    if (p >= 50) return 4;
    if (p >= 30) return 5;
    return 6;
  };
  E.GRADE_LABEL = { 1: "sehr gut", 2: "gut", 3: "befriedigend", 4: "ausreichend", 5: "mangelhaft", 6: "ungenügend" };

  /**
   * Prognose je Bereich: letzte Versuche (punktgewichtet) + letzte Simulationen.
   * attempts: [{p, w}] (neueste zuletzt), exams: [points0..100]
   */
  E.predict = function (attempts, examPoints) {
    var recent = attempts.slice(-40);
    var aPct = null;
    if (recent.length >= 5) {
      var sw = 0, s = 0;
      recent.forEach(function (a) { s += a.p * (a.w || 1); sw += a.w || 1; });
      aPct = sw ? (s / sw) * 100 : null;
    }
    var ex = examPoints.slice(-3);
    var ePts = ex.length ? U.sum(ex) / ex.length : null;
    var pts = null;
    if (aPct != null && ePts != null) pts = 0.6 * ePts + 0.4 * aPct;
    else if (ePts != null) pts = ePts;
    else if (aPct != null) pts = aPct;
    if (pts == null) return null;
    pts = Math.round(pts);
    return { points: pts, grade: E.ihkGrade(pts), basis: (ex.length ? ex.length + " Sim. + " : "") + recent.length + " Versuche" };
  };

  /* ---------------------------------------------------------- Streak etc. */

  E.streak = function (log, day) {
    var n = 0, d = day;
    if (!(log[d] && log[d].n > 0)) d = U.addDays(day, -1); // heute noch nichts → ab gestern zählen
    while (log[d] && log[d].n > 0) { n++; d = U.addDays(d, -1); }
    return n;
  };

  /* ----------------------------------------------------- Session-Auswahl */

  /**
   * opts: {parts:[], topics:[], types:[], difficulty:[], count, mode: "mixed"|"new"|"due"|"mistakes"|"weak"}
   */
  E.filterPool = function (pool, opts) {
    opts = opts || {};
    return pool.filter(function (q) {
      if (opts.parts && opts.parts.length && opts.parts.indexOf(q.part) < 0) return false;
      if (opts.topics && opts.topics.length && opts.topics.indexOf(q.topic) < 0) return false;
      if (opts.types && opts.types.length && opts.types.indexOf(q.type) < 0) return false;
      if (opts.difficulty && opts.difficulty.length && opts.difficulty.indexOf(Number(q.difficulty)) < 0) return false;
      return true;
    });
  };

  E.weakTopics = function (topics, poolByTopic, progress, n) {
    return topics
      .filter(function (t) { return (poolByTopic[t.id] || []).length; })
      .map(function (t) { return { topic: t, m: E.mastery(poolByTopic[t.id], progress) }; })
      .sort(function (a, b) { return a.m - b.m; })
      .slice(0, n || 5);
  };

  E.buildSession = function (pool, progress, opts, day, rnd) {
    rnd = rnd || Math.random;
    var count = Math.max(1, Number(opts.count) || 10);
    var list = E.filterPool(pool, opts);
    var mode = opts.mode || "mixed";
    var pick;
    if (mode === "new") {
      pick = U.shuffle(list.filter(function (q) { return !progress[q.id]; }), rnd);
    } else if (mode === "due") {
      pick = list.filter(function (q) { return E.isDue(progress[q.id], day); })
        .sort(function (a, b) { var ea = progress[a.id], eb = progress[b.id]; return (ea.due < eb.due ? -1 : ea.due > eb.due ? 1 : ea.box - eb.box) || rnd() - 0.5; });
    } else if (mode === "mistakes") {
      pick = U.shuffle(list.filter(function (q) { var l = E.lastPct(progress[q.id]); return l != null && l < E.PASS; }), rnd);
    } else if (mode === "weak") {
      var byT = U.groupBy(list, function (q) { return q.topic; });
      var ts = Object.keys(byT).map(function (t) { return { t: t, m: E.mastery(byT[t], progress) }; })
        .sort(function (a, b) { return a.m - b.m; }).slice(0, 3);
      var cand = [];
      ts.forEach(function (x) { cand = cand.concat(byT[x.t]); });
      pick = U.shuffle(cand, rnd).sort(function (a, b) { return E.questionMastery(progress[a.id]) - E.questionMastery(progress[b.id]); });
      // innerhalb gleicher Beherrschung gemischt lassen
    } else {
      // gemischt: fällige zuerst, dann neue/schwache, dann Rest – leicht gewichtet gemischt
      var scored = list.map(function (q) {
        var e = progress[q.id];
        var s = rnd();
        if (E.isDue(e, day)) s += 3;
        else if (!e) s += 1.2;
        else s += 1 - E.questionMastery(e);
        return { q: q, s: s };
      }).sort(function (a, b) { return b.s - a.s; });
      pick = scored.map(function (x) { return x.q; });
    }
    return pick.slice(0, count);
  };

  /** „Heute lernen“: fällige + schwache + neue Aufgaben gemischt */
  E.buildToday = function (pool, progress, topics, day, count, rnd) {
    rnd = rnd || Math.random;
    count = Math.max(3, count || 15);
    var used = {};
    var out = [];
    function take(arr, n) {
      for (var i = 0; i < arr.length && n > 0; i++) {
        if (!used[arr[i].id]) { used[arr[i].id] = 1; out.push(arr[i]); n--; }
      }
    }
    var due = pool.filter(function (q) { return E.isDue(progress[q.id], day); });
    take(U.shuffle(due, rnd), Math.ceil(count * 0.4));
    var byT = U.groupBy(pool, function (q) { return q.topic; });
    var weak = E.weakTopics(topics, byT, progress, 4);
    var weakQs = [];
    weak.forEach(function (w) { weakQs = weakQs.concat(byT[w.topic.id].filter(function (q) { return E.questionMastery(progress[q.id]) < E.PASS; })); });
    take(U.shuffle(weakQs, rnd), Math.ceil(count * 0.3));
    var fresh = pool.filter(function (q) { return !progress[q.id]; });
    take(U.shuffle(fresh, rnd), count - out.length);
    if (out.length < count) take(E.buildSession(pool, progress, { count: count * 2, mode: "mixed" }, day, rnd), count - out.length);
    return U.shuffle(out, rnd);
  };

  /* ------------------------------------------------------------ Lernplan */

  /**
   * topics: [{id, part, title}], mastery: {topicId: 0..1}
   * → [{date, daysLeft, kind: "learn"|"review"|"sim", topics:[ids], parts:[], note}]
   */
  E.studyPlan = function (topics, mastery, today, examDate, perDay) {
    perDay = perDay || 3;
    var n = U.daysBetween(today, examDate);
    if (n <= 0) return [];
    var learnable = topics.filter(function (t) { return t.part !== "FG"; });
    var fg = topics.filter(function (t) { return t.part === "FG"; });
    var need = {};
    learnable.forEach(function (t) { need[t.id] = (1 - (mastery[t.id] || 0)) + 0.15; });
    fg.forEach(function (t) { need[t.id] = ((1 - (mastery[t.id] || 0)) + 0.1) * 0.45; });
    var all = learnable.concat(fg);
    var byId = {};
    all.forEach(function (t) { byId[t.id] = t; });
    var simParts = ["GA1", "GA2", "WISO"];
    var plan = [];
    for (var i = 0; i < n; i++) {
      var date = U.addDays(today, i);
      var left = n - i;
      if (left <= 3) {
        var part = simParts[3 - left] || "GA1";
        plan.push({ date: date, daysLeft: left, kind: "sim", topics: [], parts: [part],
          note: "Prüfungssimulation " + U.PART_SHORT[part] + " unter Echtbedingungen, danach Fehleranalyse" + (left === 1 ? " · Fachgespräch durchspielen, früh schlafen" : "") });
        continue;
      }
      if (i % 7 === 6) {
        var worst = E._worstPart(all, mastery);
        plan.push({ date: date, daysLeft: left, kind: "review", topics: [], parts: [worst],
          note: "Wiederholungstag: alle fälligen Karten + Fehlerheft, Zufallsprüfung " + U.PART_SHORT[worst] });
        continue;
      }
      var chosen = [], partsUsed = {};
      for (var k = 0; k < perDay; k++) {
        var best = null, bestScore = -1;
        all.forEach(function (t) {
          if (chosen.indexOf(t.id) >= 0) return;
          var s = need[t.id] * (partsUsed[t.part] ? 0.7 : 1);
          if (s > bestScore) { bestScore = s; best = t; }
        });
        if (!best) break;
        chosen.push(best.id);
        partsUsed[best.part] = 1;
        need[best.id] *= 0.55;
      }
      // vernachlässigte Themen gewinnen wieder an Gewicht
      all.forEach(function (t) { if (chosen.indexOf(t.id) < 0) need[t.id] *= 1.04; });
      plan.push({ date: date, daysLeft: left, kind: "learn", topics: chosen,
        parts: chosen.map(function (id) { return byId[id].part; }), note: "" });
    }
    return plan;
  };
  E._worstPart = function (topics, mastery) {
    var acc = {};
    topics.forEach(function (t) {
      if (t.part === "FG") return;
      acc[t.part] = acc[t.part] || { s: 0, n: 0 };
      acc[t.part].s += mastery[t.id] || 0; acc[t.part].n++;
    });
    var worst = "GA1", wm = 2;
    Object.keys(acc).forEach(function (p) { var m = acc[p].s / acc[p].n; if (m < wm) { wm = m; worst = p; } });
    return worst;
  };

  /* --------------------------------------------------------- Validierung */

  /** prüft eine Frage gegen das Schema; liefert Liste von Fehlermeldungen (leer = ok) */
  E.validateQuestion = function (q, topicIds) {
    var err = [];
    if (!q || typeof q !== "object") return ["kein Objekt"];
    if (U.TYPES.indexOf(q.type) < 0) err.push("ungültiger type " + q.type);
    if (!q.question || typeof q.question !== "string") err.push("question fehlt");
    if (!q.solution || typeof q.solution !== "string") err.push("solution fehlt");
    if (typeof q.points !== "number" || !(q.points > 0)) err.push("points ungültig");
    if ([1, 2, 3].indexOf(q.difficulty) < 0) err.push("difficulty ungültig");
    if (topicIds && topicIds.indexOf(q.topic) < 0) err.push("unbekanntes topic " + q.topic);
    if (q.type === "mc" || q.type === "multi") {
      if (!Array.isArray(q.options) || q.options.length < 2) err.push("options fehlen");
      if (!Array.isArray(q.correct) || !q.correct.length) err.push("correct fehlt");
      else if (q.correct.some(function (i) { return typeof i !== "number" || i < 0 || i >= (q.options || []).length || i % 1; })) err.push("correct-Index ungültig");
      if (q.type === "mc" && Array.isArray(q.correct) && q.correct.length !== 1) err.push("mc braucht genau 1 correct");
    }
    if (q.type === "numeric" && (typeof q.answer !== "number" || !isFinite(q.answer))) err.push("answer fehlt");
    if (q.type === "order" && (!Array.isArray(q.items) || q.items.length < 3)) err.push("items (>=3) fehlen");
    if ((q.type === "text" || q.type === "code") && (!Array.isArray(q.keywords) || q.keywords.length < 2)) err.push("keywords (>=2) fehlen");
    if (q.type === "sql" && (!q.sql || typeof q.sql.setup !== "string" || typeof q.sql.solution !== "string" || !q.sql.setup.trim() || !q.sql.solution.trim())) err.push("sql.setup/solution fehlt");
    return err;
  };

  /** KI-Ausgaben tolerant in Schemaform bringen (Zahlen als Strings etc.) */
  E.coerceQuestion = function (q) {
    if (!q || typeof q !== "object") return q;
    if (typeof q.points === "string") q.points = Number(q.points.replace(",", "."));
    if (typeof q.difficulty === "string") q.difficulty = Number(q.difficulty);
    if (typeof q.points === "number") q.points = Math.max(1, Math.round(q.points));
    if (q.type) q.type = String(q.type).toLowerCase().trim();
    if (q.type === "numeric" && typeof q.answer === "string") {
      var c = E.parseNumber(q.answer); q.answer = c.length ? c[0] : NaN;
    }
    if (q.type === "numeric" && typeof q.tolerance === "string") { var t = E.parseNumber(q.tolerance); q.tolerance = t.length ? t[0] : undefined; }
    if (Array.isArray(q.correct)) q.correct = q.correct.map(Number);
    if (typeof q.keywords === "string") q.keywords = q.keywords.split(/[,;]/).map(function (s) { return s.trim(); }).filter(Boolean);
    if (q.type === "sql" && q.sql && q.sql.ordered != null) q.sql.ordered = !!q.sql.ordered;
    return q;
  };

  /** Punkte einer Aufgabenliste auf Summe 100 skalieren (Kopien) */
  E.scaleTo100 = function (tasks) {
    var sum = U.sum(tasks, function (t) { return Number(t.points) || 0; });
    if (!sum || sum === 100) return tasks;
    var out = tasks.map(function (t) {
      var c = U.clone(t);
      c.points = Math.max(1, Math.round((t.points * 100) / sum));
      return c;
    });
    var diff = 100 - U.sum(out, function (t) { return t.points; });
    // Rest auf die größten Aufgaben verteilen
    var order = out.map(function (t, i) { return i; }).sort(function (a, b) { return out[b].points - out[a].points; });
    var k = 0;
    while (diff !== 0 && k < 1000) {
      var idx = order[k % order.length];
      if (diff > 0) { out[idx].points++; diff--; }
      else if (out[idx].points > 1) { out[idx].points--; diff++; }
      k++;
    }
    return out;
  };

  /**
   * Zufallsprüfung aus Pool + Generatoren.
   * GA1/GA2: 90 Min, Punktsumme ≈ 100. WISO: 60 Min, 25–30 Aufgaben, überwiegend mc/multi/numeric.
   * gens: [{id, part, topic, generate}] – liefert Fragen mit _gen-Kennung
   */
  E.buildRandomExam = function (part, pool, gens, rnd) {
    rnd = rnd || Math.random;
    var isW = part === "WISO";
    var cand = U.shuffle(pool.filter(function (q) { return q.part === part; }), rnd);
    var genTasks = [];
    var myGens = U.shuffle((gens || []).filter(function (g) { return g.part === part; }), rnd).slice(0, isW ? 4 : 2);
    myGens.forEach(function (g, i) {
      try {
        var q = g.generate(rnd);
        if (q && q.question) {
          q = U.clone(q);
          q.id = g.id + "-x" + Date.now().toString(36) + i;
          q.part = q.part || g.part; q.topic = q.topic || g.topic; q._gen = g.id;
          q.difficulty = q.difficulty || 2; q.points = q.points || 3;
          genTasks.push(q);
        }
      } catch (e) { /* defekter Generator wird ignoriert */ }
    });
    var tasks = [], sum = 0;
    var target = 100;
    if (isW) {
      var auto = cand.filter(function (q) { return ["mc", "multi", "numeric", "order"].indexOf(q.type) >= 0; });
      var other = cand.filter(function (q) { return ["mc", "multi", "numeric", "order"].indexOf(q.type) < 0; });
      var wanted = 25 + Math.floor(rnd() * 6); // 25..30
      var nOther = Math.min(other.length, Math.round(wanted * 0.12));
      var picked = genTasks.concat(other.slice(0, nOther));
      var topicCount = {};
      auto.forEach(function (q) {
        if (picked.length >= wanted) return;
        // Themen breit streuen
        if ((topicCount[q.topic] || 0) >= Math.ceil(wanted / 6)) return;
        topicCount[q.topic] = (topicCount[q.topic] || 0) + 1;
        picked.push(q);
      });
      auto.forEach(function (q) { if (picked.length < wanted && picked.indexOf(q) < 0) picked.push(q); });
      tasks = picked;
    } else {
      tasks = genTasks.slice();
      sum = U.sum(tasks, function (q) { return q.points; });
      var perTopic = {}, perType = {};
      for (var i = 0; i < cand.length && sum < target - 2; i++) {
        var q = cand[i];
        if ((perTopic[q.topic] || 0) >= 3) continue;
        if (q.type === "sql" && (perType.sql || 0) >= 4) continue; // SQL nicht überrepräsentieren
        if (sum + q.points > target + 5) continue;
        perTopic[q.topic] = (perTopic[q.topic] || 0) + 1;
        perType[q.type] = (perType[q.type] || 0) + 1;
        tasks.push(q); sum += q.points;
      }
      for (var j = 0; j < cand.length && sum < target - 2; j++) {
        if (tasks.indexOf(cand[j]) >= 0 || sum + cand[j].points > target + 5) continue;
        tasks.push(cand[j]); sum += cand[j].points;
      }
    }
    // nach Topic sortieren wirkt prüfungsnäher
    tasks = tasks.slice().sort(function (a, b) { return a.topic < b.topic ? -1 : a.topic > b.topic ? 1 : 0; });
    tasks = E.scaleTo100(tasks);
    return {
      id: "random-" + part.toLowerCase() + "-" + U.uid(),
      part: part,
      kind: "random",
      title: "Zufallsprüfung " + U.PART_SHORT[part],
      minutes: isW ? 60 : 90,
      scenario: isW
        ? "<p>Sie sind Auszubildende/r bzw. Umschüler/in zum Fachinformatiker für Anwendungsentwicklung. Beantworten Sie die folgenden Aufgaben zur Wirtschafts- und Sozialkunde.</p>"
        : "<p>Zufällig zusammengestellte Prüfung aus dem Aufgabenpool (" + U.PART_LABEL[part] + "). Die Aufgaben sind voneinander unabhängig.</p>",
      tasks: tasks,
    };
  };

  /** Gesamtergebnis einer Prüfung: Punkte auf 100 normiert, Note */
  E.examTotal = function (tasks, results) {
    var max = 0, pts = 0;
    tasks.forEach(function (t) {
      max += Number(t.points) || 0;
      var r = results[t.id];
      if (r) pts += r.points || 0;
    });
    var norm = max ? (pts * 100) / max : 0;
    var rounded = Math.round(norm);
    return { points: pts, max: max, normalized: rounded, grade: E.ihkGrade(rounded) };
  };
})(typeof window !== "undefined" ? window : globalThis);
