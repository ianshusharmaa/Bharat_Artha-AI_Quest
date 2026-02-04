"use client";
import React from 'react';
import Link from 'next/link';
import Achievements from '@/components/Achievements';

const GamePage = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-[var(--background)] p-8">
      <h1 className="text-4xl font-extrabold text-[var(--primary)] mb-10 tracking-tight">Choose Your Game Mode</h1>
      <main className="flex-grow w-full">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* <Profile /> removed: undefined component */}
            <Link href="/game/quiz">
            <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl shadow-lg p-8 text-center cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-300">
              <h2 className="text-3xl font-bold text-[var(--primary)] mb-4">📝 Quiz Mode</h2>
              <p className="text-[var(--foreground)] opacity-80">Test your financial knowledge with multiple-choice questions.</p>
            </div>
          </Link>
          <Link href="/game/simulation">
            <div className="bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 border border-blue-600 rounded-2xl shadow-lg p-8 text-center cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-300">
              <h2 className="text-3xl font-bold text-white mb-4">💳 Financial Simulator</h2>
              <p className="text-white opacity-90">Learn Savings, Insurance & Investments through real-world decision scenarios with meaningful consequences!</p>
            </div>
          </Link>
          <Link href="/game/story-map">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 border border-purple-600 rounded-2xl shadow-lg p-8 text-center cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-300">
              <h2 className="text-3xl font-bold text-white mb-4">🗺️ Map Journey</h2>
              <p className="text-white opacity-90">Navigate through a visual map making financial decisions to reach home!</p>
            </div>
          </Link>
          <Link href="/game/snake-ladder">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-500 border border-emerald-600 rounded-2xl shadow-lg p-8 text-center cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-300">
              <h2 className="text-3xl font-bold text-white mb-4">🐍 Snake & Ladder</h2>
              <p className="text-white opacity-90">Answer questions to move forward and reach home!</p>
            </div>
          </Link>
        </div>
      </main>
      <Achievements />
    </div>
  );
};

export default GamePage;
