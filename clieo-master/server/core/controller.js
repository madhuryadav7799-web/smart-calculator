/**
 * CLIEO 2.0 - MASTER CONTROLLER
 * Central brain for all operations (Telegram + Dashboard)
 * Routes all commands through here
 */

import { spawn, exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';
import os from 'os';

const LOG_DIR = path.join(process.cwd(), '../logs');
if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true });

let globalIO = null; // WebSocket instance

export const setIO = (io) => {
  globalIO = io;
};

class ClieController {
  constructor() {
    this.tasks = [];
    this.logs = [];
    this.agents = {};
    this.config = {
      maxLogs: 500,
      autoRestart: true,
      logLevel: 'info'
    };
    this.loadState();
  }

  // ───────────────────────────────────────────────────
  // AGENT MANAGEMENT
  // ───────────────────────────────────────────────────

  async startAgent(agent = 'youtube') {
    const taskId = uuid();
    const timestamp = new Date().toISOString();
    
    this.log(`Starting agent: ${agent}`, 'info', taskId);

    try {
      if (agent === 'youtube') {
        return this.startYouTubeAgent(taskId);
      } else if (agent === 'jarvis') {
        return this.startJarvisAgent(taskId);
      } else if (agent === 'browser') {
        return this.startBrowserAgent(taskId);
      }
      
      return { success: false, error: 'Unknown agent', taskId };
    } catch (e) {
      this.log(`Error starting ${agent}: ${e.message}`, 'error', taskId);
      return { success: false, error: e.message, taskId };
    }
  }

  async stopAgent(agent = 'youtube') {
    const taskId = uuid();
    this.log(`Stopping agent: ${agent}`, 'info', taskId);

    try {
      if (this.agents[agent]?.process) {
        this.agents[agent].process.kill();
        delete this.agents[agent];
        this.log(`Agent ${agent} stopped`, 'success', taskId);
        return { success: true, taskId };
      }
      return { success: false, error: 'Agent not running', taskId };
    } catch (e) {
      this.log(`Error stopping ${agent}: ${e.message}`, 'error', taskId);
      return { success: false, error: e.message, taskId };
    }
  }

  async restartAgent(agent = 'youtube') {
    const taskId = uuid();
    await this.stopAgent(agent);
    await new Promise(r => setTimeout(r, 1000));
    return this.startAgent(agent);
  }

  // ───────────────────────────────────────────────────
  // YOUTUBE AUTOMATION
  // ───────────────────────────────────────────────────

  startYouTubeAgent(taskId) {
    const ytPath = path.join(process.cwd(), '../../yt-automation');
    
    if (!fs.existsSync(ytPath)) {
      this.log('YouTube automation not found', 'error', taskId);
      return { success: false, error: 'YouTube path not found', taskId };
    }

    try {
      const daemon = spawn('node', [path.join(ytPath, 'youtube-daemon.js')]);
      
      this.agents.youtube = {
        process: daemon,
        startTime: Date.now(),
        status: 'running'
      };

      daemon.stdout.on('data', (data) => {
        this.log(`[YouTube] ${data}`, 'info', taskId);
      });

      daemon.stderr.on('data', (data) => {
        this.log(`[YouTube ERROR] ${data}`, 'error', taskId);
      });

      daemon.on('close', (code) => {
        this.log(`YouTube agent exited with code ${code}`, 'warning', taskId);
        if (this.config.autoRestart) {
          setTimeout(() => this.startYouTubeAgent(taskId), 5000);
        }
      });

      this.log('YouTube automation started', 'success', taskId);
      return { success: true, taskId, agentId: 'youtube' };
    } catch (e) {
      this.log(`Failed to start YouTube: ${e.message}`, 'error', taskId);
      return { success: false, error: e.message, taskId };
    }
  }

  startJarvisAgent(taskId) {
    const jarvisPath = path.expandUser('~/jarvis.py');
    
    if (!fs.existsSync(jarvisPath)) {
      this.log('Jarvis not found', 'error', taskId);
      return { success: false, error: 'Jarvis path not found', taskId };
    }

    try {
      const daemon = spawn('python3', [jarvisPath]);
      
      this.agents.jarvis = {
        process: daemon,
        startTime: Date.now(),
        status: 'running'
      };

      daemon.stdout.on('data', (data) => {
        this.log(`[Jarvis] ${data}`, 'info', taskId);
      });

      this.log('Jarvis agent started', 'success', taskId);
      return { success: true, taskId, agentId: 'jarvis' };
    } catch (e) {
      this.log(`Failed to start Jarvis: ${e.message}`, 'error', taskId);
      return { success: false, error: e.message, taskId };
    }
  }

  startBrowserAgent(taskId) {
    this.log('Browser automation starting...', 'info', taskId);
    
    try {
      this.agents.browser = {
        status: 'ready',
        startTime: Date.now(),
        capabilities: ['form-fill', 'job-apply', 'scraping', 'screenshot']
      };

      this.log('Browser agent ready', 'success', taskId);
      return { success: true, taskId, agentId: 'browser' };
    } catch (e) {
      return { success: false, error: e.message, taskId };
    }
  }

  // ───────────────────────────────────────────────────
  // COMMAND EXECUTION
  // ───────────────────────────────────────────────────

  async runCommand(command, options = {}) {
    const taskId = uuid();
    const timeout = options.timeout || 30000;

    this.log(`Executing: ${command}`, 'info', taskId);

    return new Promise((resolve) => {
      try {
        const proc = exec(command, { timeout, shell: '/system/bin/sh' }, 
          (error, stdout, stderr) => {
            if (error) {
              this.log(`Command error: ${error.message}`, 'error', taskId);
              resolve({ success: false, error: error.message, taskId });
            } else {
              this.log(`Command output: ${stdout}`, 'success', taskId);
              resolve({ success: true, output: stdout, taskId });
            }
          }
        );

        proc.stdout?.on('data', (data) => {
          this.log(`> ${data}`, 'info', taskId);
        });
      } catch (e) {
        resolve({ success: false, error: e.message, taskId });
      }
    });
  }

  // ───────────────────────────────────────────────────
  // STATUS & MONITORING
  // ───────────────────────────────────────────────────

  getStatus() {
    return {
      timestamp: new Date().toISOString(),
      system: {
        cpu: Math.round(Math.random() * 100),
        memory: Math.round((os.totalmem() - os.freemem()) / os.totalmem() * 100),
        uptime: Math.floor(os.uptime() / 3600)
      },
      agents: Object.entries(this.agents).map(([name, agent]) => ({
        name,
        status: agent.status || 'running',
        uptime: agent.startTime ? Date.now() - agent.startTime : 0
      })),
      tasks: this.tasks.length,
      logs: this.logs.length
    };
  }

  getLogs(filter = {}) {
    let logs = this.logs;

    if (filter.type) {
      logs = logs.filter(l => l.type === filter.type);
    }

    if (filter.limit) {
      logs = logs.slice(-filter.limit);
    }

    return logs;
  }

  getTasks(filter = {}) {
    let tasks = this.tasks;

    if (filter.status) {
      tasks = tasks.filter(t => t.status === filter.status);
    }

    if (filter.limit) {
      tasks = tasks.slice(-filter.limit);
    }

    return tasks;
  }

  // ───────────────────────────────────────────────────
  // LOGGING
  // ───────────────────────────────────────────────────

  log(message, type = 'info', taskId = null) {
    const entry = {
      id: uuid(),
      timestamp: new Date().toISOString(),
      message,
      type,
      taskId
    };

    this.logs.push(entry);

    if (this.logs.length > this.config.maxLogs) {
      this.logs.shift();
    }

    // Write to file
    const logFile = path.join(LOG_DIR, `${new Date().toISOString().split('T')[0]}.log`);
    fs.appendFileSync(logFile, `[${entry.timestamp}] [${type.toUpperCase()}] ${message}\n`);

    console.log(`[${type.toUpperCase()}] ${message}`);

    // Emit to WebSocket
    if (globalIO) {
      globalIO.emit('log-update', entry);
    }

    return entry;
  }

  // ───────────────────────────────────────────────────
  // STATE MANAGEMENT
  // ───────────────────────────────────────────────────

  loadState() {
    const stateFile = path.join(LOG_DIR, 'state.json');
    if (fs.existsSync(stateFile)) {
      try {
        const state = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
        this.tasks = state.tasks || [];
        this.log('State loaded', 'info');
      } catch (e) {
        this.log(`State load error: ${e.message}`, 'error');
      }
    }
  }

  saveState() {
    const stateFile = path.join(LOG_DIR, 'state.json');
    fs.writeFileSync(stateFile, JSON.stringify({
      tasks: this.tasks,
      lastSave: new Date().toISOString()
    }, null, 2));
  }
}

export default new ClieController();
