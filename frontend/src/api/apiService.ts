import axios from 'axios';
import type {
    TaskResponse,
    TaskCreateUpdate,
    TaskToggleComplete
} from '../types';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  headers: {
    'Content-Type': 'application/json'
  }
});


export const getTasks = () => 
  apiClient.get<TaskResponse[]>('/tasks');

export const getTaskById = (id: number) => 
  apiClient.get<TaskResponse>(`/tasks/${id}`);

export const createTask = (task: TaskCreateUpdate) => 
  apiClient.post<TaskResponse>('/tasks', task);

export const updateTask = (id: number, task: TaskCreateUpdate) => 
  apiClient.put<TaskResponse>(`/tasks/${id}`, task);

export const toggleTask = (id: number, completed: TaskToggleComplete) => 
  apiClient.patch<TaskResponse>(`/tasks/${id}/toggle`, completed);

export const deleteTask = (id: number) => 
  apiClient.delete(`/tasks/${id}`);