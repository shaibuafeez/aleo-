"use client";

import { motion } from "framer-motion";
import InteractiveIDECard from "./cards/InteractiveIDECard";
import HolographicTokenCard from "./cards/HolographicTokenCard";
import NetworkGlobeCard from "./cards/NetworkGlobeCard";
import { Card } from "@/app/components/ui/Card";

export default function InteractiveFeatureGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[320px] md:auto-rows-[400px]">

            {/* 1. The Main IDE - Spans 2 cols on Large */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-2"
            >
                <InteractiveIDECard />
            </motion.div>

            {/* 2. Holographic Token */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
            >
                <HolographicTokenCard />
            </motion.div>

            {/* 3. Network Globe */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <NetworkGlobeCard />
            </motion.div>

            {/* 4. Feature List / Quick Stats (Simple Card) */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="lg:col-span-2"
            >
                <Card variant="clean" className="h-full bg-gray-50 border-gray-200 flex flex-col justify-center p-8">
                    <h3 className="text-2xl font-bold text-black mb-6">Why Aleo?</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div>
                            <div className="text-4xl font-black text-aleo-green-dark mb-2">0</div>
                            <div className="text-sm font-bold text-black uppercase tracking-wider">Knowledge<br />Revealed</div>
                        </div>
                        <div>
                            <div className="text-4xl font-black text-black mb-2">&lt;1s</div>
                            <div className="text-sm font-bold text-black uppercase tracking-wider">Proof<br />Generation</div>
                        </div>
                        <div>
                            <div className="text-4xl font-black text-black mb-2">100%</div>
                            <div className="text-sm font-bold text-black uppercase tracking-wider">Browser<br />Native</div>
                        </div>
                    </div>
                </Card>
            </motion.div>

        </div>
    );
}
