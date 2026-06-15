# Сборка Court Assistant (Windows + macOS)

Приложение кроссплатформенное (Electron). Готовые установщики собираются
автоматически в GitHub Actions при пуше тега `vX.Y.Z` — и для Windows, и для macOS —
и публикуются в [Releases](https://github.com/PrinceCursed/court-assistant/releases).

## Скачать готовое приложение

1. Открой страницу **Releases** репозитория.
2. Под нужной версией → **Assets**:
   - **Windows:** `Court.Assistant.Setup.X.Y.Z.exe`
   - **macOS (Apple Silicon, M1/M2/M3):** `Court Assistant-X.Y.Z-arm64.dmg`
   - **macOS (Intel):** `Court Assistant-X.Y.Z.dmg`

### Первый запуск на macOS (приложение без подписи Apple)

Сборка не подписана сертификатом Apple Developer, поэтому Gatekeeper при первом
запуске покажет предупреждение. Это нормально. Варианты:

- **Способ 1:** правый клик по приложению → **Открыть** → в диалоге ещё раз **Открыть**.
- **Способ 2 (если «приложение повреждено»):** перетащи `Court Assistant.app`
  в папку «Программы», затем в Терминале выполни:
  ```bash
  xattr -cr "/Applications/Court Assistant.app"
  ```
  После этого приложение запускается обычным двойным кликом.

## Локальная сборка

Нужен Node.js 20+.

```bash
npm ci --legacy-peer-deps      # установить зависимости

npm run build:mac              # собрать .dmg/.zip для macOS (только на macOS)
npm run build:win              # собрать .exe для Windows (только на Windows)
npm run dev                    # запустить в режиме разработки
```

Результаты сборки — в папке `release/`.

> Примечание: автообновление (electron-updater) работает на Windows и на
> подписанных macOS-сборках. Неподписанные macOS-сборки нужно обновлять вручную,
> скачивая новый `.dmg` из Releases.
