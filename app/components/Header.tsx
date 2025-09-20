"use client"

import { ChevronDown, User, LogOut } from "lucide-react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { getAuthStatus, logout } from "../lib/auth"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [showUserMenu, setShowUserMenu] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const status = await getAuthStatus()
        setIsAuthenticated(status.logged_in)
        setUser(status.user)
      } catch (error) {
        console.error('Failed to check auth status:', error)
      }
    }

    checkAuthStatus()
  }, [])

  const handleLogout = async () => {
    try {
      await logout()
      setIsAuthenticated(false)
      setUser(null)
      setShowUserMenu(false)
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="mx-auto flex max-w-7xl items-center justify-start px-6 py-4">
        <div className="flex items-center">
          <div className="flex items-center space-x-0">
            <div className="rounded-lg bg-white p-1">
              <img src="/logo.svg" alt="Kilexep Logo" width="32" height="32" />
            </div>
            <span className={`text-2xl font-bold transition-colors ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}>Kilexep</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className={`transition-colors cursor-not-allowed opacity-50 ${
            isScrolled 
              ? 'text-gray-700' 
              : 'text-white'
          }`}>
            Features
          </a>
          <a href="#" className={`transition-colors cursor-not-allowed opacity-50 ${
            isScrolled 
              ? 'text-gray-700' 
              : 'text-white'
          }`}>
            How It Works
          </a>
          <a href="#" className={`transition-colors cursor-not-allowed opacity-50 ${
            isScrolled 
              ? 'text-gray-700' 
              : 'text-white'
          }`}>
            Built with Kilexep
          </a>
          <a href="#" className={`transition-colors cursor-not-allowed opacity-50 ${
            isScrolled 
              ? 'text-gray-700' 
              : 'text-white'
          }`}>
            Help
          </a>

          {/* Product */}
          <div className="relative">
            <button className={`flex items-center space-x-1 transition-colors cursor-not-allowed opacity-50 ${
              isScrolled 
                ? 'text-gray-700' 
                : 'text-white'
            }`}>
              <span>Product</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            <div className="absolute top-full left-0 mt-2 w-64 bg-orange-50 border border-orange-200 rounded-lg shadow-lg opacity-0 invisible transition-all duration-200 z-50">
              <div className="p-4">
                <div className="text-orange-700 font-semibold mb-2">Discover Kilexep</div>
                <div className="space-y-2 text-sm">
                  <a href="#" className="block py-1 text-gray-700 hover:text-orange-600 hover:bg-orange-100 rounded px-2 transition-colors">Product Overview</a>
                  <a href="#" className="block py-1 text-gray-700 hover:text-orange-600 hover:bg-orange-100 rounded px-2 transition-colors">What's New</a>
                  <a href="#" className="block py-1 text-gray-700 hover:text-orange-600 hover:bg-orange-100 rounded px-2 transition-colors">Integrations</a>
                  <a href="#" className="block py-1 text-gray-700 hover:text-orange-600 hover:bg-orange-100 rounded px-2 transition-colors">Content Gallery</a>
                  <a href="#" className="block py-1 text-gray-700 hover:text-orange-600 hover:bg-orange-100 rounded px-2 transition-colors">Download</a>
                  <a href="#" className="block py-1 text-gray-700 hover:text-orange-600 hover:bg-orange-100 rounded px-2 transition-colors">Status</a>
                </div>
              </div>
            </div>
          </div>

          {/* Use Cases */}
          <div className="relative">
            <button className={`flex items-center space-x-1 transition-colors cursor-not-allowed opacity-50 ${
              isScrolled 
                ? 'text-gray-700' 
                : 'text-white'
            }`}>
              <span>Use Cases</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            <div className="absolute top-full left-0 mt-2 w-64 bg-orange-50 border border-orange-200 rounded-lg shadow-lg opacity-0 invisible transition-all duration-200 z-50">
              <div className="p-4">
                <div className="text-orange-700 font-semibold mb-2">Teams</div>
                <div className="space-y-2 text-sm mb-4">
                  <a href="#" className="block py-1 text-gray-700 hover:text-orange-600 hover:bg-orange-100 rounded px-2 transition-colors">Agencies</a>
                  <a href="#" className="block py-1 text-gray-700 hover:text-orange-600 hover:bg-orange-100 rounded px-2 transition-colors">Sales</a>
                  <a href="#" className="block py-1 text-gray-700 hover:text-orange-600 hover:bg-orange-100 rounded px-2 transition-colors">Customer Success</a>
                  <a href="#" className="block py-1 text-gray-700 hover:text-orange-600 hover:bg-orange-100 rounded px-2 transition-colors">Marketing</a>
                  <a href="#" className="block py-1 text-gray-700 hover:text-orange-600 hover:bg-orange-100 rounded px-2 transition-colors">Designers</a>
                </div>
                <div className="text-orange-700 font-semibold mb-2">Content</div>
                <div className="space-y-2 text-sm">
                  <a href="#" className="block py-1 text-gray-700 hover:text-orange-600 hover:bg-orange-100 rounded px-2 transition-colors">Content Generator</a>
                  <a href="#" className="block py-1 text-gray-700 hover:text-orange-600 hover:bg-orange-100 rounded px-2 transition-colors">Blog Auto</a>
                  <a href="#" className="block py-1 text-gray-700 hover:text-orange-600 hover:bg-orange-100 rounded px-2 transition-colors">Trend Analyzer</a>
                  <a href="#" className="block py-1 text-gray-700 hover:text-orange-600 hover:bg-orange-100 rounded px-2 transition-colors">Onboarding</a>
                  <a href="#" className="block py-1 text-gray-700 hover:text-orange-600 hover:bg-orange-100 rounded px-2 transition-colors">SEO Tools</a>
                </div>
              </div>
            </div>
          </div>

          {/* Templates */}
          <div className="relative">
            <button className={`flex items-center space-x-1 transition-colors cursor-not-allowed opacity-50 ${
              isScrolled 
                ? 'text-gray-700' 
                : 'text-white'
            }`}>
              <span>Templates</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            <div className="absolute top-full left-0 mt-2 w-64 bg-orange-50 border border-orange-200 rounded-lg shadow-lg opacity-0 invisible transition-all duration-200 z-50">
              <div className="p-4">
                <div className="text-orange-700 font-semibold mb-2">Popular</div>
                <div className="space-y-2 text-sm mb-4">
                  <a href="#" className="block py-1 text-gray-700 hover:text-orange-600 hover:bg-orange-100 rounded px-2 transition-colors">Blog Posts</a>
                  <a href="#" className="block py-1 text-gray-700 hover:text-orange-600 hover:bg-orange-100 rounded px-2 transition-colors">SEO Content</a>
                  <a href="#" className="block py-1 text-gray-700 hover:text-orange-600 hover:bg-orange-100 rounded px-2 transition-colors">Marketing</a>
                  <a href="#" className="block py-1 text-gray-700 hover:text-orange-600 hover:bg-orange-100 rounded px-2 transition-colors">Startups</a>
                  <a href="#" className="block py-1 text-gray-700 hover:text-orange-600 hover:bg-orange-100 rounded px-2 transition-colors">Professional</a>
                </div>
                <div className="text-orange-700 font-semibold mb-2">Creative</div>
                <div className="space-y-2 text-sm">
                  <a href="#" className="block py-1 text-gray-700 hover:text-orange-600 hover:bg-orange-100 rounded px-2 transition-colors">Agency</a>
                  <a href="#" className="block py-1 text-gray-700 hover:text-orange-600 hover:bg-orange-100 rounded px-2 transition-colors">Portfolio</a>
                  <a href="#" className="block py-1 text-gray-700 hover:text-orange-600 hover:bg-orange-100 rounded px-2 transition-colors">Brand</a>
                  <a href="#" className="block py-1 text-gray-700 hover:text-orange-600 hover:bg-orange-100 rounded px-2 transition-colors">Creative</a>
                  <a href="#" className="block py-1 text-gray-700 hover:text-orange-600 hover:bg-orange-100 rounded px-2 transition-colors">Modern</a>
                </div>
              </div>
            </div>
          </div>

          {/* Resources */}
          <div className="relative">
            <button className={`flex items-center space-x-1 transition-colors cursor-not-allowed opacity-50 ${
              isScrolled 
                ? 'text-gray-700' 
                : 'text-white'
            }`}>
              <span>Resources</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            <div className="absolute top-full left-0 mt-2 w-64 bg-orange-50 border border-orange-200 rounded-lg shadow-lg opacity-0 invisible transition-all duration-200 z-50">
              <div className="p-4">
                <div className="text-orange-700 font-semibold mb-2">Learn</div>
                <div className="space-y-2 text-sm">
                  <a href="#" className="block py-1 text-gray-700 hover:text-orange-600 hover:bg-orange-100 rounded px-2 transition-colors">Blog</a>
                  <a href="#" className="block py-1 text-gray-700 hover:text-orange-600 hover:bg-orange-100 rounded px-2 transition-colors">Content Guide</a>
                  <a href="#" className="block py-1 text-gray-700 hover:text-orange-600 hover:bg-orange-100 rounded px-2 transition-colors">Academy</a>
                  <a href="#" className="block py-1 text-gray-700 hover:text-orange-600 hover:bg-orange-100 rounded px-2 transition-colors">SEO Guide</a>
                  <a href="#" className="block py-1 text-gray-700 hover:text-orange-600 hover:bg-orange-100 rounded px-2 transition-colors">Help Center</a>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <button className={`transition-colors cursor-not-allowed opacity-50 ${
            isScrolled 
              ? 'text-gray-700' 
              : 'text-white'
          }`}>
            Pricing
          </button>
        </nav>

        <div className="flex items-center space-x-4">
          {isAuthenticated && user ? (
            <div className="relative">
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  isScrolled 
                    ? 'text-gray-700 hover:bg-orange-50' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <User className="h-4 w-4" />
                <span className="hidden md:inline">{user.name || user.email}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {showUserMenu && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-2">
                    <Link 
                      href="/dashboard"
                      className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Dashboard
                    </Link>
                    <Link 
                      href="/content-generator"
                      className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Content Generator
                    </Link>
                    <Link 
                      href="/trend-analyzer"
                      className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Trend Analyzer
                    </Link>
                    <hr className="my-2" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Log out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link 
                href="/login"
                className={`transition-colors px-4 py-2 rounded-lg ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-orange-500 hover:bg-orange-50' 
                    : 'text-white hover:text-orange-300 hover:bg-white/10'
                }`}
              >
                Log in
              </Link>
              <Link 
                href="/signup"
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isScrolled 
                    ? 'bg-orange-500 text-white hover:bg-orange-600' 
                    : 'bg-white text-blue-700 hover:bg-gray-100'
                }`}
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
} 