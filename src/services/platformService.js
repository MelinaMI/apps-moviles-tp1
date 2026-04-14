import { apiFetch } from '../api/apiClient.js'

export const platformService = {
  getAll: (params = {}) => apiFetch('/platforms', params),
  getById: (id) => {
    if (!id) throw new Error('Platform ID is required')
    return apiFetch(`/platforms/${id}`)
  },
}