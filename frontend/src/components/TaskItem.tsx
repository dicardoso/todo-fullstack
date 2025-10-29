import React from 'react';
import { useTaskStore } from '../store/useTaskStore';
import type { TaskResponse } from '../types';

interface TaskItemProps {
  task: TaskResponse;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { removeTask, toggleTaskStatus } = useTaskStore();

  const handleToggle = () => {
    toggleTaskStatus(task.id, task.completed);
  };

  const handleDelete = () => {
    if (window.confirm(`Tem certeza que deseja deletar a tarefa: "${task.title}"?`)) {
      removeTask(task.id);
    }
  };

  const priorityColor = {
    LOW: 'text-green-600 bg-green-100',
    MEDIUM: 'text-yellow-600 bg-yellow-100',
    HIGH: 'text-red-600 bg-red-100',
  };

  return (
    <li className="flex items-center justify-between p-4 mb-2 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex-1">
        <div className="flex items-center">
          {/* Checkbox */}
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggle}
            className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300"
          />
          
          {/* Título */}
          <span className={`ml-3 text-lg font-medium ${
              task.completed ? 'line-through text-gray-400' : 'text-gray-800'
            }`}
          >
            {task.title}
          </span>

          {/* Badge de Prioridade */}
          <span 
            className={`ml-3 px-2 py-0.5 rounded-full text-xs font-semibold ${priorityColor[task.priority]}`}
          >
            {task.priority}
          </span>
        </div>

        {/* Descrição */}
        {task.description && (
          <p className={`ml-8 mt-1 text-sm ${
              task.completed ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            {task.description}
          </p>
        )}
      </div>

      {/* Botão Deletar */}
      <button
        onClick={handleDelete}
        className="px-3 py-1 text-sm font-medium text-red-600 bg-red-100 rounded-md 
                   hover:bg-red-200 hover:text-red-800"
      >
        Deletar
      </button>
    </li>
  );
};