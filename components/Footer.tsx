import Link from 'next/link'
import { NewsletterForm } from './NewsletterForm'

export function Footer() {
  return (
    <footer className="hf-footer">
      <div className="hf-c">
        <div className="top">
          <div className="brand-col">
            <h4>Uncovered Conversations.</h4>
            <div className="tag">A youth empowerment organisation — igniting one life at a time.</div>
          </div>
          <div className="col">
            <div className="col-t">Navigate</div>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/internship">UC Internship</Link>
            <Link href="/partnerships">Partnerships</Link>
            <Link href="/resources">Resources</Link>
            <Link href="/conversations">Conversations</Link>
          </div>
          <div className="col">
            <div className="col-t">Social</div>
            <a href="https://www.instagram.com/uncoveredconversations/" target="_blank" rel="noopener noreferrer">
              Instagram → @uncoveredconversations
            </a>
            <a href="https://www.linkedin.com/company/uncovered-conversations/posts/?feedView=all" target="_blank" rel="noopener noreferrer">
              LinkedIn → uncovered-conversations
            </a>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              Substack
              <em style={{ fontStyle: 'normal', fontSize: 9.5, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--hf-acc)', border: '1px solid color-mix(in oklab, var(--hf-acc) 45%, transparent)', borderRadius: 99, padding: '2px 8px' }}>
                Coming soon
              </em>
            </span>
            <a href="mailto:admin@uncoveredconversations.com">admin@uncoveredconversations.com</a>
          </div>
          <div className="col nl-col">
            <div className="col-t">Newsletter</div>
            <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,.6)', marginBottom: 10, lineHeight: 1.4 }}>
              monthly drops — new conversations, resources, opportunities.
            </div>
            <NewsletterForm />
          </div>
        </div>
        <div className="bot">
          <span>© Uncovered Conversations 2026 — all rights reserved</span>
          <span>EST. 2022</span>
        </div>
      </div>
    </footer>
  )
}
