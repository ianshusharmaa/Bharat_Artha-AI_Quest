'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const avatars = ['👤', '👨', '👩', '🧑', '👦', '👧', '🧒', '👨‍💼', '👩‍💼', '🧑‍🎓', '👨‍🎓', '👩‍🎓', '🦸', '🦹', '🧙', '🧚'];

const translations = {
  hi: {
    profile: 'प्रोफाइल',
    backToGame: 'गेम में वापस जाएं',
    dayStreak: 'दिन की स्ट्रीक',
    badges: 'बैज',
    editProfile: 'प्रोफाइल संपादित करें',
    cancel: 'रद्द करें',
    username: 'उपयोगकर्ता नाम',
    enterUsername: 'उपयोगकर्ता नाम दर्ज करें',
    chooseAvatar: 'अवतार चुनें',
    saveChanges: 'परिवर्तन सहेजें',
    achievements: 'आपकी उपलब्धियां',
    progress: 'प्रगति',
    unlocked: 'अनलॉक किए गए',
    quizMaster: 'क्विज मास्टर',
    perfectScore: 'परफेक्ट स्कोर',
    speedMaster: 'स्पीड मास्टर',
    streakChampion: 'स्ट्रीक चैंपियन',
    financialGuru: 'वित्तीय गुरु',
    investor: 'निवेशक',
  },
  en: {
    profile: 'Profile',
    backToGame: 'Back to Game',
    dayStreak: 'Day Streak',
    badges: 'Badges',
    editProfile: 'Edit Profile',
    cancel: 'Cancel',
    username: 'Username',
    enterUsername: 'Enter username',
    chooseAvatar: 'Choose Avatar',
    saveChanges: 'Save Changes',
    achievements: 'Your Achievements',
    progress: 'Progress',
    unlocked: 'unlocked',
    quizMaster: 'Quiz Master',
    perfectScore: 'Perfect Score',
    speedMaster: 'Speed Master',
    streakChampion: 'Streak Champion',
    financialGuru: 'Financial Guru',
    investor: 'Investor',
  }
};

const ProfilePage = () => {
  const { language: lang, setLanguage: setLang } = useLanguage();
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('👤');
  const [badges, setBadges] = useState<number[]>([]);
  const [streak, setStreak] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [tempUsername, setTempUsername] = useState('');
  const [tempAvatar, setTempAvatar] = useState('👤');

  const t = translations[lang];

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Language logic moved to context

    const savedUsername = localStorage.getItem('username') || 'Player';
    const savedAvatar = localStorage.getItem('avatar') || '👤';
    const savedBadges = JSON.parse(localStorage.getItem('badges') || '[]');
    const savedStreak = parseInt(localStorage.getItem('streak') || '0');
    
    setUsername(savedUsername);
    setAvatar(savedAvatar);
    setBadges(savedBadges);
    setStreak(savedStreak);
    setTempUsername(savedUsername);
    setTempAvatar(savedAvatar);
  }, []);

  const setLanguage = (newLang: 'hi' | 'en') => {
    setLang(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('lang', newLang);
    }
  };

  const handleSave = () => {
    localStorage.setItem('username', tempUsername);
    localStorage.setItem('avatar', tempAvatar);
    setUsername(tempUsername);
    setAvatar(tempAvatar);
    setIsEditing(false);
  };

  const badgeList = [
    { id: 1, name: t.quizMaster, icon: "🏆" },
    { id: 4, name: t.perfectScore, icon: "🌟" },
    { id: 5, name: t.speedMaster, icon: "⚡" },
    { id: 6, name: t.streakChampion, icon: "🔥" },
    { id: 7, name: t.financialGuru, icon: "🎓" },
    { id: 8, name: t.investor, icon: "📈" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)]">
      <header className="bg-[var(--navbar-bg)] shadow-md p-4" style={{ boxShadow: 'var(--navbar-shadow)' }}>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[var(--primary)]">{t.profile}</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setLanguage('hi')}
              className={`px-3 py-1 rounded ${lang === 'hi' ? 'bg-[var(--primary)] text-white' : 'bg-gray-300 text-black'}`}
            >
              हिन्दी
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 rounded ${lang === 'en' ? 'bg-[var(--primary)] text-white' : 'bg-gray-300 text-black'}`}
            >
              English
            </button>
            <Link href="/game">
              <button className="bg-[var(--primary)] text-white px-4 py-2 rounded-lg hover:opacity-80">
                {t.backToGame}
              </button>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-grow p-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Card */}
          <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl shadow-lg p-8 mb-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="text-8xl">{avatar}</div>
              <div className="flex-grow text-center md:text-left">
                <h2 className="text-3xl font-bold text-[var(--primary)] mb-2">{username}</h2>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <div className="bg-orange-100 px-4 py-2 rounded-full">
                    <span className="text-orange-600 font-bold">🔥 {streak} {t.dayStreak}</span>
                  </div>
                  <div className="bg-blue-100 px-4 py-2 rounded-full">
                    <span className="text-blue-600 font-bold">🏆 {badges.length} {t.badges}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-[var(--primary)] text-white px-6 py-2 rounded-lg hover:opacity-80"
              >
                {isEditing ? t.cancel : t.editProfile}
              </button>
            </div>

            {/* Edit Mode */}
            {isEditing && (
              <div className="mt-6 pt-6 border-t border-[var(--card-border)]">
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2 text-[var(--foreground)]">{t.username}</label>
                  <input
                    type="text"
                    value={tempUsername}
                    onChange={(e) => setTempUsername(e.target.value)}
                    className="w-full px-4 py-2 border border-[var(--card-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    placeholder={t.enterUsername}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2 text-[var(--foreground)]">{t.chooseAvatar}</label>
                  <div className="grid grid-cols-8 gap-2">
                    {avatars.map((av) => (
                      <button
                        key={av}
                        onClick={() => setTempAvatar(av)}
                        className={`text-4xl p-2 rounded-lg transition ${
                          tempAvatar === av ? 'bg-[var(--primary)] bg-opacity-20 ring-2 ring-[var(--primary)]' : 'hover:bg-gray-100'
                        }`}
                      >
                        {av}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 font-bold"
                >
                  {t.saveChanges}
                </button>
              </div>
            )}
          </div>

          {/* Achievements Section */}
          <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-[var(--primary)] mb-6">{t.achievements}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {badgeList.map((badge) => (
                <div
                  key={badge.id}
                  className={`flex flex-col items-center p-4 rounded-lg border transition-all duration-300 ${
                    badges.includes(badge.id)
                      ? 'border-green-400 bg-green-50'
                      : 'border-gray-200 bg-gray-50 opacity-50 grayscale'
                  }`}
                >
                  <span className="text-4xl mb-2">{badge.icon}</span>
                  <span className="font-semibold text-sm text-center">{badge.name}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <p className="text-lg text-gray-600">
                {t.progress}: <span className="font-bold text-[var(--primary)]">{badges.length} / {badgeList.length}</span> {t.unlocked}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
