import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavbarConnected = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <nav className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-full mx-auto px-6">
        <div className="flex justify-between items-center h-14">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <span className="text-white font-semibold text-sm">Dashboard</span>
            </div>
            <div className="hidden md:flex space-x-1 text-xs">
              <Link
                to="/dashboard"
                className="px-3 py-2 text-white bg-slate-700 rounded"
              >
                Dashboard
              </Link>
              <Link
                to="/services"
                className="px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded"
              >
                Services
              </Link>
              <Link
                to="/profile"
                className="px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded"
              >
                Profile
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 bg-slate-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                {user ? getInitials(user.username) : 'U'}
              </div>
              <span className="text-slate-300 text-xs hidden md:block">
                {user ? user.username : 'User'}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="text-xs text-slate-400 hover:text-white flex items-center space-x-1"
            >
              <i className="fas fa-sign-out-alt"></i>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarConnected;