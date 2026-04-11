const BASE_URL = import.meta.env.BASE_URL
const KEY = import.meta.env.KEY

export async function apiFetch(endpoint, options = {}) {
  const url = new URL(BASE_URL + endpoint)
  url.searchParams.append('key', KEY)

  const res = await fetch(url, options)

  if (!res.ok) {
    throw new Error('API error')
  }

  return res.json()
}
