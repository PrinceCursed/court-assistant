/**
 * GlobalSearch — Ctrl+K spotlight-style search across all cases, documents,
 * and participants.
 *
 * Usage: mount once in App.tsx. The component listens for 'global-search'
 * CustomEvents dispatched by the Ctrl+K handler in App.tsx.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useApp } from '../../store/AppContext'
import { Case, PARTICIPANT_ROLE_LABELS } from '../../types'

// ── Result types ───────────────────────────────────────────────────────────────

type ResultKind = 'case' | 'document' | 'participant'

interface SearchResult {
  id: string
  kind: ResultKind
  title: string
  subtitle: string
  caseId: string
  documentId?: string
  icon: string
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function matchScore(query: string, text: string): number {
  const q = query.toLowerCase()
  const t = text.toLowerCase()
  if (t === q) return 3
  if (t.startsWith(q)) return 2
  if (t.includes(q)) return 1
  return 0
}

function highlight(text: string, query: string): React.ReactNode {
  if (!query) return text
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return text
  return (
    <>
      {text.slice(0, idx)}
      <mark style={{ background: 'rgba(249,115,22,0.35)', color: 'var(--ac2)', borderRadius: 2, padding: '0 1px' }}>
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  )
}

function buildResults(cases: Case[], query: string): SearchResult[] {
  const q = query.trim()
  if (!q) return []

  const results: (SearchResult & { score: number })[] = []

  for (const c of cases) {
    // Case-level match
    const caseFields = [c.caseNumber, c.title, c.plaintiff, c.defendant, c.prosecutor || '', c.lawyer || '']
    const caseScore = Math.max(...caseFields.map(f => matchScore(q, f)))
    if (caseScore > 0) {
      results.push({
        id: `case-${c.id}`,
        kind: 'case',
        title: c.title || `${c.plaintiff} vs ${c.defendant}`,
        subtitle: `№${c.caseNumber} · ${c.status === 'active' ? 'Активное' : 'Закрытое'}`,
        caseId: c.id,
        icon: '⚖️',
        score: caseScore + (c.status === 'active' ? 0.5 : 0),
      })
    }

    // Document-level match
    for (const doc of c.documents) {
      const docScore = Math.max(matchScore(q, doc.title), matchScore(q, doc.type))
      if (docScore > 0) {
        results.push({
          id: `doc-${c.id}-${doc.id}`,
          kind: 'document',
          title: doc.title,
          subtitle: `Дело №${c.caseNumber}`,
          caseId: c.id,
          documentId: doc.id,
          icon: '📄',
          score: docScore,
        })
      }
    }

    // Participant-level match
    for (const p of c.participants) {
      const fullName = `${p.firstName} ${p.lastName}`.trim()
      const pScore = Math.max(matchScore(q, fullName), matchScore(q, p.firstName), matchScore(q, p.lastName))
      if (pScore > 0) {
        results.push({
          id: `participant-${c.id}-${p.id}`,
          kind: 'participant',
          title: fullName,
          subtitle: `Дело №${c.caseNumber} · ${PARTICIPANT_ROLE_LABELS[p.role]}`,
          caseId: c.id,
          icon: '👤',
          score: pScore,
        })
      }
    }
  }

  // Sort by score desc, then alphabetically
  results.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
  return results.slice(0, 20)
}

// ── Component ─────────────────────────────────────────────────────────────────

interface Props {
  open: boolean
  onClose: () => void
}

export default function GlobalSearch({ open, onClose }: Props) {
  const { cases, openCase, setView } = useApp()
  const [query, setQuery] = useState('')
  const [activeIdx, setActiveIdx] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const results = buildResults(cases, query)

  // Reset + focus when opened
  useEffect(() => {
    if (open) {
      setQuery('')
      setActiveIdx(0)
      setTimeout(() => inputRef.current?.focus(), 40)
    }
  }, [open])

  // Scroll active item into view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${activeIdx}"]`) as HTMLElement | null
    el?.scrollIntoView({ block: 'nearest' })
  }, [activeIdx])

  const navigate = useCallback((result: SearchResult) => {
    onClose()
    if (result.kind === 'document' && result.documentId) {
      setView({ type: 'document-editor', caseId: result.caseId, documentId: result.documentId })
    } else if (result.kind === 'participant') {
      setView({ type: 'case-workspace', caseId: result.caseId, tab: 'participants' })
    } else {
      openCase(result.caseId)
    }
  }, [onClose, openCase, setView])

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { onClose(); return }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIdx(i => results.length > 0 ? Math.min(i + 1, results.length - 1) : 0)
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIdx(i => Math.max(i - 1, 0))
    }
    if (e.key === 'Enter' && results[activeIdx]) navigate(results[activeIdx])
  }, [results, activeIdx, navigate, onClose])

  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 10000,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          animation: 'fadeIn 120ms ease',
        }}
      />

      {/* Panel */}
      <div
        style={{
          position: 'fixed',
          top: '14vh',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10001,
          width: 560,
          maxWidth: 'calc(100vw - 32px)',
          background: 'var(--bg-2)',
          border: '1px solid var(--ac-border)',
          borderRadius: 16,
          boxShadow: '0 24px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(249,115,22,0.1)',
          overflow: 'hidden',
          animation: 'slideDown 150ms cubic-bezier(.16,1,.3,1)',
        }}
      >
        {/* Search input row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderBottom: '1px solid var(--line-0)' }}>
          <span style={{ fontSize: 18, opacity: 0.5 }}>🔍</span>
          <input
            ref={inputRef}
            value={query}
            onChange={e => { setQuery(e.target.value); setActiveIdx(0) }}
            onKeyDown={onKeyDown}
            placeholder="Поиск дел, документов, участников..."
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              outline: 'none',
              color: 'var(--t1)',
              fontSize: 16,
              fontFamily: 'inherit',
            }}
          />
          <kbd style={{
            fontSize: 10, color: 'var(--t3)',
            background: 'var(--bg-4)', border: '1px solid var(--bg-4)',
            borderRadius: 5, padding: '2px 7px',
          }}>ESC</kbd>
        </div>

        {/* Results list */}
        <div ref={listRef} style={{ maxHeight: 380, overflowY: 'auto', padding: '6px 0' }}>
          {query.trim() === '' ? (
            <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--t3)', fontSize: 13 }}>
              Начните вводить для поиска…
            </div>
          ) : results.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--t3)', fontSize: 13 }}>
              Ничего не найдено по запросу «{query}»
            </div>
          ) : (
            results.map((r, i) => (
              <div
                key={r.id}
                data-idx={i}
                onClick={() => navigate(r)}
                onMouseEnter={() => setActiveIdx(i)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '9px 16px',
                  cursor: 'pointer',
                  background: i === activeIdx ? 'var(--ac-bg)' : 'transparent',
                  borderLeft: i === activeIdx ? '2px solid var(--ac)' : '2px solid transparent',
                  transition: 'background 80ms',
                }}
              >
                <span style={{ fontSize: 18, flexShrink: 0, width: 24, textAlign: 'center' }}>{r.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--t1)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {highlight(r.title, query)}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--t3)', marginTop: 1 }}>
                    {r.subtitle}
                  </div>
                </div>
                <span style={{ fontSize: 11, color: 'var(--t4)', flexShrink: 0 }}>
                  {r.kind === 'case' ? 'Дело' : r.kind === 'document' ? 'Документ' : 'Участник'}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 16,
          padding: '8px 16px',
          borderTop: '1px solid var(--line-0)',
          fontSize: 10, color: 'var(--t4)',
        }}>
          <span><kbd style={{ background: 'var(--bg-4)', borderRadius: 3, padding: '1px 5px', border: '1px solid var(--bg-4)' }}>↑↓</kbd> навигация</span>
          <span><kbd style={{ background: 'var(--bg-4)', borderRadius: 3, padding: '1px 5px', border: '1px solid var(--bg-4)' }}>↵</kbd> открыть</span>
          <span><kbd style={{ background: 'var(--bg-4)', borderRadius: 3, padding: '1px 5px', border: '1px solid var(--bg-4)' }}>ESC</kbd> закрыть</span>
          <span style={{ marginLeft: 'auto' }}>Всего: {cases.length} дел</span>
        </div>
      </div>
    </>
  )
}
