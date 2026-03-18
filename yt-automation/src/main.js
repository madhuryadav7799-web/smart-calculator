/**
 * YouTube Automation System - Main Orchestrator
 * Coordinates script generation, video creation, and uploads
 */

const fs = require('fs');
const path = require('path');
const config = require('../config/config');
const scriptGenerator = require('./scriptGenerator');
const videoGenerator = require('./videoGenerator');
const youtubeUploader = require('./youtubeUploader');
const scheduler = require('./scheduler');

/**
 * Main automation workflow
 */
const runAutomation = async (executionId, options = {}) => {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🚀 YouTube Automation System - Execution ${executionId}`);
  console.log(`${'='.repeat(60)}`);
  console.log(`Started at: ${new Date().toISOString()}`);
  console.log(`Timezone: ${config.scheduler.timezone}\n`);

  try {
    // Step 1: Generate Script
    console.log('📝 Step 1: Generating Hinglish Script');
    console.log('-'.repeat(60));
    const script = scriptGenerator.generateScript();
    console.log(`✅ Script Generated!`);
    console.log(`   Title: ${script.title}`);
    console.log(`   Theme: ${script.theme}`);
    console.log(`   Duration: ${script.estimatedDuration.toFixed(1)}s`);
    console.log(`   Language: ${script.language}\n`);

    // Save script
    const scriptPath = scriptGenerator.saveScript(script);

    // Step 2: Generate Video
    console.log('\n🎬 Step 2: Creating Pixar-Style Video');
    console.log('-'.repeat(60));
    const videoResult = await videoGenerator.generateVideo(script);
    console.log();

    // Load the generated package
    const packagePath = videoResult.packagePath;
    const videoPackage = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));

    // Step 3: Upload to YouTube
    console.log('\n📤 Step 3: Uploading to YouTube');
    console.log('-'.repeat(60));
    const uploadResult = await youtubeUploader.uploadVideo(videoPackage);
    console.log();

    // Step 4: Create Upload Record
    console.log('\n📊 Step 4: Recording Execution');
    console.log('-'.repeat(60));
    const executionRecord = {
      executionId,
      timestamp: new Date().toISOString(),
      status: 'completed',
      script: {
        title: script.title,
        theme: script.theme,
        path: scriptPath,
      },
      video: {
        packagePath,
        id: uploadResult.videoId,
      },
      upload: {
        status: uploadResult.success ? 'queued' : 'failed',
        videoId: uploadResult.videoId,
      },
      summary: `Generated "${script.title}" and queued for upload.`,
    };

    const executionFile = path.join(
      config.paths.logs,
      `execution_${executionId}.json`
    );
    fs.writeFileSync(executionFile, JSON.stringify(executionRecord, null, 2));

    console.log(`✅ Execution Record Saved!`);
    console.log(`   File: ${executionFile}\n`);

    // Step 5: Display Summary
    console.log('\n📋 EXECUTION SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Status: ${executionRecord.status.toUpperCase()}`);
    console.log(`📝 Script: ${script.title}`);
    console.log(`🎬 Video ID: ${uploadResult.videoId}`);
    console.log(`🌐 Upload Status: ${executionRecord.upload.status}`);
    console.log(`⏱️  Duration: ${script.estimatedDuration.toFixed(1)} seconds`);
    console.log(`${'='.repeat(60)}\n`);

    return {
      success: true,
      executionId,
      data: executionRecord,
    };
  } catch (error) {
    console.error('\n❌ AUTOMATION FAILED');
    console.error(`Error: ${error.message}`);
    console.error(`Stack: ${error.stack}\n`);

    // Log the error
    const errorRecord = {
      executionId,
      timestamp: new Date().toISOString(),
      status: 'failed',
      error: {
        message: error.message,
        stack: error.stack,
      },
    };

    const errorFile = path.join(config.paths.logs, `error_${executionId}.json`);
    fs.writeFileSync(errorFile, JSON.stringify(errorRecord, null, 2));

    return {
      success: false,
      executionId,
      error: error.message,
    };
  }
};

/**
 * Run in daemon mode with scheduler
 */
const runDaemon = () => {
  console.log('\n🌟 Starting YouTube Automation Daemon\n');
  console.log('📅 Schedule Information:');
  const scheduleInfo = scheduler.getScheduleInfo();
  console.log(`   Next execution: ${scheduleInfo.nextExecution}`);
  console.log(`   Time remaining: ${scheduleInfo.timeRemaining}`);
  console.log(`   Timezone: ${scheduleInfo.timezone}`);
  console.log(`   Total schedules per day: ${scheduleInfo.totalSchedules}\n`);

  // Show today's schedule
  const todaySchedule = scheduler.getTodaySchedule();
  console.log(`📋 Today's Schedule (${todaySchedule.date}):`);
  todaySchedule.schedule.forEach(item => {
    console.log(`   ${item.time} IST - ${item.status} (${item.formatted})`);
  });
  console.log();

  // Create scheduler task
  const task = scheduler.createSchedulerTask(async (execution) => {
    try {
      const executionId = execution.executionId;
      await runAutomation(executionId);
    } catch (error) {
      console.error(`❌ Scheduled execution failed: ${error.message}`);
    }
  });

  // Keep daemon running
  console.log('✅ Daemon started. Press Ctrl+C to stop.\n');

  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n\n👋 Shutting down daemon...');
    clearInterval(task);
    process.exit(0);
  });
};

/**
 * Display system status
 */
const showStatus = () => {
  console.log('\n📊 SYSTEM STATUS\n');

  // Config info
  console.log('⚙️  Configuration:');
  console.log(`   YouTube Channel: ${config.youtube.channelId || 'Not set'}`);
  console.log(`   ElevenLabs Voice: ${config.elevenlabs.voiceId}`);
  console.log(`   Video Format: ${config.video.width}x${config.video.height} (${config.video.fps} fps)`);
  console.log(`   Privacy Status: ${config.upload.privacy}\n`);

  // Schedule info
  const scheduleInfo = scheduler.getScheduleInfo();
  console.log('⏰ Schedule:');
  console.log(`   Times: ${scheduleInfo.scheduledTimes.join(', ')}`);
  console.log(`   Timezone: ${scheduleInfo.timezone}`);
  console.log(`   Next execution: ${scheduleInfo.nextExecution}`);
  console.log(`   Countdown: ${scheduleInfo.timeRemaining}\n`);

  // Directory info
  console.log('📁 Directories:');
  console.log(`   Root: ${config.paths.root}`);
  console.log(`   Videos: ${config.paths.videos}`);
  console.log(`   Logs: ${config.paths.logs}\n`);

  // Recent executions
  console.log('📜 Recent Executions:');
  const logDir = config.paths.logs;
  if (fs.existsSync(logDir)) {
    const files = fs.readdirSync(logDir)
      .filter(f => f.startsWith('execution_'))
      .sort()
      .reverse()
      .slice(0, 5);

    if (files.length > 0) {
      files.forEach(file => {
        const content = JSON.parse(
          fs.readFileSync(path.join(logDir, file), 'utf-8')
        );
        console.log(`   ✅ ${content.script.title}`);
      });
    } else {
      console.log('   (No executions yet)');
    }
  }
  console.log();
};

/**
 * CLI interface
 */
const cli = async (args) => {
  const command = args[0] || 'help';

  switch (command) {
    case 'once':
      // Run automation once
      const execId = `manual_${Date.now()}`;
      await runAutomation(execId);
      break;

    case 'daemon':
      // Run in daemon mode
      runDaemon();
      break;

    case 'status':
      // Show system status
      showStatus();
      break;

    case 'schedule':
      // Show schedule
      console.log('\n📅 SCHEDULE INFORMATION\n');
      const todaySchedule = scheduler.getTodaySchedule();
      console.log(`Date: ${todaySchedule.date}`);
      console.log(`Timezone: ${todaySchedule.timezone}\n`);
      todaySchedule.schedule.forEach(item => {
        console.log(`${item.time} IST - ${item.status}`);
        console.log(`  ${item.formatted}\n`);
      });
      break;

    case 'list-scripts':
      // List available scripts
      console.log('\n📝 AVAILABLE SCRIPTS\n');
      const scripts = scriptGenerator.getAllScripts();
      scripts.forEach((script, idx) => {
        console.log(`${idx + 1}. ${script.title}`);
        console.log(`   Theme: ${script.theme}\n`);
      });
      break;

    case 'animate':
      // Show animation examples
      videoGenerator.createAnimationShowcase();
      break;

    default:
      console.log(`
YouTube Automation System

Usage:
  node main.js <command>

Commands:
  once              - Run automation once and exit
  daemon            - Run continuous daemon (3x daily)
  status            - Show system status
  schedule          - Show today's schedule
  list-scripts      - List available scripts
  animate           - Show animation styles
  help              - Show this message

Examples:
  node main.js once          # Generate one video now
  node main.js daemon        # Start continuous automation
  node main.js status        # Check system status
      `);
  }
};

// Export for use as library
module.exports = {
  runAutomation,
  runDaemon,
  showStatus,
  cli,
};

// Run CLI if called directly
if (require.main === module) {
  cli(process.argv.slice(2));
}
