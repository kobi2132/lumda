// Offline support and speed.
// Pages and scripts: network first, so a new version shows up right away; the saved copy is used offline.
// Pictures: saved copy first (their names never change), so they load instantly after the first time.
const CACHE = 'lumda-v14', IMG = 'lumda-img-v1';
const FILES = ['./', 'index.html', 'apps/catalog.js', 'kids.js', 'manifest.webmanifest', 'apps/melody-english/index.html', 'apps/numbers/index.html'];
const PICS = ['assets/kids/melody.webp', 'assets/kids/yam.webp', 'assets/kids/yam-bust.webp', 'icon-192.png?v=2', 'icon-512.png?v=2'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE && k !== IMG).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
  // in the background, save every picture of the English app so it also works offline
  e.waitUntil(fillPics());
});
// also on every visit, in case the phone stopped the worker before it finished
self.addEventListener('message', e => { if (e.data === 'fill') e.waitUntil(fillPics()) });
let filling = null;
function fillPics(){
  return filling || (filling = caches.open(IMG).then(async c => {
    try {
      const list = await (await fetch('apps/melody-english/img/list.json', { cache: 'no-cache' })).json();
      for (const u of PICS.concat(list.map(f => 'apps/melody-english/' + f))) if (!(await c.match(u))) await c.add(u).catch(() => {});
    } catch (err) {}
  }).finally(() => { filling = null }));
}
const isPic = url => /\/img\/|\/assets\/|\/icon-\d+\.png/.test(url.pathname);
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  if (isPic(url)) {
    e.respondWith(caches.open(IMG).then(async c => {
      const hit = await c.match(e.request);
      if (hit) return hit;
      const r = await fetch(e.request); if (r.ok) c.put(e.request, r.clone()); return r;
    }));
    return;
  }
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
