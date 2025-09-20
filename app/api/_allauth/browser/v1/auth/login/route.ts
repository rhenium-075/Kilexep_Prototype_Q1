export async function POST(request: Request) {
  // Proxy to django-allauth headless API for email login
  const body = await request.text()
  const incomingHeaders = request.headers
  const cookie = incomingHeaders.get('cookie') || ''
  const csrf = incomingHeaders.get('x-csrfToken') || incomingHeaders.get('x-csrftoken') || ''
  const origin = incomingHeaders.get('origin') || 'http://localhost:3001'

  // Extract CSRF token from cookies if not in header
  let csrfHeader = csrf
  if (!csrfHeader && cookie) {
    const match = /(?:^|;\s*)csrftoken=([^;]+)/.exec(cookie)
    if (match) csrfHeader = decodeURIComponent(match[1])
  }

  try {
    const res = await fetch('http://localhost:8000/_allauth/browser/v1/auth/login', {
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
    console.warn('Django allauth backend not available:', error)
    return new Response(
      JSON.stringify({ 
        status: 503,
        message: 'Authentication service is currently unavailable. Please try again later.',
      }), 
      { 
        status: 503, 
        headers: { 'Content-Type': 'application/json' } 
      }
    )
  }
}
