//Fungsi untuk update navigasi update (pada saat berpindah ke halaman lain)
function updateActiveNavlink() {
  const currentHash = window.location.hash.slice(1) || "/";
  const navLinks = document.querySelectorAll(".navbar-link");

  navLinks.forEach((link) => {
    const linkPath = link.getAttribute("href").slice(1);
    const isActive =
      linkPath === "/"
        ? currentHash === "/"
        : currentHash === linkPath || currentHash.startsWith(`${linkPath}/`);

    link.classList.toggle("active", isActive);
  });
}

//Fungsi untuk membuat dan merender elemen navigasi
export function renderNavbar() {
  const navbarContainer = document.querySelector("#navbar");

  navbarContainer.innerHTML = `
    <header class="header">
      <div class="container header-inner">
        <a href="#/" class="brand-name" aria-label="RetroDex - homepage"
          >RetroDex</a
        >

        <nav id="navMenu" class="navbar-menu" aria-label="Main navigation">
          <div class="navbar-menu-header">
            <span class="brand-name">RetroDex</span>

            <button
              class="btn-icon close-btn"
              id="closeBtn"
              aria-label="Close navigation menu"
              aria-controls="navMenu"
            >
              <i class="fa-solid fa-x" aria-hidden="true"></i>
            </button>
          </div>

          <ul class="navbar-list">
            <li><a href="#/" class="navbar-link">Home</a></li>
            <li><a href="#/platform" class="navbar-link">Platforms</a></li>
            <li><a href="#/genre" class="navbar-link">Genres</a></li>
            <li><a href="#/library" class="navbar-link">Library</a></li>
            <li><a href="#/wishlist" class="navbar-link">Wishlist</a></li>
          </ul>
        </nav>

        <div class="header-actions">
          <button
            class="btn-icon"
            id="themeBtn"
            aria-label="Switch light/dark theme"
          >
            <i class="fa-solid fa-moon" id="themeIcon" aria-hidden="true"></i>
          </button>

          <button
            class="btn-icon hamburger"
            id="hamburger"
            aria-label="Open navigation menu"
            aria-controls="navMenu"
            aria-expanded="false"
          >
            <i class="fa-solid fa-bars" aria-hidden="true"></i>
          </button>
        </div>
      </div>
      <div class="nav-overlay" id="navOverlay"></div>
    </header>
  `;

  updateActiveNavlink();
  window.addEventListener("hashchange", updateActiveNavlink);
}
