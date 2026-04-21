import headerTemplate from './Header.html?raw'
import './Header.css'
import { addFavoriteGame, removeFavoriteGame, isFavoriteGame } from '../../../storage/favoriteStorage.js'
import { WishlistForm } from '../../WishlistForm/WishlistForm.js'

let template = null;

function initTemplate() {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = headerTemplate;
  template = wrapper.firstElementChild;
}

export function Header(game) {
  if (!template) initTemplate();

  const node = template.cloneNode(true);
  const find = (ref) => node.querySelector(`[data-ref="${ref}"]`);

  find('rating').textContent = `${game.rating ?? 'N/A'}`;
  find('released').textContent = game.released ?? 'Unknown date';

  const favBtn = find('favorite-btn');
  const icon = favBtn.querySelector('i');

  // ✅ WishlistForm se monta solo en body — no hace falta node.appendChild
  const wishlistForm = WishlistForm({
    game,
    onSubmit: ({ game, extraData }) => {
      addFavoriteGame(game, extraData);
      updateUI();
    }
  });

  function updateUI() {
    if (isFavoriteGame(game.id)) {
      favBtn.classList.add('active');
      icon.classList.remove('fa-regular');
      icon.classList.add('fa-solid');
    } else {
      favBtn.classList.remove('active');
      icon.classList.remove('fa-solid');
      icon.classList.add('fa-regular');
    }
  }

  updateUI();

  favBtn.addEventListener('click', () => {
    if (isFavoriteGame(game.id)) {
      removeFavoriteGame(game.id);
      updateUI();
    } else {
      wishlistForm.open();
    }
  });

  return node;
}