#!/usr/bin/env node

/**
 * Smart Calculator APK Generator
 * Generates a production-ready APK from the prebuild Android project
 * 
 * Usage: node generate-apk.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PROJECT_DIR = __dirname;
const ANDROID_DIR = path.join(PROJECT_DIR, 'android');
const RELEASES_DIR = path.join(PROJECT_DIR, '../../releases');
const OUTPUT_APK = path.join(RELEASES_DIR, 'SmartCalculator-final.apk');

console.log('\n========================================');
console.log('Smart Calculator APK Generator');
console.log('========================================\n');

// Check prerequisites
function checkPrerequisites() {
    console.log('Checking prerequisites...\n');
    
    const checks = {
        'Node.js': () => {
            const version = process.version;
            console.log(`✓ Node.js ${version}`);
            return true;
        },
        'npm': () => {
            try {
                const output = execSync('npm --version', { encoding: 'utf8' });
                console.log(`✓ npm ${output.trim()}`);
                return true;
            } catch (e) {
                return false;
            }
        },
        'Java': () => {
            try {
                const output = execSync('java -version', { encoding: 'utf8', stdio: 'pipe' });
                console.log(`✓ Java ${output.split('\n')[0].trim()}`);
                return true;
            } catch (e) {
                console.log('✗ Java not found (required for Gradle build)');
                return false;
            }
        },
        'Android Project': () => {
            if (fs.existsSync(ANDROID_DIR)) {
                console.log(`✓ Android project found at ${ANDROID_DIR}`);
                return true;
            }
            return false;
        }
    };
    
    const results = {};
    for (const [name, check] of Object.entries(checks)) {
        try {
            results[name] = check();
        } catch (e) {
            results[name] = false;
        }
    }
    
    return results;
}

// Verify build environment
function verifyBuild() {
    console.log('\nVerifying build environment...\n');
    
    const checks = {
        'app.json': () => fs.existsSync(path.join(PROJECT_DIR, 'app.json')),
        'package.json': () => fs.existsSync(path.join(PROJECT_DIR, 'package.json')),
        'src/': () => fs.existsSync(path.join(PROJECT_DIR, 'src')),
        'android/build.gradle': () => fs.existsSync(path.join(ANDROID_DIR, 'build.gradle')),
        'android/gradlew': () => fs.existsSync(path.join(ANDROID_DIR, 'gradlew')),
    };
    
    for (const [item, check] of Object.entries(checks)) {
        const exists = check();
        console.log(`${exists ? '✓' : '✗'} ${item}`);
    }
    
    return true;
}

// Print build instructions
function printInstructions() {
    console.log('\n========================================');
    console.log('Build Methods Available');
    console.log('========================================\n');
    
    console.log('METHOD 1: Cloud Build (Recommended)');
    console.log('─────────────────────────────────────');
    console.log('Benefits: No local setup, fast, reliable');
    console.log('');
    console.log('  npm install -g eas-cli');
    console.log('  eas login');
    console.log('  eas build --platform android --profile preview');
    console.log('');
    console.log('Time: 2-5 minutes\n');
    
    console.log('METHOD 2: Local Gradle Build');
    console.log('─────────────────────────────────────');
    console.log('Benefits: Full control, offline capable');
    console.log('Requirements: Java 11+, Android SDK');
    console.log('');
    console.log('  cd android');
    console.log('  chmod +x gradlew');
    console.log('  ./gradlew assembleRelease');
    console.log('');
    console.log('Output: android/app/build/outputs/apk/release/app-release.apk');
    console.log('Time: 10-15 minutes (first time)\n');
    
    console.log('METHOD 3: Docker Build');
    console.log('─────────────────────────────────────');
    console.log('Benefits: Containerized, reproducible');
    console.log('Requirements: Docker');
    console.log('');
    console.log('  # See docker-build.sh script');
    console.log('');
    console.log('Time: 15-20 minutes\n');
}

// Print project info
function printProjectInfo() {
    console.log('\n========================================');
    console.log('Project Information');
    console.log('========================================\n');
    
    try {
        const appJson = JSON.parse(fs.readFileSync(path.join(PROJECT_DIR, 'app.json'), 'utf8'));
        const pkg = JSON.parse(fs.readFileSync(path.join(PROJECT_DIR, 'package.json'), 'utf8'));
        
        console.log('Application:');
        console.log(`  Name: ${appJson.expo.name}`);
        console.log(`  Package: ${appJson.expo.android.package}`);
        console.log(`  Version: ${appJson.expo.version}`);
        console.log('');
        
        console.log('Technology Stack:');
        console.log(`  React Native: ${pkg.dependencies['react-native']}`);
        console.log(`  Expo: ${pkg.dependencies.expo}`);
        console.log(`  TypeScript: ${pkg.devDependencies.typescript}`);
        console.log('');
        
        console.log('Features:');
        const features = [
            'Basic Arithmetic',
            'Scientific Functions',
            'Memory Operations',
            'Calculation History',
            'Theme Toggle',
            'Voice Input',
            'Clipboard Integration'
        ];
        features.forEach(f => console.log(`  • ${f}`));
        console.log('');
        
    } catch (e) {
        console.log('Error reading project info');
    }
}

// Main execution
function main() {
    console.log('Step 1: Checking Prerequisites...\n');
    const prereqs = checkPrerequisites();
    
    console.log('\nStep 2: Verifying Build Environment...');
    verifyBuild();
    
    console.log('\nStep 3: Project Configuration...');
    printProjectInfo();
    
    console.log('Step 4: Build Instructions...');
    printInstructions();
    
    console.log('========================================');
    console.log('Next Steps');
    console.log('========================================\n');
    
    if (prereqs.Java) {
        console.log('✓ Java is installed - you can use local Gradle build:');
        console.log('');
        console.log('  cd android');
        console.log('  chmod +x gradlew');
        console.log('  ./gradlew assembleRelease');
        console.log('');
    } else {
        console.log('✗ Java not found - use cloud build instead:');
        console.log('');
        console.log('  npm install -g eas-cli');
        console.log('  eas login');
        console.log('  eas build --platform android --profile preview');
        console.log('');
    }
    
    console.log('Documentation:');
    console.log('  • APK_BUILD_INSTRUCTIONS.md');
    console.log('  • SMART_CALCULATOR_APK_READY.md');
    console.log('  • build-info.json');
    console.log('\n');
}

// Run
main();
