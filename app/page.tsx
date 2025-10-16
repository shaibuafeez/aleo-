'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedCodePreview from "./components/AnimatedCodePreview";
import AnimatedCounter from "./components/AnimatedCounter";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6">

        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-sui-sky/50 rounded-full text-sm text-sui-navy font-medium mb-8 backdrop-blur-sm border border-sui-ocean/20"
          >
            <span className="w-2 h-2 bg-sui-ocean rounded-full animate-pulse"></span>
            Powered by Sui Blockchain
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-sui-navy mb-6 leading-tight"
          >
            Learn Move by<br />
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-sui-ocean via-sui-ocean-dark to-sui-ocean"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                backgroundSize: '200% 200%',
              }}
            >
              Building Real Projects
            </motion.span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-sui-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto font-light"
          >
            Master Sui Move through interactive, gamified lessons. No installation needed.
            Code in your browser. Deploy to testnet instantly.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-16 w-full max-w-[340px] sm:max-w-none mx-auto px-4"
          >
            <Link
              href="/lessons"
              className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-sui-ocean to-sui-ocean-dark text-white rounded-full hover:shadow-2xl hover:shadow-sui-ocean/40 transition-all font-semibold text-base sm:text-lg hover:-translate-y-1"
            >
              <span className="flex items-center justify-center gap-2">
                Start Free Course
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </Link>
            <a
              href="#how-it-works"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-sui-navy border-2 border-sui-gray-300 rounded-full hover:border-sui-ocean hover:shadow-lg transition-all font-semibold text-base sm:text-lg"
            >
              See How It Works
            </a>
          </motion.div>

          {/* Animated Code Preview */}
          <div className="mb-16">
            <AnimatedCodePreview />
          </div>

          {/* Animated Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-8 max-w-full sm:max-w-2xl mx-auto px-2"
          >
            <div className="p-3 sm:p-4 md:p-6 bg-white/50 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-sui-gray-200">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-sui-ocean mb-0.5 sm:mb-1">
                <AnimatedCounter from={0} to={14} duration={2} />
              </div>
              <div className="text-[10px] sm:text-xs md:text-sm text-sui-gray-600 font-medium">Interactive Lessons</div>
            </div>
            <div className="p-3 sm:p-4 md:p-6 bg-white/50 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-sui-gray-200">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-sui-ocean mb-0.5 sm:mb-1">
                <AnimatedCounter from={0} to={0} duration={2} suffix="s" />
              </div>
              <div className="text-[10px] sm:text-xs md:text-sm text-sui-gray-600 font-medium">Setup Time</div>
            </div>
            <div className="p-3 sm:p-4 md:p-6 bg-white/50 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-sui-gray-200">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-sui-ocean mb-0.5 sm:mb-1">
                <AnimatedCounter from={0} to={5} duration={2} suffix="min" />
              </div>
              <div className="text-[10px] sm:text-xs md:text-sm text-sui-gray-600 font-medium">First Deploy</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-white">

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header with enhanced animation */}
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

          {/* Feature Cards Grid with enhanced interactions */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {/* Feature 1 - Instant Compilation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative p-6 sm:p-8 md:p-10 bg-white rounded-2xl sm:rounded-3xl border-2 border-sui-navy transition-all duration-300 hover:border-sui-ocean hover:shadow-2xl hover:shadow-sui-ocean/20"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-sui-ocean/0 to-sui-ocean/0 group-hover:from-sui-ocean/5 group-hover:to-transparent rounded-2xl sm:rounded-3xl transition-all duration-300" />

              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-sui-sky/30 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-5 md:mb-6 group-hover:bg-sui-ocean/20 transition-colors duration-300"
              >
                <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-sui-ocean group-hover:text-sui-ocean-dark transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </motion.div>

              <h3 className="relative text-lg sm:text-xl md:text-2xl font-bold text-sui-navy mb-2 sm:mb-3 md:mb-4 group-hover:text-sui-ocean transition-colors duration-300">
                Instant Compilation
              </h3>
              <p className="relative text-sui-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">
                Real Move compiler runs in your browser. No downloads, no setup, no waiting. Just pure learning.
              </p>
            </motion.div>

            {/* Feature 2 - Gamified Experience */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -8 }}
              className="group relative p-6 sm:p-8 md:p-10 bg-white rounded-2xl sm:rounded-3xl border-2 border-sui-navy transition-all duration-300 hover:border-sui-ocean hover:shadow-2xl hover:shadow-sui-ocean/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-sui-ocean/0 to-sui-ocean/0 group-hover:from-sui-ocean/5 group-hover:to-transparent rounded-2xl sm:rounded-3xl transition-all duration-300" />

              <motion.div
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-sui-sky/30 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-5 md:mb-6 group-hover:bg-sui-ocean/20 transition-colors duration-300"
              >
                <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-sui-ocean group-hover:text-sui-ocean-dark transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              </motion.div>

              <h3 className="relative text-lg sm:text-xl md:text-2xl font-bold text-sui-navy mb-2 sm:mb-3 md:mb-4 group-hover:text-sui-ocean transition-colors duration-300">
                Gamified Experience
              </h3>
              <p className="relative text-sui-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">
                Earn XP, level up, unlock achievements, and compete on leaderboards. Learning has never been this fun.
              </p>
            </motion.div>

            {/* Feature 3 - Deploy to Sui */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -8 }}
              className="group relative p-6 sm:p-8 md:p-10 bg-white rounded-2xl sm:rounded-3xl border-2 border-sui-navy transition-all duration-300 hover:border-sui-ocean hover:shadow-2xl hover:shadow-sui-ocean/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-sui-ocean/0 to-sui-ocean/0 group-hover:from-sui-ocean/5 group-hover:to-transparent rounded-2xl sm:rounded-3xl transition-all duration-300" />

              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-sui-sky/30 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-5 md:mb-6 group-hover:bg-sui-ocean/20 transition-colors duration-300"
              >
                <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-sui-ocean group-hover:text-sui-ocean-dark transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </motion.div>

              <h3 className="relative text-lg sm:text-xl md:text-2xl font-bold text-sui-navy mb-2 sm:mb-3 md:mb-4 group-hover:text-sui-ocean transition-colors duration-300">
                Deploy to Sui
              </h3>
              <p className="relative text-sui-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">
                One-click deployment to Sui testnet. See your smart contracts live on the blockchain in minutes.
              </p>
            </motion.div>

            {/* Feature 4 - VS Code Experience */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -8 }}
              className="group relative p-6 sm:p-8 md:p-10 bg-white rounded-2xl sm:rounded-3xl border-2 border-sui-navy transition-all duration-300 hover:border-sui-ocean hover:shadow-2xl hover:shadow-sui-ocean/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-sui-ocean/0 to-sui-ocean/0 group-hover:from-sui-ocean/5 group-hover:to-transparent rounded-2xl sm:rounded-3xl transition-all duration-300" />

              <motion.div
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-sui-sky/30 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-5 md:mb-6 group-hover:bg-sui-ocean/20 transition-colors duration-300"
              >
                <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-sui-ocean group-hover:text-sui-ocean-dark transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </motion.div>

              <h3 className="relative text-lg sm:text-xl md:text-2xl font-bold text-sui-navy mb-2 sm:mb-3 md:mb-4 group-hover:text-sui-ocean transition-colors duration-300">
                VS Code Experience
              </h3>
              <p className="relative text-sui-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">
                Monaco editor with full Move syntax highlighting, auto-completion, and error detection.
              </p>
            </motion.div>

            {/* Feature 5 - Hands-On Projects */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ y: -8 }}
              className="group relative p-6 sm:p-8 md:p-10 bg-white rounded-2xl sm:rounded-3xl border-2 border-sui-navy transition-all duration-300 hover:border-sui-ocean hover:shadow-2xl hover:shadow-sui-ocean/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-sui-ocean/0 to-sui-ocean/0 group-hover:from-sui-ocean/5 group-hover:to-transparent rounded-2xl sm:rounded-3xl transition-all duration-300" />

              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-sui-sky/30 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-5 md:mb-6 group-hover:bg-sui-ocean/20 transition-colors duration-300"
              >
                <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-sui-ocean group-hover:text-sui-ocean-dark transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </motion.div>

              <h3 className="relative text-lg sm:text-xl md:text-2xl font-bold text-sui-navy mb-2 sm:mb-3 md:mb-4 group-hover:text-sui-ocean transition-colors duration-300">
                Hands-On Projects
              </h3>
              <p className="relative text-sui-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">
                Build real NFTs, DeFi protocols, and on-chain games. Create a portfolio while you learn.
              </p>
            </motion.div>

            {/* Feature 6 - NFT Certificates */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ y: -8 }}
              className="group relative p-6 sm:p-8 md:p-10 bg-white rounded-2xl sm:rounded-3xl border-2 border-sui-navy transition-all duration-300 hover:border-sui-ocean hover:shadow-2xl hover:shadow-sui-ocean/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-sui-ocean/0 to-sui-ocean/0 group-hover:from-sui-ocean/5 group-hover:to-transparent rounded-2xl sm:rounded-3xl transition-all duration-300" />

              <motion.div
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-sui-sky/30 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-5 md:mb-6 group-hover:bg-sui-ocean/20 transition-colors duration-300"
              >
                <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-sui-ocean group-hover:text-sui-ocean-dark transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </motion.div>

              <h3 className="relative text-lg sm:text-xl md:text-2xl font-bold text-sui-navy mb-2 sm:mb-3 md:mb-4 group-hover:text-sui-ocean transition-colors duration-300">
                NFT Certificates
              </h3>
              <p className="relative text-sui-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">
                Earn on-chain certificates as Sui NFTs. Showcase your skills and unlock advanced courses.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white">

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-sui-navy mb-3 sm:mb-4">
              From Zero to Deploy in 3 Steps
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-sui-gray-600">
              Start building on Sui blockchain in minutes, not hours
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center relative"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-sui-ocean to-sui-ocean-dark rounded-full flex items-center justify-center text-2xl sm:text-2xl md:text-3xl font-bold text-white mx-auto mb-3 sm:mb-4 md:mb-6 shadow-lg shadow-sui-ocean/30 relative z-10"
              >
                1
              </motion.div>
              <div className="bg-white/50 backdrop-blur-sm p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-sui-gray-200">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-sui-navy mb-2 sm:mb-2.5 md:mb-3">
                  Pick a Lesson
                </h3>
                <p className="text-sm sm:text-base text-sui-gray-600">
                  Choose from 14 interactive lessons covering NFTs, DeFi, and on-chain games
                </p>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center relative"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
                className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-sui-ocean to-sui-ocean-dark rounded-full flex items-center justify-center text-2xl sm:text-2xl md:text-3xl font-bold text-white mx-auto mb-3 sm:mb-4 md:mb-6 shadow-lg shadow-sui-ocean/30 relative z-10"
              >
                2
              </motion.div>
              <div className="bg-white/50 backdrop-blur-sm p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-sui-gray-200">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-sui-navy mb-2 sm:mb-2.5 md:mb-3">
                  Write & Test Code
                </h3>
                <p className="text-sm sm:text-base text-sui-gray-600">
                  Code in your browser with instant feedback. Our compiler validates your Move code in real-time
                </p>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-center relative"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, delay: 0.7 }}
                className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-sui-ocean to-sui-ocean-dark rounded-full flex items-center justify-center text-2xl sm:text-2xl md:text-3xl font-bold text-white mx-auto mb-3 sm:mb-4 md:mb-6 shadow-lg shadow-sui-ocean/30 relative z-10"
              >
                3
              </motion.div>
              <div className="bg-white/50 backdrop-blur-sm p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-sui-gray-200">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-sui-navy mb-2 sm:mb-2.5 md:mb-3">
                  Deploy to Sui
                </h3>
                <p className="text-sm sm:text-base text-sui-gray-600">
                  One click to deploy your smart contract to Sui testnet. See it live on the blockchain
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-8 sm:mt-12 md:mt-16"
          >
            <Link
              href="/lessons"
              className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-sui-ocean to-sui-ocean-dark text-white rounded-full hover:shadow-2xl hover:shadow-sui-ocean/40 transition-all font-semibold text-base sm:text-lg hover:-translate-y-1"
            >
              <span>View All Lessons</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
