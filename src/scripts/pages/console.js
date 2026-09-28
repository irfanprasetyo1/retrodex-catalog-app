/*
import { getGameList, getPlatforms } from "../data/api.js";
import { createGameCard } from "../components/gameCard.js";

export async function renderConsole(params, container) {
  const { slug } = params;

  container.innerHTML = `<p class="status-message">Data console loading...</p>`;
  try {
    const platformsData = await getPlatforms();
    const matchedPlatform = platformsData.results.find(
      (platform) => platform.slug === slug,
    );

    if (!matchedPlatform) {
      container.innerHTML = `
        <section class="page">
          <a href="#/" class="back-link">\u2190 return to homepage</a>
          <p class="status-message status-message-error">
            Console "${slug}" not found.
          </p>
        </section>
      `;
      return;
    }

    const gameData = await getGameList({
      platforms: matchedPlatform.id,
      ordering: "-rating",
      page_size: 12,
    });
    const cardsHTML = gameData.results.map(createGameCard).join("");
    container.innerHTML = `
      <section class="page">
        <a href="#/" class="back-link">\u2190 Return to home</a>
        <h1 class="page-title">${matchedPlatform.name}</h1>
        <p class="page-subtitle">${gameData.count} game found</p>
        <div class="game-grid">
          ${cardsHTML}
        </div>
      </section>
    `;
  } catch (error) {
    console.error(error);
    container.innerHTML = `
      <section class="page">
        <a href="#/" class="back-link">\u2190 Return to homepage</a>
        <p class="status-message status-message-error">Failed to load game data. Try refresh the page.</p>
      </section>
    `;
  }
}
*/

// =============================================================
// PAGES/CONSOLE.JS
// =============================================================

import { getGameList, getPlatforms } from "../data/api.js";
import { createGameCard } from "../components/gameCard.js";

function debounce(callback, delay = 400) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

function buildOrdering(field, direction) {
  return direction === "desc" ? `-${field}` : field;
}

async function fetchAndRenderGames(platformId, filters) {
  const gridContainer = document.querySelector("#game-results");
  gridContainer.innerHTML = `<p class="status-message">Memuat...</p>`;

  try {
    const data = await getGameList({
      platforms: platformId,
      search: filters.search,
      ordering: buildOrdering(filters.sortField, filters.sortDirection),
      page_size: 12,
    });

    if (data.results.length === 0) {
      gridContainer.innerHTML = `<p class="status-message">Tidak ada game yang cocok.</p>`;
      return;
    }

    const cardsHTML = data.results.map(createGameCard).join("");
    gridContainer.innerHTML = `<div class="game-grid">${cardsHTML}</div>`;
  } catch (error) {
    console.error(error);
    gridContainer.innerHTML = `<p class="status-message status-message--error">Gagal memuat data game.</p>`;
  }
}

export async function renderConsole(params, container) {
  const { slug } = params;

  container.innerHTML = `<p class="status-message">Memuat data console...</p>`;

  try {
    const platformsData = await getPlatforms();
    const matchedPlatform = platformsData.results.find(
      (platform) => platform.slug === slug,
    );

    if (!matchedPlatform) {
      container.innerHTML = `
        <section class="page">
          <a href="#/" class="back-link">\u2190 Kembali ke Home</a>
          <p class="status-message status-message--error">Console "${slug}" tidak ditemukan.</p>
        </section>
      `;
      return;
    }

    const filters = {
      search: "",
      sortField: "rating",
      sortDirection: "desc",
    };

    container.innerHTML = `
      <section class="page">
        <a href="#/" class="back-link">\u2190 Kembali ke Home</a>
        <h1 class="page__title">${matchedPlatform.name}</h1>
        <p class="page__subtitle">${matchedPlatform.games_count} game tersedia</p>

        <input
          type="search"
          id="search-input"
          class="search-input"
          placeholder="Cari game di ${matchedPlatform.name}..."
        />

        <div class="filter-bar">
          <select id="sort-field" class="filter-select">
            <option value="rating">Rating</option>
            <option value="added">Popularitas</option>
            <option value="released">Tanggal Rilis</option>
            <option value="name">Nama</option>
          </select>

          <select id="sort-direction" class="filter-select">
            <option value="desc">Tertinggi \u2192 Terendah</option>
            <option value="asc">Terendah \u2192 Tertinggi</option>
          </select>
        </div>

        <div id="game-results"></div>
      </section>
    `;

    const searchInput = document.querySelector("#search-input");
    const sortFieldSelect = document.querySelector("#sort-field");
    const sortDirectionSelect = document.querySelector("#sort-direction");

    const debouncedFetch = debounce(() => {
      fetchAndRenderGames(matchedPlatform.id, filters);
    }, 400);

    searchInput.addEventListener("input", (event) => {
      filters.search = event.target.value.trim();
      debouncedFetch();
    });

    sortFieldSelect.addEventListener("change", (event) => {
      filters.sortField = event.target.value;
      fetchAndRenderGames(matchedPlatform.id, filters);
    });

    sortDirectionSelect.addEventListener("change", (event) => {
      filters.sortDirection = event.target.value;
      fetchAndRenderGames(matchedPlatform.id, filters);
    });

    fetchAndRenderGames(matchedPlatform.id, filters);
  } catch (error) {
    console.error(error);
    container.innerHTML = `
      <section class="page">
        <a href="#/" class="back-link">\u2190 Kembali ke Home</a>
        <p class="status-message status-message--error">Gagal memuat data. Coba refresh halaman.</p>
      </section>
    `;
  }
}
