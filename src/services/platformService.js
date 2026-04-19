import { apiFetch } from '../api/apiClient.js'

export const platformService = {
  getAll: (params = {}) => apiFetch('/platforms', params),
}