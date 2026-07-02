'use client'

import { useState, useRef, useEffect } from 'react'

interface HeroAutoVideoProps {
  poster: string
  src: string
  alt?: string
  /** Show muted preview on hover (true) or just show video poster (false) */
  hoverPreview?: boolean
}

// Shows poster with play button overlay.
// On hover: muted video preview fades in behind poster (poster goes semi-transparent).
// On click: full playback (with sound, controls).
export function HeroAutoVideo({ poster, src, alt = '', hoverPreview = true }: HeroAutoVideoProps) {
  const [state, setState] = useState<'idle' | 'preview' | 'playing'>('idle')
  const videoRef = useRef<HTMLVideoElement>(null)

  // Preview on hover
  useEffect(() => {
    if (state === 'preview') {
      const v = videoRef.current
      if (v) { v.muted = true; v.play().catch(() => {}) }
    } else if (state === 'idle') {
      const v = videoRef.current
      if (v) { v.pause(); v.currentTime = 0 }
    }
  }, [state])

  function handleMouseEnter() {
    if (state === 'idle' && hoverPreview) setState('preview')
  }
  function handleMouseLeave() {
    if (state === 'preview') setState('idle')
  }
  function handlePlay() {
    const v = videoRef.current
    if (v) {
      v.muted = false
      v.currentTime = 0
      v.play().catch(() => {})
    }
    setState('playing')
  }
  function handleEnded() { setState('idle') }

  return (
    <div
      className={`hav hav--${state}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={poster} alt={alt} className="hav__poster" />

      <video
        ref={videoRef}
        src={src}
        playsInline
        loop={state === 'preview'}
        muted={state !== 'playing'}
        controls={state === 'playing'}
        className="hav__video"
        onEnded={handleEnded}
      />

      {/* Overlay — hidden once playing (controls take over) */}
      {state !== 'playing' && (
        <div className="hav__overlay" onClick={handlePlay}>
          <button className="hav__play-btn" aria-label="Play video">
            <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
