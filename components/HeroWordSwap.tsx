'use client'

import { useState, useEffect } from 'react'

const WORDS = ['EQUIPPING.', 'SUPPORTING.', 'EMPOWERING.']

export function HeroWordSwap() {
  const [idx, setIdx] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const id = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setIdx((x) => (x + 1) % WORDS.length)
        setFading(false)
      }, 250)
    }, 2200)
    return () => clearInterval(id)
  }, [])

  return <span className={`swap${fading ? ' fade' : ''}`}>{WORDS[idx]}</span>
}
