"use client";

import { motion } from "framer-motion";

const COMPANIES = [
    "Mysten Labs",
    "Sui Foundation",
    "BlueMove",
    "Cetus Protocol",
    "Ethos Wallet",
    "Typus Finance",
    "Scallop",
    "Navi Protocol"
];

const TESTIMONIALS = [
    {
        quote: "The visualizer makes Move concepts click instantly. I went from zero to mainnet in a weekend.",
        author: "Alex D.",
        role: "Smart Contract Engineer",
        company: "Mysten Labs"
    },
    {
        quote: "Finally, a learning platform that treats frontend and contract integration as first-class citizens.",
        author: "Sarah K.",
        role: "Full Stack Dev",
        company: "Stealth Startup"
    }
];

export default function Testimonials() {
    return (
        <section className="py-32 bg-white relative overflow-hidden border-t border-gray-100">

            {/* Background Grid */}
            <div className="absolute inset-0 bg-grid-graph opacity-40 pointer-events-none" />

            {/* Marquee Section */}
            <div className="mb-32 overflow-hidden border-y border-gray-100 bg-gray-50/50 py-12">
                <div className="flex">
                    <motion.div
                        className="flex gap-16 md:gap-32 px-16 whitespace-nowrap text-2xl md:text-3xl font-bold text-gray-300 tracking-tighter-swiss uppercase select-none"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                            repeatType: "loop"
                        }}
                    >
                        {[...COMPANIES, ...COMPANIES, ...COMPANIES].map((company, i) => (
                            <span key={i} className="flex items-center gap-4">
                                {/* Optional: Add minimal icon here */}
                                {company}
                            </span>
                        ))}
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="mb-20">
                    <h2 className="text-4xl md:text-6xl font-bold text-black tracking-tighter-swiss mb-6">
                        Trusted by the <br />
                        <span className="text-gray-400">Next Generation.</span>
                    </h2>
                </div>

                {/* Testimonials Slider */}
                <div className="relative overflow-hidden -mx-6 px-6 md:px-0 md:mx-0">
                    <motion.div
                        className="flex gap-6 md:gap-8 cursor-grab active:cursor-grabbing"
                        drag="x"
                        dragConstraints={{ right: 0, left: -1000 }} // Adjustable based on content width
                        whileTap={{ scale: 0.98 }}
                    >
                        {[...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                            <motion.div
                                key={i}
                                className="relative min-w-[85vw] md:min-w-[400px] bg-gray-50 rounded-3xl p-8 border border-gray-100 flex flex-col justify-between select-none"
                            >
                                <div>
                                    {/* Quote Mark */}
                                    <div className="text-6xl text-blue-600 mb-6 font-serif opacity-30">"</div>

                                    <h3 className="text-xl md:text-2xl font-medium text-black leading-tight mb-8 tracking-tight">
                                        {t.quote}
                                    </h3>
                                </div>

                                <div className="flex items-center gap-4 border-t border-gray-200 pt-6">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-lg font-bold text-gray-400 border border-gray-100">
                                        {t.author[0]}
                                    </div>
                                    <div>
                                        <div className="font-bold text-black">{t.author}</div>
                                        <div className="text-sm text-gray-500">{t.role} @ {t.company}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Visual Hint for Scroll */}
                    <div className="flex justify-center mt-8 gap-2 md:hidden">
                        <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                    </div>
                </div>

                {/* Final Large CTA - Swiss Dark Mode */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mt-32 relative rounded-[3rem] overflow-hidden bg-[#050505] border border-white/10 shadow-2xl"
                >
                    {/* Noise Texture */}
                    <div className="absolute inset-0 bg-noise-overlay opacity-[0.07] pointer-events-none mix-blend-overlay" />

                    {/* Abstract Blue Orb */}
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />

                    <div className="relative z-10 p-12 md:p-24 grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-xs font-mono font-medium text-gray-400 uppercase tracking-wider">Accepting New Students</span>
                            </div>

                            <h2 className="text-5xl md:text-8xl font-bold text-white tracking-tighter-swiss leading-[0.9] mb-8">
                                Ready to <br />
                                <span className="text-gray-500">break stuff?</span>
                            </h2>
                        </div>

                        <div className="flex flex-col items-start md:items-end justify-center">
                            <p className="text-gray-400 text-xl md:text-2xl mb-10 max-w-md text-left md:text-right leading-relaxed">
                                Join the cohort defining the future of on-chain finance on Sui.
                            </p>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="group bg-white text-black px-12 py-6 rounded-full text-xl font-bold hover:shadow-[0_0_50px_-10px_rgba(255,255,255,0.3)] transition-all flex items-center gap-3"
                            >
                                <span>Start Building</span>
                                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
