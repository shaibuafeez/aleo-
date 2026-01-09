"use client";

import { useEffect, useRef } from 'react';
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
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-[10px] font-mono font-medium tracking-wider text-gray-500 uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                        Mainnet: Connected
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter-swiss leading-[0.85] text-black">
                        LEARN MOVE.
                        <br />
                        <span className="text-gray-400">BUILD FUTURE.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-600 max-w-lg mx-auto lg:mx-0 font-medium leading-relaxed tracking-tight">
                        The definitive platform for Sui smart contracts.
                        Interactive. Precise. Award-winning.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                        <button
                            className="px-8 py-4 bg-black text-white rounded-lg font-bold uppercase tracking-wide hover:bg-gray-800 transition-all duration-300 hover:-translate-y-1 shadow-lg"
                        >
                            Start Learning
                        </button>
                        <button
                            className="px-8 py-4 bg-white border border-gray-200 text-black rounded-lg font-bold uppercase tracking-wide hover:bg-gray-50 transition-all duration-300 hover:border-gray-400"
                        >
                            Documentation
                        </button>
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
