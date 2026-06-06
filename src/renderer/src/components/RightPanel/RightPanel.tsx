import React, { useEffect, useState } from 'react'
import { useApp } from '../../store/AppContext'

export default function RightPanel() {
  const { view, cases, settings } = useApp()
  const [appVersion, setAppVersion] = useState('')
  useEffect(() => { window.api.getAppVersion().then(setAppVersion).catch(() => {}) }, [])

  const judgeName =
    settings.judgeFirstName || settings.judgeLastName
      ? `${settings.judgeFirstName} ${settings.judgeLastName}`.trim()
      : <span style={{ color: 'var(--t4)' }}>Не указано</span>

  const today = new Date().toLocaleDateString('ru-RU', {
    weekday: 'long', day: 'numeric', month: 'long',
  })

  const renderContent = () => {
    /* ── Case workspace ── */
    if (view.type === 'case-workspace') {
      const c = cases.find(x => x.id === view.caseId)
      if (!c) return <EmptyPanel />
      return (
        <>
          <div className="panel-field">
            <div className="panel-field-label">Номер дела</div>
            <div className="panel-field-value" style={{ color: 'var(--ac2)', fontWeight: 700, fontFamily: 'var(--fm)' }}>
              №{c.caseNumber}
            </div>
          </div>
          <div className="panel-field">
            <div className="panel-field-label">Истец</div>
            <div className="panel-field-value">{c.plaintiff}</div>
          </div>
          <div className="panel-field">
            <div className="panel-field-label">Ответчик</div>
            <div className="panel-field-value">{c.defendant}</div>
          </div>
          {c.prosecutor && (
            <div className="panel-field">
              <div className="panel-field-label">Прокурор</div>
              <div className="panel-field-value">{c.prosecutor}</div>
            </div>
          )}
          {c.lawyer && (
            <div className="panel-field">
              <div className="panel-field-label">Адвокат</div>
              <div className="panel-field-value">{c.lawyer}</div>
            </div>
          )}

          <div style={{ height: 1, background: 'var(--line-0)', margin: '10px 0' }} />

          <div className="panel-field">
            <div className="panel-field-label">Статус</div>
            <div>
              <span className={`case-status ${c.status}`}>
                <span className="case-status-dot" />
                {c.status === 'active' ? 'В работе' : 'Закрыто'}
              </span>
            </div>
          </div>

          {/* stats row */}
          <div style={{ display: 'flex', gap: 7, margin: '10px 0' }}>
            <div style={{ flex: 1, background: 'var(--bg-2)', border: '1px solid var(--line-1)', borderRadius: 'var(--r3)', padding: '9px 11px' }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--t1)', lineHeight: 1 }}>{c.documents.length}</div>
              <div style={{ fontSize: 10, color: 'var(--t3)', marginTop: 3 }}>Документов</div>
            </div>
            <div style={{ flex: 1, background: 'var(--bg-2)', border: '1px solid var(--line-1)', borderRadius: 'var(--r3)', padding: '9px 11px' }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--t1)', lineHeight: 1 }}>{c.materials.length}</div>
              <div style={{ fontSize: 10, color: 'var(--t3)', marginTop: 3 }}>Материалов</div>
            </div>
          </div>

          <div className="panel-field">
            <div className="panel-field-label">Дата создания</div>
            <div className="panel-field-value" style={{ fontSize: 12, fontFamily: 'var(--fm)' }}>
              {new Date(c.createdAt).toLocaleDateString('ru-RU')}
            </div>
          </div>

          {c.description && (
            <div className="panel-field">
              <div className="panel-field-label">Описание</div>
              <div className="panel-field-value" style={{ fontSize: 11.5, color: 'var(--t2)', lineHeight: 1.5 }}>
                {c.description}
              </div>
            </div>
          )}
        </>
      )
    }

    /* ── Active / Closed cases ── */
    if (view.type === 'active-cases' || view.type === 'closed-cases') {
      const activeCount  = cases.filter(c => c.status === 'active').length
      const closedCount  = cases.filter(c => c.status === 'closed').length
      const urgentCount  = cases.filter(c => c.status === 'active' && c.priority === 'urgent').length
      const lastCase = cases
        .filter(c => view.type === 'active-cases' ? c.status === 'active' : c.status === 'closed')
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())[0]

      // Weekly stats
      const weekAgo = new Date(); weekAgo.setDate(weekAgo.getDate() - 7)
      const weekOpened = cases.filter(c => new Date(c.createdAt) >= weekAgo).length
      const weekClosed = cases.filter(c => c.status === 'closed' && new Date(c.updatedAt) >= weekAgo).length
      const weekDocs   = cases.reduce((sum, c) =>
        sum + c.documents.filter(d => new Date(d.createdAt) >= weekAgo).length, 0)

      const Stat = ({ value, label, color = 'var(--t1)' }: { value: number; label: string; color?: string }) => (
        <div style={{ flex: 1, background: 'var(--bg-2)', border: '1px solid var(--line-1)', borderRadius: 'var(--r3)', padding: '9px 10px' }}>
          <div style={{ fontSize: 18, fontWeight: 800, color, lineHeight: 1 }}>{value}</div>
          <div style={{ fontSize: 10, color: 'var(--t3)', marginTop: 3, lineHeight: 1.3 }}>{label}</div>
        </div>
      )

      return (
        <>
          {/* all-time stats */}
          <div style={{ display: 'flex', gap: 7, marginBottom: 7 }}>
            <Stat value={activeCount} label="Активных" color="var(--ac2)" />
            <Stat value={closedCount} label="Закрытых" color="var(--t3)" />
          </div>
          {urgentCount > 0 && (
            <div style={{ display: 'flex', gap: 7, marginBottom: 7 }}>
              <Stat value={urgentCount} label="Срочных" color="var(--red)" />
            </div>
          )}

          {/* weekly stats */}
          <div style={{
            background: 'var(--bg-2)', border: '1px solid var(--line-1)',
            borderRadius: 'var(--r3)', padding: '10px 11px', marginBottom: 14,
          }}>
            <div style={{ fontSize: 9.5, fontWeight: 700, color: 'var(--t4)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 8 }}>
              За 7 дней
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {[
                ['Открыто дел',    weekOpened, 'var(--green)'],
                ['Закрыто дел',    weekClosed, 'var(--t2)'],
                ['Документов',     weekDocs,   'var(--blue)'],
              ].map(([label, val, color]) => (
                <div key={label as string} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, color: 'var(--t3)' }}>{label as string}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: color as string, fontFamily: 'var(--fm)' }}>{val as number}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ height: 1, background: 'var(--line-0)', marginBottom: 12 }} />

          <div className="panel-field">
            <div className="panel-field-label">Судья</div>
            <div className="panel-field-value">{judgeName}</div>
          </div>
          <div className="panel-field">
            <div className="panel-field-label">Должность</div>
            <div className="panel-field-value">{settings.position || <span style={{ color: 'var(--t4)' }}>Не указано</span>}</div>
          </div>

          <div style={{ height: 1, background: 'var(--line-0)', margin: '10px 0' }} />

          <div className="panel-field">
            <div className="panel-field-label">Сегодня</div>
            <div className="panel-field-value" style={{ fontSize: 11.5 }}>{today}</div>
          </div>

          {lastCase && (
            <div className="panel-field">
              <div className="panel-field-label">Последнее обновление</div>
              <div className="panel-field-value" style={{ fontSize: 11.5 }}>{lastCase.title || `${lastCase.plaintiff} vs ${lastCase.defendant}`}</div>
            </div>
          )}
        </>
      )
    }

    /* ── Settings ── */
    if (view.type === 'settings') {
      return (
        <>
          <div className="panel-field">
            <div className="panel-field-label">Профиль</div>
            <div className="panel-field-value">{judgeName}</div>
          </div>
          <div className="panel-field">
            <div className="panel-field-label">Должность</div>
            <div className="panel-field-value">{settings.position || <span style={{ color: 'var(--t4)' }}>Не указано</span>}</div>
          </div>
          {settings.stampBase64 && (
            <div className="panel-field">
              <div className="panel-field-label">Печать</div>
              <img src={settings.stampBase64} alt="Печать" style={{ width: 64, height: 64, objectFit: 'contain', background: '#fff', borderRadius: 8, border: '1px solid var(--line-2)', padding: 4 }} />
            </div>
          )}
          <div style={{ height: 1, background: 'var(--line-0)', margin: '10px 0' }} />
          {appVersion && (
            <div className="panel-field">
              <div className="panel-field-label">Версия</div>
              <div className="panel-field-value" style={{ fontFamily: 'var(--fm)', fontSize: 11.5, color: 'var(--t3)' }}>v{appVersion}</div>
            </div>
          )}
        </>
      )
    }

    return <EmptyPanel />
  }

  const title =
    view.type === 'case-workspace' ? 'Детали дела'
    : view.type === 'settings'    ? 'Профиль судьи'
    : 'Контекст'

  return (
    <aside className="right-panel">
      <div className="right-panel-header">
        <span>{title}</span>
      </div>
      <div className="right-panel-body">{renderContent()}</div>
    </aside>
  )
}

function EmptyPanel() {
  return (
    <div style={{ color: 'var(--t4)', fontSize: 12, textAlign: 'center', paddingTop: 24 }}>
      Выберите дело или раздел
    </div>
  )
}
