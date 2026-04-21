import skeletonCardTemplate from './SkeletonCard.html?raw';
import './SkeletonCard.css';

let template = null;
let templateWide = null;

function buildTemplates() {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = skeletonCardTemplate;
  template     = wrapper.querySelector('#skeleton-card-template');
  templateWide = wrapper.querySelector('#skeleton-card-wide-template');
}

export function createSkeletonCard(type = 'game') {
  if (!template) buildTemplates();
  return type === 'wide'
    ? templateWide.content.cloneNode(true)
    : template.content.cloneNode(true);
}