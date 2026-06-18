'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LINKS = [
  { href: '/about', label: 'About' },
  { href: '/internship', label: 'Internships' },
  { href: '/partnerships', label: 'Partnerships' },
  { href: '/resources', label: 'Resources' },
  { href: '/conversations', label: 'Conversations' },
]

export function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // Close on route change
  useEffect(() => { setOpen(false) }, [pathname])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <nav className="hf-nav">
        <div className="hf-c">
          <div className="links">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} className={pathname === l.href ? 'active' : ''}>
                {l.label}
              </Link>
            ))}
          </div>

          <div className="logo">
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: 'inherit' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/uc-logo.avif" alt="UC" style={{ height: 52, width: 'auto', display: 'block' }} />
            </Link>
          </div>

          <div className="hf-nav-right">
            {/* Desktop: "Join us" button */}
            <Link href="/internship" className="hf-btn fill hf-nav-join" style={{ fontSize: 12.5 }}>
              Join us
            </Link>
            {/* Mobile: hamburger */}
            <button
              className="hf-nav-hamburger"
              onClick={() => setOpen(true)}
              aria-label="Open navigation"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      {open && (
        <div className="hf-mobile-nav" role="dialog" aria-modal="true" aria-label="Navigation">
          <div className="hf-mobile-nav__head">
            <Link href="/">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/uc-logo.avif" alt="UC" style={{ height: 44, width: 'auto', display: 'block' }} />
            </Link>
            <button className="hf-mobile-nav__close" onClick={() => setOpen(false)} aria-label="Close navigation">
              ×
            </button>
          </div>

          <nav className="hf-mobile-nav__links">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={pathname === l.href ? 'active' : ''}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hf-mobile-nav__foot">
            <Link href="/internship" className="hf-btn acc" style={{ width: '100%', justifyContent: 'center' }}>
              Join us <span className="arr">→</span>
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
