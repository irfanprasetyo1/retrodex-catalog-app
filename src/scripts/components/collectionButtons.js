import { toggleInCollection } from "../data/collection.js";
import { showSuccess, showInfo } from "../utils/toast.js";

const BUTTON_CONFIG = {
  wishlist: {
    selector: ".wishlist-btn",
    datasetKey: "wishlistSlug",
    activeClass: "wishlist-btn-active",
    addLabel: "Add to wishlist",
    removeLabel: "Remove from wishlist",
    addedMessage: "Added to wishlist",
    removedMessage: "Removed from wishlist",
  },
  library: {
    selector: ".library-btn",
    datasetKey: "librarySlug",
    activeClass: "library-btn-active",
    addLabel: "Add to library",
    removeLabel: "Remove from library",
    addedMessage: "Added to library",
    removedMessage: "Removed from library",
  },
};

//Fungsi untuk memperbarui tampilan tombol status (aktif / tidak)
function updateButtonState(button, config, isActive) {
  button.classList.toggle(config.activeClass, isActive);
  button.setAttribute("aria-pressed", String(isActive));
  button.setAttribute(
    "aria-label",
    isActive ? config.removeLabel : config.addLabel,
  );
}

//Fungsi untuk mengaktifkan satu listener global yang menangani semua tombol wishlist & library di seluruh halaman
export function initCollectionButtons() {
  document.addEventListener("click", (event) => {
    for (const [type, config] of Object.entries(BUTTON_CONFIG)) {
      const button = event.target.closest(config.selector);
      if (!button) continue;

      const slug = button.dataset[config.datasetKey];
      const isActive = toggleInCollection(type, slug);
      updateButtonState(button, config, isActive);

      if (isActive) {
        showSuccess(config.addedMessage);
      } else {
        showInfo(config.removedMessage);
      }

      button.dispatchEvent(
        new CustomEvent("collectionchange", {
          bubbles: true,
          detail: { type, slug, isActive },
        }),
      );
      return;
    }
  });
}
