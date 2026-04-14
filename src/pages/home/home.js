import homeTemplate from './home.html?raw'
import './home.css'

export function HomePage() {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = homeTemplate
  return wrapper.firstElementChild
}