const routes = [];

//Fungsi untuk mengubah pola path string menjadi Regular Expression (RegExp)
export function registerRoute(path, renderFn) {
  const paramNames = [];
  const regexPattern = path
    .split("/")
    .map((segment) => {
      if (segment.startsWith(":")) {
        paramNames.push(segment.slice(1));
        return "([^/]+)";
      }
      return segment;
    })
    .join("/");

  const regex = new RegExp(`^${regexPattern}$`);
  routes.push({ regex, paramNames, renderFn });
}

//Fungsi untuk mencari routes yang cocok dengan URL hash saat ini
function matchRoute(hashPath) {
  for (const route of routes) {
    const match = hashPath.match(route.regex);

    if (match) {
      const params = {};
      route.paramNames.forEach((name, index) => {
        params[name] = decodeURIComponent(match[index + 1]);
      });
      return { renderFn: route.renderFn, params };
    }
  }
  return null;
}

let notFoundHandler = () => {
  document.querySelector("#app").innerHTML =
    `<p class="not-found">Page not found</p>`;
};

//Fungsi untuk menangani kustom jika URL hash tidak cocok dengan rute yang terdaftar
export function setNotFoundHandler(fn) {
  notFoundHandler = fn;
}

//Fungsi untuk mengambil nilai hash URL saat ini
async function handleRouteChange() {
  const container = document.querySelector("#app");
  const fullHash = window.location.hash.slice(1) || "/";
  const [hashPath, queryString] = fullHash.split("?");
  const searchParams = new URLSearchParams(queryString || "");
  const matched = matchRoute(hashPath);

  if (!matched) {
    notFoundHandler();
    return;
  }

  window.scrollTo(0, 0);

  try {
    await matched.renderFn(matched.params, container, searchParams);
  } catch (error) {
    console.error("Failed to render page:", error);
    container.innerHTML = `<p class="not-found">An error occurred while loading the page</p>`;
  }
}

//Fungsi untuk mengaktifkan router dengan mendaftarkan event listener
export function startRouter() {
  window.addEventListener("hashchange", handleRouteChange);
  handleRouteChange();
}

//Fungsi untuk melakukan navigasi halaman secaa programatis dengan memperbarui nilai
export function navigateTo(path) {
  window.location.hash = path;
}
