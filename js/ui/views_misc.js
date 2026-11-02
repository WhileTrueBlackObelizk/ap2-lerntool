/* AP2-Lerntool – KI-Studio, Statistik, Einstellungen */
(function (root) {
  "use strict";
  var App = (root.App = root.App || {});
  var U = App.util, E = App.engine, UI = App.ui, S = App.store, D = App.data;
  var V = (App.views = App.views || {});

  /* ============================================================ KI-Studio */

  var aiJob = null; // laufende Generierung (überlebt Routenwechsel nicht)

  V.ai = function (c) {
    var st = S.state, has = App.ai.available();
    var html = '<div class="page-head"><h1>KI-Studio</h1><p class="muted">Neue Aufgaben und komplette Prüfungen mit Claude erzeugen. Modell: <strong>' + U.esc(App.ai.model()) + "</strong> · <a href='#/settings'>ändern</a></p></div>";
    if (!has) html += UI.noKeyNotice("Das KI-Studio");
    html += '<div class="grid two">';
    html += '<form class="card" id="genq"><h2>KI-Aufgabengenerator</h2><p class="muted small">Claude erhält das Datenschema, zwei Beispielaufgaben und den Lernzettel des Themas. Jede Aufgabe wird validiert, SQL-Aufgaben werden testweise ausgeführt; fehlerhafte werden verworfen.</p>' +
      '<label>Themen <span class="muted small">(Mehrfachauswahl mit Strg/⌘)</span><select class="input" name="topics" multiple size="8" required>' +
      U.PARTS.map(function (p) {
        var ts = D.topics.filter(function (t) { return t.part === p; });
        return ts.length ? '<optgroup label="' + U.esc(U.PART_SHORT[p]) + '">' + ts.map(function (t) { return '<option value="' + U.esc(t.id) + '">' + U.esc(t.title) + "</option>"; }).join("") + "</optgroup>" : "";
      }).join("") + "</select></label>" +
      '<div class="row wrap"><label>Typ <select class="input" name="type"><option value="">gemischt</option>' + U.TYPES.map(function (t) { return '<option value="' + t + '">' + U.TYPE_LABEL[t] + "</option>"; }).join("") + "</select></label>" +
      '<label>Schwierigkeit <select class="input" name="diff"><option value="0">gemischt</option><option value="1">leicht</option><option value="2">mittel</option><option value="3">schwer</option></select></label>' +
      '<label>Anzahl je Thema <input class="input short" type="number" name="count" min="1" max="10" value="3"></label></div>' +
      '<div class="btnrow"><button class="btn primary" type="submit"' + (has ? "" : " disabled") + '>Aufgaben generieren</button><button class="btn ghost hidden" type="button" data-act="abort">Abbrechen</button></div><div class="genout"></div></form>';
    html += '<form class="card" id="genx"><h2>KI-Prüfung</h2><p class="muted small">Komplette neue Simulation mit Ausgangssituation und Aufgaben (Summe 100 Punkte), gespeichert unter „Prüfung“. Dauert meist 1–3 Minuten.</p>' +
      '<label>Prüfungsbereich <select class="input" name="part"><option value="GA1">GA1 – Planen eines Softwareproduktes</option><option value="GA2">GA2 – Entwicklung und Umsetzung von Algorithmen</option></select></label>' +
      '<label>Wunsch-Szenario (optional) <input class="input" name="hint" maxlength="300" placeholder="z. B. Ticketsystem für einen Stadtwerke-Kundenservice"></label>' +
      '<div class="btnrow"><button class="btn primary" type="submit"' + (has ? "" : " disabled") + '>Prüfung generieren</button><button class="btn ghost hidden" type="button" data-act="abort">Abbrechen</button></div><div class="genout"></div></form>';
    html += "</div>";

    // Listen
    var aiq = st.aiQuestions;
    var byT = U.groupBy(aiq, function (q) { return q.topic; });
    html += '<section class="card"><div class="row between"><h2>KI-Aufgaben im Pool (' + aiq.length + ")</h2>" + (aiq.length ? '<button class="btn ghost small" data-act="delall">Alle löschen</button>' : "") + "</div>" +
      (aiq.length ? Object.keys(byT).map(function (tid) {
        return '<details><summary><strong>' + U.esc(D.topicTitle(tid)) + "</strong> (" + byT[tid].length + ')</summary><ul class="qlist">' + byT[tid].map(function (q) {
          return '<li><a href="#/q/' + encodeURIComponent(q.id) + '">' + U.esc(U.truncate(U.stripHtml(q.question), 140)) + "</a> " + UI.badge(U.TYPE_LABEL[q.type], "type") + UI.diff(q.difficulty) +
            ' <button class="icon-btn" data-delq="' + U.esc(q.id) + '" aria-label="Aufgabe löschen" title="Löschen">✕</button></li>';
        }).join("") + "</ul></details>";
      }).join("") : '<p class="muted">Noch keine KI-Aufgaben. Sie erscheinen im Training mit dem Kennzeichen „KI“.</p>') + "</section>";
    var ax = st.aiExams;
    html += '<section class="card"><h2>KI-Prüfungen (' + ax.length + ")</h2>" + (ax.length ? '<ul class="qlist">' + ax.map(function (x) {
      return "<li>" + UI.partBadge(x.part) + " <strong>" + U.esc(x.title) + "</strong> <span class='muted small'>" + x.tasks.length + " Aufgaben · " + U.fmtDate((x.createdAt || "").slice(0, 10)) + '</span> <a class="btn small" href="#/exam">Zur Prüfung</a> <button class="icon-btn" data-delx="' + U.esc(x.id) + '" aria-label="Prüfung löschen" title="Löschen">✕</button></li>';
    }).join("") + "</ul>" : '<p class="muted">Noch keine KI-Prüfungen.</p>') + "</section>";
    c.innerHTML = html;

    // --- Aufgabengenerator
    var fq = UI.$("#genq", c), outQ = UI.$(".genout", fq);
    fq.addEventListener("submit", async function (ev) {
      ev.preventDefault();
      if (aiJob) return;
      var topics = Array.prototype.slice.call(fq.topics.selectedOptions).map(function (o) { return o.value; });
      if (!topics.length) { UI.toast("Bitte mindestens ein Thema wählen.", "error"); return; }
      var type = fq.type.value, diff = Number(fq.diff.value), count = U.clamp(Number(fq.count.value) || 3, 1, 10);
      var ctrl = new AbortController();
      aiJob = ctrl;
      var btn = UI.$('button[type="submit"]', fq), ab = UI.$('[data-act="abort"]', fq);
      btn.disabled = true; ab.classList.remove("hidden");
      ab.onclick = function () { ctrl.abort(); };
      var log = [];
      function show(extra) { outQ.innerHTML = '<ul class="genlog">' + log.join("") + "</ul>" + (extra || ""); }
      var total = 0;
      try {
        for (var i = 0; i < topics.length; i++) {
          var tid = topics[i];
          log.push('<li class="run"><span class="spinner"></span> ' + U.esc(D.topicTitle(tid)) + ": generiere " + count + " Aufgabe(n) …</li>");
          show();
          try {
            var r = await App.ai.generateQuestions({ topicId: tid, type: type, difficulty: diff, count: count, signal: ctrl.signal, onStatus: function (s) { log[log.length - 1] = '<li class="run"><span class="spinner"></span> ' + U.esc(s) + "</li>"; show(); } });
            r.accepted.forEach(function (q) { st.aiQuestions.push(q); });
            S.save("aiQuestions"); D.refresh();
            total += r.accepted.length;
            log[log.length - 1] = '<li class="ok">✓ ' + U.esc(D.topicTitle(tid)) + ": " + r.accepted.length + " übernommen" + (r.rejected.length ? ", " + r.rejected.length + " verworfen (" + U.esc(r.rejected.map(function (x) { return x.errors.join(", "); }).slice(0, 3).join(" | ")) + ")" : "") + (r.truncated ? " – Antwort war abgeschnitten" : "") + "</li>";
          } catch (e) {
            log[log.length - 1] = '<li class="err">✗ ' + U.esc(D.topicTitle(tid)) + ": " + U.esc(e.message) + "</li>";
            if (e.code === "abort" || e.code === "auth" || e.code === "nokey") break;
          }
          show();
        }
        show(total ? '<div class="btnrow"><button class="btn primary" type="button" data-act="practice">Neue KI-Aufgaben jetzt üben (' + total + ")</button><button class='btn ghost' type='button' data-act='reload'>Liste aktualisieren</button></div>" : "");
        var pb = UI.$('[data-act="practice"]', outQ);
        var fresh = st.aiQuestions.slice(-total);
        if (pb) pb.addEventListener("click", function () { App.startSession(fresh, { title: "KI-Aufgaben", backHref: "#/ai" }); });
        var rb = UI.$('[data-act="reload"]', outQ);
        if (rb) rb.addEventListener("click", function () { App.route(); });
      } finally {
        aiJob = null;
        if (btn.isConnected) { btn.disabled = false; ab.classList.add("hidden"); }
      }
    });

    // --- Prüfungsgenerator
    var fx = UI.$("#genx", c), outX = UI.$(".genout", fx);
    fx.addEventListener("submit", async function (ev) {
      ev.preventDefault();
      if (aiJob) return;
      var ctrl = new AbortController();
      aiJob = ctrl;
      var btn = UI.$('button[type="submit"]', fx), ab = UI.$('[data-act="abort"]', fx);
      btn.disabled = true; ab.classList.remove("hidden");
      ab.onclick = function () { ctrl.abort(); };
      var t0 = Date.now();
      var tick = setInterval(function () { var s = UI.$(".elapsed", outX); if (s) s.textContent = U.fmtDuration((Date.now() - t0) / 1000); }, 1000);
      outX.innerHTML = '<p><span class="spinner"></span> Claude erstellt die Prüfung … <span class="elapsed muted">0:00</span></p><p class="status muted small"></p>';
      try {
        var r = await App.ai.generateExam({ part: fx.part.value, hint: fx.hint.value, signal: ctrl.signal, onStatus: function (s) { var el = UI.$(".status", outX); if (el) el.textContent = s; } });
        st.aiExams.push(r.exam);
        S.save("aiExams"); D.refresh();
        outX.innerHTML = '<div class="notice ok">✓ „' + U.esc(r.exam.title) + "“ mit " + r.exam.tasks.length + " Aufgaben gespeichert" + (r.rejected.length ? " (" + r.rejected.length + " fehlerhafte Aufgaben verworfen, Punkte auf 100 skaliert)" : "") + '.</div><div class="btnrow"><a class="btn primary" href="#/exam">Zur Prüfungsübersicht</a></div>';
      } catch (e) {
        outX.innerHTML = '<div class="notice error">' + U.esc(e.message) + "</div>";
      } finally {
        clearInterval(tick);
        aiJob = null;
        if (btn.isConnected) { btn.disabled = false; ab.classList.add("hidden"); }
      }
    });

    UI.$$("[data-delq]", c).forEach(function (b) {
      b.addEventListener("click", function () {
        var id = b.getAttribute("data-delq");
        st.aiQuestions = st.aiQuestions.filter(function (q) { return q.id !== id; });
        S.save("aiQuestions"); D.refresh();
        b.closest("li").remove();
        UI.toast("KI-Aufgabe gelöscht.");
      });
    });
    UI.$$("[data-delx]", c).forEach(function (b) {
      b.addEventListener("click", function () {
        if (!UI.confirm("KI-Prüfung löschen?")) return;
        var id = b.getAttribute("data-delx");
        st.aiExams = st.aiExams.filter(function (x) { return x.id !== id; });
        S.save("aiExams"); D.refresh(); App.route();
      });
    });
    var da = UI.$('[data-act="delall"]', c);
    if (da) da.addEventListener("click", function () {
      if (!UI.confirm("Alle " + st.aiQuestions.length + " KI-Aufgaben löschen?")) return;
      st.aiQuestions = []; S.save("aiQuestions"); D.refresh(); App.route();
    });
    return function () { if (aiJob) { aiJob.abort(); aiJob = null; } };
  };

  /* ============================================================ Statistik */

  V.stats = function (c) {
    var st = S.state, day = U.today(), pr = st.progress;
    var days = [];
    for (var i = 29; i >= 0; i--) days.push(U.addDays(day, -i));
    var logDays = Object.keys(st.log).sort();
    var totalN = U.sum(logDays, function (d) { return st.log[d].n || 0; });
    var totalPts = U.sum(logDays, function (d) { return st.log[d].pts || 0; }), totalMax = U.sum(logDays, function (d) { return st.log[d].max || 0; });
    var active = logDays.filter(function (d) { return st.log[d].n > 0; }).length;
    var bars = days.map(function (d) { var l = st.log[d]; return { label: d.slice(8), value: l ? l.n : 0, title: U.fmtDate(d) + ": " + (l ? l.n : 0) + " Aufgaben" }; });
    var line = days.map(function (d) { var l = st.log[d]; return { label: d.slice(8), value: l && l.n ? (l.max ? l.pts / l.max : l.sum / l.n) : null, title: l && l.n ? U.fmtDate(d) + ": " + U.pct(l.max ? l.pts / l.max : l.sum / l.n) : "" }; });
    var exams = st.exams.slice();
    var html = '<div class="page-head"><h1>Statistik</h1></div>' +
      '<div class="grid kpi4"><div class="card kpi-card"><div class="kl">Aufgaben gesamt</div><div class="kv">' + totalN + '</div></div>' +
      '<div class="card kpi-card"><div class="kl">Punkte-Quote gesamt</div><div class="kv">' + U.pct(totalMax ? totalPts / totalMax : 0) + "</div></div>" +
      '<div class="card kpi-card"><div class="kl">Lerntage</div><div class="kv">' + active + '</div><div class="muted small">Streak: ' + E.streak(st.log, day) + " Tage</div></div>" +
      '<div class="card kpi-card"><div class="kl">Simulationen</div><div class="kv">' + exams.length + '</div><div class="muted small">' + (exams.length ? "Ø " + Math.round(U.sum(exams, function (x) { return x.points; }) / exams.length) + " Punkte" : "–") + "</div></div></div>" +
      '<div class="grid two"><div class="card"><h3>Aufgaben pro Tag (30 Tage)</h3>' + App.charts.bars(bars, { label: "Aufgaben pro Tag", labelEvery: 3 }) + "</div>" +
      '<div class="card"><h3>Erfolgsquote pro Tag</h3>' + App.charts.line(line, { label: "Erfolgsquote pro Tag", labelEvery: 3 }) + '<div class="muted small">Gestrichelte Linie: 80 %-Schwelle (Aufgabe gilt als gelöst)</div></div></div>';
    if (exams.length) {
      html += '<div class="card"><h3>Simulationsergebnisse</h3>' + App.charts.line(exams.slice(-20).map(function (x, i) { return { label: String(i + 1), value: x.points / 100, title: x.title + ": " + x.points + " P. (Note " + x.grade + ")" }; }), { label: "Simulationsergebnisse" }) +
        '<table class="list"><thead><tr><th>Datum</th><th>Prüfung</th><th>Bereich</th><th>Punkte</th><th>Note</th></tr></thead><tbody>' + exams.slice().reverse().map(function (h) {
          return "<tr><td>" + U.fmtDate(h.date) + "</td><td>" + U.esc(h.title) + "</td><td>" + UI.partBadge(h.part) + "</td><td class='num'>" + h.points + "</td><td>" + UI.gradeChip(h.grade) + "</td></tr>";
        }).join("") + "</tbody></table></div>";
    }
    html += '<div class="card"><h3>Ergebnisse je Thema</h3><table class="list"><thead><tr><th>Thema</th><th>Bereich</th><th>bearbeitet</th><th>Versuche</th><th>Ø letzter Versuch</th><th>Beherrschung</th></tr></thead><tbody>' +
      D.topics.map(function (t) {
        var qs = D.byTopic[t.id] || [];
        var att = 0, lastSum = 0, lastN = 0;
        qs.forEach(function (q) { var e = pr[q.id]; if (e) { att += e.attempts.length; var l = E.lastPct(e); if (l != null) { lastSum += l; lastN++; } } });
        var m = E.mastery(qs, pr);
        return '<tr><td><a href="#/topic/' + encodeURIComponent(t.id) + '">' + U.esc(t.title) + "</a></td><td>" + UI.partBadge(t.part) + "</td><td class='num'>" + lastN + " / " + qs.length + "</td><td class='num'>" + att + "</td><td class='num'>" + (lastN ? U.pct(lastSum / lastN) : "–") + "</td><td style='min-width:140px'>" + UI.bar(m) + ' <span class="small">' + U.pct(m) + "</span></td></tr>";
      }).join("") + "</tbody></table></div>";
    var gk = Object.keys(st.genStats);
    if (gk.length) {
      html += '<div class="card"><h3>Rechentrainer</h3><table class="list"><thead><tr><th>Generator</th><th>Aufgaben</th><th>richtig</th><th>Ø</th></tr></thead><tbody>' + gk.map(function (id) {
        var g = D.generators.filter(function (x) { return x.id === id; })[0], s = st.genStats[id];
        return "<tr><td>" + U.esc(g ? g.title : id) + "</td><td class='num'>" + s.n + "</td><td class='num'>" + s.ok + "</td><td class='num'>" + U.pct(s.sum / s.n) + "</td></tr>";
      }).join("") + "</tbody></table></div>";
    }
    c.innerHTML = html;
  };

  /* ======================================================== Einstellungen */

  V.settings = function (c) {
    var st = S.state, s = st.settings;
    var key = S.getApiKey();
    var bytes = 0;
    try { for (var k in root.localStorage) if (/^ap2\./.test(k)) bytes += (root.localStorage.getItem(k) || "").length * 2; } catch (e) { /* ignore */ }
    var html = '<div class="page-head"><h1>Einstellungen</h1></div>' +
      '<form class="card" id="fsettings"><h2>Lernen</h2><div class="row wrap">' +
      '<label>Prüfungstermin <input class="input" type="date" name="examDate" value="' + U.esc(s.examDate) + '" required></label>' +
      '<label>Tagesziel (Aufgaben) <input class="input short" type="number" name="dailyGoal" min="1" max="300" value="' + U.esc(s.dailyGoal) + '"></label>' +
      '<label>Darstellung <select class="input" name="theme"><option value="auto"' + (s.theme === "auto" ? " selected" : "") + '>System</option><option value="light"' + (s.theme === "light" ? " selected" : "") + '>Hell</option><option value="dark"' + (s.theme === "dark" ? " selected" : "") + ">Dunkel</option></select></label>" +
      '</div><div class="btnrow"><button class="btn primary" type="submit">Speichern</button></div></form>' +
      '<form class="card" id="fai" autocomplete="off"><h2>KI (Anthropic Claude)</h2>' +
      '<p class="muted small">Der API-Key wird ausschließlich lokal in diesem Browser (localStorage) gespeichert und nur direkt an <code>api.anthropic.com</code> gesendet. Er ist nicht Teil des Fortschritts-Exports. Nutzung verursacht Kosten auf deinem Anthropic-Konto.</p>' +
      '<label>API-Key <span class="row"><input class="input" type="password" name="apiKey" placeholder="sk-ant-…" value="' + U.esc(key) + '" autocomplete="off" spellcheck="false"><button class="btn ghost small" type="button" data-act="showkey">Anzeigen</button></span></label>' +
      '<label>Modell <select class="input" name="model">' + App.ai.MODELS.map(function (m) { return '<option value="' + m.id + '"' + (App.ai.model() === m.id ? " selected" : "") + ">" + U.esc(m.label) + "</option>"; }).join("") + "</select></label>" +
      '<div class="btnrow"><button class="btn primary" type="submit">Speichern</button><button class="btn" type="button" data-act="test">Verbindung testen</button><button class="btn ghost" type="button" data-act="delkey">Key entfernen</button></div><div class="testout"></div></form>' +
      '<div class="card" id="cardsettings"></div>' +
      '<div class="card"><h2>Daten</h2><p class="muted small">Fortschritt, Historie, KI-Aufgaben und Einstellungen (ohne API-Key) als JSON-Datei sichern oder auf einem anderen Gerät importieren. Belegter Speicher: ca. ' + U.fmtNum(bytes / 1024, 0) + " KB.</p>" +
      (S.saveFailed ? '<div class="notice error">Achtung: Der Browser-Speicher ist voll oder blockiert – Fortschritt wird ggf. nicht gespeichert. Bitte exportieren.</div>' : "") +
      '<div class="btnrow"><button class="btn" data-act="export">Fortschritt exportieren</button><label class="btn">Fortschritt importieren<input type="file" accept="application/json,.json" class="hidden" data-act="import"></label>' +
      '<button class="btn danger" data-act="reset">Fortschritt zurücksetzen</button></div></div>' +
      '<div class="card"><h2>Über</h2><p class="small">Datenbestand: ' + D.topics.length + " Themen · " + D.baseQuestions.length + " Aufgaben (+ " + st.aiQuestions.length + " KI) · " + D.baseExams.length + " Simulationen (+ " + st.aiExams.length + " KI) · " + D.generators.length + " Rechentrainer.</p>" +
      '<p class="small muted">SQL-Ausführung: sql.js 1.12.0 (SQLite/WebAssembly), lokal. Tastatur: <kbd>1</kbd>–<kbd>9</kbd> Option wählen, <kbd>Enter</kbd> prüfen/weiter, <kbd>Strg</kbd>+<kbd>Enter</kbd> im Textfeld prüfen, <kbd>Esc</kbd> Feld verlassen/Tutor schließen, <kbd>/</kbd> Suche.</p></div>';
    c.innerHTML = html;
    if (App.card) App.card.renderSettings(UI.$("#cardsettings", c));

    UI.$("#fsettings", c).addEventListener("submit", function (ev) {
      ev.preventDefault();
      var f = ev.target;
      if (!/^\d{4}-\d{2}-\d{2}$/.test(f.examDate.value)) { UI.toast("Ungültiges Datum.", "error"); return; }
      s.examDate = f.examDate.value;
      s.dailyGoal = U.clamp(Number(f.dailyGoal.value) || 20, 1, 300);
      s.theme = f.theme.value;
      S.save("settings");
      App.applyTheme();
      UI.toast("Einstellungen gespeichert.");
    });
    var fa = UI.$("#fai", c), out = UI.$(".testout", fa);
    fa.addEventListener("submit", function (ev) {
      ev.preventDefault();
      S.setApiKey(fa.apiKey.value.trim());
      s.model = fa.model.value; S.save("settings");
      App.updateAiBadge();
      UI.toast("KI-Einstellungen gespeichert.");
    });
    UI.$('[data-act="showkey"]', fa).addEventListener("click", function () {
      var show = fa.apiKey.type === "password";
      fa.apiKey.type = show ? "text" : "password";
      this.textContent = show ? "Verbergen" : "Anzeigen";
    });
    UI.$('[data-act="delkey"]', fa).addEventListener("click", function () {
      S.setApiKey(""); fa.apiKey.value = ""; App.updateAiBadge(); UI.toast("API-Key entfernt.");
    });
    UI.$('[data-act="test"]', fa).addEventListener("click", async function () {
      S.setApiKey(fa.apiKey.value.trim());
      s.model = fa.model.value; S.save("settings");
      App.updateAiBadge();
      out.innerHTML = '<p class="muted"><span class="spinner"></span> Teste Verbindung zu ' + U.esc(s.model) + " …</p>";
      try {
        var r = await App.ai.testConnection();
        out.innerHTML = '<div class="notice ok">✓ Verbindung erfolgreich (' + U.esc(r.model || s.model) + "). Antwort: „" + U.esc(U.truncate(r.text, 80)) + "“</div>";
      } catch (e) {
        out.innerHTML = '<div class="notice error">' + U.esc(e.message) + "</div>";
      }
    });
    UI.$('[data-act="export"]', c).addEventListener("click", function () {
      UI.download("ap2-lerntool-fortschritt-" + U.today() + ".json", JSON.stringify(S.exportData(), null, 1));
    });
    UI.$('[data-act="import"]', c).addEventListener("change", function (ev) {
      var file = ev.target.files && ev.target.files[0];
      if (!file) return;
      var rd = new FileReader();
      rd.onload = function () {
        try {
          var json = JSON.parse(rd.result);
          if (!UI.confirm("Import überschreibt den aktuellen Fortschritt in diesem Browser. Fortfahren?")) return;
          S.importData(json);
          D.refresh(); App.applyTheme();
          UI.toast("Import erfolgreich.");
          App.route();
        } catch (e) { UI.toast("Import fehlgeschlagen: " + e.message, "error"); }
      };
      rd.readAsText(file);
      ev.target.value = "";
    });
    UI.$('[data-act="reset"]', c).addEventListener("click", function () {
      if (!UI.confirm("Gesamten Lernfortschritt, Statistik und Prüfungshistorie unwiderruflich löschen?\n(KI-Aufgaben, Einstellungen und API-Key bleiben erhalten.)")) return;
      if (!UI.confirm("Wirklich zurücksetzen? Tipp: Vorher exportieren.")) return;
      S.resetProgress();
      UI.toast("Fortschritt zurückgesetzt.");
      App.route();
    });
  };
})(typeof window !== "undefined" ? window : globalThis);
