export type Area = 'Finances' | 'Faith' | 'Career' | 'Personal development'
export type Media = 'Book' | 'Podcast' | 'Video'

export interface Resource {
  title: string
  by: string
  area: Area
  media: Media
  tagAcc?: boolean
  uc?: boolean
  cover?: string
}

export const RESOURCES: Resource[] = [
  { title: 'The Knowledge Project', by: 'Shane Parrish', area: 'Personal development', media: 'Podcast', cover: '/assets/resource-5.jpeg' },
  { title: 'Smart Women Finish Rich', by: 'David Bach', area: 'Finances', media: 'Book', cover: '/assets/reosource-4.png' },
  { title: 'Atomic Habits — author talk', by: 'James Clear · YouTube', area: 'Personal development', media: 'Video', cover: '/assets/reosurce-3.jpeg' },
  { title: 'How I Built This', by: 'Guy Raz · NPR', area: 'Career', media: 'Podcast', cover: '/assets/reosurce-2.webp' },
  { title: 'The Psychology of Money', by: 'Morgan Housel', area: 'Finances', media: 'Book', tagAcc: true, cover: '/assets/resources-1.png' },
]

export const AREAS = [
  { id: 'finances', label: 'Finances', n: 2 },
  { id: 'career', label: 'Career', n: 1 },
  { id: 'growth', label: 'Personal development', n: 2 },
]

export const MEDIA_TYPES = [
  { id: 'book', label: 'Book', icon: '📖' },
  { id: 'podcast', label: 'Podcast', icon: '🎙' },
  { id: 'video', label: 'Video', icon: '▶' },
]
