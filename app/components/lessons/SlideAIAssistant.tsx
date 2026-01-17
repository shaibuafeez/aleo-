'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMultimodalLive } from '@/app/hooks/useMultimodalLive';
import { TeachingSlide } from '@/app/types/lesson';
import { capturePageContext, formatContextForAI } from '@/app/lib/ai/pageContext';

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
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [pageContext, setPageContext] = useState<string>('');

  const { connect, disconnect, isConnected, isSpeaking, volume } = useMultimodalLive({
    context: pageContext,
  });

  const handleToggleVoice = () => {
    if (isVoiceActive) {
      disconnect();
      setIsVoiceActive(false);
    } else {
      // Capture LIVE page context when button is clicked (like X Grok)
      console.log('[AI] Capturing live page context...');

      try {
        const context = capturePageContext();
        const formattedContext = formatContextForAI(context);
        setPageContext(formattedContext);

        console.log('[AI] Page context captured:', {
          url: context.currentUrl,
          codeBlocks: context.codeBlocks.length,
          textLength: context.visibleText.length,
          metadata: context.metadata
        });
      } catch (error) {
        console.error('[AI] Error capturing page context:', error);
        // Use fallback minimal context
        setPageContext('You are an expert Move programming tutor helping a student.');
      }

      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) {
        alert('Gemini API key not configured. Please set NEXT_PUBLIC_GEMINI_API_KEY in your .env file.');
        return;
      }

      // Connect with fresh context
      setTimeout(() => {
        connect(apiKey);
        setIsVoiceActive(true);
      }, 100);
    }
  };

  // Cleanup on unmount or slide change
  useEffect(() => {
    return () => {
      if (isVoiceActive) {
        disconnect();
        setIsVoiceActive(false);
      }
    };
  }, [slideIndex]); // Reset when slide changes

  return (
    <>
      {/* Voice Button - Direct Activation */}
      <motion.button
        onClick={handleToggleVoice}
        className={`group relative flex items-center gap-2.5 px-4 py-2.5 backdrop-blur-md border rounded-full shadow-sm transition-all ${
          isVoiceActive
            ? 'bg-red-50/80 border-red-200/50 hover:bg-red-100/80 hover:border-red-300'
            : 'bg-white/80 border-zinc-200/50 hover:shadow-xl hover:border-zinc-300'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
          isVoiceActive ? 'bg-red-100 text-red-600' : 'bg-indigo-50 text-indigo-600'
        }`}>
          {isVoiceActive ? (
            isSpeaking ? (
              <span className="text-lg">🗣️</span>
            ) : (
              <motion.svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </motion.svg>
            )
          ) : (
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          )}
        </div>
        <span className={`text-sm font-semibold ${
          isVoiceActive ? 'text-red-700' : 'text-zinc-700 group-hover:text-zinc-900'
        }`}>
          {isVoiceActive ? (isSpeaking ? 'Speaking...' : 'Listening...') : 'AI Tutor'}
        </span>
        {!isVoiceActive && (
          <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </motion.button>

      {/* Floating Indicator - Only when active */}
      <AnimatePresence>
        {isVoiceActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="fixed top-24 right-6 z-[60] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl ring-1 ring-zinc-900/5 p-4 max-w-xs"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <motion.div
                  animate={{ scale: isSpeaking ? [1, 1.15, 1] : 1 + Math.max(0, volume) * 2 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -inset-2 bg-indigo-400/20 rounded-full blur-md"
                />
                <div className="relative w-12 h-12 bg-white rounded-full border-2 border-indigo-100 shadow-lg flex items-center justify-center">
                  <span className="text-xl">
                    {isSpeaking ? '🗣️' : '👂'}
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-zinc-900">
                  {isSpeaking ? 'AI is speaking' : 'Listening...'}
                </p>
                <p className="text-xs text-zinc-500">
                  {isSpeaking ? 'Please wait' : 'Ask your question'}
                </p>
              </div>
              <button
                onClick={handleToggleVoice}
                className="w-8 h-8 rounded-full bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
