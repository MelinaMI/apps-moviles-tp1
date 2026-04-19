import paginationTemplate from './Pagination.html?raw'
import './Pagination.css'

let template = null

function buildTemplate() {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = paginationTemplate
  return wrapper.querySelector('#pagination-template')
}

export function createPagination({ onPageChange }) {
  if (!template) template = buildTemplate()

  const fragment = template.content.cloneNode(true)
  const root = fragment.querySelector('.pagination')
  const find = (ref) => root.querySelector(`[data-ref="${ref}"]`)

  let currentPage = 1
  let totalCount = 0

  function update({ count, pageSize, next, previous }) {
    totalCount = count
    const totalPages = Math.ceil(count / pageSize)
    find('info').textContent = `Page ${currentPage} of ${totalPages}`
    find('prev').disabled = !previous
    find('next').disabled = !next
  }

  find('prev').addEventListener('click', () => {
    currentPage -= 1
    onPageChange(currentPage)
  })

  find('next').addEventListener('click', () => {
    currentPage += 1
    onPageChange(currentPage)
  })

  return { element: fragment, update, resetPage: () => { currentPage = 1 } }
}