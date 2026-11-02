/* AP2-Lerntool – Lernen auf dem Handy im Heim-WLAN: Web-App-Manifest, Karte „Aufs Handy holen“ */
(function (root) {
  "use strict";
  var App = (root.App = root.App || {});
  var U = App.util;
  var V = (App.views = App.views || {});
  var doc = root.document;
  var isHttp = /^https?:$/.test(root.location.protocol);

  /* Manifest nur über http(s) einbinden – unter file:// meldet der Browser sonst Fehler */
  if (isHttp && doc && !doc.querySelector('link[rel="manifest"]')) {
    var link = doc.createElement("link");
    link.rel = "manifest";
    link.href = "manifest.webmanifest";
    doc.head.appendChild(link);
  }

  /* Läuft die App als installierte Home-Bildschirm-App? */
  function standalone() {
    try { return root.matchMedia("(display-mode: standalone)").matches || root.navigator.standalone === true; } catch (e) { return false; }
  }

  async function lanInfo() {
    if (!isHttp) return null;
    try {
      var r = await fetch("api/lan", { cache: "no-store" });
      var ct = r.headers.get("content-type") || "";
      if (!r.ok || ct.indexOf("application/json") < 0) return null; // älterer Server ohne /api/lan
      return await r.json();
    } catch (e) { return null; }
  }

  var HOME_HINT = '<details class="lanhome"><summary>Als App auf den Home-Bildschirm legen</summary>' +
    '<ul class="small"><li><strong>iPhone/iPad (Safari):</strong> Teilen-Symbol <span aria-hidden="true">⬆︎</span> → „Zum Home-Bildschirm“.</li>' +
    "<li><strong>Android (Chrome):</strong> Menü ⋮ → „Zum Startbildschirm hinzufügen“ bzw. „App installieren“.</li></ul>" +
    '<p class="small muted">Die App öffnet sich dann ohne Browserleiste. Nach einem Neustart von <code>start-lan.command</code> ist ein neuer Zugangscode nötig: QR-Code erneut mit der Kamera scannen.</p></details>';

  function render(box, info) {
    var html = "<h2>Aufs Handy holen</h2>";
    if (info && info.lan && info.local && info.url) {
      html += '<p class="small">LAN-Modus ist aktiv. Mit dem Handy <strong>im selben WLAN</strong> diesen QR-Code mit der Kamera scannen – danach lernst du auf dem Handy mit demselben Spielstand.</p>' +
        '<div class="lanqr"><div class="lanqr-img">' + info.qrSvg + '</div><div class="lanqr-txt small">' +
        '<p>Oder den Link auf dem Handy öffnen:<br><a class="lanlink" href="' + U.esc(info.url) + '">' + U.esc(info.url) + "</a></p>" +
        '<p class="muted">Der Link enthält einen Zugangscode und gilt nur, solange dieser Server läuft. Nicht weitergeben.</p></div></div>';
    } else if (info && info.lan && !info.local) {
      html += '<div class="notice ok">Du bist über das WLAN mit dem Lerntool auf deinem Rechner verbunden. Dein Fortschritt wird dort auf der Speicherkarte gespeichert.</div>' +
        '<p class="small muted">Wechselst du zwischen Handy und Rechner, wird beim Zurückkehren automatisch der neueste Stand geladen. Bei gleichzeitigen Änderungen auf beiden Geräten fragt das Lerntool nach, welcher Stand gilt.</p>';
    } else if (U.isHosted()) {
      html += '<p class="small">Öffne einfach diesen Link auf dem Handy oder Tablet:<br><a class="lanlink" href="' + U.esc(root.location.origin + root.location.pathname) + '">' + U.esc(root.location.origin + root.location.pathname) + "</a></p>" +
        '<p class="small muted">Jedes Gerät hat seinen eigenen Lernstand. Zum Übertragen: hier <strong>Jetzt speichern</strong>, auf dem anderen Gerät <strong>Einstellungen → Import</strong>.</p>';
    } else {
      html += '<p class="small">Du kannst auch auf dem Handy oder Tablet lernen – mit demselben Spielstand wie hier. So geht\'s:</p>' +
        '<ol class="small lansteps"><li>Laufendes Lerntool-Fenster im Terminal beenden (<kbd>Ctrl</kbd>+<kbd>C</kbd>).</li>' +
        "<li>Im Lerntool-Ordner <code>start-lan.command</code> doppelklicken.</li>" +
        "<li>Den QR-Code aus dem Terminal (oder hier in den Einstellungen) mit der Handy-Kamera scannen.</li></ol>" +
        '<p class="small muted">Handy und Rechner müssen im selben WLAN sein. Nur im eigenen, vertrauenswürdigen Heim-WLAN verwenden – die Verbindung ist nicht verschlüsselt (kein HTTPS), der Zugang ist aber durch einen Code geschützt.</p>';
    }
    html += standalone() ? '<p class="small muted">Läuft bereits als App vom Home-Bildschirm.</p>' : HOME_HINT;
    box.innerHTML = html;
  }

  /* Einstellungsseite erweitern (Original bleibt unverändert) */
  var orig = V.settings;
  if (typeof orig === "function") {
    V.settings = function (c) {
      var ret = orig.apply(this, arguments);
      var box = doc.createElement("div");
      box.className = "card lancard";
      box.id = "lansettings";
      var anchor = c.querySelector("#cardsettings");
      if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(box, anchor.nextSibling);
      else c.appendChild(box);
      if (isHttp) box.innerHTML = '<h2>Aufs Handy holen</h2><p class="small muted">Prüfe Verbindung …</p>';
      else render(box, null);
      lanInfo().then(function (info) { if (box.isConnected) render(box, info); });
      return ret;
    };
  }

  App.lan = { info: lanInfo, standalone: standalone };
})(window);
