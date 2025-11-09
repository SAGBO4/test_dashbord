import { Link } from 'react-router-dom';

const NavbarLanding = () => {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">

          <Link to="/" className="flex items-center space-x-2">
            
            <span className="text-xl font-bold text-slate-800">Dashboard</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm text-slate-600 hover:text-slate-800 transition">
              Fonctionnalités
            </a>
            <a href="#widgets" className="text-sm text-slate-600 hover:text-slate-800 transition">
              Widgets
            </a>
            {/* <a href="#pricing" className="text-sm text-slate-600 hover:text-slate-800 transition">
              Tarifs
            </a>
            <a href="#contact" className="text-sm text-slate-600 hover:text-slate-800 transition">
              Contact
            </a> */}
          </div>

          <div className="flex items-center space-x-3">
            <Link 
              to="/login" 
              className="px-4 py-2 text-sm text-slate-600 hover:text-slate-800 transition"
            >
              Se connecter
            </Link>
            <Link 
              to="/register" 
              className="px-4 py-2 bg-slate-800 text-white text-sm font-medium rounded hover:bg-slate-700 transition"
            >
              Commencer gratuitement
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarLanding;