/* The children who play. Every app can read the current child with LUMDA_KID() and adapt name, wording, voice and look. */
window.LUMDA_KIDS = {
  melody: {
    id: 'melody', name: 'מלודי', nameEn: 'Melody', gender: 'f', age: 4,
    img: 'assets/kids/melody.webp',
    welcome: 'ברוכה הבאה מלודי!', welcomeSay: 'בְּרוּכָה הַבָּאָה מֶלוֹדִי!',
    voice: 'female', theme: { bg: 'linear-gradient(170deg,#ffc6e3 0%,#f3c4ff 55%,#d7c0ff 100%)', accent: '#ff4f9a', ink: '#4e1f63' }
  },
  yam: {
    id: 'yam', name: 'ים', nameEn: 'Yam', nameEnSay: 'Yahm', /* how the English voice should pronounce it ('Yam' sounds like the vegetable) */ gender: 'm', age: 6,
    img: 'assets/kids/yam.webp',
    welcome: 'ברוך הבא ים!', welcomeSay: 'בָּרוּךְ הַבָּא יָם!',
    voice: 'male', theme: { bg: 'linear-gradient(170deg,#2b3a67 0%,#3d2f6b 55%,#1e2748 100%)', accent: '#f2b632', ink: '#ffffff' }
  }
};
window.LUMDA_KID = function(){ try { return window.LUMDA_KIDS[localStorage.getItem('lumda-kid')] || null } catch(e){ return null } };
