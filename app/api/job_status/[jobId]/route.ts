import { NextRequest, NextResponse } from 'next/server'

const FLASK_BASE = process.env.FLASK_BASE_URL || 'http://localhost:80'

type RouteContext = { params: Promise<{ jobId: string }> }

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { jobId } = await context.params

    if (!jobId) {
      return NextResponse.json(
        { success: false, error: '작업 ID가 필요합니다.' },
        { status: 400 }
      )
    }

    // Flask 백엔드의 job_status API 호출
    const flaskRes = await fetch(`${FLASK_BASE}/job_status/${jobId}`)

    if (!flaskRes.ok) {
      const err = await flaskRes.json().catch(() => ({}))
      return NextResponse.json(
        { success: false, error: err?.error || '작업 상태 확인 실패(백엔드)' },
        { status: 500 }
      )
    }

    const flaskData = await flaskRes.json()
    return NextResponse.json(flaskData)
  } catch (error) {
    console.error('작업 상태 확인 오류:', error)
    return NextResponse.json(
      { success: false, error: '작업 상태 확인 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
} 