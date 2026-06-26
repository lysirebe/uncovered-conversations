'use client'

import { useState, useEffect, useCallback } from 'react'
import { InternLightbox } from './InternLightbox'
import { SPOTLIGHT } from '@/data/internship'
import { INTERN_GALLERY, SPEAKERS } from '@/data/cohort'
import type { SpotlightIntern } from '@/data/internship'

// Triple speakers for the seamless auto-scroll loop
const TRIPLED_SPEAKERS = [...SPEAKERS, ...SPEAKERS, ...SPEAKERS]

export function CohortOneSection() {
  // Movement 1 — intern lightbox state
  const [intern, setIntern] = useState<SpotlightIntern | null>(null)

  // Movement 2 — workplace carousel state
  const [idx, setIdx] = useState(0)
  const [playing, setPlaying] = useState(false)

  const prev = useCallback(() => { setPlaying(false); setIdx(i => (i - 1 + INTERN_GALLERY.length) % INTERN_GALLERY.length) }, [])
  const next = useCallback(() => { setPlaying(false); setIdx(i => (i + 1) % INTERN_GALLERY.length) }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [prev, next])

  const current = INTERN_GALLERY[idx]
  const isVideo = current.type === 'video'

  return (
    <>
      <section className="hf-cohort-one">

        {/* ── Intro ────────────────────────────────────────────── */}
        <div className="hf-c">
          <div className="c1-intro">
            <div className="chip-acc">Cohort 01 · 2025</div>
            <h2 className="c1-intro__h">Inside Cohort One.</h2>
            <p className="c1-intro__sub">
              A look at what our first cohort got up to — the people, the work,
              and everything in between.
            </p>
          </div>

          {/* ── Movement 1 — Meet the cohort ─────────────────── */}
          <div className="c1-movement">
            <div className="c1-movement__hd">
              <span className="c1-movement__n">01</span>
              <div>
                <div className="c1-movement__label">Movement one</div>
                <h3 className="c1-movement__title">Meet the cohort.</h3>
              </div>
            </div>
            <div className="c1-intern-row">
              {SPOTLIGHT.map((s) => (
                <button
                  key={s.short}
                  className="fcard"
                  onClick={() => setIntern(s)}
                  title={s.name}
                >
                  <div className="pic">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.photo} alt={s.name} />
                    <span className="look">{s.video ? '▶ Watch' : 'View ↗'}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* ── Movement 2 — In the workplace ────────────────── */}
          <div className="c1-movement">
            <div className="c1-movement__hd">
              <span className="c1-movement__n">02</span>
              <div>
                <div className="c1-movement__label">Movement two</div>
                <h3 className="c1-movement__title">In the workplace.</h3>
              </div>
            </div>

            <div className={`c1-stage${playing && isVideo ? ' c1-stage--playing' : ''}`}>
              {playing && isVideo ? (
                // Video playing — native aspect ratio, browser controls
                <video
                  src={current.src}
                  controls
                  autoPlay
                  playsInline
                  className="c1-video"
                  onEnded={() => setPlaying(false)}
                />
              ) : isVideo ? (
                // Video not yet playing — dark placeholder + play button
                <div className="c1-vid-ph" onClick={() => setPlaying(true)} role="button" tabIndex={0}
                     onKeyDown={e => e.key === 'Enter' && setPlaying(true)}>
                  <span className="c1-vid-play-btn">
                    <svg viewBox="0 0 24 24" width="36" height="36" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  <span className="c1-vid-ph-label">Play video</span>
                </div>
              ) : (
                // Image
                // eslint-disable-next-line @next/next/no-img-element
                <img src={current.src} alt={current.caption} className="c1-img" />
              )}

              {/* Nav arrows — hidden when video is playing */}
              {!playing && (
                <>
                  <button className="c1-arrow c1-arrow--prev" onClick={prev} aria-label="Previous">‹</button>
                  <button className="c1-arrow c1-arrow--next" onClick={next} aria-label="Next">›</button>
                </>
              )}
            </div>

            <div className="c1-carousel-foot">
              <span className="c1-caption">{current.caption}</span>
              <span className="c1-count">{idx + 1} / {INTERN_GALLERY.length}</span>
            </div>

            <div className="c1-dots">
              {INTERN_GALLERY.map((_, i) => (
                <button
                  key={i}
                  className={`c1-dot${i === idx ? ' active' : ''}`}
                  onClick={() => { setPlaying(false); setIdx(i) }}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* ── Bridge copy ───────────────────────────────────── */}
          <div className="c1-bridge">
            <p>
              Our interns didn&apos;t just learn from the companies they joined. We made sure
              they were equipped beyond the desk too — with sessions, speakers and mentors
              brought in by UC. The full package.
            </p>
          </div>

          {/* ── Movement 3 heading ───────────────────────────── */}
          <div className="c1-movement">
            <div className="c1-movement__hd">
              <span className="c1-movement__n">03</span>
              <div>
                <div className="c1-movement__label">Movement three</div>
                <h3 className="c1-movement__title">Beyond the desk.</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Speakers marquee — full-bleed, CSS animated (same as Founder Fame) */}
        <div className="fame-marquee c1-speakers-marquee">
          <div className="ftrack">
            {TRIPLED_SPEAKERS.map((s, i) => (
              // Speaker images contain the name — display only, no click needed
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

      {/* Lightbox for movement 1 intern cards */}
      <InternLightbox intern={intern} onClose={() => setIntern(null)} />
    </>
  )
}
