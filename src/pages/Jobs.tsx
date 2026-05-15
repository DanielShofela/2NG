import React, { useState, useEffect } from 'react';
import { jobsService, Job } from '../services/jobsService';
import { Search, MapPin, Briefcase, Filter, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ category: '', type: '', location: '' });

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const result = await jobsService.getJobs(filters);
      setJobs(result?.jobs || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-brand-light min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Opportunités de Carrière</h1>
          <p className="text-slate-500">Trouvez le poste qui correspond à vos ambitions parmi nos offres exclusives.</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-6 text-slate-800 font-bold uppercase text-xs tracking-wider">
                <Filter size={16} />
                <span>Filtres</span>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 mb-3 uppercase tracking-wider">Localisation</label>
                  <select 
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none text-sm text-slate-600"
                    value={filters.location}
                    onChange={(e) => setFilters({...filters, location: e.target.value})}
                  >
                    <option value="">Toutes les villes</option>
                    <option value="Abidjan">Abidjan</option>
                    <option value="Bouaké">Bouaké</option>
                    <option value="San-Pédro">San-Pédro</option>
                    <option value="Yamoussoukro">Yamoussoukro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 mb-3 uppercase tracking-wider">Type de Contrat</label>
                  <div className="space-y-2">
                    {['CDI', 'CDD', 'Stage', 'Freelance'].map((t) => (
                      <label key={t} className="flex items-center gap-2 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 rounded border-slate-300 text-brand-accent focus:ring-brand-accent accent-brand-accent"
                          checked={filters.type === t}
                          onChange={() => setFilters({...filters, type: filters.type === t ? '' : t})}
                        />
                        <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{t}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-50">
                  <label className="block text-[10px] font-bold text-slate-400 mb-3 uppercase tracking-wider">Catégorie</label>
                  <select 
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none text-sm text-slate-600"
                    value={filters.category}
                    onChange={(e) => setFilters({...filters, category: e.target.value})}
                  >
                    <option value="">Toutes les catégories</option>
                    <option value="IT">Technologies & IT</option>
                    <option value="Finance">Banque & Finance</option>
                    <option value="Marketing">Marketing & Communication</option>
                    <option value="RH">Ressources Humaines</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Job List */}
          <div className="lg:col-span-3 space-y-4">
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-white p-6 rounded-2xl animate-pulse flex justify-between">
                    <div className="h-16 w-16 bg-gray-100 rounded-xl"></div>
                    <div className="flex-1 ml-6 space-y-2 text-white">.</div>
                  </div>
                ))}
              </div>
            ) : jobs.length > 0 ? (
              jobs.map((job) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="premium-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-400 text-sm italic">2N</div>
                    <div>
                      <h3 className="text-xl font-bold mb-1 text-slate-800">{job.title}</h3>
                      <div className="flex flex-wrap gap-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                        <span className="flex items-center gap-1"><Briefcase size={14} /> {job.type}</span>
                        <span className="text-brand-accent italic">{job.salary}</span>
                      </div>
                    </div>
                  </div>
                  <Link 
                    to={`/jobs/${job.id}`} 
                    className="premium-btn-outline py-2 px-6 flex items-center gap-2 group"
                  >
                    Voir Details <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="bg-white p-12 rounded-3xl text-center shadow-sm">
                <Search size={48} className="mx-auto text-gray-200 mb-4" />
                <h3 className="text-xl font-bold text-brand-primary mb-2">Aucune offre trouvée</h3>
                <p className="text-gray-500">Essayez de modifier vos filtres pour voir plus d'opportunités.</p>
                <button 
                  onClick={() => setFilters({ category: '', type: '', location: '' })}
                  className="mt-6 text-brand-accent font-bold"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
