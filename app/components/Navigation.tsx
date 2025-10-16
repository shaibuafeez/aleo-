'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Scroll shadow effect
      setIsScrolled(window.scrollY > 20);

      // Scroll progress indicator
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/daily-challenge', label: 'Daily Challenge' },
    { href: '/lessons', label: 'Lessons' },
    { href: '/exercises', label: 'Exercises' },
    { href: '#features', label: 'Features' },
    { href: '#how-it-works', label: 'How It Works' },
  ];

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-sui-ocean to-sui-ocean-dark z-[60] origin-left"
        style={{ scaleX: scrollProgress / 100 }}
        initial={{ scaleX: 0 }}
      />

      {/* Navigation Bar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className={`fixed top-0 w-full backdrop-blur-md z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 shadow-lg'
            : 'bg-white/80'
        }`}
      >
        <div className="w-full px-4 sm:px-8 md:px-16 lg:px-20 py-3 md:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="flex-shrink-0"
              >
                <Image src="/sui-symbol.svg" alt="Sui" width={24} height={24} className="sm:w-8 sm:h-8" />
              </motion.div>
              <span className="text-base sm:text-lg md:text-xl font-bold text-sui-navy group-hover:text-sui-ocean transition-colors">
                Move By Practice
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-sm font-medium text-sui-gray-700 hover:text-sui-ocean transition-colors group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sui-ocean group-hover:w-full transition-all duration-300" />
                </Link>
              ))}

              {/* CTA Buttons */}
              <Link
                href="/lessons/1"
                className="px-6 py-2.5 bg-gradient-to-r from-sui-ocean to-sui-ocean-dark text-white rounded-full hover:shadow-lg hover:shadow-sui-ocean/30 hover:-translate-y-0.5 transition-all font-semibold text-sm"
              >
                Start Learning →
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1.5 text-sui-navy hover:text-sui-ocean transition-colors flex-shrink-0"
              aria-label="Toggle menu"
            >
              <motion.div
                animate={isMobileMenuOpen ? 'open' : 'closed'}
                className="w-5 h-4 flex flex-col justify-between"
              >
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 6 },
                  }}
                  className="w-full h-0.5 bg-current transform transition-all origin-center"
                />
                <motion.span
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 },
                  }}
                  className="w-full h-0.5 bg-current transition-opacity"
                />
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -6 },
                  }}
                  className="w-full h-0.5 bg-current transform transition-all origin-center"
                />
              </motion.div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-sui-navy/50 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-3/4 max-w-sm bg-white shadow-2xl z-50 md:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-6 border-b border-sui-gray-200">
                  <span className="text-lg font-bold text-sui-navy">Menu</span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-sui-gray-600 hover:text-sui-ocean transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Mobile Menu Links */}
                <div className="flex-1 overflow-y-auto py-6">
                  <div className="space-y-1 px-4">
                    {navLinks.map((link, index) => (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block px-4 py-3 text-sui-gray-700 hover:text-sui-ocean hover:bg-sui-sky rounded-xl transition-all font-medium"
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Mobile Menu Footer */}
                <div className="p-6 border-t border-sui-gray-200 space-y-3">
                  <Link
                    href="/lessons/1"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full px-6 py-3 bg-gradient-to-r from-sui-ocean to-sui-ocean-dark text-white rounded-full hover:shadow-lg transition-all font-semibold text-center"
                  >
                    Start Learning →
                  </Link>
                  <p className="text-xs text-center text-sui-gray-500">
                    14 interactive lessons • 100% free
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
