import templateHTML from './Description.html?raw';
import './Description.css';
export function Description(game) {
  const container = document.createElement('div');
  container.innerHTML = templateHTML;

  const root = container.firstElementChild;

  const text = root.querySelector('[data-ref="description"]');
  const btn = root.querySelector('[data-ref="toggle"]');

  text.innerHTML = game.description_raw || '';

  let expanded = false;

  btn.addEventListener('click', () => {
    expanded = !expanded;

    root.classList.toggle('expanded', expanded);
    btn.textContent = expanded ? 'Show less' : 'Read more';
  });

  return root;
}