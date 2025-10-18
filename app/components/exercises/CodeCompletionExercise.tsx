'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Editor from '@monaco-editor/react';
import {
  CodeCompletionExercise,
  CodeCompletionAnswer,
  ValidationResult,
  ExerciseFeedback
} from '../../types/exercises';

interface CodeCompletionExerciseProps {
  exercise: CodeCompletionExercise;
  onComplete: (result: ValidationResult, feedback: ExerciseFeedback) => void;
  onHintRequest?: () => void;
}

export default function CodeCompletionExerciseComponent({
  exercise,
  onComplete,
  onHintRequest
}: CodeCompletionExerciseProps) {
  const [code, setCode] = useState(exercise.codeTemplate);
  const [answers, setAnswers] = useState<CodeCompletionAnswer>({});
  const [hintsUsed, setHintsUsed] = useState(0);
  const [feedback, setFeedback] = useState<ExerciseFeedback | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showBlanks, setShowBlanks] = useState(true);

  // Initialize blank placeholders
  useEffect(() => {
    const initialCode = exercise.codeTemplate.replace(
      /{blank:(\w+)}/g,
      (match, blankId) => {
        const blank = exercise.blanks.find(b => b.id === blankId);
        return blank?.placeholder || '___';
      }
    );
    setCode(initialCode);
  }, [exercise]);

  const handleBlankChange = (blankId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [blankId]: value
    }));
  };

  const normalizeAnswer = (answer: string): string => {
    if (!exercise.caseSensitive) {
      answer = answer.toLowerCase();
    }
    if (!exercise.strictMode) {
      answer = answer.trim().replace(/\s+/g, ' ');
    }
    return answer;
  };

  const validateAnswers = (): ValidationResult => {
    const totalBlanks = exercise.blanks.length;
    let correctBlanks = 0;
    const errors: { location: string; message: string; severity: 'error' | 'warning' | 'info'; hint?: string }[] = [];

    exercise.blanks.forEach(blank => {
      const userAnswer = answers[blank.id] || '';
      const normalizedAnswer = normalizeAnswer(userAnswer);
      const normalizedCorrect = normalizeAnswer(blank.correctAnswer);

      const isCorrect = normalizedAnswer === normalizedCorrect ||
        blank.acceptableAnswers?.some(
          acc => normalizeAnswer(acc) === normalizedAnswer
        );

      if (isCorrect) {
        correctBlanks++;
      } else {
        errors.push({
          location: `Blank: ${blank.placeholder}`,
          message: `Expected something different`,
          severity: 'error',
          hint: blank.hint || exercise.hints[0]
        });
      }
    });

    const score = Math.round((correctBlanks / totalBlanks) * 100);
    const isCorrect = score === 100;

    return {
      isCorrect,
      score,
      feedback: isCorrect
        ? `Perfect! All ${totalBlanks} blanks filled correctly!`
        : `${correctBlanks} out of ${totalBlanks} correct. Keep trying!`,
      errors: errors.length > 0 ? errors : undefined
    };
  };

  const generateFeedback = (validation: ValidationResult): ExerciseFeedback => {
    const earnedXP = Math.round((validation.score / 100) * exercise.baseXP);

    if (validation.isCorrect) {
      return {
        type: 'success',
        message: 'Excellent work! All blanks completed correctly.',
        details: exercise.explanation,
        earnedXP: hintsUsed === 0 ? earnedXP + (exercise.perfectScoreXP || 0) : earnedXP
      };
    } else if (validation.score >= 50) {
      return {
        type: 'partial',
        message: 'Good progress! You got most of them.',
        details: 'Review the highlighted errors and try again.',
        earnedXP,
        showHint: true
      };
    } else {
      return {
        type: 'incorrect',
        message: 'Not quite right. Try reviewing the concepts.',
        earnedXP: 0,
        showHint: true
      };
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setFeedback(null);

    // Simulate validation delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const validation = validateAnswers();
    const feedbackResult = generateFeedback(validation);

    setFeedback(feedbackResult);
    setIsSubmitting(false);

    // If correct, complete the exercise
    if (validation.isCorrect) {
      setTimeout(() => {
        onComplete(validation, feedbackResult);
      }, 2000);
    }
  };

  const handleHint = () => {
    if (hintsUsed < exercise.hints.length) {
      setHintsUsed(hintsUsed + 1);
      onHintRequest?.();
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl sm:rounded-2xl border-2 border-sui-gray-200 p-4 sm:p-6">
        <div className="flex items-start gap-3 sm:gap-4 mb-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-xl sm:text-2xl font-bold text-sui-navy mb-2">
              {exercise.title}
            </h3>
            <p className="text-sm sm:text-base text-sui-gray-600">
              {exercise.description}
            </p>
          </div>
        </div>

        {/* Difficulty & Topic */}
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-300">
            {exercise.difficulty}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-sui-sky/30 text-sui-ocean border border-sui-ocean/20">
            {exercise.topic.replace('_', ' ')}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-300">
            {exercise.blanks.length} blanks
          </span>
        </div>
      </div>

      {/* Blanks to Fill (Mobile-friendly input method) */}
      {showBlanks && (
        <div className="bg-white rounded-xl sm:rounded-2xl border-2 border-sui-gray-200 p-4 sm:p-6">
          <h4 className="text-lg sm:text-xl font-bold text-sui-navy mb-4">
            Fill in the Blanks
          </h4>

          <div className="space-y-3 sm:space-y-4">
            {exercise.blanks.map((blank, index) => (
              <div key={blank.id} className="bg-gray-50 rounded-lg p-3 sm:p-4">
                <label className="block text-sm font-semibold text-sui-navy mb-2">
                  Blank {index + 1}: <code className="text-blue-600">{blank.placeholder}</code>
                </label>
                <input
                  type="text"
                  value={answers[blank.id] || ''}
                  onChange={(e) => handleBlankChange(blank.id, e.target.value)}
                  placeholder="Type your answer..."
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-sui-ocean focus:ring-2 focus:ring-sui-ocean/20 outline-none transition-all font-mono text-sm sm:text-base"
                />
                {blank.hint && hintsUsed > 0 && (
                  <p className="mt-2 text-xs sm:text-sm text-blue-600">
                    💡 Hint: {blank.hint}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Code Preview */}
      <div className="bg-white rounded-xl sm:rounded-2xl border-2 border-sui-gray-200 p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg sm:text-xl font-bold text-sui-navy">
            Code Preview
          </h4>
          <button
            onClick={() => setShowBlanks(!showBlanks)}
            className="text-sm text-sui-ocean hover:text-sui-ocean-dark font-semibold"
          >
            {showBlanks ? 'Hide' : 'Show'} Blanks
          </button>
        </div>

        <div className="border-2 border-sui-gray-200 rounded-xl overflow-hidden">
          <Editor
            height="300px"
            defaultLanguage="rust"
            value={code}
            theme="vs-dark"
            options={{
              readOnly: true,
              minimap: { enabled: false },
              fontSize: 13,
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              wordWrap: 'on'
            }}
          />
        </div>
      </div>

      {/* Hints Section */}
      {exercise.hints.length > 0 && (
        <div className="bg-white rounded-xl sm:rounded-2xl border-2 border-sui-gray-200 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg sm:text-xl font-bold text-sui-navy">
              Hints ({hintsUsed}/{exercise.hints.length})
            </h4>
            {hintsUsed < exercise.hints.length && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleHint}
                className="px-4 py-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 border-2 border-yellow-300 rounded-lg font-semibold text-sm transition-colors"
              >
                Get Hint
              </motion.button>
            )}
          </div>

          {hintsUsed > 0 && (
            <div className="space-y-2">
              {exercise.hints.slice(0, hintsUsed).map((hint, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3"
                >
                  <p className="text-sm text-blue-900">{hint}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSubmit}
        disabled={isSubmitting || Object.keys(answers).length < exercise.blanks.length}
        className="w-full bg-gradient-to-r from-sui-ocean to-sui-ocean-dark text-white rounded-xl py-3 sm:py-4 font-semibold text-base sm:text-lg shadow-lg hover:shadow-2xl hover:shadow-sui-ocean/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Checking...' : 'Submit Answer'}
      </motion.button>

      {/* Feedback */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-4 sm:p-6 rounded-xl border-2 ${
              feedback.type === 'success'
                ? 'bg-green-50 border-green-300'
                : feedback.type === 'partial'
                ? 'bg-yellow-50 border-yellow-300'
                : 'bg-red-50 border-red-300'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl">
                {feedback.type === 'success' ? '✅' : feedback.type === 'partial' ? '⚠️' : '❌'}
              </div>
              <div className="flex-1">
                <h4 className={`font-bold text-lg mb-1 ${
                  feedback.type === 'success' ? 'text-green-700' :
                  feedback.type === 'partial' ? 'text-yellow-700' : 'text-red-700'
                }`}>
                  {feedback.message}
                </h4>
                {feedback.details && (
                  <p className="text-sm text-gray-700 mt-2">{feedback.details}</p>
                )}
                {feedback.earnedXP > 0 && (
                  <div className="mt-3 px-3 py-2 bg-white rounded-lg border-2 border-sui-ocean/20">
                    <span className="text-sui-ocean font-bold">+{feedback.earnedXP} XP</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
