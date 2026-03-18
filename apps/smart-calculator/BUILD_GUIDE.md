# Smart Calculator - Build Guide

Complete guide to building the Smart Calculator APK from source.

## Quick Build (5 minutes)

For the fastest path to APK:

```bash
# 1. Install dependencies
npm install

# 2. Build APK via EAS (cloud)
npm install -g eas-cli
eas build --platform android --profile preview

# 3. Download and install when complete
```

---

## Detailed Build Instructions

### Option 1: EAS Build (Recommended - Cloud Build)

**Pros:**
- No local Android SDK required
- Automated, reliable builds
- Works on any OS (Windows, Mac, Linux)
- Best for production APK

**Steps:**

1. **Install EAS CLI globally**
   ```bash
   npm install -g eas-cli
   ```

2. **Create Expo account (free)**
   ```bash
   eas login
   # Follow prompts to create account
   ```

3. **Install project dependencies**
   ```bash
   cd /path/to/smart-calculator
   npm install
   ```

4. **Build APK**
   ```bash
   eas build --platform android --profile preview
   ```

5. **Monitor build**
   - Build starts in cloud
   - Takes 2-5 minutes
   - Watch progress in terminal

6. **Download APK**
   - Once complete, get download link
   - APK file is ~50-70MB
   - Ready to install on any Android device

---

### Option 2: Local Prebuild + Gradle

**Pros:**
- Full control over build
- No cloud dependency
- Can customize build locally

**Cons:**
- Requires Android SDK and JDK
- Takes longer (~10-15 minutes)
- More setup required

**Prerequisites:**
```bash
# Check Java is installed
java -version
# Should be JDK 11+

# Download Android SDK (if not installed)
# Visit: https://developer.android.com/studio/
# Or use Android SDK Manager
```

**Build Steps:**

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Prebuild Android project**
   ```bash
   npm run prebuild
   ```
   This generates native Android files in `android/` folder.

3. **Navigate to Android folder**
   ```bash
   cd android
   ```

4. **Build release APK**
   ```bash
   ./gradlew assembleRelease
   ```
   
   Or use Windows:
   ```bash
   gradlew.bat assembleRelease
   ```

5. **Find APK**
   ```bash
   # APK location:
   app/build/outputs/apk/release/app-release.apk
   ```

6. **Copy APK to workspace**
   ```bash
   cp app/build/outputs/apk/release/app-release.apk ../SmartCalculator.apk
   ```

---

## Build Configuration Files

### `eas.json` - EAS Build Configuration
- Defines build profiles
- APK type (release, preview)
- Build settings

### `app.json` - Expo Configuration
- App name, icon, splash screen
- Android package name: `com.abhishektech.smartcalculator`
- Permissions and plugins

### `package.json` - Dependencies
- React Native, Expo, TypeScript
- Build scripts defined here

### `tsconfig.json` - TypeScript Configuration
- Type checking rules
- Module resolution

---

## Customization Before Building

### Change App Name
Edit `app.json`:
```json
{
  "expo": {
    "name": "My Calculator",
    "slug": "my-calculator"
  }
}
```

### Change Package Name
Edit `app.json`:
```json
{
  "android": {
    "package": "com.myname.mycalculator"
  }
}
```

### Add App Icon
Replace `assets/icon.png` with your icon (192x192px)

### Add Splash Screen
Replace `assets/splash.png` with your splash (1080x1920px)

---

## Verification After Build

### Check File Size
- APK should be 50-70MB
- If larger, may have build issues

### Test on Device
1. Transfer APK to Android phone
2. Enable "Unknown sources" in Settings
3. Install and launch
4. Test all features:
   - Basic math (5+3=)
   - Scientific (sin, cos)
   - Memory (M+, MR)
   - Theme toggle
   - History
   - Copy button

### Logs
```bash
# Monitor app in real-time
adb logcat | grep ReactNativeJS
```

---

## Troubleshooting Builds

### Build Fails - No Internet
- EAS builds require internet connection
- Local prebuild can work offline

**Solution:**
- Ensure stable internet
- Or use local prebuild method

### Build Takes Too Long
- EAS builds: 2-5 minutes is normal
- First build may be slower

**If stuck >10 minutes:**
```bash
# Cancel and retry
Ctrl+C
eas build --platform android --profile preview --clear-cache
```

### APK Installation Fails
Check file integrity:
```bash
# Check file size (should be 50-70MB)
ls -lh SmartCalculator.apk

# Re-download if corrupted
```

### Out of Memory During Build
Increase heap size:
```bash
export _JAVA_OPTIONS="-Xmx2048m"
npm run prebuild
```

### Prebuild Missing Android SDK
```bash
# Set Android SDK path
export ANDROID_HOME=/path/to/android/sdk

# Or install Android Studio (includes SDK)
```

---

## Build Scripts Reference

```bash
# Start development server
npm start

# Test on Android device
npm run android

# Setup Android project locally
npm run prebuild

# Build release APK (after prebuild)
cd android && ./gradlew assembleRelease

# Build via EAS
eas build --platform android --profile preview

# Build debug APK
eas build --platform android --profile debug

# Build production APK
eas build --platform android --profile production
```

---

## File Structure

```
smart-calculator/
├── src/
│   ├── app/
│   │   └── index.tsx          # Main app component
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── Display.tsx
│   │   ├── History.tsx
│   │   └── KeyPad.tsx
│   └── utils/
│       ├── calculator.ts      # Core logic
│       └── voiceInput.ts
├── assets/                     # Icons and splash screens
├── android/                    # Native Android code (after prebuild)
├── app.json                   # Expo config
├── package.json               # Dependencies
├── eas.json                   # EAS build config
├── tsconfig.json              # TypeScript config
└── README.md
```

---

## Performance Optimization

### Build Size
- Current: ~60MB
- To reduce: Remove unused dependencies, minify code

### Build Time
- EAS cloud: 2-5 minutes (optimal)
- Local: 10-15 minutes first time, 5-10 after cache

### Runtime
- App size: ~20MB on device
- Memory: ~100MB when running
- Startup: 2-3 seconds

---

## Deploying to Multiple Devices

### Via USB
```bash
# List connected devices
adb devices

# Install on all devices
adb install SmartCalculator.apk
```

### Via Cloud Storage
1. Upload APK to Google Drive, Dropbox, etc.
2. Share download link
3. Users tap link → download → install

### Via Play Store
1. Create Google Play Developer account
2. Sign APK with release keystore
3. Upload to Play Store
4. Takes 24 hours to review

---

## Signing APK for Release

For Play Store submission, sign with keystore:

```bash
# Generate key (one time)
keytool -genkey -v -keystore my-release-key.keystore \
  -keyalg RSA -keysize 2048 -validity 10000 -alias my-key

# In eas.json, reference the keystore
{
  "build": {
    "production": {
      "android": {
        "buildType": "apk",
        "keystorePath": "my-release-key.keystore",
        "keystorePassword": "my-password",
        "keyAlias": "my-key",
        "keyPassword": "my-password"
      }
    }
  }
}

# Build signed APK
eas build --platform android --profile production
```

---

## Next Steps

1. **Build the APK** using Option 1 or 2
2. **Test on device** - verify all features work
3. **Distribute** - send APK to users
4. **Update** - modify code and rebuild to push updates

---

## Support

**Build stuck?**
1. Check internet connection
2. Clear cache: `npm cache clean --force`
3. Reinstall: `rm -rf node_modules && npm install`
4. Check logs: `eas build --platform android --profile preview --verbose`

**Still having issues?**
- Check Expo docs: https://docs.expo.dev/
- EAS troubleshooting: https://docs.expo.dev/build/troubleshooting/

---

**Built with ❤️ for Android**

Version: 1.0.0
