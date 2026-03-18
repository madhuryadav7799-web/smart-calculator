# Smart Calculator - Release & Build Guide

## 📋 Overview

This project uses GitHub Actions to automatically build and distribute Android APKs. Two automation workflows are available:

- **Debug APK** - Built automatically on every push
- **Release APK** - Built when creating version tags

---

## 🔨 Debug APK Builds

### Automatic Triggers

Debug APKs are built automatically when you:

```bash
git push origin main
git push origin develop
```

Or manually trigger:

1. Go to GitHub → **Actions** tab
2. Select **"Build Debug APK"** workflow
3. Click **"Run workflow"** button

### Output

Debug APKs are available as **GitHub Artifacts**:

1. Go to the workflow run
2. Scroll to **Artifacts** section
3. Download **"SmartCalculator-Debug-APK"**

**Output Path:** `android/app/build/outputs/apk/debug/app-debug.apk`

---

## 🎉 Release APK Builds

### Creating a Release

#### Step 1: Prepare Your Code

```bash
# Make sure everything is committed
git status
```

#### Step 2: Create a Version Tag

```bash
# Format: v<major>.<minor>.<patch>

git tag v1.0.0

# Or with message:
git tag -a v1.0.0 -m "Release version 1.0.0"
```

#### Step 3: Push the Tag

```bash
git push origin v1.0.0

# Or push all tags:
git push origin --tags
```

#### Step 4: Automatic Release Build Starts

The workflow automatically:

1. ✅ Checks out code at the tag
2. ✅ Builds release APK
3. ✅ Creates GitHub Release
4. ✅ Uploads APK as release asset
5. ✅ Generates release notes

**Output Path:** `android/app/build/outputs/apk/release/app-release.apk`

---

## 🔐 Release Signing (Optional)

For signed releases, configure these GitHub Secrets:

### Required Secrets

- `KEYSTORE_BASE64` - Base64 encoded .keystore file
- `KEYSTORE_PASSWORD` - Keystore password
- `KEY_ALIAS` - Key alias name
- `KEY_PASSWORD` - Key password

### How to Add Secrets

1. Go to GitHub → **Settings** → **Secrets and variables** → **Actions**
2. Click **"New repository secret"**
3. Add each secret

### Generate Keystore

```bash
keytool -genkey -v -keystore release.keystore \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias my-key-alias
```

### Encode for GitHub

```bash
base64 -i release.keystore | pbcopy
# Then paste into KEYSTORE_BASE64 secret
```

---

## 📥 Download Page

### URL Structure

```
https://GITHUB_USERNAME.github.io/smart-calculator/
```

### Features

- ✅ Automatically fetches latest release from GitHub API
- ✅ Shows version number and date
- ✅ Direct download button
- ✅ Installation instructions
- ✅ Mobile-friendly design

### Customization

Edit `download/index.html`:

```html
<!-- Replace these lines -->
const GITHUB_USERNAME = 'REPLACE_USERNAME';
const GITHUB_REPO = 'smart-calculator';
```

---

## 📊 Workflow Files

### Debug Workflow
- **File:** `.github/workflows/android-debug.yml`
- **Trigger:** Push to main/develop or manual
- **Output:** Debug APK artifact
- **Time:** ~15-20 minutes

### Release Workflow
- **File:** `.github/workflows/android-release.yml`
- **Trigger:** Git tags (v*.*.*)
- **Output:** GitHub Release with APK asset
- **Time:** ~20-25 minutes

### Pages Workflow
- **File:** `.github/workflows/pages-deploy.yml`
- **Trigger:** Push to main (changes in download/)
- **Output:** GitHub Pages site
- **Time:** ~2-3 minutes

---

## 🚀 Full Release Process

### Quick Checklist

```bash
# 1. Ensure code is ready
git status

# 2. Create version tag
git tag v1.0.0

# 3. Push tag to GitHub
git push origin v1.0.0

# 4. Monitor workflow
# Go to Actions tab and watch build progress

# 5. Verify release
# Go to Releases tab, see APK asset

# 6. Share download link
# https://GITHUB_USERNAME.github.io/smart-calculator/
```

---

## 🔍 Troubleshooting

### Build Fails: "APK not found"

- Check if `android/app/build.gradle` exists
- Verify gradlew permissions: `chmod +x android/gradlew`
- Check Java 17 is available

### Release Doesn't Create

- Verify tag format: `v1.0.0` (starts with 'v')
- Tag must be pushed: `git push origin v1.0.0`
- Check Actions tab for errors

### Download Page Shows "Loading..."

- Ensure GitHub Pages is enabled in Settings
- Check GITHUB_USERNAME is correct in download/index.html
- Repository must be public or set to allow API access

### Signing Fails

- Verify keystore secrets are set correctly
- Base64 encoding must be correct
- Key alias must match keystore contents

---

## 📱 Installation Instructions for Users

### From Download Page

1. Visit: `https://GITHUB_USERNAME.github.io/smart-calculator/`
2. Click **Download Latest APK**
3. Wait for download to complete
4. Open file and install

### From GitHub Releases

1. Go to **Releases** page
2. Find desired version
3. Click **SmartCalculator-release.apk** to download
4. Install on Android device

### Enable Unknown Sources

**Android 12+:**
- Settings → Apps → Special app access → Install unknown apps
- Select your browser → Allow

**Android 11 and below:**
- Settings → Security → Unknown Sources → Enable

---

## 💡 Tips & Best Practices

### Version Numbering

Follow semantic versioning:

```
v<MAJOR>.<MINOR>.<PATCH>

v1.0.0 - Initial release
v1.0.1 - Bug fix
v1.1.0 - New feature
v2.0.0 - Major update
```

### Release Notes

Add `CHANGELOG.md` to root for automatic release notes:

```markdown
## v1.0.0 - 2024-03-18

### Features
- Initial public release

### Fixes
- Fixed calculator rounding

### Requirements
- Android 7.0+
```

### Testing

Before release:

```bash
# Build debug locally
npm run prebuild
cd android
./gradlew assembleDebug

# Test on emulator/device
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 🔗 Useful Links

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Releases](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases)
- [GitHub Pages](https://pages.github.com/)
- [Semantic Versioning](https://semver.org/)

---

**Last Updated:** 2024-03-18  
**Status:** Production Ready ✅
