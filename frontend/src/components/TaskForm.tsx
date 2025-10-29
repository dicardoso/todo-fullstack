import React, { useState } from 'react';
import { useTaskStore } from '../store/useTaskStore';
import type { Priority, TaskCreateUpdate } from '../types';

export const TaskForm: React.FC = () => {
  const { addTask, isLoading } = useTaskStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('MEDIUM');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      alert('O título é obrigatório!');
      return;
    }
    await addTask({ title, description, priority });
    setTitle('');
    setDescription('');
    setPriority('MEDIUM');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Adicionar Nova Tarefa</h3>
      
      {/* Campo Título */}
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-600 mb-1">
          Título: *
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      {/* Campo Descrição */}
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-600 mb-1">
          Descrição:
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-textarea w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      {/* Campo Prioridade */}
      <div className="mb-4">
        <label htmlFor="priority" className="block text-sm font-medium text-gray-600 mb-1">
          Prioridade: *
        </label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          className="form-select w-full rounded-md border-gray-300 shadow-sm"
        >
          <option value="LOW">Baixa</option>
          <option value="MEDIUM">Média</option>
          <option value="HIGH">Alta</option>
        </select>
      </div>

      {/* Botão de Envio */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow
                   hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500
                   disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Adicionando...' : 'Adicionar Tarefa'}
      </button>
    </form>
  );
};