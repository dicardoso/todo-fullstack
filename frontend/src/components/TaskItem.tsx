import React from 'react';
import { useTaskStore } from '../store/useTaskStore';
import type { TaskResponse, Priority } from '../types';

const priorityColors: Record<Priority, string> = {
  LOW: 'bg-green-100 text-green-700',
  MEDIUM: 'bg-yellow-100 text-yellow-700',
  HIGH: 'bg-red-100 text-red-700',
};

interface TaskItemProps {
  task: TaskResponse;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { removeTask, toggleTaskStatus } = useTaskStore();

  const handleToggle = () => {
    toggleTaskStatus(task.id, task.completed);
  };

  const handleDelete = () => {
    if (window.confirm(`Tem certeza que deseja deletar: "${task.title}"?`)) {
      removeTask(task.id);
    }
  };

  return (
    <li className="flex items-center p-4 bg-white rounded-lg shadow-sm mb-3
                   transition-all hover:shadow-md"
    >
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleToggle}
        className="form-checkbox h-5 w-5 text-blue-600 rounded-md border-gray-300
                   focus:ring-blue-500 cursor-pointer"
      />

      {/* Conteúdo Principal (Título e Descrição) */}
      <div className="flex-1 min-w-0 ml-4">
        <span 
          className={`text-lg font-medium text-gray-900 truncate ${
            task.completed ? 'line-through text-gray-400' : ''
          }`}
        >
          {task.title}
        </span>
        {task.description && (
          <p className={`text-sm text-gray-500 truncate ${
              task.completed ? 'line-through' : ''
            }`}
          >
            {task.description}
          </p>
        )}
      </div>

      {/* Prioridade (Badge) */}
      <div className="ml-4 hidden sm:block"> {/* Oculta em telas pequenas */}
        <span 
          className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${priorityColors[task.priority]}`}
        >
          {task.priority}
        </span>
      </div>

      {/* Botão Deletar */}
      <button
        onClick={handleDelete}
        className="ml-4 px-3 py-1 text-sm font-medium text-red-500 
                   rounded-md hover:bg-red-100 transition-colors"
      >
        Deletar
      </button>
    </li>
  );
};