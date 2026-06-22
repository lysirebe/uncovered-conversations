export type Category = 'Video' | 'Podcast' | 'Book'

export interface Resource {
  id: string
  title: string
  by?: string
  category: Category
  url: string
  /** Direct image URL (e.g. YouTube thumbnail) */
  cover?: string
  /** true = designed gradient placeholder; leave a cover comment below */
  coverPlaceholder?: boolean
}

export const RESOURCES: Resource[] = [
  // ── Videos ──────────────────────────────────────────────────
  {
    id: 'v1',
    title: 'How To Build a Success Mindset Through the Power of Belief',
    category: 'Video',
    url: 'https://youtu.be/RbwaApBYmJk',
    // YouTube thumbnail wired directly — ID: RbwaApBYmJk
    cover: 'https://img.youtube.com/vi/RbwaApBYmJk/maxresdefault.jpg',
  },

  // ── Podcasts ─────────────────────────────────────────────────
  {
    id: 'p1',
    title: 'When God Calls You to Let Go of Your Dream Job',
    by: 'Hearing God, Faith & Life Decisions — EP 7',
    category: 'Podcast',
    url: 'https://youtu.be/46-hLkHhdpE',
    // YouTube thumbnail wired directly — ID: 46-hLkHhdpE
    cover: 'https://img.youtube.com/vi/46-hLkHhdpE/maxresdefault.jpg',
  },
  {
    id: 'p2',
    title: 'Voice of Change',
    by: 'Finding Purpose and Focus in VUCA',
    category: 'Podcast',
    url: 'https://podcasts.apple.com/gb/podcast/finding-purpose-and-focus-in-vuca-volatile-uncertain/id1227337850?i=1000709274957',
    cover: '/assets/resource-voiceofchange.webp',
  },
  {
    id: 'p3',
    title: 'The Magnify Conversations',
    category: 'Podcast',
    url: 'https://podcasts.apple.com/ng/podcast/the-magnify-conversations/id1515544903',
    cover: '/assets/resource-magnifyconvos.webp',
  },

  // ── Books ────────────────────────────────────────────────────
  {
    id: 'b1',
    title: 'Unleash Your Superpowers',
    by: 'Foluso Gbadamosi',
    category: 'Book',
    url: 'https://www.amazon.co.uk/Unleash-Your-Superpowers-Discover-talents-ebook/dp/B0BRGF57BS',
    cover: '/assets/resource-unleashyoursuperpowers.jpg',
  },
]

export const CATEGORIES: { id: Category; label: string; icon: string }[] = [
  { id: 'Video', label: 'Videos', icon: '▶' },
  { id: 'Podcast', label: 'Podcasts', icon: '🎙' },
  { id: 'Book', label: 'Books', icon: '📖' },
]
