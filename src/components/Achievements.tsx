"use client";
import React, { useEffect, useState } from "react";

const badgeList = [
  { id: 1, name: "Quiz Master", desc: "Score 8+ in Quiz", icon: "🏆" },
  { id: 2, name: "Smart Saver", desc: "Finish Simulation with >1000", icon: "💰" },
  { id: 3, name: "Explorer", desc: "Complete Story Mode", icon: "🧭" },
];

const Achievements = () => {
  const [badges, setBadges] = useState<number[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("badges");
    if (data) setBadges(JSON.parse(data));
  }, []);

  return (
    <div className="max-w-md mx-auto bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl shadow-lg p-8 mt-10 text-center">
      <h2 className="text-2xl font-bold text-[var(--primary)] mb-4">Achievements</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {badgeList.map(badge => (
          <div
            key={badge.id}
            className={`flex flex-col items-center p-4 rounded-lg border transition-all duration-300 ${
              badges.includes(badge.id)
                ? 'border-green-400 bg-green-50 hover:scale-105 hover:shadow-xl cursor-pointer'
                : 'border-gray-200 bg-gray-50 opacity-50'
            }`}
          >
            <span className="text-3xl mb-2">{badge.icon}</span>
            <span className="font-semibold">{badge.name}</span>
            <span className="text-xs text-gray-500">{badge.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
