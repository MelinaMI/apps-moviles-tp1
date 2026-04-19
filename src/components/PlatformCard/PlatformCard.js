import platformCardTemplate from './PlatformCard.html?raw'
import { navigateTo } from '../../router.js'

let template = null

function initTemplate() {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = platformCardTemplate
  template = wrapper.querySelector('#platform-card-template')
}

export function createPlatformCard(platform) {
  if (!template) initTemplate()

  const fragment = template.content.cloneNode(true)
  const card = fragment.querySelector('.game-card')
  const find = (ref) => fragment.querySelector(`[data-ref="${ref}"]`)

  find('image').src = platform.image_background || ''
  find('image').alt = platform.name
  find('title').textContent = platform.name

  card.addEventListener('click', () => navigateTo(`/search?platforms=${platform.id}`))

  return fragment

}