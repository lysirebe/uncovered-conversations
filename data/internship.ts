export interface Step {
  n: number
  t: string
  lead: string
  points: string[]
}

export const STEPS: Step[] = [
  {
    n: 1, t: 'Apply',
    lead: 'CV upload + interview screening.',
    points: [
      'UC reviews every application and matches you to a relevant organisation in your sector',
      'A clear timeline for decision communication — no ghosting',
    ],
  },
  {
    n: 2, t: 'Pre-internship training',
    lead: 'One intensive week to get you ready for the world of work.',
    points: [
      'LinkedIn optimisation & professional branding',
      'Workplace culture & professional etiquette',
      'Communication skills',
      'Leadership foundations',
    ],
  },
  {
    n: 3, t: 'The internship',
    lead: 'A 6-week placement (extensible) inside a founder-led organisation.',
    points: [
      'Contribute to real-life projects from day one',
      'Hands-on experience and genuine project ownership',
      'Mentorship from your host organisation throughout',
    ],
  },
  {
    n: 4, t: 'Ongoing support',
    lead: 'We stay with you the whole way through.',
    points: [
      'Fortnightly check-ins for accountability',
      'Weekly workshops addressing real challenges',
      'A peer support system with fellow interns',
      'Mid-programme feedback & adjustment sessions',
    ],
  },
]

export interface SpotlightIntern {
  name: string
  short: string
  photo: string
  video?: boolean
  videoSrc?: string
}

export const SPOTLIGHT: SpotlightIntern[] = [
  { name: 'Tobi Olayiwola — Programs Intern at Kobikam Africa', short: 'Tobi', photo: '/assets/intern-tobi.jpg', video: true, videoSrc: '/assets/video-tobi-testimonial.MP4' },
  { name: 'Amen Olorunnisola — Marketing Intern', short: 'Amen', photo: '/assets/intern-amen.jpg' },
  { name: 'Dunke Majekodunmi — Marketing Intern at Haske Cafe', short: 'Dunke', photo: '/assets/intern-dunke.jpg' },
  { name: 'Ronke — UC Intern', short: 'Ronke', photo: '/assets/intern-ronke.jpg', video: true, videoSrc: '/assets/video-dunke-testimonial.MP4' },
  { name: 'Anne — UC Intern', short: 'Anne', photo: '/assets/intern-anne.jpg', video: true, videoSrc: '/assets/video-anne-testimonial.MP4' },
]

export interface Partner {
  name: string
  src: string
}

export const PARTNERS: Partner[] = [
  { name: 'Haske Cafe', src: '/assets/partner-haske.jpg' },
  { name: 'Skinneeds', src: '/assets/partner-skinneeds.jpg' },
  { name: 'SBO', src: '/assets/partner-sbo.jpg' },
  { name: 'Kobikam Africa', src: '/assets/partner-kobikam.jpg' },
  { name: 'Arami', src: '/assets/partner-arami.jpg' },
]

export const APPLY_URL = 'https://forms.gle/af38XghDNZKD3mg16'
