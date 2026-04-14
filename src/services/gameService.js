import { apiFetch } from '../api/apiClient.js'

export const gameService = {
  getAll: (params = {}) => apiFetch('/games', params),
  getById: (id) => apiFetch(`/games/${id}`),
}



// NOTAS PARA MEL:
// para agregar un método seguis el mismo patrón

// getBySlug: (slug) => apiFetch(`/games/${slug}`),
// getTopRated: (params = {}) => apiFetch('/games', { ordering: '-rating', ...params }),