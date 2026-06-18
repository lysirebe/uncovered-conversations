import Link from 'next/link'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { HfImg } from '@/components/HfImg'
import { TeamSection } from '@/components/TeamSection'
import { MILESTONES, VALUES } from '@/data/about'
import { VOLUNTEER_URL } from '@/data/links'

export default function AboutPage() {
  return (
    <>
      <Nav />

      {/* Hero */}
      <section className="hf-phero">
        <span className="hf-blob b1" style={{ background: 'var(--hf-acc-2)', opacity: .15 }} />
        <div className="hf-c">
          <div className="chip-acc">Our story</div>
          <h1>we started as a<br /><em>conversation.</em></h1>
          <div className="split">
            <div className="body">
              <p>
                <b>Uncovered Conversations</b> began through interviews with founders and
                professionals. What started off as conversations to ignite &amp; educate individuals
                about the importance of financial literacy transformed into conversations with young
                professionals and leaders ranging from different industries.
              </p>
              <p>
                We exist to <b>support, equip and elevate</b> young individuals — the bridge
                between ambitious individuals and the industry leaders, opportunities and
                resources their growth depends on.
              </p>
            </div>
            <div className="photo">
              <HfImg src="/assets/about-page-hero.jpg" alt="Uncovered Conversations · in person" pos="center 30%" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="hf-stats">
        <div className="hf-c">
          <div className="row">
            <div className="stat"><div className="k">6</div><div className="v">programmes &amp; events</div></div>
            <div className="stat"><div className="k">5+</div><div className="v">sectors reached</div></div>
            <div className="stat"><div className="k">1</div><div className="v">internship cohort live</div></div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="hf-tl-v">
        <div className="hf-c">
          <div className="hd">
            <div className="kicker">2021 → today</div>
            <h3>our <em>journey.</em></h3>
          </div>
          <div className="line">
            {MILESTONES.map((ms, i) => (
              <div className={`row${i % 2 ? ' right' : ''}`} key={i}>
                <div className="side">
                  <div className="year">{ms.year}</div>
                  {ms.label && <div className="label">{ms.label}</div>}
                </div>
                <div className="node"><span className="dot" /></div>
                <div className="card">
                  {ms.img && (
                    <div className="ph">
                      <HfImg src={ms.img} alt={ms.title} pos="center" />
                    </div>
                  )}
                  <div className="ct">
                    <div className="title">{ms.title}</div>
                    <p>{ms.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="hf-pillars-min">
        <div className="hf-c">
          <div className="hd">
            <div className="kicker">Our pillars</div>
            <h3>what we&apos;re <em>built on.</em></h3>
          </div>
          <div className="grid">
            {VALUES.map((v, i) => (
              <div className="it" key={i}>
                <div className="n">{String(i + 1).padStart(2, '0')}</div>
                <h4>{v.t}</h4>
                <p>{v.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <TeamSection />

      {/* Join us CTA */}
      <section className="hf-cta-c tight">
        <div className="hf-c">
          <h3>want to join the <em>team?</em></h3>
          <p className="hf-cta-c__body">
            Want to join us and be part of the team at UC — even on a volunteer basis?
          </p>
          <div className="hf-cta-c__label">Click below to join</div>
          <div className="ctas big">
            <a href={VOLUNTEER_URL} target="_blank" rel="noopener noreferrer" className="hf-btn acc">
              Join us here <span className="arr">→</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
