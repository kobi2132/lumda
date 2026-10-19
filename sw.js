// The app moved to https://lomedly.jacob-apps.co.il
// This replaces the old offline worker: it deletes the saved copy of the app so every page shows the notice.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
    .then(() => self.clients.claim())
    .then(() => self.clients.matchAll({ type: 'window' }))
    .then(list => list.forEach(c => c.navigate(c.url).catch(() => {}))));
});
