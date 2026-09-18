export function renderNotFound() {
  const container = document.querySelector("#app");
  container.innerHTML = `
    <section>
      <h1>404</h1>
      <p>Halaman tidak ditemukan.</p>
      <a href="#/">&larr; Kembali ke Home</a>
    </section>
  `;
}
