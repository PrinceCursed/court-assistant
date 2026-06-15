import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useApp } from '../../store/AppContext'
import { playNotification, playSend, playReceive, playError } from '../../utils/sound'

interface Msg { id: number; from: 'them' | 'me'; text: string; fired?: boolean }

interface Reply { id: number; text: string; reply: string; fired?: boolean }

const REPLIES: Reply[] = [
  { id: 1, text: 'Прости, Босс, скоро закрою', reply: 'Ладно, не затягивай смотри' },
  { id: 2, text: 'Скоро назначу суд', reply: 'Ладно, не забудь потом откинуть скрин в отчёт по заседаниям' },
  { id: 3, text: '...', reply: 'Prince Cursed увольняет Вас из фракции с причиной «Игнорщик».', fired: true },
]

const FIVE_DAYS = 5 * 86400000

// ── Messages app icon (green bubble) ─────────────────────────────────────────
function MessagesIcon() {
  return (
    <div style={{
      width: 22, height: 22, borderRadius: 6, flexShrink: 0,
      background: 'linear-gradient(180deg, #5BF675 0%, #29C13F 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
    }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff">
        <path d="M12 3C6.5 3 2 6.6 2 11c0 2.5 1.4 4.7 3.6 6.2-.2 1.2-.8 2.5-1.6 3.4 1.6-.2 3.2-.8 4.5-1.7 1.1.3 2.3.5 3.5.5 5.5 0 10-3.6 10-8S17.5 3 12 3z"/>
      </svg>
    </div>
  )
}

function PCAvatar({ size = 30 }: { size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      background: 'radial-gradient(circle at 35% 30%, #3a0a10, #0a0a0b)',
      border: '1px solid rgba(225,29,46,0.6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.5, boxShadow: '0 0 10px rgba(225,29,46,0.4)',
    }}>💀</div>
  )
}

export default function CursedMessages() {
  const { cases, loading } = useApp()
  const [stage, setStage] = useState<'idle' | 'banner' | 'chat'>('idle')
  const [messages, setMessages] = useState<Msg[]>([])
  const [showOptions, setShowOptions] = useState(false)
  const [typing, setTyping] = useState(false)
  const [done, setDone] = useState(false)
  const [fired, setFired] = useState(false)
  const [firedOverlay, setFiredOverlay] = useState(false)
  const idRef = useRef(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const scheduledRef = useRef(false)
  const timerRef = useRef<number | undefined>(undefined)

  // Eligibility: any active case in work > 5 days → show once per launch.
  // Scheduled exactly once (ref guard, no deps-cleanup) so a case-list update
  // during the delay can't cancel the pending banner.
  useEffect(() => {
    if (scheduledRef.current || loading) return
    if (sessionStorage.getItem('pc-prank-seen')) return
    const now = Date.now()
    const overdue = cases.some(c => c.status === 'active' && now - new Date(c.createdAt).getTime() > FIVE_DAYS)
    if (!overdue) return
    scheduledRef.current = true
    sessionStorage.setItem('pc-prank-seen', '1')
    timerRef.current = window.setTimeout(() => { setStage('banner'); playNotification() }, 1400)
  }, [loading, cases])

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current) }, [])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 1e7, behavior: 'smooth' })
  }, [messages, typing, showOptions])

  const push = (m: Omit<Msg, 'id'>) => setMessages(prev => [...prev, { ...m, id: ++idRef.current }])

  const openChat = () => {
    setStage('chat')
    push({ from: 'them', text: 'Почему иски в работе так долго?' })
    playReceive()
    setTimeout(() => setShowOptions(true), 500)
  }

  const choose = (r: Reply) => {
    setShowOptions(false)
    push({ from: 'me', text: r.text })
    playSend()
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      push({ from: 'them', text: r.reply, fired: r.fired })
      if (r.fired) {
        playError()
        setFired(true)
        setTimeout(() => setFiredOverlay(true), 700)
      } else {
        playReceive()
      }
      setDone(true)
    }, 1700)
  }

  const close = () => {
    setStage('idle'); setMessages([]); setShowOptions(false)
    setTyping(false); setDone(false); setFired(false); setFiredOverlay(false)
  }

  if (stage === 'idle') return null

  // ── Banner (top-right, iOS style) ──────────────────────────────────────────
  if (stage === 'banner') {
    return createPortal(
      <div
        onClick={openChat}
        style={{
          position: 'fixed', top: 16, right: 16, width: 360, maxWidth: 'calc(100vw - 32px)',
          zIndex: 100000, cursor: 'pointer',
          background: 'rgba(118,118,124,0.82)',
          WebkitBackdropFilter: 'blur(20px)', backdropFilter: 'blur(20px)',
          borderRadius: 20, padding: '11px 14px 13px',
          boxShadow: '0 12px 40px rgba(0,0,0,0.45)',
          animation: 'bannerDrop 0.5s cubic-bezier(.16,1,.3,1) both',
          color: '#000', fontFamily: "-apple-system, 'Geist', sans-serif",
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <MessagesIcon />
          <span style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: '0.02em', color: 'rgba(0,0,0,0.78)' }}>MESSAGES</span>
          <span style={{ marginLeft: 'auto', fontSize: 12, color: 'rgba(0,0,0,0.6)' }}>сейчас</span>
        </div>
        <div style={{ marginTop: 7 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#000', lineHeight: 1.2 }}>Prince Cursed</div>
          <div style={{ fontSize: 13.5, color: 'rgba(0,0,0,0.85)', marginTop: 2, lineHeight: 1.3 }}>
            Почему иски в работе так долго?
          </div>
        </div>
      </div>,
      document.body,
    )
  }

  // ── Chat (iMessage prototype) ──────────────────────────────────────────────
  return createPortal(
    <div
      onClick={e => { if (e.target === e.currentTarget && done && !fired) close() }}
      style={{
        position: 'fixed', inset: 0, zIndex: 100001,
        background: 'rgba(0,0,0,0.62)', WebkitBackdropFilter: 'blur(6px)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        animation: 'fadeIn 0.25s ease both',
      }}
    >
      <div style={{
        width: 380, maxWidth: 'calc(100vw - 28px)', height: 640, maxHeight: 'calc(100vh - 40px)',
        background: '#000', borderRadius: 30, overflow: 'hidden',
        display: 'flex', flexDirection: 'column', position: 'relative',
        border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 30px 80px rgba(0,0,0,0.7)',
        fontFamily: "-apple-system, 'Geist', sans-serif",
      }}>
        {/* Header */}
        <div style={{
          flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: 5, padding: '14px 16px 10px',
          background: 'rgba(28,28,30,0.92)', WebkitBackdropFilter: 'blur(20px)', backdropFilter: 'blur(20px)',
          borderBottom: '0.5px solid rgba(255,255,255,0.12)', position: 'relative',
        }}>
          <button
            onClick={close}
            style={{
              position: 'absolute', left: 12, top: 14, background: 'none', border: 'none',
              color: '#0a84ff', fontSize: 22, cursor: 'pointer', lineHeight: 1, padding: 4,
            }}
            title="Закрыть"
          >‹</button>
          <PCAvatar size={42} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12.5, fontWeight: 600, color: '#fff' }}>
            Prince Cursed
            <span style={{ fontSize: 9 }}>▾</span>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '14px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {messages.map((m, i) => {
            const mine = m.from === 'me'
            const prevSame = i > 0 && messages[i - 1].from === m.from
            return (
              <div key={m.id} style={{ display: 'flex', justifyContent: mine ? 'flex-end' : 'flex-start', marginTop: prevSame ? 0 : 6 }}>
                <div style={{
                  maxWidth: '75%', padding: '8px 13px', borderRadius: 18, fontSize: 14, lineHeight: 1.32,
                  animation: 'msgPop 0.28s cubic-bezier(.16,1,.3,1) both',
                  ...(mine
                    ? { background: 'linear-gradient(180deg,#3a9bff,#0a84ff)', color: '#fff', borderBottomRightRadius: 5 }
                    : m.fired
                      ? { background: 'linear-gradient(180deg,#e11d2e,#8a0e18)', color: '#fff', borderBottomLeftRadius: 5, boxShadow: '0 0 16px rgba(225,29,46,0.5)', fontWeight: 600 }
                      : { background: '#26262a', color: '#fff', borderBottomLeftRadius: 5 }),
                }}>
                  {m.text}
                </div>
              </div>
            )
          })}

          {/* Typing indicator */}
          {typing && (
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: 6 }}>
              <div style={{ background: '#26262a', borderRadius: 18, borderBottomLeftRadius: 5, padding: '11px 14px', display: 'flex', gap: 4 }}>
                {[0, 1, 2].map(d => (
                  <span key={d} style={{
                    width: 7, height: 7, borderRadius: '50%', background: '#8e8e93',
                    display: 'inline-block', animation: `typingBlink 1.2s infinite ${d * 0.18}s`,
                  }} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Reply options / footer */}
        <div style={{ flexShrink: 0, padding: '10px 12px 16px', background: 'rgba(20,20,22,0.6)', borderTop: '0.5px solid rgba(255,255,255,0.1)' }}>
          {showOptions && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
              {REPLIES.map(r => (
                <button
                  key={r.id}
                  onClick={() => choose(r)}
                  style={{
                    maxWidth: '85%', padding: '9px 15px', borderRadius: 18,
                    border: '1.5px solid #0a84ff', background: 'transparent', color: '#0a84ff',
                    fontFamily: 'inherit', fontSize: 14, fontWeight: 500, cursor: 'pointer',
                    transition: 'background 0.13s, color 0.13s', textAlign: 'right',
                  }}
                  onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = '#0a84ff'; b.style.color = '#fff' }}
                  onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = 'transparent'; b.style.color = '#0a84ff' }}
                >
                  {r.text}
                </button>
              ))}
            </div>
          )}
          {done && !fired && (
            <button
              onClick={close}
              style={{
                width: '100%', padding: '11px', borderRadius: 14, border: 'none',
                background: '#26262a', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer',
              }}
            >Закрыть</button>
          )}
          {!showOptions && !done && !typing && (
            <div style={{ height: 38 }} />
          )}
        </div>

        {/* Fired overlay */}
        {firedOverlay && (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 5,
            background: 'radial-gradient(circle, rgba(120,8,16,0.5), rgba(0,0,0,0.92))',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18,
            animation: 'firedFlash 0.6s ease both',
          }}>
            <div style={{
              border: '4px solid #e11d2e', color: '#ff4757', borderRadius: 14,
              padding: '12px 26px', fontSize: 30, fontWeight: 900, letterSpacing: '0.08em',
              transform: 'rotate(-11deg)', textShadow: '0 0 18px rgba(225,29,46,0.7)',
              boxShadow: '0 0 30px rgba(225,29,46,0.5)', fontFamily: "-apple-system, 'Geist', sans-serif",
            }}>ВЫ УВОЛЕНЫ</div>
            <div style={{ color: '#f0eded', fontSize: 13, maxWidth: 260, textAlign: 'center', lineHeight: 1.5 }}>
              Причина: <strong style={{ color: '#ff4757' }}>«Игнорщик»</strong>
            </div>
            <button
              onClick={close}
              style={{
                marginTop: 6, padding: '10px 28px', borderRadius: 12, border: '1px solid rgba(225,29,46,0.6)',
                background: 'rgba(225,29,46,0.15)', color: '#ff6b78', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer',
              }}
            >Принять судьбу</button>
          </div>
        )}
      </div>
    </div>,
    document.body,
  )
}
