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

  // Actions
  addXP: (points: number) => void;
  completeLesson: (lessonId: string, xpReward: number) => void;
  unlockAchievement: (achievement: Achievement) => void;
  updateStreak: () => void;
  setCurrentLesson: (lessonId: string) => void;
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
      },

      // Complete a lesson
      completeLesson: (lessonId: string, xpReward: number) => {
        const { completedLessons, addXP } = get();

        if (!completedLessons.includes(lessonId)) {
          set({
            completedLessons: [...completedLessons, lessonId],
          });
          addXP(xpReward);
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
      },

      // Update streak
      updateStreak: () => {
        const { lastActiveDate } = get();
        const today = new Date().toDateString();

        if (lastActiveDate === today) return;

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toDateString();

        set((state) => ({
          lastActiveDate: today,
          streak: lastActiveDate === yesterdayStr ? state.streak + 1 : 1,
        }));
      },

      // Set current lesson
      setCurrentLesson: (lessonId: string) => {
        set({ currentLesson: lessonId });
      },
    }),
    {
      name: 'move-by-practice-game-store',
    }
  )
);
