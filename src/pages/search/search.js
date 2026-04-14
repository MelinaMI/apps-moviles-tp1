import searchTemplate from './search.html?raw'
import { createGameCard } from '../../components/GameCard/GameCard'
import { gameService } from '../../services/gameService'
import './search.css'

export function SearchPage() {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = searchTemplate

  const container = wrapper.querySelector('#game-list')
  gameService.getAll().then(data => renderGames(data.results, container))

  return wrapper.firstElementChild
}

function renderGames(games, container){
  games.forEach(game => container.appendChild(createGameCard(game)))
}