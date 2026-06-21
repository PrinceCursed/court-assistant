import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import { v4 as uuid } from 'uuid'
import { useApp } from '../../store/AppContext'
import { saveCustomTemplate } from '../../storage/storage'
import { docxXmlToBlocks } from '../../templates/customTemplate'
import { CustomTemplate } from '../../types'

export default function Onboarding() {
  const { settings, loading, updateSettings, setView } = useApp()
  const [busy, setBusy] = useState(false)

  if (loading || settings.onboarded || !settings.storagePath) return null

  const usePreloaded = async () => {
    await updateSettings({ onboarded: true })
    setView({ type: 'templates' })
  }

  const uploadDocx = async () => {
    setBusy(true)
    try {
      const path = await window.api.selectFile([{ name: 'Документ Word', extensions: ['docx'] }])
      if (!path) { setBusy(false); return }
      const res = await window.api.importDocx(path)
      if (!res.ok || !res.xml) { alert('Не удалось импортировать: ' + (res.error || 'ошибка')); setBusy(false); return }
      const blocks = docxXmlToBlocks(res.xml)
      const fileName = path.split(/[\\/]/).pop()?.replace(/\.docx$/i, '') || 'Импортированный шаблон'
      const t: CustomTemplate = {
        id: uuid(), name: fileName, blocks,
        createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), source: 'docx',
      }
      await saveCustomTemplate(t)
      await updateSettings({ onboarded: true })
      setView({ type: 'template-builder', templateId: t.id })
    } catch (e) {
      alert('Ошибка импорта: ' + String(e))
    }
    setBusy(false)
  }

  const Card = ({ icon, title, desc, action, accent }: { icon: React.ReactNode; title: string; desc: string; action: () => void; accent?: boolean }) => (
    <button
      onClick={action}
      disabled={busy}
      style={{
        flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 10,
        padding: '22px 22px', borderRadius: 16, cursor: busy ? 'default' : 'pointer', textAlign: 'left',
        background: accent ? 'linear-gradient(150deg, var(--ac-bg), transparent 70%), var(--bg-2)' : 'var(--bg-2)',
        border: `1px solid ${accent ? 'var(--ac-border)' : 'var(--line-2)'}`,
        transition: 'transform 0.13s, border-color 0.13s', fontFamily: 'inherit',
      }}
      onMouseEnter={e => { if (!busy) { const b = e.currentTarget; b.style.transform = 'translateY(-3px)'; b.style.borderColor = 'var(--ac-border-h, var(--ac-border))' } }}
      onMouseLeave={e => { const b = e.currentTarget; b.style.transform = ''; b.style.borderColor = accent ? 'var(--ac-border)' : 'var(--line-2)' }}
    >
      <div style={{ width: 48, height: 48, borderRadius: 13, background: 'var(--bg-3)', border: '1px solid var(--ac-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ac2)' }}>{icon}</div>
      <div style={{ fontSize: 15.5, fontWeight: 700, color: 'var(--t1)' }}>{title}</div>
      <div style={{ fontSize: 12.5, color: 'var(--t3)', lineHeight: 1.5 }}>{desc}</div>
    </button>
  )

  return createPortal(
    <div style={{ position: 'fixed', inset: 0, zIndex: 99000, background: 'rgba(0,0,0,0.66)', WebkitBackdropFilter: 'blur(8px)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 0.3s ease both' }}>
      <div style={{ width: 660, maxWidth: 'calc(100vw - 40px)', background: 'var(--bg-1)', border: '1px solid var(--line-2)', borderRadius: 20, padding: '34px 36px', boxShadow: 'var(--sh-lg)', animation: 'slideUp 0.35s cubic-bezier(.16,1,.3,1) both' }}>
        <div style={{ textAlign: 'center', marginBottom: 26 }}>
          <div style={{ fontSize: 22, fontWeight: 750, color: 'var(--t1)', letterSpacing: '-0.02em' }}>Добро пожаловать в Court Assistant</div>
          <div style={{ fontSize: 13.5, color: 'var(--t3)', marginTop: 8, lineHeight: 1.5 }}>
            С чего начнём работу с шаблонами документов?
          </div>
        </div>
        <div style={{ display: 'flex', gap: 14 }}>
          <Card
            accent
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12m0-12 4 4m-4-4-4 4"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>}
            title="Загрузить свой шаблон"
            desc="Импортируйте .docx — приложение считает оформление и откроет его в конструкторе для доработки."
            action={uploadDocx}
          />
          <Card
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>}
            title="Использовать предзагруженные"
            desc="Готовый набор судебных шаблонов: определения, решения, постановления, ордера и другие."
            action={usePreloaded}
          />
        </div>
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <button className="btn btn-ghost btn-sm" onClick={usePreloaded} disabled={busy} style={{ color: 'var(--t3)' }}>
            Пропустить — выбрать позже
          </button>
        </div>
        {busy && <div style={{ textAlign: 'center', marginTop: 10, fontSize: 12, color: 'var(--ac2)' }}>Импорт…</div>}
      </div>
    </div>,
    document.body,
  )
}
