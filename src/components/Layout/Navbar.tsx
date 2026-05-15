import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { auth } from '../../firebase/config';
import { LogOut, User, Briefcase, Bell, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const { user, userData, isRecruiter, isCandidate } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-slate-800 rounded flex items-center justify-center text-white font-bold text-lg italic">2N</div>
              <span className="font-bold text-xl tracking-tight text-slate-800">2NG <span className="text-brand-accent">Groupe</span></span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-slate-500 hover:text-brand-accent font-medium text-sm transition-colors">Accueil</Link>
            <Link to="/jobs" className="text-slate-500 hover:text-slate-800 font-medium text-sm">Offres d'emploi</Link>
            {user ? (
              <>
                <Link to={isRecruiter ? "/recruiter-dashboard" : "/candidate-dashboard"} className="text-brand-accent font-bold text-sm">Dashboard</Link>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-2 h-2 bg-red-500 rounded-full absolute -top-0.5 -right-0.5 border-2 border-white"></div>
                    <Bell className="w-5 h-5 text-slate-400" />
                  </div>
                  <div className="h-8 w-8 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-xs font-bold text-slate-600">
                    {userData?.fullName?.split(' ').map((n: string) => n[0]).join('') || 'JD'}
                  </div>
                  <button onClick={handleLogout} className="text-slate-400 hover:text-slate-600">
                    <LogOut size={18} />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-6">
                <Link to="/login" className="text-slate-600 font-medium text-sm">Connexion</Link>
                <Link to="/register" className="premium-btn-primary py-2 px-6 text-sm">S'inscrire</Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white border-b border-gray-100 px-4 py-6"
          >
            <div className="flex flex-col space-y-4">
              <Link to="/" onClick={() => setIsOpen(false)} className="text-gray-600 font-medium">Accueil</Link>
              <Link to="/jobs" onClick={() => setIsOpen(false)} className="text-gray-600 font-medium">Offres d'emploi</Link>
              {user ? (
                <>
                  <Link to={isRecruiter ? "/recruiter-dashboard" : "/candidate-dashboard"} onClick={() => setIsOpen(false)} className="text-gray-600 font-medium">Dashboard</Link>
                  <button onClick={handleLogout} className="text-left text-red-600 font-medium pt-4 border-t border-gray-50">Déconnexion</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)} className="text-gray-600 font-medium">Connexion</Link>
                  <Link to="/register" onClick={() => setIsOpen(false)} className="premium-btn-primary text-center">S'inscrire</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
