import React, { useState, useRef } from 'react'
import { v4 as uuid } from 'uuid'
import { Case, Material, MaterialType } from '../../../types'
import { useApp } from '../../../store/AppContext'
import Modal from '../../../components/Modal/Modal'

interface Props { case_: Case }

const MATERIAL_ICONS: Record<MaterialType, string> = {
  'google-docs': '📊', pdf: '📕', docx: '📘', txt: '📄',
  zip: '🗜️', image: '🖼️', video: '🎬', note: '📝', other: '📎'
}

const TYPE_LABELS: Record<MaterialType, string> = {
  'google-docs': 'Google Docs', pdf: 'PDF', docx: 'Word', txt: 'Текст',
  zip: 'Архив', image: 'Изображение', video: 'Видео', note: 'Заметка', other: 'Файл'
}

function formatSize(bytes?: number) {
  if (!bytes) return ''
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1048576).toFixed(1)} MB`
}

function TxtViewer({ path }: { path: string }) {
  const [text, setText] = React.useState<string | null>(null)
  React.useEffect(() => {
    window.api.readFile(path).then(t => setText(t || ''))
  }, [path])
  return (
    <div style={{ flex: 1, overflow: 'auto', padding: '24px 32px', background: 'var(--bg-surface)' }}>
      <pre style={{ fontSize: 13, color: 'var(--text-1)', lineHeight: 1.7, fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-word', margin: 0 }}>
        {text === null ? 'Загрузка...' : text || '(пустой файл)'}
      </pre>
    </div>
  )
}

export default function Materials({ case_: c }: Props) {
  const { updateCase, addTimelineEvent } = useApp()
  const [dragover, setDragover] = useState(false)
  const [showGdocs, setShowGdocs] = useState(false)
  const [showNote, setShowNote] = useState(false)
  const [gdocsUrl, setGdocsUrl] = useState('')
  const [gdocsName, setGdocsName] = useState('')
  const [noteText, setNoteText] = useState('')
  const [lightbox, setLightbox] = useState<Material | null>(null)
  const [viewNote, setViewNote] = useState<Material | null>(null)
  const [mediaViewer, setMediaViewer] = useState<Material | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const addMaterial = async (mat: Material) => {
    await updateCase(c.id, { materials: [...c.materials, mat] })
    await addTimelineEvent(c.id, { event: `Материал добавлен: ${mat.name}`, type: 'material-added' })
  }

  const removeMaterial = async (id: string) => {
    if (!window.confirm('Удалить материал?')) return
    await updateCase(c.id, { materials: c.materials.filter(m => m.id !== id) })
  }

  // Convert local path to localfile:// URL for in-app viewing
  const toLocalUrl = (filePath: string) =>
    'localfile://' + encodeURIComponent(filePath.replace(/\\/g, '/'))

  const openMaterial = (mat: Material) => {
    if (mat.type === 'image' && mat.preview) {
      setLightbox(mat)
    } else if (mat.type === 'note') {
      setViewNote(mat)
    } else if (mat.type === 'pdf' && mat.path) {
      setMediaViewer(mat)
    } else if (mat.type === 'video' && mat.path) {
      setMediaViewer(mat)
    } else if (mat.type === 'txt' && mat.path) {
      setMediaViewer(mat)
    } else if (mat.url) {
      window.api.openExternal(mat.url)
    } else if (mat.path) {
      window.api.openFile(mat.path)
    }
  }

  const handleFiles = async (files: File[]) => {
    for (const file of files) {
      const ext = file.name.split('.').pop()?.toLowerCase() || ''
      const type: MaterialType = ['pdf'].includes(ext) ? 'pdf'
        : ['docx', 'doc'].includes(ext) ? 'docx'
        : ['txt'].includes(ext) ? 'txt'
        : ['zip', 'rar', '7z'].includes(ext) ? 'zip'
        : ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg'].includes(ext) ? 'image'
        : ['mp4', 'avi', 'mov', 'mkv', 'webm'].includes(ext) ? 'video'
        : 'other'

      let preview: string | undefined
      if (type === 'image') {
        preview = await new Promise(resolve => {
          const reader = new FileReader()
          reader.onload = e => resolve(e.target?.result as string)
          reader.readAsDataURL(file)
        })
      }

      await addMaterial({
        id: uuid(), type, name: file.name,
        path: (file as any).path || '',
        size: file.size, preview,
        createdAt: new Date().toISOString()
      })
    }
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragover(false)
    handleFiles(Array.from(e.dataTransfer.files))
  }

  const addGdocs = async () => {
    if (!gdocsUrl.trim()) return
    await addMaterial({
      id: uuid(), type: 'google-docs',
      name: gdocsName.trim() || 'Google Docs',
      url: gdocsUrl.trim(),
      createdAt: new Date().toISOString()
    })
    setGdocsUrl(''); setGdocsName(''); setShowGdocs(false)
  }

  const addNote = async () => {
    if (!noteText.trim()) return
    await addMaterial({
      id: uuid(), type: 'note', name: 'Заметка',
      note: noteText.trim(),
      createdAt: new Date().toISOString()
    })
    setNoteText(''); setShowNote(false)
  }

  const fmt = (iso: string) => new Date(iso).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: '2-digit' })

  // Group materials by type
  const images = c.materials.filter(m => m.type === 'image')
  const others = c.materials.filter(m => m.type !== 'image')

  return (
    <div className="materials-area">
      <div
        className={`drop-zone ${dragover ? 'dragover' : ''}`}
        onDragOver={e => { e.preventDefault(); setDragover(true) }}
        onDragLeave={() => setDragover(false)}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="drop-zone-icon">📎</div>
        <div className="drop-zone-text">Перетащите файлы или нажмите для выбора</div>
        <div className="drop-zone-sub">PDF, DOCX, TXT, ZIP, изображения, видео</div>
        <input ref={fileInputRef} type="file" multiple style={{ display: 'none' }}
          onChange={e => handleFiles(Array.from(e.target.files || []))} />
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button className="btn btn-secondary btn-sm" onClick={() => setShowGdocs(true)}>
          📊 Google Docs
        </button>
        <button className="btn btn-secondary btn-sm" onClick={() => setShowNote(true)}>
          📝 Заметка
        </button>
      </div>

      {c.materials.length === 0 ? (
        <div className="empty-state" style={{ height: 'auto', paddingTop: 40 }}>
          <div className="empty-state-icon">📎</div>
          <div className="empty-state-text">Материалов нет</div>
          <div className="empty-state-sub">Перетащите файлы или добавьте ссылку</div>
        </div>
      ) : (
        <>
          {/* Image gallery */}
          {images.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                Изображения ({images.length})
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {images.map(mat => (
                  <div
                    key={mat.id}
                    style={{
                      position: 'relative',
                      width: 100, height: 100,
                      borderRadius: 10,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: '1px solid var(--border-2)',
                      flexShrink: 0
                    }}
                    onClick={() => openMaterial(mat)}
                    title={mat.name}
                  >
                    {mat.preview ? (
                      <img src={mat.preview} alt={mat.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-elevated)', fontSize: 28 }}>🖼️</div>
                    )}
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'rgba(0,0,0,0.5)',
                      opacity: 0,
                      transition: 'opacity 0.15s',
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center', gap: 6
                    }}
                      onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                      onMouseLeave={e => (e.currentTarget.style.opacity = '0')}
                    >
                      <div style={{ fontSize: 18 }}>🔍</div>
                      <button
                        className="btn btn-icon btn-ghost"
                        style={{ color: 'var(--red)', fontSize: 14 }}
                        onClick={e => { e.stopPropagation(); removeMaterial(mat.id) }}
                        title="Удалить"
                      >🗑️</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other files */}
          {others.length > 0 && (
            <div>
              {images.length > 0 && (
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                  Файлы и документы ({others.length})
                </div>
              )}
              {others.map(mat => (
                <div key={mat.id} className="card material-card" style={{ cursor: 'pointer' }} onClick={() => openMaterial(mat)}>
                  <div className="material-icon">{MATERIAL_ICONS[mat.type]}</div>
                  <div className="material-info">
                    <div className="material-name">{mat.name}</div>
                    <div className="material-meta">
                      <span style={{ background: 'var(--bg-overlay)', color: 'var(--text-3)', padding: '1px 6px', borderRadius: 4, fontSize: 10, marginRight: 6 }}>
                        {TYPE_LABELS[mat.type]}
                      </span>
                      {fmt(mat.createdAt)}
                      {mat.size ? ` · ${formatSize(mat.size)}` : ''}
                      {mat.note ? ` · ${mat.note.slice(0, 60)}` : ''}
                      {mat.url ? ` · ${mat.url.slice(0, 40)}` : ''}
                    </div>
                  </div>
                  <div className="material-actions" onClick={e => e.stopPropagation()}>
                    <button
                      className="btn btn-icon btn-ghost"
                      onClick={() => openMaterial(mat)}
                      title="Открыть"
                      style={{ fontSize: 14 }}
                    >
                      {mat.url ? '🔗' : mat.type === 'note' ? '👁' : '📂'}
                    </button>
                    <button className="btn btn-icon btn-ghost" onClick={() => removeMaterial(mat.id)} title="Удалить" style={{ color: 'var(--red)' }}>🗑️</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Image lightbox */}
      {lightbox && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(0,0,0,0.92)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', gap: 12
          }}
          onClick={() => setLightbox(null)}
        >
          <div style={{ position: 'absolute', top: 16, right: 16 }}>
            <button className="btn btn-ghost" onClick={() => setLightbox(null)} style={{ fontSize: 18, color: 'var(--text-2)' }}>✕</button>
          </div>
          <img
            src={lightbox.preview}
            alt={lightbox.name}
            style={{ maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain', borderRadius: 8, boxShadow: '0 8px 60px rgba(0,0,0,0.8)' }}
            onClick={e => e.stopPropagation()}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: 12, color: 'var(--text-3)' }}>{lightbox.name}</span>
            {lightbox.path && (
              <button
                className="btn btn-secondary btn-sm"
                onClick={e => { e.stopPropagation(); window.api.openFile(lightbox.path!) }}
              >
                📂 Открыть в проводнике
              </button>
            )}
          </div>
          {/* Gallery navigation */}
          {images.length > 1 && (
            <div style={{ display: 'flex', gap: 8 }}>
              {images.map(img => (
                <div
                  key={img.id}
                  onClick={e => { e.stopPropagation(); setLightbox(img) }}
                  style={{
                    width: 48, height: 48, borderRadius: 6, overflow: 'hidden',
                    border: `2px solid ${img.id === lightbox.id ? 'var(--accent)' : 'transparent'}`,
                    cursor: 'pointer', flexShrink: 0
                  }}
                >
                  {img.preview && (
                    <img src={img.preview} alt={img.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* In-app media viewer (PDF, video, TXT) */}
      {mediaViewer && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.9)', display: 'flex', flexDirection: 'column' }}
          onClick={() => setMediaViewer(null)}
        >
          <div
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '10px 20px', background: 'var(--bg-surface)',
              borderBottom: '1px solid var(--border-1)', flexShrink: 0
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 18 }}>{MATERIAL_ICONS[mediaViewer.type]}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-1)' }}>{mediaViewer.name}</div>
                <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{TYPE_LABELS[mediaViewer.type]}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {mediaViewer.path && (
                <button className="btn btn-secondary btn-sm" onClick={() => window.api.openFile(mediaViewer.path!)}>
                  📂 Открыть внешне
                </button>
              )}
              <button className="btn btn-ghost btn-sm" onClick={() => setMediaViewer(null)}>✕ Закрыть</button>
            </div>
          </div>
          <div style={{ flex: 1, overflow: 'hidden', display: 'flex' }} onClick={e => e.stopPropagation()}>
            {mediaViewer.type === 'pdf' && mediaViewer.path && (
              <iframe
                src={toLocalUrl(mediaViewer.path)}
                style={{ flex: 1, border: 'none', background: '#fff' }}
                title={mediaViewer.name}
              />
            )}
            {mediaViewer.type === 'video' && mediaViewer.path && (
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' }}>
                <video
                  src={toLocalUrl(mediaViewer.path)}
                  controls
                  autoPlay
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
              </div>
            )}
            {mediaViewer.type === 'txt' && mediaViewer.path && (
              <TxtViewer path={mediaViewer.path} />
            )}
          </div>
        </div>
      )}

      {/* Note viewer */}
      {viewNote && (
        <Modal title={`📝 ${viewNote.name}`} onClose={() => setViewNote(null)}
          footer={<button className="btn btn-ghost" onClick={() => setViewNote(null)}>Закрыть</button>}>
          <div style={{ whiteSpace: 'pre-wrap', fontSize: 13, color: 'var(--text-1)', lineHeight: 1.7, minHeight: 80 }}>
            {viewNote.note}
          </div>
        </Modal>
      )}

      {showGdocs && (
        <Modal title="Добавить Google Docs" onClose={() => setShowGdocs(false)}
          footer={<><button className="btn btn-ghost" onClick={() => setShowGdocs(false)}>Отмена</button><button className="btn btn-primary" onClick={addGdocs}>Добавить</button></>}>
          <div className="form-row">
            <div className="input-group">
              <label className="input-label">Название (необязательно)</label>
              <input className="input" value={gdocsName} onChange={e => setGdocsName(e.target.value)} placeholder="Google Docs документ" />
            </div>
            <div className="input-group">
              <label className="input-label">Ссылка *</label>
              <input className="input" value={gdocsUrl} onChange={e => setGdocsUrl(e.target.value)} placeholder="https://docs.google.com/..." autoFocus />
            </div>
          </div>
        </Modal>
      )}

      {showNote && (
        <Modal title="Добавить заметку" onClose={() => setShowNote(false)}
          footer={<><button className="btn btn-ghost" onClick={() => setShowNote(false)}>Отмена</button><button className="btn btn-primary" onClick={addNote}>Добавить</button></>}>
          <textarea className="textarea" value={noteText} onChange={e => setNoteText(e.target.value)} placeholder="Текст заметки..." rows={5} autoFocus />
        </Modal>
      )}
    </div>
  )
}
