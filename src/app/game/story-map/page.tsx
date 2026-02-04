'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  moneyEffect: { correct: number; wrong: number };
  explanation: string;
}

const questions: Question[] = [
  {
    question: 'You found ₹500 on the street. What should you do?',
    options: ['Keep it all', 'Try to find the owner', 'Donate to charity', 'Share with friends'],
    correctAnswer: 1,
    moneyEffect: { correct: 50, wrong: -100 },
    explanation: 'Returning money shows integrity. The owner gave you a reward!'
  },
  {
    question: 'Your friend wants to borrow ₹1000. What do you do?',
    options: ['Lend without questions', 'Politely decline', 'Lend with a repayment plan', 'Give as a gift'],
    correctAnswer: 2,
    moneyEffect: { correct: 200, wrong: -500 },
    explanation: 'Setting clear terms protects both parties. Your friend repaid on time!'
  },
  {
    question: 'There\'s a 50% sale on a gadget you want. You have savings. What do you do?',
    options: ['Buy it immediately', 'Check if you really need it', 'Wait for a better deal', 'Buy and sell later'],
    correctAnswer: 1,
    moneyEffect: { correct: 100, wrong: -300 },
    explanation: 'Needs before wants! You saved money by not buying unnecessary items.'
  },
  {
    question: 'You received ₹2000 as a gift. What\'s the best option?',
    options: ['Spend it all now', 'Save 50%, spend 50%', 'Save it all', 'Invest in stocks'],
    correctAnswer: 1,
    moneyEffect: { correct: 300, wrong: -200 },
    explanation: 'Balancing saving and enjoyment is key to financial wellness!'
  },
  {
    question: 'Your phone broke. Repair costs ₹800. What do you do?',
    options: ['Use emergency fund', 'Buy new phone on EMI', 'Ask family for money', 'Ignore and buy later'],
    correctAnswer: 0,
    moneyEffect: { correct: 150, wrong: -400 },
    explanation: 'Emergency funds are for emergencies! You handled it well.'
  },
  {
    question: 'You have ₹3000 saved. A friend offers an investment opportunity. What do you do?',
    options: ['Invest all ₹3000', 'Research first, then invest small', 'Decline politely', 'Ask to borrow more and invest'],
    correctAnswer: 1,
    moneyEffect: { correct: 400, wrong: -600 },
    explanation: 'Research and diversification are keys to smart investing!'
  },
  {
    question: 'Monthly budget planning: How should you allocate your income?',
    options: ['Spend all, save nothing', '70% expenses, 30% savings', '50% needs, 30% wants, 20% savings', 'Save all, spend nothing'],
    correctAnswer: 2,
    moneyEffect: { correct: 250, wrong: -150 },
    explanation: 'The 50/30/20 rule is a balanced approach to budgeting!'
  },
  {
    question: 'Credit card company offers you a card. What do you do?',
    options: ['Accept and max it out', 'Accept and use responsibly', 'Decline completely', 'Accept but never use'],
    correctAnswer: 1,
    moneyEffect: { correct: 200, wrong: -500 },
    explanation: 'Responsible credit card use builds credit score and gives benefits!'
  }
];

const StoryMapPage = () => {
  const [position, setPosition] = useState(0);
  const [money, setMoney] = useState(1000);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showQuestion, setShowQuestion] = useState(true);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [lastMoneyChange, setLastMoneyChange] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);

  const totalSteps = shuffledQuestions.length || questions.length;
  const pathPositions = Array.from({ length: totalSteps + 1 }, (_, i) => i);

  useEffect(() => {
    const soundSetting = localStorage.getItem('soundEnabled');
    if (soundSetting !== null) {
      setSoundEnabled(JSON.parse(soundSetting));
    }
  }, []);

  useEffect(() => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
  }, []);

  const handleAnswer = (answerIndex: number) => {
    if (selected !== null) return;
    
    setSelected(answerIndex);
    const current = shuffledQuestions[currentQuestion] || questions[currentQuestion];
    const correct = answerIndex === current.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    if (soundEnabled) {
      const audio = new Audio(correct ? '/sounds/correct.wav' : '/sounds/wrong.mp3');
      audio.play();
    }

    const moneyChange = correct 
      ? current.moneyEffect.correct 
      : current.moneyEffect.wrong;
    setLastMoneyChange(moneyChange);
    if (correct) {
      setCorrectCount(prev => prev + 1);
    } else {
      setWrongCount(prev => prev + 1);
    }
    
    setMoney(prev => prev + moneyChange);

    setTimeout(() => {
      if (currentQuestion < (shuffledQuestions.length || questions.length) - 1) {
        setPosition(position + 1);
        setCurrentQuestion(currentQuestion + 1);
        setSelected(null);
        setShowResult(false);
        setShowQuestion(true);
      } else {
        setPosition(position + 1);
        setGameOver(true);
      }
    }, 2500);
  };

  const restartGame = () => {
    setPosition(0);
    setMoney(1000);
    setCurrentQuestion(0);
    setShowQuestion(true);
    setSelected(null);
    setShowResult(false);
    setGameOver(false);
    setCorrectCount(0);
    setWrongCount(0);
    setLastMoneyChange(0);
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
  };

  const profit = money - 1000;
  const totalAnswered = correctCount + wrongCount;
  const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      <header className="bg-[var(--navbar-bg)] shadow-md p-4" style={{ boxShadow: 'var(--navbar-shadow)' }}>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[var(--primary)]">Financial Journey Map</h1>
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

      <main className="flex-grow p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Map Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="mb-4 text-center">
              <h2 className="text-xl font-bold text-[var(--primary)] mb-2">Journey Progress</h2>
              <div className="flex justify-center gap-4 text-lg">
                <span className="font-semibold">Step: {position + 1}/{totalSteps + 1}</span>
                <span className={`font-bold ${money >= 1000 ? 'text-green-600' : 'text-red-600'}`}>
                  Money: ₹{money}
                </span>
              </div>
              <div className="mt-4">
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-[var(--primary)] rounded-full transition-all duration-500"
                    style={{ width: `${(position / totalSteps) * 100}%` }}
                  ></div>
                </div>
                <div className="mt-2 flex justify-between text-xs text-gray-600">
                  <span>Accuracy: {accuracy}%</span>
                  <span>Correct: {correctCount} | Wrong: {wrongCount}</span>
                </div>
              </div>
            </div>

            {/* Visual Map */}
            <div className="relative bg-gradient-to-r from-green-100 via-yellow-100 to-blue-100 rounded-xl p-8 overflow-x-auto">
              <div className="flex items-center justify-between min-w-max">
                {pathPositions.map((step, idx) => (
                  <React.Fragment key={step}>
                    {/* Path Node */}
                    <div className="flex flex-col items-center">
                      <div className={`relative w-16 h-16 rounded-full border-4 flex items-center justify-center transition-all duration-500 ${
                        idx === position 
                          ? 'bg-blue-500 border-blue-700 scale-125 animate-pulse' 
                          : idx < position 
                          ? 'bg-green-400 border-green-600' 
                          : 'bg-gray-300 border-gray-400'
                      }`}>
                        {idx === position && (
                          <>
                            <span className="text-3xl">🧑</span>
                            <div className="absolute -top-8 bg-yellow-400 text-black px-2 py-1 rounded text-xs font-bold whitespace-nowrap">
                              ₹{money}
                            </div>
                          </>
                        )}
                        {idx === 0 && idx !== position && <span className="text-2xl">🏁</span>}
                        {idx === totalSteps && idx !== position && <span className="text-2xl">🏠</span>}
                        {idx > 0 && idx < totalSteps && idx !== position && (
                          <span className="text-xl">{idx < position ? '✓' : idx}</span>
                        )}
                      </div>
                      <span className="text-xs mt-2 font-semibold">
                        {idx === 0 ? 'Start' : idx === totalSteps ? 'Home' : `Q${idx}`}
                      </span>
                    </div>
                    
                    {/* Path Connector */}
                    {idx < pathPositions.length - 1 && (
                      <div className={`h-1 flex-1 mx-2 transition-all duration-500 ${
                        idx < position ? 'bg-green-500' : 'bg-gray-300'
                      }`}></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Question Section */}
          {!gameOver && showQuestion && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-[var(--primary)] mb-4">
                  Question {currentQuestion + 1}
                </h3>
                <div className="flex flex-wrap gap-3 text-sm mb-3">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">Money: ₹{money}</span>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">Correct: {correctCount}</span>
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">Wrong: {wrongCount}</span>
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">Accuracy: {accuracy}%</span>
                </div>
                <p className="text-lg text-[var(--foreground)]">
                  {(shuffledQuestions[currentQuestion] || questions[currentQuestion]).question}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {(shuffledQuestions[currentQuestion] || questions[currentQuestion]).options.map((option, idx) => {
                  let btnColor = 'bg-[var(--primary)] text-white';
                  if (selected !== null) {
                    if (idx === (shuffledQuestions[currentQuestion] || questions[currentQuestion]).correctAnswer) {
                      btnColor = 'bg-green-500 text-white';
                    } else if (idx === selected) {
                      btnColor = 'bg-red-500 text-white';
                    } else {
                      btnColor = 'bg-gray-300 text-gray-600';
                    }
                  }
                  
                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      disabled={selected !== null}
                      className={`${btnColor} p-4 rounded-lg font-semibold transition-all transform hover:scale-105 disabled:cursor-not-allowed`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {showResult && (
                <div className={`p-4 rounded-lg border-l-4 ${
                  isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{isCorrect ? '✅' : '❌'}</span>
                    <span className="font-bold text-lg">
                      {isCorrect ? 'Correct!' : 'Wrong Answer'}
                    </span>
                    <span className={`ml-auto font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                      {lastMoneyChange >= 0 ? '+' : ''}₹{lastMoneyChange}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">
                    💡 {(shuffledQuestions[currentQuestion] || questions[currentQuestion]).explanation}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Game Over Section */}
          {gameOver && (
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="text-6xl mb-4">🏠</div>
              <h2 className="text-3xl font-bold text-[var(--primary)] mb-6">
                Journey Complete!
              </h2>
              
              <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 mb-6">
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-gray-600 mb-1">Starting Money</p>
                    <p className="text-2xl font-bold">₹1000</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Final Money</p>
                    <p className={`text-2xl font-bold ${money >= 1000 ? 'text-green-600' : 'text-red-600'}`}>
                      ₹{money}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">
                      {profit >= 0 ? 'Profit 🎉' : 'Loss 😞'}
                    </p>
                    <p className={`text-3xl font-bold ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {profit >= 0 ? '+' : ''}₹{profit}
                    </p>
                  </div>
                </div>
                <div className="mt-4 text-center text-sm text-gray-600">
                  Accuracy: {accuracy}% • Correct: {correctCount} • Wrong: {wrongCount}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3 text-[var(--primary)]">Performance Summary</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  {profit >= 800 && (
                    <p className="text-lg">🌟 Excellent! You made great financial decisions!</p>
                  )}
                  {profit >= 400 && profit < 800 && (
                    <p className="text-lg">👍 Good job! You managed your money well!</p>
                  )}
                  {profit >= 0 && profit < 400 && (
                    <p className="text-lg">✅ Not bad! Keep learning and improving!</p>
                  )}
                  {profit < 0 && profit >= -500 && (
                    <p className="text-lg">⚠️ You lost some money. Review your choices!</p>
                  )}
                  {profit < -500 && (
                    <p className="text-lg">❌ Tough journey! Learn from these mistakes!</p>
                  )}
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={restartGame}
                  className="bg-[var(--primary)] text-white font-bold py-3 px-6 rounded-full hover:bg-[var(--secondary)] transition-transform transform hover:scale-105"
                >
                  Play Again
                </button>
                <a href="/game">
                  <button className="bg-gray-600 text-white font-bold py-3 px-6 rounded-full hover:bg-gray-700 transition-transform transform hover:scale-105">
                    Return to Lobby
                  </button>
                </a>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default StoryMapPage;
