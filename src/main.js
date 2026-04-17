import { registerRoute, navigateTo } from './router.js'
import { MainLayout } from './layout/MainLayout/MainLayout.js'
import { HomePage }      from './pages/home/home.js'
import { SearchPage }   from './pages/search/search.js';
import { PlatformsPage } from './pages/platforms/platforms.js'
import { GenresPage }    from './pages/genres/genres.js'
import { FavoritesPage } from './pages/favorites/favorites.js';
import { HistoryPage } from './pages/history/history.js';
import { ContactPage } from './pages/contact/contact.js';
import { DetailPage } from './pages/detail/detail.js';
import { FooterLinkBgChange } from './components/Footer/Footer.js';
import './styles/tokens.css'
import './styles/global.css'

function render(pageContent) {
  const app = document.getElementById('app')
  app.innerHTML = ''
  app.appendChild(MainLayout(pageContent))
  FooterLinkBgChange();
}

registerRoute('/', () => render(HomePage()))
registerRoute('/home', () => render(HomePage()))
registerRoute('/search', () => render(SearchPage()))
registerRoute('/favorites', () => render(FavoritesPage()))
registerRoute('/history', () => render(HistoryPage()))
registerRoute('/platforms', () => render(PlatformsPage()))
registerRoute('/genres', () => render(GenresPage()))
registerRoute('/contact', () => render(ContactPage()))
registerRoute('/detail', () => {
  const params = new URLSearchParams(location.search);
  const id = params.get('id');

  render(DetailPage(id));
});
registerRoute('*', () => render(HomePage()))

document.addEventListener('DOMContentLoaded', () => navigateTo(location.pathname))
