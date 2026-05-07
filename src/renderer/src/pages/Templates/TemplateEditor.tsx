import React, { useEffect, useRef, useState, useCallback } from 'react'
import { DocumentType, DOCUMENT_TYPE_LABELS } from '../../types'
import { useApp } from '../../store/AppContext'
import { htmlToBBCode, getTemplatePreview } from '../../templates/documentTemplates'

interface Props {
  docType: DocumentType
  onBack: () => void
  from?: 'templates' | 'additional-templates'
}

const SECTION_BUTTONS = ['УСТАНОВИЛ', 'ПОСТАНОВИЛ', 'ОПРЕДЕЛИЛ', 'РЕШИЛ']

export default function TemplateEditor({ docType, onBack, from }: Props) {
  const { settings } = useApp()
  const editorRef = useRef<HTMLDivElement>(null)
  const [saved, setSaved] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [bbcopyDone, setBbcopyDone] = useState(false)

  const templatePath = useCallback(() => {
    return `${settings.storagePath}/templates/${docType}.html`
  }, [settings.storagePath, docType])

  // Load template content
  useEffect(() => {
    if (!settings.storagePath) return
    ;(async () => {
      const content = await window.api.readFile(templatePath())
      if (editorRef.current) {
        editorRef.current.innerHTML = content || getTemplatePreview(docType, settings)
      }
      setLoaded(true)
    })()
  }, [docType, settings.storagePath])

  const handleSave = async () => {
    if (!editorRef.current) return
    const html = editorRef.current.innerHTML
    await window.api.writeFile(templatePath(), html)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const exec = (cmd: string, val?: string) => {
    editorRef.current?.focus()
    document.execCommand(cmd, false, val)
  }

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
    const sel = window.getSelection()
    let currentIdx = -1
    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0)
      for (let i = 0; i < marks.length; i++) {
        if (marks[i].contains(range.startContainer) || marks[i] === range.startContainer) {
          currentIdx = i; break
        }
      }
    }
    const nextIdx = (currentIdx + 1) % marks.length
    const target = marks[nextIdx] as HTMLElement
    target.scrollIntoView({ behavior: 'smooth', block: 'center' })
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey) {
      if (e.key === 'b') { e.preventDefault(); exec('bold') }
      if (e.key === 'i') { e.preventDefault(); exec('italic') }
      if (e.key === 'u') { e.preventDefault(); exec('underline') }
      if (e.key === 'z') { e.preventDefault(); exec('undo') }
      if (e.key === 'y') { e.preventDefault(); exec('redo') }
      if (e.key === 's') { e.preventDefault(); handleSave() }
    }
  }

  const ToolBtn = ({ title, onClick, children }: { title: string; onClick: () => void; children: React.ReactNode }) => (
    <button className="toolbar-btn" title={title} onMouseDown={e => { e.preventDefault(); onClick() }}>
      {children}
    </button>
  )
  const Sep = () => <div className="toolbar-divider" />

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* Header */}
      <div className="page-header" style={{ flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button className="btn btn-ghost btn-sm" onClick={onBack}>
            {from === 'additional-templates' ? '← Доп. шаблоны' : '← Шаблоны'}
          </button>
          <div>
            <div className="page-title" style={{ fontSize: 15 }}>✏️ {DOCUMENT_TYPE_LABELS[docType]}</div>
            <div className="page-subtitle">Редактирование шаблона документа</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button
            className="btn btn-ghost btn-sm"
            title="Сбросить к стандартному шаблону"
            onClick={() => {
              if (!window.confirm('Сбросить шаблон к стандартному? Все ваши правки будут потеряны.')) return
              if (editorRef.current) {
                editorRef.current.innerHTML = getTemplatePreview(docType, settings)
              }
            }}
          >
            ↺ Сбросить
          </button>
          <button className="btn btn-secondary btn-sm" onClick={copyBBCode}>
            {bbcopyDone ? '✓ Скопировано!' : '[ ] BBCode'}
          </button>
          <button className="btn btn-primary btn-sm" onClick={handleSave}>
            {saved ? '✓ Сохранено' : '💾 Сохранить (Ctrl+S)'}
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="toolbar" style={{ flexShrink: 0 }}>
        <ToolBtn title="Жирный (Ctrl+B)" onClick={() => exec('bold')}><b>B</b></ToolBtn>
        <ToolBtn title="Курсив (Ctrl+I)" onClick={() => exec('italic')}><i>I</i></ToolBtn>
        <ToolBtn title="Подчёркнутый (Ctrl+U)" onClick={() => exec('underline')}><u>U</u></ToolBtn>
        <ToolBtn title="Зачёркнутый" onClick={() => exec('strikeThrough')}><s>S</s></ToolBtn>
        <Sep />
        <ToolBtn title="По левому краю" onClick={() => exec('justifyLeft')}>≡</ToolBtn>
        <ToolBtn title="По центру" onClick={() => exec('justifyCenter')}>≡̈</ToolBtn>
        <ToolBtn title="По правому краю" onClick={() => exec('justifyRight')}>≡̄</ToolBtn>
        <Sep />
        <ToolBtn title="Список" onClick={() => exec('insertUnorderedList')}>•≡</ToolBtn>
        <ToolBtn title="Нумерованный список" onClick={() => exec('insertOrderedList')}>1≡</ToolBtn>
        <Sep />
        <ToolBtn title="Увеличить отступ" onClick={() => exec('indent')}>→</ToolBtn>
        <ToolBtn title="Уменьшить отступ" onClick={() => exec('outdent')}>←</ToolBtn>
        <Sep />
        <select
          className="toolbar-select"
          defaultValue=""
          onChange={e => { exec('formatBlock', e.target.value); e.target.value = '' }}
        >
          <option value="" disabled>Заголовок</option>
          <option value="h1">H1</option>
          <option value="h2">H2</option>
          <option value="h3">H3</option>
          <option value="p">Абзац</option>
        </select>
        <Sep />
        <ToolBtn title="Разрыв страницы" onClick={insertPageBreak}>⊟</ToolBtn>
        <ToolBtn title="Следующий плейсхолдер [→]" onClick={jumpToNextPlaceholder}>
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: '#818cf8' }}>[▶]</span>
        </ToolBtn>
        <Sep />
        {SECTION_BUTTONS.map(s => (
          <button key={s} className="section-btn" onMouseDown={e => { e.preventDefault(); insertSection(s) }}>
            {s}
          </button>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--text-3)', alignSelf: 'center', paddingRight: 4 }}>
          Используйте [ПЕРЕМЕННАЯ] для автозаполнения
        </div>
      </div>

      {/* Editor */}
      <div style={{ flex: 1, overflow: 'auto', padding: '20px 40px', background: '#e8e8e8' }}>
        <div
          style={{
            maxWidth: 794, margin: '0 auto',
            background: '#ffffff',
            minHeight: 400,
            padding: '40px 50px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.25)',
            fontFamily: "'Times New Roman', Georgia, serif",
            fontSize: 13,
            lineHeight: 1.35,
            color: '#111',
          }}
        >
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            onKeyDown={handleKeyDown}
            spellCheck={false}
            style={{ outline: 'none', minHeight: 300 }}
          />
        </div>
      </div>

      {/* Helper info */}
      <div style={{
        padding: '8px 16px', borderTop: '1px solid var(--border-1)',
        background: 'var(--bg-elevated)', flexShrink: 0,
        display: 'flex', gap: 16, alignItems: 'center'
      }}>
        <div style={{ fontSize: 11, color: 'var(--text-3)' }}>
          Переменные автозаполнения:
        </div>
        {['[ИСТЕЦ]', '[ОТВЕТЧИК]', '[СУДЬЯ]', '[НОМЕР ДЕЛА]', '[ДАТА]', '[НАРУШЕНИЕ]', '[СРОК]'].map(v => (
          <button
            key={v}
            className="btn btn-ghost"
            style={{ fontSize: 10, padding: '2px 8px', color: 'var(--text-accent)', fontFamily: 'monospace' }}
            onClick={() => { editorRef.current?.focus(); document.execCommand('insertText', false, v) }}
          >
            {v}
          </button>
        ))}
      </div>
    </div>
  )
}
