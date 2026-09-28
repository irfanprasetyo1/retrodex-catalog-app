const STORAGE_KEYS = {
  wishlist: "retrodex-wishlist",
  library: "retrodex-library",
};
const gameRegistry = new Map();

//Fungsi untuk mencatat game yang sedang di render
export function rememberGame(game) {
  gameRegistry.set(game.slug, {
    id: game.id,
    slug: game.slug,
    name: game.name,
    background_image: game.background_image,
    rating: game.rating,
    parent_platforms: game.parent_platforms || [],
  });
}

//Fungsi untuk membaca daftar dari localStorage
function readList(type) {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS[type]);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error(`Failed to read ${type}:`, error);
    return [];
  }
}

//Fungsi untuk menyimpan daftar ke localStorage
function writeList(type, list) {
  try {
    localStorage.setItem(STORAGE_KEYS[type], JSON.stringify(list));
  } catch (error) {
    console.error(`Failed to save ${type}:`, error);
  }
}

//Fungsi untuk mengambil seluruh isi wishlist / library
export function getCollection(type) {
  return readList(type);
}

//Fungsi untuk mengecek apakah sebuah game sudah ada di wishlist / library
export function isInCollection(type, slug) {
  return readList(type).some((game) => game.slug === slug);
}

//Fungsi untuk menambah/menghapus game.
export function toggleInCollection(type, slug) {
  const list = readList(type);
  const alreadyAdded = list.some((game) => game.slug === slug);

  if (alreadyAdded) {
    writeList(
      type,
      list.filter((game) => game.slug !== slug),
    );
    return false;
  }

  const game = gameRegistry.get(slug);
  if (!game) return null;
  writeList(type, [game, ...list]);
  return true;
}
