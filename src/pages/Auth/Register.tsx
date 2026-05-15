import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../firebase/config';
import { Mail, Lock, User, UserPlus, Briefcase, Users, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<'candidate' | 'recruiter'>('candidate');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create user profile in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email,
        fullName,
        role,
        createdAt: serverTimestamp(),
        profilePic: '',
        bio: ''
      });

      // If recruiter, create recruiter profile
      if (role === 'recruiter') {
        await setDoc(doc(db, 'recruiters', user.uid), {
          uid: user.uid,
          companyName: fullName, // Initial name
          logoUrl: '',
          description: '',
          status: 'pending'
        });
      }

      navigate('/');
    } catch (err: any) {
      setError('Impossible de créer le compte. Vérifiez vos informations.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 bg-brand-light">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full bg-white p-10 rounded-xl shadow-xl border border-slate-100"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-800">Bâtissez votre Avenir</h2>
          <p className="mt-2 text-slate-500 text-sm">Rejoignez l'élite professionnelle 2NG</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 text-sm mb-8">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <form className="grid md:grid-cols-2 gap-8" onSubmit={handleRegister}>
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-widest">Nom Complet</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                  <User size={18} />
                </span>
                <input
                  type="text"
                  required
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-accent transition-all text-sm text-slate-800"
                  placeholder="Jean Dupont"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            </div>

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
                  placeholder="nom@domaine.com"
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
            </div>
          </div>

          <div className="space-y-6">
            <label className="block text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-widest">Je suis un...</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setRole('candidate')}
                className={`p-6 rounded-xl border flex flex-col items-center gap-3 transition-all ${role === 'candidate' ? 'border-brand-accent bg-orange-50 text-brand-accent' : 'border-slate-100 text-slate-400'}`}
              >
                <Users size={32} />
                <span className="text-xs font-bold uppercase tracking-wider">Candidat</span>
              </button>
              <button
                type="button"
                onClick={() => setRole('recruiter')}
                className={`p-6 rounded-xl border flex flex-col items-center gap-3 transition-all ${role === 'recruiter' ? 'border-brand-accent bg-orange-50 text-brand-accent' : 'border-slate-100 text-slate-400'}`}
              >
                <Briefcase size={32} />
                <span className="text-xs font-bold uppercase tracking-wider">Recruteur</span>
              </button>
            </div>
            
            <p className="text-[10px] text-slate-400 leading-relaxed pt-4 font-medium uppercase tracking-wider">
              En créant un compte, vous acceptez les conditions générales d'utilisation et la politique de confidentialité de 2NG Groupe.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full premium-btn-primary flex justify-center items-center gap-3 mt-4"
            >
              {loading ? 'Création...' : <><UserPlus size={20} /> S'inscrire</>}
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-500 mt-10">
          Vous avez déjà un compte ?{' '}
          <Link to="/login" className="text-brand-primary font-bold hover:underline">Se connecter</Link>
        </p>
      </motion.div>
    </div>
  );
}
