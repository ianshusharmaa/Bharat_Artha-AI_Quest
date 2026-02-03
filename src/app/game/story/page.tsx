'use client';

import React, { useState } from 'react';
import { story, StoryNode } from '@/data/story';

const StoryPage = () => {
  const [currentNodeId, setCurrentNodeId] = useState(1);
  const [path, setPath] = useState<number[]>([1]);
  const [selected, setSelected] = useState<number | null>(null);

  const handleChoice = (nextId: number, idx: number) => {
    setSelected(idx);
    // Play sound: always correct.wav for story choices
    const audio = new Audio('/sounds/correct.wav');
    audio.play();
    setTimeout(() => {
      setCurrentNodeId(nextId);
      setPath([...path, nextId]);
      setSelected(null);
    }, 700);
  };

  const restartStory = () => {
    setCurrentNodeId(1);
    setPath([1]);
  };

  const currentNode = story.find(node => node.id === currentNodeId);

  if (!currentNode) {
    return <div>Story not found!</div>;
  }

  // Progress calculation: count of non-ending nodes visited
  const totalSteps = path.length;
  const maxSteps = 5; // Approximate max steps for progress bar

  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)]">
      <header className="bg-[var(--navbar-bg)] shadow-md p-4" style={{ boxShadow: 'var(--navbar-shadow)' }}>
        <h1 className="text-2xl font-bold text-[var(--primary)]">Story Mode</h1>
      </header>
      <main className="flex-grow p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full mx-auto bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl shadow-lg p-8">
          {/* Progress Bar */}
          {!currentNode.isEnding && (
            <div className="w-full h-3 bg-gray-200 rounded-full mb-6">
              <div
                className="h-3 bg-[var(--primary)] rounded-full transition-all duration-300"
                style={{ width: `${Math.min((totalSteps-1) / maxSteps, 1) * 100}%` }}
              ></div>
            </div>
          )}
          <div className="mb-6">
            <p className="text-lg leading-relaxed text-[var(--foreground)]">{currentNode.text}</p>
          </div>
          {currentNode.isEnding ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4 text-[var(--primary)]">Story Complete!</h2>
              <div className="mb-6 text-left">
                <h3 className="text-xl font-semibold mb-2 text-[var(--primary)]">Your Path:</h3>
                <ol className="list-decimal ml-6 space-y-1">
                  {path.map((nodeId, idx) => {
                    const node = story.find(n => n.id === nodeId);
                    return node ? (
                      <li key={idx} className="text-[var(--foreground)]">{node.text}</li>
                    ) : null;
                  })}
                </ol>
              </div>
              <button
                onClick={restartStory}
                className="bg-[var(--primary)] text-white font-bold py-3 px-6 rounded-full hover:bg-[var(--secondary)] transition-transform transform hover:scale-105"
              >
                Play Again
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {currentNode.choices.map((choice, index) => {
                let btnColor = 'bg-[var(--primary)] text-white';
                if (selected !== null) {
                  if (index === selected) {
                    btnColor = 'bg-green-500 text-white';
                  } else {
                    btnColor = 'bg-gray-200 text-[var(--foreground)]';
                  }
                }
                return (
                  <button
                    key={index}
                    onClick={() => selected === null && handleChoice(choice.nextId, index)}
                    className={
                      `${btnColor} p-4 rounded-lg transition font-semibold ` +
                      (selected === null ? 'hover:bg-blue-400 focus:outline-none' : 'cursor-default')
                    }
                    disabled={selected !== null}
                  >
                    {choice.text}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <footer className="bg-[var(--navbar-bg)] shadow-md p-4 text-center" style={{ boxShadow: 'var(--navbar-shadow)' }}>
        <p className="text-[var(--foreground)] opacity-70">© 2026 Financial Literacy Adventure</p>
      </footer>
    </div>
  );
};

export default StoryPage;
