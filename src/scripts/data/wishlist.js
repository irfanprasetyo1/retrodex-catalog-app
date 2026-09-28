// =============================================================
// WISHLIST.JS — Satu-satunya file yang "tahu" cara baca/tulis
// wishlist ke localStorage. File lain (navbar, gameCard, dll)
// akan memanggil fungsi dari sini, tidak akses localStorage
// langsung.
// =============================================================

const STORAGE_KEY = "retrodex:wishlist";

/**
 * Ambil daftar SLUG game yang ada di wishlist.
 * Dibungkus try/catch karena localStorage bisa gagal
 * (private browsing, storage penuh, dll)
 */
export function getWishlist() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error("Gagal membaca wishlist:", error);
    return [];
  }
}

/**
 * Cek apakah satu game (by slug) ada di wishlist.
 */
export function isInWishlist(slug) {
  return getWishlist().includes(slug);
}

/**
 * Tambah/hapus game dari wishlist (toggle).
 * Mengembalikan wishlist TERBARU setelah perubahan.
 */
export function toggleWishlist(slug) {
  const current = getWishlist();
  const alreadyExists = current.includes(slug);

  const updated = alreadyExists
    ? current.filter((item) => item !== slug) // hapus
    : [...current, slug]; // tambah

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Gagal menyimpan wishlist:", error);
  }

  return updated;
}
