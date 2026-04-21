import templateHTML from './FavoriteCard.html?raw';
import './FavoriteCard.css';

let template;

function ensureTemplate() {
  if (!template) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = templateHTML;
    template = wrapper.querySelector('#favorite-card-template');
    if (!template) {
      throw new Error('FavoriteCard template not found');
    }
  }
}

export function createFavoriteCard(game, onRemove) {
  ensureTemplate();

  const clone = template.content.cloneNode(true);
  const node = clone.firstElementChild;

  const img      = node.querySelector('.fav-img');
  const title    = node.querySelector('.fav-title');
  const priority = node.querySelector('.fav-priority');
  const category = node.querySelector('.fav-category');
  const noteRow  = node.querySelector('.fav-note-row');
  const note     = node.querySelector('.fav-note');
  const heart    = node.querySelector('.fav-heart');

  img.src = game.image;
  img.alt = game.name;

  title.textContent    = game.name;
  priority.textContent = game.priority;
  category.textContent = game.category;

  if (game.note) {
    note.textContent  = game.note;
    noteRow.style.display = '';
  }

  heart.addEventListener('click', () => {
    onRemove?.(game.id);
  });

  return node;
}