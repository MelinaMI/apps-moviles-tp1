import historyTemplate from './history.html?raw'
import './history.css'

export function HistoryPage() {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = historyTemplate
  return wrapper.firstElementChild
}