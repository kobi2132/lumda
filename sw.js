// Offline support: always try the network first so a new version shows up right away; fall back to the saved copy when offline.
const CACHE = 'lumda-v6';
const FILES = ['./', 'index.html', 'apps/catalog.js', 'kids.js', 'assets/kids/melody.webp', 'assets/kids/yam.webp', 'assets/kids/yam-bust.webp', 'manifest.webmanifest', 'icon-192.png?v=2', 'icon-512.png?v=2'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  e.respondWith(caches.open(CACHE).then(async c => {
    try {
      const r = await fetch(e.request, { cache: 'no-cache' });
      if (r.ok) c.put(e.request, r.clone());
      return r;
    } catch (err) {
      return (await c.match(e.request, { ignoreSearch: true })) || Response.error();
    }
  }));
});
