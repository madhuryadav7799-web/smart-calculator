# Clieo 2.0 Mobile App

A React Native + Expo mobile application for managing and monitoring Clieo AI agents.

## Features

✅ **Status Dashboard**
- Real-time CPU and Memory monitoring
- Agent status indicators
- Auto-refresh every 5 seconds
- Hinglish UI (Hindi + English mix)

✅ **Agent Controls**
- Start/Stop YouTube Agent
- Start/Stop Jarvis AI
- Start/Stop Browser Bot
- Real-time status updates
- Loading states and error handling

✅ **System Logs Viewer**
- View all system activities
- Filter by log level (info, warn, error)
- Timestamps and log details
- Responsive log display

✅ **Beautiful Clieo 2.0 Theme**
- Dark mode (#0a0a0a background)
- Cyan accent color (#00d9ff)
- Material Design icons
- Smooth animations

## Project Structure

```
clieo-mobile/
├── app/
│   ├── _layout.tsx (root layout)
│   ├── +html.tsx (web fallback)
│   ├── (tabs)/
│   │   ├── _layout.tsx (tab navigation)
│   │   ├── dashboard.tsx (status screen)
│   │   ├── agents.tsx (control screen)
│   │   └── logs.tsx (logs viewer)
├── services/
│   └── api.ts (API client for localhost:3000)
├── package.json
├── app.json
├── babel.config.js
├── tsconfig.json
├── eas.json
└── README.md
```

## Setup & Installation

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI: `npm install -g expo-cli`

### Install Dependencies

```bash
cd clieo-mobile
npm install
```

## Running the App

### Development (with Expo)
```bash
npm start
```

Then press:
- `a` for Android
- `i` for iOS
- `w` for web

### Building APK for Android

```bash
# Full build with prebuild
npm run build:apk

# Or step by step:
npm run prebuild
cd android
./gradlew assembleDebug
```

APK location: `android/app/build/outputs/apk/debug/app-debug.apk`

## API Integration

The app connects to **localhost:3000** (Clieo Master API) for:
- System status (CPU, memory)
- Agent control (start/stop)
- System logs fetching

### Expected API Endpoints

```
GET /api/status
- Returns: { cpu, memory, agents, timestamp }

POST /api/agents/{agentName}/start
- Params: youtube, jarvis, browser

POST /api/agents/{agentName}/stop
- Params: youtube, jarvis, browser

GET /api/logs?limit=50
- Returns: Array of logs with level, message, timestamp
```

## Localization

- **Dashboard**: English + Hindi
- **Labels**: Hinglish (mixed Hindi-English)
- **Messages**: User-friendly with emoji
- **Time Format**: 24-hour (IST)

## Performance

- Polling interval: 5 seconds for dashboard
- Minimal network requests
- Local state management with React hooks
- Optimized for mobile screens

## Dark Mode

- Default: Dark theme (#0a0a0a)
- Accent: Cyan (#00d9ff)
- No light mode toggle (optimized for night use)

## Build Output

After running `npm run build:apk`, the APK will be available at:

```
android/app/build/outputs/apk/debug/app-debug.apk
```

This APK can be:
1. Transferred to Android device
2. Shared via Telegram
3. Installed with: `adb install app-debug.apk`

## Deployment

Ready for:
- ✅ GitHub push
- ✅ Telegram delivery
- ✅ Direct APK installation
- ✅ EAS Build integration

## License

Built for Clieo 2.0 - AI Master Control Center
