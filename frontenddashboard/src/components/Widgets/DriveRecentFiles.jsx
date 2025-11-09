/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { googleDriveService } from '../../services/googleDriveService';
import WidgetContainer from './WidgetContainer';

const DriveRecentFilesWidget = ({ pageSize = 10, onRemove }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notConnected, setNotConnected] = useState(false);

  useEffect(() => {
    fetchRecentFiles();
    const interval = setInterval(fetchRecentFiles, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [pageSize]);

  const fetchRecentFiles = async () => {
    try {
      setLoading(true);
      setError(null);
      setNotConnected(false);

      const data = await googleDriveService.getRecentFiles(pageSize);

      setFiles(data);
    } catch (err) {
      if (err.message.includes('not connected') || err.message.includes('401')) {
        setNotConnected(true);
      } else {
        setError('Impossible de charger les fichiers');
      }
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);

    if (diff < 3600) return `il y a ${Math.floor(diff / 60)} min`;
    if (diff < 86400) return `il y a ${Math.floor(diff / 3600)}h`;
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' });
  };

  const getFileIcon = (mimeType) => {
    if (mimeType.includes('pdf')) return 'fas fa-file-pdf text-red-500';
    if (mimeType.includes('image')) return 'fas fa-file-image text-blue-500';
    if (mimeType.includes('document')) return 'fas fa-file-word text-blue-600';
    if (mimeType.includes('spreadsheet')) return 'fas fa-file-excel text-green-600';
    if (mimeType.includes('presentation')) return 'fas fa-file-powerpoint text-orange-600';
    if (mimeType.includes('video')) return 'fas fa-file-video text-purple-600';
    if (mimeType.includes('audio')) return 'fas fa-file-audio text-indigo-600';
    if (mimeType.includes('folder')) return 'fas fa-folder text-yellow-600';
    return 'fas fa-file text-slate-500';
  };

  if (loading) {
    return (
      <WidgetContainer title="Fichiers récents" icon="fab fa-google-drive" onRemove={onRemove}>
        <div className="text-center py-8 text-xs text-slate-500">
          <i className="fas fa-spinner fa-spin text-lg mb-2"></i>
          <p>Chargement...</p>
        </div>
      </WidgetContainer>
    );
  }

  if (notConnected) {
    return (
      <WidgetContainer title="Fichiers récents" icon="fab fa-google-drive" onRemove={onRemove}>
        <div className="text-center py-8">
          <i className="fab fa-google-drive text-3xl text-slate-300 mb-3"></i>
          <p className="text-xs text-slate-600 mb-3">Google Drive non connecté</p>
          <button
            onClick={() => window.location.href = '/services'}
            className="px-4 py-2 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 transition-colors"
          >
            <i className="fab fa-google mr-1"></i>
            Connecter Google Drive
          </button>
        </div>
      </WidgetContainer>
    );
  }

  if (error) {
    return (
      <WidgetContainer title="Fichiers récents" icon="fab fa-google-drive" onRemove={onRemove}>
        <div className="text-center py-8 text-xs text-red-600">
          <i className="fas fa-exclamation-triangle text-lg mb-2"></i>
          <p>{error}</p>
          <button
            onClick={fetchRecentFiles}
            className="mt-2 text-slate-600 hover:text-slate-800 underline"
          >
            Réessayer
          </button>
        </div>
      </WidgetContainer>
    );
  }

  return (
    <WidgetContainer 
      title="Fichiers récents" 
      icon="fab fa-google-drive"
      badge={files.length > 0 ? files.length : null}
      onRemove={onRemove}
    >
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {files.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <i className="fas fa-folder-open text-3xl text-slate-300 mb-2"></i>
            <p className="text-xs">Aucun fichier récent</p>
          </div>
        ) : (
          files.map((file) => (
            <a
              key={file.id}
              href={file.webViewLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start space-x-3 p-2 hover:bg-slate-50 rounded cursor-pointer transition-colors border-l-2 border-transparent hover:border-blue-500"
            >
              <i className={`${getFileIcon(file.mimeType)} text-sm mt-0.5 flex-shrink-0`}></i>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-800 truncate">
                  {file.name}
                </p>
                <p className="text-xs text-slate-500">
                  {formatDate(file.modifiedTime)}
                </p>
              </div>
              <i className="fas fa-external-link-alt text-slate-300 text-xs mt-1 flex-shrink-0"></i>
            </a>
          ))
        )}
      </div>

      <button
        onClick={fetchRecentFiles}
        className="w-full mt-3 text-xs text-slate-500 hover:text-slate-700 py-2 border border-slate-200 rounded hover:bg-slate-50 transition-colors"
      >
        <i className="fas fa-sync-alt mr-1"></i>
        Rafraîchir
      </button>
    </WidgetContainer>
  );
};

export default DriveRecentFilesWidget;