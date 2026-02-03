import React, { useEffect, useState } from "react";

interface LeaderboardEntry {
  name: string;
  score: number;
}

const Leaderboard = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    // Get leaderboard from localStorage or use demo data
    const data = localStorage.getItem("leaderboard");
    if (data) {
      setEntries(JSON.parse(data));
    } else {
      setEntries([
        { name: "Anshu", score: 9 },
        { name: "Pawan", score: 8 },
        { name: "Amit", score: 7 },
      ]);
    }
  }, []);

  return (
    <div className="max-w-md mx-auto bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl shadow-lg p-8 mt-10">
      <h2 className="text-2xl font-bold text-[var(--primary)] mb-4 text-center">Leaderboard</h2>
      <ol className="space-y-2">
        {entries.sort((a, b) => b.score - a.score).slice(0, 10).map((entry, idx) => (
          <li key={idx} className="flex justify-between items-center p-2 bg-white rounded-lg border border-gray-100">
            <span className="font-semibold text-[var(--foreground)]">{idx + 1}. {entry.name}</span>
            <span className="text-[var(--primary)] font-bold">{entry.score}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Leaderboard;
