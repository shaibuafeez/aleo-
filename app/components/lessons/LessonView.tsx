"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { LessonContent, WeaknessTopic } from '@/app/types/lesson';
import { useGameStore } from '@/app/lib/store/gameStore';
import TeachingSlide from './TeachingSlide';
import QuizComponent from './QuizComponent';
import LeoEditor from '../editor/LeoEditor';
import XPProgress from '../gamification/XPProgress';
import Confetti from '../gamification/Confetti';

import { compileLeoCode } from '@/app/lib/compiler/leoCompiler';
import ExerciseRenderer from '../exercises/ExerciseRenderer';
import { getExerciseById } from '@/app/data/exercises';
import { ValidationResult, ExerciseFeedback } from '@/app/types/exercises';
import LessonSidebar from './LessonSidebar';
import LessonLayout from './LessonLayout';

interface LessonViewProps {
  lesson: LessonContent;
}

type Phase = 'intro' | 'teaching' | 'exercise' | 'quiz' | 'practice';

export default function LessonView({ lesson }: LessonViewProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [completedSections, setCompletedSections] = useState<number[]>([]);
  const [code, setCode] = useState(lesson.starterCode);
  const [output, setOutput] = useState<string>('');
  const [showHints, setShowHints] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [weaknesses, setWeaknesses] = useState<WeaknessTopic[]>([]);
  const [practiceHints, setPracticeHints] = useState<string[]>([]);

  const { completeLesson } = useGameStore();

  const usingSections = !!lesson.teachingSections;
  const sections = lesson.teachingSections || [];
  const totalSections = sections.length;

  // Mark section as complete when moving away from it
  useEffect(() => {
    if (phase === 'teaching' || phase === 'exercise') {
      if (!completedSections.includes(currentSectionIndex)) {
        // We don't mark as complete here, only when proceeding
      }
    }
  }, [phase, currentSectionIndex]);

  const handleTeachingComplete = () => {
    if (usingSections) {
      const currentSection = sections[currentSectionIndex];
      // Mark current as complete
      if (!completedSections.includes(currentSectionIndex)) {
        setCompletedSections(prev => [...prev, currentSectionIndex]);
      }

      if (currentSection.exerciseId) {
        setPhase('exercise');
      } else {
        if (currentSectionIndex < totalSections - 1) {
          setCurrentSectionIndex(currentSectionIndex + 1);
          setPhase('teaching');
        } else {
          setPhase('quiz');
        }
      }
    } else {
      setPhase('quiz');
    }
  };

  const handleExerciseComplete = (result: ValidationResult, feedback: ExerciseFeedback) => {
    if (currentSectionIndex < totalSections - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      setPhase('teaching');
    } else {
      setPhase('quiz');
    }
  };

  const handleQuizComplete = (quizWeaknesses: WeaknessTopic[], quizHints: string[]) => {
    setWeaknesses(quizWeaknesses);
    setPracticeHints(quizHints);
    setPhase('practice');
  };

  const handleRunCode = async (code: string) => {
    setOutput('⏳ Loading Leo compiler...\n');

    try {
      // Compile using browser-based WASM
      const result = await compileLeoCode(code, lesson.id.replace(/-/g, '_'));

      if (result.success) {
        let successOutput = '✅ Compilation successful!\n\n';
        successOutput += '🌐 Compiled in your browser using WebAssembly\n\n';

        if (result.output) {
          successOutput += '📋 Output:\n' + result.output + '\n\n';
        }

        if (result.program) {
          successOutput += '📦 Compiled Program:\n' + result.program.substring(0, 500);
          if (result.program.length > 500) {
            successOutput += '...\n';
          }
        }

        setOutput(successOutput);

        // Complete lesson on successful compilation in practice phase
        if (phase === 'practice') {
          await completeLesson(lesson.id, lesson.xpReward);
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
        }
      } else {
        let errorOutput = '❌ Compilation failed!\n\n';

        if (result.errors) {
          errorOutput += '🔍 Errors:\n' + result.errors + '\n';
        }

        if (result.output) {
          errorOutput += '\n📋 Output:\n' + result.output;
        }

        setOutput(errorOutput);
      }
    } catch (error: any) {
      console.error('Compilation error:', error);
      setOutput(`❌ Error: ${error.message || 'Failed to compile code'}\n\n💡 Make sure your browser supports WebAssembly.\nThe Leo compiler runs entirely in your browser.`);
    }
  };

  // Render different content based on phase
  const renderContent = () => {
    if (phase === 'intro') {
      return (
        <div className="relative min-h-screen bg-[#FAFAFA] text-zinc-900 flex flex-col items-center">

          {/* Back Link - Absolute Top Left (relative to container) */}
          <div className="absolute top-32 left-8 md:left-12 lg:left-20">
            <Link
              href="/lessons"
              className="text-xs font-bold text-gray-400 hover:text-black uppercase tracking-[0.2em] flex items-center gap-2 transition-colors"
            >
              ← Curriculum
            </Link>
          </div>

          {/* Main Content Centered */}
          <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto px-6 w-full mt-20 md:mt-0">

            {/* Metadata Pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-4 bg-white border border-gray-100 rounded-full px-5 py-2.5 shadow-sm mb-12"
            >
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${lesson.difficulty === 'beginner' ? 'bg-aleo-green' : 'bg-blue-500'}`} />
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">{lesson.difficulty}</span>
              </div>
              <div className="w-px h-3 bg-gray-200" />
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">+{lesson.xpReward} XP</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-9xl font-black tracking-tighter mb-8 text-center leading-[0.9]"
            >
              <span className="text-black">.</span> {lesson.title.split('-')[0].trim()}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-400 font-medium max-w-2xl text-center leading-relaxed mb-12"
            >
              {lesson.description}
            </motion.p>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPhase('teaching')}
              className="group relative px-10 py-4 bg-black text-white rounded-full font-bold text-lg shadow-xl shadow-black/10 flex items-center gap-3 overflow-hidden"
            >
              <span className="relative z-10">Start Lesson</span>
              <span className="relative z-10 group-hover:translate-x-1 transition-transform">→</span>
            </motion.button>
          </div>

          {/* Footer / Syllabus Preview */}
          <div className="w-full max-w-5xl mx-auto px-6 pb-12 opacity-50">
            <div className="h-px bg-gray-200 w-full mb-8" />
            <span className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">Lesson Syllabus</span>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Simple preview of syllabus */}
              {usingSections && sections.slice(0, 4).map((sec, i) => (
                <div key={i} className="text-sm text-gray-300 font-medium">0{i + 1} {sec.sectionTitle}</div>
              ))}
            </div>
          </div>

        </div>
      );
    }

    if (phase === 'teaching') {
      const slidesToShow = usingSections ? sections[currentSectionIndex].slides : (lesson.teachingSlides || []);
      return (
        <div className="p-0">
          <TeachingSlide
            slides={slidesToShow}
            onComplete={handleTeachingComplete}
            lessonTitle={lesson.title}
            transitionMessage={usingSections && sections[currentSectionIndex].exerciseId ? "Great! Now let's practice..." : lesson.narrative.quizTransition}
          />
        </div>
      );
    }

    if (phase === 'exercise') {
      const currentSection = sections[currentSectionIndex];
      const exercise = currentSection.exerciseId ? getExerciseById(currentSection.exerciseId) : null;
      if (!exercise) return <div>Exercise not found</div>;

      return (
        <div className="p-8">
          <ExerciseRenderer exercise={exercise} onComplete={handleExerciseComplete} />
        </div>
      );
    }

    if (phase === 'quiz') {
      return (
        <div className="p-8">
          <QuizComponent
            questions={lesson.quiz}
            passThreshold={lesson.quizPassThreshold}
            onComplete={handleQuizComplete}
            transitionMessage={lesson.narrative.practiceTransition}
          />
        </div>
      );
    }

    if (phase === 'practice') {
      return (
        <div className="p-8">
          <Confetti show={showConfetti} />
          <div className="mb-6 p-5 bg-aleo-green/10 border border-aleo-green/20 rounded-2xl">
            <h2 className="text-xl font-bold text-aleo-green-dark flex items-center gap-2">
              <span className="text-2xl">✅</span>
              Mission Accomplished
            </h2>
            <p className="text-gray-600 mt-2">You have completed the required modules. Use the editor to experiment freely.</p>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-black uppercase tracking-wider text-sm">Feedback & Hints</h3>
            {practiceHints.map((hint, i) => (
              <div key={i} className="p-4 bg-orange-50 border border-orange-100 rounded-xl text-orange-800 text-sm">
                💡 {hint}
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  // Intro, Teaching, and Quiz phases should be full-screen without sidebar/editor
  // Only Exercise and Practice phases need the code editor
  if (phase === 'intro' || phase === 'teaching' || phase === 'quiz') {
    return (
      <div className="min-h-screen bg-[#FAFAFA] text-zinc-900">
        {renderContent()}

      </div>
    );
  }

  // Check if current exercise needs code editor
  const currentSection = sections[currentSectionIndex];
  const exercise = currentSection?.exerciseId ? getExerciseById(currentSection.exerciseId) : null;
  const exerciseNeedsEditor = exercise && (exercise.type === 'code_completion' || exercise.type === 'bug_fix');

  // If exercise phase but exercise doesn't need editor, render without sidebar/editor
  if (phase === 'exercise' && !exerciseNeedsEditor) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] text-zinc-900">
        {renderContent()}
      </div>
    );
  }

  // Exercise and Practice phases use the 3-column layout with editor
  return (
    <LessonLayout
      sidebar={
        <LessonSidebar
          lesson={lesson}
          currentSectionIndex={currentSectionIndex}
          completedSections={completedSections}
          phase={phase}
        />
      }
      editorPanel={
        <div className="flex flex-col h-full">
          {/* Editor Header */}
          <div className="h-10 bg-gray-50 border-b border-gray-100 flex items-center justify-between px-4">
            <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
              <span className="w-2 h-2 rounded-full bg-gray-300"></span>
              main.leo
            </div>
          </div>

          {/* Editor */}
          <div className="flex-1 relative">
            <LeoEditor
              defaultValue={code}
              onChange={setCode}
              onRun={() => handleRunCode(code)}
              height="100%"
            />
          </div>

          {/* Terminal / Output */}
          <div className="h-1/3 border-t-2 border-gray-100 bg-gray-50 flex flex-col">
            <div className="px-4 py-2 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-widest flex justify-between">
              <span>Terminal Output</span>
              <span className="text-green-600">● Live</span>
            </div>
            <pre className="flex-1 p-4 font-mono text-xs text-gray-600 overflow-y-auto whitespace-pre-wrap">
              {output || "// Output will appear here..."}
            </pre>
          </div>
        </div>
      }
    >
      {renderContent()}

    </LessonLayout>
  );
}
