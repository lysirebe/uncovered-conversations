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
          <span style={{ fontFamily: 'var(--font-caveat, "Caveat"), cursive', fontSize: 20, color: 'var(--hf-acc)' }}>
            updated regularly
          </span>
        </div>
      </section>

      {/* ── Curated by UC ─────────────────────────────────────────── */}
      <section className="hf-resources hf-res-grouped">
        <div className="hf-c">
          <div className="res-section-hd">
            <h2 className="res-section-title">Curated by UC</h2>
            <p className="res-section-sub">Hand-picked from across the web — the resources our team recommends.</p>
          </div>

          {CATEGORIES.map(({ id, label, icon }) => {
            const items = RESOURCES.filter((r) => r.category === id)
            if (!items.length) return null
            return (
              <div className="res-cat-block" key={id}>
                <div className="res-cat-hd">
                  <span className="res-cat-icon">{icon}</span>
                  <h3 className="res-cat-title">{label}</h3>
                </div>
                <div className="res-cat-grid">
                  {items.map((r) => (
                    <a
                      key={r.id}
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="res-card"
                    >
                      <div className="res-card__cover">
                        {r.cover ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={r.cover} alt={r.title} />
                        ) : (
                          // Designed placeholder — add cover URL in data/resources.ts to replace
                          <div
                            className="res-card__placeholder"
                            style={{ '--cover-from': CAT_TINT[id] } as React.CSSProperties}
                          >
                            <span className="res-card__glyph">{CAT_GLYPH[id]}</span>
                            <span className="res-card__ptitle">{r.title}</span>
                            {r.by && <span className="res-card__pby">{r.by}</span>}
                          </div>
                        )}
                        <span className="res-card__overlay">Open →</span>
                      </div>
                      <div className="res-card__body">
                        <span className="res-card__cat">{r.category}</span>
                        <div className="res-card__title">{r.title}</div>
                        {r.by && <div className="res-card__by">{r.by}</div>}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )
          })}

          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <button className="hf-btn outline">Submit a resource ↑</button>
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
