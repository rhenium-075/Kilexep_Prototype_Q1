'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import PreFooter from '../components/PreFooter'

export default function HelpPage() {
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

      {/* 1) Hero */}
      <section className="relative overflow-hidden pt-28">
        <div className="absolute -top-24 left-0 right-0 bottom-0 pointer-events-none" aria-hidden>
          <div className="absolute -inset-40 bg-gradient-to-br from-orange-500/20 via-orange-600/10 to-black/0 blur-3xl" />
        </div>
        <div className="mx-auto max-w-5xl px-6 py-12">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">How can we help?</h1>
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-gray-300">Find quick answers or reach our team—fast.</p>
          <div className="mt-6 max-w-xl">
            <label className="sr-only" htmlFor="help-search">Search help articles</label>
            <input id="help-search" placeholder="Search help articles" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"/>
          </div>
        </div>
      </section>

      {/* 2) Quick Links */}
      <section className="mx-auto max-w-6xl px-6 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            ['Getting Started', 'onboarding overview'],
            ['Trend Keywords', 'how topic signals work'],
            ['SEO → GEO', 'transforming content'],
            ['Multi‑Strategy Publishing', 'variations & tests'],
            ['AI Visibility Checks', 'surfacing & citations'],
            ['Re‑Optimization Loop', 'learning and iteration'],
          ].map(([title, sub]) => (
            <a key={title} href="#" className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition-colors">
              <div className="text-sm font-semibold">{title}</div>
              <div className="text-xs text-gray-400">{sub}</div>
            </a>
          ))}
        </div>
      </section>

      {/* 3) Contact Support */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="text-xl font-semibold">Contact Support</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm">Email: <a href="mailto:startup@kilexep.com" className="text-orange-400 underline">startup@kilexep.com</a></p>
            <p className="text-xs text-gray-400 mt-1">We aim to reply within 1 business day.</p>
            <p className="text-sm mt-3">Phone (KST): <a href="tel:01058060224" className="text-orange-400 underline">010‑5806‑0224</a></p>
            <p className="text-sm">International: <a href="tel:+821058060224" className="text-orange-400 underline">+82‑10‑5806‑0224</a></p>
            <p className="text-xs text-gray-400 mt-1">Hours: Mon–Fri, 10:00–18:00 KST (excluding holidays)</p>
            <p className="text-xs text-gray-400">For urgent issues: Put [URGENT] at the start of your subject line.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a href="mailto:startup@kilexep.com" className="inline-flex rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600">Email Support</a>
              <a href="tel:+821058060224" className="inline-flex rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10">Call Us (KST hours)</a>
            </div>
          </div>
        </div>
      </section>

      {/* 4) FAQs */}
      <section className="mx-auto max-w-6xl px-6 py-8">
        <h2 className="text-xl font-semibold">FAQs</h2>
        <div className="mt-4 space-y-2">
          {[
            ['What’s included in each plan?', 'See the Pricing page for a simple comparison of analysis depth and monthly content limits.'],
            ['What counts as a “content piece”?', 'One approved SEO draft transformed into a GEO-ready variation.'],
            ['Can unused content pieces roll over?', 'No. Counts reset monthly to keep pace with trends.'],
            ['How do visibility checks work?', 'We run synthetic queries to evaluate surfacing and citations and compare strategies.'],
            ['How do I change plans or cancel?', 'You can change anytime; updates apply from the next billing cycle.'],
          ].map(([q, a]) => (
            <details key={q} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <summary className="cursor-pointer text-sm font-medium">{q}</summary>
              <p className="mt-2 text-sm text-gray-300">{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* 5) Account & Billing */}
      <section className="mx-auto max-w-6xl px-6 py-8">
        <h2 className="text-xl font-semibold">Account & Billing</h2>
        <div className="mt-3 text-sm text-gray-300 space-y-1">
          <p>• Update payment method and invoices from <strong>Account → Billing</strong>.</p>
          <p>• Taxes may apply by region. Prices shown in USD.</p>
        </div>
      </section>

      {/* 6) Troubleshooting */}
      <section className="mx-auto max-w-6xl px-6 py-8">
        <h2 className="text-xl font-semibold">Troubleshooting</h2>
        <div className="mt-3 text-sm text-gray-300 space-y-1">
          <p>• Content not appearing? Re‑run visibility checks and compare strategies.</p>
          <p>• Mismatched tone? Update brand voice settings in onboarding.</p>
          <p>• Need a human? Email us and include links/screenshots.</p>
        </div>
      </section>

      {/* 7) Data & Privacy */}
      <section className="mx-auto max-w-6xl px-6 py-8">
        <h2 className="text-xl font-semibold">Data & Privacy</h2>
        <div className="mt-3 text-sm text-gray-300 space-y-1">
          <p>• We minimize data collection, control access, and log changes.</p>
          <p>• Third‑party marks belong to their owners.</p>
        </div>
      </section>

      {/* 8) Status Note */}
      <section className="mx-auto max-w-6xl px-6 py-8">
        <h2 className="text-xl font-semibold">Status</h2>
        <p className="mt-2 text-sm text-gray-300">Service status and uptime: <a className="underline text-orange-400" href="#">[Status page link — placeholder]</a></p>
      </section>

      <PreFooter />
    </main>
  )
}




