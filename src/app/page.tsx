"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const languages = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
];

export default function Home() {
  const [selectedLang, setSelectedLang] = useState("en");
  const router = useRouter();

  const handleStart = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", selectedLang);
    }
    router.push("/game");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[var(--background)] p-8">
      <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
        <h1 className="text-3xl font-extrabold text-[var(--primary)] mb-6">Welcome!</h1>
        <p className="mb-6 text-[var(--foreground)]">Select your language / अपनी भाषा चुनें</p>
        <div className="flex justify-center gap-4 mb-8">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelectedLang(lang.code)}
              className={`px-6 py-2 rounded-full font-semibold border transition-all duration-200 ${selectedLang === lang.code ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'bg-white text-[var(--foreground)] border-gray-300 hover:bg-blue-100'}`}
            >
              {lang.label}
            </button>
          ))}
        </div>
        <button
          onClick={handleStart}
          className="bg-[var(--primary)] text-white font-bold py-3 px-8 rounded-full hover:bg-[var(--secondary)] transition-transform transform hover:scale-105"
        >
          Start
        </button>
      </div>
    </main>
  );
}
