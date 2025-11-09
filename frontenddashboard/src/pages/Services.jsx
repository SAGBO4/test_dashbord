import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarConnected from '../components/NavBarConected';
import { servicesService } from '../services/servicesService';

const Services = () => {
  const [services, setServices] = useState([]);
  const [userServices, setUserServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Charger tous les services et les services activés
      const [allServices, activeServices] = await Promise.all([
        servicesService.getAllServices(),
        servicesService.getUserServices(),
      ]);

      setServices(allServices);
      setUserServices(activeServices);
    } catch (err) {
      setError('Impossible de charger les services');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const isServiceActive = (serviceId) => {
    return userServices.some((us) => us.serviceId === serviceId && us.isActive);
  };

  const handleActivateService = async (serviceId) => {
    try {
      setActionLoading(serviceId);

      // Find the service to check if it requires OAuth
      const service = services.find(s => s.id === serviceId);

      // For Gmail (email service), redirect to OAuth instead of direct activation
      if (service && service.name === 'email' && service.requiresAuth) {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('Vous devez être connecté pour activer ce service');
          setActionLoading(null);
          return;
        }

        // Redirect to Gmail OAuth
        window.location.href = `http://localhost:3000/user-services/gmail/connect?token=${encodeURIComponent(token)}`;
        return;
      }

      // For Google Drive, redirect to OAuth instead of direct activation
      if (service && service.name === 'google_drive' && service.requiresAuth) {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('Vous devez être connecté pour activer ce service');
          setActionLoading(null);
          return;
        }

        // Redirect to Google Drive OAuth
        window.location.href = `http://localhost:3000/user-services/google-drive/connect?token=${encodeURIComponent(token)}`;
        return;
      }

      // For Calendar, redirect to OAuth instead of direct activation
      if (service && service.name === 'calendar' && service.requiresAuth) {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('Vous devez être connecté pour activer ce service');
          setActionLoading(null);
          return;
        }

        // Redirect to Calendar OAuth
        window.location.href = `http://localhost:3000/user-services/calendar/connect?token=${encodeURIComponent(token)}`;
        return;
      }

      // For other services, activate normally
      await servicesService.activateService(serviceId);
      await loadData(); // Recharger les données
    } catch (err) {
      alert('Erreur lors de l\'activation du service');
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeactivateService = async (serviceId) => {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm('Êtes-vous sûr de vouloir déconnecter ce service ?')) {
      return;
    }

    try {
      setActionLoading(serviceId);
      await servicesService.deactivateService(serviceId);
      await loadData();
    } catch (err) {
      alert('Erreur lors de la déconnexion du service');
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleViewWidgets = () => {
    navigate('/dashboard');
  };

  const getServiceIcon = (serviceName) => {
    const icons = {
      weather: 'fa-cloud-sun',
      email: 'fa-envelope',
      calendar: 'fa-calendar',
      tasks: 'fa-check-circle',
      pomodoro: 'fa-clock',
      google_drive: 'fa-brands fa-google-drive',
    };
    return icons[serviceName] || 'fa-puzzle-piece';
  };

  const getServiceColor = (serviceName) => {
    const colors = {
      weather: { bg: 'bg-blue-50', border: 'border-blue-100', icon: 'bg-blue-100', text: 'text-blue-600' },
      email: { bg: 'bg-red-50', border: 'border-red-100', icon: 'bg-red-100', text: 'text-red-600' },
      calendar: { bg: 'bg-green-50', border: 'border-green-100', icon: 'bg-green-100', text: 'text-green-600' },
      tasks: { bg: 'bg-purple-50', border: 'border-purple-100', icon: 'bg-purple-100', text: 'text-purple-600' },
      pomodoro: { bg: 'bg-orange-50', border: 'border-orange-100', icon: 'bg-orange-100', text: 'text-orange-600' },
      google_drive: { bg: 'bg-yellow-50', border: 'border-yellow-100', icon: 'bg-yellow-100', text: 'text-yellow-600' },
    };
    return colors[serviceName] || { bg: 'bg-slate-50', border: 'border-slate-100', icon: 'bg-slate-100', text: 'text-slate-600' };
  };

  if (loading) {
    return (
      <>
        <NavbarConnected />
        <div className="min-h-screen bg-slate-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-800 mx-auto"></div>
            <p className="mt-4 text-slate-600">Chargement des services...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavbarConnected />
        <div className="min-h-screen bg-slate-100 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600">{error}</p>
            <button
              onClick={loadData}
              className="mt-4 px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-700"
            >
              Réessayer
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavbarConnected />

      <div className="min-h-screen bg-slate-100 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h1 className="text-xl font-bold text-slate-800">Services disponibles</h1>
            <p className="text-xs text-slate-600 mt-1">
              Connectez vos services pour accéder aux widgets
            </p>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            <div className="bg-white rounded-lg shadow border border-slate-200 p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-check-circle text-green-600 text-lg"></i>
                </div>
                <div>
                  <p className="text-xs text-slate-600">Connectés</p>
                  <p className="text-xl font-bold text-slate-900">{userServices.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow border border-slate-200 p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-server text-purple-600 text-lg"></i>
                </div>
                <div>
                  <p className="text-xs text-slate-600">Disponibles</p>
                  <p className="text-xl font-bold text-slate-900">{services.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow border border-slate-200 p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-puzzle-piece text-blue-600 text-lg"></i>
                </div>
                <div>
                  <p className="text-xs text-slate-600">Total Widgets</p>
                  <p className="text-xl font-bold text-slate-900">
                    {services.reduce((sum, s) => sum + (s._count?.widgets || 0), 0)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => {
              const isActive = isServiceActive(service.id);
              const colors = getServiceColor(service.name);
              const isLoading = actionLoading === service.id;

              return (
                <div
                  key={service.id}
                  className="bg-white rounded-lg shadow border border-slate-200 overflow-hidden"
                >
                  <div className={`${colors.bg} border-b ${colors.border} p-4`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 ${colors.icon} rounded-lg flex items-center justify-center`}>
                          <i className={`fas ${getServiceIcon(service.name)} ${colors.text} text-lg`}></i>
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-slate-900">
                            {service.displayName}
                          </h3>
                          {isActive && (
                            <span className="inline-flex items-center space-x-1 text-xs text-green-600">
                              <i className="fas fa-check-circle"></i>
                              <span>Connecté</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <p className="text-xs text-slate-600 mb-3">{service.description}</p>

                    <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                      <span>
                        <i className="fas fa-puzzle-piece mr-1"></i>
                        {service._count?.widgets || 0} widget{service._count?.widgets > 1 ? 's' : ''}
                      </span>
                      {service.requiresAuth && (
                        <span>
                          <i className="fas fa-lock mr-1"></i>
                          Auth requise
                        </span>
                      )}
                    </div>

                    <div className="space-y-2">
                      {isActive ? (
                        <>
                          <button
                            onClick={handleViewWidgets}
                            className="w-full px-3 py-2 bg-slate-800 text-white text-xs font-semibold rounded hover:bg-slate-700 transition-colors"
                          >
                            Voir les widgets
                          </button>
                          <button
                            onClick={() => handleDeactivateService(service.id)}
                            disabled={isLoading}
                            className="w-full px-3 py-2 border border-red-300 text-red-600 text-xs font-semibold rounded hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isLoading ? 'Déconnexion...' : 'Déconnecter'}
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleActivateService(service.id)}
                          disabled={isLoading}
                          className="w-full px-3 py-2 bg-slate-800 text-white text-xs font-semibold rounded hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isLoading ? 'Connexion...' : 'Se connecter'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Message si aucun service */}
          {services.length === 0 && (
            <div className="text-center py-12">
              <i className="fas fa-server text-slate-400 text-5xl mb-4"></i>
              <p className="text-slate-600">Aucun service disponible pour le moment</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Services;