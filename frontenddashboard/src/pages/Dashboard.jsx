import { useState, useEffect } from 'react';
import NavbarConnected from "../components/NavBarConected";
import DashboardHeader from '../components/Layout/DashboardHeader';
import AddWidgetModal from '../components/Modals/AddWidgetModal';

import WeatherWidget from '../components/Widgets/WeatherWidget';
import WeatherForecastWidget from '../components/Widgets/WeatherForecastWidget';
import TasksWidget from '../components/Widgets/TasksWidget';
import NotesWidget from '../components/Widgets/NotesWidget';
import PomodoroWidget from '../components/Widgets/PomodoroWidget';

import GmailUnreadWidget from '../components/Widgets/GmailUnreadWidget';
import GmailImportantWidget from '../components/Widgets/GmailImportantWidget';
import GmailRecentWidget from '../components/Widgets/GmailRecentWidget';

import DriveFilesByTypeWidget from '../components/Widgets/DriveFilesByType';
import DriveRecentFilesWidget from '../components/Widgets/DriveRecentFiles';

import CalendarUpcomingWidget from '../components/Widgets/CalendarUpcomingWidget';
import CalendarTodayWidget from '../components/Widgets/CalendarTodayWidget';
import CalendarBirthdaysWidget from '../components/Widgets/CalendarBirthdaysWidget';

const Dashboard = () => {
  const [widgets, setWidgets] = useState(() => {
    const saved = localStorage.getItem('dashboard-widgets');
    return saved ? JSON.parse(saved) : [];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  // save in  localStorage
  useEffect(() => {
    localStorage.setItem('dashboard-widgets', JSON.stringify(widgets));
  }, [widgets]);

  const handleAddWidget = (widgetConfig) => {
    setWidgets([...widgets, widgetConfig]);
  };

  const handleRemoveWidget = (widgetId) => {
    setWidgets(widgets.filter(w => w.id !== widgetId));
  };

  const renderWidget = (widget) => {
    const { id, service, type } = widget;

    // Weather widgets
    if (service === 'weather') {
      if (type === 'current') {
        return (
          <WeatherWidget
            key={id}
            city={widget.city}
            units={widget.units}
            onRemove={() => handleRemoveWidget(id)}
          />
        );
      }
      if (type === 'forecast') {
        return (
          <WeatherForecastWidget
            key={id}
            city={widget.city}
            days={widget.days}
            units={widget.units}
            onRemove={() => handleRemoveWidget(id)}
          />
        );
      }
    }

    // Tasks widget
    if (service === 'tasks' && type === 'todo') {
      return <TasksWidget key={id} onRemove={() => handleRemoveWidget(id)} />;
    }

    // Calendar widgets
    if (service === 'calendar') {
      if (type === 'upcoming') {
        return (
          <CalendarUpcomingWidget
            key={id}
            maxResults={widget.maxResults}
            onRemove={() => handleRemoveWidget(id)}
          />
        );
      }
      if (type === 'today') {
        return (
          <CalendarTodayWidget
            key={id}
            onRemove={() => handleRemoveWidget(id)}
          />
        );
      }
      if (type === 'birthdays') {
        return (
          <CalendarBirthdaysWidget
            key={id}
            daysRange={widget.daysRange}
            onRemove={() => handleRemoveWidget(id)}
          />
        );
      }
    }

    // Notes widget
    if (service === 'notes' && type === 'notes') {
      return <NotesWidget key={id} onRemove={() => handleRemoveWidget(id)} />;
    }

    // Pomodoro widget
    if (service === 'pomodoro' && type === 'timer') {
      return <PomodoroWidget key={id} onRemove={() => handleRemoveWidget(id)} />;
    }

    // Gmail widgets
    if (service === 'gmail') {
      if (type === 'unread') {
        return (
          <GmailUnreadWidget
            key={id}
            maxResults={widget.maxResults}
            onRemove={() => handleRemoveWidget(id)}
          />
        );
      }
      if (type === 'important') {
        return (
          <GmailImportantWidget
            key={id}
            maxResults={widget.maxResults}
            onRemove={() => handleRemoveWidget(id)}
          />
        );
      }
      if (type === 'recent') {
        return (
          <GmailRecentWidget
            key={id}
            maxResults={widget.maxResults}
            onRemove={() => handleRemoveWidget(id)}
          />
        );
      }
    }

    // Google Drive widgets
    if (service === 'drive') {
      if (type === 'recent') {
        return (
          <DriveRecentFilesWidget
            key={id}
            pageSize={widget.pageSize}
            onRemove={() => handleRemoveWidget(id)}
          />
        );
      }
      if (type === 'byType') {
        return (
          <DriveFilesByTypeWidget
            key={id}
            mimeType={widget.mimeType}
            onRemove={() => handleRemoveWidget(id)}
          />
        );
      }
    }

    return null;
  };

  return (
    <>
      <NavbarConnected />

      <div className="max-w-full mx-auto px-6 py-4">
        <DashboardHeader onAddWidget={() => setIsModalOpen(true)} />

        {/* Grille de widgets */}
        {widgets.length === 0 ? (
          <div className="text-center py-20">
            <i className="fas fa-th text-5xl text-slate-300 mb-4"></i>
            <p className="text-slate-600 mb-4">Votre dashboard est vide</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2 bg-slate-800 text-white text-sm font-medium rounded hover:bg-slate-700 transition-colors"
            >
              <i className="fas fa-plus mr-2"></i>
              Ajouter votre premier widget
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {widgets.map(widget => renderWidget(widget))}
          </div>
        )}
      </div>

      {/* Modal d'ajout */}
      <AddWidgetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddWidget}
      />
    </>
  );
};

export default Dashboard;