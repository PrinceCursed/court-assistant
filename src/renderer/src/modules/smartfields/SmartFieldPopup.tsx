import React, { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Case } from '../../types'

// ── Token types ────────────────────────────────────────────────────────────────

export type SmartFieldType =
  | 'gov-org'       // [Гос. структура]
  | 'date'          // [день.месяц.год], [Дата]
  | 'time'          // [Время]
  | 'session-type'  // [Открытом/Закрытом]
  | 'money'         // [Сумма]
  | 'article'       // [Статья], [Статьи]
  | 'person'        // [Имя Фамилия]
  | 'case-number'   // [Номер иска], [НОМЕР ДЕЛА]
  | 'ordinal'       // [порядковый номер]
  | 'prosecutor'    // [Гос.обвинитель]
  | 'text'          // everything else

const GOV_ORGS = ['GOV', 'FIB', 'LSPD', 'LSSD', 'NG', 'SASPA', 'EMS', 'USSS', 'МЮ', 'Прокуратура']

// ── Type detection ─────────────────────────────────────────────────────────────

export function detectPhType(el: HTMLElement): SmartFieldType {
  // Prefer explicit data attribute (set at generation time)
  const attr = el.getAttribute('data-ph-type') as SmartFieldType | null
  if (attr) return attr

  // Fallback: infer from text content / data-ph-key
  const raw = (el.getAttribute('data-ph-key') || el.textContent || '')
    .replace(/^\[|\]$/g, '')
    .trim()
    .toLowerCase()

  if (raw === 'сумма') return 'money'
  if (raw === 'время') return 'time'
  if (raw.includes('открытом') || raw.includes('закрытом')) return 'session-type'
  if (raw.includes('обвинитель')) return 'prosecutor'
  if (raw.includes('статья') || raw.includes('статьи')) return 'article'
  if (raw === 'дата' || raw.includes('день') || raw.includes('месяц') && raw.includes('год')) return 'date'
  if (raw.includes('номер') && (raw.includes('иска') || raw.includes('дела'))) return 'case-number'
  if (raw.includes('порядковый')) return 'ordinal'
  if ((raw.includes('гос') && raw.includes('структур')) || raw === 'структура') return 'gov-org'
  if (raw.includes('имя') && raw.includes('фамилия')) return 'person'

  return 'text'
}

// ── Props ──────────────────────────────────────────────────────────────────────

interface Props {
  anchorRect: DOMRect
  phType: SmartFieldType
  phKey: string
  currentValue?: string
  case_: Case
  duplicateCount: number
  onFill: (value: string, fillAll: boolean) => void
  onClose: () => void
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function SmartFieldPopup({
  anchorRect, phType, phKey, currentValue, case_, duplicateCount, onFill, onClose
}: Props) {
  // ── Date helpers ────────────────────────────────────────────────────────────
  const todayDate = new Date()

  const toIso = (d: Date): string => {
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${y}-${m}-${day}`
  }

  const toDisplay = (iso: string): string => {
    if (!iso) return ''
    try {
      const [y, m, d] = iso.split('-')
      if (y && m && d) return `${d}.${m}.${y}`
    } catch { /* noop */ }
    return iso
  }

  const fromDisplay = (display: string): string => {
    if (!display) return ''
    try {
      const [d, m, y] = display.split('.')
      if (d && m && y) return `${y}-${m.padStart(2,'0')}-${d.padStart(2,'0')}`
    } catch { /* noop */ }
    return display
  }

  // ── State initialisation ────────────────────────────────────────────────────
  const initValue = (): string => {
    if (!currentValue) {
      if (phType === 'date') return toIso(todayDate)
      if (phType === 'time') return todayDate.toTimeString().slice(0, 5)
      return ''
    }
    if (phType === 'date' && currentValue.includes('.')) return fromDisplay(currentValue)
    return currentValue
  }

  const [value, setValue] = useState<string>(initValue)
  const [articles, setArticles] = useState<string[]>(() => {
    if (phType !== 'article' || !currentValue) return []
    return currentValue.split(/,\s*/).filter(Boolean)
  })
  const [articleInput, setArticleInput] = useState('')
  const popupRef = useRef<HTMLDivElement>(null)

  // ── Positioning ─────────────────────────────────────────────────────────────
  const POPUP_W = 300
  const POPUP_EST_H: Record<SmartFieldType, number> = {
    'gov-org': 270, 'date': 180, 'time': 160, 'session-type': 100,
    'money': 220, 'article': 240, 'person': 220, 'case-number': 120,
    'ordinal': 120, 'prosecutor': 200, 'text': 200,
  }
  const estimatedH = POPUP_EST_H[phType] || 200
  const spaceBelow = window.innerHeight - anchorRect.bottom - 10
  const top = spaceBelow >= estimatedH
    ? anchorRect.bottom + 6
    : Math.max(10, anchorRect.top - estimatedH - 6)
  const left = Math.max(10, Math.min(anchorRect.left, window.innerWidth - POPUP_W - 10))

  // ── Close on outside click ──────────────────────────────────────────────────
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    const timer = setTimeout(() => document.addEventListener('mousedown', handle), 60)
    return () => { clearTimeout(timer); document.removeEventListener('mousedown', handle) }
  }, [onClose])

  // ── Close on Escape ─────────────────────────────────────────────────────────
  useEffect(() => {
    const handle = (e: KeyboardEvent) => { if (e.key === 'Escape') { e.stopPropagation(); onClose() } }
    document.addEventListener('keydown', handle, true)
    return () => document.removeEventListener('keydown', handle, true)
  }, [onClose])

  // ── Submit helpers ──────────────────────────────────────────────────────────
  const submit = (v: string, fillAll = false) => {
    const trimmed = v.trim()
    if (!trimmed) return
    onFill(trimmed, fillAll)
  }

  // ── UI helpers ──────────────────────────────────────────────────────────────
  const SectionLabel = ({ label }: { label: string }) => (
    <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.09em', marginBottom: 8 }}>
      {label}
    </div>
  )

  const FillButtons = ({ v }: { v: string }) => (
    <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
      {duplicateCount > 1 && (
        <button
          className="btn btn-ghost btn-sm"
          style={{ flex: 1, fontSize: 11 }}
          onClick={() => submit(v, true)}
        >
          Все {duplicateCount} ▸
        </button>
      )}
      <button
        className="btn btn-primary btn-sm"
        style={{ flex: duplicateCount > 1 ? 1 : undefined, minWidth: 90 }}
        onClick={() => submit(v)}
      >
        Заполнить
      </button>
    </div>
  )

  // ── Field UIs ────────────────────────────────────────────────────────────────
  const renderGovOrg = () => {
    const isCustom = !!value && !GOV_ORGS.includes(value)
    return (
      <>
        <SectionLabel label="Гос. структура" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5, marginBottom: 8 }}>
          {GOV_ORGS.map(org => (
            <button
              key={org}
              className={`btn btn-sm ${value === org ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setValue(org)}
            >
              {org}
            </button>
          ))}
        </div>
        <input
          className="input"
          style={{ fontSize: 12 }}
          placeholder="Другая структура..."
          value={isCustom ? value : ''}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && value) submit(value) }}
        />
        <FillButtons v={value} />
      </>
    )
  }

  const renderDate = () => {
    const yesterday = new Date(todayDate); yesterday.setDate(yesterday.getDate() - 1)
    const weekAgo = new Date(todayDate); weekAgo.setDate(weekAgo.getDate() - 7)
    return (
      <>
        <SectionLabel label="Дата" />
        <div style={{ display: 'flex', gap: 5, marginBottom: 8 }}>
          <button className="btn btn-ghost btn-sm" style={{ flex: 1, fontSize: 11 }} onClick={() => setValue(toIso(todayDate))}>Сегодня</button>
          <button className="btn btn-ghost btn-sm" style={{ flex: 1, fontSize: 11 }} onClick={() => setValue(toIso(yesterday))}>Вчера</button>
          <button className="btn btn-ghost btn-sm" style={{ flex: 1, fontSize: 11 }} onClick={() => setValue(toIso(weekAgo))}>7 дней назад</button>
        </div>
        <input
          className="input"
          type="date"
          value={value}
          onChange={e => setValue(e.target.value)}
          style={{ fontSize: 13 }}
        />
        <FillButtons v={toDisplay(value)} />
      </>
    )
  }

  const renderTime = () => {
    const fmtTime = (d: Date) => d.toTimeString().slice(0, 5)
    const plus = (h: number) => { const d = new Date(todayDate); d.setHours(d.getHours() + h); return fmtTime(d) }
    return (
      <>
        <SectionLabel label="Время" />
        <div style={{ display: 'flex', gap: 5, marginBottom: 8 }}>
          <button className="btn btn-ghost btn-sm" style={{ flex: 1, fontSize: 11 }} onClick={() => setValue(fmtTime(todayDate))}>Сейчас</button>
          <button className="btn btn-ghost btn-sm" style={{ flex: 1, fontSize: 11 }} onClick={() => setValue(plus(1))}>+1ч</button>
          <button className="btn btn-ghost btn-sm" style={{ flex: 1, fontSize: 11 }} onClick={() => setValue(plus(2))}>+2ч</button>
        </div>
        <input
          className="input"
          type="time"
          step={300}
          value={value || fmtTime(todayDate)}
          onChange={e => setValue(e.target.value)}
          style={{ fontSize: 13 }}
        />
        <FillButtons v={value || fmtTime(todayDate)} />
      </>
    )
  }

  const renderSessionType = () => (
    <>
      <SectionLabel label="Тип заседания" />
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          className={`btn btn-sm ${value === 'открытом' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ flex: 1 }}
          onClick={() => submit('открытом', false)}
        >
          🔓 Открытом
        </button>
        <button
          className={`btn btn-sm ${value === 'закрытом' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ flex: 1 }}
          onClick={() => submit('закрытом', false)}
        >
          🔒 Закрытом
        </button>
      </div>
      {duplicateCount > 1 && (
        <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
          <button className="btn btn-ghost btn-sm" style={{ flex: 1, fontSize: 11 }} onClick={() => submit('открытом', true)}>
            Открытом — везде ({duplicateCount})
          </button>
          <button className="btn btn-ghost btn-sm" style={{ flex: 1, fontSize: 11 }} onClick={() => submit('закрытом', true)}>
            Закрытом — везде
          </button>
        </div>
      )}
    </>
  )

  const renderMoney = () => {
    const num = parseFloat(value) || 0
    const PRESETS = [5000, 15000, 25000, 50000, 100000]
    const formatMoney = (n: number) =>
      n > 0 ? n.toLocaleString('de-DE').replace(/,/g, '.') + '$' : ''
    const formatted = formatMoney(num)
    return (
      <>
        <SectionLabel label="Сумма" />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 8 }}>
          {PRESETS.map(p => (
            <button
              key={p}
              className={`btn btn-ghost btn-sm ${num === p ? 'active' : ''}`}
              style={{ fontSize: 11 }}
              onClick={() => setValue(String(p))}
            >
              {formatMoney(p)}
            </button>
          ))}
        </div>
        <input
          className="input"
          type="number"
          min={0}
          step={500}
          placeholder="0"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && formatted) submit(formatted) }}
          style={{ fontSize: 13 }}
        />
        {num > 0 && (
          <div style={{ fontSize: 11, color: 'var(--text-accent)', marginTop: 4, fontWeight: 600 }}>
            = {formatted}
          </div>
        )}
        <FillButtons v={formatted || value} />
      </>
    )
  }

  const renderArticle = () => {
    const addArticle = () => {
      const v = articleInput.trim()
      if (!v || articles.includes(v)) return
      setArticles(prev => [...prev, v])
      setArticleInput('')
    }
    const articlesStr = articles.join(', ')
    return (
      <>
        <SectionLabel label="Статья(и)" />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 8, minHeight: 28 }}>
          {articles.length === 0 && (
            <span style={{ color: 'var(--text-3)', fontSize: 11 }}>Добавьте статьи...</span>
          )}
          {articles.map(a => (
            <span
              key={a}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                background: 'var(--accent-dim)', color: 'var(--text-accent)',
                padding: '2px 8px', borderRadius: 'var(--r-f)', fontSize: 11, fontWeight: 600
              }}
            >
              {a}
              <span
                style={{ cursor: 'pointer', opacity: 0.7, lineHeight: 1 }}
                onClick={() => setArticles(prev => prev.filter(x => x !== a))}
              >×</span>
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <input
            autoFocus
            className="input"
            style={{ flex: 1, fontSize: 12 }}
            placeholder="Ст. 132 УК СА..."
            value={articleInput}
            onChange={e => setArticleInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addArticle() } }}
          />
          <button className="btn btn-secondary btn-sm" onClick={addArticle} style={{ flexShrink: 0 }}>+</button>
        </div>
        <FillButtons v={articlesStr || value} />
      </>
    )
  }

  const renderPerson = (label: string, roles: string[]) => {
    const people = case_.participants
      .filter(p => roles.includes(p.role))
      .map(p => `${p.firstName} ${p.lastName}`.trim())
      .filter(Boolean)
    const isCustom = !!value && !people.includes(value)
    return (
      <>
        <SectionLabel label={label} />
        {people.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 8 }}>
            {people.map(name => (
              <button
                key={name}
                className={`btn btn-sm ${value === name ? 'btn-primary' : 'btn-secondary'}`}
                style={{ justifyContent: 'flex-start', textAlign: 'left' }}
                onClick={() => setValue(name)}
              >
                {name}
              </button>
            ))}
          </div>
        )}
        <input
          className="input"
          style={{ fontSize: 12 }}
          placeholder="Имя Фамилия..."
          value={isCustom || people.length === 0 ? value : ''}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && value) submit(value) }}
        />
        <FillButtons v={value} />
      </>
    )
  }

  const renderCaseNumber = () => (
    <>
      <SectionLabel label="Номер дела" />
      <div style={{
        fontSize: 18, fontWeight: 700, color: 'var(--text-accent)',
        textAlign: 'center', padding: '12px 0'
      }}>
        №{case_.caseNumber}
      </div>
      <button className="btn btn-primary btn-sm" style={{ width: '100%' }} onClick={() => submit(case_.caseNumber)}>
        Вставить автоматически
      </button>
    </>
  )

  const renderOrdinal = () => {
    const defCount = case_.participants.filter(p => p.role === 'defendant').length || 1
    return (
      <>
        <SectionLabel label="Порядковый номер" />
        <div style={{ fontSize: 12, color: 'var(--text-2)', marginBottom: 8 }}>
          Ответчиков в деле: <strong>{defCount}</strong>
        </div>
        <input
          className="input"
          type="number"
          min={1}
          max={99}
          value={value || '1'}
          onChange={e => setValue(e.target.value)}
          style={{ fontSize: 13, textAlign: 'center' }}
        />
        <FillButtons v={value || '1'} />
      </>
    )
  }

  const renderText = () => (
    <>
      <SectionLabel label={phKey.length > 30 ? phKey.slice(0, 30) + '…' : phKey} />
      <textarea
        autoFocus
        className="textarea"
        style={{ fontSize: 12, minHeight: 72, resize: 'vertical', width: '100%' }}
        placeholder="Введите значение..."
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) submit(value) }}
      />
      <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 3 }}>
        Ctrl+Enter для заполнения
      </div>
      <FillButtons v={value} />
    </>
  )

  const renderContent = () => {
    switch (phType) {
      case 'gov-org':      return renderGovOrg()
      case 'date':         return renderDate()
      case 'time':         return renderTime()
      case 'session-type': return renderSessionType()
      case 'money':        return renderMoney()
      case 'article':      return renderArticle()
      case 'person':       return renderPerson('Имя Фамилия', ['plaintiff', 'defendant', 'judge', 'witness'])
      case 'case-number':  return renderCaseNumber()
      case 'ordinal':      return renderOrdinal()
      case 'prosecutor':   return renderPerson('Гос. обвинитель', ['prosecutor', 'plaintiff'])
      default:             return renderText()
    }
  }

  // ── Render via portal ────────────────────────────────────────────────────────
  return createPortal(
    <div
      ref={popupRef}
      className="smart-field-popup"
      style={{ position: 'fixed', top, left, width: POPUP_W, zIndex: 10000 }}
    >
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 10, paddingBottom: 8, borderBottom: '1px solid var(--border-1)'
      }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-1)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
          ✏️ {phKey.length > 28 ? phKey.slice(0, 28) + '…' : phKey}
        </div>
        <button
          className="btn btn-icon btn-ghost"
          onClick={onClose}
          style={{ fontSize: 12, width: 22, height: 22, flexShrink: 0, marginLeft: 6 }}
        >
          ✕
        </button>
      </div>

      {renderContent()}
    </div>,
    document.body
  )
}
