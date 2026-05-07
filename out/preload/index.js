"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("api", {
  // Window controls
  minimizeWindow: () => electron.ipcRenderer.send("window:minimize"),
  maximizeWindow: () => electron.ipcRenderer.send("window:maximize"),
  closeWindow: () => electron.ipcRenderer.send("window:close"),
  isMaximized: () => electron.ipcRenderer.invoke("window:isMaximized"),
  // File system
  readFile: (p) => electron.ipcRenderer.invoke("fs:readFile", p),
  writeFile: (p, content) => electron.ipcRenderer.invoke("fs:writeFile", p, content),
  deleteFile: (p) => electron.ipcRenderer.invoke("fs:deleteFile", p),
  deleteDir: (p) => electron.ipcRenderer.invoke("fs:deleteDir", p),
  fileExists: (p) => electron.ipcRenderer.invoke("fs:exists", p),
  readDir: (p) => electron.ipcRenderer.invoke("fs:readDir", p),
  mkdir: (p) => electron.ipcRenderer.invoke("fs:mkdir", p),
  copyFile: (src, dest) => electron.ipcRenderer.invoke("fs:copyFile", src, dest),
  readBinary: (p) => electron.ipcRenderer.invoke("fs:readBinary", p),
  saveJpeg: (dir, filename, base64) => electron.ipcRenderer.invoke("fs:saveJpeg", dir, filename, base64),
  // Dialogs
  selectFolder: () => electron.ipcRenderer.invoke("dialog:selectFolder"),
  selectFile: (filters) => electron.ipcRenderer.invoke("dialog:selectFile", filters),
  saveJpegFolder: () => electron.ipcRenderer.invoke("dialog:saveJpegFolder"),
  // App
  getDataPath: () => electron.ipcRenderer.invoke("app:getDataPath"),
  openExternal: (url) => electron.ipcRenderer.invoke("shell:openExternal", url),
  openFile: (path) => electron.ipcRenderer.invoke("shell:openFile", path),
  // ── Auto-updater ────────────────────────────────────────────────────────────
  // All methods are no-ops in dev mode (main process guards them).
  /** Ask the main process to check GitHub Releases for a newer version. */
  checkUpdate: () => electron.ipcRenderer.invoke("updater:check"),
  /** Start downloading the update found in the last checkUpdate() call. */
  downloadUpdate: () => electron.ipcRenderer.invoke("updater:download"),
  /**
   * Quit the app and run the downloaded installer.
   * Uses ipcRenderer.send (not invoke) because the app exits immediately.
   */
  installUpdate: () => electron.ipcRenderer.send("updater:install"),
  /** Returns the current version string from package.json ("1.6.0"). */
  getAppVersion: () => electron.ipcRenderer.invoke("updater:getVersion"),
  /**
   * Subscribe to updater state changes.
   * Callback receives { state, data? } — see UpdateStatus in UpdateBanner.tsx.
   * Call removeUpdateListeners() on component unmount to avoid leaks.
   */
  onUpdateStatus: (cb) => {
    electron.ipcRenderer.on("updater:status", (_event, payload) => cb(payload));
  },
  /**
   * Subscribe to download progress events.
   * Callback receives { percent, transferred, total, speed }.
   */
  onUpdateProgress: (cb) => {
    electron.ipcRenderer.on("updater:progress", (_event, payload) => cb(payload));
  },
  /** Remove all updater event listeners (call on component unmount). */
  removeUpdateListeners: () => {
    electron.ipcRenderer.removeAllListeners("updater:status");
    electron.ipcRenderer.removeAllListeners("updater:progress");
  }
});
