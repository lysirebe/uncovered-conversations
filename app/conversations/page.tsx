import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { safeQuery, ALL_CONVERSATIONS_QUERY, urlFor } from '@/lib/sanity'
import type { Conversation } from '@/lib/sanity'
import Link from 'next/link'

// Titles are consistently "... w/ Guest Name" (case/spacing varies) — pull the guest,
// not Osarhieme (the interviewer, stored in the `author` field).
function guestFromTitle(title: string): string {
  const parts = title.split(/\bw\/\s*/i)
  return parts.length > 1 ? parts[parts.length - 1].replace(/\s+/g, ' ').trim() : title
}

function staticCoverFromEpisode(episode?: string, season?: number): string | null {
  if (!episode) return null
  const n = episode.replace(/EP\.?\s*/i, '').trim().replace(/^0+/, '').padStart(3, '0')
  if (season === 2) return `/assets/conv/s2ep${n}.avif`
  return `/assets/conv/ep${n}.avif`
}

function ConvCover({ conv, showTitle }: { conv: Conversation; showTitle?: boolean }) {
  const imgSrc = conv.coverImage
    ? urlFor(conv.coverImage).width(400).height(500).url()
    : staticCoverFromEpisode(conv.episode, conv.season)
  const seasonLabel = conv.season ? `S${conv.season}` : ''
  const epLabel = conv.episode ?? ''
  const caption = [seasonLabel, epLabel].filter(Boolean).join(' · ')

  return (
    <Link className="cv" href={`/conversations/${conv.slug.current}`} title={conv.title}>
      <div className="cover">
        {imgSrc ? (
          <img src={imgSrc} alt={conv.title} loading="lazy" />
        ) : (
          <div style={{ position: 'absolute', inset: 0, background: 'var(--hf-surface-2)' }} />
        )}
        <span className="read"><span>Read →</span></span>
      </div>
      <div className="cap">
        <span className="ep">{caption}</span>
        <span className="area">{guestFromTitle(conv.title)}</span>
      </div>
      {showTitle && <span className="ttl">{conv.title}</span>}
    </Link>
  )
}

export const revalidate = 60

export default async function ConversationsPage() {
  const conversations = await safeQuery<Conversation[]>(ALL_CONVERSATIONS_QUERY)
  const list = conversations ?? []

  const featured = list.find((c) => c.episode === 'EP.004' && c.season === 2) ?? list[0] ?? null
  const season2  = list.filter((c) => c.season === 2)
  const season1  = list.filter((c) => c.season === 1)
  const total    = list.length

  const featImgSrc = featured
    ? (featured.coverImage
        ? urlFor(featured.coverImage).width(900).height(700).url()
        : staticCoverFromEpisode(featured.episode, featured.season))
    : null

  return (
    <>
      <Nav />

      {/* Hero */}
      <section className="hf-phero hf-phero--center">
        <span className="hf-blob b1" />
        <div className="hf-c">
          <div className="chip-acc">Conversations · the archive</div>
          <h1>it started with a <em>conversation.</em></h1>
          <div className="lead">
            Long-form, written reflections from the people we wished we&apos;d had access to at 22 —
            {' '}{total || 37} posts across two seasons, spanning finance, fashion, faith, beauty,
            career, wellness and more.
          </div>
        </div>
      </section>

      {/* Featured episode */}
      {featured && (
        <section className="hf-conv-feat">
          <div className="row">
            <div className="img-side">
              <span className="badge">
                Featured · {featured.season ? `S${featured.season} ` : ''}{featured.episode ?? ''}
              </span>
              {featImgSrc && (
                <img
                  src={featImgSrc}
                  alt={featured.title}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                />
              )}
            </div>
            <div className="body-side">
              <div className="meta">
                {featured.episode && <span className="chip">{featured.episode}</span>}
                {featured.season  && <span className="chip">S{featured.season}</span>}
              </div>
              <h2><em>{guestFromTitle(featured.title)}.</em><br />{featured.title}</h2>
              {featured.excerpt && <p className="lead">{featured.excerpt}</p>}
              <div className="ctas">
                <Link href={`/conversations/${featured.slug.current}`} className="hf-btn acc">
                  Read the post <span className="arr">→</span>
                </Link>
                <a href="#archive" className="hf-btn outline">Browse the archive</a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Archive grid */}
      <section className="hf-conv-grid" id="archive">
        <div className="hf-c">
          {season2.length > 0 && (
            <>
              <div className="seasonhd">
                <h3>season <em>two.</em></h3>
                <div className="meta">2022 · {season2.length} episodes</div>
              </div>
              <div className="grid grid--s2">
                {season2.map((c) => <ConvCover key={c._id} conv={c} showTitle />)}
              </div>
            </>
          )}

          {season1.length > 0 && (
            <>
              <div className="seasonhd">
                <h3>season <em>one.</em></h3>
                <div className="meta">2021 · {season1.length} episodes</div>
              </div>
              <div className="grid">
                {season1.map((c) => <ConvCover key={c._id} conv={c} />)}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </>
  )
}
