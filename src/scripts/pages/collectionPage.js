import { getCollection } from "../data/collection.js";
import { createGameCard } from "../components/gameCard.js";

const PAGE_CONFIG = {
  wishlist: {
    title: "My Wishlist",
    subtitle: "Games you want to play someday.",
    emptyText: "Your wishlist is empty.",
  },
  library: {
    title: "My Library",
    subtitle: "Games you own or have played.",
    emptyText: "Your library is empty.",
  },
};

//Fungsi untuk membuat teks jumlah game
function createCountText(count) {
  return `${count} ${count === 1 ? "game" : "games"}`;
}

//Fungsi untuk membuat tampilan saat daftar kosong
function createEmptyHTML(emptyText) {
  return `
    <p class="status-message">
      ${emptyText}
      <a href="#/" class="collection-empty-link">Browse games</a>
    </p>
  `;
}

//Fungsi untuk merender halaman Wishlist maupun Library
function renderCollectionPage(type, container) {
  const config = PAGE_CONFIG[type];
  const games = getCollection(type);

  const contentHTML =
    games.length === 0
      ? createEmptyHTML(config.emptyText)
      : `<div class="game-grid">${games.map(createGameCard).join("")}</div>`;

  container.innerHTML = `
    <section class="page">
      <div class="container">
        <h1 class="page-title">${config.title}</h1>
        <p class="page-subtitle">${config.subtitle}</p>
        <p class="collection-count" id="collection-count">${createCountText(games.length)}</p>
 
        <div id="collection-content">${contentHTML}</div>
      </div>
    </section>
  `;

  const content = document.querySelector("#collection-content");

  content.addEventListener("collectionchange", (event) => {
    const { type: changedType, isActive } = event.detail;
    if (changedType !== type || isActive) return;

    event.target.closest(".game-card")?.remove();

    const remaining = content.querySelectorAll(".game-card").length;
    document.querySelector("#collection-count").textContent =
      createCountText(remaining);

    if (remaining === 0) {
      content.innerHTML = createEmptyHTML(config.emptyText);
    }
  });
}

//Fungsi untuk merender halaman wishlist
export function renderWishlist(params, container) {
  renderCollectionPage("wishlist", container);
}

//Fungsi untuk merender halaman library
export function renderLibrary(params, container) {
  renderCollectionPage("library", container);
}
