"use client";
import React, { useEffect, useState } from "react";

const badgeList = [
  { id: 1, name: "Quiz Master", desc: "Score 8+ in Quiz", icon: "🏆" },
  { id: 4, name: "Perfect Score", desc: "Get 100% in any quiz", icon: "🌟" },
  { id: 5, name: "Speed Master", desc: "Complete quiz in record time", icon: "⚡" },
  { id: 6, name: "Streak Champion", desc: "Play 7 days in a row", icon: "🔥" },
  { id: 7, name: "Financial Guru", desc: "Master all difficulty levels", icon: "🎓" },
  { id: 8, name: "Investor", desc: "Complete hard quiz with 80%+", icon: "📈" },
];

const Achievements = () => {
  const [badges, setBadges] = useState<number[]>([]);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const data = localStorage.getItem("badges");
    if (data) setBadges(JSON.parse(data));
    
    // Check streak
    const lastPlayedDate = localStorage.getItem("lastPlayedDate");
    const streakCount = parseInt(localStorage.getItem("streak") || "0");
    const today = new Date().toDateString();
    
    if (lastPlayedDate === today) {
      setStreak(streakCount);
    } else {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (lastPlayedDate === yesterday.toDateString()) {
        const newStreak = streakCount + 1;
        setStreak(newStreak);
        localStorage.setItem("streak", newStreak.toString());
        localStorage.setItem("lastPlayedDate", today);
        
        // Unlock streak badge at 7 days
        if (newStreak >= 7 && !badges.includes(6)) {
          const updated = [...badges, 6];
          setBadges(updated);
          localStorage.setItem("badges", JSON.stringify(updated));
        }
      } else {
        // Streak broken
        setStreak(1);
        localStorage.setItem("streak", "1");
        localStorage.setItem("lastPlayedDate", today);
      }
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl shadow-lg p-8 mt-10 text-center">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[var(--primary)]">Achievements</h2>
        <div className="flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full">
          <span className="text-2xl">🔥</span>
          <div>
            <p className="text-xs text-gray-600">Day Streak</p>
            <p className="text-lg font-bold text-orange-600">{streak}</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {badgeList.map(badge => (
          <div
            key={badge.id}
            className={`flex flex-col items-center p-4 rounded-lg border transition-all duration-300 ${
              badges.includes(badge.id)
                ? 'border-green-400 bg-green-50 hover:scale-105 hover:shadow-xl cursor-pointer animate-bounce-once'
                : 'border-gray-200 bg-gray-50 opacity-50 grayscale'
            }`}
          >
            <span className="text-4xl mb-2">{badge.icon}</span>
            <span className="font-semibold text-sm text-center">{badge.name}</span>
            <span className="text-xs text-gray-500 text-center mt-1">{badge.desc}</span>
          </div>
        ))}
      </div>
      <div className="mt-6 text-sm text-gray-600">
        <p>Unlocked: {badges.length} / {badgeList.length}</p>
      </div>
    </div>
  );
};

export default Achievements;
