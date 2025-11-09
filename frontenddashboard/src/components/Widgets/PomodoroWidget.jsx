import WidgetContainer from './WidgetContainer';

const PomodoroWidget = ({ onRemove }) => {
  return (
    <WidgetContainer title="Pomodoro" icon="fas fa-stopwatch" onRemove={onRemove}>
      <div className="text-center py-4">
        <div className="text-4xl font-mono font-bold text-slate-800">25:00</div>
        <p className="text-xs text-slate-500 mt-2">Session de focus</p>
      </div>
      <div className="flex space-x-2">
        <button className="flex-1 py-2 bg-green-500 text-white text-xs font-medium rounded hover:bg-green-600">
          <i className="fas fa-play mr-1"></i>Start
        </button>
        <button className="px-4 py-2 border border-slate-300 text-slate-600 text-xs font-medium rounded hover:bg-slate-50">
          <i className="fas fa-redo"></i>
        </button>
      </div>
      <div className="mt-3 text-center">
        <p className="text-xs text-slate-500">Sessions: 3/8 aujourd'hui</p>
      </div>
    </WidgetContainer>
  );
};

export default PomodoroWidget;