import { escapeHTML } from "../utils/escape.js";
import { createSpinner } from "../utils/spinner.js";
import { createGameCard } from "../components/gameCard.js";
import {
  getGameList,
  getPlatforms,
  getGenres,
  getDevelopers,
} from "../data/api.js";
import { navigateTo } from "../router/router.js";

//Fungsi untuk menunda delay waktu
function debounce(callback, delay = 500) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

//Fungsi untuk membuat kode HTML pada saat pengguna mengetik di kolom pencarian
function createLiveSearchItem(game) {
  return `
    <a href="#/game/${game.slug}" class="live-search-item">
      <img src="${game.background_image}" alt="${escapeHTML(game.name)}" />
      <div class="live-search-item-info">
        <span class="live-search-item-title">${escapeHTML(game.name)}</span>
        <span class="live-search-item-rating">
          <i class="fa-solid fa-star" aria-hidden="true"></i> ${game.rating}
        </span>
      </div>
    </a>
  `;
}

//Fungsi untuk membuat dan menyisipkan elemen option ke dalam select
function populateSelect(
  selectElement,
  items,
  placeholderText,
  valueKey = "slug",
) {
  const optionsHTML = items
    .map((item) => `<option value="${item[valueKey]}">${item.name}</option>`)
    .join("");

  selectElement.innerHTML = `
    <option value="">${placeholderText}</option>
    ${optionsHTML}
  `;
}

//Fungsi untuk mengambil data dari server/API dan memasukan ke dalam dropdown filters
async function populateFilterDropdowns() {
  const consoleSelect = document.querySelector("#filter-console");
  const genreSelect = document.querySelector("#filter-genre");
  const developerSelect = document.querySelector("#filter-developer");

  try {
    const [platformsData, genresData, developersData] = await Promise.all([
      getPlatforms(),
      getGenres(),
      getDevelopers(),
    ]);

    populateSelect(
      consoleSelect,
      platformsData.results,
      "Select Console",
      "id",
    );
    populateSelect(genreSelect, genresData.results, "Select Genre", "slug");
    populateSelect(
      developerSelect,
      developersData.results,
      "Select Developer",
      "slug",
    );
  } catch (error) {
    console.error("Failed to load filter options:", error);
  }
}

//Fungsi untuk mengambil data dari API berdasarkan kata kunci yang diketik
async function renderLiveSearch(keyword) {
  const dropdown = document.querySelector("#live-search-results");

  if (!keyword) {
    dropdown.innerHTML = "";
    dropdown.classList.remove("is-open");
    return;
  }

  try {
    const data = await getGameList({ search: keyword, page_size: 10 });

    if (data.results.length === 0) {
      dropdown.innerHTML = `<p class="live-search-empty">No games found.</p>`;
    } else {
      dropdown.innerHTML = data.results.map(createLiveSearchItem).join("");
    }

    dropdown.classList.add("is-open");
  } catch (error) {
    console.error(error);
    dropdown.innerHTML = `<p class="live-search-empty">Search failed.</p>`;
  }
}

//Fungsi untuk merender tampilan utama UI
export async function renderHome(params, container) {
  container.innerHTML = `
    <section class="hero" aria-labelledby="heroTitle">
      <div class="hero-image"></div>
      <div class="container">
        <div class="section-card">
          <div class="section-header">
            <h1 class="section-title" id="heroTitle">Retro<span>Dex</span></h1>
            <p class="section-subtitle">
              Explore the catalog of modern and retro console games.
            </p>
          </div>

          <form
            class="search-form"
            role="search"
            aria-label="Search platforms, genres, games"
          >
            <div class="search-panel">
              <label for="searchInput" hidden
                >Search a consoles, genres, games</label
              >
              <input
                type="search"
                id="searchInput"
                class="search-input"
                placeholder="Search genres, games, consoles"
              />
              <button type="button" id="clearSearch" class="clear-search" aria-label="Clear Search"></button>
              <div id="live-search-results" class="live-search-dropdown"></div>
            </div>
            

            <div class="filter-row">
              <div class="filter-group">
                <label for="filter-console">Console</label>
                <select id="filter-console" class="filter-select">
                  <option value="">Select Console</option>
                </select>
              </div>

              <div class="filter-group">
                <label for="filter-genre">Genre</label>
                <select id="filter-genre" class="filter-select">
                  <option value="">Select Genre</option>
                </select>
              </div>

              <div class="filter-group">
                <label for="filter-developer">Developer</label>
                <select id="filter-developer" class="filter-select">
                  <option value="">Select Developer</option>
                </select>
              </div>

              <div class="filter-group">
                <label for="sort-by">Sort By</label>
                <select id="sort-by" class="filter-select">
                  <option value="">Select Sort</option>
                  <option value="-added">Most Popular</option>
                  <option value="name">A-Z</option>
                  <option value="-name">Z-A</option>
                  <option value="-released">Latest</option>
                  <option value="released">Oldest</option>
                </select>
              </div>

              <div class="filter-actions">
                <button id="reset-filters" class="reset-btn" type="button">Reset</button>
                <button id="search-filters" class="search-btn" type="submit">Search</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>

    <section class="latest-games">
      <div class="container">
        <h2 class="section-title latest-section">Latest Games</h2>
        <div id="latest-games-grid" class="game-grid">
          ${createSpinner()}
        </div>
      </div>
    </section>

    <section class="about-section">
      <div class="container">
        <div class="section-card about-card">
          <div class="section-header about-inner">
            <h2 class="section-title">Welcome to RetroDex</h2>
            <p class="section-subtitle about">
              RetroDex is a console game catalog that brings together thousands
              of titles—ranging from modern to retro generations—in one place.
              Be enjoy.
            </p>
          </div>
        </div>
      </div>
    </section>
  `;

  const searchForm = document.querySelector(".search-form");
  const searchInput = document.querySelector("#searchInput");
  const clearSearchBtn = document.querySelector("#clearSearch");
  const resetBtn = document.querySelector("#reset-filters");

  const debouncedLiveSearch = debounce((event) => {
    renderLiveSearch(event.target.value.trim());
  }, 500);

  searchInput.addEventListener("input", debouncedLiveSearch);

  clearSearchBtn.addEventListener("click", () => {
    searchInput.value = "";
    renderLiveSearch("");
    searchInput.focus();
  });

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const params = new URLSearchParams();
    const keyword = searchInput.value.trim();
    if (keyword) params.set("q", keyword);

    const consoleValue = document.querySelector("#filter-console").value;
    const genreValue = document.querySelector("#filter-genre").value;
    const developerValue = document.querySelector("#filter-developer").value;
    const sortValue = document.querySelector("#sort-by").value;

    if (consoleValue) params.set("platform", consoleValue);
    if (genreValue) params.set("genre", genreValue);
    if (developerValue) params.set("developer", developerValue);
    if (sortValue) params.set("sort", sortValue);

    navigateTo(`/search?${params.toString()}`);
  });

  document.addEventListener("click", (event) => {
    const isClickInsideSearch =
      event.target.closest(".search-panel") ||
      event.target.closest("#live-search-results");
    if (!isClickInsideSearch) {
      document
        .querySelector("#live-search-results")
        ?.classList.remove("is-open");
    }
  });

  resetBtn.addEventListener("click", () => {
    searchInput.value = "";
    document.querySelector("#filter-console").value = "";
    document.querySelector("#filter-genre").value = "";
    document.querySelector("#filter-developer").value = "";
    document.querySelector("#sort-by").value = "";

    renderLiveSearch("");
  });

  renderLatestGames();
  populateFilterDropdowns();
}

async function renderLatestGames() {
  const container = document.querySelector("#latest-games-grid");

  try {
    const today = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(today.getMonth() - 6);

    const formatDate = (date) => date.toISOString().split("T")[0];
    const data = await getGameList({
      ordering: "-released",
      dates: `${formatDate(sixMonthsAgo)},${formatDate(today)}`,
      page_size: 8,
    });

    const cardsHTML = data.results.map(createGameCard).join("");
    container.innerHTML = cardsHTML;
  } catch (error) {
    console.error(error);
    container.innerHTML = `<p class="status-message status-message--error">Failed to load latest games.</p>`;
  }
}
