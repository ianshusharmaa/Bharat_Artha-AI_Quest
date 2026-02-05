'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface LocalizedText {
  en: string;
  hi: string;
}

interface Question {
  question: LocalizedText;
  options: { en: string[]; hi: string[] };
  correctAnswer: number;
  moneyEffect: { correct: number; wrong: number };
  explanation: LocalizedText;
}

const translations = {
  hi: {
    title: 'वित्तीय यात्रा मानचित्र',
    soundOn: '🔊 ध्वनि चालू',
    soundOff: '🔇 ध्वनि बंद',
    backToLobby: 'लॉबी में वापस जाएं',
    journeyProgress: 'यात्रा की प्रगति',
    step: 'चरण',
    money: 'पैसा',
    start: 'शुरुआत',
    home: 'घर',
    questionLabel: 'प्रश्न',
    moneyLabel: 'पैसा',
    correctLabel: 'सही',
    wrongLabel: 'गलत',
    accuracyLabel: 'सटीकता',
    selectAnswer: 'उत्तर चुनें',
    correctResult: 'सही!',
    wrongResult: 'गलत उत्तर',
    youEarned: 'आपने अर्जित किए',
    youLost: 'आपने खोए',
    gameOver: 'खेल समाप्त!',
    finalStats: 'अंतिम आंकड़े',
    totalQuestions: 'कुल प्रश्न',
    accuracy: 'सटीकता',
    journeyComplete: 'यात्रा पूरी हुई!',
    startingMoney: 'शुरुआती पैसा',
    finalMoney: 'अंतिम पैसा',
    performanceSummary: 'प्रदर्शन सारांश',
    excellent: '🌟 शानदार! आपने शानदार वित्तीय फैसले लिए!',
    goodJob: '👍 अच्छा काम! आपने पैसे को अच्छे से संभाला!',
    notBad: '✅ बुरा नहीं! सीखते रहें और बेहतर बनें!',
    lostSome: '⚠️ कुछ पैसे कम हुए। अपने विकल्पों की समीक्षा करें!',
    toughJourney: '❌ कठिन यात्रा! इन गलतियों से सीखें!',
    totalMoneyEarned: 'कुल पैसा अर्जित',
    profit: 'लाभ',
    loss: 'नुकसान',
    finalBalance: 'अंतिम संतुलन',
    restart: 'खेल पुनः शुरू करें',
  },
  en: {
    title: 'Financial Journey Map',
    soundOn: '🔊 Sound On',
    soundOff: '🔇 Sound Off',
    backToLobby: 'Back to Lobby',
    journeyProgress: 'Journey Progress',
    step: 'Step',
    money: 'Money',
    start: 'Start',
    home: 'Home',
    questionLabel: 'Question',
    moneyLabel: 'Money',
    correctLabel: 'Correct',
    wrongLabel: 'Wrong',
    accuracyLabel: 'Accuracy',
    selectAnswer: 'Select Answer',
    correctResult: 'Correct!',
    wrongResult: 'Wrong Answer',
    youEarned: 'You earned',
    youLost: 'You lost',
    gameOver: 'Game Over!',
    finalStats: 'Final Stats',
    totalQuestions: 'Total Questions',
    accuracy: 'Accuracy',
    journeyComplete: 'Journey Complete!',
    startingMoney: 'Starting Money',
    finalMoney: 'Final Money',
    performanceSummary: 'Performance Summary',
    excellent: '🌟 Excellent! You made great financial decisions!',
    goodJob: '👍 Good job! You managed your money well!',
    notBad: '✅ Not bad! Keep learning and improving!',
    lostSome: '⚠️ You lost some money. Review your choices!',
    toughJourney: '❌ Tough journey! Learn from these mistakes!',
    totalMoneyEarned: 'Total Money Earned',
    profit: 'Profit',
    loss: 'Loss',
    finalBalance: 'Final Balance',
    restart: 'Restart Game',
  }
};

const questions: Question[] = [
  {
    question: {
      en: 'You found ₹500 on the street. What should you do?',
      hi: 'सड़क पर आपको ₹500 मिले। आपको क्या करना चाहिए?'
    },
    options: {
      en: ['Keep it all', 'Try to find the owner', 'Donate to charity', 'Share with friends'],
      hi: ['सारे पैसे रख लें', 'मालिक को ढूंढने की कोशिश करें', 'दान कर दें', 'दोस्तों के साथ बांट दें']
    },
    correctAnswer: 1,
    moneyEffect: { correct: 50, wrong: -100 },
    explanation: {
      en: 'Returning money shows integrity. The owner gave you a reward!',
      hi: 'पैसा लौटाना ईमानदारी दिखाता है। मालिक ने आपको इनाम दिया!'
    }
  },
  {
    question: {
      en: 'Your friend wants to borrow ₹1000. What do you do?',
      hi: 'आपका दोस्त ₹1000 उधार लेना चाहता है। आप क्या करेंगे?'
    },
    options: {
      en: ['Lend without questions', 'Politely decline', 'Lend with a repayment plan', 'Give as a gift'],
      hi: ['बिना पूछे उधार दे दें', 'विनम्रता से मना करें', 'चुकाने की योजना के साथ उधार दें', 'उपहार की तरह दे दें']
    },
    correctAnswer: 2,
    moneyEffect: { correct: 200, wrong: -500 },
    explanation: {
      en: 'Setting clear terms protects both parties. Your friend repaid on time!',
      hi: 'स्पष्ट शर्तें दोनों की सुरक्षा करती हैं। दोस्त ने समय पर लौटाया!'
    }
  },
  {
    question: {
      en: 'There\'s a 50% sale on a gadget you want. You have savings. What do you do?',
      hi: 'आपको पसंद का गैजेट 50% सेल में है और आपके पास बचत है। आप क्या करेंगे?'
    },
    options: {
      en: ['Buy it immediately', 'Check if you really need it', 'Wait for a better deal', 'Buy and sell later'],
      hi: ['तुरंत खरीद लें', 'देखें कि वाकई जरूरत है या नहीं', 'और बेहतर डील का इंतजार करें', 'खरीदकर बाद में बेचें']
    },
    correctAnswer: 1,
    moneyEffect: { correct: 100, wrong: -300 },
    explanation: {
      en: 'Needs before wants! You saved money by not buying unnecessary items.',
      hi: 'जरूरतें पहले! गैरज़रूरी चीज़ न खरीदकर आप पैसे बचाते हैं।'
    }
  },
  {
    question: {
      en: 'You received ₹2000 as a gift. What\'s the best option?',
      hi: 'आपको उपहार में ₹2000 मिले। सबसे अच्छा विकल्प क्या है?'
    },
    options: {
      en: ['Spend it all now', 'Save 50%, spend 50%', 'Save it all', 'Invest in stocks'],
      hi: ['अभी सब खर्च कर दें', '50% बचाएं, 50% खर्च करें', 'सारा बचा लें', 'शेयर में निवेश करें']
    },
    correctAnswer: 1,
    moneyEffect: { correct: 300, wrong: -200 },
    explanation: {
      en: 'Balancing saving and enjoyment is key to financial wellness!',
      hi: 'बचत और आनंद में संतुलन वित्तीय सेहत के लिए जरूरी है!'
    }
  },
  {
    question: {
      en: 'Your phone broke. Repair costs ₹800. What do you do?',
      hi: 'आपका फोन खराब हो गया। मरम्मत में ₹800 लगेंगे। आप क्या करेंगे?'
    },
    options: {
      en: ['Use emergency fund', 'Buy new phone on EMI', 'Ask family for money', 'Ignore and buy later'],
      hi: ['इमरजेंसी फंड का उपयोग करें', 'EMI पर नया फोन लें', 'परिवार से पैसे मांगें', 'अभी छोड़ दें और बाद में खरीदें']
    },
    correctAnswer: 0,
    moneyEffect: { correct: 150, wrong: -400 },
    explanation: {
      en: 'Emergency funds are for emergencies! You handled it well.',
      hi: 'इमरजेंसी फंड आपात स्थिति के लिए होता है—आपने सही किया।'
    }
  },
  {
    question: {
      en: 'You have ₹3000 saved. A friend offers an investment opportunity. What do you do?',
      hi: 'आपके पास ₹3000 की बचत है। दोस्त निवेश का अवसर देता है। आप क्या करेंगे?'
    },
    options: {
      en: ['Invest all ₹3000', 'Research first, then invest small', 'Decline politely', 'Ask to borrow more and invest'],
      hi: ['पूरा ₹3000 निवेश कर दें', 'पहले रिसर्च करें, फिर थोड़ा निवेश करें', 'विनम्रता से मना करें', 'और उधार लेकर निवेश करें']
    },
    correctAnswer: 1,
    moneyEffect: { correct: 400, wrong: -600 },
    explanation: {
      en: 'Research and diversification are keys to smart investing!',
      hi: 'रिसर्च और विविधीकरण समझदारी भरे निवेश की कुंजी हैं!'
    }
  },
  {
    question: {
      en: 'Monthly budget planning: How should you allocate your income?',
      hi: 'मासिक बजट बनाते समय आय का बंटवारा कैसे करें?'
    },
    options: {
      en: ['Spend all, save nothing', '70% expenses, 30% savings', '50% needs, 30% wants, 20% savings', 'Save all, spend nothing'],
      hi: ['सब खर्च करें, कुछ न बचाएं', '70% खर्च, 30% बचत', '50% जरूरतें, 30% इच्छाएँ, 20% बचत', 'सब बचाएं, कुछ न खर्च करें']
    },
    correctAnswer: 2,
    moneyEffect: { correct: 250, wrong: -150 },
    explanation: {
      en: 'The 50/30/20 rule is a balanced approach to budgeting!',
      hi: '50/30/20 नियम बजटिंग का संतुलित तरीका है!'
    }
  },
  {
    question: {
      en: 'Credit card company offers you a card. What do you do?',
      hi: 'क्रेडिट कार्ड कंपनी आपको कार्ड ऑफर करती है। आप क्या करेंगे?'
    },
    options: {
      en: ['Accept and max it out', 'Accept and use responsibly', 'Decline completely', 'Accept but never use'],
      hi: ['ले लें और पूरी सीमा तक खर्च करें', 'ले लें और जिम्मेदारी से इस्तेमाल करें', 'पूरी तरह मना कर दें', 'ले लें लेकिन कभी उपयोग न करें']
    },
    correctAnswer: 1,
    moneyEffect: { correct: 200, wrong: -500 },
    explanation: {
      en: 'Responsible credit card use builds credit score and gives benefits!',
      hi: 'जिम्मेदार उपयोग से क्रेडिट स्कोर बनता है और फायदे मिलते हैं!'
    }
  }
];

const StoryMapPage = () => {
  const [lang, setLang] = useState<'hi' | 'en'>('hi');
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

  const t = translations[lang];

  const playFeedbackSound = (isCorrect: boolean) => {
    if (typeof window === 'undefined') return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    try {
      const ctx = new AudioCtx();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.value = isCorrect ? 880 : 220;
      gainNode.gain.value = 0.12;
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      oscillator.start();
      oscillator.stop(ctx.currentTime + 0.18);
      oscillator.onended = () => ctx.close();
    } catch {
      // ignore audio errors
    }
  };

  const totalSteps = shuffledQuestions.length || questions.length;
  const pathPositions = Array.from({ length: totalSteps + 1 }, (_, i) => i);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const savedLang = localStorage.getItem('lang') as 'hi' | 'en' | null;
    if (savedLang === 'hi' || savedLang === 'en') {
      setLang(savedLang);
    }

    const soundSetting = localStorage.getItem('soundEnabled');
    if (soundSetting !== null) {
      setSoundEnabled(JSON.parse(soundSetting));
    }
  }, []);

  useEffect(() => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
  }, []);

  const setLanguage = (newLang: 'hi' | 'en') => {
    setLang(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('lang', newLang);
    }
  };

  const handleAnswer = (answerIndex: number) => {
    if (selected !== null) return;
    
    setSelected(answerIndex);
    const current = shuffledQuestions[currentQuestion] || questions[currentQuestion];
    const correct = answerIndex === current.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    if (soundEnabled) {
      playFeedbackSound(correct);
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
          <h1 className="text-2xl font-bold text-[var(--primary)]">{t.title}</h1>
          <div className="flex items-center gap-3">
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
              onClick={() => {
                const newValue = !soundEnabled;
                setSoundEnabled(newValue);
                localStorage.setItem('soundEnabled', JSON.stringify(newValue));
              }}
              className="bg-[var(--primary)] text-white px-4 py-2 rounded-lg hover:opacity-80"
            >
              {soundEnabled ? t.soundOn : t.soundOff}
            </button>
            <Link href="/game">
              <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
                {t.backToLobby}
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
              <h2 className="text-xl font-bold text-[var(--primary)] mb-2">{t.journeyProgress}</h2>
              <div className="flex justify-center gap-4 text-lg">
                <span className="font-semibold">{t.step}: {position + 1}/{totalSteps + 1}</span>
                <span className={`font-bold ${money >= 1000 ? 'text-green-600' : 'text-red-600'}`}>
                  {t.money}: ₹{money}
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
                  <span>{t.accuracyLabel}: {accuracy}%</span>
                  <span>{t.correctLabel}: {correctCount} | {t.wrongLabel}: {wrongCount}</span>
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
                        {idx === 0 ? t.start : idx === totalSteps ? t.home : `${t.questionLabel}${idx}`}
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
                  {t.questionLabel} {currentQuestion + 1}
                </h3>
                <div className="flex flex-wrap gap-3 text-sm mb-3">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">{t.moneyLabel}: ₹{money}</span>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">{t.correctLabel}: {correctCount}</span>
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">{t.wrongLabel}: {wrongCount}</span>
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">{t.accuracyLabel}: {accuracy}%</span>
                </div>
                <p className="text-lg text-[var(--foreground)]">
                  {(shuffledQuestions[currentQuestion] || questions[currentQuestion]).question[lang]}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {(shuffledQuestions[currentQuestion] || questions[currentQuestion]).options[lang].map((option, idx) => {
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
                      {isCorrect ? t.correctResult : t.wrongResult}
                    </span>
                    <span className={`ml-auto font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                      {lastMoneyChange >= 0 ? '+' : ''}₹{lastMoneyChange}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">
                    💡 {(shuffledQuestions[currentQuestion] || questions[currentQuestion]).explanation[lang]}
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
                {t.journeyComplete}
              </h2>
              
              <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 mb-6">
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-gray-600 mb-1">{t.startingMoney}</p>
                    <p className="text-2xl font-bold">₹1000</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">{t.finalMoney}</p>
                    <p className={`text-2xl font-bold ${money >= 1000 ? 'text-green-600' : 'text-red-600'}`}>
                      ₹{money}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">
                      {profit >= 0 ? `${t.profit} 🎉` : `${t.loss} 😞`}
                    </p>
                    <p className={`text-3xl font-bold ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {profit >= 0 ? '+' : ''}₹{profit}
                    </p>
                  </div>
                </div>
                <div className="mt-4 text-center text-sm text-gray-600">
                  {t.accuracyLabel}: {accuracy}% • {t.correctLabel}: {correctCount} • {t.wrongLabel}: {wrongCount}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3 text-[var(--primary)]">{t.performanceSummary}</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  {profit >= 800 && (
                    <p className="text-lg">{t.excellent}</p>
                  )}
                  {profit >= 400 && profit < 800 && (
                    <p className="text-lg">{t.goodJob}</p>
                  )}
                  {profit >= 0 && profit < 400 && (
                    <p className="text-lg">{t.notBad}</p>
                  )}
                  {profit < 0 && profit >= -500 && (
                    <p className="text-lg">{t.lostSome}</p>
                  )}
                  {profit < -500 && (
                    <p className="text-lg">{t.toughJourney}</p>
                  )}
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={restartGame}
                  className="bg-[var(--primary)] text-white font-bold py-3 px-6 rounded-full hover:bg-[var(--secondary)] transition-transform transform hover:scale-105"
                >
                  {t.restart}
                </button>
                <a href="/game">
                  <button className="bg-gray-600 text-white font-bold py-3 px-6 rounded-full hover:bg-gray-700 transition-transform transform hover:scale-105">
                    {t.backToLobby}
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
