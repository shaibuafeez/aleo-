'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { LessonContent, WeaknessTopic } from '@/app/types/lesson';
import { useGameStore } from '@/app/lib/store/gameStore';
import TeachingSlide from './TeachingSlide';
import QuizComponent from './QuizComponent';
import MoveEditor from '../editor/MoveEditor';
import XPProgress from '../gamification/XPProgress';
import Confetti from '../gamification/Confetti';
import PhaseProgress from './PhaseProgress';
import { compileMove } from '@/app/lib/compiler/moveCompiler';
import ExerciseRenderer from '../exercises/ExerciseRenderer';
import { getExerciseById } from '@/app/data/exercises';
import { ValidationResult, ExerciseFeedback } from '@/app/types/exercises';

interface LessonViewProps {
  lesson: LessonContent;
}

type Phase = 'intro' | 'teaching' | 'exercise' | 'quiz' | 'practice';

export default function LessonView({ lesson }: LessonViewProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [code, setCode] = useState(lesson.starterCode);
  const [output, setOutput] = useState<string>('');
  const [showHints, setShowHints] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [weaknesses, setWeaknesses] = useState<WeaknessTopic[]>([]);
  const [practiceHints, setPracticeHints] = useState<string[]>([]);

  const { completeLesson } = useGameStore();

  // Check if lesson uses new section-based structure
  const usingSections = !!lesson.teachingSections;
  const sections = lesson.teachingSections || [];
  const totalSections = sections.length;

  // Phase transitions
  const handleTeachingComplete = () => {
    if (usingSections) {
      const currentSection = sections[currentSectionIndex];

      // Check if this section has an exercise
      if (currentSection.exerciseId) {
        setPhase('exercise');
      } else {
        // No exercise, move to next section or quiz
        if (currentSectionIndex < totalSections - 1) {
          setCurrentSectionIndex(currentSectionIndex + 1);
          setPhase('teaching');
        } else {
          setPhase('quiz');
        }
      }
    } else {
      // Legacy: all teaching done, go to quiz
      setPhase('quiz');
    }
  };

  const handleExerciseComplete = (result: ValidationResult, feedback: ExerciseFeedback) => {
    // Exercise completed, move to next section or quiz
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

  // Practice phase handlers
  const handleRunCode = async (code: string) => {
    setOutput('🚀 Compiling Move code with real compiler...\n');

    try {
      const result = await compileMove(code);
      setOutput(result.output);

      if (result.success) {
        completeLesson(lesson.id, lesson.xpReward);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    } catch (error) {
      setOutput(
        '❌ Compilation error:\n\n' +
        (error instanceof Error ? error.message : 'Unknown error') +
        '\n\nCheck the hints if you need help!'
      );
    }
  };

  const showNextHint = () => {
    if (currentHintIndex < lesson.hints.length - 1) {
      setCurrentHintIndex(currentHintIndex + 1);
    }
  };

  // Render appropriate phase
  if (phase === 'intro') {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-screen bg-gradient-to-br from-sui-mist via-white to-sui-sky"
        >
          {/* Hero Section */}
          <div className="relative pt-32 pb-20 px-6 overflow-hidden">
            {/* Back Button */}
            <div className="max-w-7xl mx-auto mb-8">
              <Link
                href="/lessons"
                className="inline-flex items-center gap-2 text-sui-gray-600 hover:text-sui-ocean transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Lessons
              </Link>
            </div>

            <div className="max-w-4xl mx-auto text-center relative z-10">
              {/* Difficulty Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-block mb-6"
              >
                <span className="px-4 py-2 bg-sui-ocean/10 text-sui-ocean rounded-full text-sm font-semibold border border-sui-ocean/20">
                  {lesson.difficulty}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-sui-navy mb-4 sm:mb-6"
              >
                {lesson.title}
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg md:text-xl text-sui-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto"
              >
                {lesson.description}
              </motion.p>

              {/* Meta Info Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap justify-center gap-4 mb-10 max-w-3xl mx-auto"
              >
                <div className="px-5 py-4 bg-white rounded-xl shadow-md border border-sui-gray-200 hover:border-sui-ocean hover:shadow-lg transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 bg-gradient-to-br from-sui-sky/50 to-sui-ocean/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-sui-ocean" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs text-sui-gray-600 font-medium mb-0.5">Duration</div>
                      <div className="text-lg font-bold text-sui-navy whitespace-nowrap">~20 min</div>
                    </div>
                  </div>
                </div>
                <div className="px-5 py-4 bg-white rounded-xl shadow-md border border-sui-gray-200 hover:border-sui-ocean hover:shadow-lg transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 bg-gradient-to-br from-sui-ocean/20 to-sui-ocean/40 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-sui-ocean" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs text-sui-gray-600 font-medium mb-0.5">XP Reward</div>
                      <div className="text-lg font-bold text-sui-ocean whitespace-nowrap">+{lesson.xpReward}</div>
                    </div>
                  </div>
                </div>
                <div className="px-5 py-4 bg-white rounded-xl shadow-md border border-sui-gray-200 hover:border-sui-ocean hover:shadow-lg transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 bg-gradient-to-br from-sui-sky/50 to-sui-ocean/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-sui-ocean" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs text-sui-gray-600 font-medium mb-0.5">Slides</div>
                      <div className="text-lg font-bold text-sui-navy whitespace-nowrap">
                        {lesson.teachingSections
                          ? lesson.teachingSections.reduce((total, section) => total + section.slides.length, 0)
                          : lesson.teachingSlides?.length || 0}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-5 py-4 bg-white rounded-xl shadow-md border border-sui-gray-200 hover:border-sui-ocean hover:shadow-lg transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 bg-gradient-to-br from-sui-ocean/20 to-sui-ocean/40 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-sui-ocean" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs text-sui-gray-600 font-medium mb-0.5">Quiz</div>
                      <div className="text-lg font-bold text-sui-navy whitespace-nowrap">{lesson.quiz.length} Qs</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Start Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPhase('teaching')}
                className="px-12 py-5 bg-gradient-to-r from-sui-ocean to-sui-ocean-dark text-white rounded-full hover:shadow-2xl hover:shadow-sui-ocean/40 transition-all font-bold text-xl"
              >
                Start Lesson →
              </motion.button>
            </div>
          </div>

          {/* What You'll Learn Section */}
          <div className="px-6 pb-20">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-sui-gray-200"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-sui-ocean to-sui-ocean-dark rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-sui-navy">What You&apos;ll Learn</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {(lesson.teachingSections
                    ? lesson.teachingSections.flatMap(section => section.slides)
                    : lesson.teachingSlides || []
                  ).slice(0, 6).map((slide, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                      className="flex items-start gap-3 p-4 rounded-2xl bg-gradient-to-br from-sui-sky/20 to-sui-ocean/5 border border-sui-ocean/10 hover:border-sui-ocean/30 hover:shadow-md transition-all"
                    >
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-7 h-7 bg-sui-ocean rounded-full flex items-center justify-center shadow-sm">
                          <span className="text-sm font-bold text-white">{slide.emoji || '✓'}</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-sui-navy mb-1 leading-snug">{slide.title}</h3>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  if (phase === 'teaching') {
    // Get slides for current section (or all slides for legacy lessons)
    const slidesToShow = usingSections
      ? sections[currentSectionIndex].slides
      : (lesson.teachingSlides || []);

    const sectionTitle = usingSections
      ? sections[currentSectionIndex].sectionTitle
      : undefined;

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={`teaching-${currentSectionIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Phase Progress */}
          <div className="pt-16">
            <PhaseProgress currentPhase="teaching" lessonTitle={lesson.title} lessonId={lesson.id} />
          </div>

          {/* Welcome Message (only on first section) */}
          {currentSectionIndex === 0 && (
            <div className="bg-gradient-to-r from-sui-ocean to-sui-ocean-dark text-white p-6 text-center">
              <h2 className="text-2xl font-bold mb-2">{lesson.narrative.welcomeMessage}</h2>
              <div className="flex items-center justify-center gap-2 text-sm opacity-90">
                <span className="px-3 py-1 bg-white/20 rounded-full">{lesson.difficulty}</span>
                <span className="px-3 py-1 bg-white/20 rounded-full">+{lesson.xpReward} XP</span>
              </div>
            </div>
          )}

          {/* Section Title (for multi-section lessons) */}
          {usingSections && sectionTitle && (
            <div className="bg-sui-sky/20 p-4 text-center border-b-2 border-sui-ocean/20">
              <div className="text-sm text-sui-ocean font-semibold mb-1">
                Section {currentSectionIndex + 1} of {totalSections}
              </div>
              <h3 className="text-xl font-bold text-sui-navy">{sectionTitle}</h3>
            </div>
          )}

          <TeachingSlide
            slides={slidesToShow}
            onComplete={handleTeachingComplete}
            transitionMessage={
              usingSections && sections[currentSectionIndex].exerciseId
                ? "Great! Now let's practice what you just learned..."
                : lesson.narrative.quizTransition
            }
          />
        </motion.div>
      </AnimatePresence>
    );
  }

  if (phase === 'exercise') {
    const currentSection = sections[currentSectionIndex];
    const exercise = currentSection.exerciseId
      ? getExerciseById(currentSection.exerciseId)
      : null;

    if (!exercise) {
      // No exercise found, skip to next section
      handleExerciseComplete({} as ValidationResult, {} as ExerciseFeedback);
      return null;
    }

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={`exercise-${currentSectionIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-screen bg-gradient-to-b from-sui-sky/20 to-white pt-24 sm:pt-32 pb-20 px-4 sm:px-6"
        >
          <div className="max-w-5xl mx-auto">
            {/* Phase Progress */}
            <div className="mb-6">
              <PhaseProgress currentPhase="teaching" lessonTitle={lesson.title} lessonId={lesson.id} />
            </div>

            {/* Practice Section Header */}
            <div className="mb-6 p-5 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-blue-200 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="text-3xl">💪</div>
                <div>
                  <h2 className="text-xl font-bold text-sui-navy mb-1">
                    Practice Time!
                  </h2>
                  <p className="text-sm text-sui-gray-600">
                    Apply what you just learned in this exercise
                  </p>
                </div>
              </div>
            </div>

            {/* Exercise Component */}
            <ExerciseRenderer
              exercise={exercise}
              onComplete={handleExerciseComplete}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  if (phase === 'quiz') {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="quiz"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Phase Progress */}
          <div className="pt-16">
            <PhaseProgress currentPhase="quiz" lessonTitle={lesson.title} lessonId={lesson.id} />
          </div>

          <QuizComponent
            questions={lesson.quiz}
            passThreshold={lesson.quizPassThreshold}
            onComplete={handleQuizComplete}
            transitionMessage={lesson.narrative.practiceTransition}
          />
        </motion.div>
      </AnimatePresence>
    );
  }

  // Practice phase
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="practice"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col h-screen bg-gradient-to-br from-sui-mist to-white"
      >
        <Confetti show={showConfetti} />

        {/* Phase Progress */}
        <div className="pt-16">
          <PhaseProgress currentPhase="practice" lessonTitle={lesson.title} lessonId={lesson.id} />
        </div>

        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
          {/* Left Panel - Instructions & Hints */}
          <div className="w-full lg:w-1/2 p-8 overflow-y-auto bg-white border-r border-sui-gray-200">
            <div className="mb-8">
              <XPProgress />
            </div>

            <div className="max-w-2xl">
              {/* Practice Transition Message */}
              <div className="mb-6 p-5 bg-gradient-to-r from-sui-ocean/10 to-sui-ocean-dark/10 border-2 border-sui-ocean/20 rounded-2xl">
                <h2 className="text-xl font-bold text-sui-ocean flex items-center gap-2">
                  <span className="text-2xl">⚔️</span>
                  {lesson.narrative.practiceTransition}
                </h2>
              </div>

              <h1 className="text-3xl font-bold text-sui-navy mb-3">{lesson.title}</h1>
              <p className="text-lg text-sui-gray-600 mb-6">{lesson.description}</p>

              {/* Personalized Hints from Quiz */}
              {practiceHints.length > 0 && (
                <div className="mb-6 p-5 bg-orange-50 border-2 border-orange-300 rounded-2xl">
                  <h3 className="font-bold text-orange-900 mb-3 flex items-center gap-2">
                    <span>💡</span> Based on your quiz:
                  </h3>
                  <ul className="space-y-2">
                    {practiceHints.map((hint, index) => (
                      <li key={index} className="text-orange-800">
                        • {hint}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Regular Hints */}
              <div className="mb-8">
                <button
                  onClick={() => setShowHints(!showHints)}
                  className="flex items-center gap-2 px-4 py-2 bg-sui-sky/50 text-sui-navy hover:bg-sui-sky transition-colors rounded-xl font-medium"
                >
                  💡 {showHints ? 'Hide' : 'Show'} Hints
                </button>

                <AnimatePresence>
                  {showHints && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 space-y-3"
                    >
                      {lesson.hints.slice(0, currentHintIndex + 1).map((hint, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 bg-sui-ocean/5 border border-sui-ocean/20 rounded-xl text-sui-navy"
                        >
                          <span className="font-medium">Hint {index + 1}:</span> {hint}
                        </motion.div>
                      ))}

                      {currentHintIndex < lesson.hints.length - 1 && (
                        <button
                          onClick={showNextHint}
                          className="text-sm text-sui-ocean hover:text-sui-ocean-dark font-medium"
                        >
                          Show next hint →
                        </button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right Panel - Code Editor */}
          <div className="w-full lg:w-1/2 p-8 flex flex-col bg-sui-gray-50">
            <div className="flex-1 mb-6">
              <MoveEditor
                defaultValue={lesson.starterCode}
                onChange={setCode}
                onRun={handleRunCode}
                height="calc(100vh - 320px)"
              />
            </div>

            {/* Output Console */}
            <div className="h-56 bg-white border-2 border-sui-gray-200 rounded-2xl p-6 overflow-y-auto">
              <div className="text-xs text-sui-gray-500 font-semibold mb-3 uppercase tracking-wider">
                Compilation Output:
              </div>
              <pre className="text-sm text-sui-navy whitespace-pre-wrap font-mono leading-relaxed">
                {output || '💡 Click "Run Code" to compile and test your solution...'}
              </pre>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
