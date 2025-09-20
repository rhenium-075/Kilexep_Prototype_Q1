'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function DemoRequest() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 10)
    }
    window.addEventListener('scroll', handleScroll)
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleGoogleFormRedirect = () => {
    window.open('https://forms.gle/U3Bk833jSN4Zc3TGA', '_blank')
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-black via-orange-600 to-black">
      {/* Main gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-orange-600 to-black">
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

      {/* Navigation Logo */}
      <nav className="fixed top-0 left-0 right-0 z-[60] bg-transparent">
        <div className="pl-4 pr-6 py-4 flex items-center">
          <div className="flex items-center ml-4 w-48">
            <Link href="/" className="flex items-center space-x-0 hover:opacity-80 transition-opacity duration-200">
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

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-32 relative z-10">
        <div className="rounded-xl border border-gray-200 bg-white p-12 shadow-2xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full mb-6 shadow-xl">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">2025 Kilexep Beta Test Application</h1>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto mb-8">
              Kilexep GEO Marketing Solution is scheduled for beta testing distribution in November 2025. 
              Apply now to get early access to our powerful content automation platform.
            </p>
          </div>

          <div className="text-center space-y-6">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Apply for Beta Access</h3>
              <p className="text-gray-700 text-lg mb-6">
                Fill out our Google Form to join the beta testing program. We'll contact you individually when beta testing is ready.
              </p>
              
              <button
                onClick={handleGoogleFormRedirect}
                className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-8 rounded-xl font-bold text-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Apply for Beta Test
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Early Access</h4>
                <p className="text-gray-600 text-sm">Get first access to Kilexep's innovative GEO marketing solution</p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Beta Community</h4>
                <p className="text-gray-600 text-sm">Join our exclusive beta testing community and shape the product</p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Direct Feedback</h4>
                <p className="text-gray-600 text-sm">Provide feedback and influence the final product development</p>
              </div>
            </div>

            <div className="text-center mt-8">
              <p className="text-gray-500 text-sm">
                Beta testing is scheduled for November 2025. We'll contact you individually when ready.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 