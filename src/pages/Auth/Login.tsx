import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { Mail, Lock, LogIn, Chrome, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err: any) {
      setError('Identifiants invalides ou problème de connexion.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 bg-brand-light">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-10 rounded-xl shadow-xl space-y-8 border border-slate-100"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-800">Bon Retour</h2>
          <p className="mt-2 text-slate-500 text-sm">Accédez à votre espace prestige 2NG</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 text-sm">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-widest">Email Professional</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                <Mail size={18} />
              </span>
              <input
                type="email"
                required
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-accent transition-all text-sm text-slate-800"
                placeholder="nom@entreprise.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-widest">Mot de Passe</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                <Lock size={18} />
              </span>
              <input
                type="password"
                required
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-accent transition-all text-sm text-slate-800"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="text-right mt-2">
              <Link to="/reset-password" name="reset-password-link" className="text-xs text-brand-accent font-semibold hover:underline">Mot de passe oublié ?</Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full premium-btn-primary flex justify-center items-center gap-3"
          >
            {loading ? 'Connexion...' : <><LogIn size={20} /> Se Connecter</>}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-4 text-gray-400 font-bold">Ou continuer avec</span>
          </div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 px-6 py-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-all font-medium text-brand-primary"
        >
          <Chrome className="text-brand-accent" size={20} />
          Google Identity
        </button>

        <p className="text-center text-sm text-gray-500">
          Pas encore de compte ?{' '}
          <Link to="/register" className="text-brand-primary font-bold hover:underline">Créer un compte</Link>
        </p>
      </motion.div>
    </div>
  );
}
