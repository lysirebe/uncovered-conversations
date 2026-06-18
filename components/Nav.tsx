'use client'

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

  return (
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
        <Link href="/internship" className="hf-btn fill" style={{ justifySelf: 'end', fontSize: 12.5 }}>
          Join us
        </Link>
      </div>
    </nav>
  )
}
