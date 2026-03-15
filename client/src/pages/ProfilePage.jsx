import React from 'react';
import { motion } from 'framer-motion';
import { 
  Award, Zap, Trophy, Target, Calendar, Share2, 
  BookOpen, Star, TrendingUp, ShieldCheck, Swords
} from 'lucide-react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer 
} from 'recharts';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import DashboardShell from '../components/DashboardShell';
import useAuthStore from '../store/authStore';

const ProfilePage = () => {
  const { user } = useAuthStore();

  const skillData = [
    { subject: 'Web Dev', A: 120, fullMark: 150 },
    { subject: 'DSA', A: 98, fullMark: 150 },
    { subject: 'Python', A: 86, fullMark: 150 },
    { subject: 'JS', A: 99, fullMark: 150 },
    { subject: 'Mobile', A: 45, fullMark: 150 },
    { subject: 'AI/ML', A: 60, fullMark: 150 },
  ];

  const today = new Date();
  const heatmapData = [
    { date: '2026-03-01', count: 1 },
    { date: '2026-03-02', count: 3 },
    { date: '2026-03-05', count: 2 },
    { date: '2026-03-10', count: 4 },
    { date: '2026-03-12', count: 1 },
    { date: '2026-03-14', count: 5 },
    { date: '2026-03-15', count: 2 },
    { date: '2026-03-16', count: 1 },
  ];

  return (
    <DashboardShell>
      <div className="max-w-6xl mx-auto pb-20">
        {/* Profile Header Block */}
        <div className="relative bg-[#1a0b2e] rounded-[40px] p-8 md:p-12 border border-white/5 overflow-hidden mb-8 shadow-2xl">
           <div className="absolute top-0 right-0 p-8">
              <button className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-all border border-white/5 flex items-center gap-2 group">
                 <Share2 className="w-5 h-5 group-hover:text-primary" />
                 <span className="text-sm font-bold">Share Link</span>
              </button>
           </div>
           
           <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
              <div className="relative">
                 <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-primary p-1">
                    <img src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username}`} className="w-full h-full rounded-full bg-black" alt="" />
                 </div>
                 <div className="absolute bottom-2 right-2 bg-accent text-black p-2 rounded-full border-4 border-[#1a0b2e]">
                    <ShieldCheck className="w-6 h-6" />
                 </div>
              </div>
              
              <div className="text-center md:text-left">
                 <div className="flex flex-col md:flex-row md:items-center gap-4 mb-2">
                    <h1 className="text-4xl font-black italic tracking-tighter">{user?.fullName}</h1>
                    <div className="inline-flex bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mx-auto md:mx-0">
                       {user?.level} Warrior
                    </div>
                 </div>
                 <p className="text-gray-400 font-medium mb-6">@{user?.username} • Joined {new Date(user?.joinedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                 
                 <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    <div className="bg-black/40 px-6 py-3 rounded-2xl border border-white/5 text-center">
                       <div className="text-xs text-gray-500 uppercase font-black tracking-widest mb-1">Global Rank</div>
                       <div className="text-xl font-black text-white italic">#1,242</div>
                    </div>
                    <div className="bg-black/40 px-6 py-3 rounded-2xl border border-white/5 text-center">
                       <div className="text-xs text-gray-500 uppercase font-black tracking-widest mb-1">Total XP</div>
                       <div className="text-xl font-black text-primary italic">{user?.xp}</div>
                    </div>
                    <div className="bg-black/40 px-6 py-3 rounded-2xl border border-white/5 text-center">
                       <div className="text-xs text-gray-500 uppercase font-black tracking-widest mb-1">Accuracy</div>
                       <div className="text-xl font-black text-accent italic">94.2%</div>
                    </div>
                 </div>
              </div>
           </div>
           
           <div className="absolute bottom-[-100px] left-[-100px] w-80 h-80 bg-primary/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="grid grid-cols-12 gap-8">
           {/* Skills Analysis */}
           <div className="col-span-12 lg:col-span-5 space-y-8">
              <div className="bg-[#1a0b2e] rounded-3xl p-8 border border-white/5 shadow-xl h-full flex flex-col">
                 <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" /> Skill Radar
                 </h3>
                 <div className="flex-1 w-full h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                       <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                          <PolarGrid stroke="#7C3AED" strokeOpacity={0.2} />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                          <Radar name="Skills" dataKey="A" stroke="#7C3AED" fill="#7C3AED" fillOpacity={0.5} />
                       </RadarChart>
                    </ResponsiveContainer>
                 </div>
              </div>
           </div>

           {/* Achievements & Activity */}
           <div className="col-span-12 lg:col-span-7 space-y-8">
              {/* Heatmap */}
              <div className="bg-[#1a0b2e] rounded-3xl p-8 border border-white/5 shadow-xl">
                 <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                       <Calendar className="w-5 h-5 text-accent" /> Activity Heatmap
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                       <span>Less</span>
                       <div className="flex gap-1">
                          {[1,2,3,4,5].map(i => <div key={i} className={`w-3 h-3 rounded-sm ${i === 1 ? 'bg-white/5' : 'bg-primary'}`} style={{ opacity: i/5 }}></div>)}
                       </div>
                       <span>More</span>
                    </div>
                 </div>
                 <div className="overflow-x-auto no-scrollbar pb-4 heatmap-container">
                    <CalendarHeatmap
                      startDate={new Date(new Date().setMonth(today.getMonth() - 6))}
                      endDate={today}
                      values={heatmapData}
                      classForValue={(value) => {
                        if (!value) return 'color-empty';
                        return `color-github-${Math.min(value.count, 4)}`;
                      }}
                    />
                 </div>
              </div>

              {/* Badges Collection */}
              <div className="bg-[#1a0b2e] rounded-3xl p-8 border border-white/5 shadow-xl">
                 <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-500" /> Badge Collection
                 </h3>
                 <div className="grid grid-cols-4 sm:grid-cols-6 gap-6">
                    {[
                      { icon: '🌟', name: 'First Steps' },
                      { icon: '🔥', name: '7 Day Streak' },
                      { icon: '⚡', name: 'Quick Learner' },
                      { icon: '🏆', name: 'Arena Victor' },
                      { icon: '🧠', name: 'DSA Master' },
                      { icon: '🚀', name: 'Beta Legend' },
                      { icon: '🛡️', name: 'Security Pro' },
                      { icon: '💎', name: 'Top 1% Rank' },
                    ].map((badge, i) => (
                      <div key={i} className="flex flex-col items-center group cursor-help transition-all">
                         <div className="w-12 h-12 md:w-16 md:h-16 bg-white/5 rounded-3xl flex items-center justify-center text-2xl md:text-3xl border border-white/5 group-hover:scale-110 group-hover:rotate-6 transition-all group-hover:border-primary group-hover:bg-primary/5 shadow-lg">
                            {badge.icon}
                         </div>
                         <span className="mt-2 text-[10px] text-gray-500 font-bold uppercase text-center">{badge.name}</span>
                      </div>
                    ))}
                 </div>
              </div>

              {/* Tournament History */}
              <div className="bg-[#1a0b2e] rounded-3xl p-8 border border-white/5 shadow-xl">
                 <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                    <Swords className="w-5 h-5 text-red-500" /> Tournament History
                 </h3>
                 <div className="space-y-4">
                    {[
                       { name: 'Binary Blitz #41', rank: '8th', xp: '+250', date: 'Mar 12, 2026' },
                       { name: 'Frontend Forge #12', rank: '2nd', xp: '+800', date: 'Mar 05, 2026' },
                    ].map((tourney, i) => (
                       <div key={i} className="flex items-center justify-between p-4 bg-black/20 rounded-2xl border border-white/5 group hover:bg-black/40 transition-all">
                          <div>
                             <div className="font-bold text-sm text-white">{tourney.name}</div>
                             <div className="text-[10px] text-gray-500 uppercase font-black">{tourney.date}</div>
                          </div>
                          <div className="text-right">
                             <div className={`font-black text-sm italic ${tourney.rank === '2nd' ? 'text-accent' : 'text-gray-400'}`}>Rank {tourney.rank}</div>
                             <div className="text-primary text-[10px] font-bold">{tourney.xp} XP</div>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </div>
      
      <style>{`
        .heatmap-container .react-calendar-heatmap .color-github-1 { fill: rgba(124, 58, 237, 0.2); }
        .heatmap-container .react-calendar-heatmap .color-github-2 { fill: rgba(124, 58, 237, 0.4); }
        .heatmap-container .react-calendar-heatmap .color-github-3 { fill: rgba(124, 58, 237, 0.7); }
        .heatmap-container .react-calendar-heatmap .color-github-4 { fill: rgba(124, 58, 237, 1); }
        .heatmap-container .react-calendar-heatmap .color-empty { fill: #1a0b2e; stroke: rgba(255,255,255,0.05); }
      `}</style>
    </DashboardShell>
  );
};

export default ProfilePage;
