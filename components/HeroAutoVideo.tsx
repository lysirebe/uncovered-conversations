'use client'

import { useState, useRef, useEffect } from 'react'

interface HeroAutoVideoProps {
  poster: string
  src: string
  alt?: string
}

// Shows poster image, then on hover (or after `delay` ms) fades to muted looping video.
// Video plays at native aspect ratio via object-fit:contain — no stretching.
export function HeroAutoVideo({ poster, src, alt = '' }: HeroAutoVideoProps) {
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  // Auto-start after 5 seconds
  useEffect(() => {
    timerRef.current = setTimeout(() => setPlaying(true), 5000)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [])

  useEffect(() => {
    if (playing) videoRef.current?.play().catch(() => {})
  }, [playing])

  const startNow = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setPlaying(true)
  }

  return (
    <div
      className={`hav${playing ? ' hav--playing' : ''}`}
      onMouseEnter={startNow}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={poster} alt={alt} className={`hav__poster${playing ? ' hav__poster--fade' : ''}`} />
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        loop
        className={`hav__video${playing ? ' hav__video--visible' : ''}`}
      />
    </div>
  )
}
