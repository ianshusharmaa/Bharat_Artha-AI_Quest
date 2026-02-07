'use client';
import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { allFinancialScenarios, SimulationScenario } from '@/data/financialThemes';
import { OfflineAudioNarrator } from '@/components/OfflineAudioNarrator';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';

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
  const { language: currentLang, setLanguage: setCurrentLang } = useLanguage();
  const translations = {
    hi: {
      heroTitle: '💳 वित्तीय जीवन सिम्युलेटर',
      heroSubtitle: 'वास्तविक निर्णयों से बचत, सुरक्षा और निवेश सीखें',
      piggyTitle: 'पिग्गी बैंक',
      rupeeSymbol: '₹',
      questsTitle: '🎯 अपना Quest चुनो',
      scenariosLabel: 'परिस्थितियाँ',
      money: 'धन',
      wisdom: 'बुद्धि',
      safety: 'सुरक्षा',
      growth: 'वृद्धि',
      scenarioLabel: 'परिस्थिति',
      immediateLabel: 'तुरंत प्रभाव',
      riskLabel: 'जोखिम',
      wisdomLabel: 'बुद्धि',
      selectOption: 'जारी रखने के लिए विकल्प चुनें',
      next: 'अगला →',
      menu: 'मेनू',
      back: '← वापस',
      decisionHistory: '📊 निर्णय इतिहास',
      viewBadges: '🏆 बैज देखें',
      badgesTitle: '🏆 आपके बैज',
      goodText: 'आपने सही विकल्प चुना है। यह वित्तीय रूप से समझदारी भरा निर्णय है।',
      badText: 'यह विकल्प सही नहीं है। कृपया जोखिम और दीर्घकालिक प्रभाव पर ध्यान दें।',
      themeComplete: 'थीम पूरा हुआ! बुद्धि: {wisdom}, धन: ₹{money}',
      savingsBadge: '🌾 बजट बॉस',
      insuranceBadge: '🛡️ बीमा मास्टर',
      investmentBadge: '📈 निवेश हीरो'
    },
    en: {
      heroTitle: '💳 Financial Life Simulator',
      heroSubtitle: 'Learn savings, protection, and investing through real decisions',
      piggyTitle: 'Piggy Bank',
      rupeeSymbol: '₹',
      questsTitle: '🎯 Choose Your Quest',
      scenariosLabel: 'scenarios',
      money: 'Money',
      wisdom: 'Wisdom',
      safety: 'Safety',
      growth: 'Growth',
      scenarioLabel: 'Scenario',
      immediateLabel: 'Immediate',
      riskLabel: 'Risk',
      wisdomLabel: 'Wisdom',
      selectOption: 'Select an option to continue',
      next: 'Next →',
      menu: 'Menu',
      back: '← Back',
      decisionHistory: '📊 Decision History',
      viewBadges: '🏆 View Badges',
      badgesTitle: '🏆 Your Badges',
      goodText: 'Excellent choice. This is a financially sound decision.',
      badText: 'This choice is not optimal. Please consider risk and long‑term impact.',
      themeComplete: 'Theme complete! Wisdom: {wisdom}, Money: ₹{money}',
      savingsBadge: '🌾 Budget Boss',
      insuranceBadge: '🛡️ Insurance Master',
      investmentBadge: '📈 Investment Hero'
    }
  } as const;

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
  const [feedbackText, setFeedbackText] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<'correct' | 'incorrect' | null>(null);
  const [badges, setBadges] = useState<string[]>([]);
  const [showBadges, setShowBadges] = useState(false);

  const { speak } = useTextToSpeech();

  const t = translations[currentLang];

  const getLocalizedText = (text: string) => {
    const primarySplit = text.split(' / ');
    if (primarySplit.length > 1) {
      return currentLang === 'hi'
        ? primarySplit[0].trim()
        : primarySplit.slice(1).join(' / ').trim();
    }

    const fallbackSplit = text.split('/');
    if (fallbackSplit.length > 1) {
      return currentLang === 'hi'
        ? fallbackSplit[0].trim()
        : fallbackSplit.slice(1).join('/').trim();
    }

    return text;
  };

  const themeCopy = {
    hi: {
      savings: {
        title: '💰 बचत और बजट',
        desc: 'आज बचत, कल सुरक्षा'
      },
      insurance: {
        title: '🛡️ बीमा और सुरक्षा',
        desc: 'अप्रत्याशित खर्च से बचाव'
      },
      investment: {
        title: '📈 निवेश और विकास',
        desc: 'पैसे को बढ़ने दो'
      }
    },
    en: {
      savings: {
        title: '💰 Savings & Budgeting',
        desc: 'Save today, secure tomorrow'
      },
      insurance: {
        title: '🛡️ Insurance & Protection',
        desc: 'Shield against unexpected costs'
      },
      investment: {
        title: '📈 Investments & Growth',
        desc: 'Let your money grow'
      }
    }
  } as const;

  const speakFeedback = (type: 'correct' | 'incorrect') => {
    const isCorrect = type === 'correct';
    const key = isCorrect ? 'goodText' : 'badText';
    speak(
      translations['hi'][key],
      translations['en'][key], // Fallback text (English)
      translations['en'][key], // English text
      currentLang
    );
  };


  const handleThemeSelect = (idx: number) => {
    setCurrentThemeIdx(idx);
    setCurrentScenarioIdx(0);
    setSelectedChoice(null);
    setShowResult(false);
    setFeedbackText(null);
    setFeedbackType(null);
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

    const isCorrect = choice.longTerm.wisdom >= 70;
    const nextType = isCorrect ? 'correct' : 'incorrect';
    const nextText = isCorrect ? t.goodText : t.badText;
    setFeedbackType(nextType);
    setFeedbackText(nextText);
    speakFeedback(nextType);
    
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
      setFeedbackText(null);
      setFeedbackType(null);
    } else {
      const themeKey = allFinancialScenarios[currentThemeIdx].theme;
      if (!badges.includes(themeKey)) {
        setBadges([...badges, themeKey]);
        setShowBadges(true);
      }
      alert(
        t.themeComplete
          .replace('{wisdom}', String(playerStats.wisdom))
          .replace('{money}', String(playerStats.money))
      );
      setCurrentThemeIdx(null);
      setSelectedChoice(null);
      setShowResult(false);
      setFeedbackText(null);
      setFeedbackType(null);
    }
  };

  if (currentThemeIdx === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100/50 via-purple-100/50 to-indigo-100/50 p-4 sm:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-end gap-2 mb-3">
            <button
              onClick={() => setCurrentLang('hi')}
              className={`px-3 py-1 rounded-full text-sm font-semibold border ${currentLang === 'hi' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300'}`}
            >
              हिन्दी
            </button>
            <button
              onClick={() => setCurrentLang('en')}
              className={`px-3 py-1 rounded-full text-sm font-semibold border ${currentLang === 'en' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300'}`}
            >
              English
            </button>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-blue-900">
            {t.heroTitle}
          </h1>
          <p className="text-center text-gray-700 mb-6 text-sm sm:text-base">
            {t.heroSubtitle}
          </p>

          <div className="bg-white rounded-xl shadow-md p-4 mb-6 border border-blue-100">
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold text-gray-900">{t.piggyTitle}</p>
              <p className="text-sm text-gray-600">{t.rupeeSymbol}{playerStats.money}</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full"
                style={{ width: `${Math.min((playerStats.money / 20000) * 100, 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
            <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-green-500">
              <p className="text-xs text-gray-600">💰 {t.money}</p>
              <p className="text-xl sm:text-2xl font-bold text-green-600">₹{playerStats.money}</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-yellow-500">
              <p className="text-xs text-gray-600">🧠 {t.wisdom}</p>
              <p className="text-xl sm:text-2xl font-bold text-yellow-600">{playerStats.wisdom}</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-blue-500">
              <p className="text-xs text-gray-600">🛡️ {t.safety}</p>
              <p className="text-xl sm:text-2xl font-bold text-blue-600">{playerStats.safetyScore}</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-purple-500">
              <p className="text-xs text-gray-600">📈 {t.growth}</p>
              <p className="text-xl sm:text-2xl font-bold text-purple-600">{playerStats.wealthGrowth}</p>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">{t.questsTitle}</h2>
            <button
              onClick={() => setShowBadges(!showBadges)}
              className="text-sm font-semibold text-blue-700 hover:text-blue-800"
            >
              {t.viewBadges}
            </button>
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
                  {themeCopy[currentLang][themeGroup.theme as keyof typeof themeCopy.en].title}
                </h2>
                <p className="text-sm text-gray-600 mb-3">{themeCopy[currentLang][themeGroup.theme as keyof typeof themeCopy.en].desc}</p>
                <p className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full inline-block">
                  {themeGroup.scenarios.length} {t.scenariosLabel}
                </p>
              </button>
            ))}
          </div>

          {decisions.length > 0 && (
            <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{t.decisionHistory}</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {decisions.map((decision, idx) => (
                  <div key={idx} className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="font-semibold text-sm text-gray-900">
                      {getLocalizedText(decision.scenario.scenario).substring(0, 60)}...
                    </p>
                    <p className="text-sm text-gray-700 mt-1">
                      ✓ {getLocalizedText(decision.scenario.choices[decision.chosenIndex].text)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {showBadges && (
            <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{t.badgesTitle}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                  <div className="text-3xl mb-2">🌾</div>
                  <p className="font-semibold">{t.savingsBadge}</p>
                  <p className="text-sm text-gray-600">{badges.includes('savings') ? '✅' : '🔒'}</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                  <div className="text-3xl mb-2">🛡️</div>
                  <p className="font-semibold">{t.insuranceBadge}</p>
                  <p className="text-sm text-gray-600">{badges.includes('insurance') ? '✅' : '🔒'}</p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                  <div className="text-3xl mb-2">📈</div>
                  <p className="font-semibold">{t.investmentBadge}</p>
                  <p className="text-sm text-gray-600">{badges.includes('investment') ? '✅' : '🔒'}</p>
                </div>
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setCurrentThemeIdx(null)}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm"
          >
            {t.back}
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-center">{theme.icon} {themeCopy[currentLang][theme.theme as keyof typeof themeCopy.en].title}</h1>
          <div className="text-right">
            <p className="text-xs sm:text-sm text-gray-600">{t.scenarioLabel} {currentScenarioIdx + 1}/{theme.scenarios.length}</p>
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
            <p className="text-xs text-gray-600">💰 {t.money}</p>
            <p className="font-bold text-green-600">₹{playerStats.money}</p>
          </div>
          <div className="bg-white rounded-lg p-3 shadow text-center">
            <p className="text-xs text-gray-600">🧠 {t.wisdom}</p>
            <p className="font-bold text-yellow-600">{playerStats.wisdom}</p>
          </div>
          <div className="bg-white rounded-lg p-3 shadow text-center">
            <p className="text-xs text-gray-600">🛡️ {t.safety}</p>
            <p className="font-bold text-blue-600">{playerStats.safetyScore}</p>
          </div>
          <div className="bg-white rounded-lg p-3 shadow text-center">
            <p className="text-xs text-gray-600">📈 {t.growth}</p>
            <p className="font-bold text-purple-600">{playerStats.wealthGrowth}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-6 sm:p-8 mb-8 border-t-4 border-blue-500">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-relaxed flex-grow">
              {getLocalizedText(scenario.scenario)}
            </h2>
            <OfflineAudioNarrator 
              text={getLocalizedText(scenario.scenario)} 
              theme={scenario.theme}
              language={currentLang}
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
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">{getLocalizedText(choice.text)}</p>
                      {isSelected && (
                        <div className="mt-3 space-y-2">
                          <p className="text-sm text-gray-700">
                            <span className="font-bold">{t.immediateLabel}:</span> {getLocalizedText(choice.shortTerm.message)}
                          </p>
                          <p className="text-sm text-blue-700 font-semibold">
                            {getLocalizedText(choice.longTerm.message)}
                          </p>
                          <div className="flex gap-4 mt-2 text-xs">
                            <span className={`${choice.longTerm.wisdom >= 70 ? 'text-green-600' : 'text-red-600'}`}>
                              {t.wisdomLabel} +{choice.longTerm.wisdom}
                            </span>
                            <span className={`${choice.longTerm.risk <= 30 ? 'text-green-600' : 'text-red-600'}`}>
                              {t.riskLabel} {choice.longTerm.risk}%
                            </span>
                          </div>
                          <OfflineAudioNarrator 
                            text={getLocalizedText(choice.longTerm.message)}
                            theme={scenario.theme}
                            language={currentLang}
                          />
                          {feedbackText && isSelected && showResult && (
                            <div className={`mt-3 rounded-lg p-3 text-sm font-semibold ${
                              feedbackType === 'correct'
                                ? 'bg-green-50 text-green-700 border border-green-200'
                                : 'bg-red-50 text-red-700 border border-red-200'
                            }`}>
                              {feedbackText}
                            </div>
                          )}
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
            <p className="text-gray-600 text-sm">{t.selectOption}</p>
          </div>
        ) : (
          <div className="flex gap-4">
            <button
              onClick={nextScenario}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              {t.next}
            </button>
            <button
              onClick={() => setCurrentThemeIdx(null)}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200"
            >
              {t.menu}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

