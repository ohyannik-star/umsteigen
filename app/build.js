// Baut zwei Dinge: dist/umsteigen.html (eine Datei zum Doppelklicken) und site/ (installierbare Web-App zum Hochladen).
// Aufruf: node app/build.js
const fs = require('fs'), path = require('path');
const app = __dirname, root = path.join(app, '..');
const page = fs.readFileSync(path.join(app, 'index.html'), 'utf8');
const HEAD = '<!doctype html>\n<html lang="de">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n';
const doc = (body, extraHead) => HEAD + (extraHead || '') + body.replace(/^([\s\S]*?<\/style>)/, '$1\n</head>\n<body>') + '\n</body>\n</html>\n';

// 1) Einzeldatei
const single = page.replace(/<script src="([^"]+)"><\/script>/g, (m, src) => '<script>\n' + fs.readFileSync(path.join(app, src), 'utf8').replace(/<\/script/gi, '<\\/script') + '\n</script>');
fs.mkdirSync(path.join(root, 'dist'), { recursive: true });
fs.writeFileSync(path.join(root, 'dist', 'umsteigen.html'), doc(single), 'utf8');

// 2) Web-App (PWA)
const site = path.join(root, 'docs');
fs.rmSync(site, { recursive: true, force: true });
fs.mkdirSync(path.join(site, 'data'), { recursive: true });
const d = new Date(), pad = n => String(n).padStart(2, '0');
const version = d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) + '-' + pad(d.getHours()) + pad(d.getMinutes());
const files = ['app.js'].concat(fs.readdirSync(path.join(app, 'data')).filter(f => f.endsWith('.js')).map(f => 'data/' + f));
files.forEach(f => fs.copyFileSync(path.join(app, f), path.join(site, f)));
require('./make-icons.js').write(site);
const manifest = { name: 'Umsteigen', short_name: 'Umsteigen', description: 'Fahrplan-Netze für demokratische Gespräche', start_url: './', scope: './', display: 'standalone', background_color: '#f5f5f7', theme_color: '#f5f5f7', lang: 'de', icons: [{ src: 'icon-192.png', sizes: '192x192', type: 'image/png' }, { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }] };
fs.writeFileSync(path.join(site, 'manifest.webmanifest'), JSON.stringify(manifest, null, 2), 'utf8');
const precache = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'].concat(files);
const sw = `// Umsteigen Service Worker, Version ${version}
const VERSION = 'umsteigen-${version}';
const FILES = ${JSON.stringify(precache)};
self.addEventListener('install', e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(cached => {
    const fresh = fetch(e.request).then(res => { if (res && res.ok) caches.open(VERSION).then(c => c.put(e.request, res.clone())); return res; }).catch(() => cached);
    return cached || fresh;
  }));
});
`;
fs.writeFileSync(path.join(site, 'sw.js'), sw, 'utf8');
const extraHead = [
  '<link rel="manifest" href="manifest.webmanifest">',
  '<meta name="theme-color" content="#f5f5f7" media="(prefers-color-scheme: light)">',
  '<meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)">',
  '<meta name="apple-mobile-web-app-capable" content="yes">',
  '<meta name="mobile-web-app-capable" content="yes">',
  '<meta name="apple-mobile-web-app-title" content="Umsteigen">',
  '<meta name="apple-mobile-web-app-status-bar-style" content="default">',
  '<link rel="apple-touch-icon" href="apple-touch-icon.png">',
  '<link rel="icon" href="icon-192.png">',
].join('\n') + '\n';
const hosted = `<script>window.UMSTEIGEN_HOSTED = true; window.UMSTEIGEN_VERSION = '${version}';</script>`;
const swScript = `<script>
if ('serviceWorker' in navigator && /^https?:/.test(location.protocol)) {
  navigator.serviceWorker.register('sw.js').then(function (reg) {
    reg.addEventListener('updatefound', function () {
      var nw = reg.installing; if (!nw) return;
      nw.addEventListener('statechange', function () {
        if (nw.state === 'installed' && navigator.serviceWorker.controller) {
          var t = document.createElement('div'); t.className = 'toast';
          t.innerHTML = 'Neue Version verfügbar. <button type="button" style="font:inherit;color:inherit;background:none;border:0;padding:0;text-decoration:underline;cursor:pointer" onclick="location.reload()">Jetzt laden</button>';
          document.body.appendChild(t);
        }
      });
    });
  }).catch(function () {});
}
</script>`;
const pwa = page.replace('<script src="app.js"></script>', hosted + '\n<script src="app.js"></script>\n' + swScript);
fs.writeFileSync(path.join(site, 'index.html'), doc(pwa, extraHead), 'utf8');
console.log('geschrieben: dist/umsteigen.html (' + Math.round(doc(single).length / 1024) + ' KB), docs/ (Version ' + version + ', ' + (files.length + 6) + ' Dateien)');
