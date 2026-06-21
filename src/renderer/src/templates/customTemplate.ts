import { v4 as uuid } from 'uuid'
import { TemplateBlock } from '../types'

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/** Convert {ПЛЕЙСХОЛДЕР} / [ПЛЕЙСХОЛДЕР] tokens into clickable smart-field marks. */
export function convertPlaceholders(html: string): string {
  // {{ X }} or { X }
  html = html.replace(/\{\{?\s*([^{}]+?)\s*\}\}?/g, (_m, key: string) => {
    const k = key.trim()
    return `<mark class="doc-placeholder" data-ph-key="${k}">[${k}]</mark>`
  })
  // [X] (avoid touching marks we just inserted — those use data-ph-key, not raw brackets in text)
  html = html.replace(/\[([^[\]<>]+?)\]/g, (_m, key: string) => {
    const k = key.trim()
    return `<mark class="doc-placeholder" data-ph-key="${k}">[${k}]</mark>`
  })
  return html
}

const W = (el: Element, tag: string) => el.getElementsByTagName(tag)

/**
 * Parse word/document.xml into a list of template blocks.
 * Handles paragraphs, runs (bold/italic/underline), alignment, font size and
 * converts {…}/[…] tokens into placeholders.
 */
export function docxXmlToBlocks(xml: string): TemplateBlock[] {
  const doc = new DOMParser().parseFromString(xml, 'application/xml')
  const paras = Array.from(doc.getElementsByTagName('w:p'))
  const blocks: TemplateBlock[] = []

  for (const p of paras) {
    const pPr = W(p, 'w:pPr')[0]
    const jc = pPr ? (W(pPr, 'w:jc')[0]?.getAttribute('w:val') || '') : ''
    const align: TemplateBlock['align'] =
      jc === 'center' ? 'center' : jc === 'right' ? 'right' : jc === 'both' ? 'justify' : 'left'

    let html = ''
    let sizePt = 0
    let allBold = true
    let hadText = false

    for (const r of Array.from(W(p, 'w:r'))) {
      const rPr = W(r, 'w:rPr')[0]
      const b = !!(rPr && W(rPr, 'w:b')[0])
      const it = !!(rPr && W(rPr, 'w:i')[0])
      const u = !!(rPr && W(rPr, 'w:u')[0])
      const szVal = rPr ? W(rPr, 'w:sz')[0]?.getAttribute('w:val') : null

      let txt = Array.from(W(r, 'w:t')).map(t => t.textContent || '').join('')
      if (!txt && W(r, 'w:tab').length) txt = '    '
      if (!txt) continue

      hadText = true
      if (!b) allBold = false
      if (szVal) sizePt = Math.max(sizePt, Math.round(parseInt(szVal, 10) / 2))

      let seg = escapeHtml(txt)
      if (b) seg = `<strong>${seg}</strong>`
      if (it) seg = `<em>${seg}</em>`
      if (u) seg = `<u>${seg}</u>`
      html += seg
    }

    html = html.trim()
    if (!hadText || !html) {
      blocks.push({ id: uuid(), type: 'spacer', height: 8 })
      continue
    }

    html = convertPlaceholders(html)
    const fontSize = sizePt > 0 ? Math.min(40, Math.max(10, sizePt)) : 13
    blocks.push({ id: uuid(), type: 'text', content: html, align, fontSize })
  }

  // Collapse leading/trailing spacers
  while (blocks.length && blocks[0].type === 'spacer') blocks.shift()
  while (blocks.length && blocks[blocks.length - 1].type === 'spacer') blocks.pop()
  return blocks.length ? blocks : [{ id: uuid(), type: 'text', content: 'Пустой документ', align: 'left', fontSize: 13 }]
}

/** Render a single block to HTML (used in builder preview and document generation). */
export function blockToHtml(b: TemplateBlock): string {
  if (b.type === 'spacer') return `<p style="margin:0;height:${b.height ?? 10}px">&nbsp;</p>`
  if (b.type === 'line') return `<hr style="border:none;border-top:${b.thickness ?? 1}px solid ${b.color ?? '#222'};margin:6px 0">`
  if (b.type === 'image') {
    if (!b.src) return ''
    return `<p style="text-align:${b.align ?? 'center'};margin:6px 0"><img src="${b.src}" style="width:${b.width ?? 60}%;max-width:100%"></p>`
  }
  // text / block
  const style = [
    `text-align:${b.align ?? 'left'}`,
    b.fontSize ? `font-size:${b.fontSize}px` : '',
    b.color ? `color:${b.color}` : '',
  ].filter(Boolean).join(';')
  let inner = b.content ?? ''
  if (b.bold) inner = `<strong>${inner}</strong>`
  if (b.italic) inner = `<em>${inner}</em>`
  if (b.underline) inner = `<u>${inner}</u>`
  if (b.type === 'block') {
    const box = [
      'padding:10px 14px;border-radius:6px;margin:4px 0',
      b.bg ? `background:${b.bg}` : '',
      b.bordered ? 'border:1px solid #999' : '',
    ].filter(Boolean).join(';')
    return `<div style="${box}"><p style="${style};margin:0">${inner}</p></div>`
  }
  return `<p style="${style}">${inner}</p>`
}

/** Render the whole template (block list) to HTML. */
export function renderBlocksToHtml(blocks: TemplateBlock[]): string {
  return blocks.map(blockToHtml).join('\n')
}

/** Create a fresh block of a given type with sensible defaults. */
export function newBlock(type: TemplateBlock['type']): TemplateBlock {
  const id = uuid()
  switch (type) {
    case 'text':   return { id, type, content: 'Новый текст', align: 'left', fontSize: 13 }
    case 'block':  return { id, type, content: 'Блок текста', align: 'left', fontSize: 13, bordered: true, bg: '' }
    case 'spacer': return { id, type, height: 16 }
    case 'line':   return { id, type, thickness: 1, color: '#222' }
    case 'image':  return { id, type, src: '', width: 50, align: 'center' }
  }
}
