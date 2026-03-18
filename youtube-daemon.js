#!/usr/bin/env node

/**
 * YouTube Automation Daemon
 * Runs 3x daily: 08:00, 13:00, 18:00 IST
 * Start with: node youtube-daemon.js
 */

const fs = require('fs');
const { execSync } = require('child_process');

const TIMES = [8, 13, 18]; // IST hours
const PROJECT_DIR = '/data/data/com.termux/files/home/.openclaw/workspace/yt-automation';
const LOG_FILE = '/data/data/com.termux/files/home/.openclaw/workspace/logs/yt-daemon.log';

function log(msg) {
  const timestamp = new Date().toISOString();
  const logMsg = `[${timestamp}] ${msg}`;
  console.log(logMsg);
  fs.appendFileSync(LOG_FILE, logMsg + '\n');
}

function checkTime() {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  
  return TIMES.includes(hour) && minute >= 0 && minute < 5;
}

function runYouTubeAutomation() {
  log('🚀 Starting YouTube Automation');
  
  try {
    // Check .env.local
    if (!fs.existsSync(`${PROJECT_DIR}/.env.local`)) {
      log('❌ .env.local not found!');
      return;
    }
    
    process.chdir(PROJECT_DIR);
    
    // Run automation
    log('📝 Generating script...');
    execSync('node src/scriptGenerator.js', { stdio: 'inherit' });
    
    log('🎬 Generating video...');
    execSync('node src/videoGenerator.js', { stdio: 'inherit' });
    
    log('📤 Uploading to YouTube...');
    execSync('node src/youtubeUploader.js', { stdio: 'inherit' });
    
    log('✅ YouTube Automation Completed');
  } catch (err) {
    log(`❌ Error: ${err.message}`);
  }
}

function start() {
  log('🤖 YouTube Daemon Started');
  log(`📅 Scheduled times: ${TIMES.join(':00, ')}:00 IST`);
  
  // Check every minute
  setInterval(() => {
    if (checkTime()) {
      runYouTubeAutomation();
    }
  }, 60000);
}

// Start daemon
start();
