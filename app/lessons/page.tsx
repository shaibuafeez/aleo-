'use client';

import { useState, useRef, MouseEvent } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import Link from 'next/link';
import { useGameStore } from '@/app/lib/store/gameStore';

// Types
type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

interface Lesson {
  id: number;
  title: string;
  description: string;
  duration: string;
  xp: number;
  difficulty: Difficulty;
  topics: string[];
  isLocked: boolean;
  colSpan?: 1 | 2; // For Bento Grid layout
}

// Data
const allLessons: Lesson[] = [
  {
    id: 1,
    title: 'Hello Move!',
    description: 'Your first steps into the Sui ecosystem. Learn modules, variables, and basic functions.',
    duration: '25 min',
    xp: 100,
    difficulty: 'Beginner',
    topics: ['Modules', 'Variables', 'Functions'],
    isLocked: false,
    colSpan: 2, // Hero card
  },
  {
    id: 2,
    title: 'Mastering Move Types',
    description: 'Deep dive into primitives and type casting.',
    duration: '30 min',
    xp: 150,
    difficulty: 'Beginner',
    topics: ['Primitives', 'Casting'],
    isLocked: false,
  },
  {
    id: 3,
    title: 'Control Flow',
    description: 'Master logical flows with if/else and loops.',
    duration: '30 min',
    xp: 150,
    difficulty: 'Beginner',
    topics: ['Logic', 'Loops'],
    isLocked: false,
  },
  {
    id: 4,
    title: 'Structs & Objects',
    description: 'The core of Sui: Everything is an object. Learn how to build them.',
    duration: '45 min',
    xp: 300,
    difficulty: 'Intermediate',
    topics: ['Structs', 'Abilities', 'Objects'],
    isLocked: false,
    colSpan: 2, // Feature card
  },
  {
    id: 5,
    title: 'Collections',
    description: 'Managing dynamic data with Vectors and Tables.',
    duration: '35 min',
    xp: 200,
    difficulty: 'Intermediate',
    topics: ['Vectors', 'Tables'],
    isLocked: false,
  },
  {
    id: 6,
    title: 'Ownership & Borrowing',
    description: 'Understanding the borrow checker.',
    duration: '40 min',
    xp: 250,
    difficulty: 'Intermediate',
    topics: ['Ownership', 'References'],
    isLocked: false,
  },
  {
    id: 7,
    title: 'Advanced Generics',
    description: 'Writing reusable, Type-agnostic code.',
    duration: '50 min',
    xp: 400,
    difficulty: 'Advanced',
    topics: ['Generics', 'Phantoms'],
    isLocked: false,
    colSpan: 2,
  },
];

// --- Components ---

function SpotlightCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`group relative border border-zinc-200 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500 ease-out ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 mix-blend-multiply"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(37, 99, 235, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      {children}
    </div>
  );
}

const ROTATION_RANGE = 20;
const HALF_ROTATION_RANGE = 20 / 2;

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// --- Main Page ---

export default function LessonsPage() {
  const { xp, completedLessons } = useGameStore();
  const [filter, setFilter] = useState<Difficulty | 'All'>('All');

  const filteredLessons = allLessons.filter(
    (l) => filter === 'All' || l.difficulty === filter
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 pb-32">

      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40 mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />

      {/* Header Section */}
      <header className="relative z-10 pt-32 pb-16 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-black tracking-tighter-swiss mb-4"
            >
              Curriculum
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-zinc-500 max-w-lg"
            >
              A masterclass in Move. From zero to mainnet in 7 modules.
            </motion.p>
          </div>

          {/* XP Pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4 bg-white px-6 py-3 rounded-full border border-zinc-200 shadow-sm"
          >
            <div className="flex flex-col items-end">
              <span className="text-xs uppercase tracking-wider font-bold text-zinc-400">Total XP</span>
              <span className="text-2xl font-black text-blue-600 font-mono">{xp}</span>
            </div>
            <div className="h-10 w-px bg-zinc-100" />
            <div className="flex flex-col items-start">
              <span className="text-xs uppercase tracking-wider font-bold text-zinc-400">Completed</span>
              <span className="text-2xl font-black text-zinc-900 font-mono">{completedLessons.length}/{allLessons.length}</span>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Filter Bar */}
      <div className="sticky top-24 z-20 px-6 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex bg-white/80 backdrop-blur-md p-1.5 rounded-2xl border border-zinc-200 shadow-lg shadow-zinc-200/50">
            {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${filter === f
                  ? 'bg-zinc-900 text-white shadow-md transform scale-105'
                  : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900'
                  }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bento Grid */}
      <main className="relative z-10 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">

          {filteredLessons.map((lesson, i) => {
            const isCompleted = completedLessons.includes(lesson.id.toString());
            const isLocked = lesson.isLocked;

            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`${lesson.colSpan === 2 ? 'md:col-span-2' : ''}`}
              >
                <Link href={isLocked ? '#' : `/lessons/${lesson.id}`} className={isLocked ? 'cursor-not-allowed' : ''}>
                  <TiltCard className={`h-full ${isLocked ? 'pointer-events-none' : ''}`}>
                    <SpotlightCard className={`h-full rounded-[2rem] p-8 flex flex-col justify-between transition-all duration-500
                                    ${isLocked ? 'bg-zinc-100 opacity-60 grayscale' : 'bg-white hover:shadow-2xl hover:shadow-blue-900/10'}`
                    }>
                      {/* Top Row */}
                      <div className="flex justify-between items-start mb-8 relative z-10">
                        <div className="flex gap-2">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full
                              ${lesson.difficulty === 'Beginner' ? 'bg-green-500' :
                                lesson.difficulty === 'Intermediate' ? 'bg-blue-500' :
                                  'bg-purple-500'
                              }
                            `} />
                            <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                              {lesson.difficulty}
                            </span>
                          </div>
                          {isCompleted && (
                            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-zinc-900 text-white flex items-center gap-1">
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                              Done
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-zinc-400 text-sm">#{String(lesson.id).padStart(2, '0')}</span>
                      </div>

                      {/* Content */}
                      <div className="relative z-10">
                        <h3 className="text-3xl font-bold mb-3 tracking-tight group-hover:text-[#8596A5] transition-colors">
                          {lesson.title}
                        </h3>
                        <p className="text-zinc-500 font-medium leading-relaxed mb-8 max-w-md">
                          {lesson.description}
                        </p>
                      </div>

                      {/* Bottom Meta */}
                      <div className="relative z-10 mt-auto pt-6 border-t border-zinc-100 flex items-center justify-between">
                        <div className="flex gap-4 text-sm font-semibold text-zinc-400">
                          <span className="flex items-center gap-1.5">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {lesson.duration}
                          </span>
                          <span className="flex items-center gap-1.5 text-blue-500">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            {lesson.xp} XP
                          </span>
                        </div>

                        {/* Play Button Icon */}
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                                            ${isLocked ? 'bg-zinc-200' : 'bg-zinc-100 group-hover:bg-[#8596A5] group-hover:text-white'}
                                        `}>
                          {isLocked ? (
                            <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          )}
                        </div>
                      </div>

                      {/* Spotlight Gradient - already connected via SpotlightCard wrapper */}
                    </SpotlightCard>
                  </TiltCard>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </main>

    </div>
  );
}
