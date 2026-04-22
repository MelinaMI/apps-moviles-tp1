import { getArgentinaDateTime } from "../utils/parseTime";


export function saveToHistory(game) {

    const history = JSON.parse(localStorage.getItem('history') || '[]');

      const alreadySaved = history.some(g => g.id === game.id);
      if (alreadySaved) return;

      history.push({
        id: game.id, 
        name: game.name, 
        photo: game.background_image, 
        description: stripHTML(game.description),
        visitedAt: getArgentinaDateTime()
      });


    localStorage.setItem('history', JSON.stringify(history));
}

export function getHistory() {
  return JSON.parse(localStorage.getItem('history') || '[]');
}

export function clearHistory() {
  localStorage.removeItem('history');
}

function stripHTML(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
}