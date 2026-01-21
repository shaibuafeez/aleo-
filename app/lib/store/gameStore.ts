import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
}

export interface Lesson {
  id: string;
  title: string;
  completed: boolean;
  xpReward: number;
}

interface GameState {
  // Player stats
  xp: number;
  level: number;
  streak: number;
  lastActiveDate: string | null;

  // Progress
  completedLessons: string[];
  currentLesson: string | null;
  achievements: Achievement[];

  // Sync state
  isSyncing: boolean;
  lastSyncedAt: string | null;

  // Actions
  addXP: (points: number) => void;
  completeLesson: (lessonId: string, xpReward: number, timeSpentMinutes?: number, codeSubmitted?: string) => Promise<void>;
  unlockAchievement: (achievement: Achievement) => Promise<void>;
  updateStreak: () => Promise<void>;
  setCurrentLesson: (lessonId: string) => void;

  // Database sync actions
  loadFromDatabase: () => Promise<void>;
  syncWithSupabase: (userId: string) => Promise<void>;
  resetStore: () => void;
}

const XP_PER_LEVEL = 1000;

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      // Initial state
      xp: 0,
      level: 1,
      streak: 0,
      lastActiveDate: null,
      completedLessons: [],
      currentLesson: null,
      achievements: [],
      isSyncing: false,
      lastSyncedAt: null,

      // Add XP and check for level up (local only, server updates via completeLesson)
      addXP: (points: number) => {
        set((state) => {
          const newXP = state.xp + points;
          const newLevel = Math.floor(newXP / XP_PER_LEVEL) + 1;

          return {
            xp: newXP,
            level: newLevel,
          };
        });
      },

      // Complete a lesson
      completeLesson: async (lessonId: string, xpReward: number, timeSpentMinutes?: number, codeSubmitted?: string) => {
        const { completedLessons } = get();

        if (completedLessons.includes(lessonId)) {
          return; // Already completed
        }

        try {
          // Call Prisma API route
          const response = await fetch('/api/user/complete-lesson', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              lessonId,
              xpReward,
              timeSpentMinutes,
              codeSubmitted,
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to complete lesson');
          }

          const data = await response.json();

          // Update local state with server response
          set({
            completedLessons: [...completedLessons, lessonId],
            xp: data.stats.xp,
            level: data.stats.level,
            lastSyncedAt: new Date().toISOString(),
          });

          // Show level up notification if needed
          if (data.leveledUp) {
            console.log(`🎉 Level up! Now level ${data.stats.level}`);
          }
        } catch (error) {
          console.error('Error completing lesson:', error);
          // Fallback: update local state only
          set({
            completedLessons: [...completedLessons, lessonId],
          });
          get().addXP(xpReward);
        }
      },

      // Unlock achievement
      unlockAchievement: async (achievement: Achievement) => {
        const { achievements } = get();

        // Check if already unlocked
        if (achievements.some(a => a.id === achievement.id)) {
          return;
        }

        try {
          // Call Prisma API route
          const response = await fetch('/api/user/unlock-achievement', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              achievementId: achievement.id,
              achievementName: achievement.name,
              achievementDescription: achievement.description,
              icon: achievement.icon,
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to unlock achievement');
          }

          const data = await response.json();

          // Update local state with server response
          set((state) => ({
            achievements: [
              ...state.achievements,
              {
                ...achievement,
                unlockedAt: new Date(data.achievement.unlockedAt),
              },
            ],
            lastSyncedAt: new Date().toISOString(),
          }));
        } catch (error) {
          console.error('Error unlocking achievement:', error);
          // Fallback: update local state only
          set((state) => ({
            achievements: [
              ...state.achievements,
              { ...achievement, unlockedAt: new Date() },
            ],
          }));
        }
      },

      // Update streak
      updateStreak: async () => {
        const { lastActiveDate } = get();
        const today = new Date().toDateString();

        if (lastActiveDate === today) return;

        try {
          // Call Prisma API route
          const response = await fetch('/api/user/update-streak', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
          });

          if (!response.ok) {
            throw new Error('Failed to update streak');
          }

          const data = await response.json();

          // Update local state with server response
          set({
            lastActiveDate: today,
            streak: data.stats.streak,
            lastSyncedAt: new Date().toISOString(),
          });
        } catch (error) {
          console.error('Error updating streak:', error);
          // Fallback: update local state only
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toDateString();

          const newStreak = lastActiveDate === yesterdayStr ? get().streak + 1 : 1;

          set({
            lastActiveDate: today,
            streak: newStreak,
          });
        }
      },

      // Set current lesson
      setCurrentLesson: (lessonId: string) => {
        set({ currentLesson: lessonId });
      },

      // Load data from database via Prisma API (called on login)
      loadFromDatabase: async () => {
        try {
          set({ isSyncing: true });

          // Call Prisma API route
          const response = await fetch('/api/user/profile');

          if (!response.ok) {
            throw new Error('Failed to load user profile');
          }

          const data = await response.json();

          // Extract completed lesson IDs
          const completedLessons = data.completedLessons || [];

          // Format achievements
          const loadedAchievements: Achievement[] = (data.achievements || []).map((a: {
            achievementId: string;
            achievementName: string;
            achievementDescription: string;
            icon: string;
            unlockedAt: string;
          }) => ({
            id: a.achievementId,
            name: a.achievementName,
            description: a.achievementDescription,
            icon: a.icon || '🏆',
            unlockedAt: new Date(a.unlockedAt),
          }));

          // Update local state with server data
          set({
            xp: data.stats?.xp || 0,
            level: data.stats?.level || 1,
            streak: data.stats?.streak || 0,
            lastActiveDate: data.stats?.lastActiveDate
              ? new Date(data.stats.lastActiveDate).toDateString()
              : null,
            completedLessons,
            achievements: loadedAchievements,
            lastSyncedAt: new Date().toISOString(),
          });
        } catch (error) {
          console.error('Error loading from database:', error);
        } finally {
          set({ isSyncing: false });
        }
      },

      // Sync local data to Supabase (Database Migration)
      syncWithSupabase: async (userId: string) => {
        const { xp, level, streak, completedLessons, achievements } = get();

        try {
          set({ isSyncing: true });

          // Call Sync API
          const response = await fetch('/api/user/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId,
              xp,
              level,
              streak,
              completedLessons,
              achievements,
            }),
          });

          if (!response.ok) {
            // If the sync endpoint doesn't exist yet, we just log it and don't throw to avoid crashing
            console.warn('Sync API endpoint not found or failed. Skipping migration.');
            return;
          }

          const data = await response.json();

          set({
            lastSyncedAt: new Date().toISOString(),
            // Optionally update with merged data if the server sends it back
            xp: data.stats?.xp ?? xp,
            level: data.stats?.level ?? level,
          });

        } catch (error) {
          console.error('Error syncing with Supabase:', error);
          throw error;
        } finally {
          set({ isSyncing: false });
        }
      },

      // Reset store (for logout)
      resetStore: () => {
        set({
          xp: 0,
          level: 1,
          streak: 0,
          lastActiveDate: null,
          completedLessons: [],
          currentLesson: null,
          achievements: [],
          isSyncing: false,
          lastSyncedAt: null,
        });
      },
    }),
    {
      name: 'move-by-practice-game-store',
    }
  )
);
