import { useState } from 'react';
import WidgetContainer from './WidgetContainer';

const NotesWidget = ({ onRemove }) => {
  const [notes, setNotes] = useState(
    '- Valider les spécifications avec le client\n- Tester la nouvelle fonctionnalité d\'authentification\n- Préparer les slides pour jeudi'
  );

  return (
    <WidgetContainer title="Notes" icon="fas fa-sticky-note" onRemove={onRemove}>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="w-full h-32 text-xs p-2 border border-slate-200 rounded resize-none focus:outline-none focus:border-slate-400"
        placeholder="Vos notes rapides..."
      />
      <div className="mt-2 flex justify-between items-center text-xs text-slate-500">
        <span>Dernière modif: il y a 5 min</span>
        <button className="text-slate-600 hover:text-slate-800">
          <i className="fas fa-save"></i>
        </button>
      </div>
    </WidgetContainer>
  );
};

export default NotesWidget;