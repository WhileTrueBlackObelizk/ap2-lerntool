/* AP2-Lerntool – UI-Komponenten: Fragekarte, Bewertung, Tutor, Session, Charts */
(function (root) {
  "use strict";
  var App = (root.App = root.App || {});
  var U = App.util, E = App.engine;
  var UI = (App.ui = {});

  /* ================================================================ Helfer */

  UI.$ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  UI.$$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
  UI.h = function (html) {
    var t = document.createElement("template");
    t.innerHTML = String(html).trim();
    return t.content.firstElementChild;
  };
  UI.toast = function (msg, kind) {
    var box = UI.$("#toasts");
    if (!box) return;
    var el = UI.h('<div class="toast ' + (kind || "") + '" role="status">' + U.esc(msg) + "</div>");
    box.appendChild(el);
    setTimeout(function () { el.classList.add("out"); }, 3200);
    setTimeout(function () { el.remove(); }, 3700);
  };
  UI.mClass = function (m) { return m >= 0.8 ? "good" : m >= 0.5 ? "mid" : m > 0 ? "low" : "none"; };
  UI.bar = function (frac, cls, label) {
    var p = Math.round(U.clamp(frac || 0, 0, 1) * 100);
    return '<div class="bar ' + (cls || UI.mClass(frac)) + '" role="progressbar" aria-valuenow="' + p + '" aria-valuemin="0" aria-valuemax="100"' +
      (label ? ' aria-label="' + U.esc(label) + '"' : "") + '><span style="width:' + p + '%"></span></div>';
  };
  UI.badge = function (text, cls) { return '<span class="badge ' + (cls || "") + '">' + U.esc(text) + "</span>"; };
  /** Link zum öffentlichen Issue-Formular, vorbefüllt nur mit Aufgaben-ID und Thema (keine Antworten, keine Nutzerdaten). */
  UI.REPORT_URL = "https://github.com/WhileTrueBlackObelizk/ap2-lerntool/issues/new";
  UI.reportLink = function (q) {
    if (!q || !q.id || q.ai || q._gen) return "";
    var topic = App.data.topicTitle(q.topic) || q.topic || "?";
    var body = "**Aufgabe:** " + q.id + "\n**Thema:** " + topic + " (" + (U.PART_SHORT[q.part] || q.part || "?") + ")\n\n" +
      "**Was ist falsch?**\n<!-- Bitte beschreiben: falsche Lösung, Tippfehler, unklare Frage … -->\n\n" +
      "**Was wäre richtig (mit Quelle, falls möglich)?**\n";
    var url = UI.REPORT_URL + "?title=" + encodeURIComponent("Fehler in Aufgabe " + q.id) + "&body=" + encodeURIComponent(body);
    return '<a class="report-link" href="' + U.esc(url) + '" target="_blank" rel="noopener" title="Fehler in dieser Aufgabe auf GitHub melden">⚑ Fehler melden</a>';
  };
  UI.partBadge = function (p) { return '<span class="badge part part-' + U.esc(String(p || "").toLowerCase()) + '">' + U.esc(U.PART_SHORT[p] || p || "?") + "</span>"; };
  UI.gradeChip = function (g) { return g ? '<span class="grade g' + g + '" title="' + U.esc(E.GRADE_LABEL[g]) + '">' + g + "</span>" : '<span class="grade none">–</span>'; };
  UI.LEVEL = { 1: "Leicht", 2: "Mittel", 3: "Schwer" };
  UI.diff = function (d) {
    d = Number(d) || 0;
    if (!UI.LEVEL[d]) return "";
    return '<span class="lvl lvl-' + d + '" title="Level: ' + UI.LEVEL[d] + '">' + [1, 2, 3].map(function (i) { return '<i class="' + (i <= d ? "on" : "") + '"></i>'; }).join("") + UI.LEVEL[d] + "</span>";
  };
  UI.noKeyNotice = function (what) {
    return '<div class="notice"><strong>' + U.esc(what || "Diese Funktion") + " benötigt einen Anthropic-API-Key.</strong> " +
      'Hinterlegen Sie ihn unter <a href="#/settings">Einstellungen</a> – er wird nur lokal gespeichert und ausschließlich an api.anthropic.com gesendet.</div>';
  };
  UI.resultTable = function (r, caption) {
    if (!r) return "";
    var cols = r.columns || [], vals = r.values || [];
    var html = '<div class="tablewrap">' + (caption ? '<div class="tcap">' + caption + "</div>" : "") + '<table class="data"><thead><tr>' +
      cols.map(function (c) { return "<th>" + U.esc(c) + "</th>"; }).join("") + "</tr></thead><tbody>";
    if (!vals.length) html += '<tr><td colspan="' + Math.max(1, cols.length) + '" class="muted">(keine Zeilen)</td></tr>';
    vals.forEach(function (row) {
      html += "<tr>" + row.map(function (v) { return v == null ? '<td class="null">NULL</td>' : "<td>" + U.esc(v) + "</td>"; }).join("") + "</tr>";
    });
    html += "</tbody></table>";
    if (r.total && r.total > vals.length) html += '<div class="muted small">… ' + (r.total - vals.length) + " weitere Zeilen</div>";
    return html + "</div>";
  };
  UI.confirm = function (msg) { try { return root.confirm(msg); } catch (e) { return false; } };

  /** Datei-Download per Blob */
  UI.download = function (filename, text, mime) {
    var blob = new Blob([text], { type: mime || "application/json" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  };

  /* ============================================================ Tastatur */

  App.keys = {
    handlers: {},
    set: function (h) { this.handlers = h || {}; },
    clear: function () { this.handlers = {}; },
  };

  /* ============================================================ Grader */

  App.grader = {
    /** → Promise<Ergebnis>; text/code: KI (falls Key) sonst Keywords + Selbsteinschätzung */
    grade: async function (q, ans, opts) {
      opts = opts || {};
      ans = ans || {};
      if (E.isAuto(q)) return E.gradeAuto(q, ans);
      if (q.type === "sql") {
        try { return await App.sql.grade(q, ans.text); } catch (e) {
          var r = E.gradeKeywords(q, ans.text);
          r.kind = "keywords"; r.sqlUnavailable = "SQL-Engine konnte nicht geladen werden: " + e.message;
          return r;
        }
      }
      var text = ans.text || "";
      if (q.starter && text.trim() === String(q.starter).trim()) text = ""; // unveränderte Vorlage
      if (!text.trim()) return E.makeResult(q, 0, { kind: "empty", answered: false });
      if (opts.allowAI !== false && App.ai.available()) {
        try { return await App.ai.grade(q, text, opts.signal, opts.onStatus); } catch (e) {
          if (e.code === "abort") throw e;
          var kr = E.gradeKeywords(q, text);
          kr.aiError = e.message;
          return kr;
        }
      }
      return E.gradeKeywords(q, text);
    },
    isAnswered: function (q, ans) {
      if (!ans) return false;
      switch (q.type) {
        case "mc": return ans.choice != null;
        case "multi": return !!(ans.choices && ans.choices.length);
        case "numeric": return !!String(ans.value || "").trim();
        case "order": return !!ans.touched;
        default: return !!String(ans.text || "").trim() && !(q.starter && ans.text.trim() === String(q.starter).trim());
      }
    },
    describeAnswer: function (q, ans) {
      ans = ans || {};
      switch (q.type) {
        case "mc": return ans.choice != null ? "Gewählt: " + U.stripHtml(q.options[ans.choice]) : "(keine Auswahl)";
        case "multi": return (ans.choices || []).length ? "Gewählt: " + ans.choices.map(function (i) { return U.stripHtml(q.options[i]); }).join("; ") : "(keine Auswahl)";
        case "numeric": return ans.value ? "Eingabe: " + ans.value + (q.unit ? " " + q.unit : "") : "(keine Eingabe)";
        case "order": return ans.order ? "Reihenfolge: " + ans.order.map(function (i, k) { return k + 1 + ". " + U.stripHtml(q.items[i]); }).join(" | ") : "(nicht sortiert)";
        default: return ans.text || "";
      }
    },
  };

  var SELF_LEVELS = [0, 0.25, 0.5, 0.75, 1];

  /* ============================================================ Fragekarte */

  /**
   * opts: {mode: "train"|"exam"|"review"|"flash", answer, result, onGraded(result), onChange(), number, total, hideMeta, allowGiveUp}
   */
  function QCard(q, opts) {
    this.q = q;
    this.opts = opts || {};
    this.mode = this.opts.mode || "train";
    this.answer = this.opts.answer || {};
    this.result = this.opts.result || null;
    this.untrusted = !!q.ai;
    if (q.type === "order" && !this.answer.order) this.answer.order = E.initialOrder(q);
    if ((q.type === "code" || q.type === "sql") && this.answer.text == null && q.starter) this.answer.text = q.starter;
    this.el = document.createElement("article");
    this.el.className = "qcard type-" + q.type;
    this.render();
  }
  App.QCard = QCard;

  QCard.prototype.locked = function () { return this.mode === "review" || !!(this.result && (this.result.final || this.result.needsSelf)); };

  QCard.prototype.rich = function (s) { return U.rich(s, this.untrusted); };

  QCard.prototype.render = function () {
    var q = this.q, self = this;
    var meta = this.opts.hideMeta ? "" :
      '<div class="qmeta">' +
      (this.opts.number ? '<span class="qnum">Aufgabe ' + this.opts.number + (this.opts.total ? " / " + this.opts.total : "") + "</span>" : "") +
      UI.partBadge(q.part) +
      '<a class="badge topic" href="#/topic/' + encodeURIComponent(q.topic || "") + '">' + U.esc(App.data.topicTitle(q.topic)) + "</a>" +
      UI.badge(U.TYPE_LABEL[q.type] || q.type, "type") + UI.diff(q.difficulty) +
      '<span class="pts">' + U.fmtNum(q.points, 1) + " P.</span>" +
      (q.ai ? UI.badge("KI", "ai") : "") + (q._gen ? UI.badge("generiert", "gen") : "") +
      (this.mode !== "exam" ? UI.reportLink(q) : "") +
      "</div>";
    this.el.innerHTML = meta +
      (q.context ? '<div class="qcontext">' + this.rich(q.context) + "</div>" : "") +
      '<div class="qtext">' + this.rich(q.question) + "</div>" +
      '<div class="qinput"></div>' +
      '<div class="qactions"></div>' +
      '<div class="qresult" aria-live="polite"></div>' +
      '<div class="qtutor"></div>';
    this.renderInput();
    this.renderActions();
    if (this.result) this.renderResult();
    // Links in Fragetexten nicht versehentlich navigieren lassen
    UI.$$(".qtext a, .qcontext a", this.el).forEach(function (a) { if (/^javascript:/i.test(a.getAttribute("href") || "")) a.removeAttribute("href"); });
    void self;
  };

  QCard.prototype.renderInput = function () {
    var q = this.q, a = this.answer, self = this, box = UI.$(".qinput", this.el);
    if (q.type !== "sql" && this.mode !== "review" && UI.beiblatt) UI.beiblatt.detach();
    var locked = this.locked();
    var r = this.result;
    var name = "q_" + Math.random().toString(36).slice(2);
    if (q.type === "mc" || q.type === "multi") {
      var multi = q.type === "multi";
      var chosen = multi ? a.choices || [] : a.choice != null ? [a.choice] : [];
      var html = (multi ? '<div class="hint">Mehrere Antworten können richtig sein.</div>' : "") +
        '<div class="opts" role="' + (multi ? "group" : "radiogroup") + '">';
      (q.options || []).forEach(function (o, i) {
        var sel = chosen.indexOf(i) >= 0;
        var cls = "opt" + (sel ? " selected" : "");
        if (r && (r.final || self.mode === "review" || self.mode === "flash")) {
          var isC = (q.correct || []).indexOf(i) >= 0;
          if (isC) cls += sel ? " is-correct" : " is-missed";
          else if (sel) cls += " is-wrong";
        }
        html += '<label class="' + cls + '"><input type="' + (multi ? "checkbox" : "radio") + '" name="' + name + '" value="' + i + '"' +
          (sel ? " checked" : "") + (locked ? " disabled" : "") + '><span class="key">' + (i < 9 ? i + 1 : "") + '</span><span class="otext">' + self.rich(o) + "</span></label>";
      });
      box.innerHTML = html + "</div>";
      UI.$$("input", box).forEach(function (inp) {
        inp.addEventListener("change", function () { self.toggleOption(Number(inp.value), multi ? inp.checked : true); });
      });
    } else if (q.type === "numeric") {
      box.innerHTML = '<div class="numrow"><input class="input num" type="text" inputmode="decimal" autocomplete="off" aria-label="Ergebnis" placeholder="Ergebnis eingeben, z. B. 1.234,56"' +
        (locked ? " disabled" : "") + ' value="' + U.esc(a.value || "") + '">' + (q.unit ? '<span class="unit">' + U.esc(q.unit) + "</span>" : "") + "</div>" +
        '<div class="hint">Komma oder Punkt als Dezimaltrenner; Tausenderpunkte sind erlaubt.</div>';
      var inp = UI.$("input", box);
      inp.addEventListener("input", function () { a.value = inp.value; self.changed(); });
    } else if (q.type === "order") {
      var html2 = '<div class="hint">Ziehen Sie die Elemente in die richtige Reihenfolge oder nutzen Sie die Pfeiltasten-Buttons.</div><ol class="order">';
      a.order.forEach(function (idx, pos) {
        var cls = "";
        if (r && r.positions) cls = r.positions[pos] ? " is-correct" : " is-wrong";
        html2 += '<li class="oitem' + cls + '" data-idx="' + idx + '"' + (locked ? "" : ' draggable="true"') + '><span class="handle" aria-hidden="true">⋮⋮</span><span class="otext">' + self.rich(q.items[idx]) + "</span>" +
          (locked ? "" : '<span class="obtns"><button type="button" class="icon-btn" data-mv="-1" aria-label="nach oben">↑</button><button type="button" class="icon-btn" data-mv="1" aria-label="nach unten">↓</button></span>') + "</li>";
      });
      box.innerHTML = html2 + "</ol>";
      if (!locked) this.bindOrder(UI.$("ol", box));
    } else {
      var isCode = q.type === "code" || q.type === "sql";
      var ph = q.type === "sql" ? "SQL-Anweisung hier eingeben …" : q.type === "code" ? "Pseudocode oder Code (" + (q.lang || "beliebige Sprache") + ") …" : "Ihre Antwort …";
      box.innerHTML = (isCode ? '<div class="hint">' + (q.lang ? "Sprache: " + U.esc(q.lang) + " · " : "") + "Tab rückt ein, Esc verlässt das Feld" + (q.type === "sql" ? ", Strg+Umschalt+Enter führt aus" : "") + ".</div>" : "") +
        '<textarea class="input ' + (isCode ? "code" : "") + '" rows="' + (isCode ? 10 : 6) + '" spellcheck="' + (isCode ? "false" : "true") + '"' + (isCode ? ' autocapitalize="off" autocorrect="off" autocomplete="off"' : "") + ' aria-label="Antwort" placeholder="' + ph + '"' + (locked ? " readonly" : "") + "></textarea>" +
        (q.type === "sql" ? '<div class="sqlbar"><button type="button" class="btn small" data-act="run">▶ Ausführen</button><button type="button" class="btn small" data-act="beiblatt" title="Beiblatt mit allen Tabellen öffnen (Taste B außerhalb des Eingabefelds)">📄 Beiblatt <kbd>B</kbd></button><button type="button" class="btn small" data-act="sqlref" title="SQL-Syntax-Beiblatt öffnen (Taste S außerhalb des Eingabefelds)">⟨⟩ SQL-Syntax <kbd>S</kbd></button><button type="button" class="btn small" data-act="belegsatz" title="Original-Belegsatz SQL öffnen (Taste O außerhalb des Eingabefelds)">📑 Belegsatz <kbd>O</kbd></button><span class="muted small">SQLite · frische Datenbank je Ausführung</span></div><div class="sqlout"></div>' : "");
      var ta = UI.$("textarea", box);
      ta.value = a.text || "";
      ta.addEventListener("input", function () { a.text = ta.value; self.changed(); });
      if (isCode) UI.codeEditor(ta);
      if (q.type === "sql") {
        UI.$('[data-act="run"]', box).addEventListener("click", function () { self.runSql(); });
        UI.$('[data-act="beiblatt"]', box).addEventListener("click", function () { UI.beiblatt.open(q, "data"); });
        UI.$('[data-act="sqlref"]', box).addEventListener("click", function () { UI.beiblatt.open(q, "ref"); });
        UI.$('[data-act="belegsatz"]', box).addEventListener("click", function () { UI.beiblatt.open(q, "pdf"); });
        UI.beiblatt.attach(q);
        ta.addEventListener("keydown", function (ev) {
          if (ev.key === "Enter" && ev.shiftKey && (ev.ctrlKey || ev.metaKey)) { ev.preventDefault(); ev.stopPropagation(); self.runSql(); }
        });
      }
    }
  };

  QCard.prototype.changed = function () { if (this.opts.onChange) this.opts.onChange(this.answer); };

  QCard.prototype.toggleOption = function (i, on) {
    if (this.locked()) return;
    var q = this.q, a = this.answer;
    if (!q.options || i < 0 || i >= q.options.length) return;
    if (q.type === "mc") a.choice = i;
    else {
      a.choices = (a.choices || []).filter(function (x) { return x !== i; });
      if (on) a.choices.push(i);
      a.choices.sort(function (x, y) { return x - y; });
    }
    UI.$$(".opt", this.el).forEach(function (l, k) {
      var sel = q.type === "mc" ? a.choice === k : a.choices.indexOf(k) >= 0;
      l.classList.toggle("selected", sel);
      UI.$("input", l).checked = sel;
    });
    this.changed();
  };

  /** Ziffertaste: Option wählen bzw. Selbsteinschätzung */
  QCard.prototype.digit = function (n) {
    if (this.result && this.result.needsSelf) {
      if (n >= 1 && n <= 5) this.applySelf(SELF_LEVELS[n - 1]);
      return true;
    }
    if (this.locked()) return false;
    if (this.q.type === "mc") { this.toggleOption(n - 1, true); return true; }
    if (this.q.type === "multi") {
      var on = !((this.answer.choices || []).indexOf(n - 1) >= 0);
      this.toggleOption(n - 1, on);
      return true;
    }
    return false;
  };

  QCard.prototype.bindOrder = function (ol) {
    var self = this, dragEl = null;
    function sync() {
      self.answer.order = UI.$$("li", ol).map(function (li) { return Number(li.getAttribute("data-idx")); });
      self.answer.touched = true;
      self.changed();
    }
    ol.addEventListener("click", function (ev) {
      var b = ev.target.closest("button[data-mv]");
      if (!b) return;
      var li = b.closest("li"), mv = Number(b.getAttribute("data-mv"));
      if (mv < 0 && li.previousElementSibling) ol.insertBefore(li, li.previousElementSibling);
      else if (mv > 0 && li.nextElementSibling) ol.insertBefore(li.nextElementSibling, li);
      sync();
      var again = UI.$('button[data-mv="' + mv + '"]', li);
      if (again) again.focus();
    });
    ol.addEventListener("dragstart", function (ev) {
      dragEl = ev.target.closest("li");
      if (!dragEl) return;
      dragEl.classList.add("dragging");
      try { ev.dataTransfer.effectAllowed = "move"; ev.dataTransfer.setData("text/plain", "x"); } catch (e) { /* ignore */ }
    });
    ol.addEventListener("dragover", function (ev) {
      if (!dragEl) return;
      ev.preventDefault();
      var li = ev.target.closest("li");
      if (!li || li === dragEl) return;
      var rect = li.getBoundingClientRect();
      var after = ev.clientY > rect.top + rect.height / 2;
      ol.insertBefore(dragEl, after ? li.nextElementSibling : li);
    });
    ol.addEventListener("drop", function (ev) { ev.preventDefault(); });
    ol.addEventListener("dragend", function () {
      if (dragEl) dragEl.classList.remove("dragging");
      dragEl = null;
      sync();
    });
  };

  QCard.prototype.renderActions = function () {
    var box = UI.$(".qactions", this.el), self = this;
    if (this.mode === "exam" || this.mode === "flash") { box.innerHTML = ""; return; }
    var html = "";
    if (this.mode === "train" && !this.result) {
      html += '<button type="button" class="btn primary" data-act="check">Prüfen <kbd>Enter</kbd></button>';
      if (this.opts.allowGiveUp !== false) html += '<button type="button" class="btn ghost" data-act="giveup">Lösung zeigen</button>';
    }
    html += '<button type="button" class="btn ghost" data-act="tutor" aria-expanded="false">Erklär mir das</button>';
    box.innerHTML = html;
    var c = UI.$('[data-act="check"]', box);
    if (c) c.addEventListener("click", function () { self.check(); });
    var g = UI.$('[data-act="giveup"]', box);
    if (g) g.addEventListener("click", function () { self.giveUp(); });
    UI.$('[data-act="tutor"]', box).addEventListener("click", function (ev) { self.toggleTutor(ev.currentTarget); });
  };

  QCard.prototype.check = async function () {
    if (this.busy || this.result) return;
    var self = this, btn = UI.$('[data-act="check"]', this.el);
    this.busy = true;
    var ai = (this.q.type === "text" || this.q.type === "code") && App.ai.available() && App.grader.isAnswered(this.q, this.answer);
    if (btn) { btn.disabled = true; btn.innerHTML = '<span class="spinner"></span> ' + (ai ? "KI bewertet …" : "Prüfe …"); }
    this.abort = new AbortController();
    try {
      var r = await App.grader.grade(this.q, this.answer, { signal: this.abort.signal, onStatus: function (s) { if (btn) btn.textContent = s; } });
      this.setResult(r);
    } catch (e) {
      if (btn) { btn.disabled = false; btn.innerHTML = "Prüfen <kbd>Enter</kbd>"; }
      UI.$(".qresult", this.el).innerHTML = '<div class="notice error">' + U.esc(e.message) + "</div>";
    } finally { this.busy = false; }
  };

  QCard.prototype.giveUp = function () {
    if (this.result) return;
    this.setResult(E.makeResult(this.q, 0, { kind: "giveup", answered: false }));
  };

  QCard.prototype.setResult = function (r) {
    this.result = r;
    this.renderInput();
    this.renderActions();
    this.renderResult();
    if (r.final && this.opts.onGraded) this.opts.onGraded(r);
  };

  QCard.prototype.applySelf = function (frac) {
    if (!this.result || !this.result.needsSelf) return;
    this.setResult(E.applySelf(this.result, frac));
  };

  QCard.prototype.renderResult = function () {
    var box = UI.$(".qresult", this.el), self = this;
    box.innerHTML = UI.resultHtml(this.q, this.result, this.answer);
    UI.$$("[data-self]", box).forEach(function (b) {
      b.addEventListener("click", function () { self.applySelf(Number(b.getAttribute("data-self"))); });
    });
    var ptsIn = UI.$("[data-selfpts]", box), max = this.result ? this.result.max : 0;
    var chks = UI.$$("[data-rubchk]", box);
    chks.forEach(function (cb) {
      cb.addEventListener("change", function () {
        var n = chks.filter(function (x) { return x.checked; }).length;
        if (ptsIn) ptsIn.value = String(Math.round((max * n / chks.length) * 2) / 2);
      });
    });
    var pb = UI.$('[data-act="selfpts"]', box);
    if (pb && ptsIn) pb.addEventListener("click", function () {
      var v = U.clamp(Math.round(Number(String(ptsIn.value).replace(",", ".")) * 2) / 2 || 0, 0, max);
      self.applySelf(max ? v / max : 0);
    });
    if (this.result && this.result.needsSelf && this.mode !== "review") {
      var first = UI.$("[data-self]", box);
      if (first && this.mode === "train") setTimeout(function () { try { box.scrollIntoView({ block: "nearest", behavior: "smooth" }); } catch (e) { /* ignore */ } }, 50);
    }
  };

  QCard.prototype.runSql = async function () {
    var out = UI.$(".sqlout", this.el), q = this.q;
    out.innerHTML = '<div class="muted"><span class="spinner"></span> SQL-Engine wird geladen …</div>';
    try {
      var SQL = await App.sql.load();
      var r = App.sql.run(SQL, q.sql.setup, this.answer.text || "", q.sql.check);
      if (r.error) { out.innerHTML = '<div class="notice error"><strong>Fehler:</strong> ' + U.esc(r.error) + "</div>"; return; }
      var html = "";
      if (r.results && r.results.length) html += UI.resultTable({ columns: r.last.columns, values: r.last.values.slice(0, 100), total: r.last.values.length }, "Ergebnis");
      else html += '<div class="notice">Anweisung ausgeführt' + (r.changes ? " – " + r.changes + " Zeile(n) geändert" : "") + ". Keine Ergebniszeilen.</div>";
      if (q.sql.check && r.check) html += UI.resultTable({ columns: r.check.columns, values: r.check.values.slice(0, 100), total: r.check.values.length }, "Kontrollabfrage nach Ausführung: <code>" + U.esc(q.sql.check) + "</code>");
      out.innerHTML = html;
    } catch (e) {
      out.innerHTML = '<div class="notice error">' + U.esc(e.message) + "</div>";
    }
  };

  QCard.prototype.showTables = async function () {
    var out = UI.$(".sqlout", this.el), q = this.q;
    out.innerHTML = '<div class="muted"><span class="spinner"></span> Tabellen werden geladen …</div>';
    try {
      var SQL = await App.sql.load();
      var ts = App.sql.tables(SQL, q.sql.setup);
      out.innerHTML = ts.length ? ts.map(function (t) {
        return UI.resultTable(t, "<strong>" + U.esc(t.name) + "</strong> <span class='muted small'>(" + U.esc(t.schema.join(", ")) + ")</span>");
      }).join("") : '<div class="muted">Keine Tabellen im Setup.</div>';
    } catch (e) {
      out.innerHTML = '<div class="notice error">' + U.esc(e.message) + "</div>";
    }
  };

  QCard.prototype.toggleTutor = function (btn) {
    var box = UI.$(".qtutor", this.el), self = this;
    if (box.firstChild) { box.innerHTML = ""; if (btn) btn.setAttribute("aria-expanded", "false"); return; }
    if (btn) btn.setAttribute("aria-expanded", "true");
    new App.Tutor(box, this.q, function () {
      var d = App.grader.describeAnswer(self.q, self.answer);
      if (self.result) d += "\n(Ergebnis: " + U.fmtNum(self.result.points, 1) + " von " + self.result.max + " Punkten)";
      return d;
    });
  };

  QCard.prototype.closeTutor = function () { var box = UI.$(".qtutor", this.el); if (box && box.firstChild) { box.innerHTML = ""; return true; } return false; };

  QCard.prototype.focus = function () {
    var f = UI.$("textarea:not([readonly]), input.num:not([disabled])", this.el);
    if (f && root.matchMedia && root.matchMedia("(pointer:fine)").matches) try { f.focus({ preventScroll: true }); } catch (e) { /* ignore */ }
  };

  /* --------------------------------------------- Ergebnisdarstellung */

  UI.resultHtml = function (q, r, ans) {
    if (!r) return "";
    var untrusted = !!q.ai;
    var cls = r.needsSelf ? "pending" : r.pct >= E.PASS ? "ok" : r.pct > 0 ? "partial" : "bad";
    var label = r.needsSelf ? "Vorläufig – bitte selbst einschätzen" : r.kind === "giveup" ? "Lösung angezeigt" : r.pct >= E.PASS ? "Richtig" : r.pct > 0 ? "Teilweise richtig" : "Nicht richtig";
    var html = '<div class="result ' + cls + '"><div class="rhead"><span class="score">' + U.fmtNum(r.points, 1) + " / " + U.fmtNum(r.max, 1) + " Punkte</span>" +
      '<span class="rlabel">' + label + "</span>" + (r.self != null ? '<span class="muted small">Selbsteinschätzung ' + Math.round(r.self * 100) + " %</span>" : "") +
      (r.kind === "ai" ? UI.badge("KI-Bewertung", "ai") : "") + "</div>";
    var d = "";
    switch (r.kind) {
      case "mc":
        if (!r.answered) d += "<p>Keine Antwort gewählt.</p>";
        break;
      case "multi":
        d += "<p>" + r.right + " von " + r.need + " richtigen Optionen gewählt" + (r.wrong ? ", " + r.wrong + " falsche Auswahl (Abzug)" : "") + ".</p>";
        break;
      case "numeric":
        d += "<p>Ihre Eingabe: <code>" + U.esc(r.value || "–") + "</code>" + (r.invalid ? ' <span class="warn">(nicht als Zahl erkennbar)</span>' : r.parsed != null ? ' <span class="muted">→ ' + U.fmtNum(r.parsed, 6) + "</span>" : "") +
          " · Richtig: <strong>" + U.fmtNum(q.answer, 6) + (q.unit ? " " + U.esc(q.unit) : "") + "</strong> <span class='muted small'>(Toleranz ± " + U.fmtNum(E.numericTolerance(q), 6) + ")</span></p>";
        break;
      case "order":
        d += "<p>" + r.hits + " von " + r.n + " Positionen richtig.</p><div class='sub'>Richtige Reihenfolge:</div><ol class='correct-order'>" +
          (q.items || []).map(function (it) { return "<li>" + U.rich(it, untrusted) + "</li>"; }).join("") + "</ol>";
        break;
      case "sql":
        if (r.solutionError) d += '<div class="notice error">Die Musterlösung ließ sich nicht ausführen (' + U.esc(r.solutionError) + "). Bitte selbst einschätzen.</div>";
        else if (!r.answered) d += "<p>Keine Anweisung eingegeben.</p>";
        else if (r.error) d += '<div class="notice error"><strong>SQL-Fehler:</strong> ' + U.esc(r.error) + "</div>" + (r.expected ? '<div class="cmp">' + UI.resultTable(r.expected, "Erwartetes Ergebnis") + "</div>" : "");
        else if (r.match) d += "<p>✓ Die Ergebnismenge stimmt mit der Musterlösung überein" + (r.viaCheck ? " (Kontrollabfrage)" : "") + ".</p>";
        else d += "<p><strong>Ergebnis weicht ab:</strong> " + U.esc(r.reason || "") + "</p><div class='cmp'>" + UI.resultTable(r.expected, "Erwartet" + (r.viaCheck ? " (Kontrollabfrage)" : "")) + UI.resultTable(r.actual, "Ihr Ergebnis") + "</div>";
        if (r.rubric && r.rubric.length) d += UI.rubricHtml(r.rubric, r);
        if (q.sql) d += "<div class='sub'>Muster-SQL:</div><pre><code>" + U.esc(q.sql.solution) + "</code></pre>";
        break;
      case "keywords":
        if (r.sqlUnavailable) d += '<div class="notice error">' + U.esc(r.sqlUnavailable) + "</div>";
        if (r.aiError) d += '<div class="notice error">KI-Bewertung fehlgeschlagen: ' + U.esc(r.aiError) + " – Offline-Bewertung verwendet.</div>";
        if ((r.found || []).length + (r.missing || []).length) {
          d += "<p>Offline-Abgleich der Schlüsselbegriffe: <strong>" + r.found.length + " von " + (r.found.length + r.missing.length) + "</strong> gefunden → vorläufig " + U.fmtNum(r.prelim != null ? r.prelim : r.points, 1) + " Punkte.</p>";
          d += '<div class="chips">' + r.found.map(function (k) { return '<span class="chip ok">✓ ' + U.esc(k) + "</span>"; }).join("") +
            r.missing.map(function (k) { return '<span class="chip miss">✗ ' + U.esc(k) + "</span>"; }).join("") + "</div>";
        }
        break;
      case "ai":
        if (r.feedback) d += '<div class="aifb">' + U.formatAI(r.feedback) + "</div>";
        if (r.good && r.good.length) d += "<div class='sub'>Richtig:</div><ul class='good'>" + r.good.map(function (x) { return "<li>" + U.formatAI(x) + "</li>"; }).join("") + "</ul>";
        if (r.missing && r.missing.length) d += "<div class='sub'>Fehlte / ungenau:</div><ul class='miss'>" + r.missing.map(function (x) { return "<li>" + U.formatAI(x) + "</li>"; }).join("") + "</ul>";
        if (r.tip) d += '<div class="tip"><strong>Tipp:</strong> ' + U.formatAI(r.tip) + "</div>";
        break;
      case "empty":
        d += "<p>Keine Antwort eingegeben.</p>";
        break;
    }
    html += d;
    html += '<details class="solution" ' + (r.needsSelf || r.kind !== "ai" ? "open" : "") + "><summary>Musterlösung</summary><div class='sol'>" + U.rich(q.solution, untrusted) + "</div></details>";
    if (q.explanation) html += '<details class="explanation"' + (r.pct < E.PASS ? " open" : "") + "><summary>Erklärung</summary><div class='sol'>" + U.rich(q.explanation, untrusted) + "</div></details>";
    if (r.needsSelf) {
      html += '<div class="selfassess"><div class="sub">Vergleichen Sie Ihre Antwort mit der Musterlösung und vergeben Sie Teilpunkte.</div>';
      var crit = (q.keywords || []).map(function (k) { return String(k).split("|")[0].trim(); }).filter(Boolean);
      if (crit.length && (r.kind === "keywords" || r.kind === "sql")) {
        var found = r.found || [];
        html += '<div class="rubricself"><div class="small muted">Bewertungsraster – was hat Ihre Lösung (sinngemäß) richtig umgesetzt?</div><div class="checks">' +
          crit.map(function (k, i) { return '<label class="check"><input type="checkbox" data-rubchk="' + i + '"' + (found.indexOf(k) >= 0 ? " checked" : "") + "> " + U.esc(k) + "</label>"; }).join("") + "</div>" +
          '<div class="row"><label class="small">Punkte <input class="input short" type="number" data-selfpts min="0" max="' + r.max + '" step="0.5" value="' + U.fmtNum(r.prelim != null ? r.prelim : r.points, 1).replace(",", ".") + '"> von ' + U.fmtNum(r.max, 1) + "</label>" +
          '<button type="button" class="btn small primary" data-act="selfpts">Punkte übernehmen</button></div></div>';
      }
      html += '<div class="btnrow"><span class="small muted">oder pauschal:</span>' +
        SELF_LEVELS.map(function (l, i) { return '<button type="button" class="btn small" data-self="' + l + '"><kbd>' + (i + 1) + "</kbd> " + Math.round(l * 100) + " %</button>"; }).join("") +
        "</div></div>";
    }
    return html + "</div>";
  };

  /** Bewertungsraster mit Teilpunkten (SQL) */
  UI.rubricHtml = function (items, r) {
    return '<details class="rubric" open><summary><strong>Teilpunkte nach Bewertungsraster</strong> <span class="muted small">(' + U.fmtNum(r.points, 1) + " von " + U.fmtNum(r.max, 1) + " Punkten – nicht exakt richtige Lösungen erhalten höchstens 75 %)</span></summary>" +
      '<table class="list rubrictab"><tbody>' + items.map(function (it) {
        var cls = it.score >= 0.99 ? "ok" : it.score > 0 ? "part" : "miss";
        var sym = cls === "ok" ? "✓" : cls === "part" ? "◐" : "✗";
        return '<tr class="' + cls + '"><td class="sym">' + sym + "</td><td>" + U.esc(it.label) + (it.detail ? '<div class="muted small">' + U.esc(it.detail) + "</div>" : "") + '</td><td class="num small">' + Math.round(it.score * 100) + " %</td></tr>";
      }).join("") + "</tbody></table></details>";
  };

  /* ---------------------------------------------- Code-Editor (Textarea) */

  UI.codeEditor = function (ta) {
    ta.addEventListener("keydown", function (ev) {
      if (ev.key === "Tab" && !ev.ctrlKey && !ev.altKey && !ev.metaKey) {
        if (ta.readOnly) return;
        ev.preventDefault();
        var v = ta.value, s = ta.selectionStart, e = ta.selectionEnd;
        var IND = "    ";
        if (s === e && !ev.shiftKey) {
          ta.value = v.slice(0, s) + IND + v.slice(e);
          ta.selectionStart = ta.selectionEnd = s + IND.length;
        } else {
          var ls = v.lastIndexOf("\n", s - 1) + 1;
          var block = v.slice(ls, e);
          var lines = block.split("\n");
          var out = lines.map(function (l) { return ev.shiftKey ? l.replace(/^( {1,4}|\t)/, "") : IND + l; });
          var nb = out.join("\n");
          ta.value = v.slice(0, ls) + nb + v.slice(e);
          ta.selectionStart = ev.shiftKey ? Math.max(ls, s - (lines[0].length - out[0].length)) : s + IND.length;
          ta.selectionEnd = ls + nb.length;
        }
        ta.dispatchEvent(new Event("input"));
      } else if (ev.key === "Enter" && !ev.ctrlKey && !ev.metaKey && !ev.shiftKey) {
        // Einrückung der aktuellen Zeile übernehmen
        var v2 = ta.value, p = ta.selectionStart;
        var lineStart = v2.lastIndexOf("\n", p - 1) + 1;
        var indent = (/^[ \t]*/.exec(v2.slice(lineStart, p)) || [""])[0];
        if (indent) {
          ev.preventDefault();
          ta.value = v2.slice(0, p) + "\n" + indent + v2.slice(ta.selectionEnd);
          ta.selectionStart = ta.selectionEnd = p + 1 + indent.length;
          ta.dispatchEvent(new Event("input"));
        }
      }
    });
  };

  /* ================================================================ Tutor */

  App.tutorHistory = {};

  App.Tutor = function (box, q, getAnswer) {
    this.box = box; this.q = q; this.getAnswer = getAnswer;
    var key = q.id || "x";
    this.hist = App.tutorHistory[key] = App.tutorHistory[key] || [];
    this.render();
  };
  App.Tutor.prototype.render = function () {
    var self = this;
    if (!App.ai.available()) { this.box.innerHTML = '<div class="tutor">' + UI.noKeyNotice("Der KI-Tutor") + "</div>"; return; }
    this.box.innerHTML = '<div class="tutor"><div class="tutor-head"><strong>KI-Tutor</strong> <span class="muted small">kennt Aufgabe, Musterlösung und Ihre Antwort</span>' +
      '<button type="button" class="icon-btn" data-act="close" aria-label="Tutor schließen">✕</button></div>' +
      '<div class="tlog" aria-live="polite"></div>' +
      '<div class="tquick">' + ["Erklär mir die Musterlösung Schritt für Schritt.", "Wo liegt der Fehler in meiner Antwort?", "Gib mir einen Tipp, ohne die Lösung zu verraten.", "Erklär das Grundkonzept mit einem Alltagsbeispiel."]
        .map(function (t) { return '<button type="button" class="btn small ghost" data-q="' + U.esc(t) + '">' + U.esc(t) + "</button>"; }).join("") + "</div>" +
      '<form class="tform"><textarea class="input" rows="2" placeholder="Frage an den Tutor … (Strg+Enter senden)" aria-label="Nachricht an den Tutor"></textarea>' +
      '<div class="btnrow"><button class="btn primary small" type="submit">Senden</button><button class="btn small ghost hidden" type="button" data-act="stop">Abbrechen</button></div></form></div>';
    this.log = UI.$(".tlog", this.box);
    this.ta = UI.$("textarea", this.box);
    this.renderLog();
    UI.$("form", this.box).addEventListener("submit", function (ev) { ev.preventDefault(); self.send(self.ta.value); });
    this.ta.addEventListener("keydown", function (ev) {
      if (ev.key === "Enter" && (ev.ctrlKey || ev.metaKey)) { ev.preventDefault(); ev.stopPropagation(); self.send(self.ta.value); }
    });
    UI.$$("[data-q]", this.box).forEach(function (b) { b.addEventListener("click", function () { self.send(b.getAttribute("data-q")); }); });
    UI.$('[data-act="close"]', this.box).addEventListener("click", function () { self.box.innerHTML = ""; });
    UI.$('[data-act="stop"]', this.box).addEventListener("click", function () { if (self.ctrl) self.ctrl.abort(); });
    setTimeout(function () { try { self.ta.focus({ preventScroll: true }); } catch (e) { /* ignore */ } }, 30);
  };
  App.Tutor.prototype.renderLog = function (pending, error) {
    var html = this.hist.map(function (m) {
      return '<div class="msg ' + m.role + '"><div class="bubble">' + (m.role === "assistant" ? U.formatAI(m.content) : U.esc(m.content).replace(/\n/g, "<br>")) + "</div></div>";
    }).join("");
    if (pending) html += '<div class="msg assistant"><div class="bubble muted"><span class="spinner"></span> denkt nach …</div></div>';
    if (error) html += '<div class="notice error">' + U.esc(error) + "</div>";
    if (!html) html = '<div class="muted small">Stellen Sie eine Frage oder wählen Sie einen Vorschlag.</div>';
    this.log.innerHTML = html;
    this.log.scrollTop = this.log.scrollHeight;
  };
  App.Tutor.prototype.send = async function (text) {
    text = String(text || "").trim();
    if (!text || this.busy) return;
    var self = this;
    this.busy = true;
    this.hist.push({ role: "user", content: text });
    this.ta.value = "";
    this.renderLog(true);
    var stop = UI.$('[data-act="stop"]', this.box);
    stop.classList.remove("hidden");
    this.ctrl = new AbortController();
    try {
      var reply = await App.ai.tutor(this.q, this.getAnswer(), this.hist.slice(), this.ctrl.signal);
      this.hist.push({ role: "assistant", content: reply || "(leere Antwort)" });
      this.renderLog();
    } catch (e) {
      this.hist.pop();
      this.ta.value = text;
      this.renderLog(false, e.message);
    } finally {
      this.busy = false;
      if (stop.isConnected) stop.classList.add("hidden");
      void self;
    }
  };

  /* ======================================================== Lern-Session */

  /**
   * Führt eine Übungssession durch.
   * opts: {title, onExit(), record (default true), endless: fn() → nächste Frage, backHref}
   */
  App.Session = function (container, questions, opts) {
    this.c = container;
    this.qs = questions.slice();
    this.opts = opts || {};
    this.idx = 0;
    this.results = [];
    this.start();
  };
  App.Session.prototype.start = function () {
    if (!this.qs.length) {
      this.c.innerHTML = '<div class="card"><h2>' + U.esc(this.opts.title || "Training") + '</h2><p class="muted">Für diese Auswahl gibt es keine Aufgaben. Passen Sie die Filter an.</p>' +
        '<a class="btn" href="' + (this.opts.backHref || "#/train") + '">Zurück</a></div>';
      return;
    }
    this.show();
  };
  App.Session.prototype.show = function () {
    var self = this, q = this.qs[this.idx];
    var done = this.results.filter(Boolean);
    var pts = U.sum(done, function (r) { return r.points; }), max = U.sum(done, function (r) { return r.max; });
    var total = this.opts.totalHint ? Math.max(this.opts.totalHint, this.qs.length) : this.opts.endless ? null : this.qs.length;
    this.c.innerHTML = '<div class="session"><div class="sess-head"><div><h2>' + U.esc(this.opts.title || "Training") + "</h2>" +
      '<div class="muted small">' + (total ? "Aufgabe " + (this.idx + 1) + " von " + total : "Aufgabe " + (this.idx + 1)) +
      (max ? " · bisher " + U.fmtNum(pts, 1) + " / " + U.fmtNum(max, 1) + " Punkte (" + U.pct(pts / max) + ")" : "") + "</div></div>" +
      '<button type="button" class="btn ghost small" data-act="end">' + (this.opts.endless ? "Beenden" : "Session beenden") + "</button></div>" +
      (total ? UI.bar(this.idx / total, "accent") : "") +
      '<div class="sess-card"></div><div class="sess-next btnrow"></div></div>';
    this.card = new QCard(q, {
      mode: "train", number: null,
      onGraded: function (r) { self.graded(r); },
    });
    UI.$(".sess-card", this.c).appendChild(this.card.el);
    UI.$('[data-act="end"]', this.c).addEventListener("click", function () { self.finish(); });
    if (App.timebudget) App.timebudget.sessionShow(this, q); // Zeitbudget (timebudget.js)
    this.card.focus();
    App.keys.set({
      digit: function (n) { return self.card.digit(n); },
      enter: function () {
        if (self.card.result && self.card.result.final) self.next();
        else if (!self.card.result) self.card.check();
        return true;
      },
      esc: function () { return self.card.closeTutor(); },
    });
    try { root.scrollTo({ top: 0 }); } catch (e) { /* ignore */ }
  };
  App.Session.prototype.graded = function (r) {
    var self = this, q = this.qs[this.idx];
    this.results[this.idx] = r;
    if (App.timebudget) App.timebudget.sessionGraded(this, this.idx);
    if (this.opts.record !== false) App.store.recordAttempt(q, r);
    if (this.opts.onAttempt) this.opts.onAttempt(q, r);
    var last = !this.opts.endless && !this.opts.nextQuestion && this.idx >= this.qs.length - 1;
    var nx = UI.$(".sess-next", this.c);
    nx.innerHTML = '<button type="button" class="btn primary" data-act="next">' + (last ? "Zur Auswertung" : "Weiter") + " <kbd>Enter</kbd></button>";
    var b = UI.$('[data-act="next"]', nx);
    b.addEventListener("click", function () { self.next(); });
    try { b.focus({ preventScroll: true }); } catch (e) { /* ignore */ }
    try { nx.scrollIntoView({ block: "nearest", behavior: "smooth" }); } catch (e) { /* ignore */ }
  };
  App.Session.prototype.next = function () {
    if (this.opts.nextQuestion) {
      var aq = this.opts.nextQuestion(this.qs[this.idx], this.results[this.idx]);
      if (aq) { this.qs.push(aq); this.idx++; this.show(); }
      else this.finish();
      return;
    }
    if (this.opts.endless) {
      var nq = this.opts.endless();
      if (nq) { this.qs.push(nq); this.idx++; this.show(); }
      return;
    }
    if (this.idx < this.qs.length - 1) { this.idx++; this.show(); }
    else this.finish();
  };
  App.Session.prototype.finish = function () {
    var self = this;
    App.keys.clear();
    if (App.timebudget) App.timebudget.sessionStop(this);
    var rows = this.qs.map(function (q, i) { return { q: q, r: self.results[i] }; }).filter(function (x) { return x.r; });
    if (this.opts.onFinish) { this.opts.onFinish(rows, this.c); return; }
    if (!rows.length) { if (this.opts.onExit) this.opts.onExit(); else location.hash = this.opts.backHref || "#/dashboard"; return; }
    var pts = U.sum(rows, function (x) { return x.r.points; }), max = U.sum(rows, function (x) { return x.r.max; });
    var ok = rows.filter(function (x) { return x.r.pct >= E.PASS; }).length;
    var byTopic = U.groupBy(rows, function (x) { return x.q.topic; });
    var wrong = rows.filter(function (x) { return x.r.pct < E.PASS; });
    var html = '<div class="card summary"><h2>Auswertung – ' + U.esc(this.opts.title || "Training") + "</h2>" +
      '<div class="kpis"><div class="kpi"><div class="kv">' + U.pct(max ? pts / max : 0) + '</div><div class="kl">Punkte-Quote</div></div>' +
      '<div class="kpi"><div class="kv">' + U.fmtNum(pts, 1) + " / " + U.fmtNum(max, 1) + '</div><div class="kl">Punkte</div></div>' +
      '<div class="kpi"><div class="kv">' + ok + " / " + rows.length + '</div><div class="kl">gelöst (≥ 80 %)</div></div></div>' +
      "<h3>Nach Thema</h3><table class='list'><thead><tr><th>Thema</th><th>Aufgaben</th><th>Quote</th></tr></thead><tbody>" +
      Object.keys(byTopic).map(function (t) {
        var xs = byTopic[t], p = U.sum(xs, function (x) { return x.r.points; }), m = U.sum(xs, function (x) { return x.r.max; });
        return "<tr><td><a href='#/topic/" + encodeURIComponent(t) + "'>" + U.esc(App.data.topicTitle(t)) + "</a></td><td>" + xs.length + "</td><td>" + UI.bar(m ? p / m : 0) + " " + U.pct(m ? p / m : 0) + "</td></tr>";
      }).join("") + "</tbody></table>" +
      (wrong.length ? "<h3>Nicht gelöst</h3><ul class='qlist'>" + wrong.map(function (x) {
        return "<li><span class='muted small'>" + U.fmtNum(x.r.points, 1) + "/" + x.r.max + " P.</span> " + U.esc(U.truncate(U.stripHtml(x.q.question), 140)) + "</li>";
      }).join("") + "</ul>" : "<p>Alle Aufgaben gelöst – stark!</p>") + (App.timebudget ? App.timebudget.sessionSummaryHtml(this) : "") +
      '<div class="btnrow">' + (wrong.length && !this.opts.endless ? '<button class="btn primary" data-act="retry">Nicht gelöste wiederholen (' + wrong.length + ")</button>" : "") +
      '<a class="btn" href="' + (this.opts.backHref || "#/train") + '">Neue Session</a><a class="btn ghost" href="#/dashboard">Zum Dashboard</a></div></div>';
    this.c.innerHTML = html;
    var rb = UI.$('[data-act="retry"]', this.c);
    if (rb) rb.addEventListener("click", function () {
      new App.Session(self.c, wrong.filter(function (x) { return !x.q._gen; }).map(function (x) { return x.q; }), { title: "Wiederholung", backHref: self.opts.backHref });
    });
    App.keys.set({ enter: function () { var b = UI.$(".summary .btn.primary", self.c) || UI.$(".summary a.btn", self.c); if (b) b.click(); return true; } });
    try { root.scrollTo({ top: 0 }); } catch (e) { /* ignore */ }
  };

  /* ================================================================ Charts */

  var CH = (App.charts = {});
  /** Balkendiagramm: data [{label, value, title}] */
  CH.bars = function (data, opts) {
    opts = opts || {};
    var W = 640, H = opts.height || 180, pl = 34, pb = 26, pt = 10, pr = 8;
    var max = opts.max || Math.max(1, Math.max.apply(null, data.map(function (d) { return d.value || 0; })));
    var n = data.length || 1, bw = (W - pl - pr) / n;
    var s = '<svg class="chart" viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + U.esc(opts.label || "Diagramm") + '">';
    var ticks = 4;
    for (var i = 0; i <= ticks; i++) {
      var y = pt + ((H - pt - pb) * i) / ticks, v = max * (1 - i / ticks);
      s += '<line class="grid" x1="' + pl + '" x2="' + (W - pr) + '" y1="' + y + '" y2="' + y + '"/>';
      s += '<text class="axis" x="' + (pl - 6) + '" y="' + (y + 4) + '" text-anchor="end">' + (opts.fmt ? opts.fmt(v) : Math.round(v)) + "</text>";
    }
    data.forEach(function (d, i) {
      var h = ((H - pt - pb) * (d.value || 0)) / max;
      var x = pl + i * bw + bw * 0.15, w = Math.max(1, bw * 0.7);
      s += '<rect class="barfill" x="' + x.toFixed(1) + '" y="' + (H - pb - h).toFixed(1) + '" width="' + w.toFixed(1) + '" height="' + Math.max(0, h).toFixed(1) + '" rx="2"><title>' + U.esc(d.title || d.label + ": " + d.value) + "</title></rect>";
      if (opts.labelEvery ? i % opts.labelEvery === 0 : true) s += '<text class="axis" x="' + (pl + i * bw + bw / 2).toFixed(1) + '" y="' + (H - 8) + '" text-anchor="middle">' + U.esc(d.label) + "</text>";
    });
    return s + "</svg>";
  };
  /** Linie (Werte 0..1, null = Lücke) */
  CH.line = function (data, opts) {
    opts = opts || {};
    var W = 640, H = opts.height || 180, pl = 40, pb = 26, pt = 10, pr = 8;
    var n = data.length, step = n > 1 ? (W - pl - pr) / (n - 1) : 0;
    var s = '<svg class="chart" viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + U.esc(opts.label || "Diagramm") + '">';
    [0, 0.25, 0.5, 0.75, 1].forEach(function (v) {
      var y = pt + (H - pt - pb) * (1 - v);
      s += '<line class="grid' + (v === 0.8 ? " pass" : "") + '" x1="' + pl + '" x2="' + (W - pr) + '" y1="' + y + '" y2="' + y + '"/>';
      s += '<text class="axis" x="' + (pl - 6) + '" y="' + (y + 4) + '" text-anchor="end">' + Math.round(v * 100) + "%</text>";
    });
    var yPass = pt + (H - pt - pb) * 0.2;
    s += '<line class="passline" x1="' + pl + '" x2="' + (W - pr) + '" y1="' + yPass + '" y2="' + yPass + '"/>';
    var path = "", pen = false;
    data.forEach(function (d, i) {
      var x = pl + i * step;
      if (opts.labelEvery ? i % opts.labelEvery === 0 : true) s += '<text class="axis" x="' + x.toFixed(1) + '" y="' + (H - 8) + '" text-anchor="middle">' + U.esc(d.label) + "</text>";
      if (d.value == null) { pen = false; return; }
      var y = pt + (H - pt - pb) * (1 - d.value);
      path += (pen ? "L" : "M") + x.toFixed(1) + " " + y.toFixed(1) + " ";
      pen = true;
    });
    s += '<path class="linepath" d="' + path + '"/>';
    data.forEach(function (d, i) {
      if (d.value == null) return;
      var x = pl + i * step, y = pt + (H - pt - pb) * (1 - d.value);
      s += '<circle class="dot" cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="3.5"><title>' + U.esc(d.title || d.label + ": " + Math.round(d.value * 100) + " %") + "</title></circle>";
    });
    return s + "</svg>";
  };
})(typeof window !== "undefined" ? window : globalThis);
