import headerTemplate from './Header.html?raw';
import './Header.css';
import { Star, Calendar } from 'lucide';
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

  return node;
}