import { getHistory, clearHistory } from '../../storage/historyStorage';
import { createHistoryCard } from '../../components/HistoryCard/HistoryCard.js';
import templateHTML from './history.html?raw';
import './history.css';

export function HistoryPage() {
  const container = document.createElement('div');
  container.innerHTML = templateHTML;

  const list     = container.querySelector('#history-list');
  const empty    = container.querySelector('#empty-state');
  const btnClear = container.querySelector('#btn-clear');

  function render() {
    list.innerHTML = '';
    const games = [...getHistory()].reverse(); 

    if (games.length === 0) {
      empty.classList.remove('hidden');
      list.classList.add('hidden');
      return;
    }

    empty.classList.add('hidden');
    list.classList.remove('hidden');

    games.forEach(game => list.appendChild(createHistoryCard(game)));
  }

  btnClear.addEventListener('click', () => {
    clearHistory();
    render();
  });

  render();
  return container;
}