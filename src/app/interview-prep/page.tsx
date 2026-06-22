"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, CheckCircle2, AlertCircle, RotateCcw, ChevronRight, Trophy, PlayCircle } from 'lucide-react';

import { flashcardsData } from '@/data/interview-questions';

export default function InterviewPrepPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [metrics, setMetrics] = useState({ nailed: 0, needsWork: 0 });
  const [isComplete, setIsComplete] = useState(false);

  const currentCard = flashcardsData[currentIndex];
  const progress = ((currentIndex) / flashcardsData.length) * 100;

  const handleStart = () => setHasStarted(true);

  const handleFlip = () => {
    if (!isFlipped) setIsFlipped(true);
  };

  const handleNext = (status: 'nailed' | 'needsWork') => {
    setMetrics(prev => ({
      ...prev,
      [status]: prev[status] + 1
    }));

    if (currentIndex < flashcardsData.length - 1) {
      setIsFlipped(false);
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setHasStarted(false);
    setMetrics({ nailed: 0, needsWork: 0 });
    setIsComplete(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8 flex flex-col transition-colors duration-200">
      <div className="max-w-3xl mx-auto w-full flex-1 flex flex-col">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-purple-100 dark:bg-purple-900/50 rounded-2xl mb-4 text-purple-600 dark:text-purple-400">
            <BrainCircuit className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Behavioral Interview Prep
          </h1>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
            Practice the STAR method (Situation, Task, Action, Result) with interactive flashcards.
          </p>
        </div>

        {!hasStarted && !isComplete && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col items-center justify-center bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-10 text-center shadow-sm"
          >
            <Trophy className="w-16 h-16 text-indigo-500 mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Ready to practice?</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
              You'll be presented with common behavioral questions. Think of your answer using the STAR method, flip the card to see a model response, and rate how you did.
            </p>
            <button 
              onClick={handleStart}
              className="inline-flex items-center px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold text-lg transition-colors shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20"
            >
              <PlayCircle className="w-6 h-6 mr-2" />
              Start Practice Session
            </button>
          </motion.div>
        )}

        {hasStarted && !isComplete && (
          <div className="flex-1 flex flex-col">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                <span>Question {currentIndex + 1} of {flashcardsData.length}</span>
                <span>{Math.round(progress)}% Completed</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2.5">
                <div 
                  className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Flashcard Area */}
            <div className="flex-1 relative perspective-1000">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex + (isFlipped ? '-flipped' : '-front')}
                  initial={{ rotateY: isFlipped ? -90 : 90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: isFlipped ? 90 : -90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 w-full h-full"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {!isFlipped ? (
                    /* Front of Card */
                    <div 
                      onClick={handleFlip}
                      className="w-full h-full bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-8 sm:p-12 flex flex-col shadow-lg cursor-pointer hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors group"
                    >
                      <div className="mb-4 inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-semibold self-start">
                        {currentCard.category}
                      </div>
                      <div className="flex-1 flex flex-col justify-center text-center">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
                          {currentCard.question}
                        </h2>
                        <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl inline-block max-w-lg mx-auto">
                          <p className="text-sm text-amber-800 dark:text-amber-400 font-medium">
                            💡 Hint: {currentCard.hint}
                          </p>
                        </div>
                      </div>
                      <div className="text-center text-gray-400 dark:text-gray-500 font-medium group-hover:text-indigo-500 transition-colors">
                        Click card to reveal model answer
                      </div>
                    </div>
                  ) : (
                    /* Back of Card */
                    <div className="w-full h-full bg-indigo-50 dark:bg-gray-900 rounded-3xl border border-indigo-100 dark:border-gray-800 p-8 sm:p-12 flex flex-col overflow-y-auto shadow-lg">
                      <div className="mb-6 flex justify-between items-center">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Model Answer (STAR)</h3>
                      </div>
                      
                      <div className="space-y-6 flex-1">
                        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700">
                          <h4 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">Situation</h4>
                          <p className="text-gray-700 dark:text-gray-300">{currentCard.answer.situation}</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700">
                          <h4 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">Task</h4>
                          <p className="text-gray-700 dark:text-gray-300">{currentCard.answer.task}</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700">
                          <h4 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">Action</h4>
                          <p className="text-gray-700 dark:text-gray-300">{currentCard.answer.action}</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700">
                          <h4 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">Result</h4>
                          <p className="text-gray-700 dark:text-gray-300 font-medium">{currentCard.answer.result}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Assessment Controls */}
            <div className={`mt-8 transition-opacity duration-300 ${isFlipped ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <div className="text-center mb-4">
                <p className="text-gray-600 dark:text-gray-400 font-medium">How did your mental response compare?</p>
              </div>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => handleNext('needsWork')}
                  disabled={!isFlipped}
                  className="flex-1 max-w-[200px] flex items-center justify-center py-4 px-6 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 text-gray-700 dark:text-gray-300 rounded-xl font-bold transition-all"
                >
                  <AlertCircle className="w-5 h-5 mr-2 text-amber-500" />
                  Needs Work
                </button>
                <button
                  onClick={() => handleNext('nailed')}
                  disabled={!isFlipped}
                  className="flex-1 max-w-[200px] flex items-center justify-center py-4 px-6 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 text-gray-700 dark:text-gray-300 rounded-xl font-bold transition-all"
                >
                  <CheckCircle2 className="w-5 h-5 mr-2 text-green-500" />
                  Nailed It!
                </button>
              </div>
            </div>
          </div>
        )}

        {isComplete && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-10 text-center shadow-lg"
          >
            <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
              <Trophy className="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Session Complete!</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
              Great job practicing your behavioral responses. Here's a quick summary of how you felt about your answers.
            </p>
            
            <div className="flex gap-8 mb-10">
              <div className="text-center">
                <div className="text-4xl font-extrabold text-green-500 mb-2">{metrics.nailed}</div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Nailed It</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-extrabold text-amber-500 mb-2">{metrics.needsWork}</div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Needs Work</div>
              </div>
            </div>

            <button 
              onClick={handleReset}
              className="inline-flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-full font-medium transition-colors"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Practice Again
            </button>
          </motion.div>
        )}

      </div>
    </div>
  );
}
