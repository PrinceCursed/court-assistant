import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { Case, Participant, ParticipantRole } from '../../../types'
import { useApp } from '../../../store/AppContext'
import Modal from '../../../components/Modal/Modal'

interface Props { case_: Case }

const ROLE_ORDER: ParticipantRole[] = ['plaintiff', 'defendant', 'prosecutor', 'lawyer', 'judge']

interface RoleMeta { label: string; color: string; bg: string; border: string; icon: React.ReactNode }

const ROLE_META: Record<ParticipantRole, RoleMeta> = {
  judge: {
    label: 'Судья', color: 'var(--ac2)', bg: 'var(--ac-bg)', border: 'var(--ac-border)',
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 13l3-3m-7 7l3-3"/><path d="M3 21h18"/><path d="m9 7 4 4M5.5 10.5 10 6m4 4 4.5-4.5"/><path d="M2.5 8.5 8 3l3 3-5.5 5.5z"/><path d="M13 13l5.5 5.5"/></svg>,
  },
  plaintiff: {
    label: 'Истец', color: '#818cf8', bg: 'rgba(99,102,241,0.12)', border: 'rgba(99,102,241,0.42)',
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  },
  defendant: {
    label: 'Ответчик', color: '#f87171', bg: 'rgba(248,113,113,0.1)', border: 'rgba(248,113,113,0.4)',
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  },
  prosecutor: {
    label: 'Прокурор', color: '#fbbf24', bg: 'rgba(251,191,36,0.1)', border: 'rgba(251,191,36,0.4)',
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M7 6v13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V6M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/></svg>,
  },
  lawyer: {
    label: 'Адвокат', color: '#34d399', bg: 'rgba(52,211,153,0.1)', border: 'rgba(52,211,153,0.4)',
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M9 13h6M9 17h4"/></svg>,
  },
}

function initials(first: string, last: string): string {
  return ((first?.[0] || '') + (last?.[0] || '')).toUpperCase() || '—'
}

// ── Avatar ──────────────────────────────────────────────────────────────────
function Avatar({ first, last, meta, size = 40 }: { first: string; last: string; meta: RoleMeta; size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: size * 0.28, flexShrink: 0,
      background: meta.bg, border: `1px solid ${meta.border}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.34, fontWeight: 800, color: meta.color, letterSpacing: '-0.02em',
    }}>
      {initials(first, last)}
    </div>
  )
}

// ── Rich participant card ────────────────────────────────────────────────────
function ParticipantCard({ p, onEdit, onDelete, disabled }: {
  p: Participant; onEdit: () => void; onDelete: () => void; disabled: boolean
}) {
  const meta = ROLE_META[p.role]
  return (
    <div className="pcard" style={{ borderColor: meta.border, '--pcard-accent': meta.color } as React.CSSProperties}>
      <div style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
        <Avatar first={p.firstName} last={p.lastName} meta={meta} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            fontSize: 9.5, fontWeight: 700, color: meta.color, textTransform: 'uppercase',
            letterSpacing: '0.06em', background: meta.bg, border: `1px solid ${meta.border}`,
            borderRadius: 9999, padding: '2px 8px', marginBottom: 6,
          }}>
            {meta.icon}{meta.label}
          </div>
          <div style={{ fontSize: 14, fontWeight: 650, color: 'var(--t1)', lineHeight: 1.25, wordBreak: 'break-word' }}>
            {p.firstName} {p.lastName}
          </div>
          {p.position && <div style={{ fontSize: 11.5, color: 'var(--t2)', marginTop: 3 }}>{p.position}</div>}
        </div>
        {!disabled && (
          <div className="pcard-actions" style={{ display: 'flex', gap: 2, flexShrink: 0 }}>
            <button className="btn btn-ghost btn-sm btn-icon" onClick={onEdit} title="Редактировать">✏️</button>
            <button className="btn btn-ghost btn-sm btn-icon" style={{ color: 'var(--red)' }} onClick={onDelete} title="Удалить">🗑️</button>
          </div>
        )}
      </div>

      {(p.documentId || p.comment || (p.role === 'judge' && p.stampBase64)) && (
        <div style={{ marginTop: 11, paddingTop: 10, borderTop: '1px solid var(--line-1)', display: 'flex', flexDirection: 'column', gap: 7 }}>
          {p.documentId && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--t3)' }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 9h4M7 13h2"/></svg>
              <span style={{ fontFamily: 'var(--fm)' }}>{p.documentId}</span>
            </div>
          )}
          {p.role === 'judge' && p.stampBase64 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <img src={p.stampBase64} alt="Печать" style={{ width: 38, height: 38, objectFit: 'contain', background: '#fff', borderRadius: 7, border: '1px solid var(--line-2)', padding: 2 }} />
              <span style={{ fontSize: 10.5, color: 'var(--t3)' }}>печать в подписях дела</span>
            </div>
          )}
          {p.comment && (
            <div style={{ fontSize: 11.5, color: 'var(--t2)', lineHeight: 1.45 }}>{p.comment}</div>
          )}
        </div>
      )}
    </div>
  )
}

// ── Section header ───────────────────────────────────────────────────────────
function SectionHeader({ icon, label, count, action }: { icon: React.ReactNode; label: string; count?: number; action?: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 12 }}>
      <span style={{ display: 'flex', color: 'var(--ac2)' }}>{icon}</span>
      <h3 style={{ margin: 0, fontSize: 13, fontWeight: 700, letterSpacing: '0.02em', textTransform: 'uppercase', color: 'var(--t2)' }}>{label}</h3>
      {count !== undefined && (
        <span style={{ fontFamily: 'var(--fm)', fontSize: 10.5, fontWeight: 700, color: 'var(--t3)', background: 'var(--bg-3)', border: '1px solid var(--line-1)', borderRadius: 9999, padding: '1px 8px' }}>{count}</span>
      )}
      <div style={{ flex: 1, height: 1, background: 'var(--line-1)' }} />
      {action}
    </div>
  )
}

function EmptySlot({ text, color }: { text: string; color: string }) {
  return (
    <div style={{ border: `1px dashed ${color}`, borderRadius: 12, padding: '18px 16px', color: 'var(--t3)', fontSize: 12, textAlign: 'center' }}>
      {text}
    </div>
  )
}

export default function Participants({ case_: c }: Props) {
  const { updateCase, settings, setView } = useApp()
  const [showAdd, setShowAdd] = useState(false)
  const [editP, setEditP] = useState<Participant | null>(null)
  const [form, setForm] = useState<Omit<Participant, 'id'>>({
    role: 'plaintiff', firstName: '', lastName: '', documentId: '', position: '', comment: '',
  })

  const ff = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [key]: e.target.value }))

  const openAdd = (role: ParticipantRole = 'plaintiff') => {
    setForm({ role, firstName: '', lastName: '', documentId: '', position: '', comment: '' })
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
    await updateCase(c.id, { participants: c.participants.map(p => p.id === editP.id ? { ...editP, ...form } : p) })
    setEditP(null)
  }

  const handleDelete = async (id: string) => {
    await updateCase(c.id, { participants: c.participants.filter(p => p.id !== id) })
  }

  const byRole = (role: ParticipantRole) => c.participants.filter(p => p.role === role)
  const plaintiffs = byRole('plaintiff')
  const defendants = byRole('defendant')
  const prosecutors = byRole('prosecutor')
  const lawyers = byRole('lawyer')
  const collegium = byRole('judge')
  const disabled = c.status === 'closed'

  const presidingName = `${settings.judgeLastName || ''} ${settings.judgeFirstName || ''}`.trim() || 'Судья не указан'
  const presidingPos = settings.position || 'Окружной судья'

  // ── Add/Edit form ───────────────────────────────────────────────────────────
  const isJudge = form.role === 'judge'
  const formContent = (
    <>
      <div className="input-group">
        <label className="input-label">Роль</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {ROLE_ORDER.map(r => {
            const m = ROLE_META[r]
            const active = form.role === r
            return (
              <button
                key={r} type="button"
                onClick={() => setForm(p => ({ ...p, role: r }))}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 13px',
                  borderRadius: 9, cursor: 'pointer', fontFamily: 'inherit', fontSize: 12, fontWeight: 600,
                  background: active ? m.bg : 'var(--bg-3)',
                  color: active ? m.color : 'var(--t2)',
                  border: `1px solid ${active ? m.border : 'var(--line-1)'}`,
                  transition: 'all 0.13s',
                }}
              >
                {m.icon}{m.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="form-row form-row-2">
        <div className="input-group">
          <label className="input-label">Имя *</label>
          <input className="input" value={form.firstName} onChange={ff('firstName')} placeholder="Имя" autoFocus />
        </div>
        <div className="input-group">
          <label className="input-label">Фамилия *</label>
          <input className="input" value={form.lastName} onChange={ff('lastName')} placeholder="Фамилия" />
        </div>
      </div>

      <div className="form-row form-row-2">
        <div className="input-group">
          <label className="input-label">{isJudge ? 'Должность' : 'Должность / структура'}</label>
          <input className="input" value={form.position} onChange={ff('position')} placeholder={isJudge ? 'Окружной судья' : 'Должность, звание или гос. структура'} />
        </div>
        <div className="input-group">
          <label className="input-label">Документ / Жетон</label>
          <input className="input" value={form.documentId} onChange={ff('documentId')} placeholder="Паспорт, ИНН, жетон..." />
        </div>
      </div>

      <div className="input-group">
        <label className="input-label">Комментарий</label>
        <textarea className="textarea" value={form.comment} onChange={ff('comment')} placeholder="Дополнительная информация..." rows={2} />
      </div>

      {isJudge && (
        <div className="input-group" style={{ background: 'var(--ac-dim, var(--bg-3))', border: '1px solid var(--ac-border)', borderRadius: 11, padding: '13px 14px' }}>
          <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: 7, color: 'var(--ac2)' }}>
            {ROLE_META.judge.icon} Печать судьи (коллегия)
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
            {form.stampBase64 ? (
              <img src={form.stampBase64} alt="Печать" style={{ width: 64, height: 64, objectFit: 'contain', background: '#fff', borderRadius: 10, border: '1px solid var(--line-2)', padding: 4 }} />
            ) : (
              <div style={{ width: 64, height: 64, borderRadius: 10, border: '1px dashed var(--ac-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--t4)', fontSize: 22 }}>⊚</div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <button type="button" className="btn btn-secondary btn-sm" onClick={handleStampUpload}>
                {form.stampBase64 ? 'Заменить печать' : 'Загрузить печать'}
              </button>
              {form.stampBase64 && (
                <button type="button" className="btn btn-ghost btn-sm" style={{ color: 'var(--red)' }} onClick={() => setForm(p => ({ ...p, stampBase64: undefined }))}>
                  Удалить
                </button>
              )}
            </div>
          </div>
          <div style={{ fontSize: 11, color: 'var(--t3)', marginTop: 10, lineHeight: 1.5 }}>
            Судья-участник входит в коллегиальный состав <strong>этого дела</strong>: его подпись и печать добавляются в блок подписей всех документов дела. На другие дела не влияет.
          </div>
        </div>
      )}
    </>
  )

  return (
    <div className="participants-area" style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
      {/* Top bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--t1)' }}>Участники дела</div>
          <div style={{ fontSize: 12, color: 'var(--t3)', marginTop: 2 }}>
            {c.participants.length === 0 ? 'Никого не добавлено' : `${c.participants.length} ${c.participants.length === 1 ? 'участник' : c.participants.length < 5 ? 'участника' : 'участников'} · ${plaintiffs.length} / ${defendants.length} стороны`}
          </div>
        </div>
        {!disabled && (
          <button className="btn btn-primary" onClick={() => openAdd('plaintiff')}>+ Добавить участника</button>
        )}
      </div>

      {/* ── Судейская коллегия ── */}
      <div>
        <SectionHeader
          icon={ROLE_META.judge.icon}
          label="Судейская коллегия"
          count={1 + collegium.length}
          action={!disabled && (
            <button className="btn btn-secondary btn-sm" onClick={() => openAdd('judge')}>+ Судья в коллегию</button>
          )}
        />
        <div className="pcards-grid">
          {/* Presiding judge — from settings */}
          <div className="pcard pcard-presiding" style={{ borderColor: 'var(--ac-border)', '--pcard-accent': 'var(--ac2)' } as React.CSSProperties}>
            <div style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
              <Avatar first={settings.judgeFirstName || ''} last={settings.judgeLastName || ''} meta={ROLE_META.judge} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  fontSize: 9.5, fontWeight: 700, color: 'var(--ac-fg, #16130f)', textTransform: 'uppercase',
                  letterSpacing: '0.06em', background: 'var(--ac)', borderRadius: 9999, padding: '2px 9px', marginBottom: 6,
                }}>
                  ★ Председательствующий
                </div>
                <div style={{ fontSize: 14, fontWeight: 650, color: 'var(--t1)', lineHeight: 1.25 }}>{presidingName}</div>
                <div style={{ fontSize: 11.5, color: 'var(--t2)', marginTop: 3 }}>{presidingPos}</div>
              </div>
            </div>
            <div style={{ marginTop: 11, paddingTop: 10, borderTop: '1px solid var(--line-1)', display: 'flex', alignItems: 'center', gap: 8 }}>
              {settings.stampBase64 ? (
                <img src={settings.stampBase64} alt="Печать" style={{ width: 38, height: 38, objectFit: 'contain', background: '#fff', borderRadius: 7, border: '1px solid var(--line-2)', padding: 2 }} />
              ) : (
                <span style={{ fontSize: 10.5, color: 'var(--t4)' }}>печать не загружена</span>
              )}
              <button className="btn btn-ghost btn-sm" style={{ marginLeft: 'auto', fontSize: 11 }} onClick={() => setView({ type: 'settings' })}>
                ⚙ Настройки судьи
              </button>
            </div>
          </div>

          {/* Collegium judges */}
          {collegium.map(p => (
            <ParticipantCard key={p.id} p={p} onEdit={() => openEdit(p)} onDelete={() => handleDelete(p.id)} disabled={disabled} />
          ))}

          {!disabled && collegium.length === 0 && (
            <button onClick={() => openAdd('judge')} className="pcard pcard-add" type="button">
              <span style={{ fontSize: 24, lineHeight: 1 }}>＋</span>
              <span>Добавить судью<br/>в коллегию</span>
            </button>
          )}
        </div>
      </div>

      {/* ── Стороны ── */}
      <div>
        <SectionHeader
          icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
          label="Стороны процесса"
        />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 16, alignItems: 'start' }}>
          {/* Plaintiffs */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: ROLE_META.plaintiff.color, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 9, display: 'flex', alignItems: 'center', gap: 6 }}>
              {ROLE_META.plaintiff.icon} Истцы {plaintiffs.length > 0 && `· ${plaintiffs.length}`}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {plaintiffs.length > 0
                ? plaintiffs.map(p => <ParticipantCard key={p.id} p={p} onEdit={() => openEdit(p)} onDelete={() => handleDelete(p.id)} disabled={disabled} />)
                : <EmptySlot text="Истец не указан" color="rgba(99,102,241,0.35)" />}
              {!disabled && (
                <button onClick={() => openAdd('plaintiff')} className="pcard-add pcard-add-sm" type="button">＋ Истец</button>
              )}
            </div>
          </div>

          {/* VS */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 30, gap: 8 }}>
            <div style={{
              width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 800, color: 'var(--t2)', background: 'var(--bg-2)', border: '1px solid var(--line-2)',
            }}>VS</div>
          </div>

          {/* Defendants */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: ROLE_META.defendant.color, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 9, display: 'flex', alignItems: 'center', gap: 6 }}>
              {ROLE_META.defendant.icon} Ответчики {defendants.length > 0 && `· ${defendants.length}`}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {defendants.length > 0
                ? defendants.map(p => <ParticipantCard key={p.id} p={p} onEdit={() => openEdit(p)} onDelete={() => handleDelete(p.id)} disabled={disabled} />)
                : <EmptySlot text="Ответчик не указан" color="rgba(248,113,113,0.35)" />}
              {!disabled && (
                <button onClick={() => openAdd('defendant')} className="pcard-add pcard-add-sm" type="button">＋ Ответчик</button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Иные участники ── */}
      {(prosecutors.length > 0 || lawyers.length > 0 || !disabled) && (
        <div>
          <SectionHeader
            icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 12 0v1"/><path d="M18 8h4M20 6v4"/></svg>}
            label="Иные участники"
            count={prosecutors.length + lawyers.length}
          />
          {prosecutors.length === 0 && lawyers.length === 0 ? (
            <div style={{ display: 'flex', gap: 8 }}>
              {!disabled && <button onClick={() => openAdd('prosecutor')} className="pcard-add pcard-add-sm" type="button">＋ Прокурор</button>}
              {!disabled && <button onClick={() => openAdd('lawyer')} className="pcard-add pcard-add-sm" type="button">＋ Адвокат</button>}
            </div>
          ) : (
            <div className="pcards-grid">
              {prosecutors.map(p => <ParticipantCard key={p.id} p={p} onEdit={() => openEdit(p)} onDelete={() => handleDelete(p.id)} disabled={disabled} />)}
              {lawyers.map(p => <ParticipantCard key={p.id} p={p} onEdit={() => openEdit(p)} onDelete={() => handleDelete(p.id)} disabled={disabled} />)}
            </div>
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
