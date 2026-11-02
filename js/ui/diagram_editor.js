/* AP2-Lerntool – einfacher SVG-Diagrammeditor (UML-Klassen, ERM, Aktivität, Anwendungsfall).
 * new App.DiagramEditor(container, {kind, model, readOnly, onChange}) · ed.destroy()
 * App.DiagramEditor.svg(model, kind, marks) → statisches SVG als String.
 * Modell wird in-place geändert: {nodes: [{id, type, name, attrs, methods, stereo, x, y}], edges: [{id, from, to, type, m1, m2, label}]} */
(function (root) {
  "use strict";
  var App = (root.App = root.App || {});

  var ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  function esc(s) {
    if (App.util && App.util.esc) return App.util.esc(s);
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return ESC[c]; });
  }
  function str(v) { return v == null ? "" : String(v); }
  function Fm() { return App.formats || {}; }
  function cfgOf(kind) {
    var D = Fm().DIAGRAM || {};
    return D[kind] || D["class"] || { nodes: ["class"], edges: ["assoc"] };
  }
  function nodeLabel(t) { return (Fm().NODE_LABEL || {})[t] || t; }
  function edgeLabel(t) { return (Fm().EDGE_LABEL || {})[t] || t; }

  var W0 = 900, H0 = 600, LH = 18;
  var DASHED = { impl: 1, dep: 1, include: 1, extend: 1 };
  var HAS_MULT = { assoc: 1, aggr: 1, comp: 1, dep: 1, rel: 1 };
  var DIR_HINT = {
    aggr: "Von = Ganzes (Raute), Nach = Teil",
    comp: "Von = Ganzes (gefüllte Raute), Nach = Teil",
    inherit: "Von = Unterklasse/Spezialisierung, Nach = Oberklasse",
    impl: "Von = implementierende Klasse, Nach = Interface",
    dep: "Von = abhängige Klasse, Nach = benutzte Klasse",
    flow: "Von = vorheriger Schritt, Nach = nächster Schritt",
    include: "Von = Basis-Anwendungsfall, Nach = eingebundener Anwendungsfall",
    extend: "Von = erweiternder Anwendungsfall, Nach = Basis-Anwendungsfall",
  };

  /* ===================================================== Geometrie */

  /** grobe Textbreite in px (ohne DOM, damit auch statisch nutzbar) */
  function tw(s, fs, bold) {
    s = str(s);
    var w = 0;
    for (var i = 0; i < s.length; i++) {
      var c = s.charAt(i);
      if ("iljtfI.,:;|'!()[] ".indexOf(c) >= 0) w += 0.32;
      else if ("mwMW@%".indexOf(c) >= 0) w += 0.86;
      else if (c >= "A" && c <= "Z") w += 0.68;
      else if ("«»_".indexOf(c) >= 0) w += 0.6;
      else w += 0.56;
    }
    return w * (fs || 13) * (bold ? 1.07 : 1);
  }
  function lines(arr) { return (arr || []).map(str).filter(function (s) { return s.trim(); }); }
  function stereoText(n) { return n.stereo === "interface" ? "«interface»" : n.stereo === "abstract" ? "«abstract»" : ""; }

  /** Primärschlüssel-Anzeige im ERM: "#Nr" → {pk:true, text:"Nr"} */
  function ermAttr(s) {
    s = str(s).trim();
    if (/^#/.test(s)) return { pk: true, text: s.replace(/^#\s*/, "") };
    if (/^pk\s+/i.test(s)) return { pk: true, text: s.replace(/^pk\s+/i, "") };
    if (/^_.+_$/.test(s)) return { pk: true, text: s.replace(/^_|_$/g, "") };
    return { pk: false, text: s };
  }

  function nodeSize(n) {
    var name = str(n.name), w, h;
    switch (n.type) {
      case "class": {
        var st = stereoText(n), at = lines(n.attrs), me = lines(n.methods);
        w = Math.max(150, tw(name, 14, true) + 28, tw(st, 11) + 24);
        at.concat(me).forEach(function (s) { w = Math.max(w, tw(s, 12.5) + 20); });
        var head = 30 + (st ? 14 : 0);
        h = head + Math.max(at.length * LH + 8, 14) + Math.max(me.length * LH + 8, 14);
        return { w: Math.ceil(w), h: h, head: head, a: at, m: me, st: st };
      }
      case "entity": {
        var ea = lines(n.attrs);
        w = Math.max(130, tw(name, 14, true) + 28);
        ea.forEach(function (s) { w = Math.max(w, tw(ermAttr(s).text, 12.5) + 24); });
        h = 32 + (ea.length ? ea.length * LH + 10 : 8);
        return { w: Math.ceil(w), h: h, head: 32, a: ea };
      }
      case "action": return { w: Math.ceil(Math.max(110, tw(name, 13) + 30)), h: 44 };
      case "decision": return { w: 44, h: 44 };
      case "start": return { w: 26, h: 26 };
      case "end": return { w: 30, h: 30 };
      case "actor": return { w: 40, h: 70 };
      case "usecase": return { w: Math.ceil(Math.max(130, tw(name, 13) * 1.15 + 44)), h: 56 };
      default: return { w: Math.ceil(Math.max(110, tw(name, 13) + 30)), h: 44 };
    }
  }
  /** Ausdehnung inkl. Beschriftungen außerhalb der Form */
  function nodeExtent(n, p, sz) {
    var x0 = p.x, y0 = p.y, x1 = p.x + sz.w, y1 = p.y + sz.h;
    if (n.type === "decision" && n.name) x1 += tw(n.name, 12.5) + 10;
    if (n.type === "actor") { var lw = tw(n.name, 13) / 2 + 4; x0 = Math.min(x0, p.x + 20 - lw); x1 = Math.max(x1, p.x + 20 + lw); y1 += 22; }
    return { x0: x0, y0: y0, x1: x1, y1: y1 };
  }

  /** Punkt auf dem Rand des Knotens in Richtung (tx, ty) */
  function boundary(n, p, sz, tx, ty) {
    var cx = p.x + sz.w / 2, cy = p.y + sz.h / 2, dx = tx - cx, dy = ty - cy;
    if (!dx && !dy) return { x: cx, y: cy };
    var a = sz.w / 2, b = sz.h / 2, t;
    if (n.type === "usecase" || n.type === "start" || n.type === "end") t = 1 / Math.sqrt((dx * dx) / (a * a) + (dy * dy) / (b * b));
    else if (n.type === "decision") t = 1 / (Math.abs(dx) / a + Math.abs(dy) / b);
    else t = Math.min(dx ? a / Math.abs(dx) : Infinity, dy ? b / Math.abs(dy) : Infinity);
    return { x: cx + dx * t, y: cy + dy * t };
  }

  function f1(v) { return Math.round(v * 10) / 10; }
  function pts(arr) { return arr.map(function (q) { return f1(q.x) + "," + f1(q.y); }).join(" "); }
  function txt(x, y, s, cls, extra) {
    return '<text x="' + f1(x) + '" y="' + f1(y) + '" class="' + cls + '"' + (extra || "") + ">" + esc(s) + "</text>";
  }

  /* ============================================================ Zeichnen */

  function nodeSvg(n, p, sz, cls, editor) {
    var w = sz.w, h = sz.h, o = [], name = str(n.name);
    var shape = '" class="dg-shape"';
    switch (n.type) {
      case "class": {
        o.push('<rect x="0" y="0" width="' + w + '" height="' + h + shape + ' rx="2"/>');
        var y = 20;
        if (sz.st) { o.push(txt(w / 2, 16, sz.st, "dg-t dg-stereo", ' text-anchor="middle"')); y = 32; }
        o.push(txt(w / 2, y, name, "dg-t dg-name" + (n.stereo === "abstract" ? " dg-italic" : ""), ' text-anchor="middle"'));
        var y1 = sz.head, y2 = y1 + Math.max(sz.a.length * LH + 8, 14);
        o.push('<line x1="0" y1="' + y1 + '" x2="' + w + '" y2="' + y1 + '" class="dg-sep"/>');
        o.push('<line x1="0" y1="' + y2 + '" x2="' + w + '" y2="' + y2 + '" class="dg-sep"/>');
        sz.a.forEach(function (s, i) { o.push(txt(10, y1 + 17 + i * LH, s, "dg-t dg-mem")); });
        sz.m.forEach(function (s, i) { o.push(txt(10, y2 + 17 + i * LH, s, "dg-t dg-mem")); });
        break;
      }
      case "entity": {
        o.push('<rect x="0" y="0" width="' + w + '" height="' + h + shape + "/>");
        o.push(txt(w / 2, 21, name, "dg-t dg-name", ' text-anchor="middle"'));
        if (sz.a.length) {
          o.push('<line x1="0" y1="32" x2="' + w + '" y2="32" class="dg-sep"/>');
          sz.a.forEach(function (s, i) {
            var a = ermAttr(s);
            o.push(txt(12, 32 + 18 + i * LH, a.text, "dg-t dg-mem" + (a.pk ? " dg-pk" : ""), a.pk ? ' text-decoration="underline"' : ""));
          });
        }
        break;
      }
      case "action":
        o.push('<rect x="0" y="0" width="' + w + '" height="' + h + shape + ' rx="14"/>');
        o.push(txt(w / 2, h / 2 + 4.5, name, "dg-t", ' text-anchor="middle"'));
        break;
      case "decision":
        o.push('<polygon points="' + pts([{ x: w / 2, y: 0 }, { x: w, y: h / 2 }, { x: w / 2, y: h }, { x: 0, y: h / 2 }]) + shape + "/>");
        if (name) o.push(txt(w + 8, h / 2 - 8, name, "dg-t dg-side"));
        break;
      case "start":
        o.push('<circle cx="13" cy="13" r="12" class="dg-shape dg-solid"/>');
        break;
      case "end":
        o.push('<circle cx="15" cy="15" r="13" class="dg-shape"/><circle cx="15" cy="15" r="8" class="dg-shape dg-solid"/>');
        break;
      case "actor":
        if (editor) o.push('<rect x="-6" y="-4" width="52" height="98" class="dg-hitbox"/>');
        o.push('<circle cx="20" cy="10" r="9" class="dg-shape"/>' +
          '<path d="M20 19 V44 M4 28 H36 M20 44 L6 68 M20 44 L34 68" class="dg-shape dg-stroke"/>');
        o.push(txt(20, 88, name, "dg-t", ' text-anchor="middle"'));
        break;
      case "usecase":
        o.push('<ellipse cx="' + w / 2 + '" cy="' + h / 2 + '" rx="' + w / 2 + '" ry="' + h / 2 + shape + "/>");
        o.push(txt(w / 2, h / 2 + 4.5, name, "dg-t", ' text-anchor="middle"'));
        break;
      default:
        o.push('<rect x="0" y="0" width="' + w + '" height="' + h + shape + "/>");
        o.push(txt(w / 2, h / 2 + 4.5, name, "dg-t", ' text-anchor="middle"'));
    }
    return '<g class="dg-node dg-n-' + esc(n.type) + (cls ? " " + cls : "") + '" data-nid="' + esc(n.id) +
      '" transform="translate(' + f1(p.x) + "," + f1(p.y) + ')">' + o.join("") + "</g>";
  }

  function edgeSvg(e, A, B, cls, editor) {
    var o = [], type = e.type || "assoc";
    var c1 = { x: A.p.x + A.sz.w / 2, y: A.p.y + A.sz.h / 2 }, c2 = { x: B.p.x + B.sz.w / 2, y: B.p.y + B.sz.h / 2 };
    var dash = DASHED[type] ? ' stroke-dasharray="7 5"' : "";
    var open = '<g class="dg-edge dg-e-' + esc(type) + (cls ? " " + cls : "") + '" data-eid="' + esc(e.id) + '">';
    if (A.n === B.n) { // Schleife
      var sx = A.p.x + A.sz.w * 0.75, sy = A.p.y, ex = A.p.x + A.sz.w, ey = A.p.y + A.sz.h * 0.25;
      var d = "M" + f1(sx) + " " + f1(sy) + " C" + f1(sx) + " " + f1(sy - 45) + " " + f1(ex + 45) + " " + f1(ey) + " " + f1(ex) + " " + f1(ey);
      if (editor) o.push('<path d="' + d + '" class="dg-hit"/>');
      o.push('<path d="' + d + '" class="dg-line"' + dash + "/>");
      if (e.label) o.push(txt(ex + 26, sy - 18, e.label, "dg-t dg-lbl"));
      return open + o.join("") + "</g>";
    }
    var p1 = boundary(A.n, A.p, A.sz, c2.x, c2.y), p2 = boundary(B.n, B.p, B.sz, c1.x, c1.y);
    var dx = p2.x - p1.x, dy = p2.y - p1.y, L = Math.sqrt(dx * dx + dy * dy) || 1;
    var ux = dx / L, uy = dy / L, nx = -uy, ny = ux;
    if (ny > 0.01 || (Math.abs(ny) <= 0.01 && nx < 0)) { nx = -nx; ny = -ny; } // Beschriftung nach oben/rechts
    function at(base, along, side) { return { x: base.x + ux * along + nx * side, y: base.y + uy * along + ny * side }; }
    var s = p1, t = p2, deco = [];
    if (type === "aggr" || type === "comp") {
      deco.push('<polygon points="' + pts([p1, at(p1, 11, 6), at(p1, 22, 0), at(p1, 11, -6)]) + '" class="dg-deco ' + (type === "comp" ? "dg-solid" : "dg-hollow") + '"/>');
      s = at(p1, 22, 0);
    }
    if (type === "inherit" || type === "impl") {
      deco.push('<polygon points="' + pts([p2, at(p2, -15, 8), at(p2, -15, -8)]) + '" class="dg-deco dg-hollow"/>');
      t = at(p2, -15, 0);
    }
    if (type === "dep" || type === "flow" || type === "include" || type === "extend") {
      deco.push('<polyline points="' + pts([at(p2, -12, 6), p2, at(p2, -12, -6)]) + '" class="dg-deco dg-open"/>');
    }
    var line = 'x1="' + f1(s.x) + '" y1="' + f1(s.y) + '" x2="' + f1(t.x) + '" y2="' + f1(t.y) + '"';
    if (editor) o.push("<line " + line + ' class="dg-hit"/>');
    o.push("<line " + line + ' class="dg-line"' + dash + "/>");
    o.push(deco.join(""));
    var mid = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
    var anchor = ' text-anchor="middle"';
    if (type === "rel") {
      var lw = e.label ? Math.max(40, tw(e.label, 12.5) + 30) : 26, lh = e.label ? 28 : 18;
      o.push('<polygon points="' + pts([{ x: mid.x, y: mid.y - lh / 2 }, { x: mid.x + lw / 2, y: mid.y }, { x: mid.x, y: mid.y + lh / 2 }, { x: mid.x - lw / 2, y: mid.y }]) + '" class="dg-deco dg-hollow"/>');
      if (e.label) o.push(txt(mid.x, mid.y + 4.5, e.label, "dg-t dg-rel", anchor));
    } else {
      var lab = [];
      if (type === "include" || type === "extend") lab.push("«" + type + "»");
      if (e.label) lab.push(e.label);
      lab.forEach(function (s2, i) {
        var q = at(mid, 0, i === 0 ? 11 : -11);
        o.push(txt(q.x, q.y + 4, s2, "dg-t dg-lbl", anchor));
      });
    }
    var off1 = type === "aggr" || type === "comp" ? 32 : 16, off2 = type === "inherit" || type === "impl" ? 26 : 18;
    var len = L;
    if (e.m1) { var q1 = at(p1, Math.min(off1, len / 3), 12); o.push(txt(q1.x, q1.y + 4, e.m1, "dg-t dg-mult", anchor)); }
    if (e.m2) { var q2 = at(p2, -Math.min(off2, len / 3), 12); o.push(txt(q2.x, q2.y + 4, e.m2, "dg-t dg-mult", anchor)); }
    return open + o.join("") + "</g>";
  }

  /* ============================================================ Layout */

  function hasPos(n) { return isFinite(n.x) && isFinite(n.y) && n.x !== null && n.y !== null && n.x !== "" && n.y !== ""; }

  /** Positionen für alle Knoten (vorhandene bleiben, fehlende werden angeordnet) */
  function layout(model, kind) {
    var nodes = model.nodes || [], pos = {}, maxB = -Infinity, todo = [];
    nodes.forEach(function (n) {
      if (hasPos(n)) {
        pos[n.id] = { x: Number(n.x), y: Number(n.y) };
        maxB = Math.max(maxB, nodeExtent(n, pos[n.id], nodeSize(n)).y1);
      } else todo.push(n);
    });
    if (!todo.length) return pos;
    var y0 = maxB > -Infinity ? Math.round(maxB + 50) : 30;
    if (kind === "activity") {
      var depth = {}, byId = {}, q = [];
      nodes.forEach(function (n) { byId[n.id] = n; });
      var incoming = {};
      (model.edges || []).forEach(function (e) { incoming[e.to] = 1; });
      nodes.forEach(function (n) { if (n.type === "start" || (!incoming[n.id] && n.type !== "end")) { if (depth[n.id] == null) { depth[n.id] = 0; q.push(n.id); } } });
      while (q.length) {
        var id = q.shift();
        (model.edges || []).forEach(function (e) {
          if (e.from === id && byId[e.to] && depth[e.to] == null) { depth[e.to] = depth[id] + 1; q.push(e.to); }
        });
      }
      var maxD = 0;
      Object.keys(depth).forEach(function (k) { maxD = Math.max(maxD, depth[k]); });
      var rows = [];
      todo.forEach(function (n) {
        var d = depth[n.id] != null ? depth[n.id] : ++maxD;
        (rows[d] = rows[d] || []).push(n);
      });
      var y = y0;
      rows.forEach(function (row) {
        if (!row) return;
        var sizes = row.map(nodeSize), tot = 0, rh = 0;
        sizes.forEach(function (sz, i) { tot += sz.w + (i ? 90 : 0); rh = Math.max(rh, sz.h); });
        var x = Math.max(30, Math.round(W0 / 2 - tot / 2));
        row.forEach(function (n, i) {
          pos[n.id] = { x: x, y: Math.round(y + (rh - sizes[i].h) / 2) };
          x += sizes[i].w + 90;
        });
        y += rh + 46;
      });
      return pos;
    }
    var x0 = 30, list = todo;
    if (kind === "usecase") {
      // Akteure links, Anwendungsfälle spaltenweise daneben (wie in der Systemgrenze)
      var actors = todo.filter(function (n) { return n.type === "actor"; });
      var ucs = todo.filter(function (n) { return n.type !== "actor"; });
      var perCol = Math.max(4, Math.ceil(ucs.length / 2)), colX = actors.length ? 250 : 40;
      ucs.forEach(function (n, i) {
        var col = Math.floor(i / perCol), row = i % perCol;
        pos[n.id] = { x: colX + col * 420 + (row % 2) * 150, y: y0 + row * 80 };
      });
      var ucH = Math.min(ucs.length, perCol) * 80, aStep = 130;
      var ay = y0 + Math.max(0, (ucH - actors.length * aStep) / 2);
      actors.forEach(function (n) { pos[n.id] = { x: 40, y: Math.round(ay) }; ay += aStep; });
      return pos;
    }
    var gap = 140, x = x0, yy = y0, rowH = 0;
    list.forEach(function (n) {
      var sz = nodeSize(n);
      if (x > x0 && x + sz.w > W0 - 20) { x = x0; yy += rowH + 100; rowH = 0; }
      pos[n.id] = { x: x, y: yy };
      x += sz.w + gap;
      rowH = Math.max(rowH, sz.h);
    });
    return pos;
  }

  function contentBox(model, pos) {
    var b = null;
    (model.nodes || []).forEach(function (n) {
      var p = pos[n.id];
      if (!p) return;
      var ex = nodeExtent(n, p, nodeSize(n));
      if (!b) b = { x0: ex.x0, y0: ex.y0, x1: ex.x1, y1: ex.y1 };
      else { b.x0 = Math.min(b.x0, ex.x0); b.y0 = Math.min(b.y0, ex.y0); b.x1 = Math.max(b.x1, ex.x1); b.y1 = Math.max(b.y1, ex.y1); }
    });
    return b;
  }

  /** gesamter SVG-Inhalt; o: {marks, sel:{t,id}, src, editor} */
  function drawAll(model, kind, pos, o) {
    o = o || {};
    var marks = o.marks || {}, nm = marks.nodes || {}, em = marks.edges || {};
    var info = {}, out = [];
    (model.nodes || []).forEach(function (n) { if (pos[n.id]) info[n.id] = { n: n, p: pos[n.id], sz: nodeSize(n) }; });
    (model.edges || []).forEach(function (e) {
      var A = info[e.from], B = info[e.to];
      if (!A || !B) return;
      var cls = [];
      if (em[e.id]) cls.push("dg-mk-" + em[e.id]);
      if (o.sel && o.sel.t === "e" && o.sel.id === e.id) cls.push("dg-selected");
      out.push(edgeSvg(e, A, B, cls.join(" "), o.editor));
    });
    (model.nodes || []).forEach(function (n) {
      var I = info[n.id];
      if (!I) return;
      var cls = [];
      if (nm[n.id]) cls.push("dg-mk-" + nm[n.id]);
      if (o.sel && o.sel.t === "n" && o.sel.id === n.id) cls.push("dg-selected");
      if (o.src === n.id) cls.push("dg-source");
      out.push(nodeSvg(n, I.p, I.sz, cls.join(" "), o.editor));
    });
    return out.join("");
  }

  /* ===================================================== statisches SVG */

  function staticSvg(model, kind, marks) {
    model = model || { nodes: [], edges: [] };
    var pos = layout(model, kind);
    var b = contentBox(model, pos) || { x0: 0, y0: 0, x1: 300, y1: 120 };
    var pad = 34, x = Math.floor(b.x0 - pad), y = Math.floor(b.y0 - pad);
    var w = Math.ceil(b.x1 - b.x0 + 2 * pad), h = Math.ceil(b.y1 - b.y0 + 2 * pad);
    var label = (cfgOf(kind).label || "Diagramm");
    return '<svg xmlns="http://www.w3.org/2000/svg" class="dg-svg dg-static" viewBox="' + x + " " + y + " " + w + " " + h +
      '" style="max-width:' + Math.round(w * 1.1) + 'px" role="img" aria-label="' + esc(label) + '">' +
      drawAll(model, kind, pos, { marks: marks }) + "</svg>";
  }

  /* ============================================================ Editor */

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function optList(values, labels, cur) {
    return values.map(function (v, i) {
      return '<option value="' + esc(v) + '"' + (v === cur ? " selected" : "") + ">" + esc(labels[i]) + "</option>";
    }).join("");
  }
  function isField(t) {
    var tag = (t && t.tagName) || "";
    return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || (t && t.isContentEditable);
  }

  function DiagramEditor(container, opts) {
    opts = opts || {};
    this.c = container;
    this.kind = opts.kind || "class";
    this.cfg = cfgOf(this.kind);
    this.model = opts.model || { nodes: [], edges: [] };
    if (!Array.isArray(this.model.nodes)) this.model.nodes = [];
    if (!Array.isArray(this.model.edges)) this.model.edges = [];
    this.ro = !!opts.readOnly;
    this.marks = opts.marks || null;
    this.onChange = typeof opts.onChange === "function" ? opts.onChange : function () {};
    this.sel = null;
    this.connect = false;
    this.src = null;
    this.edgeType = this.cfg.edges[0];
    this.base = { x: 0, y: 0, w: W0, h: H0 };
    this.drag = null;
    this.raf = 0;
    this._ensureIds();
    var pos = layout(this.model, this.kind);
    this.model.nodes.forEach(function (n) { if (!hasPos(n) && pos[n.id]) { n.x = pos[n.id].x; n.y = pos[n.id].y; } });
    this._build();
  }

  var P = DiagramEditor.prototype;

  P._ensureIds = function () {
    var seen = {}, self = this;
    ["nodes", "edges"].forEach(function (k) {
      self.model[k].forEach(function (x) {
        if (x.id == null || x.id === "" || seen[k + ":" + x.id]) x.id = self._newId(k === "nodes" ? "n" : "e");
        seen[k + ":" + x.id] = 1;
      });
    });
  };
  P._newId = function (prefix) {
    var used = {}, max = 0;
    this.model.nodes.concat(this.model.edges).forEach(function (x) {
      used[x.id] = 1;
      var m = new RegExp("^" + prefix + "(\\d+)$").exec(str(x.id));
      if (m) max = Math.max(max, Number(m[1]));
    });
    var i = max + 1;
    while (used[prefix + i]) i++;
    return prefix + i;
  };
  P.node = function (id) { for (var i = 0; i < this.model.nodes.length; i++) if (this.model.nodes[i].id === id) return this.model.nodes[i]; return null; };
  P.edge = function (id) { for (var i = 0; i < this.model.edges.length; i++) if (this.model.edges[i].id === id) return this.model.edges[i]; return null; };
  P._name = function (id) {
    var n = this.node(id);
    if (!n) return "?";
    return str(n.name).trim() || nodeLabel(n.type) + " (" + n.id + ")";
  };
  P._emit = function () { try { this.onChange(this.model); } catch (err) { if (root.console) console.error(err); } };

  P._build = function () {
    var self = this, c = this.c;
    c.innerHTML = "";
    var root_ = (this.root = el("div", "dg" + (this.ro ? " dg-ro" : "")));
    root_.setAttribute("data-kind", this.kind);
    if (!this.ro) {
      var tb = el("div", "dg-toolbar");
      tb.setAttribute("role", "toolbar");
      tb.setAttribute("aria-label", "Diagramm-Werkzeuge");
      var add = this.cfg.nodes.map(function (t) {
        return '<button type="button" class="btn small" data-add="' + esc(t) + '" title="' + esc(nodeLabel(t)) + ' hinzufügen">+ ' + esc(nodeLabel(t)) + "</button>";
      }).join("");
      tb.innerHTML =
        '<div class="dg-group">' + add + "</div>" +
        '<div class="dg-group"><select class="input dg-etype" aria-label="Beziehungstyp für Verbinden">' +
        optList(this.cfg.edges, this.cfg.edges.map(edgeLabel), this.edgeType) + "</select>" +
        '<button type="button" class="btn small" data-act="connect" aria-pressed="false">Verbinden</button></div>' +
        '<div class="dg-group"><button type="button" class="btn small danger" data-act="del" disabled>Löschen</button>' +
        '<button type="button" class="btn small ghost" data-act="fit" aria-pressed="false" title="Zoom auf den Inhalt bzw. zurück zur ganzen Fläche">Ansicht einpassen</button></div>';
      root_.appendChild(tb);
      this.status = el("div", "dg-status small muted");
      this.status.setAttribute("aria-live", "polite");
      root_.appendChild(this.status);
    }
    var canvas = el("div", "dg-canvas");
    var svg = (this.svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg"));
    svg.setAttribute("class", "dg-svg" + (this.ro ? " dg-static-ro" : ""));
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", this.cfg.label || "Diagramm");
    if (!this.ro) svg.setAttribute("tabindex", "0");
    canvas.appendChild(svg);
    root_.appendChild(canvas);
    if (!this.ro) {
      this.panel = el("div", "dg-panel");
      root_.appendChild(this.panel);
      this.lists = el("div", "dg-lists");
      root_.appendChild(this.lists);
      this.addForm = el("form", "dg-addedge");
      this.addForm.setAttribute("aria-label", "Beziehung hinzufügen");
      root_.appendChild(this.addForm);
    }
    c.appendChild(root_);

    this.h = {};
    if (!this.ro) {
      this.h.click = function (ev) { self._onClick(ev); };
      this.h.input = function (ev) { self._onInput(ev); };
      this.h.change = function (ev) { self._onChangeEv(ev); };
      this.h.submit = function (ev) { ev.preventDefault(); self._addEdgeFromForm(); };
      this.h.key = function (ev) { self._onKey(ev); };
      this.h.down = function (ev) { self._onDown(ev); };
      this.h.move = function (ev) { self._onMove(ev); };
      this.h.up = function (ev) { self._onUp(ev); };
      root_.addEventListener("click", this.h.click);
      root_.addEventListener("input", this.h.input);
      root_.addEventListener("change", this.h.change);
      root_.addEventListener("submit", this.h.submit);
      root_.addEventListener("keydown", this.h.key);
      svg.addEventListener("pointerdown", this.h.down);
      svg.addEventListener("pointermove", this.h.move);
      svg.addEventListener("pointerup", this.h.up);
      svg.addEventListener("pointercancel", this.h.up);
    }
    this._renderSvg();
    if (!this.ro) { this._renderToolbar(); this._renderPanel(); this._renderLists(); this._renderAddForm(); }
  };

  P.destroy = function () {
    var r = this.root, s = this.svgEl, h = this.h || {};
    if (this.raf && root.cancelAnimationFrame) cancelAnimationFrame(this.raf);
    if (r && h.click) {
      r.removeEventListener("click", h.click);
      r.removeEventListener("input", h.input);
      r.removeEventListener("change", h.change);
      r.removeEventListener("submit", h.submit);
      r.removeEventListener("keydown", h.key);
      s.removeEventListener("pointerdown", h.down);
      s.removeEventListener("pointermove", h.move);
      s.removeEventListener("pointerup", h.up);
      s.removeEventListener("pointercancel", h.up);
    }
    if (r && r.parentNode) r.parentNode.removeChild(r);
    this.h = {};
    this.root = this.svgEl = null;
  };

  /* ---------------------------------------------------------- Rendering */

  P._pos = function () {
    var pos = {};
    this.model.nodes.forEach(function (n) { pos[n.id] = { x: Number(n.x) || 0, y: Number(n.y) || 0 }; });
    return pos;
  };
  P._viewBox = function (pos) {
    var b = contentBox(this.model, pos), B = this.base, pad = 30;
    if (!b) return { x: B.x, y: B.y, w: B.w, h: B.h };
    if (this.ro) return { x: Math.floor(b.x0 - pad), y: Math.floor(b.y0 - pad), w: Math.ceil(b.x1 - b.x0 + 2 * pad), h: Math.ceil(b.y1 - b.y0 + 2 * pad) };
    var x0 = Math.min(B.x, b.x0 - pad), y0 = Math.min(B.y, b.y0 - pad);
    var x1 = Math.max(B.x + B.w, b.x1 + pad), y1 = Math.max(B.y + B.h, b.y1 + pad);
    return { x: Math.floor(x0), y: Math.floor(y0), w: Math.ceil(x1 - x0), h: Math.ceil(y1 - y0) };
  };
  P._renderSvg = function () {
    var pos = this._pos();
    if (!this.drag) {
      this.vb = this._viewBox(pos);
      this.svgEl.setAttribute("viewBox", this.vb.x + " " + this.vb.y + " " + this.vb.w + " " + this.vb.h);
      if (this.fitted) this.svgEl.style.aspectRatio = this.vb.w + " / " + this.vb.h;
      else if (!this.ro) this.svgEl.style.aspectRatio = "";
      if (this.ro) { this.svgEl.style.aspectRatio = this.vb.w + " / " + this.vb.h; this.svgEl.style.maxWidth = Math.round(this.vb.w * 1.1) + "px"; }
    }
    this.svgEl.innerHTML = drawAll(this.model, this.kind, pos, {
      marks: this.marks, sel: this.sel, src: this.src, editor: !this.ro,
    });
    this.svgEl.classList.toggle("dg-connecting", !!this.connect);
  };
  P._renderToolbar = function () {
    var b = this.root.querySelector('[data-act="connect"]');
    b.classList.toggle("primary", this.connect);
    b.setAttribute("aria-pressed", this.connect ? "true" : "false");
    b.textContent = this.connect ? "Verbinden abbrechen" : "Verbinden";
    this.root.querySelector('[data-act="del"]').disabled = !this.sel;
    var msg = "";
    if (this.connect) {
      msg = this.src
        ? "Ziel antippen (Quelle: " + this._name(this.src) + ") – Esc bricht ab."
        : "Quelle antippen, dann Ziel – " + edgeLabel(this.edgeType) + ". Esc bricht ab.";
    } else if (!this.model.nodes.length) msg = "Noch leer – über die Schaltflächen oben Elemente hinzufügen.";
    else msg = "Elemente ziehen zum Verschieben, antippen zum Bearbeiten.";
    this.status.textContent = msg;
  };

  P._nodeOptions = function (cur) {
    var self = this;
    return this.model.nodes.map(function (n) {
      return '<option value="' + esc(n.id) + '"' + (n.id === cur ? " selected" : "") + ">" + esc(self._name(n.id)) + "</option>";
    }).join("");
  };

  P._renderPanel = function () {
    var p = this.panel, s = this.sel, h = [];
    if (!s) {
      p.innerHTML = '<p class="small muted dg-empty">Kein Element ausgewählt. Element im Diagramm oder in der Liste unten antippen.</p>';
      return;
    }
    if (s.t === "n") {
      var n = this.node(s.id);
      h.push('<div class="dg-ph"><strong>' + esc(nodeLabel(n.type)) + "</strong>" +
        '<button type="button" class="btn small danger" data-act="del">Löschen</button></div>');
      if (n.type === "start" || n.type === "end") {
        h.push('<p class="small muted">' + esc(nodeLabel(n.type)) + " – keine weiteren Eigenschaften.</p>");
      } else {
        var nl = n.type === "decision" ? "Bedingung/Frage (optional)" : "Name";
        h.push('<label>' + nl + '<input class="input" data-f="name" value="' + esc(n.name) + '" autocomplete="off" spellcheck="false"></label>');
      }
      if (n.type === "class") {
        h.push('<label>Stereotyp<select class="input" data-f="stereo">' +
          optList(["", "abstract", "interface"], ["– keiner –", "«abstract» (abstrakte Klasse)", "«interface»"], n.stereo || "") + "</select></label>");
      }
      if (n.type === "class" || n.type === "entity") {
        h.push('<label>Attribute (eine pro Zeile)<textarea class="input dg-ta" rows="4" data-f="attrs" spellcheck="false" placeholder="' +
          (n.type === "class" ? "- name: String" : "#KundenNr&#10;Name") + '">' + esc(lines(n.attrs).join("\n")) + "</textarea></label>");
      }
      if (n.type === "class") {
        h.push('<label>Methoden (eine pro Zeile)<textarea class="input dg-ta" rows="3" data-f="methods" spellcheck="false" placeholder="+ methode(): void">' +
          esc(lines(n.methods).join("\n")) + "</textarea></label>");
        h.push('<p class="small muted dg-hint">Notation: <code>- name: String</code>, <code>+ methode(param: int): void</code>. Sichtbarkeit: <code>+</code> public, <code>-</code> private, <code>#</code> protected, <code>~</code> package.</p>');
      }
      if (n.type === "entity") h.push('<p class="small muted dg-hint">Primärschlüssel mit <code>#</code> davor, z. B. <code>#KundenNr</code> (wird unterstrichen). Fremdschlüssel normal angeben.</p>');
      if (n.type === "decision") h.push('<p class="small muted dg-hint">Bedingungen stehen an den ausgehenden Kanten, z. B. <code>[ja]</code> / <code>[nein]</code>.</p>');
    } else {
      var e = this.edge(s.id), t = e.type;
      h.push('<div class="dg-ph"><strong>Beziehung</strong>' +
        '<button type="button" class="btn small danger" data-act="del">Löschen</button></div>');
      h.push('<div class="dg-row"><label>Typ<select class="input" data-f="type">' + optList(this.cfg.edges, this.cfg.edges.map(edgeLabel), t) + "</select></label></div>");
      h.push('<div class="dg-row"><label>Von<select class="input" data-f="from">' + this._nodeOptions(e.from) + "</select></label>" +
        '<label>Nach<select class="input" data-f="to">' + this._nodeOptions(e.to) + "</select></label>" +
        '<button type="button" class="btn small dg-rev" data-act="reverse" title="Von und Nach tauschen">⇄ Richtung umkehren</button></div>');
      if (DIR_HINT[t]) h.push('<p class="small muted dg-hint">' + esc(DIR_HINT[t]) + ".</p>");
      if (HAS_MULT[t] || e.m1 || e.m2) {
        var mt = this.kind === "erm" ? "Kardinalität" : "Multiplizität";
        h.push('<div class="dg-row"><label>' + mt + ' bei „Von“<input class="input" data-f="m1" value="' + esc(e.m1) + '" placeholder="z. B. 1, 0..*, n" autocomplete="off"></label>' +
          '<label>' + mt + ' bei „Nach“<input class="input" data-f="m2" value="' + esc(e.m2) + '" placeholder="z. B. 1, 0..*, n" autocomplete="off"></label></div>');
      }
      h.push('<label>' + (t === "flow" ? "Bedingung (Guard)" : "Beschriftung") + '<input class="input" data-f="label" value="' + esc(e.label) +
        '" placeholder="' + esc(this._labelPh(t)) + '" autocomplete="off"></label>');
    }
    p.innerHTML = h.join("");
  };
  P._labelPh = function (t) {
    if (t === "flow") return "[Bedingung], z. B. [ja]";
    if (t === "rel") return "Beziehungsname, z. B. bestellt";
    if (t === "include" || t === "extend" || t === "inherit" || t === "impl") return "optional";
    return "Beziehungsname (optional)";
  };

  P._edgeText = function (e) {
    var dir = (Fm().DIRECTED || {})[e.type] ? " → " : " — ";
    var m = e.m1 || e.m2 ? " (" + (e.m1 || "?") + " : " + (e.m2 || "?") + ")" : "";
    return this._name(e.from) + dir + this._name(e.to) + " · " + edgeLabel(e.type) + (e.label ? " „" + e.label + "“" : "") + m;
  };
  P._renderLists = function () {
    var self = this, s = this.sel;
    function li(t, id, text) {
      var on = s && s.t === t && s.id === id;
      return '<li><button type="button" class="dg-item' + (on ? " on" : "") + '" data-st="' + t + '" data-sid="' + esc(id) + '"' +
        (on ? ' aria-current="true"' : "") + ">" + esc(text) + "</button></li>";
    }
    var nodes = this.model.nodes.map(function (n) {
      return li("n", n.id, (str(n.name).trim() || "(ohne Namen)") + " · " + nodeLabel(n.type));
    }).join("");
    var edges = this.model.edges.map(function (e) { return li("e", e.id, self._edgeText(e)); }).join("");
    this.lists.innerHTML =
      '<div><h4>Elemente (' + this.model.nodes.length + ")</h4>" + (nodes ? '<ul class="dg-list">' + nodes + "</ul>" : '<p class="small muted">keine</p>') + "</div>" +
      '<div><h4>Beziehungen (' + this.model.edges.length + ")</h4>" + (edges ? '<ul class="dg-list">' + edges + "</ul>" : '<p class="small muted">keine</p>') + "</div>";
  };
  P._renderAddForm = function () {
    var f = this.addForm, old = {};
    ["from", "to", "type"].forEach(function (k) { var x = f.querySelector('[name="' + k + '"]'); if (x) old[k] = x.value; });
    var ids = this.model.nodes.map(function (n) { return n.id; });
    var fr = ids.indexOf(old.from) >= 0 ? old.from : ids[0];
    var to = ids.indexOf(old.to) >= 0 ? old.to : ids[1] || ids[0];
    var ty = this.cfg.edges.indexOf(old.type) >= 0 ? old.type : this.cfg.edges[0];
    var dis = ids.length ? "" : " disabled";
    f.innerHTML = '<span class="dg-ftitle">Beziehung hinzufügen:</span>' +
      '<label>Von<select class="input" name="from"' + dis + ">" + this._nodeOptions(fr) + "</select></label>" +
      '<label>Nach<select class="input" name="to"' + dis + ">" + this._nodeOptions(to) + "</select></label>" +
      '<label>Typ<select class="input" name="type">' + optList(this.cfg.edges, this.cfg.edges.map(edgeLabel), ty) + "</select></label>" +
      '<button type="submit" class="btn small primary"' + dis + ">Hinzufügen</button>";
  };
  P._refresh = function (panel) {
    this._renderSvg();
    this._renderToolbar();
    if (panel) this._renderPanel();
    this._renderLists();
    this._renderAddForm();
  };

  /* ------------------------------------------------------------ Aktionen */

  P.select = function (t, id) {
    var same = this.sel && t && this.sel.t === t && this.sel.id === id;
    this.sel = t ? { t: t, id: id } : null;
    this._renderSvg();
    this._renderToolbar();
    if (!same) this._renderPanel();
    this._renderLists();
  };

  P._freeSpot = function (sz) {
    var pos = this._pos(), boxes = [];
    this.model.nodes.forEach(function (n) {
      var ex = nodeExtent(n, pos[n.id], nodeSize(n));
      boxes.push({ x0: ex.x0 - 30, y0: ex.y0 - 30, x1: ex.x1 + 30, y1: ex.y1 + 30 });
    });
    var maxX = Math.max(W0, this.vb ? this.vb.x + this.vb.w : W0) - 20;
    for (var y = 30; y < 4000; y += 20) {
      for (var x = 30; x + sz.w <= maxX || x === 30; x += 20) {
        var free = boxes.every(function (b) { return x + sz.w < b.x0 || x > b.x1 || y + sz.h < b.y0 || y > b.y1; });
        if (free) return { x: x, y: y };
      }
    }
    return { x: 30, y: 30 };
  };

  P.addNode = function (type) {
    var n = { id: this._newId("n"), type: type, name: "" };
    if (type === "class" || type === "entity") n.attrs = [];
    if (type === "class") n.methods = [];
    var defaults = { "class": "Klasse", entity: "Entität", action: "Aktion", usecase: "Anwendungsfall", actor: "Akteur" };
    if (defaults[type]) {
      var base = defaults[type], i = 1, names = {};
      this.model.nodes.forEach(function (m) { names[str(m.name)] = 1; });
      while (names[base + (i > 1 ? " " + i : "")]) i++;
      n.name = base + (i > 1 ? " " + i : "");
    }
    var p = this._freeSpot(nodeSize(n));
    n.x = p.x; n.y = p.y;
    this.model.nodes.push(n);
    this.sel = { t: "n", id: n.id };
    this._refresh(true);
    this._emit();
    var inp = this.panel.querySelector('[data-f="name"]');
    if (inp && !(root.matchMedia && root.matchMedia("(pointer: coarse)").matches)) { inp.focus(); inp.select(); }
    return n;
  };

  P.addEdge = function (from, to, type) {
    if (!this.node(from) || !this.node(to)) return null;
    var e = { id: this._newId("e"), from: from, to: to, type: type || this.cfg.edges[0] };
    this.model.edges.push(e);
    this.sel = { t: "e", id: e.id };
    this._refresh(true);
    this._emit();
    return e;
  };

  P.deleteSelected = function () {
    var s = this.sel, m = this.model;
    if (!s) return;
    // Arrays in-place ändern (Aufrufer können m.nodes/m.edges referenzieren)
    function drop(arr, fn) { for (var i = arr.length - 1; i >= 0; i--) if (fn(arr[i])) arr.splice(i, 1); }
    if (s.t === "n") {
      drop(m.nodes, function (n) { return n.id === s.id; });
      drop(m.edges, function (e) { return e.from === s.id || e.to === s.id; });
    } else {
      drop(m.edges, function (e) { return e.id === s.id; });
    }
    if (this.src === s.id) this.src = null;
    this.sel = null;
    this._refresh(true);
    this._emit();
  };

  P.setConnect = function (on) {
    this.connect = !!on;
    this.src = null;
    this._renderSvg();
    this._renderToolbar();
  };

  /** Ansicht auf den Inhalt einpassen (an) bzw. wieder ganze Zeichenfläche (aus) */
  P.fit = function (on) {
    if (on == null) on = !this.fitted;
    var b = on ? contentBox(this.model, this._pos()) : null;
    if (!b) { this.base = { x: 0, y: 0, w: W0, h: H0 }; on = false; }
    else {
      var pad = 30, w = Math.max(240, b.x1 - b.x0 + 2 * pad), h = Math.max(160, b.y1 - b.y0 + 2 * pad);
      this.base = { x: Math.floor((b.x0 + b.x1) / 2 - w / 2), y: Math.floor((b.y0 + b.y1) / 2 - h / 2), w: Math.ceil(w), h: Math.ceil(h) };
    }
    this.fitted = on;
    this.root.classList.toggle("dg-fit", on);
    var btn = this.root.querySelector('[data-act="fit"]');
    if (btn) { btn.textContent = on ? "Ganze Fläche" : "Ansicht einpassen"; btn.setAttribute("aria-pressed", on ? "true" : "false"); }
    this._renderSvg();
  };

  /* ------------------------------------------------------------- Events */

  P._onClick = function (ev) {
    var t = ev.target.closest ? ev.target.closest("button") : null;
    if (!t || !this.root.contains(t)) return;
    if (t.hasAttribute("data-add")) { this.setConnect(false); this.addNode(t.getAttribute("data-add")); return; }
    if (t.hasAttribute("data-st")) { this.select(t.getAttribute("data-st"), t.getAttribute("data-sid")); return; }
    var act = t.getAttribute("data-act");
    if (act === "connect") this.setConnect(!this.connect);
    else if (act === "del") this.deleteSelected();
    else if (act === "fit") this.fit();
    else if (act === "reverse") this._reverse();
  };

  P._reverse = function () {
    var e = this.sel && this.sel.t === "e" ? this.edge(this.sel.id) : null;
    if (!e) return;
    var f = e.from; e.from = e.to; e.to = f;
    var m1 = e.m1; e.m1 = e.m2; e.m2 = m1;
    if (e.m1 == null || e.m1 === "") delete e.m1;
    if (e.m2 == null || e.m2 === "") delete e.m2;
    this._refresh(true);
    this._emit();
    var b = this.panel.querySelector('[data-act="reverse"]');
    if (b) b.focus();
  };

  /** Feldwert aus dem Panel ins Modell schreiben (ohne Panel-Neuaufbau) */
  P._applyField = function (target) {
    var f = target.getAttribute("data-f");
    if (!f || !this.sel || !this.panel.contains(target)) return false;
    var v = target.value;
    if (this.sel.t === "n") {
      var n = this.node(this.sel.id);
      if (!n) return false;
      if (f === "attrs" || f === "methods") n[f] = v.split("\n").map(function (s) { return s.replace(/\s+$/, ""); }).filter(function (s) { return s.trim(); });
      else if (f === "stereo") { if (v) n.stereo = v; else delete n.stereo; }
      else n[f] = v;
    } else {
      var e = this.edge(this.sel.id);
      if (!e) return false;
      if (f === "m1" || f === "m2" || f === "label") { if (v.trim()) e[f] = v; else delete e[f]; }
      else e[f] = v;
    }
    return f;
  };
  P._onInput = function (ev) {
    var t = ev.target;
    if (t.tagName === "SELECT") return; // über change
    var f = this._applyField(t);
    if (!f) return;
    this._renderSvg();
    this._renderLists();
    if (f === "name") { this._renderAddForm(); this._renderToolbar(); }
    this._emit();
  };
  P._onChangeEv = function (ev) {
    var t = ev.target;
    if (t.classList.contains("dg-etype")) {
      this.edgeType = t.value;
      this._renderToolbar();
      return;
    }
    if (t.tagName !== "SELECT") return;
    var f = this._applyField(t);
    if (!f) return;
    this._renderSvg();
    this._renderLists();
    if (f === "type") {
      this._renderPanel();
      var s = this.panel.querySelector('[data-f="type"]');
      if (s) s.focus();
    }
    this._emit();
  };
  P._addEdgeFromForm = function () {
    var f = this.addForm;
    var from = f.querySelector('[name="from"]').value, to = f.querySelector('[name="to"]').value, type = f.querySelector('[name="type"]').value;
    if (!from || !to) return;
    this.addEdge(from, to, type);
  };
  P._onKey = function (ev) {
    if (isField(ev.target) || ev.ctrlKey || ev.metaKey || ev.altKey) return;
    if ((ev.key === "Delete" || ev.key === "Backspace") && this.sel) {
      ev.preventDefault(); ev.stopPropagation();
      this.deleteSelected();
      if (this.svgEl) this.svgEl.focus({ preventScroll: true });
    } else if (ev.key === "Escape" && (this.connect || this.sel)) {
      ev.preventDefault(); ev.stopPropagation();
      if (this.connect) this.setConnect(false);
      else this.select(null);
    }
  };

  P._svgPoint = function (ev) {
    var svg = this.svgEl, m = svg.getScreenCTM();
    if (!m) return { x: 0, y: 0 };
    var pt = svg.createSVGPoint();
    pt.x = ev.clientX; pt.y = ev.clientY;
    var r = pt.matrixTransform(m.inverse());
    return { x: r.x, y: r.y };
  };
  P._onDown = function (ev) {
    if (ev.button != null && ev.button > 0) return;
    var t = ev.target, ng = t.closest ? t.closest("[data-nid]") : null, eg = t.closest ? t.closest("[data-eid]") : null;
    if (this.connect) {
      if (!ng) return;
      ev.preventDefault();
      var id = ng.getAttribute("data-nid");
      if (!this.src) { this.src = id; this._renderSvg(); this._renderToolbar(); }
      else {
        var from = this.src;
        this.connect = false; this.src = null;
        this.addEdge(from, id, this.edgeType);
      }
      return;
    }
    if (ng) {
      ev.preventDefault();
      try { this.svgEl.focus({ preventScroll: true }); } catch (err) { /* ältere Browser */ }
      var nid = ng.getAttribute("data-nid"), n = this.node(nid), p = this._svgPoint(ev);
      this.select("n", nid);
      this.drag = { id: nid, pid: ev.pointerId, dx: p.x - Number(n.x), dy: p.y - Number(n.y), sx: ev.clientX, sy: ev.clientY, moved: false };
      try { this.svgEl.setPointerCapture(ev.pointerId); } catch (err2) { /* ignorieren */ }
      this.svgEl.classList.add("dg-dragging");
    } else if (eg) {
      try { this.svgEl.focus({ preventScroll: true }); } catch (err3) { /* */ }
      this.select("e", eg.getAttribute("data-eid"));
    } else if (this.sel) {
      this.select(null);
    }
  };
  P._onMove = function (ev) {
    var d = this.drag;
    if (!d || ev.pointerId !== d.pid) return;
    ev.preventDefault();
    if (!d.moved && Math.abs(ev.clientX - d.sx) + Math.abs(ev.clientY - d.sy) < 4) return;
    d.moved = true;
    var p = this._svgPoint(ev), n = this.node(d.id);
    if (!n) return;
    n.x = Math.round(p.x - d.dx);
    n.y = Math.round(p.y - d.dy);
    var self = this;
    if (!this.raf) {
      var raf = root.requestAnimationFrame || function (f) { return setTimeout(f, 16); };
      this.raf = raf(function () { self.raf = 0; if (self.svgEl) self._renderSvg(); });
    }
  };
  P._onUp = function (ev) {
    var d = this.drag;
    if (!d || ev.pointerId !== d.pid) return;
    this.drag = null;
    try { this.svgEl.releasePointerCapture(ev.pointerId); } catch (err) { /* */ }
    this.svgEl.classList.remove("dg-dragging");
    if (this.raf && root.cancelAnimationFrame) { cancelAnimationFrame(this.raf); this.raf = 0; }
    this._renderSvg();
    if (d.moved) this._emit();
  };

  DiagramEditor.svg = staticSvg;
  DiagramEditor.layout = layout;
  App.DiagramEditor = DiagramEditor;
})(typeof window !== "undefined" ? window : this);
