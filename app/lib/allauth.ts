// Django-allauth headless API client
// Based on: django-allauth-main/examples/react-spa/frontend/src/lib/allauth.js

const ACCEPT_JSON = {
  accept: 'application/json'
}

export const AuthProcess = Object.freeze({
  LOGIN: 'login',
  CONNECT: 'connect'
})

export const URLs = Object.freeze({
  // Meta
  CONFIG: '/config',

  // Auth: Basics
  LOGIN: '/auth/login',
  SESSION: '/auth/session',
  SIGNUP: '/auth/signup',

  // Auth: Social
  PROVIDER_TOKEN: '/auth/provider/token',
})

const settings = {
  baseUrl: '/_allauth/browser/v1',
  withCredentials: true
}

function getCsrfToken(): string {
  const cookies = document.cookie.split(';')
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=')
    if (name === 'csrftoken') {
      return decodeURIComponent(value)
    }
  }
  return ''
}

async function request(method: string, path: string, data?: any, headers?: any) {
  const options: RequestInit = {
    method,
    headers: {
      ...ACCEPT_JSON,
      ...headers
    },
    credentials: 'include'
  }

  // Add CSRF token for non-config requests
  if (path !== URLs.CONFIG) {
    options.headers = {
      ...options.headers,
      'X-CSRFToken': getCsrfToken()
    }
  }

  if (typeof data !== 'undefined') {
    options.body = JSON.stringify(data)
    options.headers = {
      ...options.headers,
      'Content-Type': 'application/json'
    }
  }

  const resp = await fetch(settings.baseUrl + path, options)
  const msg = await resp.json()
  return msg
}

export async function login(data: { email: string; password: string }) {
  return await request('POST', URLs.LOGIN, data)
}

export async function signUp(data: { email: string; password1: string; password2: string }) {
  return await request('POST', URLs.SIGNUP, data)
}

export async function authenticateByToken(providerId: string, token: any, process = AuthProcess.LOGIN) {
  // Add client_id for Google provider
  const tokenWithClientId = {
    ...token,
    client_id: '265367264562-2bab9s4ra37lhuler716redm9afn71sj.apps.googleusercontent.com'
  }
  
  return await request('POST', URLs.PROVIDER_TOKEN, {
    provider: providerId,
    token: tokenWithClientId,
    process
  })
}

export async function getAuth() {
  return await request('GET', URLs.SESSION)
}

export async function logout() {
  return await request('DELETE', URLs.SESSION)
}
