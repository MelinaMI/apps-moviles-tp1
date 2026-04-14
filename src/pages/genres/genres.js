import genresTemplate from './genres.html?raw'
import './genres.css'
import { genreService } from '../../services/genreService.js'
import { GenreCard, GenreCardSkeleton } from '../../components/GenreCard/GenreCard.js'

export function GenresPage() {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = genresTemplate
  const page = wrapper.firstElementChild

  loadGenres(page)

  return page
}

async function loadGenres(page) {
  const grid = page.querySelector('#genres-grid')
  const errorContainer = page.querySelector('#genres-error')
  const errorMsg = page.querySelector('#genres-error-msg')
  const retryBtn = page.querySelector('#genres-retry')

  grid.innerHTML = Array.from({ length: 12 }, () => GenreCardSkeleton()).join('')
  errorContainer.hidden = true

  try {
    const { results: genres } = await genreService.getAll()
    grid.innerHTML = genres.map((genre, index) => GenreCard(genre, index)).join('')
  } catch (err) {
    grid.innerHTML = ''
    errorMsg.textContent = err.message || 'No se pudieron cargar los géneros. Revisá tu conexión.'
    errorContainer.hidden = false
    retryBtn.onclick = () => loadGenres(page)
  }
}