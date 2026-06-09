/**
 * UpdateBanner — floating auto-update notification (App Store style).
 *
 * Lifecycle:
 *   idle → checking → not-available (hides)
 *                  → available → downloading (auto, no user action needed)
 *                             → ready  (shows "Restart to update")
 *                  → error (shows briefly, then hides)
 *
 * The banner is invisible until download is ready or an error occurs.
 * There is NO "Download" button — downloads start automatically in the background.
 */

import React, { useEffect, useRef, useState } from 'react'

// ── Types ─────────────────────────────────────────────────────────────────────

type UpdateState =
  | 'idle'
  | 'checking'
  | 'available'
  | 'downloading'
  | 'ready'
  | 'not-available'
  | 'error'

interface UpdateStatus {
  state: UpdateState
  data?: {
    version?: string
    notes?: string
    message?: string
  }
}

interface DownloadProgress {
  percent: number
  transferred: number
  total: number
  speed: number
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function UpdateBanner() {
  const [status, setStatus]     = useState<UpdateStatus>({ state: 'idle' })
  const [progress, setProgress] = useState<DownloadProgress | null>(null)
  const [visible, setVisible]   = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [version, setVersion]   = useState<string>('')

  const errorTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    window.api.getAppVersion().then((v: string) => setVersion(v))
  }, [])

  useEffect(() => {
    window.api.onUpdateStatus((payload: { state: string; data?: unknown }) => {
      const s = payload as UpdateStatus
      setStatus(s)

      if (s.state === 'available') {
        // Download starts automatically — show a subtle banner with spinner
        setDismissed(false)
        setVisible(true)
      }

      if (s.state === 'ready') {
        // Download complete — show "Restart to update"
        setDismissed(false)
        setVisible(true)
        setProgress(null)
      }

      if (s.state === 'error') {
        setVisible(true)
        if (errorTimerRef.current) clearTimeout(errorTimerRef.current)
        errorTimerRef.current = setTimeout(() => setVisible(false), 6000)
      }

      if (s.state === 'not-available') {
        setVisible(false)
      }

      if (s.state === 'downloading') {
        setDismissed(false)
        setVisible(true)
      }
    })

    window.api.onUpdateProgress((p: DownloadProgress) => {
      setStatus(prev => ({ ...prev, state: 'downloading' }))
      setProgress(p)
      setVisible(true)
    })

    return () => {
      window.api.removeUpdateListeners()
      if (errorTimerRef.current) clearTimeout(errorTimerRef.current)
    }
  }, [])

  if (!visible || dismissed) return null

  const { state, data } = status
  const newVersion = data?.version ?? ''

  const handleInstall = () => {
    window.api.installUpdate()
  }

  const handleCheck = async () => {
    setStatus({ state: 'checking' })
    await window.api.checkUpdate()
  }

  // ── Dot color ─────────────────────────────────────────────────────────────

  const dotColor =
    state === 'available'   ? '#f97316' :
    state === 'downloading' ? '#5b9cf6' :
    state === 'ready'       ? '#3ecf8e' :
    state === 'error'       ? '#f06c6c' :
    state === 'checking'    ? '#f5a623' : '#6a6682'

  const dotGlow =
    state === 'available'   ? '0 0 6px #f97316' :
    state === 'downloading' ? '0 0 6px #5b9cf6' :
    state === 'ready'       ? '0 0 6px #3ecf8e' :
    state === 'error'       ? '0 0 6px #f06c6c' : 'none'

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div style={{
      position: 'fixed',
      bottom: 20,
      right: 20,
      zIndex: 9999,
      width: 300,
      background: 'rgba(17,17,20,0.97)',
      border: '1px solid rgba(249,115,22,0.35)',
      borderRadius: 14,
      boxShadow: '0 8px 32px rgba(0,0,0,0.7), 0 0 0 1px rgba(249,115,22,0.12)',
      padding: '14px 16px',
      fontFamily: "'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      fontSize: 12,
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      animation: 'slideUp 220ms cubic-bezier(.16,1,.3,1)',
    }}>

      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
            background: dotColor,
            boxShadow: dotGlow,
          }} />
          <span style={{ fontWeight: 700, color: '#f2f0fb', letterSpacing: '-0.01em' }}>
            Court Assistant
          </span>
          <span style={{
            fontSize: 10, color: '#6a6682', fontFamily: "'Geist Mono', monospace",
            background: 'rgba(255,255,255,0.04)', borderRadius: 4,
            padding: '1px 5px', border: '1px solid rgba(255,255,255,0.07)',
          }}>
            v{version}
          </span>
        </div>

        {/* Dismiss — hidden during active download */}
        {state !== 'downloading' && (
          <button
            onClick={() => setDismissed(true)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#3d3a52', fontSize: 16, lineHeight: 1,
              padding: '0 2px', transition: 'color 80ms',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#a8a4c0')}
            onMouseLeave={e => (e.currentTarget.style.color = '#3d3a52')}
            title="Скрыть"
          >
            ×
          </button>
        )}
      </div>

      {/* ── available: download started automatically ── */}
      {state === 'available' && (
        <div style={{ color: '#a8a4c0', lineHeight: 1.5 }}>
          Найдена версия{' '}
          <span style={{ color: '#fb923c', fontWeight: 600 }}>v{newVersion}</span>
          {' '}— загрузка начата...
        </div>
      )}

      {/* ── downloading ── */}
      {state === 'downloading' && progress && (
        <>
          <div style={{ color: '#a8a4c0', marginBottom: 8, lineHeight: 1.5 }}>
            Загрузка обновления{newVersion ? ` v${newVersion}` : ''}…{' '}
            <span style={{ color: '#5b9cf6', fontWeight: 600 }}>{progress.percent}%</span>
          </div>
          <div style={{
            height: 4, background: 'rgba(255,255,255,0.07)',
            borderRadius: 4, overflow: 'hidden', marginBottom: 7,
          }}>
            <div style={{
              height: '100%',
              width: `${progress.percent}%`,
              background: 'linear-gradient(90deg, #f97316, #fb923c)',
              borderRadius: 4,
              transition: 'width 300ms ease',
            }} />
          </div>
          <div style={{ color: '#3d3a52', fontSize: 10.5, fontFamily: "'Geist Mono', monospace" }}>
            {formatBytes(progress.transferred)} / {formatBytes(progress.total)}
            {progress.speed > 0 && (
              <span style={{ marginLeft: 8 }}>{formatBytes(progress.speed)}/с</span>
            )}
          </div>
        </>
      )}

      {state === 'downloading' && !progress && (
        <div style={{ color: '#6a6682' }}>Подготовка к загрузке...</div>
      )}

      {/* ── ready: only action is "Restart" ── */}
      {state === 'ready' && (
        <>
          <div style={{ color: '#a8a4c0', marginBottom: 12, lineHeight: 1.5 }}>
            Версия{' '}
            <span style={{ color: '#3ecf8e', fontWeight: 600 }}>v{newVersion}</span>
            {' '}готова. Перезапустите, чтобы применить.
          </div>
          <button
            onClick={handleInstall}
            style={{
              width: '100%', padding: '7px 0',
              background: '#3ecf8e', color: '#0a0a0c',
              border: 'none', borderRadius: 8, cursor: 'pointer',
              fontWeight: 700, fontSize: 12,
              boxShadow: '0 1px 3px rgba(62,207,142,0.4)',
              transition: 'all 80ms',
            }}
            onMouseEnter={e => (e.currentTarget.style.filter = 'brightness(1.12)')}
            onMouseLeave={e => (e.currentTarget.style.filter = '')}
          >
            ↺ Перезапустить и обновить
          </button>
          <div style={{ marginTop: 7, color: '#3d3a52', fontSize: 10.5, textAlign: 'center' }}>
            Или установится автоматически при закрытии
          </div>
        </>
      )}

      {/* ── checking ── */}
      {state === 'checking' && (
        <div style={{ color: '#6a6682' }}>Проверка обновлений...</div>
      )}

      {/* ── error ── */}
      {state === 'error' && (
        <>
          <div style={{ color: '#f06c6c', marginBottom: 10, lineHeight: 1.5, fontSize: 11.5 }}>
            Не удалось проверить обновления.
          </div>
          <button
            onClick={handleCheck}
            style={{
              padding: '5px 12px', background: 'transparent',
              color: '#f97316', border: '1px solid rgba(249,115,22,0.35)',
              borderRadius: 7, cursor: 'pointer',
              fontSize: 11.5, fontWeight: 600,
            }}
          >
            Попробовать снова
          </button>
        </>
      )}
    </div>
  )
}
