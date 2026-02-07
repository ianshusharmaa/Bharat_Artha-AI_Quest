"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

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
  const { language: lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const t = translations[lang];
  const navItems = [
    { href: '/game', label: t.gameModes },
    { href: '/game/quiz', label: t.quiz },
    { href: '/profile', label: t.profile }
  ];

  return (
    <nav
      className="sticky top-0 z-50 bg-[var(--navbar-bg)] backdrop-blur-md border-b border-indigo-50 p-4 transition-all"
      style={{ boxShadow: 'var(--navbar-shadow)' }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative transform group-hover:scale-110 transition-transform duration-300">
             <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-30 group-hover:opacity-75 blur"></div>
             <Image src="/sounds/logo.png" alt="Logo" width={45} height={45} className="relative drop-shadow-md rounded-full bg-white p-1" priority />
          </div>
          <span className="text-2xl font-black bg-gradient-to-r from-blue-700 via-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tight">
            {t.brand}
          </span>
        </Link>

        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md bg-[var(--primary)] text-white"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? '✕' : '☰'}
        </button>

        <div className="hidden md:flex space-x-6 items-center">
          {navItems.map((item) => (
            <NavItem key={item.href} href={item.href} label={item.label} active={pathname.startsWith(item.href)} />
          ))}
        </div>
      </div>

      <div
        id="primary-navigation"
        className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-60 mt-4' : 'max-h-0'}`}
      >
        <div className="flex flex-col gap-2">
          {navItems.map((item) => (
            <NavItem key={item.href} href={item.href} label={item.label} active={pathname.startsWith(item.href)} mobile />
          ))}
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({
  href,
  label,
  active = false,
  mobile = false
}: {
  href: string;
  label: string;
  active?: boolean;
  mobile?: boolean;
}) => (
  <Link
    href={href}
    className={
      `${mobile ? 'px-3 py-2 rounded-md' : 'px-2 py-1'} text-[var(--foreground)] font-medium transition-colors duration-200 hover:text-[var(--primary)] ` +
      (active ? 'text-[var(--primary)] font-semibold' : '')
    }
  >
    <span className="relative group">
      {label}
      <span className={`absolute left-0 -bottom-1 h-0.5 bg-[var(--primary)] transition-all duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
    </span>
  </Link>
);
export default Navbar;
