'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'
import ProcessSteps from '../components/ProcessSteps'
import { getAuthStatus, logout, type User } from '../lib/auth'

interface ContentOptions {
  targetAudience: string
  purpose: string
  tone: string
  length: string
}

interface Topic {
  title: string
  description: string
  keyword: string
  keyword_id: number
  topic_id: string
}

interface GeneratedContent {
  topic_id: string
  topic_title: string
  topic_description: string
  keyword: string
  generated_at: number
  content: {
    title: string
    h1: string
    content: Array<{
      type: string
      text: string
    }>
    meta_description: string
    keywords: string[]
  }
}

export default function ContentGenerator() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [generatingTopics, setGeneratingTopics] = useState(false)
  const [generatingContent, setGeneratingContent] = useState(false)

  const currentStep = 3
  const [contentOptions, setContentOptions] = useState<ContentOptions>({
    targetAudience: '일반 사용자',
    purpose: '정보 제공',
    tone: '친근한',
    length: '중간'
  })
  const [topics, setTopics] = useState<Topic[]>([])
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent[]>([])
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

  const handleGenerateTopics = async () => {
    setGeneratingTopics(true)
    setError(null)

    try {
      const response = await axios.post('/api/generate-content-topics', {
        content_options: contentOptions
      })

      if (response.data.success) {
        setTopics(response.data.topics)
        setSelectedTopics([])
        setGeneratedContent([])
      } else {
        setError(response.data.error || '주제 생성에 실패했습니다.')
      }
    } catch (error) {
      console.error('주제 생성 오류:', error)
      setError('주제 생성 중 오류가 발생했습니다.')
    } finally {
      setGeneratingTopics(false)
    }
  }

  const handleGenerateContent = async () => {
    if (selectedTopics.length === 0) {
      setError('생성할 주제를 선택해주세요.')
      return
    }

    setGeneratingContent(true)
    setError(null)

    try {
      const selectedTopicObjects = topics.filter(topic => selectedTopics.includes(topic.topic_id))
      
      const response = await axios.post('/api/generate-content-from-topics', {
        selected_topics: selectedTopicObjects,
        content_options: contentOptions
      })

      if (response.data.success) {
        setGeneratedContent(response.data.generated_content)
      } else {
        setError(response.data.error || '콘텐츠 생성에 실패했습니다.')
      }
    } catch (error) {
      console.error('콘텐츠 생성 오류:', error)
      setError('콘텐츠 생성 중 오류가 발생했습니다.')
    } finally {
      setGeneratingContent(false)
    }
  }

  const handleTopicSelection = (topicId: string) => {
    setSelectedTopics(prev => 
      prev.includes(topicId) 
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    )
  }

  const handleLogout = logout

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
          <ProcessSteps currentStep={3} labels={["온보딩 분석", "트렌드 분석", "주제 생성", "콘텐츠 생성", "블로그 자동화"]} />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">주제 생성</h1>
          <p className="text-gray-600">트렌드 분석 결과를 기반으로 콘텐츠 주제를 생성하고 선택해보세요.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Content Options Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">콘텐츠 설정</h2>
            
            <div className="space-y-6">
              {/* Target Audience */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  대상 독자 *
                </label>
                <select
                  value={contentOptions.targetAudience}
                  onChange={(e) => setContentOptions(prev => ({ ...prev, targetAudience: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="일반 사용자">일반 사용자</option>
                  <option value="30대 여성">30대 여성</option>
                  <option value="40대 남성">40대 남성</option>
                  <option value="초보자">초보자</option>
                  <option value="전문가">전문가</option>
                  <option value="학생">학생</option>
                  <option value="직장인">직장인</option>
                </select>
              </div>

              {/* Purpose */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  콘텐츠 목적 *
                </label>
                <select
                  value={contentOptions.purpose}
                  onChange={(e) => setContentOptions(prev => ({ ...prev, purpose: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="정보 제공">정보 제공</option>
                  <option value="구매유도">구매유도</option>
                  <option value="브랜드 인지도">브랜드 인지도</option>
                </select>
              </div>

              {/* Tone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  톤앤매너
                </label>
                <select
                  value={contentOptions.tone}
                  onChange={(e) => setContentOptions(prev => ({ ...prev, tone: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="친근한">친근한</option>
                  <option value="전문적인">전문적인</option>
                  <option value="격식있는">격식있는</option>
                  <option value="재미있는">재미있는</option>
                </select>
              </div>

              {/* Length */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  콘텐츠 길이
                </label>
                <select
                  value={contentOptions.length}
                  onChange={(e) => setContentOptions(prev => ({ ...prev, length: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="짧은">짧은 (500자 이하)</option>
                  <option value="중간">중간 (500-1000자)</option>
                  <option value="긴">긴 (1000자 이상)</option>
                </select>
              </div>

              {/* Generate Topics Button */}
              <button
                onClick={handleGenerateTopics}
                disabled={generatingTopics}
                className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {generatingTopics ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    주제 생성 중...
                  </div>
                ) : (
                  '주제 생성하기'
                )}
              </button>

              {error && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Topics and Content Generation */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">주제 선택 및 콘텐츠 생성</h2>
            
            {topics.length > 0 ? (
              <div className="space-y-6">
                {/* Topics List */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">생성된 주제들</h3>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {topics.map((topic) => (
                      <div
                        key={topic.topic_id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedTopics.includes(topic.topic_id)
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleTopicSelection(topic.topic_id)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{topic.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{topic.description}</p>
                            <span className="inline-block mt-2 px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                              {topic.keyword}
                            </span>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ml-3 ${
                            selectedTopics.includes(topic.topic_id)
                              ? 'border-orange-500 bg-orange-500'
                              : 'border-gray-300'
                          }`}>
                            {selectedTopics.includes(topic.topic_id) && (
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Generate Content Button */}
                {selectedTopics.length > 0 && (
                  <div>
                    <button
                      onClick={handleGenerateContent}
                      disabled={generatingContent}
                      className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                      {generatingContent ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          콘텐츠 생성 중...
                        </div>
                      ) : (
                        `선택된 ${selectedTopics.length}개 주제로 콘텐츠 생성하기`
                      )}
                    </button>
                  </div>
                )}

                {/* Generated Content Display */}
                {generatedContent.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">생성된 콘텐츠</h3>
                    <div className="space-y-4">
                      {generatedContent.map((content, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-semibold text-gray-900 mb-2">{content.content.title}</h4>
                          <p className="text-sm text-gray-600 mb-3">{content.content.meta_description}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {content.content.keywords.map((keyword, idx) => (
                              <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                                {keyword}
                              </span>
                            ))}
                          </div>
                          <div className="text-xs text-gray-500">
                            생성일: {new Date(content.generated_at * 1000).toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Next Step Button */}
                    <div className="mt-6">
                      <button 
                        onClick={() => {
                          // Navigate to next step (블로그 자동화)
                          router.push('/blog-auto')
                        }}
                        className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                      >
                        다음 단계로
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <div className="text-4xl mb-4">📝</div>
                <p>주제를 생성해보세요!</p>
                <p className="text-sm">왼쪽에서 콘텐츠 설정을 하고 주제 생성 버튼을 클릭하세요.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
} 