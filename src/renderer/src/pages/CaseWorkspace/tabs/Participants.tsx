import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { Case, Participant, ParticipantRole, PARTICIPANT_ROLE_LABELS } from '../../../types'
import { useApp } from '../../../store/AppContext'
import Modal from '../../../components/Modal/Modal'

function judgeFullName(s: { judgeFirstName: string; judgeLastName: string; position: string }): string {
  return `${s.judgeFirstName} ${s.judgeLastName}`.trim() || 'Судья'
}

interface Props { case_: Case }

const ROLE_ORDER: ParticipantRole[] = ['plaintiff', 'defendant', 'prosecutor', 'lawyer', 'judge']

const ROLE_COLORS: Record<ParticipantRole, { bg: string; border: string; text: string }> = {
  judge:      { bg: '#1a3a6e', border: '#c8a84b', text: '#c8a84b' },
  plaintiff:  { bg: 'rgba(99,102,241,0.15)', border: 'rgba(99,102,241,0.5)', text: '#a5b4fc' },
  defendant:  { bg: 'rgba(248,113,113,0.1)', border: 'rgba(248,113,113,0.4)', text: '#f87171' },
  prosecutor: { bg: 'rgba(251,191,36,0.1)', border: 'rgba(251,191,36,0.4)', text: '#fbbf24' },
  lawyer:     { bg: 'rgba(52,211,153,0.1)', border: 'rgba(52,211,153,0.4)', text: '#34d399' },
}

function ParticipantCard({ p, onEdit, onDelete, disabled }: {
  p: Participant
  onEdit: () => void
  onDelete: () => void
  disabled: boolean
}) {
  const colors = ROLE_COLORS[p.role]
  return (
    <div style={{
      background: colors.bg,
      border: `1px solid ${colors.border}`,
      borderRadius: 12,
      padding: '14px 16px',
      minWidth: 160,
      maxWidth: 220,
      flex: '0 0 auto',
      position: 'relative'
    }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: colors.text, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
        {PARTICIPANT_ROLE_LABELS[p.role]}
      </div>
      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-1)', lineHeight: 1.3 }}>
        {p.firstName} {p.lastName}
      </div>
      {p.position && (
        <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 4 }}>{p.position}</div>
      )}
      {p.documentId && (
        <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 4 }}>ID: {p.documentId}</div>
      )}
      {p.comment && (
        <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 6, lineHeight: 1.4, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 6 }}>
          {p.comment}
        </div>
      )}
      {!disabled && (
        <div style={{ display: 'flex', gap: 4, marginTop: 10, justifyContent: 'flex-end' }}>
          <button className="btn btn-ghost btn-sm btn-icon" onClick={onEdit} title="Редактировать">✏️</button>
          <button className="btn btn-ghost btn-sm btn-icon" style={{ color: 'var(--red)' }} onClick={onDelete} title="Удалить">🗑️</button>
        </div>
      )}
    </div>
  )
}

function ConnectorLine({ direction = 'down' }: { direction?: 'down' | 'both' }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      height: 36, justifyContent: 'center'
    }}>
      <div style={{ width: 2, height: 36, background: 'linear-gradient(to bottom, rgba(99,102,241,0.4), rgba(99,102,241,0.1))' }} />
    </div>
  )
}

function HConnector() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 0, width: '100%', justifyContent: 'center' }}>
      <div style={{ height: 2, flex: 1, maxWidth: 120, background: 'linear-gradient(to right, rgba(99,102,241,0.1), rgba(99,102,241,0.3))' }} />
      <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(99,102,241,0.4)', margin: '0 4px' }} />
      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-3)', padding: '4px 16px', border: '1px solid var(--border-1)', borderRadius: 20, background: 'var(--bg-elevated)' }}>
        VS
      </div>
      <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(248,113,113,0.4)', margin: '0 4px' }} />
      <div style={{ height: 2, flex: 1, maxWidth: 120, background: 'linear-gradient(to left, rgba(248,113,113,0.1), rgba(248,113,113,0.3))' }} />
    </div>
  )
}

export default function Participants({ case_: c }: Props) {
  const { updateCase, settings } = useApp()
  const [showAdd, setShowAdd] = useState(false)
  const [editP, setEditP] = useState<Participant | null>(null)
  const [viewMode, setViewMode] = useState<'diagram' | 'list'>('diagram')
  const [form, setForm] = useState<Omit<Participant, 'id'>>({
    role: 'plaintiff', firstName: '', lastName: '', documentId: '', position: '', comment: ''
  })

  const ff = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [key]: e.target.value }))

  const openAdd = () => {
    setForm({ role: 'plaintiff', firstName: '', lastName: '', documentId: '', position: '', comment: '' })
    setShowAdd(true)
  }

  const openEdit = (p: Participant) => {
    setForm({ role: p.role, firstName: p.firstName, lastName: p.lastName, documentId: p.documentId || '', position: p.position || '', comment: p.comment || '', stampBase64: p.stampBase64 })
    setEditP(p)
  }

  const handleStampUpload = async () => {
    const path = await window.api.selectFile([{ name: 'Изображения', extensions: ['png', 'jpg', 'jpeg', 'gif', 'webp'] }])
    if (!path) return
    const base64 = await window.api.readBinary(path)
    if (base64) setForm(p => ({ ...p, stampBase64: base64 }))
  }

  const handleAdd = async () => {
    if (!form.firstName.trim() && !form.lastName.trim()) return
    await updateCase(c.id, { participants: [...c.participants, { id: uuid(), ...form }] })
    setShowAdd(false)
  }

  const handleEdit = async () => {
    if (!editP) return
    await updateCase(c.id, {
      participants: c.participants.map(p => p.id === editP.id ? { ...editP, ...form } : p)
    })
    setEditP(null)
  }

  const handleDelete = async (id: string) => {
    await updateCase(c.id, { participants: c.participants.filter(p => p.id !== id) })
  }

  const byRole = (role: ParticipantRole) => c.participants.filter(p => p.role === role)
  const judge = byRole('judge')[0]
  const plaintiffs = byRole('plaintiff')
  const defendants = byRole('defendant')
  const prosecutors = byRole('prosecutor')
  const lawyers = byRole('lawyer')
  const disabled = c.status === 'closed'

  const formContent = (
    <>
      <div className="form-row form-row-2">
        <div className="input-group">
          <label className="input-label">Роль *</label>
          <select className="select" value={form.role} onChange={ff('role')}>
            {ROLE_ORDER.map(r => <option key={r} value={r}>{PARTICIPANT_ROLE_LABELS[r]}</option>)}
          </select>
        </div>
        <div className="input-group">
          <label className="input-label">Документ / ID</label>
          <input className="input" value={form.documentId} onChange={ff('documentId')} placeholder="Паспорт, ИНН..." />
        </div>
      </div>
      <div className="form-row form-row-2">
        <div className="input-group">
          <label className="input-label">Имя *</label>
          <input className="input" value={form.firstName} onChange={ff('firstName')} placeholder="Имя" />
        </div>
        <div className="input-group">
          <label className="input-label">Фамилия *</label>
          <input className="input" value={form.lastName} onChange={ff('lastName')} placeholder="Фамилия" />
        </div>
      </div>
      <div className="input-group">
        <label className="input-label">Должность</label>
        <input className="input" value={form.position} onChange={ff('position')} placeholder="Должность или звание" />
      </div>
      <div className="input-group">
        <label className="input-label">Комментарий</label>
        <textarea className="textarea" value={form.comment} onChange={ff('comment')} placeholder="Дополнительная информация..." rows={2} />
      </div>
      {form.role === 'judge' && (
        <div className="input-group">
          <label className="input-label">Печать судьи</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {form.stampBase64 && (
              <img src={form.stampBase64} alt="Печать" style={{ width: 56, height: 56, objectFit: 'contain', background: '#fff', borderRadius: 8, border: '1px solid var(--border-1)', padding: 3 }} />
            )}
            <button type="button" className="btn btn-secondary btn-sm" onClick={handleStampUpload}>
              {form.stampBase64 ? 'Заменить' : 'Загрузить печать'}
            </button>
            {form.stampBase64 && (
              <button type="button" className="btn btn-ghost btn-sm" style={{ color: 'var(--red)' }} onClick={() => setForm(p => ({ ...p, stampBase64: undefined }))}>
                Удалить
              </button>
            )}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 6, lineHeight: 1.5 }}>
            Судья-участник попадает в блок подписей всех документов этого дела (коллегиальный состав). На другие дела не влияет.
          </div>
        </div>
      )}
    </>
  )

  return (
    <div className="participants-area">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            className={`btn btn-sm ${viewMode === 'diagram' ? 'btn-secondary' : 'btn-ghost'}`}
            onClick={() => setViewMode('diagram')}
          >⬡ Схема</button>
          <button
            className={`btn btn-sm ${viewMode === 'list' ? 'btn-secondary' : 'btn-ghost'}`}
            onClick={() => setViewMode('list')}
          >≡ Список</button>
        </div>
        <button className="btn btn-primary btn-sm" onClick={openAdd} disabled={disabled}>
          + Участник
        </button>
      </div>

      {c.participants.length === 0 ? (
        <div className="empty-state" style={{ height: 'auto', paddingTop: 60 }}>
          <div className="empty-state-icon">👥</div>
          <div className="empty-state-text">Участников нет</div>
        </div>
      ) : viewMode === 'list' ? (
        <div className="participant-grid">
          {[...c.participants].sort((a, b) => ROLE_ORDER.indexOf(a.role) - ROLE_ORDER.indexOf(b.role)).map(p => (
            <div key={p.id} className="card participant-card">
              <div className={`participant-role-badge role-${p.role}`}>{PARTICIPANT_ROLE_LABELS[p.role]}</div>
              <div className="participant-name">{p.firstName} {p.lastName}</div>
              {p.position && <div className="participant-detail">{p.position}</div>}
              {p.documentId && <div className="participant-detail" style={{ color: 'var(--text-3)', fontSize: 11, marginTop: 4 }}>ID: {p.documentId}</div>}
              {p.comment && <div className="participant-detail" style={{ fontSize: 11, marginTop: 6, color: 'var(--text-2)', lineHeight: 1.4 }}>{p.comment}</div>}
              {!disabled && (
                <div style={{ display: 'flex', gap: 4, marginTop: 10 }}>
                  <button className="btn btn-ghost btn-sm" onClick={() => openEdit(p)}>✏️ Ред.</button>
                  <button className="btn btn-ghost btn-sm" style={{ color: 'var(--red)' }} onClick={() => handleDelete(p.id)}>🗑️</button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        /* Diagram view */
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, paddingBottom: 40, minHeight: 400 }}>
          {/* Court header */}
          <div style={{
            background: '#1a3a6e', border: '2px solid #c8a84b', borderRadius: 12,
            padding: '10px 32px', textAlign: 'center', marginBottom: 0
          }}>
            <div style={{ fontSize: 10, letterSpacing: '0.1em', color: '#c8a84b', textTransform: 'uppercase', marginBottom: 2 }}>
              ОКРУЖНОЙ СУД
            </div>
            <div style={{ fontSize: 11, color: '#8ca8d4' }}>⚖️ {judgeFullName(settings)}</div>
            {settings.position && (
              <div style={{ fontSize: 10, color: '#6a8ab4', marginTop: 2 }}>{settings.position}</div>
            )}
          </div>

          <ConnectorLine />

          {/* Judge */}
          {judge ? (
            <ParticipantCard p={judge} onEdit={() => openEdit(judge)} onDelete={() => handleDelete(judge.id)} disabled={disabled} />
          ) : (
            <div style={{ border: '1px dashed var(--border-2)', borderRadius: 12, padding: '12px 24px', color: 'var(--text-3)', fontSize: 12 }}>
              Судья не назначен
            </div>
          )}

          <ConnectorLine />

          {/* Plaintiff VS Defendant row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0, width: '100%', maxWidth: 600 }}>
            {/* Plaintiff side */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
              {plaintiffs.length > 0 ? plaintiffs.map(p => (
                <ParticipantCard key={p.id} p={p} onEdit={() => openEdit(p)} onDelete={() => handleDelete(p.id)} disabled={disabled} />
              )) : (
                <div style={{ border: '1px dashed rgba(99,102,241,0.3)', borderRadius: 12, padding: '12px 20px', color: 'var(--text-3)', fontSize: 12, minWidth: 140, textAlign: 'center' }}>
                  Истец не указан
                </div>
              )}
            </div>

            {/* VS connector */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 12px' }}>
              <HConnector />
            </div>

            {/* Defendant side */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
              {defendants.length > 0 ? defendants.map(p => (
                <ParticipantCard key={p.id} p={p} onEdit={() => openEdit(p)} onDelete={() => handleDelete(p.id)} disabled={disabled} />
              )) : (
                <div style={{ border: '1px dashed rgba(248,113,113,0.3)', borderRadius: 12, padding: '12px 20px', color: 'var(--text-3)', fontSize: 12, minWidth: 140, textAlign: 'center' }}>
                  Ответчик не указан
                </div>
              )}
            </div>
          </div>

          {/* Prosecutor & Lawyer row */}
          {(prosecutors.length > 0 || lawyers.length > 0) && (
            <>
              <div style={{ display: 'flex', width: '100%', maxWidth: 600 }}>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                  {prosecutors.length > 0 && <ConnectorLine />}
                </div>
                <div style={{ width: 80 }} />
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                  {lawyers.length > 0 && <ConnectorLine />}
                </div>
              </div>

              <div style={{ display: 'flex', width: '100%', maxWidth: 600, gap: 0 }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  {prosecutors.map(p => (
                    <ParticipantCard key={p.id} p={p} onEdit={() => openEdit(p)} onDelete={() => handleDelete(p.id)} disabled={disabled} />
                  ))}
                </div>
                <div style={{ width: 80 }} />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  {lawyers.map(p => (
                    <ParticipantCard key={p.id} p={p} onEdit={() => openEdit(p)} onDelete={() => handleDelete(p.id)} disabled={disabled} />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {showAdd && (
        <Modal title="Новый участник" onClose={() => setShowAdd(false)}
          footer={<><button className="btn btn-ghost" onClick={() => setShowAdd(false)}>Отмена</button><button className="btn btn-primary" onClick={handleAdd}>Добавить</button></>}>
          {formContent}
        </Modal>
      )}

      {editP && (
        <Modal title="Редактировать участника" onClose={() => setEditP(null)}
          footer={<><button className="btn btn-ghost" onClick={() => setEditP(null)}>Отмена</button><button className="btn btn-primary" onClick={handleEdit}>Сохранить</button></>}>
          {formContent}
        </Modal>
      )}
    </div>
  )
}
