import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { Case, CaseDocument, DocumentType, DOCUMENT_TYPE_LABELS, DOCUMENT_TYPE_GROUPS } from '../../../types'
import { useApp } from '../../../store/AppContext'
import { generateDocumentContent, fillTemplatePlaceholders } from '../../../templates/documentTemplates'

interface Props { case_: Case }

const TYPE_ICONS: Record<string, string> = {
  rejection: '🚫', 'no-move-reasons': '⏸️', 'no-move-fee': '💰',
  return: '↩️', accept: '✅', 'accept-prosecutor': '👮',
  schedule: '📅', decision: '⚖️', motivation: '📝', order: '📋',
  'hearing-notes': '🗒️',
  'counter-claim': '🔄', 'expand-participants': '👥', 'state-lawyer': '🧑‍⚖️',
  'jurisdiction-transfer': '🏛️', recusal: '🚷', 'correct-typo': '✏️',
  collegial: '👨‍👩‍👧', consolidate: '🗂️', terminate: '🛑', petition: '📨',
}

type FlowNodeType = 'root' | 'question' | 'doc'
interface FlowNode {
  id: string
  type: FlowNodeType
  label: string
  icon?: string
  docType?: DocumentType
  children?: FlowNode[]
}

const FLOW_TREE: FlowNode = {
  id: 'root', type: 'root', label: 'Окружной суд', icon: '⚖️',
  children: [
    {
      id: 'q-claim', type: 'question', label: 'Исковое заявление',
      children: [
        {
          id: 'q-no', type: 'question', label: 'Не соответствует требованиям',
          children: [
            { id: 'doc-reject', type: 'doc', icon: '🚫', label: 'Отказ в принятии', docType: 'rejection' },
            { id: 'doc-no-r', type: 'doc', icon: '⏸️', label: 'Без движения (нарушения)', docType: 'no-move-reasons' },
            { id: 'doc-no-f', type: 'doc', icon: '💰', label: 'Без движения (пошлина)', docType: 'no-move-fee' },
            { id: 'doc-return', type: 'doc', icon: '↩️', label: 'Возврат иска', docType: 'return' },
          ]
        },
        {
          id: 'q-yes', type: 'question', label: 'Соответствует — принять',
          children: [
            { id: 'doc-accept', type: 'doc', icon: '✅', label: 'Без прокурора', docType: 'accept' },
            { id: 'doc-accept-p', type: 'doc', icon: '👮', label: 'С прокурором', docType: 'accept-prosecutor' },
          ]
        },
      ]
    },
    {
      id: 'q-process', type: 'question', label: 'Судебный процесс',
      children: [
        { id: 'doc-schedule', type: 'doc', icon: '📅', label: 'Назначение заседания', docType: 'schedule' },
        { id: 'doc-notes', type: 'doc', icon: '🗒️', label: 'Заметки заседания', docType: 'hearing-notes' },
      ]
    },
    {
      id: 'q-final', type: 'question', label: 'Итоговые акты',
      children: [
        { id: 'doc-decision', type: 'doc', icon: '⚖️', label: 'Финальное решение', docType: 'decision' },
        { id: 'doc-motivation', type: 'doc', icon: '📝', label: 'Мотивировка', docType: 'motivation' },
        { id: 'doc-order', type: 'doc', icon: '📋', label: 'Ордер', docType: 'order' },
      ]
    },
    {
      id: 'q-additional', type: 'question', label: 'Дополнительные определения',
      children: [
        { id: 'doc-counter',   type: 'doc', icon: '🔄', label: 'Встречный иск',          docType: 'counter-claim' },
        { id: 'doc-expand',    type: 'doc', icon: '👥', label: 'Расширение круга лиц',    docType: 'expand-participants' },
        { id: 'doc-lawyer',    type: 'doc', icon: '🧑‍⚖️', label: 'Гос. адвокат',           docType: 'state-lawyer' },
        { id: 'doc-juris',     type: 'doc', icon: '🏛️', label: 'Передача по подсудности', docType: 'jurisdiction-transfer' },
        { id: 'doc-recusal',   type: 'doc', icon: '🚷', label: 'Отвод лица',              docType: 'recusal' },
        { id: 'doc-typo',      type: 'doc', icon: '✏️', label: 'Исправление описки',      docType: 'correct-typo' },
        { id: 'doc-collegial', type: 'doc', icon: '👨‍👩‍👧', label: 'Коллегиальное рассмотрение', docType: 'collegial' },
        { id: 'doc-consol',    type: 'doc', icon: '🗂️', label: 'Объединение дел',          docType: 'consolidate' },
        { id: 'doc-terminate', type: 'doc', icon: '🛑', label: 'Прекращение производства', docType: 'terminate' },
        { id: 'doc-petition',  type: 'doc', icon: '📨', label: 'Ходатайство',             docType: 'petition' },
      ]
    }
  ]
}

function FlowNodeCard({ node, onSelect, depth = 0 }: {
  node: FlowNode
  onSelect: (type: DocumentType) => void
  depth?: number
}) {
  const [expanded, setExpanded] = React.useState(depth < 2)

  if (node.type === 'doc') {
    return (
      <div
        style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px',
          background: 'var(--accent-dim)', border: '1px solid var(--border-accent)',
          borderRadius: 8, cursor: 'pointer', transition: 'all 0.15s', marginBottom: 4
        }}
        onClick={() => node.docType && onSelect(node.docType)}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(99,102,241,0.25)' }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--accent-dim)' }}
      >
        <span style={{ fontSize: 15 }}>{node.icon}</span>
        <span style={{ flex: 1, fontSize: 12, fontWeight: 500, color: 'var(--text-1)' }}>{node.label}</span>
        <span style={{ fontSize: 11, color: 'var(--text-accent)' }}>Создать →</span>
      </div>
    )
  }

  return (
    <div style={{ marginBottom: 4 }}>
      <div
        style={{
          display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px',
          background: node.type === 'root' ? 'var(--bg-overlay)' : 'var(--bg-elevated)',
          border: '1px solid var(--border-1)', borderRadius: 8, cursor: 'pointer', marginBottom: 4
        }}
        onClick={() => setExpanded(e => !e)}
      >
        {node.icon && <span style={{ fontSize: 14 }}>{node.icon}</span>}
        <span style={{ flex: 1, fontSize: 12, fontWeight: node.type === 'root' ? 600 : 500, color: 'var(--text-1)' }}>
          {node.label}
        </span>
        {!!node.children?.length && (
          <span style={{
            fontSize: 12, color: 'var(--text-3)',
            transform: expanded ? 'rotate(90deg)' : 'none',
            display: 'inline-block', transition: 'transform 0.15s'
          }}>›</span>
        )}
      </div>
      {expanded && node.children && (
        <div style={{ paddingLeft: 16, borderLeft: '2px solid var(--border-1)', marginLeft: 10 }}>
          {node.children.map(child => (
            <FlowNodeCard key={child.id} node={child} onSelect={onSelect} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function Documents({ case_: c }: Props) {
  const { updateCase, settings, addTimelineEvent, setView } = useApp()
  const [showPicker, setShowPicker] = useState(false)
  const [pickerMode, setPickerMode] = useState<'flow' | 'list'>('flow')

  const createDocument = async (type: DocumentType) => {
    setShowPicker(false)

    // "Шаблоны документов" is the source of truth.
    // Read the saved template file; if it exists, fill in the known case-specific
    // placeholders (plaintiff, defendant, judge, date, case#) while leaving
    // unknown ones as highlighted marks the judge can click to fill in.
    // If no custom template file has been saved yet, fall back to the canonical
    // generator (which already embeds real case data directly).
    const templateHtml = await window.api.readFile(
      `${settings.storagePath}/templates/${type}.html`
    )
    const content = templateHtml
      ? fillTemplatePlaceholders(templateHtml, c, settings)
      : generateDocumentContent(type, c, settings)

    const doc: CaseDocument = {
      id: uuid(), type,
      title: DOCUMENT_TYPE_LABELS[type],
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    await updateCase(c.id, { documents: [...c.documents, doc] })
    await addTimelineEvent(c.id, { event: 'Документ создан: ' + doc.title, type: 'document-added' })
    setView({ type: 'document-editor', caseId: c.id, documentId: doc.id })
  }

  const deleteDocument = async (docId: string) => {
    if (!window.confirm('Удалить документ?')) return
    await updateCase(c.id, { documents: c.documents.filter(d => d.id !== docId) })
  }

  const openDocument = (doc: CaseDocument) => {
    setView({ type: 'document-editor', caseId: c.id, documentId: doc.id })
  }

  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })

  return (
    <div className="doc-list">
      <div className="doc-list-header">
        <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-2)' }}>
          {c.documents.length === 0 ? 'Документов нет' : `${c.documents.length} документов`}
        </div>
        <button className="btn btn-primary" onClick={() => setShowPicker(true)} disabled={c.status === 'closed'}>
          + Новый документ
        </button>
      </div>

      {/* Document picker modal */}
      {showPicker && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 400,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
          onClick={() => setShowPicker(false)}
        >
          <div
            style={{
              background: 'var(--bg-surface)', border: '1px solid var(--border-2)',
              borderRadius: 'var(--r-xl)', padding: 24, width: 460, maxHeight: '80vh',
              display: 'flex', flexDirection: 'column', boxShadow: 'var(--sh-lg)'
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-1)' }}>Выбор документа</div>
                <div style={{ fontSize: 11, color: 'var(--text-3)' }}>Дело №{c.caseNumber} · {c.title}</div>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button
                  className={`btn btn-sm ${pickerMode === 'flow' ? 'btn-secondary' : 'btn-ghost'}`}
                  onClick={() => setPickerMode('flow')}
                >🌿 Дерево</button>
                <button
                  className={`btn btn-sm ${pickerMode === 'list' ? 'btn-secondary' : 'btn-ghost'}`}
                  onClick={() => setPickerMode('list')}
                >≡ Список</button>
                <button className="btn btn-ghost btn-icon btn-sm" onClick={() => setShowPicker(false)}>✕</button>
              </div>
            </div>

            <div style={{ flex: 1, overflow: 'auto' }}>
              {pickerMode === 'flow' ? (
                <FlowNodeCard node={FLOW_TREE} onSelect={createDocument} />
              ) : (
                DOCUMENT_TYPE_GROUPS.map((group, gi) => (
                  <div key={group.label} style={{ marginBottom: 14 }}>
                    {gi > 0 && <div style={{ height: 1, background: 'var(--border-1)', marginBottom: 10 }} />}
                    <div style={{
                      fontSize: 10, fontWeight: 700, color: 'var(--text-3)',
                      textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6
                    }}>
                      {group.label}
                    </div>
                    {group.types.map(type => (
                      <div
                        key={type}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 10,
                          padding: '8px 10px', borderRadius: 8, cursor: 'pointer', marginBottom: 2
                        }}
                        onClick={() => createDocument(type)}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-overlay)' }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
                      >
                        <span style={{ fontSize: 14, width: 22, textAlign: 'center' }}>{TYPE_ICONS[type]}</span>
                        <span style={{ fontSize: 12, color: 'var(--text-1)' }}>{DOCUMENT_TYPE_LABELS[type]}</span>
                      </div>
                    ))}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {c.documents.length === 0 ? (
        <div className="empty-state" style={{ height: 'auto', paddingTop: 60 }}>
          <div className="empty-state-icon"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M9 13h6M9 17h4"/></svg></div>
          <div className="empty-state-text">Нет документов</div>
          <div className="empty-state-sub">Нажмите «+ Новый документ» для создания</div>
        </div>
      ) : (
        c.documents.map(doc => (
          <div key={doc.id} className="card doc-card" onClick={() => openDocument(doc)}>
            <div className="doc-card-icon">{TYPE_ICONS[doc.type] || '📄'}</div>
            <div className="doc-card-info">
              <div className="doc-card-title">{doc.title}</div>
              <div className="doc-card-meta">
                Обновлено {fmt(doc.updatedAt)}
                {doc.versions && doc.versions.length > 0 && (
                  <span style={{ marginLeft: 8, color: 'var(--text-accent)', fontSize: 10 }}>
                    · v{Math.max(...doc.versions.map(v => v.version)) + 1}
                  </span>
                )}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 4, flexShrink: 0 }} onClick={e => e.stopPropagation()}>
              <button className="btn btn-icon btn-ghost" onClick={() => openDocument(doc)} title="Редактировать"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/></svg></button>
              <button className="btn btn-icon btn-ghost" onClick={() => deleteDocument(doc.id)} title="Удалить" style={{ color: 'var(--red)' }}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
