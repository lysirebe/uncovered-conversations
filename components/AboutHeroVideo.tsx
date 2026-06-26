'use client'

import { useState } from 'react'

export function AboutHeroVideo() {
  const [playing, setPlaying] = useState(false)

  return (
    <div className={`about-hero-vid-wrap${playing ? ' about-hero-vid-wrap--playing' : ''}`}>
      {playing ? (
        <>
          <video
            src="/assets/our-story-video.MP4"
            controls
            autoPlay
            playsInline
            className="about-hero-vid__video"
            onEnded={() => setPlaying(false)}
          />
          <button
            className="about-hero-vid__close"
            onClick={() => setPlaying(false)}
            aria-label="Close video"
          >
            ×
          </button>
        </>
      ) : (
        <div
          className="about-hero-vid__thumb"
          onClick={() => setPlaying(true)}
          role="button"
          tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && setPlaying(true)}
          aria-label="Play video"
        >
          {/* Poster — reuses the about hero image as thumbnail */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/about-page-hero.jpg" alt="Osarhieme Giwa-Osagie" />
          <div className="about-hero-vid__overlay">
            <span className="about-hero-vid__play-btn">
              <svg viewBox="0 0 24 24" width="34" height="34" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
