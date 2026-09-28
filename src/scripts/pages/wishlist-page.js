import { getGameDetail } from "../data/api.js";
import { getWishlist } from "../data/wishlist.js";
import { createGameCard } from "../components/gameCard.js";

export async function renderWishlistPage(params, container) {
  container.innerHTML = `<p class="status-message">Memuat wishlist...</p>`;

  const slugs = getWishlist();

  // Kalau wishlist kosong, tidak perlu fetch apapun -- langsung
  // tampilkan pesan, hemat request
  if (slugs.length === 0) {
    container.innerHTML = `
      <section class="page">
        <h1 class="page__title">Wishlist Kamu</h1>
        <p class="status-message">
          Belum ada game favorit. Klik ikon bintang di game manapun untuk menambahkannya.
        </p>
      </section>
    `;
    return;
  }

  try {
    // slugs.map(...) menghasilkan ARRAY OF PROMISES (belum "selesai"
    // semua, baru "dijanjikan"). Promise.all() menunggu SEMUA
    // Promise itu selesai bersamaan, baru lanjut ke baris berikutnya.
    const games = await Promise.all(slugs.map((slug) => getGameDetail(slug)));

    const cardsHTML = games.map(createGameCard).join("");

    container.innerHTML = `
      <section class="page">
        <h1 class="page__title">Wishlist Kamu</h1>
        <p class="page__subtitle">${games.length} game tersimpan</p>
        <div class="game-grid">
          ${cardsHTML}
        </div>
      </section>
    `;
  } catch (error) {
    console.error(error);
    container.innerHTML = `
      <section class="page">
        <h1 class="page__title">Wishlist Kamu</h1>
        <p class="status-message status-message--error">Gagal memuat wishlist.</p>
      </section>
    `;
  }
}
