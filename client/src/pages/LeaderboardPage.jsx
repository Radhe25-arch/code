import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Zap, TrendingUp, Search } from 'lucide-react';
import DashboardShell from '../components/DashboardShell';
import api from '../api/axios';
import useAuthStore from '../store/authStore';

const LeaderboardPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user: currentUser } = useAuthStore();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await api.get('/leaderboard/global');
        setUsers(res.data);
      } catch (error) {
        console.error('Leaderboard fetch failed', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  const topThree = users.slice(0, 3);
  const others = users.slice(3);

  return (
    <DashboardShell>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-block p-3 bg-primary/10 rounded-full mb-4 border border-primary/20"
          >
            <Trophy className="w-10 h-10 text-primary" />
          </motion.div>
          <h1 className="text-4xl font-black italic tracking-tighter mb-4">HALL OF <span className="text-primary">LEGENDS</span></h1>
          <p className="text-gray-400">The most legendary developers of CodeArena. Are you one of them?</p>
        </div>

        {/* Podium */}
        <div className="flex justify-center items-end gap-4 md:gap-12 mb-20 px-4">
          {/* Silver - Rank 2 */}
          {topThree[1] && (
            <motion.div 
              initial={{ y: 50, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="relative mb-4">
                <img src={topThree[1].avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${topThree[1].username}`} className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-gray-400 p-1" alt="" />
                <div className="absolute -top-2 -right-2 bg-gray-400 text-black w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">2</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-gray-300">{topThree[1].username}</div>
                <div className="text-primary text-sm font-black tracking-widest">{topThree[1].xp} XP</div>
              </div>
              <div className="h-32 w-24 md:w-32 bg-gradient-to-t from-gray-400/20 to-gray-400/5 mt-4 rounded-t-3xl border-t border-gray-400/30"></div>
            </motion.div>
          )}

          {/* Gold - Rank 1 */}
          {topThree[0] && (
            <motion.div 
              initial={{ y: 50, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }}
              className="flex flex-col items-center"
            >
              <div className="relative mb-6">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                   <Award className="w-12 h-12 text-yellow-500 animate-bounce" />
                </div>
                <img src={topThree[0].avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${topThree[0].username}`} className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-yellow-500 p-1 shadow-[0_0_30px_rgba(234,179,8,0.3)]" alt="" />
                <div className="absolute -top-2 -right-2 bg-yellow-500 text-black w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">1</div>
              </div>
              <div className="text-center">
                <div className="font-black text-white text-xl">{topThree[0].username}</div>
                <div className="text-primary text-lg font-black tracking-widest">{topThree[0].xp} XP</div>
              </div>
              <div className="h-44 w-28 md:w-40 bg-gradient-to-t from-yellow-500/20 to-yellow-500/5 mt-4 rounded-t-3xl border-t border-yellow-500/30"></div>
            </motion.div>
          )}

          {/* Bronze - Rank 3 */}
          {topThree[2] && (
            <motion.div 
              initial={{ y: 50, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center"
            >
              <div className="relative mb-4">
                <img src={topThree[2].avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${topThree[2].username}`} className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-orange-700 p-1" alt="" />
                <div className="absolute -top-2 -right-2 bg-orange-700 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">3</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-orange-400">{topThree[2].username}</div>
                <div className="text-primary text-sm font-black tracking-widest">{topThree[2].xp} XP</div>
              </div>
              <div className="h-24 w-24 md:w-32 bg-gradient-to-t from-orange-700/20 to-orange-700/5 mt-4 rounded-t-3xl border-t border-orange-700/30"></div>
            </motion.div>
          )}
        </div>

        {/* List */}
        <div className="bg-[#1a0b2e] rounded-3xl border border-white/5 overflow-hidden shadow-2xl mb-20">
          <div className="p-6 border-b border-white/5 flex justify-between items-center bg-black/20">
             <div className="flex gap-4">
               <button className="text-sm font-bold text-primary border-b-2 border-primary pb-1">Global</button>
               <button className="text-sm font-bold text-gray-500 hover:text-white transition-colors pb-1">This Week</button>
               <button className="text-sm font-bold text-gray-500 hover:text-white transition-colors pb-1">Friends</button>
             </div>
             <div className="relative hidden sm:block">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
               <input type="text" placeholder="Search warriors..." className="bg-black/40 border border-white/5 rounded-full py-1.5 pl-9 pr-4 text-xs focus:outline-none focus:border-primary w-48" />
             </div>
          </div>
          
          <div className="divide-y divide-white/5">
            {loading ? (
              [1,2,3,4,5].map(i => <div key={i} className="p-6 h-20 animate-pulse bg-white/5"></div>)
            ) : (
              others.map((u, i) => (
                <div 
                  key={u.id}
                  className={`p-6 flex items-center gap-6 transition-all hover:bg-white/5 ${u.id === currentUser?.id ? 'bg-primary/5' : ''}`}
                >
                  <div className="w-8 text-center font-black text-gray-600 text-xl italic">{i + 4}</div>
                  <img src={u.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.username}`} className="w-12 h-12 rounded-full border border-white/10" alt="" />
                  <div className="flex-1">
                    <div className="font-bold flex items-center gap-2">
                      {u.username}
                      {u.id === currentUser?.id && <span className="bg-primary/20 text-primary text-[10px] px-2 py-0.5 rounded-full uppercase">You</span>}
                    </div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{u.level}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-black text-primary italic tracking-tight">{u.xp}</div>
                    <div className="text-[10px] text-gray-500 uppercase">Total XP</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* User Stats Card (Floating) */}
        {!loading && currentUser && (
           <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-30">
             <div className="bg-primary hover:bg-primary/90 rounded-3xl p-4 md:p-6 flex items-center gap-4 md:gap-8 shadow-[0_0_50px_rgba(124,58,237,0.5)] border border-primary-foreground/20 cursor-pointer group transition-all">
                <div className="font-black italic text-2xl md:text-3xl opacity-50">#124</div>
                <img src={currentUser.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.username}`} className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-white/30" alt="" />
                <div className="flex-1">
                   <div className="font-black text-lg">Your Current Rank</div>
                   <div className="text-xs opacity-70">Keep learning to break into the Top 10!</div>
                </div>
                <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-2xl border border-white/10">
                   <TrendingUp className="w-4 h-4" />
                   <span className="font-bold">+{currentUser.xp % 100} Today</span>
                </div>
             </div>
           </div>
        )}
      </div>
    </DashboardShell>
  );
};

export default LeaderboardPage;
