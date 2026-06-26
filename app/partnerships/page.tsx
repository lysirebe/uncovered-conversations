import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { HfImg } from '@/components/HfImg'
import { FameSection } from '@/components/FameSection'
import { WHY, OPTIONS, TESTIMONIALS, CONTACT } from '@/data/partnerships'
import { BOOK_A_CALL } from '@/data/links'

export default function PartnershipsPage() {
  return (
    <>
      <Nav />

      {/* Hero */}
      <section className="hf-phero hf-pn-hero">
        <span className="hf-blob b1" />
        <span className="hf-blob b2" />
        <div className="hf-c">
          <div className="chip-acc">Partnerships</div>
          <h1>let&apos;s build the next generation <em>together.</em></h1>
          <p className="pn-sub">
            Be part of empowering the next generation of African leaders. We partner with
            founder-led organisations, workshop collaborators and sponsors who want to
            invest in young talent — and grow alongside them.
          </p>
          <div className="ctas">
            <a className="hf-btn acc" href="#partnership-options">
              Explore partnership options <span className="arr">→</span>
            </a>
            <a className="hf-btn outline" href={CONTACT}>Let&apos;s talk</a>
          </div>
          <div className="pn-hero-photo">
            <HfImg src="/assets/partnerships-hero.jpg" alt="Uncovered Conversations · in-person event" pos="center 38%" />
          </div>
        </div>
      </section>

      {/* Why partner bento */}
      <section className="hf-pn-why">
        <div className="hf-c">
          <div className="hd">
            <div className="chip-acc">Why partner</div>
            <h3>what your organisation <em>gains.</em></h3>
            <div className="kicker">partnering with UC is a two-way exchange — you open a door, and real value comes back</div>
          </div>
          <div className="bento">
            {WHY.map((w, i) => (
              <div className={`b${w.feature ? ' feature' : ''}`} key={i}>
                <span className="num">{w.n}</span>
                <h4>{w.t}</h4>
                <p>{w.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership options */}
      <section className="hf-pn-opts" id="partnership-options">
        <div className="hf-c">
          <div className="hd">
            <h3>ways to <em>partner.</em></h3>
            <div className="kicker">three distinct ways to build with us</div>
          </div>
          <div className="grid">
            {OPTIONS.map((o, i) => (
              <div className="opt" key={i}>
                <div className="num">{o.num}</div>
                <h4>{o.t}</h4>
                <div className="sub">{o.sub}</div>
                <ul>{o.points.map((pt, j) => <li key={j}>{pt}</li>)}</ul>
                <div className="commit">{o.commit}</div>
                <a className="opt-cta" href={o.mailto}>{o.cta} <span>→</span></a>
              </div>
            ))}
          </div>

          {/* Book a call */}
          <div className="hf-pn-bookcall">
            <p className="hf-pn-bookcall__desc">
              Want to explore how we could work together? Let&apos;s Talk.
            </p>
            <a href={BOOK_A_CALL} target="_blank" rel="noopener noreferrer" className="hf-btn acc hf-pn-bookcall__btn">
              Click here to book a call <span className="arr">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Founder hall of fame — hf-c inside component, marquee full-bleed */}
      <FameSection />

      {/* Testimonials */}
      <section className="hf-pn-says">
        <div className="hf-c">
          <div className="hd">
            <div className="chip-acc">Testimonials</div>
            <h3>don&apos;t just take <em>our word</em> for it.</h3>
            <div className="kicker">hear what previous partners have to say about their experiences</div>
          </div>
          <div className="masonry">
            {TESTIMONIALS.map((t, i) => (
              <div className={`tcard${t.feature ? ' feature' : ''}`} key={i}>
                <div className="pull"><span className="mark">&ldquo;</span>{t.pull}</div>
                {t.bodyHtml
                  ? <p dangerouslySetInnerHTML={{ __html: t.bodyHtml }} />
                  : <p>{t.body}</p>
                }
                <div className="tcard-logo">
                  {t.logo && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={t.logo} alt={t.company} />
                  )}
                  <span className="cname">{t.company}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA tiers */}
      <section className="hf-pn-cta">
        <div className="hf-c">
          <div className="top">
            <h3>let&apos;s partner <em>together.</em></h3>
            <div className="sub">pick the path that fits — we&apos;ll take it from there.</div>
          </div>
          <div className="tiers">
            <div className="tier">
              <div className="t">Host an intern</div>
              <p>Bring vetted young talent into your organisation, fully supported by UC.</p>
              <a href={OPTIONS[0].mailto}>Get started →</a>
            </div>
            <div className="tier">
              <div className="t">Collaborate with us</div>
              <p>Run a workshop or co-create with the UC community.</p>
              <a href={OPTIONS[1].mailto}>Start a conversation →</a>
            </div>
            <div className="tier">
              <div className="t">Become a sponsor</div>
              <p>Back the programmes — product, event or financial support.</p>
              <a href={OPTIONS[2].mailto}>See sponsorship →</a>
            </div>
          </div>
          <div className="primary">
            <a href={CONTACT}>Let&apos;s partner together <span className="arr">→</span></a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
