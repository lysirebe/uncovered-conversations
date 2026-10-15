'use client'

import { useState } from 'react'
import type { ResourceDoc, ResourceCategory } from '@/lib/sanity'

const CATEGORIES: { id: ResourceCategory; label: string; icon: string }[] = [
  { id: 'Video', label: 'Videos', icon: '▶' },
  { id: 'Podcast', label: 'Podcasts', icon: '🎙' },
  { id: 'Book', label: 'Books', icon: '📖' },
]

const CAT_TINT: Record<ResourceCategory, string> = {
  Video: 'var(--hf-acc)',
  Podcast: 'var(--hf-acc-2)',
  Book: 'var(--hf-ink)',
}
const CAT_GLYPH: Record<ResourceCategory, string> = {
  Video: '▶',
  Podcast: '🎙',
  Book: '📖',
}

interface Props { resources: ResourceDoc[] }

export function ResourcesGrid({ resources: RESOURCES }: Props) {
  const [catFilter, setCatFilter] = useState<ResourceCategory | 'All'>('All')

  const filtered = catFilter === 'All' ? RESOURCES : RESOURCES.filter(r => r.category === catFilter)

  return (
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
            onChange={e => setCatFilter(e.target.value as ResourceCategory | 'All')}
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
                  key={r._id}
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
  )
}
