import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { Case, Note } from '../../../types'
import { useApp } from '../../../store/AppContext'

interface Props { case_: Case }

export default function Notes({ case_: c }: Props) {
  const { updateCase } = useApp()
  const [newText, setNewText] = useState('')
  const [editNote, setEditNote] = useState<string | null>(null)
  const [editText, setEditText] = useState('')

  const addNote = async () => {
    if (!newText.trim()) return
    const note: Note = {
      id: uuid(), content: newText.trim(), isPinned: false,
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString()
    }
    await updateCase(c.id, { notes: [...c.notes, note] })
    setNewText('')
  }

  const saveEdit = async () => {
    if (!editNote) return
    await updateCase(c.id, {
      notes: c.notes.map(n => n.id === editNote
        ? { ...n, content: editText, updatedAt: new Date().toISOString() }
        : n
      )
    })
    setEditNote(null)
  }

  const pinNote = async (id: string) => {
    await updateCase(c.id, {
      notes: c.notes.map(n => n.id === id ? { ...n, isPinned: !n.isPinned } : n)
    })
  }

  const deleteNote = async (id: string) => {
    await updateCase(c.id, { notes: c.notes.filter(n => n.id !== id) })
  }

  const sorted = [...c.notes].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  })

  const fmt = (iso: string) => new Date(iso).toLocaleDateString('ru-RU', {
    day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
  })

  return (
    <div className="notes-area">
      <div style={{ marginBottom: 16 }}>
        <textarea
          className="note-textarea"
          value={newText}
          onChange={e => setNewText(e.target.value)}
          placeholder="Новая заметка судьи... (Ctrl+Enter для сохранения)"
          rows={3}
          onKeyDown={e => { if (e.key === 'Enter' && e.ctrlKey) { e.preventDefault(); addNote() } }}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
          <button className="btn btn-primary btn-sm" onClick={addNote} disabled={!newText.trim()}>
            + Добавить заметку
          </button>
        </div>
      </div>

      {sorted.length === 0 ? (
        <div className="empty-state" style={{ height: 'auto', paddingTop: 40 }}>
          <div className="empty-state-icon">📝</div>
          <div className="empty-state-text">Заметок нет</div>
          <div className="empty-state-sub">Добавьте заметку судьи выше</div>
        </div>
      ) : (
        sorted.map(note => (
          <div key={note.id} className={`card note-card ${note.isPinned ? 'pinned' : ''}`}>
            {editNote === note.id ? (
              <div>
                <textarea
                  className="note-textarea"
                  value={editText}
                  onChange={e => setEditText(e.target.value)}
                  rows={4}
                  autoFocus
                />
                <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                  <button className="btn btn-primary btn-sm" onClick={saveEdit}>Сохранить</button>
                  <button className="btn btn-ghost btn-sm" onClick={() => setEditNote(null)}>Отмена</button>
                </div>
              </div>
            ) : (
              <>
                {note.isPinned && (
                  <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-accent)', marginBottom: 6, letterSpacing: '0.05em' }}>
                    📌 ЗАКРЕПЛЕНО
                  </div>
                )}
                <div className="note-content">{note.content}</div>
                <div className="note-meta">
                  <span>{fmt(note.updatedAt)}</span>
                  <span style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
                    <button className="btn btn-icon btn-ghost btn-sm" onClick={() => pinNote(note.id)} title={note.isPinned ? 'Открепить' : 'Закрепить'}>
                      {note.isPinned ? '📌' : '📍'}
                    </button>
                    <button className="btn btn-icon btn-ghost btn-sm" onClick={() => { setEditNote(note.id); setEditText(note.content) }} title="Редактировать">
                      ✏️
                    </button>
                    <button className="btn btn-icon btn-ghost btn-sm" onClick={() => deleteNote(note.id)} title="Удалить" style={{ color: 'var(--red)' }}>
                      🗑️
                    </button>
                  </span>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  )
}
