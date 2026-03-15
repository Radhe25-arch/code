import React from 'react';
import { motion } from 'framer-motion';
import { 
  Play, BookOpen, Trophy, Swords, Code, Calendar, Backpack 
} from 'lucide-react';
import DashboardShell from '../components/DashboardShell';
import useAuthStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();


  return (
    <DashboardShell>
      <div className="grid grid-cols-12 gap-6">
        {/* Welcome Section */}
        <div className="col-span-12 flex flex-col gap-2 mb-4">
          <h2 className="text-3xl font-bold italic tracking-tight">Warrior {user?.fullName?.split(' ')[0]} <span className="text-primary">Returns!</span> ⚔️</h2>
          <p className="text-gray-400">Your current learning streak is at 5 days. You're in the top 10% of learners this week!</p>
        </div>

        {/* Left Column */}
        <div className="col-span-8 space-y-6">
          <div className="relative bg-gradient-to-r from-primary/20 to-purple-900/40 rounded-3xl p-8 border border-primary/20 overflow-hidden group">
            <div className="relative z-10">
              <div className="text-primary text-xs font-bold uppercase tracking-widest mb-2">Continue Learning</div>
              <h3 className="text-2xl font-bold mb-4">Mastering React Hooks & State</h3>
              <div className="flex items-center gap-6 text-sm text-gray-300 mb-6">
                <span className="flex items-center gap-2"><BookOpen className="w-4 h-4" /> Lesson 8 of 12</span>
                <span className="flex items-center gap-2"><Trophy className="w-4 h-4" /> +250 XP reward</span>
              </div>
              <button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all group-hover:px-8 shadow-lg shadow-primary/20">
                Resume Quest <Play className="w-4 h-4 fill-white" />
              </button>
            </div>
            <Code className="absolute right-8 bottom-8 w-32 h-32 text-white/5 -rotate-12 group-hover:-rotate-6 transition-transform" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-[#1a0b2e] rounded-3xl p-6 border border-white/5 shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-bold flex items-center gap-2"><Trophy className="w-4 h-4 text-accent" /> Daily Quest</h4>
                <div className="text-[10px] font-black text-gray-500 uppercase">Resets in 12h</div>
              </div>
              <div className="space-y-4">
                <p className="text-xs text-gray-400 italic">"Solve 3 curriculum lessons today to maintain your legendary streak!"</p>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Progress</span>
                  <span className="font-bold text-accent">1/3 Completed</span>
                </div>
                <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                  <div className="h-full bg-accent w-[33%] shadow-[0_0_10px_rgba(0,217,181,0.5)]"></div>
                </div>
              </div>
            </div>

            <div className="bg-[#1a0b2e] rounded-3xl p-6 border border-white/5 group cursor-pointer hover:border-primary/40 transition-all shadow-xl" onClick={() => navigate('/inventory')}>
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-bold flex items-center gap-2"><Backpack className="w-4 h-4 text-primary" /> Active Gear</h4>
                <div className="bg-primary/10 px-2 py-0.5 rounded text-[10px] text-primary border border-primary/20">SHOP</div>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary text-2xl">
                  🧠
                </div>
                <div>
                  <div className="text-sm font-bold">Scholar's Focus</div>
                  <div className="text-[10px] text-primary font-black uppercase tracking-widest">+10% XP BOOST</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div className="col-span-4 space-y-6">
          <div className="bg-[#1a0b2e] rounded-3xl p-6 border border-white/5 shadow-2xl">
            <h4 className="font-bold mb-6">XP Tracker</h4>
            <div className="flex justify-center mb-6 relative">
              <div className="w-24 h-24 rounded-full border-4 border-white/5 flex items-center justify-center">
                <span className="text-2xl font-bold">12</span>
              </div>
              <svg className="absolute top-0 w-24 h-24 -rotate-90">
                <circle cx="48" cy="48" r="44" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-primary" strokeDasharray="276" strokeDashoffset="80" />
              </svg>
            </div>
            <p className="text-center text-sm text-gray-400">1,250 / 2,000 XP to next level</p>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
};

export default Dashboard;
