import { registerRoute, navigateTo } from './router.js';
import { homePage }      from './pages/home/home.js';
import { platformsPage } from './pages/platforms/platforms.js';
//import { searchPage }   from './pages/search/search.js';
//import { detailPage }   from './pages/detail/detail.js';
//import { wishlistPage } from './pages/wishlist/wishlist.js';
//import { historyPage }  from './pages/history/history.js';
//import { contactPage }  from './pages/contact/contact.js';
import { genresPage } from  './pages/genres/genres.js'


registerRoute('/',          homePage);
registerRoute('/home',      homePage);
registerRoute('/platforms', platformsPage);
//registerRoute('/search',   searchPage);
//registerRoute('/detail',   detailPage);   
//registerRoute('/wishlist', wishlistPage);
//registerRoute('/history',  historyPage);
//registerRoute('/contact',  contactPage);
registerRoute( '/genres', genresPage);
registerRoute('*',          homePage);

navigateTo(location.pathname);