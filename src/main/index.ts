import { app, shell, BrowserWindow, ipcMain, dialog, protocol, net } from 'electron'
import { join } from 'path'
import * as fs from 'fs'
import * as path from 'path'
import { pathToFileURL } from 'url'
import { autoUpdater } from 'electron-updater'

const isDev = process.env.NODE_ENV === 'development'

// ── Auto-updater setup ────────────────────────────────────────────────────────

/**
 * Configures electron-updater and wires push events to the renderer.
 * Call this after the window is created (only in production builds).
 *
 * State machine sent to renderer via 'updater:status':
 *   checking → available | not-available | error
 *   available → downloading (after user confirms)
 *   downloading → ready
 *   ready → (quitAndInstall on user click)
 */
function setupAutoUpdater(win: BrowserWindow): void {
  // Download automatically in the background — App Store style
  autoUpdater.autoDownload = true
  // Install on next quit if the user dismissed the "restart now" dialog
  autoUpdater.autoInstallOnAppQuit = true
  // Suppress the built-in dialog; we show our own UI
  autoUpdater.logger = null

  /** Push a typed status event to the renderer */
  const push = (state: string, data?: unknown) => {
    if (!win.isDestroyed()) {
      win.webContents.send('updater:status', { state, data })
    }
  }

  autoUpdater.on('checking-for-update', () => {
    push('checking')
  })

  autoUpdater.on('update-available', (info) => {
    // info: { version, releaseDate, releaseNotes, ... }
    push('available', { version: info.version, notes: info.releaseNotes ?? '' })
  })

  autoUpdater.on('update-not-available', () => {
    push('not-available')
  })

  autoUpdater.on('error', (err) => {
    push('error', err.message)
  })

  autoUpdater.on('download-progress', (progress) => {
    if (!win.isDestroyed()) {
      win.webContents.send('updater:progress', {
        percent:     Math.round(progress.percent),
        transferred: progress.transferred,
        total:       progress.total,
        speed:       progress.bytesPerSecond
      })
    }
  })

  autoUpdater.on('update-downloaded', (info) => {
    push('ready', { version: info.version })
  })

  // Perform the first silent check 5 seconds after the window is shown
  // to avoid blocking the initial render.
  win.once('ready-to-show', () => {
    setTimeout(() => {
      autoUpdater.checkForUpdates().catch((err) => {
        console.error('[updater] background check failed:', err.message)
      })
    }, 5000)
  })
}

// ── Window ────────────────────────────────────────────────────────────────────

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1100,
    minHeight: 700,
    show: false,
    frame: false,
    backgroundColor: '#0b0b10',
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (isDev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  ipcMain.on('window:minimize', () => mainWindow.minimize())
  ipcMain.on('window:maximize', () => {
    if (mainWindow.isMaximized()) mainWindow.unmaximize()
    else mainWindow.maximize()
  })
  ipcMain.on('window:close', () => mainWindow.close())
  ipcMain.handle('window:isMaximized', () => mainWindow.isMaximized())

  // Start the update cycle only in a packaged build —
  // electron-updater errors out when run in dev mode (no asar, no publish config).
  if (!isDev) {
    setupAutoUpdater(mainWindow)
  }
}

// Register custom protocol to serve local files securely (for in-app media viewer)
protocol.registerSchemesAsPrivileged([
  { scheme: 'localfile', privileges: { secure: true, bypassCSP: true, stream: true, supportFetchAPI: true } }
])

app.whenReady().then(() => {
  app.setAppUserModelId('com.princecursed.courtassistant')

  // Handle localfile:// protocol to stream local files into the renderer
  protocol.handle('localfile', (request) => {
    const filePath = decodeURIComponent(request.url.replace('localfile://', ''))
    return net.fetch(pathToFileURL(filePath).toString())
  })

  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// ── File system ──────────────────────────────────────────────────────────────

ipcMain.handle('fs:readFile', async (_e, filePath: string) => {
  try { return fs.readFileSync(filePath, 'utf-8') }
  catch { return null }
})

ipcMain.handle('fs:writeFile', async (_e, filePath: string, content: string) => {
  try {
    fs.mkdirSync(path.dirname(filePath), { recursive: true })
    fs.writeFileSync(filePath, content, 'utf-8')
    return true
  } catch { return false }
})

ipcMain.handle('fs:deleteFile', async (_e, filePath: string) => {
  try {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
    return true
  } catch { return false }
})

ipcMain.handle('fs:deleteDir', async (_e, dirPath: string) => {
  try {
    if (fs.existsSync(dirPath)) fs.rmSync(dirPath, { recursive: true, force: true })
    return true
  } catch { return false }
})

ipcMain.handle('fs:exists', async (_e, filePath: string) => {
  return fs.existsSync(filePath)
})

ipcMain.handle('fs:readDir', async (_e, dirPath: string) => {
  try {
    if (!fs.existsSync(dirPath)) return []
    return fs.readdirSync(dirPath)
  } catch { return [] }
})

ipcMain.handle('fs:mkdir', async (_e, dirPath: string) => {
  try {
    fs.mkdirSync(dirPath, { recursive: true })
    return true
  } catch { return false }
})

ipcMain.handle('fs:copyFile', async (_e, src: string, dest: string) => {
  try {
    fs.mkdirSync(path.dirname(dest), { recursive: true })
    fs.copyFileSync(src, dest)
    return true
  } catch { return false }
})

ipcMain.handle('fs:readBinary', async (_e, filePath: string) => {
  try {
    const buf = fs.readFileSync(filePath)
    const ext = path.extname(filePath).toLowerCase()
    const mime = ext === '.png' ? 'image/png'
      : ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg'
      : 'image/png'
    return `data:${mime};base64,${buf.toString('base64')}`
  } catch { return null }
})

ipcMain.handle('fs:saveJpeg', async (_e, dirPath: string, filename: string, base64: string) => {
  try {
    fs.mkdirSync(dirPath, { recursive: true })
    const data = base64.replace(/^data:image\/\w+;base64,/, '')
    fs.writeFileSync(path.join(dirPath, filename), Buffer.from(data, 'base64'))
    return true
  } catch { return false }
})

// ── Dialogs ──────────────────────────────────────────────────────────────────

ipcMain.handle('dialog:selectFolder', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory', 'createDirectory'],
    title: 'Выберите папку для хранения данных'
  })
  return result.canceled ? null : result.filePaths[0]
})

ipcMain.handle('dialog:selectFile', async (_e, filters: Electron.FileFilter[]) => {
  const result = await dialog.showOpenDialog({ properties: ['openFile'], filters })
  return result.canceled ? null : result.filePaths[0]
})

ipcMain.handle('dialog:saveJpegFolder', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory', 'createDirectory'],
    title: 'Выберите папку для сохранения JPEG'
  })
  return result.canceled ? null : result.filePaths[0]
})

// ── App ───────────────────────────────────────────────────────────────────────

ipcMain.handle('app:getDataPath', async () => app.getPath('userData'))
ipcMain.handle('shell:openExternal', async (_e, url: string) => shell.openExternal(url))
ipcMain.handle('shell:openFile', async (_e, filePath: string) => shell.openPath(filePath))

// ── Updater IPC ───────────────────────────────────────────────────────────────
// These handlers are safe to register unconditionally; setupAutoUpdater()
// is only called in production so no events will be emitted in dev mode.

/** Manually trigger an update check (e.g. from Settings → "Проверить обновления") */
ipcMain.handle('updater:check', async () => {
  if (isDev) return { error: 'Автообновление недоступно в режиме разработки' }
  try {
    await autoUpdater.checkForUpdates()
    return { ok: true }
  } catch (err: unknown) {
    return { error: String(err) }
  }
})

/** Start downloading the already-found update */
ipcMain.handle('updater:download', async () => {
  if (isDev) return
  try {
    await autoUpdater.downloadUpdate()
  } catch (err) {
    console.error('[updater] download failed:', err)
  }
})

/**
 * Quit the app and run the downloaded installer.
 * isSilent = false  → shows NSIS progress dialog
 * isForceRunAfter = true → installer re-launches app when done
 */
ipcMain.on('updater:install', () => {
  autoUpdater.quitAndInstall(false, true)
})

/** Returns the current app version (from package.json at build time) */
ipcMain.handle('updater:getVersion', () => app.getVersion())

// ── URL fetch (for forum parser) ──────────────────────────────────────────────
// Renderer cannot fetch external URLs due to CORS; main process does it via net.

ipcMain.handle('fetch:url', async (_e, url: string) => {
  try {
    const resp = await net.fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120' }
    })
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
    return { ok: true, html: await resp.text() }
  } catch (err) {
    return { ok: false, error: String(err) }
  }
})
