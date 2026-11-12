// QR-Code-Erzeuger nach ISO/IEC 18004, ohne Zusatzbibliothek: Byte-Modus (UTF-8), Fehlerkorrektur Q (25 %), Versionen 1 bis 10 (bis 151 Bytes).
// window.QR.matrix(text, maske) liefert { size, version, mask, modules } (modules[y][x] ist 1 für dunkel) oder null, wenn der Text zu lang ist.
// window.QR.svg(text, beschriftung) liefert die Grafik mit vier Modulen hellem Rand, immer schwarz auf weiß.
(function () {
'use strict';

var ECC = [0, 13, 22, 18, 26, 18, 24, 18, 22, 20, 24]; // Korrekturwörter je Block, Stufe Q, Version 1 bis 10
var BLOECKE = [0, 1, 1, 2, 2, 4, 4, 6, 6, 8, 8];        // Anzahl der Blöcke, Stufe Q
var MAX_VERSION = 10;

// Rechnen im Körper GF(256) mit dem Polynom x^8 + x^4 + x^3 + x^2 + 1
var EXP = [], LOG = [];
(function () { var x = 1; for (var i = 0; i < 255; i++) { EXP[i] = x; LOG[x] = i; x <<= 1; if (x & 256) x ^= 0x11d; } })();
function mal(a, b) { return a && b ? EXP[(LOG[a] + LOG[b]) % 255] : 0; }
function teiler(grad) {
  var g = [], wurzel = 1, i, j;
  for (i = 0; i < grad - 1; i++) g.push(0);
  g.push(1);
  for (i = 0; i < grad; i++) {
    for (j = 0; j < grad; j++) { g[j] = mal(g[j], wurzel); if (j + 1 < grad) g[j] ^= g[j + 1]; }
    wurzel = mal(wurzel, 2);
  }
  return g;
}
function rest(daten, g) {
  var r = [], i, j, f;
  for (i = 0; i < g.length; i++) r.push(0);
  for (i = 0; i < daten.length; i++) { f = daten[i] ^ r.shift(); r.push(0); for (j = 0; j < g.length; j++) r[j] ^= mal(g[j], f); }
  return r;
}

function utf8(s) {
  var aus = [], i, c, d;
  for (i = 0; i < s.length; i++) {
    c = s.charCodeAt(i);
    if (c >= 0xd800 && c < 0xdc00 && i + 1 < s.length) { d = s.charCodeAt(i + 1); if (d >= 0xdc00 && d < 0xe000) { c = 0x10000 + ((c - 0xd800) << 10) + (d - 0xdc00); i++; } }
    if (c < 0x80) aus.push(c);
    else if (c < 0x800) aus.push(0xc0 | (c >> 6), 0x80 | (c & 63));
    else if (c < 0x10000) aus.push(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 63), 0x80 | (c & 63));
    else aus.push(0xf0 | (c >> 18), 0x80 | ((c >> 12) & 63), 0x80 | ((c >> 6) & 63), 0x80 | (c & 63));
  }
  return aus;
}

// Alle Module außer den festen Mustern, in Bits
function rohModule(v) {
  var r = (16 * v + 128) * v + 64, n;
  if (v >= 2) { n = Math.floor(v / 7) + 2; r -= (25 * n - 10) * n - 55; if (v >= 7) r -= 36; }
  return r;
}
function datenWoerter(v) { return Math.floor(rohModule(v) / 8) - ECC[v] * BLOECKE[v]; }
function zaehlBits(v) { return v < 10 ? 8 : 16; }

// Kleinste Version, in die die Bytes passen, und die Datenwörter dazu: Modus, Länge, Bytes, Abschluss, Füllwörter
function datenWorte(bytes) {
  var v, platz = 0, bits = [], i, j, b, fuell;
  for (v = 1; v <= MAX_VERSION; v++) { platz = datenWoerter(v) * 8; if (4 + zaehlBits(v) + bytes.length * 8 <= platz) break; }
  if (v > MAX_VERSION) return null;
  function lege(wert, laenge) { for (var k = laenge - 1; k >= 0; k--) bits.push((wert >>> k) & 1); }
  lege(4, 4); lege(bytes.length, zaehlBits(v));
  for (i = 0; i < bytes.length; i++) lege(bytes[i], 8);
  lege(0, Math.min(4, platz - bits.length));
  lege(0, (8 - bits.length % 8) % 8);
  for (fuell = 0xec; bits.length < platz; fuell ^= 0xec ^ 0x11) lege(fuell, 8);
  var worte = [];
  for (i = 0; i < bits.length; i += 8) { b = 0; for (j = 0; j < 8; j++) b = (b << 1) | bits[i + j]; worte.push(b); }
  return { version: v, worte: worte };
}

// Datenwörter in Blöcke teilen, je Block Korrekturwörter anhängen, dann spaltenweise verschränken
function verschraenkt(v, worte) {
  var nb = BLOECKE[v], ecl = ECC[v], roh = Math.floor(rohModule(v) / 8);
  var kurzeBloecke = nb - roh % nb, kurz = Math.floor(roh / nb) - ecl, g = teiler(ecl), bloecke = [], k = 0, i, j, len, dat;
  for (i = 0; i < nb; i++) { len = kurz + (i < kurzeBloecke ? 0 : 1); dat = worte.slice(k, k + len); k += len; bloecke.push({ dat: dat, ecc: rest(dat, g) }); }
  var aus = [];
  for (i = 0; i <= kurz; i++) for (j = 0; j < nb; j++) if (i < bloecke[j].dat.length) aus.push(bloecke[j].dat[i]);
  for (i = 0; i < ecl; i++) for (j = 0; j < nb; j++) aus.push(bloecke[j].ecc[i]);
  return aus;
}

function ausrichtung(v) {
  if (v === 1) return [];
  var anzahl = Math.floor(v / 7) + 2, schritt = Math.ceil((v * 4 + 4) / (anzahl * 2 - 2)) * 2, r = [6], p;
  for (p = v * 4 + 10; r.length < anzahl; p -= schritt) r.splice(1, 0, p);
  return r;
}
function maskiert(k, x, y) {
  switch (k) {
    case 0: return (x + y) % 2 === 0;
    case 1: return y % 2 === 0;
    case 2: return x % 3 === 0;
    case 3: return (x + y) % 3 === 0;
    case 4: return (Math.floor(x / 3) + Math.floor(y / 2)) % 2 === 0;
    case 5: return x * y % 2 + x * y % 3 === 0;
    case 6: return (x * y % 2 + x * y % 3) % 2 === 0;
    default: return ((x + y) % 2 + x * y % 3) % 2 === 0;
  }
}

// Baut das Raster: feste Muster, Daten im Zickzack von unten rechts, dann Maske und Formatangabe
function raster(v, worte, maske) {
  var n = v * 4 + 17, m = [], fest = [], x, y, i, j, dx, dy;
  for (y = 0; y < n; y++) { m.push([]); fest.push([]); for (x = 0; x < n; x++) { m[y].push(0); fest[y].push(0); } }
  function setze(px, py, dunkel) { m[py][px] = dunkel ? 1 : 0; fest[py][px] = 1; }
  for (i = 0; i < n; i++) { setze(6, i, i % 2 === 0); setze(i, 6, i % 2 === 0); }
  function sucher(cx, cy) {
    for (dy = -4; dy <= 4; dy++) for (dx = -4; dx <= 4; dx++) {
      var d = Math.max(Math.abs(dx), Math.abs(dy)), px = cx + dx, py = cy + dy;
      if (px >= 0 && px < n && py >= 0 && py < n) setze(px, py, d !== 2 && d !== 4);
    }
  }
  sucher(3, 3); sucher(n - 4, 3); sucher(3, n - 4);
  var pos = ausrichtung(v), letzte = pos.length - 1;
  for (i = 0; i <= letzte; i++) for (j = 0; j <= letzte; j++) {
    if ((i === 0 && j === 0) || (i === 0 && j === letzte) || (i === letzte && j === 0)) continue;
    for (dy = -2; dy <= 2; dy++) for (dx = -2; dx <= 2; dx++) setze(pos[i] + dx, pos[j] + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1);
  }
  function format(k) {
    var d = (3 << 3) | k, r = d, bits, q;
    for (q = 0; q < 10; q++) r = (r << 1) ^ ((r >>> 9) * 0x537);
    bits = ((d << 10) | r) ^ 0x5412;
    function bit(z) { return ((bits >>> z) & 1) !== 0; }
    for (q = 0; q <= 5; q++) setze(8, q, bit(q));
    setze(8, 7, bit(6)); setze(8, 8, bit(7)); setze(7, 8, bit(8));
    for (q = 9; q < 15; q++) setze(14 - q, 8, bit(q));
    for (q = 0; q < 8; q++) setze(n - 1 - q, 8, bit(q));
    for (q = 8; q < 15; q++) setze(8, n - 15 + q, bit(q));
    setze(8, n - 8, true);
  }
  format(0);
  if (v >= 7) {
    var r18 = v, b18, a, b;
    for (i = 0; i < 12; i++) r18 = (r18 << 1) ^ ((r18 >>> 11) * 0x1f25);
    b18 = (v << 12) | r18;
    for (i = 0; i < 18; i++) { a = n - 11 + i % 3; b = Math.floor(i / 3); setze(a, b, ((b18 >>> i) & 1) !== 0); setze(b, a, ((b18 >>> i) & 1) !== 0); }
  }
  var z = 0, rechts, hoch, senk;
  for (rechts = n - 1; rechts >= 1; rechts -= 2) {
    if (rechts === 6) rechts = 5;
    for (senk = 0; senk < n; senk++) for (j = 0; j < 2; j++) {
      x = rechts - j; hoch = ((rechts + 1) & 2) === 0; y = hoch ? n - 1 - senk : senk;
      if (!fest[y][x] && z < worte.length * 8) { m[y][x] = (worte[z >>> 3] >>> (7 - (z & 7))) & 1; z++; }
    }
  }
  function maskiere(k) { for (var py = 0; py < n; py++) for (var px = 0; px < n; px++) if (!fest[py][px] && maskiert(k, px, py)) m[py][px] ^= 1; }
  // Strafpunkte nach den vier Regeln der Norm; die Maske mit den wenigsten Punkten ist am besten lesbar
  function strafe() {
    var p = 0, a, b, lauf, farbe, fenster, dunkel = 0, k;
    for (a = 0; a < n; a++) for (k = 0; k < 2; k++) {
      lauf = 0; farbe = -1; fenster = 0;
      for (b = 0; b < n; b++) {
        var wert = k ? m[b][a] : m[a][b];
        if (wert === farbe) lauf++; else { if (lauf >= 5) p += lauf - 2; farbe = wert; lauf = 1; }
        fenster = ((fenster << 1) & 0x7ff) | wert;
        if (b >= 10 && (fenster === 0x5d0 || fenster === 0x05d)) p += 40;
        if (!k) dunkel += wert;
      }
      if (lauf >= 5) p += lauf - 2;
    }
    for (a = 0; a < n - 1; a++) for (b = 0; b < n - 1; b++) { k = m[a][b] + m[a][b + 1] + m[a + 1][b] + m[a + 1][b + 1]; if (k === 0 || k === 4) p += 3; }
    return p + Math.floor(Math.abs(dunkel * 20 - n * n * 10) / (n * n)) * 10;
  }
  if (maske == null) {
    var beste = Infinity, s;
    for (i = 0; i < 8; i++) { format(i); maskiere(i); s = strafe(); maskiere(i); if (s < beste) { beste = s; maske = i; } }
  }
  format(maske); maskiere(maske);
  return { size: n, version: v, mask: maske, modules: m };
}

function matrix(text, maske) {
  var d = datenWorte(utf8(String(text)));
  if (!d) return null;
  return raster(d.version, verschraenkt(d.version, d.worte), maske != null && maske >= 0 && maske <= 7 ? Math.floor(maske) : null);
}
function svg(text, beschriftung) {
  var q = matrix(text);
  if (!q) return '';
  var n = q.size, rand = 4, g = n + 2 * rand, pfad = '', x, y, x0;
  for (y = 0; y < n; y++) for (x = 0; x < n; x++) {
    if (!q.modules[y][x]) continue;
    x0 = x; while (x + 1 < n && q.modules[y][x + 1]) x++;
    pfad += 'M' + (x0 + rand) + ' ' + (y + rand) + 'h' + (x - x0 + 1) + 'v1h-' + (x - x0 + 1) + 'z';
  }
  var name = String(beschriftung || 'QR-Code').replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
  return '<svg class="qr" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + g + ' ' + g + '" width="240" height="240" role="img" aria-label="' + name + '" shape-rendering="crispEdges"><rect width="' + g + '" height="' + g + '" fill="#fff"/><path d="' + pfad + '" fill="#000"/></svg>';
}

window.QR = { matrix: matrix, svg: svg };
})();
