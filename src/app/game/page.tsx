"use client";
import React from 'react';
import Link from 'next/link';
import Leaderboard from '@/components/Leaderboard';
import Achievements from '@/components/Achievements';

const GamePage = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-[var(--background)] p-8">
      <h1 className="text-4xl font-extrabold text-[var(--primary)] mb-10 tracking-tight">Choose Your Game Mode</h1>
      <main className="flex-grow w-full">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* <Profile /> removed: undefined component */}
            <Link href="/game/quiz">
            <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl shadow-lg p-8 text-center cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-300">
              <h2 className="text-3xl font-bold text-[var(--primary)] mb-4">Quiz Mode</h2>
              <p className="text-[var(--foreground)] opacity-80">Test your financial knowledge with multiple-choice questions.</p>
            </div>
          </Link>
          <Link href="/game/simulation">
            <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl shadow-lg p-8 text-center cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-300">
              <h2 className="text-3xl font-bold text-[var(--primary)] mb-4">Simulation Mode</h2>
              <p className="text-[var(--foreground)] opacity-80">Manage a budget and make financial decisions in a real-life simulation.</p>
            </div>
          </Link>
          <Link href="/game/story">
            <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl shadow-lg p-8 text-center cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-300">
              <h2 className="text-3xl font-bold text-[var(--primary)] mb-4">Story Mode</h2>
              <p className="text-[var(--foreground)] opacity-80">Embark on a narrative adventure and make financial choices that shape your story.</p>
            </div>
          </Link>
        </div>
      </main>
      <Leaderboard />
      <Achievements />
    </div>
  );
};

export default GamePage;
