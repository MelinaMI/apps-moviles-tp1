import favoritesTemplate from './favorites.html?raw'
import './favorites.css'

export function FavoritesPage() {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = favoritesTemplate
  return wrapper.firstElementChild
}