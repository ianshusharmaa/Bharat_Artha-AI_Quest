"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const translations = {
  hi: {
    brand: 'भारत अर्थ-AI Quest',
    gameModes: 'गेम मोड',
    quiz: 'क्विज़',
    profile: 'प्रोफ़ाइल'
  },
  en: {
    brand: 'Bharat Arth-AI Quest',
    gameModes: 'Game Modes',
    quiz: 'Quiz',
    profile: 'Profile'
  }
} as const;

const Navbar = () => {
  const [lang, setLang] = useState<'hi' | 'en'>('hi');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const savedLang = localStorage.getItem('lang') as 'hi' | 'en' | null;
    if (savedLang === 'hi' || savedLang === 'en') {
      setLang(savedLang);
    }
  }, []);

  const t = translations[lang];

  return (
    <nav
      className="bg-[var(--navbar-bg)] shadow-md p-4"
      style={{ boxShadow: 'var(--navbar-shadow)' }}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer">
            <img src="/sounds/logo.png" alt="Logo" width={40} height={40} className="drop-shadow-md" />
            <span className="text-xl font-extrabold text-[var(--primary)] tracking-tight">{t.brand}</span>
          </div>
        </Link>
        <div className="flex space-x-6">
          <NavItem href="/game" label={t.gameModes} />
          <NavItem href="/game/quiz" label={t.quiz} />
          <NavItem href="/profile" label={t.profile} />
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({ href, label }: { href: string; label: string }) => (
  <Link href={href} legacyBehavior>
    <a className="relative px-2 py-1 text-[var(--foreground)] font-medium transition-colors duration-200 hover:text-[var(--primary)] group">
      {label}
      <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[var(--primary)] transition-all duration-300 group-hover:w-full"></span>
    </a>
  </Link>
);

export default Navbar;
