'use client'

import { useState } from 'react'

// SUBSTACK_PUB: update this URL if the publication slug changes
const SUBSTACK_PUB = 'https://uncoveredconversations.substack.com'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('loading')

    try {
      const res = await fetch(`${SUBSTACK_PUB}/api/v1/free`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })

      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        // Fallback: open Substack subscribe page in new tab
        window.open(`${SUBSTACK_PUB}?utm_source=website`, '_blank')
        setStatus('success')
      }
    } catch {
      // Network error fallback: open Substack page
      window.open(`${SUBSTACK_PUB}?utm_source=website`, '_blank')
      setStatus('success')
    }
  }

  if (status === 'success') {
    return (
      <div className="nl nl--success">
        <span>You&apos;re in ✓ — check your inbox to confirm.</span>
      </div>
    )
  }

  return (
    <form className="nl" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="you@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={status === 'loading'}
        aria-label="Email address"
      />
      <button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? '...' : 'Sign up'}
      </button>
    </form>
  )
}
