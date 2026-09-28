import { getGameList } from "../data/api.js";
import { createSpinner } from "./spinner.js";
import { createGameCard } from "../components/gameCard.js";
import { getPaginationRange } from "./pagination.js";

export const PAGE_SIZE = 12;

//Fungsi untuk mengubah field + arah menjadi format order yang di pahami RAWG API
export function buildOrdering(field, direction) {
  return direction === "desc" ? `-${field}` : field;
}

//Fungsi untuk merender tombol pagination
export function renderPaginationNav(currentPage, totalPages, onPageChange) {
  const nav = document.querySelector("#pagination-nav");
  if (!nav) return;

  if (totalPages <= 1) {
    nav.innerHTML = "";
    return;
  }

  const pages = getPaginationRange(currentPage, totalPages);

  const buttonsHTML = pages
    .map((page) => {
      if (page === "...") {
        return `<span class="pagination-ellipsis">...</span>`;
      }
      const isActive = page === currentPage;
      return `
        <button
          class="pagination-btn ${isActive ? "pagination-btn-active" : ""}"
          data-page="${page}"
          ${isActive ? 'aria-current="page"' : ""}
        >
          ${page}
        </button>
      `;
    })
    .join("");

  const prevDisabled = currentPage === 1 ? "disabled" : "";
  const nextDisabled = currentPage === totalPages ? "disabled" : "";

  nav.innerHTML = `
    <button class="pagination-btn pagination-btn-nav" data-page="${currentPage - 1}" ${prevDisabled}>
      <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>
    </button>
    ${buttonsHTML}
    <button class="pagination-btn pagination-btn-nav" data-page="${currentPage + 1}" ${nextDisabled}>
      <i class="fa-solid fa-chevron-right" aria-hidden="true"></i>
    </button>
  `;

  nav.onclick = (event) => {
    const btn = event.target.closest("[data-page]");
    if (!btn || btn.disabled) return;

    onPageChange(Number(btn.dataset.page));
  };
}

//Fungsi untuk fetch data game ke RAWG API lalu render grid + pagination
export async function fetchAndRenderGames(apiFilters, options) {
  const { page, onPageChange, emptyMessage = "No games found." } = options;

  const gridContainer = document.querySelector("#search-results");
  gridContainer.innerHTML = createSpinner("Searching...");

  try {
    const data = await getGameList({
      ...apiFilters,
      page_size: PAGE_SIZE,
      page,
    });

    if (data.results.length === 0) {
      gridContainer.innerHTML = `<p class="status-message">${emptyMessage}</p>`;
      document.querySelector("#pagination-nav").innerHTML = "";
      return;
    }

    const cardsHTML = data.results.map(createGameCard).join("");
    gridContainer.innerHTML = `<div class="game-grid">${cardsHTML}</div>`;

    const totalPages = Math.ceil(data.count / PAGE_SIZE);
    renderPaginationNav(page, totalPages, onPageChange);

    gridContainer.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (error) {
    console.error(error);
    gridContainer.innerHTML = `<p class="status-message status-message--error">Failed to load results.</p>`;
  }
}
