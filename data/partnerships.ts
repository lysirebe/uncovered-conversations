export interface WhyItem {
  n: string
  t: string
  b: string
  feature?: boolean
}

export const WHY: WhyItem[] = [
  { n: '01', t: 'Fresh perspectives & innovative ideas', b: 'Interns bring new approaches to problem-solving — angles your team might not reach on its own.', feature: true },
  { n: '02', t: 'Identify future talent', b: 'Spot and grow potential future hires early, before anyone else does.' },
  { n: '03', t: 'Support capacity building', b: 'Ease your team\'s workload and grow knowledge-sharing across your industry.' },
  { n: '04', t: 'Brand visibility', b: 'Get in front of a growing community of ambitious young professionals.' },
  { n: '05', t: 'Meaningful social impact', b: 'Invest directly in the next generation of African leaders.' },
]

export interface Option {
  num: string
  t: string
  sub: string
  points: string[]
  commit: string
  cta: string
  mailto: string
}

export const OPTIONS: Option[] = [
  {
    num: '01', t: 'Host an Internship',
    sub: 'Bring a vetted young professional into your organisation.',
    points: [
      'Fresh perspectives and innovative ideas',
      'Support on real projects and capacity building',
      'Identify potential future talent early',
      'Full support from the UC team throughout',
    ],
    commit: '6-week commitment · flexible extension',
    cta: 'Host an intern',
    mailto: 'mailto:admin@uncoveredconversations.com?subject=Internship%20Host%20Interest%20-%20%5BCompany%20Name%5D',
  },
  {
    num: '02', t: 'Workshop Host or Collaborator',
    sub: 'Share your industry expertise with the UC community.',
    points: [
      'Deliver workshops on your area of mastery',
      'Build brand visibility with our audience',
      'One-time or recurring collaborations',
      'Topics fully customised to your strengths',
    ],
    commit: 'One-time or recurring · your call',
    cta: 'Become a collaborator',
    mailto: 'mailto:admin@uncoveredconversations.com?subject=Workshop%20%26%20Collaboration%20Interest%20-%20%5BCompany%20Name%5D',
  },
  {
    num: '03', t: 'Sponsorships',
    sub: 'Fuel the programmes that move young lives forward.',
    points: [
      'Product — donate goods or services for events',
      'Event — back conversations, workshops & launches',
      'Financial — fund stipends, training & the platform',
      'Recognition across all UC channels',
    ],
    commit: 'Product · event · financial',
    cta: 'Explore sponsorship',
    mailto: 'mailto:admin@uncoveredconversations.com?subject=Sponsorship%20Interest%20-%20%5BCompany%20Name%5D',
  },
]

export interface Founder {
  name: string
  src: string
}

export const FOUNDERS: Founder[] = [
  { name: 'Demi Osunsina', src: '/assets/founder-demi.jpg' },
  { name: 'Dammy Feyide', src: '/assets/founder-dammy.jpg' },
  { name: 'Ore Lawani', src: '/assets/founder-ore.jpg' },
  { name: 'Oyinkan Olagbegi', src: '/assets/founder-oyinkan.jpg' },
  { name: 'Ijeoma Adesanya', src: '/assets/founder-ijeoma.jpg' },
]

export interface Testimonial {
  pull: string
  body: string
  company: string
  logo?: string
  feature?: boolean
}

export const TESTIMONIALS: Testimonial[] = [
  {
    pull: 'We believe in developing young talent.',
    body: 'Hosting was a chance to provide practical industry exposure, contribute to capacity building, share knowledge, and groom future professionals who could add value to the workforce.',
    company: 'Sapphire By O',
    logo: '/assets/partner-sbo.jpg',
    feature: true,
  },
  {
    pull: 'It taught us a lot more about teamwork.',
    body: 'Delegation of more tasks that usually would be left undone freed us up to focus on our priorities — and gave us a completely different perspective.',
    company: 'Arami Essentials',
    logo: '/assets/partner-arami.jpg',
  },
  {
    pull: 'The intern came in ready to contribute from day one.',
    body: 'UC\'s preparation process showed — we had a professional who understood workplace culture and hit the ground running. We\'d host again without hesitation.',
    company: 'Kobikam Africa',
    logo: '/assets/partner-kobikam.jpg',
  },
]

export const CONTACT = 'mailto:admin@uncoveredconversations.com'
export const PARTNER_FORM = 'https://forms.gle/F2PZB9Q9xDQ6amfB8'
export const BOOK_A_CALL = 'https://calendar.app.google/jpXEE58xCB7UNMa1A'
