'use client';

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import Hero from "./components/Hero";
import Testimonials from "./components/Testimonials";
import Link from "next/link";
import { Card } from "@/app/components/ui/Card";
import ConnectWallet from "@/app/components/ConnectWallet";
import InteractiveFeatureGrid from "@/app/components/features/InteractiveFeatureGrid";
import TimelineSection from "@/app/components/TimelineSection";
import TestimonialsSection from "@/app/components/TestimonialsSection";
import Footer from "@/app/components/Footer";
import { Badge } from "./components/ui/Badge";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth spring physics for scroll animations
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Parallax effects
  const featuresScale = useTransform(smoothProgress, [0.1, 0.4], [0.95, 1]);
  const stepsScale = useTransform(smoothProgress, [0.5, 0.8], [0.8, 1]);

  return (
    <div ref={containerRef} className="min-h-screen bg-aleo-black text-white selection:bg-aleo-green selection:text-black">
      {/* Hero Section */}
      <Hero />

      {/* Spacer */}
      <div className="h-20" />

      {/* Features Section - Modern Bento Grid */}
      <motion.section
        id="features"
        style={{ scale: featuresScale }}
        className="py-24 px-6 relative z-20 bg-[#FAFAFA] text-black"
      >
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-multiply skew-y-3 transform origin-top-left -z-10" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <Badge variant="default" className="text-sm px-4 py-1.5">
                Features
              </Badge>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold font-sans mb-6 text-black">
              Everything You Need to <span className="text-aleo-green-dark">Master Leo</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Learn Aleo's Leo language with interactive lessons, instant compilation, and hands-on zero-knowledge projects.
            </p>
          </motion.div>

          {/* Interactive Feature Grid 2.0 */}
          <InteractiveFeatureGrid />
        </div>
      </motion.section>

      {/* How It Works - Vertical Sticky Terminal */}
      <TimelineSection />

      {/* Testimonials & Community */}

      {/* Testimonials & Community */}
      <TestimonialsSection />

      {/* Footer */}
      <Footer />
    </div >
  );
}
