import NavbarLanding from "../components/NavbarLanding";
import Footer from "../components/footer";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <NavbarLanding />

      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="fade-in">
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                Centralisez votre productivité
              </h1>
              <p className="text-xl text-slate-600 mb-8">
                Un tableau de bord qui regroupe tous vos outils essentiels.
                Gmail, Weather, Calendar, et bien plus.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-8 py-4 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-700 transition-all transform hover:scale-105"
                >
                  <i className="fas fa-rocket mr-2"></i>
                  Démarrer gratuitement
                </Link>
              </div>
              <div className="mt-8 flex items-center space-x-6 text-sm text-slate-600">
                <div className="flex items-center space-x-2">
                  <i className="fas fa-check-circle text-green-600"></i>
                  <span>Gratuit pour utilisation simple</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="fas fa-check-circle text-green-600"></i>
                  <span>Top 1 des plateformes de productivité</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-slate-600 to-slate-800 rounded-lg blur-2xl opacity-20"></div>
              <div className="relative bg-white rounded-lg shadow-2xl p-4">
                <div className="bg-slate-800 rounded-t px-3 py-2 flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="p-6 space-y-3">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-blue-50 border border-blue-200 rounded p-3 h-24"></div>
                    <div className="bg-green-50 border border-green-200 rounded p-3 h-24"></div>
                    <div className="bg-purple-50 border border-purple-200 rounded p-3 h-24"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-orange-50 border border-orange-200 rounded p-3 h-32"></div>
                    <div className="bg-pink-50 border border-pink-200 rounded p-3 h-32"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Tout ce dont vous avez besoin
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Des fonctionnalités puissantes conçues pour booster votre
              productivité
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border border-slate-200 rounded-lg hover:shadow-lg transition-shadow card-hover">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-puzzle-piece text-blue-600 text-xl"></i>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Widgets personnalisables
              </h3>
              <p className="text-slate-600">
                Créez votre espace de travail idéal avec des widgets drag & drop
                entièrement personnalisables.
              </p>
            </div>

            <div className="p-6 border border-slate-200 rounded-lg hover:shadow-lg transition-shadow card-hover">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-sync text-green-600 text-xl"></i>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Synchronisation
              </h3>
              <p className="text-slate-600">
                Vos données sont synchronisées instantanément sur tous vos
                appareils.
              </p>
            </div>

            <div className="p-6 border border-slate-200 rounded-lg hover:shadow-lg transition-shadow card-hover">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-plug text-purple-600 text-xl"></i>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Intégrations
              </h3>
              <p className="text-slate-600">
                Connectez Gmail, Calendar, Weather, et bien d'autres outils.
              </p>
            </div>

            <div className="p-6 border border-slate-200 rounded-lg hover:shadow-lg transition-shadow card-hover">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-eye text-orange-600 text-xl"></i>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Vue centralisée
              </h3>
              <p className="text-slate-600">
                Consultez toutes vos informations importantes au même endroit,
                sans changer d’onglet.
              </p>
            </div>

            <div className="p-6 border border-slate-200 rounded-lg hover:shadow-lg transition-shadow card-hover">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-shield-alt text-red-600 text-xl"></i>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Sécurisé
              </h3>
              <p className="text-slate-600">
                Vos informations restent privées, sécurisées et entre de bonnes
                mains.
              </p>
            </div>

            <div className="p-6 border border-slate-200 rounded-lg hover:shadow-lg transition-shadow card-hover">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-mobile-alt text-yellow-600 text-xl"></i>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                100% Responsive
              </h3>
              <p className="text-slate-600">
                Une expérience optimale sur desktop, tablette et mobile.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="widgets" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              18+ Widgets professionnels
            </h2>
            <p className="text-xl text-slate-600">
              Tous les outils dont vous avez besoin, centralisés en un seul
              endroit
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg border border-slate-200 text-center">
              <i className="fas fa-calendar-alt text-3xl text-slate-600 mb-2"></i>
              <p className="text-sm font-medium text-slate-800">
                Événements du jour
              </p>
            </div>
            

            <div className="bg-white p-4 rounded-lg border border-slate-200 text-center">
              <i className="fas fa-envelope text-3xl text-slate-600 mb-2"></i>
              <p className="text-sm font-medium text-slate-800">
                Emails non lus
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-slate-200 text-center">
              <i className="fas fa-cloud-sun text-3xl text-slate-600 mb-2"></i>
              <p className="text-sm font-medium text-slate-800">
                Météo du jour
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-slate-200 text-center">
              <i className="fas fa-stopwatch text-3xl text-slate-600 mb-2"></i>
              <p className="text-sm font-medium text-slate-800">
                Timer Pomodoro
              </p>
            </div>
            
          </div>

          <div className="text-center mt-8">
            <Link
              to="./auth/register.html"
              className="inline-flex items-center text-slate-800 font-semibold hover:text-slate-600"
            >
              Découvrir tous les widgets
              <i className="fas fa-arrow-right ml-2"></i>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Prêt à booster votre productivité ?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Rejoignez des milliers d'utilisateurs qui ont déjà transformé leur
            façon de travailler
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-800 font-semibold rounded-lg hover:bg-slate-100 transition-all transform hover:scale-105"
            >
              <i className="fas fa-rocket mr-2"></i>
              Commencer maintenant
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-slate-800 transition-all"
            >
              <i className="fas fa-sign-in-alt mr-2"></i>
              Se connecter
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default HomePage;
