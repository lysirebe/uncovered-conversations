export interface GalleryItem {
  src: string
  type: 'image' | 'video'
  caption: string
}

// Short varied captions for the workplace carousel.
// Edit freely — add more here as the gallery grows.
export const CAPTIONS = [
  'Getting stuck into real projects',
  'Learning the ropes',
  'Collaboration in action',
  'Behind the scenes with the team',
  'Putting ideas into practice',
  'Day-to-day in the cohort',
  // ← add more caption strings here
]

export const INTERN_GALLERY: GalleryItem[] = [
  { src: '/assets/ig-skineeds-photo.JPG',      type: 'image', caption: CAPTIONS[0] },
  { src: '/assets/ig-haske-video.MP4',          type: 'video', caption: CAPTIONS[2] },
  { src: '/assets/ig-haske-cafe-video.MP4',     type: 'video', caption: CAPTIONS[3] },
  { src: '/assets/ig-skineeds-video.MP4',       type: 'video', caption: CAPTIONS[4] },
  // ← add more { src, type, caption } entries here for future cohort photos/videos
]

export interface Speaker {
  name: string
  src: string
}

export const SPEAKERS: Speaker[] = [
  { name: 'Bukkie',   src: '/assets/speaker-bukkie.jpg' },
  { name: 'Lanerie',  src: '/assets/speaker-lanerie.jpg' },
  { name: 'Moyo',     src: '/assets/speaker-moyo.jpg' },
  { name: 'Ruth',     src: '/assets/speaker-ruth.jpg' },
  { name: 'Temi',     src: '/assets/speaker-temi.jpg' },
  // ← add more speakers here for future cohorts
]
