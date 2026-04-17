import { apiFetch } from '../api/apiClient.js';

export async function searchPage(name, page = 1, page_size = 10, extraParams = {}) {
  return apiFetch("/games", {
    search: name,
    page,
    page_size,
    ...extraParams
  });
}