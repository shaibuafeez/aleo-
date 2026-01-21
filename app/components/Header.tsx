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
    const isHome = pathname === '/';
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
                className={`pointer-events-auto relative flex items-center gap-2 p-2 rounded-full backdrop-blur-xl border shadow-lg transition-colors duration-300
                    ${isHome
                        ? 'bg-black/70 border-white/10 shadow-black/50'
                        : 'bg-white/80 border-gray-200 shadow-xl shadow-black/5'
                    }`}
            >
                {/* Logo */}
                <Link href="/" className="px-4 py-2 flex items-center gap-3 group">
                    <img
                        src={isHome ? "/aleo/secondary-icon-light.svg" : "/aleo/secondary-icon-dark.svg"}
                        alt="Aleo"
                        className="w-8 h-8 transition-transform group-hover:scale-105"
                    />
                    <span className={`font-bold tracking-tight hidden sm:block transition-colors ${isHome ? 'text-white group-hover:text-aleo-green' : 'text-black group-hover:text-aleo-green-dark'}`}>
                        Leo by Practice
                    </span>
                </Link>

                {/* Desktop Nav Items */}
                <div className="hidden md:flex items-center gap-2">
                    {/* Divider */}
                    <div className={`w-[1px] h-6 mx-1 ${isHome ? 'bg-white/10' : 'bg-zinc-200'}`} />

                    {/* Links */}
                    <ul className="flex items-center gap-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            // Dynamic Styles based on Theme
                            let itemClass = "relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ";

                            if (isHome) {
                                itemClass += isActive
                                    ? 'text-black bg-aleo-green'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5';
                            } else {
                                itemClass += isActive
                                    ? 'text-white bg-black'
                                    : 'text-zinc-500 hover:text-black hover:bg-black/5';
                            }

                            return (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className={itemClass}
                                    >
                                        {item.name}
                                        {isActive && (
                                            <motion.div
                                                layoutId="nav-pill"
                                                className={`absolute inset-0 border rounded-full ${isHome ? 'border-aleo-green/50' : 'border-zinc-700'}`}
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Divider */}
                    <div className={`w-[1px] h-6 mx-1 ${isHome ? 'bg-white/10' : 'bg-zinc-200'}`} />
                </div>

                {/* Mobile Hamburger Toggle */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className={`md:hidden px-2 py-2 transition-colors ${isHome ? 'text-white/80 hover:text-white' : 'text-black/80 hover:text-black'}`}
                >
                    <div className="w-6 h-6 flex flex-col justify-center items-center gap-1.5">
                        <motion.span
                            animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 6 : 0 }}
                            className={`w-5 h-0.5 block rounded-full ${isHome ? 'bg-white' : 'bg-black'}`}
                        />
                        <motion.span
                            animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                            className={`w-5 h-0.5 block rounded-full ${isHome ? 'bg-white' : 'bg-black'}`}
                        />
                        <motion.span
                            animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -6 : 0 }}
                            className={`w-5 h-0.5 block rounded-full ${isHome ? 'bg-white' : 'bg-black'}`}
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
                            className={`px-5 py-2 border rounded-full text-sm font-semibold transition-all shadow-sm
                                ${isHome
                                    ? 'bg-white/5 text-white border-white/10 hover:bg-white/10 hover:border-aleo-green/50'
                                    : 'bg-black text-white border-black hover:bg-zinc-800'
                                }`}
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
