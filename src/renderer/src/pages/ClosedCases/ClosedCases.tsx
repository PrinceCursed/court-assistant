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
          <div className="page-title">✅ Закрытые иски</div>
          <div className="page-subtitle">{closed.length} закрытых дел</div>
        </div>
        <input
          className="input"
          style={{ width: 220 }}
          placeholder="🔍  Поиск..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {closed.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">✅</div>
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
