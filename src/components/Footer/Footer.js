import footerTemplate from './Footer.html?raw'
import './Footer.css'

export function Footer() {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = footerTemplate
  return wrapper.firstElementChild
}