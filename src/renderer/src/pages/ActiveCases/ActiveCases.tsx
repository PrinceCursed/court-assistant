import React, { useState, useEffect } from 'react'
import { useApp } from '../../store/AppContext'
import CaseCard from '../../components/CaseCard/CaseCard'
import Modal from '../../components/Modal/Modal'
import { Case } from '../../types'

interface FormData {
  caseNumber: string
  title: string
  plaintiff: string
  defendant: string
  prosecutor: string
  lawyer: string
  description: string
  priority: 'normal' | 'urgent'
}

// ── Forum URL parser ──────────────────────────────────────────────────────────

/**
 * Parses a forum.gta5rp.com lawsuit thread HTML and extracts:
 *   истец (plaintiff), ответчик (defendant), законный представитель / адвокат (lawyer)
 *
 * Forum posts follow a consistent template:
 *   Истец: <name>
 *   Ответчик: <name>
 *   Законный представитель / Адвокат: <name>
 */
function parseForumHtml(html: string): Partial<FormData> {
  // Extract all text lines from the first post body
  // Strip HTML tags to get plain text
  const plain = html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<\/div>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#\d+;/g, ' ')

  const lines = plain.split('\n').map(l => l.trim()).filter(Boolean)

  const extracted: Partial<FormData> = {}

  const FIELD_PATTERNS: { field: keyof FormData; patterns: RegExp[] }[] = [
    {
      field: 'plaintiff',
      patterns: [/^истец\s*[:：]\s*(.+)/i, /^заявитель\s*[:：]\s*(.+)/i]
    },
    {
      field: 'defendant',
      patterns: [/^ответчик\s*[:：]\s*(.+)/i, /^обвиняемый\s*[:：]\s*(.+)/i]
    },
    {
      field: 'lawyer',
      patterns: [
        /^законный представитель\s*[/\/]?\s*адвокат\s*[:：]\s*(.+)/i,
        /^адвокат\s*[:：]\s*(.+)/i,
        /^законный представитель\s*[:：]\s*(.+)/i,
        /^представитель\s*[:：]\s*(.+)/i,
      ]
    },
    {
      field: 'prosecutor',
      patterns: [/^прокурор\s*[:：]\s*(.+)/i]
    },
  ]

  for (const line of lines) {
    for (const { field, patterns } of FIELD_PATTERNS) {
      if (extracted[field]) continue
      for (const pat of patterns) {
        const m = line.match(pat)
        if (m && m[1]) {
          const value = m[1].trim().replace(/^[-—–]\s*/, '').trim()
          if (value && value !== '-' && value !== '—' && value.length < 100) {
            extracted[field] = value
          }
          break
        }
      }
    }
  }

  return extracted
}

// ── URL import component (inline) ─────────────────────────────────────────────

interface UrlImportProps {
  onFill: (data: Partial<FormData>) => void
  onClose: () => void
}

function UrlImportPanel({ onFill, onClose }: UrlImportProps) {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [preview, setPreview] = useState<Partial<FormData> | null>(null)

  const handleFetch = async () => {
    const trimmed = url.trim()
    if (!trimmed) return
    if (!trimmed.includes('forum.gta5rp.com') && !trimmed.startsWith('http')) {
      setError('Вставьте ссылку на форум forum.gta5rp.com')
      return
    }
    setLoading(true)
    setError('')
    setPreview(null)

    try {
      const result = await window.api.fetchUrl(trimmed)
      if (!result.ok || !result.html) {
        setError(result.error || 'Не удалось загрузить страницу')
        return
      }
      const data = parseForumHtml(result.html)
      if (!data.plaintiff && !data.defendant) {
        setError('Не удалось найти данные иска. Убедитесь, что это ссылка на тему с исковым заявлением.')
        return
      }
      setPreview(data)
    } catch (e) {
      setError(String(e))
    } finally {
      setLoading(false)
    }
  }

  const handleApply = () => {
    if (preview) {
      onFill(preview)
      onClose()
    }
  }

  return (
    <div style={{
      background: 'var(--bg-3)',
      border: '1px solid var(--ac-border)',
      borderRadius: 12,
      padding: '14px 16px',
      marginBottom: 16,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <span style={{ fontSize: 15 }}>🔗</span>
        <span style={{ fontWeight: 700, fontSize: 13, color: 'var(--t1)' }}>Импорт по ссылке с форума</span>
        <button
          onClick={onClose}
          style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--t3)', fontSize: 16, lineHeight: 1 }}
        >×</button>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
        <input
          className="input"
          style={{ flex: 1, fontSize: 12 }}
          placeholder="https://forum.gta5rp.com/threads/..."
          value={url}
          onChange={e => { setUrl(e.target.value); setError(''); setPreview(null) }}
          onKeyDown={e => e.key === 'Enter' && handleFetch()}
          autoFocus
        />
        <button
          className="btn btn-primary btn-sm"
          onClick={handleFetch}
          disabled={loading || !url.trim()}
          style={{ flexShrink: 0 }}
        >
          {loading ? '⟳' : 'Загрузить'}
        </button>
      </div>

      {error && (
        <div style={{ color: 'var(--red, #f87171)', fontSize: 12, marginBottom: 8 }}>{error}</div>
      )}

      {preview && (
        <div style={{ background: 'var(--bg-2)', borderRadius: 8, padding: '10px 12px', marginBottom: 10 }}>
          <div style={{ fontSize: 11, color: 'var(--t3)', marginBottom: 8, fontWeight: 600 }}>НАЙДЕНО:</div>
          {preview.plaintiff  && <div style={{ fontSize: 12, color: 'var(--t2)', marginBottom: 4 }}>👤 <strong>Истец:</strong> {preview.plaintiff}</div>}
          {preview.defendant  && <div style={{ fontSize: 12, color: 'var(--t2)', marginBottom: 4 }}>👤 <strong>Ответчик:</strong> {preview.defendant}</div>}
          {preview.lawyer     && <div style={{ fontSize: 12, color: 'var(--t2)', marginBottom: 4 }}>⚖️ <strong>Адвокат:</strong> {preview.lawyer}</div>}
          {preview.prosecutor && <div style={{ fontSize: 12, color: 'var(--t2)', marginBottom: 4 }}>🏛️ <strong>Прокурор:</strong> {preview.prosecutor}</div>}
          <button
            className="btn btn-primary btn-sm"
            onClick={handleApply}
            style={{ marginTop: 8, width: '100%' }}
          >
            ✓ Заполнить форму
          </button>
        </div>
      )}

      <div style={{ fontSize: 10.5, color: 'var(--t4)' }}>
        Поддерживаются ссылки на темы forum.gta5rp.com с исковыми заявлениями
      </div>
    </div>
  )
}

export default function ActiveCases() {
  const { cases, createCase, updateCase, setView, openCase, nextCaseNumber } = useApp()
  const [showCreate, setShowCreate] = useState(false)
  const [editCase, setEditCase] = useState<Case | null>(null)
  const [search, setSearch] = useState('')
  const [showUrlImport, setShowUrlImport] = useState(false)
  const [form, setForm] = useState<FormData>({
    caseNumber: '', title: '', plaintiff: '', defendant: '',
    prosecutor: '', lawyer: '', description: '', priority: 'normal'
  })

  const active = cases
    .filter(c => c.status === 'active')
    .filter(c => !search || [c.caseNumber, c.title, c.plaintiff, c.defendant]
      .some(f => f.toLowerCase().includes(search.toLowerCase())))
    .sort((a, b) => {
      // urgent (10) > pinned (5) > normal (0)
      const score = (c: typeof a) => (c.priority === 'urgent' ? 10 : 0) + (c.isPinned ? 5 : 0)
      return score(b) - score(a)
    })

  useEffect(() => {
    const handler = () => openNewCase()
    document.addEventListener('new-case', handler)
    return () => document.removeEventListener('new-case', handler)
  }, [])

  const openNewCase = () => {
    setEditCase(null)
    setShowUrlImport(false)
    setForm({ caseNumber: nextCaseNumber(), title: '', plaintiff: '', defendant: '', prosecutor: '', lawyer: '', description: '', priority: 'normal' })
    setShowCreate(true)
  }

  const handleUrlFill = (data: Partial<FormData>) => {
    setForm(prev => ({ ...prev, ...data }))
  }

  const openEdit = (c: Case) => {
    setShowCreate(false)
    setForm({
      caseNumber: c.caseNumber, title: c.title,
      plaintiff: c.plaintiff, defendant: c.defendant,
      prosecutor: c.prosecutor || '', lawyer: c.lawyer || '',
      description: c.description || '', priority: c.priority ?? 'normal'
    })
    setEditCase(c)
  }

  const handleCreate = async () => {
    if (!form.plaintiff.trim() || !form.defendant.trim()) return
    const c = await createCase({
      caseNumber: form.caseNumber || nextCaseNumber(),
      title: form.title || `${form.plaintiff} vs ${form.defendant}`,
      plaintiff: form.plaintiff, defendant: form.defendant,
      prosecutor: form.prosecutor || undefined,
      lawyer: form.lawyer || undefined,
      description: form.description || undefined,
      priority: form.priority
    })
    setShowCreate(false)
    openCase(c.id)
  }

  const handleEdit = async () => {
    if (!editCase) return
    await updateCase(editCase.id, {
      caseNumber: form.caseNumber,
      title: form.title || `${form.plaintiff} vs ${form.defendant}`,
      plaintiff: form.plaintiff, defendant: form.defendant,
      prosecutor: form.prosecutor || undefined,
      lawyer: form.lawyer || undefined,
      description: form.description || undefined,
      priority: form.priority
    })
    setEditCase(null)
  }

  const ff = (key: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(p => ({ ...p, [key]: e.target.value }))

  // FIX: inline JSX instead of inner component — prevents remounting on re-render
  // which was causing cursor to jump back to first input on every keystroke
  const formContent = (
    <>
      {showCreate && showUrlImport && (
        <UrlImportPanel
          onFill={handleUrlFill}
          onClose={() => setShowUrlImport(false)}
        />
      )}
      <div className="form-row form-row-2">
        <div className="input-group">
          <label className="input-label">Номер дела</label>
          <input className="input" value={form.caseNumber} onChange={ff('caseNumber')} placeholder="Автоматически" />
        </div>
        <div className="input-group">
          <label className="input-label">Название дела (необязательно)</label>
          <input className="input" value={form.title} onChange={ff('title')} placeholder="Авто: Истец vs Ответчик" />
        </div>
      </div>
      <div className="form-row form-row-2">
        <div className="input-group">
          <label className="input-label">Истец *</label>
          <input className="input" value={form.plaintiff} onChange={ff('plaintiff')} placeholder="Имя истца" />
        </div>
        <div className="input-group">
          <label className="input-label">Ответчик *</label>
          <input className="input" value={form.defendant} onChange={ff('defendant')} placeholder="Имя ответчика" />
        </div>
      </div>
      <div className="form-row form-row-2">
        <div className="input-group">
          <label className="input-label">Прокурор</label>
          <input className="input" value={form.prosecutor} onChange={ff('prosecutor')} placeholder="Необязательно" />
        </div>
        <div className="input-group">
          <label className="input-label">Адвокат</label>
          <input className="input" value={form.lawyer} onChange={ff('lawyer')} placeholder="Необязательно" />
        </div>
      </div>
      <div className="input-group">
        <label className="input-label">Краткое описание</label>
        <textarea className="textarea" value={form.description} onChange={ff('description')} placeholder="Описание дела..." rows={3} />
      </div>
      <div className="input-group">
        <label className="input-label">Приоритет</label>
        <div style={{ display: 'flex', gap: 8 }}>
          {(['normal', 'urgent'] as const).map(p => (
            <button
              key={p}
              type="button"
              onClick={() => setForm(prev => ({ ...prev, priority: p }))}
              style={{
                padding: '6px 16px',
                border: `1px solid ${form.priority === p ? (p === 'urgent' ? 'var(--red)' : 'var(--ac)') : 'var(--border-2)'}`,
                borderRadius: 'var(--r-sm)',
                background: form.priority === p ? (p === 'urgent' ? 'var(--red-dim)' : 'var(--accent-dim)') : 'transparent',
                color: form.priority === p ? (p === 'urgent' ? 'var(--red)' : 'var(--ac2)') : 'var(--text-2)',
                cursor: 'pointer', fontWeight: 600, fontSize: 12,
                transition: 'all 120ms',
              }}
            >
              {p === 'normal' ? '● Обычный' : '🔴 Срочный'}
            </button>
          ))}
        </div>
      </div>
    </>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div className="page-header">
        <div>
          <div className="page-title">⚖️ Иски в работе</div>
          <div className="page-subtitle">{active.length} {active.length === 1 ? 'дело' : 'дел'}</div>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <input
            className="input"
            style={{ width: 220 }}
            placeholder="🔍  Поиск дел..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button className="btn btn-primary" onClick={openNewCase}>+ Новый иск</button>
        </div>
      </div>

      {active.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">⚖️</div>
          <div className="empty-state-text">{search ? 'Ничего не найдено' : 'Нет активных дел'}</div>
          <div className="empty-state-sub">{!search && 'Нажмите «+ Новый иск» или Ctrl+N'}</div>
        </div>
      ) : (
        <div className="cases-grid">
          {active.map(c => (
            <CaseCard key={c.id} case_={c} onOpen={() => openCase(c.id)} onEdit={() => openEdit(c)} />
          ))}
        </div>
      )}

      {showCreate && (
        <Modal
          title="Новый иск"
          onClose={() => setShowCreate(false)}
          footer={
            <>
              <button className="btn btn-ghost" onClick={() => setShowCreate(false)}>Отмена</button>
              <button
                className="btn btn-ghost"
                onClick={() => setShowUrlImport(v => !v)}
                title="Заполнить из ссылки на форум"
                style={{ color: 'var(--ac2)' }}
              >
                🔗 По ссылке
              </button>
              <button className="btn btn-primary" onClick={handleCreate}>Создать дело</button>
            </>
          }
        >
          {formContent}
        </Modal>
      )}

      {editCase && (
        <Modal
          title={`Редактировать №${editCase.caseNumber}`}
          onClose={() => setEditCase(null)}
          footer={
            <>
              <button className="btn btn-ghost" onClick={() => setEditCase(null)}>Отмена</button>
              <button className="btn btn-primary" onClick={handleEdit}>Сохранить</button>
            </>
          }
        >
          {formContent}
        </Modal>
      )}
    </div>
  )
}
