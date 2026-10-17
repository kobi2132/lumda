// Offline support and speed.
// Pages and scripts: network first, so a new version shows up right away; the saved copy is used offline.
// Pictures: saved copy first (their names never change), so they load instantly after the first time.
const CACHE = 'lumda-v36', IMG = 'lumda-img-v1';
const FILES = ['./', 'index.html', 'apps/catalog.js', 'chars.js', 'kids.js', 'manifest.webmanifest', 'apps/melody-english/index.html', 'apps/numbers/index.html'];
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
      // every character's pictures (chars.js is read fresh, so new characters are saved too)
      let chars = [];
      try { const t = await (await fetch('chars.js', { cache: 'no-cache' })).text(); const self_ = {}; new Function('self', t)(self_); chars = self_.LUMDA_CHARS || [] } catch (err) {}
      let all = PICS.concat(...chars.map(ch => [ch.img, ch.big, ch.bust].filter(Boolean)));
      for (const app of ['melody-english', 'numbers']) {
        const list = await (await fetch('apps/' + app + '/img/list.json', { cache: 'no-cache' })).json().catch(() => []);
        all = all.concat(list.map(f => 'apps/' + app + '/' + f));
      }
      for (const u of all) if (!(await c.match(u))) await c.add(u).catch(() => {});
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
