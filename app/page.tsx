import Link from 'next/link'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { Marquee } from '@/components/Marquee'
import { HfImg } from '@/components/HfImg'
import { HeroWordSwap } from '@/components/HeroWordSwap'
import { PromoSection } from '@/components/PromoSection'
import { PILLARS, GRAM_STRIP } from '@/data/home'
import { APPLY_URL } from '@/data/links'

export default function HomePage() {
  return (
    <>
      <Nav />

      {/* Hero — content padded via hf-c */}
      <section className="hf-hero">
        <span className="hf-blob b1" />
        <span className="hf-blob b2" />
        <div className="hf-c">
          <div className="eyebrow">A youth empowerment organisation · est. 2021</div>
          <h1>
            <span style={{ display: 'inline-block', fontFamily: 'var(--font-instrument-serif, "Instrument Serif"), Georgia, serif', fontStyle: 'italic', fontSize: '0.42em', color: 'var(--hf-acc)', letterSpacing: '.01em', textTransform: 'none', marginBottom: 14, lineHeight: 1 }}>
              uncovered conversations
            </span>
            <br />
            we are <br />
            <HeroWordSwap />
            <br />
            young individuals.
          </h1>
          <div className="tag">igniting one life at a time</div>
          <div className="ctas">
            <span className="hf-btn outline">↓ Scroll the story</span>
          </div>
        </div>
      </section>

      {/* Hero photo — full-bleed, crop toward bottom to show heads */}
      <section className="hf-photo">
        <div className="img">
          <HfImg src="/assets/homepage-hero.jpg" alt="In-person event · our community" pos="center 20%" />
        </div>
        <div className="badge">our community · in person</div>
      </section>

      {/* Who we are */}
      <section className="hf-who">
        <span className="hf-blob b3" />
        <div className="hf-c">
          <div className="grid">
            <div>
              <div className="label">Who we are</div>
              <h2>a youth org for the <em>next</em> generation.</h2>
              <div className="kicker">opportunities · resources · collaboration</div>
            </div>
            <div className="right">
              <p>
                <b>Uncovered Conversations</b> is an organisation dedicated to youth empowerment.
                Our aim is to <b>support, equip and elevate</b> young individuals — serving as a
                bridge between ambitious individuals and the industry leaders, opportunities and
                resources their growth depends on.
              </p>
              <div style={{ display: 'inline-flex', gap: 10 }}>
                <Link href="/about" className="hf-btn acc">
                  Learn more <span className="arr">→</span>
                </Link>
                <span style={{ alignSelf: 'center', fontFamily: 'var(--font-jetbrains-mono, "JetBrains Mono"), monospace', fontSize: 11, color: 'var(--hf-muted)', letterSpacing: '.05em' }}>
                  /about-us
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee — full-bleed, no container */}
      <Marquee />

      {/* Pillars */}
      <section className="hf-pillars">
        <div className="hf-c">
          <div className="hd">
            <h3>what we do.</h3>
            <span className="num">3 PILLARS · 01–03</span>
          </div>
          <div className="row">
            {PILLARS.map((p) => (
              <div className="card" key={p.n}>
                <div className="dot" />
                <div className="n">{p.n}</div>
                <h4>{p.t}</h4>
                <p>{p.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promo + gallery — hf-c lives inside PromoSection */}
      <PromoSection />

      {/* Internship CTA — two-column layout */}
      <section className="hf-intern-cta">
        <div className="hf-c">
          <div className="left">
            <div className="chip-acc">UC Internship · cohort 02 open</div>
            <h3>ready to get real <em>experience?</em></h3>
          </div>
          <div className="right" style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center', textAlign: 'center' }}>
            <p>
              A 12-week paid placement inside a founder-led organisation — with training,
              mentorship and a cohort that becomes your network for life.
            </p>
            <a className="hf-btn acc" href={APPLY_URL} target="_blank" rel="noopener noreferrer">
              Apply now <span className="arr">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Founder quote — full-bleed dark, content padded */}
      <section className="hf-quote">
        <div className="hf-c">
          <q>
            igniting lives <em>one life at a time</em> is our goal — and we are committed to
            empowering young leaders and pioneers in their respective fields and endeavours.
          </q>
          <div className="who">— Osarhieme · founder, uncovered conversations</div>
        </div>
      </section>

      {/* From the gram */}
      <section className="hf-gram">
        <div className="hf-c">
          <div className="hd">
            <h3>from the gram.</h3>
            <span className="handle">@uncoveredconversations</span>
          </div>
          <div className="grid">
            {GRAM_STRIP.map((src, i) => (
              <div key={i}>
                <div className="hf-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', position: 'absolute', inset: 0 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
