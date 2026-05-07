# Court Assistant

Professional desktop application for district court judges.

## Quick Start

### Requirements
- Node.js 20+ (https://nodejs.org)
- Windows 10/11 x64

### Installation
```
install.bat
```

### Development
```
run.bat
```

### Build .exe installer
```
build.bat
```

## Structure
```
court-assistant/
├── src/
│   ├── main/          # Electron main process
│   ├── preload/       # Preload bridge
│   └── renderer/      # React UI
│       └── src/
│           ├── components/
│           ├── pages/
│           ├── modules/
│           ├── store/
│           ├── storage/
│           ├── templates/
│           ├── styles/
│           └── types/
├── resources/
│   └── heraldry/      # Eagle images (replace with actual heraldry)
├── install.bat
├── run.bat
└── build.bat
```

## Assets
Place heraldry images in `resources/heraldry/`:
- `eagle.png` — coat of arms eagle
- `eagle-circle.png` — eagle in circle frame

## Hotkeys
- `Ctrl+N` — New case
- `Ctrl+S` — Save
- `Ctrl+B` — Bold
- `Ctrl+I` — Italic
- `Ctrl+Shift+C` — Copy BBCode

---
Developed by Prince Cursed | ds: saint.prince
