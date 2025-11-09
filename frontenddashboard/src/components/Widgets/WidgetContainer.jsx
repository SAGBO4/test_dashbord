const WidgetContainer = ({ title, icon, badge, children, onRemove }) => {
  return (
    <div className="widget-card bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          {icon && <i className={`${icon} text-slate-600 text-sm`}></i>}
          <h3 className="font-semibold text-sm text-slate-800">{title}</h3>
        </div>
        <div className="flex items-center space-x-2">
          {badge && (
            <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
              {badge}
            </span>
          )}
          {onRemove && (
            <button
              onClick={onRemove}
              className="text-slate-400 hover:text-red-600 text-xs transition-colors"
              title="Supprimer le widget"
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
      </div>
      <div className="widget-content">{children}</div>
    </div>
  );
};

export default WidgetContainer;