import { apiFetch } from '../api/apiClient.js'

export function getAll(params = {}) {
  return apiFetch('/genres', { page_size: 40, ordering: '-games_count', ...params })
}