/**
 * YouTube Automation System - Configuration
 * Loads credentials from .env.local
 */

const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const config = {
  // YouTube API Configuration
  youtube: {
    apiKey: process.env.YOUTUBE_API_KEY,
    clientId: process.env.YOUTUBE_CLIENT_ID,
    clientSecret: process.env.YOUTUBE_CLIENT_SECRET,
    refreshToken: process.env.YOUTUBE_REFRESH_TOKEN,
    channelId: process.env.YOUTUBE_CHANNEL_ID,
  },

  // ElevenLabs TTS Configuration
  elevenlabs: {
    apiKey: process.env.ELEVENLABS_API_KEY,
    voiceId: process.env.ELEVENLABS_VOICE_ID || 'EXAVITQu4vr4xnSDxMaL', // Default: Sarah
    modelId: 'eleven_monolingual_v1',
  },

  // Video Configuration
  video: {
    width: 1080,
    height: 1920, // 9:16 aspect ratio (vertical shorts)
    fps: 30,
    duration: 30, // 30 seconds
    format: 'mp4',
  },

  // Script Configuration
  script: {
    language: 'hinglish',
    themes: [
      'tech-innovation',
      'startup-wisdom',
      'coding-tricks',
      'ai-insights',
      'quantum-computing',
    ],
  },

  // Scheduler Configuration
  scheduler: {
    times: ['08:00', '13:00', '18:00'], // 3x daily uploads
    timezone: 'Asia/Kolkata',
  },

  // Directory Paths
  paths: {
    root: path.resolve(__dirname, '..'),
    src: path.resolve(__dirname, '../src'),
    media: path.resolve(__dirname, '../media'),
    videos: path.resolve(__dirname, '../media/videos'),
    audio: path.resolve(__dirname, '../media/audio'),
    frames: path.resolve(__dirname, '../media/frames'),
    logs: path.resolve(__dirname, '../logs'),
  },

  // Upload Configuration
  upload: {
    autoPublish: process.env.AUTO_PUBLISH === 'true',
    privacy: 'private', // 'private', 'unlisted', or 'public'
    category: 'Science & Technology',
  },
};

// Validate required credentials
const validateConfig = () => {
  const required = [
    'youtube.apiKey',
    'elevenlabs.apiKey',
  ];

  const missing = required.filter(key => {
    const keys = key.split('.');
    let value = config;
    for (const k of keys) {
      value = value[k];
      if (!value) return true;
    }
    return false;
  });

  if (missing.length > 0) {
    console.warn(
      `⚠️  Missing configuration: ${missing.join(', ')}\n` +
      `   Create .env.local with these keys`
    );
  }
};

// Create required directories
const ensureDirectories = () => {
  const dirs = [
    config.paths.videos,
    config.paths.audio,
    config.paths.frames,
    config.paths.logs,
  ];

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
};

validateConfig();
ensureDirectories();

module.exports = config;
