'use client'

import { useState } from 'react'
import { HfImg } from './HfImg'
import { TeamModal } from './TeamModal'
import { TEAM, FOUNDER } from '@/data/about'
import type { TeamMember } from '@/data/about'

export function TeamSection() {
  const [open, setOpen] = useState<TeamMember | null>(null)

  return (
    <>
      <section className="hf-team">
        <div className="hf-c">
          <div className="hd">
            <h3>meet the <em>team.</em></h3>
            <div className="num">7 OF US · ONE COMMUNITY</div>
          </div>
          <div className="founder">
            <div className="pic">
              <HfImg src={FOUNDER.photo} alt={FOUNDER.name} pos="center 20%" />
            </div>
            <div>
              <div className="role">{FOUNDER.role}</div>
              <div className="name">{FOUNDER.name}</div>
              <div className="sub">{FOUNDER.quote}</div>
              <p>{FOUNDER.bio}</p>
            </div>
          </div>
          <div className="grid">
            {TEAM.map((p) => (
              <div
                key={p.name}
                className="person clickable"
                onClick={() => setOpen(p)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(p) } }}
              >
                <div className="pic"><HfImg src={p.photo} alt={p.name} pos="center 20%" /></div>
                <div className="name" style={{ fontWeight: 700 }}>{p.name}</div>
                <div className="role">{p.role}</div>
                <div className="readbio">Read bio →</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TeamModal person={open} onClose={() => setOpen(null)} />
    </>
  )
}
