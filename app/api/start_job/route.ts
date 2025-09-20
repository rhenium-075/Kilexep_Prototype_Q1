import { NextRequest, NextResponse } from 'next/server'

const FLASK_BASE = process.env.FLASK_BASE_URL || 'http://localhost:80'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { naver_id, naver_pw } = body

    if (!naver_id || !naver_pw) {
      return NextResponse.json(
        { success: false, error: '네이버 계정 정보가 필요합니다.' },
        { status: 400 }
      )
    }

    // Flask 백엔드의 start_job API 호출
    const flaskRes = await fetch(`${FLASK_BASE}/start_job`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ naver_id, naver_pw }),
    })

    if (!flaskRes.ok) {
      const err = await flaskRes.json().catch(() => ({}))
      return NextResponse.json(
        { success: false, error: err?.error || '작업 시작 실패(백엔드)' },
        { status: 500 }
      )
    }

    const flaskData = await flaskRes.json()
    
    if (!flaskData.success) {
      return NextResponse.json(
        { success: false, error: flaskData.error || '작업 시작에 실패했습니다.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      job_id: flaskData.job_id,
      message: '작업이 시작되었습니다.'
    })
  } catch (error) {
    console.error('작업 시작 오류:', error)
    return NextResponse.json(
      { success: false, error: '작업 시작 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
} 