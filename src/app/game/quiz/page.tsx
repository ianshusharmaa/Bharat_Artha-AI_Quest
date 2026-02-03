'use client';

import React, { useState } from 'react';
import { questions } from '@/data/questions';

const QuizPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswerOptionClick = (selectedAnswerIndex: number) => {
    setSelected(selectedAnswerIndex);
    // Play sound
    const isCorrect = selectedAnswerIndex === questions[currentQuestionIndex].correctAnswer;
    const audio = new Audio(isCorrect ? '/sounds/correct.mp3' : '/sounds/wrong.mp3');
    audio.play();
    setShowExplanation(true);
    setTimeout(() => {
      if (isCorrect) {
        setScore(score + 1);
      }
      setUserAnswers([...userAnswers, selectedAnswerIndex]);
      setShowExplanation(false);
      setSelected(null);
      const nextQuestion = currentQuestionIndex + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestionIndex(nextQuestion);
      } else {
        setShowScore(true);
      }
    }, 1800);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScore(false);
    setUserAnswers([]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)]">
      <header className="bg-[var(--navbar-bg)] shadow-md p-4" style={{ boxShadow: 'var(--navbar-shadow)' }}>
        <h1 className="text-2xl font-bold text-[var(--primary)]">Quiz Mode</h1>
      </header>
      <main className="flex-grow p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full mx-auto bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl shadow-lg p-8">
          {/* Progress Bar */}
          {!showScore && (
            <div className="w-full h-3 bg-gray-200 rounded-full mb-6">
              <div
                className="h-3 bg-[var(--primary)] rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }}
              ></div>
            </div>
          )}
          {showScore ? (
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4 text-[var(--primary)]">You scored {score} out of {questions.length}!</h2>
              <div className="mb-6 text-left">
                <h3 className="text-xl font-semibold mb-2 text-[var(--primary)]">Your Answers:</h3>
                <ul className="space-y-2">
                  {questions.map((q, idx) => (
                    <li key={idx} className="p-3 rounded-lg bg-white border border-gray-200">
                      <div className="font-medium text-[var(--foreground)]">Q{idx + 1}: {q.question}</div>
                      <div>
                        <span className={
                          userAnswers[idx] === q.correctAnswer
                            ? 'text-green-600 font-semibold'
                            : 'text-red-600 font-semibold'
                        }>
                          Your answer: {q.options[userAnswers[idx]] || '—'}
                        </span>
                        {userAnswers[idx] !== q.correctAnswer && (
                          <span className="ml-2 text-green-700">(Correct: {q.options[q.correctAnswer]})</span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={restartQuiz}
                className="bg-[var(--primary)] text-white font-bold py-3 px-6 rounded-full hover:bg-[var(--secondary)] transition-transform transform hover:scale-105"
              >
                Restart Quiz
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2 text-[var(--primary)]">Question {currentQuestionIndex + 1}/{questions.length}</h2>
                <p className="text-lg text-[var(--foreground)]">{questions[currentQuestionIndex].question}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {questions[currentQuestionIndex].options.map((option, index) => {
                  let btnColor = 'bg-[var(--primary)] text-white';
                  if (selected !== null) {
                    if (index === questions[currentQuestionIndex].correctAnswer) {
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
                  <span className="font-semibold">Hint:</span> {questions[currentQuestionIndex].explanation}
                </div>
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
