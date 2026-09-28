const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const BASE_URL = "https://api.rawg.io/api";
let cachedGenres = null;
let cachedPlatforms = null;
let cachedParentPlatforms = null;
let cachedDevelopers = null;

//Fungsi untuk menyusun query string URL
function buildQueryString(paramsObject) {
  const merged = { key: API_KEY, ...paramsObject };
  const cleaned = Object.fromEntries(
    Object.entries(merged).filter(
      ([, value]) => value !== "" && value !== undefined && value !== null,
    ),
  );

  const params = new URLSearchParams(cleaned);
  return params.toString();
}

//Fungsi untuk mengambil daftar game dari endpoint /games
export async function getGameList(filters = {}) {
  const finalFilters = { ...filters };

  if (finalFilters.search) {
    finalFilters.search_precise = true;
  }

  const queryString = buildQueryString(finalFilters);
  const response = await fetch(`${BASE_URL}/games?${queryString}`);

  if (!response.ok) {
    throw new Error(
      `Failed to retrieve the game list (status: ${response.status})`,
    );
  }

  return response.json();
}

//Fungsi untuk mengambil data detail lengkap dari satu game (berdasarkan ID)
export async function getGameDetail(idOrSlug) {
  const queryString = buildQueryString({});
  const response = await fetch(`${BASE_URL}/games/${idOrSlug}?${queryString}`);

  if (!response.ok) {
    throw new Error(
      `Failed to retrieve game details (status: ${response.status})`,
    );
  }

  return response.json();
}

//Fungsi untuk mengambil daftar genre game
export async function getGenres() {
  if (cachedGenres) {
    return cachedGenres;
  }

  const queryString = buildQueryString({});
  const response = await fetch(`${BASE_URL}/genres?${queryString}`);

  if (!response.ok) {
    throw new Error(
      `Failed to retrieve list of genres (status: ${response.status})`,
    );
  }

  const data = await response.json();
  cachedGenres = data;

  return data;
}

//Fungsi untuk mengambil data platform game secara lebih rinci
export async function getPlatforms() {
  if (cachedPlatforms) {
    return cachedPlatforms;
  }

  const queryString = buildQueryString({ page_size: 50 });
  const response = await fetch(`${BASE_URL}/platforms?${queryString}`);

  if (!response.ok) {
    throw new Error(
      `Failed to retrieve the list of platforms (status: ${response.status})`,
    );
  }

  const data = await response.json();
  cachedPlatforms = data;

  return data;
}

//Fungsi untuk mengambil daftar kategori besar platform
export async function getParentPlatforms() {
  if (cachedParentPlatforms) {
    return cachedParentPlatforms;
  }

  const queryString = buildQueryString({});
  const response = await fetch(
    `${BASE_URL}/platforms/lists/parents?${queryString}`,
  );

  if (!response.ok) {
    throw new Error(
      `Failed to retrieve parent platforms (status: ${response.status})`,
    );
  }

  const data = await response.json();
  cachedParentPlatforms = data;

  return data;
}

//Fungsi untuk mengambil data developer
export async function getDevelopers() {
  if (cachedDevelopers) {
    return cachedDevelopers;
  }

  const queryString = buildQueryString({ page_size: 40 });
  const response = await fetch(`${BASE_URL}/developers?${queryString}`);

  if (!response.ok) {
    throw new Error(
      `Failed to retrieve list of developers (status: ${response.status})`,
    );
  }

  const data = await response.json();
  cachedDevelopers = data;

  return data;
}
