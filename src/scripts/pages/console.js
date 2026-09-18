export async function renderConsole(params, container) {
  const { slug } = params;
  container.innerHTML = `
    <section>
      <a href="#/">&larr; Kembali ke Home</a>
      <h1>Console: ${slug}</h1>
      <p>Ini membuktikan router berhasil menangkap parameter dari URL.</p>
      <p>Slug yang ditangkap: <code>${slug}</code></p>
    </section>
  `;
}
