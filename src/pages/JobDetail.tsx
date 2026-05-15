import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { jobsService, Job } from '../services/jobsService';
import { applicationsService } from '../services/applicationsService';
import { useAuth } from '../contexts/AuthContext';
import { MapPin, Briefcase, Calendar, Building2, ChevronLeft, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function JobDetail() {
  const { id } = useParams<{ id: string }>();
  const { user, isCandidate, userData } = useAuth();
  const navigate = useNavigate();
  
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const [error, setError] = useState('');
  
  // Form state
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState('');

  useEffect(() => {
    if (id) fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      const data = await jobsService.getJobById(id!);
      setJob(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvFile) {
      setError('Veuillez télécharger votre CV.');
      return;
    }

    setApplying(true);
    setError('');
    
    try {
      await applicationsService.applyToJob({
        jobId: id!,
        candidateId: user!.uid,
        candidateName: userData?.fullName || user?.email || 'Anonymous',
        recruiterId: job!.recruiterId,
        coverLetter: coverLetter,
        resumeUrl: '' // Handled by service
      }, cvFile);
      setApplied(true);
    } catch (err) {
      setError('Une erreur est survenue lors de l\'envoi de votre candidature.');
      console.error(err);
    } finally {
      setApplying(false);
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center font-sans text-xl font-medium animate-pulse text-slate-400">Chargement de l'offre...</div>;
  if (!job) return <div className="h-screen flex items-center justify-center">Poste introuvable.</div>;

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/jobs" className="flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-8 transition-colors group text-sm font-bold uppercase tracking-wider">
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Retour aux offres
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-start justify-between mb-8">
                <div className="flex gap-6">
                  <div className="w-16 h-16 bg-slate-800 rounded-lg flex items-center justify-center text-white text-xl font-bold italic">2N</div>
                  <div>
                    <h1 className="text-2xl font-bold text-slate-800 mb-2">{job.title}</h1>
                    <div className="flex flex-wrap gap-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                      <span className="flex items-center gap-1"><Building2 size={14} /> {job.companyName}</span>
                      <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                      <span className="flex items-center gap-1 text-brand-accent italic"><Briefcase size={14} /> {job.type}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="prose prose-slate max-w-none">
                <h3 className="text-sm font-bold mb-4 text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2">Description du Poste</h3>
                <p className="text-slate-600 leading-relaxed whitespace-pre-wrap mb-8 text-sm">{job.description}</p>
                
                <h3 className="text-sm font-bold mb-4 text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2">Compétences Requises</h3>
                <p className="text-slate-600 leading-relaxed whitespace-pre-wrap mb-8 text-sm">{job.requirements || "Non spécifiées"}</p>
              </div>
            </div>
          </div>

          {/* Sidebar / Application Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-brand-accent">
                <h3 className="text-lg font-bold text-slate-800 mb-6">Postuler à cette offre</h3>
                
                {!user ? (
                  <div className="text-center">
                    <p className="text-slate-500 mb-6 text-sm">Connectez-vous pour postuler.</p>
                    <Link to="/login" className="premium-btn-primary w-full block text-center mb-4 text-sm">Se Connecter</Link>
                    <Link to="/register" className="text-brand-accent text-xs font-bold block uppercase tracking-wider">Créer un compte</Link>
                  </div>
                ) : !isCandidate ? (
                  <div className="p-4 bg-slate-50 rounded-lg text-xs font-medium text-slate-500 border border-slate-100">
                    Seuls les comptes candidats peuvent postuler aux offres.
                  </div>
                ) : applied ? (
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }} 
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center space-y-4"
                  >
                    <div className="w-16 h-16 bg-orange-50 text-brand-accent rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle size={32} />
                    </div>
                    <h4 className="font-bold text-slate-800">Candidature Envoyée !</h4>
                    <p className="text-xs text-slate-500">Votre dossier est maintenant entre les mains de l'excellence.</p>
                    <Link to="/candidate-dashboard" className="premium-btn-outline w-full block text-xs py-2">Mon Dashboard</Link>
                  </motion.div>
                ) : (
                  <form onSubmit={handleApply} className="space-y-6">
                    {error && (
                      <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
                        <AlertCircle size={14} />
                        {error}
                      </div>
                    )}
                    
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Curriculum Vitae (PDF)</label>
                      <label className="border border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors group">
                        <Upload className="text-slate-300 group-hover:text-brand-accent mb-2" size={24} />
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          {cvFile ? cvFile.name : 'Uploader votre CV'}
                        </span>
                        <input 
                          type="file" 
                          className="hidden" 
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                        />
                      </label>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Lettre de Motivation</label>
                      <textarea 
                        rows={4}
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-accent transition-all text-sm text-slate-600"
                        placeholder="Qu'est-ce qui fait de vous le candidat d'excellence ?"
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                      />
                    </div>

                    <button 
                      type="submit" 
                      disabled={applying}
                      className="premium-btn-primary w-full py-3 text-sm"
                    >
                      {applying ? 'Envoi en cours...' : 'Envoyer ma Candidature'}
                    </button>
                  </form>
                )}
              </div>

              <div className="bg-slate-800 p-6 rounded-xl text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mt-12"></div>
                <div className="flex items-center gap-3 mb-4 relative z-10">
                  <Calendar className="text-brand-accent" size={18} />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Posté le</span>
                </div>
                <p className="text-lg font-bold relative z-10">
                  {job.createdAt ? format(job.createdAt.toDate(), 'dd MMMM yyyy', { locale: fr }) : 'Date inconnue'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
