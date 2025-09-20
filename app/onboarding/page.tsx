'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'
import ProcessSteps from '../components/ProcessSteps'
import { getAuthStatus, logout, type User } from '../lib/auth'

interface OnboardingAnalysis {
  pain_points: string[]
  motivations: string[]
  expectations: string[]
  feedback: string[]
  recommendations: string[]
  customer_journey: {
    stage: string
    insights: string[]
  }[]
  sentiment_score: number
}

export default function Onboarding() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [analyzing, setAnalyzing] = useState(false)
  const [interviewText, setInterviewText] = useState('')
  const [analysis, setAnalysis] = useState<OnboardingAnalysis | null>(null)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const [extractedKeywords, setExtractedKeywords] = useState<string[]>([])

  useEffect(() => {
    const initAuth = async () => {
      try {
        const status = await getAuthStatus()
        if (status.logged_in && status.user) {
          setUser(status.user)
        } else {
          // 데모용으로 로그인 없이도 접근 가능하도록 수정
          setUser({
            name: 'Demo User',
            email: 'demo@kilexep.com',
            picture: '/logo.svg',
            sub: 'demo'
          })
        }
      } catch {
        // Fallback to demo user
        setUser({
          name: 'Demo User',
          email: 'demo@kilexep.com',
          picture: '/logo.svg',
          sub: 'demo'
        })
      }
      setLoading(false)
    }
    initAuth()
  }, [router])



  const handleAnalyzeOnboarding = async () => {
    if (!interviewText.trim()) {
      setError('인터뷰 텍스트를 입력해주세요.')
      return
    }

    setAnalyzing(true)
    setError(null)

    try {
      const response = await axios.post('/api/analyze-onboarding', {
        interview_text: interviewText
      })

      if (response.data.success) {
        setAnalysis(response.data.analysis)
        const extracted = Array.isArray(response.data.extracted_keywords)
          ? response.data.extracted_keywords
          : []
        setExtractedKeywords(extracted)
        try {
          localStorage.setItem('onboardingKeywords', JSON.stringify(extracted))
        } catch {}
      } else {
        setError(response.data.error || '온보딩 분석에 실패했습니다.')
      }
    } catch (error) {
      console.error('온보딩 분석 오류:', error)
      setError('온보딩 분석 중 오류가 발생했습니다.')
    } finally {
      setAnalyzing(false)
    }
  }

  const handleLogout = logout

  const getSentimentColor = (score: number) => {
    if (score >= 70) return 'text-green-600'
    if (score >= 50) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getSentimentLabel = (score: number) => {
    if (score >= 70) return '매우 긍정적'
    if (score >= 50) return '보통'
    return '부정적'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 relative overflow-hidden">
             {/* Header - always dark background since no scroll area */}
       <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-md border-b border-gray-700 shadow-xl">
         <div className="pl-4 pr-6 py-4 flex items-center">
           {/* Logo - Left */}
           <div className="flex items-center ml-4 w-48">
             <Link href="/" className="flex items-center space-x-0">
               <div className="rounded-lg bg-transparent p-1.5">
                 <img 
                   src="/logo.svg" 
                   alt="Kilexep Logo" 
                   width="45" 
                   height="45" 
                   className="transition-all duration-500"
                 />
               </div>
               <span className="text-3xl font-bold italic text-orange-500 animate-logo-change transition-all duration-300">
                 Kilexep
               </span>
             </Link>
           </div>

           {/* Center Title */}
           <div className="flex-1 flex items-center justify-center">
             <span className="text-2xl font-bold text-gray-200">
               Kilexep DEMO
             </span>
           </div>

           {/* Right placeholder to balance layout */}
           <div className="w-48">
           </div>
         </div>
       </nav>

      {/* Process Steps (positioned like main page) */}
      <div className="sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProcessSteps
            currentStep={1}
            labels={["온보딩 분석", "트렌드 분석", "주제 생성", "콘텐츠 생성", "블로그 자동화"]}
          />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">온보딩 분석</h1>
          <p className="text-gray-600">고객 온보딩 인터뷰를 분석하여 인사이트를 도출해보세요.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">인터뷰 텍스트 입력</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  온보딩 인터뷰 텍스트 *
                </label>
                <textarea
                  value={interviewText}
                  onChange={(e) => setInterviewText(e.target.value)}
                  placeholder="고객과의 온보딩 인터뷰 내용을 입력하세요..."
                  rows={12}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                />
                <p className="text-sm text-gray-500 mt-2">
                  고객의 니즈, 문제점, 기대사항 등이 포함된 인터뷰 내용을 입력하세요.
                </p>
              </div>

              <button
                onClick={handleAnalyzeOnboarding}
                disabled={analyzing || !interviewText.trim()}
                className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {analyzing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    분석 중...
                  </div>
                ) : (
                  '온보딩 분석하기'
                )}
              </button>

              {error && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Analysis Results */}
          <div className="space-y-6">
            {analysis ? (
              <>
                {/* Extracted Keywords only (make this the main output) */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">추출된 키워드</h2>
                    <button
                      onClick={() => router.push('/trend-analyzer')}
                      className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700"
                    >
                      트렌드 분석으로 이동
                    </button>
                  </div>
                  {extractedKeywords.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {extractedKeywords.map((kw, idx) => (
                        <span key={`${kw}-${idx}`} className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-sm">
                          {kw}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">추출된 키워드가 없습니다.</p>
                  )}
                </div>
              </>
            ) : (
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="text-center py-12 text-gray-500">
                  <div className="text-4xl mb-4">🎯</div>
                  <p>온보딩 분석을 시작해보세요!</p>
                  <p className="text-sm">왼쪽에서 인터뷰 텍스트를 입력하고 분석 버튼을 클릭하세요.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">분석 기능</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">😊</div>
              <h4 className="font-semibold text-gray-900 mb-2">감정 분석</h4>
              <p className="text-sm text-gray-600">
                고객의 감정 상태와 만족도를 분석합니다.
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🎯</div>
              <h4 className="font-semibold text-gray-900 mb-2">문제점 도출</h4>
              <p className="text-sm text-gray-600">
                고객이 겪고 있는 주요 문제점을 식별합니다.
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🚀</div>
              <h4 className="font-semibold text-gray-900 mb-2">고객 여정</h4>
              <p className="text-sm text-gray-600">
                온보딩 과정의 각 단계별 인사이트를 제공합니다.
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">💡</div>
              <h4 className="font-semibold text-gray-900 mb-2">개선 제안</h4>
              <p className="text-sm text-gray-600">
                AI가 분석한 온보딩 프로세스 개선 방안을 제시합니다.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}