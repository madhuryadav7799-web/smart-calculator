# ⚡ Quick Start Guide

Get your YouTube Automation System up and running in 5 minutes!

## Step 1: Get API Credentials (5 minutes)

### YouTube API

1. Go to **[Google Cloud Console](https://console.cloud.google.com/)**
2. Click "Create Project"
3. Search for "YouTube Data API v3"
4. Click "Enable"
5. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
6. Choose "Desktop App"
7. Download the JSON file
8. Extract: `client_id`, `client_secret`

### Get YouTube Refresh Token

```bash
# Run this once to get the refresh token
node scripts/get-youtube-token.js
# Follow the authentication flow
```

### ElevenLabs API

1. Go to **[ElevenLabs](https://elevenlabs.io/)**
2. Sign up (free tier available)
3. Go to Settings → API Keys
4. Copy your API key
5. Go to Voices, copy a voice ID (e.g., `EXAVITQu4vr4xnSDxMaL`)

## Step 2: Configure System (2 minutes)

```bash
cd yt-automation

# Copy template
cp .env.template .env.local

# Edit with your credentials
nano .env.local
```

Add these to `.env.local`:

```env
YOUTUBE_API_KEY=your_api_key_here
YOUTUBE_CLIENT_ID=your_client_id_here
YOUTUBE_CLIENT_SECRET=your_client_secret_here
YOUTUBE_REFRESH_TOKEN=your_refresh_token_here
YOUTUBE_CHANNEL_ID=UCyour_channel_id

ELEVENLABS_API_KEY=your_elevenlabs_key_here
ELEVENLABS_VOICE_ID=EXAVITQu4vr4xnSDxMaL
```

## Step 3: Install & Test (1 minute)

```bash
# Install dependencies
npm install

# Run once to test
npm run once

# Check output
ls -la logs/
ls -la media/
```

You should see:
- ✅ Generated script
- ✅ Created video
- ✅ Upload queued
- ✅ Execution log

## Step 4: Start Automation! (1 minute)

```bash
# Start daemon (runs 3x daily automatically)
npm start

# Watch the magic happen!
# Ctrl+C to stop
```

### Alternative: Manual Scheduling

```bash
# Run once per upload
npm run once

# Via cron (every day at 8:00 AM):
0 8 * * * cd /path/to/yt-automation && npm run once

# Via cron (every day at 1:00 PM):
0 13 * * * cd /path/to/yt-automation && npm run once

# Via cron (every day at 6:00 PM):
0 18 * * * cd /path/to/yt-automation && npm run once
```

## Commands Reference

```bash
npm run once        # Generate 1 video now
npm start           # Start 3x daily daemon
npm run status      # Show system status
npm run schedule    # Show today's schedule
npm run scripts     # List available scripts
npm run animate     # Show animation styles
npm run test        # Quick test
```

## 📊 Check Progress

```bash
# Monitor execution logs
tail -f logs/schedule.log

# Check recent videos
ls -lth media/videos/ | head -5

# View last upload metadata
cat logs/upload_*.json | tail -1 | jq .
```

## 🎬 What Gets Generated

Each execution:
- ✅ **Script** - 25-35 seconds of Hinglish tech story
- ✅ **Video** - 1080x1920 vertical (9:16 aspect ratio)
- ✅ **Audio** - ElevenLabs TTS voice synthesis
- ✅ **Metadata** - YouTube-ready description + tags
- ✅ **Logs** - Execution record for tracking

## 🚨 Troubleshooting

### "Cannot find module 'dotenv'"
```bash
npm install
```

### "YouTube API error"
- Check `.env.local` has correct credentials
- Verify API key has YouTube Data API v3 enabled
- Check refresh token is valid

### "ElevenLabs API error"
- Confirm API key in `.env.local`
- Verify voice ID exists
- Check API quota (free tier limited)

### Videos not uploading
- First time setup: videos are queued as "private"
- Check `logs/upload_*.json` for details
- Verify YouTube channel ID is correct

## 📚 Learn More

- Read **[README.md](./README.md)** for full documentation
- See **[SAMPLE_OUTPUT.md](./SAMPLE_OUTPUT.md)** for example output
- Check **[API Reference](./README.md#-api-reference)** for code usage

## 💡 Tips & Tricks

### Change Upload Time

Edit `config/config.js`:
```javascript
scheduler: {
  times: ['08:00', '13:00', '18:00'], // Change these
  timezone: 'Asia/Kolkata',
},
```

### Use Different Voice

Edit `.env.local`:
```env
ELEVENLABS_VOICE_ID=21m00Tcm4TlvDq8ikWAM  # Rachel voice
```

### Add Custom Scripts

Edit `src/scriptGenerator.js`:
```javascript
const scriptTemplates = {
  'your-theme': [
    {
      title: 'Your Title',
      script: 'Your Hinglish script...'
    }
  ]
};
```

### Make Videos Public

Edit `.env.local`:
```env
PRIVACY_STATUS=public
AUTO_PUBLISH=true
```

## ✅ Success Checklist

- [ ] .env.local created with all credentials
- [ ] `npm install` completed
- [ ] `npm run once` generated a video
- [ ] Video file created in `media/videos/`
- [ ] Execution logged in `logs/`
- [ ] Ready to deploy!

## 🎉 You're Done!

Your YouTube automation system is now:
- ✅ Generating scripts in Hinglish
- ✅ Creating videos daily
- ✅ Uploading to YouTube automatically
- ✅ Running 3x per day (08:00, 13:00, 18:00 IST)

Just start the daemon and watch your channel grow! 🚀

---

**Questions? Check the full README.md for detailed documentation.**
