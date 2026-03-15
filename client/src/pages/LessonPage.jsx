import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, CheckCircle, Lock, ChevronLeft, ChevronRight, 
  Code, Book, Award, Zap, Check, HelpCircle
} from 'lucide-react';
import Editor from '@monaco-editor/react';
import confetti from 'canvas-confetti';
import DashboardShell from '../components/DashboardShell';
import api from '../api/axios';
import useAuthStore from '../store/authStore';

const LessonPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { checkAuth } = useAuthStore();
  
  const [course, setCourse] = useState(null);
  const [currentLessonIdx, setCurrentLessonIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState('// Your legendary code goes here...\n\nfunction solution() {\n  return "LFG!";\n}');
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/courses/${id}`);
        setCourse(res.data);
      } catch (error) {
        console.error('Failed to fetch course', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const currentLesson = course?.lessons[currentLessonIdx];

  const handleLessonComplete = async () => {
    try {
      const res = await api.post('/courses/complete-lesson', {
        courseId: course.id,
        lessonId: currentLesson.id
      });
      
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#7C3AED', '#00D9B5', '#ffffff']
      });

      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);

      setCompletedLessons([...completedLessons, currentLesson.id]);
      checkAuth(); // Refresh user XP/Level
    } catch (error) {
      console.error('Completion failed', error);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0c001c] flex items-center justify-center">
       <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <DashboardShell>
      <div className="max-w-7xl mx-auto">
        {/* Course Header */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => navigate('/courses')}
            className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">{course.title}</h1>
            <p className="text-xs text-gray-500 uppercase tracking-widest">{course.category}</p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8 h-[calc(100vh-200px)]">
          {/* Main Lesson Content */}
          <div className="col-span-8 flex flex-col gap-6 overflow-y-auto pr-4 no-scrollbar">
            {/* Video Placeholder */}
            <div className="aspect-video bg-black rounded-3xl border border-white/5 flex items-center justify-center group overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                 <p className="text-primary font-bold">Arena Video Player v1.0</p>
              </div>
              <Play className="w-16 h-16 text-primary fill-primary group-hover:scale-110 transition-transform cursor-pointer" />
              <img src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&q=80" alt="Thumbnail" className="absolute inset-0 w-full h-full object-cover -z-10 opacity-40" />
            </div>

            {/* Lesson Text */}
            <div className="bg-[#1a0b2e] rounded-3xl p-8 border border-white/5">
              <h2 className="text-3xl font-bold mb-6">{currentLesson.title}</h2>
              <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-4">
                <p>{currentLesson.content}</p>
              </div>
            </div>

            {/* Code Editor Section */}
            <div className="bg-[#1a0b2e] rounded-3xl border border-white/5 overflow-hidden">
               <div className="bg-black/40 px-6 py-3 border-b border-white/5 flex justify-between items-center">
                 <div className="flex items-center gap-2">
                   <Code className="w-4 h-4 text-primary" />
                   <span className="text-sm font-bold">Arena Editor</span>
                 </div>
                 <div className="flex gap-2">
                   <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                   <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                   <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                 </div>
               </div>
               <div className="h-64">
                 <Editor
                   height="100%"
                   defaultLanguage="javascript"
                   theme="vs-dark"
                   value={code}
                   onChange={setCode}
                   options={{
                     minimap: { enabled: false },
                     fontSize: 14,
                     fontFamily: "JetBrains Mono, monospace",
                     padding: { top: 20 }
                   }}
                 />
               </div>
               <div className="p-4 bg-black/20 flex justify-end">
                  <button className="bg-accent text-black px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-accent/20 hover:scale-105 transition-all">
                    Run Tests
                  </button>
               </div>
            </div>

            {/* Quiz Section */}
            {currentLesson.quizzes.length > 0 && (
              <div className="bg-[#1a0b2e] rounded-3xl p-8 border border-white/5">
                <div className="flex items-center gap-3 mb-8">
                  <HelpCircle className="w-6 h-6 text-accent" />
                  <h3 className="text-xl font-bold">Lesson Quiz</h3>
                </div>
                
                <div className="space-y-10">
                  {currentLesson.quizzes.map((quiz, qIdx) => (
                    <div key={quiz.id} className="space-y-4">
                      <p className="text-lg font-medium text-white">{qIdx + 1}. {quiz.question}</p>
                      <div className="grid grid-cols-2 gap-4">
                        {quiz.options.map((opt, oIdx) => (
                          <button
                            key={oIdx}
                            onClick={() => setQuizAnswers({ ...quizAnswers, [quiz.id]: opt })}
                            className={`p-4 rounded-2xl border text-sm text-left transition-all ${
                              quizAnswers[quiz.id] === opt 
                                ? 'bg-primary/20 border-primary text-white' 
                                : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={handleLessonComplete}
                  className="mt-12 w-full bg-gradient-to-r from-primary to-purple-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 group transition-all"
                >
                  <Award className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                  Finish & Get XP
                </button>
              </div>
            )}
          </div>

          {/* Sidebar - Lesson List */}
          <div className="col-span-4 flex flex-col gap-6">
            <div className="bg-[#1a0b2e] rounded-3xl p-6 border border-white/5 h-full overflow-hidden flex flex-col shadow-2xl">
              <h4 className="font-bold mb-6 flex items-center gap-2">
                <Book className="w-5 h-5 text-primary" />
                Syllabus
              </h4>
              <div className="flex-1 overflow-y-auto no-scrollbar space-y-2">
                {course.lessons.map((lesson, idx) => (
                  <button
                    key={lesson.id}
                    onClick={() => {
                      setCurrentLessonIdx(idx);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${
                      currentLessonIdx === idx 
                        ? 'bg-primary/10 border border-primary/30' 
                        : 'hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      completedLessons.includes(lesson.id) 
                        ? 'bg-accent text-black' 
                        : currentLessonIdx === idx ? 'bg-primary text-white' : 'bg-white/5 text-gray-500'
                    }`}>
                      {completedLessons.includes(lesson.id) ? <Check className="w-4 h-4" /> : idx + 1}
                    </div>
                    <div className="text-left flex-1">
                      <div className={`text-sm font-bold ${currentLessonIdx === idx ? 'text-white' : 'text-gray-400'}`}>
                        {lesson.title}
                      </div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-tighter">
                        {lesson.quizzes.length} Questions • 50 XP
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showCelebration && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
          >
            <div className="bg-primary px-10 py-6 rounded-3xl shadow-[0_0_50px_rgba(124,58,237,0.8)] text-white text-center">
              <Zap className="w-12 h-12 mx-auto mb-4 fill-white" />
              <h4 className="text-4xl font-black mb-2 italic">LEVEL UP!</h4>
              <p className="font-bold text-xl">+50 XP EARNED</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardShell>
  );
};

export default LessonPage;
