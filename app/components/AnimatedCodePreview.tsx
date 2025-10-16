'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const codeExamples = [
  {
    title: 'nft.move',
    code: `module 0x0::nft {
  use sui::object::UID;

  public struct NFT has key {
    id: UID,
    name: String,
  }
}`,
  },
  {
    title: 'coin.move',
    code: `module 0x0::coin {
  use sui::coin::{Self, Coin};
  use sui::sui::SUI;

  public entry fun transfer(
    coin: Coin<SUI>,
    amount: u64,
    recipient: address
  ) {
    coin::transfer(coin, amount, recipient);
  }
}`,
  },
  {
    title: 'marketplace.move',
    code: `module 0x0::marketplace {
  use sui::transfer;

  public struct Listing has key {
    id: UID,
    price: u64,
    seller: address,
  }

  public entry fun create_listing(
    price: u64,
    ctx: &mut TxContext
  ) {
    // Create listing logic
  }
}`,
  },
  {
    title: 'game.move',
    code: `module 0x0::game {
  use sui::object::UID;

  public struct Hero has key {
    id: UID,
    level: u64,
    experience: u64,
  }

  public fun level_up(hero: &mut Hero) {
    hero.level = hero.level + 1;
  }
}`,
  },
  {
    title: 'defi.move',
    code: `module 0x0::defi {
  use sui::balance::Balance;
  use sui::coin::Coin;

  public struct Pool has key {
    id: UID,
    balance_a: Balance<TokenA>,
    balance_b: Balance<TokenB>,
  }

  public fun swap(pool: &mut Pool) {
    // Swap logic
  }
}`,
  },
];

export default function AnimatedCodePreview() {
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  const [displayedCode, setDisplayedCode] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentExample = codeExamples[currentExampleIndex];
  const fullCode = currentExample.code;

  useEffect(() => {
    // Typing effect
    if (currentIndex < fullCode.length && !isTransitioning) {
      const timeout = setTimeout(() => {
        setDisplayedCode(fullCode.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 20); // 20ms per character for faster typing

      return () => clearTimeout(timeout);
    } else if (currentIndex >= fullCode.length && !isTransitioning) {
      // When done typing, wait 3 seconds then transition to next example
      const waitTimeout = setTimeout(() => {
        setIsTransitioning(true);

        // Fade out and transition to next code
        setTimeout(() => {
          const nextIndex = (currentExampleIndex + 1) % codeExamples.length;
          setCurrentExampleIndex(nextIndex);
          setDisplayedCode('');
          setCurrentIndex(0);
          setIsTransitioning(false);
        }, 500); // Fade out duration
      }, 3000); // Wait 3 seconds before next example

      return () => clearTimeout(waitTimeout);
    }
  }, [currentIndex, fullCode, isTransitioning, currentExampleIndex]);

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  const lines = displayedCode.split('\n');
  const isTypingComplete = currentIndex >= fullCode.length;

  const renderCodeWithSyntax = (text: string) => {
    // Preserve leading whitespace
    const leadingSpaces = text.match(/^\s*/)?.[0] || '';
    const trimmedText = text.trimStart();

    // Comments
    if (trimmedText.startsWith('//')) {
      return <span className="text-sui-gray-500">{text}</span>;
    }

    // Module keyword
    if (trimmedText.startsWith('module')) {
      return (
        <>
          {leadingSpaces}
          <span className="text-purple-400">module</span>
          <span className="text-sui-sky">{trimmedText.replace('module', '')}</span>
        </>
      );
    }

    // Use keyword
    if (trimmedText.startsWith('use')) {
      return (
        <>
          {leadingSpaces}
          <span className="text-purple-400">use</span>
          <span className="text-blue-300">{trimmedText.replace('use', '')}</span>
        </>
      );
    }

    // Public entry fun
    if (trimmedText.startsWith('public entry fun') || trimmedText.startsWith('public fun')) {
      const parts = trimmedText.split(/\s+/);
      return (
        <>
          {leadingSpaces}
          <span className="text-purple-400">public</span>
          <span className="text-sui-sky"> </span>
          {parts[1] === 'entry' && (
            <>
              <span className="text-purple-400">entry</span>
              <span className="text-sui-sky"> </span>
            </>
          )}
          <span className="text-purple-400">fun</span>
          <span className="text-yellow-400">{trimmedText.split('fun')[1]}</span>
        </>
      );
    }

    // Public struct
    if (trimmedText.startsWith('public struct')) {
      return (
        <>
          {leadingSpaces}
          <span className="text-purple-400">public</span>
          <span className="text-sui-sky"> </span>
          <span className="text-purple-400">struct</span>
          <span className="text-yellow-400">{trimmedText.replace('public struct', '').split('has')[0]}</span>
          {trimmedText.includes('has') && (
            <>
              <span className="text-purple-400">has</span>
              <span className="text-orange-400">{trimmedText.split('has')[1]}</span>
            </>
          )}
        </>
      );
    }

    // Field definitions (id:, name:, etc.)
    if (trimmedText.includes(':') && !trimmedText.includes('::') && !trimmedText.includes('//')) {
      const [key, value] = trimmedText.split(':');
      return (
        <>
          {leadingSpaces}
          <span className="text-blue-400">{key.trim()}</span>
          <span className="text-sui-sky">: </span>
          <span className="text-green-400">{value}</span>
        </>
      );
    }

    // Empty lines and everything else
    return <span className="text-sui-sky">{text}</span>;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateX: 10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="relative w-full max-w-[95%] sm:max-w-[90%] lg:w-[850px] mx-auto"
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-sui-ocean/20 to-sui-ocean-dark/20 blur-3xl" />

      {/* Code Window */}
      <div className="relative bg-sui-navy rounded-xl lg:rounded-2xl shadow-2xl overflow-hidden border border-sui-gray-700">
        {/* Window Header */}
        <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 lg:px-5 py-2.5 sm:py-3 lg:py-3.5 bg-sui-midnight border-b border-sui-gray-800">
          <div className="flex gap-1 sm:gap-1.5">
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 rounded-full bg-red-500" />
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 rounded-full bg-yellow-500" />
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 rounded-full bg-green-500" />
          </div>
          <AnimatePresence mode="wait">
            <motion.span
              key={currentExample.title}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="text-[10px] sm:text-xs text-sui-gray-400 ml-2 sm:ml-3 font-mono"
            >
              {currentExample.title}
            </motion.span>
          </AnimatePresence>
          {!isTypingComplete && !isTransitioning && (
            <span className="ml-auto text-[10px] sm:text-xs text-sui-gray-500 animate-pulse hidden sm:inline">typing...</span>
          )}
          {isTransitioning && (
            <span className="ml-auto text-[10px] sm:text-xs text-sui-gray-500 hidden sm:inline">switching...</span>
          )}
          {/* Example counter */}
          <span className="ml-auto text-[10px] sm:text-xs text-sui-gray-600">
            {currentExampleIndex + 1}/5
          </span>
        </div>

        {/* Code Content with Typing Effect */}
        <motion.div
          key={currentExampleIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: isTransitioning ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="p-4 sm:p-6 lg:p-8 font-mono text-xs sm:text-sm lg:text-base min-h-[200px] sm:min-h-[240px] lg:min-h-[280px] text-left overflow-x-auto"
        >
          {lines.map((line, index) => (
            <div key={index} className="flex items-start gap-2 sm:gap-3 lg:gap-4 min-h-[1.25rem] sm:min-h-[1.5rem] lg:min-h-[1.75rem]">
              <span className="text-sui-gray-600 select-none w-6 sm:w-8 lg:w-10 text-right flex-shrink-0 text-[10px] sm:text-xs lg:text-base">
                {index + 1}
              </span>
              <code className="flex-1 whitespace-pre text-left block">
                {renderCodeWithSyntax(line)}
                {/* Show cursor at the end of last line */}
                {index === lines.length - 1 && showCursor && !isTransitioning && (
                  <span className="inline-block w-1.5 sm:w-2 h-3 sm:h-4 lg:h-5 bg-sui-ocean ml-0.5 align-middle" />
                )}
              </code>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
