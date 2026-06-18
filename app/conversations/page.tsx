'use client'

import { useState } from 'react'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { HfImg } from '@/components/HfImg'
import { S1, S2, CHIPS } from '@/data/conversations'
import type { Episode, Area } from '@/data/conversations'

function ConvCover({ e, season }: { e: Episode; season: string }) {
  return (
    <a className="cv" href="#" onClick={(ev) => ev.preventDefault()} title={`${e.name} — ${e.topic}`}>
      <div className="cover">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={e.src} alt={`${e.name} — ${e.topic}`} loading="lazy" />
        <span className="read"><span>Read →</span></span>
      </div>
      <div className="cap">
        <span className="ep">{season} · {e.n}</span>
        <span className="area">{e.area}</span>
      </div>
    </a>
  )
}

export default function ConversationsPage() {
  const [active, setActive] = useState<typeof CHIPS[number]>('All')
  const total = S1.length + S2.length

  const filterEps = (eps: Episode[]) =>
    active === 'All' ? eps : eps.filter((e) => e.area === (active as Area))

  const filteredS2 = filterEps(S2)
  const filteredS1 = filterEps(S1)

  return (
    <>
      <Nav />

      {/* Hero */}
      <section className="hf-phero">
        <span className="hf-blob b1" />
        <div className="hf-c">
          <div className="chip-acc">Conversations · the archive</div>
          <h1>it started<br />with a<br /><em>conversation.</em></h1>
          <div className="lead">
            Long-form, written reflections from the people we wished we&apos;d had access to at 22 —
            {' '}{total} posts across two seasons, spanning finance, fashion, faith, beauty,
            career, wellness and more.
          </div>
        </div>
      </section>

      {/* Filter chips */}
      <section className="hf-conv-filter">
        <div className="hf-c">
          <div className="row">
            {CHIPS.map((c) => (
              <button
                key={c}
                className={`chip${active === c ? (c === 'All' ? ' acc' : ' on') : ''}`}
                onClick={() => setActive(c)}
              >
                {c}
              </button>
            ))}
            <span className="meta">{total} posts · 2 seasons</span>
          </div>
        </div>
      </section>

      {/* Featured episode */}
      <section className="hf-conv-feat">
        <div className="row">
          <div className="img-side">
            <span className="badge">Featured · S2 EP005</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/conv/s2ep005.avif"
              alt="Imade Ogbemudia — Evolving with the Vision"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
            />
          </div>
          <div className="body-side">
            <div className="meta">
              <span className="chip">Vision</span>
              <span className="chip">S2 · EP005</span>
              <span className="chip">2022</span>
            </div>
            <h2><em>Imade Ogbemudia.</em><br />evolving with<br />the vision.</h2>
            <p className="lead">
              A long-form conversation on what it takes to keep a vision alive when the season,
              the team and the version of you all keep shifting. On staying ready, asking for help,
              and the quiet discipline of doing the work no one&apos;s watching.
            </p>
            <div className="ctas">
              <button className="hf-btn acc">Read the post <span className="arr">→</span></button>
              <button className="hf-btn outline">Browse the archive</button>
            </div>
          </div>
        </div>
      </section>

      {/* Archive grid */}
      <section className="hf-conv-grid">
        <div className="hf-c">
          {filteredS2.length > 0 && (
            <>
              <div className="seasonhd">
                <h3>season <em>two.</em></h3>
                <div className="meta">2022 · 5 episodes</div>
              </div>
              {/* S2: all 5 on one row */}
              <div className="grid grid--s2">
                {filteredS2.map((e) => <ConvCover key={e.id} e={e} season="S2" />)}
              </div>
            </>
          )}

          {filteredS1.length > 0 && (
            <>
              <div className="seasonhd">
                <h3>season <em>one.</em></h3>
                <div className="meta">2021 · 31 episodes</div>
              </div>
              <div className="grid">
                {filteredS1.map((e) => <ConvCover key={e.id} e={e} season="S1" />)}
              </div>
            </>
          )}

          <div className="hf-conv-tail">
            plus our Nov &apos;22 community update — uncovered conversations, moving forward
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
