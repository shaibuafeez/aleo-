'use client';

/**
 * User Menu Component
 * Displays user avatar and dropdown menu
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/app/lib/auth/AuthProvider';

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut, loading } = useAuth();

  if (loading) {
    return (
      <div className="w-10 h-10 rounded-full bg-sui-gray-200 animate-pulse"></div>
    );
  }

  if (!user) return null;

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  // Get user initial for avatar
  const initial = user.email?.charAt(0).toUpperCase() || 'U';

  return (
    <div className="relative">
      {/* Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-sui-ocean text-white font-bold flex items-center justify-center hover:bg-sui-ocean-dark transition-colors ring-2 ring-transparent hover:ring-sui-ocean/50"
      >
        {initial}
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border-2 border-sui-gray-200 overflow-hidden z-50"
            >
              {/* User Info */}
              <div className="px-4 py-3 bg-sui-sky border-b border-sui-gray-200">
                <p className="text-sm font-semibold text-sui-navy">{user.email}</p>
                <p className="text-xs text-sui-gray-600">Signed in</p>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 text-sm text-sui-navy hover:bg-sui-sky transition-colors"
                >
                  📊 Dashboard
                </Link>
                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 text-sm text-sui-navy hover:bg-sui-sky transition-colors"
                >
                  👤 Profile
                </Link>
                <Link
                  href="/achievements"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 text-sm text-sui-navy hover:bg-sui-sky transition-colors"
                >
                  🏆 Achievements
                </Link>
                <Link
                  href="/classes"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 text-sm text-sui-navy hover:bg-sui-sky transition-colors"
                >
                  🎥 Live Classes
                </Link>
              </div>

              {/* Sign Out */}
              <div className="border-t border-sui-gray-200">
                <button
                  onClick={handleSignOut}
                  className="w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors text-left font-semibold"
                >
                  Sign Out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
