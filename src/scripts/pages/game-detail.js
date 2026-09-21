import { getGameDetail } from "../data/api.js";

export async function renderGameDetail(params, container) {
  const { slug } = params;
  container.innerHTML = `<p class="status-message">Loading game details...</p>`;

  try {
    const game = await getGameDetail(slug);
    const genreNames = game.genres.map((g) => g.name).join(", ");
    const platformNames = game.platforms.map((p) => p.platform.name).join(", ");

    container.innerHTML = `
      <section class="page">
        <a href="#/" class="back-link">\u2190 Return to homepage</a>

        <img
          src="${game.background_image}"
          alt="${game.name}"
          class="detail-image"
        />

        <h1 class="page-title">${game.name}</h1>

        <div class="detail-meta">
          <span class="game-card-rating">\u2605 ${game.rating} / 5</span>
          <span>Metacritic: ${game.metacritic ?? "N/A"}</span>
          <span>Release: ${game.released ?? "N/A"}</span>
        </div>

        <p class="detail-row"><strong>Genre:</strong> ${genreNames}</p>
        <p class="detail-row"><strong>Platform:</strong> ${platformNames}</p>

        <p class="detail-description">${game.description_raw}</p>
      </section>
    `;
  } catch (error) {
    console.error(error);
    container.innerHTML = `
      <section class="page">
        <a href="#/" class="back-link">\u2190 Return to homepage</a>
        <p class="status-message status-message-error">Failed to load game details</p>
      </section>
    `;
  }
}
