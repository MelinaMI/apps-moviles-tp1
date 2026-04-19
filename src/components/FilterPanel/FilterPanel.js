import filterPanelTemplate from './FilterPanel.html?raw'
import { genreService }    from '../../services/genreService.js'
import { storeService }    from '../../services/storeService.js'
import { platformService } from '../../services/platformService.js'
import './FilterPanel.css'

let template = null

function buildTemplate() {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = filterPanelTemplate
  return wrapper.querySelector('#filter-panel-template')
}

function populateSelect(selectEl, items) {
  items.forEach(({ id, name }) => {
    const option = document.createElement('option')
    option.value = id
    option.textContent = name
    selectEl.appendChild(option)
  })
}

function applyInitialValues(root, initialValues) {
  const find = (ref) => root.querySelector(`[data-ref="${ref}"]`)
  if (initialValues.genres)    find('genre').value    = initialValues.genres
  if (initialValues.stores)    find('store').value    = initialValues.stores
  if (initialValues.platforms) find('platform').value = initialValues.platforms
  if (initialValues.ordering)  find('ordering').value = initialValues.ordering
}

function readFilters(root) {
  const find = (ref) => root.querySelector(`[data-ref="${ref}"]`)
  return {
    genres:    find('genre').value,
    stores:    find('store').value,
    platforms: find('platform').value,
    ordering:  find('ordering').value,
  }
}

export async function createFilterPanel({ onFilterChange, initialValues = {} }) {
  if (!template) template = buildTemplate()

  const fragment = template.content.cloneNode(true)
  const root = fragment.querySelector('.filter-panel')
  const find = (ref) => root.querySelector(`[data-ref="${ref}"]`)

  const [genreData, storeData, platformData] = await Promise.all([
    genreService.getAll(),
    storeService.getAll(),
    platformService.getAll(),
  ])

  populateSelect(find('genre'),    genreData.results)
  populateSelect(find('store'),    storeData.results)
  populateSelect(find('platform'), platformData.results)

  applyInitialValues(root, initialValues)

  root.addEventListener('change', () => onFilterChange(readFilters(root)))

  return fragment
}