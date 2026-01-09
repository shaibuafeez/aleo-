'use client';

/**
 * Analytics Dashboard
 * Real-time progress tracking and visualizations
 */

import { useEffect, useState } from 'react';
import { useAuth } from '@/app/lib/auth/AuthProvider';
import { useGameStore } from '@/app/lib/store/gameStore';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import ProgressChart from '@/app/components/dashboard/ProgressChart';
import StreakHeatmap from '@/app/components/dashboard/StreakHeatmap';
import StatsCards from '@/app/components/dashboard/StatsCards';
import RecentActivity from '@/app/components/dashboard/RecentActivity';

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const { xp, level, streak, completedLessons, achievements, loadFromSupabase } = useGameStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Redirect to home if not logged in
    if (!authLoading && !user) {
      router.push('/');
    }

    // Load latest data from Supabase
    if (user) {
      loadFromSupabase(user.id).then(() => {
        setIsLoading(false);
      });
    }
  }, [user, authLoading, router, loadFromSupabase]);

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sui-sky via-white to-sui-sky">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-sui-ocean border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sui-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sui-sky via-white to-sui-sky pt-24 pb-16 px-4 sm:px-8 md:px-16 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-sui-navy mb-2">
            Your Dashboard
          </h1>
          <p className="text-sui-gray-600 text-lg">
            Track your progress and achievements
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <StatsCards
            xp={xp}
            level={level}
            streak={streak}
            completedLessons={completedLessons.length}
          />
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <ProgressChart />
            </motion.div>

            {/* Streak Heatmap */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <StreakHeatmap />
            </motion.div>
          </div>

          {/* Right Column - Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-1"
          >
            <RecentActivity />
          </motion.div>
        </div>

        {/* Achievements Section */}
        {achievements.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-sui-navy mb-4">
                Recent Achievements
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {achievements.slice(0, 4).map((achievement, index) => (
                  <div
                    key={achievement.id}
                    className="bg-sui-sky rounded-2xl p-4 text-center hover:shadow-lg transition-shadow"
                  >
                    <div className="text-4xl mb-2">{achievement.icon}</div>
                    <h3 className="font-semibold text-sui-navy text-sm mb-1">
                      {achievement.name}
                    </h3>
                    <p className="text-xs text-sui-gray-600">
                      {achievement.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
