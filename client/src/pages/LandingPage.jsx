import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Code, Rocket, Award, Users, Play, ChevronRight, Zap, Target, BookOpen } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="bg-[#0c001c] text-white overflow-hidden">
      {/* Navbar Placeholder */}
      <nav className="fixed top-0 w-full z-50 bg-[#0c001c]/80 backdrop-blur-md border-b border-white/5 py-4 px-8 flex justify-between items-center">
        <div className="text-2xl font-bold flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Code className="text-white w-5 h-5" />
          </div>
          CodeArena
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
          <a href="#features" className="hover:text-primary transition-colors">Features</a>
          <a href="#courses" className="hover:text-primary transition-colors">Courses</a>
          <a href="#howitworks" className="hover:text-primary transition-colors">How it Works</a>
        </div>
        <div className="flex gap-4">
          <Link to="/login" className="text-sm font-medium hover:text-primary transition-colors my-auto">Login</Link>
          <Link to="/signup" className="bg-primary hover:bg-primary/90 px-5 py-2 rounded-full text-sm font-bold transition-all shadow-[0_0_15px_rgba(124,58,237,0.4)]">
            Join Now
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-8 overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/30 blur-[120px] rounded-full animate-pulse opacity-50"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-accent/20 blur-[150px] rounded-full animate-pulse delay-700 opacity-50"></div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-full text-primary text-xs font-black uppercase tracking-widest mb-8 shadow-xl shadow-primary/10"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary animate-ping"></span>
            100% Free Gamified Learning
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black mb-8 leading-none tracking-tighter"
          >
            Elevate Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-accent animate-gradient">Coding Reality.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg md:text-2xl max-w-3xl mx-auto mb-12 font-medium leading-relaxed"
          >
            The world's first narrative-driven, gamified coding arena. Master Web Dev, DSA, and System Design with zero fees. Just raw skills and legendary rewards.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto"
          >
            <Link to="/signup" className="group relative bg-primary hover:bg-primary/90 text-white px-10 py-5 rounded-2xl text-lg font-black uppercase tracking-widest transition-all overflow-hidden shadow-2xl shadow-primary/40">
              <span className="relative z-10 flex items-center justify-center gap-3">
                Create Account <Rocket className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300"></div>
            </Link>
            <a href="#courses" className="bg-white/5 backdrop-blur-xl hover:bg-white/10 border border-white/10 px-10 py-5 rounded-2xl text-lg font-black uppercase tracking-widest transition-all text-white">
              View Scroll
            </a>
          </motion.div>
        </div>
      </section>

      {/* Live Stats Ticker */}
      <section className="bg-black/60 backdrop-blur-3xl border-y border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            { label: 'Legendary Warriors', value: '150k+', icon: <Users className="text-primary w-4 h-4" /> },
            { label: 'Skill Scrolls', value: '50+', icon: <BookOpen className="text-accent w-4 h-4" /> },
            { label: 'Arena Clashes', value: '2k+', icon: <Zap className="text-yellow-400 w-4 h-4" /> },
            { label: 'XP Burned', value: '1.2B+', icon: <Award className="text-purple-400 w-4 h-4" /> },
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative group text-center lg:text-left"
            >
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
                {stat.icon}
                <div className="text-4xl font-black text-white tracking-tighter group-hover:text-primary transition-colors">{stat.value}</div>
              </div>
              <div className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-8 max-w-7xl mx-auto relative">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-black mb-4 tracking-tighter uppercase italic">The Armory</h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-6 shadow-[0_0_10px_#7C3AED]"></div>
          <p className="text-gray-400 text-lg">Tools and systems designed to forge your coding legacy.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: <Zap className="text-yellow-400" />, title: 'Gamified XP', desc: 'Every line of code awards XP. Level up your warrior and unlock legendary status.' },
            { icon: <Target className="text-accent" />, title: '1v1 Duels', desc: 'Challenge friends in real-time battles. Winner takes the XP, loser earns the lesson.' },
            { icon: <Award className="text-primary" />, title: 'Artifact Store', desc: 'Buy legendary gear with your hard-earned XP to gain passive buffs.' },
            { icon: <Rocket className="text-red-400" />, title: 'Career Radar', desc: 'Automatic portfolio generation based on your actual coding performance.' },
            { icon: <Code className="text-blue-400" />, title: 'Deep Tech Stack', desc: 'Master React, Python, Go, and DSA with industry-standard problems.' },
            { icon: <Users className="text-green-400" />, title: 'Battle Circles', desc: 'Join guilds, share artifacts, and conquer the leaderboard together.' },
          ].map((feature, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#1a0b2e]/50 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/5 hover:border-primary/40 transition-all group overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl group-hover:bg-primary/20 transition-all rounded-full"></div>
              <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center mb-8 group-hover:rotate-12 group-hover:scale-110 transition-all border border-white/5">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-black mb-4 tracking-tight uppercase group-hover:text-primary transition-colors">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed font-medium">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-12 border-t border-white/5 text-center px-8">
        <div className="text-2xl font-bold mb-4">CodeArena</div>
        <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">The world's first completely free, gamified learning platform for developers.</p>
        <div className="text-gray-600 text-xs text-center border-t border-white/5 pt-8">
          © {new Date().getFullYear()} CodeArena. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
