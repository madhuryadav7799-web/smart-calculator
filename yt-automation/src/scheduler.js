/**
 * Scheduler - Manages 3x daily video generation and upload
 * Times: 08:00, 13:00, 18:00 IST
 */

const fs = require('fs');
const path = require('path');
const config = require('../config/config');

/**
 * Parse cron-like time schedule
 */
const parseSchedule = (timeStr) => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return { hours, minutes };
};

/**
 * Get next scheduled time
 */
const getNextScheduledTime = () => {
  const scheduleTimes = config.scheduler.times.map(parseSchedule);
  const now = new Date();

  // Find next scheduled time
  for (const schedule of scheduleTimes) {
    const nextTime = new Date();
    nextTime.setHours(schedule.hours, schedule.minutes, 0, 0);

    if (nextTime > now) {
      return nextTime;
    }
  }

  // If no time found today, use first time tomorrow
  const nextTime = new Date();
  nextTime.setDate(nextTime.getDate() + 1);
  const [first] = scheduleTimes;
  nextTime.setHours(first.hours, first.minutes, 0, 0);
  return nextTime;
};

/**
 * Check if current time matches any scheduled time (within buffer)
 */
const isScheduledTime = (bufferMinutes = 5) => {
  const now = new Date();
  const scheduleTimes = config.scheduler.times.map(parseSchedule);

  for (const schedule of scheduleTimes) {
    const scheduledTime = new Date();
    scheduledTime.setHours(schedule.hours, schedule.minutes, 0, 0);

    const timeDiff = Math.abs(now - scheduledTime) / (1000 * 60); // in minutes

    if (timeDiff <= bufferMinutes) {
      return {
        isScheduled: true,
        scheduledTime,
        timeDiff,
      };
    }
  }

  return { isScheduled: false };
};

/**
 * Calculate time until next execution
 */
const getTimeUntilNext = () => {
  const nextTime = getNextScheduledTime();
  const now = new Date();
  const diff = nextTime - now;

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return {
    nextTime,
    remaining: {
      hours,
      minutes,
      seconds,
    },
    totalMs: diff,
  };
};

/**
 * Format time for display
 */
const formatTime = (date) => {
  return date.toLocaleString('en-IN', {
    timeZone: config.scheduler.timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
};

/**
 * Log scheduled execution
 */
const logExecution = (execution) => {
  const logFile = path.join(config.paths.logs, 'schedule.log');

  const logEntry = {
    timestamp: new Date().toISOString(),
    displayTime: formatTime(new Date()),
    ...execution,
  };

  const logContent = fs.existsSync(logFile)
    ? fs.readFileSync(logFile, 'utf-8')
    : '';

  fs.writeFileSync(
    logFile,
    logContent + JSON.stringify(logEntry) + '\n'
  );

  console.log(`📋 Execution logged: ${logEntry.displayTime}`);
};

/**
 * Create scheduler task
 */
const createSchedulerTask = (onScheduledTime) => {
  console.log('⏰ Scheduler initialized');
  console.log(`   Times: ${config.scheduler.times.join(', ')}`);
  console.log(`   Timezone: ${config.scheduler.timezone}\n`);

  let lastExecutionTime = null;

  const task = setInterval(() => {
    const now = new Date();
    const { isScheduled, scheduledTime } = isScheduledTime(5); // 5-minute buffer

    if (isScheduled) {
      const executionId = `exec_${scheduledTime.getTime()}`;

      // Prevent duplicate executions within the same scheduled time
      if (
        lastExecutionTime &&
        lastExecutionTime.getTime() === scheduledTime.getTime()
      ) {
        return;
      }

      lastExecutionTime = scheduledTime;

      console.log(`\n🎬 SCHEDULED TIME REACHED: ${formatTime(scheduledTime)}`);
      console.log(`   Execution ID: ${executionId}`);

      logExecution({
        type: 'scheduled-execution',
        executionId,
        status: 'started',
      });

      // Call the provided callback
      onScheduledTime({
        executionId,
        scheduledTime,
        displayTime: formatTime(scheduledTime),
      });

      logExecution({
        type: 'scheduled-execution',
        executionId,
        status: 'completed',
      });
    }
  }, 60000); // Check every minute

  // Show next scheduled time on startup
  const { nextTime, remaining } = getTimeUntilNext();
  console.log(`📅 Next scheduled execution: ${formatTime(nextTime)}`);
  console.log(
    `   Countdown: ${remaining.hours}h ${remaining.minutes}m ${remaining.seconds}s\n`
  );

  return task;
};

/**
 * Get schedule information
 */
const getScheduleInfo = () => {
  const { nextTime, remaining } = getTimeUntilNext();

  return {
    now: formatTime(new Date()),
    scheduledTimes: config.scheduler.times,
    nextExecution: formatTime(nextTime),
    timeRemaining: `${remaining.hours}h ${remaining.minutes}m ${remaining.seconds}s`,
    timezone: config.scheduler.timezone,
    totalSchedules: config.scheduler.times.length,
  };
};

/**
 * List all scheduled times for today
 */
const getTodaySchedule = () => {
  const now = new Date();
  const today = now.toLocaleDateString();

  const schedule = config.scheduler.times.map(timeStr => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const scheduledTime = new Date();
    scheduledTime.setHours(hours, minutes, 0, 0);

    return {
      time: timeStr,
      status: scheduledTime > now ? 'upcoming' : 'completed',
      formatted: formatTime(scheduledTime),
    };
  });

  return {
    date: today,
    timezone: config.scheduler.timezone,
    schedule,
  };
};

module.exports = {
  createSchedulerTask,
  getScheduleInfo,
  getTodaySchedule,
  getNextScheduledTime,
  isScheduledTime,
  getTimeUntilNext,
  formatTime,
  logExecution,
};
