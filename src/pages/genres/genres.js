import genresTemplate     from './genres.html?raw'
import { createGenreCard }    from '../../components/GenreCard/GenreCard.js'
import { createSkeletonCard } from '../../components/SkeletonCard/SkeletonCard.js'
import { genreService }       from '../../services/genreService.js'
import './genres.css'

const SKELETON_COUNT = 12

export function GenresPage() {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = genresTemplate

  const page = wrapper.firstElementChild
  const grid = page.querySelector('#genres-grid')

  renderSkeletons(grid, SKELETON_COUNT)
  loadGenres(grid)

  return page
}


async function loadGenres(grid) {
  const data = await genreService.getAll()
  renderGenres(data.results, grid)
}

function renderGenres(genres, container) {
  container.innerHTML = ''
  genres.forEach(genre => container.appendChild(createGenreCard(genre)))
}

function renderSkeletons(container, count) {
  container.innerHTML = ''
  Array.from({ length: count }).forEach(() =>
    container.appendChild(createSkeletonCard())
  )
}
