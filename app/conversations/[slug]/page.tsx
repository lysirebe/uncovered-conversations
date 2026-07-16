import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import {
  safeQuery,
  CONVERSATION_BY_SLUG_QUERY,
  ALL_SLUGS_QUERY,
  NAV_CONVERSATIONS_QUERY,
  urlFor,
} from '@/lib/sanity'
import type { Conversation, ConversationNavItem } from '@/lib/sanity'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const ptComponents: PortableTextComponents = {
  types: {
    image: ({ value }: { value: SanityImageSource }) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={urlFor(value).width(1000).fit('max').url()}
        alt=""
        className="cp-inline-img"
      />
    ),
  },
  block: {
    intro: ({ children }) => <p className="cp-intro">{children}</p>,
  },
}

function staticCoverFromEpisode(episode?: string, season?: number): string | null {
  if (!episode) return null
  const n = episode.replace(/EP\.?\s*/i, '').trim().replace(/^0+/, '').padStart(3, '0')
  if (season === 2) return `/assets/conv/s2ep${n}.avif`
  return `/assets/conv/ep${n}.avif`
}

function coverFor(item: { coverImage?: SanityImageSource; episode?: string; season?: number }, size: { w: number; h: number }) {
  if (item.coverImage) return urlFor(item.coverImage).width(size.w).height(size.h).url()
  return staticCoverFromEpisode(item.episode, item.season)
}

// Rough estimate from the Portable Text body — no fake numbers, just word count / 200wpm.
function readingTime(body?: unknown[]): number | null {
  if (!body?.length) return null
  let words = 0
  for (const block of body as Array<{ _type: string; children?: Array<{ text?: string }> }>) {
    if (block._type !== 'block' || !block.children) continue
    for (const span of block.children) {
      if (span.text) words += span.text.trim().split(/\s+/).filter(Boolean).length
    }
  }
  return words ? Math.max(1, Math.round(words / 200)) : null
}

export const revalidate = 60

// ── Static params ────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  const slugs = await safeQuery<string[]>(ALL_SLUGS_QUERY)
  return (slugs ?? []).map((s) => ({ slug: s }))
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default async function ConversationPost({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const conv = await safeQuery<Conversation | null>(CONVERSATION_BY_SLUG_QUERY, { slug })
  if (!conv) notFound()

  const navList = (await safeQuery<ConversationNavItem[]>(NAV_CONVERSATIONS_QUERY)) ?? []
  const idx = navList.findIndex((c) => c._id === conv._id)
  const prevPost = idx > 0 ? navList[idx - 1] : null
  const nextPost = idx >= 0 && idx < navList.length - 1 ? navList[idx + 1] : null

  const coverSrc = coverFor(conv, { w: 1200, h: 630 })
  const mins = readingTime(conv.body)

  const dateStr = conv.publishedDate
    ? new Date(conv.publishedDate).toLocaleDateString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric',
      })
    : null

  return (
    <>
      <Nav />

      <article className="cp-article">
        {/* Cover image */}
        {coverSrc && (
          <div className="cp-cover">
            <img src={coverSrc} alt={conv.title} />
          </div>
        )}

        <div className="hf-c cp-body">
          <Link href="/conversations" className="cp-back">← All conversations</Link>

          {/* Meta */}
          <div className="cp-meta">
            {conv.episode && <span className="chip-acc">{conv.episode}</span>}
            {conv.season  && <span className="cp-season">Season {conv.season}</span>}
            {dateStr      && <span className="cp-date">{dateStr}</span>}
            {mins         && <span className="cp-date">· {mins} min read</span>}
          </div>

          {/* Title */}
          <h1 className="cp-title">{conv.title}</h1>
          {conv.author && <p className="cp-author">By {conv.author}</p>}
          {conv.excerpt && <p className="cp-excerpt">{conv.excerpt}</p>}

          {/* Body */}
          {conv.body && conv.body.length > 0 ? (
            <div className="cp-content">
              <PortableText
                value={conv.body as Parameters<typeof PortableText>[0]['value']}
                components={ptComponents}
              />
            </div>
          ) : (
            <p className="cp-excerpt">
              Full post coming soon — add it in the Studio at <a href="/studio">/studio</a>.
            </p>
          )}
        </div>

        {/* Previous / next episode navigation */}
        {(prevPost || nextPost) && (
          <nav className="hf-c cp-adjacent" aria-label="More conversations">
            {prevPost ? (
              <Link href={`/conversations/${prevPost.slug.current}`} className="cp-adj-card cp-adj-prev">
                <div className="cp-adj-thumb">
                  {coverFor(prevPost, { w: 300, h: 300 }) && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={coverFor(prevPost, { w: 300, h: 300 })!} alt="" />
                  )}
                </div>
                <div className="cp-adj-text">
                  <span className="cp-adj-eyebrow">← Previous</span>
                  {prevPost.episode && <span className="cp-adj-ep">{prevPost.episode}</span>}
                  <span className="cp-adj-title">{prevPost.title}</span>
                </div>
              </Link>
            ) : <div />}
            {nextPost && (
              <Link href={`/conversations/${nextPost.slug.current}`} className="cp-adj-card cp-adj-next">
                <div className="cp-adj-text">
                  <span className="cp-adj-eyebrow">Next →</span>
                  {nextPost.episode && <span className="cp-adj-ep">{nextPost.episode}</span>}
                  <span className="cp-adj-title">{nextPost.title}</span>
                </div>
                <div className="cp-adj-thumb">
                  {coverFor(nextPost, { w: 300, h: 300 }) && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={coverFor(nextPost, { w: 300, h: 300 })!} alt="" />
                  )}
                </div>
              </Link>
            )}
          </nav>
        )}
      </article>

      <Footer />
    </>
  )
}
