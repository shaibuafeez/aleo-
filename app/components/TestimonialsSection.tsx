"use client";

import { motion } from "framer-motion";
import { Card } from "./ui/Card";

const testimonials = [
    {
        id: "main",
        name: "Kaito T.",
        role: "Zero-Knowledge Engineer",
        text: "The instant feedback loop in the browser IDE is a game changer. I went from zero to deploying my first private dApp in an afternoon.",
        reputation: 98,
        img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kaito&backgroundColor=E0E0E0",
        large: true
    },
    {
        id: "sec1",
        name: "Zoya V.",
        role: "DeFi Architect",
        text: "Finally, a learning platform that treats ZK like a first-class citizen. The modules on private state transition are world-class.",
        reputation: 95,
        img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zoya&backgroundColor=E0E0E0",
        large: false
    },
    {
        id: "sec2",
        name: "Jaxon S.",
        role: "Smart Contract Auditor",
        text: "I recommend this to every junior auditor I train. It's the fastest way to understand the Leo language constraints.",
        reputation: 99,
        img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jaxon&backgroundColor=E0E0E0",
        large: false
    }
];

export default function TestimonialsSection() {
    return (
        <section className="relative py-24 md:py-32 bg-[#FAFAFA] text-black overflow-hidden">
            {/* Background Texture - Light Mode Noise */}
            <div className="absolute inset-0 z-0 opacity-40 pointer-events-none mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />

            <div className="container max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 mb-6"
                        >
                            <span className="w-3 h-3 bg-aleo-green-dark rounded-full" />
                            <span className="font-mono text-sm tracking-widest uppercase font-bold text-gray-500">Community</span>
                        </motion.div>
                        <h2 className="text-5xl md:text-6xl font-black text-black mb-6 tracking-tight leading-[0.9]">
                            Join the <br />
                            <span className="text-aleo-green-dark">Builder Mesh.</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-lg leading-relaxed font-medium">
                            Connect with <span className="text-black font-bold">10,000+ developers</span> building the future of private applications.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                        <div>
                            <div className="text-3xl font-black text-black mb-1 font-mono">10k+</div>
                            <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">Nodes</div>
                        </div>
                        <div>
                            <div className="text-3xl font-black text-black mb-1 font-mono">50k+</div>
                            <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">Programs</div>
                        </div>
                    </div>
                </div>

                {/* Mosaic Grid Layout */}
                <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 h-auto lg:h-[500px]">

                    {/* Large Card (Left) */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="h-full"
                    >
                        <Card variant="clean" className="h-full bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 p-8 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-4">
                                        <img src={testimonials[0].img} alt={testimonials[0].name} className="w-16 h-16 rounded-full border-2 border-black bg-gray-100" />
                                        <div>
                                            <h4 className="text-2xl font-bold text-black">{testimonials[0].name}</h4>
                                            <p className="text-sm text-gray-500 font-mono uppercase tracking-wide font-bold">{testimonials[0].role}</p>
                                        </div>
                                    </div>
                                    <div className="bg-aleo-green-dark text-white px-3 py-1 text-xs font-mono font-bold uppercase rounded-full">
                                        Top Contributor
                                    </div>
                                </div>
                                <p className="text-2xl font-medium text-black leading-tight">
                                    "{testimonials[0].text}"
                                </p>
                            </div>
                            <div className="mt-8 pt-6 border-t-2 border-gray-100 flex items-center justify-between">
                                <span className="font-mono text-xs font-bold text-gray-400 uppercase tracking-widest">Reputation</span>
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-32 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                                        <div className="h-full bg-aleo-green-dark" style={{ width: `${testimonials[0].reputation}%` }} />
                                    </div>
                                    <span className="font-mono font-bold text-black">{testimonials[0].reputation}</span>
                                </div>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Stacked Cards (Right) */}
                    <div className="flex flex-col gap-6 lg:gap-8 h-full">
                        {testimonials.slice(1).map((t, index) => (
                            <motion.div
                                key={t.id}
                                initial={{ opacity: 0, x: 40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2, duration: 0.6 }}
                                className="flex-1"
                            >
                                <Card variant="clean" className="h-full bg-white border border-gray-200 hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 p-6 flex flex-col justify-center">
                                    <div className="flex items-start gap-4 mb-4">
                                        <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full border border-gray-200 bg-gray-50" />
                                        <div>
                                            <h4 className="text-lg font-bold text-black leading-none mb-1">{t.name}</h4>
                                            <p className="text-xs text-gray-500 font-mono uppercase">{t.role}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 text-base leading-relaxed mb-4">
                                        "{t.text}"
                                    </p>
                                    <div className="mt-auto flex items-center gap-2 text-xs font-mono">
                                        <span className="text-gray-400 font-bold">REP:</span>
                                        <span className="text-black font-bold">{t.reputation}</span>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
