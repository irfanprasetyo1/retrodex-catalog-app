export function renderNavbar() {
  const navbarContainer = document.querySelector("#navbar");

  navbarContainer.innerHTML = `
    <header class="site-header">
      <nav class="site-nav">
        <a href="#/" class="site-header-logo">RetroDex</a>
      </nav>
    </header>
  `;
}
