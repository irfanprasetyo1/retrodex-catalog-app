import { navigateTo } from "../router/router.js";
import { fetchAndRenderGames, buildOrdering } from "../utils/gameResults.js";

//Fungsi untuk menampilkan semua game dari satu console tertentu
export async function renderPlatformResults(params, container, searchParams) {
  const platformId = params.id;
  const platformName = searchParams.get("name") || "This Console";

  const initialKeyword = searchParams.get("q") || "";
  const initialPage = Number(searchParams.get("page")) || 1;

  const filters = {
    search: initialKeyword,
    page: initialPage,
  };

  container.innerHTML = `
    <section class="page">
      <div class="container">
        <h1 class="page-title">${platformName}</h1>
        <p class="page-subtitle" id="search-summary">
          ${
            initialKeyword
              ? `Showing results for "${initialKeyword}" on ${platformName}`
              : `Browsing all games on ${platformName}`
          }
        </p>
 
        <form id="platform-search-form" class="platform-search-form" role="search">
          <div class="search-panel">
            <label for="platform-search-input" hidden>Search within ${platformName}</label>
            <input
              type="search"
              id="platform-search-input"
              class="search-input"
              placeholder="Search games on ${platformName}..."
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
    urlParams.set("name", platformName);
    urlParams.set("page", newPage);
    return `/platform/${platformId}?${urlParams.toString()}`;
  }

  document
    .querySelector("#platform-search-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const keyword = document
        .querySelector("#platform-search-input")
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
      platforms: platformId,
      ordering: buildOrdering("added", "desc"),
    },
    {
      page: filters.page,
      onPageChange: goToPage,
      emptyMessage: filters.search
        ? `No games found for "${filters.search}" on ${platformName}.`
        : `No games found on ${platformName}.`,
    },
  );
}
