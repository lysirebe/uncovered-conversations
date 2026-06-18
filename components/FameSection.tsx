'use client'

import { useState } from 'react'
import { FounderLightbox } from './FounderLightbox'
import { FOUNDERS } from '@/data/partnerships'
import type { Founder } from '@/data/partnerships'

export function FameSection() {
  const [founder, setFounder] = useState<Founder | null>(null)
  const tripled = [...FOUNDERS, ...FOUNDERS, ...FOUNDERS]

  return (
    <>
      <section className="hf-pn-fame">
        <div className="hf-c">
          <div className="hd">
            <h3>founder <em>hall of fame.</em></h3>
            <div className="meta">the founders building with us · hover to pause, tap to read</div>
          </div>
        </div>
        {/* Marquee is full-bleed (no hf-c) */}
        <div className="fame-marquee">
          <div className="ftrack">
            {tripled.map((f, i) => (
              <button className="fcard" key={i} onClick={() => setFounder(f)} title={f.name}>
                <div className="pic">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={f.src} alt={`${f.name} — UC partner founder`} />
                  <span className="look">View ↗</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <FounderLightbox founder={founder} onClose={() => setFounder(null)} />
    </>
  )
}
