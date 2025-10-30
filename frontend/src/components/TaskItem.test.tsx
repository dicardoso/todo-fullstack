
import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, describe, vi, beforeEach } from 'vitest';
import { TaskItem } from './TaskItem';
import { useTaskStore } from '../store/useTaskStore';
import type { TaskResponse } from '../types';

vi.mock('../store/useTaskStore');

const mockRemoveTask = vi.fn();
const mockToggleTaskStatus = vi.fn();

const mockTask: TaskResponse = {
  id: 1,
  title: 'Minha Tarefa de Teste',
  description: 'Uma descrição',
  completed: false,
  priority: 'HIGH',
  createdAt: '',
  updatedAt: '',
};

describe('TaskItem Component', () => {
  beforeEach(() => {
    
    vi.resetAllMocks();
    
    (useTaskStore as any).mockReturnValue({
      removeTask: mockRemoveTask,
      toggleTaskStatus: mockToggleTaskStatus,
    });
    
    window.confirm = vi.fn(() => true); 
  });
  
  test('deve renderizar o título e a prioridade da tarefa', () => {
    render(<TaskItem task={mockTask} />);
    
    expect(screen.getByText('Minha Tarefa de Teste')).toBeInTheDocument();
    expect(screen.getByText('HIGH')).toBeInTheDocument();
    expect(screen.getByText('Uma descrição')).toBeInTheDocument();
  });
  
  test('deve chamar toggleTaskStatus quando o checkbox é clicado', () => {
    render(<TaskItem task={mockTask} />);
    const checkbox = screen.getByRole('checkbox');
    
    fireEvent.click(checkbox);

    expect(mockToggleTaskStatus).toHaveBeenCalledTimes(1);
    expect(mockToggleTaskStatus).toHaveBeenCalledWith(1, false); 
  });

  test('deve chamar removeTask quando o botão deletar é clicado', () => {
    render(<TaskItem task={mockTask} />);
    const deleteButton = screen.getByText('Deletar');
    fireEvent.click(deleteButton);
    expect(window.confirm).toHaveBeenCalledTimes(1);

    expect(mockRemoveTask).toHaveBeenCalledTimes(1);
    expect(mockRemoveTask).toHaveBeenCalledWith(1); 
  });
});