import templateHTML from './Links.html?raw';
import './Links.css';
let template = null;

function initTemplate() {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = templateHTML;
  template = wrapper.firstElementChild;
}

export function Links(game) {
  if (!template) initTemplate();

  const node = template.cloneNode(true);
  const find = (ref) => node.querySelector(`[data-ref="${ref}"]`);

  find('website').href = game.website || '#';
  find('reddit').href = game.reddit_url || '#';

  return node;
}