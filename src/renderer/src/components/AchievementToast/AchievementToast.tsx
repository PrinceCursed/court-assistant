import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useApp } from '../../store/AppContext'
import { evaluateAchievements, unlockedIds, AchievementProgress } from '../../data/achievements'
import { playAchievement } from '../../utils/sound'

const STORAGE = 'ca-unlocked-achievements'

export default function AchievementToast() {
  const { cases, loading } = useApp()
  const [queue, setQueue] = useState<AchievementProgress[]>([])
  const seededRef = useRef(false)

  // Detect newly-unlocked achievements and enqueue toasts
  useEffect(() => {
    if (loading) return
    const current = unlockedIds(cases)
    const raw = localStorage.getItem(STORAGE)

    // First ever run: seed silently so we don't toast pre-existing achievements
    if (raw === null) {
      localStorage.setItem(STORAGE, JSON.stringify(current))
      seededRef.current = true
      return
    }

    let stored: string[] = []
    try { stored = JSON.parse(raw) } catch { stored = [] }
    const newly = current.filter(id => !stored.includes(id))

    if (newly.length > 0) {
      const all = evaluateAchievements(cases)
      const items = newly.map(id => all.find(a => a.id === id)).filter(Boolean) as AchievementProgress[]
      setQueue(q => [...q, ...items])
      playAchievement()
      localStorage.setItem(STORAGE, JSON.stringify(current))
    } else if (current.length !== stored.length) {
      localStorage.setItem(STORAGE, JSON.stringify(current))
    }
  }, [cases, loading])

  // Auto-dismiss the front of the queue
  useEffect(() => {
    if (queue.length === 0) return
    const t = setTimeout(() => setQueue(q => q.slice(1)), 5200)
    return () => clearTimeout(t)
  }, [queue])

  const top = queue[0]
  if (!top) return null

  return createPortal(
    <div style={{
      position: 'fixed', bottom: 26, left: '50%', transform: 'translateX(-50%)',
      zIndex: 100002, width: 340, maxWidth: 'calc(100vw - 32px)',
      animation: 'achToastIn 0.45s cubic-bezier(.16,1,.3,1) both',
    }}>
      <div
        onClick={() => setQueue(q => q.slice(1))}
        style={{
          display: 'flex', alignItems: 'center', gap: 13, cursor: 'pointer',
          background: 'var(--bg-2)', border: `1px solid ${top.color}`,
          borderRadius: 15, padding: '13px 16px',
          boxShadow: 'var(--sh-lg), var(--ac-glow) 0 0 24px',
        }}
      >
        <div style={{
          width: 46, height: 46, borderRadius: 12, flexShrink: 0,
          background: 'var(--bg-3)', border: `1px solid ${top.color}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
        }}>{top.icon}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'var(--fm)', fontSize: 9.5, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: top.color }}>
            🏆 Достижение получено
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--t1)', marginTop: 2 }}>{top.title}</div>
          <div style={{ fontSize: 11.5, color: 'var(--t3)', marginTop: 1 }}>{top.description}</div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
