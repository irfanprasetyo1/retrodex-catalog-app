import {
  registerRoute,
  setNotFoundHandler,
  startRouter,
} from "./router/router.js";
import { renderNavbar } from "./components/navbar.js";
import { renderHome } from "./pages/home.js";
import { renderConsole } from "./pages/console.js";
import { renderGameDetail } from "./pages/game-detail.js";
import { renderNotFound } from "./pages/not-found.js";
import { renderConsolesList } from "./pages/console-list.js";

renderNavbar();
registerRoute("/", renderHome);
registerRoute("/consoles", renderConsolesList);
registerRoute("/console/:slug", renderConsole);
registerRoute("/game/:slug", renderGameDetail);
setNotFoundHandler(renderNotFound);

startRouter();
