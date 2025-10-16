'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuizQuestion, WeaknessTopic } from '@/app/types/lesson';
import { useGameStore } from '@/app/lib/store/gameStore';

interface QuizComponentProps {
  questions: QuizQuestion[];
  passThreshold: number;
  onComplete: (weaknesses: WeaknessTopic[], practiceHints: string[]) => void;
  transitionMessage: string;
}

export default function QuizComponent({
  questions,
  passThreshold,
  onComplete,
  transitionMessage,
}: QuizComponentProps) {
  const { addXP } = useGameStore();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [weaknesses, setWeaknesses] = useState<WeaknessTopic[]>([]);
  const [practiceHints, setPracticeHints] = useState<string[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const totalQuestions = questions.length;
  const requiredScore = Math.ceil(totalQuestions * passThreshold);
  const passed = score >= requiredScore;

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return; // Prevent changing answer after submission
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    setShowFeedback(true);

    if (isCorrect) {
      setScore(score + 1);
      addXP(10); // Small XP reward for correct answer
    } else {
      // Track weaknesses
      if (currentQuestion.weaknessTopic) {
        setWeaknesses([...weaknesses, currentQuestion.weaknessTopic]);
      }
      if (currentQuestion.practiceHint) {
        setPracticeHints([...practiceHints, currentQuestion.practiceHint]);
      }
    }

    setAnsweredQuestions([...answeredQuestions, currentQuestionIndex]);
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      setQuizComplete(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setAnsweredQuestions([]);
    setWeaknesses([]);
    setPracticeHints([]);
    setQuizComplete(false);
  };

  const handleContinueToPractice = () => {
    // Award XP for passing quiz
    if (passed) {
      addXP(50);
    }
    onComplete(weaknesses, practiceHints);
  };

  if (quizComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sui-mist via-white to-sui-sky flex items-center justify-center p-8">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-2xl w-full bg-white rounded-3xl shadow-xl p-12 border-2 border-sui-gray-200 text-center"
        >
          {/* Score Display */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className={`w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center text-5xl font-black ${
              passed
                ? 'bg-gradient-to-br from-green-400 to-green-600 text-white'
                : 'bg-gradient-to-br from-orange-400 to-orange-600 text-white'
            }`}
          >
            {score}/{totalQuestions}
          </motion.div>

          {/* Result Message */}
          <h2 className="text-4xl font-black text-sui-navy mb-4">
            {passed ? '🎉 Amazing Work!' : '💪 Keep Trying!'}
          </h2>

          <p className="text-xl text-sui-gray-700 mb-8">
            {passed
              ? `You scored ${score} out of ${totalQuestions}! You're ready for the practice challenge.`
              : `You need ${requiredScore} correct answers to pass. You got ${score}. Let's try again!`}
          </p>

          {/* XP Reward */}
          {passed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-sui-ocean/10 text-sui-ocean rounded-full font-bold mb-8"
            >
              +50 XP Earned! 🌟
            </motion.div>
          )}

          {/* Weakness Summary */}
          {!passed && weaknesses.length > 0 && (
            <div className="mb-8 p-6 bg-sui-sky rounded-2xl text-left">
              <h3 className="font-bold text-sui-navy mb-3">📚 Topics to Review:</h3>
              <ul className="space-y-2">
                {Array.from(new Set(weaknesses)).map((topic, index) => (
                  <li key={index} className="text-sui-gray-700">
                    • {topic.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            {!passed && (
              <button
                onClick={handleRetry}
                className="px-8 py-4 bg-white text-sui-navy border-2 border-sui-gray-300 rounded-2xl font-bold hover:border-sui-ocean hover:text-sui-ocean transition-all"
              >
                Try Again
              </button>
            )}
            {passed && (
              <button
                onClick={handleContinueToPractice}
                className="px-8 py-4 bg-gradient-to-r from-sui-ocean to-sui-ocean-dark text-white rounded-2xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                {transitionMessage} 💻
              </button>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sui-mist via-white to-sui-sky flex items-center justify-center p-8">
      <div className="max-w-3xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-sui-gray-600">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
            <span className="text-sm font-bold text-sui-ocean">
              Score: {score}/{totalQuestions}
            </span>
          </div>
          <div className="h-2 bg-sui-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-sui-ocean to-sui-ocean-dark"
              initial={{ width: '0%' }}
              animate={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="bg-white rounded-3xl shadow-xl p-12 border-2 border-sui-gray-200"
          >
            {/* Question */}
            <h3 className="text-2xl font-bold text-sui-navy mb-8">{currentQuestion.question}</h3>

            {/* Answer Options */}
            <div className="space-y-4 mb-8">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentQuestion.correctAnswer;
                const showCorrect = showFeedback && isCorrect;
                const showWrong = showFeedback && isSelected && !isCorrect;

                return (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showFeedback}
                    whileHover={{ scale: showFeedback ? 1 : 1.02 }}
                    whileTap={{ scale: showFeedback ? 1 : 0.98 }}
                    className={`w-full p-5 rounded-2xl border-2 text-left font-semibold transition-all ${
                      showCorrect
                        ? 'bg-green-100 border-green-500 text-green-900'
                        : showWrong
                        ? 'bg-red-100 border-red-500 text-red-900'
                        : isSelected
                        ? 'bg-sui-ocean border-sui-ocean text-white'
                        : 'bg-white border-sui-gray-300 text-sui-navy hover:border-sui-ocean'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showCorrect && <span className="text-2xl">✅</span>}
                      {showWrong && <span className="text-2xl">❌</span>}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Explanation (shown after answer) */}
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 bg-sui-sky rounded-2xl border-2 border-sui-ocean mb-6"
              >
                <h4 className="font-bold text-sui-navy mb-2">💡 Explanation:</h4>
                <p className="text-sui-gray-700 leading-relaxed">{currentQuestion.explanation}</p>
              </motion.div>
            )}

            {/* Action Button */}
            <button
              onClick={showFeedback ? handleNextQuestion : handleSubmitAnswer}
              disabled={!showFeedback && selectedAnswer === null}
              className="w-full px-8 py-4 bg-gradient-to-r from-sui-ocean to-sui-ocean-dark text-white rounded-2xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {showFeedback ? (isLastQuestion ? 'See Results' : 'Next Question →') : 'Submit Answer'}
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
