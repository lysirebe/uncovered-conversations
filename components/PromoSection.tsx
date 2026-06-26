'use client'

import { useState } from 'react'
import { GalleryLightbox } from './GalleryLightbox'
import { GALLERY, PROMO_PHOTO } from '@/data/home'

export function PromoSection() {
  const [gallery, setGallery] = useState(false)
  const [playing, setPlaying] = useState(false)

  return (
    <>
      <section className="hf-promo">
        <div className="hf-c">
          <div className="hd">
            <h3><strong>here&apos;s a glimpse into</strong> <em>our community.</em></h3>
          </div>

          {/* Video card — full container width; when playing, renders video at native 9:16 */}
          <div className={`video${playing ? ' playing' : ''}`}>
            {playing ? (
              <video
                src="/assets/video-inpersonevent.mov"
                controls
                autoPlay
                playsInline
              />
            ) : (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={PROMO_PHOTO} alt="Building You As You Build — in-person event" />
                <span className="scrim" />
                <span
                  className="play"
                  onClick={() => setPlaying(true)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setPlaying(true)}
                >
                  <span>▶</span>
                </span>
                <div className="label">
                  <div className="k">From our first in-person event</div>
                  <div className="t">Building You As You Build — in person</div>
                </div>
              </>
            )}
          </div>

          <div className="seemore">
            <button className="hf-btn acc" onClick={() => setGallery(true)}>
              See more from the day <span className="arr">→</span>
            </button>
          </div>
        </div>
      </section>

      {gallery && <GalleryLightbox photos={GALLERY} onClose={() => setGallery(false)} />}
    </>
  )
}
