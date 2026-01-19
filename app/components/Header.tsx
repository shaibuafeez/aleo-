"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import ConnectWallet from './ConnectWallet';
import UserMenu from './auth/UserMenu';
import AuthModal from './auth/AuthModal';
import { useAuth } from '@/app/lib/auth/AuthProvider';

export default function Header() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const { user } = useAuth();

    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'Lessons', href: '/lessons' },
        { name: 'Live Classes', href: '/classes' },
        { name: 'Dashboard', href: '/dashboard' },
    ];

    return (
        <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
            <motion.nav
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="pointer-events-auto relative flex items-center gap-2 p-2 bg-white/70 backdrop-blur-xl border border-black/5 rounded-full shadow-lg shadow-black/5"
            >
                {/* Logo */}
                <Link href="/" className="px-4 py-2 flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </div>
                    <span className="font-bold text-black tracking-tight hidden sm:block group-hover:text-blue-600 transition-colors">Glide</span>
                </Link>

                {/* Desktop Nav Items */}
                <div className="hidden md:flex items-center gap-2">
                    {/* Divider */}
                    <div className="w-[1px] h-6 bg-black/10 mx-1" />

                    {/* Links */}
                    <ul className="flex items-center gap-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive ? 'text-black bg-gray-100' : 'text-gray-500 hover:text-black hover:bg-gray-50'
                                            }`}
                                    >
                                        {item.name}
                                        {isActive && (
                                            <motion.div
                                                layoutId="nav-pill"
                                                className="absolute inset-0 border border-black/5 rounded-full"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Divider */}
                    <div className="w-[1px] h-6 bg-black/10 mx-1" />
                </div>

                {/* Mobile Hamburger Toggle */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden px-2 py-2 text-black/80 hover:text-black transition-colors"
                >
                    <div className="w-6 h-6 flex flex-col justify-center items-center gap-1.5">
                        <motion.span
                            animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 6 : 0 }}
                            className="w-5 h-0.5 bg-black block rounded-full"
                        />
                        <motion.span
                            animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                            className="w-5 h-0.5 bg-black block rounded-full"
                        />
                        <motion.span
                            animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -6 : 0 }}
                            className="w-5 h-0.5 bg-black block rounded-full"
                        />
                    </div>
                </button>

                {/* CTA - Auth & Wallet */}
                <div className="hidden md:flex items-center gap-3">
                    {user ? (
                        <UserMenu />
                    ) : (
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setShowAuthModal(true)}
                            className="px-5 py-2 bg-black/5 text-black rounded-full text-sm font-semibold hover:bg-black/10 transition-all"
                        >
                            Sign In
                        </motion.button>
                    )}
                    <ConnectWallet />
                </div>
            </motion.nav>

            {/* Mobile Menu Dropdown & Backdrop */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 pointer-events-auto md:hidden"
                        />

                        {/* Menu Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="fixed top-24 left-4 right-4 p-2 bg-white border border-black/5 rounded-3xl shadow-2xl flex flex-col gap-1 overflow-hidden origin-top z-50 pointer-events-auto md:hidden"
                        >
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`relative px-4 py-3 rounded-2xl text-sm font-bold transition-all ${isActive ? 'bg-black text-white' : 'text-zinc-600 hover:bg-zinc-100'}`}
                                    >
                                        {item.name}
                                    </Link>
                                );
                            })}
                            <div className="h-[1px] bg-zinc-100 my-1 mx-2" />
                            <div className="flex flex-col gap-2 p-2">
                                {user ? (
                                    <div className="px-4 py-2 text-sm text-zinc-600 text-center">
                                        Signed in as <span className="font-semibold text-black">{user.email}</span>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setShowAuthModal(true);
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="w-full px-6 py-3 bg-black text-white rounded-xl font-semibold text-sm"
                                    >
                                        Sign In
                                    </button>
                                )}
                                <ConnectWallet />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Auth Modal */}
            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
            />
        </header>
    );
}
