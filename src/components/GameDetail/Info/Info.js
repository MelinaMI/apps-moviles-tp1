import templateHTML from './Info.html?raw';
import './Info.css';
let template = null;

function initTemplate() {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = templateHTML;
  template = wrapper.firstElementChild;
}

export function Info(game) {
  if (!template) initTemplate();

  const node = template.cloneNode(true);
  const find = (ref) => node.querySelector(`[data-ref="${ref}"]`);

  find('name').textContent = game.name_original || '-';
  find('metacritic').textContent = game.metacritic || 'N/A';
  find('playtime').textContent = game.playtime || 0;
  find('esrb').textContent = game.esrb_rating?.name || 'N/A';

  return node;
}