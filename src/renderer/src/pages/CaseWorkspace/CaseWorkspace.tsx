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

const TABS: { id: WorkspaceTab; icon: string; label: string }[] = [
  { id: 'documents',    icon: '📋', label: 'Документы' },
  { id: 'materials',   icon: '📎', label: 'Материалы' },
  { id: 'participants',icon: '👥', label: 'Участники' },
  { id: 'notes',       icon: '📝', label: 'Заметки' },
  { id: 'timeline',    icon: '🕐', label: 'Хронология' },
  { id: 'deadline',    icon: '🔔', label: 'Дедлайн' },
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
            {c.status === 'active' ? '● В работе' : '● Закрыто'}
          </span>
          {c.status === 'active' && (
            <button className="btn btn-secondary btn-sm" onClick={() => setShowClose(true)}>
              ✅ Закрыть дело
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
