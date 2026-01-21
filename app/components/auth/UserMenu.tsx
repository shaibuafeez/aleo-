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
      <div className="w-10 h-10 rounded-full bg-gray-100 animate-pulse border border-gray-200"></div>
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
        className="w-10 h-10 rounded-full bg-black text-white border border-white/10 font-bold flex items-center justify-center hover:bg-zinc-800 transition-colors shadow-sm"
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
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="absolute right-0 mt-2 w-64 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200 overflow-hidden z-50"
            >
              {/* User Info */}
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                <p className="text-sm font-bold text-black truncate">{user.email}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-2 h-2 rounded-full bg-aleo-green animate-pulse" />
                  <p className="text-[10px] uppercase tracking-wider font-bold text-gray-500">Connected</p>
                </div>
              </div>

              {/* Menu Items */}
              <div className="p-1">
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-100/80 rounded-lg transition-colors"
                >
                  <span className="mr-2">📊</span> Dashboard
                </Link>
                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-100/80 rounded-lg transition-colors"
                >
                  <span className="mr-2">👤</span> Profile
                </Link>
                <Link
                  href="/achievements"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-100/80 rounded-lg transition-colors"
                >
                  <span className="mr-2">🏆</span> Achievements
                </Link>
                <Link
                  href="/classes"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-100/80 rounded-lg transition-colors"
                >
                  <span className="mr-2">🎥</span> Live Classes
                </Link>
              </div>

              {/* Sign Out */}
              <div className="p-1 border-t border-gray-100">
                <button
                  onClick={handleSignOut}
                  className="w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left font-medium flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>
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
