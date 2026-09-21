import { getPlatforms } from "../data/api.js";

function createConsoleCard(platform) {
  return `
    <a href="#/console/${platform.slug}" class="console-card">
      <h3 class="console-card-name">${platform.name}</h3>
      <p class="console-card-count">${platform.games_count} game</p>
    </a>
  `;
}

export async function renderConsolesList(params, container) {
  container.innerHTML = `<p class="status-message">Loading console list...</p>`;

  try {
    const data = await getPlatforms();
    const cardsHTML = data.results.map(createConsoleCard).join("");

    container.innerHTML = `
      <section class="page">
        <a href="#/" class="back-link">\u2190 Return to homepage</a>
        <h1 class="page-title">Choose console</h1>
        <p class="page-subtitle">Modern or retro, it's all here.</p>
        <div class="console-grid">
          ${cardsHTML}
        </div>
      </section>
    `;
  } catch (error) {
    console.error(error);
    container.innerHTML = `
      <section class="page">
        <a href="#/" class="back-link">\u2190 Return to homepage</a>
        <p class="status-message status-message-error">Failed to load console list.</p>
      </section>
    `;
  }
}
