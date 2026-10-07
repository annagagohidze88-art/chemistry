import React, { useState } from 'react';
import type { ParticleCounts } from '../../types/atomic3d';
import { ATOM_CHALLENGES } from '../../utils/nuclearPhysics';
import { Trophy, CheckCircle2, ChevronRight, HelpCircle, Sparkles, X } from 'lucide-react';

interface ChallengeDrawerProps {
  currentCounts: ParticleCounts;
  onApplyTarget: (target: ParticleCounts) => void;
  onClose: () => void;
}

export const ChallengeDrawer: React.FC<ChallengeDrawerProps> = ({
  currentCounts,
  onApplyTarget,
  onClose,
}) => {
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [solvedIds, setSolvedIds] = useState<string[]>([]);

  const activeChallenge = ATOM_CHALLENGES[challengeIdx] || ATOM_CHALLENGES[0];

  const isSolved =
    currentCounts.protons === activeChallenge.target.protons &&
    currentCounts.neutrons === activeChallenge.target.neutrons &&
    currentCounts.electrons === activeChallenge.target.electrons;

  const handleNext = () => {
    if (isSolved && !solvedIds.includes(activeChallenge.id)) {
      setSolvedIds(prev => [...prev, activeChallenge.id]);
      setScore(prev => prev + 100);
      setStreak(prev => prev + 1);
    }
    setShowHint(false);
    if (challengeIdx < ATOM_CHALLENGES.length - 1) {
      setChallengeIdx(prev => prev + 1);
    } else {
      // Loop or stay at last
      setChallengeIdx(0);
    }
  };

  const handleSkip = () => {
    setShowHint(false);
    setStreak(0);
    setChallengeIdx(prev => (prev + 1) % ATOM_CHALLENGES.length);
  };

  const handleApply = () => {
    onApplyTarget(activeChallenge.target);
  };

  return (
    <div className="bg-slate-900 border border-slate-750 rounded-2xl p-4 sm:p-5 shadow-2xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-500/30">
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              გამოწვევის რეჟიმი (ქიმიური ვიქტორინა)
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                {challengeIdx + 1} / {ATOM_CHALLENGES.length}
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              ააწყეთ მოცემული ატომები, იზოტოპები და იონები ნაწილაკების რეგულირებით
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-amber-400 font-bold">ქულა: {score}</span>
            <span className="text-slate-600">•</span>
            <span className="text-emerald-400 font-bold">სერია: {streak}🔥</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
            title="დახურვა"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Active Challenge Card */}
      <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-semibold">
              ამოცანა #{challengeIdx + 1}
            </span>
            <h4 className="text-base font-extrabold text-white mt-0.5">
              {activeChallenge.titleKa}
            </h4>
          </div>
          <span className="text-2xl font-black font-mono text-sky-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
            {activeChallenge.targetSymbol}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-200 font-medium">
          {activeChallenge.instructionKa}
        </p>

        {/* Live Target vs Current Comparison */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono pt-1">
          <div
            className={`p-2 rounded-lg border transition-all ${
              currentCounts.protons === activeChallenge.target.protons
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            <span className="block text-[10px] text-slate-500">პროტონები (p)</span>
            <span className="text-sm font-bold">
              {currentCounts.protons} / {activeChallenge.target.protons}
            </span>
          </div>

          <div
            className={`p-2 rounded-lg border transition-all ${
              currentCounts.neutrons === activeChallenge.target.neutrons
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            <span className="block text-[10px] text-slate-500">ნეიტრონები (n)</span>
            <span className="text-sm font-bold">
              {currentCounts.neutrons} / {activeChallenge.target.neutrons}
            </span>
          </div>

          <div
            className={`p-2 rounded-lg border transition-all ${
              currentCounts.electrons === activeChallenge.target.electrons
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            <span className="block text-[10px] text-slate-500">ელექტრონები (e⁻)</span>
            <span className="text-sm font-bold">
              {currentCounts.electrons} / {activeChallenge.target.electrons}
            </span>
          </div>
        </div>

        {/* Hint Box */}
        {showHint && (
          <div className="bg-sky-500/10 border border-sky-500/30 rounded-lg p-3 text-xs text-sky-200 animate-fadeIn">
            💡 <strong>მინიშნება:</strong> {activeChallenge.hintKa}
          </div>
        )}

        {/* Solved Banner */}
        {isSolved && (
          <div className="bg-emerald-500/20 border border-emerald-500/50 rounded-xl p-3 text-emerald-200 flex flex-col gap-1.5 animate-bounce-once">
            <div className="flex items-center gap-2 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>სწორია! თქვენ წარმატებით შექმენით {activeChallenge.targetNameKa}!</span>
            </div>
            <p className="text-xs text-emerald-300/90 leading-relaxed">
              🎓 <strong>საინტერესო ფაქტი:</strong> {activeChallenge.factKa}
            </p>
          </div>
        )}
      </div>

      {/* Challenge Actions */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>{showHint ? 'მინიშნების დამალვა' : 'მინიშნება'}</span>
          </button>

          <button
            type="button"
            onClick={handleApply}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono text-slate-400 hover:text-slate-200 bg-slate-850 hover:bg-slate-800 border border-slate-800 cursor-pointer"
            title="ავტომატურად დაყენება"
          >
            <Sparkles className="w-3 h-3 text-sky-400" />
            <span>ავტო-აწყობა</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSkip}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            გამოტოვება
          </button>

          <button
            type="button"
            onClick={handleNext}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-lg ${
              isSolved
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
                : 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/30'
            }`}
          >
            <span>{isSolved ? 'შემდეგი ამოცანა' : 'შემდეგი'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
