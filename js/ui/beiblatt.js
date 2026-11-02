/* AP2-Lerntool – Beiblatt für SQL-Aufgaben: Tabellenstruktur + Daten wie in der Prüfung, schnell auf- und zuklappbar */
(function (root) {
  "use strict";
  var App = (root.App = root.App || {});
  var U = App.util, UI = App.ui;
  var B = (UI.beiblatt = {});
  var cur = null, cache = {}, el = null, tab = null, tab2 = null, tab3 = null, scrim = null;
  var view = "data"; // "data" = Tabellen der Aufgabe, "ref" = SQL-Syntax, "pdf" = Original-Belegsatz
  var VIEWS = ["data", "ref", "pdf"];
  // eigene Dateien des Nutzers, nicht im Repo (.gitignore): Original-PDF und die daraus 1:1 extrahierten Scan-Seiten
  var PDF_URL = "beiblatt/belegsatz_sql.pdf";
  var PDF_PAGES = ["beiblatt/belegsatz_sql_s1.jpg", "beiblatt/belegsatz_sql_s2.jpg"];

  function build() {
    if (el) return;
    scrim = document.createElement("div");
    scrim.className = "bbscrim";
    scrim.addEventListener("click", function () { B.close(); });
    el = document.createElement("aside");
    el.className = "beiblatt";
    el.setAttribute("aria-label", "Beiblatt");
    el.setAttribute("aria-hidden", "true");
    el.innerHTML = '<div class="bbhead"><div class="seg" role="tablist" aria-label="Beiblatt">' +
      '<button type="button" class="segbtn" role="tab" data-bbview="data">Daten zur Aufgabe <kbd>B</kbd></button>' +
      '<button type="button" class="segbtn" role="tab" data-bbview="ref">SQL-Syntax <kbd>S</kbd></button>' +
      '<button type="button" class="segbtn" role="tab" data-bbview="pdf">Belegsatz (Original) <kbd>O</kbd></button></div>' +
      '<button type="button" class="btn small" data-bb="close" title="Schließen (Esc)">Wegpacken <kbd>Esc</kbd></button></div>' +
      '<div class="bbbody bbdata"></div><div class="bbbody bbrefbody hidden"></div><div class="bbbody bbpdfbody hidden"></div>';
    UI.$('[data-bb="close"]', el).addEventListener("click", function () { B.close(); });
    UI.$$("[data-bbview]", el).forEach(function (b) { b.addEventListener("click", function () { B.show(b.getAttribute("data-bbview")); }); });
    tab = document.createElement("button");
    tab.type = "button";
    tab.className = "bbtab hidden";
    tab.title = "Beiblatt öffnen (B)";
    tab.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M6 2h9l5 5v15H6z M15 2v5h5 M9 12h8 M9 16h8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg><span>Beiblatt</span><kbd>B</kbd>';
    tab.addEventListener("click", function () { B.open(null, "data"); });
    tab2 = document.createElement("button");
    tab2.type = "button";
    tab2.className = "bbtab bbtab2 hidden";
    tab2.title = "SQL-Syntax-Beiblatt öffnen (S)";
    tab2.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M8 6l-5 6 5 6M16 6l5 6-5 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg><span>SQL-Syntax</span><kbd>S</kbd>';
    tab2.addEventListener("click", function () { B.open(null, "ref"); });
    tab3 = document.createElement("button");
    tab3.type = "button";
    tab3.className = "bbtab bbtab3 hidden";
    tab3.title = "Original-Belegsatz SQL öffnen (O)";
    tab3.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M4 4h7v16H4z M13 4h7v16h-7z M6 8h3 M6 11h3 M15 8h3 M15 11h3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg><span>Belegsatz</span><kbd>O</kbd>';
    tab3.addEventListener("click", function () { B.open(null, "pdf"); });
    document.body.appendChild(scrim);
    document.body.appendChild(el);
    document.body.appendChild(tab);
    document.body.appendChild(tab2);
    document.body.appendChild(tab3);
    // Belegsatz ist eine lokale Datei des Nutzers – fehlt sie (z. B. Online-Version), Reiter ganz ausblenden
    if (/^https?:$/.test(location.protocol)) {
      fetch(PDF_PAGES[0], { method: "HEAD", cache: "no-store" }).then(function (r) { if (!r.ok) hidePdf(); }, hidePdf);
    }
    document.addEventListener("keydown", function (ev) {
      if (!cur) return;
      var t = ev.target || {}, tag = t.tagName || "";
      var inField = tag === "TEXTAREA" || tag === "SELECT" || t.isContentEditable || (tag === "INPUT" && !/^(radio|checkbox|button|submit)$/i.test(t.type || ""));
      if (ev.key === "Escape" && B.isOpen()) { ev.preventDefault(); ev.stopPropagation(); B.close(); return; }
      if (inField || ev.ctrlKey || ev.metaKey || ev.altKey) return;
      var k = String(ev.key || "").toLowerCase();
      var want = k === "b" ? "data" : k === "s" ? "ref" : k === "o" && !noPdf ? "pdf" : null;
      if (!want) return;
      ev.preventDefault(); ev.stopPropagation();
      if (B.isOpen() && view === want) B.close(); else B.open(null, want);
    }, true);
  }

  var noPdf = false;
  function hidePdf() {
    noPdf = true;
    tab3.classList.add("hidden");
    var seg = UI.$('[data-bbview="pdf"]', el);
    if (seg) seg.classList.add("hidden");
    if (view === "pdf" && B.isOpen()) B.show("ref");
    UI.$$('[data-act="belegsatz"]').forEach(function (b) { b.classList.add("hidden"); });
  }

  /** SQL-Aufgabe anzeigen → Beiblatt-Reiter einblenden */
  B.attach = function (q) {
    if (!q || !q.sql || !q.sql.setup) return;
    build();
    var changed = !cur || cur.sql.setup !== q.sql.setup;
    cur = q;
    tab.classList.remove("hidden");
    tab2.classList.remove("hidden");
    if (!noPdf) tab3.classList.remove("hidden");
    else UI.$$('[data-act="belegsatz"]').forEach(function (b) { b.classList.add("hidden"); });
    if (changed) { UI.$(".bbdata", el).innerHTML = ""; if (B.isOpen() && view === "data") B.render(); }
  };
  B.detach = function () {
    cur = null;
    if (!el) return;
    B.close();
    tab.classList.add("hidden");
    tab2.classList.add("hidden");
    tab3.classList.add("hidden");
  };
  B.isOpen = function () { return !!el && el.classList.contains("open"); };
  B.toggle = function () { if (B.isOpen()) B.close(); else B.open(); };
  B.open = function (q, which) {
    if (q) B.attach(q);
    if (!cur) return;
    build();
    B.show(which || view);
    el.classList.add("open"); scrim.classList.add("open");
    el.setAttribute("aria-hidden", "false");
    tab.classList.add("active"); tab2.classList.add("active"); tab3.classList.add("active");
  };
  /** Reiter wechseln; Scrollposition je Reiter bleibt erhalten */
  B.show = function (which) {
    view = VIEWS.indexOf(which) >= 0 ? which : "data";
    var d = UI.$(".bbdata", el), r = UI.$(".bbrefbody", el), p = UI.$(".bbpdfbody", el);
    d.classList.toggle("hidden", view !== "data");
    r.classList.toggle("hidden", view !== "ref");
    p.classList.toggle("hidden", view !== "pdf");
    el.classList.toggle("wide", view === "pdf");
    UI.$$("[data-bbview]", el).forEach(function (b) {
      var on = b.getAttribute("data-bbview") === view;
      b.classList.toggle("on", on); b.setAttribute("aria-selected", on ? "true" : "false");
    });
    if (view === "data" && !d.firstChild) B.render();
    if (view === "ref" && !r.firstChild) renderRef(r);
    if (view === "pdf" && !p.firstChild) renderPdf(p);
  };
  /** Original-Belegsatz: die Scan-Seiten unverändert als Bilder (wird erst beim ersten Öffnen geladen) */
  function renderPdf(box) {
    box.innerHTML = '<p class="small muted bbpdfbar">Originale Anlage „SQL-Syntax (Auszug)“ wie in der Prüfung · <a href="' + PDF_URL + '" target="_blank" rel="noopener">PDF in neuem Tab öffnen</a></p>' +
      PDF_PAGES.map(function (src, i) { return '<img class="bbpage" src="' + src + '" alt="Belegsatz SQL, Seite ' + (i + 1) + '" decoding="async">'; }).join("");
    UI.$$(".bbpage", box).forEach(function (img) {
      img.addEventListener("error", function () {
        box.innerHTML = '<div class="notice"><strong>Kein Belegsatz gefunden.</strong> Lege die Seiten als <code>' + PDF_PAGES.join("</code>, <code>") + "</code> (und die PDF als <code>" + PDF_URL + "</code>) in den Lerntool-Ordner und lade die Seite neu.</div>";
      });
    });
  }
  function renderRef(box) {
    box.innerHTML = UI.sqlRefHtml();
    bindJumps(box);
    var inp = UI.$(".bbsearch", box);
    inp.addEventListener("input", function () {
      var t = inp.value.trim().toLowerCase();
      UI.$$(".bbref", box).forEach(function (sct) { sct.classList.toggle("hidden", !!t && sct.textContent.toLowerCase().indexOf(t) < 0); });
    });
  }
  function bindJumps(body) {
    UI.$$("[data-bbjump]", body).forEach(function (a) {
      a.addEventListener("click", function (ev) {
        ev.preventDefault();
        var id = a.getAttribute("data-bbjump");
        var target = body.querySelector('[id="' + (/^\d+$/.test(id) ? "bb-" + id : id) + '"]');
        if (target) target.scrollIntoView({ block: "start", behavior: "smooth" });
      });
    });
  }
  B.close = function () {
    if (!el) return;
    el.classList.remove("open"); scrim.classList.remove("open");
    el.setAttribute("aria-hidden", "true");
    tab.classList.remove("active"); tab2.classList.remove("active"); tab3.classList.remove("active");
  };

  B.render = async function () {
    var body = UI.$(".bbdata", el), q = cur;
    if (!q) return;
    var key = q.sql.setup;
    if (!cache[key]) {
      body.innerHTML = '<p class="muted"><span class="spinner"></span> Beiblatt wird erstellt …</p>';
      try {
        var SQL = await App.sql.load();
        cache[key] = App.sql.tables(SQL, q.sql.setup);
      } catch (e) {
        body.innerHTML = '<div class="notice error">' + U.esc(e.message) + "</div>";
        return;
      }
    }
    if (cur !== q) return;
    var ts = cache[key];
    body.innerHTML = '<p class="small muted">Anlage zur Aufgabe: Die Datenbank enthält folgende Tabellen. <u>Unterstrichen</u> = Primärschlüssel, ↗ = Fremdschlüssel.</p>' +
      '<nav class="bbnav">' + ts.map(function (t, i) { return '<a href="#bb-' + i + '" data-bbjump="' + i + '">' + U.esc(t.name) + "</a>"; }).join("") + "</nav>" +
      ts.map(function (t, i) {
        var struct = (t.detail || []).map(function (c) {
          var nm = c.pk ? "<u>" + U.esc(c.name) + "</u>" : U.esc(c.name);
          return '<span class="bbcol">' + (c.fk ? "↗ " : "") + nm + ' <span class="muted">' + U.esc(c.type) + (c.notnull && !c.pk ? ", NOT NULL" : "") + (c.fk ? ", → " + U.esc(c.fk) : "") + "</span></span>";
        }).join("");
        return '<section class="bbtable" id="bb-' + i + '"><h3>Tabelle ' + U.esc(t.name) + ' <span class="muted small">(' + t.values.length + (t.values.length >= 100 ? "+" : "") + " Datensätze)</span></h3>" +
          '<div class="bbstruct">' + struct + "</div>" + UI.resultTable({ columns: t.columns, values: t.values }) + "</section>";
      }).join("");
    bindJumps(body);
  };
})(typeof window !== "undefined" ? window : globalThis);
