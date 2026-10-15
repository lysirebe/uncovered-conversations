/**
 * One-time content seed: pushes the site's current hardcoded content
 * (previously in data/*.ts) into Sanity as the initial documents, so
 * flipping the pages over to Sanity-driven content doesn't blank anything
 * out. Images/videos referenced by local /assets paths are read straight
 * off disk and uploaded as real Sanity assets; resource covers that are
 * external URLs (e.g. YouTube thumbnails) are downloaded first.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-content.mjs
 *
 * Safe to re-run — every document is createOrReplace'd by a fixed _id.
 */

import { createClient } from '@sanity/client'
import { readFile } from 'fs/promises'
import { join } from 'path'

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'YOUR_PROJECT_ID'
const DATASET    = process.env.NEXT_PUBLIC_SANITY_DATASET    ?? 'production'
const API_TOKEN  = process.env.SANITY_API_TOKEN              ?? 'YOUR_API_TOKEN'

const client = createClient({
  projectId: PROJECT_ID, dataset: DATASET, token: API_TOKEN,
  apiVersion: '2024-01-01', useCdn: false,
})

const PUBLIC_DIR = new URL('../public', import.meta.url).pathname

function rk() { return Math.random().toString(36).slice(2) }

function extOf(pathOrUrl) {
  return pathOrUrl.split('?')[0].split('.').pop()?.toLowerCase() ?? ''
}

function contentTypeFor(ext) {
  const map = {
    jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp',
    avif: 'image/avif', gif: 'image/gif',
    mp4: 'video/mp4', mov: 'video/quicktime', m4v: 'video/x-m4v',
  }
  return map[ext] ?? 'application/octet-stream'
}

const assetCache = new Map()

// Reads a local /assets/... (or any public-relative) path off disk and
// uploads it to Sanity as an image or file asset. Cached by path so the
// same photo reused in multiple places only uploads once.
async function uploadLocal(publicPath, kind) {
  if (!publicPath) return null
  const cacheKey = `${kind}:${publicPath}`
  if (assetCache.has(cacheKey)) return assetCache.get(cacheKey)

  const relative = decodeURIComponent(publicPath.replace(/^\//, ''))
  const abs = join(PUBLIC_DIR, relative)
  const ext = extOf(relative)
  const filename = relative.split('/').pop()

  try {
    const buffer = await readFile(abs)
    const asset = await client.assets.upload(kind, buffer, { filename, contentType: contentTypeFor(ext) })
    const result = { _type: kind, asset: { _type: 'reference', _ref: asset._id } }
    assetCache.set(cacheKey, result)
    console.log(`  ✓ uploaded ${kind}: ${relative}`)
    return result
  } catch (err) {
    console.warn(`  ✗ failed to upload ${relative}: ${err.message}`)
    return null
  }
}

// For resource covers, which may be a local path OR an external URL (YouTube thumbs etc).
async function uploadImageAny(pathOrUrl) {
  if (!pathOrUrl) return null
  if (/^https?:\/\//i.test(pathOrUrl)) {
    const cacheKey = `remote:${pathOrUrl}`
    if (assetCache.has(cacheKey)) return assetCache.get(cacheKey)
    try {
      const res = await fetch(pathOrUrl, { signal: AbortSignal.timeout(20_000) })
      if (!res.ok) throw new Error(`fetch ${res.status}`)
      const buffer = Buffer.from(await res.arrayBuffer())
      const ext = extOf(pathOrUrl) || 'jpg'
      const asset = await client.assets.upload('image', buffer, { filename: `cover.${ext}`, contentType: contentTypeFor(ext) })
      const result = { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
      assetCache.set(cacheKey, result)
      console.log(`  ✓ uploaded remote image: ${pathOrUrl}`)
      return result
    } catch (err) {
      console.warn(`  ✗ failed to fetch/upload ${pathOrUrl}: ${err.message}`)
      return null
    }
  }
  return uploadLocal(pathOrUrl, 'image')
}

// ── Inlined content (copied from the old data/*.ts files) ───────────────────

const LINKS = {
  applyUrl: 'https://forms.gle/af38XghDNZKD3mg16',
  partnerFormUrl: 'https://forms.gle/F2PZB9Q9xDQ6amfB8',
  volunteerUrl: 'https://forms.gle/X3B2eNnofB8RBeJA9',
  bookACallUrl: 'https://calendar.app.google/F4LKEWdyeitFcDpZ9',
  contactEmail: 'admin@uncoveredconversations.com',
  founderOppsFormUrl: 'https://forms.gle/ewZCQHi9UNh7Y51G7',
  seekerOppsFormUrl: 'https://forms.gle/BDY6dcv3zajEwAr69',
}

const MILESTONES = [
  { year: '2021 · MAY', label: 'The first conversations', title: 'Launched our Online Interview Series', body: 'The conversations that started it all — candid interviews with founders, professionals and leaders across different industries.', img: '/assets/timeline-conversations.jpg' },
  { year: '2022 · FEB', label: 'Our first online event', title: 'The Financial Freedom Workshop', body: 'Our very first programme — a 2-day intensive on money, mindset and building wealth early. The spark that became UC.', img: '/assets/timeline-ff.jpg' },
  { year: '2022 · JUNE', label: '', title: 'Entering the World of Business', body: 'An online event demystifying how to start and structure a business — turning ambition into a real first step.', img: '/assets/timeline-enteringbusiness.jpg' },
  { year: '2022 · SEPT', label: 'Our debut in person event', title: "'Building You As You Build' — in person", body: 'Our first live event. Speakers, panels and a room full of young builders, all in one place.', img: '/assets/timeline-inperson.jpg' },
  { year: '2023 · AUG–SEPT', label: 'The year we focused on leadership', title: 'Six-Week Leadership Programme', body: 'Cohort-based mentorship with weekly sprints and founder-led mentors — leadership built in practice, not theory.', img: '/assets/timeline-leadership.jpg' },
  { year: '2023 · NOV', label: '', title: 'Skinneeds Community Leadership Series', body: 'We partnered with the Skinneeds community for a 3-week series on leading and serving right where you are.', img: '/assets/timeline-skineeds.jpg' },
  { year: '2025 · JULY', label: 'The pipeline opens', title: 'UC Internship launches', body: 'Founder-led organisations host our very first cohort of interns across multiple sectors.', img: '/assets/timeline-internship.JPG' },
]

const VALUES = [
  { t: 'Leadership', b: 'We grow people who take ownership — of their work, their voice and the rooms they walk into. Leading starts long before the title does.' },
  { t: 'Mindset', b: 'Confidence, resilience and a growth-first outlook. We help young people rewrite the stories that hold them back.' },
  { t: 'Entrepreneurship', b: 'From idea to first step — we demystify building, so ambition turns into something real and structured.' },
  { t: 'Empowerment', b: 'Access to the leaders, opportunities and resources that move a life forward. Igniting one life at a time.' },
]

const TEAM = [
  { name: 'Ibukun', role: 'Head of Marketing', photo: '/assets/team-ibukun.jpg', bio: "Ibukun is the Head of Marketing at Uncovered Conversations, where she helps shape the organisation's communication and outreach through thoughtful strategy and engagement. She studied Business Management and Marketing at undergraduate level and later earned a master's degree in International Business. Alongside her work in the scientific industry, Ibukun is passionate about continuous learning and her faith — whether through developing new skills or broadening her understanding of real-life societal issues that impact society." },
  { name: 'Esther Oviawe', role: 'Community Management Team Lead', photo: '/assets/team-esther.jpg', bio: 'Esther Oviawe is the Community Management Team Lead at Uncovered Conversations, where she focuses on building and nurturing communities that foster growth, connection, and meaningful experiences. A New Media and Communications graduate, she currently works across the fashion and venture capital industries. Esther is deeply interested in people, culture, and helping individuals find clarity, solutions, and become better versions of themselves.\n\nOutside of work, she enjoys reading, travelling, discovering new places and cultures, eating good food, and spending time with family and friends. She loves engaging conversations and is naturally drawn to spaces where ideas, people, and purpose come together.' },
  { name: 'Lys', role: 'Head of Admin', photo: '/assets/team-lys.jpg', bio: 'Lys is the Head of Admin at Uncovered Conversations, where she keeps operations, logistics and the day-to-day details running smoothly so that every programme and event comes together seamlessly. She studied a degree apprenticeship in Software Engineering, gaining hands-on industry experience alongside her studies. Beyond her work in tech, Lys has a love for all things design — from web development to product design and innovation — and outside of work she is passionate about health and wellness, and living with balance and intention.' },
  { name: 'Adeoti', role: 'Head of Programmes', photo: '/assets/team-adeoti.jpg', bio: "Adeoti is a marketing and social impact professional specialising in advocacy communications, storytelling, brand strategy, and program design. A proud honours graduate of the American University of Nigeria and current Master's candidate in Media and Communications at Pan-Atlantic University, she brings cross-industry experience across law, oil and gas, banking, tech, fashion, beauty, and social impact. Her work centres on campaigns and partnerships that amplify voices, shift narratives, and foster community transformation, with a deep commitment to youth empowerment, women's empowerment, and national development." },
  { name: 'Dunke', role: 'Community Management Team', photo: '/assets/team-dunke.jpg', bio: 'Dunke is on the Community Management Team at Uncovered Conversations, where she helps foster meaningful engagement and build authentic connections within the community. A creative and purpose-driven marketing and communications enthusiast, she is passionate about branding, storytelling, and creating impactful experiences. With experience in customer relations, social media management, and creative strategy, Dunke enjoys bringing ideas to life across fashion, food, wellness and faith-centred projects.' },
  { name: 'Anne', role: 'Programmes Team', photo: '/assets/team-anne.jpg', bio: 'Anne is a Programmes Team Member at Uncovered Conversations, where she helps design and support programmes aimed at creating positive change through meaningful community engagement. With experience in events and a passion for building genuine connections, she brings warmth, faith, and intentionality into all she does. Anne loves living a life rooted in faith, amazing conversations, and authentic relationships, and lives by the mantra, "The measure of love is love without measure."' },
]

const FOUNDER = {
  name: 'Osarhieme',
  role: 'Founder + creative director',
  photo: '/assets/team-rhieme.JPG',
  quote: '"The conversations started quietly — one step outside my comfort zone. Little did I know what they\'d grow to be. And then what began as a conversation, has now transformed into a programme."',
  bio: 'Founder of Uncovered Conversations. She started UC at just 19 — building the conversations and access she wished she\'d had — what began as one workshop is now a programme, an internship pipeline, and a community igniting one life at a time. Splits her time between Lagos and London.',
}

const PILLARS = [
  { n: '01', t: 'Opportunities', b: 'Internship placements, workshops, in-person events and 1:1 mentorship across founder-led organisations.' },
  { n: '02', t: 'Resources', b: 'A curated, community-built library of books, podcasts and videos across finance, faith, career and personal development.' },
  { n: '03', t: 'Collaboration', b: "We connect young individuals to industry leaders, peers and rooms they'd otherwise have to fight to enter." },
]

const GRAM_STRIP = [
  '/assets/event-3jpg.jpg',
  '/assets/event-8.JPG',
  '/assets/event-12.jpg',
  '/assets/event-4.jpg',
  '/assets/event-14.JPG',
]

const GALLERY = [
  { src: '/assets/event-2.jpg', caption: 'Building You As You Build · Lagos' },
  { src: '/assets/event-3jpg.jpg', caption: 'Building You As You Build · Lagos' },
  { src: '/assets/event-4.jpg', caption: 'Building You As You Build · Lagos' },
  { src: '/assets/event-6.jpg', caption: 'Building You As You Build · Lagos' },
  { src: '/assets/event-7.jpg', caption: 'Building You As You Build · Lagos' },
  { src: '/assets/event-8.JPG', caption: 'Building You As You Build · Lagos' },
  { src: '/assets/event-9.JPG', caption: 'Building You As You Build · Lagos' },
  { src: '/assets/event-10.JPG', caption: 'Building You As You Build · Lagos' },
  { src: '/assets/event-11.JPG', caption: 'Building You As You Build · Lagos' },
  { src: '/assets/event-12.jpg', caption: 'Building You As You Build · Lagos' },
  { src: '/assets/event-13.JPG', caption: 'Building You As You Build · Lagos' },
  { src: '/assets/event-14.JPG', caption: 'Building You As You Build · Lagos' },
]

const PROMO_PHOTO = '/assets/homepage-video-thumbnail.jpg'

const INTERN_GALLERY = [
  { src: '/assets/ig-skineeds-video.MP4', type: 'video', slot: 0, poster: '/assets/ig-skineeds-video-poster.jpg' },
  { src: '/assets/ig-haske-video.MP4', type: 'video', slot: 1, poster: '/assets/ig-haske-video-poster.jpg' },
  { src: '/assets/ig-haske-cafe-video.MP4', type: 'video', slot: 2, poster: '/assets/ig-haske-cafe-video-poster.jpg' },
  { src: '/assets/ig-skineeds-photo.JPG', type: 'image', slot: 3 },
  { src: '/assets/internship%20gallery/ronke%20arami.MP4', type: 'video', slot: 4, poster: '/assets/internship%20gallery/ronke-arami-poster.jpg' },
]

const SPEAKERS = [
  { name: 'Bukkie', src: '/assets/speaker-bukkie.jpg' },
  { name: 'Lanerie', src: '/assets/speaker-lanerie.jpg' },
  { name: 'Moyo', src: '/assets/speaker-moyo.jpg' },
  { name: 'Ruth', src: '/assets/speaker-ruth.jpg' },
  { name: 'Temi', src: '/assets/speaker-temi.jpg' },
]

const STEPS = [
  { n: 1, t: 'Apply', lead: 'CV upload + interview screening.', points: ['UC reviews every application and matches you to a relevant organisation in your sector', 'A clear timeline for decision communication — no ghosting'] },
  { n: 2, t: 'Pre-internship training', lead: 'One intensive week to get you ready for the world of work.', points: ['LinkedIn optimisation & professional branding', 'Workplace culture & professional etiquette', 'Communication skills', 'Leadership foundations'] },
  { n: 3, t: 'The internship', lead: 'A 12-week placement inside a founder-led organisation.', points: ['Contribute to real-life projects from day one', 'Hands-on experience and genuine project ownership', 'Mentorship from your host organisation throughout'] },
  { n: 4, t: 'Ongoing support', lead: 'We stay with you the whole way through.', points: ['Fortnightly check-ins for accountability', 'Weekly workshops addressing real challenges', 'A peer support system with fellow interns', 'Mid-programme feedback & adjustment sessions'] },
]

const SPOTLIGHT = [
  { name: 'Tobi Olayiwola — Programs Intern at Kobikam Africa', short: 'Tobi', photo: '/assets/tobi.png', video: true, videoSrc: '/assets/video-tobi-testimonial.MP4' },
  { name: 'Amen Olorunnisola — Marketing Intern', short: 'Amen', photo: '/assets/Amen.png', video: true, videoSrc: '/assets/video-amen-testimonial.MP4' },
  { name: 'Dunke Majekodunmi — Marketing Intern at Haske Cafe', short: 'Dunke', photo: '/assets/dunke.png' },
  { name: 'Ronke — UC Intern', short: 'Ronke', photo: '/assets/ronke.png', video: true, videoSrc: '/assets/video-dunke-testimonial.MP4' },
  { name: 'Anne — UC Intern', short: 'Anne', photo: '/assets/anne.png', video: true, videoSrc: '/assets/video-anne-testimonial.MP4' },
]

const INTERNSHIP_PARTNERS = [
  { name: 'Haske Cafe', src: '/assets/partner-haske.jpg' },
  { name: 'Skinneeds', src: '/assets/partner-skinneeds.jpg' },
  { name: 'SBO', src: '/assets/partner-sbo.jpg' },
  { name: 'Kobikam Africa', src: '/assets/partner-kobikam.jpg' },
  { name: 'Arami', src: '/assets/partner-arami.jpg' },
]

const WHY = [
  { n: '01', t: 'Fresh perspectives & innovative ideas', b: "Interns bring new approaches to problem-solving — angles your team might not reach on its own.", feature: true },
  { n: '02', t: 'Identify future talent', b: 'Spot and grow potential future hires early, before anyone else does.' },
  { n: '03', t: 'Support capacity building', b: "Ease your team's workload and grow knowledge-sharing across your industry." },
  { n: '04', t: 'Brand visibility', b: 'Get in front of a growing community of ambitious young professionals.' },
  { n: '05', t: 'Meaningful social impact', b: 'Invest directly in the next generation of African leaders.' },
]

const OPTIONS = [
  { num: '01', t: 'Host an Internship', sub: 'Bring a vetted young professional into your organisation.', points: ['Fresh perspectives and innovative ideas', 'Support on real projects and capacity building', 'Identify potential future talent early', 'Full support from the UC team throughout'], commit: '6-week commitment · flexible extension', cta: 'Host an intern', mailto: 'https://docs.google.com/forms/d/e/1FAIpQLSfvr5B1RnkoMQBBszJfLQ6W8qoJuzi30Cnt9TTG9H8t3VBteg/viewform' },
  { num: '02', t: 'Workshop Host or Collaborator', sub: 'Share your industry expertise with the UC community.', points: ['Deliver workshops on your area of mastery', 'Build brand visibility with our audience', 'One-time or recurring collaborations', 'Topics fully customised to your strengths'], commit: 'One-time or recurring · your call', cta: 'Become a collaborator', mailto: 'mailto:admin@uncoveredconversations.com?subject=Workshop%20%26%20Collaboration%20Interest%20-%20%5BCompany%20Name%5D' },
  { num: '03', t: 'Sponsorships', sub: 'Fuel the programmes that move young lives forward.', points: ['Product — donate goods or services for events', 'Event — back conversations, workshops & launches', 'Financial — fund stipends, training & the platform', 'Recognition across all UC channels'], commit: 'Product · event · financial', cta: 'Explore sponsorship', mailto: 'mailto:admin@uncoveredconversations.com?subject=Sponsorship%20Interest%20-%20%5BCompany%20Name%5D' },
]

const PN_FOUNDERS = [
  { name: 'Demi Osunsina', src: '/assets/founder-demi.jpg' },
  { name: 'Dammy Feyide', src: '/assets/founder-dammy.jpg' },
  { name: 'Ore Lawani', src: '/assets/founder-ore.jpg' },
  { name: 'Oyinkan Olagbegi', src: '/assets/founder-oyinkan.jpg' },
  { name: 'Ijeoma Adesanya', src: '/assets/founder-ijeoma.jpg' },
]

const TESTIMONIALS = [
  { pull: 'To contribute to the growth of the intern and to know if the intern would be a great addition to our team.', body: 'Delegation of more tasks that usually would be left, to focus on priorities.', company: 'SBO', logo: '/assets/partner-sbo.jpg', feature: true },
  { pull: 'We were motivated to partake in hosting interns because we believe in developing young talent and providing practical industry exposure to students and recent graduates.', body: "Hosting an intern gave us fresh perspectives and innovative ideas, as interns often bring new approaches to problem-solving. The experience allowed us to identify potential future talent while contributing to the intern's professional growth, which aligns with our commitment to capacity building and knowledge sharing.", company: 'Arami', logo: '/assets/partner-arami.jpg' },
  { pull: "I think the opportunity to participate in UC's vision to provide experiences and opportunities to young people in Nigeria — an opportunity younger me would definitely have appreciated.", company: 'SBO', logo: '/assets/partner-sbo.jpg' },
]

const RESOURCES = [
  { id: 'v1', title: 'How To Build a Success Mindset Through the Power of Belief', category: 'Video', url: 'https://youtu.be/RbwaApBYmJk', cover: 'https://img.youtube.com/vi/RbwaApBYmJk/maxresdefault.jpg' },
  { id: 'v2', title: 'Atomic Habits — author talk', by: 'James Clear · YouTube', category: 'Video', url: 'https://youtu.be/PZ7lDrwYdZc', cover: '/assets/reosurce-3.jpeg' },
  { id: 'p1', title: 'When God Calls You to Let Go of Your Dream Job', by: 'Hearing God, Faith & Life Decisions — EP 7', category: 'Podcast', url: 'https://youtu.be/46-hLkHhdpE', cover: 'https://img.youtube.com/vi/46-hLkHhdpE/maxresdefault.jpg' },
  { id: 'p2', title: 'Voice of Change', by: 'Finding Purpose and Focus in VUCA', category: 'Podcast', url: 'https://podcasts.apple.com/gb/podcast/finding-purpose-and-focus-in-vuca-volatile-uncertain/id1227337850?i=1000709274957', cover: '/assets/resource-voiceofchange.webp' },
  { id: 'p3', title: 'The Magnify Conversations', category: 'Podcast', url: 'https://podcasts.apple.com/ng/podcast/the-magnify-conversations/id1515544903', cover: '/assets/resource-magnifyconvos.webp' },
  { id: 'p4', title: 'How I Built This', by: 'Guy Raz · NPR', category: 'Podcast', url: 'https://www.npr.org/series/490248027/how-i-built-this', cover: '/assets/reosurce-2.webp' },
  { id: 'p5', title: 'The Knowledge Project', by: 'Shane Parrish', category: 'Podcast', url: 'https://fs.blog/knowledge-project-podcast/', cover: '/assets/resource-5.jpeg' },
  { id: 'b1', title: 'Unleash Your Superpowers', by: 'Foluso Gbadamosi', category: 'Book', url: 'https://www.amazon.co.uk/Unleash-Your-Superpowers-Discover-talents-ebook/dp/B0BRGF57BS', cover: '/assets/resource-unleashyoursuperpowers.jpg' },
  { id: 'b2', title: 'Smart Women Finish Rich', by: 'David Bach', category: 'Book', url: 'https://www.amazon.co.uk/Smart-Women-Finish-Rich-Financial/dp/0767998588', cover: '/assets/reosource-4.png' },
  { id: 'b3', title: 'The Psychology of Money', by: 'Morgan Housel', category: 'Book', url: 'https://www.amazon.co.uk/Psychology-Money-Timeless-lessons-happiness/dp/0857197681', cover: '/assets/resources-1.png' },
]

// ── Builders (resolve local/remote media → Sanity assets) ────────────────────

async function buildSiteSettings() {
  return { _id: 'siteSettings', _type: 'siteSettings', ...LINKS }
}

async function buildHomePage() {
  const gramStrip = []
  for (const src of GRAM_STRIP) {
    const img = await uploadLocal(src, 'image')
    if (img) gramStrip.push({ ...img, _key: rk() })
  }
  const gallery = []
  for (const g of GALLERY) {
    const photo = await uploadLocal(g.src, 'image')
    gallery.push({ _key: rk(), _type: 'galleryPhoto', photo, caption: g.caption })
  }
  const promoPhoto = await uploadLocal(PROMO_PHOTO, 'image')
  return {
    _id: 'homePage', _type: 'homePage',
    pillars: PILLARS.map((p) => ({ ...p, _key: rk(), _type: 'pillar' })),
    gramStrip, gallery, promoPhoto,
  }
}

async function buildAboutPage() {
  const milestones = []
  for (const m of MILESTONES) {
    const image = await uploadLocal(m.img, 'image')
    milestones.push({ _key: rk(), _type: 'milestone', year: m.year, label: m.label, title: m.title, body: m.body, image })
  }
  const team = []
  for (const p of TEAM) {
    const photo = await uploadLocal(p.photo, 'image')
    team.push({ _key: rk(), _type: 'teamMember', name: p.name, role: p.role, photo, bio: p.bio })
  }
  const founderPhoto = await uploadLocal(FOUNDER.photo, 'image')
  return {
    _id: 'aboutPage', _type: 'aboutPage',
    milestones,
    values: VALUES.map((v) => ({ ...v, _key: rk(), _type: 'value' })),
    team,
    founder: { name: FOUNDER.name, role: FOUNDER.role, photo: founderPhoto, quote: FOUNDER.quote, bio: FOUNDER.bio },
  }
}

async function buildCohortPage() {
  const internGallery = []
  for (const item of INTERN_GALLERY) {
    if (item.type === 'video') {
      const video = await uploadLocal(item.src, 'file')
      const poster = await uploadLocal(item.poster, 'image')
      internGallery.push({ _key: rk(), _type: 'galleryItem', type: 'video', slot: item.slot, video, poster })
    } else {
      const image = await uploadLocal(item.src, 'image')
      internGallery.push({ _key: rk(), _type: 'galleryItem', type: 'image', slot: item.slot, image })
    }
  }
  const speakers = []
  for (const s of SPEAKERS) {
    const photo = await uploadLocal(s.src, 'image')
    speakers.push({ _key: rk(), _type: 'speaker', name: s.name, photo })
  }
  return { _id: 'cohortPage', _type: 'cohortPage', internGallery, speakers }
}

async function buildInternshipPage() {
  const spotlight = []
  for (const s of SPOTLIGHT) {
    const photo = await uploadLocal(s.photo, 'image')
    const video = s.video ? await uploadLocal(s.videoSrc, 'file') : null
    spotlight.push({ _key: rk(), _type: 'spotlightIntern', name: s.name, short: s.short, photo, hasVideo: !!s.video, video })
  }
  const partners = []
  for (const p of INTERNSHIP_PARTNERS) {
    const logo = await uploadLocal(p.src, 'image')
    partners.push({ _key: rk(), _type: 'partner', name: p.name, logo })
  }
  return {
    _id: 'internshipPage', _type: 'internshipPage',
    steps: STEPS.map((s) => ({ ...s, _key: rk(), _type: 'step' })),
    spotlight, partners,
  }
}

async function buildPartnershipsPage() {
  const founders = []
  for (const f of PN_FOUNDERS) {
    const photo = await uploadLocal(f.src, 'image')
    founders.push({ _key: rk(), _type: 'founderHeadshot', name: f.name, photo })
  }
  const testimonials = []
  for (const t of TESTIMONIALS) {
    const logo = t.logo ? await uploadLocal(t.logo, 'image') : null
    testimonials.push({ _key: rk(), _type: 'testimonial', pull: t.pull, body: t.body, company: t.company, logo, feature: !!t.feature })
  }
  return {
    _id: 'partnershipsPage', _type: 'partnershipsPage',
    why: WHY.map((w) => ({ ...w, _key: rk(), _type: 'whyItem' })),
    options: OPTIONS.map((o) => ({ ...o, _key: rk(), _type: 'option' })),
    founders, testimonials,
  }
}

async function buildResources() {
  const docs = []
  for (const r of RESOURCES) {
    const cover = await uploadImageAny(r.cover)
    docs.push({ _id: `resource-${r.id}`, _type: 'resource', title: r.title, by: r.by, category: r.category, url: r.url, cover })
  }
  return docs
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\nUncovered Conversations → Sanity content seed`)
  console.log(`Project: ${PROJECT_ID} / Dataset: ${DATASET}`)
  console.log('─'.repeat(60))

  console.log('\nSite settings…')
  await client.createOrReplace(await buildSiteSettings())

  console.log('\nHome page…')
  await client.createOrReplace(await buildHomePage())

  console.log('\nAbout page…')
  await client.createOrReplace(await buildAboutPage())

  console.log('\nCohort page…')
  await client.createOrReplace(await buildCohortPage())

  console.log('\nInternship page…')
  await client.createOrReplace(await buildInternshipPage())

  console.log('\nPartnerships page…')
  await client.createOrReplace(await buildPartnershipsPage())

  console.log('\nResources…')
  const resources = await buildResources()
  const tx = client.transaction()
  resources.forEach((doc) => tx.createOrReplace(doc))
  await tx.commit()

  console.log(`\n${'═'.repeat(60)}`)
  console.log('Done. Seeded 6 page singletons + ' + resources.length + ' resources.')
}

main().catch((err) => { console.error(err); process.exit(1) })
