"use strict";
const electron = require("electron");
const path = require("path");
const fs = require("fs");
const url = require("url");
const electronUpdater = require("electron-updater");
function _interopNamespaceDefault(e) {
  const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (e) {
    for (const k in e) {
      if (k !== "default") {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}
const path__namespace = /* @__PURE__ */ _interopNamespaceDefault(path);
const fs__namespace = /* @__PURE__ */ _interopNamespaceDefault(fs);
const isDev = process.env.NODE_ENV === "development";
function setupAutoUpdater(win) {
  electronUpdater.autoUpdater.autoDownload = false;
  electronUpdater.autoUpdater.autoInstallOnAppQuit = true;
  electronUpdater.autoUpdater.logger = null;
  const push = (state, data) => {
    if (!win.isDestroyed()) {
      win.webContents.send("updater:status", { state, data });
    }
  };
  electronUpdater.autoUpdater.on("checking-for-update", () => {
    push("checking");
  });
  electronUpdater.autoUpdater.on("update-available", (info) => {
    push("available", { version: info.version, notes: info.releaseNotes ?? "" });
  });
  electronUpdater.autoUpdater.on("update-not-available", () => {
    push("not-available");
  });
  electronUpdater.autoUpdater.on("error", (err) => {
    push("error", err.message);
  });
  electronUpdater.autoUpdater.on("download-progress", (progress) => {
    if (!win.isDestroyed()) {
      win.webContents.send("updater:progress", {
        percent: Math.round(progress.percent),
        transferred: progress.transferred,
        total: progress.total,
        speed: progress.bytesPerSecond
      });
    }
  });
  electronUpdater.autoUpdater.on("update-downloaded", (info) => {
    push("ready", { version: info.version });
  });
  win.once("ready-to-show", () => {
    setTimeout(() => {
      electronUpdater.autoUpdater.checkForUpdates().catch((err) => {
        console.error("[updater] background check failed:", err.message);
      });
    }, 5e3);
  });
}
function createWindow() {
  const mainWindow = new electron.BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1100,
    minHeight: 700,
    show: false,
    frame: false,
    backgroundColor: "#0b0b10",
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      sandbox: false,
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });
  mainWindow.webContents.setWindowOpenHandler((details) => {
    electron.shell.openExternal(details.url);
    return { action: "deny" };
  });
  if (isDev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
  }
  electron.ipcMain.on("window:minimize", () => mainWindow.minimize());
  electron.ipcMain.on("window:maximize", () => {
    if (mainWindow.isMaximized()) mainWindow.unmaximize();
    else mainWindow.maximize();
  });
  electron.ipcMain.on("window:close", () => mainWindow.close());
  electron.ipcMain.handle("window:isMaximized", () => mainWindow.isMaximized());
  if (!isDev) {
    setupAutoUpdater(mainWindow);
  }
}
electron.protocol.registerSchemesAsPrivileged([
  { scheme: "localfile", privileges: { secure: true, bypassCSP: true, stream: true, supportFetchAPI: true } }
]);
electron.app.whenReady().then(() => {
  electron.app.setAppUserModelId("com.princecursed.courtassistant");
  electron.protocol.handle("localfile", (request) => {
    const filePath = decodeURIComponent(request.url.replace("localfile://", ""));
    return electron.net.fetch(url.pathToFileURL(filePath).toString());
  });
  createWindow();
  electron.app.on("activate", () => {
    if (electron.BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") electron.app.quit();
});
electron.ipcMain.handle("fs:readFile", async (_e, filePath) => {
  try {
    return fs__namespace.readFileSync(filePath, "utf-8");
  } catch {
    return null;
  }
});
electron.ipcMain.handle("fs:writeFile", async (_e, filePath, content) => {
  try {
    fs__namespace.mkdirSync(path__namespace.dirname(filePath), { recursive: true });
    fs__namespace.writeFileSync(filePath, content, "utf-8");
    return true;
  } catch {
    return false;
  }
});
electron.ipcMain.handle("fs:deleteFile", async (_e, filePath) => {
  try {
    if (fs__namespace.existsSync(filePath)) fs__namespace.unlinkSync(filePath);
    return true;
  } catch {
    return false;
  }
});
electron.ipcMain.handle("fs:deleteDir", async (_e, dirPath) => {
  try {
    if (fs__namespace.existsSync(dirPath)) fs__namespace.rmSync(dirPath, { recursive: true, force: true });
    return true;
  } catch {
    return false;
  }
});
electron.ipcMain.handle("fs:exists", async (_e, filePath) => {
  return fs__namespace.existsSync(filePath);
});
electron.ipcMain.handle("fs:readDir", async (_e, dirPath) => {
  try {
    if (!fs__namespace.existsSync(dirPath)) return [];
    return fs__namespace.readdirSync(dirPath);
  } catch {
    return [];
  }
});
electron.ipcMain.handle("fs:mkdir", async (_e, dirPath) => {
  try {
    fs__namespace.mkdirSync(dirPath, { recursive: true });
    return true;
  } catch {
    return false;
  }
});
electron.ipcMain.handle("fs:copyFile", async (_e, src, dest) => {
  try {
    fs__namespace.mkdirSync(path__namespace.dirname(dest), { recursive: true });
    fs__namespace.copyFileSync(src, dest);
    return true;
  } catch {
    return false;
  }
});
electron.ipcMain.handle("fs:readBinary", async (_e, filePath) => {
  try {
    const buf = fs__namespace.readFileSync(filePath);
    const ext = path__namespace.extname(filePath).toLowerCase();
    const mime = ext === ".png" ? "image/png" : ext === ".jpg" || ext === ".jpeg" ? "image/jpeg" : "image/png";
    return `data:${mime};base64,${buf.toString("base64")}`;
  } catch {
    return null;
  }
});
electron.ipcMain.handle("fs:saveJpeg", async (_e, dirPath, filename, base64) => {
  try {
    fs__namespace.mkdirSync(dirPath, { recursive: true });
    const data = base64.replace(/^data:image\/\w+;base64,/, "");
    fs__namespace.writeFileSync(path__namespace.join(dirPath, filename), Buffer.from(data, "base64"));
    return true;
  } catch {
    return false;
  }
});
electron.ipcMain.handle("dialog:selectFolder", async () => {
  const result = await electron.dialog.showOpenDialog({
    properties: ["openDirectory", "createDirectory"],
    title: "Выберите папку для хранения данных"
  });
  return result.canceled ? null : result.filePaths[0];
});
electron.ipcMain.handle("dialog:selectFile", async (_e, filters) => {
  const result = await electron.dialog.showOpenDialog({ properties: ["openFile"], filters });
  return result.canceled ? null : result.filePaths[0];
});
electron.ipcMain.handle("dialog:saveJpegFolder", async () => {
  const result = await electron.dialog.showOpenDialog({
    properties: ["openDirectory", "createDirectory"],
    title: "Выберите папку для сохранения JPEG"
  });
  return result.canceled ? null : result.filePaths[0];
});
electron.ipcMain.handle("app:getDataPath", async () => electron.app.getPath("userData"));
electron.ipcMain.handle("shell:openExternal", async (_e, url2) => electron.shell.openExternal(url2));
electron.ipcMain.handle("shell:openFile", async (_e, filePath) => electron.shell.openPath(filePath));
electron.ipcMain.handle("updater:check", async () => {
  if (isDev) return { error: "Автообновление недоступно в режиме разработки" };
  try {
    await electronUpdater.autoUpdater.checkForUpdates();
    return { ok: true };
  } catch (err) {
    return { error: String(err) };
  }
});
electron.ipcMain.handle("updater:download", async () => {
  if (isDev) return;
  try {
    await electronUpdater.autoUpdater.downloadUpdate();
  } catch (err) {
    console.error("[updater] download failed:", err);
  }
});
electron.ipcMain.on("updater:install", () => {
  electronUpdater.autoUpdater.quitAndInstall(false, true);
});
electron.ipcMain.handle("updater:getVersion", () => electron.app.getVersion());
