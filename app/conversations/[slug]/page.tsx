import { notFound } from 'next/navigation'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import {
  safeQuery,
  CONVERSATION_BY_SLUG_QUERY,
  ALL_SLUGS_QUERY,
  urlFor,
} from '@/lib/sanity'
import type { Conversation } from '@/lib/sanity'
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
        style={{ width: '100%', height: 'auto', borderRadius: 12, margin: '24px 0' }}
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

  const coverSrc = conv.coverImage
    ? urlFor(conv.coverImage).width(1200).height(630).url()
    : staticCoverFromEpisode(conv.episode, conv.season)

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
          {/* Meta */}
          <div className="cp-meta">
            {conv.episode && <span className="chip-acc">{conv.episode}</span>}
            {conv.season  && <span className="cp-season">Season {conv.season}</span>}
            {dateStr      && <span className="cp-date">{dateStr}</span>}
          </div>

          {/* Title */}
          <h1 className="cp-title">{conv.title}</h1>
          {conv.author && <p className="cp-author">{conv.author}</p>}
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
      </article>

      <Footer />
    </>
  )
}
