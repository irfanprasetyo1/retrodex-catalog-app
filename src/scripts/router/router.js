const routes = [];

//Mengubah string URL path menjadi Regular Expression (RegExp)
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

//Fungsi untuk mencari route yang cocok dengan hash saat ini
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
  document.querySelector("#app").innerHTML = "<p>Halaman tidak ditemukan.</p>";
};

export function setNotFoundHandler(fn) {
  notFoundHandler = fn;
}

async function handleRouteChange() {
  const container = document.querySelector("#app");
  const hashPatch = window.location.hash.slice(1) || "/";
  const matched = matchRoute(hashPatch);

  if (!matched) {
    notFoundHandler();
    return;
  }

  window.scrollTo(0, 0);

  try {
    await matched.renderFn(matched.params, container);
  } catch (error) {
    console.error("Gagal render halaman:", error);
    container.innerHTML = `<p>Terjadi kesalahan saat memuat halaman.</p>`;
  }
}

export function startRouter() {
  window.addEventListener("hashchange", handleRouteChange);
  handleRouteChange();
}

export function navigateTo(path) {
  window.location.hash = path;
}
