import React, { useState, useEffect } from 'react'
import { useApp } from '../../store/AppContext'
import { saveStamp } from '../../storage/storage'

type SettingsTab = 'profile' | 'stamp' | 'heraldry' | 'storage' | 'keys' | 'about'

const NAV_ITEMS: { id: SettingsTab; label: string; icon: React.ReactNode }[] = [
  {
    id: 'profile', label: 'Профиль',
    icon: <svg viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="5.5" cy="3.5" r="2.2"/><path d="M1 10c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4"/></svg>
  },
  {
    id: 'stamp', label: 'Подпись и печать',
    icon: <svg viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M3 10h5M3.5 7h4M3.5 4.5c0-1.1.9-3 4-3s4 1.9 4 3V7h-8V4.5z"/></svg>
  },
  {
    id: 'heraldry', label: 'Геральдика',
    icon: <svg viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M5.5 1L1.5 3v3.5C1.5 9 3.5 10.5 5.5 11c2-.5 4-2 4-4.5V3L5.5 1z"/></svg>
  },
  {
    id: 'storage', label: 'Хранилище',
    icon: <svg viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="1" y="4.5" width="9" height="5.5" rx="1"/><path d="M3.5 4.5V3a2 2 0 014 0v1.5"/><circle cx="5.5" cy="7.5" r=".7" fill="currentColor" stroke="none"/></svg>
  },
  {
    id: 'keys', label: 'Горячие клавиши',
    icon: <svg viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="1" y="3" width="9" height="6" rx="1"/><path d="M3 6h.5M5.5 6h.5M8 6h.5M3 8h5"/></svg>
  },
  {
    id: 'about', label: 'О программе',
    icon: <svg viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="5.5" cy="5.5" r="5"/><path d="M5.5 4.5v.5M5.5 6.5v2"/></svg>
  },
]

const HOTKEYS = [
  ['Ctrl+N',         'Создать новый иск'],
  ['Ctrl+S',         'Сохранить документ'],
  ['Ctrl+P',         'Экспорт в JPEG'],
  ['Ctrl+Z',         'Отменить'],
  ['Ctrl+Y',         'Повторить'],
  ['Ctrl+B',         'Жирный текст'],
  ['Ctrl+I',         'Курсив'],
  ['Ctrl+U',         'Подчёркивание'],
  ['Ctrl+Shift+C',   'Скопировать BBCode'],
  ['/ (в редакторе)','Быстрые вставки'],
]

export default function Settings() {
  const { settings, updateSettings } = useApp()
  const [form, setForm]         = useState({ ...settings })
  const [saved, setSaved]       = useState(false)
  const [tab, setTab]           = useState<SettingsTab>('profile')
  const [appVersion, setAppVersion] = useState('...')

  useEffect(() => { setForm({ ...settings }) }, [settings])
  useEffect(() => { window.api.getAppVersion().then((v: string) => setAppVersion(v)) }, [])

  const buildDate = new Date().toISOString().slice(0, 10)

  const ff = (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm(p => ({ ...p, [key]: e.target.value }))

  const handleSave = async () => {
    await updateSettings(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleSelectFolder = async () => {
    const path = await window.api.selectFolder()
    if (path) setForm(p => ({ ...p, storagePath: path }))
  }

  const handleStampUpload = async () => {
    const path = await window.api.selectFile([
      { name: 'Изображения', extensions: ['png', 'jpg', 'jpeg', 'gif', 'webp'] }
    ])
    if (path) {
      const base64 = await saveStamp(path)
      if (base64) setForm(p => ({ ...p, stampBase64: base64 }))
    }
  }

  const handleHeraldryUpload = async (field: 'heraldryDeterminationBase64' | 'heraldryOrderBase64') => {
    const path = await window.api.selectFile([
      { name: 'Изображения', extensions: ['png', 'jpg', 'jpeg', 'gif', 'webp'] }
    ])
    if (path) {
      const base64 = await window.api.readBinary(path)
      if (base64) setForm(p => ({ ...p, [field]: base64 }))
    }
  }

  const SectionCard = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
    <div style={{
      background: 'var(--bg-1)', border: '1px solid var(--line-1)',
      borderRadius: 'var(--r5)', padding: '18px 20px', marginBottom: 12,
      ...style,
    }}>
      {children}
    </div>
  )

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--t1)', marginBottom: 14, letterSpacing: '-0.01em' }}>
      {children}
    </div>
  )

  const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div style={{ marginBottom: 13 }}>
      <label style={{ display: 'block', fontSize: 10.5, fontWeight: 600, color: 'var(--t2)', marginBottom: 4 }}>
        {label}
      </label>
      {children}
    </div>
  )

  const Grid2 = ({ children }: { children: React.ReactNode }) => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 13 }}>{children}</div>
  )

  const UploadBox = ({ value, onUpload, onRemove }: { value?: string; onUpload: () => void; onRemove?: () => void }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
      {value ? (
        <img src={value} alt="preview" style={{ width: 80, height: 80, objectFit: 'contain', background: '#fff', borderRadius: 8, border: '1px solid var(--line-2)', padding: 4 }} />
      ) : (
        <div
          onClick={onUpload}
          style={{ width: 80, height: 80, borderRadius: 8, border: '1.5px dashed var(--line-2)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, color: 'var(--t3)', cursor: 'pointer', transition: 'all 160ms', background: 'var(--bg-1)' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--ac)'; (e.currentTarget as HTMLElement).style.color = 'var(--ac2)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--line-2)'; (e.currentTarget as HTMLElement).style.color = 'var(--t3)' }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><path d="M10 4v8M6 8l4-4 4 4"/><path d="M3 14v1a2 2 0 002 2h10a2 2 0 002-2v-1"/></svg>
          <span style={{ fontSize: 9.5, fontWeight: 600 }}>Загрузить</span>
        </div>
      )}
      <button className="btn btn-secondary btn-sm" onClick={onUpload} style={{ width: 80 }}>
        {value ? 'Заменить' : 'Загрузить'}
      </button>
      {value && onRemove && (
        <button className="btn btn-ghost btn-sm" onClick={onRemove} style={{ width: 80, color: 'var(--red)' }}>
          Удалить
        </button>
      )}
    </div>
  )

  const Slider = ({ label, min, max, step = 4, value, onChange }: {
    label: string; min: number; max: number; step?: number; value: number; onChange: (v: number) => void
  }) => (
    <Field label={label}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <input
          type="range" min={min} max={max} step={step}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          style={{ flex: 1, accentColor: 'var(--ac)' }}
        />
        <span style={{ fontSize: 12, color: 'var(--t1)', minWidth: 32, textAlign: 'right', fontFamily: 'var(--fm)' }}>{value}</span>
      </div>
    </Field>
  )

  const renderTab = () => {
    switch (tab) {
      case 'profile':
        return (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
              <div style={{ width: 56, height: 56, borderRadius: 12, background: 'linear-gradient(135deg,var(--ac-bg),var(--bg-3))', border: '1px solid var(--line-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 800, color: 'var(--ac2)', flexShrink: 0 }}>
                {(form.judgeFirstName?.[0] || '') + (form.judgeLastName?.[0] || '') || 'СД'}
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--t1)', letterSpacing: '-0.02em' }}>
                  {[form.judgeFirstName, form.judgeLastName].filter(Boolean).join(' ') || 'Судья'}
                </div>
                <div style={{ fontSize: 12, color: 'var(--t3)', marginTop: 2 }}>
                  {form.position || 'Должность не указана'} · Court Assistant v{appVersion}
                </div>
              </div>
            </div>

            <SectionCard>
              <SectionTitle>Личные данные</SectionTitle>
              <Grid2>
                <Field label="Имя">
                  <input className="input" value={form.judgeFirstName} onChange={ff('judgeFirstName')} placeholder="Имя" />
                </Field>
                <Field label="Фамилия">
                  <input className="input" value={form.judgeLastName} onChange={ff('judgeLastName')} placeholder="Фамилия" />
                </Field>
              </Grid2>
            </SectionCard>

            <SectionCard>
              <SectionTitle>Должность и суд</SectionTitle>
              <Field label="Должность (отображается в документах)">
                <input className="input" value={form.position} onChange={ff('position')} placeholder="Окружной судья" />
              </Field>
            </SectionCard>

            <SectionCard>
              <SectionTitle>Оформление</SectionTitle>
              <Field label="Тема интерфейса">
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {([
                    { id: 'dark',   label: '🌙 Тёмная' },
                    { id: 'light',  label: '☀️ Светлая' },
                    { id: 'gta5rp', label: '🏛 GTA5RP' },
                    { id: 'cursed', label: '🩸 Cursed' },
                  ] as const).map(t => {
                    const active = (form.theme ?? 'dark') === t.id
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setForm(p => ({ ...p, theme: t.id }))}
                        style={{
                          padding: '7px 18px',
                          border: `1px solid ${active ? 'var(--ac)' : 'var(--line-2)'}`,
                          borderRadius: 'var(--r2)',
                          background: active ? 'var(--ac-bg)' : 'transparent',
                          color: active ? 'var(--ac2)' : 'var(--t3)',
                          cursor: 'pointer', fontWeight: 600, fontSize: 12.5,
                          transition: 'all 120ms',
                        }}
                      >
                        {t.label}
                      </button>
                    )
                  })}
                </div>
                <div style={{ fontSize: 11, color: 'var(--t3)', marginTop: 7 }}>
                  Изменение применяется сразу после нажатия «Сохранить изменения»
                </div>
              </Field>
            </SectionCard>
          </>
        )

      case 'stamp':
        return (
          <>
            <SectionCard>
              <SectionTitle>Курсивная подпись</SectionTitle>
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 10.5, fontWeight: 600, color: 'var(--t2)', marginBottom: 8 }}>Предпросмотр</div>
                <div style={{ fontFamily: 'var(--fs)', fontSize: 32, color: 'var(--ac)', padding: '10px 18px', background: '#fff', borderRadius: 10, display: 'inline-block', minWidth: 200, textAlign: 'center', boxShadow: 'var(--sh2)' }}>
                  {[form.judgeFirstName, form.judgeLastName].filter(Boolean).join(' ') || 'Подпись судьи'}
                </div>
                <div style={{ fontSize: 11, color: 'var(--t3)', marginTop: 8 }}>
                  Генерируется автоматически из имени и фамилии
                </div>
              </div>
            </SectionCard>

            <SectionCard>
              <SectionTitle>Файл печати</SectionTitle>
              <UploadBox
                value={form.stampBase64}
                onUpload={handleStampUpload}
                onRemove={() => setForm(p => ({ ...p, stampBase64: undefined }))}
              />
            </SectionCard>

            <SectionCard>
              <SectionTitle>Позиция печати на документе</SectionTitle>
              <Grid2>
                <Slider label="Отступ от правого края (px)" min={0} max={200} value={form.stampOffsetX ?? 0} onChange={v => setForm(p => ({ ...p, stampOffsetX: v }))} />
                <Slider label="Отступ от нижнего края (px)" min={0} max={200} value={form.stampOffsetY ?? 0} onChange={v => setForm(p => ({ ...p, stampOffsetY: v }))} />
                <Slider label="Размер печати (px)" min={40} max={300} value={form.stampScale ?? 120} onChange={v => setForm(p => ({ ...p, stampScale: v }))} />
              </Grid2>
            </SectionCard>
          </>
        )

      case 'heraldry':
        return (
          <>
            <SectionCard>
              <SectionTitle>Логотипы документов</SectionTitle>
              <div style={{ fontSize: 12, color: 'var(--t2)', marginBottom: 16, lineHeight: 1.6 }}>
                Логотипы отображаются в шапке соответствующих документов. Рекомендуется PNG с прозрачным фоном.
              </div>
              <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ fontSize: 10.5, fontWeight: 600, color: 'var(--t2)' }}>Логотип определений</div>
                  <div style={{ fontSize: 11, color: 'var(--t3)', marginBottom: 4 }}>Принятия, отказы, возвраты</div>
                  <UploadBox
                    value={form.heraldryDeterminationBase64}
                    onUpload={() => handleHeraldryUpload('heraldryDeterminationBase64')}
                    onRemove={() => setForm(p => ({ ...p, heraldryDeterminationBase64: undefined }))}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ fontSize: 10.5, fontWeight: 600, color: 'var(--t2)' }}>Логотип ордеров</div>
                  <div style={{ fontSize: 11, color: 'var(--t3)', marginBottom: 4 }}>Ордера и предписания</div>
                  <UploadBox
                    value={form.heraldryOrderBase64}
                    onUpload={() => handleHeraldryUpload('heraldryOrderBase64')}
                    onRemove={() => setForm(p => ({ ...p, heraldryOrderBase64: undefined }))}
                  />
                </div>
              </div>
            </SectionCard>

            <SectionCard>
              <SectionTitle>Размер и положение</SectionTitle>
              <Grid2>
                <Slider label="Размер логотипа (px)" min={40} max={200} value={form.heraldrySize ?? 80} onChange={v => setForm(p => ({ ...p, heraldrySize: v }))} />
                <div />
                <Field label="Отступ слева (px)">
                  <input className="input" type="number" min={0} max={300} value={form.heraldryOffsetX ?? 60} onChange={e => setForm(p => ({ ...p, heraldryOffsetX: Number(e.target.value) }))} />
                </Field>
                <Field label="Отступ сверху (px)">
                  <input className="input" type="number" min={0} max={300} value={form.heraldryOffsetY ?? 60} onChange={e => setForm(p => ({ ...p, heraldryOffsetY: Number(e.target.value) }))} />
                </Field>
              </Grid2>
            </SectionCard>
          </>
        )

      case 'storage':
        return (
          <>
            <SectionCard>
              <SectionTitle>Папка хранения данных</SectionTitle>
              <Field label="Путь к папке">
                <div style={{ display: 'flex', gap: 8 }}>
                  <input
                    className="input"
                    value={form.storagePath}
                    onChange={ff('storagePath')}
                    placeholder="C:\CourtAssistant"
                    style={{ flex: 1, fontFamily: 'var(--fm)', fontSize: 12 }}
                  />
                  <button className="btn btn-secondary" onClick={handleSelectFolder}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M1 9.5V4a1 1 0 011-1h3l1.5 1.5H10a1 1 0 011 1v4a1 1 0 01-1 1H2a1 1 0 01-1-1z"/></svg>
                    Выбрать
                  </button>
                </div>
                <div style={{ fontSize: 11, color: 'var(--t3)', marginTop: 6 }}>
                  Здесь хранятся все дела, документы и материалы
                </div>
              </Field>
            </SectionCard>

            <SectionCard style={{ background: 'var(--bg-0)', borderColor: 'var(--line-0)' }}>
              <SectionTitle>Опасная зона</SectionTitle>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14 }}>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--t1)', marginBottom: 3 }}>Очистить все данные</div>
                  <div style={{ fontSize: 11, color: 'var(--t3)' }}>Удалить все дела, документы и настройки. Действие необратимо.</div>
                </div>
                <button
                  className="btn btn-danger btn-sm"
                  style={{ flexShrink: 0 }}
                  onClick={() => window.confirm('Удалить ВСЕ данные? Действие необратимо!')}
                >
                  Очистить
                </button>
              </div>
            </SectionCard>
          </>
        )

      case 'keys':
        return (
          <SectionCard>
            <SectionTitle>Сочетания клавиш</SectionTitle>
            <div style={{ display: 'grid', gap: 0, borderRadius: 'var(--r3)', overflow: 'hidden', border: '1px solid var(--line-1)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', background: 'var(--bg-3)', borderBottom: '1px solid var(--line-1)' }}>
                <div style={{ padding: '8px 12px', fontSize: 10, fontWeight: 700, color: 'var(--t3)', textTransform: 'uppercase', letterSpacing: '.08em', borderRight: '1px solid var(--line-1)' }}>Клавиша</div>
                <div style={{ padding: '8px 12px', fontSize: 10, fontWeight: 700, color: 'var(--t3)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Действие</div>
              </div>
              {HOTKEYS.map(([key, desc], i) => (
                <div key={key} style={{ display: 'grid', gridTemplateColumns: '160px 1fr', background: i % 2 === 0 ? 'var(--bg-0)' : 'var(--bg-1)', borderTop: '1px solid var(--line-0)' }}>
                  <div style={{ padding: '8px 12px', borderRight: '1px solid var(--line-0)' }}>
                    <kbd style={{ background: 'var(--bg-2)', border: '1px solid var(--line-2)', borderBottomWidth: 2, borderRadius: 'var(--r1)', padding: '1.5px 7px', fontSize: 10.5, fontFamily: 'var(--fm)', color: 'var(--ac2)' }}>
                      {key}
                    </kbd>
                  </div>
                  <div style={{ padding: '8px 12px', fontSize: 12, color: 'var(--t2)' }}>{desc}</div>
                </div>
              ))}
            </div>
          </SectionCard>
        )

      case 'about':
        return (
          <>
            <SectionCard style={{ background: 'linear-gradient(135deg,var(--bg-2),var(--bg-1))', borderColor: 'var(--line-2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
                <div style={{ width: 48, height: 48, borderRadius: 11, background: 'linear-gradient(135deg,var(--ac) 0%,#a8762a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(223,160,63,0.4),inset 0 1px 0 rgba(255,255,255,0.15)', flexShrink: 0 }}>
                  <svg width="22" height="22" viewBox="0 0 13 13" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6.5 1v11M1.5 4.5l5-3.5 5 3.5M1 12h11M3.5 12V8M9.5 12V8"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--t1)', letterSpacing: '-0.02em' }}>Court Assistant</div>
                  <div style={{ fontSize: 12, color: 'var(--t3)', marginTop: 2, fontFamily: 'var(--fm)' }}>v{appVersion} · Стабильная сборка</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
                {[
                  ['Разработчик', 'Prince Cursed'],
                  ['Контакт',     'ds: saint.prince'],
                  ['Платформа',   'Electron + React'],
                  ['Дата сборки', buildDate],
                ].map(([label, val]) => (
                  <div key={label} style={{ background: 'var(--bg-3)', border: '1px solid var(--line-1)', borderRadius: 'var(--r3)', padding: '10px 13px' }}>
                    <div style={{ fontSize: 10, color: 'var(--t3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: 3 }}>{label}</div>
                    <div style={{ fontSize: 12.5, color: 'var(--t1)', fontWeight: 600 }}>{val}</div>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard style={{ background: 'var(--bg-0)', borderColor: 'var(--line-0)' }}>
              <SectionTitle>Что нового в v{appVersion}</SectionTitle>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  ['Полноценный редактор — шрифты, размер, цвет текста, выделение, индексы', 'var(--ac)'],
                  ['Исправлен баг со сменой шрифта при вставке текста из Word/браузера', 'var(--green)'],
                  ['Горячая клавиша Ctrl+\\ для сброса форматирования', 'var(--amber)'],
                  ['Имя судьи в боковом меню теперь берётся из настроек', 'var(--t2)'],
                ].map(([text, color]) => (
                  <div key={text as string} style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: color as string, marginTop: 5, flexShrink: 0 }} />
                    <div style={{ fontSize: 12, color: 'var(--t2)', lineHeight: 1.55 }}>{text as string}</div>
                  </div>
                ))}
              </div>
            </SectionCard>
          </>
        )
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div className="page-header">
        <div>
          <div className="page-title">Настройки</div>
          <div className="page-subtitle">Профиль судьи, оформление документов, система</div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button
            className="btn btn-ghost btn-sm"
            style={{ color: 'var(--red)' }}
            onClick={() => {
              if (window.confirm('Сбросить настройки профиля к значениям по умолчанию?')) {
                setForm(p => ({ ...p, judgeFirstName: '', judgeLastName: '', position: 'Окружной судья', stampBase64: undefined, heraldryDeterminationBase64: undefined, heraldryOrderBase64: undefined }))
              }
            }}
          >
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
              <path d="M9.5 2A5 5 0 112 7M9.5 2v3h-3"/>
            </svg>
            Сбросить
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
              <path d="M1.5 5.5l3 3 5-5"/>
            </svg>
            {saved ? 'Сохранено!' : 'Сохранить изменения'}
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <div style={{ width: 200, flexShrink: 0, background: 'var(--bg-1)', borderRight: '1px solid var(--line-1)', padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto' }}>
          <div style={{ fontSize: 9.5, fontWeight: 700, color: 'var(--t4)', textTransform: 'uppercase', letterSpacing: '.10em', padding: '0 6px 7px' }}>
            Разделы
          </div>
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              className={`sidebar-nav-item${tab === item.id ? ' active' : ''}`}
              onClick={() => setTab(item.id)}
            >
              <span className="nav-icon" style={{ width: 13, height: 13 }}>{item.icon}</span>
              <span style={{ flex: 1 }}>{item.label}</span>
            </button>
          ))}
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '22px 26px', background: 'var(--bg-0)' }}>
          {renderTab()}
        </div>
      </div>
    </div>
  )
}