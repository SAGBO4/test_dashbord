import WidgetContainer from './WidgetContainer';

const TasksWidget = ({ onRemove }) => {
  const tasks = [
    { id: 1, text: 'Finir le rapport Q4', completed: false },
    { id: 2, text: 'Réunion équipe à 10h', completed: true },
    { id: 3, text: 'Review PR #234', completed: false },
    { id: 4, text: 'Mettre à jour documentation', completed: false },
    { id: 5, text: 'Préparer démo client', completed: false },
  ];

  return (
    <WidgetContainer title="Tâches du jour" icon="fas fa-check-square" onRemove={onRemove}>
      <div className="space-y-2">
        {tasks.map((task) => (
          <label
            key={task.id}
            className="flex items-start space-x-2 text-xs cursor-pointer hover:bg-slate-50 p-1 rounded"
          >
            <input
              type="checkbox"
              defaultChecked={task.completed}
              className="mt-1 w-3 h-3 text-slate-600 rounded"
            />
            <span className={task.completed ? 'text-slate-400 line-through' : 'text-slate-700'}>
              {task.text}
            </span>
          </label>
        ))}
      </div>
      <button className="w-full mt-3 text-xs text-slate-500 hover:text-slate-700 py-1 border border-slate-200 rounded hover:bg-slate-50">
        + Ajouter une tâche
      </button>
    </WidgetContainer>
  );
};

export default TasksWidget;