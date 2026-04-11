
import { apiFetch } from '../api/apiClient'

export function getAll() {
    return apiFetch(`/games`)
}

export function getById(id) {
    return apiFetch(`/games/${id}`)
}