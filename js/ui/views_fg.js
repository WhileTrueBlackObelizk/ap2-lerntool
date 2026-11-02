/* AP2-Lerntool – Fachgespräch- und Präsentationstraining (offline, ohne KI)
 * Routen: #/fg (Übersicht) · #/fg/projekt · #/fg/praesentation · #/fg/drill
 * Reine Logik liegt in App.fg (DOM-frei, in node testbar), die Ansichten in App.views.fg.
 */
(function (root) {
  "use strict";
  var App = (root.App = root.App || {});
  var U = App.util, E = App.engine;
  var V = (App.views = App.views || {});
  var F = (App.fg = {});

  /* ================================================================ Logik */

  F.CATS = {
    technik: "Technik", methodik: "Methodik & Architektur", qs: "Qualitätssicherung", wirtschaft: "Wirtschaftlichkeit",
    recht: "Recht & Lizenzen", reflexion: "Reflexion", projektmanagement: "Projektmanagement", datenschutz: "Datenschutz",
  };
  F.CAT_KEYS = Object.keys(F.CATS);
  F.SRC = { projekt: "projektbezogen", allgemein: "allgemein", pool: "Fragenpool" };
  F.PLACEHOLDERS = ["titel", "ausgang", "ziel", "tech", "tech.alt", "tech.grund", "entscheidung", "entscheidung.alt", "entscheidung.grund",
    "problem", "loesung", "vorgehen", "qs", "kosten", "nutzen", "amortisation", "soll", "ist"];
  F.DEFAULT_AGENDA = [
    { t: "Vorstellung & Projektumfeld", min: 1.5 },
    { t: "Ausgangslage & Ziel", min: 2 },
    { t: "Planung & Entscheidungen", min: 3 },
    { t: "Umsetzung", min: 4 },
    { t: "Qualitätssicherung", min: 1.5 },
    { t: "Wirtschaftlichkeit / Soll-Ist", min: 1.5 },
    { t: "Fazit & Ausblick", min: 1.5 },
  ];
  F.CRITERIA = [
    { k: "direkt", t: "Frage direkt beantwortet" },
    { k: "begruendung", t: "Begründung genannt („weil …“)" },
    { k: "alternativen", t: "Alternative(n) genannt bzw. abgewogen" },
    { k: "projekt", t: "Bezug zum eigenen Projekt hergestellt" },
    { k: "fachbegriffe", t: "Fachbegriffe korrekt verwendet" },
    { k: "zeit", t: "Zeit eingehalten" },
    { k: "struktur", t: "Ruhig und strukturiert (z. B. These – Begründung – Beispiel)" },
  ];
  F.SAMPLE = {
    title: "Webanwendung zur Raumbuchung für die Stadtwerke Musterstadt",
    situation: "Besprechungsräume werden per E-Mail und Excel-Liste gebucht; Doppelbuchungen und hoher Abstimmungsaufwand.",
    goal: "Browserbasierte Raumbuchung mit Kalenderansicht, Konfliktprüfung und Rollenrechten",
    techs: [
      { name: "Spring Boot", alt: "ASP.NET Core", why: "Betriebsstandard, vorhandenes Know-how" },
      { name: "PostgreSQL", alt: "MySQL", why: "bereits im Rechenzentrum betrieben" },
    ],
    decisions: [{ what: "Eigenentwicklung statt SaaS-Lösung", alt: "Kauf einer Standardsoftware", why: "Integration ins bestehende Active Directory" }],
    problems: [{ problem: "Zeitzonen-Fehler bei Serienterminen", solution: "durchgängig UTC speichern und erst in der Oberfläche umrechnen" }],
    econ: { costs: "", costNum: 4200, benefit: "", saveNum: 3600, amort: "" },
    qa: "Unit-Tests mit JUnit, Integrationstests, Abnahmetest mit dem Fachbereich, Code-Review",
    process: "Scrum (angepasst für ein Einzelprojekt)",
    time: { plan: 80, actual: 82, note: "" },
  };

  function str(x) { return x == null ? "" : String(x).replace(/\s+/g, " ").trim(); }
  function num(x) {
    if (x == null || x === "") return null;
    var n = typeof x === "number" ? x : Number(String(x).replace(/\s/g, "").replace(",", "."));
    return isFinite(n) ? n : null;
  }
  function clip(s, n) { s = str(s); return s.length > n ? s.slice(0, n - 1).replace(/\s+\S*$/, "") + " …" : s; }
  function list(a, mapper) { return (Array.isArray(a) ? a : []).filter(function (x) { return x && typeof x === "object"; }).map(mapper); }

  /** Projektdaten mit Standardwerten (liefert eine Kopie) */
  F.normProject = function (p) {
    p = p && typeof p === "object" ? p : {};
    var ec = p.econ && typeof p.econ === "object" ? p.econ : {};
    var tm = p.time && typeof p.time === "object" ? p.time : {};
    return {
      title: str(p.title), situation: String(p.situation || ""), goal: String(p.goal || ""),
      techs: list(p.techs, function (x) { return { name: str(x.name), alt: str(x.alt), why: str(x.why) }; }),
      decisions: list(p.decisions, function (x) { return { what: str(x.what), alt: str(x.alt), why: str(x.why) }; }),
      problems: list(p.problems, function (x) { return { problem: str(x.problem), solution: str(x.solution) }; }),
      econ: { costs: str(ec.costs), costNum: num(ec.costNum), benefit: str(ec.benefit), saveNum: num(ec.saveNum), amort: str(ec.amort) },
      qa: String(p.qa || ""), process: str(p.process),
      time: { plan: num(tm.plan), actual: num(tm.actual), note: String(tm.note || "") },
    };
  };

  /** Amortisationszeit in Monaten (Kosten / monatliche Einsparung) oder null */
  F.amortMonths = function (cost, savePerYear) {
    cost = num(cost); savePerYear = num(savePerYear);
    if (!(cost > 0) || !(savePerYear > 0)) return null;
    return Math.round((cost / (savePerYear / 12)) * 10) / 10;
  };

  F.AREAS = [
    { k: "grund", t: "Titel & Ausgangssituation", ok: function (p) { return !!(p.title && str(p.situation)); } },
    { k: "ziel", t: "Projektziel", ok: function (p) { return !!str(p.goal); } },
    { k: "tech", t: "Technologien", ok: function (p) { return p.techs.some(function (x) { return x.name; }); } },
    { k: "entsch", t: "Entscheidungen", ok: function (p) { return p.decisions.some(function (x) { return x.what; }); } },
    { k: "probl", t: "Probleme & Lösungen", ok: function (p) { return p.problems.some(function (x) { return x.problem; }); } },
    { k: "wirt", t: "Wirtschaftlichkeit", ok: function (p) { var e = p.econ; return !!(e.costs || e.costNum || e.benefit || e.saveNum || e.amort); } },
    { k: "qs", t: "Qualitätssicherung", ok: function (p) { return !!str(p.qa); } },
    { k: "vorg", t: "Vorgehen & Zeitplanung", ok: function (p) { return !!(p.process || p.time.plan); } },
  ];
  F.completeness = function (project) {
    var p = F.normProject(project);
    var areas = F.AREAS.map(function (a) { return { k: a.k, t: a.t, ok: a.ok(p) }; });
    return { areas: areas, done: areas.filter(function (a) { return a.ok; }).length, total: areas.length };
  };

  /* ---------------------------------------------------- Platzhalter */

  var GROUPS = {
    tech: { list: "techs", f: { tech: "name", "tech.alt": "alt", "tech.grund": "why" } },
    entscheidung: { list: "decisions", f: { entscheidung: "what", "entscheidung.alt": "alt", "entscheidung.grund": "why" } },
    problem: { list: "problems", f: { problem: "problem", loesung: "solution" } },
  };
  var KEY_GROUP = {};
  Object.keys(GROUPS).forEach(function (g) { Object.keys(GROUPS[g].f).forEach(function (k) { KEY_GROUP[k] = g; }); });

  F.scalars = function (p) {
    var e = p.econ, t = p.time;
    var am = F.amortMonths(e.costNum, e.saveNum);
    return {
      titel: p.title, ausgang: clip(p.situation, 160), ziel: clip(p.goal, 160), vorgehen: p.process, qs: clip(p.qa, 160),
      kosten: e.costs || (e.costNum > 0 ? U.fmtNum(e.costNum, 2) + " €" : ""),
      nutzen: e.benefit || (e.saveNum > 0 ? U.fmtNum(e.saveNum, 2) + " € pro Jahr" : ""),
      amortisation: e.amort || (am != null ? "ca. " + U.fmtNum(am, 1) + " Monaten" : ""),
      soll: t.plan > 0 ? U.fmtNum(t.plan, 1) : "", ist: t.actual > 0 ? U.fmtNum(t.actual, 1) : "",
    };
  };

  /** Platzhalter einer Vorlage: [{key, fb}] (fb = null ohne Fallback) */
  F.placeholders = function (text) {
    var re = /\{([a-z.]+)(?:\|([^}]*))?\}/g, m, out = [];
    while ((m = re.exec(String(text || "")))) out.push({ key: m[1], fb: m[2] === undefined ? null : m[2] });
    return out;
  };

  /**
   * Vorlage mit Projektdaten füllen. Liefert ein Drill-Item oder null, wenn ein Pflicht-Platzhalter (needs) fehlt.
   * Pro Gruppe (Technologie, Entscheidung, Problem) wird EIN Listeneintrag gewählt, damit {tech} und {tech.alt} zusammenpassen.
   */
  F.fillTemplate = function (tpl, project, rnd) {
    if (!tpl || !tpl.text) return null;
    rnd = rnd || Math.random;
    var p = F.normProject(project), sc = F.scalars(p);
    var needs = Array.isArray(tpl.needs) ? tpl.needs : [];
    var used = F.placeholders(tpl.text);
    var i;
    for (i = 0; i < needs.length; i++) if (!KEY_GROUP[needs[i]] && !str(sc[needs[i]])) return null;
    var chosen = {};
    var groups = {};
    needs.concat(used.map(function (u) { return u.key; })).forEach(function (k) { if (KEY_GROUP[k]) groups[KEY_GROUP[k]] = 1; });
    var gnames = Object.keys(groups);
    for (i = 0; i < gnames.length; i++) {
      var g = gnames[i], G = GROUPS[g];
      var req = needs.filter(function (k) { return KEY_GROUP[k] === g; }).map(function (k) { return G.f[k]; });
      var want = used.filter(function (u) { return KEY_GROUP[u.key] === g; }).map(function (u) { return G.f[u.key]; });
      var main = G.f[g === "problem" ? "problem" : g];
      var cands = p[G.list].filter(function (x) { return x[main] && req.every(function (f) { return x[f]; }); });
      if (req.length && !cands.length) return null;
      var best = cands.filter(function (x) { return want.every(function (f) { return x[f]; }); });
      var pool = best.length ? best : cands;
      chosen[g] = pool.length ? pool[Math.floor(rnd() * pool.length) % pool.length] : null;
    }
    var missing = false;
    var text = String(tpl.text).replace(/\{([a-z.]+)(?:\|([^}]*))?\}/g, function (_, key, fb) {
      var g = KEY_GROUP[key];
      var val = g ? (chosen[g] ? chosen[g][GROUPS[g].f[key]] : "") : sc[key];
      val = clip(val, 160);
      if (val) return val;
      if (fb !== undefined) return fb;
      missing = true;
      return "";
    });
    if (missing) return null;
    return { id: tpl.id, src: "projekt", cat: tpl.cat, text: text, hints: (tpl.hints || []).slice(), followUps: (tpl.followUps || []).slice() };
  };
  F.templateAvailable = function (tpl, project) { return !!F.fillTemplate(tpl, project, function () { return 0; }); };

  /* ---------------------------------------------------- Fragenquellen */

  F.guessCat = function (text) {
    var t = String(text || "").toLowerCase();
    if (/datenschutz|dsgvo|personenbezogen|mitarbeiterdaten/.test(t)) return "datenschutz";
    if (/eidesstattlich|persönliche.*erklärung/.test(t)) return "recht";
    if (/lizenz|open-source|open source|urheber/.test(t)) return "recht";
    if (/getestet|test|qualitätssicherung|qualität/.test(t)) return "qs";
    if (/wirtschaftlich|amortisation|kosten|standardsoftware|eigenentwicklung/.test(t)) return "wirtschaft";
    if (/vorgehensmodell|zeitplan|anforderungen|projekt bitte|zusammen|projektantrag|projektdokumentation|präsentation|ist-analyse|vorhaben|anhang/.test(t)) return "projektmanagement";
    if (/anders machen|gelernt|würden sie heute/.test(t)) return "reflexion";
    if (/clean code|entwurfsmuster|design pattern|uml|warten und weiterentwickeln|versionskontrolle/.test(t)) return "methodik";
    return "technik";
  };
  /** Prüferfrage aus einer Pool-Aufgabe (HTML) – zitierte Frage „…“ bevorzugen */
  F.poolText = function (html) {
    var s = U.stripHtml(html || "");
    var i = s.indexOf("„"), m = /„([^“]{10,})“/.exec(s);
    return m && i >= 0 && i <= 20 ? m[1] : s;
  };
  F.poolItem = function (q) {
    var text = F.poolText(q.question);
    return { id: q.id, src: "pool", cat: F.guessCat(text), text: text, hints: (q.keywords || []).slice(), solution: q.solution || "", followUps: [] };
  };
  F.generalItem = function (q) {
    return { id: q.id, src: "allgemein", cat: q.cat, text: q.text, hints: (q.hints || []).slice(), followUps: (q.followUps || []).slice() };
  };
  F.poolQuestions = function (questions) {
    return (questions || []).filter(function (q) { return q && q.part === "FG" && (q.type === "text" || q.type === "code") && q.question; });
  };

  /** alle Kandidaten je Quelle (gefiltert nach Kategorien) */
  F.sources = function (data, cats, rnd) {
    data = data || {};
    var catOk = function (it) { return !cats || !cats.length || cats.indexOf(it.cat) >= 0; };
    return {
      projekt: (data.templates || []).map(function (t) { return F.fillTemplate(t, data.project, rnd); }).filter(Boolean).filter(catOk),
      allgemein: (data.questions || []).map(F.generalItem).filter(catOk),
      pool: F.poolQuestions(data.pool).map(F.poolItem).filter(catOk),
    };
  };

  /**
   * Fragen für eine Drill-Runde: opts {count, sources:{projekt,allgemein,pool}, cats:[]},
   * data {templates, questions, pool (App.data.questions), project}. Quellen werden abwechselnd gemischt.
   */
  F.pickQuestions = function (opts, data, rnd) {
    rnd = rnd || Math.random;
    opts = opts || {};
    var count = Math.max(1, Number(opts.count) || 10);
    var on = opts.sources || { projekt: true, allgemein: true, pool: true };
    var src = F.sources(data, opts.cats, rnd);
    var lists = ["projekt", "allgemein", "pool"].filter(function (k) { return on[k] && src[k].length; }).map(function (k) { return U.shuffle(src[k], rnd); });
    var out = [], seen = {};
    while (out.length < count && lists.some(function (l) { return l.length; })) {
      for (var i = 0; i < lists.length && out.length < count; i++) {
        var it = lists[i].shift();
        if (it && !seen[it.id]) { seen[it.id] = 1; out.push(it); }
      }
    }
    return out;
  };

  /* ---------------------------------------------------- Bewertungshilfen */

  F.hintLabel = function (h) { return String(h || "").split("|")[0].trim(); };
  /** welche Stichpunkte kommen im Text vor? (E.normalizeText/E.matchAlt, Alternativen mit "|") */
  F.checkHints = function (hints, text) {
    var norm = E.normalizeText(text || "");
    var words = norm.split(" ").filter(Boolean);
    return (hints || []).map(function (h) {
      if (!norm) return false;
      return String(h).split("|").map(function (a) { return a.trim(); }).filter(Boolean).some(function (a) { return E.matchAlt(a, norm, words); });
    });
  };
  /** einfache Signale für allgemeine Kriterien aus dem Antworttext */
  F.genericAuto = function (text) {
    var n = " " + E.normalizeText(text || "") + " ";
    return {
      begruendung: /\s(weil|deshalb|daher|darum|denn|deswegen|dadurch|somit|aus diesem grund)\s/.test(n),
      alternativen: /\s(alternativ\w*|statt|anstatt|anstelle|gegenueber|verglichen|vergleich|abgewogen|abwaegung|stattdessen)\s/.test(n),
    };
  };

  /** Auswertung einer Drill-Runde */
  F.summarizeDrill = function (results) {
    results = results || [];
    var cats = {}, crit = {}, ok = 0, total = 0, secs = 0, over = 0;
    F.CRITERIA.forEach(function (c) { crit[c.k] = { ok: 0, n: 0 }; });
    results.forEach(function (r) {
      var c = cats[r.cat] || (cats[r.cat] = { ok: 0, total: 0, n: 0 });
      c.n++;
      Object.keys(r.crit || {}).forEach(function (k) {
        if (!crit[k]) return;
        crit[k].n++; c.total++; total++;
        if (r.crit[k]) { crit[k].ok++; c.ok++; ok++; }
      });
      (r.hints || []).forEach(function (h) { c.total++; total++; if (h) { c.ok++; ok++; } });
      secs += r.secs || 0;
      if (r.over) over++;
    });
    var weakest = Object.keys(crit).filter(function (k) { return crit[k].n; })
      .sort(function (a, b) { return crit[a].ok / crit[a].n - crit[b].ok / crit[b].n; })
      .filter(function (k) { return crit[k].ok < crit[k].n; }).slice(0, 3);
    return { n: results.length, quote: total ? ok / total : 0, avgSec: results.length ? secs / results.length : 0, over: over, cats: cats, crit: crit, weakest: weakest };
  };

  /* ---------------------------------------------------- Präsentation */

  F.agendaSum = function (ag) { return U.sum(ag || [], function (a) { return Number(a.min) || 0; }); };
  /** Gliederung proportional auf eine Gesamtdauer (Minuten) skalieren, Raster 0,5 min */
  F.scaleAgenda = function (ag, total) {
    var sum = F.agendaSum(ag);
    if (!sum || !ag.length) return ag;
    var out = ag.map(function (a) { return { t: a.t, min: Math.max(0.5, Math.round((a.min / sum) * total * 2) / 2) }; });
    var diff = total - F.agendaSum(out);
    var big = out.reduce(function (bi, a, i) { return a.min > out[bi].min ? i : bi; }, 0);
    out[big].min = Math.max(0.5, out[big].min + diff);
    return out;
  };
  /** Protokoll: geplante vs. tatsächliche Abschnittszeiten (Sekunden); marks = Startzeitpunkte der tatsächlichen Abschnitte */
  F.presProtocol = function (ag, marks, endSec) {
    return ag.map(function (a, i) {
      var act = i < marks.length ? (i + 1 < marks.length ? marks[i + 1] : endSec) - marks[i] : null;
      return { t: a.t, plan: Math.round((Number(a.min) || 0) * 60), act: act == null ? null : Math.round(act) };
    });
  };
  function fmtSec(s) { return s == null ? "–" : (s < 0 ? "−" : "") + U.fmtDuration(Math.abs(s)); }
  F.fmtSec = fmtSec;

  /* ============================================================ Audio */

  var audio = null;
  function ac() {
    try {
      if (!audio) {
        var C = root.AudioContext || root.webkitAudioContext;
        if (!C) return null;
        audio = new C();
      }
      if (audio.state === "suspended") audio.resume();
      return audio;
    } catch (e) { return null; }
  }
  function closeAudio() { if (audio) { try { audio.close(); } catch (e) { /* ignore */ } audio = null; } }
  /** synthetischer Glockenton: gedämpfte Sinus-Obertöne */
  function bell(ctx, t0, base, dur, gain) {
    var partials = [[1, 1], [2, 0.55], [2.76, 0.4], [5.4, 0.22], [8.93, 0.1]];
    var out = ctx.createGain();
    out.gain.value = gain;
    out.connect(ctx.destination);
    partials.forEach(function (pr, i) {
      var o = ctx.createOscillator(), g = ctx.createGain();
      o.type = "sine";
      o.frequency.value = base * pr[0];
      var d = dur * (1 - i * 0.13);
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(pr[1], t0 + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + d);
      o.connect(g); g.connect(out);
      o.start(t0); o.stop(t0 + d + 0.05);
    });
  }
  /** kind: "soft" (Abschnitt) | "double" (1 min vor Ende) | "full" (Ende) | "tick" (Antwortzeit vorbei) */
  F.gong = function (kind) {
    var ctx = ac();
    if (!ctx) return;
    var t = ctx.currentTime + 0.02;
    try {
      if (kind === "soft") bell(ctx, t, 660, 0.9, 0.12);
      else if (kind === "double") { bell(ctx, t, 523.25, 1.3, 0.22); bell(ctx, t + 0.45, 523.25, 1.6, 0.22); }
      else if (kind === "tick") bell(ctx, t, 880, 0.8, 0.2);
      else { bell(ctx, t, 196, 2.6, 0.42); bell(ctx, t, 392, 2.0, 0.08); }
    } catch (e) { /* ignore */ }
  };

  /* ============================================================ Ansichten */

  var UI, S, D;
  function proj() { var st = S.state; if (!st.fgProject || typeof st.fgProject !== "object") st.fgProject = {}; return st.fgProject; }
  function fgLog() { var st = S.state; if (!Array.isArray(st.fgLog)) st.fgLog = []; return st.fgLog; }
  function logPush(entry) {
    var l = fgLog();
    l.push(entry);
    if (l.length > 300) S.state.fgLog = l.slice(-300);
    S.save("fgLog");
  }
  function drillData() {
    var A = root.AP2 || {}, FD = A.fgDrill || {};
    return { templates: FD.templates || [], questions: FD.questions || [], pool: (D && D.questions) || [], project: proj() };
  }
  function fmtWhen(iso) { var d = String(iso || ""); return U.fmtDate(d.slice(0, 10)) + (d.length > 15 ? " " + d.slice(11, 16) : ""); }
  function nowIso() { var d = new Date(); return U.dateStr(d) + "T" + U.pad(d.getHours()) + ":" + U.pad(d.getMinutes()); }

  function head(active, sub) {
    var tabs = [["", "Übersicht"], ["projekt", "Projekt-Eckdaten"], ["praesentation", "Präsentation"], ["drill", "Prüfer-Drill"]];
    return '<div class="page-head"><h1>Fachgespräch</h1><p class="muted">' + sub + "</p></div>" +
      '<nav class="fg-tabs" aria-label="Fachgespräch-Bereiche">' + tabs.map(function (t) {
        var on = t[0] === active;
        return '<a href="#/fg' + (t[0] ? "/" + t[0] : "") + '" class="' + (on ? "active" : "") + '"' + (on ? ' aria-current="page"' : "") + ">" + t[1] + "</a>";
      }).join("") + "</nav>";
  }

  V.fg = function (c, params, query) {
    UI = App.ui; S = App.store; D = App.data;
    var sub = (params && params[0]) || "";
    // eigener Container: Event-Listener hängen nicht am wiederverwendeten #view
    var box = document.createElement("div");
    box.className = "fgview";
    c.appendChild(box);
    var cleanup;
    if (sub === "projekt") cleanup = viewProject(box);
    else if (sub === "praesentation") cleanup = viewPres(box);
    else if (sub === "drill") cleanup = viewDrill(box, query || {});
    else cleanup = viewOverview(box);
    return function () {
      try { if (cleanup) cleanup(); } finally { closeAudio(); }
    };
  };

  function logLine(e) {
    if (e.kind === "drill") {
      return "<li><span class='badge'>Drill</span> <strong>" + U.pct(e.quote) + "</strong> erfüllt · " + e.n + " Fragen · Ø " + fmtSec(e.avgSec) +
        (e.over ? " · <span class='warn'>" + e.over + "× Zeit überschritten</span>" : "") + " <span class='muted small'>" + fmtWhen(e.date) + "</span></li>";
    }
    var over = e.total - e.planned;
    return "<li><span class='badge'>Präsentation</span> <strong>" + fmtSec(e.total) + "</strong> von " + fmtSec(e.planned) +
      (over > 0 ? " · <span class='low-t'>+" + fmtSec(over) + " überzogen</span>" : over > -60 ? " · <span class='good-t'>im Rahmen</span>" : " · <span class='warn'>" + fmtSec(-over) + " zu kurz</span>") +
      " <span class='muted small'>" + fmtWhen(e.date) + "</span></li>";
  }

  /* -------------------------------------------------------- Übersicht */

  function viewOverview(c) {
    var comp = F.completeness(proj());
    var log = fgLog();
    var lastD = log.filter(function (e) { return e.kind === "drill"; }).slice(-1)[0];
    var lastP = log.filter(function (e) { return e.kind === "praes"; }).slice(-1)[0];
    var avail = F.sources(drillData(), null, function () { return 0; });
    var html = head("", "Präsentation üben und Prüferfragen trainieren – komplett offline, Selbstbewertung über Checklisten.");
    if (comp.done < comp.total) {
      html += '<div class="notice">' + (comp.done === 0
        ? "<strong>Noch keine Projektdaten.</strong> Mit den Eckdaten Ihres Abschlussprojekts erzeugt der Drill Prüferfragen mit konkretem Projektbezug (z. B. „Warum Spring Boot und nicht ASP.NET Core?“). "
        : "<strong>" + comp.done + " von " + comp.total + " Bereichen ausgefüllt.</strong> Fehlend: " + U.esc(comp.areas.filter(function (a) { return !a.ok; }).map(function (a) { return a.t; }).join(", ")) + ". ") +
        '<a href="#/fg/projekt">Projekt-Eckdaten ergänzen</a></div>';
    }
    html += '<div class="grid fg-cards">' +
      '<div class="card kpi-card"><div class="kl">Projekt-Eckdaten</div><div class="kv">' + comp.done + " <span class='muted'>/ " + comp.total + "</span></div>" + UI.bar(comp.done / comp.total, comp.done === comp.total ? "good" : "accent", "Vollständigkeit") +
      '<p class="muted small">Titel, Ziel, Technologien mit Alternativen, Entscheidungen, Probleme, Wirtschaftlichkeit, QS, Vorgehen.</p><a class="btn" href="#/fg/projekt">Bearbeiten</a></div>' +
      '<div class="card kpi-card"><div class="kl">Präsentation (15 Min.)</div><div class="kv">' + (lastP ? fmtSec(lastP.total) : "–") + "</div>" +
      '<p class="muted small">' + (lastP ? "Letzter Probelauf " + fmtWhen(lastP.date) : "Timer mit Gliederungsmarken, Gong und Soll-Ist-Protokoll.") + '</p><a class="btn" href="#/fg/praesentation">Timer öffnen</a></div>' +
      '<div class="card kpi-card"><div class="kl">Prüfer-Drill</div><div class="kv">' + (lastD ? U.pct(lastD.quote) : "–") + "</div>" +
      '<p class="muted small">' + avail.projekt.length + " projektbezogene · " + avail.allgemein.length + " allgemeine · " + avail.pool.length + ' Pool-Fragen verfügbar.</p><a class="btn primary" href="#/fg/drill">Drill starten</a></div>' +
      "</div>";
    html += '<section class="card"><h2>Letzte Ergebnisse</h2>' + (log.length
      ? '<ul class="fg-log">' + log.slice(-8).reverse().map(logLine).join("") + "</ul>"
      : '<p class="muted">Noch keine Läufe. Starten Sie mit einem Präsentations-Probelauf oder einem Drill mit 5 Fragen.</p>') + "</section>";
    html += '<section class="card info"><h2>So nutzen Sie das Training</h2><ol class="fg-steps">' +
      "<li><strong>Eckdaten eintragen</strong> – vor allem Technologien mit Alternativen und Begründungen: genau danach fragen Prüfer.</li>" +
      "<li><strong>Präsentation laut proben</strong> – mit dem Timer die 15 Minuten einhalten; mit <kbd>→</kbd> markieren Sie Ihre tatsächlichen Abschnittswechsel.</li>" +
      "<li><strong>Drill</strong> – Fragen laut oder schriftlich beantworten, danach ehrlich abhaken. Schwächste Kriterien gezielt üben.</li>" +
      '</ol><p class="muted small">Lernzettel: <a href="#/topic/fg-fachgespraech">Fachgespräch: typische Fragen &amp; Antwortstrategien</a> · <a href="#/topic/fg-projektarbeit">Projektarbeit, Dokumentation &amp; Präsentation</a></p></section>';
    c.innerHTML = html;
    return null;
  }

  /* ----------------------------------------------------- Projekt-Eckdaten */

  var LISTS = {
    techs: { title: "Technologien", add: "+ Technologie hinzufügen", fields: [["name", "Technologie", "z. B. Spring Boot"], ["alt", "Alternative(n)", "z. B. ASP.NET Core, Node.js"], ["why", "Begründung", "z. B. Betriebsstandard, Know-how im Team"]], empty: { name: "", alt: "", why: "" } },
    decisions: { title: "Entscheidungen", add: "+ Entscheidung hinzufügen", fields: [["what", "Entscheidung", "z. B. Eigenentwicklung statt Standardsoftware"], ["alt", "Alternative(n)", "z. B. SaaS-Lösung"], ["why", "Begründung", "z. B. Integration ins Active Directory"]], empty: { what: "", alt: "", why: "" } },
    problems: { title: "Probleme & Lösungen", add: "+ Problem hinzufügen", fields: [["problem", "Problem", "z. B. Performance bei großen Listen"], ["solution", "Lösung", "z. B. Paginierung und Index auf Datum"]], empty: { problem: "", solution: "" } },
  };

  function viewProject(c) {
    var timer = null, dirty = false;
    var raw = proj();
    var p = F.normProject(raw);
    ["techs", "decisions", "problems"].forEach(function (k) { if (!p[k].length) p[k].push(Object.assign({}, LISTS[k].empty)); });

    function inp(k, val, ph, type) {
      return '<input class="input" data-k="' + k + '" type="' + (type || "text") + '"' + (type === "number" ? ' inputmode="decimal" min="0" step="any"' : "") +
        ' value="' + U.esc(val == null ? "" : val) + '" placeholder="' + U.esc(ph || "") + '">';
    }
    function ta(k, val, ph, rows) { return '<textarea class="input" data-k="' + k + '" rows="' + (rows || 3) + '" placeholder="' + U.esc(ph || "") + '">' + U.esc(val || "") + "</textarea>"; }
    function listHtml(name) {
      var L = LISTS[name];
      return '<section class="card"><h2>' + L.title + "</h2>" + p[name].map(function (row, i) {
        return '<div class="fg-item" data-list="' + name + '" data-i="' + i + '">' + L.fields.map(function (f) {
          return "<label>" + f[1] + '<input class="input" data-f="' + f[0] + '" value="' + U.esc(row[f[0]] || "") + '" placeholder="' + U.esc(f[2]) + '"></label>';
        }).join("") + '<button type="button" class="btn ghost small fg-del" data-del="' + name + '" data-i="' + i + '" aria-label="Eintrag ' + (i + 1) + ' entfernen">entfernen</button></div>';
      }).join("") + '<button type="button" class="btn small" data-add="' + name + '">' + L.add + "</button></section>";
    }

    function render() {
      var e = p.econ, t = p.time;
      var html = head("projekt", "Die Eckdaten Ihres Abschlussprojekts – Grundlage für projektbezogene Prüferfragen. Wird automatisch gespeichert.");
      html += '<div class="fg-status card" aria-live="polite"><div class="row between wrap"><div class="grow"><strong class="fg-comp"></strong>' +
        '<div class="fg-compbar"></div></div><span class="muted small fg-saved"></span></div><div class="fg-areas small muted"></div></div>';
      html += '<section class="card"><h2>Grunddaten</h2>' +
        "<label>Projekttitel" + inp("title", p.title, "z. B. Webanwendung zur Raumbuchung") + "</label>" +
        "<label>Ausgangssituation (Ist-Zustand)" + ta("situation", p.situation, "Wie lief es vorher, was war das Problem?") + "</label>" +
        "<label>Projektziel (Soll)" + ta("goal", p.goal, "Was soll am Ende erreicht sein?") + "</label></section>";
      html += listHtml("techs") + listHtml("decisions") + listHtml("problems");
      html += '<section class="card"><h2>Wirtschaftlichkeit</h2><div class="fg-grid2">' +
        "<label>Projektkosten (Text)" + inp("econ.costs", e.costs, "z. B. 4.200 € (80 h à 45 € + Ressourcen)") + "</label>" +
        "<label>Projektkosten in € (optional)" + inp("econ.costNum", e.costNum, "4200", "number") + "</label>" +
        "<label>Einsparung / Nutzen (Text)" + inp("econ.benefit", e.benefit, "z. B. 15 Min. weniger Abstimmung je Buchung") + "</label>" +
        "<label>Einsparung in € pro Jahr (optional)" + inp("econ.saveNum", e.saveNum, "3600", "number") + "</label></div>" +
        "<label>Amortisation" + inp("econ.amort", e.amort, "z. B. 14 Monaten") + '</label><p class="muted small fg-amort"></p></section>';
      html += '<section class="card"><h2>Qualitätssicherung</h2><label>Tests, Reviews, Abnahme …' + ta("qa", p.qa, "z. B. Unit-Tests mit JUnit, Integrationstests, Code-Review, Abnahmetest mit dem Fachbereich") + "</label></section>";
      html += '<section class="card"><h2>Vorgehen &amp; Zeitplanung</h2>' +
        '<label>Vorgehensmodell<input class="input" data-k="process" list="fg-models" value="' + U.esc(p.process) + '" placeholder="z. B. Wasserfallmodell, Scrum, Kanban"></label>' +
        '<datalist id="fg-models"><option value="Wasserfallmodell"><option value="V-Modell"><option value="Scrum"><option value="Kanban"><option value="Inkrementelles Vorgehen"><option value="Wasserfallmodell mit iterativer Implementierung"></datalist>' +
        '<div class="fg-grid2"><label>Soll-Stunden (geplant)' + inp("time.plan", t.plan, "80", "number") + "</label>" +
        "<label>Ist-Stunden (tatsächlich)" + inp("time.actual", t.actual, "82", "number") + "</label></div>" +
        "<label>Notizen zum Soll-Ist-Vergleich" + ta("time.note", t.note, "z. B. Implementierung +4 h wegen Zeitzonen-Fehler, Doku −2 h", 2) + "</label></section>";
      html += '<div class="btnrow">' + (F.completeness(p).done === 0 ? '<button type="button" class="btn" data-act="sample">Beispielprojekt einsetzen</button>' : "") +
        '<button type="button" class="btn danger" data-act="clear">Alle Projektdaten leeren</button><a class="btn primary" href="#/fg/drill">Weiter zum Drill</a></div>';
      c.innerHTML = html;
      status();
    }

    function collect() {
      UI.$$("[data-k]", c).forEach(function (el) {
        var path = el.getAttribute("data-k").split("."), v = el.type === "number" ? num(el.value) : el.value;
        if (path.length === 2) p[path[0]][path[1]] = v; else p[path[0]] = v;
      });
      ["techs", "decisions", "problems"].forEach(function (name) {
        p[name] = UI.$$('.fg-item[data-list="' + name + '"]', c).map(function (row) {
          var o = {};
          UI.$$("[data-f]", row).forEach(function (el) { o[el.getAttribute("data-f")] = el.value; });
          return o;
        });
      });
    }
    function persist() {
      clearTimeout(timer); timer = null;
      if (!dirty) return;
      dirty = false;
      var keep = proj();
      var out = {};
      Object.keys(keep).forEach(function (k) { out[k] = keep[k]; }); // agenda, presMin, drillPrefs … behalten
      Object.assign(out, U.clone(p));
      ["techs", "decisions", "problems"].forEach(function (k) {
        out[k] = out[k].filter(function (x) { return Object.keys(x).some(function (f) { return str(x[f]); }); });
      });
      out.updated = new Date().toISOString();
      S.state.fgProject = out;
      S.save("fgProject");
      var sv = UI.$(".fg-saved", c);
      if (sv) sv.textContent = "✓ gespeichert " + new Date().toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });
    }
    function status() {
      var comp = F.completeness(p);
      var el = UI.$(".fg-comp", c);
      if (!el) return;
      el.textContent = comp.done + " von " + comp.total + " Bereichen ausgefüllt";
      UI.$(".fg-compbar", c).innerHTML = UI.bar(comp.done / comp.total, comp.done === comp.total ? "good" : "accent", "Vollständigkeit");
      UI.$(".fg-areas", c).innerHTML = comp.areas.map(function (a) { return '<span class="fg-area ' + (a.ok ? "ok" : "") + '">' + (a.ok ? "✓ " : "○ ") + U.esc(a.t) + "</span>"; }).join("");
      var am = F.amortMonths(p.econ.costNum, p.econ.saveNum);
      var ae = UI.$(".fg-amort", c);
      if (ae) ae.textContent = am != null ? "Berechnet: " + U.fmtNum(p.econ.costNum, 2) + " € ÷ (" + U.fmtNum(p.econ.saveNum, 2) + " € ÷ 12 Monate) ≈ " + U.fmtNum(am, 1) + " Monate" + (p.econ.amort ? "" : " (wird für Prüferfragen verwendet, solange das Textfeld leer ist)") : "Tipp: Kosten und jährliche Einsparung als Zahl eintragen, dann wird die Amortisationszeit berechnet.";
    }

    render();
    c.addEventListener("input", function (ev) {
      if (!ev.target.closest("[data-k], [data-f]")) return;
      collect(); dirty = true; status();
      var sv = UI.$(".fg-saved", c); if (sv) sv.textContent = "… speichert";
      clearTimeout(timer); timer = setTimeout(persist, 700);
    });
    c.addEventListener("click", function (ev) {
      var add = ev.target.closest("[data-add]"), del = ev.target.closest("[data-del]"), act = ev.target.closest("[data-act]");
      if (add) {
        var name = add.getAttribute("data-add");
        collect(); p[name].push(Object.assign({}, LISTS[name].empty)); dirty = true; persist(); render();
        var rows = UI.$$('.fg-item[data-list="' + name + '"]', c);
        var f = rows.length && UI.$("input", rows[rows.length - 1]);
        if (f) f.focus();
      } else if (del) {
        var n = del.getAttribute("data-del"), i = Number(del.getAttribute("data-i"));
        collect(); p[n].splice(i, 1);
        if (!p[n].length) p[n].push(Object.assign({}, LISTS[n].empty));
        dirty = true; persist(); render();
      } else if (act && act.getAttribute("data-act") === "sample") {
        p = F.normProject(U.clone(F.SAMPLE)); dirty = true; persist(); render();
        UI.toast("Beispielprojekt eingesetzt – passen Sie es an Ihr Projekt an.");
      } else if (act && act.getAttribute("data-act") === "clear") {
        if (!UI.confirm("Alle Projekt-Eckdaten leeren? (Präsentationsgliederung und Verlauf bleiben erhalten.)")) return;
        p = F.normProject({});
        ["techs", "decisions", "problems"].forEach(function (k) { p[k].push(Object.assign({}, LISTS[k].empty)); });
        dirty = true; persist(); render();
      }
    });
    return function () { persist(); };
  }

  /* ------------------------------------------------- Präsentationstimer */

  function viewPres(c) {
    var P = proj();
    var agenda = Array.isArray(P.agenda) && P.agenda.length ? U.clone(P.agenda) : U.clone(F.DEFAULT_AGENDA);
    var durMin = U.clamp(Number(P.presMin) || 15, 10, 20);
    var run, tick = null, wl = null;
    function resetRun() { run = { state: "idle", acc: 0, since: 0, marks: [0], fired: 0, warned: false, ended: false, protocol: null }; }
    resetRun();

    function elapsed() { return (run.acc + (run.state === "running" ? Date.now() - run.since : 0)) / 1000; }
    function bounds() { var s = 0; return agenda.map(function (a) { s += (Number(a.min) || 0) * 60; return s; }); }
    function plannedIdx(e) { var b = bounds(); for (var i = 0; i < b.length; i++) if (e < b[i]) return i; return agenda.length - 1; }
    function saveAgenda() { P = proj(); P.agenda = U.clone(agenda); P.presMin = durMin; S.save("fgProject"); }

    function wakeOn() {
      try { if (navigator.wakeLock && navigator.wakeLock.request) navigator.wakeLock.request("screen").then(function (s) { wl = s; }, function () { /* ignore */ }); } catch (e) { /* ignore */ }
    }
    function wakeOff() { if (wl) { try { wl.release(); } catch (e) { /* ignore */ } wl = null; } }
    function onVis() { if (document.visibilityState === "visible" && run.state === "running") wakeOn(); }
    document.addEventListener("visibilitychange", onVis);

    function render() {
      var html = head("praesentation", "Probelauf mit Countdown, Gliederungsmarken und Gong. Leertaste = Start/Pause, → = nächster Abschnitt.");
      var dur = durMin * 60, sum = F.agendaSum(agenda);
      var b = bounds();
      html += '<section class="card fg-timer" aria-label="Präsentationstimer">' +
        '<div class="fg-sec"><div><span class="kl">Aktueller Abschnitt</span><strong class="fg-cur"></strong></div><div class="fg-nextsec"><span class="kl">Danach</span><span class="fg-nxt"></span></div></div>' +
        '<div class="fg-time" role="timer" aria-live="off">' + fmtSec(dur) + "</div>" +
        '<div class="fg-sub muted"></div>' +
        '<div class="fg-prog" aria-hidden="true"><span class="fg-fill"></span>' +
        b.slice(0, -1).map(function (x) { return '<i class="fg-mark" style="left:' + Math.min(100, (x / dur) * 100) + '%"></i>'; }).join("") +
        '<span class="fg-actmarks"></span></div>' +
        '<div class="fg-seglabels" aria-hidden="true">' + agenda.map(function (a) { return '<span style="flex:' + (Number(a.min) || 0.1) + '" title="' + U.esc(a.t) + '">' + U.esc(a.t) + "</span>"; }).join("") + "</div>" +
        '<div class="fg-overmsg low-t hidden" role="alert"></div>' +
        '<div class="btnrow fg-ctl"><button type="button" class="btn primary big" data-act="toggle">Start <kbd>Leertaste</kbd></button>' +
        '<button type="button" class="btn big" data-act="next" disabled>Nächster Abschnitt <kbd>→</kbd></button>' +
        '<button type="button" class="btn" data-act="finish" disabled>Beenden &amp; Protokoll</button>' +
        '<button type="button" class="btn ghost" data-act="reset">Zurücksetzen</button></div>' +
        '<p class="muted small fg-wl"></p></section>';
      html += '<div class="fg-protocol"></div>';
      html += '<section class="card fg-agenda"><h2>Gliederung &amp; Dauer</h2>' +
        '<div class="row wrap"><label>Präsentationsdauer<select class="input" data-k="dur">' +
        [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(function (m) { return '<option value="' + m + '"' + (m === durMin ? " selected" : "") + ">" + m + " Minuten</option>"; }).join("") +
        '</select></label><button type="button" class="btn small" data-act="test">Gong testen</button></div>' +
        '<table class="list compact fg-agtable"><thead><tr><th>Abschnitt</th><th class="num">Minuten</th><th></th></tr></thead><tbody>' +
        agenda.map(function (a, i) {
          return '<tr><td><input class="input" data-ag="t" data-i="' + i + '" value="' + U.esc(a.t) + '" aria-label="Abschnitt ' + (i + 1) + '"></td>' +
            '<td class="num"><input class="input short" type="number" min="0.5" max="20" step="0.5" data-ag="min" data-i="' + i + '" value="' + U.esc(a.min) + '" aria-label="Minuten Abschnitt ' + (i + 1) + '"></td>' +
            '<td><button type="button" class="icon-btn" data-agdel="' + i + '" aria-label="Abschnitt entfernen" title="Entfernen"' + (agenda.length <= 1 ? " disabled" : "") + ">✕</button></td></tr>";
        }).join("") + '</tbody><tfoot><tr><td><strong>Summe</strong></td><td class="num"><strong class="' + (Math.abs(sum - durMin) > 0.01 ? "warn" : "good-t") + '">' + U.fmtNum(sum, 2) + " min</strong></td><td></td></tr></tfoot></table>" +
        (Math.abs(sum - durMin) > 0.01 ? '<p class="warn small">Die Summe weicht von der Präsentationsdauer (' + durMin + " min) ab.</p>" : "") +
        '<div class="btnrow"><button type="button" class="btn small" data-act="agadd">+ Abschnitt</button><button type="button" class="btn small" data-act="agfit">An Dauer anpassen</button><button type="button" class="btn small ghost" data-act="agdef">Standard wiederherstellen</button></div></section>';
      var runs = fgLog().filter(function (e) { return e.kind === "praes"; }).slice(-5).reverse();
      html += '<section class="card"><h2>Letzte Probeläufe</h2>' + (runs.length ? '<ul class="fg-log">' + runs.map(logLine).join("") + "</ul>" : '<p class="muted">Noch keine Probeläufe gespeichert.</p>') + "</section>";
      c.innerHTML = html;
      UI.$(".fg-wl", c).textContent = navigator.wakeLock ? "Der Bildschirm bleibt während des Laufs eingeschaltet (Wake Lock)." : "Hinweis: Dieser Browser kann das Ausschalten des Bildschirms nicht verhindern – ggf. Energiespar-Einstellung anpassen.";
      update();
      if (run.protocol) showProtocol();
    }

    function update() {
      var e = elapsed(), dur = durMin * 60, rem = dur - e;
      var box = UI.$(".fg-timer", c);
      if (!box) return;
      var cur = Math.min(run.marks.length - 1, agenda.length - 1);
      var pl = plannedIdx(e);
      UI.$(".fg-time", c).textContent = rem >= 0 ? fmtSec(Math.ceil(rem)) : "+" + fmtSec(Math.floor(-rem));
      UI.$(".fg-cur", c).textContent = (cur + 1) + ". " + agenda[cur].t;
      UI.$(".fg-nxt", c).textContent = cur + 1 < agenda.length ? agenda[cur + 1].t : "Ende – Übergang ins Fachgespräch";
      var secPlanEnd = bounds()[cur];
      var sub = "vergangen " + fmtSec(Math.floor(e)) + " von " + fmtSec(dur);
      if (run.state !== "idle") {
        sub += " · Abschnitt läuft seit " + fmtSec(Math.floor(e - run.marks[cur]));
        if (pl > cur) sub += " · laut Plan schon bei „" + agenda[pl].t + "“";
        else if (secPlanEnd - e > 0 && pl === cur) sub += " · noch " + fmtSec(Math.ceil(secPlanEnd - e)) + " laut Plan";
      }
      if (run.state === "paused") sub = "pausiert · " + sub;
      UI.$(".fg-sub", c).textContent = sub;
      UI.$(".fg-fill", c).style.width = Math.min(100, (e / dur) * 100) + "%";
      UI.$(".fg-actmarks", c).innerHTML = run.marks.slice(1).map(function (m) { return '<b style="left:' + Math.min(100, (m / dur) * 100) + '%"></b>'; }).join("");
      box.classList.toggle("warn", rem <= 60 && rem > 0);
      box.classList.toggle("over", rem <= 0);
      box.classList.toggle("running", run.state === "running");
      var om = UI.$(".fg-overmsg", c);
      om.classList.toggle("hidden", rem > 0);
      if (rem <= 0) om.textContent = "+" + fmtSec(Math.floor(-rem)) + " überzogen – in der Prüfung wird abgebrochen";
      var tg = UI.$('[data-act="toggle"]', c);
      tg.innerHTML = (run.state === "running" ? "Pause" : run.state === "paused" ? "Weiter" : run.state === "done" ? "Neuer Lauf" : "Start") + " <kbd>Leertaste</kbd>";
      var active = run.state === "running" || run.state === "paused";
      UI.$('[data-act="next"]', c).disabled = !active || run.marks.length >= agenda.length;
      UI.$('[data-act="finish"]', c).disabled = !active;
      UI.$$(".fg-agenda input, .fg-agenda select, .fg-agenda button:not([data-act='test'])", c).forEach(function (el) {
        if (el.hasAttribute("data-agdel") && agenda.length <= 1) { el.disabled = true; return; }
        el.disabled = active;
      });

      if (run.state !== "running") return;
      var b = bounds();
      while (run.fired < b.length - 1 && e >= b[run.fired]) { run.fired++; F.gong("soft"); }
      if (!run.warned && rem <= 60 && dur > 60) { run.warned = true; if (rem > 55) F.gong("double"); }
      if (!run.ended && rem <= 0) { run.ended = true; F.gong("full"); }
    }

    function start() {
      if (run.state === "done") { resetRun(); UI.$(".fg-protocol", c).innerHTML = ""; }
      ac(); // AudioContext mit Nutzergeste freischalten
      run.since = Date.now();
      if (run.state === "idle") { run.fired = 0; }
      run.state = "running";
      wakeOn();
      clearInterval(tick);
      tick = setInterval(update, 200);
      update();
    }
    function pause() {
      if (run.state !== "running") return;
      run.acc += Date.now() - run.since;
      run.state = "paused";
      clearInterval(tick); tick = null;
      wakeOff();
      update();
    }
    function toggle() { if (run.state === "running") pause(); else start(); }
    function next() {
      if (run.state !== "running" && run.state !== "paused") return;
      if (run.marks.length >= agenda.length) return;
      run.marks.push(elapsed());
      update();
    }
    function finish() {
      if (run.state !== "running" && run.state !== "paused") return;
      var e = elapsed();
      if (run.state === "running") run.acc += Date.now() - run.since;
      run.state = "done";
      clearInterval(tick); tick = null;
      wakeOff();
      run.protocol = F.presProtocol(agenda, run.marks, e);
      run.total = Math.round(e);
      if (e >= 10) {
        logPush({ date: nowIso(), kind: "praes", planned: durMin * 60, total: run.total, over: Math.max(0, run.total - durMin * 60),
          sections: run.protocol.map(function (r) { return { t: r.t, plan: r.plan, act: r.act }; }) });
      }
      render();
    }
    function showProtocol() {
      var rows = run.protocol, dur = durMin * 60, over = run.total - dur;
      var html = '<section class="card"><h2>Protokoll des Probelaufs</h2>' +
        '<p><strong>Gesamt: ' + fmtSec(run.total) + "</strong> von " + fmtSec(dur) + " – " +
        (over > 0 ? '<span class="low-t">' + fmtSec(over) + " überzogen. In der Prüfung würde der Ausschuss abbrechen.</span>"
          : over > -60 ? '<span class="good-t">Zeit eingehalten.</span>' : '<span class="warn">' + fmtSec(-over) + " zu kurz – nutzen Sie die Zeit für Begründungen.</span>") + "</p>" +
        '<div class="tablewrap"><table class="list compact"><thead><tr><th>Abschnitt</th><th class="num">geplant</th><th class="num">tatsächlich</th><th class="num">Differenz</th></tr></thead><tbody>' +
        rows.map(function (r) {
          var d = r.act == null ? null : r.act - r.plan;
          var cls = d == null ? "muted" : Math.abs(d) <= 20 ? "good-t" : d > 0 ? "low-t" : "warn";
          return "<tr><td>" + U.esc(r.t) + '</td><td class="num">' + fmtSec(r.plan) + '</td><td class="num">' + fmtSec(r.act) + '</td><td class="num ' + cls + '">' + (d == null ? "nicht erreicht" : (d > 0 ? "+" : d < 0 ? "−" : "±") + U.fmtDuration(Math.abs(d))) + "</td></tr>";
        }).join("") + "</tbody></table></div>" +
        (run.marks.length <= 1 ? '<p class="muted small">Tipp: Drücken Sie beim nächsten Lauf <kbd>→</kbd> bei jedem Abschnittswechsel, dann sehen Sie, wo Sie Zeit verlieren.</p>' : "") +
        "</section>";
      UI.$(".fg-protocol", c).innerHTML = html;
    }

    render();
    c.addEventListener("click", function (ev) {
      var a = ev.target.closest("[data-act]"), del = ev.target.closest("[data-agdel]");
      if (del) { agenda.splice(Number(del.getAttribute("data-agdel")), 1); saveAgenda(); render(); return; }
      if (!a) return;
      var act = a.getAttribute("data-act");
      if (act === "toggle") toggle();
      else if (act === "next") next();
      else if (act === "finish") finish();
      else if (act === "reset") { clearInterval(tick); tick = null; wakeOff(); resetRun(); render(); }
      else if (act === "test") { F.gong("soft"); setTimeout(function () { F.gong("double"); }, 1200); setTimeout(function () { F.gong("full"); }, 2900); }
      else if (act === "agadd") { agenda.push({ t: "Neuer Abschnitt", min: 1 }); saveAgenda(); render(); }
      else if (act === "agfit") { agenda = F.scaleAgenda(agenda, durMin); saveAgenda(); render(); }
      else if (act === "agdef") { agenda = U.clone(F.DEFAULT_AGENDA); if (durMin !== 15) agenda = F.scaleAgenda(agenda, durMin); saveAgenda(); render(); }
    });
    c.addEventListener("change", function (ev) {
      var t = ev.target;
      if (t.getAttribute("data-k") === "dur") { durMin = U.clamp(Number(t.value) || 15, 10, 20); saveAgenda(); render(); return; }
      var f = t.getAttribute("data-ag");
      if (!f) return;
      var i = Number(t.getAttribute("data-i"));
      if (!agenda[i]) return;
      if (f === "t") agenda[i].t = str(t.value) || "Abschnitt " + (i + 1);
      else agenda[i].min = U.clamp(Math.round((num(t.value) || 0.5) * 2) / 2, 0.5, 20);
      saveAgenda(); render();
    });
    App.keys.set({ space: toggle, right: next });
    return function () {
      clearInterval(tick); tick = null;
      wakeOff();
      document.removeEventListener("visibilitychange", onVis);
    };
  }

  /* ------------------------------------------------------- Prüfer-Drill */

  function speechCtor() { return root.SpeechRecognition || root.webkitSpeechRecognition || null; }

  function viewDrill(c) {
    var P = proj();
    var prefs = Object.assign({ count: 10, time: 90, mode: "laut", src: { projekt: true, allgemein: true, pool: true }, cats: [] }, P.drillPrefs || {});
    var ses = null, cur = null, tick = null, rec = null, listening = false, logged = false;

    function savePrefs() { P = proj(); P.drillPrefs = U.clone(prefs); S.save("fgProject"); }
    function stopTimer() { clearInterval(tick); tick = null; }
    function stopSpeech() {
      listening = false;
      if (rec) { try { rec.onend = null; rec.abort(); } catch (e) { /* ignore */ } rec = null; }
      var b = UI.$('[data-act="mic"]', c);
      if (b) { b.classList.remove("active"); b.textContent = "🎤 Spracheingabe starten"; }
    }

    /* ---------- Einstellungen */
    function renderSetup() {
      App.keys.set({ enter: function () { var b = UI.$('[data-act="start"]', c); if (b) b.click(); return true; } });
      var data = drillData();
      var all = F.sources(data, null, function () { return 0; });
      var filtered = F.sources(data, prefs.cats, function () { return 0; });
      var comp = F.completeness(data.project);
      function radio(name, vals, curv, fmt) {
        return '<div class="checks fg-seg" role="radiogroup">' + vals.map(function (v) {
          return '<label class="check"><input type="radio" name="' + name + '" value="' + v + '"' + (String(v) === String(curv) ? " checked" : "") + "> " + fmt(v) + "</label>";
        }).join("") + "</div>";
      }
      var html = head("drill", "Prüferfragen unter Zeitdruck beantworten – laut oder schriftlich – und anschließend selbst bewerten.");
      if (!all.projekt.length) {
        html += '<div class="notice">' + (comp.done ? "Mit Ihren bisherigen Projektdaten passt noch keine Vorlage. " : "Noch keine Projektdaten – der Drill läuft mit allgemeinen Fragen und dem Fragenpool. ") +
          'Für Fragen mit Projektbezug: <a href="#/fg/projekt">Projekt-Eckdaten ausfüllen</a> (v. a. Titel, Technologien mit Alternativen, Entscheidungen).</div>';
      }
      html += '<form class="card fg-setup" id="fgsetup"><h2>Einstellungen</h2>' +
        "<fieldset><legend>Anzahl Fragen</legend>" + radio("count", [5, 10, 15], prefs.count, function (v) { return v; }) + "</fieldset>" +
        "<fieldset><legend>Antwortzeit je Frage</legend>" + radio("time", [60, 90, 120], prefs.time, function (v) { return v + " s"; }) + "</fieldset>" +
        "<fieldset><legend>Antwortmodus</legend>" + radio("mode", ["laut", "schriftlich"], prefs.mode, function (v) { return v === "laut" ? "laut sprechen (nur Timer, optional Stichpunkte)" : "schriftlich (Textfeld, optional Spracheingabe)"; }) + "</fieldset>" +
        '<fieldset><legend>Quellen</legend><div class="checks">' + ["projekt", "allgemein", "pool"].map(function (k) {
          return '<label class="check"><input type="checkbox" name="src" value="' + k + '"' + (prefs.src[k] ? " checked" : "") + (all[k].length ? "" : " disabled") + "> " + F.SRC[k] +
            ' <span class="muted small">(' + filtered[k].length + (filtered[k].length !== all[k].length ? " von " + all[k].length : "") + ")</span></label>";
        }).join("") + "</div></fieldset>" +
        '<fieldset><legend>Kategorien <span class="muted small">(keine Auswahl = alle)</span></legend><div class="checks">' + F.CAT_KEYS.map(function (k) {
          return '<label class="check"><input type="checkbox" name="cat" value="' + k + '"' + (prefs.cats.indexOf(k) >= 0 ? " checked" : "") + "> " + F.CATS[k] + "</label>";
        }).join("") + "</div></fieldset>" +
        '<div class="btnrow"><button type="submit" class="btn primary big" data-act="start">Drill starten</button></div></form>';
      var runs = fgLog().filter(function (e) { return e.kind === "drill"; }).slice(-5).reverse();
      html += '<section class="card"><h2>Letzte Drills</h2>' + (runs.length ? '<ul class="fg-log">' + runs.map(logLine).join("") + "</ul>" : '<p class="muted">Noch keine Drills gespeichert.</p>') + "</section>";
      c.innerHTML = html;
      var form = UI.$("#fgsetup", c);
      form.addEventListener("change", function () {
        prefs.count = Number((UI.$('input[name="count"]:checked', form) || {}).value) || 10;
        prefs.time = Number((UI.$('input[name="time"]:checked', form) || {}).value) || 90;
        prefs.mode = (UI.$('input[name="mode"]:checked', form) || {}).value || "laut";
        ["projekt", "allgemein", "pool"].forEach(function (k) { var el = UI.$('input[name="src"][value="' + k + '"]', form); if (el && !el.disabled) prefs.src[k] = el.checked; });
        prefs.cats = UI.$$('input[name="cat"]:checked', form).map(function (el) { return el.value; });
        savePrefs();
        renderSetup();
      });
      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var srcOn = {};
        ["projekt", "allgemein", "pool"].forEach(function (k) { srcOn[k] = prefs.src[k] && all[k].length > 0; });
        var qs = F.pickQuestions({ count: prefs.count, sources: srcOn, cats: prefs.cats }, drillData());
        if (!qs.length) { UI.toast("Keine Fragen für diese Auswahl – bitte Quellen oder Kategorien erweitern.", "error"); return; }
        if (qs.length < prefs.count) UI.toast("Nur " + qs.length + " passende Fragen gefunden.");
        ac(); // Audio mit Nutzergeste freischalten
        ses = { queue: qs, idx: 0, results: [], mode: prefs.mode, limit: prefs.time };
        logged = false;
        renderQuestion();
      });
    }

    /* ---------- Frage */
    function ring(frac) {
      var r = 52, cf = 2 * Math.PI * r;
      return '<svg class="fg-ring" viewBox="0 0 120 120" aria-hidden="true"><circle class="bg" cx="60" cy="60" r="' + r + '"></circle>' +
        '<circle class="fg" cx="60" cy="60" r="' + r + '" stroke-dasharray="' + cf.toFixed(2) + '" stroke-dashoffset="' + (cf * (1 - frac)).toFixed(2) + '"></circle></svg>';
    }
    function badges(it) {
      return UI.badge(F.CATS[it.cat] || it.cat) + " " + UI.badge(F.SRC[it.src] || it.src, it.src === "projekt" ? "ok" : "") + (it.followUp ? " " + UI.badge("Nachfrage", "gen") : "");
    }
    function renderQuestion() {
      stopTimer(); stopSpeech();
      var it = ses.queue[ses.idx];
      cur = { item: it, t0: Date.now(), toned: false };
      var SR = speechCtor();
      var written = ses.mode === "schriftlich";
      var html = '<div class="fg-drill">' +
        '<div class="row between fg-qhead"><span class="muted"><strong>Frage ' + (ses.idx + 1) + " von " + ses.queue.length + "</strong></span>" +
        '<button type="button" class="btn ghost small" data-act="abort">Drill beenden</button></div>' +
        '<section class="card fg-qcard"><div class="fg-badges">' + badges(it) + "</div>" +
        '<div class="fg-qtext">' + U.esc(it.text) + "</div>" +
        '<div class="fg-clock"><div class="fg-ringwrap">' + ring(1) + '<div class="fg-ringtxt" role="timer">' + fmtSec(ses.limit) + "</div></div>" +
        '<p class="muted small fg-cluehint">' + (written ? "Antworten Sie schriftlich in ganzen Sätzen." : "Antworten Sie <strong>laut</strong>, als säße der Prüfungsausschuss vor Ihnen. Stichpunkte sind optional.") +
        "<br>Struktur: These → Begründung („weil …“) → Beispiel aus dem Projekt → ggf. Alternative.</p></div>" +
        '<label class="fg-answer">' + (written ? "Ihre Antwort" : "Stichpunkte (optional)") +
        '<textarea class="input" rows="' + (written ? 8 : 3) + '" placeholder="' + (written ? "Antwort hier eingeben …" : "z. B. These, 2 Gründe, Beispiel") + '"></textarea></label>';
      if (written) {
        if (SR) {
          html += '<div class="fg-speech"><button type="button" class="btn" data-act="mic">🎤 Spracheingabe starten</button> <span class="muted small fg-interim" aria-live="polite"></span>' +
            '<details class="small muted"><summary>Hinweis zur Spracheingabe</summary><p>Die Spracheingabe nutzt die Spracherkennung des Browsers. In Chrome werden die Audiodaten dafür an einen Google-Dienst übertragen – das ist reine Umwandlung von Sprache in Text, <strong>keine KI-Bewertung</strong> Ihrer Antwort. Sie funktioniert nur in einem sicheren Kontext (https oder localhost) und mit Mikrofonfreigabe; unter file:// kann sie blockiert sein.</p></details></div>';
        } else {
          html += '<p class="muted small fg-speech">Spracheingabe ist in diesem Browser nicht verfügbar (keine Web Speech API, z. B. Firefox). Antworten Sie schriftlich oder wählen Sie den Modus „laut“.</p>';
        }
      }
      html += '<div class="btnrow"><button type="button" class="btn primary big" data-act="done">Fertig <kbd>' + (written ? "Strg+Enter" : "Enter") + "</kbd></button></div></section></div>";
      c.innerHTML = html;
      var ta = UI.$(".fg-answer textarea", c);
      ta.addEventListener("keydown", function (ev) { if (ev.key === "Enter" && (ev.ctrlKey || ev.metaKey)) { ev.preventDefault(); ev.stopPropagation(); done(); } });
      if (written) ta.focus();
      App.keys.set({ enter: function () { done(); return true; }, esc: function () { return false; } });
      tick = setInterval(updateClock, 250);
    }
    function updateClock() {
      if (!cur) return;
      var e = (Date.now() - cur.t0) / 1000, left = ses.limit - e;
      var wrap = UI.$(".fg-ringwrap", c);
      if (!wrap) return;
      var r = 52, cf = 2 * Math.PI * r;
      var circ = UI.$(".fg-ring circle.fg", c);
      circ.setAttribute("stroke-dashoffset", (cf * (1 - Math.max(0, left) / ses.limit)).toFixed(2));
      UI.$(".fg-ringtxt", c).textContent = left >= 0 ? fmtSec(Math.ceil(left)) : "+" + fmtSec(Math.floor(-left));
      wrap.classList.toggle("warn", left <= 15 && left > 0);
      wrap.classList.toggle("over", left <= 0);
      if (left <= 0 && !cur.toned) { cur.toned = true; F.gong("tick"); }
    }
    function toggleMic() {
      var SR = speechCtor();
      if (!SR) return;
      if (listening) { stopSpeech(); return; }
      var ta = UI.$(".fg-answer textarea", c), interim = UI.$(".fg-interim", c), btn = UI.$('[data-act="mic"]', c);
      try {
        rec = new SR();
        rec.lang = "de-DE"; rec.continuous = true; rec.interimResults = true;
        rec.onresult = function (ev) {
          var fin = "", tmp = "";
          for (var i = ev.resultIndex; i < ev.results.length; i++) {
            var r = ev.results[i];
            if (r.isFinal) fin += r[0].transcript; else tmp += r[0].transcript;
          }
          if (fin.trim()) ta.value = (ta.value && !/\s$/.test(ta.value) ? ta.value + " " : ta.value) + fin.trim();
          if (interim) interim.textContent = tmp;
        };
        rec.onerror = function (ev) {
          var msg = { "not-allowed": "Mikrofon nicht freigegeben bzw. im unsicheren Kontext blockiert.", "service-not-allowed": "Spracherkennungsdienst nicht erlaubt (sicherer Kontext nötig).", "no-speech": "Keine Sprache erkannt.", network: "Spracherkennung braucht eine Internetverbindung.", "audio-capture": "Kein Mikrofon gefunden." }[ev.error];
          if (interim) interim.textContent = msg || "Spracheingabe-Fehler: " + ev.error;
          if (ev.error !== "no-speech") stopSpeech();
        };
        rec.onend = function () { if (listening && rec) { try { rec.start(); } catch (e) { stopSpeech(); } } };
        rec.start();
        listening = true;
        btn.classList.add("active");
        btn.textContent = "■ Spracheingabe stoppen";
        if (interim) interim.textContent = "hört zu …";
      } catch (e) {
        stopSpeech();
        if (interim) interim.textContent = "Spracheingabe konnte nicht gestartet werden: " + e.message;
      }
    }
    function done() {
      if (!cur) return;
      stopTimer(); stopSpeech();
      var secs = (Date.now() - cur.t0) / 1000;
      var ta = UI.$(".fg-answer textarea", c);
      cur.secs = secs;
      cur.answer = ta ? ta.value : "";
      renderAssess();
    }

    /* ---------- Selbstbewertung */
    function renderAssess() {
      var it = cur.item, over = cur.secs > ses.limit, text = cur.answer || "";
      var auto = F.genericAuto(text);
      var hitHints = F.checkHints(it.hints, text);
      var nHit = hitHints.filter(Boolean).length;
      var isLast = ses.idx >= ses.queue.length - 1;
      var html = '<div class="fg-drill"><div class="row between fg-qhead"><span class="muted"><strong>Selbstbewertung · Frage ' + (ses.idx + 1) + " von " + ses.queue.length + "</strong></span></div>" +
        '<section class="card"><div class="fg-badges">' + badges(it) + '</div><p class="fg-qsmall">' + U.esc(it.text) + "</p>" +
        '<p class="small">Antwortzeit: <strong class="' + (over ? "low-t" : "good-t") + '">' + fmtSec(Math.round(cur.secs)) + "</strong> von " + fmtSec(ses.limit) + (over ? " – überschritten" : "") + "</p>" +
        (text.trim() ? '<details class="fg-myanswer"' + (ses.mode === "schriftlich" ? " open" : "") + "><summary>Ihre " + (ses.mode === "schriftlich" ? "Antwort" : "Stichpunkte") + '</summary><div class="fg-answertext">' + U.formatAI(text) + "</div></details>" : "") +
        '<form id="fgassess"><fieldset><legend>Allgemeine Kriterien</legend><div class="fg-checklist">' + F.CRITERIA.map(function (cr) {
          var pre = cr.k === "zeit" ? !over : cr.k === "begruendung" ? auto.begruendung : cr.k === "alternativen" ? auto.alternativen : false;
          var autoNote = (cr.k === "begruendung" && auto.begruendung) || (cr.k === "alternativen" && auto.alternativen) ? ' <span class="muted small">(im Text erkannt)</span>' : cr.k === "zeit" ? ' <span class="muted small">(vom Timer)</span>' : "";
          return '<label class="check"><input type="checkbox" name="crit" value="' + cr.k + '"' + (pre ? " checked" : "") + "> " + U.esc(cr.t) + autoNote + "</label>";
        }).join("") + "</div></fieldset>" +
        (it.hints.length ? '<fieldset><legend>Stichpunkte zu dieser Frage' + (text.trim() ? ' <span class="muted small">(' + nHit + " von " + it.hints.length + " im Text gefunden)</span>" : "") + '</legend><div class="fg-checklist">' +
          it.hints.map(function (h, i) {
            var alts = String(h).split("|").map(function (a) { return a.trim(); }).filter(Boolean);
            return '<label class="check"><input type="checkbox" name="hint" value="' + i + '"' + (hitHints[i] ? " checked" : "") + "> " + U.esc(alts[0]) +
              (alts.length > 1 ? ' <span class="muted small">(auch: ' + U.esc(alts.slice(1).join(", ")) + ")</span>" : "") + "</label>";
          }).join("") + "</div></fieldset>" : "") +
        (it.solution ? '<details class="fg-solution"><summary>Musterlösung anzeigen</summary><div class="sol">' + U.rich(it.solution) + "</div></details>" : "") +
        '<div class="btnrow"><button type="submit" class="btn primary big" data-act="next">' + (isLast ? "Zur Auswertung" : "Nächste Frage") + " <kbd>Enter</kbd></button>" +
        (it.followUps && it.followUps.length ? '<button type="button" class="btn" data-act="follow">Nachfrage stellen</button>' : "") + "</div></form></section></div>";
      c.innerHTML = html;
      var form = UI.$("#fgassess", c);
      function record() {
        var crit = {};
        F.CRITERIA.forEach(function (cr) { crit[cr.k] = !!UI.$('input[name="crit"][value="' + cr.k + '"]', form).checked; });
        var hints = it.hints.map(function (_, i) { return !!UI.$('input[name="hint"][value="' + i + '"]', form).checked; });
        ses.results.push({ id: it.id, cat: it.cat, src: it.src, secs: Math.round(cur.secs), limit: ses.limit, over: over, crit: crit, hints: hints, followUp: !!it.followUp });
      }
      function advance() {
        cur = null;
        ses.idx++;
        if (ses.idx >= ses.queue.length) renderSummary(); else renderQuestion();
      }
      form.addEventListener("submit", function (ev) { ev.preventDefault(); record(); advance(); });
      var fb = UI.$('[data-act="follow"]', form);
      if (fb) fb.addEventListener("click", function () {
        record();
        var f = it.followUps[Math.floor(Math.random() * it.followUps.length)];
        ses.queue.splice(ses.idx + 1, 0, { id: it.id + "-nf", src: it.src, cat: it.cat, text: f, hints: [], followUps: [], followUp: true });
        advance();
      });
      App.keys.set({ enter: function () { form.requestSubmit ? form.requestSubmit() : UI.$('[data-act="next"]', form).click(); return true; } });
    }

    /* ---------- Auswertung */
    function renderSummary() {
      stopTimer(); stopSpeech();
      var sum = F.summarizeDrill(ses.results);
      if (!logged && sum.n) {
        logged = true;
        var cats = {};
        Object.keys(sum.cats).forEach(function (k) { cats[k] = { ok: sum.cats[k].ok, total: sum.cats[k].total }; });
        var crit = {};
        Object.keys(sum.crit).forEach(function (k) { crit[k] = { ok: sum.crit[k].ok, n: sum.crit[k].n }; });
        logPush({ date: nowIso(), kind: "drill", n: sum.n, quote: Math.round(sum.quote * 1000) / 1000, avgSec: Math.round(sum.avgSec), over: sum.over, limit: ses.limit, mode: ses.mode, cats: cats, crit: crit });
      }
      var critLabel = {};
      F.CRITERIA.forEach(function (cr) { critLabel[cr.k] = cr.t; });
      var html = head("drill", "Auswertung Ihrer Drill-Runde (wird im Verlauf gespeichert).");
      if (!sum.n) {
        html += '<div class="notice">Keine Frage bewertet – es wurde nichts gespeichert.</div><div class="btnrow"><button type="button" class="btn primary" data-act="again">Neue Runde</button></div>';
      } else {
        html += '<div class="grid kpi4">' +
          '<div class="card kpi-card"><div class="kl">Checkliste erfüllt</div><div class="kv">' + U.pct(sum.quote) + "</div>" + UI.bar(sum.quote, null, "Quote") + "</div>" +
          '<div class="card kpi-card"><div class="kl">Fragen</div><div class="kv">' + sum.n + "</div></div>" +
          '<div class="card kpi-card"><div class="kl">Ø Antwortzeit</div><div class="kv">' + fmtSec(Math.round(sum.avgSec)) + "</div><div class='muted small'>Limit " + fmtSec(ses.limit) + "</div></div>" +
          '<div class="card kpi-card"><div class="kl">Zeit überschritten</div><div class="kv ' + (sum.over ? "low-t" : "good-t") + '">' + sum.over + "×</div></div></div>";
        html += '<section class="card"><h2>Nach Kategorie</h2><table class="list compact"><tbody>' + Object.keys(sum.cats).map(function (k) {
          var cc = sum.cats[k], q = cc.total ? cc.ok / cc.total : 0;
          return "<tr><td>" + U.esc(F.CATS[k] || k) + ' <span class="muted small">(' + cc.n + (cc.n === 1 ? " Frage" : " Fragen") + ')</span></td><td style="width:45%">' + UI.bar(q, null, F.CATS[k]) + '</td><td class="num">' + U.pct(q) + "</td></tr>";
        }).join("") + "</tbody></table></section>";
        html += '<section class="card"><h2>Schwächste Kriterien</h2>' + (sum.weakest.length ? '<ol class="fg-weak">' + sum.weakest.map(function (k) {
          var cr = sum.crit[k];
          return "<li><strong>" + U.esc(critLabel[k]) + "</strong> – " + cr.ok + " von " + cr.n + ' erfüllt<br><span class="muted small">' + U.esc(TIPS[k] || "") + "</span></li>";
        }).join("") + "</ol>" : '<p class="good-t">Alle allgemeinen Kriterien erfüllt – stark! Erhöhen Sie die Schwierigkeit mit kürzerer Antwortzeit.</p>') + "</section>";
        html += '<div class="btnrow"><button type="button" class="btn primary" data-act="again">Neue Runde</button><a class="btn" href="#/fg">Zur Übersicht</a></div>';
      }
      c.innerHTML = html;
      App.keys.set({ enter: function () { UI.$('[data-act="again"]', c).click(); return true; } });
    }
    var TIPS = {
      direkt: "Beginnen Sie mit einem Satz, der die Frage unmittelbar beantwortet – Details danach.",
      begruendung: "Jede Aussage mit „weil …“ absichern: Prüfer bewerten das Warum, nicht nur das Was.",
      alternativen: "Nennen Sie mindestens eine Alternative und sagen Sie, warum sie hier schlechter passte.",
      projekt: "Schlagen Sie die Brücke: „In meinem Projekt habe ich das so gelöst: …“",
      fachbegriffe: "Lernzettel wiederholen und Begriffe präzise verwenden (z. B. Authentifizierung vs. Autorisierung).",
      zeit: "Kürzer antworten: 3–4 Sätze, dann Pause – der Prüfer fragt nach, wenn er mehr hören will.",
      struktur: "Schema These – Begründung – Beispiel üben; kurze Denkpause ist erlaubt.",
    };

    c.addEventListener("click", function (ev) {
      var a = ev.target.closest("[data-act]");
      if (!a) return;
      var act = a.getAttribute("data-act");
      if (act === "mic") toggleMic();
      else if (act === "done") done();
      else if (act === "again") { ses = null; renderSetup(); }
      else if (act === "abort") {
        stopTimer(); stopSpeech();
        if (ses && ses.results.length) { if (UI.confirm("Drill beenden und die bisher bewerteten " + ses.results.length + " Fragen auswerten?")) renderSummary(); else if (cur) tick = setInterval(updateClock, 250); }
        else { ses = null; cur = null; renderSetup(); }
      }
    });

    renderSetup();
    return function () { stopTimer(); stopSpeech(); };
  }
})(typeof window !== "undefined" ? window : globalThis);
