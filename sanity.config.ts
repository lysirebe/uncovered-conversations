import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes, SINGLETON_TYPES } from './sanity/schemas'
import { structure } from './sanity/structure'

// ── Fill in your project ID and dataset ────────────────────────────────────
// (or copy .env.local.example → .env.local and set the env vars there)
export default defineConfig({
  name: 'uc-studio',
  title: 'Uncovered Conversations',
  basePath: '/studio',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '',
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET   ?? 'production',

  plugins: [structureTool({ structure })],
  schema:  { types: schemaTypes },

  document: {
    // Singleton page docs: no duplicate/delete, and keep them out of the
    // generic "create new" menu so there's only ever one of each.
    actions: (prev, { schemaType }) =>
      SINGLETON_TYPES.has(schemaType)
        ? prev.filter(({ action }) => action !== 'duplicate' && action !== 'delete')
        : prev,
    newDocumentOptions: (prev) =>
      prev.filter((item) => !SINGLETON_TYPES.has(item.templateId)),
  },
})
