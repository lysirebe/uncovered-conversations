export interface GalleryPhoto {
  src: string
  caption: string
}

export const GALLERY: GalleryPhoto[] = [
  { src: '/assets/event-2.jpg',      caption: 'Building You As You Build · Lagos' },
  { src: '/assets/event-3jpg.jpg',   caption: 'Building You As You Build · Lagos' },
  { src: '/assets/event-4.jpg',      caption: 'Building You As You Build · Lagos' },
  { src: '/assets/event-6.jpg',      caption: 'Building You As You Build · Lagos' },
  { src: '/assets/event-7.jpg',      caption: 'Building You As You Build · Lagos' },
  { src: '/assets/event-8.JPG',      caption: 'Building You As You Build · Lagos' },
  { src: '/assets/event-9.JPG',      caption: 'Building You As You Build · Lagos' },
  { src: '/assets/event-10.JPG',     caption: 'Building You As You Build · Lagos' },
  { src: '/assets/event-11.JPG',     caption: 'Building You As You Build · Lagos' },
  { src: '/assets/event-12.jpg',     caption: 'Building You As You Build · Lagos' },
  { src: '/assets/event-13.JPG',     caption: 'Building You As You Build · Lagos' },
  { src: '/assets/event-14.JPG',     caption: 'Building You As You Build · Lagos' },
]

// Instagram-style strip — ip-* in-person shots
export const GRAM_STRIP = [
  '/assets/ip-3.jpg', '/assets/ip-5.jpg', '/assets/ip-6.jpg',
  '/assets/ip-7.jpg', '/assets/ip-extra.jpg',
]

export const PROMO_PHOTO = '/assets/homepage-video-thumbnail.jpg'

export interface Pillar {
  n: string
  t: string
  b: string
}

export const PILLARS: Pillar[] = [
  { n: '01', t: 'Opportunities', b: 'Internship placements, workshops, in-person events and 1:1 mentorship across founder-led organisations.' },
  { n: '02', t: 'Resources', b: 'A curated, community-built library of books, podcasts and videos across finance, faith, career and personal development.' },
  { n: '03', t: 'Collaboration', b: 'We connect young individuals to industry leaders, peers and rooms they\'d otherwise have to fight to enter.' },
]
