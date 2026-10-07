import React, { useState } from 'react';
import { ElementGuesserGame } from './ElementGuesserGame';
import { ChemicalWordDecoder } from './ChemicalWordDecoder';
import { Trophy, Type } from 'lucide-react';

type GameTab = 'guesser' | 'decoder';

export const ChemistryGames: React.FC = () => {
  const [activeTab, setActiveTab] = useState<GameTab>('guesser');

  return (
    <div className="space-y-4">
      {/* Games Sub-Navigation */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-900 border border-slate-800 rounded-2xl p-2 shadow-inner">
        <button
          type="button"
          onClick={() => setActiveTab('guesser')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
            activeTab === 'guesser'
              ? 'bg-gradient-to-r from-rose-500 to-indigo-600 text-white shadow-md shadow-rose-500/25'
              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>ქიმიური დეტექტივი — „ვინ ვარ მე?“</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('decoder')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
            activeTab === 'decoder'
              ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md shadow-purple-500/25'
              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <Type className="w-4 h-4" />
          <span>ქიმიური სიტყვების დეკოდერი</span>
        </button>
      </div>

      {/* Active Game View */}
      <div>
        {activeTab === 'guesser' && <ElementGuesserGame />}
        {activeTab === 'decoder' && <ChemicalWordDecoder />}
      </div>
    </div>
  );
};
