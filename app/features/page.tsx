'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import PreFooter from '../components/PreFooter'

export default function FeaturesPage() {
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
          {/* Logo - Left */}
          <div className="flex items-center ml-4 flex-shrink-0">
            <Link href="/" className="flex items-center space-x-0">
              <div className="rounded-lg bg-transparent p-1.5">
                <img src="/logo.svg" alt="Kilexep Logo" width="45" height="45" />
              </div>
              <span className="text-3xl font-bold italic text-orange-500 animate-logo-change">Kilexep</span>
            </Link>
          </div>

          {/* Navigation Menu - Center */}
          <div className="hidden md:flex items-center space-x-8 transition-all duration-300 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-200">
            <Link href="/" className="relative px-4 py-3 rounded-lg transition-all duration-300 hover:text-white group text-lg overflow-hidden">
              <span className="relative z-10">Home</span>
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100"></div>
            </Link>
            <Link href="/features" className="relative px-4 py-3 rounded-lg transition-all duration-300 hover:text-white group text-lg overflow-hidden">
              <span className="relative z-10">Features</span>
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100"></div>
            </Link>
            <Link href="/how-it-works" className="relative px-4 py-3 rounded-lg transition-all duration-300 hover:text-white group text-lg overflow-hidden">
              <span className="relative z-10">How It Works</span>
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100"></div>
            </Link>
            <Link href="/built-with" className="relative px-4 py-3 rounded-lg transition-all duration-300 hover:text-white group text-lg overflow-hidden">
              <span className="relative z-10">Built with Kilexep</span>
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100"></div>
            </Link>
            <Link href="/help" className="relative px-4 py-3 rounded-lg transition-all duration-300 hover:text-white group text-lg overflow-hidden">
              <span className="relative z-10">Help</span>
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100"></div>
            </Link>
            <Link href="/pricing" className="relative px-4 py-3 rounded-lg transition-all duration-300 hover:text-white group text-lg overflow-hidden">
              <span className="relative z-10">Pricing</span>
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100"></div>
            </Link>
          </div>

          {/* Auth Actions - Right */}
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

      {/* Attach hero gradient under the navbar without showing base background */}
      {/* Pull the section up by navbar height while padding content down */}

      {/* Hero */}
      <section className="relative overflow-hidden pt-28">
        <div className="absolute -top-24 left-0 right-0 bottom-0 pointer-events-none" aria-hidden>
          <div className="absolute -inset-40 bg-gradient-to-br from-orange-500/20 via-orange-600/10 to-black/0 blur-3xl" />
        </div>
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Automated GEO marketing that takes your content further.</h1>
          <p className="mt-5 max-w-2xl text-base sm:text-lg text-gray-300">From onboarding to multi-strategy GEO, visibility checks, and continuous improvement—on autopilot.</p>
          <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-gray-300">
            <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1">AI Engine Optimization</span>
            <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1">Multi-Strategy Publishing</span>
            <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1">Self-Learning Loop</span>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <a className="inline-flex items-center justify-center rounded-lg bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600 transition-colors" href="#">Request Demo</a>
            <a className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors" href="#">Join the Beta</a>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: 'Onboarding Interview Engine',
              one: 'Capture your profile and audience in minutes.',
              bullets: ['Fast intake for company profile', 'Automatic Persona/JTBD extraction', 'Keyword hypothesis for your market'],
            },
            {
              title: 'Trend Keyword Generator',
              one: 'Spot high-yield topics from related trend signals.',
              bullets: ['Related trend index', 'Topic clusters and briefs', 'Calendar with change alerts'],
            },
            {
              title: 'SEO → GEO Transformer',
              one: 'Refactor content so AI engines choose to surface it.',
              bullets: ['Variations by query intent', 'Clean citations and structure', 'Engine-friendly snippets'],
            },
            {
              title: 'Multi-Strategy Publisher',
              one: 'Ship multiple variations and learn fast.',
              bullets: ['N-variant release', 'Canary experiments', 'Auto adopt/rollback'],
            },
            {
              title: 'AI Visibility Testing',
              one: 'Verify surfacing and citations across AI answers.',
              bullets: ['Synthetic queries & checks', 'Compare strategies by outcomes', 'Spot failure patterns early'],
            },
            {
              title: 'Self-Learning Re-Optimization Loop',
              one: 'Diagnose, rewrite, and keep what wins.',
              bullets: ['Find underperformance causes', 'Compare vs alternatives', 'Rewrite text/links/structure'],
            },
          ].map((f) => (
            <div key={f.title} className="rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-5 transition-transform hover:-translate-y-0.5 hover:border-orange-400/30">
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-gray-300">{f.one}</p>
              <ul className="mt-4 space-y-1 text-sm text-gray-300">
                {f.bullets.map((b) => (
                  <li key={b} className="leading-relaxed">• {b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Proof / Outcomes */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="text-xl font-semibold">Outcomes we track</h2>
        <p className="mt-2 text-sm text-gray-300">Public metrics roll out as Beta data matures.</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {['Visibility Index', 'Citation Rate', 'Conversion Uplift', 'Learning Speed'].map((chip) => (
            <span key={chip} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-200">
              {chip}
            </span>
          ))}
        </div>
      </section>

      {/* Trust */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="text-xl font-semibold">Built for teams and trust</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-gray-300">Works with your content and analytics tools.</div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-gray-300">Minimized data, strong access controls, audit trails.</div>
        </div>
      </section>

      <PreFooter />

    </main>
  )
}
