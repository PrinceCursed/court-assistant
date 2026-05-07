export type DocumentType =
  | 'rejection'
  | 'no-move-reasons'
  | 'no-move-fee'
  | 'return'
  | 'accept'
  | 'accept-prosecutor'
  | 'schedule'
  | 'decision'
  | 'motivation'
  | 'order'
  | 'hearing-notes'
  // Дополнительные шаблоны
  | 'counter-claim'
  | 'expand-participants'
  | 'state-lawyer'
  | 'jurisdiction-transfer'
  | 'recusal'
  | 'correct-typo'
  | 'collegial'
  | 'consolidate'
  | 'terminate'
  | 'petition'

export const DOCUMENT_TYPE_LABELS: Record<DocumentType, string> = {
  rejection:              'Об отказе в принятии искового заявления',
  'no-move-reasons':      'Об оставлении заявления без движения (по основаниям)',
  'no-move-fee':          'Об оставлении заявления без движения (по госпошлине)',
  return:                 'О возвращении искового заявления',
  accept:                 'О принятии искового заявления к производству',
  'accept-prosecutor':    'О принятии заявления к производству (с прокурором)',
  schedule:               'О назначении дела к судебному разбирательству',
  decision:               'Финальное решение',
  motivation:             'Мотивировочная часть решения',
  order:                  'Определение',
  'hearing-notes':        'Заметки заседания',
  'counter-claim':        'О принятии встречного искового заявления к производству',
  'expand-participants':  'О расширении круга лиц, участвующих в деле',
  'state-lawyer':         'О предоставлении государственного адвоката',
  'jurisdiction-transfer':'О передаче дела по подсудности',
  recusal:                'Об отводе лица, участвующего в деле',
  'correct-typo':         'Об исправлении описки',
  collegial:              'О коллегиальном рассмотрении дела',
  consolidate:            'Об объединении дел в одно производство',
  terminate:              'О прекращении производства по делу',
  petition:               'О рассмотрении ходатайства'
}

export const DOCUMENT_TYPE_GROUPS = [
  {
    label: 'Исковые определения',
    types: ['rejection', 'no-move-reasons', 'no-move-fee', 'return', 'accept', 'accept-prosecutor'] as DocumentType[]
  },
  {
    label: 'Судебный процесс',
    types: ['schedule', 'hearing-notes'] as DocumentType[]
  },
  {
    label: 'Итоговые акты',
    types: ['decision', 'motivation', 'order'] as DocumentType[]
  }
]

export const ADDITIONAL_TEMPLATE_CATEGORIES = [
  { id: 'all',          label: 'Все' },
  { id: 'production',   label: 'Производство' },
  { id: 'petitions',    label: 'Ходатайства' },
  { id: 'participants', label: 'Участники дела' },
  { id: 'jurisdiction', label: 'Подсудность' },
  { id: 'corrections',  label: 'Исправления' },
  { id: 'org',          label: 'Организационные' },
]

export type AdditionalTemplateCategory =
  | 'production' | 'petitions' | 'participants'
  | 'jurisdiction' | 'corrections' | 'org'

export const ADDITIONAL_TEMPLATE_CATEGORY: Record<string, AdditionalTemplateCategory> = {
  'counter-claim':         'production',
  'consolidate':           'production',
  'terminate':             'production',
  'petition':              'petitions',
  'expand-participants':   'participants',
  'state-lawyer':          'participants',
  'jurisdiction-transfer': 'jurisdiction',
  'correct-typo':          'corrections',
  'collegial':             'org',
  'recusal':               'org',
}

export const ADDITIONAL_TEMPLATE_TYPES: DocumentType[] = [
  'counter-claim', 'expand-participants', 'state-lawyer',
  'jurisdiction-transfer', 'recusal', 'correct-typo',
  'collegial', 'consolidate', 'terminate', 'petition'
]

export interface DocumentVersion {
  version: number
  content: string
  savedAt: string
  label?: string
}

export interface DocComment {
  id: string
  text: string
  quote: string       // the highlighted text (for display reference)
  createdAt: string
  resolved: boolean
  author?: string
}

export interface CaseDocument {
  id: string
  type: DocumentType
  title: string
  content: string
  createdAt: string
  updatedAt: string
  versions?: DocumentVersion[]
  comments?: DocComment[]
}

export type MaterialType =
  | 'google-docs'
  | 'pdf'
  | 'docx'
  | 'txt'
  | 'zip'
  | 'image'
  | 'video'
  | 'note'
  | 'other'

export interface Material {
  id: string
  type: MaterialType
  name: string
  path?: string
  url?: string
  size?: number
  note?: string
  preview?: string
  createdAt: string
}

export type ParticipantRole = 'plaintiff' | 'defendant' | 'prosecutor' | 'lawyer' | 'judge'

export const PARTICIPANT_ROLE_LABELS: Record<ParticipantRole, string> = {
  plaintiff:  'Истец',
  defendant:  'Ответчик',
  prosecutor: 'Прокурор',
  lawyer:     'Адвокат',
  judge:      'Судья'
}

export interface Participant {
  id: string
  role: ParticipantRole
  firstName: string
  lastName: string
  documentId?: string
  position?: string
  comment?: string
}

export interface Note {
  id: string
  content: string
  isPinned: boolean
  createdAt: string
  updatedAt: string
}

export type TimelineEventType =
  | 'created'
  | 'accepted'
  | 'scheduled'
  | 'decision'
  | 'closed'
  | 'document-added'
  | 'material-added'
  | 'custom'

export interface TimelineEvent {
  id: string
  date: string
  event: string
  type: TimelineEventType
}

export type CaseStatus = 'active' | 'closed'

export interface Case {
  id: string
  caseNumber: string
  title: string
  plaintiff: string
  defendant: string
  prosecutor?: string
  lawyer?: string
  description?: string
  status: CaseStatus
  isPinned: boolean
  createdAt: string
  updatedAt: string
  documents: CaseDocument[]
  materials: Material[]
  participants: Participant[]
  notes: Note[]
  timeline: TimelineEvent[]
}

export interface Settings {
  judgeFirstName: string
  judgeLastName: string
  position: string
  stampBase64?: string
  storagePath: string
  heraldryDeterminationBase64?: string
  heraldryOrderBase64?: string
  heraldrySize?: number       // px, default 80
  heraldryOffsetX?: number    // px from left edge, default 60
  heraldryOffsetY?: number    // px from top edge, default 60
  stampOffsetX?: number       // px from right edge, default 60
  stampOffsetY?: number       // px from bottom edge, default 60
  stampScale?: number         // px width/height, default 120
}

export type View =
  | { type: 'active-cases' }
  | { type: 'closed-cases' }
  | { type: 'templates' }
  | { type: 'additional-templates' }
  | { type: 'settings' }
  | { type: 'case-workspace'; caseId: string; tab?: WorkspaceTab }
  | { type: 'document-editor'; caseId: string; documentId: string }
  | { type: 'template-editor'; docType: DocumentType; from?: 'templates' | 'additional-templates' }

export type WorkspaceTab = 'documents' | 'materials' | 'participants' | 'notes' | 'timeline'

declare global {
  interface Window {
    api: {
      minimizeWindow: () => void
      maximizeWindow: () => void
      closeWindow: () => void
      isMaximized: () => Promise<boolean>
      readFile: (p: string) => Promise<string | null>
      writeFile: (p: string, content: string) => Promise<boolean>
      deleteFile: (p: string) => Promise<boolean>
      deleteDir: (p: string) => Promise<boolean>
      fileExists: (p: string) => Promise<boolean>
      readDir: (p: string) => Promise<string[]>
      mkdir: (p: string) => Promise<boolean>
      copyFile: (src: string, dest: string) => Promise<boolean>
      readBinary: (p: string) => Promise<string | null>
      saveJpeg: (dir: string, filename: string, base64: string) => Promise<boolean>
      selectFolder: () => Promise<string | null>
      selectFile: (filters: { name: string; extensions: string[] }[]) => Promise<string | null>
      saveJpegFolder: () => Promise<string | null>
      getDataPath: () => Promise<string>
      openExternal: (url: string) => Promise<void>
      openFile: (path: string) => Promise<void>
    }
  }
}
