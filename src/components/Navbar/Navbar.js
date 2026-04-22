import navbarTemplate from './Navbar.html?raw'
import './Navbar.css'

export function Navbar() {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = navbarTemplate
  return wrapper.firstElementChild
}

export function NavbarLinkChange() {
  const current = window.location.pathname
  const navLinks = document.querySelectorAll('.navbar-link')
  navLinks.forEach(link => {
    link.classList.remove('active')
    if (link.getAttribute('href') === current) {
      link.classList.add('active')
    }
  })
}

