'use client';

import React, { useState, useEffect } from 'react';
import { questions, Question } from '@/data/questions';

const translations = {
  hi: {
    title: 'क्विज मोड',
    soundOn: '🔊 ध्वनि चालू',
    soundOff: '🔇 ध्वनि बंद',
    selectDifficulty: 'कठिनाई चुनें',
    easy: 'आसान',
    beginners: 'शुरुआती के लिए परफेक्ट',
    medium: 'माध्यम',
    testKnowledge: 'अपने ज्ञान को परखें',
    hard: 'कठिन',
    expertChallenge: 'विशेषज्ञ स्तर की चुनौती',
    allLevels: 'सभी स्तर',
    mixed: 'मिश्रित कठिनाई',
    timeLeft: 'समय बाकी:',
    progressBar: 'प्रगति',
    question: 'प्रश्न',
    scored: 'आपने बनाए',
    out: 'में से',
    difficulty: 'कठिनाई:',
    percentage: 'प्रतिशत:',
    yourAnswers: 'आपके उत्तर:',
    yourAnswer: 'आपका उत्तर:',
    correct: 'सही:',
    timeUp: 'समय समाप्त!',
    hint: 'संकेत:',
    restartQuiz: 'क्विज पुनः शुरू करें',
    returnLobby: 'लॉबी में वापस जाएं',
    category: 'श्रेणी',
    footer: '© 2026 वित्तीय साक्षरता अभियान'
  },
  en: {
    title: 'Quiz Mode',
    soundOn: '🔊 Sound On',
    soundOff: '🔇 Sound Off',
    selectDifficulty: 'Select Difficulty',
    easy: 'Easy',
    beginners: 'Perfect for beginners',
    medium: 'Medium',
    testKnowledge: 'Test your knowledge',
    hard: 'Hard',
    expertChallenge: 'Expert level challenge',
    allLevels: 'All Levels',
    mixed: 'Mixed difficulty',
    timeLeft: 'Time Left:',
    progressBar: 'Progress',
    question: 'Question',
    scored: 'You scored',
    out: 'out of',
    difficulty: 'Difficulty:',
    percentage: 'Percentage:',
    yourAnswers: 'Your Answers:',
    yourAnswer: 'Your answer:',
    correct: 'Correct:',
    timeUp: 'Time Up!',
    hint: 'Hint:',
    restartQuiz: 'Restart Quiz',
    returnLobby: 'Return to Lobby',
    category: 'Category',
    footer: '© 2026 Financial Literacy Adventure'
  }
};

const QuizPage = () => {
  const [lang, setLang] = useState<'hi' | 'en'>('hi');
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

  const t = translations[lang];

  const difficultyLabels = {
    easy: t.easy,
    medium: t.medium,
    hard: t.hard,
    all: t.allLevels
  } as const;

  const speakFeedback = (isCorrect: boolean) => {
    if (typeof window === 'undefined') return;
    const synth = window.speechSynthesis;
    if (!synth) return;
    const enText = isCorrect ? 'Correct answer.' : 'Wrong answer.';
    const hiText = isCorrect ? 'आपका उत्तर सही है।' : 'आपका उत्तर गलत है।';
    try {
      synth.cancel();
      const enUtterance = new SpeechSynthesisUtterance(enText);
      enUtterance.lang = 'en-US';
      enUtterance.rate = 0.95;
      enUtterance.pitch = 1;
      enUtterance.volume = 1;

      const hiUtterance = new SpeechSynthesisUtterance(hiText);
      hiUtterance.lang = 'hi-IN';
      hiUtterance.rate = 0.95;
      hiUtterance.pitch = 1;
      hiUtterance.volume = 1;

      synth.speak(enUtterance);
      synth.speak(hiUtterance);
    } catch {
      // ignore audio errors
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const savedLang = localStorage.getItem('lang') as 'hi' | 'en' | null;
    if (savedLang === 'hi' || savedLang === 'en') {
      setLang(savedLang);
    }
  }, []);

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

  const setLanguage = (newLang: 'hi' | 'en') => {
    setLang(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('lang', newLang);
    }
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
    // Speak feedback (English + Hindi)
    const isCorrect = selectedAnswerIndex === filteredQuestions[currentQuestionIndex].correctAnswer;
    if (soundEnabled) {
      speakFeedback(isCorrect);
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
        <h1 className="text-2xl font-bold text-[var(--primary)]">{t.title}</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setLanguage('hi')}
            className={`px-3 py-1 rounded ${lang === 'hi' ? 'bg-[var(--primary)] text-white' : 'bg-gray-300 text-black'}`}
          >
            हिन्दी
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={`px-3 py-1 rounded ${lang === 'en' ? 'bg-[var(--primary)] text-white' : 'bg-gray-300 text-black'}`}
          >
            English
          </button>
          <button
            onClick={toggleSound}
            className="bg-[var(--primary)] text-white px-4 py-2 rounded-lg hover:opacity-80 transition"
          >
            {soundEnabled ? t.soundOn : t.soundOff}
          </button>
        </div>
      </header>
      <main className="flex-grow p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full mx-auto bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl shadow-lg p-8">
          {showDifficultySelect ? (
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6 text-[var(--primary)]">{t.selectDifficulty}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => startQuiz('easy')}
                  className="bg-green-500 text-white p-6 rounded-lg hover:bg-green-600 transition transform hover:scale-105"
                >
                  <h3 className="text-2xl font-bold mb-2">{t.easy}</h3>
                  <p className="text-sm">{t.beginners}</p>
                </button>
                <button
                  onClick={() => startQuiz('medium')}
                  className="bg-yellow-500 text-white p-6 rounded-lg hover:bg-yellow-600 transition transform hover:scale-105"
                >
                  <h3 className="text-2xl font-bold mb-2">{t.medium}</h3>
                  <p className="text-sm">{t.testKnowledge}</p>
                </button>
                <button
                  onClick={() => startQuiz('hard')}
                  className="bg-red-500 text-white p-6 rounded-lg hover:bg-red-600 transition transform hover:scale-105"
                >
                  <h3 className="text-2xl font-bold mb-2">{t.hard}</h3>
                  <p className="text-sm">{t.expertChallenge}</p>
                </button>
                <button
                  onClick={() => startQuiz('all')}
                  className="bg-purple-500 text-white p-6 rounded-lg hover:bg-purple-600 transition transform hover:scale-105"
                >
                  <h3 className="text-2xl font-bold mb-2">{t.allLevels}</h3>
                  <p className="text-sm">{t.mixed}</p>
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Timer */}
              {!showScore && (
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-semibold text-[var(--primary)]">{t.timeLeft}</span>
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
              <h2 className="text-3xl font-bold mb-4 text-[var(--primary)]">{t.scored} {score} {t.out} {filteredQuestions.length}!</h2>
              <div className="mb-4">
                <p className="text-lg">
                  {t.difficulty} <span className="font-bold capitalize">{difficultyLabels[difficulty]}</span>
                </p>
                <p className="text-lg">
                  {t.percentage} <span className="font-bold">{Math.round((score / filteredQuestions.length) * 100)}%</span>
                </p>
              </div>
              <div className="mb-6 text-left max-h-96 overflow-y-auto">
                <h3 className="text-xl font-semibold mb-2 text-[var(--primary)]">{t.yourAnswers}</h3>
                <ul className="space-y-2">
                  {filteredQuestions.map((q, idx) => (
                    <li key={idx} className="p-3 rounded-lg bg-white border border-gray-200">
                      <div className="font-medium text-[var(--foreground)] mb-1">
                        Q{idx + 1}: {q.question[lang]}
                        <span className={`ml-2 text-xs px-2 py-1 rounded ${
                          q.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                          q.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {difficultyLabels[q.difficulty]}
                        </span>
                      </div>
                      <div>
                        <span className={
                          userAnswers[idx] === q.correctAnswer
                            ? 'text-green-600 font-semibold'
                            : 'text-red-600 font-semibold'
                        }>
                          {t.yourAnswer} {userAnswers[idx] === -1 ? t.timeUp : q.options[lang][userAnswers[idx]] || '—'}
                        </span>
                        {userAnswers[idx] !== q.correctAnswer && (
                          <span className="ml-2 text-green-700">({t.correct} {q.options[lang][q.correctAnswer]})</span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        💡 {q.explanation[lang]}
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
                  {t.restartQuiz}
                </button>
                <a href="/game">
                  <button className="bg-gray-600 text-white font-bold py-3 px-6 rounded-full hover:bg-gray-700 transition-transform transform hover:scale-105">
                    {t.returnLobby}
                  </button>
                </a>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-2xl font-semibold text-[var(--primary)]">
                    {t.question} {currentQuestionIndex + 1}/{filteredQuestions.length}
                  </h2>
                  <span className={`text-xs px-3 py-1 rounded-full ${
                    filteredQuestions[currentQuestionIndex].difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                    filteredQuestions[currentQuestionIndex].difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {difficultyLabels[filteredQuestions[currentQuestionIndex].difficulty]}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-2">{t.category}: {filteredQuestions[currentQuestionIndex].category[lang]}</p>
                <p className="text-lg text-[var(--foreground)]">{filteredQuestions[currentQuestionIndex].question[lang]}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredQuestions[currentQuestionIndex].options[lang].map((option, index) => {
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
                  <span className="font-semibold">{t.hint}</span> {filteredQuestions[currentQuestionIndex].explanation[lang]}
                </div>
              )}
            </>
          )}
          </>
        )}
        </div>
      </main>
      <footer className="bg-[var(--navbar-bg)] shadow-md p-4 text-center" style={{ boxShadow: 'var(--navbar-shadow)' }}>
        <p className="text-[var(--foreground)] opacity-70">{t.footer}</p>
      </footer>
    </div>
  );
};

export default QuizPage;
