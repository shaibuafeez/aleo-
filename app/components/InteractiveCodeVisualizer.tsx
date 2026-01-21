"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const codeSnippet = `program token.aleo {
    // Private token with zero-knowledge transfers

    record Token {
        owner: address,
        amount: u64,
    }

    mapping balances: address => u64;

    // Mint new tokens privately
    transition mint_private(
        receiver: address,
        amount: u64
    ) -> Token {
        return Token {
            owner: receiver,
            amount: amount,
        };
    }

    // Transfer tokens privately
    transition transfer_private(
        sender: Token,
        receiver: address,
        amount: u64
    ) -> (Token, Token) {
        let difference: u64 = sender.amount - amount;

        let remaining: Token = Token {
            owner: sender.owner,
            amount: difference,
        };

        let transferred: Token = Token {
            owner: receiver,
            amount: amount,
        };

        return (remaining, transferred);
    }

    // Transfer tokens publicly
    transition transfer_public(
        public receiver: address,
        public amount: u64
    ) {
        return then finalize(self.caller, receiver, amount);
    }

    finalize transfer_public(
        sender: address,
        receiver: address,
        amount: u64
    ) {
        let sender_balance: u64 = Mapping::get_or_use(
            balances,
            sender,
            0u64
        );
        Mapping::set(balances, sender, sender_balance - amount);

        let receiver_balance: u64 = Mapping::get_or_use(
            balances,
            receiver,
            0u64
        );
        Mapping::set(balances, receiver, receiver_balance + amount);
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
                        <span className="w-2 h-2 rounded-full bg-aleo-green/20"></span>
                        token.aleo
                    </div>
                    <div className="w-12"></div> {/* Spacer for center alignment */}
                </div>

                {/* Code Area */}
                <div ref={scrollRef} className="p-6 h-[400px] overflow-y-auto font-mono text-sm leading-relaxed no-scrollbar scroll-smooth bg-white text-gray-800">
                    <pre className="whitespace-pre-wrap">
                        <code className="language-leo">
                            {displayedCode.split(/(\s+)/).map((chunk, i) => {
                                // Light Mode Leo Syntax Highlighting
                                let color = "text-gray-800";

                                // Keywords (red/pink)
                                if (["program", "record", "struct", "mapping", "transition", "finalize", "return", "let", "if", "else", "for", "public", "private", "const", "function", "inline", "then"].includes(chunk.trim())) {
                                    color = "text-red-500 font-bold";
                                }

                                // Types (blue)
                                if (["u8", "u16", "u32", "u64", "u128", "i8", "i16", "i32", "i64", "i128", "field", "group", "scalar", "address", "bool", "Token"].includes(chunk.trim())) {
                                    color = "text-blue-600 font-bold";
                                }

                                // Built-in functions (blue)
                                if (["Mapping::get", "Mapping::set", "Mapping::get_or_use", "self.caller", "self.signer"].includes(chunk.trim())) {
                                    color = "text-blue-600 font-bold";
                                }

                                // Special keywords (purple)
                                if (["owner", "amount", "sender", "receiver", "balances"].includes(chunk.trim())) {
                                    color = "text-purple-600";
                                }

                                // Numbers (green)
                                if (/^\d+u(8|16|32|64|128)$/.test(chunk.trim()) || /^\d+$/.test(chunk.trim())) {
                                    color = "text-green-600";
                                }

                                // Program name (orange)
                                if (chunk.trim().includes(".aleo")) {
                                    color = "text-orange-600 font-semibold";
                                }

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
                        <span>Ln 49, Col 1</span>
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
