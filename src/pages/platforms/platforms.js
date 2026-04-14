import platformsTemplate from './platforms.html?raw'
import './platforms.css'
import { platformService } from '../../services/platformService.js'
import { PlatformCard, PlatformCardSkeleton } from '../../components/PlatformCard/PlatformCard.js'

export function PlatformsPage() {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = platformsTemplate
  const page = wrapper.firstElementChild

  loadPlatforms(page)

  return page
}

async function loadPlatforms(page) {
  const grid = page.querySelector('#platforms-grid')
  const errorContainer = page.querySelector('#platforms-error')
  const errorMsg = page.querySelector('#platforms-error-msg')
  const retryBtn = page.querySelector('#platforms-retry')

  grid.innerHTML = Array.from({ length: 12 }, () => PlatformCardSkeleton()).join('')
  errorContainer.hidden = true

  try {
    const { results: platforms } = await platformService.getAll()
    grid.innerHTML = platforms.map((platform, index) => PlatformCard(platform, index)).join('')
  } catch (err) {
    grid.innerHTML = ''
    errorMsg.textContent = err.message || 'Error al cargar las plataformas.'
    errorContainer.hidden = false
    retryBtn.onclick = () => loadPlatforms(page)
  }
}