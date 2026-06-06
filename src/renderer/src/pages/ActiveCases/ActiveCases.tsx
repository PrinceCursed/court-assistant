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

export default function ActiveCases() {
  const { cases, createCase, updateCase, setView, openCase, nextCaseNumber } = useApp()
  const [showCreate, setShowCreate] = useState(false)
  const [editCase, setEditCase] = useState<Case | null>(null)
  const [search, setSearch] = useState('')
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
    setForm({ caseNumber: nextCaseNumber(), title: '', plaintiff: '', defendant: '', prosecutor: '', lawyer: '', description: '', priority: 'normal' })
    setShowCreate(true)
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
