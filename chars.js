/* The characters a child can have (picked on the hub's kids page). Works in pages and in the service worker (sw.js caches every picture).
   A new character: add its pictures to assets/chars/ and one line here. There is no limit on how many.
   gender: 'f' (girls), 'm' (boys) or 'any' (offered to everyone). img: the whole figure, bust: head and shoulders (the companion in the apps).
   big: the whole figure inside the apps when it differs from img; mouth: the talking-mouth pictures exist for this figure (the princess). bigAr, bustAr: width/height of the pictures. Paths are from the site root. */
self.LUMDA_CHARS = [
  { id: 'princess', gender: 'f', he: 'נסיכה', img: 'assets/kids/melody.webp', big: 'apps/melody-english/img/025da1c10968.webp', bust: 'apps/melody-english/img/5c09e6dbfcf3.webp', bigAr: '440/702', bustAr: '300/328', mouth: true },
  { id: 'knight', gender: 'm', he: 'אביר', img: 'assets/kids/yam.webp', bust: 'assets/kids/yam-bust.webp', bigAr: '401/758', bustAr: '320/350' }
];
