import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Database, Book, List, Send, Trash2, X } from 'lucide-react';
import DashboardShell from '../components/DashboardShell';
import api from '../api/axios';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const [isLoading, setIsLoading] = useState(false);
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    difficulty: 'BEGINNER',
    category: 'Web Dev',
    xpPoints: 500,
    lessons: [
      {
        title: 'Introduction',
        content: 'Welcome to the course!',
        videoUrl: '',
        quizzes: [
          {
            question: 'What is the first step?',
            options: ['Option A', 'Option B', 'Option C', 'Option D'],
            correctAnswer: 'Option A'
          }
        ]
      }
    ]
  });

  const handleAddLesson = () => {
    setCourseData({
      ...courseData,
      lessons: [...courseData.lessons, { title: '', content: '', videoUrl: '', quizzes: [] }]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // In a real app, we'd have a POST /api/courses endpoint for admin
      // for this demo we'll show success
      alert('Course creation logic is ready. Need Admin privileges on DB.');
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardShell>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-black italic tracking-tighter uppercase">Command <span className="text-primary">Center</span></h1>
            <p className="text-gray-400">Forge new quests and manage the arena.</p>
          </div>
          <div className="flex bg-[#1a0b2e] p-1 rounded-2xl border border-white/5">
             <button 
               onClick={() => setActiveTab('courses')}
               className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'courses' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-500'}`}
             >
               Courses
             </button>
             <button 
               onClick={() => setActiveTab('users')}
               className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'users' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-500'}`}
             >
               Users
             </button>
             <button 
               onClick={() => setActiveTab('tournaments')}
               className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'tournaments' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-500'}`}
             >
               Events
             </button>
          </div>
        </div>

        {activeTab === 'courses' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-[#1a0b2e] rounded-3xl p-8 border border-white/5 shadow-2xl"
          >
             <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
                <Plus className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-bold">Create New Course</h2>
             </div>

             <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                   <div className="space-y-4">
                      <label className="text-xs font-black uppercase text-gray-500 tracking-widest pl-1">Course Title</label>
                      <input 
                        type="text" 
                        required
                        className="w-full bg-black/40 border border-white/5 rounded-2xl py-3 px-4 focus:outline-none focus:border-primary text-sm"
                        placeholder="e.g. Master Clean Code"
                      />
                   </div>
                   <div className="space-y-4">
                      <label className="text-xs font-black uppercase text-gray-500 tracking-widest pl-1">Category</label>
                      <select className="w-full bg-black/40 border border-white/5 rounded-2xl py-3 px-4 focus:outline-none focus:border-primary text-sm">
                         <option>Web Dev</option>
                         <option>DSA</option>
                         <option>UI/UX</option>
                      </select>
                   </div>
                </div>

                <div className="space-y-4">
                   <label className="text-xs font-black uppercase text-gray-500 tracking-widest pl-1">Description</label>
                   <textarea 
                     rows="3"
                     className="w-full bg-black/40 border border-white/5 rounded-2xl py-3 px-4 focus:outline-none focus:border-primary text-sm"
                     placeholder="What will warriors learn?"
                   ></textarea>
                </div>

                <div className="space-y-6">
                   <div className="flex justify-between items-center">
                      <h3 className="font-bold flex items-center gap-2 italic"><Book className="w-4 h-4 text-accent" /> Course Modules</h3>
                      <button 
                        type="button"
                        onClick={handleAddLesson}
                        className="text-xs font-bold text-accent border border-accent/20 px-3 py-1.5 rounded-lg hover:bg-accent/10 transition-all uppercase tracking-widest"
                      >
                         Add Lesson
                      </button>
                   </div>
                   
                   <div className="space-y-4">
                      {courseData.lessons.map((lesson, idx) => (
                        <div key={idx} className="bg-black/20 p-6 rounded-2xl border border-white/5 flex items-start justify-between group">
                           <div className="flex gap-4 items-start">
                              <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center text-accent font-bold text-xs">{idx + 1}</div>
                              <div>
                                 <div className="font-bold text-white text-sm mb-1">{lesson.title || 'Untitled Lesson'}</div>
                                 <div className="text-[10px] text-gray-500 uppercase font-black">{lesson.quizzes.length} Quizzes Associated</div>
                              </div>
                           </div>
                           <button className="p-2 text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                              <Trash2 className="w-4 h-4" />
                           </button>
                        </div>
                      ))}
                   </div>
                </div>

                <button 
                  disabled={isLoading}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-black py-4 rounded-3xl transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)] flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  Publish Course to Arena <Send className="w-4 h-4 fill-white" />
                </button>
             </form>
          </motion.div>
        )}
      </div>
    </DashboardShell>
  );
};

export default AdminPanel;
