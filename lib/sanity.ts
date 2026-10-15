import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

// ── Client ─────────────────────────────────────────────────────────────────
// Fill NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET in .env.local
// Falls back to a placeholder id so the client can construct (and the build/dev
// server can run) even when Sanity isn't configured yet — safeQuery() below
// skips the actual network call in that case.
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder',
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

// ── Site settings (singleton) ────────────────────────────────────────────────
// Field names/shape match the old data/links.ts constants 1:1.
export interface SiteSettings {
  applyUrl?: string
  partnerFormUrl?: string
  volunteerUrl?: string
  bookACallUrl?: string
  contactEmail?: string   // bare address, no "mailto:" prefix — build the href with it
  founderOppsFormUrl?: string
  seekerOppsFormUrl?: string
}

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]`

// ── Home page (singleton) ─────────────────────────────────────────────────────
// Projections flatten Sanity image/file refs into plain URL strings so these
// match the old data/home.ts shapes exactly — no changes needed downstream.
export interface Pillar { n: string; t: string; b: string }
export interface GalleryPhoto { src: string; caption: string }

export interface HomePage {
  pillars?: Pillar[]
  gramStrip?: string[]
  gallery?: GalleryPhoto[]
  promoPhoto?: string
}

export const HOME_PAGE_QUERY = `
  *[_type == "homePage"][0]{
    pillars,
    "gramStrip": gramStrip[].asset->url,
    "gallery": gallery[]{ "src": photo.asset->url, caption },
    "promoPhoto": promoPhoto.asset->url
  }
`

// ── About page (singleton) ────────────────────────────────────────────────────
// Matches old data/about.ts shapes (Milestone.img, TeamMember.photo, Founder.photo — all strings).
export interface Milestone {
  year?: string
  label?: string
  title?: string
  body?: string
  img?: string
}
export interface Value { t?: string; b?: string }
export interface TeamMember {
  name?: string
  role?: string
  photo?: string
  bio?: string
}
export interface Founder {
  name?: string
  role?: string
  photo?: string
  quote?: string
  bio?: string
}

export interface AboutPage {
  milestones?: Milestone[]
  values?: Value[]
  team?: TeamMember[]
  founder?: Founder
}

export const ABOUT_PAGE_QUERY = `
  *[_type == "aboutPage"][0]{
    "milestones": milestones[]{ year, label, title, body, "img": image.asset->url },
    values,
    "team": team[]{ name, role, "photo": photo.asset->url, bio },
    "founder": founder{ name, role, "photo": photo.asset->url, quote, bio }
  }
`

// ── Cohort page (singleton) ───────────────────────────────────────────────────
// Matches old data/cohort.ts GalleryItem/Speaker shapes (src strings, not asset refs).
export interface GalleryItem {
  src: string
  type: 'image' | 'video'
  slot: number
  poster?: string
}
export interface Speaker { name?: string; src?: string }

export interface CohortPage {
  internGallery?: GalleryItem[]
  speakers?: Speaker[]
}

export const COHORT_PAGE_QUERY = `
  *[_type == "cohortPage"][0]{
    "internGallery": internGallery[]{
      type,
      slot,
      "src": select(type == "video" => video.asset->url, image.asset->url),
      "poster": poster.asset->url
    },
    "speakers": speakers[]{ name, "src": photo.asset->url }
  }
`

// ── Internship page (singleton) ───────────────────────────────────────────────
// Matches old data/internship.ts Step/SpotlightIntern/Partner shapes.
export interface Step { n?: number; t?: string; lead?: string; points?: string[] }
export interface SpotlightIntern {
  name?: string
  short?: string
  photo?: string
  video?: boolean
  videoSrc?: string
}
export interface Partner { name?: string; src?: string }

export interface InternshipPage {
  steps?: Step[]
  spotlight?: SpotlightIntern[]
  partners?: Partner[]
}

export const INTERNSHIP_PAGE_QUERY = `
  *[_type == "internshipPage"][0]{
    steps,
    "spotlight": spotlight[]{
      name, short, "photo": photo.asset->url,
      "video": hasVideo, "videoSrc": video.asset->url
    },
    "partners": partners[]{ name, "src": logo.asset->url }
  }
`

// ── Partnerships page (singleton) ─────────────────────────────────────────────
// Matches old data/partnerships.ts WhyItem/Option/Founder(headshot)/Testimonial shapes.
export interface WhyItem { n?: string; t?: string; b?: string; feature?: boolean }
export interface Option {
  num?: string
  t?: string
  sub?: string
  points?: string[]
  commit?: string
  cta?: string
  mailto?: string
}
export interface FounderHeadshot { name?: string; src?: string }
export interface Testimonial {
  pull?: string
  body?: string
  bodyHtml?: string
  company?: string
  logo?: string
  feature?: boolean
}

export interface PartnershipsPage {
  why?: WhyItem[]
  options?: Option[]
  founders?: FounderHeadshot[]
  testimonials?: Testimonial[]
}

export const PARTNERSHIPS_PAGE_QUERY = `
  *[_type == "partnershipsPage"][0]{
    why,
    options,
    "founders": founders[]{ name, "src": photo.asset->url },
    "testimonials": testimonials[]{ pull, body, bodyHtml, company, "logo": logo.asset->url, feature }
  }
`

// ── Resources (collection) ────────────────────────────────────────────────────
export type ResourceCategory = 'Video' | 'Podcast' | 'Book'

export interface ResourceDoc {
  _id: string
  title: string
  by?: string
  category: ResourceCategory
  url: string
  cover?: string
}

export const ALL_RESOURCES_QUERY = `
  *[_type == "resource"] | order(category asc, title asc) {
    _id, title, by, category, url, "cover": cover.asset->url
  }
`
