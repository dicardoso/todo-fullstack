
import { expect, test, describe, vi, beforeEach } from 'vitest';
import { useTaskStore } from './useTaskStore';
import * as api from '../api/apiService'; 
import type { TaskResponse } from '../types';

vi.mock('../api/apiService');

const mockTasks: TaskResponse[] = [
  { id: 1, title: 'Task 1', completed: false, priority: 'MEDIUM', createdAt: '', updatedAt: '', description: '' },
  { id: 2, title: 'Task 2', completed: true, priority: 'LOW', createdAt: '', updatedAt: '', description: '' },
];

describe('useTaskStore', () => {
 
  beforeEach(() => {
    useTaskStore.getState().reset();    
    vi.resetAllMocks();
  });

  test('fetchTasks deve buscar e popular as tarefas', async () => {
    vi.mocked(api.getTasks).mockResolvedValue({
        data: mockTasks,
        status: 0,
        statusText: '',
        headers: undefined,
        config: undefined
    });

    const state = useTaskStore.getState();
    expect(state.tasks).toHaveLength(0);
    expect(state.isLoading).toBe(false);

    await state.fetchTasks();

    expect(api.getTasks).toHaveBeenCalledTimes(1);
    expect(useTaskStore.getState().tasks).toHaveLength(2);
    expect(useTaskStore.getState().tasks[0].title).toBe('Task 1');
    expect(useTaskStore.getState().isLoading).toBe(false);
  });

  test('removeTask deve remover a tarefa do estado', async () => {
    vi.mocked(api.deleteTask).mockResolvedValue({});
    
    useTaskStore.setState({ tasks: mockTasks, isLoading: false, error: null });
    expect(useTaskStore.getState().tasks).toHaveLength(2);

    await useTaskStore.getState().removeTask(1); 

    expect(api.deleteTask).toHaveBeenCalledWith(1);
    expect(useTaskStore.getState().tasks).toHaveLength(1);
    expect(useTaskStore.getState().tasks[0].id).toBe(2); 
  });
  
  test('fetchTasks deve lidar com erros da API', async () => {
    vi.mocked(api.getTasks).mockRejectedValue(new Error('API Falhou'));
    
    await useTaskStore.getState().fetchTasks();
    
    expect(useTaskStore.getState().tasks).toHaveLength(0);
    expect(useTaskStore.getState().isLoading).toBe(false);
    expect(useTaskStore.getState().error).toBe('Falha ao buscar tarefas.');
  });
});