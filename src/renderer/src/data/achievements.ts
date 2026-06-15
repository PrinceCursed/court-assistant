import { Case } from '../types'

export interface AchievementStats {
  created: number
  closed: number
  active: number
  documents: number
  orders: number
  withDeadline: number
  prosecutorCases: number
  pinned: number
  hasCollegium: number
}

export function computeStats(cases: Case[]): AchievementStats {
  return {
    created: cases.length,
    closed: cases.filter(c => c.status === 'closed').length,
    active: cases.filter(c => c.status === 'active').length,
    documents: cases.reduce((n, c) => n + c.documents.length, 0),
    orders: cases.reduce((n, c) => n + c.documents.filter(d => d.type === 'order').length, 0),
    withDeadline: cases.filter(c => !!c.deadline).length,
    prosecutorCases: cases.filter(c => c.participants.some(p => p.role === 'prosecutor')).length,
    pinned: cases.filter(c => c.isPinned).length,
    hasCollegium: cases.some(c => c.participants.some(p => p.role === 'judge')) ? 1 : 0,
  }
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  goal: number
  color: string
  value: (s: AchievementStats) => number
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first-case',    title: 'Первое дело',        description: 'Создать первый иск',                icon: '📂', goal: 1,   color: 'var(--green)',  value: s => s.created },
  { id: 'cases-10',      title: 'Делопроизводитель',  description: 'Создать 10 дел',                    icon: '🗂️', goal: 10,  color: 'var(--green)',  value: s => s.created },
  { id: 'cases-50',      title: 'Опытный судья',      description: 'Создать 50 дел',                    icon: '⚖️', goal: 50,  color: 'var(--blue)',   value: s => s.created },
  { id: 'cases-100',     title: 'Ветеран суда',       description: 'Создать 100 дел',                   icon: '🏛️', goal: 100, color: 'var(--purple)', value: s => s.created },
  { id: 'closed-1',      title: 'Первое решение',     description: 'Закрыть первое дело',               icon: '✅', goal: 1,   color: 'var(--green)',  value: s => s.closed },
  { id: 'closed-10',     title: 'Чистильщик',         description: 'Закрыть 10 исков',                  icon: '🧹', goal: 10,  color: 'var(--green)',  value: s => s.closed },
  { id: 'closed-50',     title: 'Машина правосудия',  description: 'Закрыть 50 исков',                  icon: '🤖', goal: 50,  color: 'var(--blue)',   value: s => s.closed },
  { id: 'closed-100',    title: 'Легенда округа',     description: 'Закрыть 100 исков',                 icon: '👑', goal: 100, color: 'var(--amber)',  value: s => s.closed },
  { id: 'docs-25',       title: 'Канцелярия',         description: 'Создать 25 документов',             icon: '📄', goal: 25,  color: 'var(--blue)',   value: s => s.documents },
  { id: 'docs-100',      title: 'Бумажная буря',      description: 'Создать 100 документов',            icon: '🌪️', goal: 100, color: 'var(--purple)', value: s => s.documents },
  { id: 'orders-10',     title: 'Длань закона',       description: 'Выдать 10 судебных ордеров',        icon: '📜', goal: 10,  color: 'var(--red)',    value: s => s.orders },
  { id: 'collegium',     title: 'Коллегия',           description: 'Собрать коллегиальный состав',      icon: '👨‍⚖️', goal: 1, color: 'var(--ac2)',  value: s => s.hasCollegium },
  { id: 'multitask',     title: 'Многозадачность',    description: '10 дел в работе одновременно',      icon: '🔀', goal: 10,  color: 'var(--amber)',  value: s => s.active },
  { id: 'deadlines-10',  title: 'Под контролем',      description: 'Назначить сроки по 10 делам',       icon: '⏰', goal: 10,  color: 'var(--red)',    value: s => s.withDeadline },
  { id: 'prosecutor-5',  title: 'Гособвинение',       description: '5 дел с участием прокурора',        icon: '🗣️', goal: 5,   color: 'var(--purple)', value: s => s.prosecutorCases },
]

export interface AchievementProgress extends Achievement {
  current: number
  unlocked: boolean
  progress: number
}

export function evaluateAchievements(cases: Case[]): AchievementProgress[] {
  const stats = computeStats(cases)
  return ACHIEVEMENTS.map(a => {
    const current = a.value(stats)
    return {
      ...a,
      current,
      unlocked: current >= a.goal,
      progress: Math.max(0, Math.min(1, current / a.goal)),
    }
  })
}

/** IDs of currently-unlocked achievements (for unlock-toast diffing). */
export function unlockedIds(cases: Case[]): string[] {
  return evaluateAchievements(cases).filter(a => a.unlocked).map(a => a.id)
}
