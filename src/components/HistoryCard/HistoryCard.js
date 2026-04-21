import templateHTML from './HistoryCard.html?raw';
import './HistoryCard.css';

let template;

function initTemplate() {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = templateHTML;
  template = wrapper.querySelector('#history-card-template');
}

export function createHistoryCard(game) {
  if (!template) initTemplate();

  const card = template.content.cloneNode(true);
  const cardEl = card.querySelector('.history-card');

  card.querySelector('.history-card-photo').src = game.photo;
  card.querySelector('.history-card-photo').alt = game.name;
  card.querySelector('.history-card-name').textContent = game.name;
  card.querySelector('.history-card-description').textContent = game.description;
  card.querySelector('.history-card-date').textContent = game.visitedAt;

  cardEl.addEventListener('click', () => {
    history.pushState(null, '', `/detail?id=${game.id}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  });

  return cardEl;
}