export const getCookie = (name: string): string => {
  if (typeof document === 'undefined') return ''
  return document.cookie.split('; ').find(r => r.startsWith(name + '='))?.split('=')[1] ?? ''
}

export async function apiFetch(path: string, init: RequestInit = {}) {
  const headers = new Headers(init.headers || {})
  const method = (init.method || 'GET').toUpperCase()
  const isJsonBody = !!init.body && !(init.body instanceof FormData)
  if (isJsonBody) headers.set('Content-Type', 'application/json')

  if (['POST','PUT','PATCH','DELETE'].includes(method)) {
    const token = getCookie('csrftoken')
    if (token) headers.set('X-CSRFToken', decodeURIComponent(token))
  }

  const res = await fetch(`/api${path}`, { credentials: 'include', ...init, headers })
  const ct = res.headers.get('content-type') || ''
  const data = ct.includes('application/json') ? await res.json() : await res.text()
  if (!res.ok) {
    if (process.env.NODE_ENV !== 'production') {
      // Lightweight diagnostics for dev
      // eslint-disable-next-line no-console
      console.warn('apiFetch error', {
        path,
        method,
        sentCsrf: headers.get('X-CSRFToken') ? true : false,
        hasCsrfCookie: !!getCookie('csrftoken'),
        status: res.status,
        data,
      })
    }
    const msg = typeof data === 'string' ? data : (data?.message || data?.error || `API ${res.status}`)
    throw new Error(msg)
  }
  return data
}


