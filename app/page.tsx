'use client';

import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import Hero from "./components/Hero";
import Testimonials from "./components/Testimonials";
import AnimatedCodePreview from "./components/AnimatedCodePreview";
import AnimatedCounter from "./components/AnimatedCounter";
import Footer from "./components/Footer";
import CinematicScroll from "./components/CinematicScroll";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth spring physics for scroll animations
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Parallax effects
  const heroY = useTransform(smoothProgress, [0, 0.3], [0, -100]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const featuresY = useTransform(smoothProgress, [0.2, 0.5], [100, 0]);
  const featuresScale = useTransform(smoothProgress, [0.1, 0.4], [0.95, 1]);
  const stepsScale = useTransform(smoothProgress, [0.5, 0.8], [0.8, 1]);

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-black">
      {/* Hero Section */}
      <Hero />



      {/* Cinematic Scroll Sequence */}
      <CinematicScroll />

      {/* Spacer */}
      <div className="h-20" />

      {/* Features Section - Modern Bento Grid */}
      <motion.section
        id="features"
        style={{ scale: featuresScale }}
        className="py-24 px-6 bg-gray-50 relative z-20"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <span className="px-4 py-2 bg-sui-ocean/10 text-sui-ocean rounded-full text-sm font-semibold border border-sui-ocean/20">
                Features
              </span>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold text-sui-navy mb-6">
              Everything You Need to Master Move
            </h2>
            <p className="text-xl text-sui-gray-600 max-w-3xl mx-auto">
              A complete learning platform designed for developers who want to build on Sui
            </p>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[minmax(200px,auto)]">

            {/* Large Featured Card - Instant Compilation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="group relative lg:col-span-2 lg:row-span-2 p-10 bg-black text-white rounded-[2rem] overflow-hidden shadow-2xl hover:shadow-black/20"
            >
              <div className="relative z-10 h-full flex flex-col">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-md border border-white/10">
                  <span className="text-3xl">⚡️</span>
                </div>

                <h3 className="text-4xl font-bold tracking-tighter-swiss mb-4">Instant Compilation</h3>
                <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-sm">
                  Zero setup. Compile Move code directly in your browser with our WASM engine.
                </p>

                {/* Stats */}
                <div className="mt-auto flex gap-4">
                  <div className="bg-white/10 px-5 py-3 rounded-xl border border-white/10">
                    <div className="text-2xl font-mono text-white">0s</div>
                    <div className="text-[10px] uppercase tracking-widest text-gray-500">Setup</div>
                  </div>
                  <div className="bg-white/10 px-5 py-3 rounded-xl border border-white/10">
                    <div className="text-2xl font-mono text-blue-400">100%</div>
                    <div className="text-[10px] uppercase tracking-widest text-gray-500">Web</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Gamified Experience */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group lg:col-span-2 p-8 bg-white border border-gray-200 rounded-[2rem] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-black mb-2 tracking-tighter-swiss">Gamified Learning</h3>
                  <p className="text-gray-500 text-sm">Earn XP and collect on-chain achievements.</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 font-bold border border-yellow-200">
                  XP
                </div>
              </div>
            </motion.div>

            {/* Deploy to Sui - Tall Card */}
            <motion.div
              initial={{ opacity: 0, y: 80, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.9,
                delay: 0.3,
                type: "spring",
                bounce: 0.4
              }}
              whileHover={{ y: -8, scale: 1.05 }}
              className="group relative lg:row-span-2 p-8 bg-white rounded-[2rem] border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-blue-100"
              >
                <svg className="w-8 h-8 text-sui-ocean" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </motion.div>

              <h3 className="text-2xl font-bold text-black mb-3 group-hover:text-blue-600 transition-colors tracking-tighter-swiss">
                Deploy to Sui
              </h3>
              <p className="text-sui-gray-700 leading-relaxed mb-6">
                One-click deployment to Sui testnet. See your smart contracts live on the blockchain.
              </p>

              <div className="mt-auto">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-sui-ocean/20">
                  <div className="flex items-center gap-2 text-sui-ocean font-semibold text-sm">
                    <span className="w-2 h-2 bg-sui-ocean rounded-full animate-pulse"></span>
                    Deploy in 5 minutes
                  </div>
                </div>
              </div>
            </motion.div>

            {/* VS Code Experience */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -5 }}
              className="group relative p-8 bg-white rounded-3xl border-2 border-sui-navy transition-all duration-300 hover:border-sui-ocean hover:shadow-xl"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="w-16 h-16 bg-sui-navy/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-sui-ocean/10 transition-colors"
              >
                <svg className="w-10 h-10 text-sui-navy group-hover:text-sui-ocean transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" width="40" height="40">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </motion.div>

              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                VS Code Editor
              </h3>
              <p className="text-sui-gray-700 leading-relaxed text-sm">
                Monaco editor with syntax highlighting and auto-completion.
              </p>
            </motion.div>

            {/* Hands-On Projects - Wide Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ y: -5 }}
              whileHover={{ y: -5 }}
              className="group relative lg:col-span-2 p-8 bg-black rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-black/20"
            >
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white rounded-full blur-3xl"></div>
              </div>

              <div className="relative z-10">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6"
                    >
                      <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" width="40" height="40">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </motion.div>

                    <h3 className="text-2xl font-bold text-white mb-3 tracking-tighter-swiss">
                      Hands-On Projects
                    </h3>
                    <p className="text-white/90 leading-relaxed">
                      Build real NFTs, DeFi protocols, and on-chain games. Create a portfolio while you learn.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* NFT Certificates */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ y: -5 }}
              className="group relative p-8 bg-white rounded-3xl border-2 border-sui-navy transition-all duration-300 hover:border-sui-ocean hover:shadow-xl"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="w-16 h-16 bg-sui-ocean/10 rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:bg-sui-ocean/20 transition-colors"
              >
                <svg className="w-8 h-8 text-sui-ocean" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" width="32" height="32">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </motion.div>

              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                NFT Certificates
              </h3>
              <p className="text-sui-gray-700 leading-relaxed text-sm">
                Earn on-chain certificates as Sui NFTs. Showcase your skills.
              </p>
            </motion.div>

          </div>
        </div>
      </motion.section>

      {/* How It Works - Swiss Timeline */}
      <motion.section
        id="how-it-works"
        style={{ scale: stepsScale }}
        className="py-24 md:py-32 px-6 bg-white relative overflow-hidden"
      >
        {/* Graph Grid Background */}
        <div className="absolute inset-0 bg-grid-graph opacity-60 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">

          {/* Header */}
          <div className="mb-24 md:mb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 mb-6 border border-gray-200 rounded-full bg-white shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-xs font-mono font-medium text-gray-600 uppercase tracking-wider">The Process</span>
            </motion.div>

            <h2 className="text-5xl md:text-7xl font-bold text-black mb-6 tracking-tighter-swiss leading-[0.9]">
              From Zero to <br className="hidden md:block" />
              <span className="text-gray-400">Deploy in Minutes.</span>
            </h2>
          </div>

          {/* Timeline Process */}
          <div className="relative grid md:grid-cols-3 gap-12">

            {/* Connecting Line (Desktop) */}
            <div className="absolute top-12 left-0 w-full h-px bg-gray-200 hidden md:block" />

            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="relative group"
            >
              <div className="absolute -top-16 -left-4 text-[12rem] font-bold text-gray-50 opacity-50 select-none -z-10 leading-none">
                1
              </div>

              {/* Timeline Dot */}
              <div className="w-24 h-24 bg-white border border-gray-200 rounded-full flex items-center justify-center mb-8 relative z-10 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                <svg className="w-10 h-10 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>

              <h3 className="text-2xl font-bold text-black mb-4 tracking-tight">Pick a Lesson</h3>
              <p className="text-gray-500 leading-relaxed font-medium">
                Choose from 14 interactive modules covering everything from basics to DeFi protocols.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative group"
            >
              <div className="absolute -top-16 -left-4 text-[12rem] font-bold text-gray-50 opacity-50 select-none -z-10 leading-none">
                2
              </div>

              {/* Timeline Dot */}
              <div className="w-24 h-24 bg-black text-white border border-black rounded-full flex items-center justify-center mb-8 relative z-10 group-hover:scale-110 transition-transform duration-500 shadow-xl">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>

              <h3 className="text-2xl font-bold text-black mb-4 tracking-tight">Write & Test</h3>
              <p className="text-gray-500 leading-relaxed font-medium">
                Write Move code in our browser-based IDE. Get instant compilation feedback via WASM.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="relative group"
            >
              <div className="absolute -top-16 -left-4 text-[12rem] font-bold text-gray-50 opacity-50 select-none -z-10 leading-none">
                3
              </div>

              {/* Timeline Dot */}
              <div className="w-24 h-24 bg-white border border-gray-200 rounded-full flex items-center justify-center mb-8 relative z-10 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                <svg className="w-10 h-10 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                </svg>
              </div>

              <h3 className="text-2xl font-bold text-black mb-4 tracking-tight">Deploy to Sui</h3>
              <p className="text-gray-500 leading-relaxed font-medium">
                One-click deployment to Testnet. Verify your contract and mint your proof-of-knowledge NFT.
              </p>
            </motion.div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-20"
          >
            <Link
              href="/lessons"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full hover:bg-gray-800 transition-all font-bold text-lg hover:-translate-y-1 shadow-xl"
            >
              <span>View All Lessons</span>
              <motion.svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </motion.svg>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials & Community */}
      <Testimonials />

      {/* Footer */}
      <Footer />
    </div>
  );
}
