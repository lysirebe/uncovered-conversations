'use client'

import type { Founder } from '@/data/partnerships'

interface FounderLightboxProps {
  founder: Founder | null
  onClose: () => void
}

export function FounderLightbox({ founder, onClose }: FounderLightboxProps) {
  if (!founder) return null

  return (
    <div className="hf-fame-lightbox" onClick={onClose}>
      <button className="hf-modal-x" onClick={onClose} aria-label="Close">×</button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={founder.src}
        alt={`${founder.name} — UC partner founder`}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}
