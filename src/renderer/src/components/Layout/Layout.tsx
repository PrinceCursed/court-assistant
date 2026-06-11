import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import RightPanel from '../RightPanel/RightPanel'
import { useApp } from '../../store/AppContext'

interface Props { children: React.ReactNode }

export default function Layout({ children }: Props) {
  const { view } = useApp()
  const isEditor = view.type === 'document-editor'

  return (
    <div className="app-shell">
      <Titlebar />
      <div className="app-body">
        <Sidebar />
        <div className="main-area">{children}</div>
        {!isEditor && <RightPanel />}
      </div>
    </div>
  )
}

/** Red spider lily (higanbana) — logo for the cursed theme */
function LilyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#ff4757" strokeWidth="1.2" strokeLinecap="round">
      {/* stem */}
      <path d="M12 22.5v-8" />
      {/* curled petals */}
      <path d="M12 15c-1.6-2-4.2-2.4-6.5-1.2 1-2.6 3.6-3.6 6.5-2.8" />
      <path d="M12 15c1.6-2 4.2-2.4 6.5-1.2-1-2.6-3.6-3.6-6.5-2.8" />
      <path d="M12 14.5c-2-1-3-3.2-2.5-5.7 1.8.9 2.8 2.9 2.5 5.4" />
      <path d="M12 14.5c2-1 3-3.2 2.5-5.7-1.8.9-2.8 2.9-2.5 5.4" />
      {/* spidery stamens */}
      <path d="M12 13.5C9.2 10.5 7.8 7.6 7.4 4.8" />
      <path d="M12 13.5c-.8-3.6-.4-6.6.2-8.8" />
      <path d="M12 13.5c2.8-3 4.2-5.9 4.6-8.7" />
      <path d="M12 13.5C10 9.8 6.4 7.6 3.2 7" />
      <path d="M12 13.5c2-3.7 5.6-5.9 8.8-6.5" />
      <circle cx="7.4" cy="4.8" r=".8" fill="#ff4757" stroke="none" />
      <circle cx="12.2" cy="4.7" r=".8" fill="#ff4757" stroke="none" />
      <circle cx="16.6" cy="4.8" r=".8" fill="#ff4757" stroke="none" />
      <circle cx="3.2" cy="7" r=".8" fill="#ff4757" stroke="none" />
      <circle cx="20.8" cy="7" r=".8" fill="#ff4757" stroke="none" />
    </svg>
  )
}

function Titlebar() {
  const { view, cases, settings } = useApp()
  const [version, setVersion] = React.useState('')

  React.useEffect(() => {
    window.api.getAppVersion?.().then((v: string) => setVersion(v)).catch(() => {})
  }, [])

  const breadcrumb = () => {
    if (view.type === 'active-cases')         return <span style={{ color: 'var(--t1)', fontWeight: 600 }}>Иски в работе</span>
    if (view.type === 'closed-cases')         return <span style={{ color: 'var(--t1)', fontWeight: 600 }}>Закрытые иски</span>
    if (view.type === 'templates')            return <span style={{ color: 'var(--t1)', fontWeight: 600 }}>Шаблоны документов</span>
    if (view.type === 'additional-templates') return <span style={{ color: 'var(--t1)', fontWeight: 600 }}>Дополнительные шаблоны</span>
    if (view.type === 'settings')             return <span style={{ color: 'var(--t1)', fontWeight: 600 }}>Настройки</span>
    if (view.type === 'case-workspace') {
      const c = cases.find(x => x.id === view.caseId)
      return (
        <>
          <span style={{ color: 'var(--t3)' }}>Иски в работе</span>
          <span style={{ color: 'var(--t4)', margin: '0 4px' }}>›</span>
          <span style={{ color: 'var(--t1)', fontWeight: 600 }}>
            №{c?.caseNumber}
          </span>
        </>
      )
    }
    if (view.type === 'document-editor') {
      const c = cases.find(x => x.id === view.caseId)
      const doc = c?.documents.find(d => d.id === view.documentId)
      return (
        <>
          <span style={{ color: 'var(--t3)' }}>Иски в работе</span>
          <span style={{ color: 'var(--t4)', margin: '0 4px' }}>›</span>
          <span style={{ color: 'var(--t3)' }}>№{c?.caseNumber}</span>
          <span style={{ color: 'var(--t4)', margin: '0 4px' }}>›</span>
          <span style={{ color: 'var(--t1)', fontWeight: 600 }}>{doc?.title || 'Документ'}</span>
        </>
      )
    }
    if (view.type === 'template-editor') {
      return (
        <>
          <span style={{ color: 'var(--t3)' }}>Шаблоны</span>
          <span style={{ color: 'var(--t4)', margin: '0 4px' }}>›</span>
          <span style={{ color: 'var(--t1)', fontWeight: 600 }}>Редактор шаблона</span>
        </>
      )
    }
    return null
  }

  return (
    <div className="titlebar">
      {/* Brand block — same width as sidebar */}
      <div className="titlebar-left">
        <div className="titlebar-logo">
          {settings.theme === 'cursed' ? (
            <LilyIcon />
          ) : (
            <svg viewBox="0 0 13 13" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6.5 1v11M1.5 4.5l5-3.5 5 3.5M1 12h11M3.5 12V8M9.5 12V8"/>
            </svg>
          )}
        </div>
        <span className="titlebar-title">Court Assistant</span>
        <span style={{
          fontSize: 9.5, fontWeight: 500, color: 'var(--t4)',
          background: 'var(--bg-3)', border: '1px solid var(--line-1)',
          borderRadius: 9999, padding: '1px 6px', fontFamily: 'var(--fm)',
          marginLeft: 2,
        }}>{version ? `v${version}` : ''}</span>
      </div>

      {/* Breadcrumb center */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 0, fontSize: 11.5, fontWeight: 500, color: 'var(--t3)',
      }}>
        {breadcrumb()}
      </div>

      {/* Windows-style window controls */}
      <div className="titlebar-controls">
        <button className="titlebar-btn" onClick={() => window.api.minimizeWindow()} title="Свернуть">
          <svg width="10" height="10" viewBox="0 0 10 10"><path d="M0 5h10" stroke="currentColor" strokeWidth="1.1"/></svg>
        </button>
        <button className="titlebar-btn" onClick={() => window.api.maximizeWindow()} title="Развернуть">
          <svg width="10" height="10" viewBox="0 0 10 10"><rect x="0.8" y="0.8" width="8.4" height="8.4" fill="none" stroke="currentColor" strokeWidth="1.1"/></svg>
        </button>
        <button className="titlebar-btn close" onClick={() => window.api.closeWindow()} title="Закрыть">
          <svg width="10" height="10" viewBox="0 0 10 10"><path d="M1 1l8 8M9 1l-8 8" stroke="currentColor" strokeWidth="1.1"/></svg>
        </button>
      </div>
    </div>
  )
}
