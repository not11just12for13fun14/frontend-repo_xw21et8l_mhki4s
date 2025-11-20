const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export const api = {
  base: BASE_URL,
  async get(path, params) {
    const url = new URL(BASE_URL + path)
    if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))
    const res = await fetch(url.toString())
    if (!res.ok) throw new Error(await res.text())
    return res.json()
  },
  async post(path, body, params) {
    const url = new URL(BASE_URL + path)
    if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))
    const res = await fetch(url.toString(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body || {})
    })
    if (!res.ok) throw new Error(await res.text())
    return res.json()
  }
}

export const auth = {
  getCoachId() { return localStorage.getItem('coach_id') || '' },
  setCoachId(id) { localStorage.setItem('coach_id', id) },
  clear() { localStorage.removeItem('coach_id') }
}
