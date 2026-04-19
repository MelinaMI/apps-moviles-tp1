import platformsTemplate  from './platforms.html?raw'
import { createPlatformCard } from '../../components/PlatformCard/PlatformCard.js'
import { createSkeletonCard } from '../../components/SkeletonCard/SkeletonCard.js'
import { platformService }    from '../../services/platformService.js'
import './platforms.css'

const SKELETON_COUNT = 12

export function PlatformsPage() {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = platformsTemplate

  const page = wrapper.firstElementChild
  const grid = page.querySelector('#platforms-grid')

  renderSkeletons(grid, SKELETON_COUNT)
  loadPlatforms(grid)

  return page
}

async function loadPlatforms(grid) {
  const data = await platformService.getAll()
  renderPlatforms(data.results, grid)
}

function renderPlatforms(platforms, container) {
  container.innerHTML = ''
  platforms.forEach(platform => container.appendChild(createPlatformCard(platform)))
}

function renderSkeletons(container, count) {
  container.innerHTML = ''
  Array.from({ length: count }).forEach(() =>
    container.appendChild(createSkeletonCard())
  )
}