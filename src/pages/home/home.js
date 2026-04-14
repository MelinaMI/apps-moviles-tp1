import homeTemplate from './home.html?raw'
import { createGameCard } from '../../components/GameCard/GameCard'
import { gameService } from '../../services/gameService'
import './home.css'

export function HomePage() {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = homeTemplate

  const container = wrapper.querySelector('#highlight-game-list')
  gameService.getAll().then(data => renderHighlightGames(data.results, container))

  return wrapper.firstElementChild
}


function renderHighlightGames(games, container){
  games.forEach(game => container.appendChild(createGameCard(game)))
}

