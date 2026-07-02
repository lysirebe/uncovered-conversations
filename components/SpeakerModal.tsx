'use client'

import type { Speaker } from '@/data/cohort'

interface Props {
  speaker: Speaker | null
  onClose: () => void
}

export function SpeakerModal({ speaker, onClose }: Props) {
  if (!speaker) return null
  return (
    <div className="hf-fame-lightbox" onClick={onClose}>
      <button className="hf-modal-x" onClick={onClose} aria-label="Close">×</button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={speaker.src}
        alt={speaker.name}
        onClick={e => e.stopPropagation()}
      />
    </div>
  )
}
