'use client'

import { useState } from 'react'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { RESOURCES, CATEGORIES } from '@/data/resources'
import type { Category } from '@/data/resources'

const CAT_TINT: Record<Category, string> = {
  Video: 'var(--hf-acc)',
  Podcast: 'var(--hf-acc-2)',
  Book: 'var(--hf-ink)',
}
const CAT_GLYPH: Record<Category, string> = {
  Video: '▶',
  Podcast: '🎙',
  Book: '📖',
}

export default function ResourcesPage() {
  const [catFilter, setCatFilter] = useState<Category | 'All'>('All')

  const filtered = catFilter === 'All' ? RESOURCES : RESOURCES.filter(r => r.category === catFilter)

  return (
    <>
      <Nav />

      {/* Hero */}
      <section className="hf-phero">
        <span className="hf-blob b2" />
        <div className="hf-c">
          <div className="chip-acc">Resources</div>
          <h1>we love to<br /><em>equip</em> people through<br />resource curation.</h1>
          <div className="lead">
            A living library — videos, podcasts and books curated by the UC team and
            recommended by our community.
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-caveat, "Caveat"), cursive', fontSize: 20, color: 'var(--hf-acc)' }}>
              updated regularly
            </span>
            <span style={{ fontFamily: 'var(--font-jetbrains-mono, "JetBrains Mono"), monospace', fontSize: 11, color: 'var(--hf-muted)', letterSpacing: '.05em' }}>
              · {RESOURCES.length} resources live
            </span>
          </div>
        </div>
      </section>

      {/* ── Curated by UC ─────────────────────────────────────────── */}
      <section className="hf-resources">
        <div className="hf-c">
          <div className="res-section-hd">
            <h2 className="res-section-title">Curated by UC</h2>
            <p className="res-section-sub">Hand-picked from across the web — the resources our team recommends.</p>
          </div>

          {/* Mobile dropdown */}
          <div className="res-mobile-filters">
            <select
              value={catFilter}
              onChange={e => setCatFilter(e.target.value as Category | 'All')}
              className="res-mobile-select"
              aria-label="Filter by type"
            >
              <option value="All">All ({RESOURCES.length})</option>
              {CATEGORIES.map(c => (
                <option key={c.id} value={c.id}>{c.icon} {c.label}</option>
              ))}
            </select>
          </div>

          <div className="layout">
            {/* Desktop sidebar */}
            <aside className="sidebar">
              <h4>Type</h4>
              <div className="filters">
                <div className={`filter${catFilter === 'All' ? ' on' : ''}`} onClick={() => setCatFilter('All')}>
                  <span className="box" /><span>All</span><span className="count">{RESOURCES.length}</span>
                </div>
                {CATEGORIES.map(c => {
                  const n = RESOURCES.filter(r => r.category === c.id).length
                  return (
                    <div
                      key={c.id}
                      className={`filter${catFilter === c.id ? ' on' : ''}`}
                      onClick={() => setCatFilter(catFilter === c.id ? 'All' : c.id)}
                    >
                      <span className="box" />
                      <span>{c.icon} {c.label}</span>
                      <span className="count">{n}</span>
                    </div>
                  )
                })}
              </div>
            </aside>

            <div className="grid-area">
              <div className="top">
                <div className="ct"><b>{filtered.length}</b> resources</div>
                <button className="hf-btn outline" style={{ padding: '8px 14px' }}>Submit a resource ↑</button>
              </div>
              <div className="grid res-grid--sm">
                {filtered.map(r => (
                  <a
                    key={r.id}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <div className="cover" style={{ position: 'relative', overflow: 'hidden' }}>
                      {r.cover ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={r.cover} alt={r.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      ) : (
                        <div
                          className="cover designed"
                          style={{ '--cover-from': CAT_TINT[r.category], width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '18px 16px' } as React.CSSProperties}
                        >
                          <span className="glyph">{CAT_GLYPH[r.category]}</span>
                          <span className="ct">{r.title}</span>
                          {r.by && <span className="cby">{r.by}</span>}
                        </div>
                      )}
                    </div>
                    <div className="tags">
                      <span className="tag acc">{r.category}</span>
                    </div>
                    <div className="body">
                      <div className="title">{r.title}</div>
                      {r.by && <div className="by">{r.by}</div>}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Created by UC ──────────────────────────────────────────── */}
      <section className="hf-res-created">
        <div className="hf-c">
          <div className="res-section-hd">
            <h2 className="res-section-title">Created by UC</h2>
            <p className="res-section-sub">In-house content built specifically to equip our community.</p>
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
