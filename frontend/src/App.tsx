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
    <div className="min-h-screen bg-gray-100 py-10 antialiased ">
      
      {/* Container Principal */}
      <div className="max-w-3xl mx-auto px-4 space-y-8">
        
        {/* Cabeçalho */}
        <header>
          <h1 className="text-4xl font-bold text-center text-gray-800">
            Minhas Tarefas
          </h1>
        </header>

        <div>
        {/* Formulário de Criação */}
        <main>
          <TaskForm />
        </main>

        {/* Seção da Lista de Tarefas */}
        <section>
          {/* Feedback de Loading e Erro */}
          {isLoading && <p className="text-center text-blue-600">Carregando...</p>}
          {error && <p className="text-center text-red-600 font-semibold">{error}</p>}

          {/* Lista de Tarefas */}
          <ul className="list-none p-0">
            {tasks.map(task => (
              <TaskItem key={task.id} task={task} />
            ))}
          </ul>

          {/* Estado Vazio */}
          {!isLoading && !error && tasks.length === 0 && (
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500">Nenhuma tarefa encontrada. Adicione uma!</p>
            </div>
          )}
        </section>
          </div>
      </div>
    </div>
  );
}

export default App;