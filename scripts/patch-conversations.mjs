/**
 * Patches existing Sanity conversation docs:
 *   1. Uploads cover images from the Wix RSS feed enclosures
 *   2. Reformats the body — strips junk, splits into paragraphs
 *
 * Usage:
 *   node --env-file=.env.local scripts/patch-conversations.mjs
 */

import { createClient }  from '@sanity/client'
import { load as $load } from 'cheerio'
import { createWriteStream } from 'fs'
import { readFile, unlink } from 'fs/promises'
import { tmpdir } from 'os'
import { join }   from 'path'
import { Readable } from 'stream'
import { finished } from 'stream/promises'

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? ''
const DATASET    = process.env.NEXT_PUBLIC_SANITY_DATASET    ?? 'production'
const API_TOKEN  = process.env.SANITY_API_TOKEN              ?? ''

const client = createClient({ projectId: PROJECT_ID, dataset: DATASET, token: API_TOKEN, apiVersion: '2024-01-01', useCdn: false })

function rk() { return Math.random().toString(36).slice(2) }

// ── Clean body text into proper Portable Text blocks ─────────────────────────
function reformatBody(rawBlocks) {
  // Extract all text from the raw blocks
  const allText = rawBlocks
    .flatMap(b => (b.children ?? []).map(c => c.text ?? ''))
    .join(' ')

  // Strip Wix page chrome at start: everything up to and including the read-time line
  const stripped = allText
    .replace(/^.*?(\d+ min read[^A-Z]*)/i, '')   // strip header up to "X min read..."
    .replace(/\d+\s*views\s*\d+\s*comments.*$/i, '') // strip footer views/likes
    .trim()

  if (!stripped) return rawBlocks

  // Split into paragraphs by double-space or speaker turns (Rhieme: / Name:)
  // Speaker pattern: word(s) followed by colon at start or after whitespace
  const paragraphs = stripped
    .split(/(?<=\S)\s{2,}(?=[A-Z])|(?<=[.!?])\s+(?=[A-Z][a-z])|(?=\n)/)
    .map(p => p.trim())
    .filter(p => p.length > 0)

  // If we only got one block (no splits found), try splitting on "Rhieme:" or "Name:"
  const blocks = paragraphs.length > 1 ? paragraphs : stripped
    .split(/(?<=\S)(?=(?:Rhieme|Demi|Faith|Ore|Joy|Kemi|Shalom|Tolu|Yemi|Lara|Tobi|Temi|Glory|Tiara|Seun|Nia|Tosin|Shade|Chiamaka|Yemisi|Dunni|Chidinma|Esther|Titilope|Christabel|Cynthia|Anu|Dekola|Delphine|Lanaire|Imade|Bukiie|Leke|Abiola|Lamide|Joyce|Mazino|Funke|Ruth|Arese|Tinu|Fego|Bimpe|Shide|Ore|Abiola|Uzoma|Toyosi|Oyinkan|Daniel|Dolapo|Tilewa|Tsemaye|Temidayo|Ijeoma|Lu|Tomi|Adaeze):\s)/g)
    .map(p => p.trim())
    .filter(p => p.length > 0)

  return blocks.map(text => ({
    _type: 'block',
    _key: rk(),
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: rk(), text, marks: [] }],
  }))
}

// ── Download image to temp file ───────────────────────────────────────────────
async function downloadToTmp(url) {
  const tmp = join(tmpdir(), `uc-img-${Date.now()}-${rk()}`)
  const res = await fetch(url, { signal: AbortSignal.timeout(20_000) })
  if (!res.ok) throw new Error(`Image fetch ${res.status}`)
  const stream = createWriteStream(tmp)
  await finished(Readable.fromWeb(res.body).pipe(stream))
  return tmp
}

async function uploadCoverImage(imageUrl) {
  if (!imageUrl) return null
  let tmpPath
  try {
    tmpPath = await downloadToTmp(imageUrl)
    const buffer = await readFile(tmpPath)
    const ext  = imageUrl.split('?')[0].split('.').pop()?.toLowerCase() ?? 'jpg'
    const mime = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg'
    const asset = await client.assets.upload('image', buffer, { filename: `cover.${ext}`, contentType: mime })
    return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
  } catch (err) {
    console.warn(`    cover upload failed: ${err.message}`)
    return null
  } finally {
    if (tmpPath) await unlink(tmpPath).catch(() => {})
  }
}

// ── Parse RSS for cover image URLs keyed by post URL slug ────────────────────
async function fetchRssCoverImages() {
  const res = await fetch('https://www.uncoveredconversations.com/blog-feed.xml')
  const xml = await res.text()
  const $ = $load(xml, { xmlMode: true })
  const map = {}
  $('item').each((_, el) => {
    const link = $(el).find('link').text().trim()
    const imgUrl = $(el).find('enclosure').attr('url')
    if (link && imgUrl) {
      const slug = link.split('/post/')[1]
      if (slug) map[slug] = imgUrl
    }
  })
  return map
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log('\nPatching conversation docs…')

  const docs = await client.fetch('*[_type == "conversation"]{_id, slug, body, coverImage}')
  console.log(`Found ${docs.length} docs`)

  // Get cover images from RSS
  console.log('Fetching RSS cover image URLs…')
  const rssImages = await fetchRssCoverImages()
  console.log(`  Got ${Object.keys(rssImages).length} image URLs from RSS`)

  let patched = 0, failed = 0

  for (const doc of docs) {
    const slug = doc.slug?.current ?? ''
    console.log(`\n${slug}`)

    const patch = client.patch(doc._id)
    let dirty = false

    // 1. Upload cover image if not already set
    if (!doc.coverImage) {
      const imgUrl = rssImages[slug]
      if (imgUrl) {
        const coverImage = await uploadCoverImage(imgUrl)
        if (coverImage) {
          patch.set({ coverImage })
          dirty = true
          console.log(`  ✓ cover image uploaded`)
        }
      } else {
        console.log(`  – no RSS cover image found`)
      }
    } else {
      console.log(`  – cover image already set`)
    }

    // 2. Reformat body if it's a single giant block
    if (doc.body?.length === 1) {
      const newBody = reformatBody(doc.body)
      if (newBody.length > 1) {
        patch.set({ body: newBody })
        dirty = true
        console.log(`  ✓ body split into ${newBody.length} paragraphs`)
      }
    } else if (doc.body?.length > 1) {
      console.log(`  – body already has ${doc.body.length} blocks`)
    } else {
      console.log(`  – no body to reformat`)
    }

    if (dirty) {
      try {
        await patch.commit()
        patched++
      } catch (err) {
        console.error(`  ✗ patch failed: ${err.message}`)
        failed++
      }
    }
  }

  console.log(`\n${'═'.repeat(60)}`)
  console.log(`Done. Patched: ${patched}  Failed: ${failed}`)
}

main().catch(err => { console.error(err); process.exit(1) })
