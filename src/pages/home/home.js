import homeTemplate           from './home.html?raw'
import './home.css'
import { createSearchBar }    from '../../components/SearchBar/SearchBar.js'
import { createFilterPanel }  from '../../components/FilterPanel/FilterPanel.js'
import { createGameCard }     from '../../components/GameCard/GameCard.js'
import { createGenreCard }    from '../../components/GenreCard/GenreCard.js'
import { createPlatformCard } from '../../components/PlatformCard/PlatformCard.js'
import { createSkeletonCard } from '../../components/SkeletonCard/SkeletonCard.js'
import { gameService }        from '../../services/gameService.js'
import { genreService }       from '../../services/genreService.js'
import { platformService }    from '../../services/platformService.js'
import { navigateTo }         from '../../router.js'

const GAMES_PREVIEW_SIZE     = 6
const GENRES_PREVIEW_SIZE    = 8
const PLATFORMS_PREVIEW_SIZE = 8

let template = null

function buildTemplate() {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = homeTemplate
  return wrapper.querySelector('#home-template')
}

export async function HomePage() {
  if (!template) template = buildTemplate()

  const fragment = template.content.cloneNode(true)
  const page = fragment.querySelector('.home-page')

  mountRedirectSearchBar(page)
  mountRedirectFilterPanel(page)

  const gamesGrid     = page.querySelector('#home-games-grid')
  const genresGrid    = page.querySelector('#home-genres-grid')
  const platformsGrid = page.querySelector('#home-platforms-grid')

  renderSkeletons(gamesGrid,     GAMES_PREVIEW_SIZE)
  renderSkeletons(genresGrid,    GENRES_PREVIEW_SIZE)
  renderSkeletons(platformsGrid, PLATFORMS_PREVIEW_SIZE)

  loadGamesPreview(gamesGrid)
  loadGenresPreview(genresGrid)
  loadPlatformsPreview(platformsGrid)

  return page
}

function mountRedirectSearchBar(page) {
  page.querySelector('#home-search-bar-mount').appendChild(
    createSearchBar({
      onSearch: (query) => navigateTo(`/search?search=${encodeURIComponent(query)}`),
    })
  )
}

function mountRedirectFilterPanel(page) {
  createFilterPanel({
    onFilterChange: (filters) => navigateTo(buildSearchUrl(filters)),
  }).then((filterPanel) => {
    page.querySelector('#home-filter-panel-mount').appendChild(filterPanel)
  })
}

function buildSearchUrl(filters) {
  const params = new URLSearchParams()
  if (filters.genres)    params.set('genres',    filters.genres)
  if (filters.stores)    params.set('stores',    filters.stores)
  if (filters.platforms) params.set('platforms', filters.platforms)
  if (filters.ordering)  params.set('ordering',  filters.ordering)
  return `/search?${params.toString()}`
}

async function loadGamesPreview(container) {
  const data = await gameService.getAll({ page_size: GAMES_PREVIEW_SIZE })
  container.innerHTML = ''
  data.results.forEach(game => container.appendChild(createGameCard(game)))
}

async function loadGenresPreview(container) {
  const data = await genreService.getAll({ page_size: GENRES_PREVIEW_SIZE })
  container.innerHTML = ''
  data.results.forEach(genre => container.appendChild(createGenreCard(genre)))
}

async function loadPlatformsPreview(container) {
  const data = await platformService.getAll({ page_size: PLATFORMS_PREVIEW_SIZE })
  container.innerHTML = ''
  data.results.forEach(platform => container.appendChild(createPlatformCard(platform)))
}

function renderSkeletons(container, count) {
  container.innerHTML = ''
  Array.from({ length: count }).forEach(() =>
    container.appendChild(createSkeletonCard())
  )
}