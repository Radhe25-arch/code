import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn } from 'lucide-react';
import useAuthStore from '../store/authStore';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await login(email, password);
    if (res.success) {
      navigate('/dashboard');
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0c001c] p-4 font-inter">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-[#1a0b2e] rounded-2xl p-8 border border-purple-500/20 shadow-2xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400">Continue your legendary coding quest.</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="email"
              placeholder="Email Address"
              required
              className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-primary text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-primary text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
              <input type="checkbox" className="accent-primary" /> Remember me
            </label>
            <Link to="/forgot-password" title="Coming soon!" className="text-primary hover:underline">Forgot password?</Link>
          </div>

          <div className="space-y-4">
            <button
               type="button"
               onClick={() => window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/google`}
              className="w-full flex items-center justify-center gap-3 bg-white text-black py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-gray-200 transition-all border border-white/10"
            >
               <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
               Login with Google
            </button>
            <div className="flex items-center gap-4 py-2">
               <div className="h-[1px] bg-white/10 flex-1"></div>
               <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">or</span>
               <div className="h-[1px] bg-white/10 flex-1"></div>
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-primary py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Enter the Arena'}
            </button>
          </div>
        </form>

        <p className="text-center mt-8 text-gray-500 text-sm">
          New here? <Link to="/signup" className="text-primary hover:underline">Create an account</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
