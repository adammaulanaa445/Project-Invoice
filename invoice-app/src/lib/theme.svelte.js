function createTheme() {
  let dark = $state(false);

  return {
    get dark() { return dark; },
    toggle() {
      dark = !dark;
      document.documentElement.classList.toggle('dark', dark);
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    },
    init() {
      const saved = localStorage.getItem('theme');
      dark = saved === 'dark';
      document.documentElement.classList.toggle('dark', dark);
    }
  };
}

export const theme = createTheme();