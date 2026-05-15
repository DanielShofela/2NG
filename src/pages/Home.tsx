import React from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, Briefcase, Users, TrendingUp, ArrowRight, Building2, Star, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center bg-slate-800 overflow-hidden">
        {/* Abstract Background Decor */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-accent rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-slate-400 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-brand-accent/10 text-brand-accent text-[10px] font-bold uppercase tracking-widest mb-6 border border-brand-accent/20">
                L'excellence au service de votre carrière
              </span>
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-8">
                Propulsez votre avenir avec <span className="text-brand-accent">2NG Groupe</span>
              </h1>
              <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-xl">
                La plateforme de recrutement d'élite en Côte d'Ivoire. Connectez-vous aux opportunités qui définissent les leaders de demain.
              </p>

              {/* Search Bar - Landing Style */}
              <div className="bg-white p-2 rounded-xl shadow-2xl flex flex-col md:flex-row items-center gap-2 w-full mb-8">
                <div className="flex-1 flex items-center px-4 md:border-r border-slate-100 w-full">
                  <Search className="w-5 h-5 text-slate-400 mr-3" />
                  <input type="text" placeholder="Poste, métiers..." className="w-full text-base outline-none placeholder:text-slate-400 py-3 text-slate-800" />
                </div>
                <div className="flex-1 flex items-center px-4 w-full">
                  <MapPin className="w-5 h-5 text-slate-400 mr-3" />
                  <input type="text" placeholder="Lieu..." className="w-full text-base outline-none placeholder:text-slate-400 py-3 text-slate-800" />
                </div>
                <Link to="/jobs" className="bg-brand-accent text-white px-8 py-4 rounded-lg text-sm font-bold hover:bg-brand-accent-hover transition-all w-full md:w-auto text-center shadow-lg shadow-brand-accent/20 active:scale-95">
                  Rechercher
                </Link>
              </div>

              <div className="flex items-center gap-6 text-slate-500">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-800 bg-slate-700 flex items-center justify-center text-[10px] font-bold uppercase">U{i}</div>
                  ))}
                </div>
                <p className="text-sm font-medium"><span className="text-white">+2,500</span> candidats inscrits cette semaine</p>
              </div>
            </motion.div>

            {/* Visual Element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="hidden lg:block relative"
            >
              <div className="relative z-10 bg-slate-700 aspect-square rounded-3xl overflow-hidden border border-slate-600 shadow-2xl">
                 <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" 
                    alt="Corporate recruitment" 
                    className="w-full h-full object-cover grayscale opacity-60 hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                 <div className="absolute bottom-8 left-8 right-8">
                    <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                       <p className="text-white font-bold text-lg mb-1">94% de satisfaction</p>
                       <p className="text-slate-300 text-xs">Nos partenaires louent la qualité d'excellence de nos processus.</p>
                    </div>
                 </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-accent/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-slate-400/20 rounded-full blur-3xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="py-20 border-b border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center mb-16">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Ils font confiance à 2NG Groupe</h2>
          <div className="flex flex-wrap justify-center gap-12 opacity-40 grayscale">
            {/* Mock logos or placeholders */}
            <div className="text-2xl font-black text-slate-800 italic">TOTAL</div>
            <div className="text-2xl font-black text-slate-800 italic">ORANGE</div>
            <div className="text-2xl font-black text-slate-800 italic">CIE</div>
            <div className="text-2xl font-black text-slate-800 italic">MTN</div>
            <div className="text-2xl font-black text-slate-800 italic">NSIA</div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center p-8 rounded-2xl hover:bg-slate-50 transition-colors">
              <p className="text-4xl font-bold text-slate-800 mb-2">1.2k+</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Offres Actives</p>
            </div>
            <div className="text-center p-8 rounded-2xl hover:bg-slate-50 transition-colors">
              <p className="text-4xl font-bold text-slate-800 mb-2">500+</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Entreprises</p>
            </div>
            <div className="text-center p-8 rounded-2xl hover:bg-slate-50 transition-colors">
              <p className="text-4xl font-bold text-slate-800 mb-2">15k+</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Candidats</p>
            </div>
            <div className="text-center p-8 rounded-2xl hover:bg-slate-50 transition-colors">
              <p className="text-4xl font-bold text-brand-accent mb-2">48h</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Délai moyen</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services / Why Us */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-bold text-slate-800 mb-6">Redéfinir le Recrutement par l'Excellence</h2>
            <p className="text-slate-500">2NG Groupe n'est pas qu'un simple site d'emploi. C'est un écosystème conçu pour identifier et propulser les talents d'élite.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all">
              <div className="w-14 h-14 bg-orange-50 text-brand-accent rounded-xl flex items-center justify-center mb-8">
                 <Star size={30} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Sélection Premium</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Nous filtrons rigoureusement les offres et les profils pour ne garder que le haut du panier. L'excellence est notre standard.
              </p>
            </div>
            <div className="bg-white p-10 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all">
              <div className="w-14 h-14 bg-orange-50 text-brand-accent rounded-xl flex items-center justify-center mb-8">
                 <ShieldCheck size={30} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Accompagnement VIP</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                De la refonte de CV aux conseils stratégiques, nous préparons nos candidats pour les entretiens les plus exigeants.
              </p>
            </div>
            <div className="bg-white p-10 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all">
              <div className="w-14 h-14 bg-orange-50 text-brand-accent rounded-xl flex items-center justify-center mb-8">
                 <Zap size={30} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Technologie IA</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Nos algorithmes de matching intelligents connectent instantanément les bons profils aux bonnes opportunités.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
           <div className="flex justify-between items-end mb-12">
              <div>
                 <h2 className="text-3xl font-bold text-slate-800 mb-2">Dernières Opportunités d'Excellence</h2>
                 <p className="text-slate-500 text-sm">Postulez aux offres publiées aujourd'hui par nos partenaires.</p>
              </div>
              <Link to="/jobs" className="text-brand-accent font-bold text-sm flex items-center gap-2 hover:underline">
                 Parcourir tout <ArrowRight size={16} />
              </Link>
           </div>

           <div className="space-y-4">
              {[1, 2, 3].map(i => (
                 <div key={i} className="group p-6 rounded-xl border border-slate-100 hover:border-brand-accent hover:bg-slate-50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                       <div className="w-14 h-14 bg-white border border-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-300 text-xs italic">2N</div>
                       <div>
                          <h3 className="font-bold text-slate-800 transition-colors group-hover:text-brand-accent">Directeur Strategique Marketing H/F</h3>
                          <div className="flex gap-4 text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">
                             <span className="flex items-center gap-1"><Building2 size={12}/> Orange CI</span>
                             <span className="flex items-center gap-1"><MapPin size={12}/> Abidjan</span>
                             <span className="text-brand-accent italic">CDI</span>
                          </div>
                       </div>
                    </div>
                    <Link to="/jobs" className="bg-slate-800 text-white px-6 py-2 rounded-lg text-xs font-bold hover:bg-slate-700 transition-colors text-center">Voir l'offre</Link>
                 </div>
              ))}
           </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-32 bg-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-accent rounded-full blur-[160px]" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 text-white">
           <h2 className="text-4xl lg:text-5xl font-bold mb-8">Votre futur n'attend pas.<br/>Saisissez-le aujourd'hui.</h2>
           <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto">
              Que vous cherchiez votre prochain défi ou le talent qui fera la différence, 2NG Groupe est votre partenaire vers les sommets.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/register" className="bg-brand-accent text-white px-10 py-4 rounded-xl font-bold hover:bg-brand-accent-hover transition-all text-lg">C'est parti !</Link>
              <Link to="/login" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-4 rounded-xl font-bold hover:bg-white/20 transition-all text-lg">Se Connecter</Link>
           </div>
        </div>
      </section>

      {/* Basic Footer */}
      <footer className="py-12 bg-white border-t border-slate-100">
         <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-slate-800 rounded flex items-center justify-center text-white font-bold text-lg italic">2N</div>
              <span className="font-bold text-xl tracking-tight text-slate-800">2NG <span className="text-brand-accent">Groupe</span></span>
            </div>
            <div className="flex gap-8 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
               <a href="#" className="hover:text-brand-accent transition-colors">Conditions</a>
               <a href="#" className="hover:text-brand-accent transition-colors">Confidentialité</a>
               <a href="#" className="hover:text-brand-accent transition-colors">Aide</a>
               <a href="#" className="hover:text-brand-accent transition-colors">Contact</a>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">© 2024 2NG Groupe Entreprises.</p>
         </div>
      </footer>
    </div>
  );
}

export default Home;
