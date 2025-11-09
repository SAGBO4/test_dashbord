/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { calendarService } from '../../services/calendarService';
import WidgetContainer from './WidgetContainer';

const CalendarBirthdaysWidget = ({ daysRange = 7, onRemove }) => {
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
    const interval = setInterval(loadEvents, 30 * 60 * 1000); // Refresh every 30 minutes
    return () => clearInterval(interval);
  }, [daysRange]);

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

      const data = await calendarService.getBirthdays(daysRange);
      setEvents(data);
    } catch (err) {
      setError('Impossible de charger les anniversaires');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (event) => {
    if (event.start.dateTime) {
      const date = new Date(event.start.dateTime);
      return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
      });
    } else if (event.start.date) {
      const date = new Date(event.start.date);
      return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
      });
    }
    return '';
  };

  const getDaysUntil = (event) => {
    const eventDate = event.start.dateTime
      ? new Date(event.start.dateTime)
      : new Date(event.start.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    eventDate.setHours(0, 0, 0, 0);

    const diffTime = eventDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Aujourd'hui";
    if (diffDays === 1) return 'Demain';
    if (diffDays < 0) return 'Passé';
    return `Dans ${diffDays} jours`;
  };

  if (loading) {
    return (
      <WidgetContainer title="Anniversaires" icon="fas fa-birthday-cake" onRemove={onRemove}>
        <div className="text-center py-8 text-xs text-slate-500">
          <i className="fas fa-spinner fa-spin text-lg mb-2"></i>
          <p>Chargement...</p>
        </div>
      </WidgetContainer>
    );
  }

  if (notConnected) {
    return (
      <WidgetContainer title="Anniversaires" icon="fas fa-birthday-cake" onRemove={onRemove}>
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
      <WidgetContainer title="Anniversaires" icon="fas fa-birthday-cake" onRemove={onRemove}>
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
      <WidgetContainer title="Anniversaires" icon="fas fa-birthday-cake" onRemove={onRemove}>
        <div className="text-center py-8 text-slate-500">
          <i className="fas fa-calendar-check text-3xl text-slate-400 mb-2"></i>
          <p className="text-xs">Aucun anniversaire à venir</p>
          <p className="text-xs mt-1">dans les {daysRange} prochains jours</p>
        </div>
      </WidgetContainer>
    );
  }

  return (
    <WidgetContainer
      title="Anniversaires"
      icon="fas fa-birthday-cake"
      badge={events.length}
      onRemove={onRemove}
    >
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {events.map((event) => {
          const daysUntil = getDaysUntil(event);
          const isToday = daysUntil === "Aujourd'hui";

          return (
            <a
              key={event.id}
              href={event.htmlLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`block p-2 border-l-2 ${
                isToday ? 'border-pink-500 bg-pink-50' : 'border-purple-300 hover:bg-slate-50'
              } hover:border-purple-500 cursor-pointer`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-birthday-cake text-pink-500 text-xs"></i>
                    <p className="text-xs font-medium text-slate-800 truncate">
                      {event.summary || '(Sans titre)'}
                    </p>
                  </div>
                  <p className="text-xs text-slate-500">{formatDate(event)}</p>
                  <p
                    className={`text-xs mt-1 ${
                      isToday ? 'text-pink-600 font-semibold' : 'text-slate-400'
                    }`}
                  >
                    {daysUntil}
                  </p>
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

export default CalendarBirthdaysWidget;
