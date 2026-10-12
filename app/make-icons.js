// Erzeugt die App-Icons (PNG) ohne Zusatzbibliotheken: blauer Verlauf, weiße Strecke mit Stationen und Abzweig.
const zlib = require('zlib'), fs = require('fs'), path = require('path');
const CRC = (() => { const t = []; for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t.push(c >>> 0); } return t; })();
function crc32(buf) { let c = 0xffffffff; for (let i = 0; i < buf.length; i++) c = CRC[(c ^ buf[i]) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; }
function png(size, pixel) {
  const row = size * 4 + 1, raw = Buffer.alloc(row * size);
  for (let y = 0; y < size; y++) { raw[y * row] = 0; for (let x = 0; x < size; x++) { const p = pixel(x + .5, y + .5); const o = y * row + 1 + x * 4; raw[o] = p[0]; raw[o + 1] = p[1]; raw[o + 2] = p[2]; raw[o + 3] = 255; } }
  const chunks = [Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])];
  const chunk = (type, data) => { const len = Buffer.alloc(4); len.writeUInt32BE(data.length); const td = Buffer.concat([Buffer.from(type), data]); const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td)); chunks.push(len, td, crc); };
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4); ihdr[8] = 8; ihdr[9] = 6;
  chunk('IHDR', ihdr); chunk('IDAT', zlib.deflateSync(raw, { level: 9 })); chunk('IEND', Buffer.alloc(0));
  return Buffer.concat(chunks);
}
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
function distSeg(px, py, ax, ay, bx, by) { const dx = bx - ax, dy = by - ay, t = clamp(((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy), 0, 1); return Math.hypot(px - (ax + t * dx), py - (ay + t * dy)); }
function icon(size) {
  const aa = d => clamp(0.5 - d, 0, 1);
  const segs = [[0.18, 0.58, 0.82, 0.58], [0.5, 0.58, 0.63, 0.36], [0.63, 0.36, 0.82, 0.36]];
  const stations = [[0.3, 0.58], [0.5, 0.58], [0.7, 0.58], [0.74, 0.36]];
  const lw = 0.065 * size, R = 0.078 * size, ring = 0.036 * size;
  return png(size, (x, y) => {
    const t = (x + y) / (2 * size);
    const r = 58 + (10 - 58) * t, g = 160 + (95 - 160) * t, b = 255 + (214 - 255) * t;
    let cov = 0, inner = 0;
    for (const s of segs) cov = Math.max(cov, aa(distSeg(x, y, s[0] * size, s[1] * size, s[2] * size, s[3] * size) - lw / 2));
    for (const c of stations) { const d = Math.hypot(x - c[0] * size, y - c[1] * size); cov = Math.max(cov, aa(d - R)); inner = Math.max(inner, aa(d - (R - ring))); }
    const w = cov * (1 - inner);
    return [Math.round(r + (255 - r) * w), Math.round(g + (255 - g) * w), Math.round(b + (255 - b) * w)];
  });
}
function write(dir) {
  fs.writeFileSync(path.join(dir, 'icon-192.png'), icon(192));
  fs.writeFileSync(path.join(dir, 'icon-512.png'), icon(512));
  fs.writeFileSync(path.join(dir, 'apple-touch-icon.png'), icon(180));
}
module.exports = { write };
if (require.main === module) { write(process.argv[2] || __dirname); console.log('Icons geschrieben'); }
