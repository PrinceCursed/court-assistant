// Forum lawsuit parser — extracts case fields from forum.gta5rp.com threads
// or from pasted plain text. Kept dependency-free for easy testing.
//
// Two recognition strategies, applied in order:
//   1. Labeled lines  — "Истец: John Doe", "1. Имя и фамилия ответчика: …"
//   2. Narrative form — "От гражданина США Coby Moore", "Я, гражданин … Coby
//      Moore, … подаю исковое заявление … на сотрудника FIB c нашивкой […]"
// Strategy 2 only fills fields strategy 1 left empty.

export interface ParsedCase {
  title?: string
  plaintiff?: string
  defendant?: string
  lawyer?: string
  prosecutor?: string
}

// ── HTML → text ───────────────────────────────────────────────────────────────

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

// ── Strategy 1: labeled "key: value" lines ────────────────────────────────────

/** Labels that contain a keyword but are NOT the person's name. */
const LABEL_BLACKLIST = /паспорт|номер\s*тел|телефон|дата|адрес|почт|e-?mail|подпись|банк|счёт|счет|организаци/i

type PersonField = 'plaintiff' | 'defendant' | 'lawyer' | 'prosecutor'

const FIELD_KEYWORDS: { field: PersonField; include: RegExp }[] = [
  { field: 'plaintiff',  include: /истец|истца|истицы|заявител/i },
  { field: 'defendant',  include: /ответчик|ответчица|обвиняем/i },
  { field: 'lawyer',     include: /адвокат|представител|защитник/i },
  { field: 'prosecutor', include: /прокурор/i },
]

function parseLabeledLines(lines: string[], extracted: ParsedCase): void {
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
        extracted[field] = field === 'defendant' ? extractDefendantValue(value) : value
        break
      }
    }
  }
}

// ── Strategy 2: narrative form ────────────────────────────────────────────────

/**
 * Pulls a person name from the tail of a phrase.
 * GTA5RP names are Latin ("Coby Moore"), so Latin names are matched first;
 * a Cyrillic fallback skips geo words so "…Штатов Америки Coby Moore" or
 * "…гражданина Иванова Ивана" both resolve correctly.
 */
const GEO_WORDS = /^(США|USA|Америк\w*|Штат\w*|Соединенн\w*|Соединённ\w*|Сан|Андреас\w*|Лос|Сантос\w*|Либерти|Вайс)$/i

function extractName(phrase: string): string | undefined {
  // Latin first-last (optionally middle) at the end of the phrase
  const latin = phrase.match(/([A-Z][a-z'’-]+(?:\s+[A-Z][a-z'’-]+){1,2})\s*[,.]?\s*$/)
  if (latin) return latin[1].trim()

  // Cyrillic fallback: take trailing capitalized words, drop geo words
  const words = phrase.trim().replace(/[,.]$/, '').split(/\s+/)
  const tail: string[] = []
  for (let i = words.length - 1; i >= 0 && tail.length < 3; i--) {
    const w = words[i]
    if (!/^[А-ЯЁ][а-яё'’-]+$/.test(w) || GEO_WORDS.test(w)) break
    tail.unshift(w)
  }
  if (tail.length >= 2) return tail.join(' ')
  return undefined
}

/**
 * From a defendant phrase, extract either the badge [content] or just the name.
 * Badge takes priority: "сотрудника FIB c нашивкой [FIB|IAA|№137|K.R.]" → "[FIB|IAA|№137|K.R.]"
 * Plain civilian: "гражданина John Smith" → "John Smith"
 */
function extractDefendantValue(phrase: string): string {
  const badgeMatch = phrase.match(/\[([^\]]{2,80})\]/)
  if (badgeMatch) return `[${badgeMatch[1].trim()}]`
  const name = extractName(phrase)
  if (name) return name
  return phrase
    .replace(/^(сотрудника?|сотрудниц[аы]|гражданина?|гражданки)\s+/i, '')
    .trim()
    .slice(0, 80)
}

function parseNarrative(text: string, extracted: ParsedCase): void {
  // ── Plaintiff ──
  if (!extracted.plaintiff) {
    // "От гражданина США Coby Moore" / "От гражданки Jane Doe" / "От Coby Moore"
    const fromLine = text.match(/^\s*от\s+(.{2,90})$/im)
    if (fromLine) {
      const name = extractName(fromLine[1])
      if (name) extracted.plaintiff = name
    }
  }
  if (!extracted.plaintiff) {
    // "Я, гражданин Соединенных Штатов Америки Coby Moore, пользуясь…"
    const ya = text.match(/я\s*,?\s+граждан(?:ин|ка)[^,\n]{0,80}/i)
    if (ya) {
      const name = extractName(ya[0])
      if (name) extracted.plaintiff = name
    }
  }

  // ── Defendant ──
  if (!extracted.defendant) {
    // "подаю исковое заявление … на сотрудника FIB c нашивкой [FIB | IAA | №137 | K.R.]"
    // "иск … против Jane Smith" / "жалобу в отношении …"
    // NB: JS \w doesn't match Cyrillic — use [а-яё] explicitly.
    // The terminator allows "." only before whitespace so dots inside
    // badge tags like [K.R.] don't cut the capture short.
    const m = text.match(
      /(?:исковое\s+заявление|заявление|иск|жалоб[а-яё]*)[^\n]{0,160}?\s(?:на|против|в\s+отношении)\s+([^\n]{3,140}?)(?=\s*,\s*(?:объясня|в\s+связи|так\s+как|поскольку|прошу|указыва|прилага)|[.;](?=\s)|\s*$)/im
    )
    if (m) {
      extracted.defendant = extractDefendantValue(m[1])
    }
  }
  if (!extracted.defendant) {
    // Badge-only fallback: "сотрудника FIB c нашивкой [FIB | IAA | №137 | K.R.]"
    const badge = text.match(/сотрудни[а-яё]+\s+([A-ZА-ЯЁ]{2,10})\s*[cс]?\s*нашивк[а-яё]*\s*\[([^\]\n]{2,60})\]/i)
    if (badge) {
      extracted.defendant = `[${badge[2].trim()}]`
    }
  }

  // ── Lawyer / representative ──
  if (!extracted.lawyer) {
    const law = text.match(/(?:мо(?:й|его|им)\s+)?(?:законн[а-яё]+\s+представител[а-яё]+|адвокат[а-яё]*|защитник[а-яё]*)\s+(?:являлся\s+|является\s+|выступа[а-яё]+\s+)?([A-ZА-ЯЁ][^\n,.;]{2,60})/i)
    if (law) {
      const name = extractName(law[1]) || law[1].trim()
      // Reject if it's clearly not a name (verbs, long phrases)
      if (name && name.length <= 60 && !/\s(не|был[аи]?|будет|котор)\s/i.test(` ${name} `)) {
        extracted.lawyer = name
      }
    }
  }
}

// ── Public API ────────────────────────────────────────────────────────────────

export function parseCaseText(text: string): ParsedCase {
  const extracted: ParsedCase = {}
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean)

  // Narrative runs first — picks up in-character names ("От гражданина Coby Moore")
  // before labeled lines can grab a forum account name from "Истец: forum_nick"
  parseNarrative(text, extracted)
  parseLabeledLines(lines, extracted)

  return extracted
}

export function parseForumHtml(html: string): ParsedCase {
  const data = parseCaseText(htmlToText(html))
  const title = extractThreadTitle(html)
  if (title) data.title = title
  return data
}
