/**
 * API ROUTES - All operations go through controller
 */

import express from 'express';
import controller from '../core/controller.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// ───────────────────────────────────────────────────
// AGENT CONTROL
// ───────────────────────────────────────────────────

router.post('/agent/start', authMiddleware, async (req, res) => {
  const { agent } = req.body;
  const result = await controller.startAgent(agent);
  res.json(result);
});

router.post('/agent/stop', authMiddleware, async (req, res) => {
  const { agent } = req.body;
  const result = await controller.stopAgent(agent);
  res.json(result);
});

router.post('/agent/restart', authMiddleware, async (req, res) => {
  const { agent } = req.body;
  const result = await controller.restartAgent(agent);
  res.json(result);
});

// ───────────────────────────────────────────────────
// STATUS & MONITORING
// ───────────────────────────────────────────────────

router.get('/status', authMiddleware, (req, res) => {
  res.json(controller.getStatus());
});

router.get('/logs', authMiddleware, (req, res) => {
  const limit = parseInt(req.query.limit) || 100;
  const type = req.query.type;
  res.json(controller.getLogs({ type, limit }));
});

router.get('/tasks', authMiddleware, (req, res) => {
  const limit = parseInt(req.query.limit) || 50;
  const status = req.query.status;
  res.json(controller.getTasks({ status, limit }));
});

// ───────────────────────────────────────────────────
// COMMAND EXECUTION
// ───────────────────────────────────────────────────

router.post('/command', authMiddleware, async (req, res) => {
  const { command, timeout } = req.body;
  
  if (!command) {
    return res.status(400).json({ error: 'Command required' });
  }

  const result = await controller.runCommand(command, { timeout });
  res.json(result);
});

// ───────────────────────────────────────────────────
// TASK MANAGEMENT
// ───────────────────────────────────────────────────

router.post('/task/create', authMiddleware, (req, res) => {
  const { name, command, schedule } = req.body;
  const task = {
    id: Date.now(),
    name,
    command,
    schedule,
    status: 'pending',
    created: new Date().toISOString()
  };
  controller.tasks.push(task);
  controller.saveState();
  res.json(task);
});

router.post('/task/run', authMiddleware, async (req, res) => {
  const { taskId } = req.body;
  const task = controller.tasks.find(t => t.id == taskId);
  
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  task.status = 'running';
  const result = await controller.runCommand(task.command);
  task.status = result.success ? 'completed' : 'failed';
  controller.saveState();
  
  res.json({ task, result });
});

export default router;
