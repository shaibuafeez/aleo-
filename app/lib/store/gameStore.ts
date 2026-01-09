import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getSupabase } from '../supabase/client';

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
  completeLesson: (lessonId: string, xpReward: number) => void;
  unlockAchievement: (achievement: Achievement) => void;
  updateStreak: () => void;
  setCurrentLesson: (lessonId: string) => void;

  // Supabase sync actions
  syncWithSupabase: (userId: string) => Promise<void>;
  loadFromSupabase: (userId: string) => Promise<void>;
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

      // Add XP and check for level up
      addXP: (points: number) => {
        set((state) => {
          const newXP = state.xp + points;
          const newLevel = Math.floor(newXP / XP_PER_LEVEL) + 1;

          return {
            xp: newXP,
            level: newLevel,
          };
        });

        // Sync to Supabase asynchronously
        const state = get();
        if (typeof window !== 'undefined') {
          const supabase = getSupabase();
          supabase.auth.getUser().then(({ data: { user } }) => {
            if (user) {
              const newXP = state.xp + points;
              const newLevel = Math.floor(newXP / XP_PER_LEVEL) + 1;

              supabase
                .from('user_stats')
                // @ts-expect-error Supabase types mismatch
                .update({
                  total_xp: newXP,
                  level: newLevel,
                  updated_at: new Date().toISOString()
                })
                .eq('user_id', user.id)
                .then();
            }
          });
        }
      },

      // Complete a lesson
      completeLesson: (lessonId: string, xpReward: number) => {
        const { completedLessons, addXP } = get();

        if (!completedLessons.includes(lessonId)) {
          set({
            completedLessons: [...completedLessons, lessonId],
          });
          addXP(xpReward);

          // Sync to Supabase asynchronously
          if (typeof window !== 'undefined') {
            const supabase = getSupabase();
            supabase.auth.getUser().then(({ data: { user } }) => {
              if (user) {
                supabase
                  .from('user_progress')
                  // @ts-expect-error Supabase types mismatch
                  .upsert({
                    user_id: user.id,
                    lesson_id: lessonId,
                    completed: true,
                    completed_at: new Date().toISOString(),
                    xp_earned: xpReward,
                  })
                  .then();
              }
            });
          }
        }
      },

      // Unlock achievement
      unlockAchievement: (achievement: Achievement) => {
        set((state) => ({
          achievements: [
            ...state.achievements,
            { ...achievement, unlockedAt: new Date() },
          ],
        }));

        // Sync to Supabase asynchronously
        if (typeof window !== 'undefined') {
          const supabase = getSupabase();
          supabase.auth.getUser().then(({ data: { user } }) => {
            if (user) {
              supabase
                .from('achievements')
                // @ts-expect-error Supabase types mismatch
                .insert({
                  user_id: user.id,
                  achievement_id: achievement.id,
                  achievement_name: achievement.name,
                  achievement_description: achievement.description,
                  icon: achievement.icon,
                })
                .then();
            }
          });
        }
      },

      // Update streak
      updateStreak: () => {
        const { lastActiveDate } = get();
        const today = new Date().toDateString();

        if (lastActiveDate === today) return;

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toDateString();

        const newStreak = lastActiveDate === yesterdayStr ? get().streak + 1 : 1;

        set({
          lastActiveDate: today,
          streak: newStreak,
        });

        // Sync to Supabase asynchronously
        if (typeof window !== 'undefined') {
          const supabase = getSupabase();
          supabase.auth.getUser().then(({ data: { user } }) => {
            if (user) {
              supabase
                .from('user_stats')
                // @ts-expect-error Supabase types mismatch
                .update({
                  current_streak: newStreak,
                  longest_streak: newStreak, // Will be handled by trigger
                  last_active_at: new Date().toISOString(),
                })
                .eq('user_id', user.id)
                .then();
            }
          });
        }
      },

      // Set current lesson
      setCurrentLesson: (lessonId: string) => {
        set({ currentLesson: lessonId });
      },

      // Load data from Supabase (called on login)
      loadFromSupabase: async (userId: string) => {
        try {
          set({ isSyncing: true });
          const supabase = getSupabase();

          // Load user stats
          const { data: rawStats } = await supabase
            .from('user_stats')
            .select('*')
            .eq('user_id', userId)
            .single();

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const stats = rawStats as any;

          // Load user progress
          const { data: rawProgress } = await supabase
            .from('user_progress')
            .select('*')
            .eq('user_id', userId);

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const progress = rawProgress as any[] | null;

          // Load achievements
          const { data: rawAchievements } = await supabase
            .from('achievements')
            .select('*')
            .eq('user_id', userId);

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const achievements = rawAchievements as any[] | null;

          if (stats) {
            const completedLessons = progress
              ?.filter(p => p.completed)
              .map(p => p.lesson_id) || [];

            const loadedAchievements: Achievement[] = achievements?.map(a => ({
              id: a.achievement_id,
              name: a.achievement_name,
              description: a.achievement_description,
              icon: a.icon || '🏆',
              unlockedAt: new Date(a.unlocked_at),
            })) || [];

            set({
              xp: stats.total_xp,
              level: stats.level,
              streak: stats.current_streak,
              lastActiveDate: stats.last_active_at
                ? new Date(stats.last_active_at).toDateString()
                : null,
              completedLessons,
              achievements: loadedAchievements,
              lastSyncedAt: new Date().toISOString(),
            });
          }
        } catch (error) {
          console.error('Error loading from Supabase:', error);
        } finally {
          set({ isSyncing: false });
        }
      },

      // Sync local state to Supabase (manual sync or migration)
      syncWithSupabase: async (userId: string) => {
        try {
          set({ isSyncing: true });
          const state = get();
          const supabase = getSupabase();

          // Sync user stats
          await supabase
            .from('user_stats')
            // @ts-expect-error Supabase types mismatch
            .upsert({
              user_id: userId,
              total_xp: state.xp,
              level: state.level,
              current_streak: state.streak,
              last_active_at: state.lastActiveDate
                ? new Date(state.lastActiveDate).toISOString()
                : null,
            });

          // Sync completed lessons
          if (state.completedLessons.length > 0) {
            const progressRecords = state.completedLessons.map(lessonId => ({
              user_id: userId,
              lesson_id: lessonId,
              completed: true,
              completed_at: new Date().toISOString(),
              xp_earned: 100, // Default, will be overwritten by actual data
            }));

            await supabase
              .from('user_progress')
              // @ts-expect-error Supabase types mismatch
              .upsert(progressRecords);
          }

          // Sync achievements
          if (state.achievements.length > 0) {
            const achievementRecords = state.achievements.map(achievement => ({
              user_id: userId,
              achievement_id: achievement.id,
              achievement_name: achievement.name,
              achievement_description: achievement.description,
              icon: achievement.icon,
              unlocked_at: achievement.unlockedAt?.toISOString() || new Date().toISOString(),
            }));

            await supabase
              .from('achievements')
              // @ts-expect-error Supabase types mismatch
              .upsert(achievementRecords);
          }

          set({ lastSyncedAt: new Date().toISOString() });
        } catch (error) {
          console.error('Error syncing to Supabase:', error);
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
