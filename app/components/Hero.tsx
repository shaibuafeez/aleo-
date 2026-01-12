"use client";

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import InteractiveCodeVisualizer from './InteractiveCodeVisualizer';
import Magnetic from './Magnetic';
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
            className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-white text-black pt-32 md:pt-40"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >

            {/* Swiss Graph Grid */}
            <div className="absolute inset-0 z-0 bg-grid-graph pointer-events-none opacity-60"></div>

            <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                {/* Left Content */}
                <div className="text-center lg:text-left space-y-6 lg:space-y-8">

                    {/* Live Badge */}


                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter-swiss leading-none text-black">
                        MASTER MOVE.
                        <br />
                        <span className="text-gray-300">BUILD THE FUTURE.</span>
                    </h1>

                    <p className="text-lg text-gray-500 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed tracking-tight">
                        The interactive platform to master Sui Move. Write code, deploy contracts, and earn on-chain credentials.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center lg:items-start pt-4">
                        <Magnetic>
                            <motion.div
                                initial="rest"
                                whileHover="hover"
                                animate="rest"
                            >
                                <Link
                                    href="/lessons"
                                    className="group relative px-8 py-4 md:px-10 md:py-5 bg-black text-white rounded-full font-bold text-lg tracking-wide hover:scale-105 transition-all duration-300 shadow-2xl shadow-blue-900/20 overflow-hidden inline-flex items-center gap-3 border border-white/10"
                                >
                                    {/* Standard Text (Slides Up) */}
                                    <motion.div
                                        variants={{
                                            rest: { y: 0 },
                                            hover: { y: "-100%" }
                                        }}
                                        transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                                        className="flex items-center gap-3 relative z-10"
                                    >
                                        <span className="tracking-wide">Start learning</span>
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </motion.div>

                                    {/* Reveal Text (Slides In from Bottom) */}
                                    <motion.div
                                        variants={{
                                            rest: { y: "100%" },
                                            hover: { y: 0 }
                                        }}
                                        transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                                        className="absolute inset-0 flex items-center justify-center gap-3 bg-zinc-800 text-white z-10"
                                    >
                                        <span className="tracking-wide">Let's build</span>
                                        <svg className="w-5 h-5 rotate-[-45deg]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </motion.div>
                                </Link>
                            </motion.div>
                        </Magnetic>
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
