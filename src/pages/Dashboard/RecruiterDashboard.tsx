import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { jobsService, Job } from '../../services/jobsService';
import { applicationsService, Application } from '../../services/applicationsService';
import { Plus, Briefcase, Users, FileText, Send, X, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function RecruiterDashboard() {
  const { user, userData } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [showJobModal, setShowJobModal] = useState(false);

  // Job Form State
  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    category: 'Finance',
    type: 'CDI',
    location: 'Abidjan',
    salary: '',
    requirements: ''
  });

  useEffect(() => {
    if (user) fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // In practice, we'd add getJobsByRecruiter
      const result = await jobsService.getJobs({});
      setJobs(result?.jobs.filter(j => j.recruiterId === user!.uid) || []);
      
      const apps = await applicationsService.getApplicationsByRecruiter(user!.uid);
      setApplications(apps || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await jobsService.postJob({
        ...newJob,
        recruiterId: user!.uid,
        companyName: userData?.fullName || 'Entreprise Confidentielle',
        status: 'active'
      });
      setShowJobModal(false);
      fetchDashboardData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-brand-light min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Dashboard Entreprise</h1>
            <p className="text-slate-500 text-sm">Gérez vos offres d'emploi et vos talents d'excellence.</p>
          </div>
          <button 
            onClick={() => setShowJobModal(true)}
            className="premium-btn-primary flex items-center gap-2 text-sm"
          >
            <Plus size={18} /> Nouvelle Offre
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
            <div className="w-14 h-14 bg-slate-100 text-brand-primary rounded-lg flex items-center justify-center mb-6 font-bold italic">
              2N
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Offres Actives</p>
            <p className="text-4xl font-bold text-slate-800">{jobs.length}</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
            <div className="w-14 h-14 bg-orange-50 text-brand-accent rounded-lg flex items-center justify-center mb-6">
              <Users size={28} />
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Candidatures</p>
            <p className="text-4xl font-bold text-slate-800">{applications.length}</p>
          </div>
          <div className="bg-slate-800 p-8 rounded-xl shadow-sm text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mt-12"></div>
            <div className="w-14 h-14 bg-white/10 text-brand-accent rounded-lg flex items-center justify-center mb-6 relative z-10 transition-transform hover:scale-110">
              <FileText size={28} />
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 relative z-10">Entretiens Prévus</p>
            <p className="text-4xl font-bold relative z-10">0</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Jobs */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-800">Vos Dernières Offres</h3>
            </div>
            <div className="divide-y divide-slate-50">
              {jobs.length > 0 ? jobs.map(job => (
                <div key={job.id} className="p-6 hover:bg-slate-50/50 transition-colors flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">{job.title}</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{job.location} • {job.type}</p>
                  </div>
                  <span className="text-[10px] px-3 py-1 bg-green-100 text-green-700 rounded-full font-bold uppercase tracking-wider">Actif</span>
                </div>
              )) : (
                <div className="p-12 text-center text-slate-400 italic text-sm">Aucune offre publiée.</div>
              )}
            </div>
          </div>

          {/* Recent Applications */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-800">Dernières Candidatures</h3>
            </div>
            <div className="divide-y divide-slate-50">
              {applications.length > 0 ? applications.map(app => (
                <div key={app.id} className="p-6 hover:bg-slate-50/50 transition-colors flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">{app.candidateName}</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Poste: {jobs.find(j => j.id === app.jobId)?.title || 'Poste Inconnu'}</p>
                  </div>
                  <a href={app.resumeUrl} target="_blank" rel="noreferrer" className="text-brand-accent text-sm font-bold flex items-center gap-1 group">
                    Voir CV <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                </div>
              )) : (
                <div className="p-12 text-center text-slate-400 italic text-sm">Aucune candidature reçue.</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal New Job */}
      <AnimatePresence>
        {showJobModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowJobModal(false)}
              className="absolute inset-0 bg-brand-primary/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-800 text-white">
                <h3 className="text-2xl font-bold">Publier une Offre</h3>
                <button onClick={() => setShowJobModal(false)}><X size={24} /></button>
              </div>
              <form onSubmit={handleCreateJob} className="p-8 max-h-[70vh] overflow-y-auto space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-widest">Titre du Poste</label>
                    <input 
                      required
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-accent text-sm text-slate-800"
                      value={newJob.title}
                      onChange={e => setNewJob({...newJob, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-widest">Localisation</label>
                    <input 
                      required
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-accent text-sm text-slate-800"
                      value={newJob.location}
                      onChange={e => setNewJob({...newJob, location: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-widest">Catégorie</label>
                    <select 
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none text-sm text-slate-600"
                      value={newJob.category}
                      onChange={e => setNewJob({...newJob, category: e.target.value})}
                    >
                      <option>Finance</option>
                      <option>IT</option>
                      <option>Marketing</option>
                      <option>Logistique</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-widest">Type</label>
                    <select 
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none text-sm text-slate-600"
                      value={newJob.type}
                      onChange={e => setNewJob({...newJob, type: e.target.value})}
                    >
                      <option>CDI</option>
                      <option>CDD</option>
                      <option>Stage</option>
                      <option>Freelance</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-widest">Salaire Proposé</label>
                  <input 
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-accent text-sm text-slate-800"
                    placeholder="Ex: 500k - 800k CFA"
                    value={newJob.salary}
                    onChange={e => setNewJob({...newJob, salary: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-widest">Description</label>
                  <textarea 
                    rows={4}
                    required
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-accent text-sm text-slate-600"
                    value={newJob.description}
                    onChange={e => setNewJob({...newJob, description: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-widest">Compétences / Requirements</label>
                  <textarea 
                    rows={4}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-accent text-sm text-slate-600"
                    value={newJob.requirements}
                    onChange={e => setNewJob({...newJob, requirements: e.target.value})}
                  />
                </div>

                <div className="pt-4">
                  <button type="submit" className="premium-btn-primary w-full py-4 uppercase tracking-widest text-sm">Publier l'Offre de Prestige</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
