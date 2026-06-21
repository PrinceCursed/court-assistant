import React, { useEffect, useRef, useState, useCallback } from 'react'
import { v4 as uuid } from 'uuid'
import { CustomTemplate, TemplateBlock, TemplateBlockType } from '../../types'
import { loadCustomTemplate, saveCustomTemplate } from '../../storage/storage'
import { newBlock, blockToHtml } from '../../templates/customTemplate'

interface Props { templateId: string; onBack: () => void }

const PALETTE: { type: TemplateBlockType; label: string; icon: React.ReactNode }[] = [
  { type: 'block',  label: 'Блок',       icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="16" rx="2"/></svg> },
  { type: 'spacer', label: 'Отступ',     icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M8 7l4-4 4 4M8 17l4 4 4-4M3 12h18"/></svg> },
  { type: 'text',   label: 'Текст',      icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 6h16M4 12h16M4 18h10"/></svg> },
  { type: 'line',   label: 'Линия',      icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M3 12h18"/></svg> },
  { type: 'image',  label: 'Изображение', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/></svg> },
]

const COMMON_VARS = ['ЗАГОЛОВОК ДОКУМЕНТА', 'ДАТА', 'НОМЕР ДЕЛА', 'ИСТЕЦ', 'ОТВЕТЧИК', 'СУДЬЯ', 'Сумма', 'Статья']

// Inline-editable content (uncontrolled: innerHTML set once per block id, so the
// caret never jumps while typing).
function EditableContent({
  block, selected, onChange, onFocus,
}: { block: TemplateBlock; selected: boolean; onChange: (html: string) => void; onFocus: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  // Sync DOM from state only while the field is NOT focused, so typing never
  // jumps the caret, but external edits (e.g. inserting a variable) still show.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (document.activeElement !== el && el.innerHTML !== (block.content ?? '')) {
      el.innerHTML = block.content ?? ''
    }
  }, [block.id, block.content])
  return (
    <div
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      onInput={() => onChange(ref.current?.innerHTML ?? '')}
      onFocus={onFocus}
      style={{
        outline: selected ? '1px dashed rgba(0,0,0,0.25)' : 'none',
        textAlign: block.align ?? 'left',
        fontSize: block.fontSize ? block.fontSize : 13,
        color: block.color || '#000',
        fontWeight: block.bold ? 700 : 400,
        fontStyle: block.italic ? 'italic' : 'normal',
        textDecoration: block.underline ? 'underline' : 'none',
        minHeight: 18, cursor: 'text',
      }}
    />
  )
}

export default function TemplateBuilder({ templateId, onBack }: Props) {
  const [name, setName] = useState('Шаблон')
  const [blocks, setBlocks] = useState<TemplateBlock[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [createdAt, setCreatedAt] = useState<string>(new Date().toISOString())
  const [source, setSource] = useState<CustomTemplate['source']>('blank')
  const [saved, setSaved] = useState(false)
  const [preview, setPreview] = useState(false)

  useEffect(() => {
    (async () => {
      const t = await loadCustomTemplate(templateId)
      if (t) {
        setName(t.name); setBlocks(t.blocks || []); setCreatedAt(t.createdAt); setSource(t.source)
        setSelectedId(t.blocks?.[0]?.id ?? null)
      }
    })()
  }, [templateId])

  const selected = blocks.find(b => b.id === selectedId) || null

  const update = useCallback((id: string, patch: Partial<TemplateBlock>) => {
    setBlocks(prev => prev.map(b => b.id === id ? { ...b, ...patch } : b))
  }, [])

  const addBlock = (type: TemplateBlockType) => {
    const b = newBlock(type)
    setBlocks(prev => [...prev, b])
    setSelectedId(b.id)
  }

  const move = (id: string, dir: -1 | 1) => {
    setBlocks(prev => {
      const i = prev.findIndex(b => b.id === id)
      const j = i + dir
      if (i < 0 || j < 0 || j >= prev.length) return prev
      const next = [...prev]
      ;[next[i], next[j]] = [next[j], next[i]]
      return next
    })
  }

  const duplicate = (id: string) => {
    setBlocks(prev => {
      const i = prev.findIndex(b => b.id === id)
      if (i < 0) return prev
      const copy = { ...prev[i], id: uuid() }
      const next = [...prev]; next.splice(i + 1, 0, copy)
      return next
    })
  }

  const remove = (id: string) => {
    setBlocks(prev => prev.filter(b => b.id !== id))
    if (selectedId === id) setSelectedId(null)
  }

  const insertVar = (key: string) => {
    if (!selected || (selected.type !== 'text' && selected.type !== 'block')) return
    const mark = `<mark class="doc-placeholder" data-ph-key="${key}">[${key}]</mark>&nbsp;`
    // Try to insert at caret; fall back to append
    const ok = document.execCommand && document.execCommand('insertHTML', false, mark)
    if (!ok) update(selected.id, { content: (selected.content ?? '') + ' ' + mark })
  }

  const uploadImage = async (id: string) => {
    const p = await window.api.selectFile([{ name: 'Изображения', extensions: ['png', 'jpg', 'jpeg', 'webp', 'gif'] }])
    if (!p) return
    const base64 = await window.api.readBinary(p)
    if (base64) update(id, { src: base64 })
  }

  const save = async () => {
    const t: CustomTemplate = { id: templateId, name: name.trim() || 'Шаблон', blocks, createdAt, updatedAt: new Date().toISOString(), source }
    await saveCustomTemplate(t)
    setSaved(true); setTimeout(() => setSaved(false), 1800)
  }

  // ── Render a block on the canvas ────────────────────────────────────────────
  const renderBlock = (b: TemplateBlock) => {
    const isSel = b.id === selectedId
    const idx = blocks.findIndex(x => x.id === b.id)
    return (
      <div
        key={b.id}
        onClick={() => setSelectedId(b.id)}
        style={{ position: 'relative', margin: '2px 0', borderRadius: 6, outline: isSel ? '2px solid var(--ac)' : '1px solid transparent', transition: 'outline-color 0.1s' }}
      >
        {isSel && (
          <div style={{ position: 'absolute', top: -30, left: 0, zIndex: 5, display: 'flex', alignItems: 'center', gap: 2, background: 'var(--ac)', color: 'var(--ac-fg,#fff)', borderRadius: 7, padding: '3px 5px', boxShadow: 'var(--sh2)', fontSize: 11, fontWeight: 700 }}>
            <span style={{ padding: '0 6px' }}>{PALETTE.find(p => p.type === b.type)?.label}</span>
            <ToolbarBtn title="Вверх" onClick={e => { e.stopPropagation(); move(b.id, -1) }} disabled={idx === 0}>↑</ToolbarBtn>
            <ToolbarBtn title="Вниз" onClick={e => { e.stopPropagation(); move(b.id, 1) }} disabled={idx === blocks.length - 1}>↓</ToolbarBtn>
            <ToolbarBtn title="Дублировать" onClick={e => { e.stopPropagation(); duplicate(b.id) }}>⧉</ToolbarBtn>
            <ToolbarBtn title="Удалить" onClick={e => { e.stopPropagation(); remove(b.id) }}>🗑</ToolbarBtn>
          </div>
        )}
        <div style={{ padding: b.type === 'block' ? 0 : '2px 4px' }}>
          {(b.type === 'text' || b.type === 'block') && (
            b.type === 'block' ? (
              <div style={{ padding: '10px 14px', borderRadius: 6, background: b.bg || 'transparent', border: b.bordered ? '1px solid #999' : '1px solid transparent' }}>
                <EditableContent block={b} selected={isSel} onChange={html => update(b.id, { content: html })} onFocus={() => setSelectedId(b.id)} />
              </div>
            ) : (
              <EditableContent block={b} selected={isSel} onChange={html => update(b.id, { content: html })} onFocus={() => setSelectedId(b.id)} />
            )
          )}
          {b.type === 'spacer' && <div style={{ height: b.height ?? 10, background: isSel ? 'rgba(223,160,63,0.12)' : 'repeating-linear-gradient(45deg,transparent,transparent 5px,rgba(0,0,0,0.04) 5px,rgba(0,0,0,0.04) 10px)' }} />}
          {b.type === 'line' && <hr style={{ border: 'none', borderTop: `${b.thickness ?? 1}px solid ${b.color ?? '#222'}`, margin: '6px 0' }} />}
          {b.type === 'image' && (
            b.src
              ? <div style={{ textAlign: b.align ?? 'center' }}><img src={b.src} alt="" style={{ width: `${b.width ?? 50}%`, maxWidth: '100%' }} /></div>
              : <div style={{ padding: '24px', textAlign: 'center', color: '#999', border: '1px dashed #bbb', borderRadius: 6, fontSize: 12 }}>Изображение не выбрано — откройте «Параметры»</div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* Top bar */}
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', borderBottom: '1px solid var(--line-1)', background: 'var(--bg-1)' }}>
        <button className="btn btn-ghost btn-sm" onClick={onBack}>← Назад</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, justifyContent: 'center' }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--ac2)" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="m9 13 2 2 4-4"/></svg>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--t1)', fontSize: 14, fontWeight: 700, textAlign: 'center', minWidth: 200 }}
          />
        </div>
        <button className="btn btn-ghost btn-sm" onClick={() => setPreview(p => !p)}>{preview ? '✎ Конструктор' : '👁 Предпросмотр'}</button>
        <button className="btn btn-primary btn-sm" onClick={save}>{saved ? '✓ Сохранено' : '💾 Сохранить'}</button>
      </div>

      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
        {!preview && (
          /* Left: layers + components */
          <div style={{ width: 232, flexShrink: 0, borderRight: '1px solid var(--line-1)', background: 'var(--bg-1)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ flex: 1, overflowY: 'auto', padding: '12px 12px 6px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--t3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Слои</div>
              {blocks.length === 0 && <div style={{ fontSize: 11.5, color: 'var(--t4)', padding: '6px 2px' }}>Пусто. Добавьте компоненты ниже.</div>}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {blocks.map((b, i) => (
                  <button
                    key={b.id}
                    onClick={() => setSelectedId(b.id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '7px 9px', borderRadius: 7,
                      border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 12, textAlign: 'left',
                      background: b.id === selectedId ? 'var(--ac-bg)' : 'transparent',
                      color: b.id === selectedId ? 'var(--ac2)' : 'var(--t2)',
                    }}
                  >
                    <span style={{ color: 'var(--t4)', fontFamily: 'var(--fm)', fontSize: 10 }}>{i + 1}</span>
                    <span style={{ display: 'flex', opacity: 0.8 }}>{PALETTE.find(p => p.type === b.type)?.icon}</span>
                    <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {PALETTE.find(p => p.type === b.type)?.label}
                      {(b.type === 'text' || b.type === 'block') && b.content
                        ? ' · ' + b.content.replace(/<[^>]+>/g, '').slice(0, 16)
                        : ''}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <div style={{ borderTop: '1px solid var(--line-1)', padding: '12px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--t3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Компоненты</div>
              <div style={{ fontSize: 10.5, color: 'var(--t4)', marginBottom: 10 }}>Перетащите на страницу или кликните</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {PALETTE.map(p => (
                  <button
                    key={p.type}
                    draggable
                    onDragStart={e => e.dataTransfer.setData('blocktype', p.type)}
                    onClick={() => addBlock(p.type)}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 11px', borderRadius: 8, border: '1px solid var(--line-2)', background: 'var(--bg-2)', color: 'var(--t1)', fontFamily: 'inherit', fontSize: 12.5, fontWeight: 600, cursor: 'grab', textAlign: 'left' }}
                  >
                    <span style={{ display: 'flex', color: 'var(--ac2)' }}>{p.icon}</span>{p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Center: canvas */}
        <div
          style={{ flex: 1, overflowY: 'auto', background: 'var(--bg-0)', padding: '34px 24px', display: 'flex', justifyContent: 'center' }}
          onDragOver={e => { e.preventDefault() }}
          onDrop={e => { e.preventDefault(); const t = e.dataTransfer.getData('blocktype') as TemplateBlockType; if (t) addBlock(t) }}
          onClick={e => { if (e.target === e.currentTarget) setSelectedId(null) }}
        >
          <div style={{ width: 720, maxWidth: '100%', minHeight: 900, background: '#fff', color: '#000', boxShadow: '0 2px 16px rgba(0,0,0,0.3)', padding: '48px 56px', fontFamily: "'Times New Roman', Georgia, serif", alignSelf: 'flex-start' }}>
            {preview ? (
              <div dangerouslySetInnerHTML={{ __html: blocks.map(blockToHtml).join('\n') }} />
            ) : blocks.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#aaa', padding: '80px 0', fontFamily: 'var(--f)' }}>
                Перетащите компоненты слева, чтобы собрать шаблон
              </div>
            ) : (
              blocks.map(renderBlock)
            )}
          </div>
        </div>

        {!preview && (
          /* Right: params */
          <div style={{ width: 288, flexShrink: 0, borderLeft: '1px solid var(--line-1)', background: 'var(--bg-1)', overflowY: 'auto', padding: '14px 16px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--t3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Параметры</div>
            {!selected ? (
              <div style={{ fontSize: 12, color: 'var(--t4)', lineHeight: 1.6, textAlign: 'center', paddingTop: 30 }}>
                Кликните по компоненту на странице, чтобы отредактировать его
              </div>
            ) : (
              <Params block={selected} update={p => update(selected.id, p)} insertVar={insertVar} uploadImage={() => uploadImage(selected.id)} />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function ToolbarBtn({ children, onClick, title, disabled }: { children: React.ReactNode; onClick: (e: React.MouseEvent) => void; title: string; disabled?: boolean }) {
  return (
    <button onClick={onClick} title={title} disabled={disabled}
      style={{ width: 22, height: 22, border: 'none', background: 'rgba(255,255,255,0.18)', color: 'inherit', borderRadius: 5, cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.4 : 1, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {children}
    </button>
  )
}

// ── Params panel ──────────────────────────────────────────────────────────────
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 11, color: 'var(--t3)', marginBottom: 6, fontWeight: 600 }}>{label}</div>
      {children}
    </div>
  )
}

function Params({ block: b, update, insertVar, uploadImage }: {
  block: TemplateBlock; update: (p: Partial<TemplateBlock>) => void; insertVar: (k: string) => void; uploadImage: () => void
}) {
  const isText = b.type === 'text' || b.type === 'block'
  const alignBtn = (val: TemplateBlock['align'], label: string) => (
    <button onClick={() => update({ align: val })}
      style={{ flex: 1, padding: '6px 0', border: `1px solid ${b.align === val ? 'var(--ac-border)' : 'var(--line-2)'}`, background: b.align === val ? 'var(--ac-bg)' : 'var(--bg-2)', color: b.align === val ? 'var(--ac2)' : 'var(--t2)', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>
      {label}
    </button>
  )
  const toggle = (key: 'bold' | 'italic' | 'underline', label: React.ReactNode) => (
    <button onClick={() => update({ [key]: !b[key] } as Partial<TemplateBlock>)}
      style={{ flex: 1, padding: '6px 0', border: `1px solid ${b[key] ? 'var(--ac-border)' : 'var(--line-2)'}`, background: b[key] ? 'var(--ac-bg)' : 'var(--bg-2)', color: b[key] ? 'var(--ac2)' : 'var(--t2)', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>
      {label}
    </button>
  )

  return (
    <div>
      {isText && (
        <>
          <Field label="Выравнивание">
            <div style={{ display: 'flex', gap: 5 }}>
              {alignBtn('left', '⬅')}{alignBtn('center', '↔')}{alignBtn('right', '➡')}{alignBtn('justify', '☰')}
            </div>
          </Field>
          <Field label="Начертание">
            <div style={{ display: 'flex', gap: 5 }}>
              {toggle('bold', <b>B</b>)}{toggle('italic', <i>I</i>)}{toggle('underline', <u>U</u>)}
            </div>
          </Field>
          <Field label={`Размер шрифта: ${b.fontSize ?? 13}px`}>
            <input type="range" min={10} max={36} value={b.fontSize ?? 13} onChange={e => update({ fontSize: Number(e.target.value) })} style={{ width: '100%' }} />
          </Field>
          <Field label="Цвет текста">
            <input type="color" value={b.color || '#000000'} onChange={e => update({ color: e.target.value })} style={{ width: '100%', height: 30, border: '1px solid var(--line-2)', borderRadius: 6, background: 'var(--bg-2)' }} />
          </Field>
          <Field label="Переменные (плейсхолдеры)">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {COMMON_VARS.map(v => (
                <button key={v} onClick={() => insertVar(v)} style={{ padding: '4px 8px', border: '1px solid var(--ac-border)', background: 'var(--ac-dim,var(--bg-2))', color: 'var(--ac2)', borderRadius: 6, cursor: 'pointer', fontSize: 10.5, fontFamily: 'var(--fm)' }}>
                  {'{ '}{v}{' }'}
                </button>
              ))}
            </div>
            <div style={{ fontSize: 10.5, color: 'var(--t4)', marginTop: 6, lineHeight: 1.4 }}>
              Поставьте курсор в текст и нажмите переменную — она вставится как заполняемое поле.
            </div>
          </Field>
        </>
      )}
      {b.type === 'block' && (
        <>
          <Field label="Фон блока">
            <input type="color" value={b.bg || '#f5f5f5'} onChange={e => update({ bg: e.target.value })} style={{ width: '100%', height: 30, border: '1px solid var(--line-2)', borderRadius: 6, background: 'var(--bg-2)' }} />
          </Field>
          <Field label="Рамка">
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, color: 'var(--t2)', cursor: 'pointer' }}>
              <input type="checkbox" checked={!!b.bordered} onChange={e => update({ bordered: e.target.checked })} /> Показывать рамку
            </label>
          </Field>
        </>
      )}
      {b.type === 'spacer' && (
        <Field label={`Высота отступа: ${b.height ?? 10}px`}>
          <input type="range" min={4} max={120} value={b.height ?? 10} onChange={e => update({ height: Number(e.target.value) })} style={{ width: '100%' }} />
        </Field>
      )}
      {b.type === 'line' && (
        <>
          <Field label={`Толщина: ${b.thickness ?? 1}px`}>
            <input type="range" min={1} max={8} value={b.thickness ?? 1} onChange={e => update({ thickness: Number(e.target.value) })} style={{ width: '100%' }} />
          </Field>
          <Field label="Цвет линии">
            <input type="color" value={b.color || '#222222'} onChange={e => update({ color: e.target.value })} style={{ width: '100%', height: 30, border: '1px solid var(--line-2)', borderRadius: 6, background: 'var(--bg-2)' }} />
          </Field>
        </>
      )}
      {b.type === 'image' && (
        <>
          <Field label="Файл">
            <button className="btn btn-secondary btn-sm" style={{ width: '100%' }} onClick={uploadImage}>{b.src ? 'Заменить изображение' : 'Загрузить изображение'}</button>
          </Field>
          {b.src && (
            <>
              <Field label={`Ширина: ${b.width ?? 50}%`}>
                <input type="range" min={10} max={100} value={b.width ?? 50} onChange={e => update({ width: Number(e.target.value) })} style={{ width: '100%' }} />
              </Field>
              <Field label="Выравнивание">
                <div style={{ display: 'flex', gap: 5 }}>
                  {(['left', 'center', 'right'] as const).map(a => (
                    <button key={a} onClick={() => update({ align: a })} style={{ flex: 1, padding: '6px 0', border: `1px solid ${b.align === a ? 'var(--ac-border)' : 'var(--line-2)'}`, background: b.align === a ? 'var(--ac-bg)' : 'var(--bg-2)', color: b.align === a ? 'var(--ac2)' : 'var(--t2)', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>
                      {a === 'left' ? '⬅' : a === 'center' ? '↔' : '➡'}
                    </button>
                  ))}
                </div>
              </Field>
            </>
          )}
        </>
      )}
    </div>
  )
}
