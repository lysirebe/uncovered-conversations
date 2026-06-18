'use client'

import type { SpotlightIntern } from '@/data/internship'

interface InternLightboxProps {
  intern: SpotlightIntern | null
  onClose: () => void
}

export function InternLightbox({ intern, onClose }: InternLightboxProps) {
  if (!intern) return null

  if (intern.video) {
    return (
      <div className="hf-fame-lightbox" onClick={onClose}>
        <button className="hf-modal-x" onClick={onClose} aria-label="Close">×</button>
        <div className="hf-vid" onClick={(e) => e.stopPropagation()}>
          {intern.videoSrc ? (
            <video src={intern.videoSrc} controls autoPlay playsInline />
          ) : (
            <div className="vid-ph">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={intern.photo} alt={intern.short} />
              <span className="scrim" />
              <button className="play" aria-label={`Play ${intern.short}'s testimonial`}>
                <svg viewBox="0 0 24 24" width="34" height="34" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
              <div className="cap">
                <div className="t">Video testimonial</div>
                <div className="s">{intern.short} · cohort 01</div>
              </div>
              <div className="note">drop in MP4 — placeholder for {intern.short}&apos;s clip</div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="hf-fame-lightbox" onClick={onClose}>
      <button className="hf-modal-x" onClick={onClose} aria-label="Close">×</button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={intern.photo} alt={intern.name} onClick={(e) => e.stopPropagation()} />
    </div>
  )
}
