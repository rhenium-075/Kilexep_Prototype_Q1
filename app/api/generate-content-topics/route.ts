import { NextRequest, NextResponse } from 'next/server'

const FLASK_BASE = process.env.FLASK_BASE_URL || 'http://localhost:80'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { content_options } = body

    if (!content_options) {
      return NextResponse.json(
        { success: false, error: '콘텐츠 옵션이 필요합니다.' },
        { status: 400 }
      )
    }

    // Flask 백엔드의 generate-content-topics API 호출
    const flaskRes = await fetch(`${FLASK_BASE}/api/generate-content-topics`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content_options }),
    })

    if (!flaskRes.ok) {
      const err = await flaskRes.json().catch(() => ({}))
      return NextResponse.json(
        { success: false, error: err?.error || '주제 생성 실패(백엔드)' },
        { status: 500 }
      )
    }

    const flaskData = await flaskRes.json()
    
    if (!flaskData.success) {
      return NextResponse.json(
        { success: false, error: flaskData.error || '주제 생성에 실패했습니다.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      topics: flaskData.topics || []
    })
  } catch (error) {
    console.error('주제 생성 오류:', error)
    return NextResponse.json(
      { success: false, error: '주제 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
} 