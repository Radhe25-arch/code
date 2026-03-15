import React from 'react';
import DashboardShell from '../components/DashboardShell';

const PlaceholderPage = ({ title }) => (
  <DashboardShell>
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h2 className="text-4xl font-bold mb-4">{title}</h2>
      <p className="text-gray-400">This module is currently under development. Stay tuned for updates!</p>
      <div className="mt-8 w-64 h-2 bg-white/5 rounded-full overflow-hidden">
        <div className="h-full bg-primary w-1/3 animate-pulse"></div>
      </div>
    </div>
  </DashboardShell>
);

export const CoursesPage = () => <PlaceholderPage title="Arena Courses" />;
export const LeaderboardPage = () => <PlaceholderPage title="Global Leaderboard" />;
export const TournamentsPage = () => <PlaceholderPage title="Weekly Tournaments" />;
export const ProfilePage = () => <PlaceholderPage title="Warrior Profile" />;
export const SettingsPage = () => <PlaceholderPage title="Account Settings" />;
