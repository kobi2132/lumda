/* The children who play. Every app can read the current child with LUMDA_KID() and adapt name, wording, voice and look.
   The list lives on the phone (localStorage 'lumda-kids', edited in the hub's parents area). A new phone starts empty; Melody and Yam come from the developer page.
   Each saved kid: {id, name, nameEn, nameSay (Hebrew with nikud, for the voice), nameEnSay (how the English voice should say it), gender 'f'|'m', level 'kg'|'g1', char}.
   gender picks the colors, wording and voice; char picks the character (from chars.js, loaded before this file); level picks the content (kindergarten or first grade). */
(function(){
  const DEFAULTS = [
    { id: 'melody', name: 'מלודי', nameEn: 'Melody', nameSay: 'מֶלוֹדִי', nameEnSay: 'Melody', gender: 'f', level: 'kg', char: 'princess' },
    /* 'Yam' sounds like the vegetable, so the English voice says 'Yahm' */
    { id: 'yam', name: 'ים', nameEn: 'Yam', nameSay: 'יָם', nameEnSay: 'Yahm', gender: 'm', level: 'g1', char: 'knight' }
  ];
  const CHARS = window.LUMDA_CHARS || [];
  // the characters offered for a gender (its own and the ones for everyone)
  window.LUMDA_CHARS_FOR = g => CHARS.filter(c => c.gender === g || c.gender === 'any');
  const charOf = k => CHARS.find(c => c.id === k.char && (c.gender === k.gender || c.gender === 'any')) || window.LUMDA_CHARS_FOR(k.gender)[0] || CHARS[0] || {};
  const LOOKS = {
    melody: { img: 'assets/kids/melody.webp', voice: 'female', theme: { bg: 'linear-gradient(170deg,#ffc6e3 0%,#f3c4ff 55%,#d7c0ff 100%)', accent: '#ff4f9a', ink: '#4e1f63' } },
    yam:    { img: 'assets/kids/yam.webp', voice: 'male', theme: { bg: 'linear-gradient(170deg,#2b3a67 0%,#3d2f6b 55%,#1e2748 100%)', accent: '#f2b632', ink: '#ffffff' } }
  };
  window.LUMDA_LEVELS = { kg: { he: 'גן', ages: '3 עד 5', age: 4 }, g1: { he: "כיתה א'", ages: '6 עד 7', age: 6 } };
  window.LUMDA_DEFAULT_KIDS = DEFAULTS;
  // the full kid as apps use it: the saved fields plus what follows from gender and level
  function full(k){
    const look = k.gender === 'm' ? 'yam' : 'melody', L = LOOKS[look], say = k.nameSay || k.name, ch = charOf(k);
    return Object.assign({}, k, {
      look, voice: L.voice, theme: L.theme,
      // the character's pictures, from the site root (apps add ../../)
      char: ch.id, img: ch.img || L.img, charBig: ch.big || ch.img || L.img, charBust: ch.bust || ch.img || L.img, mouth: !!ch.mouth, bigAr: ch.bigAr, bustAr: ch.bustAr,
      nameEnSay: k.nameEnSay || k.nameEn, nameSay: say,
      age: (window.LUMDA_LEVELS[k.level] || window.LUMDA_LEVELS.kg).age,
      welcome: (k.gender === 'm' ? 'ברוך הבא ' : 'ברוכה הבאה ') + k.name + '!',
      welcomeSay: (k.gender === 'm' ? 'בָּרוּךְ הַבָּא ' : 'בְּרוּכָה הַבָּאָה ') + say + '!'
    });
  }
  window.LUMDA_KIDS_LIST = function(){
    try { const s = JSON.parse(localStorage.getItem('lumda-kids')); if (Array.isArray(s)) return s.filter(k => k && k.id && k.name) } catch(e){}
    // nothing saved yet: a phone where Melody or Yam already played keeps them; a new phone starts with no children
    try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k && DEFAULTS.some(d => k.startsWith(d.id + '-'))) return DEFAULTS.map(d => Object.assign({}, d)) } } catch(e){}
    return [];
  };
  window.LUMDA_SAVE_KIDS = function(list){
    try { localStorage.setItem('lumda-kids', JSON.stringify(list)) } catch(e){}
    build();
  };
  function build(){
    const o = {}; window.LUMDA_KIDS_LIST().forEach(k => { o[k.id] = full(k) }); window.LUMDA_KIDS = o;
  }
  build();
})();
/* Settings shared by all the apps (set in the hub's parents area): voice, speed, microphone, break reminder.
   The first time, they are taken from an app's own saved settings, so nothing a parent chose is lost. */
(function(){
  const DEF = { voice: true, rate: 1, mic: true, breakMin: 20 }, KEYS = Object.keys(DEF);
  window.LUMDA_SETTINGS = function(){
    let s = null;
    try { s = JSON.parse(localStorage.getItem('lumda-settings')) } catch(e){}
    if (!s || typeof s !== 'object') {
      s = {};
      try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i);
        if (k && /-settings$/.test(k) && k !== 'lumda-settings') { const o = JSON.parse(localStorage.getItem(k)); if (o && 'voice' in o) { s = o; break } } } } catch(e){}
    }
    const out = Object.assign({}, DEF); KEYS.forEach(k => { if (k in s) out[k] = s[k] }); return out;
  };
  window.LUMDA_SAVE_SETTINGS = function(o){ try { localStorage.setItem('lumda-settings', JSON.stringify(Object.assign(window.LUMDA_SETTINGS(), o))) } catch(e){} };
})();
window.LUMDA_KID = function(){ try { return window.LUMDA_KIDS[localStorage.getItem('lumda-kid')] || null } catch(e){ return null } };
