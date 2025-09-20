'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import ThreeObjects from "@/components/ThreeObjects"

export default function Home() {
  const guiRef = useRef<HTMLDivElement>(null)

  // GUI 스크롤 사라지는 효과 제거

  return (
    <div className="min-h-screen relative">
      {/* 3D Objects */}
      <ThreeObjects />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-purple-600/95 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="rounded-lg bg-white p-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L22 7L12 12L2 7L12 2Z" fill="#6C38CC" stroke="#6C38CC" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="#6C38CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="#6C38CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-xl font-bold text-white">Pitch</span>
          </div>

          <div className="hidden md:flex items-center space-x-8 text-white">
            <a href="#" className="hover:text-purple-200">Product</a>
            <a href="#" className="hover:text-purple-200">Use Cases</a>
            <a href="#" className="hover:text-purple-200">Templates</a>
            <a href="#" className="hover:text-purple-200">Resources</a>
            <a href="#" className="hover:text-purple-200">Pricing</a>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-white hover:text-purple-200">Log in</Link>
            <Link href="/signup" className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-purple-50">
              Sign up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section with Purple Background and U-shaped Bottom */}
      <section className="relative">
        {/* Purple Background with U-shaped Bottom using SVG */}
        <div className="relative">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1440 900"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full"
            style={{ height: '100%' }}
          >
            <defs>
              {/* Blue to purple gradient for main background - left blue, right purple */}
              <linearGradient id="purpleSolidColor" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{stopColor: '#5B3BD1', stopOpacity: 1}} />
                <stop offset="15%" style={{stopColor: '#6366F1', stopOpacity: 1}} />
                <stop offset="40%" style={{stopColor: '#7C3AED', stopOpacity: 1}} />
                <stop offset="70%" style={{stopColor: '#8B5CF6', stopOpacity: 1}} />
                <stop offset="85%" style={{stopColor: '#A855F7', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: '#C084FC', stopOpacity: 1}} />
              </linearGradient>

              {/* Natural transition gradient only at the U-curve boundary */}
              <linearGradient id="boundaryShadowGradient" x1="0%" y1="70%" x2="0%" y2="100%">
                <stop offset="0%" style={{stopColor: '#FFFFFF', stopOpacity: 0}} />
                <stop offset="25%" style={{stopColor: '#FFFFFF', stopOpacity: 0.3}} />
                <stop offset="50%" style={{stopColor: '#FFFFFF', stopOpacity: 0.6}} />
                <stop offset="75%" style={{stopColor: '#FFFFFF', stopOpacity: 0.4}} />
                <stop offset="100%" style={{stopColor: '#FFFFFF', stopOpacity: 0.2}} />
              </linearGradient>
            </defs>

            {/* Solid purple background with U-shaped bottom */}
            <path
              d="M0,0 L1440,0 L1440,700 C1080,850 360,850 0,700 Z"
              fill="url(#purpleSolidColor)"
            />
          </svg>

          {/* Natural boundary gradient below the purple area */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(to bottom, transparent 65%, rgba(255, 255, 255, 0.4) 75%, rgba(255, 255, 255, 0.35) 80%, rgba(255, 255, 255, 0.3) 85%, rgba(255, 255, 255, 0.25) 90%, rgba(255, 255, 255, 0.15) 95%, transparent 100%)`
            }}
          >
          </div>

          {/* Hero Content */}
          <div className="relative z-20 flex flex-col items-center justify-center px-6 pt-32 pb-16">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                Win more deals.
                <br />
                <span className="text-white">Pitch.</span>
              </h1>

              <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
                Pitch turns presentations into your team's superpower. Close deals, win
                clients, and expand accounts — all while staying on brand.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link href="/dashboard" className="bg-white text-purple-700 hover:bg-purple-50 px-8 py-4 text-lg font-semibold rounded-lg transition-colors">
                  Get start
                </Link>
                <button className="border-2 border-white text-white hover:bg-white hover:text-purple-700 px-8 py-4 text-lg font-semibold rounded-lg transition-colors">
                  Get a demo
                </button>
              </div>
            </div>
          </div>

          {/* GUI Mockup - Higher Position */}
          <div
            ref={guiRef}
            className="relative z-30 px-6 mb-0"
          >
            <div className="max-w-6xl mx-auto">
              <div
                className="bg-white rounded-2xl overflow-hidden w-full"
                style={{
                  boxShadow: '0 25px 60px rgba(0,0,0,0.15), 0 8px 30px rgba(0,0,0,0.1)',
                  height: '600px'
                }}
              >
                {/* MacOS Browser Header */}
                <div className="bg-white px-6 py-4 flex items-center border-b">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-red-400 rounded-full"></div>
                    <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                    <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="bg-white rounded-md px-6 py-2 text-base text-gray-600 max-w-lg mx-auto">
                      pitch.com/presentations/new
                    </div>
                  </div>
                </div>

                {/* Presentation Editor Interface */}
                <div className="flex h-full">
                  {/* Left Sidebar - Slide Thumbnails */}
                  <div className="w-32 bg-white border-r p-4">
                    <div className="space-y-3">
                      {[1, 2, 3, 4].map((slide) => (
                        <div
                          key={slide}
                          className={`aspect-[4/3] rounded border-2 ${
                            slide === 1 ? 'border-purple-500 bg-purple-50' : 'border-gray-200 bg-white'
                          }`}
                        >
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="text-sm text-gray-400">{slide}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Main Editor Canvas */}
                  <div className="flex-1 bg-gradient-to-br from-purple-500 to-pink-500 relative">
                    {/* Toolbar */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <div className="flex items-center space-x-3 bg-white/20 backdrop-blur rounded-lg px-4 py-2">
                        <button className="text-white text-base">Text</button>
                        <button className="text-white/70 text-base">Shape</button>
                        <button className="text-white/70 text-base">Media</button>
                        <button className="text-white/70 text-base">Chart</button>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button className="bg-white text-purple-600 px-4 py-2 rounded text-base font-medium">
                          Share
                        </button>
                      </div>
                    </div>

                    {/* Slide Content */}
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                      <div className="bg-white/10 backdrop-blur rounded-lg p-8 max-w-md text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">
                          SpaceWork x Omnexis
                        </h2>
                        <p className="text-white/90 mb-6 text-base">
                          Streamline your business flow with one integrated platform that brings everyone together.
                        </p>
                        <div className="space-y-3 text-left">
                          <div className="flex items-center space-x-3 text-white/90">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                            <span className="text-base">Revenue overview</span>
                          </div>
                          <div className="flex items-center space-x-3 text-white/90">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                            <span className="text-base">Customer outreach</span>
                          </div>
                          <div className="flex items-center space-x-3 text-white/90">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                            <span className="text-base">Get to KPIs</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Comment/Share Sidebar */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <div className="bg-white/20 backdrop-blur rounded-lg p-2 space-y-2">
                        <button className="w-10 h-10 bg-white/20 rounded text-white text-base flex items-center justify-center">
                          💬
                        </button>
                        <button className="w-10 h-10 bg-white/20 rounded text-white text-base flex items-center justify-center">
                          🔗
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* White Content Section */}
      <section className="bg-white py-8 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Trusted by 3M+ teams worldwide
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center opacity-60 mt-12">
            <div className="text-gray-600 text-lg font-semibold">Primer</div>
            <div className="text-gray-600 text-lg font-semibold">IEQT</div>
            <div className="text-gray-600 text-lg font-semibold">feedly</div>
            <div className="text-gray-600 text-lg font-semibold">4D</div>
            <div className="text-gray-600 text-lg font-semibold">THRIVE</div>
          </div>
        </div>
      </section>

      {/* Template Gallery Section */}
      <section className="py-16 px-6 bg-white">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Get a head <span className="text-purple-600">start with</span>
            <br />
            <span className="text-gray-700">free templates</span>
          </h2>

          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Choose from 100+ fully customizable templates crafted by subject matter
            experts and presentation design pros. Or upload your existing PPTX file.
          </p>

          <Button variant="outline" className="mb-12 border-purple-600 text-purple-600 hover:bg-purple-50">
            Explore the templates gallery →
          </Button>

          {/* Template Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg aspect-[3/4] p-4 text-white text-xs">
                <div className="h-full flex flex-col justify-between">
                  <div className="text-left">
                    <div className="w-8 h-1 bg-white/60 mb-2"></div>
                    <div className="w-12 h-1 bg-white/40 mb-1"></div>
                    <div className="w-10 h-1 bg-white/40"></div>
                  </div>
                  <div className="text-center">
                    <div className="w-full h-8 bg-white/20 rounded mb-2"></div>
                    <div className="text-xs opacity-75">Template {i + 1}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Pitch works */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="mx-auto max-w-6xl text-center">
          <div className="bg-yellow-400 text-black px-4 py-2 rounded-lg inline-block mb-8">
            How Pitch works
          </div>

          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            Pitch is the complete pitching platform that takes your design and delivery
            to the next level. Keep everyone on brand with templates, collaborate on
            slides, and share decks or entire deal rooms.
          </p>

          <Button className="bg-purple-600 text-white hover:bg-purple-700 mb-12">
            Create a presentation
          </Button>

          {/* 4 Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-left">
              <div className="text-3xl font-bold text-purple-600 mb-4">1 — Start</div>
              <h3 className="text-xl font-bold mb-4">Generate, discover, or build a template</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✓ Start with AI or expert-made templates.</li>
                <li>✓ Create custom templates for your team.</li>
                <li>✓ Upload your own fonts and brand assets.</li>
              </ul>
              <Button variant="outline" className="mt-4 text-purple-600 border-purple-600">
                Start exploring now
              </Button>
            </div>

            <div className="text-left">
              <div className="text-3xl font-bold text-purple-600 mb-4">2 — Edit</div>
              <h3 className="text-xl font-bold mb-4">Create sleek slides faster than ever</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✓ Quickly add text, images, and interactive content.</li>
                <li>✓ Build elegant animations in seconds.</li>
                <li>✓ Collaborate with others in real time.</li>
              </ul>
              <Button variant="outline" className="mt-4 text-purple-600 border-purple-600">
                Start creating now
              </Button>
            </div>

            <div className="text-left">
              <div className="text-3xl font-bold text-purple-600 mb-4">3 — Share</div>
              <h3 className="text-xl font-bold mb-4">Convince anyone, from anywhere</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✓ Share your presentation with a live link.</li>
                <li>✓ Gather decks, links, and files in pitch rooms.</li>
                <li>✓ Present with notes, a timer, and other aids.</li>
              </ul>
              <Button variant="outline" className="mt-4 text-purple-600 border-purple-600">
                Start sharing now
              </Button>
            </div>

            <div className="text-left">
              <div className="text-3xl font-bold text-purple-600 mb-4">4 — Measure</div>
              <h3 className="text-xl font-bold mb-4">Know what's working and who's engaged</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✓ Track who opens and views your presentation.</li>
                <li>✓ Get real-time notifications for engagement.</li>
                <li>✓ Review detailed analytics to iterate and improve.</li>
              </ul>
              <Button variant="outline" className="mt-4 text-purple-600 border-purple-600">
                Start measuring now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Templates</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Use Cases</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Sales</a></li>
                <li><a href="#" className="hover:text-white">Marketing</a></li>
                <li><a href="#" className="hover:text-white">Consulting</a></li>
                <li><a href="#" className="hover:text-white">Education</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Webinars</a></li>
                <li><a href="#" className="hover:text-white">Community</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Press</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="rounded-lg bg-purple-600 p-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L22 7L12 12L2 7L12 2Z" fill="white" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">Pitch</span>
            </div>

            <div className="flex items-center space-x-6">
              <span className="text-sm text-gray-500">© Copyright 2025 Pitch Software GmbH. All rights reserved.</span>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-purple-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
