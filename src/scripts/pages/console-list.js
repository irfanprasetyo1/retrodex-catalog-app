import { getPlatforms } from "../data/api.js";
/*
function createConsoleCard(platform) {
  return `
    <a href="#/console/${platform.slug}" class="console-card">
      <h3 class="console-card-name">${platform.name}</h3>
      <p class="console-card-count">${platform.games_count} game</p>
    </a>
  `;
}

export async function renderConsolesList(params, container) {
  container.innerHTML = `<p class="status-message">Loading console list...</p>`;

  try {
    const data = await getPlatforms();
    const cardsHTML = data.results.map(createConsoleCard).join("");

    container.innerHTML = `
      <section class="page">
        <a href="#/" class="back-link">\u2190 Return to homepage</a>
        <h1 class="page-title">Choose console</h1>
        <p class="page-subtitle">Modern or retro, it's all here.</p>
        <div class="console-grid">
          ${cardsHTML}
        </div>
      </section>
    `;
  } catch (error) {
    console.error(error);
    container.innerHTML = `
      <section class="page">
        <a href="#/" class="back-link">\u2190 Return to homepage</a>
        <p class="status-message status-message-error">Failed to load console list.</p>
      </section>
    `;
  }
}
*/

function debounce(callback, delay = 400) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

function createConsoleCard(platform) {
  return `
    <a href="#/console/${platform.slug}" class="console-card">
      <h3 class="console-card__name">${platform.name}</h3>
      <p class="console-card__count">${platform.games_count} game</p>
    </a>
  `;
}

// Simpan data platform di variabel "module-level" (di luar fungsi),
// supaya bisa diakses ulang oleh fungsi search TANPA fetch lagi
let allPlatforms = [];

function renderFilteredConsoles(keyword = "") {
  const gridContainer = document.querySelector("#console-results");

  const filtered = keyword
    ? allPlatforms.filter((platform) =>
        platform.name.toLowerCase().includes(keyword.toLowerCase()),
      )
    : allPlatforms;

  if (filtered.length === 0) {
    gridContainer.innerHTML = `<p class="status-message">Console tidak ditemukan.</p>`;
    return;
  }

  const cardsHTML = filtered.map(createConsoleCard).join("");
  gridContainer.innerHTML = `<div class="console-grid">${cardsHTML}</div>`;
}

export async function renderConsolesList(params, container) {
  container.innerHTML = `<p class="status-message">Memuat daftar console...</p>`;

  try {
    const data = await getPlatforms();
    allPlatforms = data.results; // simpan untuk dipakai fungsi search

    container.innerHTML = `
      <section class="page">
        <a href="#/" class="back-link">\u2190 Kembali ke Home</a>
        <h1 class="page__title">Pilih Console</h1>
        <p class="page__subtitle">Modern maupun retro, semua ada di sini.</p>

        <input
          type="search"
          id="console-search-input"
          class="search-input"
          placeholder="Cari console (misal: PlayStation, SNES)..."
        />

        <div id="console-results"></div>
      </section>
    `;

    const searchInput = document.querySelector("#console-search-input");
    const debouncedSearch = debounce((event) => {
      renderFilteredConsoles(event.target.value.trim());
    }, 300);

    searchInput.addEventListener("input", debouncedSearch);

    // Tampilkan semua console pertama kali (tanpa keyword)
    renderFilteredConsoles();
  } catch (error) {
    console.error(error);
    container.innerHTML = `
      <section class="page">
        <a href="#/" class="back-link">\u2190 Kembali ke Home</a>
        <p class="status-message status-message--error">Gagal memuat daftar console.</p>
      </section>
    `;
  }
}
