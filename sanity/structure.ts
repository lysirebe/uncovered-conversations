import type { StructureResolver } from 'sanity/structure'
import { SINGLETON_TYPES } from './schemas'

const PAGE_SINGLETONS: { id: string; type: string; title: string }[] = [
  { id: 'siteSettings', type: 'siteSettings', title: 'Site Settings' },
  { id: 'homePage', type: 'homePage', title: 'Home Page' },
  { id: 'aboutPage', type: 'aboutPage', title: 'About Page' },
  { id: 'cohortPage', type: 'cohortPage', title: 'Cohort Page' },
  { id: 'internshipPage', type: 'internshipPage', title: 'Internship Page' },
  { id: 'partnershipsPage', type: 'partnershipsPage', title: 'Partnerships Page' },
]

// Single fixed-id document per page, plus the normal list for everything else
// (conversation, resource) so editors can't create a second "Home Page" etc.
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      ...PAGE_SINGLETONS.map(({ id, type, title }) =>
        S.listItem()
          .title(title)
          .id(id)
          .child(S.document().schemaType(type).documentId(id))
      ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !SINGLETON_TYPES.has(item.getId() ?? '')
      ),
    ])
