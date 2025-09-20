'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import PreFooter from '../components/PreFooter'

export default function BuiltWithPage() {
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
                <Link href="/login" className="transition-all duration-300 hover:text-orange-400 text-lg text-gray-200">Login</Link>
                <Link href="/signup" className="px-6 py-3 rounded-lg font-semibold transition-all duration-300 text-lg bg-orange-500 text-white hover:bg-orange-600">Sign Up</Link>
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
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Built with Kilexep.</h1>
          <p className="mt-5 max-w-2xl text-base sm:text-lg text-gray-300">Real teams, real content—optimized for AI visibility and continuous growth.</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a className="inline-flex items-center justify-center rounded-lg bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600 transition-colors" href="#">Request Demo</a>
            <a className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors" href="#">Join the Beta</a>
          </div>
          <p className="mt-3 text-xs text-gray-400">Case studies roll out as Beta results finalize.</p>
        </div>
      </section>

      {/* Logo Strip */}
      <section className="mx-auto max-w-6xl px-6 py-8">
        <h3 className="text-xs uppercase tracking-wider text-gray-400">Teams exploring Kilexep</h3>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 opacity-70">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-10 bg-white/10 rounded flex items-center justify-center text-gray-300 text-xs">CLIENT LOGO {i + 1}</div>
          ))}
        </div>
      </section>

      {/* Stories — Case Cards */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h4 className="text-lg font-semibold">[CASE TITLE — e.g., {`{Company/Project Name}`} ]</h4>
              <p className="mt-2 text-sm text-gray-300">{`{One-line value}`}</p>
              <ul className="mt-4 space-y-1 text-sm text-gray-300">
                <li>• Industry: {`{Industry name}`}</li>
                <li>• Goal: {`{Primary outcome sought}`}</li>
                <li>• What we shipped: {`{Key deliverables}`}</li>
                <li>• Outcome: {`{Metric or “coming soon”}`}</li>
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Before / After */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            ['{Pain point}', '{GEO-driven improvement}'],
            ['{Single-strategy posting}', '{Multi-strategy with adoption}'],
            ['{Messy citations/links}', '{Normalized sources & structure}'],
          ].map(([before, after], idx) => (
            <div key={idx} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm text-gray-400">Before → After</div>
              <div className="mt-2 text-sm">
                <span className="text-gray-300">Before: </span>
                <span className="text-gray-400">{before}</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-300">After: </span>
                <span className="text-gray-200">{after}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Use Cases */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <h3 className="text-lg font-semibold">Use Cases</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {['SaaS Launch', 'DTC / E-commerce', 'B2B Services', 'Developer Tools', 'EdTech', 'Fintech'].map((chip) => (
            <span key={chip} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-200">{chip}</span>
          ))}
        </div>
      </section>

      {/* Trust note */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-sm text-gray-300 space-y-2">
          <p>Metrics and names appear as Beta results are finalized.</p>
          <p>Third-party marks belong to their owners. Content may be anonymized for privacy.</p>
        </div>
      </section>

      <PreFooter />

    </main>
  )
}




