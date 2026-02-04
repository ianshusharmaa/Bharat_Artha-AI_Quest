'use client';
import React, { useEffect, useState } from 'react';

interface AudioNarratorProps {
  text: string;
  language?: 'en' | 'hi';
  autoPlay?: boolean;
  theme?: 'savings' | 'insurance' | 'investment';
}

/**
 * Rural-Ready Audio Narrator Component
 * - Works offline using Web Speech API
 * - Supports Hindi & English
 * - Lightweight, no external dependencies
 * - Visual feedback with audio playback
 */
export const OfflineAudioNarrator: React.FC<AudioNarratorProps> = ({
  text,
  language = 'en',
  autoPlay = false,
  theme = 'savings'
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    const synth = window.speechSynthesis;
    setIsSupported(!!synth);
    
    if (autoPlay && synth) {
      speakText();
    }
  }, []);

  const speakText = () => {
    const synth = window.speechSynthesis;
    
    if (!synth) return;
    
    if (isSpeaking) {
      synth.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synth.speak(utterance);
  };

  if (!isSupported) {
    return null;
  }

  const themeColors = {
    savings: 'from-green-500 to-emerald-600',
    insurance: 'from-blue-500 to-cyan-600',
    investment: 'from-purple-500 to-indigo-600'
  };

  return (
    <button
      onClick={speakText}
      className={`
        inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold
        text-white bg-gradient-to-r ${themeColors[theme]}
        hover:shadow-lg transform hover:scale-105 transition-all duration-200
        ${isSpeaking ? 'ring-4 ring-yellow-300 animate-pulse' : ''}
      `}
      title={isSpeaking ? 'Playing...' : 'Click to hear this text'}
    >
      <span className="text-xl">
        {isSpeaking ? '🔊' : '🔉'}
      </span>
      {isSpeaking ? 'Playing...' : 'Listen'}
    </button>
  );
};

export default OfflineAudioNarrator;
