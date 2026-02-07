'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';

interface LocalizedText {
  en: string;
  hi: string;
}

interface Question {
  id: number;
  text: LocalizedText;
  options: { en: string[]; hi: string[] };
  correct: number;
  steps: number;
  explanation: LocalizedText;
}

const translations = {
  hi: {
    title: 'सांप और सीढ़ी',
    soundOn: '🔊 ध्वनि चालू',
    soundOff: '🔇 ध्वनि बंद',
    backToLobby: 'लॉबी में वापस जाएं',
    answerQuestions: 'आगे बढ़ने के लिए प्रश्नों का उत्तर दें',
    reachedHome: 'आप घर पहुँच गए!',
    wellDone: 'बहुत अच्छा! आपने सांप-सीढ़ी यात्रा पूरी की।',
    finalMoney: 'अंतिम पैसा',
    profitLoss: 'लाभ/नुकसान',
    accuracyLabel: 'सटीकता',
    correctLabel: 'सही',
    wrongLabel: 'गलत',
    playAgain: 'फिर से खेलें',
    questionLabel: 'प्रश्न',
    moveSteps: 'कदम',
    wrongAnswerLabel: 'गलत उत्तर',
    note: 'नोट: सही उत्तर मिलने पर आप प्रश्न के कदम मूल्य के अनुसार आगे बढ़ते हैं।',
    status: 'स्थिति',
    position: 'स्थिति',
    money: 'पैसा',
    correct: 'सही!',
    wrong: 'गलत!',
    ladder: 'सीढ़ी!',
    youClimb: 'आप चढ़ते हैं',
    to: 'से',
    snake: 'सांप!',
    youSlide: 'आप फिसलते हैं',
    youReachedEnd: 'आप खेल के अंत तक पहुंच गए!',
    gameOver: 'खेल समाप्त!',
    finalStats: 'अंतिम आंकड़े',
    totalQuestions: 'कुल प्रश्न',
    correctAnswers: 'सही उत्तर',
    wrongAnswers: 'गलत उत्तर',
    streak: 'स्ट्रीक',
    moneyEarned: 'पैसा अर्जित',
    restart: 'खेल पुनः शुरू करें',
    congratulations: 'बधाई हो!',
    wrongNoMove: 'गलत उत्तर। इस बार चाल नहीं चलेगी।',
    movedForward: 'आप आगे बढ़े',
    movedBackward: 'आप पीछे गए',
    steps: 'कदम',
    activityLog: 'गतिविधि लॉग',
    lastFive: 'पिछली 5 गतिविधियाँ',
    boardTitle: 'बोर्ड',
    questionMode: 'प्रश्न मोड',
    progress: 'प्रगति',
    turn: 'टर्न'
  },
  en: {
    title: 'Snake and Ladder',
    soundOn: '🔊 Sound On',
    soundOff: '🔇 Sound Off',
    backToLobby: 'Back to Lobby',
    answerQuestions: 'Answer questions to move forward.',
    reachedHome: 'You reached Home!',
    wellDone: 'Well done! You completed the Snake & Ladder journey.',
    finalMoney: 'Final Money',
    profitLoss: 'Profit/Loss',
    accuracyLabel: 'Accuracy',
    correctLabel: 'Correct',
    wrongLabel: 'Wrong',
    playAgain: 'Play Again',
    questionLabel: 'Question',
    moveSteps: 'Move',
    wrongAnswerLabel: 'Wrong Answer',
    note: 'Note: Correct answer moves you forward by the question step value.',
    status: 'Status',
    position: 'Position',
    money: 'Money',
    correct: 'Correct!',
    wrong: 'Wrong!',
    ladder: 'Ladder!',
    youClimb: 'You climb from',
    to: 'to',
    snake: 'Snake!',
    youSlide: 'You slide from',
    youReachedEnd: 'You reached the end of the game!',
    gameOver: 'Game Over!',
    finalStats: 'Final Stats',
    totalQuestions: 'Total Questions',
    correctAnswers: 'Correct Answers',
    wrongAnswers: 'Wrong Answers',
    streak: 'Streak',
    moneyEarned: 'Money Earned',
    restart: 'Restart Game',
    congratulations: 'Congratulations!',
    wrongNoMove: 'Wrong answer. No move this turn.',
    movedForward: 'You moved forward',
    movedBackward: 'You moved back',
    steps: 'steps',
    activityLog: 'Activity Log',
    lastFive: 'Last 5 activities',
    boardTitle: 'Board',
    questionMode: 'Question Mode',
    progress: 'Progress',
    turn: 'Turn'
  }
};

const questions: Question[] = [
  {
    id: 1,
    text: {
      en: 'You got ₹1000. What is the best first step?',
      hi: 'आपको ₹1000 मिले। सबसे पहला सही कदम क्या होगा?'
    },
    options: {
      en: ['Spend it all', 'Create a budget', 'Buy a new phone', 'Lend to a friend'],
      hi: ['सब खर्च कर दें', 'बजट बनाएं', 'नया फोन खरीदें', 'दोस्त को उधार दें']
    },
    correct: 1,
    steps: 2,
    explanation: {
      en: 'A budget helps you plan spending and saving.',
      hi: 'बजट खर्च और बचत की योजना बनाने में मदद करता है।'
    }
  },
  {
    id: 2,
    text: {
      en: 'What is an emergency fund used for?',
      hi: 'इमरजेंसी फंड किस लिए होता है?'
    },
    options: {
      en: ['Shopping', 'Travel', 'Unexpected expenses', 'Games'],
      hi: ['खरीदारी', 'यात्रा', 'अचानक खर्च', 'खेल']
    },
    correct: 2,
    steps: 3,
    explanation: {
      en: 'Emergency funds cover sudden expenses.',
      hi: 'इमरजेंसी फंड अचानक होने वाले खर्चों को कवर करता है।'
    }
  },
  {
    id: 3,
    text: {
      en: 'Which is a good saving habit?',
      hi: 'कौन सी अच्छी बचत आदत है?'
    },
    options: {
      en: ['Save a fixed % of income', 'Spend first', 'Borrow often', 'Ignore bills'],
      hi: ['आय का एक तय प्रतिशत बचाना', 'पहले खर्च करना', 'बार-बार उधार लेना', 'बिलों को नजरअंदाज करना']
    },
    correct: 0,
    steps: 4,
    explanation: {
      en: 'Saving a fixed percentage builds consistency.',
      hi: 'तय प्रतिशत बचाने से नियमितता बनती है।'
    }
  },
  {
    id: 4,
    text: {
      en: 'Credit card APR means?',
      hi: 'क्रेडिट कार्ड APR का मतलब क्या है?'
    },
    options: {
      en: ['Annual Percentage Rate', 'Average Payment Rule', 'Account Payment Ratio', 'Annual Pay Return'],
      hi: ['वार्षिक प्रतिशत दर', 'औसत भुगतान नियम', 'खाता भुगतान अनुपात', 'वार्षिक भुगतान रिटर्न']
    },
    correct: 0,
    steps: 5,
    explanation: {
      en: 'APR is the yearly interest rate on borrowed money.',
      hi: 'APR उधार पैसे पर सालाना ब्याज दर है।'
    }
  },
  {
    id: 5,
    text: {
      en: 'Best way to reduce risk in investing?',
      hi: 'निवेश में जोखिम कम करने का सबसे अच्छा तरीका?'
    },
    options: {
      en: ['All money in one stock', 'Diversification', 'No research', 'Borrow to invest'],
      hi: ['सारा पैसा एक स्टॉक में', 'विविधीकरण', 'बिना शोध', 'उधार लेकर निवेश']
    },
    correct: 1,
    steps: 6,
    explanation: {
      en: 'Diversification reduces risk.',
      hi: 'विविधीकरण जोखिम कम करता है।'
    }
  },
  {
    id: 6,
    text: {
      en: 'What is the 50/30/20 rule?',
      hi: '50/30/20 नियम क्या है?'
    },
    options: {
      en: ['Needs/Wants/Savings', 'Wants/Needs/Savings', 'Savings/Needs/Wants', 'Invest/Spend/Save'],
      hi: ['जरूरतें/इच्छाएँ/बचत', 'इच्छाएँ/जरूरतें/बचत', 'बचत/जरूरतें/इच्छाएँ', 'निवेश/खर्च/बचत']
    },
    correct: 0,
    steps: 2,
    explanation: {
      en: '50% needs, 30% wants, 20% savings.',
      hi: '50% जरूरतें, 30% इच्छाएँ, 20% बचत।'
    }
  },
  {
    id: 7,
    text: {
      en: 'Why is paying bills on time important?',
      hi: 'समय पर बिल भरना क्यों जरूरी है?'
    },
    options: {
      en: ['Build credit', 'Avoid late fees', 'Both', 'Neither'],
      hi: ['क्रेडिट बनता है', 'लेट फीस से बचते हैं', 'दोनों', 'कोई नहीं']
    },
    correct: 2,
    steps: 3,
    explanation: {
      en: 'On-time payments build credit and avoid fees.',
      hi: 'समय पर भुगतान से क्रेडिट बनता है और फीस से बचते हैं।'
    }
  },
  {
    id: 8,
    text: {
      en: 'What is compound interest?',
      hi: 'चक्रवृद्धि ब्याज क्या है?'
    },
    options: {
      en: ['Interest on interest', 'Only on principal', 'A fee', 'A tax'],
      hi: ['ब्याज पर ब्याज', 'सिर्फ मूलधन पर', 'एक शुल्क', 'एक कर']
    },
    correct: 0,
    steps: 4,
    explanation: {
      en: 'You earn interest on your interest too.',
      hi: 'ब्याज पर भी ब्याज मिलता है।'
    }
  },
  {
    id: 9,
    text: {
      en: 'Before taking a loan, what should you check first?',
      hi: 'ऋण लेने से पहले सबसे पहले क्या जांचना चाहिए?'
    },
    options: {
      en: ['Your ability to repay', 'New phone models', 'Festival offers only', 'Friend opinions only'],
      hi: ['चुकाने की क्षमता', 'नए फोन मॉडल', 'केवल त्योहार ऑफर', 'केवल दोस्तों की राय']
    },
    correct: 0,
    steps: 2,
    explanation: {
      en: 'Always check if you can repay comfortably before borrowing.',
      hi: 'उधार लेने से पहले देखें कि आप आराम से चुका सकते हैं या नहीं।'
    }
  },
  {
    id: 10,
    text: {
      en: 'What is a UPI PIN used for?',
      hi: 'UPI PIN किस लिए होता है?'
    },
    options: {
      en: ['Authorizing payment', 'Checking balance only', 'Opening a bank account', 'Getting a loan'],
      hi: ['भुगतान की पुष्टि', 'सिर्फ बैलेंस देखना', 'बैंक खाता खोलना', 'ऋण लेना']
    },
    correct: 0,
    steps: 3,
    explanation: {
      en: 'UPI PIN is required to authorize a payment securely.',
      hi: 'UPI PIN भुगतान की सुरक्षित पुष्टि के लिए जरूरी होता है।'
    }
  },
  {
    id: 11,
    text: {
      en: 'Which is the safest rule for OTP?',
      hi: 'OTP के लिए सबसे सुरक्षित नियम क्या है?'
    },
    options: {
      en: ['Never share OTP with anyone', 'Share with friends', 'Post it online', 'Tell bank employee on call'],
      hi: ['OTP किसी से साझा न करें', 'दोस्तों के साथ साझा करें', 'ऑनलाइन पोस्ट करें', 'कॉल पर बैंक कर्मचारी को बताएं']
    },
    correct: 0,
    steps: 2,
    explanation: {
      en: 'OTP should never be shared with anyone.',
      hi: 'OTP कभी किसी के साथ साझा नहीं करना चाहिए।'
    }
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
  const { language: lang, setLanguage: setLang } = useLanguage();
  const [position, setPosition] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [message, setMessage] = useState(translations['hi'].answerQuestions);
  const [gameOver, setGameOver] = useState(false);
  const [money, setMoney] = useState(1000);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [lastMoneyChange, setLastMoneyChange] = useState(0);
  const [lastQuestionId, setLastQuestionId] = useState<number | null>(null);
  const [activity, setActivity] = useState<string[]>([]);
  const [questionOrder, setQuestionOrder] = useState<Question[]>(questions);
  
  const { speak } = useTextToSpeech();

  const t = translations[lang];

  const speakFeedback = (wasCorrect: boolean) => {
    speak(
      wasCorrect ? 'सही जवाब' : 'गलत जवाब',
      wasCorrect ? 'Sahi Javaab' : 'Galat Javaab',
      wasCorrect ? 'Correct answer.' : 'Wrong answer.',
      lang
    );
  };

  const shuffleQuestions = (avoidId?: number | null) => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    if (avoidId && shuffled[0]?.id === avoidId && shuffled.length > 1) {
      const first = shuffled.shift();
      if (first) shuffled.push(first);
    }
    return shuffled;
  };

  useEffect(() => {
    setQuestionOrder(shuffleQuestions(null));
  }, []);

  const setLanguage = (newLang: 'hi' | 'en') => {
    setLang(newLang);
  };

  useEffect(() => {
    setMessage(translations[lang].answerQuestions);
  }, [lang]);

  useEffect(() => {
    const soundSetting = localStorage.getItem('soundEnabled');
    if (soundSetting !== null) {
      setSoundEnabled(JSON.parse(soundSetting));
    }
  }, []);

  const addActivity = (entry: string) => {
    setActivity(prev => [entry, ...prev].slice(0, 5));
  };

  const question = questionOrder[currentQuestionIndex] || questions[0];

  const board = useMemo(() => {
    return Array.from({ length: boardSize }, (_, i) => i + 1);
  }, []);

  const movePlayer = (steps: number) => {
    const originalPosition = position;
    let next = originalPosition + steps;
    if (next > boardSize) {
      next = boardSize;
    }
    if (next < 1) {
      next = 1;
    }

    if (ladders[next]) {
      setMessage(`${t.ladder} ${t.youClimb} ${next} ${t.to} ${ladders[next]}.`);
      addActivity(`🪜 ${t.youClimb} ${next} ${t.to} ${ladders[next]}`);
      next = ladders[next];
    } else if (snakes[next]) {
      setMessage(`${t.snake} ${t.youSlide} ${next} ${t.to} ${snakes[next]}.`);
      addActivity(`🐍 ${t.youSlide} ${next} ${t.to} ${snakes[next]}`);
      next = snakes[next];
    } else {
      const delta = next - originalPosition;
      if (delta > 0) {
        setMessage(`${t.movedForward} ${delta} ${t.steps}.`);
        addActivity(`➡️ ${t.movedForward} ${delta} ${t.steps}`);
      } else if (delta < 0) {
        setMessage(`${t.movedBackward} ${Math.abs(delta)} ${t.steps}.`);
        addActivity(`⬅️ ${t.movedBackward} ${Math.abs(delta)} ${t.steps}`);
      } else {
        setMessage(t.wrongNoMove);
        addActivity(`✋ ${t.wrongNoMove}`);
      }
    }

    setPosition(next);
    if (next === boardSize) {
      setGameOver(true);
    }
  };

  const handleAnswer = (index: number) => {
    if (selected !== null || gameOver) return;

    setSelected(index);
    const wasCorrect = index === question.correct;
    setIsCorrect(wasCorrect);
    setShowResult(true);

    if (soundEnabled) {
      speakFeedback(wasCorrect);
    }

    const moneyChange = wasCorrect ? 150 + streak * 20 : -120;
    setLastMoneyChange(moneyChange);
    setMoney(prev => prev + moneyChange);
    if (wasCorrect) {
      setCorrectCount(prev => prev + 1);
      setStreak(prev => prev + 1);
    } else {
      setWrongCount(prev => prev + 1);
      setStreak(0);
    }

    setTimeout(() => {
      if (wasCorrect) {
        movePlayer(question.steps);
      } else {
        movePlayer(-1);
      }

      setSelected(null);
      setShowResult(false);
      setCurrentQuestionIndex(prev => {
        if (prev + 1 >= questionOrder.length) {
          setQuestionOrder(shuffleQuestions(question.id));
          return 0;
        }
        return prev + 1;
      });
    }, 1500);
  };

  const restart = () => {
    setPosition(1);
    setCurrentQuestionIndex(0);
    setSelected(null);
    setShowResult(false);
    setIsCorrect(false);
    setMessage(t.answerQuestions);
    setGameOver(false);
    setMoney(1000);
    setCorrectCount(0);
    setWrongCount(0);
    setStreak(0);
    setLastMoneyChange(0);
    setLastQuestionId(null);
    setActivity([]);
  };

  const totalAnswered = correctCount + wrongCount;
  const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;
  const profit = money - 1000;

  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-emerald-100 p-4 sticky top-16 z-40 rounded-xl mx-4 mt-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">{t.title}</h1>
            <p className="text-sm text-[var(--foreground)] opacity-70">{t.questionMode}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">{t.turn}: {currentQuestionIndex + 1}</span>
            <span className="px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-semibold">{t.progress}: {position}/{boardSize}</span>
            <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold">{t.accuracyLabel}: {accuracy}%</span>
            <span className="px-3 py-1 rounded-full bg-yellow-50 text-yellow-700 text-xs font-semibold">{t.streak}: {streak}</span>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">₹{money}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
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
      </header>

      <main className="flex-grow p-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-[var(--card-border)]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">{t.boardTitle}</h2>
              <div className="text-sm font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">{t.position}: <span className="text-emerald-600">{position}/{boardSize}</span></div>
            </div>
            <div className="mb-6">
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-3 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-500"
                  style={{ width: `${(position / boardSize) * 100}%` }}
                ></div>
              </div>
              <div className="mt-2 flex justify-between text-xs font-medium text-gray-500">
                <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded border border-purple-100">{t.accuracyLabel}: {accuracy}%</span>
                <span className="bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded border border-yellow-100">{t.streak}: {streak}</span>
                <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-100">{t.money}: ₹{money}</span>
              </div>
            </div>
            <div className="grid grid-cols-5 sm:grid-cols-6 gap-2">
              {board.map(cell => {
                 // Classic Snake & Ladder zigzag layout logic would be complex, keeping simple grid for now but improving visuals
                 // Actually, let's just make the cells look nicer
                 const isPlayerHere = cell === position;
                 const isLadder = ladders[cell];
                 const isSnake = snakes[cell];
                 
                 let cellColor = 'bg-white';
                 if (isLadder) cellColor = 'bg-green-50 border-green-200';
                 if (isSnake) cellColor = 'bg-red-50 border-red-200';
                 if (isPlayerHere) cellColor = 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg scale-110 z-10';

                 return (
                <div
                  key={cell}
                  className={`relative aspect-square rounded-xl border-2 flex items-center justify-center text-sm font-bold transition-all duration-300 ${cellColor} ${!isPlayerHere && 'hover:bg-gray-50'} shadow-sm`}
                >
                  {cell}
                  {ladders[cell] && <span className="absolute top-1 right-1 text-base">🪜</span>}
                  {snakes[cell] && <span className="absolute top-1 right-1 text-base">🐍</span>}
                  {isPlayerHere && <span className="absolute -top-2 -right-2 text-xl animate-bounce">📍</span>}
                </div>
              )})}
            </div>
            <div className="mt-6 text-sm text-gray-600 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="flex flex-wrap gap-4 justify-center">
                 <span className="flex items-center gap-1"><span className="text-xl">🪜</span> Ladders: <span className="font-mono text-emerald-600">{Object.keys(ladders).join(', ')}</span></span>
                 <span className="flex items-center gap-1"><span className="text-xl">🐍</span> Snakes: <span className="font-mono text-red-600">{Object.keys(snakes).join(', ')}</span></span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            {gameOver ? (
              <div className="text-center">
                <div className="text-5xl mb-3">🏠</div>
                <h2 className="text-2xl font-bold text-[var(--primary)] mb-2">{t.reachedHome}</h2>
                <p className="text-gray-700 mb-4">{t.wellDone}</p>
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>{t.finalMoney}: <span className={`font-bold ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>₹{money}</span></div>
                    <div>{t.profitLoss}: <span className={`font-bold ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>{profit >= 0 ? '+' : ''}₹{profit}</span></div>
                    <div>{t.accuracyLabel}: <span className="font-bold">{accuracy}%</span></div>
                    <div>{t.correctLabel}: <span className="font-bold">{correctCount}</span> | {t.wrongLabel}: <span className="font-bold">{wrongCount}</span></div>
                  </div>
                </div>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={restart}
                    className="bg-[var(--primary)] text-white font-bold py-3 px-6 rounded-full hover:bg-[var(--secondary)]"
                  >
                    {t.playAgain}
                  </button>
                  <Link href="/game">
                    <button className="bg-gray-600 text-white font-bold py-3 px-6 rounded-full hover:bg-gray-700">
                      {t.backToLobby}
                    </button>
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-[var(--primary)]">{t.questionLabel} {currentQuestionIndex + 1} ({t.moveSteps} {question.steps})</h2>
                  <p className="text-lg text-[var(--foreground)] mt-2">{question.text[lang]}</p>
                </div>
                <div className="grid grid-cols-1 gap-3 mb-4">
                  {question.options[lang].map((opt, idx) => {
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
                      <span className="font-bold">{isCorrect ? t.correct : t.wrongAnswerLabel}</span>
                      <span className={`ml-auto font-bold ${lastMoneyChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {lastMoneyChange >= 0 ? '+' : ''}₹{lastMoneyChange}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">💡 {question.explanation[lang]}</p>
                  </div>
                )}

                <div className="mt-4 text-sm text-gray-700">
                  <p>{t.note}</p>
                  <p className="mt-2 font-semibold">{t.status}: {message}</p>
                </div>

                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-[var(--primary)]">{t.activityLog}</h3>
                    <span className="text-xs text-gray-500">{t.lastFive}</span>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 space-y-2 text-sm">
                    {activity.length === 0 ? (
                      <span className="text-gray-500">—</span>
                    ) : (
                      activity.map((item, idx) => (
                        <div key={`${item}-${idx}`} className="text-gray-700">
                          {item}
                        </div>
                      ))
                    )}
                  </div>
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
