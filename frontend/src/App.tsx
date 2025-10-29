// src/App.tsx
import { useEffect } from 'react';
import { useTaskStore } from './store/useTaskStore';
import { TaskForm } from './components/TaskForm';
import { TaskItem } from './components/TaskItem';

function App() {
  const { tasks, isLoading, error, fetchTasks } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 font-sans antialiased">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        Minha Lista de Tarefas (React + Spring)
      </h1>

      <TaskForm />

      <hr className="my-6" />

      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Tarefas Pendentes
      </h2>

      {isLoading && <p className="text-blue-500">Carregando tarefas...</p>}
      {error && <p className="text-red-600 font-semibold">{error}</p>}

      {/* Lista de tarefas */}
      <ul className="list-none p-0">
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>

      {!isLoading && tasks.length === 0 && (
        <p className="text-gray-500">Nenhuma tarefa encontrada. Adicione uma!</p>
      )}
    </div>
  );
}

export default App;