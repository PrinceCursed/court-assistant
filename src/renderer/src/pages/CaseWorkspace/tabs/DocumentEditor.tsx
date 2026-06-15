import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Case, CaseDocument, DocumentVersion, DocComment } from '../../../types'
import { useApp } from '../../../store/AppContext'
import { htmlToBBCode } from '../../../templates/documentTemplates'
import DocumentPreview from '../../../modules/preview/DocumentPreview'
import SmartFieldPopup, { SmartFieldType, detectPhType } from '../../../modules/smartfields/SmartFieldPopup'

interface Props {
  case_: Case
  document: CaseDocument
  onSave: (content: string) => Promise<void>
  onSaveWithVersions?: (content: string, versions: DocumentVersion[]) => Promise<void>
  onSaveComments?: (comments: DocComment[]) => Promise<void>
  onBack: () => void
}

type Align = 'Left' | 'Center' | 'Right'

interface SlashCmd { key: string; label: string; html: string }

/** Clickable smart-field placeholder — same markup as templates' ph() helper,
 *  so slash-inserted fields open the SmartFieldPopup just like template ones. */
function phm(key: string, type: SmartFieldType = 'text'): string {
  return `<mark class="doc-placeholder" data-ph-type="${type}" data-ph-key="${key}">[${key}]</mark>`
}

const SLASH_COMMANDS: SlashCmd[] = [
  { key: 'установил',  label: '§ УСТАНОВИЛ',  html: '<div class="doc-section">УСТАНОВИЛ:</div><p><br></p>' },
  { key: 'определил',  label: '§ ОПРЕДЕЛИЛ',  html: '<div class="doc-section">ОПРЕДЕЛИЛ:</div><p><br></p>' },
  { key: 'решил',      label: '§ РЕШИЛ',       html: '<div class="doc-section">РЕШИЛ:</div><p><br></p>' },
  { key: 'постановил', label: '§ ПОСТАНОВИЛ',  html: '<div class="doc-section">ПОСТАНОВИЛ:</div><p><br></p>' },
  { key: 'приговорил', label: '§ ПРИГОВОРИЛ',  html: '<div class="doc-section">ПРИГОВОРИЛ:</div><p><br></p>' },
  { key: 'принять',    label: '✅ Принять иск',
    html: '<div class="doc-section">ОПРЕДЕЛИЛ:</div><p>Принять исковое заявление к производству.</p><p>Обязать прокуратуру в течение 48 часов провести проверку по обстоятельствам дела.</p><p><br></p>' },
  { key: 'оставить',   label: '⏸ Оставить без движения',
    html: `<div class="doc-section">ОПРЕДЕЛИЛ:</div><p>Оставить исковое заявление без движения до ${phm('УСЛОВИЕ')}.</p><p>Предложить заявителю в течение ${phm('СРОК')} устранить нарушения: ${phm('ТРЕБУЕМЫЕ ДЕЙСТВИЯ')}.</p><p><br></p>` },
  { key: 'возврат',    label: '↩ Возвратить иск',
    html: '<div class="doc-section">ОПРЕДЕЛИЛ:</div><p>Возвратить исковое заявление заявителю.</p><p>Разъяснить, что после устранения нарушений заявитель вправе обратиться в суд повторно.</p><p><br></p>' },
  { key: 'отказать',   label: '🚫 Отказать в принятии',
    html: '<div class="doc-section">ОПРЕДЕЛИЛ:</div><p>Отказать в принятии искового заявления.</p><p>Настоящее определение вступает в силу со дня принятия и не подлежит обжалованию.</p><p><br></p>' },
  { key: 'назначить',  label: '📅 Назначить заседание',
    html: `<div class="doc-section">ОПРЕДЕЛИЛ:</div><p>Назначить судебное заседание на ${phm('ДАТА ЗАСЕДАНИЯ', 'date')} в ${phm('ВРЕМЯ', 'time')} в зале суда Капитолия.</p><p>Признать явку сторон обязательной.</p><p><br></p>` },
  { key: 'решение',    label: '⚖ Вставить решение',
    html: `<div class="doc-section">РЕШИЛ:</div><ol><li>${phm('ПУНКТ 1')}</li><li>${phm('ПУНКТ 2')}</li><li>${phm('ПУНКТ 3')}</li></ol><p>Решение вступает в законную силу с момента публикации.</p><p><br></p>` },
]

interface Bookmark { id: string; label: string }

export default function DocumentEditor({ case_: c, document: doc, onSave, onSaveWithVersions: _onSaveWithVersions, onSaveComments: _onSaveComments, onBack }: Props) {
  const { settings } = useApp()
  const onSaveWithVersions = _onSaveWithVersions || (async (html: string, _v: DocumentVersion[]) => onSave(html))
  const onSaveComments = _onSaveComments || (async (_c: DocComment[]) => {})
  const editorRef = useRef<HTMLDivElement>(null)
  const [content, setContent] = useState(doc.content)
  const [saved, setSaved] = useState(false)
  const [bbcopyDone, setBbcopyDone] = useState(false)
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [showVersions, setShowVersions] = useState(false)
  const [restoreConfirm, setRestoreConfirm] = useState<DocumentVersion | null>(null)
  const [comments, setComments] = useState<DocComment[]>(doc.comments || [])
  const [showComments, setShowComments] = useState(false)
  const [newCommentText, setNewCommentText] = useState('')
  const [pendingCommentQuote, setPendingCommentQuote] = useState('')
  const [addingComment, setAddingComment] = useState(false)
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null)

  // Slash command state
  const [slashMenu, setSlashMenu] = useState<{ x: number; y: number; filter: string } | null>(null)
  const [slashIdx, setSlashIdx] = useState(0)
  const slashStartRef = useRef<{ node: Node; offset: number } | null>(null)

  // Smart field popup state
  interface ActiveField {
    element: HTMLElement
    anchorRect: DOMRect
    phType: SmartFieldType
    phKey: string
    currentValue?: string
  }
  const [activeField, setActiveField] = useState<ActiveField | null>(null)

  // Font / color toolbar state
  const [textColor, setTextColor] = useState('#f2f0fb')
  const [hlColor, setHlColor]     = useState('transparent')
  const colorInputRef = useRef<HTMLInputElement>(null)
  const hlInputRef    = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = doc.content
      parseBookmarks()
    }
  }, [doc.id])

  // Autosave every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const html = editorRef.current?.innerHTML || ''
      if (html && html !== doc.content) onSave(html)
    }, 30000)
    return () => clearInterval(interval)
  }, [doc.content, onSave])

  // Save on unload
  useEffect(() => {
    const handler = () => {
      const html = editorRef.current?.innerHTML || ''
      if (html) onSave(html)
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [onSave])

  // Stable ref so the save-doc listener never goes stale without re-registering
  const handleSaveRef = useRef<() => void>(() => {})

  useEffect(() => {
    const handler = () => handleSaveRef.current()
    document.addEventListener('save-doc', handler)
    return () => document.removeEventListener('save-doc', handler)
  }, [])

  // Export JPEG via global event
  useEffect(() => {
    const handler = () => document.dispatchEvent(new CustomEvent('do-export-jpeg'))
    document.addEventListener('export-jpeg', handler)
    return () => document.removeEventListener('export-jpeg', handler)
  }, [])

  const parseBookmarks = useCallback(() => {
    if (!editorRef.current) return
    const sections = editorRef.current.querySelectorAll('.doc-section')
    const bm: Bookmark[] = []
    sections.forEach((el, i) => {
      const label = el.textContent?.trim() || ''
      if (label) {
        el.setAttribute('data-bookmark-id', `bm-${i}`)
        bm.push({ id: `bm-${i}`, label })
      }
    })
    setBookmarks(bm)
  }, [])

  const handleChange = useCallback(() => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML)
      parseBookmarks()
    }
  }, [parseBookmarks])

  // ── Smart field click handling ──────────────────────────────────────────────

  const handleEditorClick = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    const placeholder = target.closest('mark.doc-placeholder, span.smart-field-filled') as HTMLElement | null
    if (!placeholder) return

    // Don't prevent default — let editor focus normally; we just show popup too
    const anchorRect = placeholder.getBoundingClientRect()
    const phType = detectPhType(placeholder)
    const phKey = placeholder.getAttribute('data-ph-key')
      || placeholder.textContent?.replace(/^\[|\]$/g, '').trim()
      || ''
    const isFilled = placeholder.tagName === 'SPAN' && placeholder.classList.contains('smart-field-filled')
    const currentValue = isFilled ? (placeholder.textContent || '') : undefined

    setActiveField({ element: placeholder, anchorRect, phType, phKey, currentValue })
  }, [])

  // Count identical unfilled placeholders by phKey
  const duplicateCount = useMemo(() => {
    if (!activeField || !editorRef.current) return 1
    const { phKey } = activeField
    return Array.from(editorRef.current.querySelectorAll('mark.doc-placeholder'))
      .filter(m => m.getAttribute('data-ph-key') === phKey).length
  }, [activeField])

  const handleFieldFill = useCallback((value: string, fillAll: boolean) => {
    if (!activeField || !editorRef.current) return
    const { element, phType, phKey } = activeField

    const createFilled = (v: string): HTMLElement => {
      const span = document.createElement('span')
      span.className = 'smart-field-filled'
      span.setAttribute('data-ph-type', phType)
      span.setAttribute('data-ph-key', phKey)
      span.textContent = v
      return span
    }

    // Replace the clicked element
    element.replaceWith(createFilled(value))

    // Optionally fill all identical marks too
    if (fillAll) {
      const allMarks = Array.from(editorRef.current.querySelectorAll('mark.doc-placeholder'))
        .filter(m => m.getAttribute('data-ph-key') === phKey)
      allMarks.forEach(m => m.replaceWith(createFilled(value)))
    }

    handleChange()
    setActiveField(null)
    editorRef.current.focus()
  }, [activeField, handleChange])

  // ── Comments ─────────────────────────────────────────────────
  const startAddComment = () => {
    const sel = window.getSelection()
    if (!sel || sel.isCollapsed) {
      alert('Выделите текст для добавления комментария')
      return
    }
    const quote = sel.toString().slice(0, 120)
    setPendingCommentQuote(quote)
    setNewCommentText('')
    setAddingComment(true)
    setShowComments(true)
  }

  const confirmAddComment = async () => {
    if (!newCommentText.trim()) return
    const cid = uuidv4()
    const newComment: DocComment = {
      id: cid,
      text: newCommentText.trim(),
      quote: pendingCommentQuote,
      createdAt: new Date().toISOString(),
      resolved: false
    }
    // Wrap selected text with mark
    const sel = window.getSelection()
    if (sel && !sel.isCollapsed && editorRef.current) {
      const range = sel.getRangeAt(0)
      const mark = document.createElement('mark')
      mark.className = 'comment-mark'
      mark.setAttribute('data-cid', cid)
      mark.onclick = () => { setActiveCommentId(cid); setShowComments(true) }
      range.surroundContents(mark)
      sel.removeAllRanges()
      handleChange()
    }
    const updated = [...comments, newComment]
    setComments(updated)
    await onSaveComments(updated)
    setAddingComment(false)
    setPendingCommentQuote('')
    setNewCommentText('')
    setActiveCommentId(cid)
  }

  const resolveComment = async (cid: string) => {
    const updated = comments.map(c => c.id === cid ? { ...c, resolved: true } : c)
    setComments(updated)
    await onSaveComments(updated)
    // Remove mark highlight from editor
    if (editorRef.current) {
      const mark = editorRef.current.querySelector('[data-cid="' + cid + '"]')
      if (mark) {
        const parent = mark.parentNode
        while (mark.firstChild) parent?.insertBefore(mark.firstChild, mark)
        parent?.removeChild(mark)
      }
      handleChange()
    }
  }

  const deleteComment = async (cid: string) => {
    const updated = comments.filter(c => c.id !== cid)
    setComments(updated)
    await onSaveComments(updated)
    if (editorRef.current) {
      const mark = editorRef.current.querySelector('[data-cid="' + cid + '"]')
      if (mark) {
        const parent = mark.parentNode
        while (mark.firstChild) parent?.insertBefore(mark.firstChild, mark)
        parent?.removeChild(mark)
      }
      handleChange()
    }
  }

  const scrollToComment = (cid: string) => {
    setActiveCommentId(cid)
    const mark = editorRef.current?.querySelector('[data-cid="' + cid + '"]')
    mark?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const handleSave = async () => {
    const html = editorRef.current?.innerHTML || ''
    // Create version snapshot (keep last 20)
    const existingVersions = doc.versions || []
    const nextVersion = (existingVersions.length > 0 ? Math.max(...existingVersions.map(v => v.version)) : 0) + 1
    const newVersion: DocumentVersion = {
      version: nextVersion,
      content: doc.content,
      savedAt: new Date().toISOString()
    }
    const updatedVersions = [...existingVersions, newVersion].slice(-20)
    await onSaveWithVersions(html, updatedVersions)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }
  // Keep the stable ref up-to-date so the save-doc listener always calls
  // the latest version of handleSave (with current doc/versions in closure).
  handleSaveRef.current = handleSave

  const exec = (cmd: string, val?: string) => {
    editorRef.current?.focus()
    document.execCommand(cmd, false, val)
    handleChange()
  }

  // ── Paste: strip external inline styles/fonts to prevent font-bleed ─────────
  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault()
    const html = e.clipboardData.getData('text/html')
    const text = e.clipboardData.getData('text/plain')

    if (html) {
      const tmp = document.createElement('div')
      tmp.innerHTML = html

      // Strip all presentational attributes from every element
      const cleanEl = (el: Element) => {
        ;['style','class','id','lang','dir','color','face','size',
          'bgcolor','background','valign','align','width','height'].forEach(a => el.removeAttribute(a))
        Array.from(el.children).forEach(child => cleanEl(child as Element))
      }
      cleanEl(tmp)

      // Unwrap <font> and bare <span> elements (they carry no semantic meaning)
      tmp.querySelectorAll('font, span').forEach(el => {
        const parent = el.parentNode
        if (!parent) return
        while (el.firstChild) parent.insertBefore(el.firstChild, el)
        parent.removeChild(el)
      })

      // Remove MS-Office meta / comment nodes
      tmp.querySelectorAll('o\\:p, w\\:sdt, [class^="Mso"]').forEach(el => el.remove())

      document.execCommand('insertHTML', false, tmp.innerHTML)
    } else if (text) {
      // Plain text: preserve paragraph breaks
      const paras = text.split(/\n{2,}/)
      if (paras.length > 1) {
        const escaped = paras
          .map(p => `<p>${p.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>')}</p>`)
          .join('')
        document.execCommand('insertHTML', false, escaped)
      } else {
        document.execCommand('insertText', false, text)
      }
    }
    handleChange()
  }, [handleChange])

  // ── Font / size / color helpers ──────────────────────────────────────────────
  const applyFontFamily = useCallback((family: string) => {
    editorRef.current?.focus()
    document.execCommand('fontName', false, family)
    handleChange()
  }, [handleChange])

  const applyFontSize = useCallback((px: string) => {
    editorRef.current?.focus()
    // execCommand('fontSize') only takes 1-7; use the font-7 trick to get spans
    document.execCommand('fontSize', false, '7')
    editorRef.current?.querySelectorAll('font[size="7"]').forEach(font => {
      const span = document.createElement('span')
      span.style.fontSize = px
      const p = font.parentNode
      if (!p) return
      p.insertBefore(span, font)
      while (font.firstChild) span.appendChild(font.firstChild)
      p.removeChild(font)
    })
    handleChange()
  }, [handleChange])

  const applyTextColor = useCallback((color: string) => {
    editorRef.current?.focus()
    document.execCommand('foreColor', false, color)
    handleChange()
  }, [handleChange])

  const applyHilight = useCallback((color: string) => {
    editorRef.current?.focus()
    document.execCommand('hiliteColor', false, color)
    handleChange()
  }, [handleChange])

  const clearFormatting = useCallback(() => {
    editorRef.current?.focus()
    document.execCommand('removeFormat', false)
    handleChange()
  }, [handleChange])

  const align = (dir: Align) => exec(`justify${dir}`)

  const insertSection = (name: string) => {
    exec('insertHTML', `<div class="doc-section">${name}:</div><p><br></p>`)
  }

  const insertPageBreak = () => {
    exec('insertHTML', '<hr class="page-break"><p><br></p>')
  }

  const jumpToNextPlaceholder = () => {
    const editor = editorRef.current
    if (!editor) return
    const marks = Array.from(editor.querySelectorAll('mark.doc-placeholder'))
    if (marks.length === 0) return

    // Find current selection
    const sel = window.getSelection()
    let currentIdx = -1
    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0)
      for (let i = 0; i < marks.length; i++) {
        if (marks[i].compareDocumentPosition(range.startContainer) & Node.DOCUMENT_POSITION_FOLLOWING ||
            marks[i] === range.startContainer ||
            marks[i].contains(range.startContainer)) {
          currentIdx = i
          break
        }
      }
    }

    const nextIdx = (currentIdx + 1) % marks.length
    const target = marks[nextIdx] as HTMLElement
    target.scrollIntoView({ behavior: 'smooth', block: 'center' })

    // Select the placeholder text
    const range = document.createRange()
    range.selectNodeContents(target)
    sel?.removeAllRanges()
    sel?.addRange(range)
    editor.focus()
  }

  const copyBBCode = () => {
    const html = editorRef.current?.innerHTML || ''
    navigator.clipboard.writeText(htmlToBBCode(html))
    setBbcopyDone(true)
    setTimeout(() => setBbcopyDone(false), 2000)
  }

  const scrollToBookmark = (id: string) => {
    const el = editorRef.current?.querySelector(`[data-bookmark-id="${id}"]`)
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  // ── Slash commands ───────────────────────────────────────────

  const getSlashFilter = (): string | null => {
    const sel = window.getSelection()
    if (!sel || sel.rangeCount === 0) return null
    const range = sel.getRangeAt(0)
    const node = range.startContainer
    if (node.nodeType !== Node.TEXT_NODE) return null
    const text = node.textContent || ''
    const offset = range.startOffset
    const before = text.slice(0, offset)
    const slashIdx = before.lastIndexOf('/')
    if (slashIdx === -1) return null
    const afterSlash = before.slice(slashIdx + 1)
    if (afterSlash.includes(' ')) return null
    slashStartRef.current = { node, offset: slashIdx }
    return afterSlash.toLowerCase()
  }

  const applySlashCmd = (cmd: SlashCmd) => {
    if (!slashStartRef.current) return
    const { node, offset } = slashStartRef.current
    const sel = window.getSelection()
    if (!sel) return
    const range = document.createRange()
    range.setStart(node, offset)
    const curRange = sel.getRangeAt(0)
    range.setEnd(curRange.startContainer, curRange.startOffset)
    sel.removeAllRanges()
    sel.addRange(range)
    document.execCommand('delete', false)
    document.execCommand('insertHTML', false, cmd.html)
    setSlashMenu(null)
    slashStartRef.current = null
    handleChange()
  }

  const filteredCmds = slashMenu
    ? SLASH_COMMANDS.filter(c => c.key.startsWith(slashMenu.filter))
    : []

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle slash menu navigation
    if (slashMenu) {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSlashIdx(i => Math.min(i + 1, filteredCmds.length - 1))
        return
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSlashIdx(i => Math.max(i - 1, 0))
        return
      }
      if (e.key === 'Enter' || e.key === 'Tab') {
        e.preventDefault()
        if (filteredCmds[slashIdx]) applySlashCmd(filteredCmds[slashIdx])
        return
      }
      if (e.key === 'Escape') {
        setSlashMenu(null)
        return
      }
    }

    if (e.ctrlKey) {
      if (e.key === 'b') { e.preventDefault(); exec('bold') }
      if (e.key === 'i') { e.preventDefault(); exec('italic') }
      if (e.key === 'u') { e.preventDefault(); exec('underline') }
      if (e.key === 'z') { e.preventDefault(); exec('undo') }
      if (e.key === 'y') { e.preventDefault(); exec('redo') }
      if (e.key === 's' && !e.shiftKey) { e.preventDefault(); handleSave() }
      if (e.key === 'p') { e.preventDefault(); document.dispatchEvent(new CustomEvent('do-export-jpeg')) }
      if (e.key === 'C' && e.shiftKey) { e.preventDefault(); copyBBCode() }
      if (e.key === '\\') { e.preventDefault(); clearFormatting() }
    }
  }

  const handleInput = useCallback(() => {
    handleChange()

    // Detect slash command trigger
    const filter = getSlashFilter()
    if (filter !== null) {
      const sel = window.getSelection()
      if (sel && sel.rangeCount > 0) {
        const rect = sel.getRangeAt(0).getBoundingClientRect()
        setSlashMenu({ x: rect.left, y: rect.bottom + 4, filter })
        setSlashIdx(0)
      }
    } else {
      setSlashMenu(null)
    }
  }, [handleChange])

  const ToolBtn = ({ title, onClick, active, children }: {
    title: string; onClick: () => void; active?: boolean; children: React.ReactNode
  }) => (
    <button
      className={`toolbar-btn ${active ? 'active' : ''}`}
      title={title}
      onMouseDown={e => { e.preventDefault(); onClick() }}
    >
      {children}
    </button>
  )

  const Sep = () => <div className="toolbar-divider" />

  return (
    <div className="editor-layout">
      {/* Bookmarks sidebar */}
      {bookmarks.length > 0 && (
        <div className="bookmarks-sidebar">
          <div className="bookmarks-title">Разделы</div>
          {bookmarks.map(bm => (
            <button
              key={bm.id}
              className="bookmark-item"
              onClick={() => scrollToBookmark(bm.id)}
            >
              {bm.label.replace(':', '')}
            </button>
          ))}
        </div>
      )}

      {/* Editor pane */}
      <div className="editor-pane" style={{ position: 'relative' }}>
        <div className="toolbar">
          {/* ── Строка 1: шрифт, размер, цвет ── */}

          {/* Шрифт */}
          <select className="toolbar-select" style={{ width: 130, flexShrink: 0 }} defaultValue=""
            onChange={e => { if (e.target.value) { applyFontFamily(e.target.value); e.target.value = '' } }}>
            <option value="" disabled>Шрифт</option>
            <option value="Geist, -apple-system, sans-serif">Geist (стандарт)</option>
            <option value="Arial, sans-serif">Arial</option>
            <option value="'Times New Roman', serif">Times New Roman</option>
            <option value="Georgia, serif">Georgia</option>
            <option value="Verdana, sans-serif">Verdana</option>
            <option value="'Courier New', monospace">Courier New</option>
          </select>

          {/* Размер */}
          <select className="toolbar-select" style={{ width: 58, flexShrink: 0 }} defaultValue=""
            onChange={e => { if (e.target.value) { applyFontSize(e.target.value); e.target.value = '' } }}>
            <option value="" disabled>Пт</option>
            {['9','10','11','12','13','14','16','18','20','24','28','32','36','48'].map(s => (
              <option key={s} value={s + 'px'}>{s}</option>
            ))}
          </select>

          <Sep />

          {/* Цвет текста */}
          <label className="toolbar-btn toolbar-color-lbl" title="Цвет текста (выделите текст)" onMouseDown={e => e.preventDefault()}>
            <span style={{ fontWeight: 900, fontSize: 13, lineHeight: 1 }}>A</span>
            <span className="toolbar-color-bar" style={{ background: textColor }} />
            <input ref={colorInputRef} type="color" value={textColor}
              className="toolbar-hidden-input"
              onChange={e => { setTextColor(e.target.value); applyTextColor(e.target.value) }} />
          </label>

          {/* Цвет выделения */}
          <label className="toolbar-btn toolbar-color-lbl" title="Цвет выделения" onMouseDown={e => e.preventDefault()}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 10h4M7.5 1.5l3 3-5 5H3v-2.5l4.5-5.5z"/>
            </svg>
            <span className="toolbar-color-bar" style={{ background: hlColor === 'transparent' ? 'var(--line-1)' : hlColor }} />
            <input ref={hlInputRef} type="color" value={hlColor === 'transparent' ? '#fde68a' : hlColor}
              className="toolbar-hidden-input"
              onChange={e => { setHlColor(e.target.value); applyHilight(e.target.value) }} />
          </label>
          {hlColor !== 'transparent' && (
            <button className="toolbar-btn" title="Снять выделение" style={{ fontSize: 9, width: 18 }}
              onMouseDown={e => { e.preventDefault(); setHlColor('transparent'); applyHilight('inherit') }}>✕</button>
          )}

          <Sep />

          {/* Нижний / верхний индекс */}
          <ToolBtn title="Нижний индекс" onClick={() => exec('subscript')}>
            <span style={{ fontSize: 11, lineHeight: 1 }}>x<sub style={{ fontSize: 7 }}>2</sub></span>
          </ToolBtn>
          <ToolBtn title="Верхний индекс" onClick={() => exec('superscript')}>
            <span style={{ fontSize: 11, lineHeight: 1 }}>x<sup style={{ fontSize: 7 }}>2</sup></span>
          </ToolBtn>

          <Sep />

          {/* Сбросить форматирование */}
          <ToolBtn title="Сбросить форматирование (Ctrl+\\)" onClick={clearFormatting}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
              <path d="M2 3h9M4.5 3 3 10M7 3l1.5 7M1.5 10h4"/>
              <path d="M9.5 8.5l2 2M11.5 8.5l-2 2"/>
            </svg>
          </ToolBtn>

          {/* ── Разделитель строк ── */}
          <div className="toolbar-row-break" />

          {/* ── Строка 2: форматирование текста ── */}
          <ToolBtn title="Жирный (Ctrl+B)" onClick={() => exec('bold')}><b>B</b></ToolBtn>
          <ToolBtn title="Курсив (Ctrl+I)" onClick={() => exec('italic')}><i>I</i></ToolBtn>
          <ToolBtn title="Подчёркнутый (Ctrl+U)" onClick={() => exec('underline')}><u>U</u></ToolBtn>
          <ToolBtn title="Зачёркнутый" onClick={() => exec('strikeThrough')}><s>S</s></ToolBtn>

          <Sep />
          <ToolBtn title="По левому краю" onClick={() => align('Left')}>≡</ToolBtn>
          <ToolBtn title="По центру" onClick={() => align('Center')}>≡̈</ToolBtn>
          <ToolBtn title="По правому краю" onClick={() => align('Right')}>≡̄</ToolBtn>

          <Sep />
          <ToolBtn title="Список" onClick={() => exec('insertUnorderedList')}>•≡</ToolBtn>
          <ToolBtn title="Нумерованный список" onClick={() => exec('insertOrderedList')}>1≡</ToolBtn>

          <Sep />
          <ToolBtn title="Увеличить отступ" onClick={() => exec('indent')}>→</ToolBtn>
          <ToolBtn title="Уменьшить отступ" onClick={() => exec('outdent')}>←</ToolBtn>

          <Sep />
          <ToolBtn title="Цитата" onClick={() => exec('formatBlock', 'blockquote')}>❝</ToolBtn>
          <select className="toolbar-select" defaultValue=""
            onChange={e => { exec('formatBlock', e.target.value); e.target.value = '' }}>
            <option value="" disabled>Заголовок</option>
            <option value="h1">H1</option>
            <option value="h2">H2</option>
            <option value="h3">H3</option>
            <option value="p">Абзац</option>
          </select>

          <Sep />
          <ToolBtn title="Разрыв страницы" onClick={insertPageBreak}>⊟</ToolBtn>
          <ToolBtn title="Следующий плейсхолдер" onClick={jumpToNextPlaceholder}>
            <span style={{ fontSize: 11, fontFamily: 'monospace', color: '#818cf8' }}>[▶]</span>
          </ToolBtn>

          <Sep />
          {['УСТАНОВИЛ', 'ПОСТАНОВИЛ', 'ОПРЕДЕЛИЛ', 'РЕШИЛ'].map(s => (
            <button key={s} className="section-btn" onMouseDown={e => { e.preventDefault(); insertSection(s) }}>
              {s}
            </button>
          ))}

          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8, paddingRight: 4 }}>
            <button
              className={showComments ? 'toolbar-btn active' : 'toolbar-btn'}
              title="Комментарии"
              onMouseDown={e => { e.preventDefault(); setShowComments(v => !v) }}
              style={{ position: 'relative' }}
            >
              💬
              {comments.filter(c => !c.resolved).length > 0 && (
                <span style={{ position: 'absolute', top: -4, right: -4, background: 'var(--accent)', color: '#fff', fontSize: 9, borderRadius: '50%', width: 14, height: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                  {comments.filter(c => !c.resolved).length}
                </span>
              )}
            </button>
            <button className="toolbar-btn" title="Добавить комментарий к выделенному тексту"
              onMouseDown={e => { e.preventDefault(); startAddComment() }}>💬+</button>
            <div style={{ fontSize: 10, color: 'var(--text-3)' }}>/ — команды</div>
          </div>
        </div>

        <div
          ref={editorRef}
          className="editor-area"
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          onClick={handleEditorClick}
          onPaste={handlePaste}
          spellCheck={false}
        />

        {/* Slash command menu */}
        {slashMenu && filteredCmds.length > 0 && (
          <div
            className="slash-menu"
            style={{ position: 'fixed', top: slashMenu.y, left: slashMenu.x, zIndex: 600 }}
          >
            {filteredCmds.map((cmd, i) => (
              <div
                key={cmd.key}
                className={`slash-item ${i === slashIdx ? 'active' : ''}`}
                onMouseDown={e => { e.preventDefault(); applySlashCmd(cmd) }}
              >
                {cmd.label}
              </div>
            ))}
          </div>
        )}

        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px',
          borderTop: '1px solid var(--border-1)', background: 'var(--bg-elevated)',
          flexShrink: 0
        }}>
          <button className="btn btn-ghost btn-sm" onClick={onBack}>← Назад</button>
          <div style={{ flex: 1, fontSize: 11, color: 'var(--text-3)', textAlign: 'center' }}>
            {doc.title}
            <span style={{ marginLeft: 8, color: 'var(--text-3)', opacity: 0.6 }}>· автосохранение каждые 30 сек</span>
          </div>
          {(doc.versions?.length || 0) > 0 && (
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => setShowVersions(v => !v)}
              title="История версий"
            >
              🕐 {doc.versions!.length} версий
            </button>
          )}
          <button className="btn btn-secondary btn-sm" onClick={copyBBCode}>
            {bbcopyDone ? '✓ Скопировано!' : '[ ] BBCode'}
          </button>
          <button className="btn btn-primary btn-sm" onClick={handleSave}>
            {saved ? '✓ Сохранено' : '💾 Сохранить'}
          </button>
        </div>

        {/* Version history panel */}
        {showVersions && doc.versions && doc.versions.length > 0 && (
          <div style={{
            position: 'absolute', bottom: 54, right: 16, zIndex: 500,
            background: 'var(--bg-elevated)', border: '1px solid var(--border-2)',
            borderRadius: 'var(--r-lg)', padding: '12px 0',
            minWidth: 260, maxHeight: 300, overflow: 'auto',
            boxShadow: 'var(--sh-lg)'
          }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 14px 8px' }}>
              История версий
            </div>
            {[...doc.versions].reverse().map(ver => (
              <div key={ver.version} style={{ padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: 'var(--text-1)', fontWeight: 500 }}>v{ver.version}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-3)' }}>
                    {new Date(ver.savedAt).toLocaleString('ru-RU', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                <button
                  className="btn btn-ghost btn-sm"
                  style={{ fontSize: 11 }}
                  onClick={() => setRestoreConfirm(ver)}
                >
                  Восстановить
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Smart field popup */}
        {activeField && (
          <SmartFieldPopup
            anchorRect={activeField.anchorRect}
            phType={activeField.phType}
            phKey={activeField.phKey}
            currentValue={activeField.currentValue}
            case_={c}
            duplicateCount={duplicateCount}
            onFill={handleFieldFill}
            onClose={() => setActiveField(null)}
          />
        )}

        {/* Restore confirmation */}
        {restoreConfirm && (
          <div style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(0,0,0,0.7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-2)', borderRadius: 'var(--r-xl)', padding: 24, maxWidth: 360 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-1)', marginBottom: 8 }}>
                Восстановить версию v{restoreConfirm.version}?
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 20 }}>
                Текущее содержимое будет заменено. Вы можете сохранить его как новую версию сначала.
              </div>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <button className="btn btn-ghost btn-sm" onClick={() => setRestoreConfirm(null)}>Отмена</button>
                <button className="btn btn-primary btn-sm" onClick={() => {
                  if (editorRef.current) editorRef.current.innerHTML = restoreConfirm.content
                  handleChange()
                  setRestoreConfirm(null)
                  setShowVersions(false)
                }}>Восстановить</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Comments panel */}
      {showComments && (
        <div style={{
          width: 260, flexShrink: 0,
          background: 'var(--bg-surface)',
          borderLeft: '1px solid var(--border-1)',
          borderRight: '1px solid var(--border-1)',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {/* Panel header */}
          <div style={{
            padding: '10px 14px', borderBottom: '1px solid var(--border-1)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0
          }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-1)' }}>
              💬 Комментарии
              {comments.filter(c => !c.resolved).length > 0 && (
                <span style={{ marginLeft: 6, fontSize: 10, background: 'var(--accent)', color: '#fff', padding: '1px 6px', borderRadius: 'var(--r-f)' }}>
                  {comments.filter(c => !c.resolved).length}
                </span>
              )}
            </div>
            <button className="btn btn-ghost btn-icon" onClick={() => setShowComments(false)} style={{ fontSize: 12 }}>✕</button>
          </div>

          {/* Add comment form */}
          {addingComment && (
            <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--border-1)', background: 'var(--bg-elevated)', flexShrink: 0 }}>
              {pendingCommentQuote && (
                <div style={{ fontSize: 11, color: 'var(--text-3)', background: 'var(--bg-overlay)', borderLeft: '3px solid var(--accent)', padding: '4px 8px', marginBottom: 8, borderRadius: '0 4px 4px 0', fontStyle: 'italic' }}>
                  «{pendingCommentQuote}»
                </div>
              )}
              <textarea
                autoFocus
                className="textarea"
                style={{ fontSize: 12, minHeight: 64, resize: 'vertical' }}
                placeholder="Добавить комментарий..."
                value={newCommentText}
                onChange={e => setNewCommentText(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) confirmAddComment()
                  if (e.key === 'Escape') setAddingComment(false)
                }}
              />
              <div style={{ display: 'flex', gap: 6, marginTop: 6, justifyContent: 'flex-end' }}>
                <button className="btn btn-ghost btn-sm" onClick={() => setAddingComment(false)}>Отмена</button>
                <button className="btn btn-primary btn-sm" onClick={confirmAddComment}>Добавить</button>
              </div>
            </div>
          )}

          {/* Comments list */}
          <div style={{ flex: 1, overflow: 'auto', padding: '8px 0' }}>
            {comments.length === 0 ? (
              <div style={{ padding: '24px 14px', textAlign: 'center' }}>
                <div style={{ fontSize: 20, marginBottom: 6 }}>💬</div>
                <div style={{ fontSize: 12, color: 'var(--text-3)' }}>Нет комментариев</div>
                <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4 }}>Выделите текст и нажмите 💬+</div>
              </div>
            ) : (
              comments.map(cm => (
                <div
                  key={cm.id}
                  style={{
                    padding: '10px 14px', marginBottom: 2,
                    borderLeft: `3px solid ${activeCommentId === cm.id ? 'var(--accent)' : cm.resolved ? 'var(--border-1)' : 'var(--yellow)'}`,
                    opacity: cm.resolved ? 0.5 : 1,
                    cursor: 'pointer',
                    background: activeCommentId === cm.id ? 'var(--accent-dim)' : 'transparent',
                    transition: 'all 0.15s'
                  }}
                  onClick={() => scrollToComment(cm.id)}
                >
                  {cm.quote && (
                    <div style={{ fontSize: 10, color: 'var(--text-3)', fontStyle: 'italic', marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      «{cm.quote}»
                    </div>
                  )}
                  <div style={{ fontSize: 12, color: 'var(--text-1)', lineHeight: 1.5 }}>{cm.text}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 4 }}>
                    {new Date(cm.createdAt).toLocaleString('ru-RU', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
                    {cm.resolved && ' · решено'}
                  </div>
                  <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
                    {!cm.resolved && (
                      <button
                        className="btn btn-ghost btn-sm"
                        style={{ fontSize: 10 }}
                        onClick={e => { e.stopPropagation(); resolveComment(cm.id) }}
                      >✓ Решено</button>
                    )}
                    <button
                      className="btn btn-ghost btn-sm"
                      style={{ fontSize: 10, color: 'var(--red)' }}
                      onClick={e => { e.stopPropagation(); deleteComment(cm.id) }}
                    >🗑️</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Preview pane */}
      <DocumentPreview
        content={content}
        case_={c}
        settings={settings}
        docTitle={doc.title}
        docType={doc.type}
      />
    </div>
  )
}
