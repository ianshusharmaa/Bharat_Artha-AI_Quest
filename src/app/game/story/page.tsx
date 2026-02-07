'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { story, StoryNode } from '@/data/story';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import Link from 'next/link';

const translations = {
  hi: {
    title: 'वित्तीय कहानी',
    start: 'कहानी शुरू करें',
    restart: 'पुनः शुरू करें',
    back: 'लॉबी में वापस जाएं',
    ending: 'अंत',
    goodEnding: '🌟 अच्छा अंत',
    badEnding: '⚠️ बुरा अंत',
    neutralEnding: '😐 तटस्थ अंत',
    yourDecision: 'आपका निर्णय?',
    next: 'आगे',
  },
  en: {
    title: 'Financial Story',
    start: 'Start Story',
    restart: 'Restart',
    back: 'Back to Lobby',
    ending: 'Ending',
    goodEnding: '🌟 Good Ending',
    badEnding: '⚠️ Bad Ending',
    neutralEnding: '😐 Neutral Ending',
    yourDecision: 'Your Decision?',
    next: 'Next',
  }
} as const;

export default function StoryPage() {
  const { language: lang } = useLanguage();
  const t = translations[lang];
  const { speak } = useTextToSpeech();
  
  const [currentNodeId, setCurrentNodeId] = useState<number | null>(null);
  const [history, setHistory] = useState<number[]>([]);
  const [gameStarted, setGameStarted] = useState(false);

  const currentNode = currentNodeId ? story.find(n => n.id === currentNodeId) : null;

  const startGame = () => {
    setCurrentNodeId(1);
    setHistory([1]);
    setGameStarted(true);
  };

  const handleChoice = (nextId: number) => {
    setCurrentNodeId(nextId);
    setHistory([...history, nextId]);
  };

  const restart = () => {
    setCurrentNodeId(null);
    setHistory([]);
    setGameStarted(false);
  };

  // Speak the story text when the node changes
  useEffect(() => {
    if (currentNode && gameStarted) {
      speak(
        currentNode.text, // Hindi text (if available in future, currently story.ts is English only, so we might need to handle this)
        currentNode.text,
        currentNode.text,
        'en' // Forcing English as story.ts seems to be English only for now. Or we can add translations later.
      );
    }
  }, [currentNode, gameStarted, speak]);

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 text-center border border-indigo-100">
           <div className="mb-6 bg-indigo-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-4xl">
             📖
           </div>
           <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {t.title}
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            {lang === 'hi' ? 'अपने निर्णयों से अपनी वित्तीय कहानी लिखें।' : 'Write your financial story through your decisions.'}
          </p>
          <div className="flex justify-center gap-4">
             <button
              onClick={startGame}
              className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-full hover:bg-indigo-700 transition shadow-lg transform hover:scale-105"
            >
              {t.start}
            </button>
            <Link href="/game">
              <button className="bg-gray-500 text-white font-bold py-3 px-8 rounded-full hover:bg-gray-600 transition shadow-lg transform hover:scale-105">
                {t.back}
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!currentNode) return null;

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-6">
             <span className="text-sm font-semibold tracking-wider text-indigo-500 uppercase bg-indigo-50 px-3 py-1 rounded-full">
               Step {history.length}
             </span>
             <button onClick={restart} className="text-gray-400 hover:text-gray-600 text-sm underline">
               {t.restart}
             </button>
          </div>

          <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-8">
            {currentNode.text}
          </p>

          {currentNode.isEnding ? (
            <div className={`p-6 rounded-xl border-l-4 mb-6 ${
              currentNode.endingType === 'good' ? 'bg-green-50 border-green-500 text-green-800' :
              currentNode.endingType === 'bad' ? 'bg-red-50 border-red-500 text-red-800' :
              'bg-yellow-50 border-yellow-500 text-yellow-800'
            }`}>
              <h3 className="text-lg font-bold mb-2">
                {currentNode.endingType === 'good' ? t.goodEnding :
                 currentNode.endingType === 'bad' ? t.badEnding : t.neutralEnding}
              </h3>
              <p>{lang === 'hi' ? 'कहानी समाप्त।' : 'The End.'}</p>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-600 mb-2">{t.yourDecision}</h3>
              {currentNode.choices.map((choice, idx) => (
                <button
                  key={idx}
                  onClick={() => handleChoice(choice.nextId)}
                  className="w-full text-left p-4 rounded-xl border-2 border-indigo-100 hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200 flex items-center group bg-white"
                >
                  <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-4 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-lg font-medium text-gray-700 group-hover:text-indigo-900">
                    {choice.text}
                  </span>
                </button>
              ))}
            </div>
          )}

          {currentNode.isEnding && (
             <div className="flex gap-4 mt-8 justify-center">
                <button
                  onClick={restart}
                  className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-full hover:bg-indigo-700 transition shadow-md"
                >
                  {t.restart}
                </button>
                <Link href="/game">
                  <button className="bg-gray-500 text-white font-bold py-3 px-8 rounded-full hover:bg-gray-600 transition shadow-md">
                    {t.back}
                  </button>
                </Link>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
