'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TeachingSlide as TeachingSlideType } from '@/app/types/lesson';
import DragDropInteractive from './interactive/DragDropInteractive';
import ClickRevealInteractive from './interactive/ClickRevealInteractive';
import CodeHighlightInteractive from './interactive/CodeHighlightInteractive';

interface TeachingSlideProps {
  slides: TeachingSlideType[];
  onComplete: () => void;
  transitionMessage: string;
}

export default function TeachingSlide({ slides, onComplete, transitionMessage }: TeachingSlideProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const currentSlide = slides[currentSlideIndex];
  const isLastSlide = currentSlideIndex === slides.length - 1;
  const isFirstSlide = currentSlideIndex === 0;

  const goToNextSlide = () => {
    if (isLastSlide) {
      onComplete();
    } else {
      setDirection(1);
      setCurrentSlideIndex((prev) => prev + 1);
    }
  };

  const goToPreviousSlide = () => {
    if (!isFirstSlide) {
      setDirection(-1);
      setCurrentSlideIndex((prev) => prev - 1);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const renderInteractiveElement = () => {
    if (!currentSlide.interactiveElement) return null;

    switch (currentSlide.interactiveElement.type) {
      case 'drag-drop':
        return <DragDropInteractive config={currentSlide.interactiveElement.config} />;
      case 'click-reveal':
        return <ClickRevealInteractive config={currentSlide.interactiveElement.config} />;
      case 'code-highlight':
        return <CodeHighlightInteractive config={currentSlide.interactiveElement.config} />;
      default:
        return null;
    }
  };

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goToNextSlide();
      if (e.key === 'ArrowLeft') goToPreviousSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex]);

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-zinc-900 flex flex-col">
      {/* Top Progress Stories */}
      <div className="fixed top-0 left-0 right-0 z-50 flex gap-2 px-4 py-4 bg-[#FDFDFD]">
        {slides.map((_, index) => (
          <div
            key={index}
            className="h-1.5 flex-1 rounded-full bg-zinc-100 overflow-hidden"
          >
            <motion.div
              className="h-full bg-zinc-900"
              initial={{ width: "0%" }}
              animate={{
                width: index < currentSlideIndex ? "100%" : index === currentSlideIndex ? "100%" : "0%"
              }}
              transition={{ duration: index === currentSlideIndex ? 20 : 0.3 }} // Subtle timer effect for current slide? changing back to simple fill for now
              style={{ width: index <= currentSlideIndex ? "100%" : "0%" }}
            />
          </div>
        ))}
      </div>

      <div className="flex-1 max-w-[1600px] mx-auto w-full pt-12">
        <div className="flex flex-col lg:flex-row h-[calc(100vh-48px)]">

          {/* LEFT: Narrative */}
          <div className="w-full lg:w-[40%] p-8 lg:p-16 overflow-y-auto flex flex-col justify-center relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlideIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Emoji */}
                <div className="text-6xl mb-8">{currentSlide.emoji}</div>

                {/* Title */}
                <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-8 text-zinc-900">
                  {currentSlide.title}
                </h2>

                {/* Content */}
                <div className="text-xl md:text-2xl font-medium text-zinc-500 leading-relaxed mb-12">
                  {currentSlide.content}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center gap-4 mt-auto pt-8">
              <button
                onClick={goToPreviousSlide}
                disabled={isFirstSlide}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isFirstSlide ? 'text-zinc-300' : 'text-zinc-900 hover:bg-zinc-100'
                  }`}
              >
                ←
              </button>
              <button
                onClick={goToNextSlide}
                className="flex-1 bg-zinc-900 text-white h-14 rounded-2xl font-bold text-lg hover:bg-zinc-800 transition-transform active:scale-95 flex items-center justify-center gap-2"
              >
                {isLastSlide ? (
                  <>Complete <span className="text-xl">🎉</span></>
                ) : (
                  'Continue'
                )}
              </button>
            </div>
          </div>

          {/* RIGHT: Interactive Playground */}
          <div className="w-full lg:w-[60%] bg-zinc-50 border-l border-zinc-200 relative overflow-hidden flex items-center justify-center p-8 lg:p-12">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="relative w-full max-w-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlideIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  {currentSlide.interactiveElement ? (
                    <div className="bg-white rounded-3xl shadow-2xl shadow-zinc-200/50 border border-zinc-200 overflow-hidden min-h-[400px] flex items-center justify-center">
                      {renderInteractiveElement()}
                    </div>
                  ) : (
                    <div className="bg-white rounded-3xl p-12 text-center border border-zinc-200 shadow-sm">
                      <div className="text-8xl mb-6 opacity-20 filter blur-sm">✨</div>
                      <p className="text-zinc-400 font-medium">Concept Slide</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
