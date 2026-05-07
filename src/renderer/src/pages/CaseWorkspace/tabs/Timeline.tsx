import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { Case, TimelineEventType } from '../../../types'
import { useApp } from '../../../store/AppContext'
import { formatDateForTimeline } from '../../../storage/storage'

interface Props { case_: Case }

export default function Timeline({ case_: c }: Props) {
  const { updateCase } = useApp()
  const [showAdd, setShowAdd] = useState(false)
  const [text, setText] = useState('')

  const addEvent = async () => {
    if (!text.trim()) return
    const ev = {
      id: uuid(),
      date: formatDateForTimeline(new Date()),
      event: text.trim(),
      type: 'custom' as TimelineEventType
    }
    await updateCase(c.id, { timeline: [...c.timeline, ev] })
    setText('')
    setShowAdd(false)
  }

  const sorted = [...c.timeline].sort((a, b) => {
    const da = new Date(a.date.split('.').reverse().join('-'))
    const db = new Date(b.date.split('.').reverse().join('-'))
    return db.getTime() - da.getTime()
  })

  return (
    <div className="timeline-area">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-2)' }}>
          Хронология дела
        </div>
        <button className="btn btn-secondary btn-sm" onClick={() => setShowAdd(p => !p)}>
          + Событие
        </button>
      </div>

      {showAdd && (
        <div style={{ marginBottom: 16, display: 'flex', gap: 8 }}>
          <input
            className="input"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Описание события..."
            autoFocus
            onKeyDown={e => { if (e.key === 'Enter') addEvent() }}
            style={{ flex: 1 }}
          />
          <button className="btn btn-primary" onClick={addEvent}>Добавить</button>
          <button className="btn btn-ghost" onClick={() => setShowAdd(false)}>✕</button>
        </div>
      )}

      {sorted.length === 0 ? (
        <div className="empty-state" style={{ height: 'auto', paddingTop: 40 }}>
          <div className="empty-state-icon">🕐</div>
          <div className="empty-state-text">Хронология пуста</div>
        </div>
      ) : (
        <div className="timeline-list">
          {sorted.map(ev => (
            <div key={ev.id} className="timeline-item">
              <div className={`timeline-dot dot-${ev.type}`} />
              <div className="timeline-date">{ev.date}</div>
              <div className="timeline-event">{ev.event}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
