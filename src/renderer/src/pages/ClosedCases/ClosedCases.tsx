import React, { useState } from 'react'
import { useApp } from '../../store/AppContext'
import CaseCard from '../../components/CaseCard/CaseCard'

export default function ClosedCases() {
  const { cases, openCase } = useApp()
  const [search, setSearch] = useState('')

  const closed = cases
    .filter(c => c.status === 'closed')
    .filter(c => !search || [c.caseNumber, c.title, c.plaintiff, c.defendant].some(f => f.toLowerCase().includes(search.toLowerCase())))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div className="page-header">
        <div>
          <div className="page-title">Закрытые иски</div>
          <div className="page-subtitle">{closed.length} закрытых дел</div>
        </div>
        <div className="search-box">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
          </svg>
          <input
            placeholder="Поиск..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {closed.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <div className="empty-state-text">{search ? 'Ничего не найдено' : 'Закрытых дел нет'}</div>
          <div className="empty-state-sub">{!search && 'Закрытые дела появятся здесь'}</div>
        </div>
      ) : (
        <div className="cases-grid">
          {closed.map(c => (
            <CaseCard key={c.id} case_={c} onOpen={() => openCase(c.id)} onEdit={() => {}} />
          ))}
        </div>
      )}
    </div>
  )
}
