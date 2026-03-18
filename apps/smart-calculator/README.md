# Smart Calculator - React Native

A production-ready, feature-rich calculator app for Android built with React Native and Expo.

## Features

✨ **Basic Arithmetic**
- Addition, Subtraction, Multiplication, Division
- Percentage calculations
- Sign toggle (±)

🔬 **Scientific Functions**
- Trigonometric: sin, cos, tan (in degrees)
- Logarithmic: log (base 10), ln (natural log)
- Power functions: x², x³, 1/x, √
- Constants: π, e

💾 **Memory Functions**
- M+ (Memory Add)
- M- (Memory Subtract)
- MR (Memory Recall)
- MC (Memory Clear)

🎨 **User Interface**
- Dark/Light theme toggle
- Basic and Scientific modes
- Large, readable display
- Responsive button layout

📝 **History & Clipboard**
- View calculation history
- Copy results to clipboard
- Reuse previous results
- Clear history on demand

## Quick Start

```bash
# Install dependencies
npm install

# Start development
npm start

# Build APK
npm install -g eas-cli
eas build --platform android --profile preview
```

## Installation

See `INSTALLATION_GUIDE.md` for detailed setup and installation instructions.

## Building

See `BUILD_GUIDE.md` for complete build instructions.

## Project Structure

```
src/
├── app/index.tsx          # Main app
├── components/            # UI components
│   ├── Button.tsx
│   ├── Display.tsx
│   ├── History.tsx
│   └── KeyPad.tsx
└── utils/                 # Utilities
    ├── calculator.ts      # Core logic
    └── voiceInput.ts
```

## Tech Stack

- React Native 0.74
- Expo 51
- TypeScript 5.3

## License

MIT - Free to use and modify

---

**For Abhishek Tech Stack** - v1.0.0
