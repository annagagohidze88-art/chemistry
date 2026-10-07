import React, { useState, useMemo } from 'react';
import { ELEMENTS } from '../../data/elements';
import type { ChemicalElement } from '../../types/element';
import { Trophy, HelpCircle, CheckCircle2, ArrowUp, ArrowDown } from 'lucide-react';

export const ElementGuesserGame: React.FC = () => {
  // Secret element
  const [targetElement, setTargetElement] = useState<ChemicalElement>(() => {
    // Pick common school elements first (Z 1 to 36 or up to 80)
    const schoolElements = ELEMENTS.slice(0, 56);
    return schoolElements[Math.floor(Math.random() * schoolElements.length)];
  });

  const [unlockedClues, setUnlockedClues] = useState<number[]>([1, 2]); // First 2 clues free
  const [guessInput, setGuessInput] = useState('');
  const [guesses, setGuesses] = useState<{ element: ChemicalElement; direction: 'higher' | 'lower' | 'correct' }[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(100);
  const [wins, setWins] = useState(0);

  const clues = useMemo(() => [
    { id: 1, title: 'აგრეგატული მდგომარეობა (20 °C)', value: targetElement.phase === 'gas' ? 'აირი 💨' : targetElement.phase === 'liquid' ? 'სითხე 💧' : 'მყარი 🧱', cost: 0 },
    { id: 2, title: 'ქიმიური ოჯახი', value: targetElement.category, cost: 0 },
    { id: 3, title: 'პერიოდი და ბლოკი', value: `პერიოდი ${targetElement.period}, ${targetElement.block}-ბლოკი`, cost: 15 },
    { id: 4, title: 'ვალენტობა და ელექტროუარყოფითობა', value: `ვალენტობა: ${targetElement.valency} | ელექტროუარყოფითობა: ${targetElement.electronegativity ?? '—'}`, cost: 20 },
    { id: 5, title: 'გამოყენების სფერო', value: targetElement.uses[0] || 'სამეცნიერო კვლევები', cost: 25 },
    { id: 6, title: 'აღმოჩენის ისტორია', value: targetElement.discoveryYear || 'ანტიკური ხანა', cost: 20 },
  ], [targetElement]);

  const handleUnlockClue = (id: number, cost: number) => {
    if (!unlockedClues.includes(id)) {
      setUnlockedClues([...unlockedClues, id]);
      setScore(prev => Math.max(10, prev - cost));
    }
  };

  const handleGuess = () => {
    if (isGameOver || !guessInput.trim()) return;

    const q = guessInput.trim().toLowerCase();
    const guessedEl = ELEMENTS.find(
      e => e.nameKa.toLowerCase() === q || e.symbol.toLowerCase() === q || e.nameEn.toLowerCase() === q
    );

    if (!guessedEl) {
      alert('ელემენტი ვერ მოიძებნა. გთხოვთ შეიყვანოთ ქართული სახელი ან სიმბოლო (მაგ. წყალბადი ან H).');
      return;
    }

    let direction: 'higher' | 'lower' | 'correct' = 'correct';
    if (guessedEl.atomicNumber === targetElement.atomicNumber) {
      direction = 'correct';
      setIsGameOver(true);
      setWins(prev => prev + 1);
    } else if (guessedEl.atomicNumber < targetElement.atomicNumber) {
      direction = 'higher';
      setScore(prev => Math.max(5, prev - 10));
    } else {
      direction = 'lower';
      setScore(prev => Math.max(5, prev - 10));
    }

    setGuesses([{ element: guessedEl, direction }, ...guesses]);
    setGuessInput('');
  };

  const handleRestart = () => {
    const schoolElements = ELEMENTS.slice(0, 56);
    setTargetElement(schoolElements[Math.floor(Math.random() * schoolElements.length)]);
    setUnlockedClues([1, 2]);
    setGuesses([]);
    setIsGameOver(false);
    setScore(100);
    setGuessInput('');
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl space-y-6 text-slate-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-rose-500/20">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black tracking-tight flex items-center gap-2">
              <span>ქიმიური დეტექტივი — „ვინ ვარ მე?“</span>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                დედუქციური თამაში
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              გამოიცანით საიდუმლო ელემენტი მინიმალური რაოდენობის მინიშნებებით!
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-slate-400 mr-1.5">ქულა:</span>
            <span className="font-bold text-amber-300 text-sm">{score}</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-slate-400 mr-1.5">მოგება:</span>
            <span className="font-bold text-emerald-400 text-sm">{wins}</span>
          </div>
        </div>
      </div>

      {/* Clues Dashboard */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-sky-400" />
          <span>მინიშნებები საიდუმლო ელემენტზე:</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
          {clues.map(clue => {
            const isUnlocked = unlockedClues.includes(clue.id);
            return (
              <div
                key={clue.id}
                className={`p-3 rounded-xl border transition-all ${
                  isUnlocked
                    ? 'bg-slate-950 border-slate-750 text-white'
                    : 'bg-slate-950/40 border-slate-850 text-slate-500'
                }`}
              >
                <div className="text-[11px] font-semibold text-slate-400 mb-1 flex items-center justify-between">
                  <span>{clue.title}</span>
                  {clue.cost > 0 && !isUnlocked && (
                    <span className="text-rose-400 font-mono font-bold">-{clue.cost} ქულა</span>
                  )}
                </div>

                {isUnlocked ? (
                  <div className="font-mono font-bold text-sm text-sky-300">{clue.value}</div>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleUnlockClue(clue.id, clue.cost)}
                    className="w-full mt-1 py-1 rounded-lg bg-slate-850 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
                  >
                    🔓 მინიშნების გახსნა
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Guess Input & Controls */}
      <div className="space-y-3">
        {!isGameOver ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={guessInput}
              onChange={e => setGuessInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleGuess()}
              placeholder="შეიყვანეთ ელემენტის სახელი ან სიმბოლო (მაგ. რკინა ან Fe)..."
              className="flex-1 bg-slate-950 border-2 border-slate-750 focus:border-rose-500 rounded-xl px-4 py-3 text-sm sm:text-base font-mono font-bold text-white placeholder-slate-600 outline-none transition-colors shadow-inner"
            />
            <button
              type="button"
              onClick={handleGuess}
              className="px-6 py-3 bg-gradient-to-r from-rose-500 to-indigo-600 hover:from-rose-400 hover:to-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-rose-500/20 cursor-pointer text-sm shrink-0"
            >
              შემოწმება
            </button>
          </div>
        ) : (
          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/70 to-slate-900 border-2 border-emerald-500/60 text-center space-y-3 animate-fadeIn">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-xl font-black text-white">გილოცავთ! თქვენ გამოიცანით!</h4>
              <p className="text-sm text-emerald-300 font-mono mt-0.5">
                საიდუმლო ელემენტი იყო: <strong>{targetElement.nameKa} ({targetElement.symbol})</strong> — Z = {targetElement.atomicNumber}
              </p>
              <p className="text-xs text-slate-400 mt-1">დაგროვილი ქულა: {score} / 100</p>
            </div>
            <button
              type="button"
              onClick={handleRestart}
              className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg"
            >
              შემდეგი ელემენტი ➔
            </button>
          </div>
        )}
      </div>

      {/* Guess History with Directional Guidance */}
      {guesses.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            თქვენი მცდელობები ({guesses.length}):
          </h5>
          <div className="space-y-1.5 max-h-48 overflow-y-auto custom-scrollbar">
            {guesses.map((g, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">{g.element.nameKa}</span>
                  <span className="text-slate-400">({g.element.symbol})</span>
                  <span className="text-slate-500">Z={g.element.atomicNumber}</span>
                </div>

                <div>
                  {g.direction === 'correct' ? (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <span>სწორია!</span> ✓
                    </span>
                  ) : g.direction === 'higher' ? (
                    <span className="text-amber-400 font-bold flex items-center gap-1">
                      <span>ატომური ნომერი მეტია (Z &gt; {g.element.atomicNumber})</span>
                      <ArrowUp className="w-3.5 h-3.5" />
                    </span>
                  ) : (
                    <span className="text-sky-400 font-bold flex items-center gap-1">
                      <span>ატომური ნომერი ნაკლებია (Z &lt; {g.element.atomicNumber})</span>
                      <ArrowDown className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
