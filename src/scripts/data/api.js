const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const BASE_URL = "https://api.rawg.io/api";
let cachedPlatforms = null;
let cachedParentPlatforms = null;

function buildQueryString(paramsObject) {
  const params = new URLSearchParams({ key: API_KEY, ...paramsObject });
  return params.toString();
}

export async function getGameList(filters = {}) {
  const queryString = buildQueryString(filters);
  const response = await fetch(`${BASE_URL}/games?${queryString}`);

  if (!response.ok) {
    throw new Error(`Gagal mengambil daftar game (status: ${response.status})`);
  }

  return response.json();
}

export async function getGameDetail(idOrSlug) {
  const queryString = buildQueryString({});
  const response = await fetch(`${BASE_URL}/games/${idOrSlug}?${queryString}`);

  if (!response.ok) {
    throw new Error(`Gagal mengambil detail game (status: ${response.status})`);
  }

  return response.json();
}

export async function getParentPlatforms() {
  if (cachedParentPlatforms) {
    return cachedParentPlatforms;
  }

  const queryString = buildQueryString({});
  const response = await fetch(
    `${BASE_URL}/platforms/lists/parents?${queryString}`,
  );

  if (!response.ok) {
    throw new Error(`Gagal mengambil detail game (status: ${response.status})`);
  }

  const data = await response.json();
  cachedParentPlatforms = data;

  return data;
}

export async function getPlatforms() {
  if (cachedPlatforms) {
    return cachedPlatforms;
  }

  const queryString = buildQueryString({ page_size: 50 });
  const response = await fetch(`${BASE_URL}/platforms?${queryString}`);

  if (!response.ok) {
    throw new Error(
      `Gagal mengambil daftar platform (status: ${response.status})`,
    );
  }

  const data = await response.json();
  cachedPlatforms = data;

  return data;
}
