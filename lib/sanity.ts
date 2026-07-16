import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

// ── Client ─────────────────────────────────────────────────────────────────
// Fill NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET in .env.local
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '',
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET   ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

// ── Image URL helper ────────────────────────────────────────────────────────
const builder = imageUrlBuilder(sanityClient)
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// ── Types ───────────────────────────────────────────────────────────────────
export interface Conversation {
  _id:           string
  title:         string
  slug:          { current: string }
  episode?:      string        // e.g. "EP.025"
  season?:       number        // 1 or 2
  author?:       string
  publishedDate?:string        // ISO datetime
  coverImage?:   SanityImageSource
  excerpt?:      string
  body?:         unknown[]     // Portable Text blocks
}

// ── GROQ queries ────────────────────────────────────────────────────────────
export const ALL_CONVERSATIONS_QUERY = `
  *[_type == "conversation"] | order(publishedDate desc) {
    _id, title, slug, episode, season, author, publishedDate, coverImage, excerpt
  }
`

export const CONVERSATION_BY_SLUG_QUERY = `
  *[_type == "conversation" && slug.current == $slug][0] {
    _id, title, slug, episode, season, author, publishedDate, coverImage, excerpt, body
  }
`

export const ALL_SLUGS_QUERY = `*[_type == "conversation"].slug.current`

export interface ConversationNavItem {
  _id: string
  title: string
  slug: { current: string }
  episode?: string
  season?: number
  coverImage?: SanityImageSource
}

// Ordered oldest → newest, used to work out the previous/next post from the current index.
export const NAV_CONVERSATIONS_QUERY = `
  *[_type == "conversation"] | order(publishedDate asc) {
    _id, title, slug, episode, season, coverImage
  }
`

// ── Safe fetcher (returns [] / null when Sanity isn't wired yet) ────────────
export async function safeQuery<T>(query: string, params?: Record<string, unknown>): Promise<T> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return (Array.isArray(undefined) ? [] : null) as T
  }
  return sanityClient.fetch<T>(query, params ?? {})
}
