import { conversationSchema } from './conversation'
import { siteSettingsSchema } from './siteSettings'
import { homePageSchema } from './homePage'
import { aboutPageSchema } from './aboutPage'
import { cohortPageSchema } from './cohortPage'
import { internshipPageSchema } from './internshipPage'
import { partnershipsPageSchema } from './partnershipsPage'
import { resourceSchema } from './resource'

export const schemaTypes = [
  conversationSchema,
  siteSettingsSchema,
  homePageSchema,
  aboutPageSchema,
  cohortPageSchema,
  internshipPageSchema,
  partnershipsPageSchema,
  resourceSchema,
]

export const SINGLETON_TYPES = new Set([
  'siteSettings',
  'homePage',
  'aboutPage',
  'cohortPage',
  'internshipPage',
  'partnershipsPage',
])
