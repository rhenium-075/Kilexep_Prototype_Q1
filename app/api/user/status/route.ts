export async function GET(request: Request) {
  // Proxy to Django backend for user status
  const incomingHeaders = request.headers
  const cookie = incomingHeaders.get('cookie') || ''
  
  try {
    const res = await fetch('http://backend:8000/api/user/status', {
      method: 'GET',
      headers: {
        'Cookie': cookie,
        'Accept': 'application/json',
      },
      cache: 'no-store',
    })
    
    const text = await res.text()
    const headers = new Headers()
    
    // Forward Set-Cookie headers if any
    const setCookie = res.headers.get('set-cookie')
    if (setCookie) headers.append('Set-Cookie', setCookie)
    
    headers.set('Content-Type', res.headers.get('content-type') || 'application/json')
    
    return new Response(text, { status: res.status, headers })
  } catch (error) {
    console.warn('Django backend not available, returning default status:', error.message)
    // Return default logged out status when backend is not available
    return new Response(
      JSON.stringify({ logged_in: false }), 
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      }
    )
  }
}
