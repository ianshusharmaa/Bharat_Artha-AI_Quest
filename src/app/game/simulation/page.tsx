'use client';

import React, { useState, useEffect } from 'react';
import { simulationEvents, SimulationEvent } from '@/data/simulationEvents';

const SimulationPage = () => {
  const [money, setMoney] = useState(1000);
  const [day, setDay] = useState(1);
  const [log, setLog] = useState<string[]>(['Welcome to the Budget Simulation!']);
  const [currentEvent, setCurrentEvent] = useState<SimulationEvent | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  const handleChoice = (choiceEffect: { money: number; message: string }, idx: number, correctIdx?: number) => {
    setSelected(idx);
    // Play sound: positive money = correct.wav, else wrong.mp3
    const isPositive = choiceEffect.money > 0;
    const audio = new Audio(isPositive ? '/sounds/correct.wav' : '/sounds/wrong.mp3');
    audio.play();
    setTimeout(() => {
      setMoney(money + choiceEffect.money);
      setLog([...log, `Day ${day}: ${choiceEffect.message}`]);
      setCurrentEvent(null);
      setSelected(null);
      if (day >= 10) {
        setIsFinished(true);
      } else {
        setDay(day + 1);
      }
    }, 700);
  };

  useEffect(() => {
    if (isFinished) return;
    if (!currentEvent) {
      const eventIndex = Math.floor(Math.random() * simulationEvents.length);
      const event = simulationEvents[eventIndex];
      if (event.type === 'income' || event.type === 'expense') {
        setMoney(money + (event.amount || 0));
        setLog([...log, `Day ${day}: ${event.description} Your balance changed by ${event.amount}.`]);
        if (day >= 10) {
          setIsFinished(true);
        } else {
          setDay(day + 1);
        }
      } else {
        setCurrentEvent(event);
      }
    }
  }, [day, currentEvent, log, money, isFinished]);

  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)]">
      <header className="bg-[var(--navbar-bg)] shadow-md p-4" style={{ boxShadow: 'var(--navbar-shadow)' }}>
        <h1 className="text-2xl font-bold text-[var(--primary)]">Simulation Mode</h1>
      </header>
      <main className="flex-grow p-8">
        <div className="max-w-4xl mx-auto bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl shadow-lg p-6">
          {/* Progress Bar */}
          {!isFinished && (
            <div className="w-full h-3 bg-gray-200 rounded-full mb-6">
              <div
                className="h-3 bg-[var(--primary)] rounded-full transition-all duration-300"
                style={{ width: `${((day-1) / 10) * 100}%` }}
              ></div>
            </div>
          )}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-[var(--primary)]">Day: {day > 10 ? 10 : day}</h2>
            <h2 className="text-xl font-semibold text-[var(--primary)]">Money: ${money}</h2>
          </div>

          {isFinished ? (
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4 text-[var(--primary)]">Simulation Complete!</h2>
              <div className="mb-6">
                <p className="text-lg text-[var(--foreground)]">You finished 10 days of budgeting.</p>
                <p className="text-lg text-[var(--foreground)]">Final Balance: <span className={money >= 1000 ? 'text-green-600' : 'text-red-600'}>${money}</span></p>
              </div>
              <div className="mb-6 text-left">
                <h3 className="text-xl font-semibold mb-2 text-[var(--primary)]">Activity Log:</h3>
                <div className="h-48 bg-[var(--background)] border border-[var(--card-border)] rounded p-2 overflow-y-auto">
                  {log.map((entry, index) => (
                    <p key={index} className="text-[var(--foreground)] opacity-80">{entry}</p>
                  ))}
                </div>
              </div>
              <button
                onClick={() => { setDay(1); setMoney(1000); setLog(['Welcome to the Budget Simulation!']); setIsFinished(false); setCurrentEvent(null); }}
                className="bg-[var(--primary)] text-white font-bold py-3 px-6 rounded-full hover:bg-[var(--secondary)] transition-transform transform hover:scale-105"
              >
                Restart Simulation
              </button>
            </div>
          ) : (
            <>
              {currentEvent && currentEvent.type === 'choice' && (
                <div className="mb-6 p-4 bg-[var(--accent)] bg-opacity-20 rounded-lg">
                  <p className="font-semibold mb-4 text-[var(--foreground)]">{currentEvent.description}</p>
                  <div className="flex gap-4">
                    {currentEvent.choices?.map((choice, index) => {
                      // If positive money, treat as 'correct', else 'incorrect'
                      let btnColor = 'bg-[var(--primary)] text-white';
                      if (selected !== null) {
                        if (choice.effect.money > 0 && index === selected) {
                          btnColor = 'bg-green-500 text-white';
                        } else if (choice.effect.money <= 0 && index === selected) {
                          btnColor = 'bg-red-500 text-white';
                        } else {
                          btnColor = 'bg-gray-200 text-[var(--foreground)]';
                        }
                      }
                      return (
                        <button
                          key={index}
                          onClick={() => selected === null && handleChoice(choice.effect, index)}
                          className={
                            `${btnColor} p-2 rounded-lg transition font-semibold flex-1 ` +
                            (selected === null ? 'hover:bg-blue-400 focus:outline-none' : 'cursor-default')
                          }
                          disabled={selected !== null}
                        >
                          {choice.text}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
              <div>
                <h3 className="text-lg font-semibold mb-2 text-[var(--primary)]">Activity Log:</h3>
                <div className="h-48 bg-[var(--background)] border border-[var(--card-border)] rounded p-2 overflow-y-auto">
                  {log.map((entry, index) => (
                    <p key={index} className="text-[var(--foreground)] opacity-80">{entry}</p>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      <footer className="bg-[var(--navbar-bg)] shadow-md p-4 text-center" style={{ boxShadow: 'var(--navbar-shadow)' }}>
        <p className="text-[var(--foreground)] opacity-70">© 2026 Financial Literacy Adventure</p>
      </footer>
    </div>
  );
};

export default SimulationPage;
