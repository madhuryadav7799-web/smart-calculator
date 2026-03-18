#!/bin/bash
# Smart Calculator APK Build Script
# This script builds the APK using the Expo & Gradle toolchain

set -e

PROJECT_DIR=$(pwd)
ANDROID_DIR="$PROJECT_DIR/android"
OUTPUT_DIR="$PROJECT_DIR/../releases"
APK_NAME="SmartCalculator-final.apk"

echo "========================================"
echo "Smart Calculator APK Build"
echo "========================================"
echo ""

# Check prerequisites
echo "1. Checking prerequisites..."
if ! command -v npm &> /dev/null; then
    echo "ERROR: npm not found. Please install Node.js."
    exit 1
fi

if ! command -v java &> /dev/null; then
    echo "WARNING: Java not found in PATH"
    echo "Build will require Java 11+ and Android SDK"
    echo ""
    echo "To build locally, install:"
    echo "  - Java Development Kit 11+ (https://adoptopenjdk.net/)"
    echo "  - Android SDK (https://developer.android.com/studio)"
    echo ""
    echo "Or use cloud build:"
    echo "  npm install -g eas-cli"
    echo "  eas login"
    echo "  eas build --platform android --profile preview"
    exit 1
fi

echo "✓ Node.js: $(node --version)"
echo "✓ npm: $(npm --version)"
echo "✓ Java: $(java -version 2>&1 | head -1)"
echo ""

# Install dependencies
echo "2. Installing dependencies..."
npm install --legacy-peer-deps

echo ""
echo "3. Preparing Android build..."
npm run prebuild -- --no-install

echo ""
echo "4. Building APK with Gradle..."
cd "$ANDROID_DIR"

if [ -f "gradlew" ]; then
    chmod +x gradlew
    ./gradlew clean assembleRelease
else
    gradle clean assembleRelease
fi

echo ""
echo "5. Locating built APK..."
APK_SOURCE="$ANDROID_DIR/app/build/outputs/apk/release/app-release.apk"

if [ ! -f "$APK_SOURCE" ]; then
    echo "ERROR: APK not found at $APK_SOURCE"
    exit 1
fi

echo "✓ APK built successfully"
echo "  Size: $(du -h "$APK_SOURCE" | cut -f1)"

echo ""
echo "6. Preparing output..."
mkdir -p "$OUTPUT_DIR"
cp "$APK_SOURCE" "$OUTPUT_DIR/$APK_NAME"

echo ""
echo "========================================"
echo "BUILD COMPLETE!"
echo "========================================"
echo ""
echo "APK Location: $OUTPUT_DIR/$APK_NAME"
echo "Size: $(du -h "$OUTPUT_DIR/$APK_NAME" | cut -f1)"
echo ""
echo "To install on Android device:"
echo "  adb install $APK_NAME"
echo ""
echo "Or transfer to device and tap to install"
