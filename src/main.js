import { registerRoute, navigateTo } from "./router.js";
import { homePage } from "./pages/home/home.js";

registerRoute('/', homePage);
registerRoute('/home', homePage);
registerRoute('*', homePage);

navigateTo(location.pathname);