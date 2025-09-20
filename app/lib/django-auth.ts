// Django-allauth headless authentication library
const DJANGO_BASE = 'http://localhost:8000'  // Direct Django server connection

// =============================================================================
// CSRF Token Management
// =============================================================================

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

async function ensureCsrf(): Promise<void> {
  if (!document.cookie.includes('csrftoken=')) {
    try {
      await fetch(`${DJANGO_BASE}/api/auth/csrf/`, { 
        credentials: 'include',
        cache: 'no-store',
        mode: 'cors'
      })
    } catch (error) {
      console.warn('Failed to ensure CSRF token:', error)
    }
  }
}

// =============================================================================
// Authentication Response Types
// =============================================================================

interface AuthResponse {
  status: number
  message?: string
  data?: any
  user?: {
    id: string
    email: string
    name?: string
    picture?: string
  }
  errors?: any
}

interface AllauthResponse {
  status: number
  data?: {
    user?: {
      id: string
      email: string
      display: string
    }
    flows?: any[]
  }
  meta?: {
    is_authenticated: boolean
    session_token?: string
  }
}

// =============================================================================
// Error Handling
// =============================================================================

function handleAuthError(error: any, context: string): AuthResponse {
  console.error(`${context} error:`, error)
  
  if (error.name === 'TypeError' && error.message.includes('fetch')) {
    return {
      status: 503,
      message: 'Authentication service is currently unavailable. Please try again later.'
    }
  }
  
  return {
    status: 500,
    message: error.message || 'An unexpected error occurred during authentication.'
  }
}

// =============================================================================
// Google OAuth Authentication
// =============================================================================

export async function loginWithGoogle(idToken: string): Promise<AuthResponse> {
  try {
    await ensureCsrf()
    
    const response = await fetch(`${DJANGO_BASE}/_allauth/browser/v1/auth/provider/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCsrfToken(),
      },
      credentials: 'include',
      cache: 'no-store',
      mode: 'cors',
      body: JSON.stringify({
        provider: 'google',
        token: {
          id_token: idToken,
          client_id: '265367264562-2bab9s4ra37lhuler716redm9afn71sj.apps.googleusercontent.com'
        },
        process: 'login'
      }),
    })
    
    const result: AllauthResponse = await response.json()
    
    if (response.ok && result.meta?.is_authenticated) {
      return {
        status: 200,
        message: 'Login successful',
        user: {
          id: result.data?.user?.id || '',
          email: result.data?.user?.email || '',
          name: result.data?.user?.display || '',
          picture: ''
        }
      }
    } else {
      return {
        status: result.status || response.status,
        message: 'Google login failed. Please try again.',
        errors: result
      }
    }
  } catch (error) {
    return handleAuthError(error, 'Google login')
  }
}

export async function signupWithGoogle(idToken: string): Promise<AuthResponse> {
  try {
    await ensureCsrf()
    
    const response = await fetch(`${DJANGO_BASE}/_allauth/browser/v1/auth/provider/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCsrfToken(),
      },
      credentials: 'include',
      cache: 'no-store',
      mode: 'cors',
      body: JSON.stringify({
        provider: 'google',
        token: {
          id_token: idToken,
          client_id: '265367264562-2bab9s4ra37lhuler716redm9afn71sj.apps.googleusercontent.com'
        },
        process: 'connect'  // Use 'connect' for signup
      }),
    })
    
    const result: AllauthResponse = await response.json()
    
    if (response.ok && result.meta?.is_authenticated) {
      return {
        status: 200,
        message: 'Signup successful',
        user: {
          id: result.data?.user?.id || '',
          email: result.data?.user?.email || '',
          name: result.data?.user?.display || '',
          picture: ''
        }
      }
    } else {
      return {
        status: result.status || response.status,
        message: 'Google signup failed. Please try again.',
        errors: result
      }
    }
  } catch (error) {
    return handleAuthError(error, 'Google signup')
  }
}

// =============================================================================
// Email Authentication
// =============================================================================

export async function loginWithEmail(email: string, password: string): Promise<AuthResponse> {
  try {
    await ensureCsrf()
    
    const response = await fetch(`${DJANGO_BASE}/_allauth/browser/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCsrfToken(),
      },
      credentials: 'include',
      cache: 'no-store',
      mode: 'cors',
      body: JSON.stringify({ 
        email: email.trim().toLowerCase(),
        password 
      }),
    })
    
    const result: AllauthResponse = await response.json()
    
    if (response.ok && result.meta?.is_authenticated) {
      return {
        status: 200,
        message: 'Login successful',
        user: {
          id: result.data?.user?.id || '',
          email: result.data?.user?.email || '',
          name: result.data?.user?.display || '',
        }
      }
    } else {
      return {
        status: result.status || response.status,
        message: 'Invalid email or password. Please try again.',
        errors: result
      }
    }
  } catch (error) {
    return handleAuthError(error, 'Email login')
  }
}

export async function signupWithEmail(email: string, password1: string, password2: string): Promise<AuthResponse> {
  try {
    await ensureCsrf()
    
    if (password1 !== password2) {
      return {
        status: 400,
        message: 'Passwords do not match.'
      }
    }
    
    if (password1.length < 8) {
      return {
        status: 400,
        message: 'Password must be at least 8 characters long.'
      }
    }
    
    const response = await fetch(`${DJANGO_BASE}/_allauth/browser/v1/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCsrfToken(),
      },
      credentials: 'include',
      cache: 'no-store',
      mode: 'cors',
      body: JSON.stringify({ 
        email: email.trim().toLowerCase(),
        password1,
        password2
      }),
    })
    
    const result: AllauthResponse = await response.json()
    
    if (response.ok && result.meta?.is_authenticated) {
      return {
        status: 200,
        message: 'Signup successful',
        user: {
          id: result.data?.user?.id || '',
          email: result.data?.user?.email || '',
          name: result.data?.user?.display || '',
        }
      }
    } else {
      return {
        status: result.status || response.status,
        message: 'Signup failed. Please check your information and try again.',
        errors: result
      }
    }
  } catch (error) {
    return handleAuthError(error, 'Email signup')
  }
}

// =============================================================================
// Session Management
// =============================================================================

export async function logout(): Promise<AuthResponse> {
  try {
    await ensureCsrf()
    
    const response = await fetch(`${DJANGO_BASE}/_allauth/browser/v1/auth/session`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCsrfToken(),
      },
      credentials: 'include',
      cache: 'no-store',
      mode: 'cors',
    })
    
    if (response.ok) {
      return {
        status: 200,
        message: 'Logout successful'
      }
    } else {
      return {
        status: response.status,
        message: 'Logout failed'
      }
    }
  } catch (error) {
    return handleAuthError(error, 'Logout')
  }
}

export async function getCurrentUser(): Promise<AuthResponse> {
  try {
    const response = await fetch(`${DJANGO_BASE}/_allauth/browser/v1/auth/session`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      cache: 'no-store',
      mode: 'cors',
    })
    
    const result: AllauthResponse = await response.json()
    
    if (response.ok && result.meta?.is_authenticated) {
      return {
        status: 200,
        message: 'User authenticated',
        user: {
          id: result.data?.user?.id || '',
          email: result.data?.user?.email || '',
          name: result.data?.user?.display || '',
        }
      }
    } else {
      return {
        status: 401,
        message: 'User not authenticated'
      }
    }
  } catch (error) {
    return handleAuthError(error, 'Get current user')
  }
}
