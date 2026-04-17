import templateHTML from './Platform.html?raw';
import './Platform.css';
let template = null;

function initTemplate() {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = templateHTML;
  template = wrapper.firstElementChild;
}

export function Platforms(game) {
  if (!template) initTemplate();

  const node = template.cloneNode(true);

  const platforms =
  game.platforms
    ?.map(p => `<span class="platform-chip">${p.platform.name}</span>`)
    .join('') || 'Sin datos';

node.querySelector('[data-ref="platforms"]').innerHTML = platforms;

  return node;
}