import { useState, useEffect, useCallback, useRef } from 'react';

export const useTextToSpeech = () => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const synth = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      synth.current = window.speechSynthesis;

      const updateVoices = () => {
        if (synth.current) {
          const loadedVoices = synth.current.getVoices();
          setVoices(loadedVoices);
        }
      };

      updateVoices();
      
      // Chrome/others load voices asynchronously
      if (synth.current && synth.current.onvoiceschanged !== undefined) {
        synth.current.onvoiceschanged = updateVoices;
      }
    }
  }, []);

  const speak = useCallback((textNativeHindi: string, textRomanHindi: string, textEnglish: string, lang: 'hi' | 'en') => {
    if (!synth.current) return;

    // Resume if paused (Chrome bug fix)
    if (synth.current.paused) {
      synth.current.resume();
    }

    synth.current.cancel();

    let textToSpeak = '';
    let selectedVoice: SpeechSynthesisVoice | undefined;

    if (lang === 'hi') {
      // STRICT check for actual Hindi voice (hi-IN), avoiding en-IN
      const hindiVoice = voices.find(v => 
        v.lang.toLowerCase().includes('hi-') || 
        v.lang.toLowerCase() === 'hi'
      );
      
      if (hindiVoice) {
        textToSpeak = textNativeHindi;
        selectedVoice = hindiVoice;
      } else {
        // Fallback: Use Romanized Hindi
        textToSpeak = textRomanHindi;
        // Try to find Indian English voice for better accent
        const indianEnglishVoice = voices.find(v => 
             v.lang.toLowerCase().includes('en-in') || 
             v.name.includes('India')
        );
        if (indianEnglishVoice) {
            selectedVoice = indianEnglishVoice;
        }
      }
    } else {
      textToSpeak = textEnglish;
      // Don't set selectedVoice, let browser pick default English
      // Optional: Explicitly find English voice if needed, but default usually works
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
      utterance.lang = selectedVoice.lang;
    } else if (lang === 'hi') {
      // If we are falling back for Hindi, force US English so it reads Romanized text cleanly
      utterance.lang = 'en-US'; 
    }

    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    // Small timeout to ensure cancel happened effectively
    setTimeout(() => {
        synth.current?.speak(utterance);
    }, 10);
    
  }, [voices]);

  return { speak };
};
