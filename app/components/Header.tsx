"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Header() {
    const pathname = usePathname();

    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'Lessons', href: '/lessons' },
        { name: 'Exercises', href: '/exercises' },
        { name: 'Daily', href: '/daily-challenge' },
        { name: 'Dashboard', href: '/dashboard' },
    ];

    return (
        <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
            <motion.nav
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="pointer-events-auto flex items-center gap-2 p-2 bg-white/70 backdrop-blur-xl border border-black/5 rounded-full shadow-lg shadow-black/5"
            >
                {/* Logo */}
                <Link href="/" className="px-4 py-2 flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
                        <span className="font-bold text-white text-xs">M</span>
                    </div>
                    <span className="font-bold text-black tracking-tight hidden sm:block group-hover:text-blue-600 transition-colors">Move</span>
                </Link>

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

                {/* CTA */}
                <Link href="/connect" className="px-4 py-2">
                    <button className="bg-black text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-blue-600 transition-all duration-300 hover:shadow-lg">
                        Connect Wallet
                    </button>
                </Link>
            </motion.nav>
        </header>
    );
}
