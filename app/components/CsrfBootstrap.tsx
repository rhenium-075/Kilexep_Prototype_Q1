'use client'

import { useEffect } from 'react'

export default function CsrfBootstrap() {
  useEffect(() => {
    let cancelled = false
    const ensureCsrf = async () => {
      try {
        const get = () => document.cookie.split('; ').find(r => r.startsWith('csrftoken='))
        for (let i = 0; i < 3; i += 1) {
          if (get()) return
          await fetch('/api/auth/csrf/', { credentials: 'include' }).catch(() => {})
          if (cancelled) return
          await new Promise(r => setTimeout(r, 250 * (i + 1)))
        }
      } catch (_) {}
    }
    ensureCsrf()
    return () => { cancelled = true }
  }, [])
  return null
}


