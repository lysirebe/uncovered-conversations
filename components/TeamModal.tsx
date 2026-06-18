'use client'

import { HfImg } from './HfImg'
import type { TeamMember } from '@/data/about'

interface TeamModalProps {
  person: TeamMember | null
  onClose: () => void
}

export function TeamModal({ person, onClose }: TeamModalProps) {
  if (!person) return null

  return (
    <div className="hf-modal-overlay" onClick={onClose}>
      <div className="hf-modal" onClick={(e) => e.stopPropagation()}>
        <button className="hf-modal-x" onClick={onClose} aria-label="Close">×</button>
        <div className="hf-modal-grid">
          <div className="hf-modal-pic">
            <HfImg src={person.photo} alt={person.name} pos="center 20%" />
          </div>
          <div className="hf-modal-body">
            <div className="role">{person.role}</div>
            <div className="name">{person.name}</div>
            <p>{person.bio}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
