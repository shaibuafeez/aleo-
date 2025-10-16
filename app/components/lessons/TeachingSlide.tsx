'use client';

import { useState } from 'react';
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-sui-mist via-white to-sui-sky flex items-start justify-center p-8 pt-8">
      <div className="max-w-4xl w-full">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-sui-gray-600">
              Slide {currentSlideIndex + 1} of {slides.length}
            </span>
            <div className="flex gap-1.5">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    index === currentSlideIndex
                      ? 'w-8 bg-sui-ocean'
                      : index < currentSlideIndex
                      ? 'w-2 bg-sui-ocean/50'
                      : 'w-2 bg-sui-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="h-1 bg-sui-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-sui-ocean to-sui-ocean-dark"
              initial={{ width: '0%' }}
              animate={{ width: `${((currentSlideIndex + 1) / slides.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Slide Content */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlideIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="bg-white rounded-3xl shadow-xl p-12 border-2 border-sui-gray-200"
          >
            {/* Emoji Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-sui-sky to-sui-ocean/20 rounded-3xl flex items-center justify-center text-6xl"
            >
              {currentSlide.emoji}
            </motion.div>

            {/* Title */}
            <h2 className="text-4xl font-black text-sui-navy text-center mb-6">
              {currentSlide.title}
            </h2>

            {/* Content */}
            <div className="text-lg text-sui-gray-700 leading-relaxed text-center mb-8 max-w-2xl mx-auto">
              {currentSlide.content}
            </div>

            {/* Interactive Element */}
            {currentSlide.interactiveElement && (
              <div className="mt-8 mb-8">
                {renderInteractiveElement()}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={goToPreviousSlide}
            disabled={isFirstSlide}
            className={`px-6 py-3 rounded-2xl font-semibold transition-all ${
              isFirstSlide
                ? 'bg-sui-gray-200 text-sui-gray-400 cursor-not-allowed'
                : 'bg-white text-sui-navy border-2 border-sui-gray-300 hover:border-sui-ocean hover:text-sui-ocean'
            }`}
          >
            ← Previous
          </button>

          <button
            onClick={goToNextSlide}
            className="px-8 py-4 bg-gradient-to-r from-sui-ocean to-sui-ocean-dark text-white rounded-2xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            {isLastSlide ? (
              <span className="flex items-center gap-2">
                {transitionMessage} 🎯
              </span>
            ) : (
              'Next →'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
