'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'
import ProcessSteps from '../components/ProcessSteps'
import { getAuthStatus, logout, type User } from '../lib/auth'

interface TrendAnalysis {
  keywords: string[]
  trends: {
    keyword: string
    trend_score: number
    search_volume: number
    competition: string
    opportunity: string
  }[]
  insights: string[]
  recommendations: string[]
}

export default function TrendAnalyzer() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [analyzing, setAnalyzing] = useState(false)
  const [keywords, setKeywords] = useState('')
  const [extracted, setExtracted] = useState<string[]>([])
  const [analysis, setAnalysis] = useState<TrendAnalysis | null>(null)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const currentStep = 2


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
      
      // 온보딩에서 전달된 키워드 자동 로드
      try {
        const stored = localStorage.getItem('onboardingKeywords')
        if (stored) {
          const arr: string[] = JSON.parse(stored)
          setExtracted(arr)
          setKeywords(arr.join(', '))
        }
      } catch {}

      setLoading(false)
    }
    initAuth()
  }, [router])

  const handleAnalyzeTrends = async () => {
    if (!keywords.trim()) {
      setError('키워드를 입력해주세요.')
      return
    }

    setAnalyzing(true)
    setError(null)

    try {
      const keywordList = keywords.split(',').map(k => k.trim()).filter(k => k)
      
      const response = await axios.post('/api/analyze-trend-keywords', {
        keywords: keywordList
      })

      if (response.data.success) {
        setAnalysis(response.data.analysis)
      } else {
        setError(response.data.error || '트렌드 분석에 실패했습니다.')
      }
    } catch (error) {
      console.error('트렌드 분석 오류:', error)
      setError('트렌드 분석 중 오류가 발생했습니다.')
    } finally {
      setAnalyzing(false)
    }
  }

  const handleLogout = logout

  // 상단바 단순화: 로그아웃/내비 메뉴 제거

  const getTrendScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getCompetitionColor = (competition: string) => {
    if (competition === '낮음') return 'bg-green-100 text-green-800'
    if (competition === '보통') return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      {/* Header - always dark background */}
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

          {/* Center title */}
          <div className="flex-1 flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-200">
              Kilexep DEMO
            </span>
          </div>

          {/* Right placeholder for balance */}
          <div className="w-48" />
        </div>
      </nav>

      {/* Process Steps (positioned like main page) */}
      <div className="sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProcessSteps
            currentStep={2}
            labels={["온보딩 분석", "트렌드 분석", "주제 생성", "콘텐츠 생성", "블로그 자동화"]}
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-8 mt-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">트렌드 분석</h1>
          <p className="text-gray-600">키워드 트렌드를 분석하고 마케팅 인사이트를 얻어보세요.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">키워드 입력</h2>
            
            <div className="space-y-6">
              {extracted.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">온보딩에서 추출된 키워드</label>
                  <div className="flex flex-wrap gap-2">
                    {extracted.map((k, i) => (
                      <span key={`${k}-${i}`} className="px-2 py-1 bg-purple-100 text-purple-800 rounded-md text-sm">{k}</span>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  분석할 키워드 (쉼표로 구분){extracted.length ? ' - 자동으로 채워졌어요' : ' *'}
                </label>
                <textarea
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="예: AI 마케팅, 디지털 마케팅, 콘텐츠 마케팅"
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                />
                <p className="text-sm text-gray-500 mt-2">
                  여러 키워드를 쉼표로 구분하여 입력하세요.
                </p>
              </div>

              <button
                id="analyzeTrendsBtn"
                onClick={handleAnalyzeTrends}
                disabled={analyzing || !keywords.trim()}
                className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {analyzing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    분석 중...
                  </div>
                ) : (
                  '트렌드 분석하기'
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
          <div className="lg:col-span-2 space-y-6">
            {analysis ? (
              <>
                {/* Trends Overview */}
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">트렌드 분석 결과</h2>
                  
                  <div className="space-y-4">
                    {analysis.trends.map((trend, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-gray-900">{trend.keyword}</h3>
                          <div className="flex items-center space-x-4">
                            <div className="text-center">
                              <div className={`text-lg font-bold ${getTrendScoreColor(trend.trend_score)}`}>
                                {trend.trend_score}
                              </div>
                              <div className="text-xs text-gray-500">트렌드 점수</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-blue-600">
                                {trend.search_volume}
                              </div>
                              <div className="text-xs text-gray-500">검색량</div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCompetitionColor(trend.competition)}`}>
                              {trend.competition}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{trend.opportunity}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Insights */}
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">인사이트</h2>
                  
                  <div className="space-y-4">
                    {analysis.insights.map((insight, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700">{insight}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">추천사항</h2>
                  
                  <div className="space-y-4">
                    {analysis.recommendations.map((recommendation, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700">{recommendation}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button 
                    onClick={() => {
                      // Navigate to next step (주제 생성)
                      router.push('/content-generator')
                    }}
                    className="flex-1 bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                  >
                    다음 단계로
                  </button>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="text-center py-12 text-gray-500">
                  <div className="text-4xl mb-4">📊</div>
                  <p>트렌드 분석을 시작해보세요!</p>
                  <p className="text-sm">왼쪽에서 키워드를 입력하고 분석 버튼을 클릭하세요.</p>
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
              <div className="text-3xl mb-3">📈</div>
              <h4 className="font-semibold text-gray-900 mb-2">트렌드 점수</h4>
              <p className="text-sm text-gray-600">
                키워드의 현재 인기도와 성장 가능성을 분석합니다.
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🔍</div>
              <h4 className="font-semibold text-gray-900 mb-2">검색량 분석</h4>
              <p className="text-sm text-gray-600">
                월간 검색량을 기반으로 키워드의 잠재력을 평가합니다.
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">⚔️</div>
              <h4 className="font-semibold text-gray-900 mb-2">경쟁도 분석</h4>
              <p className="text-sm text-gray-600">
                경쟁 강도를 분석하여 진입 가능성을 판단합니다.
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">💡</div>
              <h4 className="font-semibold text-gray-900 mb-2">AI 인사이트</h4>
              <p className="text-sm text-gray-600">
                AI가 분석한 마케팅 전략과 콘텐츠 제안을 제공합니다.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 