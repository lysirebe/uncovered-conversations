export interface GalleryItem {
  src: string
  type: 'image' | 'video'
  slot: 0 | 1 | 2 | 3 | 4  // 0=large-left, 1=mid-top, 2=mid-bottom, 3=large-right, 4=far-right
  poster?: string
}

export interface Speaker {
  name: string
  src: string
}

// Workplace collage — slot mapping per spec:
// 0 = large left  → skineeds video
// 1 = mid top     → haske video
// 2 = mid bottom  → haske cafe video
// 3 = large right → skineeds photo
export const INTERN_GALLERY: GalleryItem[] = [
  { src: '/assets/ig-skineeds-video.MP4',      type: 'video', slot: 0, poster: '/assets/ig-skineeds-video-poster.jpg' },
  { src: '/assets/ig-haske-video.MP4',         type: 'video', slot: 1, poster: '/assets/ig-haske-video-poster.jpg' },
  { src: '/assets/ig-haske-cafe-video.MP4',    type: 'video', slot: 2, poster: '/assets/ig-haske-cafe-video-poster.jpg' },
  { src: '/assets/ig-skineeds-photo.JPG',      type: 'image', slot: 3 },
  { src: '/assets/internship%20gallery/ronke%20arami.MP4', type: 'video', slot: 4, poster: '/assets/internship%20gallery/ronke-arami-poster.jpg' },
]

export const SPEAKERS: Speaker[] = [
  { name: 'Bukkie',  src: '/assets/speaker-bukkie.jpg' },
  { name: 'Lanerie', src: '/assets/speaker-lanerie.jpg' },
  { name: 'Moyo',    src: '/assets/speaker-moyo.jpg' },
  { name: 'Ruth',    src: '/assets/speaker-ruth.jpg' },
  { name: 'Temi',    src: '/assets/speaker-temi.jpg' },
  // ← add more speakers here for future cohorts
]
