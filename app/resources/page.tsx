'use client'

import { useState } from 'react'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { RESOURCES, AREAS, MEDIA_TYPES } from '@/data/resources'
import type { Area, Media } from '@/data/resources'

const MEDIA_TINT: Record<Media, { from: string; glyph: string }> = {
  Book: { from: 'var(--hf-acc)', glyph: '📖' },
  Podcast: { from: 'var(--hf-acc-2)', glyph: '🎙' },
  Video: { from: 'var(--hf-ink)', glyph: '▶' },
}

export default function ResourcesPage() {
  const [areaFilter, setAreaFilter] = useState<Area | 'All'>('All')
  const [mediaFilter, setMediaFilter] = useState<Media | 'All'>('All')

  const filtered = RESOURCES.filter((r) => {
    if (areaFilter !== 'All' && r.area !== areaFilter) return false
    if (mediaFilter !== 'All' && r.media !== mediaFilter) return false
    return true
  })

  return (
    <>
      <Nav />

      <section className="hf-phero">
        <span className="hf-blob b2" />
        <div className="hf-c">
          <div className="chip-acc">Resources</div>
          <h1>we love to<br /><em>equip</em> people through<br />resource curation.</h1>
          <div className="lead">
            A living library — books, podcasts and videos across finances, faith, career and
            personal development. Curated by the UC team, recommended by our community.
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-caveat, "Caveat"), cursive', fontSize: 20, color: 'var(--hf-acc)' }}>
              updated weekly
            </span>
            <span style={{ fontFamily: 'var(--font-jetbrains-mono, "JetBrains Mono"), monospace', fontSize: 11, color: 'var(--hf-muted)', letterSpacing: '.05em' }}>
              · {RESOURCES.length}+ resources live
            </span>
          </div>
        </div>
      </section>

      {/* ── Curated by UC ──────────────────────────────────────────── */}
      <section className="hf-resources">
        <div className="hf-c">
          <div className="res-section-hd">
            <div>
              <h2 className="res-section-title">Curated by UC</h2>
              <p className="res-section-sub">Hand-picked resources from across the web — books, podcasts and videos our team recommends.</p>
            </div>
          </div>

          {/* Mobile dropdown filter */}
          <div className="res-mobile-filters">
            <select
              value={areaFilter}
              onChange={(e) => setAreaFilter(e.target.value as Area | 'All')}
              className="res-mobile-select"
              aria-label="Filter by area"
            >
              <option value="All">All areas ({RESOURCES.length})</option>
              {AREAS.map((a) => (
                <option key={a.id} value={a.label}>{a.label} ({a.n})</option>
              ))}
            </select>
            <select
              value={mediaFilter}
              onChange={(e) => setMediaFilter(e.target.value as Media | 'All')}
              className="res-mobile-select"
              aria-label="Filter by media type"
            >
              <option value="All">All media</option>
              {MEDIA_TYPES.map((m) => (
                <option key={m.id} value={m.label}>{m.icon} {m.label}</option>
              ))}
            </select>
          </div>

          <div className="layout">
            {/* Desktop sidebar */}
            <aside className="sidebar">
              <h4>Area</h4>
              <div className="filters">
                <div className={`filter${areaFilter === 'All' ? ' on' : ''}`} onClick={() => setAreaFilter('All')}>
                  <span className="box" /><span>All</span><span className="count">{RESOURCES.length}</span>
                </div>
                {AREAS.map((a) => (
                  <div
                    className={`filter${areaFilter === a.label ? ' on' : ''}`}
                    key={a.id}
                    onClick={() => setAreaFilter(areaFilter === a.label as Area ? 'All' : a.label as Area)}
                  >
                    <span className="box" /><span>{a.label}</span><span className="count">{a.n}</span>
                  </div>
                ))}
              </div>

              <h4>Media type</h4>
              <div className="filters">
                {MEDIA_TYPES.map((m) => (
                  <div
                    className={`filter${mediaFilter === m.label ? ' on' : ''}`}
                    key={m.id}
                    onClick={() => setMediaFilter(mediaFilter === m.label as Media ? 'All' : m.label as Media)}
                  >
                    <span className="box" /><span>{m.icon} {m.label}</span>
                  </div>
                ))}
              </div>

              <h4 style={{ marginTop: 24 }}>Sort</h4>
              <div style={{ fontSize: 13, color: 'var(--hf-ink-2)' }}>
                <div>· Recently added</div>
                <div>· A → Z</div>
                <div>· Community picks</div>
              </div>
            </aside>

            <div className="grid-area">
              <div className="top">
                <div className="ct"><b>{filtered.length}</b> resources</div>
                <button className="hf-btn outline" style={{ padding: '8px 14px' }}>Submit a resource ↑</button>
              </div>
              <div className="grid res-grid--sm">
                {filtered.map((r, i) => {
                  const t = MEDIA_TINT[r.media]
                  return (
                    <div className="card" key={i}>
                      {r.cover ? (
                        <div className="cover" style={{ overflow: 'hidden' }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={r.cover} alt={r.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                        </div>
                      ) : r.uc ? (
                        <div className="cover uc-cover">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src="/assets/uc-logo.avif" alt="Uncovered Conversations podcast" />
                        </div>
                      ) : (
                        <div className="cover designed" style={{ '--cover-from': t.from } as React.CSSProperties}>
                          <span className="glyph">{t.glyph}</span>
                          <span className="ct">{r.title}</span>
                          <span className="cby">{r.by}</span>
                        </div>
                      )}
                      <div className="tags">
                        <span className={`tag${r.tagAcc ? ' acc' : ''}`}>{r.area}</span>
                        <span className="tag">{r.media}</span>
                      </div>
                      <div className="body">
                        <div className="title">{r.title}</div>
                        <div className="by">{r.by}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Created by UC ──────────────────────────────────────────── */}
      <section className="hf-res-created">
        <div className="hf-c">
          <div className="res-section-hd">
            <div>
              <h2 className="res-section-title">Created by UC</h2>
              <p className="res-section-sub">In-house content built specifically to equip our community.</p>
            </div>
          </div>
          <div className="res-coming-soon">
            <div className="res-cs-inner">
              <span className="res-cs-tag">Coming soon</span>
              <h3>something&apos;s<br /><em>in the works.</em></h3>
              <p>
                We&apos;re building original resources — guides, toolkits and content made just for
                you. Be the first to know when they drop.
              </p>
              <button className="hf-btn acc">Notify me <span className="arr">→</span></button>
            </div>
          </div>
        </div>
      </section>

      <section className="hf-cta-c">
        <div className="hf-c">
          <div className="kicker">community-built ↺</div>
          <h3>found a great<br />resource?</h3>
          <div className="ctas">
            <button className="hf-btn acc">Submit a resource <span className="arr">→</span></button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
