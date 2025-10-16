'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import ExerciseRenderer from '../components/exercises/ExerciseRenderer';
import {
  allExercises,
  getExercisesByType,
  getExercisesByTopic,
  getExercisesByDifficulty
} from '../data/exercises';
import {
  Exercise,
  ExerciseType,
  ExerciseTopic,
  ExerciseDifficulty,
  ValidationResult,
  ExerciseFeedback
} from '../types/exercises';
import {
  getExerciseProgress,
  recordAttempt,
  getOverallStatistics,
  isExerciseCompleted
} from '../utils/exerciseProgress';

export default function ExercisesPage() {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [filterType, setFilterType] = useState<ExerciseType | 'all'>('all');
  const [filterTopic, setFilterTopic] = useState<ExerciseTopic | 'all'>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<ExerciseDifficulty | 'all'>('all');
  const [showCompleted, setShowCompleted] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Get statistics
  const stats = getOverallStatistics();

  // Filter exercises
  const filteredExercises = useMemo(() => {
    let filtered = allExercises;

    if (filterType !== 'all') {
      filtered = filtered.filter(ex => ex.type === filterType);
    }

    if (filterTopic !== 'all') {
      filtered = filtered.filter(ex => ex.topic === filterTopic);
    }

    if (filterDifficulty !== 'all') {
      filtered = filtered.filter(ex => ex.difficulty === filterDifficulty);
    }

    if (!showCompleted) {
      filtered = filtered.filter(ex => !isExerciseCompleted(ex.id));
    }

    return filtered;
  }, [filterType, filterTopic, filterDifficulty, showCompleted]);

  const handleExerciseComplete = (result: ValidationResult, feedback: ExerciseFeedback) => {
    if (!selectedExercise) return;

    // Record attempt
    recordAttempt(
      'demo-user',
      selectedExercise.id,
      result,
      feedback,
      {}, // User answer would be tracked properly in production
      0, // Hints used
      0  // Time spent
    );

    // Show success message and return to list after delay
    setTimeout(() => {
      setSelectedExercise(null);
    }, 3000);
  };

  const getExerciseTypeIcon = (type: ExerciseType) => {
    switch (type) {
      case 'code_completion':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        );
      case 'bug_fix':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'multiple_choice':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        );
      case 'output_prediction':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        );
    }
  };

  const getDifficultyColor = (difficulty: ExerciseDifficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'advanced':
        return 'bg-red-100 text-red-700 border-red-300';
    }
  };

  // If an exercise is selected, show the practice interface
  if (selectedExercise) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sui-sky/20 to-white pt-24 sm:pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => setSelectedExercise(null)}
            className="mb-6 flex items-center gap-2 text-sui-ocean hover:text-sui-ocean-dark font-semibold transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Exercises
          </button>

          {/* Exercise */}
          <ExerciseRenderer
            exercise={selectedExercise}
            onComplete={handleExerciseComplete}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sui-sky/20 to-white py-8 sm:py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-sui-navy mb-3 sm:mb-4">
            Practice Exercises
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-sui-gray-600">
            Master Move programming with interactive exercises
          </p>
        </motion.div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl border-2 border-sui-gray-200 p-4 text-center"
          >
            <div className="text-3xl font-bold text-sui-ocean mb-1">
              {stats.completedExercises}
            </div>
            <div className="text-xs sm:text-sm text-sui-gray-600">
              Completed
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl border-2 border-sui-gray-200 p-4 text-center"
          >
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {stats.masteredExercises}
            </div>
            <div className="text-xs sm:text-sm text-sui-gray-600">
              Mastered
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl border-2 border-sui-gray-200 p-4 text-center"
          >
            <div className="text-3xl font-bold text-green-600 mb-1">
              {stats.totalXP}
            </div>
            <div className="text-xs sm:text-sm text-sui-gray-600">
              Total XP
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl border-2 border-sui-gray-200 p-4 text-center"
          >
            <div className="text-3xl font-bold text-orange-600 mb-1">
              {stats.averageScore}%
            </div>
            <div className="text-xs sm:text-sm text-sui-gray-600">
              Avg Score
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl sm:rounded-2xl border-2 border-sui-gray-200 p-4 sm:p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-sui-navy">Filters</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-sui-ocean text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-sui-ocean text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Type Filter */}
            <div>
              <label className="block text-sm font-semibold text-sui-navy mb-2">
                Exercise Type
              </label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as ExerciseType | 'all')}
                className="w-full px-3 py-2 border-2 border-sui-gray-300 rounded-lg focus:border-sui-ocean outline-none text-sm"
              >
                <option value="all">All Types</option>
                <option value="code_completion">Code Completion</option>
                <option value="bug_fix">Bug Fix</option>
                <option value="multiple_choice">Multiple Choice</option>
                <option value="output_prediction">Output Prediction</option>
              </select>
            </div>

            {/* Topic Filter */}
            <div>
              <label className="block text-sm font-semibold text-sui-navy mb-2">
                Topic
              </label>
              <select
                value={filterTopic}
                onChange={(e) => setFilterTopic(e.target.value as ExerciseTopic | 'all')}
                className="w-full px-3 py-2 border-2 border-sui-gray-300 rounded-lg focus:border-sui-ocean outline-none text-sm"
              >
                <option value="all">All Topics</option>
                <option value="functions">Functions</option>
                <option value="structs">Structs</option>
                <option value="abilities">Abilities</option>
                <option value="primitives">Primitives</option>
                <option value="control_flow">Control Flow</option>
                <option value="vectors">Vectors</option>
                <option value="options">Options</option>
                <option value="references">References</option>
                <option value="generics">Generics</option>
              </select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="block text-sm font-semibold text-sui-navy mb-2">
                Difficulty
              </label>
              <select
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value as ExerciseDifficulty | 'all')}
                className="w-full px-3 py-2 border-2 border-sui-gray-300 rounded-lg focus:border-sui-ocean outline-none text-sm"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            {/* Show Completed Toggle */}
            <div>
              <label className="block text-sm font-semibold text-sui-navy mb-2">
                Status
              </label>
              <label className="flex items-center gap-2 px-3 py-2 border-2 border-sui-gray-300 rounded-lg cursor-pointer hover:border-sui-ocean transition-colors">
                <input
                  type="checkbox"
                  checked={showCompleted}
                  onChange={(e) => setShowCompleted(e.target.checked)}
                  className="w-4 h-4 text-sui-ocean focus:ring-2 focus:ring-sui-ocean"
                />
                <span className="text-sm">Show completed</span>
              </label>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-sui-gray-600">
            Showing {filteredExercises.length} of {allExercises.length} exercises
          </div>
        </motion.div>

        {/* Exercise Grid/List */}
        {filteredExercises.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-sui-navy mb-2">No exercises found</h3>
            <p className="text-sui-gray-600">Try adjusting your filters</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6' : 'space-y-4'}>
            {filteredExercises.map((exercise, index) => {
              const progress = getExerciseProgress(exercise.id);
              const isCompleted = isExerciseCompleted(exercise.id);

              return (
                <motion.div
                  key={exercise.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedExercise(exercise)}
                  className="bg-white rounded-xl border-2 border-sui-gray-200 hover:border-sui-ocean p-4 sm:p-6 cursor-pointer transition-all hover:shadow-lg group"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      exercise.type === 'code_completion' ? 'bg-blue-100 text-blue-600' :
                      exercise.type === 'bug_fix' ? 'bg-red-100 text-red-600' :
                      exercise.type === 'multiple_choice' ? 'bg-blue-100 text-blue-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      {getExerciseTypeIcon(exercise.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-sui-navy mb-1 group-hover:text-sui-ocean transition-colors">
                        {exercise.title}
                      </h3>
                      <p className="text-sm text-sui-gray-600 line-clamp-2">
                        {exercise.description}
                      </p>
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(exercise.difficulty)}`}>
                      {exercise.difficulty}
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-sui-sky/30 text-sui-ocean border border-sui-ocean/20">
                      {exercise.topic.replace('_', ' ')}
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-300">
                      {exercise.estimatedTime} min
                    </span>
                  </div>

                  {/* Progress */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-sui-ocean">
                        {exercise.baseXP} XP
                      </span>
                      {progress && progress.totalAttempts > 0 && (
                        <span className="text-xs text-sui-gray-500">
                          • {progress.totalAttempts} attempt{progress.totalAttempts !== 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                    {isCompleted && (
                      <div className="flex items-center gap-1 text-green-600">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {progress && progress.bestScore > 0 && (
                    <div className="mt-3 pt-3 border-t border-sui-gray-200">
                      <div className="flex items-center justify-between text-xs text-sui-gray-600 mb-1">
                        <span>Best Score</span>
                        <span className="font-semibold">{progress.bestScore}%</span>
                      </div>
                      <div className="w-full bg-sui-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-sui-ocean h-1.5 rounded-full"
                          style={{ width: `${progress.bestScore}%` }}
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
