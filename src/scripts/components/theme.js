//Fungsi untuk menganti tema gelap/terang
export function initToggle() {
  const THEME_STORAGE_KEY = "RetroDex-theme";
  const themeBtn = document.getElementById("themeBtn");

  function getInitialTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme) {
      return savedTheme;
    }

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    return prefersDark ? "dark" : "light";
  }

  function applyTheme(theme) {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    const iconName = theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
    const themeIcon = document.getElementById("themeIcon");
    themeIcon.setAttribute("class", iconName);
  }

  function toggleTheme() {
    const isDark = document.body.classList.contains("dark");
    const newTheme = isDark ? "light" : "dark";
    applyTheme(newTheme);
  }

  applyTheme(getInitialTheme());
  themeBtn.addEventListener("click", toggleTheme);
}
