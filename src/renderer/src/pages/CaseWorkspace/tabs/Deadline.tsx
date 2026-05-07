import React from 'react'
import { Case } from '../../../types'
import { useApp } from '../../../store/AppContext'

interface Props { case_: Case }

export default function Deadline({ case_: c }: Props) {
  const { updateCase } = useApp()

  const today = new Date(); today.setHours(0, 0, 0, 0)

  const deadlineDate = c.deadline
    ? (() => { const d = new Date(c.deadline!); d.setHours(0, 0, 0, 0); return d })()
    : null

  const isOverdue  = deadlineDate !== null && deadlineDate < today
  const isDueToday = deadlineDate !== null && deadlineDate.getTime() === today.getTime()

  const statusColor  = isOverdue ? 'var(--red)' : isDueToday ? 'var(--amber)' : 'var(--green)'
  const statusBg     = isOverdue ? 'var(--red-bg)' : isDueToday ? 'rgba(245,166,35,0.10)' : 'var(--green-bg)'
  const statusText   = isOverdue
    ? '⚠️ Дедлайн просрочен'
    : isDueToday
    ? '🔔 Дедлайн наступает сегодня'
    : '✅ Дедлайн установлен'

  const Card = ({ children }: { children: React.ReactNode }) => (
    <div style={{
      background: 'var(--bg-1)', border: '1px solid var(--line-1)',
      borderRadius: 'var(--r5)', padding: '18px 20px', marginBottom: 12,
    }}>
      {children}
    </div>
  )

  const Label = ({ children }: { children: React.ReactNode }) => (
    <div style={{ fontSize: 10.5, fontWeight: 600, color: 'var(--t2)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.07em' }}>
      {children}
    </div>
  )

  return (
    <div style={{ padding: 24, maxWidth: 540 }}>
      <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--t1)', marginBottom: 4 }}>Дедлайн и приоритет</div>
      <div style={{ fontSize: 12.5, color: 'var(--t3)', marginBottom: 22, lineHeight: 1.6 }}>
        Крайний срок рассмотрения дела. При наступлении дедлайна карточка подсвечивается,
        при следующем запуске приложения — всплывает системное уведомление.
      </div>

      {/* Deadline date picker */}
      <Card>
        <Label>Дата дедлайна</Label>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <input
            type="date"
            className="input"
            value={c.deadline ?? ''}
            onChange={e => updateCase(c.id, { deadline: e.target.value || undefined })}
            style={{ maxWidth: 200, fontFamily: 'var(--fm)', fontSize: 13 }}
          />
          {c.deadline && (
            <button
              className="btn btn-ghost btn-sm"
              style={{ color: 'var(--red)' }}
              onClick={() => updateCase(c.id, { deadline: undefined })}
            >
              Снять дедлайн
            </button>
          )}
        </div>

        {deadlineDate && (
          <div style={{
            marginTop: 12, padding: '9px 13px', borderRadius: 'var(--r2)',
            background: statusBg,
            border: `1px solid ${statusColor}`,
            fontSize: 12.5, color: statusColor, fontWeight: 600,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            {statusText}
            <span style={{ fontWeight: 400, color: statusColor, opacity: 0.8 }}>
              · {deadlineDate.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>
        )}
      </Card>

      {/* Priority */}
      <Card>
        <Label>Приоритет дела</Label>
        <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          {(['normal', 'urgent'] as const).map(p => {
            const active = (c.priority ?? 'normal') === p
            return (
              <button
                key={p}
                onClick={() => updateCase(c.id, { priority: p })}
                style={{
                  padding: '7px 18px',
                  border: `1px solid ${active ? (p === 'urgent' ? 'var(--red)' : 'var(--ac)') : 'var(--line-2)'}`,
                  borderRadius: 'var(--r2)',
                  background: active ? (p === 'urgent' ? 'var(--red-bg)' : 'var(--ac-bg)') : 'transparent',
                  color: active ? (p === 'urgent' ? 'var(--red)' : 'var(--ac2)') : 'var(--t3)',
                  cursor: 'pointer', fontWeight: 600, fontSize: 12.5,
                  transition: 'all 120ms',
                }}
              >
                {p === 'normal' ? '● Обычный' : '🔴 Срочный'}
              </button>
            )
          })}
        </div>
        <div style={{ fontSize: 11.5, color: 'var(--t3)', lineHeight: 1.5 }}>
          Срочные дела отображаются первыми в списке и помечаются красным бейджем «СРОЧНО».
        </div>
      </Card>
    </div>
  )
}
