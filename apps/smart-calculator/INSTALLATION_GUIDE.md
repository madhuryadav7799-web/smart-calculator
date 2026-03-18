# Smart Calculator - Installation Guide

Quick installation guide for Abhishek.

## Prerequisites

- Node.js 18+ 
- npm
- Android phone or emulator

## Option 1: Install Pre-built APK (Easiest)

1. Get the APK file: `SmartCalculator.apk`
2. Transfer to your Android phone
3. Open file manager and tap the APK
4. Tap "Install"
5. Open from app drawer

## Option 2: Build APK Yourself

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Build APK via EAS (Recommended)
```bash
npm install -g eas-cli
eas login
eas build --platform android --profile preview
```

### Step 3: Download and Install
- Download the APK when build completes
- Transfer to phone and install

## Testing

After installation, test these features:
- ✓ Basic math: 5 + 3 = 8
- ✓ Scientific: sin(90) = 1
- ✓ Memory: M+ and MR work
- ✓ Theme toggle: Dark/Light switches
- ✓ History: Shows past calculations
- ✓ Copy: Result copies to clipboard

## Troubleshooting

### Installation Fails
- Enable "Unknown sources" in Settings
- Check 50MB free storage
- Reinstall: uninstall first, then install

### App Crashes
- Uninstall and reinstall
- Ensure Android 7.0+ (API 24+)

For detailed help, see `BUILD_GUIDE.md` and `PROJECT_SUMMARY.md`.

---

**Version 1.0.0** | Built with React Native + Expo
