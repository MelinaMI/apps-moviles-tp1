import gameCardTemplate from './GameCard.html?raw';
import './GameCard.css';

let template = null;

function initTemplate() {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = gameCardTemplate;
  template = wrapper.querySelector('#game-card-template');
}

export function createGameCard(game) {
  if (!template) 
    initTemplate();

  const card = template.content.cloneNode(true);
  const find = (ref) => card.querySelector(`[data-ref="${ref}"]`);

  find('image').src = game.background_image || '';
  find('image').alt = game.name;

  find('title').textContent = game.name;
  
  return card;
}