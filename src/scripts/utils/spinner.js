//Fungsi untuk membuat HTML loading spinner
export function createSpinner(text = "Loading...") {
  return `
    <div class="spinner-wrap" role="status" aria-live="polite">
      <span class="spinner" aria-hidden="true"></span>
      <span class="spinner-text">${text}</span>
    </div>
  `;
}
