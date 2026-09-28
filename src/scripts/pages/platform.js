import { createSpinner } from "../utils/spinner.js";
import { getParentPlatforms } from "../data/api.js";
import { getPlatformIcon } from "../data/platformIcons.js";
import { navigateTo } from "../router/router.js";

//Fungsi untuk membuat kode HTML satu card kategori platform beserta daftar console di dalamnya
function createPlatformCategoryCard(parentPlatform) {
  const childConsoles = parentPlatform.platforms || [];
  const chipsHTML = childConsoles
    .map(
      (console) => `
        <button
          type="button"
          class="platform-chip"
          data-platform-id="${console.id}"
          data-platform-name="${console.name}"
        >
          ${console.name}
        </button>
      `,
    )
    .join("");

  return `
    <div class="platform-category-card">
      <div class="platform-category-header">
        <i class="${getPlatformIcon(parentPlatform.slug)} platform-category-icon" aria-hidden="true"></i>
        <h2 class="platform-category-title">${parentPlatform.name}</h2>
      </div>
 
      <div class="platform-chip-list">
        ${chipsHTML || `<p class="status-message">No consoles available.</p>`}
      </div>
    </div>
  `;
}

//Fungsi untuk merender tampilan utama halaman Platform
export async function renderPlatform(params, container) {
  container.innerHTML = `
    <section class="page">
      <div class="container">
        <h1 class="page-title">Browse by Platform</h1>
        <p class="page-subtitle">
          Pick a console below to see every game available for it.
        </p>
 
        <div id="platform-category-list" class="platform-category-list">
          ${createSpinner()}
        </div>
      </div>
    </section>
  `;

  const listContainer = document.querySelector("#platform-category-list");

  try {
    const data = await getParentPlatforms();

    if (!data.results || data.results.length === 0) {
      listContainer.innerHTML = `<p class="status-message">No platforms found.</p>`;
      return;
    }

    listContainer.innerHTML = data.results
      .map(createPlatformCategoryCard)
      .join("");
  } catch (error) {
    console.error("Failed to load platforms:", error);
    listContainer.innerHTML = `<p class="status-message status-message--error">Failed to load platforms.</p>`;
  }

  listContainer.addEventListener("click", (event) => {
    const chip = event.target.closest(".platform-chip");
    if (!chip) return;

    const platformId = chip.dataset.platformId;
    const platformName = chip.dataset.platformName;
    navigateTo(
      `/platform/${platformId}?name=${encodeURIComponent(platformName)}`,
    );
  });
}
