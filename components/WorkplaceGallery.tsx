'use client'

import { useState } from 'react'
import { WorkplaceCollage } from './WorkplaceCollage'
import type { GalleryItem } from '@/data/cohort'

interface Props { items: GalleryItem[] }

function coverImage(item: GalleryItem) {
  return item.type === 'video' ? (item.poster ?? item.src) : item.src
}

// Cover card gating the workplace carousel — a blurred collage of the gallery
// assets sits behind a title/CTA until clicked, which opens the existing
// swipeable WorkplaceCollage inside the site's standard gallery overlay.
export function WorkplaceGallery({ items }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        className="wc-cover"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label="Open In the Workplace photo and video album"
      >
        <div className="wc-cover-collage" aria-hidden="true">
          {items.map((item, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={i} src={coverImage(item)} alt="" />
          ))}
        </div>
        <span className="wc-cover-scrim" />
        <span className="wc-cover-content">
          <span className="wc-cover-title">In the Workplace</span>
          <span className="wc-cover-sub">A sneak peek into what the interns got up to.</span>
          <span className="wc-cover-cta">
            View album
            <span className="arr">→</span>
          </span>
        </span>
      </button>

      {open && (
        <div className="hf-gallery-overlay" onClick={() => setOpen(false)}>
          <div className="hf-gallery" onClick={(e) => e.stopPropagation()}>
            <div className="ghd">
              <div>
                <h3>In the Workplace</h3>
                <div className="sub">A sneak peek into what the interns got up to.</div>
              </div>
              <button className="gx" onClick={() => setOpen(false)} aria-label="Close">×</button>
            </div>
            <WorkplaceCollage items={items} />
          </div>
        </div>
      )}
    </>
  )
}
