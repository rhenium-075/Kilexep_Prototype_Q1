import Link from 'next/link'

export default function Signup() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800">
      {/* Background 3D Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-32 left-16 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-8 w-48 h-48 bg-purple-600/25 rounded-full blur-2xl"></div>
      </div>

      {/* Signup Form Container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6 py-12">
        <div className="bg-white rounded-2xl shadow-2xl p-12 w-full max-w-md">
          {/* Pitch Logo */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L22 7L12 12L2 7L12 2Z" fill="white" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900">Pitch</span>
            </div>
          </div>

          {/* Form Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Sign up</h1>
            <p className="text-gray-600 text-base leading-relaxed">
              Enter your work email to invite your teammates.
            </p>
          </div>

          {/* Email Input */}
          <div className="mb-6 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <input
              type="email"
              placeholder="Work email"
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base"
            />
          </div>

          {/* Sign Up Button */}
          <button className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium text-base hover:bg-purple-700 transition-colors mb-4">
            Sign up
          </button>

          {/* Google Workspace Button */}
          <button className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium text-base hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2 mb-8">
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>Sign up with Google Workspace</span>
          </button>

          {/* Footer Links */}
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Already have an account?</p>
            <Link href="/login" className="text-purple-600 text-sm hover:underline">
              Log in with email or SSO
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
