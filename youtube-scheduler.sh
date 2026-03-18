#!/bin/bash

# YouTube Automation Scheduler
# Runs at: 08:00, 13:00, 18:00 IST
# Status: ACTIVE

LOG_FILE="/data/data/com.termux/files/home/.openclaw/workspace/logs/yt-automation.log"
PROJECT_DIR="/data/data/com.termux/files/home/.openclaw/workspace/yt-automation"

echo "[$(date)] YouTube Automation Started" >> $LOG_FILE

# Check .env.local exists
if [ ! -f "$PROJECT_DIR/.env.local" ]; then
    echo "[$(date)] ERROR: .env.local not found" >> $LOG_FILE
    exit 1
fi

# Navigate to project
cd $PROJECT_DIR

# Load env
source .env.local

# Run automation
echo "[$(date)] Generating script..." >> $LOG_FILE
node src/scriptGenerator.js >> $LOG_FILE 2>&1

echo "[$(date)] Generating video..." >> $LOG_FILE
node src/videoGenerator.js >> $LOG_FILE 2>&1

echo "[$(date)] Uploading to YouTube..." >> $LOG_FILE
node src/youtubeUploader.js >> $LOG_FILE 2>&1

echo "[$(date)] YouTube Automation Completed" >> $LOG_FILE
echo "---" >> $LOG_FILE
