'use client';
import React from 'react';

interface ConsequenceData {
  timeframe: string;
  shortTerm: string;
  midTerm: string;
  longTerm: string;
  icon: string;
}

interface DecisionImpactProps {
  wisdomGain: number;
  moneyChange: number;
  riskLevel: number;
  message: string;
}

/**
 * Visual Decision Impact Component
 * Shows immediate and long-term consequences of financial decisions
 * Designed for visual learning in rural settings
 */
export const DecisionImpactVisualization: React.FC<DecisionImpactProps> = ({
  wisdomGain,
  moneyChange,
  riskLevel,
  message
}) => {
  const isPositive = wisdomGain >= 70;
  const isNeutral = wisdomGain >= 40 && wisdomGain < 70;

  return (
    <div className={`rounded-lg p-4 border-2 ${
      isPositive ? 'border-green-500 bg-green-50' : 
      isNeutral ? 'border-yellow-500 bg-yellow-50' : 
      'border-red-500 bg-red-50'
    }`}>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">
          {isPositive ? '✅' : isNeutral ? '⚠️' : '❌'}
        </span>
        <p className="font-bold text-gray-900">{message}</p>
      </div>

      {/* Impact Metrics */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded p-3 text-center">
          <p className="text-sm text-gray-600">Wisdom</p>
          <p className={`text-lg font-bold ${wisdomGain >= 70 ? 'text-green-600' : 'text-red-600'}`}>
            +{wisdomGain}
          </p>
        </div>
        <div className="bg-white rounded p-3 text-center">
          <p className="text-sm text-gray-600">Money</p>
          <p className={`text-lg font-bold ${moneyChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {moneyChange >= 0 ? '+' : ''}₹{moneyChange}
          </p>
        </div>
        <div className="bg-white rounded p-3 text-center">
          <p className="text-sm text-gray-600">Risk</p>
          <p className={`text-lg font-bold ${riskLevel <= 30 ? 'text-green-600' : riskLevel <= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
            {riskLevel}%
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * Consequence Timeline Visualization
 * Shows how decisions affect you over time
 */
export const ConsequenceTimeline: React.FC<{ consequences: ConsequenceData[] }> = ({ consequences }) => {
  return (
    <div className="mt-6">
      <h4 className="font-bold text-gray-900 mb-4">📅 Impact Over Time:</h4>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-purple-600"></div>

        {/* Timeline items */}
        <div className="space-y-6 ml-16">
          {consequences.map((consequence, idx) => (
            <div key={idx} className="relative">
              {/* Dot */}
              <div className="absolute -left-10 top-2 w-6 h-6 bg-white border-4 border-blue-500 rounded-full"></div>
              
              {/* Content */}
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
                <p className="font-semibold text-gray-900">{consequence.timeframe}</p>
                <p className="text-sm text-gray-700 mt-1">{consequence.shortTerm}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Comparison Card - Shows Good vs Bad Decision
 */
export const DecisionComparison: React.FC<{
  goodDecision: { text: string; impact: string; score: number };
  badDecision: { text: string; impact: string; score: number };
}> = ({ goodDecision, badDecision }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      {/* Good Decision */}
      <div className="border-4 border-green-500 rounded-lg p-4 bg-green-50">
        <h4 className="font-bold text-green-700 mb-2 flex items-center gap-2">
          <span className="text-2xl">✅</span> Smart Choice
        </h4>
        <p className="text-sm font-semibold text-gray-900">{goodDecision.text}</p>
        <p className="text-xs text-gray-700 mt-2">{goodDecision.impact}</p>
        <div className="mt-3">
          <div className="flex justify-between text-xs mb-1">
            <span>Success Rate</span>
            <span className="font-bold">{goodDecision.score}%</span>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full"
              style={{ width: `${goodDecision.score}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Bad Decision */}
      <div className="border-4 border-red-500 rounded-lg p-4 bg-red-50">
        <h4 className="font-bold text-red-700 mb-2 flex items-center gap-2">
          <span className="text-2xl">❌</span> Risky Choice
        </h4>
        <p className="text-sm font-semibold text-gray-900">{badDecision.text}</p>
        <p className="text-xs text-gray-700 mt-2">{badDecision.impact}</p>
        <div className="mt-3">
          <div className="flex justify-between text-xs mb-1">
            <span>Risk Level</span>
            <span className="font-bold">{badDecision.score}%</span>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-2">
            <div 
              className="bg-red-500 h-2 rounded-full"
              style={{ width: `${badDecision.score}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecisionImpactVisualization;
