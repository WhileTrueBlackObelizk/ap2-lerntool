window.AP2 = window.AP2 || { topics: [], questions: [], exams: [], generators: [] };
// Parametrisierte Aufgaben (Generatoren). generate(rnd) nutzt ausschließlich rnd() für Zufall.
(function () {
  "use strict";

  // ---------------------------------------------------------------------------
  // Hilfsfunktionen (lokal, keine globalen Namen)
  // ---------------------------------------------------------------------------
  function G(def) { AP2.generators.push(def); }
  function int(rnd, a, b) { return a + Math.floor(rnd() * (b - a + 1)); }
  function pick(rnd, arr) { return arr[Math.floor(rnd() * arr.length)]; }
  function shuffle(rnd, arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function sample(rnd, arr, k) { return shuffle(rnd, arr).slice(0, k); }
  function roundN(x, d) {
    var f = Math.pow(10, d), s = x < 0 ? -1 : 1;
    return s * Math.round(Math.abs(x) * f * (1 + 1e-12)) / f;
  }
  function r2(x) { return roundN(x, 2); }
  // deutsches Zahlenformat
  function fmt(x, d) {
    if (d === undefined) d = 2;
    var v = roundN(x, d);
    var s = Math.abs(v).toFixed(d).split(".");
    s[0] = s[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return (v < 0 ? "-" : "") + s.join(",");
  }
  function num(x) { // ohne feste Nachkommastellen
    var v = roundN(x, 6);
    var s = String(Math.abs(v)).split(".");
    s[0] = s[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return (v < 0 ? "-" : "") + s.join(",");
  }
  function eur(x) { return fmt(x, 2) + " €"; }
  function pct(x) { return num(x) + " %"; }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function pre(code) { return "<pre><code>" + esc(code) + "</code></pre>"; }
  function table(head, rows) {
    var h = "<table><tr>" + head.map(function (c) { return "<th>" + c + "</th>"; }).join("") + "</tr>";
    rows.forEach(function (r) { h += "<tr>" + r.map(function (c) { return "<td>" + c + "</td>"; }).join("") + "</tr>"; });
    return h + "</table>";
  }
  // Multiple-Choice: richtige Option + eindeutige Distraktoren, gemischt
  function mc(rnd, right, wrongs, n) {
    n = n || 4;
    right = String(right);
    var seen = {}; seen[right] = true;
    var ds = [];
    for (var i = 0; i < wrongs.length && ds.length < n - 1; i++) {
      if (wrongs[i] === undefined || wrongs[i] === null) continue;
      var w = String(wrongs[i]);
      if (!seen[w]) { seen[w] = true; ds.push(w); }
    }
    var opts = shuffle(rnd, [right].concat(ds));
    return { options: opts, correct: [opts.indexOf(right)] };
  }
  function bits(n, w) { var s = n.toString(2); while (s.length < w) s = "0" + s; return s; }
  function bin(n, w) { return bits(n, w).replace(/\B(?=(\d{4})+(?!\d))/g, " "); }
  function hex(n) { return n.toString(16).toUpperCase(); }
  function powSum(n) {
    var p = [];
    for (var b = 31; b >= 0; b--) if (n >= 0 && Math.floor(n / Math.pow(2, b)) % 2 === 1) p.push(Math.pow(2, b));
    return p.join(" + ") || "0";
  }
  function arr(a) { return "[" + a.join(", ") + "]"; }
  function distinctInts(rnd, k, lo, hi) {
    var s = {}, out = [];
    while (out.length < k) { var x = int(rnd, lo, hi); if (!s[x]) { s[x] = true; out.push(x); } }
    return out;
  }
  // Datum (UTC)
  function D(y, m, d) { return new Date(Date.UTC(y, m - 1, d)); }
  function addDays(dt, n) { return new Date(dt.getTime() + n * 86400000); }
  function lastDay(y, m) { return new Date(Date.UTC(y, m, 0)).getUTCDate(); }
  function two(n) { return (n < 10 ? "0" : "") + n; }
  function fmtD(dt) { return two(dt.getUTCDate()) + "." + two(dt.getUTCMonth() + 1) + "." + dt.getUTCFullYear(); }
  var WTAGE = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
  function fmtDW(dt) { return WTAGE[dt.getUTCDay()] + ", " + fmtD(dt); }
  function monthEndPlus(dt, n) {
    var y = dt.getUTCFullYear(), m = dt.getUTCMonth() + 1 + n;
    y += Math.floor((m - 1) / 12); m = ((m - 1) % 12 + 12) % 12 + 1;
    return D(y, m, lastDay(y, m));
  }
  function addMonthsClamp(dt, n) {
    var y = dt.getUTCFullYear(), m = dt.getUTCMonth() + 1 + n;
    y += Math.floor((m - 1) / 12); m = ((m - 1) % 12 + 12) % 12 + 1;
    return D(y, m, Math.min(dt.getUTCDate(), lastDay(y, m)));
  }
  function hhmm(min) { return two(Math.floor(min / 60) % 24) + ":" + two(min % 60) + " Uhr"; }

  // ===========================================================================
  // GA2 – Zahlensysteme
  // ===========================================================================
  G({
    id: "gen-zs-dez-bin", part: "GA2", topic: "ga2-zahlensysteme", title: "Dezimal → Binär (8 Bit)",
    generate: function (rnd) {
      var n = int(rnd, 19, 254);
      var right = bin(n, 8);
      var rev = parseInt(bits(n, 8).split("").reverse().join(""), 2);
      var wrongs = shuffle(rnd, [n ^ (1 << int(rnd, 0, 3)), n ^ (1 << int(rnd, 4, 7)), rev, (n + 1) & 255, (n - 1) & 255, n ^ 0x30, (n + 8) & 255, n ^ 0x81])
        .map(function (x) { return bin(x, 8); });
      var m = mc(rnd, right, wrongs);
      var rows = [], x = n;
      while (x > 0) { rows.push([x + " : 2", Math.floor(x / 2), x % 2]); x = Math.floor(x / 2); }
      return {
        type: "mc", difficulty: 1, points: 2,
        question: "Wandeln Sie die Dezimalzahl <b>" + n + "</b> in eine 8-Bit-Binärzahl um.",
        options: m.options, correct: m.correct,
        solution: "<p>Fortgesetzte Division durch 2, die Reste von <b>unten nach oben</b> lesen:</p>" + table(["Division", "Ergebnis", "Rest"], rows) +
          "<p>Ergebnis (mit führenden Nullen auf 8 Bit aufgefüllt): <b>" + right + "</b><sub>2</sub></p><p>Probe: " + powSum(n) + " = " + n + "</p>",
        explanation: "Alternativ: größte passende Zweierpotenz abziehen (128, 64, 32, …) und für jede verwendete Potenz eine 1 setzen."
      };
    }
  });

  G({
    id: "gen-zs-bin-dez", part: "GA2", topic: "ga2-zahlensysteme", title: "Binär → Dezimal",
    generate: function (rnd) {
      var w = pick(rnd, [8, 8, 10, 12]);
      var n = int(rnd, Math.pow(2, w - 2) + 1, Math.pow(2, w) - 1);
      var b = bits(n, w);
      var rows = [];
      for (var i = 0; i < w; i++) {
        var p = w - 1 - i;
        rows.push([p, "2<sup>" + p + "</sup> = " + Math.pow(2, p), b[i], b[i] === "1" ? Math.pow(2, p) : 0]);
      }
      return {
        type: "numeric", difficulty: 1, points: 2,
        question: "Wandeln Sie die Binärzahl <b>" + bin(n, w) + "</b><sub>2</sub> in eine Dezimalzahl um.",
        answer: n, tolerance: 0,
        solution: "<p>Jede Stelle wird mit ihrer Wertigkeit (Zweierpotenz) multipliziert und aufsummiert:</p>" + table(["Stelle", "Wertigkeit", "Bit", "Beitrag"], rows) +
          "<p>" + powSum(n) + " = <b>" + n + "</b></p>"
      };
    }
  });

  G({
    id: "gen-zs-hex", part: "GA2", topic: "ga2-zahlensysteme", title: "Hexadezimal umrechnen",
    generate: function (rnd) {
      var mode = pick(rnd, ["dez2hex", "hex2dez", "bin2hex"]);
      var n, rows = [], x;
      if (mode === "hex2dez") {
        n = int(rnd, 200, 4095);
        var h = hex(n);
        for (var i = 0; i < h.length; i++) {
          var p = h.length - 1 - i, dv = parseInt(h[i], 16);
          rows.push([h[i], dv, "16<sup>" + p + "</sup> = " + Math.pow(16, p), dv * Math.pow(16, p)]);
        }
        return {
          type: "numeric", difficulty: 1, points: 2,
          question: "Wandeln Sie die Hexadezimalzahl <b>" + h + "</b><sub>16</sub> in eine Dezimalzahl um.",
          answer: n, tolerance: 0,
          solution: table(["Ziffer", "Wert", "Wertigkeit", "Beitrag"], rows) + "<p>Summe: <b>" + n + "</b></p><p>Merke: A=10, B=11, C=12, D=13, E=14, F=15.</p>"
        };
      }
      n = int(rnd, 300, mode === "bin2hex" ? 65535 : 4095);
      var right = hex(n);
      var wrongs = shuffle(rnd, [hex(n + 1), hex(n ^ 0x10), right.split("").reverse().join(""), hex((n + 256) % 65536), hex(Math.abs(n - 16)), n.toString(8), hex(n ^ 0x8), hex(n ^ 0x100)]);
      var m = mc(rnd, right, wrongs);
      if (mode === "dez2hex") {
        x = n;
        while (x > 0) { rows.push([x + " : 16", Math.floor(x / 16), (x % 16) + (x % 16 > 9 ? " = " + hex(x % 16) : "")]); x = Math.floor(x / 16); }
        return {
          type: "mc", difficulty: 1, points: 2,
          question: "Wandeln Sie die Dezimalzahl <b>" + n + "</b> in eine Hexadezimalzahl um.",
          options: m.options, correct: m.correct,
          solution: "<p>Fortgesetzte Division durch 16, Reste von unten nach oben lesen:</p>" + table(["Division", "Ergebnis", "Rest"], rows) + "<p>Ergebnis: <b>" + right + "</b><sub>16</sub></p>"
        };
      }
      var w = n > 4095 ? 16 : 12;
      var nib = bits(n, w).match(/.{4}/g);
      return {
        type: "mc", difficulty: 1, points: 2,
        question: "Geben Sie die Binärzahl <b>" + bin(n, w) + "</b><sub>2</sub> in hexadezimaler Schreibweise an.",
        options: m.options, correct: m.correct,
        solution: "<p>Binärzahl von rechts in 4er-Gruppen (Nibbles) teilen, jede Gruppe ergibt eine Hex-Ziffer:</p>" +
          table(["Nibble"].concat(nib), [["Hex"].concat(nib.map(function (q) { return hex(parseInt(q, 2)); }))]) +
          "<p>Ergebnis: <b>" + bits(n, w).match(/.{4}/g).map(function (q) { return hex(parseInt(q, 2)); }).join("").replace(/^0+(?=.)/, "") + "</b><sub>16</sub></p>"
      };
    }
  });

  G({
    id: "gen-zs-zweierkomplement", part: "GA2", topic: "ga2-zahlensysteme", title: "Zweierkomplement (8 Bit)",
    generate: function (rnd) {
      if (rnd() < 0.5) {
        var v = rnd() < 0.85 ? int(rnd, -128, -1) : int(rnd, 1, 127);
        var p = v < 0 ? v + 256 : v;
        var sol;
        if (v < 0) {
          var inv = 255 - p;
          sol = "<p>Das höchstwertige Bit (MSB) ist 1 → die Zahl ist <b>negativ</b>.</p><p>Betrag ermitteln: Bits invertieren und 1 addieren:</p>" +
            pre("  " + bin(p, 8) + "\n~ " + bin(inv, 8) + "   (invertiert)\n+ 0000 0001\n= " + bin(inv + 1, 8) + "   = " + (inv + 1)) +
            "<p>Wert: <b>" + v + "</b></p><p>Alternativ: −128 + " + (p - 128) + " = " + v + " (MSB hat die Wertigkeit −2<sup>7</sup>).</p>";
        } else {
          sol = "<p>MSB = 0 → positive Zahl, Wert wie bei einer normalen Binärzahl: " + powSum(p) + " = <b>" + v + "</b></p>";
        }
        return {
          type: "numeric", difficulty: 2, points: 3,
          question: "Das Bitmuster <b>" + bin(p, 8) + "</b> ist als vorzeichenbehaftete 8-Bit-Ganzzahl im <b>Zweierkomplement</b> gespeichert. Ermitteln Sie den Dezimalwert.",
          answer: v, tolerance: 0, solution: sol
        };
      }
      var a = int(rnd, 1, 128);
      var right = bin(256 - a, 8);
      var wrongs = [bin(255 - a, 8), a < 128 ? bin(128 + a, 8) : null, bin(a, 8), bin((257 - a) & 255, 8), bin((256 - a) ^ 2, 8), bin((256 - a) ^ 64, 8)];
      var m = mc(rnd, right, wrongs);
      return {
        type: "mc", difficulty: 2, points: 3,
        question: "Stellen Sie die Dezimalzahl <b>−" + a + "</b> als 8-Bit-Zweierkomplement dar.",
        options: m.options, correct: m.correct,
        solution: pre("  " + bin(a, 8) + "   (+" + a + ")\n~ " + bin(255 - a, 8) + "   (Einerkomplement: invertiert)\n+ 0000 0001\n= " + right + "   (Zweierkomplement)") +
          "<p>Ergebnis: <b>" + right + "</b>. Probe: −128 + " + (128 - a) + " = −" + a + ".</p>",
        explanation: "Typische Fehler: nur invertieren (Einerkomplement) oder Vorzeichen-Betrag-Darstellung (MSB auf 1 setzen)."
      };
    }
  });

  G({
    id: "gen-zs-bitop", part: "GA2", topic: "ga2-zahlensysteme", title: "Bitoperationen AND/OR/XOR/NOT/Shift",
    generate: function (rnd) {
      var a = int(rnd, 17, 254), b = int(rnd, 17, 254);
      var op = pick(rnd, ["AND", "OR", "XOR", "NOT", "SHL", "SHR"]);
      var r, line, k = int(rnd, 1, 3), q;
      if (op === "AND") { r = a & b; q = "a AND b"; line = "  " + bin(a, 8) + "  (a = " + a + ")\n& " + bin(b, 8) + "  (b = " + b + ")\n= " + bin(r, 8); }
      else if (op === "OR") { r = a | b; q = "a OR b"; line = "  " + bin(a, 8) + "  (a = " + a + ")\n| " + bin(b, 8) + "  (b = " + b + ")\n= " + bin(r, 8); }
      else if (op === "XOR") { r = a ^ b; q = "a XOR b"; line = "  " + bin(a, 8) + "  (a = " + a + ")\n^ " + bin(b, 8) + "  (b = " + b + ")\n= " + bin(r, 8); }
      else if (op === "NOT") { r = 255 - a; q = "NOT a"; line = "  " + bin(a, 8) + "  (a = " + a + ")\n~ " + bin(r, 8); }
      else if (op === "SHL") { r = (a << k) & 255; q = "a &lt;&lt; " + k; line = "  " + bin(a, 8) + "  (a = " + a + ")\n<<" + k + "\n= " + bin(r, 8) + "  (links herausgeschobene Bits gehen verloren, rechts werden Nullen nachgeschoben)"; }
      else { r = a >> k; q = "a &gt;&gt; " + k; line = "  " + bin(a, 8) + "  (a = " + a + ")\n>>" + k + "\n= " + bin(r, 8) + "  (rechts herausgeschobene Bits gehen verloren, links Nullen)"; }
      var regel = { AND: "AND: 1 nur, wenn beide Bits 1 sind.", OR: "OR: 1, wenn mindestens ein Bit 1 ist.", XOR: "XOR: 1, wenn die Bits verschieden sind.", NOT: "NOT: jedes Bit wird invertiert.", SHL: "Linksshift um k entspricht Multiplikation mit 2<sup>k</sup> (modulo 256 bei 8 Bit).", SHR: "Rechtsshift um k entspricht ganzzahliger Division durch 2<sup>k</sup>." }[op];
      return {
        type: "numeric", difficulty: 2, points: 3,
        context: "Gegeben sind die vorzeichenlosen 8-Bit-Variablen <code>a = " + a + "</code>" + (op === "AND" || op === "OR" || op === "XOR" ? " und <code>b = " + b + "</code>" : "") + ".",
        question: "Berechnen Sie das Ergebnis der bitweisen Operation <code>" + q + "</code> (8 Bit, vorzeichenlos) und geben Sie es als Dezimalzahl an.",
        answer: r, tolerance: 0,
        solution: pre(line) + "<p>" + regel + "</p><p>Ergebnis: " + bin(r, 8) + " = <b>" + r + "</b></p>"
      };
    }
  });

  G({
    id: "gen-zs-bild", part: "GA2", topic: "ga2-zahlensysteme", title: "Speicherbedarf Rastergrafik",
    generate: function (rnd) {
      var res = pick(rnd, [[640, 480], [800, 600], [1024, 768], [1280, 720], [1280, 1024], [1920, 1080], [2560, 1440], [3840, 2160], [4000, 3000], [6000, 4000]]);
      var depth = pick(rnd, [[8, "8 Bit (256 Farben)"], [16, "16 Bit (High Color)"], [24, "24 Bit (True Color)"], [32, "32 Bit (True Color mit Alphakanal)"]]);
      var binU = rnd() < 0.5;
      var unit = binU ? "MiB" : "MB", uB = binU ? 1048576 : 1e6, uTxt = binU ? "1 MiB = 1.024 × 1.024 Byte = 1.048.576 Byte" : "1 MB = 1.000.000 Byte";
      var bytes = res[0] * res[1] * depth[0] / 8;
      var ctx = "Ein Foto mit einer Auflösung von " + res[0] + " × " + res[1] + " Pixeln und einer Farbtiefe von " + depth[1] + " soll unkomprimiert gespeichert werden.";
      var steps = "<p>Pixel: " + fmt(res[0], 0) + " × " + fmt(res[1], 0) + " = " + fmt(res[0] * res[1], 0) + "<br>Bit: " + fmt(res[0] * res[1], 0) + " × " + depth[0] + " Bit = " + fmt(res[0] * res[1] * depth[0], 0) + " Bit<br>Byte: ÷ 8 = " + fmt(bytes, 0) + " Byte</p>";
      if (rnd() < 0.6) {
        var ans = r2(bytes / uB);
        return {
          type: "numeric", difficulty: 1, points: 3, context: ctx,
          question: "Berechnen Sie den Speicherbedarf des Bildes in <b>" + unit + "</b> (" + uTxt + "). Runden Sie auf zwei Nachkommastellen.",
          answer: ans, tolerance: 0.01, unit: unit,
          solution: steps + "<p>" + fmt(bytes, 0) + " Byte ÷ " + fmt(uB, 0) + " = <b>" + fmt(ans) + " " + unit + "</b></p>"
        };
      }
      var cap = pick(rnd, [4, 8, 16, 32, 64]);
      var cU = binU ? "GiB" : "GB", cB = binU ? 1073741824 : 1e9;
      var cnt = Math.floor(cap * cB / bytes);
      return {
        type: "numeric", difficulty: 2, points: 4, context: ctx,
        question: "Wie viele dieser Bilder passen unkomprimiert vollständig auf eine Speicherkarte mit " + cap + " " + cU + " (" + (binU ? "1 GiB = 2<sup>30</sup> Byte" : "1 GB = 10<sup>9</sup> Byte") + ")? Dateisystem-Overhead wird vernachlässigt.",
        answer: cnt, tolerance: 0, unit: "Bilder",
        solution: steps + "<p>Kapazität: " + cap + " × " + fmt(cB, 0) + " = " + fmt(cap * cB, 0) + " Byte<br>Anzahl: " + fmt(cap * cB, 0) + " ÷ " + fmt(bytes, 0) + " = " + fmt(cap * cB / bytes, 2) + " → abrunden: <b>" + cnt + " Bilder</b></p>",
        explanation: "Bei Kapazitätsfragen immer abrunden – ein angefangenes Bild passt nicht mehr vollständig."
      };
    }
  });

  G({
    id: "gen-zs-audio-video", part: "GA2", topic: "ga2-zahlensysteme", title: "Speicherbedarf Audio/Video (unkomprimiert)",
    generate: function (rnd) {
      var binU = rnd() < 0.5;
      if (rnd() < 0.5) {
        var rate = pick(rnd, [44100, 48000, 96000]), bd = pick(rnd, [16, 24]), ch = pick(rnd, [1, 2]), min = int(rnd, 1, 12);
        var bytes = rate * bd / 8 * ch * min * 60;
        var unit = binU ? "MiB" : "MB", uB = binU ? 1048576 : 1e6;
        var ans = r2(bytes / uB);
        return {
          type: "numeric", difficulty: 2, points: 3,
          context: "Eine Sprachaufzeichnung für ein Schulungsvideo wird als unkomprimiertes PCM-Audio (WAV) aufgenommen: Abtastrate " + fmt(rate, 0) + " Hz, Abtasttiefe " + bd + " Bit, " + (ch === 2 ? "Stereo (2 Kanäle)" : "Mono (1 Kanal)") + ", Dauer " + min + " Minuten.",
          question: "Berechnen Sie den Speicherbedarf in <b>" + unit + "</b> (" + (binU ? "1 MiB = 1.048.576 Byte" : "1 MB = 1.000.000 Byte") + "), gerundet auf zwei Nachkommastellen.",
          answer: ans, tolerance: 0.01, unit: unit,
          solution: "<p>Byte pro Sekunde: " + fmt(rate, 0) + " × " + bd + " Bit ÷ 8 × " + ch + " = " + fmt(rate * bd / 8 * ch, 0) + " Byte/s<br>Dauer: " + min + " × 60 = " + (min * 60) + " s<br>Gesamt: " + fmt(rate * bd / 8 * ch, 0) + " × " + (min * 60) + " = " + fmt(bytes, 0) + " Byte<br>÷ " + fmt(uB, 0) + " = <b>" + fmt(ans) + " " + unit + "</b></p>"
        };
      }
      var res = pick(rnd, [[1280, 720], [1920, 1080], [3840, 2160]]), fps = pick(rnd, [24, 25, 30, 60]), sec = int(rnd, 5, 60);
      var vb = res[0] * res[1] * 3 * fps * sec;
      var vu = binU ? "GiB" : "GB", vB = binU ? 1073741824 : 1e9;
      var va = r2(vb / vB);
      return {
        type: "numeric", difficulty: 2, points: 4,
        context: "Für eine Bildverarbeitungs-Software werden Videosequenzen unkomprimiert zwischengespeichert: Auflösung " + res[0] + " × " + res[1] + " Pixel, Farbtiefe 24 Bit, " + fps + " Bilder pro Sekunde, Länge " + sec + " Sekunden (ohne Ton).",
        question: "Berechnen Sie den Speicherbedarf der Sequenz in <b>" + vu + "</b> (" + (binU ? "1 GiB = 2<sup>30</sup> Byte" : "1 GB = 10<sup>9</sup> Byte") + "), gerundet auf zwei Nachkommastellen.",
        answer: va, tolerance: 0.01, unit: vu,
        solution: "<p>Byte pro Bild: " + res[0] + " × " + res[1] + " × 3 Byte = " + fmt(res[0] * res[1] * 3, 0) + " Byte<br>Bilder: " + fps + " × " + sec + " = " + (fps * sec) + "<br>Gesamt: " + fmt(res[0] * res[1] * 3, 0) + " × " + (fps * sec) + " = " + fmt(vb, 0) + " Byte<br>÷ " + fmt(vB, 0) + " = <b>" + fmt(va) + " " + vu + "</b></p>"
      };
    }
  });

  G({
    id: "gen-zs-uebertragung", part: "GA2", topic: "ga2-zahlensysteme", title: "Übertragungsdauer berechnen",
    generate: function (rnd) {
      var mib = rnd() < 0.3;
      var size = mib ? pick(rnd, [100, 250, 512, 700, 800]) : pick(rnd, [50, 120, 250, 400, 650, 800, 1200, 2500, 4700]);
      var sUnit = mib ? "MiB" : "MB";
      var bytes = mib ? size * 1048576 : size * 1e6;
      var rate = pick(rnd, [16, 25, 50, 100, 250, 500, 1000]);
      var eff = pick(rnd, [100, 90, 80]);
      var bitsTot = bytes * 8;
      var rEff = rate * 1e6 * eff / 100;
      var t = bitsTot / rEff;
      var inMin = t > 300;
      var ans = r2(inMin ? t / 60 : t);
      return {
        type: "numeric", difficulty: 2, points: 3,
        context: "Ein Software-Update mit " + fmt(size, 0) + " " + sUnit + " (" + (mib ? "1 MiB = 1.048.576 Byte" : "1 MB = 1.000.000 Byte") + ") soll über eine Leitung mit " + rate + " Mbit/s (1 Mbit = 10<sup>6</sup> Bit) übertragen werden." + (eff < 100 ? " Durch Protokoll-Overhead stehen nur " + eff + " % der Datenrate als Nutzdatenrate zur Verfügung." : " Protokoll-Overhead wird vernachlässigt."),
        question: "Berechnen Sie die Übertragungsdauer in <b>" + (inMin ? "Minuten" : "Sekunden") + "</b>, gerundet auf zwei Nachkommastellen.",
        answer: ans, tolerance: 0.01, unit: inMin ? "min" : "s",
        solution: "<p>Datenmenge in Bit: " + fmt(bytes, 0) + " Byte × 8 = " + fmt(bitsTot, 0) + " Bit<br>Nutzdatenrate: " + rate + " × 10<sup>6</sup>" + (eff < 100 ? " × " + (eff / 100).toString().replace(".", ",") : "") + " = " + fmt(rEff, 0) + " Bit/s<br>Dauer: " + fmt(bitsTot, 0) + " ÷ " + fmt(rEff, 0) + " = " + fmt(t, 4) + " s" + (inMin ? " ÷ 60 = <b>" + fmt(ans) + " min</b>" : " ≈ <b>" + fmt(ans) + " s</b>") + "</p>",
        explanation: "Häufigster Fehler: Byte und Bit nicht umgerechnet (Faktor 8) oder Binär- und Dezimalpräfixe vermischt."
      };
    }
  });

  G({
    id: "gen-zs-wertebereich", part: "GA2", topic: "ga2-zahlensysteme", title: "Wertebereich n-Bit / benötigte Bits",
    generate: function (rnd) {
      var mode = pick(rnd, ["umax", "smin", "smax", "anz", "bits"]);
      var n = pick(rnd, [4, 6, 8, 10, 12, 16, 20, 24]);
      if (mode === "bits") {
        var N = int(rnd, 20, 70000);
        var b = Math.ceil(Math.log2(N));
        if (Math.pow(2, b) < N) b++;
        if (Math.pow(2, b - 1) >= N) b--;
        var obj = pick(rnd, ["Artikelnummern", "Kundennummern", "Sensor-Kennungen", "Raumnummern"]);
        return {
          type: "numeric", difficulty: 2, points: 2,
          question: "In einem System sollen " + fmt(N, 0) + " verschiedene " + obj + " (fortlaufend ab 0) binär codiert werden. Wie viele Bit werden mindestens benötigt?",
          answer: b, tolerance: 0, unit: "Bit",
          solution: "<p>Gesucht ist das kleinste n mit 2<sup>n</sup> ≥ " + fmt(N, 0) + ".<br>2<sup>" + (b - 1) + "</sup> = " + fmt(Math.pow(2, b - 1), 0) + " &lt; " + fmt(N, 0) + " ≤ 2<sup>" + b + "</sup> = " + fmt(Math.pow(2, b), 0) + "<br>→ <b>" + b + " Bit</b> (n = ⌈log<sub>2</sub>(" + fmt(N, 0) + ")⌉)</p>"
        };
      }
      var ans, q, sol;
      if (mode === "umax") { ans = Math.pow(2, n) - 1; q = "den größten Wert einer <b>vorzeichenlosen</b> (unsigned) " + n + "-Bit-Ganzzahl"; sol = "Unsigned: 0 … 2<sup>n</sup> − 1 = 2<sup>" + n + "</sup> − 1 = <b>" + fmt(ans, 0) + "</b>"; }
      else if (mode === "smin") { ans = -Math.pow(2, n - 1); q = "den kleinsten Wert einer <b>vorzeichenbehafteten</b> " + n + "-Bit-Ganzzahl (Zweierkomplement)"; sol = "Signed (Zweierkomplement): −2<sup>n−1</sup> … 2<sup>n−1</sup> − 1 → kleinster Wert −2<sup>" + (n - 1) + "</sup> = <b>" + fmt(ans, 0) + "</b>"; }
      else if (mode === "smax") { ans = Math.pow(2, n - 1) - 1; q = "den größten Wert einer <b>vorzeichenbehafteten</b> " + n + "-Bit-Ganzzahl (Zweierkomplement)"; sol = "Signed (Zweierkomplement): −2<sup>n−1</sup> … 2<sup>n−1</sup> − 1 → größter Wert 2<sup>" + (n - 1) + "</sup> − 1 = <b>" + fmt(ans, 0) + "</b>"; }
      else { ans = Math.pow(2, n); q = "die Anzahl unterschiedlicher Werte, die mit " + n + " Bit darstellbar sind"; sol = "Anzahl Kombinationen: 2<sup>" + n + "</sup> = <b>" + fmt(ans, 0) + "</b> (unabhängig davon, ob signed oder unsigned)"; }
      return {
        type: "numeric", difficulty: 1, points: 2,
        question: "Bestimmen Sie " + q + ".",
        answer: ans, tolerance: 0,
        solution: "<p>" + sol + "</p><p>Zum Vergleich bei " + n + " Bit: unsigned 0 … " + fmt(Math.pow(2, n) - 1, 0) + ", signed " + fmt(-Math.pow(2, n - 1), 0) + " … " + fmt(Math.pow(2, n - 1) - 1, 0) + ".</p>"
      };
    }
  });

  G({
    id: "gen-zs-modulo", part: "GA2", topic: "ga2-zahlensysteme", title: "Modulo und Ganzzahldivision",
    generate: function (rnd) {
      var mode = pick(rnd, ["expr", "zeit", "tag"]);
      if (mode === "expr") {
        var a = int(rnd, 57, 999), b = int(rnd, 3, 12), c = int(rnd, 3, 9);
        var r = (a % b) + Math.floor(a / c);
        return {
          type: "numeric", difficulty: 1, points: 2,
          question: "Gegeben ist folgender Pseudocode (DIV = ganzzahlige Division, MOD = Rest der ganzzahligen Division). Welchen Wert hat <code>x</code>?" + pre("a ← " + a + "\nx ← a MOD " + b + " + a DIV " + c),
          answer: r, tolerance: 0,
          solution: "<p>" + a + " MOD " + b + " = " + (a % b) + " (denn " + Math.floor(a / b) + " × " + b + " = " + (Math.floor(a / b) * b) + ", Rest " + (a % b) + ")<br>" + a + " DIV " + c + " = " + Math.floor(a / c) + "<br>x = " + (a % b) + " + " + Math.floor(a / c) + " = <b>" + r + "</b></p>"
        };
      }
      if (mode === "zeit") {
        var s = int(rnd, 3700, 86399);
        var what = pick(rnd, ["h", "m", "s"]);
        var h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
        var ans = what === "h" ? h : what === "m" ? m : sec;
        return {
          type: "numeric", difficulty: 1, points: 2,
          question: "Ein Programm rechnet eine Dauer von <b>" + fmt(s, 0) + "</b> Sekunden mit folgendem Pseudocode um. Welchen Wert hat die Variable <code>" + { h: "stunden", m: "minuten", s: "sekunden" }[what] + "</code> am Ende?" +
            pre("dauer    ← " + s + "\nstunden  ← dauer DIV 3600\nminuten  ← (dauer MOD 3600) DIV 60\nsekunden ← dauer MOD 60"),
          answer: ans, tolerance: 0,
          solution: "<p>stunden = " + s + " DIV 3600 = " + h + "<br>" + s + " MOD 3600 = " + (s % 3600) + " → minuten = " + (s % 3600) + " DIV 60 = " + m + "<br>sekunden = " + s + " MOD 60 = " + sec + "</p><p>Ergebnis: " + h + " h " + m + " min " + sec + " s → gesucht: <b>" + ans + "</b></p>"
        };
      }
      var tage = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];
      var t0 = int(rnd, 0, 6), d = int(rnd, 10, 400);
      var t1 = (t0 + d) % 7;
      var mm = mc(rnd, tage[t1], shuffle(rnd, [tage[(t1 + 1) % 7], tage[(t1 + 6) % 7], tage[(t0 + d % 10) % 7], tage[(t1 + 2) % 7], tage[(t1 + 5) % 7]]));
      return {
        type: "mc", difficulty: 1, points: 2,
        question: "Die Wochentage sind von 0 (Montag) bis 6 (Sonntag) nummeriert. Heute ist " + tage[t0] + " (" + t0 + "). Welcher Wochentag ist in <b>" + d + " Tagen</b>? Nutzen Sie <code>(heute + tage) MOD 7</code>.",
        options: mm.options, correct: mm.correct,
        solution: "<p>(" + t0 + " + " + d + ") MOD 7 = " + (t0 + d) + " MOD 7 = " + t1 + " → <b>" + tage[t1] + "</b></p>"
      };
    }
  });

  // ===========================================================================
  // GA2 – Pseudocode / Schreibtischtest
  // ===========================================================================
  var PC_ARRAY = [
    {
      name: "Summe gerader Werte",
      code: "summe ← 0\nFÜR i ← 0 BIS laenge(zahlen) − 1\n    WENN zahlen[i] MOD 2 = 0 DANN\n        summe ← summe + zahlen[i]\n    ENDE WENN\nENDE FÜR\nAUSGABE summe",
      run: function (a) {
        var s = 0, rows = [];
        a.forEach(function (v, i) { var c = v % 2 === 0; if (c) s += v; rows.push([i, v, c ? "wahr" : "falsch", s]); });
        return { r: s, t: table(["i", "zahlen[i]", "gerade?", "summe"], rows) };
      }
    },
    {
      name: "Index des Maximums",
      code: "pos ← 0\nFÜR i ← 1 BIS laenge(zahlen) − 1\n    WENN zahlen[i] > zahlen[pos] DANN\n        pos ← i\n    ENDE WENN\nENDE FÜR\nAUSGABE pos",
      run: function (a) {
        var p = 0, rows = [["–", "–", "Start", 0]];
        for (var i = 1; i < a.length; i++) { var c = a[i] > a[p]; rows.push([i, a[i] + " &gt; " + a[p] + "?", c ? "wahr" : "falsch", c ? i : p]); if (c) p = i; }
        return { r: p, t: table(["i", "Vergleich", "Ergebnis", "pos"], rows) };
      }
    },
    {
      name: "Zählen größer Grenze",
      grenze: true,
      code: "anzahl ← 0\nFÜR i ← 0 BIS laenge(zahlen) − 1\n    WENN zahlen[i] > grenze DANN\n        anzahl ← anzahl + 1\n    ENDE WENN\nENDE FÜR\nAUSGABE anzahl",
      run: function (a, g) {
        var n = 0, rows = [];
        a.forEach(function (v, i) { var c = v > g; if (c) n++; rows.push([i, v, c ? "wahr" : "falsch", n]); });
        return { r: n, t: table(["i", "zahlen[i]", "&gt; " + g + "?", "anzahl"], rows) };
      }
    },
    {
      name: "Alternierende Summe",
      code: "wert ← 0\nFÜR i ← 0 BIS laenge(zahlen) − 1\n    WENN i MOD 2 = 0 DANN\n        wert ← wert + zahlen[i]\n    SONST\n        wert ← wert − zahlen[i]\n    ENDE WENN\nENDE FÜR\nAUSGABE wert",
      run: function (a) {
        var w = 0, rows = [];
        a.forEach(function (v, i) { if (i % 2 === 0) w += v; else w -= v; rows.push([i, v, i % 2 === 0 ? "+" : "−", w]); });
        return { r: w, t: table(["i", "zahlen[i]", "Operation", "wert"], rows) };
      }
    },
    {
      name: "Größte Differenz benachbarter Werte",
      code: "maxDiff ← 0\nFÜR i ← 1 BIS laenge(zahlen) − 1\n    diff ← zahlen[i] − zahlen[i − 1]\n    WENN diff < 0 DANN\n        diff ← −diff\n    ENDE WENN\n    WENN diff > maxDiff DANN\n        maxDiff ← diff\n    ENDE WENN\nENDE FÜR\nAUSGABE maxDiff",
      run: function (a) {
        var m = 0, rows = [];
        for (var i = 1; i < a.length; i++) { var d = Math.abs(a[i] - a[i - 1]); if (d > m) m = d; rows.push([i, a[i] + " − " + a[i - 1], d, m]); }
        return { r: m, t: table(["i", "Differenz", "|diff|", "maxDiff"], rows) };
      }
    },
    {
      name: "Fehlstellungen zählen (verschachtelt)",
      code: "zaehler ← 0\nFÜR i ← 0 BIS laenge(zahlen) − 2\n    FÜR j ← i + 1 BIS laenge(zahlen) − 1\n        WENN zahlen[i] > zahlen[j] DANN\n            zaehler ← zaehler + 1\n        ENDE WENN\n    ENDE FÜR\nENDE FÜR\nAUSGABE zaehler",
      run: function (a) {
        var z = 0, rows = [];
        for (var i = 0; i < a.length - 1; i++) {
          var hits = [];
          for (var j = i + 1; j < a.length; j++) if (a[i] > a[j]) { z++; hits.push(a[j]); }
          rows.push([i, a[i], hits.length ? hits.join(", ") : "–", hits.length, z]);
        }
        return { r: z, t: table(["i", "zahlen[i]", "kleinere Werte rechts davon", "Treffer", "zaehler"], rows) };
      }
    },
    {
      name: "Paare mit durch 5 teilbarer Summe (verschachtelt)",
      code: "paare ← 0\nFÜR i ← 0 BIS laenge(zahlen) − 2\n    FÜR j ← i + 1 BIS laenge(zahlen) − 1\n        WENN (zahlen[i] + zahlen[j]) MOD 5 = 0 DANN\n            paare ← paare + 1\n        ENDE WENN\n    ENDE FÜR\nENDE FÜR\nAUSGABE paare",
      run: function (a) {
        var z = 0, list = [];
        for (var i = 0; i < a.length - 1; i++) for (var j = i + 1; j < a.length; j++) if ((a[i] + a[j]) % 5 === 0) { z++; list.push("(" + a[i] + " + " + a[j] + " = " + (a[i] + a[j]) + ")"); }
        return { r: z, t: "<p>Gefundene Paare (i &lt; j): " + (list.length ? list.join(", ") : "keine") + "</p>" };
      }
    }
  ];
  G({
    id: "gen-pc-array", part: "GA2", topic: "ga2-pseudocode", title: "Schreibtischtest: Algorithmus auf Array",
    generate: function (rnd) {
      var alg = pick(rnd, PC_ARRAY);
      var n = int(rnd, 6, 8);
      var a = []; for (var i = 0; i < n; i++) a.push(int(rnd, 1, 40));
      var g = int(rnd, 10, 30);
      var res = alg.run(a, g);
      return {
        type: "numeric", difficulty: alg.code.indexOf("FÜR j") >= 0 ? 3 : 2, points: alg.code.indexOf("FÜR j") >= 0 ? 5 : 4,
        context: "Gegeben ist das Array <code>zahlen = " + arr(a) + "</code> (Indizes beginnen bei 0)" + (alg.grenze ? " sowie <code>grenze = " + g + "</code>" : "") + ".",
        question: "Führen Sie einen Schreibtischtest für den folgenden Algorithmus durch. Welcher Wert wird ausgegeben?" + pre(alg.code),
        answer: res.r, tolerance: 0,
        solution: "<p>Schreibtischtest (" + alg.name + "):</p>" + res.t + "<p>Ausgabe: <b>" + res.r + "</b></p>",
        explanation: "Im Schreibtischtest jede Variable nach jedem Schleifendurchlauf notieren. Achten Sie auf die Schleifengrenzen (Start bei 0 oder 1, Ende bei laenge − 1 bzw. − 2)."
      };
    }
  });

  G({
    id: "gen-pc-schleifen", part: "GA2", topic: "ga2-pseudocode", title: "Schreibtischtest: Kopfgesteuerte Schleifen",
    generate: function (rnd) {
      var v = pick(rnd, ["quersumme", "ggt", "collatz", "verdoppeln", "zins"]);
      var code, rows = [], ans, q, ctx = "", it = 0;
      if (v === "quersumme") {
        var n0 = int(rnd, 1000, 999999), n = n0, s = 0;
        code = "n ← " + n0 + "\ns ← 0\nschritte ← 0\nSOLANGE n > 0\n    s ← s + n MOD 10\n    n ← n DIV 10\n    schritte ← schritte + 1\nENDE SOLANGE";
        while (n > 0) { s += n % 10; n = Math.floor(n / 10); it++; rows.push([it, s, n]); }
        var askS = rnd() < 0.6;
        ans = askS ? s : it; q = askS ? "s" : "schritte";
        rows = table(["Durchlauf", "s", "n"], rows);
      } else if (v === "ggt") {
        var a0 = int(rnd, 40, 300), b0 = int(rnd, 12, 200), a = a0, b = b0;
        code = "a ← " + a0 + "\nb ← " + b0 + "\nschritte ← 0\nSOLANGE b ≠ 0\n    rest ← a MOD b\n    a ← b\n    b ← rest\n    schritte ← schritte + 1\nENDE SOLANGE";
        while (b !== 0) { var r = a % b; a = b; b = r; it++; rows.push([it, r, a, b]); }
        var askA = rnd() < 0.6;
        ans = askA ? a : it; q = askA ? "a" : "schritte";
        rows = table(["Durchlauf", "rest", "a", "b"], rows);
        ctx = " (Euklidischer Algorithmus – a enthält am Ende den größten gemeinsamen Teiler)";
      } else if (v === "collatz") {
        var st, steps;
        do { st = int(rnd, 5, 40); var x = st; steps = 0; while (x !== 1) { x = x % 2 === 0 ? x / 2 : 3 * x + 1; steps++; } } while (steps > 20);
        code = "x ← " + st + "\nschritte ← 0\nSOLANGE x ≠ 1\n    WENN x MOD 2 = 0 DANN\n        x ← x DIV 2\n    SONST\n        x ← 3 * x + 1\n    ENDE WENN\n    schritte ← schritte + 1\nENDE SOLANGE";
        var y = st; while (y !== 1) { y = y % 2 === 0 ? y / 2 : 3 * y + 1; it++; rows.push([it, y]); }
        ans = it; q = "schritte";
        rows = table(["Durchlauf", "x"], rows);
      } else if (v === "verdoppeln") {
        var g = int(rnd, 50, 5000), k = 1, f = int(rnd, 2, 3);
        code = "k ← 1\nz ← 0\nSOLANGE k < " + g + "\n    k ← k * " + f + " + 1\n    z ← z + 1\nENDE SOLANGE";
        while (k < g) { k = k * f + 1; it++; rows.push([it, k]); }
        var askK = rnd() < 0.5;
        ans = askK ? k : it; q = askK ? "k" : "z";
        rows = table(["Durchlauf (z)", "k"], rows);
      } else {
        var k0 = int(rnd, 5, 50) * 100, p = pick(rnd, [2, 3, 4, 5, 6, 8]), ziel = k0 * pick(rnd, [1.5, 2]);
        code = "kapital ← " + k0 + "\njahre ← 0\nSOLANGE kapital < " + ziel + "\n    kapital ← kapital * " + (1 + p / 100).toFixed(2) + "\n    jahre ← jahre + 1\nENDE SOLANGE";
        var kk = k0;
        while (kk < ziel - 1e-9) { kk = kk * (1 + p / 100); it++; rows.push([it, fmt(kk)]); }
        ans = it; q = "jahre";
        rows = table(["Durchlauf (jahre)", "kapital"], rows);
      }
      return {
        type: "numeric", difficulty: 2, points: 4,
        question: "Führen Sie für folgenden Pseudocode" + ctx + " einen Schreibtischtest durch. Welchen Wert hat die Variable <code>" + q + "</code> nach Ende der Schleife? (DIV = ganzzahlige Division, MOD = Divisionsrest)" + pre(code),
        answer: ans, tolerance: 0,
        solution: "<p>Werte nach jedem Schleifendurchlauf:</p>" + rows + "<p>Ergebnis: <code>" + q + "</code> = <b>" + ans + "</b></p>",
        explanation: "Bei kopfgesteuerten Schleifen (SOLANGE) wird die Bedingung vor jedem Durchlauf geprüft – ist sie zu Beginn falsch, wird der Rumpf gar nicht ausgeführt."
      };
    }
  });

  // ===========================================================================
  // GA2 – Sortieren & Suchen
  // ===========================================================================
  function bubble(a, k) {
    var b = a.slice(), log = [];
    for (var p = 0; p < k && p < b.length - 1; p++) {
      var st = [];
      for (var j = 0; j < b.length - 1 - p; j++) {
        if (b[j] > b[j + 1]) { var t = b[j]; b[j] = b[j + 1]; b[j + 1] = t; st.push(b[j + 1] + " ↔ " + b[j] + ": tauschen → " + arr(b)); }
        else st.push(b[j] + " ↔ " + b[j + 1] + ": kein Tausch");
      }
      log.push("<p><b>" + (p + 1) + ". Durchlauf:</b><br>" + st.join("<br>") + "</p>");
    }
    return { a: b, log: log.join("") };
  }
  function selection(a, k) {
    var b = a.slice(), log = [];
    for (var i = 0; i < k && i < b.length - 1; i++) {
      var m = i;
      for (var j = i + 1; j < b.length; j++) if (b[j] < b[m]) m = j;
      var t = b[i]; b[i] = b[m]; b[m] = t;
      log.push("<p><b>" + (i + 1) + ". Durchlauf:</b> Minimum im Bereich ab Index " + i + " ist " + b[i] + (m !== i ? " (Index " + m + ") → mit Index " + i + " tauschen" : " – steht schon an Position " + i) + " → " + arr(b) + "</p>");
    }
    return { a: b, log: log.join("") };
  }
  function insertion(a, k) {
    var b = a.slice(), log = [];
    for (var i = 1; i <= k && i < b.length; i++) {
      var key = b[i], j = i - 1;
      while (j >= 0 && b[j] > key) { b[j + 1] = b[j]; j--; }
      b[j + 1] = key;
      log.push("<p><b>" + i + ". Durchlauf:</b> Element " + key + " wird in den sortierten Teil links eingefügt (an Index " + (j + 1) + ") → " + arr(b) + "</p>");
    }
    return { a: b, log: log.join("") };
  }
  function sortedCopy(a) { return a.slice().sort(function (x, y) { return x - y; }); }
  // Fallback-Distraktoren: zwei benachbarte Elemente vertauschen
  function perturbs(rnd, a, k) {
    var out = [];
    for (var i = 0; i < k; i++) { var b = a.slice(), j = int(rnd, 0, b.length - 2), t = b[j]; b[j] = b[j + 1]; b[j + 1] = t; out.push(arr(b)); }
    return out;
  }

  G({
    id: "gen-sort-bubble", part: "GA2", topic: "ga2-sortieren-suchen", title: "Bubble Sort: Zustand nach k Durchläufen",
    generate: function (rnd) {
      var a, k, r;
      do {
        a = distinctInts(rnd, int(rnd, 6, 7), 1, 60);
        k = int(rnd, 1, 2);
        r = bubble(a, k);
      } while (arr(r.a) === arr(sortedCopy(a)) || arr(r.a) === arr(a));
      var wrongs = shuffle(rnd, [bubble(a, k + 1).a, k > 1 ? bubble(a, k - 1).a : a, selection(a, k).a, insertion(a, k).a, insertion(a, k + 1).a, selection(a, k + 1).a, sortedCopy(a)].map(arr)).concat(perturbs(rnd, r.a, 6));
      var m = mc(rnd, arr(r.a), wrongs);
      return {
        type: "mc", difficulty: 2, points: 4,
        context: "Das Array <code>" + arr(a) + "</code> soll mit Bubble Sort <b>aufsteigend</b> sortiert werden. In jedem Durchlauf werden benachbarte Elemente von links nach rechts verglichen und bei Bedarf getauscht; das größte Element „blubbert“ dabei ans Ende.",
        question: "Wie sieht das Array nach dem <b>" + k + ". Durchlauf</b> aus?",
        options: m.options, correct: m.correct,
        solution: r.log + "<p>Ergebnis nach " + k + " Durchl" + (k === 1 ? "auf" : "äufen") + ": <b>" + arr(r.a) + "</b></p>",
        explanation: "Nach dem k-ten Durchlauf stehen die k größten Elemente sortiert am Ende. Distraktoren stammen aus Selection Sort, Insertion Sort oder anderen Durchläufen."
      };
    }
  });

  G({
    id: "gen-sort-bubble-zaehlen", part: "GA2", topic: "ga2-sortieren-suchen", title: "Bubble Sort: Vertauschungen/Vergleiche/Durchläufe zählen",
    generate: function (rnd) {
      var a = distinctInts(rnd, int(rnd, 5, 7), 1, 50);
      var mode = pick(rnd, ["tausch", "tausch", "durchlaeufe", "vergleiche"]);
      var b = a.slice(), n = b.length, passes = 0, swaps = 0, comps = 0, rows = [], got;
      do {
        got = false; var ps = 0, pc = 0;
        for (var j = 0; j <= n - 2; j++) { pc++; if (b[j] > b[j + 1]) { var t = b[j]; b[j] = b[j + 1]; b[j + 1] = t; got = true; ps++; } }
        n--; passes++; swaps += ps; comps += pc;
        rows.push([passes, arr(b), pc, ps]);
      } while (got);
      var ans = mode === "tausch" ? swaps : mode === "durchlaeufe" ? passes : comps;
      var label = { tausch: "Wie viele <b>Vertauschungen</b> werden insgesamt durchgeführt?", durchlaeufe: "Wie viele <b>Durchläufe</b> der äußeren Schleife (WIEDERHOLE) werden ausgeführt?", vergleiche: "Wie viele <b>Vergleiche</b> <code>a[j] &gt; a[j + 1]</code> werden insgesamt ausgeführt?" }[mode];
      return {
        type: "numeric", difficulty: 2, points: 4,
        context: "Gegeben ist das Array <code>a = " + arr(a) + "</code> und folgender optimierter Bubble Sort:" + pre("n ← laenge(a)\nWIEDERHOLE\n    getauscht ← falsch\n    FÜR j ← 0 BIS n − 2\n        WENN a[j] > a[j + 1] DANN\n            tausche a[j] und a[j + 1]\n            getauscht ← wahr\n        ENDE WENN\n    ENDE FÜR\n    n ← n − 1\nSOLANGE getauscht = wahr"),
        question: label,
        answer: ans, tolerance: 0,
        solution: table(["Durchlauf", "Array danach", "Vergleiche", "Vertauschungen"], rows) + "<p>Summe: " + comps + " Vergleiche, " + swaps + " Vertauschungen, " + passes + " Durchläufe (der letzte Durchlauf ohne Tausch beendet den Algorithmus).</p><p>Gesucht: <b>" + ans + "</b></p>",
        explanation: "Die Anzahl der Vertauschungen entspricht der Anzahl der Fehlstellungen (Paare i &lt; j mit a[i] &gt; a[j])."
      };
    }
  });

  G({
    id: "gen-sort-sel-ins", part: "GA2", topic: "ga2-sortieren-suchen", title: "Selection/Insertion Sort: Zustand nach k Durchläufen",
    generate: function (rnd) {
      var a, k, algo, r;
      do {
        a = distinctInts(rnd, 7, 1, 70);
        k = int(rnd, 1, 3);
        algo = pick(rnd, ["sel", "ins"]);
        r = algo === "sel" ? selection(a, k) : insertion(a, k);
      } while (arr(r.a) === arr(a));
      var other = algo === "sel" ? insertion : selection;
      var self = algo === "sel" ? selection : insertion;
      var wrongs = shuffle(rnd, [other(a, k).a, bubble(a, k).a, self(a, k + 1).a, k > 1 ? self(a, k - 1).a : a, other(a, k + 1).a, sortedCopy(a)].map(arr)).concat(perturbs(rnd, r.a, 6));
      var m = mc(rnd, arr(r.a), wrongs);
      var desc = algo === "sel" ? "<b>Selection Sort</b> (im unsortierten Teil das Minimum suchen und mit dem ersten unsortierten Element tauschen)" : "<b>Insertion Sort</b> (das jeweils nächste Element in den bereits sortierten linken Teil einfügen; der 1. Durchlauf betrachtet das Element an Index 1)";
      return {
        type: "mc", difficulty: 2, points: 4,
        context: "Das Array <code>" + arr(a) + "</code> wird mit " + desc + " aufsteigend sortiert.",
        question: "Wie sieht das Array nach dem <b>" + k + ". Durchlauf</b> aus?",
        options: m.options, correct: m.correct,
        solution: r.log + "<p>Ergebnis: <b>" + arr(r.a) + "</b></p>",
        explanation: algo === "sel" ? "Selection Sort: nach k Durchläufen stehen die k kleinsten Elemente endgültig vorn." : "Insertion Sort: nach k Durchläufen sind die ersten k+1 Elemente untereinander sortiert, aber noch nicht endgültig platziert."
      };
    }
  });

  function binSearch(a, x, ceil) {
    var l = 0, r = a.length - 1, rows = [], idx = [];
    while (l <= r) {
      var m = ceil ? Math.floor((l + r + 1) / 2) : Math.floor((l + r) / 2);
      idx.push(m);
      if (a[m] === x) { rows.push([l, r, m, a[m], "gefunden"]); return { found: m, rows: rows, idx: idx }; }
      if (a[m] < x) { rows.push([l, r, m, a[m], a[m] + " &lt; " + x + " → links = " + (m + 1)]); l = m + 1; }
      else { rows.push([l, r, m, a[m], a[m] + " &gt; " + x + " → rechts = " + (m - 1)]); r = m - 1; }
    }
    return { found: -1, rows: rows, idx: idx };
  }
  G({
    id: "gen-such-binaer", part: "GA2", topic: "ga2-sortieren-suchen", title: "Binäre Suche durchführen",
    generate: function (rnd) {
      var a = sortedCopy(distinctInts(rnd, int(rnd, 10, 15), 2, 99));
      var x;
      if (rnd() < 0.7) x = a[int(rnd, 0, a.length - 1)];
      else { do { x = int(rnd, a[0] + 1, a[a.length - 1] - 1); } while (a.indexOf(x) >= 0); }
      var s = binSearch(a, x, false);
      var code = pre("links ← 0\nrechts ← laenge(a) − 1\nSOLANGE links ≤ rechts\n    mitte ← (links + rechts) DIV 2\n    WENN a[mitte] = suchwert DANN\n        RÜCKGABE mitte\n    SONST WENN a[mitte] < suchwert DANN\n        links ← mitte + 1\n    SONST\n        rechts ← mitte − 1\n    ENDE WENN\nENDE SOLANGE\nRÜCKGABE −1");
      var ctx = "Gegeben ist das sortierte Array <code>a = " + arr(a) + "</code> (Indizes 0 bis " + (a.length - 1) + ") und folgender Algorithmus für die binäre Suche:" + code;
      var sol = table(["links", "rechts", "mitte", "a[mitte]", "Entscheidung"], s.rows) + "<p>" + (s.found >= 0 ? "Der Suchwert " + x + " wird an Index " + s.found + " gefunden." : "Der Suchwert " + x + " ist nicht enthalten (links &gt; rechts) → Rückgabe −1.") + "</p>";
      if (rnd() < 0.5) {
        return {
          type: "numeric", difficulty: 2, points: 4, context: ctx,
          question: "Es wird nach dem Wert <b>" + x + "</b> gesucht. Wie viele Elemente des Arrays werden dabei mit dem Suchwert verglichen (= Anzahl der Schleifendurchläufe)?",
          answer: s.idx.length, tolerance: 0,
          solution: sol + "<p>Anzahl untersuchter Elemente: <b>" + s.idx.length + "</b></p>"
        };
      }
      var fmtI = function (l) { return "Indizes " + l.join(", "); };
      var c = binSearch(a, x, true).idx;
      var lin = []; for (var i = 0; i < Math.min(a.length, s.idx.length + 1); i++) lin.push(i);
      var wrongs = shuffle(rnd, [fmtI(c), fmtI(s.idx.map(function (v) { return v + 1; })), s.idx.length > 1 ? fmtI(s.idx.slice(0, -1)) : null, fmtI(s.idx.concat([s.idx[s.idx.length - 1] + 1])), fmtI(lin), fmtI(s.idx.slice().reverse())]);
      if (s.idx.length === 1) wrongs.push(fmtI([s.idx[0], s.idx[0] + 1]));
      var m = mc(rnd, fmtI(s.idx), wrongs);
      return {
        type: "mc", difficulty: 2, points: 4, context: ctx,
        question: "Es wird nach dem Wert <b>" + x + "</b> gesucht. Welche Indizes nimmt <code>mitte</code> nacheinander an?",
        options: m.options, correct: m.correct,
        solution: sol + "<p>Folge von <code>mitte</code>: <b>" + fmtI(s.idx) + "</b></p>",
        explanation: "DIV rundet ab – wer (links + rechts) / 2 aufrundet, erhält eine andere Indexfolge."
      };
    }
  });

  G({
    id: "gen-such-aufwand", part: "GA2", topic: "ga2-sortieren-suchen", title: "Suchaufwand: maximale Vergleiche",
    generate: function (rnd) {
      var mode = pick(rnd, ["bin", "bin", "elems", "lin"]);
      if (mode === "elems") {
        var k = int(rnd, 4, 20);
        var e = Math.pow(2, k) - 1;
        return {
          type: "numeric", difficulty: 2, points: 2,
          question: "Wie viele Elemente darf ein sortiertes Array <b>höchstens</b> enthalten, damit eine binäre Suche in jedem Fall mit maximal <b>" + k + " Vergleichen</b> auskommt?",
          answer: e, tolerance: 0,
          solution: "<p>Mit k Vergleichen lassen sich höchstens 2<sup>k</sup> − 1 Elemente durchsuchen: 2<sup>" + k + "</sup> − 1 = <b>" + fmt(e, 0) + "</b></p>"
        };
      }
      var n = pick(rnd, [7, 10, 15, 16, 31, 50, 64, 100, 127, 128, 500, 1000, 1023, 1024, 4096, 10000, 65535, 100000, 1000000]);
      if (mode === "lin") {
        var avg = rnd() < 0.5;
        var ans = avg ? r2((n + 1) / 2) : n;
        return {
          type: "numeric", difficulty: 1, points: 2,
          question: "Ein unsortiertes Array enthält " + fmt(n, 0) + " Elemente. Wie viele Vergleiche benötigt eine <b>lineare Suche</b> " + (avg ? "<b>durchschnittlich</b> bei einer erfolgreichen Suche (jedes Element gleich wahrscheinlich gesucht; ggf. auf zwei Nachkommastellen runden)" : "im <b>schlechtesten Fall</b>") + "?",
          answer: ans, tolerance: avg ? 0.01 : 0,
          solution: "<p>" + (avg ? "Durchschnitt (n + 1) / 2 = (" + fmt(n, 0) + " + 1) / 2 = <b>" + fmt(ans) + "</b>" : "Worst Case: alle n Elemente werden geprüft → <b>" + fmt(n, 0) + "</b>") + "</p><p>Laufzeitklasse: O(n).</p>"
        };
      }
      var b = Math.floor(Math.log2(n)) + 1;
      if (Math.pow(2, b - 1) > n) b--;
      if (Math.pow(2, b) <= n) b++;
      return {
        type: "numeric", difficulty: 2, points: 2,
        question: "Ein sortiertes Array enthält " + fmt(n, 0) + " Elemente. Wie viele Vergleiche benötigt die <b>binäre Suche</b> im schlechtesten Fall höchstens?",
        answer: b, tolerance: 0,
        solution: "<p>Maximale Vergleiche = ⌊log<sub>2</sub>(n)⌋ + 1 = ⌈log<sub>2</sub>(n + 1)⌉.<br>2<sup>" + (b - 1) + "</sup> = " + fmt(Math.pow(2, b - 1), 0) + " ≤ " + fmt(n, 0) + " &lt; 2<sup>" + b + "</sup> = " + fmt(Math.pow(2, b), 0) + " → <b>" + b + " Vergleiche</b></p><p>Zum Vergleich: lineare Suche im Worst Case " + fmt(n, 0) + " Vergleiche.</p>"
      };
    }
  });

  // ===========================================================================
  // GA2 – Datenstrukturen
  // ===========================================================================
  G({
    id: "gen-ds-stack-queue", part: "GA2", topic: "ga2-datenstrukturen", title: "Stack/Queue: Operationsfolge auswerten",
    generate: function (rnd) {
      var stack = rnd() < 0.5;
      var ops = [], st = [], rows = [], used = {}, lastPop = null;
      var len = int(rnd, 8, 11);
      for (var i = 0; i < len; i++) {
        var doPush = st.length === 0 || rnd() < 0.6;
        if (i === len - 1 && lastPop === null && st.length > 0) doPush = false;
        if (doPush) {
          var v; do { v = int(rnd, 1, 99); } while (used[v]); used[v] = true;
          st.push(v); ops.push((stack ? "push(" : "enqueue(") + v + ")");
          rows.push([ops[ops.length - 1], "[" + st.join(", ") + "]", "–"]);
        } else {
          lastPop = stack ? st.pop() : st.shift();
          ops.push(stack ? "pop()" : "dequeue()");
          rows.push([ops[ops.length - 1], "[" + st.join(", ") + "]", lastPop]);
        }
      }
      if (st.length === 0) { var w; do { w = int(rnd, 1, 99); } while (used[w]); st.push(w); ops.push((stack ? "push(" : "enqueue(") + w + ")"); rows.push([ops[ops.length - 1], "[" + st.join(", ") + "]", "–"]); }
      var mode = pick(rnd, ["top", "top", "size", "last"]);
      if (mode === "last" && lastPop === null) mode = "top";
      var ans = mode === "top" ? (stack ? st[st.length - 1] : st[0]) : mode === "size" ? st.length : lastPop;
      var q = mode === "top" ? (stack ? "Welcher Wert liegt nach Ausführung aller Operationen <b>oben auf dem Stack</b> (top)?" : "Welcher Wert steht nach Ausführung aller Operationen <b>vorne in der Queue</b> (front)?")
        : mode === "size" ? "Wie viele Elemente enthält die Datenstruktur nach Ausführung aller Operationen?" : "Welchen Wert liefert die <b>letzte</b> " + (stack ? "pop()" : "dequeue()") + "-Operation zurück?";
      return {
        type: "numeric", difficulty: 1, points: 3,
        context: "Auf einen anfangs leeren " + (stack ? "<b>Stack</b> (LIFO)" : "<b>Queue</b> (FIFO)") + " werden nacheinander folgende Operationen ausgeführt:<br><code>" + ops.join(", ") + "</code>",
        question: q, answer: ans, tolerance: 0,
        solution: table(["Operation", "Inhalt danach (" + (stack ? "unten → oben" : "vorne → hinten") + ")", "Rückgabe"], rows) + "<p>Ergebnis: <b>" + ans + "</b></p>",
        explanation: stack ? "Stack = Last In, First Out: pop() entfernt immer das zuletzt hinzugefügte Element." : "Queue = First In, First Out: dequeue() entfernt immer das am längsten wartende Element."
      };
    }
  });

  G({
    id: "gen-ds-hash", part: "GA2", topic: "ga2-datenstrukturen", title: "Hashtabelle mit linearem Sondieren",
    generate: function (rnd) {
      var m, keys, tab, rows, coll;
      do {
        m = pick(rnd, [7, 11, 13]);
        keys = distinctInts(rnd, int(rnd, 5, Math.min(8, m - 2)), 10, 99);
        tab = []; for (var i = 0; i < m; i++) tab.push(null);
        rows = []; coll = [];
        keys.forEach(function (k) {
          var h = k % m, p = h, tries = [h];
          while (tab[p] !== null) { p = (p + 1) % m; tries.push(p); }
          tab[p] = k;
          if (tries.length > 1) coll.push(k);
          rows.push([k, k + " mod " + m + " = " + h, tries.join(" → "), p]);
        });
      } while (coll.length === 0);
      var target = rnd() < 0.8 ? pick(rnd, coll) : pick(rnd, keys);
      var ans = tab.indexOf(target);
      var head = [], vals = [];
      for (var j = 0; j < m; j++) { head.push(j); vals.push(tab[j] === null ? "" : tab[j]); }
      return {
        type: "numeric", difficulty: 2, points: 4,
        context: "Eine anfangs leere Hashtabelle hat " + m + " Plätze (Index 0 bis " + (m - 1) + "). Die Hashfunktion lautet <code>h(k) = k mod " + m + "</code>. Kollisionen werden durch <b>lineares Sondieren</b> aufgelöst (nächster Index, nach dem letzten Platz weiter bei 0). Es werden nacheinander die Schlüssel <code>" + keys.join(", ") + "</code> eingefügt.",
        question: "An welchem Index wird der Schlüssel <b>" + target + "</b> gespeichert?",
        answer: ans, tolerance: 0,
        solution: table(["Schlüssel", "h(k)", "geprüfte Indizes", "Platz"], rows) + "<p>Belegung der Tabelle:</p>" + table(["Index"].concat(head), [["Schlüssel"].concat(vals)]) + "<p>Schlüssel " + target + " → Index <b>" + ans + "</b></p>",
        explanation: "Beim linearen Sondieren entstehen Ballungen (Cluster). Beim Suchen muss dieselbe Sondierungsfolge durchlaufen werden, bis der Schlüssel oder ein leerer Platz gefunden ist."
      };
    }
  });

  // ===========================================================================
  // GA2 – Rekursion
  // ===========================================================================
  G({
    id: "gen-rek-funktion", part: "GA2", topic: "ga2-rekursion", title: "Rekursive Funktion: Rückgabewert und Aufrufe",
    generate: function (rnd) {
      var v = pick(rnd, ["fak", "summe", "potenz", "fib", "quersumme", "einsen", "ggt"]);
      var calls = 0, code, callStr, trace = [], val;
      if (v === "fak") {
        var n = int(rnd, 3, 7);
        code = "FUNKTION f(n)\n    WENN n ≤ 1 DANN\n        RÜCKGABE 1\n    ENDE WENN\n    RÜCKGABE n * f(n − 1)\nENDE FUNKTION";
        var F = function (x) { calls++; trace.push("f(" + x + ")" + (x <= 1 ? " = 1 (Abbruch)" : " = " + x + " * f(" + (x - 1) + ")")); return x <= 1 ? 1 : x * F(x - 1); };
        val = F(n); callStr = "f(" + n + ")";
      } else if (v === "summe") {
        var n2 = int(rnd, 4, 9);
        code = "FUNKTION s(n)\n    WENN n = 0 DANN\n        RÜCKGABE 0\n    ENDE WENN\n    RÜCKGABE n + s(n − 1)\nENDE FUNKTION";
        var S = function (x) { calls++; trace.push("s(" + x + ")" + (x === 0 ? " = 0 (Abbruch)" : " = " + x + " + s(" + (x - 1) + ")")); return x === 0 ? 0 : x + S(x - 1); };
        val = S(n2); callStr = "s(" + n2 + ")";
      } else if (v === "potenz") {
        var b = int(rnd, 2, 5), e = int(rnd, 2, 6);
        code = "FUNKTION p(b, e)\n    WENN e = 0 DANN\n        RÜCKGABE 1\n    ENDE WENN\n    RÜCKGABE b * p(b, e − 1)\nENDE FUNKTION";
        var P = function (x, y) { calls++; trace.push("p(" + x + ", " + y + ")" + (y === 0 ? " = 1 (Abbruch)" : " = " + x + " * p(" + x + ", " + (y - 1) + ")")); return y === 0 ? 1 : x * P(x, y - 1); };
        val = P(b, e); callStr = "p(" + b + ", " + e + ")";
      } else if (v === "fib") {
        var n3 = int(rnd, 4, 8);
        code = "FUNKTION fib(n)\n    WENN n < 2 DANN\n        RÜCKGABE n\n    ENDE WENN\n    RÜCKGABE fib(n − 1) + fib(n − 2)\nENDE FUNKTION";
        var Fi = function (x) { calls++; return x < 2 ? x : Fi(x - 1) + Fi(x - 2); };
        val = Fi(n3); callStr = "fib(" + n3 + ")";
        var c = [1, 1], fv = [0, 1];
        for (var i = 2; i <= n3; i++) { c.push(1 + c[i - 1] + c[i - 2]); fv.push(fv[i - 1] + fv[i - 2]); }
        var rows = []; for (i = 0; i <= n3; i++) rows.push([i, fv[i], c[i]]);
        trace = ["Aufrufbaum ist ein Binärbaum – Aufrufe A(n) = 1 + A(n−1) + A(n−2), A(0) = A(1) = 1:" + table(["n", "fib(n)", "Aufrufe A(n)"], rows)];
      } else if (v === "quersumme") {
        var n4 = int(rnd, 100, 99999);
        code = "FUNKTION q(n)\n    WENN n < 10 DANN\n        RÜCKGABE n\n    ENDE WENN\n    RÜCKGABE n MOD 10 + q(n DIV 10)\nENDE FUNKTION";
        var Q = function (x) { calls++; trace.push("q(" + x + ")" + (x < 10 ? " = " + x + " (Abbruch)" : " = " + (x % 10) + " + q(" + Math.floor(x / 10) + ")")); return x < 10 ? x : x % 10 + Q(Math.floor(x / 10)); };
        val = Q(n4); callStr = "q(" + n4 + ")";
      } else if (v === "einsen") {
        var n5 = int(rnd, 9, 255);
        code = "FUNKTION z(n)\n    WENN n = 0 DANN\n        RÜCKGABE 0\n    ENDE WENN\n    RÜCKGABE n MOD 2 + z(n DIV 2)\nENDE FUNKTION";
        var Z = function (x) { calls++; trace.push("z(" + x + ")" + (x === 0 ? " = 0 (Abbruch)" : " = " + (x % 2) + " + z(" + Math.floor(x / 2) + ")")); return x === 0 ? 0 : x % 2 + Z(Math.floor(x / 2)); };
        val = Z(n5); callStr = "z(" + n5 + ")";
      } else {
        var a = int(rnd, 30, 400), bb = int(rnd, 10, 300);
        code = "FUNKTION ggt(a, b)\n    WENN b = 0 DANN\n        RÜCKGABE a\n    ENDE WENN\n    RÜCKGABE ggt(b, a MOD b)\nENDE FUNKTION";
        var GG = function (x, y) { calls++; trace.push("ggt(" + x + ", " + y + ")" + (y === 0 ? " = " + x + " (Abbruch)" : " → ggt(" + y + ", " + (x % y) + ")")); return y === 0 ? x : GG(y, x % y); };
        val = GG(a, bb); callStr = "ggt(" + a + ", " + bb + ")";
      }
      var askCalls = rnd() < 0.4;
      return {
        type: "numeric", difficulty: v === "fib" ? 3 : 2, points: v === "fib" ? 5 : 4,
        context: "Gegeben ist die folgende rekursive Funktion (DIV = ganzzahlige Division, MOD = Rest):" + pre(code),
        question: askCalls ? "Wie oft wird die Funktion beim Aufruf <code>" + callStr + "</code> insgesamt aufgerufen (einschließlich des ersten Aufrufs)?" : "Welchen Wert liefert der Aufruf <code>" + callStr + "</code>?",
        answer: askCalls ? calls : val, tolerance: 0,
        solution: "<p>" + trace.join("<br>") + "</p><p>Rückgabewert von <code>" + callStr + "</code>: " + val + "<br>Anzahl Aufrufe (inkl. erstem): " + calls + "</p><p>Gesucht: <b>" + (askCalls ? calls : val) + "</b></p>",
        explanation: "Jede rekursive Funktion braucht eine Abbruchbedingung (Basisfall) und muss sich ihr mit jedem Aufruf nähern – sonst droht ein StackOverflow."
      };
    }
  });

  // ===========================================================================
  // GA2 – Komplexität
  // ===========================================================================
  var KLASSEN = ["O(1)", "O(log n)", "O(n)", "O(n · log n)", "O(n²)", "O(n³)", "O(2ⁿ)"];
  var SNIPPETS = [
    { k: 2, c: "summe ← 0\nFÜR i ← 0 BIS n − 1\n    summe ← summe + a[i]\nENDE FÜR", w: "Eine Schleife über alle n Elemente." },
    { k: 2, c: "FÜR i ← 0 BIS n − 1\n    AUSGABE a[i]\nENDE FÜR\nFÜR j ← 0 BIS n − 1\n    AUSGABE b[j]\nENDE FÜR", w: "Zwei Schleifen <b>nacheinander</b>: n + n = 2n → O(n). Konstante Faktoren fallen weg." },
    { k: 2, c: "i ← 0\nSOLANGE i < n\n    AUSGABE a[i]\n    i ← i + 2\nENDE SOLANGE", w: "n/2 Durchläufe – der Faktor 1/2 fällt weg → O(n)." },
    { k: 2, c: "FÜR i ← 0 BIS n − 1\n    FÜR j ← 0 BIS 9\n        x ← x + a[i] * j\n    ENDE FÜR\nENDE FÜR", w: "Die innere Schleife läuft immer genau 10-mal (konstant) → 10n → O(n)." },
    { k: 0, c: "FÜR i ← 1 BIS 1000\n    x ← x + i\nENDE FÜR\nAUSGABE x + a[0]", w: "Die Schleife hängt nicht von n ab (immer 1000 Durchläufe) → konstante Laufzeit." },
    { k: 0, c: "erstes ← a[0]\nletztes ← a[n − 1]\nAUSGABE erstes + letztes", w: "Direkter Indexzugriff, unabhängig von n." },
    { k: 1, c: "i ← 1\nSOLANGE i < n\n    i ← i * 2\nENDE SOLANGE", w: "i verdoppelt sich: nach k Schritten ist i = 2<sup>k</sup> ≥ n → k = log<sub>2</sub> n." },
    { k: 1, c: "i ← n\nSOLANGE i > 1\n    i ← i DIV 2\nENDE SOLANGE", w: "Halbierung pro Schritt → log<sub>2</sub> n Durchläufe (wie bei der binären Suche)." },
    { k: 3, c: "FÜR i ← 0 BIS n − 1\n    j ← 1\n    SOLANGE j < n\n        j ← j * 2\n    ENDE SOLANGE\nENDE FÜR", w: "Äußere Schleife n-mal, innere log<sub>2</sub> n-mal → n · log n." },
    { k: 4, c: "FÜR i ← 0 BIS n − 1\n    FÜR j ← 0 BIS n − 1\n        WENN a[i] = a[j] DANN\n            zaehler ← zaehler + 1\n        ENDE WENN\n    ENDE FÜR\nENDE FÜR", w: "Zwei <b>verschachtelte</b> Schleifen über n → n · n = n²." },
    { k: 4, c: "FÜR i ← 0 BIS n − 2\n    FÜR j ← i + 1 BIS n − 1\n        WENN a[i] > a[j] DANN\n            tausche a[i] und a[j]\n        ENDE WENN\n    ENDE FÜR\nENDE FÜR", w: "Dreiecksschema: n(n−1)/2 Vergleiche – immer noch quadratisch → O(n²)." },
    { k: 5, c: "FÜR i ← 0 BIS n − 1\n    FÜR j ← 0 BIS n − 1\n        FÜR k ← 0 BIS n − 1\n            c[i][j] ← c[i][j] + a[i][k] * b[k][j]\n        ENDE FÜR\n    ENDE FÜR\nENDE FÜR", w: "Drei verschachtelte Schleifen (Matrixmultiplikation) → n³." },
    { k: 6, c: "FUNKTION f(n)\n    WENN n ≤ 1 DANN\n        RÜCKGABE 1\n    ENDE WENN\n    RÜCKGABE f(n − 1) + f(n − 1)\nENDE FUNKTION", w: "Jeder Aufruf erzeugt zwei weitere – die Anzahl der Aufrufe verdoppelt sich pro Ebene → 2ⁿ." }
  ];
  G({
    id: "gen-komplex-code", part: "GA2", topic: "ga2-komplexitaet", title: "Laufzeitklasse eines Codeausschnitts",
    generate: function (rnd) {
      var s = pick(rnd, SNIPPETS);
      var right = KLASSEN[s.k];
      var near = [s.k - 1, s.k + 1, s.k - 2, s.k + 2, s.k + 3, s.k - 3].filter(function (x) { return x >= 0 && x < KLASSEN.length; }).map(function (x) { return KLASSEN[x]; });
      var m = mc(rnd, right, near);
      return {
        type: "mc", difficulty: 2, points: 2,
        question: "Bestimmen Sie die Zeitkomplexität (O-Notation) des folgenden Codeausschnitts in Abhängigkeit von n (Anzahl der Elemente):" + pre(s.c),
        options: m.options, correct: m.correct,
        solution: "<p><b>" + right + "</b> – " + s.w + "</p>",
        explanation: "Faustregeln: verschachtelte Schleifen multiplizieren, aufeinanderfolgende addieren (der größte Term zählt), Halbieren/Verdoppeln ergibt log n, konstante Faktoren entfallen."
      };
    }
  });

  G({
    id: "gen-komplex-zeit", part: "GA2", topic: "ga2-komplexitaet", title: "Laufzeit bei wachsender Eingabe abschätzen",
    generate: function (rnd) {
      var cls = pick(rnd, ["n", "n2", "n3", "nlogn"]);
      var a = int(rnd, 10, 16), b = int(rnd, 1, 3);
      var n0 = cls === "nlogn" ? Math.pow(2, a) : pick(rnd, [1000, 2000, 5000, 10000]);
      var f = cls === "nlogn" ? Math.pow(2, b) : pick(rnd, [2, 3, 4, 5, 10]);
      var t0 = int(rnd, 2, 80);
      var factor, ftxt, name;
      if (cls === "n") { factor = f; ftxt = f + "¹ = " + f; name = "O(n)"; }
      else if (cls === "n2") { factor = f * f; ftxt = f + "² = " + factor; name = "O(n²)"; }
      else if (cls === "n3") { factor = f * f * f; ftxt = f + "³ = " + factor; name = "O(n³)"; }
      else { factor = f * (a + b) / a; ftxt = "(" + f + " · " + fmt(n0, 0) + " · log<sub>2</sub>(" + fmt(n0 * f, 0) + ")) / (" + fmt(n0, 0) + " · log<sub>2</sub>(" + fmt(n0, 0) + ")) = " + f + " · " + (a + b) + "/" + a + " = " + fmt(factor, 4); name = "O(n · log n)"; }
      var ans = r2(t0 * factor);
      return {
        type: "numeric", difficulty: 2, points: 3,
        question: "Ein Algorithmus mit der Laufzeitklasse <b>" + name + "</b> benötigt für n = " + fmt(n0, 0) + " Elemente " + t0 + " ms. Schätzen Sie die Laufzeit für n = " + fmt(n0 * f, 0) + " Elemente ab (in ms, auf zwei Nachkommastellen gerundet).",
        answer: ans, tolerance: 0.01, unit: "ms",
        solution: "<p>Die Eingabe wächst um den Faktor " + f + ". Laufzeitfaktor: " + ftxt + "<br>Neue Laufzeit: " + t0 + " ms × " + fmt(factor, 4) + " = <b>" + fmt(ans) + " ms</b></p>",
        explanation: "Die O-Notation beschreibt das Wachstum – für die Abschätzung wird angenommen, dass konstante Faktoren gleich bleiben."
      };
    }
  });

  // ===========================================================================
  // GA1 – Projektmanagement: Netzplan
  // ===========================================================================
  var VG_MITTE = ["Soll-Konzept", "Datenbankentwurf", "GUI-Entwurf", "Schnittstellenspezifikation", "Implementierung Backend", "Implementierung Frontend", "Testdaten erstellen", "Modultests", "Integrationstest", "Benutzerdokumentation", "Schulung Key-User"];
  function makeNetz(rnd, minN) {
    var n = int(rnd, minN || 6, 9), i, j;
    var mid = sample(rnd, VG_MITTE.map(function (x, ix) { return ix; }), n - 2).sort(function (x, y) { return x - y; }).map(function (ix) { return VG_MITTE[ix]; });
    var names = ["Ist-Analyse"].concat(mid, ["Abnahme und Einführung"]);
    var V = [];
    for (i = 0; i < n; i++) V.push({ id: String.fromCharCode(65 + i), name: names[i], d: int(rnd, 1, 9), pre: [], suc: [] });
    for (i = 1; i < n - 1; i++) {
      var cands = []; for (j = Math.max(0, i - 3); j < i; j++) cands.push(j);
      var k = Math.min(cands.length, rnd() < 0.35 ? 2 : 1);
      V[i].pre = sample(rnd, cands, k).sort(function (x, y) { return x - y; });
    }
    var hasSuc = {};
    for (i = 1; i < n - 1; i++) V[i].pre.forEach(function (p) { hasSuc[p] = true; });
    for (i = 0; i < n - 1; i++) if (!hasSuc[i]) V[n - 1].pre.push(i);
    V.forEach(function (v, ix) { v.pre.forEach(function (p) { V[p].suc.push(ix); }); });
    // Vorwärtsrechnung
    V.forEach(function (v) { v.faz = v.pre.length ? Math.max.apply(null, v.pre.map(function (p) { return V[p].fez; })) : 0; v.fez = v.faz + v.d; });
    var T = V[n - 1].fez;
    // Rückwärtsrechnung
    for (i = n - 1; i >= 0; i--) {
      var v = V[i];
      v.sez = v.suc.length ? Math.min.apply(null, v.suc.map(function (s) { return V[s].saz; })) : T;
      v.saz = v.sez - v.d;
      v.gp = v.saz - v.faz;
      v.fp = v.suc.length ? Math.min.apply(null, v.suc.map(function (s) { return V[s].faz; })) - v.fez : 0;
    }
    // alle Pfade Start → Ende
    var paths = [];
    (function dfs(ix, path) {
      path = path.concat([ix]);
      if (ix === n - 1) { paths.push(path); return; }
      V[ix].suc.forEach(function (s) { dfs(s, path); });
    })(0, []);
    paths = paths.map(function (p) { return { p: p, dur: p.reduce(function (s, ix) { return s + V[ix].d; }, 0), txt: p.map(function (ix) { return V[ix].id; }).join(" → ") }; });
    return { V: V, T: T, n: n, paths: paths, crit: paths.filter(function (p) { return p.dur === T; }) };
  }
  function netzContext(N) {
    return "Für ein IT-Projekt liegt folgende Vorgangsliste vor (Dauer in Arbeitstagen):" +
      table(["Vorgang", "Beschreibung", "Dauer", "Vorgänger"], N.V.map(function (v) { return [v.id, v.name, v.d, v.pre.length ? v.pre.map(function (p) { return N.V[p].id; }).join(", ") : "–"]; })) +
      "<p>Konvention: Der erste Vorgang beginnt zum Zeitpunkt 0; FEZ = FAZ + Dauer; alle Vorgänge sind Ende-Anfang-Beziehungen.</p>";
  }
  function netzSolution(N) {
    return "<p><b>Vorwärtsrechnung:</b> FAZ = größter FEZ aller Vorgänger (Start = 0), FEZ = FAZ + Dauer.<br><b>Rückwärtsrechnung:</b> SEZ = kleinster SAZ aller Nachfolger (Ende: SEZ = FEZ), SAZ = SEZ − Dauer.<br><b>Gesamtpuffer</b> GP = SAZ − FAZ; <b>freier Puffer</b> FP = kleinster FAZ der Nachfolger − eigener FEZ.</p>" +
      table(["Vorgang", "Dauer", "FAZ", "FEZ", "SAZ", "SEZ", "GP", "FP"], N.V.map(function (v) { return [v.gp === 0 ? "<b>" + v.id + "</b>" : v.id, v.d, v.faz, v.fez, v.saz, v.sez, v.gp, v.fp]; })) +
      "<p>Projektdauer: <b>" + N.T + " Tage</b>. Kritische Vorgänge (GP = 0): " + N.V.filter(function (v) { return v.gp === 0; }).map(function (v) { return v.id; }).join(", ") +
      ". Kritische(r) Pfad(e): " + N.crit.map(function (p) { return p.txt; }).join(" bzw. ") + ".</p>";
  }
  G({
    id: "gen-pm-netzplan", part: "GA1", topic: "ga1-projektmanagement", title: "Netzplan: Dauer und Puffer berechnen",
    generate: function (rnd) {
      var N = makeNetz(rnd, 6);
      var mode = pick(rnd, ["dauer", "gp", "gp", "fp", "fp", "faz"]);
      var cand, v, ans, q;
      var inner = N.V.slice(1, N.n - 1);
      if (mode === "dauer") { ans = N.T; q = "Berechnen Sie die Gesamtdauer des Projekts in Arbeitstagen."; }
      else if (mode === "gp") {
        cand = inner.filter(function (x) { return x.gp > 0; });
        v = cand.length && rnd() < 0.8 ? pick(rnd, cand) : pick(rnd, inner);
        ans = v.gp; q = "Erstellen Sie den Netzplan und ermitteln Sie den <b>Gesamtpuffer</b> von Vorgang <b>" + v.id + "</b> (" + v.name + ") in Tagen.";
      } else if (mode === "fp") {
        cand = inner.filter(function (x) { return x.fp !== x.gp; });
        if (!cand.length) cand = inner.filter(function (x) { return x.fp > 0; });
        v = cand.length && rnd() < 0.85 ? pick(rnd, cand) : pick(rnd, inner);
        ans = v.fp; q = "Erstellen Sie den Netzplan und ermitteln Sie den <b>freien Puffer</b> von Vorgang <b>" + v.id + "</b> (" + v.name + ") in Tagen.";
      } else {
        v = pick(rnd, inner.filter(function (x) { return x.pre.length > 1; }).concat(inner.slice(-2)));
        var sp = pick(rnd, ["faz", "saz"]);
        ans = v[sp]; q = "Ermitteln Sie den <b>" + (sp === "faz" ? "frühesten Anfangszeitpunkt (FAZ)" : "spätesten Anfangszeitpunkt (SAZ)") + "</b> von Vorgang <b>" + v.id + "</b> (" + v.name + ").";
      }
      return {
        type: "numeric", difficulty: 3, points: 6,
        context: netzContext(N), question: q, answer: ans, tolerance: 0, unit: "Tage",
        solution: netzSolution(N) + "<p>Gesucht: <b>" + ans + "</b></p>",
        explanation: "Der Gesamtpuffer gibt an, um wie viel ein Vorgang verschoben werden kann, ohne das Projektende zu gefährden. Der freie Puffer gibt an, um wie viel er verschoben werden kann, ohne den frühesten Beginn eines Nachfolgers zu verzögern (FP ≤ GP)."
      };
    }
  });

  G({
    id: "gen-pm-kritischer-pfad", part: "GA1", topic: "ga1-projektmanagement", title: "Netzplan: kritischen Pfad bestimmen",
    generate: function (rnd) {
      var N, tries = 0;
      do { N = makeNetz(rnd, 7); tries++; } while ((N.crit.length !== 1 || N.paths.length < 4) && tries < 300);
      var right = N.crit[0].txt;
      var others = shuffle(rnd, N.paths.filter(function (p) { return p.dur !== N.T; }).map(function (p) { return p.txt; }));
      // Fallback, falls zu wenige alternative Pfade: kritische Vorgänge ohne Reihenfolge-Logik verändern
      var cp = N.crit[0].p;
      others.push(cp.slice(0, -2).concat(cp.slice(-1)).map(function (ix) { return N.V[ix].id; }).join(" → "));
      others.push(N.V.map(function (v) { return v.id; }).join(" → "));
      others.push(cp.filter(function (ix, k) { return k !== 1; }).map(function (ix) { return N.V[ix].id; }).join(" → "));
      var m = mc(rnd, right, others);
      return {
        type: "mc", difficulty: 3, points: 5,
        context: netzContext(N),
        question: "Erstellen Sie den Netzplan und bestimmen Sie den <b>kritischen Pfad</b>.",
        options: m.options, correct: m.correct,
        solution: netzSolution(N) + "<p>Alle Pfade mit Dauer: " + N.paths.map(function (p) { return p.txt + " (" + p.dur + ")"; }).join("; ") + "</p><p>Kritischer Pfad (längster Pfad, alle GP = 0): <b>" + right + "</b> mit " + N.T + " Tagen.</p>",
        explanation: "Verzögert sich ein Vorgang auf dem kritischen Pfad, verschiebt sich das Projektende um genau diese Verzögerung."
      };
    }
  });

  G({
    id: "gen-pm-personentage", part: "GA1", topic: "ga1-projektmanagement", title: "Aufwand: Personentage → Dauer/Kosten",
    generate: function (rnd) {
      var mode = pick(rnd, ["tage", "wochen", "kosten", "personen"]);
      var pt = int(rnd, 6, 50) * 5, p = int(rnd, 2, 6), v = pick(rnd, [100, 80, 75, 60, 50]);
      var kap = p * v / 100;
      if (mode === "personen") {
        var frist = int(rnd, 10, 40);
        var need = Math.ceil(pt / (frist * v / 100) - 1e-9);
        return {
          type: "numeric", difficulty: 2, points: 3,
          context: "Ein Teilprojekt hat einen geschätzten Aufwand von " + pt + " Personentagen (PT). Die Entwickler stehen dem Projekt jeweils zu " + v + " % ihrer Arbeitszeit zur Verfügung.",
          question: "Wie viele Entwickler werden mindestens benötigt, damit das Teilprojekt in " + frist + " Arbeitstagen abgeschlossen werden kann? (Annahme: Aufwand ist beliebig aufteilbar.)",
          answer: need, tolerance: 0, unit: "Personen",
          solution: "<p>Kapazität je Entwickler: " + frist + " Tage × " + v + " % = " + num(frist * v / 100) + " PT<br>Benötigt: " + pt + " ÷ " + num(frist * v / 100) + " = " + fmt(pt / (frist * v / 100), 2) + " → aufrunden: <b>" + need + " Entwickler</b></p>",
          explanation: "In der Praxis gilt Brooks’ Law: Mehr Personen erhöhen den Kommunikationsaufwand – Aufwand ist nicht beliebig teilbar."
        };
      }
      var tage = Math.ceil(pt / kap - 1e-9);
      var ctx = "Für die Umsetzung eines Projekts wurde ein Aufwand von <b>" + pt + " Personentagen</b> geschätzt. Es arbeiten " + p + " Entwickler daran, die jeweils zu " + v + " % für das Projekt verfügbar sind.";
      var base = "<p>Tägliche Kapazität: " + p + " × " + v + " % = " + num(kap) + " PT pro Arbeitstag<br>Dauer: " + pt + " ÷ " + num(kap) + " = " + fmt(pt / kap, 2) + " → aufgerundet " + tage + " Arbeitstage</p>";
      if (mode === "tage") return { type: "numeric", difficulty: 1, points: 3, context: ctx, question: "Berechnen Sie die Projektdauer in <b>Arbeitstagen</b> (auf volle Tage aufrunden).", answer: tage, tolerance: 0, unit: "Tage", solution: base + "<p>Ergebnis: <b>" + tage + " Arbeitstage</b></p>" };
      if (mode === "wochen") { var w = Math.ceil(tage / 5); return { type: "numeric", difficulty: 2, points: 3, context: ctx, question: "Wie viele <b>Kalenderwochen</b> (5 Arbeitstage pro Woche, auf volle Wochen aufrunden) dauert das Projekt?", answer: w, tolerance: 0, unit: "Wochen", solution: base + "<p>" + tage + " ÷ 5 = " + fmt(tage / 5, 2) + " → <b>" + w + " Wochen</b></p>" }; }
      var sh = int(rnd, 55, 110), h = pick(rnd, [7.5, 8]);
      var cost = r2(pt * h * sh);
      return { type: "numeric", difficulty: 1, points: 3, context: ctx + " Ein Personentag entspricht " + num(h) + " Stunden, der interne Stundensatz beträgt " + eur(sh) + ".", question: "Berechnen Sie die Personalkosten des Projekts.", answer: cost, tolerance: 0.01, unit: "€", solution: "<p>" + pt + " PT × " + num(h) + " h × " + eur(sh) + " = <b>" + eur(cost) + "</b></p><p>Hinweis: Die Verfügbarkeit beeinflusst nur die Dauer, nicht den Aufwand.</p>" };
    }
  });

  // ===========================================================================
  // GA1 – Wirtschaftlichkeit
  // ===========================================================================
  var KRITERIEN = ["Anschaffungskosten", "Benutzerfreundlichkeit", "Support/Wartung", "Skalierbarkeit", "Datenschutz (DSGVO)", "Schnittstellen", "Performance", "Erweiterbarkeit", "Einarbeitungsaufwand"];
  function weights(rnd, k) {
    var w = []; for (var i = 0; i < k; i++) w.push(10);
    for (var r = (100 - 10 * k) / 5; r > 0; r--) w[int(rnd, 0, k - 1)] += 5;
    return w;
  }
  G({
    id: "gen-wi-nutzwert", part: "GA1", topic: "ga1-wirtschaftlichkeit", title: "Nutzwertanalyse",
    generate: function (rnd) {
      var k = int(rnd, 4, 5), alts = sample(rnd, ["Eigenentwicklung", "Standardsoftware", "SaaS-Lösung", "Open-Source-Lösung"], 3);
      var crit, w, sc, nw, sorted, tries = 0;
      do {
        crit = sample(rnd, KRITERIEN, k); w = weights(rnd, k);
        sc = alts.map(function () { return crit.map(function () { return int(rnd, 2, 10); }); });
        nw = sc.map(function (s) { return r2(s.reduce(function (acc, x, i) { return acc + x * w[i] / 100; }, 0)); });
        sorted = nw.slice().sort(function (a, b) { return b - a; });
        tries++;
      } while (sorted[0] - sorted[1] < 0.1 && tries < 100);
      var rows = crit.map(function (c, i) {
        return [c, w[i] + " %"].concat(sc.map(function (s) { return s[i] + " (" + fmt(s[i] * w[i] / 100) + ")"; }));
      });
      rows.push(["<b>Nutzwert</b>", "100 %"].concat(nw.map(function (x) { return "<b>" + fmt(x) + "</b>"; })));
      var ctxTab = table(["Kriterium", "Gewichtung"].concat(alts), crit.map(function (c, i) { return [c, w[i] + " %"].concat(sc.map(function (s) { return s[i]; })); }));
      var ctx = "Für eine neue Software zur Auftragsverwaltung stehen drei Alternativen zur Auswahl. Die Bewertung erfolgt mit Punkten von 1 (sehr schlecht) bis 10 (sehr gut):" + ctxTab;
      var sol = "<p>Gewichteter Wert = Punkte × Gewichtung; Nutzwert = Summe der gewichteten Werte.</p>" + table(["Kriterium", "Gewichtung"].concat(alts.map(function (a) { return a + " (gewichtet)"; })), rows);
      if (rnd() < 0.5) {
        var ai = int(rnd, 0, 2);
        return {
          type: "numeric", difficulty: 2, points: 4, context: ctx,
          question: "Berechnen Sie den Nutzwert der Alternative <b>" + alts[ai] + "</b> (zwei Nachkommastellen).",
          answer: nw[ai], tolerance: 0.01,
          solution: sol + "<p>" + alts[ai] + ": " + crit.map(function (c, i) { return sc[ai][i] + " × " + num(w[i] / 100); }).join(" + ") + " = <b>" + fmt(nw[ai]) + "</b></p>"
        };
      }
      var best = nw.indexOf(sorted[0]);
      var m = mc(rnd, alts[best], alts.filter(function (a, i) { return i !== best; }).concat(["Alle Alternativen sind gleichwertig"]));
      return {
        type: "mc", difficulty: 2, points: 5, context: ctx,
        question: "Führen Sie die Nutzwertanalyse durch. Welche Alternative sollte gewählt werden?",
        options: m.options, correct: m.correct,
        solution: sol + "<p>Den höchsten Nutzwert hat <b>" + alts[best] + "</b> mit " + fmt(nw[best]) + " Punkten.</p>",
        explanation: "Die Nutzwertanalyse ergänzt den reinen Kostenvergleich um qualitative Kriterien. Kritikpunkt: Gewichtung und Punktvergabe sind subjektiv."
      };
    }
  });

  G({
    id: "gen-wi-amortisation", part: "GA1", topic: "ga1-wirtschaftlichkeit", title: "Amortisationsdauer",
    generate: function (rnd) {
      var I, h, sh, lk, net;
      do {
        I = int(rnd, 60, 400) * 100; h = int(rnd, 10, 90); sh = int(rnd, 30, 70); lk = int(rnd, 1, 12) * 50;
        net = h * sh - lk;
      } while (net <= 0 || I / net > 60 || I / net < 3);
      var years = rnd() < 0.4;
      var ans = years ? r2(I / (net * 12)) : r2(I / net);
      return {
        type: "numeric", difficulty: 2, points: 4,
        context: "Die Entwicklung einer Anwendung zur Automatisierung der Reisekostenabrechnung kostet einmalig " + eur(I) + ". Durch die Anwendung sparen die Sachbearbeiter monatlich insgesamt " + h + " Arbeitsstunden ein (interner Stundensatz " + eur(sh) + "). Für Hosting und Wartung fallen monatlich " + eur(lk) + " an.",
        question: "Berechnen Sie die Amortisationsdauer in <b>" + (years ? "Jahren" : "Monaten") + "</b> (zwei Nachkommastellen).",
        answer: ans, tolerance: 0.01, unit: years ? "Jahre" : "Monate",
        solution: "<p>Monatliche Einsparung: " + h + " h × " + eur(sh) + " = " + eur(h * sh) + "<br>abzüglich laufender Kosten: " + eur(h * sh) + " − " + eur(lk) + " = " + eur(net) + " pro Monat" +
          (years ? "<br>Jährlicher Nettonutzen: " + eur(net) + " × 12 = " + eur(net * 12) + "<br>Amortisationsdauer: " + eur(I) + " ÷ " + eur(net * 12) + " = <b>" + fmt(ans) + " Jahre</b>" : "<br>Amortisationsdauer: " + eur(I) + " ÷ " + eur(net) + " = <b>" + fmt(ans) + " Monate</b>") + "</p>",
        explanation: "Amortisationsdauer = Investition ÷ (Einsparung pro Periode − laufende Kosten pro Periode). Je kürzer, desto geringer das Investitionsrisiko."
      };
    }
  });

  G({
    id: "gen-wi-makebuy", part: "GA1", topic: "ga1-wirtschaftlichkeit", title: "Make-or-Buy: kritische Menge",
    generate: function (rnd) {
      var x0 = int(rnd, 4, 60) * 5, vm = int(rnd, 2, 20) * 5, dv = int(rnd, 2, 12) * 5, Fb = int(rnd, 5, 40) * 100;
      var vb = vm + dv, Fm = Fb + x0 * dv;
      var ctx = "Ein Unternehmen benötigt ein Ticketsystem. Betrachtungszeitraum: 3 Jahre.<ul><li><b>Make</b> (Eigenentwicklung): einmalig " + eur(Fm) + " Entwicklungskosten, zusätzlich " + eur(vm) + " Betriebskosten je Nutzer</li><li><b>Buy</b> (Kauf/Miete): einmalig " + eur(Fb) + " Einrichtung, zusätzlich " + eur(vb) + " Lizenzkosten je Nutzer</li></ul>";
      var sol = "<p>Kosten Make: K<sub>M</sub>(x) = " + fmt(Fm) + " + " + fmt(vm) + "·x<br>Kosten Buy: K<sub>B</sub>(x) = " + fmt(Fb) + " + " + fmt(vb) + "·x<br>Gleichsetzen: " + fmt(Fm) + " + " + fmt(vm) + "x = " + fmt(Fb) + " + " + fmt(vb) + "x<br>" + fmt(Fm - Fb) + " = " + fmt(dv) + "x → x = " + fmt(Fm - Fb) + " ÷ " + fmt(dv) + " = <b>" + x0 + " Nutzer</b></p><p>Unterhalb von " + x0 + " Nutzern ist <b>Buy</b> günstiger, oberhalb <b>Make</b>.</p>";
      if (rnd() < 0.6) {
        return {
          type: "numeric", difficulty: 2, points: 4, context: ctx,
          question: "Berechnen Sie die <b>kritische Nutzerzahl</b>, bei der beide Alternativen gleich teuer sind.",
          answer: x0, tolerance: 0, unit: "Nutzer", solution: sol
        };
      }
      var N = x0 + (rnd() < 0.5 ? -1 : 1) * int(rnd, 5, 40);
      if (N < 1) N = x0 + 20;
      var km = Fm + vm * N, kb = Fb + vb * N;
      var right = km < kb ? "Make – Kostenvorteil " + eur(kb - km) : "Buy – Kostenvorteil " + eur(km - kb);
      var dist = [km < kb ? "Buy – Kostenvorteil " + eur(kb - km) : "Make – Kostenvorteil " + eur(km - kb), (km < kb ? "Make" : "Buy") + " – Kostenvorteil " + eur(Math.abs(km - kb) + dv * 10), "Beide Alternativen sind gleich teuer", (km < kb ? "Make" : "Buy") + " – Kostenvorteil " + eur(Math.abs(Fm - Fb))];
      var m = mc(rnd, right, dist);
      return {
        type: "mc", difficulty: 2, points: 4, context: ctx,
        question: "Das Unternehmen plant mit <b>" + N + " Nutzern</b>. Welche Alternative ist günstiger und wie hoch ist der Kostenvorteil?",
        options: m.options, correct: m.correct,
        solution: "<p>K<sub>M</sub>(" + N + ") = " + eur(Fm) + " + " + fmt(vm) + " × " + N + " = " + eur(km) + "<br>K<sub>B</sub>(" + N + ") = " + eur(Fb) + " + " + fmt(vb) + " × " + N + " = " + eur(kb) + "<br>→ <b>" + right + "</b></p>" + sol
      };
    }
  });

  G({
    id: "gen-wi-projektkosten", part: "GA1", topic: "ga1-wirtschaftlichkeit", title: "Projektkosten / Stundensatz kalkulieren",
    generate: function (rnd) {
      if (rnd() < 0.55) {
        var roles = [["Auszubildender/Umschüler", int(rnd, 60, 80), int(rnd, 10, 25)], ["Projektleiter", int(rnd, 4, 15), int(rnd, 60, 95)], ["Fachabteilung (Interviews, Abnahme)", int(rnd, 3, 12), int(rnd, 40, 65)], ["Entwickler (Code-Review)", int(rnd, 2, 8), int(rnd, 50, 80)]];
        var sach = int(rnd, 2, 30) * 50, gk = pick(rnd, [10, 15, 20, 25, 30]);
        var pers = 0, rows = roles.map(function (r) { var c = r[1] * r[2]; pers += c; return [r[0], r[1] + " h", eur(r[2]), eur(c)]; });
        var gkb = r2(pers * gk / 100), tot = r2(pers + gkb + sach);
        return {
          type: "numeric", difficulty: 2, points: 5,
          context: "Für Ihr Abschlussprojekt sollen die Projektkosten kalkuliert werden:" + table(["Rolle", "Stunden", "Stundensatz"], roles.map(function (r) { return [r[0], r[1], eur(r[2])]; })) + "<p>Sachkosten (Lizenzen, Hardware, Ressourcen): " + eur(sach) + ". Auf die Personalkosten wird ein Gemeinkostenzuschlag von " + gk + " % erhoben.</p>",
          question: "Berechnen Sie die Gesamtkosten des Projekts.",
          answer: tot, tolerance: 0.01, unit: "€",
          solution: table(["Rolle", "Stunden", "Satz", "Kosten"], rows) + "<p>Personalkosten: " + eur(pers) + "<br>+ Gemeinkosten " + gk + " %: " + eur(gkb) + "<br>+ Sachkosten: " + eur(sach) + "<br>= <b>" + eur(tot) + "</b></p>"
        };
      }
      var gehalt = int(rnd, 40, 75) * 1000, ln = pick(rnd, [20, 21, 22, 25]), gemein = int(rnd, 10, 40) * 500, std = pick(rnd, [1500, 1560, 1600, 1650, 1700]);
      var lnb = gehalt * ln / 100, sum = gehalt + lnb + gemein, satz = r2(sum / std);
      return {
        type: "numeric", difficulty: 2, points: 4,
        context: "Für die Wirtschaftlichkeitsbetrachtung soll ein interner Stundensatz für Entwickler ermittelt werden: Bruttojahresgehalt " + eur(gehalt) + ", Arbeitgeberanteile/Lohnnebenkosten " + ln + " % des Bruttogehalts, anteilige Gemeinkosten (Arbeitsplatz, Lizenzen, Verwaltung) " + eur(gemein) + " pro Jahr, produktive Arbeitsstunden " + fmt(std, 0) + " pro Jahr.",
        question: "Berechnen Sie den Stundensatz (zwei Nachkommastellen).",
        answer: satz, tolerance: 0.01, unit: "€/h",
        solution: "<p>Bruttogehalt " + eur(gehalt) + "<br>+ Lohnnebenkosten " + ln + " %: " + eur(lnb) + "<br>+ Gemeinkosten: " + eur(gemein) + "<br>= Jahreskosten " + eur(sum) + "<br>÷ " + fmt(std, 0) + " h = <b>" + eur(satz) + " pro Stunde</b></p>"
      };
    }
  });

  G({
    id: "gen-wi-breakeven", part: "GA1", topic: "ga1-wirtschaftlichkeit", title: "Break-even einer Softwarelösung",
    generate: function (rnd) {
      if (rnd() < 0.5) {
        var K = int(rnd, 20, 150) * 1000, n = int(rnd, 5, 60), p = int(rnd, 3, 30) * 10, B = int(rnd, 2, 30) * 100;
        if (n * p - B <= 0) B = Math.floor(n * p / 2 / 100) * 100;
        var net = n * p - B, mon = Math.ceil(K / net - 1e-9);
        return {
          type: "numeric", difficulty: 2, points: 4,
          context: "Ein Softwarehaus entwickelt eine SaaS-Lösung. Die Entwicklung kostet einmalig " + eur(K) + ". Ab dem ersten Monat nutzen " + n + " Kunden die Lösung zu je " + eur(p) + " pro Monat. Die monatlichen Betriebskosten betragen " + eur(B) + ".",
          question: "Nach wie vielen vollen Monaten ist die Gewinnschwelle (Break-even) erreicht? (Auf volle Monate aufrunden.)",
          answer: mon, tolerance: 0, unit: "Monate",
          solution: "<p>Monatlicher Überschuss: " + n + " × " + eur(p) + " − " + eur(B) + " = " + eur(net) + "<br>" + eur(K) + " ÷ " + eur(net) + " = " + fmt(K / net, 2) + " → <b>" + mon + " Monate</b></p>"
        };
      }
      var F = int(rnd, 20, 200) * 500, pr = int(rnd, 10, 80) * 10, v = int(rnd, 1, Math.floor(pr / 20)) * 10;
      var db = pr - v, q = Math.ceil(F / db - 1e-9);
      return {
        type: "numeric", difficulty: 2, points: 4,
        context: "Eine Branchensoftware wird als Kauflizenz zu " + eur(pr) + " je Lizenz angeboten. Pro verkaufter Lizenz entstehen variable Kosten (Support, Einrichtung) von " + eur(v) + ". Die Fixkosten (Entwicklung, Marketing) betragen " + eur(F) + ".",
        question: "Wie viele Lizenzen müssen mindestens verkauft werden, um die Gewinnschwelle zu erreichen?",
        answer: q, tolerance: 0, unit: "Lizenzen",
        solution: "<p>Deckungsbeitrag je Lizenz: " + eur(pr) + " − " + eur(v) + " = " + eur(db) + "<br>Break-even-Menge: " + eur(F) + " ÷ " + eur(db) + " = " + fmt(F / db, 2) + " → aufrunden: <b>" + q + " Lizenzen</b></p>"
      };
    }
  });

  // ===========================================================================
  // GA1 – Qualitätssicherung / Testen
  // ===========================================================================
  var GW_KONTEXTE = [
    ["Das Alter eines Antragstellers", function (rnd) { return [int(rnd, 16, 21), int(rnd, 60, 70)]; }, "Jahre"],
    ["Die Bestellmenge je Artikel", function (rnd) { return [1, pick(rnd, [10, 20, 50, 99, 100])]; }, "Stück"],
    ["Die Anzahl der Tickets pro Buchung", function (rnd) { return [1, int(rnd, 4, 12)]; }, "Tickets"],
    ["Der Rabattsatz in Prozent", function (rnd) { return [0, pick(rnd, [30, 40, 50])]; }, "%"],
    ["Die Körpergröße in cm", function (rnd) { return [int(rnd, 100, 140), int(rnd, 195, 220)]; }, "cm"],
    ["Die Passwortlänge in Zeichen", function (rnd) { return [int(rnd, 8, 12), int(rnd, 32, 64)]; }, "Zeichen"]
  ];
  function setTxt(s) { return "{ " + s.join("; ") + " }"; }
  G({
    id: "gen-qs-grenzwert", part: "GA1", topic: "ga1-qualitaet", title: "Grenzwertanalyse: Testwerte wählen",
    generate: function (rnd) {
      var k = pick(rnd, GW_KONTEXTE), r = k[1](rnd), a = r[0], b = r[1];
      var right = setTxt([a - 1, a, b, b + 1]);
      var mid = Math.round((a + b) / 2);
      var wrongs = shuffle(rnd, [setTxt([a, b]), setTxt([a + 1, b - 1]), setTxt([a - 1, a + 1, b - 1, b + 1]), setTxt([a, a + 1, b - 1, b]), setTxt([a - 1, mid, b + 1]), setTxt([a - 2, a - 1, b + 1, b + 2])]);
      var m = mc(rnd, right, wrongs);
      return {
        type: "mc", difficulty: 1, points: 3,
        context: k[0] + " ist nur im Bereich von <b>" + a + " bis " + b + "</b> (" + k[2] + ", ganzzahlig, Grenzen einschließlich) gültig.",
        question: "Welche Testwertmenge entspricht einer Grenzwertanalyse, bei der je Grenze der Grenzwert selbst und der direkt benachbarte ungültige Wert getestet werden?",
        options: m.options, correct: m.correct,
        solution: "<p>Grenzen: " + a + " (untere) und " + b + " (obere).<br>Untere Grenze: " + (a - 1) + " (ungültig) und " + a + " (gültig)<br>Obere Grenze: " + b + " (gültig) und " + (b + 1) + " (ungültig)</p><p>→ <b>" + right + "</b></p><p>Äquivalenzklassen: ungültig &lt; " + a + ", gültig " + a + "–" + b + ", ungültig &gt; " + b + "; ein Repräsentant der gültigen Klasse wäre z. B. " + mid + ".</p>",
        explanation: "Fehler treten erfahrungsgemäß häufig an Grenzen auf (z. B. &lt; statt ≤). Die Grenzwertanalyse ergänzt die Äquivalenzklassenbildung."
      };
    }
  });

  G({
    id: "gen-qs-aequivalenz", part: "GA1", topic: "ga1-qualitaet", title: "Äquivalenzklassen und Grenzwerte zählen",
    generate: function (rnd) {
      var k = int(rnd, 2, 4), max = pick(rnd, [200, 500, 999, 1000]);
      var bounds = [1], b = 1;
      for (var i = 1; i < k; i++) { b += int(rnd, 3, 40); bounds.push(b); }
      var rab = [0]; for (i = 1; i < k; i++) rab.push(rab[i - 1] + pick(rnd, [2, 3, 5]));
      var tiers = bounds.map(function (lo, ix) { return [lo, ix < k - 1 ? bounds[ix + 1] - 1 : max, rab[ix]]; });
      var ctx = "Ein Webshop gewährt Mengenrabatte. Erlaubt sind ganzzahlige Bestellmengen von 1 bis " + max + " Stück; Eingaben außerhalb werden abgelehnt." + table(["Menge", "Rabatt"], tiers.map(function (t) { return [t[0] + " – " + t[1], t[2] + " %"]; }));
      var classes = ["ungültig: Menge ≤ 0"].concat(tiers.map(function (t) { return "gültig: " + t[0] + " – " + t[1] + " (" + t[2] + " %)"; }), ["ungültig: Menge &gt; " + max]);
      var vals = [0, 1]; for (i = 1; i < k; i++) vals.push(bounds[i] - 1, bounds[i]); vals.push(max, max + 1);
      if (rnd() < 0.5) {
        return {
          type: "numeric", difficulty: 2, points: 3, context: ctx,
          question: "Wie viele Äquivalenzklassen (gültige und ungültige) ergeben sich für die Eingabe der Bestellmenge (nur ganzzahlige Eingaben möglich)?",
          answer: classes.length, tolerance: 0,
          solution: "<ul>" + classes.map(function (c) { return "<li>" + c + "</li>"; }).join("") + "</ul><p>→ <b>" + classes.length + " Äquivalenzklassen</b> (" + k + " gültige, 2 ungültige)</p>"
        };
      }
      return {
        type: "numeric", difficulty: 3, points: 4, context: ctx,
        question: "Für eine Grenzwertanalyse soll an jeder Klassengrenze der letzte Wert der einen und der erste Wert der anderen Klasse getestet werden. Wie viele unterschiedliche Testwerte ergeben sich?",
        answer: vals.length, tolerance: 0,
        solution: "<p>Grenzen liegen zwischen allen benachbarten Klassen: " + (k + 1) + " Grenzen × 2 Werte.</p><p>Testwerte: " + vals.join(", ") + "</p><p>→ <b>" + vals.length + " Testwerte</b></p>"
      };
    }
  });

  G({
    id: "gen-qs-ueberdeckung", part: "GA1", topic: "ga1-qualitaet", title: "Anweisungs-/Zweig-/Pfadüberdeckung, McCabe",
    generate: function (rnd) {
      var struct = pick(rnd, ["if", "ifelse", "kette"]);
      var n = int(rnd, 2, 5), code = "", i;
      var conds = ["betrag > 1000", "kunde.istStammkunde", "land ≠ \"DE\"", "artikel.anzahl > 10", "gutschein ≠ NULL", "zahlungsart = \"Rechnung\""];
      var acts = ["rabatt ← rabatt + 2", "bonus ← wahr", "versand ← versand + 15", "rabatt ← rabatt + 5", "preis ← preis − gutschein.wert", "pruefeBonitaet()"];
      if (struct === "kette") {
        code = "WENN " + conds[0] + " DANN\n    " + acts[0] + "\n";
        for (i = 1; i < n; i++) code += "SONST WENN " + conds[i] + " DANN\n    " + acts[i] + "\n";
        code += "SONST\n    standard ← wahr\nENDE WENN";
      } else {
        for (i = 0; i < n; i++) {
          code += "WENN " + conds[i] + " DANN\n    " + acts[i] + "\n" + (struct === "ifelse" ? "SONST\n    log(\"Regel " + (i + 1) + " nicht erfüllt\")\n" : "") + "ENDE WENN\n";
        }
        code = code.trim();
      }
      var vals = {
        c0: struct === "if" ? 1 : struct === "ifelse" ? 2 : n + 1,
        c1: struct === "kette" ? n + 1 : 2,
        pfad: struct === "kette" ? n + 1 : Math.pow(2, n),
        mccabe: n + 1
      };
      var mode = pick(rnd, ["c0", "c1", "c1", "pfad", "mccabe"]);
      var qtxt = { c0: "Wie viele Testfälle sind mindestens für eine vollständige <b>Anweisungsüberdeckung (C0)</b> nötig?", c1: "Wie viele Testfälle sind mindestens für eine vollständige <b>Zweigüberdeckung (C1)</b> nötig?", pfad: "Wie viele Testfälle sind für eine vollständige <b>Pfadüberdeckung</b> nötig?", mccabe: "Berechnen Sie die <b>zyklomatische Komplexität nach McCabe</b> (Anzahl Entscheidungen + 1)." }[mode];
      var expl = {
        if: "<p>" + n + " aufeinanderfolgende WENN ohne SONST:</p><ul><li>C0: 1 Testfall (alle Bedingungen wahr → alle Anweisungen ausgeführt)</li><li>C1: 2 Testfälle (alle wahr + alle falsch → jeder Zweig, auch die leeren SONST-Zweige)</li><li>Pfade: 2<sup>" + n + "</sup> = " + vals.pfad + " (jede Kombination)</li><li>McCabe: " + n + " Entscheidungen + 1 = " + (n + 1) + "</li></ul>",
        ifelse: "<p>" + n + " aufeinanderfolgende WENN mit SONST:</p><ul><li>C0: 2 Testfälle (alle wahr, alle falsch → alle DANN- und SONST-Anweisungen)</li><li>C1: 2 Testfälle (dieselben beiden decken alle Zweige ab)</li><li>Pfade: 2<sup>" + n + "</sup> = " + vals.pfad + "</li><li>McCabe: " + n + " + 1 = " + (n + 1) + "</li></ul>",
        kette: "<p>Eine WENN-SONST-WENN-Kette mit " + n + " Bedingungen hat " + (n + 1) + " sich gegenseitig ausschließende Zweige:</p><ul><li>C0 = C1 = Pfade = " + (n + 1) + " (jeder Zweig braucht einen eigenen Testfall)</li><li>McCabe: " + n + " Entscheidungen + 1 = " + (n + 1) + "</li></ul>"
      }[struct];
      return {
        type: "numeric", difficulty: 2, points: 3,
        context: "Gegeben ist folgender Ausschnitt einer Methode. Die Bedingungen sind voneinander unabhängig." + pre(code),
        question: qtxt, answer: vals[mode], tolerance: 0,
        solution: expl + "<p>Gesucht: <b>" + vals[mode] + "</b></p>",
        explanation: "C0 ⊂ C1 ⊂ Pfadüberdeckung: Zweigüberdeckung schließt Anweisungsüberdeckung ein. Die McCabe-Zahl ist eine Obergrenze für die Anzahl linear unabhängiger Pfade (Basistestfälle)."
      };
    }
  });

  // ===========================================================================
  // WISO – Kalkulation
  // ===========================================================================
  G({
    id: "gen-kalk-bezug", part: "WISO", topic: "wiso-kalkulation", title: "Bezugskalkulation (Einkauf)",
    generate: function (rnd) {
      var menge = int(rnd, 5, 60), sp = int(rnd, 20, 600) * 2.5;
      var lep = r2(menge * sp), rab = pick(rnd, [0, 5, 10, 12, 15, 20, 25]), sk = pick(rnd, [2, 2, 3]), bk = int(rnd, 2, 40) * 5;
      var rb = r2(lep * rab / 100), zep = r2(lep - rb), skb = r2(zep * sk / 100), bep = r2(zep - skb), bp = r2(bep + bk);
      var ask = pick(rnd, ["bp", "bp", "bep", "zep"]);
      var ans = ask === "bp" ? bp : ask === "bep" ? bep : zep;
      var lbl = { bp: "Bezugspreis (Einstandspreis)", bep: "Bareinkaufspreis", zep: "Zieleinkaufspreis" }[ask];
      return {
        type: "numeric", difficulty: 1, points: 4,
        context: "Ein IT-Systemhaus bestellt " + menge + " Dockingstationen zum Listenpreis von " + eur(sp) + " netto je Stück. Der Lieferant gewährt " + rab + " % Rabatt und bei Zahlung innerhalb von 10 Tagen " + sk + " % Skonto (das Systemhaus nutzt den Skonto). Für Fracht und Verpackung fallen pauschal " + eur(bk) + " netto an.",
        question: "Berechnen Sie den <b>" + lbl + "</b> der gesamten Lieferung. Runden Sie jeden Zwischenschritt auf zwei Nachkommastellen.",
        answer: ans, tolerance: 0.01, unit: "€",
        solution: table(["Schema", "Betrag"], [["Listeneinkaufspreis (" + menge + " × " + eur(sp) + ")", eur(lep)], ["− Lieferantenrabatt " + rab + " %", eur(rb)], ["= Zieleinkaufspreis", eur(zep)], ["− Lieferantenskonto " + sk + " %", eur(skb)], ["= Bareinkaufspreis", eur(bep)], ["+ Bezugskosten", eur(bk)], ["= Bezugspreis (Einstandspreis)", eur(bp)]]) + "<p>Gesucht (" + lbl + "): <b>" + eur(ans) + "</b></p>",
        explanation: "Reihenfolge merken: Rabatt vom Listenpreis, Skonto vom Zieleinkaufspreis (nach Rabatt), Bezugskosten zum Schluss addieren. Die Umsatzsteuer ist als Vorsteuer kein Kostenbestandteil."
      };
    }
  });

  G({
    id: "gen-kalk-handel", part: "WISO", topic: "wiso-kalkulation", title: "Verkaufskalkulation (vorwärts)",
    generate: function (rnd) {
      var fromBP = rnd() < 0.5;
      var bp = int(rnd, 40, 800) * 2.5, hkz = int(rnd, 3, 12) * 5, sk0 = r2(bp * (1 + hkz / 100));
      var sk = fromBP ? sk0 : int(rnd, 100, 2000) * 1.5;
      var g = pick(rnd, [5, 8, 10, 12, 15, 20, 25]), ks = pick(rnd, [2, 3]), kr = pick(rnd, [0, 5, 10, 15, 20]);
      var hkb = r2(bp * hkz / 100);
      var gb = r2(sk * g / 100), bvp = r2(sk + gb);
      var zvp = r2(bvp / (1 - ks / 100)), ksb = r2(zvp - bvp);
      var lvp = r2(zvp / (1 - kr / 100)), krb = r2(lvp - zvp);
      var brutto = rnd() < 0.3;
      var lvpB = r2(lvp * 1.19);
      var ask = brutto ? "brutto" : pick(rnd, ["lvp", "lvp", "zvp", "bvp"]);
      var ans = { brutto: lvpB, lvp: lvp, zvp: zvp, bvp: bvp }[ask];
      var rows = [];
      if (fromBP) rows.push(["Bezugspreis", eur(bp)], ["+ Handlungskosten " + hkz + " %", eur(hkb)]);
      rows.push(["= Selbstkosten", eur(sk)], ["+ Gewinn " + g + " % (vom Hundert)", eur(gb)], ["= Barverkaufspreis", eur(bvp)], ["+ Kundenskonto " + ks + " % (im Hundert: BVP ÷ " + num(1 - ks / 100) + ")", eur(ksb)], ["= Zielverkaufspreis", eur(zvp)], ["+ Kundenrabatt " + kr + " % (im Hundert: ZVP ÷ " + num(1 - kr / 100) + ")", eur(krb)], ["= Listenverkaufspreis (netto)", eur(lvp)]);
      if (brutto) rows.push(["+ 19 % USt", eur(lvpB - lvp)], ["= Listenverkaufspreis (brutto)", eur(lvpB)]);
      var lbl = { brutto: "Listenverkaufspreis brutto (inkl. 19 % USt)", lvp: "Listenverkaufspreis netto", zvp: "Zielverkaufspreis", bvp: "Barverkaufspreis" }[ask];
      return {
        type: "numeric", difficulty: 2, points: 5,
        context: "Ein Händler kalkuliert den Angebotspreis für einen Monitor. " + (fromBP ? "Der Bezugspreis beträgt " + eur(bp) + ", der Handlungskostenzuschlag " + hkz + " %." : "Die Selbstkosten betragen " + eur(sk) + ".") + " Kalkuliert werden " + g + " % Gewinn, " + ks + " % Kundenskonto und " + kr + " % Kundenrabatt.",
        question: "Berechnen Sie den <b>" + lbl + "</b>. Runden Sie jeden Zwischenschritt auf zwei Nachkommastellen.",
        answer: ans, tolerance: 0.01, unit: "€",
        solution: table(["Kalkulationsschema", "Betrag"], rows) + "<p>Gesucht: <b>" + eur(ans) + "</b></p>",
        explanation: "Skonto und Rabatt beziehen sich beim Kunden auf den <b>höheren</b> Preis (Ziel- bzw. Listenverkaufspreis), deshalb wird „im Hundert“ gerechnet: Wert ÷ (100 % − Satz). Typischer Fehler: einfach Prozente aufschlagen."
      };
    }
  });

  G({
    id: "gen-kalk-db", part: "WISO", topic: "wiso-kalkulation", title: "Deckungsbeitrag und Break-even",
    generate: function (rnd) {
      var p = int(rnd, 20, 400) * 0.5 + 20, kv = r2(p * pick(rnd, [0.3, 0.4, 0.45, 0.5, 0.6, 0.7])), F = int(rnd, 20, 300) * 500, x = int(rnd, 200, 5000);
      var db = r2(p - kv), dbg = r2(db * x), erg = r2(dbg - F), bep = Math.ceil(F / db - 1e-9), plg = r2(kv + F / x);
      var mode = pick(rnd, ["db", "dbg", "erg", "bep", "bep", "pug"]);
      var ans = { db: db, dbg: dbg, erg: erg, bep: bep, pug: plg }[mode];
      var q = {
        db: "Berechnen Sie den Deckungsbeitrag je Stück.",
        dbg: "Berechnen Sie den gesamten Deckungsbeitrag für die geplante Menge.",
        erg: "Berechnen Sie das Betriebsergebnis (Gewinn bzw. Verlust, Verlust negativ angeben) bei der geplanten Menge.",
        bep: "Ermitteln Sie die Gewinnschwelle (Break-even-Menge, auf ganze Stück aufrunden).",
        pug: "Berechnen Sie die langfristige Preisuntergrenze je Stück bei der geplanten Menge."
      }[mode];
      return {
        type: "numeric", difficulty: 2, points: 4,
        context: "Ein Hersteller von Smart-Home-Sensoren plant für das nächste Quartal: Verkaufspreis netto " + eur(p) + " je Stück, variable Kosten " + eur(kv) + " je Stück, fixe Kosten " + eur(F) + " pro Quartal, geplante Absatzmenge " + fmt(x, 0) + " Stück.",
        question: q, answer: ans, tolerance: mode === "bep" ? 0 : 0.01, unit: mode === "bep" ? "Stück" : "€",
        solution: "<p>DB je Stück = Preis − variable Stückkosten = " + eur(p) + " − " + eur(kv) + " = " + eur(db) + "<br>DB gesamt = " + eur(db) + " × " + fmt(x, 0) + " = " + eur(dbg) + "<br>Betriebsergebnis = DB gesamt − Fixkosten = " + eur(dbg) + " − " + eur(F) + " = " + eur(erg) + "<br>Break-even-Menge = Fixkosten ÷ DB je Stück = " + eur(F) + " ÷ " + eur(db) + " = " + fmt(F / db, 2) + " → " + bep + " Stück<br>Kurzfristige Preisuntergrenze = variable Stückkosten = " + eur(kv) + "<br>Langfristige Preisuntergrenze = Stückkosten = " + eur(kv) + " + " + eur(F) + " ÷ " + fmt(x, 0) + " = " + eur(plg) + "</p><p>Gesucht: <b>" + (mode === "bep" ? bep + " Stück" : eur(ans)) + "</b></p>"
      };
    }
  });

  G({
    id: "gen-kalk-afa", part: "WISO", topic: "wiso-kalkulation", title: "Lineare Abschreibung (AfA)",
    generate: function (rnd) {
      var obj = pick(rnd, [["einen Firmen-Pkw", 6], ["eine Büroeinrichtung", 13], ["eine Telefonanlage", 10], ["einen Gabelstapler", 8], ["eine Klimaanlage für den Serverraum", 10], ["einen Lieferwagen", 9]]);
      var nd = obj[1], ak = nd * 60 * int(rnd, 20, 400);
      var jahr = ak / nd, mon = int(rnd, 1, 12), y0 = pick(rnd, [2024, 2025, 2026]);
      var mode = pick(rnd, ["jahr", "rbw", "pro", "rbwpro"]);
      var n = int(rnd, 1, nd - 1), ans, sol;
      var first = jahr * (13 - mon) / 12;
      var base = "<p>Jährliche AfA = Anschaffungskosten ÷ Nutzungsdauer = " + eur(ak) + " ÷ " + nd + " = " + eur(jahr) + "</p>";
      if (mode === "jahr") { ans = jahr; sol = base; }
      else if (mode === "rbw") { ans = ak - n * jahr; sol = base + "<p>Restbuchwert nach " + n + " Jahren = " + eur(ak) + " − " + n + " × " + eur(jahr) + " = <b>" + eur(ans) + "</b></p>"; }
      else if (mode === "pro") { ans = r2(first); sol = base + "<p>Anschaffung im " + mon + ". Monat → zeitanteilig (pro rata temporis) " + (13 - mon) + " Monate im ersten Jahr (Anschaffungsmonat zählt mit):<br>" + eur(jahr) + " × " + (13 - mon) + "/12 = <b>" + eur(ans) + "</b></p>"; }
      else { ans = r2(ak - first - (n - 1) * jahr); sol = base + "<p>1. Jahr (" + y0 + ", " + (13 - mon) + " Monate): " + eur(first) + "<br>Folgejahre: je " + eur(jahr) + "<br>Restbuchwert am 31.12." + (y0 + n - 1) + " = " + eur(ak) + " − " + eur(first) + (n > 1 ? " − " + (n - 1) + " × " + eur(jahr) : "") + " = <b>" + eur(ans) + "</b></p>"; }
      var monate = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
      var q = { jahr: "Berechnen Sie den jährlichen Abschreibungsbetrag (lineare AfA).", rbw: "Berechnen Sie den Restbuchwert am Ende des " + n + ". Nutzungsjahres (volle Jahre, keine zeitanteilige Abschreibung).", pro: "Berechnen Sie den Abschreibungsbetrag für das Anschaffungsjahr " + y0 + " (zeitanteilig, monatsgenau).", rbwpro: "Berechnen Sie den Restbuchwert zum 31.12." + (y0 + n - 1) + " (zeitanteilige Abschreibung im Anschaffungsjahr, monatsgenau)." }[mode];
      return {
        type: "numeric", difficulty: mode === "rbwpro" ? 3 : 2, points: 4,
        context: "Ein Unternehmen schafft im " + monate[mon - 1] + " " + y0 + " " + obj[0] + " für " + eur(ak) + " netto (Anschaffungskosten) an. Die betriebsgewöhnliche Nutzungsdauer beträgt laut AfA-Tabelle " + nd + " Jahre. Es wird linear abgeschrieben.",
        question: q + " Runden Sie auf zwei Nachkommastellen.",
        answer: ans, tolerance: 0.01, unit: "€",
        solution: sol + (mode === "jahr" ? "<p>Ergebnis: <b>" + eur(ans) + "</b></p>" : ""),
        explanation: "Bei linearer AfA ist der jährliche Betrag konstant. Im Anschaffungsjahr wird monatsgenau abgeschrieben (§ 7 Abs. 1 Satz 4 EStG): der Anschaffungsmonat zählt voll."
      };
    }
  });

  G({
    id: "gen-kalk-zins", part: "WISO", topic: "wiso-kalkulation", title: "Zinsrechnung und Skontoausnutzung",
    generate: function (rnd) {
      var mode = pick(rnd, ["zins", "zins", "tage", "skonto", "effektiv"]);
      if (mode === "zins" || mode === "tage") {
        var K = int(rnd, 10, 200) * 500, p = int(rnd, 14, 48) / 4, t = int(rnd, 15, 300);
        var Z = r2(K * p * t / 36000);
        if (mode === "zins") return {
          type: "numeric", difficulty: 1, points: 3,
          context: "Ein Unternehmen nimmt zur Vorfinanzierung eines Projekts einen kurzfristigen Kredit über " + eur(K) + " zu einem Zinssatz von " + num(p) + " % p. a. für " + t + " Tage auf.",
          question: "Berechnen Sie die Zinsen (kaufmännische Zinsrechnung: 1 Jahr = 360 Tage, 1 Monat = 30 Tage).",
          answer: Z, tolerance: 0.01, unit: "€",
          solution: "<p>Z = K × p × t ÷ (100 × 360) = " + eur(K) + " × " + num(p) + " × " + t + " ÷ 36.000 = <b>" + eur(Z) + "</b></p>"
        };
        var Zt = K * p * t / 36000;
        return {
          type: "numeric", difficulty: 2, points: 3,
          context: "Für einen Kredit über " + eur(K) + " zu " + num(p) + " % p. a. wurden " + eur(Zt) + " Zinsen berechnet (1 Jahr = 360 Tage).",
          question: "Wie viele Tage lief der Kredit?",
          answer: t, tolerance: 0, unit: "Tage",
          solution: "<p>t = Z × 100 × 360 ÷ (K × p) = " + fmt(Zt) + " × 36.000 ÷ (" + fmt(K) + " × " + num(p) + ") = <b>" + t + " Tage</b></p>"
        };
      }
      var R = int(rnd, 20, 400) * 50, s = pick(rnd, [2, 3]), sf = pick(rnd, [8, 10, 14]), ziel = pick(rnd, [30, 45, 60]);
      if (mode === "effektiv") {
        var eff = r2(s * 360 / (ziel - sf));
        return {
          type: "numeric", difficulty: 2, points: 3,
          context: "Eine Lieferantenrechnung enthält die Zahlungsbedingung: „Zahlbar innerhalb von " + sf + " Tagen mit " + s + " % Skonto oder innerhalb von " + ziel + " Tagen netto.“",
          question: "Berechnen Sie den effektiven Jahreszinssatz des Lieferantenkredits mit der Näherungsformel (Skontosatz × 360 ÷ (Zahlungsziel − Skontofrist)), zwei Nachkommastellen.",
          answer: eff, tolerance: 0.01, unit: "%",
          solution: "<p>" + s + " × 360 ÷ (" + ziel + " − " + sf + ") = " + (s * 360) + " ÷ " + (ziel - sf) + " = <b>" + fmt(eff) + " %</b></p><p>Der Lieferantenkredit ist damit sehr teuer – Skonto auszunutzen lohnt sich fast immer, selbst wenn dafür der Kontokorrentkredit genutzt wird.</p>"
        };
      }
      var kk = int(rnd, 6, 14), sb = r2(R * s / 100), ue = r2(R - sb), zt = ziel - sf, zz = r2(ue * kk * zt / 36000), ers = r2(sb - zz);
      return {
        type: "numeric", difficulty: 3, points: 5,
        context: "Eine Rechnung über " + eur(R) + " ist zahlbar innerhalb von " + sf + " Tagen mit " + s + " % Skonto oder in " + ziel + " Tagen ohne Abzug. Um den Skonto zu nutzen, müsste das Unternehmen sein Bankkonto mit " + kk + " % p. a. überziehen (Kontokorrentkredit). Die Überweisung erfolgt am letzten Tag der Skontofrist; der Kredit läuft bis zum Ende des Zahlungsziels.",
        question: "Berechnen Sie die Ersparnis durch Skontoausnutzung (Skontobetrag − Kreditzinsen; 1 Jahr = 360 Tage). Runden Sie Zwischenergebnisse auf zwei Nachkommastellen.",
        answer: ers, tolerance: 0.01, unit: "€",
        solution: "<p>Skontobetrag: " + eur(R) + " × " + s + " % = " + eur(sb) + "<br>Überweisungsbetrag (Kreditbetrag): " + eur(R) + " − " + eur(sb) + " = " + eur(ue) + "<br>Kreditlaufzeit: " + ziel + " − " + sf + " = " + zt + " Tage<br>Zinsen: " + eur(ue) + " × " + kk + " × " + zt + " ÷ 36.000 = " + eur(zz) + "<br>Ersparnis: " + eur(sb) + " − " + eur(zz) + " = <b>" + eur(ers) + "</b></p>"
      };
    }
  });

  G({
    id: "gen-kalk-prozent", part: "WISO", topic: "wiso-kalkulation", title: "Prozentrechnung: Gehalt, Inflation, Reallohn",
    generate: function (rnd) {
      var mode = pick(rnd, ["neu", "real", "alt", "aenderung"]);
      var G0 = int(rnd, 50, 120) * 50, e = int(rnd, 3, 14) / 2;
      if (mode === "neu") {
        var neu = r2(G0 * (1 + e / 100));
        return { type: "numeric", difficulty: 1, points: 2, context: "Ein Anwendungsentwickler verdient " + eur(G0) + " brutto im Monat. Laut neuem Tarifvertrag steigt das Gehalt um " + num(e) + " %.", question: "Berechnen Sie das neue Bruttomonatsgehalt.", answer: neu, tolerance: 0.01, unit: "€", solution: "<p>" + eur(G0) + " × (1 + " + num(e / 100) + ") = " + eur(G0) + " × " + num(1 + e / 100) + " = <b>" + eur(neu) + "</b></p>" };
      }
      if (mode === "alt") {
        var nn = r2(G0 * (1 + e / 100)), alt = r2(nn / (1 + e / 100));
        return { type: "numeric", difficulty: 2, points: 3, context: "Nach einer Gehaltserhöhung um " + num(e) + " % verdient eine Mitarbeiterin " + eur(nn) + " brutto im Monat.", question: "Wie hoch war ihr Gehalt vor der Erhöhung?", answer: alt, tolerance: 0.01, unit: "€", solution: "<p>Das neue Gehalt entspricht " + num(100 + e) + " % (vermehrter Grundwert):<br>" + eur(nn) + " ÷ " + num(1 + e / 100) + " = <b>" + eur(alt) + "</b></p>", explanation: "Typischer Fehler: " + num(e) + " % vom neuen Gehalt abziehen – das ergibt einen zu kleinen Wert." };
      }
      if (mode === "real") {
        var inf = int(rnd, 2, 12) / 2, real = r2(((1 + e / 100) / (1 + inf / 100) - 1) * 100);
        return { type: "numeric", difficulty: 2, points: 3, context: "Die Gehälter steigen nominal um " + num(e) + " %, die Inflationsrate (Verbraucherpreisindex) beträgt im gleichen Zeitraum " + num(inf) + " %.", question: "Berechnen Sie die reale Gehaltsveränderung in Prozent (exakte Rechnung, zwei Nachkommastellen; negativ = Kaufkraftverlust).", answer: real, tolerance: 0.01, unit: "%", solution: "<p>Real = (1 + nominal) ÷ (1 + Inflation) − 1 = " + num(1 + e / 100) + " ÷ " + num(1 + inf / 100) + " − 1 = " + fmt(((1 + e / 100) / (1 + inf / 100) - 1), 6) + " → <b>" + fmt(real) + " %</b></p><p>Näherung: " + num(e) + " % − " + num(inf) + " % = " + num(e - inf) + " %.</p>" };
      }
      var a = int(rnd, 40, 400) * 25, b = r2(a * (1 + int(rnd, -30, 40) / 100));
      if (b === a) b = a + 125;
      var ch = r2((b - a) / a * 100);
      return { type: "numeric", difficulty: 1, points: 2, context: "Die monatlichen Cloud-Kosten eines Unternehmens betrugen im Vorjahr " + eur(a) + ", im aktuellen Jahr " + eur(b) + ".", question: "Um wie viel Prozent haben sich die Kosten verändert (zwei Nachkommastellen, Senkung negativ)?", answer: ch, tolerance: 0.01, unit: "%", solution: "<p>(" + eur(b) + " − " + eur(a) + ") ÷ " + eur(a) + " × 100 = <b>" + fmt(ch) + " %</b></p>" };
    }
  });

  // ===========================================================================
  // WISO – Sozialversicherung
  // ===========================================================================
  G({
    id: "gen-sv-netto", part: "WISO", topic: "wiso-sozialversicherung", title: "Brutto-Netto-Rechnung",
    generate: function (rnd) {
      var br = int(rnd, 96, 220) * 25, z = pick(rnd, [2.5, 2.7, 2.9, 3.1, 3.3]), kinderlos = rnd() < 0.5, kirche = rnd() < 0.5;
      var kist = pick(rnd, [8, 9]);
      var lst = r2((br - 1250) * (0.15 + rnd() * 0.07));
      var ks = r2(kirche ? lst * kist / 100 : 0);
      var kvAN = 7.3 + z / 2, pvAN = 1.8 + (kinderlos ? 0.6 : 0);
      var kv = r2(br * kvAN / 100), pv = r2(br * pvAN / 100), rv = r2(br * 9.3 / 100), av = r2(br * 1.3 / 100);
      var sv = r2(kv + pv + rv + av), netto = r2(br - lst - ks - sv);
      var agKV = r2(br * kvAN / 100), agPV = r2(br * 1.8 / 100), ag = r2(agKV + agPV + rv + av);
      var mode = pick(rnd, ["netto", "netto", "sv", "ag", "kv"]);
      var ans = { netto: netto, sv: sv, ag: ag, kv: kv }[mode];
      var q = { netto: "Berechnen Sie das Nettogehalt.", sv: "Berechnen Sie den <b>Arbeitnehmeranteil</b> zur Sozialversicherung insgesamt.", ag: "Berechnen Sie den <b>Arbeitgeberanteil</b> zur Sozialversicherung (ohne Umlagen U1/U2/U3 und ohne Unfallversicherung).", kv: "Berechnen Sie den Arbeitnehmeranteil zur Krankenversicherung (inkl. Zusatzbeitrag)." }[mode];
      return {
        type: "numeric", difficulty: 2, points: 5,
        context: "Eine Anwendungsentwicklerin (" + (kinderlos ? "kinderlos, 29 Jahre" : "ein Kind, 34 Jahre") + ", Steuerklasse I" + (kirche ? ", kirchensteuerpflichtig" : ", keine Kirchenzugehörigkeit") + ") verdient " + eur(br) + " brutto im Monat (unterhalb der Beitragsbemessungsgrenzen). Verwenden Sie folgende Werte:" +
          table(["Position", "Gesamtsatz", "Arbeitnehmeranteil"], [["Krankenversicherung", "14,6 %", "7,3 %"], ["Zusatzbeitrag KV", num(z) + " %", num(z / 2) + " %"], ["Pflegeversicherung", "3,6 %", "1,8 %" + (kinderlos ? " + 0,6 % Kinderlosenzuschlag" : "")], ["Rentenversicherung", "18,6 %", "9,3 %"], ["Arbeitslosenversicherung", "2,6 %", "1,3 %"]]) +
          "<p>Lohnsteuer laut Tabelle: " + eur(lst) + (kirche ? "; Kirchensteuer: " + kist + " % der Lohnsteuer" : "") + "; Solidaritätszuschlag: 0,00 € (Freigrenze).</p>",
        question: q + " Runden Sie jeden Beitrag auf zwei Nachkommastellen.",
        answer: ans, tolerance: 0.01, unit: "€",
        solution: table(["Position", "Arbeitnehmer", "Arbeitgeber"], [["KV " + num(kvAN) + " %", eur(kv), eur(agKV)], ["PV " + num(pvAN) + " % (AG 1,8 %)", eur(pv), eur(agPV)], ["RV 9,3 %", eur(rv), eur(rv)], ["AV 1,3 %", eur(av), eur(av)], ["<b>Summe SV</b>", "<b>" + eur(sv) + "</b>", "<b>" + eur(ag) + "</b>"]]) +
          "<p>Bruttogehalt " + eur(br) + "<br>− Lohnsteuer " + eur(lst) + (kirche ? "<br>− Kirchensteuer (" + kist + " % von " + eur(lst) + ") " + eur(ks) : "") + "<br>− SV-Anteil AN " + eur(sv) + "<br>= Nettogehalt <b>" + eur(netto) + "</b></p><p>Gesucht: <b>" + eur(ans) + "</b></p>",
        explanation: "Der Kinderlosenzuschlag zur Pflegeversicherung (ab 23 Jahren) wird allein vom Arbeitnehmer getragen. Die Unfallversicherung zahlt der Arbeitgeber allein (an die Berufsgenossenschaft)."
      };
    }
  });

  // ===========================================================================
  // WISO – Arbeitsrecht
  // ===========================================================================
  G({
    id: "gen-ar-urlaub-teilzeit", part: "WISO", topic: "wiso-arbeitsrecht", title: "Urlaubsanspruch bei Teilzeit",
    generate: function (rnd) {
      var d = int(rnd, 2, 5);
      var mode = pick(rnd, ["gesetz", "vertrag", "vertrag", "sb"]);
      if (mode === "gesetz") {
        var g = 4 * d;
        return {
          type: "numeric", difficulty: 2, points: 3,
          context: "Ein Mitarbeiter arbeitet in Teilzeit an " + d + " Tagen pro Woche. Im Arbeitsvertrag ist nur der gesetzliche Mindesturlaub vereinbart.",
          question: "Wie viele Urlaubstage (Arbeitstage) stehen ihm nach dem Bundesurlaubsgesetz pro Jahr mindestens zu?",
          answer: g, tolerance: 0, unit: "Tage",
          solution: "<p>§ 3 BUrlG: 24 Werktage bei einer 6-Tage-Woche (Montag–Samstag).<br>Umrechnung: 24 × " + d + " ÷ 6 = <b>" + g + " Arbeitstage</b></p><p>(Bei Vollzeit mit 5-Tage-Woche entspricht das 20 Arbeitstagen.)</p>"
        };
      }
      var V = pick(rnd, [25, 30]), t = V * d / 5;
      if (mode === "vertrag") return {
        type: "numeric", difficulty: 1, points: 2,
        context: "Laut Tarifvertrag erhalten Vollzeitkräfte (5-Tage-Woche) " + V + " Urlaubstage. Eine Kollegin arbeitet in Teilzeit an " + d + " Tagen pro Woche.",
        question: "Wie viele Urlaubstage stehen ihr zu?",
        answer: t, tolerance: 0, unit: "Tage",
        solution: "<p>Urlaub = Vollzeiturlaub × Arbeitstage pro Woche ÷ 5 = " + V + " × " + d + " ÷ 5 = <b>" + t + " Tage</b></p><p>Die Anzahl der Stunden pro Tag spielt keine Rolle – nur die Verteilung auf Wochentage.</p>"
      };
      return {
        type: "numeric", difficulty: 2, points: 3,
        context: "Laut Arbeitsvertrag erhalten Vollzeitkräfte (5-Tage-Woche) " + V + " Urlaubstage. Ein schwerbehinderter Mitarbeiter arbeitet an " + d + " Tagen pro Woche.",
        question: "Wie viele Urlaubstage stehen ihm insgesamt zu (inkl. Zusatzurlaub nach § 208 SGB IX)?",
        answer: t + d, tolerance: 0, unit: "Tage",
        solution: "<p>Vertraglicher Urlaub anteilig: " + V + " × " + d + " ÷ 5 = " + t + " Tage<br>Zusatzurlaub § 208 SGB IX: eine Arbeitswoche = " + d + " Tage (bei 5-Tage-Woche wären es 5)<br>Summe: <b>" + (t + d) + " Tage</b></p>"
      };
    }
  });

  G({
    id: "gen-ar-urlaub-anteilig", part: "WISO", topic: "wiso-arbeitsrecht", title: "Anteiliger Urlaub (Teilurlaub § 5 BUrlG)",
    generate: function (rnd) {
      var J, m, raw, eintritt, tries = 0;
      do {
        J = pick(rnd, [20, 24, 25, 26, 27, 28, 30]);
        eintritt = rnd() < 0.6;
        m = eintritt ? int(rnd, 8, 12) : int(rnd, 1, 6);
        raw = J * (eintritt ? 13 - m : m) / 12;
        tries++;
      } while (raw % 1 > 1e-9 && raw % 1 < 0.5 - 1e-9 && tries < 100);
      var full = eintritt ? 13 - m : m;
      var ans = raw % 1 >= 0.5 - 1e-9 ? Math.ceil(raw) : Math.round(raw);
      var y = pick(rnd, [2026, 2027]);
      var monate = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
      var ctx = eintritt
        ? "Ein Umschüler wird nach bestandener Prüfung zum 01." + two(m) + "." + y + " als Anwendungsentwickler eingestellt. Der vertragliche Jahresurlaub beträgt " + J + " Arbeitstage."
        : "Eine Mitarbeiterin, die seit mehreren Jahren im Unternehmen beschäftigt ist, scheidet zum " + lastDay(y, m) + "." + two(m) + "." + y + " aus. Ihr Jahresurlaub beträgt " + J + " Arbeitstage; im Jahr " + y + " hat sie noch keinen Urlaub genommen.";
      return {
        type: "numeric", difficulty: 2, points: 3, context: ctx,
        question: "Wie viele Urlaubstage stehen " + (eintritt ? "ihm" : "ihr") + " für das Jahr " + y + " zu?",
        answer: ans, tolerance: 0, unit: "Tage",
        solution: "<p>" + (eintritt ? "Die Wartezeit von 6 Monaten (§ 4 BUrlG) kann im Eintrittsjahr nicht mehr erfüllt werden → Teilurlaub nach § 5 Abs. 1a BUrlG." : "Ausscheiden in der ersten Jahreshälfte nach erfüllter Wartezeit → Teilurlaub nach § 5 Abs. 1c BUrlG.") +
          "<br>Volle Beschäftigungsmonate im Jahr: " + full + " (" + (eintritt ? monate[m - 1] + " bis Dezember" : "Januar bis " + monate[m - 1]) + ")<br>" + J + " × " + full + " ÷ 12 = " + fmt(raw, 2) + (raw % 1 > 1e-9 ? " → Bruchteile von mindestens einem halben Tag werden aufgerundet (§ 5 Abs. 2 BUrlG)" : "") + "<br>Anspruch: <b>" + ans + " Tage</b></p>",
        explanation: "Je vollem Monat des Arbeitsverhältnisses entsteht 1/12 des Jahresurlaubs. Bei Eintritt bis spätestens 1. Juli wird die Wartezeit noch im selben Jahr erfüllt – dann besteht der volle gesetzliche Anspruch."
      };
    }
  });

  function fristMonate(j) { return j >= 20 ? 7 : j >= 15 ? 6 : j >= 12 ? 5 : j >= 10 ? 4 : j >= 8 ? 3 : j >= 5 ? 2 : j >= 2 ? 1 : 0; }
  function grundEnde(z) {
    var e = addDays(z, 28), y = e.getUTCFullYear(), m = e.getUTCMonth() + 1;
    return e.getUTCDate() <= 15 ? D(y, m, 15) : D(y, m, lastDay(y, m));
  }
  function fullYears(a, b) {
    var y = b.getUTCFullYear() - a.getUTCFullYear();
    if (b.getUTCMonth() < a.getUTCMonth() || (b.getUTCMonth() === a.getUTCMonth() && b.getUTCDate() < a.getUTCDate())) y--;
    return y;
  }
  function kuendFall(rnd, forceAG) {
    var z;
    do { z = D(pick(rnd, [2026, 2027]), int(rnd, 1, 12), int(rnd, 1, 28) + (rnd() < 0.3 ? 3 : 0)); } while (z.getUTCDay() === 0 || z.getUTCDay() === 6);
    var typ = forceAG ? "ag" : pick(rnd, ["ag", "ag", "ag", "an", "probe"]);
    var jahre = typ === "probe" ? 0 : forceAG ? int(rnd, 2, 25) : pick(rnd, [0, 1, int(rnd, 2, 25), int(rnd, 2, 25), int(rnd, 2, 12)]);
    var eintritt = typ === "probe" ? addDays(z, -int(rnd, 30, 160)) : addDays(D(z.getUTCFullYear() - jahre, z.getUTCMonth() + 1, Math.min(z.getUTCDate(), 28)), -int(rnd, 1, 300));
    if (typ !== "probe" && jahre === 0 && fullYears(eintritt, z) < 0) eintritt = addDays(z, -200);
    jahre = fullYears(eintritt, z);
    var mon = typ === "ag" ? fristMonate(jahre) : 0;
    var ende, regel;
    if (typ === "probe") { ende = addDays(z, 14); regel = "Probezeit (§ 622 Abs. 3 BGB): Frist 2 Wochen, Kündigung zu jedem beliebigen Tag möglich. Fristbeginn am Tag nach Zugang → Ende " + fmtD(z) + " + 14 Tage."; }
    else if (mon === 0) {
      ende = grundEnde(z);
      regel = (typ === "an" ? "Kündigung durch den Arbeitnehmer: Es gilt immer die Grundkündigungsfrist (§ 622 Abs. 1 BGB) – die verlängerten Fristen des Abs. 2 gelten nur für Kündigungen durch den Arbeitgeber (sofern vertraglich nichts anderes vereinbart ist)." : "Betriebszugehörigkeit unter 2 Jahren → Grundkündigungsfrist (§ 622 Abs. 1 BGB).") +
        " Frist: 4 Wochen (28 Tage) zum 15. oder zum Ende eines Kalendermonats.<br>" + fmtD(z) + " + 28 Tage = " + fmtD(addDays(z, 28)) + " → nächster zulässiger Termin (15. bzw. Monatsende): " + fmtD(ende) + ".";
    } else {
      ende = monthEndPlus(z, mon);
      regel = "Kündigung durch den Arbeitgeber nach " + jahre + " Jahren Betriebszugehörigkeit → § 622 Abs. 2 BGB: " + mon + " Monat" + (mon > 1 ? "e" : "") + " zum Ende eines Kalendermonats.<br>Zugang " + fmtD(z) + " + " + mon + " Monat" + (mon > 1 ? "e" : "") + " = frühestens " + fmtD(addMonthsClamp(z, mon)) + " → nächstes Monatsende: " + fmtD(ende) + ".";
    }
    return { z: z, typ: typ, jahre: jahre, eintritt: eintritt, mon: mon, ende: ende, regel: regel };
  }
  var FRISTEN_TAB = table(["Betriebszugehörigkeit", "Frist (AG-Kündigung)"], [["unter 2 Jahre", "4 Wochen zum 15. oder Monatsende"], ["ab 2 Jahre", "1 Monat zum Monatsende"], ["ab 5 Jahre", "2 Monate"], ["ab 8 Jahre", "3 Monate"], ["ab 10 Jahre", "4 Monate"], ["ab 12 Jahre", "5 Monate"], ["ab 15 Jahre", "6 Monate"], ["ab 20 Jahre", "7 Monate (jeweils zum Monatsende)"]]);
  function kuendCtx(f) {
    var wer = f.typ === "an" ? "Der Mitarbeiter kündigt selbst; seine schriftliche Kündigung geht dem Arbeitgeber" : "Der Arbeitgeber kündigt ordentlich; die schriftliche Kündigung geht dem Mitarbeiter";
    return "Ein Mitarbeiter ist seit dem " + fmtD(f.eintritt) + " im Unternehmen beschäftigt" + (f.typ === "probe" ? " und befindet sich noch in der vereinbarten sechsmonatigen Probezeit" : "") + ". " + wer + " am <b>" + fmtDW(f.z) + "</b> zu. Es gelten ausschließlich die gesetzlichen Kündigungsfristen (§ 622 BGB); ein Tarifvertrag findet keine Anwendung.";
  }
  G({
    id: "gen-ar-kuendigungsfrist", part: "WISO", topic: "wiso-arbeitsrecht", title: "Kündigungsfrist nach § 622 BGB (Monate)",
    generate: function (rnd) {
      var f = kuendFall(rnd, true);
      return {
        type: "numeric", difficulty: 2, points: 3, context: kuendCtx(f),
        question: "Wie viele Monate beträgt die gesetzliche Kündigungsfrist?",
        answer: f.mon, tolerance: 0, unit: "Monate",
        solution: "<p>Betriebszugehörigkeit bei Zugang der Kündigung: " + fmtD(f.eintritt) + " bis " + fmtD(f.z) + " = " + f.jahre + " volle Jahre.</p>" + FRISTEN_TAB + "<p>" + f.regel + "</p><p>Frist: <b>" + f.mon + " Monat" + (f.mon > 1 ? "e" : "") + "</b> zum Monatsende.</p>",
        explanation: "Seit 2010 (EuGH) bzw. der Gesetzesänderung 2019 zählen auch Beschäftigungszeiten vor dem 25. Lebensjahr mit."
      };
    }
  });

  G({
    id: "gen-ar-kuendigungstermin", part: "WISO", topic: "wiso-arbeitsrecht", title: "Beendigungsdatum bei Kündigung",
    generate: function (rnd) {
      var f = kuendFall(rnd, false);
      var z = f.z, right = fmtD(f.ende), w = [];
      if (f.typ === "probe") w = [addDays(z, 28), monthEndPlus(z, 0), addDays(z, 13), grundEnde(z), addDays(z, 15), monthEndPlus(z, 1)];
      else if (f.mon === 0) {
        var e = f.ende;
        var alt = e.getUTCDate() === 15 ? monthEndPlus(e, 0) : D(addDays(e, 1).getUTCFullYear(), addDays(e, 1).getUTCMonth() + 1, 15);
        w = [alt, addDays(z, 28), monthEndPlus(z, 1), addDays(z, 14), monthEndPlus(z, 0), monthEndPlus(z, 2), fristMonate(f.jahre + 10) ? monthEndPlus(z, fristMonate(f.jahre + 10)) : null];
        if (f.typ === "an" && f.jahre >= 2) w.unshift(monthEndPlus(z, fristMonate(f.jahre)));
      } else {
        w = [monthEndPlus(z, f.mon - 1), monthEndPlus(z, f.mon + 1), addMonthsClamp(z, f.mon), grundEnde(z), D(monthEndPlus(z, f.mon).getUTCFullYear(), monthEndPlus(z, f.mon).getUTCMonth() + 1, 15), monthEndPlus(z, f.mon + 2)];
      }
      w = w.filter(function (x) { return x; }).map(fmtD);
      w = w.slice(0, 2).concat(shuffle(rnd, w.slice(2)));
      var m = mc(rnd, right, w);
      return {
        type: "mc", difficulty: 3, points: 4, context: kuendCtx(f),
        question: "Zu welchem Datum endet das Arbeitsverhältnis frühestens?",
        options: m.options, correct: m.correct,
        solution: "<p>Betriebszugehörigkeit bei Zugang: " + f.jahre + " volle Jahre.</p><p>" + f.regel + "</p>" + (f.typ === "probe" ? "" : FRISTEN_TAB) + "<p>Das Arbeitsverhältnis endet am <b>" + right + "</b>.</p>",
        explanation: "Maßgeblich ist der Zugang der Kündigung (nicht das Datum des Schreibens). Die Kündigung muss schriftlich erfolgen (§ 623 BGB, elektronische Form ausgeschlossen)."
      };
    }
  });

  G({
    id: "gen-ar-arbzg", part: "WISO", topic: "wiso-arbeitsrecht", title: "Arbeitszeitgesetz: Pausen, Ruhezeit, Höchstarbeitszeit",
    generate: function (rnd) {
      var mode = pick(rnd, ["pause", "ruhe", "check"]);
      function req(w) { return w > 540 ? 45 : w > 360 ? 30 : 0; }
      var regel = "<p>§ 4 ArbZG: bei mehr als 6 bis 9 Stunden Arbeitszeit mindestens 30 Minuten Pause, bei mehr als 9 Stunden mindestens 45 Minuten (aufteilbar in Abschnitte von mindestens 15 Minuten). § 3 ArbZG: werktäglich höchstens 8 Stunden, Verlängerung auf bis zu 10 Stunden, wenn innerhalb von 6 Monaten bzw. 24 Wochen im Durchschnitt 8 Stunden nicht überschritten werden. § 5 ArbZG: mindestens 11 Stunden ununterbrochene Ruhezeit nach Ende der täglichen Arbeitszeit.</p>";
      if (mode === "pause") {
        var w = int(rnd, 20, 40) * 15;
        var r = req(w);
        return {
          type: "numeric", difficulty: 1, points: 2,
          question: "Eine Mitarbeiterin plant eine tägliche Arbeitszeit von <b>" + Math.floor(w / 60) + " Stunden " + (w % 60) + " Minuten</b> (reine Arbeitszeit ohne Pausen). Wie viele Minuten Ruhepause muss sie nach dem Arbeitszeitgesetz mindestens einlegen?",
          answer: r, tolerance: 0, unit: "Minuten",
          solution: regel + "<p>" + Math.floor(w / 60) + " h " + (w % 60) + " min " + (w > 540 ? "&gt; 9 h" : w > 360 ? "&gt; 6 h und ≤ 9 h" : "≤ 6 h") + " → <b>" + r + " Minuten</b></p>"
        };
      }
      if (mode === "ruhe") {
        var end = int(rnd, 72, 94) * 15;
        var right = hhmm(end + 660);
        var m = mc(rnd, right, shuffle(rnd, [hhmm(end + 600), hhmm(end + 720), hhmm(end + 480), hhmm(end + 540), hhmm(end + 690)]));
        return {
          type: "mc", difficulty: 1, points: 2,
          question: "Ein Entwickler beendet wegen eines Deployments seine Arbeit erst um <b>" + hhmm(end) + "</b>. Wann darf er am nächsten Tag frühestens wieder mit der Arbeit beginnen (keine Ausnahmeregelung)?",
          options: m.options, correct: m.correct,
          solution: regel + "<p>" + hhmm(end) + " + 11 Stunden Ruhezeit = <b>" + right + "</b></p>"
        };
      }
      var start = int(rnd, 26, 40) * 15, pause = pick(rnd, [0, 15, 30, 30, 45, 60]), anw = int(rnd, 24, 46) * 15;
      var work = anw - pause, short = pause < req(work), long = work > 600;
      var right2 = short && long ? "Unzulässig: Pause zu kurz und Höchstarbeitszeit von 10 Stunden überschritten" : short ? "Unzulässig: Die Ruhepause ist zu kurz" : long ? "Unzulässig: Die Höchstarbeitszeit von 10 Stunden ist überschritten" : "Zulässig";
      var all = ["Zulässig", "Unzulässig: Die Ruhepause ist zu kurz", "Unzulässig: Die Höchstarbeitszeit von 10 Stunden ist überschritten", "Unzulässig: Pause zu kurz und Höchstarbeitszeit von 10 Stunden überschritten"];
      var m2 = mc(rnd, right2, all);
      return {
        type: "mc", difficulty: 2, points: 3,
        question: "Ein volljähriger Mitarbeiter ist an einem Tag von " + hhmm(start) + " bis " + hhmm(start + anw) + " im Betrieb und macht insgesamt <b>" + pause + " Minuten</b> Pause (in einem Block). Beurteilen Sie diesen Arbeitstag nach dem Arbeitszeitgesetz.",
        options: m2.options, correct: m2.correct,
        solution: regel + "<p>Anwesenheit: " + Math.floor(anw / 60) + " h " + (anw % 60) + " min, abzüglich Pause " + pause + " min = Arbeitszeit " + Math.floor(work / 60) + " h " + (work % 60) + " min.<br>Erforderliche Pause: " + req(work) + " min → " + (short ? "zu kurz" : "ausreichend") + "<br>Arbeitszeit " + (long ? "&gt; 10 h → unzulässig" : "≤ 10 h → zulässig") + "</p><p>→ <b>" + right2 + "</b></p>"
      };
    }
  });
})();
