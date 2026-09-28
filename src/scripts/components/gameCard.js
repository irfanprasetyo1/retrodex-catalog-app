import { escapeHTML } from "../utils/escape.js";
import { getPlatformIcon } from "../data/platformIcons.js";
import { isInCollection, rememberGame } from "../data/collection.js";

//Fungsi untuk mengenerate kode HTML komponen GameCard
export function createGameCard(game) {
  rememberGame(game);

  const platforms = game.parent_platforms || [];
  const platformIconsHTML = platforms
    .map(
      (p) =>
        `<i class="${getPlatformIcon(p.platform.slug)}" aria-hidden="true"></i>`,
    )
    .join("");

  const inWishlist = isInCollection("wishlist", game.slug);
  const inLibrary = isInCollection("library", game.slug);

  return `
    <article class="game-card">
      <div class="game-card-image">
        <img src="${game.background_image}" alt="${escapeHTML(game.name)}" />
      </div>
 
      <div class="game-card-body">
        <div class="game-card-platforms" aria-hidden="true">
          ${platformIconsHTML}
        </div>
 
        <h3 class="game-card-title">
          <a href="#/game/${game.slug}" class="game-card-link">${escapeHTML(game.name)}</a>
        </h3>
 
        <div class="game-card-actions">
          <button
            class="icon-btn wishlist-btn ${inWishlist ? "wishlist-btn-active" : ""}"
            data-wishlist-slug="${game.slug}"
            aria-pressed="${inWishlist}"
            aria-label="${inWishlist ? "Remove from wishlist" : "Add to wishlist"}"
          >
            <i class="fa-solid fa-heart" aria-hidden="true"></i>
          </button>
 
          <button
            class="icon-btn library-btn ${inLibrary ? "library-btn-active" : ""}"
            data-library-slug="${game.slug}"
            aria-pressed="${inLibrary}"
            aria-label="${inLibrary ? "Remove from library" : "Add to library"}"
          >
            <i class="fa-solid fa-bookmark" aria-hidden="true"></i>
          </button>
 
          <span class="game-card-rating">
            <i class="fa-solid fa-star" aria-hidden="true"></i> ${game.rating}
          </span>
        </div>
      </div>
    </article>
  `;
}
