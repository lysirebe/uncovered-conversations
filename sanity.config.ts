import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemas'

// ── Fill in your project ID and dataset ────────────────────────────────────
// (or copy .env.local.example → .env.local and set the env vars there)
export default defineConfig({
  name: 'uc-studio',
  title: 'Uncovered Conversations',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '',
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET   ?? 'production',

  plugins: [structureTool()],
  schema:  { types: schemaTypes },
})
