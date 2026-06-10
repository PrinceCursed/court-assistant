// Forum lawsuit parser — extracts case fields from forum.gta5rp.com threads
// or from pasted plain text. Kept dependency-free for easy testing.

export interface ParsedCase {
  title?: string
  plaintiff?: string
  defendant?: string
  lawyer?: string
  prosecutor?: string
}

// ── Forum parser ──────────────────────────────────────────────────────────────
//
// Works in two steps:
//   1. htmlToText()  — converts XenForo thread HTML into plain text lines
//   2. parseCaseText() — extracts plaintiff / defendant / lawyer / prosecutor
//      from "label: value" lines, tolerating numbering ("1.", "1)"), long
//      labels ("Имя и фамилия истца:") and template variations.

function decodeEntities(s: string): string {
  return s
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
}

function htmlToText(html: string): string {
  // Try to isolate the first post body (XenForo: <div class="bbWrapper">…)
  // so signatures and replies don't pollute parsing. If not found, use whole page.
  let scope = html
  const bb = html.indexOf('bbWrapper')
  if (bb !== -1) {
    // First post body starts here; cut at the next message block if present
    const start = html.lastIndexOf('<', bb)
    const nextPost = html.indexOf('message-cell--main', bb + 100)
    scope = html.slice(start, nextPost === -1 ? start + 60000 : nextPost)
  }

  return decodeEntities(
    scope
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/(p|div|li|tr|h[1-6]|blockquote)>/gi, '\n')
      .replace(/<[^>]+>/g, '')
  )
}

/** Extracts the thread title from XenForo HTML (for the case title). */
function extractThreadTitle(html: string): string {
  const h1 = html.match(/<h1[^>]*class="[^"]*p-title-value[^"]*"[^>]*>([\s\S]*?)<\/h1>/i)
  if (h1) return decodeEntities(h1[1].replace(/<[^>]+>/g, '')).trim()
  const t = html.match(/<title>([\s\S]*?)<\/title>/i)
  if (t) return decodeEntities(t[1]).split('|')[0].trim()
  return ''
}

/** Labels that contain a keyword but are NOT the person's name. */
const LABEL_BLACKLIST = /паспорт|номер\s*тел|телефон|дата|адрес|почт|e-?mail|подпись|банк|счёт|счет|организаци/i

type PersonField = 'plaintiff' | 'defendant' | 'lawyer' | 'prosecutor'

const FIELD_KEYWORDS: { field: PersonField; include: RegExp }[] = [
  { field: 'plaintiff',  include: /истец|истца|истицы|заявител/i },
  { field: 'defendant',  include: /ответчик|ответчица|обвиняем/i },
  { field: 'lawyer',     include: /адвокат|представител|защитник/i },
  { field: 'prosecutor', include: /прокурор/i },
]

export function parseCaseText(text: string): ParsedCase {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean)
  const extracted: ParsedCase = {}

  for (const rawLine of lines) {
    // Strip leading numbering: "1.", "1)", "I.", "•", "-"
    const line = rawLine.replace(/^(\d+|[IVX]+)[.)]\s*/i, '').replace(/^[•\-–—]\s*/, '')

    const colon = line.search(/[:：]/)
    if (colon < 1 || colon > 80) continue

    const label = line.slice(0, colon).trim()
    const value = line.slice(colon + 1).trim().replace(/^[-—–]\s*/, '').trim()

    if (!value || value === '-' || value === '—' || value.length > 120) continue
    if (LABEL_BLACKLIST.test(label)) continue

    for (const { field, include } of FIELD_KEYWORDS) {
      if (extracted[field]) continue
      if (include.test(label)) {
        extracted[field] = value
        break
      }
    }
  }

  return extracted
}

export function parseForumHtml(html: string): ParsedCase {
  const data = parseCaseText(htmlToText(html))
  const title = extractThreadTitle(html)
  if (title) data.title = title
  return data
}

