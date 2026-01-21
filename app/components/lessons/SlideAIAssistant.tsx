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
      {/* Fixed Floating Trigger - Premium Glassmorphism */}
      <motion.div
        className="fixed bottom-8 right-8 z-[100]"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <motion.button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 pl-2 pr-6 py-2 bg-white/90 backdrop-blur-2xl border border-white/50 rounded-full shadow-2xl shadow-aleo-green/20 hover:shadow-aleo-green/40 hover:scale-[1.02] transition-all duration-300"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.96 }}
        >
          {/* Icon Container */}
          <div className="relative w-12 h-12 flex items-center justify-center">
            {/* Animated Rings */}
            <div className="absolute inset-0 bg-aleo-green/20 rounded-2xl blur-lg animate-pulse" />
            <div className={`absolute inset-0 rounded-2xl border-2 border-white/30 ${isVoiceActive ? 'animate-ping' : ''}`} />

            {/* AI Icon - Minimalist Sparkles */}
            <div className="relative z-10 w-6 h-6">
              <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.89435 4.54848C10.6698 2.723 13.1258 2.723 13.9013 4.54848L15.3414 7.93886C15.6521 8.67039 16.2252 9.24354 16.9567 9.55419L20.3471 10.9943C22.1726 11.7698 22.1726 14.2258 20.3471 15.0013L16.9567 16.4414C16.2252 16.7521 15.6521 17.3252 15.3414 18.0567L13.9013 21.4471C13.1258 23.2726 10.6698 23.2726 9.89435 21.4471L8.45422 18.0567C8.14357 17.3252 7.57043 16.7521 6.8389 16.4414L3.44852 15.0013C1.62304 14.2258 1.62304 11.7698 3.44852 10.9943L6.8389 9.55419C7.57043 9.24354 8.14357 8.67039 8.45422 7.93886L9.89435 4.54848Z" fill="url(#ai-gradient)" stroke="black" strokeWidth="1.5" />
                <path d="M19 2L19.5 3.5L21 4L19.5 4.5L19 6L18.5 4.5L17 4L18.5 3.5L19 2Z" fill="black" />
                <defs>
                  <linearGradient id="ai-gradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00FF99" />
                    <stop offset="1" stopColor="#00F0FF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          <div className="flex flex-col items-start">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 group-hover:text-aleo-green-dark transition-colors">
              Help
            </span>
            <span className="text-sm font-black text-zinc-900 leading-none">
              AI Tutor
            </span>
          </div>

          {/* Glow Effect */}
          <div className="absolute inset-0 rounded-full ring-2 ring-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.button>
      </motion.div>

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
            <div className="absolute inset-0 bg-zinc-900/60 backdrop-blur-md transition-all" />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm bg-white rounded-[2rem] shadow-2xl p-8 flex flex-col items-center overflow-hidden"
            >
              {/* Decorative Background Blob */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-aleo-green/20 rounded-full blur-3xl opacity-50" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl opacity-50" />

              {/* Close Button */}
              <button
                onClick={() => {
                  if (isVoiceActive) disconnect(), setIsVoiceActive(false);
                  setIsOpen(false);
                }}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-zinc-50 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 transition-colors z-20"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {!isVoiceActive ? (
                // Inactive State: Clean, friendly invitation
                <div className="flex flex-col items-center relative z-10 w-full">
                  <div className="w-32 h-32 mb-6 flex items-center justify-center hover:scale-110 transition-transform duration-500 bg-white rounded-full shadow-lg border border-zinc-100 p-8">
                    <div className="w-full h-full">
                      <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.89435 4.54848C10.6698 2.723 13.1258 2.723 13.9013 4.54848L15.3414 7.93886C15.6521 8.67039 16.2252 9.24354 16.9567 9.55419L20.3471 10.9943C22.1726 11.7698 22.1726 14.2258 20.3471 15.0013L16.9567 16.4414C16.2252 16.7521 15.6521 17.3252 15.3414 18.0567L13.9013 21.4471C13.1258 23.2726 10.6698 23.2726 9.89435 21.4471L8.45422 18.0567C8.14357 17.3252 7.57043 16.7521 6.8389 16.4414L3.44852 15.0013C1.62304 14.2258 1.62304 11.7698 3.44852 10.9943L6.8389 9.55419C7.57043 9.24354 8.14357 8.67039 8.45422 7.93886L9.89435 4.54848Z" fill="url(#ai-gradient-modal)" stroke="black" strokeWidth="1.5" />
                        <path d="M19 2L19.5 3.5L21 4L19.5 4.5L19 6L18.5 4.5L17 4L18.5 3.5L19 2Z" fill="black" />
                        <defs>
                          <linearGradient id="ai-gradient-modal" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#00FF99" />
                            <stop offset="1" stopColor="#00F0FF" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>

                  <h3 className="text-3xl font-black text-zinc-900 mb-2 tracking-tighter text-center">
                    Hey, I'm Lydia!
                  </h3>
                  <p className="text-center text-zinc-500 mb-8 leading-relaxed text-sm font-medium">
                    I'm your personal AI tutor. Ask me anything about <br /> <strong className="text-zinc-900">{slide.title}</strong>!
                  </p>

                  <button
                    onClick={handleToggleVoice}
                    className="w-full py-4 bg-black text-white rounded-2xl font-bold text-lg hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-900/20 active:scale-95 flex items-center justify-center gap-3 group"
                  >
                    <span>Start Voice Chat</span>
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      </svg>
                    </div>
                  </button>
                </div>
              ) : (
                // Active State: Ultra-minimal voice visualization
                <div className="flex flex-col items-center py-4 w-full relative z-10">
                  {/* Breathing Orb */}
                  <div className="relative w-48 h-48 flex items-center justify-center mb-8">
                    {/* Outer Glow */}
                    <motion.div
                      animate={{
                        scale: isSpeaking ? [1, 1.2, 1] : 1.05,
                        opacity: isSpeaking ? 0.4 : 0.1
                      }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 bg-aleo-green rounded-full blur-3xl"
                    />

                    {/* Core Circle */}
                    <motion.div
                      animate={{ scale: isSpeaking ? [1, 1.05, 1] : 1 }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="w-32 h-32 bg-gradient-to-br from-aleo-green to-aleo-green-dark rounded-full shadow-2xl flex items-center justify-center relative z-10 border-4 border-white/20 backdrop-blur-sm"
                    >
                      <div className="w-1.5 h-10 bg-black/40 rounded-full mx-1.5" />
                      <motion.div
                        animate={{ height: Math.max(10, volume * 50) }}
                        className="w-1.5 bg-black rounded-full mx-1.5"
                      />
                      <div className="w-1.5 h-10 bg-black/40 rounded-full mx-1.5" />
                    </motion.div>
                  </div>

                  <p className="text-zinc-900 font-bold text-xl mb-1 tracking-tight">
                    {isSpeaking ? 'Listening...' : 'Thinking...'}
                  </p>
                  <p className="text-zinc-400 text-sm font-medium">Lydia is analyzing the lesson</p>

                  <button
                    onClick={handleToggleVoice}
                    className="mt-10 text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 px-6 py-3 rounded-full text-sm font-bold transition-colors flex items-center gap-2"
                  >
                    <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
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
