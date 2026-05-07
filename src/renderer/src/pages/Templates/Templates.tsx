import React, { useState, useEffect } from 'react'
import { DocumentType, DOCUMENT_TYPE_LABELS, DOCUMENT_TYPE_GROUPS } from '../../types'
import { useApp } from '../../store/AppContext'

const TYPE_ICONS: Record<string, string> = {
  rejection: '🚫', 'no-move-reasons': '⏸️', 'no-move-fee': '💰',
  return: '↩️', accept: '✅', 'accept-prosecutor': '👮',
  schedule: '📅', decision: '⚖️', motivation: '📝', order: '📋',
  'hearing-notes': '🗒️'
}

const TYPE_DESC: Record<string, string> = {
  rejection: 'Отказ в принятии искового заявления',
  'no-move-reasons': 'Оставление без движения по нарушениям',
  'no-move-fee': 'Оставление без движения по госпошлине',
  return: 'Возврат искового заявления заявителю',
  accept: 'Принятие к производству',
  'accept-prosecutor': 'Принятие к производству с прокурором',
  schedule: 'Назначение дела к разбирательству',
  decision: 'Финальное решение суда',
  motivation: 'Мотивировочная часть решения',
  order: 'Ордер суда',
  'hearing-notes': 'Рабочие заметки заседания'
}

export default function Templates() {
  const { settings, setView } = useApp()
  const [savedTypes, setSavedTypes] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (!settings.storagePath) return
    ;(async () => {
      const all = DOCUMENT_TYPE_GROUPS.flatMap(g => g.types)
      const exists: string[] = []
      for (const type of all) {
        const has = await window.api.fileExists(`${settings.storagePath}/templates/${type}.html`)
        if (has) exists.push(type)
      }
      setSavedTypes(new Set(exists))
    })()
  }, [settings.storagePath])

  const openTemplate = (type: DocumentType) => {
    setView({ type: 'template-editor', docType: type })
  }

  const resetTemplate = async (type: DocumentType, e: React.MouseEvent) => {
    e.stopPropagation()
    if (!window.confirm('Сбросить шаблон к стандартному?')) return
    await window.api.deleteFile(`${settings.storagePath}/templates/${type}.html`)
    setSavedTypes(prev => { const n = new Set(prev); n.delete(type); return n })
  }

  const totalTypes = DOCUMENT_TYPE_GROUPS.flatMap(g => g.types).length

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div className="page-header">
        <div>
          <div className="page-title">📄 Шаблоны документов</div>
          <div className="page-subtitle">Нажмите на шаблон, чтобы открыть редактор</div>
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-3)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }} />
          {savedTypes.size} из {totalTypes} настроены
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '20px 28px' }}>
        {DOCUMENT_TYPE_GROUPS.map(group => (
          <div key={group.label} style={{ marginBottom: 28 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
              {group.label}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {group.types.map(type => {
                const isCustom = savedTypes.has(type)
                return (
                  <div
                    key={type}
                    className="card"
                    style={{
                      padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14,
                      cursor: 'pointer', transition: 'all var(--t-base)',
                      border: isCustom ? '1px solid rgba(99,102,241,0.35)' : '1px solid var(--border-1)'
                    }}
                    onClick={() => openTemplate(type)}
                  >
                    <div style={{
                      width: 40, height: 40, borderRadius: 'var(--r-md)',
                      background: isCustom ? 'var(--accent-dim)' : 'var(--bg-overlay)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 18, flexShrink: 0,
                      border: isCustom ? '1px solid var(--border-accent)' : '1px solid var(--border-1)'
                    }}>
                      {TYPE_ICONS[type]}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-1)', marginBottom: 2 }}>
                        {DOCUMENT_TYPE_LABELS[type]}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--text-3)' }}>
                        {TYPE_DESC[type] || 'Судебный документ'}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                      {isCustom ? (
                        <>
                          <span style={{ fontSize: 10, padding: '2px 8px', background: 'var(--accent-dim)', color: 'var(--text-accent)', border: '1px solid var(--border-accent)', borderRadius: 'var(--r-f)' }}>
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
                        <span style={{ fontSize: 10, padding: '2px 8px', background: 'var(--bg-overlay)', color: 'var(--text-3)', border: '1px solid var(--border-1)', borderRadius: 'var(--r-f)' }}>
                          Стандартный
                        </span>
                      )}
                      <span style={{ fontSize: 14, color: 'var(--text-3)' }}>›</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        <div style={{ marginTop: 8, padding: '16px 20px', background: 'var(--bg-elevated)', border: '1px solid var(--border-1)', borderRadius: 'var(--r-lg)' }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-1)', marginBottom: 6 }}>
            💡 Как работают шаблоны
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.6 }}>
            Кликните на шаблон — откроется редактор. Отредактируйте и сохраните (Ctrl+S).
            При создании документа в деле используется ваша версия шаблона.
            Переменные <code style={{ fontSize: 11, background: 'var(--bg-overlay)', padding: '0 4px', borderRadius: 4, color: 'var(--text-accent)' }}>[ИСТЕЦ]</code> и другие заменяются данными дела автоматически.
          </div>
        </div>
      </div>
    </div>
  )
}
