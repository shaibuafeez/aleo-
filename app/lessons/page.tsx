'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useGameStore } from '@/app/lib/store/gameStore';

// This will be expanded as we add more lessons
const lessons = [
  {
    id: 1,
    title: 'Hello Move!',
    description: 'Learn the basics of Move programming language: modules, variables, and functions.',
    duration: '25 min',
    xp: 100,
    difficulty: 'Beginner',
    topics: ['Modules', 'Variables', 'Functions'],
    isLocked: false,
  },
  {
    id: 2,
    title: 'Mastering Move Types',
    description: 'Deep dive into primitive types, addresses, and type casting with overflow protection.',
    duration: '30 min',
    xp: 150,
    difficulty: 'Beginner',
    topics: ['Primitives', 'Addresses', 'Casting'],
    isLocked: false,
  },
  {
    id: 3,
    title: 'Control Flow - Making Decisions',
    description: 'Master if expressions, loops, and error handling with assert and abort.',
    duration: '30 min',
    xp: 150,
    difficulty: 'Beginner',
    topics: ['If/Else', 'Loops', 'Errors'],
    isLocked: false,
  },
  {
    id: 4,
    title: 'Structs & Custom Types',
    description: 'Create custom structs and master the abilities system (key, store, copy, drop).',
    duration: '30 min',
    xp: 200,
    difficulty: 'Intermediate',
    topics: ['Structs', 'Abilities', 'Sui Objects'],
    isLocked: false,
  },
  {
    id: 5,
    title: 'Vectors & Collections',
    description: 'Master dynamic collections, search patterns, and borrow vs copy concepts.',
    duration: '35 min',
    xp: 200,
    difficulty: 'Intermediate',
    topics: ['Vectors', 'Search', 'Borrow'],
    isLocked: false,
  },
];

export default function LessonsHub() {
  const { xp, level, completedLessons } = useGameStore();

  return (
    <div className="min-h-screen bg-gradient-to-b from-sui-mist via-white to-sui-sky">
      {/* Hero Banner */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-20 left-1/4 w-96 h-96 bg-sui-ocean/10 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Player Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6"
          >
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-sui-navy mb-4">
                Your Learning Journey
              </h1>
              <p className="text-xl text-sui-gray-600">
                Master Sui Move through hands-on lessons
              </p>
            </div>

            {/* Stats Card */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-6 p-6 bg-white rounded-2xl shadow-xl border-2 border-sui-gray-200"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-sui-ocean">{level}</div>
                <div className="text-sm text-sui-gray-600 font-medium">Level</div>
              </div>
              <div className="w-px h-12 bg-sui-gray-300" />
              <div className="text-center">
                <div className="text-3xl font-bold text-sui-ocean">{xp}</div>
                <div className="text-sm text-sui-gray-600 font-medium">XP</div>
              </div>
              <div className="w-px h-12 bg-sui-gray-300" />
              <div className="text-center">
                <div className="text-3xl font-bold text-sui-ocean">
                  {completedLessons.length}
                </div>
                <div className="text-sm text-sui-gray-600 font-medium">Completed</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Lessons Grid */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold text-sui-navy mb-2">Available Lessons</h2>
            <p className="text-sui-gray-600">
              Click on a lesson to see details and start learning
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson, index) => {
              const isCompleted = completedLessons.includes(lesson.id.toString());

              return (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={lesson.isLocked ? '#' : `/lessons/${lesson.id}`}
                    className={`block group ${
                      lesson.isLocked ? 'cursor-not-allowed' : ''
                    }`}
                  >
                    <div
                      className={`relative p-8 rounded-3xl border-2 transition-all duration-300 ${
                        lesson.isLocked
                          ? 'bg-sui-gray-100 border-sui-gray-300 opacity-60'
                          : 'bg-white border-sui-navy hover:border-sui-ocean hover:shadow-2xl hover:-translate-y-2'
                      }`}
                    >
                      {/* Completed Badge */}
                      {isCompleted && (
                        <div className="absolute -top-3 -right-3 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                          <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      )}

                      {/* Locked Badge */}
                      {lesson.isLocked && (
                        <div className="absolute -top-3 -right-3 w-12 h-12 bg-sui-gray-500 rounded-full flex items-center justify-center shadow-lg">
                          <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                        </div>
                      )}

                      {/* Difficulty Badge */}
                      <div className="inline-block px-3 py-1 bg-sui-sky/30 text-sui-ocean rounded-full text-xs font-semibold mb-4">
                        {lesson.difficulty}
                      </div>

                      <h3 className="text-2xl font-bold text-sui-navy mb-3 group-hover:text-sui-ocean transition-colors">
                        Lesson {lesson.id}: {lesson.title}
                      </h3>

                      <p className="text-sui-gray-600 mb-4 leading-relaxed">
                        {lesson.description}
                      </p>

                      {/* Topics */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {lesson.topics.map((topic) => (
                          <span
                            key={topic}
                            className="px-2 py-1 bg-sui-ocean/5 text-sui-ocean rounded-lg text-xs font-medium"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between text-sm text-sui-gray-500 pt-4 border-t border-sui-gray-200">
                        <span className="flex items-center gap-1">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {lesson.duration}
                        </span>
                        <span className="font-semibold text-sui-ocean">
                          +{lesson.xp} XP
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Coming Soon */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 text-center p-12 bg-white/50 backdrop-blur-sm rounded-3xl border-2 border-dashed border-sui-gray-300"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-sui-ocean/10 to-sui-sky/30 rounded-2xl mb-4"
            >
              <svg className="w-10 h-10 text-sui-ocean" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v.01M17 11v.01M7 16v.01" />
              </svg>
            </motion.div>
            <h3 className="text-2xl font-bold text-sui-navy mb-2">More Lessons Coming Soon!</h3>
            <p className="text-sui-gray-600">
              We're working on 11 more lessons covering NFTs, DeFi, and on-chain games.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
