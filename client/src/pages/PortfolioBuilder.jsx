import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, Github, Linkedin, Mail, ExternalLink, 
  Layout, Palette, Check, Sparkles, Wand2, Eye
} from 'lucide-react';
import DashboardShell from '../components/DashboardShell';
import useAuthStore from '../store/authStore';

const PortfolioBuilder = () => {
  const { user } = useAuthStore();
  const [template, setTemplate] = useState('modern');
  const [isGenerating, setIsGenerating] = useState(false);
  const [portfolioUrl, setPortfolioUrl] = useState(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setPortfolioUrl(`https://codearena.io/warrior/${user?.username}`);
      setIsGenerating(false);
    }, 3000);
  };

  const templates = [
    { id: 'modern', name: 'Arena Dark', color: 'bg-[#0c001c]', preview: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=400&q=80' },
    { id: 'cyber', name: 'Cyberpunk 2077', color: 'bg-yellow-400', preview: 'https://images.unsplash.com/photo-1614850715649-1d0106293bd1?w=400&q=80' },
    { id: 'minimal', name: 'Clean Professional', color: 'bg-white', preview: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=80' },
  ];

  return (
    <DashboardShell>
      <div className="max-w-6xl mx-auto pb-20">
        <div className="flex flex-col lg:flex-row gap-16">
           <div className="flex-1">
              <div className="mb-10">
                 <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 border border-primary/20">
                    <Sparkles className="w-3 h-3" /> Auto-Generated
                 </div>
                 <h1 className="text-5xl font-black italic tracking-tighter uppercase mb-4">Portfolio <span className="text-primary">Builder</span></h1>
                 <p className="text-gray-400 font-medium italic">Instantly generate a high-converting web portfolio using your Arena quests, badges, and verified coding skills.</p>
              </div>

              <div className="space-y-10">
                 <section>
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                       <Layout className="w-5 h-5 text-accent" /> Select Theme
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                       {templates.map(t => (
                          <div 
                            key={t.id}
                            onClick={() => setTemplate(t.id)}
                            className={`relative group cursor-pointer rounded-3xl overflow-hidden border-2 transition-all ${
                              template === t.id ? 'border-primary ring-4 ring-primary/20' : 'border-white/5 hover:border-white/20'
                            }`}
                          >
                             <img src={t.preview} className="w-full h-40 object-cover opacity-50 group-hover:opacity-80 transition-opacity" alt="" />
                             <div className="absolute inset-0 bg-gradient-to-t from-[#0c001c] to-transparent p-6 flex items-end">
                                <div className="flex items-center justify-between w-full">
                                   <span className="font-bold text-sm">{t.name}</span>
                                   {template === t.id && <div className="bg-primary p-1 rounded-full"><Check className="w-3 h-3 text-white" /></div>}
                                </div>
                             </div>
                          </div>
                       ))}
                    </div>
                 </section>

                 <section>
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                       <Palette className="w-5 h-5 text-primary" /> Included Sections
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                       {[
                         'CodeArena XP & Level', 'Skill Radar Chart', 'Badge Collection',
                         'Tournament History', 'Latest Lessons', 'GitHub Integration'
                       ].map((item, i) => (
                         <div key={i} className="flex items-center gap-3 bg-black/40 p-4 rounded-2xl border border-white/5">
                            <div className="w-5 h-5 bg-primary/20 rounded-md flex items-center justify-center">
                               <Check className="w-3 h-3 text-primary" />
                            </div>
                            <span className="text-sm font-medium text-gray-300">{item}</span>
                         </div>
                       ))}
                    </div>
                 </section>

                 <button 
                   onClick={handleGenerate}
                   disabled={isGenerating}
                   className="w-full bg-gradient-to-r from-primary to-purple-600 py-6 rounded-3xl font-black text-xl italic uppercase tracking-widest shadow-2xl shadow-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                 >
                   {isGenerating ? (
                      <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                   ) : (
                      <>Generate Portfolio <Wand2 className="w-6 h-6" /></>
                   )}
                 </button>

                 {portfolioUrl && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-accent/10 border border-accent/20 p-8 rounded-[40px] mt-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl"
                    >
                       <div>
                          <div className="text-accent text-[10px] font-black uppercase tracking-widest mb-2">Portfolio Live!</div>
                          <div className="text-white font-bold truncate max-w-xs">{portfolioUrl}</div>
                       </div>
                       <div className="flex gap-4">
                          <button className="bg-accent text-black px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-2">
                             Preview <Eye className="w-4 h-4" />
                          </button>
                          <button className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-2">
                             Share <ExternalLink className="w-4 h-4" />
                          </button>
                       </div>
                    </motion.div>
                 )}
              </div>
           </div>

           {/* Live Preview Side (Simple visual) */}
           <div className="hidden lg:block w-96">
              <div className="sticky top-32 bg-[#1a0b2e] rounded-[50px] border border-white/5 overflow-hidden shadow-2xl h-[700px] flex flex-col">
                 <div className="bg-black/60 px-6 py-4 border-b border-white/5 flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                 </div>
                 <div className="flex-1 overflow-hidden pointer-events-none opacity-50 p-8 space-y-6">
                    <div className="w-20 h-20 bg-primary/20 rounded-full mx-auto"></div>
                    <div className="h-4 bg-white/10 rounded-full w-2/3 mx-auto"></div>
                    <div className="h-4 bg-white/5 rounded-full w-1/2 mx-auto"></div>
                    <div className="grid grid-cols-2 gap-4 mt-12">
                       <div className="h-20 bg-white/5 rounded-2xl"></div>
                       <div className="h-20 bg-white/5 rounded-2xl"></div>
                       <div className="h-40 col-span-2 bg-white/5 rounded-2xl"></div>
                    </div>
                    <div className="flex justify-center gap-4 mt-8">
                       <Github className="w-5 h-5 text-gray-700" />
                       <Linkedin className="w-5 h-5 text-gray-700" />
                       <Mail className="w-5 h-5 text-gray-700" />
                    </div>
                 </div>
                 <div className="absolute inset-0 flex items-center justify-center p-12 text-center">
                    <div className="bg-primary/20 backdrop-blur-md p-6 rounded-3xl border border-primary/30">
                       <Layout className="w-10 h-10 text-primary mx-auto mb-4" />
                       <p className="text-white font-black text-sm italic uppercase">Live Preview Simulation</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </DashboardShell>
  );
};

export default PortfolioBuilder;
