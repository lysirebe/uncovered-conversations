/**
 * Wix → Sanity migration script (v2 — uses live sitemap URLs).
 *
 * Usage:
 *   node --env-file=.env.local scripts/import-conversations.mjs
 *
 * What it does:
 *   1. Deletes all existing conv-* docs in Sanity
 *   2. Reads correct post URLs from the Wix sitemap
 *   3. Scrapes each post with Playwright (full body + cover image)
 *   4. Uploads cover images and imports to Sanity
 */

import { createClient }  from '@sanity/client'
import { load as $load } from 'cheerio'
import { createWriteStream } from 'fs'
import { writeFile, readFile, unlink } from 'fs/promises'
import { tmpdir } from 'os'
import { join }   from 'path'
import { Readable } from 'stream'
import { finished } from 'stream/promises'

// ── CONFIG ───────────────────────────────────────────────────────────────────
const PROJECT_ID  = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'YOUR_PROJECT_ID'
const DATASET     = process.env.NEXT_PUBLIC_SANITY_DATASET    ?? 'production'
const API_TOKEN   = process.env.SANITY_API_TOKEN              ?? 'YOUR_API_TOKEN'
// ─────────────────────────────────────────────────────────────────────────────

const client = createClient({
  projectId: PROJECT_ID, dataset: DATASET, token: API_TOKEN,
  apiVersion: '2024-01-01', useCdn: false,
})

// Wix default posts to skip
const SKIP_SLUGS = new Set(['grow-your-blog-community', 'design-a-stunning-blog'])

// ── Parse episode / season from the real Wix URL slugs ───────────────────────
function parseEpisodeSeason(urlSlug) {
  // S2 variants: "s2-ep003-..." or "s-2-ep-003-..." or "s2-ep006-..."
  const s2a = urlSlug.match(/^s2-ep(\d+)/i)
  const s2b = urlSlug.match(/^s-2-ep-(\d+)/i)
  const n2  = s2a?.[1] ?? s2b?.[1]
  if (n2) return { episode: `EP.${String(parseInt(n2, 10)).padStart(3,'0')}`, season: 2 }

  // S1: "ep-001-..." or "episode-002-..."
  const s1a = urlSlug.match(/^ep-(\d+)/i)
  const s1b = urlSlug.match(/^episode-(\d+)/i)
  const n1  = s1a?.[1] ?? s1b?.[1]
  if (n1) return { episode: `EP.${String(parseInt(n1, 10)).padStart(3,'0')}`, season: 1 }

  return { episode: undefined, season: undefined }
}

// ── Extract guest name from slug ──────────────────────────────────────────────
function guestFromSlug(urlSlug) {
  // Strip episode prefix
  const stripped = urlSlug
    .replace(/^s2-ep\d+-/i, '')
    .replace(/^s-2-ep-\d+-/i, '')
    .replace(/^ep-\d+-/i, '')
    .replace(/^episode-\d+-/i, '')
    // Remove trailing -pt-1, -pt-2, -1 etc.
    .replace(/-pt-\d+$/, '')
    .replace(/-\d+$/, '')
  // Take last 2-3 words as name (guest is usually at the end after "w-")
  const afterW = stripped.match(/(?:^|-)w-(.+)$/)
  const namePart = afterW ? afterW[1] : stripped.split('-').slice(-3).join('-')
  return namePart
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

// ── Portable Text converters ─────────────────────────────────────────────────
function textToBlocks(text) {
  return text.split(/\n{2,}/).map(t => t.trim()).filter(Boolean).map(t => ({
    _type: 'block', _key: rk(), style: 'normal',
    children: [{ _type: 'span', _key: rk(), text: t }], markDefs: [],
  }))
}

function htmlToBlocks($, container) {
  const blocks = []
  $(container).children().each((_, el) => {
    const tag  = el.tagName?.toLowerCase()
    const text = $(el).text().trim()
    if (!text) return
    let style = 'normal'
    if (tag === 'h1') style = 'h1'
    else if (tag === 'h2') style = 'h2'
    else if (tag === 'h3') style = 'h3'
    else if (tag === 'blockquote') style = 'blockquote'
    const spans = []
    $(el).contents().each((_, node) => {
      if (node.type === 'text' && node.data.trim()) {
        spans.push({ _type: 'span', _key: rk(), text: node.data, marks: [] })
      } else if (node.type === 'tag') {
        const inner = $(node).text()
        if (!inner.trim()) return
        const marks = []
        const nt = node.tagName?.toLowerCase()
        if (nt === 'strong' || nt === 'b') marks.push('strong')
        if (nt === 'em'     || nt === 'i') marks.push('em')
        spans.push({ _type: 'span', _key: rk(), text: inner, marks })
      }
    })
    if (!spans.length) spans.push({ _type: 'span', _key: rk(), text, marks: [] })
    blocks.push({ _type: 'block', _key: rk(), style, children: spans, markDefs: [] })
  })
  return blocks
}

function rk() { return Math.random().toString(36).slice(2) }

// ── Download image to temp file ───────────────────────────────────────────────
async function downloadToTmp(url) {
  const tmp = join(tmpdir(), `uc-img-${Date.now()}-${rk()}`)
  const res = await fetch(url, { signal: AbortSignal.timeout(20_000) })
  if (!res.ok) throw new Error(`Image fetch ${res.status}`)
  const stream = createWriteStream(tmp)
  await finished(Readable.fromWeb(res.body).pipe(stream))
  return tmp
}

// ── Upload cover image to Sanity ──────────────────────────────────────────────
async function uploadCoverImage(imageUrl) {
  if (!imageUrl || typeof imageUrl !== 'string') return null
  let tmpPath
  try {
    tmpPath = await downloadToTmp(imageUrl)
    const buffer = await readFile(tmpPath)
    const ext = imageUrl.split('?')[0].split('.').pop()?.toLowerCase() ?? 'jpg'
    const mime = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg'
    const asset = await client.assets.upload('image', buffer, { filename: `cover.${ext}`, contentType: mime })
    return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
  } catch (err) {
    console.warn(`  cover image upload failed: ${err.message}`)
    return null
  } finally {
    if (tmpPath) await unlink(tmpPath).catch(() => {})
  }
}

// ── Scrape a post with Playwright ─────────────────────────────────────────────
async function scrapePage(url) {
  const { chromium } = await import('playwright')
  const browser = await chromium.launch()
  try {
    const page = await browser.newPage()
    await page.goto(url, { waitUntil: 'load', timeout: 45_000 })
    await page.waitForTimeout(3000)

    const data = await page.evaluate(() => {
      const bodyEl = document.querySelector('[data-hook="post-content"]')
        ?? document.querySelector('[class*="post-content"]')
        ?? document.querySelector('article')
      return {
        title:     document.title,
        ogTitle:   document.querySelector('meta[property="og:title"]')?.getAttribute('content'),
        ogDesc:    document.querySelector('meta[property="og:description"]')?.getAttribute('content'),
        ogImage:   document.querySelector('meta[property="og:image"]')?.getAttribute('content'),
        bodyHtml:  bodyEl?.innerHTML ?? '',
        bodyText:  bodyEl?.innerText ?? document.body.innerText.slice(0, 8000),
        ldJson:    Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
                       .map(s => s.textContent),
      }
    })
    return data
  } finally {
    await browser.close()
  }
}

// ── Extract structured data ───────────────────────────────────────────────────
function extractPost(scraped) {
  let title = '', excerpt = '', coverImageUrl = '', publishedDate = '', author = ''
  let body = []

  // JSON-LD
  for (const raw of scraped.ldJson ?? []) {
    try {
      const d = JSON.parse(raw)
      if (d['@type'] === 'BlogPosting' || d['@type'] === 'Article') {
        title          = d.headline     ?? title
        excerpt        = d.description  ?? excerpt
        publishedDate  = d.datePublished ?? publishedDate
        author         = d.author?.name  ?? author
        if (d.image) coverImageUrl = Array.isArray(d.image) ? d.image[0] : d.image
        if (d.articleBody && !body.length) body = textToBlocks(d.articleBody)
      }
    } catch {}
  }

  // og: fallbacks
  if (!title)        title        = scraped.ogTitle ?? scraped.title ?? ''
  if (!excerpt)      excerpt      = scraped.ogDesc ?? ''
  if (!coverImageUrl) coverImageUrl = scraped.ogImage ?? ''

  // Body from DOM
  if (!body.length && scraped.bodyHtml) {
    const $ = $load(scraped.bodyHtml)
    body = htmlToBlocks($, 'body')
  }
  if (!body.length && scraped.bodyText) {
    body = textToBlocks(scraped.bodyText)
  }

  return { title, excerpt, coverImageUrl, publishedDate, author, body }
}

// ── Parse RSS title into a clean guest name ───────────────────────────────────
function cleanTitle(raw) {
  // "S2: EP005–Evolving with the Vision w/ Imade Ogbemudia" → keep as-is but clean dashes
  return raw.replace(/\s*[–—]\s*/g, ' — ').trim()
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`\nUncovered Conversations → Sanity import (v2)`)
  console.log(`Project: ${PROJECT_ID} / Dataset: ${DATASET}`)
  console.log(`─`.repeat(60))

  // Step 1: delete old wrong docs
  console.log('\nDeleting old imports…')
  const oldIds = await client.fetch(`*[_type == "conversation"]._id`)
  if (oldIds.length) {
    const tx = client.transaction()
    oldIds.forEach(id => tx.delete(id))
    await tx.commit()
    console.log(`  Deleted ${oldIds.length} old docs`)
  } else {
    console.log('  Nothing to delete')
  }

  // Step 2: fetch sitemap for correct URLs
  console.log('\nFetching sitemap…')
  const sitemapRes = await fetch('https://www.uncoveredconversations.com/blog-posts-sitemap.xml')
  const sitemapXml = await sitemapRes.text()
  const $ = $load(sitemapXml, { xmlMode: true })
  const allUrls = $('loc').map((_, el) => $(el).text().trim()).get()
    .filter(u => u.includes('/post/'))
    .filter(u => !SKIP_SLUGS.has(u.split('/post/')[1]))
  console.log(`  Found ${allUrls.length} post URLs`)

  // Step 3: scrape and import each
  let imported = 0, failed = 0
  const errors = []

  for (const url of allUrls) {
    const urlSlug = url.split('/post/')[1]
    const docId   = `conv-${urlSlug}`
    console.log(`\n[${allUrls.indexOf(url) + 1}/${allUrls.length}] ${urlSlug}`)

    try {
      const scraped  = await scrapePage(url)
      const post     = extractPost(scraped)
      const { episode, season } = parseEpisodeSeason(urlSlug)
      const guest    = guestFromSlug(urlSlug)

      const isGeneric = ['post | uncovered convos', 'uncovered convos'].includes(
        (post.title ?? '').toLowerCase().trim()
      )
      const title  = isGeneric ? guest : cleanTitle(post.title || guest)
      const author = post.author || guest

      const coverImage = await uploadCoverImage(post.coverImageUrl)

      const doc = {
        _id:   docId,
        _type: 'conversation',
        title,
        slug:  { _type: 'slug', current: urlSlug },
        episode,
        season,
        author,
        publishedDate: post.publishedDate || undefined,
        excerpt:       post.excerpt || undefined,
        body:          post.body?.length ? post.body : undefined,
        ...(coverImage ? { coverImage } : {}),
      }

      await client.createOrReplace(doc)
      console.log(`  ✓ "${title}" (${episode ?? '—'} S${season ?? '—'})`)
      imported++
    } catch (err) {
      console.error(`  ✗ FAILED: ${err.message}`)
      errors.push({ urlSlug, error: err.message })
      failed++
    }
  }

  console.log(`\n${'═'.repeat(60)}`)
  console.log(`Done. Imported: ${imported}  Failed: ${failed}`)
  if (errors.length) {
    console.log('\nFailed:')
    errors.forEach(({ urlSlug, error }) => console.log(`  ${urlSlug}: ${error}`))
  }
}

main().catch(err => { console.error(err); process.exit(1) })
