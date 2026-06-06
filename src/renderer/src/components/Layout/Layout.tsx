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

function Titlebar() {
  const { view, cases } = useApp()

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
          <svg viewBox="0 0 13 13" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6.5 1v11M1.5 4.5l5-3.5 5 3.5M1 12h11M3.5 12V8M9.5 12V8"/>
          </svg>
        </div>
        <span className="titlebar-title">Court Assistant</span>
        <span style={{
          fontSize: 9.5, fontWeight: 500, color: 'var(--t4)',
          background: 'var(--bg-3)', border: '1px solid var(--line-1)',
          borderRadius: 9999, padding: '1px 6px', fontFamily: 'var(--fm)',
          marginLeft: 2,
        }}>v1.9</span>
      </div>

      {/* Breadcrumb center */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 0, fontSize: 11.5, fontWeight: 500, color: 'var(--t3)',
      }}>
        {breadcrumb()}
      </div>

      {/* macOS-style window controls */}
      <div className="titlebar-controls">
        <button
          className="titlebar-btn close"
          onClick={() => window.api.closeWindow()}
          title="Закрыть"
        />
        <button
          className="titlebar-btn min"
          onClick={() => window.api.minimizeWindow()}
          title="Свернуть"
        />
        <button
          className="titlebar-btn max"
          onClick={() => window.api.maximizeWindow()}
          title="Развернуть"
        />
      </div>
    </div>
  )
}
