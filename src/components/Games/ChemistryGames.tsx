import React, { useState } from 'react';
import { ChemistryQuizGame } from './ChemistryQuizGame';
import { ElementGuesserGame } from './ElementGuesserGame';
import { ChemicalWordDecoder } from './ChemicalWordDecoder';
import { Trophy, HelpCircle, Type, Sparkles } from 'lucide-react';

export type GameTab = 'quiz' | 'guesser' | 'decoder';

export const ChemistryGames: React.FC = () => {
  const [activeTab, setActiveTab] = useState<GameTab>('quiz');

  return (
    <div className="space-y-4">
      {/* Games Sub-Navigation */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-900 border border-slate-800 rounded-2xl p-2 shadow-inner">
        <button
          type="button"
          onClick={() => setActiveTab('quiz')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
            activeTab === 'quiz'
              ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md shadow-purple-500/25 font-black'
              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <Trophy className="w-4 h-4 text-amber-300" />
          <span>დიდი ქიმიური ქვიზი & ტესტები</span>
          <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-400/25 text-amber-200 border border-amber-400/40 font-mono flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5" />
            <span>მინიშნებებით</span>
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('guesser')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
            activeTab === 'guesser'
              ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-slate-950 shadow-md shadow-rose-500/25 font-black'
              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>ქიმიური დეტექტივი — „ვინ ვარ მე?“</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('decoder')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
            activeTab === 'decoder'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/25 font-black'
              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <Type className="w-4 h-4" />
          <span>ქიმიური სიტყვების დეკოდერი</span>
        </button>
      </div>

      {/* Active Game View */}
      <div>
        {activeTab === 'quiz' && <ChemistryQuizGame />}
        {activeTab === 'guesser' && <ElementGuesserGame />}
        {activeTab === 'decoder' && <ChemicalWordDecoder />}
      </div>
    </div>
  );
};
