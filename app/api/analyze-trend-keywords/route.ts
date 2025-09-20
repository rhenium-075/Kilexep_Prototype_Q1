import { NextRequest, NextResponse } from 'next/server'

const FLASK_BASE = process.env.FLASK_BASE_URL || 'http://localhost:80'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { keywords } = body

    if (!keywords || !Array.isArray(keywords) || keywords.length === 0) {
      return NextResponse.json(
        { success: false, error: '키워드가 필요합니다.' },
        { status: 400 }
      )
    }

    // Flask 트렌드 분석 호출 (현재는 간이 시뮬레이션)
    const flaskRes = await fetch(`${FLASK_BASE}/api/analyze-trend-keywords`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ keywords }),
    })

    if (!flaskRes.ok) {
      const err = await flaskRes.json().catch(() => ({}))
      return NextResponse.json(
        { success: false, error: err?.error || '트렌드 분석 실패(백엔드)' },
        { status: 500 }
      )
    }

    const flaskData = await flaskRes.json()

    // Flask는 { success, results, analysis_summary } 형태를 반환함 → 프론트 스키마에 맞춰 변환
    const groups = flaskData?.results || {}
    const merged = [
      ...(groups.high_trend || []),
      ...(groups.medium_trend || []),
      ...(groups.low_trend || []),
    ]

    const analysis = {
      keywords,
      trends: merged.map((item: any) => ({
        keyword: item.base_keyword,
        trend_score: Number(item.trend_score) || 70,
        search_volume: Number(item.search_volume?.volume) || 1000,
        competition: (item.intent?.primary_intent === '정보' ? '보통' : '낮음'),
        opportunity: item.search_volume?.trend === '상승' ? '높음' : '보통',
      })),
      insights: [
        '상승 트렌드 키워드에 집중하세요.',
        '검색량과 경쟁도를 함께 고려한 우선순위를 설정하세요.',
        '관련 키워드 묶음으로 콘텐츠 클러스터를 구성하세요.',
      ],
      recommendations: [
        '상위 트렌드 키워드로 기획 문서부터 작성',
        '검색량 1,500+이면서 경쟁도 보통 이하 키워드 선별',
        '중복 키워드는 의도에 따라 분화하여 시리즈화',
      ],
    }

    return NextResponse.json({ success: true, analysis })
  } catch (error) {
    console.error('트렌드 분석 오류:', error)
    return NextResponse.json(
      { success: false, error: '트렌드 분석 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}