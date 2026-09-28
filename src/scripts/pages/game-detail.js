import { getGameDetail } from "../data/api.js";
import { createSpinner } from "../utils/spinner.js";

//Fungsi untuk mengamankan teks dari API sebelum dimasukan ke innerHTML
function escapeHTML(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

//Fungsi untuk mengubah format tanggal
function formatReleaseDate(dateString) {
  if (!dateString) return "TBA";

  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

//Fungsi untuk membuat deretan chip dari array (genre, platform, dll)
function createChipList(items, getName) {
  if (!items || items.length === 0) {
    return `<p class="detail-empty">-</p>`;
  }

  const chipsHTML = items
    .map(
      (item) => `<span class="detail-chip">${escapeHTML(getName(item))}</span>`,
    )
    .join("");

  return `<div class="detail-chip-list">${chipsHTML}</div>`;
}

//Fungsi untuk membuat teks dari array nama dan dipisahkan oleh koma
function joinNames(items) {
  if (!items || items.length === 0) return "-";
  return items.map((item) => escapeHTML(item.name)).join(", ");
}

//Fungsi untuk membuat HTML halaman detail dari data game
function createGameDetailHTML(game) {
  const heroStyle = game.background_image
    ? `style="background-image: url('${game.background_image}')"`
    : "";

  const description = game.description_raw
    ? escapeHTML(game.description_raw)
    : "No description available for this game.";

  const rating = game.rating ? `${game.rating} / ${game.rating_top}` : "N/A";
  const metacritic = game.metacritic ?? "N/A";

  return `
    <section class="page game-detail">
      <div class="container">
        <a href="#/" class="detail-back" id="detail-back">
          <i class="fa-solid fa-arrow-left" aria-hidden="true"></i> Back
        </a>
 
        <div class="detail-hero" ${heroStyle} role="img" aria-label="${escapeHTML(game.name)} cover image"></div>
 
        <h1 class="detail-title">${escapeHTML(game.name)}</h1>
 
        <div class="detail-stats">
          <div class="detail-stat">
            <span class="detail-stat-label">Released</span>
            <span class="detail-stat-value">${formatReleaseDate(game.released)}</span>
          </div>
          <div class="detail-stat">
            <span class="detail-stat-label">Rating</span>
            <span class="detail-stat-value">${rating}</span>
          </div>
          <div class="detail-stat">
            <span class="detail-stat-label">Metacritic</span>
            <span class="detail-stat-value">${metacritic}</span>
          </div>
        </div>
 
        <div class="detail-section">
          <h2 class="detail-heading">About</h2>
          <p class="detail-description">${description}</p>
        </div>
 
        <div class="detail-section">
          <h2 class="detail-heading">Genres</h2>
          ${createChipList(game.genres, (genre) => genre.name)}
        </div>
 
        <div class="detail-section">
          <h2 class="detail-heading">Platforms</h2>
          ${createChipList(game.platforms, (item) => item.platform.name)}
        </div>
 
        <div class="detail-section">
          <h2 class="detail-heading">Developers</h2>
          <p class="detail-text">${joinNames(game.developers)}</p>
        </div>
 
        <div class="detail-section">
          <h2 class="detail-heading">Publishers</h2>
          <p class="detail-text">${joinNames(game.publishers)}</p>
        </div>
      </div>
    </section>
  `;
}

//Fungsi untuk merender halaman detail game (route: /game/:slug)
export async function renderGameDetail(params, container) {
  container.innerHTML = `
    <section class="page">
      <div class="container">
        ${createSpinner()}
      </div>
    </section>
  `;

  try {
    const game = await getGameDetail(params.slug);
    container.innerHTML = createGameDetailHTML(game);

    document
      .querySelector("#detail-back")
      .addEventListener("click", (event) => {
        event.preventDefault();
        window.history.back();
      });
  } catch (error) {
    console.error("Failed to load game detail:", error);
    container.innerHTML = `
      <section class="page">
        <div class="container">
          <p class="status-message status-message--error">Failed to load this game.</p>
        </div>
      </section>
    `;
  }
}
