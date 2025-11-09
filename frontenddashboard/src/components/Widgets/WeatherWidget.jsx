/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { weatherService } from '../../services/weatherService';
import WidgetContainer from './WidgetContainer';

const WeatherWidget = ({ city = 'Paris', units = 'metric', onRemove }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadWeather();
    const interval = setInterval(loadWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [city, units]);

  const loadWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await weatherService.getCurrentWeather(city, units);
      setWeather(data);
    } catch (err) {
      setError('Impossible de charger la météo');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <WidgetContainer title="Météo" icon="fas fa-cloud-sun" onRemove={onRemove}>
        <div className="text-center py-8 text-xs text-slate-500">
          <i className="fas fa-spinner fa-spin text-lg mb-2"></i>
          <p>Chargement...</p>
        </div>
      </WidgetContainer>
    );
  }

  if (error) {
    return (
      <WidgetContainer title="Météo" icon="fas fa-cloud-sun" onRemove={onRemove}>
        <div className="text-center py-8 text-xs text-red-600">
          <i className="fas fa-exclamation-triangle text-lg mb-2"></i>
          <p>{error}</p>
          <button
            onClick={loadWeather}
            className="mt-2 text-slate-600 hover:text-slate-800"
          >
            Réessayer
          </button>
        </div>
      </WidgetContainer>
    );
  }

  if (!weather) return null;

  return (
    <WidgetContainer title="Météo" icon="fas fa-cloud-sun" onRemove={onRemove}>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500">{weather.city}</span>
          <button
            onClick={loadWeather}
            className="text-xs text-slate-400 hover:text-slate-600"
            title="Rafraîchir"
          >
            <i className="fas fa-sync-alt"></i>
          </button>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <img src="https://cdn-icons-png.flaticon.com/512/1116/1116453.png" alt={weather.description} className="w-16 h-16" />
          </div>
          <p className="text-3xl font-bold text-slate-800">
            {Math.round(weather.temperature)}°{units === 'metric' ? 'C' : 'F'}
          </p>
          <p className="text-xs text-slate-600 mt-1 capitalize">
            {weather.description}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
          <div className="text-center">
            <p className="text-slate-500">💨 Vent</p>
            <p className="font-medium text-slate-700">{weather.windSpeed} m/s</p>
          </div>
          <div className="text-center">
            <p className="text-slate-500">💧 Humidité</p>
            <p className="font-medium text-slate-700">{weather.humidity}%</p>
          </div>
          <div className="text-center">
            <p className="text-slate-500">🌡️ Ressenti</p>
            <p className="font-medium text-slate-700">
              {Math.round(weather.feelsLike)}°
            </p>
          </div>
        </div>
      </div>
    </WidgetContainer>
  );
};

export default WeatherWidget;