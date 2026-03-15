import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  Home, BookOpen, Trophy, Swords, User, Settings, 
  Search, Bell, Zap, TrendingUp, Flame, LogOut, Backpack, Globe
} from 'lucide-react';
import useAuthStore from '../store/authStore';

const DashboardShell = ({ children }) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { icon: <Home className="w-5 h-5" />, label: 'Dashboard', path: '/dashboard' },
    { icon: <BookOpen className="w-5 h-5" />, label: 'My Courses', path: '/courses' },
    { icon: <Trophy className="w-5 h-5" />, label: 'Leaderboard', path: '/leaderboard' },
    { icon: <Swords className="w-5 h-5" />, label: '1v1 Arena', path: '/duels' },
    { icon: <Backpack className="w-5 h-5" />, label: 'Inventory', path: '/inventory' },
    { icon: <Globe className="w-5 h-5" />, label: 'Portfolio Builder', path: '/portfolio-builder' },
    { icon: <User className="w-5 h-5" />, label: 'My Profile', path: '/profile' },

    { icon: <Settings className="w-5 h-5" />, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-[#0c001c] text-white flex font-inter">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a0b2e] border-r border-white/5 flex flex-col fixed h-full z-20">
        <Link to="/" className="p-8 text-2xl font-bold flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Zap className="text-white w-5 h-5" />
          </div>
          CodeArena
        </Link>

        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                location.pathname === item.path ? 'bg-primary text-white shadow-[0_0_15px_rgba(124,58,237,0.3)]' : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 space-y-4">
          <div className="bg-black/20 p-4 rounded-2xl border border-white/5">
            <div className="flex items-center gap-3 mb-2">
              <Flame className="w-5 h-5 text-accent fill-accent" />
              <div className="text-sm font-bold">5 Day Streak</div>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-accent w-2/3"></div>
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:bg-red-500/10 hover:text-red-500 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Top Bar */}
        <header className="sticky top-0 z-10 bg-[#0c001c]/80 backdrop-blur-md px-8 py-4 flex justify-between items-center border-b border-white/5">
          <div className="relative w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search..."
              className="w-full bg-[#1a0b2e] border border-white/5 rounded-full py-2 pl-12 pr-4 focus:outline-none focus:border-primary/50 text-sm"
            />
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-primary/10 px-4 py-1 rounded-full border border-primary/20">
              <Zap className="w-4 h-4 text-primary fill-primary" />
              <span className="text-xs font-bold">{user?.xp || 0} XP</span>
            </div>
            <div className="flex items-center gap-2 bg-accent/10 px-4 py-1 rounded-full border border-accent/20">
              <TrendingUp className="w-4 h-4 text-accent" />
              <span className="text-xs font-bold">Level {user?.level || 1}</span>
            </div>
            <button className="relative p-2 bg-[#1a0b2e] rounded-full border border-white/5 hover:bg-white/5 transition-all">
              <Bell className="w-5 h-5 text-gray-400" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-[#0c001c]"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-white/5">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-bold">{user?.fullName}</div>
                <div className="text-[10px] text-gray-500 uppercase">{user?.role}</div>
              </div>
              <img 
                src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username}`} 
                alt="Avatar" 
                className="w-8 h-8 rounded-full border border-primary/20"
              />
            </div>
          </div>
        </header>

        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardShell;
