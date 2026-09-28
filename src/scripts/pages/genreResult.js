import { navigateTo } from "../router/router.js";
import { fetchAndRenderGames, buildOrdering } from "../utils/gameResults.js";

//Fungsi untuk menampilkan semua genre
export async function renderGenreResults(params, container, searchParams) {
  const genreSlug = params.slug;
  const genreName = searchParams.get("name") || "This Genre";

  const initialKeyword = searchParams.get("q") || "";
  const initialPage = Number(searchParams.get("page")) || 1;

  const filters = {
    search: initialKeyword,
    page: initialPage,
  };

  container.innerHTML = `
    <section class="page">
      <div class="container">
        <h1 class="page-title">${genreName}</h1>
        <p class="page-subtitle" id="search-summary">
          ${
            initialKeyword
              ? `Showing results for "${initialKeyword}" in ${genreName}`
              : `Browsing all ${genreName} games`
          }
        </p>

        <form id="genre-search-form" class="genre-search-form" role="search">
          <div class="search-panel">
            <label for="genre-search-input" hidden>Search within ${genreName}</label>
            <input
              type="search"
              id="genre-search-input"
              class="search-input"
              placeholder="Search ${genreName} games..."
              value="${initialKeyword}"
              autocomplete="off"
            />
          </div>
          <button type="submit" class="search-btn">Search</button>
        </form>

        <div id="search-results"></div>

        <nav id="pagination-nav" class="pagination-nav" aria-label="Pagination"></nav>
      </div>
    </section>
  `;

  function buildUrl(newPage) {
    const urlParams = new URLSearchParams();
    if (filters.search) urlParams.set("q", filters.search);
    urlParams.set("name", genreName);
    urlParams.set("page", newPage);
    return `/genre/${genreSlug}?${urlParams.toString()}`;
  }

  document
    .querySelector("#genre-search-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const keyword = document
        .querySelector("#genre-search-input")
        .value.trim();

      filters.search = keyword;
      navigateTo(buildUrl(1));
    });

  function goToPage(newPage) {
    filters.page = newPage;
    navigateTo(buildUrl(newPage));
  }

  fetchAndRenderGames(
    {
      search: filters.search,
      genres: genreSlug,
      ordering: buildOrdering("added", "desc"),
    },
    {
      page: filters.page,
      onPageChange: goToPage,
      emptyMessage: filters.search
        ? `No games found for "${filters.search}" in ${genreName}.`
        : `No games found in ${genreName}.`,
    },
  );
}
