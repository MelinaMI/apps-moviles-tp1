import platformsTemplate from './platforms.html?raw'
import './platforms.css'
import { platformService } from '../../services/platformService.js'
import { PlatformCard} from '../../components/PlatformCard/PlatformCard.js'
import { CardSkeleton } from '../../components/CardSkeleton/CardSkeleton.js'

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

  grid.replaceChildren(
    ...Array.from({ length: 8 }, (_, i) =>
      CardSkeleton({ variant: 'platform', index: i })
    )
  )
  errorContainer.hidden = true

  try {
    const { results: platforms } = await platformService.getAll()
    grid.replaceChildren(
          ...platforms.map((platform, index) => PlatformCard(platform, index))
        )
  } catch (err) {
    grid.innerHTML = ''
    errorMsg.textContent = err.message || 'Error al cargar las plataformas.'
    errorContainer.hidden = false
    retryBtn.onclick = () => loadPlatforms(page)
  }
}