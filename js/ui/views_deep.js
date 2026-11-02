/* AP2-Lerntool – Paket „tieferes Verständnis“: Warum-Fragen, Vorab-Test, Feynman-Modus, Fehlertypen */
(function (root) {
  "use strict";
  var App = (root.App = root.App || {});
  var U = App.util, E = App.engine, UI = App.ui, S = App.store, D = App.data, ET = App.errtypes;
  var V = (App.views = App.views || {});
  var DP = (App.deep = {});
  var A = root.AP2 || {};

  /* ================================================== Inhalte (per ID) */

  DP.why = {};
  (A.why || []).forEach(function (w) { if (w && w.id && w.why) DP.why[w.id] = w; });
  DP.pretest = {};
  (A.pretest || []).forEach(function (p) { if (p && p.topic && Array.isArray(p.questions)) DP.pretest[p.topic] = p; });
  DP.feynman = (A.feynman || []).filter(function (f) { return f && f.id && f.term && Array.isArray(f.keypoints); });
  DP.feynmanById = {};
  DP.feynman.forEach(function (f) { DP.feynmanById[f.id] = f; });

  /* ======================================== Speicher (Hooks auf App.store) */

  var KEYS = { errLog: "arr", whyLog: "obj", pretest: "obj", feynman: "obj" };
  var LOG_MAX = 1500;
  function norm(kind, x) { return kind === "arr" ? (Array.isArray(x) ? x : []) : x && typeof x === "object" && !Array.isArray(x) ? x : {}; }
  Object.keys(KEYS).forEach(function (k) { if (S.KEYS.indexOf(k) < 0) S.KEYS.push(k); });

  var origLoad = S.load;
  S.load = function () {
    var st = origLoad.apply(S, arguments);
    Object.keys(KEYS).forEach(function (k) { st[k] = norm(KEYS[k], S.read(k, null)); });
    return st;
  };
  var origExport = S.exportData;
  S.exportData = function () {
    var out = origExport.apply(S, arguments);
    Object.keys(KEYS).forEach(function (k) { out.data[k] = S.state[k]; });
    return out;
  };
  var origImport = S.importData;
  S.importData = function (json) {
    origImport.apply(S, arguments);
    var d = json.data;
    Object.keys(KEYS).forEach(function (k) { S.state[k] = norm(KEYS[k], d[k]); S.save(k); });
  };
  var origReset = S.resetProgress;
  S.resetProgress = function () {
    origReset.apply(S, arguments);
    Object.keys(KEYS).forEach(function (k) { S.state[k] = norm(KEYS[k], null); S.save(k); });
  };

  function setting(name, def) { var v = S.state.settings[name]; return v == null || v === "" ? def : v; }

  /* ============================================ Fehlertypen erfassen */

  // Zusatzinfos zur Antwort (z. B. HAVING/WHERE vertauscht, Reihenfolge) ans Ergebnis hängen
  var origGrade = App.grader.grade;
  App.grader.grade = async function (q, ans) {
    var r = await origGrade.apply(App.grader, arguments);
    try { var h = ET.hints(q, ans); if (r && h.length) r.errHints = h; } catch (e) { /* ignore */ }
    return r;
  };

  var origRecord = S.recordAttempt;
  S.recordAttempt = function (q, result) {
    origRecord.apply(S, arguments);
    try {
      var c = ET.classify(q, result);
      if (!c) return;
      var log = S.state.errLog || (S.state.errLog = []);
      var e = { d: U.today(), p: q.part, t: q.topic, k: c.tags, x: c.detail || "" };
      if (q._gen) e.g = q._gen; else e.id = q.id;
      log.push(e);
      if (log.length > LOG_MAX) S.state.errLog = log.slice(-LOG_MAX);
      S.save("errLog");
    } catch (err) { console.warn("Fehlertyp nicht erfasst:", err); }
  };

  /* ======================================= 1. Warum-Schritt (Selbsterklärung) */

  /** Kernpunkt grob vorprüfen: signifikante Wörter (≥ 5 Zeichen, gestemmt) im eigenen Text? */
  function sigWords(s) {
    return E.normalizeText(U.stripHtml(s)).split(" ").filter(function (w) { return w.length >= 5; }).map(E.stem);
  }
  DP.keyHit = function (kp, text) {
    var t = E.normalizeText(text || "");
    if (!t) return false;
    if (kp && kp.kw) return String(kp.kw).toLowerCase().split("|").some(function (a) { a = a.trim(); return a && t.indexOf(E.normalizeText(a)) >= 0; });
    var ws = sigWords(typeof kp === "string" ? kp : kp.text), have = sigWords(t);
    if (!ws.length) return false;
    var hit = ws.filter(function (w) { return have.some(function (h) { return h.indexOf(w) === 0 || w.indexOf(h) === 0; }); }).length;
    return hit / ws.length >= 0.5;
  };

  DP.whyEligible = function (card) {
    var r = card.result, w = DP.why[card.q.id];
    if (!w || card.mode !== "train" || !r || !r.final) return false;
    var mode = setting("whyMode", "errors");
    if (mode === "off") return false;
    if (mode === "errors" && r.pct >= E.PASS) return false;
    return true;
  };

  var origRenderResult = App.QCard.prototype.renderResult;
  App.QCard.prototype.renderResult = function () {
    origRenderResult.apply(this, arguments);
    try { if (DP.whyEligible(this)) renderWhy(this); } catch (e) { console.warn(e); }
  };

  function renderWhy(card) {
    var w = DP.why[card.q.id];
    var st = card._why || (card._why = { phase: "write", text: "", checks: null });
    var res = UI.$(".qresult .result", card.el);
    if (!res) return;
    var box = UI.$(".whystep", res);
    if (!box) {
      box = document.createElement("section");
      box.className = "whystep";
      box.setAttribute("aria-label", "Warum ist das so?");
      var head = UI.$(".rhead", res);
      if (head && head.nextSibling) res.insertBefore(box, head.nextSibling); else res.appendChild(box);
    }
    var kps = w.keypoints || [];
    if (st.phase === "skipped") {
      box.className = "whystep collapsed";
      box.innerHTML = '<span class="muted small">Warum-Schritt übersprungen.</span> <button type="button" class="btn small ghost" data-w="reopen">Doch begründen</button>';
    } else if (st.phase === "write") {
      box.className = "whystep";
      box.innerHTML = '<div class="why-head"><strong>Warum ist das so?</strong> <span class="muted small">Erkläre in 1–2 Sätzen, warum die richtige Lösung stimmt – danach vergleichst du mit der Musterbegründung.</span></div>' +
        '<textarea class="input" rows="2" aria-label="Deine Begründung" placeholder="Weil …"></textarea>' +
        '<div class="btnrow"><button type="button" class="btn small primary" data-w="check">Mit Musterbegründung vergleichen <kbd>Strg+Enter</kbd></button>' +
        '<button type="button" class="btn small ghost" data-w="skip">Überspringen</button></div>';
      var ta = UI.$("textarea", box);
      ta.value = st.text;
      ta.addEventListener("input", function () { st.text = ta.value; });
      ta.addEventListener("keydown", function (ev) {
        if (ev.key === "Enter" && (ev.ctrlKey || ev.metaKey)) { ev.preventDefault(); ev.stopPropagation(); toCheck(); }
      });
    } else {
      if (!st.checks) st.checks = kps.map(function (k) { return DP.keyHit(k, st.text); });
      var n = st.checks.filter(Boolean).length;
      box.className = "whystep" + (st.phase === "done" ? " done" : "");
      box.innerHTML = '<div class="why-head"><strong>Warum ist das so?</strong>' + (st.phase === "done" ? ' <span class="badge ' + (n / kps.length >= 0.67 ? "ok" : "mid") + '">' + n + " / " + kps.length + " Kernpunkte</span>" : "") + "</div>" +
        (st.text.trim() ? '<div class="why-own"><div class="sub">Deine Begründung</div><p>' + U.esc(st.text) + "</p></div>" : '<p class="muted small">(keine eigene Begründung geschrieben)</p>') +
        '<div class="why-model"><div class="sub">Musterbegründung</div><p>' + U.rich(w.why) + "</p></div>" +
        '<div class="sub">Hake ab, welche Kernpunkte deine Begründung (sinngemäß) enthält:</div><div class="checks why-checks">' +
        kps.map(function (k, i) {
          return '<label class="check"><input type="checkbox" data-wk="' + i + '"' + (st.checks[i] ? " checked" : "") + (st.phase === "done" ? " disabled" : "") + "> " + U.esc(typeof k === "string" ? k : k.text) + "</label>";
        }).join("") + "</div>" +
        (st.phase === "check" ? '<div class="btnrow"><button type="button" class="btn small primary" data-w="done">Fertig</button><span class="muted small">Vorauswahl nach Stichworten – bitte selbst korrigieren.</span></div>' : "");
      UI.$$("[data-wk]", box).forEach(function (cb) {
        cb.addEventListener("change", function () { st.checks[Number(cb.getAttribute("data-wk"))] = cb.checked; });
      });
    }
    function toCheck() { st.phase = "check"; renderWhy(card); var b = UI.$('[data-w="done"]', box); if (b) try { b.focus({ preventScroll: true }); } catch (e) { /* ignore */ } }
    var b;
    if ((b = UI.$('[data-w="check"]', box))) b.addEventListener("click", toCheck);
    if ((b = UI.$('[data-w="skip"]', box))) b.addEventListener("click", function () { st.phase = "skipped"; renderWhy(card); });
    if ((b = UI.$('[data-w="reopen"]', box))) b.addEventListener("click", function () { st.phase = "write"; renderWhy(card); var t = UI.$("textarea", box); if (t) t.focus(); });
    if ((b = UI.$('[data-w="done"]', box))) b.addEventListener("click", function () {
      st.phase = "done";
      var got = st.checks.filter(Boolean).length;
      var wl = S.state.whyLog || (S.state.whyLog = {});
      var e = wl[card.q.id] || (wl[card.q.id] = { n: 0, best: 0 });
      e.n++; e.last = U.today(); e.score = Math.round((got / Math.max(1, kps.length)) * 100) / 100; e.best = Math.max(e.best || 0, e.score);
      S.save("whyLog");
      renderWhy(card);
    });
  }

  /* ======================================================= 2. Vorab-Test */

  var origTopic = V.topic;
  V.topic = function (c, params, query) {
    var id = params[0], pt = DP.pretest[id];
    query = query || {};
    var mode = setting("pretestMode", "first");
    var done = (S.state.pretest || {})[id];
    var want = pt && D.topicById[id] && query.pretest !== "0" && (query.pretest === "1" || (mode === "always") || (mode === "first" && !done));
    if (!want) {
      var r = origTopic.apply(this, arguments);
      addPretestButton(c, id);
      return r;
    }
    return renderPretest(c, params, pt);
  };

  function addPretestButton(c, id) {
    if (!DP.pretest[id]) return;
    var row = UI.$(".card .btnrow", c);
    if (!row) return;
    var a = UI.h('<a class="btn ghost" href="#/topic/' + encodeURIComponent(id) + '?pretest=1" title="3 Ratefragen vor dem Lesen – zählt nicht in die Beherrschung">Vorab-Test</a>');
    row.appendChild(a);
  }

  function renderPretest(c, params, pt) {
    var id = params[0], t = D.topicById[id];
    var answers = pt.questions.map(function () { return null; });
    var html = '<div class="page-head"><div class="crumbs"><a href="#/topics">Themen</a> › ' + U.esc(U.PART_SHORT[t.part]) + "</div><h1>" + U.esc(t.title) + " " + UI.partBadge(t.part) + "</h1></div>" +
      '<section class="card pretest"><h2>Vorab-Test: erst raten, dann lesen</h2>' +
      '<p class="muted">Drei kurze Fragen, bevor du den Lernzettel liest. Rate ruhig – wer vorher rät, merkt sich die Antworten im Text besser. ' +
      "Das Ergebnis zählt <strong>nicht</strong> in deine Beherrschung. Im Lernzettel sind die Stellen mit den Antworten danach markiert.</p>" +
      pt.questions.map(function (x, i) {
        return '<fieldset class="ptq" data-i="' + i + '"><legend><span class="ptn">' + (i + 1) + "</span> " + U.rich(x.q) + "</legend>" +
          '<div class="opts">' + x.options.map(function (o, k) {
            return '<label class="opt"><input type="radio" name="pt' + i + '" value="' + k + '"><span class="key">' + String.fromCharCode(65 + k) + '</span><span class="otext">' + U.rich(o) + "</span></label>";
          }).join("") + "</div></fieldset>";
      }).join("") +
      '<div class="btnrow"><button type="button" class="btn primary" data-act="solve" disabled>Auflösen &amp; Lernzettel lesen <kbd>Enter</kbd></button>' +
      '<button type="button" class="btn ghost" data-act="skip">Überspringen</button><span class="muted small pt-left">noch 3 offen</span></div></section>';
    c.innerHTML = html;
    var solve = UI.$('[data-act="solve"]', c);
    UI.$$(".ptq input", c).forEach(function (inp) {
      inp.addEventListener("change", function () {
        var i = Number(inp.closest(".ptq").getAttribute("data-i"));
        answers[i] = Number(inp.value);
        UI.$$('.ptq[data-i="' + i + '"] .opt', c).forEach(function (l) { l.classList.toggle("selected", UI.$("input", l).checked); });
        var open = answers.filter(function (a) { return a == null; }).length;
        solve.disabled = open > 0;
        UI.$(".pt-left", c).textContent = open ? "noch " + open + " offen" : "alle beantwortet";
      });
    });
    function finish(skipped) {
      var ok = skipped ? null : pt.questions.filter(function (x, i) { return answers[i] === x.correct; }).length;
      var rec = (S.state.pretest || (S.state.pretest = {}));
      var prev = rec[id] || { n: 0 };
      rec[id] = { d: U.today(), n: (prev.n || 0) + 1, skipped: !!skipped, score: skipped ? prev.score == null ? null : prev.score : ok + "/" + pt.questions.length };
      S.save("pretest");
      c.innerHTML = "";
      origTopic(c, params, {});
      addPretestButton(c, id);
      if (!skipped) showPretestResult(c, pt, answers);
    }
    solve.addEventListener("click", function () { finish(false); });
    UI.$('[data-act="skip"]', c).addEventListener("click", function () { finish(true); });
    App.keys.set({ enter: function () { if (!solve.disabled) solve.click(); return true; } });
  }

  /** Antworten auflösen, Stellen im Lernzettel markieren */
  function showPretestResult(c, pt, answers) {
    var zettel = UI.$(".lernzettel", c), body = UI.$(".summary-html", c);
    if (!zettel || !body) return;
    var found = pt.questions.map(function (x, i) { return markText(body, x.mark, i + 1, answers[i] === x.correct); });
    var ok = pt.questions.filter(function (x, i) { return answers[i] === x.correct; }).length;
    var box = UI.h('<section class="card pt-result"><h2>Vorab-Test: ' + ok + " von " + pt.questions.length + ' richtig geraten</h2>' +
      '<p class="muted small">Zählt nicht in die Beherrschung. Lies jetzt den Lernzettel – die markierten Stellen beantworten die Fragen.</p><ol class="pt-list">' +
      pt.questions.map(function (x, i) {
        var right = answers[i] === x.correct;
        return '<li class="' + (right ? "ok" : "miss") + '"><span class="sym">' + (right ? "✓" : "✗") + "</span> " + U.rich(x.q) +
          '<div class="small">Richtig: <strong>' + U.rich(x.options[x.correct]) + "</strong>" + (right ? "" : ' <span class="muted">(du: ' + U.rich(x.options[answers[i]]) + ")</span>") +
          (found[i] ? ' · <a href="#" data-goto="' + (i + 1) + '">Stelle im Lernzettel ↓</a>' : "") + "</div></li>";
      }).join("") + "</ol></section>");
    zettel.parentNode.insertBefore(box, zettel);
    UI.$$("[data-goto]", box).forEach(function (a) {
      a.addEventListener("click", function (ev) {
        ev.preventDefault();
        var m = UI.$('mark[data-pt="' + a.getAttribute("data-goto") + '"]', body);
        if (m) { try { m.scrollIntoView({ block: "center", behavior: "smooth" }); } catch (e) { m.scrollIntoView(); } m.classList.add("flash"); setTimeout(function () { m.classList.remove("flash"); }, 1600); }
      });
    });
    try { box.scrollIntoView({ block: "start" }); } catch (e) { /* ignore */ }
  }

  function markText(container, needle, n, right) {
    if (!needle) return false;
    var walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null);
    var node;
    while ((node = walker.nextNode())) {
      var i = node.nodeValue.indexOf(needle);
      if (i < 0) continue;
      var after = node.splitText(i);
      after.splitText(needle.length);
      var m = document.createElement("mark");
      m.className = "pt-mark " + (right ? "ok" : "miss");
      m.setAttribute("data-pt", String(n));
      m.title = "Antwort auf Vorab-Frage " + n;
      after.parentNode.insertBefore(m, after);
      m.appendChild(after);
      m.insertAdjacentHTML("afterbegin", '<sup class="ptn">' + n + "</sup>");
      return true;
    }
    return false;
  }

  /* ================================================ 3. Feynman-Modus */

  function feyStats(id) { return (S.state.feynman || {})[id] || null; }

  V.feynman = function (c, params) {
    if (params[0]) return feynmanTerm(c, params[0]);
    var part = (App.deep._feyPart || "");
    var list = DP.feynman.filter(function (f) { return !part || f.part === part; });
    var tried = DP.feynman.filter(function (f) { return feyStats(f.id); });
    var avg = tried.length ? U.sum(tried, function (f) { return feyStats(f.id).best; }) / tried.length : 0;
    var html = '<div class="page-head"><h1>Erklär es einem Laien</h1><p class="muted">Feynman-Methode: Du bekommst einen Fachbegriff und erklärst ihn frei – so, dass ihn jemand ohne IT-Ausbildung versteht. ' +
      "Danach prüfst du dich selbst über eine Checkliste mit Kernpunkten und typischen Lücken. Ideal als Training fürs Fachgespräch: laut sprechen, dann aufschreiben.</p></div>" +
      '<div class="card"><div class="kpis"><div class="kpi"><div class="kv">' + DP.feynman.length + '</div><div class="kl">Begriffe</div></div>' +
      '<div class="kpi"><div class="kv">' + tried.length + '</div><div class="kl">erklärt</div></div>' +
      '<div class="kpi"><div class="kv">' + (tried.length ? Math.round(avg) : "–") + '</div><div class="kl">Ø Bestpunktzahl</div></div></div>' +
      '<div class="btnrow"><button class="btn primary" data-act="random"' + (list.length ? "" : " disabled") + '>Zufälliger Begriff <kbd>Enter</kbd></button>' +
      '<button class="btn" data-act="weak"' + (list.length ? "" : " disabled") + ">Neuen oder schwächsten Begriff</button>" +
      '<label class="small">Bereich <select class="input" name="part"><option value="">alle</option>' + U.PARTS.map(function (p) { return '<option value="' + p + '"' + (p === part ? " selected" : "") + ">" + U.esc(U.PART_SHORT[p]) + "</option>"; }).join("") + "</select></label></div></div>";
    U.PARTS.forEach(function (p) {
      var fs = list.filter(function (f) { return f.part === p; });
      if (!fs.length) return;
      html += '<section class="card"><h2>' + UI.partBadge(p) + " " + U.esc(U.PART_LABEL[p]) + ' <span class="muted small">(' + fs.length + ')</span></h2><div class="feygrid">' + fs.map(function (f) {
        var s = feyStats(f.id);
        return '<a class="feytile" href="#/feynman/' + encodeURIComponent(f.id) + '"><span class="tt">' + U.esc(f.term) + "</span>" +
          (s ? '<span class="feyscore ' + UI.mClass(s.best / 100) + '">' + Math.round(s.best) + "</span>" : '<span class="feyscore none">neu</span>') + "</a>";
      }).join("") + "</div></section>";
    });
    c.innerHTML = html;
    function go(f) { if (f) location.hash = "#/feynman/" + encodeURIComponent(f.id); }
    UI.$('[data-act="random"]', c).addEventListener("click", function () { go(U.shuffle(list)[0]); });
    UI.$('[data-act="weak"]', c).addEventListener("click", function () {
      go(U.shuffle(list).sort(function (a, b) { var sa = feyStats(a.id), sb = feyStats(b.id); return (sa ? sa.best : -1) - (sb ? sb.best : -1); })[0]);
    });
    UI.$('select[name="part"]', c).addEventListener("change", function () { App.deep._feyPart = this.value; App.route(); });
    App.keys.set({ enter: function () { UI.$('[data-act="random"]', c).click(); return true; } });
  };

  function feynmanTerm(c, id) {
    var f = DP.feynmanById[id];
    if (!f) { c.innerHTML = '<div class="card"><h2>Begriff nicht gefunden</h2><a class="btn" href="#/feynman">Zur Übersicht</a></div>'; return; }
    var st = { text: "", t0: Date.now(), checks: null, plain: false };
    var s = feyStats(id);
    var timer = null;
    var head = '<div class="page-head"><div class="crumbs"><a href="#/feynman">Erklär es einem Laien</a> › ' + UI.partBadge(f.part) + ' <a href="#/topic/' + encodeURIComponent(f.topic) + '">' + U.esc(D.topicTitle(f.topic)) + "</a></div>" +
      '<h1 class="feyterm">' + U.esc(f.term) + "</h1></div>";
    function write() {
      c.innerHTML = head + '<section class="card feywrite"><p><strong>' + U.esc(f.prompt || "Erkläre „" + f.term + "“ so, dass es ein Laie versteht: Was ist das, wozu dient es, und wie sieht ein Beispiel aus?") + "</strong></p>" +
        '<p class="muted small">Ohne Nachschlagen. Kurze Sätze, ein Alltagsvergleich hilft. Im Fachgespräch hast du etwa 1–2 Minuten pro Frage.' + (s ? " Bisher bestes Ergebnis: " + Math.round(s.best) + " Punkte." : "") + "</p>" +
        '<textarea class="input" rows="8" aria-label="Deine Erklärung" placeholder="Stell dir vor, du erklärst es deiner Oma …"></textarea>' +
        '<div class="btnrow"><button class="btn primary" data-act="check">Fertig – selbst prüfen <kbd>Strg+Enter</kbd></button>' +
        '<button class="btn ghost" data-act="blank">Weiß ich nicht – Muster ansehen</button><span class="muted small fey-meta">0 Wörter · 0:00</span></div></section>';
      var ta = UI.$("textarea", c), meta = UI.$(".fey-meta", c);
      ta.value = st.text;
      function upd() {
        var w = st.text.trim() ? st.text.trim().split(/\s+/).length : 0;
        meta.textContent = w + " Wörter · " + U.fmtDuration((Date.now() - st.t0) / 1000);
      }
      ta.addEventListener("input", function () { st.text = ta.value; upd(); });
      ta.addEventListener("keydown", function (ev) { if (ev.key === "Enter" && (ev.ctrlKey || ev.metaKey)) { ev.preventDefault(); ev.stopPropagation(); check(); } });
      timer = setInterval(upd, 1000);
      UI.$('[data-act="check"]', c).addEventListener("click", check);
      UI.$('[data-act="blank"]', c).addEventListener("click", function () { st.text = ""; check(); });
      try { ta.focus({ preventScroll: true }); } catch (e) { /* ignore */ }
      App.keys.clear();
    }
    function check() {
      if (timer) { clearInterval(timer); timer = null; }
      st.secs = Math.round((Date.now() - st.t0) / 1000);
      st.checks = f.keypoints.map(function (k) { return DP.keyHit(k, st.text); });
      var kp = f.keypoints;
      c.innerHTML = head + '<section class="card feycheck">' +
        (st.text.trim() ? '<div class="why-own"><div class="sub">Deine Erklärung <span class="muted small">(' + st.text.trim().split(/\s+/).length + " Wörter · " + U.fmtDuration(st.secs) + ")</span></div><p>" + U.esc(st.text).replace(/\n/g, "<br>") + "</p></div>" : '<p class="muted">Keine eigene Erklärung – lies das Muster und versuche es danach noch einmal.</p>') +
        '<h3>Checkliste – was steckt (sinngemäß) in deiner Erklärung?</h3><div class="checks fey-checks">' +
        kp.map(function (k, i) {
          return '<label class="check"><input type="checkbox" data-fk="' + i + '"' + (st.checks[i] ? " checked" : "") + "> " + U.esc(k.text) + (st.checks[i] ? ' <span class="chip ok small">Stichwort erkannt</span>' : "") + "</label>";
        }).join("") +
        '<label class="check plain"><input type="checkbox" data-fk="plain"> Verständlich für Laien: keine unerklärten Fachwörter, ein Beispiel oder Vergleich</label></div>' +
        '<div class="fey-gaps"><div class="sub">Typische Lücken – prüf dich:</div><ul>' + (f.gaps || []).map(function (g) { return "<li>" + U.rich(g) + "</li>"; }).join("") + "</ul></div>" +
        '<details class="solution"' + (st.text.trim() ? "" : " open") + '><summary>Musterklärung</summary><div class="sol">' + U.rich(f.model) + "</div></details>" +
        '<div class="fey-score"></div>' +
        '<div class="btnrow"><button class="btn primary" data-act="save">Punktzahl speichern <kbd>Enter</kbd></button><button class="btn ghost" data-act="again">Nochmal erklären</button></div></section>';
      function score() {
        var n = st.checks.filter(Boolean).length + (st.plain ? 1 : 0);
        return Math.round((n / (kp.length + 1)) * 100);
      }
      function showScore() {
        var p = score();
        UI.$(".fey-score", c).innerHTML = '<div class="fey-points ' + UI.mClass(p / 100) + '"><span class="kv">' + p + '</span> / 100 Punkte</div>' + UI.bar(p / 100);
      }
      UI.$$("[data-fk]", c).forEach(function (cb) {
        cb.addEventListener("change", function () {
          var k = cb.getAttribute("data-fk");
          if (k === "plain") st.plain = cb.checked; else st.checks[Number(k)] = cb.checked;
          showScore();
        });
      });
      showScore();
      UI.$('[data-act="again"]', c).addEventListener("click", function () { st.t0 = Date.now(); write(); });
      UI.$('[data-act="save"]', c).addEventListener("click", save);
      App.keys.set({ enter: function () { save(); return true; } });
      try { root.scrollTo({ top: 0 }); } catch (e) { /* ignore */ }
    }
    function save() {
      var p = (function () { var n = st.checks.filter(Boolean).length + (st.plain ? 1 : 0); return Math.round((n / (f.keypoints.length + 1)) * 100); })();
      var all = S.state.feynman || (S.state.feynman = {});
      var e = all[id] || (all[id] = { n: 0, best: 0, hist: [] });
      e.n++; e.last = p; e.best = Math.max(e.best || 0, p); e.d = U.today();
      e.hist = (e.hist || []).concat([{ d: e.d, p: p }]).slice(-10);
      S.save("feynman");
      s = e;
      var missing = f.keypoints.filter(function (k, i) { return !st.checks[i]; });
      var next = U.shuffle(DP.feynman.filter(function (x) { return x.id !== id && x.part === f.part; }))[0] || U.shuffle(DP.feynman.filter(function (x) { return x.id !== id; }))[0];
      c.innerHTML = head + '<section class="card feydone"><h2>' + p + " / 100 Punkte" + (p >= e.best && e.n > 1 ? " – neue Bestleistung!" : "") + "</h2>" + UI.bar(p / 100) +
        (missing.length ? '<div class="sub">Beim nächsten Mal ergänzen:</div><ul class="miss">' + missing.map(function (k) { return "<li>" + U.esc(k.text) + "</li>"; }).join("") + "</ul>" : "<p>Alle Kernpunkte drin – stark!</p>") +
        (e.hist.length > 1 ? '<p class="muted small">Verlauf: ' + e.hist.map(function (h) { return h.p; }).join(" → ") + "</p>" : "") +
        '<div class="btnrow">' + (next ? '<a class="btn primary" href="#/feynman/' + encodeURIComponent(next.id) + '">Nächster Begriff: ' + U.esc(next.term) + " <kbd>Enter</kbd></a>" : "") +
        '<button class="btn" data-act="again">Nochmal erklären</button><a class="btn ghost" href="#/feynman">Zur Übersicht</a><a class="btn ghost" href="#/topic/' + encodeURIComponent(f.topic) + '">Lernzettel</a></div></section>';
      UI.$('[data-act="again"]', c).addEventListener("click", function () { st = { text: "", t0: Date.now(), checks: null, plain: false }; write(); });
      App.keys.set({ enter: function () { var a = UI.$(".feydone a.btn.primary", c); if (a) a.click(); return true; } });
    }
    write();
    return function () { if (timer) clearInterval(timer); };
  }

  /* ========================================= 4. Häufigste Fehler (Fehlerheft) */

  DP.topErrors = function (limit) { return ET.top(S.state.errLog || [], U.today(), 60, limit || 5); };

  DP.practiceErrors = function (groups, title) {
    var qs = ET.practiceSet(groups, D.questions, S.state.progress, groups.length > 1 ? 3 : 8, E.questionMastery);
    groups.forEach(function (g) {
      g.gens.slice(0, groups.length > 1 ? 1 : 3).forEach(function (gid) {
        var gen = D.generators.filter(function (x) { return x.id === gid; })[0];
        if (gen) try { qs.push(D.fromGenerator(gen)); } catch (e) { /* ignore */ }
      });
    });
    if (!qs.length) { UI.toast("Keine passenden Aufgaben gefunden.", "error"); return; }
    App.startSession(U.shuffle(qs), { title: title, backHref: "#/mistakes" });
  };

  DP.errorsHtml = function (top) {
    if (!top.length) {
      return '<section class="card errtypes"><h2>Deine häufigsten Fehler</h2><p class="muted">Noch keine Fehlermuster erfasst. Sobald du Aufgaben falsch oder nur teilweise löst, ordnet das Tool die Fehler Mustern zu ' +
        "(z. B. GROUP BY fehlt, HAVING/WHERE vertauscht, Vorzeichen, Rundung, Einheit, Verneinung überlesen).</p></section>";
    }
    return '<section class="card errtypes"><div class="row between"><h2>Deine häufigsten Fehler</h2><button class="btn primary" data-err="all">Gezielt üben (Top ' + top.length + ")</button></div>" +
      '<p class="muted small">Fehlermuster der letzten 60 Tage, automatisch aus Bewertungsraster, Schlüsselbegriffen und Zahlenabweichungen erkannt.</p><ol class="errlist">' +
      top.map(function (g, i) {
        var p = ET.PATTERNS[g.tag];
        return '<li><div class="errhead"><span class="errn">' + g.n + "×</span><strong>" + U.esc(p.label) + '</strong> <span class="badge">' + U.esc(p.group) + "</span>" +
          '<button class="btn small" data-err="' + i + '">Gezielt üben</button></div>' +
          '<div class="small tip">💡 ' + U.esc(p.tip) + "</div>" +
          '<ul class="errex small">' + g.examples.map(function (e) {
            var q = e.id ? D.questionById[e.id] : null, gen = e.g ? D.generators.filter(function (x) { return x.id === e.g; })[0] : null;
            var title = q ? U.truncate(U.stripHtml(q.question), 90) : gen ? "Rechentrainer: " + gen.title : "Aufgabe";
            return "<li>" + (q ? '<a href="#/q/' + encodeURIComponent(q.id) + '">' + U.esc(title) + "</a>" : U.esc(title)) +
              (e.x ? ' <span class="muted">– ' + U.esc(e.x) + "</span>" : "") + ' <span class="muted">(' + U.fmtDate(e.d) + ")</span></li>";
          }).join("") + "</ul></li>";
      }).join("") + "</ol></section>";
  };

  var origMistakes = V.mistakes;
  V.mistakes = function (c) {
    var r = origMistakes.apply(this, arguments);
    var top = DP.topErrors(5);
    var box = UI.h(DP.errorsHtml(top));
    var headEl = UI.$(".page-head", c);
    if (headEl && headEl.nextSibling) c.insertBefore(box, headEl.nextSibling); else c.insertBefore(box, c.firstChild);
    UI.$$("[data-err]", box).forEach(function (b) {
      b.addEventListener("click", function () {
        var k = b.getAttribute("data-err");
        if (k === "all") DP.practiceErrors(top, "Gezielt üben: deine Top-Fehler");
        else DP.practiceErrors([top[Number(k)]], "Gezielt üben: " + ET.PATTERNS[top[Number(k)].tag].label);
      });
    });
    return r;
  };

  /* ======================================================== Einstellungen */

  var origSettings = V.settings;
  V.settings = function (c) {
    var r = origSettings.apply(this, arguments);
    var wm = setting("whyMode", "errors"), pm = setting("pretestMode", "first");
    function opt(v, cur, l) { return '<option value="' + v + '"' + (v === cur ? " selected" : "") + ">" + l + "</option>"; }
    var card = UI.h('<form class="card" id="fdeep"><h2>Verständnis</h2><div class="row wrap">' +
      '<label>Warum-Schritt nach einer Antwort <select class="input" name="whyMode">' + opt("always", wm, "immer") + opt("errors", wm, "nur bei Fehlern") + opt("off", wm, "aus") + "</select></label>" +
      '<label>Vorab-Test beim Öffnen eines Themas <select class="input" name="pretestMode">' + opt("first", pm, "beim ersten Öffnen") + opt("always", pm, "jedes Mal") + opt("off", pm, "aus") + "</select></label></div>" +
      '<p class="muted small">Warum-Begründungen gibt es für ' + Object.keys(DP.why).length + " Aufgaben, Vorab-Tests für " + Object.keys(DP.pretest).length + " Themen.</p>" +
      '<div class="btnrow"><button class="btn primary" type="submit">Speichern</button></div></form>');
    var first = UI.$("#fsettings", c);
    if (first && first.nextSibling) c.insertBefore(card, first.nextSibling); else c.appendChild(card);
    card.addEventListener("submit", function (ev) {
      ev.preventDefault();
      S.state.settings.whyMode = card.whyMode.value;
      S.state.settings.pretestMode = card.pretestMode.value;
      S.save("settings");
      UI.toast("Einstellungen gespeichert.");
    });
    return r;
  };
})(typeof window !== "undefined" ? window : globalThis);
