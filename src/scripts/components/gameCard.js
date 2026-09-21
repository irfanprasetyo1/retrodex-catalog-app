//Fungsi untuk mengubah objek game menjadi string HTML
export function createGameCard(game) {
  return `
    <a href="#/game/${game.slug}" class="game-card">
      <div class="game-card-image">
        <img src="${game.background_image}" alt="${game.name}" />
      </div>
      <div class="game-card-body">
        <h3 class="game-card-title">${game.name}</h3>
        <span class="game-card-rating">\u2605 ${game.rating}</span>
      </div>
    </a>
  `;
}
