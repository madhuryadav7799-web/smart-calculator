import axios from 'axios';

const API_BASE = 'http://localhost:3000/api';

interface SystemStatus {
  cpu: number;
  memory: number;
  agents: {
    youtube: boolean;
    jarvis: boolean;
    browser: boolean;
  };
  timestamp: number;
}

interface Log {
  id: string;
  level: 'info' | 'warn' | 'error';
  message: string;
  timestamp: number;
}

export const apiService = {
  async getSystemStatus(): Promise<SystemStatus> {
    try {
      const response = await axios.get(`${API_BASE}/status`, {
        timeout: 5000,
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch system status:', error);
      return {
        cpu: 0,
        memory: 0,
        agents: { youtube: false, jarvis: false, browser: false },
        timestamp: Date.now(),
      };
    }
  },

  async startAgent(agentName: 'youtube' | 'jarvis' | 'browser'): Promise<boolean> {
    try {
      await axios.post(`${API_BASE}/agents/${agentName}/start`, {}, {
        timeout: 5000,
      });
      return true;
    } catch (error) {
      console.error(`Failed to start ${agentName}:`, error);
      return false;
    }
  },

  async stopAgent(agentName: 'youtube' | 'jarvis' | 'browser'): Promise<boolean> {
    try {
      await axios.post(`${API_BASE}/agents/${agentName}/stop`, {}, {
        timeout: 5000,
      });
      return true;
    } catch (error) {
      console.error(`Failed to stop ${agentName}:`, error);
      return false;
    }
  },

  async getLogs(limit: number = 50): Promise<Log[]> {
    try {
      const response = await axios.get(`${API_BASE}/logs`, {
        params: { limit },
        timeout: 5000,
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch logs:', error);
      return [];
    }
  },
};
