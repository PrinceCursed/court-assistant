interface Window {
  api: {
    minimizeWindow: () => void
    maximizeWindow: () => void
    closeWindow: () => void
    isMaximized: () => Promise<boolean>
    readFile: (p: string) => Promise<string>
    writeFile: (p: string, content: string) => Promise<void>
    deleteFile: (p: string) => Promise<void>
    deleteDir: (p: string) => Promise<void>
    fileExists: (p: string) => Promise<boolean>
    readDir: (p: string) => Promise<string[]>
    mkdir: (p: string) => Promise<void>
    copyFile: (src: string, dest: string) => Promise<void>
    readBinary: (p: string) => Promise<string>
    saveJpeg: (dir: string, filename: string, base64: string) => Promise<void>
    selectFolder: () => Promise<string>
    selectFile: (filters: { name: string; extensions: string[] }[]) => Promise<string>
    saveJpegFolder: () => Promise<string>
    getDataPath: () => Promise<string>
    openExternal: (url: string) => Promise<void>
    openFile: (path: string) => Promise<void>
    checkUpdate: () => Promise<void>
    downloadUpdate: () => Promise<void>
    installUpdate: () => void
    getAppVersion: () => Promise<string>
    onUpdateStatus: (cb: (payload: { state: string; data?: unknown }) => void) => void
    onUpdateProgress: (cb: (payload: { percent: number; transferred: number; total: number; speed: number }) => void) => void
    removeUpdateListeners: () => void
  }
}