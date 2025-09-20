'use client'

import { useState } from 'react'
import { apiFetch } from '../../lib/api'

export default function DebugAuthPage() {
  const [logs, setLogs] = useState<string[]>([])
  const add = (m: string) => setLogs(s => [m, ...s].slice(0, 50))

  const step1 = async () => {
    add('Step1: Requesting CSRF token...')
    await fetch('/api/auth/csrf/', { credentials: 'include' })
    const has = document.cookie.includes('csrftoken=')
    add(`Step1 result: csrftoken present = ${has}`)
  }

  const step2 = async () => {
    add('Step2: Checking session status...')
    const data = await apiFetch('/user/status')
    add(`Step2 result: ${JSON.stringify(data)}`)
  }

  const step3 = async () => {
    add('Step3: Debug echo...')
    const data = await apiFetch('/debug/echo')
    add(`Echo: ${JSON.stringify(data)}`)
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Auth Debug</h1>
      <div className="space-x-2 mb-4">
        <button className="px-4 py-2 rounded bg-gray-900 text-white" onClick={step1}>Get CSRF</button>
        <button className="px-4 py-2 rounded bg-gray-900 text-white" onClick={step2}>Check Status</button>
        <button className="px-4 py-2 rounded bg-gray-900 text-white" onClick={step3}>Echo</button>
      </div>
      <div className="text-sm whitespace-pre-wrap bg-gray-100 p-3 rounded border">
        {logs.map((l, i) => (
          <div key={i}>• {l}</div>
        ))}
      </div>
    </div>
  )
}


