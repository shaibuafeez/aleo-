'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ClickRevealConfig {
  reveals?: { label: string; content: string }[];
}

interface ClickRevealInteractiveProps {
  config: ClickRevealConfig;
}

export default function ClickRevealInteractive({ config }: ClickRevealInteractiveProps) {
  const { reveals = [] } = config;
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());

  const toggleReveal = (index: number) => {
    setRevealedIndices((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-4">
      <p className="text-center text-sui-gray-600 font-medium mb-6">
        Click each box to reveal what it does! 🔍
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {reveals.map((reveal, index) => {
          const isRevealed = revealedIndices.has(index);
          return (
            <motion.button
              key={index}
              onClick={() => toggleReveal(index)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative overflow-hidden rounded-2xl border-2 border-sui-ocean bg-white shadow-md hover:shadow-lg transition-shadow"
            >
              {/* Front (Label) */}
              <div className={`p-6 transition-opacity ${isRevealed ? 'opacity-0' : 'opacity-100'}`}>
                <div className="text-2xl font-black text-sui-navy">{reveal.label}</div>
                <div className="mt-2 text-sm text-sui-gray-500">Click to reveal</div>
              </div>

              {/* Back (Content) */}
              <AnimatePresence>
                {isRevealed && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-gradient-to-br from-sui-ocean to-sui-ocean-dark p-6 flex items-center justify-center"
                  >
                    <p className="text-white font-semibold text-center leading-relaxed">
                      {reveal.content}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      {/* Progress indicator */}
      {revealedIndices.size > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm text-sui-gray-600 mt-4"
        >
          {revealedIndices.size === reveals.length ? (
            <span className="text-sui-ocean font-bold">🎉 You&apos;ve discovered them all!</span>
          ) : (
            <span>
              Discovered: {revealedIndices.size}/{reveals.length}
            </span>
          )}
        </motion.div>
      )}
    </div>
  );
}
