import { apiFetch } from '../api/apiClient.js'

export const genreService = {
  getAll: (params = {}) => apiFetch('/genres', params),
}