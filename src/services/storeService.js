import { apiFetch } from '../api/apiClient.js'

export const storeService = {
  getAll: (params = {}) => apiFetch('/stores', params),
}