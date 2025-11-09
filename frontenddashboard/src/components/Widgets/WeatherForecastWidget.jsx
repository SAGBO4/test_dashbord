/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { weatherService } from '../../services/weatherService';
import WidgetContainer from './WidgetContainer';

const WeatherForecastWidget = ({ city = 'Paris', days = 5, units = 'metric', onRemove }) => {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadForecast();
    const interval = setInterval(loadForecast, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [city, days, units]);

  const loadForecast = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await weatherService.getForecast(city, days, units);
      setForecast(data);
    } catch (err) {
      setError('Impossible de charger les prévisions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      weekday: 'short', 
      day: 'numeric',
      month: 'short'
    });
  };

  if (loading) {
    return (
      <WidgetContainer title="Prévisions" icon="fas fa-calendar-alt" onRemove={onRemove}>
        <div className="text-center py-8 text-xs text-slate-500">
          <i className="fas fa-spinner fa-spin text-lg mb-2"></i>
          <p>Chargement...</p>
        </div>
      </WidgetContainer>
    );
  }

  if (error) {
    return (
      <WidgetContainer title="Prévisions" icon="fas fa-calendar-alt" onRemove={onRemove}>
        <div className="text-center py-8 text-xs text-red-600">
          <i className="fas fa-exclamation-triangle text-lg mb-2"></i>
          <p>{error}</p>
        </div>
      </WidgetContainer>
    );
  }

  return (
    <WidgetContainer title={`Prévisions ${city}`} icon="fas fa-calendar-alt" onRemove={onRemove}>
      <div className="space-y-2">
        {forecast.map((day, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 hover:bg-slate-50 rounded transition-colors"
          >
            <div className="flex items-center space-x-3 flex-1">
              <img src="https://cdn-icons-png.flaticon.com/512/1116/1116453.png" alt={day.description} className="w-8 h-8" />
              <div className="flex-1">
                <p className="text-xs font-medium text-slate-800 capitalize">
                  {formatDate(day.date)}
                </p>
                <p className="text-xs text-slate-500 capitalize">
                  {day.description}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold text-slate-800">
                {Math.round(day.tempMax)}°
              </p>
              <p className="text-xs text-slate-500">
                {Math.round(day.tempMin)}°
              </p>
            </div>
          </div>
        ))}
      </div>
    </WidgetContainer>
  );
};

export default WeatherForecastWidget;