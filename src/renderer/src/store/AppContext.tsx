import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import { v4 as uuid } from 'uuid'
import { Case, Settings, View, TimelineEvent, WorkspaceTab } from '../types'
import {
  loadCases, saveCase, deleteCase as storageDeleteCase,
  loadSettings, saveSettings as storageSaveSettings,
  archiveCase, resetStorageCache, formatDateForTimeline
} from '../storage/storage'
import { applyCustomThemeCss, clearCustomThemeCss } from '../utils/theme'

interface Ctx {
  cases: Case[]
  settings: Settings
  loading: boolean
  view: View
  setView: (v: View) => void
  openCase: (id: string, tab?: WorkspaceTab) => void
  createCase: (data: Omit<Case, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'isPinned' | 'documents' | 'materials' | 'participants' | 'notes' | 'timeline'>) => Promise<Case>
  updateCase: (id: string, patch: Partial<Case>) => Promise<void>
  deleteCase: (id: string) => Promise<void>
  closeCase: (id: string) => Promise<void>
  reopenCase: (id: string) => Promise<void>
  pinCase: (id: string) => Promise<void>
  duplicateCase: (id: string) => Promise<Case>
  updateSettings: (patch: Partial<Settings>) => Promise<void>
  nextCaseNumber: () => string
  addTimelineEvent: (caseId: string, event: Omit<TimelineEvent, 'id' | 'date'>) => Promise<void>
}

const AppContext = createContext<Ctx>(null!)
export const useApp = () => useContext(AppContext)

function defaultSettings(): Settings {
  return { judgeFirstName: '', judgeLastName: '', position: 'Окружной судья', storagePath: '' }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [cases, setCases] = useState<Case[]>([])
  const [settings, setSettings] = useState<Settings>(defaultSettings())
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<View>({ type: 'dashboard' })
  const caseNumberRef = useRef(1)

  useEffect(() => {
    ;(async () => {
      const s = await loadSettings()
      setSettings(s)
      document.documentElement.setAttribute('data-theme', s.theme ?? 'dark')
      if (s.theme === 'custom') {
        applyCustomThemeCss(s.customBgR??20, s.customBgG??20, s.customBgB??30, s.customAccR??200, s.customAccG??150, s.customAccB??50)
      }
      if (!s.storagePath) {
        const dataPath = await window.api.getDataPath()
        const defaultPath = dataPath + '/CourtAssistant'
        await window.api.mkdir(defaultPath)
        const updated = { ...s, storagePath: defaultPath }
        setSettings(updated)
        await storageSaveSettings(updated)
      }
      const loaded = await loadCases()
      setCases(loaded)
      const nums = loaded.map(c => parseInt(c.caseNumber.replace(/\D/g, '')) || 0)
      caseNumberRef.current = nums.length > 0 ? Math.max(...nums) + 1 : 1000
      setLoading(false)

      // Check deadlines and fire OS notifications
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const due = loaded.filter(c => {
        if (c.status !== 'active' || !c.deadline) return false
        const dl = new Date(c.deadline)
        dl.setHours(0, 0, 0, 0)
        return dl <= today
      })
      if (due.length > 0 && 'Notification' in window) {
        const fireAll = () => due.forEach(c => {
          const dl = new Date(c.deadline!)
          dl.setHours(0, 0, 0, 0)
          const isToday = dl.getTime() === today.getTime()
          new window.Notification(isToday ? '🔔 Дедлайн сегодня' : '⚠️ Дедлайн просрочен', {
            body: `Дело №${c.caseNumber}: ${c.title || `${c.plaintiff} vs ${c.defendant}`}`
          })
        })
        if (Notification.permission === 'granted') {
          fireAll()
        } else if (Notification.permission !== 'denied') {
          Notification.requestPermission().then(p => { if (p === 'granted') fireAll() })
        }
      }
    })()
  }, [])

  const openCase = useCallback((id: string, tab?: WorkspaceTab) => {
    setView({ type: 'case-workspace', caseId: id, tab })
  }, [])

  const nextCaseNumber = useCallback(() => {
    return String(caseNumberRef.current++)
  }, [])

  const persistCase = useCallback(async (c: Case) => {
    await saveCase(c)
  }, [])

  const createCase = useCallback(async (data: Omit<Case, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'isPinned' | 'documents' | 'materials' | 'participants' | 'notes' | 'timeline'>): Promise<Case> => {
    const now = new Date().toISOString()
    const newCase: Case = {
      id: uuid(),
      status: 'active',
      isPinned: false,
      documents: [],
      materials: [],
      participants: [
        { id: uuid(), role: 'plaintiff', firstName: data.plaintiff.split(' ')[0] || '', lastName: data.plaintiff.split(' ').slice(1).join(' ') || '' },
        { id: uuid(), role: 'defendant', firstName: data.defendant.split(' ')[0] || '', lastName: data.defendant.split(' ').slice(1).join(' ') || '' },
        { id: uuid(), role: 'judge', firstName: settings.judgeFirstName, lastName: settings.judgeLastName, position: settings.position }
      ],
      notes: [],
      timeline: [{
        id: uuid(), date: formatDateForTimeline(new Date()),
        event: 'Дело создано', type: 'created'
      }],
      createdAt: now, updatedAt: now,
      ...data
    }
    if (data.prosecutor) {
      newCase.participants.push({ id: uuid(), role: 'prosecutor', firstName: data.prosecutor.split(' ')[0] || '', lastName: data.prosecutor.split(' ').slice(1).join(' ') || '' })
    }
    if (data.lawyer) {
      newCase.participants.push({ id: uuid(), role: 'lawyer', firstName: data.lawyer.split(' ')[0] || '', lastName: data.lawyer.split(' ').slice(1).join(' ') || '' })
    }
    await persistCase(newCase)
    setCases(prev => [newCase, ...prev])
    return newCase
  }, [settings, persistCase])

  const updateCase = useCallback(async (id: string, patch: Partial<Case>) => {
    setCases(prev => prev.map(c => {
      if (c.id !== id) return c
      const updated = { ...c, ...patch, updatedAt: new Date().toISOString() }
      persistCase(updated)
      return updated
    }))
  }, [persistCase])

  const deleteCase = useCallback(async (id: string) => {
    await storageDeleteCase(id)
    setCases(prev => prev.filter(c => c.id !== id))
    // Navigate to case list, but ONLY if not already there.
    // Using functional update to avoid creating a new object reference when
    // the view is already active-cases — that would cause a spurious re-render
    // that resets focus in any open modal form.
    setView(prev => prev.type === 'active-cases' ? prev : { type: 'active-cases' })
  }, [])

  const closeCase = useCallback(async (id: string) => {
    setCases(prev => prev.map(c => {
      if (c.id !== id) return c
      const updated: Case = {
        ...c, status: 'closed', updatedAt: new Date().toISOString(),
        timeline: [...c.timeline, {
          id: uuid(), date: formatDateForTimeline(new Date()),
          event: 'Дело закрыто', type: 'closed'
        }]
      }
      persistCase(updated)
      archiveCase(updated)
      return updated
    }))
    setView({ type: 'active-cases' })
  }, [persistCase])

  const reopenCase = useCallback(async (id: string) => {
    setCases(prev => prev.map(c => {
      if (c.id !== id) return c
      const updated: Case = {
        ...c, status: 'active', updatedAt: new Date().toISOString(),
        timeline: [...c.timeline, {
          id: uuid(), date: formatDateForTimeline(new Date()),
          event: 'Дело возвращено в работу', type: 'custom'
        }]
      }
      persistCase(updated)
      return updated
    }))
    setView({ type: 'active-cases' })
  }, [persistCase])

  const pinCase = useCallback(async (id: string) => {
    setCases(prev => prev.map(c => {
      if (c.id !== id) return c
      const updated = { ...c, isPinned: !c.isPinned, updatedAt: new Date().toISOString() }
      persistCase(updated)
      return updated
    }))
  }, [persistCase])

  const duplicateCase = useCallback(async (id: string): Promise<Case> => {
    const original = cases.find(c => c.id === id)!
    const now = new Date().toISOString()
    const dup: Case = {
      ...original,
      id: uuid(),
      caseNumber: nextCaseNumber(),
      title: original.title + ' (копия)',
      status: 'active', isPinned: false,
      createdAt: now, updatedAt: now,
      timeline: [{ id: uuid(), date: formatDateForTimeline(new Date()), event: 'Дело создано (дублирование)', type: 'created' }]
    }
    await persistCase(dup)
    setCases(prev => [dup, ...prev])
    return dup
  }, [cases, nextCaseNumber, persistCase])

  const updateSettings = useCallback(async (patch: Partial<Settings>) => {
    const updated = { ...settings, ...patch }
    setSettings(updated)
    if (patch.theme) {
      document.documentElement.setAttribute('data-theme', patch.theme)
      if (patch.theme !== 'custom') clearCustomThemeCss()
    }
    const effectiveTheme = patch.theme ?? updated.theme
    if (effectiveTheme === 'custom') {
      applyCustomThemeCss(updated.customBgR??20, updated.customBgG??20, updated.customBgB??30, updated.customAccR??200, updated.customAccG??150, updated.customAccB??50)
    }
    if (patch.storagePath && patch.storagePath !== settings.storagePath) {
      resetStorageCache()
      await window.api.mkdir(patch.storagePath)
    }
    await storageSaveSettings(updated)
  }, [settings])

  const addTimelineEvent = useCallback(async (caseId: string, event: Omit<TimelineEvent, 'id' | 'date'>) => {
    const ev: TimelineEvent = { id: uuid(), date: formatDateForTimeline(new Date()), ...event }
    await updateCase(caseId, {
      timeline: [...(cases.find(c => c.id === caseId)?.timeline || []), ev]
    })
  }, [cases, updateCase])

  return (
    <AppContext.Provider value={{
      cases, settings, loading, view, setView, openCase,
      createCase, updateCase, deleteCase, closeCase, reopenCase, pinCase, duplicateCase,
      updateSettings, nextCaseNumber, addTimelineEvent
    }}>
      {children}
    </AppContext.Provider>
  )
}
