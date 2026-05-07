import React from 'react'
import { useApp } from '../../store/AppContext'
import { View } from '../../types'

interface NavItem {
  icon: string
  label: string
  view: View
  section: string
}

const NAV: NavItem[] = [
  { icon: '⚖️', label: 'Иски в работе',          view: { type: 'active-cases' },        section: 'active-cases' },
  { icon: '✅', label: 'Закрытые иски',           view: { type: 'closed-cases' },        section: 'closed-cases' },
  { icon: '📄', label: 'Шаблоны документов',      view: { type: 'templates' },           section: 'templates' },
  { icon: '📂', label: 'Дополнительные шаблоны',  view: { type: 'additional-templates' },section: 'additional-templates' },
  { icon: '⚙️', label: 'Настройки',               view: { type: 'settings' },            section: 'settings' }
]

export default function Sidebar() {
  const { view, setView, cases } = useApp()

  const currentSection = (view.type === 'case-workspace' || view.type === 'document-editor')
    ? 'active-cases'
    : view.type === 'template-editor'
      ? (view.from ?? 'templates')
      : view.type

  const activeCount = cases.filter(c => c.status === 'active').length
  const closedCount = cases.filter(c => c.status === 'closed').length

  const badges: Record<string, number> = {
    'active-cases': activeCount,
    'closed-cases': closedCount
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          Навигация
        </div>
      </div>

      <nav className="sidebar-nav">
        {NAV.map(item => (
          <button
            key={item.section}
            className={`sidebar-nav-item ${currentSection === item.section ? 'active' : ''}`}
            onClick={() => setView(item.view)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span style={{ flex: 1 }}>{item.label}</span>
            {badges[item.section] !== undefined && badges[item.section] > 0 && (
              <span className="nav-badge">{badges[item.section]}</span>
            )}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        Разработано Prince Cursed<br />
        по всем вопросам ds: saint.prince
      </div>
    </aside>
  )
}
