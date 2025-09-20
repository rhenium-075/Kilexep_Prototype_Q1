'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import PreFooter from '../components/PreFooter'

export default function HowItWorksPage() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState<{ name?: string; picture?: string } | null>(null)

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await fetch('/api/user/status', { credentials: 'include' })
        if (!res.ok) return
        const data = await res.json()
        if (data?.logged_in) {
          setLoggedIn(true)
          setUser(data.user || null)
        } else {
          setLoggedIn(false)
          setUser(null)
        }
      } catch (_) {}
    }
    checkStatus()
  }, [])

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
    } catch (_) {} finally {
      setLoggedIn(false)
      setUser(null)
      window.location.href = '/'
    }
  }
  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white">
      {/* Top Navigation (charcoal) */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900 shadow-xl">
        <div className="pl-4 pr-6 py-4 flex items-center justify-between">
          <div className="flex items-center ml-4 flex-shrink-0">
            <Link href="/" className="flex items-center space-x-0">
              <div className="rounded-lg bg-transparent p-1.5">
                <img src="/logo.svg" alt="Kilexep Logo" width="45" height="45" />
              </div>
              <span className="text-3xl font-bold italic text-orange-500 animate-logo-change">Kilexep</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8 transition-all duration-300 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-200">
            <Link href="/" className="relative px-4 py-3 rounded-lg transition-all duration-300 hover:text-white group text-lg overflow-hidden">
              <span className="relative z-10">Home</span>
              <div className="absolute inset-0 bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100"></div>
            </Link>
            <Link href="/features" className="relative px-4 py-3 rounded-lg transition-all duration-300 hover:text-white group text-lg overflow-hidden">
              <span className="relative z-10">Features</span>
              <div className="absolute inset-0 bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100"></div>
            </Link>
            <Link href="/how-it-works" className="relative px-4 py-3 rounded-lg transition-all duration-300 hover:text-white group text-lg overflow-hidden">
              <span className="relative z-10">How It Works</span>
              <div className="absolute inset-0 bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100"></div>
            </Link>
            <Link href="/built-with" className="relative px-4 py-3 rounded-lg transition-all duration-300 hover:text-white group text-lg overflow-hidden">
              <span className="relative z-10">Built with Kilexep</span>
              <div className="absolute inset-0 bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100"></div>
            </Link>
            <Link href="/help" className="relative px-4 py-3 rounded-lg transition-all duration-300 hover:text-white group text-lg overflow-hidden">
              <span className="relative z-10">Help</span>
              <div className="absolute inset-0 bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100"></div>
            </Link>
            <Link href="/pricing" className="relative px-4 py-3 rounded-lg transition-all duration-300 hover:text-white group text-lg overflow-hidden">
              <span className="relative z-10">Pricing</span>
              <div className="absolute inset-0 bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100"></div>
            </Link>
          </div>

          <div className="flex items-center space-x-4 flex-shrink-0">
            {loggedIn ? (
              <>
                <button
                  onClick={handleLogout}
                  className="transition-all duration-300 px-4 py-2 rounded-lg text-lg text-gray-200 hover:text-orange-400 hover:bg-orange-50/20"
                >
                  Log out
                </button>
                <Link href="/dashboard" className="px-6 py-3 rounded-lg font-semibold transition-all duration-300 text-lg bg-orange-500 text-white hover:bg-orange-600">
                  Dashboard
                </Link>
                <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 bg-gray-100">
                  {user?.picture ? (
                    <img src={user.picture} alt="Account" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-200">👤</div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link href="/login" className="transition-all duration-300 hover:text-orange-400 text-lg text-gray-200">
                  Login
                </Link>
                <Link href="/signup" className="px-6 py-3 rounded-lg font-semibold transition-all duration-300 text-lg bg-orange-500 text-white hover:bg-orange-600">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-28">
        <div className="absolute -top-24 left-0 right-0 bottom-0 pointer-events-none" aria-hidden>
          <div className="absolute -inset-40 bg-gradient-to-br from-orange-500/20 via-orange-600/10 to-black/0 blur-3xl" />
        </div>
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">How Kilexep turns SEO into GEO—on autopilot.</h1>
          <p className="mt-5 max-w-2xl text-base sm:text-lg text-gray-300">From a quick onboarding to multi-strategy GEO publishing, real AI visibility checks, and continuous re-optimization.</p>
          <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-gray-300">
            <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1">Hands-Off Automation</span>
            <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1">Evidence-Driven Changes</span>
            <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1">Continuous Learning</span>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <a className="inline-flex items-center justify-center rounded-lg bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600 transition-colors" href="#">Request Demo</a>
            <a className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors" href="#">Join the Beta</a>
          </div>
        </div>
      </section>

      {/* The Loop (6 steps) */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="text-xl font-semibold">The Loop</h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {[
            { t: 'Onboard', d: 'Tell us who you are and who you serve.' },
            { t: 'Find Trends', d: 'We map high-signal topics for your audience & industry.' },
            { t: 'Draft SEO', d: 'We produce organic content aligned to those trends.' },
            { t: 'Transform to GEO', d: 'Refactor phrasing, structure, and citations for AI.' },
            { t: 'Publish Multi-Strategy', d: 'Multiple variations go live to see what resonates.' },
            { t: 'Test & Re-Optimize', d: 'Check visibility, learn, rewrite, keep what wins.' },
          ].map((s, i) => (
            <div key={s.t} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs text-gray-400 mb-1">{i + 1}
                <span className="ml-1">/ 6</span>
              </div>
              <h3 className="text-base font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-gray-300 leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-gray-400">Repeat the cycle to compound performance.</p>
      </section>

      {/* What You Do / What We Do */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold">What You Do</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-300">
              <li>• Share goals and audience</li>
              <li>• Approve voice & boundaries</li>
              <li>• Review highlights, not every draft</li>
            </ul>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold">What We Do</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-300">
              <li>• Generate trend-aligned ideas</li>
              <li>• Create SEO drafts and convert to GEO</li>
              <li>• Test visibility, compare strategies, improve</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Outputs */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <h3 className="text-lg font-semibold">Outputs</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {['Content Variations', 'Visibility & Citation Check', 'Winning Strategy Recommendation', 'Next-Round Plan'].map((o) => (
            <span key={o} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-200">{o}</span>
          ))}
        </div>
      </section>

      {/* Trust note */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-sm text-gray-300 space-y-2">
          <p>Built for teams and trust: minimized data, clear access controls, audit trails.</p>
          <p>Works with your content and analytics tools; deeper integrations on the roadmap.</p>
        </div>
      </section>

      <PreFooter />

    </main>
  )
}


