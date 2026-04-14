import { registerRoute, navigateTo } from './router.js'
import { MainLayout } from './layout/MainLayout/MainLayout.js'
import { HomePage }      from './pages/home/home.js'
import { PlatformsPage } from './pages/platforms/platforms.js'
import { GenresPage }    from './pages/genres/genres.js'
import './styles/global.css'

function render(pageContent) {
  const app = document.getElementById('app')
  app.innerHTML = ''
  app.appendChild(MainLayout(pageContent))
}

registerRoute('/',          () => render(HomePage()))
registerRoute('/home',      () => render(HomePage()))
registerRoute('/platforms', () => render(PlatformsPage()))
registerRoute('/genres',    () => render(GenresPage()))
registerRoute('*',          () => render(HomePage()))

document.addEventListener('DOMContentLoaded', () => navigateTo(location.pathname))


//import { searchPage }   from './pages/search/search.js';
//import { detailPage }   from './pages/detail/detail.js';
//import { wishlistPage } from './pages/wishlist/wishlist.js';
//import { historyPage }  from './pages/history/history.js';
//import { contactPage }  from './pages/contact/contact.js';
//registerRoute('/search', searchPage);
//registerRoute('/detail', detailPage);   
//registerRoute('/wishlist', wishlistPage);
//registerRoute('/history', historyPage);
//registerRoute('/contact', contactPage);