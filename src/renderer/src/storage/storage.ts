import { Case, Settings } from '../types'

const DEFAULT_SETTINGS: Settings = {
  judgeFirstName: '',
  judgeLastName: '',
  position: 'Окружной судья',
  storagePath: ''
}

let _dataPath = ''
let _storagePath = ''

async function getDataPath(): Promise<string> {
  if (_dataPath) return _dataPath
  _dataPath = await window.api.getDataPath()
  return _dataPath
}

async function getStoragePath(): Promise<string> {
  if (_storagePath) return _storagePath
  const settings = await loadSettings()
  if (settings.storagePath) {
    _storagePath = settings.storagePath
  } else {
    _storagePath = (await getDataPath()) + '/CourtAssistant'
  }
  return _storagePath
}

export function resetStorageCache(): void {
  _storagePath = ''
}

export async function loadSettings(): Promise<Settings> {
  const dataPath = await getDataPath()
  const raw = await window.api.readFile(dataPath + '/settings.json')
  if (!raw) return { ...DEFAULT_SETTINGS }
  try { return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } }
  catch { return { ...DEFAULT_SETTINGS } }
}

export async function saveSettings(settings: Settings): Promise<void> {
  const dataPath = await getDataPath()
  await window.api.writeFile(dataPath + '/settings.json', JSON.stringify(settings, null, 2))
  _storagePath = settings.storagePath || _storagePath
}

export async function loadCases(): Promise<Case[]> {
  const base = await getStoragePath()
  const casesDir = base + '/cases'
  const dirs = await window.api.readDir(casesDir)
  const cases: Case[] = []

  for (const dir of dirs) {
    const filePath = `${casesDir}/${dir}/case.json`
    const raw = await window.api.readFile(filePath)
    if (raw) {
      try { cases.push(JSON.parse(raw)) }
      catch { /* skip corrupt */ }
    }
  }

  return cases.sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  })
}

export async function saveCase(c: Case): Promise<void> {
  const base = await getStoragePath()
  const filePath = `${base}/cases/${c.id}/case.json`
  await window.api.writeFile(filePath, JSON.stringify(c, null, 2))
}

export async function deleteCase(id: string): Promise<void> {
  const base = await getStoragePath()
  await window.api.deleteDir(`${base}/cases/${id}`)
}

export async function archiveCase(c: Case): Promise<void> {
  const base = await getStoragePath()
  const archivePath = `${base}/archive/${c.id}`
  await window.api.mkdir(archivePath)
  await window.api.writeFile(archivePath + '/case.json', JSON.stringify(c, null, 2))
}

export async function saveMaterialFile(
  caseId: string,
  filename: string,
  srcPath: string
): Promise<string> {
  const base = await getStoragePath()
  const destDir = `${base}/cases/${caseId}/materials`
  const dest = `${destDir}/${filename}`
  await window.api.copyFile(srcPath, dest)
  return dest
}

export async function saveStamp(srcPath: string): Promise<string | null> {
  return window.api.readBinary(srcPath)
}

export function formatDateForTimeline(date: Date): string {
  return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })
}
