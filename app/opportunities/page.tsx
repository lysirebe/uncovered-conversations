import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { FOUNDER_OPPS_FORM, SEEKER_OPPS_FORM } from '@/data/links'

export default function OpportunitiesPage() {
  return (
    <>
      <Nav />

      {/* Hero */}
      <section className="hf-phero">
        <span className="hf-blob b1" />
        <span className="hf-blob b2" />
        <div className="hf-c">
          <div className="chip-acc">Opportunities</div>
          <h1>opportunities.</h1>
          <p className="hf-phero__sub">
            Founders in our community are always hiring — and they come to us looking for people
            they can trust. This is where we connect them. Whether you&apos;re building a team or
            looking for your next role, start below.
          </p>
        </div>
      </section>

      {/* Two cards */}
      <section className="hf-opp">
        <div className="hf-c">
          <div className="hf-opp__grid">

            {/* Card 1 — Founders */}
            <div className="hf-opp__card">
              <div className="hf-opp__chip">For founders</div>
              <h4>Hiring? Add a role to our board.</h4>
              <p>Tell us who you&apos;re looking for and we&apos;ll share it with people we think are a great fit.</p>
              <a className="hf-opp__cta" href={FOUNDER_OPPS_FORM}>
                Submit a role <span>→</span>
              </a>
            </div>

            {/* Card 2 — Job-seekers */}
            <div className="hf-opp__card hf-opp__card--dark">
              <div className="hf-opp__chip">For job-seekers</div>
              <h4>Looking for your next opportunity?</h4>
              <p>Join our talent list and we&apos;ll reach out when something fits what you&apos;re after.</p>
              <a className="hf-opp__cta" href={SEEKER_OPPS_FORM}>
                Join the talent list <span>→</span>
              </a>
            </div>

          </div>

          <p className="hf-opp__reassurance">
            We match by hand and share your details thoughtfully — only when there&apos;s a genuine fit.
          </p>

          {/*
            ── Future listings section ──────────────────────────────────────
            Add a live job board or listing grid below this comment when ready.
            The .hf-opp container and .hf-c padding will handle layout automatically.
            ─────────────────────────────────────────────────────────────────
          */}
        </div>
      </section>

      <Footer />
    </>
  )
}
