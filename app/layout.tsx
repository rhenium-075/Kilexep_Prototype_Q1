import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import CsrfBootstrap from './components/CsrfBootstrap'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kilexep',
  description: 'Kilexep - Win more deals with beautiful presentations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
  
  // If Google Client ID is not set, render without OAuth provider
  if (!clientId) {
    console.warn('Google Client ID not set - OAuth features will be disabled')
    return (
      <html lang="en">
        <body className={inter.className}>
          <CsrfBootstrap />
          {children}
        </body>
      </html>
    )
  }
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <GoogleOAuthProvider clientId={clientId}>
          <CsrfBootstrap />
          {children}
        </GoogleOAuthProvider>
      </body>
    </html>
  )
} 