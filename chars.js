/* The characters a child can have (picked on the hub's kids page). Works in pages and in the service worker (sw.js caches every picture).
   A new character: add its pictures to assets/chars/ and one line here. There is no limit on how many.
   gender: 'f' (girls), 'm' (boys) or 'any' (offered to everyone). img: the whole figure, bust: head and shoulders (the companion in the apps).
   big: the whole figure inside the apps when it differs from img; mouth: the talking-mouth pictures exist for this figure (the princess). bigAr, bustAr: width/height of the pictures. Paths are from the site root. */
self.LUMDA_CHARS = [
  { id: 'princess', gender: 'f', he: 'נסיכה', img: 'assets/kids/melody.webp', big: 'apps/melody-english/img/025da1c10968.webp', bust: 'apps/melody-english/img/5c09e6dbfcf3.webp', bigAr: '440/702', bustAr: '300/328', mouth: true },
  { id: 'fairy', gender: 'f', he: 'פיה', img: 'assets/chars/fairy.webp', bust: 'assets/chars/fairy-bust.webp', bigAr: '435/720', bustAr: '300/279' },
  { id: 'astronaut-girl', gender: 'f', he: 'אסטרונאוטית', img: 'assets/chars/astronaut-girl.webp', bust: 'assets/chars/astronaut-girl-bust.webp', bigAr: '371/720', bustAr: '300/342' },
  { id: 'superhero-girl', gender: 'f', he: 'גיבורת על', img: 'assets/chars/superhero-girl.webp', bust: 'assets/chars/superhero-girl-bust.webp', bigAr: '361/720', bustAr: '277/360' },
  { id: 'mermaid', gender: 'f', he: 'בת ים', img: 'assets/chars/mermaid.webp', bust: 'assets/chars/mermaid-bust.webp', bigAr: '321/720', bustAr: '283/360' },
  { id: 'ballerina', gender: 'f', he: 'רקדנית בלט', img: 'assets/chars/ballerina.webp', bust: 'assets/chars/ballerina-bust.webp', bigAr: '349/720', bustAr: '203/360' },
  { id: 'explorer-girl', gender: 'f', he: 'חוקרת', img: 'assets/chars/explorer-girl.webp', bust: 'assets/chars/explorer-girl-bust.webp', bigAr: '330/720', bustAr: '295/360' },
  { id: 'doctor-girl', gender: 'f', he: 'רופאה', img: 'assets/chars/doctor-girl.webp', bust: 'assets/chars/doctor-girl-bust.webp', bigAr: '309/720', bustAr: '274/360' },
  { id: 'unicorn-girl', gender: 'f', he: 'חד־קרן', img: 'assets/chars/unicorn-girl.webp', bust: 'assets/chars/unicorn-girl-bust.webp', bigAr: '286/720', bustAr: '241/360' },
  { id: 'knight-girl', gender: 'f', he: 'אבירה', img: 'assets/chars/knight-girl.webp', bust: 'assets/chars/knight-girl-bust.webp', bigAr: '332/720', bustAr: '255/360' },
  { id: 'knight', gender: 'm', he: 'אביר', img: 'assets/kids/yam.webp', bust: 'assets/kids/yam-bust.webp', bigAr: '401/758', bustAr: '320/350' },
  { id: 'prince', gender: 'm', he: 'נסיך', img: 'assets/chars/prince.webp', bust: 'assets/chars/prince-bust.webp', bigAr: '323/720', bustAr: '208/360' },
  { id: 'astronaut-boy', gender: 'm', he: 'אסטרונאוט', img: 'assets/chars/astronaut-boy.webp', bust: 'assets/chars/astronaut-boy-bust.webp', bigAr: '301/720', bustAr: '247/360' },
  { id: 'pirate', gender: 'm', he: 'פיראט', img: 'assets/chars/pirate.webp', bust: 'assets/chars/pirate-bust.webp', bigAr: '349/720', bustAr: '300/350' },
  { id: 'superhero-boy', gender: 'm', he: 'גיבור על', img: 'assets/chars/superhero-boy.webp', bust: 'assets/chars/superhero-boy-bust.webp', bigAr: '369/720', bustAr: '293/360' },
  { id: 'wizard', gender: 'm', he: 'קוסם', img: 'assets/chars/wizard.webp', bust: 'assets/chars/wizard-bust.webp', bigAr: '347/720', bustAr: '300/349' },
  { id: 'firefighter', gender: 'm', he: 'כבאי', img: 'assets/chars/firefighter.webp', bust: 'assets/chars/firefighter-bust.webp', bigAr: '317/720', bustAr: '281/360' },
  { id: 'dino-boy', gender: 'm', he: 'דינוזאור', img: 'assets/chars/dino-boy.webp', bust: 'assets/chars/dino-boy-bust.webp', bigAr: '300/720', bustAr: '268/360' },
  { id: 'racer', gender: 'm', he: 'נהג מרוצים', img: 'assets/chars/racer.webp', bust: 'assets/chars/racer-bust.webp', bigAr: '323/720', bustAr: '282/360' },
  { id: 'soccer', gender: 'm', he: 'כדורגלן', img: 'assets/chars/soccer.webp', bust: 'assets/chars/soccer-bust.webp', bigAr: '291/720', bustAr: '260/360' },
  { id: 'doctor-boy', gender: 'm', he: 'רופא', img: 'assets/chars/doctor-boy.webp', bust: 'assets/chars/doctor-boy-bust.webp', bigAr: '319/720', bustAr: '276/360' }
];
