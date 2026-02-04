'use client';
import React, { useEffect, useState } from 'react';

interface ProgressData {
  username: string;
  totalScenarios: number;
  completedScenarios: number;
  totalWisdom: number;
  totalMoney: number;
  savingsProgress: number;
  insuranceProgress: number;
  investmentProgress: number;
  lastUpdated: string;
}

/**
 * Offline Progress Tracker
 * - Uses localStorage (offline-capable)
 * - Lightweight JSON storage
 * - No network required
 * - Works on low-bandwidth devices
 */
export const OfflineProgressTracker: React.FC = () => {
  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    loadProgress();
    const interval = setInterval(loadProgress, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadProgress = () => {
    const stored = localStorage.getItem('financialGameProgress');
    if (stored) {
      setProgress(JSON.parse(stored));
    }
  };

  const saveProgress = (newData: ProgressData) => {
    newData.lastUpdated = new Date().toLocaleString();
    localStorage.setItem('financialGameProgress', JSON.stringify(newData));
    setProgress(newData);
  };

  const resetProgress = () => {
    if (confirm('Are you sure? This cannot be undone.')) {
      localStorage.removeItem('financialGameProgress');
      setProgress(null);
    }
  };

  if (!progress) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <p className="text-gray-600">No progress data yet. Start a game to begin tracking!</p>
      </div>
    );
  }

  const getLevel = (wisdom: number) => {
    if (wisdom >= 500) return { level: 'Master', emoji: '🏆' };
    if (wisdom >= 300) return { level: 'Expert', emoji: '⭐' };
    if (wisdom >= 150) return { level: 'Proficient', emoji: '✓' };
    if (wisdom >= 50) return { level: 'Beginner', emoji: '🌱' };
    return { level: 'Novice', emoji: '📚' };
  };

  const levelInfo = getLevel(progress.totalWisdom);
  const completion = Math.round((progress.completedScenarios / progress.totalScenarios) * 100);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg p-6 border-2 border-blue-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">
            {levelInfo.emoji} {progress.username || 'Player'}
          </h3>
          <p className="text-sm text-gray-600">{levelInfo.level}</p>
        </div>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-2xl hover:scale-110 transition"
        >
          {showDetails ? '▼' : '▶'}
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 text-center shadow">
          <p className="text-3xl font-bold text-yellow-600">{progress.totalWisdom}</p>
          <p className="text-xs text-gray-600 mt-1">Wisdom Points</p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center shadow">
          <p className="text-3xl font-bold text-green-600">₹{progress.totalMoney}</p>
          <p className="text-xs text-gray-600 mt-1">Virtual Money</p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center shadow">
          <p className="text-3xl font-bold text-blue-600">{completion}%</p>
          <p className="text-xs text-gray-600 mt-1">Overall Progress</p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center shadow">
          <p className="text-3xl font-bold text-purple-600">{progress.completedScenarios}</p>
          <p className="text-xs text-gray-600 mt-1">Scenarios Done</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-300 rounded-full h-3 mb-2">
        <div 
          className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
          style={{ width: `${completion}%` }}
        ></div>
      </div>

      {/* Theme Progress - Hidden by Default */}
      {showDetails && (
        <div className="mt-6 space-y-4 border-t pt-4">
          <h4 className="font-bold text-gray-900">Theme Progress:</h4>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-semibold text-green-700">💰 Savings</span>
              <span className="text-sm text-gray-600">{progress.savingsProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all"
                style={{ width: `${progress.savingsProgress}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-semibold text-blue-700">🛡️ Insurance</span>
              <span className="text-sm text-gray-600">{progress.insuranceProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all"
                style={{ width: `${progress.insuranceProgress}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-semibold text-purple-700">📈 Investments</span>
              <span className="text-sm text-gray-600">{progress.investmentProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-500 h-2 rounded-full transition-all"
                style={{ width: `${progress.investmentProgress}%` }}
              ></div>
            </div>
          </div>

          {/* Storage Info */}
          <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-xs text-gray-700">
            <p>💾 Data saved locally (offline). Last updated: {progress.lastUpdated}</p>
          </div>

          {/* Reset Button */}
          <button
            onClick={resetProgress}
            className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white py-2 rounded font-semibold text-sm transition"
          >
            Reset Progress
          </button>
        </div>
      )}
    </div>
  );
};

export default OfflineProgressTracker;
