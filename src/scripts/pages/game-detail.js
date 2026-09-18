export async function renderGameDetail(params, container) {
  const { slug } = params;
  container.innerHTML = `
    <section>
      <a href="#/">&larr; Kembali ke Home</a>
      <h1>Detail Game</h1>
      <p>Slug game: <code>${slug}</code></p>
    </section>
  `;
}
