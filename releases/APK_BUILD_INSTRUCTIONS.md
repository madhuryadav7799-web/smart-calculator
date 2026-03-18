# Smart Calculator APK Build Instructions

## Cloud Build (Recommended - No Local Setup)

### Option A: Expo EAS Build
```bash
cd ~/.openclaw/workspace/apps/smart-calculator

# 1. Install EAS CLI
npm install -g eas-cli

# 2. Create free Expo account
eas login
# Follow prompts to create account

# 3. Build APK
eas build --platform android --profile preview

# 4. Download when complete
# APK will be ~60-70MB and ready to install
```

**Advantages:**
- Works on any OS (Windows, Mac, Linux)
- No local Android SDK required
- Automated build process
- Faster builds

**Time:** 2-5 minutes

---

## Local Build (Advanced)

### Prerequisites
1. Java Development Kit 11+ ([Download](https://adoptopenjdk.net/))
2. Android SDK ([Android Studio](https://developer.android.com/studio))
3. Set ANDROID_HOME environment variable

### Build Steps
```bash
cd ~/.openclaw/workspace/apps/smart-calculator

# 1. Install Node dependencies
npm install

# 2. Prebuild Android project
npm run prebuild

# 3. Build APK with Gradle
cd android
./gradlew assembleRelease

# 4. Find APK
ls app/build/outputs/apk/release/app-release.apk

# 5. Copy to releases
cp app/build/outputs/apk/release/app-release.apk ../SmartCalculator-final.apk
```

**Time:** 10-15 minutes (first time), 5-10 minutes (cached)

---

## Docker Build

### Prerequisites
- Docker installed

### Steps
```bash
cd ~/.openclaw/workspace/apps/smart-calculator

# Build using Docker
docker run --rm -it \
  -v $PWD:/workspace \
  -e ANDROID_SDK_ROOT=/sdk \
  -e JAVA_HOME=/usr/lib/jvm/java-11 \
  ubuntu:22.04 << 'DOCKER'
  
apt-get update
apt-get install -y nodejs npm openjdk-11-jdk android-sdk-tools
npm install
npm run prebuild
cd android
./gradlew assembleRelease

DOCKER
```

---

## Installation on Android Device

### Method 1: USB Transfer
```bash
adb install SmartCalculator-final.apk
```

### Method 2: Manual Install
1. Transfer APK to Android phone via USB or cloud storage
2. On phone: Settings → Security → Allow "Unknown sources"
3. Tap APK file to install
4. Grant permissions as requested

### Method 3: QR Code
```bash
# Generate QR code for easy sharing
qrencode -o SmartCalculator.qr < SmartCalculator-final.apk
```

---

## Features
✓ Basic Arithmetic (+, -, ×, ÷)
✓ Scientific Functions (sin, cos, tan, log, sqrt)
✓ Memory Operations (M+, M-, MR, MC)
✓ Calculation History
✓ Dark/Light Theme Toggle
✓ Voice Input
✓ Copy to Clipboard
✓ Keyboard Support

---

## Troubleshooting

### Build Fails - "gradlew not found"
Prebuild didn't generate Android files. Run:
```bash
npm run prebuild --clean
```

### Build Fails - "Java not found"
Install JDK 11+: https://adoptopenjdk.net/

### Build Fails - "Android SDK not found"
Set ANDROID_HOME environment variable:
```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```

### APK Won't Install
- Check file integrity: `ls -lh SmartCalculator-final.apk`
- Should be 50-80MB
- Try clearing app data on device first
- Check Android version (requires 10+)

### App Crashes on Launch
- Grant all permissions when prompted
- Check device memory (needs ~100MB free)
- Check device storage for app installation

---

## Build Verification

After building, verify the APK:

```bash
# Check file size (should be 50-80MB)
ls -lh SmartCalculator-final.apk

# Verify it's a valid ZIP
unzip -t SmartCalculator-final.apk | head -10

# Extract APK manifest (requires aapt tool)
aapt dump badging SmartCalculator-final.apk
```

Expected output:
- File size: 50-80MB
- Package: com.abhishektech.smartcalculator
- Version: 1.0.0

---

## File Locations

```
~/.openclaw/workspace/
├── apps/smart-calculator/          # Source code
│   ├── src/                        # React Native components
│   ├── android/                    # Android native code (after prebuild)
│   ├── app.json                    # Expo config
│   └── package.json                # Dependencies
│
├── releases/                        # Build output
│   └── SmartCalculator-final.apk   # Final APK (50-80MB)
```

---

## Next Steps

1. **Build the APK** using one of the methods above
2. **Test on device** - verify all features work
3. **Distribute** to users via APK file, Play Store, or web link
4. **Update** - modify source code and rebuild to push updates

---

**For issues or questions:**
- Check Expo docs: https://docs.expo.dev/
- Android docs: https://developer.android.com/docs
- EAS troubleshooting: https://docs.expo.dev/build/troubleshooting/

**Built with React Native + Expo** ❤️
Version 1.0.0
