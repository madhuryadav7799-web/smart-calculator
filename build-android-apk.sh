#!/bin/bash

# Smart Calculator APK Builder
# Builds a production-ready APK using Gradle

PROJECT_DIR="$HOME/.openclaw/workspace/apps/smart-calculator"
RELEASES_DIR="$HOME/.openclaw/workspace/releases"
BUILD_OUTPUT="$PROJECT_DIR/android/app/build/outputs/apk"

echo "======================================"
echo "Smart Calculator APK Build System"
echo "======================================"
echo ""

# Function to check prerequisites
check_prerequisites() {
    echo "Checking prerequisites..."
    
    # Check Java
    if ! command -v java &> /dev/null; then
        echo "ERROR: Java not found"
        echo "Install Java 11+ from: https://adoptopenjdk.net/"
        return 1
    fi
    
    echo "✓ Java: $(java -version 2>&1 | head -1)"
    
    # Check Android SDK
    if [ -z "$ANDROID_SDK_ROOT" ] && [ -z "$ANDROID_HOME" ]; then
        echo "WARNING: ANDROID_SDK_ROOT/ANDROID_HOME not set"
        echo "Android SDK may not be found"
        return 1
    fi
    
    echo "✓ Android SDK: ${ANDROID_SDK_ROOT:-${ANDROID_HOME}}"
    return 0
}

# Function to build APK
build_apk() {
    echo ""
    echo "Building APK..."
    
    cd "$PROJECT_DIR"
    
    # Ensure Android project exists
    if [ ! -d "android" ]; then
        echo "Android project not found. Running prebuild..."
        npm run prebuild -- --no-install
    fi
    
    # Build with Gradle
    cd android
    
    if [ ! -f "gradlew" ]; then
        echo "ERROR: Gradle wrapper not found"
        return 1
    fi
    
    chmod +x gradlew
    
    echo "Running Gradle build..."
    ./gradlew clean assembleRelease
    
    if [ $? -ne 0 ]; then
        echo "ERROR: Gradle build failed"
        return 1
    fi
    
    return 0
}

# Function to copy APK to releases
copy_apk() {
    echo ""
    echo "Finalizing APK..."
    
    APK_SOURCE="$PROJECT_DIR/android/app/build/outputs/apk/release/app-release.apk"
    APK_DEST="$RELEASES_DIR/SmartCalculator-final.apk"
    
    if [ ! -f "$APK_SOURCE" ]; then
        echo "ERROR: APK not found at $APK_SOURCE"
        return 1
    fi
    
    mkdir -p "$RELEASES_DIR"
    cp "$APK_SOURCE" "$APK_DEST"
    
    echo "✓ APK copied to: $APK_DEST"
    echo "  Size: $(du -h "$APK_DEST" | cut -f1)"
    
    return 0
}

# Main execution
main() {
    check_prerequisites || {
        echo ""
        echo "Prerequisites not met. Using alternative build methods..."
        echo ""
        echo "Option 1: Cloud Build (Recommended)"
        echo "  eas login && eas build --platform android --profile preview"
        echo ""
        echo "Option 2: Docker Build"
        echo "  docker run --rm -v \$PWD:/workspace android-build-env:latest"
        return 1
    }
    
    build_apk || {
        echo "Build failed. Check logs above."
        return 1
    }
    
    copy_apk || {
        echo "Failed to copy APK"
        return 1
    }
    
    echo ""
    echo "======================================"
    echo "BUILD SUCCESSFUL!"
    echo "======================================"
    echo ""
    echo "APK: $RELEASES_DIR/SmartCalculator-final.apk"
    echo "Size: $(du -h "$RELEASES_DIR/SmartCalculator-final.apk" | cut -f1)"
    echo ""
    echo "Installation:"
    echo "  adb install -r SmartCalculator-final.apk"
    echo ""
    return 0
}

main
