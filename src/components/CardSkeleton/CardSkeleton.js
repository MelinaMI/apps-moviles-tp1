import templateHTML from './CardSkeleton.html?raw';
import './CardSkeleton.css';

let template = null;

function initTemplate() {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = templateHTML.trim();
  template = wrapper.firstElementChild;
}

export function CardSkeleton({ variant = 'default', index = 0 } = {}) {
  if (!template) initTemplate();

  const node = template.cloneNode(true);

  node.classList.add(`card-skeleton--${variant}`);


  const delay = (index % 8) * 40;
  node.style.animationDelay = `${delay}ms`;

  return node;
}