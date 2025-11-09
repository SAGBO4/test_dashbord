/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { calendarService } from '../../services/calendarService';
import WidgetContainer from './WidgetContainer';

const CalendarTodayWidget = ({ onRemove }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notConnected, setNotConnected] = useState(false);

  useEffect(() => {
    // Check if user just connected Calendar
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('calendar_connected') === 'true') {
      // Remove the parameter from URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    loadEvents();
    const interval = setInterval(loadEvents, 10 * 60 * 1000); // Refresh every 10 minutes
    return () => clearInterval(interval);
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      setNotConnected(false);

      // Check if user is connected before
      const status = await calendarService.getStatus();

      if (!status.connected) {
        setNotConnected(true);
        setLoading(false);
        return;
      }

      const data = await calendarService.getTodayEvents();
      setEvents(data);
    } catch (err) {
      setError('Impossible de charger les événements');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (event) => {
    if (event.start.dateTime) {
      const date = new Date(event.start.dateTime);
      return date.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
      });
    } else if (event.start.date) {
      return 'Toute la journée';
    }
    return '';
  };

  const isEventNow = (event) => {
    if (!event.start.dateTime || !event.end.dateTime) return false;
    const now = new Date();
    const start = new Date(event.start.dateTime);
    const end = new Date(event.end.dateTime);
    return now >= start && now <= end;
  };

  if (loading) {
    return (
      <WidgetContainer title="Agenda d'aujourd'hui" icon="fas fa-calendar-day" onRemove={onRemove}>
        <div className="text-center py-8 text-xs text-slate-500">
          <i className="fas fa-spinner fa-spin text-lg mb-2"></i>
          <p>Chargement...</p>
        </div>
      </WidgetContainer>
    );
  }

  if (notConnected) {
    return (
      <WidgetContainer title="Agenda d'aujourd'hui" icon="fas fa-calendar-day" onRemove={onRemove}>
        <div className="text-center py-8">
          <i className="fas fa-calendar-times text-3xl text-slate-300 mb-3"></i>
          <p className="text-xs text-slate-600 mb-3">Calendar non connecté</p>
          <p className="text-xs text-slate-500 mb-3">
            Veuillez activer le service Calendar depuis la page Services
          </p>
          <a
            href="/services"
            className="inline-block px-4 py-2 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700"
          >
            <i className="fas fa-cog mr-1"></i>
            Aller aux Services
          </a>
        </div>
      </WidgetContainer>
    );
  }

  if (error) {
    return (
      <WidgetContainer title="Agenda d'aujourd'hui" icon="fas fa-calendar-day" onRemove={onRemove}>
        <div className="text-center py-8 text-xs text-red-600">
          <i className="fas fa-exclamation-triangle text-lg mb-2"></i>
          <p>{error}</p>
          <button
            onClick={loadEvents}
            className="mt-2 text-slate-600 hover:text-slate-800 underline"
          >
            Réessayer
          </button>
        </div>
      </WidgetContainer>
    );
  }

  if (events.length === 0) {
    return (
      <WidgetContainer title="Agenda d'aujourd'hui" icon="fas fa-calendar-day" onRemove={onRemove}>
        <div className="text-center py-8 text-slate-500">
          <i className="fas fa-calendar-check text-3xl text-green-500 mb-2"></i>
          <p className="text-xs">Aucun événement aujourd'hui</p>
          <p className="text-xs mt-1">Journée libre !</p>
        </div>
      </WidgetContainer>
    );
  }

  return (
    <WidgetContainer
      title="Agenda d'aujourd'hui"
      icon="fas fa-calendar-day"
      badge={events.length}
      onRemove={onRemove}
    >
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {events.map((event) => {
          const isNow = isEventNow(event);
          return (
            <a
              key={event.id}
              href={event.htmlLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`block p-2 border-l-2 ${
                isNow ? 'border-green-500 bg-green-50' : 'border-blue-300 hover:bg-slate-50'
              } hover:border-blue-500 cursor-pointer`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className="text-xs font-medium text-slate-800 truncate">
                      {event.summary || '(Sans titre)'}
                    </p>
                    {isNow && (
                      <span className="inline-flex items-center text-xs text-green-600">
                        <i className="fas fa-circle text-[6px] animate-pulse"></i>
                        <span className="ml-1">En cours</span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500">{formatTime(event)}</p>
                  {event.location && (
                    <p className="text-xs text-slate-400 truncate mt-1">
                      <i className="fas fa-map-marker-alt mr-1"></i>
                      {event.location}
                    </p>
                  )}
                </div>
              </div>
            </a>
          );
        })}
      </div>
      <button
        onClick={loadEvents}
        className="w-full mt-3 text-xs text-slate-500 hover:text-slate-700 py-2 border border-slate-200 rounded"
      >
        <i className="fas fa-sync-alt mr-1"></i>
        Rafraîchir
      </button>
    </WidgetContainer>
  );
};

export default CalendarTodayWidget;
