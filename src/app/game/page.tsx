"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Achievements from '@/components/Achievements';

const translations = {
  hi: {
    title: 'अपना गेम मोड चुनें',
    quizTitle: '📝 क्विज़ मोड',
    quizDesc: 'बहुविकल्पीय प्रश्नों से वित्तीय ज्ञान परखें।',
    simTitle: '💳 वित्तीय सिम्युलेटर',
    simDesc: 'बचत, बीमा और निवेश को वास्तविक निर्णयों से सीखें।',
    mapTitle: '🗺️ नक्शा यात्रा',
    mapDesc: 'दृश्य नक्शे में वित्तीय फैसले लेकर घर पहुँचें।',
    snakeTitle: '🐍 सांप-सीढ़ी',
    snakeDesc: 'प्रश्नों के उत्तर देकर आगे बढ़ें और घर पहुँचे।'
  },
  en: {
    title: 'Choose Your Game Mode',
    quizTitle: '📝 Quiz Mode',
    quizDesc: 'Test your financial knowledge with multiple-choice questions.',
    simTitle: '💳 Financial Simulator',
    simDesc: 'Learn Savings, Insurance & Investments through real-world decisions.',
    mapTitle: '🗺️ Map Journey',
    mapDesc: 'Navigate through a visual map making financial decisions to reach home!',
    snakeTitle: '🐍 Snake & Ladder',
    snakeDesc: 'Answer questions to move forward and reach home!'
  }
} as const;

const GamePage = () => {
  const [lang, setLang] = useState<'hi' | 'en'>('hi');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const savedLang = localStorage.getItem('lang') as 'hi' | 'en' | null;
    if (savedLang === 'hi' || savedLang === 'en') {
      setLang(savedLang);
    }
  }, []);

  const t = translations[lang];

  return (
    <div className="flex flex-col items-center min-h-screen bg-[var(--background)] p-8">
      <h1 className="text-4xl font-extrabold text-[var(--primary)] mb-10 tracking-tight">{t.title}</h1>
      <main className="flex-grow w-full">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* <Profile /> removed: undefined component */}
            <Link href="/game/quiz">
            <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl shadow-lg p-8 text-center cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-300">
              <h2 className="text-3xl font-bold text-[var(--primary)] mb-4">{t.quizTitle}</h2>
              <p className="text-[var(--foreground)] opacity-80">{t.quizDesc}</p>
            </div>
          </Link>
          <Link href="/game/simulation">
            <div className="bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 border border-blue-600 rounded-2xl shadow-lg p-8 text-center cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-300">
              <h2 className="text-3xl font-bold text-white mb-4">{t.simTitle}</h2>
              <p className="text-white opacity-90">{t.simDesc}</p>
            </div>
          </Link>
          <Link href="/game/story-map">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 border border-purple-600 rounded-2xl shadow-lg p-8 text-center cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-300">
              <h2 className="text-3xl font-bold text-white mb-4">{t.mapTitle}</h2>
              <p className="text-white opacity-90">{t.mapDesc}</p>
            </div>
          </Link>
          <Link href="/game/snake-ladder">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-500 border border-emerald-600 rounded-2xl shadow-lg p-8 text-center cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-300">
              <h2 className="text-3xl font-bold text-white mb-4">{t.snakeTitle}</h2>
              <p className="text-white opacity-90">{t.snakeDesc}</p>
            </div>
          </Link>
        </div>
      </main>
      <Achievements />
    </div>
  );
};

export default GamePage;
