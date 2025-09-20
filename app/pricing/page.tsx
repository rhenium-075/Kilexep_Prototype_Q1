'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import PreFooter from '../components/PreFooter'

export default function PricingPage() {
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
      <section className="relative overflow-hidden pt-32">
        <div className="absolute -top-24 left-0 right-0 bottom-0 pointer-events-none" aria-hidden>
          <div className="absolute -inset-40 bg-gradient-to-br from-orange-500/20 via-orange-600/10 to-black/0 blur-3xl" />
          </div>
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Pick a plan. Start the GEO flywheel.</h1>
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-gray-300">From first experiments to serious scale—choose the depth of analysis and how much content you want to generate each month.</p>
          <div className="mt-6 text-xs text-gray-400">Monthly · Annual (save X%)</div>
        </div>
      </section>

      {/* 2) Plans (3 Cards) */}
      <section className="mx-auto max-w-6xl px-6 pt-12 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Free */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col">
            <h3 className="text-lg font-semibold">Free</h3>
            <div className="text-4xl font-extrabold">$0<span className="text-base font-medium text-gray-300"> / month</span></div>
            <p className="mt-2 text-sm text-gray-300">Try GEO with essential tools.</p>
            <ul className="mt-6 space-y-2 text-sm text-gray-200">
              <li>• <strong>Deep Marketing Analysis:</strong> <em>Basic</em> (trend scan, ~5 topic clusters)</li>
              <li>• <strong>Monthly Content Generation:</strong> <em>up to 5 pieces</em> (SEO→GEO included)</li>
              <li>• <strong>AI Visibility Checks:</strong> <em>light</em> (basic surfacing snapshot)</li>
              <li>• <strong>Support:</strong> community only</li>
            </ul>
            <div className="mt-6 flex justify-center">
              <a className="inline-flex w-48 items-center justify-center rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 transition-colors" href="#">Get Started Free</a>
            </div>
          </div>

          {/* Plus */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col">
            <h3 className="text-lg font-semibold">Plus</h3>
            <div className="text-4xl font-extrabold">$20<span className="text-base font-medium text-gray-300"> / month</span></div>
            <p className="mt-2 text-sm text-gray-300">Grow with deeper insights and more content.</p>
            <ul className="mt-6 space-y-2 text-sm text-gray-200">
              <li>• <strong>Deep Marketing Analysis:</strong> <em>Standard</em> (audience + competitor sampling)</li>
              <li>• <strong>Monthly Content Generation:</strong> <em>up to 30 pieces</em></li>
              <li>• <strong>AI Visibility Checks:</strong> <em>standard</em> (strategy comparisons)</li>
              <li>• <strong>Support:</strong> email support</li>
            </ul>
            <div className="mt-6 flex justify-center">
              <a className="inline-flex w-48 items-center justify-center rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 transition-colors" href="#">Get plus</a>
            </div>
            </div>

          {/* Pro */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col">
            <h3 className="text-lg font-semibold">Pro</h3>
            <div className="text-4xl font-extrabold">$200<span className="text-base font-medium text-gray-300"> / month</span></div>
            <p className="mt-2 text-sm text-gray-300">Serious volume and advanced optimization.</p>
            <ul className="mt-6 space-y-2 text-sm text-gray-200">
              <li>• <strong>Deep Marketing Analysis:</strong> <em>Advanced</em> (persona/JTBD, trend index breadth)</li>
              <li>• <strong>Monthly Content Generation:</strong> <em>up to 200 pieces</em></li>
              <li>• <strong>AI Visibility Checks:</strong> <em>advanced</em> (citation tracking & winners)</li>
              <li>• <strong>Support:</strong> priority support</li>
            </ul>
            <div className="mt-6 flex justify-center">
              <a className="inline-flex w-48 items-center justify-center rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 transition-colors" href="#">Get Pro</a>
            </div>
          </div>
        </div>
        <p className="mt-4 text-xs text-gray-400">“Content pieces” count includes SEO drafts transformed to GEO variations. Limits reset monthly.</p>
      </section>

      {/* 3) Comparison (Short) */}
      <section className="mx-auto max-w-6xl px-6 py-8">
        <div className="overflow-hidden rounded-xl border border-white/10">
          <div className="grid grid-cols-4 bg-white/5 text-sm">
            <div className="p-3 text-gray-300">&nbsp;</div>
            <div className="p-3 font-semibold">Free</div>
            <div className="p-3 font-semibold">Pro</div>
            <div className="p-3 font-semibold">Scale</div>
          </div>
          {[
            ['Deep Marketing Analysis', 'Basic', 'Standard', 'Advanced'],
            ['Monthly Content Generation', '5', '30', '200'],
            ['AI Visibility Checks', 'Light', 'Standard', 'Advanced'],
            ['Multi-Strategy Publishing', 'Limited', 'Expanded', 'Full'],
            ['Team Seats', '1', '3', '10'],
            ['Support', 'Community', 'Email', 'Priority'],
          ].map((row, idx) => (
            <div key={idx} className={`grid grid-cols-4 text-sm ${idx % 2 === 0 ? 'bg-white/0' : 'bg-white/5'}`}>
              <div className="p-3 text-gray-300">{row[0]}</div>
              <div className="p-3">{row[1]}</div>
              <div className="p-3">{row[2]}</div>
              <div className="p-3">{row[3]}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 4) Notes & FAQ */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-300">
          <div className="space-y-2">
            <h3 className="text-white font-semibold">Notes</h3>
            <p>• Fair use: Heavy usage may require add-on credits; we’ll notify you in-app.</p>
            <p>• Billing: Prices in USD; taxes may apply.</p>
            <p>• Upgrades/Downgrades: Change plans anytime; prorated at the next cycle.</p>
            <p>• Trials: Free plan is permanent; no card required.</p>
            </div>
          <div className="space-y-4">
            <h3 className="text-white font-semibold">FAQ</h3>
            <div>
              <p className="font-medium">What counts as a “content piece”?</p>
              <p className="text-gray-400">One approved SEO draft transformed into a GEO-ready variation.</p>
            </div>
            <div>
              <p className="font-medium">Can I roll over unused pieces?</p>
              <p className="text-gray-400">No—counts reset monthly to keep pace with trends.</p>
            </div>
            <div>
              <p className="font-medium">What’s included in Deep Marketing Analysis?</p>
              <p className="text-gray-400">Level-based depth: from trend scans to persona/JTBD and competitor mapping.</p>
            </div>
          </div>
              </div>
      </section>

      <PreFooter />
    </main>
  )
}
