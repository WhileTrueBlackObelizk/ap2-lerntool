/* AP2-Lerntool – Lernsteuerung, Teil 1: Sicherheitsabfrage (Kalibrierung), Versuchslog,
   gefährliche Lücken, Zielzone. Erweitert Store und Fragekarte per Wrapping. */
(function (root) {
  "use strict";
  var App = (root.App = root.App || {});
  var U = App.util, E = App.engine, UI = App.ui, S = App.store, D = App.data;
  var V = (App.views = App.views || {});
  var ST = (App.steer = App.steer || {});

  /* =========================================== Persistenz: Key "calib" */

  // Versuchslog [{t, d, id, part, topic, cat, diff, p, c}] – Grundlage für Kalibrierung und Zielzone
  var CALIB_MAX = 3000;
  if (S.KEYS.indexOf("calib") < 0) S.KEYS.push("calib");
  function arr(x) { return Array.isArray(x) ? x : []; }
  var oLoad = S.load;
  S.load = function () {
    var st = oLoad.apply(S, arguments);
    st.calib = arr(S.read("calib", []));
    return st;
  };
  var oExport = S.exportData;
  S.exportData = function () {
    var d = oExport.apply(S, arguments);
    d.data.calib = S.state.calib || [];
    return d;
  };
  var oImport = S.importData;
  S.importData = function (json) {
    oImport.apply(S, arguments);
    S.state.calib = arr(json.data.calib);
    S.save("calib");
  };
  var oReset = S.resetProgress;
  S.resetProgress = function () {
    oReset.apply(S, arguments);
    S.state.calib = [];
    S.save("calib");
  };

  /* ===================================== Versuche mit Sicherheit speichern */

  var oRecord = S.recordAttempt;
  S.recordAttempt = function (q, result) {
    var day = U.today(), pr = S.state.progress;
    var prevBox = q && q.id && !q._gen && pr[q.id] ? pr[q.id].box : 0;
    oRecord.apply(S, arguments);
    if (!q) return;
    var pct = result && result.max ? result.points / result.max : 0;
    var conf = result && E.CONF.indexOf(result.conf) >= 0 ? result.conf : null;
    var log = S.state.calib || (S.state.calib = []);
    var row = { t: Date.now(), d: day, id: q._gen || q.id, part: q.part, topic: q.topic, cat: E.mixCategory(q), diff: Number(q.difficulty) || 2, p: Math.round(pct * 1000) / 1000, c: conf };
    if (q._gen) row.gen = 1;
    log.push(row);
    if (log.length > CALIB_MAX) S.state.calib = log.slice(-CALIB_MAX);
    S.save("calib");
    var e = !q._gen && q.id ? pr[q.id] : null;
    if (e && conf) { E.applyConfidence(e, prevBox, conf, pct, day); S.save("progress"); }
  };

  ST.calibOn = function () { return !S.state.settings.calibOff; };
  ST.zone = function () { return E.zoneByCategory(S.state.calib || []); };
  ST.dangerQuestions = function () {
    return E.dangerIds(S.state.progress).map(function (id) { return D.questionById[id]; }).filter(Boolean);
  };

  /* ========================================= Fragekarte: Sicherheitsabfrage */

  var QP = App.QCard.prototype;
  var ICON = { s: "✓", u: "≈", g: "?" };
  function confActive(card) { return card.mode === "train" && !card.result && ST.calibOn(); }

  var oActions = QP.renderActions;
  QP.renderActions = function () {
    oActions.apply(this, arguments);
    if (!confActive(this)) return;
    var self = this, box = UI.$(".qactions", this.el), chk = UI.$('[data-act="check"]', box);
    if (!chk) return;
    var ask = !!this.confAsk;
    var row = UI.h('<div class="confrow' + (ask ? " ask" : "") + '" role="group" tabindex="-1" aria-label="Prüfen – wie sicher bist du?">' +
      '<span class="conflabel">Prüfen – wie sicher?</span>' +
      E.CONF.map(function (c, i) {
        return '<button type="button" class="btn conf conf-' + c + (i === 0 ? " primary" : "") + '" data-conf="' + c + '">' +
          '<span aria-hidden="true">' + ICON[c] + "</span> " + E.CONF_LABEL[c] + (ask ? " <kbd>" + (i + 1) + "</kbd>" : "") + "</button>";
      }).join("") +
      '<span class="confhint muted small">' + (ask ? "Taste <kbd>1</kbd>–<kbd>3</kbd> · <kbd>Enter</kbd> = ohne Angabe" : "oder <kbd>Enter</kbd>, dann <kbd>1</kbd>–<kbd>3</kbd>") + "</span></div>");
    box.replaceChild(row, chk);
    UI.$$("[data-conf]", row).forEach(function (b) {
      b.addEventListener("click", function () { self.check(b.getAttribute("data-conf")); });
    });
  };

  var oCheck = QP.check;
  QP.check = function (conf) {
    if (this.busy || this.result) return;
    var self = this;
    if (confActive(this) && E.CONF.indexOf(conf) < 0) {
      if (!this.confAsk) {
        // erst Enter → Sicherheit abfragen (Ziffern 1–3), zweites Enter prüft ohne Angabe
        this.confAsk = true;
        this.renderActions();
        var row = UI.$(".confrow", this.el);
        if (row) try { row.focus({ preventScroll: true }); } catch (e) { /* ignore */ }
        return;
      }
      conf = null;
    }
    this.conf = E.CONF.indexOf(conf) >= 0 ? conf : null;
    this.confAsk = false;
    UI.$$(".confrow button", this.el).forEach(function (b) { b.disabled = true; });
    var row2 = UI.$(".confrow", this.el);
    if (row2 && this.conf) row2.insertAdjacentHTML("beforeend", '<span class="spinner"></span>');
    return Promise.resolve(oCheck.call(this)).then(function () { if (!self.result) self.renderActions(); });
  };

  var oDigit = QP.digit;
  QP.digit = function (n) {
    if (this.confAsk && !this.result && n >= 1 && n <= 3) { this.check(E.CONF[n - 1]); return true; }
    return oDigit.apply(this, arguments);
  };

  var oSet = QP.setResult;
  QP.setResult = function (r) {
    if (r && this.mode === "train" && this.conf && r.conf == null) r.conf = this.conf;
    oSet.apply(this, arguments);
    if (r && r.final && r.conf) {
      var box = UI.$(".qresult", this.el);
      if (box) box.insertAdjacentHTML("afterbegin", ST.confNote(r.conf, r.pct >= E.PASS));
    }
  };

  ST.confNote = function (c, ok) {
    var cls = "info", t;
    if (c === "s" && !ok) { cls = "bad"; t = "<strong>Sicher, aber falsch</strong> – eine gefährliche Lücke. Die Aufgabe kommt mit Vorrang zurück in Fach 1 und steht auf der Liste <a href='#/danger'>Gefährliche Lücken</a>."; }
    else if (c === "g" && ok) { cls = "mid"; t = "<strong>Geraten, aber richtig</strong> – zählt nur halb als gemeistert und kommt morgen wieder."; }
    else if (c === "u" && ok) { cls = "good"; t = "<strong>Unsicher, aber richtig</strong> – du kannst mehr, als du denkst."; }
    else if (c === "s") { cls = "good"; t = "<strong>Sicher und richtig</strong> – gut kalibriert."; }
    else t = "<strong>" + U.esc(E.CONF_LABEL[c]) + " und nicht gelöst</strong> – richtig eingeschätzt, die Aufgabe kommt bald wieder.";
    return '<div class="confnote ' + cls + '">' + t + "</div>";
  };

  /* ============================================ Ansicht: Kalibrierung */

  function pct(a, b) { return b ? U.pct(a / b) : "–"; }

  V.calib = function (c) {
    var st = S.state, log = st.calib || [];
    var cs = E.calibStats(log);
    var zone = ST.zone();
    var dangers = ST.dangerQuestions();
    var html = '<div class="page-head"><h1>Kalibrierung</h1><p class="muted">Vor jedem Prüfen gibst du an, wie sicher du bist. Hier siehst du, wo deine Einschätzung stimmt – und wo du dich über- oder unterschätzt.</p></div>';
    html += '<div class="card row between wrap"><label class="check"><input type="checkbox" data-act="toggle"' + (ST.calibOn() ? " checked" : "") + '> Sicherheitsabfrage beim Üben anzeigen</label>' +
      '<span class="muted small">Klick auf <strong>✓ sicher</strong> / <strong>≈ unsicher</strong> / <strong>? geraten</strong> – oder <kbd>Enter</kbd>, dann <kbd>1</kbd>–<kbd>3</kbd>.</span></div>';

    var verdict = { over: ["bad", "Du überschätzt dich: Bei „sicher“ liegst du unter 80 %. Erst prüfen, dann sicher sein."],
      under: ["mid", "Du unterschätzt dich: Was du als unsicher oder geraten markierst, stimmt meistens. Trau dir mehr zu."],
      ok: ["good", "Gut kalibriert: Deine Sicherheit passt zu deinen Ergebnissen."] }[cs.verdict];
    html += '<div class="grid kpi3">' + E.CONF.map(function (k) {
      var b = cs.by[k];
      return '<div class="card kpi-card calib-' + k + '"><div class="kl">' + ICON[k] + " " + U.esc(E.CONF_LABEL[k]) + '</div><div class="kv">' + pct(b.ok, b.n) + '</div>' + UI.bar(b.n ? b.ok / b.n : 0) +
        '<div class="muted small">' + b.ok + " von " + b.n + " richtig" + (k === "s" ? " · Ziel ≥ 90 %" : k === "g" ? " · zählt nur halb" : "") + "</div></div>";
    }).join("") + "</div>";
    if (verdict) html += '<div class="notice ' + verdict[0] + '">' + verdict[1] + "</div>";
    else html += '<div class="notice">Noch zu wenige Angaben (' + cs.total + '). Übe mit Sicherheitsabfrage, dann erscheint hier deine Auswertung.</div>';

    html += '<div class="grid two">';
    html += '<div class="card"><h3>Überschätzt <span class="muted small">(sicher, aber falsch)</span></h3>' + (cs.over.length ? '<table class="list compact"><thead><tr><th>Thema</th><th class="num">sicher</th><th class="num">davon falsch</th><th></th></tr></thead><tbody>' + cs.over.slice(0, 10).map(function (t) {
      return "<tr><td>" + U.esc(D.topicTitle(t.topic)) + "</td><td class='num'>" + t.sure + "</td><td class='num bad-t'>" + t.sureWrong + " (" + pct(t.sureWrong, t.sure) + ")</td><td><button class='btn small' data-topic='" + U.esc(t.topic) + "'>Üben</button></td></tr>";
    }).join("") + "</tbody></table>" : '<p class="muted small">Keine – bisher war jedes „sicher“ auch richtig.</p>') + "</div>";
    html += '<div class="card"><h3>Unterschätzt <span class="muted small">(unsicher/geraten, aber meist richtig)</span></h3>' + (cs.under.length ? '<table class="list compact"><thead><tr><th>Thema</th><th class="num">unsicher/geraten</th><th class="num">davon richtig</th></tr></thead><tbody>' + cs.under.slice(0, 10).map(function (t) {
      return "<tr><td>" + U.esc(D.topicTitle(t.topic)) + "</td><td class='num'>" + t.unsure + "</td><td class='num good-t'>" + t.unsureRight + " (" + pct(t.unsureRight, t.unsure) + ")</td></tr>";
    }).join("") + "</tbody></table>" : '<p class="muted small">Noch keine Themen, in denen du dich deutlich unterschätzt (ab 3 Angaben, ≥ 75 % richtig).</p>') + "</div>";
    html += "</div>";

    html += '<div class="card"><div class="row between"><h3>Gefährliche Lücken</h3><a class="btn small" href="#/danger">Liste öffnen (' + dangers.length + ")</a></div>" +
      '<p class="muted small">Aufgaben, bei denen du sicher warst und trotzdem falsch lagst. Sie kommen mit Vorrang zurück, bis du sie wieder richtig löst.</p></div>';

    html += '<div class="card"><h3>Zielzone je Aufgabenart</h3><p class="muted small">Die Auswahl hält deine Trefferquote bei 70–85 %: darüber kommen schwerere Level, darunter leichtere (Basis: letzte ' + E.ZONE.window + ' Versuche je Art).</p>' +
      '<table class="list compact"><thead><tr><th>Art</th><th class="num">Versuche</th><th class="num">Trefferquote</th><th>aktuell</th><th>als Nächstes</th></tr></thead><tbody>' +
      E.MIX_CATS.map(function (k) {
        var z = zone[k];
        return "<tr><td>" + U.esc(E.MIX_LABEL[k]) + "</td><td class='num'>" + z.n + (z.fallback ? " <span class='muted small'>(gesamt)</span>" : "") + "</td><td class='num'>" + (z.rate == null ? "–" : '<span class="' + (z.dir > 0 ? "good-t" : z.dir < 0 ? "bad-t" : "") + '">' + U.pct(z.rate) + "</span>") + "</td><td>" + UI.diff(z.level) + "</td><td>" + UI.diff(z.target) +
          (z.dir > 0 ? " <span class='small good-t'>↑ schwerer</span>" : z.dir < 0 ? " <span class='small bad-t'>↓ leichter</span>" : "") + "</td></tr>";
      }).join("") + "</tbody></table></div>";

    var recent = log.filter(function (x) { return x.c; }).slice(-12).reverse();
    html += '<div class="card"><h3>Letzte Angaben</h3>' + (recent.length ? '<table class="list compact"><tbody>' + recent.map(function (x) {
      var ok = x.p >= E.PASS;
      var flag = x.c === "s" && !ok ? "<span class='bad-t'>überschätzt</span>" : x.c !== "s" && ok ? "<span class='mid-t'>unterschätzt</span>" : "<span class='good-t'>passt</span>";
      return "<tr><td class='small muted'>" + U.esc(U.fmtDate(x.d)) + "</td><td>" + U.esc(D.topicTitle(x.topic)) + "</td><td>" + ICON[x.c] + " " + E.CONF_LABEL[x.c] + "</td><td class='num'>" + U.pct(x.p) + "</td><td class='small'>" + flag + "</td></tr>";
    }).join("") + "</tbody></table>" : '<p class="muted small">Noch keine.</p>') + "</div>";
    c.innerHTML = html;

    UI.$('[data-act="toggle"]', c).addEventListener("change", function () {
      st.settings.calibOff = !this.checked; S.save("settings");
      UI.toast(this.checked ? "Sicherheitsabfrage an" : "Sicherheitsabfrage aus");
    });
    UI.$$("[data-topic]", c).forEach(function (b) { b.addEventListener("click", function () { App.practiceTopic(b.getAttribute("data-topic")); }); });
  };

  /* ========================================= Ansicht: Gefährliche Lücken */

  V.danger = function (c) {
    var pr = S.state.progress;
    var list = ST.dangerQuestions();
    var html = '<div class="page-head"><div class="crumbs"><a href="#/calib">Kalibrierung</a> › Gefährliche Lücken</div><h1>Gefährliche Lücken</h1>' +
      '<p class="muted">Hier landet jede Aufgabe, die du als <strong>sicher</strong> markiert und trotzdem nicht gelöst hast. Solche Irrtümer sind in der Prüfung am teuersten, weil du sie nicht nachprüfst. Löst du sie wieder richtig (nicht geraten), fliegen sie raus.</p></div>';
    html += '<div class="card"><div class="row between"><strong>' + list.length + " Aufgabe" + (list.length === 1 ? "" : "n") + '</strong><button class="btn primary" data-act="all"' + (list.length ? "" : " disabled") + ">Alle üben</button></div></div>";
    html += '<div class="card">' + (list.length ? '<table class="list"><thead><tr><th>Aufgabe</th><th>Thema</th><th>seit</th><th class="num">Irrtümer</th><th></th></tr></thead><tbody>' + list.map(function (q) {
      var dg = pr[q.id].danger;
      return "<tr><td>" + U.esc(U.truncate(U.stripHtml(q.question), 120)) + " " + UI.badge(U.TYPE_LABEL[q.type] || q.type, "type") + "</td><td>" + UI.partBadge(q.part) + " " + U.esc(D.topicTitle(q.topic)) + "</td><td class='small'>" + U.esc(U.fmtDate(dg.since)) + "</td><td class='num'>" + dg.n +
        '</td><td><a class="btn small" href="#/q/' + encodeURIComponent(q.id) + '">Üben</a></td></tr>';
    }).join("") + "</tbody></table>" : '<p class="muted">Keine gefährlichen Lücken – stark.</p>') + "</div>";
    c.innerHTML = html;
    var b = UI.$('[data-act="all"]', c);
    b.addEventListener("click", function () { ST.startDanger("#/danger"); });
  };

  ST.startDanger = function (back) {
    var qs = ST.dangerQuestions();
    if (!qs.length) { UI.toast("Keine gefährlichen Lücken – stark!", "ok"); return false; }
    var mixed = E.interleave(qs);
    // was sich nicht verschränken lässt (z. B. alles aus einem Thema), kommt hinten dran
    mixed = mixed.concat(qs.filter(function (q) { return mixed.indexOf(q) < 0; }));
    App.startSession(mixed.slice(0, 30), { title: "Gefährliche Lücken", backHref: back || "#/danger" });
    return true;
  };
})(typeof window !== "undefined" ? window : globalThis);
