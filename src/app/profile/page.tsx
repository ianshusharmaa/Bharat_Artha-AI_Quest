'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const avatars = ['👤', '👨', '👩', '🧑', '👦', '👧', '🧒', '👨‍💼', '👩‍💼', '🧑‍🎓', '👨‍🎓', '👩‍🎓', '🦸', '🦹', '🧙', '🧚'];

const ProfilePage = () => {
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('👤');
  const [badges, setBadges] = useState<number[]>([]);
  const [streak, setStreak] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [tempUsername, setTempUsername] = useState('');
  const [tempAvatar, setTempAvatar] = useState('👤');

  useEffect(() => {
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

  const handleSave = () => {
    localStorage.setItem('username', tempUsername);
    localStorage.setItem('avatar', tempAvatar);
    setUsername(tempUsername);
    setAvatar(tempAvatar);
    setIsEditing(false);
  };

  const badgeList = [
    { id: 1, name: "Quiz Master", icon: "🏆" },
    { id: 4, name: "Perfect Score", icon: "🌟" },
    { id: 5, name: "Speed Master", icon: "⚡" },
    { id: 6, name: "Streak Champion", icon: "🔥" },
    { id: 7, name: "Financial Guru", icon: "🎓" },
    { id: 8, name: "Investor", icon: "📈" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)]">
      <header className="bg-[var(--navbar-bg)] shadow-md p-4" style={{ boxShadow: 'var(--navbar-shadow)' }}>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[var(--primary)]">Profile</h1>
          <Link href="/game">
            <button className="bg-[var(--primary)] text-white px-4 py-2 rounded-lg hover:opacity-80">
              Back to Game
            </button>
          </Link>
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
                    <span className="text-orange-600 font-bold">🔥 {streak} Day Streak</span>
                  </div>
                  <div className="bg-blue-100 px-4 py-2 rounded-full">
                    <span className="text-blue-600 font-bold">🏆 {badges.length} Badges</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-[var(--primary)] text-white px-6 py-2 rounded-lg hover:opacity-80"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>

            {/* Edit Mode */}
            {isEditing && (
              <div className="mt-6 pt-6 border-t border-[var(--card-border)]">
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2 text-[var(--foreground)]">Username</label>
                  <input
                    type="text"
                    value={tempUsername}
                    onChange={(e) => setTempUsername(e.target.value)}
                    className="w-full px-4 py-2 border border-[var(--card-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    placeholder="Enter username"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2 text-[var(--foreground)]">Choose Avatar</label>
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
                  Save Changes
                </button>
              </div>
            )}
          </div>

          {/* Achievements Section */}
          <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-[var(--primary)] mb-6">Your Achievements</h3>
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
                Progress: <span className="font-bold text-[var(--primary)]">{badges.length} / {badgeList.length}</span> unlocked
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
