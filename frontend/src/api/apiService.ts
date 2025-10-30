import axios from 'axios';
import type { TaskResponse, TaskCreateUpdate, TaskToggleComplete } from '../types';

// Detecta se estamos rodando no Docker (produção) ou local (dev)
// (Vamos ajustar o docker-compose.yml depois para isso)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' }
});

export const getTasks = () => apiClient.get<TaskResponse[]>('/tasks');
export const createTask = (task: TaskCreateUpdate) => apiClient.post<TaskResponse>('/tasks', task);
export const updateTask = (id: number, task: TaskCreateUpdate) => apiClient.put<TaskResponse>(`/tasks/${id}`, task);
export const toggleTask = (id: number, completed: TaskToggleComplete) => apiClient.patch<TaskResponse>(`/tasks/${id}/toggle`, completed);
export const deleteTask = (id: number) => apiClient.delete(`/tasks/${id}`);