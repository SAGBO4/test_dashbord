const DashboardHeader = ({ onAddWidget }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div>
        <h1 className="text-xl font-bold text-slate-800">Tableau de bord</h1>
        <p className="text-xs text-slate-500">
          {new Date().toLocaleString("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
      <button
        onClick={onAddWidget}
        className="px-4 py-2 bg-slate-800 text-white text-xs font-medium rounded hover:bg-slate-700 transition-colors"
      >
        <i className="fas fa-plus mr-1"></i>Ajouter un widget
      </button>
    </div>
  );
};

export default DashboardHeader;