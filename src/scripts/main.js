import "../styles/style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  registerRoute,
  setNotFoundHandler,
  startRouter,
} from "./router/router.js";
import { renderNavbar } from "./components/navbar.js";
import { initToggle } from "./components/theme.js";
import { initMenu } from "./components/menu.js";
import { initCollectionButtons } from "./components/collectionButtons.js";
import { renderHome } from "./pages/home.js";
import { renderSearch } from "./pages/search.js";
import { renderPlatform } from "./pages/platform.js";
import { renderPlatformResults } from "./pages/platformResults.js";
import { renderGameDetail } from "./pages/game-detail.js";
import { renderGenre } from "./pages/genre.js";
import { renderGenreResults } from "./pages/genreResult.js";
import { renderWishlist, renderLibrary } from "./pages/collectionPage.js";
import { renderNotFound } from "./pages/not-found.js";

renderNavbar();
initToggle();
initMenu();
initCollectionButtons();

registerRoute("/", renderHome);
registerRoute("/search", renderSearch);
registerRoute("/platform", renderPlatform);
registerRoute("/platform/:id", renderPlatformResults);
registerRoute("/game/:slug", renderGameDetail);
registerRoute("/genre", renderGenre);
registerRoute("/genre/:slug", renderGenreResults);
registerRoute("/wishlist", renderWishlist);
registerRoute("/library", renderLibrary);
setNotFoundHandler(renderNotFound);

startRouter();
