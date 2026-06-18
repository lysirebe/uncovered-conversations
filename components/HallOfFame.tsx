'use client'

import { useState } from 'react'
import { InternLightbox } from './InternLightbox'
import { SPOTLIGHT } from '@/data/internship'
import type { SpotlightIntern } from '@/data/internship'

export function HallOfFame() {
  const [intern, setIntern] = useState<SpotlightIntern | null>(null)

  return (
    <>
      <section className="hf-spotlight">
        <div className="hf-c">
          <div className="hd">
            <h3>the intern <em>hall of fame.</em></h3>
            <div className="meta">cohort 01 · tap to watch / view</div>
          </div>
          <div className="fame-row">
            {SPOTLIGHT.map((s) => (
              <button className="fcard" key={s.short} onClick={() => setIntern(s)} title={s.name}>
                <div className="pic">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.photo} alt={s.name} />
                  <span className="look">{s.video ? '▶ Watch' : 'View ↗'}</span>
                </div>
              </button>
            ))}
          </div>
          <div className="foot">More cohorts, more stories — updated as our alumni grow.</div>
        </div>
      </section>

      <InternLightbox intern={intern} onClose={() => setIntern(null)} />
    </>
  )
}
