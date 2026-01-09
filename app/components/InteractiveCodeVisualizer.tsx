"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const codeSnippet = `module move_by_practice::hero_contract {
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};

    struct Hero has key, store {
        id: UID,
        power: u64,
        xp: u64,
    }

    public entry fun create_hero(ctx: &mut TxContext) {
        let hero = Hero {
            id: object::new(ctx),
            power: 100,
            xp: 0,
        };
        transfer::transfer(hero, tx_context::sender(ctx));
    }
}`;

export default function InteractiveCodeVisualizer() {
    const [displayedCode, setDisplayedCode] = useState("");
    const [isTyping, setIsTyping] = useState(true);
    const [showSuccess, setShowSuccess] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let currentIndex = 0;
        const typingSpeed = 30; // ms per char

        const typeChar = () => {
            if (currentIndex < codeSnippet.length) {
                // Use functional state securely to append the correct character
                const char = codeSnippet[currentIndex];
                setDisplayedCode((prev) => prev + char);
                currentIndex++;

                // Auto-scroll
                if (scrollRef.current) {
                    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
                }

                // Variable speed for realism
                const randomSpeed = typingSpeed + Math.random() * 20;
                setTimeout(typeChar, randomSpeed);
            } else {
                setIsTyping(false);
                setTimeout(() => setShowSuccess(true), 500);
            }
        };


        // Start delay
        const startTimeout = setTimeout(typeChar, 1000);

        return () => clearTimeout(startTimeout);
    }, []);

    return (
        <div className="relative group perspective-1000">
            {/* Main Container - Physical Touch */}
            <motion.div
                initial={{ opacity: 0, y: 50, rotateX: 10 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative bg-white rounded-xl border border-gray-200 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] overflow-hidden"
            >
                {/* Window Header */}
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]"></div>
                    </div>
                    <div className="text-[10px] font-mono font-medium text-gray-500 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500/20"></span>
                        hero_contract.move
                    </div>
                    <div className="w-12"></div> {/* Spacer for center alignment */}
                </div>

                {/* Code Area */}
                <div ref={scrollRef} className="p-6 h-[400px] overflow-y-auto font-mono text-sm leading-relaxed no-scrollbar scroll-smooth bg-white text-gray-800">
                    <pre className="whitespace-pre-wrap">
                        <code className="language-move">
                            {displayedCode.split(/(\s+)/).map((chunk, i) => {
                                // Light Mode Syntax
                                let color = "text-gray-800";
                                if (["module", "use", "struct", "public", "fun", "entry"].includes(chunk.trim())) color = "text-red-500 font-bold";
                                if (["Hero", "UID", "TxContext", "u64", "object", "transfer"].includes(chunk.trim())) color = "text-blue-600 font-bold";
                                if (["has", "key", "store", "let"].includes(chunk.trim())) color = "text-purple-600";
                                if (chunk.trim().startsWith("0x")) color = "text-green-600";

                                return <span key={i} className={color}>{chunk}</span>;
                            })}
                            {isTyping && (
                                <span className="inline-block w-2.5 h-5 ml-1 bg-black animate-pulse align-middle" />
                            )}
                        </code>
                    </pre>
                </div>

                {/* Status Bar */}
                <div className="px-4 py-2 border-t border-gray-100 bg-white flex items-center justify-between text-xs font-mono text-gray-400">
                    <div className="flex gap-4">
                        <span>Ln 20, Col 1</span>
                        <span>UTF-8</span>
                    </div>
                    <AnimatePresence>
                        {showSuccess && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100"
                            >
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="font-semibold">Compiled & Deployed</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}
