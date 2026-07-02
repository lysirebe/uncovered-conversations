'use client'

import { useRef } from 'react'
import type { SpotlightIntern } from '@/data/internship'

interface Props {
  spotlight: SpotlightIntern
  onClick: () => void
}

// Shows still image blended with first video frame as cover.
// On hover: muted video plays as preview.
// On click: opens full lightbox.
export function InternRevealCard({ spotlight, onClick }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)

  function handleMouseEnter() {
    if (!spotlight.videoSrc) return
    const v = videoRef.current
    if (v) { v.muted = true; v.play().catch(() => {}) }
  }
  function handleMouseLeave() {
    if (!spotlight.videoSrc) return
    const v = videoRef.current
    if (v) { v.pause(); v.currentTime = 0 }
  }

  return (
    <button
      className="fcard"
      onClick={onClick}
      title={spotlight.name}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="pic irc-pic">
        {/* Video layer — plays as muted preview on hover */}
        {spotlight.videoSrc && (
          <video
            ref={videoRef}
            src={spotlight.videoSrc}
            playsInline
            muted
            loop
            className="irc-vid"
          />
        )}
        {/* Still image — semi-transparent on hover via CSS */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={spotlight.photo} alt={spotlight.short} className="irc-img" />
        {/* Play badge */}
        {spotlight.video && (
          <span className="irc-play">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        )}
        <span className="look">{spotlight.video ? '▶ Watch' : 'View ↗'}</span>
      </div>
    </button>
  )
}
