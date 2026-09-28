import { getGenres } from "../data/api.js";
import { createSpinner } from "../utils/spinner.js";

//Fungsi untuk membuat kode HTML card genre
function createGenreCard(genre) {
  const backgroundStyle = genre.image_background
    ? `style="background-image: url('${genre.image_background}')"`
    : "";

  const gamesCount = (genre.games_count ?? 0).toLocaleString("en-US");
  const href = `#/genre/${genre.slug}?name=${encodeURIComponent(genre.name)}`;

  return `
    <a href="${href}" class="genre-card" ${backgroundStyle}>
      <div class="genre-card-overlay">
        <h2 class="genre-card-title">${genre.name}</h2>
        <p class="genre-card-count">${gamesCount} games</p>
      </div>
    </a>
  `;
}

//Fungsi untuk merender tampilan utama halaman Genres
export async function renderGenre(params, container) {
  container.innerHTML = `
    <section class="page">
      <div class="container">
        <h1 class="page-title">Browse by Genre</h1>
        <p class="page-subtitle">
          Pick a genre below to see every game that belongs to it.
        </p>
 
        <div id="genre-grid" class="genre-grid">
          ${createSpinner()}
        </div>
      </div>
    </section>
  `;

  const gridContainer = document.querySelector("#genre-grid");

  try {
    const data = await getGenres();

    if (!data.results || data.results.length === 0) {
      gridContainer.innerHTML = `<p class="status-message">No genres found.</p>`;
      return;
    }

    gridContainer.innerHTML = data.results.map(createGenreCard).join("");
  } catch (error) {
    console.error("Failed to load genres:", error);
    gridContainer.innerHTML = `<p class="status-message status-message--error">Failed to load genres.</p>`;
  }
}
