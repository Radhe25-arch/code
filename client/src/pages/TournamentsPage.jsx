import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Swords, Trophy, Users, Clock, Zap, ChevronRight, Award, Flame } from 'lucide-react';
import DashboardShell from '../components/DashboardShell';
import api from '../api/axios';

const TournamentsPage = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const res = await api.get('/tournaments');
        setTournaments(res.data);
      } catch (error) {
        console.error('Failed to fetch tournaments', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTournaments();
  }, []);

  return (
    <DashboardShell>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 bg-red-500/10 text-red-500 border border-red-500/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 animate-pulse">
               <Flame className="w-3 h-3 fill-red-500" /> Live Events
            </div>
            <h1 className="text-5xl font-black italic tracking-tighter">BATTLE <span className="text-primary">ARENA</span></h1>
            <p className="text-gray-400 mt-2">Compete in weekly coding quests and earn legendary prizes.</p>
          </div>
          <button className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl text-sm font-bold hover:bg-white/10 transition-all flex items-center gap-2">
            Tournament History <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {loading ? (
           <div className="grid md:grid-cols-2 gap-8">
             {[1,2].map(i => <div key={i} className="h-80 bg-[#1a0b2e] rounded-3xl animate-pulse border border-white/5"></div>)}
           </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            {tournaments.length === 0 && (
              <div className="col-span-12 py-32 text-center bg-[#1a0b2e] rounded-3xl border border-white/5">
                 <Swords className="w-20 h-20 text-gray-700 mx-auto mb-6" />
                 <h3 className="text-2xl font-bold text-gray-400">The Arena is silent... for now.</h3>
                 <p className="text-gray-500\">New tournaments start every Monday at 00:00 UTC.</p>
              </div>
            )}
            
            {tournaments.map((tournament, i) => (
              <motion.div
                key={tournament.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#1a0b2e] rounded-[40px] p-10 border border-white/5 relative overflow-hidden group hover:border-primary/50 transition-all shadow-2xl"
              >
                {/* Background Decor */}
                <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-primary/20 rounded-full blur-[100px] group-hover:bg-primary/30 transition-all"></div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-10">
                    <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center text-primary border border-white/10 group-hover:scale-110 group-hover:rotate-6 transition-all">
                      <Swords className="w-8 h-8" />
                    </div>
                    <div className="text-right">
                       <div className="text-[10px] font-black uppercase text-gray-500 tracking-tighter mb-1">Weekly Prize Pool</div>
                       <div className="text-2xl font-black text-accent">+{tournament.bonusXP} XP</div>
                    </div>
                  </div>

                  <h3 className="text-3xl font-black italic tracking-tight mb-4 group-hover:text-primary transition-colors">{tournament.name}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-1">
                    {tournament.type === 'CODING' ? 'Solve complex algorithmic challenges against the clock.' : 'Master the weekly curriculum with record speed and accuracy.'}
                  </p>

                  <div className="grid grid-cols-3 gap-4 mb-10">
                    <div className="bg-black/40 rounded-2xl p-4 border border-white/5 text-center">
                       <Users className="w-4 h-4 text-primary mx-auto mb-2" />
                       <div className="text-lg font-black">{tournament._count?.results || 0}</div>
                       <div className="text-[8px] uppercase font-bold text-gray-500 tracking-widest">Joined</div>
                    </div>
                    <div className="bg-black/40 rounded-2xl p-4 border border-white/5 text-center">
                       <Clock className="w-4 h-4 text-accent mx-auto mb-2" />
                       <div className="text-lg font-black truncate">2d 12h</div>
                       <div className="text-[8px] uppercase font-bold text-gray-500 tracking-widest">Left</div>
                    </div>
                    <div className="bg-black/40 rounded-2xl p-4 border border-white/5 text-center">
                       <Award className="w-4 h-4 text-yellow-500 mx-auto mb-2" />
                       <div className="text-lg font-black">TOP 3</div>
                       <div className="text-[8px] uppercase font-bold text-gray-500 tracking-widest">Badges</div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                     <button className="flex-[2] bg-primary hover:bg-primary/90 text-white font-black py-4 rounded-2xl transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)] flex items-center justify-center gap-2">
                       Enter Battle <Zap className="w-4 h-4 fill-white" />
                     </button>
                     <button className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-bold text-sm">
                       Leaderboard
                     </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Tournament Rules or Info */}
        <div className="mt-20 grid md:grid-cols-3 gap-8 text-center bg-black/40 rounded-3xl p-12 border border-white/5">
           <div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                 <Trophy className="w-6 h-6" />
              </div>
              <h4 className="font-bold mb-2">Fair Play</h4>
              <p className="text-gray-500 text-xs">Anti-cheat systems moniter all code submissions in real-time.</p>
           </div>
           <div>
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 text-accent">
                 <Award className="w-6 h-6" />
              </div>
              <h4 className="font-bold mb-2">Automatic Badges</h4>
              <p className="text-gray-500 text-xs">Top performers get unique profile badges automatically.</p>
           </div>
           <div>
              <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-yellow-500">
                 <Zap className="w-6 h-6" />
              </div>
              <h4 className="font-bold mb-2">Bonus XP</h4>
              <p className="text-gray-500 text-xs">Participating alone grants +100 XP even if you don't win.</p>
           </div>
        </div>
      </div>
    </DashboardShell>
  );
};

export default TournamentsPage;
