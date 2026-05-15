/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Layout/Navbar';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Jobs from './pages/Jobs';
import JobDetail from './pages/JobDetail';
import CandidateDashboard from './pages/Dashboard/CandidateDashboard';
import RecruiterDashboard from './pages/Dashboard/RecruiterDashboard';

// Protected Route Component
const ProtectedRoute = ({ children, role }: { children: React.ReactNode, role?: 'admin' | 'recruiter' | 'candidate' }) => {
  const { user, userData, loading } = useAuth();

  if (loading) return <div className="h-screen flex items-center justify-center">Chargement...</div>;
  if (!user) return <Navigate to="/login" />;
  if (role && userData?.role !== role) return <Navigate to="/" />;

  return <>{children}</>;
};

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/jobs/:id" element={<JobDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected Routes */}
              <Route 
                path="/candidate-dashboard" 
                element={
                  <ProtectedRoute role="candidate">
                    <CandidateDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/recruiter-dashboard" 
                element={
                  <ProtectedRoute role="recruiter">
                    <RecruiterDashboard />
                  </ProtectedRoute>
                } 
              />
              
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <footer className="bg-brand-primary text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-4 gap-12 mb-12">
                <div className="col-span-1 md:col-span-1">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-brand-primary font-bold text-xl mb-4">2N</div>
                  <span className="font-serif text-3xl font-bold text-brand-accent">2NG Groupe</span>
                  <p className="mt-4 text-gray-400 text-sm leading-relaxed">
                    Le leader ivoirien du recrutement de prestige. Nous connectons les talents d'exception aux entreprises visionnaires.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold mb-6 text-lg">Liens Rapides</h4>
                  <ul className="space-y-4 text-gray-400 text-sm">
                    <li><Link to="/jobs" className="hover:text-brand-accent transition-colors">Offres d'emploi</Link></li>
                    <li><button className="hover:text-brand-accent transition-colors text-left w-full">Conseils Carrière</button></li>
                    <li><button className="hover:text-brand-accent transition-colors text-left w-full">Tarifs Recruteurs</button></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-6 text-lg">Entreprise</h4>
                  <ul className="space-y-4 text-gray-400 text-sm">
                    <li><button className="hover:text-brand-accent transition-colors text-left w-full">À Propos</button></li>
                    <li><button className="hover:text-brand-accent transition-colors text-left w-full">Contact</button></li>
                    <li><button className="hover:text-brand-accent transition-colors text-left w-full">Confidentialité</button></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-6 text-lg">Newsletter</h4>
                  <p className="text-gray-400 text-sm mb-4">Recevez les meilleures opportunités chaque semaine.</p>
                  <div className="flex bg-white/5 p-1 rounded-xl">
                    <input type="email" placeholder="Email" className="bg-transparent border-none focus:outline-none px-4 text-sm w-full" />
                    <button className="bg-brand-accent text-brand-primary p-2 rounded-lg font-bold">OK</button>
                  </div>
                </div>
              </div>
              <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                <div>&copy; {new Date().getFullYear()} 2NG Groupe Entreprises. Tous droits réservés.</div>
                <div className="flex gap-8">
                  <button className="hover:text-white">LinkedIn</button>
                  <button className="hover:text-white">Twitter</button>
                  <button className="hover:text-white">Instagram</button>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </AuthProvider>
    </Router>
  );
}
