/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { googleDriveService } from '../../services/googleDriveService';
import WidgetContainer from './WidgetContainer';

const DriveFilesByTypeWidget = ({ mimeType = 'application/pdf', onRemove }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notConnected, setNotConnected] = useState(false);

  const mimeTypeLabels = {
    'application/pdf': 'Documents PDF',
    'image/jpeg': 'Images JPEG',
    'image/png': 'Images PNG',
    'application/vnd.google-apps.document': 'Google Docs',
    'application/vnd.google-apps.spreadsheet': 'Google Sheets',
    'application/vnd.google-apps.presentation': 'Google Slides',
    'application/vnd.google-apps.folder': 'Dossiers',
    'video/mp4': 'Vidéos MP4',
  };

  const mimeTypeIcons = {
    'application/pdf': 'fas fa-file-pdf text-red-500',
    'image/jpeg': 'fas fa-file-image text-blue-500',
    'image/png': 'fas fa-file-image text-blue-500',
    'application/vnd.google-apps.document': 'fas fa-file-word text-blue-600',
    'application/vnd.google-apps.spreadsheet': 'fas fa-file-excel text-green-600',
    'application/vnd.google-apps.presentation': 'fas fa-file-powerpoint text-orange-600',
    'application/vnd.google-apps.folder': 'fas fa-folder text-yellow-600',
    'video/mp4': 'fas fa-file-video text-purple-600',
  };

  useEffect(() => {
    fetchFilesByType();
    const interval = setInterval(fetchFilesByType, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [mimeType]);

  const fetchFilesByType = async () => {
    try {
      setLoading(true);
      setError(null);
      setNotConnected(false);

      const data = await googleDriveService.getFilesByType(mimeType);
      setFiles(data);
    } catch (err) {
      if (err.message.includes('not connected') || err.message.includes('401')) {
        setNotConnected(true);
      } else {
        setError('Impossible de charger les fichiers');
      }
      console.error('Error loading files by type:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <WidgetContainer 
        title={mimeTypeLabels[mimeType] || 'Fichiers'} 
        icon={mimeTypeIcons[mimeType] || 'fab fa-google-drive'}
        onRemove={onRemove}
      >
        <div className="text-center py-8 text-xs text-slate-500">
          <i className="fas fa-spinner fa-spin text-lg mb-2"></i>
          <p>Chargement...</p>
        </div>
      </WidgetContainer>
    );
  }

  if (notConnected) {
    return (
      <WidgetContainer 
        title={mimeTypeLabels[mimeType] || 'Fichiers'} 
        icon={mimeTypeIcons[mimeType] || 'fab fa-google-drive'}
        onRemove={onRemove}
      >
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
      <WidgetContainer 
        title={mimeTypeLabels[mimeType] || 'Fichiers'} 
        icon={mimeTypeIcons[mimeType] || 'fab fa-google-drive'}
        onRemove={onRemove}
      >
        <div className="text-center py-8 text-xs text-red-600">
          <i className="fas fa-exclamation-triangle text-lg mb-2"></i>
          <p>{error}</p>
          <button
            onClick={fetchFilesByType}
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
      title={mimeTypeLabels[mimeType] || 'Fichiers'} 
      icon={mimeTypeIcons[mimeType] || 'fab fa-google-drive'}
      badge={files.length > 0 ? files.length : null}
      onRemove={onRemove}
    >
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {files.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <i className="fas fa-folder-open text-3xl text-slate-300 mb-2"></i>
            <p className="text-xs">Aucun fichier trouvé</p>
          </div>
        ) : (
          files.map((file) => (
            <a
              key={file.id}
              href={file.webViewLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2 hover:bg-slate-50 rounded cursor-pointer transition-colors border-l-2 border-slate-200 hover:border-blue-500"
            >
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-800 truncate">
                  {file.name}
                </p>
                <p className="text-xs text-slate-500">
                  Modifié: {formatDate(file.modifiedTime)}
                </p>
              </div>
              <i className="fas fa-external-link-alt text-slate-300 text-xs ml-2"></i>
            </a>
          ))
        )}
      </div>

      <button
        onClick={fetchFilesByType}
        className="w-full mt-3 text-xs text-slate-500 hover:text-slate-700 py-2 border border-slate-200 rounded hover:bg-slate-50 transition-colors"
      >
        <i className="fas fa-sync-alt mr-1"></i>
        Rafraîchir
      </button>
    </WidgetContainer>
  );
};

export default DriveFilesByTypeWidget;