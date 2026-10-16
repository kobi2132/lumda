/* קטלוג הלומדות. לומדה חדשה = תיקייה חדשה תחת apps/ + רשומה אחת כאן. */
window.LUMDA_SUBJECTS = {
  english: { he: 'אנגלית', icon: '🔤', color: '#ff4f9a' },
  math:    { he: 'חשבון',  icon: '🔢', color: '#ff9c3a' },
  hebrew:  { he: 'עברית',  icon: 'א',  color: '#9566f2' },
  science: { he: 'מדע',    icon: '🔬', color: '#29b98d' }
};

window.LUMDA_APPS = [
  {
    id: 'melody-english',
    title: 'מלודי לומדת אנגלית',
    description: 'מילים ראשונות באנגלית: צבעים, חיות, פירות, מספרים ועוד, עם משחקים ומדבקות.',
    subject: 'english',
    ages: [3, 6],
    icon: '👑',
    path: 'apps/melody-english/index.html'
  }
];
