"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Achievements from '@/components/Achievements';
import { useLanguage } from '@/context/LanguageContext';

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
  const { language: lang } = useLanguage();

  const t = translations[lang];

  return (
    <div className="flex flex-col items-center min-h-screen bg-[var(--background)] p-8">
      <h1 className="text-4xl font-extrabold text-[var(--primary)] mb-10 tracking-tight">{t.title}</h1>
      <main className="flex-grow w-full">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 px-4">
        {/* <Profile /> removed: undefined component */}
          <Link href="/game/story">
            <div className="h-full bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 border-2 border-orange-400/30 rounded-3xl shadow-xl p-8 text-center cursor-pointer transform hover:scale-105 hover:-rotate-1 transition-all duration-300 hover:shadow-2xl group">
               <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm group-hover:scale-110 transition-transform">
                <span className="text-4xl">📖</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-3 drop-shadow-md">Story Mode</h2>
              <p className="text-white/90 font-medium text-lg leading-relaxed">{lang === 'hi' ? 'कहानी के माध्यम से सीखें' : 'Learn through interactive stories'}</p>
            </div>
          </Link>
          <Link href="/game/quiz">
            <div className="h-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 border-2 border-indigo-400/30 rounded-3xl shadow-xl p-8 text-center cursor-pointer transform hover:scale-105 hover:rotate-1 transition-all duration-300 hover:shadow-2xl group">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm group-hover:scale-110 transition-transform">
                <span className="text-4xl">📝</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-3 drop-shadow-md">{t.quizTitle}</h2>
              <p className="text-white/90 font-medium text-lg leading-relaxed">{t.quizDesc}</p>
            </div>
          </Link>
          <Link href="/game/simulation">
            <div className="h-full bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600 border-2 border-cyan-400/30 rounded-3xl shadow-xl p-8 text-center cursor-pointer transform hover:scale-105 hover:-rotate-1 transition-all duration-300 hover:shadow-2xl group">
               <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm group-hover:scale-110 transition-transform">
                <span className="text-4xl">💳</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-3 drop-shadow-md">{t.simTitle}</h2>
              <p className="text-white/90 font-medium text-lg leading-relaxed">{t.simDesc}</p>
            </div>
          </Link>
          <Link href="/game/story-map">
            <div className="h-full bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 border-2 border-orange-400/30 rounded-3xl shadow-xl p-8 text-center cursor-pointer transform hover:scale-105 hover:rotate-1 transition-all duration-300 hover:shadow-2xl group">
               <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm group-hover:scale-110 transition-transform">
                <span className="text-4xl">🗺️</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-3 drop-shadow-md">{t.mapTitle}</h2>
              <p className="text-white/90 font-medium text-lg leading-relaxed">{t.mapDesc}</p>
            </div>
          </Link>
          <Link href="/game/snake-ladder">
            <div className="h-full bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600 border-2 border-emerald-400/30 rounded-3xl shadow-xl p-8 text-center cursor-pointer transform hover:scale-105 hover:-rotate-1 transition-all duration-300 hover:shadow-2xl group">
               <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm group-hover:scale-110 transition-transform">
                <span className="text-4xl">🐍</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-3 drop-shadow-md">{t.snakeTitle}</h2>
              <p className="text-white/90 font-medium text-lg leading-relaxed">{t.snakeDesc}</p>
            </div>
          </Link>
        </div>
      </main>
      <div className="mt-12 w-full max-w-4xl">
         <Achievements />
      </div>
    </div>
  );
};

export default GamePage;
