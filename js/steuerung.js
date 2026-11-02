/* AP2-Lerntool – Lernsteuerung (DOM-frei, in node testbar):
   Wissensbaum, Kalibrierung, Prüfungsmix (Interleaving), Zielzone, Phasenplan */
(function (root) {
  "use strict";
  var App = (root.App = root.App || {});
  var U = App.util;
  var E = App.engine;

  /* ============================================================ Kategorien */

  E.MIX_CATS = ["sql", "algo", "calc", "wiso", "ga1", "fg"];
  E.MIX_LABEL = { sql: "SQL", algo: "Pseudocode", calc: "Rechnen", wiso: "WiSo", ga1: "GA1-Theorie", fg: "Fachgespräch" };
  var CALC_TOPICS = ["wiso-kalkulation", "ga1-wirtschaftlichkeit", "ga2-zahlensysteme"];

  /** Aufgabenart für den Prüfungsmix: SQL, Pseudocode, Rechnen, WiSo, GA1-Theorie, FG */
  E.mixCategory = function (q) {
    var t = String(q.topic || "");
    if (q.type === "sql" || t.indexOf("ga2-sql") === 0) return "sql";
    if (q.type === "numeric" || CALC_TOPICS.indexOf(t) >= 0) return "calc";
    if (q.part === "GA2") return "algo";
    if (q.part === "WISO") return "wiso";
    if (q.part === "FG") return "fg";
    return "ga1";
  };

  /* ========================================================= Interleaving */

  /**
   * Ordnet eine nach Priorität sortierte Liste so um, dass sich die Aufgabenarten
   * abwechseln und nie zwei Aufgaben desselben Themas direkt aufeinander folgen.
   * Aufgaben, die sich nirgends regelkonform einfügen lassen, entfallen.
   */
  E.interleave = function (list, catFn) {
    catFn = catFn || E.mixCategory;
    var queues = {}, order = [], lastUse = {};
    list.forEach(function (q, i) {
      var c = catFn(q);
      if (!queues[c]) { queues[c] = []; order.push(c); lastUse[c] = -1; }
      queues[c].push({ q: q, i: i });
    });
    var out = [], left = [], lastCat = null, lastTopic = null;
    function remaining() { return order.filter(function (c) { return queues[c].length; }); }
    while (true) {
      var cats = remaining();
      if (!cats.length) break;
      // am längsten nicht genutzte Kategorie zuerst; bei Gleichstand die mit der wichtigsten Aufgabe
      cats.sort(function (a, b) { return lastUse[a] - lastUse[b] || queues[a][0].i - queues[b][0].i; });
      var placed = false;
      // erst eine andere Art versuchen, notfalls dieselbe Art (aber anderes Thema)
      var tries = cats.filter(function (c) { return c !== lastCat; }).concat(cats.indexOf(lastCat) >= 0 ? [lastCat] : []);
      for (var k = 0; k < tries.length && !placed; k++) {
        var c = tries[k];
        var qu = queues[c];
        for (var j = 0; j < qu.length; j++) {
          if (qu[j].q.topic !== lastTopic) {
            var x = qu.splice(j, 1)[0];
            out.push(x.q); lastUse[c] = out.length; lastCat = c; lastTopic = x.q.topic;
            placed = true;
            break;
          }
        }
      }
      if (!placed) {
        // nur noch Aufgaben des zuletzt gestellten Themas übrig → später einfügen
        cats.forEach(function (c) { left = left.concat(queues[c].map(function (x) { return x.q; })); queues[c] = []; });
      }
    }
    left.forEach(function (q) {
      for (var p = 0; p <= out.length; p++) {
        var a = out[p - 1], b = out[p];
        if ((!a || a.topic !== q.topic) && (!b || b.topic !== q.topic)) { out.splice(p, 0, q); return; }
      }
    });
    return out;
  };

  /** true, wenn keine zwei benachbarten Aufgaben dasselbe Thema haben */
  E.isInterleaved = function (list) {
    for (var i = 1; i < list.length; i++) if (list[i].topic === list[i - 1].topic) return false;
    return true;
  };

  /* ============================================================= Zielzone */

  E.ZONE = { low: 0.7, high: 0.85, window: 15, min: 4, start: 2 };

  /**
   * attempts: [{p, diff}] chronologisch (neueste zuletzt).
   * → {n, rate, level, target, dir: -1|0|1}
   * Trefferquote > 85 % → ein Level schwerer, < 70 % → ein Level leichter.
   */
  E.zoneTarget = function (attempts) {
    var z = E.ZONE;
    var rec = (attempts || []).filter(function (a) { return a && a.diff; }).slice(-z.window);
    if (rec.length < z.min) return { n: rec.length, rate: null, level: z.start, target: z.start, dir: 0 };
    var ok = rec.filter(function (a) { return a.p >= E.PASS; }).length;
    var rate = ok / rec.length;
    var level = U.clamp(Math.round(U.sum(rec, function (a) { return a.diff; }) / rec.length), 1, 3);
    var dir = rate > z.high ? 1 : rate < z.low ? -1 : 0;
    return { n: rec.length, rate: rate, level: level, target: U.clamp(level + dir, 1, 3), dir: dir };
  };

  /** Zielzone je Kategorie aus dem Versuchslog (Fallback: alle Versuche) */
  E.zoneByCategory = function (log) {
    var all = (log || []).map(function (x) { return { p: x.p, diff: x.diff, cat: x.cat }; });
    var out = { _all: E.zoneTarget(all) };
    E.MIX_CATS.forEach(function (c) {
      var z = E.zoneTarget(all.filter(function (a) { return a.cat === c; }));
      if (z.rate == null && out._all.rate != null) { z = Object.assign({}, out._all, { n: z.n, fallback: true }); }
      out[c] = z;
    });
    return out;
  };

  /** Gewicht einer Aufgabe relativ zum Ziel-Level */
  E.zoneWeight = function (diff, target) {
    var d = Math.abs((Number(diff) || 2) - (target || 2));
    return d === 0 ? 1 : d === 1 ? 0.4 : 0.05;
  };

  /* ========================================================= Prüfungsmix */

  /**
   * opts: {count, parts, zone: {cat: {target}}, focusIds: {id:1}, lockedIds: {id:1}}
   * Priorität: gefährliche Lücken > fällig > Fokus (wackelige Stämme) > neu > schwach,
   * gewichtet nach Zielzone; Arten werden reihum gezogen und anschließend verschränkt.
   */
  E.buildMix = function (pool, progress, opts, day, rnd) {
    opts = opts || {};
    rnd = rnd || Math.random;
    var count = Math.max(1, Number(opts.count) || 15);
    var parts = opts.parts && opts.parts.length ? opts.parts : ["GA1", "GA2", "WISO"];
    var zone = opts.zone || {};
    var focus = opts.focusIds || {}, locked = opts.lockedIds || {};
    var list = E.filterPool(pool, Object.assign({}, opts, { parts: parts })).filter(function (q) { return !q._gen; });
    var byCat = {};
    list.forEach(function (q) {
      var e = progress[q.id];
      var prio;
      if (e && e.danger) prio = 6;
      else if (E.isDue(e, day)) prio = 3 + (e.box === 1 ? 0.5 : 0);
      else if (focus[q.id]) prio = 2;
      else if (!e) prio = 1;
      else prio = 1 - E.questionMastery(e);
      var c = E.mixCategory(q);
      var zc = zone[c] || zone._all || {};
      var tgt = zc.target || E.ZONE.start;
      // Blätter mit wackeligem Stamm zurückstellen – außer die Zielzone verlangt in dieser Art „schwerer“
      if (locked[q.id] && prio < 3 && !(zc.dir > 0 || tgt === 3)) prio -= 1.5;
      var s = prio + 1.5 * E.zoneWeight(q.difficulty, tgt) + rnd() * 0.6;
      (byCat[c] = byCat[c] || []).push({ q: q, s: s, prio: prio });
    });
    var cats = Object.keys(byCat);
    cats.forEach(function (c) { byCat[c].sort(function (a, b) { return b.s - a.s; }); });
    // Reihum je Art die beste Aufgabe ziehen (wichtigste Art zuerst)
    cats.sort(function (a, b) { return byCat[b][0].s - byCat[a][0].s; });
    var picked = [];
    // gefährliche Lücken haben feste Plätze (bis zur Hälfte der Session)
    var urgent = [];
    cats.forEach(function (c) { urgent = urgent.concat(byCat[c].filter(function (x) { var e = progress[x.q.id]; return e && e.danger; })); });
    urgent.sort(function (a, b) { return b.s - a.s; }).slice(0, Math.ceil(count / 2)).forEach(function (x) {
      picked.push(x);
      var qu = byCat[E.mixCategory(x.q)];
      qu.splice(qu.indexOf(x), 1);
    });
    // innerhalb einer Art Themen streuen: bevorzugt ein Thema, das noch seltener dran war
    var perTopic = {};
    picked.forEach(function (x) { perTopic[x.q.topic] = (perTopic[x.q.topic] || 0) + 1; });
    function takeFrom(qu) {
      if (!qu.length) return null;
      var best = 0;
      for (var j = 1; j < qu.length && j < 40; j++) if (qu[j].prio >= qu[0].prio - 0.5 && (perTopic[qu[j].q.topic] || 0) < (perTopic[qu[best].q.topic] || 0)) best = j;
      // höhere Priorität (gefährlich/fällig/Fokus) schlägt die Streuung
      if (qu[best].prio < qu[0].prio - 0.5) best = 0;
      var x = qu.splice(best, 1)[0];
      perTopic[x.q.topic] = (perTopic[x.q.topic] || 0) + 1;
      return x;
    }
    var guard = 0;
    while (picked.length < count && guard++ < 10000) {
      var any = false;
      for (var i = 0; i < cats.length && picked.length < count; i++) {
        var x = takeFrom(byCat[cats[i]]);
        if (x) { picked.push(x); any = true; }
      }
      if (!any) break;
    }
    picked.sort(function (a, b) { return b.s - a.s; });
    return E.interleave(picked.map(function (x) { return x.q; }));
  };

  // Training: Modus "mix" = Prüfungsmix
  var origBuildSession = E.buildSession;
  E.buildSession = function (pool, progress, opts, day, rnd) {
    if (opts && opts.mode === "mix") {
      var ctx = E.mixContext ? E.mixContext() : {};
      return E.buildMix(pool, progress, Object.assign({}, ctx, opts, { zone: opts.zone || ctx.zone }), day, rnd);
    }
    return origBuildSession.apply(this, arguments);
  };

  // „Heute lernen“ = Prüfungsmix mit Fokus auf wackelige Stämme (Kontext liefert die UI)
  E.buildTodayClassic = E.buildToday;
  E.buildToday = function (pool, progress, topics, day, count, rnd) {
    var ctx = E.mixContext ? E.mixContext() : {};
    return E.buildMix(pool, progress, Object.assign({}, ctx, { count: Math.max(3, count || 15) }), day, rnd);
  };

  /* ========================================================== Kalibrierung */

  E.CONF = ["s", "u", "g"];
  E.CONF_LABEL = { s: "sicher", u: "unsicher", g: "geraten" };
  E.GUESS_FACTOR = 0.5; // „geraten, aber richtig“ zählt nur halb

  var origQM = E.questionMastery;
  E.questionMastery = function (entry) {
    if (!entry || !entry.attempts || !entry.attempts.some(function (a) { return a.c === "g"; })) return origQM(entry);
    return origQM({ attempts: entry.attempts.map(function (a) { return a.c === "g" ? { d: a.d, p: a.p * E.GUESS_FACTOR } : a; }) });
  };

  /**
   * Nach dem normalen Leitner-Update: Sicherheit einarbeiten.
   * prevBox = Box vor dem Versuch. Liefert "danger" | "guess" | "fixed" | null.
   */
  E.applyConfidence = function (entry, prevBox, conf, pct, day) {
    if (!entry || !entry.attempts || !entry.attempts.length) return null;
    var last = entry.attempts[entry.attempts.length - 1];
    if (conf) last.c = conf;
    var ok = pct >= E.PASS;
    if (conf === "s" && !ok) {
      entry.box = 1;
      entry.due = day; // sofort wieder fällig, mit Vorrang
      entry.danger = { since: entry.danger ? entry.danger.since : day, n: (entry.danger ? entry.danger.n : 0) + 1, last: day };
      return "danger";
    }
    if (conf === "g" && ok) {
      entry.box = Math.max(1, prevBox || 1); // kein Aufstieg
      entry.due = U.addDays(day, 1);
      return "guess";
    }
    if (ok && entry.danger && conf !== "g") {
      delete entry.danger;
      entry.dangerFixed = day;
      return "fixed";
    }
    return null;
  };

  /** Gefährliche Lücken: „sicher, aber falsch“ und noch nicht wieder sicher gelöst */
  E.dangerIds = function (progress) {
    return Object.keys(progress || {}).filter(function (id) { return progress[id] && progress[id].danger; })
      .sort(function (a, b) { return progress[a].danger.last < progress[b].danger.last ? 1 : -1; });
  };

  /**
   * log: [{c, p, topic, cat}] → Kalibrierungsübersicht.
   * over: Themen mit „sicher, aber falsch“, under: Themen, in denen Unsicheres/Geratenes meist stimmt.
   */
  E.calibStats = function (log, minN) {
    minN = minN || 3;
    var withC = (log || []).filter(function (x) { return x && x.c; });
    var by = {};
    E.CONF.forEach(function (c) { by[c] = { n: 0, ok: 0 }; });
    var topics = {};
    withC.forEach(function (x) {
      var ok = x.p >= E.PASS;
      by[x.c].n++; if (ok) by[x.c].ok++;
      var t = topics[x.topic] || (topics[x.topic] = { topic: x.topic, cat: x.cat, n: 0, sure: 0, sureWrong: 0, unsure: 0, unsureRight: 0 });
      t.n++;
      if (x.c === "s") { t.sure++; if (!ok) t.sureWrong++; }
      else { t.unsure++; if (ok) t.unsureRight++; }
    });
    var list = Object.keys(topics).map(function (k) { return topics[k]; });
    var over = list.filter(function (t) { return t.sureWrong > 0; })
      .map(function (t) { t.overRate = t.sureWrong / t.sure; return t; })
      .sort(function (a, b) { return b.sureWrong - a.sureWrong || b.overRate - a.overRate; });
    var under = list.filter(function (t) { return t.unsure >= minN && t.unsureRight / t.unsure >= 0.75; })
      .map(function (t) { t.underRate = t.unsureRight / t.unsure; return t; })
      .sort(function (a, b) { return b.underRate - a.underRate || b.unsure - a.unsure; });
    var sure = by.s, notSure = { n: by.u.n + by.g.n, ok: by.u.ok + by.g.ok };
    var verdict = null;
    if (sure.n >= 5 && sure.ok / sure.n < 0.8) verdict = "over";
    else if (notSure.n >= 5 && notSure.ok / notSure.n >= 0.75) verdict = "under";
    else if (sure.n + notSure.n >= 10) verdict = "ok";
    return { total: withC.length, by: by, over: over, under: under, verdict: verdict };
  };

  /* ========================================================= Wissensbaum */

  /** passt Frage q zum Filter eines Baumknotens? */
  E.treeMatch = function (node, q) {
    var s = (node && node.select) || {};
    if (s.ids && s.ids.indexOf(q.id) >= 0) return true;
    var crit = false;
    if (s.topics && s.topics.length) { crit = true; if (s.topics.indexOf(q.topic) < 0) return false; }
    if (s.difficulty && s.difficulty.length) { crit = true; if (s.difficulty.indexOf(Number(q.difficulty)) < 0) return false; }
    if (s.types && s.types.length) { crit = true; if (s.types.indexOf(q.type) < 0) return false; }
    if (s.tags && s.tags.length) { crit = true; if (!(q.tags || []).some(function (t) { return s.tags.indexOf(t) >= 0; })) return false; }
    if (s.steps && s.steps.length === 2) { crit = true; if (!(q.step >= s.steps[0] && q.step <= s.steps[1])) return false; }
    return crit;
  };

  /** Index: Knoten, Kinder, Fragen je Knoten, Stamm je Knoten */
  E.treeIndex = function (nodes, questions) {
    var ix = { nodes: [], byId: {}, children: {}, qs: {}, stem: {} };
    (nodes || []).forEach(function (n) {
      if (!n || !n.id || ix.byId[n.id]) return;
      ix.byId[n.id] = n; ix.nodes.push(n); ix.children[n.id] = [];
    });
    ix.nodes.forEach(function (n) {
      if (n.parent && ix.byId[n.parent]) ix.children[n.parent].push(n.id);
      ix.qs[n.id] = (questions || []).filter(function (q) { return !q._gen && E.treeMatch(n, q); });
    });
    ix.nodes.forEach(function (n) {
      var cur = n, guard = 0;
      while (cur && cur.kind !== "stamm" && cur.parent && guard++ < 5) cur = ix.byId[cur.parent];
      ix.stem[n.id] = cur && cur.kind === "stamm" ? cur.id : null;
    });
    return ix;
  };

  /**
   * Beherrschung und Status je Knoten.
   * status: "solid" (≥ 80 %), "shaky" (angefangen, < 80 %), "open" (unbearbeitet),
   * "locked" (Blatt, dessen Stamm noch nicht sitzt)
   */
  E.treeState = function (ix, progress) {
    var st = {};
    ix.nodes.forEach(function (n) {
      var qs = ix.qs[n.id];
      var attempted = qs.filter(function (q) { return progress[q.id]; }).length;
      st[n.id] = { m: E.mastery(qs, progress), n: qs.length, attempted: attempted };
    });
    ix.nodes.forEach(function (n) {
      var s = st[n.id], stem = ix.stem[n.id];
      var stemOk = !stem || st[stem].m >= E.PASS;
      s.stemOk = stemOk;
      if (s.m >= E.PASS) s.status = "solid";
      else if (n.kind === "blatt" && !stemOk) s.status = "locked";
      else s.status = s.attempted ? "shaky" : "open";
    });
    return st;
  };

  /**
   * Empfehlungen: zuerst wackelige Stämme, dann offene Stämme, dann Äste und
   * Blätter, deren Stamm sitzt. Blätter mit wackeligem Stamm werden nie empfohlen.
   */
  E.treeRecommend = function (ix, st, n) {
    var rank = function (node) {
      var s = st[node.id];
      if (!s.n || s.status === "solid" || s.status === "locked") return null;
      if (node.kind === "stamm") return s.status === "shaky" ? 0 : 1;
      if (!s.stemOk) return node.kind === "ast" ? 4 : null;
      return node.kind === "ast" ? 2 : 3;
    };
    return ix.nodes.map(function (node) { return { node: node, r: rank(node), m: st[node.id].m }; })
      .filter(function (x) { return x.r != null; })
      .sort(function (a, b) { return a.r - b.r || (a.r === 0 ? a.m - b.m : b.m - a.m); })
      .slice(0, n || 5)
      .map(function (x) { return x.node; });
  };

  /* ============================================================ Phasenplan */

  E.PHASES = [
    { n: 1, key: "gaps", name: "Lücken schließen", text: "Wackelige Stämme festigen, gefährliche Lücken beseitigen, Prüfungsmix in der Zielzone." },
    { n: 2, key: "sims", name: "Simulationen", text: "Jeden 2. Tag eine volle Prüfungssimulation, dazwischen Fehler aus der Simulation nacharbeiten." },
    { n: 3, key: "review", name: "Nur Wiederholung", text: "Keine neuen Inhalte mehr: fällige Karten, Fehlerheft, gefährliche Lücken." },
  ];

  /** Phasenlängen für n Lerntage vor der Prüfung */
  E.phaseLengths = function (n) {
    if (n <= 0) return [0, 0, 0];
    var p3 = U.clamp(Math.round(n * 0.15), 1, 4);
    if (n <= 2) return [0, 0, n];
    var p2 = U.clamp(Math.round(n * 0.4), 2, 14);
    if (p2 + p3 > n) p2 = n - p3;
    return [n - p2 - p3, p2, p3];
  };

  /**
   * opts: {start, examDate, exams: [{id, part, title}]}
   * Der Plan ist am Starttag verankert (feste Zuordnung der Simulationen).
   * → {start, examDate, lengths, days: [{date, daysLeft, phase, kind, exam, tasks:[{act, label, arg}] , note}]}
   */
  E.phasePlan = function (opts) {
    var start = opts.start, examDate = opts.examDate;
    var n = U.daysBetween(start, examDate);
    var plan = { start: start, examDate: examDate, lengths: E.phaseLengths(n), days: [] };
    if (n <= 0) return plan;
    var L = plan.lengths;
    var simParts = ["GA2", "GA1", "WISO"];
    var queue = {};
    simParts.forEach(function (p) { queue[p] = (opts.exams || []).filter(function (x) { return x.part === p; }); });
    var simNo = 0;
    for (var i = 0; i < n; i++) {
      var date = U.addDays(start, i), left = n - i;
      var phase = i < L[0] ? 1 : i < L[0] + L[1] ? 2 : 3;
      var d = { date: date, daysLeft: left, phase: phase, kind: "", exam: null, tasks: [], note: "" };
      if (phase === 1) {
        d.kind = "gaps";
        d.tasks = [
          { act: "stems", label: "Wackelige Stämme festigen" },
          { act: "danger", label: "Gefährliche Lücken" },
          { act: "mix", label: "Prüfungsmix (20)", arg: 20 },
        ];
        if ((i + 1) % 7 === 0) { d.kind = "gapsReview"; d.tasks.unshift({ act: "due", label: "Fällige Wiederholungen" }); d.note = "Wochenrückblick: alles Fällige abarbeiten."; }
      } else if (phase === 2) {
        var k = i - L[0];
        if (k % 2 === 0) {
          var part = simParts[simNo % simParts.length];
          simNo++;
          var x = queue[part].shift();
          d.kind = "sim";
          d.exam = x ? { id: x.id, part: part, title: x.title } : { random: part, part: part, title: "Zufallsprüfung " + (U.PART_SHORT[part] || part) };
          d.tasks = [{ act: "sim", label: "Simulation starten: " + d.exam.title, arg: d.exam }];
          d.note = "Volle Simulation unter Echtbedingungen, danach Fehleranalyse.";
        } else {
          d.kind = "simReview";
          d.tasks = [
            { act: "mistakes", label: "Fehler der Simulation nacharbeiten" },
            { act: "danger", label: "Gefährliche Lücken" },
            { act: "mix", label: "Prüfungsmix (15)", arg: 15 },
          ];
        }
      } else {
        d.kind = "review";
        d.tasks = [
          { act: "due", label: "Fällige Wiederholungen" },
          { act: "mistakes", label: "Fehlerheft" },
          { act: "danger", label: "Gefährliche Lücken" },
        ];
        if (left === 1) d.note = "Letzter Tag: nur leicht wiederholen, Fachgespräch einmal durchspielen, früh schlafen.";
      }
      plan.days.push(d);
    }
    return plan;
  };
})(typeof window !== "undefined" ? window : globalThis);
