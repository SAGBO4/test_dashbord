import { Link } from 'react-router-dom';
const Footer = () => {
  return (
<footer className="bg-white border-t border-slate-200 py-12">
    <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-1">
            <div>
                <div className="flex items-center space-x-2 mb-4">
                    <span className="font-bold text-slate-800">Dashboard</span>
                </div>
                <p className="text-sm text-slate-600">
                    Votre espace de productivité centralisé et personnalisable.
                </p>
            </div>
            
        </div>
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-slate-600">&copy; 2025 Dashboard. Tous droits réservés.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
                <Link to="" className="text-slate-400 hover:text-slate-600">
                    <i className="fab fa-twitter text-xl"></i>
                </Link>
                <Link to="" className="text-slate-400 hover:text-slate-600">
                    <i className="fab fa-github text-xl"></i>
                </Link>
                <Link to="" className="text-slate-400 hover:text-slate-600">
                    <i className="fab fa-linkedin text-xl"></i>
                </Link>
            </div>
        </div>
    </div>
</footer>
  );
};

export default Footer;


