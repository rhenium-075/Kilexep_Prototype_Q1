import { getCurrentUser, logout as allauthLogout } from './django-auth'

export interface User {
  id: string
  name?: string
  email: string
  picture?: string
}

export interface AuthStatus {
  logged_in: boolean
  user?: User
  registration_completed?: boolean
}

/**
 * Get current user authentication status using django-allauth
 */
export async function getAuthStatus(): Promise<AuthStatus> {
  try {
    const response = await getCurrentUser()
    
    if (response.status === 200 && response.user) {
      return {
        logged_in: true,
        user: {
          id: response.user.id,
          name: response.user.name,
          email: response.user.email,
          picture: response.user.picture
        },
        registration_completed: true // Assume completed if user exists
      }
    }
    
    return { logged_in: false }
  } catch {
    return { logged_in: false }
  }
}

/**
 * Logout user using django-allauth and redirect to home
 */
export async function logout(): Promise<void> {
  try {
    await allauthLogout()
  } catch (error) {
    console.warn('Logout failed:', error)
    // Show user feedback for logout issues
    if (typeof window !== 'undefined') {
      console.error('로그아웃 중 문제가 발생했지만 로컬 세션을 정리합니다.')
    }
  } finally {
    // Always redirect to home regardless of API success
    window.location.href = '/'
  }
}

/**
 * Check if user is authenticated and has completed registration
 * Redirects to appropriate page if not
 */
export async function requireAuth(router: any, requireCompleted = false): Promise<AuthStatus | null> {
  const status = await getAuthStatus()
  
  if (!status.logged_in) {
    router.push('/login')
    return null
  }
  
  if (requireCompleted && !status.registration_completed) {
    router.push('/signup/complete')
    return null
  }
  
  return status
}

/**
 * Hook for pages that should redirect authenticated users
 */
export async function redirectIfAuthenticated(router: any): Promise<boolean> {
  const status = await getAuthStatus()
  
  if (status.logged_in && status.registration_completed) {
    router.push('/')
    return true
  }
  
  return false
}
