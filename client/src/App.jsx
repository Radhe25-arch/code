import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import CoursesPage from './pages/CoursesPage';
import LessonPage from './pages/LessonPage';
import LeaderboardPage from './pages/LeaderboardPage';
import TournamentsPage from './pages/TournamentsPage';
import ProfilePage from './pages/ProfilePage';
import AdminPanel from './pages/AdminPanel';
import DuelArena from './pages/DuelArena';
import InventoryPage from './pages/InventoryPage';
import PortfolioBuilder from './pages/PortfolioBuilder';
import { SettingsPage } from './pages/PlaceholderPages';

import useAuthStore from './store/authStore';




function App() {
  const { checkAuth, isAuthenticated, loading } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0c001c] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={!isAuthenticated ? <SignupPage /> : <Navigate to="/dashboard" />} />
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/courses" element={isAuthenticated ? <CoursesPage /> : <Navigate to="/login" />} />
        <Route path="/courses/:id" element={isAuthenticated ? <LessonPage /> : <Navigate to="/login" />} />
        <Route path="/leaderboard" element={isAuthenticated ? <LeaderboardPage /> : <Navigate to="/login" />} />
        <Route path="/tournaments" element={isAuthenticated ? <TournamentsPage /> : <Navigate to="/login" />} />
        <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/duels" element={isAuthenticated ? <DuelArena /> : <Navigate to="/login" />} />
        <Route path="/inventory" element={isAuthenticated ? <InventoryPage /> : <Navigate to="/login" />} />
        <Route path="/portfolio-builder" element={isAuthenticated ? <PortfolioBuilder /> : <Navigate to="/login" />} />
        <Route path="/settings" element={isAuthenticated ? <SettingsPage /> : <Navigate to="/login" />} />
        <Route path="/admin" element={isAuthenticated ? <AdminPanel /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}






export default App;
