import React, { useState, useEffect } from 'react'
import {
  DocumentType,
  DOCUMENT_TYPE_LABELS,
  ADDITIONAL_TEMPLATE_TYPES,
  ADDITIONAL_TEMPLATE_CATEGORIES,
  ADDITIONAL_TEMPLATE_CATEGORY,
} from '../../types'
import { useApp } from '../../store/AppContext'

const TYPE_ICONS: Record<string, string> = {
  'counter-claim':         '🔄',
  'expand-participants':   '👥',
  'state-lawyer':          '🧑‍⚖️',
  'jurisdiction-transfer': '🏛️',
  recusal:                 '🚷',
  'correct-typo':          '✏️',
  collegial:               '👨‍👩‍👧',
  consolidate:             '🗂️',
  terminate:               '🛑',
  petition:                '📨',
}

const TYPE_DESC: Record<string, string> = {
  'counter-claim':         'Принятие встречных исковых требований ответчика',
  'expand-participants':   'Привлечение новых лиц к участию в деле',
  'state-lawyer':          'Назначение государственного защитника',
  'jurisdiction-transfer': 'Передача дела в Верховный суд',
  recusal:                 'Отвод участника процесса',
  'correct-typo':          'Исправление технической ошибки в акте',
  collegial:               'Назначение коллегии судей для рассмотрения',
  consolidate:             'Объединение нескольких дел в одно производство',
  terminate:               'Прекращение производства по делу',
  petition:                'Рассмотрение ходатайства адвоката или стороны',
}

export default function AdditionalTemplates() {
  const { settings, setView } = useApp()
  const [savedTypes, setSavedTypes] = useState<Set<string>>(new Set())
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  useEffect(() => {
    if (!settings.storagePath) return
    ;(async () => {
      const exists: string[] = []
      for (const type of ADDITIONAL_TEMPLATE_TYPES) {
        const has = await window.api.fileExists(`${settings.storagePath}/templates/${type}.html`)
        if (has) exists.push(type)
      }
      setSavedTypes(new Set(exists))
    })()
  }, [settings.storagePath])

  const openTemplate = (type: DocumentType) => {
    setView({ type: 'template-editor', docType: type, from: 'additional-templates' })
  }

  const resetTemplate = async (type: DocumentType, e: React.MouseEvent) => {
    e.stopPropagation()
    if (!window.confirm('Сбросить шаблон к стандартному?')) return
    await window.api.deleteFile(`${settings.storagePath}/templates/${type}.html`)
    setSavedTypes(prev => { const n = new Set(prev); n.delete(type); return n })
  }

  const q = search.toLowerCase().trim()

  const filtered = ADDITIONAL_TEMPLATE_TYPES.filter(type => {
    const matchCat = activeCategory === 'all' || ADDITIONAL_TEMPLATE_CATEGORY[type] === activeCategory
    if (!matchCat) return false
    if (!q) return true
    const label = DOCUMENT_TYPE_LABELS[type].toLowerCase()
    const desc  = (TYPE_DESC[type] || '').toLowerCase()
    const cat   = ADDITIONAL_TEMPLATE_CATEGORY[type] || ''
    return label.includes(q) || desc.includes(q) || cat.includes(q)
  })

  const savedCount = ADDITIONAL_TEMPLATE_TYPES.filter(t => savedTypes.has(t)).length

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* Header */}
      <div className="page-header">
        <div>
          <div className="page-title">📂 Дополнительные шаблоны</div>
          <div className="page-subtitle">Процессуальные и организационные определения</div>
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-3)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }} />
          {savedCount} из {ADDITIONAL_TEMPLATE_TYPES.length} настроены
        </div>
      </div>

      {/* Search + category filter */}
      <div style={{ padding: '12px 28px', borderBottom: '1px solid var(--border-0)', flexShrink: 0 }}>
        <input
          className="input"
          placeholder="Поиск по названию, категории или содержимому..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ marginBottom: 10 }}
        />
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {ADDITIONAL_TEMPLATE_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: '4px 12px',
                borderRadius: 'var(--r-f)',
                border: '1px solid',
                fontSize: 11,
                fontWeight: 500,
                cursor: 'pointer',
                fontFamily: 'var(--font)',
                background: activeCategory === cat.id ? 'var(--accent)' : 'var(--bg-elevated)',
                color: activeCategory === cat.id ? '#fff' : 'var(--text-2)',
                borderColor: activeCategory === cat.id ? 'var(--accent)' : 'var(--border-1)',
                transition: 'all var(--t-fast)',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Template list */}
      <div style={{ flex: 1, overflow: 'auto', padding: '20px 28px' }}>
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <div className="empty-state-text">Шаблоны не найдены</div>
            <div className="empty-state-sub">Попробуйте изменить запрос или категорию</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {filtered.map(type => {
              const isCustom = savedTypes.has(type)
              const catId = ADDITIONAL_TEMPLATE_CATEGORY[type]
              const catLabel = ADDITIONAL_TEMPLATE_CATEGORIES.find(c => c.id === catId)?.label || ''
              return (
                <div
                  key={type}
                  className="card"
                  style={{
                    padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14,
                    cursor: 'pointer', transition: 'all var(--t-base)',
                    border: isCustom ? '1px solid rgba(99,102,241,0.35)' : '1px solid var(--border-1)',
                  }}
                  onClick={() => openTemplate(type)}
                >
                  <div style={{
                    width: 40, height: 40, borderRadius: 'var(--r-md)',
                    background: isCustom ? 'var(--accent-dim)' : 'var(--bg-overlay)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18, flexShrink: 0,
                    border: isCustom ? '1px solid var(--border-accent)' : '1px solid var(--border-1)',
                  }}>
                    {TYPE_ICONS[type] || '📄'}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-1)', marginBottom: 2 }}>
                      {DOCUMENT_TYPE_LABELS[type]}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-3)', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span>{TYPE_DESC[type] || 'Судебный документ'}</span>
                      {catLabel && (
                        <span style={{
                          padding: '1px 6px', borderRadius: 'var(--r-f)', fontSize: 10,
                          background: 'var(--bg-overlay)', border: '1px solid var(--border-1)',
                          color: 'var(--text-3)',
                        }}>
                          {catLabel}
                        </span>
                      )}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                    {isCustom ? (
                      <>
                        <span style={{
                          fontSize: 10, padding: '2px 8px',
                          background: 'var(--accent-dim)', color: 'var(--text-accent)',
                          border: '1px solid var(--border-accent)', borderRadius: 'var(--r-f)',
                        }}>
                          ✏️ Настроен
                        </span>
                        <button
                          className="btn btn-ghost btn-icon"
                          title="Сбросить шаблон"
                          style={{ fontSize: 12, color: 'var(--red)' }}
                          onClick={e => resetTemplate(type, e)}
                        >↺</button>
                      </>
                    ) : (
                      <span style={{
                        fontSize: 10, padding: '2px 8px',
                        background: 'var(--bg-overlay)', color: 'var(--text-3)',
                        border: '1px solid var(--border-1)', borderRadius: 'var(--r-f)',
                      }}>
                        Стандартный
                      </span>
                    )}
                    <span style={{ fontSize: 14, color: 'var(--text-3)' }}>›</span>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <div style={{ marginTop: 20, padding: '16px 20px', background: 'var(--bg-elevated)', border: '1px solid var(--border-1)', borderRadius: 'var(--r-lg)' }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-1)', marginBottom: 6 }}>
            💡 Как работают дополнительные шаблоны
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.6 }}>
            Дополнительные шаблоны работают так же, как основные: открываются в редакторе,
            поддерживают плейсхолдеры с автозаполнением, экспорт в PDF и предпросмотр A4.
            При создании документа в деле они доступны в том же меню выбора типа.
          </div>
        </div>
      </div>
    </div>
  )
}
