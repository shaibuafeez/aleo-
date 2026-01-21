'use client';

import Link from 'next/link';
import { format } from 'date-fns';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Magnetic from '@/app/components/Magnetic';

// Mock data for preview (since prisma might be empty in dev)
const MOCK_CLASSES = [
  {
    id: '1',
    title: 'Zero to Hero: Leo Basics',
    description: 'Master the fundamentals of Leo, from circuit structure to zero-knowledge proofs.',
    scheduledAt: new Date(Date.now() + 86400000).toISOString(),
    durationMinutes: 60,
    status: 'scheduled',
    instructor: { username: 'Alex', avatarUrl: null },
    participantCount: 120
  },
  {
    id: '2',
    title: 'Private DeFi Architecture',
    description: 'Deep dive into building privacy-preserving AMMs and lending protocols on Aleo.',
    scheduledAt: new Date(Date.now() + 172800000).toISOString(),
    durationMinutes: 90,
    status: 'scheduled',
    instructor: { username: 'Sarah', avatarUrl: null },
    participantCount: 85
  },
  {
    id: '3',
    title: 'ZK Standards & Records',
    description: 'Create composable, private assets using the Record model.',
    scheduledAt: new Date(Date.now() + 259200000).toISOString(),
    durationMinutes: 45,
    status: 'scheduled',
    instructor: { username: 'Mike', avatarUrl: null },
    participantCount: 200
  }
];

export default function ClassesPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const headerY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  const [classes, setClasses] = useState(MOCK_CLASSES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchClasses() {
      try {
        const response = await fetch('/api/classes');
        if (response.ok) {
          const data = await response.json();
          // Merge real classes with mock classes, prioritizing real classes
          if (data.classes && data.classes.length > 0) {
            setClasses([...data.classes, ...MOCK_CLASSES]);
          }
        }
      } catch (error) {
        console.error('Error fetching classes:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchClasses();
  }, []);

  const liveClasses = classes.filter((c) => c.status === 'live');
  const upcomingClasses = classes.filter((c) => c.status === 'scheduled');

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-black relative overflow-hidden">

      {/* Swiss Graph Grid Background */}
      <div className="absolute inset-0 bg-grid-graph opacity-60 pointer-events-none fixed" />

      {/* Gradient Blob for mood */}
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-aleo-green/5 rounded-full blur-[120px] pointer-events-none" />

      <main className="relative z-10 pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Hero Section */}
          <motion.div
            style={{ y: headerY }}
            className="mb-24 md:mb-32"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-8 border border-aleo-green/20 rounded-full bg-aleo-green/5 backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-aleo-green animate-pulse" />
              <span className="text-xs font-mono font-bold text-aleo-green-dark uppercase tracking-wider">Live Intelligence</span>
            </motion.div>

            <h1 className="text-6xl md:text-9xl font-black tracking-tighter-swiss leading-[0.9] text-zinc-900 mb-8">
              SYNC <br />
              <span className="text-gray-300">REALITY.</span>
            </h1>

            <div className="flex flex-col md:flex-row items-start justify-between gap-8 md:items-end">
              <p className="text-xl md:text-2xl text-zinc-500 max-w-lg font-medium leading-relaxed tracking-tight">
                Join our real-time cohorts. Master Leo with direct feedback from core engineers.
              </p>

              <Magnetic>
                <Link
                  href="/classes/schedule"
                  className="group relative px-8 py-4 bg-zinc-900 text-white rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-aleo-green/20 hover:scale-105 transition-all duration-300 inline-flex items-center gap-3 overflow-hidden"
                >
                  <span className="relative z-10">Schedule Session</span>
                  <motion.svg
                    className="w-5 h-5 relative z-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>

                  {/* Hover Fill Effect */}
                  <div className="absolute inset-0 bg-aleo-green translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[0.23, 1, 0.32, 1]" />
                </Link>
              </Magnetic>
            </div>
          </motion.div>

          {/* Live Now (If active) */}
          {/* Live Now (If active) */}
          {liveClasses.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-24 relative group"
            >
              {/* Dynamic Glow Behind */}
              <div className="absolute -inset-1 bg-gradient-to-r from-aleo-green/20 via-zinc-500/10 to-aleo-green/20 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Card Container with Animated Gradient Border */}
              <div className="relative p-[2px] rounded-[2.5rem] bg-gradient-to-r from-aleo-green via-zinc-500 to-aleo-green overflow-hidden">
                <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px]" /> {/* Shimmer effect base */}

                <div className="relative bg-white rounded-[2.4rem] p-8 md:p-12 overflow-hidden">
                  {/* Subtle Grid Background inside card */}
                  <div className="absolute inset-0 bg-grid-graph opacity-30 pointer-events-none" />

                  <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
                    {/* Left Content */}
                    <div className="flex-1 w-full text-left">
                      <div className="flex items-center gap-3 mb-6">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-aleo-green opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-aleo-green"></span>
                        </span>
                        <span className="font-mono text-xs font-bold text-aleo-green-dark tracking-widest uppercase">On Air Now</span>
                      </div>

                      <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-2">Today's Session</h3>
                      <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter-swiss text-zinc-900 mb-6 leading-[0.95]">
                        {liveClasses[0].title}
                      </h2>
                      <p className="text-lg text-zinc-500 mb-10 max-w-md leading-relaxed">
                        {liveClasses[0].description}
                      </p>

                      <div className="flex items-center gap-6">
                        <Magnetic>
                          <Link
                            href={`/classes/watch/${liveClasses[0].id}`}
                            className="group relative px-8 py-4 bg-aleo-green text-zinc-900 rounded-full font-bold text-lg hover:shadow-xl hover:shadow-aleo-green/20 hover:scale-[1.02] transition-all duration-300 flex items-center gap-3 overflow-hidden"
                          >
                            <span className="relative z-10">Join Stream</span>
                            <motion.svg
                              className="w-5 h-5 relative z-10"
                              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                              animate={{ x: [0, 3, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </motion.svg>
                            {/* Shine Effect */}
                            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                          </Link>
                        </Magnetic>
                        <div className="flex -space-x-3">
                          {[...Array(4)].map((_, i) => (
                            <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-zinc-100 relative z-0 hover:z-10 transition-all hover:scale-110" />
                          ))}
                          <div className="w-10 h-10 rounded-full border-2 border-white bg-zinc-900 text-white flex items-center justify-center text-xs font-bold relative z-10">
                            +120
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Content - Video Preview */}
                    <div className="flex-1 w-full relative">
                      <div className="relative aspect-video bg-zinc-900 rounded-[1.5rem] overflow-hidden shadow-2xl shadow-zinc-900/20 border border-zinc-900/5 group-hover:scale-[1.01] transition-transform duration-500">
                        {/* Screen Glare */}
                        <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-gradient-to-b from-white/10 to-transparent rotate-45 pointer-events-none" />

                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-white text-4xl shadow-xl"
                          >
                            🎥
                          </motion.div>
                        </div>

                        {/* UI Overlays */}
                        <div className="absolute top-4 left-4 flex gap-2">
                          <div className="px-2 py-1 bg-black/40 backdrop-blur-md rounded-lg text-white/80 text-[10px] uppercase font-bold tracking-wider border border-white/5">
                            1080p
                          </div>
                          <div className="px-2 py-1 bg-black/40 backdrop-blur-md rounded-lg text-white/80 text-[10px] uppercase font-bold tracking-wider border border-white/5">
                            60fps
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Schedule Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {upcomingClasses.map((item, i) => (
              <Link
                key={item.id}
                href={`/classes/${item.id}`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  whileHover={{ y: -8 }}
                  className="group relative bg-white border border-gray-200 rounded-[2rem] p-8 hover:shadow-2xl hover:shadow-aleo-green/10 transition-all duration-300 flex flex-col justify-between cursor-pointer h-full"
                >
                  <div>
                    <div className="flex justify-between items-start mb-8">
                      <div className="w-14 h-14 rounded-2xl bg-zinc-50 border border-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        {i === 0 && (
                          <svg className="w-6 h-6 text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        )}
                        {i === 1 && (
                          <svg className="w-6 h-6 text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        )}
                        {i === 2 && (
                          <svg className="w-6 h-6 text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                          </svg>
                        )}
                      </div>
                      <div className="px-3 py-1 rounded-full bg-aleo-green/10 text-aleo-green-dark text-xs font-bold border border-aleo-green/20">
                        {format(new Date(item.scheduledAt), 'MMM d')}
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-zinc-900 mb-3 tracking-tight group-hover:text-aleo-green-dark transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-zinc-500 leading-relaxed text-sm mb-8">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-100 pt-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center text-xs font-bold">
                        {item.instructor.username[0]}
                      </div>
                      <span className="text-sm font-medium text-zinc-600">
                        {item.instructor.username}
                      </span>
                    </div>
                    <span className="text-zinc-900 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      Details <span className="text-aleo-green">→</span>
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}

          </div>

          {/* Full Schedule Banner (Replaces 'More Loading') */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 relative overflow-hidden rounded-[2.5rem] bg-zinc-50 border border-gray-200 p-8 md:p-12"
          >
            <div className="absolute inset-0 bg-grid-graph opacity-30 pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
              <div>
                <h3 className="text-3xl md:text-4xl font-black text-zinc-900 tracking-tighter-swiss mb-3">
                  Explore Full Curriculum
                </h3>
                <p className="text-zinc-600 text-lg max-w-md">
                  Browse upcoming sessions, workshops, and past recordings.
                </p>
              </div>

              <Link
                href="/classes/calendar"
                className="group relative px-8 py-4 bg-zinc-900 text-white rounded-full font-bold text-lg hover:bg-zinc-800 transition-colors shadow-xl shadow-zinc-900/10 flex items-center gap-3"
              >
                <span>View Calendar</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
}
