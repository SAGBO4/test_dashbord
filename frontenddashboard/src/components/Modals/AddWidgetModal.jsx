import { useState, useEffect } from 'react';
import { servicesService } from '../../services/servicesService';

const AddWidgetModal = ({ isOpen, onClose, onAdd }) => {
  const [service, setService] = useState('weather');
  const [widgetType, setWidgetType] = useState('current');
  const [userServices, setUserServices] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Configuration Weather
  const [city, setCity] = useState('Paris');
  const [units, setUnits] = useState('metric');
  const [days, setDays] = useState(5);

  // Configuration Gmail
  const [maxResultsEmail, setMaxResultsEmail] = useState(10);

  // Configuration Google Drive
  const [pageSize, setPageSize] = useState(10);
  const [mimeType, setMimeType] = useState('application/pdf');

  // Configuration Calendar
  const [maxResultsUpcoming, setMaxResultsUpcoming] = useState(10);
  const [daysRangeBirthdays, setDaysRangeBirthdays] = useState(7);

  useEffect(() => {
    if (isOpen) {
      loadUserServices();
    }
  }, [isOpen]);

  const loadUserServices = async () => {
    try {
      setLoading(true);
      const data = await servicesService.getUserServices();
      setUserServices(data);
      
    } catch (err) {
      console.error('Erreur lors du chargement des services', err);
    } finally {
      setLoading(false);
    }
  };

  const serviceNameMap = {
    'weather': 'weather',
    'gmail': 'email',
    'tasks': 'tasks',
    'calendar': 'calendar',
    'notes': 'notes',
    'pomodoro': 'pomodoro',
    'drive': 'google_drive',
  };

  const isServiceActive = (frontendServiceName) => {
    const backendServiceName = serviceNameMap[frontendServiceName];
    
    const isActive = userServices.some(
      us => us.service.name === backendServiceName && us.isActive
    );
   
    return isActive;
  };

  const widgetsByService = {
    weather: [
      { value: 'current', label: 'Météo du jour' },
      { value: 'forecast', label: 'Prévisions (5 jours)' }
    ],
    gmail: [
      { value: 'unread', label: 'Emails non lus' },
      { value: 'important', label: 'Emails importants' },
      { value: 'recent', label: 'Emails récents' }
    ],
    drive: [
      { value: 'recent', label: 'Fichiers récents' },
      { value: 'byType', label: 'Fichiers par type' }
    ],
    tasks: [
      { value: 'todo', label: 'Liste de tâches' }
    ],
    calendar: [
      { value: 'upcoming', label: 'Événements à venir' },
      { value: 'today', label: 'Agenda d\'aujourd\'hui' },
      { value: 'birthdays', label: 'Anniversaires' }
    ],
    notes: [
      { value: 'notes', label: 'Notes rapides' }
    ],
    pomodoro: [
      { value: 'timer', label: 'Timer Pomodoro' }
    ]
  };

  const mimeTypeOptions = [
    { value: 'application/pdf', label: 'Documents PDF' },
    { value: 'image/jpeg', label: 'Images JPEG' },
    { value: 'image/png', label: 'Images PNG' },
    { value: 'application/vnd.google-apps.document', label: 'Google Docs' },
    { value: 'application/vnd.google-apps.spreadsheet', label: 'Google Sheets' },
    { value: 'application/vnd.google-apps.presentation', label: 'Google Slides' },
  ];

  const handleServiceChange = (newService) => {
    setService(newService);
    setWidgetType(widgetsByService[newService][0].value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isServiceActive(service)) {
      alert(`Le service "${service}" doit être activé avant d'ajouter un widget.`);
      return;
    }

    const widgetConfig = {
      id: Date.now(),
      service,
      type: widgetType,
    };

    // Configuration Weather
    if (service === 'weather') {
      widgetConfig.city = city;
      widgetConfig.units = units;
      if (widgetType === 'forecast') {
        widgetConfig.days = days;
      }
    }

    // Configuration Gmail
    if (service === 'gmail') {
      widgetConfig.maxResults = maxResultsEmail;
    }

    // Configuration Google Drive
    if (service === 'drive') {
      if (widgetType === 'recent') {
        widgetConfig.pageSize = pageSize;
      } else if (widgetType === 'byType') {
        widgetConfig.mimeType = mimeType;
      }
    }

    // Configuration Calendar
    if (service === 'calendar') {
      if (widgetType === 'upcoming') {
        widgetConfig.maxResults = maxResultsUpcoming;
      } else if (widgetType === 'birthdays') {
        widgetConfig.daysRange = daysRangeBirthdays;
      }
    }

    onAdd(widgetConfig);
    onClose();
    
    // Reset
    setCity('Paris');
    setUnits('metric');
    setDays(5);
    setMaxResultsEmail(10);
    setPageSize(10);
    setMimeType('application/pdf');
    setMaxResultsUpcoming(10);
    setDaysRangeBirthdays(7);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 sticky top-0 bg-white">
          <h2 className="text-lg font-semibold text-slate-800">
            Ajouter un widget
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Form */}
        {loading ? (
          <div className="p-8 text-center">
            <i className="fas fa-spinner fa-spin text-2xl text-slate-400 mb-2"></i>
            <p className="text-xs text-slate-500">Chargement des services...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            {/* Service */}
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Service
              </label>
              <select
                value={service}
                onChange={(e) => handleServiceChange(e.target.value)}
                className="w-full text-xs border border-slate-300 rounded px-3 py-2 focus:outline-none focus:border-slate-500"
              >
                <option value="weather" disabled={!isServiceActive('weather')}>
                  Weather {!isServiceActive('weather') && '(Non activé)'}
                </option>
                <option value="gmail" disabled={!isServiceActive('gmail')}>
                  Gmail {!isServiceActive('gmail') && '(Non activé)'}
                </option>
                <option value="drive" disabled={!isServiceActive('drive')}>
                  Google Drive {!isServiceActive('drive') && '(Non activé)'}
                </option>
                <option value="tasks" disabled={!isServiceActive('tasks')}>
                  Tasks {!isServiceActive('tasks') && '(Non activé)'}
                </option>
                <option value="calendar" disabled={!isServiceActive('calendar')}>
                  Calendar {!isServiceActive('calendar') && '(Non activé)'}
                </option>
                <option value="notes" disabled={!isServiceActive('notes')}>
                  Notes {!isServiceActive('notes') && '(Non activé)'}
                </option>
                <option value="pomodoro" disabled={!isServiceActive('pomodoro')}>
                  Pomodoro {!isServiceActive('pomodoro') && '(Non activé)'}
                </option>
              </select>
            </div>

            {/* Type de widget */}
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Type de widget
              </label>
              <select
                value={widgetType}
                onChange={(e) => setWidgetType(e.target.value)}
                className="w-full text-xs border border-slate-300 rounded px-3 py-2 focus:outline-none focus:border-slate-500"
              >
                {widgetsByService[service].map(widget => (
                  <option key={widget.value} value={widget.value}>
                    {widget.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Configuration Weather */}
            {service === 'weather' && (
              <>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Ville *
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Ex: Paris, Cotonou, Tokyo..."
                    className="w-full text-xs border border-slate-300 rounded px-3 py-2 focus:outline-none focus:border-slate-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Unités
                  </label>
                  <select
                    value={units}
                    onChange={(e) => setUnits(e.target.value)}
                    className="w-full text-xs border border-slate-300 rounded px-3 py-2 focus:outline-none focus:border-slate-500"
                  >
                    <option value="metric">Celsius (°C)</option>
                    <option value="imperial">Fahrenheit (°F)</option>
                  </select>
                </div>

                {widgetType === 'forecast' && (
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Nombre de jours
                    </label>
                    <input
                      type="number"
                      value={days}
                      onChange={(e) => setDays(parseInt(e.target.value))}
                      min="1"
                      max="7"
                      className="w-full text-xs border border-slate-300 rounded px-3 py-2 focus:outline-none focus:border-slate-500"
                    />
                  </div>
                )}
              </>
            )}

            {/* Configuration Gmail */}
            {service === 'gmail' && (
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Nombre d'emails à afficher
                </label>
                <input
                  type="number"
                  value={maxResultsEmail}
                  onChange={(e) => setMaxResultsEmail(parseInt(e.target.value))}
                  min="1"
                  max="50"
                  className="w-full text-xs border border-slate-300 rounded px-3 py-2 focus:outline-none focus:border-slate-500"
                />
              </div>
            )}

            {/*Configuration Google Drive */}
            {service === 'drive' && (
              <>
                {widgetType === 'recent' && (
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Nombre de fichiers à afficher
                    </label>
                    <input
                      type="number"
                      value={pageSize}
                      onChange={(e) => setPageSize(parseInt(e.target.value))}
                      min="1"
                      max="50"
                      className="w-full text-xs border border-slate-300 rounded px-3 py-2 focus:outline-none focus:border-slate-500"
                    />
                  </div>
                )}

                {widgetType === 'byType' && (
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Type de fichier
                    </label>
                    <select
                      value={mimeType}
                      onChange={(e) => setMimeType(e.target.value)}
                      className="w-full text-xs border border-slate-300 rounded px-3 py-2 focus:outline-none focus:border-slate-500"
                    >
                      {mimeTypeOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </>
            )}

            {/* Configuration Calendar */}
            {service === 'calendar' && (
              <>
                {widgetType === 'upcoming' && (
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Nombre d'événements à afficher
                    </label>
                    <input
                      type="number"
                      value={maxResultsUpcoming}
                      onChange={(e) => setMaxResultsUpcoming(parseInt(e.target.value))}
                      min="1"
                      max="50"
                      className="w-full text-xs border border-slate-300 rounded px-3 py-2 focus:outline-none focus:border-slate-500"
                    />
                  </div>
                )}

                {widgetType === 'birthdays' && (
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Nombre de jours à afficher
                    </label>
                    <input
                      type="number"
                      value={daysRangeBirthdays}
                      onChange={(e) => setDaysRangeBirthdays(parseInt(e.target.value))}
                      min="1"
                      max="30"
                      className="w-full text-xs border border-slate-300 rounded px-3 py-2 focus:outline-none focus:border-slate-500"
                    />
                  </div>
                )}
              </>
            )}

            {/* Actions */}
            <div className="flex space-x-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 rounded hover:bg-slate-200 transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 text-xs font-medium text-white bg-slate-800 rounded hover:bg-slate-700 transition-colors"
              >
                Ajouter
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddWidgetModal;