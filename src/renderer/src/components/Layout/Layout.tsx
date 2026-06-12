import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import RightPanel from '../RightPanel/RightPanel'
import { useApp } from '../../store/AppContext'
import { applyCustomThemeCss, clearCustomThemeCss } from '../../utils/theme'
import lilyLogo from '../../assets/lily_logo.png'

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

/** Red spider lily (higanbana) photo — logo for the cursed theme */
function LilyIcon() {
  return (
    <img
      src={lilyLogo}
      alt=""
      style={{ width: 20, height: 20, objectFit: 'contain', display: 'block' }}
      draggable={false}
    />
  )
}

const THEME_DOTS = [
  { key: 'gta5rp', label: 'GTA5RP', bg: '#0f0e0c', ac: '#dfa03f' },
  { key: 'dark',   label: 'Dark',   bg: '#0a0b0d', ac: '#5b9cf6' },
  { key: 'light',  label: 'Light',  bg: '#f2f2f5', ac: '#a8731c' },
  { key: 'cursed', label: 'Cursed', bg: '#050505', ac: '#e11d2e' },
  { key: 'custom', label: 'Своя',   bg: '#14141e', ac: '#8b7cf6' },
] as const

function Titlebar() {
  const { view, cases, settings, updateSettings } = useApp()
  const [version, setVersion] = React.useState('')

  React.useEffect(() => {
    window.api.getAppVersion?.().then((v: string) => setVersion(v)).catch(() => {})
  }, [])

  const switchTheme = async (theme: typeof THEME_DOTS[number]['key']) => {
    document.documentElement.setAttribute('data-theme', theme)
    if (theme === 'custom') {
      applyCustomThemeCss(
        settings.customBgR ?? 20, settings.customBgG ?? 20, settings.customBgB ?? 30,
        settings.customAccR ?? 200, settings.customAccG ?? 150, settings.customAccB ?? 50,
      )
    } else {
      clearCustomThemeCss()
    }
    await updateSettings({ theme })
  }

  const breadcrumb = () => {
    if (view.type === 'dashboard')          return <span style={{ color: 'var(--t1)', fontWeight: 600 }}>Дашборд</span>
    if (view.type === 'active-cases')       return <span style={{ color: 'var(--t1)', fontWeight: 600 }}>Иски в работе</span>
    if (view.type === 'closed-cases')       return <span style={{ color: 'var(--t1)', fontWeight: 600 }}>Закрытые иски</span>
    if (view.type === 'templates')          return <span style={{ color: 'var(--t1)', fontWeight: 600 }}>Шаблоны документов</span>
    if (view.type === 'additional-templates') return <span style={{ color: 'var(--t1)', fontWeight: 600 }}>Дополнительные шаблоны</span>
    if (view.type === 'settings')           return <span style={{ color: 'var(--t1)', fontWeight: 600 }}>Настройки</span>
    if (view.type === 'case-workspace') {
      const c = cases.find(x => x.id === view.caseId)
      return (
        <>
          <span style={{ color: 'var(--t3)' }}>Иски в работе</span>
          <span style={{ color: 'var(--t4)', margin: '0 4px' }}>›</span>
          <span style={{ color: 'var(--t1)', fontWeight: 600 }}>№{c?.caseNumber}</span>
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

  const currentTheme = settings.theme ?? 'dark'

  return (
    <div className="titlebar">
      {/* Brand block */}
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

      {/* Theme dots + window controls */}
      <div className="titlebar-controls">
        {/* Theme switcher dots */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, paddingRight: 4 }}>
          {THEME_DOTS.map(dot => (
            <button
              key={dot.key}
              title={dot.label}
              onClick={() => switchTheme(dot.key)}
              style={{
                width: 16, height: 16, borderRadius: '50%', cursor: 'pointer', padding: 0,
                background: dot.bg, border: `1px solid ${currentTheme === dot.key ? dot.ac : 'rgba(255,255,255,0.18)'}`,
                boxShadow: currentTheme === dot.key ? `0 0 0 2px ${dot.ac}55` : 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'transform 0.15s, box-shadow 0.15s', flexShrink: 0,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.25)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)' }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: dot.ac, display: 'block' }} />
            </button>
          ))}
        </div>
        <div style={{ width: 1, height: 16, background: 'var(--line-2)', margin: '0 2px' }} />
        {/* Window controls */}
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
