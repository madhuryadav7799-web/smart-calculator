# Quick Build: Smart Calculator APK

**Time Required:** 5-10 minutes (with internet)

---

## Prerequisites
- Node.js 18+ installed
- npm installed
- Internet connection
- (Optional) Android phone for testing

---

## Step 1: Navigate to Project

```bash
cd /workspace/apps/smart-calculator
```

---

## Step 2: Install Dependencies

```bash
npm install
```

This downloads required packages (~500MB). First time may take 2-3 minutes.

---

## Step 3: Install EAS CLI (First Time Only)

```bash
npm install -g eas-cli
```

This is a global tool, only needs to be installed once.

---

## Step 4: Login to Expo Account (First Time Only)

```bash
eas login
```

**If you don't have an Expo account:**
1. Follow prompts to create one (free)
2. Enter email and password
3. Verify email (check inbox)

---

## Step 5: Build APK

```bash
eas build --platform android --profile preview
```

**What happens:**
- EAS CLI uploads your code to Expo's servers
- Cloud servers compile your app
- Generates APK file
- Takes 2-5 minutes

**Monitor progress:**
- Terminal shows real-time status
- You'll see "Build complete!" when done

---

## Step 6: Download APK

When build completes:
1. You'll see a download link in terminal
2. Click the link OR
3. Visit Expo Dashboard to download
4. APK file is ~60MB

**Save location:** Anywhere on your computer

---

## Step 7: Install on Android Phone

### Option A: Via USB
```bash
# Connect phone with USB
adb install SmartCalculator.apk
```

### Option B: Manual Transfer
1. Email APK to yourself
2. Download on phone
3. Tap file to install
4. Tap "Install"
5. Allow if prompted

### Option C: Cloud Storage
1. Upload to Google Drive / Dropbox
2. Share link
3. User downloads and installs

---

## Verify Installation

After installing, check:

✅ **App opens** - No crashes
✅ **Basic math** - 5 + 3 = 8
✅ **Scientific** - Toggle "Sci" mode
✅ **Memory** - M+ adds to memory
✅ **Theme** - Toggle Dark/Light
✅ **History** - Shows past calculations
✅ **Copy** - Copy button works

---

## Troubleshooting

### Build Fails - No Internet
- Check WiFi/data connection
- Try again: `eas build --platform android --profile preview`

### Build Timeout (>10 minutes)
- Press Ctrl+C to cancel
- Run again: `eas build --platform android --profile preview --clear-cache`

### Installation Fails on Phone
- Enable "Unknown sources"
  - Settings → Security → Unknown sources → ON
- Check 50MB free space
- Uninstall first, then reinstall

### App Crashes
- Uninstall
- Reinstall fresh APK
- Ensure Android 7.0+

---

## Support Files

**Detailed guides:**
- `INSTALLATION_GUIDE.md` - Complete installation help
- `BUILD_GUIDE.md` - Detailed build instructions
- `README.md` - Feature overview
- `PROJECT_SUMMARY.md` - Complete project details

---

## Common Questions

**Q: Why is the APK so large (60MB)?**
A: Includes React Native, all dependencies, and app code. Normal size for React Native apps.

**Q: Do I need Android Studio?**
A: No! EAS builds it in the cloud. You only need Node.js and npm.

**Q: Can I build it locally without EAS?**
A: Yes, see BUILD_GUIDE.md for local Gradle build instructions.

**Q: How do I update the APK?**
A: Change code, rebuild using `eas build`, users reinstall new APK.

**Q: Is there a Play Store version?**
A: Not yet. You can upload to Play Store later if desired.

---

## Next Steps

1. ✅ Build APK (follow steps above)
2. ✅ Test on phone (verify features)
3. ✅ Share APK (send to users)
4. ✅ Users install (standard Android install)
5. ✅ Enjoy calculator! (use and give feedback)

---

## Exact Commands (Copy-Paste Ready)

```bash
# 1. Go to project
cd /workspace/apps/smart-calculator

# 2. Install dependencies
npm install

# 3. Install EAS (first time only)
npm install -g eas-cli

# 4. Login (first time only)
eas login

# 5. Build APK
eas build --platform android --profile preview

# 6. Wait for build to complete
# 7. Download APK from link
# 8. Install on phone
```

---

## Success Indicators

✅ **Steps Complete:**
- [ ] Dependencies installed
- [ ] EAS CLI installed
- [ ] Logged in to Expo
- [ ] Build started (shows progress)
- [ ] Build completed (shows download link)
- [ ] APK downloaded (~60MB)
- [ ] APK installed on phone
- [ ] App opens and works

---

## That's It! 🎉

You now have a production-ready calculator app on your Android phone.

**Enjoy your Smart Calculator!**

---

**For help:** See BUILD_GUIDE.md or INSTALLATION_GUIDE.md

**Questions?** Check the README.md or PROJECT_SUMMARY.md
