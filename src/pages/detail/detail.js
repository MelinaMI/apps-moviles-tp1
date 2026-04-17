import './detail.css';
import { gameService } from '../../services/gameService.js';
import templateHTML from './detail.html?raw';
import { Image } from '../../components/GameDetail/Image/Image.js';
import { Header } from '../../components/GameDetail/Header/Header.js';

import { Description } from '../../components/GameDetail/Description/Description.js';
import { Info } from '../../components/GameDetail/Info/Info.js';
import { Platforms } from '../../components/GameDetail/Platform/Platform.js';
import { Links } from '../../components/GameDetail/Links/Links.js';

export function DetailPage(id) {
  const container = document.createElement('div');
  container.className = 'detail-page';

  loadGame(id, container);

  return container;
}
async function loadGame(id, container) {
  try {
    const game = await gameService.getById(id);

    if (!game) throw new Error('Game vacío');

    renderGame(game, container);

  } catch (error) {
    console.error(error);
    renderError(container);
  }
}
function renderGame(game, container) {
  container.innerHTML = templateHTML;

  const root = container.firstElementChild;

  const mountPoint = root.querySelector('[data-ref="detail"]');

  const wrapper = document.createElement('div');
  wrapper.className = 'game-detail';


  wrapper.appendChild(Image(game));
  wrapper.appendChild(Header(game));
  wrapper.appendChild(Description(game));
  wrapper.appendChild(Info(game));
  wrapper.appendChild(Platforms(game));
  wrapper.appendChild(Links(game));
  wrapper.appendChild(BackButton());

  mountPoint.appendChild(wrapper);
}
function BackButton() {
  const btn = document.createElement('button');
  btn.textContent = 'Back';

  btn.onclick = () => history.back();

  return btn;
}