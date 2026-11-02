/* AP2-Lerntool – Hilfsfunktionen (DOM-frei, auch in node testbar) */
(function (root) {
  "use strict";
  var App = (root.App = root.App || {});
  var U = (App.util = {});

  var ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  U.esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return ESC[c]; });
  };

  U.stripHtml = function (s) {
    return String(s == null ? "" : s)
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/(p|li|h\d|tr|div|pre)>/gi, "\n")
      .replace(/<\/?(b|strong|i|em|u|code|span|sub|sup|a|mark|small)\b[^>]*>/gi, "")
      .replace(/<[^>]*>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&amp;/g, "&")
      .replace(/[ \t]+/g, " ")
      .replace(/\n\s*\n+/g, "\n")
      .trim();
  };

  /** KI-/Nutzertext sicher formatieren: escapen, dann **fett**, `code`, Zeilenumbrüche. */
  U.formatAI = function (text) {
    var s = U.esc(text || "");
    s = s.replace(/```[a-zA-Z]*\n?([\s\S]*?)```/g, function (_, code) { return "<pre><code>" + code.replace(/\n$/, "") + "</code></pre>"; });
    s = s.replace(/\*\*([^*\n][^*]*?)\*\*/g, "<strong>$1</strong>");
    s = s.replace(/`([^`\n]+)`/g, "<code>$1</code>");
    // Zeilenumbrüche außerhalb von <pre>
    var parts = s.split(/(<pre>[\s\S]*?<\/pre>)/);
    return parts.map(function (p) { return p.indexOf("<pre>") === 0 ? p : p.replace(/\n/g, "<br>"); }).join("");
  };

  /**
   * HTML aus KI-Ausgaben entschärfen: alles escapen, nur attributlose Basis-Tags
   * (b, i, code, pre, ul, li, table …) wieder zulassen. Entities bleiben erhalten.
   */
  var SAFE_TAGS = "b|strong|i|em|u|code|pre|ul|ol|li|br|p|table|thead|tbody|tr|th|td|h4|h5|h6|sub|sup|small|blockquote|hr";
  var SAFE_RE = new RegExp("&lt;(\\/?)(" + SAFE_TAGS + ")\\s*\\/?&gt;", "gi");
  U.sanitize = function (html) {
    return U.esc(html)
      .replace(/&amp;(lt|gt|amp|quot|#39|nbsp|auml|ouml|uuml|Auml|Ouml|Uuml|szlig|euro|ndash|mdash|hellip|#\d{1,5});/g, "&$1;")
      .replace(SAFE_RE, function (_, slash, tag) { return "<" + slash + tag.toLowerCase() + ">"; });
  };
  /** Feldinhalt einer Frage als HTML: Daten-Dateien vertrauenswürdig, KI-Inhalte entschärft */
  U.rich = function (str, untrusted) { return untrusted ? U.sanitize(str || "") : String(str == null ? "" : str); };

  U.pad = function (n) { return (n < 10 ? "0" : "") + n; };
  /** lokales Datum als YYYY-MM-DD */
  U.dateStr = function (d) {
    d = d || new Date();
    return d.getFullYear() + "-" + U.pad(d.getMonth() + 1) + "-" + U.pad(d.getDate());
  };
  U._now = null; // für Tests überschreibbar (Date)
  U.now = function () { return U._now ? new Date(U._now.getTime()) : new Date(); };
  U.today = function () { return U.dateStr(U.now()); };
  U.parseDay = function (s) {
    var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(s || ""));
    if (!m) return null;
    return Date.UTC(+m[1], +m[2] - 1, +m[3]);
  };
  U.addDays = function (s, n) {
    var t = U.parseDay(s);
    if (t == null) return s;
    var d = new Date(t + n * 86400000);
    return d.getUTCFullYear() + "-" + U.pad(d.getUTCMonth() + 1) + "-" + U.pad(d.getUTCDate());
  };
  /** Tage von a nach b (b - a) */
  U.daysBetween = function (a, b) {
    var ta = U.parseDay(a), tb = U.parseDay(b);
    if (ta == null || tb == null) return 0;
    return Math.round((tb - ta) / 86400000);
  };
  U.fmtDate = function (s) {
    var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(s || ""));
    return m ? m[3] + "." + m[2] + "." + m[1] : String(s || "");
  };
  U.weekday = function (s) {
    var t = U.parseDay(s);
    if (t == null) return "";
    return ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"][new Date(t).getUTCDay()];
  };
  U.fmtNum = function (n, digits) {
    if (n == null || !isFinite(n)) return "–";
    digits = digits == null ? 2 : digits;
    var s = Number(n).toFixed(digits);
    if (digits > 0) s = s.replace(/\.?0+$/, "");
    var parts = s.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(",");
  };
  U.pct = function (x) { return Math.round((x || 0) * 100) + " %"; };
  U.fmtDuration = function (sec) {
    sec = Math.max(0, Math.round(sec));
    var h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60;
    return (h ? h + ":" + U.pad(m) : m) + ":" + U.pad(s);
  };

  U.uid = function () {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  };
  U.clamp = function (x, a, b) { return Math.max(a, Math.min(b, x)); };
  U.roundHalf = function (x) { return Math.round((x || 0) * 2) / 2; };
  U.shuffle = function (arr, rnd) {
    rnd = rnd || Math.random;
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(rnd() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  };
  U.clone = function (o) { return o == null ? o : JSON.parse(JSON.stringify(o)); };
  U.debounce = function (fn, ms) {
    var t;
    return function () {
      var args = arguments, self = this;
      clearTimeout(t);
      t = setTimeout(function () { fn.apply(self, args); }, ms);
    };
  };
  U.groupBy = function (arr, fn) {
    var o = {};
    arr.forEach(function (x) { var k = fn(x); (o[k] = o[k] || []).push(x); });
    return o;
  };
  U.sum = function (arr, fn) { return arr.reduce(function (s, x) { return s + (fn ? fn(x) : x); }, 0); };
  U.truncate = function (s, n) { s = String(s || ""); return s.length > n ? s.slice(0, n - 1) + "…" : s; };

  U.PARTS = ["GA1", "GA2", "WISO", "FG"];
  U.PART_LABEL = {
    GA1: "Planen eines Softwareproduktes",
    GA2: "Entwicklung und Umsetzung von Algorithmen",
    WISO: "Wirtschafts- und Sozialkunde",
    FG: "Projekt & Fachgespräch",
  };
  U.PART_SHORT = { GA1: "GA1", GA2: "GA2", WISO: "WiSo", FG: "Fachgespräch" };
  U.TYPES = ["mc", "multi", "numeric", "text", "code", "sql", "order"];
  U.TYPE_LABEL = {
    mc: "Single Choice",
    multi: "Multiple Choice",
    numeric: "Rechenaufgabe",
    text: "Freitext",
    code: "Code/Pseudocode",
    sql: "SQL",
    order: "Reihenfolge",
  };
  U.DIFF_LABEL = { 1: "leicht", 2: "mittel", 3: "schwer" };
  /** Läuft die App öffentlich im Netz (z. B. GitHub Pages) statt lokal bzw. im Heim-WLAN? */
  U.isHosted = function () {
    var l = root.location || {};
    if (!/^https?:$/.test(l.protocol || "")) return false;
    return !/^(localhost|127\.|\[::1\]|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)|\.local$/.test(l.hostname || "");
  };
})(typeof window !== "undefined" ? window : globalThis);
