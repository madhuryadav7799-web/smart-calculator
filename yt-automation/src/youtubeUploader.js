/**
 * YouTube Uploader - Handles video upload and scheduling
 * Uses YouTube Data API v3
 */

const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');
const config = require('../config/config');

// YouTube API client
let youtubeClient = null;

/**
 * Initialize YouTube API client
 */
const initializeYouTubeClient = async () => {
  try {
    const oauth2Client = new google.auth.OAuth2(
      config.youtube.clientId,
      config.youtube.clientSecret,
      'http://localhost:3000/oauth2callback' // Redirect URI
    );

    // Set credentials from refresh token
    if (config.youtube.refreshToken) {
      oauth2Client.setCredentials({
        refresh_token: config.youtube.refreshToken,
      });
    }

    youtubeClient = google.youtube({
      version: 'v3',
      auth: oauth2Client,
    });

    console.log('✅ YouTube API client initialized');
    return youtubeClient;
  } catch (error) {
    console.error('❌ YouTube initialization error:', error.message);
    throw error;
  }
};

/**
 * Upload video to YouTube
 */
const uploadVideo = async (videoPackage) => {
  console.log(`\n📤 Starting YouTube upload: ${videoPackage.script.title}`);

  try {
    if (!youtubeClient) {
      await initializeYouTubeClient();
    }

    const videoFile = videoPackage.video.file;
    if (!fs.existsSync(videoFile)) {
      throw new Error(`Video file not found: ${videoFile}`);
    }

    // Prepare metadata
    const requestBody = {
      snippet: {
        title: `[Tech Story 🚀] ${videoPackage.script.title}`,
        description: generateDescription(videoPackage),
        tags: generateTags(videoPackage),
        categoryId: '28', // Science & Technology
        defaultLanguage: 'en',
      },
      status: {
        privacyStatus: config.upload.privacy,
        publishAt: config.upload.autoPublish
          ? new Date().toISOString()
          : undefined,
      },
      processingDetails: {
        processingStatus: 'processing',
      },
    };

    // Prepare file upload
    const fileSize = fs.statSync(videoFile).size;

    console.log(`📄 Video details:`);
    console.log(`   Title: ${requestBody.snippet.title}`);
    console.log(`   Size: ${(fileSize / (1024 * 1024)).toFixed(2)} MB`);
    console.log(`   Privacy: ${requestBody.status.privacyStatus}`);

    // In production, this would use:
    // const response = await youtubeClient.videos.insert(
    //   {
    //     part: 'snippet,status,processingDetails',
    //     requestBody,
    //   },
    //   {
    //     onUploadProgress: (evt) => {
    //       console.log(`📊 Upload progress: ${Math.round((evt.bytesRead / fileSize) * 100)}%`);
    //     },
    //   }
    // );

    // For demo, save upload metadata
    const uploadLog = {
      id: `yt_${Date.now()}`,
      status: 'upload-queued',
      metadata: requestBody,
      videoPackage,
      scheduledFor: new Date().toISOString(),
      note: 'In production, this would be uploaded to YouTube API',
    };

    const logFile = path.join(config.paths.logs, `upload_${Date.now()}.json`);
    fs.writeFileSync(logFile, JSON.stringify(uploadLog, null, 2));

    console.log(`✅ Upload metadata saved: ${logFile}`);
    console.log(`   Video ID (demo): ${uploadLog.id}`);

    return {
      success: true,
      videoId: uploadLog.id,
      metadata: uploadLog,
    };
  } catch (error) {
    console.error('❌ Upload error:', error.message);
    throw error;
  }
};

/**
 * Generate video description
 */
const generateDescription = (videoPackage) => {
  const theme = videoPackage.script.theme;
  const baseDescription = `🚀 ${videoPackage.script.title}

Hey tech enthusiasts! Welcome to our daily tech story series in Hinglish.

Today's topic: ${theme}

📖 What's Inside:
- Engaging tech insights
- Real-world applications
- Hinglish storytelling (Hindi + English)
- Perfect for Indian tech community

🎯 Upload Schedule: 3x Daily
⏰ Times: 08:00 AM, 01:00 PM, 06:00 PM IST

---

💡 #TechStory #Hinglish #TechNews #AI #Innovation #StartupWisdom #CodingTricks

Subscribe for daily tech stories and insights!`;

  return baseDescription;
};

/**
 * Generate tags based on theme
 */
const generateTags = (videoPackage) => {
  const baseTags = [
    'tech',
    'hinglish',
    'innovation',
    'technology',
    'coding',
    'startup',
  ];

  const themeTags = {
    'tech-innovation': ['AI', 'quantum', 'future'],
    'startup-wisdom': ['startup', 'entrepreneurship', 'business'],
    'coding-tricks': ['javascript', 'programming', 'developer'],
    'ai-insights': ['AI', 'machine-learning', 'LLM'],
    'quantum-computing': ['quantum', 'computing', 'physics'],
  };

  const tags = [
    ...baseTags,
    ...(themeTags[videoPackage.script.theme] || []),
    'shorts',
    'hindi',
    'english',
  ];

  return [...new Set(tags)]; // Remove duplicates
};

/**
 * Schedule video for upload
 */
const scheduleUpload = (videoPackage, uploadTime) => {
  console.log(`⏰ Scheduling upload for: ${uploadTime}`);

  const schedule = {
    videoPackage,
    scheduledTime: uploadTime,
    status: 'scheduled',
    createdAt: new Date().toISOString(),
  };

  const scheduleFile = path.join(
    config.paths.logs,
    `schedule_${Date.now()}.json`
  );
  fs.writeFileSync(scheduleFile, JSON.stringify(schedule, null, 2));

  console.log(`✅ Schedule saved: ${scheduleFile}`);
  return schedule;
};

/**
 * Get upload status
 */
const getUploadStatus = (videoId) => {
  try {
    // In production, query YouTube API
    // For demo, check logs
    const logDir = config.paths.logs;
    const files = fs.readdirSync(logDir);
    const uploadFile = files.find(f => f.includes(videoId));

    if (uploadFile) {
      const content = fs.readFileSync(path.join(logDir, uploadFile), 'utf-8');
      return JSON.parse(content);
    }

    return { status: 'not-found' };
  } catch (error) {
    console.error('❌ Status check error:', error.message);
    return { status: 'error', message: error.message };
  }
};

module.exports = {
  initializeYouTubeClient,
  uploadVideo,
  scheduleUpload,
  getUploadStatus,
  generateDescription,
  generateTags,
};
