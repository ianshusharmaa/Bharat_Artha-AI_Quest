'use client';
import React, { useState } from 'react';
import { allFinancialScenarios, SimulationScenario } from '@/data/financialThemes';
import { OfflineAudioNarrator } from '@/components/OfflineAudioNarrator';

interface PlayerStats {
  money: number;
  wisdom: number;
  safetyScore: number;
  wealthGrowth: number;
}

interface CompletedDecision {
  scenario: SimulationScenario;
  chosenIndex: number;
  stats: PlayerStats;
}

export default function FinancialSimulationPage() {
  const [currentThemeIdx, setCurrentThemeIdx] = useState<number | null>(null);
  const [currentScenarioIdx, setCurrentScenarioIdx] = useState(0);
  const [playerStats, setPlayerStats] = useState<PlayerStats>({
    money: 10000,
    wisdom: 0,
    safetyScore: 0,
    wealthGrowth: 0
  });
  
  const [decisions, setDecisions] = useState<CompletedDecision[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);

  const handleThemeSelect = (idx: number) => {
    setCurrentThemeIdx(idx);
    setCurrentScenarioIdx(0);
    setSelectedChoice(null);
    setShowResult(false);
  };

  const handleChoice = (choiceIdx: number) => {
    if (currentThemeIdx === null) return;
    
    const scenario = allFinancialScenarios[currentThemeIdx].scenarios[currentScenarioIdx];
    const choice = scenario.choices[choiceIdx];
    
    const newStats = { ...playerStats };
    newStats.money += choice.shortTerm.money;
    newStats.wisdom += choice.longTerm.wisdom;
    
    if (scenario.theme === 'insurance') {
      newStats.safetyScore += choice.longTerm.wisdom;
    } else if (scenario.theme === 'investment') {
      newStats.wealthGrowth += choice.longTerm.wisdom;
    }
    
    setPlayerStats(newStats);
    setDecisions([...decisions, { scenario, chosenIndex: choiceIdx, stats: newStats }]);
    setSelectedChoice(choiceIdx);
    setShowResult(true);
  };

  const nextScenario = () => {
    if (currentThemeIdx === null) return;
    
    const totalScenarios = allFinancialScenarios[currentThemeIdx].scenarios.length;
    if (currentScenarioIdx < totalScenarios - 1) {
      setCurrentScenarioIdx(currentScenarioIdx + 1);
      setShowResult(false);
      setSelectedChoice(null);
    } else {
      alert(`Theme complete! Wisdom: ${playerStats.wisdom}, Money: ₹${playerStats.money}`);
      setCurrentThemeIdx(null);
      setSelectedChoice(null);
      setShowResult(false);
    }
  };

  if (currentThemeIdx === null) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-4 sm:p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-blue-900">
            💳 Financial Life Simulator
          </h1>
          <p className="text-center text-gray-700 mb-8 text-sm sm:text-base">
            Learn 3 key financial themes through real-world decision-making scenarios
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
            <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-green-500">
              <p className="text-xs text-gray-600">💰 Money</p>
              <p className="text-xl sm:text-2xl font-bold text-green-600">₹{playerStats.money}</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-yellow-500">
              <p className="text-xs text-gray-600">🧠 Wisdom</p>
              <p className="text-xl sm:text-2xl font-bold text-yellow-600">{playerStats.wisdom}</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-blue-500">
              <p className="text-xs text-gray-600">🛡️ Safety</p>
              <p className="text-xl sm:text-2xl font-bold text-blue-600">{playerStats.safetyScore}</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-purple-500">
              <p className="text-xs text-gray-600">📈 Growth</p>
              <p className="text-xl sm:text-2xl font-bold text-purple-600">{playerStats.wealthGrowth}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {allFinancialScenarios.map((themeGroup, idx) => (
              <button
                key={idx}
                onClick={() => handleThemeSelect(idx)}
                className="group bg-white rounded-xl shadow-lg p-6 text-left hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-transparent hover:border-blue-500"
              >
                <div className="text-4xl mb-3">{themeGroup.icon}</div>
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                  {themeGroup.title}
                </h2>
                <p className="text-sm text-gray-600 mb-3">{themeGroup.description}</p>
                <p className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full inline-block">
                  {themeGroup.scenarios.length} scenarios
                </p>
              </button>
            ))}
          </div>

          {decisions.length > 0 && (
            <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">📊 Decision History</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {decisions.map((decision, idx) => (
                  <div key={idx} className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="font-semibold text-sm text-gray-900">{decision.scenario.scenario.substring(0, 60)}...</p>
                    <p className="text-sm text-gray-700 mt-1">
                      ✓ {decision.scenario.choices[decision.chosenIndex].text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  const scenario = allFinancialScenarios[currentThemeIdx].scenarios[currentScenarioIdx];
  const theme = allFinancialScenarios[currentThemeIdx];
  const progress = ((currentScenarioIdx + 1) / allFinancialScenarios[currentThemeIdx].scenarios.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-red-50 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setCurrentThemeIdx(null)}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm"
          >
            ← Back
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-center">{theme.icon} {theme.title}</h1>
          <div className="text-right">
            <p className="text-xs sm:text-sm text-gray-600">Scenario {currentScenarioIdx + 1}/{theme.scenarios.length}</p>
          </div>
        </div>

        <div className="w-full bg-gray-300 rounded-full h-2 mb-8">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-8">
          <div className="bg-white rounded-lg p-3 shadow text-center">
            <p className="text-xs text-gray-600">💰 Money</p>
            <p className="font-bold text-green-600">₹{playerStats.money}</p>
          </div>
          <div className="bg-white rounded-lg p-3 shadow text-center">
            <p className="text-xs text-gray-600">🧠 Wisdom</p>
            <p className="font-bold text-yellow-600">{playerStats.wisdom}</p>
          </div>
          <div className="bg-white rounded-lg p-3 shadow text-center">
            <p className="text-xs text-gray-600">🛡️ Safety</p>
            <p className="font-bold text-blue-600">{playerStats.safetyScore}</p>
          </div>
          <div className="bg-white rounded-lg p-3 shadow text-center">
            <p className="text-xs text-gray-600">📈 Growth</p>
            <p className="font-bold text-purple-600">{playerStats.wealthGrowth}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-6 sm:p-8 mb-8 border-t-4 border-blue-500">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-relaxed flex-grow">
              {scenario.scenario}
            </h2>
            <OfflineAudioNarrator 
              text={scenario.scenario} 
              theme={scenario.theme}
              language="en"
            />
          </div>

          <div className="space-y-4">
            {scenario.choices.map((choice, idx) => {
              const isSelected = selectedChoice === idx;
              const isGood = choice.longTerm.wisdom >= 80;
              const isBad = choice.longTerm.wisdom <= 30;
              
              return (
                <div
                  key={idx}
                  onClick={() => !showResult && handleChoice(idx)}
                  className={`p-4 sm:p-5 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-300 bg-gray-50 hover:border-blue-400'
                  } ${showResult ? 'cursor-not-allowed opacity-70' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                      isGood ? 'bg-green-500' : isBad ? 'bg-red-500' : 'bg-yellow-500'
                    }`}>
                      {idx + 1}
                    </div>
                    <div className="flex-grow">
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">{choice.text}</p>
                      {isSelected && (
                        <div className="mt-3 space-y-2">
                          <p className="text-sm text-gray-700">
                            <span className="font-bold">Immediate:</span> {choice.shortTerm.message}
                          </p>
                          <p className="text-sm text-blue-700 font-semibold">
                            {choice.longTerm.message}
                          </p>
                          <div className="flex gap-4 mt-2 text-xs">
                            <span className={`${choice.longTerm.wisdom >= 70 ? 'text-green-600' : 'text-red-600'}`}>
                              Wisdom +{choice.longTerm.wisdom}
                            </span>
                            <span className={`${choice.longTerm.risk <= 30 ? 'text-green-600' : 'text-red-600'}`}>
                              Risk {choice.longTerm.risk}%
                            </span>
                          </div>
                          <OfflineAudioNarrator 
                            text={choice.longTerm.message}
                            theme={scenario.theme}
                            language="en"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {!showResult ? (
          <div className="text-center">
            <p className="text-gray-600 text-sm">Select an option to continue</p>
          </div>
        ) : (
          <div className="flex gap-4">
            <button
              onClick={nextScenario}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              Next →
            </button>
            <button
              onClick={() => setCurrentThemeIdx(null)}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200"
            >
              Menu
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

