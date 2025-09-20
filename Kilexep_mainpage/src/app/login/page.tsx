import Link from 'next/link'

export default function Login() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800">
      {/* Background 3D Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-32 left-16 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-8 w-48 h-48 bg-purple-600/25 rounded-full blur-2xl"></div>
      </div>

      {/* Login Form Container */}
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

          {/* Form Content */}
          <div className="text-center mb-8">
            <p className="text-gray-600 text-base leading-relaxed">
              We'll sign you in or create an account if you don't have one yet.
            </p>
          </div>

          {/* Email Input */}
          <div className="mb-6">
            <input
              type="email"
              placeholder="Work email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base"
            />
          </div>

          {/* Continue with Email Button */}
          <button className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium text-base hover:bg-purple-700 transition-colors mb-4">
            Continue with email
          </button>

          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            <button className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium text-base hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Continue with Google</span>
            </button>

            <button className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium text-base hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <span>Continue with Apple</span>
            </button>

            <button className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium text-base hover:bg-gray-50 transition-colors">
              Single sign-on (SSO)
            </button>
          </div>

          {/* Footer Links */}
          <div className="text-center space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">Would you rather use email and password?</p>
              <Link href="/login/email" className="text-purple-600 text-sm hover:underline">
                Continue with email and password
              </Link>
            </div>

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
