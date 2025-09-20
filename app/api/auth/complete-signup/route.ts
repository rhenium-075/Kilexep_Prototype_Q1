export async function POST(request: Request) {
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

  const res = await fetch('http://backend:8000/api/auth/complete-signup', {
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
}


