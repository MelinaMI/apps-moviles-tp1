import skeletonCardTemplate from './SkeletonCard.html?raw'
import './SkeletonCard.css'

let template = null

function buildTemplate() {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = skeletonCardTemplate
  return wrapper.querySelector('#skeleton-card-template')
}

export function createSkeletonCard() {
  if (!template) template = buildTemplate()
  return template.content.cloneNode(true)
}