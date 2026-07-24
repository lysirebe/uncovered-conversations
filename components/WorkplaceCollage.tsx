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

// Swipeable gallery — a horizontally scrolling, snap-aligned row of tiles
// framed within a single rounded boundary. Native touch/trackpad swipe drives
// it; the arrow buttons are a click-friendly affordance on top of that.
export function WorkplaceCollage({ items }: Props) {
  const sorted = [...items].sort((a, b) => a.slot - b.slot)
  const trackRef = useRef<HTMLDivElement>(null)

  function scrollByTile(dir: 1 | -1) {
    const track = trackRef.current
    if (!track) return
    const tile = track.querySelector<HTMLElement>('.wc-tile')
    const gap = 14
    const step = tile ? tile.offsetWidth + gap : track.clientWidth * 0.8
    track.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  return (
    <div className="wc-gallery">
      <div className="wc-track" ref={trackRef}>
        {sorted.map((item, i) => (
          <div key={i} className="wc-tile">
            <GalleryTile item={item} />
          </div>
        ))}
      </div>
      <button type="button" className="wc-nav wc-nav--prev" onClick={() => scrollByTile(-1)} aria-label="Previous">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button type="button" className="wc-nav wc-nav--next" onClick={() => scrollByTile(1)} aria-label="Next">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>
    </div>
  )
}
