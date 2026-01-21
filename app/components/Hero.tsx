"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "./ui/Button";
import AnimatedCodePreview from "./AnimatedCodePreview";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
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
            className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#020202] text-white pt-24 md:pt-28"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >

            {/* Cyber Graph Grid */}
            <div className="absolute inset-0 z-0 opacity-40 pointer-events-none bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url('/assets/3d/hero-bg.png')`,
                }}
            ></div>

            {/* Ambient Glows - Significantly Reduced for "Black" feel */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-aleo-green/5 rounded-full blur-[150px] pointer-events-none opacity-50" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-aleo-green-dim/10 rounded-full blur-[150px] pointer-events-none opacity-30" />

            <div className="container max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10 grid lg:grid-cols-5 gap-12 lg:gap-20 items-center">

                {/* Left Content */}
                <div className="text-center lg:text-left space-y-8 lg:pl-4 lg:col-span-2">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >

                        <h1 className="text-5xl sm:text-6xl md:text-8xl font-sans font-bold tracking-tight leading-[0.9] text-white mb-6">
                            MASTER <br />
                            <span className="text-aleo-green">LEO.</span> <br />
                            BUILD <br />
                            <span className="text-gray-500">PRIVATE.</span>
                        </h1>


                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 font-mono"
                    >
                        <Link href="/lessons">
                            <Button className="bg-aleo-green text-black hover:bg-aleo-green-neon border-none font-bold tracking-tight rounded-full px-8 py-4 sm:px-10 sm:py-5 text-lg sm:text-xl transition-all hover:scale-105">
                                Start Learning <span className="ml-2">→</span>
                            </Button>
                        </Link>
                        <Link href="/docs">
                            <Button variant="ghost" className="text-gray-400 hover:text-white hover:bg-white/5 rounded-full px-6 py-4 sm:px-8 sm:py-5 text-base sm:text-lg">
                                Documentation
                            </Button>
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="flex items-center justify-center lg:justify-start gap-8 pt-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500"
                    >
                        {/* Trust Badges / Logos could go here if needed */}
                        <div className="text-sm font-mono text-gray-500">POWERED BY ALEO</div>
                    </motion.div>
                </div>

                {/* Right Content - 3D Code Preview */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="relative hidden lg:block perspective-1000 lg:col-span-3"
                >
                    <AnimatedCodePreview />
                </motion.div>

            </div>
        </section>
    );
}
