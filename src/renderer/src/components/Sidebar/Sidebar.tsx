import React from 'react'
import { useApp } from '../../store/AppContext'
import { View } from '../../types'

const GROUPS = [
  {
    label: 'Обзор',
    items: [
      {
        icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg>,
        label: 'Дашборд', view: { type: 'dashboard' } as View, section: 'dashboard',
      },
    ],
  },
  {
    label: 'Дела',
    items: [
      {
        icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
        label: 'Иски в работе', view: { type: 'active-cases' } as View, section: 'active-cases',
      },
      {
        icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
        label: 'Закрытые иски', view: { type: 'closed-cases' } as View, section: 'closed-cases',
      },
    ],
  },
  {
    label: 'Документы',
    items: [
      {
        icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/></svg>,
        label: 'Шаблоны', view: { type: 'templates' } as View, section: 'templates',
      },
    ],
  },
]

export default function Sidebar() {
  const { view, setView, cases, settings } = useApp()

  const currentSection = (view.type === 'case-workspace' || view.type === 'document-editor')
    ? 'active-cases'
    : (view.type === 'template-editor' || view.type === 'template-builder' || view.type === 'additional-templates')
      ? 'templates'
      : view.type

  const activeCount = cases.filter(c => c.status === 'active').length
  const closedCount = cases.filter(c => c.status === 'closed').length
  const badges: Record<string, number> = {
    'active-cases': activeCount,
    'closed-cases': closedCount,
  }

  const judgeInitials =
    ((settings.judgeFirstName?.[0] || '') + (settings.judgeLastName?.[0] || '')) || 'СД'
  const judgeName =
    [settings.judgeLastName, settings.judgeFirstName].filter(Boolean).join(' ') || 'Судья'

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {GROUPS.map(group => (
          <div key={group.label}>
            <div className="sidebar-section-label">{group.label}</div>
            {group.items.map(item => (
              <button
                key={item.section}
                className={`sidebar-nav-item ${currentSection === item.section ? 'active' : ''}`}
                onClick={() => setView(item.view)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span style={{ flex: 1 }}>{item.label}</span>
                {badges[item.section] > 0 && (
                  <span className="nav-badge">{badges[item.section]}</span>
                )}
              </button>
            ))}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 0 }}>
          <div className="sidebar-footer-avatar">{judgeInitials}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="sidebar-footer-name">{judgeName}</div>
            <div className="sidebar-footer-role">{settings.position || 'Должность не указана'}</div>
          </div>
        </div>
        <button
          title="Настройки"
          onClick={() => setView({ type: 'settings' })}
          style={{
            flexShrink: 0, width: 28, height: 28, border: 'none', background: 'transparent',
            color: 'var(--t4)', cursor: 'pointer', borderRadius: 6, display: 'flex',
            alignItems: 'center', justifyContent: 'center', transition: 'color 0.13s, background 0.13s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--t1)'; (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-3)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--t4)'; (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
        </button>
      </div>
    </aside>
  )
}
