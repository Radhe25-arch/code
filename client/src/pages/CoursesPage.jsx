import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, BookOpen, Star, Zap, ChevronRight } from 'lucide-react';
import DashboardShell from '../components/DashboardShell';
import api from '../api/axios';
import { Link } from 'react-router-dom';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get('/courses');
        setCourses(res.data);
      } catch (error) {
        console.error('Failed to fetch courses', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const categories = ['All', 'Web Dev', 'DSA', 'Python', 'JS', 'Mobile', 'AI'];

  const filteredCourses = filter === 'All' 
    ? courses 
    : courses.filter(c => c.category === filter);

  return (
    <DashboardShell>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-extrabold mb-2 tracking-tight">Arena <span className="text-primary">Library</span></h1>
            <p className="text-gray-400">Master new skills and earn legend-tier XP.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search courses..."
                className="bg-[#1a0b2e] border border-white/5 rounded-xl py-2.5 pl-12 pr-4 focus:outline-none focus:border-primary w-full sm:w-64"
              />
            </div>
            <div className="flex bg-[#1a0b2e] p-1 rounded-xl border border-white/5 overflow-x-auto no-scrollbar">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                    filter === cat ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-500 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-64 bg-[#1a0b2e] rounded-3xl animate-pulse border border-white/5"></div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Placeholder if no courses */}
            {filteredCourses.length === 0 && (
              <div className="col-span-12 text-center py-20 bg-[#1a0b2e] rounded-3xl border border-dashed border-white/10">
                <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No courses found in this category yet. Check back soon!</p>
              </div>
            )}
            
            {filteredCourses.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-[#1a0b2e] rounded-3xl border border-white/5 overflow-hidden group hover:border-primary/30 transition-all flex flex-col h-full shadow-xl"
              >
                <div className="h-40 bg-gradient-to-br from-primary/20 to-purple-900/40 relative flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-primary/40 group-hover:scale-110 transition-transform" />
                  <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-accent border border-accent/20 uppercase tracking-widest">
                    {course.difficulty}
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{course.title}</h3>
                  <p className="text-gray-400 text-sm line-clamp-2 mb-6 flex-1">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                       <Zap className="w-4 h-4 text-primary fill-primary" />
                       <span className="text-xs font-bold text-gray-300">+{course.xpPoints} XP</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                       <span className="text-xs font-bold text-gray-300">{course._count?.lessons || 0} Lessons</span>
                    </div>
                  </div>
                  
                  <Link 
                    to={`/courses/${course.id}`}
                    className="w-full bg-white/5 group-hover:bg-primary text-white group-hover:text-white py-3 rounded-2xl text-center text-sm font-bold transition-all flex items-center justify-center gap-2"
                  >
                    Enter Quest <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-all" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </DashboardShell>
  );
};

export default CoursesPage;
