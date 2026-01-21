"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { Badge } from "./ui/Badge";
import StickyTerminal from "./StickyTerminal";

export default function TimelineSection() {
    const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);

    // Refs for each step to trigger state changes
    const step1Ref = useRef(null);
    const step2Ref = useRef(null);
    const step3Ref = useRef(null);

    const isStep1InView = useInView(step1Ref, { margin: "-50% 0px -50% 0px" });
    const isStep2InView = useInView(step2Ref, { margin: "-50% 0px -50% 0px" });
    const isStep3InView = useInView(step3Ref, { margin: "-50% 0px -50% 0px" });

    useEffect(() => {
        if (isStep1InView) setActiveStep(1);
        if (isStep2InView) setActiveStep(2);
        if (isStep3InView) setActiveStep(3);
    }, [isStep1InView, isStep2InView, isStep3InView]);

    return (
        <section className="relative bg-aleo-black py-24 md:py-32 overflow-hidden">
            {/* Graph Grid Background */}
            <div className="absolute inset-0 bg-grid-graph opacity-10 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="container max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="mb-24 text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 mb-6"
                    >
                        <Badge variant="secondary" className="border-white/20 bg-white/5 text-white">The Journey</Badge>
                    </motion.div>

                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                        Deep Dive into <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-aleo-green to-aleo-green-light">Zero-Knowledge.</span>
                    </h2>
                    <p className="text-gray-400 max-w-xl text-lg">
                        Go from reading to writing to deploying privacy-preserving applications in minutes.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                    {/* Left Column: Scrolling Steps */}
                    <div className="relative space-y-[40vh] py-[10vh]">
                        {/* Vertical Line */}
                        <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10" />

                        {/* Step 1 */}
                        <div ref={step1Ref} className="relative pl-16 group">
                            <div className={`absolute mobile-step-indicator left-0 top-0 w-12 h-12 rounded-full border border-aleo-black flex items-center justify-center transition-all duration-500 z-10 ${activeStep === 1 ? 'bg-aleo-green text-black scale-110 shadow-[0_0_20px_rgba(0,255,153,0.4)]' : 'bg-aleo-black border-white/20 text-gray-500'}`}>
                                <span className="font-mono font-bold">01</span>
                            </div>
                            <h3 className={`text-3xl font-bold mb-4 transition-colors duration-300 ${activeStep === 1 ? 'text-white' : 'text-gray-600'}`}>Select a Module</h3>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Browse our curated library of ZK examples. From basic arithmetic to complex DeFi pools and NFT marketplaces.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div ref={step2Ref} className="relative pl-16 group">
                            <div className={`absolute mobile-step-indicator left-0 top-0 w-12 h-12 rounded-full border border-aleo-black flex items-center justify-center transition-all duration-500 z-10 ${activeStep === 2 ? 'bg-aleo-green text-black scale-110 shadow-[0_0_20px_rgba(0,255,153,0.4)]' : 'bg-aleo-black border-white/20 text-gray-500'}`}>
                                <span className="font-mono font-bold">02</span>
                            </div>
                            <h3 className={`text-3xl font-bold mb-4 transition-colors duration-300 ${activeStep === 2 ? 'text-white' : 'text-gray-600'}`}>Write & Compile</h3>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Use the in-browser IDE to write Leo code. Catch syntax errors in real-time and compile your circuits instantly.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div ref={step3Ref} className="relative pl-16 group">
                            <div className={`absolute mobile-step-indicator left-0 top-0 w-12 h-12 rounded-full border border-aleo-black flex items-center justify-center transition-all duration-500 z-10 ${activeStep === 3 ? 'bg-aleo-green text-black scale-110 shadow-[0_0_20px_rgba(0,255,153,0.4)]' : 'bg-aleo-black border-white/20 text-gray-500'}`}>
                                <span className="font-mono font-bold">03</span>
                            </div>
                            <h3 className={`text-3xl font-bold mb-4 transition-colors duration-300 ${activeStep === 3 ? 'text-white' : 'text-gray-600'}`}>Deploy to Network</h3>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                One-click deployment to the Aleo Testnet. Verify your proofs and interact with your program on-chain.
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Sticky Terminal */}
                    <div className="hidden lg:block relative h-[600px]">
                        <div className="sticky top-1/2 -translate-y-1/2">
                            <StickyTerminal step={activeStep} />
                        </div>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-32">
                    <Link href="/lessons">
                        <span className="group inline-flex items-center gap-3 px-8 py-4 bg-aleo-green text-black rounded-full hover:bg-white hover:text-black transition-all font-bold text-lg hover:-translate-y-1 shadow-[0_0_20px_rgba(0,255,153,0.4)]">
                            <span>Start Building Now</span>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
