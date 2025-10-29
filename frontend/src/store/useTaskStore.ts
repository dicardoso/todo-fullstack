import { create } from 'zustand';
import * as api from '../api/apiService';
import type { TaskResponse, TaskCreateUpdate } from '../types';

interface TaskStore {
  tasks: TaskResponse[];
  isLoading: boolean;
  error: string | null;

  fetchTasks: () => Promise<void>;
  addTask: (task: TaskCreateUpdate) => Promise<void>;
  removeTask: (id: number) => Promise<void>;
  toggleTaskStatus: (id: number, currentStatus: boolean) => Promise<void>;
}

export const useTaskStore = create<TaskStore>((set) => ({

  tasks: [],
  isLoading: false,
  error: null,

  fetchTasks: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.getTasks();
      set({ tasks: response.data, isLoading: false });
    } catch (err) {
      set({ error: 'Falha ao buscar tarefas.', isLoading: false });
      console.error(err);
    }
  },

  addTask: async (task) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.createTask(task);
    
      set((state) => ({
        tasks: [...state.tasks, response.data],
        isLoading: false
      }));
    } catch (err) {
      set({ error: 'Falha ao criar tarefa.', isLoading: false });
      console.error(err);
    }
  },

  removeTask: async (id) => {
    set({ error: null });
    try {
      await api.deleteTask(id);
    
      set((state) => ({
        tasks: state.tasks.filter(task => task.id !== id)
      }));
    } catch (err) {
      set({ error: 'Falha ao deletar tarefa.' });
      console.error(err);
    }
  },

  toggleTaskStatus: async (id, currentStatus) => {
    set({ error: null });
    try {
    
      const newStatus = !currentStatus;
      const response = await api.toggleTask(id, { completed: newStatus });
      
    
      set((state) => ({
        tasks: state.tasks.map(task => 
          task.id === id ? response.data : task
        )
      }));
    } catch (err) {
      set({ error: 'Falha ao atualizar status.' });
      console.error(err);
    }
  }

}));