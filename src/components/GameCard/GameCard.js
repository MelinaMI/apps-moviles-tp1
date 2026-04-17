import gameCardTemplate from './GameCard.html?raw';
import './GameCard.css';
import { navigateTo } from '../../router.js';

let template = null;

function initTemplate() {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = gameCardTemplate;
  template = wrapper.querySelector('#game-card-template');
}

export function createGameCard(game) {
  if (!template) 
    initTemplate();

  const fragment = template.content.cloneNode(true);
  const card = fragment.querySelector('.game-card');
  const find = (ref) => fragment.querySelector(`[data-ref="${ref}"]`);

  find('image').src = game.background_image || '';
  find('image').alt = game.name;
  find('title').textContent = game.name;
  
  card.addEventListener('click', () => {
      navigateTo(`/detail?id=${game.id}`);
    });

  return fragment;
}
