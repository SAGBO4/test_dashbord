import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);

    if (!result.success) {
      setError('Email or password is incorrect');
      setLoading(false);
    } else {
      navigate('/dashboard');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3000/auth/google';
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-xs text-slate-600 mt-1">Connect to your space</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-xs text-red-600">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow border border-slate-200 p-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre.email@epitech.eu"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:border-slate-500 focus:ring-1 focus:ring-slate-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:border-slate-500 focus:ring-1 focus:ring-slate-500 outline-none"
                required
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="w-3 h-3 text-slate-600 border-slate-300 rounded"
                />
                <span className="ml-2 text-slate-600">Se souvenir</span>
              </label>
              <Link to="#" className="text-slate-600 hover:text-slate-800">
                Mot de passe oublié ?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-3 w-full bg-slate-800 text-white py-2 text-sm font-medium rounded hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Login...' : 'Login'}
            </button>
          </form>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-white text-xs text-slate-500">
                Or signin with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1">
            <button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center py-2 border border-slate-300 rounded hover:bg-slate-50 transition-colors"
            >
              <i className="fab fa-google text-slate-600"></i>
            </button>
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="text-xs text-slate-600">
            I have not an account{' '}
            <Link
              to="/register"
              className="font-semibold text-slate-800 hover:underline"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;