/* Service Worker fuer das Beerpong-Weihnachtsturnier.
   Cache-first: nach dem ersten Laden braucht die App kein Netz mehr.
   Bei Aenderungen an der App VERSION hochzaehlen, sonst bleibt der alte Stand im Cache. */

const VERSION = 'v1';
const CACHE = 'beerpong-timmer-' + VERSION;

const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/apple-touch-icon.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/favicon-32.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;

  if (req.method !== 'GET') return;
  if (new URL(req.url).origin !== self.location.origin) return;

  // Seitenaufrufe: erst Cache, Netz nur als Rueckfalloption.
  if (req.mode === 'navigate') {
    event.respondWith(
      caches.match('./index.html').then((hit) => hit || fetch(req))
    );
    return;
  }

  event.respondWith(
    caches.match(req).then((hit) => {
      // Im Hintergrund nachladen, damit spaetere Aenderungen ankommen.
      const net = fetch(req).then((res) => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put(req, copy));
        }
        return res;
      }).catch(() => hit);

      return hit || net;
    })
  );
});
