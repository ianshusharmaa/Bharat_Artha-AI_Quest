'use client';

import React, { useState, useEffect } from 'react';
import { questions, Question } from '@/data/questions';

const QuizPage = () => {
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard' | 'all'>('all');
  const [showDifficultySelect, setShowDifficultySelect] = useState(true);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    const soundSetting = localStorage.getItem('soundEnabled');
    if (soundSetting !== null) {
      setSoundEnabled(JSON.parse(soundSetting));
    }
  }, []);

  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && timerActive) {
      handleTimeUp();
    }
  }, [timeLeft, timerActive]);

  const handleTimeUp = () => {
    setTimerActive(false);
    setSelected(-1);
    setShowExplanation(true);
    setTimeout(() => {
      setUserAnswers([...userAnswers, -1]);
      setShowExplanation(false);
      setSelected(null);
      const nextQuestion = currentQuestionIndex + 1;
      if (nextQuestion < filteredQuestions.length) {
        setCurrentQuestionIndex(nextQuestion);
        setTimeLeft(30);
        setTimerActive(true);
      } else {
        unlockQuizMasterBadge(score);
        setShowScore(true);
      }
    }, 1800);
  };

  const startQuiz = (selectedDifficulty: 'easy' | 'medium' | 'hard' | 'all') => {
    setDifficulty(selectedDifficulty);
    const filtered = selectedDifficulty === 'all' 
      ? questions 
      : questions.filter(q => q.difficulty === selectedDifficulty);
    setFilteredQuestions(filtered);
    setShowDifficultySelect(false);
    setTimeLeft(30);
    setTimerActive(true);
  };

  const toggleSound = () => {
    const newValue = !soundEnabled;
    setSoundEnabled(newValue);
    localStorage.setItem('soundEnabled', JSON.stringify(newValue));
  };

  const unlockQuizMasterBadge = (finalScore: number) => {
    if (finalScore < 8) return;
    const data = localStorage.getItem("badges");
    const badges: number[] = data ? JSON.parse(data) : [];
    if (!badges.includes(1)) {
      const updated = [...badges, 1];
      localStorage.setItem("badges", JSON.stringify(updated));
    }
  };

  const handleAnswerOptionClick = (selectedAnswerIndex: number) => {
    setSelected(selectedAnswerIndex);
    setTimerActive(false);
    // Play sound
    const isCorrect = selectedAnswerIndex === filteredQuestions[currentQuestionIndex].correctAnswer;
    if (soundEnabled) {
      const audio = new Audio(isCorrect ? '/sounds/correct.wav' : '/sounds/wrong.mp3');
      audio.play();
    }
    setShowExplanation(true);
    setTimeout(() => {
      const nextScore = isCorrect ? score + 1 : score;
      if (isCorrect) {
        setScore(nextScore);
      }
      setUserAnswers([...userAnswers, selectedAnswerIndex]);
      setShowExplanation(false);
      setSelected(null);
      const nextQuestion = currentQuestionIndex + 1;
      if (nextQuestion < filteredQuestions.length) {
        setCurrentQuestionIndex(nextQuestion);
        setTimeLeft(30);
        setTimerActive(true);
      } else {
        unlockQuizMasterBadge(nextScore);
        setShowScore(true);
      }
    }, 1800);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScore(false);
    setUserAnswers([]);
    setShowDifficultySelect(true);
    setTimerActive(false);
    setTimeLeft(30);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)]">
      <header className="bg-[var(--navbar-bg)] shadow-md p-4 flex justify-between items-center" style={{ boxShadow: 'var(--navbar-shadow)' }}>
        <h1 className="text-2xl font-bold text-[var(--primary)]">Quiz Mode</h1>
        <button
          onClick={toggleSound}
          className="bg-[var(--primary)] text-white px-4 py-2 rounded-lg hover:opacity-80 transition"
        >
          {soundEnabled ? '🔊 Sound On' : '🔇 Sound Off'}
        </button>
      </header>
      <main className="flex-grow p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full mx-auto bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl shadow-lg p-8">
          {showDifficultySelect ? (
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6 text-[var(--primary)]">Select Difficulty</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => startQuiz('easy')}
                  className="bg-green-500 text-white p-6 rounded-lg hover:bg-green-600 transition transform hover:scale-105"
                >
                  <h3 className="text-2xl font-bold mb-2">Easy</h3>
                  <p className="text-sm">Perfect for beginners</p>
                </button>
                <button
                  onClick={() => startQuiz('medium')}
                  className="bg-yellow-500 text-white p-6 rounded-lg hover:bg-yellow-600 transition transform hover:scale-105"
                >
                  <h3 className="text-2xl font-bold mb-2">Medium</h3>
                  <p className="text-sm">Test your knowledge</p>
                </button>
                <button
                  onClick={() => startQuiz('hard')}
                  className="bg-red-500 text-white p-6 rounded-lg hover:bg-red-600 transition transform hover:scale-105"
                >
                  <h3 className="text-2xl font-bold mb-2">Hard</h3>
                  <p className="text-sm">Expert level challenge</p>
                </button>
                <button
                  onClick={() => startQuiz('all')}
                  className="bg-purple-500 text-white p-6 rounded-lg hover:bg-purple-600 transition transform hover:scale-105"
                >
                  <h3 className="text-2xl font-bold mb-2">All Levels</h3>
                  <p className="text-sm">Mixed difficulty</p>
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Timer */}
              {!showScore && (
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-semibold text-[var(--primary)]">Time Left:</span>
                    <span className={`text-2xl font-bold ${timeLeft < 10 ? 'text-red-500' : 'text-[var(--primary)]'}`}>
                      {timeLeft}s
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div
                      className={`h-2 rounded-full transition-all duration-1000 ${timeLeft < 10 ? 'bg-red-500' : 'bg-green-500'}`}
                      style={{ width: `${(timeLeft / 30) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
              {/* Progress Bar */}
              {!showScore && (
                <div className="w-full h-3 bg-gray-200 rounded-full mb-6">
                  <div
                    className="h-3 bg-[var(--primary)] rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestionIndex) / filteredQuestions.length) * 100}%` }}
                  ></div>
                </div>
              )}
          {showScore ? (
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4 text-[var(--primary)]">You scored {score} out of {filteredQuestions.length}!</h2>
              <div className="mb-4">
                <p className="text-lg">
                  Difficulty: <span className="font-bold capitalize">{difficulty}</span>
                </p>
                <p className="text-lg">
                  Percentage: <span className="font-bold">{Math.round((score / filteredQuestions.length) * 100)}%</span>
                </p>
              </div>
              <div className="mb-6 text-left max-h-96 overflow-y-auto">
                <h3 className="text-xl font-semibold mb-2 text-[var(--primary)]">Your Answers:</h3>
                <ul className="space-y-2">
                  {filteredQuestions.map((q, idx) => (
                    <li key={idx} className="p-3 rounded-lg bg-white border border-gray-200">
                      <div className="font-medium text-[var(--foreground)] mb-1">
                        Q{idx + 1}: {q.question}
                        <span className={`ml-2 text-xs px-2 py-1 rounded ${
                          q.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                          q.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {q.difficulty}
                        </span>
                      </div>
                      <div>
                        <span className={
                          userAnswers[idx] === q.correctAnswer
                            ? 'text-green-600 font-semibold'
                            : 'text-red-600 font-semibold'
                        }>
                          Your answer: {userAnswers[idx] === -1 ? 'Time Up!' : q.options[userAnswers[idx]] || '—'}
                        </span>
                        {userAnswers[idx] !== q.correctAnswer && (
                          <span className="ml-2 text-green-700">(Correct: {q.options[q.correctAnswer]})</span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        💡 {q.explanation}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={restartQuiz}
                  className="bg-[var(--primary)] text-white font-bold py-3 px-6 rounded-full hover:bg-[var(--secondary)] transition-transform transform hover:scale-105"
                >
                  Restart Quiz
                </button>
                <a href="/game">
                  <button className="bg-gray-600 text-white font-bold py-3 px-6 rounded-full hover:bg-gray-700 transition-transform transform hover:scale-105">
                    Return to Lobby
                  </button>
                </a>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-2xl font-semibold text-[var(--primary)]">
                    Question {currentQuestionIndex + 1}/{filteredQuestions.length}
                  </h2>
                  <span className={`text-xs px-3 py-1 rounded-full ${
                    filteredQuestions[currentQuestionIndex].difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                    filteredQuestions[currentQuestionIndex].difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {filteredQuestions[currentQuestionIndex].difficulty.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-2">{filteredQuestions[currentQuestionIndex].category}</p>
                <p className="text-lg text-[var(--foreground)]">{filteredQuestions[currentQuestionIndex].question}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredQuestions[currentQuestionIndex].options.map((option, index) => {
                  let btnColor = 'bg-[var(--primary)] text-white';
                  if (selected !== null) {
                    if (index === filteredQuestions[currentQuestionIndex].correctAnswer) {
                      btnColor = 'bg-green-500 text-white';
                    } else if (index === selected) {
                      btnColor = 'bg-red-500 text-white';
                    } else {
                      btnColor = 'bg-gray-200 text-[var(--foreground)]';
                    }
                  }
                  return (
                    <button
                      key={index}
                      onClick={() => selected === null && handleAnswerOptionClick(index)}
                      className={
                        `${btnColor} p-4 rounded-lg transition font-semibold transform ` +
                        (selected === null
                          ? 'hover:bg-blue-400 focus:outline-none hover:scale-105 hover:shadow-lg active:scale-95'
                          : 'cursor-default')
                      }
                      disabled={selected !== null}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              {showExplanation && (
                <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-900 rounded animate-fade-in">
                  <span className="font-semibold">Hint:</span> {filteredQuestions[currentQuestionIndex].explanation}
                </div>
              )}
            </>
          )}
          </>
        )}
        </div>
      </main>
      <footer className="bg-[var(--navbar-bg)] shadow-md p-4 text-center" style={{ boxShadow: 'var(--navbar-shadow)' }}>
        <p className="text-[var(--foreground)] opacity-70">© 2026 Financial Literacy Adventure</p>
      </footer>
    </div>
  );
};

export default QuizPage;
