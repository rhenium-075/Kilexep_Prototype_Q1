export async function POST(request: Request) {
  // Proxy to backend and forward cookies + CSRF header
  const body = await request.text()
  const incomingHeaders = request.headers
  const cookie = incomingHeaders.get('cookie') || ''
  const csrf = incomingHeaders.get('x-csrfToken') || incomingHeaders.get('x-csrftoken') || ''
  const origin = incomingHeaders.get('origin') || 'http://localhost:3001'

  // ensure csrf header
  let csrfHeader = csrf
  if (!csrfHeader && cookie) {
    const m = /(?:^|;\s*)csrftoken=([^;]+)/.exec(cookie)
    if (m) csrfHeader = decodeURIComponent(m[1])
  }

  try {
    const res = await fetch('http://backend:8000/api/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookie,
        'X-CSRFToken': csrfHeader || '',
        'Origin': origin,
        'Referer': origin,
      },
      body,
      cache: 'no-store',
    })
    const text = await res.text()
    const headers = new Headers()
    const setCookie = res.headers.get('set-cookie')
    if (setCookie) headers.append('Set-Cookie', setCookie)
    headers.set('Content-Type', res.headers.get('content-type') || 'application/json')
    return new Response(text, { status: res.status, headers })
  } catch (error) {
    console.warn('Django backend not available for Google auth:', error.message)
    // Return error response when backend is not available
    return new Response(
      JSON.stringify({ 
        error: 'Backend authentication service is currently unavailable. Please try again later.',
        code: 'BACKEND_UNAVAILABLE'
      }), 
      { 
        status: 503, 
        headers: { 'Content-Type': 'application/json' } 
      }
    )
  }
}