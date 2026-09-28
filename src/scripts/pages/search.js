import { navigateTo } from "../router/router.js";
import { fetchAndRenderGames, buildOrdering } from "../utils/gameResults.js";

//Fungsi untuk menampilkan hasil pencarian di homepage
export async function renderSearch(params, container, searchParams) {
  const initialKeyword = searchParams.get("q") || "";
  const initialSort = searchParams.get("sort") || "-added";
  const initialPage = Number(searchParams.get("page")) || 1;
  const initialPlatform = searchParams.get("platform") || "";
  const initialGenre = searchParams.get("genre") || "";
  const initialDeveloper = searchParams.get("developer") || "";

  const initialSortField = initialSort.startsWith("-")
    ? initialSort.slice(1)
    : initialSort;
  const initialSortDirection = initialSort.startsWith("-") ? "desc" : "asc";

  const filters = {
    search: initialKeyword,
    platform: initialPlatform,
    genre: initialGenre,
    developer: initialDeveloper,
    sortField: initialSortField,
    sortDirection: initialSortDirection,
    page: initialPage,
  };

  container.innerHTML = `
    <section class="page">
      <div class="container">
        <h1 class="page-title">Search Results</h1>
        <p class="page-subtitle" id="search-summary">
          ${initialKeyword ? `Showing results for "${initialKeyword}"` : "Showing all games"}
        </p>

        <div id="search-results"></div>

        <nav id="pagination-nav" class="pagination-nav" aria-label="Pagination"></nav>
      </div>
    </section>
  `;

  function goToPage(newPage) {
    filters.page = newPage;

    const urlParams = new URLSearchParams();
    if (filters.search) urlParams.set("q", filters.search);
    if (filters.platform) urlParams.set("platform", filters.platform);
    if (filters.genre) urlParams.set("genre", filters.genre);
    if (filters.developer) urlParams.set("developer", filters.developer);
    urlParams.set(
      "sort",
      buildOrdering(filters.sortField, filters.sortDirection),
    );
    urlParams.set("page", newPage);

    navigateTo(`/search?${urlParams.toString()}`);
  }

  fetchAndRenderGames(
    {
      search: filters.search,
      platforms: filters.platform,
      genres: filters.genre,
      developers: filters.developer,
      ordering: buildOrdering(filters.sortField, filters.sortDirection),
    },
    {
      page: filters.page,
      onPageChange: goToPage,
      emptyMessage: filters.search
        ? `No games found for "${filters.search}".`
        : "No games found.",
    },
  );
}
