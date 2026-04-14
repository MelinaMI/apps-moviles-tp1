import { apiFetch } from '../api/apiClient.js'

const DEFAULTS = {
  page_size: 10,
  ordering: '-games_count',
}

export const genreService = {
  getAll: (params = {}) => apiFetch('/genres', { ...DEFAULTS, ...params }),
}