import {useEffect} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';

const AuthCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get('token');

        if(token) {
            localStorage.setItem('token', token);

            fetch('http://localhost:3000/auth/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => res.json())
            .then(user => {
                localStorage.setItem('user', JSON.stringify(user));
                navigate('/dashboard');
            })
            .catch(() => {
                navigate('/dashboard');
            });
        }
    }, [searchParams, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
            <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-slate-800 mb-4"></div>
                <p className="text-slate-600 text-sm">Login...</p>
            </div>
        </div>
    );
};

export default AuthCallback;