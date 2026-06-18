'use client'

import { useState, useEffect, useCallback } from 'react'
import type { GalleryPhoto } from '@/data/home'

interface GalleryLightboxProps {
  photos: GalleryPhoto[]
  onClose: () => void
}

export function GalleryLightbox({ photos, onClose }: GalleryLightboxProps) {
  const [idx, setIdx] = useState(0)

  const prev = useCallback(() => setIdx((i) => (i - 1 + photos.length) % photos.length), [photos.length])
  const next = useCallback(() => setIdx((i) => (i + 1) % photos.length), [photos.length])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [prev, next, onClose])

  const photo = photos[idx]

  return (
    <div className="hf-gallery-overlay" onClick={onClose}>
      <div className="hf-gallery hf-gallery--carousel" onClick={(e) => e.stopPropagation()}>
        <div className="ghd">
          <div>
            <h3>Building You As You Build</h3>
            <div className="sub">our first in-person event · Lagos</div>
          </div>
          <button className="gx" onClick={onClose} aria-label="Close">×</button>
        </div>

        <div className="gc-stage">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img key={idx} src={photo.src} alt={photo.caption} className="gc-img" />

          <button className="gc-arrow gc-arrow--prev" onClick={prev} aria-label="Previous photo">
            ‹
          </button>
          <button className="gc-arrow gc-arrow--next" onClick={next} aria-label="Next photo">
            ›
          </button>
        </div>

        <div className="gc-foot">
          <span className="gc-caption">{photo.caption}</span>
          <span className="gc-count">{idx + 1} / {photos.length}</span>
        </div>

        <div className="gc-dots">
          {photos.map((_, i) => (
            <button
              key={i}
              className={`gc-dot${i === idx ? ' active' : ''}`}
              onClick={() => setIdx(i)}
              aria-label={`Photo ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
