'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Editor from '@monaco-editor/react';
import {
  MultipleChoiceExercise,
  MultipleChoiceAnswer,
  MultipleChoiceOption,
  ValidationResult,
  ExerciseFeedback
} from '../../types/exercises';

interface MultipleChoiceExerciseProps {
  exercise: MultipleChoiceExercise;
  onComplete: (result: ValidationResult, feedback: ExerciseFeedback) => void;
  onHintRequest?: () => void;
}

export default function MultipleChoiceExerciseComponent({
  exercise,
  onComplete,
  onHintRequest
}: MultipleChoiceExerciseProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [shuffledOptions, setShuffledOptions] = useState<MultipleChoiceOption[]>([]);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [feedback, setFeedback] = useState<ExerciseFeedback | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showExplanations, setShowExplanations] = useState(false);

  // Initialize and optionally shuffle options
  useEffect(() => {
    if (exercise.shuffleOptions) {
      const shuffled = [...exercise.options].sort(() => Math.random() - 0.5);
      setShuffledOptions(shuffled);
    } else {
      setShuffledOptions(exercise.options);
    }
  }, [exercise]);

  const handleOptionToggle = (optionId: string) => {
    if (exercise.allowMultipleAnswers) {
      // Toggle for multiple selection
      setSelectedOptions(prev =>
        prev.includes(optionId)
          ? prev.filter(id => id !== optionId)
          : [...prev, optionId]
      );
    } else {
      // Single selection only
      setSelectedOptions([optionId]);
    }
    // Hide explanations when user changes selection
    setShowExplanations(false);
  };

  const validateAnswers = (): ValidationResult => {
    const correctOptions = exercise.options.filter(opt => opt.isCorrect);
    const correctIds = new Set(correctOptions.map(opt => opt.id));
    const selectedIds = new Set(selectedOptions);

    // Check if selection matches correct answers exactly
    const isCorrect =
      correctIds.size === selectedIds.size &&
      [...correctIds].every(id => selectedIds.has(id));

    // Calculate partial score
    const correctlySelected = selectedOptions.filter(id => correctIds.has(id)).length;
    const incorrectlySelected = selectedOptions.filter(id => !correctIds.has(id)).length;
    const missedCorrect = correctOptions.length - correctlySelected;

    const score = correctOptions.length > 0
      ? Math.max(0, Math.round(((correctlySelected - incorrectlySelected) / correctOptions.length) * 100))
      : 0;

    const errors = isCorrect ? [] : [{
      message: `Selected ${selectedOptions.length} option(s). ${correctlySelected} correct, ${incorrectlySelected} incorrect, ${missedCorrect} missed.`,
      severity: 'error' as const
    }];

    return {
      isCorrect,
      score: isCorrect ? 100 : score,
      feedback: isCorrect
        ? correctOptions.length > 1
          ? `Perfect! All ${correctOptions.length} correct answers selected!`
          : 'Correct!'
        : `Not quite right. ${correctlySelected}/${correctOptions.length} correct answers selected.`,
      errors: errors.length > 0 ? errors : undefined
    };
  };

  const generateFeedback = (validation: ValidationResult): ExerciseFeedback => {
    const earnedXP = Math.round((validation.score / 100) * exercise.baseXP);

    if (validation.isCorrect) {
      return {
        type: 'success',
        message: 'Excellent work! You got it right.',
        details: exercise.explanation,
        earnedXP: hintsUsed === 0 ? earnedXP + (exercise.perfectScoreXP || 0) : earnedXP
      };
    } else if (validation.score >= 50) {
      return {
        type: 'partial',
        message: 'Partially correct. Review the explanations.',
        details: 'Some answers are correct, but not all.',
        earnedXP,
        showHint: true
      };
    } else {
      return {
        type: 'incorrect',
        message: 'Incorrect. Try again or use a hint.',
        earnedXP: 0,
        showHint: true
      };
    }
  };

  const handleSubmit = async () => {
    if (selectedOptions.length === 0) return;

    setIsSubmitting(true);
    setFeedback(null);

    // Simulate validation delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const validation = validateAnswers();
    const feedbackResult = generateFeedback(validation);

    setFeedback(feedbackResult);
    setIsSubmitting(false);

    // Show explanations after submission if enabled
    if (exercise.showExplanationOnWrong || validation.isCorrect) {
      setShowExplanations(true);
    }

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
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
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
          {exercise.allowMultipleAnswers && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 border border-purple-300">
              Select all that apply
            </span>
          )}
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-xl sm:rounded-2xl border-2 border-sui-gray-200 p-4 sm:p-6">
        <h4 className="text-lg sm:text-xl font-bold text-sui-navy mb-4">
          Question
        </h4>
        <p className="text-sm sm:text-base text-sui-gray-700 leading-relaxed">
          {exercise.question}
        </p>
      </div>

      {/* Code Snippet (if provided) */}
      {exercise.codeSnippet && (
        <div className="bg-white rounded-xl sm:rounded-2xl border-2 border-sui-gray-200 p-4 sm:p-6">
          <h4 className="text-lg sm:text-xl font-bold text-sui-navy mb-4">
            Code Reference
          </h4>
          <div className="border-2 border-sui-gray-200 rounded-xl overflow-hidden">
            <Editor
              height="200px"
              defaultLanguage="rust"
              value={exercise.codeSnippet}
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
      )}

      {/* Answer Options */}
      <div className="bg-white rounded-xl sm:rounded-2xl border-2 border-sui-gray-200 p-4 sm:p-6">
        <h4 className="text-lg sm:text-xl font-bold text-sui-navy mb-4">
          {exercise.allowMultipleAnswers ? 'Select All Correct Answers' : 'Select Your Answer'}
        </h4>

        <div className="space-y-3">
          {shuffledOptions.map((option, index) => {
            const isSelected = selectedOptions.includes(option.id);
            const showCorrect = showExplanations && option.isCorrect;
            const showIncorrect = showExplanations && isSelected && !option.isCorrect;

            return (
              <div key={option.id}>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleOptionToggle(option.id)}
                  disabled={showExplanations}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    showCorrect
                      ? 'border-green-400 bg-green-50'
                      : showIncorrect
                      ? 'border-red-400 bg-red-50'
                      : isSelected
                      ? 'border-sui-ocean bg-sui-ocean/10'
                      : 'border-sui-gray-200 hover:border-sui-ocean/50'
                  } ${showExplanations ? 'cursor-not-allowed' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    {/* Radio/Checkbox Icon */}
                    <div className={`flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-${exercise.allowMultipleAnswers ? 'md' : 'full'} border-2 flex items-center justify-center transition-all ${
                      showCorrect
                        ? 'border-green-600 bg-green-600'
                        : showIncorrect
                        ? 'border-red-600 bg-red-600'
                        : isSelected
                        ? 'border-sui-ocean bg-sui-ocean'
                        : 'border-sui-gray-400'
                    }`}>
                      {(isSelected || showCorrect) && (
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                      {showIncorrect && (
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                    </div>

                    {/* Option Text */}
                    <div className="flex-1">
                      <p className={`text-sm sm:text-base font-medium ${
                        showCorrect ? 'text-green-900' :
                        showIncorrect ? 'text-red-900' :
                        'text-sui-navy'
                      }`}>
                        {option.text}
                      </p>

                      {/* Explanation (shown after submission) */}
                      {showExplanations && option.explanation && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className={`text-xs sm:text-sm mt-2 pt-2 border-t ${
                            option.isCorrect
                              ? 'border-green-300 text-green-700'
                              : 'border-gray-300 text-gray-600'
                          }`}
                        >
                          {option.explanation}
                        </motion.p>
                      )}
                    </div>
                  </div>
                </motion.button>
              </div>
            );
          })}
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
        disabled={isSubmitting || selectedOptions.length === 0 || showExplanations}
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
