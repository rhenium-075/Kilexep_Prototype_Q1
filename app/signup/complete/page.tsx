'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { apiFetch } from '../../lib/api'
import { useRouter } from 'next/navigation'

export default function CompleteSignupPage() {
  const router = useRouter()
  const [isAnimating, setIsAnimating] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [profile, setProfile] = useState({ name: '', email: '', company: '', role: '', phone: '' })

  // Use same-origin to ensure cookies (sessionid) are sent without CORS issues in dev
  const BACKEND_BASE = ''

  useEffect(() => {
    setIsAnimating(true)
    const prefill = async () => {
      try {
        const res = await fetch(`/api/user/status`, { credentials: 'include' })
        if (res.ok) {
          const data = await res.json()
          if (data?.logged_in !== true) {
            // No session → send back to signup to establish session first
            router.replace('/signup')
            return
          }
          if (data?.registration_completed) {
            router.replace('/')
            return
          }
          if (data?.user) {
            setProfile((p) => ({ ...p, name: data.user.name || p.name, email: data.user.email || p.email }))
          }
        }
      } catch (_) {}
    }
    prefill()
  }, [BACKEND_BASE])

  const onChange = (e: any) => setProfile({ ...profile, [e.target.name]: e.target.value })

  const onSubmit = async (e: any) => {
    e.preventDefault()
    try {
      setLoading(true)
      setError(null)
      const data = await apiFetch('/auth/complete-signup', {
        method: 'POST',
        body: JSON.stringify(profile),
      })
      router.push('/')
    } catch (e: any) {
      setError(e?.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="pl-4 pr-6 py-4 flex items-center">
          {/* Logo - Left - Fixed Position */}
          <div className="flex items-center ml-4 w-48 mt-1">
            <Link href="/" className="flex items-center space-x-0">
              <div className="rounded-lg bg-transparent p-1.5">
                <img 
                  src="/logo.svg" 
                  alt="Kilexep Logo" 
                  width="45" 
                  height="45" 
                  className="filter brightness-0 invert"
                />
              </div>
              <span className="text-3xl font-bold italic text-white">
                Kilexep
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main gradient background */}
      <div className="absolute inset-0">
        {/* Gradient background */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom right, #000000, #ea580c, #000000)',
          opacity: isAnimating ? 1 : 0,
          transition: 'opacity 1.5s ease-in-out'
        }}>
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-20"></div>
          {/* 3D Animated Objects (match signup page) */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Floating geometric shapes */}
            <div className="absolute top-20 left-20 w-24 h-24 bg-white/20 rounded-lg transform rotate-45" style={{
              animation: 'pulse 2s infinite'
            }}></div>
            <div className="absolute top-40 right-32 w-20 h-20 bg-white/15 rounded-full" style={{
              animation: 'bounce 2s infinite 1s'
            }}></div>
            <div className="absolute top-1/3 left-1/3 w-28 h-28 bg-white/25 transform rotate-12" style={{
              animation: 'pulse 3s infinite 2s'
            }}></div>
            <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-white/18 rounded-lg transform -rotate-30" style={{
              animation: 'pulse 2.5s infinite 0.5s'
            }}></div>
            <div className="absolute bottom-1/3 right-1/4 w-20 h-20 bg-white/22 rounded-full" style={{
              animation: 'bounce 3s infinite 1.5s'
            }}></div>
            
            {/* Moving lines */}
            <div className="absolute top-1/4 left-0 w-48 h-1 bg-white/30 transform rotate-45" style={{
              animation: 'pulse 2.5s infinite'
            }}></div>
            <div className="absolute top-1/2 right-0 w-40 h-1 bg-white/20 transform -rotate-45" style={{
              animation: 'pulse 2.5s infinite 1.5s'
            }}></div>
            <div className="absolute top-1/3 left-0 w-36 h-0.5 bg-white/25 transform rotate-30" style={{
              animation: 'pulse 3s infinite 0.8s'
            }}></div>
            <div className="absolute bottom-1/4 right-0 w-44 h-0.5 bg-white/15 transform -rotate-60" style={{
              animation: 'pulse 2.8s infinite 2s'
            }}></div>
            
            {/* Glowing orbs */}
            <div className="absolute top-1/4 right-1/4 w-12 h-12 bg-gradient-to-r from-white/40 to-transparent rounded-full" style={{
              animation: 'pulse 3s infinite'
            }}></div>
            <div className="absolute bottom-1/3 left-1/4 w-10 h-10 bg-gradient-to-r from-white/30 to-transparent rounded-full" style={{
              animation: 'pulse 3s infinite 2.5s'
            }}></div>
            <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-gradient-to-r from-white/35 to-transparent rounded-full" style={{
              animation: 'pulse 2.8s infinite 1.2s'
            }}></div>
            <div className="absolute top-2/3 right-1/3 w-14 h-14 bg-gradient-to-r from-white/25 to-transparent rounded-full" style={{
              animation: 'pulse 3.2s infinite 0.6s'
            }}></div>
            
            {/* Floating particles */}
            <div className="absolute top-1/3 left-1/2 w-4 h-4 bg-white/50 rounded-full" style={{
              animation: 'bounce 2s infinite'
            }}></div>
            <div className="absolute top-2/3 right-1/3 w-3 h-3 bg-white/40 rounded-full" style={{
              animation: 'bounce 2s infinite 0.5s'
            }}></div>
            <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-white/60 rounded-full" style={{
              animation: 'bounce 2s infinite 1s'
            }}></div>
            <div className="absolute top-1/6 right-1/6 w-3 h-3 bg-white/45 rounded-full" style={{
              animation: 'bounce 2.5s infinite 0.3s'
            }}></div>
            <div className="absolute bottom-1/6 left-1/6 w-2.5 h-2.5 bg-white/55 rounded-full" style={{
              animation: 'bounce 2.2s infinite 1.8s'
            }}></div>
            <div className="absolute top-3/4 left-1/4 w-3.5 h-3.5 bg-white/35 rounded-full" style={{
              animation: 'bounce 2.8s infinite 0.7s'
            }}></div>
            
            {/* Rotating elements */}
            <div className="absolute top-1/2 left-1/4 w-16 h-16 border-2 border-white/20 rounded-full" style={{
              animation: 'spin 8s linear infinite'
            }}></div>
            <div className="absolute top-1/3 right-1/3 w-12 h-12 border border-white/30 rounded-full" style={{
              animation: 'spin 12s linear infinite reverse'
            }}></div>
            <div className="absolute bottom-1/3 right-1/3 w-14 h-14 border-2 border-white/15 rounded-full" style={{
              animation: 'spin 10s linear infinite'
            }}></div>
            <div className="absolute top-1/4 left-1/4 w-18 h-18 border border-white/25 rounded-full" style={{
              animation: 'spin 15s linear infinite reverse'
            }}></div>
            
            {/* Additional geometric shapes */}
            <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-white/12 transform rotate-60" style={{
              animation: 'pulse 4s infinite 1s'
            }}></div>
            <div className="absolute bottom-1/4 left-1/2 w-24 h-24 bg-white/18 transform -rotate-45" style={{
              animation: 'pulse 3.5s infinite 0.4s'
            }}></div>
            <div className="absolute top-1/6 left-1/3 w-16 h-16 bg-white/15 rounded-full" style={{
              animation: 'bounce 3.5s infinite 2.2s'
            }}></div>
          </div>
        </div>
        {/* Diagonal cut overlay */}
        <div className="absolute inset-0" style={{
          background: 'white',
          clipPath: 'polygon(0 80%, 100% 20%, 100% 100%, 0 100%)'
        }}></div>
      </div>

      {/* Center Card */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6 py-10">
        <div className="bg-white rounded-2xl shadow-2xl p-12 w-full max-w-xl min-h-[520px] transition-all duration-1000 ease-in-out delay-500">
          {/* Kilexep Logo */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-0 -ml-8">
              <div className="rounded-lg bg-transparent p-1.5">
                <img 
                  src="/logo.svg" 
                  alt="Kilexep Logo" 
                  width="70" 
                  height="70" 
                />
              </div>
              <span className="text-5xl font-bold italic text-orange-500">Kilexep</span>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Complete your profile</h1>
            <p className="text-gray-600 text-base leading-relaxed">Tell us a bit more about you.</p>
          </div>

          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3">{error}</div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <input name="name" value={profile.name} onChange={onChange} placeholder="Full name" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
            <input name="email" type="email" value={profile.email} onChange={onChange} placeholder="Work email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
            <input name="company" value={profile.company} onChange={onChange} placeholder="Company (optional)" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
            <input name="role" value={profile.role} onChange={onChange} placeholder="Role (optional)" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
            <input name="phone" value={profile.phone} onChange={onChange} placeholder="Phone (optional)" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
            <button type="submit" disabled={loading} className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700">{loading ? 'Saving...' : 'Save and continue'}</button>
          </form>
        </div>
      </div>
    </div>
  )
}


