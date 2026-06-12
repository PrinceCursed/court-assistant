import React, { useState, useMemo } from 'react'
import { useApp } from '../../store/AppContext'
import { Case } from '../../types'

type DashTab = 'overview' | 'focus' | 'desktop'

function fmtRelative(iso: string): string {
  const d = new Date(iso)
  const now = new Date()
  const diff = Math.floor((now.getTime() - d.getTime()) / 86400000)
  if (diff === 0) return 'сегодня'
  if (diff === 1) return 'вчера'
  if (diff < 7) return `${diff} дн.`
  return d.toLocaleDateString('ru', { day: 'numeric', month: 'short' })
}

function deadlineBadge(iso: string): { label: string; color: string; bg: string; border: string } {
  const d = new Date(iso)
  d.setHours(0, 0, 0, 0)
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  const diff = Math.floor((d.getTime() - now.getTime()) / 86400000)
  if (diff < 0) return { label: 'просрочен', color: 'var(--red)', bg: 'var(--red-bg)', border: 'var(--red-border, rgba(240,108,108,0.3))' }
  if (diff === 0) return { label: 'сегодня', color: 'var(--red)', bg: 'var(--red-bg)', border: 'var(--red-border, rgba(240,108,108,0.3))' }
  if (diff === 1) return { label: 'завтра', color: 'var(--red)', bg: 'var(--red-bg)', border: 'var(--red-border, rgba(240,108,108,0.3))' }
  if (diff <= 7) return { label: `${diff} дн.`, color: 'var(--amber)', bg: 'var(--amber-bg)', border: 'var(--amber-border, rgba(245,166,35,0.3))' }
  return { label: `${diff} дн.`, color: 'var(--t3)', bg: 'var(--bg-3)', border: 'var(--line-2)' }
}

function caseBadge(c: Case): { label: string; color: string; bg: string; border: string } {
  if (c.priority === 'urgent') return { label: 'срочное', color: 'var(--red)', bg: 'var(--red-bg)', border: 'var(--red-border, rgba(240,108,108,0.3))' }
  if (c.participants.some(p => p.role === 'prosecutor')) return { label: 'прокурор', color: 'var(--purple)', bg: 'var(--purple-bg)', border: 'var(--purple-border, rgba(192,132,252,0.3))' }
  if (c.documents.some(d => d.type === 'decision' || d.type === 'motivation')) return { label: 'решение', color: 'var(--blue)', bg: 'var(--blue-bg)', border: 'var(--blue-border, rgba(91,156,246,0.3))' }
  return { label: 'в работе', color: 'var(--green)', bg: 'var(--green-bg)', border: 'var(--green-border, rgba(62,207,142,0.3))' }
}

const DAYS = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']

export default function Dashboard() {
  const { cases, settings, setView } = useApp()
  const [tab, setTab] = useState<DashTab>('overview')

  const now = new Date()
  const todayName = now.toLocaleDateString('ru', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  const greetingHour = now.getHours()
  const greeting = greetingHour < 12 ? 'Доброе утро' : greetingHour < 18 ? 'Добрый день' : 'Добрый вечер'
  const firstName = settings.judgeFirstName || ''
  const lastName = settings.judgeLastName || ''
  const fullName = [firstName, lastName].filter(Boolean).join(' ') || 'судья'

  const activeCases = useMemo(() => cases.filter(c => c.status === 'active'), [cases])
  const closedThisMonth = useMemo(() => {
    const start = new Date(now.getFullYear(), now.getMonth(), 1)
    return cases.filter(c => c.status === 'closed' && new Date(c.updatedAt) >= start).length
  }, [cases])

  const withDeadline = useMemo(() =>
    activeCases.filter(c => c.deadline).sort((a, b) => {
      const da = new Date(a.deadline!).getTime()
      const db = new Date(b.deadline!).getTime()
      return da - db
    }),
  [activeCases])

  const deadlinesThisWeek = useMemo(() => {
    const weekEnd = new Date(now.getTime() + 7 * 86400000)
    weekEnd.setHours(23, 59, 59)
    return withDeadline.filter(c => new Date(c.deadline!) <= weekEnd).length
  }, [withDeadline])

  const recentCases = useMemo(() =>
    [...activeCases].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).slice(0, 4),
  [activeCases])

  const pinnedCases = useMemo(() => activeCases.filter(c => c.isPinned).slice(0, 3), [activeCases])
  const urgentCase = useMemo(() => activeCases.find(c => c.priority === 'urgent'), [activeCases])

  const card: React.CSSProperties = {
    background: 'var(--bg-1)', border: '1px solid var(--line-2)',
    borderRadius: 13, padding: '16px 18px',
    transition: 'border-color 0.15s, transform 0.15s',
  }

  const tabBtn = (t: DashTab, label: string) => (
    <button
      onClick={() => setTab(t)}
      style={{
        border: 'none', fontFamily: 'inherit', fontSize: 11, fontWeight: 650,
        padding: '5px 12px', borderRadius: 6, cursor: 'pointer', transition: 'all 0.15s',
        whiteSpace: 'nowrap',
        background: tab === t ? 'var(--bg-1)' : 'transparent',
        color: tab === t ? 'var(--t1)' : 'var(--t3)',
        boxShadow: tab === t ? 'var(--sh1)' : 'none',
      }}
    >{label}</button>
  )

  return (
    <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '26px 30px 30px', position: 'relative', zIndex: 1 }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, animation: 'fadeIn 0.4s ease both' }}>
        <div>
          <div style={{ fontFamily: 'var(--fm)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--t3)', marginBottom: 7 }}>
            {todayName}
          </div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 750, letterSpacing: '-0.025em', lineHeight: 1.1 }}>
            {greeting}{fullName ? `, ${fullName}` : ''}
          </h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 3, background: 'var(--bg-2)', border: '1px solid var(--line-2)', borderRadius: 9, padding: 3, flexShrink: 0 }}>
          {tabBtn('overview', 'Обзор')}
          {tabBtn('focus', 'Фокус дня')}
          {tabBtn('desktop', 'Рабочий стол')}
        </div>
      </div>

      {/* ── OVERVIEW ── */}
      {tab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 22 }}>

          {/* Stat cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            <div style={card}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--t3)' }}>Исков в работе</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ac)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/></svg>
              </div>
              <div style={{ fontSize: 30, fontWeight: 750, letterSpacing: '-0.03em', marginTop: 8, lineHeight: 1 }}>{activeCases.length}</div>
              <div style={{ fontSize: 10.5, color: 'var(--green)', marginTop: 7, fontWeight: 600 }}>актив</div>
            </div>
            <div style={{ ...card, borderColor: deadlinesThisWeek > 0 ? 'var(--red-border, rgba(240,108,108,0.3))' : 'var(--line-2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--t3)' }}>Сроков на неделе</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <div style={{ fontSize: 30, fontWeight: 750, letterSpacing: '-0.03em', marginTop: 8, lineHeight: 1, color: deadlinesThisWeek > 0 ? 'var(--red)' : 'var(--t1)' }}>{deadlinesThisWeek}</div>
              {deadlinesThisWeek > 0
                ? <div style={{ fontSize: 10.5, color: 'var(--red)', marginTop: 7, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--red)', display: 'inline-block', animation: 'pulse 1.6s ease-in-out infinite' }}/>
                    истекают скоро
                  </div>
                : <div style={{ fontSize: 10.5, color: 'var(--t3)', marginTop: 7, fontWeight: 600 }}>нет сроков</div>
              }
            </div>
            <div style={card}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--t3)' }}>Закрыто за месяц</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <div style={{ fontSize: 30, fontWeight: 750, letterSpacing: '-0.03em', marginTop: 8, lineHeight: 1 }}>{closedThisMonth}</div>
              <div style={{ fontSize: 10.5, color: closedThisMonth > 0 ? 'var(--green)' : 'var(--t3)', marginTop: 7, fontWeight: 600 }}>
                {closedThisMonth > 0 ? 'за этот месяц' : 'ещё нет'}
              </div>
            </div>
            <div style={card}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--t3)' }}>Всего дел</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              </div>
              <div style={{ fontSize: 30, fontWeight: 750, letterSpacing: '-0.03em', marginTop: 8, lineHeight: 1 }}>{cases.length}</div>
              <div style={{ fontSize: 10.5, color: 'var(--t3)', marginTop: 7, fontWeight: 600 }}>
                в базе
              </div>
            </div>
          </div>

          {/* Deadlines + Recent */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.45fr 1fr', gap: 12 }}>
            {/* Recent cases */}
            <div style={{ ...card, padding: '18px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <h2 style={{ margin: 0, fontSize: 13.5, fontWeight: 700, letterSpacing: '-0.01em' }}>Недавние дела</h2>
                <button
                  onClick={() => setView({ type: 'active-cases' })}
                  style={{ border: 'none', background: 'transparent', color: 'var(--ac2)', fontFamily: 'inherit', fontSize: 11, fontWeight: 650, cursor: 'pointer', padding: '3px 6px', borderRadius: 5 }}
                >Все иски →</button>
              </div>
              {recentCases.length === 0 ? (
                <div style={{ textAlign: 'center', color: 'var(--t4)', fontSize: 12, padding: '24px 0' }}>Нет активных дел</div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {recentCases.map(c => {
                    const badge = caseBadge(c)
                    return (
                      <div
                        key={c.id}
                        onClick={() => setView({ type: 'case-workspace', caseId: c.id })}
                        style={{ display: 'grid', gridTemplateColumns: '110px 1fr auto auto', alignItems: 'center', gap: 14, padding: '10px 10px', borderRadius: 8, cursor: 'pointer', transition: 'background 0.12s' }}
                        onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = 'var(--bg-2)'}
                        onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = 'transparent'}
                      >
                        <span style={{ fontFamily: 'var(--fm)', fontSize: 11, fontWeight: 650, color: 'var(--ac2)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          №{c.caseNumber}
                        </span>
                        <span style={{ fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {c.plaintiff && c.defendant ? `${c.plaintiff} к ${c.defendant}` : c.title}
                          {c.title ? <span style={{ color: 'var(--t3)', fontWeight: 500 }}> · {c.title}</span> : null}
                        </span>
                        <span style={{ fontSize: 9.5, fontWeight: 700, color: badge.color, background: badge.bg, border: `1px solid ${badge.border}`, borderRadius: 9999, padding: '2px 8px', whiteSpace: 'nowrap' }}>
                          {badge.label}
                        </span>
                        <span style={{ fontFamily: 'var(--fm)', fontSize: 10, color: 'var(--t4)', whiteSpace: 'nowrap' }}>
                          {fmtRelative(c.updatedAt)}
                        </span>
                      </div>
                    )
                  })}
                </div>
              )}
              <button
                onClick={() => setView({ type: 'active-cases' })}
                style={{ width: '100%', marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, padding: 9, border: '1px dashed var(--ac-border)', borderRadius: 9, background: 'transparent', color: 'var(--ac2)', fontFamily: 'inherit', fontSize: 11.5, fontWeight: 650, cursor: 'pointer', transition: 'background 0.13s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--ac-dim)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
                Новое дело
              </button>
            </div>

            {/* Deadlines */}
            <div style={{ ...card, padding: '18px 20px' }}>
              <h2 style={{ margin: '0 0 14px', fontSize: 13.5, fontWeight: 700, letterSpacing: '-0.01em' }}>Процессуальные сроки</h2>
              {withDeadline.length === 0 ? (
                <div style={{ textAlign: 'center', color: 'var(--t4)', fontSize: 12, padding: '20px 0' }}>Нет установленных сроков</div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {withDeadline.slice(0, 4).map(c => {
                    const b = deadlineBadge(c.deadline!)
                    return (
                      <div
                        key={c.id}
                        onClick={() => setView({ type: 'case-workspace', caseId: c.id })}
                        style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '10px 12px', borderRadius: 10, background: b.color === 'var(--red)' ? 'var(--red-bg)' : 'var(--bg-2)', border: `1px solid ${b.border}`, cursor: 'pointer', transition: 'filter 0.13s' }}
                        onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.filter = 'brightness(1.1)'}
                        onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.filter = ''}
                      >
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 12, fontWeight: 650, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {c.plaintiff && c.defendant ? `${c.plaintiff} к ${c.defendant}` : c.title || `Дело №${c.caseNumber}`}
                          </div>
                          <div style={{ fontFamily: 'var(--fm)', fontSize: 10, color: 'var(--t3)', marginTop: 2 }}>№{c.caseNumber}</div>
                        </div>
                        <span style={{ fontSize: 10, fontWeight: 700, color: b.color, background: b.bg, border: `1px solid ${b.border}`, borderRadius: 9999, padding: '3px 9px', flexShrink: 0 }}>
                          {b.label}
                        </span>
                      </div>
                    )
                  })}
                </div>
              )}
              <button
                onClick={() => setView({ type: 'templates' })}
                style={{ width: '100%', marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, padding: 9, border: '1px dashed var(--ac-border)', borderRadius: 9, background: 'transparent', color: 'var(--ac2)', fontFamily: 'inherit', fontSize: 11.5, fontWeight: 650, cursor: 'pointer', transition: 'background 0.13s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--ac-dim)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
                Создать документ по шаблону
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── FOCUS DAY ── */}
      {tab === 'focus' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: 14, marginTop: 22 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

            {/* Hero: urgent case or placeholder */}
            <div style={{ background: urgentCase ? 'linear-gradient(150deg, var(--ac-bg), transparent 55%), var(--bg-1)' : 'var(--bg-1)', border: `1px solid ${urgentCase ? 'var(--ac-border)' : 'var(--line-2)'}`, borderRadius: 16, padding: '26px 28px', position: 'relative', overflow: 'hidden' }}>
              {urgentCase ? (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--red)', display: 'inline-block', animation: 'pulse 1.6s ease-in-out infinite' }}/>
                    <span style={{ fontFamily: 'var(--fm)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ac2)', fontWeight: 600 }}>Срочное дело</span>
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.015em', lineHeight: 1.35 }}>
                    {urgentCase.plaintiff && urgentCase.defendant ? `${urgentCase.plaintiff} к ${urgentCase.defendant}` : urgentCase.title}
                  </div>
                  <div style={{ fontSize: 12.5, color: 'var(--t2)', marginTop: 6 }}>
                    {urgentCase.title && <span>{urgentCase.title} · </span>}
                    <span style={{ fontFamily: 'var(--fm)', color: 'var(--ac2)' }}>№{urgentCase.caseNumber}</span>
                  </div>
                  {urgentCase.deadline && (
                    <div style={{ fontSize: 12, color: 'var(--red)', marginTop: 8, fontWeight: 650 }}>
                      Срок: {new Date(urgentCase.deadline).toLocaleDateString('ru', { day: 'numeric', month: 'long' })}
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: 9, marginTop: 22 }}>
                    <button
                      onClick={() => setView({ type: 'case-workspace', caseId: urgentCase.id })}
                      style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', border: 'none', borderRadius: 9, background: 'var(--ac)', color: 'var(--ac-fg, #fff)', fontFamily: 'inherit', fontSize: 12.5, fontWeight: 700, cursor: 'pointer', transition: 'filter 0.13s', boxShadow: 'var(--sh-ac)' }}
                      onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.filter = 'brightness(1.12)'}
                      onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.filter = ''}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      Открыть дело
                    </button>
                  </div>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '20px 0', color: 'var(--t3)' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--t4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 10 }}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--t2)' }}>Нет срочных дел</div>
                  <div style={{ fontSize: 11.5, color: 'var(--t4)', marginTop: 4 }}>Отметьте дело как срочное, чтобы оно появилось здесь</div>
                </div>
              )}
            </div>

            {/* Mini stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {[
                { n: activeCases.length, label: 'исков\nв работе', color: 'var(--t1)' },
                { n: deadlinesThisWeek, label: 'сроков\nна неделе', color: deadlinesThisWeek > 0 ? 'var(--red)' : 'var(--t1)' },
                { n: closedThisMonth, label: 'закрыто\nза месяц', color: closedThisMonth > 0 ? 'var(--green)' : 'var(--t1)' },
              ].map(({ n, label, color }) => (
                <div key={label} style={{ ...card, padding: '13px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 24, fontWeight: 750, letterSpacing: '-0.03em', color }}>{n}</span>
                  <span style={{ fontSize: 10.5, color: 'var(--t3)', fontWeight: 600, lineHeight: 1.35, whiteSpace: 'pre-line' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Deadlines timeline */}
          <div style={{ ...card, borderRadius: 16, padding: '20px 22px' }}>
            <h2 style={{ margin: '0 0 16px', fontSize: 13.5, fontWeight: 700 }}>Ближайшие сроки</h2>
            {withDeadline.length === 0 ? (
              <div style={{ textAlign: 'center', color: 'var(--t4)', fontSize: 12, padding: '24px 0' }}>Нет установленных сроков</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {withDeadline.slice(0, 6).map((c, i) => {
                  const b = deadlineBadge(c.deadline!)
                  const isLast = i === Math.min(withDeadline.length, 6) - 1
                  return (
                    <div key={c.id} style={{ display: 'flex', gap: 13 }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 14, flexShrink: 0 }}>
                        <span style={{ width: b.color === 'var(--red)' ? 11 : 9, height: b.color === 'var(--red)' ? 11 : 9, borderRadius: '50%', background: b.color === 'var(--red)' ? 'var(--red)' : 'var(--bg-4)', border: `1.5px solid ${b.border}`, marginTop: 4, display: 'block', animation: b.color === 'var(--red)' ? 'pulse 1.6s ease-in-out infinite' : 'none' }} />
                        {!isLast && <span style={{ width: 1.5, flex: 1, background: 'var(--line-2)', display: 'block' }} />}
                      </div>
                      <div
                        style={{ paddingBottom: 18, cursor: 'pointer', flex: 1 }}
                        onClick={() => setView({ type: 'case-workspace', caseId: c.id })}
                      >
                        <div style={{ fontFamily: 'var(--fm)', fontSize: 10, color: b.color, fontWeight: 700 }}>
                          {new Date(c.deadline!).toLocaleDateString('ru', { day: 'numeric', month: 'long' })} — {b.label}
                        </div>
                        <div style={{ fontSize: 12.5, fontWeight: 650, marginTop: 2 }}>
                          {c.plaintiff && c.defendant ? `${c.plaintiff} к ${c.defendant}` : c.title || `Дело №${c.caseNumber}`}
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--t3)', marginTop: 1, fontFamily: 'var(--fm)' }}>№{c.caseNumber}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── DESKTOP ── */}
      {tab === 'desktop' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 22 }}>

          {/* Pinned cases */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 11 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--ac)" stroke="var(--ac)" strokeWidth="1.5"><path d="M12 17v5M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16h14v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1z"/></svg>
              <h2 style={{ margin: 0, fontSize: 13.5, fontWeight: 700 }}>Закреплённые дела</h2>
            </div>
            {pinnedCases.length === 0 ? (
              <div style={{ ...card, textAlign: 'center', color: 'var(--t4)', fontSize: 12, padding: '24px 0' }}>
                Нет закреплённых дел. Откройте дело и нажмите «Закрепить».
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(3, pinnedCases.length)}, 1fr)`, gap: 12 }}>
                {pinnedCases.map(c => {
                  const b = caseBadge(c)
                  const isUrgent = c.priority === 'urgent'
                  const progress = Math.max(0, Math.min(1, c.documents.length / 8))
                  return (
                    <div
                      key={c.id}
                      onClick={() => setView({ type: 'case-workspace', caseId: c.id })}
                      style={{ ...card, borderColor: isUrgent ? 'var(--red-border, rgba(240,108,108,0.3))' : 'var(--line-2)', cursor: 'pointer' }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLDivElement
                        el.style.transform = 'translateY(-3px)'
                        el.style.boxShadow = 'var(--sh-lg)'
                        el.style.borderColor = isUrgent ? 'var(--red)' : 'var(--ac-border-h, var(--ac-border))'
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLDivElement
                        el.style.transform = ''
                        el.style.boxShadow = ''
                        el.style.borderColor = isUrgent ? 'var(--red-border, rgba(240,108,108,0.3))' : 'var(--line-2)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                        <span style={{ fontFamily: 'var(--fm)', fontSize: 10.5, fontWeight: 700, color: 'var(--ac2)' }}>№{c.caseNumber}</span>
                        <span style={{ fontSize: 9, fontWeight: 700, color: b.color, background: b.bg, border: `1px solid ${b.border}`, borderRadius: 9999, padding: '2px 8px' }}>
                          {b.label.toUpperCase()}
                        </span>
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.35 }}>
                        {c.plaintiff && c.defendant ? `${c.plaintiff} к ${c.defendant}` : c.title}
                      </div>
                      {c.title && c.plaintiff && <div style={{ fontSize: 11, color: 'var(--t3)', marginTop: 3 }}>{c.title}</div>}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 13 }}>
                        <div style={{ flex: 1, height: 4, borderRadius: 9999, background: 'var(--bg-3)', overflow: 'hidden' }}>
                          <div style={{ width: `${Math.round(progress * 100)}%`, height: '100%', borderRadius: 9999, background: `linear-gradient(90deg, var(--ac), var(--ac2))` }} />
                        </div>
                        <span style={{ fontFamily: 'var(--fm)', fontSize: 9.5, color: 'var(--t3)', fontWeight: 600 }}>{c.documents.length}/8 этапов</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 11, paddingTop: 11, borderTop: '1px solid var(--line-1)' }}>
                        <span style={{ fontSize: 10, color: 'var(--t3)', fontWeight: 600 }}>{fmtRelative(c.updatedAt)}</span>
                        {c.deadline && (
                          <span style={{ fontSize: 10, color: deadlineBadge(c.deadline).color, fontWeight: 700 }}>
                            срок: {new Date(c.deadline).toLocaleDateString('ru', { day: 'numeric', month: 'short' })}
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Quick templates + recent activity */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr 1fr', gap: 12 }}>
            {/* Stats mini */}
            <div style={{ ...card, padding: '17px 19px' }}>
              <h2 style={{ margin: '0 0 4px', fontSize: 12.5, fontWeight: 700 }}>Статистика</h2>
              <div style={{ fontSize: 10.5, color: 'var(--t3)', marginBottom: 14 }}>дела по статусу</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { label: 'В работе', count: activeCases.length, color: 'var(--ac)', total: cases.length },
                  { label: 'Закрытые', count: cases.filter(c => c.status === 'closed').length, color: 'var(--green)', total: cases.length },
                  { label: 'Срочные', count: cases.filter(c => c.priority === 'urgent').length, color: 'var(--red)', total: cases.length },
                ].map(({ label, count, color, total }) => (
                  <div key={label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 11, color: 'var(--t2)', fontWeight: 600 }}>{label}</span>
                      <span style={{ fontFamily: 'var(--fm)', fontSize: 11, color, fontWeight: 700 }}>{count}</span>
                    </div>
                    <div style={{ height: 4, borderRadius: 9999, background: 'var(--bg-3)' }}>
                      <div style={{ width: total > 0 ? `${Math.round(count / total * 100)}%` : '0%', height: '100%', borderRadius: 9999, background: color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent docs */}
            <div style={{ ...card, padding: '17px 19px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <h2 style={{ margin: 0, fontSize: 12.5, fontWeight: 700 }}>Последние документы</h2>
              </div>
              {(() => {
                const allDocs = activeCases.flatMap(c => c.documents.map(d => ({ ...d, case: c }))).sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).slice(0, 3)
                if (allDocs.length === 0) return <div style={{ textAlign: 'center', color: 'var(--t4)', fontSize: 12, padding: '20px 0' }}>Нет документов</div>
                return (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {allDocs.map(d => (
                      <div
                        key={d.id}
                        onClick={() => setView({ type: 'document-editor', caseId: d.case.id, documentId: d.id })}
                        style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 8, cursor: 'pointer', background: 'var(--bg-2)', transition: 'background 0.12s' }}
                        onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = 'var(--bg-3)'}
                        onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = 'var(--bg-2)'}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--t3)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 11.5, fontWeight: 650, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.title}</div>
                          <div style={{ fontFamily: 'var(--fm)', fontSize: 9, color: 'var(--t3)', marginTop: 1 }}>№{d.case.caseNumber} · {fmtRelative(d.updatedAt)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              })()}
            </div>

            {/* Quick templates */}
            <div style={{ ...card, padding: '17px 19px' }}>
              <h2 style={{ margin: '0 0 12px', fontSize: 12.5, fontWeight: 700 }}>Быстрые шаблоны</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  { icon: '✓', label: 'О принятии иска к производству', from: 'templates' as const },
                  { icon: '⏱', label: 'О назначении к разбирательству', from: 'templates' as const },
                  { icon: '§', label: 'Финальное решение', from: 'templates' as const },
                ].map(t => (
                  <button
                    key={t.label}
                    onClick={() => setView({ type: 'templates' })}
                    style={{ display: 'flex', alignItems: 'center', gap: 9, width: '100%', padding: '8px 11px', border: '1px solid var(--line-1)', borderRadius: 8, background: 'var(--bg-2)', color: 'var(--t1)', fontFamily: 'inherit', fontSize: 11.5, fontWeight: 600, cursor: 'pointer', textAlign: 'left', transition: 'border-color 0.13s, background 0.13s' }}
                    onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = 'var(--ac-border)'; b.style.background = 'var(--ac-dim)' }}
                    onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = 'var(--line-1)'; b.style.background = 'var(--bg-2)' }}
                  >
                    <span style={{ color: 'var(--ac2)' }}>{t.icon}</span>{t.label}
                  </button>
                ))}
                <button
                  onClick={() => setView({ type: 'templates' })}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, width: '100%', padding: '8px 11px', border: '1px dashed var(--ac-border)', borderRadius: 8, background: 'transparent', color: 'var(--ac2)', fontFamily: 'inherit', fontSize: 11, fontWeight: 650, cursor: 'pointer', transition: 'background 0.13s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = 'var(--ac-dim)'}
                  onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'transparent'}
                >Все шаблоны →</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
