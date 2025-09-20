import { NextRequest, NextResponse } from 'next/server'

const FLASK_BASE = process.env.FLASK_BASE_URL || 'http://localhost:80'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { interview_text } = body

    if (!interview_text) {
      return NextResponse.json(
        { success: false, error: '인터뷰 텍스트가 필요합니다.' },
        { status: 400 }
      )
    }

    // 1) Flask 온보딩 분석 호출 (Gemini 기반 키워드 추출)
    const flaskRes = await fetch(`${FLASK_BASE}/api/analyze-onboarding`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: interview_text }),
    })

    if (!flaskRes.ok) {
      const err = await flaskRes.json().catch(() => ({}))
      return NextResponse.json(
        { success: false, error: err?.error || '온보딩 분석 실패(백엔드)' },
        { status: 500 }
      )
    }

    const flaskData = await flaskRes.json()
    const result = flaskData?.result || {}

    // 2) 키워드 후보 구성 (콘텐츠 수요 키워드 우선 + 제품군 보완)
    const demand = Array.isArray(result['콘텐츠 수요 키워드']) ? result['콘텐츠 수요 키워드'] : []
    const product = Array.isArray(result['제품군']) ? result['제품군'] : []
    const combined = Array.from(new Set([...demand, ...product])).slice(0, 8)

    // 기존 프론트의 데모용 분석 스키마 유지(화면용), 키워드는 별도 제공
    const analysis = {
      pain_points: [
        '콘텐츠 제작 시간이 너무 오래 걸림',
        'SEO 최적화가 어려움',
        '일관된 브랜드 톤앤매너 유지가 어려움',
      ],
      motivations: [
        '효율적인 콘텐츠 제작',
        '검색 엔진 최적화',
        '브랜드 인지도 향상',
      ],
      expectations: [
        '자동화된 콘텐츠 생성',
        'SEO 분석 및 최적화',
        '브랜드 일관성 유지',
      ],
      feedback: [
        '사용자 친화적인 인터페이스',
        '실시간 분석 결과',
        '맞춤형 콘텐츠 제안',
      ],
      recommendations: [
        '키워드 기반 콘텐츠 생성',
        '트렌드 분석 통합',
        '자동 블로그 포스팅',
      ],
      customer_journey: [
        { stage: '인지', insights: ['검색을 통한 서비스 발견', '소셜미디어를 통한 브랜드 인지'] },
        { stage: '관심', insights: ['무료 데모 체험', '사용 사례 확인'] },
        { stage: '고려', insights: ['가격 비교', '기능 비교', '리뷰 확인'] },
        { stage: '구매', insights: ['플랜 선택', '결제 진행'] },
        { stage: '사용', insights: ['온보딩 완료', '정기 사용'] },
      ],
      sentiment_score: 75,
    }

    return NextResponse.json({
      success: true,
      analysis,
      extracted_keywords: combined,
    })
  } catch (error) {
    console.error('온보딩 분석 오류:', error)
    return NextResponse.json(
      { success: false, error: '온보딩 분석 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}