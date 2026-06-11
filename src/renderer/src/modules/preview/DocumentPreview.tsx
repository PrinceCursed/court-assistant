import React, { useRef, useCallback, useState, useEffect } from 'react'
import html2canvas from 'html2canvas'
import { Case, DocumentType, Settings } from '../../types'
import { useApp } from '../../store/AppContext'

interface Props {
  content: string
  case_: Case
  settings: Settings
  docTitle: string
  docType?: DocumentType
}

// Eagle emblem — for white document background
function EagleLogo({ src, size = 100 }: { src?: string | null; size?: number }) {
  if (src) return <img src={src} alt="Герб" style={{ width: size, height: size, objectFit: 'contain' }} />
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <ellipse cx="100" cy="115" rx="22" ry="30" fill="#2c3e6b"/>
      {/* Head */}
      <circle cx="100" cy="75" r="16" fill="#e8e0c8"/>
      {/* Beak */}
      <path d="M107 78 L116 82 L107 85 Z" fill="#c8900a"/>
      {/* Eye */}
      <circle cx="104" cy="76" r="2.5" fill="#111"/>
      {/* Left wing */}
      <path d="M100 100 C85 95 60 85 20 70 C30 75 50 90 78 105 Z" fill="#2c3e6b"/>
      <path d="M100 108 C80 105 50 98 15 88 C28 91 55 100 80 112 Z" fill="#2c3e6b"/>
      <path d="M100 116 C82 114 52 110 18 106 C32 107 58 112 82 118 Z" fill="#1a2a4a"/>
      {/* Right wing */}
      <path d="M100 100 C115 95 140 85 180 70 C170 75 150 90 122 105 Z" fill="#2c3e6b"/>
      <path d="M100 108 C120 105 150 98 185 88 C172 91 145 100 120 112 Z" fill="#2c3e6b"/>
      <path d="M100 116 C118 114 148 110 182 106 C168 107 142 112 118 118 Z" fill="#1a2a4a"/>
      {/* Shield */}
      <rect x="88" y="138" width="24" height="18" rx="2" fill="#c0392b"/>
      <rect x="88" y="138" width="6" height="18" rx="1" fill="#f0f0f0"/>
      <rect x="97" y="138" width="6" height="18" rx="1" fill="#f0f0f0"/>
      {/* Arrows left */}
      <line x1="75" y1="145" x2="88" y2="138" stroke="#888" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="70" y1="140" x2="88" y2="138" stroke="#888" strokeWidth="2" strokeLinecap="round"/>
      <line x1="72" y1="150" x2="88" y2="143" stroke="#888" strokeWidth="2" strokeLinecap="round"/>
      {/* Arrows right */}
      <line x1="125" y1="145" x2="112" y2="138" stroke="#888" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="130" y1="140" x2="112" y2="138" stroke="#888" strokeWidth="2" strokeLinecap="round"/>
      <line x1="128" y1="150" x2="112" y2="143" stroke="#888" strokeWidth="2" strokeLinecap="round"/>
      {/* Stars row */}
      {[35,55,75,95,115,135,155,175].map((x, i) => (
        <text key={i} x={x} y="58" textAnchor="middle" fontSize="10" fill="#c8900a">★</text>
      ))}
      {/* Banner */}
      <rect x="60" y="158" width="80" height="13" rx="2" fill="#c8900a"/>
      <text x="100" y="168" textAnchor="middle" fontSize="7" fontFamily="serif" fontWeight="bold" fill="#fff" letterSpacing="1">E PLURIBUS UNUM</text>
    </svg>
  )
}

function isOrderType(_type?: DocumentType): boolean {
  return false // all doc types now use the same eagle emblem
}

// ── A4 page layout constants ──────────────────────────────────────────────────
// padding: 40px top/bottom · 50px left/right
const A4_CONTENT_WIDTH  = 694   // 794 − 50 − 50
const A4_CONTENT_HEIGHT = 1043  // 1123 − 40 − 40
// Space reserved at the bottom of the LAST page only (signature + stamp block)
const SIGNATURE_RESERVED = 110  // compact signature block

// ── Preview rendering: strip editor-only token UI ────────────────────────────
/**
 * Converts all smart-field tokens to plain text before rendering in the A4
 * preview / export pipeline.
 *
 * Rules:
 *   • <span class="smart-field-filled">VALUE</span>  → "VALUE"   (plain text)
 *   • <mark class="doc-placeholder">[KEY]</mark>      → "[KEY]"   (plain text, no colour)
 *
 * The result is a clean, printable document with no UI chrome.
 * Unfilled placeholders remain visible as "[KEY]" in the document font/colour.
 */
function stripTokensForPreview(html: string): string {
  if (!html) return html

  const div = document.createElement('div')
  div.innerHTML = html

  // Filled smart fields → their value text
  div.querySelectorAll('span.smart-field-filled').forEach(span => {
    span.replaceWith(document.createTextNode(span.textContent || ''))
  })

  // Unfilled placeholders → "[KEY]" plain text
  div.querySelectorAll('mark.doc-placeholder').forEach(mark => {
    mark.replaceWith(document.createTextNode(mark.textContent || ''))
  })

  // Remove pure spacer paragraphs (<p>&nbsp;</p> and <p><br></p>)
  div.querySelectorAll('p').forEach(p => {
    const t = p.innerHTML.trim()
    if (t === '&nbsp;' || t === '<br>' || t === '' || t === ' ') {
      p.remove()
    }
  })

  return div.innerHTML
}

// ── Strip legacy signature block from saved HTML ──────────────────────────────
/**
 * Removes any <div class="doc-signature-block"> (and the empty <p> spacers
 * before it) that old documents may have embedded in their HTML.
 * The signature is now rendered by DocumentPreview itself.
 */
function stripSignatureBlock(html: string): string {
  if (!html.includes('doc-signature-block')) return html
  const div = document.createElement('div')
  div.innerHTML = html
  const sig = div.querySelector('.doc-signature-block')
  if (!sig) return html
  // Remove preceding blank spacer paras
  let prev = sig.previousElementSibling
  while (prev) {
    const text = prev.innerHTML?.trim()
    if (text === '' || text === '&nbsp;') {
      const toRemove = prev
      prev = prev.previousElementSibling
      toRemove.parentElement?.removeChild(toRemove)
    } else {
      break
    }
  }
  sig.parentElement?.removeChild(sig)
  return div.innerHTML
}

// ── Page layout engine ────────────────────────────────────────────────────────
/**
 * Splits HTML into A4 pages using synchronous DOM measurement.
 * @param firstPageReserved  px used by the logo on page 1
 * @param lastPageReserved   px reserved at the bottom of the last page for signature
 */
function paginateHtml(
  html: string,
  firstPageReserved = 0,
  lastPageReserved  = SIGNATURE_RESERVED
): string[] {
  const clean = stripSignatureBlock(html)
  if (!clean.trim()) return ['']

  const container = document.createElement('div')
  container.style.cssText = [
    'position: fixed', 'left: -9999px', 'top: 0',
    `width: ${A4_CONTENT_WIDTH}px`,
    "font-family: 'Times New Roman', Georgia, serif",
    'font-size: 13px', 'line-height: 1.35',
    'text-align: justify',
    'word-break: break-word',
    'visibility: hidden', 'pointer-events: none', 'z-index: -9999',
  ].join('; ')

  const measureStyle = document.createElement('style')
  measureStyle.textContent = `
    .a4-measure p { margin: 0; text-indent: 0; }
    .a4-measure p[style*="text-align:center"],
    .a4-measure p[style*="text-align: center"] { text-align: center; }
    .a4-measure p[style*="text-align:right"],
    .a4-measure p[style*="text-align: right"]  { text-align: right; }
    .a4-measure h1 { font-size: 13px; font-weight: 700; margin: 4px 0; text-indent: 0; text-align: center; }
    .a4-measure h2 { font-size: 13px; font-weight: 700; margin: 3px 0 2px; text-indent: 0; }
    .a4-measure h3 { font-size: 13px; font-weight: 600; margin: 3px 0 2px; text-indent: 0; }
    .a4-measure ul, .a4-measure ol { padding-left: 20px; margin: 2px 0; text-indent: 0; }
    .a4-measure li { margin: 1px 0; text-align: justify; }
    .a4-measure blockquote { margin: 3px 0; padding-left: 10px; text-indent: 0; }
    .a4-measure .doc-section {
      display: block; font-weight: 700; font-size: 13px;
      text-transform: uppercase; margin: 10px 0 5px;
      text-indent: 0; text-align: center;
    }
  `
  document.head.appendChild(measureStyle)
  container.className = 'a4-measure'
  document.body.appendChild(container)

  const temp = document.createElement('div')
  temp.innerHTML = clean

  const nodes = Array.from(temp.childNodes)

  // Two-pass: first paginate ignoring lastPageReserved,
  // then check if last page needs a re-split.
  function paginate(nodeList: ChildNode[], firstReserved: number, lastReserved: number): string[] {
    const pages: string[] = []
    let curHtml = ''
    let curH = 0
    let isFirst = true

    for (const node of nodeList) {
      const el = node as HTMLElement

      if (el.nodeName === 'HR' && el.classList?.contains('page-break')) {
        pages.push(curHtml || '<p></p>')
        curHtml = ''; curH = 0; isFirst = false
        continue
      }

      const elHtml = el.outerHTML || ''
      if (!elHtml.trim()) continue

      container.innerHTML = elHtml
      const elH = container.offsetHeight + 8

      const isEffectivelyLast = true // we'll adjust in post-processing
      const avail = A4_CONTENT_HEIGHT
        - (isFirst ? firstReserved : 0)
        // subtract lastReserved from available — but we don't know if this is
        // the last page yet, so use conservative estimate (always reserve space
        // on the last occupied segment, handled in post-processing below)

      if (curH + elH > avail && curHtml.trim()) {
        pages.push(curHtml)
        curHtml = ''; curH = 0; isFirst = false
      }

      curHtml += elHtml
      curH += elH
    }

    if (curHtml.trim()) pages.push(curHtml)
    return pages.length > 0 ? pages : ['']
  }

  // First pass: paginate with full page height (no last-page reservation yet)
  const firstPass = paginate(nodes, firstPageReserved, 0)

  // Second pass: check if last page content + signature fits.
  // If not, move the last element to a new page.
  // Re-measure last page total height:
  if (firstPass.length > 0) {
    const lastIdx = firstPass.length - 1
    container.innerHTML = firstPass[lastIdx]
    const lastH = container.offsetHeight
    const lastAvail = A4_CONTENT_HEIGHT
      - (firstPass.length === 1 ? firstPageReserved : 0)
      - lastPageReserved

    if (lastH > lastAvail && firstPass.length === 1) {
      // The single page overflows — need to split into 2 pages.
      // Re-run with proper reservation.
      const temp2 = document.createElement('div')
      temp2.innerHTML = clean
      const nodes2 = Array.from(temp2.childNodes)
      const pages2: string[] = []
      let curHtml2 = ''; let curH2 = 0; let isFirst2 = true

      for (const node of nodes2) {
        const el = node as HTMLElement
        if (el.nodeName === 'HR' && el.classList?.contains('page-break')) {
          pages2.push(curHtml2 || '<p></p>')
          curHtml2 = ''; curH2 = 0; isFirst2 = false; continue
        }
        const elHtml = el.outerHTML || ''
        if (!elHtml.trim()) continue
        container.innerHTML = elHtml
        const elH = container.offsetHeight + 8
        const avail = A4_CONTENT_HEIGHT
          - (isFirst2 ? firstPageReserved : 0)
          - lastPageReserved
        if (curH2 + elH > avail && curHtml2.trim()) {
          pages2.push(curHtml2)
          curHtml2 = ''; curH2 = 0; isFirst2 = false
        }
        curHtml2 += elHtml; curH2 += elH
      }
      if (curHtml2.trim()) pages2.push(curHtml2)

      try { document.body.removeChild(container) } catch { /**/ }
      try { document.head.removeChild(measureStyle) } catch { /**/ }
      return pages2.length > 0 ? pages2 : ['']
    }
  }

  try { document.body.removeChild(container) } catch { /**/ }
  try { document.head.removeChild(measureStyle) } catch { /**/ }
  return firstPass.length > 0 ? firstPass : ['']
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function DocumentPreview({ content, case_: c, settings, docTitle, docType }: Props) {
  const { settings: appSettings } = useApp()
  const pagesContainerRef = useRef<HTMLDivElement>(null)
  const [exporting, setExporting] = useState(false)
  const [pages, setPages] = useState<string[]>([content || ''])

  // Heraldry
  const determinationLogo = appSettings.heraldryDeterminationBase64 || null
  const orderLogo         = appSettings.heraldryOrderBase64 || null
  const heraldrySize      = appSettings.heraldrySize   ?? 130

  // Stamp position (from right / from bottom)
  const stampOffsetX = appSettings.stampOffsetX ?? 0
  const stampOffsetY = appSettings.stampOffsetY ?? 0
  const stampScale   = appSettings.stampScale   ?? 120

  // Judge signature data (from settings prop which == appSettings in practice)
  const judgeName     = `${settings.judgeFirstName} ${settings.judgeLastName}`.trim() || 'Судья'
  const judgePosition = settings.position || 'Судья Окружного суда'

  // All judges for the signature block: main + colleagues
  const allJudges = [
    { name: judgeName, position: judgePosition, stamp: appSettings.stampBase64, offsetX: stampOffsetX, offsetY: stampOffsetY, scale: stampScale },
    ...(appSettings.colleagueJudges || []).map(j => ({
      name: `${j.firstName} ${j.lastName}`.trim() || 'Судья',
      position: j.position || 'Окружной судья',
      stamp: j.stampBase64,
      offsetX: 0, offsetY: 0, scale: stampScale,
    })),
  ]

  useEffect(() => {
    const logoReserved = heraldrySize + 28
    // Extra height when colleagues wrap to a second row (>2 judges side by side)
    const sigReserved = allJudges.length <= 2
      ? SIGNATURE_RESERVED
      : SIGNATURE_RESERVED + Math.ceil((allJudges.length - 2) / 2) * 90
    const timer = setTimeout(() => {
      setPages(paginateHtml(stripTokensForPreview(content), logoReserved, sigReserved))
    }, 350)
    return () => clearTimeout(timer)
  }, [content, heraldrySize, allJudges.length])

  // JPEG export — one file per page
  const exportJpeg = useCallback(async () => {
    setExporting(true)
    try {
      const folder = await window.api.saveJpegFolder()
      if (!folder) { setExporting(false); return }

      const pageEls = pagesContainerRef.current?.querySelectorAll<HTMLElement>('.a4-page')
      if (!pageEls || pageEls.length === 0) { setExporting(false); return }

      for (let i = 0; i < pageEls.length; i++) {
        const canvas = await html2canvas(pageEls[i], {
          scale: 2, useCORS: true, backgroundColor: '#ffffff',
          logging: false, width: 794, windowWidth: 794,
          onclone: (_clonedDoc: Document, clonedEl: HTMLElement) => {
            // Force full opacity and no filters on every element inside the
            // cloned page — html2canvas inherits computed styles, so any
            // opacity / filter / mix-blend-mode that leaked in from a
            // stacking context would silently grey out text in the export.
            clonedEl.querySelectorAll<HTMLElement>('*').forEach(el => {
              el.style.opacity        = '1'
              el.style.filter         = 'none'
              el.style.mixBlendMode   = 'normal'
              el.style.backdropFilter = 'none'
              // Strip any inline color that isn't explicitly black so
              // all body text ends up solid #000 in the JPEG.
              const tag = el.tagName.toLowerCase()
              if (['p','li','span','b','strong','i','em','u','s','h1','h2','h3'].includes(tag)) {
                el.style.color              = '#000'
                el.style.webkitTextFillColor = '#000'
              }
            })
          },
        })
        const base64 = canvas.toDataURL('image/jpeg', 0.95)
        const filename = `№${c.caseNumber} стр.${i + 1}.jpg`
        await window.api.saveJpeg(folder, filename, base64)
      }
      alert(`✓ Экспортировано ${pageEls.length} стр. в:\n${folder}`)
    } catch (e) {
      alert('Ошибка: ' + String(e))
    }
    setExporting(false)
  }, [c.caseNumber])

  useEffect(() => {
    const handler = () => exportJpeg()
    document.addEventListener('do-export-jpeg', handler)
    return () => document.removeEventListener('do-export-jpeg', handler)
  }, [exportJpeg])

  // Logo element — always use the eagle emblem
  const activeLogoSrc = isOrderType(docType)
    ? (orderLogo || determinationLogo || null)
    : (determinationLogo || orderLogo || null)
  const LogoEl = <EagleLogo src={activeLogoSrc} size={heraldrySize || 130} />

  return (
    <div className="preview-pane">
      <div className="preview-toolbar">
        <span className="preview-label">Preview A4</span>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: 'var(--text-3)' }}>{pages.length} стр.</span>
          <button className="btn btn-primary btn-sm" onClick={exportJpeg} disabled={exporting}>
            {exporting ? 'Экспорт...' : '⬇ JPEG (Ctrl+P)'}
          </button>
        </div>
      </div>

      <div className="preview-scroll" ref={pagesContainerRef}>
        {pages.map((pageHtml, idx) => {
          const isFirst = idx === 0
          const isLast  = idx === pages.length - 1

          return (
            <div key={idx} className="a4-page">

              {/* Heraldry + divider — first page only */}
              {isFirst && (
                <div style={{ textAlign: 'center', marginBottom: 0 }}>
                  {LogoEl}
                  <div style={{
                    height: 1,
                    background: '#222',
                    width: '90%',
                    margin: '15px auto 20px',
                  }} />
                </div>
              )}

              {/* Document content — z-index 10 sits above the stamp layer */}
              <div className="a4-page-content" dangerouslySetInnerHTML={{ __html: pageHtml }} />

              {/* ── Signature + Stamp — last page only ──────────────────────── */}
              {isLast && (
                <div className="a4-page-stamp" style={{
                  bottom: 40,
                  left: 50,
                  right: 50,
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: allJudges.length === 1 ? 'space-between' : 'flex-start',
                  gap: 40,
                  flexWrap: 'wrap',
                }}>
                  {allJudges.map((j, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-end', gap: 12 }}>
                      <div>
                        <div style={{ fontSize: 12, color: '#000', fontFamily: "'Times New Roman', Georgia, serif", marginBottom: 5 }}>
                          {j.position}
                        </div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: '#000', marginBottom: 6 }}>
                          {j.name}
                        </div>
                        <div style={{ fontFamily: "'Dancing Script', cursive", fontSize: 36, color: '#000', lineHeight: 1.1 }}>
                          {j.name}
                        </div>
                      </div>
                      {j.stamp && (
                        <img
                          src={j.stamp}
                          alt="Печать"
                          style={{
                            width: j.scale,
                            height: j.scale,
                            objectFit: 'contain',
                            flexShrink: 0,
                            marginLeft: 8,
                            marginBottom: i === 0 ? j.offsetY : 0,
                            marginRight: i === 0 ? j.offsetX : 0,
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Page number */}
              {pages.length > 1 && (
                <div className="page-number">{idx + 1} / {pages.length}</div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
