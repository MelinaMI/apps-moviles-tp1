import searchBarTemplate from './SearchBar.html?raw'
import './SearchBar.css'

const delay = 400

function debounce(fn, delayMs) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delayMs)
  }
}

function buildTemplate() {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = searchBarTemplate
  return wrapper.querySelector('#search-bar-template')
}

let template = null

export function createSearchBar({ onSearch }) {
  if (!template) template = buildTemplate()

  const fragment = template.content.cloneNode(true)
  const input = fragment.querySelector('[data-ref="input"]')

  input.addEventListener(
    'input',
    debounce((event) => onSearch(event.target.value.trim()), delay)
  )

  return fragment
}