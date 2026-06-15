import React, { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Case } from '../../types'
import { useApp } from '../../store/AppContext'

interface Props {
  case_: Case
  onOpen: () => void
  onEdit: () => void
}

export default function CaseCard({ case_: c, onOpen, onEdit }: Props) {
  const { pinCase, deleteCase, closeCase, reopenCase, duplicateCase, setView } = useApp()
  const [menu, setMenu] = useState(false)
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 })
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!menu) return
    const close = (e: MouseEvent) => {
      // Only close when clicking OUTSIDE the menu portal
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenu(false)
    }
    // Use capture phase so the event fires before any stopPropagation inside the card
    document.addEventListener('mousedown', close, true)
    return () => document.removeEventListener('mousedown', close, true)
  }, [menu])

  const openMenu = (e: React.MouseEvent) => {
    e.stopPropagation()
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    setMenuPos({ x: rect.right, y: rect.bottom + 4 })
    setMenu(true)
  }

  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })

  const docCount = c.documents.length
  const matCount = c.materials.length
  const barMax   = Math.max(docCount, 5)
  const barPct   = docCount === 0 ? 0 : Math.round((docCount / barMax) * 100)

  const today = new Date(); today.setHours(0, 0, 0, 0)
  const deadlineDate = c.deadline
    ? (() => { const d = new Date(c.deadline!); d.setHours(0,0,0,0); return d })()
    : null
  const isOverdue  = deadlineDate !== null && deadlineDate < today
  const isDueToday = deadlineDate !== null && deadlineDate.getTime() === today.getTime()

  const card = (
    <div
      className={`case-card${c.isPinned ? ' pinned' : ''}${isOverdue ? ' overdue' : isDueToday ? ' due-today' : ''}`}
      onClick={onOpen}
    >
      {/* Top row */}
      <div className="case-card-header">
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="case-number">
            {c.isPinned && (
              <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: 3 }}>
                <path d="M16 3l5 5-5.5 1.5L13 12l-1 5-3-3-5 5-1-1 5-5-3-3 5-1 2.5-2.5L14 3z"/>
              </svg>
            )}
            №{c.caseNumber}
            {c.priority === 'urgent' && (
              <span style={{
                marginLeft: 6, fontSize: 9, fontWeight: 800, letterSpacing: '.06em',
                color: '#fff', background: 'var(--red)',
                borderRadius: 'var(--r1)', padding: '1px 5px', verticalAlign: 'middle',
              }}>СРОЧНО</span>
            )}
          </div>
          <div className="case-title">{c.title || `${c.plaintiff} vs ${c.defendant}`}</div>
          <div className="case-vs">{c.plaintiff} · {c.defendant}</div>
        </div>

        {/* Actions — visible on hover */}
        <div className="case-actions" style={{ opacity: menu ? 1 : undefined }} onClick={e => e.stopPropagation()}>
          <button
            className="btn btn-icon btn-ghost btn-sm"
            onClick={openMenu}
            title="Действия"
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="currentColor">
              <circle cx="6.5" cy="2.5" r="1.1"/>
              <circle cx="6.5" cy="6.5" r="1.1"/>
              <circle cx="6.5" cy="10.5" r="1.1"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Meta row */}
      <div className="case-meta">
        {/* Status pill with pulsing dot */}
        <span className={`case-status ${c.status}`}>
          <span className="case-status-dot" />
          {c.status === 'active' ? 'В работе' : 'Закрыто'}
        </span>

        {/* Date */}
        <span className="case-meta-item">
          <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
            <rect x="1" y="1.5" width="8" height="7.5" rx="1"/>
            <path d="M3 1v1.5M7 1v1.5M1 4.5h8"/>
          </svg>
          {fmt(c.createdAt)}
        </span>

        {/* Doc count */}
        {docCount > 0 && (
          <span className="case-meta-item">
            <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
              <rect x="1" y="1" width="8" height="8" rx="1"/>
              <path d="M3 4h4M3 6.5h3"/>
            </svg>
            {docCount}
          </span>
        )}

        {/* Material count */}
        {matCount > 0 && (
          <span className="case-meta-item">
            <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
              <path d="M2 8.5V2a.5.5 0 01.5-.5h5l2 2v5a.5.5 0 01-.5.5H2.5a.5.5 0 01-.5-.5z"/>
            </svg>
            {matCount}
          </span>
        )}

        {/* Deadline badge */}
        {deadlineDate && (
          <span className="case-meta-item" style={{
            color: isOverdue ? 'var(--red)' : isDueToday ? 'var(--amber)' : 'var(--t3)',
            fontWeight: isOverdue || isDueToday ? 700 : 400,
          }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 10, height: 10 }}>
              <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>
            </svg>
            {deadlineDate.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' })}
          </span>
        )}
      </div>

      {/* Document progress bar */}
      <div className="case-doc-bar">
        <div className="case-doc-bar-track">
          <div className="case-doc-bar-fill" style={{ width: `${barPct}%` }} />
        </div>
        <div className="case-doc-bar-lbl">
          {docCount === 0 ? 'нет документов' : `${docCount} ${docCount === 1 ? 'документ' : docCount < 5 ? 'документа' : 'документов'}`}
        </div>
      </div>

    </div>
  )  // end const card

  // Render context menu via portal so it floats above ALL other content
  const contextMenu = menu ? ReactDOM.createPortal(
    <div
      ref={menuRef}
      className="ctx-menu"
      style={{ position: 'fixed', top: menuPos.y, left: menuPos.x - 190, zIndex: 99999 }}
      // Stop propagation so the capture-phase mousedown listener on document
      // does NOT fire when clicking items inside the menu itself
      onMouseDown={e => e.stopPropagation()}
    >
      <div className="ctx-item" onClick={() => { onOpen(); setMenu(false) }}>
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
          <circle cx="6.5" cy="6.5" r="5.5"/><path d="M4 6.5l2 2 3.5-3.5"/>
        </svg>
        Открыть
      </div>
      <div className="ctx-item" onClick={() => { pinCase(c.id); setMenu(false) }}>
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
          <path d="M3.5 1.5v4l-1.5 1h8l-1.5-1v-4"/><path d="M6.5 10.5v2"/>
        </svg>
        {c.isPinned ? 'Открепить' : 'Закрепить'}
      </div>
      <div className="ctx-item" onClick={() => { onEdit(); setMenu(false) }}>
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
          <path d="M2 10l1-3 6.5-6.5 2.5 2.5L5.5 9.5l-3 .5z"/>
        </svg>
        Редактировать
      </div>
      <div className="ctx-item" onClick={async () => {
        const d = await duplicateCase(c.id)
        setView({ type: 'case-workspace', caseId: d.id })
        setMenu(false)
      }}>
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
          <rect x="1.5" y="1.5" width="8.5" height="8.5" rx="1.5"/>
          <rect x="3" y="3" width="8.5" height="8.5" rx="1.5" fill="var(--bg-2)"/>
        </svg>
        Дублировать
      </div>
      <div className="ctx-divider" />
      {c.status === 'active' ? (
        <div className="ctx-item" onClick={() => { closeCase(c.id); setMenu(false) }}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
            <circle cx="6.5" cy="6.5" r="5.5"/><path d="M4 6.5l2 2 3.5-3.5"/>
          </svg>
          Закрыть дело
        </div>
      ) : (
        <div className="ctx-item" onClick={() => { reopenCase(c.id); setMenu(false) }}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
            <path d="M2 6.5a4.5 4.5 0 1 1 1.3 3.2"/><path d="M2 10V7h3"/>
          </svg>
          Вернуть в работу
        </div>
      )}
      <div className="ctx-item danger" onClick={() => {
        if (window.confirm(`Удалить дело №${c.caseNumber}?`)) { deleteCase(c.id); setMenu(false) }
      }}>
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
          <path d="M2 4h9M5 4V2.5h3V4M4.5 4.5l.5 6h3l.5-6"/>
        </svg>
        Удалить
      </div>
    </div>,
    document.body
  ) : null

  return (
    <>
      {card}
      {contextMenu}
    </>
  )
}
