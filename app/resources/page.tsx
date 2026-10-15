import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { ResourcesGrid } from '@/components/ResourcesGrid'
import { safeQuery, ALL_RESOURCES_QUERY } from '@/lib/sanity'
import type { ResourceDoc } from '@/lib/sanity'

export const revalidate = 60

export default async function ResourcesPage() {
  const RESOURCES = (await safeQuery<ResourceDoc[]>(ALL_RESOURCES_QUERY)) ?? []

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
      <ResourcesGrid resources={RESOURCES} />

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
