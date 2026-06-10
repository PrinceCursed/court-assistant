import React, { useState, useEffect } from 'react'
import { useApp } from '../../store/AppContext'
import CaseCard from '../../components/CaseCard/CaseCard'
import Modal from '../../components/Modal/Modal'
import { Case } from '../../types'
import { parseCaseText, parseForumHtml, ParsedCase } from './forumParser'

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

// ── Shared inline icons ───────────────────────────────────────────────────────

const I = {
  link: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
    </svg>
  ),
  search: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
    </svg>
  ),
  plus: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <path d="M12 5v14M5 12h14"/>
    </svg>
  ),
  check: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
}

// ── Import panel (link + paste-text fallback) ─────────────────────────────────

interface UrlImportProps {
  onFill: (data: ParsedCase) => void
  onClose: () => void
}

function ImportPanel({ onFill, onClose }: UrlImportProps) {
  const [mode, setMode] = useState<'url' | 'text'>('url')
  const [url, setUrl] = useState('')
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [hint, setHint] = useState('')
  const [preview, setPreview] = useState<ParsedCase | null>(null)

  const reset = () => { setError(''); setHint(''); setPreview(null) }

  const handleFetch = async () => {
    const trimmed = url.trim()
    if (!trimmed) return
    if (!/^https?:\/\//i.test(trimmed)) {
      setError('Вставьте полную ссылку, начиная с https://')
      return
    }
    setLoading(true)
    reset()

    try {
      const result = await window.api.fetchUrl(trimmed)
      if (!result.ok || !result.html) {
        if (result.error === 'CLOUDFLARE') {
          setError('Форум закрыт защитой Cloudflare и не отдаёт страницу программе.')
          setHint('Откройте тему в браузере, скопируйте текст иска и используйте режим «Вставить текст».')
          setMode('text')
        } else if (result.error === 'LOGIN_REQUIRED') {
          setError('Тема находится в закрытом разделе — без авторизации её не открыть.')
          setHint('Скопируйте текст иска из браузера и используйте режим «Вставить текст».')
          setMode('text')
        } else {
          setError(`Не удалось загрузить страницу (${result.error || 'неизвестная ошибка'}).`)
          setHint('Проверьте ссылку или используйте режим «Вставить текст».')
        }
        return
      }
      const data = parseForumHtml(result.html)
      if (!data.plaintiff && !data.defendant) {
        setError('Страница загрузилась, но данные иска не найдены.')
        setHint('Убедитесь, что это тема с исковым заявлением, либо вставьте текст иска вручную.')
        return
      }
      setPreview(data)
    } catch (e) {
      setError(String(e))
    } finally {
      setLoading(false)
    }
  }

  const handleParseText = () => {
    reset()
    const data = parseCaseText(text)
    if (!data.plaintiff && !data.defendant) {
      setError('Не удалось найти строки «Истец: …» и «Ответчик: …» в тексте.')
      return
    }
    setPreview(data)
  }

  const handleApply = () => {
    if (preview) {
      onFill(preview)
      onClose()
    }
  }

  const previewRow = (label: string, value?: string) => value ? (
    <div style={{ display: 'flex', gap: 8, fontSize: 12, marginBottom: 4 }}>
      <span style={{ color: 'var(--t3)', minWidth: 72 }}>{label}</span>
      <span style={{ color: 'var(--t1)', fontWeight: 600 }}>{value}</span>
    </div>
  ) : null

  return (
    <div className="import-panel">
      <div className="import-panel-head">
        <div className="import-tabs">
          <button className={`import-tab ${mode === 'url' ? 'active' : ''}`} onClick={() => { setMode('url'); reset() }}>
            {I.link} По ссылке
          </button>
          <button className={`import-tab ${mode === 'text' ? 'active' : ''}`} onClick={() => { setMode('text'); reset() }}>
            Вставить текст
          </button>
        </div>
        <button className="btn btn-icon btn-ghost btn-sm" onClick={onClose} title="Закрыть">✕</button>
      </div>

      {mode === 'url' ? (
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            className="input"
            style={{ flex: 1, fontSize: 12 }}
            placeholder="https://forum.gta5rp.com/threads/…"
            value={url}
            onChange={e => { setUrl(e.target.value); reset() }}
            onKeyDown={e => e.key === 'Enter' && handleFetch()}
            autoFocus
          />
          <button className="btn btn-primary btn-sm" onClick={handleFetch} disabled={loading || !url.trim()} style={{ flexShrink: 0 }}>
            {loading ? 'Загрузка…' : 'Загрузить'}
          </button>
        </div>
      ) : (
        <>
          <textarea
            className="textarea"
            style={{ fontSize: 12, minHeight: 96 }}
            placeholder={'Вставьте текст искового заявления с форума.\nНапример:\nИстец: John Doe\nОтветчик: Jane Smith'}
            value={text}
            onChange={e => { setText(e.target.value); reset() }}
            autoFocus
          />
          <button className="btn btn-primary btn-sm" onClick={handleParseText} disabled={!text.trim()} style={{ marginTop: 8 }}>
            Распознать
          </button>
        </>
      )}

      {error && <div className="import-error">{error}</div>}
      {hint && <div className="import-hint">{hint}</div>}

      {preview && (
        <div className="import-preview">
          <div className="import-preview-label">Найдено</div>
          {previewRow('Название', preview.title)}
          {previewRow('Истец', preview.plaintiff)}
          {previewRow('Ответчик', preview.defendant)}
          {previewRow('Адвокат', preview.lawyer)}
          {previewRow('Прокурор', preview.prosecutor)}
          <button className="btn btn-primary btn-sm" onClick={handleApply} style={{ marginTop: 8, width: '100%' }}>
            {I.check} Заполнить форму
          </button>
        </div>
      )}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ActiveCases() {
  const { cases, createCase, updateCase, setView, openCase, nextCaseNumber } = useApp()
  const [showCreate, setShowCreate] = useState(false)
  const [editCase, setEditCase] = useState<Case | null>(null)
  const [search, setSearch] = useState('')
  const [showImport, setShowImport] = useState(false)
  const [form, setForm] = useState<FormData>({
    caseNumber: '', title: '', plaintiff: '', defendant: '',
    prosecutor: '', lawyer: '', description: '', priority: 'normal'
  })

  const active = cases
    .filter(c => c.status === 'active')
    .filter(c => !search || [c.caseNumber, c.title, c.plaintiff, c.defendant]
      .some(f => f.toLowerCase().includes(search.toLowerCase())))
    .sort((a, b) => {
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
    setShowImport(false)
    setForm({ caseNumber: nextCaseNumber(), title: '', plaintiff: '', defendant: '', prosecutor: '', lawyer: '', description: '', priority: 'normal' })
    setShowCreate(true)
  }

  const handleUrlFill = (data: ParsedCase) => {
    setForm(prev => ({ ...prev, ...data }))
  }

  const openEdit = (c: Case) => {
    setShowCreate(false)
    setShowImport(false)
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

  // Inline JSX (not an inner component) — prevents remounting on re-render
  const formContent = (isCreate: boolean) => (
    <>
      {isCreate && !showImport && (
        <button className="import-toggle" onClick={() => setShowImport(true)}>
          {I.link} Импортировать с форума
        </button>
      )}
      {isCreate && showImport && (
        <ImportPanel onFill={handleUrlFill} onClose={() => setShowImport(false)} />
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
      <div className="input-group" style={{ marginBottom: 13 }}>
        <label className="input-label">Краткое описание</label>
        <textarea className="textarea" value={form.description} onChange={ff('description')} placeholder="Описание дела..." rows={3} />
      </div>
      <div className="input-group">
        <label className="input-label">Приоритет</label>
        <div className="seg">
          {(['normal', 'urgent'] as const).map(p => (
            <button
              key={p}
              type="button"
              className={`seg-btn ${form.priority === p ? (p === 'urgent' ? 'active-red' : 'active') : ''}`}
              onClick={() => setForm(prev => ({ ...prev, priority: p }))}
            >
              {p === 'normal' ? 'Обычный' : 'Срочный'}
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
          <div className="page-title">Иски в работе</div>
          <div className="page-subtitle">{active.length} {active.length === 1 ? 'дело' : active.length < 5 && active.length > 1 ? 'дела' : 'дел'}</div>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div className="search-box">
            {I.search}
            <input
              placeholder="Поиск дел..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={openNewCase}>{I.plus} Новый иск</button>
        </div>
      </div>

      {active.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3v18M5 6l7-3 7 3M3 21h18M6 21v-6M18 21v-6"/>
              <path d="M5 6l-2.5 6a3 3 0 0 0 5 0L5 6zM19 6l-2.5 6a3 3 0 0 0 5 0L19 6z"/>
            </svg>
          </div>
          <div className="empty-state-text">{search ? 'Ничего не найдено' : 'Нет активных дел'}</div>
          <div className="empty-state-sub">{!search && 'Нажмите «Новый иск» или Ctrl+N'}</div>
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
              <button className="btn btn-primary" onClick={handleCreate}>Создать дело</button>
            </>
          }
        >
          {formContent(true)}
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
          {formContent(false)}
        </Modal>
      )}
    </div>
  )
}
