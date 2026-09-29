//Fungsi untuk merender halaman footer di HTML
export function renderFooter() {
  const footerContainer = document.querySelector("#footer");
  const year = new Date().getFullYear();

  footerContainer.innerHTML = `
    <footer class="site-footer">
      <div class="container footer-inner">
        <div class="footer-brand">
          <span class="brand-name footer-brand-name">RetroDex</span>
          <p class="footer-tagline">
            Explore modern and retro console games in one place.
          </p>
        </div>

        <nav class="footer-links" aria-label="Footer navigation">
          <a href="#/platform" class="footer-link">Platforms</a>
          <a href="#/genre" class="footer-link">Genres</a>
          <a href="#/wishlist" class="footer-link">Wishlist</a>
          <a href="#/library" class="footer-link">Library</a>
        </nav>

        <div class="footer-attribution">
          <p class="footer-text">
            Game data and images provided by
            <a
              href="https://rawg.io"
              target="_blank"
              rel="noopener noreferrer"
              class="footer-link-external"
              >RAWG.io</a
            >
          </p>
          <p class="footer-copyright">
            &copy; ${year} RetroDex - Create By Irfan Prasetyo. Build for portfolio purposes.
          </p>
        </div>
      </div>
    </footer>
  `;
}
