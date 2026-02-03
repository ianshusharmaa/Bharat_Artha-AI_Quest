'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

interface Question {
  id: number;
  text: string;
  options: string[];
  correct: number;
  steps: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    text: 'You got ₹1000. What is the best first step?',
    options: ['Spend it all', 'Create a budget', 'Buy a new phone', 'Lend to a friend'],
    correct: 1,
    steps: 2,
    explanation: 'A budget helps you plan spending and saving.'
  },
  {
    id: 2,
    text: 'What is an emergency fund used for?',
    options: ['Shopping', 'Travel', 'Unexpected expenses', 'Games'],
    correct: 2,
    steps: 3,
    explanation: 'Emergency funds cover sudden expenses.'
  },
  {
    id: 3,
    text: 'Which is a good saving habit?',
    options: ['Save a fixed % of income', 'Spend first', 'Borrow often', 'Ignore bills'],
    correct: 0,
    steps: 4,
    explanation: 'Saving a fixed percentage builds consistency.'
  },
  {
    id: 4,
    text: 'Credit card APR means?',
    options: ['Annual Percentage Rate', 'Average Payment Rule', 'Account Payment Ratio', 'Annual Pay Return'],
    correct: 0,
    steps: 5,
    explanation: 'APR is the yearly interest rate on borrowed money.'
  },
  {
    id: 5,
    text: 'Best way to reduce risk in investing?',
    options: ['All money in one stock', 'Diversification', 'No research', 'Borrow to invest'],
    correct: 1,
    steps: 6,
    explanation: 'Diversification reduces risk.'
  },
  {
    id: 6,
    text: 'What is the 50/30/20 rule?',
    options: ['Needs/Wants/Savings', 'Wants/Needs/Savings', 'Savings/Needs/Wants', 'Invest/Spend/Save'],
    correct: 0,
    steps: 2,
    explanation: '50% needs, 30% wants, 20% savings.'
  },
  {
    id: 7,
    text: 'Why is paying bills on time important?',
    options: ['Build credit', 'Avoid late fees', 'Both', 'Neither'],
    correct: 2,
    steps: 3,
    explanation: 'On-time payments build credit and avoid fees.'
  },
  {
    id: 8,
    text: 'What is compound interest?',
    options: ['Interest on interest', 'Only on principal', 'A fee', 'A tax'],
    correct: 0,
    steps: 4,
    explanation: 'You earn interest on your interest too.'
  }
];

const snakes: Record<number, number> = {
  17: 7,
  22: 13,
  28: 19
};

const ladders: Record<number, number> = {
  3: 11,
  8: 16,
  14: 24
};

const boardSize = 30;

const SnakeLadderPage = () => {
  const [position, setPosition] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [message, setMessage] = useState('Answer questions to move forward.');
  const [gameOver, setGameOver] = useState(false);
  const [money, setMoney] = useState(1000);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [lastMoneyChange, setLastMoneyChange] = useState(0);

  const shuffledQuestions = useMemo(() => {
    return [...questions].sort(() => Math.random() - 0.5);
  }, []);

  const question = shuffledQuestions[currentQuestionIndex % shuffledQuestions.length];

  useEffect(() => {
    const soundSetting = localStorage.getItem('soundEnabled');
    if (soundSetting !== null) {
      setSoundEnabled(JSON.parse(soundSetting));
    }
  }, []);

  const board = useMemo(() => {
    return Array.from({ length: boardSize }, (_, i) => i + 1);
  }, []);

  const movePlayer = (steps: number) => {
    let next = position + steps;
    if (next > boardSize) {
      next = boardSize;
    }

    if (ladders[next]) {
      setMessage(`Ladder! You climb from ${next} to ${ladders[next]}.`);
      next = ladders[next];
    } else if (snakes[next]) {
      setMessage(`Snake! You slide from ${next} to ${snakes[next]}.`);
      next = snakes[next];
    } else {
      setMessage(`Moved ${steps} steps.`);
    }

    setPosition(next);
    if (next === boardSize) {
      setGameOver(true);
    }
  };

  const handleAnswer = (index: number) => {
    if (selected !== null || gameOver) return;

    setSelected(index);
    const correct = index === question.correct;
    setIsCorrect(correct);
    setShowResult(true);

    if (soundEnabled) {
      const audio = new Audio(correct ? '/sounds/correct.wav' : '/sounds/wrong.mp3');
      audio.play();
    }

    const moneyChange = correct ? 150 + streak * 20 : -120;
    setLastMoneyChange(moneyChange);
    setMoney(prev => prev + moneyChange);
    if (correct) {
      setCorrectCount(prev => prev + 1);
      setStreak(prev => prev + 1);
    } else {
      setWrongCount(prev => prev + 1);
      setStreak(0);
    }

    setTimeout(() => {
      if (correct) {
        movePlayer(question.steps);
      } else {
        setMessage('Wrong answer. No move this turn.');
      }

      setSelected(null);
      setShowResult(false);
      setCurrentQuestionIndex(prev => prev + 1);
    }, 1500);
  };

  const restart = () => {
    setPosition(1);
    setCurrentQuestionIndex(0);
    setSelected(null);
    setShowResult(false);
    setIsCorrect(false);
    setMessage('Answer questions to move forward.');
    setGameOver(false);
    setMoney(1000);
    setCorrectCount(0);
    setWrongCount(0);
    setStreak(0);
    setLastMoneyChange(0);
  };

  const totalAnswered = correctCount + wrongCount;
  const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;
  const profit = money - 1000;

  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)]">
      <header className="bg-[var(--navbar-bg)] shadow-md p-4" style={{ boxShadow: 'var(--navbar-shadow)' }}>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[var(--primary)]">Snake & Ladder: Q&A Mode</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const newValue = !soundEnabled;
                setSoundEnabled(newValue);
                localStorage.setItem('soundEnabled', JSON.stringify(newValue));
              }}
              className="bg-[var(--primary)] text-white px-4 py-2 rounded-lg hover:opacity-80"
            >
              {soundEnabled ? '🔊 Sound On' : '🔇 Sound Off'}
            </button>
          <Link href="/game">
            <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
              Back to Lobby
            </button>
          </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow p-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-[var(--primary)]">Board</h2>
              <div className="text-sm text-gray-600">Position: {position}/{boardSize}</div>
            </div>
            <div className="mb-4">
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-[var(--primary)] rounded-full transition-all duration-500"
                  style={{ width: `${(position / boardSize) * 100}%` }}
                ></div>
              </div>
              <div className="mt-2 flex justify-between text-xs text-gray-600">
                <span>Accuracy: {accuracy}%</span>
                <span>Streak: {streak}</span>
                <span>Money: ₹{money}</span>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {board.map((cell) => (
                <div
                  key={cell}
                  className={`relative h-16 rounded-lg border flex items-center justify-center text-sm font-semibold transition-all ${
                    cell === position ? 'bg-blue-500 text-white scale-105' : 'bg-gray-50 text-gray-700'
                  }`}
                >
                  {cell}
                  {ladders[cell] && <span className="absolute top-1 right-1 text-green-600">🪜</span>}
                  {snakes[cell] && <span className="absolute top-1 right-1 text-red-600">🐍</span>}
                </div>
              ))}
            </div>
            <div className="mt-4 text-sm text-gray-700">
              <p>🪜 Ladders: {Object.keys(ladders).join(', ')} → {Object.values(ladders).join(', ')}</p>
              <p>🐍 Snakes: {Object.keys(snakes).join(', ')} → {Object.values(snakes).join(', ')}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            {gameOver ? (
              <div className="text-center">
                <div className="text-5xl mb-3">🏠</div>
                <h2 className="text-2xl font-bold text-[var(--primary)] mb-2">You reached Home!</h2>
                <p className="text-gray-700 mb-4">Well done! You completed the Snake & Ladder journey.</p>
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>Final Money: <span className={`font-bold ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>₹{money}</span></div>
                    <div>Profit/Loss: <span className={`font-bold ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>{profit >= 0 ? '+' : ''}₹{profit}</span></div>
                    <div>Accuracy: <span className="font-bold">{accuracy}%</span></div>
                    <div>Correct: <span className="font-bold">{correctCount}</span> | Wrong: <span className="font-bold">{wrongCount}</span></div>
                  </div>
                </div>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={restart}
                    className="bg-[var(--primary)] text-white font-bold py-3 px-6 rounded-full hover:bg-[var(--secondary)]"
                  >
                    Play Again
                  </button>
                  <Link href="/game">
                    <button className="bg-gray-600 text-white font-bold py-3 px-6 rounded-full hover:bg-gray-700">
                      Return to Lobby
                    </button>
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-[var(--primary)]">Question {currentQuestionIndex + 1} (Move {question.steps} steps)</h2>
                  <p className="text-lg text-[var(--foreground)] mt-2">{question.text}</p>
                </div>
                <div className="grid grid-cols-1 gap-3 mb-4">
                  {question.options.map((opt, idx) => {
                    let btnColor = 'bg-[var(--primary)] text-white';
                    if (selected !== null) {
                      if (idx === question.correct) {
                        btnColor = 'bg-green-500 text-white';
                      } else if (idx === selected) {
                        btnColor = 'bg-red-500 text-white';
                      } else {
                        btnColor = 'bg-gray-200 text-gray-600';
                      }
                    }
                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        disabled={selected !== null}
                        className={`${btnColor} p-3 rounded-lg font-semibold transition-all`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {showResult && (
                  <div className={`p-4 rounded-lg border-l-4 ${
                    isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
                  }`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl">{isCorrect ? '✅' : '❌'}</span>
                      <span className="font-bold">{isCorrect ? 'Correct!' : 'Wrong Answer'}</span>
                      <span className={`ml-auto font-bold ${lastMoneyChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {lastMoneyChange >= 0 ? '+' : ''}₹{lastMoneyChange}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">💡 {question.explanation}</p>
                  </div>
                )}

                <div className="mt-4 text-sm text-gray-700">
                  <p>Note: Correct answer moves you forward by the question step value.</p>
                  <p className="mt-2 font-semibold">Status: {message}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SnakeLadderPage;
