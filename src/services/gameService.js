import { apiFetch } from '../api/apiClient.js'

export const gameService = {
  getAll: (params = {}) => apiFetch('/games', params),
  getById: (id) => apiFetch(`/games/${id}`),
}