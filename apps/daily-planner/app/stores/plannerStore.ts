import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  completedAt?: string;
  priority: 'high' | 'medium' | 'low';
}

interface PlannerState {
  tasks: Task[];
  darkMode: boolean;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  deleteTask: (id: string) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  toggleTask: (id: string) => void;
  toggleDarkMode: () => void;
  loadTasks: () => Promise<void>;
  saveTasks: () => Promise<void>;
  getTodaysTasks: () => Task[];
  getCompletionPercentage: () => number;
  getWeeklyStats: () => { completed: number; total: number };
  getMonthlyStats: () => { completed: number; total: number };
}

export const usePlannerStore = create<PlannerState>((set, get) => ({
  tasks: [],
  darkMode: true,

  addTask: (task) =>
    set((state) => {
      const newTask: Task = {
        ...task,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      const updated = [...state.tasks, newTask];
      get().saveTasks();
      return { tasks: updated };
    }),

  deleteTask: (id) =>
    set((state) => {
      const updated = state.tasks.filter((t) => t.id !== id);
      get().saveTasks();
      return { tasks: updated };
    }),

  updateTask: (id, updates) =>
    set((state) => {
      const updated = state.tasks.map((t) =>
        t.id === id ? { ...t, ...updates } : t
      );
      get().saveTasks();
      return { tasks: updated };
    }),

  toggleTask: (id) =>
    set((state) => {
      const updated = state.tasks.map((t) =>
        t.id === id
          ? {
              ...t,
              completed: !t.completed,
              completedAt: !t.completed ? new Date().toISOString() : undefined,
            }
          : t
      );
      get().saveTasks();
      return { tasks: updated };
    }),

  toggleDarkMode: () =>
    set((state) => {
      const newMode = !state.darkMode;
      AsyncStorage.setItem('darkMode', JSON.stringify(newMode));
      return { darkMode: newMode };
    }),

  loadTasks: async () => {
    try {
      const stored = await AsyncStorage.getItem('tasks');
      const darkMode = await AsyncStorage.getItem('darkMode');
      if (stored) {
        set({ tasks: JSON.parse(stored) });
      }
      if (darkMode) {
        set({ darkMode: JSON.parse(darkMode) });
      }
    } catch (error) {
      console.error('Failed to load tasks:', error);
    }
  },

  saveTasks: async () => {
    try {
      const { tasks } = get();
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Failed to save tasks:', error);
    }
  },

  getTodaysTasks: () => {
    const today = new Date().toDateString();
    return get().tasks.filter(
      (t) => new Date(t.createdAt).toDateString() === today
    );
  },

  getCompletionPercentage: () => {
    const todaysTasks = get().getTodaysTasks();
    if (todaysTasks.length === 0) return 0;
    const completed = todaysTasks.filter((t) => t.completed).length;
    return Math.round((completed / todaysTasks.length) * 100);
  },

  getWeeklyStats: () => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const weekTasks = get().tasks.filter(
      (t) => new Date(t.createdAt) >= weekAgo && new Date(t.createdAt) <= now
    );
    return {
      completed: weekTasks.filter((t) => t.completed).length,
      total: weekTasks.length,
    };
  },

  getMonthlyStats: () => {
    const now = new Date();
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const monthTasks = get().tasks.filter(
      (t) => new Date(t.createdAt) >= monthAgo && new Date(t.createdAt) <= now
    );
    return {
      completed: monthTasks.filter((t) => t.completed).length,
      total: monthTasks.length,
    };
  },
}));
