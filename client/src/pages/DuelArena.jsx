import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Swords, Timer, Target, Code, Trophy, 
  ChevronRight, Users, Zap, ShieldCheck, AlertCircle
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Cell 
} from 'recharts';
import confetti from 'canvas-confetti';
import DashboardShell from '../components/DashboardShell';
import api from '../api/axios';
import useAuthStore from '../store/authStore';

const DuelArena = () => {
  const { user } = useAuthStore();
  const [activeDuel, setActiveDuel] = useState(null);
  const [showReport, setShowReport] = useState(false);
  const [loading, setLoading] = useState(false);

  // Mock data for demo purposes since we need two real users for a duel
  const mockDuelResult = {
    player1: { name: user?.fullName, avatar: user?.avatar, time: 145, accuracy: 98, xp: 500, status: 'WINNER' },
    player2: { name: 'Sudo_Master', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sudo', time: 182, accuracy: 85, xp: 50, status: 'DEFEATED' },
    analytics: [
      { name: 'Accuracy', p1: 98, p2: 85 },
      { name: 'Time (s)', p1: 145, p2: 182 },
      { name: 'Complexity', p1: 12, p2: 18 },
    ]
  };

  const handleStartMatch = () => {
    setLoading(true);
    setTimeout(() => {
      setActiveDuel({
        question: 'Implement a function that reverses a string without using .reverse()',
        difficulty: 'EASY',
        opponent: 'Sudo_Master'
      });
      setLoading(false);
    }, 2000);
  };

  const handleFinishMatch = () => {
    confetti({
      particleCount: 200,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#7C3AED', '#00D9B5', '#FFD700']
    });
    setShowReport(true);
    setActiveDuel(null);
  };

  return (
    <DashboardShell>
      <div className="max-w-6xl mx-auto">
        {!activeDuel && !showReport && (
          <div className="flex flex-col items-center py-20 text-center">
            <motion.div 
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="w-24 h-24 bg-primary/20 rounded-3xl flex items-center justify-center text-primary mb-8 border border-primary/30"
            >
               <Swords className="w-12 h-12" />
            </motion.div>
            <h1 className="text-5xl font-black italic tracking-tighter mb-4 uppercase">1v1 <span className="text-primary">DUEL ARENA</span></h1>
            <p className="text-gray-400 max-w-lg mb-12">Challenge your friends or match with random warriors. First one to solve correctly with highest accuracy wins the loot.</p>
            
            <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
               <motion.div 
                 whileHover={{ y: -5 }}
                 className="bg-[#1a0b2e] p-10 rounded-[40px] border border-white/5 flex flex-col items-center group cursor-pointer hover:border-primary/50 transition-all shadow-2xl"
                 onClick={handleStartMatch}
               >
                  <Users className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-bold mb-2">Auto Match</h3>
                  <p className="text-sm text-gray-500 mb-8">Find a worthy opponent at your skill level.</p>
                  <button className="w-full bg-primary py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-primary/20 group-hover:bg-primary/90">Find Match</button>
               </motion.div>

               <motion.div 
                 whileHover={{ y: -5 }}
                 className="bg-[#1a0b2e] p-10 rounded-[40px] border border-white/5 flex flex-col items-center group cursor-pointer hover:border-accent/50 transition-all shadow-2xl"
               >
                  <Zap className="w-12 h-12 text-accent mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-bold mb-2">Custom Duel</h3>
                  <p className="text-sm text-gray-500 mb-8">Choose the question and invite a friend via link.</p>
                  <button className="w-full bg-accent text-black py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-accent/20 group-hover:bg-accent/90">Invite Friend</button>
               </motion.div>
            </div>
          </div>
        )}

        {loading && (
           <div className="flex flex-col items-center py-32">
              <div className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin mb-8"></div>
              <p className="text-gray-400 font-bold animate-pulse uppercase tracking-widest">Searching for worthy opponent...</p>
           </div>
        )}

        {/* Active Duel View */}
        {activeDuel && (
           <div className="grid grid-cols-12 gap-8 border-t border-white/5 pt-8">
              <div className="col-span-12 flex justify-between items-center mb-4 bg-red-500/10 border border-red-500/20 p-4 rounded-2xl">
                 <div className="flex items-center gap-4">
                    <div className="flex -space-x-4">
                       <img src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username}`} className="w-12 h-12 rounded-full border-4 border-[#0c001c]" alt="" />
                       <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Sudo`} className="w-12 h-12 rounded-full border-4 border-[#0c001c]" alt="" />
                    </div>
                    <span className="font-black italic text-xl uppercase tracking-tighter">VERSUS: {activeDuel.opponent}</span>
                 </div>
                 <div className="flex items-center gap-2 bg-black/40 px-6 py-2 rounded-xl border border-white/10">
                    <Timer className="w-5 h-5 text-accent" />
                    <span className="text-2xl font-black italic">02:45</span>
                 </div>
              </div>

              <div className="col-span-8 bg-[#1a0b2e] p-8 rounded-3xl border border-white/5 shadow-2xl">
                 <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <Code className="w-6 h-6 text-primary" /> The Challenge
                 </h2>
                 <p className="text-lg text-gray-300 leading-relaxed mb-10">{activeDuel.question}</p>
                 <div className="h-96 bg-black/40 rounded-2xl border border-white/5 p-4 font-mono text-sm">
                    <p className="text-gray-500 mb-4">// Write your solution here...</p>
                    <p className="text-primary italic">function reverseString(str) &#123;</p>
                    <div className="w-1 h-5 bg-primary animate-pulse ml-4 mt-2"></div>
                    <p className="text-primary italic mt-2">&#125;</p>
                 </div>
                 <button 
                  onClick={handleFinishMatch}
                  className="mt-8 w-full bg-primary py-5 rounded-2xl font-black text-lg uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all"
                 >
                   Submit Solution
                 </button>
              </div>

              <div className="col-span-4 space-y-6">
                 <div className="bg-[#1a0b2e] p-6 rounded-3xl border border-white/5 shadow-xl">
                    <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-gray-500">Opponent Status</h4>
                    <div className="flex items-center gap-4 mb-4">
                       <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                       <span className="text-sm font-bold text-gray-300">Writing code...</span>
                    </div>
                    <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                       <div className="h-full bg-accent w-1/3 animate-pulse"></div>
                    </div>
                    <p className="mt-4 text-xs text-gray-500">Currently halfway through the logic.</p>
                 </div>

                 <div className="bg-primary/10 p-6 rounded-3xl border border-primary/20">
                    <div className="flex items-center gap-3 text-primary mb-4">
                       <ShieldCheck className="w-6 h-6" />
                       <h4 className="font-bold uppercase text-xs tracking-widest">Tips for Glory</h4>
                    </div>
                    <p className="text-sm text-gray-400 italic">Accuracy is weighted higher than speed in the rating system. Don't rush!</p>
                 </div>
              </div>
           </div>
        )}

        {/* Post-Match Report Card */}
        <AnimatePresence>
          {showReport && (
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#1a0b2e] rounded-[50px] border border-white/5 overflow-hidden shadow-[0_0_100px_rgba(124,58,237,0.3)]"
            >
               {/* Result Header */}
               <div className="bg-gradient-to-r from-primary via-purple-600 to-indigo-700 p-12 text-center relative">
                  <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                  <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-6 drop-shadow-2xl" />
                  <h2 className="text-6xl font-black italic tracking-tighter text-white uppercase mb-2">Victory!</h2>
                  <p className="text-white/80 font-bold uppercase tracking-[0.3em]">Legend Tier Performance</p>
               </div>

               <div className="p-10 md:p-16 grid grid-cols-12 gap-12">
                  {/* Stats Comparison */}
                  <div className="col-span-12 lg:col-span-7">
                     <h3 className="text-2xl font-black italic mb-8 uppercase text-primary tracking-widest">Match Analytics</h3>
                     <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                           <BarChart data={mockDuelResult.analytics}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#2a1b3e" />
                              <XAxis dataKey="name" tick={{ fill: '#9ca3af' }} />
                              <YAxis tick={{ fill: '#9ca3af' }} />
                              <Tooltip 
                                contentStyle={{ backgroundColor: '#1a0b2e', border: '1px solid rgba(255,255,255,0.1)' }}
                                itemStyle={{ fontWeight: 'bold' }}
                              />
                              <Bar dataKey="p1" name="You" fill="#7C3AED" radius={[10, 10, 0, 0]} />
                              <Bar dataKey="p2" name="Opponent" fill="#00D9B5" radius={[10, 10, 0, 0]} />
                           </BarChart>
                        </ResponsiveContainer>
                     </div>
                  </div>

                  {/* Player Cards */}
                  <div className="col-span-12 lg:col-span-5 space-y-6">
                     <div className="bg-black/40 p-6 rounded-3xl border-2 border-primary shadow-lg relative overflow-hidden">
                        <div className="absolute -right-4 -top-4 opacity-10">
                           <Trophy className="w-24 h-24 text-primary" />
                        </div>
                        <div className="flex items-center gap-6">
                           <img src={mockDuelResult.player1.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username}`} className="w-20 h-20 rounded-2xl border-2 border-primary" alt="" />
                           <div>
                              <div className="text-xs font-black text-primary uppercase tracking-widest mb-1">{mockDuelResult.player1.status}</div>
                              <div className="text-2xl font-black italic">{mockDuelResult.player1.name}</div>
                              <div className="text-accent font-black text-sm">+{mockDuelResult.player1.xp} XP EARNED</div>
                           </div>
                        </div>
                     </div>

                     <div className="bg-black/20 p-6 rounded-3xl border border-white/5 opacity-50 grayscale transition-all hover:grayscale-0 hover:opacity-100">
                        <div className="flex items-center gap-6">
                           <img src={mockDuelResult.player2.avatar} className="w-20 h-20 rounded-2xl border border-white/10" alt="" />
                           <div>
                              <div className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1">{mockDuelResult.player2.status}</div>
                              <div className="text-2xl font-black italic">{mockDuelResult.player2.name}</div>
                              <div className="text-red-500 font-black text-sm">+{mockDuelResult.player2.xp} XP COMPENSATION</div>
                           </div>
                        </div>
                     </div>

                     <button 
                       onClick={() => setShowReport(false)}
                       className="w-full bg-white text-black py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                     >
                       Back to Arena <ChevronRight className="w-4 h-4" />
                     </button>
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardShell>
  );
};

export default DuelArena;
