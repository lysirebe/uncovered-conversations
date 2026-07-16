/**
 * Import a single blog post from a Google-Docs-exported Markdown file into
 * its matching Sanity `conversation` document.
 *
 * Usage:
 *   node --env-file=.env.local scripts/import-blog-md.mjs "content/blog-imports/S1 EP.030– Beginning Again w_ Bimpe Abiade (1).md"
 *
 * What it does:
 *   1. Parses the markdown (title, byline metadata, body, inline images).
 *   2. Strips the Wix page chrome (view/like counts, "Recent Posts", footer)
 *      by cutting the body off at the first heading after the title.
 *   3. Matches the post to an existing `conversation` doc by episode number
 *      (parsed from the title / filename) and season.
 *   4. Uploads inline images to Sanity, converts the rest to Portable Text,
 *      and patches the matching doc's `body` (and `coverImage` if empty).
 */

import { createClient } from '@sanity/client'
import { remark } from 'remark'
import { readFile } from 'fs/promises'

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
const API_TOKEN = process.env.SANITY_API_TOKEN

if (!PROJECT_ID || !API_TOKEN) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN — run with --env-file=.env.local')
  process.exit(1)
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  token: API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const args = process.argv.slice(2).filter((a) => !a.startsWith('--doc='))
const docOverride = process.argv.slice(2).find((a) => a.startsWith('--doc='))?.slice('--doc='.length)
const filePath = args[0]
if (!filePath) {
  console.error('Usage: node scripts/import-blog-md.mjs <path-to-md-file> [--doc=<sanity-doc-id>]')
  process.exit(1)
}

const rk = () => Math.random().toString(36).slice(2)

// ── Episode / season parsing ────────────────────────────────────────────────
function parseEpisodeSeason(str) {
  // Matches "S2", "S.2", "S 2", "Season 2" etc. as long as it precedes an EP marker,
  // without also matching "S1" or incidental digits elsewhere in the filename/title.
  const s2 = str.match(/\bS(?:eason)?\.?\s*2(?!\d).*?EP\.?\s*0*(\d+)/i)
  if (s2) return { episode: `EP.${s2[1].padStart(3, '0')}`, season: 2 }
  const ep = str.match(/EP\.?\s*0*(\d+)/i)
  if (ep) return { episode: `EP.${ep[1].padStart(3, '0')}`, season: 1 }
  return { episode: undefined, season: undefined }
}

// ── Inline node → Portable Text spans/markDefs ──────────────────────────────
function inlineToSpans(nodes, markDefs) {
  const spans = []
  for (const node of nodes ?? []) {
    switch (node.type) {
      case 'text':
        spans.push({ _type: 'span', _key: rk(), text: node.value, marks: [] })
        break
      case 'strong':
      case 'emphasis': {
        const mark = node.type === 'strong' ? 'strong' : 'em'
        for (const s of inlineToSpans(node.children, markDefs)) {
          spans.push({ ...s, marks: [...s.marks, mark] })
        }
        break
      }
      case 'link': {
        const key = rk()
        markDefs.push({ _type: 'link', _key: key, href: node.url })
        for (const s of inlineToSpans(node.children, markDefs)) {
          spans.push({ ...s, marks: [...s.marks, key] })
        }
        break
      }
      case 'inlineCode':
        spans.push({ _type: 'span', _key: rk(), text: node.value, marks: [] })
        break
      default:
        break
    }
  }
  return spans
}

// Split a paragraph's children on hard breaks into separate span-groups
// (each becomes its own block, mirroring how a real paragraph break reads).
function splitOnBreaks(children) {
  const groups = [[]]
  for (const node of children ?? []) {
    if (node.type === 'break') groups.push([])
    else groups[groups.length - 1].push(node)
  }
  return groups.filter((g) => g.length > 0)
}

// Wix page-chrome fragments (view/comment/like counters) that sometimes ride
// along in the same paragraph as real content, joined by a <br> not a blank line.
const JUNK_LINE = /^\d+\s*views?$|^\d+\s*comments?$|^\d+\s*likes?\b.*$|^\d+$|^see all$/i

function paragraphToBlocks(node, style = 'normal') {
  const groups = splitOnBreaks(node.children)
  const blocks = []
  for (const group of groups) {
    const markDefs = []
    const children = inlineToSpans(group, markDefs)
    if (!children.length) continue
    const text = children.map((s) => s.text).join('').trim()
    if (JUNK_LINE.test(text)) continue
    blocks.push({ _type: 'block', _key: rk(), style, markDefs, children })
  }
  return blocks
}

// ── Image handling ──────────────────────────────────────────────────────────
async function uploadDataUriImage(dataUri, filename) {
  const m = dataUri.match(/^data:(image\/\w+);base64,(.+)$/s)
  if (!m) return null
  const [, mime, b64] = m
  const buffer = Buffer.from(b64, 'base64')
  const ext = mime.split('/')[1] ?? 'png'
  const asset = await client.assets.upload('image', buffer, { filename: `${filename}.${ext}`, contentType: mime })
  return { _type: 'image', _key: rk(), asset: { _type: 'reference', _ref: asset._id } }
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const raw = await readFile(filePath, 'utf8')
  const tree = remark().parse(raw)
  const top = tree.children

  const definitions = new Map(top.filter((n) => n.type === 'definition').map((d) => [d.identifier, d.url]))

  const textOf = (node) => {
    if (node.type === 'text') return node.value ?? ''
    if (node.children) return node.children.map(textOf).join('')
    return ''
  }
  const isEmptyNode = (node) => textOf(node).trim() === ''

  // Google Docs exports vary: sometimes a real "# Title" heading, sometimes the title is
  // just the first item of the byline list (no Heading-1 style applied), and sometimes
  // there's a stray empty leading bullet before either. Handle all three.
  let headerIdx = 0
  while (top[headerIdx] && isEmptyNode(top[headerIdx])) headerIdx++

  let titleText
  let bodyStartIdx
  if (top[headerIdx]?.type === 'heading') {
    titleText = textOf(top[headerIdx])
    bodyStartIdx = headerIdx + 1
    if (top[bodyStartIdx]?.type === 'list') bodyStartIdx++
  } else if (top[headerIdx]?.type === 'list') {
    titleText = textOf(top[headerIdx].children[0])
    bodyStartIdx = headerIdx + 1
  } else if (top[headerIdx]?.type === 'paragraph') {
    titleText = textOf(top[headerIdx])
    bodyStartIdx = headerIdx + 1
    if (top[bodyStartIdx]?.type === 'list') bodyStartIdx++
  } else {
    console.error('Could not find a title (no heading, list, or paragraph at the top of the doc) — aborting.')
    process.exit(1)
  }
  console.log(`Title: ${titleText}`)

  const { episode, season } = parseEpisodeSeason(`${filePath} ${titleText}`)
  if (!episode) {
    console.error('Could not parse an episode number from the title or filename — aborting.')
    process.exit(1)
  }
  console.log(`Parsed: ${episode} / Season ${season}`)

  let target
  if (docOverride) {
    target = await client.fetch(`*[_id == $id][0]{_id, title, coverImage, excerpt}`, { id: docOverride })
    if (!target) {
      console.error(`--doc=${docOverride} did not match any document.`)
      process.exit(1)
    }
  } else {
    const matches = await client.fetch(
      `*[_type == "conversation" && episode == $episode && season == $season]{_id, title, coverImage, excerpt}`,
      { episode, season }
    )
    if (matches.length === 0) {
      console.error(`No existing conversation doc found for ${episode} season ${season}. Create-new flow isn't wired up yet — stopping.`)
      process.exit(1)
    }
    if (matches.length > 1) {
      console.error(`Multiple docs matched ${episode} season ${season}: ${matches.map((m) => m._id).join(', ')} — re-run with --doc=<id> to disambiguate.`)
      process.exit(1)
    }
    target = matches[0]
  }
  console.log(`Matched Sanity doc: ${target._id} ("${target.title}")`)

  const startIdx = bodyStartIdx

  // Cut off at the "Recent Posts" heading, which marks the start of Wix page chrome.
  // (Not "any heading" — some posts have legitimate mid-content headings, e.g. a
  // "This is a continuation of the previous conversation!" note on multi-part episodes.)
  let endIdx = top.length
  for (let i = startIdx; i < top.length; i++) {
    if (top[i].type === 'heading' && /^recent posts$/i.test(textOf(top[i]).trim())) {
      endIdx = i
      break
    }
  }

  const bodyNodes = top.slice(startIdx, endIdx)

  // Drop a leading paragraph that's just "Updated: <date>" on its own (blank lines around it).
  while (bodyNodes[0]?.type === 'paragraph' && /^Updated:\s*[^\s].*$/i.test(textOf(bodyNodes[0]).trim())) {
    bodyNodes.shift()
  }

  // Strip a leading "Updated: ..." + break from the first paragraph, if it's joined to real content.
  if (bodyNodes[0]?.type === 'paragraph') {
    const kids = bodyNodes[0].children
    if (kids[0]?.type === 'text' && /^Updated:/.test(kids[0].value) && kids[1]?.type === 'break') {
      bodyNodes[0] = { ...bodyNodes[0], children: kids.slice(2) }
    }
  }

  const body = []
  let coverImageBlock = null
  let imageCount = 0

  for (const node of bodyNodes) {
    if (node.type === 'paragraph') {
      // A paragraph consisting solely of an (unresolved) imageReference.
      const onlyChild = node.children.length === 1 ? node.children[0] : null
      if (onlyChild?.type === 'imageReference') {
        const dataUri = definitions.get(onlyChild.identifier)
        if (!dataUri) {
          console.warn(`  ! no definition found for image "${onlyChild.identifier}" — skipping`)
          continue
        }
        imageCount++
        if (!coverImageBlock && !target.coverImage) {
          // First inline image becomes the cover (banner), not duplicated in-body.
          coverImageBlock = await uploadDataUriImage(dataUri, `${target._id}-cover`)
          console.log(`  uploaded cover image (${onlyChild.identifier})`)
          continue
        }
        const img = await uploadDataUriImage(dataUri, `${target._id}-${onlyChild.identifier}`)
        if (img) {
          body.push(img)
          console.log(`  uploaded inline image (${onlyChild.identifier})`)
        }
        continue
      }
      body.push(...paragraphToBlocks(node))
    } else if (node.type === 'heading') {
      body.push(...paragraphToBlocks(node, `h${Math.min(node.depth, 6)}`))
    } else if (node.type === 'blockquote') {
      for (const child of node.children) {
        if (child.type === 'paragraph') body.push(...paragraphToBlocks(child, 'blockquote'))
      }
    } else if (node.type === 'list') {
      for (const item of node.children) {
        for (const child of item.children) {
          if (child.type !== 'paragraph') continue
          const blocks = paragraphToBlocks(child)
          for (const b of blocks) body.push({ ...b, listItem: node.ordered ? 'number' : 'bullet', level: 1 })
        }
      }
    }
  }

  // Wix pages repeat the excerpt as the opening line of the body — drop the duplicate.
  if (target.excerpt && body[0]?._type === 'block') {
    const firstText = body[0].children.map((c) => c.text).join('').trim()
    const excerptNorm = target.excerpt.trim()
    if (firstText && (firstText === excerptNorm || excerptNorm.startsWith(firstText.slice(0, 60)))) {
      body.shift()
      console.log('  dropped opening paragraph — duplicates the excerpt')
    }
  }

  // Style everything before the interview dialogue starts (guest bio, framing) as the italic intro.
  const isDialogueStart = (block) => {
    if (block._type !== 'block') return false
    const first = block.children[0]
    return Boolean(first?.marks?.includes('strong') && /:\s*$/.test((first.text ?? '').trim()))
  }
  const dialogueIdx = body.findIndex(isDialogueStart)
  if (dialogueIdx > 0) {
    for (let i = 0; i < dialogueIdx; i++) {
      if (body[i]._type === 'block' && body[i].style === 'normal') body[i].style = 'intro'
    }
    console.log(`  styled ${dialogueIdx} intro block(s) as italic`)
  }

  console.log(`\nBuilt ${body.length} body blocks, ${imageCount} images (${coverImageBlock ? '1 set as cover' : 'none as cover'}).`)

  // Flag likely source-doc markdown typos (unbalanced ** / * that survived parsing as literal text).
  for (const block of body) {
    if (block._type !== 'block') continue
    for (const span of block.children) {
      if (/\*\*|(?<!\w)\*(?!\*)/.test(span.text)) {
        console.warn(`  ! possible unbalanced markdown in source doc: "${span.text.slice(0, 80)}..."`)
      }
    }
  }

  const patch = client.patch(target._id).set({ body })
  if (coverImageBlock) patch.set({ coverImage: coverImageBlock })

  await patch.commit()
  console.log(`\n✓ Patched ${target._id}. View at /conversations/${target._id.replace(/^conv-/, '')}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
