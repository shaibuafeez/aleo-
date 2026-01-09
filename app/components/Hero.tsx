"use client";

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import InteractiveCodeVisualizer from './InteractiveCodeVisualizer';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const containerRef = useRef(null);

    // 3D Tilt Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-5deg", "5deg"]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXVal = e.clientX - rect.left;
        const mouseYVal = e.clientY - rect.top;
        const xPct = mouseXVal / width - 0.5;
        const yPct = mouseYVal / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <section
            ref={containerRef}
            className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-white text-black pt-32"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >

            {/* Swiss Graph Grid */}
            <div className="absolute inset-0 z-0 bg-grid-graph pointer-events-none opacity-60"></div>

            <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">

                {/* Left Content */}
                <div className="text-center lg:text-left space-y-8">

                    {/* Live Badge */}


                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter-swiss leading-[0.85] text-black">
                        LEARN MOVE.
                        <br />
                        <span className="text-gray-400">BUILD FUTURE.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-600 max-w-lg mx-auto lg:mx-0 font-medium leading-relaxed tracking-tight">
                        The definitive platform for Sui smart contracts.
                        Interactive. Precise. Award-winning.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-6">
                        <Link
                            href="/lessons"
                            className="group relative px-10 py-5 bg-black text-white rounded-full font-bold text-lg tracking-wide hover:scale-105 transition-all duration-300 shadow-2xl shadow-blue-900/20 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                Start Learning
                                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </Link>
                    </div>
                </div>

                {/* Right Content - 3D Visualizer */}
                <div className="relative perspective-1000">
                    <motion.div
                        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                        className="relative z-10"
                    >
                        <InteractiveCodeVisualizer />
                    </motion.div>

                    {/* Decorative Elements behind */}
                    <div className="absolute top-10 -right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -z-10"></div>
                </div>
            </div>
        </section>
    );
}
