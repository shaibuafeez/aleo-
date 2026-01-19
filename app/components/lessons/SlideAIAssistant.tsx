'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMultimodalLive } from '@/app/hooks/useMultimodalLive';
import { TeachingSlide } from '@/app/types/lesson';

interface SlideAIAssistantProps {
  slide: TeachingSlide;
  lessonTitle: string;
  slideIndex: number;
  totalSlides: number;
}

export default function SlideAIAssistant({
  slide,
  lessonTitle,
  slideIndex,
  totalSlides
}: SlideAIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  // Build context for this specific slide
  const buildSlideContext = () => {
    let context = `You are Lydia, an expert and friendly Move programming tutor.\n\n`;
    context += `Lesson: "${lessonTitle}"\n`;
    context += `Slide: ${slideIndex + 1}/${totalSlides} - "${slide.title}"\n`;
    context += `Content: ${slide.content}\n\n`;

    if (slide.interactiveElement) {
      context += `Interactive: ${slide.interactiveElement.type}\n`;
      if (slide.interactiveElement.config?.code) {
        context += `Code:\n\`\`\`move\n${slide.interactiveElement.config.code}\n\`\`\`\n`;
      }
      if (slide.interactiveElement.config?.explanation) {
        context += `Explanation: ${slide.interactiveElement.config.explanation}\n`;
      }
    }

    context += `\nGuidelines:\n`;
    context += `1. Be concise, encouraging, and clear.\n`;
    context += `2. Focus on the current slide's concept.\n`;
    context += `3. Use the Socratic method when appropriate.\n`;

    return context;
  };

  const { connect, disconnect, isConnected, isSpeaking, volume } = useMultimodalLive({
    context: buildSlideContext(),
  });

  const handleToggleVoice = () => {
    if (isVoiceActive) {
      disconnect();
      setIsVoiceActive(false);
    } else {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) {
        alert('API Key missing');
        return;
      }
      connect(apiKey);
      setIsVoiceActive(true);
    }
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (isVoiceActive) disconnect();
    };
  }, []);

  return (
    <>
      {/* Trigger - Minimalist "Lydia" Pill */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="group relative flex items-center gap-2 pl-3 pr-4 py-2 bg-white/90 backdrop-blur-md border border-sui-gray-200/50 rounded-full shadow-sm hover:shadow-lg hover:border-sui-ocean/30 transition-all"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="relative w-2 h-2">
          <div className={`absolute inset-0 rounded-full animate-pulse ${isVoiceActive ? 'bg-sui-ocean' : 'bg-sui-gray-400'}`} />
          {isVoiceActive && <div className="absolute inset-0 rounded-full bg-sui-ocean animate-ping opacity-50" />}
        </div>
        <span className="text-sm font-semibold text-sui-navy tracking-tight group-hover:text-sui-ocean transition-colors">
          Ask Lydia
        </span>
      </motion.button>

      {/* Minimalist Modal overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={() => {
              if (isVoiceActive) disconnect(), setIsVoiceActive(false);
              setIsOpen(false);
            }}
          >
            {/* Backdrop with blur */}
            <div className="absolute inset-0 bg-white/60 backdrop-blur-xl transition-all" />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center border border-white/50 ring-1 ring-sui-gray-100"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  if (isVoiceActive) disconnect(), setIsVoiceActive(false);
                  setIsOpen(false);
                }}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-sui-gray-50 text-sui-gray-400 hover:bg-sui-gray-100 hover:text-sui-navy transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {!isVoiceActive ? (
                // Inactive State: Clean, friendly invitation
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 mb-6 rounded-full bg-gradient-to-br from-sui-ocean to-sui-navy flex items-center justify-center shadow-lg shadow-sui-ocean/20">
                    <span className="text-3xl text-white font-medium">L</span>
                  </div>

                  <h3 className="text-2xl font-bold text-sui-navy mb-2 tracking-tight">
                    Hi, I'm Lydia
                  </h3>
                  <p className="text-center text-sui-gray-500 mb-8 leading-relaxed text-sm">
                    I can explain this slide or answer specific questions about <br /> <strong className="text-sui-navy font-medium">{slide.title}</strong>.
                  </p>

                  <button
                    onClick={handleToggleVoice}
                    className="w-full py-3.5 bg-sui-navy text-white rounded-xl font-semibold text-base hover:bg-sui-ocean transition-all shadow-lg shadow-sui-navy/10 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                    Start Conversation
                  </button>
                </div>
              ) : (
                // Active State: Ultra-minimal voice visualization
                <div className="flex flex-col items-center py-4 w-full">
                  {/* Breathing Orb */}
                  <div className="relative w-40 h-40 flex items-center justify-center mb-8">
                    {/* Outer Glow */}
                    <motion.div
                      animate={{
                        scale: isSpeaking ? [1, 1.2, 1] : 1.05,
                        opacity: isSpeaking ? 0.3 : 0.1
                      }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 bg-sui-ocean rounded-full blur-2xl"
                    />

                    {/* Core Circle */}
                    <motion.div
                      animate={{ scale: isSpeaking ? [1, 1.05, 1] : 1 }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="w-24 h-24 bg-gradient-to-br from-sui-ocean to-sui-navy rounded-full shadow-2xl flex items-center justify-center relative z-10"
                    >
                      <div className="w-1 h-8 bg-white/20 rounded-full mx-1" />
                      <motion.div
                        animate={{ height: Math.max(8, volume * 40) }}
                        className="w-1 bg-white rounded-full mx-1"
                      />
                      <div className="w-1 h-8 bg-white/20 rounded-full mx-1" />
                    </motion.div>
                  </div>

                  <p className="text-sui-navy font-medium text-lg mb-1 tracking-tight">
                    {isSpeaking ? 'Lydia is speaking' : 'Lydia is listening...'}
                  </p>

                  <button
                    onClick={handleToggleVoice}
                    className="mt-8 text-sui-gray-400 hover:text-red-500 text-sm font-medium transition-colors flex items-center gap-2 px-4 py-2 rounded-full hover:bg-red-50"
                  >
                    <div className="w-2 h-2 rounded-full bg-current" />
                    End Session
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
