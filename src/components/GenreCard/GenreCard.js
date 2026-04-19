import genreCardTemplate from './GenreCard.html?raw'
import { navigateTo } from '../../router.js'

let template = null

function initTemplate() {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = genreCardTemplate
  template = wrapper.querySelector('#genre-card-template')
}

export function createGenreCard(genre) {
  if (!template) initTemplate()

  const fragment = template.content.cloneNode(true)
  const card = fragment.querySelector('.game-card')
  const find = (ref) => fragment.querySelector(`[data-ref="${ref}"]`)

  find('image').src = genre.image_background || ''
  find('image').alt = genre.name
  find('title').textContent = genre.name

  card.addEventListener('click', () => navigateTo(`/search?genres=${genre.id}`))

  return fragment
}