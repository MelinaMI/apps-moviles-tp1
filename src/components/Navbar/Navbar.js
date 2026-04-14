import navbarTemplate from './Navbar.html?raw'
import './Navbar.css'

export function Navbar() {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = navbarTemplate
  return wrapper.firstElementChild
}