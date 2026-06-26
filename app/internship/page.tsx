import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { HfImg } from '@/components/HfImg'
import { CohortOneSection } from '@/components/CohortOneSection'
import { STEPS, PARTNERS } from '@/data/internship'
import { APPLY_URL, PARTNER_FORM } from '@/data/links'

const tripled = [...PARTNERS, ...PARTNERS, ...PARTNERS]

export default function InternshipPage() {
  return (
    <>
      <Nav />

      {/* Hero */}
      <section className="hf-phero hf-int-hero">
        <span className="hf-blob b1" />
        <div className="hf-c">
          <div className="chip-acc">UC Internship · cohort 02 open</div>
          <div className="int-hero-grid">
            <div className="int-left">
              <h1>we bridge<br />young talent &amp;<br /><em>founder-led</em> orgs.</h1>
              <div className="body">
                <p>
                  A 12-week paid placement programme designed for ambitious 18–25 year olds and
                  the founder-led organisations who want to build with them.
                </p>
                <p>
                  <b>For interns:</b> rigorous prep, real work, 8+ mentors, a cohort that becomes
                  your network for life. <b>For partners:</b> vetted talent, a structured supervision
                  layer, and access to the next generation of operators in your space.
                </p>
                <div className="ctas">
                  <a className="hf-btn acc" href={APPLY_URL} target="_blank" rel="noopener noreferrer">
                    Apply (interns) <span className="arr">→</span>
                  </a>
                  <a className="hf-btn outline" href={PARTNER_FORM} target="_blank" rel="noopener noreferrer">
                    Partner with us
                  </a>
                </div>
              </div>
            </div>
            <div className="photo">
              <HfImg src="/assets/intern-hero.jpg" alt="UC internship · in session" pos="center 30%" />
            </div>
          </div>
        </div>
      </section>

      {/* Partner logos — hd padded, marquee full-bleed */}
      <section className="hf-logos">
        <div className="hf-c">
          <div className="hd">
            <div className="lbl">Partner brands</div>
            <div className="lbl">{PARTNERS.length} orgs · growing</div>
          </div>
        </div>
        <div className="logo-marquee">
          <div className="track">
            {tripled.map((p, i) => (
              <div className="logo" key={i}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.src} alt={p.name} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="hf-steps4">
        <div className="hf-c">
          <div className="hd">
            <h3>how it <em>works.</em></h3>
            <div className="meta">4 steps · 6-week placement · paid</div>
          </div>
          <div className="grid">
            {STEPS.map((s) => (
              <div className="step" key={s.n}>
                <div className="top">
                  <span className="n">{String(s.n).padStart(2, '0')}</span>
                  <span className="st">Step</span>
                </div>
                <h4>{s.t}</h4>
                <div className="lead">{s.lead}</div>
                <ul>
                  {s.points.map((pt, j) => <li key={j}>{pt}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="hf-quote">
        <div className="hf-c">
          <q>3 words to describe the internship: <em>intentional, supportive</em> and very insightful.</q>
          <div className="who">— Ronke · cohort 01 intern</div>
        </div>
      </section>

      {/* Inside Cohort One — replaces standalone Hall of Fame */}
      <CohortOneSection />

      {/* Apply or partner */}
      <section className="hf-apply">
        <div className="hf-c">
          <div className="grid">
            <div className="card">
              <div className="chip">For interns</div>
              <h4>Cohort 02 — July &apos;26</h4>
              <p>Applications are open now. All you&apos;ll need is a CV.</p>
              <a className="hf-btn acc" href={APPLY_URL} target="_blank" rel="noopener noreferrer">
                July &apos;26 — apply now <span className="arr">→</span>
              </a>
            </div>
            <div className="card acc">
              <div className="chip">For partners</div>
              <h4>Host an intern</h4>
              <p>Founder-led, mission-aligned, willing to mentor? We&apos;ll match you with vetted talent and handle prep + supervision end-to-end.</p>
              <a className="hf-btn outline" href={PARTNER_FORM} target="_blank" rel="noopener noreferrer" style={{ background: '#fff', color: 'var(--hf-ink)', borderColor: '#fff' }}>
                Partner brief <span className="arr">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
