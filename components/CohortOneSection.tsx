'use client'

import { useState } from 'react'
import { InternRevealCard } from './InternRevealCard'
import { WorkplaceCollage } from './WorkplaceCollage'
import { InternLightbox } from './InternLightbox'
import { SPOTLIGHT } from '@/data/internship'
import { INTERN_GALLERY, SPEAKERS } from '@/data/cohort'
import type { SpotlightIntern } from '@/data/internship'

const TRIPLED_SPEAKERS = [...SPEAKERS, ...SPEAKERS, ...SPEAKERS]

export function CohortOneSection() {
  const [intern, setIntern] = useState<SpotlightIntern | null>(null)

  return (
    <>
      <section className="hf-cohort-one">

        {/* ── Intro ─────────────────────────────────────────── */}
        <div className="hf-c">
          <div className="c1-intro">
            <div className="chip-acc">INTERNSHIP COHORT 01 · 2025</div>
            <h2 className="c1-intro__h">Inside Cohort One.</h2>
            <p className="c1-intro__sub">
              Here&apos;s an intro into what our first cohort got up to — the people,
              the work, and everything in between.
            </p>
          </div>

          {/* ── 1. Meet the cohort ─────────────────────────── */}
          <div className="c1-movement">
            <div className="c1-movement__hd">
              <span className="c1-movement__n">01</span>
              <div>
                <div className="c1-movement__label">1.</div>
                <h3 className="c1-movement__title">Meet the cohort.</h3>
              </div>
            </div>
            <p className="c1-movement__sub">
              Learn more about those who took part in the UC internship experience.
            </p>
            <div className="c1-intern-row">
              {SPOTLIGHT.map((s) => (
                <InternRevealCard
                  key={s.short}
                  spotlight={s}
                  onClick={() => setIntern(s)}
                />
              ))}
            </div>
          </div>

          {/* ── 2. In the workplace ────────────────────────── */}
          <div className="c1-movement">
            <div className="c1-movement__hd">
              <span className="c1-movement__n">02</span>
              <div>
                <div className="c1-movement__label">2.</div>
                <h3 className="c1-movement__title">In the workplace.</h3>
              </div>
            </div>
            <p className="c1-movement__sub">
              Here&apos;s a snippet of what the interns got up to.
            </p>
            <WorkplaceCollage items={INTERN_GALLERY} />
          </div>

          {/* ── 3. Beyond the desk ─────────────────────────── */}
          <div className="c1-movement">
            <div className="c1-movement__hd">
              <span className="c1-movement__n">03</span>
              <div>
                <div className="c1-movement__label">3.</div>
                <h3 className="c1-movement__title">Beyond the desk.</h3>
              </div>
            </div>
            <p className="c1-beyond-copy">
              <strong>
                Our interns didn&apos;t just learn from the companies they joined. We made sure
                they were equipped beyond the desk too — with sessions, speakers and mentors
                brought in by UC. The full package.
              </strong>
            </p>
          </div>
        </div>

        {/* Speakers marquee — full-bleed */}
        <div className="fame-marquee c1-speakers-marquee">
          <div className="ftrack">
            {TRIPLED_SPEAKERS.map((s, i) => (
              <div className="fcard c1-speaker-card" key={i}>
                <div className="pic">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.src} alt={s.name} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      <InternLightbox intern={intern} onClose={() => setIntern(null)} />
    </>
  )
}
