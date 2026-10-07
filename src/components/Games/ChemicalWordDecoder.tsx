import React, { useState, useMemo } from 'react';
import { ELEMENTS } from '../../data/elements';
import type { ChemicalElement } from '../../types/element';
import { Sparkles, Type, AlertCircle } from 'lucide-react';

const SYMBOL_MAP = new Map<string, ChemicalElement>();
ELEMENTS.forEach(el => SYMBOL_MAP.set(el.symbol.toUpperCase(), el));

const WORD_PRESETS = [
  'BRAIN',
  'GENIUS',
  'COFFEE',
  'SCIENCE',
  'TEACHER',
  'POLICE',
  'BANANA',
  'CHAMPION',
  'BECAUSE',
  'CHOCOLATE',
];

function decodeWordToElements(word: string): ChemicalElement[] | null {
  const clean = word.toUpperCase().replace(/[^A-Z]/g, '');
  if (!clean) return null;

  function backtrack(idx: number): ChemicalElement[] | null {
    if (idx === clean.length) return [];

    // Try 2-letter symbol first
    if (idx + 2 <= clean.length) {
      const two = clean.slice(idx, idx + 2);
      const elTwo = SYMBOL_MAP.get(two);
      if (elTwo) {
        const rest = backtrack(idx + 2);
        if (rest !== null) return [elTwo, ...rest];
      }
    }

    // Try 1-letter symbol
    const one = clean.slice(idx, idx + 1);
    const elOne = SYMBOL_MAP.get(one);
    if (elOne) {
      const rest = backtrack(idx + 1);
      if (rest !== null) return [elOne, ...rest];
    }

    return null;
  }

  return backtrack(0);
}

export const ChemicalWordDecoder: React.FC = () => {
  const [inputWord, setInputWord] = useState('GENIUS');

  const decoded = useMemo(() => {
    return decodeWordToElements(inputWord);
  }, [inputWord]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl space-y-6 text-slate-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-500 to-pink-600 flex items-center justify-center text-white shadow-md shadow-purple-500/20">
            <Type className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black tracking-tight flex items-center gap-2">
              <span>ქიმიური სიტყვების დეკოდერი</span>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                სიმბოლოებით წერა
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              დაწერეთ ნებისმიერი სიტყვა და სისტემა მას პერიოდული სისტემის ელემენტებად ააწყობს
            </p>
          </div>
        </div>
      </div>

      {/* Input Field & Presets */}
      <div className="space-y-3">
        <div className="relative">
          <input
            type="text"
            value={inputWord}
            onChange={e => setInputWord(e.target.value)}
            placeholder="შეიყვანეთ სიტყვა (მაგ. BRAIN, SCIENCE, COFFEE)..."
            className="w-full bg-slate-950 border-2 border-slate-750 focus:border-purple-500 rounded-xl px-4 py-3 text-base sm:text-lg font-mono font-bold text-white placeholder-slate-600 outline-none transition-colors shadow-inner uppercase"
          />
        </div>

        {/* Presets */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-slate-400 font-semibold mr-1">მაგალითები:</span>
          {WORD_PRESETS.map(w => (
            <button
              key={w}
              type="button"
              onClick={() => setInputWord(w)}
              className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 hover:border-purple-500/50 text-slate-300 hover:text-purple-300 text-xs font-mono transition-all cursor-pointer"
            >
              {w}
            </button>
          ))}
        </div>
      </div>

      {/* Render Decoded Elements */}
      <div className="pt-2">
        {decoded ? (
          <div className="space-y-4">
            <div className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>გაშიფრული სიტყვა ({decoded.length} ელემენტი):</span>
            </div>

            {/* Elements Row */}
            <div className="flex flex-wrap items-center gap-3 p-4 bg-slate-950 rounded-2xl border border-slate-800 shadow-inner">
              {decoded.map((el, idx) => (
                <div
                  key={`${el.atomicNumber}-${idx}`}
                  className="w-24 h-28 rounded-xl bg-gradient-to-br from-slate-900 to-indigo-950/80 border-2 border-purple-500/50 p-2 flex flex-col justify-between shadow-lg hover:scale-105 transition-transform select-none"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>{el.atomicNumber}</span>
                    <span className="text-[9px] text-purple-300 font-bold">{el.block}</span>
                  </div>

                  <div className="text-center font-mono font-black text-2xl text-white tracking-wide">
                    {el.symbol}
                  </div>

                  <div className="text-center">
                    <span className="text-[10px] text-slate-300 font-semibold block truncate">
                      {el.nameKa}
                    </span>
                    <span className="text-[9px] text-slate-500 font-mono block">
                      {parseFloat(el.atomicMass).toFixed(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Elements Summary description */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
              <span className="font-bold text-purple-300 block">ქიმიური ფორმულა:</span>
              <p className="font-mono text-slate-200">
                {decoded.map(e => `${e.nameKa} (${e.symbol}, Z=${e.atomicNumber})`).join(' + ')}
              </p>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              სიტყვის „{inputWord}“ ზუსტი აწყობა ქიმიური სიმბოლოებით შეუძლებელია. სცადეთ სხვა სიტყვა (მაგ. GENIUS, BRAIN, COFFEE).
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
