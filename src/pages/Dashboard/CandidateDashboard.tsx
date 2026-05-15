import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { applicationsService, Application } from '../../services/applicationsService';
import { jobsService, Job } from '../../services/jobsService';
import { Briefcase, Clock, CheckCircle, XCircle, ChevronRight, User, Settings } from 'lucide-react';
import { motion } from 'motion/react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Link } from 'react-router-dom';

export default function CandidateDashboard() {
  const { user, userData } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) fetchApplications();
  }, [user]);

  const fetchApplications = async () => {
    try {
      const data = await applicationsService.getApplicationsByCandidate(user!.uid);
      setApplications(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700',
    reviewed: 'bg-blue-100 text-blue-700',
    shortlisted: 'bg-purple-100 text-purple-700',
    rejected: 'bg-red-100 text-red-700',
    hired: 'bg-green-100 text-green-700',
  };

  const statusLabels = {
    pending: 'En attente',
    reviewed: 'Examinée',
    shortlisted: 'Présélectionnée',
    rejected: 'Refusée',
    hired: 'Recruté(e)',
  };

  return (
    <div className="bg-brand-light min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Profil */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center">
              <div className="w-24 h-24 bg-brand-primary rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-brand-accent italic">
                {userData?.fullName?.charAt(0)}
              </div>
              <h2 className="text-xl font-bold text-slate-800">{userData?.fullName}</h2>
              <p className="text-sm text-slate-500 mb-6">{user?.email}</p>
              
              <div className="space-y-1 pt-6 border-t border-slate-50">
                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors text-sm font-medium">
                  <User size={18} /> Profil Public
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors text-sm font-medium">
                  <Settings size={18} /> Paramètres
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="w-12 h-12 bg-orange-50 text-brand-accent rounded-lg flex items-center justify-center mb-4">
                  <Briefcase size={24} />
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Candidatures</p>
                <p className="text-3xl font-bold text-slate-800">{applications.length}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-lg flex items-center justify-center mb-4">
                  <Clock size={24} />
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">En Attente</p>
                <p className="text-3xl font-bold text-slate-800">
                  {applications.filter(a => a.status === 'pending').length}
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle size={24} />
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Entretiens</p>
                <p className="text-3xl font-bold text-slate-800">
                  {applications.filter(a => a.status === 'shortlisted').length}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-800">Mes Candidatures Récentes</h3>
                <Link to="/jobs" className="text-sm text-brand-accent font-bold hover:underline">Trouver des jobs</Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <tr>
                      <th className="px-8 py-4">Poste</th>
                      <th className="px-8 py-4">Date d'Envoi</th>
                      <th className="px-8 py-4">Status</th>
                      <th className="px-8 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {loading ? (
                      [1, 2].map(i => (
                        <tr key={i} className="animate-pulse">
                          <td colSpan={4} className="px-8 py-6 h-16 bg-white"></td>
                        </tr>
                      ))
                    ) : applications.length > 0 ? (
                      applications.map((app) => (
                        <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-8 py-6">
                            <div className="font-bold text-slate-800">CDI Consultant Finance</div>
                            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">2NG Groupe Partner</div>
                          </td>
                          <td className="px-8 py-6 text-xs font-medium text-slate-500">
                            {app.appliedAt ? format(app.appliedAt.toDate(), 'dd MMM yyyy', { locale: fr }) : '-'}
                          </td>
                          <td className="px-8 py-6">
                            <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusColors[app.status]}`}>
                              {statusLabels[app.status]}
                            </span>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <button className="text-slate-400 hover:text-brand-accent p-2 rounded-lg bg-slate-50 transition-colors">
                              <ChevronRight size={18} />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="px-8 py-12 text-center text-gray-500 italic">
                          Vous n'avez pas encore envoyé de candidature.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
