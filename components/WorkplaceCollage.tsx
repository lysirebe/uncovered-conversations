'use client'

import { useRef, useState } from 'react'
import type { GalleryItem } from '@/data/cohort'

interface Props { items: GalleryItem[] }

function GalleryTile({ item }: { item: GalleryItem }) {
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  if (item.type === 'image') {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={item.src} alt="" className="wc-media" loading="lazy" />
    )
  }

  function handlePlay() {
    const v = videoRef.current
    if (!v) return
    v.muted = false
    v.play().catch(() => {})
    setPlaying(true)
  }
  function handleEnded() {
    setPlaying(false)
  }

  return (
    <>
      <video
        ref={videoRef}
        src={item.src}
        className="wc-media"
        playsInline
        muted={!playing}
        controls={playing}
        preload="metadata"
        onEnded={handleEnded}
        onPause={() => setPlaying(false)}
      />
      {!playing && (
        <button className="wc-play" onClick={handlePlay} aria-label="Play video">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      )}
    </>
  )
}

// Contained bento gallery — one large feature tile + four supporting tiles, all
// framed within a single rounded boundary. Videos follow the same no-autoplay,
// play-button-overlay, hover-lift language as the site's other video players.
export function WorkplaceCollage({ items }: Props) {
  const sorted = [...items].sort((a, b) => a.slot - b.slot)

  return (
    <div className="wc-collage">
      {sorted.map((item, i) => (
        <div key={i} className={`wc-tile wc-tile--${item.slot}`}>
          <GalleryTile item={item} />
        </div>
      ))}
    </div>
  )
}
