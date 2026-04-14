const BASE_URL = import.meta.env.VITE_API_BASE_URL
const KEY = import.meta.env.VITE_KEY

export async function apiFetch(endpoint, params = {}) {
  const url = new URL(BASE_URL + endpoint)
  url.searchParams.append('key', KEY)

  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') {
      url.searchParams.append(k, String(v))
    }
  })

  let res
  try {
    res = await fetch(url.toString())
  } catch {
    throw new Error('Error de red: no se pudo conectar con la API')
  }

  if (!res.ok) {
    throw new Error(`Error HTTP ${res.status}`)
  }

  return res.json()
}
