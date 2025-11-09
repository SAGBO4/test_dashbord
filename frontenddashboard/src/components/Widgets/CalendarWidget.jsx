import WidgetContainer from './WidgetContainer';

const CalendarWidget = ({ onRemove }) => {
  const events = [
    { title: 'Daily Standup', time: '09:00 - 09:15', color: 'blue' },
    { title: 'Sprint Planning', time: '10:30 - 11:30', color: 'green' },
    { title: 'Démo Client', time: '14:00 - 15:00', color: 'orange' },
    { title: 'Retro Sprint', time: '16:00 - 17:00', color: 'purple' },
  ];

  return (
    <WidgetContainer title="Agenda" icon="fas fa-calendar-alt" badge="4" onRemove={onRemove}>
      <div className="space-y-2">
        {events.map((event, index) => (
          <div key={index} className={`border-l-2 border-${event.color}-500 pl-2 py-1`}>
            <p className="text-xs font-medium text-slate-800">{event.title}</p>
            <p className="text-xs text-slate-500">{event.time}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 text-center text-xs text-slate-500">
        {events.length} événements aujourd'hui
      </div>
    </WidgetContainer>
  );
};

export default CalendarWidget;