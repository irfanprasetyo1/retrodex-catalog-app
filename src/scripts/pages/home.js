import { getGameList } from "../data/api.js";
import { createGameCard } from "../components/gameCard.js";

//Fungsi untuk merender halaman home
export async function renderHome(params, container) {
  container.innerHTML = `<p class="status-message">Loading popular games...</p>`;

  try {
    const data = await getGameList({ ordering: "-rating", page_size: 12 });
    const cardsHTML = data.results.map(createGameCard).join("");

    container.innerHTML = `
      <section class="page">
        <h1 class="page-title">RetroDex</h1>
        <p class="page-subtitle">Popular modern and retro game consoles in one place.</p>
        <div class="game-grid">
          ${cardsHTML}
        </div>
      </section>
    `;
  } catch (error) {
    console.error(error);
    container.innerHTML = `<p class="status-message status-message-error">Failed to load game data. Try refresh the page.</p>`;
  }
}
