import searchTemplate from './search.html?raw'
import './search.css'

export function SearchPage() {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = searchTemplate
  return wrapper.firstElementChild
}