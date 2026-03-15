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
      <section className="relative pt-40 pb-24 px-8">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/20 blur-[150px] rounded-full -z-10"></div>
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-primary text-sm font-semibold mb-6"
          >
            🚀 100% Free Gamified Learning
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight"
          >
            Learn to Code. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">For Free. Forever.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10"
          >
            Master web development, DSA, and programming through challenges, tournaments, and a world-class curriculum. No hidden fees. Just code.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/signup" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full text-lg font-bold flex items-center justify-center gap-2 group transition-all">
              Start Learning Free <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="#courses" className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-4 rounded-full text-lg font-bold transition-all">
              View Courses
            </a>
          </motion.div>
        </div>
      </section>

      {/* Stats Ticker Placeholder */}
      <section className="bg-black/40 border-y border-white/5 py-8">
        <div className="max-w-6xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Active Students', value: '150k+' },
            { label: 'Courses', value: '50+' },
            { label: 'Tournaments', value: '2k+' },
            { label: 'XP Awarded', value: '1.2B+' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-500 text-sm uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-8 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why CodeArena?</h2>
          <p className="text-gray-400">Everything you need to go from beginner to legend.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <Zap className="text-yellow-400" />, title: 'Gamified Experience', desc: 'Earn XP, level up, and unlock epic badges as you learn.' },
            { icon: <Target className="text-accent" />, title: 'Weekly Tournaments', desc: 'Compete with developers worldwide in live coding battles.' },
            { icon: <BookOpen className="text-primary" />, title: 'Premium Courses', desc: 'High-quality content on Web Dev, DSA, AI, and more.' },
            { icon: <Users className="text-blue-400" />, title: 'Vibrant Community', desc: 'Join thousands of learners and share your achievements.' },
            { icon: <Rocket className="text-red-400" />, title: 'Progress Tracking', desc: 'Detailed analytics and roadmaps for your career growth.' },
            { icon: <Award className="text-green-400" />, title: '100% Free', desc: 'No subscriptions, no paywalls. Forever open for everyone.' },
          ].map((feature, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="bg-[#1a0b2e] p-8 rounded-2xl border border-white/5 hover:border-primary/30 transition-all group"
            >
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
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
