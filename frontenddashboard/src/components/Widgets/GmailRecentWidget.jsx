/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { gmailService } from '../../services/gmailService';
import WidgetContainer from './WidgetContainer';

const GmailRecentWidget = ({ maxResults = 10, onRemove }) => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notConnected, setNotConnected] = useState(false);

  useEffect(() => {
    loadEmails();
    const interval = setInterval(loadEmails, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, [maxResults]);

  const loadEmails = async () => {
    try {
      setLoading(true);
      setError(null);
      setNotConnected(false);

      const status = await gmailService.getStatus();
      
      if (!status.connected) {
        setNotConnected(true);
        setLoading(false);
        return;
      }

      const data = await gmailService.getRecentEmails(maxResults);
      setEmails(data);
    } catch (err) {
      setError('Impossible de charger les emails');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleConnectGmail = () => {
    window.location.href = 'http://localhost:3000/auth/google';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);

    if (diffMins < 60) return `il y a ${diffMins} min`;
    if (diffHours < 24) return `il y a ${diffHours}h`;
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  };

  if (loading) {
    return (
      <WidgetContainer title="Emails récents" icon="fas fa-inbox" onRemove={onRemove}>
        <div className="text-center py-8 text-xs text-slate-500">
          <i className="fas fa-spinner fa-spin text-lg mb-2"></i>
          <p>Chargement...</p>
        </div>
      </WidgetContainer>
    );
  }

  if (notConnected) {
    return (
      <WidgetContainer title="Emails récents" icon="fas fa-inbox" onRemove={onRemove}>
        <div className="text-center py-8">
          <i className="fas fa-envelope-open-text text-3xl text-slate-300 mb-3"></i>
          <p className="text-xs text-slate-600 mb-3">Gmail non connecté</p>
          <button
            onClick={handleConnectGmail}
            className="px-4 py-2 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 transition-colors"
          >
            <i className="fab fa-google mr-1"></i>
            Se connecter avec Google
          </button>
        </div>
      </WidgetContainer>
    );
  }

  if (error) {
    return (
      <WidgetContainer title="Emails récents" icon="fas fa-inbox" onRemove={onRemove}>
        <div className="text-center py-8 text-xs text-red-600">
          <i className="fas fa-exclamation-triangle text-lg mb-2"></i>
          <p>{error}</p>
          <button
            onClick={loadEmails}
            className="mt-2 text-slate-600 hover:text-slate-800 underline"
          >
            Réessayer
          </button>
        </div>
      </WidgetContainer>
    );
  }

  if (emails.length === 0) {
    return (
      <WidgetContainer title="Emails récents" icon="fas fa-inbox" onRemove={onRemove}>
        <div className="text-center py-8 text-slate-500">
          <i className="fas fa-inbox text-3xl text-slate-300 mb-2"></i>
          <p className="text-xs">Aucun email récent</p>
        </div>
      </WidgetContainer>
    );
  }

  return (
    <WidgetContainer 
      title="Emails récents" 
      icon="fas fa-inbox" 
      badge={emails.length}
      onRemove={onRemove}
    >
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {emails.map((email) => (
          <a
            key={email.id}
            href={`https://mail.google.com/mail/u/0/#inbox/${email.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-2 border-l-2 border-slate-300 hover:bg-slate-50 hover:border-blue-500 cursor-pointer transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  {email.isUnread && (
                    <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                  )}
                  <p className={`text-xs truncate ${email.isUnread ? 'font-semibold text-slate-900' : 'font-medium text-slate-800'}`}>
                    {email.subject || '(Sans objet)'}
                  </p>
                </div>
                <p className="text-xs text-slate-500 truncate ml-4">{email.from}</p>
                <p className="text-xs text-slate-400 line-clamp-2 mt-1 ml-4">
                  {email.snippet}
                </p>
              </div>
              <span className="text-xs text-slate-400 ml-2 flex-shrink-0">
                {formatDate(email.date)}
              </span>
            </div>
          </a>
        ))}
      </div>
      <button
        onClick={loadEmails}
        className="w-full mt-3 text-xs text-slate-500 hover:text-slate-700 py-2 border border-slate-200 rounded hover:bg-slate-50 transition-colors"
      >
        <i className="fas fa-sync-alt mr-1"></i>
        Rafraîchir
      </button>
    </WidgetContainer>
  );
};

export default GmailRecentWidget;