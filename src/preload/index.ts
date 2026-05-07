import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  // Window controls
  minimizeWindow: () => ipcRenderer.send('window:minimize'),
  maximizeWindow: () => ipcRenderer.send('window:maximize'),
  closeWindow: () => ipcRenderer.send('window:close'),
  isMaximized: () => ipcRenderer.invoke('window:isMaximized'),

  // File system
  readFile: (p: string) => ipcRenderer.invoke('fs:readFile', p),
  writeFile: (p: string, content: string) => ipcRenderer.invoke('fs:writeFile', p, content),
  deleteFile: (p: string) => ipcRenderer.invoke('fs:deleteFile', p),
  deleteDir: (p: string) => ipcRenderer.invoke('fs:deleteDir', p),
  fileExists: (p: string) => ipcRenderer.invoke('fs:exists', p),
  readDir: (p: string) => ipcRenderer.invoke('fs:readDir', p),
  mkdir: (p: string) => ipcRenderer.invoke('fs:mkdir', p),
  copyFile: (src: string, dest: string) => ipcRenderer.invoke('fs:copyFile', src, dest),
  readBinary: (p: string) => ipcRenderer.invoke('fs:readBinary', p),
  saveJpeg: (dir: string, filename: string, base64: string) =>
    ipcRenderer.invoke('fs:saveJpeg', dir, filename, base64),

  // Dialogs
  selectFolder: () => ipcRenderer.invoke('dialog:selectFolder'),
  selectFile: (filters: { name: string; extensions: string[] }[]) =>
    ipcRenderer.invoke('dialog:selectFile', filters),
  saveJpegFolder: () => ipcRenderer.invoke('dialog:saveJpegFolder'),

  // App
  getDataPath: () => ipcRenderer.invoke('app:getDataPath'),
  openExternal: (url: string) => ipcRenderer.invoke('shell:openExternal', url),
  openFile: (path: string) => ipcRenderer.invoke('shell:openFile', path),

  // ── Auto-updater ────────────────────────────────────────────────────────────
  // All methods are no-ops in dev mode (main process guards them).

  /** Ask the main process to check GitHub Releases for a newer version. */
  checkUpdate: () => ipcRenderer.invoke('updater:check'),

  /** Start downloading the update found in the last checkUpdate() call. */
  downloadUpdate: () => ipcRenderer.invoke('updater:download'),

  /**
   * Quit the app and run the downloaded installer.
   * Uses ipcRenderer.send (not invoke) because the app exits immediately.
   */
  installUpdate: () => ipcRenderer.send('updater:install'),

  /** Returns the current version string from package.json ("1.6.0"). */
  getAppVersion: () => ipcRenderer.invoke('updater:getVersion'),

  /**
   * Subscribe to updater state changes.
   * Callback receives { state, data? } — see UpdateStatus in UpdateBanner.tsx.
   * Call removeUpdateListeners() on component unmount to avoid leaks.
   */
  onUpdateStatus: (
    cb: (payload: { state: string; data?: unknown }) => void
  ) => {
    ipcRenderer.on('updater:status', (_event, payload) => cb(payload))
  },

  /**
   * Subscribe to download progress events.
   * Callback receives { percent, transferred, total, speed }.
   */
  onUpdateProgress: (
    cb: (payload: { percent: number; transferred: number; total: number; speed: number }) => void
  ) => {
    ipcRenderer.on('updater:progress', (_event, payload) => cb(payload))
  },

  /** Remove all updater event listeners (call on component unmount). */
  removeUpdateListeners: () => {
    ipcRenderer.removeAllListeners('updater:status')
    ipcRenderer.removeAllListeners('updater:progress')
  }
})
