import './Image.css';
import templateHTML from './Image.html?raw';

let template = null;

function initTemplate() {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = templateHTML;
  template = wrapper.firstElementChild;
}

export function Image(game) {
  if (!template) initTemplate();

  const node = template.cloneNode(true);
  const img = node.querySelector('[data-ref="image"]');
  const title = node.querySelector('[data-ref="title"]');

  img.src = game.background_image || '';
  img.alt = game.name;
  title.textContent = game.name;

  return node;
}