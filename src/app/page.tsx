"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const languages = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
];

const translations = {
  en: {
    welcome: "भारत अर्थ-AI Quest",
    subtitle: "Master Financial Literacy Through AI-Powered Games",
    selectLanguage: "Select your language / अपनी भाषा चुनें",
    start: "Start",
  },
  hi: {
    welcome: "भारत अर्थ-AI Quest",
    subtitle: "AI-संचालित खेलों के माध्यम से वित्तीय साक्षरता में महारत हासिल करें",
    selectLanguage: "अपनी भाषा चुनें / Select your language",
    start: "शुरू करें",
  }
};

export default function Home() {
  const [selectedLang, setSelectedLang] = useState("en");
  const router = useRouter();

  const t = translations[selectedLang as keyof typeof translations] || translations.en;

  const handleStart = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", selectedLang);
    }
    router.push("/game");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 p-8">
      <div className="bg-white border-2 border-blue-200 rounded-3xl shadow-2xl p-12 max-w-2xl w-full text-center">
        <div className="flex justify-center mb-6">
          <img src="/sounds/logo.png" alt="Logo" width={80} height={80} className="drop-shadow-lg" />
        </div>
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent mb-3">
          {t.welcome}
        </h1>
        <p className="text-lg text-gray-600 mb-2">{t.subtitle}</p>
        <p className="mb-8 text-gray-500">Financial Education Reimagined with AI</p>
        
        <div className="flex justify-center gap-4 mb-10">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelectedLang(lang.code)}
              className={`px-6 py-3 rounded-full font-semibold border-2 transition-all duration-200 ${selectedLang === lang.code ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'}`}
            >
              {lang.label}
            </button>
          ))}
        </div>
        <button
          onClick={handleStart}
          className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 text-white font-bold py-3 px-10 rounded-full hover:shadow-lg transition-all transform hover:scale-105"
        >
          {t.start}
        </button>
      </div>
    </main>
  );
}
