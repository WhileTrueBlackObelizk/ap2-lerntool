/* AP2-Lerntool – Speicherkarte: Spielstand-Datei beim Start laden, per Klick/Auto-Save ersetzen.
 *
 * Modi:
 *  - "server":   über start.command (tools/server.py) → spielstand/spielstand.json im Projektordner
 *  - "file":     ohne Server in Chrome/Edge → File System Access API, selbst gewählte Datei
 *  - "download": Fallback (Safari/Firefox ohne Server) → Speichern lädt die Datei herunter
 *
 * Mehrere Geräte (Server-Modus, z.B. Handy im WLAN): Jeder PUT sendet X-Base-Exported = Stand der
 * Karte, auf dem dieser Browser aufbaut (Metadaten cardExported). Hat ein anderes Gerät inzwischen
 * gespeichert, antwortet der Server 409 → Konfliktdialog statt blindem Überschreiben. Beim Zurück-
 * kehren in den Tab wird geprüft, ob die Karte neuer ist, und sie ggf. geladen.
 */
(function (root) {
  "use strict";
  var App = (root.App = root.App || {});
  var U = App.util, S = App.store, D = App.data;
  var C = (App.card = {});

  var API = "api/spielstand";
  var AUTOSAVE_MS = 2000;
  C.mode = "download";
  C.status = "idle"; // idle | saving | error
  C.lastError = "";
  C.handle = null;     // FileSystemFileHandle im Modus "file"
  C.needsPermission = false;
  var timer = null, saving = null, again = false;

  /* -------------------------------------------- Metadaten (nicht exportiert) */

  function meta() { return S.readMeta() || {}; }
  function setMeta(m) { S.writeMeta(Object.assign(meta(), m)); }
  C.dirty = function () { var m = meta(); return !!m.changedAt && (!m.savedAt || m.changedAt > m.savedAt); };
  C.autoSave = function () { return S.state.settings.autoSave !== false; };
  C.canAutoSave = function () { return C.mode === "server" || (C.mode === "file" && C.handle && !C.needsPermission); };

  /* ------------------------------------------------ Änderungen mitverfolgen */

  S.onChange = function () {
    setMeta({ changedAt: new Date().toISOString() });
    C.render();
    if (C.autoSave() && C.canAutoSave()) {
      clearTimeout(timer);
      timer = setTimeout(function () { C.save({ auto: true }); }, AUTOSAVE_MS);
    }
  };

  /* ---------------------------------------------------- IndexedDB (Handle) */

  function idb(op, val) {
    return new Promise(function (res) {
      try {
        var rq = root.indexedDB.open("ap2-card", 1);
        rq.onupgradeneeded = function () { rq.result.createObjectStore("kv"); };
        rq.onerror = function () { res(null); };
        rq.onsuccess = function () {
          var tx = rq.result.transaction("kv", op === "get" ? "readonly" : "readwrite");
          var st = tx.objectStore("kv");
          var r = op === "get" ? st.get("handle") : op === "del" ? st.delete("handle") : st.put(val, "handle");
          r.onsuccess = function () { res(op === "get" ? r.result || null : true); };
          r.onerror = function () { res(null); };
        };
      } catch (e) { res(null); }
    });
  }
  var hasFsApi = typeof root.showSaveFilePicker === "function";

  /* ------------------------------------------------------------- Lesen */

  async function readCard() {
    if (C.mode === "server") {
      var r = await fetch(API, { cache: "no-store" });
      if (r.status === 404) return null;
      if (!r.ok) throw new Error("Server antwortet mit " + r.status);
      return r.json();
    }
    if (C.mode === "file" && C.handle) {
      var f = await C.handle.getFile();
      var txt = await f.text();
      return txt.trim() ? JSON.parse(txt) : null;
    }
    return null;
  }

  function hasLocalData() {
    var st = S.state;
    return Object.keys(st.progress).length > 0 || Object.keys(st.log).length > 0 || st.exams.length > 0;
  }

  function applyCard(card) {
    S.silent = true;
    try { S.importData(card); } finally { S.silent = false; }
    setMeta({ changedAt: card.exported, savedAt: card.exported, cardExported: card.exported });
    D.refresh();
    if (App.applyTheme) App.applyTheme();
    if (App.updateAiBadge) App.updateAiBadge();
  }

  /** Abgleich Speicherkarte ↔ Browser. Gibt eine Meldung zurück oder "". */
  async function sync() {
    var card = await readCard();
    if (C.mode === "server") { adoptPending(card); setMeta({ cardExported: card ? card.exported : "" }); }
    var m = meta();
    if (!card) {
      if (hasLocalData()) { await C.save({ quiet: true }); return "Neue Speicherkarte angelegt."; }
      return "";
    }
    if (card.app !== "ap2-lerntool") throw new Error("Die Speicherdatei gehört nicht zum Lerntool.");
    if (card.exported === m.savedAt && !C.dirty()) return "";
    if (C.dirty() && card.exported <= (m.savedAt || "")) {
      // Lokal neuer als die Karte (z.B. Browser vor dem Auto-Save geschlossen) → Karte aktualisieren
      await C.save({ quiet: true });
      return "Ungespeicherte Änderungen auf die Speicherkarte übernommen.";
    }
    if (C.dirty() && hasLocalData()) {
      var keepLocal = !UI().confirm(
        "Die Speicherkarte (Stand " + fmt(card.exported) + ") und dieser Browser (Stand " + fmt(m.changedAt) + ") wurden beide geändert.\n\n" +
        "OK = Speicherkarte laden (Browser-Stand wird ersetzt)\nAbbrechen = Browser-Stand behalten und auf die Karte schreiben");
      if (keepLocal) { await C.save({ quiet: true }); return "Browser-Stand auf die Speicherkarte geschrieben."; }
    }
    applyCard(card);
    return "Spielstand geladen (" + fmt(card.exported) + ").";
  }
  function fmt(iso) {
    if (!iso) return "unbekannt";
    try { return new Date(iso).toLocaleString("de-DE", { dateStyle: "short", timeStyle: "short" }); } catch (e) { return iso; }
  }
  function UI() { return App.ui; }

  /* ------------------------------------------- Mehrere Geräte (Server-Modus) */

  /** Basis-Zeitstempel für X-Base-Exported ("" = Karte noch nicht gekannt/leer) */
  function baseHeader() { var b = meta().cardExported; return typeof b === "string" ? b : ""; }
  /** Stammt die Karte vom eigenen keepalive-PUT beim Verlassen? Dann gilt sie als gespeichert. */
  function adoptPending(card) {
    var m = meta();
    if (card && m.pendingExported && card.exported === m.pendingExported) {
      setMeta({ savedAt: card.exported, cardExported: card.exported, pendingExported: null });
    }
  }
  function examRunning() {
    var r = S.state.examRun;
    return !!(r && r.phase === "running" && Date.now() < r.endsAt);
  }
  /** Ansicht neu zeichnen – aber nie mitten in einer laufenden Prüfung */
  function rerender(msg) {
    if (examRunning() && /^#\/exam\/run/.test(location.hash)) {
      UI().toast(msg + " Die Anzeige wird nach der Prüfung aktualisiert.");
      return;
    }
    App.route();
    UI().toast(msg);
  }
  var resolving = false;
  /** Karte eines anderen Geräts liegt vor (409 oder beim Zurückkehren in den Tab entdeckt) */
  async function resolveConflict(card, why) {
    if (resolving || !card || card.app !== "ap2-lerntool") return;
    resolving = true;
    try {
      if (C.dirty() && hasLocalData()) {
        var load = UI().confirm(why + "\n\nSpeicherkarte: Stand " + fmt(card.exported) + "\nDieser Browser: ungespeicherte Änderungen von " + fmt(meta().changedAt) +
          "\n\nOK = Stand der Speicherkarte laden (Änderungen hier gehen verloren)\nAbbrechen = Stand dieses Browsers behalten und auf die Karte schreiben");
        if (!load) {
          setMeta({ cardExported: card.exported }); // bewusst auf dem neuen Stand aufbauen
          resolving = false;
          await C.save({ quiet: true });
          UI().toast("Browser-Stand auf die Speicherkarte geschrieben.");
          return;
        }
      }
      applyCard(card);
      C.render();
      rerender("Stand vom anderen Gerät geladen (" + fmt(card.exported) + ").");
    } finally { resolving = false; }
  }

  /** Beim Zurückkehren in den Tab: Hat ein anderes Gerät gespeichert? (max. alle 10 s) */
  var lastCheck = 0;
  C.checkRemote = async function () {
    if (C.mode !== "server" || saving || resolving || document.visibilityState === "hidden") return;
    if (Date.now() - lastCheck < 10000) return;
    lastCheck = Date.now();
    try {
      var card = await readCard();
      adoptPending(card);
      if (!card || card.exported === meta().cardExported) return;
      await resolveConflict(card, "Auf einem anderen Gerät wurde inzwischen gespeichert.");
    } catch (e) { /* Server gerade nicht erreichbar – beim nächsten Mal */ }
  };

  /* ------------------------------------------------------------ Schreiben */

  C.save = async function (opt) {
    opt = opt || {};
    clearTimeout(timer);
    if (C.mode === "download") {
      if (opt.auto) return;
      var d = S.exportData();
      UI().download("ap2-spielstand.json", JSON.stringify(d, null, 1));
      setMeta({ savedAt: d.exported });
      C.render();
      UI().toast("Spielstand heruntergeladen – ersetze damit deine alte Datei.");
      return;
    }
    if (C.mode === "file" && (!C.handle || C.needsPermission)) {
      if (opt.auto) return;
      if (!(await C.connectFile(true))) return;
    }
    if (saving) { again = true; return saving; }
    var conflict = null;
    saving = (async function () {
      var d = S.exportData();
      C.status = "saving"; C.render();
      try {
        if (C.mode === "server") {
          var r = await fetch(API, { method: "PUT", headers: { "content-type": "application/json", "x-base-exported": baseHeader() }, body: JSON.stringify(d) });
          if (r.status === 409) {
            // Anderes Gerät hat inzwischen gespeichert → nicht überschreiben, sondern nachfragen
            var cj = {}; try { cj = await r.json(); } catch (x) { /* ignore */ }
            conflict = cj.card || null;
            if (!conflict) throw new Error(cj.error || "Konflikt");
            again = false;
          } else if (!r.ok) { var e = {}; try { e = await r.json(); } catch (x) { /* ignore */ } throw new Error(e.error || "HTTP " + r.status); }
        } else {
          var w = await C.handle.createWritable();
          await w.write(JSON.stringify(d, null, 1));
          await w.close();
        }
        C.status = "idle"; C.lastError = "";
        if (!conflict) {
          setMeta(C.mode === "server" ? { savedAt: d.exported, cardExported: d.exported } : { savedAt: d.exported });
          if (!opt.auto && !opt.quiet) UI().toast("Gespeichert.");
        }
      } catch (err) {
        C.status = "error"; C.lastError = err.message || String(err);
        UI().toast("Speichern fehlgeschlagen: " + C.lastError, "error");
      } finally {
        saving = null;
        C.render();
        if (again) { again = false; C.save({ auto: true }); }
      }
      if (conflict) {
        UI().toast("Auf einem anderen Gerät wurde inzwischen gespeichert – bitte wählen, welcher Stand gilt.");
        await resolveConflict(conflict, "Auf einem anderen Gerät wurde inzwischen auf die Speicherkarte gespeichert.");
      }
    })();
    return saving;
  };

  /** Modus "file": Datei wählen bzw. Berechtigung erneuern. create=true → Speichern-unter-Dialog */
  C.connectFile = async function (create) {
    try {
      if (C.handle && C.needsPermission) {
        var p = await C.handle.requestPermission({ mode: "readwrite" });
        if (p !== "granted") return false;
        C.needsPermission = false;
        var msg = await sync();
        if (msg) UI().toast(msg);
        App.route();
        C.render();
        return true;
      }
      var h;
      if (create) {
        h = await root.showSaveFilePicker({ suggestedName: "ap2-spielstand.json", types: [{ description: "Lerntool-Spielstand", accept: { "application/json": [".json"] } }] });
      } else {
        h = (await root.showOpenFilePicker({ types: [{ description: "Lerntool-Spielstand", accept: { "application/json": [".json"] } }] }))[0];
        if ((await h.requestPermission({ mode: "readwrite" })) !== "granted") return false;
      }
      C.handle = h; C.needsPermission = false;
      await idb("put", h);
      if (!create) {
        var m2 = await sync();
        if (m2) UI().toast(m2);
        App.route();
      }
      C.render();
      return true;
    } catch (e) {
      if (e && e.name === "AbortError") return false;
      UI().toast("Speicherkarte: " + (e.message || e), "error");
      return false;
    }
  };

  C.disconnectFile = async function () {
    C.handle = null; C.needsPermission = false;
    await idb("del");
    C.render();
  };

  /* ---------------------------------------------------------------- Start */

  C.boot = async function () {
    if (/^https?:$/.test(location.protocol)) {
      try {
        var r = await fetch(API, { method: "GET", cache: "no-store" });
        var ct = r.headers.get("content-type") || "";
        if (ct.indexOf("application/json") >= 0 && (r.ok || r.status === 404)) C.mode = "server";
      } catch (e) { /* kein Lerntool-Server */ }
    }
    if (C.mode !== "server" && hasFsApi) {
      C.mode = "file";
      var h = await idb("get");
      if (h) {
        C.handle = h;
        try {
          var p = await h.queryPermission({ mode: "readwrite" });
          C.needsPermission = p !== "granted";
        } catch (e) { C.needsPermission = true; }
      }
    }
    var msg = "";
    if (C.mode === "server" || (C.mode === "file" && C.handle && !C.needsPermission)) {
      try { msg = await sync(); } catch (e) { msg = ""; C.status = "error"; C.lastError = e.message; UI().toast("Speicherkarte konnte nicht gelesen werden: " + e.message, "error"); }
    }
    bindUi();
    C.render();
    if (msg) setTimeout(function () { UI().toast(msg); }, 300);
  };

  /* -------------------------------------------------------------- Oberfläche */

  function bindUi() {
    var btn = document.getElementById("savebtn");
    if (btn) btn.addEventListener("click", function () {
      if (C.mode === "file" && C.handle && C.needsPermission) C.connectFile(false);
      else C.save();
    });
    document.addEventListener("keydown", function (ev) {
      if ((ev.metaKey || ev.ctrlKey) && !ev.shiftKey && !ev.altKey && (ev.key === "s" || ev.key === "S")) { ev.preventDefault(); C.save(); }
    });
    // Beim Verlassen: ausstehendes Auto-Save sofort senden, sonst warnen
    root.addEventListener("pagehide", function () {
      if (!C.dirty() || C.mode !== "server") return;
      try {
        var d = S.exportData(), body = JSON.stringify(d);
        if (body.length < 60000) setMeta({ pendingExported: d.exported });
        if (body.length < 60000) fetch(API, { method: "PUT", headers: { "content-type": "application/json", "x-base-exported": baseHeader() }, body: body, keepalive: true });
      } catch (e) { /* ignore */ }
    });
    // Zurück in den Tab (z.B. vom Handy zum Mac gewechselt): neueren Stand eines anderen Geräts holen
    document.addEventListener("visibilitychange", function () { if (document.visibilityState === "visible") C.checkRemote(); });
    root.addEventListener("focus", function () { C.checkRemote(); });
    root.addEventListener("beforeunload", function (ev) {
      if (C.dirty() && !(C.mode === "server" && C.autoSave())) { ev.preventDefault(); ev.returnValue = ""; }
    });
  }

  C.render = function () {
    var btn = document.getElementById("savebtn");
    if (!btn) return;
    var dirty = C.dirty(), lbl, cls, title;
    if (C.status === "saving") { lbl = "Speichert …"; cls = "saving"; title = "Spielstand wird gespeichert"; }
    else if (C.status === "error") { lbl = "Speichern!"; cls = "error"; title = "Letztes Speichern fehlgeschlagen: " + C.lastError; }
    else if (C.mode === "file" && C.handle && C.needsPermission) { lbl = "Karte verbinden"; cls = "dirty"; title = "Zugriff auf " + C.handle.name + " erlauben und Spielstand laden"; }
    else if (dirty) { lbl = "Speichern"; cls = "dirty"; title = "Ungespeicherte Änderungen (Strg/⌘+S)"; }
    else { lbl = "Gespeichert"; cls = "ok"; title = "Spielstand ist aktuell" + (meta().savedAt ? " (" + fmt(meta().savedAt) + ")" : ""); }
    btn.className = "savebtn " + cls;
    btn.title = title;
    btn.setAttribute("aria-label", title);
    btn.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M5 3h11l3 3v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M7 3v5h8V3M7 21v-7h10v7" fill="none" stroke="currentColor" stroke-width="2"/></svg><span>' + U.esc(lbl) + "</span>";
    var box = document.getElementById("cardsettings");
    if (box) C.renderSettings(box);
  };

  /** Karte in den Einstellungen */
  C.renderSettings = function (box) {
    var m = meta();
    var where = C.mode === "server" ? "<code>spielstand/spielstand.json</code> im Lerntool-Ordner (alte Version als <code>spielstand.bak.json</code>)"
      : C.mode === "file" ? (C.handle ? "<code>" + U.esc(C.handle.name) + "</code> (selbst gewählte Datei)" : "noch keine Datei gewählt")
      : "keine automatische Datei – Speichern lädt <code>ap2-spielstand.json</code> herunter";
    var modeTxt = C.mode === "server" ? "Lerntool-Server (start.command)" : C.mode === "file" ? "Datei im Browser (Chrome/Edge)" : "Download";
    var html = '<h2>Speicherkarte</h2>' +
      '<p class="small">Modus: <strong>' + modeTxt + "</strong><br>Datei: " + where + "<br>Zuletzt gespeichert: <strong>" + U.esc(fmt(m.savedAt)) + "</strong>" + (C.dirty() ? ' · <span class="warn-text">ungespeicherte Änderungen</span>' : "") + "</p>" +
      (U.isHosted() ? '<div class="notice">Online-Version: Dein Lernstand liegt nur in diesem Browser auf diesem Gerät. Sichere ihn regelmäßig mit <strong>Jetzt speichern</strong> (Datei herunterladen) und spiele ihn auf einem anderen Gerät über <strong>Einstellungen → Import</strong> wieder ein. Browserdaten löschen = Lernstand weg.</div>'
        : C.mode === "download" ? '<div class="notice">Für automatisches Laden und Speichern das Lerntool über <code>start.command</code> starten (oder Chrome/Edge verwenden).</div>' : "") +
      '<label class="check"><input type="checkbox" data-card="auto"' + (C.autoSave() ? " checked" : "") + (C.mode === "download" ? " disabled" : "") + "> Automatisch speichern (2 s nach jeder Änderung)</label>" +
      '<div class="btnrow"><button class="btn primary" type="button" data-card="save">Jetzt speichern</button>' +
      (C.mode === "file" ? '<button class="btn" type="button" data-card="open">Andere Speicherdatei öffnen</button><button class="btn" type="button" data-card="new">Neue Speicherdatei anlegen</button>' + (C.handle ? '<button class="btn ghost" type="button" data-card="forget">Verbindung trennen</button>' : "") : "") +
      (C.mode === "server" ? '<button class="btn" type="button" data-card="reload">Von Speicherkarte neu laden</button>' : "") +
      "</div>";
    box.innerHTML = html;
    box.querySelector('[data-card="save"]').onclick = function () { C.save(); };
    var a = box.querySelector('[data-card="auto"]');
    if (a) a.onchange = function () { S.state.settings.autoSave = a.checked; S.save("settings"); };
    var o = box.querySelector('[data-card="open"]'); if (o) o.onclick = function () { C.connectFile(false); };
    var n = box.querySelector('[data-card="new"]'); if (n) n.onclick = async function () { if (await C.connectFile(true)) C.save(); };
    var f = box.querySelector('[data-card="forget"]'); if (f) f.onclick = function () { C.disconnectFile(); };
    var rl = box.querySelector('[data-card="reload"]');
    if (rl) rl.onclick = async function () {
      if (C.dirty() && !UI().confirm("Ungespeicherte Änderungen verwerfen und Stand von der Speicherkarte laden?")) return;
      try {
        var card = await readCard();
        if (!card) { UI().toast("Noch kein Spielstand auf der Karte."); return; }
        applyCard(card); UI().toast("Spielstand geladen (" + fmt(card.exported) + ")."); App.route();
      } catch (e) { UI().toast("Laden fehlgeschlagen: " + e.message, "error"); }
    };
  };
})(window);
