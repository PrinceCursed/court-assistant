import React, { useState } from 'react'
import { useApp } from '../../store/AppContext'
import { WorkspaceTab } from '../../types'
import Modal from '../../components/Modal/Modal'
import Documents from './tabs/Documents'
import Materials from './tabs/Materials'
import Participants from './tabs/Participants'
import Notes from './tabs/Notes'
import Timeline from './tabs/Timeline'
import Deadline from './tabs/Deadline'

interface Props {
  caseId: string
  initialTab?: WorkspaceTab
}

const TABS: { id: WorkspaceTab; icon: React.ReactNode; label: string }[] = [
  { id: 'documents', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M9 13h6M9 17h4"/></svg>, label: 'Документы' },
  { id: 'materials', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>, label: 'Материалы' },
  { id: 'participants', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, label: 'Участники' },
  { id: 'notes', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>, label: 'Заметки' },
  { id: 'timeline', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, label: 'Хронология' },
  { id: 'deadline', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>, label: 'Дедлайн' },
]

export default function CaseWorkspace({ caseId, initialTab }: Props) {
  const { cases, setView, closeCase } = useApp()
  const [tab, setTab] = useState<WorkspaceTab>(initialTab || 'documents')
  const [showClose, setShowClose] = useState(false)

  const c = cases.find(x => x.id === caseId)
  if (!c) return <div className="empty-state"><div className="empty-state-text">Дело не найдено</div></div>

  const handleClose = async () => {
    await closeCase(c.id)
    setShowClose(false)
  }

  const renderTab = () => {
    switch (tab) {
      case 'documents':    return <Documents case_={c} />
      case 'materials':    return <Materials case_={c} />
      case 'participants': return <Participants case_={c} />
      case 'notes':        return <Notes case_={c} />
      case 'timeline':     return <Timeline case_={c} />
      case 'deadline':     return <Deadline case_={c} />
    }
  }

  return (
    <div className="workspace">
      <div className="workspace-header">
        <button className="workspace-back" onClick={() => setView({ type: 'active-cases' })} title="Назад">
          ←
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="workspace-case-number">№{c.caseNumber}</div>
          <div className="workspace-case-title" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {c.title || `${c.plaintiff} vs ${c.defendant}`}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
          <span className={`case-status ${c.status}`}>
            <span className="case-status-dot" />
            {c.status === 'active' ? 'В работе' : 'Закрыто'}
          </span>
          {c.status === 'active' && (
            <button className="btn btn-secondary btn-sm" onClick={() => setShowClose(true)}>
              Закрыть дело
            </button>
          )}
        </div>
      </div>

      <div className="workspace-tabs">
        {TABS.map(t => (
          <button
            key={t.id}
            className={`workspace-tab ${tab === t.id ? 'active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      <div className="workspace-content">
        {renderTab()}
      </div>

      {showClose && (
        <Modal
          title="Закрыть дело"
          onClose={() => setShowClose(false)}
          width={400}
          footer={
            <>
              <button className="btn btn-ghost" onClick={() => setShowClose(false)}>Отмена</button>
              <button className="btn btn-primary" onClick={handleClose}>Закрыть дело</button>
            </>
          }
        >
          <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>
            Дело <strong style={{ color: 'var(--t1)' }}>№{c.caseNumber}</strong> будет перемещено в архив закрытых дел.
            Все документы и материалы сохранятся.
          </div>
        </Modal>
      )}
    </div>
  )
}
