export async function GET() {
  const res = await fetch('http://backend:8000/api/auth/csrf/', {
    // forward cookies from browser automatically handled by Next runtime
    headers: {
      'Accept': '*/*',
    },
    cache: 'no-store',
  })
  const body = await res.text()
  const headers = new Headers()
  // Forward Set-Cookie to browser to ensure csrftoken lands on 3001 origin
  const setCookie = res.headers.get('set-cookie')
  if (setCookie) headers.append('Set-Cookie', setCookie)
  headers.set('Content-Type', res.headers.get('content-type') || 'application/json')
  return new Response(body, { status: res.status, headers })
}


