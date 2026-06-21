import React, { useState, useEffect, useCallback } from 'react'
import { v4 as uuid } from 'uuid'
import {
  DocumentType, DOCUMENT_TYPE_LABELS, DOCUMENT_TYPE_GROUPS,
  ADDITIONAL_TEMPLATE_TYPES, CustomTemplate,
} from '../../types'
import { useApp } from '../../store/AppContext'
import { loadCustomTemplates, saveCustomTemplate, deleteCustomTemplate } from '../../storage/storage'
import { docxXmlToBlocks } from '../../templates/customTemplate'

const TYPE_ICONS: Record<string, string> = {
  rejection: '🚫', 'no-move-reasons': '⏸️', 'no-move-fee': '💰',
  return: '↩️', accept: '✅', 'accept-prosecutor': '👮',
  schedule: '📅', decision: '⚖️', motivation: '📝', order: '📋', 'hearing-notes': '🗒️',
  'counter-claim': '🔄', 'expand-participants': '👥', 'state-lawyer': '🧑‍⚖️',
  'jurisdiction-transfer': '🏛️', recusal: '🚷', 'correct-typo': '✏️',
  collegial: '👨‍👩‍👧', consolidate: '🗂️', terminate: '🛑', petition: '📨',
}

const GENERAL_GROUPS: { label: string; types: DocumentType[] }[] = [
  ...DOCUMENT_TYPE_GROUPS,
  { label: 'Дополнительные определения', types: ADDITIONAL_TEMPLATE_TYPES },
]

function fmtAgo(iso: string): string {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000)
  if (days <= 0) return 'сегодня'
  if (days === 1) return 'вчера'
  if (days < 30) return `${days} дн. назад`
  const m = Math.floor(days / 30)
  return `${m} мес. назад`
}

export default function Templates() {
  const { settings, setView } = useApp()
  const [savedTypes, setSavedTypes] = useState<Set<string>>(new Set())
  const [custom, setCustom] = useState<CustomTemplate[]>([])
  const [busy, setBusy] = useState(false)

  const refreshCustom = useCallback(async () => {
    setCustom(await loadCustomTemplates())
  }, [])

  useEffect(() => {
    if (!settings.storagePath) return
    ;(async () => {
      const all = GENERAL_GROUPS.flatMap(g => g.types)
      const exists: string[] = []
      for (const type of all) {
        if (await window.api.fileExists(`${settings.storagePath}/templates/${type}.html`)) exists.push(type)
      }
      setSavedTypes(new Set(exists))
      await refreshCustom()
    })()
  }, [settings.storagePath, refreshCustom])

  const createBlank = async () => {
    const t: CustomTemplate = {
      id: uuid(), name: 'Новый шаблон', blocks: [],
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), source: 'blank',
    }
    await saveCustomTemplate(t)
    setView({ type: 'template-builder', templateId: t.id })
  }

  const uploadDocx = async () => {
    setBusy(true)
    try {
      const path = await window.api.selectFile([{ name: 'Документ Word', extensions: ['docx'] }])
      if (!path) { setBusy(false); return }
      const res = await window.api.importDocx(path)
      if (!res.ok || !res.xml) { alert('Не удалось импортировать: ' + (res.error || 'неизвестная ошибка')); setBusy(false); return }
      const blocks = docxXmlToBlocks(res.xml)
      const fileName = path.split(/[\\/]/).pop()?.replace(/\.docx$/i, '') || 'Импортированный шаблон'
      const t: CustomTemplate = {
        id: uuid(), name: fileName, blocks,
        createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), source: 'docx',
      }
      await saveCustomTemplate(t)
      setView({ type: 'template-builder', templateId: t.id })
    } catch (e) {
      alert('Ошибка импорта: ' + String(e))
    }
    setBusy(false)
  }

  const removeCustom = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (!window.confirm('Удалить кастомный шаблон?')) return
    await deleteCustomTemplate(id)
    await refreshCustom()
  }

  const resetTemplate = async (type: DocumentType, e: React.MouseEvent) => {
    e.stopPropagation()
    if (!window.confirm('Сбросить шаблон к стандартному?')) return
    await window.api.deleteFile(`${settings.storagePath}/templates/${type}.html`)
    setSavedTypes(prev => { const n = new Set(prev); n.delete(type); return n })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div className="page-header">
        <div>
          <div className="page-title">Редактор шаблонов</div>
          <div className="page-subtitle">Кастомные и общие шаблоны судебных документов</div>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '20px 28px' }}>
        {/* ── Кастомные шаблоны ── */}
        <div style={{ background: 'var(--bg-1)', border: '1px solid var(--line-1)', borderRadius: 16, padding: '22px 24px', marginBottom: 26 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--t1)' }}>Кастомные шаблоны</div>
          <div style={{ fontSize: 12.5, color: 'var(--t3)', marginTop: 4, marginBottom: 18 }}>
            Соберите свой шаблон в визуальном конструкторе или загрузите .docx — его оформление будет считано
          </div>

          {custom.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12, marginBottom: 16 }}>
              {custom.map(t => (
                <div
                  key={t.id}
                  onClick={() => setView({ type: 'template-builder', templateId: t.id })}
                  className="tpl-card"
                  style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '14px 16px', borderRadius: 12, background: 'var(--bg-2)', border: '1px solid var(--line-2)', cursor: 'pointer' }}
                >
                  <div style={{ width: 40, height: 40, borderRadius: 10, flexShrink: 0, background: 'var(--ac-bg)', border: '1px solid var(--ac-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ac2)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M9.5 12.5 8 14l1.5 1.5M14.5 12.5 16 14l-1.5 1.5"/></svg>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 650, color: 'var(--t1)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--t3)', marginTop: 2 }}>
                      {t.source === 'docx' ? 'Импорт .docx' : 'Конструктор'} · {fmtAgo(t.createdAt)}
                    </div>
                  </div>
                  <button className="btn btn-ghost btn-sm btn-icon" style={{ color: 'var(--red)', flexShrink: 0 }} title="Удалить" onClick={e => removeCustom(t.id, e)}>🗑️</button>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button className="btn btn-secondary" onClick={createBlank}>
              <span style={{ marginRight: 6 }}>＋</span> Создать кастомный шаблон
            </button>
            <button className="btn btn-secondary" onClick={uploadDocx} disabled={busy}>
              <span style={{ marginRight: 6 }}>⬆</span> {busy ? 'Импорт…' : 'Загрузить шаблон (.docx)'}
            </button>
          </div>
        </div>

        {/* ── Общие шаблоны ── */}
        <div style={{ background: 'var(--bg-1)', border: '1px solid var(--line-1)', borderRadius: 16, padding: '22px 24px' }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--t1)' }}>Общие шаблоны</div>
          <div style={{ fontSize: 12.5, color: 'var(--t3)', marginTop: 4, marginBottom: 20 }}>
            Стандартный набор шаблонов. Кликните, чтобы открыть редактор и настроить под себя
          </div>

          {GENERAL_GROUPS.map(group => (
            <div key={group.label} style={{ marginBottom: 22 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--t3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 11 }}>
                {group.label}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10 }}>
                {group.types.map(type => {
                  const isCustom = savedTypes.has(type)
                  return (
                    <div
                      key={type}
                      className="tpl-card"
                      style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '13px 15px', borderRadius: 12, background: 'var(--bg-2)', cursor: 'pointer', border: isCustom ? '1px solid var(--ac-border)' : '1px solid var(--line-2)' }}
                      onClick={() => setView({ type: 'template-editor', docType: type })}
                    >
                      <div style={{ width: 38, height: 38, borderRadius: 10, flexShrink: 0, background: isCustom ? 'var(--ac-bg)' : 'var(--bg-3)', border: `1px solid ${isCustom ? 'var(--ac-border)' : 'var(--line-2)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17 }}>
                        {TYPE_ICONS[type] || '📄'}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--t1)', lineHeight: 1.3 }}>
                          {DOCUMENT_TYPE_LABELS[type]}
                        </div>
                        <div style={{ fontSize: 10.5, color: isCustom ? 'var(--ac2)' : 'var(--t3)', marginTop: 3 }}>
                          {isCustom ? '✏️ Настроен' : 'Стандартный'}
                        </div>
                      </div>
                      {isCustom && (
                        <button className="btn btn-ghost btn-sm btn-icon" title="Сбросить" style={{ color: 'var(--red)', flexShrink: 0 }} onClick={e => resetTemplate(type, e)}>↺</button>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
