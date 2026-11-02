/* AP2-Lerntool – Lernprofil: Sicherheitsquote → IHK-Note → Rang, Verlauf und Aufstiegs-Meldungen */
(function (root) {
  "use strict";
  var App = (root.App = root.App || {});
  var U = App.util, E = App.engine, UI = App.ui, S = App.store, D = App.data;
  var V = (App.views = App.views || {});
  var P = (App.profile = {});

  /** Ränge entlang des IHK-Notenschlüssels (Quote in % → Note) */
  P.RANKS = [
    { grade: 6, min: 0, rank: "Einsteiger", roman: "I", text: "Du legst gerade los – jede gelöste Aufgabe zählt." },
    { grade: 5, min: 30, rank: "Lernender", roman: "II", text: "Die Grundlagen sitzen teilweise – dranbleiben." },
    { grade: 4, min: 50, rank: "Anwender", roman: "III", text: "Bestehensniveau erreicht (ab 50 %)." },
    { grade: 3, min: 67, rank: "Fortgeschritten", roman: "IV", text: "Solides Prüfungsniveau." },
    { grade: 2, min: 81, rank: "Profi", roman: "V", text: "Du beherrschst den Stoff sicher." },
    { grade: 1, min: 92, rank: "Meister", roman: "VI", text: "Prüfungsreif – jetzt nur noch wiederholen." },
  ];
  P.rankFor = function (pct) {
    var p = Math.round((pct || 0) * 100), r = P.RANKS[0];
    P.RANKS.forEach(function (x) { if (p >= x.min) r = x; });
    return r;
  };
  /** nächster Rang + Fortschritt innerhalb des aktuellen Bandes */
  P.progressInfo = function (pct) {
    var r = P.rankFor(pct), i = P.RANKS.indexOf(r), nx = P.RANKS[i + 1] || null;
    var p = (pct || 0) * 100;
    var band = nx ? (p - r.min) / (nx.min - r.min) : 1;
    return { rank: r, next: nx, band: U.clamp(band, 0, 1), missing: nx ? Math.max(0, nx.min - Math.round(p)) : 0 };
  };

  var WRITTEN = ["GA1", "GA2", "WISO"];
  P.compute = function () {
    var pr = S.state.progress, out = { parts: {}, topics: {} };
    U.PARTS.forEach(function (p) { out.parts[p] = E.mastery(D.byPart[p] || [], pr); });
    out.written = U.sum(WRITTEN, function (p) { return out.parts[p]; }) / WRITTEN.length;
    D.topics.forEach(function (t) { out.topics[t.id] = E.mastery(D.byTopic[t.id] || [], pr); });
    return out;
  };

  /* ------------------------------------------- Verlauf & Aufstiegs-Meldungen */

  function snapshot(pf) {
    var h = S.state.profileHist || (S.state.profileHist = {});
    var r3 = function (x) { return Math.round(x * 1000) / 1000; };
    var snap = { w: r3(pf.written) };
    U.PARTS.forEach(function (p) { snap[p] = r3(pf.parts[p]); });
    h[U.today()] = snap;
    S.save("profileHist");
  }
  var origRecord = S.recordAttempt;
  S.recordAttempt = function (q, result) {
    var before = P.compute();
    origRecord.apply(S, arguments);
    if (q && q._gen) return;
    var after = P.compute();
    snapshot(after);
    var ups = [];
    var gb = P.rankFor(before.written), ga = P.rankFor(after.written);
    if (ga.grade < gb.grade) ups.push("Gesamt: Note " + ga.grade + " – " + ga.rank);
    U.PARTS.forEach(function (p) {
      var b = P.rankFor(before.parts[p]), a = P.rankFor(after.parts[p]);
      if (a.grade < b.grade) ups.push(U.PART_SHORT[p] + ": Note " + a.grade + " – " + a.rank);
    });
    if (ups.length && UI.toast) UI.toast("⬆ Aufgestiegen! " + ups.join(" · "), "ok");
    P.renderChip(after);
  };

  /* ----------------------------------------------------------- Bausteine */

  P.badge = function (pct, size) {
    var r = P.rankFor(pct);
    return '<span class="rbadge g' + r.grade + (size ? " " + size : "") + '" title="Note ' + r.grade + " – " + U.esc(r.rank) + '"><span class="rn">' + r.grade + '</span><span class="rr">' + U.esc(r.roman) + "</span></span>";
  };
  P.renderChip = function (pf) {
    var el = document.getElementById("rankchip");
    if (!el) return;
    pf = pf || P.compute();
    var r = P.rankFor(pf.written);
    el.className = "rankchip g" + r.grade;
    el.innerHTML = '<span class="rcn">' + r.grade + "</span><span class='rct'>" + U.esc(r.rank) + "</span>";
    el.title = "Lernprofil: Note " + r.grade + " (" + U.pct(pf.written) + " sicher) – " + r.rank;
  };

  function hero(pct, title, sub) {
    var info = P.progressInfo(pct), r = info.rank;
    return '<div class="rhero g' + r.grade + '">' + P.badge(pct, "xl") +
      '<div class="rinfo"><div class="kl">' + U.esc(title) + '</div><div class="rtitle">Note ' + r.grade + " · " + U.esc(r.rank) + ' <span class="muted small">Rang ' + r.roman + " von VI</span></div>" +
      '<div class="small">Skill-Level <strong>' + Math.round(pct * 100) + "</strong>/100 · Sicherheitsquote " + U.pct(pct) + (sub ? " · " + sub : "") + "</div>" +
      '<div class="rprog">' + UI.bar(info.band, "accent", "Fortschritt zum nächsten Rang") + "</div>" +
      '<div class="small muted">' + (info.next ? "Noch <strong>" + info.missing + " %</strong> bis Note " + info.next.grade + " – " + U.esc(info.next.rank) : "Höchster Rang erreicht") + " · " + U.esc(r.text) + "</div></div></div>";
  }

  /** Karte fürs Dashboard */
  P.dashboardHtml = function () {
    var pf = P.compute();
    return '<div class="card profilecard">' + hero(pf.written, "Dein Lernprofil (GA1 + GA2 + WiSo)") +
      '<div class="rparts">' + U.PARTS.map(function (p) {
        var r = P.rankFor(pf.parts[p]);
        return '<a class="rpart" href="#/profile">' + P.badge(pf.parts[p], "sm") + '<span><strong>' + U.esc(U.PART_SHORT[p]) + "</strong><br><span class='small muted'>" + U.esc(r.rank) + " · " + U.pct(pf.parts[p]) + "</span></span></a>";
      }).join("") + '</div><div class="btnrow"><a class="btn" href="#/profile">Lernprofil öffnen</a></div></div>';
  };

  /* ============================================================== Seite */

  V.profile = function (c) {
    var pf = P.compute();
    var cur = P.rankFor(pf.written);
    var html = '<div class="page-head"><h1>Lernprofil</h1><p class="muted">Dein Skill-Level als voraussichtliche IHK-Note. Es startet bei Note 6 (0 % sicher) und steigt mit jeder sicher gelösten Aufgabe bis Note 1 (ab 92 %).</p></div>';
    html += '<div class="card">' + hero(pf.written, "Gesamt – schriftliche AP2 (GA1, GA2, WiSo)") + "</div>";

    html += '<div class="grid kpi4">' + U.PARTS.map(function (p) {
      var info = P.progressInfo(pf.parts[p]);
      return '<div class="card rpartcard">' + P.badge(pf.parts[p], "lg") + '<div><div class="kl">' + U.esc(U.PART_LABEL[p]) + '</div><div class="rtitle sm">Note ' + info.rank.grade + " · " + U.esc(info.rank.rank) + "</div>" +
        UI.bar(info.band, "accent") + '<div class="small muted">' + U.pct(pf.parts[p]) + " sicher" + (info.next ? " · noch " + info.missing + " % bis Note " + info.next.grade : "") + "</div></div></div>";
    }).join("") + "</div>";

    html += '<div class="card"><h2>Rangleiter</h2><ol class="ladder">' + P.RANKS.slice().reverse().map(function (r) {
      var reached = cur.grade <= r.grade, isCur = cur.grade === r.grade;
      var to = P.RANKS[P.RANKS.indexOf(r) + 1];
      return '<li class="' + (isCur ? "cur" : reached ? "done" : "") + '"><span class="rbadge g' + r.grade + ' sm"><span class="rn">' + r.grade + '</span><span class="rr">' + r.roman + "</span></span>" +
        "<span><strong>" + U.esc(r.rank) + "</strong> · Note " + r.grade + " (" + E.GRADE_LABEL[r.grade] + ')<br><span class="small muted">' + r.min + "–" + (to ? to.min - 1 : 100) + " % · " + U.esc(r.text) + "</span></span>" +
        (isCur ? '<span class="badge">Du bist hier</span>' : reached ? '<span class="good-t">✓</span>' : "") + "</li>";
    }).join("") + "</ol></div>";

    // Verlauf
    var h = S.state.profileHist || {}, days = Object.keys(h).sort();
    if (days.length) {
      var shown = days.slice(-30);
      html += '<div class="card"><h2>Verlauf (Gesamt)</h2>' + App.charts.line(shown.map(function (d) { return { label: d.slice(8, 10) + "." + d.slice(5, 7), value: h[d].w }; }), { label: "Verlauf Sicherheitsquote", labelEvery: Math.ceil(shown.length / 10) }) +
        '<p class="small muted">Die gestrichelte Linie markiert 80 %. Bestehen ab 50 % (Note 4).</p></div>';
    }

    // Themen nach Bereich
    html += '<h2 class="sec">Skill-Level je Thema</h2><div class="grid parts2">';
    U.PARTS.forEach(function (p) {
      var ts = D.topics.filter(function (t) { return t.part === p; }).sort(function (a, b) { return pf.topics[a.id] - pf.topics[b.id]; });
      if (!ts.length) return;
      html += '<div class="card"><h3>' + UI.partBadge(p) + " " + U.esc(U.PART_LABEL[p]) + '</h3><ul class="mlist">' + ts.map(function (t) {
        var m = pf.topics[t.id], r = P.rankFor(m);
        return '<li>' + P.badge(m, "xs") + '<a href="#/topic/' + encodeURIComponent(t.id) + '">' + U.esc(t.title) + '</a><span class="grow">' + UI.bar(m) + '</span><span class="small num">' + U.pct(m) + '</span><span class="muted small">' + U.esc(r.rank) + "</span></li>";
      }).join("") + "</ul></div>";
    });
    html += "</div>";
    html += '<div class="notice small"><strong>So wird gerechnet:</strong> Für jede Aufgabe zählt, wie sicher du sie zuletzt gelöst hast (neuere Versuche zählen mehr). Unbearbeitete Aufgaben zählen 0 %. Der Mittelwert ergibt die Sicherheitsquote, die nach dem IHK-Schlüssel (92/81/67/50/30 %) in eine Note umgerechnet wird. ' +
      'Die Gesamtnote ist der Mittelwert aus GA1, GA2 und WiSo. Wie du unter echten Bedingungen abschneidest, zeigen dir zusätzlich die <a href="#/exam">Prüfungssimulationen</a>.</div>';
    c.innerHTML = html;
  };

  // Rang-Chip in der Kopfzeile nach dem Start füllen
  root.addEventListener("hashchange", function () { try { P.renderChip(); } catch (e) { /* ignore */ } });
  P.init = function () { try { P.renderChip(); } catch (e) { /* ignore */ } };
})(typeof window !== "undefined" ? window : globalThis);
