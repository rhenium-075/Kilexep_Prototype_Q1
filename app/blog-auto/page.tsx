'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ProcessSteps from '../components/ProcessSteps'
import axios from 'axios'
import { getAuthStatus, logout, requireAuth, type User } from '../lib/auth'

interface JobStatus {
  status: string
  progress: number
  message: string
  results?: any[]
}

export default function BlogAuto() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [naverId, setNaverId] = useState('')
  const [naverPw, setNaverPw] = useState('')
  const [jobId, setJobId] = useState<string | null>(null)
  const [jobStatus, setJobStatus] = useState<JobStatus | null>(null)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()


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

  useEffect(() => {
    if (jobId) {
      const interval = setInterval(async () => {
        try {
          const response = await axios.get(`/api/job_status/${jobId}`)
          setJobStatus(response.data)
          
          if (response.data.status === 'completed' || response.data.status === 'failed') {
            clearInterval(interval)
          }
        } catch (error) {
          console.error('작업 상태 확인 오류:', error)
        }
      }, 2000)

      return () => clearInterval(interval)
    }
  }, [jobId])



  const handleStartJob = async () => {
    if (!naverId.trim() || !naverPw.trim()) {
      setError('네이버 아이디와 비밀번호를 입력해주세요.')
      return
    }

    setUploading(true)
    setError(null)

    try {
      const response = await axios.post('/api/start_job', {
        naver_id: naverId,
        naver_pw: naverPw
      })

      if (response.data.success) {
        setJobId(response.data.job_id)
        setJobStatus({
          status: 'starting',
          progress: 0,
          message: '작업을 시작합니다...'
        })
      } else {
        setError(response.data.error || '작업 시작에 실패했습니다.')
      }
    } catch (error) {
      console.error('작업 시작 오류:', error)
      setError('작업 시작 중 오류가 발생했습니다.')
    } finally {
      setUploading(false)
    }
  }

  const handleLogout = logout

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'starting': return 'text-blue-600'
      case 'running': return 'text-green-600'
      case 'completed': return 'text-green-600'
      case 'failed': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'starting': return '🔄'
      case 'running': return '⚡'
      case 'completed': return '✅'
      case 'failed': return '❌'
      default: return '⏳'
    }
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
          <ProcessSteps currentStep={5} labels={["온보딩 분석", "트렌드 분석", "주제 생성", "콘텐츠 생성", "블로그 자동화"]} />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">블로그 자동화</h1>
          <p className="text-gray-600">생성된 콘텐츠를 네이버 블로그에 자동으로 포스트를 작성합니다.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Setup Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">설정</h2>
            
            <div className="space-y-6">
              {/* Generated Content Info */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  생성된 콘텐츠 정보
                </label>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="text-2xl mr-3">📝</div>
                    <div>
                      <p className="text-blue-800 font-medium">콘텐츠 생성 완료</p>
                      <p className="text-blue-600 text-sm">이전 단계에서 생성된 콘텐츠를 자동으로 블로그에 작성합니다.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Naver Credentials */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    네이버 아이디 *
                  </label>
                  <input
                    type="text"
                    value={naverId}
                    onChange={(e) => setNaverId(e.target.value)}
                    placeholder="네이버 아이디를 입력하세요"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    네이버 비밀번호 *
                  </label>
                  <input
                    type="password"
                    value={naverPw}
                    onChange={(e) => setNaverPw(e.target.value)}
                    placeholder="네이버 비밀번호를 입력하세요"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Start Button */}
              <button
                onClick={handleStartJob}
                disabled={uploading || !naverId.trim() || !naverPw.trim()}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {uploading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    자동화 시작 중...
                  </div>
                ) : (
                  '자동화 시작하기'
                )}
              </button>

              {error && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Job Status */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">작업 상태</h2>
            
            {jobStatus ? (
              <div className="space-y-6">
                {/* Status */}
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getStatusIcon(jobStatus.status)}</span>
                  <div>
                    <p className={`font-semibold ${getStatusColor(jobStatus.status)}`}>
                      {jobStatus.status === 'starting' && '작업 시작 중...'}
                      {jobStatus.status === 'running' && '실행 중...'}
                      {jobStatus.status === 'completed' && '완료'}
                      {jobStatus.status === 'failed' && '실패'}
                    </p>
                    <p className="text-sm text-gray-600">{jobStatus.message}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${jobStatus.progress}%` }}
                  ></div>
                </div>

                {/* Results */}
                {jobStatus.results && jobStatus.results.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">결과</h3>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {jobStatus.results.map((result, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{result.title}</span>
                            <span className={`text-sm px-2 py-1 rounded ${
                              result.status === 'success' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {result.status === 'success' ? '성공' : '실패'}
                            </span>
                          </div>
                          {result.url && (
                            <a 
                              href={result.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:underline"
                            >
                              블로그 포스트 보기
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                {jobStatus.status === 'completed' && (
                  <div className="flex space-x-3">
                    <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                      결과 다운로드
                    </button>
                                         <button 
                       onClick={() => {
                         setJobId(null)
                         setJobStatus(null)
                         setNaverId('')
                         setNaverPw('')
                       }}
                       className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
                     >
                       새 작업 시작
                     </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <div className="text-4xl mb-4">🤖</div>
                <p>자동화를 시작해보세요!</p>
                <p className="text-sm">왼쪽에서 설정을 완료하고 시작 버튼을 클릭하세요.</p>
              </div>
            )}
          </div>
        </div>

                 {/* Instructions */}
         <div className="mt-8 bg-white rounded-2xl p-8 shadow-lg">
           <h3 className="text-lg font-semibold text-gray-900 mb-4">사용 방법</h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="text-center">
               <div className="text-3xl mb-3">📝</div>
               <h4 className="font-semibold text-gray-900 mb-2">1. 콘텐츠 생성 완료</h4>
               <p className="text-sm text-gray-600">
                 이전 단계에서 생성된 콘텐츠가 자동으로 사용됩니다. 콘텐츠 생성 페이지에서 먼저 콘텐츠를 생성하세요.
               </p>
             </div>
             <div className="text-center">
               <div className="text-3xl mb-3">🔐</div>
               <h4 className="font-semibold text-gray-900 mb-2">2. 네이버 계정 입력</h4>
               <p className="text-sm text-gray-600">
                 네이버 아이디와 비밀번호를 입력하세요. 자동화 과정에서 사용됩니다.
               </p>
             </div>
             <div className="text-center">
               <div className="text-3xl mb-3">🚀</div>
               <h4 className="font-semibold text-gray-900 mb-2">3. 자동화 실행</h4>
               <p className="text-sm text-gray-600">
                 시작 버튼을 클릭하면 자동으로 블로그 포스트가 작성됩니다.
               </p>
             </div>
           </div>
         </div>
      </main>
    </div>
  )
} 