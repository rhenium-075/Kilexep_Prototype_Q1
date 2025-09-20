'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Login() {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setIsAnimating(true)
  }, [])
  
  return (
    <div className="min-h-screen relative">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="pl-4 pr-6 py-4 flex items-center">
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
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom right, #000000, #ea580c, #000000)',
          opacity: isAnimating ? 1 : 0,
          transition: 'opacity 1.5s ease-in-out'
        }}>
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-20"></div>
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
          </div>
        </div>

        <div className="absolute inset-0" style={{
          background: 'white',
          clipPath: 'polygon(0 80%, 100% 20%, 100% 100%, 0 100%)'
        }}></div>
      </div>

      {/* Login Form Container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6 py-10">
        <div className={`bg-white rounded-2xl shadow-2xl p-12 w-full max-w-xl min-h-[520px] transition-all duration-1000 ease-in-out delay-500 ${
          isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Logo */}
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

          {/* Coming Soon Message */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full mb-6 shadow-xl">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Coming Soon</h1>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Kilexep will officially launch in November 2025. We're working hard to bring you the most advanced content automation platform.
            </p>
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-2xl p-6 mb-8">
              <h2 className="text-xl font-bold text-orange-800 mb-3">What to expect:</h2>
              <ul className="text-left text-orange-700 space-y-2">
                <li className="flex items-center">
                  <span className="mr-3">🚀</span>
                  AI-powered content generation
                </li>
                <li className="flex items-center">
                  <span className="mr-3">📊</span>
                  Advanced trend analysis
                </li>
                <li className="flex items-center">
                  <span className="mr-3">⚡</span>
                  Automated blog publishing
                </li>
                <li className="flex items-center">
                  <span className="mr-3">🎯</span>
                  GEO optimization tools
                </li>
              </ul>
            </div>
            <Link 
              href="/demo" 
              className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Request Demo Access
            </Link>
          </div>

          {/* Privacy Notice */}
          <div className="text-center mt-6">
            <div className="text-xs text-gray-500 leading-relaxed">
              <p>We will process your data as set forth in our</p>
              <p className="mt-1">
                <Link href="/terms" className="text-purple-600 hover:underline">Terms of Use</Link>, {' '}
                <Link href="/privacy" className="text-purple-600 hover:underline">Privacy Policy</Link> and {' '}
                <Link href="/data-processing" className="text-purple-600 hover:underline">Data Processing Agreement</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}