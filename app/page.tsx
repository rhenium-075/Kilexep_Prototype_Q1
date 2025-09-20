'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { getAuthStatus, logout } from './lib/auth'

// Dynamic imports removed - focusing on beta test application only


export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState<{ name?: string; picture?: string } | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      console.log('Scroll position:', scrollTop)
      setIsScrolled(scrollTop > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const status = await getAuthStatus()
        setLoggedIn(status.logged_in)
        setUser(status.user || null)
      } catch (_) {
        setLoggedIn(false)
        setUser(null)
      }
    }
    checkStatus()
  }, [])
  return (
    <div className="min-h-screen relative">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/90 backdrop-blur-md border-b border-gray-700 shadow-xl' : 'bg-transparent border-b border-transparent'}`}>
        <div className="pl-4 pr-6 py-4 relative flex items-center">
          {/* Logo - Left */}
          <div className="flex items-center ml-4 min-w-0 flex-shrink-0">
            <Link href="/" className="flex items-center space-x-0">
              <div className="rounded-lg bg-transparent p-1.5">
                <Image 
                  src="/logo.svg" 
                  alt="Kilexep Logo" 
                  width={45} 
                  height={45} 
                  className={`transition-all duration-500 ${
                    isScrolled 
                      ? '' 
                      : 'filter brightness-0 invert'
                  }`}
                  priority
                />
              </div>
              <span className={`text-3xl font-bold italic transition-all duration-300 ${
                isScrolled 
                  ? 'text-orange-500 animate-logo-change' 
                  : 'text-white'
              }`}>
                Kilexep
              </span>
            </Link>
          </div>

          {/* Navigation Menu - Center (absolute center to ignore left/right width) */}
          <div className={`hidden md:flex items-center space-x-8 transition-all duration-300 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${
            isScrolled ? 'text-gray-200' : 'text-white'
          }`}>
            <Link href="/" className="relative px-4 py-3 rounded-lg transition-all duration-300 hover:text-white group text-lg overflow-hidden">
              <span className="relative z-10">Home</span>
              <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100"></div>
            </Link>
            <a href="#" className="relative px-4 py-3 rounded-lg transition-all duration-300 group text-lg overflow-hidden cursor-not-allowed opacity-50">
              <span className="relative z-10">Features</span>
            </a>
            <a href="#" className="relative px-4 py-3 rounded-lg transition-all duration-300 group text-lg overflow-hidden cursor-not-allowed opacity-50">
              <span className="relative z-10">How It Works</span>
            </a>
            <a href="#" className="relative px-4 py-3 rounded-lg transition-all duration-300 group text-lg overflow-hidden cursor-not-allowed opacity-50">
              <span className="relative z-10">Built with Kilexep</span>
            </a>
            <a href="#" className="relative px-4 py-3 rounded-lg transition-all duration-300 group text-lg overflow-hidden cursor-not-allowed opacity-50">
              <span className="relative z-10">Help</span>
            </a>
            <a href="#" className="relative px-4 py-3 rounded-lg transition-all duration-300 group text-lg overflow-hidden cursor-not-allowed opacity-50">
              <span className="relative z-10">Pricing</span>
            </a>
          </div>

          {/* Auth Actions - Right */}
          <div className="flex items-center space-x-4 flex-shrink-0 ml-auto">
            <Link href="/login" className={`transition-all duration-300 hover:text-orange-400 text-lg ${
              isScrolled ? 'text-gray-200' : 'text-white'
            }`}>
              Login
            </Link>
            <Link href="/signup" className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 text-lg ${
              isScrolled 
                ? 'bg-orange-500 text-white hover:bg-orange-600' 
                : 'bg-white text-gray-900 hover:bg-gray-100'
            }`}>
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-20 bg-gradient-to-br from-black via-orange-600 to-black overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative">
            {/* White Gradient Point in Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-20"></div>
            
            {/* Background Objects */}
            <div className="absolute inset-0 overflow-hidden">
              <img 
                className="absolute top-20 right-20 w-32 h-32 opacity-30" 
                src="https://res.cloudinary.com/pitch-software/image/upload/website/homepage/hero/png/object_2.png" 
                alt="" 
                loading="eager"
                decoding="async"
              />
              <img 
                className="absolute top-40 left-10 w-24 h-24 opacity-25" 
                src="https://res.cloudinary.com/pitch-software/image/upload/website/homepage/hero/png/objcet_1.png" 
                alt="" 
                loading="eager"
                decoding="async"
              />
              <img 
                className="absolute bottom-20 right-10 w-28 h-28 opacity-35" 
                src="https://res.cloudinary.com/pitch-software/image/upload/website/homepage/hero/png/object_3.png" 
                alt="" 
                loading="eager"
                decoding="async"
              />
              <img 
                className="absolute top-60 left-1/3 w-20 h-20 opacity-20" 
                src="https://res.cloudinary.com/pitch-software/image/upload/website/homepage/hero/png/object_4.png" 
                alt="" 
                loading="eager"
                decoding="async"
              />
              <img 
                className="absolute bottom-40 left-1/4 w-16 h-16 opacity-30" 
                src="https://res.cloudinary.com/pitch-software/image/upload/website/homepage/hero/png/object_5.png" 
                alt="" 
                loading="eager"
                decoding="async"
              />
              {/* Additional 3D objects for better distribution */}
              <img 
                className="absolute top-1/4 right-1/3 w-20 h-20 opacity-25" 
                src="https://res.cloudinary.com/pitch-software/image/upload/website/homepage/hero/png/object_2.png" 
                alt="" 
                loading="eager"
                decoding="async"
              />
              <img 
                className="absolute bottom-1/3 left-1/2 w-24 h-24 opacity-20" 
                src="https://res.cloudinary.com/pitch-software/image/upload/website/homepage/hero/png/objcet_1.png" 
                alt="" 
                loading="eager"
                decoding="async"
              />
              <img 
                className="absolute top-1/3 right-1/4 w-16 h-16 opacity-30" 
                src="https://res.cloudinary.com/pitch-software/image/upload/website/homepage/hero/png/object_3.png" 
                alt="" 
                loading="eager"
                decoding="async"
              />
            </div>

            {/* Hero Content */}
            <div className="relative z-10 text-center py-16">
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
                <span>Designed</span> <span>to</span> <span>Survive.</span> <span>Kilexep.</span>
              </h1>

              <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed" style={{ fontSize: '1.8rem' }}>
                11 million startups fail every year because of marketing.<br />
                Kilexep automates every step of organic content to make sure<br />
                yours isn't one of them.
              </p>

              <div className="flex flex-col sm:flex-row gap-8 justify-center mb-16 relative z-20">
                <Link 
                  href="/signup" 
                  className="bg-white text-slate-800 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 cursor-pointer w-56 h-16 flex items-center justify-center"
                >
                 Sign up for free
                </Link>
                <Link 
                  href="/demo" 
                  className="border-2 border-white text-white hover:border-4 hover:bg-white hover:text-slate-800 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 cursor-pointer w-56 h-16 flex items-center justify-center"
                >
                 Try a Demo Now
                </Link>
              </div>

              {/* Light Effect - Elliptical Gradient */}
              <div className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 w-[3200px] h-[1000px] rounded-full blur-3xl z-0" style={{ background: 'radial-gradient(ellipse 1600px 500px at center bottom, rgba(255, 255, 255, 1.0) 0%, rgba(255, 255, 255, 0.9) 12%, rgba(255, 255, 255, 0.7) 25%, rgba(255, 255, 255, 0.5) 40%, rgba(255, 255, 255, 0.3) 55%, rgba(255, 255, 255, 0.15) 70%, rgba(255, 255, 255, 0.08) 85%, rgba(255, 255, 255, 0.02) 95%, transparent 100%)' }}></div>
              <div className="absolute -bottom-30 left-1/2 transform -translate-x-1/2 w-[3000px] h-[900px] rounded-full blur-2xl z-0" style={{ background: 'radial-gradient(ellipse 1500px 450px at center bottom, rgba(255, 255, 255, 1.0) 0%, rgba(255, 255, 255, 0.85) 15%, rgba(255, 255, 255, 0.65) 30%, rgba(255, 255, 255, 0.45) 45%, rgba(255, 255, 255, 0.25) 60%, rgba(255, 255, 255, 0.12) 75%, rgba(255, 255, 255, 0.05) 90%, transparent 100%)' }}></div>
              <div className="absolute -bottom-28 left-1/2 transform -translate-x-1/2 w-[2800px] h-[800px] rounded-full blur-xl z-0" style={{ background: 'radial-gradient(ellipse 1400px 400px at center bottom, rgba(255, 255, 255, 1.0) 0%, rgba(255, 255, 255, 0.8) 18%, rgba(255, 255, 255, 0.6) 35%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0.22) 65%, rgba(255, 255, 255, 0.1) 80%, rgba(255, 255, 255, 0.03) 92%, transparent 100%)' }}></div>

              {/* Modern GUI Mockup */}
              <div className="relative bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-3xl shadow-2xl overflow-hidden max-w-7xl mx-auto border border-gray-200/50" style={{ minHeight: '650px' }}>
                {/* Glass morphism effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/60 to-gray-50/80 backdrop-blur-sm rounded-3xl"></div>
                
                {/* Modern Browser Header */}
                <div className="relative bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-5 flex items-center border-b border-gray-200/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-400 rounded-full shadow_sm"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full shadow_sm"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full shadow_sm"></div>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl px-8 py-3 text-sm text-gray-700 max-w-md mx-auto shadow-sm border border-gray-200/30">
                      <span className="font-medium">Kilexep</span> • Content Automation Platform
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  </div>
                </div>

                {/* Main Interface */}
                <div className="flex h-[600px] relative">
                  {/* Enhanced Left Sidebar */}
                  <div className="w-80 bg-white/70 backdrop-blur-md border-r border-gray-200/50 p-8 relative">
                    <div className="flex items-center space-x-4 mb-8">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                        K
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">Kilexep AI</h3>
                        <p className="text-sm text-gray-500">Content Automation</p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-8 leading-relaxed">
                      Welcome to Kilexep! Your AI-powered content creation platform. Generate GEO content, analyze trends, and automate publishing — all while staying on brand.
                    </p>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                          <span className="mr-2">🚀</span>
                          Quick Actions
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100/50">
                            <span className="text-blue-600">📝</span>
                            <span className="text-sm font-medium text-gray-700">Generate GEO Content</span>
                          </div>
                          <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100/50">
                            <span className="text-green-600">📊</span>
                            <span className="text-sm font-medium text-gray-700">Analyze Trends</span>
                          </div>
                          <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-100/50">
                            <span className="text-orange-600">⚡</span>
                            <span className="text-sm font-medium text-gray-700">Auto Publish</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-gray-200/50">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3">Recent Activity</h4>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-xl border border-gray-200/30">
                            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              A
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">AI Content Generated</p>
                              <p className="text-xs text-gray-500">2 minutes ago</p>
                            </div>
                          </div>
                          <div className="flex items_center space-x-3 p-3 bg-white/50 rounded-xl border border-gray-200/30">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              T
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">Trend Analysis Complete</p>
                              <p className="text-xs text-gray-500">5 minutes ago</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Main Content Area */}
                  <div className="flex-1 bg-gradient-to-br from_slate-800 via-purple-900 to-indigo-900 relative overflow-hidden">
                    {/* Complex gradient overlays */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 animate-pulse"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-red-500/20"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/15 via-transparent to-pink-500/15"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10"></div>
                    
                    {/* Animated mesh gradient */}
                    <div className="absolute inset-0 opacity-30">
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-600/30 via-pink-600/20 to-orange-600/30 animate-pulse"></div>
                      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-blue-600/20 via-cyan-600/15 to-purple-600/25 animate-pulse delay-1000"></div>
                    </div>
                    
                    {/* Floating geometric elements */}
                    <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-orange-500/30 to-red-500/30 rounded-full blur-xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-20 w-16 h-16 bg-gradient-to-br from-purple-500/40 to-pink-500/40 rounded-full blur-lg animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/3 w-12 h-12 bg-gradient-to-br from-blue-500/35 to-cyan-500/35 rounded-full blur-md animate-pulse delay-500"></div>
                    <div className="absolute top-1/4 right-1/4 w-14 h-14 bg-gradient-to-br from-green-500/25 to-emerald-500/25 rounded-full blur-lg animate-pulse delay-1500"></div>
                    <div className="absolute bottom-1/3 left-1/4 w-10 h-10 bg-gradient-to-br from-yellow-500/30 to-orange-500/30 rounded-full blur-md animate-pulse delay-750"></div>
                    
                    {/* Animated lines and shapes */}
                    <div className="absolute top-1/4 left-0 w-32 h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent transform rotate-45 animate-pulse"></div>
                    <div className="absolute bottom-1/3 right-0 w-24 h-0.5 bg-gradient-to-l from-transparent via-purple-400/40 to-transparent transform -rotate-45 animate-pulse delay-500"></div>
                    <div className="absolute top-1/2 left-0 w-20 h-0.5 bg-gradient-to-r from-transparent via-orange-400/35 to-transparent transform rotate-30 animate-pulse delay-1000"></div>
                    
                    {/* Glowing orbs */}
                    <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-gradient_to-r from-white/50 to-transparent rounded-full animate-pulse"></div>
                    <div className="absolute bottom-1/4 left-1/3 w-6 h-6 bg-gradient_to-r from-purple-400/60 to-transparent rounded-full animate-pulse delay-750"></div>
                    <div className="absolute top-2/3 right-1/4 w-4 h-4 bg-gradient_to-r from-orange-400/70 to-transparent rounded-full animate-pulse delay-1250"></div>
                    
                    <div className="relative z-10 h-full flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="mb-8">
                          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 via-red-500 to-purple-600 rounded-3xl flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-2xl animate-pulse">
                            K
                          </div>
                        </div>
                        <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white via-orange-200 to-purple-200 bg-clip-text text-transparent animate-pulse">
                          KILEXEP
                        </h2>
                        <h3 className="text-2xl font-semibold mb-4 text-orange-300">Content Automation</h3>
                        <p className="text-lg opacity-90 text-gray-300 max-w-md mx-auto leading-relaxed">
                          AI-powered content creation that scales with your business
                        </p>
                        
                        {/* Enhanced status indicators */}
                        <div className="flex items-center justify-center space-x-6 mt-10">
                          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
                            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-sm text-green-300 font-medium">AI Active</span>
                          </div>
                          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
                            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-500"></div>
                            <span className="text-sm text-blue-300 font-medium">Processing</span>
                          </div>
                          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
                            <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse delay-1000"></div>
                            <span className="text-sm text-purple-300 font-medium">Learning</span>
                          </div>
                        </div>
                        
                        {/* Floating metrics */}
                        <div className="absolute top-1/4 left-1/4 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-white">98%</div>
                            <div className="text-xs text-gray-300">Accuracy</div>
                          </div>
                        </div>
                        <div className="absolute bottom-1/4 right-1/4 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-white">2.3s</div>
                            <div className="text-xs text-gray-300">Avg Speed</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Enhanced Action Buttons */}
                    <div className="absolute top-6 right-6 flex space-x-3">
                      <button className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 text-white text-sm font-medium flex items-center space-x-2 border border-white/20 hover:bg-white/30 transition-all duration-200 shadow-lg">
                        <span>📊</span>
                        <span>Analytics</span>
                      </button>
                      <button className="bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 rounded-xl px-4 py-2 text-white text-sm font-medium flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-200 animate-pulse">
                        <span>⚡</span>
                        <span>Generate</span>
                      </button>
                    </div>
                    
                    {/* Enhanced Progress indicator */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-2xl">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm text-white/90 font-medium">Content Generation Progress</span>
                          <span className="text-sm text-white/90 font-bold">75%</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-3 mb-2">
                          <div className="bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 h-3 rounded-full w-3/4 animate-pulse shadow-lg"></div>
                        </div>
                        <div className="flex justify-between text-xs text-white/70">
                          <span>Analyzing trends...</span>
                          <span>2.3s remaining</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
} 