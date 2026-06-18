export interface Milestone {
  year: string
  label?: string
  title: string
  body: string
  img?: string
}

export const MILESTONES: Milestone[] = [
  { year: '2021 · MAY', label: 'The first conversations', title: 'Launched our Online Interview Series', body: 'The conversations that started it all — candid interviews with founders, professionals and leaders across different industries.', img: '/assets/timeline-conversations.jpg' },
  { year: '2022 · FEB', label: 'Our first online event', title: 'The Financial Freedom Workshop', body: 'Our very first programme — a 2-day intensive on money, mindset and building wealth early. The spark that became UC.', img: '/assets/timeline-ff.jpg' },
  { year: '2022 · JUNE', label: '', title: 'Entering the World of Business', body: 'An online event demystifying how to start and structure a business — turning ambition into a real first step.', img: '/assets/timeline-enteringbusiness.jpg' },
  { year: '2022 · SEPT', label: 'Our debut in person event', title: '\'Building You As You Build\' — in person', body: 'Our first live event. Speakers, panels and a room full of young builders, all in one place.', img: '/assets/timeline-inperson.jpg' },
  { year: '2023 · AUG–SEPT', label: 'The year we focused on leadership', title: 'Six-Week Leadership Programme', body: 'Cohort-based mentorship with weekly sprints and founder-led mentors — leadership built in practice, not theory.', img: '/assets/timeline-leadership.jpg' },
  { year: '2023 · NOV', label: '', title: 'Skinneeds Community Leadership Series', body: 'We partnered with the Skinneeds community for a 3-week series on leading and serving right where you are.', img: '/assets/timeline-skineeds.jpg' },
  { year: '2025 · JULY', label: 'The pipeline opens', title: 'UC Internship launches', body: 'Founder-led organisations host our very first cohort of interns across multiple sectors.', img: '/assets/timeline-internship.JPG' },
]

export interface Value {
  t: string
  b: string
}

export const VALUES: Value[] = [
  { t: 'Leadership', b: 'We grow people who take ownership — of their work, their voice and the rooms they walk into. Leading starts long before the title does.' },
  { t: 'Mindset', b: 'Confidence, resilience and a growth-first outlook. We help young people rewrite the stories that hold them back.' },
  { t: 'Entrepreneurship', b: 'From idea to first step — we demystify building, so ambition turns into something real and structured.' },
  { t: 'Empowerment', b: 'Access to the leaders, opportunities and resources that move a life forward. Igniting one life at a time.' },
]

export interface TeamMember {
  name: string
  role: string
  photo: string
  bio: string
}

export const TEAM: TeamMember[] = [
  {
    name: 'Ibukun', role: 'Head of Marketing', photo: '/assets/team-ibukun.jpg',
    bio: "Ibukun is the Head of Marketing at Uncovered Conversations, where she helps shape the organisation's communication and outreach through thoughtful strategy and engagement. She studied Business Management and Marketing at undergraduate level and later earned a master's degree in International Business. Alongside her work in the scientific industry, Ibukun is passionate about continuous learning and her faith — whether through developing new skills or broadening her understanding of real-life societal issues that impact society.",
  },
  {
    name: 'Esther', role: 'Head of Community', photo: '/assets/team-esther.jpg',
    bio: 'Esther leads community at Uncovered Conversations, nurturing the relationships and spaces where members connect, grow and feel they truly belong.',
  },
  {
    name: 'Lys', role: 'Head of Admin', photo: '/assets/team-lys.jpg',
    bio: 'Lys keeps Uncovered Conversations running behind the scenes — coordinating operations, logistics and the day-to-day details that hold our programmes and events together so everything lands smoothly.',
  },
  {
    name: 'Adeoti', role: 'Head of Communications', photo: '/assets/team-adeoti.jpg',
    bio: 'Adeoti Osifeso is a marketing and social impact professional specialising in advocacy communications, storytelling, brand strategy, and program design. A proud honours graduate of the American University of Nigeria and current Master\'s candidate in Media and Communications at Pan-Atlantic University, she brings cross-industry experience across law, oil and gas, banking, tech, fashion, beauty, and social impact. Her work centres on campaigns and partnerships that amplify voices, shift narratives, and foster community transformation, with a deep commitment to youth empowerment, women\'s empowerment, and national development.',
  },
  {
    name: 'Dunke', role: 'Community Management Team', photo: '/assets/team-dunke.jpg',
    bio: 'Dunke Majekodunmi is on the Community Management Team at Uncovered Conversations, where she helps foster meaningful engagement and build authentic connections within the community. A creative and purpose-driven marketing and communications enthusiast, she is passionate about branding, storytelling, and creating impactful experiences. With experience in customer relations, social media management, and creative strategy, Dunke enjoys bringing ideas to life across fashion, food, wellness and faith-centred projects.',
  },
  {
    name: 'Anne', role: 'Programmes Team', photo: '/assets/team-anne.jpg',
    bio: 'Anne Ihediwa is a Programmes Team Member at Uncovered Conversations, where she helps design and support programmes aimed at creating positive change through meaningful community engagement. With experience in events and a passion for building genuine connections, she brings warmth, faith, and intentionality into all she does. Anne loves living a life rooted in faith, amazing conversations, and authentic relationships, and lives by the mantra, "The measure of love is love without measure."',
  },
]

export const FOUNDER = {
  name: 'Osarhieme',
  role: 'Founder + creative director',
  photo: '/assets/team-rhieme.JPG',
  quote: '"The conversations started quietly — one step outside my comfort zone. Little did I know what they\'d grow to be. And then what began as a conversation, has now transformed into a programme."',
  bio: 'Founder of Uncovered Conversations. She started UC at just 19 — building the conversations and access she wished she\'d had — what began as one workshop is now a programme, an internship pipeline, and a community igniting one life at a time. Splits her time between Lagos and London.',
}
