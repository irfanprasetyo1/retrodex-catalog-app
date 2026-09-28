//Fungsi untuk merender tampilan UI apabila tidak ditemukan
export function renderNotFound() {
  const container = document.querySelector("#app");
  container.innerHTML = `
    <section class="not-found-section">
      <div class="container">
        <div class="section-header">
          <h1>404</h1>
          <p>Page not found.</p>
          <a href="#/">Return to homepage</a>
        </div>
      </div>
    </section>
  `;
}
