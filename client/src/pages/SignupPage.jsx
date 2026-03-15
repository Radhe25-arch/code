import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Briefcase, Calendar, ChevronRight } from 'lucide-react';
import useAuthStore from '../store/authStore';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    username: '',
    role: 'STUDENT',
    ageGroup: 'COLLEGE',
    interests: [],
  });
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);
  const { signup } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInterestToggle = (interest) => {
    if (formData.interests.includes(interest)) {
      setFormData({
        ...formData,
        interests: formData.interests.filter((i) => i !== interest),
      });
    } else {
      setFormData({
        ...formData,
        interests: [...formData.interests, interest],
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await signup(formData);
    if (res.success) {
      navigate('/dashboard');
    } else {
      setError(res.message);
    }
  };

  const interestsList = ['Web Dev', 'DSA', 'Python', 'JavaScript', 'Mobile Dev', 'AI/ML'];

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0c001c] p-4 font-inter">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#1a0b2e] rounded-2xl p-8 border border-purple-500/20 shadow-2xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Join CodeArena</h1>
          <p className="text-gray-400">Level up your coding journey today.</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 && (
            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-primary text-white"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-primary text-white"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-primary text-white"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <button 
                type="button" 
                onClick={() => setStep(2)}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 group"
              >
                Next Step <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-primary text-white"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <Briefcase className="absolute left-3 top-12 -translate-y-12 text-gray-500 w-4 h-4 hidden" />
                  <label className="text-xs text-gray-500 mb-1 block ml-1">Role</label>
                  <select
                    name="role"
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-2 px-3 focus:outline-none focus:border-primary text-white text-sm"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="STUDENT">Student</option>
                    <option value="PROFESSIONAL">Professional</option>
                    <option value="BEGINNER">Beginner</option>
                  </select>
                </div>
                <div className="relative">
                  <label className="text-xs text-gray-500 mb-1 block ml-1">Age Group</label>
                  <select
                    name="ageGroup"
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-2 px-3 focus:outline-none focus:border-primary text-white text-sm"
                    value={formData.ageGroup}
                    onChange={handleChange}
                  >
                    <option value="SCHOOL">School</option>
                    <option value="COLLEGE">College</option>
                    <option value="PROFESSIONAL">Working</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="text-xs text-gray-500 mb-2 block ml-1">Interests</label>
                <div className="flex flex-wrap gap-2">
                  {interestsList.map((interest) => (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => handleInterestToggle(interest)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                        formData.interests.includes(interest)
                          ? 'bg-accent text-black shadow-[0_0_10px_rgba(0,217,181,0.5)]'
                          : 'bg-white/5 text-gray-400 border border-white/10'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  type="button" 
                  onClick={() => setStep(1)}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-white font-medium py-3 rounded-xl transition-all"
                >
                  Back
                </button>
                <button 
                  type="submit" 
                  className="flex-[2] bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)]"
                >
                  Create Account
                </button>
              </div>
            </motion.div>
          )}
        </form>

        <p className="text-center mt-8 text-gray-500 text-sm">
          Already have an account? <Link to="/login" className="text-primary hover:underline">Login</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignupPage;
