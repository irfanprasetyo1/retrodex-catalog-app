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
