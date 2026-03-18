/**
 * CLIEO 2.0 MASTER - MAIN SERVER
 * Brain of the system - routes Telegram + Dashboard to controller
 */

import express from 'express';
import { Server as SocketIOServer } from 'socket.io';
import http from 'http';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRoutes from './routes/api.js';
import { loginRoute } from './middleware/auth.js';
import controller, { setIO } from './core/controller.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

// Middleware
app.use(cors());
app.use(express.json());

// ───────────────────────────────────────────────────
// AUTHENTICATION
// ───────────────────────────────────────────────────

app.post('/api/auth/login', loginRoute);

// ───────────────────────────────────────────────────
// API ROUTES
// ───────────────────────────────────────────────────

app.use('/api', apiRoutes);

// ───────────────────────────────────────────────────
// DASHBOARD UI
// ───────────────────────────────────────────────────

const dashboard = `
<!DOCTYPE html>
<html>
<head>
  <title>Clieo 2.0 Master Dashboard</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system; background: #0f172a; color: #e2e8f0; line-height: 1.6; }
    .container { max-width: 1400px; margin: 0 auto; padding: 20px; }
    .header { border-bottom: 2px solid #334155; padding: 20px 0; margin-bottom: 30px; }
    h1 { color: #3b82f6; margin: 10px 0; }
    .subtext { color: #94a3b8; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin: 20px 0; }
    .card { background: #1e293b; border: 1px solid #334155; border-radius: 8px; padding: 20px; }
    .card h3 { color: #60a5fa; margin-bottom: 15px; display: flex; align-items: center; gap: 8px; }
    .card p { color: #cbd5e1; margin: 8px 0; }
    .btn { background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; margin: 5px; }
    .btn:hover { background: #2563eb; }
    .btn-danger { background: #ef4444; }
    .btn-danger:hover { background: #dc2626; }
    .status-active { color: #10b981; font-weight: bold; }
    .status-inactive { color: #ef4444; font-weight: bold; }
    .input-group { margin: 10px 0; }
    input { width: 100%; padding: 8px; background: #0f172a; border: 1px solid #334155; color: #e2e8f0; border-radius: 4px; }
    .logs { background: #0f172a; border: 1px solid #334155; border-radius: 4px; padding: 15px; max-height: 300px; overflow-y: auto; font-family: monospace; font-size: 0.9em; margin: 10px 0; }
    .log-line { padding: 4px 0; }
    .log-info { color: #60a5fa; }
    .log-error { color: #ef4444; }
    .log-success { color: #10b981; }
    .login { max-width: 400px; margin: 100px auto; background: #1e293b; border: 1px solid #334155; border-radius: 8px; padding: 40px; text-align: center; }
    .login h2 { color: #3b82f6; margin-bottom: 20px; }
    .login input { margin-bottom: 10px; }
    .feature-list { list-style: none; padding-left: 0; }
    .feature-list li { padding: 8px 0; color: #cbd5e1; }
    .feature-list li:before { content: "✓ "; color: #10b981; margin-right: 8px; }
  </style>
  <script src="https://cdn.socket.io/4.5.4/socket.io.min.js"></script>
</head>
<body>
  <div id="loginDiv" class="login">
    <h2>🤖 Clieo 2.0 Master</h2>
    <p style="color: #94a3b8; margin-bottom: 20px;">Complete AI Control System</p>
    <div class="input-group">
      <input id="username" placeholder="Username" value="admin">
    </div>
    <div class="input-group">
      <input id="password" type="password" placeholder="Password" value="admin123">
    </div>
    <button class="btn" onclick="login()" style="width: 100%;">Login</button>
    <div id="error" style="color: #ef4444; margin-top: 10px;"></div>
  </div>

  <div id="dashDiv" style="display: none;">
    <div class="container">
      <div class="header">
        <h1>🤖 Clieo 2.0 Master Dashboard</h1>
        <p class="subtext">Complete AI System Control | Telegram + Web Interface Unified</p>
        <button class="btn" onclick="logout()" style="margin-top: 10px;">Logout</button>
      </div>

      <!-- STATUS CARDS -->
      <div class="grid">
        <div class="card">
          <h3>📊 System Status</h3>
          <p>CPU: <span id="cpu">--</span>%</p>
          <p>Memory: <span id="mem">--</span>%</p>
          <p>Uptime: <span id="uptime">--</span>h</p>
          <button class="btn" onclick="updateStatus()">Refresh</button>
        </div>
        <div class="card">
          <h3>▶️ Active Agents</h3>
          <p id="agentList">Loading...</p>
        </div>
        <div class="card">
          <h3>📋 Tasks</h3>
          <p id="taskCount">Loading...</p>
        </div>
      </div>

      <!-- AGENT CONTROL -->
      <div class="card">
        <h3>🎮 Agent Control</h3>
        <div class="grid">
          <div>
            <h4>YouTube Automation</h4>
            <button class="btn" onclick="startAgent('youtube')">▶ Start</button>
            <button class="btn btn-danger" onclick="stopAgent('youtube')">⏹ Stop</button>
          </div>
          <div>
            <h4>Jarvis AI</h4>
            <button class="btn" onclick="startAgent('jarvis')">▶ Start</button>
            <button class="btn btn-danger" onclick="stopAgent('jarvis')">⏹ Stop</button>
          </div>
          <div>
            <h4>Browser Automation</h4>
            <button class="btn" onclick="startAgent('browser')">▶ Start</button>
            <button class="btn btn-danger" onclick="stopAgent('browser')">⏹ Stop</button>
          </div>
        </div>
      </div>

      <!-- COMMAND EXECUTION -->
      <div class="card">
        <h3>⌨️ Execute Command</h3>
        <div class="input-group">
          <input id="commandInput" placeholder="Enter command...">
        </div>
        <button class="btn" onclick="executeCommand()">Execute</button>
        <div id="commandOutput" class="logs" style="display:none;"></div>
      </div>

      <!-- LOGS -->
      <div class="card">
        <h3>📝 System Logs</h3>
        <div id="logsPanel" class="logs">
          <div class="log-line log-info">[System] Initializing...</div>
        </div>
        <button class="btn" onclick="clearLogs()">Clear</button>
      </div>

      <!-- FEATURES -->
      <div class="card">
        <h3>✨ System Features</h3>
        <ul class="feature-list">
          <li>YouTube Automation (3x daily)</li>
          <li>Jarvis AI (self-improving agent)</li>
          <li>Browser Automation (job applications)</li>
          <li>Voice Transcribe (audio to text)</li>
          <li>Real-time Monitoring</li>
          <li>Command Execution</li>
          <li>Task Management</li>
          <li>Telegram Integration</li>
        </ul>
      </div>
    </div>
  </div>

  <script>
    let token = localStorage.getItem('token');
    let socket;
    let autoRefresh = null;

    if (token) showDash();

    function login() {
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      
      fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      .then(r => r.json())
      .then(data => {
        if (data.token) {
          token = data.token;
          localStorage.setItem('token', token);
          showDash();
        } else {
          document.getElementById('error').textContent = data.error || 'Login failed';
        }
      })
      .catch(e => document.getElementById('error').textContent = e.message);
    }

    function logout() {
      localStorage.removeItem('token');
      if (autoRefresh) clearInterval(autoRefresh);
      if (socket) socket.disconnect();
      location.reload();
    }

    function showDash() {
      document.getElementById('loginDiv').style.display = 'none';
      document.getElementById('dashDiv').style.display = 'block';
      
      // WebSocket real-time connection
      socket = io();
      
      // Real-time log updates
      socket.on('log-update', (log) => {
        addLog(log);
      });

      // Real-time status updates
      socket.on('status-update', (status) => {
        document.getElementById('cpu').textContent = status.system.cpu;
        document.getElementById('mem').textContent = status.system.memory;
        document.getElementById('uptime').textContent = status.system.uptime;
        document.getElementById('agentList').textContent = status.agents.length + ' agents';
        document.getElementById('taskCount').textContent = status.tasks + ' tasks';
      });

      // Command results
      socket.on('command-result', (result) => {
        const output = document.getElementById('commandOutput');
        output.style.display = 'block';
        output.innerHTML = '<div class="log-line log-success">' + (result.output || result.error || 'Executed') + '</div>';
      });

      // Logs panel initialization
      socket.emit('request-logs');

      // Auto-refresh status every 2 seconds
      autoRefresh = setInterval(() => {
        socket.emit('request-status');
      }, 2000);
    }

    function updateStatus() {
      fetch('/api/status', { headers: { 'Authorization': 'Bearer ' + token } })
        .then(r => r.json())
        .then(data => {
          document.getElementById('cpu').textContent = data.system.cpu;
          document.getElementById('mem').textContent = data.system.memory;
          document.getElementById('uptime').textContent = data.system.uptime;
          document.getElementById('agentList').textContent = data.agents.length + ' agents';
          document.getElementById('taskCount').textContent = data.tasks + ' tasks';
        });
    }

    function startAgent(agent) {
      fetch('/api/agent/start', {
        method: 'POST',
        headers: { 
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ agent })
      })
      .then(r => r.json())
      .then(data => {
        addLog({ message: data.success ? agent + ' started!' : agent + ' failed', type: data.success ? 'success' : 'error' });
      });
    }

    function stopAgent(agent) {
      fetch('/api/agent/stop', {
        method: 'POST',
        headers: { 
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ agent })
      })
      .then(r => r.json())
      .then(data => {
        addLog({ message: agent + ' stopped', type: 'success' });
      });
    }

    function executeCommand() {
      const command = document.getElementById('commandInput').value;
      if (!command) return;

      addLog({ message: 'Executing: ' + command, type: 'info' });

      // Use both API and WebSocket for command execution
      fetch('/api/command', {
        method: 'POST',
        headers: { 
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ command })
      })
      .then(r => r.json())
      .then(data => {
        const output = document.getElementById('commandOutput');
        output.style.display = 'block';
        output.innerHTML = '<div class="log-line ' + (data.success ? 'log-success' : 'log-error') + '">' + (data.output || data.error || 'No output') + '</div>';
        addLog({ message: 'Command ' + (data.success ? 'succeeded' : 'failed'), type: data.success ? 'success' : 'error' });
      })
      .catch(e => {
        addLog({ message: 'Error: ' + e.message, type: 'error' });
      });
    }

    function addLog(log) {
      const panel = document.getElementById('logsPanel');
      const line = document.createElement('div');
      line.className = 'log-line log-' + (log.type || 'info');
      line.textContent = '[' + (log.type || 'info').toUpperCase() + '] ' + (log.message || log);
      panel.appendChild(line);
      panel.scrollTop = panel.scrollHeight;
      
      if (panel.children.length > 100) {
        panel.removeChild(panel.firstChild);
      }
    }

    function clearLogs() {
      document.getElementById('logsPanel').innerHTML = '';
    }
  </script>
</body>
</html>
`;

app.get('/', (req, res) => res.send(dashboard));

// ───────────────────────────────────────────────────
// WEBSOCKET REAL-TIME UPDATES
// ───────────────────────────────────────────────────

// Pass IO to controller for real-time event emitting
setIO(io);

io.on('connection', (socket) => {
  console.log('✅ Dashboard connected:', socket.id);
  controller.log(`Dashboard client connected`, 'info');
  
  // Send initial logs
  socket.emit('logs-update', controller.getLogs({ limit: 50 }));
  
  // On demand log updates
  socket.on('request-logs', () => {
    socket.emit('logs-update', controller.getLogs({ limit: 50 }));
  });

  // Status updates every 2 seconds
  socket.on('request-status', () => {
    socket.emit('status-update', controller.getStatus());
  });

  // Receive command from dashboard
  socket.on('execute-command', async (command) => {
    const result = await controller.runCommand(command);
    socket.emit('command-result', result);
  });

  socket.on('disconnect', () => {
    console.log('❌ Dashboard disconnected:', socket.id);
    controller.log(`Dashboard client disconnected`, 'warning');
  });
});

// ───────────────────────────────────────────────────
// STARTUP
// ───────────────────────────────────────────────────

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log('\n╔════════════════════════════════════════╗');
  console.log('║  🤖 CLIEO 2.0 MASTER DASHBOARD       ║');
  console.log('╠════════════════════════════════════════╣');
  console.log(`║  🌐 Running on: http://localhost:${PORT} ║`);
  console.log('║  🔐 Login: admin / admin123          ║');
  console.log('║  ✨ All systems operational           ║');
  console.log('╚════════════════════════════════════════╝\n');
  
  controller.log('Clieo 2.0 Master started', 'success');
});

export { io, controller };
