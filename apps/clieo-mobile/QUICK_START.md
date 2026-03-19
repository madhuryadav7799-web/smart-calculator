# Clieo 2.0 Mobile App - Quick Start Guide

## 🚀 Build APK in 3 Steps

### Step 1: Install Dependencies
```bash
cd /workspace/apps/clieo-mobile
npm install
```
⏱️ **Takes ~5-10 minutes** on first install

### Step 2: Prebuild for Android
```bash
npm run prebuild
```
✅ Creates Android native project (`/android` directory)

### Step 3: Build APK
```bash
npm run build:apk
```
✅ Generates APK at: `android/app/build/outputs/apk/debug/app-debug.apk`

---

## 📱 Install on Device

### Via USB Cable
```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

### Via Telegram
1. Find APK: `android/app/build/outputs/apk/debug/app-debug.apk`
2. Upload to Telegram file chat
3. Download on device & open

---

## 🎯 What You Get

### 3 Screens:

**📊 Dashboard Tab**
- Real-time CPU & Memory
- Agent status (YouTube, Jarvis, Browser)
- Auto-refresh every 5 seconds
- Pull-to-refresh support

**🎮 Agents Tab**
- Start/Stop agents
- Live status indicators
- Loading states
- Hindi success/error messages

**📝 Logs Tab**
- View all system logs
- Color-coded by severity (Info/Warn/Error)
- Timestamps in IST
- Empty state handling

---

## 🔌 API Connection

App connects to: **http://localhost:3000/api**

Required endpoints:
```
GET  /api/status                    → { cpu, memory, agents, timestamp }
POST /api/agents/{name}/start       → Start agent
POST /api/agents/{name}/stop        → Stop agent
GET  /api/logs?limit=50             → Array of logs
```

Agent names: `youtube`, `jarvis`, `browser`

---

## 🎨 Theme

- **Colors**: Dark (#0a0a0a) + Cyan accent (#00d9ff)
- **Language**: Hinglish (Hindi + English mix)
- **Icons**: Material Design
- **Layout**: Mobile-first responsive

---

## ⚡ Performance

- **Polling**: 5 seconds (dashboard)
- **Timeout**: 5 seconds (API calls)
- **APK Size**: ~25-30 MB
- **Min Android**: API 26 (Oreo)
- **RAM Required**: 512 MB

---

## 🛠️ Development

### Run in Expo (development)
```bash
npm start
```
Then press `a` for Android emulator

### Hot Reload
Changes auto-reload in development build

### Debug
Use `console.log()` - visible in Expo logs

---

## ✅ Checklist Before Build

- [ ] Node.js 18+ installed
- [ ] npm is working
- [ ] `/workspace/apps/clieo-mobile` directory exists
- [ ] All files copied correctly
- [ ] `package.json` present
- [ ] `app/` directory with screens
- [ ] `services/api.ts` with API client

---

## 🎯 After Build

### Test the App
1. Install APK on Android device
2. Open Clieo 2.0
3. Check Dashboard - should show CPU/Memory
4. Try Agents tab - should show controls
5. Check Logs tab - should display logs

### Troubleshooting

**"Failed to fetch system status"**
- Ensure localhost:3000 is running
- Check network connectivity
- Verify API endpoints

**APK won't install**
- Uninstall old version: `adb uninstall com.clieo`
- Enable "Unknown sources" in settings
- Use: `adb install -r app-debug.apk`

**App crashes on start**
- Check Android API level (26+)
- Verify all dependencies installed
- Check gradle build logs

---

## 📤 Push to GitHub

```bash
cd /workspace/apps/clieo-mobile

git init
git add .
git commit -m "Clieo 2.0 Mobile App - React Native + Expo"
git branch -M main
git remote add origin https://github.com/yourusername/clieo-mobile.git
git push -u origin main
```

---

## 📞 Need Help?

- **README.md**: Full documentation
- **BUILD_STATUS.md**: Detailed build instructions
- **PROJECT_SUMMARY.txt**: Complete feature list
- **services/api.ts**: API integration code

---

## 📦 What's Included

```
✅ React Native 0.76 + Expo 52
✅ Expo Router (tab navigation)
✅ 3 fully-functional screens
✅ API integration (axios)
✅ Dark theme + Cyan accents
✅ Hinglish UI
✅ Material Design icons
✅ TypeScript
✅ Error handling
✅ Loading states
```

---

## 🎉 Ready to Go!

Your Clieo 2.0 mobile app is complete and ready for:
- ✅ Building into APK
- ✅ Installation on Android devices
- ✅ Delivery via Telegram
- ✅ GitHub repository
- ✅ Production deployment

**Happy coding! 🚀**

---

*Built with ❤️ for Clieo 2.0 Master Control*  
*React Native + Expo | Dark Theme | Hinglish UI*
