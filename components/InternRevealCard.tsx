'use client'

import { useState, useRef, useEffect } from 'react'
import type { SpotlightIntern } from '@/data/internship'

interface Props {
  spotlight: SpotlightIntern
  onClick: () => void
}

// On scroll into view, shows still image for ~2 seconds then cross-fades to muted video.
// Clicking still opens the full lightbox.
export function InternRevealCard({ spotlight, onClick }: Props) {
  const [showVideo, setShowVideo] = useState(false)
  const cardRef = useRef<HTMLButtonElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    if (!spotlight.videoSrc) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timerRef.current = setTimeout(() => setShowVideo(true), 2000)
        } else {
          if (timerRef.current) clearTimeout(timerRef.current)
        }
      },
      { threshold: 0.4 }
    )

    const el = cardRef.current
    if (el) observer.observe(el)
    return () => {
      observer.disconnect()
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [spotlight.videoSrc])

  return (
    <button ref={cardRef} className="fcard" onClick={onClick} title={spotlight.name}>
      <div className="pic irc-pic">
        {/* Still image — fades out after video starts */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={spotlight.photo}
          alt={spotlight.short}
          className={`irc-img${showVideo && spotlight.videoSrc ? ' irc-img--fade' : ''}`}
        />
        {/* Muted preview video — fades in after 2 s in view */}
        {spotlight.videoSrc && (
          <video
            src={spotlight.videoSrc}
            autoPlay={showVideo}
            muted
            playsInline
            loop
            className={`irc-vid${showVideo ? ' irc-vid--visible' : ''}`}
          />
        )}
        <span className="look">{spotlight.video ? '▶ Watch' : 'View ↗'}</span>
      </div>
    </button>
  )
}
