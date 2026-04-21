import favoritesTemplate from './favorites.html?raw';
import './favorites.css';

import { getFavoriteGames, removeFavoriteGame } from '../../storage/favoriteStorage.js';
import { createFavoriteCard } from '../../components/FavoriteCard/FavoriteCard.js';

export function FavoritesPage() {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = favoritesTemplate;
  const root = wrapper.firstElementChild;
  renderFavorites(root);
  return root;
}

function renderFavorites(root) {
  const listContainer = root.querySelector('#favorites-list');
  const emptyState = root.querySelector('#empty-state');

  if (!listContainer) return;

  const favorites = getFavoriteGames();

  listContainer.innerHTML = '';

  if (!favorites.length) {
    emptyState?.classList.remove('hidden');
    return;
  }

  emptyState?.classList.add('hidden');

  favorites.forEach(game => {
    const card = createFavoriteCard(game, (id) => {
      removeFavoriteGame(id);
      renderFavorites(root);
    });



    listContainer.appendChild(card);
  });
}