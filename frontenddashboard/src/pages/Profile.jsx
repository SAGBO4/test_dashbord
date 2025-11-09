import {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import NavbarConnected from "../components/NavBarConected";
import {userService} from '../services/userService';
import {authService} from '../services/authService';

const Profile = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [user, setUser] = useState({
        username: '',
        email: '',
        authProvider: 'LOCAL',
    });
    const [originalUser, setOriginalUser] = useState(null);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            setLoading(true);
            const data = await userService.getProfile();
            setUser({
                username: data.username || '',
                email: data.email || '',
                authProvider: data.authProvider || 'LOCAL',
            });
            setOriginalUser(data);
        } catch(err) {
            console.error('Erreur lors du chargement du profil', err);
            alert('Impossible de charger le profil');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setUser({...user, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);
            await userService.updateProfile({
                username: user.username,
            });

            // update localStorage
            const updatedUser = {...originalUser, username: user.username};
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setOriginalUser(updatedUser);

            alert('Profil mis à jour avec succès');
        } catch(err) {
            console.error('Erreur lors de la mise à jour', err);
            alert('Erreur lors de la mise à jour du profil');
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        setUser({
            username: originalUser.username || '',
            email: originalUser.email || '',
            authProvider: originalUser.authProvider || 'LOCAL',
        });
    };

    const handleDeleteAccount = async () => {
        const confirmation = window.confirm(
            "Êtes-vous sûr de vouloir supprimer votre compte ?\n\nCette action est irréversible et supprimera toutes vos données."
        );

        if(!confirmation) return;

        const doubleConfirmation = window.prompt(
            'Tapez "SUPPRIMER" en majuscules pour confirmer la suppression de votre compte :'
        );

        if(doubleConfirmation !== 'SUPPRIMER') {
            alert('Suppression annulée');
            return;
        }

        try {
            await userService.deleteAccount();
            authService.logout();
            alert('Votre compte a été supprimé');
            navigate('/login');
        } catch(err) {
            console.error('Erreur lors de la suppression', err);
            alert('Erreur lors de la suppression du compte');
        }
    };

    const getInitials = (username) => {
        if(!username) return '?';
        const parts = username.split(' ');
        if(parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return username.substring(0, 2).toUpperCase();
    };

    if(loading) {
        return (
            <>
                <NavbarConnected />
                <div className="max-w-6xl mx-auto px-6 py-6">
                    <div className="text-center py-20">
                        <i className="fas fa-spinner fa-spin text-4xl text-slate-400 mb-4"></i>
                        <p className="text-slate-600">Chargement du profil...</p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <NavbarConnected />

            <div className="max-w-6xl mx-auto px-6 py-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-slate-800">Paramètres</h1>
                    <p className="text-sm text-slate-600 mt-1">
                        Gérez votre profil et vos préférences
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow border border-slate-200 p-3">
                            <nav className="space-y-1">

                                <a href="#profil"
                                    className="flex items-center space-x-2 px-3 py-2 bg-slate-100 text-slate-800 rounded text-sm font-medium"
                                >
                                    <i className="fas fa-user text-xs"></i>
                                    <span>Profil</span>
                                </a>
                                <Link
                                    to="/services"
                                    className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded text-sm"
                                >
                                    <i className="fas fa-cog text-xs"></i>
                                    <span>Services</span>
                                </Link>
                            </nav>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Informations du profil */}
                        <div
                            id="profil"
                            className="bg-white rounded-lg shadow border border-slate-200 p-6"
                        >
                            <h2 className="text-lg font-bold text-slate-800 mb-4">
                                Informations du profil
                            </h2>

                            {/* Avatar */}
                            <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-slate-200">
                                <div className="w-20 h-20 bg-slate-600 rounded-full flex items-center justify-center text-white text-2xl font-semibold">
                                    {getInitials(user.username)}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-800">
                                        {user.username}
                                    </p>
                                    <p className="text-xs text-slate-500 mt-1">{user.email}</p>
                                    {user.authProvider === 'GOOGLE' && (
                                        <span className="inline-flex items-center px-2 py-1 mt-2 text-xs font-medium text-blue-800 bg-blue-100 rounded">
                                            <i className="fab fa-google mr-1"></i>
                                            Connecté via Google
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Formulaire */}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                                        Nom d'utilisateur *
                                    </label>
                                    <input
                                        type="text"
                                        name="username"
                                        value={user.username}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:border-slate-500 focus:ring-1 focus:ring-slate-500 outline-none"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={user.email}
                                        disabled
                                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded bg-slate-50 text-slate-500 cursor-not-allowed"
                                    />
                                    <p className="text-xs text-slate-500 mt-1">
                                        L'email ne peut pas être modifié
                                    </p>
                                </div>

                                <div className="flex justify-end space-x-2 pt-4">
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="px-4 py-2 border border-slate-300 text-slate-600 text-sm font-medium rounded hover:bg-slate-50"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="px-4 py-2 bg-slate-800 text-white text-sm font-medium rounded hover:bg-slate-700 disabled:bg-slate-400 disabled:cursor-not-allowed"
                                    >
                                        {saving ? (
                                            <>
                                                <i className="fas fa-spinner fa-spin mr-1"></i>
                                                Enregistrement...
                                            </>
                                        ) : (
                                            <>
                                                <i className="fas fa-save mr-1"></i>
                                                Enregistrer
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Zone dangereuse */}
                        <div className="bg-white rounded-lg shadow border border-red-200 p-6">
                            <h2 className="text-lg font-bold text-red-800 mb-4">
                                Zone dangereuse
                            </h2>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-4 border border-slate-200 rounded">
                                    <div>
                                        <p className="text-sm font-medium text-slate-800">
                                            Supprimer le compte
                                        </p>
                                        <p className="text-xs text-slate-600">
                                            Cette action est irréversible et supprimera toutes vos
                                            données
                                        </p>
                                    </div>
                                    <button
                                        onClick={handleDeleteAccount}
                                        className="px-3 py-1.5 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700"
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;