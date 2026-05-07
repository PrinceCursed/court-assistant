/**
 * UpdateBanner — floating auto-update notification.
 *
 * Lifecycle:
 *   idle → checking → not-available (hides)
 *                  → available   → downloading → ready
 *                  → error       (shows briefly, then hides)
 *
 * The banner renders as a small card in the bottom-right corner.
 * It is invisible until an update is found (or an error occurs).
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
    message?: string   // error message
  }
}

interface DownloadProgress {
  percent: number
  transferred: number
  total: number
  speed: number       // bytes/s
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
  const [version, setVersion]   = useState<string>('')

  // Dismiss hides the banner but does NOT cancel any ongoing download
  const [dismissed, setDismissed] = useState(false)

  const errorTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Fetch the current app version once on mount
  useEffect(() => {
    window.api.getAppVersion().then((v: string) => setVersion(v))
  }, [])

  // Subscribe to updater events from the main process
  useEffect(() => {
    window.api.onUpdateStatus((payload: { state: string; data?: unknown }) => {
      const s = payload as UpdateStatus
      setStatus(s)

      if (s.state === 'available') {
        setDismissed(false)
        setVisible(true)
      }

      if (s.state === 'ready') {
        setDismissed(false)
        setVisible(true)
        setProgress(null)
      }

      if (s.state === 'error') {
        // Show error briefly then hide
        setVisible(true)
        if (errorTimerRef.current) clearTimeout(errorTimerRef.current)
        errorTimerRef.current = setTimeout(() => setVisible(false), 6000)
      }

      if (s.state === 'not-available') {
        setVisible(false)
      }

      if (s.state === 'downloading') {
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

  // Nothing to show
  if (!visible || dismissed) return null

  const { state, data } = status
  const newVersion = data?.version ?? ''

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleDownload = async () => {
    setStatus({ state: 'downloading' })
    setProgress({ percent: 0, transferred: 0, total: 0, speed: 0 })
    await window.api.downloadUpdate()
  }

  const handleInstall = () => {
    window.api.installUpdate()
  }

  const handleCheck = async () => {
    setStatus({ state: 'checking' })
    await window.api.checkUpdate()
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div style={{
      position: 'fixed',
      bottom: 20,
      right: 20,
      zIndex: 9999,
      width: 300,
      background: 'rgba(17,17,20,0.97)',
      border: '1px solid rgba(124,114,245,0.35)',
      borderRadius: 14,
      boxShadow: '0 8px 32px rgba(0,0,0,0.7), 0 0 0 1px rgba(124,114,245,0.12)',
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
          {/* Coloured dot indicating state */}
          <div style={{
            width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
            background:
              state === 'available'    ? '#7c72f5' :
              state === 'downloading'  ? '#5b9cf6' :
              state === 'ready'        ? '#3ecf8e' :
              state === 'error'        ? '#f06c6c' :
              state === 'checking'     ? '#f5a623' :
              '#6a6682',
            boxShadow:
              state === 'available'   ? '0 0 6px #7c72f5' :
              state === 'downloading' ? '0 0 6px #5b9cf6' :
              state === 'ready'       ? '0 0 6px #3ecf8e' :
              state === 'error'       ? '0 0 6px #f06c6c' : 'none',
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

        {/* Dismiss button (not shown while downloading) */}
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

      {/* Body — depends on state */}

      {state === 'available' && (
        <>
          <div style={{ color: '#a8a4c0', marginBottom: 12, lineHeight: 1.5 }}>
            Доступна новая версия{' '}
            <span style={{ color: '#9d95f8', fontWeight: 600 }}>v{newVersion}</span>
          </div>
          <div style={{ display: 'flex', gap: 7 }}>
            <button
              onClick={handleDownload}
              style={{
                flex: 1, padding: '6px 0',
                background: '#7c72f5', color: '#fff',
                border: 'none', borderRadius: 8, cursor: 'pointer',
                fontWeight: 600, fontSize: 11.5,
                boxShadow: '0 1px 3px rgba(124,114,245,0.4)',
                transition: 'all 80ms',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#9d95f8')}
              onMouseLeave={e => (e.currentTarget.style.background = '#7c72f5')}
            >
              ↓ Скачать обновление
            </button>
            <button
              onClick={() => setDismissed(true)}
              style={{
                padding: '6px 11px',
                background: 'rgba(255,255,255,0.04)',
                color: '#6a6682', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 8, cursor: 'pointer',
                fontWeight: 500, fontSize: 11.5,
                transition: 'all 80ms',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#a8a4c0')}
              onMouseLeave={e => (e.currentTarget.style.color = '#6a6682')}
            >
              Позже
            </button>
          </div>
        </>
      )}

      {state === 'downloading' && progress && (
        <>
          <div style={{ color: '#a8a4c0', marginBottom: 8, lineHeight: 1.5 }}>
            Загрузка обновления...{' '}
            <span style={{ color: '#5b9cf6', fontWeight: 600 }}>{progress.percent}%</span>
          </div>
          {/* Progress bar */}
          <div style={{
            height: 4, background: 'rgba(255,255,255,0.07)',
            borderRadius: 4, overflow: 'hidden', marginBottom: 7,
          }}>
            <div style={{
              height: '100%',
              width: `${progress.percent}%`,
              background: 'linear-gradient(90deg, #5b9cf6, #7c72f5)',
              borderRadius: 4,
              transition: 'width 300ms ease',
            }} />
          </div>
          {/* Size / speed */}
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

      {state === 'ready' && (
        <>
          <div style={{ color: '#a8a4c0', marginBottom: 12, lineHeight: 1.5 }}>
            Версия{' '}
            <span style={{ color: '#3ecf8e', fontWeight: 600 }}>v{newVersion}</span>
            {' '}загружена и готова к установке.
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
            ↺ Перезапустить и установить
          </button>
        </>
      )}

      {state === 'checking' && (
        <div style={{ color: '#6a6682' }}>Проверка обновлений...</div>
      )}

      {state === 'error' && (
        <>
          <div style={{ color: '#f06c6c', marginBottom: 10, lineHeight: 1.5, fontSize: 11.5 }}>
            Не удалось проверить обновления.
          </div>
          <button
            onClick={handleCheck}
            style={{
              padding: '5px 12px', background: 'transparent',
              color: '#7c72f5', border: '1px solid rgba(124,114,245,0.35)',
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
